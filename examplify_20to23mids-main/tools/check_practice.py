#!/usr/bin/env python3
"""Check every question in the on-the-go practice bank.

For each question it confirms the correct answer AND every wrong option:

  output / runnable MCQ
      * the code is run and its output must equal the key;
      * every wrong option must give a different answer (marked the way the
        app marks it, so a wrong option can never be accepted as right);
      * a wrong option labelled with a mutation (mut: 'range-stop:0') is
        re-derived: the code is rewritten the way the trap misreads it, run
        again, and must print exactly that wrong option.
  fill in the blank
      * every accepted answer, substituted into the code, passes the test;
      * every wrong fill fails the test, and a mutation-labelled wrong fill
        must be exactly that mutation of the key answer.
  verify blocks
      * extra asserts (counts, concept checks) must pass.
  concept MCQs (nothing to run)
      * every wrong option must carry a trap and a written reason.

It also checks the structure (ids, trap labels, answers in
practice/answers/*.js for every question in practice/questions/*.js) and
that the code a student sees only uses syntax from lectures 2-11.

Usage:  python tools/check_practice.py            (needs node on PATH to read
        python tools/check_practice.py --write-traps    the .js data files)

--write-traps regenerates practice/answers/traps.js from tools/trapkit.py.
Exit status is 1 if anything fails.
"""

import ast
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import trapkit as T  # noqa: E402

PRACTICE = os.path.join(ROOT, 'practice')

LOADER = r"""
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = process.argv[1];
const sb = {}; sb.window = sb; vm.createContext(sb);
const load = (dir) => {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  const first = files.filter((f) => f === 'registry.js' || f === 'traps.js');
  first.concat(files.filter((f) => first.indexOf(f) < 0).sort())
    .forEach((f) => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sb, { filename: f }));
};
load(path.join(root, 'questions'));
load(path.join(root, 'answers'));
process.stdout.write(JSON.stringify({ q: sb.PRACTICE_QUESTIONS, a: sb.PRACTICE_ANSWERS, t: sb.PRACTICE_TRAPS }));
"""


def load_bank():
    res = subprocess.run(['node', '-e', LOADER, PRACTICE], capture_output=True, text=True, encoding='utf-8')
    if res.returncode:
        sys.exit('Could not read the question files:\n' + res.stderr)
    return json.loads(res.stdout)


def write_traps():
    path = os.path.join(PRACTICE, 'answers', 'traps.js')
    rows = ',\n'.join('  %s: { lec: %s, name: %s, rule: %s }' % (
        json.dumps(k), json.dumps(v[0]), json.dumps(v[1]), json.dumps(v[2])) for k, v in T.TRAPS.items())
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write('/* Trap catalogue: generated from tools/trapkit.py by\n'
                '   `python tools/check_practice.py --write-traps`. Do not edit by hand.\n'
                '   name = the wrong belief a question is built to catch; rule = the\n'
                '   if-then cue shown in the mistake log. */\n'
                'window.PRACTICE_TRAPS = {\n' + rows + '\n};\n')
    print('Wrote', os.path.relpath(path, ROOT), '(%d traps)' % len(T.TRAPS))


# ---------------------------------------------------------------- marking
def norm_code(s):
    """Mirror of normCode() in practice.js."""
    s = str(s).translate(T._QUOTES).replace('"', "'").replace(' ', ' ').strip()
    s = re.sub(r'\s+', ' ', s)
    out = ''
    for i, c in enumerate(s):
        if c == ' ':
            if re.match(r'\w', out[-1:]) and re.match(r'\w', s[i + 1:i + 2]):
                out += ' '
        else:
            out += c
    return re.sub(r';$', '', out)


def fill(code, answers):
    return re.sub(r'\{\{(\d+)\}\}', lambda m: answers[int(m.group(1)) - 1], code)


# ---------------------------------------------------------------- lecture syntax
BUILTINS = {'print', 'len', 'range', 'tuple', 'list', 'dict', 'map', 'filter', 'sum', 'max', 'min', 'abs', 'int',
            'str', 'float', 'type', 'isinstance', 'issubclass', 'super', 'ord', 'chr', 'input', 'id', 'reduce', 'bool'}
METHODS = {'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort',
           'get', 'keys', 'values', 'items'}
DUNDERS = {'__init__', '__str__', '__add__'}
BANNED = {ast.Break: 'break', ast.Continue: 'continue', ast.Try: 'try/except', ast.Raise: 'raise',
          ast.With: 'with', ast.Global: 'global', ast.Nonlocal: 'nonlocal', ast.Assert: 'assert',
          ast.SetComp: 'set comprehension', ast.DictComp: 'dict comprehension', ast.Set: 'set literal',
          ast.Yield: 'yield', ast.Pass: 'pass (the lectures write ...)', ast.NamedExpr: ':='}


def syntax_problems(code, defined=()):
    """Constructs outside the lecture 2-11 syntax, in code a student reads or types."""
    code = re.sub(r'\{\{(\d+)\}\}', r'_blank\1', code)
    try:
        tree = ast.parse(code)
    except SyntaxError:
        try:
            tree = ast.parse(code, mode='eval')
        except SyntaxError:
            return []  # fragments such as "if x % 2 == 0" cannot be parsed alone
    names = set(defined)
    for n in ast.walk(tree):
        if isinstance(n, (ast.FunctionDef, ast.ClassDef)):
            names.add(n.name)
        elif isinstance(n, ast.arg):
            names.add(n.arg)
        elif isinstance(n, ast.Name) and isinstance(n.ctx, ast.Store):
            names.add(n.id)
        elif isinstance(n, ast.Attribute) and isinstance(n.ctx, ast.Store):
            names.add(n.attr)
    bad = set()
    for n in ast.walk(tree):
        for cls, label in BANNED.items():
            if isinstance(n, cls):
                bad.add(label)
        if isinstance(n, ast.FunctionDef):
            if n.name.startswith('__') and n.name not in DUNDERS:
                bad.add('magic method ' + n.name)
            if n.args.defaults or n.args.kw_defaults or n.args.vararg or n.args.kwarg:
                bad.add('default / variadic parameters')
            if n.decorator_list:
                bad.add('decorator')
        if isinstance(n, ast.Call):
            f = n.func
            if isinstance(f, ast.Name) and f.id not in BUILTINS and f.id not in names and not f.id.startswith('_blank'):
                bad.add(f.id + '()')
            if isinstance(f, ast.Attribute) and f.attr not in METHODS and f.attr not in names and f.attr not in DUNDERS:
                bad.add('.' + f.attr + '()')
            for kw in n.keywords:
                if kw.arg != 'end':
                    bad.add('keyword argument %s=' % kw.arg)
        if isinstance(n, (ast.Import, ast.ImportFrom)):
            mod = getattr(n, 'module', None)
            got = [a.name for a in n.names]
            if not ((mod == 'functools' and got == ['reduce']) or (mod == 'math' and set(got) <= {'pi'})):
                bad.add('import ' + ', '.join(got))
        if isinstance(n, ast.BinOp) and isinstance(n.op, (ast.BitAnd, ast.BitOr, ast.BitXor, ast.LShift, ast.RShift, ast.MatMult)):
            bad.add('bitwise operator')
        if isinstance(n, (ast.For, ast.While)) and n.orelse:
            bad.add('loop else')
        if isinstance(n, ast.FormattedValue) and n.format_spec:
            bad.add('f-string format spec')
        if isinstance(n, ast.Lambda) and n.args.defaults:
            bad.add('lambda default')
    return sorted(bad)


# ---------------------------------------------------------------- the check
class Checker:
    def __init__(self, bank):
        self.qs = bank['q']
        self.ans = bank['a'] or {}
        self.traps_js = bank['t'] or {}
        self.problems = []
        self.counts = {'runs': 0, 'right': 0, 'wrong': 0, 'mutations': 0, 'concept': 0}

    def bad(self, qid, msg):
        self.problems.append('%s: %s' % (qid, msg))

    def run(self, runner, code):
        self.counts['runs'] += 1
        return runner.run(code)

    def check_structure(self):
        for k, v in T.TRAPS.items():
            js = self.traps_js.get(k)
            if not js or js['name'] != v[1] or js['rule'] != v[2]:
                self.bad('traps.js', 'out of date for %r (run with --write-traps)' % k)
        ids = set()
        for q in self.qs:
            qid = q.get('id', '?')
            if qid in ids:
                self.bad(qid, 'duplicate id')
            ids.add(qid)
            if not (1 <= q.get('lec', 0) <= 11) or not qid.startswith('L%d-' % q.get('lec', 0)):
                self.bad(qid, 'bad lec / id')
            if q.get('d') not in (1, 2, 3) or not q.get('t') or not q.get('topic'):
                self.bad(qid, 'needs d, t and topic')
            for k in ('ans', 'alts', 'opts', 'blanks', 'test', 'verify', 'exp', 'wrong'):
                if k in q:
                    self.bad(qid, '%r belongs in practice/answers, not the question file' % k)
            a = self.ans.get(qid)
            if not a:
                self.bad(qid, 'no entry in practice/answers')
                continue
            if a.get('trap') not in T.TRAPS:
                self.bad(qid, 'question trap %r is not in the catalogue' % a.get('trap'))
            if not a.get('exp'):
                self.bad(qid, 'missing explanation')
            wrong = a.get('wrong') or []
            for w in wrong:
                if w.get('trap') not in T.TRAPS:
                    self.bad(qid, 'wrong option %r has unknown trap %r' % (w.get('a'), w.get('trap')))
                if 'a' not in w:
                    self.bad(qid, 'wrong option without text')
            t = q.get('type')
            if t == 'mcq':
                if not isinstance(a.get('ans'), str) or len(wrong) < 2:
                    self.bad(qid, 'mcq needs ans text and at least 2 wrong options')
                texts = [a.get('ans')] + [w.get('a') for w in wrong]
                if len(set(texts)) != len(texts):
                    self.bad(qid, 'duplicate options')
            elif t == 'out':
                if not isinstance(a.get('ans'), str) or not a['ans']:
                    self.bad(qid, 'out needs ans')
                if len(wrong) < 2:
                    self.bad(qid, 'out needs at least 2 wrong answers (used by Choose mode and trap matching)')
            elif t == 'fib':
                marks = [int(m) for m in re.findall(r'\{\{(\d+)\}\}', q.get('code', ''))]
                blanks = a.get('blanks') or []
                if marks != list(range(1, len(blanks) + 1)) or not blanks:
                    self.bad(qid, 'markers %s do not match %d blanks' % (marks, len(blanks)))
                if not a.get('test'):
                    self.bad(qid, 'fib needs test')
                if not wrong:
                    self.bad(qid, 'fib needs at least one labelled wrong fill')
                for w in wrong:
                    if not (1 <= w.get('b', 0) <= len(blanks)):
                        self.bad(qid, 'wrong fill %r has no valid blank number' % w.get('a'))
            else:
                self.bad(qid, 'unknown type %r' % t)
        for qid in self.ans:
            if qid not in ids:
                self.bad(qid, 'answer entry has no question')

    def check_syntax(self):
        for q in self.qs:
            a = self.ans.get(q['id'], {})
            defined = set()
            if q.get('code'):
                p = syntax_problems(q['code'], re.findall(r'`(\w+)', q.get('q', '')))
                if p:
                    self.bad(q['id'], 'code uses non-lecture syntax: ' + ', '.join(p))
                # A blank or option may call any name the question's own code mentions.
                # (and any function the prompt tells you to assume, e.g. the lecture's merge).
                defined = set(re.findall(r'[A-Za-z_]\w*', q['code'] + ' ' + q.get('q', '')))
            if q.get('optCode'):
                for o in [a.get('ans')] + [w.get('a') for w in a.get('wrong', [])]:
                    if o and syntax_problems(o):
                        self.bad(q['id'], 'option %r uses non-lecture syntax' % o)
            for b in a.get('blanks', []):
                for alt in b:
                    p = syntax_problems(alt, defined)
                    if p:
                        self.bad(q['id'], 'accepted answer %r uses non-lecture syntax: %s' % (alt, ', '.join(p)))
            for w in a.get('wrong', []):
                if q['type'] == 'fib':
                    p = syntax_problems(w['a'], defined)
                    if p:
                        self.bad(q['id'], 'wrong fill %r uses non-lecture syntax: %s' % (w['a'], ', '.join(p)))

    def check_answers(self, runner):
        for q in self.qs:
            a = self.ans.get(q['id'])
            if not a:
                continue
            qid, t, code = q['id'], q['type'], q.get('code') or ''
            wrong = a.get('wrong') or []
            if t == 'out' and a.get('verify'):
                # The answer is a count or a fact proven by the verify block below;
                # the wrong options only need to differ from it.
                for w in wrong:
                    if T.same_out(a['ans'], w['a']):
                        self.bad(qid, 'wrong option %r equals the answer' % w['a'])
                    elif not w.get('why') and not w.get('mut'):
                        self.bad(qid, 'wrong option %r needs a why' % w['a'])
                    else:
                        self.counts['wrong'] += 1
            elif t == 'out' or t == 'mcq' and a.get('run'):
                out, err = self.run(runner, code)
                truth = T.outcome(out, err)
                keys = [a['ans']] + (a.get('alts') or [])
                if not any(T.same_out(truth, k) for k in keys):
                    self.bad(qid, 'key %r but the code gives %r' % (a['ans'], truth))
                else:
                    self.counts['right'] += 1
                for w in wrong:
                    if T.same_out(truth, w['a']):
                        self.bad(qid, 'wrong option %r is actually the right answer' % w['a'])
                        continue
                    if w.get('mut'):
                        m = T.apply_mutation(code, w['mut'])
                        if m is None:
                            self.bad(qid, 'mutation %s does not apply' % w['mut'])
                            continue
                        mo, me = self.run(runner, m)
                        if not T.same_out(T.outcome(mo, me), w['a']):
                            self.bad(qid, 'trap %s gives %r, not the wrong option %r' % (w['mut'], T.outcome(mo, me), w['a']))
                            continue
                        self.counts['mutations'] += 1
                    self.counts['wrong'] += 1
            elif t == 'fib':
                blanks = a.get('blanks') or []
                base = [b[0] for b in blanks]
                for bi, alts in enumerate(blanks):
                    for alt in alts:
                        answers = base[:]
                        answers[bi] = alt
                        _, err = self.run(runner, fill(code, answers) + '\n' + a['test'])
                        if err:
                            self.bad(qid, 'accepted answer %r for blank %d fails the test (%s)' % (alt, bi + 1, err))
                self.counts['right'] += 1
                for w in wrong:
                    bi = w['b'] - 1
                    if any(norm_code(w['a']) == norm_code(x) for x in blanks[bi]):
                        self.bad(qid, 'wrong fill %r is an accepted answer' % w['a'])
                        continue
                    if w.get('mut'):
                        try:
                            ast.parse(base[bi], mode='eval')
                            mode = 'eval'
                        except SyntaxError:
                            mode = 'exec'
                        m = T.apply_mutation(base[bi], w['mut'], mode)
                        if m is None or norm_code(m) != norm_code(w['a']):
                            self.bad(qid, 'mutation %s of %r gives %r, not %r' % (w['mut'], base[bi], m, w['a']))
                            continue
                        self.counts['mutations'] += 1
                    answers = base[:]
                    answers[bi] = w['a']
                    _, err = self.run(runner, fill(code, answers) + '\n' + a['test'])
                    if err is None:
                        self.bad(qid, 'wrong fill %r for blank %d passes the test' % (w['a'], w['b']))
                    else:
                        self.counts['wrong'] += 1
            elif t == 'mcq' and not a.get('verify'):
                self.counts['concept'] += 1
                for w in wrong:
                    if not w.get('why'):
                        self.bad(qid, 'concept option %r needs a why' % w['a'])
                    else:
                        self.counts['wrong'] += 1
            elif t == 'mcq':
                for w in wrong:
                    if not w.get('why'):
                        self.bad(qid, 'option %r needs a why' % w['a'])
                    else:
                        self.counts['wrong'] += 1
            if a.get('verify'):
                _, err = self.run(runner, ('' if a.get('verifyOnly') else code + '\n') + a['verify'])
                if err:
                    self.bad(qid, 'verify block fails (%s)' % err)
                elif t == 'mcq' or t == 'out':
                    self.counts['right'] += 1


def main():
    if '--write-traps' in sys.argv:
        write_traps()
    bank = load_bank()
    c = Checker(bank)
    c.check_structure()
    c.check_syntax()
    with T.Runner(timeout=3.0) as runner:
        c.check_answers(runner)
    by_type = {}
    for q in c.qs:
        by_type[q['type']] = by_type.get(q['type'], 0) + 1
    n = c.counts
    print('%d questions %s' % (len(c.qs), json.dumps(by_type)))
    print('%d Python runs: %d keys confirmed, %d wrong options confirmed wrong '
          '(%d re-derived from their trap), %d concept-only questions' % (
              n['runs'], n['right'], n['wrong'], n['mutations'], n['concept']))
    if c.problems:
        print('\n%d problem(s):' % len(c.problems))
        for p in c.problems:
            print('  x ' + p)
        sys.exit(1)
    print('All questions OK.')


if __name__ == '__main__':
    main()
