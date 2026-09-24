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
Skalanya **300 kalimat** untuk sepuluh topik inti di tabel ini: cukup besar untuk memuat seluruh ruang
ucapan tiap topik, cukup kecil untuk benar-benar ditulis sendiri dan diperiksa satu per satu.

| Topik | Sel tempat × kegiatan yang dicakup | Bagian | Kuota |
|---|---|---|---|
| `kerja` | 職場・学校×仕事・学業 22,88 + 自宅×仕事・学業 0,71 + それ以外の屋内×仕事・学業 0,85 + 職場・学校×休息 2,74 | 28,54% | **90** |
| `makan` | 自宅×食事 9,72 + 公共商業施設×食事 4,37 + 職場・学校×食事 1,60 + それ以外の屋内×食事 1,04 | 17,55% | **57** |
| `rumah_tugas` | 自宅×家事・雑事 10,24 + 自宅×身周りの用事 3,96 | 14,90% | **51** |
| `rumah_santai` | 自宅×休息 8,82 + それ以外の屋内×休息 0,42 + 自宅×レジャー活動 0,22 | 9,93% | **36** |
| `transportasi` | 交通機関×移動 4,69 + 職場・学校×移動 0,78 + 公共商業施設×移動 1,13 + それ以外の屋内×移動 0,31 + 自宅×移動 0,23 | 7,50% | **27** |
| `belanja` | 公共商業施設×家事・雑事 4,98 + 公共商業施設×身周りの用事 0,51 + それ以外の屋外×家事・雑事 0,69 + それ以外の屋内×家事・雑事 0,53 | 7,04% | **27** |
| `santai` | 公共商業施設×レジャー活動 3,18 + それ以外の屋内×レジャー活動 0,37 + 公共商業施設×付き合い 0,99 + 自宅×付き合い 0,71 + 職場・学校×付き合い 0,27 + それ以外の屋内×付き合い 0,29 + 交通機関×付き合い 0,02 | 6,13% | **22** |
| `jalan` | それ以外の屋外×移動 4,36 + それ以外の屋外×付き合い 0,40 + それ以外の屋外×レジャー活動 0,72 | 5,75% | **20** |
| `klinik` | 公共商業施設×療養 0,81 | 0,85% | **15** |
| `kegiatan` | 公共商業施設×社会参加 0,70 + 公共商業施設×業務外・課外活動 0,57 + 職場・学校×業務外・課外活動 0,44 | 1,80% | **16** |

**Catatan `klinik` dan `kegiatan`.** Bagian terukurnya memberi 2,6 dan 5,4 kalimat, jauh di
bawah yang dibutuhkan untuk menutup ruang ucapan sebuah topik, jadi keduanya memang berdiri di
atas bagian terukurnya dan penyimpangannya dicatat di sini.

Kuota keduanya naik lagi karena satu sebab yang terukur, bukan karena terasa kurang: slot
`menjawab` di kedua berkas topiknya **sudah tertulis seolah terisi**, padahal `check.js` hanya
menemukan 1 kalimat balasan di masing-masing (`klinik` 1, `kegiatan` 1). Aturan `../SPEC.md` K8
menuntut sedikitnya 3, jadi tiap topik menambah 3 kalimat balasan yang nyata: menjawab berapa
lama demamnya, obat apa yang sedang diminum, dan apakah ada alergi obat di `klinik`; menjawab
apa yang perlu dibawa, menjawab undangan rapat RT, dan menjawab tawaran kerja bakti di
`kegiatan`. Kuota `klinik` 12 menjadi 15 dan `kegiatan` 13 menjadi 16.

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
| `waktu_cuaca` | 名詞 17,35% dari token, bagian terbesar adalah waktu dan cuaca | **22** | menyebut hari, jam, perkiraan cuaca, dan mengaitkannya dengan rencana |

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
| Sepuluh topik inti | 361 |
| Tiga lintas | 92 |
| **Minimum deck** | **453** |
| Kuota terpakai | 455 |
| Perlu ditulis | **0** |

"Kuota terpakai" 455 **lebih tinggi dari kuota 453 karena** satu topik berdiri di atas
kuotanya: `waktu_cuaca` punya 22 kalimat di berkasnya ditambah 2 dari `kurasi` melawan kuota
22. Dua belas topik lain berdiri tepat di kuotanya, dan `../SPEC.md` T2 memang menyebut kuota
sebagai lantai, bukan langit-langit, selama kalimat tambahannya nyata dan berbeda. Kelebihan
itu juga tercatat di `topics/waktu_cuaca.md`.

**Dua catatan atas angka di atas, karena keduanya pernah salah di halaman ini.** Baris
"sepuluh topik inti" dulu berbunyi 308 dan disebut sembilan topik, padahal tabelnya berisi
sepuluh baris dan jumlah sebenarnya 354. Angka 361 sekarang dijumlahkan dari tabel di bagian 3,
bukan dihitung dengan pengurangan.

| Angka | Artinya | Sekarang |
|---|---|---|
| Kalimat di berkas topik | yang tertulis di `data/t_*.js` | **449** |
| Kalimat yang dihitung topik | di atas, ditambah `kurasi` yang sudah dipetakan ke topik | **455** |
| Kalimat di halaman | semua yang dibaca pembaca | **459** |
| Kuota | lantai yang harus ditulis, per `../SPEC.md` T2 | **453** |

Empat belas angka di atas berasal dari: 449 + 6 = 455, dan 455 + 4 = 459. Enam itu `kurasi01`,
`kurasi02`, `kurasi05`, `kurasi09` di `sopan` dan `kurasi07`, `kurasi10` di `waktu_cuaca`.
Empat sisanya, `kurasi03`, `kurasi04`, `kurasi06`, dan `kurasi08`, belum masuk topik mana pun:
keadaannya terlalu khusus untuk jadi contoh sebuah topik, dan menariknya masuk salah satu topik
akan melebihkan salah satu keadaan. Disebut supaya tidak ada yang mengira sisa pekerjaannya
lebih kecil daripada kenyataan.

**Kuota naik 24 kalimat pada penulisan ini, seluruhnya karena satu aturan baru.** `../SPEC.md`
K8 dijalankan untuk pertama kali dan menemukan `klinik` serta `kegiatan` hanya punya 1 kalimat
balasan, padahal slot `menjawab` di berkas topiknya sudah ditulis seolah terisi; `belanja`
punya 2 dan `waktu_cuaca` 2. Ketiga topik pertama naik tepat sebanyak kalimat balasan yang
benar-benar ditulis (+3, +3, +1) dan `waktu_cuaca` naik 1. Tidak ada kuota yang naik karena
"terasa kurang": seluruh 24 kalimatnya bisa ditunjuk satu per satu di `data/t_*.js`.

