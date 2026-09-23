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


# ------------------------------------------------------------- longer forms
# The templates above are 3-7 tokens. These are 8-13, built from the same word
# bank, so roughly half the list is long and the line wrapping is exercised by
# real sentences instead of by a note claiming that a sentence tests wrapping.
#
# Every construction here is a standard one, not an invented pattern:
#   stem + に行く      purpose of movement     買いに行きます
#   te-form + います   action in progress      探しています
#   stem + ながら      simultaneous action     飲みながら
#   ta-form + ら       when / if               着いたら
#   dictionary + とき  at the time of          行くとき
#   te-form + から     after doing             食べてから
#   plain + から       because                 混んでいたから
#   plain + けど       although                買ったけど
KARA = p('から', 'kara', 'partikel sebab (karena)', 'because')
KEDO = p('けど', 'kedo', 'partikel pertentangan (tapi)', 'but')
MO = p('も', 'mo', 'partikel "juga"', 'also (particle)')
TOKI = w('とき', 'toki', 'saat / ketika', 'when / at the time')
NAGARA = w('ながら', 'nagara', 'sambil', 'while (doing)')

LONG_TEMPLATES = [
    # ---------------------------------------------------------------- polite
    dict(
        key='long_purpose_buy', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Menjelaskan tujuan pergi ke suatu tempat',
        situation_en='Explaining why you are going somewhere',
        pieces=[s('TIME_NONPAST'), s('PLACE_SHOP'),
                p('へ', 'e', 'partikel arah (ke)', 'direction particle (to)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('買い', 'kai', 'membeli (bentuk sambung)', 'buy (verb stem)'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行きます', 'ikimasu', 'pergi (sopan)', 'go (polite)')],
        note='Pola kata kerja bentuk sambung + に + 行きます menyatakan tujuan pergi.',
        note_en='The pattern "verb stem + に + 行きます" states the purpose of going.',
    ),
    dict(
        key='long_looking_for', who='asing', politeness='sopan',
        who_id='petugas toko', who_en='shop attendant',
        situation='Sedang mencari barang di toko',
        situation_en='Looking for an item in a shop',
        pieces=[s('TIME_PAST'), KARA, s('PLACE_SHOP'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('探して', 'sagashite', 'mencari (bentuk -te)', 'look for (te-form)'),
                w('います', 'imasu', 'sedang (bentuk sopan)', 'is doing (polite)')],
        note='Bentuk -te + います menyatakan aksi yang sedang berlangsung.',
        note_en='The -te form + います marks an action in progress.',
    ),
    dict(
        key='long_when_going', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Kebiasaan saat pergi ke suatu tempat',
        situation_en='A habit when going somewhere',
        pieces=[s('PLACE'), p('へ', 'e', 'partikel arah (ke)', 'direction particle (to)'),
                w('行く', 'iku', 'pergi (bentuk kamus)', 'go (dictionary form)'),
                TOKI, s('OBJECT_BUY'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('買います', 'kaimasu', 'membeli (sopan)', 'buy (polite)')],
        note='Kata kerja bentuk kamus + とき berarti saat melakukan sesuatu.',
        note_en='Dictionary form + とき means "when (doing)".',
    ),
    dict(
        key='long_when_arrive_call', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Meminta kabar setelah tiba',
        situation_en='Asking for a call after arrival',
        pieces=[s('PLACE'), p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('着いたら', 'tsuitara', 'kalau sudah tiba', 'when (you) arrive'),
                s('PERSON'), p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('電話', 'denwa', 'telepon', 'telephone'),
                w('して', 'shite', 'melakukan (bentuk -te)', 'do (te-form)'),
                w('ください', 'kudasai', 'tolong (permintaan sopan)',
                  'please (polite request)')],
        note='Bentuk lampau + ら berarti kalau atau setelah. 電話して = menelepon.',
        note_en='Past form + ら means "when/if". 電話して = to call.',
    ),
    dict(
        key='long_while_drinking', who='asing', politeness='sopan',
        who_id='teman', who_en='friend',
        situation='Menceritakan percakapan sambil minum',
        situation_en='Recounting a chat over a drink',
        pieces=[s('DRINK'), p('を', 'o', 'partikel objek', 'object particle'),
                w('飲み', 'nomi', 'minum (bentuk sambung)', 'drink (verb stem)'),
                NAGARA, s('TOPIC'),
                p('の', 'no', 'partikel pemilik (dari)', 'possessive particle'),
                w('話', 'hanashi', 'cerita / pembicaraan', 'talk / story'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('しました', 'shimashita', 'melakukan (sopan, lampau)',
                  'did (polite past)')],
        note='Bentuk sambung + ながら berarti sambil melakukan.',
        note_en='The verb stem + ながら means "while (doing)".',
    ),
    dict(
        key='long_meal_and_drink', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Menceritakan makan dan minum',
        situation_en='Recounting eating and drinking',
        pieces=[s('TIME_PAST'), s('PLACE_EAT'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('PERSON'), p('と', 'to', 'partikel dengan', 'with (particle)'),
                s('FOOD'), p('を', 'o', 'partikel objek', 'object particle'),
                w('食べて', 'tabete', 'makan (bentuk -te)', 'eat (te-form)'),
                s('DRINK'), MO,
                w('飲みました', 'nomimashita', 'minum (sopan, lampau)',
                  'drank (polite past)')],
        note='Dua aksi dirangkai dengan bentuk -te, lalu ditutup satu kata kerja.',
        note_en='Two actions are joined with the -te form, closed by one final verb.',
    ),
    dict(
        key='long_crowded_reason', who='asing', politeness='sopan',
        who_id='orang yang baru dikenal', who_en='someone you just met',
        situation='Menjelaskan alasan pindah tempat',
        situation_en='Explaining why you changed location',
        pieces=[s('PLACE'), p('が', 'ga', 'partikel subjek', 'subject particle'),
                w('混んで', 'konde', 'penuh / sesak (bentuk -te)', 'crowded (te-form)'),
                w('いました', 'imashita', 'sedang (sopan, lampau)', 'was (polite past)'),
                KARA, s('PLACE_MEET'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行きます', 'ikimasu', 'pergi (sopan)', 'go (polite)')],
        note='Bentuk biasa + から menyatakan sebab sebelum akibatnya.',
        note_en='Plain form + から gives the reason before the result.',
    ),

    # ---------------------------------------------------------------- casual
    dict(
        key='long_casual_ate_and_drank', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Cerita santai soal makan',
        situation_en='A casual story about eating',
        pieces=[s('TIME_PAST'), s('PLACE_EAT'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('PERSON'), p('と', 'to', 'partikel dengan', 'with (particle)'),
                s('FOOD'), w('食べて', 'tabete', 'makan (bentuk -te)', 'eat (te-form)'),
                s('DRINK'), MO,
                w('飲んだ', 'nonda', 'minum (biasa, lampau)', 'drank (plain past)')],
        note='Semua bentuk biasa: 食べて lalu 飲んだ, tanpa です/ます.',
        note_en='All plain forms: 食べて then 飲んだ, with no です/ます.',
    ),
    dict(
        key='long_casual_forgot_return', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Mengaku lupa dan akan kembali',
        situation_en='Admitting you forgot something and will go back',
        pieces=[s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('忘れた', 'wasureta', 'lupa (biasa, lampau)', 'forgot (plain past)'),
                KARA, s('PLACE_SHOP'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('取り', 'tori', 'mengambil (bentuk sambung)', 'take back (verb stem)'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('戻る', 'modoru', 'kembali', 'return'),
                p('ね', 'ne', 'partikel meminta persetujuan', 'agreement particle')],
        note='Pola kata kerja bentuk sambung + に + 戻る menyatakan tujuan kembali.',
        note_en='The pattern "verb stem + に + 戻る" states the purpose of returning.',
    ),
    dict(
        key='long_casual_bought_but', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Cerita membeli barang',
        situation_en='A story about buying something',
        pieces=[s('TIME_PAST'), s('PLACE_SHOP'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('買った', 'katta', 'membeli (biasa, lampau)', 'bought (plain past)'),
                KEDO, w('ちょっと', 'chotto', 'agak / sedikit', 'a bit'),
                w('高かった', 'takakatta', 'mahal (biasa, lampau)', 'was expensive')],
        note='けど menghubungkan dua hal yang berlawanan dalam satu kalimat.',
        note_en='けど links two contrasting statements in one sentence.',
    ),
    dict(
        key='long_casual_after_eating', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Rencana setelah makan',
        situation_en='A plan after eating',
        pieces=[s('FOOD'), p('を', 'o', 'partikel objek', 'object particle'),
                w('食べて', 'tabete', 'makan (bentuk -te)', 'eat (te-form)'),
                KARA, s('PLACE_MEET'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行く', 'iku', 'pergi (biasa)', 'go (plain)'),
                p('ね', 'ne', 'partikel meminta persetujuan', 'agreement particle')],
        note='Bentuk -te + から berarti setelah melakukan.',
        note_en='The -te form + から means "after (doing)".',
    ),
    dict(
        key='long_casual_while_listening', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Kebiasaan sambil mendengarkan musik',
        situation_en='A habit while listening to music',
        pieces=[s('TOPIC'), p('を', 'o', 'partikel objek', 'object particle'),
                w('聞き', 'kiki', 'mendengar (bentuk sambung)', 'listen (verb stem)'),
                NAGARA, s('OBJECT'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('見て', 'mite', 'melihat (bentuk -te)', 'look at (te-form)'),
                w('いる', 'iru', 'sedang (biasa)', 'is doing (plain)')],
        note='ながら menggabungkan dua aksi yang dilakukan bersamaan.',
        note_en='ながら joins two actions done at the same time.',
    ),
]

TEMPLATES = TEMPLATES + LONG_TEMPLATES


# --------------------------------------------------------- very long forms
# The templates above reach 8-11 tokens. The sentence the reader pointed at as the
# example of "long" is 18 tokens and 42 morae, so those were called long on a
# technicality: measured against that example their median is barely half. These are
# built to be long in the same way it is, by chaining clauses rather than by adding
# adjectives, so the list really does contain sentences of that shape.
SOREKARA = w('それから', 'sorekara', 'setelah itu', 'after that')
ITSUMO = w('いつも', 'itsumo', 'selalu', 'always')
MODOTTE = w('戻って', 'modotte', 'kembali (bentuk -te)', 'return (te-form)')
KITA = w('来た', 'kita', 'datang (biasa, lampau)', 'came (plain past)')
DOU = w('どう', 'dou', 'bagaimana', 'how')

VERY_LONG_TEMPLATES = [
    # ---------------------------------------------------------------- polite
    dict(
        key='vlong_buy_then_eat', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Rencana membeli lalu makan',
        situation_en='A plan to buy something and then eat',
        pieces=[s('TIME_NONPAST'), s('PLACE_SHOP'),
                p('へ', 'e', 'partikel arah (ke)', 'direction particle (to)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('買い', 'kai', 'membeli (bentuk sambung)', 'buy (verb stem)'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行って', 'itte', 'pergi (bentuk -te)', 'go (te-form)'),
                SOREKARA, s('PLACE_EAT'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('FOOD'), p('を', 'o', 'partikel objek', 'object particle'),
                w('食べます', 'tabemasu', 'makan (sopan)', 'eat (polite)')],
        note='Dua klausa dirangkai bentuk -te lalu それから, ditutup satu kata kerja sopan.',
        note_en='Two clauses joined with the -te form plus それから, closed by one polite verb.',
    ),
    dict(
        key='vlong_eat_drink_then_go', who='asing', politeness='sopan',
        who_id='teman', who_en='friend',
        situation='Makan dan minum dulu, baru pergi',
        situation_en='Eating and drinking first, then going',
        pieces=[s('TIME_NONPAST'), s('PLACE_EAT'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('PERSON'), p('と', 'to', 'partikel dengan', 'with (particle)'),
                s('FOOD'), p('を', 'o', 'partikel objek', 'object particle'),
                w('食べて', 'tabete', 'makan (bentuk -te)', 'eat (te-form)'),
                s('DRINK'), p('を', 'o', 'partikel objek', 'object particle'),
                w('飲んで', 'nonde', 'minum (bentuk -te)', 'drink (te-form)'),
                KARA, s('PLACE_MEET'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行きます', 'ikimasu', 'pergi (sopan)', 'go (polite)')],
        note='Tiga aksi berurutan: て, て, lalu てから menandai urutan waktunya.',
        note_en='Three actions in order: -te, -te, then -te から marks the sequence.',
    ),
    dict(
        key='vlong_arrive_call_buy', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Permintaan berurutan setelah tiba',
        situation_en='A sequence of requests after arriving',
        pieces=[s('PLACE'), p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('着いたら', 'tsuitara', 'kalau sudah tiba', 'when (you) arrive'),
                s('PERSON'), p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('電話', 'denwa', 'telepon', 'telephone'),
                w('して', 'shite', 'melakukan (bentuk -te)', 'do (te-form)'),
                KARA, s('PLACE_SHOP'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('買って', 'katte', 'membeli (bentuk -te)', 'buy (te-form)'),
                w('ください', 'kudasai', 'tolong (permintaan sopan)',
                  'please (polite request)')],
        note='Empat klausa: たら, てから, lalu てください. Pola instruksi berurutan.',
        note_en='Four clauses: たら, then てから, then てください. A sequenced instruction.',
    ),
    dict(
        key='vlong_when_going_always', who='asing', politeness='sopan',
        who_id='orang yang baru dikenal', who_en='someone you just met',
        situation='Kebiasaan yang selalu dilakukan',
        situation_en='A habit that always happens',
        pieces=[s('TIME_NONPAST'), s('PLACE'),
                p('へ', 'e', 'partikel arah (ke)', 'direction particle (to)'),
                w('行く', 'iku', 'pergi (bentuk kamus)', 'go (dictionary form)'),
                TOKI, ITSUMO, s('PLACE_SHOP'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('買って', 'katte', 'membeli (bentuk -te)', 'buy (te-form)'),
                s('PERSON'), p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('会います', 'aimasu', 'bertemu (sopan)', 'meet (polite)')],
        note='とき + いつも menyatakan kebiasaan; 買って lalu 会います aksi berurutan.',
        note_en='とき with いつも states a habit; 買って then 会います is a sequence.',
    ),
    dict(
        key='vlong_crowded_then_eat', who='asing', politeness='sopan',
        who_id='rekan kerja', who_en='colleague',
        situation='Pindah tempat karena penuh',
        situation_en='Changing place because it was crowded',
        pieces=[s('PLACE'), p('が', 'ga', 'partikel subjek', 'subject particle'),
                w('混んで', 'konde', 'penuh / sesak (bentuk -te)', 'crowded (te-form)'),
                w('いました', 'imashita', 'sedang (sopan, lampau)', 'was (polite past)'),
                KARA, s('TIME_NONPAST'), s('PLACE_MEET'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行って', 'itte', 'pergi (bentuk -te)', 'go (te-form)'),
                s('PERSON'), p('と', 'to', 'partikel dengan', 'with (particle)'),
                s('FOOD'), p('を', 'o', 'partikel objek', 'object particle'),
                w('食べます', 'tabemasu', 'makan (sopan)', 'eat (polite)')],
        note='から menerangkan sebab, 行って + 食べます menyambung akibatnya.',
        note_en='から gives the reason; 行って with 食べます links the result.',
    ),
    dict(
        key='vlong_while_drink_talk_go', who='asing', politeness='sopan',
        who_id='teman', who_en='friend',
        situation='Mengobrol sambil minum lalu pergi',
        situation_en='Chatting over a drink and then going',
        pieces=[s('TIME_PAST'), s('DRINK'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('飲み', 'nomi', 'minum (bentuk sambung)', 'drink (verb stem)'),
                NAGARA, s('TOPIC'),
                p('の', 'no', 'partikel pemilik (dari)', 'possessive particle'),
                w('話', 'hanashi', 'cerita / pembicaraan', 'talk / story'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('して', 'shite', 'melakukan (bentuk -te)', 'do (te-form)'),
                KARA, s('PLACE_MEET'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行きました', 'ikimashita', 'pergi (sopan, lampau)', 'went (polite past)')],
        note='ながら untuk aksi bersamaan, lalu てから untuk urutan sesudahnya.',
        note_en='ながら for the simultaneous action, then てから for what followed.',
    ),
    dict(
        key='vlong_search_then_eat', who='asing', politeness='sopan',
        who_id='petugas toko', who_en='shop attendant',
        situation='Mencari barang di beberapa toko',
        situation_en='Searching several shops for an item',
        pieces=[s('TIME_NONPAST'), s('PERSON'),
                p('と', 'to', 'partikel dengan', 'with (particle)'),
                s('PLACE_SHOP'), p('へ', 'e', 'partikel arah (ke)', 'direction particle (to)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('探し', 'sagashi', 'mencari (bentuk sambung)', 'look for (verb stem)'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行って', 'itte', 'pergi (bentuk -te)', 'go (te-form)'),
                SOREKARA, s('FOOD'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('食べます', 'tabemasu', 'makan (sopan)', 'eat (polite)')],
        note='Tujuan ganda: 探しに行って (pergi untuk mencari), lalu 食べます.',
        note_en='A double purpose: 探しに行って (go in order to look), then 食べます.',
    ),

    # ---------------------------------------------------------------- casual
    dict(
        key='vlong_casual_buy_then_eat', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Cerita membeli lalu makan',
        situation_en='A story about buying and then eating',
        pieces=[s('TIME_PAST'), s('PLACE_SHOP'),
                p('へ', 'e', 'partikel arah (ke)', 'direction particle (to)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('買い', 'kai', 'membeli (bentuk sambung)', 'buy (verb stem)'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行って', 'itte', 'pergi (bentuk -te)', 'go (te-form)'),
                SOREKARA, s('PLACE_EAT'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('FOOD'), p('を', 'o', 'partikel objek', 'object particle'),
                w('食べた', 'tabeta', 'makan (biasa, lampau)', 'ate (plain past)')],
        note='Semua bentuk biasa: 行って + それから + 食べた, tanpa です/ます.',
        note_en='All plain: 行って then それから then 食べた, with no です/ます.',
    ),
    dict(
        key='vlong_casual_eat_drink_go', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Ajakan makan lalu pergi',
        situation_en='Suggesting to eat and then go',
        pieces=[s('TIME_NONPAST'), s('PLACE_EAT'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('PERSON'), p('と', 'to', 'partikel dengan', 'with (particle)'),
                s('FOOD'), p('を', 'o', 'partikel objek', 'object particle'),
                w('食べて', 'tabete', 'makan (bentuk -te)', 'eat (te-form)'),
                s('DRINK'), MO,
                w('飲んで', 'nonde', 'minum (bentuk -te)', 'drink (te-form)'),
                KARA, s('PLACE_MEET'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行く', 'iku', 'pergi (biasa)', 'go (plain)'),
                p('ね', 'ne', 'partikel meminta persetujuan', 'agreement particle')],
        note='ね di akhir melunakkan ajakan panjang jadi terasa mengajak, bukan memerintah.',
        note_en='The closing ね softens a long suggestion into an invitation.',
    ),
    dict(
        key='vlong_casual_forgot_long', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Lupa, kembali, lalu lanjut',
        situation_en='Forgot, went back, then continued',
        pieces=[s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('忘れた', 'wasureta', 'lupa (biasa, lampau)', 'forgot (plain past)'),
                KARA, s('PLACE_SHOP'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('取り', 'tori', 'mengambil (bentuk sambung)', 'take back (verb stem)'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                MODOTTE, KARA, s('PLACE_MEET'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('行く', 'iku', 'pergi (biasa)', 'go (plain)'),
                p('ね', 'ne', 'partikel meminta persetujuan', 'agreement particle')],
        note='Tiga klausa sebab-akibat: 忘れたから, 戻ってから, lalu 行く.',
        note_en='Three chained clauses: 忘れたから, 戻ってから, then 行く.',
    ),
    dict(
        key='vlong_casual_bought_returned', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Membeli, menyesal, kembali ke toko',
        situation_en='Bought, regretted, went back to the shop',
        pieces=[s('TIME_PAST'), s('PLACE_SHOP'),
                p('で', 'de', 'partikel tempat (di)', 'location particle (at)'),
                s('OBJECT_BUY'), p('を', 'o', 'partikel objek', 'object particle'),
                w('買った', 'katta', 'membeli (biasa, lampau)', 'bought (plain past)'),
                KEDO, w('ちょっと', 'chotto', 'agak / sedikit', 'a bit'),
                w('高かった', 'takakatta', 'mahal (biasa, lampau)', 'was expensive'),
                KARA, s('PLACE_SHOP'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('戻った', 'modotta', 'kembali (biasa, lampau)', 'returned (plain past)')],
        note='けど lalu から: dua hubungan sekaligus dalam satu kalimat panjang.',
        note_en='けど then から: two relations in one long sentence.',
    ),
    dict(
        key='vlong_casual_listen_see', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Sambil mendengarkan lalu bertemu',
        situation_en='Listening on the way and then meeting',
        pieces=[s('TOPIC'), p('を', 'o', 'partikel objek', 'object particle'),
                w('聞き', 'kiki', 'mendengar (bentuk sambung)', 'listen (verb stem)'),
                NAGARA, s('OBJECT'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('見て', 'mite', 'melihat (bentuk -te)', 'look at (te-form)'),
                w('いる', 'iru', 'sedang (biasa)', 'is doing (plain)'),
                w('と', 'to', 'partikel syarat (ternyata)', 'when / and then (particle)'),
                s('PERSON'), p('が', 'ga', 'partikel subjek', 'subject particle'),
                KITA],
        note='Pola ている + と + が + 来た: sesuatu terjadi saat sedang melakukan hal lain.',
        note_en='The pattern ている + と + が + 来た: something happened mid-action.',
    ),
    dict(
        key='vlong_casual_when_going_always', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Kebiasaan santai yang selalu dilakukan',
        situation_en='A casual habit that always happens',
        pieces=[s('TIME_NONPAST'), s('PLACE'),
                p('へ', 'e', 'partikel arah (ke)', 'direction particle (to)'),
                w('行く', 'iku', 'pergi (bentuk kamus)', 'go (dictionary form)'),
                TOKI, ITSUMO, s('DRINK'),
                p('を', 'o', 'partikel objek', 'object particle'),
                w('買って', 'katte', 'membeli (bentuk -te)', 'buy (te-form)'),
                s('PERSON'), p('に', 'ni', 'partikel tujuan', 'target particle'),
                w('会う', 'au', 'bertemu (biasa)', 'meet (plain)')],
        note='Versi biasa dari pola kebiasaan とき + いつも.',
        note_en='The plain version of the とき with いつも habit pattern.',
    ),
    dict(
        key='vlong_casual_after_eat_ask', who='dekat', politeness='biasa',
        who_id='teman dekat', who_en='close friend',
        situation='Menanyakan rencana setelah makan',
        situation_en='Asking about the plan after eating',
        pieces=[s('FOOD'), p('を', 'o', 'partikel objek', 'object particle'),
                w('食べて', 'tabete', 'makan (bentuk -te)', 'eat (te-form)'),
                KARA, s('TIME_NONPAST'), s('PLACE_MEET'),
                p('に', 'ni', 'partikel tujuan', 'target particle'),
                s('PERSON'), p('と', 'to', 'partikel dengan', 'with (particle)'),
                w('行く', 'iku', 'pergi (biasa)', 'go (plain)'),
                KEDO, DOU],
        note='けど + どう di akhir: mengajukan rencana lalu menanyakan pendapat.',
        note_en='けど with どう at the end: proposes a plan and asks what the other thinks.',
    ),
]

TEMPLATES = TEMPLATES + VERY_LONG_TEMPLATES


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

    # ------------------------------------------------------------ longer forms
    'long_purpose_buy': ('{TIME_NONPAST} saya pergi ke {PLACE_SHOP} untuk membeli {OBJECT_BUY:bare}.',
                         '{TIME_NONPAST:bare} I am going to {PLACE_SHOP:the} to buy {OBJECT_BUY:bare}.',
                         'Pola kata kerja bentuk sambung + に + 行きます menyatakan tujuan pergi.',
                         'Verb stem + に + 行きます states the purpose of going.'),
    'long_looking_for': ('Sejak {TIME_PAST} saya mencari {OBJECT_BUY:bare} di {PLACE_SHOP}.',
                         'I have been looking for {OBJECT_BUY:my} at {PLACE_SHOP:the} since {TIME_PAST:bare}.',
                         'Bentuk -te + います menyatakan aksi yang sedang berlangsung.',
                         'The -te form + います marks an action in progress.'),
    'long_when_going': ('Saat pergi ke {PLACE}, saya membeli {OBJECT_BUY:bare}.',
                        'When I go to {PLACE:the}, I buy {OBJECT_BUY:bare}.',
                        'Kata kerja bentuk kamus + とき berarti saat melakukan sesuatu.',
                        'Dictionary form + とき means "when (doing)".'),
    'long_when_arrive_call': ('Kalau sudah tiba di {PLACE}, tolong telepon {PERSON:bare}.',
                              'When you arrive at {PLACE:the}, please call {PERSON:my}.',
                              'Bentuk lampau + ら berarti kalau atau setelah.',
                              'Past form + ら means "when/if".'),
    'long_while_drinking': ('Sambil minum {DRINK:bare}, saya bercerita tentang {TOPIC:bare}.',
                            'While drinking {DRINK:bare}, I talked about {TOPIC:bare}.',
                            'Bentuk sambung + ながら berarti sambil melakukan.',
                            'Verb stem + ながら means "while (doing)".'),
    'long_meal_and_drink': ('{TIME_PAST} saya makan {FOOD:bare} dan juga minum {DRINK:bare} dengan {PERSON:bare} di {PLACE_EAT}.',
                            '{TIME_PAST:bare} I ate {FOOD:bare} and also drank {DRINK:bare} with {PERSON:my} at {PLACE_EAT:the}.',
                            'Dua aksi dirangkai dengan bentuk -te, lalu ditutup satu kata kerja.',
                            'Two actions are joined with the -te form, closed by one final verb.'),
    'long_crowded_reason': ('{PLACE} sedang penuh, jadi saya pergi ke {PLACE_MEET}.',
                            '{PLACE:the} was crowded, so I am going to {PLACE_MEET:the}.',
                            'Bentuk biasa + から menyatakan sebab sebelum akibatnya.',
                            'Plain form + から gives the reason before the result.'),
    'long_casual_ate_and_drank': ('{TIME_PAST} saya makan {FOOD:bare} dan juga minum {DRINK:bare} dengan {PERSON:bare} di {PLACE_EAT}.',
                                  '{TIME_PAST:bare} I ate {FOOD:bare} and also drank {DRINK:bare} with {PERSON:my} at {PLACE_EAT:the}.',
                                  'Semua bentuk biasa, tanpa です/ます.',
                                  'All plain forms, with no です/ます.'),
    'long_casual_forgot_return': ('Saya lupa {OBJECT_BUY:bare}, jadi saya kembali ke {PLACE_SHOP} untuk mengambilnya, ya.',
                                  'I forgot {OBJECT_BUY:my}, so I am going back to {PLACE_SHOP:the} to get it.',
                                  'Pola kata kerja bentuk sambung + に + 戻る menyatakan tujuan kembali.',
                                  'Verb stem + に + 戻る states the purpose of returning.'),
    'long_casual_bought_but': ('{TIME_PAST} saya membeli {OBJECT_BUY:bare} di {PLACE_SHOP}, tapi agak mahal.',
                               '{TIME_PAST:bare} I bought {OBJECT_BUY:bare} at {PLACE_SHOP:the}, though a bit expensive.',
                               'けど menghubungkan dua hal yang berlawanan dalam satu kalimat.',
                               'けど links two contrasting statements in one sentence.'),
    'long_casual_after_eating': ('Setelah makan {FOOD:bare}, saya pergi ke {PLACE_MEET}, ya.',
                                 'After eating {FOOD:bare}, I am going to {PLACE_MEET:the}.',
                                 'Bentuk -te + から berarti setelah melakukan.',
                                 'The -te form + から means "after (doing)".'),
    'long_casual_while_listening': ('Sambil mendengarkan {TOPIC:bare}, saya melihat {OBJECT:bare}.',
                                    'While listening to {TOPIC:bare}, I am looking at {OBJECT:my}.',
                                    'ながら menggabungkan dua aksi yang bersamaan.',
                                    'ながら joins two actions done at the same time.'),

    # ---------------------------------------------------------- very long forms
    'vlong_buy_then_eat': ('{TIME_NONPAST} saya pergi ke {PLACE_SHOP} untuk membeli {OBJECT_BUY:bare}, lalu makan {FOOD:bare} di {PLACE_EAT}.',
                           '{TIME_NONPAST:bare} I am going to {PLACE_SHOP:the} to buy {OBJECT_BUY:bare}, and then eat {FOOD:bare} at {PLACE_EAT:the}.',
                           'Dua klausa dirangkai bentuk -te lalu それから, ditutup satu kata kerja sopan.',
                           'Two clauses joined with the -te form plus それから, closed by one polite verb.'),
    'vlong_eat_drink_then_go': ('{TIME_NONPAST} saya makan {FOOD:bare} dan minum {DRINK:bare} dengan {PERSON:bare} di {PLACE_EAT}, lalu pergi ke {PLACE_MEET}.',
                               '{TIME_NONPAST:bare} I eat {FOOD:bare} and drink {DRINK:bare} with {PERSON:my} at {PLACE_EAT:the}, then go to {PLACE_MEET:the}.',
                               'Tiga aksi berurutan: て, て, lalu てから menandai urutan waktunya.',
                               'Three actions in order: -te, -te, then -te から marks the sequence.'),
    'vlong_arrive_call_buy': ('Kalau sudah tiba di {PLACE}, tolong telepon {PERSON:bare}, lalu beli {OBJECT_BUY:bare} di {PLACE_SHOP}.',
                              'When you arrive at {PLACE:the}, please call {PERSON:my}, then buy {OBJECT_BUY:bare} at {PLACE_SHOP:the}.',
                              'Empat klausa: たら, てから, lalu てください. Pola instruksi berurutan.',
                              'Four clauses: たら, then てから, then てください. A sequenced instruction.'),
    'vlong_when_going_always': ('{TIME_NONPAST} kalau pergi ke {PLACE}, saya selalu membeli {OBJECT_BUY:bare} di {PLACE_SHOP} lalu bertemu {PERSON:bare}.',
                                '{TIME_NONPAST:bare} when I go to {PLACE:the}, I always buy {OBJECT_BUY:bare} at {PLACE_SHOP:the} and then meet {PERSON:my}.',
                                'とき + いつも menyatakan kebiasaan; 買って lalu 会います aksi berurutan.',
                                'とき with いつも states a habit; 買って then 会います is a sequence.'),
    'vlong_crowded_then_eat': ('{PLACE} sedang penuh, jadi {TIME_NONPAST} saya pergi ke {PLACE_MEET} lalu makan {FOOD:bare} dengan {PERSON:bare}.',
                               '{PLACE:the} was crowded, so {TIME_NONPAST:bare} I go to {PLACE_MEET:the} and then eat {FOOD:bare} with {PERSON:my}.',
                               'から menerangkan sebab, 行って + 食べます menyambung akibatnya.',
                               'から gives the reason; 行って with 食べます links the result.'),
    'vlong_while_drink_talk_go': ('{TIME_PAST} sambil minum {DRINK:bare} saya bercerita tentang {TOPIC:bare}, lalu pergi ke {PLACE_MEET}.',
                                  '{TIME_PAST:bare} while drinking {DRINK:bare} I talked about {TOPIC:bare}, then went to {PLACE_MEET:the}.',
                                  'ながら untuk aksi bersamaan, lalu てから untuk urutan sesudahnya.',
                                  'ながら for the simultaneous action, then てから for what followed.'),
    'vlong_search_then_eat': ('{TIME_NONPAST} saya pergi ke {PLACE_SHOP} bersama {PERSON:bare} untuk mencari {OBJECT_BUY:bare}, lalu makan {FOOD:bare}.',
                              '{TIME_NONPAST:bare} I go to {PLACE_SHOP:the} with {PERSON:my} to look for {OBJECT_BUY:my}, and then eat {FOOD:bare}.',
                              'Tujuan ganda: 探しに行って (pergi untuk mencari), lalu 食べます.',
                              'A double purpose: 探しに行って (go in order to look), then 食べます.'),
    'vlong_casual_buy_then_eat': ('{TIME_PAST} saya pergi ke {PLACE_SHOP} untuk membeli {OBJECT_BUY:bare}, lalu makan {FOOD:bare} di {PLACE_EAT}.',
                                  '{TIME_PAST:bare} I went to {PLACE_SHOP:the} to buy {OBJECT_BUY:bare}, and then ate {FOOD:bare} at {PLACE_EAT:the}.',
                                  'Semua bentuk biasa: 行って + それから + 食べた, tanpa です/ます.',
                                  'All plain: 行って then それから then 食べた, with no です/ます.'),
    'vlong_casual_eat_drink_go': ('{TIME_NONPAST} makan {FOOD:bare} dan minum {DRINK:bare} dengan {PERSON:bare} di {PLACE_EAT}, lalu pergi ke {PLACE_MEET}, ya.',
                                  '{TIME_NONPAST:bare} let us eat {FOOD:bare} and drink {DRINK:bare} with {PERSON:my} at {PLACE_EAT:the}, then go to {PLACE_MEET:the}.',
                                  'ね di akhir melunakkan ajakan panjang jadi terasa mengajak, bukan memerintah.',
                                  'The closing ね softens a long suggestion into an invitation.'),
    'vlong_casual_forgot_long': ('Saya lupa {OBJECT_BUY:bare}, jadi saya kembali ke {PLACE_SHOP} untuk mengambilnya, lalu pergi ke {PLACE_MEET}, ya.',
                                 'I forgot {OBJECT_BUY:my}, so I went back to {PLACE_SHOP:the} to get it, then went to {PLACE_MEET:the}.',
                                 'Tiga klausa sebab-akibat: 忘れたから, 戻ってから, lalu 行く.',
                                 'Three chained clauses: 忘れたから, 戻ってから, then 行く.'),
    'vlong_casual_bought_returned': ('{TIME_PAST} saya membeli {OBJECT_BUY:bare} di {PLACE_SHOP}, tapi agak mahal, jadi saya kembali ke {PLACE_SHOP}.',
                                     '{TIME_PAST:bare} I bought {OBJECT_BUY:bare} at {PLACE_SHOP:the}, but it was a bit expensive, so I went back to {PLACE_SHOP:the}.',
                                     'けど lalu から: dua hubungan sekaligus dalam satu kalimat panjang.',
                                     'けど then から: two relations in one long sentence.'),
    'vlong_casual_listen_see': ('Saat sedang mendengarkan {TOPIC:bare} dan melihat {OBJECT:bare}, {PERSON} datang.',
                                'While I was listening to {TOPIC:bare} and looking at {OBJECT:my}, {PERSON:my} came.',
                                'Pola ている + と + が + 来た: sesuatu terjadi saat sedang melakukan hal lain.',
                                'The pattern ている + と + が + 来た: something happened mid-action.'),
    'vlong_casual_when_going_always': ('{TIME_NONPAST} kalau pergi ke {PLACE}, saya selalu membeli {DRINK:bare} lalu bertemu {PERSON:bare}.',
                                       '{TIME_NONPAST:bare} when I go to {PLACE:the}, I always buy {DRINK:bare} and then meet {PERSON:my}.',
                                       'Versi biasa dari pola kebiasaan とき + いつも.',
                                       'The plain version of the とき with いつも habit pattern.'),
    'vlong_casual_after_eat_ask': ('Setelah makan {FOOD:bare}, {TIME_NONPAST} pergi ke {PLACE_MEET} dengan {PERSON:bare}, bagaimana?',
                                   'After eating {FOOD:bare}, {TIME_NONPAST:bare} go to {PLACE_MEET:the} with {PERSON:my}, how about it?',
                                   'けど + どう di akhir: mengajukan rencana lalu menanyakan pendapat.',
                                   'けど with どう at the end: proposes a plan and asks what the other thinks.'),
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


# Two templates are enormous: 長/短 cross-products of time x place x person x food x
# drink multiply out to 90,750 sentences each. Unbounded, the bank reaches 188,000,
# which is far more than a page should carry and buries the long sentences the list
# is supposed to show. So each template contributes a bounded, evenly spaced sample.
#
# The caps are derived from a target rather than typed twice: 26 per short template
# fixes the short total, and the long cap is whatever makes the long total match, so
# the list can be interleaved 50/50 and the split is exact by construction.
LONG_TOKENS = int(__import__('os').environ.get('LANGSENT_LONG_TOKENS', '12'))


def template_tokens(template):
    """How many tokens a template produces: one per piece, slots included."""
    return len(template['pieces'])


def is_long(template):
    """Long means comparable to the example the reader pointed at.

    That sentence is 18 tokens and 42 morae. An earlier version of this function
    called anything above the shortest template (8 tokens) long, which let the build
    report "52% long" for sentences whose median was half the example. The threshold
    is therefore expressed in tokens, not as "more than the little ones".
    """
    return template_tokens(template) >= LONG_TOKENS


SHORT_TEMPLATES = [t for t in TEMPLATES if not is_long(t)]
LONG_TEMPLATES = [t for t in TEMPLATES if is_long(t)]
SHORT_CAP = int(__import__('os').environ.get('LANGSENT_SHORT_CAP', '18'))
LONG_CAP = round(len(SHORT_TEMPLATES) * SHORT_CAP / max(len(LONG_TEMPLATES), 1))


def sample_indices(total, keep):
    """Evenly spaced, deterministic indices so a build is reproducible."""
    if total <= keep:
        return list(range(total))
    return sorted({round(i * (total - 1) / (keep - 1)) for i in range(keep)})


def slot_counts(template):
    """How many words each slot of this template can take."""
    return [len(CATEGORIES[piece[1]]) for piece in template['pieces'] if piece[0] == 's']


def template_combinations(template):
    total = 1
    for n in slot_counts(template):
        total *= n
    return total


def _slot_categories(template):
    return [p[1] for p in template['pieces'] if p[0] == 's']


def _combination_at(template, index):
    """The n-th word combination of a template, without building the ones before it.

    Mixed-radix counting over the slot sizes. This matters: the two largest templates
    have 90,750 combinations each, and the bank used to enumerate every combination of
    every template (3.38M sentences) before sampling it, which took about four minutes
    per call and ran twice per build. Sampling by index touches only what is kept.
    """
    cats = _slot_categories(template)
    sizes = [len(CATEGORIES[c]) for c in cats]
    digits = [0] * len(sizes)
    rest = index
    for k in range(len(sizes) - 1, -1, -1):
        digits[k] = rest % sizes[k]
        rest //= sizes[k]
    return [CATEGORIES[c][d] for c, d in zip(cats, digits)]


def _sentences_for(template, cap):
    """Up to `cap` evenly spaced sentences from one template."""
    total = template_combinations(template)
    out = []
    for i in sample_indices(total, cap):
        words = _combination_at(template, i)
        body = render_pieces(template['pieces'], dict(zip(_slot_categories(template), words)))
        tid, ten, note, note_en = translations_for(template['key'], list(zip(_slot_categories(template), words)))
        sentence = {
            'template': template['key'],
            'who': template['who'],
            'politeness': template['politeness'],
            'who_id': template['who_id'],
            'who_en': template['who_en'],
            'situation': template['situation'],
            'situation_en': template['situation_en'],
            'id_translation': tid,
            'en_translation': ten,
            'note': note,
            'note_en': note_en,
        }
        sentence.update(body)
        out.append(sentence)
    return out


def bank_combinations():
    """The bounded bank the page carries: a sample per template, then interleaved.

    Order matters twice over. In template order the first few hundred cards are one
    repeated pattern; in plain round-robin only ~28% are long, because there are many
    more short templates than long ones. So the two families are drawn from separate
    queues and alternated, which is what makes the visible list half long and half
    short.
    """
    short_q, long_q = [], []
    for template in TEMPLATES:
        cap = LONG_CAP if is_long(template) else SHORT_CAP
        picked = _sentences_for(template, cap)
        (long_q if is_long(template) else short_q).append(picked)

    def interleave(queues):
        out = []
        for i in range(max((len(q) for q in queues), default=0)):
            for q in queues:
                if i < len(q):
                    out.append(q[i])
        return out

    short_stream = interleave(short_q)
    long_stream = interleave(long_q)
    out, seen = [], set()
    for i in range(max(len(short_stream), len(long_stream))):
        for stream in (short_stream, long_stream):
            if i < len(stream) and stream[i]['kanji'] not in seen:
                seen.add(stream[i]['kanji'])
                out.append(stream[i])
    return out


def all_combinations():
    """Every template x every word combination, deduplicated on the kanji line.

    This is the full cross-product (millions of sentences) and is kept for inspection.
    The page ships the bounded sample from bank_combinations() instead.
    """
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
            choices = list(zip(cats, combo))
            tid, ten, note, note_en = translations_for(template['key'], choices)
            sentence.update({'id_translation': tid, 'en_translation': ten,
                             'note': note, 'note_en': note_en})
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
