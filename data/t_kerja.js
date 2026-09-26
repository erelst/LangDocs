/* Kerja: what is said at work, in the order it happens.
 *
 * The biggest topic by measurement (仕事・学業 is 22,88% of recorded conversations, the largest
 * single cell in the survey), so it is written in batches and each batch is checked before
 * the next one.
 *
 * The reader's standard holds here as everywhere: a sentence says something. Most of these
 * carry a reason (ので, から) or a condition (たら, れば, と), because that is what makes one
 * sentence instead of two, and the ones that do not say so with が or けど.
 *
 * Register matters more in this topic than anywhere else, so both directions are written out:
 * said to a superior, and said to someone the same level. The relationship names who it is
 * said to; data/lexicon.js supplies the romaji and the two glosses.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - meminta sesuatu dikerjakan, dan meminta dengan halus saat orangnya lebih senior
 * - melaporkan hasil, termasuk melaporkan yang belum selesai
 * - mengabarkan masalah lebih awal, sebelum orang lain menemukannya
 * - menolak tugas atau tenggat, dengan alasan yang bisa diperiksa
 * - meminta tenggat, meminta perpanjangan, menawar prioritas
 * - mengoreksi pekerjaan orang lain tanpa menyerang orangnya
 * - menyanggah pendapat atasan, dan menyanggah pendapat rekan
 * - mengaku belum paham, meminta diulang, meminta contoh
 * - meminta izin pulang lebih awal, izin tidak masuk, izin cuti
 * - menanyakan jadwal, pembagian tugas, siapa yang bertanggung jawab
 * - di rapat: menyampaikan pendapat, menyela dengan halus, meringkas, menutup
 * - di sekolah: bertanya ke guru, meminta perpanjangan tugas, meminta rekomendasi
 * - mengajak makan siang, mengajak pulang bersama
 * - menerima koreksi, menerima tugas tambahan, menolak pujian dengan sopan
 * Tidak termasuk:
 * - urusan pribadi yang kebetulan terjadi di kantor, misalnya menelepon keluarga, masuk ke `telepon`
 * - perjalanan ke dan dari kantor, masuk ke `transportasi`
 * - makan siangnya sendiri sebagai acara makan, masuk ke `makan`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'kerja_percakapan_minta_tenggat', topic: 'kerja', jenis: 'percakapan',
    judulT: ['締め切り', 'を', '延ばして', 'いただけますか'],
    judul: 'Meminta perpanjangan tenggat', judulEn: 'Asking for more time on a deadline',
    speakers: {'A':'rekan','B':'atasan'},
    sit: 'Meminta perpanjangan tenggat kepada atasan, dengan alasan yang bisa diperiksa', sitEn: 'Asking a superior for more time, with a reason that can be checked',
    id: 'Saya melaporkan bagian mana yang sudah selesai, mana yang belum, dan meminta tambahan dua hari disertai rencana yang jelas.',
    en: 'I report which part is finished, which is not, and ask for two extra days with a clear plan.',
    note: 'Permintaan tenggat diterima karena kemajuannya dilaporkan lebih dulu dan jumlah tambahannya disebut tepat, bukan sekadar minta lebih lama.',
    noteEn: 'A deadline request is granted because progress is reported first and the extension is exact, not merely for more time.',
    blocks: [
      { sp: 'A', t: ['お時間', 'を', 'いただき', 'たい', 'の', 'です', 'が', '、', '今', 'の', '状況', 'を', 'ご報告', 'します', '。'] },
      { sp: 'A', t: ['全体', 'の', '七割', 'は', 'できて', 'いて', '、', '残り', 'は', '数字', 'の', '確認', 'だけ', 'です', '。'] },
      { sp: 'B', t: ['だいぶ', '進んで', 'いる', 'よう', 'です', 'ね', '。', '何', 'か', '引っかかって', 'います', 'か', '。'] },
      { sp: 'A', t: ['取引先', 'から', 'の', '返事', 'が', '明日', 'に', 'なる', 'ので', '、', 'そこ', 'から', 'で', 'ない', 'と', '詰められ', 'ません', '。'] },
      { sp: 'B', t: ['どの', 'くらい', '必要', 'ですか', '。', '理由', 'が', 'はっきり', 'して', 'いれ', 'ば', '構い', 'ません', '。'] },
      { sp: 'A', t: ['二日', 'ください', '。', '明後日', 'の', '午前', 'に', '確認', 'して', '、', '昼', 'まで', 'に', '出します', '。'] },
      { sp: 'B', t: ['わかり', 'ました', '。', 'では', '、', '明後日', 'の', '昼', 'まで', 'に', 'して', 'ください', '。'] },
      { sp: 'A', t: ['ありがとう', 'ございます', '。', '遅れ', 'そう', 'な', 'とき', 'は', 'また', '早め', 'に', '連絡', 'します', '。'] },
    ]
  },
  {
    key: 'kerja_cerita_kesalahan_yang_ditemukan', topic: 'kerja', jenis: 'cerita',
    judulT: ['自分で', '見つけ', 'た', '間違い'],
    judul: 'Kesalahan yang saya temukan sendiri', judulEn: 'The mistake I found myself',
    rel: 'atasan',
    sit: 'Menceritakan kesalahan kerja yang ketahuan sendiri dan bagaimana diperbaiki', sitEn: 'Recounting a work mistake found by oneself and how it was fixed',
    id: 'Saya menemukan angkanya salah sehari sebelum dikirim, melaporkannya lebih dulu, dan memperbaikinya sebelum klien melihatnya.',
    en: 'I found a wrong figure a day before sending, reported it first, and fixed it before the client saw it.',
    note: 'Cerita seperti ini punya tiga bagian: kesalahannya, saat ketahuan, dan yang berubah setelahnya.',
    noteEn: 'A story like this has three parts: the mistake, when it surfaced, and what changed afterwards.',
    blocks: [
      { t: ['先週', '、', '見積書', 'を', '出す', '前日', 'に', '、', '数字', 'が', '一つ', 'ずれて', 'いる', 'の', 'に', '気が付き', 'ました', '。'] },
      { t: ['合計', 'が', '二万円', 'ほど', '多く', 'なって', 'いて', '、', 'そのまま', '出して', 'いれ', 'ば', '、', 'あと', 'で', '必ず', '問題', 'に', 'なって', 'いました', '。'] },
      { t: ['すぐ', 'に', '上司', 'に', '報告', 'して', '、', 'どこ', 'で', '間違えた', 'の', 'か', 'を', '説明', 'しました', '。'] },
      { t: ['おかげ', 'で', '、', '出す', '前', 'に', '直す', 'こと', 'が', 'でき', '、', 'お客様', 'に', 'は', '何', 'も', '迷惑', 'を', 'かけ', 'ません', 'でした', '。'] },
      { t: ['あれ', 'から', '、', '数字', 'を', '入れた', '日', 'と', '出す', '日', 'を', '分けて', '、', '間に', '一度', '見直す', 'ように', 'しました', '。'] },
    ]
  },
  {
    key: 'kerja_kronologi_hari_rapat_besar', topic: 'kerja', jenis: 'kronologi',
    judulT: ['大きい', '会議', 'の', 'あった', '日'],
    judul: 'Hari rapat besar', judulEn: 'The day of the big meeting',
    rel: 'rekan',
    sit: 'Menceritakan urutan hari rapat besar, dari persiapan sampai selesai', sitEn: 'Recounting the day of a big meeting, from preparation to finish',
    id: 'Saya menyiapkan bahan dari pagi, mencetak salinan, memimpin rapat, dan menutupnya dengan pembagian tugas yang sudah dicatat.',
    en: 'I prepared the material from the morning, printed copies, ran the meeting, and closed it with the tasks already written down.',
    note: 'Urutannya diikat たら dan ので, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by たら and ので, so each line explains the one before it.',
    blocks: [
      { t: ['朝', '、', '席', 'に', '着い', 'たら', '、', 'まず', '資料', 'の', '数字', 'が', '合って', 'いる', 'か', 'を', '確認', 'しました', '。'] },
      { t: ['前', 'の', '日', 'に', '作った', 'まま', 'だ', 'と', '古い', '数字', 'が', '残る', 'ので', '、', '朝', 'に', '必ず', '見直し', 'ます', '。'] },
      { t: ['会議室', 'が', '狭かった', 'ので', '、', '人数', '分', 'の', '紙', 'を', '刷って', '、', '先', 'に', '並べて', 'おき', 'ました', '。'] },
      { t: ['十時', 'に', '始まって', '、', '質疑', 'が', '長く', 'なり', 'ました', 'が', '、', '十一時半', 'に', '終わり', 'ました', '。'] },
      { t: ['最後', 'に', '、', '誰', 'が', '何', 'を', 'いつ', 'まで', 'に', 'やる', 'の', 'か', 'を', '読み上げて', '、', 'その場', 'で', '共有', 'しました', '。'] },
    ]
  },
  {
    key: 'kerja_curhatan_lembur_terus', topic: 'kerja', jenis: 'curhatan',
    judulT: ['終わらない', '残業'],
    judul: 'Lembur yang tidak ada habisnya', judulEn: 'Overtime that never ends',
    rel: 'teman_kerja',
    sit: 'Mengeluh soal lembur ke rekan, tanpa minta saran', sitEn: 'Venting about overtime to a colleague, without asking for advice',
    id: 'Pekerjaan yang datang menjelang pulang selalu menambah satu jam, dan saya sadar sudah dua minggu tidak pulang saat masih terang.',
    en: 'Work arriving just before leaving always adds an hour, and I realised I have not gone home in daylight for two weeks.',
    note: 'Bentuk biasa dan tanpa permintaan solusi; keluhannya diarahkan ke keadaannya, bukan ke orang tertentu.',
    noteEn: 'Plain style with no request for a solution; the complaint aims at the situation, not at a particular person.',
    blocks: [
      { t: ['帰る', '準備', 'を', 'して', 'いる', 'ところ', 'に', '、', '急ぎ', 'の', '仕事', 'が', '来る', 'ん', 'だ', 'よ', '。'] },
      { t: ['毎回', '「', '今日', 'だけ', '」', 'と', '言われて', '、', 'それ', 'が', '二週間', '続いて', 'いる', '。'] },
      { t: ['しかも', '、', '明日', 'の', '朝', 'に', 'やれ', 'ば', '同じ', 'こと', 'が', 'できる', 'こと', 'の', '方', 'が', '多い', '。'] },
      { t: ['気が付い', 'たら', '、', '明るい', 'うち', 'に', '家', 'に', '帰った', 'の', 'が', 'いつ', 'だ', 'か', '思い出せ', 'ない', '。'] },
      { t: ['辞め', 'たい', 'わけ', 'じゃ', 'なくて', '、', 'ただ', '早く', '帰り', 'たい', 'だけ', 'な', 'ん', 'だ', 'けど', 'ね', '。'] },
    ]
  },
  {
    key: 'kerja_keluhan_tugas_tidak_jelas', topic: 'kerja', jenis: 'keluhan',
    judulT: ['何', 'を', 'すれば', 'いい', 'の', 'か', '分からない'],
    judul: 'Tugas yang datang tanpa kejelasan', judulEn: 'Work handed over without the details',
    rel: 'atasan',
    sit: 'Menyampaikan bahwa tugas yang diberikan belum jelas, dan meminta kejelasan', sitEn: 'Saying the assignment is unclear and asking for the missing details',
    id: 'Saya menyampaikan bahwa batas waktunya dan siapa yang memutuskan belum disebut, dan meminta keduanya ditetapkan sebelum mulai.',
    en: 'I point out that the deadline and who decides were not stated, and ask for both to be fixed before I start.',
    note: 'Keluhan seperti ini disampaikan dengan menyebut apa yang kurang, bukan dengan menuduh instruksinya buruk.',
    noteEn: 'A complaint like this names what is missing rather than judging the instruction.',
    blocks: [
      { t: ['今', 'の', 'お話', 'で', '、', '二つ', 'だけ', '確認', 'させて', 'ください', '。'] },
      { t: ['一つ', 'は', '締め切り', 'です', '。', 'いつまで', 'に', '出せ', 'ば', 'いい', 'の', 'か', 'が', '分かり', 'ません', '。'] },
      { t: ['もう', '一つ', 'は', '、', '最後', 'に', '決める', 'の', 'が', '誰', 'な', 'の', 'か', 'です', '。', '確認', 'する', '相手', 'が', '分かる', 'と', '進め', 'やすい', 'ので', '。'] },
      { t: ['この', '二つ', 'が', '決まれ', 'ば', '、', '今日', 'の', 'うち', 'に', '手', 'を', '付け', 'られ', 'ます', '。'] },
      { t: ['分から', 'ない', 'まま', '進める', 'と', '、', 'あと', 'で', 'やり直す', 'こと', 'に', 'なる', 'の', 'が', '一番', '困り', 'ます', '。'] },
    ]
  },
  {
    key: 'kerja_penjelasan_cara_melapor_masalah', topic: 'kerja', jenis: 'penjelasan',
    judulT: ['問題', 'は', '早く', '報告', 'する', 'こと'],
    judul: 'Cara melaporkan masalah lebih awal', judulEn: 'How to report a problem early',
    rel: 'rekan',
    sit: 'Menerangkan cara melaporkan masalah kepada rekan yang baru bergabung', sitEn: 'Explaining how to report a problem to a colleague who has just joined',
    id: 'Saya menerangkan bahwa laporan dikirim saat masalahnya masih bisa diubah, bahwa yang disebut lebih dulu adalah akibatnya, dan bahwa menunggu sampai selesai justru menghilangkan pilihan.',
    en: 'I explain that a report goes out while the problem can still be changed, that the consequence comes first, and that waiting until it is over removes the options.',
    note: 'Penjelasan yang berguna menyebut alasan aturannya, karena tanpa alasan orang menunggu sampai ada jawaban sebelum melapor.',
    noteEn: 'A useful explanation gives the reason for the rule, because without it people wait until they have a solution before reporting.',
    blocks: [
      { t: ['問題', 'が', 'あっ', 'たら', '、', '直せ', 'る', 'うち', 'に', '言って', 'ください', '。', '終わって', 'から', '言って', 'も', '、', '選べる', '道', 'が', '残り', 'ません', '。'] },
      { t: ['報告', 'は', '、', '原因', 'より', '先', 'に', '影響', 'を', '書きます', '。', '何', 'が', '止まって', 'いる', 'の', 'か', 'が', '分かれ', 'ば', '、', '指示', 'が', '出せ', 'る', 'から', 'です', '。'] },
      { t: ['「', 'まだ', '分かり', 'ません', '」', 'で', 'も', '構い', 'ません', '。', '分から', 'ない', 'こと', '自体', 'より', '、', '黙って', 'いる', '方', 'が', '問題', 'です', '。'] },
      { t: ['原因', 'が', '分かった', '時点', 'で', '、', '二回目', 'の', '連絡', 'を', 'して', 'ください', '。', '最初', 'の', '報告', 'は', 'それ', 'で', '終わり', 'です', '。'] },
      { t: ['大事', 'な', 'の', 'は', '、', '悪い', '知らせ', 'ほど', '早く', '出す', 'こと', 'です', '。', 'それが', 'できる', '人', 'ほど', '、', '任される', '仕事', 'が', '増え', 'ます', '。'] },
    ]
  },
  {
    key: 'kerja_laporan_hasil_rapat', topic: 'kerja', jenis: 'laporan',
    judulT: ['打ち合わせ', 'の', '報告'],
    judul: 'Melaporkan hasil rapat', judulEn: 'Reporting the outcome of a meeting',
    rel: 'atasan',
    sit: 'Melaporkan hasil rapat kepada atasan yang tidak ikut hadir', sitEn: 'Reporting a meeting\'s outcome to a superior who was absent',
    id: 'Saya melaporkan keputusan yang diambil, hal yang ditunda, dan siapa yang harus diberi tahu berikutnya.',
    en: 'I report the decision taken, what was postponed, and who needs to be told next.',
    note: 'Laporan rapat berguna kalau memisahkan yang sudah diputuskan dari yang masih terbuka.',
    noteEn: 'A meeting report is useful when it separates what was decided from what is still open.',
    blocks: [
      { t: ['先ほど', 'の', '打ち合わせ', 'の', 'ご報告', 'です', '。', '十分', 'で', '読める', 'ように', 'まとめ', 'ました', '。'] },
      { t: ['決まった', 'の', 'は', '二つ', 'です', '。', '納期', 'は', '来月', 'の', '十五日', '、', '担当', 'は', '第一', 'チーム', 'に', 'なり', 'ました', '。'] },
      { t: ['まだ', '決まって', 'い', 'ない', 'の', 'は', '予算', 'です', '。', 'これは', '来週', 'の', '会議', 'に', '回す', 'こと', 'に', 'なり', 'ました', '。'] },
      { t: ['決定', 'では', 'ない', 'けど', '、', '次回', 'まで', 'に', '案', 'を', '出す', 'こと', 'に', 'なった', '物', 'が', '三つ', 'あります', '。'] },
      { t: ['共有', 'が', '必要', 'な', 'の', 'は', '経理', 'と', 'お客様', 'です', '。', '私', 'から', '今日', 'の', 'うち', 'に', '連絡', 'します', '。'] },
    ]
  },
  {
    key: 'kerja_rencana_pulang_lebih_awal', topic: 'kerja', jenis: 'rencana',
    judulT: ['早く', '上がらせて', 'いただく', '相談'],
    judul: 'Rencana pulang lebih awal', judulEn: 'Planning to leave early',
    rel: 'atasan',
    sit: 'Menyusun rencana pulang lebih awal, dengan pengganti pekerjaannya', sitEn: 'Planning to leave early, with cover for the work',
    id: 'Saya mengajukan pulang lebih awal karena urusan keluarga, menyebut pekerjaan yang bisa ditunda, dan menawarkan menyelesaikannya dari rumah.',
    en: 'I ask to leave early for a family matter, name the work that can wait, and offer to finish it from home.',
    note: 'Rencana seperti ini diterima karena yang bisa ditunda dan yang tidak disebut lebih dulu.',
    noteEn: 'A plan like this is granted because what can and cannot wait is stated first.',
    blocks: [
      { t: ['金曜', 'の', '午後', '、', '三時', 'に', '上がらせて', 'いただき', 'たい', 'の', 'です', 'が', '、', 'よろしい', 'でしょうか', '。'] },
      { t: ['家', 'の', '用事', 'で', '、', '私', 'で', 'ない', 'と', 'できない', 'こと', 'な', 'の', 'です', '。'] },
      { t: ['今', 'かかって', 'いる', '資料', 'は', '午前', 'で', '終わる', 'ので', '、', '金曜', 'の', '分', 'は', '問題', 'あり', 'ません', '。'] },
      { t: ['急ぎ', 'の', '連絡', 'が', '来た', '場合', 'は', '、', '携帯', 'に', '出', 'ます', '。', '家', 'から', 'で', 'も', '返せる', '内容', 'です', '。'] },
      { t: ['もし', '難しけれ', 'ば', '、', '別の', '日', 'に', '変え', 'ます', 'ので', '、', '教えて', 'ください', '。'] },
    ]
  },
  {
    key: 'kerja_nasihat_jangan_bawa_pulang', topic: 'kerja', jenis: 'nasihat',
    judulT: ['仕事', 'を', '持ち', '帰らない', 'こと'],
    judul: 'Jangan bawa pulang pekerjaan tiap hari', judulEn: 'Do not take work home every day',
    rel: 'teman_kerja',
    sit: 'Menasihati rekan yang selalu membawa pulang pekerjaan', sitEn: 'Advising a colleague who always takes work home',
    id: 'Saya menyarankan menyelesaikan satu hal sebelum pulang daripada membawa semuanya, karena yang dibawa pulang hampir selalu tidak dibuka.',
    en: 'I suggest finishing one thing before leaving rather than carrying it all home, because what goes home is almost never opened.',
    note: 'Nasihat yang berguna memberi ukuran yang bisa dipegang: satu hal, bukan \'jangan lembur\'.',
    noteEn: 'Useful advice gives something to hold on to: one thing, rather than \'do not work late\'.',
    blocks: [
      { t: ['毎日', '鞄', 'に', '入れて', '帰る', 'の', 'は', '、', '一度', 'やめた', '方', 'が', 'いい', 'よ', '。'] },
      { t: ['家', 'に', '持って', '帰った', '物', 'って', '、', 'ほとんど', '開け', 'ない', 'まま', '次の', '朝', 'に', 'なる', 'ん', 'だ', '。'] },
      { t: ['それ', 'より', '、', '帰る', '前', 'に', '一個', 'だけ', '終わらせる', '方', 'が', '、', '次の', '日', 'が', '楽', 'に', 'なる', '。'] },
      { t: ['持って', '帰る', 'と', '決めた', '時点', 'で', '、', '今日', 'は', 'もう', '終わって', 'い', 'ない', 'と', '思って', 'しまう', 'から', '、', '休め', 'なく', 'なる', '。'] },
      { t: ['どうしても', '残る', 'なら', '、', '明日', 'の', '朝', 'に', '何', 'から', 'やる', 'か', 'だけ', 'メモ', 'して', '、', 'それ', 'で', '閉じる', 'と', 'いい', '。'] },
    ]
  },
  {
    key: 'kerja_permintaan_izin_cuti', topic: 'kerja', jenis: 'permintaan',
    judulT: ['休み', 'を', 'いただきたい', 'ので', 'すが'],
    judul: 'Meminta izin cuti', judulEn: 'Asking for leave',
    rel: 'atasan',
    sit: 'Mengajukan cuti beberapa hari, dengan pengalihan pekerjaan', sitEn: 'Applying for a few days off, with the work handed over',
    id: 'Saya mengajukan cuti tiga hari, menyebut tanggalnya, siapa yang mengambil alih, dan apa yang akan diselesaikan sebelum pergi.',
    en: 'I apply for three days off, give the dates, who is covering, and what I will finish before going.',
    note: 'Permintaan cuti diterima karena tanggal dan penggantinya disebut dalam satu kalimat pembuka, bukan dicari dulu oleh atasan.',
    noteEn: 'A leave request is granted because the dates and the cover come in the opening line, rather than the superior having to ask.',
    blocks: [
      { t: ['来月', 'の', '八日', 'から', '十日', 'まで', '、', '三日', '間', 'お休み', 'を', 'いただき', 'たい', 'の', 'です', 'が', '。'] },
      { t: ['その', '間', 'の', '急ぎ', 'の', '件', 'は', '、', '同じ', 'チーム', 'の', '田中', 'さん', 'に', 'お願い', 'して', 'あります', '。'] },
      { t: ['引き継ぎ', 'の', '書類', 'は', '今週', 'の', '金曜', 'まで', 'に', '作り', 'ます', '。'] },
      { t: ['休む', '前', 'の', '日', 'まで', 'に', '、', '自分', 'の', '担当', '分', 'は', '全部', '終わらせる', 'つもり', 'です', '。'] },
      { t: ['もし', '日程', 'が', '難しい', 'よう', 'でしたら', '、', '別の', '週', 'に', 'ずらします', 'ので', '、', 'お知らせ', 'ください', '。'] },
    ]
  },
  {
    key: 'kerja_pengalaman_gagal_presentasi', topic: 'kerja', jenis: 'pengalaman',
    judulT: ['初めて', 'の', '説明', 'で', '失敗', 'した', '話'],
    judul: 'Presentasi pertama yang gagal', judulEn: 'The first presentation that failed',
    rel: 'rekan',
    sit: 'Menceritakan presentasi pertama yang kacau dan pelajarannya', sitEn: 'Recounting a first presentation that went badly and what it taught',
    id: 'Presentasi pertama saya kacau karena berlatih hanya sekali, dan sejak itu selalu berlatih dengan menghitung waktu.',
    en: 'My first presentation went badly because I practised only once, and since then I always rehearse with a timer.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: yang terjadi, yang membukanya, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: what happened, what revealed it, and what changed afterwards.',
    blocks: [
      { t: ['入社', 'して', '二年目', 'の', 'とき', '、', '初めて', '大きい', '会議', 'で', '説明', 'する', 'こと', 'に', 'なりました', '。'] },
      { t: ['前の', '日', 'に', '一度', '読んだ', 'だけ', 'で', '、', '時間', 'を', '計って', 'は', 'い', 'ません', 'でした', '。'] },
      { t: ['話し', '始めて', '三分', 'で', '、', '用意', 'した', '内容', 'の', '半分', 'しか', '使え', 'ない', 'と', '気が付き', 'ました', '。'] },
      { t: ['結局', '、', '最後', 'の', '五分', 'で', '駆け足', 'に', 'なり', '、', '一番', '言い', 'たかった', '数字', 'を', '飛ばして', 'しまいました', '。'] },
      { t: ['それ', 'から', 'は', '、', '必ず', '時計', 'を', '見ながら', '練習', 'して', '、', '入らない', '部分', 'は', '先', 'に', '削る', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'kerja_pengumuman_perubahan_jam', topic: 'kerja', jenis: 'pengumuman',
    judulT: ['勤務', '時間', 'が', '変わります'],
    judul: 'Pengumuman perubahan jam kerja', judulEn: 'An announcement about changed working hours',
    rel: 'rekan',
    sit: 'Pengumuman ke seluruh tim tentang perubahan jam kerja', sitEn: 'Announcing changed working hours to the whole team',
    id: 'Tim mengumumkan jam masuk digeser, aturan lembur diperketat, dan permintaan izin disampaikan lewat atasan langsung.',
    en: 'The team announces that starting time moves, the overtime rule tightens, and requests go through the direct superior.',
    note: 'Pengumuman menyebut apa yang berubah lebih dulu, karena itu yang mengubah rencana orang.',
    noteEn: 'An announcement gives what changed first, because that is what alters people\'s plans.',
    blocks: [
      { t: ['チーム', 'の', '皆さん', 'に', 'お知らせ', 'です', '。', '来月', 'から', '勤務', 'の', '時間', 'が', '変わります', '。'] },
      { t: ['始業', 'が', '九時', 'から', '九時半', 'に', 'なり', '、', '終業', 'は', '六時', 'の', 'まま', 'です', '。'] },
      { t: ['また', '、', '終業', '後', 'の', '残業', 'は', '、', '事前', 'に', '申請', 'が', '必要', 'に', 'なりました', '。'] },
      { t: ['急ぎ', 'の', '場合', 'だけ', '、', '翌日', 'の', '朝', 'に', '出して', 'も', '認め', 'ます', '。'] },
      { t: ['休み', 'の', '相談', 'は', '、', 'これまで', 'どおり', '直属', 'の', '上司', 'に', 'お願い', 'します', '。'] },
    ]
  },
]);
