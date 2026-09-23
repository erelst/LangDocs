#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""The sentence bank the page renders: the curated set, then the generated one.

Order and precedence
--------------------
The hand-written sentences in sentences.py come first and win. They were chosen
for the situations the analysis actually measured (greeting a neighbour, asking a
stranger, ordering in a shop), and they are the ones whose translations have been
read most carefully. A generated sentence that happens to duplicate one of them by
its kanji line is dropped, so the page never shows the same sentence twice.

Why a generated tail at all
---------------------------
Japanese-Everyday-Sentence-Probability.md estimates the usable everyday sentence
space at ~10^7 for a speaker with 5,000 active words, from the measured exponent of
4.19 words per utterance unit. A hand-written list cannot approach that, and a
hand-written list of thousands is exactly where ungrammatical sentences get in
unnoticed. scripts/generate.py therefore assembles sentences from templates whose
grammar is correct by construction, and scripts/check_sentences.py checks the
things construction cannot guarantee (tense agreement, the particle each verb
selects, whether a verb can actually take the noun it was given).

The count is capped deliberately
--------------------------------
Each card costs about 6.5 KB of HTML, because the dark theme, the underlines and
the per-word colours are written inline so they survive a renderer that drops
<style>. The whole page is a single HTML file with no build step, so the cap below
is a real tradeoff and not an arbitrary number: the full bank is ~9.7 MB, which is
too much for a page a phone has to parse before anything appears. The cap is
applied in build_page.py, where the cost is measured and printed.
"""
import generate
import sentences

# Prefer the curated sentences, then the generated ones, in a stable order so the
# page and the deep links (#q12) do not move between builds.
HAND_WRITTEN = 'kurasi'


def hand_written():
    """The curated sentences, as fresh dicts so callers cannot mutate the source."""
    return [dict(s) for s in sentences.CURATED]


def generated():
    """The generated bank, already checked by check_sentences.py."""
    out = []
    for s in generate.bank_combinations():
        s['origin'] = 'generated'
        out.append(s)
    return out


def dedupe(rows):
    """Drop a generated sentence whose kanji line is already present.

    The hand-written sentence keeps its place and its translation, because those
    are the ones with a human reading behind them.
    """
    seen = set()
    out = []
    for s in rows:
        key = s['kanji']
        if key in seen:
            continue
        seen.add(key)
        out.append(s)
    return out


def all_sentences():
    """The full bank: curated first, then generated, no duplicates."""
    curated = hand_written()
    for s in curated:
        s['origin'] = HAND_WRITTEN
    return dedupe(curated + generated())


def with_ids(rows):
    """Number the rows for the deep links (#q1, #q2, ...)."""
    for i, s in enumerate(rows, 1):
        s['id'] = i
    return rows


def stats(rows):
    """Counts the build prints, so the register split is visible per build."""
    by_origin = {}
    by_who = {}
    for s in rows:
        by_origin[s.get('origin', '?')] = by_origin.get(s.get('origin', '?'), 0) + 1
        by_who[s['who']] = by_who.get(s['who'], 0) + 1
    return by_origin, by_who


if __name__ == '__main__':
    rows = all_sentences()
    by_origin, by_who = stats(rows)
    print(f'{len(rows):,} sentences')
    for k, v in sorted(by_origin.items()):
        print(f'  {v:>6,}  {k}')
    for k, v in sorted(by_who.items()):
        print(f'  {v:>6,}  register {k}')
    print(f'  {len(generate.TEMPLATES)} templates in the generated part')
