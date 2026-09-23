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
* flexible search: kanji, romaji, Indonesian or English, and mixtures of them
* a search scope (All / Japanese) and a romaji show/hide toggle
* the list grows as the reader scrolls, so only a window of cards is ever in the DOM

The card renderer lives in scripts/page.js, and the compact sentence data plus the
colour constants from render.py are inlined into the page.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import bank
import check_sentences
import generate      # noqa: E402  (template lengths, for the honest length report)
import render as B   # noqa: E402  (single source of truth for the cards)

# How many cards are written into the HTML itself. The rest of the bank travels as
# compact data and page.js appends cards as the reader scrolls, so the full 1,583
# sentences are reachable without all of them existing in the DOM at once. Measured
# reasons for doing it this way, at 1,583 sentences:
#
#   all cards in the HTML   10.1 MB, ~75,000 DOM nodes, 4.9 s to render
#   30 static + data        ~0.9 MB, ~1,500 nodes, search in single-digit ms
#
# 30 is roughly one screenful on a phone, so the page has real content before any
# script runs. Raise it with LANGSENT_FIRST=200 to trade file size for fewer
# appends; the build prints the measured size either way.
FIRST_BATCH = int(os.environ.get('LANGSENT_FIRST', '30'))


# --------------------------------------------------------------------------- index
def payload(rows):
    """The whole bank as compact arrays, plus the constants the JS renderer needs.

    This replaces the old per-sentence object with named keys. Two reasons:

    * the arrays are the data the page needs to RENDER a card, not only to search
      it, because cards are now built on demand instead of being written into the
      HTML. One list serves both jobs, so a field cannot be searchable but
      unrenderable.
    * dropping the repeated keys saves about 40% of the payload. The full bank is
      1,583 sentences; as objects it was 1.8 MB, as arrays 1.10 MB.
    """
    fields = ['kanji', 'romaji', 'id_translation', 'en_translation',
              'who_id', 'who_en', 'politeness', 'situation', 'situation_en',
              'note', 'note_en']
    out = []
    for s in rows:
        row = [s[f] for f in fields]
        row.append([[t[0], t[1], t[2], t[3]] for t in s['tokens']])
        row.append(s['who'])                       # last, so the order can grow
        out.append(row)
    return out


def render_constants():
    """Colour and style values the JS renderer uses.

    They are injected from render.py rather than typed into page.js, so the palette
    keeps one source of truth: a colour change lands in both the static cards and
    the ones built in the browser, and cannot drift between them.
    """
    return {
        'bg': B.BG,
        'bgPanel': B.BG_PANEL,
        'bgPanelEdge': B.BG_PANEL_EDGE,
        'edge': B.EDGE,
        'edgeSoft': B.EDGE_SOFT,
        'accent': B.ACCENT,
        'text': B.TEXT,
        'textDim': B.TEXT_DIM,
        'inkOnChip': B.INK_ON_CHIP,
        'bright': B.BRIGHT,
        'who': B.WHO_COLOURS,
        'palette': [dark for _, dark in B.PALETTE],
        'underlines': B.UNDERLINE_STYLES,
        'countWord': 'kalimat / sentences',
        'scrollHint': 'gulir untuk memuat lagi / scroll for more',
    }


# --------------------------------------------------------------------------- page
def page_js():
    """The browser-side renderer, read from page.js.

    Keeping it in its own file means `node --check page.js` can syntax-check it and
    scripts/verify_page.py can diff its output against render.py, which is what
    stops the Python and JavaScript renderers from drifting apart.
    """
    with open(os.path.join(HERE, 'page.js'), encoding='utf-8') as f:
        return f.read()


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
    who = {s.get('who') for s in bank.all_sentences()}
    if not who <= set(B.WHO_COLOURS):
        return False
    return all(_contrast(B.BG_PANEL, colour) >= 4.5          # as a border / text
               and _contrast('#0b1220', colour) >= 4.5       # dark text on the chip
               for colour in B.WHO_COLOURS.values())


TITLE_ID = 'Kalimat Jepang Sehari-hari'
TITLE_EN = 'Everyday Japanese Sentences'


def build_page(blocks, rows, title_id=TITLE_ID, title_en=TITLE_EN):
    """The whole page. `blocks` is the first batch of cards, `rows` the full bank.

    The cards for the first screenful are written into the HTML so the page has real
    content before any script runs, and the remaining rows travel as compact data
    that page.js turns into cards as the reader scrolls.
    """
    data = json.dumps(rows, ensure_ascii=False, separators=(',', ':'))
    consts = json.dumps(render_constants(), ensure_ascii=False, separators=(',', ':'))
    return f'''<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title_id} / {title_en}</title>
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
  /* English gloss of the Indonesian heading, quieter than the heading itself */
  h1 .en {{ color: {B.TEXT_PLACEHOLDER}; font-weight: 500; }}
  /* search scope + romaji toggle */
  .opts {{
    display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center;
    margin-top: 9px;
  }}
  .scopes {{ display: inline-flex; gap: 0; }}
  .opts label {{
    display: inline-flex; align-items: center; gap: 5px;
    color: {B.TEXT_DIM}; font-size: 12.5px; cursor: pointer;
    user-select: none;
  }}
  .opts input {{ accent-color: {B.ACCENT}; margin: 0; cursor: pointer; }}
  /* the scope control reads as a segmented button group, so the active choice is
     obvious without relying on the small radio dot alone */
  .scopes label {{
    border: 1px solid {B.BG_PANEL_EDGE}; background: {B.BG_PANEL};
    padding: 4px 11px; margin: 0;
  }}
  .scopes label:first-child {{ border-radius: 8px 0 0 8px; }}
  .scopes label:last-child {{ border-radius: 0 8px 8px 0; border-left: 0; }}
  .scopes label:has(input:checked) {{
    border-color: {B.ACCENT}; color: #f8fafc;
  }}
  .scopes label.on {{ border-color: {B.ACCENT}; color: #f8fafc; }}
  /* The romaji line is a sibling of the kanji line; hiding it must not leave a gap,
     so the whole line is removed from layout rather than made transparent. */
  .hide-romaji .romaji {{ display: none !important; }}
  #sentinel {{ height: 1px; }}
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
    <h1>{title_id} <span class="en">{title_en}</span></h1>
    <div class="searchrow">
      <input id="q" type="search" autocomplete="off" autocapitalize="off"
             spellcheck="false" enterkeyhint="search"
             aria-label="Search sentences: kanji, romaji, Indonesian, or English"
             placeholder="Search: Kanji / Romaji / Indonesia / English">
      <button id="clear" type="button" title="Hapus pencarian / Clear search"
              aria-label="Hapus pencarian / Clear search" hidden>&#215;</button>
    </div>
    <div class="opts">
      <!-- Search scope. "All" is the default and keeps the previous behaviour; the
           Japanese option narrows matching to the sentence and its words. -->
      <div class="scopes" role="radiogroup" aria-label="Cakupan pencarian / Search scope">
        <label><input type="radio" name="scope" value="all" checked> <span>All</span></label>
        <label><input type="radio" name="scope" value="jp"> <span>Japanese</span></label>
      </div>
      <!-- Romaji is shown by default; the toggle hides the romaji line only. -->
      <label class="toggle"><input type="checkbox" id="rtoggle" checked> <span>Romaji</span></label>
    </div>
    <div class="hint">
      <span id="count"></span>
      <span class="examples">coba / try: <code>ohayou</code> <code>\u304a\u306f\u3088\u3046</code> <code>murah cheap</code> <code>berapa</code></span>
    </div>
  </header>

  <main id="list">
{blocks}
  </main>
  <!-- Cards are appended when this comes into view, which is what keeps the DOM
       small while still reaching every sentence in the bank. -->
  <div id="sentinel" aria-hidden="true"></div>

  <p id="empty" hidden>Tidak ada kalimat yang cocok. Coba kata lain. / No sentences match. Try another word.</p>
</div>

<script id="sent">window.SENT={{"C":{consts},"rows":{data}}};</script>
<script>{page_js()}</script>
</body>
</html>
'''


if __name__ == '__main__':
    # The generated half of the bank is only trustworthy if its meaning is checked,
    # so the check runs as part of the build rather than as an optional script.
    findings = check_sentences.problems()
    if any(findings.values()):
        for kind, bad in findings.items():
            for kanji, why in bad:
                print(f'  [FAIL] {kind}: {kanji} -- {why}')
        raise SystemExit('sentence-bank checks failed; fix scripts/generate.py first')

    full = bank.with_ids(bank.all_sentences())
    rows = payload(full)
    # The first batch is written into the HTML so the page shows real content before
    # any script runs; page.js adopts these cards and appends the rest on scroll.
    first = bank.with_ids(bank.all_sentences())[:FIRST_BATCH]
    blocks = B.all_blocks(first)
    page = build_page(blocks, rows)

    out = os.path.join(ROOT, 'index.html')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(page)

    with open(out, encoding='utf-8') as f:
        got = f.read()
    n = len(full)
    by_origin, by_who = bank.stats(full)
    # How much of the bank is reachable without scrolling: the ratio is what the
    # lazy loading trades against, so it is printed rather than assumed.
    tokens = [len(s['tokens']) for s in full]
    # "Long" means 12+ tokens, comparable to the example sentence the reader pointed at
    # (18 tokens, 42 morae). An earlier build printed "long (8+)" instead, which called
    # sentences of median 8 tokens long and made the list look fuller than it was.
    _tpl = {t['key']: t for t in generate.TEMPLATES}

    def is_long_row(s):
        return bool(s.get('template')) and generate.is_long(_tpl[s['template']])

    long_n = sum(1 for s in full if is_long_row(s))
    checks = {
        # count before the data script: page.js also contains the literal string,
        # so counting the whole file would be off by one for the wrong reason
        'static first batch present': got.split('<script id="sent"')[0].count(
            '<section class="jp-sent"') == FIRST_BATCH,
        'all rows travel as data': f'"rows":' in got or '"rows":' in got,
        'page.js inlined': 'SENTAPI' in got,
        'render constants injected from render.py': f'"{B.BG}"' in got and f'"{B.ACCENT}"' in got,
        # page.js must hard-code no colour: every value comes from the injected
        # constants, or a palette change would land in one renderer and not the other
        'page.js hard-codes no colour': not __import__('re').search(
            r'#[0-9a-fA-F]{6}', page_js()),
        'card colour applied': f'background:{B.BG} !important' in got,
        'panel colour applied': f'background:{B.BG_PANEL} !important' in got,
        'panel is visible against the card (fill or outline)': _panel_gap_ok(B),
        'register colours are readable inside the panel': _register_ok(B),
        'accent colour': B.ACCENT in got,
        'word wrap enabled': 'overflow-wrap:anywhere' in got,
        'no disclosure triangle': 'display:block;list-style:none' in got,
        'panels collapsed by default': not any(
            'open' in tag for tag in __import__('re').findall(r'<details[^>]*>', got)),
        'panel expands in flow': all(
            'position' not in tag for tag in
            __import__('re').findall(r'<div class="qpanel"[^>]*>', got)),
        'no modal machinery left': 'position: fixed' not in got and '#scrim' not in got,
        'summary pinned to the card corner': '.jp-sent .qdet > summary {' in got
                                             and 'position: absolute' in got,
        'gloss table restacks on narrow screens': 'td.gk' in got and 'max-width: 520px' in got,
        'lazy sentinel present': 'id="sentinel"' in got,
        'romaji toggle present': 'id="rtoggle"' in got,
        'hide-romaji rule present': '.hide-romaji .romaji' in got,
        'search scope control present': 'name="scope"' in got and 'value="jp"' in got,
        'search input present': 'id="q"' in got,
        'Search placeholder': 'placeholder="Search:' in got and 'placeholder="Cari:' not in got,
        'title is bilingual': 'Everyday Japanese Sentences' in got,
        'count label is bilingual': 'kalimat / sentences' in got,
        'romaji folding (ohayo/ohayou/ohayō)': "replace(/ou/g, 'o')" in got,
        'highlight markup': '<mark' not in got and "createElement('mark')" in got,
        'no self-referential word-wrap note': 'menguji word wrap' not in got
                                              and 'tests word wrap' not in got,
        # the list must actually contain sentences comparable to the reader's example,
        # so a regression back to "8 tokens is long" would be visible in the build
        'long sentences present (12+ tokens)': long_n > 0 and long_n >= n // 4,
        'no duplicate kanji lines': len({s['kanji'] for s in full}) == n,
        'curated sentences come first': all(
            full[i]['origin'] == bank.HAND_WRITTEN for i in range(min(len(full), 10))),
    }
    print(f'wrote {out}  ({len(page):,} chars, {n:,} sentences, {FIRST_BATCH} static)')
    for k, v in by_origin.items():
        print(f'  origin {k}: {v:,}')
    for k, v in by_who.items():
        print(f'  register {k}: {v:,}')
    # Length is reported the way the bank defines it, not with a convenient cut:
    # "long" means 12+ tokens, comparable to the example sentence the reader pointed at
    # (18 tokens, 42 morae). Morae are shown because that is how the example was
    # described, and because two sentences of equal token count can differ a lot in
    # spoken length.
    def morae(romaji):
        t = __import__('re').sub(r'[^a-z]', '', romaji.lower())
        for a, b in (('sha', 'sya'), ('shu', 'syu'), ('sho', 'syo'), ('shi', 'si'),
                     ('cha', 'tya'), ('chu', 'tyu'), ('cho', 'tyo'), ('chi', 'ti'),
                     ('ja', 'zya'), ('ju', 'zyu'), ('jo', 'zyo'), ('ji', 'zi'),
                     ('tsu', 'tu')):
            t = t.replace(a, b)
        return len(__import__('re').findall(r'[aiueo]+|n(?![aiueo])|tt', t)) or 1

    lng = [s for s in full if is_long_row(s)]
    srt = [s for s in full if not is_long_row(s)]
    for group, label in ((lng, 'long'), (srt, 'short')):
        if not group:
            continue
        gt = sorted(len(s['tokens']) for s in group)
        gm = sorted(morae(s['romaji']) for s in group)
        print(f'  {label:5} n={len(group):5}  tokens median {gt[len(gt)//2]:2}  '
              f'morae median {gm[len(gm)//2]:2}  span {gt[0]}-{gt[-1]} tokens')
    print(f'  long share: {len(lng)*100//max(n,1)}% of {n:,} sentences (threshold 12 tokens)')
    for k, ok in checks.items():
        print(f'  [{"ok" if ok else "FAIL"}] {k}')
    if not all(checks.values()):
        raise SystemExit('page verification failed')
