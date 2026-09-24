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

/* How many sentences carry a relationship label containing `term`.
 *
 * Counted here, from the data files, rather than written as a number or read back from the page.
 * A number written here would go stale the moment a sentence is added, and reading it back from
 * the page would only prove the page agrees with itself. */
function whoLabelCount(term) {
  const w = {};
  global.window = w;
  for (const f of ['const.js', 'data/curated.js', 'data/lexicon.js', 'data/bank.js',
                   ...fs.readdirSync(path.join(ROOT, 'data')).filter(x => /^t_.*\.js$/.test(x)).map(x => 'data/' + x)]) {
    new Function(fs.readFileSync(path.join(ROOT, f), 'utf8'))();
  }
  const C = w.CONST, rows = (w.BANK || []).concat(w.CURATED || []);
  const label = s => s.whoId ? [s.whoId, s.whoEn] : (s.rel && C.rel[s.rel] ? [C.rel[s.rel].id, C.rel[s.rel].en] : ['', '']);
  const t = term.toLowerCase();
  return rows.filter(s => {
    const l = label(s);
    return l[0].toLowerCase().includes(t) || l[1].toLowerCase().includes(t);
  }).length;
}

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
            /* The word bubble, measured from the reader's side. The earlier version of this block read
       the title attribute, so it passed while the bubble was unreadable: one run of text with a
       slash between the reading and the two glosses, and nothing telling them apart. A check that
       reads the data instead of the drawing cannot see that, so this one reads the drawing. */
    const bubble = await evalIn(`(() => {
      const all = [...document.querySelectorAll('.jp-sent .tk')];
      const withTip = all.filter(el => el.querySelector('.tip'));
      const word = withTip.find(el => el.textContent.trim().length > 1);
      const tip = word.querySelector('.tip');
      /* Only the content is read here. Whether the bubble actually appears is proved further
         down with a real pointer, because a synthetic mouseover cannot make :hover match and an
         earlier version of this block checked display right after dispatching one. */
      const hidden = getComputedStyle(tip).display;
      const rows = [...tip.querySelectorAll('.tr')].map(r => {
        const tx = r.querySelector('.tx');
        const mk = r.querySelector('.mk');
        return {
          cls: [...r.classList].join(' '), text: r.textContent,
          colour: getComputedStyle(tx || r).color,
          mark: mk ? mk.textContent : '',
          // a label may not be split: this is the failure a reader saw as "ROMAJ" over a lone "I"
          markLines: mk ? Math.round(mk.getBoundingClientRect().height /
                                     parseFloat(getComputedStyle(mk).lineHeight || 16)) : 0
        };
      });
      // does anything inside the bubble repeat the word or the sentence?
      const wordText = word.childNodes[0].textContent.trim();
      return {
        count: withTip.length, words: all.length,
        hidden,
        rows,
        repeats: rows.some(r => r.text.includes(wordText) && wordText.length > 1),
        colours: rows.map(r => r.colour),
        hasKanaRow: rows.some(r => r.cls.includes('t-kana')),
        hasIdRow: rows.some(r => r.cls.includes('t-id')),
        hasEnRow: rows.some(r => r.cls.includes('t-en'))
      };
    })()`);
    ok('every word with a reading carries a bubble', bubble.count > 0, bubble.count + ' of ' + bubble.words + ' words');
    ok('the bubble is hidden until the pointer is over the word', bubble.hidden === 'none', 'display: ' + bubble.hidden);
    ok('the bubble shows the reading and both glosses as separate rows',
       bubble.hasKanaRow && bubble.hasIdRow && bubble.hasEnRow,
       bubble.rows.map(r => r.cls + '=' + r.text).join(' | '));
    /* The reader complained they could not tell romaji, Indonesian and English apart, and the
       answer is in two halves now.
        *
        * The reading carries the colour of the word it belongs to, so the row says whose reading it
       is without a word of explanation. The two glosses keep the fixed colours the panel already
       uses for the same two things. So the assertion is not "three different colours" any more,
       which was true of the first fix and is not true now: it is that the reading matches its own
       word, and that the two glosses are distinguishable from it and from each other. */
    const colours = await evalIn(`(() => {
      const all = [...document.querySelectorAll('.jp-sent .tk')];
      const word = all.find(el => el.querySelector('.tip') &&
                                   el.querySelector('.tip .t-kana .tx') &&
                                   el.childNodes[0].textContent.trim().length > 1);
      const tip = word.querySelector('.tip');
      const tx = sel => { const e = tip.querySelector(sel); return e ? getComputedStyle(e).color : null; };
      return {
        word: getComputedStyle(word).color,
        kana: tx('.t-kana .tx'), id: tx('.t-id .tx'), en: tx('.t-en .tx'),
        markLines: [...tip.querySelectorAll('.mk')].map(m => Math.round(
          m.getBoundingClientRect().height / parseFloat(getComputedStyle(m).lineHeight || 16)))
      };
    })()`);
    ok('the reading is drawn in the colour of the word it belongs to',
       colours.kana === colours.word, `reading ${colours.kana}, word ${colours.word}`);
    ok('the two glosses are distinguishable from the reading and from each other',
       colours.id !== colours.kana && colours.en !== colours.kana && colours.id !== colours.en,
       `kana ${colours.kana} / id ${colours.id} / en ${colours.en}`);
    ok('the bubble never repeats the word itself', bubble.repeats === false, 'rows repeat it: ' + bubble.repeats);

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
    ok('clearing the search also returns to the top', cleared.y === 0, `scrollY ${cleared.y}`);

    /* 4. The relationship line is searchable.
     *
     * A reader looking for "pasangan" is asking which sentences they have for that person, and the
     * relationship line is the only place a card names them (V3). It was not in the search index,
     * so the query found one card: the one whose Indonesian translation happened to contain the
     * word. The other 21 could not be found by the only label they carry.
     *
     * The expected number comes from the data, not from a number written here, so adding a
     * sentence for one of these people cannot silently break this check. The test is "at least":
     * the search covers every visible field, so a term that also appears in a translation or a
     * usage note legitimately matches more cards. */
    const PEOPLE = ['pasangan', 'petugas toko', 'tetangga', 'kurir', 'apoteker'];
    const expected = PEOPLE.map(t => whoLabelCount(t));
    for (let i = 0; i < PEOPLE.length; i++) {
      const term = PEOPLE[i];
      const found = await evalIn(`(async () => {
        const inp = document.getElementById('q');
        inp.value = ${JSON.stringify(term)};
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        return parseInt(document.getElementById('count').textContent, 10);
      })()`);
      ok(`searching "${term}" finds every sentence said to them`,
         found >= expected[i], `${found} found, ${expected[i]} carry the label`);
    }
    await evalIn(`document.getElementById('clear').click()`);

    /* 5. The bubble as the reader sees it, with a real pointer, on a phone and on a desktop.
     *
     * This is the block that would have caught the reported bug, and its absence is why the bug
     * reached a reader: a phone user saw the label "ROMAJI" with its last letter on the next line,
     * and nothing here had ever looked at a narrow screen or moved a pointer over a word.
     *
     * A synthetic mouseover cannot make :hover match, so the pointer is moved the way a hand does.
     * Visibility is never judged with a synthetic event. */
    for (const [w, h, where] of [[360, 740, 'phone 360'], [414, 896, 'phone 414'],
                                 [768, 1024, 'tablet 768'], [1280, 900, 'desktop 1280']]) {
      await send('Emulation.setDeviceMetricsOverride',
                 { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
      await send('Page.navigate', { url: 'file://' + path.join(ROOT, 'index.html') });
      await sleep(1800);
      const spot = await evalIn(`(() => {
        const words = [...document.querySelectorAll('.jp-sent .tk')];
        const el = words.find(e => e.querySelector('.tip .t-kana .tx') &&
                                   e.childNodes[0].textContent.trim().length > 1);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2),
                 wordTop: Math.round(r.top), wordBottom: Math.round(r.bottom) };
      })()`);
      if (!spot) { ok(`${where}: a word with a reading was found`, false, 'none in the first batch'); continue; }
      /* The default is mobile:false, and with it a phone-width viewport still reports a desktop
       * width to the page, so the width is set and then read back before anything is measured. */
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: spot.x, y: spot.y, buttons: 0 });
      await sleep(150);
      const drawn = await evalIn(`(() => {
        const hit = document.elementFromPoint(${spot.x}, ${spot.y});
        const tk = hit && hit.closest ? hit.closest('.tk') : null;
        if (!tk) return { found: false };
        const tip = tk.querySelector('.tip');
        if (!tip) return { found: false };
        const cs = getComputedStyle(tip), r = tip.getBoundingClientRect();
        const line = e => parseFloat(getComputedStyle(e).lineHeight || 16);
        return {
          found: true, display: cs.display, vw: window.innerWidth, vh: window.innerHeight,
          left: Math.round(r.left), right: Math.round(r.right),
          top: Math.round(r.top), bottom: Math.round(r.bottom),
          marks: [...tip.querySelectorAll('.mk')].map(m =>
            Math.round(m.getBoundingClientRect().height / line(m))),
          rows: [...tip.querySelectorAll('.tr')].length
        };
      })()`);
      ok(`${where}: the pointer makes the bubble appear`,
         drawn.found && drawn.display !== 'none',
         drawn.found ? `display ${drawn.display}` : 'no word under the pointer');
      if (!drawn.found) continue;
      /* The bubble sits on one side of its word, close enough to read as belonging to it, and it
       * never covers the word. Which side depends on the room: above by default, below when the
       * word is near the top of the screen, which is what a phone showed. */
      const above = drawn.bottom <= spot.wordTop + 1 && spot.wordTop - drawn.bottom < 70;
      const below = drawn.top >= spot.wordBottom - 1 && drawn.top - spot.wordBottom < 70;
      ok(`${where}: the bubble is drawn beside its word, not over it`,
         above || below,
         `bubble ${drawn.top}..${drawn.bottom}, word ${spot.wordTop}..${spot.wordBottom} ` +
         (above ? '(above)' : below ? '(below)' : '(neither: overlapping or too far)'));
      ok(`${where}: nothing in the bubble is cut off by the screen`,
         drawn.left >= 0 && drawn.right <= drawn.vw && drawn.top >= 0 && drawn.bottom <= drawn.vh,
         `box ${drawn.left}..${drawn.right} of ${drawn.vw} wide, ${drawn.top}..${drawn.bottom} of ${drawn.vh} tall`);
      ok(`${where}: no label is split across lines`,
         drawn.marks.length > 0 && drawn.marks.every(n => n === 1),
         `label heights in lines: ${drawn.marks.join(', ') || 'none'}`);
      ok(`${where}: the bubble still has its three labelled rows`, drawn.rows === 3, `${drawn.rows} rows`);
    }
    await send('Emulation.clearDeviceMetricsOverride');

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
