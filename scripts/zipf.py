#!/usr/bin/env python3
"""Stream the CEJC pronunciation-form and written-form frequency lists.
Collect: rank, frequency, form; compute Zipf stats, coverage, mora lengths."""
import zipfile, os, re, sys, json
import xml.etree.ElementTree as ET

NS = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'

def col(ref):
    s = re.match(r'([A-Z]+)', ref).group(1)
    n = 0
    for c in s:
        n = n * 26 + ord(c) - 64
    return n - 1

SMALL = set('ァィゥェォャュョヮヵヶヷヸヹヺ')
IGNORE = set('・＝＼／（）()「」｢｣')

def mora_count(form):
    """Count morae in a katakana pronunciation form."""
    n = 0
    for ch in form:
        o = ord(ch)
        if ch in SMALL or ch in IGNORE or ch == 'ー':
            if ch == 'ー':
                n += 1
            continue
        if 0x30A1 <= o <= 0x30FA:  # katakana block
            n += 1
    return n

def stream(path):
    z = zipfile.ZipFile(path)
    shared = []
    root = ET.fromstring(z.read('xl/sharedStrings.xml'))
    for si in root.findall(NS + 'si'):
        shared.append(''.join(t.text or '' for t in si.iter(NS + 't')))
    f = z.open('xl/worksheets/sheet1.xml')
    cur = None
    rows = 0
    out = []
    for ev, el in ET.iterparse(f, events=('start', 'end')):
        if ev == 'start' and el.tag == NS + 'row':
            cur = {}
        elif ev == 'end':
            if el.tag == NS + 'c' and cur is not None:
                t = el.get('t'); v = el.find(NS + 'v'); iss = el.find(NS + 'is')
                if t == 's' and v is not None:
                    val = shared[int(v.text)]
                elif t == 'inlineStr' and iss is not None:
                    val = ''.join(x.text or '' for x in iss.iter(NS + 't'))
                elif v is not None:
                    val = v.text
                else:
                    val = None
                if val is not None:
                    cur[col(el.get('r'))] = val
                el.clear()
            elif el.tag == NS + 'row' and cur is not None:
                rows += 1
                if rows > 1:
                    out.append((cur.get(1), cur.get(5), cur.get(6), cur.get(7)))
                cur = None
                el.clear()
                if rows % 5000 == 0:
                    print(f'  {os.path.basename(path)[:6]} rows={rows}', file=sys.stderr, flush=True)
    return out

def analyze(rows, label, mora=False):
    freqs = []
    forms = []
    for r in rows:
        try:
            fq = int(float(r[3]))
        except (TypeError, ValueError):
            continue
        freqs.append(fq)
        forms.append(r[1] or '')
    N = len(freqs)
    T = sum(freqs)
    print(f'### {label}: types={N:,} tokens={T:,}')
    # Zipf fit: log f vs log rank
    import math
    pts = [(i + 1, freqs[i]) for i in range(min(N, 5000)) if freqs[i] > 0]
    sx = sum(math.log(r) for r, _ in pts); sy = sum(math.log(f) for _, f in pts)
    sxx = sum(math.log(r) ** 2 for r, _ in pts); sxy = sum(math.log(r) * math.log(f) for r, f in pts)
    n = len(pts)
    alpha = -(n * sxy - sx * sy) / (n * sxx - sx * sx)
    print(f'  Zipf exponent alpha = {alpha:.3f}')
    # coverage
    cum = 0
    marks = [100, 500, 1000, 2000, 5000, 10000, 20000, N]
    for i, f in enumerate(freqs, 1):
        cum += f
        if i in marks:
            print(f'  top {i:>6,} types cover {100*cum/T:6.2f}% of tokens')
    # tokens needed for type counts (heaps-like): words per type
    print(f'  mean tokens per type = {T/N:.1f}')
    if mora:
        from collections import Counter
        tok = Counter(); typ = Counter()
        for f, form in zip(freqs, forms):
            m = mora_count(form)
            tok[m] += f
            typ[m] += 1
        print('  mora-length distribution of PRODUCTION (tokens):')
        for m in sorted(tok):
            if tok[m]: print(f'    {m} morae: {100*tok[m]/T:6.2f}%  ({tok[m]:,} tokens, {typ[m]:,} types)')
        mean_mora = sum(m * c for m, c in tok.items()) / T
        print(f'  mean morae per word form = {mean_mora:.2f}')
    return dict(N=N, T=T, alpha=alpha)

if __name__ == '__main__':
    base = None
    for r, d, f in os.walk('pron'):
        for n in f:
            if n.endswith('.xlsx'):
                if 'hatuonkei' in n: base = os.path.join(r, n)
    print('file:', base.encode('utf-8', 'surrogateescape').decode('utf-8', 'replace') if base else None)
    rows = stream(base)
    res = analyze(rows, 'CEJC pronunciation forms (発音形出現形)', mora=True)
    # written forms
    wbase = None
    for r, d, f in os.walk('pron'):
        for n in f:
            if n.endswith('.xlsx') and 'shozikei' in n: wbase = os.path.join(r, n)
    if wbase:
        rows2 = stream(wbase)
        analyze(rows2, 'CEJC written forms (書字形)', mora=False)
