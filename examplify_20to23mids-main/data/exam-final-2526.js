/* FINAL ASSESSMENT (Semester 1 : AY 2025/26)
   (files: cs1010e_2526S1_final_exam.pdf + cs1010e_2526S1_final_exam_soln.pdf)
   29 questions, 100 marks, 2 hours. Every key below is taken from the official
   solution PDF. */
registerExam({
  id: 'final-2526',
  category: 'final',
  title: 'FINAL ASSESSMENT (Semester 1 : AY 2025/26)',
  headerName: 'FINAL ASSESSMENT (SEM 1 : AY 2025/26)',
  source: 'cs1010e_2526S1_final_exam_soln.pdf',
  duration: 120,
  sections: [
    { name: 'Section A — Output prediction and Python semantics', from: 1, to: 23, marks: 3 },
    { name: 'Section B — Fill in the blanks', from: 24, to: 29, marks: 5 }
  ],
  questions: [
    {
      n: 1, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is printed by the following program?' },
        { code: 's = "ABCDEFG"\nprint(s[:2] + s[-1] * 3)' }
      ],
      options: [
        { l: 'A', t: 'ABGGG' }, { l: 'B', t: 'ABCGGG' },
        { l: 'C', t: 'ABGABGABG' }, { l: 'D', t: 'Causes TypeError' },
        { l: 'E', t: 'Causes IndexError' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: '`s[:2]` is `"AB"` and `s[-1] * 3` repeats the last character three times, giving `"AB" + "GGG" = "ABGGG"`.'
    },
    {
      n: 2, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is printed by the following program?' },
        { code: 's = "ABCDEFGHIJ"\nprint(s[2:7][::-1])' }
      ],
      options: [
        { l: 'A', t: 'GFEDC' }, { l: 'B', t: 'HGFEDC' },
        { l: 'C', t: 'CDEFGJ' }, { l: 'D', t: 'G' },
        { l: 'E', t: 'Causes IndexError' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: '`s[2:7]` is `"CDEFG"` (index 7 is excluded), and reversing that slice gives `"GFEDC"`.'
    },
    {
      n: 3, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given a string `s`, choose the conditional expression that evaluates to `"empty"` if `s` is an empty string, `"short"` if the length of `s` is less than 5, else `"long"`.' }
      ],
      options: [
        { l: 'A', t: '"empty" if len(s) == 0 else "short" if len(s) < 5 else "long"' },
        { l: 'B', t: '"short" if len(s) < 5 else ("empty" if s == "" else "long")' },
        { l: 'C', t: '"empty" if s == 0 else ("short" if len(s) < 5 else "long")' },
        { l: 'D', t: '"long" if len(s) >= 5 else "short"' },
        { l: 'E', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: 'A chained conditional is evaluated left to right, so the empty-string test must come first. B never reaches `"empty"` (an empty string has `len(s) < 5`, so it returns `"short"`), C compares a string with the integer `0`, and D never returns `"empty"`.'
    },
    {
      n: 4, marks: 3, type: 'mcq',
      stem: [
        { p: 'Which of the following options is equivalent to `f = lambda x: x * x + 1`?' }
      ],
      options: [
        { l: 'A', t: 'def f(y): return y ** 2 + 1' },
        { l: 'B', t: 'def f(x): return x ** x + 1' },
        { l: 'C', t: 'def f(x): print(x * x + 1)' },
        { l: 'D', t: 'def f(y): print(y ** 2 + 1)' },
        { l: 'E', t: 'def f(x): x * x + 1' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: '`x * x` is `x ** 2`, and the parameter name is irrelevant — only its position matters. A returns the value; C and D print instead, E returns `None`, and B computes `x ** x`.'
    },
    {
      n: 5, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is the result of evaluating the following program?' },
        { code: 'from functools import reduce\nreduce(lambda acc, x: acc + x, ["a", "b", "c"], "X")' }
      ],
      options: [
        { l: 'A', t: "'Xabc'" }, { l: 'B', t: "'abc'" }, { l: 'C', t: "'abcX'" },
        { l: 'D', t: "'Xcba'" }, { l: 'E', t: "'cbaX'" },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: 'The third argument is the initial accumulator, so the fold starts from `"X"` and appends each character in order: `X -> Xa -> Xab -> Xabc`.'
    },
    {
      n: 6, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given the following statement:' },
        { code: 'L = [ (i, j) for i in range(3) for j in range(4) ]' },
        { p: 'What is the value of `L[2]`?' }
      ],
      options: [
        { l: 'A', t: '(0, 2)' }, { l: 'B', t: '(2, 0)' }, { l: 'C', t: '(2, 2)' },
        { l: 'D', t: '[(0, 2), (1, 2), (2, 2)]' }, { l: 'E', t: '[(2, 0), (2, 1), (2, 2)]' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: 'The outer loop runs first and the inner loop changes fastest: `(0,0), (0,1), (0,2), (0,3), (1,0) ...`. So index 2 is `(0, 2)`.'
    },
    {
      n: 7, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given the following statement:' },
        { code: 'LL = [ [ (i, j) for i in range(3) ] for j in range(4) ]' },
        { p: 'What is the value of `LL[2]`?' }
      ],
      options: [
        { l: 'A', t: '[(0, 2), (1, 2), (2, 2)]' }, { l: 'B', t: '[(2, 0), (2, 1), (2, 2)]' },
        { l: 'C', t: '(2, 2)' }, { l: 'D', t: '(2, 0)' }, { l: 'E', t: '(0, 2)' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: 'Each element of `LL` is a whole row, and `j` is fixed at 2 for row 2, so the row is `[(0, 2), (1, 2), (2, 2)]`.'
    },
    {
      n: 8, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is printed by the following program?' },
        { code: 'def make_printer():\n    msg = "start"\n    def printer():\n        print(msg, end=" ")\n    msg = "updated"\n    return printer\n\np = make_printer()\nprint("before", end=" ")\np()\nmsg = "global"\np()' }
      ],
      options: [
        { l: 'A', t: 'before updated updated' }, { l: 'B', t: 'before start global' },
        { l: 'C', t: 'before updated global' }, { l: 'D', t: 'before start start' },
        { l: 'E', t: 'start before updated global' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: 'The inner function closes over the `msg` of `make_printer`, which is `"updated"` by the time the function returns. Re-assigning a *global* `msg` later does not touch that closed-over variable.'
    },
    {
      n: 9, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is printed by the following program?' },
        { code: 'def mysteryA(x, acc):\n    acc.append(x)\n    return acc\n\nL = []\nprint(mysteryA(1, L), end=" ")\nprint(mysteryA(2, L), end=" ")\nprint(mysteryA(3, L))' }
      ],
      options: [
        { l: 'A', t: '[1] [1, 2] [1, 2, 3]' }, { l: 'B', t: '[1] [2] [3]' },
        { l: 'C', t: '[] [] []' }, { l: 'D', t: '[1] [2, 1] [3, 2, 1]' },
        { l: 'E', t: 'Causes TypeError' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: '`append` mutates the single list object that `L` and `acc` both refer to, so each call sees the earlier appends.'
    },
    {
      n: 10, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider the following `do_it` function:' },
        { code: 'def do_it(L):\n    for i in range(len(L)):\n        L[i], L[len(L) - i - 1] = L[len(L) - i - 1], L[i]' },
        { p: 'Assume that `L` is a list, and suppose the following statements are executed:' },
        { code: 'Lcopy = L.copy()\ndo_it(L)' },
        { p: 'Which of the following best describes the mutation on `L` performed by the `do_it` function?' }
      ],
      options: [
        { l: 'A', t: 'L is unchanged with id(L[0]) == id(Lcopy[0])' },
        { l: 'B', t: 'L is unchanged with id(L[0]) != id(Lcopy[0])' },
        { l: 'C', t: 'L is reversed with id(L[0]) == id(Lcopy[-1])' },
        { l: 'D', t: 'L is reversed with id(L[0]) != id(Lcopy[-1])' },
        { l: 'E', t: 'Causes IndexError' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: 'The loop walks the whole range, so every pair is swapped twice and the list ends up exactly as it started. Only the positions change momentarily — the element objects are the same, so the ids still match the shallow copy.'
    },
    {
      n: 11, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is the result of evaluating the following program?' },
        { code: 'def mysteryB(T):\n    if type(T) != tuple:\n        return T if type(T) == int and T > 0 else 0\n    return sum( mysteryB(elem) for elem in T )\n\nmysteryB( ((1, -2), (3, (0, (4, -5))), "x") )' }
      ],
      options: [
        { l: 'A', t: '8' }, { l: 'B', t: '1' }, { l: 'C', t: '7' },
        { l: 'D', t: '4' }, { l: 'E', t: 'Causes TypeError' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: 'It sums every positive integer found anywhere in the nested tuple: `1 + 3 + 4 = 8`. Non-integers and non-positive integers contribute 0.'
    },
    {
      n: 12, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider the following program:' },
        { code: 'f = lambda a, b: lambda x: (a * x + a) % b\ng = f(3, 7)\n\nx = 0\nwhile True:\n    x = g(x)' },
        { p: 'Which of the following values will never be assigned to `x`?' }
      ],
      options: [
        { l: 'A', t: '2' }, { l: 'B', t: '1' }, { l: 'C', t: '3' },
        { l: 'D', t: '4' }, { l: 'E', t: '5' }, { l: 'F', t: '6' }
      ],
      answer: 'A',
      explanation: '`g(x) = (3x + 3) % 7`. From 0 the sequence is 0, 3, 5, 4, 1, 6, 0 … — a cycle of length 6 that never reaches 2.'
    },
    {
      n: 13, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is printed by the following program?' },
        { code: 'def deep_tag(L):\n    if not L:\n        return ""\n    if type(L[0]) == list:\n        return "@" + deep_tag(L[0]) + deep_tag(L[1:])\n    return "@" + L[0] + deep_tag(L[1:])\n\nprint( deep_tag( [["12", ["3"]], "456"] ) )' }
      ],
      options: [
        { l: 'A', t: '@@12@@3@456' }, { l: 'B', t: '@12@3@456' },
        { l: 'C', t: '@@12@@3@@456' }, { l: 'D', t: '@123456' },
        { l: 'E', t: '@@12@@3456' },
        { l: 'F', t: 'None of the other options is the correct answer' }
      ],
      answer: 'A',
      explanation: 'Every element gets a `@` before it, and a nested list gets an extra `@` for the list itself: `@` + `@12@@3` + `@456`.'
    },
    {
      n: 14, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider the following class definitions:' },
        { code: 'class AA:\n    pass\n\nclass BB(AA):\n    pass\n\nclass CC(AA):\n    pass\n\nclass DD(BB):\n    pass' },
        { p: 'What is the result of the following evaluation?' },
        { code: '>>> aa, bb, cc, dd = AA(), BB(), CC(), DD()\n>>> ( isinstance(aa, CC), isinstance(dd, AA),\n      isinstance(dd, CC), isinstance(cc, BB) )' }
      ],
      options: [
        { l: 'A', t: '(False, True, False, False)' }, { l: 'B', t: '(True, False, True, True)' },
        { l: 'C', t: '(True, False, False, False)' }, { l: 'D', t: '(False, True, True, False)' },
        { l: 'E', t: '(False, True, False, True)' }, { l: 'F', t: '(False, False, False, False)' }
      ],
      answer: 'A',
      explanation: '`isinstance` is true for the object\'s own class and its ancestors only. DD is a BB and an AA; AA is not a CC; CC is not a BB.'
    },
    {
      n: 15, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is printed by the following program?' },
        { code: 'class AA:\n    def __init__(self):\n        print("AA", end=" ")\n\nclass BB(AA):\n    def __init__(self):\n        super().__init__()\n        print("BB", end=" ")\n        self.aa = AA()\n\nclass CC(BB):\n    def __init__(self):\n        self.bb = BB()\n        print("CC", end=" ")\n        super().__init__()\n\naa, bb, cc = AA(), BB(), CC()' }
      ],
      options: [
        { l: 'A', t: 'AA AA BB AA AA BB AA CC AA BB AA' },
        { l: 'B', t: 'AA AA BB CC AA BB' },
        { l: 'C', t: 'AA BB CC' },
        { l: 'D', t: 'AA BB AA BB AA CC' },
        { l: 'E', t: 'AA BB AA AA CC BB AA AA BB AA AA' },
        { l: 'F', t: 'AA AA AA BB AA AA BB CC AA AA BB' }
      ],
      answer: 'A',
      explanation: '`AA()` prints AA. `BB()` prints AA BB, then constructs an `AA` (AA). `CC()` first constructs a `BB` (AA BB AA), prints CC, then runs the BB initialiser (AA BB AA) — so the CC line is AA BB AA CC AA BB AA.'
    },
    {
      n: 16, marks: 3, type: 'mcq',
      stem: [
        { p: 'The function `twoD_to_oneD` takes in a 2D array `M` and returns a new 1D array that is the "flattened" version of `M`. For example:' },
        { code: '>>> twoD_to_oneD([[3, 2, 1], [4, 5, 6]])\n[3, 2, 1, 4, 5, 6]' },
        { p: 'Complete the definition by choosing the correct expression for the blank.' },
        { code: 'def twoD_to_oneD(M):\n    Mrows = len(M)\n    Mcols = len(M[0])\n    A = [0] * (Mrows * Mcols)\n    for c in range(Mcols):\n        for r in range(Mrows):\n            A[ #_BLANK_# ] = M[r][c]\n    return A' }
      ],
      options: [
        { l: 'A', t: 'r * Mcols + c' }, { l: 'B', t: 'r * Mrows + c' },
        { l: 'C', t: 'c * Mcols + r' }, { l: 'D', t: 'c * Mrows + r' },
        { l: 'E', t: 'r + c' }, { l: 'F', t: 'r * c' }
      ],
      answer: 'A',
      explanation: 'Row-major flattening puts row `r` in the block starting at `r * Mcols`, then adds the column offset `c`.'
    },
    {
      n: 17, marks: 3, type: 'mcq',
      stem: [
        { p: 'The function `oneD_to_twoD` takes a 1D array `A` of length `R*C`, and two positive integers `R` and `C`, and returns a new 2D array of `R` rows and `C` columns, filled row by row. For example:' },
        { code: '>>> oneD_to_twoD([3, 2, 1, 4, 5, 6], 2, 3)\n[[3, 2, 1],\n [4, 5, 6]]' },
        { p: 'Complete the definition by choosing the correct expression for the blank.' },
        { code: 'def oneD_to_twoD(A, R, C):\n    M = [[0] * C for r in range(R)]\n    for i in range(len(A)):\n        #_BLANK_# = A[i]\n    return M' }
      ],
      options: [
        { l: 'A', t: 'M[i // C][i % C]' }, { l: 'B', t: 'M[i // R][i % R]' },
        { l: 'C', t: 'M[i // C][i % R]' }, { l: 'D', t: 'M[i // R][i % C]' },
        { l: 'E', t: 'M[i % R][i // C]' }, { l: 'F', t: 'M[i % C][i // R]' }
      ],
      answer: 'A',
      explanation: 'With `C` items per row, index `i` sits in row `i // C` and column `i % C`.'
    },
    {
      n: 18, marks: 3, type: 'mcq',
      stem: [
        { p: '`rotate_left` takes a matrix `M` and returns a new matrix that is `M` rotated 90 degrees counter-clockwise. For example:' },
        { code: '>>> rotate_left([[1, 2, 3],\n                 [4, 5, 6]])\n[[3, 6],\n [2, 5],\n [1, 4]]' },
        { p: 'Complete the definition by choosing the correct expression for the blank.' },
        { code: 'def rotate_left(M):\n    Mrows = len(M)\n    Mcols = len(M[0])\n    R = [ [ #_BLANK_#\n           for j in range(Mrows) ]\n         for i in range(Mcols) ]\n    return R' }
      ],
      options: [
        { l: 'A', t: 'M[j][Mcols - 1 - i]' }, { l: 'B', t: 'M[i][Mcols - 1 - j]' },
        { l: 'C', t: 'M[j][i]' }, { l: 'D', t: 'M[i][j]' },
        { l: 'E', t: 'M[Mrows - 1 - j][i]' }, { l: 'F', t: 'M[Mrows - 1 - i][j]' }
      ],
      answer: 'A',
      explanation: 'A counter-clockwise rotation makes the old columns the new rows: the new row `i` is the old column `i` read from the bottom up, i.e. `M[j][Mcols - 1 - i]`.'
    },
    {
      n: 19, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider the following dictionary `D`:' },
        { code: 'D = { 3: { 4: { 5: (50, 51)     },\n           6: { 7: (70, 71, 72) } },\n      8: (80, 81) }' },
        { p: 'Which of the following expressions evaluates to the integer `72`?' }
      ],
      options: [
        { l: 'A', t: 'D[3][6][7][2]' }, { l: 'B', t: 'D[7][6][3][2]' },
        { l: 'C', t: 'D[2][7][6][3]' }, { l: 'D', t: 'D[0][1][0][2]' },
        { l: 'E', t: 'D[2][0][1][0]' }, { l: 'F', t: 'D[7][2]' }
      ],
      answer: 'A',
      explanation: '`D[3]` gives the inner dict, `[6]` its sub-dict, `[7]` the tuple `(70, 71, 72)`, and `[2]` the third element.'
    },
    {
      n: 20, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider the following `binary_search` function:' },
        { code: 'def binary_search(L, val):\n    def search(low, high):\n        if low > high:\n            return False\n        mid = (low + high) // 2\n        print(mid, end=" ")      # added print() here\n        if L[mid] == val:\n            return True\n        elif val < L[mid]:\n            return search(low, mid - 1)\n        else:\n            return search(mid + 1, high)\n    return search(0, len(L) - 1)' },
        { p: 'What is the sequence of values printed when the following is evaluated?' },
        { code: '>>> binary_search(list(range(31)), 11.5)' }
      ],
      options: [
        { l: 'A', t: '15 7 11 13 12' }, { l: 'B', t: '15 7 11 9 10' },
        { l: 'C', t: '15 23 27 25 24' }, { l: 'D', t: '15 14 13 12 11' },
        { l: 'E', t: '15 0 14 1 13 2 12 3 11' }, { l: 'F', t: '15 13 11' }
      ],
      answer: 'A',
      explanation: 'Searching for 11.5 in 0..30: mid 15 (too high), mid 7 (too low), mid 11 (too low), mid 13 (too high), mid 12 (too high) — then `low > high` and it returns False. 11.5 is never in the list.'
    },
    {
      n: 21, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider the following function:' },
        { code: 'def do_what(x, L):\n    if not L:\n        return [x]\n    elif x <= L[0]:\n        return [x] + L\n    else:\n        return L[0:1] + do_what(x, L[1:])' },
        { p: 'What is the result of the following function call?' },
        { code: '>>> do_what(6, [5, 3, 2, 8, 7, 9])' }
      ],
      options: [
        { l: 'A', t: '[5, 3, 2, 6, 8, 7, 9]' }, { l: 'B', t: '[6, 5, 3, 2, 8, 7, 9]' },
        { l: 'C', t: '[5, 3, 2, 8, 7, 9, 6]' }, { l: 'D', t: '[5, 6, 3, 2, 8, 7, 9]' },
        { l: 'E', t: '[2, 3, 5, 6, 7, 8, 9]' }, { l: 'F', t: '[9, 8, 7, 6, 5, 3, 2]' }
      ],
      answer: 'A',
      explanation: 'It keeps the elements that come before `x` and drops `6` in front of the first element that is at least 6 — after the `5, 3, 2` run.'
    },
    {
      n: 22, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider the following `merge` function:' },
        { code: 'def merge(L1, L2):\n    result = []\n    while L1 and L2:\n        if L1[0] < L2[0]:\n            result.append(L1.pop(0))\n        else:\n            result.append(L2.pop(0))\n    result.extend(L1)\n    result.extend(L2)\n    return result' },
        { p: 'What is the result of the following evaluation?' },
        { code: '>>> merge([5, 3, 7, 2], [6, 4, 8, 1])' }
      ],
      options: [
        { l: 'A', t: '[5, 3, 6, 4, 7, 2, 8, 1]' }, { l: 'B', t: '[1, 2, 3, 4, 5, 6, 7, 8]' },
        { l: 'C', t: '[5, 3, 7, 2, 6, 4, 8, 1]' }, { l: 'D', t: '[5, 3, 2, 6, 4, 1, 7, 8]' },
        { l: 'E', t: '[5, 6, 3, 4, 7, 8, 1, 2]' }, { l: 'F', t: '[5, 6, 3, 4, 7, 8, 2, 1]' }
      ],
      answer: 'A',
      explanation: '`merge` only compares the current fronts, so on unsorted inputs it just interleaves: 5<6, 3<6, 7>6, 7>4, 7<8, 2<8, then the leftover 8 and 1.'
    },
    {
      n: 23, marks: 3, type: 'mcq',
      stem: [
        { p: '`intersect` takes two ascending-sorted lists and returns a new ascending-sorted list of the integers in both. For example:' },
        { code: '>>> intersect([2,4,6,8,9,10,14], [1,2,3,6,7,9,14,19])\n[2, 6, 9, 14]' },
        { p: 'Complete the definition by choosing the correct expression for the blank.' },
        { code: 'def intersect(L1, L2):\n    if (not L1) or (not L2):\n        return []\n    elif L1[0] == L2[0]:\n        return #_BLANK_#\n    elif L1[0] < L2[0]:\n        return intersect(L1[1:], L2)\n    else:\n        return intersect(L1, L2[1:])' }
      ],
      options: [
        { l: 'A', t: '[L1[0]] + intersect(L1[1:], L2[1:])' },
        { l: 'B', t: '[L1[0]] + [ intersect(L1[1:], L2[1:]) ]' },
        { l: 'C', t: '[ L1[0] + intersect(L1[1:], L2[1:]) ]' },
        { l: 'D', t: 'intersect(L1[1:], L2[1:])' },
        { l: 'E', t: '[L1[0]] + intersect(L1, L2)' },
        { l: 'F', t: '[ L1[0]] + intersect(L1, L2) ]' }
      ],
      answer: 'A',
      explanation: 'On a match, keep `L1[0]` as a one-element list and recurse on both tails; B nests the recursion one level too deep and C concatenates an int with a list.'
    },
    {
      n: 24, marks: 5, type: 'fib',
      stem: [
        { p: 'Given a string `s`, the following statement produces a tuple of the ASCII codes of only the uppercase letters in `s`, in order, using `map` and `filter` (no loops). Complete it.' },
        { code: 'tuple( map(      {{1}}     , filter(      {{2}}     , s) ) )' },
        { p: 'For `s = "NUS-CS1010e"` the result is `(78, 85, 83, 67, 83)`.' },
        { p: 'Hint: `ord(x)` returns the ASCII code of a character `x`.' }
      ],
      blanks: [
        { n: 1, answer: 'ord' },
        { n: 2, answer: 'lambda x: "Z" >= x >= "A"' }
      ],
      explanation: '`map` applies `ord` to every character that survives the filter, and the filter keeps characters between `"A"` and `"Z"` inclusive. An equivalent filter is `lambda x: x >= "A" and x <= "Z"`.'
    },
    {
      n: 25, marks: 5, type: 'fib',
      stem: [
        { p: '`flatten_tuple` takes a nested tuple `T` and returns a new, flat tuple. For example:' },
        { code: '>>> flatten_tuple( ((1, 2), 3, (4, (5,))) )\n(1, 2, 3, 4, 5)' },
        { p: 'Complete the definition. You must not call any built-in functions or methods.' },
        { code: 'def flatten_tuple(T):\n    if not T:\n        return      {{1}}     \n    head, tail = T[0], T[1:]\n    flat_head =      {{2}}      if type(head) == tuple else (head,)\n    return      {{3}}     ' }
      ],
      blanks: [
        { n: 1, answer: '()' },
        { n: 2, answer: 'flatten_tuple(head)' },
        { n: 3, answer: 'flat_head + flatten_tuple(tail)' }
      ],
      explanation: 'The empty tuple is the identity. A tuple head is flattened recursively; anything else is wrapped as a one-element tuple. Then concatenate the flattened head with the flattened tail.'
    },
    {
      n: 26, marks: 6, type: 'fib',
      stem: [
        { p: '`remove_dup` returns a string with all consecutive duplicate characters removed. For example:' },
        { code: '>>> remove_dup("aaabccdddda")\n\'abcda\'' },
        { p: 'Complete the definition. You must not call any built-in functions or methods.' },
        { code: 'def remove_dup(S):\n    if len(S) <= 1:\n        return      {{1}}     \n    elif S[0] == S[1]:\n        return      {{2}}     \n    else:\n        return      {{3}}     ' }
      ],
      blanks: [
        { n: 1, answer: 'S' },
        { n: 2, answer: 'remove_dup(S[1:])' },
        { n: 3, answer: 'S[0] + remove_dup(S[1:])' }
      ],
      explanation: 'A string of length 0 or 1 is already free of consecutive duplicates. When the first two characters repeat, drop the first one; otherwise keep it and recurse.'
    },
    {
      n: 27, marks: 5, type: 'fib',
      stem: [
        { p: '`make_sorted_list` takes a dictionary of frequency counts for integers in `[1, N]` and returns an ascending-sorted list with those counts. For example:' },
        { code: '>>> N = 10\n>>> D = {8: 1, 7: 3, 9: 2, 5: 1}\n>>> make_sorted_list(D, N)\n[5, 7, 7, 7, 8, 9, 9]' },
        { p: 'Complete the definition with a one-liner. You must not call any built-in functions or methods.' },
        { code: 'def make_sorted_list(D, N):\n    S = []\n    for i in range(1, N + 1):\n        if i in D:\n            {{1}}     \n    return S' }
      ],
      blanks: [ { n: 1, answer: 'S += [i] * D[i]' } ],
      explanation: 'Walking `1..N` and repeating each key `D[i]` times gives the sorted result directly; `S += [i] * D[i]` uses only list repetition and `+=`.'
    },
    {
      n: 28, marks: 5, type: 'fib',
      stem: [
        { p: '`what_sort` returns a new list with the numbers of its input in ascending order. For example:' },
        { code: '>>> what_sort([8, 3, 9, 5, 2, 7, 6, 9, 1, 5])\n[1, 2, 3, 5, 5, 6, 7, 8, 9, 9]' },
        { p: 'Complete it using `do_what`. You must not call any built-in functions or methods.' },
        { code: 'def do_what(x, L):\n    if not L:\n        return [x]\n    elif x <= L[0]:\n        return [x] + L\n    else:\n        return L[0:1] + do_what(x, L[1:])\n\ndef what_sort(L):\n    if not L:\n        return []\n    else:\n        return do_what(      {{1}}     ,      {{2}}     )' }
      ],
      blanks: [
        { n: 1, answer: 'L[0]' },
        { n: 2, answer: 'what_sort(L[1:])' }
      ],
      explanation: 'Insertion sort: sort the tail recursively, then insert the head into the already sorted result with `do_what`.'
    },
    {
      n: 29, marks: 5, type: 'fib',
      stem: [
        { p: 'Given the following `list_op` function:' },
        { code: 'def list_op(L):\n    L = L.copy()\n    for i in range(len(L) - 1, 0, -1):\n        for j in range(i):\n            L[j] = L[j] * 2\n    return L' },
        { p: 'Rewrite the body as a single list comprehension. For example, `list_op([1, 2, 3])` gives `[4, 4, 3]`.' },
        { code: 'def list_op(L):\n    return [      {{1}}      for i in range(len(L)) ]' }
      ],
      blanks: [ { n: 1, answer: 'L[i] * 2**(len(L) - i - 1)' } ],
      explanation: 'Element `i` is doubled once for every outer round that still includes it: rounds run `i = n-1 … 1`, so element `i` is doubled `n-1-i` times — multiply by `2 ** (len(L) - i - 1)`.'
    }
  ]
});
