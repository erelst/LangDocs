/* This file is the whole program. It routes the three screens, renders the title list, renders
 * one narrative when it is opened, and searches inside the narratives. There is no build step
 * and no generator: the narratives live in data/*.js as data, and this reads them.
 *
 * Data files, loaded before this one:
 *   data/lexicon.js  word -> [romaji, gloss (ID), gloss (EN)]  (window.LEX)
 *   data/curated.js  the one narrative kept from the first version (window.CURATED)
 *   data/bank.js     the written narratives (window.BANK)
 *   data/t_*.js      the narratives of one topic each
 *
 * A narrative stores its surfaces only. The romaji and the glosses are looked up here, so a word
 * is written once in the lexicon and cannot be spelled one way in one narrative and another way
 * in the next. If a surface is missing, the card shows the Japanese with an empty gloss rather
 * than failing, and the console names the word.
 *
 * Three screens, driven by the hash:
 *   #/lang                    the language the page speaks, which is also the translation shown
 *   #/target/<lang>           the language of the sentences (Japanese only, for now)
 *   #/read/<lang>/<tgt>       the title list, with search
 *   #/read/<lang>/<tgt>/<key> one narrative, opened in full
 *
 * Why the hash and not local storage: a reader who shares a link shares what they were looking
 * at, and the back button walks the three screens in the order they were chosen.
 */
(function () {
  'use strict';

  var C = window.CONST;
  var STR = C.STR;
  var LEX = window.LEX || {};
  var CURATED = window.CURATED || [];
  var BANK = window.BANK || [];

  /* Surfaces the lexicon does not know. Collected while rendering rather than asserted,
   * because a missing word should show as an empty gloss, not as a blank page. */
  var missingWords = {};

  /* The deck in reading order: the kept narrative first, then the written bank. */
  function assemble() {
    var out = [];
    function push(list, origin) {
      for (var i = 0; i < list.length; i++) {
        var s = list[i];
        if (!s || !s.blocks || !s.blocks.length) { continue; }
        out.push({ s: s, origin: origin });
      }
    }
    push(CURATED, 'kurasi');
    push(BANK, 'bank');
    return out;
  }

  var ROWS = assemble();

  /* A block is one paragraph, held as the flat list of its surfaces. Where the sentences inside
   * it begin and end is read from the punctuation, not stored: `。`, `！` and `？` end a sentence,
   * and that is what the reader sees anyway. A paragraph of one sentence is then simply a
   * paragraph whose token list contains one such mark, so the same shape covers both.
   *
   * ponytail: punctuation is the only sentence boundary. If a sentence ever needs to break
   * without ending, that needs a marker in the data; no narrative needs it today. */
  function tokensOfBlock(block) {
    if (block._t) { return block._t; }
    block._t = resolve(block.t);
    return block._t;
  }

  /* Surfaces in, tokens out. Shared by the paragraphs and by the title, because a title is a
   * sentence too and there is no reason for it to look up its words any differently. */
  function resolve(surfaces) {
    var out = [];
    for (var i = 0; i < surfaces.length; i++) {
      var surface = surfaces[i];
      var e = lexEntry(surface);
      if (!e && bare(surface) !== '') { missingWords[surface] = 1; }
      out.push(e ? [surface, e[0], e[1], e[2]] : [surface, '', '', '']);
    }
    return out;
  }

  function blocksOf(s) { return s.blocks || []; }

  /* Every token of the narrative in order, so the whole piece can be searched as one text. */
  function allTokens(s) {
    var out = [];
    var bs = blocksOf(s);
    for (var i = 0; i < bs.length; i++) { out = out.concat(tokensOfBlock(bs[i])); }
    return out;
  }

  function textOf(s) {
    return allTokens(s).map(function (t) { return t[0]; }).join('');
  }

  /* The language code, always one of the two the page speaks. A hash anyone can type
   * (`#/read/EN/jp`, or a typo) is normalised instead of trusted: an unknown code used to reach
   * the lookup as-is, and although every string fell back to Indonesian so nothing broke, the
   * state then held a code no table had a column for. Normalising here means the rest of the file
   * only ever sees a language it knows. */
  var LANGS = ['id', 'en'];
  function normLang(x) {
    var v = String(x || '').toLowerCase();
    return LANGS.indexOf(v) === -1 ? 'id' : v;
  }
  function langOf() { return normLang(state.lang); }

  /* The target language, normalised the same way as the interface language, and for the same
   * reason. Only Japanese exists today, so anything else in the hash is a typo; leaving it as
   * typed meant a mistyped `#/read/id/JP` was carried into every link the reader then clicked.
   * When a second target language is genuinely added, it is added to this list and to the
   * chooser that `renderChoosers()` builds, in the same change. */
  var TARGETS = ['jp'];
  function normTarget(x) {
    var v = String(x || '').toLowerCase();
    return TARGETS.indexOf(v) === -1 ? 'jp' : v;
  }
  /* A field written as `id`/`en` rather than `idId`/`idEn`. */
  function tr(s, base) {
    if (!s) { return ''; }
    var key = base + (langOf() === 'en' ? 'En' : 'Id');
    if (s[key]) { return s[key]; }
    if (langOf() === 'en') { return s[base + 'En'] || s[base + 'Id'] || s[base] || ''; }
    return s[base + 'Id'] || s[base] || '';
  }
  function str(key) { var v = STR[key]; return v ? (v[langOf()] || v.id) : key; }

  /* ---------------------------------------------------------------- style, read off the text
   * The chip next to the situation says what the language style of the piece actually is, read
   * from the words that were written rather than from a field somebody set. A field can be left
   * behind when the text is edited; the text cannot disagree with itself.
   *
   * `campuran` is a real answer, not a failure: a conversation between a customer and a friend
   * is mixed, and saying so is more truthful than choosing one. */
  function styleOf(s) {
    var text = textOf(s);
    var polite = false, plain = false;
    for (var i = 0; i < C.POLITE_MARK.length; i++) {
      if (text.indexOf(C.POLITE_MARK[i]) !== -1) { polite = true; break; }
    }
    for (var j = 0; j < C.PLAIN_MARK.length; j++) {
      if (text.indexOf(C.PLAIN_MARK[j]) !== -1) { plain = true; break; }
    }
    if (polite && plain) { return 'campuran'; }
    if (polite) { return 'sopan'; }
    if (plain) { return 'biasa'; }
    return 'biasa';
  }
  /* A label has three names: the Japanese word the page shows, and the two the reader might search
   * with. All three come from the same row of the same table, so a label can never be worded one
   * way in the page and another way in the index. */
  function labelRow(kind, key) {
    var table = kind === 'jenis' ? C.jenis : (kind === 'style' ? C.style : C.rel);
    return (table && table[key]) || null;
  }
  /* What the page shows: the Japanese word, because the label is about the Japanese text. It falls
   * back to the reader's own word when a label is added before its word is in the lexicon, so a
   * new kind shows as `cerita` rather than as nothing. */
  function labelText(kind, key) {
    var row = labelRow(kind, key);
    if (!row) { return ''; }
    return row.jp || row.id || key || '';
  }
  /* What the search index holds: both names the reader might type, in both interface languages.
   * Showing only Japanese on screen would have left a reader who thinks in "complaint" searching
   * for a word that appears nowhere. */
  function labelNames(kind, key) {
    var row = labelRow(kind, key);
    return row ? [row.jp, row.id, row.en].filter(Boolean).join(' ') : '';
  }
  /* A label rendered as words, so it gets the same colours, underlines and hover bubble as the
   * sentence it describes. A label of more than one word is written with a space between the
   * words, and each part is looked up on its own.
   *
   * A label is Japanese, so it carries a romaji line and a meaning line like the paragraphs do.
   * It gets both for free because the switch hides a CLASS, not a place in the page: `.romaji` is
   * the Romaji switch and `.tt` is the Translation switch, wherever they appear. */
  function labelSpan(kind, key) {
    var text = labelText(kind, key);
    if (!text) { return ''; }
    var tokens = resolve(text.split(' '));
    return '<span class="label">' + tokenSpans(tokens, 0) + romajiSpan(tokens) +
      '<span class="label-mean tt">' + esc(labelMeaning(kind, key)) + '</span></span>';
  }
  /* The romaji line of a piece of Japanese text. It is a span rather than a div because a label
   * lives inside a chip; `display: block` is on the class, so it breaks the line either way. */
  function romajiSpan(tokens) {
    return '<span class="romaji">' + tokenSpans(tokens, 1) + '</span>';
  }
  /* The label's meaning in the reader's language, for the Translation switch. */
  function labelMeaning(kind, key) {
    var row = labelRow(kind, key);
    if (!row) { return ''; }
    return langOf() === 'en' ? (row.en || row.id) : (row.id || row.en);
  }
  /* ---------------------------------------------------------------- who, and the chip colour
   * A narrative names its relationship; the label and the colour follow from CONST.rel, so no
   * narrative repeats them and the same relationship is worded identically everywhere. */
  function relOf(key) { return (C.rel && C.rel[key]) || null; }
  function relColour(key) {
    var r = relOf(key);
    return r && r.close ? C.who.dekat : C.who.asing;
  }
  /* The person a narrative is aimed at: its `rel`, or every speaker of a conversation. */
  function whoKeys(s) {
    if (s.speakers) {
      return Object.keys(s.speakers).map(function (k) { return s.speakers[k]; });
    }
    return s.rel ? [s.rel] : [];
  }
  function whoKeysUnique(s) {
    var keys = whoKeys(s);
    var seen = {}, out = [];
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] && !seen[keys[i]]) { seen[keys[i]] = 1; out.push(keys[i]); }
    }
    return out;
  }
  /* The Japanese words for the people this piece is aimed at, one chip each. A conversation has
   * two speakers, and two chips say "two people" where one chip holding two words reads as one. */
  function whoChips(s) {
    var keys = whoKeysUnique(s), out = [];
    for (var i = 0; i < keys.length; i++) {
      out.push('<span class="badge">' + labelSpan('rel', keys[i]) + '</span>');
    }
    return out.join('');
  }
  /* A conversation names each speaker, so the block label is the speaker's relationship. */
  function speakerKey(s, sp) {
    return (s.speakers && s.speakers[sp]) || null;
  }
  /* Every name of every label on this narrative, for the search index. */
  function labelNamesOf(s) {
    var out = [labelNames('jenis', s.jenis), labelNames('style', styleOf(s))];
    var keys = whoKeysUnique(s);
    for (var i = 0; i < keys.length; i++) { out.push(labelNames('rel', keys[i])); }
    return out;
  }
  function titleOf(s) { return langOf() === 'en' ? (s.judulEn || s.judul) : (s.judul || s.judulEn); }
  /* The narrative's one-line summary. It is read straight from `en`/`id` rather than through
   * tr(s, ...): that helper expects a field pair like `sit`/`sitEn`, so asking it for `id` made it
   * look for `idEn`, which does not exist, and it fell back to the Indonesian `id` in English mode.
   * The reader picked English and was handed Indonesian, which is the defect V15 exists to stop. */
  function summaryOf(s) { return langOf() === 'en' ? (s.en || s.id) : (s.id || s.en); }
  /* The title in the language being learned, rendered through the same token renderer as the
   * paragraphs: same per-word colours, same underlines, same bubble on hover. A title is a
   * sentence, so it gets a sentence's treatment; the chosen-language title stays underneath as
   * the one line that says what it means.
   *
   * A title is Japanese, so the Romaji switch has to reach it: without the romaji line the reader
   * who checked Romaji still saw bare kanji at the top of the page and in every row of the list.
   * The reading is spelled out on the romaji line, word for word, exactly as a paragraph's is.
   *
   * It does NOT carry `jp-sent`. That class is the card, and the title already sits inside one,
   * so using it here drew a card inside a card. The bubble no longer depends on it, because the
   * bubble rules are written on `.tk`. */
  function titleSpans(s) {
    if (!s.judulT || !s.judulT.length) { return ''; }
    var tokens = resolve(s.judulT);
    return '<div class="title-jp">' + tokenSpans(tokens, 0) + romajiSpan(tokens) + '</div>';
  }
  /* The title list is the only place a title sits in a row of its own, so the one thing that has
   * to be undoed is the first word's indent: the card already supplies the same 16px as padding,
   * and the two together read as a title pushed in from the edge. */
  function titleSpansFlush(s) {
    return '<div class="flush">' + titleSpans(s) + '</div>';
  }
  /* A line in the reader's own language. Marked so the Translation switch can hide it; the switch
   * is what makes "everything is Japanese" and "show me what it means" the same page. */
  function trLine(text, cls) {
    if (!text) { return ''; }
    return '<div class="' + cls + ' tt">' + esc(text) + '</div>';
  }
  /* The translation of one paragraph, in the language the reader chose: `block.id` and
   * `block.en` hold one line per Japanese sentence, so each line sits next to the sentence it
   * belongs to. A block whose translation is one sentence is stored as a plain string.
   *
   * Both languages are stored because the page shows exactly one of them (V15). Falling back to
   * Indonesian in English mode was a real defect: the reader picks English and gets Indonesian. */
  function blockTrHTML(block) {
    var v = block[langOf() === 'en' ? 'en' : 'id'];
    if (!v) { return ''; }
    var lines = Object.prototype.toString.call(v) === '[object Array]' ? v : [v];
    var out = [];
    for (var i = 0; i < lines.length; i++) { out.push('<div>' + esc(lines[i]) + '</div>'); }
    return '<div class="btr tt">' + out.join('') + '</div>';
  }

  /* ---------------------------------------------------------------- card pieces */
  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function colourOf(i) { return C.palette[i % C.palette.length]; }
  function styleUnderline(i) { return C.underlines[i % C.underlines.length]; }

  /* The word bubble's contents. Three labelled rows rather than one run of text, because a
   * reader could not tell the reading from the two glosses when they were joined by a slash.
   *
   * Nothing here repeats the word. idx is the line being built, 0 kanji and 1 romaji; on the
   * romaji line the reading is already on screen, so the bubble leaves it out. */
  function bubble(tokens, i, idx) {
    var t = tokens[i];
    var own = colourOf(i);
    var rows = [];
    if (idx !== 1 && t[1]) { rows.push(['kana', 'romaji', t[1], own]); }
    // Only the chosen language's gloss appears, since the reader picked one language, and the
    // bubble is small enough that a second gloss would crowd it out.
    if (langOf() === 'en') {
      if (t[3]) { rows.push(['en', 'english', t[3]]); }
    } else {
      if (t[2]) { rows.push(['id', 'arti', t[2]]); }
    }
    if (!rows.length) { return ''; }
    return '<span class="tip" aria-hidden="true">' + rows.map(function (r) {
      return '<span class="tr t-' + r[0] + '">' +
        '<span class="mk">' + esc(r[1]) + '</span>' +
        '<span class="tx"' + (r[3] ? ' style="color:' + r[3] + ' !important;"' : '') + '>' +
        esc(r[2]) + '</span></span>';
    }).join('') + '</span>';
  }

  function tokenSpans(tokens, idx) {
    var out = [];
    for (var i = 0; i < tokens.length; i++) {
      var colour = colourOf(i), u = styleUnderline(i);
      var width = u === 'double' ? '3px' : '2px';
      var text = esc(tokens[i][idx]);
      // display:inline-block keeps each word atomic, so a narrow screen wraps between
      // words and never splits a word in half.
      out.push('<span class="tk" style="display:inline-block;color:' + colour +
        ' !important;border-bottom:' + width + ' ' + u + ' ' + colour +
        ' !important;padding:0 3px;' +
        /* The indent is inline, so only an inline rule can undo it: that is why the first word
         * of a title carries this and the CSS does not. */
        (i ? '' : 'padding-left:0;') + '">' + text + bubble(tokens, i, idx) + '</span>');
    }
    return out.join('');
  }

  /* A surface carries its sentence punctuation, because the punctuation rides on the word so a
   * line break can never separate them. The lexicon is keyed on the word alone.
   *
   * The quotation marks are in here for a reason found by reading the console: a line with a
   * quoted announcement produced the surfaces `が「` and `ます」`, and both were reported as words
   * missing from the lexicon. They are not words. Stripping them from the lookup and keeping them
   * on the displayed surface is what the punctuation rule already does for 。 and 、. */
  function bare(surface) {
    return String(surface).replace(/[、。！？…「」]+$/, '').replace(/^[「]+/, '');
  }
  function lexEntry(surface) {
    var b = bare(surface);
    if (!b) { return null; }
    return LEX[surface] || LEX[b];
  }

  /* One paragraph of the narrative. No ? panel and no expander: the bubble on each word already
   * carries the reading and the meaning, so a panel duplicating it was a second place to read the
   * same thing and a second thing to keep in step. A conversation paragraph carries a speaker
   * label, and each sentence inside the paragraph is its own kanji + romaji pair. */
  function blockHTML(s, block, index) {
    var tokens = tokensOfBlock(block);
    var sp = speakerKey(s, block.sp);
    var spColour = sp ? relColour(sp) : '';
    var sentences = sentencesOf(tokens);
    var out = [];
    for (var k = 0; k < sentences.length; k++) {
      var line = sentences[k];
      out.push('<div class="sentence">' +
        '<div class="kanji">' + tokenSpans(line, 0) + '</div>' +
        '<div class="romaji">' + tokenSpans(line, 1) + '</div>' +
        '</div>');
    }
    /* `jp-sent` is not decoration: every rule for the word bubble is written as
     * `.jp-sent .tk > .tip`. Without it the bubble fell back to `position: static` and was simply
     * always visible, which a reader would see as three lines of text under every word. */
    var v = C.jenisVisual[s.jenis] || { left: C.edge, style: 'solid', width: '3px' };
    return '<div class="block jp-sent" data-jenis="' + esc(s.jenis) + '"' +
      (block.sp ? ' data-sp="' + esc(block.sp) + '"' : '') +
      ' style="border-left:' + v.width + ' ' + v.style + ' ' + v.left + ' !important;' +
      'padding-left:12px;">' +
      (sp ? '<span class="speaker" style="background:' + spColour + ' !important;">' +
        labelSpan('rel', sp) + '</span>' : '') + out.join('') + blockTrHTML(block) + '</div>';
  }

  /* The sentences of a paragraph, cut where the punctuation says, so a paragraph renders as
   * prose instead of one long line. The mark stays on the token it belongs to (K7), which is why
   * the test is "ends with" and not "equals". */
  function sentencesOf(tokens) {
    var out = [], cur = [];
    for (var i = 0; i < tokens.length; i++) {
      cur.push(tokens[i]);
      if (/[。！？]$/.test(tokens[i][0])) { out.push(cur); cur = []; }
    }
    if (cur.length) { out.push(cur); }   // a paragraph may end without a mark
    return out;
  }

  /* The whole narrative: its summary line, then its paragraphs. The title is the page heading,
   * and the Japanese chips for kind, style, and the people addressed live in that heading, so the
   * body holds only the piece itself. */
  function narrativeHTML(s) {
    var bs = blocksOf(s);
    var out = [trLine(summaryOf(s), 'sum')];
    for (var i = 0; i < bs.length; i++) { out.push(blockHTML(s, bs[i], i)); }
    return out.join('');
  }

  /* --------------------------------------------------------------- matching */
  function stripDiacritics(s) {
    return s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : s;
  }
  // Fold kana romanisation variants so ohayo, ohayou and ohayō all match.
  function norm(s) {
    var t = stripDiacritics(String(s).toLowerCase());
    return t
      .replace(/sha/g, 'sya').replace(/shu/g, 'syu').replace(/sho/g, 'syo').replace(/shi/g, 'si')
      .replace(/cha/g, 'tya').replace(/chu/g, 'tyu').replace(/cho/g, 'tyo').replace(/chi/g, 'ti')
      .replace(/ja/g, 'zya').replace(/ju/g, 'zyu').replace(/jo/g, 'zyo').replace(/ji/g, 'zi')
      .replace(/tsu/g, 'tu')
      .replace(/ou/g, 'o').replace(/uu/g, 'u').replace(/oo/g, 'o')
      .replace(/aa/g, 'a').replace(/ee/g, 'e').replace(/ii/g, 'i');
  }

  /* The index is built per narrative, and also per line, because a hit has to say which line of
   * the piece matched: that line is what the reader is offered when the narrative is opened. */
  function buildIndex(rows) {
    var all = [], jp = [];
    for (var i = 0; i < rows.length; i++) {
      var s = rows[i].s, bs = blocksOf(s);
      var japanese = [], everything = [], lines = [];
      for (var b = 0; b < bs.length; b++) {
        var tk = tokensOfBlock(bs[b]);
        var surfaces = [], readings = [], glosses = [];
        for (var k = 0; k < tk.length; k++) {
          surfaces.push(tk[k][0]); readings.push(tk[k][1]);
          glosses.push(tk[k][2]); glosses.push(tk[k][3]);
        }
        var lineJp = surfaces.concat(readings);
        var lineAll = lineJp.concat(glosses);
        japanese = japanese.concat(lineJp);
        everything = everything.concat(lineAll);
        lines.push({
          jp: lineJp.map(norm).join('\u0001'),
          all: lineAll.map(norm).join('\u0001')
        });
      }
      // The title, the situation and the note are searchable too: a reader looking for a topic
      // rather than a word is asking a real question.
      /* judulT is in here because it is now the title the reader sees first. Leaving it out
       * meant the one line a reader is most likely to copy could not be found by searching. */
      var meta = [titleOf(s), s.judul, s.judulEn, (s.judulT || []).join(''),
                  tr(s, 'sit'), tr(s, 'note')].concat(labelNamesOf(s));
      everything = everything.concat(meta);

      var jpParts = norm(japanese.join(' '));
      for (var j = 0; j < japanese.length; j++) { jpParts += '\u0001' + norm(japanese[j]); }
      jp.push(jpParts);

      var allParts = norm(everything.join(' '));
      for (var m = 0; m < everything.length; m++) { allParts += '\u0001' + norm(everything[m]); }
      all.push({ text: allParts, lines: lines });
    }
    return { all: all, jp: jp };
  }

  /* ------------------------------------------------------------- list state */
  var list = document.getElementById('list');
  var input = document.getElementById('q');
  var countEl = document.getElementById('count');
  var emptyEl = document.getElementById('empty');
  var clearBt = document.getElementById('clear');
  var sentinel = document.getElementById('sentinel');
  var scopeInputs = document.querySelectorAll('input[name="scope"]');
  var romajiToggle = document.getElementById('rtoggle');
  var examplesEl = document.getElementById('examples');
  var pageTitleEl = document.getElementById('page-title');
  var narrEl = document.getElementById('narr');
  var narrTitleEl = document.getElementById('narr-title');
  var backBt = document.getElementById('back');
  var barEl = document.getElementById('bar');
  var trToggle = document.getElementById('ttoggle');
  var screens = {
    lang: document.getElementById('s-lang'),
    target: document.getElementById('s-target'),
    list: document.getElementById('s-list'),
    narrative: document.getElementById('s-narrative')
  };

  var BATCH = 20;
  var state = { lang: 'id', target: 'jp', show: null, rendered: 0, terms: [], openKey: null };
  var INDEX = null;

  function ensureIndex() {
    if (!INDEX) { INDEX = buildIndex(ROWS); }
    return INDEX;
  }

  function matches() {
    var raw = input.value.trim();
    if (!raw) { return null; }
    var terms = raw.split(/\s+/).filter(Boolean).map(norm);
    var ix = ensureIndex();
    var out = [];
    for (var i = 0; i < ROWS.length; i++) {
      var hay;
      if (currentScope() === 'jp') {
        hay = ix.jp[i];
      } else {
        hay = ix.all[i].text;
      }
      var ok = true;
      for (var t = 0; t < terms.length; t++) {
        if (hay.indexOf(terms[t]) === -1) { ok = false; break; }
      }
      if (ok) { out.push(i); }
    }
    return out;
  }

  /* The lines of a narrative that contain the search terms, so the hit shows the part that
   * matched instead of the whole piece. */
  function matchingLines(rowIndex, terms, scope) {
    var ix = ensureIndex();
    var entry = ix.all[rowIndex];
    if (!entry) { return []; }
    var out = [];
    for (var i = 0; i < entry.lines.length; i++) {
      var hay = scope === 'jp' ? entry.lines[i].jp : entry.lines[i].all;
      var ok = true;
      for (var t = 0; t < terms.length; t++) {
        if (hay.indexOf(terms[t]) === -1) { ok = false; break; }
      }
      if (ok) { out.push(i); }
    }
    return out;
  }

  function currentScope() {
    for (var i = 0; i < scopeInputs.length; i++) {
      if (scopeInputs[i].checked) { return scopeInputs[i].value; }
    }
    return 'all';
  }

  function total() { return state.show ? state.show.length : ROWS.length; }

  function titleItemHTML(rowIndex, terms) {
    var s = ROWS[rowIndex].s;
    var lines = terms.length ? matchingLines(rowIndex, terms, currentScope()) : [];
    var snippet = '';
    if (lines.length) {
      var bs = blocksOf(s), first = lines[0];
      var tokens = tokensOfBlock(bs[first]);
      snippet = '<div class="snippet">' + esc(tokens.map(function (t) { return t[0]; }).join('')) +
        '</div>';
    }
    return '<div class="titem" data-row="' + rowIndex + '" role="button" tabindex="0">' +
      titleSpansFlush(s) +
      trLine(titleOf(s), 'tname') +
      '<div class="meta">' +
        '<span class="badge">' + labelSpan('jenis', s.jenis) + '</span>' +
        '<span class="badge style">' + labelSpan('style', styleOf(s)) + '</span>' +
        whoChips(s) +
      '</div>' + snippet +
      (terms.length ? '<button class="readfull" data-row="' + rowIndex + '">' +
        esc(str('readFull')) + ' &ldquo;' + esc(titleOf(s)) + '&rdquo; ' + esc(str('readFullTail')) +
        '</button>' : '') +
      '</div>';
  }

  function appendBatch() {
    if (state.rendered >= total()) { return 0; }
    var end = Math.min(state.rendered + BATCH, total());
    var html = [];
    for (var i = state.rendered; i < end; i++) {
      html.push(titleItemHTML(state.show ? state.show[i] : i, state.terms));
    }
    var before = list.children.length;
    list.insertAdjacentHTML('beforeend', html.join(''));
    state.rendered = end;
    return list.children.length - before;
  }

  function setCount(shown) {
    var done = state.rendered < shown;
    countEl.textContent = (input.value.trim() ? shown + ' / ' + ROWS.length + ' ' + str('countWord')
                                             : ROWS.length + ' ' + str('countWord')) +
                          (done ? ' \u00b7 ' + str('scrollHint') : '');
    emptyEl.hidden = shown !== 0;
    clearBt.hidden = !input.value.trim();
  }

  function resetScroll() { window.scrollTo(0, 0); }

  function refresh() {
    var raw = input.value.trim();
    state.terms = raw ? raw.split(/\s+/).filter(Boolean) : [];
    state.show = matches();
    list.innerHTML = '';
    state.rendered = 0;
    appendBatch();
    setCount(total());
    while (sentinel.getBoundingClientRect().top < window.innerHeight + 200 &&
           state.rendered < total()) {
      appendBatch();
    }
    resetScroll();
  }

  /* A bubble belongs to its word, so the word is the containing block and the bubble is placed by
   * CSS alone. The one thing CSS cannot know is where the screen ends, so this nudges the drawn
   * bubble back inside, by translating it, and never touches the markup. */
  function keepBubbleOnScreen(tk) {
    var tip = tk.querySelector('.tip');
    if (!tip) { return; }
    tip.classList.remove('below');
    tip.style.transform = '';
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    var slack = 8;
    /* A hidden box measures as all zeros, so the bubble has to be laid out to be measured. It is
     * laid out at the left edge and taken out of the flow first, and both are handed back to CSS
     * below. Measuring it where it will finally sit does not work: an absolutely positioned box
     * overhanging the right edge widens the document, and `documentElement.scrollWidth` does not
     * report the bubble's position, so there is no way to see the overhang back from the page. */
    var restore = tip.style.cssText;
    tip.style.position = 'fixed';
    tip.style.left = '0px';
    tip.style.top = '0px';
    tip.style.transform = 'none';
    tip.style.display = 'flex';
    var box = tip.getBoundingClientRect();
    var word = tk.getBoundingClientRect();
    tip.style.cssText = restore;
    if (!box.width) { return; }               // nothing to place

    var dx = 0, dy = 0;
    /* The bubble is drawn from the word it belongs to, so where it would land is the word's top
     * and left minus its own size plus the gap. */
    var gap = 6;
    var wantTop = word.top - gap - box.height;
    var wantLeft = word.left;
    if (wantLeft + box.width > vw - slack) { dx = vw - slack - wantLeft - box.width; }
    if (wantLeft + dx < slack) { dx = slack - wantLeft; }
    if (wantTop < slack) {
      var roomBelow = vh - slack - word.bottom;
      if (roomBelow >= box.height) {
        dy = word.bottom + gap - wantTop;
        tip.classList.add('below');
      } else {
        dy = slack - wantTop;
      }
    }
    var overflow = (wantTop + dy + box.height) - (vh - slack);
    if (overflow > 0) { dy -= overflow; }
    if (dx || dy) {
      tip.style.transform = 'translate(' + Math.round(dx) + 'px, ' + Math.round(dy) + 'px)';
    }
  }
  document.addEventListener('mouseover', function (e) {
    var tk = e.target.closest && e.target.closest('.tk');
    if (tk) { keepBubbleOnScreen(tk); }
  });
  document.addEventListener('focusin', function (e) {
    var tk = e.target.closest && e.target.closest('.tk');
    if (tk) { keepBubbleOnScreen(tk); }
  });

  /* ---------------------------------------------------------------- routing */
  function show(name) {
    for (var k in screens) {
      if (screens[k]) { screens[k].hidden = (k !== name); }
    }
    /* The reading bar is not part of a screen, so it is shown or hidden by name here. The two
     * choosers own the page: a search box on the screen that asks which language to use would be
     * asking a question the reader has already answered. */
    if (barEl) { barEl.hidden = (name !== 'list' && name !== 'narrative'); }
  }

  function route() {
    var h = (location.hash || '').replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);

    /* No route at all, or an unknown one: start at the beginning. */
    if (!parts.length) { location.replace('#/lang'); return; }

    if (parts[0] === 'lang') {
      /* The language is deliberately NOT cleared here. A reader who comes back to this screen to
       * switch languages should see the choice they already made, in the language they made it in,
       * not a reset to Indonesian. */
      state.lang = normLang(state.lang);
      show('lang');
      renderChoosers();
      return;
    }
    if (parts[0] === 'target') {
      state.lang = normLang(parts[1]);
      show('target');
      renderChoosers();
      return;
    }
    if (parts[0] === 'read') {
      state.lang = normLang(parts[1]);
      state.target = normTarget(parts[2]);
      if (parts[3]) { openNarrative(decodeURIComponent(parts[3])); return; }
      state.openKey = null;
      show('list');
      paintStaticStrings();
      refresh();
      return;
    }
    location.replace('#/lang');
  }

  /* ---------------------------------------------------------------- screens 1 and 2 */
  function renderChoosers() {
    var lang = state.lang || 'id';                 // the chooser speaks the language already picked
    document.documentElement.lang = lang;
    var prev = state.lang;
    state.lang = lang;
    paintStaticStrings();
    var lc = document.getElementById('lang-choices');
    lc.innerHTML =
      '<button class="choice" data-pick="id"><span class="kana">ID</span>' +
        esc(STR.langId[lang]) + '<span class="sub">' + esc(STR.langId.id) + '</span></button>' +
      '<button class="choice" data-pick="en"><span class="kana">EN</span>' +
        esc(STR.langEn[lang]) + '<span class="sub">' + esc(STR.langEn.en) + '</span></button>';
    var tc = document.getElementById('target-choices');
    /* One real choice, and it says so. A second, greyed-out button used to sit here, and the
     * only thing it achieved was rendering two unrelated strings next to each other. When a
     * second target language is genuinely added, it is added here as a real choice. */
    tc.innerHTML =
      '<button class="choice" data-target="jp"><span class="kana">&#26085;&#26412;&#35486;</span>' +
        esc(STR.langJp[lang]) + '<span class="sub">Japanese</span></button>';
    state.lang = prev;
  }

  /* Every string the shell owns, in the chosen language. Called whenever the language changes. */
  function paintStaticStrings() {
    var lang = state.lang || 'id';
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll('[data-str]');
    for (var i = 0; i < nodes.length; i++) {
      var v = STR[nodes[i].getAttribute('data-str')];
      if (v) { nodes[i].textContent = v[lang] || v.id; }
    }
    if (pageTitleEl) { pageTitleEl.textContent = STR.title[lang] || STR.title.id; }
    if (input) {
      input.placeholder = STR.search[lang] || STR.search.id;
      input.setAttribute('aria-label', STR.search[lang] || STR.search.id);
    }
    if (clearBt) {
      clearBt.title = STR.searchClear[lang] || STR.searchClear.id;
      clearBt.setAttribute('aria-label', clearBt.title);
    }
    if (emptyEl) { emptyEl.textContent = STR.noMatch[lang] || STR.noMatch.id; }
    if (backBt) { backBt.textContent = '\u2039 ' + (STR.backToTitles[lang] || STR.backToTitles.id); }
    if (examplesEl) {
      examplesEl.innerHTML = 'coba / try: <code>ohayou</code> <code>\u304a\u306f\u3088\u3046</code>';
      // `code` styling is inline because the shell no longer keeps a .hint code rule.
      var codes = examplesEl.querySelectorAll('code');
      for (var c = 0; c < codes.length; c++) {
        codes[c].style.cssText = 'color:#e5e7eb;background:#070c14;border:1px solid #334155;' +
          'border-radius:5px;padding:1px 5px;font-size:11.5px;';
      }
    }
  }

  /* ---------------------------------------------------------------- one narrative */
  function findRow(key) {
    for (var i = 0; i < ROWS.length; i++) { if (ROWS[i].s.key === key) { return i; } }
    return -1;
  }

  function openNarrative(key, terms) {
    var rowIndex = findRow(key);
    if (rowIndex < 0) { location.replace('#/read/' + langOf() + '/' + state.target); return; }
    state.openKey = key;
    show('narrative');
    paintStaticStrings();
    var s = ROWS[rowIndex].s;
    narrTitleEl.innerHTML = titleSpans(s) +
      trLine(titleOf(s), 'tname') +
      '<div class="chips">' +
        '<span class="badge">' + labelSpan('jenis', s.jenis) + '</span>' +
        '<span class="badge style">' + labelSpan('style', styleOf(s)) + '</span>' +
        whoChips(s) +
      '</div>';
    narrEl.innerHTML = narrativeHTML(s);
    backBt.setAttribute('data-back', String(rowIndex));
    if (terms && terms.length) { highlight(terms); }
    resetScroll();
  }

  function highlight(terms) {
    var targets = [narrEl];
    for (var i = 0; i < targets.length; i++) {
      var el = targets[i];
      if (!el) { continue; }
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var nodes = [];
      while (walker.nextNode()) { nodes.push(walker.currentNode); }
      nodes.forEach(function (node) {
        var text = node.nodeValue, low = text.toLowerCase(), ranges = [];
        terms.forEach(function (t) {
          if (!t) { return; }
          var n = norm(t), from = 0, i2;
          while ((i2 = low.indexOf(n, from)) !== -1) {
            ranges.push([i2, i2 + n.length]); from = i2 + n.length;
          }
        });
        if (!ranges.length) { return; }
        ranges.sort(function (a, b) { return a[0] - b[0]; });
        var merged = [];
        ranges.forEach(function (r) {
          var last = merged[merged.length - 1];
          if (last && r[0] <= last[1]) { last[1] = Math.max(last[1], r[1]); }
          else { merged.push([r[0], r[1]]); }
        });
        var frag = document.createDocumentFragment(), pos = 0;
        merged.forEach(function (r) {
          if (r[0] > pos) { frag.appendChild(document.createTextNode(text.slice(pos, r[0]))); }
          var m = document.createElement('mark');
          m.textContent = text.slice(r[0], r[1]);
          frag.appendChild(m);
          pos = r[1];
        });
        if (pos < text.length) { frag.appendChild(document.createTextNode(text.slice(pos))); }
        node.parentNode.replaceChild(frag, node);
      });
    }
  }

  /* ---------------------------------------------------------------- clicks */
  /* Terms to highlight once the narrative screen has painted. Declared before the handlers that
   * write it, so the order of the file matches the order the values are used in. */
  var pendingTerms = null;

  document.addEventListener('click', function (e) {
    var pick = e.target.closest && e.target.closest('[data-pick]');
    if (pick) { location.hash = '#/target/' + pick.getAttribute('data-pick'); return; }
    var tgt = e.target.closest && e.target.closest('[data-target]');
    if (tgt) {
      if (tgt.getAttribute('aria-disabled') === 'true') { return; }
      location.hash = '#/read/' + (state.lang || 'id') + '/' + tgt.getAttribute('data-target');
      return;
    }
    var full = e.target.closest && e.target.closest('.readfull');
    if (full) {
      e.stopPropagation();
      var r = parseInt(full.getAttribute('data-row'), 10);
      var s = ROWS[r] && ROWS[r].s;
      if (s) {
        // The terms are recorded BEFORE the hash changes: the hashchange handler reads this to
        // decide what to highlight, and setting it afterwards would be a race the reader loses.
        var raw = input.value.trim();
        pendingTerms = raw ? raw.split(/\s+/).filter(Boolean) : [];
        location.hash = '#/read/' + langOf() + '/' + state.target + '/' + encodeURIComponent(s.key);
      }
      return;
    }
    var item = e.target.closest && e.target.closest('.titem');
    if (item) {
      var ri = parseInt(item.getAttribute('data-row'), 10);
      var ss = ROWS[ri] && ROWS[ri].s;
      if (ss) { location.hash = '#/read/' + langOf() + '/' + state.target + '/' + encodeURIComponent(ss.key); }
      return;
    }
    if (e.target.closest && e.target.closest('#back')) {
      location.hash = '#/read/' + langOf() + '/' + state.target;
      return;
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') { return; }
    var item = e.target.closest && e.target.closest('.titem');
    if (item && e.target === item) {
      e.preventDefault();
      var ri = parseInt(item.getAttribute('data-row'), 10);
      var ss = ROWS[ri] && ROWS[ri].s;
      if (ss) { location.hash = '#/read/' + langOf() + '/' + state.target + '/' + encodeURIComponent(ss.key); }
    }
  });

  /* ---------------------------------------------------------------- controls */
  /* The bar is always on screen, so typing in it always means something. From the title list a
   * search filters the list in place; from a narrative there is no list to filter, so the same
   * keystroke opens the titles that match and lets the reader pick. One input, one meaning. */
  function onSearchInput() {
    if (state.openKey && screens.narrative && !screens.narrative.hidden) {
      location.hash = '#/read/' + langOf() + '/' + state.target;
    }
    refresh();
  }
  if (input) { input.addEventListener('input', onSearchInput); }
  if (clearBt) {
    clearBt.addEventListener('click', function () { input.value = ''; onSearchInput(); input.focus(); });
  }
  for (var s2 = 0; s2 < scopeInputs.length; s2++) { scopeInputs[s2].addEventListener('change', onSearchInput); }
  if (romajiToggle) {
    romajiToggle.addEventListener('change', function () {
      document.documentElement.classList.toggle('hide-romaji', !romajiToggle.checked);
    });
  }
  /* The translation switch. Same shape as the romaji one: the class on <html> is the only state,
   * and `<html class="hide-tr">` carries the same default, so the two cannot disagree. */
  if (trToggle) {
    trToggle.addEventListener('change', function () {
      document.documentElement.classList.toggle('hide-tr', !trToggle.checked);
    });
  }

  var LOAD_AHEAD = 600;
  function maybeLoad() {
    var guard = 0;
    while (state.rendered < total() &&
           sentinel.getBoundingClientRect().top < window.innerHeight + LOAD_AHEAD &&
           guard++ < 50) { appendBatch(); }
    if (guard) { setCount(total()); }
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) { if (entries[i].isIntersecting) { maybeLoad(); } }
    }, { rootMargin: '600px 0px' }).observe(sentinel);
  }
  window.addEventListener('scroll', maybeLoad, { passive: true });


  window.addEventListener('hashchange', function () {
    var terms = pendingTerms;
    pendingTerms = null;
    route();
    if (terms && terms.length) { highlight(terms); }
  });

  /* The first route decides the screen. An unknown or empty hash goes to the language chooser,
   * which is where the flow starts. */
  route();
  if (!location.hash) { location.replace('#/lang'); }

  var gaps = Object.keys(missingWords);
  if (gaps.length) {
    console.warn('words missing from data/lexicon.js: ' + gaps.join(' '));
  }

  /* Exposed so a browser check can drive the screens without reaching into the closure. */
  window.SENTAPI = {
    rows: ROWS.length,
    state: state,
    route: route,
    refresh: refresh,
    styleOf: styleOf,
    narrativeHTML: narrativeHTML,
    titleItemHTML: titleItemHTML,
    missing: gaps
  };
})();
