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
