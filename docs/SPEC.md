# Ketentuan bank kalimat

Berkas ini adalah daftar ketentuan yang harus dipatuhi setiap kalimat di LangDocs. Ia
ditulis sebagai syarat, bukan saran: satu baris per ketentuan, disertai alasan, cara
memeriksanya, dan bentuk pelanggarannya seperti apa.

Kalau sebuah ketentuan tidak bisa diperiksa, itu ditulis apa adanya di kolom **diperiksa
oleh**. Ketentuan yang tidak diperiksa akan bergeser seiring waktu, dan menyebutnya jujur
lebih berguna daripada berpura-pura semuanya terjaga.

Dua berkas bekerja bersama: berkas ini menetapkan syaratnya, `docs/README.md` menghitung
berapa kalimat yang pantas ada di tiap topik, dan `docs/topics/*.md` mencatat apa yang sudah
ditulis untuk topik itu serta apa yang belum.

---

## 1. Ketentuan isi

### K1. Kalimat ditulis sendiri, bukan dihasilkan mesin

Kalimat tidak boleh lahir dari kerangka yang diisi kata benda. Satu kerangka yang dipakai
ulang dengan kata yang ditukar adalah persis keluhan yang memulai aturan ini: topiknya
berganti, kalimatnya sama.

**Alasan.** Pembaca merasakan pengulangan itu walau tidak bisa menamainya, dan begitu
terasa, seluruh bank kehilangan kepercayaan.

**Diperiksa oleh.** `check.js` bagian `distinct`: dua kalimat yang tersisa sama setelah kata
benda dan kata waktu dibuang dianggap satu kerangka, dan satu kerangka boleh dipakai paling
banyak tiga kali. Kalau ambang ini sering tertabrak, artinya kalimatnya sedang dihasilkan,
bukan ditulis.

**Gejala pelanggaran.** Beberapa kalimat panjang dengan predikat terakhir yang sama dan
partikel yang sama, misalnya berakhir `〜を買いました` berkali-kali.

### K2. Kalimat panjang diutamakan

Kalimat panjang adalah kalimat yang menyatakan sesuatu: pernyataan, penjelasan, atau pembuka
yang membuat lawan bicara ingin melanjutkan. Kalimat panjang adalah **pilihan pertama**, bukan
salah satu pilihan. Kalimat pendek dipakai hanya bila versi panjangnya justru terdengar aneh.

**Alasan.** Percakapan sehari-hari yang berguna bukan daftar sapaan. Yang sulit dan yang
paling sering dibutuhkan adalah kalimat yang membawa isi, dan kalimat pendek adalah tempat
penulis berlindung ketika kalimat panjangnya tidak jadi.

**Diperiksa oleh.** `check.js` bagian `balance`, dengan dua lantai karena keduanya mengukur hal
yang berbeda:

| Lantai | Angka | Mengukur apa |
|---|---|---|
| Seluruh deck | 50% panjang | kemunduran ke buku frasa |
| Tiap topik | 60% panjang | satu topik yang menyimpang tidak bisa bersembunyi di balik topik lain |

Angka keduanya adalah **pagar, bukan target**, sama seperti lantai lama. Yang membedakan: lantai
per topik baru ada karena sebelumnya satu topik bisa jatuh ke bentuk buku frasa tanpa terlihat
selama topik lain menutupinya. Angkanya 60%, bukan lebih tinggi, karena topik yang paling
banyak berisi reaksi pendek berdiri di 67,9% (`sopan`), jadi ambang yang lebih tinggi akan
memaksa kalimat panjang masuk ke topik yang gunanya justru kalimat pendek. Hari ini topik
terendah 67,9% dan tertinggi 100%, jadi lantainya jauh di bawah kenyataan: kalau nanti ia
tertabrak, itu tanda kemunduran, bukan tanda lantainya kurang tinggi.

**Ukuran panjang.** Sedikitnya 6 token setelah tanda baca dibuang (`MIN_LONG_TOKENS`).

**Gejala pelanggaran.** Deck yang sebagian besar isinya 「〜お願いします。」 dan 「〜ですね。」.

### K3. Kalimat panjang wajib punya relasi antar klausanya

Klausa disambung dengan alasan: `ので`, `から`, `けど`, `けれど`, `たら`, `とき`, `ながら`,
`ため`, `し`, `てから`, `あとで`, `まえに`, `のに`, `なければ`, `れば`, `なら`, `と`, `が`.
Menyambung klausa dengan `それから`, `そして`, `そのあと`, `次に`, `その後`, `まず` dilarang.

**Alasan.** `それから` hanya menomori dua hal yang berdiri sendiri-sendiri. `ので` atau `から`
menyatakan hubungan sebab, dan itu yang membuat satu kalimat berarti satu hal.

**Diperiksa oleh.** `check.js` bagian `one_thought`, daftar `RELATION` dan daftar `SEQUENCE`.

**Gejala pelanggaran.** `〜しました。それから〜しました。` sebagai satu kalimat panjang.

### K4. Kalimat pendek hanya untuk yang benar-benar lazim dipakai

Kalimat pendek dipakai bila memang itu yang diucapkan orang dan versi panjangnya tidak lebih
baik. Bukan karena kalimatnya sulit ditulis panjang.

**Alasan.** 「これ、お願いします。」 adalah cara orang membeli barang. Tidak ada versi panjang
yang lebih baik. Sebaliknya 「おはようございます。」 yang dipanjangkan dengan alasan apa pun
hanya terdengar seperti latihan.

**Ukuran "benar-benar lazim" yang bisa diperiksa.** Waktu pertama aturan ini berbunyi, tidak
ada yang memeriksanya. Cara menghitungnya ditulis di sini supaya bisa diulang siapa pun, karena
dua angka di bagian ini sempat salah: angkanya dulu dihitung dengan pemeriksa yang mencari
penanda hanya di **kata terakhir**, dan pemeriksa itu melewatkan `でしょうか` yang terpecah
menjadi dua kata serta penanda yang berada di tanda baca. Yang dihitung sekarang adalah ujung
**seluruh kalimat** setelah tanda baca penutupnya dibuang, sama seperti yang didengar pembaca.
Dengan cara itu, lima dari 58 kalimat pendek tidak punya penanda apa pun bahwa itu memang yang
diucapkan orang.

Ada dua ukuran, dan satu kalimat pendek cukup memenuhi salah satunya:

| Ukuran | Kenapa itu bukti |
|---|---|
| Berakhir partikel akhir kalimat (`ね`, `よ`, `か`, `な`, `の`, `わ`, `ぞ`, `ぜ`, `かしら`) atau bentuk santun (`です`, `ます`, `でした`, `ました`, `ください`, `お願いします`) | Itu yang membuat kalimat pendek terdengar utuh dan bukan terpotong. Kalimat pendek tanpa keduanya hampir selalu `それから` yang kehilangan klausanya |
| Ditandai `short: 1` di entri, dengan alasannya | Sebagian kalimat pendek orang memang tanpa penanda, dan yang menentukan bukan tanda tapi bahwa kalimat itu memang dipakai: pembuka dan penutup telepon, sapaan, ucapan terima kasih. Tanda itu menyatakan penulis sudah memeriksanya, dan jumlahnya dilaporkan supaya tidak berubah jadi jalan keluar |

**Diperiksa oleh.** `check.js` bagian `short`: setiap kalimat pendek harus memenuhi salah satu
ukuran di atas, dan jumlah yang bertanda `short: 1` dicetak supaya kenaikannya terlihat.
Alasan pada penanda itu ditulis juga di berkas topik pada kolom slot `pendek`.

**Gejala pelanggaran.** Kalimat pendek muncul sebagai jalan keluar saat kalimat panjangnya
tidak jadi, lalu diberi alasan sesudahnya. Bentuk yang sering muncul: kalimat berhenti tepat
saat sudah cukup panjang untuk ditulis panjang. Di data yang ada sekarang, lima kalimat pendek
yang tanpa penanda **hampir semuanya memang lazim** (`おやすみ` saat berangkat tidur,
`ごちそうさま、おいしかった` setelah makan, `いただきまーす` sebelum makan, dan dua jawaban
pendek), dan itulah sebabnya ukuran kedua ada: yang menentukan bukan bentuknya, melainkan
apakah kalimat itu memang dipakai.

### K5. Register harus cocok dengan lawan bicaranya

`polite: 1` untuk です/ます, `polite: 0` untuk bentuk biasa. Bentuk santun dipakai kepada
orang yang tidak akrab, bentuk biasa kepada yang akrab.

**Alasan.** Ukuran yang paling tajam memisahkan akrab dan asing adalah bentuk santun, bukan
kata tanya. Kepadatan です/ます pada CEJC adalah 6,7 per 1.000 kata di rumah dan 20,7 per
1.000 kata di kantor, jadi sekitar tiga kali (`outputs/markers.txt`).

**Diperiksa oleh.** `check.js` bagian `register`. Kalimat dari `data/curated.js` dilewati
karena sudah membawa label lawan bicaranya sendiri.

**Gejala pelanggaran.** `polite: 1` tanpa です/ます, atau `polite: 0` yang berisi です.

### K6. Waktu lampau harus cocok dengan kata kerja di klausanya sendiri

Kata waktu lampau (`昨日`, `今朝`, `先週`, `去年`, `先月`, `おととい`) menuntut kata kerja
bentuk lampau di klausa yang sama, bukan di klausa sebelah.

**Alasan.** Klausa dibaca satu per satu. `昨日` di klausa A dengan kata kerja lampau di
klausa B adalah kalimat yang salah, bukan kalimat yang sulit.

**Diperiksa oleh.** `check.js` bagian `tense`, yang memecah kalimat pada penanda klausa dan
menilai tiap klausa sendiri. Klausa tanpa kata kerja digabung ke klausa berikutnya, karena
`昨日、駅の近く安いレストランで友達と` memang bukan klausa.

**Gejala pelanggaran.** `昨日は〜ですが、今日は〜でした。`

### K7. Setiap kata punya romaji dan dua glosa

Glosa ditulis dalam bahasa Indonesia dan bahasa Inggris. Satu kata ditulis sekali di
`data/lexicon.js`, dengan romaji dan kedua glosanya, sehingga ejaannya tidak mungkin berbeda
di dua kalimat.

**Alasan.** Romaji yang berubah antar kalimat membuat pembaca mengira ada dua kata berbeda.
Tanda baca menempel pada kata sebelumnya (`ください。`) supaya tidak terpisah saat baris
berganti.

**Diperiksa oleh.** `check.js` bagian `structure`: setiap token yang bukan tanda baca harus
punya glosa Indonesia dan Inggris. `test.js` memeriksa hal yang sama pada DOM yang benar-benar
dirender, karena sel glosa yang kosong pernah lolos ke halaman.

**Gejala pelanggaran.** Sel glosa kosong di panel, atau romaji berbeda untuk kata yang sama.

### K8. Bank harus punya kalimat balasan, bukan hanya kalimat pembuka

Bukan hanya kalimat yang memulai sesuatu. Harus ada juga kalimat yang **menjawab**: menjawab
pertanyaan, menanggapi ajakan, menerima tawaran, menolak dengan halus, mengaku belum paham,
menanggapi pujian, menjawab bahwa orangnya sedang keluar. Kalimat balasan sama pentingnya
dengan kalimat pembuka, karena pembaca menghabiskan lebih banyak waktu sebagai pihak yang
menjawab: ditanya arah, ditawari makanan, ditelepon, ditanya kapan mulai.

**Alasan.** Deck yang hanya berisi kalimat pembuka adalah deck yang bisa memulai percakapan
tapi tidak bisa meneruskannya.

Ukurannya ada, dan perlu dibaca dengan tepat. Pertanyaan adalah **15–20% unit ujaran** CEJC
(`outputs/estimate.txt` bagian 6), jadi sekitar 80% sisanya **bukan pertanyaan**. Itu tidak sama
dengan "80% sisanya adalah jawaban", dan selisihnya penting: yang diukur adalah berapa banyak
ujaran yang **menanyakan**, bukan berapa banyak yang **menjawab**. Sebagian besar sisa itu
adalah pernyataan biasa, yang sudah ditutup K2.

Yang benar-benar ditopang angka itu adalah ini, dan itu sudah cukup untuk aturannya: bagian
percakapan yang **bertanya** hanya sekitar seperlima, sedangkan bagian yang harus **menanggapi
pertanyaan** hampir lima kali lipatnya. Deck tanpa kalimat balasan menyiapkan pembaca untuk
seperlima percakapan dan meninggalkannya di empat perlima sisanya. Lantai 3 di K8 kecil justru
karena alasan ini hanya menetapkan bahwa bagian itu harus ada, bukan seberapa besar ia harus.

**Bagaimana balasan dikenali.** Bukan dari bentuk kalimatnya, karena 「大丈夫です。」 bisa jadi
jawaban atau bukan tergantung keadaan yang dimaksud. Yang menentukan adalah **situasinya
menyebut apa yang dikatakan lawan bicara**, sehingga pembaca tahu kalimat itu jawaban atas
apa. Ukurannya bisa diperiksa:

| Bertanda balasan | Bukan balasan |
|---|---|
| "Menjawab pertanyaan dokter tentang kapan mulai" | "Menanyakan kapan mulai" |
| "Menolak tawaran makanan karena masih kenyang" | "Menilai harga terlalu tinggi" |
| "Menanggapi pujian tanpa terdengar sombong" | "Memberi pujian kepada rekan" |

Kalimat yang hanya **mengandung** kata menolak atau menerima tidak otomatis balasan. Yang
menentukan pemicunya disebut atau tidak: "menolak kantong plastik karena membawa tas sendiri"
adalah keputusan sendiri, sedangkan "menolak tawaran kantong dari petugas" adalah balasan.

Alasannya satu kalimat biasa berfungsi dua. 「大丈夫です。」 adalah jawaban atas tawaran
bantuan, dan memaksanya sebagai kalimat tersendiri menghasilkan kalimat yang tidak ada artinya.
Karena itu yang dituntut adalah **lantai**, bukan bagian tetap: deck boleh punya balasan lebih
banyak dari lantainya.

**Diperiksa oleh.** `check.js` bagian `reply`: tiap topik harus punya sedikitnya **3 kalimat
balasan**, dan situasinya harus menyebut pemicunya. Daftar pemicu ada di `check.js`
(`TRIGGER`, `TRIGGER_EN`), dan setiap topik juga mencantumkan baris balasannya di berkas topik
pada slot `menjawab`. Angka 3 dipilih karena tanpa lantai, kalimat balasan ternyata tidak
merata. Diukur dengan daftar pemicu di `check.js` pada data sebelum penulisan ini: 4 dari 13
topik berdiri di bawah 3, `kegiatan` dan `klinik` hanya punya 1, dan `belanja` serta
`waktu_cuaca` punya 2, padahal slot `menjawab` di berkas topik keduanya sudah ditulis seolah
terisi. Lantai 3 dan lantai panjang 60% mengukur hal yang berbeda dan keduanya bisa berlaku
bersamaan; yang satu menuntut isi, yang satu menuntut fungsi.

**Gejala pelanggaran.** Topik yang semua kalimatnya pertanyaan atau pernyataan, dan tidak ada
satu pun yang menjawab. Bentuk yang paling sering muncul di data: slot `menjawab` di berkas
topik diisi nama keadaan, padahal kalimatnya belum ada, sehingga berkas itu terlihat lengkap
sementara decknya belum.

### K9. Lawan bicara harus sebanding dengan kenyataannya, dan bisa dicari

Setiap kalimat menyebut siapa yang diajak bicara lewat satu nilai `rel` (`const.js`), dan
sebaran nilai itu harus sebanding dengan sebaran lawan bicara yang terukur. Pertanyaan yang
dijawab aturan ini bukan "apakah tiap orang punya kalimat", melainkan **"apakah jumlahnya
sebanding dengan seringnya orang itu diajak bicara"**.

**Kenapa ini perlu aturan sendiri.** Tiga cacat nyata yang semuanya lolos sebelum aturan ini ada:

| Cacat | Akibatnya |
|---|---|
| Sebaran `rel` tidak pernah diukur sama sekali | Topik punya kuota terukur, tapi "kepada siapa" tidak. Satu jenis lawan bicara bisa hampir hilang tanpa ada yang melihat |
| Baris "Lawan bicara yang sudah dipakai" di berkas topik ditulis dari ingatan | 9 dari 12 baris salah: tertinggal beberapa kalimat, dan nilainya ditulis sebagai nama tampilan (`orang asing`) padahal data menyebut `orang_asing` |
| Baris itu **tidak bisa dicari** di halaman | Pencarian tidak mengindeks baris lawan bicara, sehingga mencari `pasangan` menemukan **1** kartu padahal ada **22**. Satu-satunya label yang dimiliki kartu itu justru satu-satunya yang tidak bisa dicari |

**Diperiksa oleh.** `check.js` bagian `who`:
- sebaran per kelompok lawan bicara dicetak, dikelompokkan sama seperti survei mengelompokkannya
  (`WHO_GROUP`), supaya pertanyaan "apakah satu jenis orang hilang" punya tempat dibaca
- jumlah per topik dicetak, supaya baris di berkas topik **disalin dari keluaran**, bukan dihitung
  tangan. Menghitung tangan adalah sebab 9 dari 12 baris itu salah
- dua kelompok yang sengaja tidak ditulis dicetak **beserta alasannya** (`WHO_NOT_WRITTEN`), supaya
  kelompok yang tipis terbaca sebagai keputusan, bukan kelalaian

**Diperiksa oleh `ui.js`.** Mencari label lawan bicara harus menemukan seluruh kalimat orang itu:
harapannya dihitung `ui.js` dari berkas data, jadi menambah satu kalimat tidak bisa diam-diam
membuat pemeriksaannya lolos. Sifat yang diuji "minimal sebanyak itu", bukan "tepat", karena
pencarian memang mencakup seluruh teks yang terlihat (V7).

**Angka yang berlaku sekarang, dan penyimpangannya.** Bagian terukur dihitung dari
`data/survey.zip` (9.272 percakapan, 10.708 slot lawan bicara): keluarga dekat 36,8%,
kerja & belajar 22,7%, teman & tetangga 17,2%, publik & jasa 10,8%, guru-murid 3,1%, orang
asing 2,4%.

| Kelompok | Deck | Terukur | Selisih |
|---|---|---|---|
| kerja & belajar | 28,5% | 22,7% | **+5,8** |
| publik & jasa | 15,3% | 10,8% | **+4,5** |
| orang asing | 6,6% | 2,4% | **+4,2** |
| teman & tetangga | 18,0% | 17,2% | **+0,8** |
| guru-murid | 1,1% | 3,1% | -2,0 |
| keluarga dekat | 30,5% | 36,8% | **-6,3** |

Kolom Deck dihitung dari 557 kalimat tertulis. Angka di tabel ini pernah basi (dihitung dengan
penyebut 515) dan tidak ada yang menyadarinya, karena itu `test.js` sekarang menghitung ulang tiap
barisnya dari berkas data dan berkas topik. Kelompok dengan selisih **5,0 poin atau lebih** disebut
menyimpang, dan itu berlaku untuk keluarga dekat serta kerja & belajar.

**Keluarga dekat kurang 6,3 poin, dan itu diakui, bukan dibiarkan terlihat seperti sebaran yang
seimbang.** Sebab terukurnya: kata paling ringkas untuk mengelompokkan percakapan adalah tempat ×
kegiatan, dan di rumah satu orang menghadapi anggota keluarga sekaligus, sehingga keluarga jatuh
ke dalam kalimat yang bertopik, sedangkan pasangan (23 kalimat) dan keluarga yang berkunjung
(berkata sopan) tersebar di beberapa topik. Jadi arah penyimpangannya diketahui dan sebabnya
tercatat; yang belum ada adalah kalimat untuk keluarga dalam jumlah yang sebanding, dan itu
pekerjaan yang masih terbuka.

**Kenapa 6,3 dan bukan 3,8.** 3,8 poin adalah angka dari penyebut lama (449 kalimat). Setelah
gelombang berikutnya, penyebutnya 557 dan selisihnya 6,3, walaupun jumlah kalimat keluarga tidak
berkurang sama sekali (tetap 170). Selisih sebaran seperti ini **selalu dihitung ulang**, tidak
pernah dikutip dari catatan sebelumnya, karena tambahan kalimat untuk kelompok lain saja sudah
cukup untuk menggesernya.

**Harus dipatuhi.** Sebelum menambah kalimat untuk menyamakan sebaran, ingat aturan bahasa yang
tidak bisa ditawar: kalimat pendek hanya yang benar-benar lazim (K4), kalimat panjang wajib punya
relasi klausa (K3), dan kerangka wajib unik (T4). Menambah kalimat hanya demi angka akan tertangkap
`check.js` tiga kali sekaligus, jadi yang harus dilakukan adalah **mencari keadaan nyata yang
belum tertulis untuk kelompok yang kurang**, bukan menulis ulang keadaan yang sudah ada dengan
lawan bicara berbeda.

---

---

## 2. Ketentuan topik

### T1. Jumlah kalimat per topik mengikuti probabilitas terukurnya

Bukan dibagi rata. Bagian tiap topik dihitung dari data percakapan, lalu dikalikan skala
deck. Angka dan cara hitungnya ada di `docs/README.md`.

**Alasan.** Kalau kantor sepuluh kali lebih sering dibicarakan daripada apotek, deck yang
memberi keduanya jumlah kalimat yang sama akan salah menggambarkan bahasa yang dipakai orang.

**Diperiksa oleh.** Perbandingan jumlah kalimat per topik dengan tabel kuota di
`docs/README.md`. Dihitung ulang setiap kali ada topik baru.

### T2. Setiap topik ditulis sampai mentok

**Mentok berarti topik itu sudah tidak bisa dibuatkan kalimat lagi.** Bukan berarti kuotanya
habis, bukan berarti jumlahnya sudah cukup, dan bukan berarti tabel kerangkanya sudah panjang.
Sebuah topik mentok kalau tidak ada lagi keadaan nyata dari kehidupan sehari-hari yang belum
punya kalimat di berkasnya.

Urutan yang benar, dan ketiganya berbeda:

| Keadaan | Artinya | Cara tahu |
|---|---|---|
| belum ditulis | belum ada kalimatnya sama sekali | kolom "sudah ditulis" nol |
| **kuota penuh** | jumlahnya sudah mencapai angka rencana | kolom sisa nol |
| **mentok** | tidak ada keadaan baru yang bisa dibuatkan kalimat | daftar celah kosong **dan** satu putaran pencarian baru tidak menemukan apa pun |

Kuota adalah lantai, bukan langit-langit. Kalau sebuah topik masih bisa dibuatkan kalimat yang
nyata dan berbeda, kalimat itu ditambahkan walau kuotanya sudah lewat, dan kuotanya dinaikkan
beserta alasan yang tertulis di dua tempat: berkas topiknya dan `README.md`.

**Ukuran yang dipakai untuk "keadaan nyata dan berbeda",** supaya tidak jadi soal selera:

1. Keadaannya bisa disebut dalam satu kalimat tanpa menyebut nama topiknya, misalnya "menitipkan
   kunci ke tetangga" bukan "hal-hal rumah tangga".
2. Kalimatnya menjawab pertanyaan yang benar-benar ditanyakan orang, bukan pertanyaan yang
   dibuat supaya ada contoh.
3. Kerangkanya belum dipakai kalimat lain, dan `check.js` bagian `distinct` membuktikannya.
4. Kalau keadaan itu hanya berbeda kata benda dari kalimat yang sudah ada, itu bukan keadaan
   baru. `肉を買いました` dan `魚を買いました` adalah satu keadaan.

**Kalimat yang tidak boleh ditambahkan.** Kalimat yang diberi sambungan supaya terlihat panjang,
kalimat yang hanya menukar kata benda dari kalimat lain, dan kalimat yang tidak punya keadaan
yang bisa diceritakan. Deck yang ditambah dengan cara ini jadi lebih besar tanpa jadi lebih
berguna, dan itu pelanggaran, bukan pencapaian.

**Alasan.** Kuota menjaga keseimbangan antar topik, saturasi menjaga agar tiap topik benar
benar bisa dipakai. Dua hal berbeda, dan keduanya dibutuhkan.

**Diperiksa oleh.** Kolom sisa menjawab "apakah kuotanya sudah penuh", dan daftar celah
menjawab "apakah masih ada yang belum ditulis". **Sisa nol bukan bukti mentok.** Ketiga topik
pertama yang mencapai kuotanya, `belanja`, `kerja`, dan `makan`, semuanya bersisa nol dan
semuanya masih punya celah terbuka saat itu.

**Harga yang harus dibayar, dan ini yang paling mudah salah dibaca.** Pencarian celah tidak
menyusut. Setelah seluruh 13 topik diperiksa sekali, 62 celah ditutup dan 63 celah baru tercatat:
tiap putaran menutup N dan memunculkan sekitar N, karena pemeriksaannya makin dalam, bukan makin
dekat selesai. Konsekuensinya disebut terang-terangan:

| | |
|---|---|
| Jumlah putaran yang membuktikan mentok | tidak diketahui, dan tidak ada bukti bahwa satu kali cukup |
| Yang **tidak boleh** dilakukan | menyebut sebuah topik mentok hanya karena putaran celahnya baru selesai |
| Yang wajib dilakukan kalau berhenti | sebut berhenti sebagai **keputusan**, sebutkan berapa celah yang masih terbuka, dan jangan pakai kata mentok |

Kalau sesi berikutnya menemukan "sisa 0" di sebuah berkas topik, itu berarti kuota penuh. Itu
bukan izin untuk menulis kata mentok, dan bukan alasan untuk menganggap topiknya selesai.

### T3. Setiap topik menutup seluruh ruang ucapannya

Bukan hanya kalimat tanya, dan bukan hanya bentuk sopan. Ruang ucapan minimal yang harus
terisi: bertanya, menjawab, mengajak, menerima, menolak dengan halus, menyusun rencana,
menceritakan yang lampau, meminta tolong, menjelaskan. Tiap slot harus ada dalam bentuk sopan
dan bentuk biasa.

**Alasan.** Yang membuat deck bisa dipakai bukan jumlah kalimat, tapi ada atau tidaknya
kalimat untuk keadaan yang sedang dihadapi pembaca. Topik tanpa cara menolak adalah topik
yang tidak bisa dipakai.

**Diperiksa oleh.** Kolom slot di berkas topik. Berkas yang slotnya masih banyak kosong
belum boleh disebut selesai.

### T4. Kerangka kalimat harus unik, juga antar topik

Topik yang berbeda wajib memakai kerangka yang berbeda. Satu kalimat panjang tanpa relasi
klausa dianggap kalimat pendek, jadi panjang saja tidak cukup: polanya juga harus baru.

**Alasan.** Mengganti kata benda pada kerangka yang sama adalah cara termudah terlihat
seperti menulis, dan itu keluhan yang memulai aturan ini.

**Diperiksa oleh.** `check.js` bagian `distinct`, dan daftar "kerangka yang diklaim" di tiap
berkas topik. Sebelum menulis, lihat kerangka yang sudah diklaim topik lain.

### T5. Topik baru wajib terdaftar di dua tempat

Berkas `data/t_nama.js` dan satu baris `<script src="data/t_nama.js"></script>` di
`index.html`.

**Alasan.** Berkas topik yang tidak termuat membuat kalimatnya hilang tanpa suara, dan
halaman tetap terlihat normal.

**Diperiksa oleh.** `test.js`: setiap berkas topik di `data/` harus ada di `index.html`.

### T6. Medan makna adalah daftar celah, bukan topik

Deck ini menutup dua hal yang berbeda, dan keduanya harus disebut dengan nama yang berbeda:

| | **Keadaan** (situasi) | **Medan makna** (kata) |
|---|---|---|
| Contoh | memesan makanan, menolak lembur, menanyakan arah | sumpit, piring, tangan, kakak, penyanyi, banjir, bangun pagi |
| Bentuk di repo | topik: `data/t_*.js` + `docs/topics/*.md` | daftar kata di `coverage.js` |
| Sumber angkanya | 場所 × 活動 di `data/survey.zip` | **tidak ada** |
| Punya kuota | ya | **tidak** |
| Kalau kurang | salah satu topiknya kurang | kalimatnya yang kurang, dan itu tercatat |

**Satuan yang dihitung deck ini adalah kalimat, bukan kata.** Kedua kolom di atas berakhir di
satuan yang sama: topik yang terukur punya kuota **kalimat**, dan medan makna yang tak terukur
punya celah **kalimat**. `coverage.js` memang menyimpan daftar kata, tapi kata itu hanya penanda
medannya, dan yang dicetak `check.js` adalah berapa **kalimat** yang belum ditulis untuk memuatnya.
Yang dibaca pembaca juga kalimat, bukan kata lepas, jadi menyebut celahnya dalam satuan kata akan
menghitung hal yang tidak pernah muncul di halaman.

Aturan ini berlaku untuk seluruh berkas: **"kata" hanya dipakai kalau yang dibicarakan memang
kata itu sendiri** (isinya daftar, ada tidaknya entri di `lexicon.js`, kata benda tidak punya
tempat dan kegiatan). Di luar itu, satuan yang dipakai adalah kalimat.

**Semua yang disebut di kolom kanan itu memang kehidupan sehari-hari.** Bangun pagi, sebutan
kakak dan kakek, nama pekerjaan, gunting kuku, banjir, dan memperkenalkan diri semuanya dipakai
orang setiap hari. Yang membuatnya **bukan topik** bukan "kurang sehari-hari", melainkan satu hal
yang lebih sempit: **survei tidak bisa mengukurnya.** Survei mencatat 場所 (tempat) × 活動
(kegiatan) untuk tiap percakapan. Kata benda tidak punya tempat dan tidak punya kegiatan, jadi
tidak ada satu sel pun yang bisa dipakai menghitung "berapa bagian percakapan yang membicarakan
sumpit". Memberi medan makna sebuah kuota berarti mengarang angka, dan itu persis yang dilarang T1.

**Kenapa tidak boleh diabaikan juga.** Kalau deck tidak pernah menyebut sumpit, piring, atau
kakak, kalimatnya benar tapi tidak bisa dipakai untuk hal yang sedang dihadapi pembaca. Aturan
yang membuat keduanya hidup bersama: **kata medan makna disebar ke dalam topik yang keadaannya
memang membutuhkannya.** `箸` masuk ke `makan` karena di sanalah orang menyebutnya, `お腹` ke
`klinik`, `祖父` ke `rumah_santai`, `交差点` ke `jalan`. Topiknya tetap diukur, dan kata itu ikut
terbawa di dalam kalimatnya.

**Yang dilarang, dan ini mudah sekali dilanggar:**

1. **Membuat topik dari medan makna.** "Topik anggota tubuh", "topik nama pekerjaan", "topik
   bangunan" tidak boleh ada, karena tidak ada angka terukur di belakangnya.
2. **Menambah kalimat hanya untuk memasang kata.** `皿を洗いました` dan `コップを洗いました`
   adalah satu keadaan dengan kata benda yang ditukar, dan T2 sudah menyebutnya bukan keadaan
   baru. Kalimat yang ditulis begitu tetap membuat katanya terhitung "dipakai" oleh `coverage.js`
   tanpa menambah kalimat yang berguna, jadi aturan ini yang menjaganya.
3. **Menyebut sebuah topik mentok padahal medan maknanya masih berlubang.** Kalau
   `pekerjaan` masih 0 dari 14, topik `santai` belum mentok.

**Cara menutup celah.** Kalimatnya harus keadaan nyata yang menyebut kata itu karena keadaannya
memang menyebutnya: "adik saya yang masih SD ikut makan di sini" memuat `弟` sekaligus
menambahkan keadaan baru. "Adik saya ada di rumah" cuma kalimat yang memasang katanya.

**Setiap kalimat yang memasang kata itu wajib terpakai di dunia nyata, bukan hanya ada di buku
pelajaran.** Ini syarat yang sama kerasnya dengan larangan di atas, dan cara memeriksanya satu:
**tanyakan apakah orang Jepang mengatakan kalimat itu sambil menunjuk benda atau keadaan yang
benar-benar ada di depan matanya.** `私は弟がいます` lulus tata bahasa tapi tidak ada orang yang
mengatakannya; yang diucapkan orang adalah `弟が二人いる` waktu ditanya, atau `弟に貸した` waktu
benda itu dibicarakan. Kalimat yang lulus uji ini biasanya muncul sebagai **jawaban** atau
**penjelasan**, bukan sebagai pelajaran tata bahasa.

Uji yang dipakai kalau masih ragu, tiga sekaligus dan ketiganya harus lulus:

| Uji | Gagal berarti |
|---|---|
| Apakah ada alasannya diucapkan, bukan untuk mendemonstrasikan pola? | itu contoh buku teks |
| Apakah orang yang mendengarnya tahu benda/keadaan mana yang dibicarakan? | kalimatnya menggantung |
| Kalau diucapkan sekarang, kepada lawan bicara yang sudah ada, apakah masuk akal? | itu kalimat latihan |

**Kata yang tidak bisa dipakai di dunia nyata dihapus dari daftar, dengan alasan tertulis.** Daftar
medan makna bukan kamus: kata yang dicantumkan hanya supaya daftarnya kelihatan lengkap sama
salahnya dengan topik yang dibuat tanpa angka. `coverage.js` mencatat penghapusan seperti itu di
komentar, dan alasan yang bisa dipakai adalah "kata ini tidak muncul dalam percakapan sehari-hari",
bukan "belum sempat ditulis".

**Perkenalan diri (自己紹介) disebut khusus.** Ia satu adegan yang tetap dan tidak berubah: nama,
asal, pekerjaan, penutup. Ia bukan sel 場所 × 活動, jadi ia medan makna juga dan bukan topik.
Bedanya dengan medan makna lain, isinya bisa didaftar sampai habis karena adegannya pasti, jadi
`coverage.js` mencantumkan bagiannya satu per satu.

**Diperiksa oleh.** `check.js` mencetak, per medan, kata mana yang belum dipakai kalimat mana
pun, sekaligus berapa **kalimat celah** yang perlu ditulis. Dua jenis celah dibedakan karena
pekerjaannya berbeda: kata yang **siap ditulis** (sudah ada di `lexicon.js`, tinggal kalimatnya)
dan kata yang **belum ada di lexicon** (butuh entri dulu). Beda itu penting supaya "87 kata"
tidak terbaca seperti 87 kesalahan, padahal sebagian besar cuma rencana.

**Celah tercatat, bukan angka gagal.** `check.js` **tidak** gagal karena medan makna berlubang,
dengan alasan yang sama seperti sebaran lawan bicara di K9: tidak ada ambang yang bisa
dipertanggungjawabkan, jadi ambang yang dipasang cuma akan jadi angka karangan. Yang gagal adalah
hal mekanisnya: `coverage.js` menyebut kata yang tidak ada di `lexicon.js` **dan** tidak
dinyatakan sebagai "belum ada entri". Daftar celah yang menyebut kata yang tidak bisa diglosa deck
bukan daftar celah, itu salah tulis.

---

## 3. Ketentuan tampilan

Ketentuan ini sudah berjalan; ditulis di sini supaya tidak berubah tanpa disadari.

| # | Ketentuan | Diperiksa oleh |
|---|---|---|
| V1 | Mode gelap saja | tidak diperiksa |
| V2 | Setiap kartu berisi baris kanji, baris romaji, dan tombol `?`, tanpa nomor atau label | `test.js` |
| V3 | Kartu terlihat identik sampai dibuka; register (hijau akrab, kuning asing) hanya di dalam panel dan dua bahasa | `test.js` |
| V4 | Kata bersifat atomik (`display:inline-block`), warna dan garis bawah unik, dipakai bersama baris kanji dan romaji | `test.js` |
| V5 | Hanya satu panel terbuka; klik di luar atau Escape menutupnya | tidak diperiksa |
| V6 | Tautan `#qN` membuka kartu ke-N termasuk yang belum dirender | `test.js` |
| V7 | Romaji bisa dinyalakan dan **mati secara bawaan**; cakupan All (bawaan) atau Japanese; judul dan jumlah dua bahasa; placeholder `Search:` | `test.js` + `ui.js` |
| V8 | Kartu dimuat bertahap saat digulir dan tidak pernah dilepas | tidak diperiksa |
| V9 | Tidak ada build, tidak ada program penghasil kalimat; berkas dibaca langsung browser | susunan repo |
| V10 | Sel glosa tidak boleh kosong, dan tanda baca tidak berdiri sebagai baris sendiri | `test.js` |
| V11 | Mencari setelah menggulir menampilkan hasil teratas, bukan posisi gulir lama | `ui.js` |
| V12 | Arahkan kursor atau fokus ke satu kata: muncul balon yang menunjuk ke kata itu, isinya romaji dan glosa Indonesia + Inggris sebagai **tiga baris berlabel**, baris romajinya **berwarna sama dengan katanya**, labelnya **tidak boleh terbelah baris**, **tidak ada baris yang boleh terpotong di tengah kata**, **tidak** mengulang kata Jepangnya maupun baris yang sedang dibaca, dan seluruh balonnya **berada di dalam layar** di lebar mana pun | `ui.js` |

---

### V12. Balon per kata

Seorang pembaca meminta ini dengan kalimat: "hover atau klik per kata dari aksara jepang jangan
menampilkan kanji atau aksara jepang lagi yang sama, tapi romaji indonesia dan english, dan
menunjuk katanya langsung (seperti balon komik yang mengarah ke karakternya)".

Yang berubah dari alat lama: `title` sebelumnya diisi kata itu sendiri, jadi balon bawaan browser
menjawab pertanyaan yang tidak ditanyakan. Sekarang isinya apa yang belum terlihat di baris itu.

| Aturan | Alasan |
|---|---|
| Balon **tidak** memuat kata Jepangnya | Pembaca sedang melihat kata itu; mengulangnya memakan ruang yang dibutuhkan jawabannya |
| Di baris kanji: romaji, glosa ID, glosa EN | Ketiganya belum ada di baris itu |
| Di baris romaji: glosa ID dan EN saja | Romajinya sudah tercetak di baris itu |
| Bentuknya balon dengan ekor ke arah katanya | Ini yang membedakannya dari label yang melayang tanpa alamat |
| Muncul saat kursor di atas kata, dan saat kata difokuskan lewat keyboard | `:focus-visible`, karena hover saja tidak bisa dipakai semua orang |
| Tanda baca tanpa glosa tidak punya balon | Tidak ada yang bisa dikatakan tentang `、` |

**Kenapa tiga baris berlabel, bukan satu baris dengan garis miring.** Seorang pembaca melaporkan
 bahwa ia tidak bisa membedakan mana romaji, mana Indonesia, dan mana Inggris ketika ketiganya
 disambung satu baris dengan `/`. Penanda seperti `romaji / arti / English` menjawabnya
 langsung, dan warnanya mempercepat pembacaan. Karena itu tiap baris punya label kecil dan
 warnanya sendiri, dan `ui.js` memeriksa bahwa ketiga warnanya benar-benar berbeda. Warna yang
 sama untuk dua baris akan mengembalikan keluhan yang sama.

**Kenapa balonnya harus selalu muat di layar.** Keluhan kedua: di layar kecil sebagian balon
keluar dari pandangan. Aturannya sekarang tidak ada yang boleh terpotong, di lebar mana pun:
barisnya membungkus di layar sempit (`white-space: normal`), lebarnya dibatasi `calc(100vw -
24px)`, dan posisinya digeser oleh skrip menjauh dari tepi kiri dan tepi kanan. Digeser, bukan
dipotong, dan tanpa gulir mendatar: balon yang harus digulir adalah balon yang menyembunyikan
sesuatu.

**`.tk` wajib `position: relative`.** Tanpa itu elemen `absolute` di dalamnya diposisikan
terhadap `.jp-sent`, leluhur terdekat yang ber-`position`, dan balonnya muncul di tengah kartu,
bukan di atas katanya. Itu terjadi sekali: balonnya ada, isinya benar, warnanya benar, dan
seluruh pemeriksaan lama tetap lolos, karena yang salah hanya tempatnya.

**Diperiksa oleh `ui.js` dari sisi gambar, bukan dari sisi data.** Versi pemeriksaan yang lama
membaca atribut `title`, jadi ia lolos pada balon yang tidak terbaca: satu jalur teks tanpa
penanda. Pemeriksaan yang membaca data tidak bisa melihat itu, jadi yang sekarang membaca yang
tergambar. Kursor digerakkan lewat `Input.dispatchMouseEvent`, karena `:hover` tidak menanggapi
kejadian sintetis; visibilitas tidak diuji dengan kejadian sintetis, karena tidak akan pernah
cocok. Diukur di halaman ter-deploy pada 360, 414, 768, dan 1280 piksel: tidak ada satu pun
kotak balon yang keluar dari layar, dan pada 360 piksel ketiga baris terbukti berlabel dan
berwarna berbeda.

**Kenapa baris romaji memakai warna katanya.** Pembaca meminta supaya tidak perlu membaca label
untuk tahu baris mana yang romaji. Label sudah menjawabnya, tapi warnanya menjawab lebih cepat:
baris romaji memakai warna yang sama dengan kata yang sedang disorot, jadi pertanyaan "ini bacaan
kata yang mana" terjawab tanpa membaca apa pun. Dua glosa tetap memakai warna tetap yang sama
dengan panel (`t-id` `#f8fafc`, `t-en` `#cbd5e1`), karena keduanya bukan bacaan dari kata mana pun.
Karena itu pemeriksaannya **bukan lagi "tiga warna berbeda"**: yang diperiksa adalah baris romaji
sama dengan warna katanya, dan kedua glosa berbeda dari baris romaji serta berbeda satu sama lain.
Versi pertama pemeriksaan itu menuntut tiga warna berbeda dan langsung gagal begitu permintaan ini
dikerjakan, yaitu bentuk pemeriksaan yang mengunci cara lama.

**Kenapa lebar balon tidak boleh mengikuti lebar katanya.** Satu kesalahan ukuran menjelaskan
hampir semua cacat balon yang dilaporkan, dan sebabnya tidak kelihatan di desktop.

Balon diposisikan `absolute; left: 0` dengan lebar `auto`, dan lebar `auto` untuk elemen
terposisi adalah *shrink-to-fit* yang **dibatasi lebar containing block**. Containing block-nya
adalah `.tk`, yaitu satu kata. Di layar lebar barisnya `nowrap`, sehingga lebar yang diinginkan
menang dan balon keluar 188 px. Begitu layarnya sempit dan barisnya diizinkan membungkus, lebar
minimumnya menciut, dan balonnya terjepit ke **52 px** lebar katanya: terukur **64 px lebar dan
621 px tinggi**, sebuah kolom teks. Dari situ dua keluhan pembaca muncul sekaligus: labelnya
terbelah (`ROMAJ` lalu `I`), dan isinya terpotong-potong per huruf.

Perbaikannya satu deklarasi: `width: max-content`. Balon meminta lebar yang isinya memang
butuhkan, dan `max-width: calc(100vw - 24px)` yang menjaganya tetap di dalam layar.

**Kenapa pembungkusannya harus dinamis.** Sebelum ini, apakah balon membungkus ditentukan
**media query**, bukan kebutuhan: barisnya `nowrap` di layar lebar dan `overflow-wrap: anywhere` di
layar sempit. Artinya membungkus adalah sifat **layar**, bukan tanggapan atas isi yang panjang.
Sekarang tidak ada media query yang mengatur pembungkusan sama sekali: satu-satunya hal yang bisa
memaksa baris baru adalah `max-width`, jadi pembungkusan terjadi tepat saat isinya akan keluar
layar, di lebar apa pun, dan tidak di tempat lain.

**Kenapa pemotongan kata harus dimatikan secara eksplisit.** Kalimat Jepang yang sangat panjang
tidak boleh mendorong kartu ke samping, jadi baris kanji memasang `overflow-wrap: anywhere` sebagai
gaya inline. Balon adalah keturunannya, jadi ia **mewarisi nilai yang sama**, dan itu berarti
pemotongan di tengah kata mungkin terjadi di dalam balon. Tes dengan glosa yang ada tidak
menunjukkannya, karena tidak ada satu pun kata yang cukup panjang untuk memicunya. Karena itu balon
sekarang memasang `overflow-wrap: normal; word-break: normal` sebagai penimpa, dan aturannya
menjadi: baris hanya boleh patah di spasi, sehingga yang turun ke baris berikutnya **selalu kata
utuh**, tidak pernah huruf dari sebuah kata.

**Dua kekeliruan saya sendiri di bagian ini, dicatat supaya tidak terulang.**

Pertama, saya menjelaskan kegagalan CI sebagai **perbedaan mesin**: balon terukur 69×734 px di CI
dan tampak normal secara lokal, dan saya tulis di komentar kode bahwa "kedua mesin tidak sepakat".
Itu salah. Penyebabnya cacat lebar di atas, dan angkanya berbeda antar-jalan hanya karena **kata
yang diukur kebetulan berbeda**. CI benar, penjelasan saya yang keliru, dan komentarnya sudah
dibetulkan.

Kedua, sebelum menemukan cacat lebar itu, saya menambahkan `word-break: break-word` untuk mengatasi
label yang terpotong. Itu **menambah obat untuk penyakit yang salah**: yang salah adalah lebar
balonnya, bukan aturan pemotongannya. Pembaca yang menanyakan apakah pemotongan ekstrem itu memang
diperlukan sudah tepat: tidak, dan aturan itu sekarang tidak ada lagi di balon.

**Pengukurannya.** `ui.js` menggerakkan kursor sungguhan di 360, 414, 768, dan 1280 piksel, dan
pada setiap lebar memeriksa: balon muncul, ia berada di sisi katanya dan tidak menutupinya, tidak
ada label yang terbelah, tidak ada baris yang boleh patah di tengah kata
(`overflow-wrap` dan `word-break` harus `normal`), dan seluruh balon berada di dalam layar. Cacat
pembungkusan diuji dengan **menyuntik glosa panjang**, karena data yang ada tidak punya glosa yang
cukup panjang untuk membungkus: glosa pendek harus tetap satu baris di ponsel, dan glosa panjang
harus membungkus hanya saat ia akan keluar layar.

**Kenapa labelnya tidak boleh terbelah.** Pembaca di ponsel melihat label terpotong: `ROMAJ` di
satu baris dan `I` di baris berikutnya, dan hal yang sama pada `ENGLISH`. Penyebabnya satu
deklarasi: di layar sempit barisnya dibuat `overflow-wrap: anywhere`, dan label ikut terkena karena
label dan teks berada di dalam satu kotak. Yang benar adalah keduanya dipisah menjadi dua kotak di
dalam baris flex: label boleh menyempit tapi tidak boleh terbelah, dan hanya teks yang boleh
membungkus. Diukur dengan kursor sungguhan: tinggi label satu baris di 360, 414, 768, dan 1280
piksel.

**Kenapa balonnya juga dijaga secara vertikal.** Waktu cacat label diperiksa dengan kursor
sungguhan di layar ponsel, cacat kedua yang belum pernah terlihat muncul: pada kata di dekat atas
layar, balonnya berada **55 piksel di atas tepi layar**, sehingga yang terbaca hanya baris
terakhirnya. Penjaga posisi sebelumnya hanya membandingkan tepi kiri dan kanan, tidak pernah tepi
atas dan bawah, karena cacat yang dilaporkan dulu hanya soal tepi kanan. Sekarang kalau tidak ada
ruang di atas, balonnya dipindahkan ke **bawah** katanya dan ekornya dibalik, sehingga tetap
menunjuk kata yang sama. Digeser, tidak dipotong, dan tanpa gulir mendatar: balon yang harus
digulir adalah balon yang menyembunyikan sesuatu.

**Akibat pada teks halaman.** Balon ikut berada di DOM sebagai elemen sungguhan, dan teksnya
tidak boleh ikut terbaca sebagai kalimat. Yang menyelamatkan adalah `display: none` saat balon
tertutup: menyalin satu kalimat menghasilkan kalimatnya saja, tanpa satu kata pun dari balon,
dan sudah diuji begitu. `test.js` yang membaca teks halaman membuang elemen balon sebelum
mengambil teksnya. Cara membuangnya **menghitung keseimbangan tag**, bukan mencocokkan jumlah tag
penutup: versi pertamanya mencocokkan tepat dua tag penutup, yaitu kedalaman balon saat itu, dan
begitu satu baris mendapat satu elemen lagi polanya berhenti cocok **tanpa suara**, sehingga teks
balon kembali ikut terbaca dan dua pemeriksaan yang tidak berhubungan gagal karena kata yang tidak
pernah dilihat pembaca.

---

## 4. Ketentuan repo

Aturan kerja yang dipasang `jcode-workflow-setup` di `AGENTS.md` berlaku penuh. Yang paling
sering tersentuh saat menulis kalimat:

- Jangan commit atau push sendiri. Selesaikan pekerjaan, sajikan pilihan, tunggu keputusan.
- Pesan commit dalam bahasa Inggris, bentuk `<type>(<scope>): <description>`, tanpa trailer
  buatan.
- Merge ke `main` hanya `--ff-only`. Tidak ada force push ke `main`.
- Verifikasi tidak memakai build dan tidak menjalankan server sendiri: `node check.js`,
  `node test.js`, dan `node ui.js`.

---

## 5. Cara memakai berkas ini

`docs/topics/<topik>.md` adalah **checkpoint**: ia mencatat kalimat yang sudah ada, bukan yang
direncanakan. Tiga bagiannya yang membuat penambahan kalimat di masa depan terarah:

| Bagian | Isi | Gunanya |
|---|---|---|
| Kuota dan sisa | berapa kalimat yang seharusnya ada, dan berapa yang sudah ditulis | tahu kapan topiknya penuh |
| Kerangka yang sudah diklaim | satu baris per kalimat, kerangkanya dihitung dengan cara yang sama seperti `check.js` | tahu kalimat mana yang akan bertabrakan sebelum menulisnya |
| Celah yang masih terbuka | keadaan yang belum ada, dengan bukti kata kunci yang dicari di berkas | tahu apa yang harus ditulis berikutnya |

Bagian ketiga yang paling mudah rusak: menulis "belum ada X" dari ingatan menghasilkan daftar
yang salah dalam dua arah sekaligus, karena keadaan yang sudah ada ikut tertulis sebagai celah.
Karena itu celah diisi dengan mencari kata kuncinya di `data/t_<topik>.js`, dan barisnya menyebut
apa yang dicari. Tabel kerangka dihasilkan dari data, tidak ditulis tangan: setelah kalimatnya
berubah, tabelnya ikut berubah, dan `check.js` bagian `distinct` yang menangkap kalau lupa.

Sebelum menulis kalimat untuk sebuah topik:

1. Buka `docs/topics/<topik>.md`, lihat kuota, slot yang belum terisi, batas topiknya, dan
   kerangka yang sudah diklaim topik lain.
2. Tulis kalimatnya di `data/t_<topik>.js`.
3. Jalankan `node check.js`, lalu `node test.js`, lalu `node ui.js`.
4. Perbarui berkas topik itu: pindahkan baris dari "belum ditulis" ke "sudah ditulis", dan
   tambahkan kerangka baru ke daftar klaim.

**Satu baris yang paling sering salah: slot `menjawab`.** Baris itu pernah ditulis berisi nama
keadaan ("menjawab pertanyaan dokter tentang gejala") padahal kalimatnya belum ada, sehingga
berkasnya terbaca lengkap sementara decknya kosong di bagian itu. `check.js` bagian `reply`
sekarang menutup celah itu dengan angka, dan jumlah balasan tiap topik dicetak di akhir
keluarannya. Setelah menulis slot itu, salin angkanya dari keluaran itu, jangan dihitung
sendiri: cara menghitung sendiri itulah yang membuat berkas topik dan data berbeda.

**Baris `Panjang n, pendek n` dan `Lawan bicara yang sudah dipakai` juga diambil dari data**,
bukan dari ingatan: keduanya pernah tertinggal beberapa kalimat di belakang setelah topiknya
ditambah.

Kalau ada ketentuan di sini yang menghalangi penulisan kalimat yang jelas benar, yang salah
adalah ketentuannya, bukan kalimatnya. Perbaiki berkas ini dan sebutkan di ringkasan
perubahan, jangan diam-diam dilewati.
