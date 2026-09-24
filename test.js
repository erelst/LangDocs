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
/* Text as the reader sees it, not text as the markup happens to read. Stripping tags alone also
 * strips the tags off the hidden word bubbles, so their labels and glosses leak into the plain
 * text and a sentence check then fails on words the reader never sees. The bubbles are display:none
 * until the pointer is over a word, so removing them first is what the browser already does for
 * select-and-copy. Verified: selecting a sentence copies おはようございます。 with no bubble text. */
/* Removing the bubble is done by BALANCE, not by counting closing tags.
 *
 * The first version matched exactly two closing spans, which was the bubble's depth at the time.
 * When a row gained one more element the pattern silently stopped matching, the hidden labels and
 * glosses came back into the plain text, and two unrelated assertions failed on words the reader
 * never sees. A depth count that must be kept in step with the markup by hand is a trap, so the
 * bubble is cut out from its opening tag to its matching close instead. */
function withoutBubbles(html) {
  const open = '<span class="tip"';
  let out = html, from = 0;
  for (;;) {
    const at = out.indexOf(open, from);
    if (at === -1) break;
    // walk forward counting spans until they balance
    let depth = 0, i = at;
    for (;;) {
      const nextOpen = out.indexOf('<span', i);
      const nextClose = out.indexOf('</span>', i);
      if (nextClose === -1) { i = out.length; break; }
      if (nextOpen !== -1 && nextOpen < nextClose) { depth++; i = nextOpen + 5; }
      else {
        depth--; i = nextClose + 7;
        if (depth === 0) break;
      }
    }
    out = out.slice(0, at) + out.slice(i);
    from = at;
  }
  return out;
}
const visibleText = html => withoutBubbles(html).replace(/<[^>]+>/g, '');
const domText = visibleText(dom);
const deepText = visibleText(deep);


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
/* Compare with the punctuation taken out of BOTH sides. The page renders 。 and 、 on the
 * card, and this asserted on a copy of the sentence that had them stripped, so it only
 * passed while the last sentence happened to contain no 、 of its own. 進路のことで… does,
 * which is what turned a latent mismatch into a failure the moment that sentence was added. */
const bare = s => s.replace(/[、。！？…\s]/g, '');
ok('a sentence past the first batch is reachable by deep link',
   bare(deepText).includes(bare(lastKanji)),
   `#q${total} -> ${lastKanji.slice(0, 28)}`);
ok('the deep link opens that sentence',
   /<details class="qdet" open/.test(deep), 'panel open on arrival');
ok('cards carry no register label until opened',
   !/class="kanji"[^>]*>[^<]*tetangga/.test(dom), 'register lives in the panel only');
ok('each card has a ? expander', (dom.match(/class="qdet"/g) || []).length === cards.length);

/* The topic plan is prose with numbers in it, and prose drifts. These two checks tie it back
 * to the page and to the files, so a topic file that was archived or a count that was edited
 * without the data stops matching instead of being discovered by a reader. */
const docsReadme = fs.readFileSync(path.join(ROOT, 'docs/README.md'), 'utf8');
const topicDocs = fs.readdirSync(path.join(ROOT, 'docs/topics')).filter(f => f.endsWith('.md'));
/* Every topic with quota gets a topic file: a number with no home is a number nobody owns. */
const quotaRows = docsReadme.split('\n')
  .map(line => {
    const topic = line.match(/^\| `([a-z_]+)` \|/);
    if (!topic) return null;                       // section 6 and 7 list topics mid-row
    const q = line.match(/\*\*(\d+)\*\*/);       // the quota is the only bold number
    return q ? [topic[1], Number(q[1])] : null;
  })
  .filter(Boolean);
ok('docs/README.md lists a quota for every topic',
   quotaRows.length === 13, `${quotaRows.length} quota rows`);
for (const [topic, quota] of quotaRows) {
  if (['telepon', 'sopan', 'waktu_cuaca'].includes(topic)) continue;   // cross-cutting, listed apart
  ok(`docs/topics/${topic}.md exists`, topicDocs.includes(`${topic}.md`), `quota ${quota}`);
}
/* Each topic file ends with how many sentences it owes against its quota, and those lines were
 * stale by the same amount the whole file was: `jalan` claimed 20 against a quota of 28, and
 * `belanja` claimed 0. The line is checked against the quota in the README, so the two cannot
 * disagree. The written side is not checked here because `waktu_cuaca` and `sopan` count curated
 * sentences from another file, which this check cannot see. */
for (const [topic, quota] of quotaRows) {
  const file = path.join(ROOT, 'docs/topics', `${topic}.md`);
  if (!fs.existsSync(file)) continue;
  const sisa = fs.readFileSync(file, 'utf8')
    .match(/## Sisa yang harus ditulis\n\n(\d+) kalimat\. Kuota (\d+) sudah penuh\./);
  ok(`docs/topics/${topic}.md states its own quota in the closing line`,
     Boolean(sisa) && Number(sisa[2]) === quota,
     sisa ? `says quota ${sisa[2]}, README says ${quota}` : 'no "N kalimat. Kuota N sudah penuh." line');
}
/* The header table's "Sudah ditulis" is the number a reader trusts most, and it is checked against
 * the data: the sentences in this topic's own file, plus the curated sentences the file claims in
 * its "Dari `kurasi`" row. That row exists because `sopan` and `waktu_cuaca` count curated
 * sentences that live in data/curated.js, so a check that ignored it would report two false
 * failures. Both the count and the claim are checked, so neither can hide behind the other. */
const topicCount = new Map();
for (const s of (window.BANK || [])) {
  if (s.topic) topicCount.set(s.topic, (topicCount.get(s.topic) || 0) + 1);
}
for (const [topic] of quotaRows) {
  const file = path.join(ROOT, 'docs/topics', `${topic}.md`);
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  const shown = text.match(/\| Sudah ditulis \| (\d+) \|/);
  const fromCurated = text.match(/\| Dari `kurasi` \| (\d+) \|/);
  const expected = (topicCount.get(topic) || 0) + (fromCurated ? Number(fromCurated[1]) : 0);
  ok(`docs/topics/${topic}.md states how many sentences it has`,
     Boolean(shown) && Number(shown[1]) === expected,
     shown ? `says ${shown[1]}, data has ${expected}` : 'no "Sudah ditulis" row');
}
/* The two documented counts mean different things and both are checked, because the
 * difference between them is the four curated sentences that no topic claims yet.
 *
 *   "kuota terpakai"  sentences that exist AND are counted against a topic quota
 *   "perlu ditulis"   quota left to write, which is the whole deck minus the first number
 *   sentences on the page  what the reader actually has, curated included */
const onPage = curated + written;
/* The full deck, both tables: "perlu ditulis" is measured against everything, not the core. */
const quota = quotaRows.reduce((n, [, q]) => n + q, 0);
const consumed = docsReadme.match(/\| Kuota terpakai \| (\d+) \|/);
const stillToWrite = docsReadme.match(/\| Perlu ditulis \| \*\*(\d+)\*\* \|/);
ok('the documented "kuota terpakai" count is not more than the sentences that exist',
   consumed && Number(consumed[1]) <= onPage,
   `docs say ${consumed && consumed[1]} used, page has ${onPage}`);
/* A topic may stand above its quota, because SPEC T2 makes the quota a floor. waktu_cuaca does:
 * 21 written plus 2 curated against a quota of 21. So "used" can exceed the quota, and the
 * difference then belongs in the README as a stated excess rather than in a number that cannot go
 * negative. Both directions are checked: the remainder when there is one, and the excess when
 * there is not. */
const used = consumed ? Number(consumed[1]) : 0;
const written_left = quota - used;
const excess = docsReadme.match(/\| Kuota terpakai \| \d+ \|[\s\S]{0,400}?lebih tinggi dari kuota \d+ karena/);
ok('the documented "perlu ditulis" matches the quota minus what is used',
   stillToWrite && Number(stillToWrite[1]) === Math.max(0, written_left),
   `${stillToWrite && stillToWrite[1]} + ${used} vs quota ${quota}`);
ok('used above the quota is stated rather than left unexplained',
   written_left >= 0 || Boolean(excess),
   written_left < 0 ? `used is ${-written_left} above quota ${quota}` : 'used is within quota');

/* The partner-distribution table. It drifted once already: it kept a denominator of 515 after the
 * deck had grown past it, so the README said close family was 3,8 points short when it was 5,0, and
 * the claim next to it ("this table cannot go stale without being seen") was simply false, because
 * nothing read the numbers. This reads them.
 *
 * Both the percentage and the group members are checked, because a table can be right about the
 * total and wrong about which rel keys are inside it. */
const DEC = ',';
const pct = n => (100 * n / written).toFixed(1).replace('.', DEC);
const surveyWho = window.CONST.surveyWho;
const relCount = new Map();
for (const s of (window.BANK || [])) {
  if (!s.rel) continue;
  relCount.set(s.rel, (relCount.get(s.rel) || 0) + 1);
}
/* A row is matched to its group by the members in the last column, not by the label in the first,
 * because the first column is Indonesian prose while the members are the data. A row lists only
 * the keys that have sentences, so the group is the one containing every key the row names, not
 * the one with the same number of keys. */
const tableRows = docsReadme.split('\n').filter(line =>
  /^\| .*\| \d+(,\d+)?% \| \d+(,\d+)?% \|/.test(line));
ok('docs/README.md documents the partner distribution for every measured group',
   tableRows.length === Object.keys(surveyWho.groups).length,
   `${tableRows.length} rows, ${Object.keys(surveyWho.groups).length} groups`);
for (const line of tableRows) {
  const members = [...line.matchAll(/`([a-z_]+)` (\d+)/g)].map(m => [m[1], Number(m[2])]);
  const groupKey = Object.keys(surveyWho.groups).find(g =>
    surveyWho.groups[g].length >= members.length &&
    members.every(([id]) => surveyWho.groups[g].includes(id)));
  if (!groupKey) {
    ok(`a documented row matches a measured group: ${line.slice(0, 40)}`, false);
    continue;
  }
  const real = surveyWho.groups[groupKey].reduce((a, k) => a + (relCount.get(k) || 0), 0);
  const shown = line.match(/\| \d+(?:,\d+)?% \| (\d+(?:,\d+)?)% \|/)[1];
  ok(`${groupKey}: the documented deck share matches the data`,
     shown === pct(real), `docs ${shown}%, data ${pct(real)}% (${real} of ${written})`);
  /* The gap is the number a reader acts on, and it is the one that went stale first: it is the
   * difference of two figures that both move when the deck grows. The sign is deck minus measured,
   * so a negative gap means the deck has fewer of that group than the survey suggests. */
  const gap = (100 * real / written - surveyWho.measured[groupKey]).toFixed(1).replace('.', DEC);
  const shownGap = line.match(/\*\*([+-]\d+(?:,\d+)?)\*\*|\| ([+-]\d+(?:,\d+)?) \|/);
  const gapText = shownGap ? (shownGap[1] || shownGap[2]) : '(none)';
  ok(`${groupKey}: the documented gap matches the data`,
     gapText === (Number(gap.replace(',', '.')) >= 0 ? '+' : '') + gap,
     `docs ${gapText}, data ${gap}`);
  const wrong = members.filter(([id, c]) => (relCount.get(id) || 0) !== c);
  ok(`${groupKey}: the documented rel counts match the data`,
     wrong.length === 0,
     wrong.map(([id, c]) => `${id} ${c} vs ${relCount.get(id) || 0}`).join('; ') || 'all match');
}
/* The page's own summary line and the docs must agree on the size of the written bank. */
ok('docs/README.md states the same written-sentence count as the data',
   docsReadme.includes(`| Kalimat di berkas topik | yang tertulis di \`data/t_*.js\` | **${written}** |`),
   `data has ${written}`);

/* SPEC carries the same distribution in a different shape (deck, measured, gap) and it went stale
 * in the same edit, so it is checked the same way. Its rows name no rel keys, so a row is matched
 * to its group by the measured figure, which is the one column that comes straight from the survey
 * and is different for every group. */
const specRows = fs.readFileSync(path.join(ROOT, 'docs/SPEC.md'), 'utf8').split('\n')
  .map(line => line.match(/^\| ([^|]+) \| (\d+),(\d+)% \| (\d+),(\d+)% \| \*{0,2}([+-]\d+,\d+)\*{0,2} \|$/))
  .filter(Boolean)
  .map(m => ({ label: m[1].trim(), deck: `${m[2]},${m[3]}`, measured: Number(`${m[4]}.${m[5]}`), gap: m[6] }));
ok('docs/SPEC.md documents the partner distribution for every measured group',
   specRows.length === Object.keys(surveyWho.groups).length,
   `${specRows.length} rows, ${Object.keys(surveyWho.groups).length} groups`);
for (const row of specRows) {
  const groupKey = Object.keys(surveyWho.groups)
    .find(g => surveyWho.measured[g] === row.measured);
  if (!groupKey) {
    ok(`a SPEC row has a measured figure that matches a group: ${row.label} ${row.measured}%`, false);
    continue;
  }
  const real = surveyWho.groups[groupKey].reduce((a, k) => a + (relCount.get(k) || 0), 0);
  const gap = 100 * real / written - surveyWho.measured[groupKey];
  const shownGap = (gap >= 0 ? '+' : '') + gap.toFixed(1).replace('.', DEC);
  ok(`SPEC ${groupKey}: the documented deck share and gap match the data`,
     row.deck === pct(real) && row.gap === shownGap,
     `docs ${row.deck}% / ${row.gap}, data ${pct(real)}% / ${shownGap}`);
}

console.log(`\n${cards.length} cards rendered; ${failed} failure(s)`);
process.exit(failed ? 1 : 0);
