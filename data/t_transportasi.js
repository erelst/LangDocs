/* Transportasi: getting from one place to another on public transport.
 *
 * Asking the way on foot is in the `jalan` topic; what someone does after getting off belongs
 * to that errand's own topic.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menanyakan jalur, peron, dan kapan harus turun
 * - menanyakan apakah kereta atau bus ini menuju tempat tertentu
 * - menjelaskan bahwa akan terlambat, memberi tahu dari kendaraan
 * - ketinggalan kendaraan dan mencari jalan keluar
 * - meminta tukar tempat, meminta lewat, meminta bantuan membawa barang
 * - menanyakan tiket, isi ulang kartu, salah naik
 * - mengabarkan macet atau kendaraan yang tidak datang
 * - janji bertemu di stasiun dan menyesuaikan tempatnya
 * Tidak termasuk:
 * - berjalan di luar dan menanyakan arah, masuk ke `jalan`
 * - urusan yang dikerjakan setelah turun, masuk ke topik urusan itu
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `transportasi` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
