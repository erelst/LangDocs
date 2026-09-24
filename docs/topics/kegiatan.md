<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `kegiatan`

| | |
|---|---|
| Judul | Kegiatan |
| Kuota | 16 |
| Sudah ditulis | 16 |
| Sisa | **0** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_kegiatan.js` |

**Catatan kuota.** Bagian terukurnya 1,80%, yang memberi 5,4 kalimat. Kuota dinaikkan ke 8 karena keadaan ini selalu melibatkan orang yang belum dikenal, dan di sanalah bentuk santun yang paling perlu dilatih.

Kuota dihitung di `../README.md` dari sel: 公共商業施設×社会参加 0,70% + 公共商業施設×業務外・課外活動 0,57% + 職場・学校×業務外・課外活動 0,44%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | teman 9%, rekan kerja 9%, publik 9%, keluarga 7%, guru 4% |
| Bentuk | 雑談 44,7%, 用談・相談 33,3%, 会議・会合 13,8%, 授業・レッスン 8,2% |
| Kalimat balasan | 4 dari 16: `kegiatan_tolak_tugas`, `kegiatan_jawab_siap_bawa`, `kegiatan_jawab_tidak_bisa_hari_itu`, `kegiatan_jawab_bisa_bawa` |
| Jumlah lawan | satu lawan bicara hanya 29%, topik paling ramai |

## Batas topik

**Termasuk:**

- kegiatan lingkungan: kerja bakti, rapat RT, membagi undangan
- kegiatan sekolah anak: pertemuan orang tua, kegiatan kelas, membawa perlengkapan
- kegiatan kelompok: kursus, klub, kegiatan sukarela
- memperkenalkan diri di kelompok yang belum dikenal
- mengajukan diri untuk tugas, dan menolak dengan alasan yang jelas
- menanyakan jadwal, tempat, dan apa yang perlu dibawa

**Tidak termasuk:**

- pekerjaan berbayar, masuk ke `kerja`
- acara waktu luang bersama teman, masuk ke `santai`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya jadwal, tanya tempat, tanya apa yang perlu dibawa. Biasa: -.
- **menjawab** — sopan: menjawab apa yang perlu dibawa (`kegiatan_jawab_siap_bawa`), menjawab undangan rapat RT (`kegiatan_jawab_tidak_bisa_hari_itu`), menjawab tawaran kerja bakti (`kegiatan_jawab_bisa_bawa`). Biasa: -.
- **mengajak** — sopan: mengajak ikut kegiatan. Biasa: -.
- **menerima** — sopan: menerima tugas kepanitiaan. Biasa: -.
- **menolak halus** — sopan: menolak tugas kepanitiaan, menolak datang karena ada urusan. Biasa: -.
- **rencana** — sopan: menyusun urutan acara, membagi tugas. Biasa: -.
- **lampau** — sopan: menceritakan kegiatan yang sudah berjalan. Biasa: -.
- **minta tolong** — sopan: meminta bantuan membawa, meminta digantikan. Biasa: -.
- **menjelaskan** — sopan: menjelaskan apa yang akan dilakukan, menjelaskan kenapa tidak bisa ikut. Biasa: -.
- **sopan** — sopan: ke orang yang baru dikenal, ke orang yang lebih tua. Biasa: -.
- **biasa** — sopan: ke teman yang ikut kegiatan yang sama. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 16 kalimat, 16 kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `kegiatan_perkenalan_diri` | 先月 引っ越して きた ばかり なので 分からない こと が 多い と | 思います |
| 2 | `kegiatan_tanya_jadwal` | 次 の 集まり は 何時 から どこ で する の でしょう | か |
| 3 | `kegiatan_tanya_bawa` | 当日 は 何か 持って 行く もの が ある | のでしょうか |
| 4 | `kegiatan_ajukan_diri` | 日 なら 空いて いる ので 係 は が | やります |
| 5 | `kegiatan_tolak_tugas` | 平日 は 難しい の です が 休み の 日 なら | 手伝えます |
| 6 | `kegiatan_bagi_undangan` | 地区 の お知らせ です ので お時間 の ある とき に | どうぞ |
| 7 | `kegiatan_ajak_ikut` | よかったら 一度 一緒 に 出て みません | か |
| 8 | `kegiatan_tidak_bisa_datang` | 日 は 家族 の 用事 が ある ので 欠席 させて | いただきます |
| 9 | `kegiatan_tanya_iuran` | 会費 が いくら な の か と いつ 払う の か を 教えて | ください |
| 10 | `kegiatan_tanya_piket` | 当番 は どういう 順番 で 回って いる の か 分かる と 助かり | ます |
| 11 | `kegiatan_kerja_bakti` | 日 は 掃除 に 出る ので 草むしり なら | 手伝えます |
| 12 | `kegiatan_rapat_rt` | 自治会 の 会議 に 出られなかった ので 何 の 話 だった か 教えて | ください |
| 13 | `kegiatan_pertemuan_orang_tua` | 学校 の 保護者 会 は いつ です か 日 は 仕事 が 休み | なので |
| 14 | `kegiatan_jawab_siap_bawa` | と 言って 持って 行く もの は ない ので 手ぶら で 行きます | ね |
| 15 | `kegiatan_jawab_tidak_bisa_hari_itu` | その日 は 遅く まで 仕事 な ので 参加 できません 来月 教えて | ください |
| 16 | `kegiatan_jawab_bisa_bawa` | 午前中 なら 空いている ので 途中 まで なら | 手伝えます |

Kuota terpenuhi: 16 dari 16. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: tetangga 13, tetangga baru 2, teman 1. Bentuk sopan 16, biasa 0.
Panjang 16, pendek 0.

Delapan dari delapan sopan, dan tidak ada satu pun yang biasa. Itu memang bentuk topik ini: yang
mengikuti kegiatan lingkungan atau sekolah anak berbicara dengan orang yang baru dikenal, dan satu
kalimat yang diarahkan ke teman pun tetap sopan karena undangannya mewakili kelompok, bukan
hubungan pribadi.

Topik paling ramai menurut data: satu lawan bicara hanya 29%, terendah dari semua topik. Itu
sebabnya memperkenalkan diri dan mengajukan diri untuk tugas ada di sini, bukan di topik lain.

Celah yang ditemukan saat topik ini diperiksa, dan semuanya sudah ditulis:

| Celah | Ditutup oleh |
|---|---|
| iuran kegiatan dan kapan dibayar | `kegiatan_tanya_iuran` |
| jadwal piket bergilir | `kegiatan_tanya_piket` |
| kerja bakti dan menawarkan tenaga untuk bagian tertentu | `kegiatan_kerja_bakti` |
| keputusan rapat RT bagi yang tidak hadir | `kegiatan_rapat_rt` |
| pertemuan orang tua di sekolah | `kegiatan_pertemuan_orang_tua` |

Celah yang masih terbuka setelah pemeriksaan itu, dicari dengan kata kuncinya:

| Celah | Bukti pencarian |
|---|---|
| ~~menjawab pertanyaan orang yang baru dikenal tentang diri sendiri~~ | **ditutup** oleh `kegiatan_jawab_siap_bawa`, `kegiatan_jawab_tidak_bisa_hari_itu`, dan `kegiatan_jawab_bisa_bawa` saat `../SPEC.md` K8 dijalankan |
| mengucapkan terima kasih kepada panitia setelah acara | tidak ada kalimat yang memuat `お疲れ様` |
| membawa makanan atau minuman untuk kegiatan | tidak ada kalimat yang memuat `差し入れ` atau `飲み物` |
| kursus atau klub yang diikuti atas kemauan sendiri | tidak ada kalimat yang memuat `サークル` atau `教室` |
| menanyakan siapa ketua atau penanggung jawab kegiatan | tidak ada kalimat yang memuat `会長` atau `代表` |

Kuota naik dari 8 ke 13 lewat lima keadaan nyata, lalu ke 16 karena tiga kalimat balasan yang
dituntut `../SPEC.md` K8,
semuanya dari daftar celah yang sudah tercatat sejak topik ini ditulis.

Kalau topik ini dibuka lagi, baris di atas yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.
## Sisa yang harus ditulis

16 kalimat. Kuota 16 sudah penuh.
