/* Rumah santai: the house after the chores are done.
 *
 * 自宅×休息 8,82% plus two small cells, and 59% of it is spoken to family, so this is almost all
 * plain speech: nobody says お疲れ様です to their own partner on the sofa. The polite edge is the
 * relative who visits.
 *
 * chores are in data/t_rumah_tugas.js and eating is in data/t_makan.js; this file is the rest.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - mengeluh capek dan meminta waktu sendiri
 * - menceritakan hari yang baru lewat dengan isi, bukan hanya "capek"
 * - mengajak istirahat, mengajak tidur, mengajak menonton
 * - menolak ajakan keluar karena mau diam di rumah
 * - menanyakan kabar anggota keluarga yang lain
 * - menceritakan hal yang baru diketahui, memberi tahu sesuatu yang menarik
 * - menenangkan orang yang sedang kesal, menerima keluhan orang lain
 * - menutup hari: mengucapkan selamat tidur, mengucapkan sampai besok
 * Tidak termasuk:
 * - pekerjaan rumah, masuk ke `rumah_tugas`
 * - makan sebagai acara, masuk ke `makan`
 * - waktu luang di luar rumah, masuk ke `santai`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `rumah_santai` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
