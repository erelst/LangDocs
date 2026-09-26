// The one narrative kept from the first version of this deck.
//
// It was written and read before anything else existed, and it is still the standard the rest of
// the deck is written to meet: it says something with a reason built into it, rather than fitting
// a frame with a noun dropped in. Everything else from that version is gone; this is the piece the
// reader has actually seen and asked to keep.
//
// The shape is the one in data/bank.js: one narrative, with blocks for its lines. The tokens are
// plain surfaces, so the romaji and glosses come from data/lexicon.js like every other narrative.
// They used to be written out in full here, which was a mistake: nine of the eighteen tokens then
// described themselves differently from the lexicon (で was "location particle" here and "by, with"
// there), and that is exactly the drift K7 exists to prevent.
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
    id: 'Kemarin saya makan bersama teman di restoran murah dekat stasiun. Restorannya kecil, tetapi makanannya sangat enak, dan saya ingin kembali lagi akhir pekan ini.',
    en: 'Yesterday I ate with a friend at a cheap restaurant near the station. The place was small, but the food was really good, and I want to go back again this weekend.',
    note: 'Kalimat pertama tetap seperti aslinya, karena bentuk itu yang jadi patokan mutu deck ini: dua klausa disambung だけど, dengan ん sebagai penjelas. Dua paragraf berikutnya menambahkan yang tidak ada di kalimat pertama: ukuran tempatnya, dan apa yang ingin dilakukan lagi. Tanpa itu, ceritanya berhenti sebelum ada gunanya.',
    noteEn: 'The first sentence stays as it was, because that shape is what the rest of the deck is measured against: two clauses joined by だけど, with ん as the explanatory. The two paragraphs after it add what the single sentence lacked: the size of the place, and what the person wants to do next. Without those, the story stops before it is useful.',
    blocks: [
      { t: ['昨日、', '駅', 'の', '近く', '安い', 'レストラン', 'で', '友達', 'と', '一緒に', 'ご飯', 'を', '食べた', 'ん', 'だけど、', 'とても', 'おいしかった', 'です。'] },
      { t: ['店', 'は', 'カウンター', 'だけ', 'の', '小さな', '所', 'で、', '十三時', 'を', '過ぎて', 'いた', 'のに、', '三組', 'も', '並んで', 'いました。'] },
      { t: ['日替わり', 'が', '千円', '以下', 'だった', 'ので', '頼んで', 'みた', 'のですが、', '思った', 'より', '量', 'が', '多く、', '友達', 'と', '半分', 'ずつ', '交換', 'しました。'] },
      { t: ['今度', 'は', '空いて', 'いる', '時間', 'に', '行って、', '今週末', 'もう', '一度', '食べ', 'に', '行きたい', 'と', '思って', 'います。'] }
    ]
  }
];
