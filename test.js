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
new Function(fs.readFileSync(path.join(ROOT, 'coverage.js'), 'utf8'))();
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
 * bubble is cut out from its opening tag to its matching close instead.
 *
 * It removes them in ONE pass, collecting the surviving pieces and joining them once, and that is
 * not a micro-optimisation. The first version reassigned `out = out.slice(0, at) + out.slice(i)`
 * inside the loop, so every one of the 11250 bubbles in the deep-link page copied the whole 10 MB
 * string: 109 GB of copying, and 99% of this file's running time. On a low-spec machine that is
 * minutes of waiting, and it grows with the square of the deck, so it would only have got worse.
 * The output is byte-identical to the old version, which was checked before replacing it. */
function withoutBubbles(html) {
  const open = '<span class="tip"';
  const keep = [];
  let from = 0;
  for (;;) {
    const at = html.indexOf(open, from);
    if (at === -1) break;
    keep.push(html.slice(from, at));
    // walk forward counting spans until they balance
    let depth = 0, i = at;
    for (;;) {
      const nextOpen = html.indexOf('<span', i);
      const nextClose = html.indexOf('</span>', i);
      if (nextClose === -1) { i = html.length; break; }
      if (nextOpen !== -1 && nextOpen < nextClose) { depth++; i = nextOpen + 5; }
      else {
        depth--; i = nextClose + 7;
        if (depth === 0) break;
      }
    }
    from = i;
  }
  keep.push(html.slice(from));
  return keep.join('');
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
/* A topic's quota is written more than once: once in the big table where it is bold, and then in
 * the tables that explain why it is not larger. The guard used to read only the bold one, so
 * `rumah_santai` said 58 in one table and 36 in the other, and `santai` said 42 and 22. Every row
 * that names a topic alongside a plain number is now checked against the bold quota. */
const quotaByTopic = new Map(quotaRows);
for (const line of docsReadme.split('\n')) {
  const row = line.match(/^\| `([a-z_]+)` \| [^|]*\| (\d+) \|/);
  if (!row) continue;
  const [, topic, shown] = row;
  const quota = quotaByTopic.get(topic);
  if (quota === undefined) continue;                       // a table using the topic name as a label
  ok(`docs/README.md quotes the quota for \`${topic}\` the same way everywhere`,
     Number(shown) === quota, `this table says ${shown}, the quota table says ${quota}`);
}
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

/* The medan makna table in section 3c, checked against coverage.js and the bank for the same
 * reason as the tables above: it is a set of numbers in prose, and prose drifts. Both the per-field
 * numbers and the totals are checked, because the totals are the ones a reader quotes. */
const covUsed = new Set();
for (const s of [...(window.CURATED || []), ...(window.BANK || [])]) {
  for (const t of s.t) covUsed.add(Array.isArray(t) ? t[0] : t);
}
let covTotals = { used: 0, total: 0, gap: 0, ready: 0, noEntry: 0 };
for (const [name, f] of Object.entries(window.COVERAGE || {})) {
  const used = f.words.filter(w => window.LEX[w] && covUsed.has(w)).length;
  const gap = f.words.filter(w => !covUsed.has(w)).length;
  const ready = f.words.filter(w => window.LEX[w] && !covUsed.has(w)).length;
  const noEntry = f.words.filter(w => !window.LEX[w]).length;
  covTotals = { used: covTotals.used + used, total: covTotals.total + f.words.length,
                gap: covTotals.gap + gap, ready: covTotals.ready + ready,
                noEntry: covTotals.noEntry + noEntry };
  const row = docsReadme.match(new RegExp('^\\| `' + name + '` \\| (\\d+) \\| (\\d+) \\| (\\d+) \\| (\\d+) \\| (\\d+) \\|$', 'm'));
  ok(`docs/README.md documents the medan makna field \`${name}\``,
     row && [used, f.words.length, gap, ready, noEntry].every((v, i) => Number(row[i + 1]) === v),
     row ? `docs ${row.slice(1).join('/')}, data ${[used, f.words.length, gap, ready, noEntry].join('/')}`
         : 'no row for this field');
}
ok('docs/README.md states the medan makna totals that the data adds up to',
   docsReadme.includes(`| **Jumlah** | **${covTotals.used}** | **${covTotals.total}** | ` +
                       `**${covTotals.gap}** | **${covTotals.ready}** | **${covTotals.noEntry}** |`),
   `data says ${Object.values(covTotals).join('/')}`);

/* The lexicon is kept in kana order, and lexadd.js is the tool that maintains it. Adding entries by
 * hand instead put all 65 of one batch before every kana entry, because a plain sort in Node orders
 * by code unit while the file is ordered by localeCompare: あ is U+3042 and ア is U+30A2, so a code
 * unit sort puts every hiragana entry before every katakana one. The file looks fine, searches miss
 * nothing, and the next person to run lexadd.js gets a diff of a thousand lines. That is the failure
 * this catches, and it is why the check exists rather than a note telling people to use the tool. */
{
  const keys = Object.keys(window.LEX || {});
  const sorted = [...keys].sort((a, b) => a.localeCompare(b));
  const firstBad = keys.findIndex((k, i) => k !== sorted[i]);
  ok('data/lexicon.js is kept in kana order, the order lexadd.js writes',
     firstBad === -1,
     firstBad === -1 ? `${keys.length} entries in order`
                     : `${keys.length} entries, first out of place at ${keys[firstBad]}, ` +
                       `expected ${sorted[firstBad]} (run node lexadd.js to fix)`);
}

/* Section 4 states its own total in words, and it had gone stale: it said eighty-three while the
 * three rows above it added up to 107. A total that only appears in prose is exactly the kind of
 * number nothing reads, so it is checked against the bold quotas the rows already carry. */
const crossRows = docsReadme.split('\n')
  .map(line => line.match(/^\| `(telepon|sopan|waktu_cuaca)` \| [^|]*\| \*\*(\d+)\*\* \|/))
  .filter(Boolean);
ok('docs/README.md lists a quota for each cross-cutting topic',
   crossRows.length === 3, `${crossRows.length} rows`);
const crossTotal = crossRows.reduce((a, m) => a + Number(m[2]), 0);
const NUMWORD = { 83: 'Delapan puluh tiga', 107: 'Seratus tujuh' };
const crossLine = docsReadme.match(/([A-Z][a-z]+(?: [a-z]+)*) kalimat berikut memotong semua topik/);
ok('docs/README.md states the cross-cutting total that its own rows add up to',
   crossLine && crossLine[1] === NUMWORD[crossTotal],
   `docs says "${crossLine && crossLine[1]}", rows add up to ${crossTotal}` +
   (NUMWORD[crossTotal] ? ` ("${NUMWORD[crossTotal]}")` : ' (no spelled-out form known)'));

/* Every topic file keeps a table of gaps that are still open, and each row justifies itself with a
 * search: "no sentence contains 話し込", or "割引 and バーゲン まだ". Those are checkable claims
 * about the bank, and one of them was already false: jalan.md said 戻る was still missing after a
 * sentence using it had been written, so the file would have sent the next writer off to write a
 * sentence that already existed. A gap list that lies is worse than no gap list.
 *
 * Only the assertion itself is read, up to the first full stop. A row may go on to explain its
 * search, and that explanation names terms that ARE used ("何時まで sudah dipakai tiga kali"), which
 * are not claims. Reading past the full stop turns every such note into a false failure, which is
 * how this check first reported seven rows that were correct.
 *
 * A row that says the term is used "in this sense" is a qualified claim and is left alone: it
 * cannot be checked by searching for the string, and pretending otherwise would be a worse guard
 * than none. `ada` claims are left alone for the same reason they never go stale: they are about
 * sentences that were already there.
 *
 * The second shape was dead code until a negative test failed to make it fire. It looked for a
 * clause ending in "belum", but the text it was given was the whole markdown row, which ends in
 * " |", so the condition was never true: nineteen rows carrying a "belum" claim were passing
 * without being read. It now takes the last table cell and splits that on the semicolons inside
 * it, which is where the claims are.
 */
const allSurfaces = [...(window.CURATED || []), ...(window.BANK || [])]
  .map(s => s.t.map(t => (Array.isArray(t) ? t[0] : t)).join(''));
const contains = term => allSurfaces.some(k => k.includes(term));
let gapClaims = 0;
for (const file of topicDocs.sort()) {
  const text = fs.readFileSync(path.join(ROOT, 'docs/topics', file), 'utf8');
  for (const line of text.split('\n')) {
    if (!line.startsWith('|')) continue;
    /* Shape 1: everything backticked after "tidak ada kalimat yang memuat" must really be absent. */
    const absent = line.split('tidak ada kalimat yang memuat')[1];
    if (absent) {
      const assertion = absent.split('.')[0];
      if (/dalam arti ini|arti ini/.test(assertion)) continue;   // qualified, not checkable by string
      const terms = [...assertion.matchAll(/`([^`]+)`/g)].map(m => m[1]);
      gapClaims += terms.length;
      const wrong = terms.filter(contains);
      ok(`${file} claim "no sentence contains" is still true`,
         wrong.length === 0,
         wrong.length ? `${wrong.join(', ')} IS used by a sentence now` : `${terms.length} terms absent`);
    }
    /* Shape 2: the terms in the clause that ends in  belum must also be absent. */
    const cells = line.split('|');
    const note = cells.length > 2 ? cells[cells.length - 2] : '';
    const before = note.split(/[;；]/).map(x => x.trim()).filter(x => x.endsWith('belum'));
    for (const clause of before) {
      /* A row of this shape names what exists before it names what does not: 「`セール` ada di
       * kalimat kapan mulai; `割引` dan `バーゲン` belum」. Only what follows the last "ada" is the
       * claim, and reading the whole clause reports the word that is deliberately there as a false
       * failure. Rows that say "`お久しぶり` ada, keadaan sebaliknya belum" have no terms after the
       * marker at all, which is correct: they claim a situation is missing, not a word. */
      /* When the clause has no "ada" the semicolon already separated it from the one that does, so
       * the whole clause is the claim. Reading lastIndexOf straight into slice() skipped the first
       * characters instead, because it returns -1: the terms then came out mangled and this branch
       * reported nothing while appearing to work. */
      const at = clause.lastIndexOf(' ada');
      const tail = at === -1 ? clause : clause.slice(at + ' ada'.length);
      const terms = [...tail.matchAll(/`([^`]+)`/g)].map(m => m[1]);
      gapClaims += terms.length;
      const wrong = terms.filter(contains);
      ok(`${file} claim "... belum" is still true`,
         wrong.length === 0,
         wrong.length ? `${wrong.join(', ')} IS used by a sentence now` : `${terms.length} terms absent`);
    }
  }
}
ok('the topic files still carry open-gap claims to check', gapClaims > 0, `${gapClaims} terms`);

/* The five K10 checkpoints, recomputed here rather than read from check.js's output, so the rule is
 * enforced by the same suite that runs on every push. test.js does not import check.js by design:
 * each is a separate command, and the price is that this arithmetic appears twice. Sharing it would
 * mean one file loading the other, and a check that cannot run alone is worse than a duplicated
 * forty lines. */
{
  const long = (window.BANK || []).filter(s => s.long);
  const shape = s => s.t.map(t => (Array.isArray(t) ? t[0] : t)).join('').replace(/[、。！？…]/g, '');
  const MARKS = ['ので', 'から', 'けど', 'けれど', 'たら', 'とき', 'ながら', 'ため', 'し',
                 'てから', 'あとで', 'まえに', 'のに', 'なければ', 'れば', 'なら', 'と', 'が'];
  /* ので before す is the softener 〜のですが and before し the question 〜のでしょうか; から is a
   * cause only when it closes a clause with a comma, otherwise it is てから, いつから, or the から
   * of 分からない. The relation is therefore read on a copy that keeps the comma. */
  const relShape = s => s.t.map(t => (Array.isArray(t) ? t[0] : t)).join('').replace(/[。！？…]/g, '');
  const isRing = (k, m, at) => (m === 'ので' ? !'すし'.includes(k[at + 2])
                              : m === 'から' ? k[at + 2] === '、'
                              : true);
  const tally = (fn, len, of = shape) => {
    const m = new Map();
    for (const s of long) { const k = fn(of(s), len); m.set(k, (m.get(k) || 0) + 1); }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  };
  const pct = n => 100 * n / long.length;
  const endings = tally((k, n) => k.slice(-n), 3);
  const openings = tally((k, n) => k.slice(0, n), 2);
  const habits = tally((k, n) => k.slice(-n), 6).filter(([, n]) => n >= 3);
  const relations = tally((k) => MARKS.find(m => k.includes(m) && isRing(k, m, k.indexOf(m))) || '(none)', undefined, relShape);
  const shared = endings.filter(([, n]) => n > 1).reduce((a, [, n]) => a + n, 0);
  const topRel = pct(relations[0][1]);
  /* Clauses joined by cause, counted across the whole bank. A per-marker limit cannot see this one:
   * swapping ので for から leaves every marker share low while the sentence still says "because X, Y". */
  const REASON = /ので(?![すし])|から(?=[、,])|ため[に、]|おかげで|せいで/;
  const cause = pct(long.filter(s => REASON.test(relShape(s))).length);
  /* The limits are the ones K10 states, repeated here as numbers rather than prose so that widening
   * a limit is a visible edit in the file that enforces it. */
  const CHK = { topEnding: 20, topOpening: 8, sharedEnding: 90, habits: 25, topRelation: 45, cause: 72 };
  ok('K10: one ending does not dominate the long sentences',
     pct(endings[0][1]) < CHK.topEnding,
     `${endings[0][0]} ${pct(endings[0][1]).toFixed(1)}% of ${long.length}, limit ${CHK.topEnding}%`);
  ok('K10: one opening does not dominate the long sentences',
     pct(openings[0][1]) < CHK.topOpening,
     `${openings[0][0]} ${pct(openings[0][1]).toFixed(1)}%, limit ${CHK.topOpening}%`);
  ok('K10: endings are not collapsed onto a few forms',
     pct(shared) < CHK.sharedEnding,
     `${pct(shared).toFixed(1)}% share an ending, limit ${CHK.sharedEnding}%`);
  ok('K10: the count of repeated six-character endings stays low',
     habits.length < CHK.habits,
     `${habits.length} endings used 3+ times, limit ${CHK.habits}`);
  ok('K10: one clause relation does not carry the deck',
     topRel < CHK.topRelation,
     `${relations[0][0]} = ${topRel.toFixed(1)}%, limit ${CHK.topRelation}%`);
  ok('K10: cause-and-result is not the only shape a long sentence takes',
     cause < CHK.cause,
     `${cause.toFixed(1)}% of ${long.length} join their clauses by cause, limit ${CHK.cause}%`);

  /* The SPEC table is what a future writer reads before writing, so a stale figure there is worse
   * than a stale figure anywhere else: it is the one number they steer by. Each figure in the table
   * is therefore recomputed here and compared, so re-measuring the bank without editing the table
   * fails. Only the two count cells say something other than "the figure the checker just printed",
   * and they are checked against their own count. */
  const specK10 = fs.readFileSync(path.join(ROOT, 'docs/SPEC.md'), 'utf8').split('\n')
    .map(line => line.match(/^\| .+ \| (?:`[^`]*` )?([\d,]+(?:%| pola)) \|/))
    .filter(Boolean)
    .map(m => m[1]);
  const comma = n => `${pct(n).toFixed(1)}`.replace('.', ',') + '%';
  const expected = [
    comma(endings[0][1]),                 // the commonest ending
    comma(shared),                        // share that repeats an ending
    comma(openings[0][1]),                // the commonest opening
    `${habits.length} pola`,              // six-character endings used 3+ times
    comma(relations[0][1]),               // the commonest relation
    comma(long.filter(s => REASON.test(relShape(s))).length),  // clauses joined by cause
  ];
  const missing = expected.filter(v => !specK10.includes(v));
  ok('docs/SPEC.md quotes each K10 checkpoint figure the checker just measured',
     missing.length === 0,
     missing.length ? `SPEC has no row quoting ${missing.join(', ')}` : '');
}

console.log(`\n${cards.length} cards rendered; ${failed} failure(s)`);
process.exit(failed ? 1 : 0);
