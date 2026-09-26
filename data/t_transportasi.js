/* Transportasi: getting from one place to another on public transport.
 *
 * Asking the way on foot is in the `jalan` topic; what someone does after getting off belongs
 * to that errand's own topic.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menanyakan jalur, peron, dan kapan harus turun
 * - menanyakan apakah kereta atau bus ini menuju tempat tertentu
 * - menjelaskan bahwa akan terlambat, memberi tahu dari kendaraan
 * - ketinggalan kendaraan dan mencari jalan keluar
 * - meminta tukar tempat, meminta lewat, meminta bantuan membawa barang
 * - menanyakan tiket, isi ulang kartu, salah naik
 * - mengabarkan macet atau kendaraan yang tidak datang
 * - janji bertemu di stasiun dan menyesuaikan tempatnya
 * Tidak termasuk:
 * - berjalan di luar dan menanyakan arah, masuk ke `jalan`
 * - urusan yang dikerjakan setelah turun, masuk ke topik urusan itu
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'transportasi_percakapan_salah_peron', topic: 'transportasi',
    judulT: ['この', 'ホーム', 'で', '合っています', 'か'],
    jenis: 'percakapan',
    judul: 'Salah peron di stasiun besar', judulEn: 'The wrong platform at a big station',
    speakers: {'A':'orang_asing','B':'penumpang'},
    sit: 'Dua penumpang di peron, yang satu baru sadar salah peron', sitEn: 'Two passengers on a platform, one having just noticed the wrong platform',
    id: 'Penumpang yang salah peron bertanya, dan penumpang lain menjelaskan bahwa kereta di peron ini memang berhenti di stasiun yang sama, hanya lebih lama.', en: 'A passenger on the wrong platform asks, and another explains that the train here does stop at the same station, only more slowly.',
    note: 'Yang menentukan di sini bukan tata bahasanya, melainkan bahwa yang menjawab menenangkan dulu sebelum menjelaskan.',
    noteEn: 'What matters here is not the grammar but that the one answering calms the asker before explaining.',
    blocks: [
      { sp: 'A', id: 'Maaf, apakah saya benar di peron ini?', en: 'Excuse me, is this the right platform?', t: ['すみません、', 'この', 'ホーム', 'で', '合って', 'いますか。'] },
      { sp: 'B', id: 'Anda mau ke mana?', en: 'Where are you going?', t: ['どこ', 'まで', '行きます', 'か。'] },
      { sp: 'A', id: ['Saya mau ke Shinjuku.', 'Saya ingin naik yang cepat, jadi saya sedang buru-buru.'], en: ['To Shinjuku.', 'I want the rapid train, so I\'m in a hurry.'], t: ['新宿', 'まで', 'です。', '快速', 'に', '乗りたくて、', '急いで', 'います。'] },
      { sp: 'B', id: 'Kalau begitu, di peron ini sudah benar.', en: 'In that case, this platform is fine.', t: ['それ', 'なら、', 'この', 'ホーム', 'で', '大丈夫です', 'よ。'] },
      { sp: 'B', id: 'Hanya saja, kereta berikutnya kereta yang berhenti di semua stasiun, jadi tibanya sekitar lima belas menit lebih lambat.', en: 'However, the next train is a local that stops at every station, so you\'ll arrive about fifteen minutes later.', t: ['ただ、', '次の', '電車', 'は', '各駅停車', 'なので、', '着く', 'の', 'が', '十五分', 'ほど', '遅く', 'なります。'] },
      { sp: 'A', id: 'Saya tidak akan keburu, jadi peron kereta cepatnya di mana?', en: 'I won\'t make it in time, so which platform is the rapid one?', t: ['間に合わない', 'ので、', '快速', 'の', 'ホーム', 'は', 'どこ', 'ですか。'] },
      { sp: 'B', id: ['Di jalur dua.', 'Naik tangga, lalu lurus saja, nanti sampai.'], en: ['Platform two.', 'Go up the stairs and straight on, and you\'ll get there.'], t: ['二番線', 'です。', '階段', 'を', '上がって、', 'まっすぐ', '行くと', '着きます', 'よ。'] },
      { sp: 'A', id: ['Sangat membantu.', 'Terima kasih banyak.'], en: ['That\'s a big help.', 'Thank you very much.'], t: ['助かりました。', 'どうも', 'ありがとうございます。'] },
    ]
  },
  {
    key: 'transportasi_cerita_tertidur_lewat', topic: 'transportasi',
    judulT: ['寝', '過ご', 'して', '三つ', '先', 'の', '駅'],
    jenis: 'cerita',
    judul: 'Tertidur dan terlewat tiga stasiun', judulEn: 'Fell asleep and missed three stations',
    rel: 'rekan',
    sit: 'Menceritakan kejadian pagi tadi kepada rekan kerja', sitEn: 'Telling a colleague what happened this morning',
    id: 'Karena begadang, saya tertidur di kereta dan terlewat tiga stasiun, lalu harus kembali dan sampai kantor terlambat.', en: 'Having stayed up late, I fell asleep on the train and missed three stations, so I had to turn back and arrived late.',
    note: 'てしまい mengakui kesalahan sendiri, jadi yang mendengar langsung tahu ini kelalaian, bukan kecelakaan.',
    noteEn: 'てしまい owns the mistake, so the listener knows at once this was carelessness, not an accident.',
    blocks: [
      { id: 'Kemarin saya bekerja sampai malam, jadi pagi ini saya mengantuk sekali.', en: 'Yesterday I was working until late, so this morning I was desperately sleepy.', t: ['昨日', 'は', '夜遅く', 'まで', '仕事', 'を', 'して', 'いた', 'ので、', '今朝', 'は', '眠くて', '仕方ありません', 'でした。'] },
      { id: 'Begitu naik kereta saya langsung tertidur, dan waktu saya sadar saya sudah tiga stasiun kelewatan.', en: 'I fell asleep as soon as I got on the train, and by the time I noticed I was three stations past mine.', t: ['電車', 'に', '乗って', 'すぐに', '寝て', 'しまい、', '気が付いた', 'とき', 'に', 'は', '三つ', 'も', '先', 'の', '駅', 'でした。'] },
      { id: 'Saya turun dengan panik, tetapi kereta arah sebaliknya baru datang sepuluh menit kemudian.', en: 'I got off in a panic, but it took ten minutes for a train going the other way to come.', t: ['慌てて', '降り', 'た', 'の', 'です', 'が、', '反対', 'の', '電車', 'が', '来る', 'まで', '十分', 'かかり', 'ました。'] },
      { id: 'Akhirnya saya tiba di kantor setelah lewat jam sepuluh, dan tidak bisa ikut rapat dari awal.', en: 'In the end I got to the office after ten, and couldn\'t join the meeting from the start.', t: ['結局、', '会社', 'に', '着いた', 'のは', '十時', 'を', '過ぎて', 'から', 'で、', '会議', 'の', '最初', 'から', '出る', 'こと', 'が', 'で', 'きませんでした。'] },
    ]
  },
  {
    key: 'transportasi_kronologi_kereta_terakhir', topic: 'transportasi',
    judulT: ['終電', 'を', '追い', 'かけた', '話'],
    jenis: 'kronologi',
    judul: 'Kereta terakhir yang saya kejar', judulEn: 'The last train I ran for',
    rel: 'teman',
    sit: 'Menceritakan kejadian tadi malam, dari awal sampai akhir', sitEn: 'Recounting last night from start to finish',
    id: 'Enam menit sebelum kereta terakhir, saya keluar dari kantor, membeli tiket, berlari ke peron, dan berhasil naik tepat sebelum pintunya tertutup.', en: 'Six minutes before the last train, I left the office, bought a ticket, ran to the platform, and got on just before the doors closed.',
    note: 'Urutannya diikat ので, たら, dan とき, bukan それから, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by ので, たら and とき rather than それから, so each line explains the one before it.',
    blocks: [
      { id: 'Karena sadar kereta terakhir tinggal enam menit lagi, saya menyambar tas dan langsung berlari.', en: 'Realising there were only six minutes left until the last train, I grabbed my bag and just ran.', t: ['終電', 'まで', 'あと', '六分', 'しか', 'ない', 'と', '気が付いた', 'ので、', '鞄', 'を', '掴んで', 'そのまま', '走り', 'ました。'] },
      { id: 'Waktu mencari kartu langganan di depan gerbang, ternyata ada di dasar tas, dan itu memakan tiga puluh detik lagi.', en: 'When I looked for my commuter pass in front of the gate, it was at the bottom of my bag, and that cost another thirty seconds.', t: ['改札', 'の', '前', 'で', '定期券', 'を', '探し', 'たら、', '鞄', 'の', '底', 'に', 'あって、', 'それで', 'また', '三十秒', 'かかりました。'] },
      { id: 'Saat saya naik tangga, di peron terdengar pengumuman bahwa pintu akan ditutup.', en: 'As I went up the stairs, an announcement came over the platform that the doors were closing.', t: ['階段', 'を', '上がった', 'とき', 'に、', 'ホーム', 'に', '「', '扉', 'が', '閉まり', 'ます」', 'と', '放送', 'が', '流れました。'] },
      { id: 'Saya melompat masuk benar-benar di saat terakhir, sampai pintunya menyentuh punggung saya.', en: 'I jumped on at the very last moment, so close that the door touched my back.', t: ['飛び乗っ', 'た', 'のは', '本当に', 'ぎりぎり', 'で、', '扉', 'が', '背中', 'に', '触り', 'ました。'] },
      { id: 'Karena semua kursinya terisi, saya berdiri sambil memegang pegangan selama lima belas menit.', en: 'All the seats were taken, so I stood holding the strap for fifteen minutes.', t: ['座席', 'が', '全部', '埋まって', 'いた', 'ので、', '十五分', 'ずっと', '吊り革', 'を', '握って', '立って', 'いました。'] },
    ]
  },
  {
    key: 'transportasi_curhatan_macet_tiap_hari', topic: 'transportasi',
    judulT: ['毎朝', '同じ', '渋滞'],
    jenis: 'curhatan',
    judul: 'Macet yang sama setiap pagi', judulEn: 'The same traffic every morning',
    rel: 'teman_dekat',
    sit: 'Mengeluh ke teman dekat, tanpa meminta saran', sitEn: 'Venting to a close friend without asking for advice',
    id: 'Setiap pagi bus saya terjebak macet yang sama, dan hari ini bahkan lebih parah, tetapi saya tidak ingin saran, hanya ingin mengeluh.', en: 'Every morning my bus gets stuck in the same traffic, and today it was even worse, but I do not want advice, only to complain.',
    note: 'Bentuk biasa dan tanpa tawaran solusi: itu yang membedakan curhatan dari keluhan resmi.',
    noteEn: 'Plain style with no offer of a solution: that is what separates venting from a formal complaint.',
    blocks: [
      { id: 'Hari ini busnya sama sekali tidak bergerak lagi, saya sampai tiga puluh menit di tempat yang sama.', en: 'The bus didn\'t move at all again today, and I sat in the same spot for a full thirty minutes.', t: ['また', '今日', 'も', 'バス', 'が', '全然', '動かなくて、', '三十分', 'も', '同じ', '場所', 'に', 'いた', 'んだ', 'よ。'] },
      { id: 'Untuk melewati tiga lampu lalu lintas saja selalu begini, jadi saya sudah merasa terbiasa, tetapi hari ini saya benar-benar kewalahan.', en: 'It\'s always like this just to get through three sets of lights, so I thought I\'d got used to it, but today really did me in.', t: ['信号', '三つ', '分', 'を', '進む', 'のに、', 'いつも', 'これ', 'だから、', 'もう', '慣れた', 'と', '思っていた', 'ん', 'だけど、', '今日', 'は', 'さすがに', '参っ', 'た。'] },
      { id: 'Orang di kursi depan menelepon dengan suara keras terus, jadi waktu turun saya sudah lemas sekali.', en: 'The person in the seat in front was on the phone in a loud voice the whole time, so by the time I got off I was worn out.', t: ['前', 'の', '席', 'の', '人', 'が', 'ずっと', '大きい', '声', 'で', '電話', 'して', 'いて、', '降りる', 'ころ', 'に', 'は', 'もう', 'ぐったり', 'だ', 'よ。'] },
      { id: 'Seharusnya saya berangkat lebih awal, tetapi pagi selalu tidak bisa bangun, dan ini benar-benar menyebalkan.', en: 'I suppose I should leave earlier, but I just can\'t get up in the morning, and it\'s genuinely miserable.', t: ['早く', '出れば', 'いい', 'ん', 'だろう', 'けど、', '朝', 'は', 'どう', 'しても', '起きられ', 'ない', 'し、', '本当に', '嫌', 'に', 'なる。'] },
      { id: 'Bukannya ingin masalahnya diselesaikan, saya hanya ingin didengarkan saja.', en: 'It\'s not that I want it solved, I just want someone to hear about it.', t: ['別に', '解決', 'して', 'ほしい', 'わけ', 'じゃない', 'から、', 'ただ', '聞いて', 'ほしい', 'だけ', 'なん', 'だけど', 'ね。'] },
    ]
  },
  {
    key: 'transportasi_keluhan_delay_tanpa_kabar', topic: 'transportasi',
    judulT: ['何も', '案内', 'が', 'ありません', 'でした'],
    jenis: 'keluhan',
    judul: 'Keterlambatan yang tidak diumumkan', judulEn: 'A delay nobody announced',
    rel: 'petugas_stasiun',
    sit: 'Menyampaikan keluhan ke petugas stasiun, dengan permintaan yang jelas', sitEn: 'Complaining to station staff, with a clear request',
    id: 'Kereta terlambat empat puluh menit tanpa pengumuman, dan saya meminta surat keterangan keterlambatan untuk kantor.', en: 'The train was forty minutes late with no announcement, and I am asking for a delay certificate for my office.',
    note: 'Keluhan yang bisa ditindaklanjuti menyebut kejadian, akibatnya, lalu permintaannya, dalam urutan itu.',
    noteEn: 'An actionable complaint states what happened, what it cost, then what is being asked, in that order.',
    blocks: [
      { id: 'Maaf, saya ingin menanyakan soal kereta pagi ini.', en: 'Excuse me, I\'d like to ask about this morning\'s train.', t: ['すみません、', '今朝', 'の', '電車', 'の', 'こと', 'で', 'お伺い', 'したい', 'の', 'です', 'が。'] },
      { id: 'Kereta cepat jam delapan terlambat empat puluh menit, tetapi di peron tidak ada pengumuman apa pun.', en: 'The eight o\'clock rapid was forty minutes late, but there was no announcement at all on the platform.', t: ['八時', 'の', '快速', 'が', '四', '十分', '遅れた', 'のに、', 'ホーム', 'で', '何も', '案内', 'が', 'ありません', 'でした。'] },
      { id: 'Akibatnya saya tidak bisa mengikuti rapat pagi di kantor.', en: 'Because of that I couldn\'t attend the morning meeting at work.', t: ['その', 'せい', 'で、', '会社', 'の', '朝', 'の', '会議', 'に', '出る', 'こと', 'が', 'で', 'きませんでした。'] },
      { id: ['Bisa saya minta surat keterangan keterlambatan?', 'Saya perlu menyerahkannya ke kantor.'], en: ['Could I have a delay certificate?', 'I need to submit it to my company.'], t: ['遅延証明書', 'を', 'いただけますか。', '会社', 'に', '出す', '必要', 'が', 'ある', 'の', 'です。'] },
      { id: 'Selain itu, lain kali akan sangat membantu kalau pengumumannya juga disampaikan di peron.', en: 'Also, from next time it would help if you could make announcements on the platform as well.', t: ['それ', 'と、', '次', 'から', 'は', 'ホーム', 'に', 'も', '放送', 'を', '入れて', 'いただける', 'と', '助かります。'] },
    ]
  },
  {
    key: 'transportasi_penjelasan_cara_beli_tiket', topic: 'transportasi',
    judulT: ['切符', 'の', '買い方'],
    jenis: 'penjelasan',
    judul: 'Cara membeli tiket di mesin', judulEn: 'How to buy a ticket from the machine',
    rel: 'orang_asing',
    sit: 'Menjelaskan cara membeli tiket kepada orang yang baru pertama ke Jepang', sitEn: 'Explaining how to buy a ticket to someone new to Japan',
    id: 'Mesin tiket bekerja dengan tiga langkah, dan kalau uangnya kurang, mesin penyesuaian di gerbang keluar yang menyelesaikannya.', en: 'The ticket machine works in three steps, and if you are short of money the fare adjustment machine at the exit sorts it out.',
    note: 'Penjelasan yang berguna menyebut sebab tiap langkah, bukan hanya urutannya.',
    noteEn: 'A useful explanation gives the reason for each step, not just the order.',
    blocks: [
      { id: 'Pertama, carilah tujuan Anda pada peta di atas.', en: 'First, look for your destination on the map above.', t: ['まず、', '上の', '地図', 'から', '行き先', 'を', '探して', 'ください。'] },
      { id: 'Harganya berbeda menurut stasiunnya, jadi sebaiknya bukan hanya nama stasiunnya, tetapi warna jalurnya juga diperhatikan supaya pasti.', en: 'The price differs by station, so it\'s more reliable to check not just the station name but the line colour as well.', t: ['値段', 'は', '駅', 'によって', '変わる', 'ので、', '駅', 'の', '名前', 'だけで', 'なく、', '線', 'の', '色', 'も', '見た', '方', 'が', '確か', 'です。'] },
      { id: ['Setelah itu, masukkan uangnya, dan tiketnya akan keluar.', 'Uang kembaliannya juga keluar bersama.'], en: ['After that, put your money in and the ticket comes out.', 'Your change comes out with it.'], t: ['次', 'に、', 'お金', 'を', '入れる', 'と', '切符', 'が', '出て', 'きます。', 'お釣り', 'も', '一緒に', '出ます。'] },
      { id: ['Kalau uangnya kurang pun tidak perlu khawatir.', 'Cukup dibayar di mesin penyesuaian di dekat pintu keluar, jadi tidak perlu mengantre dua kali.'], en: ['If you don\'t have enough, there\'s no need to worry.', 'You can pay the difference at the adjustment machine by the exit, so you don\'t have to queue again.'], t: ['もし', '足り', 'なくて', 'も', '心配', 'いりません。', '出口', 'の', '精算機', 'で', '払え', 'ば', 'いい', 'ので、', 'もう一度', '並ぶ', '必要', 'は', 'ありません。'] },
      { id: 'Kalau tiketnya hilang, cukup bilang kepada petugas di gerbang, dan Anda tidak perlu membayar ulang dari awal.', en: 'If you lose your ticket, just tell the staff at the gate and you won\'t have to pay again from the start.', t: ['切符', 'を', '無くした', '場合', 'は、', '改札', 'の', '係', 'の', '人', 'に', '言え', 'ば', '最初', 'から', '払い', '直さ', 'なくて', 'も', '済み', 'ます。'] },
    ]
  },
  {
    key: 'transportasi_laporan_terlambat_dari_kendaraan', topic: 'transportasi',
    judulT: ['経路', 'を', '変えます'],
    jenis: 'laporan',
    judul: 'Mengabarkan pindah jalur dari dalam bus', judulEn: 'Reporting a change of route from inside the bus',
    rel: 'atasan',
    sit: 'Mengabarkan bahwa bus berhenti lalu memilih turun dan pindah jalur', sitEn: 'Reporting that the bus stopped and that I got off to take another route',
    id: 'Saya mengabarkan bahwa bus berhenti karena kecelakaan, memutuskan turun dan mencari jalur lain, dan menyebut tempat saya akan tiba.', en: 'I report that the bus stopped because of an accident, that I decided to get off and find another route, and where I will arrive.',
    note: 'Laporan seperti ini berguna karena menyebut keputusan yang sudah diambil dan tempatnya, bukan hanya bahwa terlambat.',
    noteEn: 'A report like this is useful because it gives the decision already taken and the place, not merely that I am late.',
    blocks: [
      { id: ['Selamat pagi.', 'Saya menelepon dari dalam bus, jalurnya saya ubah.'], en: ['Good morning.', 'I\'m calling from inside the bus, I\'m changing my route.'], t: ['おはようございます。', 'バス', 'の', '中', 'から', 'ですが、', '経路', 'を', '変え', 'ます。'] },
      { id: 'Di depan ada kecelakaan, dan busnya sudah tidak bergerak lebih dari sepuluh menit.', en: 'There\'s been an accident up ahead and the bus hasn\'t moved for over ten minutes.', t: ['この', '先', 'で', '事故', 'が', 'あって、', 'バス', 'が', '十分', '以上', '動いて', 'いません。'] },
      { id: 'Karena lebih cepat daripada menunggu, saya turun di halte sebelumnya dan pindah ke kereta.', en: 'Since that\'s faster than waiting, I\'ll get off at the previous stop and switch to the train.', t: ['待つ', 'より', '早い', 'ので、', '一つ前', 'の', '停留所', 'で', '降りて、', '電車', 'に', '乗り換え', 'ます。'] },
      { id: 'Kalau naik kereta, saya tiba di dekat kantor sekitar jam setengah sepuluh.', en: 'By train I\'ll arrive near the office around half past nine.', t: ['電車', 'なら、', '会社', 'の', '最寄り', 'に', '九時半', 'ごろ', '着き', 'ます。'] },
      { id: 'Begitu tiba saya hubungi lagi, jadi tolong biarkan tempatnya kosong sampai itu.', en: 'I\'ll get in touch again once I arrive, so please leave the seat empty until then.', t: ['着いたら', '改めて', 'ご連絡', 'します', 'ので、', 'それ', 'まで', '席', 'を', '外して', 'おいて', 'ください。'] },
    ]
  },
  {
    key: 'transportasi_rencana_perjalanan_akhir_pekan', topic: 'transportasi',
    judulT: ['週末', 'の', '移動', 'を', 'どう', 'する', 'か'],
    jenis: 'rencana',
    judul: 'Rencana perjalanan akhir pekan', judulEn: 'Planning a weekend trip',
    rel: 'pasangan',
    sit: 'Menyusun rencana perjalanan berdua, dengan pilihan yang dibandingkan', sitEn: 'Planning a trip together, comparing two options',
    id: 'Kami membandingkan kereta cepat yang mahal dan bus yang murah tetapi lama, lalu memutuskan berangkat lebih pagi dengan kereta agar tidak kelelahan.', en: 'We compared the fast train that costs more with the slow cheap bus, and decided to take the earlier train so we would not arrive exhausted.',
    note: 'Rencana yang berguna menyebut harga dan waktu kedua pilihan, bukan hanya pilihannya.',
    noteEn: 'A useful plan states the cost and the time of both options, not just the choice.',
    blocks: [
      { id: 'Kalau berangkat Sabtu pagi, ada dua pilihan: kereta cepat dan bus antarkota.', en: 'If we set off Saturday morning, there are two options: the bullet train and the long-distance bus.', t: ['土曜', 'の', '朝', 'に', '出る', 'なら、', '新幹線', 'と', '高速バス', 'の', '二つ', 'が', 'あります。'] },
      { id: 'Kereta cepat sampai dalam satu setengah jam, tetapi kalau memesan tempat duduk harganya sekitar delapan ribu yen.', en: 'The bullet train arrives in an hour and a half, but with a reserved seat it costs about eight thousand yen.', t: ['新幹線', 'は', '一時間', '半', 'で', '着きます', 'が、', '指定席', 'だと', '八千円', 'くらい', 'かかります。'] },
      { id: ['Busnya separuh harga.', 'Hanya saja, perlu empat jam, dan sebelum hari libur panjang jalannya padat, jadi waktu tibanya tidak bisa diperkirakan.'], en: ['The bus is half the price.', 'However, it takes four hours, and before a long weekend the roads get busy, so you can\'t count on the arrival time.'], t: ['バス', 'は', '半額', 'です。', 'ただ、', '四時間', 'かかる', 'うえ', 'に、', '連休', 'の', '前', 'は', '道', 'が', '混む', 'ので、', '着く', '時間', 'が', '読めません。'] },
      { id: 'Kalau ingin langsung berkeliling di hari kedatangan, memilih yang murah itu berisiko.', en: 'If you want to walk around on the day you arrive, choosing the cheaper one is risky.', t: ['着いた', '日', 'に', '歩き回り', 'たい', 'なら、', '安い', '方', 'を', '選ぶ', 'のは', '危ない', 'と', '思います。'] },
      { id: 'Jadi, bagaimana kalau berangkatnya naik kereta cepat, dan pulangnya saja naik bus?', en: 'So how about taking the fast bullet train on the way there, and the bus only on the way back?', t: ['だから、', '行き', 'は', '早い', '新幹線', 'に', 'して、', '帰り', 'だけ', 'バス', 'に', 'する', 'のは', 'どう', 'でしょうか。'] },
    ]
  },
  {
    key: 'transportasi_nasihat_kartu_isi_ulang', topic: 'transportasi',
    judulT: ['先に', 'チャージ', 'して', 'おく', 'こと'],
    jenis: 'nasihat',
    judul: 'Saran sebelum kartu isi ulangnya habis', judulEn: 'Advice before your travel card runs out',
    rel: 'teman',
    sit: 'Mengingatkan teman supaya tidak terjebak di gerbang tiket', sitEn: 'Warning a friend so they are not stuck at the ticket gate',
    id: 'Saya menyarankan mengisi kartu sebelum masuk gerbang, karena saldo tidak bisa diisi di dalam dan antrean pagi sangat panjang.', en: 'I suggest topping up the card before going through the gate, because it cannot be topped up inside and the morning queue is very long.',
    note: 'Nasihat yang berguna menyebut akibat yang nyata, bukan hanya perintah.',
    noteEn: 'Useful advice names the real consequence, not just the instruction.',
    blocks: [
      { id: 'Besok pagi, begitu sampai di stasiun, sebaiknya isi uang ke kartunya dulu.', en: 'Tomorrow morning, when you get to the station, you\'d better put money on your card first.', t: ['明日', 'の', '朝', 'は、', '駅', 'に', '着いたら、', 'まず', 'カード', 'に', 'お金', 'を', '入れ', 'た', '方', 'が', 'いい', 'よ。'] },
      { id: 'Kalau sisanya sedikit, Anda akan tertahan di gerbang, dan orang di belakang menyuruh cepat.', en: 'If the balance is low you\'ll be stopped at the gate, and the people behind you will hurry you along.', t: ['残り', 'が', '少ない', 'と、', '改札', 'で', '止まって', 'しまい、', '後ろ', 'の', '人', 'に', '急かされる', 'から', 'だ', 'よ。'] },
      { id: 'Bahkan, di dalam gerbang tidak ada tempat untuk mengisi ulang.', en: 'And there\'s no place to top up inside the gates.', t: ['しかも、', '改札', 'の', '中', 'に', 'チャージ', 'できる', '場所', 'は', 'ない', 'んだ。'] },
      { id: 'Sekitar jam delapan loketnya sangat ramai, jadi walau baru sadar di dalam saldonya kurang, Anda harus mengantre lagi.', en: 'The ticket windows are very crowded around eight, so even if you only notice inside that you\'re short, you\'ll have to queue again.', t: ['八時', 'ごろ', 'の', '窓口', 'は', 'とても', '混む', 'ので、', '中', 'で', '足りない', 'と', '気が付い', 'て', 'も、', '並び', '直す', 'こと', 'に', 'なる', 'よ。'] },
      { id: 'Cukup isi seribu yen lebih dulu, dan besok pagi Anda tidak perlu berlari.', en: 'If you put even a thousand yen on it in advance, you won\'t have to run tomorrow morning.', t: ['千円', 'だけ', 'でも', '先に', '入れて', 'おけば、', '明日', 'の', '朝', 'は', '走ら', 'なくて', '済む', 'から', 'ね。'] },
    ]
  },
  {
    key: 'transportasi_permintaan_ganti_kursi', topic: 'transportasi',
    judulT: ['席', 'を', '替えて', 'いただけますか'],
    jenis: 'permintaan',
    judul: 'Meminta tukar kursi di kereta', judulEn: 'Asking to swap seats on the train',
    rel: 'orang_asing',
    sit: 'Meminta tukar kursi karena satu rombongan ingin duduk bersama', sitEn: 'Asking to swap seats because a group wants to sit together',
    id: 'Saya meminta tukar kursi karena anak-anak ingin duduk bersama, dan saya menyebutkan alasan serta menawarkan kursi saya lebih dulu.', en: 'I ask to swap seats because the children want to sit together, giving my reason and offering my own seat first.',
    note: '小さくて申し訳ない tetapi menurunkan kesan menuntut, dan itu yang membuat permintaan seperti ini diterima.',
    noteEn: '小さくて申し訳ない tetapi softens the request and is what makes it likely to be granted.',
    blocks: [
      { id: 'Maaf, ada satu hal yang ingin saya minta.', en: 'Excuse me, there\'s one thing I\'d like to ask.', t: ['すみません、', '一つ', 'お願い', 'が', 'ある', 'の', 'です', 'が。'] },
      { id: 'Anak-anak ingin duduk bersebelahan, bisakah tempat duduknya ditukar?', en: 'The children want to sit together, so could we swap seats?', t: ['子供', 'たち', 'が', '隣', 'に', '座りたくて、', '席', 'を', '替えて', 'いただけない', 'でしょうか。'] },
      { id: 'Kursi saya yang di sisi jendela sebelah sana, dan bawaan saya sedikit, jadi pindahnya bisa cepat.', en: 'My seat is the window seat over there, and I don\'t have much luggage, so I can move straight away.', t: ['私', 'の', '席', 'は', 'そちら', 'の', '窓側', 'で、', '荷物', 'も', '少ない', 'ので、', '移動', 'は', 'すぐに', 'できます。'] },
      { id: 'Jaraknya hanya dua kursi, jadi tidak akan merepotkan.', en: 'They\'re only two seats apart, so it won\'t be any trouble.', t: ['二つ', 'しか', '離れ', 'て', 'いない', 'ので、', 'お手数', 'は', 'かけ', 'ませ', 'ん。'] },
      { id: 'Kalau memang tidak memungkinkan, tentu saja boleh menolak.', en: 'If it doesn\'t suit you, of course it\'s quite all right to say no.', t: ['もし', 'ご都合', 'が', '悪ければ、', 'もちろん', '断っていただいて', '大丈夫です。'] },
    ]
  },
  {
    key: 'transportasi_pengalaman_salah_naik_shinkansen', topic: 'transportasi',
    judulT: ['新幹線', 'を', '間違えた', '話'],
    jenis: 'pengalaman',
    judul: 'Pernah naik shinkansen yang salah arah', judulEn: 'The time I took the shinkansen the wrong way',
    rel: 'klien',
    sit: 'Menceritakan pengalaman memalukan kepada klien, sebagai bahan percakapan', sitEn: 'Telling a client about an embarrassing experience as conversation',
    id: 'Saya pernah naik shinkansen arah berlawanan, baru sadar dua puluh menit kemudian, dan sejak itu selalu memeriksa papan keberangkatan dua kali.', en: 'I once boarded a shinkansen going the other way, only realised twenty minutes later, and since then I always check the departure board twice.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: kejadiannya, kesalahan yang disadari, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: what happened, when the mistake was realised, and what changed afterwards.',
    blocks: [
      { id: 'Dulu, waktu perjalanan dinas, saya pernah salah naik kereta cepat.', en: 'Once, on a business trip, I got on the wrong bullet train.', t: ['昔、', '出張', 'の', 'とき', 'に', '新幹線', 'を', '間違えた', 'こと', 'が', 'あります。'] },
      { id: 'Sesampai di peron, saya langsung naik kereta yang datang, dan tidak memastikan arahnya.', en: 'When I reached the platform I got straight onto the train that had arrived, and hadn\'t checked the direction.', t: ['ホーム', 'に', '着い', 'て、', '来た', '電車', 'に', 'そのまま', '乗っ', 'た', 'の', 'です', 'が、', '方向', 'を', '確かめて', 'いませんでした。'] },
      { id: 'Setelah sekitar dua puluh menit, waktu saya sadar pemandangan di luar jendela terbalik, saya sudah berada di posisi yang butuh satu jam untuk kembali.', en: 'About twenty minutes later, when I noticed the scenery outside the window was the wrong way round, I was already an hour away from turning back.', t: ['二十分', 'ほど', '経って、', '窓', 'の', '外', 'の', '景色', 'が', '逆', 'だと', '気が付いた', 'とき', 'は、', 'もう', '戻る', 'のに', '一時間', 'かかる', 'ところ', 'でした。'] },
      { id: 'Waktu saya konsultasi dengan kondekturnya, dia memberi tahu perpindahan di stasiun berikutnya, dan akhirnya saya masih bisa ikut rapat.', en: 'When I asked the conductor, they told me where to change at the next station, and I just about made the meeting.', t: ['車掌', 'さん', 'に', '相談', 'したら、', '次の駅', 'で', '乗り換え', 'を', '教えて', 'くれて、', 'それで', '何', 'と', 'か', '会議', 'に', '間に合い', 'ました。'] },
      { id: ['Sejak itu, saya jadi terbiasa melihat papan elektronik di peron dua kali.', 'Berkat itu, kesalahan itu hanya terjadi sekali.'], en: ['Since then I\'ve got into the habit of looking at the platform display twice.', 'Thanks to that, that mistake happened only once.'], t: ['あれ', 'から、', 'ホーム', 'の', '電光掲示板', 'を', '二度', '見る', '癖', 'が', 'つきました。', 'おかげで、', 'あの', '失敗', 'は', '一度', 'きり', 'です。'] },
    ]
  },
  {
    key: 'transportasi_pengumuman_di_dalam_kereta', topic: 'transportasi',
    judulT: ['車', '内で', 'のお知らせ'],
    jenis: 'pengumuman',
    judul: 'Pengumuman di dalam kereta', judulEn: 'An announcement inside the train',
    rel: 'penumpang',
    sit: 'Pengumuman dari petugas kereta kepada seluruh penumpang', sitEn: 'An announcement from the conductor to everyone on board',
    id: 'Kereta ini akan berhenti lebih lama di stasiun berikutnya karena ada pemeriksaan, dan penumpang yang ingin turun di stasiun itu diminta bersiap.', en: 'This train will stop longer at the next station for an inspection, and passengers getting off there are asked to get ready.',
    note: 'Pengumuman menyebut akibatnya lebih dulu, baru apa yang diminta, karena pendengar memutuskan dalam dua detik apakah ini urusannya.',
    noteEn: 'An announcement states the consequence first and the request second, because the listener decides in two seconds whether it concerns them.',
    blocks: [
      { id: 'Kepada para penumpang, ada pengumuman.', en: 'An announcement for our passengers.', t: ['ご', '乗車', 'の', 'お客様', 'に', 'お知らせ', 'いたします。'] },
      { id: 'Kereta ini di stasiun berikutnya akan berhenti sekitar lima menit lebih lama dari biasanya, untuk pemeriksaan rangkaian.', en: 'At the next station this train will stop for about five minutes longer than usual, for an inspection of the carriages.', t: ['この', '電車', 'は、', '次の駅', 'で、', '車両', 'の', '点検', 'の', 'ため、', 'いつも', 'より', '五分', 'ほど', '長く', '止まります。'] },
      { id: 'Kami mohon maaf atas ketidaknyamanannya bagi Anda yang sedang buru-buru.', en: 'We apologise for the inconvenience to those in a hurry.', t: ['お急ぎ', 'の', 'ところ、', 'ご迷惑', 'を', 'おかけ', 'いたします。'] },
      { id: 'Penumpang yang akan turun di stasiun berikutnya, silakan membawa barang Anda dan menunggu di dekat pintu.', en: 'Passengers getting off at the next station, please take your belongings and wait near the doors.', t: ['次の駅', 'で', 'お降り', 'に', 'なる', 'お客様', 'は、', 'お荷物', 'を', '持って、', '扉', 'の', '近く', 'で', 'お待ちください。'] },
      { id: 'Petunjuk perpindahan akan kami sampaikan setelah tiba di peron.', en: 'We will announce connecting services once we arrive at the platform.', t: ['乗り換え', 'の', 'ご案内', 'は、', 'ホーム', 'に', '着い', 'て', 'から', '放送', 'いたします。'] },
    ]
  },
]);
