# LangDocs

Narasi Jepang sehari-hari, dengan romaji dan arti per kata. Halaman:
https://erelst.github.io/LangDocs/

Tidak ada build step dan tidak ada program penghasil kalimat. Narasinya ditulis, dan berkasnya
dibaca langsung oleh browser.

**Deck ini berisi narasi, bukan kalimat lepas.** Satu narasi adalah satu percakapan, cerita,
kronologi, curhatan, penjelasan, atau laporan, masing-masing dengan judul, dan masing-masing lebih
panjang dari satu kalimat. Topiknya (belanja, kerja, transportasi, dan seterusnya) menentukan
berkasnya, dan **jenisnya wajib berganti** supaya satu topik tidak menjadi tulisan yang sama
berulang-ulang.

## Bagaimana halaman dipakai

Tiga halaman, berurutan, dan pilihannya tersimpan di alamat:

1. `#/lang` — pilih bahasa terjemahan: Bahasa Indonesia atau English. Seluruh halaman lalu memakai
   bahasa itu, dan hanya bahasa itu (tidak lagi disatukan).
2. `#/target/<lang>` — pilih bahasa sasaran, yaitu bahasa kalimatnya. Sekarang hanya Jepang.
3. `#/read/<lang>/jp` — kotak pencarian dan **daftar judul**, bukan daftar kalimat. Klik satu
   judul untuk membacanya; pencarian mencari kata di dalam narasi dan menawarkan tombol
   `Baca judul "..." penuh`.

Satu narasi punya alamatnya sendiri: `#/read/id/jp/<key>`.

## Isi repo

| Berkas | Isi |
|---|---|
| `index.html` | Cangkang halaman: tiga layar, kotak pencarian, dan gaya tampilannya. Tidak ada kalimat di dalamnya. |
| `app.js` | Seluruh program: router tiga halaman, daftar judul, pembaca narasi, pencarian, dan chip gaya bahasa. |
| `const.js` | Warna, tabel lawan bicara, daftar jenis, penanda gaya bahasa, dan seluruh teks antarmuka dua bahasa. |
| `data/bank.js` | Cetakan bentuk narasi. Kosong; isinya menjelaskan bentuknya. |
| `data/curated.js` | Satu narasi pertama: `kurasi06`, patokan mutu deck ini. |
| `data/lexicon.js` | Daftar kata: satu baris per kata, dengan romaji dan dua glosanya. |
| `data/t_*.js` | Narasi per topik. Cakupan topik ada di komentar kepalanya. |
| `lexadd.js` | Menambah kata baru ke `data/lexicon.js`. |
| `docs/JUDUL.md` | **Checkpoint judul.** Satu baris per narasi: judul, jenis, ringkasan isi, frasa kunci. |
| `docs/SPEC.md` | Ketentuan yang mengikat setiap narasi. |
| `docs/README.md` | Topik apa saja, bagian terukurnya, dan daftar kata yang perlu tercakup. |

**Tidak ada berkas pengujian, dan itu disengaja.** `check.js`, `test.js`, `ui.js`, `coverage.js`,
dan `syncdocs.js` sudah dihapus: pembentukan kalimat sepenuhnya diserahkan pada penulisnya.
Penggantinya: `docs/JUDUL.md` untuk mencegah pengulangan, pembacaan penulis untuk bahasanya, dan
`ci.yml` untuk memeriksa berkas JavaScript bisa di-parse. Kelemahannya nyata dan disebut di
`docs/SPEC.md`: kesalahan bahasa tidak lagi tertangkap mesin.

## Cara menulis satu narasi

Urutannya tidak boleh dibalik, karena langkah pertama yang menentukan semuanya.

1. **Putuskan dulu judul dan isinya.**
2. Baca `docs/JUDUL.md`, lalu cek **judul dan isi** secara semantik: kalau ada yang sama atau
   mirip, buat yang berbeda dulu. Judul yang berbeda kata tidak membebaskan dari pemeriksaan ini.
3. Lihat jenis apa yang sudah terpakai di topik itu di `docs/JUDUL.md`: jenis itu tidak boleh
   dipakai lagi di topik yang sama sampai seluruh jenis lain terpakai.
4. Buka `data/t_<topik>.js` untuk cakupan topiknya, dan `docs/SPEC.md` untuk aturan bahasanya.
5. Tulis narasinya mengikuti bentuk di `data/bank.js`:

```js
{
  key: 'transportasi_kronologi_kereta_terakhir', topic: 'transportasi',
  jenis: 'kronologi',
  judul: 'Kereta terakhir yang saya kejar', judulEn: 'The last train I ran for',
  rel: 'rekan',
  sit: '...', sitEn: '...',
  id: '...', en: '...', note: '...', noteEn: '...',
  blocks: [
    { t: ['...', '...'] },
    { t: ['...'] }
  ]
}
```

* `blocks` adalah narasinya, satu entri per baris. Untuk `percakapan`, tiap blok punya `sp`
  (pembicara) dan narasinya punya `speakers`.
* `t` berisi kata saja. Romaji dan glosanya diambil dari `data/lexicon.js`, jadi satu kata ditulis
  sekali dan tidak mungkin berbeda ejaan di dua narasi. Tanda baca menempel pada kata sebelumnya
  (`ください。`).
* Terjemahan (`id`/`en`) dan situasi (`sit`/`sitEn`) ditulis dua bahasa, tetapi halaman hanya
  menampilkan bahasa yang dipilih di halaman pertama.
* **Tidak ada `polite` dan tidak ada `long`.** Gaya bahasa dibaca dari teks narasinya sendiri oleh
  halaman, sehingga tidak bisa terlepas dari apa yang benar-benar ditulis.

6. Tambahkan barisnya ke `docs/JUDUL.md`.
7. Jalankan `node --check data/t_<topik>.js`, lalu buka halamannya dan pastikan konsol tidak
   memperingatkan kata yang belum ada di lexicon.

Topik baru: buat `data/t_nama.js`, tambahkan `<script src="...">` di `index.html`, dan tulis
cakupan topiknya di komentar kepala berkasnya.

## Tampilan

Mode gelap saja, tiga halaman: pilih bahasa antarmuka, pilih bahasa sasaran, lalu daftar judul.

Judul dan setiap paragraf ditulis dalam **bahasa sasaran**. Mengarahkan kursor ke satu kata
memunculkan balon yang menunjuk ke kata itu, berisi romaji dan artinya dalam bahasa yang dipilih.
Yang menerangkan teks juga berbahasa sasaran dan bisa di-hover: **jenis** (`会話`, `時系列`),
**gaya bahasa** (`丁寧`, `普通`, `混在`, dihitung dari teksnya, bukan ditulis sebagai label),
**lawan bicara** (`友達`, `上司`), dan **penutur** di dalam percakapan. Warnanya tetap dari tabel di
`const.js`, jadi makna warnanya tidak berubah.

Di atas ada **bar bacaan** yang tetap terlihat saat sebuah judul dibuka: kotak pencarian, pilihan
ruang lingkup, dan dua sakelar yang keduanya **mati secara bawaan**:

* **Romaji** menampilkan baris romaji di bawah baris kanji, di **semua** teks Jepang: paragraf,
  judul, dan chip label (jenis, gaya bahasa, lawan bicara). Sakelarnya menutup kelas `.romaji`,
  bukan satu bagian halaman, jadi tidak ada tempat yang perlu didaftarkan satu per satu.
* **Terjemahan** menampilkan terjemahan **di bawah setiap paragraf**, satu baris per kalimat
  Jepang, ditambah arti judul dan ringkasan narasi. Terjemahan per paragraf itu disimpan di
  `id` **dan** `en` pada tiap blok, bukan diambil dari ringkasan narasi. Keduanya wajib, karena
  halaman hanya menampilkan bahasa yang dipilih pembaca.
  Chip label juga mendapat baris artinya dari sakelar yang sama.

Tidak ada tombol `?` dan tidak ada panel: balon per kata sudah membawa bacaan dan artinya. Daftar
judul dimuat bertahap saat digulir.
