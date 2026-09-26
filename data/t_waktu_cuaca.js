/* Waktu dan cuaca: the weather, the hour and the day, as things people talk about.
 *
 * The hard part of this topic is that it is nearly always the opening of a conversation rather
 * than its subject, so most of these are short and most of them are paired: the same
 * greeting to a colleague and to a client.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - sapaan berdasarkan waktu hari, dan perbedaannya dengan rekan akrab
 * - menyebut hari, tanggal, dan jam dalam percakapan, bukan sebagai angka
 * - mengaitkan cuaca dengan rencana: mengubah, menunda, membatalkan
 * - menyesuaikan janji dengan cuaca dan jam sibuk
 * - menanyakan perkiraan cuaca dan menyampaikan apa yang didengar
 * - mengucapkan sesuatu saat cuaca berubah mendadak
 * Tidak termasuk:
 * - menyusun acara yang bergantung cuaca, masuk ke `santai` atau `jalan`
 * - jadwal kerja atau sekolah, masuk ke `kerja`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'waktu_cuaca_percakapan_pagi_di_kantor', topic: 'waktu_cuaca', jenis: 'percakapan',
    judul: 'Basa-basi pagi tentang cuaca', judulEn: 'Morning small talk about the weather',
    speakers: {'A':'rekan','B':'atasan'},
    sit: 'Percakapan pagi di kantor, dimulai dari cuaca', sitEn: 'A morning conversation at the office, starting from the weather',
    id: 'Sapaan pagi disambung dengan cuaca, lalu berlanjut ke rencana akhir pekan karena hujan diperkirakan datang.',
    en: 'The morning greeting moves to the weather, then to weekend plans because rain is forecast.',
    note: 'Basa-basi cuaca berguna karena selalu ada lanjutannya, dan itu yang membuatnya dipakai orang setiap hari.',
    noteEn: 'Weather small talk works because there is always a follow-up, which is why people use it daily.',
    blocks: [
      { sp: 'B', t: ['おはよう', 'ございます', '。', '今朝', 'は', '冷え', 'ます', 'ね', '。'] },
      { sp: 'A', t: ['おはよう', 'ございます', '。', '本当に', '、', '手袋', 'が', '要る', 'くらい', 'です', 'ね', '。'] },
      { sp: 'A', t: ['天気予報', 'で', 'は', '、', '午後', 'から', '雨', 'だ', 'そう', 'です', 'よ', '。'] },
      { sp: 'B', t: ['そう', 'です', 'か', '。', '傘', 'を', '持って', 'き', 'て', 'い', 'ません', 'でした', '。'] },
      { sp: 'A', t: ['会社', 'に', '置き傘', 'が', 'あります', 'から', '、', '貸します', 'よ', '。'] },
      { sp: 'B', t: ['ありがとう', 'ございます', '。', '土曜', 'も', '降る', 'の', 'でしょう', 'か', '。'] },
      { sp: 'A', t: ['週末', 'は', '晴れる', 'と', '言って', 'いました', '。', '予定', 'が', 'ある', 'の', 'ですか', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_cerita_hujan_deras_di_rumah', topic: 'waktu_cuaca', jenis: 'cerita',
    judul: 'Hujan deras yang mengubah sore', judulEn: 'Heavy rain that changed the afternoon',
    rel: 'keluarga',
    sit: 'Menceritakan hujan deras yang mengubah rencana sore', sitEn: 'Recounting heavy rain that changed the afternoon\'s plan',
    id: 'Langit menggelap, hujan turun deras, jemuran diangkat, dan sore yang tadinya untuk jalan-jalan berubah jadi memasak bersama.',
    en: 'The sky darkened, rain came down hard, the washing was brought in, and an afternoon meant for a walk became cooking together.',
    note: 'Cerita cuaca berguna karena menunjukkan apa yang dicuci dan apa yang diganti, bukan hanya bahwa hujan turun.',
    noteEn: 'A weather story works because it shows what got brought in and what was swapped, not merely that it rained.',
    blocks: [
      { t: ['三時', 'ごろ', '、', '空', 'が', '急に', '暗く', 'なって', '、', '遠く', 'で', '雷', 'が', '鳴り', 'ました', '。'] },
      { t: ['十分', 'も', 'たた', 'ない', 'うち', 'に', '、', '雨', 'が', '強く', '降り', '始め', 'ました', '。'] },
      { t: ['まず', '、', '外', 'に', '干して', 'いた', '物', 'を', '全部', '中', 'に', '入れ', 'ました', '。'] },
      { t: ['買い物', 'に', '行く', 'つもり', 'でした', 'が', '、', 'やめ', 'て', '家', 'に', 'いる', 'こと', 'に', 'しました', '。'] },
      { t: ['代わり', 'に', '、', '冷蔵庫', 'に', 'あった', '物', 'で', '一緒', 'に', '作り', 'ました', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_kronologi_pagi_sampai_malam', topic: 'waktu_cuaca', jenis: 'kronologi',
    judul: 'Cuaca dari pagi sampai malam', judulEn: 'The weather from morning to night',
    rel: 'teman',
    sit: 'Menceritakan urutan perubahan cuaca sehari, dan bagaimana masing-masing mengubah rencana', sitEn: 'Recounting how the weather changed through a day and what each change altered',
    id: 'Pagi cerah, siang berawan, sore hujan sejenak, dan malam jadi dingin sampai jendela harus ditutup.',
    en: 'Morning clear, midday cloudy, a short shower in the afternoon, and a cold night that closed the windows.',
    note: 'Urutannya diikat たら dan ので, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by たら and ので, so each line explains the one before it.',
    blocks: [
      { t: ['朝', 'は', 'よく', '晴れて', 'いて', '、', '洗濯', 'を', '外', 'に', '出しました', '。'] },
      { t: ['昼', 'に', 'なったら', '、', '雲', 'が', '出て', 'きて', '、', '空', 'が', '白く', 'なりました', '。'] },
      { t: ['三時', 'ごろ', 'に', '一度', 'だけ', '降った', 'ので', '、', '洗濯', 'を', '急いで', '取り込み', 'ました', '。'] },
      { t: ['夕方', 'は', 'また', '晴れた', 'けど', '、', '気温', 'が', '下がり', 'ました', '。'] },
      { t: ['夜', 'に', 'なって', '冷えた', 'ので', '、', '開けて', 'いた', '窓', 'を', '全部', '閉め', 'ました', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_curhatan_panas_yang_tak_tertahankan', topic: 'waktu_cuaca', jenis: 'curhatan',
    judul: 'Panas yang tidak bisa ditahan', judulEn: 'Heat that cannot be endured',
    rel: 'teman_dekat',
    sit: 'Mengeluh soal panas, tanpa minta saran', sitEn: 'Venting about the heat, without asking for advice',
    id: 'Panas membuat tidur tidak nyenyak, pekerjaan jadi lambat, dan pendingin ruangan menyala terus sampai tagihannya naik.',
    en: 'The heat stops me sleeping well, slows the work, and runs the air conditioner so much the bill goes up.',
    note: 'Keluhan seperti ini diarahkan ke keadaannya, bukan ke orang, dan tidak menyimpulkan apa pun.',
    noteEn: 'A complaint like this aims at the situation, not a person, and draws no conclusion.',
    blocks: [
      { t: ['この', '暑さ', 'は', '、', 'もう', '体', 'に', 'こたえる', 'よ', '。'] },
      { t: ['夜', 'も', '気温', 'が', '下がら', 'ない', 'から', '、', '何度', 'も', '目', 'が', '覚めて', 'しまう', '。'] },
      { t: ['昼', 'は', '頭', 'が', '回ら', 'ない', 'から', '、', '同じ', 'こと', 'を', '二度', 'やる', 'こと', 'も', 'ある', '。'] },
      { t: ['エアコン', 'を', 'つけ', 'っ放し', 'に', 'して', 'いる', 'から', '、', '電気', 'の', '請求', 'が', '先月', 'の', '倍', 'だ', '。'] },
      { t: ['涼しく', 'なる', '方法', 'を', '聞きたい', 'わけ', 'じゃ', 'なくて', '、', 'ただ', '愚痴', 'を', '言いたい', 'だけ', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_keluhan_janji_dibatalkan_akibat_cuaca', topic: 'waktu_cuaca', jenis: 'keluhan',
    judul: 'Janji dibatalkan karena cuaca', judulEn: 'A meeting cancelled because of the weather',
    rel: 'rekan',
    sit: 'Menyampaikan keluhan karena pertemuan dibatalkan sepihak gara-gara hujan', sitEn: 'Raising a complaint because a meeting was cancelled unilaterally over rain',
    id: 'Saya menyampaikan bahwa pembatalannya wajar tetapi terlalu mendadak, dan meminta keputusan diberitahukan lebih awal.',
    en: 'I say the cancellation was reasonable but too sudden, and ask for the decision to be given earlier.',
    note: 'Keluhan seperti ini mengakui pembatalannya masuk akal, dan hanya menuntut waktunya, sehingga tidak terbaca sebagai pembelaan diri.',
    noteEn: 'A complaint like this grants the cancellation was sensible and only challenges the timing, so it does not read as self-defence.',
    blocks: [
      { t: ['昨日', 'の', '件', 'で', '、', '少し', 'だけ', 'お伝え', 'したい', 'こと', 'が', 'あります', '。'] },
      { t: ['雨', 'で', '中止', 'に', 'なった', 'こと', '自体', 'は', '、', '仕方', 'ない', 'と', '思って', 'います', '。'] },
      { t: ['ただ', '、', '連絡', 'が', '来た', 'の', 'は', '出発', 'の', '十分', '前', 'でした', '。'] },
      { t: ['私', 'は', 'もう', '駅', 'に', '向かって', 'いて', '、', '戻る', 'の', 'に', '一', '時間', 'かかり', 'ました', '。'] },
      { t: ['決める', 'とき', 'は', '、', '前日', 'の', '夜', 'まで', 'に', '教えて', 'いただける', 'と', '助かり', 'ます', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_penjelasan_menyebut_waktu', topic: 'waktu_cuaca', jenis: 'penjelasan',
    judul: 'Cara menyebut waktu dalam percakapan', judulEn: 'How to refer to time in conversation',
    rel: 'teman',
    sit: 'Menerangkan cara menyebut hari dan jam supaya tidak membingungkan', sitEn: 'Explaining how to refer to days and hours so they are not confusing',
    id: 'Saya menerangkan bahwa menyebut hari tanpa tanggal berarti minggu ini, dan bahwa jam lebih baik disebut dengan perkiraan.',
    en: 'I explain that naming a day without a date means this week, and that hours are better given as an approximate range.',
    note: 'Penjelasan yang berguna menyebut kesalahpahaman yang paling sering, yaitu hari yang dianggap minggu depan.',
    noteEn: 'A useful explanation names the most frequent misunderstanding, the day heard as next week.',
    blocks: [
      { t: ['「', '金曜', '」', 'と', '言う', 'と', '、', '普通', 'は', '今週', 'の', '金曜', 'を', '指し', 'ます', '。', '来週', 'なら', '「', '来週', 'の', '金曜', '」', 'です', '。'] },
      { t: ['日にち', 'が', '決まって', 'いない', 'とき', 'は', '、', '「', '今週', 'の', 'どこ', 'か', '」', 'と', '言う', 'と', '誤解', 'が', '減り', 'ます', '。'] },
      { t: ['時間', 'は', '、', '「', '三時', 'ごろ', '」', 'の', 'よう', 'に', '幅', 'を', '持たせた', '方', 'が', '、', '待たせる', 'こと', 'が', '少なく', 'なります', '。'] },
      { t: ['「', '午後', '」', 'だけ', 'で', 'は', '幅', 'が', '広すぎ', 'る', 'ので', '、', '「', '一時', 'から', '三時', '」', 'と', '区切る', 'と', '確か', 'です', '。'] },
      { t: ['相手', 'が', '急いで', 'いる', 'とき', 'は', '、', '日付', 'から', '言う', 'と', '伝わり', 'ます', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_laporan_keterlambatan_karena_cuaca', topic: 'waktu_cuaca', jenis: 'laporan',
    judul: 'Melaporkan keterlambatan karena cuaca', judulEn: 'Reporting a delay caused by weather',
    rel: 'atasan',
    sit: 'Melaporkan bahwa hujan membuat perjalanan lebih lama', sitEn: 'Reporting that the rain has made the journey longer',
    id: 'Saya melaporkan bahwa hujan membuat bus lambat, perkiraan tiba dua puluh menit lebih lambat, dan pekerjaan yang bisa dikerjakan dari rumah sudah dimulai.',
    en: 'I report that the rain has slowed the bus, that I expect to arrive twenty minutes late, and that work I can do from home is already begun.',
    note: 'Laporan cuaca berguna karena menyebut apa yang tetap bisa dikerjakan, bukan hanya bahwa terlambat.',
    noteEn: 'A weather report is useful because it says what is still being done, not only that I am late.',
    blocks: [
      { t: ['おはよう', 'ございます', '。', '雨', 'の', 'ため', '、', '電車', 'が', '遅れて', 'います', '。'] },
      { t: ['乗り換え', 'の', '駅', 'で', '十', '分', '待って', 'いて', '、', '着く', 'の', 'は', '二十', '分', 'ほど', '遅く', 'なり', 'ます', '。'] },
      { t: ['その', '間', '、', 'メール', 'の', '確認', 'は', '携帯', 'から', '進めて', 'います', '。'] },
      { t: ['九時', 'の', '打ち合わせ', 'に', 'は', '間に合い', 'ません', 'ので', '、', '先', 'に', '始めて', 'ください', '。'] },
      { t: ['資料', 'は', 'もう', '共有', 'して', 'ある', 'ので', '、', 'そのまま', 'ご覧', 'いただけ', 'ます', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_rencana_menyesuaikan_cuaca', topic: 'waktu_cuaca', jenis: 'rencana',
    judul: 'Menyesuaikan rencana dengan cuaca', judulEn: 'Adjusting plans to the weather',
    rel: 'pasangan',
    sit: 'Menyusun rencana yang berubah menurut cuaca', sitEn: 'Making a plan that changes with the weather',
    id: 'Kami menyiapkan dua rencana dan menetapkan bahwa keputusannya diambil pagi hari dengan melihat prakiraan.',
    en: 'We prepare two plans and set that the decision is made in the morning by checking the forecast.',
    note: 'Rencana seperti ini menyebut jam keputusannya, supaya tidak ada yang menunggu kabar.',
    noteEn: 'A plan like this gives the hour of the decision, so nobody is left waiting for word.',
    blocks: [
      { t: ['明日', 'は', '、', '外', 'に', '行く', '案', 'と', '家', 'に', 'いる', '案', 'を', '両方', '用意', 'しよう', '。'] },
      { t: ['朝', '七時', 'の', '時点', 'で', '、', '降水', '確率', 'を', '見て', '決める', '。'] },
      { t: ['晴れ', 'て', 'いれ', 'ば', '、', '昼', 'まで', '外', 'に', 'いて', '、', '三時', 'に', '帰る', '。'] },
      { t: ['雨', 'なら', '、', '駅', 'の', '近く', 'で', '済ませて', '、', '午後', 'は', '家', 'で', '休む', '。'] },
      { t: ['私', 'が', '七時', 'に', '調べて', '、', 'どちら', 'に', 'する', 'か', 'を', 'すぐ', 'に', '送る', 'ね', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_nasihat_jangan_meremehkan_cuaca', topic: 'waktu_cuaca', jenis: 'nasihat',
    judul: 'Jangan meremehkan prakiraan cuaca', judulEn: 'Do not dismiss the weather forecast',
    rel: 'teman',
    sit: 'Menasihati teman supaya menyiapkan diri menurut prakiraan', sitEn: 'Advising a friend to prepare according to the forecast',
    id: 'Saya menyarankan menyiapkan payung sejak malam sebelumnya, karena pagi yang cerah tidak berarti sore tidak hujan.',
    en: 'I suggest getting the umbrella ready the night before, because a clear morning does not mean a dry afternoon.',
    note: 'Nasihat yang berguna menyebut cara yang bisa dilakukan, bukan hanya menyuruh berhati-hati.',
    noteEn: 'Useful advice gives something to do, not merely telling them to be careful.',
    blocks: [
      { t: ['天気予報', 'は', '、', '軽く', '見る', 'だけ', 'で', 'は', 'もったいない', 'よ', '。'] },
      { t: ['朝', 'が', '晴れて', 'いて', 'も', '、', '午後', 'の', '雨', 'が', '予報', 'に', '出て', 'いる', 'こと', 'が', '多い', '。'] },
      { t: ['前', 'の', '夜', 'に', '、', 'かばん', 'に', '折りたたみ', 'の', '傘', 'を', '入れて', 'おく', 'と', '安心', 'だ', 'よ', '。'] },
      { t: ['雨', 'の', '日', 'は', '道', 'が', '混む', 'から', '、', '家', 'を', '出る', '時間', 'も', '十五', '分', '早め', 'に', 'する', '。'] },
      { t: ['これを', '決めて', 'おく', 'だけで', '、', 'びしょ濡れ', 'で', '走る', 'こと', 'が', 'なく', 'なります', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_permintaan_ubah_jadwal_karena_hujan', topic: 'waktu_cuaca', jenis: 'permintaan',
    judul: 'Meminta jadwal digeser karena hujan', judulEn: 'Asking to move a plan because of rain',
    rel: 'teman',
    sit: 'Meminta jadwal diubah karena prakiraan hujan, dengan alternatif', sitEn: 'Asking to move a plan because of rain, with an alternative',
    id: 'Saya meminta jadwal digeser ke hari yang cerah, menyebut alasan hujan, dan menawarkan dua hari pengganti.',
    en: 'I ask to move the plan to a dry day, give the rain as the reason, and offer two alternative days.',
    note: 'Permintaan penggeseran diterima karena hari penggantinya disebut sekaligus, bukan hanya alasan hujan.',
    noteEn: 'A request to move is granted because the replacement days come with it, not only the reason.',
    blocks: [
      { t: ['土曜', 'の', 'こと', 'な', 'ん', 'だけど', '、', '一日', 'ずらし', 'て', 'も', 'いい', 'かな', '。'] },
      { t: ['予報', 'で', 'は', '、', '午前', 'から', '強い', '雨', 'に', 'なる', 'と', '出て', 'いる', 'んだ', '。'] },
      { t: ['外', 'を', '歩く', '予定', 'だった', 'から', '、', 'びしょ濡れ', 'に', 'なる', 'のは', '避け', 'たい', '。'] },
      { t: ['日曜', 'か', '次の', '土曜', 'なら', '、', '今', 'の', 'ところ', '晴れ', 'の', '予報', 'です', '。'] },
      { t: ['もし', 'どちら', 'も', '無理', 'なら', '、', '屋内', 'の', '予定', 'に', '変える', 'こと', 'も', 'できます', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_pengalaman_taifu', topic: 'waktu_cuaca', jenis: 'pengalaman',
    judul: 'Pengalaman melewati topan', judulEn: 'The time I sat through a typhoon',
    rel: 'teman',
    sit: 'Menceritakan pengalaman melewati topan di rumah', sitEn: 'Recounting sitting through a typhoon at home',
    id: 'Saya menyiapkan air dan lampu, listrik sempat mati, dan sehari setelahnya jalanan penuh dahan patah.',
    en: 'I stored water and a lamp, the power went out for a while, and the next day the streets were full of broken branches.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: persiapannya, apa yang terjadi, dan keadaan setelahnya.',
    noteEn: 'A good story has three parts: the preparation, what happened, and the aftermath.',
    blocks: [
      { t: ['一昨年', 'の', '秋', '、', '大きい', '台風', 'が', '来た', 'とき', 'のこと', 'です', '。'] },
      { t: ['前', 'の', '日', 'に', '、', '水', 'と', '懐中電灯', 'と', '電池', 'を', '買って', 'おきました', '。'] },
      { t: ['夜', 'に', 'なって', '風', 'が', '強く', 'なり', '、', '二', '時間', 'ほど', '電気', 'が', '止まり', 'ました', '。'] },
      { t: ['窓', 'を', '開け', 'られ', 'ない', 'ので', '、', '部屋', 'が', '蒸し', 'ました', 'が', '、', 'ろうそく', 'で', 'しのぎ', 'ました', '。'] },
      { t: ['次の', '日', 'は', '、', '道', 'に', '木', 'の', '枝', 'が', 'たくさん', '落ちて', 'いました', '。'] },
    ]
  },
  {
    key: 'waktu_cuaca_pengumuman_taifu', topic: 'waktu_cuaca', jenis: 'pengumuman',
    judul: 'Pengumuman perusahaan saat topan mendekat', judulEn: 'A company announcement as a typhoon approaches',
    rel: 'rekan',
    sit: 'Pengumuman ke seluruh karyawan bahwa kerja berubah karena topan', sitEn: 'Announcing to all staff that work changes because of an approaching typhoon',
    id: 'Perusahaan mengumumkan jam kerja dimajukan, kerja dari rumah diizinkan, dan keputusan akhir diberitahukan pukul lima pagi.',
    en: 'The company announces earlier hours, work from home allowed, and the final decision given at five in the morning.',
    note: 'Pengumuman seperti ini menyebut jam keputusannya, karena itu yang ditunggu orang sebelum berangkat.',
    noteEn: 'An announcement like this gives the hour of the decision, because that is what people wait for before leaving.',
    blocks: [
      { t: ['全社', 'のお知らせ', 'です', '。', '台風', 'の', '接近', 'に', 'ともない', '、', '明日', 'の', '勤務', 'を', '変更', 'します', '。'] },
      { t: ['始業', 'を', '一時間', '早めて', '八時', 'とし', '、', '終業', 'は', '三時', 'とします', '。'] },
      { t: ['可能', 'な', '部署', 'は', '、', '在宅', '勤務', 'に', '切り替えて', 'ください', '。'] },
      { t: ['最終', 'の', '判断', 'は', '、', '明日', 'の', '朝', '五時', 'に', 'この', '掲示板', 'で', 'お知らせ', 'します', '。'] },
      { t: ['交通機関', 'が', '止まった', '場合', 'は', '、', '無理', 'に', '出社', 'せず', '、', '上長', 'に', '連絡', 'してください', '。'] },
    ]
  },
]);
