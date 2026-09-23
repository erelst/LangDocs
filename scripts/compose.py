#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""The engine the hand-written sentences are built with, plus the surface lexicon.

Why this file exists
--------------------
The bank used to be assembled by permuting templates: 57 frames crossed with word
lists, producing 1,494 sentences. The user's verdict, after reading them, was that
the topic changed but the sentence did not -- "コンビニで傘を買いました" and
"薬局で眼鏡を買いました" are the same sentence twice with the noun swapped, and the long
ones read like clauses bolted together with それから rather than one thought.

So the bank is now WRITTEN, sentence by sentence, and this file exists so that writing
a sentence does not mean typing its romaji and its per-word glosses by hand. It supplies:

  LEX       one line per Japanese surface form: kanji, romaji, gloss_id, gloss_en.
            A word is written once and is correct everywhere it appears, so the romaji
            cannot drift between two sentences that share a word. Topic modules add
            their own vocabulary with add_words() before they build their sentences.
  sent()    turns a list of surfaces into a sentence record: kanji line, romaji line,
            tokens for the word-by-word panel, with punctuation handled.
  assemble()  collects the topic modules and returns the bank in reading order.

One topic, not one sentence
---------------------------
A topic is not a single sentence. "Waktu" (time) has a whole space of utterances that
people actually produce: asking the time, telling it, asking whether someone is free,
making an appointment, cancelling one, arriving late, saying how long something takes,
saying how often it happens, making a plan, refusing a day politely, asking "when is
good for you", and the same again said casually to a friend. Each topic module declares
that space as FUNCTIONS and must fill every one of them, so coverage is a thing the
build can check instead of a thing the author remembers to do. See uniqueness.py.

What must stay unique is the PATTERN, not the count
--------------------------------------------------
Two sentences on one topic may not be the same frame with a noun swapped. 1,494 of the
old bank's 1,504 sentences were exactly that, and the user's verdict was that the topic
changed while the sentence did not. uniqueness.py therefore reduces every sentence to
its particle skeleton plus its predicate and refuses to ship a skeleton that appears
too often, so "same sentence, different noun" fails the build.

What sent() guarantees, and what it does not
--------------------------------------------
It guarantees the mechanical things that are tedious and easy to get wrong: every word
is in the lexicon, the kanji line contains exactly the words that are glossed, the
romaji line is spaced the way the data convention spaces it, and punctuation attaches
to the word before it instead of floating as its own token.

It does NOT check whether the Japanese is any good. Nothing here can: a sentence is
correct or not as a whole. That judgement is the author's, which is why every sentence
in situations/ was written and read one at a time rather than generated. The mechanical
checks live in check_sentences.py; the distinctness checks live in uniqueness.py.

Punctuation
-----------
A sentence is given as a flat list of surfaces, punctuation included, e.g.

    ['すみません', '、', 'ちょっと', '待って', 'ください', '。']

Punctuation is merged into the word before it, so ください。 is one atomic span and can
never be pushed to the next line away from its word. The romaji line receives the
punctuation as ", " style spacing. The gloss cell for that word shows the word WITHOUT
the punctuation, because the comma belongs to the sentence, not to the word's meaning.
"""
import importlib
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

# --------------------------------------------------------------------- punctuation
# Surface -> (romaji, whether a space goes before it in the romaji line)
PUNCT = {
    '、': (',', False),
    '。': ('.', False),
    '！': ('!', False),
    '？': ('?', False),
    '・': (' ', True),
    '…': ('...', False),
}
PUNCT_CHARS = ''.join(PUNCT)

# Connectives that make a longer sentence ONE thought rather than two thoughts in a
# trench coat. A long sentence must carry at least one of these; stringing clauses with
# それから / そのあと / そして is what the user rejected (clauses "dipaksa disambungkan
# dengan kata penghubung"), so uniqueness.py fails a long sentence that has none of the
# real ones. Kept here, next to the data that has to satisfy it.
#
# Both the kanji and the kana spelling of a connective are listed, because the bank writes
# 前に as kanji and てから glued to its verb: matching only the kana form reported a sentence
# that does carry a relation as if it carried none.
RELATION_MARKERS = {'から', 'ので', 'けど', 'けれど', 'たら', 'とき', 'ながら', 'ため',
                    'し', 'と', 'てから', 'あとで', 'まえに', '前に', 'あと', 'けど',
                    'けれども', 'のに'}
SEQUENCE_MARKERS = {'それから', 'そのあと', 'そして', '次に', 'その後'}

# ---------------------------------------------------------------- the surface lexicon
# One entry per surface form that appears in a sentence: kanji form -> romaji, gloss_id,
# gloss_en. Inflected forms are their own entries on purpose (行きます and 行った are
# separate surfaces with separate glosses), because that is what the card shows and what
# a learner reads.
#
# Romanisation follows the convention already used by the curated sentences: Hepburn,
# long vowels written out (gakkou, suupaa, koohii), は as wa and へ as e when they are
# particles, を as o.
LEX = {}


def add_words(words, where=''):
    """Register extra surface forms from a topic module, refusing silent redefinitions.

    A topic module calls this at the top, before it builds its SENTENCES, because sent()
    resolves each surface through LEX as the sentences are constructed. Two modules that
    gloss the same surface differently are a real inconsistency, so it raises instead of
    letting whichever module imported last decide what the word means.
    """
    for surface, entry in words.items():
        entry = tuple(entry)
        if len(entry) != 3:
            raise ValueError(f'{where}: {surface!r} needs (romaji, gloss_id, gloss_en)')
        if surface in LEX and LEX[surface] != entry:
            raise ValueError(
                f'{where}: {surface!r} is already in the lexicon as {LEX[surface]}, '
                f'cannot redefine it as {entry}')
        LEX[surface] = entry


def w(kanji, romaji, gloss_id, gloss_en):
    """Register one surface form, refusing to overwrite a different reading.

    This bit me once: the counter 人 (nin) and the noun 人 (hito) are written identically, so
    whichever list came later silently won and あの人は read "ano nin wa" on every card. A
    dictionary key that quietly loses data is worse than a crash, so redefining a surface
    with a different romaji is an error. Re-writing it identically is fine, which keeps the
    lists free to be reorganised.
    """
    entry = (romaji, gloss_id, gloss_en)
    prior = LEX.get(kanji)
    if prior is not None and prior != entry:
        raise ValueError(
            f'the lexicon already has {kanji!r} as {prior}; refusing to overwrite it with '
            f'{entry}. If these are two different words, store them under different keys.')
    LEX[kanji] = entry


# -- particles and copulas
for _a in [
    ('は', 'wa', 'partikel topik (menandai yang dibicarakan)', 'topic particle'),
    ('が', 'ga', 'partikel subjek', 'subject particle'),
    ('を', 'o', 'partikel objek', 'object particle'),
    ('に', 'ni', 'partikel arah/waktu (ke, pada)', 'direction/time particle (to, at)'),
    ('で', 'de', 'partikel tempat alat/cara (di, dengan)', 'location/means particle (at, by)'),
    ('へ', 'e', 'partikel arah (ke)', 'toward (particle)'),
    ('と', 'to', 'partikel dan / bersama', 'and / with (particle)'),
    ('も', 'mo', 'partikel juga', 'also (particle)'),
    ('の', 'no', 'partikel pemilik (dari, milik)', 'possessive particle'),
    ('から', 'kara', 'partikel dari / karena', 'from / because (particle)'),
    ('まで', 'made', 'partikel sampai', 'until / as far as (particle)'),
    ('より', 'yori', 'partikel daripada', 'than (particle)'),
    ('だけ', 'dake', 'hanya', 'only'),
    ('しか', 'shika', 'hanya (dengan kata negatif)', 'only (with a negative)'),
    ('なら', 'nara', 'kalau begitu / kalau', 'if / as for'),
    ('けど', 'kedo', 'tapi / meskipun', 'but / although'),
    ('けれど', 'keredo', 'tapi (lebih halus)', 'but (softer)'),
    ('ので', 'node', 'karena (alasan)', 'because (reason)'),
    ('ね', 'ne', 'partikel minta persetujuan (ya kan)', 'agreement particle (right?)'),
    ('よ', 'yo', 'partikel penegas (memberi tahu)', 'emphasis particle (you know)'),
    ('か', 'ka', 'partikel tanya', 'question particle'),
    ('かな', 'kana', 'mungkin / ya kan (ragu)', 'I wonder (soft uncertainty)'),
    ('でしょう', 'deshou', 'mungkin / kan (sopan, menduga)', 'probably (polite guess)'),
    ('だろう', 'darou', 'mungkin / kan (biasa, menduga)', 'probably (plain guess)'),
    ('です', 'desu', 'adalah (sopan)', 'is (polite copula)'),
    ('だ', 'da', 'adalah (bentuk biasa)', 'is (plain copula)'),
    ('じゃない', 'janai', 'bukan (biasa)', 'is not (plain)'),
    ('ではない', 'dewa nai', 'bukan (tegas)', 'is not (emphatic)'),
]:
    w(*_a)

# -- pronouns and demonstratives
for _a in [
    ('私', 'watashi', 'saya (netral, sopan)', 'I (neutral, polite)'),
    ('僕', 'boku', 'saya (pria, akrab)', 'I (male, casual)'),
    ('あなた', 'anata', 'Anda', 'you (polite)'),
    ('これ', 'kore', 'ini', 'this'),
    ('それ', 'sore', 'itu', 'that'),
    ('あれ', 'are', 'itu (jauh)', 'that over there'),
    ('ここ', 'koko', 'di sini', 'here'),
    ('そこ', 'soko', 'di situ', 'there'),
    ('あそこ', 'asoko', 'di sana', 'over there'),
    ('この', 'kono', 'ini (di depan kata benda)', 'this (before a noun)'),
    ('その', 'sono', 'itu (di depan kata benda)', 'that (before a noun)'),
    ('あの', 'ano', 'itu (jauh, di depan kata benda)', 'that over there (before a noun)'),
    ('どこ', 'doko', 'di mana', 'where'),
    ('どちら', 'dochira', 'sebelah mana (sopan)', 'which way (polite)'),
    ('何', 'nani', 'apa', 'what'),
    ('誰', 'dare', 'siapa', 'who'),
    ('いつ', 'itsu', 'kapan', 'when'),
    ('どう', 'dou', 'bagaimana', 'how'),
    ('どうして', 'doushite', 'kenapa', 'why'),
    ('いくら', 'ikura', 'berapa (harga)', 'how much'),
    ('いくつ', 'ikutsu', 'berapa (jumlah)', 'how many'),
    ('どんな', 'donna', 'yang seperti apa', 'what kind of'),
    ('みんな', 'minna', 'semuanya / orang banyak', 'everyone'),
    ('自分', 'jibun', 'diri sendiri', 'oneself'),
]:
    w(*_a)

# -- people and relations
for _a in [
    ('友達', 'tomodachi', 'teman', 'friend'),
    ('友だち', 'tomodachi', 'teman', 'friend'),
    ('家族', 'kazoku', 'keluarga', 'family'),
    ('母', 'haha', 'ibu (saya)', 'my mother'),
    ('父', 'chichi', 'ayah (saya)', 'my father'),
    ('兄', 'ani', 'kakak laki-laki (saya)', 'my older brother'),
    ('姉', 'ane', 'kakak perempuan (saya)', 'my older sister'),
    ('弟', 'otouto', 'adik laki-laki', 'younger brother'),
    ('妹', 'imouto', 'adik perempuan', 'younger sister'),
    ('お母さん', 'okaasan', 'ibu (orang lain / panggilan)', 'mother (someone else\'s / address)'),
    ('奥さん', 'okusan', 'istri orang lain', 'someone else\'s wife'),
    ('子供', 'kodomo', 'anak', 'child'),
    ('赤ちゃん', 'akachan', 'bayi', 'baby'),
    ('先生', 'sensei', 'guru / dokter', 'teacher / doctor'),
    ('学生', 'gakusei', 'mahasiswa / pelajar', 'student'),
    ('生徒', 'seito', 'murid', 'pupil'),
    ('会社員', 'kaishain', 'karyawan', 'company employee'),
    ('社長', 'shachou', 'direktur', 'company president'),
    ('同僚', 'douryou', 'rekan kerja', 'colleague'),
    ('部長', 'buchou', 'kepala bagian', 'department head'),
    ('店員', 'tenin', 'petugas toko', 'shop staff'),
    ('駅員', 'ekiin', 'petugas stasiun', 'station staff'),
    ('医者', 'isha', 'dokter', 'doctor'),
    ('看護師', 'kangoshi', 'perawat', 'nurse'),
    ('警官', 'keikan', 'polisi', 'police officer'),
    ('運転手', 'untenshu', 'pengemudi', 'driver'),
    ('客', 'kyaku', 'tamu / pelanggan', 'guest / customer'),
    ('人', 'hito', 'orang', 'person'),
    ('皆さん', 'minasan', 'semuanya (sopan)', 'everyone (polite)'),
    ('彼', 'kare', 'dia (pria)', 'he / boyfriend'),
    ('彼女', 'kanojo', 'dia (wanita)', 'she / girlfriend'),
    ('お客さん', 'okyakusan', 'pelanggan', 'customer'),
    ('近所の人', 'kinjou no hito', 'orang sekampung', 'neighbour'),
]:
    w(*_a)

# -- places
for _a in [
    ('駅', 'eki', 'stasiun', 'station'),
    ('コンビニ', 'konbini', 'minimarket', 'convenience store'),
    ('スーパー', 'suupaa', 'supermarket', 'supermarket'),
    ('病院', 'byouin', 'rumah sakit', 'hospital'),
    ('学校', 'gakkou', 'sekolah', 'school'),
    ('会社', 'kaisha', 'kantor', 'company'),
    ('銀行', 'ginkou', 'bank', 'bank'),
    ('郵便局', 'yuubinkyoku', 'kantor pos', 'post office'),
    ('公園', 'kouen', 'taman', 'park'),
    ('図書館', 'toshokan', 'perpustakaan', 'library'),
    ('レストラン', 'resutoran', 'restoran', 'restaurant'),
    ('カフェ', 'kafe', 'kafe', 'cafe'),
    ('喫茶店', 'kissaten', 'kedai kopi', 'coffee shop'),
    ('店', 'mise', 'toko', 'shop'),
    ('本屋', 'hon\'ya', 'toko buku', 'bookshop'),
    ('薬局', 'yakkyoku', 'apotek', 'pharmacy'),
    ('デパート', 'depaato', 'department store', 'department store'),
    ('映画館', 'eigakan', 'bioskop', 'cinema'),
    ('空港', 'kuukou', 'bandara', 'airport'),
    ('ホテル', 'hoteru', 'hotel', 'hotel'),
    ('大学', 'daigaku', 'universitas', 'university'),
    ('教室', 'kyoushitsu', 'ruang kelas', 'classroom'),
    ('会議室', 'kaigishitsu', 'ruang rapat', 'meeting room'),
    ('事務所', 'jimusho', 'kantor (biro)', 'office'),
    ('受付', 'uketsuke', 'meja resepsionis', 'reception desk'),
    ('家', 'ie', 'rumah', 'house'),
    ('うち', 'uchi', 'rumah (saya)', 'home'),
    ('部屋', 'heya', 'kamar', 'room'),
    ('台所', 'daidokoro', 'dapur', 'kitchen'),
    ('トイレ', 'toire', 'toilet', 'toilet'),
    ('席', 'seki', 'kursi / tempat duduk', 'seat'),
    ('道', 'michi', 'jalan', 'road'),
    ('交差点', 'kousaten', 'persimpangan', 'intersection'),
    ('角', 'kado', 'sudut (jalan)', 'corner'),
    ('近く', 'chikaku', 'dekat', 'nearby'),
    ('隣', 'tonari', 'sebelah', 'next to'),
    ('前', 'mae', 'depan', 'front'),
    ('後ろ', 'ushiro', 'belakang', 'behind'),
    ('中', 'naka', 'dalam', 'inside'),
    ('上', 'ue', 'atas', 'on / above'),
    ('下', 'shita', 'bawah', 'under'),
    ('出口', 'deguchi', 'jalan keluar', 'exit'),
    ('入口', 'iriguchi', 'jalan masuk', 'entrance'),
    ('町', 'machi', 'kota kecil / kampung', 'town'),
    ('国', 'kuni', 'negara', 'country'),
    ('海', 'umi', 'laut', 'sea'),
    ('山', 'yama', 'gunung', 'mountain'),
    ('川', 'kawa', 'sungai', 'river'),
]:
    w(*_a)

# -- transport
for _a in [
    ('電車', 'densha', 'kereta', 'train'),
    ('地下鉄', 'chikatetsu', 'kereta bawah tanah', 'subway'),
    ('バス', 'basu', 'bus', 'bus'),
    ('タクシー', 'takushii', 'taksi', 'taxi'),
    ('自転車', 'jitensha', 'sepeda', 'bicycle'),
    ('車', 'kuruma', 'mobil', 'car'),
    ('飛行機', 'hikouki', 'pesawat', 'airplane'),
    ('新幹線', 'shinkansen', 'shinkansen', 'bullet train'),
    ('切符', 'kippu', 'tiket', 'ticket'),
    ('改札', 'kaisatsu', 'gerbang tiket', 'ticket gate'),
    ('乗り場', 'noriba', 'tempat naik', 'boarding point'),
    ('ホーム', 'hoomu', 'peron', 'platform'),
    ('時刻表', 'jikokuhyou', 'jadwal keberangkatan', 'timetable'),
    ('特急', 'tokkyuu', 'kereta ekspres', 'limited express'),
    ('各駅停車', 'kakuekiteisha', 'kereta berhenti tiap stasiun', 'local train'),
    ('乗り換え', 'norikae', 'ganti kereta', 'transfer'),
    ('荷物', 'nimotsu', 'barang bawaan', 'luggage'),
    ('旅行', 'ryokou', 'perjalanan', 'trip'),
    ('出張', 'shucchou', 'perjalanan dinas', 'business trip'),
    ('観光', 'kankou', 'wisata', 'sightseeing'),
]:
    w(*_a)

# -- time
for _a in [
    ('今日', 'kyou', 'hari ini', 'today'),
    ('明日', 'ashita', 'besok', 'tomorrow'),
    ('昨日', 'kinou', 'kemarin', 'yesterday'),
    ('今朝', 'kesa', 'tadi pagi', 'this morning'),
    ('今晩', 'konban', 'malam ini', 'tonight'),
    ('毎日', 'mainichi', 'setiap hari', 'every day'),
    ('毎朝', 'maiasa', 'setiap pagi', 'every morning'),
    ('先週', 'senshuu', 'minggu lalu', 'last week'),
    ('来週', 'raishuu', 'minggu depan', 'next week'),
    ('今週', 'konshuu', 'minggu ini', 'this week'),
    ('来月', 'raigetsu', 'bulan depan', 'next month'),
    ('先月', 'sengetsu', 'bulan lalu', 'last month'),
    ('今年', 'kotoshi', 'tahun ini', 'this year'),
    ('去年', 'kyonen', 'tahun lalu', 'last year'),
    ('朝', 'asa', 'pagi', 'morning'),
    ('昼', 'hiru', 'siang', 'noon / daytime'),
    ('昼休み', 'hiruyasumi', 'istirahat siang', 'lunch break'),
    ('夜', 'yoru', 'malam', 'night'),
    ('晩', 'ban', 'malam', 'evening'),
    ('夕方', 'yuugata', 'sore', 'late afternoon'),
    ('今', 'ima', 'sekarang', 'now'),
    ('あとで', 'ato de', 'nanti', 'later'),
    ('すぐ', 'sugu', 'segera', 'right away'),
    ('まだ', 'mada', 'masih / belum', 'still / not yet'),
    ('もう', 'mou', 'sudah', 'already'),
    ('いつも', 'itsumo', 'selalu', 'always'),
    ('ときどき', 'tokidoki', 'kadang-kadang', 'sometimes'),
    ('たいてい', 'taitei', 'biasanya', 'usually'),
    ('たまに', 'tamani', 'sesekali', 'occasionally'),
    ('一度', 'ichido', 'sekali', 'once'),
    ('時間', 'jikan', 'waktu / jam (durasi)', 'time / hour (duration)'),
    ('時', 'ji', 'jam (pukul)', 'o\'clock'),
    ('分', 'fun', 'menit', 'minute'),
    ('半', 'han', 'setengah', 'half'),
    ('ごろ', 'goro', 'sekitar (waktu)', 'around (time)'),
    ('予定', 'yotei', 'rencana', 'plan / schedule'),
    ('約束', 'yakusoku', 'janji', 'promise / appointment'),
    ('今夜', 'konya', 'malam ini', 'tonight'),
]:
    w(*_a)

# -- numbers and counters
for _a in [
    ('一', 'ichi', 'satu', 'one'),
    ('二', 'ni', 'dua', 'two'),
    ('三', 'san', 'tiga', 'three'),
    ('四', 'yon', 'empat', 'four'),
    ('五', 'go', 'lima', 'five'),
    ('六', 'roku', 'enam', 'six'),
    ('七', 'nana', 'tujuh', 'seven'),
    ('八', 'hachi', 'delapan', 'eight'),
    ('九', 'kyuu', 'sembilan', 'nine'),
    ('十', 'juu', 'sepuluh', 'ten'),
    ('百', 'hyaku', 'seratus', 'hundred'),
    ('千', 'sen', 'seribu', 'thousand'),
    ('円', 'en', 'yen', 'yen'),
    ('個', 'ko', 'buah (penanda benda)', 'counter for small objects'),
    ('つ', 'tsu', 'buah (penanda umum)', 'general counter'),
    ('枚', 'mai', 'lembar (penanda benda tipis)', 'counter for flat objects'),
    ('杯', 'hai', 'cangkir (penanda minuman)', 'counter for cups'),
    ('回', 'kai', 'kali', 'counter for times'),
    ('少し', 'sukoshi', 'sedikit', 'a little'),
    ('ちょっと', 'chotto', 'sebentar / sedikit', 'a moment / a little'),
    ('たくさん', 'takusan', 'banyak', 'a lot'),
    ('半分', 'hanbun', 'setengah', 'half'),
    ('全部', 'zenbu', 'semuanya', 'all of it'),
    ('何時', 'nanji', 'jam berapa', 'what time'),
    ('何人', 'nannin', 'berapa orang', 'how many people'),
    ('何個', 'nanko', 'berapa buah', 'how many pieces'),
    ('一つ', 'hitotsu', 'satu buah', 'one (item)'),
    ('二つ', 'futatsu', 'dua buah', 'two (items)'),
    ('三つ', 'mittsu', 'tiga buah', 'three (items)'),
    ('一つだけ', 'hitotsu dake', 'hanya satu', 'just one'),
    # The counter for people is written 人 as well. It lives under a different key on
    # purpose: as a bare surface it collided with the noun 人 (hito), and because both were
    # plain dict keys the later one silently replaced the earlier, so あの人は would have
    # rendered as "ano nin wa". A counting phrase is used as a whole, so it is stored as
    # one, and the collision cannot come back.
    ('三人', 'sannin', 'tiga orang', 'three people'),
    ('二本', 'nihon', 'dua batang (benda panjang)', 'two long objects'),
    ('一人', 'hitori', 'satu orang / sendiri', 'one person'),
    ('二人', 'futari', 'dua orang', 'two people'),
]:
    w(*_a)

# -- food and drink
for _a in [
    ('ご飯', 'gohan', 'nasi / makanan', 'rice / meal'),
    ('朝ご飯', 'asagohan', 'sarapan', 'breakfast'),
    ('昼ご飯', 'hirugohan', 'makan siang', 'lunch'),
    ('晩ご飯', 'bangohan', 'makan malam', 'dinner'),
    ('パン', 'pan', 'roti', 'bread'),
    ('卵', 'tamago', 'telur', 'egg'),
    ('肉', 'niku', 'daging', 'meat'),
    ('魚', 'sakana', 'ikan', 'fish'),
    ('野菜', 'yasai', 'sayur', 'vegetable'),
    ('果物', 'kudamono', 'buah', 'fruit'),
    ('りんご', 'ringo', 'apel', 'apple'),
    ('みかん', 'mikan', 'jeruk', 'mandarin orange'),
    ('バナナ', 'banana', 'pisang', 'banana'),
    ('サラダ', 'sarada', 'salad', 'salad'),
    ('スープ', 'suupu', 'sup', 'soup'),
    ('カレー', 'karee', 'kari', 'curry'),
    ('ラーメン', 'raamen', 'ramen', 'ramen'),
    ('寿司', 'sushi', 'sushi', 'sushi'),
    ('弁当', 'bentou', 'bekal makan', 'boxed lunch'),
    ('お菓子', 'okashi', 'kue / camilan', 'sweets / snacks'),
    ('チョコレート', 'chokoreeto', 'cokelat', 'chocolate'),
    ('ケーキ', 'keeki', 'kue', 'cake'),
    ('アイスクリーム', 'aisukuriimu', 'es krim', 'ice cream'),
    ('水', 'mizu', 'air', 'water'),
    ('お茶', 'ocha', 'teh', 'tea'),
    ('コーヒー', 'koohii', 'kopi', 'coffee'),
    ('ジュース', 'juusu', 'jus', 'juice'),
    ('ビール', 'biiru', 'bir', 'beer'),
    ('牛乳', 'gyuunyuu', 'susu', 'milk'),
    ('ワイン', 'wain', 'anggur (minuman)', 'wine'),
    ('砂糖', 'satou', 'gula', 'sugar'),
    ('塩', 'shio', 'garam', 'salt'),
    ('醤油', 'shouyu', 'kecap asin', 'soy sauce'),
    ('味', 'aji', 'rasa', 'taste'),
    ('料理', 'ryouri', 'masakan', 'cooking / dish'),
    ('味噌汁', 'misoshiru', 'sup miso', 'miso soup'),
]:
    w(*_a)

# -- objects
for _a in [
    ('傘', 'kasa', 'payung', 'umbrella'),
    ('財布', 'saifu', 'dompet', 'wallet'),
    ('携帯', 'keitai', 'ponsel', 'mobile phone'),
    ('スマホ', 'sumaho', 'ponsel pintar', 'smartphone'),
    ('鍵', 'kagi', 'kunci', 'key'),
    ('鞄', 'kaban', 'tas', 'bag'),
    ('眼鏡', 'megane', 'kacamata', 'glasses'),
    ('時計', 'tokei', 'jam', 'watch / clock'),
    ('本', 'hon', 'buku', 'book'),
    ('ノート', 'nooto', 'buku catatan', 'notebook'),
    ('ペン', 'pen', 'pulpen', 'pen'),
    ('鉛筆', 'enpitsu', 'pensil', 'pencil'),
    ('紙', 'kami', 'kertas', 'paper'),
    ('手紙', 'tegami', 'surat', 'letter'),
    ('葉書', 'hagaki', 'kartu pos', 'postcard'),
    ('切手', 'kitte', 'perangko', 'postage stamp'),
    ('小包', 'kozutsumi', 'paket', 'parcel'),
    ('写真', 'shashin', 'foto', 'photograph'),
    ('音楽', 'ongaku', 'musik', 'music'),
    ('映画', 'eiga', 'film', 'movie'),
    ('新聞', 'shinbun', 'koran', 'newspaper'),
    ('雑誌', 'zasshi', 'majalah', 'magazine'),
    ('テレビ', 'terebi', 'televisi', 'television'),
    ('ラジオ', 'rajio', 'radio', 'radio'),
    ('パソコン', 'pasokon', 'komputer', 'computer'),
    ('机', 'tsukue', 'meja', 'desk'),
    ('椅子', 'isu', 'kursi', 'chair'),
    ('電気', 'denki', 'lampu / listrik', 'light / electricity'),
    ('窓', 'mado', 'jendela', 'window'),
    ('ドア', 'doa', 'pintu', 'door'),
    ('エアコン', 'eakon', 'AC', 'air conditioner'),
    ('冷蔵庫', 'reizouko', 'kulkas', 'refrigerator'),
    ('コップ', 'koppu', 'gelas', 'glass'),
    ('皿', 'sara', 'piring', 'plate'),
    ('箸', 'hashi', 'sumpit', 'chopsticks'),
    ('スプーン', 'supuun', 'sendok', 'spoon'),
    ('服', 'fuku', 'baju', 'clothes'),
    ('靴', 'kutsu', 'sepatu', 'shoes'),
    ('帽子', 'boushi', 'topi', 'hat'),
    ('コート', 'kooto', 'mantel', 'coat'),
    ('薬', 'kusuri', 'obat', 'medicine'),
    ('お金', 'okane', 'uang', 'money'),
    ('現金', 'genkin', 'uang tunai', 'cash'),
    ('カード', 'kaado', 'kartu', 'card'),
    ('値段', 'nedan', 'harga', 'price'),
    ('袋', 'fukuro', 'kantong', 'bag / sack'),
    ('ゴミ', 'gomi', 'sampah', 'trash'),
    ('お釣り', 'otsuri', 'uang kembalian', 'change (money)'),
    ('レシート', 'reshiito', 'struk', 'receipt'),
    ('電池', 'denchi', 'baterai', 'battery'),
    ('箱', 'hako', 'kotak', 'box'),
    ('花', 'hana', 'bunga', 'flower'),
    ('犬', 'inu', 'anjing', 'dog'),
    ('猫', 'neko', 'kucing', 'cat'),
    ('地図', 'chizu', 'peta', 'map'),
    ('住所', 'juusho', 'alamat', 'address'),
    ('名前', 'namae', 'nama', 'name'),
    ('番号', 'bangou', 'nomor', 'number'),
    ('電話', 'denwa', 'telepon', 'telephone'),
    ('メール', 'meeru', 'surel', 'email'),
    ('予約', 'yoyaku', 'pemesanan', 'reservation'),
    ('注文', 'chuumon', 'pesanan', 'order'),
    ('会議', 'kaigi', 'rapat', 'meeting'),
    ('仕事', 'shigoto', 'pekerjaan', 'work / job'),
    ('授業', 'jugyou', 'pelajaran (kelas)', 'class / lesson'),
    ('宿題', 'shukudai', 'PR', 'homework'),
    ('試験', 'shiken', 'ujian', 'exam'),
    ('練習', 'renshuu', 'latihan', 'practice'),
    ('趣味', 'shumi', 'hobi', 'hobby'),
    ('休み', 'yasumi', 'libur', 'day off'),
    ('天気', 'tenki', 'cuaca', 'weather'),
    ('雨', 'ame', 'hujan', 'rain'),
    ('雪', 'yuki', 'salju', 'snow'),
    ('風', 'kaze', 'angin', 'wind'),
    ('台風', 'taifuu', 'topan', 'typhoon'),
    ('熱', 'netsu', 'demam', 'fever'),
    ('風邪', 'kaze', 'masuk angin / flu', 'a cold'),
    ('体', 'karada', 'badan', 'body'),
    ('頭', 'atama', 'kepala', 'head'),
    ('お腹', 'onaka', 'perut', 'stomach'),
    ('喉', 'nodo', 'tenggorokan', 'throat'),
    ('目', 'me', 'mata', 'eye'),
    ('歯', 'ha', 'gigi', 'tooth'),
    ('声', 'koe', 'suara', 'voice'),
    ('気分', 'kibun', 'perasaan / kondisi', 'feeling / mood'),
    ('心配', 'shinpai', 'khawatir', 'worry'),
    ('都合', 'tsugou', 'kesediaan waktu', 'convenience / availability'),
    ('相談', 'soudan', 'konsultasi', 'consultation'),
    ('説明', 'setsumei', 'penjelasan', 'explanation'),
    ('理由', 'riyuu', 'alasan', 'reason'),
    ('意味', 'imi', 'arti', 'meaning'),
    ('言葉', 'kotoba', 'kata / bahasa', 'word / language'),
    ('日本語', 'nihongo', 'bahasa Jepang', 'Japanese language'),
    ('英語', 'eigo', 'bahasa Inggris', 'English language'),
    ('インドネシア語', 'indoneshiago', 'bahasa Indonesia', 'Indonesian language'),
]:
    w(*_a)

# -- adverbs, adjectives, connectives
for _a in [
    ('とても', 'totemo', 'sangat', 'very'),
    ('少し', 'sukoshi', 'sedikit', 'a little'),
    ('もっと', 'motto', 'lebih', 'more'),
    ('一番', 'ichiban', 'paling', 'the most'),
    ('本当に', 'hontou ni', 'benar-benar', 'really'),
    ('たぶん', 'tabun', 'mungkin', 'probably'),
    ('きっと', 'kitto', 'pasti', 'surely'),
    ('やっぱり', 'yappari', 'ternyata / memang', 'as expected / after all'),
    ('ゆっくり', 'yukkuri', 'pelan-pelan', 'slowly'),
    ('早く', 'hayaku', 'cepat', 'quickly / early'),
    ('すぐに', 'sugu ni', 'segera', 'immediately'),
    ('一緒に', 'issho ni', 'bersama-sama', 'together'),
    ('一人で', 'hitori de', 'sendiri', 'alone'),
    ('また', 'mata', 'lagi', 'again'),
    ('まず', 'mazu', 'pertama-tama', 'first of all'),
    ('それから', 'sorekara', 'setelah itu', 'after that'),
    ('でも', 'demo', 'tapi', 'but'),
    ('しかし', 'shikashi', 'namun', 'however'),
    ('だから', 'dakara', 'jadi / karena itu', 'so / therefore'),
    ('それで', 'sorede', 'karena itu', 'and so'),
    ('そのあと', 'sono ato', 'setelah itu', 'after that'),
    ('あと', 'ato', 'sisa / setelah', 'rest / after'),
    ('だいたい', 'daitai', 'kira-kira', 'roughly'),
    ('しっかり', 'shikkari', 'dengan baik / sungguh-sungguh', 'properly / firmly'),
    ('大丈夫', 'daijoubu', 'tidak apa-apa', 'all right / okay'),
    ('元気', 'genki', 'sehat / bersemangat', 'well / energetic'),
    ('大きい', 'ookii', 'besar', 'big'),
    ('小さい', 'chiisai', 'kecil', 'small'),
    ('高い', 'takai', 'tinggi / mahal', 'tall / expensive'),
    ('安い', 'yasui', 'murah', 'cheap'),
    ('新しい', 'atarashii', 'baru', 'new'),
    ('古い', 'furui', 'lama', 'old (thing)'),
    ('いい', 'ii', 'bagus', 'good'),
    ('悪い', 'warui', 'buruk', 'bad'),
    ('おいしい', 'oishii', 'enak', 'delicious'),
    ('おいしかった', 'oishikatta', 'enak (lampau)', 'was delicious'),
    ('熱い', 'atsui', 'panas (benda)', 'hot (thing)'),
    ('暑い', 'atsui', 'panas (cuaca)', 'hot (weather)'),
    ('寒い', 'samui', 'dingin (cuaca)', 'cold (weather)'),
    ('冷たい', 'tsumetai', 'dingin (benda)', 'cold (thing)'),
    ('忙しい', 'isogashii', 'sibuk', 'busy'),
    ('暇', 'hima', 'luang', 'free (time)'),
    ('難しい', 'muzukashii', 'sulit', 'difficult'),
    ('簡単', 'kantan', 'mudah', 'easy / simple'),
    ('近い', 'chikai', 'dekat', 'near'),
    ('遠い', 'tooi', 'jauh', 'far'),
    ('早い', 'hayai', 'cepat / pagi', 'early'),
    ('遅い', 'osoi', 'lambat / malam', 'late'),
    ('楽しい', 'tanoshii', 'menyenangkan', 'enjoyable'),
    ('うれしい', 'ureshii', 'senang', 'glad'),
    ('残念', 'zannen', 'sayang sekali', 'a shame'),
    ('好き', 'suki', 'suka', 'like'),
    ('嫌い', 'kirai', 'tidak suka', 'dislike'),
    ('上手', 'jouzu', 'mahir', 'skilful'),
    ('苦手', 'nigate', 'tidak pandai / kurang suka', 'weak at / not good with'),
]:
    w(*_a)

# ------------------------------------------------------------------- verbs
# Every inflected surface a sentence uses is listed. Grouped by verb so the forms of
# one verb can be read together and kept consistent.
for _a in [
    # 行く
    ('行きます', 'ikimasu', 'pergi (sopan, non-lampau)', 'go (polite, non-past)'),
    ('行きました', 'ikimashita', 'pergi (sopan, lampau)', 'went (polite, past)'),
    ('行く', 'iku', 'pergi (biasa, non-lampau)', 'go (plain)'),
    ('行った', 'itta', 'pergi (biasa, lampau)', 'went (plain, past)'),
    ('行こう', 'ikou', 'mari pergi', 'let us go'),
    ('行きましょう', 'ikimashou', 'mari pergi (sopan)', 'let us go (polite)'),
    ('行って', 'itte', 'pergi (bentuk -te)', 'go (te-form)'),
    ('行かない', 'ikanai', 'tidak pergi (biasa)', 'do not go (plain)'),
    ('行きません', 'ikimasen', 'tidak pergi (sopan)', 'do not go (polite)'),
    # 来る
    ('来ます', 'kimasu', 'datang (sopan)', 'come (polite)'),
    ('来ました', 'kimashita', 'datang (sopan, lampau)', 'came (polite, past)'),
    ('来る', 'kuru', 'datang (biasa)', 'come (plain)'),
    ('来た', 'kita', 'datang (biasa, lampau)', 'came (plain, past)'),
    ('来て', 'kite', 'datang (bentuk -te)', 'come (te-form)'),
    # 帰る
    ('帰ります', 'kaerimasu', 'pulang (sopan)', 'go home (polite)'),
    ('帰りました', 'kaerimashita', 'pulang (sopan, lampau)', 'went home (polite, past)'),
    ('帰る', 'kaeru', 'pulang (biasa)', 'go home (plain)'),
    ('帰った', 'kaetta', 'pulang (biasa, lampau)', 'went home (plain, past)'),
    ('帰って', 'kaette', 'pulang (bentuk -te)', 'go home (te-form)'),
    # 食べる
    ('食べます', 'tabemasu', 'makan (sopan)', 'eat (polite)'),
    ('食べました', 'tabemashita', 'makan (sopan, lampau)', 'ate (polite, past)'),
    ('食べる', 'taberu', 'makan (biasa)', 'eat (plain)'),
    ('食べた', 'tabeta', 'makan (biasa, lampau)', 'ate (plain, past)'),
    ('食べて', 'tabete', 'makan (bentuk -te)', 'eat (te-form)'),
    ('食べません', 'tabemasen', 'tidak makan (sopan)', 'do not eat (polite)'),
    ('食べすぎました', 'tabesugimashita', 'makan berlebihan (lampau)', 'ate too much'),
    # 飲む
    ('飲みます', 'nomimasu', 'minum (sopan)', 'drink (polite)'),
    ('飲みました', 'nomimashita', 'minum (sopan, lampau)', 'drank (polite, past)'),
    ('飲む', 'nomu', 'minum (biasa)', 'drink (plain)'),
    ('飲んだ', 'nonda', 'minum (biasa, lampau)', 'drank (plain, past)'),
    ('飲んで', 'nonde', 'minum (bentuk -te)', 'drink (te-form)'),
    # 買う
    ('買います', 'kaimasu', 'membeli (sopan)', 'buy (polite)'),
    ('買いました', 'kaimashita', 'membeli (sopan, lampau)', 'bought (polite, past)'),
    ('買う', 'kau', 'membeli (biasa)', 'buy (plain)'),
    ('買った', 'katta', 'membeli (biasa, lampau)', 'bought (plain, past)'),
    ('買って', 'katte', 'membeli (bentuk -te)', 'buy (te-form)'),
    ('買いません', 'kaimasen', 'tidak membeli (sopan)', 'do not buy (polite)'),
    ('買い物', 'kaimono', 'belanja', 'shopping'),
    ('買い物をします', 'kaimono o shimasu', 'berbelanja (sopan)', 'do shopping (polite)'),
    ('買い物に行きます', 'kaimono ni ikimasu', 'pergi berbelanja', 'go shopping'),
    # 見る
    ('見ます', 'mimasu', 'menonton / melihat (sopan)', 'watch / look (polite)'),
    ('見ました', 'mimashita', 'menonton (sopan, lampau)', 'watched (polite, past)'),
    ('見る', 'miru', 'menonton (biasa)', 'watch (plain)'),
    ('見た', 'mita', 'menonton (biasa, lampau)', 'watched (plain, past)'),
    ('見て', 'mite', 'melihat (bentuk -te)', 'look (te-form)'),
    # 聞く
    ('聞きます', 'kikimasu', 'bertanya / mendengar (sopan)', 'ask / listen (polite)'),
    ('聞きました', 'kikimashita', 'bertanya (sopan, lampau)', 'asked (polite, past)'),
    ('聞いて', 'kiite', 'bertanya (bentuk -te)', 'ask (te-form)'),
    ('聞いてもいいですか', 'kiite mo ii desu ka', 'boleh saya bertanya', 'may I ask'),
    # 言う
    ('言います', 'iimasu', 'berkata (sopan)', 'say (polite)'),
    ('言いました', 'iimashita', 'berkata (sopan, lampau)', 'said (polite, past)'),
    ('言って', 'itte', 'berkata (bentuk -te)', 'say (te-form)'),
    # 待つ
    ('待ちます', 'machimasu', 'menunggu (sopan)', 'wait (polite)'),
    ('待って', 'matte', 'menunggu (bentuk -te)', 'wait (te-form)'),
    ('待っています', 'matte imasu', 'sedang menunggu', 'am waiting'),
    ('待っていました', 'matte imashita', 'sedang menunggu (lampau)', 'was waiting'),
    ('待たなくてはいけません', 'matanakute wa ikemasen', 'harus menunggu', 'must wait'),
    # する
    ('します', 'shimasu', 'melakukan (sopan)', 'do (polite)'),
    ('しました', 'shimashita', 'melakukan (sopan, lampau)', 'did (polite, past)'),
    ('する', 'suru', 'melakukan (biasa)', 'do (plain)'),
    ('した', 'shita', 'melakukan (biasa, lampau)', 'did (plain, past)'),
    ('して', 'shite', 'melakukan (bentuk -te)', 'do (te-form)'),
    ('しましょう', 'shimashou', 'mari lakukan (usulan sopan)', 'let us do (polite suggestion)'),
    ('しましょうか', 'shimashou ka', 'apakah saya lakukan (tawaran)', 'shall I (offer)'),
    ('しませんか', 'shimasen ka', 'maukah (ajakan sopan)', 'would you like to (invitation)'),
    # ある / いる
    ('あります', 'arimasu', 'ada (benda, sopan)', 'there is (thing, polite)'),
    ('ありました', 'arimashita', 'ada (benda, lampau)', 'there was (thing, past)'),
    ('ありません', 'arimasen', 'tidak ada (benda, sopan)', 'there is not (thing, polite)'),
    ('ある', 'aru', 'ada (benda, biasa)', 'there is (thing, plain)'),
    ('います', 'imasu', 'ada (orang/hewan, sopan)', 'there is (person/animal, polite)'),
    ('いました', 'imashita', 'ada (orang, lampau)', 'there was (person, past)'),
    ('いません', 'imasen', 'tidak ada (orang, sopan)', 'there is no (person, polite)'),
    ('いる', 'iru', 'ada (orang, biasa)', 'there is (person, plain)'),
    ('いませんでした', 'imasen deshita', 'tidak ada (orang, lampau sopan)', 'there was no (person, polite past)'),
    # できる
    ('できます', 'dekimasu', 'bisa (sopan)', 'can (polite)'),
    ('できました', 'dekimashita', 'berhasil / selesai (sopan, lampau)', 'finished / managed (past)'),
    ('できない', 'dekinai', 'tidak bisa (biasa)', 'cannot (plain)'),
    ('できません', 'dekimasen', 'tidak bisa (sopan)', 'cannot (polite)'),
    # なる / 変わる
    ('なります', 'narimasu', 'menjadi (sopan)', 'become (polite)'),
    ('なりました', 'narimashita', 'menjadi (sopan, lampau)', 'became (polite, past)'),
    ('変わりました', 'kawarimashita', 'berubah (lampau)', 'changed (past)'),
    # 知る / 分かる
    ('知っています', 'shitte imasu', 'tahu (sopan)', 'know (polite)'),
    ('知りません', 'shirimasen', 'tidak tahu (sopan)', 'do not know (polite)'),
    ('知らない', 'shiranai', 'tidak tahu (biasa)', 'do not know (plain)'),
    ('分かります', 'wakarimasu', 'mengerti (sopan)', 'understand (polite)'),
    ('分かりました', 'wakarimashita', 'mengerti (lampau sopan)', 'understood (polite past)'),
    ('分かりません', 'wakarimasen', 'tidak mengerti (sopan)', 'do not understand (polite)'),
    ('分からない', 'wakaranai', 'tidak mengerti (biasa)', 'do not understand (plain)'),
    # 忘れる / 覚える
    ('忘れました', 'wasuremashita', 'lupa (lampau sopan)', 'forgot (polite past)'),
    ('忘れて', 'wasurete', 'lupa (bentuk -te)', 'forget (te-form)'),
    ('忘れ物', 'wasuremono', 'barang tertinggal', 'something left behind'),
    ('覚えています', 'oboete imasu', 'ingat (sopan)', 'remember (polite)'),
    # 使う
    ('使います', 'tsukaimasu', 'memakai (sopan)', 'use (polite)'),
    ('使って', 'tsukatte', 'memakai (bentuk -te)', 'use (te-form)'),
    ('使ってもいいですか', 'tsukatte mo ii desu ka', 'boleh saya pakai', 'may I use it'),
    # 持つ / 借りる / 貸す
    ('持ちます', 'mochimasu', 'membawa (sopan)', 'carry / hold (polite)'),
    ('持って', 'motte', 'membawa (bentuk -te)', 'carry (te-form)'),
    ('持ってきます', 'motte kimasu', 'membawanya (ke sini)', 'bring (polite)'),
    ('持っています', 'motte imasu', 'memiliki / membawa (sopan)', 'have (polite)'),
    ('借ります', 'karimasu', 'meminjam (sopan)', 'borrow (polite)'),
    ('貸します', 'kashimasu', 'meminjamkan (sopan)', 'lend (polite)'),
    ('貸してください', 'kashite kudasai', 'tolong pinjamkan', 'please lend me'),
    # 送る / 受け取る / 払う
    ('送ります', 'okurimasu', 'mengirim (sopan)', 'send (polite)'),
    ('送りました', 'okurimashita', 'mengirim (lampau sopan)', 'sent (polite past)'),
    ('受け取りました', 'uketorimashita', 'menerima (lampau sopan)', 'received (polite past)'),
    ('払います', 'haraimasu', 'membayar (sopan)', 'pay (polite)'),
    ('払いました', 'haraimashita', 'membayar (lampau sopan)', 'paid (polite past)'),
    ('払って', 'haratte', 'membayar (bentuk -te)', 'pay (te-form)'),
    # 座る / 立つ / 乗る / 降りる
    ('座ります', 'suwarimasu', 'duduk (sopan)', 'sit (polite)'),
    ('座って', 'suwatte', 'duduk (bentuk -te)', 'sit (te-form)'),
    ('座ってもいいですか', 'suwatte mo ii desu ka', 'boleh saya duduk', 'may I sit'),
    ('立って', 'tatte', 'berdiri (bentuk -te)', 'stand (te-form)'),
    ('乗ります', 'norimasu', 'naik (kendaraan, sopan)', 'board / ride (polite)'),
    ('乗って', 'notte', 'naik (bentuk -te)', 'board (te-form)'),
    ('乗り換えます', 'norikaemasu', 'ganti kereta (sopan)', 'transfer (polite)'),
    ('降ります', 'orimasu', 'turun (kendaraan, sopan)', 'get off (polite)'),
    ('降りて', 'orite', 'turun (bentuk -te)', 'get off (te-form)'),
    # 開く / 閉まる / つく / 消える
    ('開いています', 'aite imasu', 'sedang terbuka', 'is open'),
    ('開きました', 'akimashita', 'terbuka (lampau)', 'opened (past)'),
    ('閉まっています', 'shimatte imasu', 'sedang tutup', 'is closed'),
    ('閉まりました', 'shimarimashita', 'tertutup (lampau)', 'closed (past)'),
    ('つきました', 'tsukimashita', 'menyala (lampau)', 'turned on (past)'),
    ('消えました', 'kiemashita', 'mati (lampau)', 'went off (past)'),
    # 探す / 見つける
    ('探しています', 'sagashite imasu', 'sedang mencari', 'am looking for'),
    ('見つかりました', 'mitsukarimashita', 'ketemu (lampau)', 'was found (past)'),
    ('見つけました', 'mitsukemashita', 'menemukan (lampau)', 'found (past)'),
    # 会う / 誘う
    ('会います', 'aimasu', 'bertemu (sopan)', 'meet (polite)'),
    ('会いました', 'aimashita', 'bertemu (lampau sopan)', 'met (polite past)'),
    ('会って', 'atte', 'bertemu (bentuk -te)', 'meet (te-form)'),
    ('会いましょう', 'aimashou', 'mari bertemu', 'let us meet'),
    ('誘ってもいいですか', 'sasotte mo ii desu ka', 'boleh saya mengajak', 'may I invite'),
    # 話す / 伝える / 連絡する
    ('話します', 'hanashimasu', 'berbicara (sopan)', 'speak (polite)'),
    ('話しました', 'hanashimashita', 'berbicara (lampau sopan)', 'spoke (polite past)'),
    ('話して', 'hanashite', 'berbicara (bentuk -te)', 'speak (te-form)'),
    ('伝えます', 'tsutaemasu', 'menyampaikan (sopan)', 'convey (polite)'),
    ('伝えて', 'tsutaete', 'menyampaikan (bentuk -te)', 'convey (te-form)'),
    ('連絡します', 'renraku shimasu', 'menghubungi (sopan)', 'contact (polite)'),
    ('連絡しました', 'renraku shimashita', 'menghubungi (lampau sopan)', 'contacted (polite past)'),
    # 手伝う / 助ける
    ('手伝います', 'tetsudaimasu', 'membantu (sopan)', 'help (polite)'),
    ('手伝って', 'tetsudatte', 'membantu (bentuk -te)', 'help (te-form)'),
    ('手伝いましょうか', 'tetsudaimashou ka', 'mau saya bantu', 'shall I help'),
    # 休む / 寝る / 起きる
    ('休みます', 'yasumimasu', 'istirahat / tidak masuk (sopan)', 'rest / take a day off (polite)'),
    ('休みました', 'yasumimashita', 'istirahat (lampau sopan)', 'rested (polite past)'),
    ('寝ます', 'nemasu', 'tidur (sopan)', 'sleep (polite)'),
    ('寝ました', 'nemashita', 'tidur (lampau sopan)', 'slept (polite past)'),
    ('寝坊しました', 'neboushimashita', 'bangun kesiangan (lampau)', 'overslept (past)'),
    ('起きます', 'okimasu', 'bangun (sopan)', 'get up (polite)'),
    ('起きました', 'okimashita', 'bangun (lampau sopan)', 'got up (polite past)'),
    ('起きて', 'okite', 'bangun (bentuk -te)', 'get up (te-form)'),
    # 働く / 勉強する / 練習する
    ('働いています', 'hataraite imasu', 'sedang bekerja', 'am working'),
    ('働きました', 'hatarakimashita', 'bekerja (lampau sopan)', 'worked (polite past)'),
    ('勉強します', 'benkyou shimasu', 'belajar (sopan)', 'study (polite)'),
    ('勉強しました', 'benkyou shimashita', 'belajar (lampau sopan)', 'studied (polite past)'),
    ('勉強して', 'benkyou shite', 'belajar (bentuk -te)', 'study (te-form)'),
    ('練習します', 'renshuu shimasu', 'berlatih (sopan)', 'practise (polite)'),
    ('練習しました', 'renshuu shimashita', 'berlatih (lampau sopan)', 'practised (polite past)'),
    # 作る / 洗う / 掃除する
    ('作ります', 'tsukurimasu', 'membuat (sopan)', 'make (polite)'),
    ('作りました', 'tsukurimashita', 'membuat (lampau sopan)', 'made (polite past)'),
    ('作り方', 'tsukurikata', 'cara membuat', 'how to make'),
    ('洗います', 'araimasu', 'mencuci (sopan)', 'wash (polite)'),
    ('洗って', 'aratte', 'mencuci (bentuk -te)', 'wash (te-form)'),
    ('掃除します', 'souji shimasu', 'membersihkan (sopan)', 'clean (polite)'),
    ('掃除しました', 'souji shimashita', 'membersihkan (lampau sopan)', 'cleaned (polite past)'),
    # 着る / 履く / 脱ぐ
    ('着ます', 'kimasu', 'memakai (atasan, sopan)', 'wear (top, polite)'),
    ('着て', 'kite', 'memakai (bentuk -te)', 'wear (te-form)'),
    ('履いて', 'haite', 'memakai (bawahan/sepatu, -te)', 'wear (bottom/shoes, te-form)'),
    # 曲がる / 渡る / 通る
    ('曲がります', 'magarimasu', 'berbelok (sopan)', 'turn (polite)'),
    ('曲がって', 'magatte', 'berbelok (bentuk -te)', 'turn (te-form)'),
    ('渡ります', 'watarimasu', 'menyeberang (sopan)', 'cross (polite)'),
    ('渡って', 'watatte', 'menyeberang (bentuk -te)', 'cross (te-form)'),
    ('通ります', 'toorimasu', 'melewati (sopan)', 'pass through (polite)'),
    # 並ぶ / 混む / 込む
    ('並んでいます', 'narande imasu', 'sedang berbaris', 'is queuing'),
    ('混んでいます', 'konde imasu', 'sedang ramai', 'is crowded'),
    ('空いています', 'aite imasu', 'sedang lapang', 'is not crowded'),
    # 遅れる / 急ぐ
    ('遅れます', 'okuremasu', 'terlambat (sopan)', 'be late (polite)'),
    ('遅れました', 'okuremashita', 'terlambat (lampau sopan)', 'was late (polite past)'),
    ('遅れて', 'okurete', 'terlambat (bentuk -te)', 'be late (te-form)'),
    ('急ぎます', 'isogimasu', 'bergegas (sopan)', 'hurry (polite)'),
    ('急いで', 'isoide', 'bergegas (bentuk -te)', 'hurry (te-form)'),
    # 治る / 痛い
    ('治りました', 'naorimashita', 'sembuh (lampau)', 'got better (past)'),
    ('痛い', 'itai', 'sakit', 'painful'),
    ('痛くなりました', 'itaku narimashita', 'jadi sakit (lampau)', 'became painful'),
    ('痛いです', 'itai desu', 'sakit (sopan)', 'it hurts (polite)'),
]:
    w(*_a)

# ------------------------------------------------------------ set phrases and greetings
for _a in [
    ('おはよう', 'ohayou', 'selamat pagi (akrab)', 'good morning (casual)'),
    ('おはようございます', 'ohayou gozaimasu', 'selamat pagi (sopan)', 'good morning (polite)'),
    ('こんにちは', 'konnichiwa', 'selamat siang', 'hello / good afternoon'),
    ('こんばんは', 'konbanwa', 'selamat malam', 'good evening'),
    ('おやすみなさい', 'oyasuminasai', 'selamat tidur', 'good night'),
    ('ありがとう', 'arigatou', 'terima kasih (akrab)', 'thanks (casual)'),
    ('ありがとうございます', 'arigatou gozaimasu', 'terima kasih (sopan)', 'thank you (polite)'),
    ('どうも', 'doumo', 'terima kasih / permisi (ringan)', 'thanks / hi (light)'),
    ('どういたしまして', 'dou itashimashite', 'dengan senang hati', 'you are welcome'),
    ('すみません', 'sumimasen', 'permisi / maaf / terima kasih', 'excuse me / sorry / thanks'),
    ('ごめんなさい', 'gomen nasai', 'maaf (sopan)', 'I am sorry (polite)'),
    ('ごめん', 'gomen', 'maaf (akrab)', 'sorry (casual)'),
    ('失礼します', 'shitsurei shimasu', 'permisi (masuk/keluar)', 'excuse me (entering/leaving)'),
    ('いただきます', 'itadakimasu', 'selamat makan (sebelum makan)', 'said before eating'),
    ('ごちそうさまでした', 'gochisousama deshita', 'terima kasih atas makanannya', 'thank you for the meal'),
    ('お願いします', 'onegai shimasu', 'tolong / mohon', 'please (request)'),
    ('ください', 'kudasai', 'tolong (permintaan sopan)', 'please (polite request)'),
    ('ちょっと待ってください', 'chotto matte kudasai', 'tolong tunggu sebentar', 'please wait a moment'),
    ('お待たせしました', 'omatase shimashita', 'maaf membuat menunggu', 'sorry to keep you waiting'),
    ('かしこまりました', 'kashikomarimashita', 'baik, siap (sopan)', 'certainly (very polite)'),
    ('いらっしゃいませ', 'irasshaimase', 'selamat datang (dari staf)', 'welcome (said by staff)'),
    ('お疲れ様です', 'otsukaresama desu', 'terima kasih atas kerja kerasnya', 'thanks for your hard work'),
    ('大丈夫です', 'daijoubu desu', 'tidak apa-apa (sopan)', 'it is all right (polite)'),
    ('結構です', 'kekkou desu', 'tidak usah, terima kasih (sopan)', 'no thank you (polite)'),
    ('お手洗いはどこですか', 'otearai wa doko desu ka', 'toiletnya di mana', 'where is the toilet'),
    ('気をつけて', 'ki o tsukete', 'hati-hati di jalan', 'take care'),
    ('お元気ですか', 'ogenki desu ka', 'apa kabar (sopan)', 'how are you (polite)'),
    ('初めまして', 'hajimemashite', 'senang berkenalan', 'nice to meet you'),
    ('よろしくお願いします', 'yoroshiku onegai shimasu', 'mohon bantuannya', 'pleased to meet you / please treat me well'),
    ('おかげさまで', 'okagesama de', 'berkat bantuan Anda', 'thanks to you'),
    ('残念です', 'zannen desu', 'sayang sekali (sopan)', 'that is a shame (polite)'),
    ('楽しみにしています', 'tanoshimi ni shite imasu', 'saya menantikannya', 'I am looking forward to it'),
    ('もしもし', 'moshi moshi', 'halo (di telepon)', 'hello (on the phone)'),
    ('おかまいなく', 'okamai naku', 'jangan repot-repot', 'please do not trouble yourself'),
    ('お先に失礼します', 'osaki ni shitsurei shimasu', 'permisi saya duluan', 'excuse me for leaving first'),
    ('お大事に', 'odaiji ni', 'semoga lekas sembuh', 'take care of yourself (to a sick person)'),
]:
    w(*_a)

# ------------------------------------------------------------------------- relations
# relation key -> (register for the colour chip, label_id, label_en)
# register is 'dekat' (familiar, green chip) or 'asing' (distant, yellow chip)
RELATIONS = {
    'tetangga': ('dekat', 'tetangga', 'neighbour'),
    'teman': ('dekat', 'teman', 'friend'),
    'teman_dekat': ('dekat', 'teman dekat', 'close friend'),
    'keluarga': ('dekat', 'keluarga', 'family'),
    'ibu': ('dekat', 'ibu saya', 'my mother'),
    'ayah': ('dekat', 'ayah saya', 'my father'),
    'saudara': ('dekat', 'saudara', 'relative'),
    'rekan': ('dekat', 'rekan kerja', 'colleague'),
    'sekamar': ('dekat', 'teman sekamar', 'roommate'),
    'pasangan': ('dekat', 'pasangan', 'partner'),
    'teman_sekolah': ('dekat', 'teman sekolah', 'classmate'),
    'asing': ('asing', 'orang yang baru dikenal', 'someone you just met'),
    'orang_asing': ('asing', 'orang asing di jalan', 'a stranger on the street'),
    'petugas_toko': ('asing', 'petugas toko', 'shop attendant'),
    'petugas_stasiun': ('asing', 'petugas stasiun', 'station staff'),
    'pelayan': ('asing', 'pelayan kafe', 'cafe staff'),
    'atasan': ('asing', 'atasan', 'superior at work'),
    'dokter': ('asing', 'dokter', 'doctor'),
    'apoteker': ('asing', 'apoteker', 'pharmacist'),
    'polisi': ('asing', 'petugas', 'officer'),
    'guru': ('asing', 'guru', 'teacher'),
    'kurir': ('asing', 'kurir pengantar', 'delivery courier'),
    'penjual': ('asing', 'penjual', 'vendor'),
}

# ------------------------------------------------------------------------- the builder
REQUIRED = ('who_id', 'who_en', 'politeness', 'situation', 'situation_en',
            'kanji', 'romaji', 'id_translation', 'en_translation', 'tokens',
            'note', 'note_en')


def sent(key, rel, words, id_t, en_t, sit, sit_en, note, note_en, fn, long=False):
    """Compose one sentence record from a list of surface forms.

    key       stable identifier, used for reporting and for the deep-link order
    rel       relation key (see RELATIONS): who the sentence is said to
    words     the surfaces in order, punctuation included as its own item
    id_t/en_t   the translation, written as a whole sentence (not a pattern)
    sit/sit_en  the situation in both languages
    note/note_en  one usage note in both languages
    fn        which function of the topic this sentence fills. The topic module declares
              its FUNCTIONS and the build refuses to ship a topic whose declared
              functions are not all filled, so "one topic = one sentence" cannot happen.
    long      True for the longer, multi-clause sentences. A long one must carry a real
              relation (ので, から, けど, たら, とき, ながら) and must not be two thoughts
              glued with それから; uniqueness.py enforces both.
    """
    register, who_id, who_en = RELATIONS[rel]

    tokens = []
    for surface in words:
        if surface in PUNCT:
            if not tokens:
                raise ValueError(f'{key}: punctuation before any word')
            romaji_punct, _ = PUNCT[surface]
            # punctuation belongs to the word before it: merge it into that token so
            # it can never be separated from the word by a line break
            tokens[-1][0] += surface
            tokens[-1][1] += romaji_punct
            continue
        if surface not in LEX:
            raise KeyError(f'{key}: {surface!r} is not in the lexicon')
        romaji, gid, gen = LEX[surface]
        tokens.append([surface, romaji, gid, gen])

    kanji = ''.join(t[0] for t in tokens)
    romaji_line = ' '.join(t[1] for t in tokens)

    row = {
        'key': key,
        'fn': fn,
        'who': register,
        'who_id': who_id,
        'who_en': who_en,
        'politeness': 'sopan' if rel and _polite(rel) else 'biasa',
        'situation': sit,
        'situation_en': sit_en,
        'kanji': kanji,
        'romaji': romaji_line,
        'id_translation': id_t,
        'en_translation': en_t,
        'tokens': tokens,
        'note': note,
        'note_en': note_en,
        'origin': 'hand',
    }
    if long:
        row['long'] = True
    for field in REQUIRED:
        if not row.get(field):
            raise ValueError(f'{key}: empty field {field}')
    return row


# Sentences are written in both registers on purpose: the same situation said politely
# and said casually is the single most useful contrast this deck can show. Which one a
# sentence is, is decided by the relation it is said to, not by a per-sentence flag, so
# a polite sentence addressed to a superior cannot accidentally be written casually.
POLITE_RELATIONS = {
    'tetangga', 'asing', 'orang_asing', 'petugas_toko', 'petugas_stasiun', 'pelayan',
    'atasan', 'dokter', 'apoteker', 'polisi', 'guru', 'kurir', 'penjual', 'rekan',
    'saudara', 'guru',
}


def _polite(rel):
    """Is this relation addressed in the polite register?"""
    return rel in POLITE_RELATIONS


# ------------------------------------------------------------------------ assembling
# The intended full set, in reading order. Only the ones whose module exists are built, so
# the bank can grow a topic at a time without the build breaking in between. Adding a topic
# means writing its module and adding its name here; the coverage check then holds it to the
# same standard as the rest.
TOPICS = [
    't00_sapaan', 't01_waktu', 't02_orang', 't03_makanan',
    't04_belanja', 't05_transportasi', 't06_arah', 't07_cuaca',
    't08_kesehatan', 't09_kantor', 't10_sekolah', 't11_keluarga',
    't12_hobi', 't13_perasaan', 't14_telepon', 't15_angka',
    't16_rumah', 't17_masalah',
]


# A snapshot of the shared lexicon, taken before any topic module runs. lexsurvey.py
# compares each topic's add_words() against this, so "this topic re-declares a base word"
# and "two topics disagree about a word" stay distinguishable.
LEX_BASE = dict(LEX)


def existing_topics():
    """The topic names in TOPICS whose module actually exists yet, in order."""
    return [n for n in TOPICS if os.path.exists(os.path.join(HERE, 'topics', n + '.py'))]


def assemble(topics=None):
    """The whole hand-written bank, in topic order.

    Each topic module registers its own vocabulary at import time and then builds its
    sentences, so by the time this returns, LEX holds every word the bank uses. The
    coverage check (every declared function filled, no undeclared function used) runs
    here, at the one place that sees every topic at once.
    """
    rows = []
    for name in (topics or existing_topics()):
        mod = importlib.import_module('topics.' + name)
        declared = set(getattr(mod, 'FUNCTIONS', {}))
        if not declared:
            raise ValueError(f'{name}: topic declares no FUNCTIONS')
        filled = set()
        for row in mod.SENTENCES:
            if row['fn'] not in declared:
                raise ValueError(
                    f'{name}: sentence {row["key"]!r} uses function {row["fn"]!r}, '
                    f'which the topic does not declare')
            filled.add(row['fn'])
        missing = declared - filled
        if missing:
            raise ValueError(f'{name}: declared but never written: {sorted(missing)}')
        for row in mod.SENTENCES:
            row['topic'] = name
        rows.extend(mod.SENTENCES)
    return rows


def coverage(topics=None):
    """topic -> {function: [sentence keys]}, for the coverage report."""
    out = {}
    for name in (topics or existing_topics()):
        mod = importlib.import_module('topics.' + name)
        per = {fn: [] for fn in getattr(mod, 'FUNCTIONS', {})}
        for row in mod.SENTENCES:
            per.setdefault(row['fn'], []).append(row['key'])
        out[name] = per
    return out


if __name__ == '__main__':
    names = existing_topics()
    rows = assemble(names)
    print(f'{len(rows)} sentences over {len(names)} of {len(TOPICS)} planned topics, '
          f'{len(LEX)} surfaces')
    print(f'  registers: ' + ', '.join(
        f'{k}={sum(1 for r in rows if r["who"] == k)}' for k in ('dekat', 'asing')))
    print(f'  politeness: ' + ', '.join(
        f'{k}={sum(1 for r in rows if r["politeness"] == k)}' for k in ('sopan', 'biasa')))
    print(f'  long (multi-clause): {sum(1 for r in rows if r.get("long"))}')
    print()
    cov = coverage(names)
    for name, per in cov.items():
        n = sum(len(v) for v in per.values())
        print(f'  {name:18s} {len(per):2d} functions, {n:3d} sentences')
