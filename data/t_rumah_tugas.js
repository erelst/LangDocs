/* Rumah tangga: the chores, said to the people you live with.
 *
 * 自宅×家事・雑事 10,24% plus 自宅×身周りの用事 3,96%, and 65% of it is spoken to family, which is why this
 * topic is mostly plain speech: a deck that wrote these politely would teach a register
 * nobody uses in their own kitchen. The four slots that go to a neighbour, a courier or a
 * repair person are polite, and they are marked that way.
 *
 * Cooking and eating are in data/t_makan.js and relaxing after the chores is in the
 * rumah_santai topic; this file is the work itself.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - membagi pekerjaan rumah dan menagih janji yang belum dikerjakan
 * - meminta tolong saat sedang sibuk, dan menjelaskan kenapa harus sekarang
 * - mengurus tagihan, surat, dan berkas: membayar, memberi tahu sudah dibayar
 * - menjemur, mencuci, membersihkan, membuang sampah, membeli keperluan habis
 * - memberi tahu pekerjaan sudah selesai, dan menyebut apa yang belum
 * - memperbaiki barang yang rusak, memanggil tukang
 * - mengingatkan tugas orang lain tanpa membuatnya tersinggung
 * - menolak mengerjakan sesuatu sekarang, dengan alasan dan tawaran waktu lain
 * Tidak termasuk:
 * - masak dan makan sebagai acara, masuk ke `makan`
 * - waktu santai di rumah setelah pekerjaan selesai, masuk ke `rumah_santai`
 */
window.BANK = (window.BANK || []).concat([
  {
    key: 'rumah_tugas_percakapan_bagi_kerja', topic: 'rumah_tugas', jenis: 'percakapan',
    judulT: ['今朝', 'の', '家', '事の', '分担'],
    judul: 'Membagi pekerjaan rumah pagi ini', judulEn: 'Dividing the chores this morning',
    speakers: {'A':'pasangan','B':'pasangan'},
    sit: 'Dua orang di rumah membagi pekerjaan sebelum berangkat', sitEn: 'Two people at home dividing the work before leaving',
    id: 'Kami membagi pekerjaan menurut waktu yang tersedia, dan yang berangkat lebih dulu mengambil bagian yang bisa diselesaikan cepat.',
    en: 'We divide the chores by the time each of us has, and whoever leaves first takes the part that can be finished quickly.',
    note: 'Pembagian yang berguna menyebut alasan pembagiannya, bukan hanya apa yang dikerjakan siapa.',
    noteEn: 'A useful division gives the reason for it, not only who does what.',
    blocks: [
      { sp: 'A', id: 'Hari ini saya berangkat jam tujuh, jadi saya tidak bisa yang perlu waktu lama.', en: 'I\'m leaving at seven today, so I can\'t do anything that takes long.', t: ['今日', '、', '私', 'は', '七時', 'に', '出る', 'から', '、', '長く', 'かかる', '物', 'は', '無理', 'なん', 'だ', '。'] },
      { sp: 'B', id: ['Kalau begitu, cuciannya saya yang kerjakan.', 'Soalnya mengeringkannya perlu waktu.'], en: ['Then I\'ll do the laundry.', 'Because drying it takes time.'], t: ['じゃあ', '、', '洗濯', 'は', '私', 'が', 'やる', 'よ', '。', '乾燥', 'まで', '時間', 'が', 'かかる', 'から', '。'] },
      { sp: 'A', id: ['Membantu sekali.', 'Saya buang sampahnya, dan mencuci piringnya saja.'], en: ['That helps.', 'I\'ll take out the rubbish and just wash the dishes.'], t: ['助かる', '。', '私', 'は', 'ごみ', 'を', '出して', '、', '皿', 'だけ', '洗って', 'おく', 'ね', '。'] },
      { sp: 'B', id: ['Piringnya biarkan saja.', 'Nanti malam saya kerjakan sekaligus.'], en: ['Leave the dishes.', 'I\'ll do them all in the evening.'], t: ['皿', 'は', '置い', 'て', 'おいて', '。', '夜', 'に', 'まとめて', 'やる', 'から', '。'] },
      { sp: 'A', id: ['Kalau begitu, saya tuliskan catatan belanjanya saja.', 'Saya bisa mampir pulang nanti.'], en: ['Then I\'ll just write the shopping list.', 'I can stop by on my way home.'], t: ['じゃあ', '、', '買い物', 'の', 'メモ', 'だけ', '書いて', 'おく', 'よ', '。', '帰り', 'に', '寄れる', 'から', '。'] },
      { sp: 'B', id: ['Tolong.', 'Tuliskan bahwa susunya habis dan sabunnya tinggal sedikit.'], en: ['Please.', 'Write down that we\'re out of milk and low on detergent.'], t: ['お願い', '。', '牛乳', 'が', '無い', 'の', 'と', '、', '洗剤', 'が', '少ない', 'の', 'を', '書いて', 'おいて', '。'] },
      { sp: 'A', id: ['Baik.', 'Saya berangkat.'], en: ['Got it.', 'I\'m off.'], t: ['わかった', '。', '行って', 'き', 'ます', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_cerita_hari_sibuk', topic: 'rumah_tugas', jenis: 'cerita',
    judulT: ['一度', 'に', '来て', 'しまった', '日'],
    judul: 'Hari ketika semuanya harus selesai sekaligus', judulEn: 'The day everything had to be done at once',
    rel: 'pasangan',
    sit: 'Menceritakan hari ketika pekerjaan rumah menumpuk bersamaan', sitEn: 'Recounting a day when the housework all piled up at once',
    id: 'Air bocor, mesin cuci rusak di hari yang sama, dan malamnya semuanya selesai karena tukang datang lebih cepat dari perkiraan.',
    en: 'The water leaked and the washing machine broke on the same day, and by evening it was all done because the repairer came sooner than expected.',
    note: 'Cerita seperti ini punya tiga bagian: yang menumpuk, yang dikerjakan lebih dulu, dan hasilnya.',
    noteEn: 'A story like this has three parts: what piled up, what was done first, and the outcome.',
    blocks: [
      { id: 'Rabu minggu lalu, sejak pagi bagian bawah dapur basah, ternyata air menetes dari pangkal kerannya.', en: 'Last Wednesday, the floor under the kitchen was wet from the morning, and water was leaking from the base of the tap.', t: ['先週', 'の', '水曜日', 'は', '、', '朝', 'から', '台所', 'の', '下', 'が', '濡れて', 'いて', '、', '蛇口', 'の', '付け根', 'から', '水', 'が', '漏れて', 'いました', '。'] },
      { id: 'Justru di hari itu mesin cucinya juga berhenti di tengah, dua masalah datang bersamaan.', en: 'Of all days, the washing machine also stopped partway, so two problems arrived at once.', t: ['その', '日', 'に', '限って', '、', '洗濯機', 'も', '途中', 'で', '止まって', 'しまい', '、', '二つ', 'が', '同時', 'に', '来ました', '。'] },
      { id: 'Karena yang air harus diperbaiki lebih dulu supaya lantainya tidak rusak, saya dahulukan yang itu.', en: 'The water had to be fixed first or the floor would be damaged too, so I gave that priority.', t: ['水', 'の', '方', 'を', '先', 'に', '直さ', 'ない', 'と', '床', 'まで', '傷む', 'ので', '、', 'そちら', 'を', '優先', 'しました', '。'] },
      { id: 'Waktu saya menelepon tukangnya, dia datang jam tiga sore, dan mesin cucinya pun diperiksa di hari yang sama.', en: 'When I called the repairman, he came at three in the afternoon, and the washing machine was looked at the same day too.', t: ['修理', 'の', '人', 'に', '電話', 'したら', '、', '午後', 'の', '三時', 'に', '来て', 'くれて', '、', '洗濯機', 'も', '同じ', '日', 'に', '見て', 'もらえ', 'ました', '。'] },
      { id: 'Malamnya semuanya sudah beres, dan lantainya juga sudah kering, jadi selesainya lebih cepat dari dugaan.', en: 'By the evening everything was sorted and the floor was dry, so it finished sooner than I expected.', t: ['夜', 'に', 'は', '全部', '片付いて', '、', '床', 'も', '乾いて', 'いた', 'ので', '、', '思った', 'より', '早く', '終わり', 'ました', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_kronologi_pagi_sebelum_berangkat', topic: 'rumah_tugas', jenis: 'kronologi',
    judulT: ['出かける', '前の', '朝'],
    judul: 'Pagi sebelum berangkat kerja', judulEn: 'The morning before leaving for work',
    rel: 'pasangan',
    sit: 'Menceritakan urutan pekerjaan rumah sebelum berangkat', sitEn: 'Recounting the order of the chores before leaving',
    id: 'Saya bangun, menjemur, menyiapkan sarapan, membuang sampah, dan berangkat tepat waktu karena semuanya dilakukan berurutan.',
    en: 'I got up, hung the washing, made breakfast, took the rubbish out, and left on time because everything was done in order.',
    note: 'Urutannya diikat たら dan ので, jadi setiap baris menjelaskan baris sebelumnya.',
    noteEn: 'The order is bound by たら and ので, so each line explains the one before it.',
    blocks: [
      { id: 'Saya bangun jam enam, dan begitu mesin cucinya dijalankan, waktu untuk mengeringkannya bisa saya dapatkan.', en: 'I got up at six, and putting the laundry on first bought me time to dry it.', t: ['六時', 'に', '起きて', '、', 'まず', '洗濯', 'を', '回した', 'ら', '、', '乾かす', '時間', 'が', '稼げ', 'ました', '。'] },
      { id: 'Setelah itu, saya menjemurnya di luar, baru membuat sarapan.', en: 'After that I hung it outside, then decided to make breakfast.', t: ['その', 'あと', 'で', '、', '外', 'に', '干して', 'から', '、', '朝', 'ごはん', 'を', '作る', 'こと', 'に', 'しました', '。'] },
      { id: 'Karena hari itu jadwal sampah, saya kumpulkan lebih dulu supaya tidak lupa membuangnya.', en: 'It was rubbish day, so I gathered it first so I wouldn\'t forget to put it out.', t: ['ごみ', 'の', '日', 'だった', 'ので', '、', '出す', 'の', 'を', '忘れ', 'ない', 'ように', '先', 'に', 'まとめ', 'ました', '。'] },
      { id: 'Setelah makan, saya mencuci piring, berganti pakaian, dan memeriksa tas.', en: 'Once I\'d eaten, I washed the dishes, got changed, and checked my bag.', t: ['食べ終わって', 'から', '、', '皿', 'を', '洗って', '、', '着替えて', '、', '鞄', 'を', '確認', 'しました', '。'] },
      { id: 'Semuanya berjalan sesuai urutan, jadi saya bisa keluar rumah lima menit lebih awal dari biasanya.', en: 'Everything went in order, so I managed to leave the house five minutes earlier than usual.', t: ['全部', 'が', '順番', 'どおり', 'に', '進んだ', 'ので', '、', 'いつも', 'より', '五分', '早く', '家', 'を', '出る', 'こと', 'が', 'でき', 'ました', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_curhatan_kerjaan_tidak_habis', topic: 'rumah_tugas', jenis: 'curhatan',
    judulT: ['終わらない', '家', '事'],
    judul: 'Pekerjaan rumah yang tidak pernah habis', judulEn: 'Housework that never ends',
    rel: 'pasangan',
    sit: 'Mengeluh soal pekerjaan rumah yang selalu muncul lagi, tanpa minta saran', sitEn: 'Venting about housework that keeps coming back, without asking for advice',
    id: 'Setiap kali selesai, pekerjaan yang sama muncul lagi: piring, cucian, dan lantai, dan rasanya tidak ada yang benar-benar selesai.',
    en: 'Every time it is finished the same work appears again: dishes, laundry and floors, and nothing ever feels really done.',
    note: 'Bentuk biasa dan tanpa permintaan solusi; keluhannya diarahkan ke pekerjaannya, bukan ke orang lain di rumah.',
    noteEn: 'Plain style with no request for a solution; the complaint aims at the work, not at anyone in the house.',
    blocks: [
      { id: 'Piring saya cuci, dan besoknya bertambah lagi sebanyak yang sama, itu sungguh mengherankan.', en: 'I wash the dishes, and the next day the same number has appeared again, it\'s genuinely mysterious.', t: ['皿', 'を', '洗って', '、', '次', 'の', '日', 'に', 'また', '同じ', '数', 'だけ', '増えて', 'いる', 'の', '、', '本当に', '不思議', 'なん', 'だ', 'よ', '。'] },
      { id: 'Cucian pun begitu, walau sudah dikeringkan dan dilipat, pagi berikutnya sudah menumpuk lagi.', en: 'The laundry is the same: even after drying and folding it, by the next morning there\'s a pile again.', t: ['洗濯', 'も', 'そう', 'で', '、', '乾かして', '畳んで', 'も', '、', '次の', '朝', 'に', 'は', 'また', '山', 'が', 'できて', 'いる', '。'] },
      { id: 'Begitu lantainya saya pel, ada saja bekas orang lewat, tidak ada habisnya.', en: 'The moment I wipe the floor, someone leaves footprints on it, and there\'s no end to it.', t: ['床', 'を', '拭いた', 'そば', 'から', '、', '誰', 'か', 'が', '通った', '跡', 'が', '付く', 'し', '、', 'きり', 'が', 'ない', '。'] },
      { id: 'Padahal di hari libur saya kerjakan semuanya, sorenya sudah kembali seperti semula.', en: 'I did everything on my day off, and by the evening it was already back to how it was.', t: ['休み', 'の', '日', 'に', '全部', 'やった', 'のに', '、', '夕方', 'に', 'は', 'もう', '元', 'に', '戻って', 'いた', '。'] },
      { id: 'Bukannya ingin dibantu atau ingin mengubah caranya, saya hanya ingin mengatakan bahwa ini tidak berkurang.', en: 'It\'s not that I want help, or want to change how we do it, I just want to say that it doesn\'t go down.', t: ['手伝って', 'ほしい', 'と', 'か', '、', 'やり方', 'を', '変え', 'たい', 'わけ', 'じゃ', 'なくて', '、', 'ただ', '減ら', 'ない', 'こと', 'を', '言いたい', 'だけ', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_keluhan_tetangga_berisik', topic: 'rumah_tugas', jenis: 'keluhan',
    judulT: ['上の', '部屋', 'の', '音'],
    judul: 'Kebisingan dari tetangga di atas', judulEn: 'Noise from the neighbour upstairs',
    rel: 'tetangga',
    sit: 'Menyampaikan keluhan soal suara ke tetangga, dengan permintaan yang jelas', sitEn: 'Raising noise with a neighbour, with a clear request',
    id: 'Saya menyampaikan bahwa suara mesin cuci malam hari terdengar jelas, dan meminta waktunya digeser tanpa menuduh siapa pun.',
    en: 'I say that the washing machine is clearly audible at night, and ask for the time to be moved without blaming anyone.',
    note: 'Keluhan ke tetangga disampaikan dengan menyebut waktu dan suara yang terdengar, bukan dengan menuduh, karena hubungannya harus tetap terjaga.',
    noteEn: 'A complaint to a neighbour names the time and the sound rather than accusing, because the relationship has to survive it.',
    blocks: [
      { id: ['Maaf mengganggu malam-malam.', 'Boleh saya bicara sebentar?'], en: ['Sorry to bother you at night.', 'Could we talk for a moment?'], t: ['夜分', 'に', 'すみません', '。', '少し', 'だけ', 'お話', 'し', 'て', 'も', 'いい', 'です', 'か', '。'] },
      { id: 'Akhir-akhir ini, setelah lewat jam sebelas, terdengar suara mesin cuci dari kamar di atas.', en: 'Lately, after eleven o\'clock, I can hear the washing machine from the flat above.', t: ['最近', '、', '十一時', 'を', '過ぎて', 'から', '、', '上', 'の', '部屋', 'から', '洗濯機', 'の', '音', 'が', '聞こえ', 'ます', '。'] },
      { id: 'Kamar saya tepat di bawahnya, jadi suaranya sangat terasa waktu mau tidur.', en: 'My room is directly below, so it really carries when I\'m trying to sleep.', t: ['私', 'の', '部屋', 'は', 'ちょうど', '下', 'な', 'ので', '、', '寝る', 'とき', 'に', 'よく', '響く', 'の', 'です', '。'] },
      { id: 'Saya rasa waktu hidup setiap orang berbeda, jadi saya tidak menyalahkan.', en: 'I imagine everyone keeps different hours, so I\'m not blaming you.', t: ['生活', 'の', '時間', 'は', 'それぞれ', 'だ', 'と', '思う', 'ので', '、', '責めて', 'いる', 'わけ', 'で', 'は', 'あり', 'ません', '。'] },
      { id: 'Hanya saja, kalau bisa sampai jam sebelas saja, saya juga bisa tidur dengan tenang.', en: 'It\'s just that if you could keep it to before eleven, I could sleep with peace of mind too.', t: ['ただ', '、', '十一時', 'まで', 'に', 'して', 'いただける', 'と', '、', 'こちら', 'も', '安心', 'して', '眠れ', 'ます', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_penjelasan_memilah_sampah', topic: 'rumah_tugas', jenis: 'penjelasan',
    judulT: ['ごみ', 'の', '分け', '方'],
    judul: 'Cara memilah sampah di daerah ini', judulEn: 'How to sort rubbish in this area',
    rel: 'tetangga_baru',
    sit: 'Menerangkan cara memilah sampah kepada tetangga yang baru pindah', sitEn: 'Explaining how to sort rubbish to a neighbour who has just moved in',
    id: 'Saya menerangkan bahwa sampah dibakar dipisahkan dari plastik dan kaleng, bahwa hari pengambilannya berbeda, dan bahwa kantongnya harus yang tembus pandang.',
    en: 'I explain that burnable rubbish is separated from plastic and cans, that the collection days differ, and that the bags must be see-through.',
    note: 'Penjelasan yang berguna menyebut akibat yang paling sering terjadi lebih dulu: sampah yang salah pilah dikembalikan.',
    noteEn: 'A useful explanation gives the most common consequence first: wrongly sorted rubbish is left behind.',
    blocks: [
      { id: 'Pertama, yang paling banyak adalah sampah yang bisa dibakar, dan ini dua kali seminggu.', en: 'First, the most common is burnable rubbish, and that\'s twice a week.', t: ['まず', '、', '一番', '多い', 'の', 'は', '燃える', 'ごみ', 'で', '、', 'これは', '週', 'に', '二回', 'です', '。'] },
      { id: 'Plastik dan kaleng memakai kantong terpisah, dan hanya bisa dibuang hari Senin.', en: 'Plastic and cans go in a separate bag, and can only be put out on Mondays.', t: ['プラスチック', 'と', '缶', 'は', '別', 'の', '袋', 'で', '、', '月曜', 'だけ', '出せ', 'ます', '。'] },
      { id: ['Gunakan kantong yang isinya terlihat.', 'Kalau isinya tidak jelas, tidak akan diangkut.'], en: ['Please use bags where the contents are visible.', 'If it\'s not clear what\'s inside, it won\'t be collected.'], t: ['袋', 'は', '中', 'が', '見える', '物', 'を', '使って', 'ください', '。', '中身', 'が', '分から', 'ない', 'と', '、', '持って', '行って', 'もらえ', 'ません', '。'] },
      { id: ['Kalau cara memilahnya salah, hanya kantong itu yang ditinggal.', 'Kalau sudah begitu, pilah ulang isinya.'], en: ['If you sort it wrongly, only that bag gets left behind.', 'If that happens, please re-sort the contents.'], t: ['分け', '方', 'を', '間違える', 'と', '、', 'その', '袋', 'だけ', '残され', 'ます', '。', 'そう', 'なった', 'ら', '、', '中', 'を', '分け', '直して', 'ください', '。'] },
      { id: ['Kalau ada yang tidak jelas, tanyakan kepada saya sebelum dibuang.', 'Kertas yang tertempel di papan juga membantu.'], en: ['If there\'s anything you\'re unsure about, ask me before putting it out.', 'The sheet on the noticeboard helps too.'], t: ['分から', 'ない', '物', 'が', 'あっ', 'たら', '、', '出す', '前', 'に', '私', 'に', '聞いて', 'ください', '。', '表', 'に', '貼って', 'ある', '紙', 'も', '役に立ち', 'ます', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_laporan_tagihan_sudah_dibayar', topic: 'rumah_tugas', jenis: 'laporan',
    judulT: ['支払い', 'が', '済', 'んだ', 'こと', 'の', '報告'],
    judul: 'Melaporkan tagihan sudah dibayar', judulEn: 'Reporting that the bills are paid',
    rel: 'pasangan',
    sit: 'Melaporkan bahwa tagihan sudah dibayar dan apa yang masih tersisa', sitEn: 'Reporting that the bills are paid and what is still left',
    id: 'Saya melaporkan bahwa listrik dan air sudah dibayar, bahwa gas masih menunggu, dan bahwa struknya disimpan di laci.',
    en: 'I report that the electricity and water are paid, that the gas is still pending, and that the slips are in the drawer.',
    note: 'Laporan di rumah menyebut apa yang sudah, apa yang belum, dan di mana buktinya.',
    noteEn: 'A report at home states what is done, what is not, and where the proof is.',
    blocks: [
      { id: 'Untuk pembayaran bulan ini, listrik dan air sudah saya selesaikan.', en: 'For this month\'s bills, I\'ve already settled the electricity and water.', t: ['今月', 'の', '支払い', '、', '電気', 'と', '水道', 'は', 'もう', '済ませた', 'よ', '。'] },
      { id: 'Hanya gas yang belum, dan tertulis cukup dibayar sampai besok lusa.', en: 'Only the gas is left, and it says it\'s fine to pay by the day after tomorrow.', t: ['ガス', 'だけ', 'まだ', 'で', '、', '明後日', 'まで', 'に', '払え', 'ば', 'いい', 'と', '書いて', 'あった', '。'] },
      { id: 'Kuitansinya saya taruh di laci biasa, jadi lihat kalau perlu.', en: 'I\'ve put the receipts in the usual drawer, so look when you need them.', t: ['領収書', 'は', 'いつも', 'の', '引き出し', 'に', '入れて', 'ある', 'から', '、', '必要', 'な', 'とき', 'に', '見て', '。'] },
      { id: 'Jumlahnya sedikit lebih tinggi dari bulan lalu, tetapi pemakaiannya hampir sama.', en: 'The amount was a little higher than last month, but we used about the same.', t: ['金額', 'は', '先月', 'より', '少し', '高かった', 'けど', '、', '使った', '量', 'は', 'ほぼ', '同じ', 'だった', '。'] },
      { id: 'Bulan depan saya ingin meninjau cara memakai pendingin supaya sedikit lebih murah.', en: 'Next month I want to review how we use the air conditioning so it comes down a bit.', t: ['来月', 'は', 'もう', '少し', '安く', 'なる', 'ように', '、', 'エアコン', 'の', '使い方', 'を', '見直そう', 'と', '思って', 'いる', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_rencana_bersih_besar', topic: 'rumah_tugas', jenis: 'rencana',
    judulT: ['大', '掃除', 'の', '段', '取り'],
    judul: 'Rencana bersih-bersih besar', judulEn: 'Planning a big clean',
    rel: 'pasangan',
    sit: 'Menyusun rencana bersih-bersih besar, dengan urutan dan pembagian', sitEn: 'Planning a big clean, with an order and a division of work',
    id: 'Kami menyusun urutan dari bagian yang paling kotor, membagi pekerjaan supaya tidak bertabrakan, dan menyisakan satu ruang untuk duduk.',
    en: 'We set the order starting from the dirtiest part, divide the work so we do not get in each other\'s way, and leave one room to sit in.',
    note: 'Rencana yang berguna menyebut tempat yang disisakan, karena bersih-bersih tanpa tempat duduk membuat orang berhenti lebih cepat.',
    noteEn: 'A useful plan keeps one room free, because a clean with nowhere to sit makes people stop earlier.',
    blocks: [
      { id: 'Hari Minggu bisa dipakai sehari penuh, jadi mari tentukan urutannya dulu.', en: 'I can use the whole of Sunday, so let\'s decide the order first.', t: ['日曜', 'は', '一日', '使える', 'から', '、', '先', 'に', '順番', 'を', '決めて', 'おこう', '。'] },
      { id: 'Yang paling kotor adalah penyedot di dapur, jadi dikerjakan pagi saat tenaga masih ada.', en: 'The dirtiest thing is the extractor fan in the kitchen, so we\'ll do that in the morning while we still have energy.', t: ['一番', '汚れて', 'いる', 'の', 'は', '台所', 'の', '換気扇', 'な', 'ので', '、', '体力', 'の', 'ある', '午前', 'に', 'やる', '。'] },
      { id: ['Saya kamar mandi, kamu jendela.', 'Kalau di ruangan yang sama, kita saling mengganggu.'], en: ['I\'ll take the bathroom, you take the windows.', 'Doing the same room just gets in each other\'s way.'], t: ['私', 'が', '風呂', '場', '、', 'そちら', 'が', '窓', 'に', 'しよう', '。', '同じ', '部屋', 'で', 'やる', 'と', 'ぶつかる', 'から', '。'] },
      { id: 'Siangnya keluar makan, lalu sorenya merapikan sisanya, itu lebih efisien.', en: 'Going out for lunch and then clearing the rest in the afternoon is more efficient.', t: ['昼', 'は', 'どこ', 'か', 'に', '出て', '食べて', '、', '午後', 'に', '残り', 'を', '片付ける', 'の', 'が', '効率', 'が', 'いい', '。'] },
      { id: ['Kamar tidur saja jangan disentuh.', 'Perlu ada tempat duduk kalau sudah lelah.'], en: ['Let\'s leave the bedroom alone.', 'We need somewhere to sit when we get tired.'], t: ['寝室', 'だけ', 'は', '手', 'を', '付け', 'ない', 'で', 'おこう', '。', '疲れた', 'とき', 'に', '座れる', '場所', 'が', '要る', 'から', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_nasihat_jangan_menunda', topic: 'rumah_tugas', jenis: 'nasihat',
    judulT: ['後回し', 'に', 'しない', 'こと'],
    judul: 'Jangan menunda pekerjaan kecil', judulEn: 'Do not put off the small jobs',
    rel: 'pasangan',
    sit: 'Menasihati pasangan supaya mengerjakan yang kecil lebih dulu', sitEn: 'Advising a partner to do the small jobs first',
    id: 'Saya menyarankan mengerjakan yang butuh lima menit lebih dulu, karena yang kecil menumpuk menjadi satu pekerjaan besar yang menghabiskan satu hari.',
    en: 'I suggest doing the five-minute jobs first, because small ones pile up into a single big job that swallows a whole day.',
    note: 'Nasihat yang berguna menyebut ukuran yang bisa dipakai, yaitu lima menit, bukan hanya menyuruh cepat.',
    noteEn: 'Useful advice gives a measure you can apply, five minutes, rather than just telling them to hurry.',
    blocks: [
      { id: 'Yang kecil-kecil sebaiknya jangan ditunda.', en: 'The smaller things, you\'d better not put off.', t: ['小さな', '物', 'ほど', '、', '後回し', 'に', 'し', 'ない', '方', 'が', 'いい', 'よ', '。'] },
      { id: 'Pekerjaan yang selesai dalam lima menit itu, dikerjakan saat itu juga malah lebih ringan.', en: 'Something that takes five minutes is actually easier if you do it right there and then.', t: ['五分', 'で', '終わる', 'こと', 'は', '、', 'その場', 'で', 'やって', 'しまった', '方', 'が', '結局', '楽', 'な', 'ん', 'だ', '。'] },
      { id: 'Kalau ditunda, sepuluh hal kecil menumpuk dan menjadi pekerjaan sehari penuh.', en: 'If you put it off, ten small things pile up and become a whole day\'s work.', t: ['後', 'に', '回す', 'と', '、', '小さい', '物', 'が', '十', '個', '集まって', '、', '一日', '仕事', 'に', 'なる', '。'] },
      { id: 'Selain itu, hanya dengan melihat yang belum selesai, kita tidak tenang walau sedang beristirahat.', en: 'Besides, just seeing what\'s still outstanding makes it hard to relax even when you\'re resting.', t: ['それ', 'に', '、', '残って', 'いる', '物', 'が', '目', 'に', '入る', 'だけ', 'で', '、', '休んで', 'いて', 'も', '落ち着か', 'ない', '。'] },
      { id: 'Jadi, walau hanya satu, biasakan merapikannya begitu terlihat.', en: 'So even if it\'s just one thing, get into the habit of tidying it the moment you spot it.', t: ['だから', '、', '一個', 'だけ', 'でも', '、', '見つけ', 'た', 'とき', 'に', '片付ける', '癖', 'を', '付ける', 'と', 'いい', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_permintaan_minta_tolong_sekarang', topic: 'rumah_tugas', jenis: 'permintaan',
    judulT: ['今', 'すぐ', '手', 'を', '貸して', 'ほしい'],
    judul: 'Minta tolong saat ini juga', judulEn: 'Asking for help right now',
    rel: 'pasangan',
    sit: 'Meminta tolong segera, dengan alasan yang jelas kenapa harus sekarang', sitEn: 'Asking for help now, with a clear reason why it has to be now',
    id: 'Saya meminta tolong sekarang karena airnya akan meluap, menyebut apa yang perlu dipegang, dan menawarkan memberi waktu lima menit kalau sedang sibuk.',
    en: 'I ask for help now because the water is about to overflow, say what needs holding, and allow five minutes if they are busy.',
    note: 'Permintaan mendesak diterima karena yang diminta disebutkan tepat, dan karena ada batas waktunya kalau tidak bisa segera.',
    noteEn: 'An urgent request is granted because the task is stated exactly, and because there is a fallback if they cannot come at once.',
    blocks: [
      { id: 'Maaf, saya minta tolong sekarang juga.', en: 'Sorry, I need a hand right now.', t: ['ごめん', '、', '今', 'すぐ', '手', 'を', '貸して', 'ほしい', 'の', '。'] },
      { id: 'Selang mesin cucinya lepas, dan airnya hampir meluap.', en: 'The washing machine hose has come off and the water is about to overflow.', t: ['洗濯', 'の', 'ホース', 'が', '外れて', '、', '水', 'が', 'あふれ', 'そう', 'な', 'ん', 'だ', '。'] },
      { id: 'Yang perlu kamu lakukan hanya menahan bagian ini.', en: 'All I need you to do is hold this part down.', t: ['やって', 'ほしい', 'の', 'は', '、', 'この', '部分', 'を', '押さえて', 'いて', 'もらう', 'だけ', 'で', 'いい', '。'] },
      { id: 'Kalau sekarang tidak bisa, saya tunggu lima menit saja, jadi datang kalau sudah selesai.', en: 'If you can\'t right now, I can wait five minutes, so come when you\'re done.', t: ['もし', '今', '手', 'が', '離せ', 'ない', 'なら', '、', '五分', 'だけ', '待つ', 'から', '、', '終わった', 'ら', '来て', '。'] },
      { id: 'Sampai itu, saya tahan dengan handuk dulu.', en: 'Until then I\'ll catch it with a towel.', t: ['それ', 'まで', '、', '私', 'が', 'タオル', 'で', '受け', 'て', 'おく', 'ね', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_pengalaman_pertama_tinggal_sendiri', topic: 'rumah_tugas', jenis: 'pengalaman',
    judulT: ['初めて', '一人で', '住んだ', 'とき'],
    judul: 'Pertama kali tinggal sendiri', judulEn: 'The first time living alone',
    rel: 'teman',
    sit: 'Menceritakan pengalaman pertama tinggal sendiri dan apa yang dipelajari', sitEn: 'Recounting the first time living alone and what it taught',
    id: 'Saya tinggal sendiri, berasnya berjamur karena salah menyimpan, dan sejak itu selalu membeli dalam jumlah kecil.',
    en: 'I lived alone, my rice went mouldy because I stored it wrong, and since then I always buy it in small amounts.',
    note: 'Pengalaman yang enak didengar punya tiga bagian: keadaannya, kesalahannya, dan apa yang berubah setelahnya.',
    noteEn: 'A good story has three parts: the situation, the mistake, and what changed afterwards.',
    blocks: [
      { id: 'Waktu pertama kali tinggal sendiri, saya tidak tahu harus membeli apa dan berapa banyak.', en: 'When I first lived on my own, I had no idea what to buy or how much.', t: ['初めて', '一人', 'で', '住んだ', 'とき', 'は', '、', '何', 'を', 'どれ', 'だけ', '買え', 'ば', 'いい', 'の', 'か', '分かって', 'い', 'ません', 'でした', '。'] },
      { id: 'Karena murah, saya membeli beras sepuluh kilo, dan menaruhnya di tempat yang lembap.', en: 'Because it was cheap, I bought ten kilos of rice and stored it somewhere damp.', t: ['安い', 'から', 'と', '、', '米', 'を', '十', 'キロ', 'も', '買って', '、', '湿気', 'の', '多い', '場所', 'に', '置いて', 'しまいました', '。'] },
      { id: 'Sekitar sebulan kemudian muncul serangga, dan hampir semuanya terbuang.', en: 'After about a month insects got into it, and I ended up throwing almost all of it away.', t: ['一', 'か月', 'ほど', 'で', '虫', 'が', '付いて', '、', 'ほとんど', '捨てる', 'こと', 'に', 'なりました', '。'] },
      { id: 'Sejak itu, walau sedikit lebih mahal, saya membeli dua kilo setiap kali dan menyimpannya di kulkas.', en: 'Since then, even if it costs a little more, I buy two kilos at a time and keep it in the fridge.', t: ['それ', 'から', 'は', '、', '少し', '高く', 'て', 'も', '、', '二', 'キロ', 'ずつ', '買って', '、', '冷蔵庫', 'に', '入れ', 'て', 'います', '。'] },
      { id: 'Saya belajar bahwa memilih jumlah yang bisa habis itu lebih penting daripada menghemat uang.', en: 'I learned that choosing an amount you can finish matters more than saving money.', t: ['お金', 'の', '節約', 'より', '、', '使い切れる', '量', 'を', '選ぶ', '方', 'が', '大事', 'だ', 'と', '覚え', 'ました', '。'] },
    ]
  },
  {
    key: 'rumah_tugas_pengumuman_air_mati', topic: 'rumah_tugas', jenis: 'pengumuman',
    judulT: ['水道', 'が', '止まる', 'お知らせ'],
    judul: 'Pengumuman air mati untuk perbaikan', judulEn: 'An announcement that the water is off for repairs',
    rel: 'tetangga',
    sit: 'Pengumuman ke penghuni gedung bahwa air akan dimatikan', sitEn: 'Announcing to the residents that the water will be cut off',
    id: 'Air dimatikan Selasa pagi selama empat jam untuk perbaikan pipa, dan penghuni diminta menampung air lebih dulu.',
    en: 'The water is off on Tuesday morning for four hours while the pipes are repaired, and residents are asked to store water beforehand.',
    note: 'Pengumuman menyebut waktunya lebih dulu dan apa yang harus dilakukan sebelum itu, karena persiapannya harus dilakukan sebelum air mati.',
    noteEn: 'An announcement gives the time first and then what to do before it, because the preparation has to happen while the water still runs.',
    blocks: [
      { id: ['Kepada para penghuni, ada pengumuman.', 'Selasa minggu depan akan ada perbaikan saluran air.'], en: ['An announcement for all residents.', 'There\'s water main work next Tuesday.'], t: ['住人', 'の', '皆様', 'に', 'お知らせ', 'です', '。', '来週', 'の', '火曜', '、', '水道', 'の', '工事', 'が', 'あります', '。'] },
      { id: 'Air berhentinya dari jam sembilan pagi sampai jam satu siang, empat jam.', en: 'The water will be off from nine in the morning until one in the afternoon, four hours.', t: ['水', 'が', '止まる', 'の', 'は', '、', '朝', 'の', '九時', 'から', '午後', 'の', '一時', 'まで', 'の', '四時間', 'です', '。'] },
      { id: ['Selama itu dapur dan kamar mandi tidak bisa dipakai.', 'Mesin cucinya juga tidak jalan.'], en: ['During that time the kitchen and the bathroom can\'t be used.', 'The washing machine won\'t run either.'], t: ['その', '間', 'は', '、', '台所', 'も', '風呂', 'も', '使え', 'ません', '。', '洗濯', '機', 'も', '動き', 'ません', '。'] },
      { id: 'Sebelum hari itu, siapkan air minum dan air untuk memasak.', en: 'Please prepare drinking water and cooking water by the day before.', t: ['前', 'の', '日', 'まで', 'に', '、', '飲み水', 'と', '料理', '用', 'の', '水', 'を', '用意', 'して', 'ください', '。'] },
      { id: 'Kalau pekerjaannya selesai lebih cepat, akan ditempel di papan pengumuman begitu airnya menyala.', en: 'If the work finishes early, we\'ll put a notice on the board as soon as the water is back.', t: ['工事', 'が', '早く', '終わった', '場合', 'は', '、', '復旧', 'した', '時点', 'で', '掲示板', 'に', '貼り', 'ます', '。'] },
    ]
  },
]);
