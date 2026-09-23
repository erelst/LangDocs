#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build JP-sentences.ipynb (dark theme, kanji + romaji + ? only).

Layout per block
----------------
  kanji line
  romaji line
  ? button on the right  ->  opens the Indonesian + English translation

Nothing else is shown: no number, no situation label, no frequency, no footer.

Cross-renderer strategy
-----------------------
* Dark styling is INLINE, so it also applies on GitHub, whose notebook renderer
  keeps inline style attributes but drops <style> blocks.
* The ? control is <details>/<summary> with display:block + list-style:none, so no
  disclosure triangle appears on any browser without needing CSS.
* Saved outputs are embedded, because GitHub renders a notebook from its outputs.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from notebook_build import SENTENCES, PALETTE, UNDERLINE_STYLES

# dark-mode palette: the second colour of each pair in notebook_build.PALETTE
DARK_PALETTE = [dark for _, dark in PALETTE]

BG = '#0b1220'        # card background
BG_PANEL = '#111827'  # tooltip background
EDGE = '#1e293b'
EDGE_SOFT = '#334155'
ACCENT = '#38bdf8'
TEXT = '#e5e7eb'
TEXT_DIM = '#94a3b8'


# --------------------------------------------------------------------------- CSS cell
STYLE_CELL = r'''<style>
/* Local Jupyter / Colab polish. GitHub drops this block, so every property that
   matters (dark colours, no triangle, atomic words) is also set inline. */
.jp-sent .qdet > summary::-webkit-details-marker { display: none; }
.jp-sent .qdet > summary::marker { content: ""; }
.jp-sent .qdet > summary { transition: transform .12s ease, border-color .12s ease; }
.jp-sent .qdet:hover > summary { transform: scale(1.08); border-color: #f8fafc; }
.jp-sent .qdet[open] > summary { border-color: #f59e0b; }
.jp-sent .tk { border-radius: 3px; }
.jp-sent .tk:hover { background: rgba(56, 189, 248, .18); }
</style>'''


# --------------------------------------------------------------------------- cell 1: data
DATA_CELL = (
    "# Setiap kalimat: kanji, romaji, terjemahan ID + EN, dan arti per kata.\n"
    "# Sumber kata: daftar frekuensi CEJC (2.419.171 kata, 200 jam percakapan).\n"
    "SENTENCES = " + json.dumps(SENTENCES, ensure_ascii=False, indent=1) + "\n\n"
    "print(len(SENTENCES), 'kalimat prototipe')\n"
)


# --------------------------------------------------------------------------- cell 2: renderer
RENDERER_CELL = '''# Warna gelap (mode gelap), 10 warna bergantian per kata.
PALETTE = ''' + json.dumps(DARK_PALETTE) + '''
UNDERLINE_STYLES = ''' + json.dumps(UNDERLINE_STYLES) + '''
BG = \'''' + BG + '''\'
BG_PANEL = \'''' + BG_PANEL + '''\'
EDGE = \'''' + EDGE + '''\'
EDGE_SOFT = \'''' + EDGE_SOFT + '''\'
ACCENT = \'''' + ACCENT + '''\'
TEXT = \'''' + TEXT + '''\'
TEXT_DIM = \'''' + TEXT_DIM + '''\'

def _esc(t):
    return str(t).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def token_spans(tokens, idx):
    """One line of tokens; token i keeps the same colour on the kanji and romaji lines."""
    out = []
    for i, tok in enumerate(tokens):
        color = PALETTE[i % len(PALETTE)]
        style = UNDERLINE_STYLES[i % len(UNDERLINE_STYLES)]
        width = '3px' if style == 'double' else '2px'
        text = _esc(tok[idx])
        # display:inline-block keeps each word atomic, so a narrow screen wraps
        # between words and never splits a word in half.
        out.append(
            f'<span class="tk" style="display:inline-block;color:{color};'
            f'border-bottom:{width} {style} {color};padding:0 3px;" '
            f'title="{text}">{text}</span>'
        )
    return ''.join(out)


def gloss_rows(tokens):
    """Word-by-word table inside the ? panel."""
    rows = []
    for i, tok in enumerate(tokens):
        kanji, romaji, gid, gen = tok
        color = PALETTE[i % len(PALETTE)]
        edge = f'border-bottom:1px solid {EDGE};vertical-align:top;padding:4px 8px;'
        rows.append(
            '<tr>'
            f'<td style="{edge}color:{color};font-weight:700;white-space:nowrap;">{_esc(kanji)}</td>'
            f'<td style="{edge}color:{TEXT_DIM};font-style:italic;white-space:nowrap;">{_esc(romaji)}</td>'
            f'<td style="{edge}color:{TEXT};">{_esc(gid)}</td>'
            f'<td style="{edge}color:{TEXT_DIM};">{_esc(gen)}</td>'
            '</tr>'
        )
    return ''.join(rows)


def qpanel(s):
    """The panel revealed by the ? button."""
    return (
        f'<div class="qpanel" style="position:absolute;right:0;top:42px;'
        f'width:min(88vw,620px);background:{BG_PANEL};color:{TEXT};'
        f'border:1px solid {EDGE_SOFT};border-radius:12px;padding:14px 16px;'
        f'max-height:70vh;overflow:auto;box-shadow:0 16px 40px rgba(0,0,0,.65);'
        f'text-align:left;font-size:14px;line-height:1.55;">'
        f'<p style="margin:0 0 6px;font-size:16px;color:#f8fafc;">'
        f'<b style="color:{ACCENT};">ID</b> {_esc(s["id_translation"])}</p>'
        f'<p style="margin:0 0 12px;font-size:16px;color:#f8fafc;">'
        f'<b style="color:{ACCENT};">EN</b> {_esc(s["en_translation"])}</p>'
        f'<table style="border-collapse:collapse;width:100%;font-size:13.5px;">'
        f'{gloss_rows(s["tokens"])}</table>'
        f'<div style="margin-top:12px;padding-top:10px;border-top:1px dashed {EDGE_SOFT};'
        f'font-size:13px;color:{TEXT_DIM};">'
        f'<p style="margin:0 0 4px;"><b style="color:{ACCENT};">ID</b> {_esc(s["note"])}</p>'
        f'<p style="margin:0;"><b style="color:{ACCENT};">EN</b> {_esc(s["note_en"])}</p>'
        '</div></div>'
    )


def html_block(s):
    """One block: kanji line, romaji line, and the ? tooltip. Nothing else."""
    return (
        f'<section class="jp-sent" style="position:relative;background:{BG};'
        f'border:1px solid {EDGE};border-left:5px solid {ACCENT};border-radius:12px;'
        f'margin:16px 0;padding:16px 58px 16px 18px;overflow:visible;">'
        # ? control: display:block + list-style:none removes the triangle without CSS
        '<details class="qdet" style="position:absolute;right:10px;top:10px;z-index:30;">'
        '<summary title="Terjemahan / Translation" aria-label="Terjemahan dan arti per kata" '
        f'style="display:block;list-style:none;cursor:pointer;width:34px;height:34px;'
        f'line-height:30px;text-align:center;border-radius:50%;background:{EDGE};'
        f'color:#f8fafc;font-weight:700;font-size:17px;border:2px solid {ACCENT};'
        'box-shadow:0 2px 8px rgba(0,0,0,.5);user-select:none;">?</summary>'
        f'{qpanel(s)}</details>'
        # kanji line
        '<div style="font-size:23px;line-height:2.0;font-weight:500;color:#f8fafc;'
        f'white-space:normal;overflow-wrap:anywhere;padding-right:6px;">'
        f'{token_spans(s["tokens"], 0)}</div>'
        # romaji line
        f'<div style="font-size:15px;line-height:1.85;font-style:italic;color:{TEXT_DIM};'
        'margin-top:3px;white-space:normal;overflow-wrap:anywhere;">'
        f'{token_spans(s["tokens"], 1)}</div>'
        '</section>'
    )
'''


# --------------------------------------------------------------------------- cell 3: display
DISPLAY_CELL = (
    'from IPython.display import HTML, display\n'
    '\n'
    'blocks = "".join(html_block(s) for s in SENTENCES)\n'
    'display(HTML(blocks))\n'
)


# --------------------------------------------------------------------------- markdown
INTRO_MD = '''# Kalimat Jepang Sehari-hari — Mode Gelap

Tiap blok hanya berisi tiga hal:

1. Baris **kanji**
2. Baris **romaji**
3. Tombol **?** di kanan, klik / tap untuk membuka terjemahan
   bahasa Indonesia + Inggris, arti per kata, dan catatan

Tidak ada elemen lain: tanpa nomor, tanpa label situasi, tanpa penghitung.

| Fitur | Penerapan |
|---|---|
| Mode gelap | warna gelap ditulis *inline*, jadi tetap gelap di GitHub maupun di Jupyter |
| Warna per kata | 10 warna terang dipakai bergantian; kata ke-i sama warnanya di baris kanji dan romaji |
| Garis bawah per kata | 5 gaya: solid, dashed, dotted, double, wavy |
| Word wrap | tiap kata `display:inline-block`, jadi layar sempit patah **antar kata**, bukan di tengah kata |
| Pemisah antar blok | kartu gelap dengan garis aksen biru di kiri |

> Ikon **?** memakai `<details>`, sehingga klik / tap berfungsi di mana saja
> (termasuk layar sentuh). Di Jupyter/Colab lokal, `?` juga membuka saat di-hover.
'''

CSS_MD = '## 1. Sel CSS (opsional, hanya untuk tampilan penuh di Jupyter lokal)\n'
DATA_MD = '## 2. Data kalimat\n'
RENDER_MD = '## 3. Renderer\n'
SHOW_MD = '## 4. Tampilkan kalimat\n'

ASK_MD = '''## 5. Catatan

Isi panel **?** saat ini: terjemahan ID + EN, arti per kata, dan catatan pemakaian.
Situasi (dekat / orang asing) dan frekuensi CEJC saya keluarkan dari tampilan agar
blok hanya berisi kanji, romaji, dan `?`. Keduanya masih tersimpan di data dan bisa
saya pindahkan ke dalam panel `?` kalau Anda mau.
'''


# --------------------------------------------------------------------------- cell helpers
def code_cell(src, outputs=None, exec_count=None):
    return {"cell_type": "code", "execution_count": exec_count, "metadata": {},
            "outputs": outputs or [], "source": src.splitlines(keepends=True)}


def html_output(html):
    return [{
        'output_type': 'display_data',
        'data': {'text/html': html,
                 'text/plain': ['<IPython.core.display.HTML object>']},
        'metadata': {},
    }]


def stream_output(text):
    return [{'output_type': 'stream', 'name': 'stdout', 'text': text}]


def _ensure_ipython():
    """Use real IPython in Jupyter; stub it when building where IPython is absent."""
    try:
        import IPython.display  # noqa: F401
        return
    except ImportError:
        pass
    import types
    ip = types.ModuleType('IPython')
    disp = types.ModuleType('IPython.display')

    class HTML:
        def __init__(self, data):
            self.data = data

    def display(*objs):
        for o in objs:
            print(f'[HTML {len(getattr(o, "data", ""))} chars]')

    disp.HTML = HTML
    disp.display = display
    ip.display = disp
    sys.modules['IPython'] = ip
    sys.modules['IPython.display'] = disp


def run_cells(*sources):
    """Execute cell sources in order, sharing one namespace (like Jupyter)."""
    _ensure_ipython()
    ns = {}
    for src in sources:
        exec(compile(src, '<cell>', 'exec'), ns)
    return ns


def md_cell(src):
    return {"cell_type": "markdown", "metadata": {},
            "source": src.splitlines(keepends=True)}


# --------------------------------------------------------------------------- build
def build():
    css_src = (
        'from IPython.display import HTML, display\n'
        'display(HTML(' + repr(STYLE_CELL) + '))\n'
    )
    # Run the real cells exactly as Jupyter would, then store their outputs,
    # because GitHub renders the saved outputs rather than executing the notebook.
    ns = run_cells(css_src, DATA_CELL, RENDERER_CELL)
    cards_html = ''.join(ns['html_block'](s) for s in ns['SENTENCES'])

    return {
        "cells": [
            md_cell(INTRO_MD),
            md_cell(CSS_MD),
            code_cell(css_src, html_output(STYLE_CELL), 1),
            md_cell(DATA_MD),
            code_cell(DATA_CELL, stream_output('6 kalimat prototipe\n'), 2),
            md_cell(RENDER_MD),
            code_cell(RENDERER_CELL, [], 3),
            md_cell(SHOW_MD),
            code_cell(DISPLAY_CELL, html_output(cards_html), 4),
            md_cell(ASK_MD),
        ],
        "metadata": {
            "kernelspec": {"display_name": "Python 3", "language": "python",
                           "name": "python3"},
            "language_info": {"name": "python", "version": "3.11"},
            "title": "Kalimat Jepang Sehari-hari",
        },
        "nbformat": 4,
        "nbformat_minor": 5,
    }


if __name__ == '__main__':
    out = os.path.join(ROOT, 'JP-sentences.ipynb')
    nb = build()
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(nb, f, ensure_ascii=False, indent=1)
        f.write('\n')

    # ---- verification -------------------------------------------------------
    with open(out, encoding='utf-8') as f:
        chk = json.load(f)
    assert chk['nbformat'] == 4 and chk['nbformat_minor'] == 5, 'bad nbformat'
    codes = [c for c in chk['cells'] if c['cell_type'] == 'code']
    n_html = sum(1 for c in codes
                 if any(o.get('data', {}).get('text/html') for o in c['outputs']))
    cards = next(o['data']['text/html'] for c in codes for o in c['outputs']
                 if o.get('data', {}).get('text/html', '').count('<section') > 0)
    assert n_html == 2, f'expected 2 HTML outputs, got {n_html}'
    assert cards.count('<section') == len(SENTENCES), 'missing blocks'
    assert cards.count('<details') == len(SENTENCES), 'missing ? panels'
    assert 'display:inline-block' in cards, 'tokens not atomic'
    assert 'overflow-wrap:anywhere' in cards, 'word wrap missing'
    # dark theme, and nothing except kanji + romaji + ?
    assert BG in cards and BG_PANEL in cards, 'dark theme missing'
    for leftover in ('CEJC freq', 'kata / words'):
        assert leftover not in cards, f'leftover chrome: {leftover}'
    # no disclosure triangle even without CSS
    assert 'display:block;list-style:none' in cards, 'summary marker not suppressed'
    # collapsed by default
    import re
    assert not any(' open' in tag or tag.endswith('open>')
                   for tag in re.findall(r'<details[^>]*>', cards)), 'panel open by default'

    n_md = sum(c['cell_type'] == 'markdown' for c in chk['cells'])
    print(f'wrote {out}')
    print(f'  cells={len(chk["cells"])} (markdown={n_md}, code={len(codes)})')
    print(f'  code cells with HTML output: {n_html}')
    print(f'  sentence blocks in output:   {cards.count("<section")}')
    print(f'  ? panels in output:          {cards.count("<details")}')
    print(f'  output size:                 {len(cards):,} chars')
    print(f'  dark theme:                  {BG} card / {BG_PANEL} panel, accent {ACCENT}')
