/* MID-TERM TEST (AY 2021/2022, SEM 1)
   (file: cs1010e_2122S1_midterm_soln.pdf) — 25 questions.
   The source PDF's "Answer" column is a placeholder that reads "A" for every
   question, so the keys below were derived by working each question out (the
   fill-in-the-blank answers are the ones printed in the PDF). */
registerExam({
  id: 'midterm-2122',
  title: 'MID-TERM TEST (AY 2021/2022, SEM 1)',
  headerName: 'MID-TERM TEST (AY 2021/2022, SEM 1)',
  source: 'cs1010e_2122S1_midterm_soln.pdf',
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
        { code: '>>> 1 - 2 - 3 * 4 - 5' }
      ],
      options: [
        { l: 'A', t: '-18' }, { l: 'B', t: '0' }, { l: 'C', t: '-8' },
        { l: 'D', t: '4' }, { l: 'E', t: '16' }
      ],
      answer: 'A',
      explanation: '`3 * 4 = 12`, so the expression is `1 - 2 - 12 - 5 = -18`.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> (False == True) == False' }
      ],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: 'False' }, { l: 'C', t: 'None' },
        { l: 'D', t: 'Error' }, { l: 'E', t: '0' }
      ],
      answer: 'A',
      explanation: 'The parentheses force the inner comparison first: `(False == True)` is False, and `False == False` is True.'
    },
    {
      n: 3, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> '4' * 3 + '2' * 1 + '0' * 0" }
      ],
      options: [
        { l: 'A', t: "'4442'" }, { l: 'B', t: "'43210'" }, { l: 'C', t: "'432100'" },
        { l: 'D', t: "'44420'" }, { l: 'E', t: "'1220'" }
      ],
      answer: 'A',
      explanation: "`'4' * 3` is `'444'`, `'2' * 1` is `'2'` and `'0' * 0` is the empty string, so the concatenation is `'4442'`."
    },
    {
      n: 4, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> False == True == False' }
      ],
      options: [
        { l: 'A', t: 'False' }, { l: 'B', t: 'True' }, { l: 'C', t: 'None' },
        { l: 'D', t: 'Error' }, { l: 'E', t: '0' }
      ],
      answer: 'A',
      explanation: 'Python chains comparisons: this is `(False == True) and (True == False)`, and both parts are False.'
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> 'abcde'[2:5][1][0][0]" }
      ],
      options: [
        { l: 'A', t: "'d'" }, { l: 'B', t: 'Error' }, { l: 'C', t: "'' (empty string)" },
        { l: 'D', t: '[]' }, { l: 'E', t: "'cde'" }
      ],
      answer: 'A',
      explanation: "`'abcde'[2:5]` is `'cde'`; `[1]` picks `'d'`; indexing a one-character string with `[0]` again still gives `'d'`."
    },
    {
      n: 6, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'calls math.sqrt, which is not in the scope list' },
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> (True != False) or (sqrt(-1))' }
      ],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: 'False' }, { l: 'C', t: 'None' },
        { l: 'D', t: '1j' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'The left operand is already True, so `or` short-circuits and the right side is never evaluated (it would also need an import and would not raise).'
    },
    {
      n: 7, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'uses a list literal — lists are not in the midterm scope' },
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> [1, 2, 3, 4, 5, 6][1:5][:2]' }
      ],
      options: [
        { l: 'A', t: '[2, 3]' }, { l: 'B', t: '[2, 3, 4, 5]' },
        { l: 'C', t: '[4, 5]' }, { l: 'D', t: '[2, 3, 4]' }, { l: 'E', t: '[2]' }
      ],
      answer: 'A',
      explanation: '`[1:5]` gives `[2, 3, 4, 5]`, and `[:2]` takes its first two elements: `[2, 3]`.'
    },
    {
      n: 8, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about the list() built-in' },
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> list(['abc']) + list(('k', 'z'))" }
      ],
      options: [
        { l: 'A', t: "['abc', 'k', 'z']" }, { l: 'B', t: "['a', 'b', 'c', 'k', 'z']" },
        { l: 'C', t: "['a', 'b', 'c', 'kz']" }, { l: 'D', t: "['abc', 'k', 'z']" },
        { l: 'E', t: "['abckz']" }
      ],
      answer: 'A',
      explanation: "`list(['abc'])` keeps the whole string as one element and `list(('k', 'z'))` is `['k', 'z']`, so the concatenation is `['abc', 'k', 'z']`. (Option D is printed identically in the source paper.)"
    },
    {
      n: 9, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'nested list literals drive the indexing drill' },
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> [5, [3], [2, 3]][[2, 1][0]][:[1, 2][1]]' }
      ],
      options: [
        { l: 'A', t: '[2, 3]' }, { l: 'B', t: 'Error' }, { l: 'C', t: '[2]' },
        { l: 'D', t: '[3]' }, { l: 'E', t: '[]' }
      ],
      answer: 'A',
      explanation: '`[2, 1][0]` is 2 and `[1, 2][1]` is also 2, so the expression is `[5, [3], [2, 3]][2][:2]` = `[2, 3][:2]` = `[2, 3]`.'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> (lambda a: return a + 1)(2 + 3)' }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '6' }, { l: 'C', t: '5' },
        { l: 'D', t: '0' }, { l: 'E', t: 'None' }
      ],
      answer: 'A',
      explanation: 'A lambda body must be a single expression — `return` is a statement, so this is a SyntaxError.'
    },
    {
      n: 11, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> (lambda a, b, x: b(a(x)))((lambda a: a * 2), (lambda a: a + 1), 5)' }
      ],
      options: [
        { l: 'A', t: '11' }, { l: 'B', t: '12' }, { l: 'C', t: 'A function' },
        { l: 'D', t: 'Error' }, { l: 'E', t: '(10, 6)' }
      ],
      answer: 'A',
      explanation: '`a` is the doubling function and `b` the incrementing one: `a(5) = 10`, then `b(10) = 11`.'
    },
    {
      n: 12, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> (lambda a, b: lambda x: b(x(a)))('a', lambda a: a * 2)(lambda a: a[1:])" }
      ],
      options: [
        { l: 'A', t: "'' (empty string)" }, { l: 'B', t: "'a'" }, { l: 'C', t: "'aa'" },
        { l: 'D', t: 'A function' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: "The outer call fixes `a = 'a'` and `b` as the doubler. The returned function computes `x('a')` then doubles it: `'a'[1:]` is `''` and `'' * 2` is `''`."
    },
    {
      n: 13, marks: 1, type: 'mcq',
      stem: [
        { p: 'If the following is in a .py file, what is the output in the console when you run it?' },
        { code: 'x = 1\nfor i in range(0, 9):\n    for j in range(4, 8):\n        x = x + 1\nprint(x)' }
      ],
      options: [
        { l: 'A', t: '37' }, { l: 'B', t: '36' }, { l: 'C', t: '41' },
        { l: 'D', t: '28' }, { l: 'E', t: '145' }, { l: 'F', t: '199' }
      ],
      answer: 'A',
      explanation: 'The inner loop runs 4 times for each of the 9 outer iterations, so x increases by 36 from its start of 1 to give 37.'
    },
    {
      n: 14, marks: 1, type: 'mcq',
      stem: [
        { code: "q = 15\nif q > 10:\n    if q < 7:\n        print('a')\n    elif q < 9:\n        print('b')\n    else:\n        print('c')\nelse:\n    print('d')" }
      ],
      options: [
        { l: 'A', t: "'c'" }, { l: 'B', t: "'b'" }, { l: 'C', t: "'a'" },
        { l: 'D', t: "'d'" }, { l: 'E', t: 'Print nothing' }
      ],
      answer: 'A',
      explanation: "The outer test `q > 10` is True. Inside, `q < 7` and `q < 9` are both False, so the else branch prints `'c'`."
    },
    {
      n: 15, marks: 1, type: 'mcq',
      stem: [
        { code: 'def f1(x):\n    return 1 + f3(x)\ndef f2(x):\n    return 2 + f4(x)\ndef f3(x):\n    return 3 + x\nprint(f1(4))' }
      ],
      options: [
        { l: 'A', t: '8' }, { l: 'B', t: 'Error' }, { l: 'C', t: 'Infinite loop' },
        { l: 'D', t: '7' }, { l: 'E', t: 'None' }
      ],
      answer: 'A',
      explanation: '`f1(4) = 1 + f3(4) = 1 + (3 + 4) = 8`. The functions f2 and f4 are never called.'
    },
    {
      n: 16, marks: 1, type: 'mcq',
      stem: [
        { code: "def f1(x):\n    return '1' + f2(x)\ndef f2(x):\n    return f3(x) + '2'\ndef f3(x):\n    return '3' + f4(x)\ndef f4(x):\n    return '4' + str(x)\nprint(f2(0))" }
      ],
      options: [
        { l: 'A', t: "'3402'" }, { l: 'B', t: "'13402'" }, { l: 'C', t: "'3042'" },
        { l: 'D', t: "'13042'" }, { l: 'E', t: "'12340'" }
      ],
      answer: 'A',
      explanation: "`f2(0) = f3(0) + '2' = ('3' + '4' + '0') + '2' = '3402'`. f1 is not called, so its leading `'1'` never appears."
    },
    {
      n: 17, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'uses a list literal as the sequence' },
      stem: [
        { code: 'x = [1, 2, 3]\ndef foo(l, x):\n    if not l:\n        return l\n    return foo(l[1:], x) + [x(l[0])]\nprint(foo(x, lambda x: 4 - x))' }
      ],
      options: [
        { l: 'A', t: '[1, 2, 3]' }, { l: 'B', t: '[3, 2, 1]' },
        { l: 'C', t: '[0, 1, 2]' }, { l: 'D', t: '[2, 1, 0]' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'Recursion reaches the empty list first; on the way back the calls append `4 - 3 = 1`, `4 - 2 = 2`, `4 - 1 = 3` in that order, giving `[1, 2, 3]`.'
    },
    {
      n: 18, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about dictionary lookup' },
      stem: [
        { code: 'd = {0: 9, 1: 0, 2: 1, 3: 4, 4: 1, 5: 9, 6: 1}\na = 4\nwhile a in d:\n    a = d[a]\nprint(a)' }
      ],
      options: [
        { l: 'A', t: '9' }, { l: 'B', t: '0' }, { l: 'C', t: '1' },
        { l: 'D', t: 'Infinite loop' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'Follow the chain 4 → 1 → 0 → 9. 9 is not a key of the dictionary, so the loop stops and 9 is printed.'
    },
    {
      n: 19, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about building a dictionary' },
      stem: [
        { code: "lst1 = ['bc', 'de', 'ya', 'ab', 'bq', 'bd']\nd = {}\nfor x in lst1:\n    d[x[1]] = x[0]\nprint(d['b'])" }
      ],
      options: [
        { l: 'A', t: "'a'" }, { l: 'B', t: "'c'" }, { l: 'C', t: 'Error' },
        { l: 'D', t: "'bc'" }, { l: 'E', t: "''" }
      ],
      answer: 'A',
      explanation: "The key is the second character and the value the first. Only `'ab'` writes key `'b'`, so `d['b']` is `'a'`."
    },
    {
      n: 20, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about set operations' },
      stem: [
        { code: "x = {'a', 'bc', 'de'}\ny = {'b', 'de', 'a', 'b'}\nprint(x ^ y)" }
      ],
      options: [
        { l: 'A', t: "{'bc', 'b'}" }, { l: 'B', t: "{'de', 'a'}" }, { l: 'C', t: '{}' },
        { l: 'D', t: "{'d', 'e', 'a'}" }, { l: 'E', t: "{'bc', 'de', 'a', 'b'}" }
      ],
      answer: 'A',
      explanation: "The repeated `'b'` collapses in the set. `^` is the symmetric difference, keeping elements in exactly one set: `'bc'` and `'b'`."
    },

    {
      n: 21, marks: 1, type: 'fib',
      stem: [
        { p: 'The following function takes in a positive integer and returns an integer that keeps its digits in the same order that are even only. For example:' },
        { code: '>>> evenDigits(123456)\n246\n>>> evenDigits(12332401)\n2240' },
        { p: 'Fill in the blanks for the missing part in the code to complete the function as mentioned above:' },
        { code: 'def evenDigits(N):\n    if N == 0:\n        return 0\n    if N % 2 == 0:\n        return {{1}} + {{2}}\n    else:\n        return {{3}}' }
      ],
      blanks: [
        { n: 1, answer: 'evenDigits(N // 10) * 10' },
        { n: 2, answer: 'N % 10' },
        { n: 3, answer: 'evenDigits(N // 10)' }
      ],
      explanation: 'Work from the last digit outward: recurse on `N // 10`, shift that result one place left (× 10) and add the even last digit. Odd digits are skipped by returning the recursion unchanged.'
    },
    {
      n: 22, marks: 1, type: 'fib',
      scope: { level: 'slight', reason: 'indexes and slices a list argument' },
      stem: [
        { p: 'Given a list L with unique integers, `num_pair(L, N)` counts how many pairs of numbers in L have N as their sum. For example:' },
        { code: '>>> L = [75, 80, 90, 77, 88, 91, 60, 74, 73, 70, 55, 93, 59]\n>>> print(num_pair(L, 150))\n4\n>>> print(num_pair(L, 152))\n2' },
        { p: 'Fill in the blanks for the missing part in the code to complete the function as mentioned above:' },
        { code: 'def num_pair(L, N):\n    a = len(L)\n    count = 0\n    for i in range(0, a):\n        for j in range({{1}}, a):\n            if {{2}} == N:\n                {{3}}\n    return count' }
      ],
      blanks: [
        { n: 1, answer: 'i + 1' },
        { n: 2, answer: 'L[i] + L[j]' },
        { n: 3, answer: 'count += 1' }
      ],
      explanation: 'Start the inner loop at `i + 1` so every unordered pair is visited once, test the pair sum, and increment the counter when it matches. (`L[j] + L[i]` and `count = count + 1` also work.)'
    },

    {
      n: 23, marks: 1, type: 'mcq',
      scope: { level: 'crucial', reason: 'needs list building (.append) and slicing to read the function' },
      stem: [
        { p: 'Given that L is a list of integers with length > 1, what does the call `foo(L, 0)` do?' },
        { code: 'def foo(lst, N):\n    l1 = lst[1:]\n    l2 = []\n    for i in range(len(l1)):\n        l2.append(l1[i] - lst[i])\n    return min(l2) >= N' }
      ],
      options: [
        { l: 'A', t: 'Check if the list L is sorted in descending order' },
        { l: 'B', t: 'Check if all the elements of L are bigger than or equal to 0' },
        { l: 'C', t: 'Check if there exists at least one element in L that is bigger than or equal to 0' },
        { l: 'D', t: 'The function actually always crashes. It won’t work' },
        { l: 'E', t: 'Check the minimum of L is bigger than or equal to 0' }
      ],
      answer: 'A',
      explanation: 'As written the function collects `lst[i + 1] - lst[i]` and returns True exactly when every consecutive difference is ≥ 0 — i.e. when L is sorted in ASCENDING order. None of the options says ascending, so treat this item as flawed; A is the only "sorted order" option and is recorded as the intended key.'
    },
    {
      n: 24, marks: 1, type: 'mcq',
      scope: { level: 'crucial', reason: 'you must know set() discards duplicates' },
      stem: [
        { p: 'Given two strings s1 and s2 with alphabets only, if we want to check if they are anagrams, which of the following methods is wrong?' }
      ],
      options: [
        { l: 'A', t: 'Check if set(s1) and set(s2) are equal' },
        { l: 'B', t: 'Check the counts of each character in each string if they are equal' },
        { l: 'C', t: 'Sort the two lists list(s1) and list(s2), and check if they are the same' },
        { l: 'D', t: 'Generate every permutation of s2, and check if s1 is one of the permutations' },
        { l: 'E', t: 'For each character c in s1, check if c is in s2. If so, remove one occurrence of c from s2. They are anagrams if s2 becomes an empty string at last.' }
      ],
      answer: 'A',
      explanation: 'A set throws away duplicates, so `"aab"` and `"abb"` share the set `{a, b}` without being anagrams. Every other method accounts for how many of each character there are.'
    },
    {
      n: 25, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about dictionary keys' },
      stem: [
        { p: 'In a dictionary in Python, which of the following statements is true?' }
      ],
      options: [
        { l: 'A', t: 'The values can be any data type' },
        { l: 'B', t: 'The values cannot be integers' },
        { l: 'C', t: 'The values cannot be lists' },
        { l: 'D', t: 'The values cannot be tuples' },
        { l: 'E', t: 'The values cannot be strings' }
      ],
      answer: 'A',
      explanation: 'Dictionary values are unrestricted — only the keys must be hashable. Any of the listed types (and more) can be a value.'
    }
  ]
});
