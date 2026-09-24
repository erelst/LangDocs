<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `waktu_cuaca`

| | |
|---|---|
| Judul | Waktu dan cuaca |
| Kuota | 18 |
| Sudah ditulis | 2 |
| Sisa | **16** |
| Kerangka lintas topik | ya, memotong semua topik |
| Berkas | `data/t_waktu_cuaca.js` (belum ada) |
| Dari `kurasi` | 2 |
| Perlu ditulis di `t_waktu_cuaca.js` | **16** |

`data/curated.js` sudah menyumbang 2 kalimat: `kurasi07` (sapaan waktu + cuaca) dan `kurasi10` (sapaan waktu kepada orang akrab, `polite: 0`, jadi pasangan bentuk biasa untuk `kurasi07`).

Kuota dihitung di `../README.md` dari sel: 名詞 17,35% dari seluruh token; bagian terbesar nama diri adalah waktu, ditambah nama tempat.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | bervariasi; hampir selalu sebagai pembuka sebelum topik yang sebenarnya |
| Bentuk | keduanya; sapaan waktu hari punya pasangan sopan dan biasa |
| Jumlah lawan | tidak menentukan |

## Batas topik

**Termasuk:**

- sapaan berdasarkan waktu hari, dan perbedaannya dengan rekan akrab
- menyebut hari, tanggal, dan jam dalam percakapan, bukan sebagai angka
- mengaitkan cuaca dengan rencana: mengubah, menunda, membatalkan
- menyesuaikan janji dengan cuaca dan jam sibuk
- menanyakan perkiraan cuaca dan menyampaikan apa yang didengar
- mengucapkan sesuatu saat cuaca berubah mendadak

**Tidak termasuk:**

- menyusun acara yang bergantung cuaca, masuk ke `santai` atau `jalan`
- jadwal kerja atau sekolah, masuk ke `kerja`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya hari, tanya jam, tanya perkiraan cuaca. Biasa: -.
- **menjawab** — sopan: menjawab sapaan waktu, menjawab pertanyaan tentang hari. Biasa: -.
- **mengajak** — sopan: mengajak menunda karena cuaca, mengajak berangkat lebih awal. Biasa: -.
- **menerima** — sopan: menerima perubahan rencana karena cuaca. Biasa: -.
- **menolak halus** — sopan: menolak keluar karena cuaca, menolak jam yang ditawarkan. Biasa: -.
- **rencana** — sopan: menetapkan hari dan jam bertemu, memilih hari yang tidak hujan. Biasa: -.
- **lampau** — sopan: menceritakan cuaca kemarin, menyebut sudah berapa lama. Biasa: -.
- **minta tolong** — sopan: meminta jam yang lebih longgar, meminta ditunggu sebentar. Biasa: -.
- **menjelaskan** — sopan: menjelaskan kenapa harus hari lain, menjelaskan kenapa jam itu tidak bisa. Biasa: -.
- **sopan** — sopan: sapaan waktu ke atasan, ke orang yang baru dikenal. Biasa: -.
- **biasa** — sopan: sapaan waktu ke teman dan keluarga. Biasa: -.

Topik ini sumbunya adalah tingkat keakraban itu sendiri, jadi kolom sopan dan biasa bukan dua kolom terpisah di sini melainkan isi topiknya: tiap baris di atas harus ada dalam kedua bentuk.

## Kerangka yang sudah diklaim

Belum ada. Kerangka yang sudah dipakai topik lain bisa dilihat di berkas topik masing-masing, dan yang perlu dihindari adalah `ので`/`から` yang sama dengan kata kerja terakhir yang sama.

## Sisa yang harus ditulis

16 kalimat.

Urutan yang disarankan: keadaan yang paling sering dulu, lalu yang jarang. Slot `bertanya`, `menjawab`, dan `menerima` lebih dulu daripada `rencana` dan `lampau`.
