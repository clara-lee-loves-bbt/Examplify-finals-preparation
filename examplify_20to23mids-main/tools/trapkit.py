"""Trap catalogue, mutation operators and a sandboxed runner for the
on-the-go practice bank.

A *trap* is a specific wrong belief about Python as taught in CS1010E
lectures 2-11 (e.g. "range includes its stop value"). Most traps can be
written as a *mutation* of the code: rewrite the program the way a student
holding that belief would read it, run it, and you get exactly the wrong
answer that belief produces.

The checker (tools/check_practice.py) uses this module to prove that each
wrong option labelled with a mutation really is the output of that trap,
and that every wrong option differs from the real answer.

    mutants(code)            -> [(trap_id, site, mutated_code), ...]
    apply_mutation(code, m)  -> mutated code for 'trap_id:site'
    run(code)                -> (output, error_name or None)
    norm_out(s), same_out(a, b)  mirror the app's output marking
"""

import ast
import contextlib
import copy
import io
import re
import sys

# --------------------------------------------------------------------------
# Trap catalogue. `name` is shown to the student; `rule` is the if-then cue
# shown in the mistake log. Lectures name where the idea is taught.
# --------------------------------------------------------------------------
TRAPS = {
    'range-stop':      ('L3', 'range stops before its stop value',
                        'If you see range(a, b), then the last value is b - 1, never b.'),
    'range-zero':      ('L3', 'range(n) starts at 0',
                        'If range has one argument, then it counts 0, 1, ..., n - 1.'),
    'slice-stop':      ('L3', 'a slice stops before its stop index',
                        'If you see s[a:b], then you get indices a to b - 1.'),
    'slice-step':      ('L3', 'a negative step walks right to left',
                        'If the step is negative, then start must be right of stop, or the slice is empty.'),
    'slice-copy':      ('L6', 'slicing and .copy() build a new list',
                        'If you see L[:] or L.copy(), then the result is a different list object.'),
    'true-div':        ('L2', '// is floor (integer) division',
                        'If you see //, then the result is floored: 7 // 2 is 3, -7 // 2 is -4.'),
    'int-div':         ('L2', '/ always gives a float',
                        'If you see /, then the answer is a float, even 6 / 3 == 2.0.'),
    'floor-neg':       ('L2', '// floors toward negative infinity',
                        'If an operand of // is negative, then round down, not toward zero.'),
    'mod-sign':        ('L2', '% takes the sign of the divisor',
                        'If you see a % b with b > 0, then the answer is between 0 and b - 1.'),
    'pow-assoc':       ('L2', '** is right-associative',
                        'If you see a ** b ** c, then work out b ** c first.'),
    'neg-pow':         ('L2', '** binds tighter than unary minus',
                        'If you see -a ** b, then it means -(a ** b).'),
    'precedence':      ('L2', '* / // % bind tighter than + -',
                        'If an expression mixes + and *, then do the * first unless brackets say otherwise.'),
    'alias':           ('L6', '= on a list makes an alias, not a copy',
                        'If two names are assigned b = a, then mutating one shows through the other.'),
    'shallow-copy':    ('L7', '.copy() and [:] are shallow',
                        'If a list holds lists, then a copy still shares the inner lists.'),
    'list-repeat':     ('L9', '[row] * n repeats one row object',
                        'If you see [[0] * c] * r, then all r rows are the same list.'),
    'iadd-inplace':    ('L7', '+= on a list mutates it in place',
                        'If you see L += [x], then every alias of L sees the change; L = L + [x] makes a new list.'),
    'andor-value':     ('L2', 'and / or return an operand, not True/False',
                        'If you see x or y, then the value is x when x is truthy, otherwise y.'),
    'short-circuit':   ('L2', 'and / or stop as soon as the answer is known',
                        'If the left of `and` is falsy (or the left of `or` is truthy), then the right side never runs.'),
    'print-end':       ('L4', 'end= replaces the newline',
                        'If print has end=..., then the next print continues on the same line.'),
    'boundary':        ('L4', '< versus <= at the boundary',
                        'If a loop or test compares with <, then check the last value by hand: is it included?'),
    'elif-chain':      ('L4', 'only the first true branch of if / elif runs',
                        'If branches are elif, then at most one runs; separate ifs can all run.'),
    'is-identity':     ('L6', 'is checks identity, == checks value',
                        'If you see is, then ask "same object?", not "same value?".'),
    'dict-in':         ('L8', 'in on a dict checks keys',
                        'If you see x in d, then only the keys are searched, never the values.'),
    'pop-end':         ('L7', 'pop() removes the last item',
                        'If pop has no argument, then it removes and returns L[-1].'),
    'append-extend':   ('L7', 'append adds one item; extend adds each item',
                        'If you see L.append(M), then M goes in as a single element.'),
    'reduce-init':     ('L3', "reduce's initializer is the first accumulator",
                        'If reduce has a third argument, then the first call is f(init, first item).'),
    'iter-once':       ('L3', 'map / filter results are used up after one pass',
                        'If a map or filter object is looped over twice, then the second pass is empty.'),
    'none-return':     ('L7', 'list methods mutate and return None',
                        'If you see x = L.sort() (or append, extend, reverse), then x is None.'),
    'chain-cmp':       ('L2', 'comparisons chain: a < b < c',
                        'If you see a < b < c, then it means a < b and b < c.'),
    'int-trunc':       ('L2', 'int() truncates toward zero',
                        'If you see int(x) on a float, then the decimals are dropped, not rounded.'),
    'override':        ('L11', 'a subclass method overrides the superclass one',
                        'If the subclass defines the method, then its version runs, even when called from inherited code.'),
    'super-init':      ('L11', 'super().__init__ sets the inherited attributes',
                        'If a subclass __init__ skips super().__init__, then the parent attributes never exist.'),
    'pass-by-ref':     ('L6', 'a function receives the same list object',
                        'If a function mutates its list parameter, then the caller sees the change.'),
    'tuple-comma':     ('L3', 'the comma makes a tuple, not the brackets',
                        'If you see (x), then it is just x; (x,) is a one-element tuple.'),
    'last-index':      ('L3', 'the last index is len(L) - 1',
                        'If you need the last element by position, then use len(L) - 1 or -1.'),
    'return-in-loop':  ('L4', 'return inside a loop ends the function at once',
                        'If return is indented inside the loop, then the loop never gets a second pass.'),
    'acc-reset':       ('L4', 'where the accumulator is reset',
                        'If an accumulator is set inside the outer loop, then it restarts every pass.'),
    'local-scope':     ('L2', 'assigning inside a function makes a local variable',
                        'If a function assigns to a name, then the global with that name is untouched.'),
    'off-by-one':      ('L4', 'off by one',
                        'If an index or bound is involved, then test the first and last case by hand.'),
    'base-case':       ('L5', 'the base case value',
                        'If the recursion bottoms out, then check what the base case returns for the smallest input.'),
    'rec-order':       ('L5', 'work done on the way down vs on the way back up',
                        'If code comes after the recursive call, then it runs during unwinding, in reverse order.'),
    'missing-return':  ('L4', 'a function without return gives None',
                        'If a function only prints, then the call itself evaluates to None.'),
    'mutate-vs-new':   ('L7', 'mutating the list versus building a new one',
                        'If the task says "return a new list", then never mutate the parameter.'),
    'wrong-var':       ('L4', 'the wrong variable or index',
                        'If two similar names are in play, then trace which one each line updates.'),
    'str-compare':     ('L3', 'strings compare character by character',
                        "If you compare strings, then compare the first differing character's code; 'Z' < 'a'."),
    'type-error':      ('L3', 'the operation is not allowed for that type',
                        'If you mix types or mutate an immutable value, then expect a TypeError.'),
    'key-error':       ('L8', 'looking up a missing key raises KeyError',
                        'If a key may be missing, then use d.get(k, default) or check k in d first.'),
    'index-error':     ('L3', 'indexing past the end raises IndexError (slicing never does)',
                        'If you index, then the index must exist; if you slice, then it never raises.'),
    'unhashable':      ('L8', 'dictionary keys must be immutable',
                        'If you need a list as a key, then convert it to a tuple first.'),
    'cond-expr':       ('L2', 'a conditional expression evaluates only one branch',
                        'If you see a if c else b, then check c first; the other branch never runs.'),
    'and-or-logic':    ('L2', 'and needs both sides; or needs either',
                        'If both conditions must hold, then join them with and; or is True when either holds.'),
    'not-precedence':  ('L2', 'not binds looser than comparisons',
                        'If you see not a == b, then it means not (a == b).'),
    'syntax':          ('L2', 'the code is not valid Python',
                        'If a line looks like English shorthand (x and <= 10), then each side must be a full expression.'),
    'decl-imp':        ('L4', 'declarative expressions vs imperative statements',
                        'If code changes variables step by step, then it is imperative; a single expression is declarative.'),
    'seq-repeat':      ('L3', '* on a sequence repeats the whole sequence',
                        'If you see a tuple or string times n, then the sequence is repeated n times; elements are not multiplied.'),
    'char-code':       ('L3', 'a digit character is not its number',
                        "If you see ord('7'), then it is 55; ord(c) - ord('0') turns a digit character into its value."),
    'filter-keeps':    ('L3', 'filter keeps the passing items, unchanged and in order',
                        'If you see filter(f, xs), then the result is the items of xs for which f is truthy, in their original order.'),
    'reduce-order':    ('L3', 'reduce folds from the left',
                        'If you trace reduce(f, (a, b, c), init), then compute f(f(f(init, a), b), c).'),
    'range-step':      ('L3', 'range(a, b, s) jumps by s',
                        'If range has a step, then list a, a + s, a + 2s, ... while still before b.'),
    'hof-trace':       ('L3', 'tracing functions that take or return functions',
                        'If a function returns a lambda, then substitute one call at a time: twice(f)(x) is f(f(x)).'),
    'operator-choice': ('L2', 'the wrong operator',
                        'If the maths says x to the power i, then write x ** i; * multiplies and + adds.'),
    'truthiness':      ('L2', '0, empty and None are falsy; everything else is truthy',
                        'If a condition is a number or a sequence, then 0 and empty count as False.'),
    'in-sequence':     ('L3', 'in on a tuple checks elements; on a string it checks substrings',
                        'If you see x in some_tuple, then x must equal one element; only strings match runs of characters.'),
    'late-binding':    ('L3', 'a lambda reads its variables when it is called',
                        'If a lambda uses a loop variable, then it sees the value at call time, not when the lambda was made.'),
    'wraparound':      ('L3', 'wrapping around with %',
                        "If values must wrap (z to a), then shift to 0-based, add, take % n, then shift back."),
    'state-trace':     ('L4', 'each statement uses the newest values',
                        'If you trace assignments, then update one variable at a time, in order, using the values so far.'),
    'fstring':         ('L4', 'an f-string replaces each {expression} with its value',
                        'If a string starts with f, then every {expr} inside it is evaluated and printed as its value.'),
    'loop-var':        ('L4', 'for gives the loop variable a fresh value each pass',
                        'If the body changes the loop variable, then the next pass still takes the next value from range.'),
    'input-str':       ('L4', 'input() always returns a string',
                        'If you read with input(), then convert it; int() needs digits only, float() accepts a decimal point.'),
    'print-placement': ('L4', 'where print sits decides how often it runs',
                        'If print is after the loop (not indented into it), then it runs once, with the final value.'),
    'rec-trace':       ('L5', 'trace a recursion all the way down and back up',
                        'If a function calls itself, then expand each call to the base case, then combine on the way back.'),
    'call-stack':      ('L5', 'every call gets its own frame on the stack',
                        'If a function calls itself, then each waiting call keeps its own frame and its own n until it returns.'),
    'comp-order':      ('L6', 'a comprehension filters with if, then applies the expression',
                        'If you see [expr for x in xs if cond], then keep the x where cond holds and give expr for each.'),
    'mutability':      ('L6', 'lists and dicts are mutable; int, float, str and tuple are not',
                        'If something must change in place, then it has to be a list or dict; the others make a new object.'),
    'insert-pos':      ('L7', 'insert(i, x) puts x before position i',
                        'If you see L.insert(-1, x), then x goes before the last item, not at the end.'),
    'remove-value':    ('L7', 'remove takes a value, not an index, and raises ValueError if it is missing',
                        'If you see L.remove(v), then v is a value; a missing value raises ValueError.'),
    'mutate-while-iter': ('L7', 'removing from a list while looping over it skips items',
                        'If you remove from the list you are looping over, then the next item slides into the gap and is skipped.'),
    'dict-dup':        ('L8', 'a repeated key keeps one entry, with the last value',
                        'If a dict literal repeats a key, then only one entry exists and it holds the last value.'),
    'memo-cond':       ('L8', 'memoisation needs fixed answers and repeated calls',
                        'If a function depends on changing outside state, or never repeats a call, then memoisation is wrong or useless.'),
    'dict-iter':       ('L8', 'looping over a dict, or max/min/sum of it, uses the keys',
                        'If a dict is used where a sequence is expected, then it works on the keys; use .values() for values.'),
    'dict-order':      ('L8', 'a dict keeps insertion order; updating a value keeps its place',
                        'If a key is deleted and added again, then it goes to the end; updating an existing key keeps its position.'),
    'array-cost':      ('L9', 'only indexing, append, pop() and len are constant time',
                        'If an operation shifts or copies elements (insert or delete near the front, slicing, remove), then its time grows with the list.'),
    'bsearch-trace':   ('L10', 'binary search moves low or high past mid',
                        'If val > L[mid], then low = mid + 1; if val < L[mid], then high = mid - 1; then recompute mid = (low + high) // 2.'),
    'bsearch-sorted':  ('L10', 'binary search needs a sorted list',
                        'If the list is not sorted, then throwing away half after one comparison can throw away the answer.'),
    'complexity':      ('L10', 'halving gives log N; one full scan gives N; a scan inside a scan gives N squared',
                        'If each step halves the work, then count halvings (log N); if a loop runs inside a loop over N, then multiply.'),
    'oop-self':        ('L11', 'self is the object the method was called on',
                        'If a method sets self.x, then it changes that object; every method needs self as its first parameter.'),
    'str-dunder':      ('L11', 'print and str() use __str__',
                        'If a class defines __str__, then print shows its return value; without it you get <... object at 0x...>.'),
    'dunder-add':      ('L11', '+ on objects calls __add__',
                        'If a class defines __add__, then a + b means a.__add__(b) and gives whatever it returns.'),
    'isinstance-up':   ('L11', 'a subclass object is also an instance of its superclass, not the reverse',
                        'If B inherits from A, then a B is an A, but an A is not a B.'),
    'polymorphism':    ('L11', 'polymorphism: one call, a different method per class',
                        "If you call obj.speak(), then the version in obj's own class runs."),
    'concept':         ('—', 'concept from the lecture',
                        'If unsure, then go back to the lecture slide for this topic.'),
}


def trap_name(tid):
    return TRAPS[tid][1]


# --------------------------------------------------------------------------
# Running code
# --------------------------------------------------------------------------
class _StepLimit(Exception):
    pass


def run(code, step_limit=400_000, extra=None):
    """Run code in a fresh namespace. Returns (printed_output, error_name)."""
    buf = io.StringIO()
    ns = {'__name__': '__main__', 'OUT': buf.getvalue}
    ns.update(HELPERS_NS)
    if extra:
        ns.update(extra)
    steps = [0]

    def tracer(frame, event, arg):
        if event == 'line':
            steps[0] += 1
            if steps[0] > step_limit:
                raise _StepLimit()
        return tracer

    err = None
    old_limit = sys.getrecursionlimit()
    sys.setrecursionlimit(3000)
    try:
        compiled = compile(code, '<question>', 'exec')
        with contextlib.redirect_stdout(buf):
            sys.settrace(tracer)
            try:
                exec(compiled, ns)
            finally:
                sys.settrace(None)
    except _StepLimit:
        err = 'Timeout'
    except RecursionError:
        err = 'RecursionError'
    except SyntaxError:
        err = 'SyntaxError'
    except BaseException as e:  # noqa: BLE001 - every failure is a result here
        err = type(e).__name__
    finally:
        sys.setrecursionlimit(old_limit)
    out = '\n'.join(ln.rstrip() for ln in buf.getvalue().rstrip('\n').split('\n')).strip('\n')
    return out, err


def _worker(tasks, results):
    while True:
        item = tasks.get()
        if item is None:
            return
        i, code = item
        results.put((i, run(code)))


class Runner:
    """Runs code in a worker process so a runaway mutant (huge integers,
    deep C-level loops) can be killed. Use as a context manager."""

    def __init__(self, timeout=3.0):
        import multiprocessing as mp
        self.mp = mp.get_context('spawn')
        self.timeout = timeout
        self.proc = None
        self.n = 0

    def _start(self):
        self.tasks, self.results = self.mp.Queue(), self.mp.Queue()
        self.proc = self.mp.Process(target=_worker, args=(self.tasks, self.results), daemon=True)
        self.proc.start()

    def __enter__(self):
        self._start()
        return self

    def __exit__(self, *exc):
        try:
            self.tasks.put(None)
            self.proc.join(1)
        finally:
            if self.proc.is_alive():
                self.proc.kill()

    def run(self, code):
        import queue
        self.n += 1
        self.tasks.put((self.n, code))
        while True:
            try:
                i, res = self.results.get(timeout=self.timeout)
            except queue.Empty:
                self.proc.kill()
                self.proc.join()
                self._start()
                return '', 'Timeout'
            if i == self.n:
                return res


def outcome(out, err):
    """The answer a student types: printed output, then the error name."""
    if err is None:
        return out
    return (out + '\n' if out else '') + err


_QUOTES = str.maketrans({'‘': "'", '’': "'", '‛': "'", '′': "'", '“': '"', '”': '"', '″': '"'})


def norm_out(s):
    """Mirror of normOut() in practice.js."""
    s = str(s).translate(_QUOTES).replace('"', "'").replace(' ', ' ').strip()
    s = re.sub(r'\s+', ' ', s)
    return re.sub(r'\s*([,()\[\]{}:])\s*', r'\1', s)


def same_out(a, b):
    a, b = a.strip(), b.strip()
    if re.fullmatch(r'[A-Z]\w*Error', b) or re.fullmatch(r'[A-Z]\w*Error', a):
        return norm_out(a).lower() == norm_out(b).lower()
    return norm_out(a) == norm_out(b)


def unstable(s):
    """Outputs that change from run to run (object addresses, ids)."""
    return bool(re.search(r'0x[0-9a-fA-F]{4,}|object at|\b\d{9,}\b', s))


# --------------------------------------------------------------------------
# Helpers injected into mutated programs
# --------------------------------------------------------------------------
def _t_copy(x):
    if isinstance(x, list):
        return x[:]
    if isinstance(x, dict):
        return dict(x)
    return x


def _t_deep(x):
    if isinstance(x, list):
        return [_t_deep(v) for v in x]
    if isinstance(x, dict):
        return {k: _t_deep(v) for k, v in x.items()}
    return x


def _t_tmod(a, b):
    r = abs(a) % abs(b)
    return r if a >= 0 else -r


def _t_in(x, c):
    return x in (c.values() if isinstance(c, dict) else c)


def _t_and(*vals):
    for v in vals:
        if not v:
            return v
    return vals[-1]


def _t_or(*vals):
    for v in vals:
        if v:
            return v
    return vals[-1]


def _t_round(x):
    return round(x) if isinstance(x, float) else int(x)


def _t_mut(obj, name, *args):
    getattr(obj, name)(*args)
    return obj


HELPERS_NS = {'_t_copy': _t_copy, '_t_deep': _t_deep, '_t_tmod': _t_tmod, '_t_in': _t_in,
              '_t_and': _t_and, '_t_or': _t_or, '_t_mut': _t_mut, '_t_round': _t_round}


def _call(name, *args):
    return ast.Call(func=ast.Name(id=name, ctx=ast.Load()), args=list(args), keywords=[])


def _const(v):
    return ast.Constant(value=v)


# --------------------------------------------------------------------------
# Mutation operators. Each is a function (tree, k) that rewrites the k-th
# matching site in place and returns True, or returns False when there is
# no k-th site. Sites are counted in ast.walk order, so they are stable.
# --------------------------------------------------------------------------
def _sites(tree, pred):
    return [n for n in ast.walk(tree) if pred(n)]


def _parents(tree):
    par = {}
    for p in ast.walk(tree):
        for c in ast.iter_child_nodes(p):
            par[c] = p
    return par


def _replace(tree, old, new):
    par = _parents(tree)
    p = par[old]
    for field, val in ast.iter_fields(p):
        if val is old:
            setattr(p, field, new)
            return
        if isinstance(val, list):
            for i, v in enumerate(val):
                if v is old:
                    val[i] = new
                    return
    raise ValueError('node not found')


def _is_call(n, name):
    return isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id == name


def _is_meth(n, name):
    return isinstance(n, ast.Call) and isinstance(n.func, ast.Attribute) and n.func.attr == name


def op_range_stop(tree, k):
    s = _sites(tree, lambda n: _is_call(n, 'range') and 1 <= len(n.args) <= 3)
    if k >= len(s):
        return False
    n = s[k]
    i = 0 if len(n.args) == 1 else 1
    step_neg = len(n.args) == 3 and isinstance(n.args[2], ast.UnaryOp)
    n.args[i] = ast.BinOp(left=n.args[i], op=ast.Sub() if step_neg else ast.Add(), right=_const(1))
    return True


def op_range_zero(tree, k):
    s = _sites(tree, lambda n: _is_call(n, 'range') and len(n.args) == 1)
    if k >= len(s):
        return False
    n = s[k]
    n.args = [_const(1), ast.BinOp(left=n.args[0], op=ast.Add(), right=_const(1))]
    return True


def op_slice_stop(tree, k):
    def ok(n):
        if not isinstance(n, ast.Slice) or n.upper is None:
            return False
        if n.step is not None and isinstance(n.step, ast.UnaryOp):
            return False
        u = n.upper
        return not (isinstance(u, ast.UnaryOp) and isinstance(u.op, ast.USub))
    s = _sites(tree, ok)
    if k >= len(s):
        return False
    s[k].upper = ast.BinOp(left=s[k].upper, op=ast.Add(), right=_const(1))
    return True


def op_slice_step(tree, k):
    # Belief: s[a:b:-1] means "take s[a:b] then reverse it".
    def ok(n):
        return (isinstance(n, ast.Subscript) and isinstance(n.slice, ast.Slice) and n.slice.step is not None
                and isinstance(n.slice.step, ast.UnaryOp) and isinstance(n.slice.step.op, ast.USub)
                and (n.slice.lower is not None or n.slice.upper is not None))
    s = _sites(tree, ok)
    if k >= len(s):
        return False
    n = s[k]
    inner = ast.Subscript(value=n.value, slice=ast.Slice(lower=n.slice.lower, upper=n.slice.upper, step=None), ctx=ast.Load())
    _replace(tree, n, ast.Subscript(value=inner, slice=ast.Slice(lower=None, upper=None, step=n.slice.step), ctx=ast.Load()))
    return True


def op_slice_copy(tree, k):
    def ok(n):
        full = (isinstance(n, ast.Subscript) and isinstance(n.slice, ast.Slice) and n.slice.lower is None
                and n.slice.upper is None and n.slice.step is None and isinstance(n.ctx, ast.Load))
        return full or (_is_meth(n, 'copy') and not n.args)
    s = _sites(tree, ok)
    if k >= len(s):
        return False
    n = s[k]
    _replace(tree, n, n.value if isinstance(n, ast.Subscript) else n.func.value)
    return True


def _binop(cls_from, build):
    def op(tree, k):
        s = _sites(tree, lambda n: isinstance(n, ast.BinOp) and isinstance(n.op, cls_from))
        if k >= len(s):
            return False
        n = s[k]
        _replace(tree, n, build(n))
        return True
    return op


op_true_div = _binop(ast.FloorDiv, lambda n: ast.BinOp(left=n.left, op=ast.Div(), right=n.right))
op_int_div = _binop(ast.Div, lambda n: ast.BinOp(left=n.left, op=ast.FloorDiv(), right=n.right))
op_floor_neg = _binop(ast.FloorDiv, lambda n: _call('int', ast.BinOp(left=n.left, op=ast.Div(), right=n.right)))
op_mod_sign = _binop(ast.Mod, lambda n: _call('_t_tmod', n.left, n.right))


def op_pow_assoc(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.BinOp) and isinstance(n.op, ast.Pow)
               and isinstance(n.right, ast.BinOp) and isinstance(n.right.op, ast.Pow))
    if k >= len(s):
        return False
    n = s[k]
    _replace(tree, n, ast.BinOp(left=ast.BinOp(left=n.left, op=ast.Pow(), right=n.right.left), op=ast.Pow(), right=n.right.right))
    return True


def op_neg_pow(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.UnaryOp) and isinstance(n.op, ast.USub)
               and isinstance(n.operand, ast.BinOp) and isinstance(n.operand.op, ast.Pow))
    if k >= len(s):
        return False
    n = s[k]
    p = n.operand
    _replace(tree, n, ast.BinOp(left=ast.UnaryOp(op=ast.USub(), operand=p.left), op=ast.Pow(), right=p.right))
    return True


def op_precedence(tree, k):
    tight = (ast.Mult, ast.Div, ast.FloorDiv, ast.Mod)
    s = _sites(tree, lambda n: isinstance(n, ast.BinOp) and isinstance(n.op, (ast.Add, ast.Sub))
               and isinstance(n.right, ast.BinOp) and isinstance(n.right.op, tight))
    if k >= len(s):
        return False
    n = s[k]
    r = n.right
    _replace(tree, n, ast.BinOp(left=ast.BinOp(left=n.left, op=n.op, right=r.left), op=r.op, right=r.right))
    return True


def op_alias(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.Assign) and len(n.targets) == 1
               and isinstance(n.targets[0], ast.Name) and isinstance(n.value, ast.Name))
    if k >= len(s):
        return False
    s[k].value = _call('_t_copy', s[k].value)
    return True


def op_shallow(tree, k):
    def ok(n):
        full = (isinstance(n, ast.Subscript) and isinstance(n.slice, ast.Slice) and n.slice.lower is None
                and n.slice.upper is None and n.slice.step is None and isinstance(n.ctx, ast.Load))
        return full or (_is_meth(n, 'copy') and not n.args)
    s = _sites(tree, ok)
    if k >= len(s):
        return False
    n = s[k]
    _replace(tree, n, _call('_t_deep', n.value if isinstance(n, ast.Subscript) else n.func.value))
    return True


def op_list_repeat(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.BinOp) and isinstance(n.op, ast.Mult)
               and isinstance(n.left, ast.List) and len(n.left.elts) == 1
               and isinstance(n.left.elts[0], (ast.List, ast.BinOp, ast.ListComp, ast.Name)))
    if k >= len(s):
        return False
    n = s[k]
    comp = ast.ListComp(elt=_call('_t_deep', n.left.elts[0]),
                        generators=[ast.comprehension(target=ast.Name(id='_t_i', ctx=ast.Store()),
                                                      iter=_call('range', n.right), ifs=[], is_async=0)])
    _replace(tree, n, comp)
    return True


def op_iadd(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.AugAssign) and isinstance(n.op, ast.Add) and isinstance(n.target, ast.Name))
    if k >= len(s):
        return False
    n = s[k]
    _replace(tree, n, ast.Assign(targets=[ast.Name(id=n.target.id, ctx=ast.Store())],
                                 value=ast.BinOp(left=ast.Name(id=n.target.id, ctx=ast.Load()), op=ast.Add(), right=n.value),
                                 lineno=n.lineno))
    return True


def op_andor_value(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.BoolOp))
    if k >= len(s):
        return False
    _replace(tree, s[k], _call('bool', s[k]))
    return True


def op_short_circuit(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.BoolOp))
    if k >= len(s):
        return False
    n = s[k]
    _replace(tree, n, _call('_t_and' if isinstance(n.op, ast.And) else '_t_or', *n.values))
    return True


def op_print_end(tree, k):
    s = _sites(tree, lambda n: _is_call(n, 'print') and any(kw.arg == 'end' for kw in n.keywords))
    if k >= len(s):
        return False
    s[k].keywords = [kw for kw in s[k].keywords if kw.arg != 'end']
    return True


_FLIP = {ast.Lt: ast.LtE, ast.LtE: ast.Lt, ast.Gt: ast.GtE, ast.GtE: ast.Gt}


def op_boundary(tree, k):
    s = []
    for n in ast.walk(tree):
        if isinstance(n, ast.Compare):
            for i, o in enumerate(n.ops):
                if type(o) in _FLIP:
                    s.append((n, i))
    if k >= len(s):
        return False
    n, i = s[k]
    n.ops[i] = _FLIP[type(n.ops[i])]()
    return True


def op_elif(tree, k):
    # Belief: an elif is checked even when an earlier branch ran.
    s = []
    for p in ast.walk(tree):
        for field in ('body', 'orelse'):
            stmts = getattr(p, field, None)
            if isinstance(stmts, list):
                for i, st in enumerate(stmts):
                    if isinstance(st, ast.If) and len(st.orelse) == 1 and isinstance(st.orelse[0], ast.If):
                        s.append((stmts, i, st))
    if k >= len(s):
        return False
    stmts, i, st = s[k]
    nxt = st.orelse[0]
    st.orelse = []
    stmts.insert(i + 1, nxt)
    return True


def op_is(tree, k):
    s = []
    for n in ast.walk(tree):
        if isinstance(n, ast.Compare):
            for i, o in enumerate(n.ops):
                if isinstance(o, (ast.Is, ast.IsNot)):
                    s.append((n, i))
    if k >= len(s):
        return False
    n, i = s[k]
    n.ops[i] = ast.Eq() if isinstance(n.ops[i], ast.Is) else ast.NotEq()
    return True


def op_dict_in(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.Compare) and len(n.ops) == 1 and isinstance(n.ops[0], (ast.In, ast.NotIn)))
    if k >= len(s):
        return False
    n = s[k]
    call = _call('_t_in', n.left, n.comparators[0])
    _replace(tree, n, call if isinstance(n.ops[0], ast.In) else ast.UnaryOp(op=ast.Not(), operand=call))
    return True


def op_pop_end(tree, k):
    s = _sites(tree, lambda n: _is_meth(n, 'pop') and len(n.args) <= 1
               and (not n.args or (isinstance(n.args[0], ast.Constant) and n.args[0].value in (0, -1))))
    if k >= len(s):
        return False
    n = s[k]
    n.args = [] if n.args and n.args[0].value == 0 else [_const(0)]
    return True


def op_append_extend(tree, k):
    s = _sites(tree, lambda n: (_is_meth(n, 'append') or _is_meth(n, 'extend')) and len(n.args) == 1)
    if k >= len(s):
        return False
    n = s[k]
    n.func.attr = 'extend' if n.func.attr == 'append' else 'append'
    return True


def op_reduce_init(tree, k):
    s = _sites(tree, lambda n: _is_call(n, 'reduce') and len(n.args) == 3)
    if k >= len(s):
        return False
    s[k].args = s[k].args[:2]
    return True


def op_iter_once(tree, k):
    s = _sites(tree, lambda n: (_is_call(n, 'map') or _is_call(n, 'filter')))
    if k >= len(s):
        return False
    n = s[k]
    _replace(tree, n, _call('list', copy.copy(n)))
    return True


def op_none_return(tree, k):
    par = _parents(tree)
    names = ('sort', 'append', 'extend', 'reverse', 'insert', 'remove', 'clear')
    s = [n for n in ast.walk(tree)
         if isinstance(n, ast.Call) and isinstance(n.func, ast.Attribute) and n.func.attr in names
         and not isinstance(par.get(n), ast.Expr)]
    if k >= len(s):
        return False
    n = s[k]
    _replace(tree, n, _call('_t_mut', n.func.value, _const(n.func.attr), *n.args))
    return True


def op_chain_cmp(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.Compare) and len(n.ops) >= 2)
    if k >= len(s):
        return False
    n = s[k]
    left = ast.Compare(left=n.left, ops=[n.ops[0]], comparators=[n.comparators[0]])
    _replace(tree, n, ast.Compare(left=left, ops=n.ops[1:], comparators=n.comparators[1:]))
    return True


def op_int_trunc(tree, k):
    s = _sites(tree, lambda n: _is_call(n, 'int') and len(n.args) == 1)
    if k >= len(s):
        return False
    s[k].func = ast.Name(id='_t_round', ctx=ast.Load())
    return True


def op_override(tree, k):
    s = []
    for c in ast.walk(tree):
        if isinstance(c, ast.ClassDef) and c.bases:
            for f in c.body:
                if isinstance(f, ast.FunctionDef):
                    s.append((c, f))
    if k >= len(s):
        return False
    c, f = s[k]
    c.body.remove(f)
    if not c.body:
        c.body.append(ast.Expr(value=_const(Ellipsis)))
    return True


def op_super_init(tree, k):
    def ok(n):
        return (isinstance(n, ast.Expr) and isinstance(n.value, ast.Call) and isinstance(n.value.func, ast.Attribute)
                and n.value.func.attr == '__init__' and _is_call(n.value.func.value, 'super'))
    s = _sites(tree, ok)
    if k >= len(s):
        return False
    _replace(tree, s[k], ast.Expr(value=_const(None)))
    return True


def op_pass_by_ref(tree, k):
    defined = {n.name for n in ast.walk(tree) if isinstance(n, ast.FunctionDef)}
    s = []
    for n in ast.walk(tree):
        if isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id in defined:
            for i, a in enumerate(n.args):
                if isinstance(a, ast.Name):
                    s.append((n, i))
    if k >= len(s):
        return False
    n, i = s[k]
    n.args[i] = _call('_t_deep', n.args[i])
    return True


def op_tuple_comma(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.Tuple) and len(n.elts) == 1 and isinstance(n.ctx, ast.Load))
    if k >= len(s):
        return False
    _replace(tree, s[k], s[k].elts[0])
    return True


def op_last_index(tree, k):
    s = _sites(tree, lambda n: isinstance(n, ast.BinOp) and isinstance(n.op, ast.Sub) and _is_call(n.left, 'len')
               and isinstance(n.right, ast.Constant) and n.right.value == 1)
    if k >= len(s):
        return False
    _replace(tree, s[k], s[k].left)
    return True


def op_return_in_loop(tree, k):
    # Belief flips the indentation of a return at the end of / just after a loop.
    s = []
    for p in ast.walk(tree):
        stmts = getattr(p, 'body', None)
        if not isinstance(stmts, list):
            continue
        for i, st in enumerate(stmts):
            if isinstance(st, (ast.For, ast.While)) and not st.orelse:
                if st.body and isinstance(st.body[-1], ast.Return) and len(st.body) > 1:
                    s.append(('out', stmts, i, st))
                elif i + 1 < len(stmts) and isinstance(stmts[i + 1], ast.Return):
                    s.append(('in', stmts, i, st))
    if k >= len(s):
        return False
    kind, stmts, i, st = s[k]
    if kind == 'out':
        ret = st.body.pop()
        stmts.insert(i + 1, ret)
    else:
        st.body.append(stmts.pop(i + 1))
    return True


def op_acc_reset(tree, k):
    def simple(v):
        return isinstance(v, (ast.Constant, ast.List, ast.Dict, ast.Tuple)) and not getattr(v, 'elts', None) and not getattr(v, 'keys', None) or isinstance(v, ast.Constant)
    s = []
    for p in ast.walk(tree):
        stmts = getattr(p, 'body', None)
        if not isinstance(stmts, list):
            continue
        for i, st in enumerate(stmts):
            if isinstance(st, ast.For) and st.body:
                first = st.body[0]
                if (isinstance(first, ast.Assign) and len(first.targets) == 1 and isinstance(first.targets[0], ast.Name)
                        and simple(first.value) and len(st.body) > 1):
                    s.append(('hoist', stmts, i, st))
                if i > 0:
                    prev = stmts[i - 1]
                    if (isinstance(prev, ast.Assign) and len(prev.targets) == 1 and isinstance(prev.targets[0], ast.Name)
                            and simple(prev.value)):
                        s.append(('sink', stmts, i, st))
    if k >= len(s):
        return False
    kind, stmts, i, st = s[k]
    if kind == 'hoist':
        stmts.insert(i, st.body.pop(0))
    else:
        st.body.insert(0, stmts.pop(i - 1))
    return True


def op_local_scope(tree, k):
    if not isinstance(tree, ast.Module):
        return False
    top ={t.id for n in tree.body if isinstance(n, ast.Assign) for t in n.targets if isinstance(t, ast.Name)}
    s = []
    for f in ast.walk(tree):
        if isinstance(f, ast.FunctionDef):
            assigned = {t.id for n in ast.walk(f) if isinstance(n, (ast.Assign, ast.AugAssign))
                        for t in (n.targets if isinstance(n, ast.Assign) else [n.target]) if isinstance(t, ast.Name)}
            params = {a.arg for a in f.args.args}
            for name in sorted((assigned & top) - params):
                s.append((f, name))
    if k >= len(s):
        return False
    f, name = s[k]
    f.body.insert(0, ast.Global(names=[name]))
    return True


def _bound_constants(tree):
    """Small int constants used as an index, a bound, a comparison limit or a
    +/- term: the places where an off-by-one slip is plausible."""
    par = _parents(tree)
    out = []
    for n in ast.walk(tree):
        if not (isinstance(n, ast.Constant) and type(n.value) is int and 0 <= n.value <= 3):
            continue
        p = par.get(n)
        if isinstance(p, ast.UnaryOp):
            n, p = p, par.get(p)
        if isinstance(p, ast.Slice) and p.step is n:
            continue  # changing a step is not an off-by-one slip
        if isinstance(p, ast.BinOp) and isinstance(p.op, (ast.Add, ast.Sub)) and p.right is n:
            out.append(n)
        elif isinstance(p, (ast.Subscript, ast.Slice)) or _is_call(p, 'range'):
            out.append(n)
        elif isinstance(p, ast.Compare) and n in p.comparators and not any(
                isinstance(x, ast.BinOp) and isinstance(x.op, ast.Mod) for x in [p.left] + p.comparators):
            out.append(n)
    return out, par


def op_off_by_one(tree, k):
    s, par = _bound_constants(tree)
    if k >= 2 * len(s):
        return False
    n = s[k // 2]
    if isinstance(n, ast.UnaryOp):
        return False if k % 2 else _set_neg(n)
    new = n.value + (1 if k % 2 == 0 else -1)
    if new < 0:
        return False
    p = par.get(n)
    if new == 0 and isinstance(p, ast.BinOp) and p.right is n:
        _replace(tree, p, p.left)  # n - 1 -> n, not n - 0
        return True
    n.value = new
    return True


def _set_neg(n):
    n.operand.value += 1
    return True


def op_drop_call(tree, k):
    # e.g. tuple(x) -> x, list(m) -> m, len(x) -> x
    s = _sites(tree, lambda n: isinstance(n, ast.Call) and isinstance(n.func, ast.Name)
               and n.func.id in ('tuple', 'list', 'str', 'int', 'len', 'abs') and len(n.args) == 1)
    if k >= len(s):
        return False
    _replace(tree, s[k], s[k].args[0])
    return True


def op_rec_order(tree, k):
    # Belief: a print placed after the recursive call still runs on the way down.
    s = []
    for f in ast.walk(tree):
        if not isinstance(f, ast.FunctionDef):
            continue
        for p in ast.walk(f):
            stmts = getattr(p, 'body', None)
            for lst in (stmts, getattr(p, 'orelse', None)):
                if not isinstance(lst, list):
                    continue
                for i in range(len(lst) - 1):
                    a, b = lst[i], lst[i + 1]
                    calls_self = lambda st: any(_is_call(n, f.name) for n in ast.walk(st))  # noqa: E731
                    prints = lambda st: isinstance(st, ast.Expr) and _is_call(st.value, 'print')  # noqa: E731
                    if (prints(a) and calls_self(b) and not isinstance(b, ast.Return)) or (calls_self(a) and prints(b)):
                        s.append((lst, i))
    if k >= len(s):
        return False
    lst, i = s[k]
    lst[i], lst[i + 1] = lst[i + 1], lst[i]
    return True


def op_index_off(tree, k):
    # Off by one on a constant used as an index, a bound or a range argument.
    return op_off_by_one(tree, k)


OPERATORS = {
    'range-stop': op_range_stop, 'range-zero': op_range_zero, 'slice-stop': op_slice_stop,
    'slice-step': op_slice_step, 'slice-copy': op_slice_copy, 'true-div': op_true_div,
    'int-div': op_int_div, 'floor-neg': op_floor_neg, 'mod-sign': op_mod_sign,
    'pow-assoc': op_pow_assoc, 'neg-pow': op_neg_pow, 'precedence': op_precedence,
    'alias': op_alias, 'shallow-copy': op_shallow, 'list-repeat': op_list_repeat,
    'iadd-inplace': op_iadd, 'andor-value': op_andor_value, 'short-circuit': op_short_circuit,
    'print-end': op_print_end, 'boundary': op_boundary, 'elif-chain': op_elif,
    'is-identity': op_is, 'dict-in': op_dict_in, 'pop-end': op_pop_end,
    'append-extend': op_append_extend, 'reduce-init': op_reduce_init, 'iter-once': op_iter_once,
    'none-return': op_none_return, 'chain-cmp': op_chain_cmp, 'int-trunc': op_int_trunc,
    'override': op_override, 'super-init': op_super_init, 'pass-by-ref': op_pass_by_ref,
    'tuple-comma': op_tuple_comma, 'last-index': op_last_index, 'return-in-loop': op_return_in_loop,
    'acc-reset': op_acc_reset, 'local-scope': op_local_scope,
    'rec-order': op_rec_order, 'index-off': op_index_off,
}
# Only used on fill-in answers, where small edits are the whole point.
BLANK_ONLY = {'off-by-one': op_off_by_one, 'drop-call': op_drop_call}
ALL_OPERATORS = dict(OPERATORS, **BLANK_ONLY)
# A trap label for each blank-only operator.
OP_TRAP = {'off-by-one': 'off-by-one', 'drop-call': 'type-error', 'index-off': 'off-by-one'}


def _parse(code):
    return ast.parse(code)


def apply_mutation(code, mut, mode='exec'):
    """mut is 'operator:site'. Returns mutated source, or None if no such site."""
    opname, site = mut.rsplit(':', 1)
    tree = ast.parse(code, mode=mode)
    if not ALL_OPERATORS[opname](tree, int(site)):
        return None
    ast.fix_missing_locations(tree)
    try:
        return ast.unparse(tree)
    except Exception:  # noqa: BLE001
        return None


def mutants(code, operators=None, mode='exec', max_sites=24):
    """Yield (operator, site, mutated_source) for every site of every operator."""
    ops = operators or OPERATORS
    for name in ops:
        for site in range(max_sites):
            m = apply_mutation(code, f'{name}:{site}', mode)
            if m is not None:
                yield name, site, m
