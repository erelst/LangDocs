#!/usr/bin/env python3
"""Pass 4: interrogative inventory by exact POS and lexeme (UniDic writes lexemes in kanji)."""
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

# interrogative / question-related lexemes in UniDic
WH = {'何', '誰', '何処', '何時', '何故', '如何', '幾ら', '幾つ', '何方', 'どっち',
      'どんな', '如何して', 'どれ', '何れ', '何奴', '何者', '何時何分'}
Q_PARTICLES = {'か', 'の', 'かな', 'かしら', 'っけ', 'かい', 'だい'}
FINAL = {'か', 'の', 'ね', 'よ', 'な', 'わ', 'ぞ', 'ぜ', 'さ', 'なあ', 'ねえ', 'よお'}

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
    cur = None; rows = 0
    tot = 0
    pos_ka = Counter(); pos_no = Counter()   # か/の by POS
    final_part = Counter()                    # 終助詞 inventory
    wh = Counter()                            # wh lexemes
    aux = Counter()                           # だろう/でしょう/らしい etc.
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
                if rows > 1:
                    lemma = cur.get(2); pos = cur.get(3) or ''
                    try: fq = int(float(cur.get(7) or 0))
                    except (TypeError, ValueError): fq = 0
                    tot += fq
                    if lemma == 'か': pos_ka[pos] += fq
                    if lemma == 'の': pos_no[pos] += fq
                    if pos.startswith('助詞-終助詞') and lemma in FINAL: final_part[lemma] += fq
                    if lemma in WH: wh[lemma] += fq
                    if lemma in ('だろう', 'でしょう', 'でしょ', 'らしい', 'よう'): aux[lemma] += fq
                cur = None; el.clear()
    print(f'total tokens = {tot:,}')
    print('\n== か by POS ==')
    for k, v in pos_ka.most_common(): print(f'  {k:<22} {v:>8,}  {1000*v/tot:6.2f}/1000')
    print('\n== の by POS ==')
    for k, v in pos_no.most_common(): print(f'  {k:<22} {v:>8,}  {1000*v/tot:6.2f}/1000')
    print('\n== final particles (助詞-終助詞) ==')
    s = sum(final_part.values())
    for k, v in final_part.most_common(): print(f'  {k:<8} {v:>8,}  {1000*v/tot:6.2f}/1000  {100*v/s:5.1f}% of final particles')
    print(f'  TOTAL final particles: {s:,} ({1000*s/tot:.1f}/1000)')
    print('\n== wh lexemes ==')
    ws = sum(wh.values())
    for k, v in wh.most_common(): print(f'  {k:<10} {v:>8,}  {1000*v/tot:6.2f}/1000')
    print(f'  TOTAL wh tokens: {ws:,} ({1000*ws/tot:.1f}/1000)')
    print('\n== auxiliary question forms ==')
    for k, v in aux.most_common(): print(f'  {k:<8} {v:>8,}  {1000*v/tot:6.2f}/1000')
    print(f'\nquestion particles (か終助詞) + wh tokens = {pos_ka.get("助詞-終助詞",0)+ws:,} '
          f'({1000*(pos_ka.get("助詞-終助詞",0)+ws)/tot:.1f}/1000)')

if __name__ == '__main__':
    main()
