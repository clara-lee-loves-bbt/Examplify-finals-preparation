/* Paper D — from "CS1010E Programming Methodology — Midterm Practice Papers"
   (file: CS1010E Mock Exam 2,3,4,5 (Claude Opus 5).pdf) — 31 questions */
registerExam({
  id: 'paperD',
  title: 'Paper D',
  headerName: 'Paper D',
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
      stem: [{ p: 'What is returned?' }, { code: '>>> -3 ** 2' }],
      options: [
        { l: 'A', t: '9' }, { l: 'B', t: '-9' }, { l: 'C', t: '6' },
        { l: 'D', t: '-6' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: '** has higher precedence than unary minus, so this is -(3 ** 2) = -9. Only (-3) ** 2 gives 9.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> 17 % -5' }],
      options: [
        { l: 'A', t: '-3' }, { l: 'B', t: '2' }, { l: 'C', t: '3' },
        { l: 'D', t: '-2' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'The remainder takes the sign of the divisor. 17 // -5 = -4, and 17 - (-4 * -5) = -3.'
    },
    {
      n: 3, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> ('abc' < 'abd', 'Z' < 'a')" }],
      options: [
        { l: 'A', t: '(True, False)' }, { l: 'B', t: '(False, True)' }, { l: 'C', t: '(True, True)' },
        { l: 'D', t: '(False, False)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: "Lexicographic comparison stops at the first differing character: 'c' < 'd'. And in ASCII all uppercase letters precede all lowercase, so 'Z' < 'a'."
    },
    {
      n: 4, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> (1, 2, 3, 4, 5)[::2][::-1]' }],
      options: [
        { l: 'A', t: '(1, 3, 5)' }, { l: 'B', t: '(5, 4, 3, 2, 1)' }, { l: 'C', t: '(4, 2)' },
        { l: 'D', t: '(5, 3, 1)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: 'The first slice gives (1, 3, 5); reversing it gives (5, 3, 1).'
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> tuple('ab') + tuple(('c',))" }],
      options: [
        { l: 'A', t: "('ab', 'c')" }, { l: 'B', t: "('a', 'b', 'c')" },
        { l: 'C', t: "('a', 'b', ('c',))" }, { l: 'D', t: "('abc',)" }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: 'tuple of a string splits it into characters; tuple of a tuple leaves it unchanged.'
    },
    {
      n: 6, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> sum(())' }],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: 'None' }, { l: 'C', t: '()' },
        { l: 'D', t: '0' }, { l: 'E', t: '1' }
      ],
      answer: 'D',
      explanation: 'sum has a default start of 0, so an empty iterable returns 0 rather than raising.'
    },
    {
      n: 7, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> tuple(range(2, 2))' }],
      options: [
        { l: 'A', t: '(2,)' }, { l: 'B', t: '(2, 2)' }, { l: 'C', t: '()' },
        { l: 'D', t: 'Error' }, { l: 'E', t: '(0, 1)' }
      ],
      answer: 'C',
      explanation: 'The stop equals the start, so nothing is produced.'
    },
    {
      n: 8, marks: 1, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: ">>> (not '', not ' ')" }],
      options: [
        { l: 'A', t: '(True, True)' }, { l: 'B', t: '(True, False)' }, { l: 'C', t: '(False, False)' },
        { l: 'D', t: '(False, True)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: "The empty string is falsy, so not '' is True. A string containing a space is non-empty and therefore truthy."
    },
    {
      n: 9, marks: 1, type: 'mcq',
      stem: [
        { p: 'Given `f = lambda x: lambda y: x - y`, what is the result of `f(10)(3)`?' }
      ],
      options: [
        { l: 'A', t: '-7' }, { l: 'B', t: 'A function' }, { l: 'C', t: '7' },
        { l: 'D', t: '13' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: 'f(10) returns a function that subtracts its argument from 10. Note the order: x - y, not y - x.'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the value of p after this runs?' },
        { code: 'p = 1\nfor x in (1, 2, 3, 4):\n    if x % 2 == 0:\n        p *= x' }
      ],
      options: [
        { l: 'A', t: '24' }, { l: 'B', t: '8' }, { l: 'C', t: '6' },
        { l: 'D', t: '1' }, { l: 'E', t: '0' }
      ],
      answer: 'B',
      explanation: 'Only the even elements 2 and 4 multiply in, giving 8. Starting at 1 (the multiplicative identity) matters.'
    },
    {
      n: 11, marks: 1, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: "def a(n):\n    if n == 0:\n        return 'A'\n    if n == 1:\n        return 'B'\n    return a(n - 2) + a(n - 1)" },
        { p: 'What is returned by `a(4)`?' }
      ],
      options: [
        { l: 'A', t: "'BABAB'" }, { l: 'B', t: "'ABAB'" }, { l: 'C', t: "'AB'" },
        { l: 'D', t: "'ABBAB'" }, { l: 'E', t: "'BAAB'" }
      ],
      answer: 'D',
      explanation: "a(2) = 'A' + 'B' = 'AB'; a(3) = a(1) + a(2) = 'B' + 'AB' = 'BAB'; a(4) = a(2) + a(3) = 'AB' + 'BAB' = 'ABBAB'. Note the argument order in the recursive call."
    },
    {
      n: 12, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: ">>> len(tuple(filter(lambda c: c in 'aeiou', 'programming')))" }
      ],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '3' }, { l: 'C', t: '2' },
        { l: 'D', t: '11' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: "The vowels in 'programming' are o, a, i — three of them. `in` on strings is a membership test covered in Lecture 3."
    },

    {
      n: 13, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: '>>> tuple(map(lambda t: t[0] * t[1], ((1, 2), (3, 4))))' }
      ],
      options: [
        { l: 'A', t: '(3, 7)' }, { l: 'B', t: '((1, 2), (3, 4))' }, { l: 'C', t: '(2, 12)' },
        { l: 'D', t: '(2, 3, 4, 12)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: 'Each element of the outer tuple is itself a pair, and the lambda indexes into it: 1*2 = 2, 3*4 = 12.'
    },
    {
      n: 14, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: '>>> from functools import reduce\n>>> reduce(lambda a, b: a if a > b else b, (3, 9, 2, 7))' }
      ],
      options: [
        { l: 'A', t: '3' }, { l: 'B', t: '9' }, { l: 'C', t: '7' },
        { l: 'D', t: '21' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: 'This is max written as a reduction. With no initializer the first element seeds the accumulator.'
    },
    {
      n: 15, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: 'def sum_series(fn):\n    return lambda n: sum(map(fn, range(1, n + 1)))' },
        { p: 'What is the result of `sum_series(lambda i: i * i)(4)`?' }
      ],
      options: [
        { l: 'A', t: '10' }, { l: 'B', t: '30' }, { l: 'C', t: '16' },
        { l: 'D', t: '14' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: '1 + 4 + 9 + 16 = 30. The range starts at 1 and includes n, which is what n + 1 achieves.'
    },
    {
      n: 16, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given:' },
        { code: "def D(m, x):\n    print(m, end=' ')\n    return x" },
        { p: 'What sequence is printed by:' },
        { code: ">>> D('X', True) and (D('Y', False) or D('Z', True))" }
      ],
      options: [
        { l: 'A', t: 'X Y' }, { l: 'B', t: 'X' }, { l: 'C', t: 'X Z' },
        { l: 'D', t: 'X Y Z' }, { l: 'E', t: 'Nothing is printed' }
      ],
      answer: 'D',
      explanation: "D('X', ...) is True so and must evaluate the right side. Inside the parentheses D('Y', ...) is False so or must evaluate D('Z', ...). All three print."
    },
    {
      n: 17, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is printed?' },
        { code: 'i, j = 1, 20\nn = 0\nwhile i < j and n < 4:\n    i *= 2\n    j -= 3\n    n += 1\nprint(i, j, n)' }
      ],
      options: [
        { l: 'A', t: '8 11 3' }, { l: 'B', t: '16 8 4' }, { l: 'C', t: '16 8 3' },
        { l: 'D', t: '32 5 5' }, { l: 'E', t: 'Infinite loop' }
      ],
      answer: 'B',
      explanation: 'Iterations: (2, 17, 1), (4, 14, 2), (8, 11, 3), (16, 8, 4). The loop then exits because 16 < 8 is False — the counter limit is never what stops it.'
    },
    {
      n: 18, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the value of c after this runs?' },
        { code: 'c = 0\nfor i in range(3):\n    for j in range(3):\n        for k in range(3):\n            if i < j < k:\n                c += 1' }
      ],
      options: [
        { l: 'A', t: '3' }, { l: 'B', t: '6' }, { l: 'C', t: '1' },
        { l: 'D', t: '0' }, { l: 'E', t: '27' }
      ],
      answer: 'C',
      explanation: 'A chained comparison requires a strictly increasing triple from {0, 1, 2}: only (0, 1, 2) qualifies.'
    },
    {
      n: 19, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: '>>> ((1, 2), (3, 4), (5, 6))[1:][0][1]' }
      ],
      options: [
        { l: 'A', t: '3' }, { l: 'B', t: '(3, 4)' }, { l: 'C', t: '4' },
        { l: 'D', t: '5' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: 'The slice gives ((3, 4), (5, 6)); [0] takes (3, 4); [1] takes 4. Slicing keeps the nesting, indexing removes one level.'
    },
    {
      n: 20, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is returned?' },
        { code: ">>> tuple(filter(lambda c: ord(c) % 2 == 0, 'CS1010E'))" }
      ],
      options: [
        { l: 'A', t: "('1', '1')" }, { l: 'B', t: "('C', 'S')" }, { l: 'C', t: "('0', '0')" },
        { l: 'D', t: "('0', '0', 'E')" }, { l: 'E', t: '()' }
      ],
      answer: 'C',
      explanation: "ord('0') is 48 (even) while ord('1') is 49, ord('C') is 67, ord('S') is 83 and ord('E') is 69 (all odd). Only the two zeros survive."
    },
    {
      n: 21, marks: 2, type: 'mcq',
      stem: [{ p: 'Let t be a tuple. Which expression always produces the same value as `len(t)`?' }],
      options: [
        { l: 'A', t: 'reduce(lambda a, b: a + b, t, 0)' },
        { l: 'B', t: 'reduce(lambda a, b: a + 1, t)' },
        { l: 'C', t: 'reduce(lambda a, b: 1, t, 0)' },
        { l: 'D', t: 'reduce(lambda a, b: a + 1, t, 0)' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'D',
      explanation: 'The initializer 0 is essential. Without it the first element becomes the starting accumulator, so (4, 5, 6) would count to 6 rather than 3. Option A sums the elements.'
    },
    {
      n: 22, marks: 2, type: 'mcq',
      stem: [{ p: 'What is returned?' }, { code: '>>> tuple(x + 1 for x in range(3))' }],
      options: [
        { l: 'A', t: '(0, 1, 2)' }, { l: 'B', t: '(1, 2, 3)' }, { l: 'C', t: '(1, 2, 3, 4)' },
        { l: 'D', t: 'A generator object' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: 'The generator expression yields 1, 2, 3 and tuple consumes it. Without the tuple call the shell would show a generator object.'
    },

    {
      n: 23, marks: 3, type: 'fib',
      stem: [
        { p: '`power(b, e)` returns b raised to the non-negative integer power e, recursively and without using **.' },
        { code: '>>> power(3, 4)\n81\n>>> power(5, 0)\n1' },
        { code: 'def power(b, e):\n    if e == 0:\n        return {{1}}\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: '1' },
        { n: 2, answer: 'b * power(b, e - 1)' }
      ],
      explanation: '1 is the identity for multiplication and the correct value of any base to the power 0.'
    },
    {
      n: 24, marks: 3, type: 'fib',
      stem: [
        { p: '`sum_even(t)` returns the sum of the even elements of a tuple of integers, recursively.' },
        { code: '>>> sum_even((1, 2, 3, 4, 5, 6))\n12\n>>> sum_even(())\n0' },
        { code: 'def sum_even(t):\n    if len(t) == 0:\n        return 0\n    return {{1}} + sum_even({{2}})' }
      ],
      blanks: [
        { n: 1, answer: '(t[0] if t[0] % 2 == 0 else 0)' },
        { n: 2, answer: 't[1:]' }
      ],
      explanation: 'Contributing 0 for odd elements keeps the recursion uniform. Writing a separate if branch that skips the element is also valid but does not fit one blank.'
    },
    {
      n: 25, marks: 3, type: 'fib',
      stem: [
        { p: 'What is the result of the following evaluation?' },
        { code: '>>> from functools import reduce\n>>> reduce(lambda a, b: a + (b,) if b not in a else a, (1, 2, 1, 3, 2), ())' }
      ],
      blanks: [{ n: 1, answer: '(1, 2, 3)' }],
      explanation: 'A duplicate-removal reduction: each element is appended only if it is not already in the accumulator. The conditional expression is the whole lambda body — a + (b,) if ... else a, not a + ((b,) if ... else a).'
    },
    {
      n: 26, marks: 3, type: 'fib',
      stem: [
        { p: 'Given:' },
        { code: 'def twice(f):\n    return lambda x: f(f(x))' },
        { p: 'What is the result of `(twice(lambda x: x * x))(2)`?' }
      ],
      blanks: [{ n: 1, answer: '16' }],
      explanation: 'Inner: 2 * 2 = 4. Outer: 4 * 4 = 16. Squaring twice is raising to the fourth power.'
    },
    {
      n: 27, marks: 3, type: 'fib',
      stem: [
        { p: '`repeat(s, n)` returns the string s concatenated n times, recursively and without using *.' },
        { code: ">>> repeat('ab', 3)\n'ababab'\n>>> repeat('z', 0)\n''" },
        { code: 'def repeat(s, n):\n    if n == 0:\n        return {{1}}\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: "''" },
        { n: 2, answer: 's + repeat(s, n - 1)' }
      ],
      explanation: 'The empty string is the identity for concatenation. Returning 0 or () here would break the +.'
    },
    {
      n: 28, marks: 3, type: 'fib',
      stem: [
        { p: '`digits_tuple(n)` returns the digits of a non-negative integer as a tuple, in order.' },
        { code: '>>> digits_tuple(4071)\n(4, 0, 7, 1)\n>>> digits_tuple(7)\n(7,)' },
        { code: 'def digits_tuple(n):\n    if n < 10:\n        return {{1}}\n    return digits_tuple({{2}}) + {{3}}' }
      ],
      blanks: [
        { n: 1, answer: '(n,)' },
        { n: 2, answer: 'n // 10' },
        { n: 3, answer: '(n % 10,)' }
      ],
      explanation: 'Two singleton tuples, both needing the trailing comma. The recursive call comes first so the leading digits appear first.'
    },
    {
      n: 29, marks: 3, type: 'fib',
      stem: [
        { p: 'From Lecture 4: `pi_approx1(n)` approximates pi using the first n terms of the series.' },
        { code: '>>> pi_approx1(1)\n4.0\n>>> pi_approx1(2)\n2.666666666666667' },
        { code: 'def pi_approx1(n):\n    res = 0\n    for i in range(n):\n        res += {{1}}\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: '(-1)**i / (2*i + 1)' },
        { n: 2, answer: '4 * res' }
      ],
      explanation: 'With range(n) starting at 0, the sign is (-1)**i and the denominator 2*i + 1. Multiplying by 4 once at the end is cheaper than inside the loop, but either is accepted if consistent.'
    },
    {
      n: 30, marks: 4, type: 'fib',
      stem: [
        { p: '`apply_n(f, n)` returns a function that applies f to its argument n times. `apply_n(f, 0)` is the identity function.' },
        { code: '>>> apply_n(lambda x: x * 2, 3)(1)\n8\n>>> apply_n(lambda x: x + 5, 0)(9)\n9' },
        { code: 'def apply_n(f, n):\n    if n == 0:\n        return {{1}}\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: 'lambda x: x' },
        { n: 2, answer: 'lambda x: f(apply_n(f, n - 1)(x))' }
      ],
      explanation: 'Both blanks must be functions, not values — apply_n returns something callable. Blank 1 is the identity function; returning x would be a NameError. lambda x: apply_n(f, n-1)(f(x)) is equally correct.'
    },
    {
      n: 31, marks: 4, type: 'fib',
      stem: [
        { p: 'From Lecture 5: `moves(n)` returns the number of disk moves needed to solve Towers of Hanoi with n disks.' },
        { code: '>>> tuple(map(moves, range(6)))\n(0, 1, 3, 7, 15, 31)' },
        { code: 'def moves(n):\n    if n == 0:\n        return {{1}}\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: '0' },
        { n: 2, answer: '2 * moves(n - 1) + 1' }
      ],
      explanation: 'Move the top n-1 disks across, move the largest once, move the n-1 back — hence twice the subproblem plus one.'
    }
  ]
});
