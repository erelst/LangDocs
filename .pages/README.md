Mengapa ada index.html?

GitHub menyaring atribut `style` di Markdown, dan notebook viewer GitHub selalu
menampilkan sel kode, sehingga kartu gelap tidak tampil utuh di dua tempat itu.
GitHub Pages menyajikan file HTML apa adanya, jadi hasil visual (termasuk hover)
tampil penuh di sana.

File index.html dihasilkan otomatis oleh scripts/build_page.py dari renderer yang
sama dengan JP-sentences.ipynb, jadi keduanya selalu sinkron.

Jalankan ulang:

    python3 scripts/build_page.py
