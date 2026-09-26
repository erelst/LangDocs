/* Telepon: the call itself, whatever the call is about.
 *
 * 遠隔通信 is 9,75% of all recorded talk and cuts across every other topic, so this file is what is
 * said because it is a phone call: who is calling, whether now is a good time, hearing the
 * other person badly, taking a message, being put through, and getting off the line. What
 * the call is about stays in its own topic.
 *
 * Nearly all of it is polite, and for a reason the other topics do not have: whoever answers is
 * often not the person being called, so even a call to a friend starts through a stranger.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - membuka telepon: menyebut diri, menanyakan apakah waktunya tepat
 * - meminta bicara dengan orang lain, dan menyampaikan bahwa orangnya tidak ada
 * - meninggalkan pesan, meminta pesan diteruskan
 * - tidak terdengar, minta diulang, menelepon ulang
 * - salah sambung dan menutupnya dengan sopan
 * - menutup telepon: meringkas, memastikan, mengucapkan terima kasih
 * - menjelaskan bahwa sedang dalam perjalanan, memberi tahu akan terlambat
 * - menelepon kembali orang yang tadi tidak terjawab
 * Tidak termasuk:
 * - isi pembicaraannya sendiri, yang tetap mengikuti topik asalnya
 * - surat dan berkas tertulis
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `telepon` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
