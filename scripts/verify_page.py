#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Headless-browser verification of index.html (the GitHub Pages deliverable).

Build-time checks in build_page.py only inspect the generated text. They cannot
tell whether the ? panel is actually *painted above* the sticky search bar, the
dim layer and the other cards, which is exactly the class of bug that made an
opened tooltip look like a dark smudge.

This script loads the real page in Chromium, drives it the way a user does
(click the ? button, click outside, press Escape, type in the search box) and
asserts the invariants that matter:

  * the ? button is reachable (not covered by another layer)
  * the panel opens IN FLOW: it stays inside the card's own box, so it cannot
    cover the card's bottom edge, the next block, or the search bar
  * expanding pushes the following content down instead of floating over it
  * the panel is measurably lighter than the card it grows out of (WCAG contrast)
  * the page never scrolls sideways because of the expansion
  * only one panel is open at a time; outside click and Escape close it
  * search matches kanji, romaji, Indonesian and English, and highlights

Usage:
    python3 scripts/verify_page.py [--keep]

Exits non-zero if any check fails, so it can gate a commit.
"""
import argparse
import http.server
import os
import re
import shutil
import socketserver
import subprocess
import sys
import tempfile
import threading

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

# (label, width, height)
VIEWPORTS = [
    ('phone portrait', 390, 844),
    ('small phone', 280, 500),
    ('phone 360', 360, 640),
    ('phone tall', 412, 915),
    ('landscape short', 700, 400),
    ('desktop', 820, 700),
    ('wide desktop', 1100, 760),
]

HARNESS = r'''<!doctype html><meta charset="utf-8"><title>verify</title>
<body style="margin:0;background:#000">
<iframe id="f" style="border:0;display:block"></iframe>
<pre id="r">pending</pre>
<script>
var R=document.getElementById('r'), O=[], FAIL=[];
function flush(){ R.textContent=O.join('\n'); }
function ok(n,c,x){ O.push((c?'PASS':'FAIL')+' '+n+(x?'  ['+x+']':'')); if(!c) FAIL.push(n); flush(); }
function note(t){ O.push(t); flush(); }
window.onerror=function(m,u,l){ O.push('JS_ERROR: '+m+' @'+l); flush(); document.title='DONE'; };
function px(s){var m=/rgba?\(([^)]+)\)/.exec(s); if(!m) return null;
  var p=m[1].split(',').map(function(x){return parseFloat(x)});
  return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};}
function over(f,b){var a=f.a;return{r:f.r*a+b.r*(1-a),g:f.g*a+b.g*(1-a),b:f.b*a+b.b*(1-a),a:1};}
function lum(c){function g(x){x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4);}
  return 0.2126*g(c.r)+0.7152*g(c.g)+0.0722*g(c.b);}
function ratio(a,b){var l1=lum(a),l2=lum(b),hi=Math.max(l1,l2),lo=Math.min(l1,l2);return (hi+0.05)/(lo+0.05);}
var q=new URLSearchParams(location.search), W=+q.get('w'), H=+q.get('h');
var f=document.getElementById('f'); f.width=W; f.height=H; f.src='index.html';
function sleep(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }

f.onload=function(){ (async function(){
 try{
  await sleep(1200);
  var w=f.contentWindow, d=f.contentDocument;
  var api=w.SENTAPI;
  function live(){ return [].slice.call(d.querySelectorAll('.jp-sent')); }
  function liveDetails(){ return [].slice.call(d.querySelectorAll('details.qdet')); }
  if(!api){ ok('page exposes its list API', false, 'window.SENTAPI absent'); throw new Error('no SENTAPI'); }
  note('viewport='+w.innerWidth+'x'+w.innerHeight+' rows='+api.rows+
       ' rendered='+api.rendered()+' nodes='+d.getElementsByTagName('*').length);

  // ------------------------------------------------------------- static chrome
  var inp=d.getElementById('q');
  ok('placeholder starts with Search:', (inp.getAttribute('placeholder')||'').indexOf('Search:')===0,
     inp.getAttribute('placeholder'));
  var h1=d.querySelector('h1').textContent;
  ok('heading is bilingual', /Kalimat Jepang/.test(h1) && /Everyday Japanese Sentences/.test(h1),
     h1.replace(/\s+/g,' ').slice(0,64));
  ok('count label is bilingual', d.getElementById('count').textContent.indexOf('kalimat / sentences')!==-1,
     d.getElementById('count').textContent.slice(0,60));

  // -------------------------------------------------------------- lazy loading
  ok('the whole bank is carried as data', api.rows>1000, 'rows='+api.rows);
  var firstWindow=api.rendered();
  ok('only a window is in the DOM at first', firstWindow<api.rows, firstWindow+' of '+api.rows);
  var grown=[firstWindow];
  for (var g=0; g<6; g++){
    w.scrollTo(0, d.documentElement.scrollHeight); await sleep(500); grown.push(api.rendered());
  }
  ok('scrolling down loads more sentences', grown[grown.length-1]>grown[0], grown.join(' -> '));
  ok('and still not the whole bank in the DOM', api.rendered()<api.rows, api.rendered()+' of '+api.rows);

  // The JS renderer and the Python renderer must agree, or a card would change
  // appearance the moment it is built in the browser instead of written into the HTML.
  var mismatch=-1, checked=0, cards=live();
  for (var c0=0; c0<Math.min(cards.length,120); c0++){
    var tmp=d.createElement('div'); tmp.innerHTML=api.cardHTML(w.SENT.rows[c0]);
    checked++;
    if (tmp.firstChild.outerHTML !== cards[c0].outerHTML){ mismatch=c0; break; }
  }
  ok('cards built by JS match the cards built by Python', mismatch===-1,
     checked+' compared, first mismatch index '+mismatch);

  // -------------------------------------------------------------- the ? panel
  w.scrollTo(0,0); await sleep(400);
  cards=live();
  var firstCard=cards[0], first=firstCard.querySelector('details.qdet');
  var btn=first.querySelector('summary');
  btn.scrollIntoView({block:'center'}); await sleep(250);
  var sr=btn.getBoundingClientRect();
  var bx=Math.min(w.innerWidth-2, Math.max(2, Math.round(sr.left+sr.width/2)));
  var by=Math.min(w.innerHeight-2, Math.max(2, Math.round(sr.top+sr.height/2)));
  var hit=d.elementFromPoint(bx, by);
  ok('? button clickable (not covered)', hit===btn, hit?hit.tagName+'.'+String(hit.className).slice(0,20):'null');

  btn.click(); await sleep(500);
  var p=first.querySelector('.qpanel'), cs2=w.getComputedStyle(p), r=p.getBoundingClientRect();
  ok('panel opens via real click', first.open && r.height>20, 'h='+Math.round(r.height));
  var cardBox=firstCard.getBoundingClientRect();
  ok('panel is in flow (not a floating layer)',
     cs2.position==='static'||cs2.position==='relative', 'position='+cs2.position);
  ok('panel inside its own card box',
     r.top>=cardBox.top-0.5 && r.bottom<=cardBox.bottom+0.5 &&
     r.left>=cardBox.left-0.5 && r.right<=cardBox.right+0.5,
     'panel='+[r.left,r.top,r.right,r.bottom].map(Math.round).join(',')+
     ' card='+[cardBox.left,cardBox.top,cardBox.right,cardBox.bottom].map(Math.round).join(','));
  ok('panel clears the card bottom edge', r.bottom<=cardBox.bottom-0.5,
     'gap='+Math.round(cardBox.bottom-r.bottom)+'px');
  ok('panel fits horizontally', r.left>=-0.5 && r.right<=w.innerWidth+0.5,
     'panel='+Math.round(r.left)+'..'+Math.round(r.right)+' vw='+w.innerWidth);
  var overflowX=d.documentElement.scrollWidth-w.innerWidth;
  ok('no sideways scroll after expanding', overflowX<=1, 'overflowX='+overflowX+'px');

  firstCard.scrollIntoView({block:'start'}); await sleep(300);
  r=p.getBoundingClientRect();
  if (r.bottom>w.innerHeight){ p.scrollIntoView({block:'end'}); await sleep(350); r=p.getBoundingClientRect(); }
  var barRect=d.querySelector('.bar').getBoundingClientRect();
  var pts=[];
  [0.08,0.5,0.92].forEach(function(fy){
    var y=r.top+r.height*fy;
    if (y>=barRect.bottom+2 && y<=w.innerHeight-2) { pts.push([r.left+r.width/2, y]); }
  });
  if (!pts.length) { pts.push([r.left+r.width/2, Math.min(w.innerHeight-2, Math.max(2, r.top+20))]); }
  var seen=[], onTop=true;
  pts.forEach(function(pt){
    var h=d.elementFromPoint(Math.round(pt[0]),Math.round(pt[1]));
    seen.push(h?h.tagName+'.'+String(h.className).slice(0,12):'null');
    if (!(h===p||p.contains(h))) { onTop=false; }
  });
  ok('panel drawn on top of everything', onTop, seen.join(' | '));

  p.scrollIntoView({block:'end'}); await sleep(300);
  var rb=p.getBoundingClientRect();
  ok('panel bottom reachable by scrolling', rb.bottom<=w.innerHeight+1,
     'panelBottom='+Math.round(rb.bottom)+' vh='+w.innerHeight);

  var nextCard=cards[cards.indexOf(firstCard)+1];
  if (nextCard){
    var nr=nextCard.getBoundingClientRect(), cb=firstCard.getBoundingClientRect();
    ok('expanded card pushes the next block down (no overlap)', nr.top>=cb.bottom-0.5,
       'nextTop='+Math.round(nr.top)+' cardBottom='+Math.round(cb.bottom));
  }
  var barEl=d.querySelector('.bar'), br=barEl.getBoundingClientRect();
  var atBar=d.elementFromPoint(Math.round(br.left+br.width/2), Math.round(br.top+br.height/2));
  ok('search bar not covered', atBar!==null && !p.contains(atBar),
     'topAtBar='+(atBar?atBar.tagName+'.'+String(atBar.className).slice(0,16):'null'));

  // ---- the panel must read as a raised surface --------------------------
  var pbg=px(cs2.backgroundColor), cardBg=px(w.getComputedStyle(firstCard).backgroundColor);
  var rp=ratio(pbg,cardBg), rt=ratio(over(px(cs2.color),pbg),pbg);
  var chipEl=p.querySelector('span');
  ok('panel states the register', !!(chipEl && chipEl.textContent.trim().length>=2),
     chipEl?chipEl.textContent.trim():'none');
  var reg=p.querySelector('div'), marks=[];
  if (reg) { reg.querySelectorAll('b').forEach(function(b){ marks.push(b.textContent.trim()); }); }
  ok('register line is bilingual (ID and EN)',
     marks.indexOf('ID')!==-1 && marks.indexOf('EN')!==-1,
     'markers='+marks.join(',')+' | '+(reg?reg.textContent.replace(/\s+/g,' ').slice(0,90):'none'));

  var details=liveDetails(), btns=[], borders=[];
  details.forEach(function(det){
    btns.push(w.getComputedStyle(det.querySelector('summary')).backgroundColor);
    borders.push(w.getComputedStyle(det.closest('.jp-sent')).borderLeftColor);
  });
  function uniqOf(a){ return a.filter(function(v,i){ return a.indexOf(v)===i; }); }
  ok('all ? buttons look identical', uniqOf(btns).length===1, uniqOf(btns).join(' | '));
  ok('all card borders look identical', uniqOf(borders).length===1, uniqOf(borders).join(' | '));

  var chips={};
  details.forEach(function(det){
    var badge=det.querySelector('.qpanel span');
    if (!badge) { return; }
    var key=badge.textContent.trim();
    if (key) { chips[key]=w.getComputedStyle(badge).backgroundColor; }
  });
  var chipColours=Object.keys(chips).map(function(k){ return chips[k]; });
  ok('panels distinguish close from stranger', uniqOf(chipColours).length>=2,
     Object.keys(chips).slice(0,6).map(function(k){ return k+'='+chips[k]; }).join(' | '));
  var edgeC=px(cs2.borderTopColor), rEdge=ratio(edgeC,cardBg);
  ok('panel is visible against its card (fill or outline)', Math.max(rp,rEdge)>=1.35,
     'fillRatio='+rp.toFixed(2)+' edgeRatio='+rEdge.toFixed(2));
  ok('panel text readable (>=7:1)', rt>=7, 'ratio='+rt.toFixed(1));

  // ---- one at a time, and the two ways out ------------------------------
  var other=(details[0]===first)?details[1]:details[0];
  other.querySelector('summary').click(); await sleep(300);
  var openCount=liveDetails().filter(function(x){return x.open;}).length;
  ok('only one panel open', openCount===1, 'open='+openCount);
  other.querySelector('summary').click(); await sleep(200);
  btn.click(); await sleep(250); d.body.click(); await sleep(300);
  ok('click outside closes', liveDetails().filter(function(x){return x.open;}).length===0);
  btn.click(); await sleep(250);
  d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true})); await sleep(300);
  ok('Escape closes', liveDetails().filter(function(x){return x.open;}).length===0);

  // ------------------------------------------------------------------ search
  function type(v){ inp.value=v; inp.dispatchEvent(new w.Event('input',{bubbles:true})); }
  function setScope(v){
    var el=d.querySelector('input[name="scope"][value="'+v+'"]');
    el.checked=true; el.dispatchEvent(new w.Event('change',{bubbles:true}));
  }
  type('ohayo'); await sleep(450);
  ok('romaji search matches', live().length>=1, live().length+' cards');
  ok('highlight in romaji line', d.querySelectorAll('.romaji mark').length>0);
  type('\u304a\u306f\u3088\u3046'); await sleep(450);
  ok('kanji search matches', live().length>=1, live().length+' cards');
  ok('highlight in kanji line', d.querySelectorAll('.kanji mark').length>0);
  type('stasiun'); await sleep(450);
  var allScope=live().length;
  ok('Indonesian search matches', allScope>=1, allScope+' cards');
  ok('highlight in panel too', d.querySelectorAll('.qpanel mark').length>0);

  // ---- the Japanese scope must narrow matching to the sentence itself ----
  setScope('jp'); await sleep(450);
  var jpScope=live().length;
  ok('Japanese scope excludes translation-only matches', jpScope<allScope,
     'all='+allScope+' jp='+jpScope);
  type('\u304a\u306f\u3088\u3046'); await sleep(450);
  ok('Japanese scope still matches kanji', live().length>=1, live().length+' cards');
  type('ohayou'); await sleep(450);
  ok('Japanese scope still matches romaji', live().length>=1, live().length+' cards');
  setScope('all'); await sleep(450);
  type('stasiun'); await sleep(450);
  ok('All scope restores translation matches', live().length>=allScope,
     live().length+' of '+allScope);

  // ---- typing must stay cheap: only a window ever exists ------------------
  type('a'); await sleep(450);
  var broad=live().length;
  ok('a broad query renders a bounded window, not the whole bank',
     broad>0 && broad<api.rows, broad+' of '+api.rows);
  type('zzzz'); await sleep(450);
  ok('empty state shown', live().length===0 && d.getElementById('empty').offsetHeight>0,
     d.getElementById('empty').textContent.trim().slice(0,30));
  type(''); await sleep(450);
  ok('clearing restores the list', live().length>0, live().length+' cards');

  // ------------------------------------------------------------- romaji toggle
  var rt=d.getElementById('rtoggle');
  var romBefore=w.getComputedStyle(live()[0].querySelector('.romaji')).display;
  rt.checked=false; rt.dispatchEvent(new w.Event('change',{bubbles:true})); await sleep(250);
  var allLive=live();
  var romAfter=w.getComputedStyle(allLive[0].querySelector('.romaji')).display;
  var romAfterLast=w.getComputedStyle(allLive[allLive.length-1].querySelector('.romaji')).display;
  var kanjiAfter=w.getComputedStyle(allLive[0].querySelector('.kanji')).display;
  ok('romaji toggle hides the romaji line', romBefore!=='none' && romAfter==='none',
     romBefore+' -> '+romAfter);
  ok('...on every rendered card, not just the first', romAfterLast==='none', 'last='+romAfterLast);
  ok('...and keeps the kanji line', kanjiAfter!=='none', kanjiAfter);
  rt.checked=true; rt.dispatchEvent(new w.Event('change',{bubbles:true})); await sleep(250);
  ok('romaji toggle restores the line',
     w.getComputedStyle(live()[0].querySelector('.romaji')).display!=='none');

  // ------------------------------------------------------- deep link past the window
  var target=140;
  w.location.hash='#q'+target; await sleep(1000);
  var op=liveDetails().filter(function(x){return x.open;});
  var gotKanji = op.length===1 ? op[0].closest('.jp-sent').querySelector('.kanji').textContent.replace(/\s+/g,'') : '';
  var wantKanji = String(w.SENT.rows[target-1][0]).replace(/\s+/g,'');
  ok('deep link opens the right sentence past the first window',
     op.length===1 && gotKanji===wantKanji && gotKanji.length>0,
     'open='+op.length+' got='+gotKanji.slice(0,18)+' want='+wantKanji.slice(0,18));

  note('');
  note(FAIL.length? ('FAILURES: '+FAIL.join(', ')) : 'ALL CHECKS PASSED');
 }catch(e){ O.push('THREW: '+e.message); flush(); FAIL.push('threw'); }
 document.title='DONE';
})(); };
</script>
'''


class _Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def find_chromium():
    for name in ('chromium', 'chromium-browser', 'google-chrome', 'chrome'):
        path = shutil.which(name)
        if path:
            return path
    return None


def serve(directory):
    handler = lambda *a, **k: _Quiet(*a, directory=directory, **k)  # noqa: E731
    httpd = socketserver.TCPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


def run_probe(chromium, port, w, h):
    url = f'http://127.0.0.1:{port}/_verify.html?w={w}&h={h}'
    cmd = [chromium, '--headless=new', '--no-sandbox', '--disable-gpu',
           '--hide-scrollbars', '--virtual-time-budget=20000',
           f'--window-size={w},{h}', '--dump-dom', url]
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    m = re.search(r'<pre[^>]*id="r"[^>]*>(.*?)</pre>', proc.stdout, re.S)
    if not m:
        return None
    import html as _html
    return _html.unescape(m.group(1))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--keep', action='store_true', help='keep the temp harness dir')
    args = ap.parse_args()

    index = os.path.join(ROOT, 'index.html')
    if not os.path.exists(index):
        sys.exit('index.html not found; run scripts/build_page.py first')

    chromium = find_chromium()
    if not chromium:
        sys.exit('no chromium/chrome found; cannot verify the rendered page')

    tmp = tempfile.mkdtemp(prefix='langdocs-verify-')
    try:
        # the harness must be same-origin with the page to inspect the iframe
        shutil.copy(index, os.path.join(tmp, 'index.html'))
        with open(os.path.join(tmp, '_verify.html'), 'w', encoding='utf-8') as f:
            f.write(HARNESS)
        httpd, port = serve(tmp)

        failures = 0
        for label, w, h in VIEWPORTS:
            print(f'--- {label} ({w}x{h}) ---')
            out = run_probe(chromium, port, w, h)
            if out is None:
                print('  FAIL no output from the browser')
                failures += 1
                continue
            print('\n'.join('  ' + line for line in out.splitlines()))
            if 'ALL CHECKS PASSED' not in out:
                failures += 1
            print()
        httpd.shutdown()
    finally:
        if args.keep:
            print(f'harness kept in {tmp}')
        else:
            shutil.rmtree(tmp, ignore_errors=True)

    if failures:
        sys.exit(f'{failures} viewport(s) FAILED')
    print(f'all {len(VIEWPORTS)} viewports passed')


if __name__ == '__main__':
    main()
