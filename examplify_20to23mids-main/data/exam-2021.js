/* MID-TERM TEST (AY 2020/2021, SEM 1)
   (file: cs1010e_2021S1_midterm_soln.pdf) — 25 questions.
   Despite the "_soln" file name this PDF carries no answer key, so every key
   below was derived by working each question out. Questions 11 and 24 use
   pictures in the original paper; the images are described in the stem. */
registerExam({
  id: 'midterm-2021',
  title: 'MID-TERM TEST (AY 2020/2021, SEM 1)',
  headerName: 'MID-TERM TEST (AY 2020/2021, SEM 1)',
  source: 'cs1010e_2021S1_midterm_soln.pdf',
  duration: 90,
  sections: [
    { name: 'Section 1 — Evaluate the expressions', from: 1, to: 10, marks: 1 },
    { name: 'Section 2 — Output prediction', from: 11, to: 21, marks: 1 },
    { name: 'Section 3 — Debugging', from: 22, to: 25, marks: 1 }
  ],
  questions: [
    {
      n: 1, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate the following expression without any pre-defined variable or package imported.' },
        { code: '>>> 1 + 2 - 3 * 4 + 5' }
      ],
      options: [
        { l: 'A', t: '-1' }, { l: 'B', t: '-4' }, { l: 'C', t: '2' },
        { l: 'D', t: '-24' }, { l: 'E', t: '1' }
      ],
      answer: 'B',
      explanation: '`*` binds tighter than `+` / `-`, so `3 * 4 = 12` and the expression is `1 + 2 - 12 + 5 = -4`.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> 'abc'[3]" }
      ],
      options: [
        { l: 'A', t: "'a'" }, { l: 'B', t: "'c'" }, { l: 'C', t: "'abc'" },
        { l: 'D', t: "'' (empty string)" }, { l: 'E', t: 'Error' }
      ],
      answer: 'E',
      explanation: "`'abc'` has indices 0, 1 and 2 (or -1 to -3). Index 3 is out of range, so Python raises IndexError."
    },
    {
      n: 3, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> 'abc'[4:9]" }
      ],
      options: [
        { l: 'A', t: "'a'" }, { l: 'B', t: "'c'" }, { l: 'C', t: "'abc'" },
        { l: 'D', t: "'' (empty string)" }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: 'A slice never raises for out-of-range bounds — it clamps them. Both bounds sit past the end, so the slice is empty.'
    },
    {
      n: 4, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> False or False or False' }
      ],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: 'False' }, { l: 'C', t: '0' },
        { l: 'D', t: '1' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: '`or` returns the first truthy operand, otherwise the last one. All three are False, so the result is False.'
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> anUndefinedVariable or True' }
      ],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: 'False' }, { l: 'C', t: '0' },
        { l: 'D', t: '1' }, { l: 'E', t: 'Error' }
      ],
      answer: 'E',
      explanation: 'The left operand is evaluated first and raises NameError; `or` never gets the chance to short-circuit on True.'
    },
    {
      n: 6, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> False and anUndefinedVariable or True' }
      ],
      options: [
        { l: 'A', t: 'False' }, { l: 'B', t: 'True' }, { l: 'C', t: '0' },
        { l: 'D', t: '1' }, { l: 'E', t: 'Error' }
      ],
      answer: 'B',
      explanation: '`and` sees the first False, short-circuits (the undefined name is never touched) and yields False; then `False or True` is True.'
    },
    {
      n: 7, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> 'a' + 'b' * 3 * 2" }
      ],
      options: [
        { l: 'A', t: "'ababab'" }, { l: 'B', t: "' abababababab'" },
        { l: 'C', t: "'abbbbbb'" }, { l: 'D', t: "'' (empty string)" },
        { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: "`'b' * 3 * 2` repeats the single character six times to give `'bbbbbb'`; the leading `'a'` is then concatenated."
    },
    {
      n: 8, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'uses a list literal — lists are not in the midterm scope' },
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> [(1, 2, (3, 4)), (5, (6))][1][-1]' }
      ],
      options: [
        { l: 'A', t: '(6,)' }, { l: 'B', t: '6' }, { l: 'C', t: '5' },
        { l: 'D', t: '2' }, { l: 'E', t: '(3,4)' }
      ],
      answer: 'B',
      explanation: '`(5, (6))` is the same as `(5, 6)` — the parentheses around 6 do not make a tuple because there is no comma. Its last element is the int 6.'
    },
    {
      n: 9, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about the list() built-in' },
      stem: [
        { p: 'Evaluate:' },
        { code: ">>> list((1)) + list([2]) + list('3')" }
      ],
      options: [
        { l: 'A', t: "[1, 2, '3']" }, { l: 'B', t: 'Error!' },
        { l: 'C', t: "[(1,), [2], ['3']]" }, { l: 'D', t: "[[1], [2], ['3']]" },
        { l: 'E', t: "[1, [2], [3]]" }
      ],
      answer: 'B',
      explanation: '`(1)` is just the integer 1, so `list((1))` is `list(1)`. Integers are not iterable, so a TypeError is raised.'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [
        { p: 'Evaluate:' },
        { code: '>>> (lambda x, y: lambda z: x(y(z)))(lambda x: x + 1, lambda y: y * 2)(2)' }
      ],
      options: [
        { l: 'A', t: '(3,4)' }, { l: 'B', t: '5' }, { l: 'C', t: '6' },
        { l: 'D', t: '4' }, { l: 'E', t: '8' }
      ],
      answer: 'B',
      explanation: 'The outer call binds `x = (x + 1)` and `y = (y * 2)`, so the inner expression `x(y(z))` is `(z * 2) + 1 = 2 * 2 + 1 = 5`.'
    },

    {
      n: 11, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about the turtle module' },
      stem: [
        { p: 'What will the following code draw? (In the original paper the four options are pictures: a) a regular pentagon, b) a five-pointed star, c) a regular hexagon, d) a triangle.)' },
        { code: 'from turtle import *\ndef drawSomething():\n    for _ in range(6):\n        fd(100)\n        rt(360 - 360 // 5)\n    ht() # hiding the turtle cursor\ndrawSomething()' }
      ],
      options: [
        { l: 'A', t: 'a regular pentagon' },
        { l: 'B', t: 'a five-pointed star (pentagram)' },
        { l: 'C', t: 'a regular hexagon' },
        { l: 'D', t: 'a triangle' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'B',
      explanation: '`360 - 360 // 5 = 288°`, which is a 72° turn to the left. Five steps of `fd(100)` with 72° turns return the turtle to its start, tracing a pentagram; the sixth step just retraces an edge, so the figure is a five-pointed star.'
    },
    {
      n: 12, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about mutating a list in place' },
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'def doubleSeq(l):\n    for i in range(len(l) // 2):\n        l[i] //= 2\n    return l\n\nprint(doubleSeq([1, 2, 3, 4, 5, 6]))' }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '(0, 1, 1, 4, 5, 6)' },
        { l: 'C', t: '[0, 1, 1, 4, 5, 6]' }, { l: 'D', t: '[0, 1, 1, 2, 2, 3]' },
        { l: 'E', t: '(0, 1, 1, 2, 2, 3)' }
      ],
      answer: 'C',
      explanation: 'Only the first `len(l) // 2 = 3` elements are halved with floor division: 1 // 2 = 0, 2 // 2 = 1, 3 // 2 = 1, giving [0, 1, 1, 4, 5, 6].'
    },
    {
      n: 13, marks: 1, type: 'mcq',
      scope: { level: 'crucial', reason: 'you must know lists are mutable and aliased' },
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 't1 = [1, 2, 3]\nt2 = (t1, t1)\nt2[0][2] = 0\nprint(t2)' }
      ],
      options: [
        { l: 'A', t: 'Error' },
        { l: 'B', t: '[((1, 2, 3), (1, 2, 3)), (1, 2, 3)]' },
        { l: 'C', t: '([1, 2, 0], [1, 2, 0])' },
        { l: 'D', t: '([1, 2, 0], [1, 2, 3])' },
        { l: 'E', t: '([1, 2, 3], [1, 2, 3])' }
      ],
      answer: 'C',
      explanation: 'Both slots of the tuple point at the one list `t1`. Mutating through `t2[0]` changes that list, so both entries show `[1, 2, 0]`.'
    },
    {
      n: 14, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code? (Note that 362880 = 1 x 2 x 3 x .. 9)' },
        { code: 'ans = 1\nfor i in range(0, 10, 5):\n    ans *= i\nprint(ans)' }
      ],
      options: [
        { l: 'A', t: '6' }, { l: 'B', t: '362880' }, { l: 'C', t: '0' },
        { l: 'D', t: '1' }, { l: 'E', t: '46' }
      ],
      answer: 'C',
      explanation: '`range(0, 10, 5)` yields 0 and 5. Multiplying the running product by 0 first makes it 0, and 0 * 5 stays 0.'
    },
    {
      n: 15, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'def foo(n):\n    output = 0\n    for i in range(n):\n        for j in range(n):\n            if i == j:\n                output += i * j\n    return output\n\nprint(foo(3))' }
      ],
      options: [
        { l: 'A', t: '0' }, { l: 'B', t: '3' }, { l: 'C', t: '5' },
        { l: 'D', t: '14' }, { l: 'E', t: 'a number larger than 14' }
      ],
      answer: 'C',
      explanation: 'Only the diagonal contributes: 0 * 0 + 1 * 1 + 2 * 2 = 0 + 1 + 4 = 5.'
    },
    {
      n: 16, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'def foo():\n    if True:\n        return 999\n    return callWhat()\nprint(foo())\ndef callWhat():\n    return 123' }
      ],
      options: [
        { l: 'A', t: 'Error!' }, { l: 'B', t: '123' }, { l: 'C', t: '999' },
        { l: 'D', t: 'None' }, { l: 'E', t: 'None of the above' }
      ],
      answer: 'C',
      explanation: 'The function returns 999 immediately; the line calling `callWhat` is unreachable, and function order does not matter here.'
    },
    {
      n: 17, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'wraps the result in a list literal' },
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'def foo(x, y):\n    return lambda z: z - x + y\nprint([foo(1, 2)(3)])' }
      ],
      options: [
        { l: 'A', t: '[4]' }, { l: 'B', t: '[2]' }, { l: 'C', t: '2' },
        { l: 'D', t: '[0]' }, { l: 'E', t: 'Error!' }
      ],
      answer: 'A',
      explanation: '`foo(1, 2)` returns `lambda z: z - 1 + 2`, so applying it to 3 gives 4, wrapped in a list as `[4]`.'
    },
    {
      n: 18, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'def foo(x):\n    return lambda x: x + x\nprint(foo(5)(2))' }
      ],
      options: [
        { l: 'A', t: '2' }, { l: 'B', t: '7' }, { l: 'C', t: '4' },
        { l: 'D', t: '8' }, { l: 'E', t: '10' }
      ],
      answer: 'C',
      explanation: 'The lambda parameter `x` shadows the enclosing one, so the call doubles the argument 2 to 4 (the 5 is ignored).'
    },
    {
      n: 19, marks: 1, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'def foo(x):\n    return lambda y: x(x(y))\ndef square(x):\n    return x + 3\nprint(foo(foo(square))(2))' }
      ],
      options: [
        { l: 'A', t: '65536 (this is equal to 2 to power 16)' },
        { l: 'B', t: '5' }, { l: 'C', t: '14' }, { l: 'D', t: '8' }, { l: 'E', t: '12' }
      ],
      answer: 'C',
      explanation: '`foo(square)` adds 6 to its argument, and `foo` then applies that function twice, so the call adds 12: 2 + 12 = 14.'
    },
    {
      n: 20, marks: 1, type: 'mcq',
      scope: { level: 'crucial', reason: 'needs list.remove() to see the infinite loop' },
      stem: [
        { p: 'What is true about the following code if the input `lst` is a list of integers with length more than 1?' },
        { code: 'def foo(lst):\n    while len(lst) > 1:\n        for i in lst[1:]:\n            if lst[0] >= i:\n                lst.remove(lst[0])\n    return lst[0]' }
      ],
      options: [
        { l: 'A', t: 'Always return the minimum of the list' },
        { l: 'B', t: 'Always return a list with the minimum of the list removed' },
        { l: 'C', t: 'Always return a sorted list in an ascending order' },
        { l: 'D', t: 'Always return the maximum of the list' },
        { l: 'E', t: 'This code may fall into infinite loop for some input' }
      ],
      answer: 'E',
      explanation: 'When the current first element is already smaller than every later element nothing is removed, so `len(lst) > 1` never becomes false and the loop spins forever — e.g. on `[1, 2, 3]`. It only terminates on inputs the repeated removals shrink to a single element.'
    },
    {
      n: 21, marks: 1, type: 'mcq',
      scope: { level: 'crucial', reason: 'needs list.remove() to see the sorted result' },
      stem: [
        { p: 'What is the functionality of the following code if the input `lst` is a list of integers with length more than 3?' },
        { code: 'def foo(lst):\n    if not lst:\n        return []\n    a = min(lst)\n    lst.remove(a)\n    return [a] + foo(lst)' }
      ],
      options: [
        { l: 'A', t: 'Return the minimum of the list' },
        { l: 'B', t: 'Return a list with the minimum of the list removed' },
        { l: 'C', t: 'Return a sorted list' },
        { l: 'D', t: 'Return a randomly scrambled list that may or may not be sorted' },
        { l: 'E', t: 'Return the smallest three numbers of the input' }
      ],
      answer: 'C',
      explanation: 'Each call puts the minimum of the remainder at the front, so the whole list ends up sorted in ascending order.'
    },

    {
      n: 22, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'd is built with list() and sliced as a list' },
      stem: [
        { p: 'Consider the following buggy function that takes a non-empty sequence of integers as its argument.' },
        { code: '1  def chking(seq):\n2      d = list(seq)\n3      b = len(seq)\n4      for a in range(b - 1):\n5          for i in d:\n6              if i == d[a:b]:\n7                  return False\n8              elif i >= max(d[a + 1:b]):\n9                 return True\n10             else:\n11                return False\n12     return True' },
        { p: 'Which line in the function will never get executed, regardless of the integer values contained in `seq`?' }
      ],
      options: [
        { l: 'A', t: 'Line 7' }, { l: 'B', t: 'Line 9' }, { l: 'C', t: 'Line 11' },
        { l: 'D', t: 'Line 12' }, { l: 'E', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: '`i` is a single integer while `d[a:b]` is a list, so the test on line 6 is always False and line 7 can never run. Lines 9 / 11 run on the first element of each inner pass, and line 12 runs when `len(seq) == 1` (the range `b - 1` is then empty).'
    },
    {
      n: 23, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'uses math.sqrt, which is not in the scope list' },
      stem: [
        { p: 'What will be the range of the input `x` that will crash this function `foo()`, assuming the input `x` is always an integer?' },
        { code: 'from math import sqrt\ndef foo(x):\n    return x > 0 and sqrt(x + 3) < 10' }
      ],
      options: [
        { l: 'A', t: 'x > 0' }, { l: 'B', t: 'x < 3' }, { l: 'C', t: '0 <= x <= 3' },
        { l: 'D', t: 'All of the above' },
        { l: 'E', t: 'None of the above. Namely, no integer value of x will crash the code.' }
      ],
      answer: 'E',
      explanation: '`sqrt` only runs when `x > 0` is already True, and then `x + 3` is positive, so `sqrt` never receives a negative argument. No integer value of x crashes it.'
    },
    {
      n: 24, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about turtle drawing' },
      stem: [
        { p: 'The target picture is six spokes radiating from one point (a "*" shape). Which option below would draw it? (In the original paper the three boxes are: **a)** `fd(100); bk(100); rt(360 // 6)`, **b)** `bk(100); rt(360 // 6); fd(100)`, **c)** `bk(100); fd(100); rt(360 // 6)`.)' },
        { code: 'from turtle import *\ndef drawSomething():\n    for _ in range(6):\n        ??? # Missing line\n        ??? # Missing line\n        ??? # Missing line\nht()\ndrawSomething()' }
      ],
      options: [
        { l: 'A', t: 'Only box a) will work' },
        { l: 'B', t: 'Only box b) will work' },
        { l: 'C', t: 'Only box c) will work' },
        { l: 'D', t: 'All three boxes a), b) and c) will work' },
        { l: 'E', t: 'Only two of the boxes a), b) or c) will work' }
      ],
      answer: 'E',
      explanation: 'Boxes a) and c) both draw out-and-back along one segment and then turn 60°, producing six spokes. Box b) turns between the two moves, so its second move heads off at 60° and the loop traces a triangle instead. Two of the three work.'
    },
    {
      n: 25, marks: 1, type: 'mcq',
      scope: { level: 'slight', reason: 'the worked example is a list' },
      stem: [
        { p: 'Given a sorted ascending sequence of numbers with length > 1, we want to find the first largest gap between two consecutive numbers. For example `>>> firstLargestGap([1, 3, 5, 7, 19, 21, 22, 24, 36, 39])` returns 12, the gap between 7 and 19. Here is the code:' },
        { code: 'def firstLargestGap(l):\n    ans = -1\n    ???????????????????????? # The missing line\n        gap = l[i + 1] - l[i]\n        if gap > ans:\n            ans = gap\n    return ans' },
        { p: 'Which one below is the correct line for the missing line?' }
      ],
      options: [
        { l: 'A', t: 'for i in range(0, len(l) - 1):' },
        { l: 'B', t: 'for i in range(0, len(l)):' },
        { l: 'C', t: 'for i in range(0, len(l), 2):' },
        { l: 'D', t: 'for i in range(0, len(l) - 1, 2):' },
        { l: 'E', t: 'for i in range(1, len(l)):' }
      ],
      answer: 'A',
      explanation: 'The body reads both `l[i + 1]` and `l[i]`, so `i` must run from 0 to `len(l) - 2` inclusive — that is `range(0, len(l) - 1)`.'
    }
  ]
});
