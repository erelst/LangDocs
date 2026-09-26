/* Klinik: the doctor and the pharmacy.
 *
 * Telling the family you feel ill is in rumah_santai and buying medicine as an ordinary
 * purchase is in belanja; this file is the appointment itself.
 *
 * The quota is small because 療養 is 0,92% of recorded talk, and the whole topic is one shape:
 * the patient describes, the doctor decides. There is no invitation slot, and that absence is
 * stated here rather than left as a hole.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menyebut gejala, lamanya, dan apa yang sudah dicoba
 * - menjawab pertanyaan dokter: kapan mulai, di mana sakitnya, seberapa sakit
 * - menanyakan obat: cara minum, efek samping, boleh atau tidak dengan obat lain
 * - menyebut alergi dan penyakit yang pernah dialami
 * - meminta surat keterangan, meminta rujukan, menanyakan biaya
 * - di apotek: menebus resep, menanyakan obat yang dijual bebas
 * Tidak termasuk:
 * - menceritakan sakit ke keluarga di rumah, masuk ke `rumah_santai`
 * - membeli obat sebagai belanja biasa, masuk ke `belanja`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'klinik_percakapan_dokter_tanya_gejala', topic: 'klinik', jenis: 'percakapan',
    judulT: ['いつからですか、', 'どこ', 'が', '痛いです', 'か'],
    judul: 'Menjawab pertanyaan dokter tentang gejala', judulEn: 'Answering the doctor\'s questions about symptoms',
    speakers: {'A':'dokter','B':'orang_asing'},
    sit: 'Dokter menanyakan gejala dan pasien menjawab satu per satu', sitEn: 'The doctor asks about symptoms and the patient answers one by one',
    id: 'Dokter menanyakan sejak kapan dan di mana sakitnya, pasien menjawab dengan urutan waktu, dan dokter memeriksa lebih dalam.',
    en: 'The doctor asks since when and where it hurts, the patient answers in time order, and the doctor examines further.',
    note: 'Jawaban yang berguna menyebut waktu mulai dan letaknya, karena tanpa keduanya dokter harus menebak.',
    noteEn: 'A useful answer gives when it started and where, because without both the doctor has to guess.',
    blocks: [
      { sp: 'A', id: ['Ada keluhan apa?', 'Bagian mana yang paling mengganggu?'], t: ['どう', 'され', 'ました', 'か', '。', 'どこ', 'が', '一番', '気', 'に', 'なります', 'か', '。'] },
      { sp: 'B', id: 'Sejak tiga hari lalu tenggorokan saya sakit, dan sejak kemarin demam juga muncul.', t: ['三日前', 'から', '、', 'のど', 'が', '痛く', 'て', '、', '昨日', 'から', '熱', 'も', '出て', 'います', '。'] },
      { sp: 'A', id: ['Demamnya berapa?', 'Sudah diukur?'], t: ['熱', 'は', 'どの', 'くらい', 'です', 'か', '。', '測り', 'ました', 'か', '。'] },
      { sp: 'B', id: ['Tadi pagi saya ukur, tiga puluh delapan derajat.', 'Saya belum minum obat.'], t: ['今朝', '測った', 'ら', '、', '三十八度', 'でした', '。', '薬', 'は', '飲んで', 'い', 'ません', '。'] },
      { sp: 'A', id: ['Batuknya ada?', 'Tenggorokannya terlihat merah, ya.'], t: ['咳', 'は', '出', 'ます', 'か', '。', 'のど', 'は', '赤く', '見え', 'ます', 'ね', '。'] },
      { sp: 'B', id: ['Batuknya hanya sedikit.', 'Yang sakit itu waktu menelan ludah.'], t: ['咳', 'は', '少し', 'だけ', 'です', '。', '唾', 'を', '飲み込む', 'とき', 'に', '痛い', 'です', '。'] },
      { sp: 'A', id: ['Baik.', 'Kita periksa dulu, baru saya tentukan obatnya.'], t: ['わかり', 'ました', '。', '検査', 'を', 'して', 'から', '、', '薬', 'を', '決め', 'ます', 'ね', '。'] },
    ]
  },
  {
    key: 'klinik_cerita_hasil_pemeriksaan', topic: 'klinik', jenis: 'cerita',
    judulT: ['検査', 'の', '結果', 'は', '問題', 'なし', 'でした'],
    judul: 'Hasil pemeriksaan yang ternyata ringan', judulEn: 'Test results that turned out to be nothing serious',
    rel: 'dokter',
    sit: 'Menceritakan pemeriksaan yang membuat khawatir tetapi hasilnya ringan', sitEn: 'Recounting a worrying test that turned out to be nothing serious',
    id: 'Saya takut hasilnya buruk, menjalani pemeriksaan, dan ternyata hanya perlu istirahat.',
    en: 'I was afraid the result would be bad, went through the tests, and it turned out I only needed rest.',
    note: 'Cerita seperti ini punya tiga bagian: kekhawatirannya, pemeriksaannya, dan hasilnya.',
    noteEn: 'A story like this has three parts: the worry, the test, and the result.',
    blocks: [
      { id: 'Sejak bulan lalu ada rasa tidak nyaman di sekitar dada, dan saya memikirkan kemungkinan yang buruk.', t: ['先月', 'から', '胸', 'の', 'あたり', 'に', '違和感', 'が', 'あって', '、', '悪い', '物', 'か', 'も', 'しれ', 'ない', 'と', '思って', 'いました', '。'] },
      { id: 'Sampai hari pemeriksaan, malam saya pun tidak bisa tidur nyenyak.', t: ['検査', 'の', '日', 'まで', '、', '夜', 'も', 'あまり', '眠れ', 'ません', 'でした', '。'] },
      { id: 'Saya diperiksa darah dan dirontgen, dan waktu menunggu hasil itu terasa paling lama.', t: ['血液', '検査', 'と', 'レントゲン', 'を', 'して', '、', '結果', 'を', '待つ', '間', 'が', '一番', '長く', '感じ', 'ました', '。'] },
      { id: 'Hasilnya tidak ada masalah, dan saya diberi tahu bahwa ini akibat kelelahan.', t: ['結果', 'は', '問題', 'なし', 'で', '、', '疲れ', 'から', 'くる', 'もの', 'だ', 'と', '言われ', 'ました', '。'] },
      { id: 'Hari itu, jalan pulang terasa begitu ringan.', t: ['その', '日', 'は', '、', '帰り道', 'が', 'とても', '軽く', '感じ', 'ました', '。'] },
    ]
  },
  {
    key: 'klinik_kronologi_dari_datang_sampai_pulang', topic: 'klinik', jenis: 'kronologi',
    judulT: ['受付', 'から', '会計', 'までの', '流れ'],
    judul: 'Dari datang sampai pulang', judulEn: 'From arriving to leaving',
    rel: 'dokter',
    sit: 'Menceritakan urutan kunjungan ke klinik, dari mendaftar sampai menerima obat', sitEn: 'Recounting a clinic visit in order, from registering to receiving medicine',
    id: 'Saya mendaftar, menunggu, diperiksa, membayar, lalu menebus obat di apotek sebelah.',
    en: 'I registered, waited, was examined, paid, then collected the medicine at the pharmacy next door.',
    note: 'Urutannya diikat たら dan ので, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by たら and ので, so each line explains the one before it.',
    blocks: [
      { id: 'Setelah menyerahkan kartu asuransi di resepsionis, saya diberi nomor.', t: ['受付', 'で', '保険証', 'を', '出した', 'ら', '、', '番号', 'を', '渡され', 'ました', '。'] },
      { id: 'Karena ruang tunggunya penuh, saya menunggu dua puluh menit sampai dipanggil.', t: ['待合室', 'が', '混んで', 'いた', 'ので', '、', '呼ばれる', 'まで', '二十分', 'かかり', 'ました', '。'] },
      { id: 'Pemeriksaannya selesai sekitar sepuluh menit, dan saya diberi obat.', t: ['診察', 'は', '十分', 'ほど', 'で', '終わり', '、', '薬', 'を', '出して', 'もらう', 'こと', 'に', 'なり', 'ました', '。'] },
      { id: 'Setelah membayar, saya membawa resepnya ke apotek di sebelah.', t: ['会計', 'の', 'あと', 'で', '、', '隣', 'の', '薬局', 'に', '処方箋', 'を', '持って', '行き', 'ました', '。'] },
      { id: 'Waktu menerima obatnya, saya dijelaskan cara minum dan perhatiannya.', t: ['薬', 'を', 'もらう', 'とき', 'に', '、', '飲み方', 'と', '注意', 'を', '説明', 'して', 'くれ', 'ました', '。'] },
    ]
  },
  {
    key: 'klinik_curhatan_masuk_angin_terus', topic: 'klinik', jenis: 'curhatan',
    judulT: ['薬', 'を', '飲んでも', '戻って', 'くる'],
    judul: 'Kambuh terus walau sudah minum obat', judulEn: 'It keeps coming back even with the medicine',
    rel: 'teman',
    sit: 'Mengeluh sakit yang kambuh walau sudah berobat, tanpa minta saran', sitEn: 'Venting about an illness that keeps returning despite treatment, without asking for advice',
    id: 'Saya minum obat sampai habis dan beristirahat, tetapi dua minggu kemudian gejalanya kembali lagi.',
    en: 'I took the medicine to the end and rested, but two weeks later the symptoms came back.',
    note: 'Keluhan seperti ini diarahkan ke sakitnya, bukan ke dokternya, dan tidak meminta diagnosis.',
    noteEn: 'A complaint like this aims at the illness, not the doctor, and does not ask for a diagnosis.',
    blocks: [
      { id: 'Bulan lalu saya juga menerima obat yang sama, dan saya minum semuanya sesuai yang dikatakan.', t: ['先月', 'も', '同じ', '薬', 'を', 'もらって', '、', '言われた', 'とおり', 'に', '全部', '飲んだ', 'ん', 'だ', 'よ', '。'] },
      { id: 'Waktu itu saya merasa sudah sembuh, tetapi dua minggu kemudian kambuh lagi.', t: ['その', 'とき', 'は', '治った', 'と', '思った', 'ん', 'だけど', '、', '二週間', 'で', 'また', '戻って', 'きた', '。'] },
      { id: 'Bahkan, saya merasa sekarang jadi sedikit lebih berat.', t: ['しかも', '、', '前', 'より', '少し', 'ひどく', 'なって', 'いる', '気', 'が', 'する', '。'] },
      { id: 'Karena tidak mungkin tidak masuk kerja, saya tetap pergi walau memaksa diri.', t: ['仕事', 'を', '休む', 'わけ', 'に', 'も', 'いか', 'ない', 'から', '、', '無理', 'して', '行って', 'いる', '。'] },
      { id: 'Bukannya ingin tahu cara sembuhnya, saya hanya ingin didengarkan bahwa ini tidak kunjung berakhir.', t: ['治る', '方法', 'が', '知り', 'たい', 'わけ', 'じゃ', 'なくて', '、', 'なかなか', '終わら', 'ない', 'こと', 'を', '聞いて', 'ほしい', 'だけ', '。'] },
    ]
  },
  {
    key: 'klinik_keluhan_tunggu_terlalu_lama', topic: 'klinik', jenis: 'keluhan',
    judulT: ['予約', 'した', 'のに', '二時間', '待った'],
    judul: 'Menunggu dua jam tanpa penjelasan', judulEn: 'Waiting two hours with no explanation',
    rel: 'petugas',
    sit: 'Menyampaikan keluhan soal waktu tunggu di klinik', sitEn: 'Complaining about the waiting time at a clinic',
    id: 'Saya menyampaikan bahwa kunjungannya dijadwalkan tetapi menunggu dua jam, dan meminta perkiraan waktu diberitahukan.',
    en: 'I point out that the appointment was booked but the wait was two hours, and ask for an estimate to be given.',
    note: 'Keluhan di klinik disampaikan dengan menyebut janji, kenyataannya, lalu permintaan yang ringan, karena yang melayani juga bukan penyebabnya.',
    noteEn: 'A complaint at a clinic gives the appointment, the reality, then a light request, because the person listening is not the cause.',
    blocks: [
      { id: 'Maaf, ada sedikit yang ingin saya sampaikan.', t: ['すみません', '、', '少し', 'お伝え', 'したい', 'こと', 'が', 'あります', '。'] },
      { id: 'Saya datang dengan janji jam tiga, tetapi dipanggilnya jam lima.', t: ['三時', 'の', '予約', 'で', '来た', 'の', 'です', 'が', '、', '呼ばれた', 'の', 'は', '五時', 'でした', '。'] },
      { id: 'Saya jadi menunggu dua jam sambil berdiri, dan padahal badan saya sedang tidak enak, jadi berat sekali.', t: ['二時間', '、', '立って', '待つ', 'こと', 'に', 'なり', '、', '体調', 'が', '悪い', 'の', 'に', 'つらかった', 'です', '。'] },
      { id: 'Menunggu sendiri tidak apa-apa, jadi bisakah diberi tahu kira-kira masih berapa lama?', t: ['待つ', 'こと', '自体', 'は', '仕方', 'ない', 'と', '思います', 'ので', '、', 'あと', 'どの', 'くらい', 'か', 'だけ', '教えて', 'いただけ', 'ません', 'か', '。'] },
      { id: 'Kalau diberi tahu, saya bisa menunggu sambil beristirahat di luar.', t: ['そう', 'して', 'いただけれ', 'ば', '、', '外', 'で', '休んで', '待つ', 'こと', 'が', 'できます', '。'] },
    ]
  },
  {
    key: 'klinik_penjelasan_cara_minum_obat', topic: 'klinik', jenis: 'penjelasan',
    judulT: ['この薬', 'の', '飲み方'],
    judul: 'Cara minum obat yang diresepkan', judulEn: 'How to take the prescribed medicine',
    rel: 'apoteker',
    sit: 'Apoteker menerangkan cara minum obat kepada pasien', sitEn: 'The pharmacist explains to the patient how to take the medicine',
    id: 'Obat diminum setelah makan tiga kali sehari, harus dihabiskan, dan kalau ada efek samping berhenti dan menghubungi klinik.',
    en: 'The medicine is taken after meals three times a day, must be finished, and if there is a side effect, stop and call the clinic.',
    note: 'Penjelasan yang berguna menyebut apa yang harus dilakukan kalau muncul efek samping, karena itu yang paling jarang ditanyakan pasien.',
    noteEn: 'A useful explanation says what to do if a side effect appears, because that is what patients ask least.',
    blocks: [
      { id: 'Obat ini diminum tiga kali sehari, setelah makan.', t: ['この', '薬', 'は', '、', '一日', '三回', '、', '食べた', 'あと', 'に', '飲んで', 'ください', '。'] },
      { id: ['Sekali minum dua tablet.', 'Minum dengan air atau air hangat.'], t: ['一度', 'に', '二錠', 'です', '。', '水', 'か', 'ぬるま湯', 'で', '飲んで', 'ください', '。'] },
      { id: ['Walau keluhannya membaik, habiskan sampai akhir.', 'Kalau dihentikan di tengah, bisa kambuh lagi.'], t: ['症状', 'が', '良く', 'なって', 'も', '、', '最後', 'まで', '飲み', 'きって', 'ください', '。', '途中', 'で', 'やめる', 'と', '戻る', 'こと', 'が', 'あります', '。'] },
      { id: 'Kalau ada rasa mengantuk atau perut sakit, hentikan minumnya dan hubungi kami.', t: ['もし', '眠く', 'なる', '、', 'お腹', 'が', '痛く', 'なる', 'など', 'あっ', 'たら', '、', '飲む', 'の', 'を', '止めて', '連絡', 'して', 'ください', '。'] },
      { id: ['Kalau lupa minum, jangan diminum bersama dosis berikutnya.', 'Dua dosis sekaligus itu terlalu banyak.'], t: ['飲み', '忘れた', '場合', 'は', '、', '次', 'の', '分', 'と', '一緒', 'に', '飲ま', 'ない', 'で', 'ください', '。', '二回', '分', 'は', '多すぎ', 'ます', '。'] },
    ]
  },
  {
    key: 'klinik_laporan_demam_anak', topic: 'klinik', jenis: 'laporan',
    judulT: ['子供', 'の', '熱', 'の', '報告'],
    judul: 'Melaporkan keadaan demam anak', judulEn: 'Reporting a child\'s fever',
    rel: 'dokter',
    sit: 'Melaporkan keadaan demam anak kepada dokter, dengan angka dan waktu', sitEn: 'Reporting a child\'s fever to the doctor, with numbers and times',
    id: 'Saya melaporkan suhu anak sejak kapan, obat yang sudah diminum, dan bahwa anaknya masih mau makan.',
    en: 'I report the child\'s temperature since when, what medicine was given, and that the child is still eating.',
    note: 'Laporan ke dokter berguna kalau angkanya disebut, karena keterangan seperti panas atau dingin tidak bisa dipakai memutuskan.',
    noteEn: 'A report to a doctor is useful when the numbers are given, because vague words cannot be used to decide.',
    blocks: [
      { id: ['Saya datang soal anak saya.', 'Sejak tadi malam demamnya naik.'], t: ['子供', 'の', 'こと', 'で', '来ました', '。', '昨日', 'の', '夜', 'から', '熱', 'が', 'あります', '。'] },
      { id: ['Yang paling tinggi tadi pagi, tiga puluh sembilan derajat.', 'Sekarang sudah turun ke tiga puluh delapan.'], t: ['一番', '高かった', 'の', 'は', '、', '今朝', 'の', '三十九度', 'です', '。', '今', 'は', '三十八度', 'まで', '下がって', 'います', '。'] },
      { id: 'Obat anak yang ada di rumah saya berikan sekali saja.', t: ['家', 'に', 'あった', '子供', '用', 'の', '薬', 'を', '一度', 'だけ', '飲ませ', 'ました', '。'] },
      { id: ['Nafsu makannya masih ada sedikit, dia makan bubur setengah porsi.', 'Minumnya cukup.'], t: ['食欲', 'は', '少し', 'あって', '、', 'お粥', 'を', '半分', '食べ', 'ました', '。', '水分', 'は', '取れて', 'います', '。'] },
      { id: 'Dia batuk dan pilek, dan malam tadi beberapa kali terbangun.', t: ['咳', 'と', '鼻水', 'が', '出て', 'いて', '、', '夜', 'は', '何度', 'か', '起き', 'ました', '。'] },
    ]
  },
  {
    key: 'klinik_rencana_pemeriksaan_berkala', topic: 'klinik', jenis: 'rencana',
    judulT: ['年', 'に', '一度', 'の', '健康診断'],
    judul: 'Rencana pemeriksaan berkala', judulEn: 'Planning a routine check-up',
    rel: 'rekan',
    sit: 'Menyusun rencana pemeriksaan berkala, dengan waktu dan persiapannya', sitEn: 'Planning a routine check-up, with the timing and preparation',
    id: 'Kami menyusun pemeriksaan berkala setahun sekali, memilih bulan yang tidak sibuk, dan berpuasa sejak malam sebelumnya.',
    en: 'We plan an annual check-up, choose a month that is not busy, and fast from the night before.',
    note: 'Rencana pemeriksaan berguna karena menyebut persiapannya, bukan hanya tanggalnya.',
    noteEn: 'A check-up plan is useful because it states the preparation, not only the date.',
    blocks: [
      { id: 'Pemeriksaan kesehatan sebaiknya dilakukan sekali setahun.', t: ['健康診断', 'は', '、', '一年', 'に', '一度', 'は', '受けた', '方', 'が', 'いい', 'と', '思う', '。'] },
      { id: 'Februari pekerjaan sedang lengang, jadi mari kita masukkan ke bulan itu.', t: ['二月', 'は', '仕事', 'が', '落ち着く', 'から', '、', 'そこ', 'に', '入れ', 'よう', '。'] },
      { id: 'Mulai jam sembilan sehari sebelumnya, tidak boleh mengambil apa pun selain air.', t: ['前', 'の', '日', 'の', '九時', 'から', 'は', '、', '水', '以外', 'は', '取って', 'は', 'いけ', 'ない', '。'] },
      { id: 'Pagi berangkat tanpa makan, jadi janjinya diambil pagi.', t: ['朝', 'は', '食べ', 'ない', 'で', '行く', 'ので', '、', '予約', 'は', '午前', 'に', '取る', '。'] },
      { id: 'Hasilnya keluar sekitar satu minggu, jadi mari kita lihat berdua di hari hasilnya keluar.', t: ['結果', 'は', '一週間', 'ほど', 'で', '出る', 'から', '、', '出た', '日', 'に', '二人', 'で', '見', 'よう', '。'] },
    ]
  },
  {
    key: 'klinik_nasihat_jangan_tunda_ke_dokter', topic: 'klinik', jenis: 'nasihat',
    judulT: ['我慢', 'しないで', '早く', '行く', 'こと'],
    judul: 'Jangan menunda pergi ke dokter', judulEn: 'Do not put off going to the doctor',
    rel: 'teman',
    sit: 'Menasihati teman supaya tidak menunda berobat', sitEn: 'Advising a friend not to put off seeing a doctor',
    id: 'Saya menyarankan pergi sekarang karena sakit yang berlanjut dua minggu lebih sulit ditangani daripada dua hari.',
    en: 'I suggest going now because an illness lasting two weeks is harder to treat than one lasting two days.',
    note: 'Nasihat yang berguna menyebut batas waktu yang bisa dipakai memutuskan, bukan hanya menyuruh pergi.',
    noteEn: 'Useful advice gives a time limit the listener can act on, not just telling them to go.',
    blocks: [
      { id: 'Kalau sudah berlangsung dua minggu, sebaiknya hari ini juga pergi.', t: ['二週間', 'も', '続いて', 'いる', 'なら', '、', '今日', '行った', '方', 'が', 'いい', 'よ', '。'] },
      { id: 'Semakin lama berlangsung, semakin lama pula waktu untuk menyembuhkannya.', t: ['長く', '続いた', '物', 'ほど', '、', '治す', 'の', 'に', '時間', 'が', 'かかる', 'から', 'ね', '。'] },
      { id: 'Saya juga tahun lalu, karena menahan diri, akhirnya harus berobat selama sebulan.', t: ['私', 'も', '去年', '、', '我慢', 'して', 'いた', 'ら', '、', '結局', '一', 'か月', '通う', 'こと', 'に', 'なった', '。'] },
      { id: 'Sering kali cukup dengan datang saja, jadi beranikan diri untuk memesan tempat.', t: ['行く', 'だけ', 'で', '済む', 'こと', 'も', '多い', 'から', '、', '思い切って', '予約', 'して', 'しまおう', '。'] },
      { id: 'Kalau memang sungkan pergi, saya temani ya.', t: ['どうしても', '行き', 'にくけれ', 'ば', '、', '私', 'が', '一緒', 'に', '行って', 'あげる', 'よ', '。'] },
    ]
  },
  {
    key: 'klinik_permintaan_surat_keterangan', topic: 'klinik', jenis: 'permintaan',
    judulT: ['診断書', 'を', 'お願いします'],
    judul: 'Meminta surat keterangan sakit', judulEn: 'Asking for a medical certificate',
    rel: 'dokter',
    sit: 'Meminta surat keterangan sakit untuk kantor', sitEn: 'Asking for a sick note for work',
    id: 'Saya meminta surat keterangan untuk kantor, menyebut tanggal yang dibutuhkan, dan menanyakan biayanya.',
    en: 'I ask for a note for work, give the dates needed, and ask what it costs.',
    note: 'Permintaan ke dokter diterima karena tujuannya dan tanggalnya disebut, supaya suratnya tidak perlu dibuat dua kali.',
    noteEn: 'A request to a doctor is granted because the purpose and dates are given, so the note need not be written twice.',
    blocks: [
      { id: 'Ada yang ingin saya minta, bisakah Anda menuliskan surat keterangan dokter?', t: ['お願い', 'が', 'ある', 'の', 'です', 'が', '、', '診断書', 'を', '書いて', 'いただけ', 'ません', 'か', '。'] },
      { id: 'Untuk saya serahkan ke kantor, saya ingin tertulis hari-hari saya tidak masuk.', t: ['会社', 'に', '出す', 'ため', 'で', '、', '休んだ', '日', 'を', '書いて', 'いただき', 'たい', 'です', '。'] },
      { id: 'Tanggalnya, dari Senin sampai Rabu minggu lalu, tiga hari.', t: ['日にち', 'は', '、', '先週', 'の', '月曜', 'から', '水曜', 'までの', '三日', '間', 'です', '。'] },
      { id: ['Biayanya berapa?', 'Lalu, kira-kira kapan jadinya?'], t: ['費用', 'は', 'いくら', 'かかります', 'か', '。', 'また', '、', 'いつ', 'ごろ', 'でき', 'ます', 'か', '。'] },
      { id: 'Kalau perlu, format dari kantornya saya bawa besok.', t: ['必要', 'なら', '、', '会社', 'の', '書式', 'を', '明日', '持って', 'き', 'ます', '。'] },
    ]
  },
  {
    key: 'klinik_pengalaman_masuk_rumah_sakit', topic: 'klinik', jenis: 'pengalaman',
    judulT: ['初めて', '入院', 'した', 'とき'],
    judul: 'Pengalaman menginap di rumah sakit', judulEn: 'The time I stayed in hospital',
    rel: 'teman',
    sit: 'Menceritakan pengalaman pertama menginap di rumah sakit', sitEn: 'Recounting a first stay in hospital',
    id: 'Saya menginap tiga malam, tidak bisa tidur karena suara, dan sejak itu menghargai makanan rumah.',
    en: 'I stayed three nights, could not sleep for the noise, and since then I appreciate home cooking.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: keadaannya, bagian yang tidak enak, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the situation, the unpleasant part, and what changed afterwards.',
    blocks: [
      { id: 'Tiga tahun lalu, saya pernah dirawat di rumah sakit selama tiga hari untuk pertama kalinya.', t: ['三年前', 'に', '、', '初めて', '三日', '間', '入院', 'した', 'こと', 'が', 'あります', '。'] },
      { id: 'Kamarnya untuk empat orang, dan malam pun ada bunyi mesin, jadi saya tidak banyak tidur.', t: ['部屋', 'は', '四人', '部屋', 'で', '、', '夜', 'も', '機械', 'の', '音', 'が', 'して', '、', 'あまり', '眠れ', 'ません', 'でした', '。'] },
      { id: 'Hanya saja, perawatnya datang setiap hari dan menemani saya bicara, dan itu sangat membantu.', t: ['ただ', '、', '看護師', 'さん', 'が', '毎日', '来て', 'くれて', '、', '話し', '相手', 'に', 'なって', 'くれた', 'の', 'は', '助かり', 'ました', '。'] },
      { id: 'Hari saya keluar, udara di luar terasa begitu nikmat.', t: ['退院', 'した', '日', 'に', '、', '外', 'の', '空気', 'が', 'とても', 'おいしく', '感じ', 'ました', '。'] },
      { id: 'Sejak itu, saya jadi tahu betapa berharganya makanan di rumah.', t: ['あれ', 'から', '、', '家', 'の', 'ご飯', 'が', 'どんな', 'に', 'ありがたい', 'か', '分かる', 'ように', 'なりました', '。'] },
    ]
  },
  {
    key: 'klinik_pengumuman_jam_praktik', topic: 'klinik', jenis: 'pengumuman',
    judulT: ['診察', 'の', '時間', 'が', '変わります'],
    judul: 'Pengumuman perubahan jam praktik', judulEn: 'An announcement about changed clinic hours',
    rel: 'pasien',
    sit: 'Pengumuman ke pasien bahwa jam praktik berubah untuk sementara', sitEn: 'Announcing to patients that clinic hours change temporarily',
    id: 'Klinik mengumumkan jam praktik sore dimundurkan, satu ruangan dipakai untuk pemeriksaan khusus, dan pasien diminta menelepon lebih dulu.',
    en: 'The clinic announces that afternoon hours shift later, one room is used for special examinations, and patients are asked to call first.',
    note: 'Pengumuman menyebut perubahan jam dan apa yang harus dilakukan pasien lebih dulu, karena pendengar memutuskan dalam dua detik apakah ini urusannya.',
    noteEn: 'An announcement gives the changed hours and what patients must do first, because the listener decides in two seconds whether it concerns them.',
    blocks: [
      { id: 'Kepada para pasien yang datang, ada pengumuman.', t: ['来院', 'され', 'た', '皆様', 'に', 'お知らせ', 'です', '。'] },
      { id: 'Minggu ini, penerimaan siang diubah menjadi dari jam tiga sampai jam lima.', t: ['今週', 'は', '、', '午後', 'の', '受付', 'を', '三時', 'から', '五時', 'まで', 'に', '変更', 'します', '。'] },
      { id: 'Untuk pagi tetap seperti sebelumnya, dari jam sembilan sampai jam dua belas.', t: ['午前', 'は', 'これまで', 'どおり', '、', '九時', 'から', '十二時', 'まで', 'です', '。'] },
      { id: 'Selain itu, ruang periksa kedua dipakai untuk pemeriksaan penunjang, jadi pemeriksaan biasa dilakukan di ruang periksa pertama.', t: ['また', '、', '第二', '診察室', 'は', '検査', 'の', 'ため', 'に', '使用', 'されます', 'ので', '、', '通常', 'の', '診察', 'は', '第一', '診察室', 'で', '行います', '。'] },
      { id: 'Untuk mempersingkat waktu tunggu, mohon menelepon untuk memesan sebelum datang.', t: ['待ち時間', 'を', '短く', 'する', 'ため', '、', '来る', '前', 'に', '電話', 'で', '予約', 'を', 'お願い', 'します', '。'] },
    ]
  },
]);
