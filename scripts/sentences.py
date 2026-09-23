#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""The hand-written sentences, plus the palette the renderer uses.

This file holds the CURATED part of the bank only. The generated part lives in
generate.py and is stitched on by bank.py, so this list keeps its priority: a
generated sentence that duplicates one of these by its kanji line is dropped.

Each sentence has:
  kanji / romaji / id_translation / en_translation
  tokens: list of (kanji_token, romaji_token, gloss_id, gloss_en)
  who / who_id / who_en:   dekat (close) or asing (stranger), in both languages
  politeness:              sopan (polite) or biasa (plain)
  freq:   CEJC 書字形 frequency count of the key word (2,419,171 words, 200 h)
  note / note_en: usage note

Colours and underline styles are shared by the kanji line and the romaji line, so
token i has the same colour in both.
"""

PALETTE = [
    ('#2f6f4e', '#7ec699'),  # green
    ('#a34b1f', '#f0a06a'),  # burnt orange
    ('#1f5f8b', '#7ab8e8'),  # blue
    ('#7a3f8f', '#c79ae0'),  # purple
    ('#8a6b12', '#e0c46a'),  # gold
    ('#b0355c', '#f08aab'),  # crimson
    ('#1e7a7a', '#6fd0d0'),  # teal
    ('#5c4b8a', '#a99ae0'),  # indigo
    ('#8a5a1e', '#d0a06a'),  # brown
    ('#3d7a2f', '#9ad07a'),  # olive
]

UNDERLINE_STYLES = ['solid', 'dashed', 'dotted', 'double', 'wavy']


# The hand-written sentences. bank.py places these first and drops any generated
# sentence that duplicates one of them, so this list stays the priority set.
CURATED = [
    {
        'id': 1,
        'situation': 'Kepada tetangga pada pagi hari (dekat, tapi tetap sopan)',
        'situation_en': 'To a neighbour in the morning (familiar but polite)',
        'who': 'dekat',                       # dekat / asing
        'who_id': 'tetangga',
        'who_en': 'neighbour',
        'politeness': 'sopan',                   # sopan / biasa
        'kanji': 'おはようございます。',
        'romaji': 'Ohayou gozaimasu.',
        'id_translation': 'Selamat pagi.',
        'en_translation': 'Good morning.',
        'tokens': [
            ['おはよう', 'ohayou', 'selamat pagi (akrab)', 'good morning (casual)'],
            ['ございます', 'gozaimasu', 'bentuk sopan dari adalah/ada', 'polite copula suffix'],
        ],
        'freq': 1033,
        'note': 'おはよう sendiri dipakai ke teman atau keluarga; tambah ございます untuk tetangga, atasan, orang baru.',
        'note_en': 'Use おはよう alone with friends or family; add ございます for neighbours, superiors, strangers.',
    },
    {
        'id': 2,
        'situation': 'Kepada orang asing di jalan (sopan)',
        'situation_en': 'To a stranger on the street (polite)',
        'who': 'asing',                       # dekat / asing
        'who_id': 'orang asing',
        'who_en': 'stranger',
        'politeness': 'sopan',                   # sopan / biasa
        'kanji': 'すみません、ちょっと待ってください。',
        'romaji': 'Sumimasen, chotto matte kudasai.',
        'id_translation': 'Permisi, tolong tunggu sebentar.',
        'en_translation': 'Excuse me, please wait a moment.',
        'tokens': [
            ['すみません', 'sumimasen', 'permisi / maaf / terima kasih', 'excuse me / sorry / thanks'],
            ['ちょっと', 'chotto', 'sebentar / sedikit', 'a little / a moment'],
            ['待って', 'matte', 'menunggu (bentuk -te)', 'wait (te-form)'],
            ['ください', 'kudasai', 'tolong (permintaan sopan)', 'please (polite request)'],
        ],
        'freq': 7507,
        'note': 'Urutan ちょっと + 待って + ください adalah pola permintaan sopan baku.',
        'note_en': 'ちょっと + 待って + ください is the standard polite request pattern.',
    },
    {
        'id': 3,
        'situation': 'Kepada petugas toko (menanyakan harga)',
        'situation_en': 'To a shop attendant (asking the price)',
        'who': 'asing',                       # dekat / asing
        'who_id': 'petugas toko',
        'who_en': 'shop attendant',
        'politeness': 'sopan',                   # sopan / biasa
        'kanji': 'これ、いくらですか。',
        'romaji': 'Kore, ikura desu ka.',
        'id_translation': 'Ini berapa harganya?',
        'en_translation': 'How much is this?',
        'tokens': [
            ['これ', 'kore', 'ini', 'this'],
            ['いくら', 'ikura', 'berapa (harga)', 'how much'],
            ['です', 'desu', 'adalah (sopan)', 'is (polite copula)'],
            ['か', 'ka', 'partikel tanya', 'question particle'],
        ],
        'freq': 11895,
        'note': 'Pola pertanyaan paling sering di toko: これ + いくら + ですか.',
        'note_en': 'The most common shop question pattern: これ + いくら + ですか.',
    },
    {
        'id': 4,
        'situation': 'Kepada teman dekat (ajakan santai)',
        'situation_en': 'To a close friend (casual invitation)',
        'who': 'dekat',                       # dekat / asing
        'who_id': 'teman dekat',
        'who_en': 'close friend',
        'politeness': 'biasa',                   # sopan / biasa
        'kanji': '明日、一緒に行く?',
        'romaji': 'Ashita, issho ni iku?',
        'id_translation': 'Besok, pergi bersama?',
        'en_translation': 'Are we going together tomorrow?',
        'tokens': [
            ['明日', 'ashita', 'besok', 'tomorrow'],
            ['一緒に', 'issho ni', 'bersama-sama', 'together'],
            ['行く', 'iku', 'pergi', 'to go'],
            ['?', '?', 'intonasi naik = tanya (tanpa か)', 'rising intonation = question (no か)'],
        ],
        'freq': 8575,
        'note': 'Tanpa です/ます dan tanpa か, hanya intonasi naik. Khas percakapan dengan teman dekat.',
        'note_en': 'No です/ます and no か: rising intonation alone. Typical with close friends.',
    },
    {
        'id': 5,
        'situation': 'Menyetujui lawan bicara (dekat)',
        'situation_en': 'Agreeing with the other speaker (close)',
        'who': 'dekat',                       # dekat / asing
        'who_id': 'orang yang sudah akrab',
        'who_en': 'someone you are close to',
        'politeness': 'biasa',                   # sopan / biasa
        'kanji': 'そうだね。',
        'romaji': 'Sou da ne.',
        'id_translation': 'Iya, benar ya.',
        'en_translation': 'Yeah, that is right.',
        'tokens': [
            ['そう', 'sou', 'begitu / seperti itu', 'so / that way'],
            ['だ', 'da', 'adalah (bentuk biasa)', 'is (plain copula)'],
            ['ね', 'ne', 'partikel meminta persetujuan', 'agreement particle'],
        ],
        'freq': 42783,
        'note': 'ね muncul 38% dari semua partikel akhir kalimat, jauh di atas か (15%).',
        'note_en': 'ね is 38% of all sentence-final particles, far above か (15%).',
    },
    {
        'id': 6,
        'situation': 'Cerita panjang ke teman (menguji word wrap di layar kecil)',
        'situation_en': 'A longer story to a friend (tests word wrap on small screens)',
        'who': 'dekat',                       # dekat / asing
        'who_id': 'teman',
        'who_en': 'friend',
        'politeness': 'sopan',                   # sopan / biasa
        'kanji': '昨日、駅の近くの安いレストランで友達と一緒にご飯を食べたんだけど、とてもおいしかったです。',
        'romaji': 'Kinou, eki no chikaku no yasui resutoran de tomodachi to issho ni gohan o tabeta n da kedo, totemo oishikatta desu.',
        'id_translation': 'Kemarin saya makan bersama teman di restoran murah dekat stasiun, dan makanannya sangat enak.',
        'en_translation': 'Yesterday I ate with a friend at a cheap restaurant near the station, and it was really good.',
        'tokens': [
            ['昨日', 'kinou', 'kemarin', 'yesterday'],
            ['駅', 'eki', 'stasiun', 'station'],
            ['の', 'no', 'partikel pemilik (dari)', 'possessive particle'],
            ['近く', 'chikaku', 'dekat', 'nearby'],
            ['安い', 'yasui', 'murah', 'cheap'],
            ['レストラン', 'resutoran', 'restoran', 'restaurant'],
            ['で', 'de', 'partikel tempat (di)', 'location particle'],
            ['友達', 'tomodachi', 'teman', 'friend'],
            ['と', 'to', 'partikel dengan', 'with (particle)'],
            ['一緒に', 'issho ni', 'bersama-sama', 'together'],
            ['ご飯', 'gohan', 'nasi / makanan', 'rice / meal'],
            ['を', 'o', 'partikel objek', 'object particle'],
            ['食べた', 'tabeta', 'makan (bentuk lampau)', 'ate (past)'],
            ['ん', 'n', 'penjelas (kasual dari の)', 'explanatory の (casual)'],
            ['だけど', 'dakedo', 'tapi / meskipun', 'but / although'],
            ['とても', 'totemo', 'sangat', 'very'],
            ['おいしかった', 'oishikatta', 'enak (bentuk lampau)', 'was delicious (past)'],
            ['です', 'desu', 'adalah (sopan)', 'is (polite copula)'],
        ],
        'freq': 346,
        'note': 'Kalimat ini 33 mora dan sekitar 19 kata, jadi menguji pembungkusan baris dan tooltip di tepi layar.',
        'note_en': 'This sentence is 33 morae and about 19 words, so it tests line wrapping and tooltips at the screen edge.',
    },
    {
        'id': 7,
        'situation': 'Menyapa tetangga saat berpapasan (sopan, singkat)',
        'situation_en': 'Greeting a neighbour in passing (polite, brief)',
        'who': 'dekat',
        'who_id': 'tetangga',
        'who_en': 'neighbour',
        'politeness': 'sopan',
        'kanji': 'おはようございます。いい天気ですね。',
        'romaji': 'Ohayou gozaimasu. Ii tenki desu ne.',
        'id_translation': 'Selamat pagi. Cuacanya bagus ya.',
        'en_translation': 'Good morning. Nice weather, isn\'t it.',
        'tokens': [
            ['おはよう', 'ohayou', 'selamat pagi (akrab)', 'good morning (casual)'],
            ['ございます', 'gozaimasu', 'bentuk sopan dari adalah/ada', 'polite copula suffix'],
            ['いい', 'ii', 'bagus', 'good'],
            ['天気', 'tenki', 'cuaca', 'weather'],
            ['です', 'desu', 'adalah (sopan)', 'is (polite copula)'],
            ['ね', 'ne', 'ya kan (minta setuju)', 'right? / isn\'t it (agreement)'],
        ],
        'freq': 1033,
        'note': 'ね sendiri 38% dari semua partikel akhir kalimat, jauh di atas か (15%). Pembuka cuaca adalah basa-basi tersering ke tetangga.',
        'note_en': 'ね alone is 38% of all final particles, far above か (15%). Weather small talk is the most common opener with neighbours.',
    },
    {
        'id': 8,
        'situation': 'Menanyakan arah ke orang asing (sopan, tanpa menunjuk)',
        'situation_en': 'Asking a stranger for directions (polite, no pointing)',
        'who': 'asing',
        'who_id': 'orang asing',
        'who_en': 'stranger',
        'politeness': 'sopan',
        'kanji': 'すみません、駅はどちらですか。',
        'romaji': 'Sumimasen, eki wa dochira desu ka.',
        'id_translation': 'Permisi, stasiunnya di sebelah mana?',
        'en_translation': 'Excuse me, which way is the station?',
        'tokens': [
            ['すみません', 'sumimasen', 'permisi (pembuka sopan)', 'excuse me (polite opener)'],
            ['駅', 'eki', 'stasiun', 'station'],
            ['は', 'wa', 'partikel topik', 'topic particle'],
            ['どちら', 'dochira', 'sebelah mana (sopan)', 'which way (polite)'],
            ['です', 'desu', 'adalah (sopan)', 'is (polite copula)'],
            ['か', 'ka', 'partikel tanya', 'question particle'],
        ],
        'freq': 8575,
        'note': 'どちら bentuk sopan dari どこ; ke orang asing ですか + か jauh lebih aman daripada どこ? dengan intonasi naik.',
        'note_en': 'どちら is the polite form of どこ; with a stranger, ですか + か is far safer than a bare どこ? with rising intonation.',
    },
    {
        'id': 9,
        'situation': 'Menawarkan bantuan ke orang asing (sopan)',
        'situation_en': 'Offering help to a stranger (polite)',
        'who': 'asing',
        'who_id': 'orang asing',
        'who_en': 'stranger',
        'politeness': 'sopan',
        'kanji': '何かお手伝いしましょうか。',
        'romaji': 'Nanika otetsudai shimashou ka.',
        'id_translation': 'Ada yang bisa saya bantu?',
        'en_translation': 'Is there anything I can help you with?',
        'tokens': [
            ['何か', 'nanika', 'sesuatu', 'something'],
            ['お手伝い', 'otetsudai', 'bantuan (sopan)', 'help (polite)'],
            ['しましょう', 'shimashou', 'mari saya lakukan (usulan sopan)', 'let me / shall I (polite offer)'],
            ['か', 'ka', 'partikel tanya', 'question particle'],
        ],
        'freq': 11895,
        'note': 'Pola tawaran sopan: 何か + お + kata kerja + しましょうか. Bentuk ini dipakai ke orang asing atau pelanggan.',
        'note_en': 'Polite offer pattern: 何か + お + verb stem + しましょうか. Used with strangers or customers.',
    },
    {
        'id': 10,
        'situation': 'Menanyakan kabar ke teman dekat (santai)',
        'situation_en': 'Asking a close friend how they are (casual)',
        'who': 'dekat',
        'who_id': 'teman dekat',
        'who_en': 'close friend',
        'politeness': 'biasa',
        'kanji': '今日、元気?',
        'romaji': 'Kyou, genki?',
        'id_translation': 'Hari ini sehat?',
        'en_translation': 'You doing okay today?',
        'tokens': [
            ['今日', 'kyou', 'hari ini', 'today'],
            ['元気', 'genki', 'sehat / bersemangat', 'well / energetic'],
            ['?', '?', 'intonasi naik = tanya (tanpa か)', 'rising intonation = question (no か)'],
        ],
        'freq': 42783,
        'note': 'Ke teman dekat, か sering hilang dan tanya cukup lewat intonasi naik. Ini sisi "biasa" dari pembedaan register.',
        'note_en': 'With a close friend, か is often dropped and rising intonation alone marks the question. This is the casual side of the register split.',
    },
]
