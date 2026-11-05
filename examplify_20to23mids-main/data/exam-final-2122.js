/* FINAL EXAMINATION (Semester 1 : AY 2021/22)
   (file: cs1010e_2122S1_final_exam_soln.pdf)
   44 questions, 2 hours. Q1-30 are the paper's 60-mark MCQ set (2 marks each);
   Q31-40 are its code-analysis MCQs and Q41-44 its fill-in-the-blank
   programming questions. Keys follow the printed asterisks; two fixes are
   recorded in the explanations (Q15's printed key is wrong, and Q35's is
   "none of the rest" because the function raises TypeError). */
registerExam({
  id: 'final-2122',
  category: 'final',
  title: 'FINAL EXAMINATION (Semester 1 : AY 2021/22)',
  headerName: 'FINAL EXAMINATION (SEM 1 : AY 2021/22)',
  source: 'cs1010e_2122S1_final_exam_soln.pdf',
  duration: 120,
  sections: [
    { name: 'Section 1 — Syntax and Python usage (MCQ)', from: 1, to: 30, marks: 2 },
    { name: 'Section 2 — Code analysis (MCQ)', from: 31, to: 40, marks: 2 },
    { name: 'Section 3 — Fill in the blanks', from: 41, to: 44, marks: 5 }
  ],
  questions: [
    {
      n: 1, marks: 2, type: 'mcq',
      stem: [
        { p: 'You can consider the code in each question to be in a separate file. What is the output when the file is run in IDLE?' },
        { code: 'print(--10)' }
      ],
      options: [
        { l: 'A', t: '10' }, { l: 'B', t: '9' }, { l: 'C', t: '-10' },
        { l: 'D', t: '-9' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: 'Two unary minuses cancel, so this prints 10.'
    },
    {
      n: 2, marks: 2, type: 'mcq',
      stem: [ { code: 'print(7*8%3)' } ],
      options: [
        { l: 'A', t: '2' }, { l: 'B', t: '14' }, { l: 'C', t: '18' },
        { l: 'D', t: '21' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`*` and `%` are equal precedence and left-associative: `(7*8) % 3 = 56 % 3 = 2`.'
    },
    {
      n: 3, marks: 2, type: 'mcq',
      stem: [ { code: 'print(3==2!=1!=0)' } ],
      options: [
        { l: 'A', t: 'False' }, { l: 'B', t: 'True' }, { l: 'C', t: '1' },
        { l: 'D', t: '0' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: 'Comparisons chain: `3 == 2` is False, so the whole chain is False.'
    },
    {
      n: 4, marks: 2, type: 'mcq',
      stem: [ { code: 'print({1,2,3}&{2,3,4}|{3,4,5})' } ],
      options: [
        { l: 'A', t: '{2, 3, 4, 5}' }, { l: 'B', t: '{1, 2, 3, 4, 5}' },
        { l: 'C', t: '{1, 2, 3, 4}' }, { l: 'D', t: '{2, 3}' },
        { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`&` binds tighter than `|`: the intersection is `{2,3}`, and unioning with `{3,4,5}` gives `{2,3,4,5}`.'
    },
    {
      n: 5, marks: 2, type: 'mcq',
      stem: [ { code: 'print(len(((1,2,(3,4),(5,(6,7))))))' } ],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '7' }, { l: 'C', t: '6' },
        { l: 'D', t: '1' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`len` counts the outer tuple\'s four elements: `1`, `2`, `(3,4)` and `(5,(6,7))`.'
    },
    {
      n: 6, marks: 2, type: 'mcq',
      stem: [
        { code: 'La = [1, [2, [3, [4]]]]\nLb = [La[1], La[1][1]]\nLb[0][1] = 9\nprint(La)' }
      ],
      options: [
        { l: 'A', t: '[1, [2, 9]]' }, { l: 'B', t: '[1, [2, [9]]]' },
        { l: 'C', t: '[1, [2, [3, [4]]]]' }, { l: 'D', t: 'IndexError' },
        { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`Lb[0]` is the same object as `La[1]`, so `Lb[0][1] = 9` replaces the `[3,[4]]` sub-list with 9.'
    },
    {
      n: 7, marks: 2, type: 'mcq',
      stem: [ { code: "print(['abc',['def'],'qrs'][2][1][0])" } ],
      options: [
        { l: 'A', t: "'r'" }, { l: 'B', t: "'e'" }, { l: 'C', t: "''" },
        { l: 'D', t: "'f'" }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`\'qrs\'[1]` is `\'r\'`, and index 0 of a one-character string is itself.'
    },
    {
      n: 8, marks: 2, type: 'mcq',
      stem: [
        { code: 'La = [1]*2\nLb = [La]*2\nLb = [Lb[:],Lb[::-1]]\nLb[0][1][0] = 9\nprint(Lb[1][0])' }
      ],
      options: [
        { l: 'A', t: '[9, 1]' }, { l: 'B', t: '[1, 9]' }, { l: 'C', t: '[1, 1]' },
        { l: 'D', t: '[9, 9]' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: 'Slicing copies only the outer lists, so every copy still shares the one `La`; writing 9 into it is visible from `Lb[1][0]`.'
    },
    {
      n: 9, marks: 2, type: 'mcq',
      stem: [ { code: 'print((1,2,3,[4,5,6],7,8,9)[2:5][::-1])' } ],
      options: [
        { l: 'A', t: '(7, [4, 5, 6], 3)' }, { l: 'B', t: '([4, 5, 6], 3, 2)' },
        { l: 'C', t: '(8, 7, [4, 5, 6])' }, { l: 'D', t: '(8, 7, [6, 5, 4])' },
        { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`[2:5]` is `(3, [4,5,6], 7)`; reversing the tuple gives `(7, [4,5,6], 3)` — the inner list is not reversed.'
    },
    {
      n: 10, marks: 2, type: 'mcq',
      stem: [
        { code: 'def f(x):\n    if x % 2 == 1:\n        return x+1\n    else:\n        return x+4\nprint(f(f(f((1)))))' }
      ],
      options: [
        { l: 'A', t: '10' }, { l: 'B', t: '12' }, { l: 'C', t: '14' },
        { l: 'D', t: '16' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`f(1) = 2`, `f(2) = 6`, `f(6) = 10`.'
    },
    {
      n: 11, marks: 2, type: 'mcq',
      stem: [
        { code: "def foo(x):\n    if not x:\n        return x\n    return x[-1] + foo(x[:-1]) + x[-1]\nprint(foo('abcde'))" }
      ],
      options: [
        { l: 'A', t: "'edcbaabcde'" }, { l: 'B', t: "'abcdeedcba'" },
        { l: 'C', t: "'abcdedcba'" }, { l: 'D', t: "'abcdeebcda'" },
        { l: 'E', t: "'edcbabcde'" }
      ],
      answer: 'A',
      explanation: 'Each frame adds the last character on both sides, so the result is the reversed string followed by the original.'
    },
    {
      n: 12, marks: 2, type: 'mcq',
      stem: [
        { code: "def f(x):\n    if x < 0:\n        return 'f'\n    if x%2==0:\n        return g(x-1)\n    return f(x-1)\ndef g(x):\n    if x < 0:\n        return 'g'\n    if x%2==1:\n        return f(x-1)\n    return g(x-1)\nprint(f(100))" }
      ],
      options: [
        { l: 'A', t: "'g'" }, { l: 'B', t: "'f'" },
        { l: 'C', t: 'The code will run into an infinite loop' },
        { l: 'D', t: "It will print a very long string with alternating 'f' and 'g'" },
        { l: 'E', t: 'It will cause a RecursionError exception' }
      ],
      answer: 'A',
      explanation: 'Each call lowers `x` by 1, so parity flips every call; the value 0 is even, so `f(0)` calls `g(-1)`, which returns `\'g\'`.'
    },
    {
      n: 13, marks: 2, type: 'mcq',
      stem: [
        { code: 'x,y = 100,0\nif x > 10:\n  y = 1\nelif x > 100:\n  y = 2\nif x > 1000:\n  y = 3\nelse:\n  y = 4\nprint(y)' }
      ],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '3' }, { l: 'C', t: '2' },
        { l: 'D', t: '1' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: 'The second `if` is independent: `x > 1000` is false, so its `else` sets `y = 4`, overwriting the 1.'
    },
    {
      n: 14, marks: 2, type: 'mcq',
      stem: [
        { code: 'x,y = 10,20\nif x > y:\n  z = 1\n  if 2*x == y:\n    z = 2\nelse:\n  if 2*x < y:\n    z = 3\n  elif 2*x > y:\n    z = 4\nprint(z)' }
      ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '2' }, { l: 'C', t: '3' },
        { l: 'D', t: '4' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'E',
      explanation: '`x > y` is false, and neither `20 < 20` nor `20 > 20` holds, so `z` is never assigned — `print(z)` raises `NameError`.'
    },
    {
      n: 15, marks: 2, type: 'mcq',
      stem: [
        { p: 'Which of the following outputs is impossible given any numeric value of `x`?' },
        { code: 'if x > 0:\n  x = x+2\nif x < 10:\n  y = 4\nelif x > 20:\n  y = 3\nelse:\n  if x < 5:\n    y = 2\n  else:\n    y = 1\nprint(y)' }
      ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '2' }, { l: 'C', t: '3' },
        { l: 'D', t: '4' }, { l: 'E', t: 'All outputs are possible' }
      ],
      answer: 'B',
      explanation: 'The `x < 5` branch is only reached when `10 <= x <= 20`, so `y = 2` can never be printed (1, 3 and 4 all can). The printed key reads A, but working the branches out gives B — that key looks off by one.'
    },
    {
      n: 16, marks: 2, type: 'mcq',
      stem: [ { code: "x = 'a'\nwhile len(x)<6:\n    x += 'bc'\nprint(x)" } ],
      options: [
        { l: 'A', t: "'abcbcbc'" }, { l: 'B', t: "'abcbc'" }, { l: 'C', t: "'abcbcbcbc'" },
        { l: 'D', t: "'abcbcb'" }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: 'Lengths go 1, 3, 5, 7 — the loop stops as soon as the length reaches 6, after the third append.'
    },
    {
      n: 17, marks: 2, type: 'mcq',
      stem: [
        { code: 'a = [1,2,3,4]\nx = 0\nfor i in range(len(a)):\n    x += 1\n    if i in a:\n        a.remove(i)\nprint(x,a)' }
      ],
      options: [
        { l: 'A', t: '4 [4]' }, { l: 'B', t: '2 [3, 4]' }, { l: 'C', t: '2 [2, 3, 4]' },
        { l: 'D', t: '4 [3, 4]' }, { l: 'E', t: '4 [2, 3, 4]' }
      ],
      answer: 'A',
      explanation: '`range(len(a))` is fixed at four rounds, and each round removes the value `i` if present, so 1, 2 and 3 are removed and only 4 survives.'
    },
    {
      n: 18, marks: 2, type: 'mcq',
      stem: [ { code: 'x,y = 9999,0\nwhile x > 0:\n  y += 6\n  x -= 6\nprint(y)' } ],
      options: [
        { l: 'A', t: '10002' }, { l: 'B', t: '10001' }, { l: 'C', t: '10000' },
        { l: 'D', t: '9999' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`ceil(9999/6) = 1667` rounds, and `1667 * 6 = 10002`.'
    },
    {
      n: 19, marks: 2, type: 'mcq',
      stem: [
        { code: 'x = 0\ni = 0\nwhile i < 7:\n  if i%2 == 0:\n\n  i += 1\n  if i%3 == 0:\n\n  continue\n  i += 1\n  x += i\nprint(x)' }
      ],
      options: [
        { l: 'A', t: '19' }, { l: 'B', t: '12' }, { l: 'C', t: '25' },
        { l: 'D', t: '21' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'E',
      explanation: 'When `i` becomes a multiple of 3 the `continue` skips the second `i += 1`, so `i` no longer moves and the loop runs forever — no output at all.'
    },
    {
      n: 20, marks: 2, type: 'mcq',
      stem: [
        { code: 'x = [1,2]\ndef foo(y):\n    y[0] = 9\n    x[0] = 3\nfoo(x)\nprint(x)' }
      ],
      options: [
        { l: 'A', t: '[3, 2]' }, { l: 'B', t: '[9, 2]' }, { l: 'C', t: '[1, 2]' },
        { l: 'D', t: '[1, 3]' }, { l: 'E', t: '[1, 9]' }
      ],
      answer: 'A',
      explanation: '`y` is the same list as `x`, so both writes hit it; the global write of 3 happens last.'
    },
    {
      n: 21, marks: 2, type: 'mcq',
      stem: [
        { code: 'y = 12\ndef foo(x):\n    if x < 0:\n        y = 1\n    elif x > 0:\n        y -= 1\n    else:\n        y = x+1\nprint(foo(y))' }
      ],
      options: [
        { l: 'A', t: 'None of the rest' }, { l: 'B', t: '1' }, { l: 'C', t: '13' },
        { l: 'D', t: '12' }, { l: 'E', t: 'None' }
      ],
      answer: 'A',
      explanation: 'Because `y` is assigned inside the function, it is a local name there; `y -= 1` reads it before it is assigned and raises `UnboundLocalError`.'
    },
    {
      n: 22, marks: 2, type: 'mcq',
      stem: [
        { code: "print({'a':'d','c':'e','f':'z'}[{1:'f',5:'c',9:'a'}[1]])" }
      ],
      options: [
        { l: 'A', t: "'z'" }, { l: 'B', t: "'e'" }, { l: 'C', t: "'d'" },
        { l: 'D', t: "''" }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: 'The inner lookup gives `\'f\'`, and the outer dictionary maps `\'f\'` to `\'z\'`.'
    },
    {
      n: 23, marks: 2, type: 'mcq',
      stem: [
        { code: 'def f1(x):\n    return x+1\ndef g1(x):\n    return x-1\nd1 = {1:f1,2:g1}\nx = 1\nfor i in range(10):\n    x = d1[x](x)\nprint(x)' }
      ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '2' },
        { l: 'C', t: 'Run into infinite loop' },
        { l: 'D', t: 'Raise a RecursionError exception' },
        { l: 'E', t: 'Raise a KeyError exception' }
      ],
      answer: 'A',
      explanation: '`x` alternates 1 -> 2 -> 1 -> 2; after an even number of steps (10) it is back at 1.'
    },
    {
      n: 24, marks: 2, type: 'mcq',
      stem: [
        { code: 'def tail(lst,op,res):\n  if not lst:\n    return res\n  else:\n    return tail(lst[:-1],op,op(res,lst[-1]))\nprint(tail([1,2,3,4], lambda x,y: (y,x), ()))' }
      ],
      options: [
        { l: 'A', t: '(1, (2, (3, (4, ()))))' }, { l: 'B', t: '(((((), 4), 3), 2), 1)' },
        { l: 'C', t: '(4, (3, (2, (1, ()))))' }, { l: 'D', t: '(((((), 1), 2), 3), 4)' },
        { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: 'It consumes the list from the right while building a pair `(new, old)` each time, which produces the list order in the result: `(1,(2,(3,(4,()))))`.'
    },
    {
      n: 25, marks: 2, type: 'mcq',
      stem: [ { code: 'f = lambda x,y: lambda z: (x)(y)(z)\nprint((f)(lambda x: lambda y: x, lambda z: z*2)(3)(4))' } ],
      options: [
        { l: 'A', t: '8' }, { l: 'B', t: '6' }, { l: 'C', t: 'TypeError' },
        { l: 'D', t: 'RecursionError' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`(x)(y)` returns `y` (the doubling function); `(y)(3)` ignores 3 and gives the doubling function again, so `(4)` gives 8.'
    },
    {
      n: 26, marks: 2, type: 'mcq',
      stem: [
        { code: 'f1 = lambda x,y: x\nf2 = lambda x,y: y\nf3 = lambda c,x,y: c(x,y)\nprint(f3(f1,f2,f3)(f2,f1)(1,0))' }
      ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '0' }, { l: 'C', t: 'TypeError' },
        { l: 'D', t: 'RecursionError' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`f3(f1,f2,f3)` selects its second argument, `f2`; `f2(f2,f1)` selects its second argument, `f1`; `f1(1,0)` returns 1.'
    },
    {
      n: 27, marks: 2, type: 'mcq',
      stem: [
        { code: 'class C0:\n    def __init__(self,n):\n        member = n*n\n    def cout(self):\n        print(member)\nx = C0(5)\nx.cout()' }
      ],
      options: [
        { l: 'A', t: 'None of the rest' }, { l: 'B', t: '5' }, { l: 'C', t: '25' },
        { l: 'D', t: 'None' }, { l: 'E', t: '0' }
      ],
      answer: 'A',
      explanation: '`member` is a local variable of `__init__`, not an attribute, so `cout` raises `NameError` — nothing is printed.'
    },
    {
      n: 28, marks: 2, type: 'mcq',
      stem: [
        { code: 'class C1():\n  def __init__(self, a):\n    self.x = a\n  def f(self):\n    return self.y\nclass C2(C1):\n  def __init__(self, a):\n    self.y = a\n    super().__init__(a+a)\n  def f(self):\n    return super().f() + self.x\nclass C3(C2):\n  def __init__(self, a):\n    self.x = a\n    super().__init__(a+a)\nprint(C3(2).f())' }
      ],
      options: [
        { l: 'A', t: '12' }, { l: 'B', t: '16' }, { l: 'C', t: '6' },
        { l: 'D', t: '8' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`C3(2)` sets `x = 2`, then `C2` sets `y = 4` and `C1` sets `x = 4*2 = 8`; `f()` returns `y + x = 12`.'
    },
    {
      n: 29, marks: 2, type: 'mcq',
      stem: [
        { code: 'class C1():\n  def f(self):\n    return 1 + self.g()\n  def g(self):\n    return 2\nclass C2(C1):\n  def f(self):\n    return 3 + super().f()\nclass C3(C2):\n  def g(self):\n    return 4\nprint(C3().f())' }
      ],
      options: [
        { l: 'A', t: '6' }, { l: 'B', t: '7' }, { l: 'C', t: '8' },
        { l: 'D', t: '9' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'C',
      explanation: '`C3().f()` is `C2.f` = `3 + C1.f` = `3 + 1 + self.g()`, and `self.g` resolves to `C3.g` = 4, giving 8.'
    },
    {
      n: 30, marks: 2, type: 'mcq',
      stem: [
        { code: "output = ''\ntry:\n    x = 2\n    y = 'a'\n    q = y + str(x)\n    z = q * x\nexcept TypeError:\n    output += '1'\nelse:\n    output += '2'\nfinally:\n    output += '3'\nprint(output)" }
      ],
      options: [
        { l: 'A', t: "''" }, { l: 'B', t: "'13'" }, { l: 'C', t: "'3'" },
        { l: 'D', t: "'23'" }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'D',
      explanation: 'Nothing raises (`\'a2\' * 2` is valid string repetition), so `else` adds `\'2\'` and `finally` always adds `\'3\'`.'
    },
    {
      n: 31, marks: 2, type: 'mcq',
      stem: [
        { p: 'Three functions extract the elements that occur exactly once. Which version is significantly slowest for a very long list?' },
        { code: 'def extract_unique_1(L):\n    output = []\n    for i in L:\n        if L.count(i) == 1:\n            output.append(i)\n    return output\n\ndef extract_unique_2(L):\n    L2 = sorted(L)\n    output = []\n    for i in range(len(L2)):\n        unique = True\n        if i > 0:\n            if L2[i] == L2[i-1]:\n                unique = False\n        if i < len(L2)-1:\n            if L2[i] == L2[i+1]:\n                unique = False\n        if unique:\n            output.append(L2[i])\n    return output\n\ndef extract_unique_3(L):\n    d = dict()\n    for i in L:\n        if not i in d:\n            d[i] = 0\n        d[i] += 1\n    return list(filter(lambda x:d[x]==1,L))' }
      ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '2' }, { l: 'C', t: '3' },
        { l: 'D', t: '1 and 2' }, { l: 'E', t: '2 and 3' },
        { l: 'F', t: '1 and 3' }, { l: 'G', t: 'They are all equally slow' }
      ],
      answer: 'A',
      explanation: '`L.count(i)` scans the whole list for every element, so version 1 is quadratic; sorting is `n log n` and the dictionary is linear.'
    },
    {
      n: 32, marks: 2, type: 'mcq',
      stem: [
        { p: 'Using the same three functions, which version(s) is/are significantly fastest?' }
      ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '2' }, { l: 'C', t: '3' },
        { l: 'D', t: '1 and 2' }, { l: 'E', t: '2 and 3' },
        { l: 'F', t: '1 and 3' }, { l: 'G', t: 'They are all equally fast' }
      ],
      answer: 'E',
      explanation: 'Both the sort-based and the dictionary-based versions are `n log n` or better, leaving version 1 far behind. The printed key ticks (b), (c) and (e): versions 2 and 3 each qualify, and (e) is the combined answer recorded here, so picking only 2 or only 3 is marked wrong.'
    },
    {
      n: 33, marks: 2, type: 'mcq',
      stem: [
        { p: 'If you really had to pick one fastest version, which would it be?' }
      ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '2' }, { l: 'C', t: '3' },
        { l: 'D', t: 'It is impossible to determine which one is the fastest' },
        { l: 'E', t: 'They are all the same speed' }
      ],
      answer: 'C',
      explanation: 'Version 3 is linear (a single pass to count, then a filter), which beats version 2\'s `n log n` sort.'
    },
    {
      n: 34, marks: 2, type: 'mcq',
      stem: [
        { p: 'This function should reverse the list but leaves `[1,2,3,4,5,6]` unchanged. Which single change fixes it?' },
        { code: ' 1: def swap(lst, i, j):\n 2:   lst[i],lst[j] = lst[j],lst[i]\n 3:   return lst\n 4: def reverse(lst):\n 5:   n = len(lst)\n 6:   for i in range(n):\n 7:     n -= 1\n 8:     swap(lst,i,n)\n 9:   return lst' }
      ],
      options: [
        { l: 'A', t: 'range(n//2) instead of "range(n)" at line 6' },
        { l: 'B', t: 'lst = swap(lst,i,n-i-1) instead of "swap(lst,i,n-i-1)" at line 8' },
        { l: 'C', t: 'n = len(lst)//2 instead of "n = len(lst)" at line 5' },
        { l: 'D', t: 'swap(lst,i,n-1) instead of "swap(lst,i,n)" at line 8 and remove "n -= 1" at line 7' },
        { l: 'E', t: 'None of the rest changes works' }
      ],
      answer: 'A',
      explanation: 'Walking all `n` rounds swaps every pair twice, undoing the work. Stopping halfway (`n//2`) leaves each pair swapped exactly once.'
    },
    {
      n: 35, marks: 2, type: 'mcq',
      stem: [
        { code: 'def foo(x):\n    if not x:\n        return x\n    if type(x) != tuple:\n        return (x,)\n    return foo(x[1:]) + foo(x[0])\nprint(foo((0,1,2,3,(4,(5,6)))))' }
      ],
      options: [
        { l: 'A', t: 'None of the rest' }, { l: 'B', t: '(6,5,4,3,2,1,0)' },
        { l: 'C', t: '(((6,5),4),3,2,1,0)' }, { l: 'D', t: '(((5,6),4),3,2,1,0)' },
        { l: 'E', t: '((4,(5,6)),3,2,1,0)' }
      ],
      answer: 'A',
      explanation: '`if not x` catches the integer 0 before the tuple wrap, so `foo(0)` returns the int 0 and the tuple concatenation raises `TypeError`. Without a 0 in the tuple it would return `(6,5,4,3,2,1,0)`.'
    },
    {
      n: 36, marks: 2, type: 'mcq',
      stem: [
        { p: 'Which of the following function calls returns `False`?' },
        { code: 'def foo(x):\n  if len(x) <= 1:\n    return True\n  else:\n    m = len(x)//2\n    return foo(x[m]) and x[0] == x[-1]' }
      ],
      options: [
        { l: 'A', t: '"[0,[1,[2,[],2],1],0]"' },
        { l: 'B', t: '[0,[1,[2,[],2],1],0]' },
        { l: 'C', t: '"abcda"' },
        { l: 'D', t: '[0,[1,[2,3],1],0]' },
        { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: 'For the string, `x[0]` is `[` and `x[-1]` is `]`, so it is not symmetric. In the list versions the ends are both 0, and `"abcda"` starts and ends with `a`.'
    },
    {
      n: 37, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is your comment on the following code that asks a user to choose between coffee or tea?' },
        { code: 'try:\n    print("Do you want coffee or tea?")\n    print("If you want coffee, please enter \'c\'")\n    print("Any other choices will be deemed as tea")\n    ans = input()\n    assert ans == \'c\'\nexcept:\n    request = \'Tea\'\nelse:\n    request = \'Coffee\'\nfinally:\n    print("Enjoy your "+request+"!")' }
      ],
      options: [
        { l: 'A', t: 'The code is abusing the usage of exceptions' },
        { l: 'B', t: 'The code is too inefficient' },
        { l: 'C', t: 'The code may give the wrong answer for the choice from the user' },
        { l: 'D', t: 'The code may crash' },
        { l: 'E', t: 'The code is perfect and it is implemented in the best way' }
      ],
      answer: 'A',
      explanation: 'A normal "anything else means tea" decision is ordinary control flow, not an error; using `assert` for it also means the `except` swallows real failures.'
    },
    {
      n: 38, marks: 2, type: 'mcq',
      stem: [
        { p: 'In the memoisation Fibonacci example from the lecture slides, what data structure was used to improve the efficiency of the code?' }
      ],
      options: [
        { l: 'A', t: 'dictionary' }, { l: 'B', t: 'set' }, { l: 'C', t: 'list' },
        { l: 'D', t: 'tuple' }, { l: 'E', t: 'lambda function' }
      ],
      answer: 'A',
      explanation: 'A dictionary maps each `n` to its already-computed Fibonacci value, so each value is computed once.'
    },
    {
      n: 39, marks: 2, type: 'mcq',
      stem: [ { p: 'What is the best and simplest method to read a `.csv` file into a 2D array?' } ],
      options: [
        { l: 'A', t: 'Use the csv package' },
        { l: 'B', t: 'Use the built-in file opening functions of Python' },
        { l: 'C', t: 'Use the imagio package' },
        { l: 'D', t: 'Use the PIL package' },
        { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`csv.reader` splits each line on the correct delimiters and produces one row per line, without hand-written parsing.'
    },
    {
      n: 40, marks: 2, type: 'mcq',
      stem: [ { p: 'What is the best data type to store a number bigger than `2**1024`?' } ],
      options: [
        { l: 'A', t: 'integer' }, { l: 'B', t: 'float' }, { l: 'C', t: 'string' },
        { l: 'D', t: 'lambda function' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: 'Python integers have arbitrary precision; a float overflows well below that (`2**1024` is beyond the double range) and loses exactness.'
    },
    {
      n: 41, marks: 5, type: 'fib',
      stem: [
        { p: 'Given a 2D map, print the centre of every star of the form `(+)`, e.g.:' },
        { code: "map1 = ['...........',\n        '......(+)..',\n        '...........',\n        '....(+)....']\n>>> find_star(map1)\n(1, 7)\n(3, 5)" },
        { code: 'def find_star(m):\n    n_row = len(m)\n    n_col = len(m[0])\n    for i in range({{1}}):\n        for j in range({{2}}):\n            if {{3}}:\n                print((i,j))' }
      ],
      blanks: [
        { n: 1, answer: 'n_row' },
        { n: 2, answer: '1,n_col-1' },
        { n: 3, answer: "m[i][j] == '+' and m[i][j-1] == '(' and m[i][j+1] == ')'" }
      ],
      explanation: 'Scan every row, but only the columns that have a neighbour on both sides; a centre is a `+` with `(` to its left and `)` to its right.'
    },
    {
      n: 42, marks: 5, type: 'fib',
      stem: [
        { p: 'Using the RPG assignment code, implement `SickFighter`: same `maxhp` as `Fighter`, but starting `hp` is half of its maxhp, and acting behaves like a `Fighter` except that it loses 1 hp per action, never dropping to 0 (at hp 1 it stays at 1).' },
        { code: 'class SickFighter(Fighter):\n    def __init__(self):\n        {{1}}\n        {{2}}\n    def act(self,myTeam,enemy):\n        {{3}}\n            {{4}}\n        {{5}}' }
      ],
      blanks: [
        { n: 1, answer: 'super().__init__()' },
        { n: 2, answer: 'self.hp /= 2' },
        { n: 3, answer: 'if self.hp > 1:' },
        { n: 4, answer: 'self.hp -= 1' },
        { n: 5, answer: 'super().act(myTeam,enemy)' }
      ],
      explanation: 'The inherited constructor sets `maxhp` and `hp` to 1200; halving `hp` leaves `maxhp` alone. The guard `self.hp > 1` keeps a sick fighter alive, then the parent behaviour runs unchanged.'
    },
    {
      n: 43, marks: 5, type: 'fib',
      stem: [
        { p: 'Write an iterative function that finds the greatest common divisor of two positive numbers, e.g. `gcd(20,10)` is 10 and `gcd(5,7)` is 1.' },
        { code: 'def gcd(n,m):\n  res = 0\n  for i in {{1}}:\n    if {{2}}:\n      {{3}}\n  return res' }
      ],
      blanks: [
        { n: 1, answer: 'range(1,min(n,m)+1)' },
        { n: 2, answer: 'n%i == m%i == 0' },
        { n: 3, answer: 'res = i' }
      ],
      explanation: 'Test every integer up to the smaller number; the last common divisor found is the greatest. (The paper also accepts `range(min(n,m),0,-1)` with `return i` in the body.)'
    },
    {
      n: 44, marks: 5, type: 'fib',
      stem: [
        { p: 'Count the non-unique prime divisors of `n` with a recursive helper. Dividing by the smallest divisor as you go guarantees the next divisor found is prime. For example, `count_prime_div(12)` is 3 (2, 2, 3) and `count_prime_div(11)` is 1.' },
        { code: 'def count_prime_div(n):\n  def helper(n,div):\n    if div > n:\n      return 0\n    if {{1}}:\n      return 1\n    if n%div == 0:\n      return {{2}}\n    else:\n      return {{3}}\n  return helper(n,2)   # first prime is 2' }
      ],
      blanks: [
        { n: 1, answer: 'div == n' },
        { n: 2, answer: '1 + helper(n//div, div)' },
        { n: 3, answer: 'helper(n, div+1)' }
      ],
      explanation: 'When the divisor reaches `n`, `n` itself is the last prime factor (count 1). A clean division counts the divisor and retries with the reduced `n` and the same divisor; otherwise move on to the next candidate.'
    }
  ]
});
