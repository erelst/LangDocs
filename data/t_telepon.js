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
    judulT: ['お電話', 'ありがとうございます'],
    judul: 'Menelepon kantor dan bukan orang yang dituju yang mengangkat', judulEn: 'Calling an office and reaching someone else',
    speakers: {'A':'petugas','B':'klien'},
    sit: 'Percakapan telepon ke kantor, diangkat resepsionis', sitEn: 'A phone call to an office, answered by reception',
    id: 'Saya menyebut nama dan keperluan, ditanya apakah waktunya tepat, lalu disambungkan ke orang yang dituju.',
    en: 'I give my name and my business, am asked whether now is a good time, and am put through to the person I need.',
    note: 'Pembuka telepon yang berguna menyebut nama dan keperluan sekaligus, karena yang mengangkat bukan orang yang dituju.',
    noteEn: 'A useful call opening gives name and purpose together, because the person answering is not the one wanted.',
    blocks: [
      { sp: 'B', id: ['Maaf mengganggu waktu Anda.', 'Saya menelepon atas perkenalan Tanaka.', 'Nama saya Yamada.'], en: ['I\'m sorry to trouble you when you\'re busy.', 'I\'m calling on Tanaka\'s introduction.', 'My name is Yamada.'], t: ['お忙しい', 'ところ', '失礼', 'します', '。', '田中', 'の', '紹介', 'で', 'お電話', 'しました', '。', '山田', 'と', '申し', 'ます', '。'] },
      { sp: 'A', id: ['Terima kasih atas kerja samanya.', 'Ada keperluan apa, ya?'], en: ['Thank you for your continued support.', 'What is it regarding?'], t: ['お世話に', 'なって', 'おります', '。', 'どの', 'よう', 'な', 'ご用件', 'でしょうか', '。'] },
      { sp: 'B', id: 'Saya ingin berkonsultasi soal jadwal pengiriman barang.', en: 'There\'s something I\'d like to discuss about the delivery schedule.', t: ['納品', 'の', '日程', 'について', '、', 'ご相談', 'したい', 'こと', 'が', 'あり', 'ます', '。'] },
      { sp: 'A', id: ['Baik, saya mengerti.', 'Saya sambungkan ke penanggung jawabnya, mohon tunggu sebentar.'], en: ['Certainly.', 'I\'ll connect you to the person in charge, so please hold for a moment.'], t: ['かしこまり', 'ました', '。', '担当', 'の', '者', 'に', 'おつなぎ', 'します', 'ので', '、', '少々', 'お待ち', 'ください', '。'] },
      { sp: 'B', id: 'Ya, tolong.', en: 'Yes, please.', t: ['お願い', 'します', '。'] },
      { sp: 'A', id: ['Terima kasih sudah menunggu.', 'Sekarang saya sambungkan ke penanggung jawabnya.'], en: ['Thank you for waiting.', 'I\'m connecting you to the person in charge now.'], t: ['お待たせ', 'しました', '。', 'ただ今', '、', '担当', 'に', 'つなぎ', 'ます', '。'] },
      { sp: 'B', id: 'Terima kasih.', en: 'Thank you.', t: ['ありがとう', 'ございます', '。'] },
    ]
  },
  {
    key: 'telepon_cerita_salah_sambung', topic: 'telepon', jenis: 'cerita',
    judulT: ['番号', 'を', '間違えた', '話'],
    judul: 'Salah sambung ke nomor yang mirip', judulEn: 'The call that went to a similar number',
    rel: 'orang_asing',
    sit: 'Menceritakan salah sambung dan bagaimana ditutup dengan baik', sitEn: 'Recounting a wrong number and how it was closed politely',
    id: 'Saya salah menekan satu angka, berbicara dua menit sebelum sadar, dan menutupnya dengan permintaan maaf.',
    en: 'I misdialled one digit, talked for two minutes before realising, and closed with an apology.',
    note: 'Cerita seperti ini punya tiga bagian: kesalahannya, saat ketahuan, dan bagaimana ditutup.',
    noteEn: 'A story like this has three parts: the mistake, when it surfaced, and how it was closed.',
    blocks: [
      { id: 'Minggu lalu, niat saya menelepon rekanan, tetapi saya salah satu angka di nomornya.', en: 'Last week I meant to call a supplier but got one digit of the number wrong.', t: ['先週', '、', '業者', 'さん', 'に', '電話', 'する', 'つもり', 'が', '、', '番号', 'を', '一', 'つ', '間違え', 'ました', '。'] },
      { id: 'Karena lawan bicaranya bekerja di bidang yang mirip, saya mengira pembicaraannya nyambung.', en: 'The person on the other end worked in a similar field, so I thought the conversation was making sense.', t: ['相手', 'は', '同じ', 'よう', 'な', '仕事', 'の', '人', 'だった', 'ので', '、', '話', 'が', 'かみ合って', 'いる', 'と', '思って', 'いました', '。'] },
      { id: 'Setelah berbicara sekitar dua menit, barulah saya sadar bahwa nama perusahaannya berbeda.', en: 'After talking for about two minutes, I noticed that the company name was different.', t: ['二', '分', 'ほど', '話して', 'から', '、', '会社', 'の', '名前', 'が', '違う', 'の', 'に', '気が付き', 'ました', '。'] },
      { id: 'Saya langsung minta maaf, dan menjelaskan kenapa saya salah sambung.', en: 'I apologised straight away and explained why I\'d got it wrong.', t: ['すぐ', 'に', '謝って', '、', 'なぜ', '間違え', 'た', 'の', 'か', 'を', '説明', 'しました', '。'] },
      { id: 'Orang itu tertawa, dan mengatakan bahwa hal itu sering terjadi.', en: 'The person laughed and said it happens all the time.', t: ['相手', 'は', '笑って', '、', '「', 'よく', 'ある', 'こと', 'です', '」', 'と', '言って', 'くれ', 'ました', '。'] },
    ]
  },
  {
    key: 'telepon_kronologi_menunggu_di_telepon', topic: 'telepon', jenis: 'kronologi',
    judulT: ['つ', 'な', 'が', 'る', 'までの', '待ち時間'],
    judul: 'Menunggu di telepon sampai disambungkan', judulEn: 'Waiting on the line to be put through',
    rel: 'petugas',
    sit: 'Menceritakan urutan menelepon dan menunggu sampai bicara dengan orang yang dituju', sitEn: 'Recounting a call and the wait until reaching the right person',
    id: 'Saya menekan nomor, mendengar menu otomatis, menunggu delapan menit, lalu berbicara setelah disambungkan.',
    en: 'I dialled, heard an automated menu, waited eight minutes, then spoke once I was put through.',
    note: 'Urutannya diikat たら dan ので, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by たら and ので, so each line explains the one before it.',
    blocks: [
      { id: 'Begitu saya tekan nomornya, langsung terdengar panduan otomatis.', en: 'As soon as I pressed the number, an automated message started playing.', t: ['番号', 'を', '押した', 'ら', '、', 'すぐ', 'に', '自動', 'の', '案内', 'が', '流れ', 'ました', '。'] },
      { id: 'Karena dikatakan tekan satu, saya lakukan persis seperti itu.', en: 'I was told to press one, so I did exactly that.', t: ['「', '一', '番', 'を', '押して', 'ください', '」', 'と', '言われ', 'た', 'ので', '、', 'その', 'とおり', 'に', 'しました', '。'] },
      { id: 'Setelah menunggu sekitar delapan menit, barulah ada orang yang menjawab.', en: 'After waiting about eight minutes, a person answered.', t: ['八分', 'ほど', '待った', 'あと', 'で', '、', '人', 'が', '出', 'ました', '。'] },
      { id: 'Setelah saya menyebutkan nama dan keperluan saya, sambungannya dialihkan ke penanggung jawabnya.', en: 'Once I\'d given my name and what it was about, I was transferred to the person in charge.', t: ['名前', 'と', '用件', 'を', '伝えた', 'ら', '、', '担当', 'の', '人', 'に', '変わり', 'ました', '。'] },
      { id: 'Karena butuh sepuluh menit sampai mulai bicara, sekarang saya menyiapkan waktu lebih.', en: 'It took ten minutes before we started talking, so now I make sure to allow extra time.', t: ['話し', '始める', 'まで', 'に', '十分', 'かかった', 'ので', '、', '時間', 'に', '余裕', 'を', '持つ', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'telepon_curhatan_telepon_mendesak', topic: 'telepon', jenis: 'curhatan',
    judulT: ['忙しい', 'とき', 'に', '限って', '鳴る'],
    judul: 'Telepon yang selalu datang di waktu sibuk', judulEn: 'Calls that always arrive at the worst time',
    rel: 'rekan',
    sit: 'Mengeluh soal telepon yang datang di waktu paling sibuk, tanpa minta saran', sitEn: 'Venting about calls arriving at the busiest time, without asking for advice',
    id: 'Telepon selalu berbunyi justru saat saya sedang menjelaskan sesuatu, dan setelah diangkat ternyata bukan hal mendesak.',
    en: 'The phone always rings exactly when I am explaining something, and when I answer it is never urgent.',
    note: 'Keluhan seperti ini diarahkan ke waktunya, bukan ke orang yang menelepon, dan tidak menuntut aturan baru.',
    noteEn: 'A complaint like this aims at the timing, not the caller, and does not demand a new rule.',
    blocks: [
      { id: 'Telepon itu, entah kenapa selalu berdering waktu saya sedang menjelaskan sesuatu.', en: 'The phone always seems to ring just when I\'m in the middle of explaining something.', t: ['電話', 'が', '鳴る', 'の', 'って', '、', 'なぜ', 'か', '説明', 'して', 'いる', 'とき', 'な', 'ん', 'だ', 'よ', '。'] },
      { id: 'Karena harus diangkat, saya hentikan pembicaraannya, dan begitu kembali saya sudah lupa sampai mana.', en: 'I have to stop and answer it, and when I come back I\'ve lost track of where I was.', t: ['出', 'なければ', 'ならない', 'から', '話', 'を', '止めて', '、', '戻った', 'ら', 'どこ', 'まで', '話した', 'か', '分から', 'なく', 'なる', '。'] },
      { id: 'Bahkan, setelah diangkat, lebih banyak yang sebenarnya bisa dibicarakan nanti.', en: 'On top of that, when I do answer, most of it could have waited.', t: ['しかも', '、', '出て', 'みる', 'と', '、', 'あと', 'で', 'も', 'いい', 'こと', 'の', '方', 'が', '多い', '。'] },
      { id: 'Hari ini pun, dalam tiga puluh menit berdering empat kali.', en: 'Today too, it rang four times within thirty minutes.', t: ['今日', 'も', '、', '三十分', 'の', 'うち', 'に', '四', '回', '鳴った', 'んだ', '。'] },
      { id: 'Bukannya ingin bilang kurangi teleponnya, saya hanya ingin waktunya dipilih.', en: 'It\'s not that I want fewer calls, I just want them to pick their moment.', t: ['電話', 'を', '減らせ', 'と', '言いたい', 'わけ', 'じゃ', 'なくて', '、', '時間', 'を', '選んで', 'ほしい', 'だけ', 'な', 'ん', 'だ', 'けど', 'ね', '。'] },
    ]
  },
  {
    key: 'telepon_keluhan_operator_tidak_menyambung', topic: 'telepon', jenis: 'keluhan',
    judulT: ['三回', 'とも', '途中', 'で', '切れ', 'ました'],
    judul: 'Sudah tiga kali disambungkan tetapi tidak pernah tersambung', judulEn: 'Put through three times and never connected',
    rel: 'petugas',
    sit: 'Menyampaikan keluhan ke operator bahwa sambungannya selalu terputus', sitEn: 'Complaining to an operator that the connection keeps dropping',
    id: 'Saya menyampaikan bahwa tiga kali dini hari sambungannya terputus di tengah, dan meminta dicatat nomor saya.',
    en: 'I say that three times the line dropped mid-call, and ask for my number to be taken down.',
    note: 'Keluhan ke operator berhasil karena yang diminta adalah pencatatan, bukan penjelasan sebabnya.',
    noteEn: 'A complaint to an operator works because what is asked is a record, not an explanation of the cause.',
    blocks: [
      { id: 'Maaf merepotkan, ada sedikit yang ingin saya sampaikan.', en: 'I\'m sorry to trouble you, but there\'s something I\'d like to raise.', t: ['お手数', 'を', 'おかけ', 'します', 'が', '、', '少し', 'お伝え', 'したい', 'こと', 'が', 'あり', 'ます', '。'] },
      { id: 'Sampai sekarang saya sudah tiga kali disambungkan ke penanggung jawabnya,', en: 'I\'ve been connected to the person in charge three times so far,', t: ['ただ今', 'まで', 'に', '三', '回', '、', '担当', 'の', '方', 'に', 'つないで', 'いただいた', 'の', 'です', 'が', '、'] },
      { id: 'tetapi semuanya terputus di tengah pembicaraan, dan saya tidak pernah bisa bicara sampai selesai.', en: 'and every time the call cut off mid-conversation, so I never got to finish talking.', t: ['いずれ', 'も', '話', 'の', '途中', 'で', '切れて', 'しまい', '、', '最後', 'まで', '話せ', 'ません', 'でした', '。'] },
      { id: 'Saya tidak keberatan disambungkan lagi, tetapi tolong catat bahwa sambungannya terputus.', en: 'I don\'t mind being connected again, but please keep a record that the calls were cut off.', t: ['もう', '一度', 'つないで', 'いただく', 'の', 'は', '構い', 'ません', 'が', '、', '切れた', 'こと', 'を', '記録', 'に', '残して', 'ください', '。'] },
      { id: ['Nomor saya nomor telepon ini.', 'Akan sangat membantu kalau Anda menelepon balik.'], en: ['My number is this one.', 'It would help if you could call me back.'], t: ['私', 'の', '番号', 'は', '、', 'この', '電話', 'です', '。', 'かけ', '直して', 'いただける', 'と', '助かり', 'ます', '。'] },
    ]
  },
  {
    key: 'telepon_penjelasan_cara_meninggalkan_pesan', topic: 'telepon', jenis: 'penjelasan',
    judulT: ['伝言', 'の', '残し方'],
    judul: 'Cara meninggalkan pesan yang berguna', judulEn: 'How to leave a message that works',
    rel: 'rekan',
    sit: 'Menerangkan cara meninggalkan pesan kepada rekan yang baru bergabung', sitEn: 'Explaining how to leave a useful message to a new colleague',
    id: 'Saya menerangkan bahwa pesan yang berguna menyebut nama, keperluan, batas waktu, dan nomor yang bisa dihubungi.',
    en: 'I explain that a useful message gives the name, the purpose, a deadline, and a number to call back.',
    note: 'Penjelasan yang berguna menyebut urutannya, karena pesan yang salah urutan membuat yang mendengar harus memutar ulang.',
    noteEn: 'A useful explanation gives the order, because a message out of order makes the listener replay it.',
    blocks: [
      { id: ['Waktu menitipkan pesan, urutannya penting.', 'Sebutkan nama Anda lebih dulu.'], en: ['When you leave a message, the order matters.', 'Please give your name first.'], t: ['伝言', 'を', 'お願い', 'する', 'とき', 'は、', '順番', 'が', '大事', 'です', '。', '最初', 'に', '名前', 'を', '言って', 'ください', '。'] },
      { id: ['Selanjutnya, sebutkan keperluannya dalam satu kalimat.', 'Cukup dengan soal penawaran.'], en: ['Next, say what it\'s about in one sentence.', 'Just \'about the quotation\' is enough.'], t: ['次', 'に', '、', '何', 'の', '件', 'か', 'を', '一言', 'で', '言います', '。', '「', '見積', 'の', '件', '」', 'で', '十分', 'です', '。'] },
      { id: ['Setelah itu, sampaikan kapan paling lambat diperlukan.', 'Kalau ada tenggatnya, lawan bicara bisa memprioritaskan.'], en: ['After that, say by when you need it.', 'Having a deadline lets them prioritise.'], t: ['その', 'あと', 'で', '、', 'いつ', 'まで', 'に', '必要', 'か', 'を', '伝えます', '。', '期限', 'が', 'ある', 'と', '、', '相手', 'が', '優先', 'できます', '。'] },
      { id: ['Terakhir, sebutkan nomor yang ingin dihubungi kembali dengan lambat.', 'Akan membantu kalau sekali saja sudah tersampaikan.'], en: ['Finally, say the number to call back slowly.', 'It helps if it gets through the first time.'], t: ['最後', 'に', '、', 'かけ', '直して', 'ほしい', '番号', 'を', 'ゆっくり', '言って', 'ください', '。', '一度', 'で', '伝わる', 'と', '助かり', 'ます', '。'] },
      { id: 'Daripada berbicara panjang, menyebutkan empat hal ini dengan singkat lebih mudah tersampaikan.', en: 'Rather than talking at length, saying these four things briefly gets through better.', t: ['長く', '話す', 'より', '、', 'この', '四つ', 'を', '短く', '言う', '方', 'が', '、', '伝わり', 'ます', '。'] },
    ]
  },
  {
    key: 'telepon_laporan_akan_terlambat', topic: 'telepon', jenis: 'laporan',
    judulT: ['電車', 'の', '中', 'から', '連絡します'],
    judul: 'Menelepon dari kereta yang berisik', judulEn: 'Calling from a noisy train',
    rel: 'klien',
    sit: 'Menelepon dari dalam kereta, dan suaranya sulit didengar', sitEn: 'Calling from inside a train where the line is hard to hear',
    id: 'Saya menelepon dari kereta yang berisik, memastikan lawan bicara bisa mendengar, dan mengulang satu bagian sebelum menutup.',
    en: 'I call from a noisy train, check that the other person can hear me, and repeat one part before hanging up.',
    note: 'Yang menentukan di sini bukan isi laporannya, melainkan bahwa penelepon memeriksa sambungannya lebih dulu, karena suara kereta sering membuat satu kalimat hilang.',
    noteEn: 'What matters here is not the content of the report but that the caller checks the line first, because train noise often swallows a whole sentence.',
    blocks: [
      { id: 'Halo, saya sekarang sedang di dalam kereta, apakah terdengar?', en: 'Hello, I\'m on the train at the moment, can you hear me?', t: ['もしもし', '、', '今', '、', '電車', 'の', '中', 'なん', 'です', 'が', '、', '聞こえ', 'ます', 'か', '。'] },
      { id: ['Agak sulit terdengar.', 'Karena suara di sekitarnya ramai.'], en: ['It\'s a little hard to hear.', 'Because of the noise around you.'], t: ['少し', '聞き取りにくい', 'です', '。', '周り', 'の', '音', 'が', '大きい', 'ので', '。'] },
      { id: ['Maaf.', 'Bisa menunggu sebentar sampai saya tiba di stasiun?'], en: ['Sorry.', 'Could you wait a moment until I get to a station?'], t: ['すみません', '。', '駅', 'に', '着く', 'まで', '、', '少し', '待って', 'いただけ', 'ます', 'か', '。'] },
      { id: ['Baik, saya mengerti.', 'Kalau begitu, nanti saya yang menelepon setelah Anda tiba.'], en: ['Certainly.', 'Then I\'ll call you once you\'ve arrived.'], t: ['かしこまり', 'ました', '。', 'では', '、', '着い', 'たら', 'こちら', 'から', 'かけ', 'ます', '。'] },
      { id: ['Ya, tolong.', 'Pembicaraan pentingnya saya telepon ulang dari tempat yang tenang.'], en: ['Please do.', 'I\'ll call back about the important part from somewhere quiet.'], t: ['お願い', 'します', '。', '大事', 'な', '話', 'は', '、', '静か', 'な', '場所', 'から', 'かけ', '直します', '。'] },
    ]
  },
  {
    key: 'telepon_rencana_menelepon_ulang', topic: 'telepon', jenis: 'rencana',
    judulT: ['かけ', '直す', '段', '取り'],
    judul: 'Rencana menelepon ulang', judulEn: 'Planning to call back',
    rel: 'rekan',
    sit: 'Menyusun rencana menelepon ulang, dengan waktu dan cara', sitEn: 'Planning a call back, with a time and a way',
    id: 'Kami menyepakati menelepon ulang setelah makan siang, lewat nomor kantor, dan menyiapkan dua berkas sebelum menelepon.',
    en: 'We agree to call again after lunch, on the office number, and to have two documents ready before calling.',
    note: 'Rencana menelepon berguna karena menyebut apa yang harus siap sebelum menelepon.',
    noteEn: 'A plan to call is useful because it says what must be ready beforehand.',
    blocks: [
      { id: 'Soal tadi, mari saya telepon ulang setelah makan siang.', en: 'About what we discussed, let\'s call back after lunch.', t: ['さっき', 'の', '件', 'は', '、', '昼', 'の', 'あと', 'で', 'かけ', '直そう', '。'] },
      { id: 'Lawan bicaranya lebih mudah dihubungi sore, jadi setelah lewat jam satu.', en: 'They\'re easier to reach in the afternoon, so just after one.', t: ['相手', 'は', '午後', 'の', '方が', '出', 'やすい', 'から', '、', '一時', '過ぎ', 'に', 'する', '。'] },
      { id: 'Ponsel saya kadang tidak ada sinyal, jadi saya pakai nomor kantor.', en: 'My mobile sometimes has no signal, so I\'ll use the office number.', t: ['私', 'の', '携帯', 'は', '圏外', 'に', 'なる', 'こと', 'が', 'ある', 'ので', '、', '会社', 'の', '番号', 'を', '使う', '。'] },
      { id: 'Sebelum menelepon, siapkan dulu kertas penawaran dan tenggatnya di dekat saya.', en: 'Before calling, I\'ll have the quotation and the delivery date sheet to hand.', t: ['かける', '前', 'に', '、', '見積', 'と', '納期', 'の', '紙', 'を', '手元', 'に', '用意', 'して', 'おく', '。'] },
      { id: 'Isi pembicaraannya saya catat saat itu juga, dan nanti kita periksa berdua.', en: 'I\'ll note down what\'s said as we go, and we\'ll check it together afterwards.', t: ['話した', '内容', 'は', '、', 'その場', 'で', 'メモ', 'して', '、', 'あと', 'で', '二人', 'で', '確認', 'しよう', '。'] },
    ]
  },
  {
    key: 'telepon_nasihat_jangan_telepon_malam', topic: 'telepon', jenis: 'nasihat',
    judulT: ['夜', 'に', '電話', 'しない', 'こと'],
    judul: 'Jangan menelepon kantor pada malam hari', judulEn: 'Do not call an office late at night',
    rel: 'rekan',
    sit: 'Menasihati rekan soal waktu yang tepat untuk menelepon', sitEn: 'Advising a colleague on when to call',
    id: 'Saya menyarankan menelepon pada jam kerja dan mengirim pesan di luar itu, karena telepon di luar jam membuat orang harus menyiapkan jawaban mendadak.',
    en: 'I suggest calling during office hours and messaging outside them, because a call out of hours forces an answer to be invented on the spot.',
    note: 'Nasihat yang berguna menyebut alasannya dari sisi yang menerima telepon, bukan dari sisi aturan.',
    noteEn: 'Useful advice gives the reason from the receiver\'s side rather than from the rulebook.',
    blocks: [
      { id: 'Telepon urusan kerja sebaiknya antara jam sembilan sampai jam enam.', en: 'Work calls are better made between nine and six.', t: ['仕事', 'の', '電話', 'は', '、', '九時', 'から', '六時', 'まで', 'の', '間', 'に', 'した', '方', 'が', 'いい', 'よ', '。'] },
      { id: 'Di luar waktu itu, orang tidak bisa mengangkat, atau walau diangkat bahannya tidak ada di tangan.', en: 'Outside those hours, people either can\'t pick up, or if they do, they don\'t have the paperwork to hand.', t: ['それ', '以外', 'の', '時間', 'は', '、', '出', 'られ', 'ない', 'か', '、', '出て', 'も', '手元', 'に', '資料', 'が', 'ありません', '。'] },
      { id: ['Kalau mendesak, pesan lebih pasti daripada telepon.', 'Karena bisa dibaca nanti.'], en: ['If it is urgent, a message is more reliable than a call.', 'Because it can be read later.'], t: ['急ぎ', 'なら', '、', '電話', 'より', 'メッセージ', 'の', '方', 'が', '確か', 'です', '。', 'あと', 'で', '読め', 'ます', 'から', '。'] },
      { id: 'Kalau memang ingin menyampaikan malam, tambahkan bahwa besok pun tidak apa-apa.', en: 'If you really want to convey it at night, adding that tomorrow is fine helps.', t: ['もし', '夜', 'に', 'なって', 'も', '伝え', 'たい', 'なら、', '「', '明日', 'で', '構い', 'ません', '」', 'と', '添える', 'と', 'いい', '。'] },
      { id: 'Orang yang menelepon dengan mempertimbangkan keadaan lawan bicara yang akhirnya lebih dipercaya.', en: 'People who call with the other person\'s circumstances in mind end up being trusted.', t: ['相手', 'の', '都合', 'を', '考えて', 'かける', '人', 'の', '方', 'が', '、', '結局', '信頼', 'されます', '。'] },
    ]
  },
  {
    key: 'telepon_permintaan_minta_ditelepon_kembali', topic: 'telepon', jenis: 'permintaan',
    judulT: ['かけ', '直して', 'いただけますか'],
    judul: 'Meminta ditelepon kembali', judulEn: 'Asking to be called back',
    rel: 'petugas',
    sit: 'Meminta ditelepon kembali karena sedang tidak bisa bicara', sitEn: 'Asking to be called back because now is not a good time',
    id: 'Saya meminta ditelepon kembali satu jam lagi karena sedang di luar, dan menyebut jam yang pasti.',
    en: 'I ask to be called back in an hour because I am out, and give the exact time.',
    note: 'Permintaan seperti ini diterima karena jamnya pasti, bukan karena kalimatnya sopan panjang.',
    noteEn: 'A request like this is granted because the hour is exact, not because the sentence is long and polite.',
    blocks: [
      { id: ['Terima kasih teleponnya.', 'Saya sekarang sedang di luar, jadi tidak bisa bicara dengan tenang.'], en: ['Thank you for calling.', 'I\'m out at the moment and can\'t talk properly.'], t: ['お電話', 'ありがとう', 'ございます', '。', 'ただ', '今', '、', '外出', 'して', 'いて', '、', '落ち着いて', '話せ', 'ません', '。'] },
      { id: 'Kalau satu jam lagi, saya sudah kembali di tempat.', en: 'If it\'s an hour from now, I\'ll be back at my desk.', t: ['一', '時間', '後', 'で', 'あれ', 'ば', '、', '席', 'に', '戻って', 'います', '。'] },
      { id: 'Maaf merepotkan, bisakah Anda menelepon lagi sekitar jam sebelas?', en: 'I\'m sorry to trouble you, but could you call again around eleven?', t: ['お手数', 'ですが', '、', '十一時', 'ごろ', 'に', 'もう', '一度', 'お電話', 'いただけ', 'ません', 'か', '。'] },
      { id: 'Saya sendiri juga bisa menelepon, tetapi saya tidak tahu waktu yang pas untuk Anda.', en: 'I could call you myself, but I don\'t know what suits you.', t: ['私', 'から', 'かける', 'こと', 'も', 'できます', 'が', '、', 'そちらの', '都合', 'が', '分から', 'ない', 'ので', '。'] },
      { id: 'Kalau jam sebelas sulit, tolong beri tahu waktu yang nyaman bagi Anda.', en: 'If eleven is difficult, please tell me a time that\'s convenient for you.', t: ['もし', '十一時', 'が', '難しけれ', 'ば', '、', 'ご都合', 'の', 'いい', '時間', 'を', '教えて', 'ください', '。'] },
    ]
  },
  {
    key: 'telepon_pengalaman_telepon_penting_terlewat', topic: 'telepon', jenis: 'pengalaman',
    judulT: ['大事', 'な', '電話', 'を', '逃', 'した', '話'],
    judul: 'Telepon penting yang terlewat', judulEn: 'The important call I missed',
    rel: 'rekan',
    sit: 'Menceritakan telepon penting yang terlewat dan pelajarannya', sitEn: 'Recounting a missed important call and what it taught',
    id: 'Saya meninggalkan telepon tanpa suara saat rapat, kehilangan satu telepon penting, dan sejak itu menaruhnya di depan.',
    en: 'I left the phone on silent during a meeting, missed one important call, and since then keep it in front of me.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: keadaannya, yang terlewat, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the situation, what was missed, and what changed afterwards.',
    blocks: [
      { id: 'Tahun lalu, selama rapat besar, ponsel saya taruh di dalam tas.', en: 'Last year, during a big meeting, I had my phone in my bag.', t: ['去年', '、', '大きい', '打ち合わせ', 'の', '間', '、', '携帯', 'を', 'かばん', 'の', '中', 'に', '入れて', 'いました', '。'] },
      { id: 'Hari itu rapatnya berlangsung tiga jam, jadi saya baru sadar setelah selesai.', en: 'That day it ran for three hours, so I only noticed afterwards.', t: ['その', '日', 'は', '三', '時間', '続いた', 'ので', '、', '終わって', 'から', '初めて', '気が付き', 'ました', '。'] },
      { id: 'Waktu saya lihat layarnya, ada satu panggilan masuk dari mitra.', en: 'When I looked at the screen, there was one missed call from a client.', t: ['画面', 'を', '見る', 'と', '、', '取引先', 'から', 'の', '着信', 'が', '一', '件', 'あり', 'ました', '。'] },
      { id: 'Begitu saya menelepon balik, saya diberi tahu bahwa pekerjaannya sudah diberikan ke perusahaan lain.', en: 'When I called back straight away, I was told the job had already gone to another company.', t: ['すぐ', 'に', 'かけ', '直した', 'ところ', '、', 'すで', 'に', '他', 'の', '会社', 'に', '決まった', 'と', '言われ', 'ました', '。'] },
      { id: 'Sejak itu, walau sedang rapat, saya menaruhnya di atas meja, supaya sadar kalau bergetar.', en: 'Since then, even during meetings I leave it on the desk so I notice when it buzzes.', t: ['あれ', 'から', 'は', '、', '会議', '中', 'で', 'も', '机', 'の', '上', 'に', '置いて', '、', '震え', 'た', 'ら', '気が付く', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'telepon_pengumuman_telepon_masuk', topic: 'telepon', jenis: 'pengumuman',
    judulT: ['お電話', 'です、', '内線', '十二番'],
    judul: 'Pengumuman di dalam gedung saat ada telepon masuk', judulEn: 'A building announcement for an incoming call',
    rel: 'petugas',
    sit: 'Pengumuman lewat pengeras suara bahwa ada telepon masuk untuk seseorang', sitEn: 'A public address announcement that someone has a call',
    id: 'Pengeras suara mengumumkan telepon masuk untuk satu orang, memintanya mengangkat dari ekstensi terdekat, dan mengatakan bahwa penelepon menunggu.',
    en: 'The public address announces a call for one person, asks them to take it from the nearest extension, and says the caller is waiting.',
    note: 'Pengumuman seperti ini menyebut nama dan tempat mengangkatnya, karena pendengar harus memutuskan dalam dua detik apakah ini untuknya.',
    noteEn: 'An announcement like this gives the name and where to answer, because the listener must decide in two seconds whether it is for them.',
    blocks: [
      { id: ['Ada pengumuman.', 'Sato dari bagian penjualan, ada telepon untuk Anda.'], en: ['An announcement.', 'Sato from the sales department, there\'s a call for you.'], t: ['お知らせ', 'します', '。', '営業部', 'の', '佐藤', 'さん', '、', 'お電話', 'です', '。'] },
      { id: 'Silakan angkat di nomor ekstensi dua belas, dari telepon yang terdekat.', en: 'Please pick up on extension twelve, from the nearest phone.', t: ['内線', 'の', '十二番', 'に', 'で', 'ます', 'ので', '、', '近く', 'の', '電話', 'から', 'お取り', 'ください', '。'] },
      { id: ['Pelanggannya sedang menunggu.', 'Katanya keperluannya mendesak.'], en: ['The customer is waiting.', 'They say it\'s urgent.'], t: ['お客様', 'が', 'お待ち', 'です', '。', '至急', 'の', 'ご用件', 'だ', 'そう', 'です', '。'] },
      { id: ['Kalau tidak bisa kembali ke tempat, tolong beri tahu resepsionis.', 'Saya akan menerima pesannya.'], en: ['If you can\'t get back to your desk, please let reception know.', 'We\'ll take a message.'], t: ['席', 'に', '戻られ', 'ない', '場合', 'は', '、', '受付', 'まで', 'お知らせ', 'ください', '。', '伝言', 'を', 'お受け', 'します', '。'] },
      { id: ['Saya ulangi.', 'Sato dari bagian penjualan, nomor ekstensi dua belas.'], en: ['I\'ll repeat that.', 'Sato from the sales department, extension twelve.'], t: ['繰り返します', '。', '営業部', 'の', '佐藤', 'さん', '、', '内線', '十二番', 'です', '。'] },
    ]
  },
]);
