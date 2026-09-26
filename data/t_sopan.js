/* Sopan: agreement, reaction and the small courtesies that keep a conversation going.
 *
 * It cuts across every other topic, because agreeing, being surprised, asking for a repeat and
 * getting off the phone happen inside all of them. What the conversation is about stays in
 * its own topic; this file is the machinery.
 *
 * The register is not a variant of this topic, it is the subject. So the same state is written
 * twice wherever the two versions are genuinely different words rather than one ending
 * swapped: そうですね against そうだね, and とんでもないです against とんでもない.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menyetujui dan menyetujui dengan ragu
 * - terkejut, tidak percaya, dan menanggapinya
 * - meminta diulang karena tidak terdengar atau tidak dimengerti
 * - menyela pembicaraan dengan halus dan mengambil alih giliran bicara
 * - menutup pembicaraan tanpa memutusnya
 * - memuji, dan menanggapi pujian tanpa terdengar sombong
 * - meminta maaf untuk hal kecil, dan menanggapi permintaan maaf
 * - menyampaikan bahwa tidak nyaman, tanpa menyalahkan
 * - mengucapkan terima kasih, dan menanggapinya
 * - meminta waktu untuk berpikir sebelum menjawab
 * Tidak termasuk:
 * - sapaan berdasarkan waktu hari, masuk ke `waktu_cuaca`
 * - isi percakapan yang sedang berlangsung, yang tetap mengikuti topik asalnya
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `sopan` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
