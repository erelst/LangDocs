/* Santai: time off away from home, alone or with other people.
 *
 * Walking with no destination is in the `jalan` topic and relaxing at home is in rumah_santai;
 * this file is going out for something.
 *
 * The topic splits by how well the two people know each other rather than by activity, which is
 * why the same invitation appears twice: 誘ってみる to someone new is careful and hedged, and the
 * same invitation to a close friend is two words long.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - mengajak keluar dan merinci acaranya
 * - memilih tempat bersama dan menyesuaikan selera
 * - menceritakan hobi dan menanyakan hobi orang lain
 * - berolahraga: mengajak, menolak, mengeluh capek
 * - menonton, mendengarkan, membaca: bertukar pendapat tentang isinya
 * - memesan tempat, menanyakan jam buka, menanyakan tarif
 * - mengajak orang yang belum akrab supaya tidak terasa memaksa
 * - menutup acara: berterima kasih, mengantar pulang
 * Tidak termasuk:
 * - berjalan tanpa tujuan dan berpapasan di jalan, masuk ke `jalan`
 * - bersantai di rumah, masuk ke `rumah_santai`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'santai_percakapan_pilih_tempat', topic: 'santai', jenis: 'percakapan',
    judulT: ['どこ', 'にする'],
    judul: 'Memilih tempat untuk makan malam bersama', judulEn: 'Choosing where to go out together',
    speakers: {'A':'teman','B':'teman_dekat'},
    sit: 'Dua teman membandingkan dua tempat sebelum berangkat', sitEn: 'Two friends comparing two places before setting out',
    id: 'Kami membandingkan tempat ramai yang murah dan tempat tenang yang lebih mahal, lalu memilih yang tenang karena ingin bicara.',
    en: 'We compare a cheap busy place with a quieter pricier one, and choose the quiet one because we want to talk.',
    note: 'Yang membuat percakapan ini berguna adalah alasan pilihannya disebut, bukan hanya nama tempatnya.',
    noteEn: 'What makes this conversation useful is that the reason for the choice is stated, not just the name of the place.',
    blocks: [
      { sp: 'A', t: ['今日', '、', 'どこ', 'に', 'する', '？', '駅前', 'の', '店', 'は', '安い', 'けど', '、', '絶対', '混んで', 'いる', 'よ', '。'] },
      { sp: 'B', t: ['私', 'は', '静か', 'な', '方', 'が', 'いい', 'な', '。', '久しぶり', 'に', 'ゆっくり', '話し', 'たい', 'から', '。'] },
      { sp: 'A', t: ['じゃあ', '、', '少し', '歩いた', 'ところ', 'の', '店', 'は', 'どう', '？', '高い', 'けど', '、', '席', 'が', '広い', 'よ', '。'] },
      { sp: 'B', t: ['どの', 'くらい', '高い', 'の', '？', '予算', 'は', '三千円', 'くらい', 'なん', 'だけど', '。'] },
      { sp: 'A', t: ['二千五百円', 'ぐらい', 'だ', 'から', '、', '大丈夫', 'だ', 'と', '思う', '。', '予約', 'して', 'おこう', 'か', '。'] },
      { sp: 'B', t: ['そう', 'して', 'くれる', 'と', '助かる', '。', '六時半', 'に', '駅', 'で', '待ち合わせ', 'で', 'いい', '？'] },
      { sp: 'A', t: ['うん', '、', 'それ', 'で', '決まり', '。', '先', 'に', '行って', '席', 'を', '取って', 'おく', 'ね', '。'] },
    ]
  },
  {
    key: 'santai_cerita_rencana_yang_berubah', topic: 'santai', jenis: 'cerita',
    judulT: ['雨', 'で', '変わった', '予定'],
    judul: 'Rencana jalan yang berubah di tengah', judulEn: 'An outing that changed halfway',
    rel: 'teman',
    sit: 'Menceritakan acara jalan yang berubah karena hujan', sitEn: 'Recounting an outing that changed course because of rain',
    id: 'Kami berencana berjalan di taman, hujan turun, lalu memutuskan menonton di dalam dan tetap menyenangkan.',
    en: 'We planned to walk in the park, it rained, so we decided to watch a film indoors instead, and it was still good.',
    note: 'Cerita seperti ini punya tiga bagian: rencananya, yang mengubahnya, dan hasilnya.',
    noteEn: 'A story like this has three parts: the plan, what changed it, and how it turned out.',
    blocks: [
      { t: ['土曜', 'に', '友達', 'と', '公園', 'を', '歩く', '予定', 'だった', 'の', 'です', 'が', '、', '朝', 'から', '雨', 'が', '降り', 'ました', '。'] },
      { t: ['外', 'は', '無理', 'だ', 'と', '分かった', 'ので', '、', 'その場', 'で', '予定', 'を', '変える', 'こと', 'に', 'しました', '。'] },
      { t: ['近く', 'の', '映画館', 'に', '電話', 'して', '、', '空いて', 'いる', 'か', '確認', 'して', 'もらい', 'ました', '。'] },
      { t: ['結局', '、', '映画', 'を', '見て', '、', 'その', 'あと', 'で', '温かい', '物', 'を', '食べて', '帰り', 'ました', '。'] },
      { t: ['歩け', 'なかった', 'の', 'は', '残念', 'でした', 'が', '、', '雨', 'の', '日', 'の', '過ごし方', 'を', '一つ', '覚え', 'ました', '。'] },
    ]
  },
  {
    key: 'santai_kronologi_dari_kumpul_sampai_pulang', topic: 'santai', jenis: 'kronologi',
    judulT: ['集まって', 'から', '別れ', 'る', 'まで'],
    judul: 'Dari berkumpul sampai pulang', judulEn: 'From meeting up to going home',
    rel: 'teman',
    sit: 'Menceritakan urutan acara jalan bersama, dari titik temu sampai pulang', sitEn: 'Recounting the order of an outing, from the meeting point to going home',
    id: 'Kami berkumpul pukul enam, makan, pindah ke kafe, dan pulang masing-masing karena kereta terakhir.',
    en: 'We met at six, ate, moved to a cafe, and went home separately because of the last trains.',
    note: 'Urutannya diikat たら dan ので, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by たら and ので, so each line explains the one before it.',
    blocks: [
      { t: ['六時', 'に', '駅', 'の', '改札', 'で', '待ち合わせ', 'たら', '、', '全員', 'そろって', 'いました', '。'] },
      { t: ['先', 'に', '食事', 'を', 'して', '、', 'その', 'あと', 'で', 'ゆっくり', '話せる', '場所', 'を', '探し', 'ました', '。'] },
      { t: ['店', 'が', '混んで', 'いた', 'ので', '、', '少し', '歩いて', '、', '二軒目', 'に', '入り', 'ました', '。'] },
      { t: ['気が付い', 'たら', '十一時', 'を', '過ぎて', 'いて', '、', '終電', 'の', '時間', 'が', '近く', 'なって', 'いました', '。'] },
      { t: ['駅', 'まで', '一緒', 'に', '歩いて', '、', 'ホーム', 'が', '違う', 'ので', '、', 'そこで', '別れ', 'ました', '。'] },
    ]
  },
  {
    key: 'santai_curhatan_teman_yang_selalu_telat', topic: 'santai', jenis: 'curhatan',
    judulT: ['いつも', '遅れて', 'くる', '人'],
    judul: 'Teman yang selalu datang terlambat', judulEn: 'The friend who is always late',
    rel: 'teman_dekat',
    sit: 'Mengeluh soal teman yang selalu terlambat, tanpa minta saran', sitEn: 'Venting about a friend who is always late, without asking for advice',
    id: 'Teman saya selalu datang dua puluh menit terlambat dan tidak pernah memberi kabar, dan saya mulai lelah menunggu.',
    en: 'My friend always arrives twenty minutes late and never messages, and I am getting tired of waiting.',
    note: 'Bentuk biasa dan tanpa permintaan solusi; keluhannya diarahkan ke kebiasaan, bukan ke orangnya secara keseluruhan.',
    noteEn: 'Plain style with no request for a solution; the complaint aims at the habit, not the whole person.',
    blocks: [
      { t: ['あの', '子', '、', 'いつも', '待ち合わせ', 'に', '二十分', '遅れて', 'くる', 'んだ', 'よ', '。'] },
      { t: ['遅れる', 'なら', '連絡', 'して', 'くれれ', 'ば', 'いい', 'のに', '、', '何', 'も', '言わ', 'ない', 'まま', '来る', '。'] },
      { t: ['先週', 'も', '、', '寒い', '中', 'を', '駅', 'の', '前', 'で', '三十分', '立って', '待って', 'いた', '。'] },
      { t: ['一度', 'だけ', '注意', 'した', 'こと', 'は', 'ある', 'けど', '、', 'その', '日', 'だけ', '直って', '、', 'また', '元', 'に', '戻った', '。'] },
      { t: ['縁', 'を', '切れ', 'ば', 'いい', 'の', 'か', 'も', 'しれ', 'ない', 'けど', '、', 'それ', '以外', 'は', 'いい', '子', 'な', 'ん', 'だ', 'よ', 'ね', '。'] },
    ]
  },
  {
    key: 'santai_keluhan_tempat_dipesan_orang_lain', topic: 'santai', jenis: 'keluhan',
    judulT: ['予約', 'した', '席', 'が', 'ありません'],
    judul: 'Tempat yang sudah dipesan ternyata diberikan', judulEn: 'The table we booked went to someone else',
    rel: 'pelayan',
    sit: 'Menyampaikan keluhan ke pelayan bahwa pesanannya tidak tercatat', sitEn: 'Complaining to waiting staff that the booking was not recorded',
    id: 'Saya memesan tempat seminggu sebelumnya, tetapi tidak tercatat, dan saya meminta dicarikan meja lain atau diberi tahu secepatnya.',
    en: 'I booked a week ahead but it was not recorded, and I ask either to be found another table or to be told quickly.',
    note: 'Keluhan yang bisa ditindaklanjuti menyebut apa yang dijanjikan, apa yang terjadi, lalu dua jalan keluar yang bisa diterima.',
    noteEn: 'An actionable complaint states what was promised, what happened, then two acceptable ways out.',
    blocks: [
      { t: ['すみません', '、', '予約', 'の', 'こと', 'で', 'お尋ね', 'したい', 'の', 'です', 'が', '。'] },
      { t: ['一週間', '前', 'に', '電話', 'して', '、', '八時', 'に', '四人', 'で', 'お願い', 'した', 'はず', 'です', '。'] },
      { t: ['今', '、', '名前', 'を', '調べて', 'もらった', 'ところ', '、', '記録', 'が', '残って', 'い', 'ません', 'でした', '。'] },
      { t: ['別', 'の', '席', 'で', 'も', 'いい', 'ので', '、', '四人', 'が', '座れる', '場所', 'は', 'あり', 'ません', 'か', '。'] },
      { t: ['難しけれ', 'ば', '、', '待つ', 'の', 'か', '諦める', 'の', 'か', '、', '早め', 'に', '教えて', 'ください', '。'] },
    ]
  },
  {
    key: 'santai_penjelasan_cara_ikut_kelas', topic: 'santai', jenis: 'penjelasan',
    judulT: ['初めて', 'の', '教室', 'の', '入り', '方'],
    judul: 'Cara ikut kelas hobi untuk pertama kali', judulEn: 'How to join a hobby class for the first time',
    rel: 'petugas',
    sit: 'Menerangkan cara mendaftar kelas hobi kepada orang yang baru pertama', sitEn: 'Explaining how to sign up for a hobby class to a first-timer',
    id: 'Saya menerangkan bahwa kelas pertama bisa dicoba gratis, bahwa perkakasnya dipinjamkan, dan bahwa baju yang boleh kotor sebaiknya dibawa.',
    en: 'I explain that the first class can be tried free, that tools are lent out, and that clothes you do not mind dirtying are best.',
    note: 'Penjelasan yang berguna menjawab keraguan terbesar pendatang baru lebih dulu, yaitu apakah harus membeli perkakas.',
    noteEn: 'A useful explanation answers the newcomer is biggest worry first: whether they must buy tools.',
    blocks: [
      { t: ['まず', '、', '道具', 'を', '買う', '必要', 'は', 'あり', 'ません', '。', '教室', 'の', '物', 'を', '貸し', 'ます', '。'] },
      { t: ['初めて', 'の', '方', 'は', '、', '一度', '体験', 'できる', 'の', 'で', '、', 'それ', 'で', '続ける', 'か', '決めて', 'ください', '。'] },
      { t: ['服装', 'は', '、', '汚れて', 'も', 'いい', '物', 'が', '安心', 'です', '。', '袖', 'の', 'ある', '服', 'だ', 'と', 'なお', 'いい', 'です', '。'] },
      { t: ['道具', 'を', '持って', 'いる', '方', 'は', '、', '持って', '来て', 'いただい', 'て', 'も', '構い', 'ません', '。'] },
      { t: ['申し込み', 'は', '、', '当日', 'に', '受付', 'で', '書いて', 'いただけ', 'ば', '済み', 'ます', '。'] },
    ]
  },
  {
    key: 'santai_laporan_bagaimana_acaranya', topic: 'santai', jenis: 'laporan',
    judulT: ['集まり', 'は', 'どう', 'だった', 'か'],
    judul: 'Melaporkan bagaimana acaranya berjalan', judulEn: 'Reporting how the outing went',
    rel: 'pasangan',
    sit: 'Melapor ke pasangan tentang acara yang baru dihadiri', sitEn: 'Reporting to a partner about an event just attended',
    id: 'Saya melaporkan bahwa acaranya lebih ramai dari perkiraan, bahwa ada satu bagian yang melelahkan, dan bahwa pulangnya lebih lama.',
    en: 'I report that the event was busier than expected, that one part was tiring, and that the trip home took longer.',
    note: 'Laporan seperti ini berguna karena menyebut bagian yang tidak menyenangkan juga, bukan hanya yang bagus.',
    noteEn: 'A report like this is useful because it names the unpleasant part too, not only the good one.',
    blocks: [
      { t: ['今', '、', '帰って', 'きた', 'よ', '。', '思って', 'いた', 'より', '人が', '多くて', '、', '入口', 'で', '二十分', '並んだ', '。'] },
      { t: ['前半', 'は', '楽しかった', 'けど', '、', '後半', 'は', '立って', 'いる', 'だけ', 'で', '、', '足', 'が', '痛く', 'なった', '。'] },
      { t: ['途中', 'で', '一度', '抜けて', '、', '外', 'で', '休んだ', 'から', '、', '何と', 'か', '最後', 'まで', 'い', 'た', '。'] },
      { t: ['帰り', 'は', '臨時', 'の', '電車', 'が', '出て', 'いて', '、', 'それ', 'でも', '一時間', 'かかった', '。'] },
      { t: ['全体', 'として', 'は', '行って', 'よかった', 'けど', '、', '次', 'は', '座れる', '席', 'を', '取る', 'つもり', '。'] },
    ]
  },
  {
    key: 'santai_rencana_akhir_pekan_dengan_pilihan', topic: 'santai', jenis: 'rencana',
    judulT: ['晴れ', 'と', '雨', 'の', '二つ', 'の', '案'],
    judul: 'Rencana akhir pekan dengan dua pilihan', judulEn: 'A weekend plan with two options',
    rel: 'teman',
    sit: 'Menyusun rencana akhir pekan dengan dua pilihan dan syaratnya', sitEn: 'Making a weekend plan with two options and the conditions for each',
    id: 'Kami menyiapkan dua pilihan, satu di luar dan satu di dalam, dan memutuskan menurut cuaca pagi itu.',
    en: 'We prepare two options, one outdoors and one indoors, and decide by the weather that morning.',
    note: 'Rencana yang berguna menyebut kapan keputusannya diambil, supaya tidak ada yang menunggu kabar.',
    noteEn: 'A useful plan says when the decision will be made, so nobody is left waiting.',
    blocks: [
      { t: ['土曜日', 'は', '二つ', '用意', 'して', 'おこう', '。', '天気', 'で', '決める', 'の', 'が', '安全', 'だ', 'から', '。'] },
      { t: ['晴れ', 'たら', '、', '朝', 'から', '海', 'まで', '行って', '、', '昼', 'は', '向こう', 'で', '食べる', '。'] },
      { t: ['雨', 'なら', '、', '駅', 'の', '近く', 'の', '映画館', 'に', 'して', '、', '夜', 'は', '家', 'で', '食べる', '。'] },
      { t: ['どちら', 'に', 'する', 'か', 'は', '、', '金曜', 'の', '夜', 'に', '天気予報', 'を', '見て', '決め', 'よう', '。'] },
      { t: ['私', 'が', '金曜', 'に', '連絡', 'する', 'から', '、', 'それ', 'まで', '予定', 'を', '入れ', 'ない', 'で', 'ね', '。'] },
    ]
  },
  {
    key: 'santai_nasihat_mengajak_orang_baru', topic: 'santai', jenis: 'nasihat',
    judulT: ['初めて', 'の', '人', 'を', '誘う', 'とき'],
    judul: 'Mengajak orang yang belum akrab tanpa memaksa', judulEn: 'Inviting someone new without pressing them',
    rel: 'teman',
    sit: 'Menasihati teman soal cara mengajak orang yang belum akrab', sitEn: 'Advising a friend on how to invite someone they do not know well',
    id: 'Saya menyarankan menyebut jumlah orang dan jam selesainya, supaya yang diajak tahu apa yang dihadapinya sebelum memutuskan.',
    en: 'I suggest stating how many people and when it ends, so the invitee knows what they are agreeing to before deciding.',
    note: 'Nasihat yang berguna menyebut sebabnya: yang belum akrab menolak bukan karena tidak ingin, melainkan karena tidak tahu keadaannya.',
    noteEn: 'Useful advice gives the reason: newcomers refuse not because they do not want to, but because they cannot picture it.',
    blocks: [
      { t: ['初めて', 'の', '人', 'を', '誘う', 'とき', 'は', '、', '人数', 'と', '終わる', '時間', 'を', '先', 'に', '伝えた', '方', 'が', 'いい', 'よ', '。'] },
      { t: ['断る', 'の', 'は', '、', '嫌', 'だ', 'から', 'で', 'は', 'なく', 'て', '、', 'どんな', '場', 'か', '分から', 'ない', 'から', 'な', 'ん', 'だ', '。'] },
      { t: ['「', '何人', 'で', '、', '何時', 'ごろ', 'まで', '」', 'と', '言え', 'ば', '、', '安心', 'して', '決め', 'られる', '。'] },
      { t: ['それ', 'でも', '迷って', 'いる', 'よう', 'なら', '、', '途中', 'で', '帰って', 'も', 'いい', 'と', '伝える', 'と', 'いい', '。'] },
      { t: ['一度', '来て', 'くれれ', 'ば', '、', '次', 'から', 'は', '声', 'を', 'かけ', 'やすく', 'なる', 'から', 'ね', '。'] },
    ]
  },
  {
    key: 'santai_permintaan_ubah_jam_bertemu', topic: 'santai', jenis: 'permintaan',
    judulT: ['待ち合わせ', 'の', '時間', 'を', 'ずらし', 'たい'],
    judul: 'Meminta jam bertemu digeser', judulEn: 'Asking to move the meeting time',
    rel: 'teman',
    sit: 'Meminta jam bertemu diubah karena ada urusan yang muncul', sitEn: 'Asking to change the meeting time because something has come up',
    id: 'Saya meminta jam bertemu digeser satu jam, menyebut alasannya, dan menawarkan bertemu di dekat tempat saya kalau itu lebih mudah.',
    en: 'I ask to push the meeting back an hour, give the reason, and offer to meet near me if that is easier for them.',
    note: 'Permintaan seperti ini diterima karena alasannya disebut dan gantinya ditawarkan, bukan hanya diminta.',
    noteEn: 'A request like this is granted because the reason is given and an alternative offered, not merely asked for.',
    blocks: [
      { t: ['ごめん', '、', '一つ', 'お願い', 'が', 'ある', 'ん', 'だ', 'けど', 'いい', 'かな', '。'] },
      { t: ['明日', 'の', '朝', '、', '急', 'に', '用事', 'が', '入って', 'しまって', '、', '六時', 'に', '間に合わ', 'ない', 'んだ', '。'] },
      { t: ['七時', 'に', 'ずらして', 'もらう', 'こと', 'は', 'でき', 'ない', 'かな', '。'] },
      { t: ['もし', '七時', 'が', '遅い', 'なら', '、', '私', 'の', '家', 'の', '近く', 'で', '会う', 'の', 'で', 'も', 'いい', 'よ', '。'] },
      { t: ['どちら', 'が', 'いい', 'か', '、', '夕方', 'まで', 'に', '教えて', 'くれる', 'と', '助かる', '。'] },
    ]
  },
  {
    key: 'santai_pengalaman_pertama_ikut_klub', topic: 'santai', jenis: 'pengalaman',
    judulT: ['知り合い', 'の', 'いない', '会', 'に', '入った', '話'],
    judul: 'Pertama kali ikut klub dan tidak mengenal siapa pun', judulEn: 'Joining a club knowing nobody',
    rel: 'teman',
    sit: 'Menceritakan pengalaman pertama masuk klub tanpa kenal siapa pun', sitEn: 'Recounting the first time joining a club knowing nobody',
    id: 'Saya datang sendiri tanpa kenal siapa pun, ada yang menyapa lebih dulu, dan sejak itu saya melakukan hal yang sama kepada pendatang baru.',
    en: 'I arrived alone knowing nobody, someone spoke to me first, and since then I do the same for newcomers.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: keadaannya, yang mengubahnya, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the situation, what changed it, and what changed afterwards.',
    blocks: [
      { t: ['去年', '、', '趣味', 'の', 'クラブ', 'に', '一人', 'で', '入った', 'こと', 'が', 'あります', '。'] },
      { t: ['初日', 'は', '知って', 'いる', '人', 'が', '一人', 'も', 'い', 'なくて', '、', '入口', 'で', '十分', 'くらい', '立って', 'いました', '。'] },
      { t: ['そこ', 'へ', '年上', 'の', '人', 'が', '来て', '、', '道具', 'の', '場所', 'を', '教えて', 'くれた', 'の', 'です', '。'] },
      { t: ['それ', 'だけ', 'で', '気持ち', 'が', '楽', 'に', 'なって', '、', 'その', '日', 'の', 'うち', 'に', '五人', 'と', '話せ', 'ました', '。'] },
      { t: ['あれ', 'から', '、', '新しく', '来た', '人', 'に', 'は', '私', 'から', '声', 'を', 'かける', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'santai_pengumuman_acara_klub', topic: 'santai', jenis: 'pengumuman',
    judulT: ['今月', 'の', '集まり', 'のお知らせ'],
    judul: 'Pengumuman acara klub bulan ini', judulEn: 'An announcement about this month\'s club event',
    rel: 'teman',
    sit: 'Mengumumkan acara klub kepada para anggotanya', sitEn: 'Announcing a club event to its members',
    id: 'Acara bulan ini maju satu minggu, tempatnya pindah ke ruang yang lebih besar, dan yang belum mendaftar diminta menulis nama.',
    en: 'This month\'s event is a week earlier, moves to a larger room, and those not yet signed up are asked to write their names down.',
    note: 'Pengumuman menyebut perubahannya lebih dulu, karena itu yang mengubah rencana orang.',
    noteEn: 'An announcement gives the changes first, because those are what alter people is plans.',
    blocks: [
      { t: ['皆さん', 'に', 'お知らせ', 'です', '。', '今月', 'の', '集まり', 'について', '二つ', '変更', 'が', 'あります', '。'] },
      { t: ['まず', '、', '予定', 'より', '一週間', '早く', 'なり', 'ました', '。', '理由', 'は', '会場', 'が', '取れ', 'た', 'から', 'です', '。'] },
      { t: ['次に', '、', '場所', 'が', '変わり', 'ます', '。', '前', 'の', '部屋', 'より', '広い', 'の', 'で', '、', '道具', 'を', '広げ', 'られ', 'ます', '。'] },
      { t: ['参加', 'する', '人', 'は', '、', 'まだ', 'の', '人', 'も', '、', '名簿', 'に', '名前', 'を', '書いて', 'ください', '。'] },
      { t: ['締め切り', 'は', '三日', '前', 'です', '。', 'それ', '以降', 'は', '席', 'を', '用意', 'でき', 'ない', 'こと', 'が', 'あります', '。'] },
    ]
  },
]);
