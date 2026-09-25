<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `rumah_tugas`

| | |
|---|---|
| Judul | Rumah: tugas |
| Kuota | 63 |
| Sudah ditulis | 63 |
| Sisa | **0** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_rumah_tugas.js` |

Kuota dihitung di `../README.md` dari sel: 自宅×家事・雑事 10,24% + 自宅×身周りの用事 3,96%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | keluarga 65%, publik 4%, kerabat 3% |
| Bentuk | 雑談 72,0%, 用談・相談 27,9% |
| Jumlah lawan | satu lawan bicara 74%, jadi sebagian besar percakapan berdua |

## Batas topik

**Termasuk:**

- membagi pekerjaan rumah dan menagih janji yang belum dikerjakan
- meminta tolong saat sedang sibuk, dan menjelaskan kenapa harus sekarang
- mengurus tagihan, surat, dan berkas: membayar, memberi tahu sudah dibayar
- menjemur, mencuci, membersihkan, membuang sampah, membeli keperluan habis
- memberi tahu pekerjaan sudah selesai, dan menyebut apa yang belum
- memperbaiki barang yang rusak, memanggil tukang
- mengingatkan tugas orang lain tanpa membuatnya tersinggung
- menolak mengerjakan sesuatu sekarang, dengan alasan dan tawaran waktu lain

**Tidak termasuk:**

- masak dan makan sebagai acara, masuk ke `makan`
- waktu santai di rumah setelah pekerjaan selesai, masuk ke `rumah_santai`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya apakah sudah dikerjakan, tanya di mana barangnya. Biasa: -.
- **menjawab** — sopan: menjawab bahwa sudah dikerjakan, menjawab belum. Biasa: -.
- **mengajak** — sopan: mengajak mengerjakan bersama. Biasa: -.
- **menerima** — sopan: menerima tugas rumah, menerima pembagian. Biasa: -.
- **menolak halus** — sopan: menolak mengerjakan sekarang, menolak karena bukan bagiannya. Biasa: -.
- **rencana** — sopan: membagi pekerjaan, menyusun urutan hari. Biasa: -.
- **lampau** — sopan: memberi tahu sudah selesai, menceritakan apa yang terjadi saat mengerjakan. Biasa: -.
- **minta tolong** — sopan: minta tolong mengangkat, menjemur, mengantar, membayar. Biasa: -.
- **menjelaskan** — sopan: menjelaskan kenapa belum selesai, menjelaskan kenapa harus sekarang. Biasa: -.
- **sopan** — sopan: ke tetangga, ke tukang, ke petugas yang datang ke rumah. Biasa: -.
- **biasa** — sopan: ke anggota keluarga di rumah. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 63 kalimat, 63 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `rumah_tugas_minta_jemur` | これから 出かける から 洗濯物 を 干して | おいて |
| 2 | `rumah_tugas_bagi_tugas` | が 洗濯 を する から は 皿 を | 洗って |
| 3 | `rumah_tugas_tagih_janji` | やる って 言った のに やってない | よね |
| 4 | `rumah_tugas_tanya_sudah_dibuang` | ゴミ 出して | くれた |
| 5 | `rumah_tugas_jawab_sudah` | あ 出した | よ |
| 6 | `rumah_tugas_jawab_belum` | だけど から やる | よ |
| 7 | `rumah_tugas_tolak_sekarang` | は 無理 だけど 夜 なら できる | よ |
| 8 | `rumah_tugas_harus_sekarang` | 雨 が 降りそう だから 先 に 洗濯物 を | 取り込んで |
| 9 | `rumah_tugas_buang_sampah` | は ゴミ の 日 だから 出して | おいて |
| 10 | `rumah_tugas_tanya_jenis_sampah` | 燃える ゴミ で いい | の |
| 11 | `rumah_tugas_pisah_plastik` | プラ は 別 の 袋 だから 一緒 に | 入れないで |
| 12 | `rumah_tugas_masuk_jemuran` | 暗く なって きた から 洗濯物 を 入れて | くれる |
| 13 | `rumah_tugas_manfaatkan_cuaca` | 天気 が いい から 乾く うちに 布団 も 干して | おこう |
| 14 | `rumah_tugas_bersih_kamar` | 部屋 掃除 して から 出かける | ね |
| 15 | `rumah_tugas_tanya_bagi_kamar_mandi` | お風呂 の 掃除 は どっち が | やる |
| 16 | `rumah_tugas_kehabisan_kertas` | トイレットペーパー が 切れた から 買って | きて |
| 17 | `rumah_tugas_titip_beli_deterjen` | 帰り に 店 に 寄る なら 洗剤 を 買って きて | くれる |
| 18 | `rumah_tugas_bayar_tagihan` | 払わない と 止まっちゃう から 中 に | お願い |
| 19 | `rumah_tugas_sudah_bayar` | 電気代 なら 払って おいた | よ |
| 20 | `rumah_tugas_lupa_bayar` | 払う の を 忘れてて 気づいた から 急いで 行って | くる |
| 21 | `rumah_tugas_terima_paket` | 宅配便 が 来た から 受け取って おいた | よ |
| 22 | `rumah_tugas_titip_paket_kurir` | すみません 玄関 の 前 に 置いて いただけます | か |
| 23 | `rumah_tugas_barang_rusak` | 洗濯機 が 変 な 音 が して 回らなく | なっちゃった |
| 24 | `rumah_tugas_panggil_tukang` | ネット が 繋がらない から 修理 を 頼んで | おいて |
| 25 | `rumah_tugas_antar_tukang` | 場所 が 分かりにくい ので 一緒 に 上がって いただけます | か |
| 26 | `rumah_tugas_terima_kasih_tukang` | 来て もらえた ので 助かりました 本当 に ありがとう | ございました |
| 27 | `rumah_tugas_pinjam_gula` | すみません 砂糖 を お借り できません | か |
| 28 | `rumah_tugas_kembalikan_pinjaman` | 使い終わった ので さっき お借りした の を お返し に | 来ました |
| 29 | `rumah_tugas_minta_maaf_berisik` | は 遅く まで 音 が して しまい すみません | でした |
| 30 | `rumah_tugas_ingatkan_halus` | 忙しい ところ 悪い けど だけ お願い | できる |
| 31 | `rumah_tugas_minta_angkat` | 一人 じゃ 持てない から 手伝って | くれる |
| 32 | `rumah_tugas_sibuk_jangan_diganggu` | 手 が 離せない から だけ やって | おいて |
| 33 | `rumah_tugas_sebut_yang_belum` | 洗濯 は 終わった けど 掃除 は 残って | いる |
| 34 | `rumah_tugas_susun_urutan` | 洗濯物 を 干して から 買い物 に | 行こう |
| 35 | `rumah_tugas_ajarkan_anak` | 食器 は 泡 を 流して から 拭いて | ね |
| 36 | `rumah_tugas_tanya_letak_kunci` | 鍵 を どこ に 置いた か | 分かる |
| 37 | `rumah_tugas_jawab_letak` | テーブル の 上 に ある | よ |
| 38 | `rumah_tugas_rawat_tanaman` | 水 を やらない と 枯れちゃう から | お願い |
| 39 | `rumah_tugas_ganti_lampu` | 電球 が 切れた から 暗く なる 前 に 交換 しない | と |
| 40 | `rumah_tugas_buang_barang_besar` | は 大きい から 粗大ごみ で 出さない と いけない | ね |
| 41 | `rumah_tugas_cek_jadwal_besar` | 粗大ごみ は いつ 出せる か 分からない から 調べて | くれる |
| 42 | `rumah_tugas_lapor_selesai_hari` | は 洗濯 と 買い物 が 終わった から あと は | 休もう |
| 43 | `rumah_tugas_terima_kasih_bantuan` | 手伝って くれた から 思った より 早く 終わった | よ |
| 44 | `rumah_tugas_minta_pindah_lemari` | タンス を 動かす の に 一人 じゃ 無理 だから 手伝って | くれる |
| 45 | `rumah_tugas_tolak_bukan_bagiannya` | の 分担 じゃない から 自分 で やって | ね |
| 46 | `rumah_tugas_tagihan_air` | 水道 と ガス は どう なった | 払った |
| 47 | `rumah_tugas_perbaiki_sendiri` | 自分 で 見て みる から 無理 なら | 頼もう |
| 48 | `rumah_tugas_barang_hilang` | 家 の 鍵 が 見つからない ので どこ に ある か | 知らない |
| 49 | `rumah_tugas_titip_tetangga` | 旅行 で 留守 に する ので 鍵 を お預け したい の です | が |
| 50 | `rumah_tugas_kunci_duplikat` | 鍵 が 一本 しか ない と 困る から 合鍵 を 作って | おこう |
| 51 | `rumah_tugas_pilah_daur_ulang` | 段ボール は リサイクル に 出す から 燃える ゴミ と 分けて | おいて |
| 52 | `rumah_tugas_keran_menetes` | 水道 の 水 が 止まら ない から 早め に 見て | おいて |
| 53 | `rumah_tugas_sekring_turun` | 電気 が 落ちた から ブレーカー を 見て | くれる |
| 54 | `rumah_tugas_terkunci_luar` | 鍵 を 中 に 置いた まま 家 に 入れ ない ので 困って いる | んだ |
| 55 | `rumah_tugas_ganti_gagang_pintu` | 取っ手 が 緩んで いる から 壊れる 前 に 直した ほう が いい | よ |
| 56 | `rumah_tugas_panggil_tukang_air` | は 自分たち で は 無理 だ から 業者 に 頼ま | ない |
| 57 | `rumah_tugas_jadwal_barang_besar` | 粗大 ゴミ は 来月 まで に 出す から まで に 出して | おいて |
| 58 | `rumah_tugas_setrika_baju` | 洗濯物 は 乾いた から 着る 分 だけ アイロン を かけて | おいて |
| 59 | `rumah_tugas_daftar_belanja` | スーパー に 行く なら ついで に を 買って | きて |
| 60 | `rumah_tugas_beri_makan_kucing` | 今夜 は 遅く なる から 猫 の 餌 を あげて | おいて |
| 61 | `rumah_tugas_ganti_sprei` | シーツ は しばらく 使って いる から 替えて | おこう |
| 62 | `rumah_tugas_angkat_kerabat` | 重い もの は が お持ち します から どうぞ お掛け | ください |
| 63 | `rumah_tugas_siapkan_kamar_tamu` | お部屋 は 用意 して あります ので 足り ない もの が あれば おっしゃって | ください |

Kuota terpenuhi: 51 dari 51. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya. T2 juga menetapkan kuota adalah lantai:
kalau masih ada keadaan yang belum punya kalimat, kalimatnya ditambahkan walau 45 sudah lewat.

Lawan bicara yang sudah dipakai: keluarga 50, pasangan 6, tetangga 4, orang asing di jalan 2, kurir pengantar 1.
Bentuk sopan 9, biasa 54. Panjang 53, pendek 10.

39 dari 45 biasa karena 65% percakapan topik ini memang dengan keluarga, dan bahasa di dapur
sendiri bukan bahasa sopan. Keenam yang sopan semuanya ke orang luar: tiga ke tetangga, dua ke
tukang, satu ke kurir. Tidak ada satu pun yang sopan ke keluarga atau pasangan, karena kalimat
sopan di antara orang serumah justru terdengar menjauhkan.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| tagihan air dan gas, bukan hanya listrik | `rumah_tugas_tagihan_air` |
| mencoba memperbaiki sendiri sebelum memanggil tukang | `rumah_tugas_perbaiki_sendiri` |
| barang yang hilang di rumah | `rumah_tugas_barang_hilang` |
| menitipkan kunci ke tetangga saat pergi | `rumah_tugas_titip_tetangga` |
| membuat kunci duplikat | `rumah_tugas_kunci_duplikat` |
| memilah sampah daur ulang | `rumah_tugas_pilah_daur_ulang` |
| listrik yang mati dan sekring yang turun | `rumah_tugas_sekring_turun` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Bukti pencarian |
|---|---|
| kebocoran air dan keran yang menetes | tidak ada kalimat yang memuat `漏れ` atau `水漏れ` |
| menjadwalkan pengangkutan barang besar | `粗大ごみ` ada. `予約` sudah dipakai `makan_reservasi_tempat` dan `santai_pesan_tempat`, tapi untuk memesan meja; untuk pengangkutan belum |
| mengeluh atau menanggapi kebisingan tetangga | tidak ada kalimat yang memuat `騒音` atau `苦情` |
| mengunci diri di luar rumah | `鍵` dan `合鍵` ada, `締め出` belum |

Kuota naik dari 45 menjadi 51 karena pemeriksaan ini menemukan enam keadaan yang nyata dan berbeda,
semuanya dari daftar celah yang sudah tercatat sejak topik ini ditulis. Dua di antaranya bukan
sekadar kalimat tambahan: tagihan air dan gas adalah pekerjaan rumah tangga yang paling rutin, dan
memilah sampah daur ulang adalah aturan yang berbeda di tiap daerah.

Kalau topik ini dibuka lagi, enam baris itu yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.

**Catatan kenaikan kuota 51 menjadi 63.** Sebabnya terukur dan satu: ketentuan K9
menemukan lawan bicara keluarga berdiri di bawah bagiannya di survei
(36,8% dari seluruh slot lawan bicara, sementara deck waktu itu baru 23,2% dari 449
kalimat). Kalimat keluarga yang ditulis di topik ini semuanya keadaan yang benar-benar
baru, bukan keadaan lama yang lawan bicaranya diganti, karena penggantian seperti itu
melanggar K9 dan akan tertangkap K3, K4, serta T4 sekaligus.

## Sisa yang harus ditulis

63 kalimat. Kuota 63 sudah penuh.
