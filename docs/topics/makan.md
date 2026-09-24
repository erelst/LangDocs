<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `makan`

| | |
|---|---|
| Judul | Makan |
| Kuota | 57 |
| Sudah ditulis | 57 |
| Sisa | **0** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_makan.js` |

Kuota dihitung di `../README.md` dari sel: 自宅×食事 9,72% + 公共商業施設×食事 4,37% + 職場・学校×食事 1,60% + それ以外の屋内×食事 1,04%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | keluarga 33%, publik 7%, teman 5%, rekan kerja 3% |
| Bentuk | 雑談 88,9%, 用談・相談 10,2% |
| Jumlah lawan | satu lawan bicara 45%, jadi banyak yang beramai-ramai |

## Batas topik

**Termasuk:**

- memesan di restoran, termasuk menanyakan yang tidak ada di menu
- menanyakan isi makanan, menanyakan bahan, menyebut alergi
- meminta perubahan pesanan, meminta tambah, meminta bungkus
- menawarkan makanan ke orang lain, dan menolak tawaran makanan
- memuji makanan, mengeluh makanan, membandingkan dengan yang pernah dimakan
- membayar bersama, membagi tagihan, menawarkan membayar
- mengajak makan, menolak ajakan makan
- di rumah: menyebut masakannya, menanyakan kapan makan, memanggil makan
- menyebut kebiasaan makan, diet, tidak makan sesuatu
- menanyakan rekomendasi dan menanyakan porsi

**Tidak termasuk:**

- berbelanja bahan makanan, masuk ke `belanja`
- memasak sebagai pekerjaan rumah, masuk ke `rumah_tugas`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya menu, tanya isi, tanya rekomendasi, tanya porsi. Biasa: -.
- **menjawab** — sopan: menjawab pertanyaan tentang makanan, menjawab ajakan makan. Biasa: -.
- **mengajak** — sopan: mengajak makan, mengajak mencoba tempat baru. Biasa: -.
- **menerima** — sopan: menerima tawaran makanan, menerima ajakan. Biasa: -.
- **menolak halus** — sopan: menolak tawaran makanan, menolak ajakan, menolak pesanan yang tidak ada. Biasa: -.
- **rencana** — sopan: merencanakan makan bersama, memilih tempat, menentukan jam. Biasa: -.
- **lampau** — sopan: menceritakan makanan yang sudah dimakan, menceritakan tempat yang pernah dikunjungi. Biasa: -.
- **minta tolong** — sopan: meminta tambah, meminta bungkus, meminta struk makanan. Biasa: -.
- **menjelaskan** — sopan: menjelaskan alergi, menjelaskan kenapa tidak makan sesuatu. Biasa: -.
- **sopan** — sopan: ke pelayan restoran, ke orang yang baru dikenal saat makan bersama. Biasa: -.
- **biasa** — sopan: ke keluarga di meja makan, ke teman. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 57 kalimat, 57 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `makan_tanya_rekomendasi` | すみません 初めて なので おすすめ を 教えて いただけます | か |
| 2 | `makan_tanya_tanpa_daging` | 肉 が 食べられない ので 使っていない 料理 は あります | か |
| 3 | `makan_pesan_satu` | を 一つ | お願いします |
| 4 | `makan_tanya_isi` | アレルギー が ある ので に 何 が 入っている か 教えて いただけます | か |
| 5 | `makan_sebut_alergi` | えび の アレルギー が ある の です が 大丈夫 | でしょうか |
| 6 | `makan_tanya_porsi_kecil` | 量 が 多い ので 少なめ に できません | か |
| 7 | `makan_minta_tidak_pedas` | 辛い もの が 苦手 なので 辛さ を 控えめ に して いただけます | か |
| 8 | `makan_minta_air` | すみません お水 を いただけます | か |
| 9 | `makan_minta_bungkus` | 食べきれなかった ので 持ち帰り に できます | か |
| 10 | `makan_minta_struk` | 経費 で 落とす ので レシート を いただけます | か |
| 11 | `makan_ubah_pesanan` | 注文 を 変えたい の です が から でも 大丈夫 です | か |
| 12 | `makan_batal_pesanan` | さっき の 注文 は 来ていない ので キャンセル できます | か |
| 13 | `makan_tanya_penutup` | 食事 の あとで デザート を 食べたい ので 何 が ある か 教えて いただけます | か |
| 14 | `makan_tanya_minuman` | お酒 が 飲めない ので 飲み物 は 何 が おすすめ です | か |
| 15 | `makan_tanya_lama` | このあと 予定 が ある ので どのくらい で 出てくる か 教えて いただけます | か |
| 16 | `makan_minta_alat` | フォーク を 一つ いただけます | か |
| 17 | `makan_puji_masakan` | 思っていた より おいしい ので 来たい と | 思います |
| 18 | `makan_komplain_asin` | 味 が 濃い ので 薄く して いただけます | か |
| 19 | `makan_minta_tagihan` | 帰りたい ので お会計 を お願いできます | か |
| 20 | `makan_tanya_rokok` | 子ども も 一緒 なので 禁煙 の 席 は あります | か |
| 21 | `makan_minta_tempat_tenang` | 静か に 話したい ので 奥 の 席 に して いただけます | か |
| 22 | `makan_ajak_tempat_baru` | 駅 の 前に 新しい 店 が できた ので 今度 一緒に 行きません | か |
| 23 | `makan_terima_ajakan` | 店 は 行った こと が ない ので ぜひ 行きたい | です |
| 24 | `makan_tolak_sudah_makan` | さっき 食べた ばかり なので 今回 は 遠慮して | おきます |
| 25 | `makan_tolak_ajakan_diet` | は 甘い もの を 控えている ので お茶 だけ に | します |
| 26 | `makan_tawar_bayar` | 前回 おごって もらった ので は が | 払います |
| 27 | `makan_bagi_tagihan` | 細かい の が ない ので まとめて 払って あとで 割り勘 に しません | か |
| 28 | `makan_tawarkan_makanan` | お土産 で いただいた ので よかったら 一つ | いかがですか |
| 29 | `makan_tolak_tawaran` | ちょうど お腹 が 空いていない ので 気持ち だけ | いただきます |
| 30 | `makan_terima_tawaran` | ちょうど お腹 が 空いて いた から ありがとう もらう | ね |
| 31 | `makan_bandingkan_harga` | 値段 は 前 の 店 と 同じ な のに は 量 が 多い | です |
| 32 | `makan_cerita_kemarin` | 駅前 で 食べた の です が 思っていた より おいしかった | です |
| 33 | `makan_cerita_tempat` | 友達 に 連れて行って もらった 店 が 安い のに おいしかった | です |
| 34 | `makan_komplain_pedas` | は 思った より 辛い ので 食べる の に 時間 が | かかります |
| 35 | `makan_kenyang` | お腹 が 一杯 で 動けない から | 休ませて |
| 36 | `makan_panggil_makan` | ご飯 が できた から 冷めない うちに | 来て |
| 37 | `makan_tanya_jam_makan` | は 遅くなる けど 先に 食べていて いい | よ |
| 38 | `makan_sebut_masakan` | 作った 残り だ から 味 は 保証しない | よ |
| 39 | `makan_tanya_mau_makan` | 冷蔵庫 に 残り が ある けど 何 が | 食べたい |
| 40 | `makan_puji_masakan_ibu` | 味 は 自分 では 出せない から | 作って |
| 41 | `makan_minta_resep` | 家 でも 作って みたい ので 作り方 を 教えて いただけます | か |
| 42 | `makan_tolak_tambah` | お腹 が 一杯 だ から ご飯 は 残して おく | ね |
| 43 | `makan_diet` | 最近 太って きた から 夜 は 軽く して | おく |
| 44 | `makan_tidak_makan_daging` | 肉 は 体 に 合わない から 魚 に して | おく |
| 45 | `makan_bawa_bekal` | 節約して いる ので 昼 は 弁当 を 持って きて | います |
| 46 | `makan_sisa_makanan` | 食べる から 残った 分 は 冷蔵庫 に 入れて | おいて |
| 47 | `makan_makan_di_luar` | は 作る の が 面倒 だ から 外 で 食べて | くる |
| 48 | `makan_sarapan` | 時間 が なかった から 朝ご飯 は パン だけ | だった |
| 49 | `makan_itadakimasu` | じゃあ | いただきまーす |
| 50 | `makan_gochisousama` | ごちそうさま | おいしかった |
| 51 | `makan_tanya_porsi_berdua` | は 二人 で 分けられる 量 です | か |
| 52 | `makan_tanya_menu_hari_ini` | 日替わり が ある と 聞いた ので の 分 を 教えて いただけます | か |
| 53 | `makan_berbagi_meja` | 二人 では 食べきれない ので 分けた ほう が いい です | ね |
| 54 | `makan_minta_tambah` | ご飯 が 足りなかった ので おかわり を いただけます | か |
| 55 | `makan_ajak_makan_akrab` | お腹 空いた から 何か | 食べない |
| 56 | `makan_tanya_pendapat_rasa` | 味 は どう しょっぱすぎる と | 思わない |
| 57 | `makan_tanya_menu_tidak_ada` | 料理 を 探して いる の です が こちら では 出していない の でしょう | か |

Kuota terpenuhi: 57 dari 57. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: pelayan 25, keluarga 14, teman 12, rekan kerja 5, pasangan 1. Bentuk
sopan 40, biasa 17. Panjang 50, pendek 7.

Dua meja ditulis terpisah karena bahasanya memang dua: di restoran pembaca adalah pelanggan yang
berbicara ke petugas, jadi hampir semuanya sopan; di rumah lawannya keluarga, jadi hampir
semuanya biasa. Deck yang hanya mengajarkan satu di antaranya mengajarkan separuh dari apa yang
terdengar saat orang makan.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| meminta tambah nasi | `makan_minta_tambah` |
| mengajak makan dengan bentuk akrab | `makan_ajak_makan_akrab` |
| menanyakan pendapat orang lain soal rasanya | `makan_tanya_pendapat_rasa` |
| menu yang dicari dan tidak ada di daftar | `makan_tanya_menu_tidak_ada` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Bukti pencarian |
|---|---|
| memesan tempat makan lebih dulu | tidak ada kalimat yang memuat `予約` |
| sarapan di hotel atau penginapan | tidak ada kalimat yang memuat `朝食` |
| antre menunggu meja di restoran | tidak ada kalimat yang memuat `待ち` atau `行列` |
| layanan dan biaya tambahan di restoran | tidak ada kalimat yang memuat `サービス` dalam arti ini |

Kuota naik dari 53 menjadi 57 karena pemeriksaan ini menemukan empat keadaan yang nyata dan berbeda,
semuanya dari daftar celah yang sudah tercatat sejak topik ini ditulis.

Kalau topik ini dibuka lagi, empat baris itu yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.
## Sisa yang harus ditulis

57 kalimat. Kuota 57 sudah penuh.
