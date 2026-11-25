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
      sum(map(lambda x: x * x, t))` },

  { id: 'L2-01', lec: 2, topic: 'Operators', d: 1, type: 'out',
    t: 'Floor division and remainder',
    code: `
      print(17 // 5 * 3 + 17 % 5)` },

  { id: 'L2-02', lec: 2, topic: 'Operators', d: 2, type: 'mcq',
    t: 'Exponent associativity',
    q: 'What is printed?',
    code: `
      print(2 ** 3 ** 2)` },

  { id: 'L2-03', lec: 2, topic: 'Operators', d: 2, type: 'out',
    t: 'Negative floor division',
    code: `
      print(-7 // 2, -7 % 2)` },

  { id: 'L2-07', lec: 2, topic: 'Short-circuit', d: 2, type: 'out',
    t: 'Short-circuit with and',
    code: `
      def f(x):
          print('f', end=' ')
          return x

      print(f(0) and f(1))` },

  { id: 'L2-08', lec: 2, topic: 'Short-circuit', d: 2, type: 'out',
    t: 'Short-circuit with or',
    code: `
      def g(x):
          print(x, end=' ')
          return x > 2

      print(g(1) or g(3) or g(5))` },

  { id: 'L2-09', lec: 2, topic: 'Short-circuit', d: 2, type: 'mcq',
    t: 'Order of a guard',
    q: 'What happens?',
    code: `
      def test(a, b, c):
          return a / b < c and b != 0

      print(test(1, 0, 3))` },

  { id: 'L2-10', lec: 2, topic: 'Conditional expression', d: 1, type: 'out',
    t: 'Chained conditional expression',
    code: `
      x = 7
      print('A' if x > 10 else 'B' if x > 5 else 'C')` },

  { id: 'L2-11', lec: 2, topic: 'Types', d: 1, type: 'mcq', optCode: true,
    t: 'Types of / and //',
    q: 'What is printed?',
    code: `
      print(type(6 / 3), type(6 // 3))` },

  { id: 'L2-12', lec: 2, topic: 'Scope', d: 1, type: 'mcq',
    t: 'Local variable scope',
    q: 'What happens?',
    code: `
      def area(r):
          PI = 3.14
          return PI * r * r

      area(2)
      print(PI)` },

  { id: 'L2-13', lec: 2, topic: 'Recurrence', d: 2, type: 'fib',
    t: 'Harmonic series by recurrence',
    q: '`h(n)` returns 1 + 1/2 + 1/3 + … + 1/n for n ≥ 1, using the recurrence h(n) = 1/n + h(n − 1). Complete it.',
    code: `
      def h(n):
          if n == 1:
              return 1
          return {{1}}` },

  { id: 'L2-15', lec: 2, topic: 'Operators', d: 2, type: 'mcq',
    t: 'Mixed precedence',
    q: 'What is printed?',
    code: `
      print(5 + 4 % 3 * 2 ** 2)` },

  { id: 'L2-16', lec: 2, topic: 'Logical expressions', d: 1, type: 'mcq',
    t: 'Range check',
    q: 'Which expression is `True` exactly when `x` is between 1 and 10 inclusive?' },

  { id: 'L2-17', lec: 2, topic: 'Operators', d: 2, type: 'out',
    t: 'The division identity',
    code: `
      a, b = 5, 2
      print(a // b * b + a % b == a, a // b + a % b * b == a)` },

  { id: 'L2-18', lec: 2, topic: 'Logical expressions', d: 2, type: 'mcq',
    t: 'Precedence of not',
    q: 'What is printed?',
    code: `
      print(not 0 == 1)` },

  { id: 'L2-21', lec: 2, topic: 'Conditional expression', d: 1, type: 'mcq',
    t: 'Conditional expression guard',
    q: 'What is printed?',
    code: `
      x = 0
      y = 10 / x if x != 0 else -1
      print(y)` },

  { id: 'L2-22', lec: 2, topic: 'Recurrence', d: 2, type: 'out',
    t: 'Tracing a recurrence',
    code: `
      def s(n):
          return 1 if n == 0 else 2 * s(n - 1) + n

      print(s(3))` },

  { id: 'L2-23', lec: 2, topic: 'Scope', d: 3, type: 'out',
    t: 'Assigning to a global inside a function',
    code: `
      y = 12

      def foo(x):
          if x > 0:
              y -= 1
          return y

      print(foo(3))` }
]);
