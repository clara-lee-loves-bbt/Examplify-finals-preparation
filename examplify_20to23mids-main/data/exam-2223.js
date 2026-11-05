/* MID-TERM TEST (AY 2022/2023, SEM 1)
   (file: cs1010e_2223S1_midterm_soln.pdf) — 25 questions.
   The source PDF's "Answer" column is a placeholder that reads "A" for every
   question, so the keys below were derived by working each question out (the
   fill-in-the-blank answers are the ones printed in the PDF). */
registerExam({
  id: 'midterm-2223',
  title: 'MID-TERM TEST (AY 2022/2023, SEM 1)',
  headerName: 'MID-TERM TEST (AY 2022/2023, SEM 1)',
  source: 'cs1010e_2223S1_midterm_soln.pdf',
  duration: 90,
  sections: [
    { name: 'Part 1 — Expressions, sequences and lambdas', from: 1, to: 12, marks: 1 },
    { name: 'Part 2 — Code output prediction', from: 13, to: 20, marks: 1 },
    { name: 'Part 3 — Fill in the blanks', from: 21, to: 22, marks: 1 },
    { name: 'Part 4 — Functions and data types', from: 23, to: 25, marks: 1 }
  ],
  questions: [
    {
      n: 1, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate the following expression without any pre-defined variable or packages imported.' },
        { code: '>>> 5 - 3 + 2 * 4 - 1' }
      ],
      options: [
        { l: 'A', t: '9' }, { l: 'B', t: '15' }, { l: 'C', t: '12' },
        { l: 'D', t: '-16' }, { l: 'E', t: '8' }
      ],
      answer: 'A',
      explanation: '`2 * 4 = 8`, so the expression is `5 - 3 + 8 - 1 = 9`.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> 6 ------- 6' }
      ],
      options: [
        { l: 'A', t: '0' }, { l: 'B', t: '12' }, { l: 'C', t: '3' },
        { l: 'D', t: '-3' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'The first `-` is the binary minus; the remaining six are unary minuses on 6. An even number of unary minuses leaves the operand as +6, so `6 - 6 = 0`.'
    },
    {
      n: 3, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> 6 - True + False ** 0' }
      ],
      options: [
        { l: 'A', t: '6' }, { l: 'B', t: '4' }, { l: 'C', t: '5' },
        { l: 'D', t: 'ZeroDivisionError' }, { l: 'E', t: 'TypeError' }
      ],
      answer: 'A',
      explanation: '`True` is 1 and `False ** 0` is `0 ** 0`, which Python defines as 1, so the expression is `6 - 1 + 1 = 6`.'
    },
    {
      n: 4, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> 8 / 4 * 2' }
      ],
      options: [
        { l: 'A', t: '4.0' }, { l: 'B', t: '4' }, { l: 'C', t: '1.0' },
        { l: 'D', t: '1' }, { l: 'E', t: '0.5' }
      ],
      answer: 'A',
      explanation: 'Left to right with true division: `8 / 4 = 2.0`, then `2.0 * 2 = 4.0`. The `/` produces a float.'
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> '1234567'[4]" }
      ],
      options: [
        { l: 'A', t: "'5'" }, { l: 'B', t: "'7'" }, { l: 'C', t: "'6'" },
        { l: 'D', t: "'4'" }, { l: 'E', t: "'1234'" }
      ],
      answer: 'A',
      explanation: "Index 0 is '1', so index 4 is '5'."
    },
    {
      n: 6, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> '1234567'[2:5][1:2][1:]" }
      ],
      options: [
        { l: 'A', t: "'' (empty string)" }, { l: 'B', t: "'4'" },
        { l: 'C', t: "'34'" }, { l: 'D', t: "'3'" }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: "`[2:5]` is `'345'`, `[1:2]` is `'4'`, and `[1:]` of that one-character string is empty."
    },
    {
      n: 7, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> ('abc', 'abc', 'def', 'def', 'ghi', 'jkl')[4]" }
      ],
      options: [
        { l: 'A', t: "'ghi'" }, { l: 'B', t: "('ghi',)" }, { l: 'C', t: "'def'" },
        { l: 'D', t: "('def',)" }, { l: 'E', t: "'b'" }
      ],
      answer: 'A',
      explanation: "Counting from index 0: 'abc', 'abc', 'def', 'def', 'ghi' — so index 4 is the string 'ghi'."
    },
    {
      n: 8, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> tuple('xyz') + tuple((3))" }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: "('x', 'y', 'z', 3)" },
        { l: 'C', t: "('xyz', 3)" }, { l: 'D', t: "(('x', 'y', 'z'), 3)" },
        { l: 'E', t: "(['xyz'], 3)" }
      ],
      answer: 'A',
      explanation: "`tuple((3))` is `tuple(3)`; integers are not iterable, so a TypeError is raised before any concatenation can happen."
    },
    {
      n: 9, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'nested list literals drive the indexing drill' },
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> [1, 2, [3, 4], 5, 6][[1, 2, 4][2]:[1, 2, 3, 4, 5][3]]' }
      ],
      options: [
        { l: 'A', t: '[]' }, { l: 'B', t: 'Error' }, { l: 'C', t: '[[3, 4], 5]' },
        { l: 'D', t: '[[3, 4]]' }, { l: 'E', t: '[3, 4]' }
      ],
      answer: 'A',
      explanation: '`[1, 2, 4][2]` is 4 and `[1, 2, 3, 4, 5][3]` is also 4, so this is `[4:4]`, an empty slice.'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> (lambda x, y, z: return x - y + z)(3, 2, 1)' }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '4' }, { l: 'C', t: '0' },
        { l: 'D', t: '2' }, { l: 'E', t: 'None' }
      ],
      answer: 'A',
      explanation: '`return` cannot appear inside a lambda body, so this is a SyntaxError.'
    },
    {
      n: 11, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> (lambda x, y: y(y(x)) + y(x))(17, lambda x: x // 2)' }
      ],
      options: [
        { l: 'A', t: '12' }, { l: 'B', t: '5' }, { l: 'C', t: '4' },
        { l: 'D', t: 'Error' }, { l: 'E', t: '21' }
      ],
      answer: 'A',
      explanation: '`y` halves its argument with floor division: `y(17) = 8` and `y(8) = 4`, so the sum is `4 + 8 = 12`.'
    },
    {
      n: 12, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> (lambda x: x((lambda x: x(lambda x: x))(x(x))))(lambda x: x)(lambda x: x + x)(3)' }
      ],
      options: [
        { l: 'A', t: '6' }, { l: 'B', t: '3' }, { l: 'C', t: 'RecursionError' },
        { l: 'D', t: 'A function' }, { l: 'E', t: 'SyntaxError' }
      ],
      answer: 'A',
      explanation: 'The outer application of the identity collapses to the identity itself, so the doubling function is applied to 3: `3 + 3 = 6`.'
    },
    {
      n: 13, marks: 1, type: 'mcq',
      stem: [
        { p: 'If the following is in a .py file, what is the output in the console when you run it?' },
        { code: 'x = 0\ny = 0\nwhile x < 5:\n    x += 1\n    y += 2\nprint(y)' }
      ],
      options: [
        { l: 'A', t: '10' }, { l: 'B', t: '5' }, { l: 'C', t: '15' },
        { l: 'D', t: '20' }, { l: 'E', t: '0' }
      ],
      answer: 'A',
      explanation: 'The loop body runs 5 times (x goes 1 → 5), adding 2 to y each time, so y ends at 10.'
    },
    {
      n: 14, marks: 1, type: 'mcq',
      stem: [
        { code: "q = 15\nif q > 5:\n    if q < 7:\n        print('a')\n    elif q > 9:\n        print('b')\n    elif q == 15:\n        print('c')\n    else:\n        print('d')" }
      ],
      options: [
        { l: 'A', t: "'b'" }, { l: 'B', t: "'a'" }, { l: 'C', t: "'c'" },
        { l: 'D', t: "'d'" }, { l: 'E', t: 'Print nothing' }
      ],
      answer: 'A',
      explanation: "`q > 5` is True; `q < 7` is False but `q > 9` is True, so it prints `'b'` and the elif chain stops there."
    },
    {
      n: 15, marks: 1, type: 'mcq',
      stem: [
        { code: 'def f1(x):\n    return 1 + f3(x)\ndef f2(x):\n    return 2 + f4(x)\ndef f3(x):\n    return 1 + f1(x)\nprint(f1(4))' }
      ],
      options: [
        { l: 'A', t: 'RecursionError' }, { l: 'B', t: 'NameError' },
        { l: 'C', t: 'Infinite loop' }, { l: 'D', t: '8' }, { l: 'E', t: '6' }
      ],
      answer: 'A',
      explanation: 'f1 calls f3 which calls f1 again with no base case, so the recursion never ends and Python raises RecursionError.'
    },
    {
      n: 16, marks: 1, type: 'mcq',
      stem: [
        { code: "def f1(x):\n    return '1' + f2(x)\ndef f2(x):\n    return f3(x) + '2'\ndef f3(x):\n    return '3' + f4(x)\ndef f4(x):\n    return '4' + x\nprint(f1(0))" }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: "'13402'" }, { l: 'C', t: "'3042'" },
        { l: 'D', t: "'13042'" }, { l: 'E', t: "'12340'" }
      ],
      answer: 'A',
      explanation: "f4 computes `'4' + x` with `x = 0`; concatenating a string and an int raises TypeError, so nothing is printed."
    },
    {
      n: 17, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'uses a list literal as the sequence' },
      stem: [
        { code: "x = ['a', 'b', 'c', 'd']\ndef foo(l, f):\n    if not l:\n        return l\n    return foo(f(l[1:]), f) + [f(l[0])]\nprint(foo(x, lambda x: x[::-1]))" }
      ],
      options: [
        { l: 'A', t: "['c', 'b', 'd', 'a']" }, { l: 'B', t: "['a', 'b', 'c', 'd']" },
        { l: 'C', t: "['d', 'c', 'b', 'a']" }, { l: 'D', t: "['a', 'd', 'b', 'c']" },
        { l: 'E', t: "['a', 'c', 'b', 'd']" }
      ],
      answer: 'A',
      explanation: 'Each level reverses the tail before recursing and reverses the head on the way out, giving ["c", "b", "d", "a"].'
    },
    {
      n: 18, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about dictionary chaining' },
      stem: [
        { code: "d = {0: 2, 1: 5, 2: 1, 3: 4, 4: 7, 5: 6, 6: 3, 3: 9}\na = 0\noutput = ''\nwhile a in d:\n    a = d[a]\n    output += str(a)\nprint(output)" }
      ],
      options: [
        { l: 'A', t: "'215639'" }, { l: 'B', t: "'0215639'" },
        { l: 'C', t: "'2156347'" }, { l: 'D', t: "'02156347'" },
        { l: 'E', t: 'Infinite loop' }, { l: 'F', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'The duplicate key 3 keeps the later value 9, so the chain is 0 → 2 → 1 → 5 → 6 → 3 → 9 and stops (9 is not a key): "215639".'
    },
    {
      n: 19, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about dict() built from pairs' },
      stem: [
        { code: "lst1 = ['bc', 'de', 'ya', 'ab', 'bq', 'bd']\nlst2 = []\nfor x in lst1:\n    lst2.append(tuple(x))\nd = dict(lst2)\nprint(d['b'])" }
      ],
      options: [
        { l: 'A', t: "'d'" }, { l: 'B', t: "'a'" }, { l: 'C', t: 'Error' },
        { l: 'D', t: "'bc'" }, { l: 'E', t: "'ab'" }
      ],
      answer: 'A',
      explanation: "Each two-character string becomes a (key, value) pair: 'bc' → b: 'c', 'bq' → b: 'q', 'bd' → b: 'd'. The last one wins, so d['b'] = 'd'."
    },
    {
      n: 20, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about set operators' },
      stem: [
        { code: "x = {'a', 'bc', 'de', 'a'}\ny = {'b', 'de', 'a', 'a', 'b'}\nprint(x | y - x ^ y)" }
      ],
      options: [
        { l: 'A', t: "{'de', 'a', 'bc'}" }, { l: 'B', t: "{'bc'}" },
        { l: 'C', t: "{'a', 'de', 'b', 'bc'}" }, { l: 'D', t: "{'a', 'de', 'b'}" },
        { l: 'E', t: '{}' }
      ],
      answer: 'A',
      explanation: "`-` binds tighter than `^`, which binds tighter than `|`: `y - x` is `{'b'}`, its symmetric difference with y is `{'de', 'a'}`, and unioning with x adds nothing new → `{'a', 'de', 'bc'}`."
    },

    {
      n: 21, marks: 1, type: 'fib',
      stem: [
        { p: 'Given a string s, we want to remove all consecutive duplicated characters. For example `aabbbbcccddabdd` becomes `abcdabd`. Some sample runs:' },
        { code: ">>> remove_duplicate('abcdeea')\n'abcdea'\n>>> remove_duplicate('aaaabbbbaaaa')\n'aba'" },
        { p: 'Fill in the blanks for the missing part in the code to complete the function as mentioned above:' },
        { code: 'def remove_duplicate(s):\n    if len(s) < ({{1}}):\n        return s\n    if ({{2}}):\n        return remove_duplicate(s[1:])\n    else:\n        return ({{3}}) + remove_duplicate(s[1:])' }
      ],
      blanks: [
        { n: 1, answer: '2' },
        { n: 2, answer: 's[0] == s[1]' },
        { n: 3, answer: 's[0]' }
      ],
      explanation: 'When the first two characters match, drop the first and recurse; otherwise keep the first character and recurse on the tail. A string of fewer than two characters is already done.'
    },
    {
      n: 22, marks: 1, type: 'fib',
      stem: [
        { p: 'Write a recursive version of `binom_coeff_recur(n, k)` to compute the binomial coefficient using recursion, without any factorial functions or loops. Using the identity `(n choose k) = (n - 1 choose k - 1) + (n - 1 choose k)` with `(n choose 0) = 1`, and writing `nCk` for the function name, fill in the blanks:' },
        { code: 'def nCk(n, k):\n    if ({{1}}):\n        return 1\n    return ({{2}}) + ({{3}})' }
      ],
      blanks: [
        { n: 1, answer: 'k == 0 or n == k' },
        { n: 2, answer: 'nCk(n - 1, k)' },
        { n: 3, answer: 'nCk(n - 1, k - 1)' }
      ],
      explanation: 'The base case is `k == 0 or n == k` (both give 1); otherwise recurse on the two sub-problems. Blanks 2 and 3 may be given in either order since addition is commutative.'
    },

    {
      n: 23, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about sorting a list in place' },
      stem: [
        { p: 'Given that the input L is a list of integers with `len(L) > 1`, what does the function `foo(L)` do?' },
        { code: 'def foo(L):\n    for i in range(len(L) - 1):\n        for j in range(len(L) - i - 1):\n            if L[j] > L[j + 1]:\n                L[j], L[j + 1] = L[j + 1], L[j]' }
      ],
      options: [
        { l: 'A', t: 'The function actually always crashes. It won’t work' },
        { l: 'B', t: 'Sort the input list L in ascending order' },
        { l: 'C', t: 'Sort the input list L in descending order' },
        { l: 'D', t: 'Push the largest elements to the end of the list, but the list may or may not be fully sorted' },
        { l: 'E', t: 'Push the largest elements to the beginning of the list, but the list may or may not be fully sorted' }
      ],
      answer: 'B',
      explanation: 'This is bubble sort: adjacent out-of-order pairs are swapped and the inner range shrinks as `len(L) - i - 1`, so the list finishes fully sorted in ascending order.'
    },
    {
      n: 24, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: "the whole question is about file mode 'r+'" },
      stem: [
        { p: 'If we open a file with the file mode `r+`, it means:' }
      ],
      options: [
        { l: 'A', t: 'Opens a file for both reading and writing. The file pointer will be at the beginning of the file' },
        { l: 'B', t: 'Opens a file for reading only. The file pointer will be at the beginning of the file' },
        { l: 'C', t: 'Opens a file for writing only. Overwrites the file if the file exists. If the file does not exist, creates a new file for writing.' },
        { l: 'D', t: 'Opens a file for both writing and reading. Overwrites the existing file if the file exists. If the file does not exist, it creates a new file for reading and writing' },
        { l: 'E', t: 'Opens a file for both appending and reading. The file pointer is at the end of the file if the file exists. If the file does not exist, it creates a new file for reading and writing.' }
      ],
      answer: 'A',
      explanation: '`r+` opens for read/write without truncating and leaves the pointer at the start. (Option C describes `w`, D describes `w+`, E describes `a+`.)'
    },
    {
      n: 25, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about dictionary keys' },
      stem: [
        { p: 'How many of the following data types cannot be stored in the keys of a Python dictionary?' },
        { code: 'int\nfloat\nbool\nstring\nlist\ndict\ntuple\nset' }
      ],
      options: [
        { l: 'A', t: '3' }, { l: 'B', t: '0' }, { l: 'C', t: '2' },
        { l: 'D', t: '1' }, { l: 'E', t: '8' }
      ],
      answer: 'A',
      explanation: 'Dictionary keys must be hashable (effectively immutable). list, dict and set are mutable and unhashable, so 3 of the 8 cannot be keys.'
    }
  ]
});
