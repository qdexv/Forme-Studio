import { readFileSync, writeFileSync } from 'node:fs';

const p = 'src/styles.css';
const css = readFileSync(p, 'utf8');

/* ------------------------------------------------------------------ *
 * Token table: [light, dark]. Light values are the literals that
 * already ship, so light mode is unchanged; dark mode re-maps them.
 * ------------------------------------------------------------------ */
const T = {
  surface:        ['#eeece5', '#1a1d1a'],
  surface2:       ['#e9e6de', '#1f2320'],
  surface3:       ['#e3e0d7', '#232722'],
  panel:          ['#f7f5ef', '#171a17'],
  surfaceActive:  ['#efede6', '#242823'],
  objectThumb:    ['#e2dfd6', '#2a2e29'],
  line2:          ['#d3d0c7', '#32362f'],
  line3:          ['#d1d0c7', '#32362f'],
  lineStrong:     ['#adb1a5', '#5a6055'],
  lineStrong2:    ['#b8bcb0', '#5a6055'],
  lineStrong3:    ['#73776b', '#5a6055'],
  ink2:           ['#45483f', '#dcdad0'],
  ink3:           ['#30322d', '#e4e2da'],
  ink4:           ['#3e433a', '#dcdad0'],
  navLink:        ['#4f514a', '#c9ccc2'],
  muted2:         ['#6d7066', '#9a9f93'],
  muted3:         ['#73766d', '#9a9f93'],
  muted4:         ['#72766c', '#9a9f93'],
  muted5:         ['#696c63', '#9a9f93'],
  muted6:         ['#65685e', '#9a9f93'],
  muted7:         ['#7a7d73', '#9a9f93'],
  muted8:         ['#7a7c72', '#9a9f93'],
  muted9:         ['#72756b', '#9a9f93'],
  muted10:        ['#74776e', '#9a9f93'],
  muted11:        ['#6f7369', '#9a9f93'],
  muted12:        ['#7e8178', '#9a9f93'],
  muted13:        ['#6f7268', '#9a9f93'],
  muted14:        ['#6c6f65', '#9a9f93'],
  muted15:        ['#71746a', '#9a9f93'],
  muted16:        ['#73766c', '#9a9f93'],
  muted17:        ['#6e7268', '#9a9f93'],
  muted18:        ['#8c8e84', '#83887c'],
  muted19:        ['#9b9d94', '#83887c'],
  muted20:        ['#85877e', '#83887c'],
  muted21:        ['#8b8c82', '#767b6f'],
  accentSoft:     ['#7c806f', '#9db394'],
  heroEm:         ['#d8d2c2', '#cbd4c6'],
  greenDeep:      ['#26382d', '#37624a'],
  tanDeep:        ['#8b6b4d', '#dcb083'],
  dot:            ['#708b70', '#8ab38d'],
  dot2:           ['#6e916f', '#8ab38d'],
  wish:           ['#7c443e', '#d4897f'],
  formOk:         ['#52604f', '#a3c4a4'],
  swatchRing:     ['#41463c', '#c3c8bb'],
  focus:          ['#526e5a', '#8ab89a'],
  heroFallback:   ['#4b4c42', '#3a3d36'],
  band2:          ['#30352f', '#1d211d'],
  bandLine2:      ['#454a42', '#383d36'],
  bandLine3:      ['#464b43', '#383d36'],
  onDark2:        ['#c9ccc1', '#d6d9cf'],
  onDark3:        ['#e0dfd6', '#d6d9cf'],
  onDark4:        ['#e3e1d9', '#d6d9cf'],
  onDark5:        ['#c3c5bb', '#d6d9cf'],
  onDark6:        ['#dcd9cd', '#d6d9cf'],
  onDark7:        ['#d2d4ca', '#d6d9cf'],
  onDark8:        ['#a7ab9f', '#a9aea2'],
  onDark9:        ['#aeb2a7', '#a9aea2'],
  onDark10:       ['#e2e0d8', '#a9aea2'],
  onDarkLabel:    ['#868b7f', '#8b9084'],
  onDarkLabel2:   ['#7f847a', '#8b9084'],
  onDarkSoft:     ['#8f948a', '#979c90'],
  tanInvert:      ['#dcd5c6', '#e6ddcb'],
  stageDark:      ['#292d28', '#20241f'],
};

/* hex -> token name, for every literal outside :root */
const hexToVar = {};
for (const [name, [light]] of Object.entries(T)) hexToVar[light] = name;
hexToVar['#777970'] = 'muted';
hexToVar['#20211e'] = 'ink';
hexToVar['#eeece5'] = 'surface';
hexToVar['#e9e6de'] = 'surface2';
hexToVar['#e8e5dd'] = 'surface2';
hexToVar['#eae8df'] = 'surface2';
hexToVar['#e9e7df'] = 'surface2';
hexToVar['#e8e5dc'] = 'surface2';
hexToVar['#e4e1d9'] = 'surface';
hexToVar['#ddd'] = 'surface';
hexToVar['#c79a6c'] = 'tan';
hexToVar['#d8d6ce'] = 'line';
hexToVar['#3b4038'] = 'band-line';
hexToVar['#262a25'] = 'band';
hexToVar['#34483b'] = 'green';
hexToVar['#d9d6ce'] = 'line';

/* :root is split off so its literal definitions survive untouched */
const i = css.indexOf(':root{');
const j = css.indexOf('}', i);
let head = css.slice(0, j);
/* the root element itself must follow the theme, not stay hard-light */
head = head.replace('color:#20211e;background:#f5f2eb', 'color:var(--ink);background:var(--paper)');
let body = css.slice(j + 1);

/* 1. role-ambiguous #f5f2eb, resolved by exact declaration context */
const targeted = [
  ['.button-light{background:#f5f2eb;color:#252720}', '.button-light{background:var(--invert-bg);color:var(--invert-text)}'],
  ['.product-tag{position:absolute;top:13px;left:13px;background:#f5f2eb;', '.product-tag{position:absolute;top:13px;left:13px;background:var(--invert-bg);'],
  ['.stage-top button{border:1px solid #d1d0c7;background:#f5f2eb;', '.stage-top button{border:1px solid var(--line3);background:var(--invert-bg);'],
  ['background:#30352f;color:#f5f2eb;', 'background:var(--band2);color:var(--on-dark);'],
  ['background:#262a25;color:#f5f2eb;', 'background:var(--band);color:var(--on-dark);'],
  ['white-space:nowrap;color:#f5f2eb}', 'white-space:nowrap;color:var(--on-dark)}'],
  ['.footer a.footer-mega:hover{color:#f5f2eb}', '.footer a.footer-mega:hover{color:var(--on-dark)}'],
  ['.dark-showroom .stage-top button{background:#363a34;color:#f5f2eb;', '.dark-showroom .stage-top button{background:#363a34;color:var(--on-dark);'],
  /* nav chrome has to follow the theme, so it mixes against --paper */
  ['background:rgba(245,242,235,.96)', 'background:color-mix(in srgb,var(--paper) 96%,transparent)'],
  ['border-bottom:1px solid rgba(32,33,30,.08)', 'border-bottom:1px solid color-mix(in srgb,var(--ink) 8%,transparent)'],
];
for (const [a, b] of targeted) {
  if (!body.includes(a)) throw new Error('targeted miss: ' + a.slice(0, 60));
  body = body.split(a).join(b);
}

/* 2. everything else: one literal -> one token */
for (const [hex, name] of Object.entries(hexToVar)) {
  const re = new RegExp('(?<![0-9a-fA-F])' + hex.replace('#', '#') + '(?![0-9a-fA-F])', 'g');
  body = body.replace(re, 'var(--' + name + ')');
}

/* 3. declare the light values inside :root, then the dark overrides */
const lightDefs = Object.entries(T).map(([n, [l]]) => `--${n}:${l}`).join(';');
const darkDefs = Object.entries(T).map(([n, [, d]]) => `--${n}:${d}`).join(';');
const shared = {
  'on-dark': '#f5f2eb', 'invert-bg': '#f5f2eb', 'invert-text': '#252720',
  'tan': '#c79a6c', 'band-line': '#3b4038', 'band': '#262a25',
};
const sharedDark = {
  'on-dark': '#f5f2eb', 'invert-bg': '#efece2', 'invert-text': '#141714',
  'tan': '#dcb083', 'band-line': '#2e332d', 'band': '#191d19',
};

const out =
  head +
  ';' + Object.entries(shared).map(([k, v]) => `--${k}:${v}`).join(';') +
  ';' + lightDefs + '}' +
  `[data-theme="dark"]{color-scheme:dark;` +
  `--paper:#131613;--ink:#f1efe7;--muted:#a4a99d;--green:#46785a;--line:#32362f;` +
  Object.entries(sharedDark).map(([k, v]) => `--${k}:${v}`).join(';') +
  ';' + darkDefs + '}' +
  body;

writeFileSync(p, out);

const tally = s => {
  const m = [...body.matchAll(/#[0-9a-fA-F]{6}(?![0-9a-fA-F])|#[0-9a-fA-F]{3}(?![0-9a-fA-F])/g)].map(x => x[0]);
  const c = {};
  for (const h of m) c[h] = (c[h] || 0) + 1;
  return Object.entries(c).sort((a, b) => b[1] - a[1]);
};
console.log('rewrite done — remaining hex literals in rules:', tally().length);
console.log(tally().map(([h, n]) => h + '×' + n).join(' '));
const rc = {};
for (const m of body.matchAll(/rgba?\([^)]*\)/g)) rc[m[0]] = (rc[m[0]] || 0) + 1;
console.log('remaining rgba:', Object.keys(rc).length);
console.log(Object.entries(rc).sort((a, b) => b[1] - a[1]).map(([r, n]) => r + '×' + n).join(' | '));
