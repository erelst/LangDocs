#!/usr/bin/env python3
"""Speech-rate and relationship analysis from CEJC per-conversation table."""
import os, sys, statistics
from collections import defaultdict
sys.path.insert(0, '.')
from xlsx import read_sheet

WORDS = '語数(記号等除外・全て)'
files = {}
for r, d, f in os.walk('wcx'):
    for n in f:
        if n.endswith('.xlsx'):
            files[os.path.basename(n)] = os.path.join(r, n)
p = [v for k, v in files.items() if 'suw_wc' in k][0]
rows, _ = read_sheet(p, 0)
hdr = rows[0]
idx = {h: i for i, h in enumerate(hdr)}
data = [r for r in rows[1:] if r and r[idx['会話 ID']]]
print("speaker-conversation rows:", len(data))

conv = {}
for r in data:
    cid = r[idx['会話 ID']]
    conv.setdefault(cid, {'dur': float(r[idx['会話時間']] or 0), 'words': 0,
                          'spk': set(), 'rel': r[idx['話者間の関係性']],
                          'form': r[idx['形式']], 'place': r[idx['場所']]})
for r in data:
    cid = r[idx['会話 ID']]
    conv[cid]['words'] += int(float(r[idx[WORDS]] or 0))
    conv[cid]['spk'].add(r[idx['話者 ID']])
print("conversations:", len(conv))
tot_min = sum(c['dur'] for c in conv.values())
tot_words = sum(c['words'] for c in conv.values())
print("total talk minutes: %.0f (%.1f hours)" % (tot_min, tot_min / 60))
print("total words: %d" % tot_words)
print("words per minute (sum over speakers): %.1f" % (tot_words / tot_min))

wpm = []
for r in data:
    d = float(r[idx['会話時間']] or 0)
    if d > 0:
        w = int(float(r[idx[WORDS]] or 0))
        wpm.append(w / d)
print("words/min per speaker-slot: mean %.1f median %.1f" % (statistics.mean(wpm), statistics.median(wpm)))
print("mean speakers per conversation: %.2f" % statistics.mean(len(c['spk']) for c in conv.values()))

byrel = defaultdict(lambda: [0, 0.0, 0])
for r in data:
    d = float(r[idx['会話時間']] or 0)
    rel = r[idx['話者間の関係性']] or 'NA'
    byrel[rel][0] += int(float(r[idx[WORDS]] or 0)); byrel[rel][1] += d; byrel[rel][2] += 1
print("\nby relationship (speaker-side rows):")
for k, (w, d, n) in sorted(byrel.items(), key=lambda x: -x[1][1]):
    print("  %-12s words=%8d minutes=%6.0f wpm=%5.1f n=%d" % (k, w, d, w / max(d, 1), n))

byform = defaultdict(lambda: [0, 0.0, 0])
for r in data:
    d = float(r[idx['会話時間']] or 0)
    k = r[idx['形式']] or 'NA'
    byform[k][0] += int(float(r[idx[WORDS]] or 0)); byform[k][1] += d; byform[k][2] += 1
print("\nby register (形式):")
for k, (w, d, n) in sorted(byform.items(), key=lambda x: -x[1][1]):
    print("  %-14s words=%8d minutes=%6.0f wpm=%5.1f" % (k, w, d, w / max(d, 1)))
