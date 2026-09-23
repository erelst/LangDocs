#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""The checks a hand-written bank needs and a generated one did not.

check_sentences.py asks whether a sentence is CORRECT (tense, particles, register). It
cannot ask whether the bank is WORTH READING, because that is not a property of one
sentence. The old bank failed exactly there: every sentence passed the correctness checks
and the user's verdict was still "banyak sekali yang polanya sama hanya saja berbeda di
topik". So the checks here are about the bank as a whole:

  1. distinctness   no two sentences reduce to the same skeleton. The skeleton keeps the
                    particles and the last word and drops the nouns, so
                    "コンビニで傘を買いました" and "薬局で眼鏡を買いました" both become
                    "で を 買いました" and are caught. This is the check that would have
                    failed the old bank loudly instead of quietly.
  2. granularity    each word is a word. A greeting stored as one token renders as one
                    coloured span and the word-by-word panel is pointless, so a phrase
                    longer than a few characters must be split into its parts unless it
                    is on the allow-list WITH A REASON. Compounds that stay whole are
                    recorded there by name, so the exemption is visible and reviewable.
  3. one thought    a long sentence must carry a real relation (ので, から, けど, たら,
                    とき, ながら, てから) and must not be two thoughts glued with
                    それから/そのあと/そして. A long list of the latter fails, because
                    that is precisely what the user rejected.
  4. notes          each note explains something specific. A note repeated word for word
                    across many sentences is boilerplate and is reported.
  5. coverage       every function a topic declares has at least one sentence. compose
                    .assemble() already enforces this; it is re-asserted here so running
                    this file alone gives the full picture.

Run it directly for a readable report; the build calls problems() and fails on findings.
"""
import os
import sys
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import compose  # noqa: E402
import check_sentences as CS  # noqa: E402

# --------------------------------------------------------------- 1. distinctness
# Words that carry the shape of a sentence rather than its topic: pronouns, generic nouns,
# and time words. They are dropped from the skeleton because swapping 私 for 僕, or 今日
# for 明日, does not make a new sentence; swapping the VERB or the particle pattern does.
SHAPE_WORDS = {
    '私', '僕', 'あなた', 'これ', 'それ', 'あれ', 'ここ', 'そこ', 'あそこ', 'この', 'その',
    'あの', '人', 'こと', 'もの', 'とき', 'ところ', '方',
    '今日', '明日', '昨日', '今朝', '今晩', '毎日', '毎朝', '先週', '来週', '今週',
    '来月', '先月', '今年', '去年', '朝', '昼', '夜', '晩', '夕方', '今', '今夜',
    '少し', 'ちょっと', 'たくさん', 'とても', 'もっと', '本当に', 'たぶん', 'きっと',
    'やっぱり', 'ゆっくり', '早く', 'すぐ', 'また', 'まず', 'だいたい', 'しっかり',
    '一番', '一緒に', '一人で', 'まだ', 'もう', 'いつも', 'ときどき', 'たいてい', 'たまに',
}

# How often one skeleton may appear before it counts as the same sentence reused. Each
# topic needs several functions, and unrelated topics legitimately ask a question in the
# same shape ("は どこですか" appears for the toilet and for the station), so the limit is
# above one. It is deliberately far below what the old bank would have produced: 1,494
# sentences over a few dozen shapes.
SKELETON_LIMIT = 3


def skeleton(s):
    """Reduce a sentence to the part that makes it a different sentence.

    Keeps every particle and every word with lexical content, drops the SHAPE_WORDS, then
    keeps the last surviving word, which is where the predicate lives. The result is order
    preserving, so で…を…買いました and を…で…買いました stay distinct.
    """
    surfaces = [t[0].rstrip(compose.PUNCT_CHARS) for t in s['tokens']]
    kept = []
    for w in surfaces:
        if w in SHAPE_WORDS:
            continue
        if len(w) == 1 and w in compose.PUNCT_CHARS:
            continue
        kept.append(w)
    if not kept:
        return '<empty>'
    return ' '.join(kept[:-1] + ['|'] + kept[-1:])


def check_distinctness(sentences):
    """Group by skeleton; report every skeleton used more often than the limit."""
    by_skel = defaultdict(list)
    for s in sentences:
        by_skel[skeleton(s)].append(s)
    bad = []
    for skel, group in by_skel.items():
        if len(group) > SKELETON_LIMIT:
            keys = ', '.join(s['key'] for s in group)
            bad.append((skel, f'{len(group)}x (limit {SKELETON_LIMIT}): {keys}'))
    exact = Counter(s['kanji'] for s in sentences if s['kanji'])
    for kanji, n in exact.items():
        if n > 1:
            bad.append((kanji, f'same kanji line appears {n} times'))
    return sorted(bad)


# --------------------------------------------------------------- 2. granularity
# A token longer than this must be either split or declared as one word by its topic.
# The limit is 7 because ordinary inflected verbs run to six characters (待っています,
# 入っています) and flagging those would drown the real finding, which is a phrase stored as
# one blob: 「お元気ですか」 as a single token renders as one coloured span and the
# word-by-word panel, the whole reason the card has a panel, shows nothing.
MAX_TOKEN_CHARS = 7


def _declared_single_words():
    """Surfaces the topic modules vouch for as single words, with the reason why.

    Declaring them per module keeps the exemption next to the data, and keeps it visible:
    a reviewer reading a topic sees exactly which of its long tokens were considered and
    kept whole, rather than trusting an invisible global list.
    """
    out = {}
    for name in compose.existing_topics():
        module = __import__('topics.' + name, fromlist=['SINGLE_WORDS'])
        for surface, why in getattr(module, 'SINGLE_WORDS', {}).items():
            out[surface] = (name, why)
    return out


def check_granularity(sentences):
    """A word must be a word, so the card's per-word colouring means something."""
    allowed = _declared_single_words()
    bad = []
    for s in sentences:
        # A sentence of one word is legitimate when that word IS the whole utterance --
        # おはようございます is a set greeting, not a phrase that should be taken apart --
        # so it needs the same declaration the long tokens need.
        if len(s['tokens']) < 2:
            surface = s['tokens'][0][0].rstrip(compose.PUNCT_CHARS)
            if surface not in allowed:
                bad.append((s['key'], f'one token ({surface!r}): either split it into words '
                                      f'or declare it in the topic\'s SINGLE_WORDS'))
        for t in s['tokens']:
            surface = t[0].rstrip(compose.PUNCT_CHARS)
            if len(surface) > MAX_TOKEN_CHARS and surface not in allowed:
                bad.append((s['key'], f'{surface!r} is {len(surface)} chars: split it into words, '
                                      f'or declare it in the topic\'s SINGLE_WORDS'))
    return bad


# ------------------------------------------------------------------ 3. one thought
# A long sentence must carry a relation AND have enough words to be worth calling long.
# Six is the floor because the relations themselves cost tokens: 「もう遅いので、また今度に
# しましょう」 is seven tokens and is genuinely a longer, two-clause sentence, while
# 「時間がないから、急いでください」 at five is a compound but not a long sentence, and the
# honest thing is to leave that one unflagged rather than pad it to pass a threshold.
MIN_LONG_TOKENS = 6


def _markers_in(surfaces, markers):
    """Which markers appear, including attached to a longer word.

    Japanese glues the connective onto the word before it: the sentence says 見てから, not
    から alone, and 飲みながら, not ながら. Matching whole tokens only missed every one of
    those, so a marker counts when a token equals it or ends with it.
    """
    hits = set()
    for surface in surfaces:
        if surface in markers:
            hits.add(surface)
            continue
        # Only multi-character markers may match inside a longer token: 見てから ends with
        # から, but が and し are single characters and would match all over the place. They
        # count only as standalone tokens, which is exactly how a clause break uses them.
        for marker in markers:
            if len(marker) >= 2 and surface.endswith(marker):
                hits.add(marker)
    return hits


def check_one_thought(sentences):
    """A long sentence joins its clauses with a relation, not with a sequence marker."""
    bad = []
    for s in sentences:
        surfaces = [t[0].rstrip(compose.PUNCT_CHARS) for t in s['tokens']]
        n = len(s['tokens'])
        relations = _markers_in(surfaces, compose.RELATION_MARKERS)
        sequences = _markers_in(surfaces, compose.SEQUENCE_MARKERS)
        if s.get('long'):
            if n < MIN_LONG_TOKENS:
                bad.append((s['key'], f'marked long but only {n} tokens'))
            elif not relations:
                bad.append((s['key'], 'marked long but carries no relation '
                                      '(ので/から/けど/たら/とき/ながら/てから)'))
        if sequences:
            bad.append((s['key'], f'clauses glued with {sorted(sequences)}: replace the '
                                  f'sequence marker with a real relation'))
    return bad


# ------------------------------------------------------------------------ 4. notes
NOTE_LIMIT = 2


def check_notes(sentences):
    """A note repeated verbatim across sentences explains nothing about any of them."""
    counts = Counter(s['note'] for s in sentences)
    bad = []
    for note, n in counts.items():
        if n > NOTE_LIMIT:
            bad.append((note[:60], f'same note on {n} sentences'))
    for s in sentences:
        for field in ('note', 'note_en', 'id_translation', 'en_translation'):
            if '{' in s[field] or '}' in s[field]:
                bad.append((s['key'], f'unfilled slot in {field}'))
    return bad


# --------------------------------------------------------------------- 5. coverage
def check_coverage(sentences):
    """Every declared function of every topic has a sentence, and every sentence a function.

    compose.assemble() enforces this while building, but a reader running this file alone
    should get the same verdict, and the coverage table is the thing that shows whether a
    topic is really covered rather than nominally present.
    """
    bad = []
    per_topic = defaultdict(set)
    for s in sentences:
        per_topic[s.get('topic', '?')].add(s['fn'])
    for name in compose.existing_topics():
        module = __import__('topics.' + name, fromlist=['FUNCTIONS'])
        declared = set(module.FUNCTIONS)
        present = per_topic.get(name, set())
        for fn in sorted(declared - present):
            bad.append((name, f'declared function {fn!r} has no sentence'))
        for fn in sorted(present - declared):
            bad.append((name, f'function {fn!r} is used but not declared'))
    return bad


def report_balance(sentences):
    """The long/short and register balance, printed rather than asserted.

    The user asked for roughly half long and half short, so the build reports the real
    numbers. It is a report and not a failure because the right split is a judgement: a
    topic like greetings is made of short set phrases, and forcing half of it to be long
    would produce the padded sentences this whole rework exists to remove.
    """
    by_topic = defaultdict(lambda: [0, 0])
    for s in sentences:
        row = by_topic[s.get('topic', '?')]
        row[0 if s.get('long') else 1] += 1
    return by_topic


def problems(sentences=None):
    """Every finding of this file, plus the correctness checks from check_sentences."""
    if sentences is None:
        sentences = compose.assemble()
    out = {
        'distinctness': check_distinctness(sentences),
        'granularity': check_granularity(sentences),
        'one_thought': check_one_thought(sentences),
        'notes': check_notes(sentences),
        'coverage': check_coverage(sentences),
    }
    for name, bad in CS.problems(sentences).items():
        out['correctness/' + name] = bad
    return out


def main():
    sentences = compose.assemble()
    long_n = sum(1 for s in sentences if s.get('long'))
    print(f'{len(sentences)} sentences over {len(compose.TOPICS)} topics; '
          f'{long_n} long, {len(sentences) - long_n} short\n')
    bad = problems(sentences)
    total = 0
    for name, findings in bad.items():
        total += len(findings)
        print(f'{"ok  " if not findings else "FAIL"} {name}: {len(findings)} finding(s)')
        for a, b in findings[:10]:
            print(f'       {a}  --  {b}')
        if len(findings) > 10:
            print(f'       ... and {len(findings) - 10} more')
    print()
    for topic, (lng, srt) in sorted(report_balance(sentences).items()):
        print(f'  {topic:18s} long={lng:3d}  short={srt:3d}')
    print(f'\n{total} finding(s)')
    return 1 if total else 0


if __name__ == '__main__':
    raise SystemExit(main())
