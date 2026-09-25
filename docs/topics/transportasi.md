<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `transportasi`

| | |
|---|---|
| Judul | Transportasi |
| Kuota | 28 |
| Sudah ditulis | 36 |
| Sisa | **0** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_transportasi.js` |

Kuota dihitung di `../README.md` dari sel: 交通機関×移動 4,69% + 職場・学校×移動 0,78% + 公共商業施設×移動 1,13% + それ以外の屋内×移動 0,31% + 自宅×移動 0,23%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | keluarga 26%, teman 17%, publik 10%, rekan kerja 10% |
| Bentuk | 雑談 79,6%, 用談・相談 19,9% |
| Jumlah lawan | satu lawan bicara 62% |

## Batas topik

**Termasuk:**

- menanyakan jalur, peron, dan kapan harus turun
- menanyakan apakah kereta atau bus ini menuju tempat tertentu
- menjelaskan bahwa akan terlambat, memberi tahu dari kendaraan
- ketinggalan kendaraan dan mencari jalan keluar
- meminta tukar tempat, meminta lewat, meminta bantuan membawa barang
- menanyakan tiket, isi ulang kartu, salah naik
- mengabarkan macet atau kendaraan yang tidak datang
- janji bertemu di stasiun dan menyesuaikan tempatnya

**Tidak termasuk:**

- berjalan di luar dan menanyakan arah, masuk ke `jalan`
- urusan yang dikerjakan setelah turun, masuk ke topik urusan itu

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya jalur, tanya peron, tanya kapan turun, tanya tiket. Biasa: -.
- **menjawab** — sopan: menjawab pertanyaan orang yang tersesat. Biasa: -.
- **mengajak** — sopan: mengajak berangkat bersama, mengajak pulang bersama. Biasa: -.
- **menerima** — sopan: menerima ajakan, menerima petunjuk arah. Biasa: -.
- **menolak halus** — sopan: menolak tukar tempat, menolak membantu karena tidak bisa. Biasa: -.
- **rencana** — sopan: menyusun waktu berangkat, memilih jalur. Biasa: -.
- **lampau** — sopan: menceritakan ketinggalan kendaraan, menceritakan macet tadi. Biasa: -.
- **minta tolong** — sopan: meminta bantuan membawa barang, meminta ditunjukkan jalan. Biasa: -.
- **menjelaskan** — sopan: menjelaskan kenapa terlambat, menjelaskan salah naik. Biasa: -.
- **sopan** — sopan: ke petugas stasiun, ke penumpang yang tidak dikenal. Biasa: -.
- **biasa** — sopan: ke keluarga atau teman yang ikut perjalanan. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 28 kalimat, 28 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `transportasi_tanya_peron` | 大阪 まで 行きたい の です が 何番線 から 出ます | か |
| 2 | `transportasi_tanya_kereta_ini` | すみません 電車 は 渋谷 を 通ります | か |
| 3 | `transportasi_jawab_arah` | 電車 なら 新宿 方面 に 向かって います | よ |
| 4 | `transportasi_tanya_turun` | まで 行きたい ので どの 駅 で 降りれば いい | ですか |
| 5 | `transportasi_salah_naik` | 反対 の 電車 に 乗って しまい ました どう すれば いい | でしょうか |
| 6 | `transportasi_tanya_tiket` | まで の 切符 は いくら に なり ます | か |
| 7 | `transportasi_isi_ulang` | 残高 が 少ない ので チャージ を お願い | します |
| 8 | `transportasi_tanya_kartu_diterima` | 路線 で IC カード は 使えます | か |
| 9 | `transportasi_tukar_tempat` | すみません お席 を 間違えて いる ようなので は の 席 | です |
| 10 | `transportasi_tolak_tukar` | 申し訳ありません が は 指定席 な ので ご了承 | ください |
| 11 | `transportasi_minta_lewat` | すみません | 降ります |
| 12 | `transportasi_tanya_macet` | 電車 が 止まった まま なので 何か あった の でしょう | か |
| 13 | `transportasi_telat_janji` | 電車 が 遅れて いる ので 十分 ほど | 遅れます |
| 14 | `transportasi_ketinggalan` | 終電 を 逃して しまい ました 帰り 方 が 分からない の です | が |
| 15 | `transportasi_bus_tidak_datang` | バス が 全然 来ない の です が 本当 に 来る の でしょう | か |
| 16 | `transportasi_cari_jalan_keluar` | 区役所 まで 行きたい ので どの 出口 が 近い | ですか |
| 17 | `transportasi_janji_di_stasiun` | 南口 の 改札 の 前 が 分かりやすい ので で | 会いましょう |
| 18 | `transportasi_ganti_jalur` | 線 は 混んで いる ので 別 の 線 に 乗り換えた ほう が 早い です | よ |
| 19 | `transportasi_bawa_barang` | 荷物 が 重くて 一人 では 運べない ので だけ 手伝って いただけます | か |
| 20 | `transportasi_rumah_ke_stasiun` | は 七時 に 家 を 出る から 起こして | ね |
| 21 | `transportasi_terima_petunjuk` | 教えて もらった おかげで 本当 に | 助かりました |
| 22 | `transportasi_kereta_terakhir` | 終電 が 十二時 だから まで に 帰った ほう が いい | よ |
| 23 | `transportasi_naik_taksi` | 駅 まで なら どのくらい かかり ます | か |
| 24 | `transportasi_tolak_bantuan` | お気遣い ありがとう ございます が 大丈夫 です ので | どうぞ |
| 25 | `transportasi_kehilangan_tiket` | 途中 で 切符 を なくして しまった の です が どう すれば いい | でしょうか |
| 26 | `transportasi_jam_sibuk` | は 満員 なので 次 の に しません | か |
| 27 | `transportasi_tertinggal_barang` | 電車 に 荷物 を 忘れ た の です が どこ に 届け出れば いい | でしょうか |
| 28 | `transportasi_antar_keluarga_stasiun` | 荷物 が 重い から 駅 まで 車 で 送って いく | よ |

Kuota terpenuhi: 27 dari 27. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: orang asing di jalan 11, petugas stasiun 9, teman 5, keluarga 3. Bentuk
sopan 25, biasa 2. Panjang 23, pendek 5.

20 dari 22 sopan karena hampir semua percakapan di perjalanan terjadi dengan orang yang tidak
dikenal, baik petugas maupun penumpang lain. Dua yang biasa keduanya dengan keluarga di rumah,
soal jam berangkat dan kereta terakhir.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| taksi sama sekali tidak disebut, padahal ia kendaraan umum yang paling sering dipakai setelah kereta | `transportasi_naik_taksi` |
| slot "menolak halus" dijanjikan di ruang ucapan tapi tidak ada satu pun | `transportasi_tolak_bantuan` |
| tiket hilang di tengah perjalanan | `transportasi_kehilangan_tiket` |
| kereta penuh di jam sibuk, dan memilih menunggu | `transportasi_jam_sibuk` |
| barang tertinggal di kereta | `transportasi_tertinggal_barang` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Bukti pencarian |
|---|---|
| kereta cepat dan memesan tempatnya | tidak ada kalimat yang memuat `新幹線` |
| bus malam dan perjalanan jauh | tidak ada kalimat yang memuat `夜行` |
| mengantre di loket tiket | tidak ada kalimat yang memuat `並ん` |
| pengumuman keterlambatan di stasiun | `遅れて` ada, `放送` belum |
| naik sepeda ke stasiun | tidak ada kalimat yang memuat `自転車` |
| gerbong khusus wanita | tidak ada kalimat yang memuat `女性専用` |

Kuota naik dari 22 menjadi 27 karena pemeriksaan ini menemukan lima keadaan yang nyata dan berbeda,
termasuk satu slot yang dijanjikan bagian ruang ucapan di atas tetapi belum pernah diisi.

Kalau topik ini dibuka lagi, tujuh baris itu yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.

**Catatan kenaikan kuota 27 menjadi 28.** Sebabnya terukur dan satu: ketentuan K9
menemukan lawan bicara keluarga berdiri di bawah bagiannya di survei
(36,8% dari seluruh slot lawan bicara, sementara deck waktu itu baru 23,2% dari 449
kalimat). Kalimat keluarga yang ditulis di topik ini semuanya keadaan yang benar-benar
baru, bukan keadaan lama yang lawan bicaranya diganti, karena penggantian seperti itu
melanggar K9 dan akan tertangkap K3, K4, serta T4 sekaligus.

## Sisa yang harus ditulis

28 kalimat. Kuota 28 sudah penuh.
