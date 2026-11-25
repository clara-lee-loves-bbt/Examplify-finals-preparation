/* Lecture 1 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L1-02': {
    trap: 'decl-imp',
    ans: 'P is imperative (changes state); Q is declarative (an expression)',
    wrong: [
      { a: 'P is declarative; Q is imperative', trap: 'decl-imp', why: 'Reversed. P changes `total` step by step (imperative); Q is one expression that evaluates to a value (declarative).' },
      { a: 'Both are declarative', trap: 'decl-imp', why: 'P reassigns `total` inside a loop. Statements that change state are imperative.' },
      { a: 'Both are imperative', trap: 'decl-imp', why: 'Q has no statements and changes no variable; it is a single expression.' }],
    exp: 'P describes **how** by repeatedly updating the variable `total` (program state). Q states **what** to compute with one expression built from higher-order functions, with no state to update.' },

  'L2-01': {
    trap: 'precedence',
    ans: '11',
    wrong: [
      { a: '12.2', trap: 'true-div', mut: 'true-div:0' },
      { a: '1', trap: 'precedence', mut: 'precedence:0' }],
    exp: '`//`, `*` and `%` share the same precedence and group left to right: `(17 // 5) * 3 = 9`, then `17 % 5 = 2`, so `9 + 2 = 11`.' },

  'L2-02': {
    trap: 'pow-assoc',
    run: true,
    ans: '512',
    wrong: [
      { a: '64', trap: 'pow-assoc', mut: 'pow-assoc:0' },
      { a: '36', trap: 'pow-assoc', why: 'Reads `2 ** 3` as `2 * 3 = 6` and then squares it.' },
      { a: '12', trap: 'pow-assoc', why: 'Multiplies the numbers (2 * 3 * 2) instead of raising powers.' }],
    exp: '`**` is **right**-associative: `2 ** (3 ** 2) = 2 ** 9 = 512`. Reading it left to right would wrongly give `8 ** 2 = 64`.' },

  'L2-03': {
    trap: 'floor-neg',
    ans: '-4 1',
    wrong: [
      { a: '-3.5 1', trap: 'true-div', mut: 'true-div:0' },
      { a: '-3 1', trap: 'floor-neg', mut: 'floor-neg:0' },
      { a: '-4 -1', trap: 'mod-sign', mut: 'mod-sign:0' }],
    exp: '`//` rounds **down** (towards negative infinity), so `-7 // 2` is `-4`, not `-3`. The remainder keeps `(-7 // 2) * 2 + (-7 % 2) == -7`, so `-7 % 2` is `1`.' },

  'L2-07': {
    trap: 'short-circuit',
    ans: 'f 0',
    wrong: [
      { a: 'f False', trap: 'andor-value', mut: 'andor-value:0' },
      { a: 'f f 0', trap: 'short-circuit', mut: 'short-circuit:0' }],
    exp: '`f(0)` prints `f ` and returns `0`, which is falsy, so `and` stops there without calling `f(1)`. `and` returns the falsy operand itself, so `0` is printed.' },

  'L2-08': {
    trap: 'short-circuit',
    ans: '1 3 True',
    wrong: [
      { a: '3 True', trap: 'short-circuit', why: '`or` evaluates from the left, so `g(1)` runs (printing 1) before `g(3)`.' },
      { a: '1 3 5 True', trap: 'short-circuit', mut: 'short-circuit:0' }],
    exp: '`g(1)` prints 1 and is `False`, so `or` moves on. `g(3)` prints 3 and is `True`, so evaluation stops and `g(5)` is never called. Then `True` is printed.' },

  'L2-09': {
    trap: 'short-circuit',
    run: true,
    ans: 'ZeroDivisionError',
    wrong: [
      { a: 'False', trap: 'short-circuit', why: 'The guard `b != 0` is on the **right**, so `a / b` runs first and raises before `and` can stop anything.' },
      { a: 'True', trap: 'short-circuit', why: 'The division on the left runs first and raises `ZeroDivisionError`.' },
      { a: 'None', trap: 'short-circuit', why: 'An error stops the program; the function never returns a value.' }],
    exp: 'The guard `b != 0` comes **after** the division, so `1 / 0` runs first and raises `ZeroDivisionError`. Writing `b != 0 and a / b < c` fixes it, because short-circuiting skips the division.' },

  'L2-10': {
    trap: 'cond-expr',
    ans: 'B',
    wrong: [
      { a: 'C', trap: 'cond-expr', why: 'The second condition `x > 5` is True for 7, so the chain stops at `B`.' },
      { a: 'A', trap: 'cond-expr', why: '`x > 10` is False, so the first branch is skipped.' }],
    exp: 'This reads as `\'A\' if x > 10 else (\'B\' if x > 5 else \'C\')`. `7 > 10` is false, `7 > 5` is true, so the result is `B`.' },

  'L2-11': {
    trap: 'int-div',
    run: true,
    ans: '<class \'float\'> <class \'int\'>',
    wrong: [
      { a: '<class \'int\'> <class \'int\'>', trap: 'int-div', mut: 'int-div:0' },
      { a: '<class \'float\'> <class \'float\'>', trap: 'true-div', mut: 'true-div:0' },
      { a: '<class \'int\'> <class \'float\'>', trap: 'int-div', why: 'Swapped: `/` always gives a float; `//` of two ints gives an int.' }],
    exp: '`/` always produces a float (`2.0`), even when the division is exact. `//` on two ints produces an int (`2`).' },

  'L2-12': {
    trap: 'local-scope',
    run: true,
    ans: 'NameError',
    wrong: [
      { a: '3.14', trap: 'local-scope', why: '`PI` is local to `area`; it no longer exists once the call returns.' },
      { a: '12.56', trap: 'local-scope', why: 'The return value was thrown away, and `print(PI)` looks up a name that only existed inside the function.' },
      { a: 'None', trap: 'local-scope', why: 'Looking up an undefined name raises `NameError`; it never gives `None`.' }],
    exp: '`PI` is local to `area`. It disappears when the function returns, so using it outside raises `NameError`.' },

  'L2-13': {
    trap: 'int-div',
    blanks: [['1 / n + h(n - 1)', 'h(n - 1) + 1 / n', '1 / n + h(n-1)']],
    wrong: [
      { b: 1, a: '1 // n + h(n - 1)', trap: 'int-div', mut: 'int-div:0' },
      { b: 1, a: '1 / n + h(n)', trap: 'off-by-one', mut: 'index-off:1' }],
    test: `
      assert abs(h(4) - (1 + 1/2 + 1/3 + 1/4)) < 1e-12
      assert h(1) == 1`,
    exp: 'The base case is `h(1) = 1`. Every other term adds `1 / n` to the sum of the first `n - 1` terms.' },

  'L2-15': {
    trap: 'precedence',
    run: true,
    ans: '9',
    wrong: [
      { a: '0', trap: 'precedence', why: 'Works strictly left to right: `(5 + 4) % 3 = 0`. `%` and `*` bind tighter than `+`.' },
      { a: '13', trap: 'precedence', why: 'Skips the `% 3`. `**` goes first, then `%` and `*` from left to right, then `+`.' },
      { a: '21', trap: 'precedence', why: 'Groups the operators in the wrong order. `2 ** 2 = 4`, `4 % 3 = 1`, `1 * 4 = 4`, `5 + 4 = 9`.' }],
    exp: '`**` is evaluated first (`2 ** 2 = 4`). Then `%` and `*` go left to right: `4 % 3 = 1`, `1 * 4 = 4`. Finally `5 + 4 = 9`.' },

  'L2-16': {
    trap: 'and-or-logic',
    ans: '1 <= x <= 10',
    wrong: [
      { a: 'x >= 1 or x <= 10', trap: 'and-or-logic', why: 'Every number is `>= 1` or `<= 10`, so this is always True. Both must hold: use `and`.' },
      { a: 'not (x < 1 and x > 10)', trap: 'and-or-logic', why: '`x < 1 and x > 10` can never be True, so this is always True. The inside needs `or`.' },
      { a: '1 <= x and <= 10', trap: 'syntax', why: '`<= 10` is not a complete expression, so this is a `SyntaxError`.' }],
    exp: 'Chained comparison `1 <= x <= 10` means `1 <= x and x <= 10`. The `or` version is true for every number, and `x < 1 and x > 10` is never true, so its negation is always `True`. The last option is a syntax error.' },

  'L2-17': {
    trap: 'precedence',
    ans: 'True False',
    wrong: [
      { a: 'True True', trap: 'precedence', why: '`a % b * b` is `(a % b) * b = 2`, so the second sum is `2 + 2 = 4`, not 5.' },
      { a: 'False False', trap: 'true-div', mut: 'true-div:1' }],
    exp: '`(a // b) * b + a % b` always equals `a`: `2*2 + 1 = 5`. The second expression multiplies the wrong part: `2 + 1*2 = 4`, which is not 5.' },

  'L2-18': {
    trap: 'not-precedence',
    run: true,
    ans: 'True',
    wrong: [
      { a: 'False', trap: 'not-precedence', why: 'Reads it as `(not 0) == 1`. `not` binds looser than `==`, so it is `not (0 == 1)`.' },
      { a: 'TypeError', trap: 'not-precedence', why: 'Nothing here is an invalid operation; `not` works on any value.' },
      { a: '1', trap: 'andor-value', why: '`not` always gives `True` or `False`, never an operand.' }],
    exp: '`not` has **lower** precedence than `==`, so this is `not (0 == 1)` = `not False` = `True`.' },

  'L2-21': {
    trap: 'cond-expr',
    run: true,
    ans: '-1',
    wrong: [
      { a: 'ZeroDivisionError', trap: 'cond-expr', why: 'Only the chosen branch is evaluated. `x != 0` is False, so `10 / x` never runs.' },
      { a: '0', trap: 'cond-expr', why: 'The condition is False, so the value is the `else` part, `-1`.' },
      { a: 'None', trap: 'cond-expr', why: 'A conditional expression always gives a value: here `-1`.' }],
    exp: 'The condition is checked first. `x != 0` is `False`, so only the `else` part (`-1`) is evaluated and `10 / x` never runs.' },

  'L2-22': {
    trap: 'base-case',
    ans: '19',
    wrong: [
      { a: '11', trap: 'base-case', why: 'Uses `s(0) = 0`. The base case returns **1**, so s(1) = 3, s(2) = 8, s(3) = 19.' },
      { a: '30', trap: 'precedence', why: 'Adds `n` before doubling. `2 * s(n - 1) + n` doubles first, then adds n.' }],
    exp: 'Build it up from the base case: `s(0) = 1`, `s(1) = 2*1 + 1 = 3`, `s(2) = 2*3 + 2 = 8`, `s(3) = 2*8 + 3 = 19`.' },

  'L2-23': {
    trap: 'local-scope',
    ans: 'UnboundLocalError',
    wrong: [
      { a: 'NameError', trap: 'local-scope', why: 'Close, but the exact error is `UnboundLocalError`: `y` is local (the function assigns it) and is read before it has a value.' },
      { a: '11', trap: 'local-scope', mut: 'local-scope:0' }],
    exp: 'Because `foo` **assigns** to `y`, Python treats `y` as local to the whole function. `y -= 1` then reads the local `y` before it has a value, which raises `UnboundLocalError` (a kind of `NameError`). The global `y = 12` is never used.' }
});
