# Ketentuan bank narasi

Berkas ini adalah daftar ketentuan yang harus dipatuhi setiap narasi di LangDocs. Ia ditulis
sebagai syarat, bukan saran: satu bagian per ketentuan, disertai alasan dan bentuk
pelanggarannya seperti apa.

**Yang berubah dari versi sebelumnya, dan ini yang paling penting dibaca lebih dulu.** Deck ini
tidak lagi berisi kalimat lepas. Isinya narasi: percakapan, cerita, kronologi, curhatan,
penjelasan, dan seterusnya, masing-masing dengan judul, dan masing-masing lebih panjang dari satu
kalimat. Karena itu **tidak ada lagi berkas pemeriksa**: `check.js`, `test.js`, `ui.js`,
`coverage.js`, dan `syncdocs.js` sudah dihapus atas permintaan pemilik proyek, dan pembentukan
kalimat sepenuhnya diserahkan pada penulisnya.

Konsekuensinya disebut jujur di sini, bukan disembunyikan: **sebagian ketentuan di bawah tidak
bisa diperiksa mesin lagi.** Kolomnya karena itu bernama **Dijaga oleh**, bukan "Diperiksa oleh".
Isinya menyebut apa yang benar-benar menjaga ketentuan itu: pembacaan penulis, berkas checkpoint
judul, atau pemeriksa sintaks di CI. Ketentuan yang penjaganya hanya "dibaca ulang oleh penulis"
ditulis begitu apa adanya, karena menyebutnya jujur lebih berguna daripada berpura-pura semuanya
terjaga.

| Yang masih dijaga mesin | Yang tidak lagi |
|---|---|
| Berkas JavaScript yang tidak bisa di-parse (`ci.yml`, `node --check`) | Bahasa Jepangnya benar atau tidak |
| — | Judul kembar atau isi yang terulang |
| — | Register, relasi klausa, ketepatan waktu lampau |
| — | Glosa yang kosong atau romaji yang berbeda untuk kata yang sama |

Tiga berkas bekerja bersama, dan pembagiannya berbeda dari versi lama:

| Berkas | Isinya |
|---|---|
| `SPEC.md` (berkas ini) | syarat yang mengikat tiap narasi |
| `docs/README.md` | topik apa saja yang ada, bagian terukurnya, dan daftar kata yang perlu tercakup |
| `docs/JUDUL.md` | **checkpoint**: judul dan ringkasan isi setiap narasi yang sudah dibuat |

Berkas topik per topik (`docs/topics/*.md`) **sudah dihapus**. Cakupan tiap topik sekarang ada di
komentar kepala `data/t_<topik>.js`, dan checkpoint judulnya ada di `docs/JUDUL.md`.

---

## 1. Ketentuan isi

### K1. Narasi ditulis sendiri, bukan dihasilkan mesin

Narasi tidak boleh lahir dari kerangka yang diisi kata benda, dan tidak boleh lahir dari template
yang dipakai ulang dengan topik yang ditukar. Satu kerangka yang dipakai berulang dengan kata yang
diganti adalah persis keluhan yang memulai aturan ini: topiknya berganti, isinya sama.

**Alasan.** Pembaca merasakan pengulangan itu walau tidak bisa menamainya, dan begitu terasa,
seluruh bank kehilangan kepercayaan.

**Dijaga oleh.** Pembacaan penulis, dan `docs/JUDUL.md`. Bandingkan judul **dan** isi secara
semantik sebelum menulis. Dua narasi yang berbeda topik tapi menceritakan kejadian yang sama
adalah pelanggaran, walau tidak ada satu kata pun yang identik.

**Gejala pelanggaran.** Beberapa narasi dengan alur yang sama (masalah, penjelasan, penyelesaian)
dan hanya pelakunya yang berganti.

### K2. Panjangnya harus pantas untuk sebuah narasi

Narasi bukan kalimat yang dipanjangkan. Satu narasi harus memuat sesuatu yang memang butuh
beberapa baris: percakapan yang bertukar giliran, kejadian yang berjalan, penjelasan yang
membutuhkan langkah, keluhan yang berkembang. Kalau isinya bisa selesai dalam satu baris, yang
ditulis adalah satu baris, dan itu bukan narasi.

**Alasan.** Percakapan sehari-hari yang berguna bukan daftar sapaan. Yang sulit dan paling sering
dibutuhkan adalah yang membawa isi.

**Judul ditulis dalam bahasa sasaran, dan itu bagian dari bentuk narasi, bukan hiasan.** Setiap
narasi membawa `judul` (bahasa yang dipilih pembaca) dan `judulT` (bahasa sasaran). Keduanya
wajib ada: yang pertama adalah baris arti, yang kedua adalah judul sebenarnya, dan keduanya
disimpan sebagai daftar permukaan kata supaya aturan K7 berlaku pada judul juga.

**Satu blok adalah satu paragraf, bukan satu kalimat.** Sebuah paragraf boleh memuat beberapa
kalimat, dan memang itu yang diharapkan: satu paragraf yang isinya satu kalimat hanya wajar bila
kalimat itu memang berdiri sendiri, misalnya satu ucapan dalam percakapan. Di luar itu, paragraf
yang memuat beberapa kalimat dibaca sebagai satu hal yang utuh, dan itulah bentuk yang dipakai deck
ini. Batas kalimat di dalam paragraf **dibaca dari tanda baca** (`。`, `！`, `？`), bukan disimpan
sebagai penanda tersendiri, karena tanda itu juga yang dilihat pembaca.

**Ukuran yang dipakai.** Sedikitnya **3 blok** untuk sebuah narasi, dan untuk `percakapan`
sedikitnya **4 giliran bicara** yang dimiliki lebih dari satu pembicara. Angka itu lantai, bukan
target: narasi yang butuh delapan paragraf ditulis delapan paragraf.

**Satu blok yang memuat satu kalimat adalah tanda bahaya, bukan bentuk yang sah.** Narasi yang
isinya satu paragraf satu kalimat tidak memuat apa pun yang butuh beberapa baris, dan itu tepat
keadaan yang K2 larang. `kurasi06` pernah berada di keadaan itu, dan sudah diperluas menjadi empat
paragraf.

**Satu pengecualian, dan hanya satu: `kurasi06`.** Narasi yang tersimpan dari versi pertama deck
ini berisi **satu blok**, jadi ia tidak memenuhi lantai tiga blok di atas. Pemilik proyek meminta
narasi itu dipertahankan apa adanya, dan karena itu pengecualiannya **ditulis di sini**, bukan
dibiarkan terlihat seperti kelalaian. Alasan mempertahankannya ada di `data/curated.js`: ia satu-
satunya narasi yang sudah dibaca dan disetujui pembaca, dan ia masih dipakai sebagai patokan mutu
yang harus dilewati setiap narasi baru. Sesudahnya, lantai tiga blok berlaku penuh: **155 dari
156 narasi** memenuhinya, dan tidak ada narasi kedua yang dikecualikan.

**Dijaga oleh.** Pembacaan penulis. Tidak ada pemeriksa otomatis, jadi ini disebut sebagai syarat
penulisan, bukan sebagai pemeriksaan.

**Gejala pelanggaran.** Dua baris yang isinya sebetulnya satu kalimat, dipecah supaya terlihat
seperti narasi.

### K3. Kalimat di dalam narasi tetap mengikat klausanya

Ini ketentuan yang paling mudah hilang saat narasinya memanjang, jadi ditulis eksplisit. Klausa
disambung dengan penanda relasi: `ので`, `から`, `けど`, `けれど`, `たら`, `とき`, `ながら`,
`ため`, `し`, `てから`, `あとで`, `まえに`, `のに`, `なければ`, `れば`, `なら`, `と`, `が`.
Menyambung klausa dengan `それから`, `そして`, `そのあと`, `次に`, `その後`, `まず` **tidak**
menyatakan relasi dan karena itu bukan cara yang dipakai.

**Alasan.** `それから` hanya menomori dua hal yang berdiri sendiri-sendiri. `ので` atau `から`
menyatakan hubungan sebab, dan itu yang membuat satu kalimat berarti satu hal. Aturan ini tetap
berlaku di dalam narasi, justru karena narasi panjang memberi lebih banyak kesempatan untuk
melanggarnya.

**Dijaga oleh.** Pembacaan penulis, dan **satu bagiannya pernah diuji mesin** supaya
ketentuannya tidak tinggal klaim. Yang bisa diukur: penanda urutan (`それから`, `そして`,
`そのあと`, `次に`, `その後`, `まず`) yang muncul **di tengah** sebuah baris, yaitu tempat ia
menyambung dua klausa. Diuji pada seluruh 156 narasi dengan pemeriksaan sekali pakai:

| Yang diukur | Hasil |
|---|---|
| Penanda urutan menyambung klausa **tanpa** penanda relasi apa pun di baris itu | **0** |
| Penanda urutan di **awal** baris, yaitu mengurutkan baris | 11 baris, dan itu tidak dilarang K3 |
| Narasi yang tidak punya penanda relasi sama sekali | **0** |

Jadi setiap penanda urutan yang muncul di tengah baris selalu berbarengan dengan penanda relasi
yang mengikat klausanya (`たら`, `ので`, `から`, `とき`), dan itulah bentuk yang K3 izinkan.
Pemeriksaannya dilakukan sekali dan tidak di-commit, karena yang diminta pemilik proyek adalah
deck tanpa berkas pengujian; angka di tabel ini karena itu berlaku untuk keadaan pada 2026-09-26,
bukan penjaga yang berjalan sendiri.

**Gejala pelanggaran.** Narasi yang setiap barisnya terasa seperti kalimat terpisah yang
ditempelkan, bukan alur yang mengalir.

### K4. Register harus cocok dengan lawan bicaranya

Bentuk santun (です/ます) dipakai kepada orang yang tidak akrab, bentuk biasa kepada yang akrab.
Yang lebih penting di deck ini: **gaya bahasa sebuah narasi tidak ditulis sebagai label, ia dibaca
dari teksnya** (lihat K5).

**Alasan.** Ukuran yang paling tajam memisahkan akrab dan asing adalah bentuk santun. Kepadatan
です/ます pada CEJC adalah 6,7 per 1.000 kata di rumah dan 20,7 per 1.000 kata di kantor, jadi
sekitar tiga kali (`outputs/markers.txt`).

**Dijaga oleh.** Pembacaan penulis. Halaman **menghitung** gaya bahasanya dari teks
(`const.js` `POLITE_MARK` / `PLAIN_MARK`) dan menampilkannya sebagai chip, jadi salah register
akan terlihat langsung sebagai chip itu, dan yang salah adalah teksnya, bukan chipnya.

**Gejala pelanggaran.** Percakapan dengan atasan yang memakai `だよ` dan `じゃん`.

### K5. Gaya bahasa dibaca dari teks, bukan ditulis sebagai label

Chip gaya bahasa (**丁寧**, **普通**, **混在**) dihitung dari teks narasinya setiap kali halaman
dirender, bukan disimpan sebagai field yang diisi tangan.

**Alasan.** Field yang diisi tangan tertinggal begitu teksnya diedit: dulu ada `polite: 1` yang
tidak lagi benar setelah satu klausa diubah, dan itu tidak terlihat siapa pun. Teks tidak bisa
diam-diam berbeda dari dirinya sendiri.

`campuran` adalah jawaban yang benar untuk percakapan yang memuat dua register sekaligus
(misalnya pelanggan santun melawan kawan akrab), dan mengakuinya lebih jujur daripada memilih
salah satu.

**Dijaga oleh.** `app.js` `styleOf()`, memakai daftar `POLITE_MARK` dan `PLAIN_MARK` di
`const.js`. Daftar itu dijaga sengaja: `ますか` dan `ので` tidak ada di dalamnya karena keduanya
penanda tanya dan relasi, bukan register, dan menghitungnya membuat kalimat sopan terbaca sebagai
biasa.

### K6. Waktu lampau harus cocok dengan kata kerja di klausanya sendiri

Kata waktu lampau (`昨日`, `今朝`, `先週`, `去年`, `先月`, `おととい`) menuntut kata kerja bentuk
lampau di klausa yang sama, bukan di klausa sebelah.

**Alasan.** Klausa dibaca satu per satu. `昨日` di klausa A dengan kata kerja lampau di klausa B
adalah kalimat yang salah, bukan kalimat yang sulit. Di dalam narasi panjang ini justru lebih
sering terjadi, karena satu paragraf memuat beberapa klausa.

**Gejala pelanggaran.** `昨日は〜ですが、今日は〜でした。`

**Dijaga oleh.** Pembacaan penulis. Dulu ada pemeriksa (`check.js` bagian `tense`), dan
ketentuan ini disalin ke sini justru karena pemeriksanya hilang.

### K7. Setiap kata punya romaji dan glosa

Satu kata ditulis sekali di `data/lexicon.js`, dengan romaji dan glosanya, sehingga ejaannya tidak
mungkin berbeda di dua narasi. Tanda baca menempel pada kata sebelumnya (`ください。`) supaya tidak
terpisah saat baris berganti.

**Glosa ditulis dalam dua bahasa** (Indonesia dan Inggris) di lexicon, karena pembaca memilih
bahasanya di halaman pertama, dan halaman menampilkan glosa yang sesuai pilihan itu saja.

**Alasan.** Romaji yang berubah antar narasi membuat pembaca mengira ada dua kata berbeda. Ini
satu-satunya ketentuan yang mencegah dua narasi menulis kata yang sama dengan dua cara.

**Dijaga oleh.** Pembacaan penulis, dibantu satu hal mekanis: `app.js` menulis peringatan ke
konsol browser yang menyebut setiap permukaan kata yang tidak ditemukan di lexicon. Peringatan itu
tidak menggagalkan apa pun, tapi ia terlihat, dan cara memakainya adalah membuka konsol setelah
menulis narasi baru.

**Judul juga tunduk pada aturan ini.** Judul ditulis dalam **bahasa sasaran** (`judulT`), dan
kata-katanya memakai `data/lexicon.js` yang sama seperti paragraf, sehingga romaji dan glosanya
tidak bisa berbeda dari kata yang sama di dalam narasinya. Judul yang memakai kata di luar lexicon
akan muncul sebagai peringatan di konsol, sama seperti kalimat biasa.

**Gejala pelanggaran.** Peringatan konsol tentang permukaan yang tidak ditemukan, balon yang kosong
saat disorot, atau romaji berbeda untuk kata yang sama. Daftar kata baru ditambahkan lewat
`node lexadd.js new-words.js`.

**Label juga tunduk pada aturan ini.** Label yang menerangkan teks (jenis, gaya bahasa, lawan
bicara, penutur) ditulis dalam bahasa sasaran dengan permukaannya di `const.js` dan romaji serta
glosanya di lexicon yang sama, jadi sebuah label bisa di-hover persis seperti kata di dalam
kalimat, dan tidak ada satu pun permukaan label yang ditulis terpisah dari lexicon.

### K12. Setiap paragraf punya terjemahannya sendiri

Setiap blok narasi menyimpan `id`: terjemahan paragraf itu dalam bahasa yang dipilih pembaca, satu
baris per kalimat Jepang. Inilah yang ditampilkan sakelar **Terjemahan** di bawah paragrafnya.

**Alasan.** `id` dan `en` di tingkat narasi adalah **ringkasan satu baris**, bukan terjemahan.
Yang dibutuhkan pembaca adalah arti kalimat yang sedang dibacanya, dan ringkasan menjawab
pertanyaan yang berbeda. Memakai ringkasan di situ akan menampilkan hal yang sama di bawah empat
paragraf, dan itu bukan terjemahan.

**Jumlah baris harus sama dengan jumlah kalimat.** Kalimat Jepang dihitung dari tanda baca (`。`,
`！`, `？`), dan jumlah baris `id` harus sama dengan itu. Kalau tidak sama, pembaca tidak bisa
memasangkan baris mana dengan kalimat mana. Diperiksa dengan membandingkan jumlah baris terhadap
jumlah tanda baca untuk seluruh 804 blok; sekarang 804 dari 804 terisi dan 0 tidak cocok.

**Dijaga oleh.** `app.js` `blockTrHTML()`, ditambah pemeriksaan jumlah baris terhadap tanda baca.

### K8. Setiap topik harus memuat narasi balasan, bukan hanya yang membuka

Bukan hanya narasi yang memulai sesuatu. Harus ada juga yang **menjawab**: menjawab pertanyaan,
menanggapi ajakan, menerima tawaran, menolak dengan halus, mengaku belum paham, menanggapi pujian.

**Alasan.** Deck yang hanya berisi pembuka adalah deck yang bisa memulai percakapan tapi tidak bisa
meneruskannya. Pertanyaan hanya **15-20% unit ujaran** CEJC (`outputs/estimate.txt` bagian 6),
sedangkan bagian yang harus menanggapi pertanyaan hampir lima kali lipatnya.

**Ukurannya.** Pertanyaan yang dijawab adalah "apakah narasi ini bentuknya menjawab", dan itu
dinyatakan lewat `sit`/`sitEn` yang menyebut **pemicunya**. "Menolak tawaran makanan karena masih
kenyang" adalah balasan; "menilai harga terlalu tinggi" bukan, karena tidak ada yang ditanggapi.

**Dijaga oleh.** Pembacaan penulis. Dulu ada lantai angka (3 per topik) yang diperiksa `check.js`;
lantai itu hilang bersama pemeriksanya, dan yang tersisa adalah syaratnya.

**Gejala pelanggaran.** Topik yang semua narasinya membuka, dan tidak ada satu pun yang menjawab.

### K9. Lawan bicara harus sebanding dengan kenyataannya, dan bisa dicari

Setiap narasi menyebut siapa yang diajak bicara lewat `rel` (`const.js`), atau lewat `speakers`
untuk percakapan. Pertanyaan yang dijawab aturan ini bukan "apakah tiap orang punya narasi",
melainkan **"apakah jumlahnya sebanding dengan seringnya orang itu diajak bicara"**.

**Alasan, dan ini cacat nyata yang pernah terjadi.** Baris "Lawan bicara yang sudah dipakai" di
berkas topik ditulis dari ingatan dan 9 dari 12 barisnya salah. Lebih buruk lagi, baris itu **tidak
bisa dicari** di halaman, sehingga mencari `pasangan` menemukan 1 kartu padahal ada 22. Sekarang
keduanya diperbaiki dengan cara yang berbeda: baris itu tidak lagi ditulis tangan (ada di
`docs/JUDUL.md`), dan label lawan bicara **diindeks untuk pencarian** di `app.js`.

**Angka terukurnya** datang dari `data/survey.zip` (9.272 percakapan, 10.708 slot lawan bicara),
dan ada di `docs/README.md`: keluarga dekat 36,8%, kerja & belajar 22,7%, teman & tetangga 17,2%,
publik & jasa 10,8%, guru-murid 3,1%, orang asing 2,4%.

**Dijaga oleh.** Pembacaan penulis. Sebaran terukur itu dipakai sebagai **panduan menulis**, bukan
sebagai ambang yang diperiksa: tidak ada lagi yang menghitungnya otomatis, jadi penyimpangannya
tidak lagi bisa dilihat mesin, melainkan harus disengaja dijaga.

**Harus dipatuhi.** Sebelum menambah narasi untuk menyamakan sebaran, ingat aturan bahasa yang
tidak bisa ditawar: narasi harus nyata (K1), kalimatnya wajib punya relasi klausa (K3), dan
register-nya harus benar (K4). Yang harus dilakukan adalah **mencari keadaan nyata yang belum
tertulis** untuk kelompok yang kurang, bukan menulis ulang keadaan yang sudah ada dengan lawan
bicara berbeda.

### K10. Judul wajib unik, dan itu diperiksa secara semantik

Inilah ketentuan yang menggantikan pemeriksa otomatis untuk soal pengulangan, dan ia bekerja lewat
satu berkas: `docs/JUDUL.md`.

Urutannya tidak boleh dibalik, dan inilah aturan yang mengikat penulisnya (yaitu AI):

1. **Putuskan dulu judul dan isinya.**
2. **Baca `docs/JUDUL.md`.**
3. **Cek secara semantik**: judulnya sama atau tidak, **dan** isinya sama atau tidak. Judul yang
   berbeda kata tidak membebaskan dari pemeriksaan ini.
4. **Kalau ada yang identik:** buat yang berbeda dulu, baru ulangi langkah 3.
5. **Kalau tidak ada:** tulis narasinya, lalu catat barisnya di tabel `docs/JUDUL.md`.

**Alasan.** Dua narasi dengan judul berbeda tapi isi sama tetap pengulangan, dan pengulangan itu
yang merusak deck. Pencocokan teks tidak bisa melihatnya, karena yang sama bukan katanya,
melainkan kejadiannya.

**Ukuran yang dipakai.** Kalau pembaca bisa menebak seluruh isi narasi baru dari baris yang sudah
ada di `docs/JUDUL.md`, berarti idenya sudah terpakai.

**Dijaga oleh.** `docs/JUDUL.md` dan pembacaan penulis. Ini **satu-satunya** penjaga soal
pengulangan yang tersisa, jadi ia wajib dijalankan, bukan disarankan.

### K11. Satu topik wajib berganti jenis

Setiap narasi punya satu `jenis` (satu dari `CONST.jenis`: `percakapan`, `cerita`, `kronologi`,
`curhatan`, `keluhan`, `penjelasan`, `laporan`, `rencana`, `nasihat`, `permintaan`, `pengalaman`,
`pengumuman`). Dalam satu topik, jenis yang sudah dipakai **tidak boleh dipakai lagi** sampai
seluruh jenis lain terpakai.

**Alasan.** Inilah permintaan yang memulai aturan ini: satu topik harus dibuat menjadi jenis yang
berbeda terus menerus "sampai mentok". Satu topik yang isinya sepuluh cerita tetap terasa sebagai
satu hal yang sama, walaupun ceritanya berbeda-beda; yang membuatnya terasa berbeda adalah
bentuknya berubah.

**Mentok, dan artinya.** Sebuah topik mentok kalau seluruh jenis sudah terpakai **dan** tidak ada
lagi keadaan nyata yang belum punya narasi. Kuota bukan alasan untuk berhenti, dan jumlah narasi
bukan ukuran. Kalau sebuah topik masih bisa dibuatkan narasi yang nyata dan berbeda, narasi itu
ditambahkan.

**Dijaga oleh.** Tabel "Jenis yang sudah terpakai per topik" di `docs/JUDUL.md`, dibaca sebelum
setiap narasi ditulis.

---

## 2. Ketentuan topik

### T1. Jumlah narasi mengikuti bagian terukurnya, sebagai panduan

Narasi tidak dibagi rata antar topik. Bagian tiap topik dihitung dari data percakapan
(`data/survey.zip`, 場所 × 活動), dan angkanya ada di `docs/README.md`.

**Alasan.** Kalau kantor sepuluh kali lebih sering dibicarakan daripada apotek, deck yang memberi
keduanya jumlah yang sama akan salah menggambarkan bahasa yang dipakai orang.

**Dijaga oleh.** Pembacaan penulis. Dulu perbandingan ini diperiksa `test.js` terhadap tabel
kuota; pemeriksanya hilang, jadi angkanya sekarang panduan, bukan lantai yang ditegakkan. Itu
disebut apa adanya di sini supaya tidak terbaca sebagai sesuatu yang masih dijaga mesin.

### T2. Setiap topik ditulis sampai mentok

**Mentok berarti topik itu sudah tidak bisa dibuatkan narasi lagi.** Bukan berarti jumlahnya sudah
cukup, dan bukan berarti tabel jenisnya sudah penuh.

Urutan yang benar, dan ketiganya berbeda:

| Keadaan | Artinya | Cara tahu |
|---|---|---|
| belum ditulis | belum ada narasinya sama sekali | belum ada baris di `docs/JUDUL.md` |
| **jenis penuh** | seluruh jenis sudah terpakai di topik itu | kolom "Jenis yang sudah ada" penuh |
| **mentok** | tidak ada keadaan baru yang bisa dibuatkan narasi | daftar keadaan di kepala berkas topik sudah habis **dan** satu putaran pencarian baru tidak menemukan apa pun |

**Narasi yang tidak boleh ditambahkan.** Narasi yang kejadiannya hanya berbeda pelaku dari narasi
yang sudah ada, dan narasi yang ditulis hanya untuk memasang sebuah kata. Yang menentukan adalah
keadaannya: "menitipkan kunci ke tetangga" adalah keadaan, "hal-hal rumah tangga" bukan.

**Alasan.** Kuota menjaga keseimbangan antar topik, saturasi menjaga agar tiap topik benar-benar
bisa dipakai. Dua hal berbeda, dan keduanya dibutuhkan.

**Dijaga oleh.** Cakupan tiap topik di komentar kepala `data/t_<topik>.js`, dibaca sebelum
menulis.

### T3. Setiap topik menutup seluruh ruang ucapannya

Bukan hanya yang bertanya, dan bukan hanya bentuk sopan. Ruang ucapan minimal yang harus terisi:
bertanya, menjawab, mengajak, menerima, menolak dengan halus, menyusun rencana, menceritakan yang
lampau, meminta tolong, menjelaskan.

**Alasan.** Yang membuat deck bisa dipakai bukan jumlah narasi, tapi ada atau tidaknya narasi untuk
keadaan yang sedang dihadapi pembaca. Topik tanpa cara menolak adalah topik yang tidak bisa
dipakai.

**Dijaga oleh.** Pembacaan penulis terhadap daftar "Termasuk" di kepala berkas topik.

### T4. Topik baru wajib terdaftar di dua tempat

Berkas `data/t_nama.js` dan satu baris `<script src="data/t_nama.js"></script>` di `index.html`.

**Alasan.** Berkas topik yang tidak termuat membuat narasinya hilang tanpa suara, dan halaman
tetap terlihat normal. Ini juga satu-satunya jenis kesalahan yang dulu ditangkap `test.js` dan
sekarang tidak lagi.

**Dijaga oleh.** Pembacaan penulis, dan susunan repo: `ci.yml` memeriksa setiap `data/*.js` bisa
di-parse, jadi berkas yang rusak ketahuan, tetapi berkas yang **lupa didaftarkan** tidak.

---

## 3. Ketentuan tampilan

| # | Ketentuan | Dijaga oleh |
|---|---|---|
| V1 | Mode gelap saja | tidak dijaga |
| V2 | Setiap kata bisa disorot dan punya balon berisi romaji dan glosa dalam satu bahasa | `app.js` |
| V3 | **Tidak ada tombol `?`, tidak ada panel, tidak ada lipat-buka, di judul maupun di paragraf.** Balon per kata sudah membawa bacaan dan artinya, jadi panel yang mengulanginya adalah tempat kedua untuk membaca hal yang sama | `app.js` |
| V4 | Kata bersifat atomik (`display:inline-block`), warna dan garis bawah unik, dipakai bersama baris kanji dan romaji | `app.js` |
| V6 | Tautan langsung membuka satu narasi: `#/read/<lang>/<tgt>/<key>` | `app.js` |
| V7 | Romaji bisa dinyalakan dan **mati secara bawaan** | `app.js` |
| V8 | Daftar judul dimuat bertahap saat digulir | `app.js` |
| V9 | Tidak ada build, tidak ada program penghasil kalimat; berkas dibaca langsung browser | susunan repo |
| V10 | Sel glosa tidak boleh kosong, dan tanda baca tidak berdiri sebagai baris sendiri | pembacaan penulis + peringatan konsol |
| V11 | Mencari setelah menggulir menampilkan hasil teratas, bukan posisi gulir lama | `app.js` |
| V12 | Balon per kata: menunjuk ke katanya, tidak mengulang kata Jepangnya, tidak ada label yang terbelah, tidak ada baris yang terpotong di tengah kata, dan seluruh balon berada di dalam layar di lebar mana pun | `app.js` |
| V13 | Tiga halaman berurutan: pilih bahasa terjemahan, pilih bahasa sasaran, lalu daftar judul | `app.js` |
| V16 | Alamat yang salah ketik tidak boleh menghasilkan halaman kosong: rute, bahasa, dan bahasa sasaran yang tidak dikenal dinormalkan, dan kunci narasi yang tidak ada kembali ke daftar judul | `app.js` |
| V17 | Tombol kembali browser menelusuri ketiga halaman dalam urutan yang dipilih pembaca | `app.js` |
| V14 | Daftar di halaman ketiga berisi **judul**, bukan kalimat; pencarian menemukan kata di dalam narasi dan menawarkan tombol membaca judul itu penuh | `app.js` |
| V15 | Bahasa terjemahan tidak disatukan: halaman hanya menampilkan satu bahasa, sesuai pilihan di halaman pertama | `app.js` |
| V18 | Setiap jenis punya bentuk yang berbeda, sehingga percakapan bisa dibedakan dari kronologi sebelum satu kata dibaca | `app.js` + CSS |
| V19 | Judul tampil dalam **bahasa sasaran** dengan kemampuan yang sama seperti paragraf: warna per kata, garis bawah per kata, dan balon saat disorot atau difokuskan. Judul **tidak** memakai kelas kartu `jp-sent`, karena judul sudah berada di dalam kartu dan memakainya menggambar kartu di dalam kartu | `app.js` + CSS |
| V20 | Setiap label yang menerangkan teks ditulis dalam **bahasa sasaran** dan **bisa di-hover** untuk melihat romaji dan artinya: jenis, gaya bahasa, lawan bicara, dan label penutur. Warnanya tetap dari tabel yang sama (`jenisVisual`, `who`), jadi makna warnanya tidak berubah | `app.js` + `const.js` |
| V21 | Ada sakelar **Terjemahan**, bentuknya sama seperti sakelar Romaji dan **mati secara bawaan**. Saat dinyalakan, terjemahan muncul **di bawah setiap paragraf**, satu baris per kalimat Jepang, ditambah arti judul dan ringkasan narasi. Mematikannya tidak menyembunyikan judul, chip, label, maupun balon | `app.js` + `index.html` + `data/*.js` |
| V22 | Kolom pencarian, pilihan ruang lingkup, dan kedua sakelar **tetap ada saat sebuah judul dibuka**: pembaca yang mencari satu kata lalu membaca narasinya tidak perlu kembali hanya untuk mengubah sakelar. Bar bacaan disembunyikan di dua halaman pemilih, karena di sana pertanyaannya belum dijawab | `app.js` + `index.html` |

---

## 4. Ketentuan repo

Aturan kerja yang dipasang `jcode-workflow-setup` di `AGENTS.md` berlaku penuh. Yang paling sering
tersentuh saat menulis narasi:

- Jangan commit atau push sendiri. Selesaikan pekerjaan, sajikan pilihan, tunggu keputusan.
- Pesan commit dalam bahasa Inggris, bentuk `<type>(<scope>): <description>`, tanpa trailer buatan.
- Merge ke `main` hanya `--ff-only`. Tidak ada force push ke `main`.
- Verifikasi **tidak memakai build** dan tidak menjalankan server sendiri. Yang tersedia sekarang:
  `node --check <berkas>` untuk sintaks, dan membuka halaman di browser untuk hal yang tampak.
  Pemeriksa kalimat sudah tidak ada.

### Satu cacat tampilan yang ditemukan sesudah narasi ditulis, dan itu mengajarkan satu hal

Waktu blok narasi mulai dipakai, kelas `jp-sent` **tidak ikut** dipasang pada pembungkus tiap
baris. Akibatnya bukan hiasan yang hilang: seluruh aturan balon saat itu ditulis sebagai
`.jp-sent .tk > .tip`, jadi balon per kata jatuh ke `position: static` dan **selalu terlihat**.
Yang dibaca pembaca adalah tiga baris teks menggantung di bawah setiap kata, bukan balon yang
muncul saat disorot. Aturan balon sekarang ditulis pada `.tk` saja, jadi kejadian ini tidak bisa
terulang: judul dan label bisa berbalon tanpa ikut menjadi kartu, dan `jp-sent` hanya berarti
"ini kartu".

Yang menemukannya adalah pengukuran, bukan pembacaan: `getComputedStyle(...).position` bernilai
`static` dan `display` bernilai `inline`, padahal seharusnya `absolute` dan `none`. Pelajarannya
ditulis di sini karena berlaku untuk ketentuan mana pun di berkas ini: **kelas yang membuat aturan
berlaku tidak lebih kecil artinya daripada aturannya**, dan ketentuan yang "sudah ada di CSS"
belum tentu berlaku pada markup yang baru.

### Tiga narasi diganti karena K10, dan kenapa pemeriksaan per topik tidak cukup

Pemeriksaan judul dan isi (K10) selalu dijalankan **di dalam topik** yang sedang ditulis, dan cara
itu melewatkan tiga narasi yang isinya hampir sama di **tiga topik berbeda**, ketiganya `laporan`:

| Sebelum | Isi yang berulang |
|---|---|
| `transportasi` Laporan dari dalam bus yang berhenti | bus/kereta berhenti, sebabnya disebut, perkiraan jam tiba, lalu permintaan agar rapat dimulai tanpa dia |
| `telepon` Melaporkan dari jalan bahwa akan terlambat | bentuk yang sama, kendaraannya diganti |
| `waktu_cuaca` Melaporkan keterlambatan karena cuaca | bentuk yang sama, sebabnya diganti hujan |

Ketiganya lolos K10 hanya karena ditulis di topik yang berbeda. Ketiganya ditulis ulang supaya
isinya benar-benar lain, dan sekarang **tidak ada satu kata pun yang sama** di antara mereka:

| Sesudah | Inti yang berbeda |
|---|---|
| `transportasi` Mengabarkan pindah jalur dari dalam bus | keputusan yang sudah diambil: turun di halte sebelumnya dan pindah ke kereta |
| `telepon` Menelepon dari kereta yang berisik | kesulitan sambungan: memeriksa suara, meminta menunggu, menelepon balik dari tempat tenang |
| `waktu_cuaca` Laporan pembatalan karena hujan | yang batal, penggantinya, dan yang ditegaskan tidak berubah |

**Pelajaran yang mengubah cara memakai K10.** Membandingkan judul dan isi **hanya di dalam topik
yang sedang ditulis tidak cukup**. Yang menemukan ketiganya adalah pembacaan **seluruh 156 judul
sekaligus, dikelompokkan per jenis**, karena pengulangan paling mudah terlihat di antara narasi
yang bentuknya sama. Pemeriksaan itu karena itu dilakukan sekali lagi secara menyeluruh, bukan per
topik, dan itulah yang tertulis di tabel berikut.

### Hasil pemeriksaan sekali pakai atas seluruh 156 narasi (2026-09-26)

Sebelum deck ini diserahkan untuk di-merge, seluruh narasi diperiksa sekali dengan skrip
sekali-pakai terhadap bagian ketentuan yang **bisa** diukur mesin. Skripnya tidak di-commit,
karena pemilik proyek meminta deck tanpa berkas pengujian; hasilnya dicatat di sini supaya
angkanya tidak hilang bersama skripnya.

| Ketentuan | Yang diukur | Hasil |
|---|---|---|
| K2 | narasi dengan sedikitnya 3 blok | **155 dari 156**; satu pengecualian, `kurasi06`, sudah ditulis di K2 |
| K2 | `percakapan` dengan sedikitnya 4 giliran | **13 dari 13** |
| K2 | `percakapan` yang benar-benar punya dua pembicara | **13 dari 13** |
| K3 | penanda urutan menyambung klausa tanpa penanda relasi | **0** |
| K3 | narasi tanpa penanda relasi sama sekali | **0** |
| K7 | permukaan kata tanpa entri lexicon | **0** |
| K7 | entri lexicon dengan romaji atau glosa kosong | **0** |
| K9 | `rel` dan `speakers` yang menunjuk nama tidak dikenal | **0** |
| K9 | blok `percakapan` tanpa penanda pembicara | **0** |
| K10 | judul ganda | **0** (156 judul, 156 unik) |
| K10 | kunci ganda | **0** |
| K11 | topik yang belum memakai 12 jenis | **0** (13 topik, 12 jenis masing-masing) |
| T4 | berkas topik yang belum terdaftar di `index.html` | **0** (13 dari 13 terdaftar) |
| V9 | berkas yang diminta browser ketika halaman disajikan dari subpath | **18**, semuanya 200, tidak ada 404 |
| K10 | pasangan narasi dengan >=40% kata isi sama | **0** dari 12.090 pasangan |
| K10 | pasangan narasi dengan >=55% bigram aksara sama | **0** dari 12.090 pasangan |

**Cara dua baris K10 itu diukur, karena ukuran yang salah sempat menyesatkan.** Percobaan pertama
memakai "kerangka kalimat", yaitu setiap kata isi diganti satu huruf `W`. Ukuran itu **tidak
berguna**: frasa panjang ikut runtuh menjadi rentetan `W` yang sama, sehingga 8 kelompok narasi
yang sama sekali tidak berhubungan terlihat "berkerangka identik". Yang akhirnya dipakai dua
ukuran yang tidak bisa dibohongi begitu: **irisan kata isi** (kata sepanjang dua aksara atau lebih)
dan **irisan bigram aksara**, yaitu tiap pasangan dua aksara berurutan, sehingga frasa yang sama
tetap terdeteksi walau kata-katanya dipecah berbeda. Pada ambang 40% dan 55%, **tidak ada satu pun
dari 12.090 pasangan** yang melewatinya.

Ukuran yang salah itu tetap dicatat di sini supaya tidak dicoba lagi. Yang menemukan tiga narasi
berulang di K10 adalah **membaca seluruh judul dikelompokkan per jenis**, bukan ukuran apa pun.
Ukuran hanya memastikan tidak ada yang terlewat setelahnya.


**Alur tiga halaman juga diuji di lebar ponsel (360 px),** karena tiga halaman itu ditambahkan
setelah versi lama dan CSS-nya punya breakpoint sendiri. Yang diperiksa dan hasilnya:

| Yang diukur di 360 px | Hasil |
|---|---|
| Gulir mendatar di halaman 1, 2, 3, dan layar narasi | **tidak ada** di keempatnya |
| Tombol pilihan bahasa muat di layar | ya (10-350 px dari 360) |
| Kartu judul muat, tidak meluber | ya (10-350 px) |
| Baris kanji dan paragraf muat di dalam kartu | ya (25-297 px) |
| Bar bacaan tetap muat, kotak cari dan kedua sakelar | ya, tidak ada gulir mendatar (360 px dari 360 px) |
| Balon sebuah label (dua baris: romaji dan arti) | seluruhnya di dalam layar (x 20-116 px, y 200-288 px) |
| Pencarian menyaring dan tombol `Baca judul ... penuh` muat | ya (tepi kanan 333 px) |
| Kesalahan konsol | **0** |

**Alamat yang salah ketik juga diuji, karena alamat itu bisa dibagikan orang.** Halaman ini
seluruhnya dialamatkan lewat hash, jadi pembaca bisa mengetik apa saja. Yang diuji dan hasilnya:

| Alamat yang diuji | Hasil |
|---|---|
| `#/garbage`, `#//` | ke pemilih bahasa, halaman tidak kosong |
| `#/read/`, `#/read/id`, `#/read//jp`, `#/read/id/jp/` | ke daftar judul, 20 judul terisi, 156 dihitung |
| `#/read/ID/JP` (huruf besar) | dinormalkan: UI `id`, target `jp` |
| `#/read/id/jp/tidak_ada` | kembali ke daftar judul, bukan narasi kosong |
| `#/read/id/jp/kurasi06/ekstra` | tetap membuka narasi itu |
| Tombol kembali browser | `#/lang` → `#/target/id` → `#/read/id/jp` → narasi, dan kembali tiga langkah dengan urutan yang sama |

**Satu cacat nyata ditemukan di sini, dan sudah diperbaiki.** Kode bahasa **antarmuka** sudah
dinormalkan sejak awal, tetapi kode **bahasa sasaran** tidak: `#/read/id/JP` menyimpan `JP` apa
adanya, dan kode yang salah ketik itu **ikut terbawa ke setiap tautan** yang diklik pembaca
berikutnya. Sekarang keduanya dinormalkan oleh fungsi terpisah, `normLang()` dan `normTarget()`,
dan keduanya menyebut di komentarnya bahwa daftar bahasanya harus ditambah bersamaan dengan
tombol pilihannya.

**Halaman juga diuji disajikan dari subpath, bukan dari berkas lokal.** Selama pengembangan,
halaman dibuka sebagai `file://`, dan itu **tidak membuktikan apa pun tentang produksi**: GitHub
Pages menyajikannya dari `/LangDocs/`, dan satu jalur absolut saja akan membuat berkas gagal dimuat
hanya di sana. Yang dilakukan: salinan situs disajikan lewat server lokal di bawah `/LangDocs/`,
lalu diperiksa. Hasilnya:

| Yang diukur dari `/LangDocs/` | Hasil |
|---|---|
| Berkas js/css yang diminta browser | **18**, semuanya **200**, tidak ada 404 |
| Kesalahan konsol dan berkas gagal muat | **0** |
| Lexicon termuat | 3.579 entri |
| Daftar jenis termuat | 12 |
| Narasi terbaca | **156** |
| Tautan langsung `#/read/id/jp/kurasi06` | membuka narasi, glosa terisi, tidak ada sel kosong |
| Berkas yang dibutuhkan tiap rute | **tidak ada**: seluruh rute lewat hash, jadi tidak ada satu pun alamat yang perlu berkas terpisah dan bisa 404 |

Rute yang berbasis hash dipilih sejak awal, dan uji ini membuktikan alasannya berlaku: tidak ada
`pushState` dan tidak ada `location.pathname` di `app.js`, sehingga satu-satunya berkas yang perlu
ada di server adalah berkas yang memang ada di repo.

**Keadaan branch saat diserahkan, supaya siapa pun bisa memeriksa ulang sebelum merge.** Pada
2026-09-26, `refactor/narrative-deck` berdiri **47 commit di depan `main`** dan **0 commit di
belakangnya** (`git rev-list --count HEAD..main` = 0), jadi `git merge --ff-only` berhasil tanpa
konflik. Diff-nya 45 berkas, +5.845 / -13.732 baris: yang hilang lebih banyak daripada yang
ditambah, karena gunung kalimat diganti narasi.

**Catatan tentang cara saya memeriksa itu sendiri.** Pemeriksaan pertama saya menulis
`git merge-base --is-ancestor main HEAD && echo ff-ok || echo ff-gagal` tercampur dengan
`rev-parse` lain pada satu baris, dan hasilnya melaporkan **"ff-only akan gagal"**, padahal
`main` memang leluhur `HEAD`. Yang salah adalah perintahnya, bukan branchnya. Diperiksa ulang
dengan satu perintah bersih, dan hasilnya seperti tertulis di atas. Ini dicatat karena bentuk
kesalahan ini pernah terjadi berkali-kali di pekerjaan ini: **kesimpulan dari perintah yang
dicampur lebih berbahaya daripada kesimpulan dari perintah yang sederhana.**

**Yang tidak bisa diukur dan karena itu tidak ada di tabel ini:** apakah bahasa Jepangnya benar,
apakah nadanya pantas untuk keadaan itu, dan apakah dua narasi benar-benar membahas hal yang
berbeda. Ketiganya dipegang oleh pembacaan penulis dan `docs/JUDUL.md`, dan itulah bentuk penjaga
yang tersisa setelah pengujian dihapus. Tabel di atas menunjukkan bahwa yang **bisa** diperiksa
memang bersih; ia tidak mengatakan apa pun tentang yang tidak bisa.

**Yang hilang bersama pemeriksanya, disebut di sini supaya tidak dilupakan.** Dulu ada lima skrip
yang menjaga deck ini: `check.js` (isi dan kelayakan kalimat), `test.js` (DOM yang benar-benar
dirender), `ui.js` (pencarian, balon, fokus keyboard), `coverage.js` (daftar kata medan makna), dan
`syncdocs.js` (menyalin angka terukur ke dokumen). **Kelima berkas itu sudah dihapus atas
permintaan pemilik proyek**, dan penggantinya bukan pemeriksa yang lebih baik, melainkan penjaga
yang berbeda: `docs/JUDUL.md` untuk pengulangan, pembacaan penulis untuk bahasa, dan `ci.yml`
untuk sintaks. Itu pertukaran yang disengaja, dan kelemahannya nyata: kesalahan bahasa tidak lagi
tertangkap mesin.

---

## 5. Cara memakai berkas ini

Sebelum menulis narasi:

1. **Putuskan judul dan isinya dulu.**
2. Buka `docs/JUDUL.md`, cek judul **dan** isi secara semantik (K11), dan lihat jenis apa yang
   sudah terpakai di topik itu (K12).
3. Buka `data/t_<topik>.js` untuk melihat cakupan topiknya: mana yang termasuk, mana yang bukan.
4. Periksa bahasanya terhadap K3, K4, K6, dan K7.
5. Tulis narasinya di `data/t_<topik>.js` mengikuti bentuk di `data/bank.js`.
6. Tambahkan barisnya ke `docs/JUDUL.md`: judul, judul EN, jenis, topik, ringkasan isi, frasa
   kunci, lawan bicara.
7. Jalankan `node --check data/t_<topik>.js`, lalu buka halamannya dan pastikan tidak ada
   peringatan kata di konsol.

Kalau ada ketentuan di sini yang menghalangi penulisan narasi yang jelas benar, yang salah adalah
ketentuannya, bukan narasinya. Perbaiki berkas ini dan sebutkan di ringkasan perubahan, jangan
diam-diam dilewati.
