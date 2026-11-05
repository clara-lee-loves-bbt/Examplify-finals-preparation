# CS1010E Final Examination Question Bank

All six final papers held in `New papers/`, question by question: date, type, marks, full question text, options and the answers printed in the papers.

| # | Paper | Date | Questions | Total marks |
|---|---|---|---|---|
| 1 | FINAL EXAMINATION (Semester 1 : AY 2019/20) | Semester 1, 2019/2020 | 24 (20 MCQ, 4 FITB) | 100 |
| 2 | FINAL EXAMINATION (Semester 1 : AY 2020/21) | Semester 1, AY 2020/2021 | 31 (24 MCQ, 7 FITB) | 100 |
| 3 | FINAL EXAMINATION (Semester 1 : AY 2021/22) | Semester 1, AY 2021/2022 | 44 (40 MCQ, 4 FITB) | 100 |
| 4 | FINAL EXAMINATION (Semester 1 : AY 2022/23) | Semester 1, AY 2022/2023 | 48 (44 MCQ, 4 FITB) | 100 |
| 5 | FINAL ASSESSMENT (Semester 1 : AY 2024/25) | Semester 1, AY 2024/25 | 35 (21 MCQ, 14 FITB) | 100 |
| 6 | FINAL ASSESSMENT (Semester 1 : AY 2025/26) | Semester 1, AY 2025/26 | 29 (23 MCQ, 6 FITB) | 100 |

---

## 1. FINAL EXAMINATION (Semester 1 : AY 2019/20)

- **Date:** Semester 1, 2019/2020
- **Duration:** 120 minutes
- **Total marks:** 100
- **Number of questions:** 24
- **Source:** `cs1010e_1920S1_final_exam_soln.pdf`

### Q1 · MCQ · 3 marks

What value is produced by executing the following expression?

```python
2 ** (1 if ('0' if 'False' else '1') else 0) ** 3
```

**Options**

- **A.** 1
- **B.** 2
- **C.** 8
- **D.** Run-time error
- **E.** None of the above

**Answer:** B — 2

### Q2 · MCQ · 3 marks

Given the following two assignments to `x`, what integer value should `x` have before assignment in order for the same value to be assigned after executing each assignment?

```python
x *= x + 2

x = x * x + 2
```

**Options**

- **A.** 0
- **B.** 1
- **C.** All possible integer values
- **D.** More than one possible answer in choices (A), (B), (C)
- **E.** None of the above

**Answer:** B — 1

### Q3 · MCQ · 3 marks

Given the following function definition of `shift`, which of the following applications of `shift` will be evaluated successfully?

```python
def shift(t,word):
    return t[2:] + (word,)
```

**Options**

- **A.** shift('abc','d')
- **B.** shift(['w1', 'w2'], 'w3')
- **C.** shift(('1',),[[3]])
- **D.** shift( (1), (2) )
- **E.** None of the above

**Answer:** C — shift(('1',),[[3]])

### Q4 · MCQ · 3 marks

Given the following Ackermann function definition, how many times is `ack` called during the execution of `ack(1,2)`, including the first call?

```python
def ack(m,n):
    if m == 0:
        return n+1
    elif m > 0 and n == 0:
        return ack(m-1,1)
    else:
        return ack(m-1,ack(m,n-1))
```

**Options**

- **A.** 4
- **B.** 6
- **C.** 8
- **D.** Infinite, since execution enters an infinite loop
- **E.** None of the above

**Answer:** B — 6

### Q5 · MCQ · 3 marks

The following function has the following input-output behaviour. What does it do?

```python
def madness(nums):
    nums = sorted(nums)
    res = {}
    i = 0
    while i < len(nums)-2:
        j, k = i+1, len(nums)-1
        while j < k:
            if nums[i] + nums[j] + nums[k] == 0:
                res[(nums[i],nums[j],nums[k])] = True
                j += 1
                k -= 1
            elif (nums[i] + nums[j] + nums[k] < 0):
                j += 1
            else:
                k -= 1
        i += 1
    return list(res.keys())
```

**Options**

- **A.** It returns a tuple containing the minimum, maximum and middle elements in the list
- **B.** It returns just one tuple of three elements in the input list whose sum is 0
- **C.** It returns all tuples of three elements in the input list whose sum is 0
- **D.** It returns some, but not necessarily all, tuples of 3 elements in the input list whose sum is 0
- **E.** None of the above

**Answer:** C — It returns all tuples of three elements in the input list whose sum is 0

### Q6 · MCQ · 3 marks

What is the result of evaluating the following expression?

```python
(lambda x: (lambda x : x)(lambda x: x+x)(x))(2)
```

**Options**

- **A.** 0
- **B.** 2
- **C.** 4
- **D.** (lambda x:x+x)
- **E.** Run time error occurs

**Answer:** C — 4

### Q7 · MCQ · 3 marks

What is the result of executing the function call `crack(8, lambda x: x)`?

```python
def crack(n,g):
    if n % 5:
        return crack(n+1,g(g))
    else:
        return g(n)
```

**Options**

- **A.** 10
- **B.** 9
- **C.** 8
- **D.** Run-time error
- **E.** None of the above

**Answer:** A — 10

### Q8 · MCQ · 3 marks

Given that `oldmat` is a 4x4 integer matrix in which every integer is unique, where is the value of `oldmat[0][0]` stored in the resulting matrix?

```python
def confuse(mat):
    return [ mat[len(mat)-i-1][::-1]
             for i in range(len(mat)) ]

newMat = confuse(oldmat)
```

**Options**

- **A.** newMat[0][0]
- **B.** newMat[0][3]
- **C.** newMat[3][0]
- **D.** newMat[3][3]
- **E.** Run time error

**Answer:** D — newMat[3][3]

### Q9 · MCQ · 3 marks

Consider the following class definitions. What is printed?

```python
class NUS:
    def id(self):
        return 'NUS'
class SoC(NUS):
    def id(self):
        return 'SoC'
class FOE(NUS):
    def id(self):
        return 'FOE'
class Student(FOE,SoC):
    pass

>>> peter = Student()
>>> print(peter.id())
```

**Options**

- **A.** NUS
- **B.** SoC
- **C.** FOE
- **D.** FOESoCNUS
- **E.** FOENUS

**Answer:** C — FOE

### Q10 · MCQ · 3 marks

The following `memof` uses a dictionary memo. After evaluating `memof(5)`, what does the dictionary look like?

```python
memo = {0:0, 1:1, 2:2}
def memof(n):
    if n in memo:
        return memo[n]
    res = memof(n-1) + memof(n-3)
    memo[n] = res
    return res
```

**Options**

- **A.** {0:0, 1:1, 2:2}
- **B.** {0:0, 1:1, 2:2, 3:2, 4:3, 5:5}
- **C.** {0:0, 1:1, 2:2, 3:3, 4:5, 5:8}
- **D.** {0:0, 1:1, 2:2, 3:2, 4:3}
- **E.** {0:0, 1:1, 2:2, 3:3, 4:5, 5:7}

**Answer:** B — {0:0, 1:1, 2:2, 3:2, 4:3, 5:5}

### Q11 · MCQ · 3 marks

Consider the following definition and the subsequent assignments. What are the contents of `lst1` and `lst2` afterwards?

```python
def updLst(lst):
    nlst = []
    for i in range(len(lst)-1,-1,-1):
        if type(lst[i]) == list:
            nlst.append(lst[i])
            for j in range(len(lst[i])):
                lst[i].pop()
        else:
            nlst.append(lst[i])
    return nlst

lst1 = [1,[2,3],[4,[5],6],7]
lst2 = updLst(lst1)
```

**Options**

- **A.** lst1 = [1,[2,3],[4,[5],6],7],  lst2 = [7, [], [], 1]
- **B.** lst1 = [1, [], [], 7],  lst2 = [7, [4,[5],6], [2,3], 1]
- **C.** lst1 = [1,[2,3],[4,[5],6],7],  lst2 = [7, [4,[5],6], [2,3], 1]
- **D.** lst1 = [1, [], [], 7],  lst2 = [7, [], [], 1]
- **E.** None of the above

**Answer:** D — lst1 = [1, [], [], 7],  lst2 = [7, [], [], 1]

### Q12 · MCQ · 3 marks

What is the output from running the following code fragment?

```python
class P():
    def function1(self):
        print('class P')
class Q(P):
    def function1(self):
        super().function1()
        print('class Q')
class R(Q):
    def function1(self):
        print('class R')
        super().function1()

r = R()
r.function1()
```

**Options**

- **A.** class R / class P / class Q
- **B.** class R / class Q / class P
- **C.** class P / class R / class Q
- **D.** class Q / class P / class R
- **E.** None of the above

**Answer:** A — class R / class P / class Q

### Q13 · MCQ · 3 marks

Which of the following calls to `distance` evaluates to the number 2?

```python
def myzip(w1,w2):
    def myzip1(i,m,n):
        if i == m or i == n:
            return []
        return [(w1[i],w2[i])]+myzip1(i+1,m,n)
    return myzip1(0,len(w1),len(w2))

def distance(w1,w2):
    cnt = 0
    for c1,c2 in myzip(w1,w2):
        if c1 != c2:
            cnt += 1
    return cnt
```

**Options**

- **A.** distance("anagram","anamarg")
- **B.** distance("anagram","margana")
- **C.** distance("anagram","anagrames")
- **D.** distance("anagram","anagarmmes")
- **E.** None of the above

**Answer:** D — distance("anagram","anagarmmes")

### Q14 · MCQ · 3 marks

The following fragment attempts to create a matrix of `n` rows. What is printed as the content of `mat[1]`?

```python
def makeMat(n):
    mat = [[]] * n
    count = 0
    for row in mat:
        for _ in range(2):
            row.append(count)
            count += 1
    return mat

mat = makeMat(2)
mat[1]
```

**Options**

- **A.** [ ]
- **B.** [2, 3]
- **C.** [0, 1, 2, 3]
- **D.** Run time error
- **E.** None of the above

**Answer:** C — [0, 1, 2, 3]

### Q15 · MCQ · 3 marks

What is the value returned by evaluating the following expression?

```python
list(filter (lambda x : 10 % x,
             filter (lambda x: x % 2,[1,2,3,5,7,64])))
```

**Options**

- **A.** [ 0, 1, 0, 3]
- **B.** [ 64 ]
- **C.** [ 3, 7 ]
- **D.** Zero division error occurs
- **E.** None of the above

**Answer:** C — [ 3, 7 ]

### Q16 · MCQ · 3 marks

`scan(add,0,[1,2,3,4,5])` produces `[1,3,6,10,15]`: element `i` is the sum of elements `0..i`. Complete `scan` by replacing `XXXXX`.

```python
def scan(f,acc,lst):
    def scan1(f,acc,i,n):
        if i >= n:
            return []
        item = f(lst[i],acc)
        return XXXXX
    return scan1(f,acc,0,len(lst))
add = lambda x,y:x+y
```

**Options**

- **A.** [item].extend(scan1(f,item,i+1,n))
- **B.** [item]+scan1(f,acc,i+1,n)
- **C.** [acc]+scan1(f,item,i+1,n)
- **D.** scan1(f,item+acc,i+1,n)
- **E.** None of the above

**Answer:** E — None of the above

### Q17 · MCQ · 3 marks

Which of the following statements is correct after running the code fragment?

```python
class Par:
    def __init__(self):
        self.calc(30)
    def calc(self, i):
        self.aa = 2 * i
class Chi(Par):
    def __init__(self):
        super().__init__()
    def calc(self, i):
        self.bb = 3 * i

kid = Chi()
```

**Options**

- **A.** kid.aa has value 60
- **B.** kid.bb has value 90
- **C.** kid.aa and kid.bb have values 60 and 90 respectively
- **D.** Run-time error occurs
- **E.** None of the above

**Answer:** B — kid.bb has value 90

### Q18 · MCQ · 3 marks

Given `lst = [3,5,7,9]`, what is the result of executing `squeeze(lst,2,1)`?

```python
def squeeze(lst,n,a):
    done = False
    while n >= 0 and not done :
        if lst[n] > a:
            lst[n+1] = lst[n]
            n -= 1
        else:
            lst[n+1] = a
            done = not done
    if not done:
        lst[0] = a
    return lst
```

**Options**

- **A.** [3, 5, 7, 1]
- **B.** [1, 3, 5, 7]
- **C.** [1, 3, 5, 7, 9]
- **D.** Run-time error was reported
- **E.** None of the above

**Answer:** B — [1, 3, 5, 7]

### Q19 · MCQ · 3 marks

Given the following code fragment, which expression is evaluated to `True`?

```python
class P():
    def __init__(self):
        self.x = 0
class Q():
    def __init__(self):
        self.y = 0
class R(P,Q):
    def get_x(self):
        return self.x
r = R()
```

**Options**

- **A.** isinstance(r,Q)
- **B.** subclass(R,P)
- **C.** inherited(R,Q)
- **D.** More than one of the choices A, B and C above can be evaluated to True
- **E.** None of the above

**Answer:** A — isinstance(r,Q)

### Q20 · MCQ · 3 marks

What is the result of evaluating the following expression?

```python
def combinator(y):
    return (lambda x: lambda y: x(y))(lambda x:y)

combinator(lambda x:x*10)(11)(12)
```

**Options**

- **A.** 100
- **B.** 120
- **C.** 132
- **D.** Run time error is encountered
- **E.** None of the above

**Answer:** B — 120

### Q21 · FITB · 10 marks

Implement `deepReverse`, which reverses a list of lists deeply. For example:

```python
>>> l = [1,2,[3,4,[5,6,[7],8],9],10,[11]]
>>> print(deepReverse(l))
[[11], 10, [9, [8, [7], 6, 5], 4, 3], 2, 1]
```

Complete the skeleton without changing the existing code.

```python
def deepReverse(seq):
    if seq == []:
        return seq
    elif type(seq) != list:
        return seq
    else:
        return {{1}}
```

**Answer**

```text
1. deepReverse(seq[1:]) + [deepReverse(seq[0])]
```

### Q22 · FITB · 10 marks

A local peak is an element larger than all of its neighbour(s). Mr Silly wrote this function; on `[1,5,6,9,5,4,3,10,11]` it returns 8 instead of the first local peak at index 3.

```python
Line 1: def localPeak(lst):
Line 2:     l = len(lst)
Line 3:     if lst[0] > lst[1]:
Line 4:         return 0
Line 5:     if lst[l-1] > lst[l-2]:
Line 6:         return l-1
Line 7:     for i in range(1,l-1):
Line 8:         if lst[i-1] < lst[i] and lst[i] > lst[i+1]:
Line 9:             return i
```

The fix given by the paper is to move two statements to the end of the function. Enter the line numbers of those two statements, in order.

```python
# statements to move, in order:
# line {{1}} then line {{2}}
```

**Answer**

```text
1. 5
2. 6
```

### Q23 · FITB · 10 marks

The hyperbolic sine is `sinh(x) = sum over n of x^(2n+1)/(2n+1)!`. Sum only the first 50 terms (n from 0 to 49).

Write an iterative `sinhI(x)` (meaningful loops allowed), then an "ultimate" `sinhU(x)` with no explicit loop or recursion.

```python
def sinhI(x):
    total = 0
    for n in range(50):
        total += {{1}}
    return total

def sinhU(x):
    return {{2}}
```

**Answer**

```text
1. x**(2*n+1)/factorial(2*n+1)
2. sum([x**(2*n+1)/factorial(2*n+1) for n in range(50)])
```

### Q24 · FITB · 10 marks

Building on the RPG assignment, `Fighter` has `name`, `maxhp = 1200`, `hp = 1200`, `str = 100` and `cost = 100`; `Mage` has `mana`/`maxmana`, `cost = 200` and `int = 400`. `randAlive(team)` returns the index of a random living member, `randint(a,b)` is imported from `random`, `manaCost`/`manaRecovery` are the lecture constants, and `gotHurt(damage)` applies damage.

Write `ClumsyFighter`: same parameters as `Fighter`, `cost` of 50, and a 25% chance of hurting himself for 50 instead of attacking.

```python
class ClumsyFighter(Fighter):
    def __init__(self):
        super().__init__()
        self.name = 'ClumsyFighter'
        self.cost = {{1}}
    def act(self, myTeam, enemy):
        if randint(1,4) == 1:
            {{2}}
        else:
            {{3}}
```

Then `Cleric`: same parameters as `Mage`, `cost` of 300, whose spell heals a random living teammate by 300 hp instead of damaging the enemy, capped at `maxhp`, and still costs mana under the usual rule.

```python
class Cleric(Mage):
    def __init__(self):
        super().__init__()
        self.name = 'Cleric'
        self.cost = {{4}}
    def cast(self, myTeam, enemy):
        self.mana -= manaCost
        target = randAlive(myTeam)
        myTeam[target].hp = {{5}}
```

**Answer**

```text
1. 50
2. self.gotHurt(50)
3. super().act(myTeam, enemy)
4. 300
5. min(myTeam[target].hp + 300, myTeam[target].maxhp)
```

---

## 2. FINAL EXAMINATION (Semester 1 : AY 2020/21)

- **Date:** Semester 1, AY 2020/2021
- **Duration:** 120 minutes
- **Total marks:** 100
- **Number of questions:** 31
- **Source:** `cs1010e_2021S1_final_exam_soln.pdf`
- **Note:** The paper marks questions 30 and 31 as SKIPPED in its answer table, so no answers are printed for them.

### Q1 · MCQ · 2 marks

Evaluate the given expression, typed into a fresh Python shell.

```python
10+6//4+3//2
```

**Options**

- **A.** 13
- **B.** 12
- **C.** 13.0
- **D.** 3
- **E.** 3.5

**Answer:** B — 12

### Q2 · MCQ · 2 marks

Evaluate:

```python
([1,2,3]*2)[::2]
```

**Options**

- **A.** [1,2,3]
- **B.** [1,3,1,3]
- **C.** []
- **D.** Error
- **E.** [1, 3, 2]

**Answer:** E — [1, 3, 2]

### Q3 · MCQ · 2 marks

Evaluate:

```python
'abcdef'[(1,'d',4)[2]]
```

**Options**

- **A.** 'c'
- **B.** 'f'
- **C.** '' (empty string)
- **D.** 'e'
- **E.** Error

**Answer:** D — 'e'

### Q4 · MCQ · 2 marks

Evaluate:

```python
[a,b,c][int('1')]
```

**Options**

- **A.** 'a'
- **B.** Error
- **C.** 'b'
- **D.** 'c'
- **E.** '' (empty string)

**Answer:** B — Error

### Q5 · MCQ · 2 marks

Evaluate:

```python
{'a':(1,2,3),'b':'qsr',2:[6]}['abc'[1]][0]
```

**Options**

- **A.** 1
- **B.** Error
- **C.** 6
- **D.** 's'
- **E.** 'q'

**Answer:** E — 'q'

### Q6 · MCQ · 2 marks

Evaluate:

```python
[i**2 for i in range(1,10)][3]
```

**Options**

- **A.** 3
- **B.** 16
- **C.** 9
- **D.** 4
- **E.** 2

**Answer:** B — 16

### Q7 · MCQ · 2 marks

Evaluate:

```python
len([[1,2,3],[4,5,6],[7,8,9],[10,11,12]])
```

**Options**

- **A.** 3
- **B.** 12
- **C.** 4
- **D.** 9
- **E.** Error

**Answer:** C — 4

### Q8 · MCQ · 2 marks

Evaluate:

```python
tuple(map(lambda x:x[0]+x[1],((1,2),(3,4))))
```

**Options**

- **A.** (1,2,3,4)
- **B.** (3,7)
- **C.** 10
- **D.** (4,6)
- **E.** ((1,2,3,4),)

**Answer:** B — (3,7)

### Q9 · MCQ · 2 marks

Evaluate:

```python
list(tuple(set('abcabc')))
```

**Options**

- **A.** ['abcabc']
- **B.** ['b', 'c', 'a']
- **C.** ['abc']
- **D.** [('abc',)]
- **E.** [('abcabc',)]

**Answer:** B — ['b', 'c', 'a']

### Q10 · MCQ · 2 marks

Evaluate:

```python
(lambda x,y,z:x(y)+x(z))((lambda x:x*2),4,5)
```

**Options**

- **A.** Error
- **B.** 18
- **C.** 13
- **D.** (9,18)
- **E.** (8,10)

**Answer:** B — 18

### Q11 · MCQ · 2 marks

If the following statements were put into a `.py` file and run, what would be the output?

```python
d = {1:2, 2:4, 4:3, 3:5, 5:1}
x = 1
for i in range(11):
    x = d[x]
print(x)
```

**Options**

- **A.** Error
- **B.** 1
- **C.** 2
- **D.** 3
- **E.** 4

**Answer:** C — 2

### Q12 · MCQ · 2 marks

What is the output of the following code?

```python
def foo(x):
    while type(x) == list:
        x = x[0]
    return x

print(foo([[[([1])]]]))
```

**Options**

- **A.** Error
- **B.** (([([1])]))
- **C.** 1
- **D.** ([1])
- **E.** ((1,),)

**Answer:** C — 1

### Q13 · MCQ · 2 marks

What is the output of the following code?

```python
a,b = 1,2

a,b = b,a

a,b = b,a

print(a)
```

**Options**

- **A.** Error
- **B.** 2
- **C.** 1
- **D.** (1,2)
- **E.** (2,1)

**Answer:** C — 1

### Q14 · MCQ · 2 marks

What is the output of the following code?

```python
def foo(a,b):
    if len(b) == 1:
        return b[0]
    return a(b[0], foo(a, b[1:]))

print(foo(lambda x,y:x+y, [i for i in range(1,5)]))
```

**Options**

- **A.** [1,2,3,4]
- **B.** 5
- **C.** 10
- **D.** 4
- **E.** [1,2,3,4,5]

**Answer:** C — 10

### Q15 · MCQ · 2 marks

What is the output of the following code?

```python
ans = 0

for i in range(0,100,50):

    ans += i

print(ans)
```

**Options**

- **A.** 0
- **B.** 4950
- **C.** 50
- **D.** 100
- **E.** 150

**Answer:** C — 50

### Q16 · MCQ · 2 marks

What is the output of the following code?

```python
l = [0,0,0]

k = [l]*2

k[1][0] = 1

print(sum(k[0]))
```

**Options**

- **A.** 0
- **B.** 2
- **C.** 1
- **D.** (1,1)
- **E.** Error

**Answer:** C — 1

### Q17 · MCQ · 2 marks

What is the output of the following code?

```python
lf = [lambda x:x+i for i in range(0,10,2)]

print(lf[3](7))
```

**Options**

- **A.** Error
- **B.** 10
- **C.** 15
- **D.** 7
- **E.** [7]

**Answer:** C — 15

### Q18 · MCQ · 2 marks

What is the output of the following code?

```python
m = map(lambda x:x//3, [i for i in range(20)])

print(m[2])
```

**Options**

- **A.** Error
- **B.** 0
- **C.** 1
- **D.** 3
- **E.** 2

**Answer:** A — Error

### Q19 · MCQ · 2 marks

What is the output of the following code? (The paper repeats Q13's program here.)

```python
a,b = 1,2

a,b = b,a

a,b = b,a

print(a)
```

**Options**

- **A.** Error
- **B.** 2
- **C.** 1
- **D.** (1,2)
- **E.** (2,1)

**Answer:** C — 1

### Q20 · MCQ · 2 marks

What is the output of the following code?

```python
def foo(s):
    return sum(map(lambda x:1+ord(x.lower())-ord('a'), s))

print(foo('Cab'))
```

**Options**

- **A.** Error
- **B.** 0
- **C.** 6
- **D.** 3
- **E.** 'cab'

**Answer:** C — 6

### Q21 · MCQ · 2 marks

What is the output of the following code?

```python
class A:
    def foo():
        print('A')
class B(A):
    def foo():
        print('B')
class C(A):
    def foo():
        print('C')
class D(C):
    def foo():
        print('E')
class E(B):
    pass

E.foo()
```

**Options**

- **A.** Error!
- **B.** A
- **C.** B
- **D.** C
- **E.** (Print nothing)

**Answer:** C — B

### Q22 · MCQ · 2 marks

What will be the length of the list `lst` that will crash this function?

```python
def reverseList(lst):
    l2 = lst[:]
    return reverseList(lst[1:]) + [l2[-1]]
```

**Options**

- **A.** Only when len(lst) == 0
- **B.** Only when len(lst) == 1
- **C.** Only when len(lst) is even
- **D.** The code will NOT crash at all for any length of lst
- **E.** The code will crash for any length of lst

**Answer:** E — The code will crash for any length of lst

### Q23 · MCQ · 2 marks

The following function tries to reverse some collections. Which of the following lines will NOT crash?

```python
def reverse(a):
    if not a:
        return a
    return reverse(a[1:]) + a[0]
```

**Options**

- **A.** reverse((1,2,3,4))
- **B.** reverse([1,2,3,4])
- **C.** reverse('abcde')
- **D.** reverse({1,2,3,4})
- **E.** Every answer here will crash

**Answer:** C — reverse('abcde')

### Q24 · MCQ · 2 marks

`compareTwoList` should say whether two lists contain the same integers in any order. What is true about it? (The paper allows more than one answer.)

```python
def compareTwoList(l1,l2):
    l1c = l1.copy()
    l2c = l2.copy()
    for i in l1:
        l1c.remove(i)
        if i in l2c:
            l2c.remove(i)
    return not l2c
```

**Options**

- **A.** The function tells the right answer sometimes, and sometimes the wrong answer
- **B.** The function will always tell the wrong answer
- **C.** The function will always tell the right answer
- **D.** The function will not crash even if the inputs are empty lists
- **E.** The function will always crash

**Answer:** D — The function will not crash even if the inputs are empty lists

### Q25 · FITB · 2 marks

Assuming the input `l` is a list of integers, which statements are true about the following function? The printed key marks **two** of the five statements correct.

```python
def foo(l):
    l2 = l[1:]+[min(l)]
    l3 = [(l[i],l2[i]) for i in range(len(l))]
    return not tuple(filter(lambda x:x[0]<x[1],l3))
```

```python
A. It will return a sorted list in ascending order
B. It will crash if the input is an empty list
C. It will crash if the length of the input is 1
D. It will return True if the list is in non-descending order and False otherwise
E. It will return True if the list is in non-ascending order and False otherwise
```

Enter the letters of the two correct statements, in alphabetical order.

```python
correct statements: {{1}} and {{2}}
```

**Answer**

```text
1. B
2. E
```

### Q26 · FITB · 5 marks

Given a list of integers, check that the whole list is greater than or equal to 0.

```python
def checkAllPositive(L):
    for i in {{1}}:
        if i < {{2}}:
            return {{3}}
    return {{4}}
```

**Answer**

```text
1. L
2. 0
3. False
4. True
```

### Q27 · FITB · 5 marks

Implement your own `filter` that works on lists and returns a list.

```python
def filter(f,lst):
    output = [ ]
    for {{1}} in {{2}}:
        if {{3}}:
            output.append(item)
    return output
```

**Answer**

```text
1. item
2. lst
3. f(item)
```

### Q28 · FITB · 5 marks

Return a tuple of the largest and second largest values of the sequence. For example, `findLargest2((2,1,3,5,6,5))` returns `(6,5)`.

```python
def findLargest2(L):
    first = max(L[0],L[1])
    second = min(L[0],L[1])
    largest = max(L)
    smallest = min(L)
    for i in L[2:] :
        if i > {{1}}:
            if i > {{2}}:
                {{3}} = first
                {{4}} = i
            else:
                {{5}} = i
    return (first,second)
```

**Answer**

```text
1. second
2. first
3. second
4. first
5. second
```

### Q29 · FITB · 5 marks

Given a shallow list `L`, `deepen` adds layers of nesting:

```python
>>> print(deepen([1,2,3,4,5]))
[1, [2, [3, [4, [5]]]]]
>>> print(deepen([]))
[]
>>> print(deepen([1]))
[1]
```

```python
def deepen(L):
    if not L:
        return      {{1}}     
    if len(L) ==      {{2}}     :
        return      {{3}}     
    return [{{4}}, {{5}}]
```

**Answer**

```text
1. L
2. 1
3. [L[0]]
4. L[0]
5. deepen(L[1:])
```

### Q30 · FITB · 15 marks

Building on the RPG assignment: `Fighter` has `name`, `maxhp = 1200`, `hp = 1200`, `str = 100` and `cost = 100`, and `act(myTeam,enemy)` attacks a random living enemy with `self.str`. `Character.gotHurt(damage)` reduces hp (and marks the character dead at 0).

Write `TankFighter`: same parameters as `Fighter`, but `str` is 50, it acts exactly like a `Fighter`, and damage taken from `gotHurt` is halved (rounded down).

```python
class TankFighter(Fighter):
    def __init__(self):
        super().__init__()
        self.name = 'TankFighter'
        self.str = {{1}}
    def gotHurt(self, damage):
        super().gotHurt({{2}})
```

**Answer**

```text
1. SKIPPED
```

### Q31 · FITB · 15 marks

You need a total resistance of `o` ohms from two resistors plugged in series. Given the list of values you own, `check(rl, o)` returns `True` if some pair sums to exactly `o`. For example, with `[1,3,5,7]` and `o = 6`, the pair 1 and 5 works.

```python
def check(rl, o):
    for i in range(len(rl)):
        for j in range({{1}}):
            if {{2}}:
                return True
    return False
```

**Answer**

```text
1. SKIPPED
```

---

## 3. FINAL EXAMINATION (Semester 1 : AY 2021/22)

- **Date:** Semester 1, AY 2021/2022
- **Duration:** 120 minutes
- **Total marks:** 100
- **Number of questions:** 44
- **Source:** `cs1010e_2122S1_final_exam_soln.pdf`

### Q1 · MCQ · 2 marks

You can consider the code in each question to be in a separate file. What is the output when the file is run in IDLE?

```python
print(--10)
```

**Options**

- **A.** 10
- **B.** 9
- **C.** -10
- **D.** -9
- **E.** None of the rest

**Answer:** A — 10

### Q2 · MCQ · 2 marks

```python
print(7*8%3)
```

**Options**

- **A.** 2
- **B.** 14
- **C.** 18
- **D.** 21
- **E.** None of the rest

**Answer:** A — 2

### Q3 · MCQ · 2 marks

```python
print(3==2!=1!=0)
```

**Options**

- **A.** False
- **B.** True
- **C.** 1
- **D.** 0
- **E.** None of the rest

**Answer:** A — False

### Q4 · MCQ · 2 marks

```python
print({1,2,3}&{2,3,4}|{3,4,5})
```

**Options**

- **A.** {2, 3, 4, 5}
- **B.** {1, 2, 3, 4, 5}
- **C.** {1, 2, 3, 4}
- **D.** {2, 3}
- **E.** None of the rest

**Answer:** A — {2, 3, 4, 5}

### Q5 · MCQ · 2 marks

```python
print(len(((1,2,(3,4),(5,(6,7))))))
```

**Options**

- **A.** 4
- **B.** 7
- **C.** 6
- **D.** 1
- **E.** None of the rest

**Answer:** A — 4

### Q6 · MCQ · 2 marks

```python
La = [1, [2, [3, [4]]]]
Lb = [La[1], La[1][1]]
Lb[0][1] = 9
print(La)
```

**Options**

- **A.** [1, [2, 9]]
- **B.** [1, [2, [9]]]
- **C.** [1, [2, [3, [4]]]]
- **D.** IndexError
- **E.** None of the rest

**Answer:** A — [1, [2, 9]]

### Q7 · MCQ · 2 marks

```python
print(['abc',['def'],'qrs'][2][1][0])
```

**Options**

- **A.** 'r'
- **B.** 'e'
- **C.** ''
- **D.** 'f'
- **E.** None of the rest

**Answer:** A — 'r'

### Q8 · MCQ · 2 marks

```python
La = [1]*2
Lb = [La]*2
Lb = [Lb[:],Lb[::-1]]
Lb[0][1][0] = 9
print(Lb[1][0])
```

**Options**

- **A.** [9, 1]
- **B.** [1, 9]
- **C.** [1, 1]
- **D.** [9, 9]
- **E.** None of the rest

**Answer:** A — [9, 1]

### Q9 · MCQ · 2 marks

```python
print((1,2,3,[4,5,6],7,8,9)[2:5][::-1])
```

**Options**

- **A.** (7, [4, 5, 6], 3)
- **B.** ([4, 5, 6], 3, 2)
- **C.** (8, 7, [4, 5, 6])
- **D.** (8, 7, [6, 5, 4])
- **E.** None of the rest

**Answer:** A — (7, [4, 5, 6], 3)

### Q10 · MCQ · 2 marks

```python
def f(x):
    if x % 2 == 1:
        return x+1
    else:
        return x+4
print(f(f(f((1)))))
```

**Options**

- **A.** 10
- **B.** 12
- **C.** 14
- **D.** 16
- **E.** None of the rest

**Answer:** A — 10

### Q11 · MCQ · 2 marks

```python
def foo(x):
    if not x:
        return x
    return x[-1] + foo(x[:-1]) + x[-1]
print(foo('abcde'))
```

**Options**

- **A.** 'edcbaabcde'
- **B.** 'abcdeedcba'
- **C.** 'abcdedcba'
- **D.** 'abcdeebcda'
- **E.** 'edcbabcde'

**Answer:** A — 'edcbaabcde'

### Q12 · MCQ · 2 marks

```python
def f(x):
    if x < 0:
        return 'f'
    if x%2==0:
        return g(x-1)
    return f(x-1)
def g(x):
    if x < 0:
        return 'g'
    if x%2==1:
        return f(x-1)
    return g(x-1)
print(f(100))
```

**Options**

- **A.** 'g'
- **B.** 'f'
- **C.** The code will run into an infinite loop
- **D.** It will print a very long string with alternating 'f' and 'g'
- **E.** It will cause a RecursionError exception

**Answer:** A — 'g'

### Q13 · MCQ · 2 marks

```python
x,y = 100,0
if x > 10:
  y = 1
elif x > 100:
  y = 2
if x > 1000:
  y = 3
else:
  y = 4
print(y)
```

**Options**

- **A.** 4
- **B.** 3
- **C.** 2
- **D.** 1
- **E.** None of the rest

**Answer:** A — 4

### Q14 · MCQ · 2 marks

```python
x,y = 10,20
if x > y:
  z = 1
  if 2*x == y:
    z = 2
else:
  if 2*x < y:
    z = 3
  elif 2*x > y:
    z = 4
print(z)
```

**Options**

- **A.** 1
- **B.** 2
- **C.** 3
- **D.** 4
- **E.** None of the rest

**Answer:** E — None of the rest

### Q15 · MCQ · 2 marks

Which of the following outputs is impossible given any numeric value of `x`?

```python
if x > 0:
  x = x+2
if x < 10:
  y = 4
elif x > 20:
  y = 3
else:
  if x < 5:
    y = 2
  else:
    y = 1
print(y)
```

**Options**

- **A.** 1
- **B.** 2
- **C.** 3
- **D.** 4
- **E.** All outputs are possible

**Answer:** A — 1

### Q16 · MCQ · 2 marks

```python
x = 'a'
while len(x)<6:
    x += 'bc'
print(x)
```

**Options**

- **A.** 'abcbcbc'
- **B.** 'abcbc'
- **C.** 'abcbcbcbc'
- **D.** 'abcbcb'
- **E.** None of the rest

**Answer:** A — 'abcbcbc'

### Q17 · MCQ · 2 marks

```python
a = [1,2,3,4]
x = 0
for i in range(len(a)):
    x += 1
    if i in a:
        a.remove(i)
print(x,a)
```

**Options**

- **A.** 4 [4]
- **B.** 2 [3, 4]
- **C.** 2 [2, 3, 4]
- **D.** 4 [3, 4]
- **E.** 4 [2, 3, 4]

**Answer:** A — 4 [4]

### Q18 · MCQ · 2 marks

```python
x,y = 9999,0
while x > 0:
  y += 6
  x -= 6
print(y)
```

**Options**

- **A.** 10002
- **B.** 10001
- **C.** 10000
- **D.** 9999
- **E.** None of the rest

**Answer:** A — 10002

### Q19 · MCQ · 2 marks

```python
x = 0
i = 0
while i < 7:
  if i%2 == 0:

  i += 1
  if i%3 == 0:

  continue
  i += 1
  x += i
print(x)
```

**Options**

- **A.** 19
- **B.** 12
- **C.** 25
- **D.** 21
- **E.** None of the rest

**Answer:** E — None of the rest

### Q20 · MCQ · 2 marks

```python
x = [1,2]
def foo(y):
    y[0] = 9
    x[0] = 3
foo(x)
print(x)
```

**Options**

- **A.** [3, 2]
- **B.** [9, 2]
- **C.** [1, 2]
- **D.** [1, 3]
- **E.** [1, 9]

**Answer:** A — [3, 2]

### Q21 · MCQ · 2 marks

```python
y = 12
def foo(x):
    if x < 0:
        y = 1
    elif x > 0:
        y -= 1
    else:
        y = x+1
print(foo(y))
```

**Options**

- **A.** None of the rest
- **B.** 1
- **C.** 13
- **D.** 12
- **E.** None

**Answer:** A — None of the rest

### Q22 · MCQ · 2 marks

```python
print({'a':'d','c':'e','f':'z'}[{1:'f',5:'c',9:'a'}[1]])
```

**Options**

- **A.** 'z'
- **B.** 'e'
- **C.** 'd'
- **D.** ''
- **E.** None of the rest

**Answer:** A — 'z'

### Q23 · MCQ · 2 marks

```python
def f1(x):
    return x+1
def g1(x):
    return x-1
d1 = {1:f1,2:g1}
x = 1
for i in range(10):
    x = d1[x](x)
print(x)
```

**Options**

- **A.** 1
- **B.** 2
- **C.** Run into infinite loop
- **D.** Raise a RecursionError exception
- **E.** Raise a KeyError exception

**Answer:** A — 1

### Q24 · MCQ · 2 marks

```python
def tail(lst,op,res):
  if not lst:
    return res
  else:
    return tail(lst[:-1],op,op(res,lst[-1]))
print(tail([1,2,3,4], lambda x,y: (y,x), ()))
```

**Options**

- **A.** (1, (2, (3, (4, ()))))
- **B.** (((((), 4), 3), 2), 1)
- **C.** (4, (3, (2, (1, ()))))
- **D.** (((((), 1), 2), 3), 4)
- **E.** None of the rest

**Answer:** A — (1, (2, (3, (4, ()))))

### Q25 · MCQ · 2 marks

```python
f = lambda x,y: lambda z: (x)(y)(z)
print((f)(lambda x: lambda y: x, lambda z: z*2)(3)(4))
```

**Options**

- **A.** 8
- **B.** 6
- **C.** TypeError
- **D.** RecursionError
- **E.** None of the rest

**Answer:** A — 8

### Q26 · MCQ · 2 marks

```python
f1 = lambda x,y: x
f2 = lambda x,y: y
f3 = lambda c,x,y: c(x,y)
print(f3(f1,f2,f3)(f2,f1)(1,0))
```

**Options**

- **A.** 1
- **B.** 0
- **C.** TypeError
- **D.** RecursionError
- **E.** None of the rest

**Answer:** A — 1

### Q27 · MCQ · 2 marks

```python
class C0:
    def __init__(self,n):
        member = n*n
    def cout(self):
        print(member)
x = C0(5)
x.cout()
```

**Options**

- **A.** None of the rest
- **B.** 5
- **C.** 25
- **D.** None
- **E.** 0

**Answer:** A — None of the rest

### Q28 · MCQ · 2 marks

```python
class C1():
  def __init__(self, a):
    self.x = a
  def f(self):
    return self.y
class C2(C1):
  def __init__(self, a):
    self.y = a
    super().__init__(a+a)
  def f(self):
    return super().f() + self.x
class C3(C2):
  def __init__(self, a):
    self.x = a
    super().__init__(a+a)
print(C3(2).f())
```

**Options**

- **A.** 12
- **B.** 16
- **C.** 6
- **D.** 8
- **E.** None of the rest

**Answer:** A — 12

### Q29 · MCQ · 2 marks

```python
class C1():
  def f(self):
    return 1 + self.g()
  def g(self):
    return 2
class C2(C1):
  def f(self):
    return 3 + super().f()
class C3(C2):
  def g(self):
    return 4
print(C3().f())
```

**Options**

- **A.** 6
- **B.** 7
- **C.** 8
- **D.** 9
- **E.** None of the rest

**Answer:** C — 8

### Q30 · MCQ · 2 marks

```python
output = ''
try:
    x = 2
    y = 'a'
    q = y + str(x)
    z = q * x
except TypeError:
    output += '1'
else:
    output += '2'
finally:
    output += '3'
print(output)
```

**Options**

- **A.** ''
- **B.** '13'
- **C.** '3'
- **D.** '23'
- **E.** None of the rest

**Answer:** D — '23'

### Q31 · MCQ · 2 marks

Three functions extract the elements that occur exactly once. Which version is significantly slowest for a very long list?

```python
def extract_unique_1(L):
    output = []
    for i in L:
        if L.count(i) == 1:
            output.append(i)
    return output

def extract_unique_2(L):
    L2 = sorted(L)
    output = []
    for i in range(len(L2)):
        unique = True
        if i > 0:
            if L2[i] == L2[i-1]:
                unique = False
        if i < len(L2)-1:
            if L2[i] == L2[i+1]:
                unique = False
        if unique:
            output.append(L2[i])
    return output

def extract_unique_3(L):
    d = dict()
    for i in L:
        if not i in d:
            d[i] = 0
        d[i] += 1
    return list(filter(lambda x:d[x]==1,L))
```

**Options**

- **A.** 1
- **B.** 2
- **C.** 3
- **D.** 1 and 2
- **E.** 2 and 3
- **F.** 1 and 3
- **G.** They are all equally slow

**Answer:** A — 1

### Q32 · MCQ · 2 marks

Using the same three functions, which version(s) is/are significantly fastest?

**Options**

- **A.** 1
- **B.** 2
- **C.** 3
- **D.** 1 and 2
- **E.** 2 and 3
- **F.** 1 and 3
- **G.** They are all equally fast

**Answer:** E — 2 and 3

### Q33 · MCQ · 2 marks

If you really had to pick one fastest version, which would it be?

**Options**

- **A.** 1
- **B.** 2
- **C.** 3
- **D.** It is impossible to determine which one is the fastest
- **E.** They are all the same speed

**Answer:** C — 3

### Q34 · MCQ · 2 marks

This function should reverse the list but leaves `[1,2,3,4,5,6]` unchanged. Which single change fixes it?

```python
 1: def swap(lst, i, j):
 2:   lst[i],lst[j] = lst[j],lst[i]
 3:   return lst
 4: def reverse(lst):
 5:   n = len(lst)
 6:   for i in range(n):
 7:     n -= 1
 8:     swap(lst,i,n)
 9:   return lst
```

**Options**

- **A.** range(n//2) instead of "range(n)" at line 6
- **B.** lst = swap(lst,i,n-i-1) instead of "swap(lst,i,n-i-1)" at line 8
- **C.** n = len(lst)//2 instead of "n = len(lst)" at line 5
- **D.** swap(lst,i,n-1) instead of "swap(lst,i,n)" at line 8 and remove "n -= 1" at line 7
- **E.** None of the rest changes works

**Answer:** A — range(n//2) instead of "range(n)" at line 6

### Q35 · MCQ · 2 marks

```python
def foo(x):
    if not x:
        return x
    if type(x) != tuple:
        return (x,)
    return foo(x[1:]) + foo(x[0])
print(foo((0,1,2,3,(4,(5,6)))))
```

**Options**

- **A.** None of the rest
- **B.** (6,5,4,3,2,1,0)
- **C.** (((6,5),4),3,2,1,0)
- **D.** (((5,6),4),3,2,1,0)
- **E.** ((4,(5,6)),3,2,1,0)

**Answer:** A — None of the rest

### Q36 · MCQ · 2 marks

Which of the following function calls returns `False`?

```python
def foo(x):
  if len(x) <= 1:
    return True
  else:
    m = len(x)//2
    return foo(x[m]) and x[0] == x[-1]
```

**Options**

- **A.** "[0,[1,[2,[],2],1],0]"
- **B.** [0,[1,[2,[],2],1],0]
- **C.** "abcda"
- **D.** [0,[1,[2,3],1],0]
- **E.** None of the rest

**Answer:** A — "[0,[1,[2,[],2],1],0]"

### Q37 · MCQ · 2 marks

What is your comment on the following code that asks a user to choose between coffee or tea?

```python
try:
    print("Do you want coffee or tea?")
    print("If you want coffee, please enter 'c'")
    print("Any other choices will be deemed as tea")
    ans = input()
    assert ans == 'c'
except:
    request = 'Tea'
else:
    request = 'Coffee'
finally:
    print("Enjoy your "+request+"!")
```

**Options**

- **A.** The code is abusing the usage of exceptions
- **B.** The code is too inefficient
- **C.** The code may give the wrong answer for the choice from the user
- **D.** The code may crash
- **E.** The code is perfect and it is implemented in the best way

**Answer:** A — The code is abusing the usage of exceptions

### Q38 · MCQ · 2 marks

In the memoisation Fibonacci example from the lecture slides, what data structure was used to improve the efficiency of the code?

**Options**

- **A.** dictionary
- **B.** set
- **C.** list
- **D.** tuple
- **E.** lambda function

**Answer:** A — dictionary

### Q39 · MCQ · 2 marks

What is the best and simplest method to read a `.csv` file into a 2D array?

**Options**

- **A.** Use the csv package
- **B.** Use the built-in file opening functions of Python
- **C.** Use the imagio package
- **D.** Use the PIL package
- **E.** None of the rest

**Answer:** A — Use the csv package

### Q40 · MCQ · 2 marks

What is the best data type to store a number bigger than `2**1024`?

**Options**

- **A.** integer
- **B.** float
- **C.** string
- **D.** lambda function
- **E.** None of the rest

**Answer:** A — integer

### Q41 · FITB · 5 marks

Given a 2D map, print the centre of every star of the form `(+)`, e.g.:

```python
map1 = ['...........',
        '......(+)..',
        '...........',
        '....(+)....']
>>> find_star(map1)
(1, 7)
(3, 5)
```

```python
def find_star(m):
    n_row = len(m)
    n_col = len(m[0])
    for i in range({{1}}):
        for j in range({{2}}):
            if {{3}}:
                print((i,j))
```

**Answer**

```text
1. n_row
2. 1,n_col-1
3. m[i][j] == '+' and m[i][j-1] == '(' and m[i][j+1] == ')'
```

### Q42 · FITB · 5 marks

Using the RPG assignment code, implement `SickFighter`: same `maxhp` as `Fighter`, but starting `hp` is half of its maxhp, and acting behaves like a `Fighter` except that it loses 1 hp per action, never dropping to 0 (at hp 1 it stays at 1).

```python
class SickFighter(Fighter):
    def __init__(self):
        {{1}}
        {{2}}
    def act(self,myTeam,enemy):
        {{3}}
            {{4}}
        {{5}}
```

**Answer**

```text
1. super().__init__()
2. self.hp /= 2
3. if self.hp > 1:
4. self.hp -= 1
5. super().act(myTeam,enemy)
```

### Q43 · FITB · 5 marks

Write an iterative function that finds the greatest common divisor of two positive numbers, e.g. `gcd(20,10)` is 10 and `gcd(5,7)` is 1.

```python
def gcd(n,m):
  res = 0
  for i in {{1}}:
    if {{2}}:
      {{3}}
  return res
```

**Answer**

```text
1. range(1,min(n,m)+1)
2. n%i == m%i == 0
3. res = i
```

### Q44 · FITB · 5 marks

Count the non-unique prime divisors of `n` with a recursive helper. Dividing by the smallest divisor as you go guarantees the next divisor found is prime. For example, `count_prime_div(12)` is 3 (2, 2, 3) and `count_prime_div(11)` is 1.

```python
def count_prime_div(n):
  def helper(n,div):
    if div > n:
      return 0
    if {{1}}:
      return 1
    if n%div == 0:
      return {{2}}
    else:
      return {{3}}
  return helper(n,2)   # first prime is 2
```

**Answer**

```text
1. div == n
2. 1 + helper(n//div, div)
3. helper(n, div+1)
```

---

## 4. FINAL EXAMINATION (Semester 1 : AY 2022/23)

- **Date:** Semester 1, AY 2022/2023
- **Duration:** 120 minutes
- **Total marks:** 100
- **Number of questions:** 48
- **Source:** `cs1010e_2223S1_final_exam.pdf`
- **Note:** The only source file for this paper is the examination paper itself; there is no solution file and the printed answer column is blank, so the paper provides no answers.

### Q1 · MCQ · 1 mark

You can consider the code in each question to be in a separate file. What will be the output when we run the file in IDLE?

```python
print(9-2*3-1)
```

**Options**

- **A.** 2
- **B.** 20
- **C.** 5
- **D.** 4
- **E.** 14

**Answer:** A — 2

### Q2 · MCQ · 1 mark

```python
print(3**--3)
```

**Options**

- **A.** 27
- **B.** 9
- **C.** -9
- **D.** 0
- **E.** Error

**Answer:** A — 27

### Q3 · MCQ · 1 mark

```python
print(False or True)
```

**Options**

- **A.** True
- **B.** False
- **C.** 1
- **D.** 0
- **E.** None of the rest

**Answer:** A — True

### Q4 · MCQ · 1 mark

```python
print((False == False) in [False])
```

**Options**

- **A.** False
- **B.** True
- **C.** 0
- **D.** 1
- **E.** Error

**Answer:** A — False

### Q5 · MCQ · 1 mark

```python
print(True != False in [False])
```

**Options**

- **A.** True
- **B.** False
- **C.** 1
- **D.** 0
- **E.** Error

**Answer:** A — True

### Q6 · MCQ · 1 mark

```python
print(10>10 and 4<(9/0))
```

**Options**

- **A.** False
- **B.** True
- **C.** 1
- **D.** 0
- **E.** Error

**Answer:** A — False

### Q7 · MCQ · 1 mark

```python
print('abc'>'abbbbbbbb')
```

**Options**

- **A.** True
- **B.** False
- **C.** 'abc'
- **D.** 'abcabbbbbbbb'
- **E.** Error

**Answer:** A — True

### Q8 · MCQ · 1 mark

```python
print(max('12','111')+max('3','0'))
```

**Options**

- **A.** 123
- **B.** 111
- **C.** 15
- **D.** 114
- **E.** 1113

**Answer:** A — 123

### Q9 · MCQ · 1 mark

```python
print('1234567890'[1])
```

**Options**

- **A.** 2
- **B.** 1
- **C.** 0
- **D.** 3
- **E.** None

**Answer:** A — 2

### Q10 · MCQ · 1 mark

```python
print('12345'[1:5][0:4][2][0])
```

**Options**

- **A.** 4
- **B.** 1
- **C.** 2
- **D.** 3
- **E.** Error

**Answer:** A — 4

### Q11 · MCQ · 1 mark

```python
print((2)+(3,))
```

**Options**

- **A.** Error
- **B.** (2, 3)
- **C.** (5,)
- **D.** 5
- **E.** (2, (3,))

**Answer:** A — Error

### Q12 · MCQ · 1 mark

```python
print([9,[8,[7,6],[5,4]],3][1][2][3:5])
```

**Options**

- **A.** []
- **B.** 5
- **C.** 4
- **D.** 6
- **E.** Error

**Answer:** A — []

### Q13 · MCQ · 1 mark

```python
print(['123','456']['012'[1]])
```

**Options**

- **A.** Error
- **B.** Empty string
- **C.** 456
- **D.** 123
- **E.** 4

**Answer:** A — Error

### Q14 · MCQ · 1 mark

```python
A = ['a','b']
B = [A,'c']
C = [B,A]
B[0].remove('a')
print(C)
```

**Options**

- **A.** [[['b'], 'c'], ['b']]
- **B.** [['b', 'c'], ['b']]
- **C.** [[['b'], 'c'], ['a','b']]
- **D.** [[['a','b'], 'c'], ['b']]
- **E.** [['b', 'c'], ['a','b']]

**Answer:** A — [[['b'], 'c'], ['b']]

### Q15 · MCQ · 1 mark

```python
L1 = [0,1]
L2 = [L1,2,3]
L3 = L2.copy()
L3[0][1] = 999
print(L2)
```

**Options**

- **A.** [[0, 999], 2, 3]
- **B.** [[0, 1], 2, 3]
- **C.** [[999, 1], 2, 3]
- **D.** [999, 2, 3]
- **E.** Error

**Answer:** A — [[0, 999], 2, 3]

### Q16 · MCQ · 1 mark

```python
L1 = ([1,2],3,4)
def f(L):
    L[0][0] = 9
f(L1)
print(L1)
```

**Options**

- **A.** ([9, 2], 3, 4)
- **B.** ([1, 2], 3, 4)
- **C.** [[1, 2], 3, 4]
- **D.** (9, 3, 4)
- **E.** Error

**Answer:** A — ([9, 2], 3, 4)

### Q17 · MCQ · 1 mark

```python
B = [1,2]
B.append(B)
print(B[2][2][2][2][2][2][0])
```

**Options**

- **A.** 1
- **B.** [1, 2]
- **C.** [1, 2, [...]]
- **D.** Error
- **E.** [[1, 2, [...]]]

**Answer:** A — 1

### Q18 · MCQ · 1 mark

```python
print((9,8,7)*2+(1,2,3)[1])
```

**Options**

- **A.** Error
- **B.** (9, 8, 7, 1)
- **C.** (9, 8, 7, 2)
- **D.** (11, 10 , 9)
- **E.** (9, 8, 7, 9, 8, 7, 2)

**Answer:** A — Error

### Q19 · MCQ · 1 mark

```python
A = ([1,2,3],[5,6,7])
A[0].append(4)
print(A)
```

**Options**

- **A.** ([1, 2, 3, 4], [5, 6, 7])
- **B.** ([1, 2, 3], [5, 6, 7])
- **C.** Error
- **D.** ([1, 2, 3], [5, 6, 7], 4)
- **E.** [[1, 2, 3, 4], [5, 6, 7]]

**Answer:** A — ([1, 2, 3, 4], [5, 6, 7])

### Q20 · MCQ · 1 mark

```python
def f(x):
    return x+2
print(f(f(f(f(7)))))
```

**Options**

- **A.** 15
- **B.** 13
- **C.** 7
- **D.** 28
- **E.** 14

**Answer:** A — 15

### Q21 · MCQ · 1 mark

```python
def a(x):
    return 1+c(x)
def b(x):
    return 2+d(x)
def c(x):
    return 1+a(x)
print(a(1))
```

**Options**

- **A.** RecursionError
- **B.** NameError
- **C.** Infinite loop
- **D.** 8
- **E.** 6

**Answer:** A — RecursionError

### Q22 · MCQ · 1 mark

```python
def f(x):
    if x > 0:
        return 1+f(x-2)
print(f(10))
```

**Options**

- **A.** TypeError
- **B.** None
- **C.** 0
- **D.** 5
- **E.** RecursionError

**Answer:** A — TypeError

### Q23 · MCQ · 1 mark

```python
x = 100
for j in range(0,100,10):
    x -=1
print(x)
```

**Options**

- **A.** 90
- **B.** 0
- **C.** 91
- **D.** 1
- **E.** 100

**Answer:** A — 90

### Q24 · MCQ · 1 mark

```python
x = 0
for i in range(0,12):
    for j in range(0,10):
        for k in range(0,3):
            x += 1
print(x)
```

**Options**

- **A.** 360
- **B.** 0
- **C.** 25
- **D.** 198
- **E.** 22

**Answer:** A — 360

### Q25 · MCQ · 1 mark

```python
x,y = 0,0
while x < 10:
    x += 2
    y += 3
print(y)
```

**Options**

- **A.** 15
- **B.** 10
- **C.** 12
- **D.** 8
- **E.** 27

**Answer:** A — 15

### Q26 · MCQ · 1 mark

```python
x = 0
for i in range(0,1000000,25):
    x = 1-x
print(x)
```

**Options**

- **A.** 0
- **B.** RecursionError
- **C.** 40000
- **D.** - 40000
- **E.** 1

**Answer:** A — 0

### Q27 · MCQ · 1 mark

```python
x = 10
if x > 10:
  y = 1
elif x < 100:
  y = 2
elif x == 10:
  y = 3
else:
  y = 4
print(y)
```

**Options**

- **A.** 2
- **B.** 1
- **C.** 3
- **D.** 4
- **E.** Error

**Answer:** A — 2

### Q28 · MCQ · 1 mark

```python
y = 'a'
if y == 'b':
    x = 1
elif y == 'a':
    x = 2
if y == 'c':
    x = 3
else:
    x = 4
print(x)
```

**Options**

- **A.** 4
- **B.** 2
- **C.** 3
- **D.** 1
- **E.** Error

**Answer:** A — 4

### Q29 · MCQ · 1 mark

```python
print(tuple({9:8,7:6,5:4}))
```

**Options**

- **A.** (9, 7, 5)
- **B.** (9, 8, 7, 6, 5, 4)
- **C.** ((9, 8), (7, 6), (5, 4))
- **D.** ({9:8,7:6,5:4},)
- **E.** ({9:8,7:6,5:4})

**Answer:** A — (9, 7, 5)

### Q30 · MCQ · 1 mark

```python
d = {0:2, 1:5, 2:1, 3:2, 4:1, 5:3, 3:9,
2:7, 2:3}
a, output = 0, ''
while a in d:
    a = d[a]
    output += str(a)
print(output)
```

**Options**

- **A.** 239
- **B.** 27
- **C.** 21539
- **D.** Infinite Loop
- **E.** 20

**Answer:** A — 239

### Q31 · MCQ · 1 mark

```python
f1 = lambda x,y : x+y
f2 = lambda a,b,c: a(b,c)
print(f2(f1,4,7))
```

**Options**

- **A.** 11
- **B.** 28
- **C.** a function
- **D.** Error
- **E.** None

**Answer:** A — 11

### Q32 · MCQ · 1 mark

```python
f = lambda x:x%4
print(len(list(filter(f,range(0,10)))))
```

**Options**

- **A.** 7
- **B.** 3
- **C.** 10
- **D.** 12
- **E.** 1

**Answer:** A — 7

### Q33 · MCQ · 1 mark

```python
print(list(map(lambda x:x*3,'123')))
```

**Options**

- **A.** ['111', '222', '333']
- **B.** ['123123123']
- **C.** '123123123'
- **D.** ['123', '123', '123']
- **E.** Error

**Answer:** A — ['111', '222', '333']

### Q34 · MCQ · 1 mark

```python
class Graduate:
    def __init__(self,name,title):
        self.name = name
        self.title = title
        self.fullname = title+" "+name

alan = Graduate('Alan','BSc')
alan.title = 'Dr'
print(alan.fullname)
```

**Options**

- **A.** BSc Alan
- **B.** Dr Alan
- **C.** Alan
- **D.** Dr
- **E.** Bsc

**Answer:** A — BSc Alan

### Q35 · MCQ · 1 mark

```python
class Animal:
    def __init__(self):
        self.sound = None
    def speak(self):
        print(self.sound)
class Dog(Animal):
    def __init__(self):
        self.sound = "Woof"
class Chihuahua(Animal):
    def speak(self):
        print("*cute*")
        super().speak()
dolly = Chihuahua()
dolly.speak()
```

**Options**

- **A.** *cute*, then None on the next line
- **B.** *cute*, then Woof on the next line
- **C.** Woof
- **D.** *cute*
- **E.** None

**Answer:** A — *cute*, then None on the next line

### Q36 · MCQ · 1 mark

```python
n = 2
x = 0
try:
    while True:
        x += 10//n
        n-=1
except:
    print(x)
```

**Options**

- **A.** 15
- **B.** None
- **C.** 10
- **D.** 5
- **E.** The code crashes

**Answer:** A — 15

### Q37 · MCQ · 1 mark

```python
n = 0
try:
    n += 1
except what:
    n += 1
except:
    n += 1
else:
    n += 1
finally:
    n += 1
print(n)
```

**Options**

- **A.** 3
- **B.** 1
- **C.** 2
- **D.** 4
- **E.** The code crashes

**Answer:** A — 3

### Q38 · MCQ · 1 mark

```python
x = 0
try:
    assert 0*(1/0)
except AssertionError:
    x = 1
except ZeroDivisionError:
    x = 2
except:
    x = 3
print(x)
```

**Options**

- **A.** 2
- **B.** 0
- **C.** 1
- **D.** 3
- **E.** The code crashes

**Answer:** A — 2

### Q39 · MCQ · 1 mark

The two file opening modes `'w+'` and `'r+'` have some different functionalities.

**Options**

- **A.** True
- **B.** False

**Answer:** A — True

### Q40 · MCQ · 1 mark

```python
print(round(2.5)+round(3.5))
```

**Options**

- **A.** 6
- **B.** 5
- **C.** 7
- **D.** 7.0
- **E.** 6.0

**Answer:** A — 6

### Q41 · MCQ · 3 marks

If the input `L` is a list of numbers with odd length, what does the following function return?

```python
def foo(L):
    L2 = list(L.copy())
    output = []
    while len(L2)>2:
        output.append(max(L2))
        output.append(min(L2))
        L2.remove(max(L2))
        L2.remove(min(L2))
    output.append(L2[0])
    return output[-1]
```

**Options**

- **A.** Median of L
- **B.** Mean of L
- **C.** Mode of L
- **D.** A sorted list of L
- **E.** A zig-zag list of L

**Answer:** A — Median of L

### Q42 · MCQ · 3 marks

To store a large collection of names (strings) and query whether a name is in the collection, what is the best data structure in terms of speed?

**Options**

- **A.** Dictionary
- **B.** List
- **C.** Tuple
- **D.** File
- **E.** All of the answers here will be the same

**Answer:** A — Dictionary

### Q43 · MCQ · 3 marks

Given a list of unique integers `L`, we want to count the pairs that sum to `x`, e.g. `sumTo([1,2,3,4,5,6,7,8,9],13)` is 3. Why is the following code buggy?

```python
def sumTo(L,x):
    count = 0
    for i in range(len(L)):
        for j in range(len(L)):
            if L[i]+L[j]==x:
                count += 1
    return count
```

**Options**

- **A.** Each pair may be counted twice
- **B.** The code is actually correct all the time
- **C.** The code will crash if the length of the list is 0
- **D.** The code will be correct if x//2 is not in L
- **E.** The code will be correct if x//2 is in L

**Answer:** A — Each pair may be counted twice

### Q44 · MCQ · 3 marks

The following code checks whether a string is a palindrome. Provided the input is a string, what is the best description of the code?

```python
def check_palindrome(s):
    if not s:
        return True
    if s[0]==s[-1]:
        return check_palindrome(s[1:len(s)-1])
    return False
```

**Options**

- **A.** The code can check palindrome correctly without crash
- **B.** The code actually tells the wrong (reversed) answer always
- **C.** The code will crash if len(s) is odd
- **D.** The code will crash if the input s has its length len(s) == 1800
- **E.** The code cannot work for reasons that are not mentioned here

**Answer:** A — The code can check palindrome correctly without crash

### Q45 · FITB · 12 marks

Given a list of unique numbers, check whether it is sorted in ascending order.

```python
>>> print(check_ascending([1,2,3]))
True
>>> print(check_ascending([1,4,3]))
False
```

```python
def check_ascending(L):
    for i in {{1}}:
        if {{2}}:
            return {{3}}
    return {{4}}
```

**Answer**

```text
Not printed in the paper (no answer column / no solution file).
```

### Q46 · FITB · 12 marks

Sort a list in place with selection sort or bubble sort.

```python
>>> L = [4,1,2,3,8,1,2,3,9,6]
>>> my_sort(L)
>>> print(L)
[1, 1, 2, 2, 3, 3, 4, 6, 8, 9]
```

```python
def my_sort(L):
    for i in {{1}}:
        for j in {{2}}:
            if {{3}}:
                L[{{4}}], L[{{5}}] = L[{{6}}], L[{{7}}]
```

**Answer**

```text
Not printed in the paper (no answer column / no solution file).
```

### Q47 · FITB · 12 marks

Given this map, locate the centre of every star — a `+` with a `#` immediately to its left, right, above and below — and print its position.

```python
map1 = ['.#+#...#...',
        '..#...#+#..',
        '.......#...',
        '.+...#.....',
        '....#+#...#',
        '.....#...#+']
>>> find_star(map1)
(1, 7)
(4, 5)
```

```python
def find_star(m):
    n_row = len(m)
    n_col = len(m[0])
    for i in {{1}}:
        for j in {{2}}:
            if {{3}}:
                print((i,j))
```

**Answer**

```text
Not printed in the paper (no answer column / no solution file).
```

### Q48 · FITB · 12 marks

The recursive binomial coefficient below is very slow. Speed it up with the technique taught in class.

```python
def nCk(n,k):
    if n==k or k==0:
        return 1
    ans = nCk(n-1,k-1)+nCk(n-1,k)
    return ans
```

```python
X = {{1}}
def nCk(n,k):
    if {{2}}:
        return {{3}}
    if n==k or k==0:
        return 1
    ans = nCk(n-1,k-1)+nCk(n-1,k)
    X[{{4}}] = {{5}}
    return ans
```

**Answer**

```text
Not printed in the paper (no answer column / no solution file).
```

---

## 5. FINAL ASSESSMENT (Semester 1 : AY 2024/25)

- **Date:** Semester 1, AY 2024/25
- **Duration:** 120 minutes
- **Total marks:** 100
- **Number of questions:** 35
- **Source:** `cs1010e_2425S1_final_exam_soln.pdf`
- **Note:** Questions 22 to 27 are FITB with dropdown choices; the paper prints the chosen dropdown option as a letter.

### Q1 · MCQ · 1 mark

Consider the following program fragment:

```python
seq[1] = sum(seq[:2])
seq[2] = sum(seq[:3])
seq[3] = sum(seq[:4])
```

Given that `seq` is `[1,2,3,4,5]`, what is the final value of `seq` after executing the above 3 lines?

**Options**

- **A.** [1, 3, 7, 15, 5]
- **B.** [1, 3, 6, 10, 5]
- **C.** [1, 3, 6, 10, 15]
- **D.** [1, 3, 7, 4, 5]
- **E.** [1, 3, 6, 4, 5]

**Answer:** A — [1, 3, 7, 15, 5]

### Q2 · MCQ · 1 mark

Consider the following program fragment:

```python
s = seq
s[1] = sum(seq[:2])
s[2] = sum(seq[:3])
s[3] = sum(seq[:4])
```

Given that `seq` is `[1,2,3,4,5]`, what is the final value of `s` after executing the above 4 lines?

**Options**

- **A.** [1, 3, 7, 15, 5]
- **B.** [1, 3, 6, 10, 5]
- **C.** [1, 3, 6, 10, 15]
- **D.** [1, 3, 7, 4, 5]
- **E.** [1, 3, 6, 4, 5]

**Answer:** A — [1, 3, 7, 15, 5]

### Q3 · MCQ · 1 mark

Given the following program fragment:

```python
def a(s, i):
    return s | {i}
```

What is the output of

```python
a(a(a(set(),1),2),1)
```

**Options**

- **A.** {1, 2}
- **B.** {1, 2, 1}
- **C.** {}
- **D.** {1}
- **E.** {2}

**Answer:** A — {1, 2}

### Q4 · MCQ · 1 mark

Given that both `A` and `B` are sets, which of the following is equivalent to

```python
(A | B) - (A & B)
```

**Options**

- **A.** A ^ B
- **B.** A * B
- **C.** A + B
- **D.** A ** B
- **E.** None of the above

**Answer:** A — A ^ B

### Q5 · MCQ · 1 mark

You are given a map with horizontal streets and vertical avenues, both labelled from 0. Your house H is at street 0, avenue 0. If you are currently at (A) along street 0 there is one shortest path home; if you are at (B) on street 1, avenue 2 there are three shortest paths home.

```python
H---+---+---A---+---+---+
|   |   |   |   |   |   |
+---+---B---+---+---+---+
|   |   |   |   |   |   |
+---+---+---+---+---+---+
```

Complete the recursive function that returns the number of shortest paths from `(st, av)` home.

```python
def findPath(st, av):
    if st == 1 or av == 1:
        return 1
    return {{1}}
```

Which expression completes it?

**Options**

- **A.** findPath(st - 1, av) + findPath(st, av - 1)
- **B.** findPath(st + 1, av) + findPath(st, av + 1)
- **C.** findPath(st, av) + findPath(av, st)
- **D.** findPath(st - 1, av) + findPath(av - 1, st)
- **E.** findPath(st, av - 1) + findPath(av, st - 1)

**Answer:** A — findPath(st - 1, av) + findPath(st, av - 1)

### Q6 · MCQ · 1 mark

`findPath` from the previous question is very similar to the binomial coefficient problem with parameters `(n, r)`. Complete the function (where `n >= r`):

```python
def binomial_coeff(n, r):
    return {{1}}
```

Which expression completes it?

**Options**

- **A.** findPath(r + 1, n - r + 1)
- **B.** findPath(n, r)
- **C.** findPath(r, n)
- **D.** findPath(n, r-1)
- **E.** findPath(n-1, r-1) + findPath(n, r-1)

**Answer:** A — findPath(r + 1, n - r + 1)

### Q7 · MCQ · 1 mark

Given the following `compose` function:

```python
def compose(f, g):
    return lambda x: f(g(x))
```

What is the outcome of

```python
compose(lambda x: x * 2, lambda x: x + 2)(12)
```

**Options**

- **A.** 28
- **B.** 26
- **C.** 48
- **D.** 16
- **E.** None of the above

**Answer:** A — 28

### Q8 · MCQ · 1 mark

Using the same `compose(f, g)` definition, suppose we perform

```python
compose(compose(f, g), compose(h, k))
```

Which of the following is/are equivalent?

**Options**

- **A.** All of them
- **B.** compose(f, compose(g, compose(h, k)))
- **C.** compose(f, compose(compose(g, h), k))
- **D.** compose(compose(f, compose(g, h)), k)
- **E.** compose(compose(compose(f, g), h), k)

**Answer:** A — All of them

### Q9 · MCQ · 1 mark

Given the following class:

```python
class MyList:
    def __init__(self, lst):
        self.lst = lst
    def do(self, f):
        f(self.lst)
        return MyList(self.lst)
    def append(self, x):
        return self.do(lambda lst: lst.append(x))
    def remove(self, x):
        return self.do(lambda lst: lst.remove(x))
    def get(self):
        return self.lst
```

What is the outcome of

```python
MyList([1,2,3]).append(4).append(1).remove(1).get()
```

**Options**

- **A.** [2, 3, 4, 1]
- **B.** [1, 2, 3, 4]
- **C.** [1, 2, 3]
- **D.** [1, 4, 2, 3]
- **E.** [4, 1, 2, 3]

**Answer:** A — [2, 3, 4, 1]

### Q10 · MCQ · 1 mark

Consider the following `lsearch` function:

```python
def lsearch(v, lst, i):
    while i < len(lst) and lst[i] < v:
        i += 1
    return i
```

What is the value returned for

```python
lsearch(6, [1, 3, 5, 7, 9, 1, 3, 5, 7, 9], 6)
```

**Options**

- **A.** 8
- **B.** 2
- **C.** 3
- **D.** 7
- **E.** 10

**Answer:** A — 8

### Q11 · MCQ · 1 mark

Consider the following combination of `lsearch` (above) and `bsearch`:

```python
def bsearch(v, lst, start, end):
    if start > end:
        return start
    mid = (start + end) // 2
    if lst[mid] == v:
        return lsearch(v, lst, mid + 1)
    if lst[mid] < v:
        return bsearch(v, lst, mid + 1, end)
    return bsearch(v, lst, start, mid - 1)
```

What is the value returned for

```python
bsearch(6, [1, 3, 5, 7, 9, 1, 3, 5, 7, 9], 0, 4)
```

**Options**

- **A.** 3
- **B.** 2
- **C.** 7
- **D.** 8
- **E.** 10

**Answer:** A — 3

### Q12 · MCQ · 1 mark

Using `lsearch` and `bsearch` from the two previous questions:

```python
def somesort(lst):
    for i in range(1, len(lst)):
        idx = bsearch(lst[i], lst, 0, i - 1)
        lst[:i+1] = lst[:idx] + [lst[i]] + lst[idx:i]
        print(lst)
    return lst
```

What is the fifth line of output printed during `somesort([1, 3, 5, 7, 9, 1, 3, 5, 7, 9])`?

**Options**

- **A.** [1, 1, 3, 5, 7, 9, 3, 5, 7, 9]
- **B.** [1, 1, 3, 3, 5, 7, 9, 5, 7, 9]
- **C.** [1, 3, 5, 1, 3, 5, 7, 7, 9, 9]
- **D.** [1, 3, 1, 3, 5, 5, 7, 7, 9, 9]
- **E.** None of the above.

**Answer:** A — [1, 1, 3, 5, 7, 9, 3, 5, 7, 9]

### Q13 · MCQ · 1 mark

What package did we mention in lecture for image processing?

**Options**

- **A.** IMAGEIO
- **B.** IMGPY
- **C.** PILLOWS
- **D.** PSLIB
- **E.** IMAGEIOLIB

**Answer:** A — IMAGEIO

### Q14 · MCQ · 1 mark

What is the meaning of "EXIF" mentioned in our class?

**Options**

- **A.** Some information about an image
- **B.** A kind of exceptions
- **C.** Extra conditional statements
- **D.** Assertion
- **E.** A branch in the try block

**Answer:** A — Some information about an image

### Q15 · MCQ · 1 mark

The paper shows a chart of vertical bars, one per category, drawn with `matplotlib.pyplot`. Which of the following functions produces it?

**Options**

- **A.** bar()
- **B.** plot()
- **C.** hist()
- **D.** barh()
- **E.** pie()

**Answer:** A — bar()

### Q16 · MCQ · 3 marks

Given the following function definition:

```python
def uprt(lst):
    if lst == []:
        print('Empty')
    else:
        print(f'Near to {lst[0]}')
        uprt(lst[1:])
        print(f'Away from {lst[0]}')
```

What is the last statement printed during the following execution?

```python
>>> uprt([1,2,3,4])
```

**Options**

- **A.** Away from 1
- **B.** Away from 4
- **C.** Empty
- **D.** Near to 1
- **E.** Near to 4
- **F.** None of the above

**Answer:** A — Away from 1

### Q17 · MCQ · 3 marks

Consider the following function definition:

```python
def knot(a,b,n):
    if n == 0:
        return []
    if a == b:
        return [a]
    mid = (a + b) // 2
    left = knot(a+1, mid-1, n-1) if mid - a > 2 else []
    right = knot(mid+1, b-1, n-1) if b - mid > 2 else []
    return [a] + [left] + [mid] + [right] + [b]
```

What is the value returned from executing the following expression?

```python
>>> len(knot(1,12,5))
```

**Options**

- **A.** 5
- **B.** 9
- **C.** 11
- **D.** 13
- **E.** 15

**Answer:** A — 5

### Q18 · MCQ · 3 marks

The following `partition` function is used in QuickSort:

```python
def partition(lst,x):
    lsta = []
    lstb = []
    for i in lst:
        if i != x:
            if i < x:
                lsta.append(i)
            else:
                lstb.append(i)
    return (lsta,lstb)
```

Given a non-empty unsorted list `LIST0` of distinct integers, we execute:

```python
>>> r1,r2 = partition(LIST0, LIST0[0])
>>> nLIST = r1 + [LIST0[0]] + r2
```

Which of the following is correct about the content of `nLIST`?

**Options**

- **A.** At least one element in nLIST has been correctly placed into the finally sorted position.
- **B.** All elements in nLIST have been placed into the finally sorted position.
- **C.** It is possible that no element in nLIST has been placed into the finally sorted position.
- **D.** Execution aborted due to some logical error
- **E.** None of the above

**Answer:** A — At least one element in nLIST has been correctly placed into the finally sorted position.

### Q19 · MCQ · 3 marks

Given any list of tuples, `gbsort` sorts it by one component with a chosen comparison:

```python
def bubbleC(lst,idx,cmp):
    n = len(lst)
    lst1 = lst.copy()
    for i in range(1,n):
        if cmp(lst1[i-1][idx],lst1[i][idx]):
            lst1[i-1],lst1[i] = lst1[i],lst1[i-1]
    return lst1

def gbsort(lst, idx, cmp):
    n = len(lst)
    lst1 = lst.copy()
    for i in range(n):
        lst1 = bubbleC(lst1,idx,cmp)
    return lst1
```

Which call sorts `lst1` primarily (non-decreasing) by the first component and, within equal first components, secondarily (non-increasing) by the second component?

```python
>>> [(-2, 15, 'v'), (0, 18, 'h'), (2, 19, 'm'), (2, 18, 'm'), (2, 16, 'm')]
```

**Options**

- **A.** gbsort(gbsort(lst1,1,lambda a,b: a < b), 0, lambda a,b: a > b)
- **B.** gbsort(gbsort(lst1,0,lambda a,b: a > b), 1, lambda a,b: a < b)
- **C.** gbsort(gbsort(lst1,1,lambda a,b: a <= b), 0, lambda a,b: a >= b)
- **D.** gbsort(gbsort(lst1,0,lambda a,b: a >= b), 1, lambda a,b: a <= b)
- **E.** There are at least two correct choices above
- **F.** None of the above

**Answer:** A — gbsort(gbsort(lst1,1,lambda a,b: a < b), 0, lambda a,b: a > b)

### Q20 · MCQ · 3 marks

Consider applying the following function to a nested list:

```python
def mystery(lst,f):
    if lst == []:
        return []
    if type(lst[0]) == int:
        if f(lst[0]):
            return [ lst[0] ] + mystery(lst[1:],f)
        else:
            return mystery(lst[1:],f)
    return mystery(lst[0],f) + mystery(lst[1:],f)
```

What is printed by the following execution?

```python
>>> k = [[0, -4, [-4]], 4, -2, 1, 3, [[5], -4, -5], 3, -4, 5, 2]
>>> out = mystery(k, lambda n: n > 0)
>>> print(out)
```

**Options**

- **A.** [4, 1, 3, 5, 3, 5, 2]
- **B.** [4, 1, 3, [5], 3, 5, 2]
- **C.** [[], 4, 1, 3, [[5]], 3, 5, 2]
- **D.** [[[]], 4, 1, 3, [[5]], 3, 5, 2]
- **E.** None of the above

**Answer:** A — [4, 1, 3, 5, 3, 5, 2]

### Q21 · MCQ · 3 marks

Consider applying the following function to a nested list and a number:

```python
def sotong(lst,n):
    if lst == []:
        return 0
    fst = lst[0]
    rest = lst[1:]
    fnum = 0
    if type(fst) == int:
        fnum = 1 if fst == n else 0
    else:
        fnum = sotong(fst,n)
        if fnum > 0:
            fnum += 1
    rnum = sotong(rest,n)
    return max(fnum,rnum)
```

What is returned by the following call?

```python
>>> sotong([3,[[14,[4,3]]],5,[3,2]],3)
```

**Options**

- **A.** 4
- **B.** 3
- **C.** 2
- **D.** 1
- **E.** None of the above

**Answer:** A — 4

### Q22 · FITB · 3 marks

The following Turtle program draws an analog clock face. It takes integer hours `hh` (0-23) and minutes `mm` (0-59).

```python
def clock(hh,mm):
    clearscreen()
    right(({{1}} * mm) - 90)
    forward(200)
    home()
    right({{2}} * (hh * 60 + mm) - 90)
    forward(160)
    hideturtle()

# (c) Deployed for a full day, the hour hand coincides with
#     the minute hand {{3}} times.
```

The paper offers these choices. (a) `6`, `5`, `0.5`, `2`, `0.25`. (b) `0.5`, `6`, `5`, `2`, `0.25`. (c) `2`, `12`, `24`, `1`, none of the above.

**Answer**

```text
1. A
2. A
3. A
```

### Q23 · FITB · 2 marks

The following expression evaluates to `True` if a non-empty string `s` is a palindrome, without the doubled-up comparisons of `s == s[::-1]`.

```python
s[ : {{1}}//2] == s[{{2}}//2 : ][ : : -1]
```

The choices for (1) are `len(s)`, `(len(s) + 1)`, `(len(s) - 1)`, `0`, none of the above. The choices for (2) are `(len(s) + 1)`, `len(s)`, `(len(s) - 1)`, `0`, none of the above.

**Answer**

```text
1. A
2. A
```

### Q24 · FITB · 3 marks

Given `[s0, s1, s2, s3, ...]`, we compute `s0 - s1 + s2 - s3 + ...` with:

```python
def compute(seq):
    pairs = map(lambda x: {{1}}, seq)
    return reduce(lambda p,q: ({{2}}, {{3}}), pairs)[0]
```

For example, `compute([1,2,3,4,5])` returns 3. The choices for (1) are `(x, -1)`, `(x, 1)`, `(x**2, 1)`, `(x, x % 2)`, `(x, x**2)`; for (2) `p[0] + (p[1] * q[0])`, `p[1] + (p[0] * q[1])`, `p[0] + (p[0] * q[1])`, `p[1] + (p[1] * q[0])`, `p[1] + (p[0] * q[0])`; for (3) `p[1] * q[1]`, `p[0] * q[0]`, `p[0] * q[1]`, `p[1] * q[0]`, `q[0] * q[1]`.

**Answer**

```text
1. A
2. A
3. A
```

### Q25 · FITB · 2 marks

Over 800 students each have a 7-digit identifier. Grouping them by the last digit speeds up searching:

```python
def group(seq, f):
    dct = {}
    for i in seq:
        dct[f(i)] = [i] + {{1}}
    return dct

h = group([1234567, 1000007, 7654321], {{2}})
```

With the right `f`, `h` becomes `{7: [1000007, 1234567], 1: [7654321]}`. The choices for (1) are `(dct[f(i)] if f(i) in dct else [])`, `(dct[f(i)] if f(i) not in dct else [])`, `([] if f(i) in dct else dct[f(i)])`, `dct[f(i)]`; for (2) `lambda x: x % 10`, `x % 10`, `lambda x: x % 10 == 0`, `x // 10`, `lambda x: x // 10 == 1`.

**Answer**

```text
1. A
2. A
```

### Q26 · FITB · 2 marks

Study the following classes. Complete `Tank` so that `Tank().fire()` prints `Fire!`.

```python
class Weapon:
    def fire(self):
        pass

class Cannon(Weapon):
    def fire(self):
        print("Fire!")

class Tank(Weapon):
    def __init__(self):
        {{1}}
    def fire(self):
        {{2}}
```

The choices for (1) are `self.cannon = Cannon()`, `self.cannon = Cannon(Weapon())`, `cannon = Weapon()`, `self.cannon = Weapon(Cannon())`, `cannon = Cannon(Weapon())`; for (2) `s`, `super.cannon.fire()`, `cannon.fire()`, `super.cannon().fire()`, `self.cannon().fire()`.

**Answer**

```text
1. A
2. A
```

### Q27 · FITB · 3 marks

A magic square of odd order `n` is an `n x n` grid of `n^2` consecutive integers whose rows, columns and diagonals all sum to the same value.

```python
# (a) build a 3-by-3 grid of zeros
m = {{1}}

# (b) the correct first call for n = 3
magic({{2}})

# (c) the sum of each row / column / diagonal,
#     for values from c to c + n*n - 1
{{3}}
```

The methods: (a) `[[0 for i in range(3)] for j in range(3)]`, `[[0 for i in range(3)]] * 3`, `[0 for i in range(3)] * 3`, `[[0 for i in range(3)]][:] * 3`, none of the above. (b) `m, 1, 0, 1`, `m, 0, 1, 1`, `m, 0, 2, 1`, `m, 2, 0, 1`, `m, 1, 1, 1`. (c) `n * (n**2 + 1) / 2 + n * (c-1)`, `n * (n**2 + 1) / 2 + n * c`, `n * (n**2 + 1) / 2 + (c - 1)`, `n**3 / 2 + (c + 1)`, none of the above.

**Answer**

```text
1. A
2. A
3. A
```

### Q28 · FITB · 6 marks

Complete the function that prints `k` multiples of `n`.

```python
>>> print_multiples(3,4)
3
6
9
12
```

```python
def print_multiples(n,k):
    for i in range({{1}}):
        print({{2}})
```

**Answer**

```text
1. 1,k+1
2. n*i
```

### Q29 · FITB · 6 marks

Given a list of integers `L` without duplicates, return `True` if it is increasing.

```python
>>> print(check_increasing([1,2,3,5,6,7,10,12]))
True
>>> print(check_increasing([1,2,3,5,6,7,10,9,12]))
False
```

```python
def check_increasing(L):
    for i in {{1}}:
        if {{2}}:
            return False
    return True
```

**Answer**

```text
1. range(len(L)-1)
2. L[i] > L[i+1]
```

### Q30 · FITB · 6 marks

Given two strings of the same length in upper case, output `"Y"` where the characters match and `"N"` where they differ. You must use recursion.

```python
>>> print(check_same('EXPENSE',"EXPANDS"))
YYYNYNN
>>> print(check_same('UNION',"ONION"))
NYYYY
```

```python
def check_same(s1,s2):
    if s1 == '':
        return ''
    if {{1}}:
        return {{2}}
    else:
        return {{3}}
```

**Answer**

```text
1. s1[0] == s2[0]
2. 'Y' + check_same(s1[1:], s2[1:])
3. 'N' + check_same(s1[1:], s2[1:])
```

### Q31 · FITB · 6 marks

The same "is the list increasing?" test, but recursive. Note the function name is different from the previous question.

```python
def check_increasing_r(L):
    if not L:
        return True
    if {{1}}:
        return {{2}}
    else:
        return {{3}}
```

**Answer**

```text
1. min(L) == L[0]
2. check_increasing_r(L[1:])
3. False
```

### Q32 · FITB · 6 marks

Create a 2D `r x c` checkerboard of `'#'` and spaces, given `czm(r,c)` (the lecture's `create_zero_matrix`).

```python
>>> pprint(checker_board(5,7))
[['#', ' ', '#', ' ', '#', ' ', '#'],
 [' ', '#', ' ', '#', ' ', '#', ' '],
 ['#', ' ', '#', ' ', '#', ' ', '#']]
```

```python
def checker_board(r,c):
    output = czm(r,c)
    for i in {{1}}:
        for j in {{2}}:
            if {{3}}:
                output[i][j] = {{4}}
            else:
                output[i][j] = {{5}}
    return output
```

Write each character as a Python literal, e.g. `'#'` for the black square and `' '` for the white one.

**Answer**

```text
1. range(r)
2. range(c)
3. (i+j)%2==0
4. '#'
5. ' '
```

### Q33 · FITB · 6 marks

The binomial coefficient function from the assignment is very slow for large `n`. Make it faster with the technique from the lecture.

```python
{{1}}
def nCk(n,k):
    if {{2}}:
        return {{3}}
    if n == k or k == 0:
        return 1
    ans = nCk(n-1,k-1)+nCk(n-1,k)
    {{4}}
    return ans
```

**Answer**

```text
1. cache = {}
2. (n, k) in cache
3. cache[(n, k)]
4. cache[(n, k)] = ans
```

### Q34 · FITB · 8 marks

Given a deep list `seq` (lists of lists) without tuples, convert it into a deep tuple.

```python
>>> print(deep_convert([1,2,[3,4,[5,6],[7]]]))
(1, 2, (3, 4, (5, 6), (7,)))
```

```python
def deep_convert(seq):
    if {{1}}:
        return {{2}}
    elif type(seq) != list:
        return seq
    else:
        return {{3}}
```

**Answer**

```text
1. seq == []
2. tuple()
3. (deep_convert(seq[0]),) + deep_convert(seq[1:])
```

### Q35 · FITB · 8 marks

Given a tuple of `(name, mark)` pairs, write a one-line function that returns how many students scored at least `mark`.

```python
>>> data = (('Peter',90),('Mary',99),('Paul',65),('Jeff',75))
>>> print(higher_than(data,90))
2
>>> print(higher_than(data,74))
3
```

```python
def higher_than(data,mark):
    return {{1}}
```

**Answer**

```text
1. len(list(filter(lambda x: x[1] >= mark, data)))
```

---

## 6. FINAL ASSESSMENT (Semester 1 : AY 2025/26)

- **Date:** Semester 1, AY 2025/26
- **Duration:** 120 minutes
- **Total marks:** 100
- **Number of questions:** 29
- **Source:** `cs1010e_2526S1_final_exam_soln.pdf`

### Q1 · MCQ · 3 marks

What is printed by the following program?

```python
s = "ABCDEFG"
print(s[:2] + s[-1] * 3)
```

**Options**

- **A.** ABGGG
- **B.** ABCGGG
- **C.** ABGABGABG
- **D.** Causes TypeError
- **E.** Causes IndexError
- **F.** None of the other options is the correct answer

**Answer:** A — ABGGG

### Q2 · MCQ · 3 marks

What is printed by the following program?

```python
s = "ABCDEFGHIJ"
print(s[2:7][::-1])
```

**Options**

- **A.** GFEDC
- **B.** HGFEDC
- **C.** CDEFGJ
- **D.** G
- **E.** Causes IndexError
- **F.** None of the other options is the correct answer

**Answer:** A — GFEDC

### Q3 · MCQ · 3 marks

Given a string `s`, choose the conditional expression that evaluates to `"empty"` if `s` is an empty string, `"short"` if the length of `s` is less than 5, else `"long"`.

**Options**

- **A.** "empty" if len(s) == 0 else "short" if len(s) < 5 else "long"
- **B.** "short" if len(s) < 5 else ("empty" if s == "" else "long")
- **C.** "empty" if s == 0 else ("short" if len(s) < 5 else "long")
- **D.** "long" if len(s) >= 5 else "short"
- **E.** None of the other options is the correct answer

**Answer:** A — "empty" if len(s) == 0 else "short" if len(s) < 5 else "long"

### Q4 · MCQ · 3 marks

Which of the following options is equivalent to `f = lambda x: x * x + 1`?

**Options**

- **A.** def f(y): return y ** 2 + 1
- **B.** def f(x): return x ** x + 1
- **C.** def f(x): print(x * x + 1)
- **D.** def f(y): print(y ** 2 + 1)
- **E.** def f(x): x * x + 1
- **F.** None of the other options is the correct answer

**Answer:** A — def f(y): return y ** 2 + 1

### Q5 · MCQ · 3 marks

What is the result of evaluating the following program?

```python
from functools import reduce
reduce(lambda acc, x: acc + x, ["a", "b", "c"], "X")
```

**Options**

- **A.** 'Xabc'
- **B.** 'abc'
- **C.** 'abcX'
- **D.** 'Xcba'
- **E.** 'cbaX'
- **F.** None of the other options is the correct answer

**Answer:** A — 'Xabc'

### Q6 · MCQ · 3 marks

Given the following statement:

```python
L = [ (i, j) for i in range(3) for j in range(4) ]
```

What is the value of `L[2]`?

**Options**

- **A.** (0, 2)
- **B.** (2, 0)
- **C.** (2, 2)
- **D.** [(0, 2), (1, 2), (2, 2)]
- **E.** [(2, 0), (2, 1), (2, 2)]
- **F.** None of the other options is the correct answer

**Answer:** A — (0, 2)

### Q7 · MCQ · 3 marks

Given the following statement:

```python
LL = [ [ (i, j) for i in range(3) ] for j in range(4) ]
```

What is the value of `LL[2]`?

**Options**

- **A.** [(0, 2), (1, 2), (2, 2)]
- **B.** [(2, 0), (2, 1), (2, 2)]
- **C.** (2, 2)
- **D.** (2, 0)
- **E.** (0, 2)
- **F.** None of the other options is the correct answer

**Answer:** A — [(0, 2), (1, 2), (2, 2)]

### Q8 · MCQ · 3 marks

What is printed by the following program?

```python
def make_printer():
    msg = "start"
    def printer():
        print(msg, end=" ")
    msg = "updated"
    return printer

p = make_printer()
print("before", end=" ")
p()
msg = "global"
p()
```

**Options**

- **A.** before updated updated
- **B.** before start global
- **C.** before updated global
- **D.** before start start
- **E.** start before updated global
- **F.** None of the other options is the correct answer

**Answer:** A — before updated updated

### Q9 · MCQ · 3 marks

What is printed by the following program?

```python
def mysteryA(x, acc):
    acc.append(x)
    return acc

L = []
print(mysteryA(1, L), end=" ")
print(mysteryA(2, L), end=" ")
print(mysteryA(3, L))
```

**Options**

- **A.** [1] [1, 2] [1, 2, 3]
- **B.** [1] [2] [3]
- **C.** [] [] []
- **D.** [1] [2, 1] [3, 2, 1]
- **E.** Causes TypeError
- **F.** None of the other options is the correct answer

**Answer:** A — [1] [1, 2] [1, 2, 3]

### Q10 · MCQ · 3 marks

Consider the following `do_it` function:

```python
def do_it(L):
    for i in range(len(L)):
        L[i], L[len(L) - i - 1] = L[len(L) - i - 1], L[i]
```

Assume that `L` is a list, and suppose the following statements are executed:

```python
Lcopy = L.copy()
do_it(L)
```

Which of the following best describes the mutation on `L` performed by the `do_it` function?

**Options**

- **A.** L is unchanged with id(L[0]) == id(Lcopy[0])
- **B.** L is unchanged with id(L[0]) != id(Lcopy[0])
- **C.** L is reversed with id(L[0]) == id(Lcopy[-1])
- **D.** L is reversed with id(L[0]) != id(Lcopy[-1])
- **E.** Causes IndexError
- **F.** None of the other options is the correct answer

**Answer:** A — L is unchanged with id(L[0]) == id(Lcopy[0])

### Q11 · MCQ · 3 marks

What is the result of evaluating the following program?

```python
def mysteryB(T):
    if type(T) != tuple:
        return T if type(T) == int and T > 0 else 0
    return sum( mysteryB(elem) for elem in T )

mysteryB( ((1, -2), (3, (0, (4, -5))), "x") )
```

**Options**

- **A.** 8
- **B.** 1
- **C.** 7
- **D.** 4
- **E.** Causes TypeError
- **F.** None of the other options is the correct answer

**Answer:** A — 8

### Q12 · MCQ · 3 marks

Consider the following program:

```python
f = lambda a, b: lambda x: (a * x + a) % b
g = f(3, 7)

x = 0
while True:
    x = g(x)
```

Which of the following values will never be assigned to `x`?

**Options**

- **A.** 2
- **B.** 1
- **C.** 3
- **D.** 4
- **E.** 5
- **F.** 6

**Answer:** A — 2

### Q13 · MCQ · 3 marks

What is printed by the following program?

```python
def deep_tag(L):
    if not L:
        return ""
    if type(L[0]) == list:
        return "@" + deep_tag(L[0]) + deep_tag(L[1:])
    return "@" + L[0] + deep_tag(L[1:])

print( deep_tag( [["12", ["3"]], "456"] ) )
```

**Options**

- **A.** @@12@@3@456
- **B.** @12@3@456
- **C.** @@12@@3@@456
- **D.** @123456
- **E.** @@12@@3456
- **F.** None of the other options is the correct answer

**Answer:** A — @@12@@3@456

### Q14 · MCQ · 3 marks

Consider the following class definitions:

```python
class AA:
    pass

class BB(AA):
    pass

class CC(AA):
    pass

class DD(BB):
    pass
```

What is the result of the following evaluation?

```python
>>> aa, bb, cc, dd = AA(), BB(), CC(), DD()
>>> ( isinstance(aa, CC), isinstance(dd, AA),
      isinstance(dd, CC), isinstance(cc, BB) )
```

**Options**

- **A.** (False, True, False, False)
- **B.** (True, False, True, True)
- **C.** (True, False, False, False)
- **D.** (False, True, True, False)
- **E.** (False, True, False, True)
- **F.** (False, False, False, False)

**Answer:** A — (False, True, False, False)

### Q15 · MCQ · 3 marks

What is printed by the following program?

```python
class AA:
    def __init__(self):
        print("AA", end=" ")

class BB(AA):
    def __init__(self):
        super().__init__()
        print("BB", end=" ")
        self.aa = AA()

class CC(BB):
    def __init__(self):
        self.bb = BB()
        print("CC", end=" ")
        super().__init__()

aa, bb, cc = AA(), BB(), CC()
```

**Options**

- **A.** AA AA BB AA AA BB AA CC AA BB AA
- **B.** AA AA BB CC AA BB
- **C.** AA BB CC
- **D.** AA BB AA BB AA CC
- **E.** AA BB AA AA CC BB AA AA BB AA AA
- **F.** AA AA AA BB AA AA BB CC AA AA BB

**Answer:** A — AA AA BB AA AA BB AA CC AA BB AA

### Q16 · MCQ · 3 marks

The function `twoD_to_oneD` takes in a 2D array `M` and returns a new 1D array that is the "flattened" version of `M`. For example:

```python
>>> twoD_to_oneD([[3, 2, 1], [4, 5, 6]])
[3, 2, 1, 4, 5, 6]
```

Complete the definition by choosing the correct expression for the blank.

```python
def twoD_to_oneD(M):
    Mrows = len(M)
    Mcols = len(M[0])
    A = [0] * (Mrows * Mcols)
    for c in range(Mcols):
        for r in range(Mrows):
            A[ #_BLANK_# ] = M[r][c]
    return A
```

**Options**

- **A.** r * Mcols + c
- **B.** r * Mrows + c
- **C.** c * Mcols + r
- **D.** c * Mrows + r
- **E.** r + c
- **F.** r * c

**Answer:** A — r * Mcols + c

### Q17 · MCQ · 3 marks

The function `oneD_to_twoD` takes a 1D array `A` of length `R*C`, and two positive integers `R` and `C`, and returns a new 2D array of `R` rows and `C` columns, filled row by row. For example:

```python
>>> oneD_to_twoD([3, 2, 1, 4, 5, 6], 2, 3)
[[3, 2, 1],
 [4, 5, 6]]
```

Complete the definition by choosing the correct expression for the blank.

```python
def oneD_to_twoD(A, R, C):
    M = [[0] * C for r in range(R)]
    for i in range(len(A)):
        #_BLANK_# = A[i]
    return M
```

**Options**

- **A.** M[i // C][i % C]
- **B.** M[i // R][i % R]
- **C.** M[i // C][i % R]
- **D.** M[i // R][i % C]
- **E.** M[i % R][i // C]
- **F.** M[i % C][i // R]

**Answer:** A — M[i // C][i % C]

### Q18 · MCQ · 3 marks

`rotate_left` takes a matrix `M` and returns a new matrix that is `M` rotated 90 degrees counter-clockwise. For example:

```python
>>> rotate_left([[1, 2, 3],
                 [4, 5, 6]])
[[3, 6],
 [2, 5],
 [1, 4]]
```

Complete the definition by choosing the correct expression for the blank.

```python
def rotate_left(M):
    Mrows = len(M)
    Mcols = len(M[0])
    R = [ [ #_BLANK_#
           for j in range(Mrows) ]
         for i in range(Mcols) ]
    return R
```

**Options**

- **A.** M[j][Mcols - 1 - i]
- **B.** M[i][Mcols - 1 - j]
- **C.** M[j][i]
- **D.** M[i][j]
- **E.** M[Mrows - 1 - j][i]
- **F.** M[Mrows - 1 - i][j]

**Answer:** A — M[j][Mcols - 1 - i]

### Q19 · MCQ · 3 marks

Consider the following dictionary `D`:

```python
D = { 3: { 4: { 5: (50, 51)     },
           6: { 7: (70, 71, 72) } },
      8: (80, 81) }
```

Which of the following expressions evaluates to the integer `72`?

**Options**

- **A.** D[3][6][7][2]
- **B.** D[7][6][3][2]
- **C.** D[2][7][6][3]
- **D.** D[0][1][0][2]
- **E.** D[2][0][1][0]
- **F.** D[7][2]

**Answer:** A — D[3][6][7][2]

### Q20 · MCQ · 3 marks

Consider the following `binary_search` function:

```python
def binary_search(L, val):
    def search(low, high):
        if low > high:
            return False
        mid = (low + high) // 2
        print(mid, end=" ")      # added print() here
        if L[mid] == val:
            return True
        elif val < L[mid]:
            return search(low, mid - 1)
        else:
            return search(mid + 1, high)
    return search(0, len(L) - 1)
```

What is the sequence of values printed when the following is evaluated?

```python
>>> binary_search(list(range(31)), 11.5)
```

**Options**

- **A.** 15 7 11 13 12
- **B.** 15 7 11 9 10
- **C.** 15 23 27 25 24
- **D.** 15 14 13 12 11
- **E.** 15 0 14 1 13 2 12 3 11
- **F.** 15 13 11

**Answer:** A — 15 7 11 13 12

### Q21 · MCQ · 3 marks

Consider the following function:

```python
def do_what(x, L):
    if not L:
        return [x]
    elif x <= L[0]:
        return [x] + L
    else:
        return L[0:1] + do_what(x, L[1:])
```

What is the result of the following function call?

```python
>>> do_what(6, [5, 3, 2, 8, 7, 9])
```

**Options**

- **A.** [5, 3, 2, 6, 8, 7, 9]
- **B.** [6, 5, 3, 2, 8, 7, 9]
- **C.** [5, 3, 2, 8, 7, 9, 6]
- **D.** [5, 6, 3, 2, 8, 7, 9]
- **E.** [2, 3, 5, 6, 7, 8, 9]
- **F.** [9, 8, 7, 6, 5, 3, 2]

**Answer:** A — [5, 3, 2, 6, 8, 7, 9]

### Q22 · MCQ · 3 marks

Consider the following `merge` function:

```python
def merge(L1, L2):
    result = []
    while L1 and L2:
        if L1[0] < L2[0]:
            result.append(L1.pop(0))
        else:
            result.append(L2.pop(0))
    result.extend(L1)
    result.extend(L2)
    return result
```

What is the result of the following evaluation?

```python
>>> merge([5, 3, 7, 2], [6, 4, 8, 1])
```

**Options**

- **A.** [5, 3, 6, 4, 7, 2, 8, 1]
- **B.** [1, 2, 3, 4, 5, 6, 7, 8]
- **C.** [5, 3, 7, 2, 6, 4, 8, 1]
- **D.** [5, 3, 2, 6, 4, 1, 7, 8]
- **E.** [5, 6, 3, 4, 7, 8, 1, 2]
- **F.** [5, 6, 3, 4, 7, 8, 2, 1]

**Answer:** A — [5, 3, 6, 4, 7, 2, 8, 1]

### Q23 · MCQ · 3 marks

`intersect` takes two ascending-sorted lists and returns a new ascending-sorted list of the integers in both. For example:

```python
>>> intersect([2,4,6,8,9,10,14], [1,2,3,6,7,9,14,19])
[2, 6, 9, 14]
```

Complete the definition by choosing the correct expression for the blank.

```python
def intersect(L1, L2):
    if (not L1) or (not L2):
        return []
    elif L1[0] == L2[0]:
        return #_BLANK_#
    elif L1[0] < L2[0]:
        return intersect(L1[1:], L2)
    else:
        return intersect(L1, L2[1:])
```

**Options**

- **A.** [L1[0]] + intersect(L1[1:], L2[1:])
- **B.** [L1[0]] + [ intersect(L1[1:], L2[1:]) ]
- **C.** [ L1[0] + intersect(L1[1:], L2[1:]) ]
- **D.** intersect(L1[1:], L2[1:])
- **E.** [L1[0]] + intersect(L1, L2)
- **F.** [ L1[0]] + intersect(L1, L2) ]

**Answer:** A — [L1[0]] + intersect(L1[1:], L2[1:])

### Q24 · FITB · 5 marks

Given a string `s`, the following statement produces a tuple of the ASCII codes of only the uppercase letters in `s`, in order, using `map` and `filter` (no loops). Complete it.

```python
tuple( map(      {{1}}     , filter(      {{2}}     , s) ) )
```

For `s = "NUS-CS1010e"` the result is `(78, 85, 83, 67, 83)`.

Hint: `ord(x)` returns the ASCII code of a character `x`.

**Answer**

```text
1. ord
2. lambda x: "Z" >= x >= "A"
```

### Q25 · FITB · 5 marks

`flatten_tuple` takes a nested tuple `T` and returns a new, flat tuple. For example:

```python
>>> flatten_tuple( ((1, 2), 3, (4, (5,))) )
(1, 2, 3, 4, 5)
```

Complete the definition. You must not call any built-in functions or methods.

```python
def flatten_tuple(T):
    if not T:
        return      {{1}}     
    head, tail = T[0], T[1:]
    flat_head =      {{2}}      if type(head) == tuple else (head,)
    return      {{3}}
```

**Answer**

```text
1. ()
2. flatten_tuple(head)
3. flat_head + flatten_tuple(tail)
```

### Q26 · FITB · 6 marks

`remove_dup` returns a string with all consecutive duplicate characters removed. For example:

```python
>>> remove_dup("aaabccdddda")
'abcda'
```

Complete the definition. You must not call any built-in functions or methods.

```python
def remove_dup(S):
    if len(S) <= 1:
        return      {{1}}     
    elif S[0] == S[1]:
        return      {{2}}     
    else:
        return      {{3}}
```

**Answer**

```text
1. S
2. remove_dup(S[1:])
3. S[0] + remove_dup(S[1:])
```

### Q27 · FITB · 5 marks

`make_sorted_list` takes a dictionary of frequency counts for integers in `[1, N]` and returns an ascending-sorted list with those counts. For example:

```python
>>> N = 10
>>> D = {8: 1, 7: 3, 9: 2, 5: 1}
>>> make_sorted_list(D, N)
[5, 7, 7, 7, 8, 9, 9]
```

Complete the definition with a one-liner. You must not call any built-in functions or methods.

```python
def make_sorted_list(D, N):
    S = []
    for i in range(1, N + 1):
        if i in D:
            {{1}}     
    return S
```

**Answer**

```text
1. S += [i] * D[i]
```

### Q28 · FITB · 5 marks

`what_sort` returns a new list with the numbers of its input in ascending order. For example:

```python
>>> what_sort([8, 3, 9, 5, 2, 7, 6, 9, 1, 5])
[1, 2, 3, 5, 5, 6, 7, 8, 9, 9]
```

Complete it using `do_what`. You must not call any built-in functions or methods.

```python
def do_what(x, L):
    if not L:
        return [x]
    elif x <= L[0]:
        return [x] + L
    else:
        return L[0:1] + do_what(x, L[1:])

def what_sort(L):
    if not L:
        return []
    else:
        return do_what(      {{1}}     ,      {{2}}     )
```

**Answer**

```text
1. L[0]
2. what_sort(L[1:])
```

### Q29 · FITB · 5 marks

Given the following `list_op` function:

```python
def list_op(L):
    L = L.copy()
    for i in range(len(L) - 1, 0, -1):
        for j in range(i):
            L[j] = L[j] * 2
    return L
```

Rewrite the body as a single list comprehension. For example, `list_op([1, 2, 3])` gives `[4, 4, 3]`.

```python
def list_op(L):
    return [      {{1}}      for i in range(len(L)) ]
```

**Answer**

```text
1. L[i] * 2**(len(L) - i - 1)
```

