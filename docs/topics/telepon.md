<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `telepon`

| | |
|---|---|
| Judul | Telepon |
| Kuota | 41 |
| Sudah ditulis | 43 |
| Sisa | **0** |
| Kerangka lintas topik | ya, memotong semua topik |
| Berkas | `data/t_telepon.js` |

Kuota dihitung di `../README.md` dari sel: 遠隔通信 9,75% dari seluruh percakapan, memotong semua topik.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | bervariasi menurut topik asalnya |
| Bentuk | bervariasi menurut topik asalnya |
| Jumlah lawan | satu lawan bicara, tidak terlihat |

## Batas topik

**Termasuk:**

- membuka telepon: menyebut diri, menanyakan apakah waktunya tepat
- meminta bicara dengan orang lain, dan menyampaikan bahwa orangnya tidak ada
- meninggalkan pesan, meminta pesan diteruskan
- tidak terdengar, minta diulang, menelepon ulang
- salah sambung dan menutupnya dengan sopan
- menutup telepon: meringkas, memastikan, mengucapkan terima kasih
- menjelaskan bahwa sedang dalam perjalanan, memberi tahu akan terlambat
- menelepon kembali orang yang tadi tidak terjawab

**Tidak termasuk:**

- isi pembicaraannya sendiri, yang tetap mengikuti topik asalnya
- surat dan berkas tertulis

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya apakah waktunya tepat, tanya orangnya ada. Biasa: -.
- **menjawab** — sopan: menjawab panggilan, menjawab bahwa orangnya sedang keluar. Biasa: -.
- **mengajak** — sopan: mengajak menelepon ulang nanti. Biasa: -.
- **menerima** — sopan: menerima pesan, menerima penjelasan. Biasa: -.
- **menolak halus** — sopan: menolak menjawab sekarang, menolak menunggu. Biasa: -.
- **rencana** — sopan: menyepakati waktu menelepon lagi. Biasa: -.
- **lampau** — sopan: memberi tahu sudah menelepon tadi, menceritakan panggilan yang terlewat. Biasa: -.
- **minta tolong** — sopan: minta disambungkan, minta pesan diteruskan. Biasa: -.
- **menjelaskan** — sopan: menjelaskan siapa yang menelepon, menjelaskan kenapa menelepon. Biasa: -.
- **sopan** — sopan: ke kantor, ke orang yang belum dikenal. Biasa: -.
- **biasa** — sopan: ke keluarga dan teman. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 41 kalimat, 41 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `telepon_sebut_diri` | お世話になって おります 営業 の 鈴木 と | 申します |
| 2 | `telepon_tanya_waktu_tepat` | お忙しい ところ すみません が お話し しても よろしい | でしょうか |
| 3 | `telepon_sambung_ke_bagian` | 恐れ入ります が 配送 の 担当 の 方 に お繋ぎ いただけます | か |
| 4 | `telepon_minta_orang_tertentu` | すみません 田中 さん は いらっしゃいます | か |
| 5 | `telepon_orang_keluar` | あいにく 田中 は 外出 して おります ので ご伝言 が あれば | 承ります |
| 6 | `telepon_tinggalkan_pesan` | では の 午前 に 電話 する と お伝え | ください |
| 7 | `telepon_minta_ulang_suara` | 恐れ入ります が お声 が 遠い ので もう一度 お願いできます | か |
| 8 | `telepon_kabur_suara` | 声 が 切れて いる ので 電波 の いい 場所 に 移ります | ね |
| 9 | `telepon_minta_ditelepon_ulang` | 電波 が 悪い ようなので 切れ たら こちら から かけ直します | ね |
| 10 | `telepon_telepon_ulang` | は 手 が 離せない ので あとで | 折り返します |
| 11 | `telepon_salah_sambung` | 申し訳ありません 番号 を | 間違えました |
| 12 | `telepon_bukan_orangnya` | こちら は 違います ので お間違い ではない | でしょうか |
| 13 | `telepon_tutup_ringkas` | では まとめます と 書類 を 送る という こと | で |
| 14 | `telepon_ucap_terima_kasih` | お時間 を いただき ありがとう | ございました |
| 15 | `telepon_tanya_bisa_sekarang` | お見積もり の こと で お話し したい の です が お時間 あります | でしょうか |
| 16 | `telepon_janji_telepon_lagi` | 夕方 に こちら から お電話 します ので ころ で よろしい | でしょうか |
| 17 | `telepon_kantor_rumah` | 仕事 が 終わらない ので 帰り が 遅く なり | ます |
| 18 | `telepon_telat_jemput` | 道 が 混んでいる ので 迎え に 十分 ほど | 遅れます |
| 19 | `telepon_dalam_perjalanan` | 電車 の 中 なので 九時 ごろ に 着く と | 思います |
| 20 | `telepon_tanya_nomor` | 念のため お電話番号 を 伺っても よろしい | でしょうか |
| 21 | `telepon_konfirmasi_janji` | 念のため 確認 です が 先日 お約束 した 金曜 の 三時 で よろしい | でしょうか |
| 22 | `telepon_putus_di_tengah` | さっき は 途中 で 切れて しまった ので | かけ直しました |
| 23 | `telepon_tanya_sudah_dengar` | 電波 が 悪い かもしれない ので 聞こえにくかったら 言って | ください |
| 24 | `telepon_telat_angkat` | 先ほど お電話 を いただいた よう なので | かけ直しました |
| 25 | `telepon_pesan_dari_istri` | お母さん から 電話 が あって あとで かける とのこと | でした |
| 26 | `telepon_salah_rumah` | こちら は 鈴木 の 家 です が どちら に おかけ | ですか |
| 27 | `telepon_baterai_habis` | 電池 が 少ない ので 切れたら かけます | ね |
| 28 | `telepon_tanya_boleh_datang` | 中 に 可能 でしたら 一度 お伺い したい の です | が |
| 29 | `telepon_ringkas_sebelum_tutup` | つまり 内容 で 進めれば いい と いう こと | でしょうか |
| 30 | `telepon_ajak_telepon_nanti` | バタバタ してる から 夜 に | かけて |
| 31 | `telepon_ini_nomor_baru` | 新しく した 番号 だから 登録して | おいて |
| 32 | `telepon_terima_kasih_ringkas` | はい ありがとう | ございました |
| 33 | `telepon_nomor_salah_orang` | 申し訳ありません が 者 は こちら に | おりません |
| 34 | `telepon_nomor_internal` | そちら の ご担当 に お繋ぎ いただきたい ので 内線 番号 を 教えて いただけます | か |
| 35 | `telepon_meninggalkan_voicemail` | 留守番電話 でした ので 伝言 を | 残します |
| 36 | `telepon_ditunggu_di_telepon` | ただいま お繋ぎ します ので 少々 お待ち | ください |
| 37 | `telepon_orangnya_kembali` | 担当 が 戻り ました ので こちらの 電話 に お繋ぎ | します |
| 38 | `telepon_nomor_tidak_nyambung` | 何度 かけても 繋がらない ので 番号 が 違う かも | しれません |
| 39 | `telepon_keluarga_minta_diantar` | 雨 が 強く なって きた から 迎え に 来て | くれる |
| 40 | `telepon_keluarga_kabar_singkat` | 何も ない けど 無事 に 着いた から 電話 した | だけ |
| 41 | `telepon_kerabat_tanya_kabar` | 夜分 に すみません 久しぶり に 声 が 聞きたく なった ので 電話 | しました |

Kuota terpenuhi: 38 dari 38. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: atasan 12, rekan kerja 9, klien 8, keluarga 6, orang asing di jalan 4, teman 2.
Bentuk sopan 37, biasa 4. Panjang 35, pendek 6.

31 dari 33 sopan, dan alasannya khas topik ini: yang mengangkat telepon sering bukan orang yang
dituju, jadi bahkan menelepon teman dimulai lewat orang yang belum dikenal. Dua yang biasa
keduanya ke teman, tempat tidak ada perantara.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| nomor sambungan internal | `telepon_nomor_internal` |
| mesin pesan suara | `telepon_meninggalkan_voicemail` |
| dipersilakan menunggu di telepon | `telepon_ditunggu_di_telepon` |
| memberi tahu orangnya sudah kembali | `telepon_orangnya_kembali` |
| nomor yang tidak bisa dihubungi | `telepon_nomor_tidak_nyambung` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Artinya |
|---|---|
| nomor yang salah sambung dari pihak lain | `違います` ada satu, dari pihak yang menelepon; arah sebaliknya belum |
| telepon ke ponsel dan telepon ke rumah sebagai dua hal berbeda | tidak ada kalimat yang memuat `携帯` |
| suara otomatis dan menu tekan angka | tidak ada kalimat yang memuat `自動音声` |
| meminta waktu bicara lebih lama | tidak ada kalimat yang memuat `もう少し` dalam arti ini |
| memberi tahu ada tamu di tengah telepon | tidak ada kalimat yang memuat `来客` |

Kuota naik dari 33 menjadi 38 karena pemeriksaan ini menemukan lima keadaan yang nyata dan berbeda,
semuanya dari daftar celah yang sudah tercatat sejak topik ini ditulis.

Kalau topik ini dibuka lagi, lima baris itu yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.

**Catatan kenaikan kuota 38 menjadi 41.** Sebabnya terukur dan satu: ketentuan K9
menemukan lawan bicara keluarga berdiri di bawah bagiannya di survei
(36,8% dari seluruh slot lawan bicara, sementara deck waktu itu baru 23,2% dari 449
kalimat). Kalimat keluarga yang ditulis di topik ini semuanya keadaan yang benar-benar
baru, bukan keadaan lama yang lawan bicaranya diganti, karena penggantian seperti itu
melanggar K9 dan akan tertangkap K3, K4, serta T4 sekaligus.

## Sisa yang harus ditulis

41 kalimat. Kuota 41 sudah penuh.
