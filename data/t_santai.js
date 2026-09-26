/* Santai: time off away from home, alone or with other people.
 *
 * Walking with no destination is in the `jalan` topic and relaxing at home is in rumah_santai;
 * this file is going out for something.
 *
 * The topic splits by how well the two people know each other rather than by activity, which is
 * why the same invitation appears twice: 誘ってみる to someone new is careful and hedged, and the
 * same invitation to a close friend is two words long.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - mengajak keluar dan merinci acaranya
 * - memilih tempat bersama dan menyesuaikan selera
 * - menceritakan hobi dan menanyakan hobi orang lain
 * - berolahraga: mengajak, menolak, mengeluh capek
 * - menonton, mendengarkan, membaca: bertukar pendapat tentang isinya
 * - memesan tempat, menanyakan jam buka, menanyakan tarif
 * - mengajak orang yang belum akrab supaya tidak terasa memaksa
 * - menutup acara: berterima kasih, mengantar pulang
 * Tidak termasuk:
 * - berjalan tanpa tujuan dan berpapasan di jalan, masuk ke `jalan`
 * - bersantai di rumah, masuk ke `rumah_santai`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `santai` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
