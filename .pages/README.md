Mengapa ada index.html?

GitHub menyaring atribut `style` di Markdown, sehingga kartu gelap tidak bisa
tampil utuh di README atau di file Markdown apa pun. GitHub Pages menyajikan file
HTML apa adanya, jadi hasil visual (termasuk hover, tooltip, dan pencarian)
tampil penuh di sana.

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
dan pencarian cocok untuk kanji, romaji, Indonesia, maupun Inggris.

Catatan desain: panel `?` adalah **expand/collapse** (isi blok, bukan lapisan
mengambang). Karena ikut alur dokumen, blok tumbuh menampung panelnya, sehingga
tidak perlu scrim, z-index, atau perhitungan posisi sama sekali.

Warna dan register
------------------

Blok kalimat memakai kartu `#0b1220` (seperti desain awal), dan panel `?` yang
terbuka memakai `#070c14` yang **lebih gelap** dari kartunya.

Karena isian gelap tidak bisa jauh dari kartu yang juga gelap (hanya 1.05:1),
pemisah yang sebenarnya terlihat adalah **garis tepi panel** `#526179` (2.98:1
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

  * chip `tetangga` / `orang asing` / `petugas toko` / `teman dekat` / `teman`,
    berwarna hijau `#86efac` (dekat) atau kuning `#fcd34d` (asing / petugas)
  * chip `sopan` / `biasa`
  * dua baris keterangan situasi, `ID` lalu `EN`, sama seperti terjemahan dan arti
    per kata, supaya tidak ada baris yang hanya berbahasa Inggris

Jadi bloknya tetap hanya kanji + romaji + `?`, dan pembedaan register muncul saat
panel dibuka. Kalau ada blok yang warnanya beda di daftar, itu bug: verifikasi
memang mengecek semua tombol `?` dan semua garis kartu harus satu warna.

Kalimat yang saat ini terdaftar: 1 tetangga, 2 orang asing, 3 petugas toko, 4
teman dekat, 5 orang yang sudah akrab, 6 teman. Semuanya akrab kecuali nomor 2
dan 3, jadi saya tambahkan dulu supaya perbedaannya kelihatan.
