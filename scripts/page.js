/* Card rendering and list management for the sentence page.
 *
 * This file is read by scripts/build_page.py and inlined into index.html. Keeping
 * it as a real .js file (rather than a Python string) means node can syntax-check
 * it and the build can compare its output against the Python renderer, which is
 * what stops the two from drifting apart.
 *
 * Data comes from window.SENT:
 *   SENT.C     colour and style constants, injected from scripts/render.py so the
 *              palette cannot be duplicated here
 *   SENT.rows  one compact array per sentence (see FIELD order below)
 *   SENT.first how many cards the HTML already contains
 *
 * Why the list is built on demand
 * -------------------------------
 * Every card costs about 50 DOM nodes because the dark theme, the per-word colours
 * and the underlines are written inline. At 1,583 sentences that is ~75,000 nodes,
 * and the browser must lay all of them out before anything appears; searching then
 * has to touch every one of them. So only a window of cards exists at a time and
 * more are appended as the reader scrolls. Nothing is ever removed, so the page
 * height only grows and the scrollbar never jumps (unlike a recycling virtual list).
 */
(function () {
  'use strict';

  var SENT = window.SENT || {};
  var C = SENT.C || {};
  var ROWS = SENT.rows || [];

  // FIELD order in each compact row
  var F_KANJI = 0, F_ROMAJI = 1, F_TR_ID = 2, F_TR_EN = 3, F_WHO_ID = 4,
      F_WHO_EN = 5, F_POLITE = 6, F_SIT = 7, F_SIT_EN = 8, F_NOTE = 9,
      F_NOTE_EN = 10, F_TOKENS = 11, F_WHO = 12;

  // The first card is not rendered by the initial HTML: this reads whether the
  // build already put cards in the list and adopts them, so the list is not
  // rebuilt twice on load.
  var BATCH = 30;                 // cards appended per scroll step

  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function colourOf(i) { return C.palette[i % C.palette.length]; }
  function styleOf(i) { return C.underlines[i % C.underlines.length]; }

  /* ------------------------------------------------------------- card pieces */
  function tokenSpans(tokens, idx) {
    var out = [];
    for (var i = 0; i < tokens.length; i++) {
      var colour = colourOf(i), style = styleOf(i);
      var width = style === 'double' ? '3px' : '2px';
      var text = esc(tokens[i][idx]);
      // display:inline-block keeps each word atomic, so a narrow screen wraps
      // between words and never splits a word in half.
      out.push('<span class="tk" style="display:inline-block;color:' + colour +
        ' !important;border-bottom:' + width + ' ' + style + ' ' + colour +
        ' !important;padding:0 3px;" title="' + text + '">' + text + '</span>');
    }
    return out.join('');
  }

  function glossRows(tokens) {
    var rows = [];
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i], colour = colourOf(i);
      var edge = 'border-bottom:1px solid ' + C.edgeSoft + ';vertical-align:top;padding:4px 8px;';
      rows.push('<tr>' +
        '<td class="gk" style="' + edge + 'color:' + colour +
          ' !important;font-weight:700;white-space:nowrap;">' + esc(t[0]) + '</td>' +
        '<td class="gr" style="' + edge + 'color:' + C.textDim +
          ' !important;font-style:italic;white-space:nowrap;">' + esc(t[1]) + '</td>' +
        '<td class="gi" style="' + edge + 'color:' + C.text + ' !important;">' + esc(t[2]) + '</td>' +
        '<td class="ge" style="' + edge + 'color:' + C.textDim + ' !important;">' + esc(t[3]) + '</td>' +
        '</tr>');
    }
    return rows.join('');
  }

  function qpanel(r) {
    var tokens = r[F_TOKENS];
    var whoColour = C.who[r[F_WHO]] || C.accent;
    return '<div class="qpanel" style="box-sizing:border-box;background:' + C.bgPanel +
      ' !important;color:' + C.text + ' !important;border:1px solid ' + C.bgPanelEdge +
      ' !important;border-top:3px solid ' + C.accent + ' !important;border-radius:12px;' +
      'padding:14px 16px;margin-top:14px;box-shadow:0 10px 26px rgba(0,0,0,.45);' +
      'text-align:left;font-size:14px;line-height:1.55;">' +
      // register line: the only place a block says who the sentence is for, so the
      // blocks themselves stay down to kanji + romaji + ?
      '<div style="margin:0 0 10px;padding-bottom:9px;border-bottom:1px solid ' + C.edge + ';">' +
      '<span style="display:inline-block;background:' + whoColour +
        ';color:' + C.inkOnChip + ' !important;font-weight:800;border-radius:20px;padding:1px 10px;' +
        'font-size:12.5px;white-space:nowrap;">' + esc(r[F_WHO_ID]) + '</span>' +
      '<span style="display:inline-block;margin-left:6px;border:1px solid ' + whoColour +
        ';color:' + whoColour + ' !important;border-radius:20px;padding:0 9px;font-size:12.5px;' +
        'white-space:nowrap;">' + esc(r[F_POLITE]) + '</span>' +
      // both languages, matching the ID/EN pairing used for the translation and the
      // glosses, so no line is English-only
      '<div style="margin-top:7px;font-size:12.5px;color:' + C.textDim + ' !important;">' +
      '<p style="margin:0 0 3px;"><b style="color:' + whoColour + ' !important;">ID</b> ' +
        esc(r[F_WHO_ID]) + ' &middot; ' + esc(r[F_SIT]) + '</p>' +
      '<p style="margin:0;"><b style="color:' + whoColour + ' !important;">EN</b> ' +
        esc(r[F_WHO_EN]) + ' &middot; ' + esc(r[F_SIT_EN]) + '</p></div></div>' +
      '<p style="margin:0 0 6px;font-size:16px;color:' + C.bright + ' !important;">' +
      '<b style="color:' + C.accent + ';">ID</b> ' + esc(r[F_TR_ID]) + '</p>' +
      '<p style="margin:0 0 12px;font-size:16px;color:' + C.bright + ' !important;">' +
      '<b style="color:' + C.accent + ';">EN</b> ' + esc(r[F_TR_EN]) + '</p>' +
      '<table class="gloss" style="border-collapse:collapse;width:100%;font-size:13.5px;">' +
      glossRows(tokens) + '</table>' +
      '<div style="margin-top:12px;padding-top:10px;border-top:1px dashed ' + C.edgeSoft +
      ';font-size:13px;color:' + C.textDim + ' !important;">' +
      '<p style="margin:0 0 4px;"><b style="color:' + C.accent + ' !important;">ID</b> ' +
        esc(r[F_NOTE]) + '</p>' +
      '<p style="margin:0;"><b style="color:' + C.accent + ' !important;">EN</b> ' +
        esc(r[F_NOTE_EN]) + '</p></div></div>';
  }

  function cardHTML(r) {
    return '<section class="jp-sent" style="position:relative;background:' + C.bg +
      ' !important;border:1px solid ' + C.edge + ' !important;border-left:5px solid ' +
      C.accent + ' !important;border-radius:12px;margin:16px 0;' +
      'padding:16px 58px 16px 18px;overflow:visible;">' +
      '<div class="kanji" style="font-size:23px;line-height:2.0;font-weight:500;' +
        'color:' + C.bright + ' !important;white-space:normal;overflow-wrap:anywhere;' +
        'padding-right:6px;">' + tokenSpans(r[F_TOKENS], 0) + '</div>' +
      '<div class="romaji" style="font-size:15px;line-height:1.85;font-style:italic;' +
        'color:' + C.textDim + ' !important;margin-top:3px;white-space:normal;' +
        'overflow-wrap:anywhere;">' + tokenSpans(r[F_TOKENS], 1) + '</div>' +
      // ? expander: display:block + list-style:none removes the triangle without CSS,
      // and the panel is in-flow so the card grows to hold it.
      '<details class="qdet">' +
      '<summary title="Terjemahan / Translation, dan kepada siapa kalimat ini dipakai" ' +
      'aria-label="Terjemahan, arti per kata, dan lawan bicara" ' +
      'style="display:block;list-style:none;cursor:pointer;width:34px;height:34px;' +
      'line-height:30px;text-align:center;border-radius:50%;background:' + C.edge +
      ' !important;color:' + C.bright + ' !important;font-weight:700;font-size:17px;border:2px solid ' +
      C.accent + ' !important;box-shadow:0 2px 8px rgba(0,0,0,.5);user-select:none;">?</summary>' +
      qpanel(r) + '</details></section>';
  }

  /* --------------------------------------------------------------- matching */
  function stripDiacritics(s) {
    return s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : s;
  }

  // Fold kana romanisation variants so "ohayo", "ohayou" and "ohayō" all match.
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

  // One normalised haystack per row, with the Japanese-only variant alongside so the
  // search filter can choose which one to consult.
  function buildIndex(rows) {
    var all = [], jp = [];
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i], tokens = r[F_TOKENS];
      var tk = [], tr = [];
      for (var k = 0; k < tokens.length; k++) { tk.push(tokens[k][0]); tr.push(tokens[k][1]); }

      var japanese = [r[F_KANJI], r[F_ROMAJI]].concat(tk).concat(tr);
      var jpParts = norm(japanese.join(' '));
      for (var j = 0; j < japanese.length; j++) { jpParts += '\u0001' + norm(japanese[j]); }
      jp.push(jpParts);

      var everything = japanese.concat([r[F_TR_ID], r[F_TR_EN], r[F_SIT], r[F_SIT_EN],
                                       r[F_NOTE], r[F_NOTE_EN]]);
      var allParts = norm(everything.join(' '));
      // each field, and each token, also on its own so a single kanji or a single
      // gloss matches without needing the surrounding words
      for (var m = 0; m < everything.length; m++) { allParts += '\u0001' + norm(everything[m]); }
      for (var g = 0; g < tokens.length; g++) {
        allParts += '\u0001' + norm(tokens[g][2]) + '\u0001' + norm(tokens[g][3]);
      }
      all.push(allParts);
    }
    return { all: all, jp: jp };
  }

  var INDEX = buildIndex(ROWS);

  // ------------------------------------------------------------- list state
  var list = document.getElementById('list');
  var input = document.getElementById('q');
  var countEl = document.getElementById('count');
  var emptyEl = document.getElementById('empty');
  var clearBt = document.getElementById('clear');
  var sentinel = document.getElementById('sentinel');
  var scopeInputs = document.querySelectorAll('input[name="scope"]');
  var romajiToggle = document.getElementById('rtoggle');

  var state = { show: null, rendered: 0 };

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

  function appendBatch() {
    var indices = state.show || null;
    var total = indices ? indices.length : ROWS.length;
    if (state.rendered >= total) { return 0; }
    var end = Math.min(state.rendered + BATCH, total);
    var html = [];
    for (var i = state.rendered; i < end; i++) {
      html.push(cardHTML(ROWS[indices ? indices[i] : i]));
    }
    var before = list.children.length;
    list.insertAdjacentHTML('beforeend', html.join(''));
    // rendered counts cards emitted, which can differ from DOM children while a
    // search filter is active; keep both so the counter and the loader agree.
    state.rendered = end;
    markNew(before);
    return list.children.length - before;
  }

  // Highlight the freshly appended cards when a search is active.
  function markNew(fromIndex) {
    if (!state.terms || !state.terms.length) { return; }
    for (var i = fromIndex; i < list.children.length; i++) {
      highlight(list.children[i]);
    }
  }

  function highlight(card) {
    // The panel is included because a match may sit only in the translation, the
    // register line or the usage note, and a card that matched with nothing marked
    // looks like a bug to the reader.
    var terms = state.terms;
    var targets = [card.querySelector('.kanji'), card.querySelector('.romaji'),
                   card.querySelector('.qpanel')];
    for (var i = 0; i < targets.length; i++) { mark(targets[i], terms); }
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

  function refresh() {
    state.terms = (function () {
      var raw = input.value.trim();
      return raw ? raw.split(/\s+/).filter(Boolean) : [];
    }());
    state.show = matches(currentScope());
    list.innerHTML = '';
    state.rendered = 0;
    appendBatch();
    setCount(state.show ? state.show.length : ROWS.length);
    // If the first batch does not fill the viewport, keep going, or the sentinel
    // would already be visible and nothing would ever load.
    while (sentinel.getBoundingClientRect().top < window.innerHeight + 200 &&
           state.rendered < (state.show ? state.show.length : ROWS.length)) {
      appendBatch();
    }
    ensureLoader();
  }

  /* ------------------------------------------------------ one panel at a time */
  function closeAll(except) {
    var open = list.querySelectorAll('details.qdet[open]');
    for (var i = 0; i < open.length; i++) { if (open[i] !== except) { open[i].open = false; } }
  }

  // Cards are created after load, so a per-element listener would have to be
  // attached every time one is appended. A delegated listener on the list covers
  // every card that will ever exist. The toggle event does not bubble, so this is
  // registered for the capture phase.
  list.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d && d.tagName === 'DETAILS' && d.open) { closeAll(d); }
  }, true);

  // Clicking anywhere outside a panel closes the open one.
  document.addEventListener('click', function (e) {
    if (!e.target.closest('details.qdet')) { closeAll(null); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') { closeAll(null); }
  });

  function openFromHash() {
    var m = /^#q(\d+)$/.exec(location.hash || '');
    if (!m) { return; }
    var target = parseInt(m[1], 10) - 1;
    if (target < 0 || target >= ROWS.length) { return; }
    input.value = '';
    state.terms = [];
    state.show = null;
    // Render far enough to include the target, then open it.
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
    clearBt.addEventListener('click', function () {
      input.value = ''; refresh(); input.focus();
    });
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

  // Keep appending until the sentinel is pushed past the load threshold. Appending
  // only once per trigger stalls as soon as the appended batch is shorter than the
  // threshold: the sentinel stays in view, no further intersection event arrives,
  // and the list stops growing even though the reader is at the bottom.
  var LOAD_AHEAD = 600;
  function maybeLoad() {
    var total = state.show ? state.show.length : ROWS.length;
    var guard = 0;
    while (state.rendered < total &&
           sentinel.getBoundingClientRect().top < window.innerHeight + LOAD_AHEAD &&
           guard++ < 50) {
      appendBatch();
    }
    if (guard) { setCount(total); }
  }

  // Three triggers, because none of them is reliable on its own:
  //   * IntersectionObserver for the common case, and for a viewport already taller
  //     than the rendered list, where no scroll ever happens
  //   * the scroll listener for immediate response while dragging
  //   * a timer, because some environments (headless with a virtual clock, and
  //     browsers that batch scroll delivery) do not deliver the first two
  // The timer stops itself once the whole bank is in the DOM, and restarts when a
  // search changes what is left to render.
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
      var total = state.show ? state.show.length : ROWS.length;
      if (state.rendered >= total) { clearInterval(loadTimer); loadTimer = null; return; }
      maybeLoad();
    }, 200);
  }

  window.addEventListener('hashchange', openFromHash);

  // Adopt the cards the HTML already contains instead of rendering them again.
  state.rendered = list.children.length;
  setCount(state.show ? state.show.length : ROWS.length);
  ensureLoader();
  openFromHash();
  if (input) { input.focus(); }

  // Exposed so scripts/verify_page.py can check the JS renderer against the Python
  // one and drive the list without guessing at internals.
  window.SENTAPI = {
    cardHTML: cardHTML,
    refresh: refresh,
    appendBatch: appendBatch,
    state: state,
    rows: ROWS.length,
    rendered: function () { return list.children.length; }
  };
})();
