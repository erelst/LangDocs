#!/usr/bin/env node
/* Renders index.html in a browser and checks what came out. Run with: node test.js
 *
 * This is the acceptance check for the one thing a reader sees: the page. check.js looks at
 * the sentence data, and it cannot tell whether the renderer turns that data into a usable
 * card, so this renders the real page and asserts on the real DOM.
 *
 * It loads the page over file:// rather than through a server, because the data arrives via
 * <script src> tags and not fetch, so the page works straight off disk. That keeps this
 * check to one command with nothing to start and nothing to stop.
 *
 * ponytail: the browser is the whole test harness. Stubbing a DOM in node would take more
 * code than this file and would check the stub rather than the page. Swap to a headless
 * driver only if interaction (search typing, panel clicks) ever needs asserting here.
 */
'use strict';
const { execFileSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CANDIDATES = ['chromium', 'chromium-browser', 'google-chrome', 'chrome'];

function findBrowser() {
  for (const name of CANDIDATES) {
    const which = spawnSync('command', ['-v', name], { shell: true, encoding: 'utf8' });
    if (which.status === 0 && which.stdout.trim()) return which.stdout.trim();
  }
  return null;
}

const browser = findBrowser();
if (!browser) {
  // On a machine without a browser, skipping is honest. In CI it is not: a green run would
  // mean the render check never happened, so there it is a failure.
  if (process.env.CI) {
    console.log('FAIL: no chromium/chrome on PATH, so the page could not be rendered.');
    console.log('      CI installs one; see .github/workflows/ci.yml.');
    process.exit(1);
  }
  console.log('SKIP: no chromium/chrome on PATH, so the page could not be rendered here.');
  console.log('      Install one, or run this on a machine that has a browser.');
  process.exit(0);
}

/* What the deck should contain, read from the same files the page reads. */
global.window = {};
for (const f of ['const.js', 'data/curated.js', 'data/lexicon.js', 'data/bank.js']) {
  new Function(fs.readFileSync(path.join(ROOT, f), 'utf8'))();
}
for (const f of fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^t_.*\.js$/.test(f))) {
  new Function(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'))();
}
const curated = (window.CURATED || []).length;
const written = (window.BANK || []).length;
const total = curated + written;

function render(hash) {
  return execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=8000',
    '--window-size=1280,900', '--dump-dom',
    'file://' + path.join(ROOT, 'index.html') + (hash || ''),
  ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

/* Two loads, because the list is deliberately lazy and one load cannot show both things.
 *
 * Without a hash: the first batch is on screen and no more, which is the point of the lazy
 * list, so this is where "the DOM is bounded" is checked.
 *
 * With #q<last>: the page must append as far as that sentence and open its panel, so this is
 * where "a sentence outside the first batch is reachable" is checked. It is the same path a
 * reader takes from a shared link, and it is the only way to see a late sentence without a
 * real scroll, which --dump-dom cannot perform. */
const dom = render(null);
const deep = render('#q' + total);
/* Every word is its own <span>, so the sentence text is only contiguous once the tags are
 * stripped; searching the raw DOM for a sentence fails even when it is on screen. */
const domText = dom.replace(/<[^>]+>/g, '');
const deepText = deep.replace(/<[^>]+>/g, '');


const cards = dom.match(/class="jp-sent"/g) || [];
const kanjiLines = [...dom.matchAll(/class="kanji"[^>]*>([\s\S]*?)<\/div>/g)]
  .map(m => m[1].replace(/<[^>]+>/g, ''));
const countLabel = (dom.match(/id="count"[^>]*>([\s\S]*?)<\/span>/) || [, ''])[1];
const romajiLines = [...dom.matchAll(/class="romaji"[^>]*>([\s\S]*?)<\/div>/g)]
  .map(m => m[1].replace(/<[^>]+>/g, ''));
const emptyGlosses = (dom.match(/class="gi"[^>]*>\s*<\/td>/g) || []).length;

let failed = 0;
function ok(name, pass, detail) {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${detail ? '  [' + detail + ']' : ''}`);
}

// The page loads its data with <script src>, so every file must be listed in the shell or a
// topic silently never appears. This is the failure that looks like "my sentences vanished".
const shell = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const f of fs.readdirSync(path.join(ROOT, 'data')).filter(f => /\.js$/.test(f))) {
  ok(`index.html loads data/${f}`, shell.includes(`data/${f}`));
}

const BATCH = 20;   // app.js BATCH: cards appended per scroll step
ok('the first screen is bounded, not the whole bank',
   cards.length === Math.min(total, BATCH), `${cards.length} cards on load, ${total} sentences in the data`);
ok('count label states the total',
   countLabel.includes(String(total)), countLabel.trim().slice(0, 60));
ok('every card has a kanji line', kanjiLines.length === cards.length, `${kanjiLines.length}/${cards.length}`);
ok('every card has a romaji line', romajiLines.length === cards.length, `${romajiLines.length}/${cards.length}`);
ok('no gloss cell is empty', emptyGlosses === 0, `${emptyGlosses} empty`);
ok('punctuation survives on the card',
   kanjiLines.some(l => l.includes('。')), 'found 。 in a kanji line');
ok('the kept restaurant sentence is on the page',
   domText.includes('駅の近く安いレストラン'),
   'the sentence the deck is written to the standard of');

// The last sentence is past the first batch, so this proves the deep link appends on demand.
const all = [...(window.CURATED || []), ...(window.BANK || [])];
const lastKanji = (all[total - 1].t || []).map(t => (Array.isArray(t) ? t[0] : t)).join('');
ok('a sentence past the first batch is reachable by deep link',
   deepText.includes(lastKanji.replace(/[、。！？…]/g, '')),
   `#q${total} -> ${lastKanji.slice(0, 28)}`);
ok('the deep link opens that sentence',
   /<details class="qdet" open/.test(deep), 'panel open on arrival');
ok('cards carry no register label until opened',
   !/class="kanji"[^>]*>[^<]*tetangga/.test(dom), 'register lives in the panel only');
ok('each card has a ? expander', (dom.match(/class="qdet"/g) || []).length === cards.length);

console.log(`\n${cards.length} cards rendered; ${failed} failure(s)`);
process.exit(failed ? 1 : 0);
