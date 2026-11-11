/* FINAL EXAMINATION (Semester 1 : AY 2022/23)
   (file: cs1010e_2223S1_final_exam.pdf)
   48 questions, 2 hours. The PDF carries no answer column at all, so every key
   here was worked out from the code and verified by running it. Marks are not
   printed either: this build uses 1 mark for Q1-40, 3 for Q41-44 and 12 for
   each of the four fill-in questions, which totals 100. */
registerExam({
  id: 'final-2223',
  category: 'final',
  title: 'FINAL EXAMINATION (Semester 1 : AY 2022/23)',
  headerName: 'FINAL EXAMINATION (SEM 1 : AY 2022/23)',
  source: 'cs1010e_2223S1_final_exam.pdf',
  duration: 120,
  sections: [
    { name: 'Section 1 — Syntax and Python usage', from: 1, to: 40, marks: 1 },
    { name: 'Section 2 — Programming concepts', from: 41, to: 44, marks: 3 },
    { name: 'Section 3 — Fill in the blanks', from: 45, to: 48, marks: 12 }
  ],
  questions: [
    {
      n: 1, marks: 1, type: 'mcq',
      stem: [
        { p: 'You can consider the code in each question to be in a separate file. What will be the output when we run the file in IDLE?' },
        { code: 'print(9-2*3-1)' }
      ],
      options: [
        { l: 'A', t: '2' }, { l: 'B', t: '20' }, { l: 'C', t: '5' },
        { l: 'D', t: '4' }, { l: 'E', t: '14' }
      ],
      answer: 'A',
      explanation: '`2*3` is evaluated first: `9 - 6 - 1 = 2`.'
    },
    {
      n: 2, marks: 1, type: 'mcq',
      stem: [ { code: 'print(3**--3)' } ],
      options: [
        { l: 'A', t: '27' }, { l: 'B', t: '9' }, { l: 'C', t: '-9' },
        { l: 'D', t: '0' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: '`--3` is just 3, so this is `3 ** 3 = 27`.'
    },
    {
      n: 3, marks: 1, type: 'mcq',
      stem: [ { code: 'print(False or True)' } ],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: 'False' }, { l: 'C', t: '1' },
        { l: 'D', t: '0' }, { l: 'E', t: 'None of the rest' }
      ],
      answer: 'A',
      explanation: '`or` returns the first truthy operand, which is `True`.'
    },
    {
      n: 4, marks: 1, type: 'mcq',
      stem: [ { code: 'print((False == False) in [False])' } ],
      options: [
        { l: 'A', t: 'False' }, { l: 'B', t: 'True' }, { l: 'C', t: '0' },
        { l: 'D', t: '1' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: '`False == False` is `True`, and `True` is not an element of `[False]`, so the result is `False`.'
    },
    {
      n: 5, marks: 1, type: 'mcq',
      stem: [ { code: 'print(True != False in [False])' } ],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: 'False' }, { l: 'C', t: '1' },
        { l: 'D', t: '0' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'Comparisons chain left to right: `True != False` is `True`, and `False in [False]` is also `True`, so the whole expression evaluates to `True`.'
    },
    {
      n: 6, marks: 1, type: 'mcq',
      stem: [ { code: 'print(10>10 and 4<(9/0))' } ],
      options: [
        { l: 'A', t: 'False' }, { l: 'B', t: 'True' }, { l: 'C', t: '1' },
        { l: 'D', t: '0' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: '`and` short-circuits on the false left operand, so `9/0` is never evaluated.'
    },
    {
      n: 7, marks: 1, type: 'mcq',
      stem: [ { code: "print('abc'>'abbbbbbbb')" } ],
      options: [
        { l: 'A', t: 'True' }, { l: 'B', t: 'False' }, { l: 'C', t: "'abc'" },
        { l: 'D', t: "'abcabbbbbbbb'" }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'Strings compare character by character: at index 2, `c` is greater than `b`, so `\'abc\'` is greater regardless of length.'
    },
    {
      n: 8, marks: 1, type: 'mcq',
      stem: [ { code: "print(max('12','111')+max('3','0'))" } ],
      options: [
        { l: 'A', t: '123' }, { l: 'B', t: '111' }, { l: 'C', t: '15' },
        { l: 'D', t: '114' }, { l: 'E', t: '1113' }
      ],
      answer: 'A',
      explanation: '`\'12\' > \'111\'` because `2 > 1`, so the first max is `\'12\'`; the second is `\'3\'`, and string `+` concatenates to `\'123\'`.'
    },
    {
      n: 9, marks: 1, type: 'mcq',
      stem: [ { code: "print('1234567890'[1])" } ],
      options: [
        { l: 'A', t: '2' }, { l: 'B', t: '1' }, { l: 'C', t: '0' },
        { l: 'D', t: '3' }, { l: 'E', t: 'None' }
      ],
      answer: 'A',
      explanation: 'Index 1 is the second character, `\'2\'` (printed without quotes by `print`).'
    },
    {
      n: 10, marks: 1, type: 'mcq',
      stem: [ { code: "print('12345'[1:5][0:4][2][0])" } ],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '1' }, { l: 'C', t: '2' },
        { l: 'D', t: '3' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: '`\'12345\'[1:5]` is `\'2345\'`, unchanged by `[0:4]`; `[2]` is `\'4\'` and `[0]` of that is `\'4\'`.'
    },
    {
      n: 11, marks: 1, type: 'mcq',
      stem: [ { code: 'print((2)+(3,))' } ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '(2, 3)' }, { l: 'C', t: '(5,)' },
        { l: 'D', t: '5' }, { l: 'E', t: '(2, (3,))' }
      ],
      answer: 'A',
      explanation: '`(2)` is just the int 2, and `int + tuple` raises `TypeError`.'
    },
    {
      n: 12, marks: 1, type: 'mcq',
      stem: [ { code: 'print([9,[8,[7,6],[5,4]],3][1][2][3:5])' } ],
      options: [
        { l: 'A', t: '[]' }, { l: 'B', t: '5' }, { l: 'C', t: '4' },
        { l: 'D', t: '6' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: '`[1]` gives `[8,[7,6],[5,4]]`, `[2]` gives `[5,4]`, and slicing from index 3 of a two-element list is empty.'
    },
    {
      n: 13, marks: 1, type: 'mcq',
      stem: [ { code: "print(['123','456']['012'[1]])" } ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: 'Empty string' }, { l: 'C', t: '456' },
        { l: 'D', t: '123' }, { l: 'E', t: '4' }
      ],
      answer: 'A',
      explanation: '`\'012\'[1]` evaluates to the *string* `\'1\'`, and a list index must be an integer, so the print raises `TypeError` — option A. (With the integer `[1]` it would print `\'456\'`, but that is not what the code says.)'
    },
    {
      n: 14, marks: 1, type: 'mcq',
      stem: [
        { code: "A = ['a','b']\nB = [A,'c']\nC = [B,A]\nB[0].remove('a')\nprint(C)" }
      ],
      options: [
        { l: 'A', t: "[[['b'], 'c'], ['b']]" }, { l: 'B', t: "[['b', 'c'], ['b']]" },
        { l: 'C', t: "[[['b'], 'c'], ['a','b']]" }, { l: 'D', t: "[[['a','b'], 'c'], ['b']]" },
        { l: 'E', t: "[['b', 'c'], ['a','b']]" }
      ],
      answer: 'A',
      explanation: '`B[0]` and `C[1]` are the same list object as `A`, so removing `\'a\'` is visible in both places.'
    },
    {
      n: 15, marks: 1, type: 'mcq',
      stem: [
        { code: 'L1 = [0,1]\nL2 = [L1,2,3]\nL3 = L2.copy()\nL3[0][1] = 999\nprint(L2)' }
      ],
      options: [
        { l: 'A', t: '[[0, 999], 2, 3]' }, { l: 'B', t: '[[0, 1], 2, 3]' },
        { l: 'C', t: '[[999, 1], 2, 3]' }, { l: 'D', t: '[999, 2, 3]' },
        { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: '`copy()` is shallow, so `L3[0]` is still `L1`, and the nested write shows up in `L2`.'
    },
    {
      n: 16, marks: 1, type: 'mcq',
      stem: [
        { code: 'L1 = ([1,2],3,4)\ndef f(L):\n    L[0][0] = 9\nf(L1)\nprint(L1)' }
      ],
      options: [
        { l: 'A', t: '([9, 2], 3, 4)' }, { l: 'B', t: '([1, 2], 3, 4)' },
        { l: 'C', t: '[[1, 2], 3, 4]' }, { l: 'D', t: '(9, 3, 4)' },
        { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'The tuple is immutable but the list inside it is not, so mutating `L[0]` is allowed.'
    },
    {
      n: 17, marks: 1, type: 'mcq',
      stem: [
        { code: 'B = [1,2]\nB.append(B)\nprint(B[2][2][2][2][2][2][0])' }
      ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '[1, 2]' }, { l: 'C', t: '[1, 2, [...]]' },
        { l: 'D', t: 'Error' }, { l: 'E', t: '[[1, 2, [...]]]' }
      ],
      answer: 'A',
      explanation: 'Each `[2]` returns the same list, so after the chain of index-2 lookups, `[0]` is the original first element, 1.'
    },
    {
      n: 18, marks: 1, type: 'mcq',
      stem: [ { code: 'print((9,8,7)*2+(1,2,3)[1])' } ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '(9, 8, 7, 1)' },
        { l: 'C', t: '(9, 8, 7, 2)' }, { l: 'D', t: '(11, 10 , 9)' },
        { l: 'E', t: '(9, 8, 7, 9, 8, 7, 2)' }
      ],
      answer: 'A',
      explanation: '`(1,2,3)[1]` is the int 2, and `tuple + int` raises `TypeError`; E would need `(2,)`.'
    },
    {
      n: 19, marks: 1, type: 'mcq',
      stem: [
        { code: 'A = ([1,2,3],[5,6,7])\nA[0].append(4)\nprint(A)' }
      ],
      options: [
        { l: 'A', t: '([1, 2, 3, 4], [5, 6, 7])' }, { l: 'B', t: '([1, 2, 3], [5, 6, 7])' },
        { l: 'C', t: 'Error' }, { l: 'D', t: '([1, 2, 3], [5, 6, 7], 4)' },
        { l: 'E', t: '[[1, 2, 3, 4], [5, 6, 7]]' }
      ],
      answer: 'A',
      explanation: 'The outer object stays a tuple; only the first inner list grows.'
    },
    {
      n: 20, marks: 1, type: 'mcq',
      stem: [
        { code: 'def f(x):\n    return x+2\nprint(f(f(f(f(7)))))' }
      ],
      options: [
        { l: 'A', t: '15' }, { l: 'B', t: '13' }, { l: 'C', t: '7' },
        { l: 'D', t: '28' }, { l: 'E', t: '14' }
      ],
      answer: 'A',
      explanation: 'Four applications of `+2` to 7 gives `7 + 8 = 15`.'
    },
    {
      n: 21, marks: 1, type: 'mcq',
      stem: [
        { code: 'def a(x):\n    return 1+c(x)\ndef b(x):\n    return 2+d(x)\ndef c(x):\n    return 1+a(x)\nprint(a(1))' }
      ],
      options: [
        { l: 'A', t: 'RecursionError' }, { l: 'B', t: 'NameError' },
        { l: 'C', t: 'Infinite loop' }, { l: 'D', t: '8' }, { l: 'E', t: '6' }
      ],
      answer: 'A',
      explanation: '`a` calls `c`, which calls `a` again with no base case, so the call stack overflows.'
    },
    {
      n: 22, marks: 1, type: 'mcq',
      stem: [
        { code: 'def f(x):\n    if x > 0:\n        return 1+f(x-2)\nprint(f(10))' }
      ],
      options: [
        { l: 'A', t: 'TypeError' }, { l: 'B', t: 'None' }, { l: 'C', t: '0' },
        { l: 'D', t: '5' }, { l: 'E', t: 'RecursionError' }
      ],
      answer: 'A',
      explanation: 'At `x = 0` the `if` fails and the function returns `None`; the enclosing frame then evaluates `1 + None`, raising `TypeError`.'
    },
    {
      n: 23, marks: 1, type: 'mcq',
      stem: [
        { code: 'x = 100\nfor j in range(0,100,10):\n    x -=1\nprint(x)' }
      ],
      options: [
        { l: 'A', t: '90' }, { l: 'B', t: '0' }, { l: 'C', t: '91' },
        { l: 'D', t: '1' }, { l: 'E', t: '100' }
      ],
      answer: 'A',
      explanation: '`range(0,100,10)` has ten values, so 100 is decremented ten times.'
    },
    {
      n: 24, marks: 1, type: 'mcq',
      stem: [
        { code: 'x = 0\nfor i in range(0,12):\n    for j in range(0,10):\n        for k in range(0,3):\n            x += 1\nprint(x)' }
      ],
      options: [
        { l: 'A', t: '360' }, { l: 'B', t: '0' }, { l: 'C', t: '25' },
        { l: 'D', t: '198' }, { l: 'E', t: '22' }
      ],
      answer: 'A',
      explanation: '`12 * 10 * 3 = 360` increments.'
    },
    {
      n: 25, marks: 1, type: 'mcq',
      stem: [
        { code: 'x,y = 0,0\nwhile x < 10:\n    x += 2\n    y += 3\nprint(y)' }
      ],
      options: [
        { l: 'A', t: '15' }, { l: 'B', t: '10' }, { l: 'C', t: '12' },
        { l: 'D', t: '8' }, { l: 'E', t: '27' }
      ],
      answer: 'A',
      explanation: '`x` takes 2, 4, 6, 8, 10 — five iterations — so `y = 5*3 = 15`.'
    },
    {
      n: 26, marks: 1, type: 'mcq',
      stem: [
        { code: 'x = 0\nfor i in range(0,1000000,25):\n    x = 1-x\nprint(x)' }
      ],
      options: [
        { l: 'A', t: '0' }, { l: 'B', t: 'RecursionError' }, { l: 'C', t: '40000' },
        { l: 'D', t: '- 40000' }, { l: 'E', t: '1' }
      ],
      answer: 'A',
      explanation: 'There are `1000000/25 = 40000` iterations, an even number, so the toggling ends back at 0.'
    },
    {
      n: 27, marks: 1, type: 'mcq',
      stem: [
        { code: 'x = 10\nif x > 10:\n  y = 1\nelif x < 100:\n  y = 2\nelif x == 10:\n  y = 3\nelse:\n  y = 4\nprint(y)' }
      ],
      options: [
        { l: 'A', t: '2' }, { l: 'B', t: '1' }, { l: 'C', t: '3' },
        { l: 'D', t: '4' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: '`10 > 10` is false, but `10 < 100` is true, so the first matching branch sets `y = 2`.'
    },
    {
      n: 28, marks: 1, type: 'mcq',
      stem: [
        { code: "y = 'a'\nif y == 'b':\n    x = 1\nelif y == 'a':\n    x = 2\nif y == 'c':\n    x = 3\nelse:\n    x = 4\nprint(x)" }
      ],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '2' }, { l: 'C', t: '3' },
        { l: 'D', t: '1' }, { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'The first chain sets `x = 2`, but the second, independent `if`/`else` overwrites it with 4.'
    },
    {
      n: 29, marks: 1, type: 'mcq',
      stem: [ { code: 'print(tuple({9:8,7:6,5:4}))' } ],
      options: [
        { l: 'A', t: '(9, 7, 5)' }, { l: 'B', t: '(9, 8, 7, 6, 5, 4)' },
        { l: 'C', t: '((9, 8), (7, 6), (5, 4))' }, { l: 'D', t: '({9:8,7:6,5:4},)' },
        { l: 'E', t: '({9:8,7:6,5:4})' }
      ],
      answer: 'A',
      explanation: 'Iterating a dictionary yields its keys, in insertion order here: 9, 7, 5.'
    },
    {
      n: 30, marks: 1, type: 'mcq',
      stem: [
        { code: 'd = {0:2, 1:5, 2:1, 3:2, 4:1, 5:3, 3:9,\n2:7, 2:3}\na, output = 0, \'\'\nwhile a in d:\n    a = d[a]\n    output += str(a)\nprint(output)' }
      ],
      options: [
        { l: 'A', t: '239' }, { l: 'B', t: '27' }, { l: 'C', t: '21539' },
        { l: 'D', t: 'Infinite Loop' }, { l: 'E', t: '20' }
      ],
      answer: 'A',
      explanation: 'Repeated keys keep their last value, so `d = {0:2, 1:5, 2:3, 3:9, 4:1, 5:3}`; the walk is 0 -> 2 -> 3 -> 9, and 9 is not a key, giving `\'239\'`.'
    },
    {
      n: 31, marks: 1, type: 'mcq',
      stem: [ { code: 'f1 = lambda x,y : x+y\nf2 = lambda a,b,c: a(b,c)\nprint(f2(f1,4,7))' } ],
      options: [
        { l: 'A', t: '11' }, { l: 'B', t: '28' }, { l: 'C', t: 'a function' },
        { l: 'D', t: 'Error' }, { l: 'E', t: 'None' }
      ],
      answer: 'A',
      explanation: '`f2` applies `f1` to 4 and 7, giving 11.'
    },
    {
      n: 32, marks: 1, type: 'mcq',
      stem: [ { code: 'f = lambda x:x%4\nprint(len(list(filter(f,range(0,10)))))' } ],
      options: [
        { l: 'A', t: '7' }, { l: 'B', t: '3' }, { l: 'C', t: '10' },
        { l: 'D', t: '12' }, { l: 'E', t: '1' }
      ],
      answer: 'A',
      explanation: '`x % 4` is 0 (falsy) only for 0, 4 and 8, so 7 of the 10 values survive the filter.'
    },
    {
      n: 33, marks: 1, type: 'mcq',
      stem: [ { code: "print(list(map(lambda x:x*3,'123')))" } ],
      options: [
        { l: 'A', t: "['111', '222', '333']" }, { l: 'B', t: "['123123123']" },
        { l: 'C', t: "'123123123'" }, { l: 'D', t: "['123', '123', '123']" },
        { l: 'E', t: 'Error' }
      ],
      answer: 'A',
      explanation: 'Each character is a string, and `*3` repeats strings, so each digit is tripled.'
    },
    {
      n: 34, marks: 1, type: 'mcq',
      stem: [
        { code: "class Graduate:\n    def __init__(self,name,title):\n        self.name = name\n        self.title = title\n        self.fullname = title+\" \"+name\n\nalan = Graduate('Alan','BSc')\nalan.title = 'Dr'\nprint(alan.fullname)" }
      ],
      options: [
        { l: 'A', t: 'BSc Alan' }, { l: 'B', t: 'Dr Alan' }, { l: 'C', t: 'Alan' },
        { l: 'D', t: 'Dr' }, { l: 'E', t: 'Bsc' }
      ],
      answer: 'A',
      explanation: '`fullname` was computed once in the constructor and is a separate string; changing `title` later does not update it.'
    },
    {
      n: 35, marks: 1, type: 'mcq',
      stem: [
        { code: 'class Animal:\n    def __init__(self):\n        self.sound = None\n    def speak(self):\n        print(self.sound)\nclass Dog(Animal):\n    def __init__(self):\n        self.sound = "Woof"\nclass Chihuahua(Animal):\n    def speak(self):\n        print("*cute*")\n        super().speak()\ndolly = Chihuahua()\ndolly.speak()' }
      ],
      options: [
        { l: 'A', t: '*cute*, then None on the next line' },
        { l: 'B', t: '*cute*, then Woof on the next line' },
        { l: 'C', t: 'Woof' }, { l: 'D', t: '*cute*' }, { l: 'E', t: 'None' }
      ],
      answer: 'A',
      explanation: '`Chihuahua()` uses `Animal.__init__`, which sets `sound` to `None`; `Dog` is never involved, so `super().speak()` prints `None`.'
    },
    {
      n: 36, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about try/except, which are not covered' },
      stem: [
        { code: 'n = 2\nx = 0\ntry:\n    while True:\n        x += 10//n\n        n-=1\nexcept:\n    print(x)' }
      ],
      options: [
        { l: 'A', t: '15' }, { l: 'B', t: 'None' }, { l: 'C', t: '10' },
        { l: 'D', t: '5' }, { l: 'E', t: 'The code crashes' }
      ],
      answer: 'A',
      explanation: '`10//2` then `10//1` add 5 and 10; the next round divides by 0, and the bare `except` prints the running total 15.'
    },
    {
      n: 37, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about try/except/else/finally, which are not covered' },
      stem: [
        { code: 'n = 0\ntry:\n    n += 1\nexcept what:\n    n += 1\nexcept:\n    n += 1\nelse:\n    n += 1\nfinally:\n    n += 1\nprint(n)' }
      ],
      options: [
        { l: 'A', t: '3' }, { l: 'B', t: '1' }, { l: 'C', t: '2' },
        { l: 'D', t: '4' }, { l: 'E', t: 'The code crashes' }
      ],
      answer: 'A',
      explanation: 'The `try` succeeds (1), no exception means `else` runs (2), and `finally` always runs (3).'
    },
    {
      n: 38, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: 'the whole question is about try/except/assert and ZeroDivisionError, which are not covered' },
      stem: [
        { code: 'x = 0\ntry:\n    assert 0*(1/0)\nexcept AssertionError:\n    x = 1\nexcept ZeroDivisionError:\n    x = 2\nexcept:\n    x = 3\nprint(x)' }
      ],
      options: [
        { l: 'A', t: '2' }, { l: 'B', t: '0' }, { l: 'C', t: '1' },
        { l: 'D', t: '3' }, { l: 'E', t: 'The code crashes' }
      ],
      answer: 'A',
      explanation: '`1/0` is evaluated before the multiplication, so the `ZeroDivisionError` branch runs and sets `x = 2`.'
    },
    {
      n: 39, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: "the whole question is about the file modes 'w+' and 'r+' — file handling is not covered" },
      stem: [
        { p: 'The two file opening modes `\'w+\'` and `\'r+\'` have some different functionalities.' }
      ],
      options: [ { l: 'A', t: 'True' }, { l: 'B', t: 'False' } ],
      answer: 'A',
      explanation: '`w+` truncates (or creates) the file, while `r+` requires the file to exist and keeps its contents.'
    },
    {
      n: 40, marks: 1, type: 'mcq',
      scope: { level: 'total', reason: "the whole question is about round() and banker's rounding, which are not covered" },
      stem: [ { code: 'print(round(2.5)+round(3.5))' } ],
      options: [
        { l: 'A', t: '6' }, { l: 'B', t: '5' }, { l: 'C', t: '7' },
        { l: 'D', t: '7.0' }, { l: 'E', t: '6.0' }
      ],
      answer: 'A',
      explanation: '`round` uses banker\'s rounding: `round(2.5) = 2` and `round(3.5) = 4`, so the sum is 6.'
    },
    {
      n: 41, marks: 3, type: 'mcq',
      stem: [
        { p: 'If the input `L` is a list of numbers with odd length, what does the following function return?' },
        { code: 'def foo(L):\n    L2 = list(L.copy())\n    output = []\n    while len(L2)>2:\n        output.append(max(L2))\n        output.append(min(L2))\n        L2.remove(max(L2))\n        L2.remove(min(L2))\n    output.append(L2[0])\n    return output[-1]' }
      ],
      options: [
        { l: 'A', t: 'Median of L' }, { l: 'B', t: 'Mean of L' }, { l: 'C', t: 'Mode of L' },
        { l: 'D', t: 'A sorted list of L' }, { l: 'E', t: 'A zig-zag list of L' }
      ],
      answer: 'A',
      explanation: 'Each round strips the current maximum and minimum, so the single value left after the loop is the middle element — the median.'
    },
    {
      n: 42, marks: 3, type: 'mcq',
      stem: [
        { p: 'To store a large collection of names (strings) and query whether a name is in the collection, what is the best data structure in terms of speed?' }
      ],
      options: [
        { l: 'A', t: 'Dictionary' }, { l: 'B', t: 'List' }, { l: 'C', t: 'Tuple' },
        { l: 'D', t: 'File' }, { l: 'E', t: 'All of the answers here will be the same' }
      ],
      answer: 'A',
      explanation: 'Dictionary membership is a hash lookup, roughly O(1), while a list or tuple scan is O(n) and a file is worse still.'
    },
    {
      n: 43, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given a list of unique integers `L`, we want to count the pairs that sum to `x`, e.g. `sumTo([1,2,3,4,5,6,7,8,9],13)` is 3. Why is the following code buggy?' },
        { code: 'def sumTo(L,x):\n    count = 0\n    for i in range(len(L)):\n        for j in range(len(L)):\n            if L[i]+L[j]==x:\n                count += 1\n    return count' }
      ],
      options: [
        { l: 'A', t: 'Each pair may be counted twice' },
        { l: 'B', t: 'The code is actually correct all the time' },
        { l: 'C', t: 'The code will crash if the length of the list is 0' },
        { l: 'D', t: 'The code will be correct if x//2 is not in L' },
        { l: 'E', t: 'The code will be correct if x//2 is in L' }
      ],
      answer: 'A',
      explanation: 'Both `(i,j)` and `(j,i)` are visited, so every unordered pair is counted twice (an `L[i] == L[j]` self-pair is counted once, which is also wrong).'
    },
    {
      n: 44, marks: 3, type: 'mcq',
      stem: [
        { p: 'The following code checks whether a string is a palindrome. Provided the input is a string, what is the best description of the code?' },
        { code: 'def check_palindrome(s):\n    if not s:\n        return True\n    if s[0]==s[-1]:\n        return check_palindrome(s[1:len(s)-1])\n    return False' }
      ],
      options: [
        { l: 'A', t: 'The code can check palindrome correctly without crash' },
        { l: 'B', t: 'The code actually tells the wrong (reversed) answer always' },
        { l: 'C', t: 'The code will crash if len(s) is odd' },
        { l: 'D', t: 'The code will crash if the input s has its length len(s) == 1800' },
        { l: 'E', t: 'The code cannot work for reasons that are not mentioned here' }
      ],
      answer: 'A',
      explanation: 'Each call peels off both ends, and the empty-string base case ends it, so the answer is correct. 1800 characters only uses about 900 stack frames, inside Python\'s default limit of 1000.'
    },
    {
      n: 45, marks: 12, type: 'fib',
      stem: [
        { p: 'Given a list of unique numbers, check whether it is sorted in ascending order.' },
        { code: '>>> print(check_ascending([1,2,3]))\nTrue\n>>> print(check_ascending([1,4,3]))\nFalse' },
        { code: 'def check_ascending(L):\n    for i in {{1}}:\n        if {{2}}:\n            return {{3}}\n    return {{4}}' }
      ],
      blanks: [
        { n: 1, answer: 'range(len(L)-1)' },
        { n: 2, answer: 'L[i] > L[i+1]' },
        { n: 3, answer: 'False' },
        { n: 4, answer: 'True' }
      ],
      explanation: 'Compare each element with its successor; any descent proves the list is not ascending, and reaching the end means it is.'
    },
    {
      n: 46, marks: 12, type: 'fib',
      stem: [
        { p: 'Sort a list in place with selection sort or bubble sort.' },
        { code: '>>> L = [4,1,2,3,8,1,2,3,9,6]\n>>> my_sort(L)\n>>> print(L)\n[1, 1, 2, 2, 3, 3, 4, 6, 8, 9]' },
        { code: 'def my_sort(L):\n    for i in {{1}}:\n        for j in {{2}}:\n            if {{3}}:\n                L[{{4}}], L[{{5}}] = L[{{6}}], L[{{7}}]' }
      ],
      blanks: [
        { n: 1, answer: 'range(len(L))' },
        { n: 2, answer: 'range(len(L)-1-i)' },
        { n: 3, answer: 'L[j] > L[j+1]' },
        { n: 4, answer: 'j' },
        { n: 5, answer: 'j+1' },
        { n: 6, answer: 'j+1' },
        { n: 7, answer: 'j' }
      ],
      explanation: 'Bubble sort: after round `i`, the largest `i` values are already at the end, so the inner loop shrinks by one each time; swap adjacent out-of-order pairs.'
    },
    {
      n: 47, marks: 12, type: 'fib',
      stem: [
        { p: 'Given this map, locate the centre of every star — a `+` with a `#` immediately to its left, right, above and below — and print its position.' },
        { code: "map1 = ['.#+#...#...',\n        '..#...#+#..',\n        '.......#...',\n        '.+...#.....',\n        '....#+#...#',\n        '.....#...#+']\n>>> find_star(map1)\n(1, 7)\n(4, 5)" },
        { code: 'def find_star(m):\n    n_row = len(m)\n    n_col = len(m[0])\n    for i in {{1}}:\n        for j in {{2}}:\n            if {{3}}:\n                print((i,j))' }
      ],
      blanks: [
        { n: 1, answer: 'range(1,n_row-1)' },
        { n: 2, answer: 'range(1,n_col-1)' },
        { n: 3, answer: "m[i][j] == '+' and m[i][j-1] == '#' and m[i][j+1] == '#' and m[i-1][j] == '#' and m[i+1][j] == '#'" }
      ],
      explanation: 'A centre needs a neighbour on all four sides, so only interior rows and columns can hold one: `range(1, n_row-1)` and `range(1, n_col-1)`. The five-part test checks the `+` and its four `#` neighbours, which prints exactly `(1, 7)` then `(4, 5)`.'
    },
    {
      n: 48, marks: 12, type: 'fib',
      stem: [
        { p: 'The recursive binomial coefficient below is very slow. Speed it up with the technique taught in class.' },
        { code: 'def nCk(n,k):\n    if n==k or k==0:\n        return 1\n    ans = nCk(n-1,k-1)+nCk(n-1,k)\n    return ans' },
        { code: 'X = {{1}}\ndef nCk(n,k):\n    if {{2}}:\n        return {{3}}\n    if n==k or k==0:\n        return 1\n    ans = nCk(n-1,k-1)+nCk(n-1,k)\n    X[{{4}}] = {{5}}\n    return ans' }
      ],
      blanks: [
        { n: 1, answer: '{}' },
        { n: 2, answer: '(n,k) in X' },
        { n: 3, answer: 'X[(n,k)]' },
        { n: 4, answer: '(n,k)' },
        { n: 5, answer: 'ans' }
      ],
      explanation: 'Memoisation with a dictionary keyed on the argument tuple: look the pair up first, and store the freshly computed answer before returning it.'
    }
  ]
});
