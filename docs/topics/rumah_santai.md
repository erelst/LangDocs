<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `rumah_santai`

| | |
|---|---|
| Judul | Rumah: santai |
| Kuota | 30 |
| Sudah ditulis | 30 |
| Sisa | **0** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_rumah_santai.js` |

Kuota dihitung di `../README.md` dari sel: 自宅×休息 8,82% + それ以外の屋内×休息 0,42% + 自宅×レジャー活動 0,22%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | keluarga 59%, teman 9%, kerabat 3% |
| Bentuk | 雑談 83,2%, 用談・相談 16,6% |
| Jumlah lawan | satu lawan bicara 71% |

## Batas topik

**Termasuk:**

- mengeluh capek dan meminta waktu sendiri
- menceritakan hari yang baru lewat dengan isi, bukan hanya "capek"
- mengajak istirahat, mengajak tidur, mengajak menonton
- menolak ajakan keluar karena mau diam di rumah
- menanyakan kabar anggota keluarga yang lain
- menceritakan hal yang baru diketahui, memberi tahu sesuatu yang menarik
- menenangkan orang yang sedang kesal, menerima keluhan orang lain
- menutup hari: mengucapkan selamat tidur, mengucapkan sampai besok

**Tidak termasuk:**

- pekerjaan rumah, masuk ke `rumah_tugas`
- makan sebagai acara, masuk ke `makan`
- waktu luang di luar rumah, masuk ke `santai`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya kabar, tanya rencana besok, tanya kenapa diam. Biasa: -.
- **menjawab** — sopan: menjawab kabar, menjawab keluhan orang lain. Biasa: -.
- **mengajak** — sopan: mengajak istirahat, mengajak menonton, mengajak tidur. Biasa: -.
- **menerima** — sopan: menerima ajakan, menerima keluhan. Biasa: -.
- **menolak halus** — sopan: menolak ajakan keluar, menolak melanjutkan pembicaraan. Biasa: -.
- **rencana** — sopan: merencanakan akhir pekan, merencanakan waktu sendiri. Biasa: -.
- **lampau** — sopan: menceritakan hari yang lewat, menceritakan yang terjadi tadi. Biasa: -.
- **minta tolong** — sopan: meminta waktu sendiri, meminta ditemani. Biasa: -.
- **menjelaskan** — sopan: menjelaskan kenapa capek, menjelaskan kenapa tidak mau keluar. Biasa: -.
- **sopan** — sopan: ke kerabat yang berkunjung, ke tamu. Biasa: -.
- **biasa** — sopan: ke keluarga serumah. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 30 kalimat, 30 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `rumah_santai_minta_waktu_sendiri` | は 疲れた から 一人 に | して |
| 2 | `rumah_santai_jangan_diganggu` | 休みたい から ご飯 まで は | 呼ばないで |
| 3 | `rumah_santai_cerita_hari` | は 会議 ばかり だった ので 座る 暇 も | なかった |
| 4 | `rumah_santai_tenangkan` | よく 我慢 した んだ から 考えなくて いい | よ |
| 5 | `rumah_santai_ajak_tidur` | 早い んだ から 寝な | さい |
| 6 | `rumah_santai_ajak_nonton` | いい 映画 が ある けど 今夜 一緒 に | 観ない |
| 7 | `rumah_santai_pilih_diam` | は 家 で ゆっくり したい から 今度 | ね |
| 8 | `rumah_santai_tanya_kabar` | は どう だった 仕事 | 終わった |
| 9 | `rumah_santai_kabar_baik` | 別に 変わらない けど 朝 は 危なく 遅れる ところ | だった |
| 10 | `rumah_santai_berita_baru` | 店 先月 で 閉店 した のに まで | 知らなかった |
| 11 | `rumah_santai_pesan_baik` | 天気 が いい らしい よ だけ で 嬉しい | ね |
| 12 | `rumah_santai_rencana_akhir_pekan` | 今週 の 週末 は 予定 を 入れない こと に した ので 家 で のんびり | しよう |
| 13 | `rumah_santai_berhenti_bicara` | 眠い から 続き は に | しよう |
| 14 | `rumah_santai_selamat_tidur` | じゃあ | おやすみ |
| 15 | `rumah_santai_tamu_kerabat` | ずっと 待って いました ので どうぞ お上がり | ください |
| 16 | `rumah_santai_tamu_pulang` | 暗く なり ました ので 駅 まで お送り します | よ |
| 17 | `rumah_santai_tanya_kenapa_diam` | は 静か だけど 何か あった | の |
| 18 | `rumah_santai_keluhan_didengar` | 話 は 聞く から 納得 する まで 話して いい | よ |
| 19 | `rumah_santai_sampai_besok` | 朝 早い から | ね |
| 20 | `rumah_santai_ajak_istirahat` | まで に したら お茶 でも | 飲もう |
| 21 | `rumah_santai_tanya_rencana_besok` | 何時 に 出る か 教えて 時間 に なったら 起こす | よ |
| 22 | `rumah_santai_terima_ajakan` | ちょうど よかった も は ゆっくり したかった | から |
| 23 | `rumah_santai_puji_usaha` | は よく 頑張った から 休んで いい | よ |
| 24 | `rumah_santai_tanya_makan_malam` | なら すぐ 温かい の を 出す | よ |
| 25 | `rumah_santai_nonton_sampai_malam` | 長い から 終わる の は 遅くなる | よ |
| 26 | `rumah_santai_berhenti_kerja` | 残り は に すれば いい から | 閉じて |
| 27 | `rumah_santai_jangan_begadang` | 夜更かし すると つらい から | 寝よう |
| 28 | `rumah_santai_syukuri_kecil` | 朝 の コーヒー が おいしかった だけで いい 日 だった 気 が | する |
| 29 | `rumah_santai_minta_ditemani` | 眠れない から だけ そば に | いて |
| 30 | `rumah_santai_kabar_keluarga_lain` | そういえば おばあさん は 元気 に | してる |

Kuota terpenuhi: 30 dari 30. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: keluarga 17, pasangan 11, teman 2. Bentuk sopan 2, biasa 28.
Panjang 27, pendek 3.

28 dari 30 biasa karena 59% percakapan topik ini dengan keluarga dan tidak ada yang memakai
bentuk sopan ke pasangan sendiri di sofa. Dua yang sopan keduanya ke kerabat yang berkunjung,
satu mempersilakan masuk dan satu menawarkan antar pulang.

Celah yang masih terbuka saat kuota penuh, diperiksa dengan mencari kata kuncinya di berkas ini,
bukan dari ingatan:

| Celah | Bukti pencarian |
|---|---|
| mengucapkan syukur atas hal baik, bukan sekadar menyebutnya | tidak ada kalimat yang memuat `ありがたい` atau `感謝` |
| mengajak berjalan santai bersama | tidak ada kalimat yang memuat `散歩` |
| menanyakan kabar baik keluarga yang lain, bukan hanya nenek | `おばあさん` ada satu, `元気だった` belum |
| lelah fisik, bukan hanya lelah pikiran | `疲れた` ada, `肩` dan `腰` belum |
| mengajak main game atau menonton bersama teman | `映画` ada, `ゲーム` belum |
| musik sebagai cara beristirahat | tidak ada kalimat yang memuat `音楽` |

Kalau topik ini dibuka lagi, enam baris itu yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.
## Sisa yang harus ditulis

0 kalimat. Kuota 30 sudah penuh.
