/* MID-TERM PRACTICE EXAMINATION (AY 2026/2027)
   (file: CS1010E Mock Exam 1 (Google AI Studio).pdf) — 28 questions */
registerExam({
  id: 'mock1',
  title: 'MID-TERM PRACTICE EXAMINATION (AY 2026/2027)',
  headerName: 'MID-TERM PRACTICE EXAMINATION (AY 2026/2027)',
  source: 'CS1010E Mock Exam 1 (Google AI Studio).pdf',
  duration: 90,
  sections: [
    { name: 'Section A — Rapid-Fire Evaluations & Syntactic Rules', from: 1, to: 10, marks: 1 },
    { name: 'Section B — Code Tracing & Output Predictions', from: 11, to: 20, marks: 2 },
    { name: 'Section C — Fill-In-The-Blanks / Implementation', from: 21, to: 28, marks: 3 }
  ],
  questions: [
    {
      n: 1, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate the following arithmetic expression:' },
        { code: '2 * 3 ** 2 ** 2 - 10 // 3' }
      ],
      options: [
        { l: 'A', t: '159' }, { l: 'B', t: '160' }, { l: 'C', t: '321' },
        { l: 'D', t: '1293' }, { l: 'E', t: '1296' }
      ],
      answer: 'A',
      explanation: '** is right-associative and outranks the rest, so 3 ** (2 ** 2) = 81. Then 2 * 81 = 162, 10 // 3 = 3, and 162 - 3 = 159.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the evaluated result and type of the following expression?' },
        { code: '10 - 4 / 2 * 3 + True * 5' }
      ],
      options: [
        { l: 'A', t: '9  (type int)' }, { l: 'B', t: '9.0  (type float)' },
        { l: 'C', t: '14.0  (type float)' }, { l: 'D', t: '4.0  (type float)' },
        { l: 'E', t: 'TypeError' }
      ],
      answer: 'B',
      explanation: '/ is true division: (4 / 2) * 3 = 6.0 and True * 5 = 5, so 10 - 6.0 + 5 = 9.0, a float.'
    },
    {
      n: 3, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate the following expression containing multiple unary signs:' },
        { code: '8 ------- 5' }
      ],
      options: [
        { l: 'A', t: '13' }, { l: 'B', t: '3' }, { l: 'C', t: '-3' },
        { l: 'D', t: '-13' }, { l: 'E', t: 'SyntaxError' }
      ],
      answer: 'B',
      explanation: 'There are seven minus signs: one binary subtraction plus six unary negations. Six is even so the operand becomes +5, and 8 - (+5) = 3.'
    },
    {
      n: 4, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate the following chained boolean comparison:' },
        { code: "'apple' < 'banana' == False" }
      ],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: 'False' }, { l: 'C', t: 'TypeError' },
        { l: 'D', t: 'None' }, { l: 'E', t: '0' }
      ],
      answer: 'B',
      explanation: "Chained comparison expands to ('apple' < 'banana') and ('banana' == False) → True and False → False."
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [
        { p: 'Consider the following evaluation:' },
        { code: '(False or (10 // 0 == 1)) and (True or (5 / 0 > 2))' },
        { p: 'What is the outcome?' }
      ],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: 'False' }, { l: 'C', t: 'ZeroDivisionError' },
        { l: 'D', t: 'None' }, { l: 'E', t: '1' }
      ],
      answer: 'C',
      explanation: "The left operand of `or` is False, so Python must evaluate 10 // 0, which raises ZeroDivisionError immediately. Nothing to the right is ever reached."
    },
    {
      n: 6, marks: 1, type: 'mcq',
      stem: [
        { p: 'Given the string:' },
        { code: "s = 'CS1010E_MIDTERM'" },
        { p: 'What is returned by the expression `s[1:11:3][::-1]`?' }
      ],
      options: [
        { l: 'A', t: "'M1S'" }, { l: 'B', t: "'S1M'" }, { l: 'C', t: "'DE1'" },
        { l: 'D', t: "'1ED'" }, { l: 'E', t: "'E01'" }
      ],
      answer: 'A',
      explanation: "The paper's key is A. Worth checking yourself: the indices visited by s[1:11:3] are 1, 4, 7, 10 giving 'S1_D', which reversed is 'D_1S' — none of the options. The item looks like a typo in the source paper; treat A as the stated key."
    },
    {
      n: 7, marks: 1, type: 'mcq',
      stem: [
        { p: 'Which of the following expressions will raise an Exception (Error) when executed?' }
      ],
      options: [
        { l: 'A', t: "'NUS'[3:]" }, { l: 'B', t: '(42)[0]' }, { l: 'C', t: '(42,)[0]' },
        { l: 'D', t: '()[:]' }, { l: 'E', t: "'python'[-10:10]" }
      ],
      answer: 'B',
      explanation: 'A comma makes the tuple. (42) is just the integer 42, and 42[0] raises TypeError. Slicing beyond either end is always legal and never raises.'
    },
    {
      n: 8, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate the following expression using character arithmetic:' },
        { code: "chr(ord('g') - ord('a') + ord('A') + 2)" }
      ],
      options: [
        { l: 'A', t: "'E'" }, { l: 'B', t: "'H'" }, { l: 'C', t: "'I'" },
        { l: 'D', t: "'i'" }, { l: 'E', t: '73' }
      ],
      answer: 'C',
      explanation: "ord('g') - ord('a') = 6, so the value is 65 + 6 + 2 = 73, and chr(73) is 'I'. Careful: chr() is applied last, so the answer is a character, not 73."
    },
    {
      n: 9, marks: 1, type: 'mcq',
      stem: [
        { p: 'Consider the following attempt to define and execute an inline function:' },
        { code: '(lambda x, y: return x if x > y else y)(10, 20)' },
        { p: 'What is the outcome?' }
      ],
      options: [
        { l: 'A', t: '20' }, { l: 'B', t: '10' }, { l: 'C', t: 'SyntaxError' },
        { l: 'D', t: 'None' }, { l: 'E', t: 'TypeError' }
      ],
      answer: 'C',
      explanation: 'A lambda body must be a single expression. `return` is a statement, so this is a SyntaxError before anything runs.'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the result of attempting to execute the following assignment?' },
        { code: 'tup = (10, (20, 30), 40)\n\ntup[1] += (50,)' }
      ],
      options: [
        { l: 'A', t: '(10, (20, 30, 50), 40)' }, { l: 'B', t: '(10, (20, 30), (50,), 40)' },
        { l: 'C', t: 'TypeError' }, { l: 'D', t: '(10, (50,), 40)' }, { l: 'E', t: 'None' }
      ],
      answer: 'C',
      explanation: "tup[1] is the tuple (20, 30). Tuples are immutable, so `tup[1] += ...` is item assignment and raises TypeError: 'tuple' object does not support item assignment."
    },

    {
      n: 11, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is printed upon executing the following code?' },
        { code: 'x = 0\nfor i in range(1, 5):\n    for j in range(i, 5):\n        if (i + j) % 2 == 0:\n            x += 1\nprint(x)' }
      ],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '5' }, { l: 'C', t: '6' },
        { l: 'D', t: '7' }, { l: 'E', t: '10' }
      ],
      answer: 'C',
      explanation: 'Even sums by row: i=1 → j=1,3 (2); i=2 → j=2,4 (2); i=3 → j=3 (1); i=4 → j=4 (1). Total 2+2+1+1 = 6.'
    },
    {
      n: 12, marks: 2, type: 'mcq',
      stem: [
        { p: 'Consider the function accum defined as follows:' },
        { code: 'from functools import reduce\n\ntup = (1, 2, 3, 4)\nres = reduce(lambda acc, x: (x,) + acc, tup, ())\nprint(res)' },
        { p: 'What is printed?' }
      ],
      options: [
        { l: 'A', t: '(1, 2, 3, 4)' }, { l: 'B', t: '(4, 3, 2, 1)' },
        { l: 'C', t: '(((((), 1), 2), 3), 4)' }, { l: 'D', t: '(10,)' }, { l: 'E', t: 'TypeError' }
      ],
      answer: 'B',
      explanation: 'reduce walks left to right, but each new element is prepended, so the accumulator grows (1,), (2, 1), (3, 2, 1), (4, 3, 2, 1).'
    },
    {
      n: 13, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following program?' },
        { code: 'def make_multiplier(n):\n    return lambda x: n * x\n\nn = 2\nf = make_multiplier(3)\nn = 5\ng = make_multiplier(4)\nprint(f(g(n)))' }
      ],
      options: [
        { l: 'A', t: '24' }, { l: 'B', t: '40' }, { l: 'C', t: '60' },
        { l: 'D', t: '120' }, { l: 'E', t: '30' }
      ],
      answer: 'C',
      explanation: 'Each closure captures its own n: f multiplies by 3, g by 4. g(5) = 20, then f(20) = 60. The global n = 5 is only used as the argument.'
    },
    {
      n: 14, marks: 2, type: 'mcq',
      stem: [
        { p: 'Study the following numerical bisection loop:' },
        { code: 'def f(x):\n    return x**2 - 2\n\na, b = 1.0, 2.0\ncount = 0\nwhile count < 3:\n    p = (a + b) / 2\n    if f(a) * f(p) < 0:\n        b = p\n    else:\n        a = p\n    count += 1\nprint(round(p, 4))' },
        { p: 'What is printed?' }
      ],
      options: [
        { l: 'A', t: '1.5' }, { l: 'B', t: '1.25' }, { l: 'C', t: '1.375' },
        { l: 'D', t: '1.4142' }, { l: 'E', t: '1.4375' }
      ],
      answer: 'C',
      explanation: 'p = 1.5 keeps [1.0, 1.5]; p = 1.25 moves a; p = 1.375 is the third midpoint, and the loop ends since count reaches 3.'
    },
    {
      n: 15, marks: 2, type: 'mcq',
      stem: [
        { p: 'Consider the following recursive function:' },
        { code: 'def mystery(n):\n    if n <= 0:\n        return ""\n    return mystery(n // 2) + str(n % 2)\n\nprint(mystery(19))' },
        { p: 'What is printed?' }
      ],
      options: [
        { l: 'A', t: "'10011'" }, { l: 'B', t: "'11001'" }, { l: 'C', t: "'10101'" },
        { l: 'D', t: "'19'" }, { l: 'E', t: 'Infinite Recursion / RecursionError' }
      ],
      answer: 'A',
      explanation: 'The recursive call comes first, so bits are emitted most-significant first: 19 is 10011 in binary.'
    },
    {
      n: 16, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the return value of evaluating `calc((1, 2, 3, 4))`?' },
        { code: 'def calc(t):\n    if len(t) <= 1:\n        return 0\n    return abs(t[0] - t[1]) + calc(t[1:])' }
      ],
      options: [
        { l: 'A', t: '0' }, { l: 'B', t: '3' }, { l: 'C', t: '4' },
        { l: 'D', t: '6' }, { l: 'E', t: '10' }
      ],
      answer: 'B',
      explanation: 'abs(1-2) + abs(2-3) + abs(3-4) + 0 = 1 + 1 + 1 = 3. The single-element tail contributes 0.'
    },
    {
      n: 17, marks: 2, type: 'mcq',
      stem: [
        { p: 'Given the recursive implementation of the Fibonacci sequence:' },
        { code: 'def fib(k):\n    if k <= 1:\n        return k\n    return fib(k - 1) + fib(k - 2)' },
        { p: 'How many times is the base case condition `k <= 1` evaluated when calling `fib(5)`?' }
      ],
      options: [
        { l: 'A', t: '5' }, { l: 'B', t: '8' }, { l: 'C', t: '9' },
        { l: 'D', t: '15' }, { l: 'E', t: '1' }
      ],
      answer: 'D',
      explanation: 'Calls(n) = 1 + Calls(n-1) + Calls(n-2) with Calls(0) = Calls(1) = 1: 1, 1, 3, 5, 9, 15. Every call evaluates the guard once, so 15.'
    },
    {
      n: 18, marks: 2, type: 'mcq',
      stem: [
        { p: "Consider the classic Towers of Hanoi problem with 3 disks moved from pole 'A' to pole 'C' using auxiliary pole 'B':" },
        { code: 'def towers(n, src, dst, aux):\n    if n == 1:\n        print(f"{src}->{dst}", end=" ")\n        return\n    towers(n - 1, src, aux, dst)\n    print(f"{src}->{dst}", end=" ")\n    towers(n - 1, aux, dst, src)' },
        { p: "What is the 4th move printed when `towers(3, 'A', 'C', 'B')` is executed?" }
      ],
      options: [
        { l: 'A', t: 'A->B' }, { l: 'B', t: 'B->C' }, { l: 'C', t: 'A->C' },
        { l: 'D', t: 'C->B' }, { l: 'E', t: 'B->A' }
      ],
      answer: 'C',
      explanation: 'The moves are A->C, A->B, C->B, A->C, B->A, B->C, A->C. The fourth is the largest disk moving A->C.'
    },
    {
      n: 19, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following sequence mapping expression?' },
        { code: 'poly = (3, -2, 4)  # Represents 3 - 2x + 4x^2\nres = tuple(map(lambda x: sum(poly[i] * (x**i) for i in range(len(poly))), (0, 1, 2)))\nprint(res)' }
      ],
      options: [
        { l: 'A', t: '(3, 5, 15)' }, { l: 'B', t: '(3, 5, 11)' }, { l: 'C', t: '(4, 5, 15)' },
        { l: 'D', t: '(0, 5, 15)' }, { l: 'E', t: '(3, 9, 27)' }
      ],
      answer: 'A',
      explanation: 'Lowest-power-first indexing: P(0) = 3, P(1) = 3 - 2 + 4 = 5, P(2) = 3 - 4 + 16 = 15.'
    },
    {
      n: 20, marks: 2, type: 'mcq',
      stem: [
        { p: "A program simulates parking on n spaces where cars ('C') occupy 1 space and buses ('B') occupy 2 spaces:" },
        { code: 'def count_parking(n):\n    if n == 1:\n        return 1\n    if n == 2:\n        return 2\n    return count_parking(n - 1) + count_parking(n - 2)\n\nprint(count_parking(6))' },
        { p: 'What value is printed?' }
      ],
      options: [
        { l: 'A', t: '8' }, { l: 'B', t: '11' }, { l: 'C', t: '13' },
        { l: 'D', t: '21' }, { l: 'E', t: '34' }
      ],
      answer: 'C',
      explanation: 'W(1)=1, W(2)=2, then 3, 5, 8, 13. This is the Fibonacci recurrence shifted by one.'
    },

    {
      n: 21, marks: 3, type: 'fib',
      stem: [
        { p: 'The following function `pi_approx(n)` approximates π using the Leibniz finite series:' },
        { code: 'π = 4 · Σ  (-1)^(i-1) / (2i - 1)      for i = 1, 2, ..., n' },
        { p: 'Complete the declarative implementation using `map`, `range` and `sum`:' },
        { code: 'def pi_approx(n):\n    # BLANK 1 produces an iterable of the terms for i = 1, 2, ..., n\n    terms = map(lambda i: {{1}}, range(1, n + 1))\n    return 4 * {{2}}' }
      ],
      blanks: [
        { n: 1, answer: '(-1)**(i - 1) / (2 * i - 1)' },
        { n: 2, answer: 'sum(terms)' }
      ],
      explanation: 'The alternating sign is (-1)**(i - 1) because the series starts at i = 1 with a plus term; the odd denominator is 2 * i - 1.',
      scope: { level: 'crucial', reason: 'uses a float division to build Leibniz terms — `(-1)**(i-1) / (2*i-1)` is Python `//` truncated to 0 for i >= 2; a float literal is the in-scope way to get the right result.' }
    },
    {
      n: 22, marks: 3, type: 'fib',
      stem: [
        { p: 'Complete the recursive function `rev_tup(t)` that reverses a tuple without using slicing with a negative step (`[::-1]`) or built-in reversed functions:' },
        { code: 'def rev_tup(t):\n    if not t:\n        return ()\n    return {{1}} + {{2}}' }
      ],
      blanks: [
        { n: 1, answer: 'rev_tup(t[1:])' },
        { n: 2, answer: '(t[0],)' }
      ],
      explanation: 'Recurse on the tail first so the last element ends up leftmost, and add the head as a one-element tuple. The trailing comma in (t[0],) is compulsory — (t[0]) is just an integer.'
    },
    {
      n: 23, marks: 4, type: 'fib',
      stem: [
        { p: 'According to the lecture convention, a polynomial is represented as a tuple of coefficients starting with the lowest power:' },
        { code: 'P(x) = c0 + c1x + c2x^2 + ... + cnx^n    ⟹    (c0, c1, ..., cn)' },
        { p: 'The function `poly_add(p1, p2)` takes two polynomial tuples of arbitrary lengths and returns a new tuple representing their sum. For example:' },
        { code: '# (1 + 2x) + (3 + 4x + 5x^2) = 4 + 6x + 5x^2\npoly_add((1, 2), (3, 4, 5))   ->   (4, 6, 5)' },
        { p: 'Complete the implementation:' },
        { code: 'def poly_add(p1, p2):\n    max_len = max(len(p1), len(p2))\n\n    def coeff(p, i):\n        # Returns the coefficient of x^i if within bounds, else 0\n        return {{1}} if i < len(p) else {{2}}\n\n    return tuple(coeff(p1, i) + coeff(p2, i) for i in {{3}})' }
      ],
      blanks: [
        { n: 1, answer: 'p[i]' },
        { n: 2, answer: '0' },
        { n: 3, answer: 'range(max_len)' }
      ],
      explanation: 'Missing coefficients of the shorter polynomial must read as 0, and the result runs over every index up to the longer length.'
    },
    {
      n: 24, marks: 4, type: 'fib',
      stem: [
        { p: 'Complete the function `bisection_root(f, a, b, tol)` which finds a root of a continuous function f(x) = 0 in the bracket [a, b] using the Bisection Method:' },
        { code: 'def bisection_root(f, a, b, tol=1e-6):\n    mid = (a + b) / 2\n    f_mid = f(mid)\n    while abs(f_mid) > tol:\n        if {{1}} < 0:\n            b = mid\n        else:\n            a = mid\n        mid = {{2}}\n        f_mid = f(mid)\n    return mid' }
      ],
      blanks: [
        { n: 1, answer: 'f(a) * f_mid' },
        { n: 2, answer: '(a + b) / 2' }
      ],
      explanation: 'A sign change between f(a) and f(mid) brackets the root. p must be recomputed from the updated bracket inside the loop, otherwise the loop never narrows.'
    },
    {
      n: 25, marks: 4, type: 'fib',
      stem: [
        { p: "In Lecture 5, the Parking Problem asks for all combinations of parking Cars ('C', size 1) and Buses ('B', size 2) in n lots:" },
        { code: "park(1)   →   ('C',)\npark(2)   →   ('CC', 'B')\npark(3)   →   ('CCC', 'BCC', ...)  or equivalent ordering." },
        { p: 'Complete the recursive definition of `park(n)` that returns a tuple of strings:' },
        { code: "def park(n):\n    if n == 1:\n        return ('C',)\n    elif n == 2:\n        return ('CC', 'B')\n    else:\n        # Prepend 'C' to all combinations of (n - 1) lots,\n        # and prepend 'B' to all combinations of (n - 2) lots.\n        cars = tuple('C' + p for p in {{1}})\n        buses = tuple('B' + p for p in {{2}})\n        return cars + buses" }
      ],
      blanks: [
        { n: 1, answer: 'park(n - 1)' },
        { n: 2, answer: 'park(n - 2)' }
      ],
      explanation: "If the first lot holds a car there are n - 1 lots left; if it holds a bus, n - 2 are left."
    },
    {
      n: 26, marks: 3, type: 'fib',
      stem: [
        { p: 'Complete the function `interleave(t1, t2)` which takes two tuples of equal length and recursively interleaves their elements into a single tuple.' },
        { code: "interleave((1, 2, 3), ('a', 'b', 'c'))   →   (1, 'a', 2, 'b', 3, 'c')" },
        { code: 'def interleave(t1, t2):\n    if not t1:\n        return ()\n    return {{1}} + interleave({{2}}, {{3}})' }
      ],
      blanks: [
        { n: 1, answer: '(t1[0], t2[0])' },
        { n: 2, answer: 't1[1:]' },
        { n: 3, answer: 't2[1:]' }
      ],
      explanation: 'Take the heads of both tuples first, then recurse on both tails. A two-element tuple needs no trailing comma.'
    },
    {
      n: 27, marks: 3, type: 'fib',
      stem: [
        { p: 'Using `functools.reduce`, complete the function `filter_even(tup)` to filter out all odd integers from a tuple and return a tuple of only the even integers:' },
        { code: 'from functools import reduce\n\ndef filter_even(tup):\n    return reduce(\n        lambda acc, x: {{1}} if x % 2 == 0 else {{2}},\n        tup,\n        {{3}}\n    )' }
      ],
      blanks: [
        { n: 1, answer: 'acc + (x,)' },
        { n: 2, answer: 'acc' },
        { n: 3, answer: '()' }
      ],
      explanation: 'The accumulator must be a tuple, so even elements are appended with a singleton tuple and odd ones leave it untouched. The neutral start value for tuple building is ().'
    },
    {
      n: 28, marks: 3, type: 'fib',
      stem: [
        { p: 'The function `diff_pairs(tup)` takes a non-empty tuple of numbers and computes the tuple of differences between adjacent elements: (t1 - t0, t2 - t1, ..., tn-1 - tn-2). Complete the declarative generator expression:' },
        { code: 'def diff_pairs(tup):\n    if len(tup) < 2:\n        return ()\n    return tuple({{1}} for i in range({{2}}))' }
      ],
      blanks: [
        { n: 1, answer: 'tup[i + 1] - tup[i]' },
        { n: 2, answer: 'len(tup) - 1' }
      ],
      explanation: 'There is one difference per adjacent pair, so the range stops at len(tup) - 1 and each term reads forward from the current index.'
    }
  ]
});
