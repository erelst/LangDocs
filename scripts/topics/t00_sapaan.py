#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sapaan dan kesantunan dasar: greeting someone, asking how they are, introducing
yourself, apologising, thanking, and taking your leave.

The functions below are the ones that actually occur, and they split by the two things
that change the words: how well you know the person, and whether you are opening or
closing the exchange. A deck that only had こんにちは would be useless the moment the
reader has to leave or apologise, which is why the closing and the repair moves are here
alongside the greetings.
"""
from compose import sent, add_words

add_words({
    'そっち': ('socchi', 'kamu / di situ (akrab)', 'you / over there (casual)'),
    'じゃあ': ('jaa', 'kalau begitu / ya sudah', 'well then'),
    'まあまあ': ('maamaa', 'lumayan / biasa saja', 'so-so'),
    'アリ': ('ari', 'Ari (nama)', 'Ari (a name)'),
    '久しぶり': ('hisashiburi', 'lama tak jumpa', 'long time no see'),
    'あっ': ('a', 'oh / aduh', 'oh / ah'),
    'お元気': ('ogenki', 'kabar / kesehatan (sopan)', 'wellbeing (polite)'),
    'お名前': ('onamae', 'nama (sopan)', 'name (polite)'),
    'よろしく': ('yoroshiku', 'mohon bantuannya (pembuka)', 'please treat me well'),
    'しまいました': ('shimaimashita', 'terlanjur / sudah terjadi', 'ended up doing (regret)'),
    'お先に': ('osaki ni', 'lebih dulu (pamit)', 'before you (taking leave)'),
    '助かった': ('tasukatta', 'tertolong (lampau, akrab)', 'that helped (plain past)'),
    'うるさく': ('urusaku', 'berisik (bentuk -ku)', 'noisily (adverbial form)'),
    '待たせた': ('mataseta', 'membuat menunggu (akrab, lampau)', 'kept waiting (plain past)'),
}, where='t00_sapaan')

# Surfaces this topic keeps as ONE word although they are long, with the reason. These are
# set expressions that a learner meets as a unit, so splitting them would teach the parts
# rather than the phrase. Declaring them here keeps the decision next to the sentences that
# use them, where a reviewer will see it.
SINGLE_WORDS = {
    'おはようございます': 'sapaan pagi baku; satu kesatuan, tidak pernah dipecah',
    'ありがとうございます': 'ungkapan terima kasih baku sebagai satu kesatuan',
    'ごめんなさい': 'permintaan maaf utuh; ごめん saja sudah beda tingkat kesopanan',
    'すみません': 'satu kata, dipakai untuk permisi, maaf, dan terima kasih',
    'よろしく': 'pembuka perkenalan; よろしくお願いします dipecah di sini',
    'お願いします': 'ungkapan permintaan utuh, sering berdiri sendiri',
    '初めまして': 'sapaan perkenalan pertama, satu kesatuan',
    'おかげさまで': 'ungkapan baku saat menjawab kabar',
    'おやすみなさい': 'ucapan selamat tidur, satu kesatuan',
    '気をつけて': 'ungkapan utuh saat melepas orang pergi',
    '大丈夫ですか': 'pertanyaan baku; di bank ini ditulis 大丈夫 です か',
    'こんにちは': 'salam utuh, satu kata',
    'こんばんは': 'salam utuh, satu kata',
    'おはよう': 'salam utuh, satu kata',
    '元気': 'jawaban satu kata; 元気ですか ditulis terpisah di tempat lain',
    'ありがとう': 'ungkapan terima kasih utuh',
    'そっち': 'kata ganti akrab, satu kata',
}

# Sentences whose register is INHERENT to the phrase rather than carried by a です or a
# ます. こんにちは is polite in use and おはよう is casual, and neither contains a
# predicatory form, so the です/ます check cannot see them. Declaring them here keeps the
# exemption visible instead of weakening the check for everyone.
SET_PHRASES = {
    'sapa_siang': 'こんにちは sopan menurut pemakaian, tanpa bentuk predikat',
    'sapa_malam': 'こんばんは sopan menurut pemakaian, tanpa bentuk predikat',
    'sapa_akrab': 'おはよう akrab menurut pemakaian, tanpa bentuk predikat',
    'tanya_kabar_akrab': '元気？ akrab: tanpa か, hanya intonasi naik',
    'balik_tanya': 'そっちは？ akrab: kata ganti akrab menggantikan あなた',
    'terima_kasih_akrab': 'ありがとう + 助かった: bentuk biasa tanpa です/ます',
    'maaf_akrab': 'ごめん + 待たせた: bentuk biasa',
    'pisah_akrab': 'じゃあ、また明日ね: bentuk biasa dengan ね',
    'selamat_jalan': '気をつけて adalah ungkapan tetap tanpa predikat',
    'selamat_tidur': 'おやすみなさい sopan menurut pemakaian, tanpa bentuk predikat',
    'bersin': 'pertanyaan akrab tanpa か',
}

FUNCTIONS = {
    'sapa_pagi': 'menyapa pada pagi hari',
    'sapa_siang': 'menyapa pada siang hari',
    'sapa_malam': 'menyapa pada malam hari',
    'sapa_akrab': 'menyapa teman yang sudah akrab',
    'jumpa_lama': 'menyapa orang yang sudah lama tidak bertemu',
    'tanya_kabar_sopan': 'menanyakan kabar dengan sopan',
    'tanya_kabar_akrab': 'menanyakan kabar dengan akrab',
    'jawab_baik': 'menjawab bahwa kabar baik',
    'jawab_biasa': 'menjawab bahwa kabar biasa saja',
    'balik_tanya': 'menanyakan kabar balik',
    'perkenalan': 'memperkenalkan diri kepada orang baru',
    'sebut_nama': 'menyebutkan nama sendiri',
    'tanya_nama': 'menanyakan nama lawan bicara',
    'minta_bantu': 'meminta bantuan atau perhatian',
    'terima_kasih_sopan': 'berterima kasih dengan sopan',
    'terima_kasih_akrab': 'berterima kasih kepada teman',
    'maaf_sopan': 'meminta maaf dengan sopan',
    'maaf_akrab': 'meminta maaf kepada teman',
    'pamit_pulang': 'berpamitan pulang lebih dulu',
    'pisah_akrab': 'berpisah dengan teman',
    'selamat_jalan': 'mengucapkan hati-hati di jalan',
    'selamat_tidur': 'mengucapkan selamat tidur',
    'bersin': 'menjawab saat lawan bicara bersin',
}

SENTENCES = [
    sent(
        key='sapa_pagi', rel='tetangga', fn='sapa_pagi',
        words=['おはようございます', '。'],
        id_t='Selamat pagi.', en_t='Good morning.',
        sit='Berpapasan dengan tetangga pagi-pagi', sit_en='Passing a neighbour in the morning',
        note='Pagi ke tetangga selalu pakai ございます; tanpa itu terdengar terlalu akrab.',
        note_en='With a neighbour in the morning, keep ございます; without it you sound too familiar.',
    ),
    sent(
        key='sapa_siang', rel='tetangga', fn='sapa_siang',
        words=['こんにちは', '。'],
        id_t='Selamat siang.', en_t='Hello.',
        sit='Berpapasan dengan tetangga siang hari', sit_en='Passing a neighbour around midday',
        note='こんにちは dipakai kira-kira dari pukul sepuluh sampai matahari terbenam.',
        note_en='こんにちは covers roughly ten in the morning until sunset.',
    ),
    sent(
        key='sapa_malam', rel='tetangga', fn='sapa_malam',
        words=['こんばんは', '。'],
        id_t='Selamat malam.', en_t='Good evening.',
        sit='Berpapasan dengan tetangga setelah gelap', sit_en='Passing a neighbour after dark',
        note='こんばんは hanya salam pertemuan; saat mau tidur pakai おやすみなさい.',
        note_en='こんばんは only greets someone you meet; when going to bed it is おやすみなさい.',
    ),
    sent(
        key='sapa_akrab', rel='teman_dekat', fn='sapa_akrab',
        words=['おはよう', '。'],
        id_t='Pagi.', en_t='Morning.',
        sit='Menyapa teman dekat pagi hari', sit_en='Greeting a close friend in the morning',
        note='Tanpa ございます, おはよう hanya untuk keluarga dan teman dekat.',
        note_en='Without ございます, おはよう is only for family and close friends.',
    ),
    sent(
        key='jumpa_lama', rel='asing', fn='jumpa_lama',
        words=['あっ', '、', '久しぶり', 'です', 'ね', '。'],
        id_t='Oh, lama tak jumpa ya.', en_t='Oh, it has been a long time.',
        sit='Bertemu kenalan lama di jalan', sit_en='Running into an old acquaintance',
        note='久しぶり ditutup ですね supaya terasa hangat tapi tetap sopan.',
        note_en='久しぶり with ですね sounds warm while staying polite.',
    ),
    sent(
        key='tanya_kabar_sopan', rel='tetangga', fn='tanya_kabar_sopan',
        words=['お元気', 'です', 'か', '。'],
        id_t='Apa kabar?', en_t='How have you been?',
        sit='Menanyakan kabar tetangga', sit_en='Asking a neighbour how they are',
        note='お di depan 元気 membuatnya sopan; ini bentuk yang dipakai ke tetangga.',
        note_en='The お in front of 元気 is what makes it polite; this is the form to use with a neighbour.',
    ),
    sent(
        key='tanya_kabar_akrab', rel='teman', fn='tanya_kabar_akrab',
        words=['元気', '？'],
        id_t='Sehat?', en_t='You good?',
        sit='Menanyakan kabar teman', sit_en='Asking a friend how they are',
        note='Tanpa か, tanya cukup lewat intonasi naik. Ini sisi akrab dari お元気ですか.',
        note_en='No か here: rising intonation alone asks the question. This is the casual side of お元気ですか.',
    ),
    sent(
        key='jawab_baik', rel='tetangga', fn='jawab_baik',
        words=['おかげさまで', '、', '元気', 'です', '。'],
        id_t='Berkat Anda, saya sehat.', en_t='I have been well, thank you.',
        sit='Menjawab pertanyaan kabar ke tetangga', sit_en='Answering a neighbour who asked how you are',
        note='おかげさまで adalah pembuka baku saat menjawab kabar; arti harfiahnya "berkat Anda".',
        note_en='おかげさまで is the set opener for this answer; literally "thanks to you".',
    ),
    sent(
        key='jawab_biasa', rel='teman_dekat', fn='jawab_biasa',
        words=['まあまあ', 'だ', 'よ', '。'],
        id_t='Lumayan saja.', en_t='So-so.',
        sit='Menjawab kabar ke teman dekat', sit_en='Answering a close friend honestly',
        note='まあまあ menyimpan keluhan tanpa mengeluh; jauh lebih sering dipakai daripada jawaban sangat jujur.',
        note_en='まあまあ admits things are not great without complaining; far more common than a bluntly honest answer.',
    ),
    sent(
        key='balik_tanya', rel='teman_dekat', fn='balik_tanya',
        words=['そっち', 'は', '？'],
        id_t='Kalau kamu?', en_t='What about you?',
        sit='Membalikkan pertanyaan kabar ke teman', sit_en='Turning the question back to a friend',
        note='そっち jauh lebih lazim daripada あなた di percakapan akrab.',
        note_en='そっち is far more natural than あなた in casual speech.',
    ),
    sent(
        key='perkenalan', rel='asing', fn='perkenalan',
        words=['初めまして', '、', 'よろしく', 'お願いします', '。'],
        id_t='Senang berkenalan, mohon bantuannya.', en_t='Nice to meet you, please treat me well.',
        sit='Berkenalan dengan orang baru di tempat kerja', sit_en='Meeting someone new at work',
        note='Dua kalimat ini satu paket: 初めまして membuka, よろしくお願いします menutup.',
        note_en='These two come as a pair: 初めまして opens, よろしくお願いします closes.',
    ),
    sent(
        key='sebut_nama', rel='asing', fn='sebut_nama',
        words=['私', 'の', '名前', 'は', 'アリ', 'です', '。'],
        id_t='Nama saya Ari.', en_t='My name is Ari.',
        sit='Menyebutkan nama kepada orang baru', sit_en='Giving your name to someone new',
        note='私の名前は…です adalah bentuk paling aman; di situasi santai orang sering langsung sebut nama saja.',
        note_en='私の名前は…です is the safest form; in casual settings people often just say the name.',
    ),
    sent(
        key='tanya_nama', rel='asing', fn='tanya_nama',
        words=['お名前', 'は', '何', 'です', 'か', '。'],
        id_t='Nama Anda siapa?', en_t='What is your name?',
        sit='Menanyakan nama orang yang baru dikenal', sit_en='Asking the name of someone you just met',
        note='お di depan 名前 wajib di sini; 名前は何ですか tanpa お terdengar kurang halus.',
        note_en='The お before 名前 matters here; 名前は何ですか without it sounds abrupt.',
    ),
    sent(
        key='minta_bantu', rel='asing', fn='minta_bantu',
        words=['すみません', '、', 'ちょっと', 'お願いします', '。'],
        id_t='Permisi, minta tolong sebentar.', en_t='Excuse me, could I ask a favour?',
        sit='Meminta perhatian orang asing sebelum bertanya', sit_en='Getting a stranger\'s attention before asking',
        note='すみません di awal membuka, お願いします di akhir menutup; keduanya sekaligus terasa paling aman.',
        note_en='すみません opens and お願いします closes; using both is the safest combination.',
    ),
    sent(
        key='terima_kasih_sopan', rel='asing', fn='terima_kasih_sopan',
        words=['ありがとうございます', '。'],
        id_t='Terima kasih.', en_t='Thank you.',
        sit='Berterima kasih kepada orang yang baru dikenal', sit_en='Thanking someone you just met',
        note='ございます menaikkan ありがとう satu tingkat; ini bentuk yang dipakai ke orang asing.',
        note_en='ございます lifts ありがとう one level; this is the form for strangers.',
    ),
    sent(
        key='terima_kasih_akrab', rel='teman', fn='terima_kasih_akrab',
        words=['ありがとう', '、', '助かった', 'よ', '。'],
        id_t='Terima kasih, kamu menyelamatkan saya.', en_t='Thanks, that really helped.',
        sit='Berterima kasih kepada teman', sit_en='Thanking a friend',
        note='Menambah alasan setelah ありがとう membuatnya terdengar tulus, bukan sekadar sopan.',
        note_en='Adding a reason after ありがとう makes it sound sincere rather than merely polite.',
    ),
    sent(
        key='maaf_sopan', rel='tetangga', fn='maaf_sopan',
        words=['ごめんなさい', '、', 'うるさく', 'して', 'しまいました', '。'],
        id_t='Maaf, saya sudah berisik.', en_t='I am sorry, I was being noisy.',
        sit='Meminta maaf ke tetangga karena berisik', sit_en='Apologising to a neighbour about noise',
        note='してしまいました menyatakan penyesalan atas hal yang sudah terjadi; lebih kuat daripada しました.',
        note_en='してしまいました expresses regret over something already done; stronger than しました.',
    ),
    sent(
        key='maaf_akrab', rel='teman_dekat', fn='maaf_akrab',
        words=['ごめん', '、', '待たせた', 'ね', '。'],
        id_t='Maaf, aku buat kamu menunggu.', en_t='Sorry I kept you waiting.',
        sit='Meminta maaf ke teman karena terlambat', sit_en='Apologising to a friend for being late',
        note='待たせた adalah versi akrab dari 待たせました; ね di akhir melunakkan.',
        note_en='待たせた is the casual form of 待たせました; the ね at the end softens it.',
    ),
    sent(
        key='pamit_pulang', rel='rekan', fn='pamit_pulang',
        words=['お先に', '失礼します', '。'],
        id_t='Permisi, saya pulang duluan.', en_t='Excuse me, I am leaving first.',
        sit='Pulang lebih dulu dari kantor', sit_en='Leaving the office before everyone else',
        note='Ini kalimat wajib saat meninggalkan kantor lebih dulu; tanpa ini terasa tidak sopan.',
        note_en='This one is obligatory when leaving the office first; skipping it reads as rude.',
    ),
    sent(
        key='pisah_akrab', rel='teman_dekat', fn='pisah_akrab',
        words=['じゃあ', '、', 'また', '明日', 'ね', '。'],
        id_t='Ya sudah, sampai besok.', en_t='See you tomorrow, then.',
        sit='Berpisah dengan teman setelah bertemu', sit_en='Parting with a friend after hanging out',
        note='また + waktu + ね adalah cara paling umum mengakhiri percakapan akrab.',
        note_en='また + time + ね is the most common way to end a casual conversation.',
    ),
    sent(
        key='selamat_jalan', rel='teman', fn='selamat_jalan',
        words=['気をつけて', '。'],
        id_t='Hati-hati di jalan.', en_t='Take care.',
        sit='Melepas teman yang mau pulang', sit_en='Seeing a friend off',
        note='気をつけて diucapkan saat melepas orang pergi; 気をつけてください lebih sopan.',
        note_en='気をつけて is said as someone leaves; 気をつけてください is more polite.',
    ),
    sent(
        key='selamat_tidur', rel='keluarga', fn='selamat_tidur',
        words=['おやすみなさい', '。'],
        id_t='Selamat tidur.', en_t='Good night.',
        sit='Mengucapkan selamat tidur di rumah', sit_en='Saying good night at home',
        note='Dipakai hanya saat orangnya mau tidur, bukan saat bertemu malam hari.',
        note_en='Only when the person is going to bed, not when meeting them at night.',
    ),
    sent(
        key='bersin', rel='tetangga', fn='bersin',
        words=['大丈夫', 'です', 'か', '。'],
        id_t='Anda tidak apa-apa?', en_t='Are you all right?',
        sit='Menanyakan keadaan orang yang bersin', sit_en='Checking on someone who sneezed',
        note='Di Jepang bersin tidak dijawab salam; yang sopan adalah menanyakan keadaan.',
        note_en='A sneeze is not answered with a blessing in Japan; asking after the person is what is done.',
    ),
]
