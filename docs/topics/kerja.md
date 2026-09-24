<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `kerja`

| | |
|---|---|
| Judul | Kerja |
| Kuota | 86 |
| Sudah ditulis | 35 |
| Sisa | **51** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_kerja.js` |

Kuota dihitung di `../README.md` dari sel: 職場・学校×仕事・学業 22,88% + 自宅×仕事・学業 0,71% + それ以外の屋内×仕事・学業 0,85% + 職場・学校×休息 2,74%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | rekan kerja 39%, teman 5%, guru 4%, publik 3%, keluarga 1% |
| Bentuk | 用談・相談 51,7%, 雑談 32,0%, 会議・会合 10,3%, 授業・レッスン 5,9% |
| Jumlah lawan | satu lawan bicara 50% |

## Batas topik

**Termasuk:**

- meminta sesuatu dikerjakan, dan meminta dengan halus saat orangnya lebih senior
- melaporkan hasil, termasuk melaporkan yang belum selesai
- mengabarkan masalah lebih awal, sebelum orang lain menemukannya
- menolak tugas atau tenggat, dengan alasan yang bisa diperiksa
- meminta tenggat, meminta perpanjangan, menawar prioritas
- mengoreksi pekerjaan orang lain tanpa menyerang orangnya
- menyanggah pendapat atasan, dan menyanggah pendapat rekan
- mengaku belum paham, meminta diulang, meminta contoh
- meminta izin pulang lebih awal, izin tidak masuk, izin cuti
- menanyakan jadwal, pembagian tugas, siapa yang bertanggung jawab
- di rapat: menyampaikan pendapat, menyela dengan halus, meringkas, menutup
- di sekolah: bertanya ke guru, meminta perpanjangan tugas, meminta rekomendasi
- mengajak makan siang, mengajak pulang bersama
- menerima koreksi, menerima tugas tambahan, menolak pujian dengan sopan

**Tidak termasuk:**

- urusan pribadi yang kebetulan terjadi di kantor, misalnya menelepon keluarga, masuk ke `telepon`
- perjalanan ke dan dari kantor, masuk ke `transportasi`
- makan siangnya sendiri sebagai acara makan, masuk ke `makan`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya jadwal, tanya prosedur, tanya siapa yang mengerjakan. Biasa: -.
- **menjawab** — sopan: menjawab pertanyaan atasan, menjawab rekan yang bertanya. Biasa: -.
- **mengajak** — sopan: mengajak makan siang, mengajak rapat, mengajak pulang bersama. Biasa: -.
- **menerima** — sopan: menerima tugas, menerima koreksi, menerima tenggat baru. Biasa: -.
- **menolak halus** — sopan: menolak tugas tambahan, menolak lembur, menolak permintaan yang tidak bisa. Biasa: -.
- **rencana** — sopan: menyusun urutan pekerjaan, membagi tugas, menetapkan tenggat. Biasa: -.
- **lampau** — sopan: melaporkan yang sudah selesai, menceritakan rapat kemarin. Biasa: -.
- **minta tolong** — sopan: minta bantuan rekan, minta bantuan atasan. Biasa: -.
- **menjelaskan** — sopan: menjelaskan kenapa terlambat, menjelaskan isi pekerjaan, mengaku belum paham. Biasa: -.
- **sopan** — sopan: ke atasan, ke klien, ke guru. Biasa: -.
- **biasa** — sopan: ke rekan setingkat, ke teman sekelas. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`. 35 kalimat, 35 kerangka, tidak ada yang sama.
Sebelum menulis topik lain, periksa daftar ini: kerangka yang sama dengan predikat terakhir yang
sama akan tertangkap `check.js` bagian `distinct` (batas 3 per kerangka).

| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `kerja_tanya_waktu_rapat` | お忙しい ところ すみません の 打ち合わせ の 時間 を もう一度 確認したい の です | が |
| 2 | `kerja_tanya_penanggung_jawab` | 件 は どなた が 担当されている の | でしょうか |
| 3 | `kerja_minta_konfirmasi_tenggat` | 今週中 に 終わらせたい ので 締め切り の 確認 を お願いできます | か |
| 4 | `kerja_minta_bantuan_rekan` | 手 が 足りない ので 手伝って もらえる と | 助かります |
| 5 | `kerja_lapor_sudah_dikirim` | 先ほど の 資料 を 直して 送りました ので 確認 を | お願いします |
| 6 | `kerja_lapor_belum_selesai` | 終わっていない の です が 今日中 に は | 仕上げます |
| 7 | `kerja_lapor_masalah_awal` | 問題 が 見つかった ので 先に 報告 して | おきます |
| 8 | `kerja_menolak_tugas_baru` | の 作業 が 終わる まで 時間 が かかる ので 新しい 仕事 は | 引き受けられません |
| 9 | `kerja_menolak_lembur` | は 子ども を 迎えに 行かなければ ならない ので 残業 は | できません |
| 10 | `kerja_minta_pulang_cepat` | 体調 が よくない ので 先に 失礼しても よろしい | でしょうか |
| 11 | `kerja_minta_cuti_sehari` | 来月 家族 の 用事 が ある ので 有給 を 一日 いただきたい の です | が |
| 12 | `kerja_menyanggah_halus` | おっしゃる こと は 分かります が 進め方 だと 時間 が かかりすぎる と | 思います |
| 13 | `kerja_mengaku_belum_paham` | すみません が よく 分からない ので もう一度 教えて いただけます | か |
| 14 | `kerja_minta_diulang` | 恐れ入ります が 電波 が 悪い ようで もう一度 お願いできます | か |
| 15 | `kerja_ajak_makan_siang` | そろそろ 昼 だ けど 一緒に 食べに | 行かない |
| 16 | `kerja_ajak_rapat_dulu` | 議題 が 多い ので 先に 打ち合わせ の 時間 を 取って おきましょう | か |
| 17 | `kerja_terima_tugas` | 承知しました の 午前中 に | 取りかかります |
| 18 | `kerja_terima_koreksi` | ご指摘 ありがとうございます すぐ | 直します |
| 19 | `kerja_bagi_tugas` | が 資料 を 作る ので 佐藤さん は データ の 確認 を | お願いします |
| 20 | `kerja_minta_tenggat_antara` | 金曜日 まで に まとめたい ので 木曜 に 一度 見せて いただけます | か |
| 21 | `kerja_lampau_rapat_kemarin` | 会議 が 終わって から 決まった こと を メール で 共有 | しました |
| 22 | `kerja_lampau_terlambat_rapat` | 電車 が 遅れていた ので 朝 の 打ち合わせ に 遅れて | しまいました |
| 23 | `kerja_menjelaskan_terlambat` | 寝坊 して しまって 申し訳ありません 次 から は | 気をつけます |
| 24 | `kerja_minta_progres` | 進捗 を 教えてもらえます か 困っている こと が あれば 早めに 言って | ください |
| 25 | `kerja_tolak_permintaan_cuti` | 週 は が 足りない ので 別 の 日 に 変えて もらえる と | 助かります |
| 26 | `kerja_memberi_tugas` | 資料 を まで に まとめて おいて ください 分からない ところ が あれば 聞いて | ください |
| 27 | `kerja_memuji_rekan` | 早く 上がった ね おかげで 助かった | よ |
| 28 | `kerja_rekan_mengeluh_lembur` | も 残業 か 早く 帰りたい | な |
| 29 | `kerja_tanya_angka_salah` | の 数字 が 合っていない よう な ので もう一度 見て もらえます | か |
| 30 | `kerja_konfirmasi_tenggat_ulang` | 念のため 確認 です が 締め切り は 今週 の 金曜 で 合っています | か |
| 31 | `kerja_minta_mundur_tenggat` | 量 だ と 金曜 は 難しい ので の 月曜 まで 延ばして いただけます | か |
| 32 | `kerja_klien_janji_datang` | お約束 の 時間 に 伺います ので 当日 は よろしく | お願いいたします |
| 33 | `kerja_klien_balas_terlambat` | ご連絡 が 遅くなり 申し訳ありません 確認 できたら すぐ ご連絡 | します |
| 34 | `kerja_guru_bertanya` | 部分 が 分からない ので 授業 の あとで 質問 して も いい です | か |
| 35 | `kerja_guru_konsultasi` | 進路 の こと で 相談 が ある ので 放課後 に お時間 を いただけない | でしょうか |

Kerangka yang masih terbuka untuk topik ini, asal tidak bertabrakan dengan daftar di atas:

- menanyakan cara memakai alat atau sistem sebelum memakainya
- menjelaskan urutan pekerjaan kepada orang yang akan melanjutkannya
- menolak permintaan mendadak karena sudah ada janji lain
- meminta izin memakai anggaran atau membeli keperluan
- meminta maaf karena salah mengirim ke orang yang salah
- melaporkan bahwa pekerjaan akan selesai lebih cepat dari tenggat
- meminta pendapat orang lain sebelum memutuskan sendiri
- mengingatkan janji yang sudah lewat tanpa menyalahkan
- menolak pujian dengan menyebut pekerjaan orang lain
- menanyakan apakah hasilnya sudah sesuai sebelum menyerahkan
- memberitahu bahwa akan cuti dan apa yang sudah diserahkan
- menutup rapat dengan meringkas dan menyebut siapa mengerjakan apa

## Sisa yang harus ditulis

51 kalimat.

Urutan yang disarankan: keadaan yang paling sering dulu, lalu yang jarang. Slot `bertanya`, `menjawab`, dan `menerima` lebih dulu daripada `rencana` dan `lampau`.
