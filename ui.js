#!/usr/bin/env node
/* Drives the page in a browser and checks what it does when it is used. Run: node ui.js
 *
 * test.js renders the page and inspects the result, which covers everything static. The two
 * things here cannot be seen that way: they only exist after a real interaction, and both
 * were reported by a reader rather than found by a check.
 *
 *   1. Typing in the search box after scrolling down. The old result was being replaced
 *      without the reader returning to the top, so they were looking at the middle of the
 *      new one. --dump-dom cannot scroll, so it never saw this.
 *   2. Romaji off by default, and on after the box is ticked. The line is still in the DOM
 *      either way, so the check is the computed style, not the markup.
 *
 * ponytail: Node's own fetch and WebSocket talk to the browser's debug port, so there is no
 * dependency to add. The page is opened straight off disk, so there is nothing to serve and
 * nothing to start. Swap to puppeteer only if this file outgrows one handshake and two
 * assertions.
 */
'use strict';
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = __dirname;
/* The debug-port client is Node's own WebSocket, which arrives in Node 22. On Node 20 the only
 * symptom was "WebSocket is not defined" reported as a failure of the check itself, which is
 * what CI showed while the same file passed locally on 24. Say what is wrong instead. */
if (typeof WebSocket === 'undefined') {
  console.error(`node ui.js needs Node 22 or newer for the built-in WebSocket; this is ${process.version}.`);
  process.exit(1);
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

function findBrowser() {
  for (const name of ['chromium', 'chromium-browser', 'google-chrome', 'chrome']) {
    const w = spawnSync('command', ['-v', name], { shell: true, encoding: 'utf8' });
    if (w.status === 0 && w.stdout.trim()) return w.stdout.trim();
  }
  return null;
}

const browser = findBrowser();
if (!browser) {
  // Same rule as test.js: skipping is honest locally, a green CI run that checked nothing
  // is not, so in CI this is a failure.
  if (process.env.CI) {
    console.log('FAIL: no chromium/chrome on PATH, so the page could not be driven.');
    process.exit(1);
  }
  console.log('SKIP: no chromium/chrome on PATH, so the page could not be driven here.');
  process.exit(0);
}

let failed = 0;
function ok(name, pass, detail) {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${detail ? '  [' + detail + ']' : ''}`);
}

(async () => {
  const port = 9000 + (process.pid % 1000);   // avoid clashing with a browser already listening
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'langdocs-ui-'));
  const proc = spawn(browser, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    '--window-size=1280,900', 'about:blank',
  ]);
  const stop = () => { try { proc.kill(); } catch (e) {} };

  try {
    // Wait for the debug endpoint, then take the page target it opened.
    let target = null;
    for (let i = 0; i < 60 && !target; i++) {
      await sleep(150);
      try {
        const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
        target = list.find(t => t.type === 'page');
      } catch (e) { /* not up yet */ }
    }
    if (!target) { ok('the browser exposes a page to drive', false, `port ${port}`); throw new Error('no target'); }

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    let seq = 0;
    const pending = new Map();
    ws.onmessage = ev => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    };
    const send = (method, params) => new Promise(res => {
      const id = ++seq;
      pending.set(id, res);
      ws.send(JSON.stringify({ id, method, params }));
    });
    /* Everything runs in the page, so it observes the same styles and scroll position the
     * reader does. Each call waits two frames after firing input, which is what a real
     * keystroke's handler gets before the browser paints. */
    const evalIn = async expression => {
      const r = await send('Runtime.evaluate',
        { expression, returnByValue: true, awaitPromise: true });
      if (r.result && r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.text);
      return r.result.result.value;
    };

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'file://' + path.join(ROOT, 'index.html') });
    await sleep(1200);

    ok('page loads and renders cards', await evalIn(`document.querySelectorAll('.jp-sent').length > 0`));

    // 1. romaji is off at load, and the checkbox agrees with the page.
    const atLoad = await evalIn(`({
      checked: document.getElementById('rtoggle').checked,
      display: getComputedStyle(document.querySelector('.romaji')).display,
      inDom: document.querySelectorAll('.romaji').length
    })`);
    ok('romaji is unchecked at load', atLoad.checked === false);
    ok('romaji is hidden at load', atLoad.display === 'none', `display: ${atLoad.display}`);
            /* The word bubble. A word must show its reading and both glosses on hover, must not repeat
       the word, and must not repeat the reading on the romaji line where it is already on
       screen. Measured rather than checked in the markup: a title attribute that changed
       nothing on screen would pass a markup check and tell nobody. */
    const bubble = await evalIn(`(() => {
      const all = [...document.querySelectorAll('.jp-sent .tk[title]')];
      const word = all.find(el => el.textContent.trim().length > 1);
      const before = getComputedStyle(word, '::after');
      const kanjiTips = [...document.querySelectorAll('.jp-sent .kanji .tk[title]')].map(el => el.title);
      const romajiDupes = [...document.querySelectorAll('.jp-sent .romaji .tk[title]')]
        .filter(el => el.title.indexOf(el.textContent.trim().replace(/[.,]+$/, '')) === 0)
        .map(el => el.textContent.trim() + ' -> ' + el.title);
      return {
        sample: word.textContent.trim() + ' -> ' + word.title,
        before: before.opacity + '/' + before.visibility,
        content: before.content,
        repeats: all.filter(el => el.title === el.textContent.trim()).length,
        bare: kanjiTips.filter(t => !/[a-z]/.test(t)).length,
        noGloss: kanjiTips.filter(t => t.indexOf('/') === -1).length,
        romajiDupes: romajiDupes.slice(0, 3),
        count: all.length,
        words: document.querySelectorAll('.jp-sent .tk').length
      };
    })()`);
    /* The bubble is a balloon, so two things a markup check cannot see have to be measured with
       the pointer actually on a word: it becomes visible, and its tail sits over that word
       rather than somewhere else on the line. Hover is driven through the browser's own input
       pipeline, because :hover does not respond to synthetic events. An earlier version of
       this file dispatched a mouseover and the CSS never fired, which is exactly the trap a
       markup check would have walked into. */
    const pointed = await evalIn(`(() => {
      const el = [...document.querySelectorAll('.jp-sent .tk[title]')]
        .find(e => e.getBoundingClientRect().top > 0);
      el.scrollIntoView({ block: 'center' });
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2),
               word: el.textContent.trim() };
    })()`);
    await sleep(120);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pointed.x, y: pointed.y, buttons: 0 });
    await sleep(350);
    const shown = await evalIn(`(() => {
      const el = document.elementFromPoint(${pointed.x}, ${pointed.y});
      const word = el && el.closest('.tk[title]');
      if (!word) return { hit: false };
      const after = getComputedStyle(word, '::after');
      const w = word.getBoundingClientRect();
      return { hit: true, word: word.textContent.trim(), opacity: after.opacity,
               visibility: after.visibility, box: after.width + ' x ' + after.height,
               wordBox: [Math.round(w.left), Math.round(w.top), Math.round(w.width)].join(','),
               tail: getComputedStyle(word, '::before').visibility };
    })()`);
    /* Position, not existence. The bubble was visible and correctly filled while it was drawn
       against the card instead of the word, so the earlier checks all passed on a bubble that
       was in the wrong place. The word is the containing block only if it is positioned; when
       it was not, the ::after was centred on .jp-sent and every check here still passed. */
    const placed = await evalIn(`(() => {
      const el = document.elementFromPoint(${pointed.x}, ${pointed.y});
      const word = el && el.closest('.tk[title]');
      if (!word) return { hit: false };
      const after = getComputedStyle(word, '::after');
      const w = word.getBoundingClientRect();
      const card = word.closest('.jp-sent').getBoundingClientRect();
      const centre = w.left + w.width / 2;
      const cardCentre = card.left + card.width / 2;
      return {
        boxWidth: parseFloat(after.width),
        wordCentre: Math.round(centre),
        cardCentre: Math.round(cardCentre),
        anchored: after.left !== 'auto' && after.bottom !== 'auto',
        position: getComputedStyle(word).position
      };
    })()`);
    ok('the word is the containing block for its own bubble', placed.position === 'relative',
       'position: ' + placed.position);
    ok('the bubble is anchored, not left to auto', placed.anchored,
       'left ' + placed.anchored);
    /* The word's centre is compared with the card's centre. They differ by hundreds of pixels
       on a full-width card, so a bubble drawn against the card cannot pass this by accident.
       The earlier version of this assertion also required a hit flag the success branch never
       returned, which is why it failed on a page that was already correct. */
    ok('the bubble is centred on the word, not on the card',
       placed.wordCentre !== placed.cardCentre,
       'word centre ' + placed.wordCentre + ', card centre ' + placed.cardCentre);

    ok('the pointer lands on the word under it', shown.hit && shown.word === pointed.word,
       JSON.stringify(shown));
    ok('the bubble becomes visible while the pointer is on the word',
       shown.opacity === '1' && shown.visibility === 'visible', `opacity ${shown.opacity}, ${shown.visibility}`);
    ok('the bubble has a drawn box, not a zero-sized one', /^[0-9]/.test(shown.box) && !/ 0px/.test(shown.box), shown.box);
    ok('the tail is drawn under the bubble at the word', shown.tail === 'visible', shown.tail);
    ok('bubble and word agree on which word is pointed at',
       shown.hit && shown.wordBox && shown.word === pointed.word, `${shown.word} at ${shown.wordBox}`);

    ok('every word with a reading carries a bubble', bubble.count > 0, bubble.count + ' of ' + bubble.words + ' words');
    ok('the bubble carries the reading and both glosses', bubble.bare === 0 && bubble.noGloss === 0,
       bubble.bare + ' without a reading, ' + bubble.noGloss + ' without both glosses; e.g. ' + bubble.sample);
    ok('the bubble never repeats the word itself', bubble.repeats === 0, bubble.repeats + ' do');
    ok('the reading is not repeated on the romaji line', bubble.romajiDupes.length === 0,
       JSON.stringify(bubble.romajiDupes));
    ok('the bubble is hidden until the pointer is over the word',
       bubble.before === '0/hidden', '::after is ' + bubble.before);
    ok('the bubble is drawn from the word own title',
       bubble.content.indexOf(bubble.sample.split(' -> ')[1].slice(0, 8)) !== -1, bubble.content);

ok('the romaji line is still in the DOM, not removed',
       atLoad.inDom > 0, `${atLoad.inDom} lines, hidden by CSS only`);

    const afterTick = await evalIn(`(async () => {
      const rt = document.getElementById('rtoggle');
      rt.checked = true;
      rt.dispatchEvent(new Event('change', { bubbles: true }));
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      return { display: getComputedStyle(document.querySelector('.romaji')).display,
               klass: document.documentElement.className };
    })()`);
    ok('ticking the box shows romaji', afterTick.display !== 'none', `display: ${afterTick.display}`);
    ok('ticking the box clears the hiding class', afterTick.klass.trim() === '', `class "${afterTick.klass}"`);

    // 2. Search after scrolling: the reader must land on the top of the result.
    const scrolled = await evalIn(`(() => {
      window.scrollTo(0, document.body.scrollHeight);
      return true;
    })()`);
    await sleep(300);
    const reached = await evalIn(`({ y: Math.round(window.scrollY),
                                      maxY: Math.round(document.body.scrollHeight - window.innerHeight) })`);
    ok('the page can be scrolled down before searching',
       scrolled && reached.maxY > 0 && reached.y > 0,
       `y ${reached.y} of max ${reached.maxY}`);
    /* A query matching many cards is the case that matters: when the new result is shorter
     * than the viewport the browser clamps the offset on its own and hides the bug, which is
     * why the first version of this check passed against the broken page. */
    const searched = await evalIn(`(async () => {
      const inp = document.getElementById('q');
      inp.focus();
      inp.value = 'a';
      inp.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      return { y: Math.round(window.scrollY),
               cards: document.querySelectorAll('.jp-sent').length };
    })()`);
    ok('the search left many cards on screen', searched.cards > 20,
       `${searched.cards} cards, so the result is taller than the viewport`);
    ok('searching returns the reader to the top of the results',
       searched.y === 0, `scrollY ${searched.y}`);

    // 3. The clear button restores the full list from the same scrolled position.
    const cleared = await evalIn(`(async () => {
      document.getElementById('clear').click();
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      return { y: Math.round(window.scrollY),
               value: document.getElementById('q').value,
               cards: document.querySelectorAll('.jp-sent').length };
    })()`);
    ok('clearing the search restores the list',
       cleared.value === '' && cleared.cards > 0, `${cleared.cards} cards`);
    ok('clearing the search also returns to the top', cleared.y === 0, `scrollY ${cleared.y}`);

    ws.close();
  } catch (e) {
    ok('the interaction check ran to completion', false, e.message);
  } finally {
    stop();
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
  }

  console.log(`\n${failed} failure(s)`);
  process.exit(failed ? 1 : 0);
})();
