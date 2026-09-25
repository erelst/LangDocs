<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `jalan`

| | |
|---|---|
| Judul | Jalanan |
| Kuota | 36 |
| Sudah ditulis | 37 |
| Sisa | **0** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_jalan.js` |

Kuota dihitung di `../README.md` dari sel: それ以外の屋外×移動 4,36% + それ以外の屋外×付き合い 0,40% + それ以外の屋外×レジャー活動 0,72%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | keluarga 27%, teman 19%, rekan kerja 8%, orang asing 6% |
| Bentuk | 雑談 84,3%, 用談・相談 15,0% |
| Jumlah lawan | satu lawan bicara 54% |

## Batas topik

**Termasuk:**

- menanyakan arah ke orang yang tidak dikenal, dan memberi arah
- berpapasan dengan orang yang dikenal dan berbasa-basi
- menunggu di luar, mengabarkan bahwa sudah sampai
- menyesuaikan rencana karena cuaca saat berjalan
- mengantar dan menjemput, menanyakan sudah di mana
- mengeluh cuaca saat berjalan, memuji cuaca

**Tidak termasuk:**

- di dalam kendaraan, masuk ke `transportasi`
- acara waktu luang yang sudah direncanakan, masuk ke `santai`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya arah, tanya jarak, tanya jam buka, tanya sudah di mana. Biasa: -.
- **menjawab** — sopan: menjawab pertanyaan arah. Biasa: -.
- **mengajak** — sopan: mengajak jalan bersama, mengajak mampir. Biasa: -.
- **menerima** — sopan: menerima petunjuk arah, menerima ajakan mampir. Biasa: -.
- **menolak halus** — sopan: menolak ajakan mampir, menolak menunjukkan arah karena tidak tahu. Biasa: -.
- **rencana** — sopan: menyusun tempat bertemu, menyesuaikan dengan cuaca. Biasa: -.
- **lampau** — sopan: menceritakan bertemu siapa tadi di jalan. Biasa: -.
- **minta tolong** — sopan: meminta ditunjukkan jalan, meminta antar atau jemput. Biasa: -.
- **menjelaskan** — sopan: menjelaskan arah, menjelaskan kenapa terlambat datang. Biasa: -.
- **sopan** — sopan: ke orang asing di jalan, ke petugas. Biasa: -.
- **biasa** — sopan: ke teman atau keluarga yang berjalan bersama. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 24 kalimat, 24 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `jalan_tanya_arah` | 駅 を 探して いる の です が 方向 で 合って います | か |
| 2 | `jalan_jawab_arah` | まっすぐ 行くと 大きい 店 が ある ので を 左 に 曲がって | ください |
| 3 | `jalan_tidak_tahu_arah` | 申し訳ない の です が も 辺 は 分からない の | です |
| 4 | `jalan_berpapasan` | お久しぶり です お出かけ です | か |
| 5 | `jalan_tanya_sudah_sampai` | どの 辺 に いる か 分かったら 教えて | ください |
| 6 | `jalan_kabar_sudah_sampai` | 駅 に 着いた ので あと で 歩いて | 行きます |
| 7 | `jalan_tunggu_di_depan` | 入り口 の 前 に いる から まで | 来て |
| 8 | `jalan_minta_dijemput` | 荷物 が 多い から 迎え に 来て | くれる |
| 9 | `jalan_ajak_mampir` | 先 に 店 が ある から 寄って | いこう |
| 10 | `jalan_tolak_mampir` | ごめん 時間 が ない から そのまま | 行こう |
| 11 | `jalan_ajak_jalan_bersama` | 途中 まで 同じ 方向 だから 一緒 に | 歩こう |
| 12 | `jalan_terima_petunjuk` | 角 を 右 に 曲がれば いい ん です ね ありがとう | ございます |
| 13 | `jalan_kehujanan` | 途中 で 雨 に 降られて しまった ので びしょびしょ に | なった |
| 14 | `jalan_tanya_jarak` | 歩いて 行く と まで どのくらい かかり ます | か |
| 15 | `jalan_minta_maaf_terlambat` | 遅れて すみません 道 が 分かりにくくて 迷って | しまいました |
| 16 | `jalan_jalan_pagi` | 毎朝 歩いて いる ので 体 の 調子 が いい | です |
| 17 | `jalan_antar_ke_rumah` | 同じ 方向 な ので 家 の 近く まで ご一緒 します | よ |
| 18 | `jalan_tanya_gedung` | 高い ビル を 目印 に したい の です が から 見えます | か |
| 19 | `jalan_park_jam_tutup` | 公園 を 散歩 して いる の です が 何時 まで いられ ます | か |
| 20 | `jalan_berpisah_di_sini` | は で 曲がる から まで に | しよう |
| 21 | `jalan_antar_keluarga_belanja` | 荷物 が 多い から 家 まで 送って いく | よ |
| 22 | `jalan_tanya_ayah_kabari` | 出かける とき は 一声 かけて から ずっと 探して いた | よ |
| 23 | `jalan_jemput_anak` | 雨 が 強い から は 学校 まで 迎え に 行く | ね |
| 24 | `jalan_antar_kerabat` | 入り口 まで お送り します そう しない と 心配 です | から |

Kuota terpenuhi: 20 dari 20. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: orang asing di jalan 10, teman 10, keluarga 5, tetangga 2, pasangan 1.
Bentuk sopan 14, biasa 10. Panjang 23, pendek 1.

Topik ini punya dua sisi yang tidak bertemu: bertanya arah ke orang yang belum dikenal, yang
selalu sopan, dan berjalan bersama orang yang sudah dikenal, yang hampir selalu biasa. Enam
kalimat biasa semuanya ke teman atau keluarga yang sedang berjalan bersama.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| gedung sebagai patokan untuk mencari tempat | `jalan_tanya_gedung` |
| jam tutup taman saat sedang berjalan di situ | `jalan_park_jam_tutup` |
| berpisah di persimpangan karena arah berbeda | `jalan_berpisah_di_sini` |
| menanyakan arah pulang, bukan arah pergi | `jalan_tanya_arah_pulang_dua_kemungkinan` |
| alamat yang tidak ada di peta, jadi petanya tidak menolong | `jalan_tanya_arah_jalan_kecil` |
| tidak tahu daerahnya lalu mengarahkan ke tempat bertanya | `jalan_jawab_tidak_yakin_arah` |
| permintaan mengulang karena suaranya tidak terdengar | `jalan_dengar_arah_ulang` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Bukti pencarian |
|---|---|
| berhenti mengobrol terlalu lama di jalan | tidak ada kalimat yang memuat `話し込` |
| berpapasan dengan orang yang tidak ingin ditemui | `お久しぶり` ada, keadaan sebaliknya belum |

Kuota naik dari 17 menjadi 20 karena pemeriksaan ini menemukan tiga keadaan yang nyata dan berbeda.

Kalau topik ini dibuka lagi, baris di atas yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.

**Catatan kenaikan kuota 20 menjadi 24.** Sebabnya terukur dan satu: ketentuan K9
menemukan lawan bicara keluarga berdiri di bawah bagiannya di survei
(36,8% dari seluruh slot lawan bicara, sementara deck waktu itu baru 23,2% dari 449
kalimat). Kalimat keluarga yang ditulis di topik ini semuanya keadaan yang benar-benar
baru, bukan keadaan lama yang lawan bicaranya diganti, karena penggantian seperti itu
melanggar K9 dan akan tertangkap K3, K4, serta T4 sekaligus.

**Catatan kenaikan kuota 28 menjadi 36.** Sebabnya bukan angka sebaran, melainkan medan makna
yang berlubang di topik ini: `arah` dan `bangunan`. Delapan kalimat menutup `地図`, `交差点`,
`信号`, `二つ目`, `曲がる`, `渡る`, `郵便局`, `建物`, `手前`, dan `戻る`, yang sebelumnya tidak
dipakai kalimat mana pun. Ketentuannya di `../SPEC.md` T6, dan semuanya keadaan nyata: menanyakan
jalan kecil yang tidak ada di peta, menjelaskan dua belokan sekaligus, mengarahkan orang ke pos
polisi karena tidak tahu daerahnya, meminta arah diulang karena tidak terdengar.

## Sisa yang harus ditulis

36 kalimat. Kuota 36 sudah penuh.
