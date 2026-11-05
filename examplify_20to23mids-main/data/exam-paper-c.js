/* Paper C — from "CS1010E Programming Methodology — Midterm Practice Papers"
   (file: CS1010E Mock Exam 2,3,4,5 (Claude Opus 5).pdf) — 31 questions */
registerExam({
  id: 'paperC',
  title: 'Paper C',
  headerName: 'Paper C',
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
      stem: [{ p: 'What is returned?' }, { code: '>>> 10 - 2 - 3 * 2 ** 2' }],
      options: [
        { l: 'A', t: '20' }, { l: 'B', t: '-4' }, { l: 'C', t: '-14' },
        { l: 'D', t: '44' }, { l: 'E', t: '-2' }
      ],
      answer: 'B',
      explanation: '** first (4), then * (12), then the subtractions left to right: 10 - 2 = 8, 8 - 12 = -4.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> 2 ** -1' }],
      options: [
        { l: 'A', t: '0' }, { l: 'B', t: '0.5' }, { l: 'C', t: '-2' },
        { l: 'D', t: '2' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: 'A negative exponent produces a float reciprocal. This is one of the few places ** gives a float from two ints.'
    },
    {
      n: 3, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> (True + True) * 2' }],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '2' }, { l: 'C', t: 'True' },
        { l: 'D', t: '1' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'Booleans are integers in arithmetic context: True + True = 2, times 2 = 4.'
    },
    {
      n: 4, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> 'hello'[::-1][1]" }],
      options: [
        { l: 'A', t: "'e'" }, { l: 'B', t: "'o'" }, { l: 'C', t: "'h'" },
        { l: 'D', t: "'l'" }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: "The reverse is 'olleh'; index 1 of that is 'l'. Slicing happens before indexing, not the other way round."
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> ('a', 'b') * 2 + ('c',)" }],
      options: [
        { l: 'A', t: "('a', 'b', 'c', 'a', 'b', 'c')" }, { l: 'B', t: "('aa', 'bb', 'c')" },
        { l: 'C', t: "('a', 'b', 'a', 'b', 'c')" }, { l: 'D', t: "('a', 'b', 2, 'c')" },
        { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: '* repeats the whole tuple and binds tighter than +.'
    },
    {
      n: 6, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> tuple(range(0))' }],
      options: [
        { l: 'A', t: '(0,)' }, { l: 'B', t: '()' }, { l: 'C', t: 'Error' },
        { l: 'D', t: 'None' }, { l: 'E', t: '0' }
      ],
      answer: 'B',
      explanation: 'range(0) is empty, so the tuple is empty — not (0,).'
    },
    {
      n: 7, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> ('x') + ('y',)" }],
      options: [
        { l: 'A', t: "('x', 'y')" }, { l: 'B', t: "'xy'" }, { l: 'C', t: 'Error' },
        { l: 'D', t: "('xy',)" }, { l: 'E', t: "('x',)" }
      ],
      answer: 'C',
      explanation: "('x') is just the string 'x' — parentheses without a comma do not make a tuple. Concatenating a string with a tuple is a TypeError."
    },
    {
      n: 8, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> int('7') + ord('0')" }],
      options: [
        { l: 'A', t: '7' }, { l: 'B', t: '48' }, { l: 'C', t: '55' },
        { l: 'D', t: "'70'" }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: "int('7') is 7 and ord('0') is 48, so 55. Note int('7') is equivalent to ord('7') - ord('0')."
    },
    {
      n: 9, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> 1 if 0 else 2 if 0 else 3' }],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '2' }, { l: 'C', t: '0' },
        { l: 'D', t: '3' }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: 'Conditional expressions associate to the right: 1 if 0 else (2 if 0 else 3). Both conditions are falsy (0), so the answer is 3.'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the value of r after this runs?' },
        { code: "r = ''\nfor c in 'abcd':\n    r = c + r" }
      ],
      options: [
        { l: 'A', t: "'abcd'" }, { l: 'B', t: "'dcba'" }, { l: 'C', t: "'a'" },
        { l: 'D', t: "'d'" }, { l: 'E', t: "''" }
      ],
      answer: 'B',
      explanation: 'Each character is prepended, so the string is built in reverse. A string is iterable over its characters.'
    },
    {
      n: 11, marks: 1, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'def f(n):\n    if n == 0:\n        return 1\n    return n * f(n - 1)' },
        { p: 'What is the result of `f(0) + f(3)`?' }
      ],
      options: [
        { l: 'A', t: '6' }, { l: 'B', t: '9' }, { l: 'C', t: '7' },
        { l: 'D', t: '1' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: 'This is factorial: f(0) = 1 and f(3) = 6, so 7. Answering 6 means forgetting that 0! is 1.'
    },
    {
      n: 12, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> max(map(len, ('a', 'bbb', 'cc')))" }],
      options: [
        { l: 'A', t: "'bbb'" }, { l: 'B', t: '2' }, { l: 'C', t: '3' },
        { l: 'D', t: '6' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: 'map produces the lengths 1, 3, 2 and max takes the largest of those numbers — not the longest string.'
    },

    {
      n: 13, marks: 2, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> sum(range(1, 10, 2))' }],
      options: [
        { l: 'A', t: '20' }, { l: 'B', t: '45' }, { l: 'C', t: '25' },
        { l: 'D', t: '16' }, { l: 'E', t: '9' }
      ],
      answer: 'C',
      explanation: '1 + 3 + 5 + 7 + 9 = 25: the five odd numbers below 10.'
    },
    {
      n: 14, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: ">>> from functools import reduce\n>>> reduce(lambda a, b: a + str(b), range(4), '')" }
      ],
      options: [
        { l: 'A', t: "'0123'" }, { l: 'B', t: "'123'" }, { l: 'C', t: "'3210'" },
        { l: 'D', t: '6' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: "The initializer '' makes the accumulator a string, so + concatenates. Without the initializer the accumulator would start as the int 0 and 0 + str(1) would raise a TypeError."
    },
    {
      n: 15, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'def mk(n):\n    def inner(x):\n        return x ** n\n    return inner' },
        { p: 'What is returned by `tuple(map(mk(3), (1, 2, 3)))`?' }
      ],
      options: [
        { l: 'A', t: '(3, 6, 9)' }, { l: 'B', t: '(1, 2, 3)' }, { l: 'C', t: '(1, 4, 9)' },
        { l: 'D', t: '(1, 8, 27)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: 'mk(3) captures n = 3 and returns the cubing function. Option C is the result of confusing base and exponent.'
    },
    {
      n: 16, marks: 2, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> t = ()\n>>> t and t[0]' }],
      options: [
        { l: 'A', t: '()' }, { l: 'B', t: 'False' }, { l: 'C', t: 'IndexError' },
        { l: 'D', t: 'True' }, { l: 'E', t: 'None' }
      ],
      answer: 'A',
      explanation: 'and returns the first falsy operand itself, not the Boolean False. The empty tuple is falsy, so t[0] is never evaluated and no IndexError occurs.'
    },
    {
      n: 17, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is printed?' },
        { code: 'n = 100\nc = 0\nwhile n > 1:\n    n = n // 3\n    c += 1\nprint(n, c)' }
      ],
      options: [
        { l: 'A', t: '1 5' }, { l: 'B', t: '1 4' }, { l: 'C', t: '0 4' },
        { l: 'D', t: '3 4' }, { l: 'E', t: 'Infinite loop' }
      ],
      answer: 'B',
      explanation: '100 → 33 → 11 → 3 → 1: four iterations, and the loop exits with n = 1.'
    },
    {
      n: 18, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the value of s after this runs?' },
        { code: 's = 0\nfor i in range(1, 4):\n    for j in range(1, 4):\n        s += i * j' }
      ],
      options: [
        { l: 'A', t: '18' }, { l: 'B', t: '9' }, { l: 'C', t: '36' },
        { l: 'D', t: '45' }, { l: 'E', t: '14' }
      ],
      answer: 'C',
      explanation: 'The double sum factorises: (1 + 2 + 3) * (1 + 2 + 3) = 36. Recognising that saves tracing nine iterations under time pressure.'
    },
    {
      n: 19, marks: 2, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> '0123456789'[2:8][1:5][::-2]" }],
      options: [
        { l: 'A', t: "'46'" }, { l: 'B', t: "'3456'" }, { l: 'C', t: "'65'" },
        { l: 'D', t: "'64'" }, { l: 'E', t: "''" }
      ],
      answer: 'D',
      explanation: "First slice: '234567'. Second: '3456'. Then step -2 from the end: '6', '4' → '64'. Work strictly left to right."
    },
    {
      n: 20, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: '>>> tuple(filter(lambda t: len(t) > 1, ((1,), (2, 3), (), (4, 5, 6))))' }
      ],
      options: [
        { l: 'A', t: '((1,), (2, 3))' }, { l: 'B', t: '((2, 3), (4, 5, 6))' },
        { l: 'C', t: '((2, 3),)' }, { l: 'D', t: '()' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: 'The elements of the outer tuple are themselves tuples, and only those of length 2 and 3 survive.'
    },
    {
      n: 21, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: '>>> (all(map(lambda x: x > 0, ())), any(map(lambda x: x > 0, ())))' }
      ],
      options: [
        { l: 'A', t: '(False, True)' }, { l: 'B', t: '(True, True)' }, { l: 'C', t: '(True, False)' },
        { l: 'D', t: '(False, False)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: 'Empty-iterable convention: all is vacuously True and any is False. Both appear on the cheatsheet and both are easy marks if you have read them.'
    },
    {
      n: 22, marks: 2, type: 'mcq',
      stem: [{ p: 'For any tuple t, which expression always produces the same value as `t[::-1]`?' }],
      options: [
        { l: 'A', t: 'tuple(map(lambda i: t[-i], range(len(t))))' },
        { l: 'B', t: 't[len(t):0:-1]' },
        { l: 'C', t: 'tuple(map(lambda i: t[len(t) - 1 - i], range(len(t))))' },
        { l: 'D', t: 't[::-1][::-1]' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'C',
      explanation: 'Option A starts at t[0] (since -0 is 0) and then walks backwards, wrong order. Option B loses the first element. Option D is the original tuple. The arithmetic index in C maps 0 to the last position.'
    },

    {
      n: 23, marks: 3, type: 'fib',
      stem: [
        { p: '`contains(t, x)` returns whether x appears in the tuple t, recursively and without using `in` on t.' },
        { code: '>>> contains((1, 2, 3), 2)\nTrue\n>>> contains((), 1)\nFalse' },
        { code: 'def contains(t, x):\n    if len(t) == 0:\n        return {{1}}\n    return {{2}} or contains(t[1:], x)' }
      ],
      blanks: [
        { n: 1, answer: 'False' },
        { n: 2, answer: 't[0] == x' }
      ],
      explanation: 'False is the identity for or, which is why it is the right base value. Short-circuiting means the recursion stops as soon as a match is found.'
    },
    {
      n: 24, marks: 3, type: 'fib',
      stem: [
        { p: '`zip_tup(t1, t2)` takes two tuples of equal length and interleaves them.' },
        { code: '>>> zip_tup((1, 2, 3, 4), (5, 6, 7, 8))\n(1, 5, 2, 6, 3, 7, 4, 8)' },
        { code: 'def zip_tup(t1, t2):\n    if len(t1) == 0:\n        return ()\n    return {{1}} + zip_tup({{2}}, {{3}})' }
      ],
      blanks: [
        { n: 1, answer: '(t1[0], t2[0])' },
        { n: 2, answer: 't1[1:]' },
        { n: 3, answer: 't2[1:]' }
      ],
      explanation: 'Blank 1 is a two-element tuple, so no trailing comma is needed here — unlike a singleton. Both tuples must be shortened in step.'
    },
    {
      n: 25, marks: 3, type: 'fib',
      stem: [
        { p: 'What is the result of the following evaluation?' },
        { code: '>>> from functools import reduce\n>>> reduce(lambda a, b: (a[0] + (a[1] + b,), b), (5, 4, 3, 2)[1:], ((), 5))[0]' }
      ],
      blanks: [{ n: 1, answer: '(9, 7, 5)' }],
      explanation: 'The accumulator is a pair: a growing tuple plus the previous element. Steps: ((9,), 4) → ((9, 7), 3) → ((9, 7, 5), 2). The trailing [0] discards the carried element. These are the sums of adjacent pairs.'
    },
    {
      n: 26, marks: 3, type: 'fib',
      stem: [
        { p: 'Given:' },
        { code: 'def twice(f):\n    return lambda x: f(f(x))' },
        { p: 'What is the result of `(twice(twice(lambda x: x + 3)))(0)`?' }
      ],
      blanks: [{ n: 1, answer: '12' }],
      explanation: 'The inner twice gives a function adding 6; the outer twice applies that twice, adding 12. Four applications of +3 in total.'
    },
    {
      n: 27, marks: 3, type: 'fib',
      stem: [
        { p: 'Given:' },
        { code: "def hh(n):\n    if n <= 1:\n        return '1'\n    return hh(n - 1) + hh(n - 2) + '#'" },
        { p: 'What is returned by `hh(4)`?' }
      ],
      blanks: [{ n: 1, answer: "'11#1#11##'" }],
      explanation: "hh(2) = '11#', hh(3) = '11#' + '1' + '#' = '11#1#', hh(4) = '11#1#' + '11#' + '#'."
    },
    {
      n: 28, marks: 3, type: 'fib',
      stem: [
        { p: '`even_digits(n)` keeps only the even digits of a non-negative integer, preserving their order.' },
        { code: '>>> even_digits(123456)\n246\n>>> even_digits(12332401)\n2240' },
        { code: 'def even_digits(n):\n    if n == 0:\n        return 0\n    if n % 2 == 0:\n        return {{1}} + {{2}}\n    return {{3}}' }
      ],
      blanks: [
        { n: 1, answer: 'even_digits(n // 10) * 10' },
        { n: 2, answer: 'n % 10' },
        { n: 3, answer: 'even_digits(n // 10)' }
      ],
      explanation: 'The * 10 shifts the accumulated result left to make room for the new digit. Forgetting it collapses the digits.'
    },
    {
      n: 29, marks: 3, type: 'fib',
      stem: [
        { p: 'The bisection method narrows [a, b] until |f(p)| < 1e-6. Complete it.' },
        { code: '>>> bisection(lambda x: x**3 + 4*x**2 - 10, 1, 2)\n1.3652299642562866' },
        { code: 'def bisection(f, a, b):\n    p = (a + b) / 2\n    while abs(f(p)) > 1e-6:\n        if {{1}}:\n            b = p\n        else:\n            a = p\n        p = {{2}}\n    return p' }
      ],
      blanks: [
        { n: 1, answer: 'f(a) * f(p) < 0' },
        { n: 2, answer: '(a + b) / 2' }
      ],
      explanation: 'The root lies in whichever half shows a sign change. Forgetting to recompute p inside the loop gives an infinite loop — a classic Lecture 4 bug.'
    },
    {
      n: 30, marks: 4, type: 'fib',
      stem: [
        { p: 'A polynomial is a tuple of coefficients, lowest power first. `deriv(p)` returns the coefficient tuple of its derivative.' },
        { code: '>>> deriv((3, -4, 2, 1))\n(-4, 4, 3)\n>>> deriv((5,))\n()' },
        { code: 'def deriv(p):\n    return tuple(map(lambda i: {{1}}, range({{2}}, len(p))))' }
      ],
      blanks: [
        { n: 1, answer: 'p[i] * i' },
        { n: 2, answer: '1' }
      ],
      explanation: 'Differentiating p[i] * x**i gives i * p[i] * x**(i-1), so the constant term (i = 0) disappears — hence the range starts at 1. A constant polynomial correctly yields the empty tuple.'
    },
    {
      n: 31, marks: 4, type: 'fib',
      stem: [
        { p: 'From Lecture 5: `park(n)` counts the ways to fill n consecutive parking lots with cars (1 lot) and buses (2 lots).' },
        { code: '>>> tuple(map(park, range(1, 6)))\n(1, 2, 3, 5, 8)' },
        { code: 'def park(n):\n    if n <= 1:\n        return {{1}}\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: '1' },
        { n: 2, answer: 'park(n - 1) + park(n - 2)' }
      ],
      explanation: 'Either the first lot holds a car (leaving n - 1) or a bus (leaving n - 2). park(0) = 1 — the one way to fill nothing — is what makes the base case n <= 1 return 1, and the counts come out Fibonacci-shifted.'
    }
  ]
});
