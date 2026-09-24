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

### K2. Kalimat panjang adalah mayoritas

Kalimat panjang adalah kalimat yang menyatakan sesuatu: pernyataan, penjelasan, atau pembuka
yang membuat lawan bicara ingin melanjutkan. Kalimat pendek hanya dipakai bila versi
panjangnya justru terdengar aneh.

**Alasan.** Percakapan sehari-hari yang berguna bukan daftar sapaan. Yang sulit dan yang
paling sering dibutuhkan adalah kalimat yang membawa isi.

**Diperiksa oleh.** `check.js` bagian `balance`: minimal 50% kalimat tulis harus panjang.
Ambangnya sengaja rendah, karena angkanya bukan target, hanya pagar supaya kemunduran ke
buku frasa terlihat di keluaran, bukan baru terasa oleh pembaca.

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

### K4. Kalimat pendek hanya untuk yang benar-benar lazim

Kalimat pendek dipakai bila memang itu yang diucapkan orang dan versi panjangnya tidak lebih
baik. Bukan karena kalimatnya sulit ditulis panjang.

**Alasan.** 「これ、お願いします。」 adalah cara orang membeli barang. Tidak ada versi panjang
yang lebih baik. Sebaliknya 「おはようございます。」 yang dipanjangkan dengan alasan apa pun
hanya terdengar seperti latihan.

**Diperiksa oleh.** Tidak diperiksa otomatis. Diputuskan saat menulis, dan dicatat di berkas
topik pada kolom slot `pendek`.

**Gejala pelanggaran.** Kalimat pendek muncul sebagai jalan keluar saat kalimat panjangnya
tidak jadi, lalu diberi alasan sesudahnya.

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

Kuota adalah lantai, bukan langit-langit. Kalau sebuah topik masih bisa dibuatkan kalimat yang
nyata dan berbeda, kalimat itu ditambahkan walau kuotanya sudah lewat. Topik dianggap mentok
kalau daftar "belum ditulis" di berkas topiknya kosong dan satu putaran baru tidak menemukan
slot ucapan yang belum terisi.

**Alasan.** Kuota menjaga keseimbangan antar topik, saturasi menjaga agar tiap topik benar
benar bisa dipakai. Dua hal berbeda, dan keduanya dibutuhkan.

**Diperiksa oleh.** Dua hal, dan yang pertama saja tidak cukup. Kolom sisa menjawab "apakah
kuotanya sudah penuh". Daftar celah di bawah tabel kerangka menjawab "apakah masih ada yang
belum ditulis". **Sisa nol bukan bukti mentok**: `kerja` dan `makan` keduanya bersisa nol dan
keduanya masih punya celah terbuka, sedangkan `belanja` bersisa nol dan belum pernah diperiksa
sama sekali. Topik disebut mentok hanya kalau daftar celahnya kosong dan pencarian ulang tidak
menemukan slot yang belum terisi.

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
| V12 | Arahkan kursor atau fokus ke satu kata: muncul balon yang menunjuk ke kata itu, isinya romaji dan glosa Indonesia + Inggris, dan **tidak** mengulang kata Jepangnya maupun baris yang sedang dibaca | `ui.js` |

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

Dikerjakan tanpa skrip: `title` tetap sumber satu-satunya, dan CSS menggambarnya lewat
`::after { content: attr(title) }`. Tidak ada elemen yang dibuat, tidak ada posisi yang dihitung,
dan balonnya tidak bisa melenceng dari katanya karena ia milik kata itu. Diperiksa `ui.js` dengan
menggerakkan kursor sungguhan lewat `Input.dispatchMouseEvent`, karena `:hover` tidak menanggapi
kejadian sintetis: balon harus benar-benar terlihat (bukan `opacity: 0`), punya kotak yang
tergambar (bukan `auto x auto`), dan katanya harus benar-benar berada di bawah kursor.

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

Kalau ada ketentuan di sini yang menghalangi penulisan kalimat yang jelas benar, yang salah
adalah ketentuannya, bukan kalimatnya. Perbaiki berkas ini dan sebutkan di ringkasan
perubahan, jangan diam-diam dilewati.
