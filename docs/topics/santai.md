<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `santai`

| | |
|---|---|
| Judul | Santai di luar |
| Kuota | 33 |
| Sudah ditulis | 33 |
| Sisa | **0** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_santai.js` |

Kuota dihitung di `../README.md` dari sel: 公共商業施設×レジャー活動 3,18% + それ以外の屋内×レジャー活動 0,37% + 公共商業施設×付き合い 0,99% + 自宅×付き合い 0,71% + 職場・学校×付き合い 0,27% + それ以外の屋内×付き合い 0,29% + 交通機関×付き合い 0,02%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | publik 22%, teman 18%, keluarga 11%, guru 5% |
| Bentuk | 雑談 58,2%, 用談・相談 34,9%, 授業・レッスン 5,9% |
| Jumlah lawan | satu lawan bicara 51%, sisanya berkelompok |

## Batas topik

**Termasuk:**

- mengajak keluar dan merinci acaranya
- memilih tempat bersama dan menyesuaikan selera
- menceritakan hobi dan menanyakan hobi orang lain
- berolahraga: mengajak, menolak, mengeluh capek
- menonton, mendengarkan, membaca: bertukar pendapat tentang isinya
- memesan tempat, menanyakan jam buka, menanyakan tarif
- mengajak orang yang belum akrab supaya tidak terasa memaksa
- menutup acara: berterima kasih, mengantar pulang

**Tidak termasuk:**

- berjalan tanpa tujuan dan berpapasan di jalan, masuk ke `jalan`
- bersantai di rumah, masuk ke `rumah_santai`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya hobi, tanya rencana akhir pekan, tanya tarif dan jam. Biasa: -.
- **menjawab** — sopan: menjawab ajakan, menjawab pendapat tentang yang ditonton. Biasa: -.
- **mengajak** — sopan: mengajak keluar, mengajak mencoba, mengajak orang yang belum akrab. Biasa: -.
- **menerima** — sopan: menerima ajakan, menerima pilihan tempat orang lain. Biasa: -.
- **menolak halus** — sopan: menolak ajakan karena sibuk atau tidak cocok. Biasa: -.
- **rencana** — sopan: menyusun acara akhir pekan, memilih tempat, menentukan jam. Biasa: -.
- **lampau** — sopan: menceritakan acara yang sudah dijalani, menceritakan yang berkesan. Biasa: -.
- **minta tolong** — sopan: meminta ditemani, meminta diantar. Biasa: -.
- **menjelaskan** — sopan: menjelaskan kenapa tidak bisa ikut, menjelaskan apa yang disukai. Biasa: -.
- **sopan** — sopan: ke orang yang belum akrab, ke petugas tempat. Biasa: -.
- **biasa** — sopan: ke teman dekat. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 29 kalimat, 29 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `santai_ajak_keluar` | 今週 の 週末 空いてる けど どっか | 行かない |
| 2 | `santai_ajak_orang_baru` | もし ご都合 が よければ 一度 ご一緒 できれば と 思って | います |
| 3 | `santai_ajak_nonton` | 映画 評判 が いい らしい から 一緒 に | 行かない |
| 4 | `santai_tanya_hobi` | お休み の 日 は 普段 何 を されて いる ん | ですか |
| 5 | `santai_jawab_hobi` | 近所 を 歩く の が 好き で だけ で 十分 なん | です |
| 6 | `santai_cocokkan_selera` | は どこ でも いい けど 騒がしい の は 苦手 だった | よね |
| 7 | `santai_tanya_jam_buka` | 何時 から 開いて いる か 教えて いただけます | か |
| 8 | `santai_tanya_tarif` | 二人 だと 全部 で いくら に なり ます | か |
| 9 | `santai_pesan_tempat` | 四人 で 予約 したい の です が 土曜 は 空いて います | か |
| 10 | `santai_tolak_sibuk` | 日 は 予定 が 入って いて 残念 です が | 行けません |
| 11 | `santai_tolak_tidak_cocok` | が 多い ところ が 苦手 なので 今度 お願い | します |
| 12 | `santai_ajak_olahraga` | 最近 運動不足 だから 朝 一緒 に | 走らない |
| 13 | `santai_terima_ajakan` | 日 は ちょうど 空いてる から | 行こう |
| 14 | `santai_cerita_berkesan` | 静か だった 朝 です が 一番 心 に | 残りました |
| 15 | `santai_pendapat_tontonan` | によって 違う けど は 最後 が よかった と | 思います |
| 16 | `santai_baca_buku` | 本 読み終わった ので よかったら 貸します | よ |
| 17 | `santai_antar_pulang` | 遅く なった ので 家 の 近く まで 送ります | よ |
| 18 | `santai_ajak_belajar_bareng` | 一人 だと 進まない ので 一緒 に 勉強 する の は どう でしょう | か |
| 19 | `santai_tutup_acara` | は ありがとう 久しぶり だった ので よかった | です |
| 20 | `santai_serahkan_pilihan` | 辺 は あまり 詳しく ない ので 選んで もらえる と | 助かります |
| 21 | `santai_ajak_karaoke` | ご飯 の あと で カラオケ でも | 行かない |
| 22 | `santai_batal_karena_hujan` | 雨 で は 難しそう なので は やめ に しません | か |
| 23 | `santai_nonton_olahraga_keluarga` | 今夜 試合 が ある から 家 で 一緒 に | 見よう |
| 24 | `santai_konser_keluarga` | 久しぶり だ から 来月 コンサート に でも | 行かない |
| 25 | `santai_foto_keluarga` | みんな が 揃って いる うち に 帰る 前 に 写真 を | 撮ろう |
| 26 | `santai_liburan_panjang` | 連休 が 近い から の うち に 予定 を 決めて | おこう |
| 27 | `santai_jalan_pagi_keluarga` | 空気 が きれい な うち に | 歩こう |
| 28 | `santai_acara_televisi_keluarga` | いつも 見て いる 番組 が 始まる から 場所 を 空けて | おいて |
| 29 | `santai_baca_bareng` | 今夜 は 話さ なくて いい から 隣 で 本 を 読んで | いよう |

Kuota terpenuhi: 22 dari 22. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: teman 21, keluarga 7, petugas toko 4, rekan kerja 1. Bentuk sopan 16, biasa 13.
Panjang 27, pendek 2.

Topik ini terbelah menurut kedekatan orangnya, bukan menurut kegiatannya, dan itu yang membuatnya
berbeda dari `rumah_santai`: ajakan yang sama muncul dalam dua bentuk. Ke rekan yang belum akrab
memakai `もしご都合がよければ` dan `一度`, ke teman dekat cukup `行かない？`. Lima kalimat biasa
semuanya ke teman dekat.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| slot "menerima pilihan orang lain" dijanjikan di ruang ucapan tapi tidak ada satu pun | `santai_serahkan_pilihan` |
| slot "menutup acara: berterima kasih" dijanjikan tapi tidak ada | `santai_tutup_acara` |
| karaoke, kegiatan berisik yang justru disengaja | `santai_ajak_karaoke` |
| acara yang dibatalkan karena hujan | `santai_batal_karena_hujan` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Bukti pencarian |
|---|---|
| menonton olahraga bersama | tidak ada kalimat yang memuat `野球` atau `サッカー` |
| konser dan acara musik langsung | `映画` ada, `コンサート` dan `ライブ` belum |
| liburan panjang dan menyusun rencananya | tidak ada kalimat yang memuat `連休` |
| menanyakan jam tutup, bukan jam buka | `開いて` ada, `閉まる` belum |
| bermain musik bersama | tidak ada kalimat yang memuat `バンド` |
| berfoto bersama sebagai penutup | tidak ada kalimat yang memuat `写真` |

Kuota naik dari 18 menjadi 22 karena pemeriksaan ini menemukan empat keadaan yang nyata dan berbeda,
dua di antaranya slot yang dijanjikan bagian ruang ucapan di atas dan tidak pernah diisi.

Kalau topik ini dibuka lagi, tujuh baris itu yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.

**Catatan kenaikan kuota 22 menjadi 29.** Sebabnya terukur dan satu: ketentuan K9
menemukan lawan bicara keluarga berdiri di bawah bagiannya di survei
(36,8% dari seluruh slot lawan bicara, sementara deck waktu itu baru 23,2% dari 449
kalimat). Kalimat keluarga yang ditulis di topik ini semuanya keadaan yang benar-benar
baru, bukan keadaan lama yang lawan bicaranya diganti, karena penggantian seperti itu
melanggar K9 dan akan tertangkap K3, K4, serta T4 sekaligus.

## Sisa yang harus ditulis

33 kalimat. Kuota 33 sudah penuh.
