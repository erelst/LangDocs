<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `sopan`

| | |
|---|---|
| Judul | Sopan dan reaksi |
| Kuota | 32 |
| Sudah ditulis | 5 |
| Sisa | **27** |
| Kerangka lintas topik | ya, memotong semua topik |
| Berkas | `data/t_sopan.js` (belum ada) |
| Dari `kurasi` | 4 |
| Perlu ditulis di `t_sopan.js` | **27** |

`data/curated.js` sudah menyumbang 4 kalimat: `kurasi01` (sapaan sekaligus pembuka), `kurasi02` (meminta tunggu), `kurasi05` (menyetujui), `kurasi09` (menawarkan bantuan). `kurasi07` dan `kurasi10` dihitung di `waktu_cuaca`, tidak di sini, supaya tidak dihitung dua kali.

Kuota dihitung di `../README.md` dari sel: 感動詞 10,52% dari seluruh token, dan partikel akhir kalimat 163.670 kali dalam 2.419.171 kata.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | bervariasi; yang menentukan hanya tingkat keakraban |
| Bentuk | keduanya, dan justru pasangan sopan/biasa inilah isinya |
| Jumlah lawan | satu atau lebih, tidak menentukan |

## Batas topik

**Termasuk:**

- menyetujui dan menyetujui dengan ragu
- terkejut, tidak percaya, dan menanggapinya
- meminta diulang karena tidak terdengar atau tidak dimengerti
- menyela pembicaraan dengan halus dan mengambil alih giliran bicara
- menutup pembicaraan tanpa memutusnya
- memuji, dan menanggapi pujian tanpa terdengar sombong
- meminta maaf untuk hal kecil, dan menanggapi permintaan maaf
- menyampaikan bahwa tidak nyaman, tanpa menyalahkan
- mengucapkan terima kasih, dan menanggapinya
- meminta waktu untuk berpikir sebelum menjawab

**Tidak termasuk:**

- sapaan berdasarkan waktu hari, masuk ke `waktu_cuaca`
- isi percakapan yang sedang berlangsung, yang tetap mengikuti topik asalnya

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: menanyakan ulang dengan halus, menanyakan apakah benar. Biasa: -.
- **menjawab** — sopan: menjawab panggilan, menjawab pujian, menjawab permintaan maaf. Biasa: -.
- **mengajak** — sopan: mengajak melanjutkan pembicaraan, mengajak berhenti dulu. Biasa: -.
- **menerima** — sopan: menerima pendapat, menerima koreksi, menerima pujian. Biasa: -.
- **menolak halus** — sopan: menolak pendapat, menolak permintaan, menolak tanpa kata "tidak". Biasa: -.
- **rencana** — sopan: menyepakati giliran bicara, menunda pembicaraan. Biasa: -.
- **lampau** — sopan: menanggapi cerita orang lain, menanggapi kabar yang baru didengar. Biasa: -.
- **minta tolong** — sopan: meminta diulang, meminta dijelaskan lagi, meminta waktu. Biasa: -.
- **menjelaskan** — sopan: menjelaskan bahwa tidak terdengar, menjelaskan bahwa belum paham. Biasa: -.
- **sopan** — sopan: ke atasan, ke orang yang baru dikenal, ke petugas. Biasa: -.
- **biasa** — sopan: ke teman dekat, ke keluarga. Biasa: -.

Topik ini sumbunya adalah tingkat keakraban itu sendiri, jadi kolom sopan dan biasa bukan dua kolom terpisah di sini melainkan isi topiknya: tiap baris di atas harus ada dalam kedua bentuk.

## Kerangka yang sudah diklaim

Belum ada. Kerangka yang sudah dipakai topik lain bisa dilihat di berkas topik masing-masing, dan yang perlu dihindari adalah `ので`/`から` yang sama dengan kata kerja terakhir yang sama.

## Sisa yang harus ditulis

27 kalimat.

Urutan yang disarankan: keadaan yang paling sering dulu, lalu yang jarang. Slot `bertanya`, `menjawab`, dan `menerima` lebih dulu daripada `rencana` dan `lampau`.
