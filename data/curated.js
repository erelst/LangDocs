// The one narrative kept from the first version of this deck.
//
// It was written and read before anything else existed, and it is still the standard the rest of
// the deck is written to meet: it says something with a reason built into it, rather than fitting
// a frame with a noun dropped in. Everything else from that version is gone; this is the piece the
// reader has actually seen and asked to keep.
//
// The shape is the one in data/bank.js: one narrative, with blocks for its lines. The tokens are
// written out in full here, rather than left to data/lexicon.js, because this piece predates the
// lexicon and its glosses are the ones that were read and approved.
window.CURATED = [
  {
    key: 'kurasi06',
    topic: 'makan',
    jenis: 'cerita',
    judul: 'Makan di restoran dekat stasiun',
    judulEn: 'Eating at a cheap restaurant near the station',
    rel: 'teman',
    sit: 'Cerita panjang ke teman',
    sitEn: 'A longer story to a friend',
    id: 'Kemarin saya makan bersama teman di restoran murah dekat stasiun, dan makanannya sangat enak.',
    en: 'Yesterday I ate with a friend at a cheap restaurant near the station, and it was really good.',
    note: 'Kalimat majemuk: dua klausa disambung だけど, dengan ん sebagai penjelas. Bentuk ini yang membuat percakapan terasa mengalir.',
    noteEn: 'A compound sentence: two clauses joined by だけど, with ん as the explanatory. This is what makes speech flow.',
    blocks: [
      {
        t: [
          ["昨日、", "kinou,", "kemarin", "yesterday"],
          ["駅", "eki", "stasiun", "station"],
          ["の", "no", "partikel pemilik (dari)", "possessive particle"],
          ["近く", "chikaku", "dekat", "nearby"],
          ["安い", "yasui", "murah", "cheap"],
          ["レストラン", "resutoran", "restoran", "restaurant"],
          ["で", "de", "partikel tempat (di)", "location particle"],
          ["友達", "tomodachi", "teman", "friend"],
          ["と", "to", "partikel dengan", "with (particle)"],
          ["一緒に", "issho ni", "bersama-sama", "together"],
          ["ご飯", "gohan", "nasi / makanan", "rice / meal"],
          ["を", "o", "partikel objek", "object particle"],
          ["食べた", "tabeta", "makan (bentuk lampau)", "ate (past)"],
          ["ん", "n", "penjelas (kasual dari の)", "explanatory の (casual)"],
          ["だけど、", "dakedo,", "tapi / meskipun", "but / although"],
          ["とても", "totemo", "sangat", "very"],
          ["おいしかった", "oishikatta", "enak (bentuk lampau)", "was delicious (past)"],
          ["です。", "desu.", "adalah (sopan)", "is (polite copula)"]
        ]
      }
    ]
  }
];
