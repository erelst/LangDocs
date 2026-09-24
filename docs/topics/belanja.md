<!-- Dihasilkan bersama docs/README.md. Perbarui berkas ini setiap kali topik ditulis. -->

# Topik: `belanja`

| | |
|---|---|
| Judul | Belanja |
| Kuota | 21 |
| Sudah ditulis | 21 |
| Sisa | **0** |
| Kerangka lintas topik | tidak |
| Berkas | `data/t_belanja.js` |

Kuota dihitung di `../README.md` dari sel: 公共商業施設×家事・雑事 4,98% + 公共商業施設×身周りの用事 0,51% + それ以外の屋外×家事・雑事 0,69% + それ以外の屋内×家事・雑事 0,53%.

## Keadaan yang dicakup

| | |
|---|---|
| Lawan bicara | petugas toko 54%, keluarga 13%, teman 8% |
| Bentuk | 用談・相談 58,7%, 雑談 41,0% |
| Jumlah lawan | satu lawan bicara 71% |

## Batas topik

**Termasuk:**

- menanyakan barang yang tidak terlihat, dengan menyebut keperluannya
- menanyakan harga, ukuran, warna, dan stok
- meminta potongan, menanyakan obral, menanyakan kapan barang masuk
- memutuskan: mengambil, meninggalkan, menunda pembelian
- membayar: cara bayar, uang kurang, minta struk, minta kantong
- mengembalikan dan menukar barang, termasuk yang rusak
- menanyakan garansi, tanggal kedaluwarsa, dan pengiriman
- kejadian di toko: antrean, keranjang, petugas yang menawarkan bantuan

**Tidak termasuk:**

- memasak dan makan bahan yang dibeli, masuk ke `makan`
- mengurus tagihan rumah tangga, masuk ke `rumah_tugas`

## Ruang ucapan

Ketentuan T3 di `../SPEC.md`: tiap slot ada dalam bentuk sopan dan biasa. `sopan`/`biasa` di bawah berarti pasangan itu sudah, atau `-` berarti slotnya memang lewat.

- **bertanya** — sopan: tanya harga, ukuran, stok, garansi, kedaluwarsa. Biasa: -.
- **menjawab** — sopan: petugas menjawab pertanyaan pembeli. Biasa: -.
- **mengajak** — sopan: mengajak teman memilih, mengajak melihat yang lain. Biasa: -.
- **menerima** — sopan: menerima tawaran petugas, menerima saran warna. Biasa: -.
- **menolak halus** — sopan: menolak bantuan, menolak kantong, membatalkan pembelian. Biasa: -.
- **rencana** — sopan: membandingkan harga, menunda pembelian, memesan lebih dulu. Biasa: -.
- **lampau** — sopan: melaporkan barang yang dibeli kemarin, menceritakan yang terjadi di rumah. Biasa: -.
- **minta tolong** — sopan: minta dikirim, minta ditukar, minta struk, minta cek stok. Biasa: -.
- **menjelaskan** — sopan: menjelaskan keperluan, menjelaskan kenapa barangnya tidak cocok. Biasa: -.
- **sopan** — sopan: ke petugas toko, ke kasir. Biasa: -.
- **biasa** — sopan: ke teman saat berbelanja bersama. Biasa: -.

## Kerangka yang sudah diklaim

Dihitung dengan cara yang sama seperti `check.js`: semua token, kecuali kata yang masuk daftar `SHAPE` dan tanda baca, digabung dengan predikat terakhir dipisah. Dua puluh satu kalimat, dua puluh satu kerangka, tidak ada yang sama.

| # | Kalimat | Kerangka |
|---|---|---|
| 1 | `belanja_tanya_ada_tidak` すみません、折りたたみの傘を探しているのですが、こちらで売っていますか。 | すみません 折りたたみ の 傘 を 探している の です が こちら で 売っています | か |
| 2 | `belanja_tanya_harga_alasan` これはいくらですか。隣の店と比べたいのですが。 | は いくら です か 隣 の 店 と 比べたい の です | が |
| 3 | `belanja_tanya_ukuran_alasan` これは少し小さいのですが、一つ上のサイズはありますか。 | は 小さい の です が 一つ 上 の サイズ は あります | か |
| 4 | `belanja_coba_pakaian` サイズが合うか確かめたいので、試着してもいいですか。 | サイズ が 合う か 確かめたい ので 試着 して も いい です | か |
| 5 | `belanja_bilang_terlalu_mahal` これはこの大きさで高すぎるから、別のを見よう。 | は 大きさ で 高すぎる から 別 の を | 見よう |
| 6 | `belanja_minta_diskon_halus` 二つ買うなら、少し安くしてもらえますか。 | 二つ 買う なら 安く して もらえます | か |
| 7 | `belanja_bayar_kartu` 包む前に、ここでカードが使えますか。 | 包む 前 に で カード が 使えます | か |
| 8 | `belanja_minta_struk_alasan` 会社に出すのですが、領収書をいただけますか。 | 会社 に 出す の です が 領収書 を いただけます | か |
| 9 | `belanja_tukar_barang` 昨日ここで買ったのですが、サイズが合わなかったので、交換してもらえますか。 | で 買った の です が サイズ が 合わなかった ので 交換 して もらえます | か |
| 10 | `belanja_minta_refund` 家で箱を開けたら、中が壊れていたので、返金していただけますか。 | 家 で 箱 を 開けたら 中 が 壊れていた ので 返金 して いただけます | か |
| 11 | `belanja_tanya_garansi` 長く使うものなので、もし壊れたら、保証はついていますか。 | 長く 使う もの なので もし 壊れた ら 保証 は ついています | か |
| 12 | `belanja_tanya_kadaluarsa` この牛乳はいつまでですか。来週まで使わないのですが。 | 牛乳 は いつ まで です か まで 使わない の です | が |
| 13 | `belanja_uang_kurang` 百円足りないので、これはやめておきます。 | 百円 足りない ので は やめて | おきます |
| 14 | `belanja_minta_kantong_tidak` 自分の袋を持ってきたので、要りません。 | 自分 の 袋 を 持って きた ので | 要りません |
| 15 | `belanja_kasir_arah_bayar` ここは混んでいますから、あちらのレジでお願いします。 | は 混んでいます から あちら の レジ で | お願いします |
| 16 | `belanja_petugas_tawarkan` もう少し明るい色の方が、お似合いかと思いますが。 | 明るい 色 の 方 が お似合い か と 思います | が |
| 17 | `belanja_bilang_sudah_cukup` ありがとうございます、もう少し見てから決めたいのですが。 | ありがとう ございます 見て から 決めたい の です | が |
| 18 | `belanja_obral_penuh` 在庫がないなら、次はいつ入りますか。 | 在庫 が ない なら 次 は いつ 入ります | か |
| 19 | `belanja_antar_sampai_rumah` 大きくて持って帰れないので、配達してもらえますか。 | 大きくて 持って 帰れない ので 配達 して もらえます | か |
| 20 | `belanja_keranjang_kosong` 買い物かごを探しているのですが、どこにありますか。 | 買い物かご を 探している の です が どこ に あります | か |
| 21 | `belanja_bilang_mau_bayar` これをお願いします。 | を | お願いします |

Kerangka yang masih terbuka untuk topik ini, asal tidak bertabrakan dengan dua puluh satu di atas:

- menanyakan sebelum memutuskan, dengan alasan yang disebut lebih dulu
- membandingkan dua pilihan dan meminta pendapat
- melaporkan barang yang tidak sesuai setelah dipakai di rumah
- menanyakan apakah bisa dipesan lebih dulu
- meminta dihubungi kalau barangnya sudah datang
- menjelaskan keperluan supaya mendapat barang yang tepat, bukan yang paling dekat

## Sisa yang harus ditulis

0 kalimat.

Urutan yang disarankan: keadaan yang paling sering dulu, lalu yang jarang. Slot `bertanya`, `menjawab`, dan `menerima` lebih dulu daripada `rencana` dan `lampau`.
