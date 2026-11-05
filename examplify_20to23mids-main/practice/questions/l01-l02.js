/* Lecture 1 — Problem solving by programming
   Lecture 2 — Expressions and functions in numerical computations */
practice([
  { id: 'L1-02', lec: 1, topic: 'Paradigms', d: 1, type: 'mcq',
    t: 'Declarative or imperative?',
    q: 'Both snippets compute the sum of squares of a tuple `t`. Which statement is correct?',
    code: `
      # Snippet P
      total = 0
      for x in t:
          total = total + x * x

      # Snippet Q
      sum(map(lambda x: x * x, t))`,
    opts: ['P is imperative (changes state); Q is declarative (an expression)',
           'P is declarative; Q is imperative',
           'Both are declarative',
           'Both are imperative'],
    ans: 0,
    exp: 'P describes **how** by repeatedly updating the variable `total` (program state). Q states **what** to compute with one expression built from higher-order functions, with no state to update.' },

  { id: 'L2-01', lec: 2, topic: 'Operators', d: 1, type: 'out',
    t: 'Floor division and remainder',
    code: `
      print(17 // 5 * 3 + 17 % 5)`,
    ans: '11',
    exp: '`//`, `*` and `%` share the same precedence and group left to right: `(17 // 5) * 3 = 9`, then `17 % 5 = 2`, so `9 + 2 = 11`.' },

  { id: 'L2-02', lec: 2, topic: 'Operators', d: 2, type: 'mcq', run: true,
    t: 'Exponent associativity',
    q: 'What is printed?',
    code: `
      print(2 ** 3 ** 2)`,
    opts: ['512', '64', '36', '12'],
    ans: 0,
    exp: '`**` is **right**-associative: `2 ** (3 ** 2) = 2 ** 9 = 512`. Reading it left to right would wrongly give `8 ** 2 = 64`.' },

  { id: 'L2-03', lec: 2, topic: 'Operators', d: 2, type: 'out',
    t: 'Negative floor division',
    code: `
      print(-7 // 2, -7 % 2)`,
    ans: '-4 1',
    exp: '`//` rounds **down** (towards negative infinity), so `-7 // 2` is `-4`, not `-3`. The remainder keeps `(-7 // 2) * 2 + (-7 % 2) == -7`, so `-7 % 2` is `1`.' },

  { id: 'L2-07', lec: 2, topic: 'Short-circuit', d: 2, type: 'out',
    t: 'Short-circuit with and',
    code: `
      def f(x):
          print('f', end=' ')
          return x

      print(f(0) and f(1))`,
    ans: 'f 0',
    exp: '`f(0)` prints `f ` and returns `0`, which is falsy, so `and` stops there without calling `f(1)`. `and` returns the falsy operand itself, so `0` is printed.' },

  { id: 'L2-08', lec: 2, topic: 'Short-circuit', d: 2, type: 'out',
    t: 'Short-circuit with or',
    code: `
      def g(x):
          print(x, end=' ')
          return x > 2

      print(g(1) or g(3) or g(5))`,
    ans: '1 3 True',
    exp: '`g(1)` prints 1 and is `False`, so `or` moves on. `g(3)` prints 3 and is `True`, so evaluation stops and `g(5)` is never called. Then `True` is printed.' },

  { id: 'L2-09', lec: 2, topic: 'Short-circuit', d: 2, type: 'mcq', run: true,
    t: 'Order of a guard',
    q: 'What happens?',
    code: `
      def test(a, b, c):
          return a / b < c and b != 0

      print(test(1, 0, 3))`,
    opts: ['ZeroDivisionError', 'False', 'True', 'None'],
    ans: 0,
    exp: 'The guard `b != 0` comes **after** the division, so `1 / 0` runs first and raises `ZeroDivisionError`. Writing `b != 0 and a / b < c` fixes it, because short-circuiting skips the division.' },

  { id: 'L2-10', lec: 2, topic: 'Conditional expression', d: 1, type: 'out',
    t: 'Chained conditional expression',
    code: `
      x = 7
      print('A' if x > 10 else 'B' if x > 5 else 'C')`,
    ans: 'B',
    exp: 'This reads as `\'A\' if x > 10 else (\'B\' if x > 5 else \'C\')`. `7 > 10` is false, `7 > 5` is true, so the result is `B`.' },

  { id: 'L2-11', lec: 2, topic: 'Types', d: 1, type: 'mcq', run: true, optCode: true,
    t: 'Types of / and //',
    q: 'What is printed?',
    code: `
      print(type(6 / 3), type(6 // 3))`,
    opts: ["<class 'float'> <class 'int'>", "<class 'int'> <class 'int'>",
           "<class 'float'> <class 'float'>", "<class 'int'> <class 'float'>"],
    ans: 0,
    exp: '`/` always produces a float (`2.0`), even when the division is exact. `//` on two ints produces an int (`2`).' },

  { id: 'L2-12', lec: 2, topic: 'Scope', d: 1, type: 'mcq', run: true,
    t: 'Local variable scope',
    q: 'What happens?',
    code: `
      def area(r):
          PI = 3.14
          return PI * r * r

      area(2)
      print(PI)`,
    opts: ['NameError', '3.14', '12.56', 'None'],
    ans: 0,
    exp: '`PI` is local to `area`. It disappears when the function returns, so using it outside raises `NameError`.' },

  { id: 'L2-13', lec: 2, topic: 'Recurrence', d: 2, type: 'fib',
    t: 'Harmonic series by recurrence',
    q: '`h(n)` returns 1 + 1/2 + 1/3 + … + 1/n for n ≥ 1, using the recurrence h(n) = 1/n + h(n − 1). Complete it.',
    code: `
      def h(n):
          if n == 1:
              return 1
          return {{1}}`,
    blanks: [['1 / n + h(n - 1)', 'h(n - 1) + 1 / n', '1 / n + h(n-1)']],
    test: 'assert abs(h(4) - (1 + 1/2 + 1/3 + 1/4)) < 1e-12\nassert h(1) == 1',
    exp: 'The base case is `h(1) = 1`. Every other term adds `1 / n` to the sum of the first `n - 1` terms.' },

  { id: 'L2-15', lec: 2, topic: 'Operators', d: 2, type: 'mcq', run: true,
    t: 'Mixed precedence',
    q: 'What is printed?',
    code: `
      print(5 + 4 % 3 * 2 ** 2)`,
    opts: ['9', '0', '13', '21'],
    ans: 0,
    exp: '`**` is evaluated first (`2 ** 2 = 4`). Then `%` and `*` go left to right: `4 % 3 = 1`, `1 * 4 = 4`. Finally `5 + 4 = 9`.' },

  { id: 'L2-16', lec: 2, topic: 'Logical expressions', d: 1, type: 'mcq',
    t: 'Range check',
    q: 'Which expression is `True` exactly when `x` is between 1 and 10 inclusive?',
    opts: ['1 <= x <= 10', 'x >= 1 or x <= 10', 'not (x < 1 and x > 10)', '1 <= x and <= 10'],
    ans: 0,
    exp: 'Chained comparison `1 <= x <= 10` means `1 <= x and x <= 10`. The `or` version is true for every number, and `x < 1 and x > 10` is never true, so its negation is always `True`. The last option is a syntax error.' },

  { id: 'L2-17', lec: 2, topic: 'Operators', d: 2, type: 'out',
    t: 'The division identity',
    code: `
      a, b = 5, 2
      print(a // b * b + a % b == a, a // b + a % b * b == a)`,
    ans: 'True False',
    exp: '`(a // b) * b + a % b` always equals `a`: `2*2 + 1 = 5`. The second expression multiplies the wrong part: `2 + 1*2 = 4`, which is not 5.' },

  { id: 'L2-18', lec: 2, topic: 'Logical expressions', d: 2, type: 'mcq', run: true,
    t: 'Precedence of not',
    q: 'What is printed?',
    code: `
      print(not 0 == 1)`,
    opts: ['True', 'False', 'TypeError', '1'],
    ans: 0,
    exp: '`not` has **lower** precedence than `==`, so this is `not (0 == 1)` = `not False` = `True`.' },

  { id: 'L2-21', lec: 2, topic: 'Conditional expression', d: 1, type: 'mcq', run: true,
    t: 'Conditional expression guard',
    q: 'What is printed?',
    code: `
      x = 0
      y = 10 / x if x != 0 else -1
      print(y)`,
    opts: ['-1', 'ZeroDivisionError', '0', 'None'],
    ans: 0,
    exp: 'The condition is checked first. `x != 0` is `False`, so only the `else` part (`-1`) is evaluated and `10 / x` never runs.' },

  { id: 'L2-22', lec: 2, topic: 'Recurrence', d: 2, type: 'out',
    t: 'Tracing a recurrence',
    code: `
      def s(n):
          return 1 if n == 0 else 2 * s(n - 1) + n

      print(s(3))`,
    ans: '19',
    exp: 'Build it up from the base case: `s(0) = 1`, `s(1) = 2*1 + 1 = 3`, `s(2) = 2*3 + 2 = 8`, `s(3) = 2*8 + 3 = 19`.' },

  { id: 'L2-23', lec: 2, topic: 'Scope', d: 3, type: 'out',
    t: 'Assigning to a global inside a function',
    code: `
      y = 12

      def foo(x):
          if x > 0:
              y -= 1
          return y

      print(foo(3))`,
    ans: 'UnboundLocalError',
    exp: 'Because `foo` **assigns** to `y`, Python treats `y` as local to the whole function. `y -= 1` then reads the local `y` before it has a value, which raises `UnboundLocalError` (a kind of `NameError`). The global `y = 12` is never used.' }
]);
