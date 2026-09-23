#!/usr/bin/env python3
"""Second pass: POS subclasses, question markers, politeness markers, mora lengths."""
import zipfile, os, re, sys
from collections import Counter, defaultdict
import xml.etree.ElementTree as ET

NS = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'

def col(ref):
    s = re.match(r'([A-Z]+)', ref).group(1)
    n = 0
    for c in s:
        n = n * 26 + ord(c) - 64
    return n - 1

TARGETS = ['か', 'の', 'ね', 'よ', 'な', 'かしら', 'だろう', 'でしょう', 'でしょ',
           'です', 'ます', 'ません', 'ました', 'ください', '下さい',
           '何', 'なに', 'どこ', 'いつ', '誰', 'だれ', 'どう', 'どうして', 'なぜ',
           'いくら', 'どれ', 'どちら', 'どっち', 'いくつ', 'どんな',
           'だ', 'である', 'じゃ', 'かな', 'っけ', 'わ', 'ぞ', 'ぜ', 'さ']

def stream(path):
    z = zipfile.ZipFile(path)
    shared = []
    root = ET.fromstring(z.read('xl/sharedStrings.xml'))
    for si in root.findall(NS + 'si'):
        shared.append(''.join(t.text or '' for t in si.iter(NS + 't')))
    f = z.open('xl/worksheets/sheet1.xml')
    cur = None; rows = 0
    for ev, el in ET.iterparse(f, events=('start', 'end')):
        if ev == 'start' and el.tag == NS + 'row':
            cur = {}
        elif ev == 'end':
            if el.tag == NS + 'c' and cur is not None:
                t = el.get('t'); v = el.find(NS + 'v'); iss = el.find(NS + 'is')
                if t == 's' and v is not None: val = shared[int(v.text)]
                elif t == 'inlineStr' and iss is not None: val = ''.join(x.text or '' for x in iss.iter(NS + 't'))
                elif v is not None: val = v.text
                else: val = None
                if val is not None: cur[col(el.get('r'))] = val
                el.clear()
            elif el.tag == NS + 'row' and cur is not None:
                rows += 1
                if rows > 1:
                    yield (cur.get(1), cur.get(2), cur.get(3), cur.get(4), cur.get(7))
                cur = None; el.clear()
                if rows % 5000 == 0:
                    print(f'  rows={rows}', file=sys.stderr, flush=True)

SMALL = set('ァィゥェォャュョヮヵヶ')
def mora(reading):
    n = 0
    for ch in reading or '':
        if ch in SMALL: continue
        if ch in '・＝＼／()（）「」': continue
        if 0x30A1 <= ord(ch) <= 0x30FA: n += 1
    return n

def main():
    path = None
    for r, d, f in os.walk('pron'):
        for n in f:
            if n.endswith('.xlsx') and 'shozikei' in n:
                path = os.path.join(r, n)
    pos = Counter(); sub = Counter(); lex = Counter(); lexc = Counter()
    mora_tok = Counter(); mora_typ = Counter()
    total = 0; types = 0
    for yomi, lemma, pos0, sub0, freq in stream(path):
        try: fq = int(float(freq))
        except (TypeError, ValueError): continue
        total += fq; types += 1
        pos[pos0 or 'NA'] += fq
        sub[(pos0 or 'NA') + '/' + (sub0 or '-')] += fq
        if lemma in TARGETS:
            lex[lemma] += fq; lexc[lemma] += 1
        m = mora(yomi)
        mora_tok[m] += fq; mora_typ[m] += 1
    print(f'== total tokens {total:,} over {types:,} types (written-form list)')
    print('\n== POS (品詞) token distribution:')
    for k, v in pos.most_common(25):
        print(f'  {k:<26} {v:>9,}  {100*v/total:5.2f}%')
    print('\n== POS subclass (品詞/語彙素細分類) top 40:')
    for k, v in sub.most_common(40):
        print(f'  {k:<34} {v:>9,}  {100*v/total:5.2f}%')
    print('\n== target lexemes ( tokens, types, per-1000 ):')
    for k in TARGETS:
        if lex[k]:
            print(f'  {k:<8} {lex[k]:>8,}  types={lexc[k]:<3} {1000*lex[k]/total:7.2f} per 1000')
    print('\n== mora-length of word (from 語彙素読み), PRODUCTION weighted:')
    for m in sorted(mora_tok):
        if m and mora_tok[m]:
            print(f'  {m} mora: {100*mora_tok[m]/total:6.2f}%  tokens={mora_tok[m]:>9,}  types={mora_typ[m]:>6,}')
    print(f'  mean morae/word token = {sum(m*c for m,c in mora_tok.items())/total:.2f}')
    print(f'  mean morae/word type  = {sum(m*c for m,c in mora_typ.items())/types:.2f}')

if __name__ == '__main__':
    main()
