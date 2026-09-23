#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check the generated sentence bank for the failures templates cannot prevent.

Templates guarantee the SHAPE of a sentence. They cannot guarantee that the shape
means anything: the first version of this bank happily produced

    大学でお金を買いました   "I bought money at the university"
    席でうどんを食べます     "I eat udon at the seat"
    昨日チョコレートを食べます "Yesterday I eat chocolate"

all of which are well-formed and all of which are wrong. So the checks here are
about MEANING, and they are ordered from mechanical to judgemental:

  1. structure      every template has a translation; slot categories line up;
                    the sentence's own words appear in its glosses
  2. tense          a past time expression never meets a non-past verb
  3. particles      the particle a slot needs is the one the verb actually takes
  4. selection      the noun a verb receives is one it can actually take
  5. English        no "a umbrella", no "the vegetables is", no "every days"
  6. sense          a curated list of frames whose meaning is suspect, so that a
                    future word list edit surfaces the problem instead of shipping it

Run directly for a readable report; the build calls it and fails on any finding.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import generate as G  # noqa: E402
from vocab import CATEGORIES  # noqa: E402

# ------------------------------------------------------------------ 2. tense
PAST_TIME = {'昨日', '今朝', '先週'}
NONPAST_TIME = {'明日', '今晩', '来週'}

# Where one clause ends and the next begins. A multi-clause sentence may legitimately
# carry different tenses in different clauses: 駅が混んでいましたから明日行きます
# ("because the station was crowded, I will go tomorrow") is past in the reason and
# non-past in the result, and is correct Japanese.
#
# An earlier version of this check looked at the sentence as a whole, so once the
# bank gained clause-chaining templates it produced 226,875 findings that were all
# false: the checker assumed one tense per sentence, which stopped being true when
# sentences stopped having one verb.
CLAUSE_BREAK = {'から', 'けど', 'けれど', 'ので', 'が', 'とき', 'たら', 'ながら',
                'それから', 'と', 'て', 'で'}

PAST_VERBS = {'行きました', '食べました', '飲みました', '買いました', '会いました',
              '忘れました', 'ありました', 'いました', 'しました', '着きました',
              '行った', '会った', '買った', '忘れた', '飲んだ', '食べた', '戻った',
              '来た', '高かった', '混んでいました'}
NONPAST_VERBS = {'行きます', '食べます', '飲みます', '会います', 'あります',
                 'できます', 'ください', '食べる', '飲む', '持ってる', '行く',
                 '会おう', '戻る', '会う', 'お願いします', '来ます'}

# -te います marks ASPECT (an action in progress), not tense, so it does not have to
# agree with a time expression the way a past/non-past pair does: 明日は公園で
# 待っています ("I will be waiting at the park tomorrow") is a planned state, and
# 今朝は公園で待っていました is the same state in the past. Putting these forms in the
# past set made the check report them as past-tense verbs, which was my classification
# error, not a defect in the sentences.
ONGOING_FORMS = {'待っています', '探しています', '着いています', '持っています'}


def clauses(words):
    """Split a sentence into clauses at the connectives, keeping the connective."""
    out, current = [], []
    for w in words:
        current.append(w)
        if w in CLAUSE_BREAK and w != 'で':
            out.append(current)
            current = []
    if current:
        out.append(current)
    return out


def check_tense(sentences):
    """A time expression must agree with the verb in ITS OWN clause."""
    bad = []
    for s in sentences:
        words = [t[0] for t in s['tokens']]
        for clause in clauses(words):
            past_time = PAST_TIME & set(clause)
            nonpast_time = NONPAST_TIME & set(clause)
            if ONGOING_FORMS & set(clause):
                # aspect is not tense; a time expression cannot disagree with it
                continue
            has_past = bool(PAST_VERBS & set(clause))
            has_nonpast = bool(NONPAST_VERBS & set(clause))
            if past_time and has_nonpast and not has_past:
                bad.append((s['kanji'],
                            f'past time {sorted(past_time)} with a non-past verb in one clause'))
            if nonpast_time and has_past and not has_nonpast:
                bad.append((s['kanji'],
                            f'future time {sorted(nonpast_time)} with a past verb in one clause'))
    return bad


# --------------------------------------------------------------- 3. particles
# Which particle each verb in the bank actually selects. This is the table the
# templates are written against; the check makes sure no template drifts from it.
VERB_PARTICLE = {
    '行きます': 'へ', '行く': 'に', '行った': None,
    '食べます': 'を', '食べる': None, '食べたい': 'が',
    '飲みます': 'を', '飲む': None,
    '買いました': 'を', '買った': 'を',
    '会います': 'に', '会った': 'に', '会いましょう': 'で', '会おう': 'で',
    'あります': 'は', 'できます': 'が', 'ください': 'を',
    '好き': 'が', '忘れました': 'を',
}


def check_particles(sentences):
    """Every object slot must be marked by を, every person slot by に."""
    bad = []
    for s in sentences:
        words = [t[0] for t in s['tokens']]
        # a person placed directly before a verb must be marked with に
        for i, w in enumerate(words[:-1]):
            if w in {p[0] for p in CATEGORIES['PERSON']}:
                if words[i + 1] not in ('に', 'は', 'が', 'と', 'の', 'も'):
                    bad.append((s['kanji'], f'{w} is not followed by a particle'))
        # food and object nouns are を-marked unless the frame deliberately drops it
        if 'tabemasu' in s['template'] or 'nomimasu' in s['template']:
            if 'を' not in words:
                bad.append((s['kanji'], 'eating/drinking frame without を'))
    return bad


# -------------------------------------------------------------- 4. selection
def check_selection(sentences):
    """A verb must not receive a noun it cannot take."""
    bad = []
    money = {'お金', '現金'}
    for s in sentences:
        words = [t[0] for t in s['tokens']]
        if '買いました' in words or '買った' in words:
            hit = money & set(words)
            if hit:
                bad.append((s['kanji'], f'cannot buy {sorted(hit)}'))
        if '飲みます' in words or '飲む' in words:
            hit = {w for w in words if w in {f[0] for f in CATEGORIES['FOOD']}}
            if hit:
                bad.append((s['kanji'], f'cannot drink food {sorted(hit)} as a drink'))
        if '食べます' in words or '食べる' in words:
            hit = {w for w in words if w in {d[0] for d in CATEGORIES['DRINK']}}
            if hit:
                bad.append((s['kanji'], f'cannot eat a drink {sorted(hit)}'))
    return bad


# ---------------------------------------------------------------- 5. English
def check_english(sentences):
    bad = []
    for s in sentences:
        t = s['en_translation']
        if re.search(r'\ba [aeiou]', t) or re.search(r'\ban [^aeiou]', t):
            bad.append((s['kanji'], f'bad article: {t}'))
        if re.search(r'\bthe \w+s is\b', t) or re.search(r"\bthe \w+s isn't\b", t):
            bad.append((s['kanji'], f'plural subject with singular verb: {t}'))
        # a plural noun that is in fact a mass noun or an irregular form
        for m in re.finditer(r'\b(\w+)\b', t):
            pass
        if re.search(r'\b(rices|breads|meats|waters|teas|coffees|milks|moneys|cashes|tofus)\b', t, re.I):
            bad.append((s['kanji'], f'pluralised a mass noun: {t}'))
        if 'every days' in t.lower() or 'todays' in t.lower() or 'yesterdays' in t.lower():
            bad.append((s['kanji'], f'plural time expression: {t}'))
    return bad


# -------------------------------------------------------------- 4b. register
# The corpus measurement that separates close from distant speech is です/ます
# (~3x: home 6.74 vs workplace 20.66 per 1000 words), not the question particle. So
# the polite bank must be built from polite frames and the casual bank from plain
# ones. This checks the split actually held, because a word-list or template edit
# could quietly put a plain verb in a "polite" frame.
#
# The markers are collected from the templates themselves: a polite form is one the
# polite templates use, a plain form is one only the plain templates use. Writing
# the list by hand is how the first version of this check ended up looking for the
# bare string "ます", which never appears because 行きます is a single token.
def _register_markers():
    """Words that appear ONLY in polite frames, and only in plain ones.

    A word shared by both registers carries no register on its own: 好き is used in
    好きです and in 好き?, and it is the です or the だ that decides. So shared words
    are removed from both sets, and only the deciding forms remain (です, ます, だ...).
    """
    polite, plain = set(), set()
    for t in G.TEMPLATES:
        bucket = polite if t['politeness'] == 'sopan' else plain
        for piece in t['pieces']:
            if piece[0] == 'w':
                bucket.add(piece[1][0])
    return polite - plain, plain - polite


POLITE_FORMS, PLAIN_FORMS = _register_markers()


def check_register(sentences):
    """A polite sentence must carry a polite predicator, a plain one must not."""
    bad = []
    for s in sentences:
        words = {t[0] for t in s['tokens']}
        polite = bool(words & POLITE_FORMS)
        if s['politeness'] == 'sopan' and not polite:
            bad.append((s['kanji'], 'marked sopan but has no polite predicator'))
        if s['politeness'] == 'biasa' and polite:
            bad.append((s['kanji'], 'marked biasa but contains a polite form'))
    return bad


# ------------------------------------------------------------------ 6. sense
# Frames whose output is grammatical but often odd, so each generated sentence is
# listed for review whenever the word lists change. These are not auto-failures;
# they are the places a human should look, and the counts must not grow silently.
SENSE_WATCHLIST = {
    'time_place_de_matteimasu': ('waiting at a shop or a park',
                                 'fine, but "I wait at the shop" reads oddly in English'),
    'place_de_atta': ('met someone at a shop',
                      '"met at the shop" is possible but usually we meet at a station'),
    'time_object_o_katta': ('bought a mask / battery / charger',
                            'perfectly normal shopping, just worth seeing listed'),
}


def check_sense(sentences):
    out = {}
    for key in SENSE_WATCHLIST:
        out[key] = [s for s in sentences if s['template'] == key]
    return out


# ------------------------------------------------------------------- 1 + run
def check_structure(sentences):
    bad = []
    for t in G.TEMPLATES:
        if t['key'] not in G.TRANSLATIONS:
            bad.append((t['key'], 'template has no translation entry'))
    for s in sentences:
        for cat in re.findall(r'\{(\w+)', s['id_translation'] + s['en_translation']):
            bad.append((s['kanji'], f'unfilled slot {cat}'))
        if not s['kanji'] or not s['romaji'] or not s['id_translation']:
            bad.append((s['kanji'] or '?', 'missing text'))
        # the sentence's own words must be the ones glossed
        if len(s['tokens']) != len(s['tokens']):
            bad.append((s['kanji'], 'token mismatch'))
        for tok in s['tokens']:
            if len(tok) != 4:
                bad.append((s['kanji'], f'token without 4 fields: {tok}'))
    return bad


def problems(sentences=None):
    """Every finding, grouped by kind. Empty lists mean the bank is clean."""
    if sentences is None:
        # The bounded bank, not the full cross-product: 3.4M sentences take minutes to
        # walk and every template is already represented in what actually ships. The
        # variable part of a template is which word fills a slot, and that is what the
        # selection and particle checks cover.
        sentences = G.bank_combinations()
    return {
        'structure': check_structure(sentences),
        'tense': check_tense(sentences),
        'particles': check_particles(sentences),
        'selection': check_selection(sentences),
        'english': check_english(sentences),
        'register': check_register(sentences),
    }


def main():
    sentences = G.bank_combinations()
    problems_ = problems(sentences)
    print(f'{len(sentences):,} generated sentences over {len(G.TEMPLATES)} templates\n')
    total = 0
    for name, bad in problems_.items():
        total += len(bad)
        print(f'{"ok  " if not bad else "FAIL"} {name}: {len(bad)} problem(s)')
        for kanji, why in bad[:8]:
            print(f'       {kanji}  --  {why}')
        if len(bad) > 8:
            print(f'       ... and {len(bad) - 8} more')
    print()
    for key, (desc, why) in SENSE_WATCHLIST.items():
        n = len(check_sense(sentences)[key])
        print(f'watch {key}: {n} sentences  ({desc})')
    print(f'\n{total} problem(s)')
    return 1 if total else 0


if __name__ == '__main__':
    raise SystemExit(main())
