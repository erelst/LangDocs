/* Telepon: the call itself, whatever the call is about.
 *
 * 遠隔通信 is 9,75% of all recorded talk and cuts across every other topic, so this file is what is
 * said because it is a phone call: who is calling, whether now is a good time, hearing the
 * other person badly, taking a message, being put through, and getting off the line. What
 * the call is about stays in its own topic.
 *
 * Nearly all of it is polite, and for a reason the other topics do not have: whoever answers is
 * often not the person being called, so even a call to a friend starts through a stranger.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - membuka telepon: menyebut diri, menanyakan apakah waktunya tepat
 * - meminta bicara dengan orang lain, dan menyampaikan bahwa orangnya tidak ada
 * - meninggalkan pesan, meminta pesan diteruskan
 * - tidak terdengar, minta diulang, menelepon ulang
 * - salah sambung dan menutupnya dengan sopan
 * - menutup telepon: meringkas, memastikan, mengucapkan terima kasih
 * - menjelaskan bahwa sedang dalam perjalanan, memberi tahu akan terlambat
 * - menelepon kembali orang yang tadi tidak terjawab
 * Tidak termasuk:
 * - isi pembicaraannya sendiri, yang tetap mengikuti topik asalnya
 * - surat dan berkas tertulis
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'telepon_percakapan_menelepon_kantor', topic: 'telepon', jenis: 'percakapan',
    judul: 'Menelepon kantor dan bukan orang yang dituju yang mengangkat', judulEn: 'Calling an office and reaching someone else',
    speakers: {'A':'petugas','B':'klien'},
    sit: 'Percakapan telepon ke kantor, diangkat resepsionis', sitEn: 'A phone call to an office, answered by reception',
    id: 'Saya menyebut nama dan keperluan, ditanya apakah waktunya tepat, lalu disambungkan ke orang yang dituju.',
    en: 'I give my name and my business, am asked whether now is a good time, and am put through to the person I need.',
    note: 'Pembuka telepon yang berguna menyebut nama dan keperluan sekaligus, karena yang mengangkat bukan orang yang dituju.',
    noteEn: 'A useful call opening gives name and purpose together, because the person answering is not the one wanted.',
    blocks: [
      { sp: 'B', t: ['お忙しい', 'ところ', '失礼', 'します', '。', '田中', 'の', '紹介', 'で', 'お電話', 'しました', '。', '山田', 'と', '申し', 'ます', '。'] },
      { sp: 'A', t: ['お世話に', 'なって', 'おります', '。', 'どの', 'よう', 'な', 'ご用件', 'でしょうか', '。'] },
      { sp: 'B', t: ['納品', 'の', '日程', 'について', '、', 'ご相談', 'したい', 'こと', 'が', 'あり', 'ます', '。'] },
      { sp: 'A', t: ['かしこまり', 'ました', '。', '担当', 'の', '者', 'に', 'おつなぎ', 'します', 'ので', '、', '少々', 'お待ち', 'ください', '。'] },
      { sp: 'B', t: ['お願い', 'します', '。'] },
      { sp: 'A', t: ['お待たせ', 'しました', '。', 'ただ今', '、', '担当', 'に', 'つなぎ', 'ます', '。'] },
      { sp: 'B', t: ['ありがとう', 'ございます', '。'] },
    ]
  },
  {
    key: 'telepon_cerita_salah_sambung', topic: 'telepon', jenis: 'cerita',
    judul: 'Salah sambung ke nomor yang mirip', judulEn: 'The call that went to a similar number',
    rel: 'orang_asing',
    sit: 'Menceritakan salah sambung dan bagaimana ditutup dengan baik', sitEn: 'Recounting a wrong number and how it was closed politely',
    id: 'Saya salah menekan satu angka, berbicara dua menit sebelum sadar, dan menutupnya dengan permintaan maaf.',
    en: 'I misdialled one digit, talked for two minutes before realising, and closed with an apology.',
    note: 'Cerita seperti ini punya tiga bagian: kesalahannya, saat ketahuan, dan bagaimana ditutup.',
    noteEn: 'A story like this has three parts: the mistake, when it surfaced, and how it was closed.',
    blocks: [
      { t: ['先週', '、', '業者', 'さん', 'に', '電話', 'する', 'つもり', 'が', '、', '番号', 'を', '一', 'つ', '間違え', 'ました', '。'] },
      { t: ['相手', 'は', '同じ', 'よう', 'な', '仕事', 'の', '人', 'だった', 'ので', '、', '話', 'が', 'かみ合って', 'いる', 'と', '思って', 'いました', '。'] },
      { t: ['二', '分', 'ほど', '話して', 'から', '、', '会社', 'の', '名前', 'が', '違う', 'の', 'に', '気が付き', 'ました', '。'] },
      { t: ['すぐ', 'に', '謝って', '、', 'なぜ', '間違え', 'た', 'の', 'か', 'を', '説明', 'しました', '。'] },
      { t: ['相手', 'は', '笑って', '、', '「', 'よく', 'ある', 'こと', 'です', '」', 'と', '言って', 'くれ', 'ました', '。'] },
    ]
  },
  {
    key: 'telepon_kronologi_menunggu_di_telepon', topic: 'telepon', jenis: 'kronologi',
    judul: 'Menunggu di telepon sampai disambungkan', judulEn: 'Waiting on the line to be put through',
    rel: 'petugas',
    sit: 'Menceritakan urutan menelepon dan menunggu sampai bicara dengan orang yang dituju', sitEn: 'Recounting a call and the wait until reaching the right person',
    id: 'Saya menekan nomor, mendengar menu otomatis, menunggu delapan menit, lalu berbicara setelah disambungkan.',
    en: 'I dialled, heard an automated menu, waited eight minutes, then spoke once I was put through.',
    note: 'Urutannya diikat たら dan ので, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by たら and ので, so each line explains the one before it.',
    blocks: [
      { t: ['番号', 'を', '押した', 'ら', '、', 'すぐ', 'に', '自動', 'の', '案内', 'が', '流れ', 'ました', '。'] },
      { t: ['「', '一', '番', 'を', '押して', 'ください', '」', 'と', '言われ', 'た', 'ので', '、', 'その', 'とおり', 'に', 'しました', '。'] },
      { t: ['八分', 'ほど', '待った', 'あと', 'で', '、', '人', 'が', '出', 'ました', '。'] },
      { t: ['名前', 'と', '用件', 'を', '伝えた', 'ら', '、', '担当', 'の', '人', 'に', '変わり', 'ました', '。'] },
      { t: ['話し', '始める', 'まで', 'に', '十分', 'かかった', 'ので', '、', '時間', 'に', '余裕', 'を', '持つ', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'telepon_curhatan_telepon_mendesak', topic: 'telepon', jenis: 'curhatan',
    judul: 'Telepon yang selalu datang di waktu sibuk', judulEn: 'Calls that always arrive at the worst time',
    rel: 'rekan',
    sit: 'Mengeluh soal telepon yang datang di waktu paling sibuk, tanpa minta saran', sitEn: 'Venting about calls arriving at the busiest time, without asking for advice',
    id: 'Telepon selalu berbunyi justru saat saya sedang menjelaskan sesuatu, dan setelah diangkat ternyata bukan hal mendesak.',
    en: 'The phone always rings exactly when I am explaining something, and when I answer it is never urgent.',
    note: 'Keluhan seperti ini diarahkan ke waktunya, bukan ke orang yang menelepon, dan tidak menuntut aturan baru.',
    noteEn: 'A complaint like this aims at the timing, not the caller, and does not demand a new rule.',
    blocks: [
      { t: ['電話', 'が', '鳴る', 'の', 'って', '、', 'なぜ', 'か', '説明', 'して', 'いる', 'とき', 'な', 'ん', 'だ', 'よ', '。'] },
      { t: ['出', 'なければ', 'ならない', 'から', '話', 'を', '止めて', '、', '戻った', 'ら', 'どこ', 'まで', '話した', 'か', '分から', 'なく', 'なる', '。'] },
      { t: ['しかも', '、', '出て', 'みる', 'と', '、', 'あと', 'で', 'も', 'いい', 'こと', 'の', '方', 'が', '多い', '。'] },
      { t: ['今日', 'も', '、', '三十分', 'の', 'うち', 'に', '四', '回', '鳴った', 'んだ', '。'] },
      { t: ['電話', 'を', '減らせ', 'と', '言いたい', 'わけ', 'じゃ', 'なくて', '、', '時間', 'を', '選んで', 'ほしい', 'だけ', 'な', 'ん', 'だ', 'けど', 'ね', '。'] },
    ]
  },
  {
    key: 'telepon_keluhan_operator_tidak_menyambung', topic: 'telepon', jenis: 'keluhan',
    judul: 'Sudah tiga kali disambungkan tetapi tidak pernah tersambung', judulEn: 'Put through three times and never connected',
    rel: 'petugas',
    sit: 'Menyampaikan keluhan ke operator bahwa sambungannya selalu terputus', sitEn: 'Complaining to an operator that the connection keeps dropping',
    id: 'Saya menyampaikan bahwa tiga kali dini hari sambungannya terputus di tengah, dan meminta dicatat nomor saya.',
    en: 'I say that three times the line dropped mid-call, and ask for my number to be taken down.',
    note: 'Keluhan ke operator berhasil karena yang diminta adalah pencatatan, bukan penjelasan sebabnya.',
    noteEn: 'A complaint to an operator works because what is asked is a record, not an explanation of the cause.',
    blocks: [
      { t: ['お手数', 'を', 'おかけ', 'します', 'が', '、', '少し', 'お伝え', 'したい', 'こと', 'が', 'あり', 'ます', '。'] },
      { t: ['ただ今', 'まで', 'に', '三', '回', '、', '担当', 'の', '方', 'に', 'つないで', 'いただいた', 'の', 'です', 'が', '、'] },
      { t: ['いずれ', 'も', '話', 'の', '途中', 'で', '切れて', 'しまい', '、', '最後', 'まで', '話せ', 'ません', 'でした', '。'] },
      { t: ['もう', '一度', 'つないで', 'いただく', 'の', 'は', '構い', 'ません', 'が', '、', '切れた', 'こと', 'を', '記録', 'に', '残して', 'ください', '。'] },
      { t: ['私', 'の', '番号', 'は', '、', 'この', '電話', 'です', '。', 'かけ', '直して', 'いただける', 'と', '助かり', 'ます', '。'] },
    ]
  },
  {
    key: 'telepon_penjelasan_cara_meninggalkan_pesan', topic: 'telepon', jenis: 'penjelasan',
    judul: 'Cara meninggalkan pesan yang berguna', judulEn: 'How to leave a message that works',
    rel: 'rekan',
    sit: 'Menerangkan cara meninggalkan pesan kepada rekan yang baru bergabung', sitEn: 'Explaining how to leave a useful message to a new colleague',
    id: 'Saya menerangkan bahwa pesan yang berguna menyebut nama, keperluan, batas waktu, dan nomor yang bisa dihubungi.',
    en: 'I explain that a useful message gives the name, the purpose, a deadline, and a number to call back.',
    note: 'Penjelasan yang berguna menyebut urutannya, karena pesan yang salah urutan membuat yang mendengar harus memutar ulang.',
    noteEn: 'A useful explanation gives the order, because a message out of order makes the listener replay it.',
    blocks: [
      { t: ['伝言', 'を', 'お願い', 'する', 'とき', 'は、', '順番', 'が', '大事', 'です', '。', '最初', 'に', '名前', 'を', '言って', 'ください', '。'] },
      { t: ['次', 'に', '、', '何', 'の', '件', 'か', 'を', '一言', 'で', '言います', '。', '「', '見積', 'の', '件', '」', 'で', '十分', 'です', '。'] },
      { t: ['その', 'あと', 'で', '、', 'いつ', 'まで', 'に', '必要', 'か', 'を', '伝えます', '。', '期限', 'が', 'ある', 'と', '、', '相手', 'が', '優先', 'できます', '。'] },
      { t: ['最後', 'に', '、', 'かけ', '直して', 'ほしい', '番号', 'を', 'ゆっくり', '言って', 'ください', '。', '一度', 'で', '伝わる', 'と', '助かり', 'ます', '。'] },
      { t: ['長く', '話す', 'より', '、', 'この', '四つ', 'を', '短く', '言う', '方', 'が', '、', '伝わり', 'ます', '。'] },
    ]
  },
  {
    key: 'telepon_laporan_akan_terlambat', topic: 'telepon', jenis: 'laporan',
    judul: 'Menelepon dari kereta yang berisik', judulEn: 'Calling from a noisy train',
    rel: 'klien',
    sit: 'Menelepon dari dalam kereta, dan suaranya sulit didengar', sitEn: 'Calling from inside a train where the line is hard to hear',
    id: 'Saya menelepon dari kereta yang berisik, memastikan lawan bicara bisa mendengar, dan mengulang satu bagian sebelum menutup.',
    en: 'I call from a noisy train, check that the other person can hear me, and repeat one part before hanging up.',
    note: 'Yang menentukan di sini bukan isi laporannya, melainkan bahwa penelepon memeriksa sambungannya lebih dulu, karena suara kereta sering membuat satu kalimat hilang.',
    noteEn: 'What matters here is not the content of the report but that the caller checks the line first, because train noise often swallows a whole sentence.',
    blocks: [
      { t: ['もしもし', '、', '今', '、', '電車', 'の', '中', 'なん', 'です', 'が', '、', '聞こえ', 'ます', 'か', '。'] },
      { t: ['少し', '聞き取りにくい', 'です', '。', '周り', 'の', '音', 'が', '大きい', 'ので', '。'] },
      { t: ['すみません', '。', '駅', 'に', '着く', 'まで', '、', '少し', '待って', 'いただけ', 'ます', 'か', '。'] },
      { t: ['かしこまり', 'ました', '。', 'では', '、', '着い', 'たら', 'こちら', 'から', 'かけ', 'ます', '。'] },
      { t: ['お願い', 'します', '。', '大事', 'な', '話', 'は', '、', '静か', 'な', '場所', 'から', 'かけ', '直します', '。'] },
    ]
  },
  {
    key: 'telepon_rencana_menelepon_ulang', topic: 'telepon', jenis: 'rencana',
    judul: 'Rencana menelepon ulang', judulEn: 'Planning to call back',
    rel: 'rekan',
    sit: 'Menyusun rencana menelepon ulang, dengan waktu dan cara', sitEn: 'Planning a call back, with a time and a way',
    id: 'Kami menyepakati menelepon ulang setelah makan siang, lewat nomor kantor, dan menyiapkan dua berkas sebelum menelepon.',
    en: 'We agree to call again after lunch, on the office number, and to have two documents ready before calling.',
    note: 'Rencana menelepon berguna karena menyebut apa yang harus siap sebelum menelepon.',
    noteEn: 'A plan to call is useful because it says what must be ready beforehand.',
    blocks: [
      { t: ['さっき', 'の', '件', 'は', '、', '昼', 'の', 'あと', 'で', 'かけ', '直そう', '。'] },
      { t: ['相手', 'は', '午後', 'の', '方が', '出', 'やすい', 'から', '、', '一時', '過ぎ', 'に', 'する', '。'] },
      { t: ['私', 'の', '携帯', 'は', '圏外', 'に', 'なる', 'こと', 'が', 'ある', 'ので', '、', '会社', 'の', '番号', 'を', '使う', '。'] },
      { t: ['かける', '前', 'に', '、', '見積', 'と', '納期', 'の', '紙', 'を', '手元', 'に', '用意', 'して', 'おく', '。'] },
      { t: ['話した', '内容', 'は', '、', 'その場', 'で', 'メモ', 'して', '、', 'あと', 'で', '二人', 'で', '確認', 'しよう', '。'] },
    ]
  },
  {
    key: 'telepon_nasihat_jangan_telepon_malam', topic: 'telepon', jenis: 'nasihat',
    judul: 'Jangan menelepon kantor pada malam hari', judulEn: 'Do not call an office late at night',
    rel: 'rekan',
    sit: 'Menasihati rekan soal waktu yang tepat untuk menelepon', sitEn: 'Advising a colleague on when to call',
    id: 'Saya menyarankan menelepon pada jam kerja dan mengirim pesan di luar itu, karena telepon di luar jam membuat orang harus menyiapkan jawaban mendadak.',
    en: 'I suggest calling during office hours and messaging outside them, because a call out of hours forces an answer to be invented on the spot.',
    note: 'Nasihat yang berguna menyebut alasannya dari sisi yang menerima telepon, bukan dari sisi aturan.',
    noteEn: 'Useful advice gives the reason from the receiver\'s side rather than from the rulebook.',
    blocks: [
      { t: ['仕事', 'の', '電話', 'は', '、', '九時', 'から', '六時', 'まで', 'の', '間', 'に', 'した', '方', 'が', 'いい', 'よ', '。'] },
      { t: ['それ', '以外', 'の', '時間', 'は', '、', '出', 'られ', 'ない', 'か', '、', '出て', 'も', '手元', 'に', '資料', 'が', 'ありません', '。'] },
      { t: ['急ぎ', 'なら', '、', '電話', 'より', 'メッセージ', 'の', '方', 'が', '確か', 'です', '。', 'あと', 'で', '読め', 'ます', 'から', '。'] },
      { t: ['もし', '夜', 'に', 'なって', 'も', '伝え', 'たい', 'なら、', '「', '明日', 'で', '構い', 'ません', '」', 'と', '添える', 'と', 'いい', '。'] },
      { t: ['相手', 'の', '都合', 'を', '考えて', 'かける', '人', 'の', '方', 'が', '、', '結局', '信頼', 'されます', '。'] },
    ]
  },
  {
    key: 'telepon_permintaan_minta_ditelepon_kembali', topic: 'telepon', jenis: 'permintaan',
    judul: 'Meminta ditelepon kembali', judulEn: 'Asking to be called back',
    rel: 'petugas',
    sit: 'Meminta ditelepon kembali karena sedang tidak bisa bicara', sitEn: 'Asking to be called back because now is not a good time',
    id: 'Saya meminta ditelepon kembali satu jam lagi karena sedang di luar, dan menyebut jam yang pasti.',
    en: 'I ask to be called back in an hour because I am out, and give the exact time.',
    note: 'Permintaan seperti ini diterima karena jamnya pasti, bukan karena kalimatnya sopan panjang.',
    noteEn: 'A request like this is granted because the hour is exact, not because the sentence is long and polite.',
    blocks: [
      { t: ['お電話', 'ありがとう', 'ございます', '。', 'ただ', '今', '、', '外出', 'して', 'いて', '、', '落ち着いて', '話せ', 'ません', '。'] },
      { t: ['一', '時間', '後', 'で', 'あれ', 'ば', '、', '席', 'に', '戻って', 'います', '。'] },
      { t: ['お手数', 'ですが', '、', '十一時', 'ごろ', 'に', 'もう', '一度', 'お電話', 'いただけ', 'ません', 'か', '。'] },
      { t: ['私', 'から', 'かける', 'こと', 'も', 'できます', 'が', '、', 'そちらの', '都合', 'が', '分から', 'ない', 'ので', '。'] },
      { t: ['もし', '十一時', 'が', '難しけれ', 'ば', '、', 'ご都合', 'の', 'いい', '時間', 'を', '教えて', 'ください', '。'] },
    ]
  },
  {
    key: 'telepon_pengalaman_telepon_penting_terlewat', topic: 'telepon', jenis: 'pengalaman',
    judul: 'Telepon penting yang terlewat', judulEn: 'The important call I missed',
    rel: 'rekan',
    sit: 'Menceritakan telepon penting yang terlewat dan pelajarannya', sitEn: 'Recounting a missed important call and what it taught',
    id: 'Saya meninggalkan telepon tanpa suara saat rapat, kehilangan satu telepon penting, dan sejak itu menaruhnya di depan.',
    en: 'I left the phone on silent during a meeting, missed one important call, and since then keep it in front of me.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: keadaannya, yang terlewat, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the situation, what was missed, and what changed afterwards.',
    blocks: [
      { t: ['去年', '、', '大きい', '打ち合わせ', 'の', '間', '、', '携帯', 'を', 'かばん', 'の', '中', 'に', '入れて', 'いました', '。'] },
      { t: ['その', '日', 'は', '三', '時間', '続いた', 'ので', '、', '終わって', 'から', '初めて', '気が付き', 'ました', '。'] },
      { t: ['画面', 'を', '見る', 'と', '、', '取引先', 'から', 'の', '着信', 'が', '一', '件', 'あり', 'ました', '。'] },
      { t: ['すぐ', 'に', 'かけ', '直した', 'ところ', '、', 'すで', 'に', '他', 'の', '会社', 'に', '決まった', 'と', '言われ', 'ました', '。'] },
      { t: ['あれ', 'から', 'は', '、', '会議', '中', 'で', 'も', '机', 'の', '上', 'に', '置いて', '、', '震え', 'た', 'ら', '気が付く', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'telepon_pengumuman_telepon_masuk', topic: 'telepon', jenis: 'pengumuman',
    judul: 'Pengumuman di dalam gedung saat ada telepon masuk', judulEn: 'A building announcement for an incoming call',
    rel: 'petugas',
    sit: 'Pengumuman lewat pengeras suara bahwa ada telepon masuk untuk seseorang', sitEn: 'A public address announcement that someone has a call',
    id: 'Pengeras suara mengumumkan telepon masuk untuk satu orang, memintanya mengangkat dari ekstensi terdekat, dan mengatakan bahwa penelepon menunggu.',
    en: 'The public address announces a call for one person, asks them to take it from the nearest extension, and says the caller is waiting.',
    note: 'Pengumuman seperti ini menyebut nama dan tempat mengangkatnya, karena pendengar harus memutuskan dalam dua detik apakah ini untuknya.',
    noteEn: 'An announcement like this gives the name and where to answer, because the listener must decide in two seconds whether it is for them.',
    blocks: [
      { t: ['お知らせ', 'します', '。', '営業部', 'の', '佐藤', 'さん', '、', 'お電話', 'です', '。'] },
      { t: ['内線', 'の', '十二番', 'に', 'で', 'ます', 'ので', '、', '近く', 'の', '電話', 'から', 'お取り', 'ください', '。'] },
      { t: ['お客様', 'が', 'お待ち', 'です', '。', '至急', 'の', 'ご用件', 'だ', 'そう', 'です', '。'] },
      { t: ['席', 'に', '戻られ', 'ない', '場合', 'は', '、', '受付', 'まで', 'お知らせ', 'ください', '。', '伝言', 'を', 'お受け', 'します', '。'] },
      { t: ['繰り返します', '。', '営業部', 'の', '佐藤', 'さん', '、', '内線', '十二番', 'です', '。'] },
    ]
  },
]);
