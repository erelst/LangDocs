/* This file is the whole program. It renders the cards, filters them, and loads them as
 * the reader scrolls. There is no build step and no generator: the sentences live in
 * data/bank.js as data, and this reads them.
 *
 * Data files, loaded before this one:
 *   data/curated.js  the ten sentences the deck started with (window.CURATED)
 *   data/lexicon.js  word -> [romaji, gloss (ID), gloss (EN)]  (window.LEX)
 *   data/bank.js     the written sentences (window.BANK)
 *
 * A sentence in the bank stores its surfaces only. The romaji and the two glosses are
 * looked up here, so a word is written once in the lexicon and cannot be spelled one way
 * in one sentence and another way in the next. If a surface is missing, the card shows
 * the Japanese with empty glosses rather than failing, and the console names the word.
 *
 * Why the list is built on demand
 * -------------------------------
 * Each card is about 50 DOM nodes, because the dark theme, the per-word colours and the
 * underlines are written inline so they survive a renderer that drops <style>. One
 * thousand sentences is around 50,000 nodes, and the browser would have to lay all of
 * them out before anything appeared, and search would have to touch every one. So a
 * window of cards exists at a time and more are appended as the reader scrolls. Nothing
 * is ever removed, so the page only grows and the scrollbar never jumps.
 */
(function () {
  'use strict';

  var C = window.CONST;
  var LEX = window.LEX || {};
  var CURATED = window.CURATED || [];
  var BANK = window.BANK || [];

  /* Surfaces the lexicon does not know. Collected while rendering rather than asserted,
   * because a missing word should show as an empty gloss, not as a blank page. */
  var missingWords = {};

  /* The deck in reading order: the ten kept sentences first, then the written bank, with
   * any exact duplicate of a kept sentence dropped so nothing appears twice. */
  function assemble() {
    var out = [], seen = {};
    function push(list, topic, origin) {
      for (var i = 0; i < list.length; i++) {
        var s = list[i];
        var kanji = tokensOf(s).map(function (t) { return t[0]; }).join('');
        if (seen[kanji]) { continue; }
        seen[kanji] = 1;
        out.push({ s: s, topic: topic || '', origin: origin });
      }
    }
    push(CURATED, 'kurasi', 'kurasi');
    push(BANK, '', 'bank');
    return out;
  }

  var ROWS = assemble();

  /* Resolve a sentence's surfaces into full tokens [kanji, romaji, glossID, glossEN]. */
  function tokensOf(s) {
    if (s._t) { return s._t; }
    var out = [];
    for (var i = 0; i < s.t.length; i++) {
      var surface = s.t[i];
      if (Object.prototype.toString.call(surface) === '[object Array]') {
        out.push(surface);                       // curated sentences carry full tokens
        continue;
      }
      var e = lexEntry(surface);
      // A token that is punctuation alone has no word to look up and is not a gap.
      if (!e && bare(surface) !== '') { missingWords[surface] = 1; }
      out.push(e ? [surface, e[0], e[1], e[2]] : [surface, '', '', '']);
    }
    s._t = out;
    return out;
  }

  /* The register colour and labels follow from the relationship a sentence names, unless
   * the sentence carries them itself (the ten kept ones do). */
  function relOf(s) {
    return (C.rel && C.rel[s.rel]) || null;
  }
  function whoOf(s) {
    if (s.who) { return s.who; }
    var r = relOf(s);
    return r && r.close ? 'dekat' : 'asing';
  }
  function whoLabelOf(s) {
    if (s.whoId) { return [s.whoId, s.whoEn]; }
    var r = relOf(s);
    return r ? [r.id, r.en] : ['', ''];
  }

  function kanjiOf(s) {
    return tokensOf(s).map(function (t) { return t[0]; }).join('');
  }
  function romajiOf(s) {
    return tokensOf(s).map(function (t) { return t[1]; }).join(' ');
  }
  function translationOf(s) {
    return s.id + ' | ' + s.en;               // kept for the search index only
  }

  /* ---------------------------------------------------------------- card pieces */
  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function colourOf(i) { return C.palette[i % C.palette.length]; }
  function styleOf(i) { return C.underlines[i % C.underlines.length]; }

  /* The word bubble's contents. Three labelled rows rather than one run of text, because a
   * reader could not tell the reading from the two glosses when they were joined by a slash:
   * the marks "reading / meaning / meaning" are the answer to that, and each row is coloured
   * to match the row of the gloss table it belongs to.
   *
   * Nothing here repeats the word. idx is the line being built, 0 kanji and 1 romaji; on the
   * romaji line the reading is already on screen, so the bubble leaves it out and carries the
   * meaning only. Same rule on both lines: show what the line does not. */
  var MARK = { kana: 'romaji', id: 'arti', en: 'English' };

  function bubble(tokens, i, idx) {
    var t = tokens[i];
    var own = colourOf(i);          // the colour this word is drawn in, on both lines
    var rows = [];
    // The label is the real answer to "which of these is the romaji": a mark in front of each
    // row says it outright, and the colour only makes it quicker to see.
    if (idx !== 1 && t[1]) { rows.push(['kana', MARK.kana, t[1], own]); }
    if (t[2]) { rows.push(['id', MARK.id, t[2]]); }
    if (t[3]) { rows.push(['en', MARK.en, t[3]]); }
    if (!rows.length) { return ''; }
    /* The reading is coloured the same as the word it belongs to. Ten colours cycle through a
     * sentence, so a reader who hovers a word sees that word's own colour on its reading, which
     * answers "whose reading is this" without a label being read. The two glosses keep the fixed
     * colours the panel uses, because they are not the reading of anything.
     *
     * The mark and the text are separate boxes so the label behaves as one word: a label split
     * across a line reads as "ROMAJ / I", which is what a reader saw on a narrow screen. */
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
      var colour = colourOf(i), style = styleOf(i);
      var width = style === 'double' ? '3px' : '2px';
      var text = esc(tokens[i][idx]);
      // display:inline-block keeps each word atomic, so a narrow screen wraps between
      // words and never splits a word in half.
      out.push('<span class="tk" style="display:inline-block;color:' + colour +
        ' !important;border-bottom:' + width + ' ' + style + ' ' + colour +
        ' !important;padding:0 3px;">' + text + bubble(tokens, i, idx) + '</span>');
    }
    return out.join('');
  }

  /* A surface carries its sentence punctuation, because the punctuation rides on the word
   * so a line break can never separate them. The lexicon is keyed on the word alone, so the
   * lookup strips it and the card keeps it. */
  function bare(surface) {
    return String(surface).replace(/[、。！？…]+$/, '');
  }
  function lexEntry(surface) {
    var b = bare(surface);
    if (!b) { return null; }                 // the token is punctuation on its own
    return LEX[surface] || LEX[b];
  }

  /* The word-by-word table. A token that is only punctuation (。) is skipped: it is part of
   * the sentence, not a word, and giving it a row produced a line with a mark and two empty
   * glosses on every card. Colour is still taken from the token's own index so a word keeps
   * the same colour here as on the two lines above. */
  function glossRows(tokens) {
    var rows = [];
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (bare(t[0]) === '') { continue; }
      var colour = colourOf(i);
      var edge = 'border-bottom:1px solid ' + C.edgeSoft + ';vertical-align:top;padding:4px 8px;';
      rows.push('<tr>' +
        '<td class="gk" style="' + edge + 'color:' + colour +
          ' !important;font-weight:700;white-space:nowrap;">' + esc(bare(t[0])) + '</td>' +
        '<td class="gr" style="' + edge + 'color:' + C.textDim +
          ' !important;font-style:italic;white-space:nowrap;">' + esc(bare(t[1])) + '</td>' +
        '<td class="gi" style="' + edge + 'color:' + C.text + ' !important;">' + esc(t[2]) + '</td>' +
        '<td class="ge" style="' + edge + 'color:' + C.textDim + ' !important;">' + esc(t[3]) + '</td>' +
        '</tr>');
    }
    return rows.join('');
  }

  function qpanel(s) {
    var tokens = tokensOf(s);
    var whoColour = C.who[whoOf(s)] || C.accent;
    var polite = s.polite ? 'sopan' : 'biasa';
    var whoId = whoLabelOf(s);
    return '<div class="qpanel" style="box-sizing:border-box;background:' + C.bgPanel +
      ' !important;color:' + C.text + ' !important;border:1px solid ' + C.bgPanelEdge +
      ' !important;border-top:3px solid ' + C.accent + ' !important;border-radius:12px;' +
      'padding:14px 16px;margin-top:14px;box-shadow:0 10px 26px rgba(0,0,0,.45);' +
      'text-align:left;font-size:14px;line-height:1.55;">' +
      // register line: the only place a card says who the sentence is for, so the cards
      // themselves stay down to kanji + romaji + ?
      '<div style="margin:0 0 10px;padding-bottom:9px;border-bottom:1px solid ' + C.edge + ';">' +
      '<span style="display:inline-block;background:' + whoColour +
        ';color:' + C.inkOnChip + ' !important;font-weight:800;border-radius:20px;padding:1px 10px;' +
        'font-size:12.5px;white-space:nowrap;">' + esc(whoId[0]) + '</span>' +
      '<span style="display:inline-block;margin-left:6px;border:1px solid ' + whoColour +
        ';color:' + whoColour + ' !important;border-radius:20px;padding:0 9px;font-size:12.5px;' +
        'white-space:nowrap;">' + polite + '</span>' +
      // both languages, matching the ID/EN pairing used for the translation and glosses,
      // so no line is English-only
      '<div style="margin-top:7px;font-size:12.5px;color:' + C.textDim + ' !important;">' +
      '<p style="margin:0 0 3px;"><b style="color:' + whoColour + ' !important;">ID</b> ' +
        esc(whoId[0]) + ' &middot; ' + esc(s.sit) + '</p>' +
      '<p style="margin:0;"><b style="color:' + whoColour + ' !important;">EN</b> ' +
        esc(whoId[1]) + ' &middot; ' + esc(s.sitEn) + '</p></div></div>' +
      '<p style="margin:0 0 6px;font-size:16px;color:' + C.bright + ' !important;">' +
      '<b style="color:' + C.accent + ';">ID</b> ' + esc(s.id) + '</p>' +
      '<p style="margin:0 0 12px;font-size:16px;color:' + C.bright + ' !important;">' +
      '<b style="color:' + C.accent + ';">EN</b> ' + esc(s.en) + '</p>' +
      '<table class="gloss" style="border-collapse:collapse;width:100%;font-size:13.5px;">' +
      glossRows(tokens) + '</table>' +
      '<div style="margin-top:12px;padding-top:10px;border-top:1px dashed ' + C.edgeSoft +
      ';font-size:13px;color:' + C.textDim + ' !important;">' +
      '<p style="margin:0 0 4px;"><b style="color:' + C.accent + ' !important;">ID</b> ' +
        esc(s.note) + '</p>' +
      '<p style="margin:0;"><b style="color:' + C.accent + ' !important;">EN</b> ' +
        esc(s.noteEn) + '</p></div></div>';
  }

  function cardHTML(row) {
    var s = row.s, tokens = tokensOf(s);
    return '<section class="jp-sent" style="position:relative;background:' + C.bg +
      ' !important;border:1px solid ' + C.edge + ' !important;border-left:5px solid ' +
      C.accent + ' !important;border-radius:12px;margin:16px 0;' +
      'padding:16px 58px 16px 18px;overflow:visible;">' +
      '<div class="kanji" style="font-size:23px;line-height:2.0;font-weight:500;' +
        'color:' + C.bright + ' !important;white-space:normal;overflow-wrap:anywhere;' +
        'padding-right:6px;">' + tokenSpans(tokens, 0) + '</div>' +
      '<div class="romaji" style="font-size:15px;line-height:1.85;font-style:italic;' +
        'color:' + C.textDim + ' !important;margin-top:3px;white-space:normal;' +
        'overflow-wrap:anywhere;">' + tokenSpans(tokens, 1) + '</div>' +
      // ? expander: display:block + list-style:none removes the triangle without CSS,
      // and the panel is in-flow so the card grows to hold it.
      '<details class="qdet">' +
      '<summary title="Terjemahan / Translation, dan kepada siapa kalimat ini dipakai" ' +
      'aria-label="Terjemahan, arti per kata, dan lawan bicara" ' +
      'style="display:block;list-style:none;cursor:pointer;width:34px;height:34px;' +
      'line-height:30px;text-align:center;border-radius:50%;background:' + C.edge +
      ' !important;color:' + C.bright + ' !important;font-weight:700;font-size:17px;border:2px solid ' +
      C.accent + ' !important;box-shadow:0 2px 8px rgba(0,0,0,.5);user-select:none;">?</summary>' +
      qpanel(s) + '</details></section>';
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

  function buildIndex(rows) {
    var all = [], jp = [];
    for (var i = 0; i < rows.length; i++) {
      var s = rows[i].s, tokens = tokensOf(s);
      var tk = [], tr = [];
      for (var k = 0; k < tokens.length; k++) { tk.push(tokens[k][0]); tr.push(tokens[k][1]); }
      var japanese = [kanjiOf(s), romajiOf(s)].concat(tk).concat(tr);
      var jpParts = norm(japanese.join(' '));
      for (var j = 0; j < japanese.length; j++) { jpParts += '\u0001' + norm(japanese[j]); }
      jp.push(jpParts);

      /* The relationship line is indexed because it is the only place a card names who the
       * sentence is said to, and a reader looking for "pasangan" or "petugas toko" is asking a
       * real question: which sentences do I have for this person. It was missing, so searching
       * "pasangan" found one card: the one whose translation happened to contain the word. The
       * other 21 could not be found by the only label they have. Nothing is displayed by being
       * indexed, so V3 (the register lives in the panel only) is untouched. */
      var who = whoLabelOf(s);
      var everything = japanese.concat([s.id, s.en, s.sit, s.sitEn, s.note, s.noteEn, who[0], who[1]]);
      var allParts = norm(everything.join(' '));
      // each field, and each token, also on its own, so a single kanji or a single gloss
      // matches without needing the surrounding words
      for (var m = 0; m < everything.length; m++) { allParts += '\u0001' + norm(everything[m]); }
      for (var g = 0; g < tokens.length; g++) {
        allParts += '\u0001' + norm(tokens[g][2]) + '\u0001' + norm(tokens[g][3]);
      }
      all.push(allParts);
    }
    return { all: all, jp: jp };
  }
  var INDEX = buildIndex(ROWS);

  /* ------------------------------------------------------------- list state */
  var list = document.getElementById('list');
  var input = document.getElementById('q');
  var countEl = document.getElementById('count');
  var emptyEl = document.getElementById('empty');
  var clearBt = document.getElementById('clear');
  var sentinel = document.getElementById('sentinel');
  var scopeInputs = document.querySelectorAll('input[name="scope"]');
  var romajiToggle = document.getElementById('rtoggle');

  var BATCH = 20;                  // cards appended per scroll step
  var state = { show: null, rendered: 0, terms: [] };

  function matches(scope) {
    var raw = input.value.trim();
    if (!raw) { return null; }
    var terms = raw.split(/\s+/).filter(Boolean).map(norm);
    var hay = scope === 'jp' ? INDEX.jp : INDEX.all;
    var out = [];
    for (var i = 0; i < hay.length; i++) {
      var ok = true;
      for (var t = 0; t < terms.length; t++) {
        if (hay[i].indexOf(terms[t]) === -1) { ok = false; break; }
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

  function appendBatch() {
    if (state.rendered >= total()) { return 0; }
    var end = Math.min(state.rendered + BATCH, total());
    var html = [];
    for (var i = state.rendered; i < end; i++) {
      html.push(cardHTML(ROWS[state.show ? state.show[i] : i]));
    }
    var before = list.children.length;
    list.insertAdjacentHTML('beforeend', html.join(''));
    state.rendered = end;
    markNew(before);
    return list.children.length - before;
  }

  function markNew(fromIndex) {
    if (!state.terms.length) { return; }
    for (var i = fromIndex; i < list.children.length; i++) { highlight(list.children[i]); }
  }

  function highlight(card) {
    // The panel is included because a match may sit only in the translation, the register
    // line or the usage note, and a card that matched with nothing marked looks broken.
    var targets = [card.querySelector('.kanji'), card.querySelector('.romaji'),
                   card.querySelector('.qpanel')];
    for (var i = 0; i < targets.length; i++) { mark(targets[i], state.terms); }
  }

  function mark(el, terms) {
    if (!el) { return; }
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) { nodes.push(walker.currentNode); }

    nodes.forEach(function (node) {
      var text = node.nodeValue, low = text.toLowerCase(), ranges = [];
      terms.forEach(function (t) {
        if (!t) { return; }
        var from = 0, i;
        while ((i = low.indexOf(t, from)) !== -1) { ranges.push([i, i + t.length]); from = i + t.length; }
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

  function setCount(shown) {
    var done = state.rendered < shown;
    countEl.textContent = (input.value.trim() ? shown + ' / ' + ROWS.length + ' ' + C.countWord
                                             : ROWS.length + ' ' + C.countWord) +
                          (done ? ' \u00b7 ' + C.scrollHint : '');
    emptyEl.hidden = shown !== 0;
    clearBt.hidden = !input.value.trim();
  }

  /* The bar is sticky, so it is already on screen when the reader is scrolled down; what
   * they are looking at instead is the middle of the old result. The cause is that this
   * empties and refills the list in one synchronous task, so the browser never sees a
   * shorter document and never clamps the old scroll offset. While that offset stays
   * wherever it was, the sentinel is still in view and the auto-fill keeps appending.
   *
   * Putting the reader back at the top is what "show the top results" means, and it makes
   * the load loop start from the top too. scrollTo at the end of the task is applied to the
   * document as reflowed, and the auto-fill below cannot push past the viewport anyway, so
   * the position holds. */
  function resetScroll() {
    window.scrollTo(0, 0);
  }

  function refresh() {
    var raw = input.value.trim();
    state.terms = raw ? raw.split(/\s+/).filter(Boolean) : [];
    state.show = matches(currentScope());
    list.innerHTML = '';
    state.rendered = 0;
    appendBatch();
    setCount(total());
    // If the first batch does not fill the viewport, keep going, or the sentinel would
    // already be visible and nothing would ever load.
    while (sentinel.getBoundingClientRect().top < window.innerHeight + 200 &&
           state.rendered < total()) {
      appendBatch();
    }
    resetScroll();
    ensureLoader();
  }

  /* ------------------------------------------------------ one panel at a time */
  function closeAll(except) {
    var open = list.querySelectorAll('details.qdet[open]');
    for (var i = 0; i < open.length; i++) { if (open[i] !== except) { open[i].open = false; } }
  }

  // Cards are created after load, so a per-element listener would have to be attached
  // every time one is appended. A delegated listener covers every card that will ever
  // exist. The toggle event does not bubble, so this is the capture phase.
  list.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d && d.tagName === 'DETAILS' && d.open) { closeAll(d); }
  }, true);

  document.addEventListener('click', function (e) {
    if (!e.target.closest('details.qdet')) { closeAll(null); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') { closeAll(null); }
  });

  /* A bubble belongs to its word, so the word is the containing block and the bubble is placed
   * by CSS alone. The one thing CSS cannot know is where the screen ends: a word near the right
   * edge would push its bubble off-screen and the reader would see half of it. This nudges the
   * drawn bubble back inside, by translating it, and never touches the markup. Measured after
   * display changes, so the box is real when it is read.
   *
   * This runs at every width. On a narrow screen the bubble is capped to the viewport by CSS and
   * wraps, and this is what stops it sticking out on the word that sits nearest the edge.
   *
   * Vertically too, and that half was missing. Only the horizontal edges were compared, so a word
   * near the top of a phone screen got a bubble whose top was 55px ABOVE the viewport: the label
   * rows are the first thing in the bubble, so the reader saw the last row and nothing else. The
   * report was about a wrapping label and the real damage was a bubble outside the screen.
   *
   * When there is no room above, the bubble goes below the word instead of being cut off. The tail
   * moves to the top edge so it still points at the word. A bubble the reader has to scroll to is
   * a bubble with something hidden, which is the same rule the horizontal case follows. */
  function keepBubbleOnScreen(tk) {
    var tip = tk.querySelector('.tip');
    if (!tip) { return; }
    tip.style.transform = '';
    tip.classList.remove('below');
    var box = tip.getBoundingClientRect();
    var slack = 8;
    var move = 0;
    // The word may be narrower than the bubble, so both its edges are compared, not just one.
    if (box.right > window.innerWidth - slack) { move = window.innerWidth - slack - box.right; }
    if (box.left + move < slack) { move = slack - box.left; }
    if (box.top < slack) {
      tip.classList.add('below');
      tip.style.transform = move ? 'translateX(' + Math.round(move) + 'px)' : '';
      box = tip.getBoundingClientRect();
      // below may still run past the bottom on a short screen; lift it just enough to fit
      if (box.bottom > window.innerHeight - slack) {
        var lift = box.bottom - (window.innerHeight - slack);
        tip.style.transform = 'translate(' + Math.round(move) + 'px, ' + (-Math.round(lift)) + 'px)';
      }
      return;
    }
    if (move) { tip.style.transform = 'translateX(' + Math.round(move) + 'px)'; }
  }
  list.addEventListener('mouseover', function (e) {
    var tk = e.target.closest && e.target.closest('.tk');
    if (tk && list.contains(tk)) { keepBubbleOnScreen(tk); }
  });
  list.addEventListener('focusin', function (e) {
    var tk = e.target.closest && e.target.closest('.tk');
    if (tk && list.contains(tk)) { keepBubbleOnScreen(tk); }
  });

  function openFromHash() {
    var m = /^#q(\d+)$/.exec(location.hash || '');
    if (!m) { return; }
    var target = parseInt(m[1], 10) - 1;
    if (target < 0 || target >= ROWS.length) { return; }
    input.value = '';
    state.terms = [];
    state.show = null;
    while (state.rendered <= target) { appendBatch(); }
    var card = list.children[target];
    if (!card) { return; }
    var d = card.querySelector('details.qdet');
    if (d) { d.open = true; }
    card.scrollIntoView({ block: 'nearest' });
  }

  /* ---------------------------------------------------------------- controls */
  if (input) { input.addEventListener('input', refresh); }
  if (clearBt) {
    clearBt.addEventListener('click', function () { input.value = ''; refresh(); input.focus(); });
  }
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var shown = list.querySelectorAll('.jp-sent');
      if (shown.length === 1) {
        var d = shown[0].querySelector('details.qdet');
        if (d) { d.open = true; }
      }
    }
  });
  for (var s = 0; s < scopeInputs.length; s++) {
    scopeInputs[s].addEventListener('change', refresh);
  }
  if (romajiToggle) {
    romajiToggle.addEventListener('change', function () {
      document.documentElement.classList.toggle('hide-romaji', !romajiToggle.checked);
    });
  }

  // Keep appending until the sentinel is pushed past the load threshold. Appending only
  // once per trigger stalls as soon as the batch is shorter than the threshold: the
  // sentinel stays in view, no further intersection event arrives, and the list stops
  // growing even though the reader is at the bottom.
  var LOAD_AHEAD = 600;
  function maybeLoad() {
    var guard = 0;
    while (state.rendered < total() &&
           sentinel.getBoundingClientRect().top < window.innerHeight + LOAD_AHEAD &&
           guard++ < 50) {
      appendBatch();
    }
    if (guard) { setCount(total()); }
  }

  // Three triggers, because none is reliable on its own: IntersectionObserver for the
  // common case and for a viewport already taller than the list; the scroll listener for
  // immediate response while dragging; and a timer, because some environments do not
  // deliver the first two. The timer stops once the whole bank is in the DOM and restarts
  // when a search changes what is left to render.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) { if (entries[i].isIntersecting) { maybeLoad(); } }
    }, { rootMargin: '600px 0px' }).observe(sentinel);
  }
  window.addEventListener('scroll', maybeLoad, { passive: true });

  var loadTimer = null;
  function ensureLoader() {
    if (loadTimer !== null) { return; }
    loadTimer = setInterval(function () {
      if (state.rendered >= total()) { clearInterval(loadTimer); loadTimer = null; return; }
      maybeLoad();
    }, 200);
  }

  window.addEventListener('hashchange', openFromHash);

  refresh();
  openFromHash();
  if (input) { input.focus(); }

  // Anything the lexicon was missing, said out loud once, so a gap is visible while
  // writing rather than showing up as a blank gloss on the page.
  var gaps = Object.keys(missingWords);
  if (gaps.length) {
    console.warn('words missing from data/lexicon.js: ' + gaps.join(' '));
  }

  // Exposed so a browser check can drive the list and compare renderers.
  window.SENTAPI = {
    cardHTML: cardHTML,
    refresh: refresh,
    appendBatch: appendBatch,
    state: state,
    rows: ROWS.length,
    rendered: function () { return list.children.length; },
    missing: gaps
  };
})();
