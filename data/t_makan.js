/* Makan: everything around eating, from ordering to what is said at the table.
 *
 * The measurement behind the quota is 自宅×食事 9,72% plus 公共商業施設×食事 4,37% plus the two smaller 食事
 * cells, which makes this the second largest topic after kerja.
 *
 * Two settings are kept apart here on purpose. At a table in a restaurant the reader is a
 * customer speaking to staff, so nearly every sentence is polite. At home it is family, so
 * almost none are. A deck that taught only one of the two would teach half of what eating
 * actually sounds like, and the register check would have nothing to compare.
 *
 * Shopping for ingredients is in data/t_belanja.js and cooking as a chore is in the rumah_tugas
 * topic; this file is the table itself.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - memesan di restoran, termasuk menanyakan yang tidak ada di menu
 * - menanyakan isi makanan, menanyakan bahan, menyebut alergi
 * - meminta perubahan pesanan, meminta tambah, meminta bungkus
 * - menawarkan makanan ke orang lain, dan menolak tawaran makanan
 * - memuji makanan, mengeluh makanan, membandingkan dengan yang pernah dimakan
 * - membayar bersama, membagi tagihan, menawarkan membayar
 * - mengajak makan, menolak ajakan makan
 * - di rumah: menyebut masakannya, menanyakan kapan makan, memanggil makan
 * - menyebut kebiasaan makan, diet, tidak makan sesuatu
 * - menanyakan rekomendasi dan menanyakan porsi
 * Tidak termasuk:
 * - berbelanja bahan makanan, masuk ke `belanja`
 * - memasak sebagai pekerjaan rumah, masuk ke `rumah_tugas`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `makan` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
