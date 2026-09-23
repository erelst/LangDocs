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

Panel `?` sengaja **lebih gelap** dari kartunya (kartu `#223047`, panel `#070c14`;
kontras 1.48:1), jadi panel terbaca sebagai cekungan, bukan lapisan yang menonjol.
Kalau salah satu terlalu terang atau terlalu gelap di layarmu, ubah di
`scripts/render.py`: `BG` untuk kartu, `BG_PANEL` untuk panel. Build akan menolak
kalau jaraknya kurang dari 1.30:1 atau teksnya di bawah 7:1, jadi tidak bisa
diam-diam jadi tidak terbaca.

Register (kepada siapa kalimat dipakai) dibedakan lewat warna, bukan label:

  * hijau  `#86efac` = dekat / akrab
  * kuning `#fcd34d` = orang asing / petugas

Warna itu muncul di tombol `?` dan garis kiri kartu, lalu di dalam panel ada chip
`tetangga` / `orang asing` plus chip `sopan` / `biasa`. Kartunya sendiri tetap
hanya kanji + romaji + `?`, sesuai permintaan sebelumnya.

Kalimat yang saat ini terdaftar: 1 tetangga, 2 orang asing, 3 petugas toko, 4
teman dekat, 5 orang yang sudah akrab, 6 teman. Semuanya akrab kecuali nomor 2
dan 3, jadi saya tambahkan dulu supaya perbedaannya kelihatan.
