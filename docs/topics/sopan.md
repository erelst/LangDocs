<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `sopan`

| | |
|---|---|
| Judul | Sopan dan reaksi |
| Kuota | 37 |
| Sudah ditulis | 41 |
| Sisa | **0** |
| Kerangka lintas topik | ya, memotong semua topik |
| Berkas | `data/t_sopan.js` |
| Dari `kurasi` | 4 |
| Perlu ditulis di `t_sopan.js` | **0** (28 sudah ditulis) |

`data/curated.js` sudah menyumbang 4 kalimat: `kurasi01` (sapaan sekaligus pembuka), `kurasi02` (meminta tunggu), `kurasi05` (menyetujui), `kurasi09` (menawarkan bantuan). `kurasi07` dan `kurasi10` dihitung di `waktu_cuaca`, tidak di sini, supaya tidak dihitung dua kali.

Kuota dihitung di `../README.md` dari sel: 感動詞 10,52% dari seluruh token, dan partikel akhir kalimat 163.670 kali dalam 2.419.171 kata.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | bervariasi; yang menentukan hanya tingkat keakraban |
| Bentuk | keduanya, dan justru pasangan sopan/biasa inilah isinya |
| Jumlah lawan | satu atau lebih, tidak menentukan |

## Batas topik

**Termasuk:**

- menyetujui dan menyetujui dengan ragu
- terkejut, tidak percaya, dan menanggapinya
- meminta diulang karena tidak terdengar atau tidak dimengerti
- menyela pembicaraan dengan halus dan mengambil alih giliran bicara
- menutup pembicaraan tanpa memutusnya
- memuji, dan menanggapi pujian tanpa terdengar sombong
- meminta maaf untuk hal kecil, dan menanggapi permintaan maaf
- menyampaikan bahwa tidak nyaman, tanpa menyalahkan
- mengucapkan terima kasih, dan menanggapinya
- meminta waktu untuk berpikir sebelum menjawab

**Tidak termasuk:**

- sapaan berdasarkan waktu hari, masuk ke `waktu_cuaca`
- isi percakapan yang sedang berlangsung, yang tetap mengikuti topik asalnya

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: menanyakan ulang dengan halus, menanyakan apakah benar. Biasa: -.
- **menjawab** — sopan: menjawab panggilan, menjawab pujian, menjawab permintaan maaf. Biasa: -.
- **mengajak** — sopan: mengajak melanjutkan pembicaraan, mengajak berhenti dulu. Biasa: -.
- **menerima** — sopan: menerima pendapat, menerima koreksi, menerima pujian. Biasa: -.
- **menolak halus** — sopan: menolak pendapat, menolak permintaan, menolak tanpa kata "tidak". Biasa: -.
- **rencana** — sopan: menyepakati giliran bicara, menunda pembicaraan. Biasa: -.
- **lampau** — sopan: menanggapi cerita orang lain, menanggapi kabar yang baru didengar. Biasa: -.
- **minta tolong** — sopan: meminta diulang, meminta dijelaskan lagi, meminta waktu. Biasa: -.
- **menjelaskan** — sopan: menjelaskan bahwa tidak terdengar, menjelaskan bahwa belum paham. Biasa: -.
- **sopan** — sopan: ke atasan, ke orang yang baru dikenal, ke petugas. Biasa: -.
- **biasa** — sopan: ke teman dekat, ke keluarga. Biasa: -.

Topik ini sumbunya adalah tingkat keakraban itu sendiri, jadi kolom sopan dan biasa bukan dua kolom terpisah di sini melainkan isi topiknya: tiap baris di atas harus ada dalam kedua bentuk.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 32 kalimat, 28 kerangka; 4 kerangka dipakai lebih dari sekali.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `sopan_setuju_sopan` | も そう 思います ので で | 進めましょう |
| 2 | `sopan_setuju_biasa` | うん そう だ よね で いい と 思う | よ |
| 3 | `sopan_setuju_ragu` | 賛成 です が ただ ひとつ 気 に なる の は 費用 | です |
| 4 | `sopan_terkejut` | え 本当 に 引っ越す | の |
| 5 | `sopan_terkejut_sopan` | ああ それは 存じませんでした ので | 驚きました |
| 6 | `sopan_tidak_percaya` | ありえない よ どこ で 聞いた | の |
| 7 | `sopan_ragu_menanggapi` | と して は 早い かもしれない と | 思います |
| 8 | `sopan_minta_diulang` | すみません よく 聞き取れませんでした ので もう一度 お願いできます | か |
| 9 | `sopan_minta_diulang_biasa` | え 何て 聞こえなかった | の |
| 10 | `sopan_belum_paham` | よく 分からない ので たとえば どんな 場合 か 教えて いただけます | か |
| 11 | `sopan_menyela_halus` | お話 の 途中 で 恐れ入ります が ひとつ だけ 付け加えて も いい | でしょうか |
| 12 | `sopan_ambil_giliran` | で は 今度 は から お話し させて | いただきます |
| 13 | `sopan_tutup_pembicaraan` | 辺 で まとめ たい ので 続き は 改めて お願い | します |
| 14 | `sopan_memuji_karya` | 説明 が 分かりやすかった ので 勉強 に | なりました |
| 15 | `sopan_tanggapi_pujian` | ありがとう ございます 周り の おかげ | です |
| 16 | `sopan_maaf_hal_kecil` | ごめん さっき の 言い方 きつかった | よね |
| 17 | `sopan_terima_maaf` | 気 に しないで ください も 大丈夫 です | から |
| 18 | `sopan_tidak_nyaman` | の 受け取り方 かも しれません が 気 に | なりました |
| 19 | `sopan_ucap_terima_kasih` | 手伝って いただき 本当 に | 助かりました |
| 20 | `sopan_tanggapi_terima_kasih` | とんでもない です いつでも 言って ください | ね |
| 21 | `sopan_tanggapi_terima_kasih_biasa` | いいって 気 に しないで | よ |
| 22 | `sopan_minta_waktu_berpikir` | すぐ に は お答え できない ので 考えさせて | ください |
| 23 | `sopan_menyetujui_syarat` | 条件 で なら お受け | します |
| 24 | `sopan_menolak_tanpa_kata_tidak` | 今回は 難しい の です が の 機会 に お願い | します |
| 25 | `sopan_menanggapi_cerita` | 話 続き が 気 に なる ので 聞かせて | ください |
| 26 | `sopan_ucap_selamat` | おめでとう ございます いい お話 を 聞いた ので も うれしい | です |
| 27 | `sopan_ikut_prihatin` | それは 大変 でした ね 何か お力 に なれる こと が あれば 言って | ください |
| 28 | `sopan_menolak_permintaan_halus` | は 難しい の です が の 朝 なら 大丈夫 | です |

Kuota terpenuhi: 32 dari 32, yaitu 28 kalimat di `data/t_sopan.js` ditambah 4 kalimat dari
`data/curated.js`. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya sudah habis,
dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: rekan kerja 11, atasan 6, teman 6, klien 3, orang asing di jalan 2. Bentuk sopan
22, biasa 6. Panjang 19, pendek 9.

Sembilan kalimat pendek, dan itu lebih banyak daripada topik lain, karena isi topik ini memang
reaksi: terkejut, meminta ulang, menanggapi terima kasih. Reaksi yang panjang justru bukan reaksi.
Enam kalimat biasa semuanya ke teman dekat, dan enam itu adalah pasangan dari versi sopannya:
`そうですね` berpasangan dengan `だよね`, `とんでもないです` dengan `いいって`.

Celah yang masih terbuka saat kuota penuh, diperiksa dengan mencari kata kuncinya di berkas ini,
bukan dari ingatan:

| Celah | Bukti pencarian |
|---|---|
| memberi izin dengan `どうぞ` dalam arti mempersilakan, bukan hanya menyetujui pendapat | `どうぞ` sudah dipakai tujuh kali, tapi untuk menyilakan masuk, menyilakan duduk, dan menyilakan mencoba; belum sekali pun sebagai jawaban atas permintaan izin. `かまいません` belum ada |
| mengalihkan topik pembicaraan | tidak ada kalimat yang memuat `ところで` |
| bercanda ringan untuk mencairkan suasana | tidak ada kalimat yang memuat `冗談` |
| mengingatkan bahwa orangnya boleh minta bantuan lagi | `いつでも言ってください` ada satu. `遠慮なく` sudah dipakai `kerja_minta_kritik_pekerjaan_sendiri`, tapi di sana meminta kritik, bukan mengingatkan orang lain |
| menyimpan rahasia dan meminta dijaga | tidak ada kalimat yang memuat `内緒` |
| memberi semangat sebelum orangnya menghadapi sesuatu | tidak ada kalimat yang memuat `頑張れ` atau `応援` |

Kalau topik ini dibuka lagi, enam baris itu yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.

## Catatan pencatatan

`../SPEC.md` T1 memakai penomoran berkas sebagai satu-satunya sumber: kuantitas ditulis di
`../README.md`, sedangkan bagian ini yang menyebut jumlah berkas. Angka 4 dan 28 di atas bukan
koreksi gaya, keduanya keluar dari data: `data/curated.js` menyumbang 4, `data/t_sopan.js` memuat
28, dan sebelumnya baris di sini menulis 27 karena menghitung `kurasi` yang berbeda.
## Sisa yang harus ditulis

37 kalimat. Kuota 37 sudah penuh.
