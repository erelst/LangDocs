#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build index.html for GitHub Pages.

GitHub's markdown renderer strips `style` attributes and its notebook viewer always
prints the code cells, so neither can show these cards exactly as designed.
GitHub Pages serves a plain HTML file untouched, so the dark cards render fully
there (hover works too, because a real <style> block is allowed).

The blocks come from the same renderer used by JP-sentences.ipynb, so there is a
single source of truth for colours, underlines, wrapping and the ? panel.
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import build_notebook as B   # noqa: E402  (same renderer + sentence data)


def build_page(blocks, title='Kalimat Jepang Sehari-hari'):
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
  .wrap {{ max-width: 820px; margin: 0 auto; padding: 26px 16px 72px; }}
  h1 {{ font-size: 17px; font-weight: 600; color: {B.TEXT_DIM}; margin: 0 0 18px;
        letter-spacing: .02em; }}
  /* behaviour that needs a real stylesheet: hover affordances */
  .jp-sent .qdet > summary::-webkit-details-marker {{ display: none; }}
  .jp-sent .qdet > summary::marker {{ content: ""; }}
  .jp-sent .qdet > summary {{ transition: transform .12s ease, border-color .12s ease; }}
  .jp-sent .qdet:hover > summary {{ transform: scale(1.08); border-color: #f8fafc; }}
  .jp-sent .qdet[open] > summary {{ border-color: #f59e0b; }}
  .jp-sent .tk {{ border-radius: 3px; }}
  .jp-sent .tk:hover {{ background: rgba(56, 189, 248, .18); }}
  @media (max-width: 420px) {{
    .wrap {{ padding: 18px 10px 56px; }}
    .jp-sent {{ padding: 14px 52px 14px 14px !important; }}
  }}
</style>
</head>
<body>
<div class="wrap">
<h1>{title}</h1>
{blocks}
</div>
</body>
</html>
'''


if __name__ == '__main__':
    ns = B.run_cells(B.DATA_CELL, B.RENDERER_CELL)
    blocks = ''.join(ns['html_block'](s) for s in ns['SENTENCES'])
    page = build_page(blocks)

    out = os.path.join(ROOT, 'index.html')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(page)

    # ---- verification -------------------------------------------------------
    with open(out, encoding='utf-8') as f:
        got = f.read()
    n = len(ns['SENTENCES'])
    checks = {
        'sentence blocks': got.count('<section') == n,
        '? panels': got.count('<details') == n,
        'dark card colour': got.count(f'background:{B.BG} !important') == n,
        'dark panel colour': got.count(f'background:{B.BG_PANEL} !important') == n,
        'accent colour': B.ACCENT in got,
        'atomic words (wrap between words)': got.count('display:inline-block') > n,
        'word wrap enabled': 'overflow-wrap:anywhere' in got,
        'no disclosure triangle': 'display:block;list-style:none' in got,
        'panels collapsed by default': ' open>' not in got and ' open ' not in got,
        'hover rules present (real CSS)': '.qdet:hover' in got,
        'page background dark': 'background: #020617' in got,
    }
    print(f'wrote {out}  ({len(page):,} chars)')
    for k, ok in checks.items():
        print(f'  [{"ok" if ok else "FAIL"}] {k}')
    if not all(checks.values()):
        raise SystemExit('page verification failed')
