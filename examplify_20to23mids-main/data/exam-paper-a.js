/* Paper A — from "CS1010E Programming Methodology — Midterm Practice Papers"
   (file: CS1010E Mock Exam 2,3,4,5 (Claude Opus 5).pdf) — 31 questions */
registerExam({
  id: 'paperA',
  title: 'Paper A',
  headerName: 'Paper A',
  source: 'CS1010E Programming Methodology — Midterm Practice Papers · CS1010E Mock Exam 2,3,4,5 (Claude Opus 5).pdf',
  duration: 90,
  sections: [
    { name: 'Section A — One mark each', from: 1, to: 12, marks: 1 },
    { name: 'Section B — Two marks each', from: 13, to: 22, marks: 2 },
    { name: 'Section C — Fill in the blanks', from: 23, to: 31, marks: 3 }
  ],
  questions: [
    {
      n: 1, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> 2 ** 3 ** 2 % 5' }],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '512' }, { l: 'C', t: '2' },
        { l: 'D', t: '1' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: '** is right-associative: 2 ** (3 ** 2) = 512, and 512 % 5 = 2. Reading it left-associatively gives 64 % 5 = 4, the distractor.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> (-7 // 2, -7 % 2)' }],
      options: [
        { l: 'A', t: '(-3, -1)' }, { l: 'B', t: '(-4, 1)' }, { l: 'C', t: '(-4, -1)' },
        { l: 'D', t: '(-3, 1)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: '// floors toward negative infinity, so -7 // 2 = -4, and -7 % 2 = 1 because n == (n // d) * d + (n % d). A positive divisor always gives a non-negative remainder.'
    },
    {
      n: 3, marks: 1, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'def foo(n):\n    def bar(n):\n        return n + 1\n    return bar(n) * bar(2)' },
        { p: 'What is the result of `foo(3)`?' }
      ],
      options: [
        { l: 'A', t: '9' }, { l: 'B', t: '16' }, { l: 'C', t: '4' },
        { l: 'D', t: '12' }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: "bar's parameter is local to bar, so bar(2) is 3 — it does not inherit n = 3. bar(3) * bar(2) = 4 * 3 = 12."
    },
    {
      n: 4, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> 'CS1010E'[-2:1:-2]" }],
      options: [
        { l: 'A', t: "'010'" }, { l: 'B', t: "'0E'" }, { l: 'C', t: "'' (empty string)" },
        { l: 'D', t: 'Error' }, { l: 'E', t: "'00'" }
      ],
      answer: 'E',
      explanation: "Index -2 is position 5 ('0'). Stepping -2 toward but excluding index 1 visits positions 5 and 3 — both '0'."
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> tuple(range(5, -5, -3))' }],
      options: [
        { l: 'A', t: '(5, 2, -1, -4)' }, { l: 'B', t: '(5, 2, -1)' },
        { l: 'C', t: '(5, 2, -1, -4, -7)' }, { l: 'D', t: '(-5, -2, 1, 4)' }, { l: 'E', t: '()' }
      ],
      answer: 'A',
      explanation: '5, 2, -1, -4. The next value -7 lies beyond the stop of -5, so generation halts. -4 is produced because -4 > -5.'
    },
    {
      n: 6, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> tuple(map(lambda x, y: x * y, (1, 2, 3), (4, 5)))' }],
      options: [
        { l: 'A', t: '(4, 10, None)' }, { l: 'B', t: '(4, 10)' }, { l: 'C', t: '(4, 10, 3)' },
        { l: 'D', t: '(5, 7)' }, { l: 'E', t: 'Error — the iterables differ in length' }
      ],
      answer: 'B',
      explanation: 'map accepts several iterables and stops when the shortest is exhausted. The 3 is silently dropped and no error is raised.'
    },
    {
      n: 7, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> (1, 2) + (3,) * 2' }],
      options: [
        { l: 'A', t: '(1, 2, 6)' }, { l: 'B', t: '(1, 2, (3, 3))' }, { l: 'C', t: '(1, 2, 3, 3)' },
        { l: 'D', t: '(1, 2, 3, 1, 2, 3)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: '* binds tighter than +, so (3,) * 2 is (3, 3) and concatenation flattens it to the right.'
    },
    {
      n: 8, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> len('') or len('ab')" }],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: '0' }, { l: 'C', t: 'Error' },
        { l: 'D', t: '2' }, { l: 'E', t: 'False' }
      ],
      answer: 'D',
      explanation: "or returns the first truthy operand, otherwise the last one. len('') is 0 (falsy), so the value of the whole expression is len('ab') = 2 — not the Boolean True."
    },
    {
      n: 9, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is printed?' },
        { code: 'count = 0\nfor i in range(1, 5):\n    for j in range(i, 5):\n        count += 1\nprint(count)' }
      ],
      options: [
        { l: 'A', t: '16' }, { l: 'B', t: '10' }, { l: 'C', t: '12' },
        { l: 'D', t: '6' }, { l: 'E', t: '20' }
      ],
      answer: 'B',
      explanation: 'The inner loop runs 5 - i times: 4 + 3 + 2 + 1 = 10. Assuming a fixed inner count of 4 gives the distractor 16.'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is printed?' },
        { code: "res = ''\nn = 26\nwhile n > 0:\n    res = str(n % 2) + res\n    n = n // 2\nprint(res)" }
      ],
      options: [
        { l: 'A', t: '01011' }, { l: 'B', t: '1101' }, { l: 'C', t: '11010' },
        { l: 'D', t: '11011' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: "Remainders come out 0, 1, 0, 1, 1 but each is prepended, building '0', '10', '010', '1010', '11010' — binary 26. Appending instead would give 01011."
    },
    {
      n: 11, marks: 1, type: 'mcq',
      stem: [
        { p: 'What sequence is printed?' },
        { code: "def p(n):\n    if n == 0:\n        return 0\n    print(n % 10, end=' ')\n    return p(n // 10)\n\n>>> p(1234)" }
      ],
      options: [
        { l: 'A', t: '1 2 3 4' }, { l: 'B', t: '4 3 2 1' }, { l: 'C', t: '1234' },
        { l: 'D', t: 'Nothing is printed' }, { l: 'E', t: '4321' }
      ],
      answer: 'B',
      explanation: 'The print happens on the way down, before each recursive call, so the least significant digit is printed first.'
    },
    {
      n: 12, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> 8 / 4 * 2' }],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '4.0' }, { l: 'C', t: '1.0' },
        { l: 'D', t: '1' }, { l: 'E', t: '0.5' }
      ],
      answer: 'B',
      explanation: '/ and * share a precedence level and associate left to right: (8 / 4) * 2 = 2.0 * 2 = 4.0. True division always produces a float.'
    },

    {
      n: 13, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given that x has value 3 and y has value 0, what is returned?' },
        { code: '>>> x + x if x != 3 and x // y > 0 else y + y' }
      ],
      options: [
        { l: 'A', t: '6' }, { l: 'B', t: 'ZeroDivisionError' }, { l: 'C', t: '3' },
        { l: 'D', t: '0' }, { l: 'E', t: 'None' }
      ],
      answer: 'D',
      explanation: 'x != 3 is False, so and short-circuits and x // y is never evaluated. The condition is False, so the else branch gives y + y = 0. Reversing the two operands of and would crash.'
    },
    {
      n: 14, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: '>>> from functools import reduce\n>>> reduce(lambda a, b: (b,) + a, (1, 2, 3), ())' }
      ],
      options: [
        { l: 'A', t: '(1, 2, 3)' }, { l: 'B', t: '((3,), (2,), (1,))' }, { l: 'C', t: '(3, 2, 1)' },
        { l: 'D', t: '6' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: 'The accumulator starts at () and each element is prepended: (1,), (2, 1), (3, 2, 1). reduce walks left to right, but the prepend reverses the result.'
    },
    {
      n: 15, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'def fun(a, b):\n    b = 2\n    return lambda b, c: 100 * a + 10 * b + c' },
        { p: 'What is the result of `(fun(1, 9))(3, 4)`?' }
      ],
      options: [
        { l: 'A', t: '124' }, { l: 'B', t: '194' }, { l: 'C', t: '234' },
        { l: 'D', t: '134' }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: "The lambda's own parameter b shadows both fun's parameter b and the assignment b = 2. So b = 3, c = 4 and a = 1 is captured from the enclosing scope: 100 + 30 + 4 = 134."
    },
    {
      n: 16, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: "def D(m, x):\n    print(m, end=' ')\n    return x" },
        { p: 'What sequence is printed by:' },
        { code: ">>> D('P', True) or D('Q', False) and D('R', True)" }
      ],
      options: [
        { l: 'A', t: 'P Q' }, { l: 'B', t: 'P Q R' }, { l: 'C', t: 'P' },
        { l: 'D', t: 'P R' }, { l: 'E', t: 'Nothing is printed' }
      ],
      answer: 'C',
      explanation: "and binds tighter than or, so this is D('P', True) or (D('Q', False) and D('R', True)). The first call returns True, or short-circuits and the entire right operand is skipped. Evaluating it wrongly as (P or Q) and R would print P R."
    },
    {
      n: 17, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'def g(n):\n    if n <= 1:\n        return 1\n    return g(n - 1) + g(n - 2)' },
        { p: 'How many times is g called in total when evaluating `g(5)`? (Count the initial call.)' }
      ],
      options: [
        { l: 'A', t: '9' }, { l: 'B', t: '8' }, { l: 'C', t: '5' },
        { l: 'D', t: '11' }, { l: 'E', t: '15' }
      ],
      answer: 'E',
      explanation: 'C(0) = C(1) = 1 and C(n) = 1 + C(n-1) + C(n-2), giving C(2) = 3, C(3) = 5, C(4) = 9, C(5) = 15. The distractor 8 is the value returned by g(5), not the call count.'
    },
    {
      n: 18, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'x = 2\ny = 3\ndef fun(g, h, a, b):\n    return g(a) + h(b)' },
        { p: 'What is the result of:' },
        { code: '>>> fun(lambda x: x - y, lambda y: x * y, 7, 4)' }
      ],
      options: [
        { l: 'A', t: '12' }, { l: 'B', t: '5' }, { l: 'C', t: '15' },
        { l: 'D', t: '25' }, { l: 'E', t: '31' }
      ],
      answer: 'A',
      explanation: 'Each lambda parameter shadows the global of the same name only inside its own body. First lambda: parameter x = 7, global y = 3 → 4. Second: parameter y = 4, global x = 2 → 8. Total 12.'
    },
    {
      n: 19, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: '>>> tup = (2, (3, 1), 4, (0, 5))\n>>> tup[ tup[-1][0] ][1]' }
      ],
      options: [
        { l: 'A', t: '2' }, { l: 'B', t: '3' }, { l: 'C', t: 'Error' },
        { l: 'D', t: '1' }, { l: 'E', t: '5' }
      ],
      answer: 'C',
      explanation: 'tup[-1] is (0, 5), whose [0] is 0, so tup[0] is the integer 2 — and 2[1] raises TypeError, since integers are not subscriptable.'
    },
    {
      n: 20, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: ">>> tuple(filter(lambda c: '0' < c < '9', 'CS1010E'))" }
      ],
      options: [
        { l: 'A', t: "('1', '0', '1', '0')" }, { l: 'B', t: "('11',)" }, { l: 'C', t: "('1', '1')" },
        { l: 'D', t: "('1010',)" }, { l: 'E', t: '()' }
      ],
      answer: 'C',
      explanation: "Both comparisons are strict, so '0' fails the left-hand test and only the two '1' characters survive."
    },
    {
      n: 21, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given that a and b are positive integers, which of the following is always True?' }
      ],
      options: [
        { l: 'A', t: 'a // b >= 1' }, { l: 'B', t: 'a % b < b' }, { l: 'C', t: 'a % b > 0' },
        { l: 'D', t: 'a // b < b' }, { l: 'E', t: 'a % b < a' }
      ],
      answer: 'B',
      explanation: 'The remainder is always strictly less than the divisor. a % b > 0 fails when b divides a; a % b < a fails when a < b (then a % b == a); a // b >= 1 fails when a < b.'
    },
    {
      n: 22, marks: 2, type: 'mcq',
      stem: [
        { p: 'Let t be a tuple, and f and g be one-argument functions returning a Boolean. Which expression is always equivalent to:' },
        { code: 'tuple(filter(f, filter(g, t)))' }
      ],
      options: [
        { l: 'A', t: 'tuple(filter(lambda x: f(x) and g(x), t))' },
        { l: 'B', t: 'tuple(filter(lambda x: f(x) or g(x), t))' },
        { l: 'C', t: 'tuple(filter(lambda x: g(x) and f(x), t))' },
        { l: 'D', t: 'Both the f(x) and g(x) and g(x) and f(x) versions' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'C',
      explanation: 'The inner filter runs first, so f only ever sees elements that already satisfy g. Because and short-circuits, g(x) and f(x) preserves that protection; f(x) and g(x) calls f on elements g would have removed, which can raise an error (e.g. int(x) on a non-digit).'
    },

    {
      n: 23, marks: 3, type: 'fib',
      stem: [
        { p: '`every_other(t)` returns a tuple of every second element of t, starting with the first.' },
        { code: '>>> every_other((1, 2, 3, 4, 5))\n(1, 3, 5)\n>>> every_other(())\n()' },
        { code: 'def every_other(t):\n    if len(t) == 0:\n        return ()\n    return {{1}} + every_other({{2}})' }
      ],
      blanks: [
        { n: 1, answer: '(t[0],)' },
        { n: 2, answer: 't[2:]' }
      ],
      explanation: 'Blank 1 must be a tuple, so the trailing comma is compulsory — (t[0]) is just an integer and + would raise TypeError. Blank 2 drops two elements, which is what makes the step 2.'
    },
    {
      n: 24, marks: 3, type: 'fib',
      stem: [
        { p: '`dot(t1, t2)` returns the sum of the products of corresponding elements of two equal-length tuples.' },
        { code: '>>> dot((1, 2, 3), (4, 5, 6))\n32' },
        { code: 'def dot(t1, t2):\n    return sum(map(lambda i: {{1}}, range(len(t1))))' }
      ],
      blanks: [
        { n: 1, answer: 't1[i] * t2[i]' }
      ],
      explanation: 'The lambda receives an index, not an element — the range(len(t1)) is the clue.'
    },
    {
      n: 25, marks: 3, type: 'fib',
      stem: [
        { p: '`to_base(n, b)` returns the string representation of positive integer n in base b, for 2 <= b <= 9.' },
        { code: ">>> to_base(26, 2)\n'11010'\n>>> to_base(255, 8)\n'377'" },
        { code: "def to_base(n, b):\n    if n == 0:\n        return ''\n    return {{1}} + {{2}}" }
      ],
      blanks: [
        { n: 1, answer: 'to_base(n // b, b)' },
        { n: 2, answer: 'str(n % b)' }
      ],
      explanation: 'The recursive call must come first so the most significant digit ends up leftmost. str is required — + between a string and an int is a TypeError.'
    },
    {
      n: 26, marks: 4, type: 'fib',
      stem: [
        { p: 'A polynomial is represented as a tuple of coefficients starting with the lowest power, so 3 - 4x + 2x^2 + x^3 is (3, -4, 2, 1). `polyval(p, v)` takes such a tuple and an iterable of x values, and returns a tuple of evaluated results.' },
        { code: '>>> polyval((4, 3), (0, 1, 2))\n(4, 7, 10)\n>>> polyval((5, 0, -2), range(0, 4))\n(5, 3, -3, -13)' },
        { code: 'def polyval(p, v):\n    f = lambda x: sum(map(lambda i: {{1}}, range(len(p))))\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: 'p[i] * x**i' },
        { n: 2, answer: 'tuple(map(f, v))' }
      ],
      explanation: 'Lowest-power-first means the index and the exponent coincide. Blank 2 must wrap in tuple — returning the bare map object would fail the test cases.'
    },
    {
      n: 27, marks: 3, type: 'fib',
      stem: [
        { p: '`rev(t)` returns the tuple t reversed.' },
        { code: '>>> rev((1, 2, 3, 4))\n(4, 3, 2, 1)' },
        { code: 'def rev(t):\n    if not t:\n        return ()\n    return {{1}} + {{2}}' }
      ],
      blanks: [
        { n: 1, answer: 'rev(t[1:])' },
        { n: 2, answer: '(t[0],)' }
      ],
      explanation: 'The first element must land at the end, so the recursive call goes first. Again the singleton tuple needs its comma.'
    },
    {
      n: 28, marks: 3, type: 'fib',
      stem: [
        { p: 'What is the result of the following evaluation?' },
        { code: '>>> from functools import reduce\n>>> reduce(lambda a, b: a * 10 + b, (1, 2, 3, 4), 0)' }
      ],
      blanks: [{ n: 1, answer: '1234' }],
      explanation: 'Each step shifts the accumulator one decimal place and adds the next digit: 0, 1, 12, 123, 1234.'
    },
    {
      n: 29, marks: 3, type: 'fib',
      stem: [
        { p: 'Given:' },
        { code: 'def twice(f):\n    return lambda x: f(f(x))' },
        { p: 'What is the result of `(twice(lambda x: 2 * x + 1))(3)`?' }
      ],
      blanks: [{ n: 1, answer: '15' }],
      explanation: 'Inner application: 2 * 3 + 1 = 7. Outer: 2 * 7 + 1 = 15.'
    },
    {
      n: 30, marks: 3, type: 'fib',
      stem: [
        { p: 'Given:' },
        { code: "def h(n):\n    if n <= 1:\n        return 'x'\n    return h(n - 1) + h(n - 2) + '.'" },
        { p: 'What is returned by `h(4)`?' }
      ],
      blanks: [{ n: 1, answer: "'xx.x.xx..'" }],
      explanation: "h(2) = 'xx.', h(3) = h(2) + h(1) + '.' = 'xx.x.', h(4) = h(3) + h(2) + '.' = 'xx.x.' + 'xx.' + '.' = 'xx.x.xx..'."
    },
    {
      n: 31, marks: 4, type: 'fib',
      stem: [
        { p: "`gcd(a, b)` returns the greatest common divisor of two non-negative integers, not both zero, using Euclid's method." },
        { code: '>>> gcd(48, 18)\n6\n>>> gcd(17, 5)\n1' },
        { code: 'def gcd(a, b):\n    if b == 0:\n        return {{1}}\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: 'a' },
        { n: 2, answer: 'gcd(b, a % b)' }
      ],
      explanation: 'The argument order swaps on each call, which is what shrinks the problem. gcd(a % b, b) would not terminate correctly.'
    }
  ]
});
