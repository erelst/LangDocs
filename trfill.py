#!/usr/bin/env python3
"""Writes the per-paragraph translation into the narrative blocks.

Usage: python3 trfill.py id tr_id.json en tr_en.json

Each file: { key: [ <per-block translation>, ... ] } — one entry per block, in order. A block whose
translation is one sentence is written as a plain string; a block with several sentences is a list,
one string per sentence, in the same order as the Japanese sentences.

Both languages are required, because the page shows exactly one of them: `block.id` for an
Indonesian reader and `block.en` for an English one. Storing only one is how English mode ended up
showing Indonesian.

Why a block translation exists at all: the narrative-level `id` is a one-line SUMMARY of the whole
piece, not a translation. A reader looking at one sentence needs that sentence's meaning, so each
block carries its own and the Translation switch shows it under the paragraph.

Re-running is safe: existing translations on the block are replaced, not repeated.
"""
import json, os, re, sys

ARGS = sys.argv[1:]
if len(ARGS) != 4 or ARGS[0] not in ('id', 'en') or ARGS[2] not in ('id', 'en') or ARGS[0] == ARGS[2]:
    sys.exit('usage: python3 trfill.py id tr_id.json en tr_en.json')


def jsstr(v):
    """A JS string in this repo's style: single quotes, list for several sentences."""
    if isinstance(v, list):
        return '[' + ', '.join(jsstr(x) for x in v) + ']'
    return "'" + str(v).replace('\\', '\\\\').replace("'", "\\'") + "'"


SOURCES = {ARGS[0]: json.load(open(ARGS[1], encoding='utf-8')),
           ARGS[2]: json.load(open(ARGS[3], encoding='utf-8'))}

files = ['data/curated.js'] + sorted(
    os.path.join('data', f) for f in os.listdir('data') if re.match(r'^t_.*\.js$', f))

filled, blocks, missing = [], 0, []
for path in files:
    src = open(path, encoding='utf-8').read()
    for key in SOURCES[ARGS[0]]:
        marker = "key: '%s'," % key
        if marker not in src:
            continue
        per_block = {lang: SOURCES[lang][key] for lang in SOURCES}
        bstart = src.index('    blocks: [', src.index(marker))
        bend = src.index('\n    ]', bstart)
        lines = src[bstart:bend].split('\n')
        rows = [i for i, l in enumerate(lines) if re.match(r'^      \{ ', l)]
        for lang in per_block:
            assert len(rows) == len(per_block[lang]), '%s (%s): %d blocks vs %d translations' % (
                key, lang, len(rows), len(per_block[lang]))
        for n, i in enumerate(rows):
            # Keep `sp`, drop any translation already there, and put both languages in front of `t`.
            # The string pattern allows escaped quotes: a translation containing \' ends a naive
            # [^']* early, which used to leave the old value in place and append a second
            # duplicate key next to it.
            STR = r"'(?:[^'\\]|\\.)*'"
            m = re.match(r"^      \{ ((?:sp: '[^']*', )?)"
                         r"((?:(?:id|en): (?:" + STR + r"|\[(?:" + STR + r", )*" + STR +
                         r"\]), )*)", lines[i])
            assert m, '%s block %d: unrecognised head -> %s' % (key, n, lines[i][:60])
            head = '      { ' + m.group(1)
            for lang in ('id', 'en'):
                head += lang + ': ' + jsstr(per_block[lang][n]) + ', '
            lines[i] = head + lines[i][m.end():]
            # One key each, or the file silently keeps a duplicate that JS resolves by taking the
            # last one, so a wrong translation can sit in plain sight.
            assert lines[i].count(' id: ') == 1 or lines[i].startswith("      { id: "), \
                '%s block %d: duplicate id -> %s' % (key, n, lines[i][:80])
            assert lines[i].count(' en: ') == 1, \
                '%s block %d: duplicate en -> %s' % (key, n, lines[i][:80])
            blocks += 1
        src = src[:bstart] + '\n'.join(lines) + src[bend:]
        filled.append(key)
    open(path, 'w', encoding='utf-8').write(src)

print('%d narratives, %d blocks filled' % (len(filled), blocks))
for key in SOURCES[ARGS[0]]:
    if key not in filled:
        missing.append(key)
if missing:
    print('WARNING not found: %s' % ' '.join(missing))
