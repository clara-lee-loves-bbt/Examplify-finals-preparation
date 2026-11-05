/* Paper B — from "CS1010E Programming Methodology — Midterm Practice Papers"
   (file: CS1010E Mock Exam 2,3,4,5 (Claude Opus 5).pdf) — 31 questions */
registerExam({
  id: 'paperB',
  title: 'Paper B',
  headerName: 'Paper B',
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
      stem: [{ p: 'What is returned?' }, { code: '>>> 7 // 2 * 2 + 7 % 2' }],
      options: [
        { l: 'A', t: '8' }, { l: 'B', t: '6' }, { l: 'C', t: '7' },
        { l: 'D', t: '3.5' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: '// , * and % share a precedence level and associate left to right: ((7 // 2) * 2) + (7 % 2) = 3 * 2 + 1 = 7.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> 2 * 3 ** 2 ** 0' }],
      options: [
        { l: 'A', t: '18' }, { l: 'B', t: '6' }, { l: 'C', t: '36' },
        { l: 'D', t: '9' }, { l: 'E', t: '2' }
      ],
      answer: 'B',
      explanation: 'Right-associative **: 2 ** 0 = 1, then 3 ** 1 = 3, then 2 * 3 = 6. Left associativity would give (3 ** 2) ** 0 = 1 and the answer 2.'
    },
    {
      n: 3, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> 'abcdef'[1::2]" }],
      options: [
        { l: 'A', t: "'ace'" }, { l: 'B', t: "'bd'" }, { l: 'C', t: "'bdf'" },
        { l: 'D', t: "'abc'" }, { l: 'E', t: "'fdb'" }
      ],
      answer: 'C',
      explanation: "Start at index 1, no stop, step 2: positions 1, 3, 5 → 'b', 'd', 'f'."
    },
    {
      n: 4, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> tuple(range(3))[::-1]' }],
      options: [
        { l: 'A', t: '(2, 1, 0)' }, { l: 'B', t: '(0, 1, 2)' }, { l: 'C', t: '(3, 2, 1)' },
        { l: 'D', t: '()' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'range(3) is 0, 1, 2 and the slice reverses it. Note the tuple(...) is needed before slicing in this form.'
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> (1, 2, 3)[3:]' }],
      options: [
        { l: 'A', t: '(3,)' }, { l: 'B', t: 'Error' }, { l: 'C', t: '(1, 2, 3)' },
        { l: 'D', t: '()' }, { l: 'E', t: 'None' }
      ],
      answer: 'D',
      explanation: 'Slicing past the end is legal and yields an empty tuple. Indexing past the end — (1, 2, 3)[3] — would raise IndexError, and that distinction is examined often.'
    },
    {
      n: 6, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> 'a' * 3 + 'b' * 0" }],
      options: [
        { l: 'A', t: "'aaab'" }, { l: 'B', t: "'aaa'" }, { l: 'C', t: "'aaa0'" },
        { l: 'D', t: "'ab'" }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: "Repeating a string zero times gives the empty string, which concatenates harmlessly."
    },
    {
      n: 7, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> tuple(map(lambda x: x % 3, range(4)))' }],
      options: [
        { l: 'A', t: '(0, 1, 2, 3)' }, { l: 'B', t: '(1, 2, 0, 1)' }, { l: 'C', t: '(0, 1, 2)' },
        { l: 'D', t: '(0, 1, 2, 0)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: 'range(4) is 0, 1, 2, 3 and each is taken mod 3 → 0, 1, 2, 0. Four inputs give four outputs.'
    },
    {
      n: 8, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> 'even' if 10 % 4 == 0 else 'odd'" }],
      options: [
        { l: 'A', t: "'even'" }, { l: 'B', t: "'odd'" }, { l: 'C', t: 'True' },
        { l: 'D', t: '2' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: '10 % 4 is 2, not 0, so the condition is False and the else expression is evaluated.'
    },
    {
      n: 9, marks: 1, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'def f(x):\n    y = x + 1\n    def g(z):\n        return y * z\n    return g(x)' },
        { p: 'What is the result of `f(3)`?' }
      ],
      options: [
        { l: 'A', t: '9' }, { l: 'B', t: '12' }, { l: 'C', t: '16' },
        { l: 'D', t: '4' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: 'y is 4 and is visible inside g through the enclosing scope. g(3) = 4 * 3 = 12.'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the value of s after this runs?' },
        { code: 's = 0\nfor i in range(10, 0, -3):\n    s += i' }
      ],
      options: [
        { l: 'A', t: '25' }, { l: 'B', t: '18' }, { l: 'C', t: '22' },
        { l: 'D', t: '30' }, { l: 'E', t: '0' }
      ],
      answer: 'C',
      explanation: 'The loop visits 10, 7, 4, 1 (the next value, -2, is past the stop of 0). Sum is 22.'
    },
    {
      n: 11, marks: 1, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'def r(n):\n    if n < 10:\n        return n\n    return n % 10 + r(n // 10)' },
        { p: 'What is returned by `r(2409)`?' }
      ],
      options: [
        { l: 'A', t: '15' }, { l: 'B', t: '2409' }, { l: 'C', t: '6' },
        { l: 'D', t: '9' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'This is a digit sum: 9 + 0 + 4 + 2 = 15. The base case fires when a single digit remains.'
    },
    {
      n: 12, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> len(tuple(range(-5, 5, 2)))' }],
      options: [
        { l: 'A', t: '6' }, { l: 'B', t: '4' }, { l: 'C', t: '5' },
        { l: 'D', t: '10' }, { l: 'E', t: '0' }
      ],
      answer: 'C',
      explanation: '-5, -3, -1, 1, 3 — five values. The next, 5, equals the stop and is excluded.'
    },

    {
      n: 13, marks: 2, type: 'mcq',
      stem: [{ p: 'Which of the following evaluates to True?' }],
      options: [
        { l: 'A', t: '0.1 + 0.2 == 0.3' }, { l: 'B', t: '0.1 + 0.2 < 0.3' },
        { l: 'C', t: 'abs(0.1 + 0.2 - 0.3) < 1e-15' }, { l: 'D', t: '0.1 + 0.2 - 0.3 == 0' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'C',
      explanation: '0.1 + 0.2 is 0.30000000000000004, so it is greater than 0.3 and not equal to it. Equality of floats must be tested against a tolerance.'
    },
    {
      n: 14, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: '>>> from functools import reduce\n>>> reduce(lambda a, b: a + (a[-1] + b,), (1, 2, 3), (0,))' }
      ],
      options: [
        { l: 'A', t: '(0, 1, 3, 6)' }, { l: 'B', t: '(1, 3, 6)' }, { l: 'C', t: '(0, 1, 2, 3)' },
        { l: 'D', t: '6' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'A running-total build. The accumulator starts (0,); each step appends last + b: (0,1), (0,1,3), (0,1,3,6). The initializer is essential — without it a[-1] would fail on the first step.'
    },
    {
      n: 15, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'def adder(n):\n    return lambda x: x + n' },
        { p: 'What is returned by `tuple(map(adder(10), range(3)))`?' }
      ],
      options: [
        { l: 'A', t: '(0, 1, 2)' }, { l: 'B', t: '(10, 10, 10)' }, { l: 'C', t: '(11, 12, 13)' },
        { l: 'D', t: '(10, 11, 12)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: 'adder(10) is a function that adds 10, and it is mapped over 0, 1, 2. This is the partial-application pattern from Lecture 3.'
    },
    {
      n: 16, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: "def D(m, x):\n    print(m, end=' ')\n    return x" },
        { p: 'What sequence is printed by:' },
        { code: ">>> D('A', False) and D('B', True) or D('C', True)" }
      ],
      options: [
        { l: 'A', t: 'A B C' }, { l: 'B', t: 'A C' }, { l: 'C', t: 'A' },
        { l: 'D', t: 'A B' }, { l: 'E', t: 'C' }
      ],
      answer: 'B',
      explanation: "and binds tighter: (D('A', False) and D('B', True)) or D('C', True). The and short-circuits on False so B is never called; the or must then evaluate its right operand, printing C."
    },
    {
      n: 17, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is printed?' },
        { code: 'a, b = 0, 1\nn = 0\nwhile b < 50:\n    a, b = b, a + b\n    n += 1\nprint(n, b)' }
      ],
      options: [
        { l: 'A', t: '8 34' }, { l: 'B', t: '9 34' }, { l: 'C', t: '9 55' },
        { l: 'D', t: '10 55' }, { l: 'E', t: '8 55' }
      ],
      answer: 'C',
      explanation: 'Simultaneous assignment advances the Fibonacci pair. b runs 1, 1, 2, 3, 5, 8, 13, 21, 34, 55; the loop exits once b reaches 55, after 9 iterations.'
    },
    {
      n: 18, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the value of c after this runs?' },
        { code: 'c = 0\nfor i in range(4):\n    for j in range(4):\n        if i + j == 3:\n            c += 1' }
      ],
      options: [
        { l: 'A', t: '3' }, { l: 'B', t: '4' }, { l: 'C', t: '6' },
        { l: 'D', t: '16' }, { l: 'E', t: '1' }
      ],
      answer: 'B',
      explanation: 'The pairs (0,3), (1,2), (2,1), (3,0) all satisfy the condition — four of the sixteen.'
    },
    {
      n: 19, marks: 2, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> chr(ord('z') - ord('c') + ord('C'))" }],
      options: [
        { l: 'A', t: "'z'" }, { l: 'B', t: "'W'" }, { l: 'C', t: "'C'" },
        { l: 'D', t: "'Z'" }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: "ord('z') - ord('c') is the offset of the letter within its case (23). Adding it to ord('C') moves to the same offset in uppercase → 'Z'."
    },
    {
      n: 20, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: '>>> tuple(map(lambda x: x**2, filter(lambda x: x % 2, range(6))))' }
      ],
      options: [
        { l: 'A', t: '(0, 4, 16)' }, { l: 'B', t: '(1, 3, 5)' }, { l: 'C', t: '(1, 9, 25)' },
        { l: 'D', t: '(1, 9, 25, 49)' }, { l: 'E', t: '()' }
      ],
      answer: 'C',
      explanation: 'x % 2 is used as a truth value: 1 is truthy and 0 is falsy, so the filter keeps the odd numbers 1, 3, 5. Squaring gives 1, 9, 25.'
    },
    {
      n: 21, marks: 2, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> sum(i for i in range(5) if i % 2 == 0)' }],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '6' }, { l: 'C', t: '10' },
        { l: 'D', t: '0' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: 'The generator expression yields 0, 2, 4 and sum aggregates to 6.'
    },
    {
      n: 22, marks: 2, type: 'mcq',
      stem: [
        { p: 'Let t be a tuple of numbers and f a one-argument numeric function. Which expression always produces the same value as `sum(map(f, t))`?' }
      ],
      options: [
        { l: 'A', t: 'reduce(lambda a, b: f(a) + f(b), t, 0)' },
        { l: 'B', t: 'reduce(lambda a, b: a + b, t, 0)' },
        { l: 'C', t: 'sum(filter(f, t))' },
        { l: 'D', t: 'reduce(lambda a, b: a + f(b), t, 0)' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'D',
      explanation: 'The accumulator is already a plain number and must not be passed through f again — only the incoming element b is transformed. Option A applies f to the running total on every step.'
    },

    {
      n: 23, marks: 3, type: 'fib',
      stem: [
        { p: '`count_digits(n)` returns the number of decimal digits in a positive integer n.' },
        { code: '>>> count_digits(4071)\n4\n>>> count_digits(9)\n1' },
        { code: 'def count_digits(n):\n    c = 0\n    while {{1}}:\n        c += 1\n        n = {{2}}\n    return c' }
      ],
      blanks: [
        { n: 1, answer: 'n > 0' },
        { n: 2, answer: 'n // 10' }
      ],
      explanation: 'Integer division, not /. A float would never reach 0 exactly and the loop would misbehave. n > 0 terminates; n != 0 also works for positive n but is riskier.'
    },
    {
      n: 24, marks: 3, type: 'fib',
      stem: [
        { p: '`tup_sum(t)` returns the sum of the elements of a tuple of numbers, recursively.' },
        { code: '>>> tup_sum((3, -1, 4, 1))\n7\n>>> tup_sum(())\n0' },
        { code: 'def tup_sum(t):\n    if len(t) == 0:\n        return {{1}}\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: '0' },
        { n: 2, answer: 't[0] + tup_sum(t[1:])' }
      ],
      explanation: '0 is the identity for addition, which is why it is the right base value for the empty tuple.'
    },
    {
      n: 25, marks: 3, type: 'fib',
      stem: [
        { p: '`mymax(t)` returns the largest element of a non-empty tuple, recursively.' },
        { code: '>>> mymax((3, 9, 2))\n9\n>>> mymax((5,))\n5' },
        { code: 'def mymax(t):\n    if len(t) == 1:\n        return {{1}}\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: 't[0]' },
        { n: 2, answer: 'max(t[0], mymax(t[1:]))' }
      ],
      explanation: 'The base case must return the element, not the tuple. t[0] if t[0] > mymax(t[1:]) else mymax(t[1:]) also works but evaluates the recursion twice.'
    },
    {
      n: 26, marks: 3, type: 'fib',
      stem: [
        { p: 'What is the result of the following evaluation?' },
        { code: ">>> from functools import reduce\n>>> reduce(lambda a, b: b + a, 'abc', '')" }
      ],
      blanks: [{ n: 1, answer: "'cba'" }],
      explanation: 'A string is iterable, so the elements are characters. Each is prepended to the accumulator, reversing the string.'
    },
    {
      n: 27, marks: 3, type: 'fib',
      stem: [
        { p: 'Given:' },
        { code: 'def comp(f, g):\n    return lambda x: f(g(x))' },
        { p: 'What is the result of `comp(lambda x: x + 1, lambda x: x * 3)(4)`?' }
      ],
      blanks: [{ n: 1, answer: '13' }],
      explanation: 'g runs first: 4 * 3 = 12, then f: 12 + 1 = 13. Reversing the order would give 15 — read which function is applied innermost.'
    },
    {
      n: 28, marks: 3, type: 'fib',
      stem: [
        { p: '`cnt_occ(n, d)` counts how many times digit d occurs in the positive integer n.' },
        { code: '>>> cnt_occ(121301, 1)\n3\n>>> cnt_occ(2222, 2)\n4' },
        { code: 'def cnt_occ(n, d):\n    if n == 0:\n        return 0\n    return {{1}} + cnt_occ({{2}}, d)' }
      ],
      blanks: [
        { n: 1, answer: '(1 if n % 10 == d else 0)' },
        { n: 2, answer: 'n // 10' }
      ],
      explanation: 'A conditional expression is the cleanest fit for blank 1; (n % 10 == d) alone also works since a Boolean is an int in arithmetic context.'
    },
    {
      n: 29, marks: 3, type: 'fib',
      stem: [
        { p: '`fib(k)` returns the k-th Fibonacci number, with fib(0) = 0 and fib(1) = 1.' },
        { code: '>>> tuple(map(fib, range(8)))\n(0, 1, 1, 2, 3, 5, 8, 13)' },
        { code: 'def fib(k):\n    return {{1}} if {{2}} else {{3}}' }
      ],
      blanks: [
        { n: 1, answer: 'k' },
        { n: 2, answer: 'k <= 1' },
        { n: 3, answer: 'fib(k - 1) + fib(k - 2)' }
      ],
      explanation: 'Returning k rather than a literal covers both base cases at once — that is why the recurrence in Lecture 5 is written with k on the base branch.'
    },
    {
      n: 30, marks: 4, type: 'fib',
      stem: [
        { p: 'Polynomials are tuples of coefficients, lowest power first, possibly of different lengths. `polyadd` returns their sum.' },
        { code: '>>> polyadd((3, -4, 2, 1), (5, 0, -1))\n(8, -4, 1, 1)\n>>> polyadd((1, 2), (3, 4, 5, 6))\n(4, 6, 5, 6)' },
        { code: 'def polyadd(p1, p2):\n    n = max(len(p1), len(p2))\n    g = lambda p, i: {{1}}\n    return tuple(map(lambda i: g(p1, i) + g(p2, i), range(n)))' }
      ],
      blanks: [
        { n: 1, answer: 'p[i] if i < len(p) else 0' }
      ],
      explanation: 'The missing coefficients of the shorter polynomial must read as 0, which is exactly what the guard supplies. Indexing without the guard raises IndexError.'
    },
    {
      n: 31, marks: 4, type: 'fib',
      stem: [
        { p: '`linspace(start, end, num)` returns a tuple of num equally spaced values from start to end inclusive, with num >= 2.' },
        { code: '>>> linspace(1.0, 10.0, 10)\n(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0)\n>>> linspace(1.0, 10.0, 9)\n(1.0, 2.125, 3.25, 4.375, 5.5, 6.625, 7.75, 8.875, 10.0)' },
        { code: 'def linspace(start, end, num):\n    return tuple(map(lambda i: {{1}} + start, range(num)))' }
      ],
      blanks: [
        { n: 1, answer: 'i * (end - start) / (num - 1)' }
      ],
      explanation: 'The denominator is num - 1, not num — there are num - 1 gaps between num points. Using num misses the endpoint.'
    }
  ]
});
