#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build JP-sentences.ipynb (prototype for review on GitHub).

Cross-renderer strategy
-----------------------
* All visual properties that matter (colour, underline, wrapping, block
  separation, tooltip panel) use INLINE styles, because GitHub's notebook
  renderer strips <style> blocks but keeps inline style attributes.
* The "?" control is <details>/<summary>, so click / tap works everywhere
  (touch included). A <style> cell adds hover-open and nicer markers for a
  local Jupyter / Colab session.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from notebook_build import SENTENCES, PALETTE, UNDERLINE_STYLES


# --------------------------------------------------------------------------- CSS cell
STYLE_CELL = r'''<style>
/* Extra polish for a real Jupyter / Colab session. GitHub strips this block,
   so every essential visual property is also set inline. */
.jp-sent .qdet > summary { list-style: none; }
.jp-sent .qdet > summary::-webkit-details-marker { display: none; }
.jp-sent .qdet > summary::marker { content: ""; }
.jp-sent .qdet > summary { transition: transform .12s ease, background .12s ease; }
.jp-sent .qdet:hover > summary { transform: scale(1.10); background: #b45309; }
.jp-sent .qdet[open] > summary { background: #b45309; }
.jp-sent .tk { border-radius: 2px; }
.jp-sent .tk:hover { background: #fef9c3; }
@media (prefers-color-scheme: dark) {
  .jp-sent { background: #0b1220 !important; border-color: #334155 !important; }
  .jp-sent .qpanel { background: #111827 !important; color: #e5e7eb !important;
                     border-color: #334155 !important; }
  .jp-sent .qpanel td { border-color: #334155 !important; }
  .jp-sent .tk:hover { background: #1e293b; }
}
</style>'''


# --------------------------------------------------------------------------- cell 1: data
DATA_CELL = (
    "# Setiap kalimat: kanji, romaji, terjemahan ID + EN, arti per kata, dan frekuensi CEJC.\n"
    "# Frekuensi = berapa kali kata kunci muncul di CEJC (2.419.171 kata, 200 jam percakapan).\n"
    "SENTENCES = " + json.dumps(SENTENCES, ensure_ascii=False, indent=1) + "\n\n"
    "print(len(SENTENCES), 'kalimat prototipe')\n"
)


# --------------------------------------------------------------------------- cell 2: renderer
RENDERER_CELL = '''PALETTE = ''' + json.dumps([list(p) for p in PALETTE]) + '''
UNDERLINE_STYLES = ''' + json.dumps(UNDERLINE_STYLES) + '''

def _esc(t):
    return str(t).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def token_spans(tokens, idx):
    """One line of tokens. Token i gets the same colour in kanji and romaji."""
    out = []
    for i, tok in enumerate(tokens):
        light = PALETTE[i % len(PALETTE)][0]
        style = UNDERLINE_STYLES[i % len(UNDERLINE_STYLES)]
        width = '3px' if style == 'double' else '2px'
        text = _esc(tok[idx])
        # display:inline-block keeps every word atomic, so a narrow screen wraps
        # BETWEEN words and never breaks a word in half.
        out.append(
            f'<span class="tk" style="display:inline-block;color:{light};'
            f'border-bottom:{width} {style} {light};padding:0 3px;" '
            f'title="{text}">{text}</span>'
        )
    return ''.join(out)


def gloss_rows(tokens):
    """Word-by-word table shown inside the ? panel."""
    rows = []
    for i, tok in enumerate(tokens):
        kanji, romaji, gid, gen = tok
        light = PALETTE[i % len(PALETTE)][0]
        edge = 'border-bottom:1px solid #e5e7eb;vertical-align:top;padding:3px 8px;'
        rows.append(
            '<tr>'
            f'<td style="{edge}color:{light};font-weight:700;white-space:nowrap;">{_esc(kanji)}</td>'
            f'<td style="{edge}color:#374151;font-style:italic;white-space:nowrap;">{_esc(romaji)}</td>'
            f'<td style="{edge}color:#0f172a;">ID&nbsp;{_esc(gid)}</td>'
            f'<td style="{edge}color:#334155;">EN&nbsp;{_esc(gen)}</td>'
            '</tr>'
        )
    return ''.join(rows)


def qpanel(s):
    """The panel revealed by clicking / tapping the ? button."""
    return (
        '<div class="qpanel" style="position:absolute;right:0;top:36px;'
        'width:min(88vw,620px);background:#ffffff;color:#0f172a;'
        'border:1px solid #cbd5e1;border-radius:10px;padding:12px 14px;'
        'max-height:70vh;overflow:auto;'
        'box-shadow:0 10px 30px rgba(0,0,0,.25);text-align:left;font-size:14px;line-height:1.5;">'
        '<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#64748b;margin-bottom:6px;">'
        'Terjemahan / Translation</div>'
        f'<p style="margin:0 0 4px;font-size:15px;"><b>ID</b> {_esc(s["id_translation"])}</p>'
        f'<p style="margin:0 0 10px;font-size:15px;"><b>EN</b> {_esc(s["en_translation"])}</p>'
        '<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#64748b;margin-bottom:4px;">'
        'Per kata / Word by word</div>'
        f'<table style="border-collapse:collapse;width:100%;font-size:13px;">{gloss_rows(s["tokens"])}</table>'
        '<div style="margin-top:10px;padding-top:8px;border-top:1px dashed #cbd5e1;font-size:13px;color:#334155;">'
        f'<p style="margin:0 0 4px;"><b>ID Catatan:</b> {_esc(s["note"])}</p>'
        f'<p style="margin:0;"><b>EN Note:</b> {_esc(s["note_en"])}</p>'
        '</div></div>'
    )


def html_block(s):
    """One sentence block: kanji line, romaji line, and a ? tooltip on the right."""
    return (
        '<section class="jp-sent" style="position:relative;border:1px solid #cbd5e1;'
        'border-left:6px solid #0f172a;border-radius:10px;background:#fff;'
        'margin:18px 0;padding:14px 56px 12px 16px;overflow:visible;">'
        # --- ? control (click / tap anywhere; hover-open needs the CSS cell)
        '<details class="qdet" style="position:absolute;right:8px;top:8px;z-index:30;">'
        '<summary title="Terjemahan / Translation" aria-label="Terjemahan dan arti per kata" '
        'style="list-style:none;cursor:pointer;width:34px;height:34px;line-height:30px;'
        'text-align:center;border-radius:50%;background:#0f172a;color:#fff;font-weight:700;'
        'font-size:17px;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35);'
        'user-select:none;">?</summary>'
        f'{qpanel(s)}</details>'
        # --- meta line
        '<div style="font-size:12px;color:#475569;margin-bottom:8px;">'
        '<span style="display:inline-block;background:#0f172a;color:#fff;border-radius:999px;'
        f'padding:1px 8px;font-weight:700;margin-right:6px;">{s["id"]}</span>'
        f'{_esc(s["situation"])}'
        f'<span style="color:#94a3b8;"> \\u2022 CEJC freq: {s["freq"]:,}</span></div>'
        # --- kanji line
        '<div style="font-size:22px;line-height:1.9;white-space:normal;overflow-wrap:anywhere;">'
        f'{token_spans(s["tokens"], 0)}</div>'
        # --- romaji line
        '<div style="font-size:15px;line-height:1.8;font-style:italic;color:#475569;'
        'margin-top:2px;white-space:normal;overflow-wrap:anywhere;">'
        f'{token_spans(s["tokens"], 1)}</div>'
        # --- footnote
        '<div style="font-size:11px;color:#94a3b8;margin-top:6px;">'
        f'{len(s["tokens"])} kata / words \\u2022 klik atau hover \\u2753 untuk terjemahan</div>'
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


# --------------------------------------------------------------------------- cells
INTRO_MD = '''# Kalimat Jepang Sehari-hari — Prototipe

Notebook ini berisi **6 kalimat prototipe** untuk Anda review sebelum saya isi
seluruh korpus kalimat.

## Format setiap blok

1. Baris **kanji** (22px)
2. Baris **romaji** (15px, miring)
3. Ikon **?** di kanan atas

Klik / tap ikon **?** (di GitHub dan di layar sentuh) untuk membuka terjemahan
Indonesia + Inggris, arti per kata, dan catatan pemakaian. Di Jupyter/Colab lokal,
ikon **?** juga terbuka otomatis saat di-hover.

## Keputusan styling

| Fitur | Pilihan |
|---|---|
| Warna per kata | 10 warna dipakai bergantian; kata ke-i sama warnanya di baris kanji dan romaji |
| Garis bawah per kata | 5 gaya: solid, dashed, dotted, double, wavy |
| Word wrap | `overflow-wrap:anywhere` + `white-space:normal` (kalimat no. 6 mengujinya) |
| Pemisah antar blok | kartu bergaris, garis tebal di kiri, nomor bulat, margin 18px |
| Tooltip | `<details>` untuk klik/tap + `title` untuk hover |

> **Catatan penting:** GitHub menyaring tag `<style>`. Karena itu semua warna,
> garis bawah, word wrap, dan pemisah blok saya tulis sebagai *inline style* agar
> tetap tampil di render GitHub. Perilaku hover dan tema gelap hanya aktif di
> Jupyter/Colab lokal (sel CSS di bawah).
'''

CSS_MD = '## 1. Sel CSS (opsional, untuk tampilan penuh di Jupyter lokal)\n'
DATA_MD = '''## 2. Data kalimat

Frekuensi kata diambil dari daftar frekuensi CEJC 書字形 (2.419.171 kata dari 200 jam
percakapan sehari-hari), jadi angka `CEJC freq` menunjukkan seberapa sering kata kunci
kalimat itu benar-benar dipakai orang Jepang.
'''
RENDER_MD = '## 3. Renderer (kanji, romaji, panel terjemahan)\n'
SHOW_MD = '## 4. Tampilkan kalimat\n'

ASK_MD = '''## 5. Yang perlu Anda nilai

1. **Warna** — 10 warna bergantian, cukup jelas atau perlu lebih banyak?
2. **Garis bawah** — 5 gaya membantu membedakan kata bertetangga, atau terlalu ramai?
3. **Ukuran huruf** — kanji 22px, romaji 15px. Perlu lebih besar untuk layar sentuh?
4. **Terjemahan** — panel klik/tap sudah tepat, atau Anda ingin terjemahan
   **selalu tampil** di bawah tiap blok tanpa perlu klik?
5. **Pemisah blok** — kartu bergaris + nomor bulat sudah jelas?
6. **Isi tooltip** — cukup terjemahan ID + EN, atau perlu ditambah kelas kata
   (verba, partikel, dan sebagainya) dan level kesopanan?

Setelah Anda setujui, saya isi format ini dengan seluruh daftar kalimat
(pertanyaan, sapaan, permintaan, penolakan, dan seterusnya).
'''


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
    """Real IPython in Jupyter; a tiny stub when building on a machine without it.

    Only the build-time execution needs this. The notebook source keeps the genuine
    `from IPython.display import HTML, display`, so it runs unchanged in Jupyter.
    """
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


def build():
    css_src = (
        'from IPython.display import HTML, display\n'
        'display(HTML(' + repr(STYLE_CELL) + '))\n'
    )
    # Execute the three real cells in order, exactly as Jupyter would, then store
    # each cell's output. GitHub renders these saved outputs.
    ns = run_cells(css_src, DATA_CELL, RENDERER_CELL)
    cards_html = ''.join(ns['html_block'](s) for s in ns['SENTENCES'])
    plain = '<IPython.core.display.HTML object>'

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
    assert n_html == 2, f'expected 2 cells with HTML output (CSS + cards), got {n_html}'
    assert cards.count('<section') == len(SENTENCES), 'missing sentence blocks'
    assert cards.count('<details') == len(SENTENCES), 'missing ? panels'
    assert 'display:inline-block' in cards, 'tokens are not atomic'
    assert 'overflow-wrap:anywhere' in cards, 'word wrap missing'
    print(f'wrote {out}')
    print(f'  cells={len(chk["cells"])} '
          f'(md={sum(c["cell_type"] == "markdown" for c in chk["cells"])}, '
          f'code={len(codes)})')
    print(f'  code cells with HTML output: {n_html}')
    print(f'  sentence blocks in output:   {cards.count("<section")}')
    print(f'  ? panels in output:          {cards.count("<details")}')
    print(f'  output size:                 {len(cards):,} chars')
