#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate the everyday-sentence bank from word-combination templates.

Why generated instead of hand-written
-------------------------------------
The analysis in Japanese-Everyday-Sentence-Probability.md estimates the usable
everyday sentence space at ~10^7 for a fluent speaker, from the measured
exponent 4.19 words per utterance unit. Writing millions of sentences by hand is
impossible, and writing them one at a time is exactly how ungrammatical ones get
in. So the sentences are assembled from templates whose grammar is correct by
construction:

  * a template is a fixed frame of participles and a verb,
  * each open position declares the word category it accepts,
  * only a word of that category may fill it.

食べました can therefore never receive a place, and で can never take an object.

Pieces
------
Each template is a list of pieces:
  ('s', 'FOOD')                    slot: any word from that category
  ('w', kanji, romaji, id, en)     a fixed word
  ('p', kanji, romaji, id, en)     a fixed particle

The kanji line, the romaji line and the per-word glosses are all derived from the
finished piece list, so they cannot drift apart.

What the register split rests on
--------------------------------
The corpus measurement that separates close from distant speech is です/ます
(home 6.74 vs workplace 20.66 per 1000 words, ~3x), NOT the question particle.
So the polite bank is built from です/ます frames and the casual bank from plain
frames, and check_register.py verifies the split held.
"""
import itertools
import re

from vocab import (CATEGORIES, DRINK, FOOD, OBJECT, PERSON, PLACE, TIME,
                   TOPIC, english_phrase)

# できる only takes skills/knowledge, not "weather" or "Mt Fuji", so those words
# get their own category instead of sitting in TOPIC where できます would be wrong.
# The glosses are the short noun forms, because they have to read correctly inside
# "menguasai ___" / "good at ___".
SKILL = [
    ('日本語', 'nihongo', 'bahasa Jepang', 'Japanese'),
    ('英語', 'eigo', 'bahasa Inggris', 'English'),
    ('漢字', 'kanji', 'kanji', 'kanji'),
    ('料理', 'ryouri', 'masakan', 'cooking'),
    ('数学', 'suugaku', 'matematika', 'maths'),
    ('科学', 'kagaku', 'sains', 'science'),
]

# 会います needs a person, 食べます needs food: the categories keep these apart.
CATEGORIES = dict(CATEGORIES, SKILL=SKILL)


def w(kanji, romaji, gid, gen):
    return ('w', (kanji, romaji, gid, gen))


def p(kanji, romaji, gid, gen):
    return ('p', (kanji, romaji, gid, gen))


def s(cat):
    return ('s', cat)


# --------------------------------------------------------------- short forms
DESU = w('です', 'desu', 'adalah (sopan)', 'is (polite copula)')
MASU = w('ます', 'masu', 'bentuk sopan (non-lampau)', 'polite non-past suffix')
MASHITA = w('ました', 'mashita', 'bentuk sopan (lampau)', 'polite past suffix')
MASHOU = w('ましょう', 'mashou', 'bentuk sopan (ajakan)', 'polite volitional')

TEMPLATES = [
    # ================================================================ polite
    dict(
        key='place_he_ikimasu', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Berangkat ke suatu tempat', situation_en='Heading to a place',
        pieces=[s('PLACE'), p('へ', 'e', 'partikel arah (ke)', 'direction particle (to)'),
                w('行きます', 'ikimasu', 'pergi (sopan)', 'go (polite)')],
        note='へ menandai arah; 行きます adalah bentuk sopan.',
        note_en='へ marks direction; 行きます is the polite form.',
    ),
    dict(
        key='place_de_tabemasu', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Makan di suatu tempat', situation_en='Eating at a place',
        pieces=[s('PLACE_EAT'), p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('FOOD'), p('を', 'o', 'partikel objek', 'object particle'),
                w('食べます', 'tabemasu', 'makan (sopan)', 'eat (polite)')],
        note='で menandai tempat berlangsungnya aksi, bukan arah.',
        note_en='で marks where the action happens, not a direction.',
    ),
    dict(
        key='drink_o_nomimasu', who='asing', politeness='sopan',
        who_id='pegawai kafe', who_en='cafe staff',
        situation='Memesan minuman', situation_en='Ordering a drink',
        pieces=[s('DRINK'), p('を', 'o', 'partikel objek', 'object particle'),
                w('飲みます', 'nomimasu', 'minum (sopan)', 'drink (polite)')],
        note='飲みます untuk minuman; 食べます untuk makanan.',
        note_en='飲みます for drinks; 食べます for food.',
    ),
    dict(
        key='object_o_kudasai', who='asing', politeness='sopan',
        who_id='petugas toko', who_en='shop attendant',
        situation='Meminta barang di toko', situation_en='Asking for an item in a shop',
        pieces=[s('OBJECT'), p('を', 'o', 'partikel objek', 'object particle'),
                w('ください', 'kudasai', 'tolong (permintaan sopan)', 'please (polite request)')],
        note='ください langsung mengikuti を + benda: pola permintaan paling aman.',
        note_en='ください attaches straight after を + noun: the safest request pattern.',
    ),
    dict(
        key='object_wa_arimasu_ka', who='asing', politeness='sopan',
        who_id='petugas toko', who_en='shop attendant',
        situation='Menanyakan ketersediaan barang', situation_en='Asking if something is in stock',
        pieces=[s('OBJECT'), p('は', 'wa', 'partikel topik', 'topic particle'),
                w('あります', 'arimasu', 'ada (untuk benda)', 'there is (for things)'),
                p('か', 'ka', 'partikel tanya', 'question particle')],
        note='あります untuk benda; います untuk orang. は dibaca "wa".',
        note_en='あります for things, います for people. は is read "wa".',
    ),
    dict(
        key='place_wa_doko_desu_ka', who='asing', politeness='sopan',
        who_id='orang asing', who_en='stranger',
        situation='Menanyakan letak tempat', situation_en='Asking where something is',
        pieces=[s('PLACE'), p('は', 'wa', 'partikel topik', 'topic particle'),
                w('どこ', 'doko', 'di mana', 'where'), DESU,
                p('か', 'ka', 'partikel tanya', 'question particle')],
        note='Urutan baku: tempat + は + どこ + ですか.',
        note_en='Standard order: place + は + どこ + ですか.',
    ),
    dict(
        key='topic_ga_suki_desu', who='asing', politeness='sopan',
        who_id='orang yang baru dikenal', who_en='someone you just met',
        situation='Menyebut kesukaan', situation_en='Stating a preference',
        pieces=[s('TOPIC'), p('が', 'ga', 'partikel subjek', 'subject particle'),
                w('好き', 'suki', 'suka', 'liked'), DESU],
        note='好き memakai が, bukan を, meski artinya "menyukai".',
        note_en='好き takes が, not を, even though it means "to like".',
    ),
    dict(
        key='skill_ga_dekimasu_ka', who='asing', politeness='sopan',
        who_id='orang yang baru dikenal', who_en='someone you just met',
        situation='Menanyakan kemampuan', situation_en='Asking about ability',
        pieces=[s('SKILL'), p('が', 'ga', 'partikel subjek', 'subject particle'),
                w('できます', 'dekimasu', 'bisa (sopan)', 'can do (polite)'),
                p('か', 'ka', 'partikel tanya', 'question particle')],
        note='できます hanya untuk keterampilan atau pengetahuan, bukan cuaca.',
        note_en='できます is for skills or knowledge, not for weather.',
    ),
    dict(
        key='object_o_wasuremashita', who='asing', politeness='sopan',
        who_id='orang yang baru dikenal', who_en='someone you just met',
        situation='Mengaku lupa membawa sesuatu', situation_en='Admitting you forgot something',
        pieces=[s('OBJECT'), p('を', 'o', 'partikel objek', 'object particle'),
                w('忘れました', 'wasuremashita', 'lupa (sopan, lampau)', 'forgot (polite past)')],
        note='忘れました untuk lupa membawa; 忘れましたか untuk menanyakan.',
        note_en='忘れました for having forgotten; 忘れましたか to ask.',
    ),
    dict(
        key='place_de_aimashou', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Menyepakati tempat bertemu', situation_en='Agreeing where to meet',
        pieces=[s('PLACE_MEET'), p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                w('会いましょう', 'aimashou', 'bertemu (ajakan sopan)', 'meet (polite volitional)')],
        note='ましょう mengajak dengan sopan; bentuk kasualnya 会おう.',
        note_en='ましょう is a polite suggestion; the casual form is 会おう.',
    ),
    dict(
        key='place_made_onegaishimasu', who='asing', politeness='sopan',
        who_id='pengemudi taksi', who_en='taxi driver',
        situation='Menyebut tujuan kepada pengemudi', situation_en='Telling a driver the destination',
        pieces=[s('PLACE'), p('まで', 'made', 'partikel batas (sampai)', 'boundary particle (until/to)'),
                w('お願いします', 'onegaishimasu', 'tolong (permintaan)', 'please (request)')],
        note='まで + お願いします adalah pola baku menyebut tujuan.',
        note_en='まで + お願いします is the standard way to state a destination.',
    ),
    dict(
        key='food_ga_tabetai_desu', who='asing', politeness='sopan',
        who_id='pegawai restoran', who_en='restaurant staff',
        situation='Menyatakan keinginan makan', situation_en='Saying what you want to eat',
        pieces=[s('FOOD'), p('が', 'ga', 'partikel subjek', 'subject particle'),
                w('食べたい', 'tabetai', 'ingin makan', 'want to eat'), DESU],
        note='Bentuk たい memakai が untuk objeknya.',
        note_en='The たい form takes が for its object.',
    ),
    dict(
        key='person_ni_aimasu', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Akan bertemu seseorang', situation_en='Going to meet someone',
        pieces=[s('PERSON'), p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('会います', 'aimasu', 'bertemu (sopan)', 'meet (polite)')],
        note='会います memakai に untuk orang yang ditemui.',
        note_en='会います takes に for the person met.',
    ),
    dict(
        key='place_de_kaimashita', who='asing', politeness='sopan',
        who_id='orang yang baru dikenal', who_en='someone you just met',
        situation='Membeli sesuatu di suatu tempat', situation_en='Bought something somewhere',
        pieces=[s('PLACE_SHOP'), p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('買いました', 'kaimashita', 'membeli (sopan, lampau)', 'bought (polite past)')],
        note='買いました adalah bentuk lampau sopan dari 買う.',
        note_en='買いました is the polite past of 買う.',
    ),
    dict(
        key='time_place_de_matteimasu', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Menunggu di suatu tempat', situation_en='Waiting somewhere',
        pieces=[s('TIME_NONPAST'), s('PLACE_WAIT'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                w('待っています', 'matteimasu', 'sedang menunggu (sopan)', 'is waiting (polite)')],
        note='待っています adalah bentuk sedang berlangsung dari 待つ.',
        note_en='待っています is the ongoing form of 待つ.',
    ),
    dict(
        key='time_place_e_ikimasu', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Menyebut rencana berangkat', situation_en='Stating a plan to go',
        pieces=[s('TIME_NONPAST'), s('PLACE'),
                p('へ', 'e', 'partikel arah (ke)', 'direction particle (to)'),
                w('行きます', 'ikimasu', 'pergi (sopan)', 'go (polite)')],
        note='Keterangan waktu diletakkan di awal kalimat.',
        note_en='A time expression goes at the start of the sentence.',
    ),
    dict(
        key='place_de_ocha_o_nomimasu', who='asing', politeness='sopan',
        who_id='pegawai kafe', who_en='cafe staff',
        situation='Minum sesuatu di suatu tempat', situation_en='Drinking something at a place',
        pieces=[s('PLACE_EAT'), p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('DRINK'), p('を', 'o', 'partikel objek', 'object particle'),
                w('飲みます', 'nomimasu', 'minum (sopan)', 'drink (polite)')],
        note='で untuk tempat aksi, を untuk objek minuman.',
        note_en='で for where the action happens, を for the drink.',
    ),
    dict(
        key='time_food_o_tabemasu', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Menyebut menu makan', situation_en='Stating what you eat and when',
        pieces=[s('TIME_NONPAST'), s('FOOD'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('食べます', 'tabemasu', 'makan (sopan)', 'eat (polite)')],
        note='Waktu + objek + を + kata kerja adalah urutan paling netral.',
        note_en='Time + object + を + verb is the most neutral order.',
    ),

    # ================================================================ casual
    dict(
        key='place_ni_iku', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Menanyakan rencana pergi', situation_en='Asking about going somewhere',
        pieces=[s('PLACE'), p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行く', 'iku', 'pergi (biasa)', 'go (plain)'),
                w('?', '?', 'intonasi naik = tanya (tanpa か)',
                  'rising intonation = question (no か)')],
        note='Bentuk biasa tanpa です/ます; tanya lewat intonasi naik, bukan か.',
        note_en='Plain form with no です/ます; asks by rising intonation, not か.',
    ),
    dict(
        key='food_taberu', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Menawarkan makanan', situation_en='Offering food',
        pieces=[s('FOOD'), w('食べる', 'taberu', 'makan (biasa)', 'eat (plain)'),
                w('?', '?', 'intonasi naik = tanya (tanpa か)',
                  'rising intonation = question (no か)')],
        note='Objek sering dihilangkan di percakapan akrab.',
        note_en='The object particle is often dropped in casual speech.',
    ),
    dict(
        key='time_place_de_aou', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Mengajak bertemu', situation_en='Suggesting to meet',
        pieces=[s('TIME_NONPAST'), s('PLACE_MEET'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                w('会おう', 'aou', 'bertemu (ajakan biasa)', 'meet (plain volitional)')],
        note='会おう adalah bentuk ajakan kasual; sopannya 会いましょう.',
        note_en='会おう is the casual suggestion form; the polite one is 会いましょう.',
    ),
    dict(
        key='topic_suki', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Menanyakan kesukaan', situation_en='Asking about a preference',
        pieces=[s('TOPIC'), w('好き', 'suki', 'suka', 'liked'),
                w('?', '?', 'intonasi naik = tanya (tanpa か)',
                  'rising intonation = question (no か)')],
        note='です dihilangkan sepenuhnya di antara teman dekat.',
        note_en='です is dropped completely between close friends.',
    ),
    dict(
        key='object_motteru', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Menanyakan apakah membawa sesuatu', situation_en='Asking if someone has something',
        pieces=[s('OBJECT'), w('持ってる', 'motteru', 'sedang membawa (biasa)', 'have on you (plain)'),
                w('?', '?', 'intonasi naik = tanya (tanpa か)',
                  'rising intonation = question (no か)')],
        note='持ってる adalah bentuk santai dari 持っている.',
        note_en='持ってる is the casual contraction of 持っている.',
    ),
    dict(
        key='food_takai_ne', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Mengomentari harga', situation_en='Commenting on a price',
        pieces=[s('FOOD'), w('高い', 'takai', 'mahal', 'expensive'),
                p('ね', 'ne', 'partikel meminta persetujuan', 'agreement particle')],
        note='ね menutup 38% dari semua partikel akhir kalimat di korpus.',
        note_en='ね closes 38% of all sentence-final particles in the corpus.',
    ),
    dict(
        key='drink_nomu', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Menawarkan minuman', situation_en='Offering a drink',
        pieces=[s('DRINK'), w('飲む', 'nomu', 'minum (biasa)', 'drink (plain)'),
                w('?', '?', 'intonasi naik = tanya (tanpa か)',
                  'rising intonation = question (no か)')],
        note='Kata kerja bentuk kamus + intonasi naik sudah cukup untuk menawarkan.',
        note_en='Dictionary-form verb plus rising intonation is enough to offer.',
    ),
    dict(
        key='place_itta', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Menanyakan pengalaman pergi', situation_en='Asking if someone went',
        pieces=[s('PLACE'), w('行った', 'itta', 'pergi (biasa, lampau)', 'went (plain past)'),
                w('?', '?', 'intonasi naik = tanya (tanpa か)',
                  'rising intonation = question (no か)')],
        note='行った adalah bentuk lampau biasa; tanpa か, hanya intonasi.',
        note_en='行った is the plain past; with no か, the question is intonation only.',
    ),
    dict(
        key='food_oishii_ne', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Memuji makanan', situation_en='Praising food',
        pieces=[s('FOOD'), w('おいしい', 'oishii', 'enak', 'delicious'),
                p('ね', 'ne', 'partikel meminta persetujuan', 'agreement particle')],
        note='Pola い-adj + ね untuk berbagi kesan.',
        note_en='The pattern い-adjective + ね shares an impression.',
    ),
    dict(
        key='topic_ga_suki_da_ne', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Menyebut kesukaan bersama', situation_en='Sharing a preference',
        pieces=[s('TOPIC'), p('が', 'ga', 'partikel subjek', 'subject particle'),
                w('好き', 'suki', 'suka', 'liked'), w('だ', 'da', 'adalah (bentuk biasa)', 'is (plain copula)'),
                p('ね', 'ne', 'partikel meminta persetujuan', 'agreement particle')],
        note='だ adalah kopula biasa; padanan sopannya です.',
        note_en='だ is the plain copula; its polite counterpart is です.',
    ),
    dict(
        key='object_doko', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Menanyakan letak barang', situation_en='Asking where something is',
        pieces=[s('OBJECT'), w('どこ', 'doko', 'di mana', 'where'),
                w('?', '?', 'intonasi naik = tanya (tanpa か)',
                  'rising intonation = question (no か)')],
        note='Versi sopannya: どこですか.',
        note_en='The polite version is どこですか.',
    ),
    dict(
        key='place_de_atta', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Bertemu di suatu tempat (lampau)', situation_en='Met somewhere (past)',
        pieces=[s('PLACE_MEET'), p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('PERSON'), p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('会った', 'atta', 'bertemu (biasa, lampau)', 'met (plain past)')],
        note='Dua partikel berbeda: で untuk tempat, に untuk orang.',
        note_en='Two different particles: で for the place, に for the person.',
    ),
    dict(
        key='time_object_o_katta', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Membeli sesuatu kemarin', situation_en='Bought something yesterday',
        pieces=[s('TIME_PAST'), s('OBJECT_BUY'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('買った', 'katta', 'membeli (biasa, lampau)', 'bought (plain past)')],
        note='買った adalah bentuk lampau biasa dari 買う.',
        note_en='買った is the plain past of 買う.',
    ),
]



# --------------------------------------------------------------- translations
# One entry per template: (Indonesian, English, usage note, usage note in English).
#
# A word slot is written {CATEGORY:form}, where the form says what the English
# phrase needs:
#   bare  the gloss itself, pluralised for count nouns ("umbrellas", "rice")
#   a     the singular with an article ("a wallet", "an umbrella")
#   my    the singular with a possessive ("my wallet")
#   the   the singular with a definite article ("the station")
# The Indonesian side ignores the form and uses the gloss, because Indonesian does
# not inflect for number or definiteness.
#
# check_sentences.py asserts that every template has an entry here and that the
# forms are used only where they make sense, so a translation cannot silently
# disagree with the sentence it belongs to.
TRANSLATIONS = {
    'place_he_ikimasu': ('Pergi ke {PLACE}.', 'I am going to {PLACE:the}.',
                         '行きます = pergi; へ menandai arah tujuan.',
                         '行きます = to go; へ marks the direction.'),
    'place_de_tabemasu': ('Makan {FOOD:bare} di {PLACE_EAT}.', 'I eat {FOOD:bare} at {PLACE_EAT:the}.',
                          'で menandai tempat aksi berlangsung.',
                          'で marks where the action happens.'),
    'drink_o_nomimasu': ('Minum {DRINK:bare}.', 'I drink {DRINK:bare}.',
                         '飲みます untuk minuman, bukan 食べます.',
                         '飲みます is for drinks, not 食べます.'),
    'object_o_kudasai': ('Tolong ambilkan {OBJECT:bare}.', '{OBJECT:a}, please.',
                         'ください setelah を + benda = permintaan sopan.',
                         'ください after を + noun is a polite request.'),
    'object_wa_arimasu_ka': ('Ada {OBJECT:bare}?', 'Do you have {OBJECT:a}?',
                             'あります untuk benda; います untuk orang.',
                             'あります is for things; います is for people.'),
    'place_wa_doko_desu_ka': ('{PLACE:the} di mana?', 'Where is {PLACE:the}?',
                              'Urutan baku: tempat + は + どこ + ですか.',
                              'Standard order: place + は + どこ + ですか.'),
    'topic_ga_suki_desu': ('Saya suka {TOPIC:bare}.', 'I like {TOPIC:bare}.',
                           '好き memakai が, bukan を.', '好き takes が, not を.'),
    'skill_ga_dekimasu_ka': ('Apakah Anda bisa {SKILL:bare}?', 'Can you do {SKILL:bare}?',
                             'できます hanya untuk keterampilan atau pengetahuan.',
                             'できます is only for skills or knowledge.'),
    'object_o_wasuremashita': ('Saya lupa {OBJECT:bare}.', 'I forgot {OBJECT:my}.',
                              '忘れました adalah bentuk lampau sopan.',
                              '忘れました is the polite past form.'),
    'place_de_aimashou': ('Mari bertemu di {PLACE_MEET}.', "Let's meet at {PLACE_MEET:the}.",
                          'ましょう adalah ajakan sopan.',
                          'ましょう is a polite suggestion.'),
    'place_made_onegaishimasu': ('Ke {PLACE}, tolong.', 'To {PLACE:the}, please.',
                                 'まで + お願いします = pola baku menyebut tujuan.',
                                 'まで + お願いします is the standard destination pattern.'),
    'food_ga_tabetai_desu': ('Saya ingin makan {FOOD:bare}.', 'I want to eat {FOOD:bare}.',
                             'Bentuk たい memakai が untuk objeknya.',
                             'The たい form takes が for its object.'),
    'person_ni_aimasu': ('Saya akan bertemu {PERSON:bare}.', 'I am going to meet {PERSON:my}.',
                         '会います memakai に untuk orang.',
                         '会います takes に for the person.'),
    'place_de_kaimashita': ('Saya membeli {OBJECT_BUY:bare} di {PLACE_SHOP}.',
                            'I bought {OBJECT_BUY:bare} at {PLACE_SHOP:the}.',
                            '買いました adalah bentuk lampau sopan dari 買う.',
                            '買いました is the polite past of 買う.'),
    'time_place_de_matteimasu': ('{TIME_NONPAST} saya menunggu di {PLACE_WAIT}.',
                                 '{TIME_NONPAST:bare} I am waiting at {PLACE_WAIT:the}.',
                                 '待っています = sedang menunggu.',
                                 '待っています = is waiting.'),
    'time_place_e_ikimasu': ('{TIME_NONPAST} saya pergi ke {PLACE}.',
                             '{TIME_NONPAST:bare} I am going to {PLACE:the}.',
                             'Keterangan waktu diletakkan di awal kalimat.',
                             'The time expression comes first.'),
    'place_de_ocha_o_nomimasu': ('Saya minum {DRINK:bare} di {PLACE_EAT}.',
                                 'I drink {DRINK:bare} at {PLACE_EAT:the}.',
                                 'で untuk tempat, を untuk objek minuman.',
                                 'で for the place, を for the drink.'),
    'time_food_o_tabemasu': ('{TIME_NONPAST} saya makan {FOOD:bare}.', '{TIME_NONPAST:bare} I eat {FOOD:bare}.',
                             'Urutan paling netral: waktu + objek + を + kata kerja.',
                             'The most neutral order: time + object + を + verb.'),
    'place_ni_iku': ('Pergi ke {PLACE}?', 'Are you going to {PLACE:the}?',
                     'Tanpa です/ます; tanya lewat intonasi naik.',
                     'No です/ます; the question is carried by rising intonation.'),
    'food_taberu': ('Makan {FOOD:bare}?', 'Want to eat {FOOD:bare}?',
                    'Objek sering tanpa partikel di percakapan akrab.',
                    'The object particle is often dropped in casual talk.'),
    'time_place_de_aou': ('{TIME_NONPAST} mari bertemu di {PLACE_MEET}.',
                          "{TIME_NONPAST:bare} let's meet at {PLACE_MEET:the}.",
                          '会おう adalah ajakan kasual.', '会おう is the casual suggestion form.'),
    'topic_suki': ('Suka {TOPIC:bare}?', 'Do you like {TOPIC:bare}?',
                   'です dihilangkan di antara teman dekat.',
                   'です is dropped between close friends.'),
    'object_motteru': ('Bawa {OBJECT:bare}?', 'Do you have {OBJECT:my} on you?',
                       '持ってる adalah bentuk santai dari 持っている.',
                       '持ってる is the casual form of 持っている.'),
    'food_takai_ne': ('{FOOD:the} mahal ya.', '{FOOD:the} are expensive, aren\'t they.',
                      'ね mengajak lawan bicara menyetujui.',
                      'ね invites the listener to agree.'),
    'drink_nomu': ('Minum {DRINK:bare}?', 'Want to drink {DRINK:bare}?',
                   'Kata kerja bentuk kamus + intonasi naik.',
                   'Dictionary-form verb plus rising intonation.'),
    'place_itta': ('Sudah pergi ke {PLACE}?', 'Did you go to {PLACE:the}?',
                   '行った adalah bentuk lampau biasa.', '行った is the plain past form.'),
    'food_oishii_ne': ('{FOOD:the} enak ya.', '{FOOD:the} are delicious, aren\'t they.',
                       'Pola い-adjektiva + ね untuk berbagi kesan.',
                       'The い-adjective + ね pattern shares an impression.'),
    'topic_ga_suki_da_ne': ('Suka {TOPIC:bare} ya.', 'You like {TOPIC:bare}, right.',
                            'だ adalah kopula biasa; sopannya です.',
                            'だ is the plain copula; the polite one is です.'),
    'object_doko': ('{OBJECT:the} di mana?', 'Where is {OBJECT:my}?',
                    'Versi sopannya: どこですか.', 'The polite version is どこですか.'),
    'place_de_atta': ('Bertemu {PERSON:bare} di {PLACE_MEET}.',
                      'I met {PERSON:my} at {PLACE_MEET:the}.',
                      'で untuk tempat, に untuk orang.',
                      'で for the place, に for the person.'),
    'time_object_o_katta': ('{TIME_PAST} saya membeli {OBJECT_BUY:bare}.',
                            '{TIME_PAST:bare} I bought {OBJECT_BUY:bare}.',
                            '買った adalah bentuk lampau biasa.', '買った is the plain past form.'),
}

SLOT_RE = re.compile(r'\{(\w+)(?::(\w+))?\}')
VALID_FORMS = {'bare', 'a', 'my', 'the'}


# Categories whose English gloss must be used exactly as written: a time
# expression is neither pluralised ("every days") nor given an article.
BARE_VERBATIM_CATEGORY = {'TIME', 'TIME_PAST', 'TIME_NONPAST'}
# Categories whose `the` form should pluralise rather than become "the <singular>",
# because a count noun and a plural verb read better than "the vegetables is".
PLURAL_CAPABLE = {'FOOD', 'OBJECT', 'OBJECT_BUY'}


def _english_form(word, form, category=None):
    """The English phrase a translation slot needs, from the gloss and the form."""
    gen = word[3]
    if form == 'bare' and category in BARE_VERBATIM_CATEGORY:
        return gen
    if form == 'a':
        return ('an ' if gen[:1].lower() in 'aeiou' else 'a ') + gen
    if form == 'my':
        return 'my ' + gen
    if form == 'the':
        if category in PLURAL_CAPABLE:
            return english_phrase(word)
        return 'the ' + gen
    return english_phrase(word)


def translations_for(template, choices):
    """Resolve a template's translation using the words actually chosen.

    choices is the ordered list of (category, word) that filled the slots. The
    category queues are rebuilt for each language, so a template whose pattern uses
    the same category twice gets the first word in the first occurrence and the
    second word in the second, in both languages.
    """
    id_text, en_text, note_id, note_en = TRANSLATIONS[template]
    pools = {}
    for cat, word in choices:
        pools.setdefault(cat, []).append(word)
    id_out, en_out = _resolve(id_text, en_text, pools, template)
    # a translation is a sentence, so its first letter is capitalised
    return (id_out[:1].upper() + id_out[1:], en_out[:1].upper() + en_out[1:],
            note_id, note_en)


def _resolve(id_text, en_text, pools, template):
    """Fill both languages, walking the sentence's slots in order each time."""
    def build(text, english):
        local = {k: list(v) for k, v in pools.items()}
        out = []
        pos = 0
        for m in SLOT_RE.finditer(text):
            out.append(text[pos:m.start()])
            cat, form = m.group(1), m.group(2) or 'bare'
            if form not in VALID_FORMS:
                raise ValueError(f'{template}: bad form {form!r}')
            queue = local.get(cat)
            if not queue:
                raise KeyError(f'{template}: slot {cat} has no word')
            word = queue.pop(0)
            out.append(_english_form(word, form, cat) if english else word[2])
            pos = m.end()
        out.append(text[pos:])
        return ''.join(out)

    return build(id_text, False), build(en_text, True)


def render_pieces(pieces, choice):
    """Fill the slots, then derive every text form from the finished piece list."""
    tokens = []
    for piece in pieces:
        if piece[0] == 's':
            tokens.append(choice[piece[1]])
        else:
            tokens.append(piece[1])
    kanji = ''.join(t[0] for t in tokens)
    romaji = ' '.join(t[1] for t in tokens)
    return {
        'tokens': [list(t) for t in tokens],
        'kanji': kanji,
        'romaji': romaji,
    }


def slot_counts(template):
    """How many words each slot of this template can take."""
    return [len(CATEGORIES[piece[1]]) for piece in template['pieces'] if piece[0] == 's']


def template_combinations(template):
    total = 1
    for n in slot_counts(template):
        total *= n
    return total


def ordered_combinations():
    """The generated bank, ordered so the first N rows are worth reading.

    Taking the bank in template order would put every 食べます sentence before any
    行きます sentence, so a page showing the first few hundred would be hundreds of
    near-identical frames and, worse, almost entirely polite: the polite templates
    happen to have the largest word cross-products. This walks the templates in
    round-robin instead, one sentence each per pass, so the start of the list covers
    every frame and both registers.
    """
    per_template = {}
    for s in all_combinations():
        per_template.setdefault(s['template'], []).append(s)
    order = [t['key'] for t in TEMPLATES]
    out = []
    for i in range(max(len(v) for v in per_template.values())):
        for key in order:
            rows = per_template[key]
            if i < len(rows):
                out.append(rows[i])
    return out


def all_combinations(with_translations=True):
    """Every template x every word combination, deduplicated on the kanji line."""
    out = []
    seen = set()
    for template in TEMPLATES:
        cats = [piece[1] for piece in template['pieces'] if piece[0] == 's']
        for combo in itertools.product(*[CATEGORIES[c] for c in cats]):
            body = render_pieces(template['pieces'], dict(zip(cats, combo)))
            if body['kanji'] in seen:
                continue
            seen.add(body['kanji'])
            sentence = {
                'template': template['key'],
                'who': template['who'],
                'politeness': template['politeness'],
                'who_id': template['who_id'],
                'who_en': template['who_en'],
                'situation': template['situation'],
                'situation_en': template['situation_en'],
                'filled': [c for c in cats],
            }
            if with_translations:
                choices = list(zip(cats, combo))
                tid, ten, note, note_en = translations_for(template['key'], choices)
                sentence.update({'id_translation': tid, 'en_translation': ten,
                                 'note': note, 'note_en': note_en})
            else:
                sentence.update({'note': template['note'],
                                 'note_en': template['note_en']})
            sentence.update(body)
            out.append(sentence)
    return out


if __name__ == '__main__':
    combos = all_combinations()
    per_template = {}
    for t in TEMPLATES:
        per_template[t['key']] = template_combinations(t)
    print(f'{len(TEMPLATES)} templates')
    for k, v in per_template.items():
        print(f'  {v:>6}  {k}')
    print(f'{sum(per_template.values()):>6} combinations (before deduplication)')
    print(f'{len(combos):>6} unique sentences after deduplication')
