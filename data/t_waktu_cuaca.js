/* Waktu dan cuaca: the weather, the hour and the day, as things people talk about.
 *
 * The hard part of this topic is that it is nearly always the opening of a conversation rather
 * than its subject, so most of these are short and most of them are paired: the same
 * greeting to a colleague and to a client.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - sapaan berdasarkan waktu hari, dan perbedaannya dengan rekan akrab
 * - menyebut hari, tanggal, dan jam dalam percakapan, bukan sebagai angka
 * - mengaitkan cuaca dengan rencana: mengubah, menunda, membatalkan
 * - menyesuaikan janji dengan cuaca dan jam sibuk
 * - menanyakan perkiraan cuaca dan menyampaikan apa yang didengar
 * - mengucapkan sesuatu saat cuaca berubah mendadak
 * Tidak termasuk:
 * - menyusun acara yang bergantung cuaca, masuk ke `santai` atau `jalan`
 * - jadwal kerja atau sekolah, masuk ke `kerja`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `waktu_cuaca` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
