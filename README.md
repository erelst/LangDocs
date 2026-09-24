# LangDocs

Kalimat Jepang sehari-hari, dengan romaji, terjemahan Indonesia dan Inggris, dan arti per
kata. Halaman: https://erelst.github.io/LangDocs/

Tidak ada build step dan tidak ada program penghasil kalimat. Kalimatnya ditulis, dan
berkasnya dibaca langsung oleh browser.

## Isi repo

| Berkas | Isi |
|---|---|
| `index.html` | Cangkang halaman: judul, kotak pencarian, kontrol. Tidak ada kalimat di dalamnya. |
| `app.js` | Seluruh program: merender kartu, menyaring, memuat saat digulir. |
| `const.js` | Warna, gaya garis bawah, dan tabel hubungan (tetangga, atasan, petugas toko). |
| `data/curated.js` | 10 kalimat pertama, termasuk contoh restoran yang jadi patokan mutu. |
| `data/lexicon.js` | Daftar kata: satu baris per kata, dengan romaji dan dua glosanya. |
| `data/t_*.js` | Bank kalimat, satu berkas per topik. |
| `check.js` | Pemeriksa bank kalimat. Jalankan: `node check.js` |
| `test.js` | Merender halaman di browser dan memeriksa DOM-nya. Jalankan: `node test.js` |
| `ui.js` | Menjalankan halamannya: mencari setelah menggulir, dan default romaji. Jalankan: `node ui.js` |
| `docs/SPEC.md` | Ketentuan yang mengikat setiap kalimat, beserta cara memeriksanya. |
| `docs/README.md` | Rencana topik: topik apa saja, berapa kalimat tiap topik, dan dari mana angkanya. |
| `docs/topics/<topik>.md` | Berkas per topik: kuota, slot ucapan yang sudah dan belum terisi, kerangka yang diklaim. |

## Cara menambah kalimat

Tulis di berkas topik, lalu jalankan `node check.js`.

```js
{
  key: 'belanja_tanya_ukuran',
  topic: 'belanja',
  rel: 'petugas_toko', polite: 1, long: 1,
  sit: '...', sitEn: '...',
  id: '...', en: '...',
  note: '...', noteEn: '...',
  t: ['これ', 'は', '少し', '小さい', 'の', 'です', 'が', '、', 'あります', 'か', '。']
}
```

* `t` berisi kata saja. Romaji dan glosanya diambil dari `data/lexicon.js`, jadi satu kata
  ditulis sekali dan tidak mungkin berbeda ejaan di dua kalimat. Tanda baca menempel pada
  kata sebelumnya (`ください。`), sehingga tidak bisa terpisah saat baris berganti.
* `rel` menentukan siapa lawan bicaranya dan warna chip (hijau = akrab, kuning = asing).
* `polite`: 1 untuk です/ます, 0 untuk bentuk biasa.
* `long`: 1 untuk kalimat panjang.

Topik baru: buat `data/t_nama.js` dengan `window.BANK = (window.BANK || []).concat([...])`,
lalu tambahkan `<script src="...">` di `index.html`.

## Rencana topik

Topik dan jumlah kalimatnya tidak dibagi rata. `docs/README.md` menghitungnya dari survei
percakapan CEJC dan daftar frekuensi kata, topiknya adalah pasangan tempat × kegiatan, dan
syarat yang mengikat tiap kalimat ada di `docs/SPEC.md`.

Sebelum menulis kalimat baru, buka `docs/topics/<topik>.md`: di sana tertulis berapa sisa
kalimatnya, slot ucapan apa yang belum terisi, dan kerangka apa yang sudah dipakai supaya
topik baru tidak mengulang kalimat topik lain.

## Bentuk kalimatnya

Kalimat panjang lebih diutamakan: berisi pernyataan, penjelasan, atau pembuka yang membuat
lawan bicara tertarik melanjutkan. Kalimat panjang harus punya alasan yang mengikat
klausanya (ので, から, けど, たら, とき), bukan sekadar disambung それから.

Kalimat pendek hanya untuk yang benar-benar dipakai sehari-hari dan versi panjangnya justru
terdengar aneh. 「これ、お願いします。」 adalah cara membeli barang; tidak ada versi Panjang yang
lebih baik.

## Yang diperiksa `check.js`

Dua pertanyaan yang berbeda, dan keduanya penting:

1. **Benar atau tidak** — kolom wajib ada, setiap kata punya romaji dan glosa, register
   cocok dengan tingkat bicara, dan keterangan waktu lampau cocok dengan kata kerja di
   klausanya sendiri.
2. **Layak dibaca atau tidak** — tidak ada dua kalimat dengan kerangka yang sama (itu yang
   dulu terjadi: topiknya berganti, kalimatnya sama), kalimat panjang punya alasan yang
   nyata, tidak ada yang dipanjangkan supaya terlihat panjang, dan kalimat panjang adalah
   mayoritas.

## Tampilan

Mode gelap saja. Setiap kartu berisi baris kanji, baris romaji, dan tombol `?`; kartu
terlihat sama sampai dibuka. Panel `?` terbuka di tempat (bukan melayang) dan berisi
terjemahan dua bahasa, arti per kata, lawan bicara, dan catatan pemakaian. Hanya satu panel
terbuka pada satu waktu. Tautan dalam `#qN` membuka panel ke-N, termasuk untuk kartu yang
belum dirender.

Kartu dimuat bertahap saat digulir; kartu tidak pernah dilepas, jadi tinggi halaman hanya
bertambah dan posisi gulir tidak melompat.
