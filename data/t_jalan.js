/* Jalan: on foot, outside, on the way somewhere.
 *
 * Being inside a vehicle is transportasi and a planned outing is santai; this file is what is
 * said while walking.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menanyakan arah ke orang yang tidak dikenal, dan memberi arah
 * - berpapasan dengan orang yang dikenal dan berbasa-basi
 * - menunggu di luar, mengabarkan bahwa sudah sampai
 * - menyesuaikan rencana karena cuaca saat berjalan
 * - mengantar dan menjemput, menanyakan sudah di mana
 * - mengeluh cuaca saat berjalan, memuji cuaca
 * Tidak termasuk:
 * - di dalam kendaraan, masuk ke `transportasi`
 * - acara waktu luang yang sudah direncanakan, masuk ke `santai`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `jalan` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
