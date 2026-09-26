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
      { sp: 'B', t: ['明日', 'の', '掃除', '、', '何', 'を', '持って', '行け', 'ば', 'いい', 'です', 'か', '。'] },
      { sp: 'A', t: ['軍手', 'と', '、', 'あれ', 'ば', 'ごみ袋', 'を', 'お願い', 'します', '。'] },
      { sp: 'B', t: ['ほうき', 'は', '要り', 'ません', 'か', '。'] },
      { sp: 'A', t: ['道具', 'は', '自治会', 'の', '物', 'が', 'あります', 'ので', '、', '人数', '分', 'は', '足ります', '。'] },
      { sp: 'B', t: ['何時', 'に', '集まれ', 'ば', 'いい', 'です', 'か', '。'] },
      { sp: 'A', t: ['八時', 'と', '書いて', 'あります', 'が', '、', '実際', 'は', '八時半', 'に', '始まり', 'ます', '。'] },
      { sp: 'B', t: ['では', '、', '八時', 'に', '行って', '、', '先', 'に', '場所', 'を', '取って', 'おきます', '。'] },
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
      { t: ['土曜', 'の', '夜', 'に', '、', '自治会', 'の', '集まり', 'が', 'あり', 'ました', '。'] },
      { t: ['最初', 'の', '一時間', 'は', '、', '予定', 'どおり', 'に', '進んで', '、', '三つ', 'の', '議題', 'が', 'すぐ', 'に', '終わり', 'ました', '。'] },
      { t: ['ところが', '、', 'ごみ', '置き場', 'の', '場所', 'を', '変える', '案', 'で', '、', '意見', 'が', '二つ', 'に', '分かれ', 'ました', '。'] },
      { t: ['結局', '、', 'その', '一件', 'だけで', '二時間', 'かかり', '、', '最後', 'まで', '決まり', 'ません', 'でした', '。'] },
      { t: ['残り', 'の', '議題', 'は', '、', 'あと', 'で', '紙', 'を', '回して', '決める', 'こと', 'に', 'なり', 'ました', '。'] },
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
      { t: ['八時', 'に', '公園', 'に', '着いた', 'ら', '、', 'もう', '十人', 'ほど', '集まって', 'いました', '。'] },
      { t: ['班', 'が', '三つ', 'に', '分かれ', 'て', '、', '私', 'は', '川', '側', 'の', '草', 'を', '担当', 'する', 'こと', 'に', 'なり', 'ました', '。'] },
      { t: ['草', 'が', '思った', 'より', '多く', 'て', '、', '一', '時間', 'で', '袋', 'が', '五つ', 'に', 'なり', 'ました', '。'] },
      { t: ['十時', 'に', '一度', '休んで', '、', '持って', 'きた', 'お茶', 'を', '飲み', 'ました', '。'] },
      { t: ['十一時', 'に', '全部', '終わった', 'ので', '、', 'その', 'あと', 'は', '簡単', 'に', '食事', 'を', 'して', '解散', 'しました', '。'] },
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
      { t: ['自治会', 'の', '仕事', 'で', '、', '頼まれる', 'の', 'が', 'いつも', '私', 'な', 'ん', 'だ', 'よ', '。'] },
      { t: ['回覧板', 'も', '、', '掃除', 'の', '割り振り', 'も', '、', 'まず', '私', 'に', '電話', 'が', '来る', '。'] },
      { t: ['一度', '断った', 'こと', 'も', 'ある', 'ん', 'だけど', '、', 'その', 'とき', 'は', '他の', '人', 'が', '見つから', 'なくて', '、', '結局', '引き受けた', '。'] },
      { t: ['気が付い', 'たら', '、', '今年', 'の', '当番', 'が', '三つ', 'に', 'なって', 'いた', '。'] },
      { t: ['断る', '方法', 'を', '聞きたい', 'わけ', 'じゃ', 'なくて', '、', '毎回', '同じ', '人', 'に', '来る', 'の', 'が', '変', 'だ', 'と', '思う', 'だけ', '。'] },
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
      { t: ['先週', 'の', '土曜', 'の', 'こと', 'で', '、', '少し', 'だけ', 'お話', 'し', 'たい', 'の', 'です', 'が', '。'] },
      { t: ['あの', '日', 'は', '、', '九時', 'に', '手伝って', 'いただける', 'と', '伺って', 'いました', '。'] },
      { t: ['こちら', 'は', '二人', 'で', '待って', 'いて', '、', '十一時', 'まで', '連絡', 'が', 'あり', 'ません', 'でした', '。'] },
      { t: ['お忙しかった', 'の', 'か', 'も', 'しれ', 'ません', 'が', '、', '来られ', 'ない', 'とき', 'は', '一言', 'ある', 'と', '助かり', 'ます', '。'] },
      { t: ['次', 'の', '作業', 'を', '決める', '前', 'に', '、', 'ご都合', 'を', '教えて', 'いただけ', 'ます', 'か', '。'] },
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
      { t: ['まず', '、', '毎回', '出', 'なければ', 'ならない', 'わけ', 'で', 'は', 'あり', 'ません', '。', '出られる', 'とき', 'だけ', 'で', '大丈夫', 'です', '。'] },
      { t: ['会費', 'も', '、', '払って', 'いない', 'から', 'と', '言って', '参加', 'できない', 'こと', 'は', 'あり', 'ません', '。'] },
      { t: ['出られ', 'ない', 'とき', 'は', '、', '前', 'の', '日', 'まで', 'に', '一言', '言って', 'いただける', 'と', '助かり', 'ます', '。'] },
      { t: ['道具', 'は', '、', '初めて', 'の', '方', 'に', 'は', 'こちら', 'で', '用意', 'します', '。', '手ぶら', 'で', '来て', 'ください', '。'] },
      { t: ['知って', 'いる', '人', 'が', 'いなくて', 'も', '、', '班', 'を', '分ける', 'とき', 'に', '隣', 'の', '人', 'を', '紹介', 'します', '。'] },
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
      { t: ['昨日', 'の', '作業', 'の', 'ご報告', 'です', '。', '全部', 'で', '十四人', '集まり', 'ました', '。'] },
      { t: ['川', '側', 'の', '草', 'と', '、', '公園', 'の', '落ち葉', 'は', '、', '予定', 'どおり', 'に', '終わり', 'ました', '。'] },
      { t: ['ごみ', '置き場', 'の', '後ろ', 'は', '、', '時間', 'が', '足り', 'なくて', '手', 'が', '付き', 'ません', 'でした', '。'] },
      { t: ['道具', 'は', '全部', '倉庫', 'に', '戻して', 'あり', 'ます', '。', '数', 'も', '確認', 'ずみ', 'です', '。'] },
      { t: ['残った', '分', 'は', '、', '来月', 'の', '二週目', 'に', 'もう', '一度', '集まる', 'こと', 'に', 'しました', '。'] },
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
      { t: ['次', 'の', '集まり', 'は', '、', '議題', 'を', '三つ', 'だけ', 'に', '絞ろう', '。'] },
      { t: ['前回', 'は', '、', '話', 'が', 'それて', '三時間', 'かかった', 'から', 'ね', '。'] },
      { t: ['時間', 'は', '二時間', 'まで', 'と', '決めて', '、', '八時', 'に', '必ず', '終わる', 'こと', 'に', 'する', '。'] },
      { t: ['決まら', 'なかった', '物', 'は', '、', 'その場', 'で', '続け', 'ない', 'で', '、', '紙', 'を', '回して', '集める', '。'] },
      { t: ['会場', 'の', '準備', 'は', '、', '早く', '来た', '人', 'で', 'やる', 'こと', 'に', 'しよう', '。'] },
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
      { t: ['最初', 'から', '三つ', 'も', '引き受ける', 'の', 'は', '、', 'やめた', '方', 'が', 'いい', 'よ', '。'] },
      { t: ['一つ', 'だけ', 'に', 'して', 'おけ', 'ば', '、', '全部', 'に', '手', 'が', '届く', 'から', '、', '結局', 'その', '方', 'が', '役に立つ', '。'] },
      { t: ['抱え', 'すぎる', 'と', '、', 'どの', '仕事', 'も', '中途半端', 'に', 'なって', '、', '頼まれ', 'にくく', 'なる', '。'] },
      { t: ['それ', 'に', '、', '忙しく', 'なって', '顔', 'を', '出せ', 'なく', 'なると', '、', 'こちら', 'も', '声', 'を', 'かけにくく', 'なる', '。'] },
      { t: ['長く', '続ける', 'こと', 'を', '考えたら', '、', '一年', 'に', '一つ', 'ずつ', 'で', '十分', 'だ', 'よ', '。'] },
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
      { t: ['お願い', 'が', 'ある', 'の', 'です', 'が', '、', '当番', 'の', '日', 'を', '替えて', 'いただけ', 'ません', 'か', '。'] },
      { t: ['私', 'の', '順番', 'は', '、', '来週', 'の', '水曜日', 'です', '。'] },
      { t: ['その', '日', 'だけ', '、', 'どうしても', '外せ', 'ない', '用事', 'が', '入って', 'しまいました', '。'] },
      { t: ['代わり', 'に', '、', '金曜', 'か', '土曜', 'なら', '、', 'いつ', 'で', 'も', '入り', 'ます', '。'] },
      { t: ['もし', 'どちら', 'も', '難しけれ', 'ば', '、', '別', 'の', '週', 'と', '交換', 'でも', '構い', 'ません', '。'] },
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
      { t: ['三年前', 'に', '、', '初めて', '自治会', 'の', '役', 'を', '頼まれ', 'ました', '。'] },
      { t: ['最初', 'の', '仕事', 'は', '議事録', 'で、', '何', 'を', '書け', 'ば', 'いい', 'の', 'か', '分かり', 'ません', 'でした', '。'] },
      { t: ['話', 'は', 'あちこち', 'に', 'それる', 'ので', '、', '最初', 'は', '全部', '書いて', '、', 'あと', 'で', '読んで', 'も', '分から', 'なく', 'なりました', '。'] },
      { t: ['先輩', 'に', '、', '決まった', 'こと', 'だけ', '書け', 'ば', 'いい', 'と', '教えて', 'もらい', 'ました', '。'] },
      { t: ['それ', 'から', 'は', '、', '決まった', 'こと', 'と', '意見', 'を', '分けて', '書く', 'ように', 'して', 'います', '。'] },
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
      { t: ['自治会', 'から', 'お知らせ', 'です', '。'] },
      { t: ['今週', 'の', '土曜', '、', '朝', '八時', 'から', '十一時', 'まで', '、', '公園', '周り', 'の', '掃除', 'を', '行います', '。'] },
      { t: ['軍手', 'と', '、', 'あれ', 'ば', 'ごみ袋', 'を', 'ご持参', 'ください', '。', '道具', 'は', '用意', 'して', 'あります', '。'] },
      { t: ['出られ', 'ない', '方', 'は', '、', '前', 'の', '日', 'まで', 'に', '班長', 'まで', 'ご連絡', 'ください', '。'] },
      { t: ['小雨', 'なら', '行います', '。', '大雨', 'の', '場合', 'は', '、', '朝', '六時', 'に', '回覧', 'で', 'お知らせ', 'します', '。'] },
    ]
  },
]);
