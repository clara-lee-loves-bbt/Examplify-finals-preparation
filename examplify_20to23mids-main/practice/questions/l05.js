/* Lecture 5 — Recursion: base / recursive case, winding and unwinding,
   call stack, Fibonacci, parking, Towers of Hanoi */
practice([
  { id: 'L5-01', lec: 5, topic: 'Recursion', d: 1, type: 'out',
    t: 'Recursive digit sum',
    code: `
      def f(n):
          if n == 0:
              return 0
          return n % 10 + f(n // 10)

      print(f(4096))`,
    ans: '19',
    exp: '4 + 0 + 9 + 6 = 19. Each call peels off the last digit.' },

  { id: 'L5-02', lec: 5, topic: 'Recursion', d: 2, type: 'out',
    t: 'Fibonacci-like recurrence',
    code: `
      def g(n):
          if n <= 1:
              return 1
          return g(n - 1) + g(n - 2) + 1

      print(g(4))`,
    ans: '9',
    exp: 'Build up from the bottom: g(0) = g(1) = 1, g(2) = 3, g(3) = 5, g(4) = 5 + 3 + 1 = 9.' },

  { id: 'L5-03', lec: 5, topic: 'Winding / unwinding', d: 2, type: 'out',
    t: 'Printing on the way in and out',
    code: `
      def r(n):
          if n > 0:
              print(n, end=' ')
              r(n - 1)
              print(n, end=' ')

      r(3)`,
    ans: '3 2 1 1 2 3',
    exp: 'The first `print` runs while winding (3, 2, 1). The second runs while unwinding, after each recursive call returns (1, 2, 3).' },

  { id: 'L5-04', lec: 5, topic: 'Base case', d: 1, type: 'mcq', run: true,
    t: 'Missing base case',
    q: 'What happens?',
    code: `
      def fact(n):
          return n * fact(n - 1)

      print(fact(3))`,
    opts: ['RecursionError', '6', '0', 'None'],
    ans: 0,
    exp: 'With no base case, the recursion never stops (3, 2, 1, 0, -1, …) until Python\'s call-stack limit is hit, which raises `RecursionError`.' },

  { id: 'L5-05', lec: 5, topic: 'Recursion', d: 1, type: 'out',
    t: 'Recursive string reverse',
    code: `
      def p(s):
          if len(s) <= 1:
              return s
          return p(s[1:]) + s[0]

      print(p('stack'))`,
    ans: 'kcats',
    exp: 'Reverse the tail and put the first character at the end.' },

  { id: 'L5-06', lec: 5, topic: 'Recursion', d: 2, type: 'out',
    t: 'Fast power',
    code: `
      def pw(b, e):
          if e == 0:
              return 1
          h = pw(b, e // 2)
          return h * h if e % 2 == 0 else h * h * b

      print(pw(3, 5))`,
    ans: '243',
    exp: '3^5 = 243. The exponent is halved at each step: pw(3,0) = 1, pw(3,1) = 3, pw(3,2) = 9, and pw(3,5) = 9·9·3.' },

  { id: 'L5-07', lec: 5, topic: 'Call stack', d: 2, type: 'mcq',
    t: 'Counting calls of fast power',
    q: 'Using `pw` from the code below, how many times is `pw` called in total (including the first call) to evaluate `pw(3, 5)`?',
    code: `
      def pw(b, e):
          if e == 0:
              return 1
          h = pw(b, e // 2)
          return h * h if e % 2 == 0 else h * h * b`,
    opts: ['4', '5', '6', '3'],
    ans: 0,
    verify: 'calls = [0]\ndef pw(b, e):\n    calls[0] += 1\n    if e == 0:\n        return 1\n    h = pw(b, e // 2)\n    return h * h if e % 2 == 0 else h * h * b\nassert pw(3, 5) == 243\nassert calls[0] == 4, calls[0]',
    exp: 'The calls are pw(3,5) → pw(3,2) → pw(3,1) → pw(3,0), so 4 in total. Each call makes **one** recursive call, which is why this is so much faster than multiplying 5 times.' },

  { id: 'L5-08', lec: 5, topic: 'Fibonacci', d: 3, type: 'out',
    t: 'Size of the recursion tree',
    q: 'How many times is `fib` called (including the first call) when evaluating `fib(5)`? Type a number.',
    code: `
      def fib(k):
          if k <= 1:
              return k
          return fib(k - 1) + fib(k - 2)`,
    ans: '15',
    verify: 'calls = [0]\ndef fib(k):\n    calls[0] += 1\n    if k <= 1:\n        return k\n    return fib(k - 1) + fib(k - 2)\nfib(5)\nassert calls[0] == 15, calls[0]',
    exp: 'calls(k) = 1 + calls(k−1) + calls(k−2) with calls(0) = calls(1) = 1, giving 1, 1, 3, 5, 9, 15. This exponential blow-up is what memoisation fixes (Lecture 8).' },

  { id: 'L5-09', lec: 5, topic: 'Parking problem', d: 2, type: 'out',
    t: 'Counting parking arrangements',
    q: 'A car takes 1 lot and a bus takes 2. In how many ways can 6 consecutive lots be filled exactly? Type a number.',
    ans: '13',
    verify: 'def ways(n):\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 2)\nassert ways(4) == 5\nassert ways(6) == 13',
    exp: 'The last vehicle is either a car (leaving n−1 lots) or a bus (leaving n−2), so ways(n) = ways(n−1) + ways(n−2): 1, 2, 3, 5, 8, 13 for n = 1..6.' },

  { id: 'L5-10', lec: 5, topic: 'Parking problem', d: 3, type: 'fib',
    t: 'Listing the parking arrangements',
    q: '`park(n)` returns every arrangement as a tuple of strings in this exact order: `park(3)` is `(\'CCC\', \'BC\', \'CB\')` and `park(4)` is `(\'CCCC\', \'BCC\', \'CBC\', \'CCB\', \'BB\')`. Complete it.',
    code: `
      def park(n):
          if n == 0:
              return ('',)
          if n == 1:
              return ('C',)
          return tuple({{1}} for s in park(n - 1)) + \\
                 tuple({{2}} for s in park(n - 2))`,
    blanks: [["s + 'C'", 's + "C"'], ["s + 'B'", 's + "B"']],
    test: "assert park(3) == ('CCC', 'BC', 'CB')\nassert park(4) == ('CCCC', 'BCC', 'CBC', 'CCB', 'BB')",
    exp: 'Look at the **last** vehicle: put a car after every arrangement of n−1 lots, then a bus after every arrangement of n−2 lots. Appending (not prepending) is what gives the order shown.' },

  { id: 'L5-11', lec: 5, topic: 'Towers of Hanoi', d: 2, type: 'out',
    t: 'Number of Hanoi moves',
    q: 'How many lines does `towers(5, \'A\', \'B\', \'C\')` print? Type a number.',
    code: `
      def towers(n, src, via, dst):
          if n == 1:
              print(f'Move disk 1 from {src} to {dst}')
              return
          towers(n - 1, src, dst, via)
          print(f'Move disk {n} from {src} to {dst}')
          towers(n - 1, via, src, dst)`,
    ans: '31',
    verify: 'import io, contextlib\nbuf = io.StringIO()\nwith contextlib.redirect_stdout(buf):\n    towers(5, "A", "B", "C")\nassert len(buf.getvalue().strip().splitlines()) == 31',
    exp: 'moves(n) = 2·moves(n−1) + 1 with moves(1) = 1, which gives 2ⁿ − 1 = 31.' },

  { id: 'L5-12', lec: 5, topic: 'Towers of Hanoi', d: 3, type: 'fib',
    t: 'Towers of Hanoi',
    q: 'Complete `towers` so that `towers(3, \'A\', \'B\', \'C\')` moves the tower from A to C using B, exactly as in the lecture.',
    code: `
      def towers(n, src, via, dst):
          if n == 1:
              print(f'Move disk 1 from {src} to {dst}')
              return
          towers(n - 1, {{1}})
          print(f'Move disk {n} from {src} to {dst}')
          towers(n - 1, {{2}})`,
    blanks: [['src, dst, via'], ['via, src, dst']],
    test: 'towers(3, "A", "B", "C")\nassert OUT().strip().splitlines() == ["Move disk 1 from A to C", "Move disk 2 from A to B", "Move disk 1 from C to B", "Move disk 3 from A to C", "Move disk 1 from B to A", "Move disk 2 from B to C", "Move disk 1 from A to C"]',
    exp: 'Move the top n−1 disks out of the way onto `via` (using `dst` as the spare), move disk n to `dst`, then move the n−1 disks from `via` onto `dst` (using `src` as the spare).' },

  { id: 'L5-13', lec: 5, topic: 'Recursion on tuples', d: 1, type: 'out',
    t: 'Skipping elements recursively',
    code: `
      def s(t):
          if not t:
              return 0
          return t[0] + s(t[2:])

      print(s((1, 2, 3, 4, 5)))`,
    ans: '9',
    exp: '`t[2:]` skips one element each time, so this adds the elements at even indices: 1 + 3 + 5.' },

  { id: 'L5-14', lec: 5, topic: 'Recursion on tuples', d: 1, type: 'out',
    t: 'Counting occurrences recursively',
    code: `
      def count(x, t):
          if t == ():
              return 0
          return (1 if t[0] == x else 0) + count(x, t[1:])

      print(count(2, (2, 1, 2, 2)))`,
    ans: '3',
    exp: 'Add 1 for every element that equals `x`, then recurse on the rest of the tuple.' },

  { id: 'L5-15', lec: 5, topic: 'Recursion', d: 1, type: 'out',
    t: 'Euclid\'s gcd',
    code: `
      def gcd(a, b):
          return a if b == 0 else gcd(b, a % b)

      print(gcd(84, 36), gcd(17, 5))`,
    ans: '12 1',
    exp: 'gcd(84,36) → gcd(36,12) → gcd(12,0) = 12. gcd(17,5) → gcd(5,2) → gcd(2,1) → gcd(1,0) = 1.' },

  { id: 'L5-16', lec: 5, topic: 'Recursion on strings', d: 2, type: 'fib',
    t: 'Recursive palindrome check',
    q: 'Complete `is_pal(s)`, which returns `True` when `s` reads the same backwards.',
    code: `
      def is_pal(s):
          if len(s) <= 1:
              return True
          return {{1}} and is_pal({{2}})`,
    blanks: [['s[0] == s[-1]', 's[-1] == s[0]', 's[0] == s[len(s) - 1]'], ['s[1:-1]', 's[1:len(s) - 1]']],
    test: "assert is_pal('racecar') and is_pal('abba') and is_pal('') and is_pal('x')\nassert not is_pal('abca') and not is_pal('ab')",
    exp: 'The outer characters must match, and the inside (`s[1:-1]`, both ends removed) must also be a palindrome. `and` short-circuits, so the recursion stops at the first mismatch.' },

  { id: 'L5-17', lec: 5, topic: 'Recursion', d: 2, type: 'fib',
    t: 'Decimal to binary',
    q: 'Complete `to_bin(n)`, which returns the binary representation of `n ≥ 0` as a string, e.g. `to_bin(10)` is `\'1010\'`.',
    code: `
      def to_bin(n):
          if n < 2:
              return str(n)
          return {{1}}`,
    blanks: [['to_bin(n // 2) + str(n % 2)']],
    test: "assert to_bin(10) == '1010'\nassert to_bin(0) == '0'\nassert to_bin(1) == '1'\nassert to_bin(255) == '11111111'",
    exp: 'The last binary digit is `n % 2`, and the digits before it are the binary form of `n // 2`. Those come first, so the recursive result goes on the left.' },

  { id: 'L5-18', lec: 5, topic: 'Recursion', d: 2, type: 'out',
    t: 'Three-term recurrence',
    code: `
      def f(n):
          if n < 3:
              return n
          return f(n - 1) + f(n - 3)

      print(f(6))`,
    ans: '7',
    exp: 'f(0) = 0, f(1) = 1, f(2) = 2, f(3) = 2 + 0 = 2, f(4) = 2 + 1 = 3, f(5) = 3 + 2 = 5, f(6) = 5 + 2 = 7.' },

  { id: 'L5-19', lec: 5, topic: 'Call stack', d: 2, type: 'mcq',
    t: 'The call stack at its deepest',
    q: 'With the usual `fact` (base case `n == 0`), which statement about the call stack while evaluating `fact(3)` is true at its deepest point?',
    opts: ['There are 4 frames for fact, with n = 3, 2, 1 and 0',
           'There is 1 frame for fact, because frames are reused',
           'There are 3 frames for fact, with n = 3, 2 and 1',
           'The frames hold the values 6, 2, 1 and 1 already computed'],
    ans: 0,
    exp: 'Each call pushes its own activation record with its own `n`. None of them can finish until fact(0) returns 1, which starts the unwinding.' },

  { id: 'L5-20', lec: 5, topic: 'Recursion', d: 1, type: 'fib',
    t: 'Count digits recursively',
    q: 'Complete `num_digits(n)` for `n ≥ 0`.',
    code: `
      def num_digits(n):
          return 1 if n < 10 else {{1}}`,
    blanks: [['1 + num_digits(n // 10)', 'num_digits(n // 10) + 1']],
    test: 'assert num_digits(0) == 1\nassert num_digits(9) == 1\nassert num_digits(12345) == 5',
    exp: 'Dropping the last digit (`n // 10`) leaves a number with one digit fewer.' },

  { id: 'L5-21', lec: 5, topic: 'Recursion on strings', d: 3, type: 'out',
    t: 'Interleaving by swapping arguments',
    code: `
      def mix(a, b):
          if not a:
              return b
          return a[0] + mix(b, a[1:])

      print(mix('abc', '12345'))`,
    ans: 'a1b2c345',
    exp: 'The arguments swap places on every call, so characters alternate between the two strings. When the first argument runs out, whatever is left of the other is appended.' },

  { id: 'L5-22', lec: 5, topic: 'Recursion on tuples', d: 2, type: 'out',
    t: 'Filtering recursively',
    code: `
      def evens(t):
          if not t:
              return ()
          rest = evens(t[1:])
          return (t[0],) + rest if t[0] % 2 == 0 else rest

      print(evens((3, 4, 7, 8, 10)))`,
    ans: '(4, 8, 10)',
    exp: 'Even heads are kept, written as the one-element tuple `(t[0],)`, and odd heads are dropped.' },

  { id: 'L5-23', lec: 5, topic: 'Recursion', d: 3, type: 'out',
    t: 'Recursion with two calls',
    code: `
      def f(s):
          if len(s) <= 1:
              return s
          mid = len(s) // 2
          return f(s[mid:]) + f(s[:mid])

      print(f('abcdef'))`,
    ans: 'fedcba',
    exp: 'Splitting the string in half and swapping the two halves at every level reverses it. Halves: `abc|def` → `f(def) + f(abc)`, and recursively `def` → `fed`.' },

  { id: 'L5-24', lec: 5, topic: 'Recursion', d: 3, type: 'fib',
    t: 'All subsets',
    q: '`subsets(t)` returns a tuple of every subset of `t`, each subset a tuple. For example, `subsets((1, 2))` is `((), (2,), (1,), (1, 2))`. Complete it.',
    code: `
      def subsets(t):
          if not t:
              return ((),)
          rest = subsets(t[1:])
          return rest + tuple({{1}} for s in rest)`,
    blanks: [['(t[0],) + s']],
    test: 'assert subsets((1, 2)) == ((), (2,), (1,), (1, 2))\nassert len(subsets((1, 2, 3, 4))) == 16',
    exp: 'Every subset either leaves out `t[0]` (that is `rest`) or contains it (`t[0]` added in front of each subset in `rest`). So the count doubles with each element: 2ⁿ.' },

  { id: 'L5-25', lec: 5, topic: 'Mutual recursion', d: 2, type: 'out',
    t: 'is_even and is_odd',
    code: `
      def is_even(n):
          return True if n == 0 else is_odd(n - 1)

      def is_odd(n):
          return False if n == 0 else is_even(n - 1)

      print(is_even(7), is_odd(7))`,
    ans: 'False True',
    exp: 'The two functions take turns knocking 1 off `n`. Starting from `is_even(7)`, after 7 calls we are in `is_odd(0)`, which returns `False`. Starting from `is_odd(7)`, we end in `is_even(0)`, which returns `True`.' },

  { id: 'L5-26', lec: 5, topic: 'Base case', d: 2, type: 'mcq', run: true,
    t: 'Stepping over the base case',
    q: 'What happens?',
    code: `
      def f(n):
          if n == 0:
              return 0
          return n + f(n - 2)

      print(f(7))`,
    opts: ['RecursionError', '16', '15', '0'],
    ans: 0,
    exp: 'From 7 the argument goes 5, 3, 1, −1, −3, … and never equals 0, so the base case is skipped and the recursion only ends when it hits the call-stack limit. `if n <= 0` would fix it.' },

  { id: 'L5-27', lec: 5, topic: 'Winding / unwinding', d: 2, type: 'out',
    t: 'An accumulator printed on the way in',
    code: `
      def show(t, acc):
          if not t:
              return acc
          print(acc, end=' ')
          return show(t[1:], acc + t[0])

      print(show((1, 2, 3), 0))`,
    ans: '0 1 3 6',
    exp: 'Each call prints the running total so far and passes the updated total on. The base case returns the final total, 6, which the outer `print` shows.' },

  { id: 'L5-28', lec: 5, topic: 'Counting paths', d: 2, type: 'fib',
    t: 'Climbing stairs 1, 2 or 3 at a time',
    q: 'Complete `climb(n)`, the number of ways to climb `n` steps taking 1, 2 or 3 steps at a time, e.g. `climb(4)` is `7`.',
    code: `
      def climb(n):
          if n < 0:
              return 0
          if n == 0:
              return 1
          return {{1}}`,
    blanks: [['climb(n - 1) + climb(n - 2) + climb(n - 3)', 'climb(n - 3) + climb(n - 2) + climb(n - 1)']],
    test: 'assert climb(4) == 7\nassert climb(1) == 1\nassert climb(3) == 4',
    exp: 'The first move is 1, 2 or 3 steps, and after it you have a smaller staircase. `n < 0` means you overshot (0 ways) and `n == 0` means you arrived exactly (1 way).' },

  { id: 'L5-29', lec: 5, topic: 'Recursion on strings', d: 2, type: 'fib',
    t: 'Remove every occurrence of a character',
    q: 'Complete `remove_all(s, c)`, e.g. `remove_all(\'banana\', \'a\')` is `\'bnn\'`.',
    code: `
      def remove_all(s, c):
          if not s:
              return ''
          rest = remove_all(s[1:], c)
          return {{1}}`,
    blanks: [['rest if s[0] == c else s[0] + rest', 's[0] + rest if s[0] != c else rest']],
    test: "assert remove_all('banana', 'a') == 'bnn'\nassert remove_all('', 'a') == ''\nassert remove_all('aaa', 'a') == ''",
    exp: 'The rest of the string is cleaned recursively. The first character is kept only if it is not `c`.' },

  { id: 'L5-30', lec: 5, topic: 'Recursion on tuples', d: 3, type: 'out',
    t: 'Summing a nested tuple',
    code: `
      def total(t):
          if type(t) != tuple:
              return t
          if not t:
              return 0
          return total(t[0]) + total(t[1:])

      print(total((1, (2, 3), ((4,),), 5)))`,
    ans: '15',
    exp: 'A number is returned as it is. A tuple is split into its head, which may itself be nested, and its tail, and both are summed recursively: 1 + 2 + 3 + 4 + 5.' },

  { id: 'L5-31', lec: 5, topic: 'Recursion', d: 3, type: 'out',
    t: 'Binary strings without "11"',
    code: `
      def strs(n):
          if n == 0:
              return ['']
          out = []
          for s in strs(n - 1):
              out.append(s + '0')
              if s[-1:] != '1':
                  out.append(s + '1')
          return out

      print(len(strs(4)), strs(2))`,
    ans: "8 ['00', '01', '10']",
    exp: 'You can always append a 0, and you can append a 1 only when the string does not already end in 1. The counts go 2, 3, 5, 8, a Fibonacci pattern again. `s[-1:]` is safe even for the empty string.' },

  { id: 'L5-32', lec: 5, topic: 'Recursion on strings', d: 2, type: 'out',
    t: 'Swapping the ends recursively',
    code: `
      def h(s):
          if len(s) < 2:
              return s
          return s[-1] + h(s[1:-1]) + s[0]

      print(h('python'))`,
    ans: 'nohtyp',
    exp: 'At every level the first and last characters change places around the recursively processed middle, which reverses the string.' }
]);
