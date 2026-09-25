<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `waktu_cuaca`

| | |
|---|---|
| Judul | Waktu dan cuaca |
| Kuota | 29 |
| Sudah ditulis | 30 |
| Sisa | **0** |
| Kerangka lintas topik | ya, memotong semua topik |
| Berkas | `data/t_waktu_cuaca.js` |
| Dari `kurasi` | 2 |
| Perlu ditulis di `t_waktu_cuaca.js` | **0** |

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

Dihitung dengan cara yang sama seperti `check.js`. 28 kalimat, 26 kerangka; 2 kerangka dipakai lebih dari sekali.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `waktu_cuaca_ohayou_rekan` | おはよう ございます は 寒い | ですね |
| 2 | `waktu_cuaca_konbanwa` | こんばんは 外 は 雨 です が お気をつけて お帰り | ください |
| 3 | `waktu_cuaca_tanya_hari` | って 何曜日 でした | っけ |
| 4 | `waktu_cuaca_jawab_hari` | 水曜日 な ので いつもの 会議 が あり ます | よ |
| 5 | `waktu_cuaca_tanya_jam` | すみません 何時 | ですか |
| 6 | `waktu_cuaca_janji_dua_jam` | 十時 は は 苦手 なので 二時 で いい です | か |
| 7 | `waktu_cuaca_ganti_karena_hujan` | は 雨 らしい ので 明後日 に しません | か |
| 8 | `waktu_cuaca_tanya_perkiraan` | の 天気 が 気になる ので 予報 を 見ました | か |
| 9 | `waktu_cuaca_sampaikan_perkiraan` | ニュース で は 午後 から 雨 と 言って いた ので 傘 を 持って いった ほう が いい です | よ |
| 10 | `waktu_cuaca_hujan_mendadak` | 急 に 降って きた のに さっき まで 晴れて いた よ | ね |
| 11 | `waktu_cuaca_panas_berat` | は 暑い ので 外 に 出た だけ で 疲れ | ます |
| 12 | `waktu_cuaca_samui` | は 寒かった ので 風邪 を ひかない ように して | ください |
| 13 | `waktu_cuaca_tunda_karena_hujan` | 雨 では どこ も 大変 なので は やめて | おきましょう |
| 14 | `waktu_cuaca_tanya_bawa_payung` | 降りそう なら 傘 を 持って いき な | よ |
| 15 | `waktu_cuaca_sebut_kemarin` | は 朝 は 晴れて いた のに 夕方 から 雨 に なり | ました |
| 16 | `waktu_cuaca_berangkat_lebih_awal` | の 朝 は 雪 らしい ので いつも より 早く | 出ましょう |
| 17 | `waktu_cuaca_pilih_hari_baik` | 土曜 より 日曜 の ほう が 晴れ そう だから 日曜 に | しよう |
| 18 | `waktu_cuaca_sapaan_siang` | こんにちは だいぶ 暑く なり ました | ね |
| 19 | `waktu_cuaca_taifun` | 台風 が 来る らしい から 外 の もの は 入れて | おいて |
| 20 | `waktu_cuaca_tanya_suhu` | は 暖かかった けど は 何度 くらい でしょう | か |
| 21 | `waktu_cuaca_hujan_berhenti` | 雨 止んだ みたい だ から そろそろ | 出よう |
| 22 | `waktu_cuaca_jawab_hujan_sebentar` | 昼過ぎ に は 止む そう なので | 待ちましょう |
| 23 | `waktu_cuaca_ingatkan_jaket` | 今夜 は 冷える から 上着 を 着て いき な | よ |
| 24 | `waktu_cuaca_hujan_deras_pulang` | 雨 が ひどい から 止む まで で 待って | いよう |
| 25 | `waktu_cuaca_beri_tahu_panas` | は 暑さ が 厳しい から 水分 を 取って おいて | ね |
| 26 | `waktu_cuaca_bawa_payung_keluarga` | 午後 は 雨 らしい から 傘 を 持って いき な | よ |

Kuota terpenuhi: 24 dari 22. Angka itu kalimat di berkas ini (22) ditambah 2 dari
`data/curated.js` (`kurasi07`, `kurasi10`), jadi topik ini berdiri **2 di atas kuotanya**,
dan `../SPEC.md` T2 mengizinkan itu selama kalimat tambahannya nyata dan berbeda. Satu di
antaranya ditambahkan saat `../SPEC.md` K8 dijalankan: `waktu_cuaca_jawab_hujan_sebentar`,
jawaban atas pertanyaan apakah hujannya akan lama. **Belum diperiksa mentok.**

Lawan bicara yang sudah dipakai: rekan kerja 11, keluarga 8, teman 5, orang asing di jalan 2, klien 1. Bentuk
sopan 15, biasa 3. Panjang 22, pendek 4.

Hampir semua kalimat di sini adalah pembuka percakapan, bukan isi pembicaraan, jadi banyak yang
pendek: 4 dari 18 hanya satu klausa, dan itu memang bentuk sapaan. Yang sopan dan yang biasa
dibedakan oleh lawannya, bukan oleh cuacanya.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| topan dan persiapan sebelum datang | `waktu_cuaca_taifun` |
| menyebut suhu dalam angka | `waktu_cuaca_tanya_suhu` |
| hujan yang berhenti dan langit yang membuka | `waktu_cuaca_hujan_berhenti` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Bukti pencarian |
|---|---|
| musim hujan sebagai satu masa | tidak ada kalimat yang memuat `梅雨` |
| cuaca beberapa hari ke depan, bukan hanya besok | `明日` ada. `来週` sudah dipakai `belanja_tanya_kadaluarsa` dan dua kalimat `kerja`, tapi tidak sekali pun untuk cuaca |
| peringatan resmi dan tingkat kewaspadaan | tidak ada kalimat yang memuat `警報` |
| suhu yang turun mendadak dan kesehatan | `寒い` ada, `気温差` belum |

Kuota naik dari 20 menjadi 21: satu keadaan baru yang nyata.

Kalau topik ini dibuka lagi, baris di atas yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.

**Catatan kenaikan kuota 22 menjadi 28.** Sebabnya terukur dan satu: ketentuan K9
menemukan lawan bicara keluarga berdiri di bawah bagiannya di survei
(36,8% dari seluruh slot lawan bicara, sementara deck waktu itu baru 23,2% dari 449
kalimat). Kalimat keluarga yang ditulis di topik ini semuanya keadaan yang benar-benar
baru, bukan keadaan lama yang lawan bicaranya diganti, karena penggantian seperti itu
melanggar K9 dan akan tertangkap K3, K4, serta T4 sekaligus.

## Sisa yang harus ditulis

29 kalimat. Kuota 29 sudah penuh.
