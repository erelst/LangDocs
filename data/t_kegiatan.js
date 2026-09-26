/* Kegiatan: neighbourhood and group activities, where almost nobody knows each other well.
 *
 * Paid work is kerja and going out with friends is santai; this file is the community centre
 * and the school meeting.
 *
 * It is the only topic where the group matters as much as the individual: 社会参加 and 課外活動 are the
 * cells behind it, and one person in three is talking to more than one listener, the highest
 * of any topic. That is why introducing yourself and volunteering for a job are here.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - kegiatan lingkungan: kerja bakti, rapat RT, membagi undangan
 * - kegiatan sekolah anak: pertemuan orang tua, kegiatan kelas, membawa perlengkapan
 * - kegiatan kelompok: kursus, klub, kegiatan sukarela
 * - memperkenalkan diri di kelompok yang belum dikenal
 * - mengajukan diri untuk tugas, dan menolak dengan alasan yang jelas
 * - menanyakan jadwal, tempat, dan apa yang perlu dibawa
 * Tidak termasuk:
 * - pekerjaan berbayar, masuk ke `kerja`
 * - acara waktu luang bersama teman, masuk ke `santai`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `kegiatan` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
