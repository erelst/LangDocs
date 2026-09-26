# Topik, jenis, dan bagian terukurnya

Halaman ini menjawab tiga pertanyaan: topik apa saja yang ada, dari mana angkanya, dan kata apa
saja yang perlu tercakup. Ketentuan yang mengikat tiap narasi ada di `SPEC.md`; judul dan isi yang
sudah dibuat ada di `JUDUL.md`.

**Angka di halaman ini adalah panduan, bukan lantai yang ditegakkan mesin.** Dulu ada pemeriksa
(`check.js`, `test.js`, `syncdocs.js`) yang menghitung ulang setiap tabel di sini dan menolak
dokumen yang basi. Pemeriksa itu sudah dihapus atas permintaan pemilik proyek, jadi angka di bawah
sekarang **tidak dijaga apa pun**: ia dibaca saat menulis, dan ketentuannya ada di `SPEC.md` T1.

**Keadaan deck saat halaman ini ditulis, supaya angkanya tidak dibaca sebagai rencana.** Seluruh
13 topik sudah terisi, masing-masing **12 narasi**, seluruh **12 jenis** terpakai di setiap topik,
seluruhnya **156 narasi**. Setiap narasi berisi **paragraf**, bukan satu kalimat per baris: batas
kalimat di dalam paragraf dibaca dari tanda baca, dan itu dijelaskan di `SPEC.md` K2. Jadi tabel di
bawah bukan lagi daftar pekerjaan yang tersisa, melainkan dasar yang menjelaskan **kenapa** topik
yang satu mendapat porsi bahasan lebih besar daripada yang lain. Daftar judulnya ada di `JUDUL.md`, dan keadaan itu mudah diperiksa
ulang: jumlah judul di berkas itu harus sama dengan jumlah narasi di `data/`.

---

## 1. Dari mana angkanya

| Sumber | Isi | Dipakai untuk |
|---|---|---|
| CEJC 会話行動調査 2014-2015 (`data/survey.zip`, 9.272 percakapan, 729 person-day) | setiap percakapan sehari penuh dicatat: tempat, kegiatan, bentuk, lawan bicara | bagian tiap topik, dan siapa yang diajak bicara |
| CEJC 語数表 ver.202209 (`data/wc.zip`, 2.419.171 token) | frekuensi per kelas kata, per bentuk, per tempat | menimbang bahasa yang dipakai di dalam topik |

Kolom yang dipakai dari survei adalah `場所` (tempat) dan `活動` (kegiatan), keduanya terisi di
9.207 dari 9.272 percakapan. Setiap topik adalah gabungan beberapa sel tempat × kegiatan.

**Kenapa tempat × kegiatan, bukan salah satunya.** `自宅` saja 34,9% percakapan, terlalu lebar
untuk jadi satu topik. `食事` saja 16,9%, tapi tersebar di empat tempat berbeda yang isinya tidak
sama. Pasangan keduanya baru menunjuk keadaan yang nyata.

---

## 2. Cakupan topik

Bagian tiap topik, dan cakupan percakapan yang ditutup deck. Ini yang dulu dipakai menghitung
kuota **kalimat**; deck sekarang berisi **narasi**, jadi angkanya dipakai untuk menimbang berapa
banyak narasi yang pantas ada di tiap topik, bukan sebagai jumlah yang harus dipenuhi.

| Topik | Sel tempat × kegiatan yang dicakup | Bagian |
|---|---|---|
| `kerja` | 職場・学校×仕事・学業 22,88 + 自宅×仕事・学業 0,71 + それ以外の屋内×仕事・学業 0,85 + 職場・学校×休息 2,74 | 28,54% |
| `makan` | 自宅×食事 9,72 + 公共商業施設×食事 4,37 + 職場・学校×食事 1,60 + それ以外の屋内×食事 1,04 | 17,55% |
| `rumah_tugas` | 自宅×家事・雑事 10,24 + 自宅×身周りの用事 3,96 | 14,90% |
| `rumah_santai` | 自宅×休息 8,82 + それ以外の屋内×休息 0,42 + 自宅×レジャー活動 0,22 | 9,93% |
| `transportasi` | 交通機関×移動 4,69 + 職場・学校×移動 0,78 + 公共商業施設×移動 1,13 + それ以外の屋内×移動 0,31 + 自宅×移動 0,23 | 7,50% |
| `belanja` | 公共商業施設×家事・雑事 4,98 + 公共商業施設×身周りの用事 0,51 + それ以外の屋外×家事・雑事 0,69 + それ以外の屋内×家事・雑事 0,53 | 7,04% |
| `santai` | 公共商業施設×レジャー活動 3,18 + それ以外の屋内×レジャー活動 0,37 + 公共商業施設×付き合い 0,99 + 自宅×付き合い 0,71 + 職場・学校×付き合い 0,27 + それ以外の屋内×付き合い 0,29 + 交通機関×付き合い 0,02 | 6,13% |
| `jalan` | それ以外の屋外×移動 4,36 + それ以外の屋外×付き合い 0,40 + それ以外の屋外×レジャー活動 0,72 | 5,75% |
| `klinik` | 公共商業施設×療養 0,81 | 0,85% |
| `kegiatan` | 公共商業施設×社会参加 0,70 + 公共商業施設×業務外・課外活動 0,57 + 職場・学校×業務外・課外活動 0,44 | 1,80% |

**Sel tidak ada yang dipakai dua kali.** Setiap pasangan tempat × kegiatan masuk tepat satu topik,
dan jumlah baris tabel ini sama dengan cakupan yang dihitung sebagai ruang yang ditutup deck:
**95,23%** percakapan. Sisa 4,77% adalah sel di bawah ambang (bagian di bawah 0,2%) dan percakapan
tanpa tempat atau kegiatan yang tercatat, dan keduanya dilewati dengan alasan: yang pertama terlalu
jarang untuk ditemui pembelajar, yang kedua bukan keadaan.

Dua keadaan yang bukan topik tapi memotong semua topik: 遠隔通信 (telepon, pesan) 9,75% dan
lawan bicara bukan penutur asli 0,91%. Yang berubah hanya salurannya atau cara mengucapkannya,
sedangkan topiknya tetap sama.

**Topik lintas** adalah ucapan yang muncul di topik apa pun, dan bukan topik baru:

| Lintas | Dasar | Isi |
|---|---|---|
| `telepon` | 遠隔通信 9,75% | membuka, menutup, menelepon kembali, salah sambung, tidak terdengar, meninggalkan pesan |
| `sopan` | 感動詞 10,52% dari token | reaksi dan pengisi jeda: menyetujui, terkejut, ragu, meminta diulang, menyela dengan halus |
| `waktu_cuaca` | 名詞 17,35% dari token, bagian terbesar adalah waktu dan cuaca | menyebut hari, jam, perkiraan cuaca, dan mengaitkannya dengan rencana |

**Kenapa `waktu_cuaca` masuk lintas, bukan topik sendiri.** Tidak ada percakapan yang temanya
cuaca. Cuaca dan waktu disebut sambil membicarakan hal lain: janji bertemu, rencana akhir pekan,
mengantar barang.

**Kenapa tidak ada baris `sopan` di tabel topik.** 感動詞 adalah kelas kata, dan percakapan yang
hanya berisi reaksi tidak punya tempat atau kegiatan yang tetap, jadi tidak mungkin dihitung
sebagai sel. `sopan` masuk tabel lintas dengan dasar persentase token, bukan persentase percakapan.

---

## 3. Kepada siapa narasinya dipakai

Bagian terukur ini dihitung dari kolom lawan bicara `data/survey.zip`: 10.708 slot lawan bicara,
dikelompokkan seperti survei mengelompokkannya. Angka ini dipakai untuk menimbang lawan bicara
narasi (K9 di `SPEC.md`), dan **tidak lagi dihitung otomatis** untuk dibandingkan dengan data.

| Kelompok lawan bicara | Terukur | Isi |
|---|---|---|
| keluarga dekat (`家族` + `親戚`) | 36,8% | `keluarga`, `pasangan` |
| kerja & belajar (`仕事学業`) | 22,7% | `rekan`, `atasan`, `klien` |
| teman & tetangga (`友人知人` + `顔見知り`) | 17,2% | `teman`, `teman_dekat`, `tetangga`, `tetangga_baru`, `sekamar`, `teman_sekolah` |
| publik & jasa (`公共商業関係`) | 10,8% | `petugas_toko`, `pelayan`, `dokter`, `petugas_stasiun`, `apoteker`, `kurir` |
| guru-murid (`先生生徒`) | 3,1% | `guru` |
| orang asing (`見知らぬ人`) | 2,4% | `orang_asing` |

**Dua kelompok sengaja tidak ditulis**, dan alasannya disebut supaya tidak terbaca sebagai
kelalaian:

| Kelompok | Kenapa tidak ditulis |
|---|---|
| guru-murid (`先生生徒` 3,1%) | kata-katanya khusus ruang kelas, tidak bisa dipakai di luar sekolah |
| kerabat jauh (`親戚` 2,3%) | kerabat jauh adalah keadaan yang lebih jarang dari keluarga, dan keluarga sudah punya narasinya |

**Yang harus dipatuhi kalau sebaran ini diperbaiki.** Menambah narasi hanya demi menyamakan angka
akan tertangkap aturan bahasa: kalimatnya wajib punya relasi klausa (K3), narasinya harus keadaan
nyata (K1), dan register-nya harus benar (K4). Jadi yang harus dicari adalah **keadaan nyata yang
belum tertulis** untuk kelompok yang kurang, bukan menulis ulang keadaan yang sudah ada dengan
lawan bicara yang berbeda.

---

## 4. Jenis: sumbu yang wajib bergerak

Satu topik wajib berganti jenis terus menerus sampai seluruh jenis terpakai (K11 di `SPEC.md`).
Daftar jenisnya ada di `const.js` (`CONST.jenis`), dan **jenis baru ditambahkan di sana** kalau
sebuah narasi memang mengambil bentuk yang benar-benar baru:

| Jenis | Bentuknya |
|---|---|
| `percakapan` | dua orang atau lebih bertukar giliran |
| `cerita` | satu kejadian yang diceritakan sampai selesai |
| `kronologi` | urutan kejadian, dengan waktu yang jelas |
| `curhatan` | mengeluh panjang tanpa meminta solusi |
| `keluhan` | keluhan yang ditujukan pada pihak tertentu |
| `penjelasan` | menerangkan cara, sebab, atau aturan |
| `laporan` | melaporkan hasil atau keadaan kepada yang berhak tahu |
| `rencana` | menyusun rencana, dengan pilihan dan alasan |
| `nasihat` | menyarankan, dengan alasan yang bisa diperiksa |
| `permintaan` | meminta sesuatu, dengan alasan dan batas waktu |
| `pengalaman` | mengingat yang pernah terjadi, dengan tanggapan |
| `pengumuman` | memberi tahu banyak orang sekaligus |

**Kenapa ini sumbu yang terpisah dari topik.** Satu topik yang isinya sepuluh cerita tetap terasa
sebagai satu hal yang sama walaupun ceritanya berbeda-beda; yang membuatnya terasa berbeda adalah
bentuknya berubah. Topik menentukan apa yang dibicarakan, jenis menentukan bagaimana.

---

## 5. Medan makna: daftar kata yang perlu tercakup

Bagian 2 mengukur **keadaan** (tempat × kegiatan). Bagian ini mencatat hal kedua: **kata-kata**
yang dibutuhkan pembaca di dalam keadaan itu.

Daftarnya dulu ada di `coverage.js` dan diperiksa `check.js`, yang mencetak kata mana yang belum
dipakai kalimat mana pun. **Keduanya sudah dihapus**, jadi daftarnya dipindahkan ke sini sebagai
daftar rencana, dan tidak lagi dihitung otomatis.

| Medan | Katanya |
|---|---|
| `latar` | 家, 外, 中, 朝, 昼, 夜, 今朝, 今晩, 昨日, 明日, 今週, 週末, 今年, 去年, 夏, 冬, 春, 秋, 雨の日, 昼休み |
| `benda_dapur` | 箸, 皿, 茶碗, コップ, スプーン, フォーク, 鍋, 冷蔵庫, 包丁, まな板, ふきん |
| `benda_rumah` | タオル, 石鹸, 歯ブラシ, 布団, 枕, 掛け布団, ハンガー, 洗剤, ごみ袋, 電池, 電球, 鍵 |
| `benda_bawa` | 財布, 鍵, 傘, かばん, スマホ, 充電器, ハンカチ, 眼鏡, 薬, 切符 |
| `bangunan` | 学校, 病院, 駅, 公園, 建物, アパート, 図書館, 本屋, 体育館, 郵便局, 銀行, 交番, 美容院, 八百屋, コンビニ, 駐車場, 階段, エレベーター |
| `keadaan` | 古い, 新しい, きれい, 汚い, 静か, うるさい, 広い, 狭い, 暗い, 明るい, 涼しい, 暖かい, 混んでいる, 空いている, 壊れる, 故障, 停電, 洪水, 地震, 台風, 渋滞 |
| `tubuh` | 手, 足, 目, 耳, 口, 鼻, 顔, 頭, 首, 肩, 背, お腹, 腰, 指, 歯, 髪, のど, 尻尾 |
| `keluarga` | 父, 母, 兄, 姉, 弟, 妹, 祖父, 祖母, いとこ, 親, 息子, 娘, 夫, 妻, おじ, おば, 家族, 両親 |
| `bakat` | 上手, 下手, 得意, 苦手, 才能, 練習, 覚える, 慣れる, 間に合う |
| `hobi` | 趣味, 歌, 歌う, ギター, ピアノ, 読書, 本, 映画, ゲーム, 釣り, 写真, 旅行, 散歩, 泳ぐ, 絵 |
| `pekerjaan` | 会社員, 公務員, 看護師, 医者, 先生, 店員, 運転手, 学生, 歌手, 俳優, 農家, 美容師, 料理人, 警官 |
| `kebiasaan` | 早起き, 寝坊, シャワー, お風呂, 歯磨き, 洗濯, 掃除, 片付ける, 起きる, 寝る, 眠い, 目覚まし |
| `perkenalan` | 名前, 出身, 専攻, 留学生, 自己紹介, よろしく, 大学, 国, 来る, 住む |
| `arah` | 右, 左, 前, 後ろ, 隣, 近く, 遠い, 角, 曲がる, まっすぐ, 道, 交差点, 通り, 信号, 渡る, 地図, 目印 |

**Daftar ini bukan kamus, dan bukan kewajiban.** Ia ada supaya penulisnya punya hal yang bisa
dikejar, dan supaya tidak ada medan yang benar-benar terlupa. Kata yang ternyata tidak bisa dipakai
di percakapan nyata dihapus dari daftar dengan alasan tertulis, dan alasan yang boleh dipakai
adalah "kata ini tidak muncul dalam percakapan sehari-hari", bukan "belum sempat ditulis".

**Cara menutup celah.** Kata yang sama harus masuk sebagai akibat dari keadaan yang memang
menyebutnya: "adik saya yang masih SD ikut makan di sini" memuat `弟` sekaligus menambahkan
keadaan baru. "Adik saya ada di rumah" hanya kalimat yang memasang katanya.

**Uji yang dipakai kalau ragu,** tiga sekaligus dan ketiganya harus lulus:

| Uji | Gagal berarti |
|---|---|
| Apakah ada alasannya diucapkan, bukan untuk mendemonstrasikan pola? | itu contoh buku teks |
| Apakah orang yang mendengarnya tahu benda atau keadaan mana yang dibicarakan? | kalimatnya menggantung |
| Kalau diucapkan sekarang, kepada lawan bicara yang sudah ada, apakah masuk akal? | itu kalimat latihan |

`私は弟がいます` lulus tata bahasa tapi tidak ada orang yang mengatakannya; yang diucapkan orang
adalah `弟が二人いる` waktu ditanya, atau `弟に貸した` waktu benda itu dibicarakan.

---

## 6. Yang sudah tidak ada lagi

Disebut di sini karena pembaca dokumen lama akan mencarinya:

| Dulu | Sekarang |
|---|---|
| `check.js` — memeriksa isi, kelayakan, sebaran, dan angka K10 | dihapus |
| `test.js` — merender halaman dan memeriksa DOM | dihapus |
| `ui.js` — mengemudikan pencarian, balon, fokus keyboard | dihapus |
| `coverage.js` — daftar kata medan makna | isinya dipindahkan ke bagian 5 |
| `syncdocs.js` — menyalin angka terukur ke dokumen | dihapus |
| `docs/topics/*.md` — berkas per topik: kuota, slot, kerangka | cakupannya dipindah ke komentar kepala `data/t_<topik>.js`; checkpoint judulnya di `docs/JUDUL.md` |
| Kuota kalimat per topik | diganti panduan jumlah narasi (bagian 2), dan sumbu jenis (bagian 4) |

Yang menggantikan kelimanya: `docs/JUDUL.md` untuk mencegah pengulangan, pembacaan penulis untuk
bahasa, dan `.github/workflows/ci.yml` yang hanya memeriksa berkas JavaScript bisa di-parse.
