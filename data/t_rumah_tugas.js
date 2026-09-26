/* Rumah tangga: the chores, said to the people you live with.
 *
 * 自宅×家事・雑事 10,24% plus 自宅×身周りの用事 3,96%, and 65% of it is spoken to family, which is why this
 * topic is mostly plain speech: a deck that wrote these politely would teach a register
 * nobody uses in their own kitchen. The four slots that go to a neighbour, a courier or a
 * repair person are polite, and they are marked that way.
 *
 * Cooking and eating are in data/t_makan.js and relaxing after the chores is in the
 * rumah_santai topic; this file is the work itself.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - membagi pekerjaan rumah dan menagih janji yang belum dikerjakan
 * - meminta tolong saat sedang sibuk, dan menjelaskan kenapa harus sekarang
 * - mengurus tagihan, surat, dan berkas: membayar, memberi tahu sudah dibayar
 * - menjemur, mencuci, membersihkan, membuang sampah, membeli keperluan habis
 * - memberi tahu pekerjaan sudah selesai, dan menyebut apa yang belum
 * - memperbaiki barang yang rusak, memanggil tukang
 * - mengingatkan tugas orang lain tanpa membuatnya tersinggung
 * - menolak mengerjakan sesuatu sekarang, dengan alasan dan tawaran waktu lain
 * Tidak termasuk:
 * - masak dan makan sebagai acara, masuk ke `makan`
 * - waktu santai di rumah setelah pekerjaan selesai, masuk ke `rumah_santai`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `rumah_tugas` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
