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
pencarian cocok untuk kanji, romaji, Indonesia, maupun Inggris, dan mengetik tidak
menulis ulang seluruh daftar.

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

### Berapa banyak yang dikirim ke halaman

Dibatasi `LIMIT` di `scripts/build_page.py`, sekarang **500 dari 1.492**. Bank
penuhnya 10,1 MB dan halaman ini satu file HTML tanpa build step, jadi ongkosnya
ditanggung pembaca. Diukur di Chromium headless:

| Kartu | Ukuran | Waktu render |
|---|---|---|
| 300 | 1,9 MB | 1,1 s |
| 500 | 3,3 MB | 1,7 s |
| 1.482 | 10,1 MB | 4,9 s |

500 adalah titik di mana halaman masih terasa langsung, sementara daftarnya sudah
mencakup semua 31 template dengan setidaknya 16 kombinasi kata, di kedua register.
Kirim seluruh bank dengan `LANGSENT_LIMIT=1482 python3 scripts/build_page.py`;
build selalu mencetak ongkos terukurnya, jadi trade-off-nya tetap kelihatan.

Satu regresi performa sudah pernah terjadi di sini: highlight dulu menulis ulang
`innerHTML` setiap kartu pada setiap ketikan. Pada 10 kalimat itu tidak terasa;
pada 1.482 kalimat satu ketikan jadi **345 ms** (terburuk 778 ms). Sekarang hanya
kartu yang benar-benar ditandai yang dipulihkan, jadi **11 ms**. Verifikasi
menghitung jumlah penulisan `innerHTML` supaya regresi ini tidak bisa kembali
tanpa ketahuan (waktu jam tidak bisa dipakai di headless: jamnya tidak berjalan
saat kerja sinkron, dan melaporkan 0,0 ms untuk versi lambat maupun cepat).

Warna dan register
------------------

Blok kalimat memakai kartu `#0b1220` (seperti desain awal), kolom pencarian dan
panel `?` yang terbuka memakai `#070c14` yang **lebih gelap** dari kartunya, jadi
kedua permukaan gelap di halaman ini sama persis (bukan tiga nuansa berbeda).

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
