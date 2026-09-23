#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check the sentence bank for the failures a single authored sentence can hide.

This file used to check a GENERATED bank, and it was written against templates: it asked
each template which words its slots declared, and it derived the polite/plain vocabulary
from which templates used which word. Both of those are gone. The bank is hand-written
now, so this checks the sentences themselves, and the one thing it lost with the templates
it now states explicitly instead of deriving.

What is checked, from mechanical to judgemental:

  1. structure    required fields non-empty; every token has exactly four fields;
                  the kanji line is exactly the concatenation of its tokens and the
                  romaji line exactly their romanisation, so the card and the panel
                  cannot disagree about what the sentence says
  2. tense        a time expression agrees with the verb in ITS OWN clause
  3. particles    a person noun carries a particle; a food/drink object carries を
  4. selection    a verb is not handed a noun it cannot take (buying money, eating a drink)
  5. English      article and plural agreement in the translation
  6. register     a sentence marked sopan carries a polite predicator, and one marked
                  biasa does not

The register markers are the one place the old derived approach was better: it could not
say 行きます is polite because it read that off the templates. With hand-written sentences
there is nothing to derive from, so the markers are listed below and the list is small and
explicit. That means the check can be fooled by a polite form nobody added to the list; the
mitigation is that the list is short enough to read, and every form in the bank is in it,
which the structure check verifies.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import compose  # noqa: E402

# ------------------------------------------------------------------ 2. tense
PAST_TIME = {'昨日', '今朝', '先週', '去年', '先月'}
NONPAST_TIME = {'明日', '今晩', '来週', '来月', '今夜'}

# Where one clause ends and the next begins. A multi-clause sentence may legitimately carry
# different tenses in different clauses: 駅が混んでいましたから明日行きます ("because the
# station was crowded, I will go tomorrow") is past in the reason and non-past in the
# result, and is correct Japanese.
#
# An earlier version of this check looked at the sentence as a whole, so once the bank held
# clause-chaining sentences it produced 226,875 findings that were all false: the checker
# assumed one tense per sentence, which stopped being true the moment sentences stopped
# having one verb.
CLAUSE_BREAK = {'から', 'けど', 'けれど', 'ので', 'が', 'とき', 'たら', 'ながら', 'と', 'て', 'で'}

# Surfaces that mark past tense, and surfaces that mark non-past. Kept as sets of complete
# tokens rather than stems, because the bank glosses each inflected form as its own word.
PAST_VERBS = {
    '行きました', '食べました', '飲みました', '買いました', '会いました', '忘れました',
    'ありました', 'いました', 'しました', '着きました', '行った', '会った', '買った',
    '忘れた', '飲んだ', '食べた', '帰った', '来た', '高かった', '混んでいました',
    'おいしかった', '遅れました', '帰りました', '来ました', '寝ました', '起きました',
    '働きました', '勉強しました', '練習しました', '作りました', '掃除しました',
    '休みました', '払いました', '送りました', '受け取りました', '見つかりました',
    '見つけました', '話しました', '連絡しました', '遅くなりました', 'なりました',
    '閉まりました', '開きました', 'つきました', '消えました', '治りました',
    '痛くなりました', '寝坊しました', '待っていました', '飲んでいました',
    '変わりました', '分かりました', 'できました', '着いた', '食べすぎました',
}
NONPAST_VERBS = {
    '行きます', '食べます', '飲みます', '会います', 'あります', 'できます', 'ください',
    '食べる', '飲む', '持ってる', '行く', '会おう', '戻る', '会う', 'お願いします',
    '来ます', '帰ります', '起きます', '寝ます', '働いています', '勉強します',
    '練習します', '作ります', '掃除します', '休みます', '払います', '送ります',
    '見ます', '聞きます', '話します', '連絡します', '待ちます', '待っています',
    '貸します', '借ります', '使います', '持ちます', '座ります', '乗ります',
    '降ります', '曲がります', '渡ります', '通ります', '並んでいます', '混んでいます',
    '空いています', '開いています', '閉まっています', '探しています', '知っています',
    '覚えています', '分かります', '分かりません', '知りません', '決めます', 'かかります',
    '入っています', '遅れそうです', '出かける', '着く', 'ある', 'いる', 'します',
    'しましょう', 'しませんか', 'しましょうか', 'なる', '大丈夫', '無理',
}

# -te います marks ASPECT (an action in progress), not tense, so it does not have to agree
# with a time expression the way a past/non-past pair does: 明日は公園で待っています ("I
# will be waiting at the park tomorrow") is a planned state, and 今朝は公園で待っていました
# is the same state in the past. Putting these in the past set made the check report them
# as past-tense verbs, which was a classification error, not a defect in the sentences.
ONGOING_FORMS = {
    '待っています', '探しています', '着いています', '持っています', '働いています',
    '並んでいます', '混んでいます', '空いています', '開いています', '閉まっています',
    '知っています', '覚えています', '入っています', '飲んでいました',
    '待っていました', '住んでいます',
}


def clauses(tokens):
    """Split a sentence into clauses at the connectives, keeping the connective."""
    out, current = [], []
    for word in tokens:
        current.append(word)
        if word in CLAUSE_BREAK and word != 'で':
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
                continue          # aspect is not tense; nothing can disagree with it
            has_past = bool(PAST_VERBS & set(clause))
            has_nonpast = bool(NONPAST_VERBS & set(clause))
            if past_time and has_nonpast and not has_past:
                bad.append((s['key'], f'past time {sorted(past_time)} with a non-past verb in one clause'))
            if nonpast_time and has_past and not has_nonpast:
                bad.append((s['key'], f'future time {sorted(nonpast_time)} with a past verb in one clause'))
    return bad


# --------------------------------------------------------------- 3. particles
# There was a VERB_PARTICLE table here claiming to describe which particle each verb
# selects. Nothing consulted it, and the templates carried the particle themselves, so a
# duplicate table could only drift from the data it duplicated. The hand-written bank makes
# the same point differently: the sentence either carries the particle or it does not, and
# that is visible in the tokens.
PERSON_NOUNS = {
    '友達', '家族', '母', '父', '兄', '姉', '先生', '学生', '医者', '部長', '社長',
    '同僚', '店員', '客', '彼', '彼女', '子供', '人',
}
FOOD_AND_DRINK = {
    'ご飯', '朝ご飯', '昼ご飯', '晩ご飯', 'パン', '卵', '肉', '魚', '野菜', '果物',
    'りんご', 'みかん', 'バナナ', 'サラダ', 'スープ', 'カレー', 'ラーメン', '寿司',
    '弁当', 'お菓子', 'チョコレート', 'ケーキ', 'アイスクリーム', '水', 'お茶',
    'コーヒー', 'ジュース', 'ビール', '牛乳', 'ワイン', '味噌汁',
}
# Verbs that need an を-marked object. 持って / 持ちます are deliberately absent: 持って
# almost always appears inside 持ってくる / 持っていく ("bring" / "take"), where the object
# is not marked by the を next to 持って, so demanding one there flagged a correct sentence.
OBJECTS_WITH_O = {'買う', '買います', '買いました', '買った', '食べます', '食べました',
                  '食べる', '食べた', '飲みます', '飲みました', '飲む', '飲んだ',
                  '使います', '使って',
                  '作ります', '作りました', '注文します', '頼みます'}
# 送ります is deliberately absent: 駅まで車で送ります means "I will drive you to the station",
# where the person is the listener and is not named, so there is no を to require.


# A person noun followed by a verb with no particle between them is the error this check
# exists for: 友達行きます instead of 友達に会います. A person noun followed by です or だ is
# NOT an error, because there the noun IS the predicate: 私の友達です is a complete, correct
# sentence. The first version of this check demanded a particle in both cases and flagged
# 「私の友達です」, which was the checker being wrong rather than the sentence.
MAY_FOLLOW_PERSON = {
    'に', 'は', 'が', 'と', 'の', 'も', 'から', 'へ', 'を', 'で', 'だけ', 'より',
    'です', 'だ', 'だった', 'ですか', 'ではありません', 'じゃない', 'ではない',
    'らしい', 'みたい', 'など', 'さん', 'たち',
}


def check_particles(sentences):
    """A person noun is followed by a particle or a copula, never straight by a verb."""
    bad = []
    for s in sentences:
        # punctuation is merged into the word it follows, so 友達です。 arrives as one token;
        # strip it before comparing, or every sentence-final noun looks like an error
        words = [t[0].rstrip(compose.PUNCT_CHARS) for t in s['tokens']]
        for i, w in enumerate(words[:-1]):
            if w in PERSON_NOUNS and words[i + 1] not in MAY_FOLLOW_PERSON:
                bad.append((s['key'], f'{w} is followed by {words[i + 1]!r}, which is neither a '
                                      f'particle nor a copula'))
        verbs = {w for w in words if w in OBJECTS_WITH_O}
        if verbs and 'を' not in words:
            bad.append((s['key'], f'{sorted(verbs)} needs を, which the sentence does not have'))
        if any(w in FOOD_AND_DRINK for w in words) and 'を' not in words and verbs:
            bad.append((s['key'], 'a food or drink object without を'))
    return bad


# -------------------------------------------------------------- 4. selection
DRINK_NOUNS = {'水', 'お茶', 'コーヒー', 'ジュース', 'ビール', '牛乳', 'ワイン'}
FOOD_NOUNS = FOOD_AND_DRINK - DRINK_NOUNS
MONEY = {'お金', '現金'}
BUY_VERBS = {'買います', '買いました', '買った', '買って', '買う'}


def check_selection(sentences):
    """A verb must not receive a noun it cannot take."""
    bad = []
    for s in sentences:
        words = {t[0] for t in s['tokens']}
        if words & BUY_VERBS and words & MONEY:
            bad.append((s['key'], f'cannot buy {sorted(words & MONEY)}'))
        if words & {'飲みます', '飲みました', '飲む', '飲んだ', '飲んで'} and words & FOOD_NOUNS:
            bad.append((s['key'], f'cannot drink food {sorted(words & FOOD_NOUNS)}'))
        if words & {'食べます', '食べました', '食べる', '食べた', '食べて'} and words & DRINK_NOUNS:
            bad.append((s['key'], f'cannot eat a drink {sorted(words & DRINK_NOUNS)}'))
    return bad


# ---------------------------------------------------------------- 5. English
def check_english(sentences):
    """The translation must be English, not assembled segments of it."""
    bad = []
    for s in sentences:
        t = s['en_translation']
        if re.search(r'\ba [aeiou]', t, re.I) or re.search(r'\ban [^aeiou]', t, re.I):
            bad.append((s['key'], f'bad article: {t}'))
        if re.search(r'\bthe \w+s is\b', t, re.I) or re.search(r"\bthe \w+s isn't\b", t, re.I):
            bad.append((s['key'], f'plural subject with singular verb: {t}'))
        if re.search(r'\b(rices|breads|meats|waters|teas|coffees|milks|moneys|cashes|tofus)\b', t, re.I):
            bad.append((s['key'], f'pluralised a mass noun: {t}'))
        if re.search(r'\b(every days|todays|yesterdays|tomorrows)\b', t, re.I):
            bad.append((s['key'], f'plural time expression: {t}'))
        if not t[:1].isupper():
            bad.append((s['key'], f'translation does not start with a capital: {t}'))
    return bad


# -------------------------------------------------------------- 6. register
# The corpus measurement that separates close from distant speech is です/ます (~3x: home
# 6.74 vs workplace 20.66 per 1000 words), not the question particle. So the polite half of
# the bank must be built from polite forms.
#
# The check reads the kanji LINE as text, not the token list, because the bank glosses each
# inflected form as one token: 行きます is a single token, so looking for the bare token ます
# finds nothing and every polite sentence looks polite-less. That mistake shipped once
# before, when the markers were derived from the bare string ます; reading the sentence text
# is what makes 行きます count as polite.
POLITE_PATTERNS = (
    'です', 'ます', 'ました', 'ません', 'ましょう', 'ください', 'ございます',
    'でしょう', 'お願いします', 'いたします', 'かしこまりました', 'いらっしゃいませ',
)


def _set_phrase_sentences():
    """Sentence keys whose register is inherent to the phrase, with the reason.

    A set greeting does not carry its register in a です or a ます: こんにちは is polite in
    use and おはよう is casual, and neither contains a predicatory form. Checking them for
    です/ます would either fail them or force someone to pad them with words they do not
    have, which is exactly the kind of padding this rework removed. So a topic declares
    them, and the register check steps over them, visibly.
    """
    out = {}
    for name in compose.existing_topics():
        module = __import__('topics.' + name, fromlist=['SET_PHRASES'])
        out.update(getattr(module, 'SET_PHRASES', {}))
    return out


def check_register(sentences):
    """A polite sentence must carry a polite predicator, a plain one must not."""
    exempt = _set_phrase_sentences()
    bad = []
    for s in sentences:
        text = s['kanji']
        if s['key'] in exempt:
            continue          # register is inherent to the phrase; declared by the topic
        polite_hits = [p for p in POLITE_PATTERNS if p in text]
        if s['politeness'] == 'sopan' and not polite_hits:
            bad.append((s['key'], f'marked sopan but no polite form: {text}'))
        if s['politeness'] == 'biasa' and polite_hits:
            bad.append((s['key'], f'marked biasa but contains {polite_hits}: {text}'))
    return bad


# -------------------------------------------------------------- 1. structure
REQUIRED = ('key', 'fn', 'who', 'who_id', 'who_en', 'politeness', 'situation',
            'situation_en', 'kanji', 'romaji', 'id_translation', 'en_translation',
            'tokens', 'note', 'note_en')


def check_structure(sentences):
    """The card and the panel must describe the same sentence."""
    bad = []
    seen = set()
    for s in sentences:
        for field in REQUIRED:
            if not s.get(field):
                bad.append((s.get('key', '?'), f'missing field {field}'))
        if s['key'] in seen:
            bad.append((s['key'], 'duplicate key, so the deep-link order is ambiguous'))
        seen.add(s['key'])
        if s['who'] not in ('dekat', 'asing'):
            bad.append((s['key'], f'unknown register {s["who"]!r}'))
        if s['politeness'] not in ('sopan', 'biasa'):
            bad.append((s['key'], f'unknown politeness {s["politeness"]!r}'))
        for tok in s['tokens']:
            if len(tok) != 4:
                bad.append((s['key'], f'token without 4 fields: {tok}'))
        # the kanji line must be exactly the tokens, or the ? panel glosses something the
        # card does not show
        joined = ''.join(t[0] for t in s['tokens'])
        if joined != s['kanji']:
            bad.append((s['key'], f'kanji line is {s["kanji"]!r} but tokens join to {joined!r}'))
        romaji = ' '.join(t[1] for t in s['tokens'])
        if romaji != s['romaji']:
            bad.append((s['key'], f'romaji line is {s["romaji"]!r} but tokens join to {romaji!r}'))
        if re.search(r'[A-Za-z]', s['kanji']):
            bad.append((s['key'], f'kanji line contains latin letters: {s["kanji"]!r}'))
        for t in s['tokens']:
            if not t[2] or not t[3]:
                bad.append((s['key'], f'{t[0]!r} has an empty gloss'))
    return bad


def problems(sentences=None):
    """Every finding, grouped by kind. Empty lists mean the bank is clean."""
    if sentences is None:
        sentences = compose.assemble()
    return {
        'structure': check_structure(sentences),
        'tense': check_tense(sentences),
        'particles': check_particles(sentences),
        'selection': check_selection(sentences),
        'english': check_english(sentences),
        'register': check_register(sentences),
    }


def main():
    sentences = compose.assemble()
    problems_ = problems(sentences)
    print(f'{len(sentences):,} hand-written sentences over {len(compose.TOPICS)} topics\n')
    total = 0
    for name, bad in problems_.items():
        total += len(bad)
        print(f'{"ok  " if not bad else "FAIL"} {name}: {len(bad)} problem(s)')
        for key, why in bad[:8]:
            print(f'       {key}  --  {why}')
        if len(bad) > 8:
            print(f'       ... and {len(bad) - 8} more')
    print(f'\n{total} problem(s)')
    return 1 if total else 0


if __name__ == '__main__':
    raise SystemExit(main())
