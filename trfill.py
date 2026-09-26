#!/usr/bin/env python3
"""Writes the per-paragraph translation into the narrative blocks.

Usage: python3 trfill.py tr.json

tr.json: { key: [ <per-block translation>, ... ] } — one entry per block, in order. A block whose
translation is one sentence is written as a plain string; a block with several sentences is a list,
one string per sentence, in the same order as the Japanese sentences.

Why block.id exists at all: the narrative-level `id` is a one-line SUMMARY of the whole piece, not
a translation. A reader looking at one sentence needs the meaning of that sentence, so each block
carries its own, and the Translation switch shows it under the paragraph.

Re-running is safe: an existing `id` on the block is replaced, not repeated.
"""
import json, os, re, sys

if len(sys.argv) != 2:
    sys.exit('usage: python3 trfill.py tr.json')


def jsstr(v):
    """A JS string in this repo's style: single quotes, list for several sentences."""
    if isinstance(v, list):
        return '[' + ', '.join(jsstr(x) for x in v) + ']'
    return "'" + str(v).replace('\\', '\\\\').replace("'", "\\'") + "'"


tr = json.load(open(sys.argv[1], encoding='utf-8'))
files = ['data/curated.js'] + sorted(
    os.path.join('data', f) for f in os.listdir('data') if re.match(r'^t_.*\.js$', f))

filled, blocks, missing = [], 0, []
for path in files:
    src = open(path, encoding='utf-8').read()
    for key, per_block in tr.items():
        marker = "key: '%s'," % key
        if marker not in src:
            continue
        bstart = src.index('    blocks: [', src.index(marker))
        bend = src.index('\n    ]', bstart)
        lines = src[bstart:bend].split('\n')
        rows = [i for i, l in enumerate(lines) if re.match(r'^      \{ ', l)]
        assert len(rows) == len(per_block), '%s: %d blocks vs %d translations' % (
            key, len(rows), len(per_block))
        for n, i in enumerate(rows):
            # Keep whatever the block already had (`sp`), swap the `id` in front of `t`.
            m = re.match(r"^      \{ ((?:sp: '[^']*', )?)(?:id: (?:'[^']*'|\[[^\]]*\]), )?", lines[i])
            assert m, '%s block %d: unrecognised head -> %s' % (key, n, lines[i][:60])
            lines[i] = '      { ' + m.group(1) + 'id: ' + jsstr(per_block[n]) + ', ' + \
                       lines[i][m.end():]
            blocks += 1
        src = src[:bstart] + '\n'.join(lines) + src[bend:]
        filled.append(key)
    open(path, 'w', encoding='utf-8').write(src)

print('%d narratives, %d blocks filled' % (len(filled), blocks))
for key in tr:
    if key not in filled:
        missing.append(key)
if missing:
    print('WARNING not found: %s' % ' '.join(missing))
