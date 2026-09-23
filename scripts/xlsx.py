#!/usr/bin/env python3
"""Minimal xlsx reader using only stdlib (zipfile + ElementTree)."""
import zipfile, re, sys, xml.etree.ElementTree as ET

NS = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'

def col_to_idx(ref):
    m = re.match(r'([A-Z]+)', ref)
    s = m.group(1)
    n = 0
    for ch in s:
        n = n * 26 + (ord(ch) - 64)
    return n - 1

def read_sheet(path, sheet_index=0):
    z = zipfile.ZipFile(path)
    shared = []
    if 'xl/sharedStrings.xml' in z.namelist():
        root = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in root.findall(NS + 'si'):
            txt = ''.join(t.text or '' for t in si.iter(NS + 't'))
            shared.append(txt)
    sheets = sorted(n for n in z.namelist() if re.match(r'xl/worksheets/sheet\d+\.xml$', n))
    name = sheets[sheet_index]
    root = ET.fromstring(z.read(name))
    rows = []
    for row in root.iter(NS + 'row'):
        cells = {}
        for c in row.findall(NS + 'c'):
            ref = c.get('r') or ''
            t = c.get('t')
            v = c.find(NS + 'v')
            isel = c.find(NS + 'is')
            if t == 's' and v is not None:
                val = shared[int(v.text)]
            elif t == 'inlineStr' and isel is not None:
                val = ''.join(x.text or '' for x in isel.iter(NS + 't'))
            elif v is not None:
                val = v.text
            else:
                val = None
            if val is not None and ref:
                cells[col_to_idx(ref)] = val
        if cells:
            width = max(cells) + 1
            rows.append([cells.get(i) for i in range(width)])
    return rows, [n for n in z.namelist() if 'worksheets' in n]

if __name__ == '__main__':
    rows, sheets = read_sheet(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 0)
    print('SHEETS:', sheets)
    print('ROWS:', len(rows))
    for r in rows[:40]:
        print(r)
