/* Belanja: what a person actually says in a shop, in order.
 *
 * Written to the standard the reader set with the restaurant sentence: a sentence should SAY
 * something. It should state a need, explain a reason, or open a conversation, and a long
 * sentence should be long because it carries more meaning rather than because a connector
 * was bolted on. So most of what is here is a sentence with a reason in it.
 *
 * The short ones are kept only where the short one is what people really say and a longer
 * version would be strange: 「これ、ください。」 is how you buy something.
 *
 * t holds the surfaces in order; data/lexicon.js supplies the romaji and the two glosses, and
 * punctuation rides on the word before it.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menanyakan barang yang tidak terlihat, dengan menyebut keperluannya
 * - menanyakan harga, ukuran, warna, dan stok
 * - meminta potongan, menanyakan obral, menanyakan kapan barang masuk
 * - memutuskan: mengambil, meninggalkan, menunda pembelian
 * - membayar: cara bayar, uang kurang, minta struk, minta kantong
 * - mengembalikan dan menukar barang, termasuk yang rusak
 * - menanyakan garansi, tanggal kedaluwarsa, dan pengiriman
 * - kejadian di toko: antrean, keranjang, petugas yang menawarkan bantuan
 * Tidak termasuk:
 * - memasak dan makan bahan yang dibeli, masuk ke `makan`
 * - mengurus tagihan rumah tangga, masuk ke `rumah_tugas`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `belanja` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
