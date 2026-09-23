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
