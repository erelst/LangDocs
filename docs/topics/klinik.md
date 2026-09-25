<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `klinik`

| | |
|---|---|
| Judul | Klinik |
| Kuota | 15 |
| Sudah ditulis | 15 |
| Sisa | **0** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_klinik.js` |

**Catatan kuota.** Bagian terukurnya hanya 0,81%, yang memberi 2,6 kalimat. Kuota dinaikkan ke 8 karena topik tanpa cara menjawab pertanyaan dokter tidak bisa dipakai, seberapa pun jarang keadaannya.

Kuota dihitung di `../README.md` dari sel: 公共商業施設×療養 0,81%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | publik 47% (petugas medis), keluarga 4%, orang asing 4% |
| Bentuk | 用談・相談 77,3%, 雑談 21,3% |
| Kalimat balasan | 4 dari 15: `klinik_tolak_rawat_inap`, `klinik_jawab_lama_demam`, `klinik_jawab_obat_rutin`, `klinik_jawab_alergi_tidak` |
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
- **menjawab** — sopan: menjawab sudah berapa lama demamnya (`klinik_jawab_lama_demam`), obat apa yang sedang diminum (`klinik_jawab_obat_rutin`), apakah ada alergi obat (`klinik_jawab_alergi_tidak`). Biasa: -.
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

Dihitung dengan cara yang sama seperti `check.js`. 15 kalimat, 15 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `klinik_sebut_gejala` | 二日 前 から 熱 が 続いて いる ので | 来ました |
| 2 | `klinik_jelaskan_letak_sakit` | 押す と 痛い ので お腹 の 右 側 が 気に なり | ます |
| 3 | `klinik_tanya_obat_minum` | 薬 は 食後 と 食前 の どちら で 飲めば いい | ですか |
| 4 | `klinik_tanya_efek_samping` | 仕事 に 支障 が 出る と 困る ので 副作用 を 教えて | ください |
| 5 | `klinik_alergi_obat` | 以前 抗生物質 で かぶれた こと が ある ので は 避けて | ください |
| 6 | `klinik_minta_surat` | 診断書 を お願い したい の です が いただけます | か |
| 7 | `klinik_tanya_biaya` | 受け て から で は 困る ので どのくらい かかる か 先 に 教えて | ください |
| 8 | `klinik_apotek_tebus_resep` | 処方箋 を いただいた ので で お願い | します |
| 9 | `klinik_minta_rujukan` | もう少し 詳しく 調べたい ので 紹介状 を お願い できます | か |
| 10 | `klinik_tolak_rawat_inap` | 家 の こと が ある ので 入院 は 難しく 通い で お願い できない | でしょうか |
| 11 | `klinik_tanya_obat_bebas` | 病院 に 行く ほど で は ない ので 市販薬 で いい もの は あります | か |
| 12 | `klinik_tanya_vaksin` | 予防接種 は いつ まで に 受ければ いい か 二回目 まで どのくらい 空ける か 教えて | ください |
| 13 | `klinik_jawab_lama_demam` | 熱 は 二日前 から です 昨夜 は 三十八度 まで | 上がりました |
| 14 | `klinik_jawab_obat_rutin` | 血圧 の 薬 は 毎朝 飲んでいます が 欠かした こと は | ありません |
| 15 | `klinik_jawab_alergi_tidak` | まで 薬 で かぶれた こと が ない ので アレルギー は ない と | 思います |

Kuota terpenuhi: 15 dari 15. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: dokter 13, apoteker 2. Bentuk sopan 15, biasa 0. Panjang 15,
pendek 0.

Dua belas dari dua belas sopan, dan tidak ada satu pun yang biasa: tidak ada orang yang berbicara
biasa kepada dokternya. Topik ini juga satu-satunya yang tidak punya slot mengajak, karena ke
klinik orang pergi sendiri atau diantar, dan itu sudah tercatat di bagian ruang ucapan di atas.

Semua lima belas panjang. Bentuk pendek tidak dipakai di ruang periksa, karena menjawab dokter
dengan satu kata justru terdengar tidak kooperatif.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| surat rujukan ke rumah sakit yang lebih besar | `klinik_minta_rujukan` |
| menolak rawat inap dan meminta berobat jalan | `klinik_tolak_rawat_inap` |
| obat yang dijual bebas untuk gejala ringan | `klinik_tanya_obat_bebas` |
| vaksinasi dan jeda antara dua dosis | `klinik_tanya_vaksin` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Bukti pencarian |
|---|---|
| alergi makanan, bukan alergi obat | `アレルギー` ada untuk obat, `食物` belum |
| menanyakan apakah perlu datang lagi | tidak ada kalimat yang memuat `また来て` |
| meminta hasil pemeriksaan | tidak ada kalimat yang memuat `検査結果`. `結果` sudah dipakai `rumah_santai_puji_usaha`, tapi untuk hasil latihan anak |
| biaya yang ditanggung asuransi | `かかる` ada, `保険` belum |

Kuota naik dari 8 ke 12 lewat empat keadaan nyata, lalu ke 15 karena tiga kalimat balasan yang
dituntut `../SPEC.md` K8, semuanya jawaban atas pertanyaan dokter,
semuanya dari daftar celah yang sudah tercatat sejak topik ini ditulis.

Kalau topik ini dibuka lagi, baris di atas yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.
## Sisa yang harus ditulis

15 kalimat. Kuota 15 sudah penuh.
