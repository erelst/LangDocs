/* Kerja: what is said at work, in the order it happens.
 *
 * The biggest topic by measurement (仕事・学業 is 22,88% of recorded conversations, the largest
 * single cell in the survey), so it is written in batches and each batch is checked before
 * the next one.
 *
 * The reader's standard holds here as everywhere: a sentence says something. Most of these
 * carry a reason (ので, から) or a condition (たら, れば, と), because that is what makes one
 * sentence instead of two, and the ones that do not say so with が or けど.
 *
 * Register matters more in this topic than anywhere else, so both directions are written out:
 * said to a superior, and said to someone the same level. The relationship names who it is
 * said to; data/lexicon.js supplies the romaji and the two glosses.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - meminta sesuatu dikerjakan, dan meminta dengan halus saat orangnya lebih senior
 * - melaporkan hasil, termasuk melaporkan yang belum selesai
 * - mengabarkan masalah lebih awal, sebelum orang lain menemukannya
 * - menolak tugas atau tenggat, dengan alasan yang bisa diperiksa
 * - meminta tenggat, meminta perpanjangan, menawar prioritas
 * - mengoreksi pekerjaan orang lain tanpa menyerang orangnya
 * - menyanggah pendapat atasan, dan menyanggah pendapat rekan
 * - mengaku belum paham, meminta diulang, meminta contoh
 * - meminta izin pulang lebih awal, izin tidak masuk, izin cuti
 * - menanyakan jadwal, pembagian tugas, siapa yang bertanggung jawab
 * - di rapat: menyampaikan pendapat, menyela dengan halus, meringkas, menutup
 * - di sekolah: bertanya ke guru, meminta perpanjangan tugas, meminta rekomendasi
 * - mengajak makan siang, mengajak pulang bersama
 * - menerima koreksi, menerima tugas tambahan, menolak pujian dengan sopan
 * Tidak termasuk:
 * - urusan pribadi yang kebetulan terjadi di kantor, misalnya menelepon keluarga, masuk ke `telepon`
 * - perjalanan ke dan dari kantor, masuk ke `transportasi`
 * - makan siangnya sendiri sebagai acara makan, masuk ke `makan`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `kerja` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
