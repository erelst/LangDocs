#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Categorised vocabulary used by scripts/generate.py.

Every entry is (kanji, romaji, gloss_id, gloss_en).

The categories exist so the sentence templates can be grammatical BY
CONSTRUCTION rather than by hand-checking hundreds of sentences: a template
asserts which particle a slot needs, and only words from a compatible category
may fill it. `食べました` can therefore only ever receive a FOOD, never a place.

Romaji is Hepburn without macrons (ou, uu), matching the hand-written sentences
in the curated list in sentences.py, such as "Ohayou gozaimasu" and "Kinou".
"""

# ---------------------------------------------------------------- nouns
PLACE = [
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
    ('空港', 'kuukou', 'bandara', 'airport'),
    ('ホテル', 'hoteru', 'hotel', 'hotel'),
    ('大学', 'daigaku', 'universitas', 'university'),
    ('店', 'mise', 'toko', 'shop'),
    ('トイレ', 'toire', 'toilet', 'toilet'),
    ('交番', 'kouban', 'pos polisi', 'police box'),
    ('美容院', 'biyouin', 'salon', 'hair salon'),
    ('薬局', 'yakkyoku', 'apotek', 'pharmacy'),
    ('駐車場', 'chuushajou', 'tempat parkir', 'parking lot'),
    ('デパート', 'depaato', 'department store', 'department store'),
    ('本屋', 'hon\'ya', 'toko buku', 'bookstore'),
    ('席', 'seki', 'tempat duduk', 'seat'),
    ('受付', 'uketsuke', 'resepsionis', 'reception desk'),
]

FOOD = [
    ('ご飯', 'gohan', 'nasi', 'rice'),
    ('パン', 'pan', 'roti', 'bread'),
    ('卵', 'tamago', 'telur', 'egg'),
    ('肉', 'niku', 'daging', 'meat'),
    ('魚', 'sakana', 'ikan', 'fish'),
    ('野菜', 'yasai', 'sayur', 'vegetables'),
    ('果物', 'kudamono', 'buah', 'fruit'),
    ('りんご', 'ringo', 'apel', 'apple'),
    ('バナナ', 'banana', 'pisang', 'banana'),
    ('みかん', 'mikan', 'jeruk mandarin', 'mandarin orange'),
    ('ラーメン', 'raamen', 'ramen', 'ramen'),
    ('寿司', 'sushi', 'sushi', 'sushi'),
    ('カレー', 'karee', 'kari', 'curry'),
    ('天ぷら', 'tenpura', 'tempura', 'tempura'),
    ('弁当', 'bentou', 'bento', 'boxed lunch'),
    ('おにぎり', 'onigiri', 'nasi kepal', 'rice ball'),
    ('味噌汁', 'misoshiru', 'sup miso', 'miso soup'),
    ('うどん', 'udon', 'udon', 'udon'),
    ('そば', 'soba', 'soba', 'soba'),
    ('ケーキ', 'keeki', 'kue', 'cake'),
    ('チョコレート', 'chokoreeto', 'cokelat', 'chocolate'),
    ('アイスクリーム', 'aisukuriimu', 'es krim', 'ice cream'),
    ('サンドイッチ', 'sandoitchi', 'sandwich', 'sandwich'),
    ('豆腐', 'toufu', 'tahu', 'tofu'),
    ('納豆', 'nattou', 'natto', 'natto'),
]

DRINK = [
    ('水', 'mizu', 'air', 'water'),
    ('お茶', 'ocha', 'teh', 'tea'),
    ('コーヒー', 'koohii', 'kopi', 'coffee'),
    ('ジュース', 'juusu', 'jus', 'juice'),
    ('ビール', 'biiru', 'bir', 'beer'),
    ('牛乳', 'gyuunyuu', 'susu', 'milk'),
    ('ワイン', 'wain', 'anggur', 'wine'),
    ('お酒', 'osake', 'sake', 'sake'),
    ('紅茶', 'koucha', 'teh hitam', 'black tea'),
    ('炭酸水', 'tansansui', 'air soda', 'sparkling water'),
    ('麦茶', 'mugicha', 'teh barley', 'barley tea'),
]

OBJECT = [
    ('傘', 'kasa', 'payung', 'umbrella'),
    ('財布', 'saifu', 'dompet', 'wallet'),
    ('携帯', 'keitai', 'ponsel', 'mobile phone'),
    ('鍵', 'kagi', 'kunci', 'key'),
    ('鞄', 'kaban', 'tas', 'bag'),
    ('眼鏡', 'megane', 'kacamata', 'glasses'),
    ('時計', 'tokei', 'jam', 'watch / clock'),
    ('本', 'hon', 'buku', 'book'),
    ('ノート', 'nooto', 'buku catatan', 'notebook'),
    ('ボールペン', 'boorupen', 'pulpen', 'pen'),
    ('薬', 'kusuri', 'obat', 'medicine'),
    ('切符', 'kippu', 'tiket', 'ticket'),
    ('地図', 'chizu', 'peta', 'map'),
    ('写真', 'shashin', 'foto', 'photograph'),
    ('お金', 'okane', 'uang', 'money'),
    ('現金', 'genkin', 'uang tunai', 'cash'),
    ('カード', 'kaado', 'kartu', 'card'),
    ('ビニール袋', 'biniiru bukuro', 'kantong plastik', 'plastic bag'),
    ('ハンカチ', 'hankachi', 'saputangan', 'handkerchief'),
    ('ティッシュ', 'tisshu', 'tisu', 'tissue'),
    ('マスク', 'masuku', 'masker', 'mask'),
    ('電池', 'denchi', 'baterai', 'battery'),
    ('充電器', 'juudenki', 'pengisi daya', 'charger'),
    ('イヤホン', 'iyahon', 'earphone', 'earphones'),
    ('パソコン', 'pasokon', 'komputer', 'computer'),
    ('手帳', 'techou', 'buku agenda', 'planner'),
    ('名刺', 'meishi', 'kartu nama', 'business card'),
    ('封筒', 'fuutou', 'amplop', 'envelope'),
    ('はさみ', 'hasami', 'gunting', 'scissors'),
    ('テープ', 'teepu', 'selotip', 'tape'),
]

TOPIC = [
    ('音楽', 'ongaku', 'musik', 'music'),
    ('映画', 'eiga', 'film', 'movie'),
    ('スポーツ', 'supootsu', 'olahraga', 'sports'),
    ('旅行', 'ryokou', 'perjalanan', 'travel'),
    ('料理', 'ryouri', 'masakan', 'cooking'),
    ('読書', 'dokusho', 'membaca', 'reading'),
    ('絵', 'e', 'lukisan', 'painting'),
    ('歌', 'uta', 'lagu', 'song'),
    ('ゲーム', 'geemu', 'permainan', 'game'),
    ('アニメ', 'anime', 'anime', 'anime'),
    ('日本語', 'nihongo', 'bahasa Jepang', 'Japanese language'),
    ('英語', 'eigo', 'bahasa Inggris', 'English language'),
    ('漢字', 'kanji', 'kanji', 'kanji'),
    ('歴史', 'rekishi', 'sejarah', 'history'),
    ('科学', 'kagaku', 'sains', 'science'),
    ('数学', 'suugaku', 'matematika', 'mathematics'),
    ('経済', 'keizai', 'ekonomi', 'economics'),
    ('政治', 'seiji', 'politik', 'politics'),
    ('天気', 'tenki', 'cuaca', 'weather'),
    ('犬', 'inu', 'anjing', 'dog'),
    ('猫', 'neko', 'kucing', 'cat'),
    ('海', 'umi', 'laut', 'sea'),
    ('山', 'yama', 'gunung', 'mountain'),
    ('富士山', 'fujisan', 'Gunung Fuji', 'Mount Fuji'),
]

PERSON = [
    ('友達', 'tomodachi', 'teman', 'friend'),
    ('先生', 'sensei', 'guru', 'teacher'),
    ('家族', 'kazoku', 'keluarga', 'family'),
    ('母', 'haha', 'ibu', 'mother'),
    ('父', 'chichi', 'ayah', 'father'),
    ('兄', 'ani', 'kakak laki-laki', 'older brother'),
    ('姉', 'ane', 'kakak perempuan', 'older sister'),
    ('弟', 'otouto', 'adik laki-laki', 'younger brother'),
    ('妹', 'imouto', 'adik perempuan', 'younger sister'),
    ('子供', 'kodomo', 'anak', 'child'),
    ('近所の人', 'kinjo no hito', 'tetangga', 'neighbour'),
]

TIME = [
    ('今日', 'kyou', 'hari ini', 'today'),
    ('明日', 'ashita', 'besok', 'tomorrow'),
    ('昨日', 'kinou', 'kemarin', 'yesterday'),
    ('今朝', 'kesa', 'pagi ini', 'this morning'),
    ('今晩', 'konban', 'malam ini', 'tonight'),
    ('来週', 'raishu', 'minggu depan', 'next week'),
    ('先週', 'senshu', 'minggu lalu', 'last week'),
    ('毎日', 'mainichi', 'setiap hari', 'every day'),
]

# ---------------------------------------------------------------- English forms
# The word gloss shows the SINGULAR form, because that is what a learner is
# learning. An English translation phrase needs a different form though: "I bought
# umbrellas" is right, "I bought umbrella" is not. So plurals are derived here and
# mass nouns are listed explicitly instead of being guessed at.
UNCOUNTABLE = {
    'rice', 'bread', 'meat', 'fish', 'curry', 'tempura', 'sushi', 'ramen', 'udon',
    'soba', 'udon', 'cake', 'chocolate', 'ice cream', 'tofu', 'natto', 'miso soup',
    'boxed lunch', 'water', 'tea', 'coffee', 'juice', 'beer', 'milk', 'wine',
    'sake', 'black tea', 'sparkling water', 'barley tea', 'medicine', 'money',
    'cash', 'tape', 'scissors', 'glasses', 'earphones', 'music', 'sports',
    'travel', 'cooking', 'reading', 'history', 'science', 'maths', 'economics',
    'politics', 'anime', 'weather', 'kanji', 'Japanese', 'English', 'fruit',
}

IRREGULAR_PLURAL = {
    'watch': 'watches',
    'photo': 'photos',
    'sandwich': 'sandwiches',
    'box': 'boxes',
    'child': 'children',
    'person': 'people',
}

# Words whose phrase form is neither the gloss nor its plural.
EN_SPECIAL = {
    '海': 'the sea',
    '富士山': 'Mount Fuji',
    '天気': 'the weather',
}

# Categories that read as a definite place in an English frame.
EN_AS_DEFINITE_PLACE = {'PLACE'}
# Categories that need a possessive in an English frame.
EN_AS_MY = {'PERSON'}


def english_phrase(word):
    """The form of an English gloss that fits inside a translation phrase."""
    kanji, romaji, gid, gen = word
    if kanji in EN_SPECIAL:
        return EN_SPECIAL[kanji]
    if gen in UNCOUNTABLE:
        return gen
    if gen in IRREGULAR_PLURAL:
        return IRREGULAR_PLURAL[gen]
    if gen.endswith(('s', 'x', 'z', 'ch', 'sh')):
        return gen + 'es'
    if gen.endswith('y') and gen[-2:-1] not in 'aeiou':
        return gen[:-1] + 'ies'
    return gen + 's'




# ------------------------------------------------------------- compatibility
# Grammar alone is not enough. 大学でお金を買いました is a well-formed sentence and a
# nonsense one: 買う needs something purchasable, 食べる needs a place where eating
# happens. So the slots are narrowed by meaning, not only by part of speech. These
# sets list the members of the general category that fit each frame.

EAT_PLACES = {'レストラン', 'カフェ', 'ホテル', '公園', '大学', '空港'}
SHOP_PLACES = {'コンビニ', 'スーパー', '店', 'デパート', '本屋', '薬局'}
MEET_PLACES = {'駅', '公園', 'カフェ', 'レストラン', '大学', '会社', '空港',
               'ホテル', '受付', '店', '図書館'}
WAIT_PLACES = {'駅', '公園', '受付', 'カフェ', '店', '空港', 'ホテル'}

# お金 and 現金 cannot be bought, so they are excluded from the buying frame only
# and stay available for 忘れました / ありますか.
NOT_PURCHASABLE = {'お金', '現金'}


def _subset(words, names):
    return [w for w in words if w[0] in names]


PLACE_EAT = _subset(PLACE, EAT_PLACES)
PLACE_SHOP = _subset(PLACE, SHOP_PLACES)
PLACE_MEET = _subset(PLACE, MEET_PLACES)
PLACE_WAIT = _subset(PLACE, WAIT_PLACES)
OBJECT_BUY = [w for w in OBJECT if w[0] not in NOT_PURCHASABLE]

# ---------------------------------------------------------------- tense concord
# 昨日 cannot go with 食べます and 明日 cannot go with 食べました. A time expression
# therefore has to agree with the verb's tense, so the words are split and every
# template declares which side it is on (its `tense` key).
TIME_PAST = [w for w in TIME if w[0] in {'今日', '昨日', '今朝', '先週', '毎日'}]
TIME_NONPAST = [w for w in TIME if w[0] in {'今日', '明日', '今晩', '来週', '毎日'}]

CATEGORIES = {
    'PLACE': PLACE,
    'PLACE_EAT': PLACE_EAT,
    'PLACE_SHOP': PLACE_SHOP,
    'PLACE_MEET': PLACE_MEET,
    'PLACE_WAIT': PLACE_WAIT,
    'OBJECT_BUY': OBJECT_BUY,
    'TIME_PAST': TIME_PAST,
    'TIME_NONPAST': TIME_NONPAST,
    'FOOD': FOOD,
    'DRINK': DRINK,
    'OBJECT': OBJECT,
    'TOPIC': TOPIC,
    'PERSON': PERSON,
    'TIME': TIME,
}
