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
  ? button on the right  ->  expands the Indonesian + English translation IN PLACE

The ? panel is in-flow content of the card, so opening it grows the card. There
is no floating layer, no scrim and no z-index juggling: the panel simply cannot
cover the card's own bottom edge or another block.

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

# Register colours, so "close" and "stranger" are distinguishable at a glance even
# though the blocks themselves carry no labels. Chosen to be light enough that the
# same value can be a border, a small badge, or emphasis text on the card.
WHO_COLOURS = {'dekat': '#86efac', 'asing': '#fcd34d'}
DARK_PALETTE = [dark for _, dark in PALETTE]

BG = '#0b1220'        # card background (unchanged from the original design)
BG_PANEL = '#070c14'  # expanded panel: deliberately DARKER than the card. Because
                      # the fill is so close to the card, the visible separation is
                      # carried by BG_PANEL_EDGE below, not by the fill.
BG_PANEL_EDGE = '#4a5a72'  # panel outline: the actual separator (2.67:1 vs card)
EDGE = '#334155'
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
        # The cells carry classes so the page CSS can restack them on a narrow
        # screen, where four nowrap columns cannot fit inside the card.
        rows.append(
            '<tr>'
            f'<td class="gk" style="{edge}color:{color} !important;font-weight:700;white-space:nowrap;">{_esc(kanji)}</td>'
            f'<td class="gr" style="{edge}color:{TEXT_DIM} !important;font-style:italic;white-space:nowrap;">{_esc(romaji)}</td>'
            f'<td class="gi" style="{edge}color:{TEXT} !important;">{_esc(gid)}</td>'
            f'<td class="ge" style="{edge}color:{TEXT_DIM} !important;">{_esc(gen)}</td>'
            '</tr>'
        )
    return ''.join(rows)


def qpanel(s):
    """The panel expanded by the ? button.

    It is a normal in-flow block INSIDE the sentence card: opening it makes the
    card grow instead of floating a layer over the page, so the panel can never
    overlap its own card's border, a neighbouring card, or the search bar.
    """
    who_colour = WHO_COLOURS.get(s.get('who', ''), ACCENT)
    return (
        f'<div class="qpanel" style="box-sizing:border-box;background:{BG_PANEL} !important;'
        f'color:{TEXT} !important;'
        f'border:1px solid {BG_PANEL_EDGE} !important;border-top:3px solid {ACCENT} !important;'
        f'border-radius:12px;padding:14px 16px;margin-top:14px;'
        f'box-shadow:0 10px 26px rgba(0,0,0,.45);'
        f'text-align:left;font-size:14px;line-height:1.55;">'
        # register line: the only place the block says who the sentence is for,
        # so the blocks themselves stay down to kanji + romaji + ?
        f'<div style="margin:0 0 10px;padding-bottom:9px;'
        f'border-bottom:1px solid {EDGE};">'
        f'<span style="display:inline-block;background:{who_colour};color:#0b1220 !important;'
        f'font-weight:800;border-radius:20px;padding:1px 10px;font-size:12.5px;'
        f'white-space:nowrap;">{_esc(s["who_id"])}</span>'
        f'<span style="display:inline-block;margin-left:6px;border:1px solid {who_colour};'
        f'color:{who_colour} !important;border-radius:20px;padding:0 9px;font-size:12.5px;'
        f'white-space:nowrap;">{_esc(s["politeness"])}</span>'
        # both languages, matching the ID/EN pairing used for the translation
        # and the word glosses, so no line is English-only
        f'<div style="margin-top:7px;font-size:12.5px;color:{TEXT_DIM} !important;">'
        f'<p style="margin:0 0 3px;"><b style="color:{who_colour} !important;">ID</b> '
        f'{_esc(s["who_id"])} &middot; {_esc(s["situation"])}</p>'
        f'<p style="margin:0;"><b style="color:{who_colour} !important;">EN</b> '
        f'{_esc(s["who_en"])} &middot; {_esc(s["situation_en"])}</p></div>'
        f'</div>'
        f'<p style="margin:0 0 6px;font-size:16px;color:#f8fafc !important;">'
        f'<b style="color:{ACCENT};">ID</b> {_esc(s["id_translation"])}</p>'
        f'<p style="margin:0 0 12px;font-size:16px;color:#f8fafc !important;">'
        f'<b style="color:{ACCENT};">EN</b> {_esc(s["en_translation"])}</p>'
        f'<table class="gloss" style="border-collapse:collapse;width:100%;font-size:13.5px;">'
        f'{gloss_rows(s["tokens"])}</table>'
        f'<div style="margin-top:12px;padding-top:10px;border-top:1px dashed {EDGE_SOFT};'
        f'font-size:13px;color:{TEXT_DIM} !important;">'
        f'<p style="margin:0 0 4px;"><b style="color:{ACCENT} !important;">ID</b> {_esc(s["note"])}</p>'
        f'<p style="margin:0;"><b style="color:{ACCENT} !important;">EN</b> {_esc(s["note_en"])}</p>'
        '</div></div>'
    )


def html_block(s):
    """One block: kanji line, romaji line, and the ? expander. Nothing else.

    DOM order matters: the <details> sits AFTER the romaji line, so the panel
    expands underneath the sentence. Its <summary> is absolutely positioned, so
    the ? button still appears at the card's top-right corner while the collapsed
    <details> contributes no height.

    The register (close vs stranger) is expressed INSIDE the panel only: the ? 
    button and the card look identical for every block, so the list stays uniform
    and the distinction appears once a block is opened.
    """
    return (
        f'<section class="jp-sent" style="position:relative;background:{BG} !important;'
        f'border:1px solid {EDGE} !important;border-left:5px solid {ACCENT} !important;border-radius:12px;'
        f'margin:16px 0;padding:16px 58px 16px 18px;overflow:visible;">'
        # kanji line
        '<div class="kanji" style="font-size:23px;line-height:2.0;font-weight:500;color:#f8fafc !important;'
        f'white-space:normal;overflow-wrap:anywhere;padding-right:6px;">'
        f'{token_spans(s["tokens"], 0)}</div>'
        # romaji line
        f'<div class="romaji" style="font-size:15px;line-height:1.85;font-style:italic;color:{TEXT_DIM} !important;'
        'margin-top:3px;white-space:normal;overflow-wrap:anywhere;">'
        f'{token_spans(s["tokens"], 1)}</div>'
        # ? expander. display:block + list-style:none removes the triangle without CSS,
        # and the panel is in-flow so the card grows to hold it.
        '<details class="qdet">'
        '<summary title="Terjemahan / Translation, dan kepada siapa kalimat ini dipakai" '
        'aria-label="Terjemahan, arti per kata, dan lawan bicara" '
        f'style="display:block;list-style:none;cursor:pointer;width:34px;height:34px;'
        f'line-height:30px;text-align:center;border-radius:50%;background:{EDGE} !important;'
        f'color:#f8fafc !important;font-weight:700;font-size:17px;border:2px solid {ACCENT} !important;'
        'box-shadow:0 2px 8px rgba(0,0,0,.5);user-select:none;">?</summary>'
        f'{qpanel(s)}</details>'
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
