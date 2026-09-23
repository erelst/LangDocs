#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build index.html for GitHub Pages.

GitHub strips `style` attributes in Markdown, so rendered Markdown cannot show
these cards as designed. GitHub Pages serves a plain HTML file untouched, so the
dark cards, hover behaviour and JavaScript work in full here.

The blocks come from scripts/render.py, so colours, underlines, wrapping and the
? panel have a single source of truth.


Page-level behaviour added here
-------------------------------
* only one ? panel open at a time
* clicking outside, or pressing Escape, closes the open panel
* the open panel is lifted above the other cards' ? buttons (z-index)
* flexible search: kanji, romaji, Indonesian or English, and mixtures of them
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import render as B   # noqa: E402  (single source of truth for the cards)


# --------------------------------------------------------------------------- index
def search_index():
    """One record per sentence, holding every searchable field."""
    out = []
    for s in B.SENTENCES:
        toks = s['tokens']
        out.append({
            'id': s['id'],
            'kanji': s['kanji'],
            'romaji': s['romaji'],
            'tr_id': s['id_translation'],
            'tr_en': s['en_translation'],
            'tok_kanji': [t[0] for t in toks],
            'tok_romaji': [t[1] for t in toks],
            'gloss_id': [t[2] for t in toks],
            'gloss_en': [t[3] for t in toks],
        })
    return out


# --------------------------------------------------------------------------- page
PAGE_JS = r'''
(function () {
  'use strict';

  /* ---------------------------------------------------------------- tooltips */
  var panels = Array.prototype.slice.call(document.querySelectorAll('details.qdet'));

  function closeAll(except) {
    panels.forEach(function (d) {
      if (d !== except && d.open) { d.open = false; }
    });
  }

  // The panel is in-flow content of the card, so opening it only grows the card.
  // There is no floating layer to position and no dim layer to manage.
  function openFromHash() {
    var m = /^#q(\d+)$/.exec(location.hash || '');
    if (!m) { return; }
    var d = panels[parseInt(m[1], 10) - 1];
    if (!d) { return; }
    d.open = true;
    // bring the whole card into view, including the part that just expanded
    d.closest('.jp-sent').scrollIntoView({ block: 'nearest' });
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  panels.forEach(function (d) {
    var card = d.closest('.jp-sent');
    d.addEventListener('toggle', function () {
      if (d.open) {
        closeAll(d);                    // only one open at a time
        card.classList.add('is-open');
      } else {
        card.classList.remove('is-open');
      }
    });
  });
  // click outside any ? control closes the open panel
  document.addEventListener('click', function (e) {
    if (!e.target.closest('details.qdet')) { closeAll(null); }
  });
  // Escape closes too
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') { closeAll(null); }
  });

  /* ---------------------------------------------------------------- search */
  var input   = document.getElementById('q');
  var clearBt = document.getElementById('clear');
  var countEl = document.getElementById('count');
  var emptyEl = document.getElementById('empty');
  var cards   = Array.prototype.slice.call(document.querySelectorAll('.jp-sent'));
  var INDEX   = JSON.parse(document.getElementById('idx').textContent);

  // remember the original markup so highlights can be reset cleanly
  cards.forEach(function (c) {
    var k = c.querySelector('.kanji');
    var r = c.querySelector('.romaji');
    var p = c.querySelector('.qpanel');
    c._orig = { kanji: k ? k.innerHTML : '', romaji: r ? r.innerHTML : '',
                qpanel: p ? p.innerHTML : '' };
  });

  function stripDiacritics(s) {
    return s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : s;
  }

  // Fold kana romanisation variants so "ohayo", "ohayou" and "ohayō" all match.
  function norm(s) {
    var t = stripDiacritics(String(s).toLowerCase());
    t = t
      .replace(/sha/g, 'sya').replace(/shu/g, 'syu').replace(/sho/g, 'syo').replace(/shi/g, 'si')
      .replace(/cha/g, 'tya').replace(/chu/g, 'tyu').replace(/cho/g, 'tyo').replace(/chi/g, 'ti')
      .replace(/ja/g, 'zya').replace(/ju/g, 'zyu').replace(/jo/g, 'zyo').replace(/ji/g, 'zi')
      .replace(/tsu/g, 'tu')
      .replace(/ou/g, 'o').replace(/uu/g, 'u').replace(/oo/g, 'o')
      .replace(/aa/g, 'a').replace(/ee/g, 'e').replace(/ii/g, 'i');
    return t;
  }

  var FIELDS = ['kanji', 'romaji', 'tr_id', 'tr_en',
                'tok_kanji', 'tok_romaji', 'gloss_id', 'gloss_en'];

  // normalised haystack per card, plus lists of joined arrays
  var HAY = INDEX.map(function (rec) {
    var parts = [];
    FIELDS.forEach(function (f) {
      var v = rec[f];
      if (Array.isArray(v)) {
        parts.push(norm(v.join(' ')));
        // also each element on its own, so a single kanji or word matches
        v.forEach(function (x) { parts.push(norm(x)); });
      } else {
        parts.push(norm(v));
      }
    });
    return parts;
  });

  function mark(el, terms) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) { nodes.push(walker.currentNode); }

    nodes.forEach(function (node) {
      var text = node.nodeValue;
      var low = text.toLowerCase();
      var ranges = [];
      terms.forEach(function (t) {
        if (!t) { return; }
        var from = 0, i;
        while ((i = low.indexOf(t, from)) !== -1) {
          ranges.push([i, i + t.length]);
          from = i + t.length;
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

      var frag = document.createDocumentFragment();
      var pos = 0;
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

  function resetHighlights(card) {
    ['kanji', 'romaji', 'qpanel'].forEach(function (key) {
      var el = card.querySelector('.' + key);
      if (el) { el.innerHTML = card._orig[key]; }
    });
  }

  function run() {
    var raw = input.value.trim();
    var terms = raw ? raw.split(/\s+/).filter(Boolean) : [];
    var normTerms = terms.map(norm);

    var shown = 0;
    cards.forEach(function (card, i) {
      resetHighlights(card);

      var ok = normTerms.length === 0 || normTerms.every(function (t) {
        return HAY[i].some(function (h) { return h.indexOf(t) !== -1; });
      });

      card.hidden = !ok;
      if (ok) {
        shown++;
        if (terms.length) {
          var k = card.querySelector('.kanji');
          var r = card.querySelector('.romaji');
          var p = card.querySelector('.qpanel');
          if (k) { mark(k, terms); }
          if (r) { mark(r, terms); }
          // a match may sit only in the translation, so mark the panel as well
          if (p) { mark(p, terms); }
        }
      } else if (card.querySelector('details.qdet[open]')) {
        card.querySelector('details.qdet').open = false;
      }
    });

    countEl.textContent = terms.length
      ? shown + ' / ' + cards.length + ' kalimat'
      : cards.length + ' kalimat';
    emptyEl.hidden = shown !== 0;
    clearBt.hidden = !terms.length;
  }

  input.addEventListener('input', run);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var vis = cards.filter(function (c) { return !c.hidden; });
      if (vis.length === 1) {
        var d = vis[0].querySelector('details.qdet');
        if (d) { d.open = true; }
      }
    }
  });
  clearBt.addEventListener('click', function () {
    input.value = '';
    run();
    input.focus();
  });

  run();
  input.focus();
})();
'''


def _luminance(hex_colour):
    """Relative luminance of #rrggbb, per WCAG."""
    h = hex_colour.lstrip('#')
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255.0
        out.append(c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * out[0] + 0.7152 * out[1] + 0.0722 * out[2]


def _contrast(a, b):
    la, lb = _luminance(a), _luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def _panel_gap_ok(B):
    """The expanded panel must be visible against the card it grows out of.

    The panel is DARKER than the card here, and a dark fill can only be so far from
    a dark card. So the separation is not required to come from the fill: what must
    hold is that *something* marks the panel edge, either a light-enough fill or a
    light-enough outline. A future edit that removes both would make the open panel
    invisible, and this catches it.
    """
    fill_gap = _contrast(B.BG_PANEL, B.BG)
    edge_gap = _contrast(B.BG_PANEL_EDGE, B.BG)
    return (max(fill_gap, edge_gap) >= 1.35
            and _contrast(B.TEXT, B.BG_PANEL) >= 7.0
            and _contrast(B.BG_PANEL_EDGE, B.BG_PANEL) >= 1.35)


def _register_ok(B):
    """Register colours must work as a badge background AND as small text.

    The badges live inside the expanded panel, so they are measured against the
    panel surface, not against the card.
    """
    from sentences import SENTENCES
    who = {s.get('who') for s in SENTENCES}
    if not who <= set(B.WHO_COLOURS):
        return False
    return all(_contrast(B.BG_PANEL, colour) >= 4.5          # as a border / text
               and _contrast('#0b1220', colour) >= 4.5       # dark text on the chip
               for colour in B.WHO_COLOURS.values())


def build_page(blocks, index, title='Kalimat Jepang Sehari-hari'):
    data = json.dumps(index, ensure_ascii=False, separators=(',', ':'))
    return f'''<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<style>
  :root {{ color-scheme: dark; }}
  html, body {{
    margin: 0; padding: 0; background: #020617; color: {B.TEXT};
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans JP", sans-serif;
    -webkit-text-size-adjust: 100%;
  }}
  .wrap {{ max-width: 820px; margin: 0 auto; padding: 22px 16px 72px; }}

  /* ---------------------------------------------------------------- search bar */
  .bar {{
    position: sticky; top: 0; z-index: 500;
    background: rgba(2, 6, 23, .96);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid {B.EDGE};
    padding: 12px 0 10px;
    margin-bottom: 14px;
  }}
  .searchrow {{ display: flex; gap: 8px; align-items: center; }}
  /* The field uses the expanded panel's surface and outline, so the two dark
     surfaces on the page match instead of inventing a third shade. */
  .searchrow input {{
    flex: 1 1 auto; min-width: 0;
    background: {B.BG_PANEL}; color: #f8fafc;
    border: 1px solid {B.BG_PANEL_EDGE}; border-radius: 10px;
    padding: 11px 13px; font-size: 15px; font-family: inherit;
  }}
  .searchrow input::placeholder {{ color: {B.TEXT_PLACEHOLDER}; }}
  .searchrow input:focus {{
    outline: none; border-color: {B.ACCENT};
    box-shadow: 0 0 0 3px rgba(56, 189, 248, .18);
  }}
  .searchrow button {{
    flex: 0 0 auto; width: 40px; height: 40px; border-radius: 10px;
    background: {B.BG_PANEL}; color: #f8fafc; border: 1px solid {B.BG_PANEL_EDGE};
    font-size: 18px; line-height: 1; cursor: pointer; font-family: inherit;
  }}
  .searchrow button:hover {{ border-color: {B.ACCENT}; }}
  .hint {{
    display: flex; justify-content: space-between; gap: 10px;
    color: {B.TEXT_DIM}; font-size: 12px; margin-top: 7px;
  }}
  .hint .examples {{ color: #64748b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }}
  .hint code {{
    color: {B.TEXT}; background: {B.BG_PANEL}; border: 1px solid {B.EDGE};
    border-radius: 5px; padding: 1px 5px; font-size: 11.5px;
  }}

  h1 {{ font-size: 16px; font-weight: 600; color: {B.TEXT_DIM}; margin: 0 0 16px;
        letter-spacing: .02em; }}

  /* ---------------------------------------------------------------- behaviour */
  /* The ? summary is absolutely positioned at the card's top-right corner, and
     the ? expander is the last child, so while it is closed it contributes no
     height and the panel expands in place, under the sentence. */
  .jp-sent .qdet {{ display: block; }}
  .jp-sent .qdet > summary {{
    position: absolute; right: 10px; top: 10px;
    transition: transform .12s ease, border-color .12s ease;
  }}
  .jp-sent .qdet > summary::-webkit-details-marker {{ display: none; }}
  .jp-sent .qdet > summary::marker {{ content: ""; }}
  .jp-sent .qdet:hover > summary {{ transform: scale(1.08); border-color: #f8fafc; }}
  .jp-sent .qdet[open] > summary {{ border-color: #f59e0b; }}
  /* the card only needs to outrank the sticky bar for its own summary, which is
     inside it; nothing floats over the page any more */
  .jp-sent[hidden] {{ display: none !important; }}

  /* the expanded panel is in-flow, so it can never cover the card's own bottom
     edge or a neighbouring block. On a phone it also gets a tighter radius and
     a little less padding, since it runs the full card width. */
  .jp-sent .qpanel {{ width: 100%; }}
  /* stop the card from ever being widened by its own contents */
  .jp-sent {{ max-width: 100%; box-sizing: border-box; }}
  .jp-sent .qpanel {{ overflow-wrap: anywhere; }}
  .jp-sent .qpanel .gloss {{ table-layout: fixed; }}
  .jp-sent .qpanel .gloss td {{ overflow-wrap: anywhere; }}

  @media (max-width: 520px) {{
    .jp-sent .qpanel {{
      border-radius: 10px !important;
      padding: 12px 12px !important;
      font-size: 13.5px !important;
    }}
    /* Four nowrap columns need ~370px and do not fit in a phone-width card, so on
       small screens each word becomes a stacked block: kanji + romaji on one
       line, the two glosses underneath. Nothing can push the card outwards. */
    .jp-sent .qpanel .gloss,
    .jp-sent .qpanel .gloss tbody,
    .jp-sent .qpanel .gloss tr,
    .jp-sent .qpanel .gloss td {{
      display: block; width: auto !important;
    }}
    .jp-sent .qpanel .gloss td {{
      border-bottom: 0 !important; padding: 0 !important;
    }}
    .jp-sent .qpanel .gloss tr {{
      padding: 7px 0; border-bottom: 1px solid {B.EDGE_SOFT};
    }}
    .jp-sent .qpanel .gloss tr:last-child {{ border-bottom: 0; }}
    .jp-sent .qpanel .gloss td.gk {{
      display: inline-block; font-size: 15px !important;
    }}
    .jp-sent .qpanel .gloss td.gr {{
      display: inline-block; margin-left: 8px;
    }}
  }}

  .jp-sent .tk {{ border-radius: 3px; }}
  .jp-sent .tk:hover {{ background: rgba(56, 189, 248, .18); }}

  mark {{ background: #f59e0b; color: #0b1220; border-radius: 3px; padding: 0 1px; }}

  #empty {{
    border: 1px dashed {B.EDGE_SOFT}; border-radius: 12px; padding: 26px 18px;
    text-align: center; color: {B.TEXT_DIM}; font-size: 14px;
  }}

  @media (max-width: 420px) {{
    .wrap {{ padding: 14px 10px 56px; }}
    .jp-sent {{ padding: 14px 52px 14px 14px !important; }}
    .hint .examples {{ display: none; }}
  }}
</style>
</head>
<body>
<div class="wrap">

  <header class="bar">
    <h1>{title}</h1>
    <div class="searchrow">
      <input id="q" type="search" autocomplete="off" autocapitalize="off"
             spellcheck="false" enterkeyhint="search"
             aria-label="Cari kalimat: kanji, romaji, Indonesia, atau Inggris"
             placeholder="Cari: Kanji / Romaji / Indonesia / English">
      <button id="clear" type="button" title="Hapus pencarian" aria-label="Hapus pencarian" hidden>&#215;</button>
    </div>
    <div class="hint">
      <span id="count"></span>
      <span class="examples">coba: <code>ohayou</code> <code>おはよう</code> <code>murah cheap</code> <code>berapa</code></span>
    </div>
  </header>

  <main id="list">
{blocks}
  </main>

  <p id="empty" hidden>Tidak ada kalimat yang cocok. Coba kata lain.</p>
</div>

<script id="idx" type="application/json">{data}</script>
<script>{PAGE_JS}</script>
</body>
</html>
'''


if __name__ == '__main__':
    blocks = B.all_blocks()
    index = search_index()
    page = build_page(blocks, index)

    out = os.path.join(ROOT, 'index.html')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(page)

    with open(out, encoding='utf-8') as f:
        got = f.read()
    n = len(B.SENTENCES)
    checks = {
        'sentence blocks': got.count('<section') == n,
        '? panels': got.count('<details class="qdet">') == n,
        'card colour applied': got.count(f'background:{B.BG} !important') == n,
        'panel colour applied': got.count(f'background:{B.BG_PANEL} !important') == n,
        'panel outline applied': got.count(f'border:1px solid {B.BG_PANEL_EDGE} !important') == n,
        # a panel whose luminance is too close to the card/backdrop is exactly what
        # made the opened tooltip look like a dark smudge
        'panel is visible against the card (fill or outline)': _panel_gap_ok(B),
        'register colours are readable inside the panel': _register_ok(B),
        # every block must say who it is for, inside the panel, in BOTH languages
        'every block states its register': got.count('class="qpanel"') == n,
        'register line is bilingual': all(
            s['situation'] in got and s['situation_en'] in got and s['who_id'] in got
            and s['who_en'] in got for s in B.SENTENCES),
        'accent colour': B.ACCENT in got,
        'atomic words': got.count('display:inline-block') > n,
        'word wrap enabled': 'overflow-wrap:anywhere' in got,
        'no disclosure triangle': 'display:block;list-style:none' in got,
        'panels collapsed by default': not any(
            'open' in tag for tag in __import__('re').findall(r'<details[^>]*>', got)),
        'hover rules present': '.qdet:hover' in got,
        # expand/collapse must stay in-flow: no modal, no scrim, no floating panel
        'panel expands in flow': all(
            'position' not in tag for tag in
            __import__('re').findall(r'<div class="qpanel"[^>]*>', got)),
        'no modal machinery left': 'position: fixed' not in got and '#scrim' not in got
                                   and 'is-open { z-index' not in got,
        'summary pinned to the card corner': '.jp-sent .qdet > summary {' in got
                                             and 'position: absolute' in got,
        # four nowrap gloss columns cannot fit a phone, so they must restack
        'gloss table restacks on narrow screens': 'td.gk' in got and 'td.gr' in got
                                                  and 'max-width: 520px' in got,
        'single open enforced in JS': 'closeAll(d)' in got,
        'click outside closes': "closest('details.qdet')" in got,
        'escape closes': "e.key === 'Escape'" in got,
        'search input present': 'id="q"' in got,
        'search index embedded': 'id="idx"' in got and '"gloss_en"' in got,
        'romaji folding (ohayo/ohayou/ohayō)': "replace(/ou/g, 'o')" in got,
        'highlight markup': '<mark' not in got and 'createElement(\'mark\')' in got,
    }
    print(f'wrote {out}  ({len(page):,} chars)')
    for k, ok in checks.items():
        print(f'  [{"ok" if ok else "FAIL"}] {k}')
    if not all(checks.values()):
        raise SystemExit('page verification failed')
