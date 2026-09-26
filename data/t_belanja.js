/* Belanja: what a person actually says in a shop, in order.
 *
 * Written to the standard the reader set with the restaurant sentence: a sentence should SAY
 * something. It should state a need, explain a reason, or open a conversation, and a long
 * sentence should be long because it carries more meaning rather than because a connector
 * was bolted on. So most of what is here is a sentence with a reason in it.
 *
 * The short ones are kept only where the short one is what people really say and a longer
 * version would be strange: 「これ、ください。」 is how you buy something.
 *
 * t holds the surfaces in order; data/lexicon.js supplies the romaji and the two glosses, and
 * punctuation rides on the word before it.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menanyakan barang yang tidak terlihat, dengan menyebut keperluannya
 * - menanyakan harga, ukuran, warna, dan stok
 * - meminta potongan, menanyakan obral, menanyakan kapan barang masuk
 * - memutuskan: mengambil, meninggalkan, menunda pembelian
 * - membayar: cara bayar, uang kurang, minta struk, minta kantong
 * - mengembalikan dan menukar barang, termasuk yang rusak
 * - menanyakan garansi, tanggal kedaluwarsa, dan pengiriman
 * - kejadian di toko: antrean, keranjang, petugas yang menawarkan bantuan
 * Tidak termasuk:
 * - memasak dan makan bahan yang dibeli, masuk ke `makan`
 * - mengurus tagihan rumah tangga, masuk ke `rumah_tugas`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'belanja_percakapan_tanya_barang', topic: 'belanja', jenis: 'percakapan',
    judul: 'Menanyakan barang yang tidak terlihat', judulEn: 'Asking for something not on the shelf',
    speakers: {'A':'petugas_toko','B':'orang_asing'},
    sit: 'Menanyakan barang yang tidak ada di rak, dan ditawari pilihan lain', sitEn: 'Asking for an item that is not on the shelf and being offered another',
    id: 'Saya menanyakan ukuran lain, petugas memeriksa di belakang, dan menawarkan versi yang sedikit lebih mahal.',
    en: 'I ask for another size, the attendant checks in the back, and offers a slightly pricier version.',
    note: 'Percakapan di toko berguna karena yang melayani menyebut apa yang dia periksa, bukan hanya mengatakan tidak ada.',
    noteEn: 'A shop conversation is useful because the attendant says what they checked, not only that there is none.',
    blocks: [
      { sp: 'B', t: ['すみません', '、', 'この', 'シャツ', 'の', '大きい', 'サイズ', 'は', 'あり', 'ます', 'か', '。'] },
      { sp: 'A', t: ['少々', 'お待ち', 'ください', '。', '奥', 'を', '見て', 'き', 'ます', '。'] },
      { sp: 'A', t: ['お待たせ', 'しました', '。', '同じ', '色', 'の', 'L', 'サイズ', 'は', 'ござい', 'ません', 'でした', '。'] },
      { sp: 'B', t: ['そう', 'です', 'か', '。', '別', 'の', '色', 'なら', 'あり', 'ます', 'か', '。'] },
      { sp: 'A', t: ['青', 'と', '白', 'なら', 'ござい', 'ます', '。', 'ただ', '、', 'こちら', 'は', '少し', '高い', 'の', 'です', 'が', '。'] },
      { sp: 'B', t: ['値段', 'は', 'いくら', 'です', 'か', '。'] },
      { sp: 'A', t: ['千五百円', 'に', 'なり', 'ます', '。', '試着', 'も', 'でき', 'ます', 'よ', '。'] },
    ]
  },
  {
    key: 'belanja_cerita_kembali_ke_toko', topic: 'belanja', jenis: 'cerita',
    judul: 'Kembali ke toko karena ukurannya salah', judulEn: 'Going back to the shop because the size was wrong',
    rel: 'petugas_toko',
    sit: 'Menceritakan pengembalian barang yang ternyata kekecilan', sitEn: 'Recounting returning an item that turned out too small',
    id: 'Saya membeli baju yang ternyata kekecilan, kembali keesokan harinya tanpa struk, dan tetap bisa ditukar karena labelnya masih ada.',
    en: 'I bought a shirt that turned out too small, went back the next day without the receipt, and could still exchange it because the tag was on.',
    note: 'Yang menyelamatkan pengembalian bukan struk, melainkan label yang belum dilepas, dan itu sebabnya labelnya disebut.',
    noteEn: 'What saved the return was not the receipt but the tag still being attached, which is why the tag is mentioned.',
    blocks: [
      { t: ['先週', '、', '店', 'で', 'シャツ', 'を', '買った', 'の', 'です', 'が', '、', '家', 'で', '着て', 'みたら', '小さくて', '入り', 'ません', 'でした', '。'] },
      { t: ['レシート', 'は', '捨てて', 'しまった', 'の', 'です', 'が', '、', '札', 'は', 'まだ', '付いた', 'まま', 'です', '。'] },
      { t: ['翌日', '、', '同じ', '店', 'に', '持って', '行って', '、', '訳', 'を', '話して', 'み', 'ました', '。'] },
      { t: ['店員', 'さん', 'は', '札', 'を', '確認', 'して', '、', '同じ', '物', 'の', '大きい', 'サイズ', 'と', '替えて', 'くれました', '。'] },
      { t: ['おかげで', '、', 'お金', 'は', '戻らず', '、', 'そのまま', '着られる', '物', 'に', 'なり', 'ました', '。'] },
    ]
  },
  {
    key: 'belanja_kronologi_pagi_potongan', topic: 'belanja', jenis: 'kronologi',
    judul: 'Mengejar potongan pagi', judulEn: 'Chasing the morning discount',
    rel: 'teman',
    sit: 'Menceritakan urutan belanja pagi demi potongan, dari sebelum buka sampai membayar', sitEn: 'Recounting a morning trip for a discount, from before opening to paying',
    id: 'Saya datang lima belas menit sebelum toko buka, mendapat barang yang dituju, tetapi mengantre dua puluh menit karena kasirnya baru dua.',
    en: 'I arrived fifteen minutes before the shop opened, got what I came for, but queued twenty minutes because only two tills were open.',
    note: 'Urutannya diikat ので dan たら, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by ので and たら, so each line explains the one before it.',
    blocks: [
      { t: ['朝', '八時', 'の', '開店', 'に', '合わせて', '行った', 'ので', '、', '十五分', '前', 'に', '着いて', '並び', 'ました', '。'] },
      { t: ['目当て', 'の', '物', 'は', 'まだ', '残って', 'いて', '、', '思った', 'より', '安く', '買え', 'ました', '。'] },
      { t: ['ところが', '、', 'レジ', 'が', '二つ', 'しか', '開いて', 'い', 'なかった', 'ので', '、', '会計', 'の', '列', 'が', '長く', 'なり', 'ました', '。'] },
      { t: ['二十分', 'ほど', '並んで', '、', 'やっと', '払え', 'た', 'とき', 'に', 'は', '、', '開店', 'から', '一時間', 'たって', 'いました', '。'] },
      { t: ['安く', '買え', 'た', 'の', 'は', 'よかった', 'の', 'です', 'が', '、', '時間', 'まで', '得', 'した', 'わけ', 'で', 'は', 'あり', 'ません', 'でした', '。'] },
    ]
  },
  {
    key: 'belanja_curhatan_harga_naik', topic: 'belanja', jenis: 'curhatan',
    judul: 'Harga yang naik terus', judulEn: 'Prices that keep going up',
    rel: 'teman_dekat',
    sit: 'Mengeluh soal harga kebutuhan yang naik, tanpa minta saran', sitEn: 'Venting about rising prices, without asking for advice',
    id: 'Harga telur, minyak, dan sayur naik, isi kemasan menyusut, dan saya sadar belanja bulanan sudah tidak cukup.',
    en: 'Eggs, oil and vegetables have gone up, packets have shrunk, and I have noticed the monthly shop no longer covers it.',
    note: 'Bentuk biasa dan tanpa permintaan solusi; keluhannya diarahkan ke keadaan, bukan ke orang.',
    noteEn: 'Plain style with no request for a solution; the complaint aims at the situation, not a person.',
    blocks: [
      { t: ['最近', '、', '卵', 'も', '油', 'も', '値段', 'が', '上がって', '、', '前', 'と', '同じ', '金額', 'で', '買える', '物', 'が', '減った', 'んだ', 'よ', '。'] },
      { t: ['しかも', '、', '袋', 'が', '小さく', 'なって', 'いる', 'から', '、', '値段', 'が', '同じ', 'でも', '中身', 'は', '少ない', '。'] },
      { t: ['先月', 'の', '買い物', 'の', '記録', 'を', '見たら', '、', '同じ', '物', 'で', '千円', 'も', '多く', '払って', 'いた', '。'] },
      { t: ['安い', '店', 'を', '回る', 'ように', 'した', 'けど', '、', 'その', 'ぶん', '時間', 'が', '消えて', '、', '疲れる', 'だけ', 'だ', '。'] },
      { t: ['節約', 'の', '方法', 'を', '聞きたい', 'わけ', 'じゃ', 'なくて', '、', 'ただ', 'みんな', 'も', '同じ', 'な', 'の', 'か', '知り', 'たい', 'だけ', '。'] },
    ]
  },
  {
    key: 'belanja_keluhan_kasir_lambat', topic: 'belanja', jenis: 'keluhan',
    judul: 'Antrean yang tidak dibuka meski panjang', judulEn: 'A queue nobody opens another till for',
    rel: 'petugas_toko',
    sit: 'Menyampaikan keluhan soal antrean sore ke petugas toko', sitEn: 'Complaining to shop staff about the evening queue',
    id: 'Saya memberi tahu bahwa antrean sore selalu satu kasir padahal sibuk, dan meminta jam sibuk ditambah kasir.',
    en: 'I point out that the evening queue always has one till even though it is busy, and ask for another till at peak hours.',
    note: 'Keluhan yang bisa ditindaklanjuti menyebut waktu, jumlah antrean, dan permintaannya, tanpa menyerang orangnya.',
    noteEn: 'An actionable complaint gives the time, the queue, and the request, without attacking the person.',
    blocks: [
      { t: ['すみません', '、', '少し', 'お話', 'したい', 'こと', 'が', 'ある', 'の', 'です', 'が', '。'] },
      { t: ['夕方', 'の', '六時', 'ごろ', 'は', 'いつも', 'レジ', 'が', '一つ', 'だけで', '、', '十人', '以上', '並んで', 'います', '。'] },
      { t: ['その', '時間', 'に', '買い物', 'に', '来', 'なければ', 'ならない', '人', 'は', '、', '毎回', '二十分', '待って', 'います', '。'] },
      { t: ['忙しい', '時間', 'だけ', 'でも', '、', 'レジ', 'を', 'もう', '一つ', '開けて', 'いただけ', 'ません', 'か', '。'] },
      { t: ['朝', 'は', '空いて', 'いる', 'ので', '、', 'その', '時間', 'だけ', 'で', '構い', 'ません', '。'] },
    ]
  },
  {
    key: 'belanja_penjelasan_garansi', topic: 'belanja', jenis: 'penjelasan',
    judul: 'Cara kerja garansi dan pengembalian', judulEn: 'How the warranty and returns work',
    rel: 'petugas_toko',
    sit: 'Menerangkan syarat pengembalian barang yang rusak kepada pembeli', sitEn: 'Explaining the conditions for returning a broken item to a buyer',
    id: 'Saya menerangkan bahwa barang bisa dikembalikan dalam dua minggu bila rusak sendiri, bahwa barang bekas pakai berbeda, dan bahwa struk mempercepat prosesnya.',
    en: 'I explain that an item can be returned within two weeks if it broke by itself, that used items differ, and that the receipt speeds things up.',
    note: 'Penjelasan yang berguna memisahkan dua keadaan yang mirip lebih dulu, karena pembaca biasanya salah satu di antaranya.',
    noteEn: 'A useful explanation separates two similar cases first, because the listener is usually in one of them.',
    blocks: [
      { t: ['まず', '、', '初期', '不良', 'と', 'そう', 'で', 'ない', '場合', 'は', '分けて', '考え', 'ます', '。'] },
      { t: ['買って', '二週間', '以内', 'に', '、', '使い方', 'が', '原因', 'で', 'は', 'ない', '故障', 'なら', '、', '無償', 'で', '替え', 'ます', '。'] },
      { t: ['ただ', '、', '同じ', '期間', 'でも', '、', 'お客様', 'の', '使い方', 'で', '壊れた', '物', 'は', '有償', '修理', 'に', 'なり', 'ます', '。'] },
      { t: ['その', '違い', 'は', '店', 'で', '調べ', 'ます', 'ので', '、', '判断', 'が', 'つか', 'ない', 'とき', 'は', 'そのまま', '持って', '来て', 'ください', '。'] },
      { t: ['レシート', 'が', 'ある', 'と', '、', '買った', '日', 'の', '確認', 'が', '早く', '済み', 'ます', '。'] },
    ]
  },
  {
    key: 'belanja_laporan_stok_habis', topic: 'belanja', jenis: 'laporan',
    judul: 'Melaporkan persediaan yang habis', judulEn: 'Reporting that stock has run out',
    rel: 'rekan',
    sit: 'Melaporkan ke rekan kerja bahwa satu barang habis dan yang sudah dipesan belum datang', sitEn: 'Reporting to a colleague that one item is out and the order has not arrived',
    id: 'Saya melaporkan bahwa stok susu habis sejak pagi, bahwa pesanannya belum datang, dan apa yang bisa dikatakan ke pembeli.',
    en: 'I report that the milk has been out since morning, that the order has not arrived, and what to tell customers meanwhile.',
    note: 'Laporan kerja menyebut apa yang sudah, apa yang belum, dan apa yang perlu dilakukan orang lain.',
    noteEn: 'A work report states what is done, what is not, and what others need to do.',
    blocks: [
      { t: ['報告', 'です', '。', '牛乳', 'は', '今朝', 'から', '棚', 'が', '空いて', 'います', '。'] },
      { t: ['昨日', 'の', '夕方', 'に', '発注', 'は', 'して', 'ある', 'の', 'です', 'が', '、', 'まだ', '届いて', 'い', 'ません', '。'] },
      { t: ['配送', 'に', '確認', 'した', 'ところ', '、', '明日', 'の', '午前', 'に', 'なる', 'そう', 'です', '。'] },
      { t: ['それ', 'まで', '、', 'お客様', 'に', 'は', '別', 'の', 'メーカー', 'の', '物', 'を', '案内', 'して', 'います', '。'] },
      { t: ['入荷', 'した', 'ら', '、', '棚', 'に', '出す', '前', 'に', '一声', 'かけて', 'ください', '。'] },
    ]
  },
  {
    key: 'belanja_rencana_belanja_bulanan', topic: 'belanja', jenis: 'rencana',
    judul: 'Rencana belanja bulanan', judulEn: 'Planning the monthly shop',
    rel: 'pasangan',
    sit: 'Menyusun rencana belanja bulanan berdua, dengan urutan prioritas', sitEn: 'Planning the monthly shop together, setting an order of priority',
    id: 'Kami menyusun daftar menurut prioritas, menetapkan batas anggaran, dan memutuskan apa yang ditunda bila uangnya kurang.',
    en: 'We make a list in order of priority, set a spending limit, and decide what gets postponed if the money runs short.',
    note: 'Rencana yang berguna menyebut apa yang dikorbankan lebih dulu, bukan hanya apa yang dibeli.',
    noteEn: 'A useful plan says what is sacrificed first, not only what is bought.',
    blocks: [
      { t: ['今月', 'の', '買い物', 'は', '、', '先に', '必要な', '物', 'を', '全部', '書き出して', 'から', '行こう', '。'] },
      { t: ['米', 'と', '油', 'と', '洗剤', 'は', '絶対', 'に', '要る', 'けど', '、', '菓子', 'は', '後', 'で', 'いい', '。'] },
      { t: ['予算', 'は', '二万円', 'まで', 'に', 'して', '、', '超えそう', 'なら', '肉', 'の', '量', 'を', '減らす', '。'] },
      { t: ['安い', '日', 'が', 'ある', '店', 'と', '、', '質', 'が', 'いい', '店', 'を', '分けて', '回る', 'の', 'が', '結局', '得', 'だ', 'よ', '。'] },
      { t: ['足りなく', 'なった', 'ら', '、', '次', 'の', '週', 'に', '回して', '、', '一度', 'に', '全部', '買わ', 'ない', 'こと', 'に', 'しよう', '。'] },
    ]
  },
  {
    key: 'belanja_nasihat_jangan_beli_karena_obral', topic: 'belanja', jenis: 'nasihat',
    judul: 'Jangan beli hanya karena obral', judulEn: 'Do not buy just because it is on sale',
    rel: 'teman',
    sit: 'Menasihati teman supaya tidak membeli karena potongan saja', sitEn: 'Advising a friend not to buy merely because of a discount',
    id: 'Saya menyarankan menghitung harga per pemakaian, bukan harga potongannya, karena barang murah yang tidak dipakai tetap mahal.',
    en: 'I suggest working out the price per use rather than the discount, because a cheap thing you never use is still expensive.',
    note: 'Nasihat yang berguna memberi ukuran yang bisa dipakai, bukan hanya melarang.',
    noteEn: 'Useful advice gives a measure the listener can apply, not just a prohibition.',
    blocks: [
      { t: ['安い', 'から', '買う', 'の', 'は', '、', '一度', '止めた', '方', 'が', 'いい', 'よ', '。'] },
      { t: ['値段', 'の', '下がり方', 'で', 'は', 'なく', '、', '何回', '使える', 'か', 'で', '見る', 'ん', 'だ', '。'] },
      { t: ['千円', 'の', '物', 'を', '十回', '使え', 'ば', '一回', '百円', 'だけど', '、', '三百円', 'の', '物', 'を', '一度', 'しか', '使わ', 'ない', 'なら', '、', 'そちら', 'の', '方が', '高い', '。'] },
      { t: ['しかも', '、', '置く', '場所', 'が', '無く', 'なって', '、', '片付ける', '時間', 'まで', 'かかる', '。'] },
      { t: ['迷った', 'ら', '、', '買う', '前', 'に', '家', 'で', 'どこ', 'に', '置く', 'か', 'を', '考えて', 'みる', 'と', 'いい', 'よ', '。'] },
    ]
  },
  {
    key: 'belanja_permintaan_tukar_ukuran', topic: 'belanja', jenis: 'permintaan',
    judul: 'Meminta tukar ukuran tanpa struk', judulEn: 'Asking to exchange a size without a receipt',
    rel: 'petugas_toko',
    sit: 'Meminta tukar ukuran, dan menjelaskan bahwa struknya hilang', sitEn: 'Asking to exchange for another size, explaining the receipt is lost',
    id: 'Saya meminta tukar ukuran sambil mengakui struknya hilang lebih dulu, dan menawarkan menerima jika aturannya tidak mengizinkan.',
    en: 'I ask for a size exchange while admitting first that the receipt is lost, and offer to accept it if the rule forbids it.',
    note: 'Permintaan seperti ini diterima karena kelemahannya diakui lebih dulu, bukan disembunyikan sampai ditanya.',
    noteEn: 'A request like this is granted because the weakness is admitted first rather than hidden until asked.',
    blocks: [
      { t: ['すみません', '、', 'お願い', 'したい', 'こと', 'が', 'ある', 'の', 'です', 'が', '。'] },
      { t: ['昨日', 'こちら', 'で', '買った', 'の', 'です', 'が', '、', 'サイズ', 'が', '合わ', 'なくて', '、', 'レシート', 'は', 'もう', 'あり', 'ません', '。'] },
      { t: ['札', 'と', '袋', 'は', '残って', 'います', '。', '同じ', '物', 'の', '一つ', '大きい', 'サイズ', 'は', 'あり', 'ます', 'か', '。'] },
      { t: ['もし', 'レシート', 'が', '無い', 'と', 'できない', '決まり', 'なら', '、', 'それ', 'で', '構い', 'ません', '。'] },
      { t: ['差額', 'が', 'あれば', '、', '払います', 'ので', '、', '教えて', 'ください', '。'] },
    ]
  },
  {
    key: 'belanja_pengalaman_salah_baca_label', topic: 'belanja', jenis: 'pengalaman',
    judul: 'Salah membaca label dan membeli barang yang sama', judulEn: 'Misread the label and bought the same thing twice',
    rel: 'teman',
    sit: 'Menceritakan kesalahan membeli karena labelnya mirip', sitEn: 'Recounting a buying mistake caused by two similar labels',
    id: 'Saya membeli dua barang yang ternyata sama karena labelnya mirip, dan sejak itu selalu membaca bagian bawah kemasan.',
    en: 'I bought two things that turned out to be the same because the labels were alike, and since then I always read the bottom of the packet.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: kesalahannya, apa yang membukanya, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the mistake, what revealed it, and what changed afterwards.',
    blocks: [
      { t: ['先月', '、', '洗剤', 'を', '二つ', '買って', 'しまった', 'こと', 'が', 'あります', '。'] },
      { t: ['棚', 'に', '並んで', 'いる', '袋', 'の', '色', 'が', 'そっくり', 'で', '、', '名前', 'も', '似て', 'いた', 'の', 'です', '。'] },
      { t: ['家', 'で', '並べて', 'みて', '、', '同じ', '物', 'だ', 'と', '初めて', '気が付き', 'ました', '。'] },
      { t: ['よく', '見る', 'と', '、', '下', 'の', '方', 'に', '小さく', '成分', 'が', '違う', 'と', '書いて', 'あり', 'ました', '。'] },
      { t: ['あれ', 'から', '、', '買う', '前', 'に', '必ず', '袋', 'の', '下', 'まで', '読む', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'belanja_pengumuman_potongan_akhir_pekan', topic: 'belanja', jenis: 'pengumuman',
    judul: 'Pengumuman potongan akhir pekan', judulEn: 'An announcement about the weekend sale',
    rel: 'petugas_toko',
    sit: 'Pengumuman di toko tentang potongan yang berlaku beberapa hari saja', sitEn: 'An in-store announcement about a discount running for a few days only',
    id: 'Toko mengumumkan potongan untuk sebagian barang selama tiga hari, satu rak dikecualikan, dan barang yang sudah dipotong tidak bisa ditukar.',
    en: 'The shop announces a discount on some goods for three days, one shelf is excluded, and discounted items cannot be exchanged.',
    note: 'Pengumuman menyebut batasnya lebih dulu: lamanya, rak yang dikecualikan, dan syarat penukarannya.',
    noteEn: 'An announcement gives the limits first: how long, which shelf is excluded, and the exchange condition.',
    blocks: [
      { t: ['お客様', 'に', 'お知らせ', 'いたし', 'ます', '。'] },
      { t: ['本日', 'から', '三日間', '、', '食品', 'の', '一部', 'を', '二割引', 'で', 'ご', '用意', 'して', 'います', '。'] },
      { t: ['ただし', '、', '酒', 'と', 'たばこ', 'は', '対象', '外', 'です', '。', '棚', 'の', '札', 'を', 'ご', '確認', 'ください', '。'] },
      { t: ['割引', 'の', '商品', 'は', '、', '返品', 'や', '交換', 'は', 'でき', 'ません', 'ので', '、', 'ご了承', 'ください', '。'] },
      { t: ['数', 'に', '限り', 'が', 'あり', 'ます', 'ので', '、', '無くなり', '次第', '終了', 'です', '。'] },
    ]
  },
]);
