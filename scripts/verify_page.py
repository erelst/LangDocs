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
  await sleep(900);
  var w=f.contentWindow, d=f.contentDocument;
  var details=[].slice.call(d.querySelectorAll('details.qdet'));
  var cards=[].slice.call(d.querySelectorAll('.jp-sent'));
  note('viewport='+w.innerWidth+'x'+w.innerHeight+' cards='+cards.length+' ?buttons='+details.length);

  // ---- real click path on the last card's ? button ----------------------
  var last=details[details.length-1], lastCard=cards[cards.length-1];
  var btn=last.querySelector('summary');
  btn.scrollIntoView({block:'center'});
  await sleep(250);
  var sr=btn.getBoundingClientRect();
  var bx=Math.min(w.innerWidth-2, Math.max(2, Math.round(sr.left+sr.width/2)));
  var by=Math.min(w.innerHeight-2, Math.max(2, Math.round(sr.top+sr.height/2)));
  var hit=d.elementFromPoint(bx, by);
  ok('? button clickable (not covered)', hit===btn, hit?hit.tagName+'.'+String(hit.className).slice(0,20):'null');

  btn.click(); await sleep(500);
  var p=last.querySelector('.qpanel'), cs=w.getComputedStyle(p), r=p.getBoundingClientRect();
  ok('panel opens via real click', last.open && r.height>20, 'h='+Math.round(r.height));

  // ---- the panel must live INSIDE its own card ---------------------------
  // This is the property that makes the overlap problem impossible: the panel is
  // in-flow content, so the card grows to contain it.
  var cardBox=lastCard.getBoundingClientRect();
  var cs2=w.getComputedStyle(p);
  ok('panel is in flow (not a floating layer)',
     cs2.position==='static' || cs2.position==='relative',
     'position='+cs2.position);
  ok('panel inside its own card box',
     r.top>=cardBox.top-0.5 && r.bottom<=cardBox.bottom+0.5 &&
     r.left>=cardBox.left-0.5 && r.right<=cardBox.right+0.5,
     'panel='+[r.left,r.top,r.right,r.bottom].map(Math.round).join(',')+
     ' card='+[cardBox.left,cardBox.top,cardBox.right,cardBox.bottom].map(Math.round).join(','));
  ok('panel clears the card bottom edge', r.bottom<=cardBox.bottom-0.5,
     'gap='+Math.round(cardBox.bottom-r.bottom)+'px');

  // An expanded panel may legitimately be taller than the screen (a long sentence
  // has many glosses), so the page scrolls vertically. What must never happen is
  // sideways overflow or the panel escaping its card horizontally.
  ok('panel fits horizontally', r.left>=-0.5 && r.right<=w.innerWidth+0.5,
     'panel='+Math.round(r.left)+'..'+Math.round(r.right)+' vw='+w.innerWidth);
  var overflowX=d.documentElement.scrollWidth-w.innerWidth;
  ok('no sideways scroll after expanding', overflowX<=1, 'overflowX='+overflowX+'px');

  // Bring the whole expanded card on screen, then check the panel is really there
  // and that nothing is drawn over it. elementFromPoint returns null off-screen,
  // so only sample points inside the viewport.
  lastCard.scrollIntoView({block:'start'});
  await sleep(300);
  r=p.getBoundingClientRect();
  var lowest=(function(){
    // scroll so the panel's bottom edge is visible, if the panel is that tall
    if (r.bottom>w.innerHeight) { p.scrollIntoView({block:'end'}); }
    return null;
  })();
  await sleep(300);
  r=p.getBoundingClientRect();
  // The sticky search bar legitimately covers the top of whatever is scrolled
  // under it, so only sample the part of the panel that is below the bar.
  var barRect=d.querySelector('.bar').getBoundingClientRect();
  var inView=function(y){ return y>=barRect.bottom+2 && y<=w.innerHeight-2; };
  var pts=[];
  [0.08,0.5,0.92].forEach(function(fy){
    var y=r.top+r.height*fy;
    if (inView(y)) { pts.push([r.left+r.width/2, y]); }
  });
  var hiddenBehindBar = r.top < barRect.bottom;
  if (!pts.length) { pts.push([r.left+r.width/2, Math.min(w.innerHeight-2, Math.max(2, r.top+20))]); }
  var seen=[], onTop=true;
  pts.forEach(function(pt){
    var h=d.elementFromPoint(Math.round(pt[0]),Math.round(pt[1]));
    seen.push(h?h.tagName+'.'+String(h.className).slice(0,12):'null');
    if(!(h===p||p.contains(h))) onTop=false; });
  ok('panel drawn on top of everything', onTop, seen.join(' | ') + ' behindBar=' + hiddenBehindBar);

  // every part of the panel must be reachable by scrolling, including its bottom
  p.scrollIntoView({block:'end'}); await sleep(300);
  var rb=p.getBoundingClientRect();
  ok('panel bottom reachable by scrolling', rb.bottom<=w.innerHeight+1,
     'panelBottom='+Math.round(rb.bottom)+' vh='+w.innerHeight);

  // expanding must push the following card down, not cover it
  var nextCard=cards[cards.indexOf(lastCard)+1];
  if (nextCard) {
    var nr=nextCard.getBoundingClientRect();
    ok('expanded card pushes the next block down (no overlap)',
       nr.top>=cardBox.bottom-0.5,
       'nextTop='+Math.round(nr.top)+' cardBottom='+Math.round(cardBox.bottom));
  }

  // the search bar must never be covered or dimmed
  var barEl=d.querySelector('.bar'), br=barEl.getBoundingClientRect();
  var atBar=d.elementFromPoint(Math.round(br.left+br.width/2), Math.round(br.top+br.height/2));
  ok('search bar not covered', atBar!==null && !p.contains(atBar),
     'topAtBar='+(atBar?atBar.tagName+'.'+String(atBar.className).slice(0,16):'null'));

  // ---- the panel must read as a raised surface --------------------------
  var pbg=px(cs2.backgroundColor), cardBg=px(w.getComputedStyle(lastCard).backgroundColor);
  var rp=ratio(pbg,cardBg), rt=ratio(over(px(cs2.color),pbg),pbg);
  ok('panel clearly lighter than its card (>=1.35:1)', rp>=1.35,
     'ratio='+rp.toFixed(2)+' panel='+cs2.backgroundColor);
  ok('panel text readable (>=7:1)', rt>=7, 'ratio='+rt.toFixed(1));

  // ---- one at a time, and the two ways out ------------------------------
  var other=(details[0]===last)?details[1]:details[0];
  other.querySelector('summary').click(); await sleep(300);
  var openCount=details.filter(function(x){return x.open;}).length;
  ok('only one panel open', openCount===1, 'open='+openCount);
  other.querySelector('summary').click(); await sleep(200);

  btn.click(); await sleep(250); d.body.click(); await sleep(300);
  ok('click outside closes', details.filter(function(x){return x.open;}).length===0);
  btn.click(); await sleep(250);
  d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true})); await sleep(300);
  ok('Escape closes', details.filter(function(x){return x.open;}).length===0);

  // ---- search across all four languages ---------------------------------
  var inp=d.getElementById('q'), cnt=d.getElementById('count'), em=d.getElementById('empty');
  function vis(){return [].slice.call(d.querySelectorAll('.jp-sent')).filter(function(c){return !c.hasAttribute('hidden');});}
  function type(v){ inp.value=v; inp.dispatchEvent(new w.Event('input',{bubbles:true})); }
  type('ohayo');   ok('search romaji "ohayo" -> 1', vis().length===1, cnt.textContent.trim());
  ok('highlight in romaji line', d.querySelectorAll('.romaji mark').length>0);
  type('\u3053\u308c'); ok('search kanji -> 1', vis().length===1, cnt.textContent.trim());
  ok('highlight in kanji line', d.querySelectorAll('.kanji mark').length>0);
  type('stasiun'); ok('highlight in panel too', d.querySelectorAll('.qpanel mark').length>0);
  ok('search Indonesian -> 1', vis().length===1, cnt.textContent.trim());
  type('station'); ok('search English -> 1', vis().length===1, cnt.textContent.trim());
  type('kore ikura'); ok('multi-word AND -> 1', vis().length===1, cnt.textContent.trim());
  type('zzzz');    ok('empty state shown', vis().length===0 && em.offsetHeight>0, em.textContent.trim().slice(0,26));
  type('');        ok('cleared -> all visible', vis().length===cards.length, 'n='+vis().length);

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
