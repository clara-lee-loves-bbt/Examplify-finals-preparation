#!/usr/bin/env node
/* Checks the on-the-go practice bank (practice/questions/*.js).

   1. Structure: unique ids, valid lecture / type / difficulty, MCQ keys in
      range, {{n}} markers matching the declared blanks.
   2. Answers: every question that can be executed is run through Python
      (tools/verify_practice.py):
        out       code is run and its output must equal `ans`
        mcq+run   code is run and its output must equal opts[ans] and no
                  other option
        fib       every accepted answer is substituted (one at a time, with
                  the first answer in every other blank) and `test` must pass
        verify    extra asserts run after the code (or alone with verifyOnly)

   Usage:  node tools/verify-practice.js        (needs `python` on PATH) */

const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const qdir = path.join(root, 'practice', 'questions');

const sandbox = {};
sandbox.window = sandbox; // like a browser, window.* is also a global
vm.createContext(sandbox);
const files = ['registry.js'].concat(
  fs.readdirSync(qdir).filter((f) => f.endsWith('.js') && f !== 'registry.js').sort()
);
files.forEach((f) => vm.runInContext(fs.readFileSync(path.join(qdir, f), 'utf8'), sandbox, { filename: f }));
const qs = sandbox.window.PRACTICE_QUESTIONS;

const problems = [];
const bad = (q, msg) => problems.push((q && q.id ? q.id : '?') + ': ' + msg);

/* ---------- structure ---------- */
const ids = new Set();
qs.forEach((q) => {
  if (!q.id) bad(q, 'missing id');
  if (ids.has(q.id)) bad(q, 'duplicate id');
  ids.add(q.id);
  if (!(q.lec >= 1 && q.lec <= 11)) bad(q, 'lec must be 1..11');
  if (q.id && !q.id.startsWith('L' + q.lec + '-')) bad(q, 'id does not match lec');
  if (![1, 2, 3].includes(q.d)) bad(q, 'd must be 1, 2 or 3');
  if (!q.t) bad(q, 'missing title t');
  if (!q.topic) bad(q, 'missing topic');
  if (!q.exp) bad(q, 'missing explanation');
  if (q.type === 'mcq') {
    if (!Array.isArray(q.opts) || q.opts.length < 2) bad(q, 'mcq needs opts');
    else if (!(q.ans >= 0 && q.ans < q.opts.length)) bad(q, 'mcq ans out of range');
    else if (new Set(q.opts).size !== q.opts.length) bad(q, 'duplicate options');
  } else if (q.type === 'out') {
    if (typeof q.ans !== 'string' || !q.ans.length) bad(q, 'out needs string ans');
    if (!q.code && !q.verify) bad(q, 'out needs code or verify');
  } else if (q.type === 'fib') {
    const marks = (q.code.match(/\{\{(\d+)\}\}/g) || []).map((m) => +m.slice(2, -2));
    if (!Array.isArray(q.blanks) || !q.blanks.length) bad(q, 'fib needs blanks');
    else {
      const want = q.blanks.map((_, i) => i + 1);
      if (marks.join() !== want.join()) bad(q, 'markers ' + marks + ' do not match blanks ' + want);
      q.blanks.forEach((b, i) => { if (!Array.isArray(b) || !b.length) bad(q, 'blank ' + (i + 1) + ' needs answers'); });
    }
    if (!q.test) bad(q, 'fib needs test');
  } else bad(q, 'unknown type ' + q.type);
});

/* ---------- execution tasks ---------- */
const tasks = [];
const fill = (code, answers) => code.replace(/\{\{(\d+)\}\}/g, (_, n) => answers[n - 1]);
qs.forEach((q) => {
  const code = q.code || '';
  // An 'out' question whose answer is a count (not printed output) proves it in `verify`.
  if (q.type === 'out' && !q.verify && q.code) {
    tasks.push({ id: q.id, kind: 'out', code, expect: q.ans });
  }
  if (q.type === 'mcq' && q.run) {
    tasks.push({ id: q.id, kind: 'mcq', code, expect: q.opts[q.ans], others: q.opts.filter((_, i) => i !== q.ans) });
  }
  if (q.type === 'fib' && Array.isArray(q.blanks)) {
    const base = q.blanks.map((b) => b[0]);
    q.blanks.forEach((alts, bi) => alts.forEach((alt, ai) => {
      if (bi > 0 && ai === 0) return; // same as the base combination
      const answers = base.slice();
      answers[bi] = alt;
      tasks.push({ id: q.id + ' blank ' + (bi + 1) + ' = ' + JSON.stringify(alt), kind: 'run', code: fill(code, answers) + '\n' + q.test });
    }));
  }
  if (q.verify) {
    tasks.push({ id: q.id + ' verify', kind: 'run', code: (q.verifyOnly ? '' : code + '\n') + q.verify });
  }
});

const tmp = path.join(os.tmpdir(), 'practice-verify-' + process.pid + '.json');
fs.writeFileSync(tmp, JSON.stringify(tasks));
const res = spawnSync('python', ['-I', path.join(__dirname, 'verify_practice.py'), tmp], { encoding: 'utf8', timeout: 120000 });
fs.unlinkSync(tmp);
if (res.status !== 0 && !res.stdout) {
  console.error(res.stderr || res.error);
  process.exit(2);
}
const results = JSON.parse(res.stdout);
results.forEach((r) => { if (!r.ok) problems.push(r.id + ': ' + r.msg); });

const by = {};
qs.forEach((q) => { by[q.lec] = (by[q.lec] || 0) + 1; });
const types = {};
qs.forEach((q) => { types[q.type] = (types[q.type] || 0) + 1; });
console.log(qs.length + ' questions — per lecture ' + JSON.stringify(by) + ' — types ' + JSON.stringify(types));
console.log(tasks.length + ' Python checks run');
if (problems.length) {
  console.log('\n' + problems.length + ' problem(s):');
  problems.forEach((p) => console.log('  ✗ ' + p));
  process.exit(1);
}
console.log('All questions OK.');
