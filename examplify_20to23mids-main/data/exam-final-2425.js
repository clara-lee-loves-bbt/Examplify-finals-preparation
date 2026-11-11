/* FINAL ASSESSMENT (Semester 1 : AY 2024/25)
   (file: cs1010e_2425S1_final_exam_soln.pdf)
   35 questions, 100 marks, 2 hours. Questions 22-27 are the paper's
   "FITB with dropdown choices" items; the dropdowns are turned into typed
   blanks, with the printed choices kept in the stem. Keys follow the paper,
   except where noted in the explanation (Q22(c) and Q26(b) are worked out). */
registerExam({
  id: 'final-2425',
  category: 'final',
  title: 'FINAL ASSESSMENT (Semester 1 : AY 2024/25)',
  headerName: 'FINAL ASSESSMENT (SEM 1 : AY 2024/25)',
  source: 'cs1010e_2425S1_final_exam_soln.pdf',
  duration: 120,
  sections: [
    { name: 'Section A — MCQ (1 mark each)', from: 1, to: 15, marks: 1 },
    { name: 'Section B — MCQ (3 marks each)', from: 16, to: 21, marks: 3 },
    { name: 'Section C — Fill in the blanks, multiple parts', from: 22, to: 27, marks: 3 },
    { name: 'Section D — Fill in the blanks (6 marks each)', from: 28, to: 33, marks: 6 },
    { name: 'Section E — Fill in the blanks (8 marks each)', from: 34, to: 35, marks: 8 }
  ],
  questions: [
    {
      n: 1, marks: 1, type: 'mcq',
      stem: [
        { p: 'Consider the following program fragment:' },
        { code: 'seq[1] = sum(seq[:2])\nseq[2] = sum(seq[:3])\nseq[3] = sum(seq[:4])' },
        { p: 'Given that `seq` is `[1,2,3,4,5]`, what is the final value of `seq` after executing the above 3 lines?' }
      ],
      options: [
        { l: 'A', t: '[1, 3, 7, 15, 5]' }, { l: 'B', t: '[1, 3, 6, 10, 5]' },
        { l: 'C', t: '[1, 3, 6, 10, 15]' }, { l: 'D', t: '[1, 3, 7, 4, 5]' },
        { l: 'E', t: '[1, 3, 6, 4, 5]' }
      ],
      answer: 'A',
      explanation: 'Each later line sums the values already overwritten: `1+2=3`, then `1+3+3=7`, then `1+3+7+4=15`.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [
        { p: 'Consider the following program fragment:' },
        { code: 's = seq\ns[1] = sum(seq[:2])\ns[2] = sum(seq[:3])\ns[3] = sum(seq[:4])' },
        { p: 'Given that `seq` is `[1,2,3,4,5]`, what is the final value of `s` after executing the above 4 lines?' }
      ],
      options: [
        { l: 'A', t: '[1, 3, 7, 15, 5]' }, { l: 'B', t: '[1, 3, 6, 10, 5]' },
        { l: 'C', t: '[1, 3, 6, 10, 15]' }, { l: 'D', t: '[1, 3, 7, 4, 5]' },
        { l: 'E', t: '[1, 3, 6, 4, 5]' }
      ],
      answer: 'A',
      explanation: '`s = seq` makes a second name for the same list, so this behaves exactly like Q1 — and `seq` changes too.'
    },
    {
      n: 3, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about set union, which is not covered in lectures 1–11' },
      stem: [
        { p: 'Given the following program fragment:' },
        { code: 'def a(s, i):\n    return s | {i}' },
        { p: 'What is the output of' },
        { code: 'a(a(a(set(),1),2),1)' }
      ],
      options: [
        { l: 'A', t: '{1, 2}' }, { l: 'B', t: '{1, 2, 1}' }, { l: 'C', t: '{}' },
        { l: 'D', t: '{1}' }, { l: 'E', t: '{2}' }
      ],
      answer: 'A',
      explanation: '`|` is set union, and a set drops duplicates, so adding 1 twice still leaves `{1, 2}`.'
    },
    {
      n: 4, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about set operators and symmetric difference, which are not covered' },
      stem: [
        { p: 'Given that both `A` and `B` are sets, which of the following is equivalent to' },
        { code: '(A | B) - (A & B)' }
      ],
      options: [
        { l: 'A', t: 'A ^ B' }, { l: 'B', t: 'A * B' }, { l: 'C', t: 'A + B' },
        { l: 'D', t: 'A ** B' }, { l: 'E', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: 'Union minus intersection is the symmetric difference, written `A ^ B`: elements in exactly one of the two sets.'
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [
        { p: 'You are given a map with horizontal streets and vertical avenues, both labelled from 0. Your house H is at street 0, avenue 0. If you are currently at (A) along street 0 there is one shortest path home; if you are at (B) on street 1, avenue 2 there are three shortest paths home.' },
        { code: 'H---+---+---A---+---+---+\n|   |   |   |   |   |   |\n+---+---B---+---+---+---+\n|   |   |   |   |   |   |\n+---+---+---+---+---+---+' },
        { p: 'Complete the recursive function that returns the number of shortest paths from `(st, av)` home.' },
        { code: 'def findPath(st, av):\n    if st == 1 or av == 1:\n        return 1\n    return {{1}}' },
        { p: 'Which expression completes it?' }
      ],
      options: [
        { l: 'A', t: 'findPath(st - 1, av) + findPath(st, av - 1)' },
        { l: 'B', t: 'findPath(st + 1, av) + findPath(st, av + 1)' },
        { l: 'C', t: 'findPath(st, av) + findPath(av, st)' },
        { l: 'D', t: 'findPath(st - 1, av) + findPath(av - 1, st)' },
        { l: 'E', t: 'findPath(st, av - 1) + findPath(av, st - 1)' }
      ],
      answer: 'A',
      explanation: 'Every step reduces exactly one of the two distances, so the paths to `(st, av)` come from the two cells one step closer to home.'
    },
    {
      n: 6, marks: 1, type: 'mcq',
      stem: [
        { p: '`findPath` from the previous question is very similar to the binomial coefficient problem with parameters `(n, r)`. Complete the function (where `n >= r`):' },
        { code: 'def binomial_coeff(n, r):\n    return {{1}}' },
        { p: 'Which expression completes it?' }
      ],
      options: [
        { l: 'A', t: 'findPath(r + 1, n - r + 1)' }, { l: 'B', t: 'findPath(n, r)' },
        { l: 'C', t: 'findPath(r, n)' }, { l: 'D', t: 'findPath(n, r-1)' },
        { l: 'E', t: 'findPath(n-1, r-1) + findPath(n, r-1)' }
      ],
      answer: 'A',
      explanation: '`findPath(st, av)` counts `C(st + av - 2, st - 1)`. To get `C(n, r)` we need `st - 1 = r` and `st + av - 2 = n`, i.e. `st = r + 1` and `av = n - r + 1`.'
    },
    {
      n: 7, marks: 1, type: 'mcq',
      stem: [
        { p: 'Given the following `compose` function:' },
        { code: 'def compose(f, g):\n    return lambda x: f(g(x))' },
        { p: 'What is the outcome of' },
        { code: 'compose(lambda x: x * 2, lambda x: x + 2)(12)' }
      ],
      options: [
        { l: 'A', t: '28' }, { l: 'B', t: '26' }, { l: 'C', t: '48' },
        { l: 'D', t: '16' }, { l: 'E', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: '`g` is applied first: `12 + 2 = 14`, then `f`: `14 * 2 = 28`.'
    },
    {
      n: 8, marks: 1, type: 'mcq',
      stem: [
        { p: 'Using the same `compose(f, g)` definition, suppose we perform' },
        { code: 'compose(compose(f, g), compose(h, k))' },
        { p: 'Which of the following is/are equivalent?' }
      ],
      options: [
        { l: 'A', t: 'All of them' },
        { l: 'B', t: 'compose(f, compose(g, compose(h, k)))' },
        { l: 'C', t: 'compose(f, compose(compose(g, h), k))' },
        { l: 'D', t: 'compose(compose(f, compose(g, h)), k)' },
        { l: 'E', t: 'compose(compose(compose(f, g), h), k)' }
      ],
      answer: 'A',
      explanation: 'Function composition is associative: every grouping evaluates `f(g(h(k(x))))`, so all of B-E are the same function.'
    },
    {
      n: 9, marks: 1, type: 'mcq',
      stem: [
        { p: 'Given the following class:' },
        { code: 'class MyList:\n    def __init__(self, lst):\n        self.lst = lst\n    def do(self, f):\n        f(self.lst)\n        return MyList(self.lst)\n    def append(self, x):\n        return self.do(lambda lst: lst.append(x))\n    def remove(self, x):\n        return self.do(lambda lst: lst.remove(x))\n    def get(self):\n        return self.lst' },
        { p: 'What is the outcome of' },
        { code: 'MyList([1,2,3]).append(4).append(1).remove(1).get()' }
      ],
      options: [
        { l: 'A', t: '[2, 3, 4, 1]' }, { l: 'B', t: '[1, 2, 3, 4]' },
        { l: 'C', t: '[1, 2, 3]' }, { l: 'D', t: '[1, 4, 2, 3]' },
        { l: 'E', t: '[4, 1, 2, 3]' }
      ],
      answer: 'A',
      explanation: 'Appends give `[1,2,3,4,1]`; `remove(1)` deletes the *first* 1, leaving `[2,3,4,1]`. Each method returns a new `MyList` wrapping the same list.'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [
        { p: 'Consider the following `lsearch` function:' },
        { code: 'def lsearch(v, lst, i):\n    while i < len(lst) and lst[i] < v:\n        i += 1\n    return i' },
        { p: 'What is the value returned for' },
        { code: 'lsearch(6, [1, 3, 5, 7, 9, 1, 3, 5, 7, 9], 6)' }
      ],
      options: [
        { l: 'A', t: '8' }, { l: 'B', t: '2' }, { l: 'C', t: '3' },
        { l: 'D', t: '7' }, { l: 'E', t: '10' }
      ],
      answer: 'A',
      explanation: 'Starting at index 6 the values are 3 and 5, both below 6, so `i` advances to 8 where `lst[8] = 7` stops the loop.'
    },
    {
      n: 11, marks: 1, type: 'mcq',
      stem: [
        { p: 'Consider the following combination of `lsearch` (above) and `bsearch`:' },
        { code: 'def bsearch(v, lst, start, end):\n    if start > end:\n        return start\n    mid = (start + end) // 2\n    if lst[mid] == v:\n        return lsearch(v, lst, mid + 1)\n    if lst[mid] < v:\n        return bsearch(v, lst, mid + 1, end)\n    return bsearch(v, lst, start, mid - 1)' },
        { p: 'What is the value returned for' },
        { code: 'bsearch(6, [1, 3, 5, 7, 9, 1, 3, 5, 7, 9], 0, 4)' }
      ],
      options: [
        { l: 'A', t: '3' }, { l: 'B', t: '2' }, { l: 'C', t: '7' },
        { l: 'D', t: '8' }, { l: 'E', t: '10' }
      ],
      answer: 'A',
      explanation: '`mid = 2` holds 5 < 6, so it searches `(3, 4)`: `mid = 3` holds 7 > 6, so it searches `(3, 2)` — `start > end` and it returns `start = 3`.'
    },
    {
      n: 12, marks: 1, type: 'mcq',
      stem: [
        { p: 'Using `lsearch` and `bsearch` from the two previous questions:' },
        { code: 'def somesort(lst):\n    for i in range(1, len(lst)):\n        idx = bsearch(lst[i], lst, 0, i - 1)\n        lst[:i+1] = lst[:idx] + [lst[i]] + lst[idx:i]\n        print(lst)\n    return lst' },
        { p: 'What is the fifth line of output printed during `somesort([1, 3, 5, 7, 9, 1, 3, 5, 7, 9])`?' }
      ],
      options: [
        { l: 'A', t: '[1, 1, 3, 5, 7, 9, 3, 5, 7, 9]' },
        { l: 'B', t: '[1, 1, 3, 3, 5, 7, 9, 5, 7, 9]' },
        { l: 'C', t: '[1, 3, 5, 1, 3, 5, 7, 7, 9, 9]' },
        { l: 'D', t: '[1, 3, 1, 3, 5, 5, 7, 7, 9, 9]' },
        { l: 'E', t: 'None of the above.' }
      ],
      answer: 'A',
      explanation: 'The first four rounds change nothing (the prefix is already sorted); the fifth round inserts the element at index 5 (value 1) at the front — printing `[1, 1, 3, 5, 7, 9, 3, 5, 7, 9]`.'
    },
    {
      n: 13, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about the imageio package, which is not covered in lectures 1–11' },
      stem: [ { p: 'What package did we mention in lecture for image processing?' } ],
      options: [
        { l: 'A', t: 'IMAGEIO' }, { l: 'B', t: 'IMGPY' }, { l: 'C', t: 'PILLOWS' },
        { l: 'D', t: 'PSLIB' }, { l: 'E', t: 'IMAGEIOLIB' }
      ],
      answer: 'A',
      explanation: 'The lectures use `imageio` (with `imageio.v2.imread`) to read an image into a 3D array of pixel values.'
    },
    {
      n: 14, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about EXIF image metadata, which is not covered' },
      stem: [ { p: 'What is the meaning of "EXIF" mentioned in our class?' } ],
      options: [
        { l: 'A', t: 'Some information about an image' }, { l: 'B', t: 'A kind of exceptions' },
        { l: 'C', t: 'Extra conditional statements' }, { l: 'D', t: 'Assertion' },
        { l: 'E', t: 'A branch in the try block' }
      ],
      answer: 'A',
      explanation: 'EXIF is the metadata block stored inside an image file — camera model, orientation, timestamps and so on.'
    },
    {
      n: 15, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about matplotlib bar charts, which are not covered' },
      stem: [
        { p: 'The paper shows a chart of vertical bars, one per category, drawn with `matplotlib.pyplot`. Which of the following functions produces it?' }
      ],
      options: [
        { l: 'A', t: 'bar()' }, { l: 'B', t: 'plot()' }, { l: 'C', t: 'hist()' },
        { l: 'D', t: 'barh()' }, { l: 'E', t: 'pie()' }
      ],
      answer: 'A',
      explanation: '`bar()` draws one vertical bar per category; `barh()` draws them horizontally and `hist()` bins raw data into a distribution.'
    },
    {
      n: 16, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given the following function definition:' },
        { code: 'def uprt(lst):\n    if lst == []:\n        print(\'Empty\')\n    else:\n        print(f\'Near to {lst[0]}\')\n        uprt(lst[1:])\n        print(f\'Away from {lst[0]}\')' },
        { p: 'What is the last statement printed during the following execution?' },
        { code: '>>> uprt([1,2,3,4])' }
      ],
      options: [
        { l: 'A', t: 'Away from 1' }, { l: 'B', t: 'Away from 4' },
        { l: 'C', t: 'Empty' }, { l: 'D', t: 'Near to 1' }, { l: 'E', t: 'Near to 4' },
        { l: 'F', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: 'The post-recursion prints unwind in reverse order, so `Away from 1` (the outermost frame) comes last.'
    },
    {
      n: 17, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider the following function definition:' },
        { code: 'def knot(a,b,n):\n    if n == 0:\n        return []\n    if a == b:\n        return [a]\n    mid = (a + b) // 2\n    left = knot(a+1, mid-1, n-1) if mid - a > 2 else []\n    right = knot(mid+1, b-1, n-1) if b - mid > 2 else []\n    return [a] + [left] + [mid] + [right] + [b]' },
        { p: 'What is the value returned from executing the following expression?' },
        { code: '>>> len(knot(1,12,5))' }
      ],
      options: [
        { l: 'A', t: '5' }, { l: 'B', t: '9' }, { l: 'C', t: '11' },
        { l: 'D', t: '13' }, { l: 'E', t: '15' }
      ],
      answer: 'A',
      explanation: 'With `a = 1` and `b = 12`, `mid - a = 4` and `b - mid = 6`; the recursion is bounded by `n = 5` and returns `[1, [], 6, [], 12]`, whose length is 5.'
    },
    {
      n: 18, marks: 3, type: 'mcq',
      scope: { level: 'crucial', reason: "you must understand QuickSort's partition, which L10 does not teach (it covers selection and merge sort)" },
      stem: [
        { p: 'The following `partition` function is used in QuickSort:' },
        { code: 'def partition(lst,x):\n    lsta = []\n    lstb = []\n    for i in lst:\n        if i != x:\n            if i < x:\n                lsta.append(i)\n            else:\n                lstb.append(i)\n    return (lsta,lstb)' },
        { p: 'Given a non-empty unsorted list `LIST0` of distinct integers, we execute:' },
        { code: '>>> r1,r2 = partition(LIST0, LIST0[0])\n>>> nLIST = r1 + [LIST0[0]] + r2' },
        { p: 'Which of the following is correct about the content of `nLIST`?' }
      ],
      options: [
        { l: 'A', t: 'At least one element in nLIST has been correctly placed into the finally sorted position.' },
        { l: 'B', t: 'All elements in nLIST have been placed into the finally sorted position.' },
        { l: 'C', t: 'It is possible that no element in nLIST has been placed into the finally sorted position.' },
        { l: 'D', t: 'Execution aborted due to some logical error' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: 'Everything smaller than the pivot ends up on its left and everything larger on its right, so the pivot itself is in its final sorted position — but the rest are only partitioned, not sorted.'
    },
    {
      n: 19, marks: 3, type: 'mcq',
      scope: { level: 'crucial', reason: 'needs multi-key sort stability, which L10 does not cover' },
      stem: [
        { p: 'Given any list of tuples, `gbsort` sorts it by one component with a chosen comparison:' },
        { code: 'def bubbleC(lst,idx,cmp):\n    n = len(lst)\n    lst1 = lst.copy()\n    for i in range(1,n):\n        if cmp(lst1[i-1][idx],lst1[i][idx]):\n            lst1[i-1],lst1[i] = lst1[i],lst1[i-1]\n    return lst1\n\ndef gbsort(lst, idx, cmp):\n    n = len(lst)\n    lst1 = lst.copy()\n    for i in range(n):\n        lst1 = bubbleC(lst1,idx,cmp)\n    return lst1' },
        { p: 'Which call sorts `lst1` primarily (non-decreasing) by the first component and, within equal first components, secondarily (non-increasing) by the second component?' },
        { code: '>>> [(-2, 15, \'v\'), (0, 18, \'h\'), (2, 19, \'m\'), (2, 18, \'m\'), (2, 16, \'m\')]' }
      ],
      options: [
        { l: 'A', t: 'gbsort(gbsort(lst1,1,lambda a,b: a < b), 0, lambda a,b: a > b)' },
        { l: 'B', t: 'gbsort(gbsort(lst1,0,lambda a,b: a > b), 1, lambda a,b: a < b)' },
        { l: 'C', t: 'gbsort(gbsort(lst1,1,lambda a,b: a <= b), 0, lambda a,b: a >= b)' },
        { l: 'D', t: 'gbsort(gbsort(lst1,0,lambda a,b: a >= b), 1, lambda a,b: a <= b)' },
        { l: 'E', t: 'There are at least two correct choices above' },
        { l: 'F', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: 'A swap happens when `cmp(previous, current)` is true, so `a > b` sorts ascending and `a < b` sorts descending. The secondary key must be applied first; the stable primary pass then groups equal first components without disturbing the second-component order.'
    },
    {
      n: 20, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider applying the following function to a nested list:' },
        { code: 'def mystery(lst,f):\n    if lst == []:\n        return []\n    if type(lst[0]) == int:\n        if f(lst[0]):\n            return [ lst[0] ] + mystery(lst[1:],f)\n        else:\n            return mystery(lst[1:],f)\n    return mystery(lst[0],f) + mystery(lst[1:],f)' },
        { p: 'What is printed by the following execution?' },
        { code: '>>> k = [[0, -4, [-4]], 4, -2, 1, 3, [[5], -4, -5], 3, -4, 5, 2]\n>>> out = mystery(k, lambda n: n > 0)\n>>> print(out)' }
      ],
      options: [
        { l: 'A', t: '[4, 1, 3, 5, 3, 5, 2]' },
        { l: 'B', t: '[4, 1, 3, [5], 3, 5, 2]' },
        { l: 'C', t: '[[], 4, 1, 3, [[5]], 3, 5, 2]' },
        { l: 'D', t: '[[[]], 4, 1, 3, [[5]], 3, 5, 2]' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: 'It flattens the nesting and keeps only the integers that satisfy `n > 0`, in order: 4, 1, 3, 5, 3, 5, 2.'
    },
    {
      n: 21, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider applying the following function to a nested list and a number:' },
        { code: 'def sotong(lst,n):\n    if lst == []:\n        return 0\n    fst = lst[0]\n    rest = lst[1:]\n    fnum = 0\n    if type(fst) == int:\n        fnum = 1 if fst == n else 0\n    else:\n        fnum = sotong(fst,n)\n        if fnum > 0:\n            fnum += 1\n    rnum = sotong(rest,n)\n    return max(fnum,rnum)' },
        { p: 'What is returned by the following call?' },
        { code: '>>> sotong([3,[[14,[4,3]]],5,[3,2]],3)' }
      ],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '3' }, { l: 'C', t: '2' },
        { l: 'D', t: '1' }, { l: 'E', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: 'The deepest 3 is inside `[4,3]`, which is nested inside two further lists: 1 for the match, plus 1 for each enclosing list that contains it, giving 4.'
    },
    {
      n: 22, marks: 3, type: 'fib',
      scope: { level: 'total', reason: 'the whole question is about turtle graphics, which are not covered' },
      stem: [
        { p: 'The following Turtle program draws an analog clock face. It takes integer hours `hh` (0-23) and minutes `mm` (0-59).' },
        { code: 'def clock(hh,mm):\n    clearscreen()\n    right(({{1}} * mm) - 90)\n    forward(200)\n    home()\n    right({{2}} * (hh * 60 + mm) - 90)\n    forward(160)\n    hideturtle()\n\n# (c) Deployed for a full day, the hour hand coincides with\n#     the minute hand {{3}} times.' },
        { p: 'The paper offers these choices. (a) `6`, `5`, `0.5`, `2`, `0.25`. (b) `0.5`, `6`, `5`, `2`, `0.25`. (c) `2`, `12`, `24`, `1`, none of the above.' }
      ],
      blanks: [
        { n: 1, answer: '6' },
        { n: 2, answer: '0.5' },
        { n: 3, answer: '22' }
      ],
      explanation: 'The minute hand sweeps 360 degrees in 60 minutes, so 6 degrees per minute; the hour hand sweeps 360 degrees in 12 hours, so 0.5 degrees per minute. The hands coincide 11 times per 12 hours, hence 22 times in a day (not the 24 a naive division suggests). The printed answer column marks part (c) as option (a), 2, which cannot be right: a coincidence happens once every 12/11 hours.'
    },
    {
      n: 23, marks: 2, type: 'fib',
      stem: [
        { p: 'The following expression evaluates to `True` if a non-empty string `s` is a palindrome, without the doubled-up comparisons of `s == s[::-1]`.' },
        { code: 's[ : {{1}}//2] == s[{{2}}//2 : ][ : : -1]' },
        { p: 'The choices for (1) are `len(s)`, `(len(s) + 1)`, `(len(s) - 1)`, `0`, none of the above. The choices for (2) are `(len(s) + 1)`, `len(s)`, `(len(s) - 1)`, `0`, none of the above.' }
      ],
      blanks: [
        { n: 1, answer: 'len(s)' },
        { n: 2, answer: '(len(s) + 1)' }
      ],
      explanation: 'Compare the first `len(s)//2` characters with the *last* `len(s)//2` characters read backwards. For odd lengths the middle character is skipped, so the second slice starts at `(len(s) + 1)//2`.'
    },
    {
      n: 24, marks: 3, type: 'fib',
      stem: [
        { p: 'Given `[s0, s1, s2, s3, ...]`, we compute `s0 - s1 + s2 - s3 + ...` with:' },
        { code: 'def compute(seq):\n    pairs = map(lambda x: {{1}}, seq)\n    return reduce(lambda p,q: ({{2}}, {{3}}), pairs)[0]' },
        { p: 'For example, `compute([1,2,3,4,5])` returns 3. The choices for (1) are `(x, -1)`, `(x, 1)`, `(x**2, 1)`, `(x, x % 2)`, `(x, x**2)`; for (2) `p[0] + (p[1] * q[0])`, `p[1] + (p[0] * q[1])`, `p[0] + (p[0] * q[1])`, `p[1] + (p[1] * q[0])`, `p[1] + (p[0] * q[0])`; for (3) `p[1] * q[1]`, `p[0] * q[0]`, `p[0] * q[1]`, `p[1] * q[0]`, `q[0] * q[1]`.' }
      ],
      blanks: [
        { n: 1, answer: '(x, -1)' },
        { n: 2, answer: 'p[0] + (p[1] * q[0])' },
        { n: 3, answer: 'p[1] * q[1]' }
      ],
      explanation: 'Each element becomes `(value, sign)` with the first sign `-1`. The accumulator adds `sign * next value` and flips the sign with `p[1] * q[1]`, giving 1 - 2 + 3 - 4 + 5 = 3.'
    },
    {
      n: 25, marks: 2, type: 'fib',
      stem: [
        { p: 'Over 800 students each have a 7-digit identifier. Grouping them by the last digit speeds up searching:' },
        { code: 'def group(seq, f):\n    dct = {}\n    for i in seq:\n        dct[f(i)] = [i] + {{1}}\n    return dct\n\nh = group([1234567, 1000007, 7654321], {{2}})' },
        { p: 'With the right `f`, `h` becomes `{7: [1000007, 1234567], 1: [7654321]}`. The choices for (1) are `(dct[f(i)] if f(i) in dct else [])`, `(dct[f(i)] if f(i) not in dct else [])`, `([] if f(i) in dct else dct[f(i)])`, `dct[f(i)]`; for (2) `lambda x: x % 10`, `x % 10`, `lambda x: x % 10 == 0`, `x // 10`, `lambda x: x // 10 == 1`.' }
      ],
      blanks: [
        { n: 1, answer: '(dct[f(i)] if f(i) in dct else [])' },
        { n: 2, answer: 'lambda x: x % 10' }
      ],
      explanation: '`f(i)` is the last digit and `group` needs a function object, so it must be a `lambda`. Prepending `[i]` to the existing bucket keeps newest-first order; an empty list is used the first time a bucket is seen.'
    },
    {
      n: 26, marks: 2, type: 'fib',
      stem: [
        { p: 'Study the following classes. Complete `Tank` so that `Tank().fire()` prints `Fire!`.' },
        { code: 'class Weapon:\n    def fire(self):\n        pass\n\nclass Cannon(Weapon):\n    def fire(self):\n        print("Fire!")\n\nclass Tank(Weapon):\n    def __init__(self):\n        {{1}}\n    def fire(self):\n        {{2}}' },
        { p: 'The choices for (1) are `self.cannon = Cannon()`, `self.cannon = Cannon(Weapon())`, `cannon = Weapon()`, `self.cannon = Weapon(Cannon())`, `cannon = Cannon(Weapon())`; for (2) `s`, `super.cannon.fire()`, `cannon.fire()`, `super.cannon().fire()`, `self.cannon().fire()`.' }
      ],
      blanks: [
        { n: 1, answer: 'self.cannon = Cannon()' },
        { n: 2, answer: 'self.cannon.fire()' }
      ],
      explanation: 'Composition, not inheritance: the tank stores a `Cannon` on itself (so it survives after `__init__` ends) and delegates `fire()` to it. `super()` would call `Weapon.fire`, which does nothing, and `self.cannon()` would try to call a non-callable object. The printed answer column marks this blank as option (a), the stray letter `s`, which is not runnable; the delegation shown is the only choice that makes `Tank().fire()` print `Fire!`.'
    },
    {
      n: 27, marks: 3, type: 'fib',
      stem: [
        { p: 'A magic square of odd order `n` is an `n x n` grid of `n^2` consecutive integers whose rows, columns and diagonals all sum to the same value.' },
        { code: '# (a) build a 3-by-3 grid of zeros\nm = {{1}}\n\n# (b) the correct first call for n = 3\nmagic({{2}})\n\n# (c) the sum of each row / column / diagonal,\n#     for values from c to c + n*n - 1\n{{3}}' },
        { p: 'The methods: (a) `[[0 for i in range(3)] for j in range(3)]`, `[[0 for i in range(3)]] * 3`, `[0 for i in range(3)] * 3`, `[[0 for i in range(3)]][:] * 3`, none of the above. (b) `m, 1, 0, 1`, `m, 0, 1, 1`, `m, 0, 2, 1`, `m, 2, 0, 1`, `m, 1, 1, 1`. (c) `n * (n**2 + 1) / 2 + n * (c-1)`, `n * (n**2 + 1) / 2 + n * c`, `n * (n**2 + 1) / 2 + (c - 1)`, `n**3 / 2 + (c + 1)`, none of the above.' }
      ],
      blanks: [
        { n: 1, answer: '[[0 for i in range(3)] for j in range(3)]' },
        { n: 2, answer: 'm, 0, 1, 1' },
        { n: 3, answer: 'n * (n**2 + 1) / 2 + n * (c-1)' }
      ],
      explanation: 'Only the nested comprehension builds three *distinct* rows — `[[...]] * 3` aliases one row. The Siamese method starts at the middle column of the first row, `(0, n//2) = (0, 1)`. The standard `1..n^2` square sums to `n(n^2+1)/2`; shifting every value by `c-1` adds `n(c-1)` to each line.'
    },
    {
      n: 28, marks: 6, type: 'fib',
      stem: [
        { p: 'Complete the function that prints `k` multiples of `n`.' },
        { code: '>>> print_multiples(3,4)\n3\n6\n9\n12' },
        { code: 'def print_multiples(n,k):\n    for i in range({{1}}):\n        print({{2}})' }
      ],
      blanks: [
        { n: 1, answer: '1,k+1' },
        { n: 2, answer: 'n*i' }
      ],
      explanation: 'The multipliers are `1..k`, so the range is `range(1, k+1)`, and each line prints `n * i`.'
    },
    {
      n: 29, marks: 6, type: 'fib',
      stem: [
        { p: 'Given a list of integers `L` without duplicates, return `True` if it is increasing.' },
        { code: '>>> print(check_increasing([1,2,3,5,6,7,10,12]))\nTrue\n>>> print(check_increasing([1,2,3,5,6,7,10,9,12]))\nFalse' },
        { code: 'def check_increasing(L):\n    for i in {{1}}:\n        if {{2}}:\n            return False\n    return True' }
      ],
      blanks: [
        { n: 1, answer: 'range(len(L)-1)' },
        { n: 2, answer: 'L[i] > L[i+1]' }
      ],
      explanation: 'Each element is compared with its successor, so the index stops one short of the end; an empty or single-element list never enters the loop and is increasing.'
    },
    {
      n: 30, marks: 6, type: 'fib',
      stem: [
        { p: 'Given two strings of the same length in upper case, output `"Y"` where the characters match and `"N"` where they differ. You must use recursion.' },
        { code: '>>> print(check_same(\'EXPENSE\',"EXPANDS"))\nYYYNYNN\n>>> print(check_same(\'UNION\',"ONION"))\nNYYYY' },
        { code: 'def check_same(s1,s2):\n    if s1 == \'\':\n        return \'\'\n    if {{1}}:\n        return {{2}}\n    else:\n        return {{3}}' }
      ],
      blanks: [
        { n: 1, answer: 's1[0] == s2[0]' },
        { n: 2, answer: "'Y' + check_same(s1[1:], s2[1:])" },
        { n: 3, answer: "'N' + check_same(s1[1:], s2[1:])" }
      ],
      explanation: 'Compare the first characters, emit `"Y"` or `"N"`, then recurse on both tails; the empty-string base case ends the recursion.'
    },
    {
      n: 31, marks: 6, type: 'fib',
      stem: [
        { p: 'The same "is the list increasing?" test, but recursive. Note the function name is different from the previous question.' },
        { code: 'def check_increasing_r(L):\n    if not L:\n        return True\n    if {{1}}:\n        return {{2}}\n    else:\n        return {{3}}' }
      ],
      blanks: [
        { n: 1, answer: 'min(L) == L[0]' },
        { n: 2, answer: 'check_increasing_r(L[1:])' },
        { n: 3, answer: 'False' }
      ],
      explanation: 'In an increasing list the first element is the smallest, so `min(L) == L[0]` — then recurse on the tail. If the first element is not the minimum, the list cannot be increasing. (The printed model answer calls `check_increasing`, the non-recursive version from Q29; the recursive name is what the question asks for.)'
    },
    {
      n: 32, marks: 6, type: 'fib',
      stem: [
        { p: 'Create a 2D `r x c` checkerboard of `\'#\'` and spaces, given `czm(r,c)` (the lecture\'s `create_zero_matrix`).' },
        { code: '>>> pprint(checker_board(5,7))\n[[\'#\', \' \', \'#\', \' \', \'#\', \' \', \'#\'],\n [\' \', \'#\', \' \', \'#\', \' \', \'#\', \' \'],\n [\'#\', \' \', \'#\', \' \', \'#\', \' \', \'#\']]' },
        { code: 'def checker_board(r,c):\n    output = czm(r,c)\n    for i in {{1}}:\n        for j in {{2}}:\n            if {{3}}:\n                output[i][j] = {{4}}\n            else:\n                output[i][j] = {{5}}\n    return output' },
        { p: 'Write each character as a Python literal, e.g. `\'#\'` for the black square and `\' \'` for the white one.' }
      ],
      blanks: [
        { n: 1, answer: 'range(r)' },
        { n: 2, answer: 'range(c)' },
        { n: 3, answer: '(i+j)%2==0' },
        { n: 4, answer: "'#'" },
        { n: 5, answer: "' '" }
      ],
      explanation: 'Rows are `0..r-1` and columns `0..c-1`. Cells whose coordinates sum to an even number are black; the others are a single space.'
    },
    {
      n: 33, marks: 6, type: 'fib',
      stem: [
        { p: 'The binomial coefficient function from the assignment is very slow for large `n`. Make it faster with the technique from the lecture.' },
        { code: '{{1}}\ndef nCk(n,k):\n    if {{2}}:\n        return {{3}}\n    if n == k or k == 0:\n        return 1\n    ans = nCk(n-1,k-1)+nCk(n-1,k)\n    {{4}}\n    return ans' }
      ],
      blanks: [
        { n: 1, answer: 'cache = {}' },
        { n: 2, answer: '(n, k) in cache' },
        { n: 3, answer: 'cache[(n, k)]' },
        { n: 4, answer: 'cache[(n, k)] = ans' }
      ],
      explanation: 'Memoisation: check the cache first (keys are the tuple `(n, k)`, since a dict key must be hashable), return the stored value if present, otherwise compute and store it before returning.'
    },
    {
      n: 34, marks: 8, type: 'fib',
      stem: [
        { p: 'Given a deep list `seq` (lists of lists) without tuples, convert it into a deep tuple.' },
        { code: '>>> print(deep_convert([1,2,[3,4,[5,6],[7]]]))\n(1, 2, (3, 4, (5, 6), (7,)))' },
        { code: 'def deep_convert(seq):\n    if {{1}}:\n        return {{2}}\n    elif type(seq) != list:\n        return seq\n    else:\n        return {{3}}' }
      ],
      blanks: [
        { n: 1, answer: 'seq == []' },
        { n: 2, answer: 'tuple()' },
        { n: 3, answer: '(deep_convert(seq[0]),) + deep_convert(seq[1:])' }
      ],
      explanation: 'The empty list becomes the empty tuple; a non-list is returned unchanged; otherwise convert the head (keeping it as a one-element tuple) and concatenate the converted tail.'
    },
    {
      n: 35, marks: 8, type: 'fib',
      stem: [
        { p: 'Given a tuple of `(name, mark)` pairs, write a one-line function that returns how many students scored at least `mark`.' },
        { code: '>>> data = ((\'Peter\',90),(\'Mary\',99),(\'Paul\',65),(\'Jeff\',75))\n>>> print(higher_than(data,90))\n2\n>>> print(higher_than(data,74))\n3' },
        { code: 'def higher_than(data,mark):\n    return {{1}}' }
      ],
      blanks: [ { n: 1, answer: 'len(list(filter(lambda x: x[1] >= mark, data)))' } ],
      explanation: 'Keep the pairs whose second element is at least `mark`, then count them. `sum(map(lambda x: x[1] >= mark, data))` is an equally valid one-liner, since `True` counts as 1.'
    }
  ]
});
