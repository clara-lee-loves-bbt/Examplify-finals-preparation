/* FINAL EXAMINATION (Semester 1 : AY 2020/21)
   (file: cs1010e_2021S1_final_exam_soln.pdf)
   31 questions, 2 hours. The paper states no per-question marks, so this build
   uses 2 marks per MCQ (Q1-25), 5 marks per fill-in question (Q26-29) and
   15 marks for each of the two programming questions (Q30-31) — 100 in total.
   The code for Q11-25 is printed as images in the PDF; it has been transcribed
   here, and every key has been checked against the printed answer table. */
registerExam({
  id: 'final-2021',
  category: 'final',
  title: 'FINAL EXAMINATION (Semester 1 : AY 2020/21)',
  headerName: 'FINAL EXAMINATION (SEM 1 : AY 2020/21)',
  source: 'cs1010e_2021S1_final_exam_soln.pdf',
  duration: 120,
  sections: [
    { name: 'Section A — Evaluate the expression', from: 1, to: 10, marks: 2 },
    { name: 'Section B — Output prediction and debugging', from: 11, to: 25, marks: 2 },
    { name: 'Section C — Fill in the blanks', from: 26, to: 29, marks: 5 },
    { name: 'Section D — Programming questions', from: 30, to: 31, marks: 15 }
  ],
  questions: [
    {
      n: 1, marks: 2, type: 'mcq',
      stem: [
        { p: 'Evaluate the given expression, typed into a fresh Python shell.' },
        { code: '10+6//4+3//2' }
      ],
      options: [
        { l: 'A', t: '13' }, { l: 'B', t: '12' }, { l: 'C', t: '13.0' },
        { l: 'D', t: '3' }, { l: 'E', t: '3.5' }
      ],
      answer: 'B',
      explanation: '`//` is integer division: `6//4 = 1` and `3//2 = 1`, so the expression is `10 + 1 + 1 = 12`.'
    },
    {
      n: 2, marks: 2, type: 'mcq',
      stem: [ { p: 'Evaluate:' }, { code: '([1,2,3]*2)[::2]' } ],
      options: [
        { l: 'A', t: '[1,2,3]' }, { l: 'B', t: '[1,3,1,3]' },
        { l: 'C', t: '[]' }, { l: 'D', t: 'Error' }, { l: 'E', t: '[1, 3, 2]' }
      ],
      answer: 'E',
      explanation: 'The list becomes `[1,2,3,1,2,3]`; `[::2]` keeps indices 0, 2 and 4, giving `[1, 3, 2]` — option E, as the printed key says.'
    },
    {
      n: 3, marks: 2, type: 'mcq',
      stem: [ { p: 'Evaluate:' }, { code: "'abcdef'[(1,'d',4)[2]]" } ],
      options: [
        { l: 'A', t: "'c'" }, { l: 'B', t: "'f'" },
        { l: 'C', t: "'' (empty string)" }, { l: 'D', t: "'e'" }, { l: 'E', t: 'Error' }
      ],
      answer: 'D',
      explanation: '`(1,\'d\',4)[2]` is `4`, and `\'abcdef\'[4]` is `\'e\'`.'
    },
    {
      n: 4, marks: 2, type: 'mcq',
      stem: [ { p: 'Evaluate:' }, { code: "[a,b,c][int('1')]" } ],
      options: [
        { l: 'A', t: "'a'" }, { l: 'B', t: 'Error' }, { l: 'C', t: "'b'" },
        { l: 'D', t: "'c'" }, { l: 'E', t: "'' (empty string)" }
      ],
      answer: 'B',
      explanation: '`a`, `b` and `c` were never defined, so the list literal raises `NameError` before the indexing happens.'
    },
    {
      n: 5, marks: 2, type: 'mcq',
      stem: [ { p: 'Evaluate:' }, { code: "{'a':(1,2,3),'b':'qsr',2:[6]}['abc'[1]][0]" } ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: 'Error' }, { l: 'C', t: '6' },
        { l: 'D', t: "'s'" }, { l: 'E', t: "'q'" }
      ],
      answer: 'E',
      explanation: '`\'abc\'[1]` is `\'b\'`, whose value is the string `\'qsr\'`; index 0 of that string is `\'q\'`.'
    },
    {
      n: 6, marks: 2, type: 'mcq',
      stem: [ { p: 'Evaluate:' }, { code: '[i**2 for i in range(1,10)][3]' } ],
      options: [
        { l: 'A', t: '3' }, { l: 'B', t: '16' }, { l: 'C', t: '9' },
        { l: 'D', t: '4' }, { l: 'E', t: '2' }
      ],
      answer: 'B',
      explanation: 'The list is `[1, 4, 9, 16, ...]`; index 3 holds `4**2 = 16` (the values start at 1, not 0).'
    },
    {
      n: 7, marks: 2, type: 'mcq',
      stem: [ { p: 'Evaluate:' }, { code: 'len([[1,2,3],[4,5,6],[7,8,9],[10,11,12]])' } ],
      options: [
        { l: 'A', t: '3' }, { l: 'B', t: '12' }, { l: 'C', t: '4' },
        { l: 'D', t: '9' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: 'The outer list has four elements, each of which is itself a list.'
    },
    {
      n: 8, marks: 2, type: 'mcq',
      stem: [ { p: 'Evaluate:' }, { code: 'tuple(map(lambda x:x[0]+x[1],((1,2),(3,4))))' } ],
      options: [
        { l: 'A', t: '(1,2,3,4)' }, { l: 'B', t: '(3,7)' }, { l: 'C', t: '10' },
        { l: 'D', t: '(4,6)' }, { l: 'E', t: '((1,2,3,4),)' }
      ],
      answer: 'B',
      explanation: 'Each pair is summed: `1+2 = 3` and `3+4 = 7`, giving the tuple `(3, 7)`.'
    },
    {
      n: 9, marks: 2, type: 'mcq',
      stem: [ { p: 'Evaluate:' }, { code: "list(tuple(set('abcabc')))" } ],
      options: [
        { l: 'A', t: "['abcabc']" }, { l: 'B', t: "['b', 'c', 'a']" },
        { l: 'C', t: "['abc']" }, { l: 'D', t: "[('abc',)]" },
        { l: 'E', t: "[('abcabc',)]" }
      ],
      answer: 'B',
      explanation: 'The set holds the three characters `a`, `b` and `c` — a set keeps one copy of each distinct character. The printed key is B; note that CPython actually iterates small string sets in `a, b, c` order, so the point being tested is "three characters, order unspecified".'
    },
    {
      n: 10, marks: 2, type: 'mcq',
      stem: [ { p: 'Evaluate:' }, { code: '(lambda x,y,z:x(y)+x(z))((lambda x:x*2),4,5)' } ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '18' }, { l: 'C', t: '13' },
        { l: 'D', t: '(9,18)' }, { l: 'E', t: '(8,10)' }
      ],
      answer: 'B',
      explanation: 'The first argument is the doubling function, so it computes `8 + 10 = 18`.'
    },
    {
      n: 11, marks: 2, type: 'mcq',
      stem: [
        { p: 'If the following statements were put into a `.py` file and run, what would be the output?' },
        { code: 'd = {1:2, 2:4, 4:3, 3:5, 5:1}\nx = 1\nfor i in range(11):\n    x = d[x]\nprint(x)' }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '1' }, { l: 'C', t: '2' },
        { l: 'D', t: '3' }, { l: 'E', t: '4' }
      ],
      answer: 'C',
      explanation: 'The chain 1 -> 2 -> 4 -> 3 -> 5 -> 1 has length 5, and 11 steps is `2*5 + 1`, so `x` lands one step along the cycle: 2.'
    },
    {
      n: 12, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'def foo(x):\n    while type(x) == list:\n        x = x[0]\n    return x\n\nprint(foo([[[([1])]]]))' }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '(([([1])]))' }, { l: 'C', t: '1' },
        { l: 'D', t: '([1])' }, { l: 'E', t: '((1,),)' }
      ],
      answer: 'C',
      explanation: 'It keeps taking element 0 while the value is a list: `[[[[1]]]] -> [[[1]]] -> [[1]] -> [1] -> 1`, which is not a list, so 1 is returned.'
    },
    {
      n: 13, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'a,b = 1,2\n\na,b = b,a\n\na,b = b,a\n\nprint(a)' }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '2' }, { l: 'C', t: '1' },
        { l: 'D', t: '(1,2)' }, { l: 'E', t: '(2,1)' }
      ],
      answer: 'C',
      explanation: 'Swapping twice restores the original order, so `a` is 1 again.'
    },
    {
      n: 14, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'def foo(a,b):\n    if len(b) == 1:\n        return b[0]\n    return a(b[0], foo(a, b[1:]))\n\nprint(foo(lambda x,y:x+y, [i for i in range(1,5)]))' }
      ],
      options: [
        { l: 'A', t: '[1,2,3,4]' }, { l: 'B', t: '5' }, { l: 'C', t: '10' },
        { l: 'D', t: '4' }, { l: 'E', t: '[1,2,3,4,5]' }
      ],
      answer: 'C',
      explanation: 'The lambda is `+`, so the recursion folds the list into `1+2+3+4 = 10`.'
    },
    {
      n: 15, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'ans = 0\n\nfor i in range(0,100,50):\n\n    ans += i\n\nprint(ans)' }
      ],
      options: [
        { l: 'A', t: '0' }, { l: 'B', t: '4950' }, { l: 'C', t: '50' },
        { l: 'D', t: '100' }, { l: 'E', t: '150' }
      ],
      answer: 'C',
      explanation: '`range(0, 100, 50)` visits 0 and 50 only, so the total is 50.'
    },
    {
      n: 16, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'l = [0,0,0]\n\nk = [l]*2\n\nk[1][0] = 1\n\nprint(sum(k[0]))' }
      ],
      options: [
        { l: 'A', t: '0' }, { l: 'B', t: '2' }, { l: 'C', t: '1' },
        { l: 'D', t: '(1,1)' }, { l: 'E', t: 'Error' }
      ],
      answer: 'C',
      explanation: '`[l]*2` holds two references to the same list, so `k[1][0] = 1` also changes `k[0]` — summing gives 1.'
    },
    {
      n: 17, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'lf = [lambda x:x+i for i in range(0,10,2)]\n\nprint(lf[3](7))' }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '10' }, { l: 'C', t: '15' },
        { l: 'D', t: '7' }, { l: 'E', t: '[7]' }
      ],
      answer: 'C',
      explanation: 'Every lambda closes over the *same* variable `i`, which ends at 8 — not at the 6 that index 3 suggests — so it returns `7 + 8 = 15`.'
    },
    {
      n: 18, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: 'm = map(lambda x:x//3, [i for i in range(20)])\n\nprint(m[2])' }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '0' }, { l: 'C', t: '1' },
        { l: 'D', t: '3' }, { l: 'E', t: '2' }
      ],
      answer: 'A',
      explanation: '`map` returns a lazy iterator, which cannot be indexed — you would need `list(m)[2]`.'
    },
    {
      n: 19, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code? (The paper repeats Q13\'s program here.)' },
        { code: 'a,b = 1,2\n\na,b = b,a\n\na,b = b,a\n\nprint(a)' }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '2' }, { l: 'C', t: '1' },
        { l: 'D', t: '(1,2)' }, { l: 'E', t: '(2,1)' }
      ],
      answer: 'C',
      explanation: 'Two swaps restore the original values, so `a` is 1.'
    },
    {
      n: 20, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: "def foo(s):\n    return sum(map(lambda x:1+ord(x.lower())-ord('a'), s))\n\nprint(foo('Cab'))" }
      ],
      options: [
        { l: 'A', t: 'Error' }, { l: 'B', t: '0' }, { l: 'C', t: '6' },
        { l: 'D', t: '3' }, { l: 'E', t: "'cab'" }
      ],
      answer: 'C',
      explanation: 'Each letter is mapped to its 1-based position in the alphabet ignoring case: `c = 3`, `a = 1`, `b = 2`, total 6.'
    },
    {
      n: 21, marks: 2, type: 'mcq',
      stem: [
        { p: 'What is the output of the following code?' },
        { code: "class A:\n    def foo():\n        print('A')\nclass B(A):\n    def foo():\n        print('B')\nclass C(A):\n    def foo():\n        print('C')\nclass D(C):\n    def foo():\n        print('E')\nclass E(B):\n    pass\n\nE.foo()" }
      ],
      options: [
        { l: 'A', t: 'Error!' }, { l: 'B', t: 'A' }, { l: 'C', t: 'B' },
        { l: 'D', t: 'C' }, { l: 'E', t: '(Print nothing)' }
      ],
      answer: 'C',
      explanation: '`E` inherits `foo` from `B`, whose body prints `B`. (`D` is unrelated to this hierarchy, despite its misleading `\'E\'`.)'
    },
    {
      n: 22, marks: 2, type: 'mcq',
      stem: [
        { p: 'What will be the length of the list `lst` that will crash this function?' },
        { code: 'def reverseList(lst):\n    l2 = lst[:]\n    return reverseList(lst[1:]) + [l2[-1]]' }
      ],
      options: [
        { l: 'A', t: 'Only when len(lst) == 0' },
        { l: 'B', t: 'Only when len(lst) == 1' },
        { l: 'C', t: 'Only when len(lst) is even' },
        { l: 'D', t: 'The code will NOT crash at all for any length of lst' },
        { l: 'E', t: 'The code will crash for any length of lst' }
      ],
      answer: 'E',
      explanation: 'There is no base case: `lst[1:]` eventually becomes `[]`, and `l2[-1]` on an empty list raises `IndexError` — every length ends there.'
    },
    {
      n: 23, marks: 2, type: 'mcq',
      stem: [
        { p: 'The following function tries to reverse some collections. Which of the following lines will NOT crash?' },
        { code: 'def reverse(a):\n    if not a:\n        return a\n    return reverse(a[1:]) + a[0]' }
      ],
      options: [
        { l: 'A', t: 'reverse((1,2,3,4))' }, { l: 'B', t: 'reverse([1,2,3,4])' },
        { l: 'C', t: "reverse('abcde')" }, { l: 'D', t: 'reverse({1,2,3,4})' },
        { l: 'E', t: 'Every answer here will crash' }
      ],
      answer: 'C',
      explanation: 'Only a string supports `str + str` for the base case `\'\'` and the head. Tuples and lists try to add an *element* (`tuple + int`, `list + int`) and a set is not indexable at all.'
    },
    {
      n: 24, marks: 2, type: 'mcq',
      stem: [
        { p: '`compareTwoList` should say whether two lists contain the same integers in any order. What is true about it? (The paper allows more than one answer.)' },
        { code: 'def compareTwoList(l1,l2):\n    l1c = l1.copy()\n    l2c = l2.copy()\n    for i in l1:\n        l1c.remove(i)\n        if i in l2c:\n            l2c.remove(i)\n    return not l2c' }
      ],
      options: [
        { l: 'A', t: 'The function tells the right answer sometimes, and sometimes the wrong answer' },
        { l: 'B', t: 'The function will always tell the wrong answer' },
        { l: 'C', t: 'The function will always tell the right answer' },
        { l: 'D', t: 'The function will not crash even if the inputs are empty lists' },
        { l: 'E', t: 'The function will always crash' }
      ],
      answer: 'D',
      explanation: 'It never compares list *lengths*, so it reports `True` whenever every element of `l1` is found in `l2` — even when `l2` is longer, which is wrong. It does handle empty inputs without crashing.'
    },
    {
      n: 25, marks: 2, type: 'fib',
      stem: [
        { p: 'Assuming the input `l` is a list of integers, which statements are true about the following function? The printed key marks **two** of the five statements correct.' },
        { code: 'def foo(l):\n    l2 = l[1:]+[min(l)]\n    l3 = [(l[i],l2[i]) for i in range(len(l))]\n    return not tuple(filter(lambda x:x[0]<x[1],l3))' },
        { code: 'A. It will return a sorted list in ascending order\nB. It will crash if the input is an empty list\nC. It will crash if the length of the input is 1\nD. It will return True if the list is in non-descending order and False otherwise\nE. It will return True if the list is in non-ascending order and False otherwise' },
        { p: 'Enter the letters of the two correct statements, in alphabetical order.' },
        { code: 'correct statements: {{1}} and {{2}}' }
      ],
      blanks: [
        { n: 1, answer: 'B' },
        { n: 2, answer: 'E' }
      ],
      explanation: '`min(l)` on an empty list raises `ValueError` (B), while a single element works fine. The comparison pairs each element with its successor, so it returns `True` when nothing is smaller than the next element — a non-ascending (descending) list (E). A is wrong because the result is a bool, not a list; C is wrong because one element never reaches `min` on an empty list; D describes the opposite order.'
    },
    {
      n: 26, marks: 5, type: 'fib',
      stem: [
        { p: 'Given a list of integers, check that the whole list is greater than or equal to 0.' },
        { code: 'def checkAllPositive(L):\n    for i in {{1}}:\n        if i < {{2}}:\n            return {{3}}\n    return {{4}}' }
      ],
      blanks: [
        { n: 1, answer: 'L' },
        { n: 2, answer: '0' },
        { n: 3, answer: 'False' },
        { n: 4, answer: 'True' }
      ],
      explanation: 'Iterate over the elements themselves; the first negative value proves the answer is `False`, and reaching the end means every element passed.'
    },
    {
      n: 27, marks: 5, type: 'fib',
      stem: [
        { p: 'Implement your own `filter` that works on lists and returns a list.' },
        { code: 'def filter(f,lst):\n    output = [ ]\n    for {{1}} in {{2}}:\n        if {{3}}:\n            output.append(item)\n    return output' }
      ],
      blanks: [
        { n: 1, answer: 'item' },
        { n: 2, answer: 'lst' },
        { n: 3, answer: 'f(item)' }
      ],
      explanation: 'Walk the items of `lst`, and keep the ones for which the predicate returns `True`.'
    },
    {
      n: 28, marks: 5, type: 'fib',
      stem: [
        { p: 'Return a tuple of the largest and second largest values of the sequence. For example, `findLargest2((2,1,3,5,6,5))` returns `(6,5)`.' },
        { code: 'def findLargest2(L):\n    first = max(L[0],L[1])\n    second = min(L[0],L[1])\n    largest = max(L)\n    smallest = min(L)\n    for i in L[2:] :\n        if i > {{1}}:\n            if i > {{2}}:\n                {{3}} = first\n                {{4}} = i\n            else:\n                {{5}} = i\n    return (first,second)' }
      ],
      blanks: [
        { n: 1, answer: 'second' },
        { n: 2, answer: 'first' },
        { n: 3, answer: 'second' },
        { n: 4, answer: 'first' },
        { n: 5, answer: 'second' }
      ],
      explanation: 'A value only matters if it beats the current second place. If it also beats first place, the old first drops to second and the new value becomes first; otherwise it only replaces second.'
    },
    {
      n: 29, marks: 5, type: 'fib',
      stem: [
        { p: 'Given a shallow list `L`, `deepen` adds layers of nesting:' },
        { code: '>>> print(deepen([1,2,3,4,5]))\n[1, [2, [3, [4, [5]]]]]\n>>> print(deepen([]))\n[]\n>>> print(deepen([1]))\n[1]' },
        { code: 'def deepen(L):\n    if not L:\n        return      {{1}}     \n    if len(L) ==      {{2}}     :\n        return      {{3}}     \n    return [{{4}}, {{5}}]' }
      ],
      blanks: [
        { n: 1, answer: 'L' },
        { n: 2, answer: '1' },
        { n: 3, answer: '[L[0]]' },
        { n: 4, answer: 'L[0]' },
        { n: 5, answer: 'deepen(L[1:])' }
      ],
      explanation: 'The empty list is returned unchanged; a single element becomes a one-element list. Otherwise keep the head and deepen the tail one level further.'
    },
    {
      n: 30, marks: 15, type: 'fib',
      stem: [
        { p: 'Building on the RPG assignment: `Fighter` has `name`, `maxhp = 1200`, `hp = 1200`, `str = 100` and `cost = 100`, and `act(myTeam,enemy)` attacks a random living enemy with `self.str`. `Character.gotHurt(damage)` reduces hp (and marks the character dead at 0).' },
        { p: 'Write `TankFighter`: same parameters as `Fighter`, but `str` is 50, it acts exactly like a `Fighter`, and damage taken from `gotHurt` is halved (rounded down).' },
        { code: 'class TankFighter(Fighter):\n    def __init__(self):\n        super().__init__()\n        self.name = \'TankFighter\'\n        self.str = {{1}}\n    def gotHurt(self, damage):\n        super().gotHurt({{2}})' }
      ],
      blanks: [
        { n: 1, answer: '50' },
        { n: 2, answer: 'damage // 2' }
      ],
      explanation: 'Only two things change: the strength (50) and how damage is received. `//2` halves and rounds down, and calling `super().gotHurt` keeps the assignment\'s death bookkeeping.'
    },
    {
      n: 31, marks: 15, type: 'fib',
      stem: [
        { p: 'You need a total resistance of `o` ohms from two resistors plugged in series. Given the list of values you own, `check(rl, o)` returns `True` if some pair sums to exactly `o`. For example, with `[1,3,5,7]` and `o = 6`, the pair 1 and 5 works.' },
        { code: 'def check(rl, o):\n    for i in range(len(rl)):\n        for j in range({{1}}):\n            if {{2}}:\n                return True\n    return False' }
      ],
      blanks: [
        { n: 1, answer: 'i+1, len(rl)' },
        { n: 2, answer: 'rl[i] + rl[j] == o' }
      ],
      explanation: 'Starting `j` at `i+1` pairs every two distinct resistors once; if any pair sums to `o` return `True`, otherwise fall through to `False`.'
    }
  ]
});
