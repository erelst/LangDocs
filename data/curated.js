// The ten sentences kept from the first version of this deck.
//
// They were written and read before anything else existed, and one of them (the restaurant
// one) is the standard the rest of the deck is now written to meet: a sentence that says
// something, with a reason built into it, rather than a frame with a noun dropped in.
//
// t: [[kanji, romaji, gloss (ID), gloss (EN)], ...]  punctuation rides on the word before it
// who: 'dekat' (green chip, someone close) or 'asing' (yellow chip, someone distant)
// polite: 1 = です/ます speech, 0 = plain speech
window.CURATED = [
  {
    "key": "kurasi01",
    "who": "dekat",
    "polite": 1,
    "long": 0,
    "sit": "Kepada tetangga pada pagi hari (dekat, tapi tetap sopan)",
    "sitEn": "To a neighbour in the morning (familiar but polite)",
    "id": "Selamat pagi.",
    "en": "Good morning.",
    "note": "おはよう sendiri dipakai ke teman atau keluarga; tambah ございます untuk tetangga, atasan, orang baru.",
    "noteEn": "Use おはよう alone with friends or family; add ございます for neighbours, superiors, strangers.",
    "t": [
      [
        "おはよう",
        "ohayou",
        "selamat pagi (akrab)",
        "good morning (casual)"
      ],
      [
        "ございます。",
        "gozaimasu.",
        "bentuk sopan dari adalah/ada",
        "polite copula suffix"
      ]
    ],
    "whoId": "tetangga",
    "whoEn": "neighbour"
  },
  {
    "key": "kurasi02",
    "who": "asing",
    "polite": 1,
    "long": 0,
    "sit": "Kepada orang asing di jalan (sopan)",
    "sitEn": "To a stranger on the street (polite)",
    "id": "Permisi, tolong tunggu sebentar.",
    "en": "Excuse me, please wait a moment.",
    "note": "Urutan ちょっと + 待って + ください adalah pola permintaan sopan baku.",
    "noteEn": "ちょっと + 待って + ください is the standard polite request pattern.",
    "t": [
      [
        "すみません、",
        "sumimasen,",
        "permisi / maaf / terima kasih",
        "excuse me / sorry / thanks"
      ],
      [
        "ちょっと",
        "chotto",
        "sebentar / sedikit",
        "a little / a moment"
      ],
      [
        "待って",
        "matte",
        "menunggu (bentuk -te)",
        "wait (te-form)"
      ],
      [
        "ください。",
        "kudasai.",
        "tolong (permintaan sopan)",
        "please (polite request)"
      ]
    ],
    "whoId": "orang asing",
    "whoEn": "stranger"
  },
  {
    "key": "kurasi03",
    "who": "asing",
    "polite": 1,
    "long": 0,
    "sit": "Kepada petugas toko (menanyakan harga)",
    "sitEn": "To a shop attendant (asking the price)",
    "id": "Ini berapa harganya?",
    "en": "How much is this?",
    "note": "Pola pertanyaan paling sering di toko: これ + いくら + ですか.",
    "noteEn": "The most common shop question pattern: これ + いくら + ですか.",
    "t": [
      [
        "これ、",
        "kore,",
        "ini",
        "this"
      ],
      [
        "いくら",
        "ikura",
        "berapa (harga)",
        "how much"
      ],
      [
        "です",
        "desu",
        "adalah (sopan)",
        "is (polite copula)"
      ],
      [
        "か。",
        "ka.",
        "partikel tanya",
        "question particle"
      ]
    ],
    "whoId": "petugas toko",
    "whoEn": "shop attendant"
  },
  {
    "key": "kurasi04",
    "who": "dekat",
    "polite": 0,
    "long": 0,
    "sit": "Kepada teman dekat (ajakan santai)",
    "sitEn": "To a close friend (casual invitation)",
    "id": "Besok, pergi bersama?",
    "en": "Are we going together tomorrow?",
    "note": "Tanpa です/ます dan tanpa か, hanya intonasi naik. Khas percakapan dengan teman dekat.",
    "noteEn": "No です/ます and no か: rising intonation alone. Typical with close friends.",
    "t": [
      [
        "明日、",
        "ashita,",
        "besok",
        "tomorrow"
      ],
      [
        "一緒に",
        "issho ni",
        "bersama-sama",
        "together"
      ],
      [
        "行く",
        "iku",
        "pergi",
        "to go"
      ],
      [
        "？",
        "?",
        "intonasi naik = tanya (tanpa か)",
        "rising intonation = question (no か)"
      ]
    ],
    "whoId": "teman dekat",
    "whoEn": "close friend"
  },
  {
    "key": "kurasi05",
    "who": "dekat",
    "polite": 0,
    "long": 0,
    "sit": "Menyetujui lawan bicara (dekat)",
    "sitEn": "Agreeing with the other speaker (close)",
    "id": "Iya, benar ya.",
    "en": "Yeah, that is right.",
    "note": "ね muncul 38% dari semua partikel akhir kalimat, jauh di atas か (15%).",
    "noteEn": "ね is 38% of all sentence-final particles, far above か (15%).",
    "t": [
      [
        "そう",
        "sou",
        "begitu / seperti itu",
        "so / that way"
      ],
      [
        "だ",
        "da",
        "adalah (bentuk biasa)",
        "is (plain copula)"
      ],
      [
        "ね。",
        "ne.",
        "partikel meminta persetujuan",
        "agreement particle"
      ]
    ],
    "whoId": "orang yang sudah akrab",
    "whoEn": "someone you are close to"
  },
  {
    "key": "kurasi06",
    "who": "dekat",
    "polite": 1,
    "long": 1,
    "sit": "Cerita panjang ke teman",
    "sitEn": "A longer story to a friend",
    "id": "Kemarin saya makan bersama teman di restoran murah dekat stasiun, dan makanannya sangat enak.",
    "en": "Yesterday I ate with a friend at a cheap restaurant near the station, and it was really good.",
    "note": "Kalimat majemuk: dua klausa disambung だけど, dengan ん sebagai penjelas. Bentuk ini yang membuat percakapan terasa mengalir.",
    "noteEn": "A compound sentence: two clauses joined by だけど, with ん as the explanatory. This is what makes speech flow.",
    "t": [
      [
        "昨日、",
        "kinou,",
        "kemarin",
        "yesterday"
      ],
      [
        "駅",
        "eki",
        "stasiun",
        "station"
      ],
      [
        "の",
        "no",
        "partikel pemilik (dari)",
        "possessive particle"
      ],
      [
        "近く",
        "chikaku",
        "dekat",
        "nearby"
      ],
      [
        "安い",
        "yasui",
        "murah",
        "cheap"
      ],
      [
        "レストラン",
        "resutoran",
        "restoran",
        "restaurant"
      ],
      [
        "で",
        "de",
        "partikel tempat (di)",
        "location particle"
      ],
      [
        "友達",
        "tomodachi",
        "teman",
        "friend"
      ],
      [
        "と",
        "to",
        "partikel dengan",
        "with (particle)"
      ],
      [
        "一緒に",
        "issho ni",
        "bersama-sama",
        "together"
      ],
      [
        "ご飯",
        "gohan",
        "nasi / makanan",
        "rice / meal"
      ],
      [
        "を",
        "o",
        "partikel objek",
        "object particle"
      ],
      [
        "食べた",
        "tabeta",
        "makan (bentuk lampau)",
        "ate (past)"
      ],
      [
        "ん",
        "n",
        "penjelas (kasual dari の)",
        "explanatory の (casual)"
      ],
      [
        "だけど、",
        "dakedo,",
        "tapi / meskipun",
        "but / although"
      ],
      [
        "とても",
        "totemo",
        "sangat",
        "very"
      ],
      [
        "おいしかった",
        "oishikatta",
        "enak (bentuk lampau)",
        "was delicious (past)"
      ],
      [
        "です。",
        "desu.",
        "adalah (sopan)",
        "is (polite copula)"
      ]
    ],
    "whoId": "teman",
    "whoEn": "friend"
  },
  {
    "key": "kurasi07",
    "who": "dekat",
    "polite": 1,
    "long": 0,
    "sit": "Menyapa tetangga saat berpapasan (sopan, singkat)",
    "sitEn": "Greeting a neighbour in passing (polite, brief)",
    "id": "Selamat pagi. Cuacanya bagus ya.",
    "en": "Good morning. Nice weather, isn't it.",
    "note": "ね sendiri 38% dari semua partikel akhir kalimat, jauh di atas か (15%). Pembuka cuaca adalah basa-basi tersering ke tetangga.",
    "noteEn": "ね alone is 38% of all final particles, far above か (15%). Weather small talk is the most common opener with neighbours.",
    "t": [
      [
        "おはよう",
        "ohayou",
        "selamat pagi (akrab)",
        "good morning (casual)"
      ],
      [
        "ございます。",
        "gozaimasu.",
        "bentuk sopan dari adalah/ada",
        "polite copula suffix"
      ],
      [
        "いい",
        "ii",
        "bagus",
        "good"
      ],
      [
        "天気",
        "tenki",
        "cuaca",
        "weather"
      ],
      [
        "です",
        "desu",
        "adalah (sopan)",
        "is (polite copula)"
      ],
      [
        "ね。",
        "ne.",
        "ya kan (minta setuju)",
        "right？ / isn't it (agreement)"
      ]
    ],
    "whoId": "tetangga",
    "whoEn": "neighbour"
  },
  {
    "key": "kurasi08",
    "who": "asing",
    "polite": 1,
    "long": 0,
    "sit": "Menanyakan arah ke orang asing (sopan, tanpa menunjuk)",
    "sitEn": "Asking a stranger for directions (polite, no pointing)",
    "id": "Permisi, stasiunnya di sebelah mana?",
    "en": "Excuse me, which way is the station?",
    "note": "どちら bentuk sopan dari どこ; ke orang asing ですか + か jauh lebih aman daripada どこ? dengan intonasi naik.",
    "noteEn": "どちら is the polite form of どこ; with a stranger, ですか + か is far safer than a bare どこ? with rising intonation.",
    "t": [
      [
        "すみません、",
        "sumimasen,",
        "permisi (pembuka sopan)",
        "excuse me (polite opener)"
      ],
      [
        "駅",
        "eki",
        "stasiun",
        "station"
      ],
      [
        "は",
        "wa",
        "partikel topik",
        "topic particle"
      ],
      [
        "どちら",
        "dochira",
        "sebelah mana (sopan)",
        "which way (polite)"
      ],
      [
        "です",
        "desu",
        "adalah (sopan)",
        "is (polite copula)"
      ],
      [
        "か。",
        "ka.",
        "partikel tanya",
        "question particle"
      ]
    ],
    "whoId": "orang asing",
    "whoEn": "stranger"
  },
  {
    "key": "kurasi09",
    "who": "asing",
    "polite": 1,
    "long": 0,
    "sit": "Menawarkan bantuan ke orang asing (sopan)",
    "sitEn": "Offering help to a stranger (polite)",
    "id": "Ada yang bisa saya bantu?",
    "en": "Is there anything I can help you with?",
    "note": "Pola tawaran sopan: 何か + お + kata kerja + しましょうか. Bentuk ini dipakai ke orang asing atau pelanggan.",
    "noteEn": "Polite offer pattern: 何か + お + verb stem + しましょうか. Used with strangers or customers.",
    "t": [
      [
        "何か",
        "nanika",
        "sesuatu",
        "something"
      ],
      [
        "お手伝い",
        "otetsudai",
        "bantuan (sopan)",
        "help (polite)"
      ],
      [
        "しましょう",
        "shimashou",
        "mari saya lakukan (usulan sopan)",
        "let me / shall I (polite offer)"
      ],
      [
        "か。",
        "ka.",
        "partikel tanya",
        "question particle"
      ]
    ],
    "whoId": "orang asing",
    "whoEn": "stranger"
  },
  {
    "key": "kurasi10",
    "who": "dekat",
    "polite": 0,
    "long": 0,
    "sit": "Menanyakan kabar ke teman dekat (santai)",
    "sitEn": "Asking a close friend how they are (casual)",
    "id": "Hari ini sehat?",
    "en": "You doing okay today?",
    "note": "Ke teman dekat, か sering hilang dan tanya cukup lewat intonasi naik. Ini sisi \"biasa\" dari pembedaan register.",
    "noteEn": "With a close friend, か is often dropped and rising intonation alone marks the question. This is the casual side of the register split.",
    "t": [
      [
        "今日、",
        "kyou,",
        "hari ini",
        "today"
      ],
      [
        "元気",
        "genki",
        "sehat / bersemangat",
        "well / energetic"
      ],
      [
        "？",
        "?",
        "intonasi naik = tanya (tanpa か)",
        "rising intonation = question (no か)"
      ]
    ],
    "whoId": "teman dekat",
    "whoEn": "close friend"
  }
];
