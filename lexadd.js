#!/usr/bin/env node
/* Adds words to data/lexicon.js. Usage: node lexadd.js new-words.js
 *
 * The tool takes a file that sets window.NEW = { surface: [romaji, glossID, glossEN], ... } and
 * weaves the entries into the kana order the file is kept in. It exists because the same twenty
 * lines of insertion were being rewritten for every topic batch, which is the repetition this
 * was meant to remove rather than add.
 *
 * check.js is the test: it names every surface the sentences use, and reports any that this
 * failed to add.
 */
'use strict';
const fs = require('fs'), path = require('path');
const file = process.argv[2];
if (!file) { console.error('usage: node lexadd.js new-words.js'); process.exit(1); }
global.window = {};
new Function(fs.readFileSync(file, 'utf8'))();
const NEW = window.NEW || {};
const before = fs.readFileSync(path.join(__dirname, 'data/lexicon.js'), 'utf8');
global.window = {};
new Function(before)();
const lex = window.LEX;
let added = 0, replaced = 0;
for (const k of Object.keys(NEW)) { if (lex[k]) replaced++; else added++; delete lex[k]; }
const all = Object.assign({}, lex, NEW);
const keys = Object.keys(all).sort((a, b) => a.localeCompare(b));
const head = before.slice(0, before.indexOf('window.LEX = {') + 'window.LEX = {\n'.length);
const body = keys.map(k => `  ${JSON.stringify(k)}: [${all[k].map(JSON.stringify).join(', ')}],`).join('\n');
fs.writeFileSync(path.join(__dirname, 'data/lexicon.js'), head + body + '\n};\n');
console.log(`${added} added, ${replaced} replaced; ${keys.length} entries, sorted`);
