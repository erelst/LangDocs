<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `santai`

| | |
|---|---|
| Judul | Santai di luar |
| Kuota | 18 |
| Sudah ditulis | 18 |
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

Dihitung dengan cara yang sama seperti `check.js`. 18 kalimat, 18 kerangka, tidak ada yang sama.

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

Kuota terpenuhi: 18 dari 18. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: teman 14, petugas tempat 3, rekan 1. Bentuk sopan 13, biasa 5.
Panjang 16, pendek 2.

Topik ini terbelah menurut kedekatan orangnya, bukan menurut kegiatannya, dan itu yang membuatnya
berbeda dari `rumah_santai`: ajakan yang sama muncul dalam dua bentuk. Ke rekan yang belum akrab
memakai `もしご都合がよければ` dan `一度`, ke teman dekat cukup `行かない？`. Lima kalimat biasa
semuanya ke teman dekat.

Celah yang masih terbuka saat kuota penuh, diperiksa dengan mencari kata kuncinya di berkas ini,
bukan dari ingatan:

| Celah | Bukti pencarian |
|---|---|
| karaoke dan tempat yang berisik tapi disengaja | tidak ada kalimat yang memuat `カラオケ` |
| menonton olahraga bersama | tidak ada kalimat yang memuat `野球` atau `サッカー` |
| konser dan acara musik langsung | `映画` dan `本` ada, `コンサート` dan `ライブ` belum |
| liburan panjang dan menyusun rencananya | tidak ada kalimat yang memuat `連休` |
| acara yang dibatalkan karena hujan | tidak ada kalimat yang memuat `延期` atau `中止` |
| menanyakan jam tutup, bukan jam buka | `開いて` ada, `閉まる` belum |
| bermain musik bersama | tidak ada kalimat yang memuat `バンド` |

Kalau topik ini dibuka lagi, tujuh baris itu yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.
## Sisa yang harus ditulis

0 kalimat. Kuota 18 sudah penuh.
