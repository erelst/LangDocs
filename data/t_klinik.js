/* Klinik: the doctor and the pharmacy.
 *
 * Telling the family you feel ill is in rumah_santai and buying medicine as an ordinary
 * purchase is in belanja; this file is the appointment itself.
 *
 * The quota is small because 療養 is 0,92% of recorded talk, and the whole topic is one shape:
 * the patient describes, the doctor decides. There is no invitation slot, and that absence is
 * stated here rather than left as a hole.
 *
 * Cakupan topik, dipindahkan dari docs/topics/ yang sekarang dihapus. Daftar ini yang
 * dipakai saat memutuskan sebuah narasi masuk ke berkas topik mana.
 *
 * Termasuk:
 * - menyebut gejala, lamanya, dan apa yang sudah dicoba
 * - menjawab pertanyaan dokter: kapan mulai, di mana sakitnya, seberapa sakit
 * - menanyakan obat: cara minum, efek samping, boleh atau tidak dengan obat lain
 * - menyebut alergi dan penyakit yang pernah dialami
 * - meminta surat keterangan, meminta rujukan, menanyakan biaya
 * - di apotek: menebus resep, menanyakan obat yang dijual bebas
 * Tidak termasuk:
 * - menceritakan sakit ke keluarga di rumah, masuk ke `rumah_santai`
 * - membeli obat sebagai belanja biasa, masuk ke `belanja`
 */
window.BANK = (window.BANK || []).concat([
  // Narasi untuk topik `klinik` ditulis di sini, satu entri per narasi.
  // Bentuknya ada di data/bank.js. Setiap narasi wajib punya `jenis` yang berbeda dari
  // narasi sebelumnya di topik ini, dan judulnya dicatat di docs/JUDUL.md.
]);
