"""Runs the Python checks produced by tools/verify-practice.js.

Reads a JSON list of tasks and prints a JSON list of results. Each task runs
in a fresh namespace with stdout captured. `OUT()` returns what has been
printed so far, for tests that check printed output.

Output of a run = printed lines with trailing spaces removed, plus the
exception's class name as a final line if one was raised.
"""

import contextlib
import io
import json
import sys


def run(code):
    buf = io.StringIO()
    ns = {'__name__': '__main__', 'OUT': buf.getvalue}
    err = None
    with contextlib.redirect_stdout(buf):
        try:
            exec(compile(code, '<question>', 'exec'), ns)
        except BaseException as e:  # noqa: BLE001 - we report every failure
            err = e
    lines = [ln.rstrip() for ln in buf.getvalue().rstrip('\n').split('\n')]
    out = '\n'.join(lines).strip('\n')
    return out, err


def norm(s):
    return '\n'.join(ln.rstrip() for ln in s.strip('\n').split('\n')).strip()


def outcome(out, err):
    if err is None:
        return out
    return (out + '\n' if out else '') + type(err).__name__


def main():
    tasks = json.load(open(sys.argv[1], encoding='utf-8'))
    results = []
    for t in tasks:
        out, err = run(t['code'])
        got = norm(outcome(out, err))
        if t['kind'] == 'run':
            ok = err is None
            msg = '' if ok else f'{type(err).__name__}: {err}'
        else:
            want = norm(t['expect'])
            ok = got == want
            msg = '' if ok else f'expected {want!r}, got {got!r}'
            if ok and t['kind'] == 'mcq':
                clash = [o for o in t['others'] if norm(o) == got]
                if clash:
                    ok, msg = False, f'another option also matches: {clash!r}'
        results.append({'id': t['id'], 'ok': ok, 'msg': msg})
    json.dump(results, sys.stdout)


if __name__ == '__main__':
    main()
