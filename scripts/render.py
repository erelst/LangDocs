#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Renderer: turn sentence data into the dark HTML blocks and read them back.

This module is the single source of truth for presentation: colours, underline
styles, word wrapping, and the ? panel. index.html is built from it, so the page
never hand-copies a colour.

Layout per block
----------------
  kanji line
  romaji line
  ? button on the right  ->  opens the Indonesian + English translation

Nothing else belongs in a block: no number, no situation label, no frequency.

Two rendering details exist for a reason:
  * every property that matters is written INLINE, so the dark theme and the
    suppressed disclosure triangle survive renderers that drop <style> blocks
  * the ? control is <details>/<summary> with display:block and list-style:none,
    so it needs no CSS to work with mouse, keyboard or touch
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

from sentences import SENTENCES, PALETTE, UNDERLINE_STYLES  # noqa: E402

# dark-mode palette: the second colour of each pair in sentences.PALETTE
DARK_PALETTE = [dark for _, dark in PALETTE]

BG = '#0b1220'        # card background
BG_PANEL = '#263449'  # tooltip/modal surface: deliberately and clearly lighter
                      # than the card and the dimmed backdrop, so an open panel
                      # reads as a raised layer instead of a dark smudge
EDGE = '#1e293b'
EDGE_SOFT = '#334155'
ACCENT = '#38bdf8'
TEXT = '#e5e7eb'
TEXT_DIM = '#94a3b8'


def _esc(t):
    return str(t).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def token_spans(tokens, idx):
    """One line of tokens; token i keeps the same colour on both lines."""
    out = []
    for i, tok in enumerate(tokens):
        color = DARK_PALETTE[i % len(DARK_PALETTE)]
        style = UNDERLINE_STYLES[i % len(UNDERLINE_STYLES)]
        width = '3px' if style == 'double' else '2px'
        text = _esc(tok[idx])
        # display:inline-block keeps each word atomic, so a narrow screen wraps
        # between words and never splits a word in half.
        out.append(
            f'<span class="tk" style="display:inline-block;color:{color} !important;'
            f'border-bottom:{width} {style} {color} !important;padding:0 3px;" '
            f'title="{text}">{text}</span>'
        )
    return ''.join(out)


def gloss_rows(tokens):
    """Word-by-word table inside the ? panel."""
    rows = []
    for i, tok in enumerate(tokens):
        kanji, romaji, gid, gen = tok
        color = DARK_PALETTE[i % len(DARK_PALETTE)]
        edge = f'border-bottom:1px solid {EDGE_SOFT};vertical-align:top;padding:4px 8px;'
        rows.append(
            '<tr>'
            f'<td style="{edge}color:{color} !important;font-weight:700;white-space:nowrap;">{_esc(kanji)}</td>'
            f'<td style="{edge}color:{TEXT_DIM} !important;font-style:italic;white-space:nowrap;">{_esc(romaji)}</td>'
            f'<td style="{edge}color:{TEXT} !important;">{_esc(gid)}</td>'
            f'<td style="{edge}color:{TEXT_DIM} !important;">{_esc(gen)}</td>'
            '</tr>'
        )
    return ''.join(rows)


def qpanel(s):
    """The panel revealed by the ? button."""
    return (
        f'<div class="qpanel" style="position:absolute;right:0;top:42px;box-sizing:border-box;'
        f'width:min(88vw,620px);background:{BG_PANEL} !important;color:{TEXT} !important;'
        f'border:1px solid {EDGE_SOFT} !important;border-top:3px solid {ACCENT} !important;'
        f'border-radius:12px;padding:14px 16px;'
        f'max-height:70vh;overflow:auto;'
        f'box-shadow:0 22px 60px rgba(0,0,0,.8), 0 0 0 1px rgba(56,189,248,.22);'
        f'text-align:left;font-size:14px;line-height:1.55;">'
        f'<p style="margin:0 0 6px;font-size:16px;color:#f8fafc !important;">'
        f'<b style="color:{ACCENT};">ID</b> {_esc(s["id_translation"])}</p>'
        f'<p style="margin:0 0 12px;font-size:16px;color:#f8fafc !important;">'
        f'<b style="color:{ACCENT};">EN</b> {_esc(s["en_translation"])}</p>'
        f'<table style="border-collapse:collapse;width:100%;font-size:13.5px;">'
        f'{gloss_rows(s["tokens"])}</table>'
        f'<div style="margin-top:12px;padding-top:10px;border-top:1px dashed {EDGE_SOFT};'
        f'font-size:13px;color:{TEXT_DIM} !important;">'
        f'<p style="margin:0 0 4px;"><b style="color:{ACCENT} !important;">ID</b> {_esc(s["note"])}</p>'
        f'<p style="margin:0;"><b style="color:{ACCENT} !important;">EN</b> {_esc(s["note_en"])}</p>'
        '</div></div>'
    )


def html_block(s):
    """One block: kanji line, romaji line, and the ? tooltip. Nothing else."""
    return (
        f'<section class="jp-sent" style="position:relative;background:{BG} !important;'
        f'border:1px solid {EDGE} !important;border-left:5px solid {ACCENT} !important;border-radius:12px;'
        f'margin:16px 0;padding:16px 58px 16px 18px;overflow:visible;">'
        # ? control: display:block + list-style:none removes the triangle without CSS
        '<details class="qdet" style="position:absolute;right:10px;top:10px;z-index:30;">'
        '<summary title="Terjemahan / Translation" aria-label="Terjemahan dan arti per kata" '
        f'style="display:block;list-style:none;cursor:pointer;width:34px;height:34px;'
        f'line-height:30px;text-align:center;border-radius:50%;background:{EDGE} !important;'
        f'color:#f8fafc !important;font-weight:700;font-size:17px;border:2px solid {ACCENT} !important;'
        'box-shadow:0 2px 8px rgba(0,0,0,.5);user-select:none;">?</summary>'
        f'{qpanel(s)}</details>'
        # kanji line
        '<div class="kanji" style="font-size:23px;line-height:2.0;font-weight:500;color:#f8fafc !important;'
        f'white-space:normal;overflow-wrap:anywhere;padding-right:6px;">'
        f'{token_spans(s["tokens"], 0)}</div>'
        # romaji line
        f'<div class="romaji" style="font-size:15px;line-height:1.85;font-style:italic;color:{TEXT_DIM} !important;'
        'margin-top:3px;white-space:normal;overflow-wrap:anywhere;">'
        f'{token_spans(s["tokens"], 1)}</div>'
        '</section>'
    )


def all_blocks():
    """Every sentence as one HTML string, in data order."""
    return ''.join(html_block(s) for s in SENTENCES)


if __name__ == '__main__':
    # A quick sanity check when run directly; the full page is built by
    # scripts/build_page.py, which also verifies the result.
    cards = all_blocks()
    assert cards.count('<section') == len(SENTENCES), 'block count mismatch'
    assert cards.count('<details') == len(SENTENCES), 'panel count mismatch'
    print(f'{len(SENTENCES)} blocks, {len(cards):,} chars')
    print(f'  card  {BG}')
    print(f'  panel {BG_PANEL}')
    print(f'  accent {ACCENT}')
