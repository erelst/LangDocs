<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `kegiatan`

| | |
|---|---|
| Judul | Kegiatan |
| Kuota | 8 |
| Sudah ditulis | 8 |
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
- **menjawab** — sopan: menjawab pertanyaan orang yang baru dikenal di kegiatan. Biasa: -.
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

Dihitung dengan cara yang sama seperti `check.js`. 8 kalimat, 8 kerangka, tidak ada yang sama.

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

Kuota terpenuhi: 8 dari 8. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti topiknya
sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: tetangga 6, tetangga baru 1, teman 1. Bentuk sopan 8, biasa 0.
Panjang 8, pendek 0.

Delapan dari delapan sopan, dan tidak ada satu pun yang biasa. Itu memang bentuk topik ini: yang
mengikuti kegiatan lingkungan atau sekolah anak berbicara dengan orang yang baru dikenal, dan satu
kalimat yang diarahkan ke teman pun tetap sopan karena undangannya mewakili kelompok, bukan
hubungan pribadi.

Topik paling ramai menurut data: satu lawan bicara hanya 29%, terendah dari semua topik. Itu
sebabnya memperkenalkan diri dan mengajukan diri untuk tugas ada di sini, bukan di topik lain.

Celah yang masih terbuka saat kuota penuh, diperiksa dengan mencari kata kuncinya di berkas ini,
bukan dari ingatan:

| Celah | Bukti pencarian |
|---|---|
| iuran dan biaya kegiatan | tidak ada kalimat yang memuat `会費` |
| jadwal piket bergilir | tidak ada kalimat yang memuat `当番` |
| pertemuan orang tua di sekolah | tidak ada kalimat yang memuat `保護` atau `学校` |
| kerja bakti membersihkan lingkungan | tidak ada kalimat yang memuat `掃除` atau `草` |
| pengurus RT dan rapatnya | tidak ada kalimat yang memuat `自治会` atau `町内会` |

Kalau topik ini dibuka lagi, baris di atas yang pertama ditulis. Kalimat baru juga harus
menghindari kerangka di tabel atas: `check.js` bagian `distinct` menangkap kerangka yang sama
dengan predikat yang sama setelah bendanya dibuang.
## Sisa yang harus ditulis

0 kalimat. Kuota 8 sudah penuh.
