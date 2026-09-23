#!/usr/bin/env python3
"""Pass 3: marker frequencies (か, の, ね, よ, です, ます, wh-words) by register, place, gender."""
import zipfile, os, re, sys
from collections import Counter
import xml.etree.ElementTree as ET

NS = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'

def colidx(ref):
    s = re.match(r'([A-Z]+)', ref).group(1)
    n = 0
    for c in s:
        n = n * 26 + ord(c) - 64
    return n - 1

TARGETS = {'か', 'の', 'ね', 'よ', 'な', 'です', 'ます', 'ません', 'ました',
           'ください', '何', 'なに', 'どこ', 'いつ', '誰', 'だれ', 'どう', 'なぜ',
           'どうして', 'どんな', 'いくら', 'いくつ', 'どっち', 'どちら', 'だ',
           'だろう', 'でしょう', 'かな', 'かしら', 'っけ'}

GROUPS = {
    'ALL': 'frequency',
    'ZATSU': '雑談_frequency',
    'YODAN': '用談・相談_frequency',
    'KAIGI': '会議・会合_frequency',
    'JUGYO': '授業・レッスン_frequency',
    'JITAKU': '自宅_frequency',
    'SHOKUBA': '職場_frequency',
    'KOKYOSHO': '公共商業施設_frequency',
    'MALE': '男性_frequency',
    'FEMALE': '女性_frequency',
}

def main():
    path = None
    for r, d, f in os.walk('pron'):
        for n in f:
            if n.endswith('.xlsx') and 'hatuonkei' in n:
                path = os.path.join(r, n)
    z = zipfile.ZipFile(path)
    shared = []
    root = ET.fromstring(z.read('xl/sharedStrings.xml'))
    for si in root.findall(NS + 'si'):
        shared.append(''.join(t.text or '' for t in si.iter(NS + 't')))
    fh = z.open('xl/worksheets/sheet1.xml')
    cur = None; rows = 0; cidx = {}
    out = {k: Counter() for k in GROUPS}
    totals = Counter()
    for ev, el in ET.iterparse(fh, events=('start', 'end')):
        if ev == 'start' and el.tag == NS + 'row':
            cur = {}
        elif ev == 'end':
            if el.tag == NS + 'c' and cur is not None:
                t = el.get('t'); v = el.find(NS + 'v'); iss = el.find(NS + 'is')
                if t == 's' and v is not None: val = shared[int(v.text)]
                elif t == 'inlineStr' and iss is not None: val = ''.join(x.text or '' for x in iss.iter(NS + 't'))
                elif v is not None: val = v.text
                else: val = None
                if val is not None: cur[colidx(el.get('r'))] = val
                el.clear()
            elif el.tag == NS + 'row' and cur is not None:
                rows += 1
                if rows == 1:
                    hdr = {v: k for k, v in cur.items()}
                    for g, cname in GROUPS.items():
                        if cname in hdr: cidx[g] = hdr[cname]
                    print('cols found:', cidx, file=sys.stderr, flush=True)
                else:
                    lemma = cur.get(2)
                    for g, ci in cidx.items():
                        try: fq = int(float(cur.get(ci) or 0))
                        except (TypeError, ValueError): fq = 0
                        totals[g] += fq
                        if lemma in TARGETS: out[g][lemma] += fq
                cur = None; el.clear()
    print('column totals (tokens):', {k: f'{v:,}' for k, v in totals.items()})
    order = ['か', 'の', 'ね', 'よ', 'な', 'だ', 'です', 'ます', 'ません', 'ました', 'ください',
             '何', 'なに', 'どこ', 'いつ', '誰', 'だれ', 'どう', 'なぜ', 'どうして', 'どんな',
             'いくら', 'いくつ', 'どっち', 'どちら', 'だろう', 'でしょう', 'かな', 'かしら', 'っけ']
    keys = list(GROUPS)
    print('\n== per 1000 words, by environment ==')
    print('marker   ' + ''.join(f'{k:>10}' for k in keys))
    for m in order:
        if not any(out[g][m] for g in keys): continue
        print(f'{m:<8}' + ''.join(f'{1000*out[g][m]/max(totals[g],1):10.2f}' for g in keys))
    print('\n== raw counts ==')
    for m in order:
        if not any(out[g][m] for g in keys): continue
        print(f'{m:<8}' + ''.join(f'{out[g][m]:>10,}' for g in keys))

if __name__ == '__main__':
    main()
