<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `rumah_santai`

| | |
|---|---|
| Judul | Rumah: santai |
| Kuota | 58 |
| Sudah ditulis | 89 |
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

Dihitung dengan cara yang sama seperti `check.js`. 74 kalimat, 74 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
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
| 21 | `rumah_santai_tanya_rencana_besok_keluarga` | 何時 に 出る か 教えて 時間 に なったら 起こす | よ |
| 22 | `rumah_santai_terima_ajakan` | ちょうど よかった も は ゆっくり したかった | から |
| 23 | `rumah_santai_puji_usaha` | は よく 頑張った から 休んで いい | よ |
| 24 | `rumah_santai_tanya_makan_malam` | なら すぐ 温かい の を 出す | よ |
| 25 | `rumah_santai_nonton_sampai_malam` | 長い から 終わる の は 遅くなる | よ |
| 26 | `rumah_santai_berhenti_kerja` | 残り は に すれば いい から | 閉じて |
| 27 | `rumah_santai_jangan_begadang` | 夜更かし すると つらい から | 寝よう |
| 28 | `rumah_santai_syukuri_kecil` | 朝 の コーヒー が おいしかった だけで いい 日 だった 気 が | する |
| 29 | `rumah_santai_minta_ditemani` | 眠れない から だけ そば に | いて |
| 30 | `rumah_santai_kabar_keluarga_lain` | そういえば おばあさん は 元気 に | してる |
| 31 | `rumah_santai_syukur_hari` | 大変 な 一日 だった けど 無事 に 終わって ありがたい と 思う | よ |
| 32 | `rumah_santai_ajak_jalan_pagi` | 朝 の 空気 が いい から 散歩 でも | どう |
| 33 | `rumah_santai_kabar_keluarga_baik` | おばあさん 元気 だった ので 安心 | した |
| 34 | `rumah_santai_lelah_fisik` | 腰 と 肩 が 凝って いる から もんで | くれる |
| 35 | `rumah_santai_ajak_game` | 仕事 が 終わった から ゲーム でも | しない |
| 36 | `rumah_santai_dengar_musik` | 休みたい から 音楽 を 聴いて いる | ね |
| 37 | `rumah_santai_bercanda_tertawa` | 話 面白すぎて お腹 が 痛く なる まで 笑った | よ |
| 38 | `rumah_santai_nonton_berita` | ニュース で 話題 に なって いる から テレビ で | 見よう |
| 39 | `rumah_santai_hobi_baru` | 最近 新しい 趣味 が 増えた ん だけど 思った より 楽しい | よ |
| 40 | `rumah_santai_tamu_menginap` | わざわざ 遠く から 来て くれた から 今夜 は 泊まって いって | よ |
| 41 | `rumah_santai_rencana_liburan_keluarga` | 連休 が 近い から 今夜 家族 で 予定 を | 決めよう |
| 42 | `rumah_santai_berita_keluarga` | 姉 が 引っ越す って 言って た けど みんな が 揃って から | 話そう |
| 43 | `rumah_santai_obat_keluarga` | 薬 は 飲んだ なら の うち に 飲んで | おいて |
| 44 | `rumah_santai_tanya_kabar_orangtua` | 父 の 具合 は どう ですか 何 か あったら 知らせて | ください |
| 45 | `rumah_santai_tanya_rencana_besok` | 何 か 予定 が ある の 手 が 要る なら 言って | ね |
| 46 | `rumah_santai_tanya_kerja_anak` | 宿題 は 終わった の なら 遊ぶ 前 に やって | おいて |
| 47 | `rumah_santai_puji_usaha_anak` | 続けて いた から 結果 も ついて くる | よ |
| 48 | `rumah_santai_minta_maaf_anak` | さっき は 言いすぎ た から ごめん | ね |
| 49 | `rumah_santai_pesan_keluarga` | あと で 出かける なら お母さん に 伝えて | おいて |
| 50 | `rumah_santai_kecilkan_volume` | 寝たい から テレビ の 音 を 小さく して | くれる |
| 51 | `rumah_santai_bangunkan_pagi` | は 早い から 六時 に 起こして | くれる |
| 52 | `rumah_santai_tanya_sekolah` | 学校 で 何 か あった の 嬉しかった こと だけ でも いい | けど |
| 53 | `rumah_santai_tidur_lebih_awal` | 学校 だ から 寝坊 しない よう に 寝 な | さい |
| 54 | `rumah_santai_ajak_makan_bareng` | みんな が 揃った から 一緒 に ごはん に | しよう |
| 55 | `rumah_santai_terima_tamu_kerabat` | どうぞ お上がり ください こちら が 楽 です | から |
| 56 | `rumah_santai_kerabat_pulang` | 遠い ところ わざわざ 来て くださった ので お気 を つけて お帰り | ください |
| 57 | `rumah_santai_tanya_kabar_kerabat` | しばらく お会い して いません でした が ご家族 は お元気 | ですか |
| 58 | `rumah_santai_bantu_kerabat` | お荷物 が 多い よう です から 半分 だけ お持ち します | よ |

Kuota terpenuhi: 36 dari 36. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: keluarga 58, pasangan 14, teman 2. Bentuk sopan 23, biasa 51.
Panjang 55, pendek 3.

28 dari 30 biasa karena 59% percakapan topik ini dengan keluarga dan tidak ada yang memakai
bentuk sopan ke pasangan sendiri di sofa. Dua yang sopan keduanya ke kerabat yang berkunjung,
satu mempersilakan masuk dan satu menawarkan antar pulang.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| mengucapkan syukur, bukan sekadar menyebut harinya berat | `rumah_santai_syukur_hari` |
| jalan santai bersama di sekitar rumah | `rumah_santai_ajak_jalan_pagi` |
| kabar baik anggota keluarga yang ditanyakan, dengan akibatnya | `rumah_santai_kabar_keluarga_baik` |
| lelah fisik, bukan hanya lelah pikiran | `rumah_santai_lelah_fisik` |
| main game bersama sebagai cara istirahat | `rumah_santai_ajak_game` |
| musik sebagai cara istirahat | `rumah_santai_dengar_musik` |
| bercanda dan tertawa bersama | `rumah_santai_bercanda_tertawa` |
| menonton televisi atau berita bersama | `rumah_santai_nonton_berita, rumah_santai_kecilkan_volume` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Bukti pencarian |
|---|---|
| hobi baru yang mulai ditekuni | `好き` dan `趣味` belum muncul sebagai topik pembicaraan |
| tamu yang menginap, bukan sekadar berkunjung | `お上がり` dan `お送り` ada; `泊まる` sudah terpakai sejak batch medan makna keluarga, jadi celahnya tinggal bagian "tamu"-nya |

Kuota naik dari 30 menjadi 36 karena pemeriksaan ini menemukan enam keadaan yang nyata dan berbeda,
semuanya dari daftar celah yang sudah tercatat sejak topik ini ditulis.

Kalau topik ini dibuka lagi, enam baris itu yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.

**Catatan kenaikan kuota 36 menjadi 58.** Sebabnya terukur dan satu: ketentuan K9
menemukan lawan bicara keluarga berdiri di bawah bagiannya di survei
(36,8% dari seluruh slot lawan bicara, sementara deck waktu itu baru 23,2% dari 449
kalimat). Kalimat keluarga yang ditulis di topik ini semuanya keadaan yang benar-benar
baru, bukan keadaan lama yang lawan bicaranya diganti, karena penggantian seperti itu
melanggar K9 dan akan tertangkap K3, K4, serta T4 sekaligus.

## Sisa yang harus ditulis

58 kalimat. Kuota 58 sudah penuh.

16 kalimat terakhir datang dari batch medan makna keluarga (bagian 3b `../README.md`), jadi berkas ini berisi 74 kalimat di atas kuota 58 yang tetap tidak berubah. Kalimat-kalimat itu tidak mengubah kuota, karena kuotanya diukur dari survei dan kata benda tidak punya sel di survei itu (T6).
