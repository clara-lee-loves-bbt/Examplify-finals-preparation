/* Validate the exam data: blank markers must line up, answers must exist. */
const fs = require('fs');
const path = require('path');

global.window = global;
require(path.join(__dirname, '..', 'data', 'registry.js'));

const dir = path.join(__dirname, '..', 'data');
for (const f of fs.readdirSync(dir)) {
  if (f === 'registry.js' || !f.endsWith('.js')) continue;
  require(path.join(dir, f));
}

const exams = global.EXAMPLIFY_EXAMS;
let problems = 0;
const fail = (m) => { problems++; console.log('  ✗ ' + m); };

for (const e of exams) {
  console.log(`\n${e.id}  "${e.title}"  — ${e.questions.length} questions, ${e.duration} min`);

  const nos = e.questions.map(q => q.n);
  for (let i = 0; i < nos.length; i++) {
    if (nos[i] !== i + 1) fail(`question numbering: expected ${i + 1}, found ${nos[i]}`);
  }

  let marks = 0, mcq = 0, fib = 0, blanks = 0;
  for (const q of e.questions) {
    marks += q.marks;
    if (!q.stem || !q.stem.length) fail(`Q${q.n}: empty stem`);

    if (q.type === 'mcq') {
      mcq++;
      if (!q.options || q.options.length < 2) fail(`Q${q.n}: fewer than 2 options`);
      const letters = q.options.map(o => o.l);
      const want = Array.from({ length: letters.length }, (_, i) =>
        String.fromCharCode(65 + i));
      if (letters.join('') !== want.join('')) fail(`Q${q.n}: option letters ${letters.join('')} != ${want.join('')}`);
      if (!letters.includes(q.answer)) fail(`Q${q.n}: answer "${q.answer}" is not one of ${letters.join('')}`);
      for (const o of q.options) if (typeof o.t !== 'string' || !o.t.length) fail(`Q${q.n}${o.l}: empty option text`);
    } else if (q.type === 'fib') {
      fib++;
      if (!q.blanks || !q.blanks.length) fail(`Q${q.n}: no blanks`);
      const nums = q.blanks.map(b => b.n);
      for (let i = 0; i < nums.length; i++) if (nums[i] !== i + 1) fail(`Q${q.n}: blank numbering ${nums.join(',')}`);
      blanks += q.blanks.length;
      for (const b of q.blanks) {
        if (!b.freeform && typeof b.answer !== 'string') fail(`Q${q.n} blank ${b.n}: no answer`);
      }
      // accepted alternatives are whole answers: one string per blank
      for (const set of q.accept || []) {
        if (!Array.isArray(set) || set.length !== q.blanks.length || set.some(s => typeof s !== 'string' || !s.trim())) {
          fail(`Q${q.n}: every accept set needs ${q.blanks.length} non-empty answers`);
        }
      }
      // every {{k}} marker in the code must have a matching blank and vice versa
      const markers = [];
      for (const blk of q.stem) {
        if (blk.code) {
          const found = blk.code.match(/\{\{(\d+)\}\}/g) || [];
          for (const m of found) markers.push(Number(m.slice(2, -2)));
        }
        if (blk.p && /\{\{/.test(blk.p)) fail(`Q${q.n}: blank marker inside paragraph text`);
      }
      const used = markers.slice().sort((a, b) => a - b).join(',');
      const declared = nums.join(',');
      if (markers.length === 0) {
        // answer-only question: a single free-standing answer box
        if (q.blanks.length !== 1) fail(`Q${q.n}: ${q.blanks.length} blanks but no {{n}} markers in the stem`);
      } else if (used !== declared) {
        fail(`Q${q.n}: code markers [${used}] != declared blanks [${declared}]`);
      }
      const dupes = markers.filter((v, i) => markers.indexOf(v) !== i);
      if (dupes.length) fail(`Q${q.n}: duplicate marker(s) ${[...new Set(dupes)].join(',')}`);
    } else {
      fail(`Q${q.n}: unknown type "${q.type}"`);
    }
  }
  console.log(`  marks ${marks} · mcq ${mcq} · fib ${fib} · blanks ${blanks}`);
  if (e.sections) {
    for (const s of e.sections) {
      if (s.from < 1 || s.to > e.questions.length) fail(`section "${s.name}" out of range`);
    }
    const covered = e.sections.reduce((a, s) => a + (s.to - s.from + 1), 0);
    if (covered !== e.questions.length) fail(`sections cover ${covered} of ${e.questions.length} questions`);
  }
}

// The mistakes log must point at real questions, with answers shaped like them.
const log = global.EXAMPLIFY_MISTAKES;
if (log) {
  console.log(`\nmistakes log — ${log.items.length} entries, ${(log.patterns || []).length} patterns`);
  const seen = new Set();
  for (const m of log.items) {
    const tag = `mistakes ${m.paper} Q${m.n}`;
    const e = exams.find(x => x.id === m.paper);
    const q = e && e.questions.find(x => x.n === m.n);
    if (!q) { fail(`${tag}: no such question`); continue; }
    if (seen.has(m.paper + ':' + m.n)) fail(`${tag}: listed twice`);
    seen.add(m.paper + ':' + m.n);
    if (!(m.lec >= 1 && m.lec <= 11)) fail(`${tag}: lec must be 1..11`);
    if (m.kind !== 'wrong' && m.kind !== 'skipped') fail(`${tag}: kind must be wrong or skipped`);
    if (!['concept', 'trace', 'blank'].includes(m.type)) fail(`${tag}: type must be concept, trace or blank`);
    if ((m.kind === 'skipped') !== (m.type === 'blank')) fail(`${tag}: skipped questions (and only those) are type blank`);
    for (const k of ['title', 'wrong', 'right', 'rule']) if (!m[k]) fail(`${tag}: missing ${k}`);
    if (m.rule && !/^If\b/.test(m.rule)) fail(`${tag}: rule should start "If …, then …"`);
    for (const b of m.fine || []) {
      if (q.type !== 'fib' || !(b >= 1 && b <= q.blanks.length)) fail(`${tag}: fine blank ${b} does not exist`);
    }
    if (q.scope && (q.scope.level === 'total' || q.scope.level === 'crucial')) fail(`${tag}: question is out of scope`);
    if (m.kind === 'wrong') {
      if (q.type === 'mcq') {
        if (!q.options.some(o => o.l === m.given)) fail(`${tag}: given "${m.given}" is not an option`);
        if (m.given === q.answer) fail(`${tag}: given answer is the correct one`);
      } else if (!Array.isArray(m.given) || m.given.length !== q.blanks.length) {
        fail(`${tag}: given must list one answer per blank (${q.blanks.length})`);
      }
    } else if (m.given != null) fail(`${tag}: a skipped question has no given answer`);
  }
  for (const p of log.patterns || []) {
    for (const r of p.refs || []) if (!seen.has(r)) fail(`mistakes pattern "${p.title}": ref ${r} is not in the log`);
  }
}

console.log(`\n${exams.length} papers, ${problems} problem(s).`);
process.exit(problems ? 1 : 0);
