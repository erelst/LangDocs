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
      { sp: 'A', id: ['Selamat datang.', 'Wajahmu kelihatan lelah.', 'Duduk dulu, bagaimana?'], en: ['Welcome home.', 'You look tired.', 'Why don\'t you sit down for now?'], t: ['お帰り', '。', '顔', 'が', '疲れて', 'いる', 'ね', '。', 'とりあえず', '座っ', 'たら', '？'] },
      { sp: 'B', id: ['Terima kasih.', 'Aku mau berbaring sebentar saja.'], en: ['Thanks.', 'I just want to lie down a little.'], t: ['ありがとう', '。', 'ちょっと', 'だけ', '横', 'に', 'なり', 'たい', '。'] },
      { sp: 'A', id: ['Boleh.', 'Aku buatkan teh, bilang saja kalau mau minum.'], en: ['Sure.', 'I\'ll make tea, just say when you want it.'], t: ['いい', 'よ', '。', 'お茶', 'を', '入れて', 'おく', 'から', '、', '飲み', 'たい', 'とき', 'に', '言って', '。'] },
      { sp: 'B', id: 'Hari ini aku akan sangat terbantu kalau kamu tidak menanyakan apa-apa.', en: 'It would help today if you didn\'t ask me anything.', t: ['今日', 'は', '何', 'も', '聞か', 'ない', 'で', 'くれる', 'と', '助かる', '。'] },
      { sp: 'A', id: ['Ya, aku tidak bertanya.', 'Makan pun nanti tidak apa-apa.'], en: ['All right, I won\'t ask.', 'Dinner can wait too.'], t: ['うん', '、', '聞か', 'ない', 'よ', '。', 'ご飯', 'は', '後', 'で', 'いい', 'し', '。'] },
      { sp: 'B', id: 'Setelah istirahat sebentar, sepertinya aku sudah bisa bicara.', en: 'After resting a bit, I think I\'ll be able to talk.', t: ['少し', '休んだ', 'ら', '、', '話せる', 'と', '思う', '。'] },
      { sp: 'A', id: ['Baik.', 'Istirahat saja dengan tenang.'], en: ['Understood.', 'Take it easy.'], t: ['わかった', '。', 'ゆっくり', 'して', '。'] },
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
      { id: 'Jumat malam saya coba berhenti menyalakan televisi seperti biasanya.', en: 'On Friday night I tried not turning on the television as I usually do.', t: ['金曜', 'の', '夜', 'は', '、', 'いつも', 'テレビ', 'を', 'つけて', 'いる', 'の', 'を', 'やめて', 'みました', '。'] },
      { id: 'Ruangan jadi hening, sampai suara jam pun terdengar.', en: 'The room went quiet, and I could even hear the clock.', t: ['部屋', 'が', '静か', 'に', 'なって', '、', '時計', 'の', '音', 'まで', '聞こえ', 'ました', '。'] },
      { id: 'Waktu saya buka jendelanya, angin masuk, dan tercium bau dari luar.', en: 'When I opened the window, the breeze came in and I could smell outside.', t: ['窓', 'を', '開けた', 'ら', '、', '風', 'が', '入って', 'きて', '、', '外', 'の', '匂い', 'が', 'しました', '。'] },
      { id: 'Padahal tidak sedang melakukan apa-apa, waktunya terasa lebih lama.', en: 'Even though I wasn\'t doing anything, the time felt longer.', t: ['何', 'も', 'して', 'いない', 'の', 'に', '、', '時間', 'が', '長く', '感じ', 'られ', 'ました', '。'] },
      { id: 'Saya jadi tahu bahwa malam seperti itulah yang paling menghilangkan lelah.', en: 'I realised that a night like that is the one that takes the tiredness away best.', t: ['ああ', 'いう', '夜', 'が', '、', '一番', '疲れ', 'を', '取る', 'の', 'だ', 'と', '分かり', 'ました', '。'] },
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
      { id: 'Setelah mandi, badan saya menghangat dan mulai mengantuk.', en: 'After my bath, my body warmed up and I began to feel sleepy.', t: ['風呂', 'に', '入った', 'ら', '、', '体', 'が', '温まって', '、', '眠く', 'なり', '始め', 'ました', '。'] },
      { id: 'Karena makan langsung setelah itu tidak baik, saya putuskan makan ringan dulu.', en: 'Eating straight after isn\'t good, so I decided to eat something light first.', t: ['その', 'まま', '食べる', 'の', 'は', 'よく', 'ない', 'ので', '、', '先', 'に', '軽く', '食べる', 'ことに', 'しました', '。'] },
      { id: 'Setelah makan, saya membaca buku sepuluh halaman saja.', en: 'After eating, I read just ten pages of a book.', t: ['食べた', 'あと', 'で', '、', '本', 'を', '十', 'ページ', 'だけ', '読み', 'ました', '。'] },
      { id: 'Karena besok harus bangun jam enam, saya masuk ke tempat tidur jam sebelas.', en: 'Since I had to get up at six the next day, I got into bed at eleven.', t: ['明日', 'は', '六時', 'に', '起きる', 'ので', '、', '十一時', 'に', 'は', '布団', 'に', '入り', 'ました', '。'] },
      { id: 'Berkat itu, paginya saya tidak terbangun sekali pun.', en: 'Thanks to that, I didn\'t wake up once in the morning.', t: ['おかげ', 'で', '、', '朝', 'は', '一度', 'も', '目', 'が', '覚め', 'ません', 'でした', '。'] },
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
      { id: 'Hari ini sebenarnya tidak ada yang berat, tetapi entah kenapa saya lelah sekali.', en: 'Nothing particularly hard happened today, but for some reason I\'m extremely tired.', t: ['今日', 'は', '別に', '大変な', 'こと', 'は', 'なかった', 'ん', 'だけど', '、', 'なぜ', 'か', 'すごく', '疲れて', 'いる', '。'] },
      { id: 'Walau ingin melakukan sesuatu, semuanya terasa merepotkan.', en: 'Even when I think about doing something, everything feels like a bother.', t: ['何', 'か', 'を', 'し', 'よう', 'と', '思って', 'も', '、', 'どれ', 'も', '面倒', 'に', '感じる', 'んだ', 'よ', '。'] },
      { id: 'Akhirnya, sambil duduk di sofa, sekitar sepuluh menit saya tidak bisa memutuskan apa pun.', en: 'In the end I sat on the sofa and couldn\'t decide anything for about ten minutes.', t: ['結局', '、', 'ソファ', 'に', '座った', 'まま', '、', '十分', 'くらい', '何', 'も', '決め', 'られ', 'なかった', '。'] },
      { id: 'Bukannya badan yang berat, tetapi perasaannya yang tidak bergerak.', en: 'It\'s not that my body is heavy, it\'s more that my feelings won\'t move.', t: ['体', 'が', '重い', 'わけ', 'で', 'は', 'なくて', '、', '気持ち', 'の', '方', 'が', '動か', 'ない', '感じ', 'な', 'ん', 'だ', '。'] },
      { id: 'Saya tahu sebaiknya beristirahat, tetapi yang menyulitkan itu, beristirahat pun tidak kembali.', en: 'I know I should rest, but the trouble is that resting doesn\'t bring it back.', t: ['休め', 'ば', 'いい', 'と', '分かって', 'いる', 'けど', '、', '休んで', 'も', '戻ら', 'ない', 'の', 'が', '困る', '。'] },
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
      { id: 'Ada yang ingin saya minta, boleh?', en: 'There\'s something I\'d like to ask, is that all right?', t: ['ちょっと', 'お願い', 'が', 'ある', 'ん', 'だけど', '、', 'いい', 'かな', '。'] },
      { id: 'Kalau sudah lewat jam sepuluh, saya ingin suara televisinya dikecilkan.', en: 'Once it\'s past ten, I\'d like the television turned down.', t: ['十時', 'を', '過ぎたら', '、', 'テレビ', 'の', '音', 'を', '小さく', 'して', 'ほしい', 'の', '。'] },
      { id: 'Karena dindingnya tipis, suaranya terdengar jelas sampai kamar sebelah.', en: 'The walls are thin, so it comes through clearly to the next room.', t: ['壁', 'が', '薄い', 'から', '、', '隣', 'の', '部屋', 'まで', 'はっきり', '聞こえる', 'の', 'です', '。'] },
      { id: 'Saya sudah mau tidur, jadi akan membantu kalau sedikit dikecilkan.', en: 'I\'m going to bed, so it would help if you could turn it down a little.', t: ['私', 'は', 'もう', '寝る', 'ので', '、', '少し', 'だけ', '小さく', 'して', 'もらえる', 'と', '助かる', '。'] },
      { id: 'Kalau memang ingin menonton, pakai headphone saja tidak apa-apa.', en: 'If you really want to watch, using headphones would be fine.', t: ['どうしても', '聞き', 'たい', 'とき', 'は', '、', 'ヘッドホン', 'を', '使って', 'くれれ', 'ば', '大丈夫', 'だ', 'よ', '。'] },
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
      { id: ['Bukan berarti rumah yang luas itu menenangkan.', 'Ada juga rumah sempit yang tenang.'], en: ['It\'s not that a big house is calming.', 'There are small houses that are quiet too.'], t: ['家', 'が', '広い', 'から', '落ち着く', 'わけ', 'で', 'は', 'あり', 'ません', '。', '狭く', 'て', 'も', '静か', 'な', '家', 'は', 'あります', '。'] },
      { id: ['Yang paling berpengaruh adalah jangan menambah barang.', 'Kalau yang terlihat berkurang, itu saja sudah berbeda.'], en: ['What works best is not adding things.', 'If what\'s on show goes down, that alone makes a difference.'], t: ['一番', '効く', 'の', 'は', '、', '物', 'を', '増やさ', 'ない', 'こと', 'です', '。', '目', 'に', '入る', '物', 'が', '減る', 'と', '、', 'それ', 'だけ', 'で', '違います', '。'] },
      { id: ['Selanjutnya, jaga satu tempat supaya selalu rapi.', 'Kalau satu tempat bersih, seluruhnya terlihat tertata.'], en: ['Next, keep just one place always tidy.', 'If one spot is clean, the whole thing looks ordered.'], t: ['次', 'に', '、', '一', 'か所', 'だけ', 'は', '必ず', '片付けて', 'おく', 'こと', 'です', '。', 'どこ', 'か', '一', 'つ', 'きれい', 'だ', 'と', '、', '全体', 'が', '整って', '見え', 'ます', '。'] },
      { id: ['Suara pun penting.', 'Cukup dengan tidak membiarkan televisi menyala, suasana ruangan berubah.'], en: ['Sound matters too.', 'Just by not leaving the television on, the feel of the room changes.'], t: ['音', 'も', '大事', 'です', '。', 'テレビ', 'を', 'つけ', 'っ放し', 'に', 'しない', 'だけ', 'で', '、', '部屋', 'の', '感じ', 'が', '変わり', 'ます', '。'] },
      { id: 'Tanpa perlu mengeluarkan uang, ketiga hal ini sudah cukup mengubah banyak.', en: 'Without spending any money, these three things change things quite a lot.', t: ['お金', 'を', 'かけ', 'なくて', 'も', '、', 'この', '三つ', 'で', 'かなり', '変わります', '。'] },
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
      { id: 'Hari ini, dari pagi sampai sore rapat terus, dan sejujurnya cukup panjang.', en: 'Today was meetings from morning through to the afternoon, and honestly it was long.', t: ['今日', 'は', '、', '午前', 'から', '午後', 'まで', '会議', 'が', '続いて', '、', '正直', 'かなり', '長かった', '。'] },
      { id: 'Hanya saja, satu hal yang dari tadi macet sudah selesai, jadi di situ terasa lega.', en: 'Still, one thing that had been stuck the whole time got sorted, so that part felt clean.', t: ['ただ', '、', 'ずっと', '止まって', 'いた', '件', 'が', '一つ', '片付いた', 'ので', '、', 'そこ', 'は', 'すっきり', 'した', '。'] },
      { id: 'Siang saya hanya punya waktu makan lima menit, dan hanya roti.', en: 'At lunch I had only five minutes to eat, and it was just bread.', t: ['昼', 'は', '食べる', '時間', 'が', '五分', 'しか', 'なくて', '、', 'パン', 'だけ', 'だった', '。'] },
      { id: 'Sekarang kepala saya lelah, jadi ingin menonton sesuatu yang tidak perlu dipikir.', en: 'My head is tired now, so I want to watch something I don\'t have to think about.', t: ['今', 'は', '頭', 'が', '疲れて', 'いる', 'から', '、', '何', 'も', '考え', 'ない', '物', 'を', '見', 'たい', '。'] },
      { id: 'Besok seharusnya lebih tenang dari hari ini, jadi malam ini saya mau tidur cepat.', en: 'Tomorrow should be calmer than today, so I intend to sleep early tonight.', t: ['明日', 'は', '今日', 'より', 'は', '落ち着く', 'はず', 'だから', '、', '今夜', 'は', '早く', '寝る', 'つもり', '。'] },
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
      { id: 'Sabtu Minggu minggu ini mari kita putuskan tidak pergi ke mana-mana.', en: 'Let\'s decide not to go anywhere this Saturday and Sunday.', t: ['今週', 'の', '土日', 'は', '、', 'どこ', 'にも', '行か', 'ない', 'こと', 'に', 'しよう', '。'] },
      { id: 'Kalau sehari sebelumnya berbelanja untuk dua hari, kita tidak perlu keluar.', en: 'If we shop for two days\' worth the day before, we won\'t have to go out.', t: ['前', 'の', '日', 'に', '、', '二日', '分', 'の', '食べ物', 'を', '買って', 'おけ', 'ば', '、', '外', 'に', '出', 'なくて', '済む', '。'] },
      { id: 'Sabtu, tentukan dulu apa yang mau ditonton, lalu bersantai sepanjang hari.', en: 'Saturday, let\'s decide in advance what to watch and take the whole day easy.', t: ['土曜', 'は', '、', '見', 'たい', '物', 'を', '決めて', 'おいて', '、', '一日', 'ゆっくり', 'する', '。'] },
      { id: ['Minggu, jangan isi dengan rencana.', 'Kalau tiba-tiba ingin keluar, tidak apa-apa.'], en: ['Sunday, let\'s not put anything in the diary.', 'If we suddenly feel like going out, that\'s fine.'], t: ['日曜', 'は', '、', '予定', 'を', '入れ', 'ない', 'で', 'おく', '。', '急', 'に', '出かけたく', 'なった', 'ら', '、', 'それ', 'で', 'いい', '。'] },
      { id: 'Untuk kabar-kabar, hanya kalau perlu, dan kalau bisa saya ingin melewatinya dengan tenang.', en: 'For messages, only when necessary, and if possible I\'d like to spend it quietly.', t: ['連絡', 'は', '、', '必要', 'な', 'とき', 'だけ', 'に', 'して', '、', 'できれ', 'ば', '静か', 'に', '過ごす', 'つもり', '。'] },
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
      { id: 'Kalau bekerja di rumah, sebaiknya tentukan satu tempat saja.', en: 'If you work at home, you\'d better decide on one place.', t: ['家', 'で', '仕事', 'を', 'する', 'なら', '、', '場所', 'を', '一つ', 'に', '決めた', '方', 'が', 'いい', 'よ', '。'] },
      { id: 'Sofa atau meja tidak masalah, tetapi putuskan hanya di situ.', en: 'The sofa or the desk, either is fine, but decide that you\'ll only do it there.', t: ['ソファ', 'で', 'も', '机', 'で', 'も', 'いい', 'けど', '、', 'そこで', 'だけ', 'やる', 'と', '決める', 'ん', 'だ', '。'] },
      { id: 'Kalau tidak begitu, di mana pun berada pekerjaan tetap ada di kepala, dan tidak terasa beristirahat.', en: 'Otherwise, wherever you are in the house the work stays in your head and it doesn\'t feel like a rest.', t: ['そう', 'し', 'ない', 'と', '、', '部屋', 'の', 'どこ', 'に', 'いて', 'も', '仕事', 'が', '頭', 'に', '残って', '、', '休んだ', '気', 'が', 'し', 'ない', '。'] },
      { id: 'Setelah selesai, rapikan tempat itu supaya tidak terlihat, dan itu berpengaruh.', en: 'When you\'re finished, tidy that spot so it\'s out of sight, and it makes a difference.', t: ['終わった', 'ら', '、', 'その', '場所', 'を', '片付けて', '、', '見え', 'ない', 'ように', 'する', 'と', '効果', 'が', 'ある', '。'] },
      { id: 'Walau rumahnya sempit, hanya dengan ini suasana malamnya berubah.', en: 'Even in a small home, this alone changes how the evening feels.', t: ['狭い', '家', 'でも', '、', 'これ', 'だけ', 'で', '夜', 'の', '感じ', 'が', '変わります', '。'] },
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
      { id: 'Maaf, aku ingin sendiri tiga puluh menit saja.', en: 'Sorry, but I\'d like just thirty minutes to myself.', t: ['悪い', 'けど', '、', '三十分', 'だけ', '一人', 'に', 'して', 'ほしい', 'の', '。'] },
      { id: ['Aku tidak sedang marah.', 'Cuma terlalu banyak suara, jadi kepalaku tidak bisa mengikuti.'], en: ['I\'m not angry.', 'There\'s just too much noise and my head can\'t keep up.'], t: ['怒って', 'いる', 'わけ', 'じゃ', 'ない', 'の', '。', '音', 'が', '多すぎて', '、', '頭', 'が', '追い', 'つか', 'ない', 'だけ', '。'] },
      { id: 'Selama itu, akan sangat membantu kalau tidak diajak bicara.', en: 'During that time, it would help if you didn\'t talk to me.', t: ['その', '間', 'は', '、', '話しかけ', 'ない', 'で', 'くれる', 'と', '助かる', '。'] },
      { id: 'Setelah selesai, aku sendiri yang akan datang bicara, jadi jangan khawatir.', en: 'When I\'m done, I\'ll come and talk to you myself, so don\'t worry.', t: ['終わった', 'ら', '、', '自分', 'から', '話し', 'に', '行く', 'から', '、', '心配', 'し', 'ない', 'で', '。'] },
      { id: 'Kalau ternyata masih kurang, mungkin aku minta lagi, tetapi pasti aku bilang.', en: 'If that still isn\'t enough, I might ask for a bit more, but I\'ll always say so.', t: ['もし', 'それ', 'でも', '足り', 'なければ', '、', 'もう', '少し', 'もらう', 'かも', 'しれ', 'ない', 'けど', '、', '必ず', '言う', 'ね', '。'] },
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
      { id: 'Tahun lalu saya pindah ke kamar yang jauh lebih sempit dari sebelumnya.', en: 'Last year I moved into a place much smaller than before.', t: ['去年', '、', '今', 'まで', 'より', 'ずっと', '狭い', '部屋', 'に', '引っ越し', 'ました', '。'] },
      { id: 'Karena tahu barangnya tidak akan masuk, sebelum pindah saya buang separuh barang saya.', en: 'I knew it wouldn\'t all fit, so before moving I threw away half my things.', t: ['入り', 'きら', 'ない', 'の', 'が', '分かって', 'いた', 'ので', '、', '引っ越す', '前', 'に', '物', 'を', '半分', '捨て', 'ました', '。'] },
      { id: 'Waktu membuangnya memang sayang, tetapi setelah ditaruh di kamar baru, entah kenapa semuanya terasa tidak perlu.', en: 'It felt wasteful at the time, but once I put things in the new room, somehow they all seemed unnecessary.', t: ['捨てる', 'とき', 'は', '惜しかった', 'けど', '、', '新しい', '部屋', 'に', '置いた', 'ら', '、', 'なぜ', 'か', '必要', 'に', '思え', 'ました', '。'] },
      { id: 'Walau jadi lebih sempit, kamarnya terasa lebih luas.', en: 'Even though it got smaller, the room feels bigger.', t: ['狭く', 'なった', 'の', 'に', '、', '部屋', 'が', '広く', '感じられ', 'ます', '。'] },
      { id: 'Saya jadi tahu bahwa dengan barang yang sedikit, waktu mencari dan waktu merapikan sama-sama berkurang.', en: 'I learned that with fewer things, both the time spent looking for them and the time spent tidying go down.', t: ['物', 'が', '少ない', 'と', '、', '探す', '時間', 'も', '片付ける', '時間', 'も', '減ると', '知り', 'ました', '。'] },
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
      { id: ['Ada kabar untuk semua.', 'Besok siang listrik akan mati.'], en: ['A notice for everyone.', 'The electricity will be off tomorrow afternoon.'], t: ['皆', 'に', '知らせ', 'が', 'ある', '。', '明日', 'の', '午後', '、', '電気', 'が', '止まる', '。'] },
      { id: 'Matinyya dari jam satu sampai jam tiga, dua jam.', en: 'It will be off from one until three, two hours.', t: ['止まる', 'の', 'は', '、', '一時', 'から', '三時', 'まで', 'の', '二時間', 'だ', '。'] },
      { id: 'Sehari sebelumnya, makan dulu yang di kulkas dan mudah rusak.', en: 'The day before, eat the things in the fridge that spoil easily first.', t: ['前', 'の', '日', 'に', '、', '冷蔵庫', 'の', '物', 'で', '傷み', 'やすい', 'の', 'は', '先', 'に', '食べて', 'おいて', '。'] },
      { id: 'Peralatan listrik yang tidak dipakai, cabut dari colokannya sejak pagi.', en: 'Unplug any appliances you won\'t be using from the socket during the morning.', t: ['使わ', 'ない', '電化製品', 'は', '、', '朝', 'の', 'うち', 'に', 'コンセント', 'から', '抜いて', 'おく', 'こと', '。'] },
      { id: 'Selama itu akan gelap, jadi mari kita makan malam sedikit lebih awal.', en: 'It\'ll be dark during that time, so let\'s have dinner a little earlier.', t: ['その', '間', 'は', '暗く', 'なる', 'から', '、', '夕飯', 'は', '少し', '早め', 'に', 'しよう', '。'] },
    ]
  },
  {
    key: 'rumah_santai_percakapan_menyiapkan_tidur', topic: 'rumah_santai', jenis: 'percakapan',
    judulT: ['もう', '寝る', '時間', 'だ', 'よ'],
    judul: 'Sudah waktunya tidur', judulEn: 'It is time for bed',
    speakers: {'A':'ibu','B':'anak_kecil'},
    sit: 'Ibu menyiapkan anaknya yang masih kecil untuk tidur, dan anak itu masih ingin bermain', sitEn: 'A mother getting her small child ready for bed, and the child still wanting to play',
    id: 'Saya menutup hari dengan urutan yang selalu sama, dan menukar satu buku dengan lampu yang dimatikan.',
    en: 'I close the day in the same order every time, and trade one book for the light going off.',
    note: 'Yang membuat anak mau tidur bukan perintahnya, melainkan janji yang jelas: satu buku, lalu lampu mati.',
    noteEn: 'What gets a child to bed is not the order but a clear promise: one book, then the light goes off.',
    blocks: [
      { sp: 'A', id: ['Sudah waktunya tidur.', 'Sudah mandi?', 'Giginya sudah digosok?'], en: ['It is time for bed.', 'Have you had your bath?', 'Have you brushed your teeth?'], t: ['もう', '寝る', '時間', 'だ', 'よ', '。', 'お風呂', 'に', '入った', '？', '歯', 'は', '磨いた', '？'] },
      { sp: 'B', id: ['Aku belum ngantuk.', 'Aku masih mau main sedikit lagi.'], en: ['I am not sleepy yet.', 'I want to play a little more.'], t: ['まだ', '眠く', 'ない', '。', 'もう', '少し', '遊び', 'たい', '。'] },
      { sp: 'A', id: ['Begitu ya.', 'Kalau begitu, kita baca satu buku saja.'], en: ['Is that so.', 'Then let us read just one book.'], t: ['そう', 'か', '。', 'じゃあ', '、', '絵本', 'を', '一冊', 'だけ', '読もう', '。'] },
      { sp: 'B', id: 'Dua buku.', en: 'Two books.', t: ['二冊', '。'] },
      { sp: 'A', id: ['Satu saja.', 'Setelah dibaca, lampunya dimatikan ya.'], en: ['Just one.', 'Once we have read it, the light goes off.'], t: ['一冊', 'だけ', '。', '読んだら', '、', '電気', 'を', '消す', 'よ', '。'] },
      { sp: 'B', id: 'Ya sudah.', en: 'All right.', t: ['わかった', '。'] },
      { sp: 'A', id: ['Tutup matanya.', 'Adikmu di sebelah sudah tidur, lho.'], en: ['Close your eyes.', 'Your little sister next to you is already asleep.'], t: ['目', 'を', '閉じて', '。', '隣', 'で', '妹', 'が', 'もう', '寝てる', 'よ', '。'] },
      { sp: 'B', id: 'Selamat malam.', en: 'Good night.', t: ['おやすみ', '。'] },
    ]
  },
]);
