Mengapa ada index.html?

GitHub menyaring atribut `style` di Markdown, sehingga kartu gelap tidak bisa
tampil utuh di README atau di file Markdown apa pun. GitHub Pages menyajikan file
HTML apa adanya, jadi hasil visual (termasuk hover, expand/collapse, dan
pencarian) tampil penuh di sana.

index.html dihasilkan otomatis oleh scripts/build_page.py, yang mengambil kartu
dari scripts/render.py. Jadi warna, garis bawah, dan pembungkusan baris hanya
punya satu sumber kebenaran.

Jalankan ulang:

    python3 scripts/build_page.py

Sebelum commit, periksa hasil render sungguhan (bukan hanya kode):

    python3 scripts/verify_page.py

Verifikasi itu membuka halaman di Chromium headless dan menguji 7 ukuran layar:
tombol `?` bisa diklik, panel terbuka **di dalam kotak bloknya sendiri** (jadi
tidak mungkin menutupi batas blok, blok berikutnya, atau bar pencarian), blok
berikutnya terdorong ke bawah bukan tertimpa, tidak ada geser horizontal,
kontras panel cukup, hanya satu panel terbuka, klik di luar / Escape menutup,
pencarian cocok untuk kanji, romaji, Indonesia, maupun Inggris, daftar memuat lebih
banyak kalimat saat digulir, filter All/Japanese menyaring sesuai cakupannya, toggle
romaji menyembunyikan baris romaji di **semua** kartu, deep link `#q140` membuka
kalimat yang benar meski kartunya belum dibuat, dan renderer JS menghasilkan HTML
yang identik dengan renderer Python.

Catatan desain: panel `?` adalah **expand/collapse** (isi blok, bukan lapisan
mengambang). Karena ikut alur dokumen, blok tumbuh menampung panelnya, sehingga
tidak perlu scrim, z-index, atau perhitungan posisi sama sekali.

Dari mana kalimatnya datang
---------------------------

Ada dua bagian, dan urutannya penting.

**10 kalimat kurasi** ditulis tangan di `scripts/sentences.py`. Ini yang paling
diprioritaskan: situasinya dipilih langsung dari yang terukur di CEJC (menyapa
tetangga, bertanya ke orang asing, memesan di toko), dan terjemahannya yang paling
teliti dibaca. Kalau ada kalimat hasil generate yang kebetulan sama kanjinya,
versi kurasi yang menang dan versi generate dibuang.

**1.482 kalimat hasil generate** dibuat oleh `scripts/generate.py` dari 31
template. Analisis di `Japanese-Everyday-Sentence-Probability.md` memperkirakan
ruang kalimat sehari-hari yang layak sekitar **10⁷** untuk penutur dengan 5.000
kata aktif, dari eksponen terukur 4,19 kata per kalimat. Daftar tulis tangan tidak
bisa mendekati angka itu, dan justru daftar tulis tangan yang panjang adalah
tempat kalimat tidak gramatikal menyelip tanpa ketahuan. Karena itu kalimatnya
disusun dari template:

* template menetapkan kerangka partikel dan kata kerjanya,
* setiap posisi kosong menyatakan kategori kata yang boleh mengisinya,
* hanya kata dari kategori itu yang boleh masuk.

Maka `食べました` tidak mungkin menerima tempat, dan `で` tidak mungkin menerima
objek.

### Yang tidak bisa dijamin template

Bentuk kalimat bisa dijamin; **maknanya belum tentu masuk akal**. Versi pertama
bank ini menghasilkan hal-hal seperti:

    大学でお金を買いました       "saya membeli uang di universitas"
    席でうどんを食べます         "saya makan udon di tempat duduk"
    昨日チョコレートを食べます   "kemarin saya makan cokelat" (kata kerjanya non-lampau)

Semuanya well-formed, semuanya salah. Karena itu `scripts/check_sentences.py`
memeriksa makna, dan **build akan berhenti** kalau ada temuan:

| Pemeriksaan | Contoh yang ditangkap |
|---|---|
| struktur | template tanpa terjemahan, slot yang tidak terisi |
| kala | `昨日` bersanding dengan `食べます` |
| partikel | orang tanpa `に`, frame makan tanpa `を` |
| seleksi | `お金を買いました`, `水を食べます` |
| bahasa Inggris | `a umbrella`, `the vegetables is`, `every days` |
| makna (daftar pantau) | frame yang hasilnya sering aneh, dicetak untuk ditinjau |

Pemeriksa itu sudah diuji balik: kalau kalimat yang diketahui salah disuntikkan,
ia memang gagal, dan pada data bersih ia lolos.

### Berapa banyak yang dikirim, dan kenapa tidak semua sekaligus

Seluruh bank sekarang dikirim: **1.583 kalimat**. Tapi tidak semuanya jadi kartu di
DOM sekaligus.

Kalau semua kartu ditulis ke HTML, halaman ini jadi 10 MB dan ~75.000 node, dan
browser harus menata semuanya sebelum apa pun muncul. Yang membuat itu mahal:
tema gelap, warna per kata, dan garis bawah ditulis **inline** di tiap kartu, jadi
satu kartu ≈ 50 node.

Jadi sekarang:

* **30 kartu pertama** ditulis ke HTML, supaya halaman tetap punya isi nyata sebelum
  skrip jalan (dan tetap terbaca kalau JS mati)
* **seluruh 1.583 kalimat** dikirim sebagai data ringkas di dalam halaman
* kartu berikutnya dibuat JS saat scroll mendekati bawah

Hasilnya, pada 1.583 kalimat:

| | semua di HTML | 30 statis + data |
|---|---|---|
| ukuran file | 10,1 MB | **1,38 MB** |
| node saat dibuka | ~75.000 | **2.049** |
| waktu render | 4,9 s | **2,7 s** |

Yang dibuang bukan kalimatnya, hanya biaya menatanya. Menaikkan jumlah kartu statis
lewat `LANGSENT_FIRST=200 python3 scripts/build_page.py`.

### Ini bukan virtualisasi

Perbedaan yang penting: cara ini **menambah** kartu dan tidak pernah melepasnya.
Virtualisasi (yang dipakai daftar panjang di Leptos/React) melepas node di luar
layar lalu mendaur ulangnya, dan supaya scrollbar tidak melompat, ia harus
menghitung tinggi palsu untuk kartu yang dilepas. Untuk halaman baca seperti ini
itu kerumitan yang tidak dibutuhkan: tinggi halaman di sini selalu bertambah dan
tidak pernah berubah, jadi tidak ada yang bisa melompat.

### Renderer JS harus sama dengan renderer Python

Kartu pertama dibuat Python, sisanya dibuat JS. Kalau keduanya berbeda sedikit saja,
kartu akan berubah tampilan begitu di-scroll. Karena itu:

* palet, warna, dan gaya garis bawah **disuntikkan dari `scripts/render.py`** ke
  halaman; `page.js` tidak boleh memuat satu pun nilai warna literal, dan build
  menolaknya kalau ada
* verifikasi browser membandingkan HTML kartu buatan JS dengan buatan Python untuk
  120 kartu pertama, dan gagal pada selisih pertama

### Satu panel terbuka: kenapa pakai delegated listener

Kartu dibuat setelah halaman dimuat, jadi listener per elemen harus dipasang ulang
tiap kali menambah kartu. Yang dipakai: satu listener di wadah daftar, dengan fase
*capture*, karena event `toggle` tidak bubbled. Ini sempat luput saat kartu mulai
dibuat dinamis, dan verifikasi menangkapnya (`open=2`).

### Pemuatan saat scroll: tiga pemicu

Tidak ada satu pemicu yang cukup:

* `IntersectionObserver` untuk kasus umum, termasuk saat viewport lebih tinggi dari
  daftar sehingga tidak akan pernah ada scroll
* listener `scroll` untuk respons langsung saat digulir
* timer 200 ms, karena sebagian lingkungan (headless dengan jam virtual, dan
  browser yang menunda pengiriman event scroll) tidak mengirim dua yang di atas.
  Timer berhenti sendiri setelah seluruh bank masuk DOM

Bug pertama di sini: append hanya sekali per pemicu, jadi loading **berhenti** begitu
batch yang ditambahkan lebih pendek daripada ambang. Sentinel tetap terlihat, tidak
ada event baru, dan daftar berhenti tumbuh di tengah. Sekarang loop sampai sentinel
terdorong melewati ambang.

### Kalimat panjang

Bank punya 43 template: 31 pendek (3-7 token) dan 12 panjang (8-18 token), dan
daftarnya **52% kalimat panjang**. Kalimat panjangnya dibangun dari pola baku, bukan
dikarang: bentuk sambung + に行く (tujuan), -te + います (sedang), bentuk sambung +
ながら (sambil), bentuk lampau + ら (kalau), bentuk kamus + とき (saat), -te + から
(setelah), bentuk biasa + から (sebab), bentuk biasa + けど (pertentangan).

Dua template panjang punya perkalian kata yang sangat besar (waktu × tempat × orang
× makanan × minuman = 90.750 kalimat masing-masing). Tanpa batas, banknya jadi
188.000 kalimat. Jadi tiap template mengambil sampel berjarak seragam dengan jumlah
tertentu, dan jumlah untuk template panjang dihitung dari target 50/50 — bukan
diketik dua kali, jadi perbandingannya tetap tepat saat template ditambah.

Warna dan register
------------------

Blok kalimat memakai kartu `#0b1220` (seperti desain awal), kolom pencarian dan
panel `?` yang terbuka memakai `#070c14` yang **lebih gelap** dari kartunya, jadi
kedua permukaan gelap di halaman ini sama persis (bukan tiga nuansa berbeda).

Kendali di halaman
------------------

* **Search: Kanji / Romaji / Indonesia / English** — hanya kata "Cari" yang diganti
  jadi "Search", sisanya tetap.
* **All / Japanese** — All (default) mencari seperti sebelumnya, di keempat bahasa.
  Japanese membatasi pencocokan ke kalimatnya saja: kanji, romaji, dan kata per kata.
  Terjemahan Indonesia/Inggris tidak ikut dicari, jadi `stasiun` menghasilkan 30
  kalimat di mode All dan 0 di mode Japanese, sementara `おはよう` tetap cocok di
  keduanya.
* **Romaji** — menyalakan/mematikan baris romaji. Baris kanji tidak ikut disembunyikan,
  dan garis bawah tidak diubah.
* **Judul dan hitungan** kini dua bahasa: "Kalimat Jepang Sehari-hari / Everyday
  Japanese Sentences" dan "1583 kalimat / sentences".

Karena isian gelap tidak bisa jauh dari kartu yang juga gelap (hanya 1.05:1),
pemisah yang sebenarnya terlihat adalah **garis tepi panel** `#4a5a72` (2.67:1
terhadap kartu), ditambah garis aksen biru di tepi atas. Jadi warna panel
dipertahankan gelap, dan panelnya tetap kelihatan batasnya.

Kalau salah satu terlalu terang atau terlalu gelap di layarmu, ubah di
`scripts/render.py`: `BG` (kartu), `BG_PANEL` (isian panel), `BG_PANEL_EDGE`
(garis tepi panel). Build akan menolak kalau tidak ada satu pun dari isian atau
garis tepi yang cukup memisahkan panel dari kartu, atau kalau teksnya di bawah
7:1.

Register (kepada siapa kalimat dipakai) dibedakan **di dalam panel saja**. Di luar,
semua blok tampil seragam: tombol `?` dan garis kiri kartu warnanya sama untuk
semua kalimat. Begitu sebuah blok dibuka, panelnya menampilkan:

  * chip lawan bicara (tetangga, orang asing, petugas toko, teman dekat, rekan
    kerja, pegawai kafe, pengemudi taksi, ...), berwarna hijau `#86efac` (dekat)
    atau kuning `#fcd34d` (asing / petugas)
  * chip `sopan` / `biasa`
  * dua baris keterangan situasi, `ID` lalu `EN`, sama seperti terjemahan dan arti
    per kata, supaya tidak ada baris yang hanya berbahasa Inggris

Jadi bloknya tetap hanya kanji + romaji + `?`, dan pembedaan register muncul saat
panel dibuka. Kalau ada blok yang warnanya beda di daftar, itu bug: verifikasi
memang mengecek semua tombol `?` dan semua garis kartu harus satu warna.

Dasar pembedaan register juga dari korpus: penanda paling tajam antara dekat dan
asing adalah **です/ます** (~3x: rumah 6,74 vs kantor 20,66 per 1.000 kata), bukan
partikel tanya. Jadi template sopan disusun dari kerangka です/ます dan template
biasa dari bentuk kamus, dan `check_register` memastikan pemisahan itu tetap
terjaga saat kata atau template ditambah.

10 kalimat kurasi:

| # | register | lawan bicara | isi |
|---|---|---|---|
| 1 | dekat / sopan | tetangga | sapaan pagi |
| 2 | asing / sopan | orang asing | minta tunggu |
| 3 | asing / sopan | petugas toko | tanya harga |
| 4 | dekat / biasa | teman dekat | ajakan santai |
| 5 | dekat / biasa | orang akrab | menyetujui |
| 6 | dekat / sopan | teman | cerita panjang (uji word wrap) |
| 7 | dekat / sopan | tetangga | basa-basi cuaca |
| 8 | asing / sopan | orang asing | tanya arah (どちら) |
| 9 | asing / sopan | orang asing | menawarkan bantuan |
| 10 | dekat / biasa | teman dekat | tanya kabar tanpa か |

Sisanya hasil generate, 219 dekat dan 281 asing pada 500 kartu yang dikirim.

Urutan daftarnya diacak berputar antar template, bukan dikelompokkan per template.
Kalau tidak, beberapa ratus kartu pertama akan berisi satu pola yang sama berulang
dan hampir semuanya sopan, karena template sopan kebetulan punya kombinasi kata
paling banyak.
