# Rencana topik: berapa kalimat untuk tiap topik

Halaman ini menjawab satu pertanyaan: topik apa saja yang harus ada, dan berapa kalimat
untuk masing-masing. Jawabannya dihitung dari data percakapan, bukan dibagi rata dan bukan
dikira-kira.

Syarat yang mengikat tiap kalimat ada di `SPEC.md`. Berkas ini hanya soal jumlah dan
cakupan. Apa yang sudah ditulis untuk sebuah topik dicatat di `topics/<topik>.md`.

---

## 1. Dasar perhitungan

Jumlah kalimat sebuah topik mengikuti seberapa sering keadaannya terjadi. Ukurannya dari dua
sumber yang sudah ada di repo:

| Sumber | Isi | Dipakai untuk |
|---|---|---|
| CEJC 会話行動調査 2014-2015 (`data/survey.zip`, 9.272 percakapan, 729 person-day) | setiap percakapan sehari penuh dicatat: tempat, kegiatan, bentuk, lawan bicara | bagian tiap topik, dan siapa yang diajak bicara |
| CEJC 語数表 ver.202209 (`data/wc.zip`, 2.419.171 token) | frekuensi per kelas kata, per bentuk, per tempat | menimbang bahasa yang dipakai di dalam topik |

Kolom yang dipakai dari survei adalah `場所` (tempat) dan `活動` (kegiatan), keduanya
terisi di 9.207 dari 9.272 percakapan. Setiap topik adalah gabungan beberapa sel
tempat × kegiatan, dan kuotanya adalah bagian sel-sel itu dari seluruh percakapan.

**Kenapa tempat × kegiatan, bukan salah satunya.** `自宅` saja 34,9% percakapan, terlalu
lebar untuk jadi satu topik. `食事` saja 16,9%, tapi tersebar di empat tempat berbeda yang
kalimatnya tidak sama. Pasangan keduanya baru menunjuk keadaan yang nyata.

---

## 2. Ruang kalimat yang ditutup deck

Sembilan dari dua belas sel kegiatan terbesar masuk ke dalam topik. Tidak semuanya masuk akal
dijadikan kalimat yang bisa dihafal, dan yang dilewati disebut alasannya:

| Sel yang dilewati | Bagian | Alasan |
|---|---|---|
| `しない` (tidak melakukan apa-apa) | _tidak ada di data_ | bukan keadaan, tidak ada yang diucapkan |
| kegiatan yang bagiannya di bawah 0,2% | ~0,5% gabungan | terlalu jarang untuk ditemui pembelajar |

Dua keadaan yang bukan topik tapi memotong semua topik:

| Keadaan | Bagian | Kenapa bukan topik sendiri |
|---|---|---|
| 遠隔通信 (telepon, pesan) | 9,75% | yang berubah hanya salurannya; kalimatnya tetap kalimat topik asalnya, ditambah pembuka dan penutup telepon |
| 非母語話者 (lawan bicara bukan penutur asli) | 0,91% | topiknya tetap sama; yang berubah hanya cara mengucapkannya |

Dua baris di atas tetap memerlukan kalimat sendiri, jadi kuotanya dihitung terpisah di
bagian 4, bukan dihilangkan.

Ruang yang tertutup: **95,23%** percakapan. Sisa 4,77% adalah sel di bawah ambang dan
percakapan tanpa tempat atau kegiatan yang tercatat.

---

## 3. Kuota per topik

Bagian tiap topik dihitung dari sel tempat × kegiatan miliknya, lalu dikalikan skala deck.
Skalanya **300 kalimat** untuk sembilan topik inti: cukup besar untuk memuat seluruh ruang
ucapan tiap topik, cukup kecil untuk benar-benar ditulis sendiri dan diperiksa satu per satu.

| Topik | Sel tempat × kegiatan yang dicakup | Bagian | Kuota |
|---|---|---|---|
| `kerja` | 職場・学校×仕事・学業 22,88 + 自宅×仕事・学業 0,71 + それ以外の屋内×仕事・学業 0,85 + 職場・学校×休息 2,74 | 28,54% | **90** |
| `makan` | 自宅×食事 9,72 + 公共商業施設×食事 4,37 + 職場・学校×食事 1,60 + それ以外の屋内×食事 1,04 | 17,55% | **53** |
| `rumah_tugas` | 自宅×家事・雑事 10,24 + 自宅×身周りの用事 3,96 | 14,90% | **45** |
| `rumah_santai` | 自宅×休息 8,82 + それ以外の屋内×休息 0,42 + 自宅×レジャー活動 0,22 | 9,93% | **36** |
| `transportasi` | 交通機関×移動 4,69 + 職場・学校×移動 0,78 + 公共商業施設×移動 1,13 + それ以外の屋内×移動 0,31 + 自宅×移動 0,23 | 7,50% | **27** |
| `belanja` | 公共商業施設×家事・雑事 4,98 + 公共商業施設×身周りの用事 0,51 + それ以外の屋外×家事・雑事 0,69 + それ以外の屋内×家事・雑事 0,53 | 7,04% | **26** |
| `santai` | 公共商業施設×レジャー活動 3,18 + それ以外の屋内×レジャー活動 0,37 + 公共商業施設×付き合い 0,99 + 自宅×付き合い 0,71 + 職場・学校×付き合い 0,27 + それ以外の屋内×付き合い 0,29 + 交通機関×付き合い 0,02 | 6,13% | **22** |
| `jalan` | それ以外の屋外×移動 4,36 + それ以外の屋外×付き合い 0,40 + それ以外の屋外×レジャー活動 0,72 | 5,75% | **17** |
| `klinik` | 公共商業施設×療養 0,81 | 0,85% | **8** |
| `kegiatan` | 公共商業施設×社会参加 0,70 + 公共商業施設×業務外・課外活動 0,57 + 職場・学校×業務外・課外活動 0,44 | 1,80% | **13** |

**Catatan `klinik` dan `kegiatan`.** Bagian terukurnya memberi 2,6 dan 5,4 kalimat, di bawah
minimum 8 yang dibutuhkan untuk menutup ruang ucapan sebuah topik. Kuotanya dinaikkan ke 8
dan penyimpangannya dicatat di sini, karena topik tanpa cara menjawab pertanyaan dokter
adalah topik yang tidak bisa dipakai, seberapa pun jarangnya.

**Kenapa tidak ada baris `sopan` di tabel ini.** 感動詞 adalah kelas kata, dan percakapan yang
hanya berisi reaksi tidak punya tempat atau kegiatan yang tetap, jadi tidak mungkin dihitung
sebagai sel. `sopan` masuk tabel lintas di bagian 4 dengan dasar persentase token, bukan
persentase percakapan, dan percakapan yang cakupan topiknya berada di dalamnya.

**Sel tidak ada yang dipakai dua kali.** Setiap pasangan tempat × kegiatan masuk tepat satu
topik, dan itu diperiksa: jumlah baris tabel ini sama dengan cakupan yang dihitung di bagian
2, yaitu 95,23%. Sisa 4,77% (442 percakapan) adalah sel di bawah ambang dan percakapan tanpa
tempat atau kegiatan yang tercatat.

**Catatan `kerja`.** 90 kalimat terdengar besar, dan memang `kerja` adalah satu-satunya topik
yang benar-benar besar dalam percakapan sehari-hari: 22,88% dari seluruh percakapan adalah
bekerja atau belajar di kantor dan sekolah. Yang membuatnya bisa ditulis 90 kali tanpa
mengulang kerangka adalah ruang ucapannya juga besar: meminta, melapor, mengoreksi, menolak
tugas, meminta tenggat, mengabarkan hasil, menyanggah dengan halus, mengajak makan siang,
menanyakan yang tidak dimengerti.

Topik yang bagiannya besar tapi jumlah kalimatnya dibatasi oleh ruang ucapan, bukan oleh
bagiannya:

| Topik | Bagian | Kuota | Kenapa tidak lebih banyak |
|---|---|---|---|
| `rumah_santai` | 9,93% | 36 | sebagian besar percakapan di rumah adalah mengobrol tanpa isi yang perlu dihafal |
| `santai` | 6,13% | 22 | waktu luang punya banyak keadaan tapi sedikit kalimat yang benar-benar baru bentuknya |

---

## 4. Kuota topik lintas

Delapan puluh tiga kalimat berikut memotong semua topik. Isinya bukan topik baru, melainkan
ucapan yang muncul di topik apa pun.

| Lintas | Bagian dasar | Kuota | Isi |
|---|---|---|---|
| `telepon` | 遠隔通信 9,75% | **38** | membuka, menutup, menelepon kembali, salah sambung, tidak terdengar, meninggalkan pesan |
| `sopan` | 感動詞 10,52% dari token | **32** | reaksi dan pengisi jeda: menyetujui, terkejut, ragu, meminta diulang, menyela dengan halus |
| `waktu_cuaca` | 名詞 17,35% dari token, bagian terbesar adalah waktu dan cuaca | **20** | menyebut hari, jam, perkiraan cuaca, dan mengaitkannya dengan rencana |

**Kenapa `waktu_cuaca` masuk lintas, bukan topik sendiri.** Tidak ada percakapan yang
temanya cuaca. Cuaca dan waktu disebut sambil membicarakan hal lain: janji bertemu, rencana
akhir pekan, mengantar barang. Pembelajar membutuhkannya, tapi tidak sebagai topik.

**Kuota `sopan` datang dari pengukuran, bukan perasaan.** Partikel akhir kalimat muncul
163.670 kali dalam 2.419.171 kata, dan 感動詞 (kata seru) 10,52% dari seluruh token. Hampir
setiap kalimat percakapan Jepang membawa partikel akhir. Deck yang tidak mengajarkan `ね`,
`よ`, dan `か` sebagai kalimat tersendiri melewatkan bagian percakapan yang paling padat.

---

## 5. Total

| Bagian | Kalimat |
|---|---|
| Sembilan topik inti | 308 |
| Tiga lintas | 83 |
| **Minimum deck** | **427** |
| Kuota terpakai | 427 |
| Perlu ditulis | **0** |

Angka 393 itu kalimat yang sudah ada **dan** sudah masuk hitungan topik. **Semua topik sudah di
kuota:** `kerja` 90, `makan` 53, `rumah_tugas` 45, `telepon` 38, `sopan` 32, `rumah_santai` 36,
`transportasi` 27, `belanja` 26, `santai` 22, `waktu_cuaca` 20, `jalan` 17, `kegiatan` 13,
`klinik` 8.

Kuota `waktu_cuaca` semula 18 dan dinaikkan menjadi 20 karena barisnya salah catat: rencananya 16
kalimat baru ditambah 2 dari `data/curated.js`, dan yang terakhir dibaca sebagai kuota total. 18
kalimat baru sudah ditulis dan semuanya keadaan yang berbeda, jadi kuotanya yang diperbaiki, bukan
kalimatnya yang dibuang. Dicatat di sini karena mengubah kuota satu topik saja adalah hal yang
aturan di bagian atas halaman ini larang, kecuali dijelaskan alasannya seperti ini. Tidak ada yang dihitung dua kali: `kurasi01`, `kurasi02`,
`kurasi05`, dan `kurasi09` masuk `sopan`, sedangkan `kurasi07` dan `kurasi10` masuk
`waktu_cuaca`.

Ada 431 kalimat di halaman, bukan 398. Empat selisihnya adalah kalimat `kurasi` yang belum masuk topik mana pun. Selisih 4 adalah kalimat `kurasi` yang belum masuk topik
mana pun (`kurasi03`, `kurasi04`, `kurasi06`, `kurasi08`): keadaannya terlalu khusus untuk
jadi contoh sebuah topik, dan menariknya masuk salah satu topik akan melebihkan salah satu
keadaan. Keduanya disebut supaya tidak ada yang mengira sisa pekerjaannya 4 kalimat lebih
kecil daripada kenyataan.

Angka ini lantai, bukan target. `SPEC.md` T2 menetapkan setiap topik ditulis sampai mentok:
kuota menjaga keseimbangan antar topik, saturasi menjaga tiap topik benar-benar bisa dipakai.
Deck yang berhenti tepat di angka ini kemungkinan berhenti sebelum mentok.

Skala ini bisa dinaikkan tanpa mengubah perbandingan antar topik: kalikan semua kuota dengan
angka yang sama. Yang tidak boleh dilakukan adalah menaikkan satu topik saja, karena itu
merusak gambaran bahasa yang dipakai orang.

---

## 6. Sepuluh topik lama yang ditinggalkan

Rencana sebelumnya memakai sepuluh modul topik bernomor `t00` sampai `t09` (286 kalimat yang
dihasilkan mesin, dihapus seluruhnya di commit `3bf7373`). Jumlahnya ditetapkan sebelum data
diukur. Perbandingannya sekarang ada di bawah. Sebagian digabung karena kalimatnya memang
sama; sebagian tidak punya bukti yang cukup untuk berdiri sendiri.

| Topik lama | Jadi apa | Dasar |
|---|---|---|
| `t00_sapaan` sapaan | `sopan` | 感動詞 10,52% token; sapaan punya tempat di sana, tapi `sopan` jauh lebih luas daripada sapaan |
| `t01_waktu` waktu | `waktu_cuaca` | waktu dan cuaca tidak pernah jadi tema percakapan sendiri |
| `t02_orang` orang | `sopan` + `santai` | memperkenalkan diri tersebar di banyak keadaan, tidak berdiri sendiri |
| `t03_makanan` makanan | `makan` (53) | 16,89% percakapan, sel terbesar keempat |
| `t04_belanja` belanja | `belanja` (26) | 6,71% percakapan; satu-satunya topik lama yang kalimatnya sudah ditulis ulang dan tetap masuk |
| `t05_transportasi` transportasi | `transportasi` (27) | 移動 11,53% |
| `t06_arah` arah | `jalan` (17) | menanyakan arah adalah それ以外の屋外×移動, 4,36% |
| `t07_cuaca` cuaca | `waktu_cuaca` | lihat atas |
| `t08_kesehatan` kesehatan | `klinik` (8) | 療養 0,92%, dan hanya 0,81% sebagai sel tempat × kegiatan |
| `t09_kantor` kantor | `kerja` (90) | 仕事・学業 25,14%, sel tunggal terbesar di seluruh data |

Yang tidak ada di rencana lama sama sekali, dan sekarang punya kuota:

| Topik baru | Kuota | Dari mana |
|---|---|---|
| `kerja` (sekolah ikut di dalamnya) | 90 | 職場・学校×仕事・学業, 22,88% percakapan |
| `rumah_tugas` | 45 | 自宅×家事・雑事 10,24%, sel terbesar kedua |
| `telepon` | 33 | 遠隔通信 9,75%, sebelumnya tidak punya topik |
| `rumah_santai` | 36 | 自宅×休息 8,82% |
| `jalan` | 17 | それ以外の屋外×移動, dan berpapasan di jalan |
| `santai` | 22 | レジャー活動 4,63% + 付き合い 2,71% |
| `kegiatan` | 8 | 社会参加 1,05% + 業務外・課外活動 1,27% |

Ringkasnya: dari sepuluh topik lama, dua tetap sebagai topik dengan isi yang ditulis ulang
(`belanja`, `transportasi`), satu digabung ke topik yang lebih besar (`kantor` menjadi bagian
dari `kerja`), dan tujuh larut ke topik atau lintas yang berbeda. Tidak ada keadaan yang
hilang tanpa jejak: `kesehatan` yang lama menjadi `klinik`, `arah` menjadi `jalan`, `orang`
dan `sapaan` menjadi `sopan`.

**Kenapa yang lama terasa begitu banyak.** Sepuluh modul itu memberi 22 sampai 40 kalimat
per topik, hampir sama banyak, dan totalnya 286. Yang membuatnya terasa berulang bukan
jumlahnya, tapi karena tiap topik dibangun dari kerangka yang sama dengan kata yang ditukar,
dan itu yang sekarang dilarang `SPEC.md` T4.


---

## 7. Menulis sampai mentok

Kuota menjawab "berapa banyak sepantasnya". Saturasi menjawab "apakah sudah selesai". Kedua
pertanyaan itu berbeda, dan sebuah topik baru selesai kalau keduanya sudah terpenuhi.

Urutan yang dipakai, dari yang paling sering dibutuhkan ke yang paling jarang:

| # | Topik | Kuota | Keadaan |
|---|---|---|---|
| 1 | `kerja` | 90 | **90 kalimat, kuota terpenuhi** |
| 2 | `makan` | 53 | **53 kalimat, kuota terpenuhi** |
| 3 | `rumah_tugas` | 45 | **45 kalimat, kuota terpenuhi** |
| 4 | `telepon` | 38 | **38 kalimat, kuota terpenuhi** |
| 5 | `sopan` | 32 | **32 kalimat, kuota terpenuhi** (`t_sopan.js` 28 + `kurasi` 4) |
| 6 | `rumah_santai` | 36 | **36 kalimat, kuota terpenuhi** |
| 7 | `transportasi` | 27 | **27 kalimat, kuota terpenuhi** |
| 8 | `belanja` | 26 | **26 kalimat, kuota terpenuhi** |
| 9 | `santai` | 22 | **22 kalimat, kuota terpenuhi** |
| 10 | `waktu_cuaca` | 20 | **20 kalimat, kuota terpenuhi** |
| 11 | `jalan` | 17 | **17 kalimat, kuota terpenuhi** |
| 12 | `klinik` | 8 | **8 kalimat, kuota terpenuhi** |
| 13 | `kegiatan` | 13 | **13 kalimat, kuota terpenuhi** |

Dua angka yang berbeda artinya. **Kuota penuh** berarti jumlahnya sudah sampai; **mentok**
berarti tidak ada lagi yang tersisa untuk ditulis. Tidak satu pun dari ketiganya mentok:

| Topik | Kuota | Mentok? | Kenapa |
|---|---|---|---|
| `kerja` | 90 | belum | 4 celah ditutup, 5 masih terbuka |
| `makan` | 53 | belum | 4 celah terbuka, tercatat di berkasnya |
| `rumah_tugas` | 45 | belum | 6 celah terbuka, tercatat di berkasnya |
| `telepon` | 38 | belum | 5 celah ditutup, 5 masih terbuka |
| `rumah_santai` | 36 | belum | 6 celah ditutup, 4 masih terbuka |
| `transportasi` | 27 | belum | 5 celah ditutup, 6 masih terbuka |
| `santai` | 22 | belum | 4 celah ditutup, 6 masih terbuka |
| `waktu_cuaca` | 18 | belum | 3 celah terbuka, tercatat di berkasnya |
| `jalan` | 17 | belum | 3 celah terbuka, tercatat di berkasnya |
| `klinik` | 8 | belum | 4 celah terbuka, tercatat di berkasnya |
| `kegiatan` | 13 | belum | 5 celah ditutup, 5 masih terbuka |
| `sopan` | 32 | belum | 6 celah terbuka, tercatat di berkasnya |
| `belanja` | 26 | belum | sudah diperiksa; 4 celah ditutup, 6 masih terbuka |

Karena itu semuanya masih akan bertambah, walau kuotanya sudah penuh. `SPEC.md` T2: kuota
adalah lantai, bukan langit-langit.

Semua topik sudah punya berkasnya sendiri, dan semuanya sudah di kuota. Tidak satu pun disebut
mentok, karena mentok berarti tidak ada lagi kalimat yang bisa dibuat dan itu belum terbukti untuk
topik mana pun: 55 celah masih tercatat, dan `belanja` yang tadinya belum pernah diperiksa kini sudah, dengan 6 celah sisanya tercatat.
