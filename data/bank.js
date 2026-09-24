/* The written bank: the sentences this deck is built from.
 *
 * Empty on purpose right now. The next step is writing them, and the shape below is what
 * they will be written in, so writing a sentence is only writing the sentence.
 *
 * One entry per sentence:
 *   key      a stable name, used by the deep links and by review comments
 *   topic    which subject it belongs to
 *   who      'dekat' (green chip: someone close) or 'asing' (yellow chip: someone distant)
 *   whoId/whoEn  who the sentence is said to, in both languages
 *   polite   1 for です/ます speech, 0 for plain speech
 *   long     1 for the longer sentences, which are meant to be most of the deck
 *   sit/sitEn    the situation it is used in, in both languages
 *   id/en        the translation, in both languages
 *   note/noteEn  why the sentence is built the way it is, in both languages
 *   t        the tokens in order, as surfaces:
 *            ["日本語", "gloss (ID)", "gloss (EN)"]
 *            or plain strings, in which case the lexicon supplies the romaji and glosses
 *            Punctuation rides on the word before it: "ください。"
 *
 * Example of one written sentence, kept here so the shape is visible while the rest is
 * being written:
 *
 *   {
 *     key: "belanja_tanya_harga_murah", topic: "belanja",
 *     who: "asing", whoId: "petugas toko", whoEn: "shop attendant", polite: 1, long: 1,
 *     sit: "...", sitEn: "...",
 *     id: "...", en: "...",
 *     note: "...", noteEn: "...",
 *     t: ["これ", "は", "安い", "です", "か", "。"]
 *   },
 */
window.BANK = [];
