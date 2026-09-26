/* Makan: everything around eating, from ordering to what is said at the table.
 *
 * The measurement behind the quota is 自宅×食事 9,72% plus 公共商業施設×食事 4,37% plus the two smaller 食事
 * cells, which makes this the second largest topic after kerja.
 *
 * Two settings are kept apart here on purpose. At a table in a restaurant the reader is a
 * customer speaking to staff, so nearly every sentence is polite. At home it is family, so
 * almost none are. A deck that taught only one of the two would teach half of what eating
 * actually sounds like, and the register check would have nothing to compare.
 *
 * Shopping for ingredients is in data/t_belanja.js and cooking as a chore is in the rumah_tugas
 * topic; this file is the table itself.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - memesan di restoran, termasuk menanyakan yang tidak ada di menu
 * - menanyakan isi makanan, menanyakan bahan, menyebut alergi
 * - meminta perubahan pesanan, meminta tambah, meminta bungkus
 * - menawarkan makanan ke orang lain, dan menolak tawaran makanan
 * - memuji makanan, mengeluh makanan, membandingkan dengan yang pernah dimakan
 * - membayar bersama, membagi tagihan, menawarkan membayar
 * - mengajak makan, menolak ajakan makan
 * - di rumah: menyebut masakannya, menanyakan kapan makan, memanggil makan
 * - menyebut kebiasaan makan, diet, tidak makan sesuatu
 * - menanyakan rekomendasi dan menanyakan porsi
 * Tidak termasuk:
 * - berbelanja bahan makanan, masuk ke `belanja`
 * - memasak sebagai pekerjaan rumah, masuk ke `rumah_tugas`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'makan_percakapan_pesan_berdua', topic: 'makan', jenis: 'percakapan',
    judul: 'Memutuskan pesanan berdua', judulEn: 'Deciding what to order together',
    speakers: {'A':'teman','B':'teman_dekat'},
    sit: 'Dua orang di restoran membaca menu dan memutuskan pesanan', sitEn: 'Two people at a restaurant reading the menu and deciding',
    id: 'Dua orang membandingkan dua hidangan, yang satu tidak makan daging, dan akhirnya memilih hidangan yang bisa dimakan berdua.',
    en: 'Two people compare two dishes, one of them does not eat meat, and they settle on something both can eat.',
    note: 'Yang penting di sini bukan tata bahasanya, melainkan bahwa yang memilih menyebut alasan orang lain lebih dulu daripada seleranya sendiri.',
    noteEn: 'What matters is not the grammar but that the chooser gives the other person\'s reason before their own preference.',
    blocks: [
      { sp: 'A', t: ['何', 'にする', '？', '私', 'は', '魚', 'の', '方', 'が', 'いい', 'かな', '。'] },
      { sp: 'B', t: ['私', 'は', '肉', 'は', '食べ', 'ない', 'から', '、', '魚', 'が', 'ある', 'なら', '助かる', '。'] },
      { sp: 'A', t: ['じゃあ', '、', 'この', '焼き魚', 'の', '定食', 'に', 'しよう', 'か', '。', '二つ', 'とも', '同じ', 'で', 'いい', '？'] },
      { sp: 'B', t: ['うん', '、', 'それ', 'で', 'いい', 'よ', '。', 'ただ', '、', 'ご飯', 'は', '少なめ', 'で', 'お願い', 'して', 'くれる', '？'] },
      { sp: 'A', t: ['わかった', '。', '店', 'の', '人', 'に', '言って', 'くる', 'ね', '。'] },
    ]
  },
  {
    key: 'makan_kronologi_dari_masuk_sampai_bayar', topic: 'makan', jenis: 'kronologi',
    judul: 'Dari masuk restoran sampai bayar', judulEn: 'From walking in to paying',
    rel: 'teman',
    sit: 'Menceritakan urutan makan malam di restoran, dari awal sampai akhir', sitEn: 'Recounting a dinner out from start to finish',
    id: 'Kami masuk, menunggu sepuluh menit, memesan, makan, lalu membagi tagihan karena uang tunai kami tidak cukup.',
    en: 'We went in, waited ten minutes, ordered, ate, then split the bill because neither of us had enough cash.',
    note: 'Urutannya diikat ので dan たら, jadi tiap baris menjelaskan baris sebelumnya, bukan hanya menomori.',
    noteEn: 'The order is bound by ので and たら, so each line explains the previous one rather than just numbering it.',
    blocks: [
      { t: ['店', 'の', '前', 'に', '着いたら', '、', '待って', 'いる', '人', 'が', '五人', 'いた', 'ので', '、', '名前', 'を', '書いて', '外', 'で', '待ちました', '。'] },
      { t: ['十分', 'ほど', 'で', '席', 'に', '案内', 'されて', '、', 'まず', '飲み物', 'を', '頼みました', '。'] },
      { t: ['料理', 'は', '思った', 'より', '早く', '来た', 'ので', '、', '話す', '時間', 'が', '少なかった', 'くらい', 'です', '。'] },
      { t: ['最後', 'に', '会計', 'を', 'お願い', 'したら', '、', '現金', 'しか', '使えない', 'と', '言われました', '。'] },
      { t: ['二人', 'とも', '千円札', 'が', '一枚', 'しか', 'なかった', 'ので', '、', '半分', 'ずつ', '払う', 'こと', 'に', 'しました', '。'] },
    ]
  },
  {
    key: 'makan_curhatan_diet_yang_gagal', topic: 'makan', jenis: 'curhatan',
    judul: 'Diet yang selalu gagal malam hari', judulEn: 'The diet that fails every night',
    rel: 'teman_dekat',
    sit: 'Mengeluh soal diet yang selalu gagal, tanpa minta saran', sitEn: 'Venting about a diet that keeps failing, without asking for advice',
    id: 'Setiap hari saya berhasil menahan diri sampai malam, lalu makan berlebihan karena terlalu lapar.',
    en: 'Every day I hold out until evening and then overeat because I am too hungry.',
    note: 'Bentuk biasa dan tanpa permintaan solusi; itu yang membedakan curhatan dari keluhan resmi.',
    noteEn: 'Plain style with no request for a solution: that is what separates venting from a formal complaint.',
    blocks: [
      { t: ['朝', 'は', '食べ', 'ない', 'で', '、', '昼', 'も', '軽く', '済ませて', 'いる', 'ん', 'だけど', '、', '夜', 'に', 'なる', 'と', 'もう', '無理', 'なん', 'だ', 'よ', '。'] },
      { t: ['お腹', 'が', '空きすぎて', '、', '冷蔵庫', 'の', '前', 'で', '立った', 'まま', '食べて', 'しまう', 'こと', 'も', 'ある', '。'] },
      { t: ['次の日', 'は', '後悔', 'する', 'ん', 'だけど', '、', 'また', '同じ', 'こと', 'を', '繰り返す', 'ん', 'だ', '。'] },
      { t: ['痩せたい', '気持ち', 'は', '本当に', 'ある', 'のに', '、', '体', 'が', '言う', 'こと', 'を', '聞か', 'ない', '。'] },
      { t: ['別に', '方法', 'を', '教えて', 'ほしい', 'わけ', 'じゃ', 'なくて', '、', 'ただ', '誰か', 'に', '聞いて', 'ほしい', 'だけ', '。'] },
    ]
  },
  {
    key: 'makan_keluhan_pesanan_salah', topic: 'makan', jenis: 'keluhan',
    judul: 'Pesanan yang datang tidak sesuai', judulEn: 'The dish that came out wrong',
    rel: 'pelayan',
    sit: 'Memberi tahu pelayan bahwa pesanannya tidak sesuai, dengan permintaan yang jelas', sitEn: 'Telling waiting staff the order is wrong, with a clear request',
    id: 'Saya memesan tanpa bawang, tetapi hidangan yang datang justru penuh bawang, dan saya meminta diganti.',
    en: 'I ordered it without onion, but the dish arrived full of onion, and I ask for it to be replaced.',
    note: 'Keluhan yang bisa ditindaklanjuti menyebut pesanan, kejadian, lalu permintaannya, dalam urutan itu, tanpa menyerang orangnya.',
    noteEn: 'An actionable complaint states the order, what happened, then the request, in that order, without attacking the person.',
    blocks: [
      { t: ['すみません', '、', '少し', 'お願い', 'が', 'ある', 'の', 'です', 'が', '。'] },
      { t: ['注文', 'の', 'とき', 'に', '、', '玉ねぎ', 'を', '抜いて', 'もらう', 'ように', 'お伝え', 'した', 'の', 'です', 'が', '、', 'こちら', 'に', 'は', '入って', 'いる', 'よう', 'です', '。'] },
      { t: ['アレルギー', 'で', 'は', 'ない', 'ので', '大丈夫', 'です', 'が', '、', 'この', 'まま', 'だ', 'と', '食べられ', 'ません', '。'] },
      { t: ['同じ', 'もの', 'で', '、', '玉ねぎ', 'なし', 'の', 'もの', 'に', '替えて', 'いただけ', 'ます', 'か', '。'] },
      { t: ['時間', 'が', 'かかる', 'なら', '、', '別', 'の', 'もの', 'に', '変えて', 'もらって', 'も', 'いい', 'です', '。'] },
    ]
  },
  {
    key: 'makan_penjelasan_cara_makan', topic: 'makan', jenis: 'penjelasan',
    judul: 'Cara makan hidangan yang belum dikenal', judulEn: 'How to eat a dish you have never seen',
    rel: 'orang_asing',
    sit: 'Menjelaskan cara makan sebuah hidangan kepada orang asing yang baru tiba', sitEn: 'Explaining how to eat a dish to a stranger who has just arrived',
    id: 'Saya menerangkan bahwa kuahnya diminum langsung dari mangkuk setelah isinya habis, dan itu bukan tindakan kasar.',
    en: 'I explain that the broth is drunk straight from the bowl once the solids are gone, and that it is not rude.',
    note: 'Penjelasan yang berguna menjawab keraguan pembacanya lebih dulu, baru menyebut caranya.',
    noteEn: 'A useful explanation answers the listener\'s doubt first, then gives the method.',
    blocks: [
      { t: ['まず', '、', 'この', '麺', 'は', '音', 'を', '立てて', '食べて', 'も', '大丈夫', 'です', '。'] },
      { t: ['日本', 'で', 'は', '、', '音', 'を', '立てる', 'の', 'は', '失礼', 'で', 'は', 'なく', '、', 'おいしい', 'という', '合図', 'だ', 'から', 'です', '。'] },
      { t: ['具', 'を', '食べ終わったら', '、', '丼', 'を', '持って', 'スープ', 'を', '直接', '飲んで', 'も', 'かまいません', '。'] },
      { t: ['ただし', '、', '両手', 'で', '持つ', 'の', 'が', '普通', 'で', '、', '片手', 'で', '持ち上げる', 'と', '不安定', 'に', '見え', 'ます', '。'] },
      { t: ['どうしても', '食べにくけれ', 'ば', '、', 'レンゲ', 'を', '頼めば', '店', 'の', '人', 'が', '持って', 'きて', 'くれます', '。'] },
    ]
  },
  {
    key: 'makan_laporan_makan_malam_siap', topic: 'makan', jenis: 'laporan',
    judul: 'Memberi tahu makan malam sudah siap', judulEn: 'Telling everyone dinner is ready',
    rel: 'ibu',
    sit: 'Melapor ke keluarga di rumah bahwa makan malam sudah siap', sitEn: 'Reporting at home that dinner is ready',
    id: 'Saya memberi tahu bahwa makan malam sudah siap, siapa yang belum pulang, dan hidangan mana yang harus dimakan lebih dulu.',
    en: 'I report that dinner is ready, who is not home yet, and which dish has to be eaten first.',
    note: 'Laporan di rumah menyebut apa yang sudah, apa yang belum, dan apa yang perlu dilakukan orang lain.',
    noteEn: 'A report at home states what is done, what is not, and what others need to do.',
    blocks: [
      { t: ['ご飯', 'できた', 'よ', '。', '今', '、', '全部', '温かい', 'から', '、', '先に', '食べて', 'て', '。'] },
      { t: ['お父さん', 'は', 'まだ', '帰って', 'ない', 'けど', '、', '連絡', 'が', 'あって', '八時', 'ごろ', 'に', 'なる', 'って', '。'] },
      { t: ['お父さん', 'の', '分', 'は', '別に', '取って', 'ある', 'から', '、', '心配', 'しなくて', 'いい', '。'] },
      { t: ['スープ', 'は', '冷める', 'と', '味', 'が', '変わる', 'から', '、', 'これ', 'は', '先に', '飲んで', 'しまって', '。'] },
      { t: ['食べ終わったら', '、', '皿', 'は', '流し', 'に', '置いて', 'おいて', 'くれれば', 'いい', 'から', 'ね', '。'] },
    ]
  },
  {
    key: 'makan_rencana_makan_malam_bersama', topic: 'makan', jenis: 'rencana',
    judul: 'Menyusun rencana makan malam bersama', judulEn: 'Organising a dinner together',
    rel: 'teman',
    sit: 'Merencanakan makan malam bersama sekelompok teman', sitEn: 'Planning dinner with a group of friends',
    id: 'Kami membandingkan dua tempat, yang satu murah tetapi ramai, lalu memutuskan memesan tempat lebih dulu.',
    en: 'We compare two places, one cheap but busy, then decide to reserve ahead.',
    note: 'Rencana yang berguna menyebut jam, jumlah orang, dan siapa yang mengurus pemesanan.',
    noteEn: 'A useful plan states the time, the number of people, and who is making the booking.',
    blocks: [
      { t: ['金曜', 'の', '夜', 'に', '六人', 'で', '食事', 'に', '行く', 'なら', '、', '今週中', 'に', '店', 'を', '決めた', '方', 'が', 'いい', 'と', '思う', '。'] },
      { t: ['駅', 'の', '近く', 'の', '店', 'は', '安い', 'けど', '、', '金曜', 'は', '混む', 'から', '、', '予約', 'なし', 'だ', 'と', '入れ', 'ない', 'かもしれない', '。'] },
      { t: ['少し', '歩いた', 'ところ', 'に', 'もう', '一軒', 'あって', '、', 'こちら', 'は', '少し', '高い', 'けど', '静か', 'だ', 'よ', '。'] },
      { t: ['話したい', 'なら', '静か', 'な', '方', '、', '安さ', 'を', '取る', 'なら', '駅前', 'だ', 'ね', '。'] },
      { t: ['私', 'が', '明日', 'の', '昼', 'に', '電話', 'して', '、', '六人', 'で', '八時', 'から', 'で', '取れる', 'か', '聞いて', 'みる', 'よ', '。'] },
    ]
  },
  {
    key: 'makan_nasihat_alergi_di_restoran', topic: 'makan', jenis: 'nasihat',
    judul: 'Saran supaya alergi benar-benar tersampaikan', judulEn: 'Making sure an allergy gets through',
    rel: 'teman',
    sit: 'Menasihati teman yang punya alergi makanan soal cara memesan', sitEn: 'Advising a friend with a food allergy on how to order',
    id: 'Saya menyarankan menyebut alerginya sebelum memesan, bukan setelah makanan datang, dan memakai kartu tertulis.',
    en: 'I suggest saying the allergy before ordering rather than after the food arrives, and using a written card.',
    note: 'Nasihat yang berguna menyebut akibat nyata dari kelalaian, bukan hanya perintah.',
    noteEn: 'Useful advice names the real consequence of the mistake, not just the instruction.',
    blocks: [
      { t: ['注文', 'する', '前', 'に', '、', '必ず', 'アレルギー', 'の', 'こと', 'を', '伝えた', '方', 'が', 'いい', 'よ', '。'] },
      { t: ['料理', 'が', '来て', 'から', '言う', 'と', '、', '作った', '人', 'が', '別', 'の', '料理', 'を', '作り直す', 'こと', 'に', 'なる', 'から', '、', 'お互い', 'に', '嫌', 'な', '思い', 'を', 'する', '。'] },
      { t: ['口', 'で', '言いにくけれ', 'ば', '、', '何', 'が', '食べられ', 'ない', 'か', 'を', '紙', 'に', '書いて', '見せた', '方', 'が', '確か', 'だ', 'よ', '。'] },
      { t: ['ソース', 'や', '付け合わせ', 'に', 'も', '入って', 'いる', 'こと', 'が', 'ある', 'ので', '、', 'そこ', 'まで', '聞いた', '方', 'が', 'いい', '。'] },
      { t: ['心配', 'なら', '、', 'はじめから', '材料', 'が', '少ない', '料理', 'を', '選ぶ', 'の', 'も', '一つ', 'の', '方法', 'だ', 'よ', '。'] },
    ]
  },
  {
    key: 'makan_permintaan_bungkus_sisa', topic: 'makan', jenis: 'permintaan',
    judul: 'Meminta sisa makanan dibungkus', judulEn: 'Asking for the leftovers to be packed',
    rel: 'pelayan',
    sit: 'Meminta sisa makanan dibungkus supaya tidak terbuang', sitEn: 'Asking for the leftovers to be packed so they are not wasted',
    id: 'Saya meminta sisanya dibungkus, sambil menjelaskan bahwa saya tidak sanggup menghabiskan dan tidak ingin membuangnya.',
    en: 'I ask for what is left to be packed, explaining that I cannot finish it and do not want to throw it away.',
    note: 'Permintaan seperti ini diterima karena alasannya disebut lebih dulu, bukan karena kalimatnya panjang.',
    noteEn: 'A request like this is granted because the reason comes first, not because the sentence is long.',
    blocks: [
      { t: ['すみません', '、', '一つ', 'お願い', 'して', 'も', 'いい', 'です', 'か', '。'] },
      { t: ['とても', 'おいしかった', 'の', 'です', 'が', '、', '少し', '多すぎて', '食べきれ', 'ません', 'でした', '。'] },
      { t: ['捨てて', 'しまう', 'の', 'は', 'もったいない', 'ので', '、', '残り', 'を', '持ち帰り', 'たい', 'の', 'です', '。'] },
      { t: ['入れ物', 'を', 'いただけれ', 'ば', '、', '自分', 'で', '詰め', 'ます', '。'] },
      { t: ['もし', '持ち帰り', 'が', 'でき', 'ない', '決まり', 'なら', '、', 'それ', 'で', '大丈夫', 'です', '。'] },
    ]
  },
  {
    key: 'makan_pengalaman_pertama_kali', topic: 'makan', jenis: 'pengalaman',
    judul: 'Pertama kali makan sesuatu yang tidak dikenal', judulEn: 'The first time I ate something I did not recognise',
    rel: 'teman',
    sit: 'Menceritakan pengalaman pertama makan makanan yang tidak dikenal', sitEn: 'Recounting the first time eating food you could not recognise',
    id: 'Saya pernah memesan tanpa tahu isinya, terkejut waktu datang, tetapi ternyata paling enak di meja.',
    en: 'I once ordered without knowing what was in it, was startled when it came, and it turned out to be the best thing on the table.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: yang tidak diketahui, kejutan, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: what was unknown, the surprise, and what changed afterwards.',
    blocks: [
      { t: ['初めて', '日本', 'に', '来た', 'とき', '、', 'メニュー', 'の', '写真', 'だけ', 'で', '注文', 'した', 'こと', 'が', 'あります', '。'] },
      { t: ['名前', 'が', '読め', 'なくて', '、', '値段', 'が', '安かった', 'から', '、', 'これ', 'に', 'しよう', 'と', '決めた', 'ん', 'です', '。'] },
      { t: ['運ばれて', 'きた', 'もの', 'を', '見て', '、', '思って', 'いた', 'の', 'と', '全然', '違う', '色', 'だった', 'ので', '、', '少し', '驚き', 'ました', '。'] },
      { t: ['恐る恐る', '食べて', 'みたら', '、', 'それ', 'が', 'その', '店', 'で', '一番', 'おいしい', '料理', 'でした', '。'] },
      { t: ['あれ', 'から', '、', '読め', 'ない', '料理', 'で', 'も', '一度', 'は', '頼んで', 'みる', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'makan_pengumuman_di_kantin', topic: 'makan', jenis: 'pengumuman',
    judul: 'Pengumuman di kantin sekolah', judulEn: 'An announcement in the school canteen',
    rel: 'petugas',
    sit: 'Pengumuman kepada seluruh pengunjung kantin', sitEn: 'An announcement to everyone using the canteen',
    id: 'Kantin mengumumkan bahwa satu hidangan habis, jam tutupnya dimajukan, dan wadah bawa pulang harus dibawa sendiri.',
    en: 'The canteen announces that one dish has sold out, closing time is earlier, and you must bring your own container.',
    note: 'Pengumuman menyebut akibatnya lebih dulu, baru apa yang diminta, karena pendengar memutuskan dalam dua detik apakah ini urusannya.',
    noteEn: 'An announcement states the consequence first and the request second, because the listener decides in two seconds whether it concerns them.',
    blocks: [
      { t: ['ご利用', 'の', '皆様', 'に', 'お知らせ', 'いたし', 'ます', '。'] },
      { t: ['本日', 'の', '日替わり', 'は', '、', '用意', 'した', '分', 'が', 'なくなり', 'ました', 'ので', '、', 'ただ今', 'を', 'もちまして', '終了', 'です', '。'] },
      { t: ['その他', 'の', 'お料理', 'は', 'まだ', 'ございます', 'ので', '、', 'ご希望', 'の', '方', 'は', 'お早めに', 'どうぞ', '。'] },
      { t: ['本日', 'は', '、', '片付け', 'の', '都合', 'により', '、', '七時', 'で', '閉め', 'させて', 'いただき', 'ます', '。'] },
      { t: ['お持ち帰り', '用', 'の', '入れ物', 'は', '、', '数', 'に', '限り', 'が', 'ございます', 'ので', '、', 'ご持参', 'いただける', 'と', '助かり', 'ます', '。'] },
    ]
  },
]);
