#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Waktu: the whole utterance space of time.

This topic exists to answer a specific objection. The first version of the bank had a
"time" frame and produced 168 sentences from it, but they were the same sentence with the
noun changed: asking the hour, being told the hour, asking whether someone is free, making
an appointment and arriving late were all just 時間 slot + verb slot. The topic appeared
covered while most of it was missing.

So the functions below are enumerated first, and they are enumerated the way the need
arrives rather than the way a grammar chapter is ordered: you ask the time, you are told
it, you find out whether the other person is free, you propose a slot, you are told when
is good, you agree, you decline because the day is taken, you say how long the trip takes,
you discover the shop's hours, you say how often you do something, you look up a
timetable, you decide it is too late, you reassure that there is still time, you hurry,
you arrive early, and you cancel. Each of those is a different sentence, and several of
them exist twice because saying it politely and saying it to a friend changes the words
and not just the tone.
"""
from compose import sent, add_words

add_words({
    # times of day and clock forms
    '午前': ('gozen', 'pagi (AM)', 'morning (AM)'),
    '午後': ('gogo', 'siang/sore (PM)', 'afternoon (PM)'),
    '三時': ('sanji', 'jam tiga', 'three o\'clock'),
    '八時': ('hachiji', 'jam delapan', 'eight o\'clock'),
    '十時': ('juuji', 'jam sepuluh', 'ten o\'clock'),
    '何時ごろ': ('nanji goro', 'sekitar jam berapa', 'about what time'),
    '五分': ('gofun', 'lima menit', 'five minutes'),
    '三十分': ('sanjuppun', 'tiga puluh menit', 'thirty minutes'),
    '十分': ('juppun', 'sepuluh menit', 'ten minutes'),
    '一時間': ('ichijikan', 'satu jam', 'one hour'),
    # days and calendar
    '日': ('hi', 'hari', 'day'),
    '月曜': ('getsuyoubi', 'Senin', 'Monday'),
    '火曜': ('kayoubi', 'Selasa', 'Tuesday'),
    '土曜日': ('doyoubi', 'Sabtu', 'Saturday'),
    '週末': ('shuumatsu', 'akhir pekan', 'weekend'),
    '週': ('shuu', 'minggu (pekan)', 'week'),
    '三回': ('sankai', 'tiga kali', 'three times'),
    '前半': ('zenhan', 'paruh pertama', 'the first half'),
    '今度': ('kondo', 'lain kali / kali ini', 'next time / this time'),
    # time-related nouns
    'お時間': ('ojikan', 'waktu (sopan)', 'time (polite)'),
    'ご都合': ('gotsugou', 'kesediaan waktu (sopan)', 'availability (polite)'),
    '予約時間': ('yoyaku jikan', 'waktu pemesanan', 'reservation time'),
    # adverbs and expressions of timing
    'ほど': ('hodo', 'sekitar / kira-kira', 'about / approximately'),
    'ぐらい': ('guirai', 'kira-kira', 'about / roughly'),
    '早めに': ('hayame ni', 'lebih awal', 'a little early'),
    '急いでください': ('isoide kudasai', 'tolong bergegas', 'please hurry'),
    'あいにく': ('ainiku', 'sayangnya (kurang beruntung)', 'unfortunately'),
    '無理': ('muri', 'tidak mungkin / tidak bisa', 'impossible / cannot'),
    'ない': ('nai', 'tidak ada (biasa)', 'there is not (plain)'),
    'しよう': ('shiyou', 'ayo lakukan (biasa)', 'let us do (plain)'),
    '大丈夫だよ': ('daijoubu da yo', 'tidak apa-apa kok', 'it is fine, really'),
    '飲んでいた': ('nonde ita', 'sedang minum (biasa, lampau)', 'was drinking (plain past)'),
    'しまいました': ('shimaimashita', 'terlanjur / sudah terjadi', 'ended up doing (regret)'),
    # verbs
    '教えて': ('oshiete', 'memberi tahu (bentuk -te)', 'tell (te-form)'),
    '待たせて': ('matasete', 'membuat menunggu (bentuk -te)', 'make someone wait (te-form)'),
    'かかります': ('kakarimasu', 'memerlukan (waktu/biaya)', 'takes (time/money)'),
    '入っています': ('haitte imasu', 'sudah terisi (ada acara)', 'is already taken (has a plan)'),
    '遅れそうです': ('okure sou desu', 'sepertinya akan terlambat', 'looks like I will be late'),
    '待たせてしまいました': ('matasete shimaimashita', 'sudah membuat menunggu', 'kept you waiting (regretful)'),
    '行けなくなりました': ('ikenaku narimashita', 'jadi tidak bisa datang', 'can no longer come'),
    '見てから': ('mite kara', 'setelah melihat', 'after looking at'),
    '決めます': ('kimemasu', 'memutuskan (sopan)', 'decide (polite)'),
    '着いた': ('tsuita', 'tiba (biasa, lampau)', 'arrived (plain, past)'),
    '飲んでいました': ('nonde imashita', 'sedang minum (lampau)', 'was drinking'),
    '出かける': ('dekakeru', 'berangkat / keluar rumah (biasa)', 'go out (plain)'),
    '前に': ('mae ni', 'sebelum', 'before'),
    '空いてる': ('aiteru', 'kosong / luang (akrab)', 'free (casual)'),
}, where='t01_waktu')

# Surfaces this topic keeps as ONE word although they are long, with the reason. The two
# verbs here are single inflected words, not phrases; お時間 and ご都合 are the polite
# noun forms and splitting the お/ご off would teach a prefix that is not a word.
SINGLE_WORDS = {
    '入っています': 'satu kata kerja terinfleksi (入る + ています), bukan frasa',
    '待っています': 'satu kata kerja terinfleksi (待つ + ています), bukan frasa',
    '急いでください': 'permintaan satu kesatuan; 急いで + ください sudah dipisah di tempat lain',
    'お時間': 'bentuk sopan dari 時間; お bukan kata tersendiri',
    'ご都合': 'bentuk sopan dari 都合; ご bukan kata tersendiri',
    '遅れそうです': 'satu predikat (遅れる + そうだ), bukan frasa',
    '行けなくなりました': 'satu predikat (行ける + なくなる + ました), bukan frasa',
}

FUNCTIONS = {
    'tanya_jam': 'menanyakan jam berapa sekarang',
    'jawab_jam': 'memberitahu jam',
    'tanya_jam_kira': 'menanyakan sekitar jam berapa',
    'tanya_luang_sopan': 'menanyakan apakah ada waktu, dengan sopan',
    'tanya_luang_akrab': 'menanyakan apakah luang, ke teman',
    'tawar_waktu': 'menawarkan waktu untuk bertemu',
    'tanya_waktu_cocok': 'menanyakan waktu yang cocok',
    'setuju_waktu': 'menyetujui waktu yang ditawarkan',
    'tolak_waktu': 'menolak karena waktu itu sudah terisi',
    'tunggu_di_tempat': 'mengatakan akan menunggu di tempat',
    'beritahu_terlambat': 'memberi tahu bahwa akan terlambat',
    'minta_maaf_terlambat': 'meminta maaf karena membuat menunggu',
    'batalkan_janji': 'membatalkan janji',
    'durasi_perjalanan': 'mengatakan berapa lama perjalanan',
    'jam_buka_tutup': 'menyebutkan jam buka dan tutup',
    'frekuensi': 'mengatakan seberapa sering melakukan sesuatu',
    'lihat_jadwal': 'melihat jadwal dulu sebelum memutuskan',
    'sudah_telat': 'mengatakan sudah terlambat, lain kali saja',
    'masih_ada_waktu': 'menenangkan bahwa masih ada waktu',
    'minta_cepat': 'meminta bergegas karena waktu sempit',
    'tiba_lebih_awal': 'menceritakan sudah tiba lebih awal',
    'urus_sendiri': 'menjelaskan kesibukan lewat cara yang halus',
    'ingatkan_besok': 'berjanji menghubungi sebelum berangkat',
}

SENTENCES = [
    sent(
        key='tanya_jam', rel='orang_asing', fn='tanya_jam',
        words=['すみません', '、', '今', '何時', 'です', 'か', '。'],
        id_t='Permisi, sekarang jam berapa?', en_t='Excuse me, what time is it now?',
        sit='Menanyakan jam ke orang di jalan', sit_en='Asking a passer-by for the time',
        note='今何時ですか adalah bentuk lengkap yang aman; 何時ですか saja juga lazim.',
        note_en='今何時ですか is the safe full form; 何時ですか alone is also common.',
    ),
    sent(
        key='jawab_jam', rel='orang_asing', fn='jawab_jam',
        words=['三時', '半', 'です', '。'],
        id_t='Jam setengah empat.', en_t='It is half past three.',
        sit='Menjawab pertanyaan jam', sit_en='Answering someone asking the time',
        note='半 setelah jam berarti lewat tiga puluh menit, jadi 三時半 adalah 3.30.',
        note_en='半 after the hour means thirty minutes past, so 三時半 is 3.30.',
    ),
    sent(
        key='tanya_jam_kira', rel='pelayan', fn='tanya_jam_kira',
        words=['予約時間', 'は', '何時ごろ', 'です', 'か', '。'],
        id_t='Jam berapa kira-kira waktu pemesanannya?', en_t='About what time is the reservation?',
        sit='Menanyakan perkiraan jam di meja resepsionis', sit_en='Asking the reception desk for an approximate time',
        note='ごろ menandai perkiraan; tanpa ごろ pertanyaannya menuntut jam yang pasti.',
        note_en='ごろ marks an approximation; without it the question demands an exact time.',
    ),
    sent(
        key='tanya_luang_sopan', rel='atasan', fn='tanya_luang_sopan',
        words=['明日', 'の', '午後', '、', 'お時間', 'あります', 'か', '。'],
        id_t='Besok siang, apakah Anda ada waktu?', en_t='Do you have time tomorrow afternoon?',
        sit='Menanyakan kesediaan waktu atasan', sit_en='Asking a superior for their time',
        note='お時間 bentuk sopan dari 時間; ke atasan ini yang dipakai, bukan 時間ある.',
        note_en='お時間 is the polite form of 時間; with a superior this is the form, not 時間ある.',
    ),
    sent(
        key='tanya_luang_akrab', rel='teman_dekat', fn='tanya_luang_akrab',
        words=['明日', '、', '空いてる', '？'],
        id_t='Besok, luang?', en_t='Are you free tomorrow?',
        sit='Menanyakan kesediaan waktu teman', sit_en='Checking whether a friend is free',
        note='空いてる adalah bentuk akrab dari 空いています; dipakai untuk waktu maupun tempat.',
        note_en='空いてる is the casual form of 空いています; it covers both time and space.',
    ),
    sent(
        key='tawar_waktu', rel='rekan', fn='tawar_waktu',
        words=['土曜日', 'の', '三時', 'は', 'どう', 'です', 'か', '。'],
        id_t='Sabtu jam tiga bagaimana?', en_t='How about Saturday at three?',
        sit='Menawarkan waktu bertemu ke rekan kerja', sit_en='Proposing a time to a colleague',
        note='どうですか menawarkan tanpa menekan; いかがですか lebih formal lagi.',
        note_en='どうですか offers without pressing; いかがですか is even more formal.',
    ),
    sent(
        key='tanya_waktu_cocok', rel='atasan', fn='tanya_waktu_cocok',
        words=['ご都合', 'の', 'いい', '時間', 'を', '教えて', 'ください', '。'],
        id_t='Tolong beri tahu waktu yang cocok untuk Anda.', en_t='Please let me know a time that suits you.',
        sit='Meminta atasan memilih waktunya sendiri', sit_en='Letting a superior pick the time',
        note='ご都合のいい… adalah cara menyerahkan pilihan waktu ke pihak yang lebih senior.',
        note_en='ご都合のいい… is how you hand the choice of time to the senior party.',
    ),
    sent(
        key='setuju_waktu', rel='rekan', fn='setuju_waktu',
        words=['その', '時間', 'で', '大丈夫', 'です', '。'],
        id_t='Waktu itu tidak masalah.', en_t='That time works for me.',
        sit='Menyetujui waktu yang ditawarkan', sit_en='Agreeing to a proposed time',
        note='その時間で大丈夫です adalah bentuk persetujuan yang netral dan sopan.',
        note_en='その時間で大丈夫です is the neutral, polite way to accept.',
    ),
    sent(
        key='tolak_waktu', rel='rekan', fn='tolak_waktu',
        words=['あいにく', '、', 'その', '日', 'は', '予定', 'が', '入っています', '。'],
        id_t='Sayangnya, hari itu saya sudah ada acara.', en_t='Unfortunately I already have plans that day.',
        sit='Menolak waktu karena sudah ada acara', sit_en='Declining a time because the day is taken',
        note='あいにく membuka penolakan, 予定が入っています memberi alasan tanpa menyebut detail.',
        note_en='あいにく opens the refusal and 予定が入っています gives a reason without details.',
    ),
    sent(
        key='tunggu_di_tempat', rel='rekan', fn='tunggu_di_tempat',
        words=['改札', 'の', '前', 'で', '待っています', '。'],
        id_t='Saya menunggu di depan gerbang tiket.', en_t='I will be waiting in front of the ticket gate.',
        sit='Menentukan titik tunggu di stasiun', sit_en='Agreeing on a meeting point at the station',
        note='待っています di sini berarti "akan menunggu", bukan "sedang menunggu", karena waktunya belum tiba.',
        note_en='待っています here means "will be waiting", not "am waiting", because the time has not come yet.',
    ),
    sent(
        key='beritahu_terlambat', rel='rekan', fn='beritahu_terlambat',
        words=['すみません', '、', '五分', 'ほど', '遅れそうです', '。'],
        id_t='Maaf, sepertinya saya terlambat sekitar lima menit.', en_t='Sorry, I think I will be about five minutes late.',
        sit='Mengabari akan terlambat sedikit', sit_en='Warning that you will be slightly late',
        note='そうです menyatakan perkiraan dari tanda yang terlihat, jadi kalimatnya belum pasti dan itu justru sopan.',
        note_en='そうです reports a guess from visible signs, so the sentence stays uncertain, which is what makes it polite.',
    ),
    sent(
        key='minta_maaf_terlambat', rel='rekan', fn='minta_maaf_terlambat',
        words=['遅れて', 'すみません', '、', '待たせて', 'しまいました', '。'],
        id_t='Maaf saya terlambat, saya sudah membuat Anda menunggu.', en_t='Sorry I am late, I kept you waiting.',
        sit='Meminta maaf setelah benar-benar terlambat', sit_en='Apologising once you actually arrive late',
        note='待たせてしまいました memakai bentuk kausatif plus しまいました, jadi mengakui akibatnya pada orang lain.',
        note_en='待たせてしまいました uses the causative with しまいました, so it owns the effect on the other person.',
    ),
    sent(
        key='batalkan_janji', rel='rekan', fn='batalkan_janji',
        words=['明日', 'の', '約束', 'です', 'が', '、', '行けなくなりました', '。'],
        id_t='Soal janji besok, saya jadi tidak bisa datang.', en_t='About tomorrow, I can no longer make it.',
        sit='Membatalkan janji dengan sopan', sit_en='Cancelling an appointment politely',
        note='ですが sebelum berita buruk berfungsi seperti "maaf, tapi" dalam bahasa Indonesia.',
        note_en='ですが before bad news works like a spoken "sorry, but".',
    ),
    sent(
        key='durasi_perjalanan', rel='orang_asing', fn='durasi_perjalanan',
        words=['駅', 'まで', '三十分', 'ぐらい', 'かかります', '。'],
        id_t='Ke stasiun perlu sekitar tiga puluh menit.', en_t='It takes about thirty minutes to the station.',
        sit='Menjelaskan lama perjalanan ke stasiun', sit_en='Explaining how long the trip to the station takes',
        note='Kata kerja かかります dipakai untuk waktu maupun biaya; pelakunya ditandai まで atau から.',
        note_en='かかります covers both time and money; the endpoint takes まで or から.',
    ),
    sent(
        key='jam_buka_tutup', rel='pelayan', fn='jam_buka_tutup',
        words=['この', '店', 'は', '十時', 'から', '八時', 'まで', 'です', '。'],
        id_t='Toko ini dari jam sepuluh sampai jam delapan.', en_t='This shop is open from ten to eight.',
        sit='Menanyakan atau menyebutkan jam buka toko', sit_en='Stating a shop\'s opening hours',
        note='から…まで satu paket; まで di sini berarti "sampai", bukan "sampai dengan" yang menuntut kata kerja.',
        note_en='から…まで come as a pair; まで here means "until", not the "as far as" that needs a verb.',
    ),
    sent(
        key='frekuensi', rel='rekan', fn='frekuensi',
        words=['週', 'に', '三回', '、', '日本語', 'を', '勉強します', '。'],
        id_t='Seminggu tiga kali saya belajar bahasa Jepang.', en_t='I study Japanese three times a week.',
        sit='Menceritakan seberapa sering belajar', sit_en='Saying how often you study',
        note='Polanya 期間 + に + 回数: 週に三回, 月に一度. に tidak boleh hilang.',
        note_en='The pattern is period + に + count: 週に三回, 月に一度. The に cannot be dropped.',
    ),
    sent(
        key='lihat_jadwal', rel='rekan', fn='lihat_jadwal', long=True,
        words=['電車', 'の', '時刻表', 'を', '見てから', '決めます', '。'],
        id_t='Saya lihat jadwal kereta dulu, baru memutuskan.', en_t='I will check the train timetable first, then decide.',
        sit='Menunda keputusan sampai melihat jadwal', sit_en='Putting off a decision until you see the timetable',
        note='てから menegaskan urutan: melihat dulu, memutuskan kemudian. Bukan dua hal yang berdiri sendiri.',
        note_en='てから insists on the order: look first, decide after. The two are not independent facts.',
    ),
    sent(
        key='sudah_telat', rel='teman_dekat', fn='sudah_telat', long=True,
        words=['もう', '遅い', 'から', '、', 'また', '今度', 'に', 'しよう', '。'],
        id_t='Karena sudah malam, lain kali saja ya.', en_t='It is late already, so let us do it another time.',
        sit='Mengakhiri pertemuan karena sudah malam', sit_en='Winding up a meeting because it is late',
        note='Ke teman dekat, しよう menggantikan しましょう; から di sini wajar karena sudah akrab.',
        note_en='With a close friend, しよう replaces しましょう; から is normal at this distance.',
    ),
    sent(
        key='masih_ada_waktu', rel='teman_dekat', fn='masih_ada_waktu', long=True,
        words=['まだ', '時間', 'が', 'ある', 'から', '、', 'ゆっくり', 'で', '大丈夫', 'だ', 'よ', '。'],
        id_t='Masih ada waktu, jadi santai saja.', en_t='There is still time, so take it easy.',
        sit='Menenangkan teman yang merasa terburu-buru', sit_en='Reassuring a friend who feels rushed',
        note='から di sini memberi izin, bukan alasan: "karena masih ada waktu, jadi tidak perlu cepat".',
        note_en='から here grants permission rather than giving a cause: "there is time, so no need to rush".',
    ),
    sent(
        key='minta_cepat', rel='rekan', fn='minta_cepat', long=True,
        words=['時間', 'が', 'ない', 'から', '、', '急いで', 'ください', '。'],
        id_t='Karena tidak ada waktu, tolong bergegas.', en_t='We have no time, so please hurry.',
        sit='Meminta rekan bergegas', sit_en='Asking a colleague to hurry',
        note='急いでください untuk permintaan; 急ぎましょう kalau Anda ikut bergegas juga.',
        note_en='急いでください asks the other person; use 急ぎましょう if you are hurrying too.',
    ),
    sent(
        key='tiba_lebih_awal', rel='teman', fn='tiba_lebih_awal', long=True,
        words=['早めに', '着いた', 'から', '、', '駅', 'の', '近く', 'で', 'コーヒー', 'を', '飲んでいた', '。'],
        id_t='Karena saya datang lebih awal, saya minum kopi dulu di dekat stasiun.', en_t='I arrived early, so I was having coffee near the station.',
        sit='Menceritakan apa yang dilakukan sambil menunggu', sit_en='Filling the time while waiting',
        note='飲んでいた adalah bentuk sedang-lampau akrab: kegiatan itu berlangsung saat orang lain datang.',
        note_en='飲んでいた is the casual past progressive: the activity was already going on when the other arrived.',
    ),
    sent(
        key='urus_sendiri', rel='atasan', fn='urus_sendiri', long=True,
        words=['来週', 'は', '出張', 'が', 'ある', 'ので', '、', '月曜', 'と', '火曜', 'は', '無理', 'です', '。'],
        id_t='Minggu depan ada perjalanan dinas, jadi Senin dan Selasa tidak bisa.', en_t='I have a business trip next week, so Monday and Tuesday are out.',
        sit='Menolak dua hari sekaligus dengan alasan', sit_en='Declining two days at once with a reason',
        note='無理です menolak dengan jelas tapi tidak kasar; できません lebih formal, だめ terdengar kasar.',
        note_en='無理です refuses clearly without being rude; できません is more formal and だめ sounds blunt.',
    ),
    sent(
        key='ingatkan_besok', rel='rekan', fn='ingatkan_besok', long=True,
        words=['明日', 'の', '朝', '、', '出かける', '前に', '連絡します', '。'],
        id_t='Besok pagi, sebelum berangkat, saya akan menghubungi.', en_t='I will get in touch tomorrow morning before leaving.',
        sit='Berjanji menghubungi sebelum berangkat', sit_en='Promising to make contact before setting off',
        note='前に menuntut kata kerja bentuk kamus di depannya: 出かける前に, bukan 出かけます前に.',
        note_en='前に requires the dictionary form before it: 出かける前に, never 出かけます前に.',
    ),
]
