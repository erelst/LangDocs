# Rencana topik: berapa kalimat untuk tiap topik

Halaman ini menjawab satu pertanyaan: topik apa saja yang harus ada, dan berapa kalimat
untuk masing-masing. Jawabannya dihitung dari data percakapan, bukan dibagi rata dan bukan
dikira-kira.

Syarat yang mengikat tiap kalimat ada di `SPEC.md`. Berkas ini hanya soal jumlah dan
cakupan. Apa yang sudah ditulis untuk sebuah topik dicatat di `topics/<topik>.md`.

---

## 1. Dasar perhitungan

Jumlah kalimat sebuah topik mengikuti seberapa sering keadaannya terjadi. Ukurannya dari dua
sumber yang sudah ada di repo:

| Sumber | Isi | Dipakai untuk |
|---|---|---|
| CEJC 会話行動調査 2014-2015 (`data/survey.zip`, 9.272 percakapan, 729 person-day) | setiap percakapan sehari penuh dicatat: tempat, kegiatan, bentuk, lawan bicara | bagian tiap topik, dan siapa yang diajak bicara |
| CEJC 語数表 ver.202209 (`data/wc.zip`, 2.419.171 token) | frekuensi per kelas kata, per bentuk, per tempat | menimbang bahasa yang dipakai di dalam topik |

Kolom yang dipakai dari survei adalah `場所` (tempat) dan `活動` (kegiatan), keduanya
terisi di 9.207 dari 9.272 percakapan. Setiap topik adalah gabungan beberapa sel
tempat × kegiatan, dan kuotanya adalah bagian sel-sel itu dari seluruh percakapan.

**Kenapa tempat × kegiatan, bukan salah satunya.** `自宅` saja 34,9% percakapan, terlalu
lebar untuk jadi satu topik. `食事` saja 16,9%, tapi tersebar di empat tempat berbeda yang
kalimatnya tidak sama. Pasangan keduanya baru menunjuk keadaan yang nyata.

---

## 2. Ruang kalimat yang ditutup deck

Sembilan dari dua belas sel kegiatan terbesar masuk ke dalam topik. Tidak semuanya masuk akal
dijadikan kalimat yang bisa dihafal, dan yang dilewati disebut alasannya:

| Sel yang dilewati | Bagian | Alasan |
|---|---|---|
| `しない` (tidak melakukan apa-apa) | _tidak ada di data_ | bukan keadaan, tidak ada yang diucapkan |
| kegiatan yang bagiannya di bawah 0,2% | ~0,5% gabungan | terlalu jarang untuk ditemui pembelajar |

Dua keadaan yang bukan topik tapi memotong semua topik:

| Keadaan | Bagian | Kenapa bukan topik sendiri |
|---|---|---|
| 遠隔通信 (telepon, pesan) | 9,75% | yang berubah hanya salurannya; kalimatnya tetap kalimat topik asalnya, ditambah pembuka dan penutup telepon |
| 非母語話者 (lawan bicara bukan penutur asli) | 0,91% | topiknya tetap sama; yang berubah hanya cara mengucapkannya |

Dua baris di atas tetap memerlukan kalimat sendiri, jadi kuotanya dihitung terpisah di
bagian 4, bukan dihilangkan.

Ruang yang tertutup: **95,23%** percakapan. Sisa 4,77% adalah sel di bawah ambang dan
percakapan tanpa tempat atau kegiatan yang tercatat.

---

## 3. Kuota per topik

Bagian tiap topik dihitung dari sel tempat × kegiatan miliknya, lalu dikalikan skala deck.
Skalanya **300 kalimat** untuk sepuluh topik inti di tabel ini: cukup besar untuk memuat seluruh ruang
ucapan tiap topik, cukup kecil untuk benar-benar ditulis sendiri dan diperiksa satu per satu.

| Topik | Sel tempat × kegiatan yang dicakup | Bagian | Kuota |
|---|---|---|---|
| `kerja` | 職場・学校×仕事・学業 22,88 + 自宅×仕事・学業 0,71 + それ以外の屋内×仕事・学業 0,85 + 職場・学校×休息 2,74 | 28,54% | **98** |
| `makan` | 自宅×食事 9,72 + 公共商業施設×食事 4,37 + 職場・学校×食事 1,60 + それ以外の屋内×食事 1,04 | 17,55% | **71** |
| `rumah_tugas` | 自宅×家事・雑事 10,24 + 自宅×身周りの用事 3,96 | 14,90% | **63** |
| `rumah_santai` | 自宅×休息 8,82 + それ以外の屋内×休息 0,42 + 自宅×レジャー活動 0,22 | 9,93% | **58** |
| `transportasi` | 交通機関×移動 4,69 + 職場・学校×移動 0,78 + 公共商業施設×移動 1,13 + それ以外の屋内×移動 0,31 + 自宅×移動 0,23 | 7,50% | **28** |
| `belanja` | 公共商業施設×家事・雑事 4,98 + 公共商業施設×身周りの用事 0,51 + それ以外の屋外×家事・雑事 0,69 + それ以外の屋内×家事・雑事 0,53 | 7,04% | **28** |
| `santai` | 公共商業施設×レジャー活動 3,18 + それ以外の屋内×レジャー活動 0,37 + 公共商業施設×付き合い 0,99 + 自宅×付き合い 0,71 + 職場・学校×付き合い 0,27 + それ以外の屋内×付き合い 0,29 + 交通機関×付き合い 0,02 | 6,13% | **42** |
| `jalan` | それ以外の屋外×移動 4,36 + それ以外の屋外×付き合い 0,40 + それ以外の屋外×レジャー活動 0,72 | 5,75% | **36** |
| `klinik` | 公共商業施設×療養 0,81 | 0,85% | **15** |
| `kegiatan` | 公共商業施設×社会参加 0,70 + 公共商業施設×業務外・課外活動 0,57 + 職場・学校×業務外・課外活動 0,44 | 1,80% | **17** |

**Catatan `klinik` dan `kegiatan`.** Bagian terukurnya memberi 2,6 dan 5,4 kalimat, jauh di
bawah yang dibutuhkan untuk menutup ruang ucapan sebuah topik, jadi keduanya memang berdiri di
atas bagian terukurnya dan penyimpangannya dicatat di sini.

Kuota keduanya naik lagi karena satu sebab yang terukur, bukan karena terasa kurang: slot
`menjawab` di kedua berkas topiknya **sudah tertulis seolah terisi**, padahal `check.js` hanya
menemukan 1 kalimat balasan di masing-masing (`klinik` 1, `kegiatan` 1). Aturan `../SPEC.md` K8
menuntut sedikitnya 3, jadi tiap topik menambah 3 kalimat balasan yang nyata: menjawab berapa
lama demamnya, obat apa yang sedang diminum, dan apakah ada alergi obat di `klinik`; menjawab
apa yang perlu dibawa, menjawab undangan rapat RT, dan menjawab tawaran kerja bakti di
`kegiatan`. Kuota `klinik` 12 menjadi 15 dan `kegiatan` 13 menjadi 16.

**Kenapa tidak ada baris `sopan` di tabel ini.** 感動詞 adalah kelas kata, dan percakapan yang
hanya berisi reaksi tidak punya tempat atau kegiatan yang tetap, jadi tidak mungkin dihitung
sebagai sel. `sopan` masuk tabel lintas di bagian 4 dengan dasar persentase token, bukan
persentase percakapan, dan percakapan yang cakupan topiknya berada di dalamnya.

**Sel tidak ada yang dipakai dua kali.** Setiap pasangan tempat × kegiatan masuk tepat satu
topik, dan itu diperiksa: jumlah baris tabel ini sama dengan cakupan yang dihitung di bagian
2, yaitu 95,23%. Sisa 4,77% (442 percakapan) adalah sel di bawah ambang dan percakapan tanpa
tempat atau kegiatan yang tercatat.

**Catatan `kerja`.** 90 kalimat terdengar besar, dan memang `kerja` adalah satu-satunya topik
yang benar-benar besar dalam percakapan sehari-hari: 22,88% dari seluruh percakapan adalah
bekerja atau belajar di kantor dan sekolah. Yang membuatnya bisa ditulis 90 kali tanpa
mengulang kerangka adalah ruang ucapannya juga besar: meminta, melapor, mengoreksi, menolak
tugas, meminta tenggat, mengabarkan hasil, menyanggah dengan halus, mengajak makan siang,
menanyakan yang tidak dimengerti.

Topik yang bagiannya besar tapi jumlah kalimatnya dibatasi oleh ruang ucapan, bukan oleh
bagiannya:

| Topik | Bagian | Kuota | Kenapa tidak lebih banyak |
|---|---|---|---|
| `rumah_santai` | 9,93% | 58 | sebagian besar percakapan di rumah adalah mengobrol tanpa isi yang perlu dihafal |
| `santai` | 6,13% | 42 | waktu luang punya banyak keadaan tapi sedikit kalimat yang benar-benar baru bentuknya |

---

## 3b. Kepada siapa kalimatnya dipakai

Ketentuan T1 menghitung berapa kalimat untuk tiap topik, dan bagian ini menjawab pertanyaan
keduanya: kepada siapa kalimat itu diucapkan. Dua-duanya dihitung dari sumber yang sama
(`data/survey.zip`, 9.272 percakapan), dan bagian ini ada karena sebelumnya yang pertama diukur
dan yang kedua tidak pernah.

Bagian terukur dihitung dari kolom lawan bicara di berkas survei: 10.708 slot lawan bicara.
Kolomnya dikelompokkan seperti survei mengelompokkannya, dan `check.js` mencetak sebaran deck
dengan pengelompokan yang sama.

| Kelompok lawan bicara | Terukur | Deck | Selisih | Isi |
|---|---|---|---|---|
| keluarga dekat (`家族` + `親戚`) | 36,8% | 33,1% | **-3,7** | `keluarga` 173, `pasangan` 23 |
| kerja & belajar (`仕事学業`) | 22,7% | 26,9% | **+4,2** | `rekan` 73, `atasan` 69, `klien` 17 |
| teman & tetangga (`友人知人` + `顔見知り`) | 17,2% | 16,9% | **-0,3** | `teman` 77, `tetangga` 19, `tetangga_baru` 4 |
| publik & jasa (`公共商業関係`) | 10,8% | 15,9% | **+5,1** | `petugas_toko` 31, `pelayan` 29, `dokter` 22, `petugas_stasiun` 9, `apoteker` 2, `kurir` 1 |
| guru-murid (`先生生徒`) | 3,1% | 1,0% | -2,1 | `guru` 6 |
| orang asing (`見知らぬ人`) | 2,4% | 6,3% | **+3,9** | `orang_asing` 37 |

Kolom Deck dihitung dari 592 kalimat tertulis, dan `check.js` mencetak angka yang sama setiap kali
dijalankan. **Tabel ini pernah basi dan tidak ada yang melihatnya**: angka di atas sempat dihitung
dengan penyebut 515 dari batch sebelum batch keluarga terakhir, lalu tertinggal lagi waktu deck
tumbuh dari 535 ke 557, lalu ke 573. Kalimat "tabel ini tidak bisa basi tanpa terlihat" ternyata tidak benar,
karena tidak ada yang membacanya. Sekarang
`test.js` menghitung ulang setiap baris tabel ini dari `data/t_*.js` dan `const.js`, jadi kalimat
itu baru berlaku.

**5,0 poin adalah batas yang dipakai untuk menyebut sebuah kelompok menyimpang**, dan itu dibuat
eksplisit di sini. Setelah batch keluarga dan batch tubuh, yang berdiri di atas batas adalah publik
& jasa (+5,1) dan kerja & belajar (+4,2); keluarga turun ke -3,7 dari -6,3. **Dua kelompok yang
saling bertukar tempat itu memperlihatkan hal yang harus diingat:** batch tubuh hampir seluruhnya
berlawan bicara dokter, jadi kelompok publik & jasa naik, sementara kelompok lain turun bukan karena
kalimatnya dikurangi melainkan karena penyebutnya bertambah. Setiap angka di tabel ini dihitung
ulang, tidak pernah dikutip.
`check.js` sengaja hanya **mencetak** sebaran ini dan tidak menggagalkan apa pun karena selisihnya:
sebaran yang miring adalah keadaan yang dicatat, bukan kesalahan sintaks. Yang diperiksa `test.js`
adalah apakah angka di tabel ini masih sama dengan datanya.

Angka deck di atas tidak dijumlahkan sampai 100% karena `telepon` (遠隔通信 8,4%) adalah keadaan
yang memotong topik, bukan lawan bicara, jadi tidak masuk tabel ini.

**Keluarga dekat kurang 3,7 poin, turun dari 6,3.** Batch medan makna keluarga dan batch tubuh
menambah 35 kalimat bersama-sama, dan `keluarga` naik dari 147 ke 173. Perhatikan bahwa 26 kalimat
keluarga hanya menutup 3,9 poin: penyebutnya ikut bertambah dari 557 ke 592, jadi kelompok lain juga
bergerak tanpa satu kalimat pun berubah di sana (**publik & jasa naik ke +5,1** justru karena batch
tubuh hampir semuanya ke dokter). **Poin bukan selisih jumlah kalimat**, dan itulah alasan tabel ini
dihitung ulang setiap kali deck bertambah.

Angka 13,6 poin itu penyebutnya 449 kalimat; angka 4,3 poin penyebutnya 573. Deck yang bertambah
membuat persentase yang sama menghasilkan poin yang lebih kecil, jadi **selisih ini harus dihitung
ulang setiap kali deck bertambah, bukan dikutip dari catatan lama**. Itu tepat kesalahan yang
terjadi pada tabel di atas.

**Dua kelompok sengaja tidak ditulis**, dan `check.js` mencetak alasan yang sama di sebelah
angkanya supaya tidak terlihat seperti kelalaian:

| Kelompok | Kenapa tidak ditulis |
|---|---|
| guru-murid (`先生生徒` 3,1%) | kata-katanya khusus ruang kelas, tidak bisa dipakai di luar sekolah |
| kerabat (`親戚` 2,3%) | kerabat jauh adalah keadaan yang lebih jarang dari keluarga, dan keluarga sudah punya kalimatnya. Hitungannya masih masuk keluarga dekat di atas |

**Yang harus dipatuhi kalau sebaran ini diperbaiki.** Menambah kalimat hanya demi menyamakan angka
akan tertangkap `check.js` tiga kali sekaligus: kalimat pendek hanya yang benar-benar lazim (K4),
kalimat panjang wajib punya relasi klausa (K3), dan kerangka wajib unik (T4). Jadi yang harus
dicari adalah **keadaan nyata yang belum tertulis** untuk kelompok yang kurang, bukan menulis
ulang keadaan yang sudah ada dengan lawan bicara yang berbeda.

---

## 3c. Medan makna: celah yang dicatat

Bagian 3 mengukur **keadaan** (tempat × kegiatan). Bagian ini mencatat hal kedua yang ditutup
deck: **medan makna**, yaitu kata-kata yang dibutuhkan pembaca di dalam keadaan itu. Ketentuannya
di `../SPEC.md` T6.

Satuan yang dihitung tetap **kalimat**, bukan kata. Daftar katanya ada di `coverage.js`, dan
`check.js` mencetak tabel di bawah setiap kali dijalankan, jadi angkanya tidak bisa basi tanpa
terlihat. Kolom "Siap ditulis" memuat kata yang sudah ada di `lexicon.js` dan tinggal dipakai
kalimat; kolom "Perlu entri lexicon" memuat kata yang entrinya belum ada, jadi kalimatnya
sekaligus menambah entrinya.

| Medan | Dipakai | Total | Celah (kalimat) | Siap ditulis | Perlu entri lexicon |
|---|---|---|---|---|---|
| `latar` | 13 | 20 | 7 | 5 | 2 |
| `benda_dapur` | 4 | 11 | 7 | 4 | 3 |
| `benda_rumah` | 5 | 12 | 7 | 0 | 7 |
| `benda_bawa` | 4 | 10 | 6 | 3 | 3 |
| `bangunan` | 8 | 18 | 10 | 3 | 7 |
| `keadaan` | 9 | 21 | 12 | 3 | 9 |
| `tubuh` | 18 | 18 | 0 | 0 | 0 |
| `keluarga` | 18 | 18 | 0 | 0 | 0 |
| `bakat` | 3 | 9 | 6 | 3 | 3 |
| `hobi` | 8 | 15 | 7 | 0 | 7 |
| `pekerjaan` | 4 | 14 | 10 | 10 | 0 |
| `kebiasaan` | 5 | 12 | 7 | 0 | 7 |
| `perkenalan` | 8 | 10 | 2 | 1 | 1 |
| `arah` | 15 | 17 | 2 | 1 | 1 |
| **Jumlah** | **122** | **205** | **83** | **33** | **50** |

**Cara membaca kolom Celah.** Angka itu jumlah kata yang belum dipakai kalimat mana pun, dan
sekaligus **lantai** jumlah kalimat yang perlu ditulis, bukan target. Satu kalimat bisa memuat dua
kata sekaligus ("adik saya ikut makan di sini" memuat `弟` dan meja makannya), jadi kalimat yang
benar-benar ditulis bisa lebih sedikit daripada angka celahnya. Yang tidak boleh adalah
kebalikannya: menulis satu kalimat hanya untuk satu kata tanpa keadaan baru, karena itu T6 larang.

**Kenapa tidak ada kuota per medan.** Survei mencatat 場所 × 活動, jadi angka terukurnya hanya ada
untuk keadaan, bukan untuk kata. Memberi `tubuh` kuota 14 berarti mengarang angka, dan T1 melarang
tepat hal itu. Karena itu medan makna masuk lewat dua pintu yang sudah ada: disebar ke kalimat
topik yang keadaannya membutuhkannya, dan dicatat celahnya di sini.

**`keluarga` sudah tidak punya celah.** Batch pertama medan makna menutup seluruh 18 katanya dengan
16 kalimat (58 menjadi 74 di `rumah_santai`) yang sekaligus menaikkan kelompok lawan bicara keluarga
dari 30,5% ke 32,5%. Kata yang tadinya paling lama kosong, `祖母` `親` `夫` `妻` `実家` `孫`, masing-masing
kini dipakai kalimat sendiri, dan `畑` ikut terpakai di kalimat kakek.

Dua hal ditemukan waktu batch ini ditulis, dan keduanya dicatat:
- **`お盆` punya dua arti.** Sebagai nampan ia barang dapur, sebagai obon ia hari raya. Satu daftar
  kata tidak bisa membedakan keduanya, jadi ia dikeluarkan dari `benda_dapur` dan tidak dipakai
  untuk obon, karena memakainya akan membuat satu permukaan mewakili dua medan yang berbeda.
- **`ので` tidak boleh diulang enam kali.** Enam kalimat keluarga berturut-turut dengan pola yang sama
  akan membuat `berelasi sebab` naik ke atas batas 72%. Sambungnya karena itu divariasikan
  (`けれど`, `たら`, `と`, `から`, `てから`, `のに`) dan hasilnya 66,3% menjadi 65,6%.

**`tubuh` dan `keluarga` sudah tidak punya celah.** Batch tubuh menutup 18 katanya dengan 22 kalimat
(15 di `klinik`, 7 di topik rumah), dan kata yang paling lama kosong, `足` `耳` `口` `鼻` `首` `指`
`髪` `のど` `尻尾`, masing-masing kini dipakai kalimat yang mengeluhkannya ke orang yang tepat.

Tiga hal ditemukan waktu batch ini ditulis:
- **`背` punya dua arti.** Untuk orang ia punggung, untuk benda ia tinggi. Dua kalimat memakainya
  sekaligus: satu mengeluh punggung pegal, satu lagi meminta tukar tempat karena orang di belakang
  tinggi. Kalimatnya yang membedakan, bukan daftarnya.
- **Kata tubuh hampir selalu berpasangan dengan lawan bicara tertentu.** Mengeluh itu ke dokter,
  dan itu menaikkan kelompok publik & jasa ke +5,1, sekarang kelompok paling menyimpang. Itu
  konsekuensi yang tercatat, bukan cacat yang disembunyikan.
- **`お盆` masih punya dua arti** (nampan dan obon), dan itu tetap alasan ia tidak dipakai.

**Yang paling tipis sekarang, dan itu dicatat bukan disembunyikan.** `keadaan` (12 kalimat),
`bangunan` (10), dan `benda_dapur` (7, semuanya perlu entri) adalah tiga celah terbesar.

---

## 4. Kuota topik lintas

Seratus tujuh kalimat berikut memotong semua topik. Isinya bukan topik baru, melainkan
ucapan yang muncul di topik apa pun.

| Lintas | Bagian dasar | Kuota | Isi |
|---|---|---|---|
| `telepon` | 遠隔通信 9,75% | **41** | membuka, menutup, menelepon kembali, salah sambung, tidak terdengar, meninggalkan pesan |
| `sopan` | 感動詞 10,52% dari token | **37** | reaksi dan pengisi jeda: menyetujui, terkejut, ragu, meminta diulang, menyela dengan halus |
| `waktu_cuaca` | 名詞 17,35% dari token, bagian terbesar adalah waktu dan cuaca | **29** | menyebut hari, jam, perkiraan cuaca, dan mengaitkannya dengan rencana |

**Kenapa `waktu_cuaca` masuk lintas, bukan topik sendiri.** Tidak ada percakapan yang
temanya cuaca. Cuaca dan waktu disebut sambil membicarakan hal lain: janji bertemu, rencana
akhir pekan, mengantar barang. Pembelajar membutuhkannya, tapi tidak sebagai topik.

**Kuota `sopan` datang dari pengukuran, bukan perasaan.** Partikel akhir kalimat muncul
163.670 kali dalam 2.419.171 kata, dan 感動詞 (kata seru) 10,52% dari seluruh token. Hampir
setiap kalimat percakapan Jepang membawa partikel akhir. Deck yang tidak mengajarkan `ね`,
`よ`, dan `か` sebagai kalimat tersendiri melewatkan bagian percakapan yang paling padat.

---

## 5b. Waktu menjalankan pemeriksaan, dan kenapa begitu

Diukur di mesin ini, dengan seluruh berkas diperiksa:

| Perintah | Waktu | Isinya |
|---|---|---|
| `node check.js` | **0,35 detik** | seluruh isi kalimat dan dokumen, tanpa browser |
| `node test.js` | **10 detik** | sama, ditambah dua kali merender halaman di browser |
| `node ui.js` | **15 detik** | mengemudikan halaman: pencarian, balon, fokus keyboard |

**Yang paling lambat bukan bahasanya.** 97% waktu `test.js` dan 96% waktu `ui.js` terpakai untuk
**membuka browser dan menunggunya**, bukan untuk menghitung. Halaman kosong pun butuh 1,8-2,0 detik
sekali render, dan `check.js` yang memeriksa seluruh 567 kalimat hanya butuh 0,35 detik. Jadi
mengganti JavaScript dengan bahasa lain **tidak menolong**: yang mahal adalah Chromium, dan bahasa
apa pun yang menjalankannya tetap membayar harga yang sama.

**Yang benar-benar salah, dan sudah diperbaiki.** Sampai commit sebelum ini `test.js` butuh **231
detik**, dan 89,7% waktunya ada di satu fungsi: `withoutBubbles`, yang membuang balon per kata dari
DOM sebelum teksnya diperiksa. Setiap balon disingkirkan dengan `out = out.slice(0, at) +
out.slice(i)`, dan itu menyalin ulang seluruh string. Halaman deep link `#q567` berisi 10 MB DOM
dengan 11.250 balon, jadi satu kalimat pemeriksaan menyalin **109 GB**. Sekarang balonnya
disingkirkan dalam satu lintasan: keluaran tetap identik byte per byte, waktunya turun dari 231
detik ke 10 detik, dan yang penting **tidak lagi tumbuh kuadratik** terhadap jumlah kalimat.
Kalimat yang bertambah dua kali lipat akan menggandakan waktu, bukan melipatgandakannya.

**Yang disengaja tetap lambat.** Render kedua di `test.js` sengaja membuka `#q567` dan bukan
`#q21`, walaupun yang mahal itu justru `#q567` (7 detik melawan 3 detik). Deep link memang
menambahkan kartu satu batch demi satu batch sampai kartunya ada, tanpa batas atas, jadi hanya
dengan menunjuk kalimat terakhir pemeriksaan itu membuktikan penambahan bertahapnya benar-benar
jalan sampai ujung. Menggantinya dengan `#q21` akan menghemat 4 detik dan menghilangkan buktinya.

---

## 5. Total

| Bagian | Kalimat |
|---|---|
| Sepuluh topik inti | 456 |
| Tiga lintas | 107 |
| **Minimum deck** | **563** |
| Kuota terpakai | 563 |
| Perlu ditulis | **0** |

"Kuota terpakai" **563 sama dengan kuota 563, dan tidak ada topik yang berdiri di atas kuotanya.**
Angka itu berasal dari 592 kalimat tertulis ditambah 6 kalimat `kurasi` yang dipetakan ke topik:
`sopan` menerima 4 (`kurasi01`, `kurasi02`, `kurasi05`, `kurasi09`) dan `waktu_cuaca` 2 (`kurasi07`,
`kurasi10`). Empat kalimat `kurasi` yang tersisa (`kurasi03`, `kurasi04`, `kurasi06`, `kurasi08`)
tidak dipetakan ke topik mana pun dan karena itu tidak dihitung terhadap kuota, walaupun tetap
muncul di halaman. Rinciannya ada di baris "Dari `kurasi`" pada `topics/sopan.md` dan
`topics/waktu_cuaca.md`.

Perhitungan yang sama, per topik, semuanya berakhir tepat di kuotanya. `sopan` berdiri di 33 dari
berkasnya ditambah 4 `kurasi` melawan kuota 37, dan `waktu_cuaca` 27 ditambah 2 melawan kuota 29.
`../SPEC.md` T2 menyebut kuota sebagai lantai, bukan langit-langit, jadi sebuah topik memang boleh
berdiri di atasnya selama kalimat tambahannya nyata dan berbeda; keadaan itu sekarang tidak terjadi,
dan bagian "Sisa yang harus ditulis" di tiap berkas topik karena itu semuanya berisi **0**.

| Angka | Artinya | Sekarang |
|---|---|---|
| Kalimat di berkas topik | yang tertulis di `data/t_*.js` | **592** |
| Kalimat yang dihitung topik | di atas, ditambah 6 `kurasi` yang dipetakan ke topik | **563** |
| Kalimat di halaman | semua yang dibaca pembaca | **567** |
| Kuota | lantai yang harus ditulis, per `../SPEC.md` T2 | **563** |

**Sejarah kenaikan kuota, supaya bisa diperiksa.** Dua gelombang, dan keduanya punya satu sebab
terukur yang sama:

| Gelombang | Naik | Sebab |
|---|---|---|
| Kalimat balasan (K8) | +24 | `klinik`, `kegiatan`, dan `belanja` hanya punya 1-2 kalimat balasan padahal slot `menjawab` di berkas topiknya sudah ditulis seolah terisi |
| Sebaran lawan bicara (K9) | +92 | lawan bicara keluarga berdiri di 23,2% (dari 449 kalimat) melawan bagiannya 36,8% di survei, selisih 13,6 poin yang belum pernah diukur |

Sesudah gelombang kedua dan kedua batch medan makna, selisih keluarga **3,7 poin** (196 dari 592 kalimat), dan sisanya itu
dicatat, bukan dirapikan angkanya. Menutupnya dengan menambah kalimat demi angka akan tertangkap
`check.js` tiga kali sekaligus (K3, K4, T4), jadi yang harus dicari adalah keadaan nyata yang belum
tertulis.

**Selisihnya membesar dari 3,8 ke 5,0 bukan karena kalimat keluarga berkurang**, melainkan karena
dua gelombang terakhir menambah kalimat untuk lawan bicara lain lebih banyak daripada keluarga.
Ini terlihat dari perubahan penyebut, bukan dari perubahan pembilang: keluarga tetap 170.

Tidak ada kuota yang naik karena "terasa kurang": setiap kalimatnya bisa ditunjuk satu per satu di
`data/t_*.js`, dan `check.js` mencetak jumlah per topik setiap kali dijalankan sehingga angkanya
tidak bisa basi tanpa terlihat.
