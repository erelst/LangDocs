/* The written bank: the narratives this deck is built from.
 *
 * Empty on purpose. The shape below is what a narrative is written in, so writing one is only
 * writing the narrative and not also deciding how it is stored.
 *
 * A narrative is not a sentence. It is a piece of speech with a title: a conversation, a story,
 * a chronology, someone venting, an explanation, a report. Each one says something that takes
 * more than one line to say, which is the whole point of the rework.
 *
 * One narrative:
 *   key        a stable name, used by the deep link and by the title checkpoint
 *   topic      which subject it belongs to, and therefore which file it lives in
 *   jenis      what shape it takes, one of CONST.jenis
 *   judul      the title, in the reader's chosen language and in the other one
 *   judulEn
 *   rel        who it is aimed at (CONST.rel), for a narrative with one voice
 *   speakers   only for `percakapan`: { A: 'rekan', B: 'petugas_stasiun' }
 *   sit/sitEn  the situation it is used in
 *   id/en      the translation, in both languages; the page shows the one that was chosen
 *   note/noteEn  why it is written the way it is
 *   blocks     the narrative itself, one entry per line of speech
 *
 * A block:
 *   sp   optional speaker, one of the keys in `speakers`. Absent means the narrative's one voice.
 *   id   the translation of this paragraph for an Indonesian reader, one entry per Japanese
 *   en   sentence, and the same for an English reader. A one-sentence paragraph is a plain string.
 *        The page shows whichever the reader chose, so BOTH are required: storing one and falling
 *        back is how English mode ended up showing Indonesian. The Translation switch shows this
 *        under the paragraph. Note that `id` at the narrative level is a one-line SUMMARY of the
 *        whole piece and is a different thing, never used as a paragraph translation.
 *   t    the tokens of that line, as surfaces:
 *          ["日本語", "gloss (ID)", "gloss (EN)"]  for a word written out in full, or
 *          "日本語"                                  for a word data/lexicon.js already knows
 *        Punctuation rides on the word before it: "ください。"
 *
 * There is no `polite` flag and no `long` flag. Language style is read off the text itself by
 * the page (CONST.POLITE_MARK / CONST.PLAIN_MARK), so it cannot drift away from what was
 * written, and `long` meant nothing once a narrative had more than one line.
 *
 * Example of one written narrative, kept here so the shape stays visible:
 *
 *   {
 *     key: 'transportasi_kronologi_kereta_terakhir', topic: 'transportasi',
 *     jenis: 'kronologi',
 *     judul: 'Kereta terakhir yang saya kejar', judulEn: 'The last train I ran for',
 *     rel: 'rekan', sit: '...', sitEn: '...',
 *     id: '...', en: '...', note: '...', noteEn: '...',
 *     blocks: [
 *       { t: ['...', '...'] },
 *       { t: ['...'] }
 *     ]
 *   }
 */
window.BANK = [];
