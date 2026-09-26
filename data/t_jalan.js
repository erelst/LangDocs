/* Jalan: on foot, outside, on the way somewhere.
 *
 * Being inside a vehicle is transportasi and a planned outing is santai; this file is what is
 * said while walking.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menanyakan arah ke orang yang tidak dikenal, dan memberi arah
 * - berpapasan dengan orang yang dikenal dan berbasa-basi
 * - menunggu di luar, mengabarkan bahwa sudah sampai
 * - menyesuaikan rencana karena cuaca saat berjalan
 * - mengantar dan menjemput, menanyakan sudah di mana
 * - mengeluh cuaca saat berjalan, memuji cuaca
 * Tidak termasuk:
 * - di dalam kendaraan, masuk ke `transportasi`
 * - acara waktu luang yang sudah direncanakan, masuk ke `santai`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'jalan_percakapan_tanya_arah_toko', topic: 'jalan', jenis: 'percakapan',
    judulT: ['郵便局', 'は', 'どこ', 'ですか'],
    judul: 'Menanyakan arah ke kantor pos', judulEn: 'Asking the way to the post office',
    speakers: {'A':'orang_asing','B':'tetangga'},
    sit: 'Menanyakan arah ke orang yang lewat, dan diberi arah', sitEn: 'Asking a passer-by for directions and being given them',
    id: 'Saya menanyakan kantor pos, dan orang itu menerangkan belok kanan di persimpangan kedua sambil menyebut penandanya.',
    en: 'I ask for the post office, and the person tells me to turn right at the second corner while naming the landmark.',
    note: 'Yang membuat arah berguna adalah penandanya disebut: persimpangan kedua punya lampu lalu lintas, jadi yang mencari tidak salah belok.',
    noteEn: 'What makes directions useful is that the landmark is named: the second corner has a traffic light, so the asker does not turn too early.',
    blocks: [
      { sp: 'A', id: 'Maaf, di sekitar sini ada kantor pos?', en: 'Excuse me, is there a post office around here?', t: ['すみません', '、', 'この', 'あたり', 'に', '郵便局', 'は', 'あります', 'か', '。'] },
      { sp: 'B', id: ['Kantor pos, ya?', 'Lurus saja jalan ini, lalu belok kanan di tikungan kedua.'], en: ['A post office?', 'Go straight along this road, then turn right at the second corner.'], t: ['郵便局', 'です', 'か', '。', 'この', '道', 'を', 'まっすぐ', '行って', '、', '二つ目', 'の', '角', 'を', '右', 'に', '曲がって', 'ください', '。'] },
      { sp: 'A', id: ['Tikungan kedua, ya?', 'Ada penandanya?'], en: ['The second corner, right?', 'Is there a landmark?'], t: ['二つ目', 'の', '角', 'です', 'ね', '。', '目印', 'は', 'あります', 'か', '。'] },
      { sp: 'B', id: ['Karena simpangannya besar, ada lampu lalu lintasnya.', 'Kalau sudah belok, akan terlihat di sebelah kiri.'], en: ['It\'s a big intersection, so there are traffic lights.', 'Once you turn, you\'ll see it on the left.'], t: ['大きい', '交差点', 'な', 'ので', '、', '信号', 'が', 'あります', '。', '曲がる', 'と', '、', '左側', 'に', '見えて', 'き', 'ます', 'よ', '。'] },
      { sp: 'A', id: 'Kalau jalan kaki, kira-kira berapa lama?', en: 'About how long does it take on foot?', t: ['歩いて', 'どの', 'くらい', 'です', 'か', '。'] },
      { sp: 'B', id: ['Tidak sampai lima menit.', 'Tapi karena jalannya menanjak, mungkin agak panas.'], en: ['Less than five minutes.', 'But the road goes uphill, so it might be a bit hot.'], t: ['五分', 'も', 'かかり', 'ません', '。', '坂', 'を', '上る', 'ので', '、', '少し', '暑い', 'かもしれません', 'が', '。'] },
      { sp: 'A', id: ['Baiklah.', 'Terima kasih.'], en: ['I see.', 'Thank you.'], t: ['わかりました', '。', 'ありがとう', 'ございます', '。'] },
    ]
  },
  {
    key: 'jalan_cerita_tersesat_di_perumahan', topic: 'jalan', jenis: 'cerita',
    judulT: ['夜', 'の', '住宅街', 'で', '道', 'に', '迷った', '話'],
    judul: 'Tersesat di perumahan waktu malam', judulEn: 'Lost in a residential area at night',
    rel: 'teman',
    sit: 'Menceritakan kejadian waktu mencari rumah teman', sitEn: 'Recounting what happened while looking for a friend\'s house',
    id: 'Saya tersesat di perumahan karena rumahnya mirip semua, lalu seorang yang lewat menemani saya sampai dekat rumah itu.',
    en: 'I got lost in a residential area because the houses all look alike, and a passer-by walked me most of the way there.',
    note: 'Nomor rumah di Jepang mengikuti urutan blok, bukan urutan jalan, dan itu sebabnya peta pun tidak menolong.',
    noteEn: 'Japanese house numbers follow block order rather than street order, which is why even a map did not help.',
    blocks: [
      { id: 'Tadi malam, saya berjalan di kawasan perumahan mencari rumah teman, tetapi rumah-rumahnya sama bentuk dan berderet, sampai saya tidak tahu lagi saya ada di mana.', en: 'Last night I was walking through a residential area looking for a friend\'s house, but the houses were all the same shape in a row, and I lost track of where I was.', t: ['昨日', 'の', '夜', '、', '友達', 'の', '家', 'を', '探して', '住宅街', 'を', '歩いて', 'いた', 'の', 'です', 'が', '、', '同じ', '形', 'の', '家', 'が', '続いて', '、', '自分', 'が', 'どこ', 'に', 'いる', 'の', 'か', '分からなくなりました', '。'] },
      { id: 'Padahal alamatnya sudah saya tahu, tetapi karena nomor rumahnya ditentukan oleh urutan bangunan, bukan oleh jalannya, melihat peta pun saya tidak paham.', en: 'I knew the address, but because the house numbers are decided by the order of the buildings rather than by the road, looking at the map didn\'t help either.', t: ['住所', 'は', '分かって', 'いた', 'のに', '、', '番地', 'が', '道', 'で', 'は', 'なく', '建物', 'の', '並び順', 'で', '決まって', 'いる', 'ので', '、', '地図', 'を', '見', 'て', 'も', '分かり', 'ません', 'でした', '。'] },
      { id: 'Karena baterai ponsel saya habis, terpaksa saya bertanya kepada orang yang lewat.', en: 'My phone battery had run out, so I had no choice but to ask someone passing by.', t: ['スマホ', 'の', '充電', 'が', '切れて', 'いた', 'ので', '、', '仕方なく', '通りがかり', 'の', '人', 'に', '聞き', 'ました', '。'] },
      { id: 'Orang itu baik sekali, ikut berjalan bersama saya sampai sebagian jalan, dan memberi tahu bahwa rumahnya ada di tikungan ini, bangunan ketiga.', en: 'The person was very kind and walked part of the way with me, telling me it was the third house at this corner.', t: ['親切な', '人', 'が', '、', '途中', 'まで', '一緒に', '歩いて', 'くれて', '、', 'この', '曲がり角', 'の', '三軒目', 'です', 'と', '教えて', 'くれました', '。'] },
      { id: 'Saya putuskan, lain kali kalau mengunjungi rumah orang, akan berangkat supaya tiba sebelum gelap.', en: 'I decided that when visiting someone\'s house, I\'ll set out so I arrive before it gets dark.', t: ['人', 'の', '家', 'を', '訪ねる', 'とき', 'は', '、', '暗く', 'なる', '前', 'に', '着く', 'ように', 'しよう', 'と', '決め', 'ました', '。'] },
    ]
  },
  {
    key: 'jalan_kronologi_dari_stasiun_ke_rumah', topic: 'jalan', jenis: 'kronologi',
    judulT: ['駅', 'から', '家', 'まで', '歩いた', '道', 'の', 'り'],
    judul: 'Berjalan dari stasiun ke rumah', judulEn: 'Walking from the station to the house',
    rel: 'teman',
    sit: 'Menceritakan urutan perjalanan jalan kaki, dengan pilihan di tengah jalan', sitEn: 'Recounting a walk in order, with a choice made along the way',
    id: 'Saya memilih jalan yang lebih jauh tetapi berlampu karena hari mulai gelap, dan sampai tanpa tersesat walau lima belas menit lebih lama.',
    en: 'I chose the longer but lit route because it was getting dark, and arrived without getting lost, fifteen minutes later.',
    note: 'Urutannya diikat ので, たら, dan と, jadi tiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by ので, たら and と, so each line explains the one before it.',
    blocks: [
      { id: 'Saya keluar dari stasiun jam enam, dan karena masih terang, saya putuskan berjalan kaki.', en: 'I left the station at six, and since it was still light, I decided to walk.', t: ['駅', 'を', '出た', 'の', 'は', '六時', 'で', '、', 'まだ', '明るかった', 'ので', '、', '歩いて', '行く', 'こと', 'に', 'しました', '。'] },
      { id: 'Setelah beberapa lama menyusuri jalan besar, di tengah ada taman, dan di situ jalannya bercabang dua.', en: 'After walking a while along the main road, there was a park in the middle, and there the road split in two.', t: ['大通り', 'を', 'しばらく', '歩いたら', '、', '途中', 'に', '公園', 'が', 'あって', '、', 'そこ', 'で', '道', 'が', '二つ', 'に', '分かれ', 'ました', '。'] },
      { id: 'Yang dekat jalannya sempit, yang jauh jalannya lebar.', en: 'The nearer one was a narrow path, the farther one a wide street.', t: ['近い', '方', 'は', '細い', '道', 'で', '、', '遠い', '方', 'は', '広い', '通り', 'でした', '。'] },
      { id: 'Karena mulai gelap, saya memilih jalan lebar yang ada lampu jalannya.', en: 'It was starting to get dark, so I chose the wide street that had street lamps.', t: ['暗く', 'なり', '始めて', 'いた', 'ので', '、', '街灯', 'の', 'ある', '広い', '通り', 'を', '選び', 'ました', '。'] },
      { id: 'Akibatnya saya perlu waktu sekitar lima belas menit lebih lama, tetapi saya bisa tiba tanpa tersesat.', en: 'As a result it took me about fifteen minutes longer, but I reached home without getting lost.', t: ['おかげで', '十五分', 'ほど', '余分', 'に', 'かかり', 'ました', 'が', '、', '迷わ', 'ず', 'に', '着く', 'こと', 'が', 'でき', 'ました', '。'] },
    ]
  },
  {
    key: 'jalan_curhatan_kehujanan_di_jalan', topic: 'jalan', jenis: 'curhatan',
    judulT: ['途中', 'で', '降られて', 'しまった', '話'],
    judul: 'Kehujanan di tengah jalan', judulEn: 'Caught in the rain on the way',
    rel: 'teman_dekat',
    sit: 'Mengeluh kehujanan, tanpa minta saran', sitEn: 'Venting about getting soaked, without asking for advice',
    id: 'Hujan turun mendadak, saya kehujanan saat menunggu lampu, dan akhirnya membeli barang yang tidak perlu supaya bisa berteduh.',
    en: 'It started raining suddenly, I got soaked waiting at the light, and ended up buying something I did not need just to shelter.',
    note: 'Bentuk biasa, dan keluhannya diarahkan ke keadaan, bukan ke orang; itu yang membuatnya curhatan.',
    noteEn: 'Plain style, with the complaint aimed at the situation rather than a person; that is what makes it venting.',
    blocks: [
      { id: 'Pagi tadi cerah, tetapi lewat tengah hari hujan tiba-tiba turun, dan saya tidak membawa payung.', en: 'It was sunny in the morning, but just after noon the rain suddenly started, and I had no umbrella.', t: ['朝', 'は', '晴れて', 'いた', 'のに', '、', '昼過ぎ', 'から', '急に', '降り出して', '、', '傘', 'を', '持って', 'い', 'なかった', 'ん', 'だ', 'よ', '。'] },
      { id: 'Bahkan tepat waktu saya menyeberang simpang besar hujannya makin deras, jadi selama menunggu lampu saya basah kuyup.', en: 'What\'s more, it got heavier exactly while I was crossing a big intersection, so I got soaked through while waiting for the light.', t: ['しかも', '、', 'ちょうど', '大きい', '交差点', 'を', '渡って', 'いる', 'とき', 'に', '強く', 'なって', '、', '信号待ち', 'の', '間', 'ずぶ濡れ', 'に', 'なった', '。'] },
      { id: 'Saya masuk ke toko di dekat situ untuk berteduh, tetapi merasa tidak enak kalau tidak membeli apa-apa, akhirnya saya membeli barang yang tidak saya butuhkan.', en: 'I ducked into a nearby shop to shelter, but I felt bad not buying anything, so in the end I bought something I didn\'t need.', t: ['近く', 'の', '店', 'に', '入って', '雨宿り', 'した', 'ん', 'だけど', '、', '買い物', 'を', 'し', 'ない', 'と', '悪い', '気', 'が', 'して', '、', '結局', 'いらない', '物', 'を', '買って', 'しまった', '。'] },
      { id: 'Saya juga tidak punya tenaga untuk berlari pulang, jadi dengan sepatu basah saya berjalan sampai tiga puluh menit.', en: 'I didn\'t have the energy to run home either, so I walked thirty minutes with wet shoes.', t: ['走って', '帰る', '元気', 'も', 'なくて', '、', '濡れた', '靴', 'の', 'まま', '三十分', 'も', '歩いた', '。'] },
      { id: 'Bukannya mau menyalahkan siapa-siapa, tetapi ramalan cuacanya seharusnya sudah dikatakan sejak pagi.', en: 'It\'s not that I want to blame anyone, but I wish the forecast had said so in the morning.', t: ['別に', '誰か', 'を', '責め', 'たい', 'わけ', 'じゃ', 'ない', 'けど', '、', '天気予報', 'は', '朝', 'の', '時点', 'で', '言って', 'ほしかった', '。'] },
    ]
  },
  {
    key: 'jalan_keluhan_trotoar_tertutup', topic: 'jalan', jenis: 'keluhan',
    judulT: ['工事', 'で', '歩道', 'が', 'ふさが', 'って', 'いる'],
    judul: 'Trotoar yang tertutup proyek', judulEn: 'A pavement closed off by building work',
    rel: 'petugas',
    sit: 'Menyampaikan keluhan ke petugas proyek, dengan permintaan yang jelas', sitEn: 'Complaining to a site worker, with a clear request',
    id: 'Saya memberi tahu bahwa pagar proyek menutup seluruh trotoar sehingga pengguna kereta bayi harus ke jalan raya, dan meminta jalan alternatif diberi tanda.',
    en: 'I point out that the site fence covers the whole pavement so pram users must step into the road, and ask for the detour to be signposted.',
    note: 'Keluhan yang bisa ditindaklanjuti mengakui pekerjaannya perlu, baru menyebut akibat dan permintaannya.',
    noteEn: 'An actionable complaint grants that the work is necessary, then states the consequence and the request.',
    blocks: [
      { id: 'Maaf, saya ingin menanyakan soal trotoar ini.', en: 'Excuse me, I\'d like to ask about this pavement.', t: ['すみません', '、', 'この', '歩道', 'の', 'こと', 'で', 'お尋ね', 'したい', 'の', 'です', 'が', '。'] },
      { id: 'Sejak kemarin pagar proyeknya memakan seluruh trotoar, jadi tidak ada tempat untuk lewat.', en: 'Since yesterday the construction fencing has taken up the whole pavement, so there\'s no space to get through.', t: ['昨日', 'から', '工事', 'の', '柵', 'が', '歩道', 'いっぱい', 'に', '出て', 'いて', '、', '通る', '場所', 'が', 'あり', 'ません', '。'] },
      { id: 'Akibatnya, orang yang mendorong kereta bayi harus turun ke jalan raya, dan saya melihat hal yang berbahaya.', en: 'Because of that, someone with a pram had to step out into the road, and it looked dangerous.', t: ['その', 'せい', 'で', '、', 'ベビーカー', 'の', '人', 'が', '車道', 'に', '出', 'なければ', 'なら', 'ず', '、', '危ない', '思い', 'を', 'しました', '。'] },
      { id: 'Bisa disisakan lebar yang cukup untuk lewat, atau dipasang petunjuk jalan memutar?', en: 'Could you leave a width to pass through, or put up signs for a detour?', t: ['通れる', '幅', 'を', '残す', 'か', '、', '迂回', 'の', '案内', 'を', '出して', 'いただけ', 'ます', 'か', '。'] },
      { id: 'Saya tahu proyeknya memang perlu, jadi akan sangat membantu kalau jalan untuk lewat tetap dijamin.', en: 'I understand the work is necessary, so it would help if you could just keep a way through.', t: ['工事', 'は', '必要', 'な', 'こと', 'だ', 'と', '分かって', 'います', 'ので', '、', '通り道', 'だけ', '確保して', 'いただける', 'と', '助かり', 'ます', '。'] },
    ]
  },
  {
    key: 'jalan_penjelasan_cara_baca_alamat', topic: 'jalan', jenis: 'penjelasan',
    judulT: ['日本', 'の', '住所', 'の', '読み', '方'],
    judul: 'Cara membaca alamat di Jepang', judulEn: 'How Japanese addresses work',
    rel: 'orang_asing',
    sit: 'Menjelaskan cara membaca alamat kepada orang yang baru tiba', sitEn: 'Explaining how addresses work to someone who has just arrived',
    id: 'Saya menerangkan bahwa nomor rumah mengikuti urutan blok sehingga tidak berurutan, dan bahwa bertanya sampai blok ke berapa lebih menolong daripada melihat peta.',
    en: 'I explain that house numbers follow block order and so are not sequential, and that asking which block is more help than reading a map.',
    note: 'Penjelasan yang berguna menyebut sebabnya lebih dulu, karena tanpa sebab aturannya terdengar sewenang-wenang.',
    noteEn: 'A useful explanation gives the reason first, because without it the rule sounds arbitrary.',
    blocks: [
      { id: 'Alamat di Jepang ditulis dengan urutan: pertama nama kawasannya, lalu nomor bloknya, dan setelah itu nomor bangunannya.', en: 'Japanese addresses are written in the order of the district name first, then the block number, and then the building number.', t: ['日本', 'の', '住所', 'は', '、', 'まず', '町', 'の', '名前', '、', '次に', '何丁目', '、', 'その', '次に', '番地', 'の', '順', 'に', '書かれて', 'います', '。'] },
      { id: 'Nomor bangunan itu bukan urutan di sepanjang jalan, melainkan urutan pemberian nama pada bloknya, jadi angkanya belum tentu berurutan.', en: 'The building number isn\'t the order along the road but the order in which names were given to the blocks, so the numbers aren\'t always in sequence.', t: ['番地', 'は', '道', 'の', '並び', 'で', 'は', 'なく', '、', 'その', '区画', 'に', '名前', 'を', '付けた', '順', 'な', 'ので', '、', '数字', 'が', '順番', 'に', '並んで', 'いる', 'と', 'は', '限り', 'ません', '。'] },
      { id: 'Karena itu, kalau berjalan hanya dengan berpegang pada nomor bangunannya, nomor yang sama terlihat seperti ada di tempat lain, dan kita tersesat.', en: 'So if you walk relying only on the building number, the same number looks like it\'s in a different place, and you get lost.', t: ['その', 'ため', '、', '番地', 'だけ', 'を', '頼り', 'に', '歩く', 'と', '、', '同じ', '番号', 'が', '別', 'の', '場所', 'に', 'ある', 'ように', '見えて', '迷い', 'ます', '。'] },
      { id: 'Kalau ditanyakan dulu sampai nomor blok berapa di pos polisi atau di toko sebelum berjalan, kita lebih mudah sampai.', en: 'If you check up to the block number at a police box or a shop before walking, you\'ll find the place more easily.', t: ['交番', 'や', '店', 'で', '何丁目', 'まで', 'を', '確認', 'して', 'から', '歩く', 'と', '、', 'たどり着き', 'やすく', 'なり', 'ます', '。'] },
      { id: 'Akhir-akhir ini nomor bangunannya tertulis di papan kecil di tanah, jadi melihat ke bawah juga membantu.', en: 'These days the building number is written on a small plate on the ground, so looking down helps too.', t: ['最近', 'は', '番地', 'が', '地面', 'の', '小さな', '札', 'に', '書いて', 'ある', 'ので', '、', '足元', 'を', '見る', 'の', 'も', '役に立ち', 'ます', '。'] },
    ]
  },
  {
    key: 'jalan_laporan_sudah_sampai', topic: 'jalan', jenis: 'laporan',
    judulT: ['待ち合わせ', '場所', 'に', '着いた', '連絡'],
    judul: 'Mengabarkan sudah sampai di titik temu', judulEn: 'Reporting that I have arrived at the meeting point',
    rel: 'teman',
    sit: 'Menelepon untuk memberi tahu sudah sampai dan sedang menunggu', sitEn: 'Calling to say that the speaker has arrived and is waiting',
    id: 'Saya memberi tahu bahwa saya sudah di depan persimpangan, di mana saya berdiri, dan bahwa tidak perlu terburu-buru.',
    en: 'I report that I am at the crossing, where exactly I am standing, and that there is no need to hurry.',
    note: 'Laporan seperti ini berguna karena menyebut tanda yang bisa dilihat orang lain, bukan hanya nama tempat.',
    noteEn: 'A report like this is useful because it names a mark the other person can see, not just a place name.',
    blocks: [
      { id: 'Halo, sekarang saya sudah keluar dari stasiun dan sudah tiba di depan simpang tempat kami janjian.', en: 'Hello, I\'ve just come out of the station and I\'ve arrived in front of the intersection where we agreed to meet.', t: ['もしもし', '、', '今', '、', '駅', 'を', '出て', '、', '待ち合わせ', 'の', '交差点', 'の', '前', 'に', '着き', 'ました', '。'] },
      { id: 'Di sini orangnya banyak, jadi mungkin sebaiknya saya pindah ke tempat yang lebih mudah dilihat.', en: 'There are a lot of people here, so it might be better if I move somewhere easier to spot.', t: ['ここ', 'は', '人', 'が', '多い', 'ので', '、', '分かりやすい', '所', 'に', '移動した', '方', 'が', 'いい', 'かもしれません', '。'] },
      { id: ['Sekarang saya berdiri di depan toko di seberang.', 'Saya memakai jaket putih.'], en: ['I\'m standing in front of the shop across the way right now.', 'I\'m wearing a white jacket.'], t: ['私', 'は', '今', '、', '向かい', 'の', '店', 'の', '前', 'に', '立って', 'います', '。', '白い', '上着', 'を', '着て', 'います', '。'] },
      { id: ['Anda sekarang ada di sekitar mana?', 'Kalau jalan kaki, kira-kira berapa menit?'], en: ['Whereabouts are you now?', 'About how many minutes on foot is it?'], t: ['そちら', 'は', 'どの', 'あたり', 'です', 'か', '。', '歩いて', '何分', 'くらい', 'でしょうか', '。'] },
      { id: ['Tidak perlu tergesa-gesa.', 'Saya menunggu di sini.'], en: ['There\'s no need to rush.', 'I\'ll wait here.'], t: ['急が', 'なくて', '大丈夫', 'です', '。', 'ここ', 'で', '待って', 'います', '。'] },
    ]
  },
  {
    key: 'jalan_rencana_pilih_jalur_kaki', topic: 'jalan', jenis: 'rencana',
    judulT: ['歩いて', '帰る', '道', 'の', '選び', '方'],
    judul: 'Memilih jalur jalan kaki', judulEn: 'Choosing which way to walk',
    rel: 'pasangan',
    sit: 'Memutuskan jalur mana yang dipakai, dengan alasan yang dibandingkan', sitEn: 'Deciding which route to take, comparing the reasons',
    id: 'Kami membandingkan jalur pendek yang menanjak dengan jalur jauh yang datar, dan memutuskan memilih menurut cuaca dan bawaan hari itu.',
    en: 'We compare the short uphill route with the long flat one, and decide to choose by the weather and what we are carrying.',
    note: 'Rencana yang berguna menyebut kapan pilihan itu berubah, bukan hanya pilihan hari ini.',
    noteEn: 'A useful plan says when the choice would change, not only today\'s choice.',
    blocks: [
      { id: 'Dari stasiun ke rumah ada dua jalan, yang satu pendek tetapi tanjakannya berat.', en: 'There are two ways from the station to my house: one is short but has a steep hill.', t: ['駅', 'から', '家', 'まで', '歩く', '道', 'は', '二つ', 'あって', '、', '一つ', 'は', '短い', 'けど', '坂', 'が', 'きつい', '道', 'です', '。'] },
      { id: 'Yang satu lagi memutar, tetapi hampir rata dan di tengahnya ada taman.', en: 'The other is a detour, but it\'s almost flat and there\'s a park along the way.', t: ['もう', '一つ', 'は', '遠回り', 'だけど', '、', 'ほぼ', '平ら', 'で', '、', '途中', 'に', '公園', 'が', 'あります', '。'] },
      { id: 'Kalau bawaan saya banyak, jalan yang menanjak itu berat, jadi saya memilih yang rata walau harus memutar.', en: 'On days when I\'m carrying a lot, the hill is hard, so I choose the flat one even if it\'s longer.', t: ['荷物', 'が', '多い', '日', 'は', '坂', 'の', '道', 'は', 'つらい', 'ので', '、', '遠回り', 'で', 'も', '平ら', 'な', '方', 'を', '選び', 'ます', '。'] },
      { id: 'Sebaliknya, kalau hujan, jalan lewat taman jadi becek, jadi jalan yang menanjak lebih baik.', en: 'On the other hand, when it rains the park route gets muddy, so the hill is better then.', t: ['逆に', '、', '雨', 'の', '日', 'は', '公園', 'の', '道', 'が', 'ぬかるむ', 'ので', '、', '坂', 'の', '道', 'の', '方', 'が', 'まし', 'です', '。'] },
      { id: 'Jadi, saya rasa paling baik memutuskan berdasarkan bawaan hari itu dan cuacanya.', en: 'So I think the best thing is to decide based on what I\'m carrying that day and the weather.', t: ['だから', '、', 'その', '日', 'の', '荷物', 'と', '天気', 'で', '決める', 'の', 'が', '一番', 'いい', 'と', '思い', 'ます', '。'] },
    ]
  },
  {
    key: 'jalan_nasihat_jangan_lewat_taman', topic: 'jalan', jenis: 'nasihat',
    judulT: ['夜', 'は', '公園', 'を', '通ら', 'ない', 'こと'],
    judul: 'Jangan lewat taman kalau malam', judulEn: 'Do not cut through the park at night',
    rel: 'teman',
    sit: 'Menasihati teman soal jalan pulang setelah gelap', sitEn: 'Advising a friend about the way home after dark',
    id: 'Saya menyarankan tidak melewati taman saat malam karena lampunya sedikit dan orang dari arah berlawanan baru terlihat di detik terakhir.',
    en: 'I advise against crossing the park at night because there are few lights and people coming the other way appear only at the last second.',
    note: 'Nasihat yang berguna menyebut akibat yang bisa dibayangkan, bukan hanya melarang.',
    noteEn: 'Useful advice names a consequence the listener can picture, rather than only forbidding.',
    blocks: [
      { id: 'Kalau pulang malam, sebaiknya jangan lewat di dalam taman.', en: 'If you\'re heading home at night, you\'d better not cut through the park.', t: ['夜', 'に', '帰る', 'なら', '、', '公園', 'の', '中', 'を', '通ら', 'ない', '方', 'が', 'いい', 'よ', '。'] },
      { id: 'Siang memang jalan pintas, tetapi karena lampu jalannya sedikit, kaki kita sulit melihat.', en: 'In the daytime it\'s a shortcut, but there are few street lamps, so it\'s hard to see where you\'re stepping.', t: ['昼', 'は', '近道', 'だけど', '、', '街灯', 'が', '少ない', 'から', '、', '足元', 'が', '見え', 'にくい', 'ん', 'だ', '。'] },
      { id: 'Selain itu, pohonnya banyak, jadi orang yang datang dari arah berlawanan baru terlihat di saat terakhir.', en: 'On top of that, there are a lot of trees, so people coming the other way only become visible at the last moment.', t: ['しかも', '、', '木', 'が', '多くて', '、', '向こう', 'から', '来る', '人', 'が', 'ぎりぎり', 'まで', '見え', 'ない', '。'] },
      { id: 'Walau memutar, kalau lewat jalan besar ada cahaya toko, jadi lebih aman.', en: 'Even if it\'s longer, going along the main road means the light from the shops, so you\'re safer.', t: ['遠回り', 'で', 'も', '、', '大通り', 'を', '通れ', 'ば', '、', '店', 'の', '明かり', 'が', 'ある', 'から', '安心', 'だ', 'よ', '。'] },
      { id: 'Kalau memang harus lewat taman, sebaiknya nyalakan lampu ponsel dan jangan mendengarkan musik.', en: 'If you really have to go through the park, use your phone as a light and don\'t listen to music.', t: ['どうしても', '公園', 'を', '通る', 'なら', '、', 'スマホ', 'の', '明かり', 'を', 'つけて', '、', '音楽', 'は', '聞か', 'ない', '方', 'が', 'いい', '。'] },
    ]
  },
  {
    key: 'jalan_permintaan_minta_foto', topic: 'jalan', jenis: 'permintaan',
    judulT: ['写真', 'を', '撮', 'って', 'もらう'],
    judul: 'Meminta tolong difoto', judulEn: 'Asking a stranger to take a photo',
    rel: 'orang_asing',
    sit: 'Meminta orang yang lewat memotret berdua di depan sebuah monumen', sitEn: 'Asking a passer-by to photograph the two of you in front of a monument',
    id: 'Saya meminta tolong memotret, menyebut cara memegangnya dan apa yang ingin masuk ke gambar, serta menawarkan bahwa menolak pun tidak apa-apa.',
    en: 'I ask for a photo, saying how to hold it and what I want in frame, and offer that refusing is perfectly fine.',
    note: 'Permintaan kepada orang asing diterima karena yang diminta disebut sedetail mungkin, bukan karena kalimatnya sopan panjang.',
    noteEn: 'A request to a stranger is granted because the task is spelled out, not because the sentence is long and polite.',
    blocks: [
      { id: 'Maaf, boleh saya minta satu hal?', en: 'Excuse me, could I ask you one favour?', t: ['すみません', '、', '一つ', 'お願い', 'して', 'も', 'いい', 'です', 'か', '。'] },
      { id: 'Saya ingin berfoto berdua dengan teman di depan monumen ini, bisa Anda yang menekan tombolnya?', en: 'My friend and I would like to take a photo in front of this monument, could you press the shutter for us?', t: ['この', '記念碑', 'の', '前', 'で', '、', '友達', 'と', '二人', 'で', '写真', 'を', '撮り', 'たい', 'の', 'です', 'が', '、', 'シャッター', 'を', '押して', 'いただけ', 'ません', 'か', '。'] },
      { id: ['Cukup menekannya saja.', 'Tolong supaya kami berdua masuk di tengah.'], en: ['Just pressing it is fine.', 'Please make sure the two of us are in the middle.'], t: ['押す', 'だけ', 'で', '大丈夫', 'です', '。', '真ん中', 'に', '二人', 'が', '入る', 'ように', 'お願い', 'します', '。'] },
      { id: 'Akan lebih menyenangkan kalau tulisan di monumennya juga masuk.', en: 'It would be nice if the inscription on the monument is in the photo too.', t: ['記念碑', 'の', '文字', 'も', '入る', 'と', 'うれしい', 'です', '。'] },
      { id: 'Kalau Anda sedang buru-buru, tentu saja boleh menolak.', en: 'If you happen to be in a hurry, of course it\'s fine to say no.', t: ['もし', 'お急ぎ', 'でしたら', '、', 'もちろん', '断って', 'いただいて', '構い', 'ません', '。'] },
    ]
  },
  {
    key: 'jalan_pengalaman_berpapasan_tetangga_lama', topic: 'jalan', jenis: 'pengalaman',
    judulT: ['祖父', 'を', '知る人に', '会った', '話'],
    judul: 'Berpapasan dengan orang yang mengenal kakek saya', judulEn: 'Meeting someone who knew my grandfather',
    rel: 'tetangga_lama',
    sit: 'Menceritakan pertemuan tak terduga di jalan, dan apa yang berubah setelahnya', sitEn: 'Recounting an unexpected meeting in the street and what changed afterwards',
    id: 'Seorang yang berpapasan ternyata dulu tinggal di sini dan mengenal kakek saya, dan sejak itu saya memperhatikan wajah orang yang berpapasan.',
    en: 'Someone I passed in the street had lived here and knew my grandfather, and since then I look at the faces of people coming the other way.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: pertemuan, apa yang dibuka, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the meeting, what it opened up, and what changed afterwards.',
    blocks: [
      { id: 'Minggu lalu, waktu saya berjalan di jalan depan rumah, saya ditegur oleh orang tua yang datang dari arah depan.', en: 'Last week, while I was walking on the road in front of my house, an elderly person coming the other way spoke to me.', t: ['先週', '、', '家', 'の', '前', 'の', '道', 'を', '歩いて', 'いたら', '、', '前', 'から', '来た', 'お年寄り', 'に', '声', 'を', 'かけられ', 'ました', '。'] },
      { id: 'Setelah berbicara, katanya orang itu dulu tinggal di sekitar sini, dan sekarang bangunannya sudah berubah semua.', en: 'As we talked, it turned out they used to live around here, and they said the buildings have all changed now.', t: ['話して', 'みる', 'と', '、', 'その', '人', 'は', '昔', 'この', '辺り', 'に', '住んで', 'いた', 'そう', 'で', '、', '今', 'は', '建物', 'が', '変わって', 'しまった', 'と', '言って', 'いました', '。'] },
      { id: 'Waktu saya menyebut nama kakek saya, ternyata orang itu mengenalnya, dan tiba-tiba saja dia mulai bercerita tentang masa lalu.', en: 'When I mentioned my grandfather\'s name, it turned out they knew him, and suddenly they started telling stories from long ago.', t: ['私', 'が', '祖父', 'の', '名前', 'を', '出したら', '、', 'なんと', '知り合い', 'だった', 'らしく', '、', 'その', '人', 'は', '急に', '昔', 'の', '話', 'を', '始め', 'ました', '。'] },
      { id: 'Obrolan berdiri itu sampai lebih dari dua puluh menit, tetapi setelah mendengar bahwa jalan itu dulu sungai, cara saya melihatnya berubah.', en: 'We ended up chatting standing there for over twenty minutes, but after hearing that this road used to be a river, the way I looked at it changed.', t: ['立ち話', 'は', '二十分', '以上', 'に', 'なり', 'ました', 'が', '、', 'あの', '道', 'が', '昔', 'は', '川', 'だった', 'と', '聞いて', '、', '見る', '目', 'が', '変わり', 'ました', '。'] },
      { id: 'Sejak itu, kalau berjalan di jalan yang sama, saya sedikit melihat wajah orang yang datang dari depan.', en: 'Since then, when I walk the same road, I look a little more at the faces of the people coming toward me.', t: ['あれ', 'から', '、', '同じ', '道', 'を', '歩く', 'とき', 'は', '、', '前', 'から', '来る', '人', 'の', '顔', 'を', '少し', '見る', 'ように', 'して', 'います', '。'] },
    ]
  },
  {
    key: 'jalan_pengumuman_jalan_ditutup', topic: 'jalan', jenis: 'pengumuman',
    judulT: ['祭り', 'の', 'ため', '道', 'が', '通れ', 'ません'],
    judul: 'Pengumuman jalan ditutup untuk festival', judulEn: 'An announcement that the street is closed for a festival',
    rel: 'petugas',
    sit: 'Pengumuman kepada pejalan kaki bahwa jalannya ditutup', sitEn: 'An announcement to people on foot that a street is closed',
    id: 'Jalan ditutup dua hari karena persiapan festival, pejalan kaki diminta memutar lewat jalan kecil di sisi stasiun.',
    en: 'The street is closed for two days for festival preparations, and people on foot are asked to detour through the narrow street by the station.',
    note: 'Pengumuman menyebut akibat dan lamanya lebih dulu, baru jalan keluarnya, karena pendengar memutuskan dalam dua detik apakah ini urusannya.',
    noteEn: 'An announcement gives the consequence and the duration first, then the way round, because the listener decides in two seconds whether it concerns them.',
    blocks: [
      { id: 'Kepada para pengguna jalan, ada pengumuman.', en: 'An announcement for everyone using this road.', t: ['ご通行', 'の', '皆様', 'に', 'お知らせ', 'いたし', 'ます', '。'] },
      { id: 'Hari ini dan besok, dua hari, jalan ini karena persiapan festival tidak bisa dilewati kendaraan maupun orang, dari pagi sampai malam.', en: 'Today and tomorrow, two days, this street is closed to both cars and people from morning until night, for preparations for the festival.', t: ['本日', 'と', '明日', 'の', '二日間', '、', 'この', '通り', 'は', '祭り', 'の', '準備', 'の', 'ため', '、', '朝', 'から', '夜', 'まで', '車', 'も', '人', 'も', '通れ', 'ません', '。'] },
      { id: 'Yang datang dengan berjalan kaki, silakan memutar lewat jalan sempit di sisi stasiun.', en: 'Those coming on foot, please go around via the narrow road on the station side.', t: ['歩いて', 'お越し', 'の', '方', 'は', '、', '駅側', 'の', '細い', '道', 'を', '回って', 'ください', '。'] },
      { id: 'Jalan memutarnya perlu waktu sekitar sepuluh menit, jadi silakan berangkat dengan waktu yang cukup.', en: 'The detour takes about ten minutes, so please set out with plenty of time.', t: ['回り道', 'は', '十分', 'ほど', 'かかり', 'ます', 'ので', '、', 'お時間', 'に', '余裕', 'を', '持って', 'お出かけ', 'ください', '。'] },
      { id: 'Selain itu, setelah jam enam sore akan ada lapak dagang, sehingga tidak bisa dilewati.', en: 'Also, after six in the evening there will be street stalls, so you will not be able to pass through.', t: ['なお', '、', '夕方', '六時', '以降', 'は', '露店', 'が', '出', 'ます', 'ので', '、', '通り抜け', 'は', 'でき', 'ません', '。'] },
    ]
  },
]);
