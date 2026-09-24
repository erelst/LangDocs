<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `klinik`

| | |
|---|---|
| Judul | Klinik |
| Kuota | 8 |
| Sudah ditulis | 0 |
| Sisa | **8** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_klinik.js` (belum ada) |

**Catatan kuota.** Bagian terukurnya hanya 0,81%, yang memberi 2,6 kalimat. Kuota dinaikkan ke 8 karena topik tanpa cara menjawab pertanyaan dokter tidak bisa dipakai, seberapa pun jarang keadaannya.

Kuota dihitung di `../README.md` dari sel: 公共商業施設×療養 0,81%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | publik 47% (petugas medis), keluarga 4%, orang asing 4% |
| Bentuk | 用談・相談 77,3%, 雑談 21,3% |
| Jumlah lawan | satu lawan bicara 45% |

## Batas topik

**Termasuk:**

- menyebut gejala, lamanya, dan apa yang sudah dicoba
- menjawab pertanyaan dokter: kapan mulai, di mana sakitnya, seberapa sakit
- menanyakan obat: cara minum, efek samping, boleh atau tidak dengan obat lain
- menyebut alergi dan penyakit yang pernah dialami
- meminta surat keterangan, meminta rujukan, menanyakan biaya
- di apotek: menebus resep, menanyakan obat yang dijual bebas

**Tidak termasuk:**

- menceritakan sakit ke keluarga di rumah, masuk ke `rumah_santai`
- membeli obat sebagai belanja biasa, masuk ke `belanja`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya obat, tanya biaya, tanya apakah perlu kembali. Biasa: -.
- **menjawab** — sopan: menjawab pertanyaan dokter tentang gejala dan riwayat. Biasa: -.
- mengajak — **-**: tidak dipakai: ke klinik orang pergi sendiri atau diantar
- **menerima** — sopan: menerima penjelasan dokter, menerima resep. Biasa: -.
- **menolak halus** — sopan: menolak rawat inap, menolak obat tertentu karena tidak cocok. Biasa: -.
- **rencana** — sopan: menyusun jadwal minum obat, menjadwalkan kontrol. Biasa: -.
- **lampau** — sopan: menceritakan gejala yang sudah berlangsung, menceritakan pengobatan sebelumnya. Biasa: -.
- **minta tolong** — sopan: meminta surat, meminta diantar, meminta obat didahulukan. Biasa: -.
- **menjelaskan** — sopan: menjelaskan rasa sakit, menjelaskan kenapa tidak bisa minum obat tertentu. Biasa: -.
- **sopan** — sopan: ke dokter dan apoteker. Biasa: -.
- **biasa** — sopan: ke keluarga yang menemani di ruang tunggu. Biasa: -.

## Kerangka yang sudah diklaim

Belum ada. Kerangka yang sudah dipakai topik lain bisa dilihat di berkas topik masing-masing, dan yang perlu dihindari adalah `ので`/`から` yang sama dengan kata kerja terakhir yang sama.

## Sisa yang harus ditulis

8 kalimat, yaitu seluruh kuota.

Urutan yang disarankan: keadaan yang paling sering dulu, lalu yang jarang. Slot `bertanya`, `menjawab`, dan `menerima` lebih dulu daripada `rencana` dan `lampau`.
