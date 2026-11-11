/* Lecture 3 — Sequences & iterables: lambda, tuples, slicing, strings,
   map / filter / reduce, range, higher-order functions */
practice([
  { id: 'L3-01', lec: 3, topic: 'Slicing', d: 1, type: 'out',
    t: 'Slice with a step',
    code: `
      t = (3, 8, 1, 9, 4, 7)
      print(t[1:5:2])`,
    ans: '(8, 9)',
    exp: 'Start at index 1, stop before index 5, step 2: indices 1 and 3, so `(8, 9)`.' },

  { id: 'L3-02', lec: 3, topic: 'Slicing', d: 1, type: 'out',
    t: 'Reverse slice with step -2',
    code: `
      t = (3, 8, 1, 9, 4, 7)
      print(t[::-2])`,
    ans: '(7, 9, 8)',
    exp: 'A negative step starts from the end: indices 5, 3, 1, which hold 7, 9 and 8.' },

  { id: 'L3-03', lec: 3, topic: 'Slicing', d: 2, type: 'out',
    t: 'Right-to-left slice',
    code: `
      t = (3, 8, 1, 9, 4, 7)
      print(t[4:1:-1])`,
    ans: '(4, 9, 1)',
    exp: 'Go from index 4 down to just before index 1: indices 4, 3, 2, which hold 4, 9 and 1.' },

  { id: 'L3-04', lec: 3, topic: 'Slicing', d: 2, type: 'mcq', run: true,
    t: 'Empty slice',
    q: 'What is printed?',
    code: `
      t = (3, 8, 1, 9, 4, 7)
      print(t[1:4:-1])`,
    opts: ['()', '(8, 1, 9)', '(9, 1, 8)', 'IndexError'],
    ans: 0,
    exp: 'With a negative step the slice moves right to left, but `start = 1` is already left of `stop = 4`, so nothing is selected. Slicing never raises `IndexError`.' },

  { id: 'L3-05', lec: 3, topic: 'Strings', d: 1, type: 'out',
    t: 'String slices',
    code: `
      s = 'programming'
      print(s[-3:] + s[:2])`,
    ans: 'ingpr',
    exp: '`s[-3:]` is the last three characters `ing`, and `s[:2]` is `pr`.' },

  { id: 'L3-06', lec: 3, topic: 'Tuples', d: 1, type: 'mcq', run: true,
    t: 'Tuple immutability',
    q: 'What happens?',
    code: `
      t = (1, 2, 3)
      t[0] = 9
      print(t)`,
    opts: ['TypeError', '(9, 2, 3)', 'IndexError', '(1, 2, 3)'],
    ans: 0,
    exp: 'Tuples are immutable: item assignment raises `TypeError: \'tuple\' object does not support item assignment`.' },

  { id: 'L3-07', lec: 3, topic: 'Tuples', d: 1, type: 'out',
    t: 'Joining tuples',
    code: `
      print((1, 2) * 2 + (3,))`,
    ans: '(1, 2, 1, 2, 3)',
    exp: '`*` binds tighter than `+`: `(1, 2) * 2 = (1, 2, 1, 2)`, then `(3,)` is appended.' },

  { id: 'L3-08', lec: 3, topic: 'Tuples', d: 2, type: 'mcq', run: true,
    t: '(5) versus (5,)',
    q: 'What is printed?',
    code: `
      x = (5)
      y = (5,)
      print(x * 2, y * 2)`,
    opts: ['10 (5, 5)', '(5, 5) (5, 5)', '10 10', '(10,) (5, 5)'],
    ans: 0,
    exp: 'Parentheses alone only group: `(5)` is the int `5`. The trailing comma is what makes `(5,)` a one-element tuple, and `* 2` repeats it.' },

  { id: 'L3-09', lec: 3, topic: 'Characters', d: 1, type: 'out',
    t: 'ord and chr',
    code: `
      print(chr(ord('a') + 3) + chr(ord('Z') - 1))`,
    ans: 'dY',
    exp: 'Three letters after `a` is `d`, and one letter before `Z` is `Y`.' },

  { id: 'L3-10', lec: 3, topic: 'Characters', d: 1, type: 'out',
    t: 'Digit characters',
    code: `
      print(ord('7') - ord('0') + int('7'))`,
    ans: '14',
    exp: 'The digit characters are consecutive in ASCII, so `ord(\'7\') - ord(\'0\') = 7`. Adding `int(\'7\') = 7` gives `14`.' },

  { id: 'L3-11', lec: 3, topic: 'Strings', d: 2, type: 'mcq', run: true,
    t: 'Lexicographic ordering',
    q: 'What is printed?',
    code: `
      print('Apple' < 'apple', '10' < '9', 10 < 9)`,
    opts: ['True True False', 'False True False', 'True False False', 'False False False'],
    ans: 0,
    exp: 'Uppercase letters come before lowercase in ASCII, so `\'A\' < \'a\'`. Strings are compared character by character, so `\'1\' < \'9\'` makes `\'10\' < \'9\'` true even though 10 > 9 as numbers.' },

  { id: 'L3-12', lec: 3, topic: 'map', d: 1, type: 'out',
    t: 'map with a lambda',
    code: `
      print(tuple(map(lambda x: x * x, range(1, 5))))`,
    ans: '(1, 4, 9, 16)',
    exp: '`range(1, 5)` gives 1, 2, 3, 4 and each is squared.' },

  { id: 'L3-13', lec: 3, topic: 'filter', d: 1, type: 'mcq', run: true, optCode: true,
    t: 'filter over a string',
    q: 'What is printed?',
    code: `
      print(tuple(filter(lambda c: c in 'aeiou', 'education')))`,
    opts: ["('e', 'u', 'a', 'i', 'o')", "('a', 'e', 'i', 'o', 'u')", "'euaio'", "('d', 'c', 't', 'n')"],
    ans: 0,
    exp: 'A string is iterable character by character. `filter` keeps the vowels **in their original order**: e, u, a, i, o. The result is a tuple of one-character strings.' },

  { id: 'L3-14', lec: 3, topic: 'reduce', d: 2, type: 'out',
    t: 'reduce building a number',
    code: `
      from functools import reduce
      print(reduce(lambda acc, x: acc * 10 + x, (3, 0, 7), 0))`,
    ans: '307',
    exp: 'Start with `0`: `0*10 + 3 = 3`, then `3*10 + 0 = 30`, then `30*10 + 7 = 307`.' },

  { id: 'L3-15', lec: 3, topic: 'reduce', d: 2, type: 'out',
    t: 'reduce is left to right',
    code: `
      from functools import reduce
      print(reduce(lambda x, y: x - y, (10, 3, 2, 1)))`,
    ans: '4',
    exp: 'With no initializer the first element is the start: `((10 - 3) - 2) - 1 = 4`.' },

  { id: 'L3-16', lec: 3, topic: 'reduce', d: 2, type: 'mcq', run: true,
    t: 'reduce that reverses',
    q: 'What is printed?',
    code: `
      from functools import reduce
      print(reduce(lambda a, b: b + a, 'abc', ''))`,
    opts: ['cba', 'abc', 'bca', 'cab'],
    ans: 0,
    exp: 'Each new character goes **in front** of the accumulator: `\'\'` → `a` → `ba` → `cba`.' },

  { id: 'L3-17', lec: 3, topic: 'reduce', d: 3, type: 'mcq', run: true,
    t: 'reduce on an empty tuple',
    q: 'What happens?',
    code: `
      from functools import reduce
      print(reduce(lambda x, y: x + y, ()))`,
    opts: ['TypeError', '0', '()', 'None'],
    ans: 0,
    exp: 'With no initializer `reduce` needs at least one element to start from, so an empty sequence raises `TypeError`. Passing an initializer, e.g. `reduce(f, (), 0)`, returns `0`.' },

  { id: 'L3-18', lec: 3, topic: 'range', d: 1, type: 'out',
    t: 'Counting down with range',
    code: `
      print(tuple(range(10, 0, -3)))`,
    ans: '(10, 7, 4, 1)',
    exp: 'Start at 10 and step by -3 while staying above 0 (the stop is excluded): 10, 7, 4, 1.' },

  { id: 'L3-19', lec: 3, topic: 'range', d: 1, type: 'out',
    t: 'Length of a range',
    code: `
      print(len(range(3, 20, 4)))`,
    ans: '5',
    exp: 'The values are 3, 7, 11, 15, 19, so there are 5.' },

  { id: 'L3-20', lec: 3, topic: 'Higher-order functions', d: 2, type: 'mcq', run: true,
    t: 'twice of twice',
    q: 'What is printed?',
    code: `
      def twice(f):
          return lambda x: f(f(x))

      inc = lambda x: x + 3
      print(twice(twice(inc))(1))`,
    opts: ['13', '7', '10', '25'],
    ans: 0,
    exp: '`twice(inc)` adds 3 twice, i.e. adds 6. `twice` of **that** adds 6 twice, i.e. 12. So `1 + 12 = 13`.' },

  { id: 'L3-21', lec: 3, topic: 'Higher-order functions', d: 2, type: 'out',
    t: 'Function composition',
    code: `
      def compose(f, g):
          return lambda x: f(g(x))

      h = compose(lambda x: x * 2, lambda x: x + 1)
      print(h(5), compose(h, h)(0))`,
    ans: '12 6',
    exp: '`h(x) = (x + 1) * 2`, so `h(5) = 12`. `compose(h, h)(0) = h(h(0)) = h(2) = 6`.' },

  { id: 'L3-22', lec: 3, topic: 'Higher-order functions', d: 2, type: 'fib',
    t: 'Polynomial as a function',
    q: '`poly(p)` takes coefficients from the lowest power upwards and returns the polynomial as a function, e.g. `poly((3, -8, -2, 4))(-2)` gives `-21`. Complete it.',
    code: `
      def poly(p):
          return lambda x: sum({{1}} for i in range(len(p)))`,
    blanks: [['p[i] * x ** i', 'x ** i * p[i]', 'p[i] * (x ** i)', 'p[i] * x**i']],
    test: 'assert poly((3, -8, -2, 4))(-2) == -21\nassert poly((5,))(9) == 5',
    exp: 'Coefficient `p[i]` belongs to `x ** i`, so each term is `p[i] * x ** i` and the generator sums them.' },

  { id: 'L3-23', lec: 3, topic: 'filter', d: 2, type: 'fib',
    t: 'Count uppercase with filter',
    q: 'Complete `count_upper(s)`, which returns how many uppercase letters `s` has, e.g. `count_upper(\'Hello NUS\')` is `4`.',
    code: `
      def count_upper(s):
          return len(tuple(filter({{1}}, s)))`,
    blanks: [["lambda c: 'A' <= c <= 'Z'", "lambda c: c >= 'A' and c <= 'Z'", 'lambda c: c.isupper()',
              "lambda x: 'A' <= x <= 'Z'", "lambda x: x >= 'A' and x <= 'Z'", 'lambda x: x.isupper()',
              "lambda c: 'Z' >= c >= 'A'", "lambda x: 'Z' >= x >= 'A'"]],
    test: "assert count_upper('Hello NUS') == 4\nassert count_upper('abc') == 0",
    exp: '`filter` needs a function that returns `True` for the characters to keep. A chained comparison against `\'A\'` and `\'Z\'` keeps exactly the uppercase letters.' },

  { id: 'L3-24', lec: 3, topic: 'map', d: 2, type: 'fib',
    t: 'π series with map',
    q: 'Complete `p(n)`, the sum of the first `n` terms of 4/1 − 4/3 + 4/5 − …, i.e. term `i` is 4·(−1)^(i−1) / (2i − 1).',
    code: `
      def p(n):
          return sum(map({{1}}, range(1, n + 1)))`,
    blanks: [['lambda i: 4 * (-1) ** (i - 1) / (2 * i - 1)', 'lambda i: 4*(-1)**(i-1)/(2*i-1)',
              'lambda x: 4 * (-1) ** (x - 1) / (2 * x - 1)']],
    test: 'assert p(1) == 4\nassert abs(p(2) - 2.666666666666667) < 1e-12',
    exp: '`map` needs a one-argument function that turns the term number `i` into the term value. The `(-1) ** (i - 1)` factor makes the signs alternate.' },

  { id: 'L3-25', lec: 3, topic: 'range', d: 2, type: 'mcq',
    t: 'Which gives (0, 2, 4, 6)?',
    q: 'Which expression evaluates to `(0, 2, 4, 6)`?',
    opts: ['tuple(range(0, 7, 2))', 'tuple(range(0, 6, 2))', 'tuple(i * 2 for i in range(3))', 'tuple(filter(lambda x: x % 2, range(7)))'],
    optCode: true,
    ans: 0,
    verify: 'assert tuple(range(0, 7, 2)) == (0, 2, 4, 6)\nassert tuple(range(0, 6, 2)) != (0, 2, 4, 6)\nassert tuple(i * 2 for i in range(3)) != (0, 2, 4, 6)\nassert tuple(filter(lambda x: x % 2, range(7))) != (0, 2, 4, 6)',
    exp: 'The stop value is excluded, so it must be past 6. `range(0, 6, 2)` and `i * 2 for i in range(3)` both stop at 4, and `x % 2` is truthy for **odd** numbers.' },

  { id: 'L3-26', lec: 3, topic: 'Generator expressions', d: 2, type: 'out',
    t: 'Differences of neighbours',
    code: `
      t = (4, 7, 2, 9)
      print(tuple(t[i] - t[i - 1] for i in range(1, len(t))))`,
    ans: '(3, -5, 7)',
    exp: 'For i = 1, 2, 3 this computes 7−4, 2−7 and 9−2.' },

  { id: 'L3-27', lec: 3, topic: 'Membership', d: 2, type: 'mcq', run: true,
    t: 'in for strings and tuples',
    q: 'What is printed?',
    code: `
      print('101' in 'cs1010e', (1, 0) in (1, 0, 1))`,
    opts: ['True False', 'True True', 'False False', 'False True'],
    ans: 0,
    exp: 'For strings, `in` checks for a **substring**. For tuples, `in` checks whether one **element** equals the value. No element of `(1, 0, 1)` is the tuple `(1, 0)`.' },

  { id: 'L3-28', lec: 3, topic: 'Higher-order functions', d: 2, type: 'mcq', run: true,
    t: 'Functions that build functions',
    q: 'What is printed?',
    code: `
      def adder(n):
          return lambda x: x + n

      fs = tuple(map(adder, (1, 2, 3)))
      print(fs[2](10))`,
    opts: ['13', '11', '12', '16'],
    ans: 0,
    exp: '`fs` holds `adder(1)`, `adder(2)` and `adder(3)`. `fs[2]` is `adder(3)`, which adds 3 to its argument: `10 + 3 = 13`.' },

  { id: 'L3-29', lec: 3, topic: 'Strings', d: 1, type: 'out',
    t: 'String repetition and reversal',
    code: `
      s = 'NUS'
      print(s * 2 + s[::-1])`,
    ans: 'NUSNUSSUN',
    exp: '`s * 2` is `NUSNUS`, and `s[::-1]` reverses it to `SUN`.' },

  { id: 'L3-30', lec: 3, topic: 'Iterators', d: 3, type: 'mcq', run: true,
    t: 'An exhausted map',
    q: 'What is printed?',
    code: `
      m = map(lambda x: x + 1, (1, 2, 3))
      print(tuple(m), tuple(m))`,
    opts: ['(2, 3, 4) ()', '(2, 3, 4) (2, 3, 4)', '(2, 3, 4) (3, 4, 5)', '() ()'],
    ans: 0,
    exp: '`map` returns an **iterator**, which can be consumed only once. The first `tuple(m)` uses up every value, so the second one is empty.' },

  { id: 'L3-31', lec: 3, topic: 'Generator expressions', d: 3, type: 'out',
    t: 'Two for-clauses',
    code: `
      print(tuple(i * j for i in range(1, 4) for j in range(i)))`,
    ans: '(0, 0, 2, 0, 3, 6)',
    exp: 'The first `for` is the outer loop. i=1: j=0 gives 0. i=2: j=0,1 gives 0, 2. i=3: j=0,1,2 gives 0, 3, 6.' },

  { id: 'L3-32', lec: 3, topic: 'reduce', d: 2, type: 'fib',
    t: 'Length with reduce',
    q: 'Complete `length(t)` so it returns the number of elements in `t` using only `reduce`.',
    code: `
      from functools import reduce

      def length(t):
          return reduce({{1}}, t, 0)`,
    blanks: [['lambda acc, x: acc + 1', 'lambda x, y: x + 1', 'lambda a, b: a + 1']],
    test: 'assert length((5, 6, 7)) == 3\nassert length(()) == 0\nassert length("hello") == 5',
    exp: 'The accumulator starts at `0` and goes up by one per element, ignoring the element itself. Just like the lecture\'s `reduce(lambda x, y: x + 1, …, 0)`.' },

  { id: 'L3-33', lec: 3, topic: 'Lambda', d: 1, type: 'mcq',
    t: 'Equivalent lambda',
    q: 'Which definition behaves exactly like `f = lambda x, y: x * y + 1`?',
    optCode: true,
    opts: ['def f(a, b):\n    return a * b + 1', 'def f(x, y):\n    print(x * y + 1)', 'def f(x, y):\n    x * y + 1', 'def f(x):\n    return x * x + 1'],
    ans: 0,
    exp: 'Parameter names do not matter, only their positions. A lambda **returns** its expression. Printing it, or writing the expression without `return`, makes the function return `None`.' },

  { id: 'L3-34', lec: 3, topic: 'Slicing', d: 3, type: 'out',
    t: 'Slices of slices',
    code: `
      s = 'ABCDEFGHIJ'
      print(s[8:2:-2][::-1])`,
    ans: 'EGI',
    exp: '`s[8:2:-2]` takes indices 8, 6, 4, which hold `I`, `G` and `E`. Reversing gives `EGI`.' },

  { id: 'L3-35', lec: 3, topic: 'map', d: 3, type: 'out',
    t: 'map over two sequences',
    q: 'Hint: when `map` is given two iterables, it calls the function with one element from each and stops at the shorter one.',
    code: `
      print(tuple(map(lambda a, b: a * b, (1, 2, 3), (4, 5))))`,
    ans: '(4, 10)',
    exp: 'The pairs are `(1, 4)` and `(2, 5)`. The third element of the first tuple has no partner, so `map` stops there.' },

  { id: 'L3-36', lec: 3, topic: 'Strings', d: 1, type: 'out',
    t: 'Indexing into a tuple of strings',
    code: `
      print(('abc', 'de')[1][::-1] * 2)`,
    ans: 'eded',
    exp: '`(\'abc\', \'de\')[1]` is `\'de\'`. Reversed it is `\'ed\'`, and `* 2` repeats it.' },

  { id: 'L3-37', lec: 3, topic: 'Lambda', d: 3, type: 'mcq', run: true,
    t: 'Lambdas built in a loop',
    q: 'What is printed?',
    code: `
      fs = [lambda x: x + i for i in range(3)]
      print(fs[0](10), fs[2](10))`,
    opts: ['12 12', '10 12', '10 10', '11 13'],
    ans: 0,
    exp: 'Each lambda looks up `i` **when it is called**, not when it is created. By then the comprehension has finished and `i` is 2 for every one of them, so all three add 2.' },

  { id: 'L3-38', lec: 3, topic: 'Higher-order functions', d: 2, type: 'out',
    t: 'Passing a function to a lambda',
    code: `
      print((lambda f, x: f(f(x)))(lambda y: y * 3, 2))`,
    ans: '18',
    exp: 'The outer lambda applies `f` twice: `f(2) = 6`, then `f(6) = 18`.' },

  { id: 'L3-39', lec: 3, topic: 'reduce', d: 2, type: 'out',
    t: 'reduce as max',
    code: `
      from functools import reduce
      print(reduce(lambda a, b: a if a > b else b, (3, 9, 2, 7)))`,
    ans: '9',
    exp: 'The accumulator keeps the larger of itself and each new element: 3 → 9 → 9 → 9.' },

  { id: 'L3-40', lec: 3, topic: 'reduce', d: 2, type: 'out',
    t: 'reduce building a tuple',
    code: `
      from functools import reduce
      print(reduce(lambda acc, x: acc + (x * 2,), (1, 2, 3), ()))`,
    ans: '(2, 4, 6)',
    exp: 'Starting from the empty tuple, each step concatenates a one-element tuple `(x * 2,)`. The comma matters: `(x * 2)` would just be an int, and `tuple + int` is an error.' },

  { id: 'L3-41', lec: 3, topic: 'map / filter', d: 2, type: 'mcq', run: true,
    t: 'map over a filter',
    q: 'What is printed?',
    code: `
      print(tuple(map(lambda x: x % 3,
                      filter(lambda x: x % 2, range(10)))))`,
    opts: ['(1, 0, 2, 1, 0)', '(0, 2, 1, 0, 2)', '(1, 2, 0, 1, 2)', '(0, 1, 2, 0, 1)'],
    ans: 0,
    exp: 'The filter keeps the odd numbers 1, 3, 5, 7, 9 (where `x % 2` is 1, which is truthy). Taking each mod 3 gives 1, 0, 2, 1, 0.' },

  { id: 'L3-42', lec: 3, topic: 'Slicing', d: 2, type: 'out',
    t: 'Two string slices',
    code: `
      s = 'HelloWorld'
      print(s[::3], s[-1:-4:-1])`,
    ans: 'Hlod dlr',
    exp: '`s[::3]` takes indices 0, 3, 6, 9: H, l, o, d. `s[-1:-4:-1]` takes the last three characters backwards: d, l, r.' },

  { id: 'L3-43', lec: 3, topic: 'Characters', d: 3, type: 'fib',
    t: 'Caesar shift with reduce',
    q: 'Complete `shift(s, k)`, which moves every lowercase letter of `s` forward by `k` places and wraps around after `z`. For example, `shift(\'xyz\', 2)` is `\'zab\'`.',
    code: `
      from functools import reduce

      def shift(s, k):
          return reduce(lambda acc, c: acc + {{1}}, s, '')`,
    blanks: [["chr((ord(c) - ord('a') + k) % 26 + ord('a'))", "chr(ord('a') + (ord(c) - ord('a') + k) % 26)",
              'chr((ord(c) - 97 + k) % 26 + 97)']],
    test: "assert shift('xyz', 2) == 'zab'\nassert shift('abc', 0) == 'abc'\nassert shift('hello', 13) == 'uryyb'",
    exp: 'Convert the letter to a position 0–25 (`ord(c) - ord(\'a\')`), add `k`, wrap with `% 26`, then convert back with `chr(... + ord(\'a\'))`.' },

  { id: 'L3-44', lec: 3, topic: 'Higher-order functions', d: 2, type: 'out',
    t: 'Currying',
    code: `
      def curry(f):
          return lambda x: lambda y: f(x, y)

      sub = curry(lambda a, b: a - b)
      print(sub(10)(3), sub(3)(10))`,
    ans: '7 -7',
    exp: '`sub(10)` fixes `a = 10` and returns a function waiting for `b`. Calling it with 3 gives 10 − 3.' },

  { id: 'L3-45', lec: 3, topic: 'Strings', d: 2, type: 'mcq', run: true,
    t: 'max and min of strings',
    q: 'What is printed?',
    code: `
      print(max('apple', 'Banana', 'cherry'),
            min('10', '9', '100'))`,
    opts: ['cherry 10', 'Banana 9', 'cherry 9', 'Banana 10'],
    ans: 0,
    exp: 'Strings are compared character by character in ASCII order. Lowercase letters come after uppercase, so `cherry` is the largest. For the min, `\'10\'` is a prefix of `\'100\'`, so it is smaller, and `\'1\' < \'9\'`.' },

  { id: 'L3-46', lec: 3, topic: 'Higher-order functions', d: 3, type: 'fib',
    t: 'Repeat a function n times',
    q: 'Complete `repeat(f, n)`, which returns a function that applies `f` exactly `n` times, e.g. `repeat(lambda x: x * 2, 3)(1)` is `8`.',
    code: `
      def repeat(f, n):
          if n == 0:
              return lambda x: x
          return lambda x: {{1}}`,
    blanks: [['f(repeat(f, n - 1)(x))', 'repeat(f, n - 1)(f(x))']],
    test: 'assert repeat(lambda x: x * 2, 3)(1) == 8\nassert repeat(lambda x: x + 1, 0)(5) == 5\nassert repeat(lambda s: s + "a", 2)("") == "aa"',
    exp: 'Applying `f` n times is applying it once to the result of applying it n − 1 times. With n = 0 you get the identity function.' },

  { id: 'L3-47', lec: 3, topic: 'map / filter', d: 2, type: 'fib',
    t: 'Squares of the odd numbers',
    q: 'Complete the one-liner so that `odd_squares((1, 2, 3, 4, 5))` is `(1, 9, 25)`. Use only `map`, `filter` and lambdas.',
    code: `
      def odd_squares(t):
          return tuple(map({{1}}, filter({{2}}, t)))`,
    blanks: [['lambda x: x * x', 'lambda x: x ** 2', 'lambda x: x**2'],
             ['lambda x: x % 2 == 1', 'lambda x: x % 2', 'lambda x: x % 2 != 0']],
    test: 'assert odd_squares((1, 2, 3, 4, 5)) == (1, 9, 25)\nassert odd_squares((2, 4)) == ()',
    exp: '`filter` runs first (it is the inner call) and keeps the odd numbers. Then `map` squares them. `x % 2` alone works as a filter because 1 is truthy and 0 is falsy.' },

  { id: 'L3-48', lec: 3, topic: 'reduce', d: 1, type: 'fib',
    t: 'Product with reduce',
    q: 'Complete `product(t)` so that `product((2, 3, 4))` is `24` and `product(())` is `1`.',
    code: `
      from functools import reduce

      def product(t):
          return reduce({{1}}, t, {{2}})`,
    blanks: [['lambda a, b: a * b', 'lambda x, y: x * y', 'lambda acc, x: acc * x'], ['1']],
    test: 'assert product((2, 3, 4)) == 24\nassert product(()) == 1\nassert product((5,)) == 5',
    exp: 'The initializer must be the identity for multiplication, which is 1, not 0. It also makes the empty tuple safe instead of raising `TypeError`.' },

  { id: 'L3-49', lec: 3, topic: 'Slicing', d: 2, type: 'fib',
    t: 'Rotate a tuple left',
    q: 'Complete `rotate(t, k)` for a non-empty tuple, e.g. `rotate((1, 2, 3, 4, 5), 2)` is `(3, 4, 5, 1, 2)`. `k` may be larger than `len(t)`.',
    code: `
      def rotate(t, k):
          k = k % len(t)
          return {{1}}`,
    blanks: [['t[k:] + t[:k]']],
    test: 'assert rotate((1, 2, 3, 4, 5), 2) == (3, 4, 5, 1, 2)\nassert rotate((1, 2, 3), 4) == (2, 3, 1)\nassert rotate((7,), 9) == (7,)',
    exp: 'Everything from position `k` onwards moves to the front, followed by the first `k` elements. `k % len(t)` handles rotating by more than the length.' },

  { id: 'L3-50', lec: 3, topic: 'Lambda', d: 1, type: 'fib',
    t: 'Palindrome as a lambda',
    q: 'Complete the lambda so that `is_pal(\'level\')` is `True` and `is_pal(\'lever\')` is `False`.',
    code: `
      is_pal = lambda s: {{1}}`,
    blanks: [['s == s[::-1]', 's[::-1] == s']],
    test: "assert is_pal('level') and is_pal('') and is_pal('a')\nassert not is_pal('lever')",
    exp: 'A palindrome equals its own reverse, and `[::-1]` reverses any sequence.' },

  { id: 'L3-51', lec: 3, topic: 'Higher-order functions', d: 3, type: 'fib',
    t: 'A pipeline of functions',
    q: '`pipeline(fs)` returns a function that applies the functions in `fs` **in order**, e.g. `pipeline((lambda x: x + 1, lambda x: x * 2))(3)` is `8`. Complete it.',
    code: `
      from functools import reduce

      def pipeline(fs):
          return lambda x: reduce(lambda acc, f: {{1}}, fs, x)`,
    blanks: [['f(acc)']],
    test: 'assert pipeline((lambda x: x + 1, lambda x: x * 2))(3) == 8\nassert pipeline((lambda x: x * 2, lambda x: x + 1))(3) == 7\nassert pipeline(())(5) == 5',
    exp: 'Here `reduce` walks over **functions**, and the accumulator is the value so far. Each step feeds that value into the next function, so `acc(f)` would be backwards. The empty pipeline returns `x` unchanged.' },

  { id: 'L3-52', lec: 3, topic: 'Characters', d: 2, type: 'fib',
    t: 'Letters to alphabet positions',
    q: 'Complete `positions` so that `positions(\'cab\')` is `(3, 1, 2)`. All letters are lowercase.',
    code: `
      positions = lambda s: tuple(map(lambda c: {{1}}, s))`,
    blanks: [["ord(c) - ord('a') + 1", "ord(c) - 96", "1 + ord(c) - ord('a')"]],
    test: "assert positions('cab') == (3, 1, 2)\nassert positions('z') == (26,)",
    exp: '`ord(c) - ord(\'a\')` counts from 0 for `a`, so add 1 to number the letters from 1.' },

  { id: 'L3-53', lec: 3, topic: 'Generator expressions', d: 3, type: 'fib',
    t: 'Interleave two tuples',
    q: 'Complete `interleave(a, b)` for equal-length tuples, e.g. `interleave((1, 2), (3, 4))` is `(1, 3, 2, 4)`.',
    code: `
      def interleave(a, b):
          return tuple(x for i in range(len(a))
                         for x in {{1}})`,
    blanks: [['(a[i], b[i])', '[a[i], b[i]]', 'a[i:i + 1] + b[i:i + 1]']],
    test: 'assert interleave((1, 2), (3, 4)) == (1, 3, 2, 4)\nassert interleave((), ()) == ()',
    exp: 'For each index, the inner `for` walks a little pair holding `a[i]` then `b[i]`, so they come out alternately.' },

  { id: 'L3-54', lec: 3, topic: 'Slicing', d: 2, type: 'out',
    t: 'Forward and backward steps',
    code: `
      s = 'python'
      print(s[1::2], s[::-2])`,
    ans: 'yhn nhy',
    exp: '`s[1::2]` takes indices 1, 3, 5: y, h, n. `s[::-2]` starts from the end and takes indices 5, 3, 1: n, h, y.' },

  { id: 'L3-55', lec: 3, topic: 'Higher-order functions', d: 2, type: 'out',
    t: 'Functions made by map',
    code: `
      def make(n):
          return lambda x: x * n

      fs = tuple(map(make, range(1, 4)))
      print(tuple(f(10) for f in fs))`,
    ans: '(10, 20, 30)',
    exp: 'Each call to `make` has its own parameter `n`, so every lambda keeps a different value (1, 2, 3). This contrasts with lambdas built in a loop, which all share one loop variable.' },

  { id: 'L3-56', lec: 3, topic: 'Slicing', d: 2, type: 'mcq', run: true,
    t: 'Out-of-range slices',
    q: 'What is printed?',
    code: `
      t = (1, 2, 3)
      print(t[5:], t[-10:2])`,
    opts: ['() (1, 2)', 'IndexError', '() (1, 2, 3)', '(3,) (1, 2)'],
    ans: 0,
    exp: 'Slices clip their bounds to the sequence and never raise errors. A start past the end gives an empty tuple, and `-10` is treated as the beginning. Only **indexing** past the end, as in `t[5]`, raises `IndexError`.' },

  { id: 'L3-57', lec: 3, topic: 'reduce', d: 3, type: 'out',
    t: 'reduce with a pair accumulator',
    code: `
      from functools import reduce
      s, n = reduce(lambda acc, x: (acc[0] + x, acc[1] + 1),
                    (4, 8, 6), (0, 0))
      print(s / n)`,
    ans: '6.0',
    exp: 'The accumulator is a (sum, count) pair: (4, 1) → (12, 2) → (18, 3). Then 18 / 3 = 6.0, a float because `/` was used.' },

  { id: 'L3-58', lec: 3, topic: 'Strings', d: 2, type: 'mcq', run: true,
    t: 'Chained string comparisons',
    q: 'What is printed?',
    code: `
      print('abc' < 'abd' < 'ab', 'Z' < 'a' < 'z')`,
    opts: ['False True', 'True True', 'True False', 'False False'],
    ans: 0,
    exp: 'A chain means **both** comparisons must hold. `\'abd\' < \'ab\'` is false because a prefix is smaller than the longer string. In ASCII every uppercase letter comes before every lowercase one, so `\'Z\' < \'a\'`.' }
]);
