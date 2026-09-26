/* Kegiatan: neighbourhood and group activities, where almost nobody knows each other well.
 *
 * Paid work is kerja and going out with friends is santai; this file is the community centre
 * and the school meeting.
 *
 * It is the only topic where the group matters as much as the individual: 社会参加 and 課外活動 are the
 * cells behind it, and one person in three is talking to more than one listener, the highest
 * of any topic. That is why introducing yourself and volunteering for a job are here.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - kegiatan lingkungan: kerja bakti, rapat RT, membagi undangan
 * - kegiatan sekolah anak: pertemuan orang tua, kegiatan kelas, membawa perlengkapan
 * - kegiatan kelompok: kursus, klub, kegiatan sukarela
 * - memperkenalkan diri di kelompok yang belum dikenal
 * - mengajukan diri untuk tugas, dan menolak dengan alasan yang jelas
 * - menanyakan jadwal, tempat, dan apa yang perlu dibawa
 * Tidak termasuk:
 * - pekerjaan berbayar, masuk ke `kerja`
 * - acara waktu luang bersama teman, masuk ke `santai`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'kegiatan_percakapan_tanya_bawaan', topic: 'kegiatan', jenis: 'percakapan',
    judulT: ['何', 'を', '持って', '行けば', 'いいですか'],
    judul: 'Menanyakan apa yang perlu dibawa', judulEn: 'Asking what to bring',
    speakers: {'A':'tetangga','B':'tetangga_baru'},
    sit: 'Dua orang membicarakan perlengkapan kerja bakti', sitEn: 'Two people discussing what to bring to a community work day',
    id: 'Saya menanyakan apa yang perlu dibawa, dan yang menjawab menyebut sarung tangan serta waktu mulai yang sebenarnya.',
    en: 'I ask what to bring, and the answer names gloves as well as the actual starting time.',
    note: 'Jawaban yang berguna menyebut waktu dan barang sekaligus, karena keduanya menentukan persiapan orang.',
    noteEn: 'A useful answer gives the time and the item together, because both decide what the other person prepares.',
    blocks: [
      { sp: 'B', id: 'Untuk kerja bakti besok, sebaiknya saya bawa apa?', en: 'For tomorrow\'s clean-up, what should I bring?', t: ['明日', 'の', '掃除', '、', '何', 'を', '持って', '行け', 'ば', 'いい', 'です', 'か', '。'] },
      { sp: 'A', id: 'Sarung tangan, dan kalau ada kantong sampah, tolong dibawa.', en: 'Work gloves, and a rubbish bag if you have one, please.', t: ['軍手', 'と', '、', 'あれ', 'ば', 'ごみ袋', 'を', 'お願い', 'します', '。'] },
      { sp: 'B', id: 'Sapu tidak perlu?', en: 'Don\'t we need brooms?', t: ['ほうき', 'は', '要り', 'ません', 'か', '。'] },
      { sp: 'A', id: 'Alatnya ada punya rukun warga, jadi cukup untuk sejumlah orangnya.', en: 'The tools belong to the residents\' association, so there are enough for everyone.', t: ['道具', 'は', '自治会', 'の', '物', 'が', 'あります', 'ので', '、', '人数', '分', 'は', '足ります', '。'] },
      { sp: 'B', id: 'Sebaiknya kumpul jam berapa?', en: 'What time should we gather?', t: ['何時', 'に', '集まれ', 'ば', 'いい', 'です', 'か', '。'] },
      { sp: 'A', id: 'Yang tertulis jam delapan, tetapi sebenarnya mulai jam delapan setengah.', en: 'It says eight, but we actually start at half past eight.', t: ['八時', 'と', '書いて', 'あります', 'が', '、', '実際', 'は', '八時半', 'に', '始まり', 'ます', '。'] },
      { sp: 'B', id: 'Kalau begitu, saya datang jam delapan dan memesan tempat dulu.', en: 'Then I\'ll go at eight and save us a spot.', t: ['では', '、', '八時', 'に', '行って', '、', '先', 'に', '場所', 'を', '取って', 'おきます', '。'] },
    ]
  },
  {
    key: 'kegiatan_cerita_rapat_rt_yang_panjang', topic: 'kegiatan', jenis: 'cerita',
    judulT: ['三時間', 'かかった', '集まり'],
    judul: 'Rapat RT yang berlangsung tiga jam', judulEn: 'A residents\' meeting that ran three hours',
    rel: 'tetangga',
    sit: 'Menceritakan rapat lingkungan yang terlalu lama karena satu hal', sitEn: 'Recounting a neighbourhood meeting that dragged because of one item',
    id: 'Rapat berjalan cepat sampai satu usulan memicu perdebatan panjang, dan sisanya diputuskan lewat surat.',
    en: 'The meeting went quickly until one proposal triggered a long argument, and the rest was settled by letter.',
    note: 'Cerita seperti ini punya tiga bagian: yang lancar, yang macet, dan jalan keluarnya.',
    noteEn: 'A story like this has three parts: what went quickly, what stalled, and the way out.',
    blocks: [
      { id: 'Sabtu malam ada pertemuan rukun tetangga.', en: 'There was a residents\' association meeting on Saturday night.', t: ['土曜', 'の', '夜', 'に', '、', '自治会', 'の', '集まり', 'が', 'あり', 'ました', '。'] },
      { id: 'Satu jam pertama berjalan sesuai rencana, dan tiga pokok bahasan selesai dengan cepat.', en: 'The first hour went as planned, and three agenda items were finished quickly.', t: ['最初', 'の', '一時間', 'は', '、', '予定', 'どおり', 'に', '進んで', '、', '三つ', 'の', '議題', 'が', 'すぐ', 'に', '終わり', 'ました', '。'] },
      { id: 'Akan tetapi, pada usulan memindahkan tempat pembuangan sampah, pendapatnya terbelah dua.', en: 'However, opinions split in two over the proposal to move the rubbish collection point.', t: ['ところが', '、', 'ごみ', '置き場', 'の', '場所', 'を', '変える', '案', 'で', '、', '意見', 'が', '二つ', 'に', '分かれ', 'ました', '。'] },
      { id: 'Akhirnya, hanya karena satu hal itu rapat memakan dua jam, dan tetap tidak selesai.', en: 'In the end, that single item took two hours, and it still wasn\'t settled.', t: ['結局', '、', 'その', '一件', 'だけで', '二時間', 'かかり', '、', '最後', 'まで', '決まり', 'ません', 'でした', '。'] },
      { id: 'Pokok bahasan sisanya diputuskan dengan mengedarkan kertas setelahnya.', en: 'The remaining items were left to be decided later by circulating a sheet.', t: ['残り', 'の', '議題', 'は', '、', 'あと', 'で', '紙', 'を', '回して', '決める', 'こと', 'に', 'なり', 'ました', '。'] },
    ]
  },
  {
    key: 'kegiatan_kronologi_kerja_bakti', topic: 'kegiatan', jenis: 'kronologi',
    judulT: ['朝', 'の', '掃除', 'の', '順番'],
    judul: 'Urutan kerja bakti pagi', judulEn: 'The order of a morning work day',
    rel: 'tetangga',
    sit: 'Menceritakan urutan kerja bakti dari berkumpul sampai selesai', sitEn: 'Recounting a community work day from gathering to finishing',
    id: 'Kami berkumpul, membagi area, membersihkan dua jam, lalu makan bersama dan membahas pekerjaan berikutnya.',
    en: 'We gathered, divided the areas, cleaned for two hours, then ate together and discussed the next job.',
    note: 'Urutannya diikat たら dan ので, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by たら and ので, so each line explains the one before it.',
    blocks: [
      { id: 'Waktu saya tiba di taman jam delapan, sudah sekitar sepuluh orang berkumpul.', en: 'When I got to the park at eight, about ten people had already gathered.', t: ['八時', 'に', '公園', 'に', '着いた', 'ら', '、', 'もう', '十人', 'ほど', '集まって', 'いました', '。'] },
      { id: 'Kami dibagi menjadi tiga kelompok, dan saya mendapat bagian rumput di sisi sungai.', en: 'We split into three groups, and I was put in charge of the grass on the river side.', t: ['班', 'が', '三つ', 'に', '分かれ', 'て', '、', '私', 'は', '川', '側', 'の', '草', 'を', '担当', 'する', 'こと', 'に', 'なり', 'ました', '。'] },
      { id: 'Rumputnya lebih banyak dari dugaan, dan dalam satu jam sudah menjadi lima kantong.', en: 'There was more grass than I expected, and in an hour it had filled five bags.', t: ['草', 'が', '思った', 'より', '多く', 'て', '、', '一', '時間', 'で', '袋', 'が', '五つ', 'に', 'なり', 'ました', '。'] },
      { id: 'Jam sepuluh kami berhenti sekali dan meminum teh yang kami bawa.', en: 'At ten we took a break and drank the tea we\'d brought.', t: ['十時', 'に', '一度', '休んで', '、', '持って', 'きた', 'お茶', 'を', '飲み', 'ました', '。'] },
      { id: 'Jam sebelas semuanya selesai, jadi setelah itu kami makan ringan lalu bubar.', en: 'Everything was finished by eleven, so after that we had a light meal and dispersed.', t: ['十一時', 'に', '全部', '終わった', 'ので', '、', 'その', 'あと', 'は', '簡単', 'に', '食事', 'を', 'して', '解散', 'しました', '。'] },
    ]
  },
  {
    key: 'kegiatan_curhatan_tugas_yang_selalu_ke_saya', topic: 'kegiatan', jenis: 'curhatan',
    judulT: ['いつも', '私', 'に', '回って', 'くる'],
    judul: 'Tugas yang selalu jatuh ke saya', judulEn: 'The jobs that always land on me',
    rel: 'tetangga',
    sit: 'Mengeluh soal pembagian tugas lingkungan yang selalu sama, tanpa minta saran', sitEn: 'Venting about neighbourhood duties that always fall the same way, without asking for advice',
    id: 'Setiap kali ada pekerjaan, yang menghubungi pertama selalu saya, sampai akhirnya saya tidak bisa bilang tidak.',
    en: 'Whenever there is work, I am always the one contacted first, to the point that I cannot say no any more.',
    note: 'Keluhan seperti ini diarahkan ke kebiasaannya, bukan ke orang tertentu, dan tidak menuntut perubahan.',
    noteEn: 'A complaint like this aims at the habit, not at a named person, and does not demand a change.',
    blocks: [
      { id: 'Untuk pekerjaan rukun tetangga, yang selalu dimintai tolong itu saya.', en: 'With the residents\' association work, I\'m always the one who gets asked.', t: ['自治会', 'の', '仕事', 'で', '、', '頼まれる', 'の', 'が', 'いつも', '私', 'な', 'ん', 'だ', 'よ', '。'] },
      { id: 'Papan edaran, pembagian jadwal bersih-bersih, pertama-tama saya yang ditelepon.', en: 'The circular notices, the cleaning rota, I\'m the first one they call.', t: ['回覧板', 'も', '、', '掃除', 'の', '割り振り', 'も', '、', 'まず', '私', 'に', '電話', 'が', '来る', '。'] },
      { id: 'Saya pernah menolak sekali, tetapi waktu itu tidak ada orang lain, dan akhirnya saya menerimanya juga.', en: 'I once turned something down, but back then no one else could be found, so I ended up taking it anyway.', t: ['一度', '断った', 'こと', 'も', 'ある', 'ん', 'だけど', '、', 'その', 'とき', 'は', '他の', '人', 'が', '見つから', 'なくて', '、', '結局', '引き受けた', '。'] },
      { id: 'Begitu saya sadar, jadwal giliran saya tahun ini sudah menjadi tiga.', en: 'Before I knew it, I had three turns of duty this year.', t: ['気が付い', 'たら', '、', '今年', 'の', '当番', 'が', '三つ', 'に', 'なって', 'いた', '。'] },
      { id: 'Bukannya ingin tahu cara menolak, saya hanya merasa aneh kalau setiap kali yang dihubungi orang yang sama.', en: 'It\'s not that I want to know how to refuse, I just think it\'s odd that it\'s the same person every time.', t: ['断る', '方法', 'を', '聞きたい', 'わけ', 'じゃ', 'なくて', '、', '毎回', '同じ', '人', 'に', '来る', 'の', 'が', '変', 'だ', 'と', '思う', 'だけ', '。'] },
    ]
  },
  {
    key: 'kegiatan_keluhan_janji_tidak_ditepati', topic: 'kegiatan', jenis: 'keluhan',
    judulT: ['来る', 'と', '言った', '人が', '来', 'なかった'],
    judul: 'Bantuan yang dijanjikan tidak datang', judulEn: 'The help that was promised never came',
    rel: 'tetangga',
    sit: 'Menyampaikan ke tetangga bahwa bantuan yang dijanjikan tidak datang', sitEn: 'Raising with a neighbour that the promised help did not come',
    id: 'Saya menyampaikan bahwa bantuannya dijanjikan pukul sembilan tetapi tidak ada kabar, dan meminta kejelasan sebelum minggu depan.',
    en: 'I say the help was promised for nine but there was no word, and ask for clarity before next week.',
    note: 'Keluhan seperti ini disampaikan dengan menyebut janji dan waktunya, bukan dengan menyebut sifat orangnya.',
    noteEn: 'A complaint like this gives the promise and the time, not the person\'s character.',
    blocks: [
      { id: 'Soal Sabtu lalu, ada sedikit yang ingin saya sampaikan.', en: 'About last Saturday, there\'s something I\'d like to mention.', t: ['先週', 'の', '土曜', 'の', 'こと', 'で', '、', '少し', 'だけ', 'お話', 'し', 'たい', 'の', 'です', 'が', '。'] },
      { id: 'Hari itu saya diberi tahu bahwa Anda bisa membantu mulai jam sembilan.', en: 'That day I understood you\'d be able to help from nine o\'clock.', t: ['あの', '日', 'は', '、', '九時', 'に', '手伝って', 'いただける', 'と', '伺って', 'いました', '。'] },
      { id: 'Kami berdua sudah menunggu, dan sampai jam sebelas tidak ada kabar.', en: 'The two of us were waiting, and there was no word until eleven.', t: ['こちら', 'は', '二人', 'で', '待って', 'いて', '、', '十一時', 'まで', '連絡', 'が', 'あり', 'ません', 'でした', '。'] },
      { id: 'Mungkin Anda sedang sibuk, tetapi akan membantu kalau ada satu kalimat saat tidak bisa datang.', en: 'You may have been busy, but it would help if you could say a word when you can\'t come.', t: ['お忙しかった', 'の', 'か', 'も', 'しれ', 'ません', 'が', '、', '来られ', 'ない', 'とき', 'は', '一言', 'ある', 'と', '助かり', 'ます', '。'] },
      { id: 'Sebelum menentukan pekerjaan berikutnya, bisa diberi tahu waktu luang Anda?', en: 'Before we decide on the next job, could you let us know when you\'re free?', t: ['次', 'の', '作業', 'を', '決める', '前', 'に', '、', 'ご都合', 'を', '教えて', 'いただけ', 'ます', 'か', '。'] },
    ]
  },
  {
    key: 'kegiatan_penjelasan_cara_ikut_kegiatan', topic: 'kegiatan', jenis: 'penjelasan',
    judulT: ['初めて', 'の', '人が', '参加', 'する', 'に', 'は'],
    judul: 'Cara ikut kegiatan lingkungan bagi pendatang baru', judulEn: 'How a newcomer joins a community activity',
    rel: 'tetangga_baru',
    sit: 'Menerangkan cara ikut kegiatan lingkungan kepada tetangga yang baru pindah', sitEn: 'Explaining how to join in to a neighbour who has just moved in',
    id: 'Saya menerangkan bahwa tidak perlu datang setiap kali, bahwa sumbangan bulanan bukan syarat, dan bahwa memberi tahu tidak bisa hadir saja sudah cukup.',
    en: 'I explain that you need not come every time, that the monthly contribution is not a condition, and that simply saying you cannot come is enough.',
    note: 'Penjelasan untuk pendatang baru menyebut apa yang tidak diwajibkan lebih dulu, karena itu yang paling sering ditakuti orang.',
    noteEn: 'An explanation for newcomers rules out the obligations first, because that is what people fear most.',
    blocks: [
      { id: ['Pertama, tidak berarti harus hadir setiap kali.', 'Cukup hadir saat Anda bisa.'], en: ['First of all, you don\'t have to attend every time.', 'Coming when you can is enough.'], t: ['まず', '、', '毎回', '出', 'なければ', 'ならない', 'わけ', 'で', 'は', 'あり', 'ません', '。', '出られる', 'とき', 'だけ', 'で', '大丈夫', 'です', '。'] },
      { id: 'Soal iuran pun, bukan berarti tidak boleh ikut hanya karena belum membayar.', en: 'As for the fee, it\'s not that you can\'t take part just because you haven\'t paid.', t: ['会費', 'も', '、', '払って', 'いない', 'から', 'と', '言って', '参加', 'できない', 'こと', 'は', 'あり', 'ません', '。'] },
      { id: 'Kalau tidak bisa hadir, akan membantu kalau ada kabar setidaknya sehari sebelumnya.', en: 'If you can\'t come, it helps if you can let us know at least the day before.', t: ['出られ', 'ない', 'とき', 'は', '、', '前', 'の', '日', 'まで', 'に', '一言', '言って', 'いただける', 'と', '助かり', 'ます', '。'] },
      { id: ['Alatnya kami siapkan untuk yang baru pertama ikut.', 'Datang saja dengan tangan kosong.'], en: ['We prepare the tools for first-timers.', 'Just come empty-handed.'], t: ['道具', 'は', '、', '初めて', 'の', '方', 'に', 'は', 'こちら', 'で', '用意', 'します', '。', '手ぶら', 'で', '来て', 'ください', '。'] },
      { id: 'Kalau tidak ada yang Anda kenal, waktu pembagian kelompok kami perkenalkan dengan orang di sebelah.', en: 'If you don\'t know anyone, we\'ll introduce you to the person next to you when we split into groups.', t: ['知って', 'いる', '人', 'が', 'いなくて', 'も', '、', '班', 'を', '分ける', 'とき', 'に', '隣', 'の', '人', 'を', '紹介', 'します', '。'] },
    ]
  },
  {
    key: 'kegiatan_laporan_hasil_kerja_bakti', topic: 'kegiatan', jenis: 'laporan',
    judulT: ['掃除', 'の', '結果', 'の', '報告'],
    judul: 'Melaporkan hasil kerja bakti', judulEn: 'Reporting the outcome of the work day',
    rel: 'tetangga',
    sit: 'Melaporkan hasil kerja bakti kepada yang tidak hadir', sitEn: 'Reporting the work day\'s results to those who could not attend',
    id: 'Saya melaporkan berapa orang yang datang, apa yang selesai, dan apa yang tertinggal untuk bulan depan.',
    en: 'I report how many came, what got finished, and what was left for next month.',
    note: 'Laporan seperti ini menyebut yang belum selesai juga, supaya bulan depan tidak dianggap pekerjaannya sudah beres.',
    noteEn: 'A report like this names what is unfinished too, so next month does not start from a false assumption.',
    blocks: [
      { id: ['Ini laporan pekerjaan kemarin.', 'Seluruhnya terkumpul empat belas orang.'], en: ['This is the report on yesterday\'s work.', 'Fourteen people came in total.'], t: ['昨日', 'の', '作業', 'の', 'ご報告', 'です', '。', '全部', 'で', '十四人', '集まり', 'ました', '。'] },
      { id: 'Rumput di sisi sungai dan daun kering di taman selesai sesuai rencana.', en: 'The grass on the river side and the fallen leaves in the park were finished as planned.', t: ['川', '側', 'の', '草', 'と', '、', '公園', 'の', '落ち葉', 'は', '、', '予定', 'どおり', 'に', '終わり', 'ました', '。'] },
      { id: 'Bagian belakang tempat pembuangan sampah tidak tersentuh karena waktunya tidak cukup.', en: 'The area behind the rubbish point wasn\'t touched because there wasn\'t enough time.', t: ['ごみ', '置き場', 'の', '後ろ', 'は', '、', '時間', 'が', '足り', 'なくて', '手', 'が', '付き', 'ません', 'でした', '。'] },
      { id: ['Alatnya sudah dikembalikan semua ke gudang.', 'Jumlahnya juga sudah diperiksa.'], en: ['The tools have all been put back in the store.', 'The count has been checked too.'], t: ['道具', 'は', '全部', '倉庫', 'に', '戻して', 'あり', 'ます', '。', '数', 'も', '確認', 'ずみ', 'です', '。'] },
      { id: 'Sisanya kami putuskan untuk dikerjakan sekali lagi pada minggu kedua bulan depan.', en: 'We decided to gather once more in the second week of next month for what\'s left.', t: ['残った', '分', 'は', '、', '来月', 'の', '二週目', 'に', 'もう', '一度', '集まる', 'こと', 'に', 'しました', '。'] },
    ]
  },
  {
    key: 'kegiatan_rencana_rapat_rt', topic: 'kegiatan', jenis: 'rencana',
    judulT: ['来月', 'の', '集まり', 'の', '進め方'],
    judul: 'Rencana rapat RT bulan depan', judulEn: 'Planning next month\'s residents\' meeting',
    rel: 'tetangga',
    sit: 'Menyusun rencana rapat lingkungan dengan agenda dan batas waktunya', sitEn: 'Planning a neighbourhood meeting with an agenda and a time limit',
    id: 'Kami menetapkan agenda terbatas tiga hal, batas dua jam, dan aturan bahwa yang tidak selesai dibawa ke surat.',
    en: 'We set an agenda of only three items, a two-hour limit, and a rule that anything unresolved goes to a letter.',
    note: 'Rencana rapat berguna karena membatasi agendanya, bukan hanya menetapkan waktunya.',
    noteEn: 'A meeting plan is useful because it limits the agenda, not merely fixes the time.',
    blocks: [
      { id: 'Untuk pertemuan berikutnya, mari kita batasi pokok bahasannya hanya tiga.', en: 'For the next meeting, let\'s limit the agenda to just three items.', t: ['次', 'の', '集まり', 'は', '、', '議題', 'を', '三つ', 'だけ', 'に', '絞ろう', '。'] },
      { id: 'Soalnya pertemuan sebelumnya melenceng dan memakan tiga jam.', en: 'Last time the discussion wandered and took three hours.', t: ['前回', 'は', '、', '話', 'が', 'それて', '三時間', 'かかった', 'から', 'ね', '。'] },
      { id: 'Waktunya diputuskan sampai dua jam saja, dan harus selesai tepat jam delapan.', en: 'Let\'s decide the time is two hours at most, and that we definitely finish at eight.', t: ['時間', 'は', '二時間', 'まで', 'と', '決めて', '、', '八時', 'に', '必ず', '終わる', 'こと', 'に', 'する', '。'] },
      { id: 'Yang belum selesai jangan dilanjutkan di tempat, tetapi dikumpulkan dengan mengedarkan kertas.', en: 'Anything unsettled we won\'t continue on the spot, but collect by circulating a sheet.', t: ['決まら', 'なかった', '物', 'は', '、', 'その場', 'で', '続け', 'ない', 'で', '、', '紙', 'を', '回して', '集める', '。'] },
      { id: 'Persiapan tempatnya mari kita kerjakan bersama oleh yang datang lebih awal.', en: 'Let\'s have whoever arrives early set up the venue.', t: ['会場', 'の', '準備', 'は', '、', '早く', '来た', '人', 'で', 'やる', 'こと', 'に', 'しよう', '。'] },
    ]
  },
  {
    key: 'kegiatan_nasihat_jangan_terlalu_banyak_mengambil', topic: 'kegiatan', jenis: 'nasihat',
    judulT: ['引き', '受け', 'すぎ', 'ない', 'こと'],
    judul: 'Jangan mengambil terlalu banyak tugas', judulEn: 'Do not take on too many jobs',
    rel: 'tetangga',
    sit: 'Menasihati tetangga supaya tidak mengambil terlalu banyak tugas lingkungan', sitEn: 'Advising a neighbour not to take on too many community jobs',
    id: 'Saya menyarankan mengambil satu tugas saja lebih dulu, karena tugas yang menumpuk membuat orang berhenti ikut sama sekali.',
    en: 'I suggest taking only one job at first, because jobs that pile up make people stop coming altogether.',
    note: 'Nasihat yang berguna menyebut akibat jangka panjangnya, bukan hanya menyuruh berhemat tenaga.',
    noteEn: 'Useful advice names the long-term consequence, not just telling them to pace themselves.',
    blocks: [
      { id: 'Menerima tiga pekerjaan sekaligus sejak awal sebaiknya jangan.', en: 'You\'d better not take on three things at once from the start.', t: ['最初', 'から', '三つ', 'も', '引き受ける', 'の', 'は', '、', 'やめた', '方', 'が', 'いい', 'よ', '。'] },
      { id: 'Kalau diambil satu saja, semuanya bisa terjangkau, dan pada akhirnya itu lebih berguna.', en: 'If you take just one, you can reach all of it, and in the end that\'s more useful.', t: ['一つ', 'だけ', 'に', 'して', 'おけ', 'ば', '、', '全部', 'に', '手', 'が', '届く', 'から', '、', '結局', 'その', '方', 'が', '役に立つ', '。'] },
      { id: 'Kalau terlalu banyak dipikul, semua pekerjaan jadi setengah jadi, dan orang jadi enggan meminta tolong.', en: 'If you take on too much, every job ends up half done, and people become reluctant to ask you.', t: ['抱え', 'すぎる', 'と', '、', 'どの', '仕事', 'も', '中途半端', 'に', 'なって', '、', '頼まれ', 'にくく', 'なる', '。'] },
      { id: 'Selain itu, kalau sibuk sampai tidak bisa muncul, orang juga jadi sungkan menegur.', en: 'Besides, if you get too busy to show up, it also makes it harder for others to approach you.', t: ['それ', 'に', '、', '忙しく', 'なって', '顔', 'を', '出せ', 'なく', 'なると', '、', 'こちら', 'も', '声', 'を', 'かけにくく', 'なる', '。'] },
      { id: 'Kalau dipikirkan untuk bertahan lama, satu pekerjaan per tahun sudah cukup.', en: 'Thinking about keeping it up long term, one thing a year is plenty.', t: ['長く', '続ける', 'こと', 'を', '考えたら', '、', '一年', 'に', '一つ', 'ずつ', 'で', '十分', 'だ', 'よ', '。'] },
    ]
  },
  {
    key: 'kegiatan_permintaan_ganti_jadwal_piket', topic: 'kegiatan', jenis: 'permintaan',
    judulT: ['当番', 'の', '日', 'を', '替えて', 'もらう'],
    judul: 'Meminta tukar jadwal piket', judulEn: 'Asking to swap a duty rota',
    rel: 'tetangga',
    sit: 'Meminta tukar jadwal piket lingkungan karena ada urusan', sitEn: 'Asking to swap a neighbourhood duty because of a clash',
    id: 'Saya meminta tukar jadwal piket, menyebut tanggal yang bentrok, dan menawarkan menggantinya di hari lain.',
    en: 'I ask to swap the duty, name the clashing dates, and offer to cover another day instead.',
    note: 'Permintaan tukar jadwal diterima karena tanggal penggantinya ditawarkan lebih dulu, bukan hanya diminta.',
    noteEn: 'A swap request is granted because the replacement date is offered first, rather than merely asked for.',
    blocks: [
      { id: 'Ada yang ingin saya minta, bisakah hari giliran saya ditukar?', en: 'There\'s something I\'d like to ask, could we swap my duty day?', t: ['お願い', 'が', 'ある', 'の', 'です', 'が', '、', '当番', 'の', '日', 'を', '替えて', 'いただけ', 'ません', 'か', '。'] },
      { id: 'Giliran saya hari Rabu minggu depan.', en: 'My turn is Wednesday next week.', t: ['私', 'の', '順番', 'は', '、', '来週', 'の', '水曜日', 'です', '。'] },
      { id: 'Hanya hari itu ada urusan yang benar-benar tidak bisa saya tinggalkan.', en: 'On that day only, something has come up that I really can\'t move.', t: ['その', '日', 'だけ', '、', 'どうしても', '外せ', 'ない', '用事', 'が', '入って', 'しまいました', '。'] },
      { id: 'Sebagai gantinya, kalau hari Jumat atau Sabtu, saya bisa kapan saja.', en: 'Instead, if it\'s Friday or Saturday, I can do any time.', t: ['代わり', 'に', '、', '金曜', 'か', '土曜', 'なら', '、', 'いつ', 'で', 'も', '入り', 'ます', '。'] },
      { id: 'Kalau dua-duanya sulit, ditukar dengan minggu lain pun tidak apa-apa.', en: 'If both are difficult, swapping with another week is fine too.', t: ['もし', 'どちら', 'も', '難しけれ', 'ば', '、', '別', 'の', '週', 'と', '交換', 'でも', '構い', 'ません', '。'] },
    ]
  },
  {
    key: 'kegiatan_pengalaman_pertama_masuk_kepanitiaan', topic: 'kegiatan', jenis: 'pengalaman',
    judulT: ['初めて', '役', 'を', '頼まれ', 'た', 'とき'],
    judul: 'Pertama kali masuk kepanitiaan', judulEn: 'The first time I joined the organising committee',
    rel: 'tetangga',
    sit: 'Menceritakan pengalaman pertama masuk kepanitiaan lingkungan', sitEn: 'Recounting the first time joining a neighbourhood committee',
    id: 'Saya diminta mencatat notulen, tidak tahu harus menulis apa, dan akhirnya belajar membedakan keputusan dari obrolan.',
    en: 'I was asked to take minutes, did not know what to write, and ended up learning to tell decisions from discussion.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: keadaannya, yang sulit, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the situation, what was hard, and what changed afterwards.',
    blocks: [
      { id: 'Tiga tahun lalu, saya pertama kali dimintai tugas di rukun tetangga.', en: 'Three years ago I was asked to take on a role in the residents\' association for the first time.', t: ['三年前', 'に', '、', '初めて', '自治会', 'の', '役', 'を', '頼まれ', 'ました', '。'] },
      { id: 'Pekerjaan pertama saya adalah mencatat risalah rapat, dan saya tidak tahu harus menulis apa.', en: 'My first job was taking the minutes, and I had no idea what to write.', t: ['最初', 'の', '仕事', 'は', '議事録', 'で、', '何', 'を', '書け', 'ば', 'いい', 'の', 'か', '分かり', 'ません', 'でした', '。'] },
      { id: 'Karena pembicaraannya melenceng ke sana kemari, awalnya saya catat semuanya, dan nanti membacanya pun saya tidak paham.', en: 'The discussion wandered all over the place, so at first I wrote everything down, and later I couldn\'t make sense of it either.', t: ['話', 'は', 'あちこち', 'に', 'それる', 'ので', '、', '最初', 'は', '全部', '書いて', '、', 'あと', 'で', '読んで', 'も', '分から', 'なく', 'なりました', '。'] },
      { id: 'Saya diajari oleh orang yang lebih dulu ikut, bahwa cukup menulis yang sudah diputuskan.', en: 'Someone who had been doing it longer told me I only needed to write down what had been decided.', t: ['先輩', 'に', '、', '決まった', 'こと', 'だけ', '書け', 'ば', 'いい', 'と', '教えて', 'もらい', 'ました', '。'] },
      { id: 'Sejak itu, saya menuliskan hal yang sudah diputuskan dan pendapat secara terpisah.', en: 'Since then, I write the decisions and the opinions separately.', t: ['それ', 'から', 'は', '、', '決まった', 'こと', 'と', '意見', 'を', '分けて', '書く', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'kegiatan_pengumuman_kerja_bakti', topic: 'kegiatan', jenis: 'pengumuman',
    judulT: ['土曜', 'の', '掃除', 'のお知らせ'],
    judul: 'Pengumuman kerja bakti akhir pekan', judulEn: 'An announcement about the weekend work day',
    rel: 'tetangga',
    sit: 'Mengumumkan kerja bakti kepada seluruh warga', sitEn: 'Announcing a work day to all residents',
    id: 'Kerja bakti diadakan Sabtu pagi, barang bawaan disebut, dan yang tidak bisa hadir diminta menghubungi ketua RT.',
    en: 'The work day is on Saturday morning, what to bring is named, and those who cannot come are asked to contact the block leader.',
    note: 'Pengumuman menyebut waktu, bawaan, dan siapa yang dihubungi kalau tidak bisa, dalam urutan itu.',
    noteEn: 'An announcement gives the time, what to bring, and who to contact if you cannot come, in that order.',
    blocks: [
      { id: 'Ada pengumuman dari rukun tetangga.', en: 'An announcement from the residents\' association.', t: ['自治会', 'から', 'お知らせ', 'です', '。'] },
      { id: 'Sabtu minggu ini, dari jam delapan pagi sampai jam sebelas, akan diadakan bersih-bersih di sekitar taman.', en: 'This Saturday, from eight in the morning until eleven, we\'ll be cleaning around the park.', t: ['今週', 'の', '土曜', '、', '朝', '八時', 'から', '十一時', 'まで', '、', '公園', '周り', 'の', '掃除', 'を', '行います', '。'] },
      { id: ['Silakan membawa sarung tangan, dan kantong sampah kalau ada.', 'Alatnya sudah kami siapkan.'], en: ['Please bring work gloves, and a rubbish bag if you have one.', 'The tools are provided.'], t: ['軍手', 'と', '、', 'あれ', 'ば', 'ごみ袋', 'を', 'ご持参', 'ください', '。', '道具', 'は', '用意', 'して', 'あります', '。'] },
      { id: 'Yang tidak bisa ikut, silakan menghubungi ketua kelompok setidaknya sehari sebelumnya.', en: 'Those who can\'t make it, please contact your group leader by the day before.', t: ['出られ', 'ない', '方', 'は', '、', '前', 'の', '日', 'まで', 'に', '班長', 'まで', 'ご連絡', 'ください', '。'] },
      { id: ['Kalau gerimis, tetap dilaksanakan.', 'Kalau hujan deras, akan diberitahukan lewat papan edaran jam enam pagi.'], en: ['If it\'s drizzling, we\'ll go ahead.', 'If it\'s heavy rain, we\'ll let you know by the circular at six in the morning.'], t: ['小雨', 'なら', '行います', '。', '大雨', 'の', '場合', 'は', '、', '朝', '六時', 'に', '回覧', 'で', 'お知らせ', 'します', '。'] },
    ]
  },
]);
