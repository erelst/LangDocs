#!/usr/bin/env node
/* Checks the sentence bank. Run with: node check.js
 *
 * This replaces the Python checks that used to run at build time. It is written the same
 * way the old ones were written against the old bank, which is to say it asks the two
 * separate questions that both matter and that neither one can answer alone:
 *
 *   1. Is each sentence CORRECT? required fields present, tokens resolvable, romaji and
 *      glosses actually there, register consistent with the speech level, a past time
 *      expression agreeing with the verb in its own clause.
 *
 *   2. Is the bank WORTH READING? This is the half the reader objected to. It checks that
 *      no two sentences reduce to the same skeleton (which is what "same sentence, the
 *      topic swapped" looks like from the outside), that a long sentence carries a real
 *      relation rather than a sequence marker, that no sentence is padded to look long,
 *      and that the short ones are a small minority, because the deck is meant to be
 *      mostly sentences that say something.
 *
 * It reads the same files the page reads, so it cannot drift from what ships.
 */
'use strict';
const fs = require('fs');
const path = require('path');

global.window = {};
function load(file) {
  const src = fs.readFileSync(path.join(__dirname, file), 'utf8');
  new Function(src)();
}
load('const.js');
load('data/curated.js');
load('data/lexicon.js');
load('data/bank.js');

// Every written topic file, so a new topic is checked the moment it is added.
const topicFiles = fs.readdirSync(path.join(__dirname, 'data'))
  .filter(f => /^t_.*\.js$/.test(f)).sort();
for (const f of topicFiles) load(path.join('data', f));

const LEX = window.LEX;
const rel = window.CONST.rel;
const bare = s => String(s).replace(/[、。！？…]+$/, '');
const stripDiacritics = s => s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : s;
const norm = s => stripDiacritics(String(s).toLowerCase())
  .replace(/sha/g, 'sya').replace(/shu/g, 'syu').replace(/sho/g, 'syo').replace(/shi/g, 'si')
  .replace(/cha/g, 'tya').replace(/chu/g, 'tyu').replace(/cho/g, 'tyo').replace(/chi/g, 'ti')
  .replace(/ja/g, 'zya').replace(/ju/g, 'zyu').replace(/jo/g, 'zyo').replace(/ji/g, 'zi')
  .replace(/tsu/g, 'tu').replace(/ou/g, 'o').replace(/uu/g, 'u').replace(/oo/g, 'o')
  .replace(/aa/g, 'a').replace(/ee/g, 'e').replace(/ii/g, 'i');

/* The whole deck, exactly as the page assembles it. */
function assemble() {
  const out = [], seen = new Set();
  const push = (list, origin) => {
    for (const s of list) {
      const kanji = tokens(s).map(t => t[0]).join('');
      if (seen.has(kanji)) continue;
      seen.add(kanji);
      out.push({ s, origin, kanji });
    }
  };
  push(window.CURATED || [], 'kurasi');
  push(window.BANK || [], 'bank');
  return out;
}

function tokens(s) {
  if (s._t) return s._t;
  s._t = s.t.map(surface => {
    if (Array.isArray(surface)) return surface;           // curated: already full tokens
    const key = bare(surface);
    if (!key) return [surface, '', '', ''];               // punctuation on its own
    const e = LEX[surface] || LEX[key];
    return e ? [surface, e[0], e[1], e[2]] : [surface, '', '', ''];
  });
  return s._t;
}

// ---------------------------------------------------------------- 1. correctness
const REQUIRED = ['key', 'polite', 'long', 'sit', 'sitEn', 'id', 'en', 'note', 'noteEn', 't'];
// Surfaces that carry a polite predicator, and ones that mark plain speech.
const POLITE = ['です', 'ます', 'ました', 'ません', 'でしょう', 'ましょう', 'ください', 'ございます',
                'でした',
                'お願いします', 'いただけます', 'いただけますか', 'ではありません'];
const PAST_TIME = ['昨日', '今朝', '先週', '去年', '先月', 'おととい'];
const NONPAST_TIME = ['明日', '今晩', '来週', '来月', '今夜'];
const PAST_FORMS = ['ました', 'でした', 'だった', 'ていた', 'おいしかった', '寒かった', '高かった',
                    '開けたら', '買った', '食べた', '忘れた', 'もらった', '飲んだ', '会った',
                    '行った', '来た', '帰った'];
// A plain past verb in the -ta form ends in た, which is how most of them are written, so
// the check accepts a clause whose last verb is a た-form as past. Without this the kept
// restaurant sentence was reported as ungrammatical, and it is not.
const PLAIN_PAST = /(った|いた|えた|べた|んだ|した|きた)$/;
// 明日早いんだから is the explanatory んだ, not a past verb, but it ends in んだ and was read as
// one, so the sentence was reported as mixing future time with a past verb. An い before it makes
// it an adjective plus explanation, which is never past.
const isPlainPast = w => PLAIN_PAST.test(w) && w !== 'んだ' && !/いんだ$/.test(w);
// The -te form continues a sentence and can carry past reference on its own:
// 「家で箱を開けたら」 is past even though nothing after it says ました.
const PAST_TE = ['開けたら', '買って', '食べて', '忘れて'];

function checkStructure(rows) {
  const bad = [], keys = new Set();
  for (const { s, origin } of rows) {
    const label = s.key || '(no key)';
    for (const f of REQUIRED) {
      if (s[f] === undefined || s[f] === '' || s[f] === null) bad.push([label, `missing ${f}`]);
    }
    if (keys.has(label)) bad.push([label, 'duplicate key: deep-link order is ambiguous']);
    keys.add(label);
    if (s.rel && !rel[s.rel]) bad.push([label, `unknown relationship ${s.rel}`]);
    if (typeof s.polite !== 'number' && origin === 'bank') bad.push([label, 'polite must be 0 or 1']);
    const kanji = tokens(s).map(t => t[0]).join('');
    if (!kanji || kanji !== tokens(s).map(t => t[0]).join('')) bad.push([label, 'empty kanji line']);
    for (const t of tokens(s)) {
      // A token that is only punctuation has no gloss to give, and the card keeps it for
      // the sentence rather than for the word.
      if (bare(t[0]) === '') continue;
      if (!t[2] || !t[3]) bad.push([label, `no gloss for ${JSON.stringify(t[0])}`]);
    }
  }
  return bad;
}

function checkTense(rows) {
  const bad = [];
  const BREAK = new Set(['から', 'けど', 'けれど', 'ので', 'が', 'とき', 'たら', 'ながら', 'と', 'て', 'で']);
  for (const { s, kanji } of rows) {
    const words = tokens(s).map(t => bare(t[0]));
    let clause = [];
    const clauses = [];
    for (const w of words) {
      clause.push(w);
      if (BREAK.has(w) && w !== 'で') { clauses.push(clause); clause = []; }
    }
    if (clause.length) clauses.push(clause);
    // A clause with no verb is a fragment, not a clause: 「昨日、駅の近く…友達と」 ends at the
    // comitative と and carries no verb, so judging it on its own reported the kept
    // restaurant sentence as ungrammatical. A fragment belongs to the clause that follows.
    const VERBISH = /(ます|ました|ません|です|でした|だ|た|て|る|う|ない|いる|ある)$/;
    const merged = [];
    for (const cl of clauses) {
      const hasVerb = cl.some(w => VERBISH.test(w));
      if (!hasVerb && merged.length) { merged[merged.length - 1].push(...cl); }
      else if (!hasVerb && clauses.indexOf(cl) < clauses.length - 1) { merged.push(cl); }
      else { merged.push(cl); }
    }
    const joined = [];
    for (let i = 0; i < merged.length; i++) {
      const cl = merged[i];
      if (!cl.some(w => VERBISH.test(w)) && i + 1 < merged.length) { joined.push(cl.concat(merged[++i])); }
      else { joined.push(cl); }
    }
    for (const c of joined) {
      const past = PAST_TIME.filter(t => c.includes(t));
      const nonpast = NONPAST_TIME.filter(t => c.includes(t));
      const hasPast = PAST_FORMS.some(f => c.some(w => w.endsWith(f))) ||
                      PAST_TE.some(f => c.some(w => w === f)) ||
                      c.some(isPlainPast);
      if (past.length && !hasPast && !c.some(w => /ています|ています。/.test(w))) {
        bad.push([s.key, `past time ${past} with no past verb in its own clause`]);
      }
      if (nonpast.length && hasPast && !c.some(w => w.endsWith('ます'))) {
        bad.push([s.key, `future time ${nonpast} with a past verb in one clause`]);
      }
    }
  }
  return bad;
}

function checkRegister(rows) {
  const bad = [];
  for (const { s, kanji } of rows) {
    if (s.whoId) continue;                     // the kept sentences carry their own labels
    const polite = POLITE.some(p => kanji.includes(p));
    if (s.polite === 1 && !polite) bad.push([s.key, `marked polite but no polite form: ${kanji}`]);
    if (s.polite === 0 && polite) bad.push([s.key, `marked plain but contains a polite form: ${kanji}`]);
  }
  return bad;
}

// ---------------------------------------------------------------- 2. worth reading
/* れば is the -ba conditional: 出せば, おけば, 進めれば, 伝えれば. It was missing, so
 * この件は分からないので教えていただけますか passed on its ので while
 * 出せばいいのか分からないので… was reported as carrying no relation at all. The two
 * sentences have the same shape; only one of them was being seen. */
const RELATION = ['から', 'ので', 'けど', 'けれど', 'たら', 'とき', 'ながら', 'ため', 'し',
                  'てから', 'あとで', 'まえに', '前に', 'あと', 'のに', 'なければ', 'れば',
                  'なら', 'と', 'が'];
const SEQUENCE = ['それから', 'そのあと', 'そして', '次に', 'その後', 'まず', 'つぎに'];
const MIN_LONG_TOKENS = 6;

function checkOneThought(rows) {
  const bad = [];
  for (const { s, kanji } of rows) {
    const surfaces = tokens(s).map(t => bare(t[0])).filter(Boolean);
    if (s.long) {
      if (surfaces.length < MIN_LONG_TOKENS) {
        bad.push([s.key, `marked long but only ${surfaces.length} words`]);
      } else {
        // The -ba conditional is れば on ichidan verbs but せば, けば, てば on godan ones, so
        // matching れば alone saw 進めれば and missed 出せば and おけば. Two sentences with
        // the same shape were being judged differently. ば itself is matched as the ending.
        const hasRelation = surfaces.some(w =>
          RELATION.some(m => w === m || (m.length >= 2 && w.endsWith(m))) ||
          (w.length > 1 && w.endsWith('ば')));
        if (!hasRelation) bad.push([s.key, 'marked long but carries no relation between its clauses']);
      }
    }
    const glued = surfaces.filter(w => SEQUENCE.includes(w));
    if (glued.length) bad.push([s.key, `clauses glued with ${glued.join(', ')}: give them a reason instead`]);
  }
  return bad;
}

/* The skeleton is what makes two sentences the same sentence: the particles and the
 * predicate, with the nouns and the time words dropped. コンビニで傘を買いました and
 * 薬局で眼鏡を買いました both become "で を 買いました" and are caught here. */
const SHAPE = new Set(['私', '僕', 'あなた', 'これ', 'それ', 'あれ', 'ここ', 'そこ', 'この', 'その',
  'あの', '人', '今日', '明日', '昨日', '今朝', '今晩', '毎日', '先週', '来週', '今', '少し',
  'ちょっと', 'とても', 'もっと', '本当に', 'たぶん', 'きっと', 'また', 'まず', 'もう', 'まだ']);
const SKELETON_LIMIT = 3;

function skeleton(s) {
  const kept = tokens(s).map(t => bare(t[0]))
    .filter(w => w && !SHAPE.has(w) && !/^[、。！？…]+$/.test(w));
  if (!kept.length) return '(empty)';
  return kept.slice(0, -1).join(' ') + ' | ' + kept[kept.length - 1];
}

function checkDistinct(rows) {
  const bad = [], bySkel = new Map(), byKanji = new Map();
  for (const { s, kanji } of rows) {
    const k = skeleton(s);
    if (!bySkel.has(k)) bySkel.set(k, []);
    bySkel.get(k).push(s.key);
    byKanji.set(kanji, (byKanji.get(kanji) || 0) + 1);
  }
  for (const [k, keys] of bySkel) {
    if (keys.length > SKELETON_LIMIT) {
      bad.push([k, `${keys.length} sentences share this skeleton (limit ${SKELETON_LIMIT}): ${keys.join(', ')}`]);
    }
  }
  for (const [kanji, n] of byKanji) if (n > 1) bad.push([kanji, `same sentence ${n} times`]);
  return bad;
}

/* Two per-topic indicators in the topic docs drifted, and nothing was checking them: the
 * relationship line said 11 colleagues when the data had 12, and named "orang asing" for a value
 * the data calls orang_asing. Nine of the twelve lines were wrong. They drifted because they were
 * written by hand from memory, so they are checked here instead, which is what makes them
 * trustworthy enough to keep.
 *
 * It also reports the spread across the measured partner groups, so the one question the
 * per-topic lines cannot answer is answerable: is a whole kind of person missing. Two topic areas
 * are deliberately not written, and each is named with its reason rather than left to look like a
 * gap: teacher and pupil (the words are classroom-specific) and relative (a distant relative is a
 * rarer case of family, which already has 82 sentences). Both are stated in the topic plan. */
const WHO_GROUP = {
  'close family': ['keluarga', 'pasangan'],
  'friends and neighbours': ['teman', 'teman_dekat', 'tetangga', 'tetangga_baru', 'sekamar', 'teman_sekolah'],
  'work and study': ['rekan', 'atasan', 'klien'],
  'teacher and pupil': ['guru'],
  'public and service': ['petugas_toko', 'pelayan', 'petugas_stasiun', 'apoteker', 'dokter', 'kurir'],
  'stranger': ['orang_asing']
};
/* The two groups the deck deliberately does not write, each with its reason, so a thin group is
 * reported as a decision rather than left looking like an oversight. */
const WHO_NOT_WRITTEN = {
  'teacher and pupil': 'classroom-only wording, deliberately not a topic',
  'relative': 'a distant relative is a rarer case of family, which has its own sentences'
};

function checkWho(rows) {
  const counts = new Map(), perTopic = new Map();
  const bank = rows.filter(r => r.origin === 'bank');
  for (const { s } of bank) {
    counts.set(s.rel, (counts.get(s.rel) || 0) + 1);
    if (!perTopic.has(s.topic)) perTopic.set(s.topic, new Map());
    const m = perTopic.get(s.topic);
    m.set(s.rel, (m.get(s.rel) || 0) + 1);
  }
  return { counts, perTopic, bank };
}

/* The long sentences should be most of the deck, so a regression back to a phrasebook of
 * greetings is visible in the numbers rather than only to a reader.
 *
 * The per-topic floor is the part that was missing. The deck-wide floor was already passing
 * while single topics sat at a lower ratio, since every other topic covered for them. Both
 * numbers are guards rather than targets: today the lowest topic is 67.9% and the highest is
 * 100%, so neither floor is close to being touched. */
const LONG_FLOOR = 0.5;
const LONG_FLOOR_TOPIC = 0.6;

function checkBalance(rows) {
  const bad = [];
  const bank = rows.filter(r => r.origin === 'bank');
  const long = bank.filter(r => r.s.long).length;
  if (bank.length && long / bank.length < LONG_FLOOR) {
    bad.push(['balance', `only ${long} of ${bank.length} written sentences are long; the deck is meant to be mostly long ones`]);
  }
  const byTopic = new Map();
  for (const r of bank) {
    const t = r.s.topic || '(no topic)';
    if (!byTopic.has(t)) byTopic.set(t, { n: 0, long: 0 });
    const o = byTopic.get(t);
    o.n++; if (r.s.long) o.long++;
  }
  for (const [t, o] of byTopic) {
    if (o.n >= 10 && o.long / o.n < LONG_FLOOR_TOPIC) {
      bad.push([t, `only ${o.long} of ${o.n} sentences are long (${Math.round(100 * o.long / o.n)}%); ` +
                    `a topic falling back to a phrasebook is hidden while other topics cover for it`]);
    }
  }
  return bad;
}

/* A short sentence has to carry proof that it is what people really say, because that is the
 * only thing that separates it from a long sentence that was never finished. Two proofs count,
 * and either is enough:
 *
 *   - it ends in a sentence-final particle or a polite form, which is what makes a short
 *     utterance sound whole rather than cut off; or
 *   - the entry says short: 1 and gives its reason, for the short utterances that carry no
 *     such mark: phone openings and closings, greetings, thanks.
 *
 * Measured when this was written: 31 of 58 short sentences had neither. The shape of the
 * violation is recognisable, so it is named here: 18 of the 31 ended in a dictionary-form verb
 * (〜する, 〜思う), stopping as soon as the sentence was long enough to stop. */
const FINAL_PARTICLES = ['ね', 'よ', 'か', 'な', 'の', 'わ', 'ぞ', 'ぜ', 'かしら', 'っけ',
  'よね', 'かな', 'だろう', 'でしょう'];
const SHORT_OK_END = ['です', 'ます', 'でした', 'ました', 'ません', 'ください',
  'お願いします', 'でしょうか', 'ましょう', 'くださいませんか'];

/* Where the mark has to be looked for. The first attempt looked at the last word, and that is
 * wrong twice over: 袋はご入用でしょうか。 keeps its mark in the word before the full stop, and
 * でしょうか is split across two words, so both endsWith tests saw a full stop and the sentence
 * was reported as carrying nothing. 18 sentences that are exactly what the rule asks for were
 * named as violations. The mark is therefore looked for at the end of the whole sentence with
 * its trailing punctuation removed, which is what the reader hears. */
function shortMark(s) {
  const raw = tokens(s).map(t => String(t[0])).join('');
  if (/[？?]\s*$/.test(raw)) return 'question mark';
  const last = bare(raw);
  if (FINAL_PARTICLES.some(p => last.endsWith(p))) return 'final particle';
  if (SHORT_OK_END.some(m => last.endsWith(m))) return 'polite ending';
  return null;
}

function checkShort(rows) {
  const bad = [], marked = [];
  const bank = rows.filter(r => r.origin === 'bank');
  for (const { s } of bank) {
    if (s.long) continue;
    if (shortMark(s)) continue;
    if (s.short) { marked.push(s.key); continue; }
    const surfaces = tokens(s).map(t => bare(t[0])).filter(Boolean);
    const last = surfaces[surfaces.length - 1] || '';
    bad.push([s.key, `short with nothing saying people really say it that way: ends in ${JSON.stringify(last)}` +
                     ` and carries no short: 1. Say it with the particle it is said with, or mark it and give the reason`]);
  }
  return { bad, marked };
}

/* A deck of nothing but openers can start a conversation and cannot carry one. Measured
 * frequency backs the rule up: questions are 15-20% of CEJC utterance units, so the other
 * 80-85% of the time a speaker is the one answering. Who answers is decided by the situation,
 * not by the sentence, which is why the floor is small: one sentence often does both jobs, and
 * forcing 「大丈夫です。」 out as a sentence of its own produces a sentence with no meaning. */
const TRIGGER = ['menjawab', 'menanggapi', 'membalas', 'menyetujui', 'menolak', 'menerima',
  'mengaku', 'membenarkan', 'menyangkal', 'ditanya', 'ditelepon', 'ditawari', 'ditawar',
  'diminta', 'ditegur', 'saat ditanya', 'setelah ditanya'];
const TRIGGER_EN = ['answering', 'replies', 'replying', 'responds', 'responding', 'agreeing',
  'declining', 'accepting', 'admits', 'admitting', 'in reply', 'in response', 'when asked',
  'after being asked', 'turns down', 'turning down', 'confirms'];
const REPLY_FLOOR = 3;

function isReply(s) {
  const a = String(s.sit || '').toLowerCase();
  const b = String(s.sitEn || '').toLowerCase();
  return TRIGGER.some(w => a.includes(w)) || TRIGGER_EN.some(w => b.includes(w));
}

function checkReply(rows) {
  const bad = [], byTopic = new Map();
  for (const { s } of rows.filter(r => r.origin === 'bank')) {
    const t = s.topic || '(no topic)';
    if (!byTopic.has(t)) byTopic.set(t, []);
    if (isReply(s)) byTopic.get(t).push(s.key);
  }
  for (const [t, keys] of byTopic) {
    if (keys.length < REPLY_FLOOR) {
      bad.push([t, `only ${keys.length} repl${keys.length === 1 ? 'y' : 'ies'}; a topic needs ${REPLY_FLOOR} ` +
                    `so the deck can carry a conversation and not only start one`]);
    }
  }
  return { bad, totals: byTopic };
}

const rows = assemble();
const reply = checkReply(rows);
const short = checkShort(rows);
const groups = {
  structure: checkStructure(rows),
  tense: checkTense(rows),
  register: checkRegister(rows),
  one_thought: checkOneThought(rows),
  distinct: checkDistinct(rows),
  balance: checkBalance(rows),
  short: short.bad,
  reply: reply.bad,
  who: [],   // reported below rather than as findings: see the spread and per-topic print
};

let total = 0;
const bank = rows.filter(r => r.origin === 'bank');
console.log(`${rows.length} sentences (${rows.length - bank.length} kept, ${bank.length} written); ` +
            `${rows.filter(r => r.s.long).length} long\n`);
for (const [name, bad] of Object.entries(groups)) {
  total += bad.length;
  console.log(`${bad.length ? 'FAIL' : 'ok  '} ${name}: ${bad.length}`);
  for (const [a, b] of bad.slice(0, 300)) console.log(`       ${a} -- ${b}`);
  if (bad.length > 300) console.log(`       ... and ${bad.length - 300} more`);
}
const whoInfo = checkWho(rows);
const replies = [...reply.totals.values()].reduce((a, k) => a + k.length, 0);
console.log(`\nreplies: ${replies} of ${bank.length} (${Math.round(100 * replies / bank.length)}%); ` +
            `short sentences: ${bank.filter(r => !r.s.long).length}, ` +
            `${short.marked.length} of them marked short: 1`);
/* The spread across the measured partner groups, printed so the question a per-topic line cannot
 * answer has somewhere to be read: is a whole kind of person missing. */
console.log('\nwho the sentences are said to, grouped as the survey groups them:');
for (const g of Object.keys(WHO_GROUP)) {
  const n = WHO_GROUP[g].reduce((a, k) => a + (whoInfo.counts.get(k) || 0), 0);
  const note = WHO_NOT_WRITTEN[g] ? `  (${WHO_NOT_WRITTEN[g]})` : '';
  console.log(`  ${g.padEnd(24)} ${String(n).padStart(4)}  ${String(Math.round(100 * n / whoInfo.bank.length)).padStart(2)}%${note}`);
}
/* Per topic, so a topic doc line can be copied from here rather than counted by hand, which is how
 * nine of the twelve lines came to be wrong. */
console.log('\nwho, per topic:');
for (const t of [...whoInfo.perTopic.keys()].sort()) {
  const parts = [...whoInfo.perTopic.get(t).entries()].sort((a, b) => b[1] - a[1]);
  console.log(`  ${t.padEnd(14)} ${parts.map(([k, n]) => `${rel[k] ? rel[k].id : k} ${n}`).join(', ')}`);
}

/* Printed per topic so the topic docs can cite the number instead of counting again by hand, which
 * is how the docs and the data drifted apart the first time. */
for (const t of [...reply.totals.keys()].sort()) {
  console.log(`  ${t.padEnd(14)} ${String(reply.totals.get(t).length).padStart(2)}  ${reply.totals.get(t).join(', ')}`);
}
console.log(`\n${total} finding(s)`);
process.exit(total ? 1 : 0);
