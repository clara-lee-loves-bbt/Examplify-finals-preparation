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

      print(f(4096))` },

  { id: 'L5-02', lec: 5, topic: 'Recursion', d: 2, type: 'out',
    t: 'Fibonacci-like recurrence',
    code: `
      def g(n):
          if n <= 1:
              return 1
          return g(n - 1) + g(n - 2) + 1

      print(g(4))` },

  { id: 'L5-03', lec: 5, topic: 'Winding / unwinding', d: 2, type: 'out',
    t: 'Printing on the way in and out',
    code: `
      def r(n):
          if n > 0:
              print(n, end=' ')
              r(n - 1)
              print(n, end=' ')

      r(3)` },

  { id: 'L5-04', lec: 5, topic: 'Base case', d: 1, type: 'mcq',
    t: 'Missing base case',
    q: 'What happens?',
    code: `
      def fact(n):
          return n * fact(n - 1)

      print(fact(3))` },

  { id: 'L5-05', lec: 5, topic: 'Recursion', d: 1, type: 'out',
    t: 'Recursive string reverse',
    code: `
      def p(s):
          if len(s) <= 1:
              return s
          return p(s[1:]) + s[0]

      print(p('stack'))` },

  { id: 'L5-06', lec: 5, topic: 'Recursion', d: 2, type: 'out',
    t: 'Fast power',
    code: `
      def pw(b, e):
          if e == 0:
              return 1
          h = pw(b, e // 2)
          return h * h if e % 2 == 0 else h * h * b

      print(pw(3, 5))` },

  { id: 'L5-07', lec: 5, topic: 'Call stack', d: 2, type: 'mcq',
    t: 'Counting calls of fast power',
    q: 'Using `pw` from the code below, how many times is `pw` called in total (including the first call) to evaluate `pw(3, 5)`?',
    code: `
      def pw(b, e):
          if e == 0:
              return 1
          h = pw(b, e // 2)
          return h * h if e % 2 == 0 else h * h * b` },

  { id: 'L5-08', lec: 5, topic: 'Fibonacci', d: 3, type: 'out',
    t: 'Size of the recursion tree',
    q: 'How many times is `fib` called (including the first call) when evaluating `fib(5)`? Type a number.',
    code: `
      def fib(k):
          if k <= 1:
              return k
          return fib(k - 1) + fib(k - 2)` },

  { id: 'L5-09', lec: 5, topic: 'Parking problem', d: 2, type: 'out',
    t: 'Counting parking arrangements',
    q: 'A car takes 1 lot and a bus takes 2. In how many ways can 6 consecutive lots be filled exactly? Type a number.' },

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
                 tuple({{2}} for s in park(n - 2))` },

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
          towers(n - 1, via, src, dst)` },

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
          towers(n - 1, {{2}})` },

  { id: 'L5-13', lec: 5, topic: 'Recursion on tuples', d: 1, type: 'out',
    t: 'Skipping elements recursively',
    code: `
      def s(t):
          if not t:
              return 0
          return t[0] + s(t[2:])

      print(s((1, 2, 3, 4, 5)))` },

  { id: 'L5-14', lec: 5, topic: 'Recursion on tuples', d: 1, type: 'out',
    t: 'Counting occurrences recursively',
    code: `
      def count(x, t):
          if t == ():
              return 0
          return (1 if t[0] == x else 0) + count(x, t[1:])

      print(count(2, (2, 1, 2, 2)))` },

  { id: 'L5-15', lec: 5, topic: 'Recursion', d: 1, type: 'out',
    t: 'Euclid\'s gcd',
    code: `
      def gcd(a, b):
          return a if b == 0 else gcd(b, a % b)

      print(gcd(84, 36), gcd(17, 5))` },

  { id: 'L5-16', lec: 5, topic: 'Recursion on strings', d: 2, type: 'fib',
    t: 'Recursive palindrome check',
    q: 'Complete `is_pal(s)`, which returns `True` when `s` reads the same backwards.',
    code: `
      def is_pal(s):
          if len(s) <= 1:
              return True
          return {{1}} and is_pal({{2}})` },

  { id: 'L5-17', lec: 5, topic: 'Recursion', d: 2, type: 'fib',
    t: 'Decimal to binary',
    q: 'Complete `to_bin(n)`, which returns the binary representation of `n ≥ 0` as a string, e.g. `to_bin(10)` is `\'1010\'`.',
    code: `
      def to_bin(n):
          if n < 2:
              return str(n)
          return {{1}}` },

  { id: 'L5-18', lec: 5, topic: 'Recursion', d: 2, type: 'out',
    t: 'Three-term recurrence',
    code: `
      def f(n):
          if n < 3:
              return n
          return f(n - 1) + f(n - 3)

      print(f(6))` },

  { id: 'L5-19', lec: 5, topic: 'Call stack', d: 2, type: 'mcq',
    t: 'The call stack at its deepest',
    q: 'With the usual `fact` (base case `n == 0`), which statement about the call stack while evaluating `fact(3)` is true at its deepest point?' },

  { id: 'L5-20', lec: 5, topic: 'Recursion', d: 1, type: 'fib',
    t: 'Count digits recursively',
    q: 'Complete `num_digits(n)` for `n ≥ 0`.',
    code: `
      def num_digits(n):
          return 1 if n < 10 else {{1}}` },

  { id: 'L5-21', lec: 5, topic: 'Recursion on strings', d: 3, type: 'out',
    t: 'Interleaving by swapping arguments',
    code: `
      def mix(a, b):
          if not a:
              return b
          return a[0] + mix(b, a[1:])

      print(mix('abc', '12345'))` },

  { id: 'L5-22', lec: 5, topic: 'Recursion on tuples', d: 2, type: 'out',
    t: 'Filtering recursively',
    code: `
      def evens(t):
          if not t:
              return ()
          rest = evens(t[1:])
          return (t[0],) + rest if t[0] % 2 == 0 else rest

      print(evens((3, 4, 7, 8, 10)))` },

  { id: 'L5-23', lec: 5, topic: 'Recursion', d: 3, type: 'out',
    t: 'Recursion with two calls',
    code: `
      def f(s):
          if len(s) <= 1:
              return s
          mid = len(s) // 2
          return f(s[mid:]) + f(s[:mid])

      print(f('abcdef'))` },

  { id: 'L5-24', lec: 5, topic: 'Recursion', d: 3, type: 'fib',
    t: 'All subsets',
    q: '`subsets(t)` returns a tuple of every subset of `t`, each subset a tuple. For example, `subsets((1, 2))` is `((), (2,), (1,), (1, 2))`. Complete it.',
    code: `
      def subsets(t):
          if not t:
              return ((),)
          rest = subsets(t[1:])
          return rest + tuple({{1}} for s in rest)` },

  { id: 'L5-25', lec: 5, topic: 'Mutual recursion', d: 2, type: 'out',
    t: 'is_even and is_odd',
    code: `
      def is_even(n):
          return True if n == 0 else is_odd(n - 1)

      def is_odd(n):
          return False if n == 0 else is_even(n - 1)

      print(is_even(7), is_odd(7))` },

  { id: 'L5-26', lec: 5, topic: 'Base case', d: 2, type: 'mcq',
    t: 'Stepping over the base case',
    q: 'What happens?',
    code: `
      def f(n):
          if n == 0:
              return 0
          return n + f(n - 2)

      print(f(7))` },

  { id: 'L5-27', lec: 5, topic: 'Winding / unwinding', d: 2, type: 'out',
    t: 'An accumulator printed on the way in',
    code: `
      def show(t, acc):
          if not t:
              return acc
          print(acc, end=' ')
          return show(t[1:], acc + t[0])

      print(show((1, 2, 3), 0))` },

  { id: 'L5-28', lec: 5, topic: 'Counting paths', d: 2, type: 'fib',
    t: 'Climbing stairs 1, 2 or 3 at a time',
    q: 'Complete `climb(n)`, the number of ways to climb `n` steps taking 1, 2 or 3 steps at a time, e.g. `climb(4)` is `7`.',
    code: `
      def climb(n):
          if n < 0:
              return 0
          if n == 0:
              return 1
          return {{1}}` },

  { id: 'L5-29', lec: 5, topic: 'Recursion on strings', d: 2, type: 'fib',
    t: 'Remove every occurrence of a character',
    q: 'Complete `remove_all(s, c)`, e.g. `remove_all(\'banana\', \'a\')` is `\'bnn\'`.',
    code: `
      def remove_all(s, c):
          if not s:
              return ''
          rest = remove_all(s[1:], c)
          return {{1}}` },

  { id: 'L5-30', lec: 5, topic: 'Recursion on tuples', d: 3, type: 'out',
    t: 'Summing a nested tuple',
    code: `
      def total(t):
          if type(t) != tuple:
              return t
          if not t:
              return 0
          return total(t[0]) + total(t[1:])

      print(total((1, (2, 3), ((4,),), 5)))` },

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

      print(len(strs(4)), strs(2))` },

  { id: 'L5-32', lec: 5, topic: 'Recursion on strings', d: 2, type: 'out',
    t: 'Swapping the ends recursively',
    code: `
      def h(s):
          if len(s) < 2:
              return s
          return s[-1] + h(s[1:-1]) + s[0]

      print(h('python'))` },

  { id: 'L5-33', lec: 5, topic: 'Recursion on strings', d: 3, type: 'fib',
    t: 'All permutations of a string',
    q: '`perms(s)` returns every permutation of `s` (distinct characters), e.g. `perms(\'abc\')` is `[\'abc\', \'acb\', \'bac\', \'bca\', \'cab\', \'cba\']`. Complete it.',
    code: `
      def perms(s):
          if len(s) <= 1:
              return [s]
          out = []
          for i in range(len(s)):
              for p in perms({{1}}):
                  out.append({{2}})
          return out` },

  { id: 'L5-34', lec: 5, topic: 'Counting paths', d: 3, type: 'fib',
    t: 'Ways to make change',
    q: '`ways(n, coins)` counts how many ways to pay `n` using the coin values in the tuple `coins` (unlimited supply, order does not matter), e.g. `ways(5, (1, 2, 5))` is `4`. Complete it.',
    code: `
      def ways(n, coins):
          if n == 0:
              return 1
          if n < 0 or not coins:
              return 0
          return {{1}} + {{2}}` },

  { id: 'L5-35', lec: 5, topic: 'Recursion on strings', d: 2, type: 'fib',
    t: 'Count overlapping occurrences',
    q: 'Complete `count_sub(s, t)`, which counts occurrences of `t` in `s`, **including overlapping ones**, e.g. `count_sub(\'aaaa\', \'aa\')` is `3`.',
    code: `
      def count_sub(s, t):
          if len(s) < len(t):
              return 0
          return (1 if {{1}} else 0) + count_sub(s[1:], t)` },

  { id: 'L5-36', lec: 5, topic: 'Recursion on tuples', d: 1, type: 'fib',
    t: 'Is it sorted? (recursive)',
    q: 'Complete `is_sorted(t)` in one line: `True` when `t` is in non-decreasing order.',
    code: `
      def is_sorted(t):
          if len(t) < 2:
              return True
          return {{1}}` },

  { id: 'L5-37', lec: 5, topic: 'Recursion', d: 2, type: 'fib',
    t: 'Pascal\'s triangle row',
    q: '`pascal(n)` returns row `n` of Pascal\'s triangle, e.g. `pascal(4)` is `[1, 4, 6, 4, 1]`. Complete it.',
    code: `
      def pascal(n):
          if n == 0:
              return [1]
          prev = pascal(n - 1)
          return [1] + [{{1}} for i in range(len(prev) - 1)] + [1]` },

  { id: 'L5-38', lec: 5, topic: 'Counting paths', d: 2, type: 'fib',
    t: 'Paths across a grid',
    q: 'Moving only down or right, how many paths lead from the top-left to a corner `r` steps down and `c` steps right? Complete `paths(r, c)`, e.g. `paths(2, 2)` is `6`.',
    code: `
      def paths(r, c):
          if r == 0 or c == 0:
              return 1
          return {{1}}` },

  { id: 'L5-39', lec: 5, topic: 'Recursion on tuples', d: 1, type: 'fib',
    t: 'Maximum, recursively',
    q: 'Complete `rmax(t)` for a non-empty tuple.',
    code: `
      def rmax(t):
          if len(t) == 1:
              return t[0]
          m = rmax(t[1:])
          return {{1}}` },

  { id: 'L5-40', lec: 5, topic: 'Recursion on strings', d: 2, type: 'fib',
    t: 'Run-length encoding',
    q: '`rle(s)` compresses runs of characters, e.g. `rle(\'aaabcc\')` is `\'a3b1c2\'`. Complete it.',
    code: `
      def rle(s):
          if not s:
              return ''
          i = 1
          while i < len(s) and s[i] == s[0]:
              i += 1
          return {{1}} + rle(s[i:])` },

  { id: 'L5-41', lec: 5, topic: 'Recursion', d: 2, type: 'fib',
    t: 'All binary strings of length n',
    q: '`bins(n)` returns all binary strings of length `n` in increasing order, e.g. `bins(2)` is `[\'00\', \'01\', \'10\', \'11\']`. Complete it.',
    code: `
      def bins(n):
          if n == 0:
              return ['']
          return [{{1}} for s in bins(n - 1) for b in '01']` },

  { id: 'L5-42', lec: 5, topic: 'Recursion', d: 2, type: 'out',
    t: 'Weighted recurrence',
    code: `
      def f(n):
          if n <= 1:
              return 1
          return f(n - 1) + 2 * f(n - 2)

      print(f(5))` },

  { id: 'L5-43', lec: 5, topic: 'Winding / unwinding', d: 3, type: 'out',
    t: 'Print between two recursive calls',
    code: `
      def p(n):
          if n == 0:
              return
          p(n - 1)
          print(n, end='')
          p(n - 1)

      p(3)` },

  { id: 'L5-44', lec: 5, topic: 'Base case', d: 3, type: 'mcq',
    t: 'A branch that forgets to return',
    q: 'What happens?',
    code: `
      def g(t):
          if not t:
              return 0
          if t[0] < 0:
              g(t[1:])
          else:
              return t[0] + g(t[1:])

      print(g((1, -2, 3)))` },

  { id: 'L5-45', lec: 5, topic: 'Recursion on strings', d: 3, type: 'out',
    t: 'Outside in, two at a time',
    code: `
      def z(s):
          if len(s) <= 2:
              return s
          return s[0] + z(s[2:]) + s[1]

      print(z('abcdefg'))` },

  { id: 'L5-46', lec: 5, topic: 'Call stack', d: 2, type: 'out',
    t: 'Counting calls of a binary recursion',
    q: 'How many times is `h` called in total by `h(4)`? Type a number.',
    code: `
      def h(n):
          if n <= 1:
              return 1
          return h(n - 1) + h(n - 1)` }
]);
