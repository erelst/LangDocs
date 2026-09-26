/* Sopan: agreement, reaction and the small courtesies that keep a conversation going.
 *
 * It cuts across every other topic, because agreeing, being surprised, asking for a repeat and
 * getting off the phone happen inside all of them. What the conversation is about stays in
 * its own topic; this file is the machinery.
 *
 * The register is not a variant of this topic, it is the subject. So the same state is written
 * twice wherever the two versions are genuinely different words rather than one ending
 * swapped: そうですね against そうだね, and とんでもないです against とんでもない.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menyetujui dan menyetujui dengan ragu
 * - terkejut, tidak percaya, dan menanggapinya
 * - meminta diulang karena tidak terdengar atau tidak dimengerti
 * - menyela pembicaraan dengan halus dan mengambil alih giliran bicara
 * - menutup pembicaraan tanpa memutusnya
 * - memuji, dan menanggapi pujian tanpa terdengar sombong
 * - meminta maaf untuk hal kecil, dan menanggapi permintaan maaf
 * - menyampaikan bahwa tidak nyaman, tanpa menyalahkan
 * - mengucapkan terima kasih, dan menanggapinya
 * - meminta waktu untuk berpikir sebelum menjawab
 * Tidak termasuk:
 * - sapaan berdasarkan waktu hari, masuk ke `waktu_cuaca`
 * - isi percakapan yang sedang berlangsung, yang tetap mengikuti topik asalnya
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'sopan_percakapan_tidak_paham', topic: 'sopan', jenis: 'percakapan',
    judulT: ['途中', 'から', '分かりません', 'でした'],
    judul: 'Mengaku belum paham dan meminta diulang', judulEn: 'Admitting I did not follow and asking again',
    speakers: {'A':'rekan','B':'atasan'},
    sit: 'Percakapan di mana yang mendengar mengaku belum paham', sitEn: 'A conversation where the listener admits they did not follow',
    id: 'Saya mengaku belum paham bagian tengahnya, meminta diulang sekali lagi, dan menawarkan mengulangi dengan kata saya sendiri.',
    en: 'I admit I lost the middle part, ask for it once more, and offer to repeat it in my own words.',
    note: 'Mengaku belum paham berguna karena yang menjelaskan tidak tahu bagian mana yang gagal, dan menebak sendiri lebih berbahaya.',
    noteEn: 'Admitting it helps because the speaker does not know which part failed, and guessing is more dangerous.',
    blocks: [
      { sp: 'B', id: 'Maaf, sampai di tengah saya paham, tetapi setelah itu saya tidak bisa mengikuti.', en: 'Excuse me, I followed you up to a point, but after that I couldn\'t keep up.', t: ['すみません', '、', '途中', 'まで', 'は', '分かった', 'の', 'です', 'が', '、', 'そこ', 'から', '先', 'が', '追え', 'ません', 'でした', '。'] },
      { sp: 'A', id: ['Bagian yang mana?', 'Saya ulangi lagi.'], en: ['Which part?', 'I\'ll say it again.'], t: ['どの', 'あたり', 'です', 'か', '。', 'もう', '一度', '言い', 'ます', 'よ', '。'] },
      { sp: 'B', id: ['Di bagian langkah yang ketiga.', 'Hanya bagian itu, bisa diulang sekali lagi?'], en: ['The third step.', 'Could you go over just that part once more?'], t: ['三つ目', 'の', '手順', 'の', 'ところ', 'です', '。', 'そこ', 'だけ', 'もう', '一度', 'お願い', 'できます', 'か', '。'] },
      { sp: 'A', id: ['Tentu.', 'Saya ucapkan sambil menyebutkan nomornya, ya.'], en: ['Of course.', 'I\'ll say it while numbering the steps.'], t: ['もちろん', 'です', '。', '番号', 'を', '振り', 'ながら', '言い', 'ます', 'ね', '。'] },
      { sp: 'B', id: ['Terima kasih.', 'Kali ini saya coba ulangi dengan kata-kata saya sendiri.'], en: ['Thank you.', 'This time I\'ll try repeating it back in my own words.'], t: ['ありがとう', 'ございます', '。', '今度', 'は', '、', '自分', 'の', '言葉', 'で', '繰り返して', 'みます', '。'] },
      { sp: 'A', id: 'Kalau begitu, dari sisi saya pun kesalahannya bisa terlihat.', en: 'If you do that, I\'ll notice my own mistakes as well.', t: ['そう', 'して', 'もらえる', 'と', '、', 'こちら', 'も', '間違い', 'に', '気が付き', 'ます', '。'] },
      { sp: 'B', id: ['Kalau begitu, saya coba ucapkan sekali.', 'Kalau ada yang keliru, tolong hentikan.'], en: ['Then let me try saying it once.', 'Please stop me if I get it wrong.'], t: ['では', '、', '一度', '言って', 'みます', '。', '違って', 'いたら', '止めて', 'ください', '。'] },
    ]
  },
  {
    key: 'sopan_cerita_menahan_diri_tidak_menyela', topic: 'sopan', jenis: 'cerita',
    judulT: ['口', 'を', '出', 'さずに', '待った', '話'],
    judul: 'Menahan diri untuk tidak menyela', judulEn: 'Holding back from cutting in',
    rel: 'rekan',
    sit: 'Menceritakan saat menahan diri tidak menyela pembicaraan', sitEn: 'Recounting a time of holding back from interrupting',
    id: 'Saya hampir menyela tiga kali, menunggu sampai lawan bicara selesai, dan ternyata jawabannya sudah ada di bagian akhir.',
    en: 'I nearly cut in three times, waited until they finished, and the answer was already in the last part.',
    note: 'Cerita seperti ini punya tiga bagian: dorongan untuk menyela, yang ditahan, dan hasilnya.',
    noteEn: 'A story like this has three parts: the urge to interrupt, what was held back, and the outcome.',
    blocks: [
      { id: 'Beberapa waktu lalu, selama mendengarkan penjelasan, saya hampir menyela sekitar tiga kali.', en: 'The other day, while listening to an explanation, I nearly cut in about three times.', t: ['先日', '、', '説明', 'を', '聞いて', 'いる', '間', 'に', '、', '三', '回', 'ほど', '口', 'を', '出し', 'そう', 'に', 'なりました', '。'] },
      { id: 'Semuanya karena saya merasa, kalau didengar sampai tengah, isinya sudah bisa saya mengerti.', en: 'Each time it was because I felt I could understand the point halfway through.', t: ['どれ', 'も', '、', '途中', 'まで', '聞け', 'ば', '分かる', 'こと', 'だ', 'と', '思った', 'から', 'です', '。'] },
      { id: 'Hanya saja, karena saya tahu kalau dihentikan di tengah urutan pembicaraannya jadi rusak, saya menahan diri.', en: 'But I knew that stopping them midway would break the order of what they were saying, so I held back.', t: ['ただ', '、', '途中', 'で', '止める', 'と', '、', '話', 'の', '順番', 'が', '崩れる', 'の', 'が', '分かって', 'いた', 'ので', '、', '我慢', 'しました', '。'] },
      { id: 'Setelah didengarkan sampai akhir, hal yang ingin saya katakan ternyata sudah termasuk dalam penjelasannya.', en: 'When I\'d heard it through, what I\'d wanted to say was already included in the explanation.', t: ['最後', 'まで', '聞い', 'たら', '、', '私', 'が', '言い', 'たかった', 'こと', 'は', '、', 'すでに', '説明', 'に', '入って', 'いました', '。'] },
      { id: 'Berkat itu, saya tidak perlu mengajukan pertanyaan yang tidak perlu.', en: 'Thanks to that, I got through it without asking unnecessary questions.', t: ['おかげ', 'で', '、', '余計', 'な', '質問', 'を', 'せ', 'ず', 'に', '済み', 'ました', '。'] },
    ]
  },
  {
    key: 'sopan_kronologi_menolak_dengan_halus', topic: 'sopan', jenis: 'kronologi',
    judulT: ['断り方', 'の', '順番'],
    judul: 'Urutan menolak tanpa menyinggung', judulEn: 'The order of refusing without offence',
    rel: 'atasan',
    sit: 'Menceritakan urutan cara menolak permintaan, dari menerima keinginannya sampai memberi alternatif', sitEn: 'Recounting the order of refusing, from accepting the wish to offering an alternative',
    id: 'Saya mengakui keperluannya dulu, menyebut alasan yang bisa diperiksa, lalu menawarkan dua jalan lain.',
    en: 'I acknowledge the need first, give a checkable reason, then offer two other ways.',
    note: 'Urutannya inilah yang menentukan: alasan yang disebut sebelum mengakui keperluan terbaca sebagai penolakan.',
    noteEn: 'The order is what decides it: a reason given before acknowledging the need reads as a refusal.',
    blocks: [
      { id: 'Pertama, saya pastikan dulu kenapa permintaan itu muncul.', en: 'First I checked why that request had come up.', t: ['まず', '、', 'なぜ', 'その', 'お願い', 'が', '出た', 'の', 'か', 'を', '確かめ', 'ました', '。'] },
      { id: 'Karena keadaannya sudah saya pahami, saya tanggapi sekali dengan mengatakan bahwa itu memang perlu.', en: 'Once I understood the situation, I acknowledged it once by saying that it was indeed needed.', t: ['事情', 'が', '分かった', 'ので', '、', '「', 'それは', '必要', 'です', 'ね', '」', 'と', '一度', '受け止め', 'ました', '。'] },
      { id: 'Setelah itu, saya sampaikan secara konkret jam-jam saya yang tidak luang.', en: 'On that basis, I explained concretely which hours I didn\'t have free.', t: ['その', 'うえ', 'で', '、', '私', 'の', '手', 'が', '空いて', 'い', 'ない', '時間', 'を', '具体的', 'に', '伝え', 'ました', '。'] },
      { id: 'Karena saya ingin menghindari menolak lalu selesai begitu saja, saya ajukan dua alternatif.', en: 'I wanted to avoid simply refusing and leaving it there, so I offered two alternatives.', t: ['断って', '終わり', 'に', 'する', 'の', 'は', '避け', 'たかった', 'ので', '、', '二つ', 'の', '代案', 'を', '出し', 'ました', '。'] },
      { id: 'Akhirnya, salah satunya yang dijalankan, dan hubungan kami tetap tidak berubah.', en: 'In the end we went ahead with one of them, and the relationship stayed unchanged.', t: ['結局', '、', '片方', 'で', '進む', 'こと', 'に', 'なり', '、', '関係', 'は', '変わらず', 'に', '済み', 'ました', '。'] },
    ]
  },
  {
    key: 'sopan_curhatan_sulit_mengatakan_tidak', topic: 'sopan', jenis: 'curhatan',
    judulT: ['「', '大丈夫です」', 'と', '言って', 'しまう'],
    judul: 'Sulit sekali mengatakan tidak', judulEn: 'How hard it is to say no',
    rel: 'teman_dekat',
    sit: 'Mengeluh soal sulitnya menolak, tanpa minta saran', sitEn: 'Venting about how hard it is to refuse, without asking for advice',
    id: 'Setiap kali diminta, mulut saya menjawab baik sebelum kepalanya memutuskan, dan akhirnya pekerjaan menumpuk.',
    en: 'Every time I am asked, my mouth says yes before my head decides, and the work piles up.',
    note: 'Keluhan seperti ini diarahkan ke kebiasaan sendiri, bukan ke orang yang meminta, dan tidak mencari cara.',
    noteEn: 'A complaint like this aims at one\'s own habit, not at the asker, and does not look for a method.',
    blocks: [
      { id: 'Kalau dimintai tolong, sebelum berpikir saya sudah mengatakan tidak apa-apa.', en: 'When I\'m asked for something, I say it\'s fine before I\'ve even thought about it.', t: ['頼まれる', 'と', '、', '考える', '前', 'に', '「', '大丈夫', 'です', '」', 'と', '言って', 'しまう', 'ん', 'だ', 'よ', '。'] },
      { id: 'Setelah itu, waktu saya melihat jadwal, saya selalu kaget.', en: 'Afterwards, when I look at my diary, I get a shock every time.', t: ['あと', 'で', '予定', 'を', '見て', '、', 'あっ', 'と', 'なる', 'こと', 'が', '毎回', 'ある', '。'] },
      { id: 'Bukannya karena tidak suka, justru karena itu saya semakin tidak bisa menolak, tetapi sebanyak yang saya terima, sebanyak itu pula saya sendiri yang berat.', en: 'It\'s not that I dislike it, which is exactly why I can\'t refuse, but the more I take on, the harder it is on me.', t: ['嫌', 'な', 'わけ', 'じゃ', 'ない', 'から', '余計', 'に', '断れ', 'ない', 'ん', 'だけど', '、', '引き受けた', '分', 'だけ', '自分', 'が', '苦しく', 'なる', '。'] },
      { id: 'Yang lalu pun, saya menerima tiga sekaligus, dan akhir pekan saya habis semua.', en: 'Last time too, I took on three at once and the whole weekend disappeared.', t: ['この', '前', 'も', '、', '三つ', '同時', 'に', '受けて', '、', '週末', 'が', '全部', '潰れた', '。'] },
      { id: 'Bukannya ingin tahu cara menolak yang halus, saya hanya ingin didengarkan kenapa saya tidak bisa mengatakannya.', en: 'It\'s not that I want to be taught a neat way to refuse, I just want someone to hear why I can\'t say it.', t: ['うまい', '断り方', 'を', '教えて', 'ほしい', 'わけ', 'じゃ', 'なくて', '、', 'なぜ', '言え', 'ない', 'の', 'か', 'を', '聞いて', 'ほしい', 'だけ', '。'] },
    ]
  },
  {
    key: 'sopan_keluhan_ditolak_tegas', topic: 'sopan', jenis: 'keluhan',
    judulT: ['断り方', 'で', '傷つ', 'いた', '話'],
    judul: 'Ditolak dengan cara yang menyakitkan', judulEn: 'Refused in a way that stung',
    rel: 'rekan',
    sit: 'Menyampaikan bahwa penolakan yang diterima terasa kasar', sitEn: 'Saying that the refusal received felt harsh',
    id: 'Saya menyampaikan bahwa penolakannya tidak masalah, tetapi caranya membuat saya enggan bertanya lagi.',
    en: 'I say the refusal itself is fine, but the way it was given makes me reluctant to ask again.',
    note: 'Keluhan seperti ini memisahkan isi dari caranya, dan itu yang membuatnya bisa didengar tanpa membuat orang bertahan.',
    noteEn: 'A complaint like this separates the content from the delivery, which is what lets it be heard without defensiveness.',
    blocks: [
      { id: 'Soal kemarin, ada satu hal yang ingin saya sampaikan.', en: 'About yesterday, there\'s one thing I\'d like to say.', t: ['昨日', 'の', 'こと', 'で', '、', '一つ', 'だけ', '伝えて', 'おき', 'たい', 'こと', 'が', 'あります', '。'] },
      { id: ['Ditolaknya sendiri saya rasa tidak bisa dihindari.', 'Alasannya pun saya paham.'], en: ['The refusal itself I accept as unavoidable.', 'I understood the reason too.'], t: ['断られた', 'こと', '自体', 'は', '、', '仕方', 'ない', 'と', '思って', 'います', '。', '理由', 'も', '分かり', 'ました', '。'] },
      { id: 'Hanya saja, waktu dikatakan bahwa itu tidak mungkin, saya merasa lebih baik tidak bertanya.', en: 'It\'s just that when you said that\'s impossible, I wished I hadn\'t asked.', t: ['ただ', '、', '「', 'そんな', 'の', '無理', 'です', '」', 'と', '言われ', 'た', 'とき', '、', '聞かなければ', 'よかった', 'と', '思いました', '。'] },
      { id: 'Sejujurnya berat rasanya, karena mulai sekarang jadi sulit menanyakan hal yang sama.', en: 'Honestly it\'s hard, because from now on it\'ll be harder to ask about the same thing.', t: ['次', 'から', '、', '同じ', 'こと', 'で', '聞き', 'にくく', 'なる', 'の', 'が', '正直', 'つらい', 'です', '。'] },
      { id: 'Kalau memang harus menolak, akan lebih bisa saya terima kalau alasannya disampaikan lebih dulu.', en: 'If you have to refuse, I could accept it more easily if you gave the reason first.', t: ['同じ', '断る', 'なら', '、', '理由', 'を', '先', 'に', '言って', 'いただける', 'と', '、', 'こちら', 'も', '納得', 'できます', '。'] },
    ]
  },
  {
    key: 'sopan_penjelasan_menerima_pujian', topic: 'sopan', jenis: 'penjelasan',
    judulT: ['褒め', 'られた', 'とき', 'の', '答え方'],
    judul: 'Cara menerima pujian tanpa terdengar sombong', judulEn: 'How to take a compliment without sounding smug',
    rel: 'rekan',
    sit: 'Menerangkan cara menanggapi pujian di tempat kerja', sitEn: 'Explaining how to respond to praise at work',
    id: 'Saya menerangkan bahwa pujian diterima dengan mengakui bantuan orang lain, bukan dengan menyangkal atau membenarkan berlebihan.',
    en: 'I explain that praise is taken by acknowledging others\' help, not by denying it or agreeing too strongly.',
    note: 'Penjelasan yang berguna menyebut kedua kesalahan yang lazim sekaligus, karena menolak pujian juga bisa membuat orang lain sungkan.',
    noteEn: 'A useful explanation names both common mistakes at once, because brushing praise off also leaves the other person awkward.',
    blocks: [
      { id: 'Waktu dipuji, orang cenderung jatuh ke salah satu dari dua hal.', en: 'When you\'re praised, people tend to fall into one of two things.', t: ['褒め', 'られた', 'とき', 'は、', '二つ', 'の', '間', 'の', 'どちら', 'か', 'に', 'なり', 'がち', 'です', '。'] },
      { id: 'Yang satu menyangkal semuanya dengan mengatakan ah tidak begitu, yang lain menerimanya dengan mengatakan benar.', en: 'One is denying it entirely by saying it\'s nothing, the other is accepting it by saying that\'s right.', t: ['一つ', 'は', '「', 'そんな', 'こと', 'あり', 'ません', '」', 'と', '全部', '打ち消す', 'こと', 'で、', 'もう', '一つ', 'は', '「', 'そう', 'です', '」', 'と', '受ける', 'こと', 'です', '。'] },
      { id: ['Dua-duanya jadi canggung.', 'Karena kalau menyangkal, sampai kata-kata lawan bicaranya pun kita kembalikan.'], en: ['Either way it gets awkward.', 'Because denying it sends the other person words back.'], t: ['どちら', 'も', 'ぎこちなく', 'なります', '。', '打ち消す', 'と', '相手', 'の', '言葉', 'まで', '返して', 'しまう', 'から', 'です', '。'] },
      { id: ['Yang paling pantas adalah mengucapkan terima kasih.', 'Lalu menambahkan bahwa itu berkat bantuan orang lain.'], en: ['What sits best is to say thank you.', 'And then to add that it was thanks to someone else\'s help.'], t: ['一番', '収まり', 'が', 'いい', 'の', 'は、', '「', 'ありがとう', 'ございます', '。', '手伝って', 'もらった', 'おかげ', 'です', '」', 'と', '言う', 'こと', 'です', '。'] },
      { id: 'Dengan begitu, tidak menjadi merendah maupun menyombong, dan yang tinggal hanya faktanya.', en: 'That way it\'s neither self-deprecating nor boastful, and only the fact remains.', t: ['これ', 'なら', '、', '謙遜', 'に', 'も', '自慢', 'に', 'も', 'なら', 'ず', 'に', '、', '事実', 'だけ', 'が', '残り', 'ます', '。'] },
    ]
  },
  {
    key: 'sopan_laporan_menyampaikan_ketidaknyamanan', topic: 'sopan', jenis: 'laporan',
    judulT: ['少しだけ', '共有', 'して', 'おきたい', 'こと'],
    judul: 'Melaporkan ketidaknyamanan tanpa menyalahkan', judulEn: 'Reporting discomfort without blaming',
    rel: 'rekan',
    sit: 'Melaporkan bahwa sesuatu membuat tidak nyaman, tanpa menuduh siapa pun', sitEn: 'Reporting that something is uncomfortable, without accusing anyone',
    id: 'Saya melaporkan apa yang terjadi, kapan, dan apa yang saya rasakan, tanpa menyebut niat orangnya.',
    en: 'I report what happened, when, and how it felt, without imputing anyone\'s intention.',
    note: 'Laporan seperti ini menyebut fakta dan perasaan secara terpisah, karena mencampurnya membuat orang membela diri.',
    noteEn: 'A report like this keeps facts and feelings separate, because mixing them makes people defend themselves.',
    blocks: [
      { id: 'Ada sedikit hal yang ingin saya samakan.', en: 'There\'s a small thing I\'d like to share.', t: ['少し', 'だけ', '、', '共有', 'して', 'おき', 'たい', 'こと', 'が', 'あります', '。'] },
      { id: 'Dua minggu ini, permintaan mendesak datang menumpuk pada sore hari.', en: 'These past two weeks, urgent requests have been arriving in a cluster in the late afternoon.', t: ['この', '二週間', '、', '急ぎ', 'の', '依頼', 'が', '夕方', 'に', 'まとまって', '来て', 'います', '。'] },
      { id: 'Karena itu, setiap kali saya harus menggeser rencana yang sudah saya tentukan hari itu.', en: 'Because of that, I keep having to shift plans I\'d set for that day.', t: ['その', 'ため', '、', 'その', '日', 'に', '決めて', 'いた', '予定', 'を', '毎回', 'ずらして', 'います', '。'] },
      { id: ['Bukan berarti ada yang salah.', 'Saya rasa ini soal alurnya.'], en: ['It\'s not that anyone is at fault.', 'I see it as a matter of flow.'], t: ['誰', 'か', 'が', '悪い', 'と', 'いう', 'こと', 'で', 'は', 'あり', 'ません', '。', '流れ', 'の', '問題', 'だ', 'と', '思って', 'います', '。'] },
      { id: 'Kalau memungkinkan, akan sangat membantu kalau bisa diketahui sejak pagi.', en: 'If it\'s possible, it would help if I could know about them from the morning.', t: ['もし', '可能', 'なら', '、', '午前', 'に', '分かる', 'よう', 'に', 'して', 'いただける', 'と', '助かり', 'ます', '。'] },
    ]
  },
  {
    key: 'sopan_rencana_menutup_pembicaraan', topic: 'sopan', jenis: 'rencana',
    judulT: ['話', 'を', '切らずに', '終わらせる'],
    judul: 'Rencana menutup pembicaraan tanpa memutusnya', judulEn: 'Planning to close a conversation without cutting it off',
    rel: 'atasan',
    sit: 'Menyusun cara menutup pembicaraan yang panjang tanpa terkesan memutus', sitEn: 'Planning how to close a long conversation without it feeling cut off',
    id: 'Saya merencanakan menutup dengan tiga langkah: meringkas, menyebut satu hal yang akan dilakukan, lalu berterima kasih.',
    en: 'I plan to close in three steps: summarise, name one thing I will do, then thank them.',
    note: 'Rencana menutup berguna karena isinya satu langkah nyata, bukan sekadar kalimat penutup.',
    noteEn: 'A closing plan works because it contains one concrete step, not just a closing phrase.',
    blocks: [
      { id: 'Waktu berbicara panjang, saya putuskan menutupnya dengan tiga urutan, bukan memutus tiba-tiba.', en: 'When a conversation runs long, I\'ve decided to close it in three steps rather than cutting it off.', t: ['長く', '話して', 'いる', 'とき', 'は', '、', 'いきなり', '切らない', 'で', '三つ', 'の', '順', 'に', 'しよう', 'と', '決めて', 'います', '。'] },
      { id: ['Pertama, saya rangkum isi pembicaraannya menjadi dua hal.', 'Lawan bicara merasa didengarkan.'], en: ['First, I sum up the content in two points.', 'The other person feels heard.'], t: ['まず', '、', '話', 'の', '中身', 'を', '二つ', 'に', 'まとめて', '言い', 'ます', '。', '相手', 'は', '聞いて', 'もらえた', 'と', '感じ', 'ます', '。'] },
      { id: 'Selanjutnya, saya sebutkan satu hal saja yang akan saya lakukan berikutnya.', en: 'Next, I state just one thing I\'ll do next.', t: ['次', 'に', '、', '自分', 'が', '次に', 'する', 'こと', 'を', '一つ', 'だけ', '言い', 'ます', '。'] },
      { id: 'Terakhir, saya berterima kasih atas waktunya.', en: 'Finally, I thank them for their time.', t: ['最後', 'に', '、', '時間', 'を', 'くれた', 'こと', 'に', 'お礼', 'を', '言い', 'ます', '。'] },
      { id: 'Dengan ini, walau saya menyampaikan ingin mengakhiri, tidak terdengar seperti memutus.', en: 'With that, even when I say I\'d like to stop, it doesn\'t sound like I\'m cutting them off.', t: ['これ', 'で', '、', '終わり', 'たい', 'と', '伝え', 'て', 'も', '、', '切った', 'よう', 'に', 'は', '聞こえ', 'ません', '。'] },
    ]
  },
  {
    key: 'sopan_nasihat_jangan_terlalu_sering_minta_maaf', topic: 'sopan', jenis: 'nasihat',
    judulT: ['謝り', 'すぎ', 'ない', 'こと'],
    judul: 'Jangan meminta maaf untuk hal yang bukan salahmu', judulEn: 'Do not apologise for what is not your fault',
    rel: 'rekan',
    sit: 'Menasihati rekan yang terlalu sering meminta maaf', sitEn: 'Advising a colleague who apologises too often',
    id: 'Saya menyarankan mengganti permintaan maaf dengan ucapan terima kasih, karena orang yang selalu meminta maaf lama-lama tidak didengar.',
    en: 'I suggest replacing apologies with thanks, because someone who always apologises eventually stops being heard.',
    note: 'Nasihat yang berguna memberikan gantinya, bukan hanya melarang, karena kebiasaan tidak hilang tanpa pengganti.',
    noteEn: 'Useful advice gives a replacement rather than only forbidding, because a habit does not go away without one.',
    blocks: [
      { id: 'Mengatakan maaf untuk hal yang bukan salah kita, sebaiknya sedikit demi sedikit dihentikan.', en: 'Saying sorry for things that aren\'t your fault is worth phasing out little by little.', t: ['悪く', 'ない', 'こと', 'で', '「', 'すみません', '」', 'と', '言う', 'の', 'は', '、', '少し', 'ずつ', 'やめた', '方', 'が', 'いい', 'よ', '。'] },
      { id: 'Kalau setiap kali minta maaf, pada saat benar-benar perlu minta maaf kata itu jadi terdengar ringan.', en: 'If you apologise every time, the word sounds light on the occasions you really should apologise.', t: ['毎回', '謝って', 'いると', '、', '本当', 'に', '謝る', 'べき', 'とき', 'に', '、', 'その', '言葉', 'が', '軽く', '聞こえ', 'て', 'しまう', '。'] },
      { id: 'Kalau soalnya membuat orang menunggu, sering kali cukup dengan berterima kasih.', en: 'When it\'s about making someone wait, a thank you often does the job.', t: ['待たせた', 'とき', 'なら', '、', '「', 'ありがとう', 'ございます', '」', 'で', '済む', 'こと', 'が', '多い', '。'] },
      { id: 'Saya juga dulu begitu, sehari mengatakan lebih dari sepuluh kali, tetapi sekarang kurang dari separuh.', en: 'I used to be like that too, saying it more than ten times a day, but now it\'s less than half.', t: ['私', 'も', '前', 'は', 'そう', 'で、', '一日', 'に', '十', '回', '以上', '言って', 'いた', 'けど', '、', '今', 'は', '半分', '以下', 'です', '。'] },
      { id: 'Hanya dengan mengganti permintaan maaf menjadi ucapan terima kasih, kesannya sudah jauh berbeda.', en: 'Just swapping an apology for a thank you changes the impression quite a lot.', t: ['謝る', '代わり', 'に', 'お礼', 'を', '言う', 'だけ', 'で', '、', '印象', 'は', 'ずいぶん', '変わります', '。'] },
    ]
  },
  {
    key: 'sopan_permintaan_waktu_untuk_berpikir', topic: 'sopan', jenis: 'permintaan',
    judulT: ['明日', 'まで', '考えさせて', 'ください'],
    judul: 'Meminta waktu untuk berpikir sebelum menjawab', judulEn: 'Asking for time to think before answering',
    rel: 'atasan',
    sit: 'Meminta waktu sebelum menjawab keputusan penting', sitEn: 'Asking for time before answering an important decision',
    id: 'Saya meminta waktu sampai besok pagi, menyebut apa yang belum jelas bagi saya, dan memastikan kapan jawabannya diberikan.',
    en: 'I ask for time until tomorrow morning, name what is unclear to me, and confirm when the answer will come.',
    note: 'Permintaan waktu diterima karena batas waktunya disebut dan alasannya masuk akal, bukan karena ingin menunda.',
    noteEn: 'A request for time is granted because the deadline is given and the reason is sound, not because it is a delay.',
    blocks: [
      { id: 'Saya ingin menahan diri untuk menjawab sekarang, apakah boleh?', en: 'I\'d like to hold off on answering right now, would that be all right?', t: ['今', 'すぐ', 'の', 'お返事', 'は', '控え', 'たい', 'の', 'です', 'が', '、', 'よろしい', 'でしょうか', '。'] },
      { id: 'Dari syaratnya, ada dua yang belum bisa saya cerna.', en: 'Of the conditions, there are two I haven\'t quite absorbed yet.', t: ['条件', 'の', 'うち', '、', '二つ', 'が', 'まだ', '飲み込めて', 'い', 'ません', '。'] },
      { id: 'Besok pagi saya akan menjawab setelah saya susun menjadi tiga hal.', en: 'I\'ll reply by tomorrow morning, once I\'ve narrowed it to three points.', t: ['明日', 'の', '朝', 'まで', 'に', '、', '三つ', 'に', '絞って', 'お返事', 'します', '。'] },
      { id: 'Karena kalau langsung mengatakan ya lalu membatalkannya, dua-duanya jadi sulit.', en: 'Because if I say yes straight away and take it back later, it\'s awkward for both of us.', t: ['すぐ', 'に', '「', 'はい', '」', 'と', '言って', '、', 'あと', 'で', '覆す', '方', 'が', 'お互い', 'に', '困る', 'と', '思います', 'ので', '。'] },
      { id: 'Kalau Anda tidak bisa menunggu sampai itu, saya akan menghubungi malam ini.', en: 'If you can\'t wait until then, I\'ll be in touch tonight.', t: ['もし', 'それ', 'まで', 'に', '待て', 'ない', 'よう', 'でしたら', '、', '今夜', 'の', 'うち', 'に', '連絡', 'します', '。'] },
    ]
  },
  {
    key: 'sopan_pengalaman_menyela_lalu_menyesal', topic: 'sopan', jenis: 'pengalaman',
    judulT: ['口', 'を', '挟んで', '後悔', 'した', '話'],
    judul: 'Menyela pembicaraan lalu menyesal', judulEn: 'Cutting in and regretting it',
    rel: 'rekan',
    sit: 'Menceritakan saat menyela pembicaraan dan menyesalinya', sitEn: 'Recounting a time of interrupting and regretting it',
    id: 'Saya menyela karena yakin tahu arahnya, ternyata salah, dan sejak itu menunggu kalimat selesai sebelum bicara.',
    en: 'I cut in because I was sure where it was going, was wrong, and since then wait for the sentence to finish.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: dorongannya, kesalahannya, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the urge, the mistake, and what changed afterwards.',
    blocks: [
      { id: 'Di rapat, padahal rekan saya masih di tengah penjelasan, saya menyela.', en: 'In a meeting, even though my colleague was mid-explanation, I cut in.', t: ['会議', 'で', '、', '同僚', 'が', '説明', 'の', '途中', 'だった', 'の', 'に', '、', '私', 'が', '口', 'を', '挟み', 'ました', '。'] },
      { id: 'Karena dari alurnya saya merasa sudah tahu apa yang akan dia katakan berikutnya.', en: 'Because from the flow I thought I knew what they were about to say.', t: ['話', 'の', '流れ', 'から', '、', '次', 'に', '何', 'を', '言う', 'の', 'か', '分かった', 'つもり', 'だった', 'から', 'です', '。'] },
      { id: 'Akan tetapi, isi lanjutan rekan saya justru kebalikan dari dugaan saya.', en: 'However, what my colleague went on to say was the opposite of what I\'d guessed.', t: ['ところが', '、', '同僚', 'が', '続け', 'た', '内容', 'は', '、', '私', 'が', '想像', 'した', 'の', 'と', '逆', 'でした', '。'] },
      { id: 'Suasana di tempat itu jadi canggung, dan nanti waktu kami berdua saja saya minta maaf.', en: 'It turned awkward on the spot, and later, when it was just the two of us, I apologised.', t: ['その場', 'で', '気まずく', 'なり', '、', 'あと', 'で', '二人', 'きり', 'の', 'とき', 'に', '謝り', 'ました', '。'] },
      { id: 'Sejak itu, saya putuskan menunggu sampai lawan bicara selesai.', en: 'Since then, I\'ve decided to wait until the other person has finished.', t: ['それ', 'から', 'は', '、', '相手', 'の', '話', 'が', '終わる', 'まで', '待つ', 'と', '決めて', 'います', '。'] },
    ]
  },
  {
    key: 'sopan_pengumuman_aturan_bicara', topic: 'sopan', jenis: 'pengumuman',
    judulT: ['会議', 'で', 'の', '三つ', 'の', 'お願い'],
    judul: 'Pengumuman aturan bicara di rapat', judulEn: 'An announcement about how to speak in meetings',
    rel: 'rekan',
    sit: 'Pengumuman ke seluruh tim tentang aturan berbicara di rapat', sitEn: 'Announcing to the whole team the rules for speaking in meetings',
    id: 'Rapat menetapkan satu orang bicara pada satu waktu, pertanyaan disimpan sampai jeda, dan yang belum bicara didahulukan.',
    en: 'The meeting sets one speaker at a time, questions held until the break, and those who have not spoken given priority.',
    note: 'Pengumuman seperti ini menyebut alasannya, karena aturan bicara tanpa alasan terdengar seperti pembatasan.',
    noteEn: 'An announcement like this gives the reason, because speaking rules without one sound like a restriction.',
    blocks: [
      { id: 'Soal cara menjalankan rapat, ada tiga permintaan.', en: 'About how we run the meeting, there are three things I\'d like to ask.', t: ['会議', 'の', '進め方', 'について', '、', '三つ', 'お願い', 'が', 'あります', '。'] },
      { id: ['Pertama, bicaralah satu orang pada satu waktu.', 'Kalau bertumpuk, rapat berjalan tanpa terdengar.'], en: ['First, please let one person speak at a time.', 'When they overlap, we move on without being heard.'], t: ['第一', 'に', '、', '話す', 'の', 'は', '一度', 'に', '一人', 'に', 'して', 'ください', '。', '重なると', '、', '聞こえ', 'ない', 'まま', '進み', 'ます', '。'] },
      { id: ['Kedua, pertanyaannya jangan di tengah, tetapi tunggu sampai jeda.', 'Karena urutan pembicaraannya jadi rusak.'], en: ['Second, rather than asking mid-flow, please wait for a break.', 'Because it breaks the order of the discussion.'], t: ['第二', 'に', '、', '質問', 'は', '途中', 'で', 'せ', 'ず', 'に', '、', '区切り', 'まで', '待って', 'ください', '。', '話', 'の', '順番', 'が', '崩れる', 'から', 'です', '。'] },
      { id: ['Ketiga, yang belum bicara didahulukan.', 'Supaya bukan orang yang sama saja.'], en: ['Third, I\'ll call on those who haven\'t spoken yet first.', 'So that it isn\'t always the same people.'], t: ['第三', 'に', '、', 'まだ', '発言', 'して', 'い', 'ない', '人', 'を', '先', 'に', '当て', 'ます', '。', '同じ', '人', 'だけ', 'に', 'ならない', 'ため', 'です', '。'] },
      { id: 'Dengan tiga hal ini, ada kalanya rapat jadi tiga puluh menit lebih singkat.', en: 'With these three, there have been meetings that finished thirty minutes shorter.', t: ['この', '三つ', 'で', '、', '会議', 'が', '三十分', '短く', 'なった', '回', 'も', 'あります', '。'] },
    ]
  },
]);
