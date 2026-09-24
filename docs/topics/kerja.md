<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `kerja`

| | |
|---|---|
| Judul | Kerja |
| Kuota | 86 |
| Sudah ditulis | 86 |
| Sisa | **0** |
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

Dihitung dengan cara yang sama seperti `check.js`. 86 kalimat, 86 kerangka, tidak ada yang sama.
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
| 36 | `kerja_tanya_cara_pakai_alat` | 使い方 が よく 分からない ので 最初 だけ 教えて いただけます | か |
| 37 | `kerja_serahkan_urutan_pekerjaan` | 順番 で 進めれば 迷わない ので から お願いできます | か |
| 38 | `kerja_tolak_mendadak_sudah_ada_janji` | 時間 は 先約 が ある ので 別 の 日 でしたら | 伺えます |
| 39 | `kerja_minta_izin_anggaran` | 分 の 経費 を 先に 払って おきたい ので 承認 して いただけます | か |
| 40 | `kerja_minta_maaf_salah_kirim` | 送り先 を 間違えて しまい ご迷惑 を かけた ので すぐ 訂正 | いたします |
| 41 | `kerja_salah_kirim_ke_rekan` | さっき の メール 違う に 送っちゃった から 送り直して おく | ね |
| 42 | `kerja_lapor_selesai_lebih_cepat` | 予定 より 早く 終わりました ので 次 の 作業 に 入って も よろしい | でしょうか |
| 43 | `kerja_minta_pendapat_sebelum_mutuskan` | だけ で 決める より 一度 ご意見 を いただいた ほう が いい と 思う の です | が |
| 44 | `kerja_ingatkan_janji_lewat` | お願いしていた 件 です が 中 に 見て いただける と | 助かります |
| 45 | `kerja_tolak_pujian_sebut_orang_lain` | 佐藤さん が 資料 を 作って くれた から は まとめた だけ | です |
| 46 | `kerja_tanya_hasil_sudah_sesuai` | 提出する 前に 内容 で 合っている か 見て いただけます | か |
| 47 | `kerja_beritahu_cuti_dan_serahan` | は 休み を いただく ので まで に 終わらせて | おきます |
| 48 | `kerja_tutup_rapat_ringkas` | では 時間 に なりました ので 決まった こと を まとめて 共有 | します |
| 49 | `kerja_nyela_rapat_halus` | お話し中 すみません が 点 だけ 先に 確認 させて いただけます | か |
| 50 | `kerja_pendapat_di_rapat` | の ほう から も 一案 が ある の です が 方法 なら 工数 が 減る と | 思います |
| 51 | `kerja_siswa_minta_perpanjangan` | 調べる のに 時間 が かかった ので 締め切り を 明後日 まで 延ばして いただけます | か |
| 52 | `kerja_siswa_minta_rekomendasi` | 進学 の こと で 推薦状 を お願いしたい の です が お時間 を いただけます | か |
| 53 | `kerja_tanya_prosedur_pengajuan` | 経費 の 申請 は どの 順番 で 出せば いい の か 教えて いただけます | か |
| 54 | `kerja_jawab_belum_dikerjakan` | 手 を つけていない ので 中 に | 始めます |
| 55 | `kerja_ajak_pulang_bersama` | そろそろ 終わる から 一緒に 駅 まで | 帰らない |
| 56 | `kerja_terima_tenggat_baru` | 金曜 まで しか 時間 が ない ので 優先順位 を 変えて | 進めます |
| 57 | `kerja_menolak_tidak_bisa_halus` | 申し訳ありません が 日 は 対応できない ので 翌週 でも よろしい | でしょうか |
| 58 | `kerja_lapor_perubahan_ke_klien` | 仕様 を 一部 変更した ので まで に 新しい 資料 を | お送りします |
| 59 | `kerja_jelaskan_isi_ke_orang_baru` | 作業 は 外部 に 出す 部分 が ある ので だけ 気をつけて | ください |
| 60 | `kerja_tanya_penerus_saat_cuti` | 休み の 間 急ぎ の 件 は 誰 に 引き継いで おけば いい | でしょうか |
| 61 | `kerja_minta_waktu_pertimbangkan` | すぐに 決められない ので まで 考えさせて いただけます | か |
| 62 | `kerja_lapor_data_perlu_diperbarui` | 古い 数字 が 残っている ので 更新して から 使って | ください |
| 63 | `kerja_tegur_rekan_terlambat` | 最近 遅刻 が 続いて いる けど 何か | あった |
| 64 | `kerja_terima_tawaran_lembur` | は 手 が 空いている ので 残業 は が | 引き受けます |
| 65 | `kerja_tanya_rapat_jadi` | の 打ち合わせ だけど 予定どおり やります | か |
| 66 | `kerja_klaim_biaya_perjalanan` | 先日 の 出張 の 領収書 を まとめた ので 確認 を お願いできます | か |
| 67 | `kerja_minta_persetujuan_dokumen` | 書類 に 印 を いただかない と 先に 進めない ので お手数 です が | お願いします |
| 68 | `kerja_jelaskan_tidak_bisa_hadir_rapat` | 時間 は 別 の 打ち合わせ が 入っている ので 欠席 させて | いただきます |
| 69 | `kerja_ajak_diskusi_sebentar` | 相談したい こと が ある ので 五分 だけ | いい |
| 70 | `kerja_tanya_cara_menyampaikan_keluhan` | 件 は どこ に 伝えれば いい の か 分からない ので 教えて いただけます | か |
| 71 | `kerja_lapor_alat_rusak` | プリンター が 壊れて しまった ので 修理 を 呼んで もらえます | か |
| 72 | `kerja_pinjam_barang_rekan` | ペン 貸して | もらえる |
| 73 | `kerja_kembalikan_pinjaman` | お借りした 本 を 返しに 来た の です が よろしい | でしょうか |
| 74 | `kerja_minta_rekan_menunggu` | 電話 に 出ている ので 待って もらえます | か |
| 75 | `kerja_minta_kritik_pekerjaan_sendiri` | 自分 では 気づかない ところ が ある ので 遠慮なく 言って いただけます | か |
| 76 | `kerja_jelaskan_tergantung_pihak_lain` | 先方 の 返事待ち なので こちら だけ では 進められない 状況 | です |
| 77 | `kerja_siswa_tanya_tugas_ulang` | の 説明 を 聞き逃した ので 課題 の 範囲 を もう一度 教えて いただけます | か |
| 78 | `kerja_siswa_serahkan_tugas` | 課題 を 出しに 来た の です が 箱 で よろしい | でしょうか |
| 79 | `kerja_tanya_jadwal_shift` | 来月 の シフト は いつ 出る か 分かったら 教えて いただけます | か |
| 80 | `kerja_beritahu_akan_terlambat` | 乗り換え を 間違えた ので 始業 に 十分 ほど | 遅れます |
| 81 | `kerja_tanya_prioritas_dua_pekerjaan` | 二つ 同時 に は 進められない ので どちら を 先に すべき か 教えて いただけます | か |
| 82 | `kerja_minat_ikut_pelatihan` | 参加できる か 分からない の です が 研修 に 申し込んで も いい | でしょうか |
| 83 | `kerja_serahkan_hasil_ke_penerus` | まで 終わった ので 残り は 任せて も いい です | か |
| 84 | `kerja_bilang_mengerti_singkat` | 了解しました すぐ | 取りかかります |
| 85 | `kerja_minta_diperiksa_singkat` | 見て もらえます | か |
| 86 | `kerja_tanya_waktu_senggang` | の 午後 空いています | か |

Kuota terpenuhi: 86 dari 86. **Belum diperiksa mentok.** Angka ini kuota, bukan bukti bahwa
topiknya sudah habis, dan `../SPEC.md` T2 memisahkan keduanya.

Lawan bicara yang sudah dipakai: atasan 43, rekan 32, guru 6, klien 4, teman 1. Bentuk sopan 78,
biasa 8. Panjang 77, pendek 9.

Celah yang masih terbuka saat kuota penuh, diperiksa dengan mencari kata kuncinya di berkas ini,
bukan dari ingatan:

| Celah | Buktinya |
|---|---|
| meminta contoh saat penjelasannya terlalu umum | tidak ada kalimat yang memuat `たとえば` atau `例` |
| mengabarkan pekerjaan akan telat kepada klien, bukan perubahan isi | 4 kalimat ke klien ada, tetapi tidak satu pun membawa kabar mundurnya hasil |
| mengabarkan tidak masuk karena sakit | `体調` hanya muncul di `kerja_minta_pulang_cepat`, yang artinya pulang lebih awal, bukan tidak masuk |
| berbicara dengan teman setingkat | hanya 1 kalimat ber-`rel` teman |

Kalau topik ini dibuka lagi, empat baris itu yang pertama ditulis, bukan mengulang keadaan yang
sudah ada. Kalimat baru juga harus menghindari kerangka di tabel atas: `check.js` bagian `distinct`
menangkap kerangka yang sama dengan predikat yang sama setelah bendanya dibuang.

## Sisa yang harus ditulis

0 kalimat. Kuota 86 sudah penuh.

Kalau nanti dibuka lagi, urutan yang disarankan: keadaan yang paling sering dulu, lalu yang
jarang. Slot `bertanya`, `menjawab`, dan `menerima` lebih dulu daripada `rencana` dan `lampau`.
