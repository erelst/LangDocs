#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""The sentence bank the page renders: hand-written sentences, grouped by topic.

Why the bank is written rather than generated
---------------------------------------------
The bank used to be assembled from 57 templates crossed with word lists. That produced 1,504
sentences and the reader's verdict was that almost all of them were the same sentence with a
different noun in it: コンビニで傘を買いました and 薬局で眼鏡を買いました are one sentence typed
twice. The templates were not wrong, they were just a grammar exercise, and the longer ones
read as clauses bolted together with それから rather than one thought.

So every sentence here is written by hand, one function at a time. Each topic in
scripts/topics/ declares the functions people actually need for that subject (asking the
time, being told it, proposing a slot, declining one, arriving late) and provides a sentence
for each, so a topic cannot ship as a single example sentence. scripts/uniqueness.py then
checks the bank as a whole: that no two sentences reduce to the same particle skeleton, that
no long sentence is two thoughts glued with それから, and that every declared function has a
sentence.

Order
-----
Topic order, as declared in compose.TOPICS: a day, roughly, from waking up to going to bed.
The order is stable across builds because the deep links (#q12) depend on it.
"""
import compose

# Every sentence in the bank is hand-written now, so the origin tag survives only to keep
# the build's reporting and its assertions readable, and to make a generated sentence
# reappearing anywhere an obvious failure rather than a silent regression.
HAND_WRITTEN = 'hand'


def all_sentences():
    """The full bank: every hand-written sentence, in topic order.

    Fresh dicts so a caller (the renderer, or a build check) cannot mutate the source
    sentence and affect the next build in the same process.
    """
    return [dict(s) for s in compose.assemble()]


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
    import uniqueness
    rows = all_sentences()
    by_origin, by_who = stats(rows)
    print(f'{len(rows):,} sentences over {len(compose.existing_topics())} topics')
    for k, v in sorted(by_origin.items()):
        print(f'  {v:>6,}  origin {k}')
    for k, v in sorted(by_who.items()):
        print(f'  {v:>6,}  register {k}')
    print(f'  long (multi-clause): {sum(1 for s in rows if s.get("long")):,}')
    bad = uniqueness.problems(rows)
    total = sum(len(v) for v in bad.values())
    print(f'  uniqueness/correctness findings: {total}')
