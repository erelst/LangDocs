/* The page's single source of truth for colour and for the two register labels.
 *
 * Everything here is used by app.js; nothing is duplicated in index.html. The palette and
 * the underline styles are shared between the kanji line and the romaji line, so token i
 * has the same colour on both and the reader can follow a word across the two lines.
 */
window.CONST = {
  /* Surfaces. The panel is deliberately darker than the card, and because the two are so
   * close the visible separation is carried by the outline, not by the fill. */
  bg: '#0b1220',
  bgPanel: '#070c14',
  bgPanelEdge: '#4a5a72',
  edge: '#334155',
  edgeSoft: '#334155',
  accent: '#38bdf8',

  /* Text */
  text: '#e5e7eb',
  textDim: '#94a3b8',
  bright: '#f8fafc',
  inkOnChip: '#0b1220',

  /* Per-word colour and underline. Ten of each, so a sentence of ten words shows ten
   * distinct colours; a longer one starts the cycle again, which is the honest limit of
   * what colour can distinguish. */
  palette: [
    '#7ec699', '#f0a06a', '#7ab8e8', '#c79ae0', '#e0c46a',
    '#f08aab', '#6fd0d0', '#a99ae0', '#d0a06a', '#9ad07a'
  ],
  underlines: ['solid', 'dashed', 'dotted', 'double', 'wavy'],

  /* Register: green for someone close, yellow for someone distant. Used only inside the
   * opened panel, so every card looks identical until it is opened. */
  who: { dekat: '#86efac', asing: '#fcd34d' },

  /* Who the sentence is said to. A sentence names its relationship ("tetangga") and both
   * the label and the register colour follow from here, so no sentence repeats them and
   * the same relationship is worded identically wherever it appears.
   *
   * close: true -> green chip (someone you know), false -> yellow chip (someone you do
   * not). That split is the one thing the card shows before it is opened. */
  rel: {
    tetangga:        { id: 'tetangga', en: 'neighbour', close: true },
    teman:           { id: 'teman', en: 'friend', close: true },
    teman_dekat:     { id: 'teman dekat', en: 'close friend', close: true },
    keluarga:        { id: 'keluarga', en: 'family', close: true },
    pasangan:        { id: 'pasangan', en: 'partner', close: true },
    rekan:           { id: 'rekan kerja', en: 'colleague', close: true },
    sekamar:         { id: 'teman sekamar', en: 'roommate', close: true },
    teman_sekolah:   { id: 'teman sekelas', en: 'classmate', close: true },
    guru:            { id: 'guru', en: 'teacher', close: false },
    atasan:          { id: 'atasan', en: 'superior at work', close: false },
    klien:           { id: 'klien', en: 'client', close: false },
    orang_asing:     { id: 'orang asing di jalan', en: 'a stranger on the street', close: false },
    petugas_toko:    { id: 'petugas toko', en: 'shop attendant', close: false },
    petugas_stasiun: { id: 'petugas stasiun', en: 'station staff', close: false },
    pelayan:         { id: 'pelayan', en: 'waiting staff', close: false },
    apoteker:        { id: 'apoteker', en: 'pharmacist', close: false },
    dokter:          { id: 'dokter', en: 'doctor', close: false },
    kurir:           { id: 'kurir pengantar', en: 'delivery courier', close: false },
    tetangga_baru:   { id: 'tetangga yang baru dikenal', en: 'a neighbour you just met', close: false }
  },

  countWord: 'kalimat / sentences',
  scrollHint: 'gulir untuk memuat lagi / scroll for more'
};

/* The measured partner distribution, and which `rel` keys make up each group. The groups are the
 * survey's own grouping, so the deck's spread can be read against it directly.
 *
 * It lives here rather than in check.js because two files depend on it now: check.js prints the
 * spread with it, and test.js checks that the documented table still matches the data with it.
 * `measured` is a percentage of the 10.708 partner slots in data/survey.zip. */
window.CONST.surveyWho = {
  groups: {
    'close family': ['keluarga', 'pasangan'],
    'work and study': ['rekan', 'atasan', 'klien'],
    'friends and neighbours': ['teman', 'teman_dekat', 'tetangga', 'tetangga_baru', 'sekamar', 'teman_sekolah'],
    'public and service': ['petugas_toko', 'pelayan', 'petugas_stasiun', 'apoteker', 'dokter', 'kurir'],
    'teacher and pupil': ['guru'],
    'stranger': ['orang_asing']
  },
  /* Keyed by the label used in docs/README.md, which is also the key of `groups`. */
  measured: {
    'close family': 36.8,
    'work and study': 22.7,
    'friends and neighbours': 17.2,
    'public and service': 10.8,
    'teacher and pupil': 3.1,
    'stranger': 2.4
  },
  /* The two groups the deck deliberately does not write, each with its reason, so a thin group is
   * reported as a decision rather than left looking like an oversight. */
  notWritten: {
    'teacher and pupil': 'classroom-only wording, deliberately not a topic',
    'relative': 'a distant relative is a rarer case of family, which has its own sentences'
  }
};
