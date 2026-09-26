/* Rumah santai: the house after the chores are done.
 *
 * 自宅×休息 8,82% plus two small cells, and 59% of it is spoken to family, so this is almost all
 * plain speech: nobody says お疲れ様です to their own partner on the sofa. The polite edge is the
 * relative who visits.
 *
 * chores are in data/t_rumah_tugas.js and eating is in data/t_makan.js; this file is the rest.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - mengeluh capek dan meminta waktu sendiri
 * - menceritakan hari yang baru lewat dengan isi, bukan hanya "capek"
 * - mengajak istirahat, mengajak tidur, mengajak menonton
 * - menolak ajakan keluar karena mau diam di rumah
 * - menanyakan kabar anggota keluarga yang lain
 * - menceritakan hal yang baru diketahui, memberi tahu sesuatu yang menarik
 * - menenangkan orang yang sedang kesal, menerima keluhan orang lain
 * - menutup hari: mengucapkan selamat tidur, mengucapkan sampai besok
 * Tidak termasuk:
 * - pekerjaan rumah, masuk ke `rumah_tugas`
 * - makan sebagai acara, masuk ke `makan`
 * - waktu luang di luar rumah, masuk ke `santai`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'rumah_santai_percakapan_ajak_istirahat', topic: 'rumah_santai', jenis: 'percakapan',
    judulT: ['少し', '休んだ', 'ら', 'どう', 'ですか'],
    judul: 'Mengajak istirahat setelah hari panjang', judulEn: 'Suggesting a rest after a long day',
    speakers: {'A':'pasangan','B':'pasangan'},
    sit: 'Dua orang di rumah saling menawarkan istirahat setelah hari yang berat', sitEn: 'Two people at home offering each other a rest after a hard day',
    id: 'Saya menawarkan minum dan kursi, pasangan memilih duduk diam dulu, dan saya membiarkannya tanpa bertanya lebih jauh.',
    en: 'I offer a drink and a seat, my partner chooses to sit quietly first, and I leave them alone without asking more.',
    note: 'Yang membuat percakapan ini menenangkan adalah tawaran kedua yang lebih kecil, bukan pertanyaan tentang apa yang terjadi.',
    noteEn: 'What makes this conversation calming is the smaller second offer, not a question about what happened.',
    blocks: [
      { sp: 'A', t: ['お帰り', '。', '顔', 'が', '疲れて', 'いる', 'ね', '。', 'とりあえず', '座っ', 'たら', '？'] },
      { sp: 'B', t: ['ありがとう', '。', 'ちょっと', 'だけ', '横', 'に', 'なり', 'たい', '。'] },
      { sp: 'A', t: ['いい', 'よ', '。', 'お茶', 'を', '入れて', 'おく', 'から', '、', '飲み', 'たい', 'とき', 'に', '言って', '。'] },
      { sp: 'B', t: ['今日', 'は', '何', 'も', '聞か', 'ない', 'で', 'くれる', 'と', '助かる', '。'] },
      { sp: 'A', t: ['うん', '、', '聞か', 'ない', 'よ', '。', 'ご飯', 'は', '後', 'で', 'いい', 'し', '。'] },
      { sp: 'B', t: ['少し', '休んだ', 'ら', '、', '話せる', 'と', '思う', '。'] },
      { sp: 'A', t: ['わかった', '。', 'ゆっくり', 'して', '。'] },
    ]
  },
  {
    key: 'rumah_santai_cerita_malam_yang_tenang', topic: 'rumah_santai', jenis: 'cerita',
    judulT: ['何も', 'しない', '夜', 'の', '話'],
    judul: 'Malam ketika tidak ada yang dikerjakan', judulEn: 'An evening with nothing to do',
    rel: 'pasangan',
    sit: 'Menceritakan malam yang sengaja dibiarkan kosong', sitEn: 'Recounting an evening deliberately left empty',
    id: 'Kami mematikan televisi, membuka jendela, dan malam itu terasa panjang karena tidak ada yang dikejar.',
    en: 'We turned off the television, opened the window, and the evening felt long because there was nothing to chase.',
    note: 'Ceritanya bergerak dari yang dihentikan ke yang dibuka, lalu ke apa yang berubah rasanya.',
    noteEn: 'The story moves from what was stopped to what was opened, then to how it felt different.',
    blocks: [
      { t: ['金曜', 'の', '夜', 'は', '、', 'いつも', 'テレビ', 'を', 'つけて', 'いる', 'の', 'を', 'やめて', 'みました', '。'] },
      { t: ['部屋', 'が', '静か', 'に', 'なって', '、', '時計', 'の', '音', 'まで', '聞こえ', 'ました', '。'] },
      { t: ['窓', 'を', '開けた', 'ら', '、', '風', 'が', '入って', 'きて', '、', '外', 'の', '匂い', 'が', 'しました', '。'] },
      { t: ['何', 'も', 'して', 'いない', 'の', 'に', '、', '時間', 'が', '長く', '感じ', 'られ', 'ました', '。'] },
      { t: ['ああ', 'いう', '夜', 'が', '、', '一番', '疲れ', 'を', '取る', 'の', 'だ', 'と', '分かり', 'ました', '。'] },
    ]
  },
  {
    key: 'rumah_santai_kronologi_malam_sampai_tidur', topic: 'rumah_santai', jenis: 'kronologi',
    judulT: ['風呂', 'から', '布団', 'まで'],
    judul: 'Urutan malam sampai tidur', judulEn: 'The order of an evening until sleep',
    rel: 'pasangan',
    sit: 'Menceritakan urutan kegiatan malam di rumah sampai tidur', sitEn: 'Recounting the order of an evening at home until sleep',
    id: 'Saya mandi, makan malam, membaca sebentar, lalu tidur lebih awal karena besok harus bangun pagi.',
    en: 'I bathed, ate dinner, read a little, then went to bed early because tomorrow starts early.',
    note: 'Urutannya diikat たら dan ので, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by たら and ので, so each line explains the one before it.',
    blocks: [
      { t: ['風呂', 'に', '入った', 'ら', '、', '体', 'が', '温まって', '、', '眠く', 'なり', '始め', 'ました', '。'] },
      { t: ['その', 'まま', '食べる', 'の', 'は', 'よく', 'ない', 'ので', '、', '先', 'に', '軽く', '食べる', 'ことに', 'しました', '。'] },
      { t: ['食べた', 'あと', 'で', '、', '本', 'を', '十', 'ページ', 'だけ', '読み', 'ました', '。'] },
      { t: ['明日', 'は', '六時', 'に', '起きる', 'ので', '、', '十一時', 'に', 'は', '布団', 'に', '入り', 'ました', '。'] },
      { t: ['おかげ', 'で', '、', '朝', 'は', '一度', 'も', '目', 'が', '覚め', 'ません', 'でした', '。'] },
    ]
  },
  {
    key: 'rumah_santai_curhatan_lelah_tanpa_alasan', topic: 'rumah_santai', jenis: 'curhatan',
    judulT: ['理由', 'も', 'なく', '疲れて', 'いる'],
    judul: 'Lelah yang tidak jelas sebabnya', judulEn: 'Tired without a clear reason',
    rel: 'pasangan',
    sit: 'Mengeluh lelah yang tidak jelas sebabnya, tanpa minta saran', sitEn: 'Venting about tiredness with no clear cause, without asking for advice',
    id: 'Saya lelah walaupun harinya tidak berat, dan akhirnya cuma duduk tanpa bisa memutuskan mau melakukan apa.',
    en: 'I am tired even though the day was not hard, and end up just sitting there unable to decide what to do.',
    note: 'Keluhan seperti ini diarahkan ke keadaannya sendiri, bukan ke orang lain, dan tidak menyimpulkan apa pun.',
    noteEn: 'A complaint like this aims at one\'s own state, not at anyone else, and draws no conclusion.',
    blocks: [
      { t: ['今日', 'は', '別に', '大変な', 'こと', 'は', 'なかった', 'ん', 'だけど', '、', 'なぜ', 'か', 'すごく', '疲れて', 'いる', '。'] },
      { t: ['何', 'か', 'を', 'し', 'よう', 'と', '思って', 'も', '、', 'どれ', 'も', '面倒', 'に', '感じる', 'んだ', 'よ', '。'] },
      { t: ['結局', '、', 'ソファ', 'に', '座った', 'まま', '、', '十分', 'くらい', '何', 'も', '決め', 'られ', 'なかった', '。'] },
      { t: ['体', 'が', '重い', 'わけ', 'で', 'は', 'なくて', '、', '気持ち', 'の', '方', 'が', '動か', 'ない', '感じ', 'な', 'ん', 'だ', '。'] },
      { t: ['休め', 'ば', 'いい', 'と', '分かって', 'いる', 'けど', '、', '休んで', 'も', '戻ら', 'ない', 'の', 'が', '困る', '。'] },
    ]
  },
  {
    key: 'rumah_santai_keluhan_televisi_berisik', topic: 'rumah_santai', jenis: 'keluhan',
    judulT: ['テレビ', 'の', '音', 'を', '小さく', 'して'],
    judul: 'Suara televisi yang terlalu keras', judulEn: 'The television turned up too loud',
    rel: 'keluarga',
    sit: 'Menyampaikan keluhan soal suara televisi di rumah, dengan permintaan yang jelas', sitEn: 'Raising television volume at home, with a clear request',
    id: 'Saya meminta volume diturunkan setelah pukul sepuluh karena dinding tipis, dan menawarkan memakai headphone sebagai gantinya.',
    en: 'I ask for the volume to come down after ten because the walls are thin, and offer headphones instead.',
    note: 'Keluhan di rumah diterima karena jamnya disebut dan jalan keluarnya ditawarkan lebih dulu.',
    noteEn: 'A complaint at home is granted because the hour is named and a way out is offered first.',
    blocks: [
      { t: ['ちょっと', 'お願い', 'が', 'ある', 'ん', 'だけど', '、', 'いい', 'かな', '。'] },
      { t: ['十時', 'を', '過ぎたら', '、', 'テレビ', 'の', '音', 'を', '小さく', 'して', 'ほしい', 'の', '。'] },
      { t: ['壁', 'が', '薄い', 'から', '、', '隣', 'の', '部屋', 'まで', 'はっきり', '聞こえる', 'の', 'です', '。'] },
      { t: ['私', 'は', 'もう', '寝る', 'ので', '、', '少し', 'だけ', '小さく', 'して', 'もらえる', 'と', '助かる', '。'] },
      { t: ['どうしても', '聞き', 'たい', 'とき', 'は', '、', 'ヘッドホン', 'を', '使って', 'くれれ', 'ば', '大丈夫', 'だ', 'よ', '。'] },
    ]
  },
  {
    key: 'rumah_santai_penjelasan_cara_rumah_tenang', topic: 'rumah_santai', jenis: 'penjelasan',
    judulT: ['家', 'が', '落ち着く', '三つ', 'のこと'],
    judul: 'Cara membuat rumah terasa tenang', judulEn: 'How to make a home feel calm',
    rel: 'teman',
    sit: 'Menerangkan kebiasaan yang membuat rumah terasa tenang', sitEn: 'Explaining the habits that make a home feel calm',
    id: 'Saya menerangkan bahwa yang membuat rumah tenang bukan luasnya, melainkan barang yang tidak menumpuk dan satu tempat yang selalu rapi.',
    en: 'I explain that what makes a home calm is not its size but things not piling up and one place that is always tidy.',
    note: 'Penjelasan yang berguna menyebut kebalikannya lebih dulu, karena pembaca biasanya mengira jawabannya luas atau mahal.',
    noteEn: 'A useful explanation rules out the obvious guess first, because the listener usually assumes size or money.',
    blocks: [
      { t: ['家', 'が', '広い', 'から', '落ち着く', 'わけ', 'で', 'は', 'あり', 'ません', '。', '狭く', 'て', 'も', '静か', 'な', '家', 'は', 'あります', '。'] },
      { t: ['一番', '効く', 'の', 'は', '、', '物', 'を', '増やさ', 'ない', 'こと', 'です', '。', '目', 'に', '入る', '物', 'が', '減る', 'と', '、', 'それ', 'だけ', 'で', '違います', '。'] },
      { t: ['次', 'に', '、', '一', 'か所', 'だけ', 'は', '必ず', '片付けて', 'おく', 'こと', 'です', '。', 'どこ', 'か', '一', 'つ', 'きれい', 'だ', 'と', '、', '全体', 'が', '整って', '見え', 'ます', '。'] },
      { t: ['音', 'も', '大事', 'です', '。', 'テレビ', 'を', 'つけ', 'っ放し', 'に', 'しない', 'だけ', 'で', '、', '部屋', 'の', '感じ', 'が', '変わり', 'ます', '。'] },
      { t: ['お金', 'を', 'かけ', 'なくて', 'も', '、', 'この', '三つ', 'で', 'かなり', '変わります', '。'] },
    ]
  },
  {
    key: 'rumah_santai_laporan_hari_yang_baru_lewat', topic: 'rumah_santai', jenis: 'laporan',
    judulT: ['今日', 'は', 'こんな', '一日', 'でした'],
    judul: 'Melaporkan hari yang baru lewat', judulEn: 'Reporting the day that just ended',
    rel: 'pasangan',
    sit: 'Melaporkan isi hari yang baru lewat, bukan hanya mengatakan lelah', sitEn: 'Reporting what the day contained, rather than only saying it was tiring',
    id: 'Saya bercerita bahwa rapatnya panjang, ada satu hal yang akhirnya selesai, dan saya ingin menonton sesuatu yang ringan.',
    en: 'I tell them the meeting was long, one thing finally got finished, and I want to watch something light.',
    note: 'Laporan yang berguna memuat satu hal yang selesai, karena hari yang hanya berisi keluhan membuat yang mendengar tidak bisa menanggapi.',
    noteEn: 'A useful report contains one thing that finished, because a day of pure complaints leaves the listener nothing to answer.',
    blocks: [
      { t: ['今日', 'は', '、', '午前', 'から', '午後', 'まで', '会議', 'が', '続いて', '、', '正直', 'かなり', '長かった', '。'] },
      { t: ['ただ', '、', 'ずっと', '止まって', 'いた', '件', 'が', '一つ', '片付いた', 'ので', '、', 'そこ', 'は', 'すっきり', 'した', '。'] },
      { t: ['昼', 'は', '食べる', '時間', 'が', '五分', 'しか', 'なくて', '、', 'パン', 'だけ', 'だった', '。'] },
      { t: ['今', 'は', '頭', 'が', '疲れて', 'いる', 'から', '、', '何', 'も', '考え', 'ない', '物', 'を', '見', 'たい', '。'] },
      { t: ['明日', 'は', '今日', 'より', 'は', '落ち着く', 'はず', 'だから', '、', '今夜', 'は', '早く', '寝る', 'つもり', '。'] },
    ]
  },
  {
    key: 'rumah_santai_rencana_akhir_pekan_di_rumah', topic: 'rumah_santai', jenis: 'rencana',
    judulT: ['出', 'かけ', 'ない', '週末', 'の', '計画'],
    judul: 'Rencana akhir pekan diam di rumah', judulEn: 'Planning a weekend spent at home',
    rel: 'pasangan',
    sit: 'Menyusun rencana akhir pekan yang sengaja dihabiskan di rumah', sitEn: 'Planning a weekend deliberately spent at home',
    id: 'Kami memutuskan tidak keluar, menyiapkan bahan makanan sehari sebelumnya, dan menyisakan satu hari tanpa rencana.',
    en: 'We decide not to go out, buy food the day before, and keep one day completely unplanned.',
    note: 'Rencana seperti ini berguna karena menyebut apa yang sengaja tidak dilakukan.',
    noteEn: 'A plan like this is useful because it says what is deliberately not done.',
    blocks: [
      { t: ['今週', 'の', '土日', 'は', '、', 'どこ', 'にも', '行か', 'ない', 'こと', 'に', 'しよう', '。'] },
      { t: ['前', 'の', '日', 'に', '、', '二日', '分', 'の', '食べ物', 'を', '買って', 'おけ', 'ば', '、', '外', 'に', '出', 'なくて', '済む', '。'] },
      { t: ['土曜', 'は', '、', '見', 'たい', '物', 'を', '決めて', 'おいて', '、', '一日', 'ゆっくり', 'する', '。'] },
      { t: ['日曜', 'は', '、', '予定', 'を', '入れ', 'ない', 'で', 'おく', '。', '急', 'に', '出かけたく', 'なった', 'ら', '、', 'それ', 'で', 'いい', '。'] },
      { t: ['連絡', 'は', '、', '必要', 'な', 'とき', 'だけ', 'に', 'して', '、', 'できれ', 'ば', '静か', 'に', '過ごす', 'つもり', '。'] },
    ]
  },
  {
    key: 'rumah_santai_nasihat_jangan_membawa_kerja_ke_rumah', topic: 'rumah_santai', jenis: 'nasihat',
    judulT: ['仕事', 'の', '場所', 'を', '決める', 'こと'],
    judul: 'Jangan biarkan kerja masuk ke ruang duduk', judulEn: 'Do not let work into the living room',
    rel: 'teman',
    sit: 'Menasihati teman supaya memisahkan tempat kerja dari tempat istirahat', sitEn: 'Advising a friend to separate where they work from where they rest',
    id: 'Saya menyarankan menyelesaikan pekerjaan di satu tempat saja, karena di rumah yang tidak ada pemisahnya, istirahat pun tidak terasa.',
    en: 'I suggest keeping work to one spot, because in a home with no separation even rest does not feel like rest.',
    note: 'Nasihat yang berguna menyebut akibat yang bisa dirasakan langsung, bukan hanya menyuruh disiplin.',
    noteEn: 'Useful advice names a consequence the listener can feel at once, rather than preaching discipline.',
    blocks: [
      { t: ['家', 'で', '仕事', 'を', 'する', 'なら', '、', '場所', 'を', '一つ', 'に', '決めた', '方', 'が', 'いい', 'よ', '。'] },
      { t: ['ソファ', 'で', 'も', '机', 'で', 'も', 'いい', 'けど', '、', 'そこで', 'だけ', 'やる', 'と', '決める', 'ん', 'だ', '。'] },
      { t: ['そう', 'し', 'ない', 'と', '、', '部屋', 'の', 'どこ', 'に', 'いて', 'も', '仕事', 'が', '頭', 'に', '残って', '、', '休んだ', '気', 'が', 'し', 'ない', '。'] },
      { t: ['終わった', 'ら', '、', 'その', '場所', 'を', '片付けて', '、', '見え', 'ない', 'ように', 'する', 'と', '効果', 'が', 'ある', '。'] },
      { t: ['狭い', '家', 'でも', '、', 'これ', 'だけ', 'で', '夜', 'の', '感じ', 'が', '変わります', '。'] },
    ]
  },
  {
    key: 'rumah_santai_permintaan_minta_waktu_sendiri', topic: 'rumah_santai', jenis: 'permintaan',
    judulT: ['三十分', 'だけ', '一人', 'に', 'してください'],
    judul: 'Meminta waktu sendiri sebentar', judulEn: 'Asking for a little time alone',
    rel: 'pasangan',
    sit: 'Meminta waktu sendiri, dengan jangka waktu dan alasannya', sitEn: 'Asking for time alone, with a length and a reason',
    id: 'Saya meminta tiga puluh menit sendiri, menjelaskan bahwa bukan karena marah, dan berjanji bercerita setelahnya.',
    en: 'I ask for thirty minutes alone, explain it is not because I am angry, and promise to talk afterwards.',
    note: 'Permintaan seperti ini diterima karena lamanya disebut dan karena sebabnya bukan orang yang mendengarnya.',
    noteEn: 'A request like this is granted because the length is given and the cause is not the person hearing it.',
    blocks: [
      { t: ['悪い', 'けど', '、', '三十分', 'だけ', '一人', 'に', 'して', 'ほしい', 'の', '。'] },
      { t: ['怒って', 'いる', 'わけ', 'じゃ', 'ない', 'の', '。', '音', 'が', '多すぎて', '、', '頭', 'が', '追い', 'つか', 'ない', 'だけ', '。'] },
      { t: ['その', '間', 'は', '、', '話しかけ', 'ない', 'で', 'くれる', 'と', '助かる', '。'] },
      { t: ['終わった', 'ら', '、', '自分', 'から', '話し', 'に', '行く', 'から', '、', '心配', 'し', 'ない', 'で', '。'] },
      { t: ['もし', 'それ', 'でも', '足り', 'なければ', '、', 'もう', '少し', 'もらう', 'かも', 'しれ', 'ない', 'けど', '、', '必ず', '言う', 'ね', '。'] },
    ]
  },
  {
    key: 'rumah_santai_pengalaman_pindah_rumah', topic: 'rumah_santai', jenis: 'pengalaman',
    judulT: ['狭い', '部屋', 'に', '引っ越し', 'た', '話'],
    judul: 'Pengalaman pindah ke rumah yang lebih kecil', judulEn: 'Moving into a smaller home',
    rel: 'teman',
    sit: 'Menceritakan pengalaman pindah ke tempat yang lebih kecil dan pelajarannya', sitEn: 'Recounting moving somewhere smaller and what it taught',
    id: 'Saya pindah ke tempat yang lebih kecil, membuang separuh barang, dan ternyata hidupnya terasa lebih ringan.',
    en: 'I moved somewhere smaller, threw away half of my things, and life turned out to feel lighter.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: keadaannya, yang dilepaskan, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the situation, what was let go, and what changed afterwards.',
    blocks: [
      { t: ['去年', '、', '今', 'まで', 'より', 'ずっと', '狭い', '部屋', 'に', '引っ越し', 'ました', '。'] },
      { t: ['入り', 'きら', 'ない', 'の', 'が', '分かって', 'いた', 'ので', '、', '引っ越す', '前', 'に', '物', 'を', '半分', '捨て', 'ました', '。'] },
      { t: ['捨てる', 'とき', 'は', '惜しかった', 'けど', '、', '新しい', '部屋', 'に', '置いた', 'ら', '、', 'なぜ', 'か', '必要', 'に', '思え', 'ました', '。'] },
      { t: ['狭く', 'なった', 'の', 'に', '、', '部屋', 'が', '広く', '感じられ', 'ます', '。'] },
      { t: ['物', 'が', '少ない', 'と', '、', '探す', '時間', 'も', '片付ける', '時間', 'も', '減ると', '知り', 'ました', '。'] },
    ]
  },
  {
    key: 'rumah_santai_pengumuman_listrik_mati', topic: 'rumah_santai', jenis: 'pengumuman',
    judulT: ['明日', 'の', '午後、', '電気', 'が', '止まります'],
    judul: 'Pengumuman listrik mati sementara', judulEn: 'An announcement about a short power cut',
    rel: 'keluarga',
    sit: 'Mengumumkan ke keluarga bahwa listrik akan mati sebentar', sitEn: 'Announcing to the family that the power will go off briefly',
    id: 'Listrik akan mati dua jam untuk pemeriksaan, alat yang butuh listrik diminta dimatikan lebih dulu, dan makan malam dimajukan.',
    en: 'The power will be off for two hours for an inspection, appliances are to be switched off beforehand, and dinner moves earlier.',
    note: 'Pengumuman di rumah menyebut apa yang harus dilakukan sebelum kejadiannya, karena setelah listrik mati sudah terlambat.',
    noteEn: 'An announcement at home gives what to do before the event, because once the power is off it is too late.',
    blocks: [
      { t: ['皆', 'に', '知らせ', 'が', 'ある', '。', '明日', 'の', '午後', '、', '電気', 'が', '止まる', '。'] },
      { t: ['止まる', 'の', 'は', '、', '一時', 'から', '三時', 'まで', 'の', '二時間', 'だ', '。'] },
      { t: ['前', 'の', '日', 'に', '、', '冷蔵庫', 'の', '物', 'で', '傷み', 'やすい', 'の', 'は', '先', 'に', '食べて', 'おいて', '。'] },
      { t: ['使わ', 'ない', '電化製品', 'は', '、', '朝', 'の', 'うち', 'に', 'コンセント', 'から', '抜いて', 'おく', 'こと', '。'] },
      { t: ['その', '間', 'は', '暗く', 'なる', 'から', '、', '夕飯', 'は', '少し', '早め', 'に', 'しよう', '。'] },
    ]
  },
]);
