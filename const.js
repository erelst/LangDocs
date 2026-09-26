/* The page's single source of truth for colour, for the language-style labels, and for every
 * string the interface itself says.
 *
 * Everything here is used by app.js; nothing is duplicated in index.html. The palette and the
 * underline styles are shared between the kanji line and the romaji line, so token i has the
 * same colour on both and the reader can follow a word across the two lines.
 *
 * `rel` is shared with the reader's data files. A narrative names the person it is aimed at,
 * and a conversation names one per speaker, so the label and the register colour follow from
 * the same table and no narrative repeats them.
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

  /* The person a narrative is aimed at, and the colour the two-language line uses for it.
   * A narrative names its relationship ("tetangga") instead of its register, so the same
   * relationship is worded identically wherever it appears.
   *
   * `jp` is the surface the page shows instead of `id`/`en`: the label is about the Japanese text,
   * so it is written in the language being learned and carries a bubble like any other word. A
   * label of more than one word is written with a space between them, so the split is explicit
   * and never guessed.
   *
   * close: true -> green (someone you know), false -> yellow (someone you do not). */
  who: { dekat: '#86efac', asing: '#fcd34d' },
  rel: {
    tetangga:        { id: 'tetangga', en: 'neighbour', jp: '隣人', close: true },
    teman:           { id: 'teman', en: 'friend', jp: '友達', close: true },
    teman_dekat:     { id: 'teman dekat', en: 'close friend', jp: '親友', close: true },
    keluarga:        { id: 'keluarga', en: 'family', jp: '家族', close: true },
    pasangan:        { id: 'pasangan', en: 'partner', jp: '恋人', close: true },
    rekan:           { id: 'rekan kerja', en: 'colleague', jp: '同僚', close: true },
    sekamar:         { id: 'teman sekamar', en: 'roommate', jp: 'ルームメイト', close: true },
    teman_sekolah:   { id: 'teman sekelas', en: 'classmate', jp: '同級生', close: true },
    guru:            { id: 'guru', en: 'teacher', jp: '先生', close: false },
    atasan:          { id: 'atasan', en: 'superior at work', jp: '上司', close: false },
    klien:           { id: 'klien', en: 'client', jp: '顧客', close: false },
    orang_asing:     { id: 'orang asing di jalan', en: 'a stranger on the street', jp: '知らない人', close: false },
    petugas_toko:    { id: 'petugas toko', en: 'shop attendant', jp: '店員', close: false },
    petugas_stasiun: { id: 'petugas stasiun', en: 'station staff', jp: '駅員', close: false },
    pelayan:         { id: 'pelayan', en: 'waiting staff', jp: '給仕', close: false },
    apoteker:        { id: 'apoteker', en: 'pharmacist', jp: '薬剤師', close: false },
    dokter:          { id: 'dokter', en: 'doctor', jp: '医者', close: false },
    kurir:           { id: 'kurir pengantar', en: 'delivery courier', jp: '配達員', close: false },
    tetangga_baru:   { id: 'tetangga yang baru dikenal', en: 'a neighbour you just met', jp: '新しい 隣人', close: false },

    /* Speakers only, for the conversations in `percakapan`. Kept in the same table so a
     * speaker label is worded and coloured by exactly the same rule as a whole narrative. */
    ibu:             { id: 'ibu', en: 'mother', jp: '母', close: true },
    ayah:            { id: 'ayah', en: 'father', jp: '父', close: true },
    anak:            { id: 'anak', en: 'child', jp: '子供', close: true },
    kakak:           { id: 'kakak', en: 'older sibling', jp: '姉', close: true },
    adik:            { id: 'adik', en: 'younger sibling', jp: '弟', close: true },
    teman_kerja:     { id: 'rekan kerja', en: 'colleague', jp: '同僚', close: true },
    petugas:         { id: 'petugas', en: 'staff member', jp: '係員', close: false },
    tetangga_lama:   { id: 'tetangga lama', en: 'a neighbour of long standing', jp: '古い 隣人', close: true },

    /* Two speakers that only appear inside a conversation or an announcement. A general
     * announcement is addressed to the passenger, so it is named the same way as a person. */
    penumpang:       { id: 'penumpang', en: 'passenger', jp: '乗客', close: true },
    pasien:          { id: 'pasien', en: 'patient', jp: '患者', close: false },
  },

  /* Kind: what shape the narrative takes. This is the axis a topic is required to move along,
   * so that one topic never becomes the same piece written many times. Open-ended on purpose:
   * a new kind is added here when a narrative genuinely takes a new shape. */
  jenis: {
    percakapan:  { id: 'percakapan',  en: 'conversation', jp: '会話' },
    cerita:      { id: 'cerita',      en: 'story',        jp: '話' },
    kronologi:   { id: 'kronologi',   en: 'chronology',   jp: '時系列' },
    curhatan:    { id: 'curhatan',    en: 'venting',      jp: '愚痴' },
    keluhan:     { id: 'keluhan',     en: 'complaint',    jp: '苦情' },
    penjelasan:  { id: 'penjelasan',  en: 'explanation',  jp: '説明' },
    laporan:     { id: 'laporan',     en: 'report',       jp: '報告' },
    rencana:     { id: 'rencana',     en: 'plan',         jp: '計画' },
    nasihat:     { id: 'nasihat',     en: 'advice',       jp: '助言' },
    permintaan:  { id: 'permintaan',  en: 'request',      jp: 'お願い' },
    pengalaman:  { id: 'pengalaman',  en: 'recollection', jp: '経験' },
    pengumuman:  { id: 'pengumuman',  en: 'announcement', jp: 'お知らせ' }
  },

  /* Language style, read OFF the narrative's own text rather than written by hand.
   *
   * It is a property of what was actually written, so it cannot drift away from the writing
   * the way a hand-set flag does. A conversation that mixes a polite customer with a casual
   * friend is `campuran`, and saying so is more truthful than picking one.
   *
   * The markers are matched against the whole narrative, punctuation included, because that
   * is what the reader hears. `ますか` and `ので` are deliberately absent: they are relation
   * and question markers, not register, and counting them here reported polite sentences as
   * plain, which is a mistake this file used to make. */
  POLITE_MARK: ['です', 'ます', 'ました', 'ません', 'ましょう', 'でしょう', 'ください',
                'ございます', 'でした', 'お願いします', 'いただけます', 'いらっしゃいませ'],
  PLAIN_MARK: ['だよ', 'だね', 'だろ', 'じゃん', 'かな', 'だし', 'んだ', 'だぜ', 'だい',
               'してる', 'してた', 'あるよ', 'ないよ', 'だよな', 'よな', 'のか', 'だって',
               'だろう', 'おい', 'やつ', 'のは', 'のが'],
  style: {
    sopan:    { id: 'sopan',    en: 'polite', jp: '丁寧' },
    biasa:    { id: 'biasa',    en: 'casual', jp: '普通' },
    campuran: { id: 'campuran', en: 'mixed',  jp: '混在' }
  },

  /* Every word the interface says, in both languages, since the reader picks the language on
   * the first screen and the whole page then speaks it. Nothing here is written in Indonesian
   * only or English only. */
  STR: {
    title:       { id: 'Kalimat Jepang Sehari-hari', en: 'Everyday Japanese Sentences' },
    chooseUi:    { id: 'Pilih bahasa Anda', en: 'Choose your Language' },
    chooseUiSub: { id: 'Bahasa yang dipakai halaman ini.', en: 'The language this page speaks.' },
    chooseTgt:   { id: 'Pilih bahasa sasaran', en: 'Choose target language' },
    chooseTgtSub: { id: 'Bahasa kalimat yang ingin Anda pelajari.', en: 'The language of the sentences you want to learn.' },
    langId:      { id: 'Bahasa Indonesia', en: 'Indonesian' },
    langEn:      { id: 'English', en: 'English' },
    langJp:      { id: 'Bahasa Jepang', en: 'Japanese' },
    search:      { id: 'Cari: Kanji / Romaji / arti', en: 'Search: Kanji / Romaji / meaning' },
    searchClear: { id: 'Hapus pencarian', en: 'Clear search' },
    scopeAll:    { id: 'Semua', en: 'All' },
    scopeJp:     { id: 'Jepang', en: 'Japanese' },
    romaji:      { id: 'Romaji', en: 'Romaji' },
    translation: { id: 'Terjemahan', en: 'Translation' },
    back:        { id: 'Kembali', en: 'Back' },
    readFull:    { id: 'Baca judul', en: 'Read title' },
    readFullTail: { id: 'penuh', en: 'in full' },
    noMatch:     { id: 'Tidak ada narasi yang cocok.', en: 'No narratives match.' },
    backToTitles: { id: 'Kembali ke daftar judul', en: 'Back to the title list' },
    countWord:   { id: 'narasi', en: 'narratives' },
    scrollHint:  { id: 'gulir untuk memuat lagi', en: 'scroll for more' },
    partOf:      { id: 'Bagian', en: 'Part' }
  },

  /* How each kind is drawn. One table, applied as an inline left border on the paragraph, so
   * twelve kinds are twelve rows here instead of twelve CSS rules in index.html that can drift
   * apart from the list above. The border carries the kind; nothing else about the text changes,
   * because the text is what the reader came for. Colours come from the palette already in use. */
  jenisVisual: {
    percakapan:  { left: '#38bdf8', style: 'solid',  width: '4px' },
    cerita:      { left: '#7ec699', style: 'solid',  width: '3px' },
    kronologi:   { left: '#7ab8e8', style: 'dashed', width: '3px' },
    curhatan:    { left: '#f5d0a9', style: 'dotted', width: '4px' },
    keluhan:     { left: '#f08a6a', style: 'solid',  width: '3px' },
    penjelasan:  { left: '#c79ae0', style: 'double', width: '3px' },
    laporan:     { left: '#6fd0d0', style: 'solid',  width: '3px' },
    rencana:     { left: '#e0c46a', style: 'double', width: '4px' },
    nasihat:     { left: '#9ad07a', style: 'dashed', width: '3px' },
    permintaan:  { left: '#f08aab', style: 'solid',  width: '3px' },
    pengalaman:  { left: '#a99ae0', style: 'dotted', width: '3px' },
    pengumuman:  { left: '#d0a06a', style: 'solid',  width: '6px' }
  }
};

/* Nama jenis dan bahasa, supaya tidak ada berkas yang menulisnya sendiri-sendiri. */
window.CONST.jenisList = Object.keys(window.CONST.jenis);
window.CONST.langCode = { id: 'id', en: 'en' };
