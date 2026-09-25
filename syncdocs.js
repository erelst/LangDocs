#!/usr/bin/env node
/* Salin angka terukur dari check.js ke dokumen. Usage: node syncdocs.js
 *
 * Ini bagian yang MENULIS, sedangkan check.js dan test.js MEMERIKSA. Yang ditulis hanya angka yang
 * punya satu sumber: keluaran check.js (medan makna dan angka K10), data yang sama dengan test.js
 * (tabel sebaran lawan bicara dan jumlah kalimat per topik).
 *
 * Kenapa berkas ini ada: angka-angka itu ditulis tangan enam kali berturut-turut, dan hampir
 * setiap kali ada satu yang salah. Yang salah bukan aritmetikanya, melainkan hal yang tidak bisa
 * dihitung ulang di kepala: poin sebaran bergerak dua arah karena penyebutnya tumbuh, dan jumlah
 * kalimat per topik berubah setiap kali satu kalimat ditambahkan. Keduanya sekarang disalin.
 *
 * Sifatnya: berhenti pada ketidakcocokan pertama, tidak menulis apa pun sebelum semuanya cocok.
 * Menulis separuh angka lebih berbahaya daripada tidak menulis, karena angkanya terlihat baru
 * padahal sebagian masih lama.
 */

const fs = require('fs'), { execFileSync } = require('child_process');
const out = execFileSync('node', ['check.js'], { encoding: 'utf8' });
const die = m => { console.error('GAGAL: ' + m); process.exit(1); };
/* Semua tulisan ditahan sampai seluruh berkas selesai diperiksa. Menulis lebih dulu
 * membuat kegagalan di berkas terakhir meninggalkan berkas pertama sudah berubah, dan
 * berkas yang separuh baru lebih berbahaya daripada yang belum disentuh sama sekali. */
const pending = {};
/* Satu jalur tulis. Setiap tahap membaca lewat read() di bawah, supaya perubahan yang sudah
 * dihitung tidak hilang waktu tahap berikutnya membaca ulang dari disk dan menimpa hasilnya.
 * Bug itu nyata: dua kerusakan di berkas yang sama sempat saling menimpa. */
const read = f => (f in pending ? pending[f] : fs.readFileSync(f, 'utf8'));
const c = v => v.replace('.', ',');

// --- medan makna di README ---
const fields = [];
for (const m of out.matchAll(/^ {2}(\w+) +(\d+)\/(\d+) +celah +(\d+) kalimat(.*)$/gm)) {
  const ready = (m[5].match(/siap: ([^|]*)/) || [, ''])[1].trim();
  const need = (m[5].match(/perlu entry: (.*)/) || [, ''])[1].trim();
  fields.push({ name: m[1], have: +m[2], total: +m[3], gap: +m[4],
                ready: ready === '-' ? 0 : ready.split(/\s+/).filter(Boolean).length,
                need: need ? need.split(/\s+/).filter(Boolean).length : 0 });
}
if (fields.length !== 14) die(`${fields.length} field terbaca, bukan 14`);
let readme = read('docs/README.md');
for (const f of fields) {
  const cur = new RegExp('^\\| `' + f.name + '` \\|( \\d+ \\|){5}$', 'm');
  if (!cur.test(readme)) die(`baris medan ${f.name} tidak ada`);
  readme = readme.replace(cur, `| \`${f.name}\` | ${f.have} | ${f.total} | ${f.gap} | ${f.ready} | ${f.need} |`);
}
const sum = k => fields.reduce((a, f) => a + f[k], 0);
const totCur = /^\| \*\*Jumlah\*\* \|( \*\*\d+\*\* \|){5}$/m;
if (!totCur.test(readme)) die('baris Jumlah tidak ada');
readme = readme.replace(totCur, `| **Jumlah** | **${sum('have')}** | **${sum('total')}** | **${sum('gap')}** | **${sum('ready')}** | **${sum('need')}** |`);
pending['docs/README.md'] = readme;
console.log(`README: ${fields.length} baris medan + jumlah = ${sum('have')}/${sum('total')}, celah ${sum('gap')}`);


// --- tabel sebaran lawan bicara (README + SPEC) dan jumlah kalimat per topik ---
{
  const w = {};
  const win = new Function('window', fs.readFileSync('const.js', 'utf8') + fs.readFileSync('coverage.js', 'utf8')
    + fs.readFileSync('data/curated.js', 'utf8') + fs.readFileSync('data/lexicon.js', 'utf8')
    + fs.readFileSync('data/bank.js', 'utf8')
    + fs.readdirSync('data').filter(f => /^t_.*\.js$/.test(f)).map(f => fs.readFileSync('data/' + f, 'utf8')).join(''));
  const W = new Function('const c = {}; const window = { CONST: {}, LEX: {}, COVERAGE: {}, BANK: [], CURATED: [] };'
    + fs.readFileSync('const.js', 'utf8') + fs.readFileSync('data/curated.js', 'utf8')
    + fs.readFileSync('data/lexicon.js', 'utf8') + fs.readFileSync('data/bank.js', 'utf8')
    + fs.readdirSync('data').filter(f => /^t_.*\.js$/.test(f)).map(f => fs.readFileSync('data/' + f, 'utf8')).join('')
    + '; return window;')();
  const bank = W.BANK || [];
  const rel = new Map();
  for (const s of bank) rel.set(s.rel, (rel.get(s.rel) || 0) + 1);
  const n = bank.length;
  const c2 = v => v.toFixed(1).replace('.', ',');
  const lbl = { 'close family': ['keluarga dekat (`家族` + `親戚`)', ['keluarga', 'pasangan']],
                'work and study': ['kerja & belajar (`仕事学業`)', ['rekan', 'atasan', 'klien']],
                'friends and neighbours': ['teman & tetangga (`友人知人` + `顔見知り`)', ['teman', 'tetangga', 'tetangga_baru']],
                'public and service': ['publik & jasa (`公共商業関係`)', ['petugas_toko', 'pelayan', 'dokter', 'petugas_stasiun', 'apoteker', 'kurir']],
                'teacher and pupil': ['guru-murid (`先生生徒`)', ['guru']],
                'stranger': ['orang asing (`見知らぬ人`)', ['orang_asing']] };
  const rows = [];
  for (const [grp, [name, mem]] of Object.entries(lbl)) {
    const count = mem.reduce((a, m) => a + (rel.get(m) || 0), 0);
    const share = 100 * count / n;
    const gap = share - W.CONST.surveyWho.measured[grp];
    const isi = mem.map(m => '`' + m + '` ' + (rel.get(m) || 0)).join(', ');
    rows.push({ name, measured: String(W.CONST.surveyWho.measured[grp]).replace('.', ','), deck: c2(share), gap, isi });
  }
  let r = read('docs/README.md');
  for (const row of rows) {
    const pat = new RegExp('^\\| ' + row.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ' \\| [\\d,]+% \\| [\\d,]+% \\| \\*{0,2}[+-]?[\\d,.]+\\*{0,2} \\|[^\\n]*', 'm');
    if (!pat.test(r)) die('baris tabel 3b di README tidak cocok: ' + row.name);
    const gapTxt = `**${row.gap >= 0 ? '+' : ''}${row.gap.toFixed(1).replace('.', ',')}**`;
    r = r.replace(pat, `| ${row.name} | ${row.measured}% | ${row.deck}% | ${gapTxt} | ${row.isi} |`);
  }
  r = r.replace(/Kolom Deck dihitung dari \d+ kalimat tertulis,/, `Kolom Deck dihitung dari ${n} kalimat tertulis,`);
  r = r.replace(/\| Kalimat di berkas topik \| yang tertulis di `data\/t_\*\.js` \| \*\*\d+\*\* \|/,
                `| Kalimat di berkas topik | yang tertulis di \`data/t_*.js\` | **${n}** |`);
  r = r.replace(/Angka itu berasal dari \d+ kalimat tertulis/, `Angka itu berasal dari ${n} kalimat tertulis`);
  pending['docs/README.md'] = r;

  let sp = read('docs/SPEC.md');
  /* SPEC memakai label pendek, tanpa isi per rel, dan selalu bertanda di kolom selisih.
   * Barisnya dicari dengan bentuk apa pun yang ada sekarang supaya skrip ini bisa dijalankan
   * berkali-kali tanpa merusak tabelnya sendiri. */
  for (const row of rows) {
    const short = row.name.split(' (')[0];
    const esc = short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pat = new RegExp('^\\| ' + esc + '(?: \\([^)]*\\))? \\| [\\d,]+% \\| [\\d,]+% \\| \\*{0,2}[+-]?[\\d,.]+\\*{0,2} \\|', 'm');
    if (!pat.test(sp)) die('baris tabel 3b di SPEC tidak cocok: ' + short);
    const gapTxt = `**${row.gap >= 0 ? '+' : ''}${row.gap.toFixed(1).replace('.', ',')}**`;
    sp = sp.replace(pat, `| ${short} | ${row.deck}% | ${row.measured}% | ${gapTxt} |`);
  }
  pending['docs/SPEC.md'] = sp;
  console.log(`tabel 3b: ${rows.length} baris di README + SPEC, penyebut ${n}`);
  /* "Sudah ditulis" per berkas topik: hitungannya dari berkas data yang sama, jadi topik yang
   * dapat kalimat baru tidak bisa meninggalkan angka lama di dokumennya. */
  /* Aturannya sama dengan test.js: hitungan = kalimat di berkas topik + angka yang diklaim
   * sendiri oleh baris "Dari `kurasi`" di dokumen itu. Membaca dari data kurasi akan salah
   * untuk topik yang tidak mengklaimnya. */
  const perTopic = new Map();
  for (const s of bank) perTopic.set(s.topic, (perTopic.get(s.topic) || 0) + 1);
  let touched = 0;
  for (const [topic, count] of perTopic) {
    const file = `docs/topics/${topic}.md`;
    if (!fs.existsSync(file)) continue;
    let t = read(file);
    const shown = t.match(/\| Sudah ditulis \| (\d+) \|/);
    if (!shown) continue;
    const claimed = t.match(/\| Dari `kurasi` \| (\d+) \|/);
    const want = count + (claimed ? Number(claimed[1]) : 0);
    if (Number(shown[1]) !== want) { pending[file] = t.replace(/\| Sudah ditulis \| \d+ \|/, `| Sudah ditulis | ${want} |`); touched++; }
  }
  console.log(`topik: ${touched} baris "Sudah ditulis" diperbarui`);

}

// --- daftar lawan bicara per topik di berkas topik ---
/* check.js sudah mencetaknya dengan nama tampilan yang sama, jadi baris ini disalin, bukan dihitung
 * lagi. Yang hanya bisa disalin adalah bagian daftarnya; sisanya ("Bentuk sopan", "Panjang", dan
 * sebagainya) tetap ditulis tangan karena bukan angka yang dicetak check.js. */
{
  const perTopic = {};
  const inBlock = out.split('who, per topic:')[1] || die('keluaran tidak memuat "who, per topic:"');
  for (const line of inBlock.split('\n')) {
    const m = line.match(/^ {2}(\w+) +(.*)$/);
    if (!m) { if (line.trim() === '') continue; if (/^\S/.test(line)) break; continue; }
    perTopic[m[1]] = m[2].trim();
  }
  let touched = 0, missing = 0;
  for (const [topic, list] of Object.entries(perTopic)) {
    const file = `docs/topics/${topic}.md`;
    if (!fs.existsSync(file)) continue;
    let t = read(file);
    const line = t.match(/^Lawan bicara yang sudah dipakai: [^\n]*$/m);
    if (!line) { missing++; continue; }
    const rest = line[0].slice('Lawan bicara yang sudah dipakai: '.length).split('. ').slice(1).join('. ');
    const want = `Lawan bicara yang sudah dipakai: ${list}.` + (rest ? ' ' + rest : '');
    if (line[0] !== want) { pending[file] = t.replace(line[0], want); touched++; }
  }
  console.log(`lawan bicara per topik: ${touched} baris disalin${missing ? `, ${missing} dokumen tanpa baris itu` : ''}`);
}

// --- angka K10 di SPEC ---
const g = re => { const m = out.match(re); if (!m) die('keluaran tidak memuat: ' + re); return m; };
const long = g(/keberagaman bentuk \((\d+) kalimat panjang\)/)[1];
const topEnd = g(/akhir teratas +(\S+) +\d+x +([\d.]+)%/);
const topOpen = g(/pembuka teratas +(\S+) +\d+x +([\d.]+)%/);
const shared = g(/akhir dipakai >1x +\d+x +([\d.]+)%/)[1];
const habits = g(/kebiasaan akhir +(\d+) pola/)[1];
const topRel = g(/relasi teratas +(\S+) +(\d+)x +([\d.]+)%/);
const cause = g(/berelasi sebab +\d+x +([\d.]+)%/)[1];
let spec = read('docs/SPEC.md');
/* Guard memeriksa BARISNYA ADA, bukan apakah teksnya berubah: kalau angkanya kebetulan sudah
 * benar, penggantian menghasilkan teks yang sama dan itu bukan kegagalan. */
const set = (pat, rep) => { if (!pat.test(spec)) die('baris SPEC tidak cocok: ' + pat); spec = spec.replace(pat, rep); };
set(/yang paling sering \| `[^`]+` [\d,]+% \|/, `yang paling sering | \`${topEnd[1]}\` ${c(topEnd[2])}% |`);
set(/dipakai lebih dari sekali \| [\d,]+% \|/, `dipakai lebih dari sekali | ${c(shared)}% |`);
set(/Pembuka kalimat yang paling sering \| `[^`]+` [\d,]+% \|/, `Pembuka kalimat yang paling sering | \`${topOpen[1]}\` ${c(topOpen[2])}% |`);
set(/dipakai 3 kali atau lebih \| \d+ pola \|/, `dipakai 3 kali atau lebih | ${habits} pola |`);
set(/Penanda relasi teratas \(`[^`]+`\) \| [\d,]+% \|/, `Penanda relasi teratas (\`${topRel[1]}\`) | ${c(topRel[3])}% |`);
set(/disambung \*\*sebab\*\* \| [\d,]+% \|/, `disambung **sebab** | ${c(cause)}% |`);
set(/\*\*\d+ dari \d+\*\* kalimat/, `**${topRel[2]} dari ${long}** kalimat`);
set(/\(\d+ kalimat panjang\)/, `(${long} kalimat panjang)`);
pending['docs/SPEC.md'] = spec;
console.log(`SPEC: 6 baris K10, panjang ${long}, sebab ${c(cause)}%`);

for (const [file, text] of Object.entries(pending)) fs.writeFileSync(file, text);
console.log(`${Object.keys(pending).length} berkas ditulis`);
