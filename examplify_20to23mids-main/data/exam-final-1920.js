/* FINAL EXAMINATION (Semester 1 : AY 2019/20)
   (file: cs1010e_1920S1_final_exam_soln.pdf)
   24 questions, 100 marks, 2 hours. Q1-20 are the paper's MCQs (3 marks each,
   key taken from the printed answer table); Q21-24 are its four written
   programming questions, converted into fill-in-the-blank form over the same
   skeleton code so that they can be marked here. */
registerExam({
  id: 'final-1920',
  category: 'final',
  title: 'FINAL EXAMINATION (Semester 1 : AY 2019/20)',
  headerName: 'FINAL EXAMINATION (SEM 1 : AY 2019/20)',
  source: 'cs1010e_1920S1_final_exam_soln.pdf',
  duration: 120,
  sections: [
    { name: 'Part I — Multiple choice (3 marks each)', from: 1, to: 20, marks: 3 },
    { name: 'Part II — Programming questions', from: 21, to: 24, marks: 10 }
  ],
  questions: [
    {
      n: 1, marks: 3, type: 'mcq',
      stem: [
        { p: 'What value is produced by executing the following expression?' },
        { code: "2 ** (1 if ('0' if 'False' else '1') else 0) ** 3" }
      ],
      options: [
        { l: 'A', t: '1' }, { l: 'B', t: '2' }, { l: 'C', t: '8' },
        { l: 'D', t: 'Run-time error' }, { l: 'E', t: 'None of the above' }
      ],
      answer: 'B',
      explanation: 'A non-empty string is truthy, so `\'False\'` is true and the inner conditional yields `\'1\'`, which is also truthy and so gives `1`. `**` is right-associative: `2 ** (1 ** 3) = 2`.'
    },
    {
      n: 2, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given the following two assignments to `x`, what integer value should `x` have before assignment in order for the same value to be assigned after executing each assignment?' },
        { code: 'x *= x + 2\n\nx = x * x + 2' }
      ],
      options: [
        { l: 'A', t: '0' }, { l: 'B', t: '1' },
        { l: 'C', t: 'All possible integer values' },
        { l: 'D', t: 'More than one possible answer in choices (A), (B), (C)' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'B',
      explanation: 'The first gives `x*(x+2) = x^2 + 2x`, the second `x^2 + 2`. Equating them gives `2x = 2`, so `x = 1` (and `1*3 = 1+2 = 3`).'
    },
    {
      n: 3, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given the following function definition of `shift`, which of the following applications of `shift` will be evaluated successfully?' },
        { code: 'def shift(t,word):\n    return t[2:] + (word,)' }
      ],
      options: [
        { l: 'A', t: "shift('abc','d')" },
        { l: 'B', t: "shift(['w1', 'w2'], 'w3')" },
        { l: 'C', t: "shift(('1',),[[3]])" },
        { l: 'D', t: 'shift( (1), (2) )' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'C',
      explanation: 'The `+` requires both operands to be tuples. Only C passes a tuple as `t`; A, B and D pass a string, a list and an integer, which raise `TypeError` when added to the tuple.'
    },
    {
      n: 4, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given the following Ackermann function definition, how many times is `ack` called during the execution of `ack(1,2)`, including the first call?' },
        { code: 'def ack(m,n):\n    if m == 0:\n        return n+1\n    elif m > 0 and n == 0:\n        return ack(m-1,1)\n    else:\n        return ack(m-1,ack(m,n-1))' }
      ],
      options: [
        { l: 'A', t: '4' }, { l: 'B', t: '6' }, { l: 'C', t: '8' },
        { l: 'D', t: 'Infinite, since execution enters an infinite loop' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'B',
      explanation: '`ack(1,2)` calls `ack(1,1)`, which calls `ack(1,0)` and `ack(0,1)`; the inner result then needs `ack(0,3)` and finally `ack(0,4)` — six calls in all.'
    },
    {
      n: 5, marks: 3, type: 'mcq',
      stem: [
        { p: 'The following function has the following input-output behaviour. What does it do?' },
        { code: 'def madness(nums):\n    nums = sorted(nums)\n    res = {}\n    i = 0\n    while i < len(nums)-2:\n        j, k = i+1, len(nums)-1\n        while j < k:\n            if nums[i] + nums[j] + nums[k] == 0:\n                res[(nums[i],nums[j],nums[k])] = True\n                j += 1\n                k -= 1\n            elif (nums[i] + nums[j] + nums[k] < 0):\n                j += 1\n            else:\n                k -= 1\n        i += 1\n    return list(res.keys())' }
      ],
      options: [
        { l: 'A', t: 'It returns a tuple containing the minimum, maximum and middle elements in the list' },
        { l: 'B', t: 'It returns just one tuple of three elements in the input list whose sum is 0' },
        { l: 'C', t: 'It returns all tuples of three elements in the input list whose sum is 0' },
        { l: 'D', t: 'It returns some, but not necessarily all, tuples of 3 elements in the input list whose sum is 0' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'C',
      explanation: 'This is the classic 3-sum sweep: the two-pointer scan visits every viable triple, and the dict de-duplicates them, so every triple summing to zero is reported once.'
    },
    {
      n: 6, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is the result of evaluating the following expression?' },
        { code: '(lambda x: (lambda x : x)(lambda x: x+x)(x))(2)' }
      ],
      options: [
        { l: 'A', t: '0' }, { l: 'B', t: '2' }, { l: 'C', t: '4' },
        { l: 'D', t: '(lambda x:x+x)' }, { l: 'E', t: 'Run time error occurs' }
      ],
      answer: 'C',
      explanation: 'The inner `(lambda x: x)` returns its argument unchanged, i.e. the function `lambda x: x+x`, which is then called with the outer `x = 2`, giving 4.'
    },
    {
      n: 7, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is the result of executing the function call `crack(8, lambda x: x)`?' },
        { code: 'def crack(n,g):\n    if n % 5:\n        return crack(n+1,g(g))\n    else:\n        return g(n)' }
      ],
      options: [
        { l: 'A', t: '10' }, { l: 'B', t: '9' }, { l: 'C', t: '8' },
        { l: 'D', t: 'Run-time error' }, { l: 'E', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: '`g(g)` is still the identity, so it climbs 8, 9, 10 and then returns `g(10) = 10`, the first multiple of 5.'
    },
    {
      n: 8, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given that `oldmat` is a 4x4 integer matrix in which every integer is unique, where is the value of `oldmat[0][0]` stored in the resulting matrix?' },
        { code: 'def confuse(mat):\n    return [ mat[len(mat)-i-1][::-1]\n             for i in range(len(mat)) ]\n\nnewMat = confuse(oldmat)' }
      ],
      options: [
        { l: 'A', t: 'newMat[0][0]' }, { l: 'B', t: 'newMat[0][3]' },
        { l: 'C', t: 'newMat[3][0]' }, { l: 'D', t: 'newMat[3][3]' },
        { l: 'E', t: 'Run time error' }
      ],
      answer: 'D',
      explanation: 'The rows are taken from the bottom up, and each row is reversed — a 180-degree rotation. `oldmat[0][0]` therefore lands at the bottom-right corner.'
    },
    {
      n: 9, marks: 3, type: 'mcq',
      scope: { level: 'total', reason: 'multiple inheritance and method resolution order are not covered — L11 covers single inheritance only' },
      stem: [
        { p: 'Consider the following class definitions. What is printed?' },
        { code: 'class NUS:\n    def id(self):\n        return \'NUS\'\nclass SoC(NUS):\n    def id(self):\n        return \'SoC\'\nclass FOE(NUS):\n    def id(self):\n        return \'FOE\'\nclass Student(FOE,SoC):\n    pass\n\n>>> peter = Student()\n>>> print(peter.id())' }
      ],
      options: [
        { l: 'A', t: 'NUS' }, { l: 'B', t: 'SoC' }, { l: 'C', t: 'FOE' },
        { l: 'D', t: 'FOESoCNUS' }, { l: 'E', t: 'FOENUS' }
      ],
      answer: 'C',
      explanation: 'Attribute lookup follows the MRO, which puts the first listed base first: `Student -> FOE -> SoC -> NUS`.'
    },
    {
      n: 10, marks: 3, type: 'mcq',
      stem: [
        { p: 'The following `memof` uses a dictionary memo. After evaluating `memof(5)`, what does the dictionary look like?' },
        { code: 'memo = {0:0, 1:1, 2:2}\ndef memof(n):\n    if n in memo:\n        return memo[n]\n    res = memof(n-1) + memof(n-3)\n    memo[n] = res\n    return res' }
      ],
      options: [
        { l: 'A', t: '{0:0, 1:1, 2:2}' },
        { l: 'B', t: '{0:0, 1:1, 2:2, 3:2, 4:3, 5:5}' },
        { l: 'C', t: '{0:0, 1:1, 2:2, 3:3, 4:5, 5:8}' },
        { l: 'D', t: '{0:0, 1:1, 2:2, 3:2, 4:3}' },
        { l: 'E', t: '{0:0, 1:1, 2:2, 3:3, 4:5, 5:7}' }
      ],
      answer: 'B',
      explanation: '`memof(3) = memof(2) + memof(0) = 2`, `memof(4) = memof(3) + memof(1) = 3`, `memof(5) = memof(4) + memof(2) = 5`. Every computed value is cached.'
    },
    {
      n: 11, marks: 3, type: 'mcq',
      stem: [
        { p: 'Consider the following definition and the subsequent assignments. What are the contents of `lst1` and `lst2` afterwards?' },
        { code: 'def updLst(lst):\n    nlst = []\n    for i in range(len(lst)-1,-1,-1):\n        if type(lst[i]) == list:\n            nlst.append(lst[i])\n            for j in range(len(lst[i])):\n                lst[i].pop()\n        else:\n            nlst.append(lst[i])\n    return nlst\n\nlst1 = [1,[2,3],[4,[5],6],7]\nlst2 = updLst(lst1)' }
      ],
      options: [
        { l: 'A', t: 'lst1 = [1,[2,3],[4,[5],6],7],  lst2 = [7, [], [], 1]' },
        { l: 'B', t: 'lst1 = [1, [], [], 7],  lst2 = [7, [4,[5],6], [2,3], 1]' },
        { l: 'C', t: 'lst1 = [1,[2,3],[4,[5],6],7],  lst2 = [7, [4,[5],6], [2,3], 1]' },
        { l: 'D', t: 'lst1 = [1, [], [], 7],  lst2 = [7, [], [], 1]' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'D',
      explanation: '`nlst` stores the *same* inner list objects and then empties them, so both `lst1` and `lst2` end up holding references to lists that are now empty.'
    },
    {
      n: 12, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is the output from running the following code fragment?' },
        { code: 'class P():\n    def function1(self):\n        print(\'class P\')\nclass Q(P):\n    def function1(self):\n        super().function1()\n        print(\'class Q\')\nclass R(Q):\n    def function1(self):\n        print(\'class R\')\n        super().function1()\n\nr = R()\nr.function1()' }
      ],
      options: [
        { l: 'A', t: 'class R / class P / class Q' },
        { l: 'B', t: 'class R / class Q / class P' },
        { l: 'C', t: 'class P / class R / class Q' },
        { l: 'D', t: 'class Q / class P / class R' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: '`R.function1` prints `class R` and then calls `super()`, which runs `Q.function1`; that calls `super()` first, so `P` prints before `Q` — R, P, Q, matching the printed key.'
    },
    {
      n: 13, marks: 3, type: 'mcq',
      stem: [
        { p: 'Which of the following calls to `distance` evaluates to the number 2?' },
        { code: 'def myzip(w1,w2):\n    def myzip1(i,m,n):\n        if i == m or i == n:\n            return []\n        return [(w1[i],w2[i])]+myzip1(i+1,m,n)\n    return myzip1(0,len(w1),len(w2))\n\ndef distance(w1,w2):\n    cnt = 0\n    for c1,c2 in myzip(w1,w2):\n        if c1 != c2:\n            cnt += 1\n    return cnt' }
      ],
      options: [
        { l: 'A', t: 'distance("anagram","anamarg")' },
        { l: 'B', t: 'distance("anagram","margana")' },
        { l: 'C', t: 'distance("anagram","anagrames")' },
        { l: 'D', t: 'distance("anagram","anagarmmes")' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'D',
      explanation: 'The zip stops at the shorter string. Only the last two compared positions of `"anagarmmes"` differ (`a` vs `m` twice), giving 2; A has 4 mismatches and B has 6.'
    },
    {
      n: 14, marks: 3, type: 'mcq',
      stem: [
        { p: 'The following fragment attempts to create a matrix of `n` rows. What is printed as the content of `mat[1]`?' },
        { code: 'def makeMat(n):\n    mat = [[]] * n\n    count = 0\n    for row in mat:\n        for _ in range(2):\n            row.append(count)\n            count += 1\n    return mat\n\nmat = makeMat(2)\nmat[1]' }
      ],
      options: [
        { l: 'A', t: '[ ]' }, { l: 'B', t: '[2, 3]' },
        { l: 'C', t: '[0, 1, 2, 3]' }, { l: 'D', t: 'Run time error' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'C',
      explanation: '`[[]] * 2` repeats the *same* list object twice, so both "rows" are one list that receives all four appends.'
    },
    {
      n: 15, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is the value returned by evaluating the following expression?' },
        { code: 'list(filter (lambda x : 10 % x,\n             filter (lambda x: x % 2,[1,2,3,5,7,64])))' }
      ],
      options: [
        { l: 'A', t: '[ 0, 1, 0, 3]' }, { l: 'B', t: '[ 64 ]' },
        { l: 'C', t: '[ 3, 7 ]' }, { l: 'D', t: 'Zero division error occurs' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'C',
      explanation: 'The inner filter keeps odd numbers `[1,3,5,7]`; `10 % x` is non-zero only for 3 and 7, so those survive.'
    },
    {
      n: 16, marks: 3, type: 'mcq',
      stem: [
        { p: '`scan(add,0,[1,2,3,4,5])` produces `[1,3,6,10,15]`: element `i` is the sum of elements `0..i`. Complete `scan` by replacing `XXXXX`.' },
        { code: 'def scan(f,acc,lst):\n    def scan1(f,acc,i,n):\n        if i >= n:\n            return []\n        item = f(lst[i],acc)\n        return XXXXX\n    return scan1(f,acc,0,len(lst))\nadd = lambda x,y:x+y' }
      ],
      options: [
        { l: 'A', t: '[item].extend(scan1(f,item,i+1,n))' },
        { l: 'B', t: '[item]+scan1(f,acc,i+1,n)' },
        { l: 'C', t: '[acc]+scan1(f,item,i+1,n)' },
        { l: 'D', t: 'scan1(f,item+acc,i+1,n)' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'E',
      explanation: 'The running total `item` must be emitted *and* passed on as the next accumulator, i.e. `[item]+scan1(f,item,i+1,n)`, which is not among A-D. `list.extend` also returns `None`.'
    },
    {
      n: 17, marks: 3, type: 'mcq',
      stem: [
        { p: 'Which of the following statements is correct after running the code fragment?' },
        { code: 'class Par:\n    def __init__(self):\n        self.calc(30)\n    def calc(self, i):\n        self.aa = 2 * i\nclass Chi(Par):\n    def __init__(self):\n        super().__init__()\n    def calc(self, i):\n        self.bb = 3 * i\n\nkid = Chi()' }
      ],
      options: [
        { l: 'A', t: 'kid.aa has value 60' },
        { l: 'B', t: 'kid.bb has value 90' },
        { l: 'C', t: 'kid.aa and kid.bb have values 60 and 90 respectively' },
        { l: 'D', t: 'Run-time error occurs' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'B',
      explanation: '`self.calc` is dynamically dispatched, so the call inside `Par.__init__` runs `Chi.calc` and only sets `bb = 3*30 = 90`; `aa` is never assigned.'
    },
    {
      n: 18, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given `lst = [3,5,7,9]`, what is the result of executing `squeeze(lst,2,1)`?' },
        { code: 'def squeeze(lst,n,a):\n    done = False\n    while n >= 0 and not done :\n        if lst[n] > a:\n            lst[n+1] = lst[n]\n            n -= 1\n        else:\n            lst[n+1] = a\n            done = not done\n    if not done:\n        lst[0] = a\n    return lst' }
      ],
      options: [
        { l: 'A', t: '[3, 5, 7, 1]' }, { l: 'B', t: '[1, 3, 5, 7]' },
        { l: 'C', t: '[1, 3, 5, 7, 9]' }, { l: 'D', t: 'Run-time error was reported' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'B',
      explanation: 'Each element larger than 1 shifts one slot right (overwriting the 9), and the loop runs off the front, so `lst[0]` is set to 1 — an insertion that drops the last element.'
    },
    {
      n: 19, marks: 3, type: 'mcq',
      stem: [
        { p: 'Given the following code fragment, which expression is evaluated to `True`?' },
        { code: 'class P():\n    def __init__(self):\n        self.x = 0\nclass Q():\n    def __init__(self):\n        self.y = 0\nclass R(P,Q):\n    def get_x(self):\n        return self.x\nr = R()' }
      ],
      options: [
        { l: 'A', t: 'isinstance(r,Q)' }, { l: 'B', t: 'subclass(R,P)' },
        { l: 'C', t: 'inherited(R,Q)' },
        { l: 'D', t: 'More than one of the choices A, B and C above can be evaluated to True' },
        { l: 'E', t: 'None of the above' }
      ],
      answer: 'A',
      explanation: '`R` inherits from both `P` and `Q`, so an `R` instance is an instance of `Q`. `subclass` and `inherited` are not built-ins; the test is `issubclass`.'
    },
    {
      n: 20, marks: 3, type: 'mcq',
      stem: [
        { p: 'What is the result of evaluating the following expression?' },
        { code: 'def combinator(y):\n    return (lambda x: lambda y: x(y))(lambda x:y)\n\ncombinator(lambda x:x*10)(11)(12)' }
      ],
      options: [
        { l: 'A', t: '100' }, { l: 'B', t: '120' }, { l: 'C', t: '132' },
        { l: 'D', t: 'Run time error is encountered' }, { l: 'E', t: 'None of the above' }
      ],
      answer: 'B',
      explanation: '`combinator(f)` returns a function that ignores its argument and hands back `f`, so `(11)` yields `lambda x: x*10`, and `(12)` then gives 120.'
    },
    {
      n: 21, marks: 10, type: 'fib',
      stem: [
        { p: 'Implement `deepReverse`, which reverses a list of lists deeply. For example:' },
        { code: '>>> l = [1,2,[3,4,[5,6,[7],8],9],10,[11]]\n>>> print(deepReverse(l))\n[[11], 10, [9, [8, [7], 6, 5], 4, 3], 2, 1]' },
        { p: 'Complete the skeleton without changing the existing code.' },
        { code: 'def deepReverse(seq):\n    if seq == []:\n        return seq\n    elif type(seq) != list:\n        return seq\n    else:\n        return {{1}}' }
      ],
      blanks: [ { n: 1, answer: 'deepReverse(seq[1:]) + [deepReverse(seq[0])]' } ],
      explanation: 'Reverse the tail deeply first, then append the deeply reversed head as a single element, so `deepReverse(deepReverse(l))` restores the original.'
    },
    {
      n: 22, marks: 10, type: 'fib',
      stem: [
        { p: 'A local peak is an element larger than all of its neighbour(s). Mr Silly wrote this function; on `[1,5,6,9,5,4,3,10,11]` it returns 8 instead of the first local peak at index 3.' },
        { code: 'Line 1: def localPeak(lst):\nLine 2:     l = len(lst)\nLine 3:     if lst[0] > lst[1]:\nLine 4:         return 0\nLine 5:     if lst[l-1] > lst[l-2]:\nLine 6:         return l-1\nLine 7:     for i in range(1,l-1):\nLine 8:         if lst[i-1] < lst[i] and lst[i] > lst[i+1]:\nLine 9:             return i' },
        { p: 'The fix given by the paper is to move two statements to the end of the function. Enter the line numbers of those two statements, in order.' },
        { code: '# statements to move, in order:\n# line {{1}} then line {{2}}' }
      ],
      blanks: [
        { n: 1, answer: '5' },
        { n: 2, answer: '6' }
      ],
      explanation: 'Lines 5-6 test the last element *before* scanning left to right, so a trailing peak wins. Moving them after the loop lets the scan return the first interior peak; the trailing case is only used when no other peak exists.'
    },
    {
      n: 23, marks: 10, type: 'fib',
      scope: { level: 'slight', reason: 'uses math.factorial, which is not covered in lectures 1–11' },
      stem: [
        { p: 'The hyperbolic sine is `sinh(x) = sum over n of x^(2n+1)/(2n+1)!`. Sum only the first 50 terms (n from 0 to 49).' },
        { p: 'Write an iterative `sinhI(x)` (meaningful loops allowed), then an "ultimate" `sinhU(x)` with no explicit loop or recursion.' },
        { code: 'def sinhI(x):\n    total = 0\n    for n in range(50):\n        total += {{1}}\n    return total\n\ndef sinhU(x):\n    return {{2}}' }
      ],
      blanks: [
        { n: 1, answer: 'x**(2*n+1)/factorial(2*n+1)' },
        { n: 2, answer: 'sum([x**(2*n+1)/factorial(2*n+1) for n in range(50)])' }
      ],
      explanation: '`from math import factorial` is given. The ultimate version hides the loop inside a list comprehension and adds the terms with `sum`, which is allowed because it is not an explicit loop or recursion.'
    },
    {
      n: 24, marks: 10, type: 'fib',
      scope: { level: 'slight', reason: 'uses random.randint, which is not covered in lectures 1–11' },
      stem: [
        { p: 'Building on the RPG assignment, `Fighter` has `name`, `maxhp = 1200`, `hp = 1200`, `str = 100` and `cost = 100`; `Mage` has `mana`/`maxmana`, `cost = 200` and `int = 400`. `randAlive(team)` returns the index of a random living member, `randint(a,b)` is imported from `random`, `manaCost`/`manaRecovery` are the lecture constants, and `gotHurt(damage)` applies damage.' },
        { p: 'Write `ClumsyFighter`: same parameters as `Fighter`, `cost` of 50, and a 25% chance of hurting himself for 50 instead of attacking.' },
        { code: 'class ClumsyFighter(Fighter):\n    def __init__(self):\n        super().__init__()\n        self.name = \'ClumsyFighter\'\n        self.cost = {{1}}\n    def act(self, myTeam, enemy):\n        if randint(1,4) == 1:\n            {{2}}\n        else:\n            {{3}}' },
        { p: 'Then `Cleric`: same parameters as `Mage`, `cost` of 300, whose spell heals a random living teammate by 300 hp instead of damaging the enemy, capped at `maxhp`, and still costs mana under the usual rule.' },
        { code: 'class Cleric(Mage):\n    def __init__(self):\n        super().__init__()\n        self.name = \'Cleric\'\n        self.cost = {{4}}\n    def cast(self, myTeam, enemy):\n        self.mana -= manaCost\n        target = randAlive(myTeam)\n        myTeam[target].hp = {{5}}' }
      ],
      blanks: [
        { n: 1, answer: '50' },
        { n: 2, answer: 'self.gotHurt(50)' },
        { n: 3, answer: 'super().act(myTeam, enemy)' },
        { n: 4, answer: '300' },
        { n: 5, answer: 'min(myTeam[target].hp + 300, myTeam[target].maxhp)' }
      ],
      explanation: '`ClumsyFighter` reuses the inherited constructor and attack, overriding only the name, cost and the 25% trip. `Cleric` overrides `cast` entirely, so the mana rule in `Mage.act` is inherited unchanged; the heal must be clamped with `min(..., maxhp)`.'
    }
  ]
});
