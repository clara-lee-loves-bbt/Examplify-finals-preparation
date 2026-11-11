/* Lecture 4 — Manipulating program state with statements:
   assignment, input/output, selection, for / while, nested loops */
practice([
  { id: 'L4-01', lec: 4, topic: 'Assignment', d: 1, type: 'out',
    t: 'Swap without a temporary',
    code: `
      x, y = 3, 5
      x = x + y
      y = x - y
      x = x - y
      print(x, y)`,
    ans: '5 3',
    exp: 'Step by step, (x, y) goes `(8, 5)` → `(8, 3)` → `(5, 3)`. The values are swapped.' },

  { id: 'L4-02', lec: 4, topic: 'Assignment', d: 2, type: 'out',
    t: 'Compound assignment',
    code: `
      x = 1
      x += x * 2
      x *= x - 1
      print(x)`,
    ans: '6',
    exp: '`x += x * 2` gives `1 + 2 = 3`. Then `x *= x - 1` means `x = x * (x - 1)`, because the whole right side is evaluated first: `3 * 2 = 6`.' },

  { id: 'L4-03', lec: 4, topic: 'Output', d: 1, type: 'mcq', run: true,
    t: 'print with sep and end',
    q: 'What is printed?',
    code: `
      print(1, 2, sep='-', end='!')
      print(3)`,
    opts: ['1-2!3', '1-2!\n3', '1 2!3', '1-2-!3'],
    optCode: true,
    ans: 0,
    exp: '`sep` goes between the arguments and `end` replaces the usual newline, so the next `print` continues on the same line.' },

  { id: 'L4-04', lec: 4, topic: 'Output', d: 1, type: 'out',
    t: 'f-strings',
    code: `
      n = 7
      print(f'{n} squared is {n * n}')`,
    ans: '7 squared is 49',
    exp: 'Expressions inside `{}` in an f-string are evaluated and inserted into the text.' },

  { id: 'L4-05', lec: 4, topic: 'Return values', d: 1, type: 'mcq', run: true,
    t: 'A function that only prints',
    q: 'What is printed?',
    code: `
      def show(x):
          print(x * 2)

      y = show(4)
      print(y)`,
    opts: ['8\nNone', '8\n8', 'None', '8'],
    optCode: true,
    ans: 0,
    exp: 'Printing is a side effect, not a return value. `show` has no `return` statement, so it returns `None`, which is stored in `y`.' },

  { id: 'L4-06', lec: 4, topic: 'Selection', d: 2, type: 'out',
    t: 'elif order matters',
    code: `
      def grade(m):
          if m >= 50:
              return 'C'
          elif m >= 70:
              return 'B'
          elif m >= 85:
              return 'A'
          return 'F'

      print(grade(90) + grade(60) + grade(10))`,
    ans: 'CCF',
    exp: 'The first true branch wins. Every mark ≥ 50 is caught by `m >= 50` before the stricter tests are reached, so 90 also gets `C`.' },

  { id: 'L4-07', lec: 4, topic: 'Selection', d: 2, type: 'out',
    t: 'Two separate ifs',
    code: `
      x = 5
      if x > 3:
          x -= 3
      if x < 3:
          x *= 10
      else:
          x += 1
      print(x)`,
    ans: '20',
    exp: 'These are two **separate** `if` statements. The first changes x to 2, then the second sees `2 < 3` and multiplies by 10.' },

  { id: 'L4-08', lec: 4, topic: 'for loops', d: 1, type: 'out',
    t: 'Loop variable after the loop',
    code: `
      s = 0
      for i in range(1, 10, 3):
          s += i
      print(s, i)`,
    ans: '12 7',
    exp: '`i` takes 1, 4 and 7, so `s = 12`. After the loop, `i` keeps its last value, 7.' },

  { id: 'L4-09', lec: 4, topic: 'while loops', d: 1, type: 'out',
    t: 'Repeated integer division',
    code: `
      n = 100
      count = 0
      while n > 1:
          n //= 3
          count += 1
      print(n, count)`,
    ans: '1 4',
    exp: '100 → 33 → 11 → 3 → 1 takes four divisions, and the loop stops when `n` is 1.' },

  { id: 'L4-10', lec: 4, topic: 'for loops', d: 1, type: 'out',
    t: 'Printing a pattern',
    q: 'What is printed? (Type each line on its own line.)',
    code: `
      for i in range(3):
          print('*' * i + '#' * (3 - i))`,
    ans: '###\n*##\n**#',
    exp: 'Row `i` has `i` stars and `3 - i` hashes. Row 0 has no stars.' },

  { id: 'L4-11', lec: 4, topic: 'Nested loops', d: 2, type: 'out',
    t: 'Triangular nested loop',
    code: `
      s = 0
      for i in range(1, 4):
          for j in range(i, 4):
              s += 1
      print(s)`,
    ans: '6',
    exp: 'The inner loop runs 3 times when i = 1, twice when i = 2 and once when i = 3: 3 + 2 + 1 = 6.' },

  { id: 'L4-12', lec: 4, topic: 'for loops', d: 2, type: 'mcq', run: true,
    t: 'Changing the loop variable',
    q: 'What is printed?',
    code: `
      for i in range(5):
          i += 2
          print(i, end=' ')`,
    opts: ['2 3 4 5 6', '2 4', '2 4 6', '0 2 4'],
    ans: 0,
    exp: 'Each iteration takes the **next value from the range**, no matter what was done to `i` inside the body. Changing `i` does not skip any iterations.' },

  { id: 'L4-13', lec: 4, topic: 'Return in loops', d: 1, type: 'out',
    t: 'Return from inside a loop',
    code: `
      def first_neg(t):
          for x in t:
              if x < 0:
                  return x
          return 0

      print(first_neg((3, -1, -5)), first_neg((2, 4)))`,
    ans: '-1 0',
    exp: '`return` ends the function at the first negative number. If no element is negative, the loop finishes and `return 0` runs.' },

  { id: 'L4-14', lec: 4, topic: 'Return in loops', d: 2, type: 'out',
    t: 'Returning too early',
    code: `
      def all_pos(t):
          for x in t:
              if x > 0:
                  return True
              else:
                  return False

      print(all_pos((1, -2, 3)), all_pos((-1, 2)))`,
    ans: 'True False',
    exp: 'Both branches return, so the loop never gets past the first element. The function only checks `t[0]`, which is a classic bug. A correct version returns `False` inside the loop and `True` after it.' },

  { id: 'L4-15', lec: 4, topic: 'for loops', d: 1, type: 'fib',
    t: 'Maximum of a tuple',
    q: 'Complete `max_n(t)`, which returns the largest element of a non-empty tuple.',
    code: `
      def max_n(t):
          m = t[0]
          for i in range(1, len(t)):
              if {{1}}:
                  m = t[i]
          return m`,
    blanks: [['t[i] > m', 'm < t[i]', 't[i] >= m', 'm <= t[i]']],
    test: 'assert max_n((4, 5, 3)) == 5\nassert max_n((-3, -7)) == -3\nassert max_n((2,)) == 2',
    exp: 'Keep the largest value seen so far in `m`, and replace it whenever a bigger element turns up.' },

  { id: 'L4-16', lec: 4, topic: 'while loops', d: 2, type: 'fib',
    t: 'Bisection method',
    q: 'Complete the bisection root finder. The root lies in [a, b] and `f(a)`, `f(b)` have opposite signs.',
    code: `
      def bisect(f, a, b):
          p = (a + b) / 2
          while abs(f(p)) > 1e-6:
              if f(a) * f(p) < 0:
                  {{1}}
              else:
                  {{2}}
              p = (a + b) / 2
          return p`,
    blanks: [['b = p'], ['a = p']],
    test: 'assert abs(bisect(lambda x: x * x - 2, 1, 2) - 2 ** 0.5) < 1e-5\nassert abs(bisect(lambda x: x**3 + 4*x**2 - 10, 1, 2) - 1.36523) < 1e-4',
    exp: 'If `f(a)` and `f(p)` have opposite signs, the root is in `[a, p]`, so move `b` to `p`. Otherwise the root is in `[p, b]`, so move `a` to `p`.' },

  { id: 'L4-17', lec: 4, topic: 'while loops', d: 1, type: 'fib',
    t: 'Sum of digits',
    q: 'Complete `digit_sum(n)` for a non-negative integer `n`, e.g. `digit_sum(9045)` is `18`.',
    code: `
      def digit_sum(n):
          s = 0
          while n > 0:
              s += {{1}}
              n = {{2}}
          return s`,
    blanks: [['n % 10'], ['n // 10']],
    test: 'assert digit_sum(9045) == 18\nassert digit_sum(0) == 0\nassert digit_sum(7) == 7',
    exp: '`n % 10` is the last digit, and `n // 10` drops it. Repeat until no digits are left.' },

  { id: 'L4-18', lec: 4, topic: 'while loops', d: 2, type: 'fib',
    t: 'Reverse an integer',
    q: 'Complete `reverse_num(n)`, e.g. `reverse_num(1230)` is `321`.',
    code: `
      def reverse_num(n):
          r = 0
          while n > 0:
              r = {{1}}
              n //= 10
          return r`,
    blanks: [['r * 10 + n % 10', 'n % 10 + r * 10', '10 * r + n % 10', 'n % 10 + 10 * r']],
    test: 'assert reverse_num(1230) == 321\nassert reverse_num(7) == 7\nassert reverse_num(1000) == 1',
    exp: 'Shift the digits built so far one place left (`r * 10`) and add the next digit taken from the end of `n`.' },

  { id: 'L4-19', lec: 4, topic: 'Nested loops', d: 1, type: 'out',
    t: 'Counting pairs',
    code: `
      c = 0
      for i in range(4):
          for j in range(4):
              if i < j:
                  c += 1
      print(c)`,
    ans: '6',
    exp: 'This counts pairs with i < j from 0..3: (0,1), (0,2), (0,3), (1,2), (1,3) and (2,3), which is 6.' },

  { id: 'L4-20', lec: 4, topic: 'while loops', d: 2, type: 'out',
    t: 'Sum of squares until 20',
    code: `
      i, total = 0, 0
      while total < 20:
          i += 1
          total += i * i
      print(i, total)`,
    ans: '4 30',
    exp: 'The totals are 1, 5, 14, 30. The condition is only checked at the top of the loop, so the total overshoots 20 before the loop stops.' },

  { id: 'L4-21', lec: 4, topic: 'Input', d: 1, type: 'mcq',
    t: 'Converting input',
    q: 'The user types `3.5` at the prompt. What happens?',
    code: `
      n = int(input('Enter: '))`,
    opts: ['ValueError', 'n is 3', 'n is 3.5', 'n is \'3.5\''],
    ans: 0,
    verifyOnly: true,
    verify: "try:\n    int('3.5')\n    raise AssertionError('expected ValueError')\nexcept ValueError:\n    pass",
    exp: '`input` returns the string `\'3.5\'`. `int()` cannot parse a string with a decimal point, so it raises `ValueError`. `int(float(\'3.5\'))` would give 3.' },

  { id: 'L4-22', lec: 4, topic: 'for loops', d: 2, type: 'out',
    t: 'Building a string',
    code: `
      s = ''
      for c in 'abcde':
          s = c + s if c in 'ace' else s + c
      print(s)`,
    ans: 'ecabd',
    exp: 'Vowels a, c, e go to the front and the others to the back: a → ab → cab → cabd → ecabd.' },

  { id: 'L4-23', lec: 4, topic: 'while loops', d: 2, type: 'fib',
    t: 'Primality test',
    q: 'Complete `is_prime(n)`. Any loop condition that tries enough divisors is accepted.',
    code: `
      def is_prime(n):
          if n < 2:
              return False
          d = 2
          while {{1}}:
              if n % d == 0:
                  return False
              d += 1
          return True`,
    blanks: [['d * d <= n', 'd ** 2 <= n', 'd < n', 'd <= n - 1', 'd <= n // 2', 'd <= n ** 0.5']],
    test: 'def brute(n):\n    return n >= 2 and all(n % k for k in range(2, n))\nfor n in range(60):\n    assert is_prime(n) == brute(n), n',
    exp: 'Trying every `d` below `n` works. Stopping at √n (`d * d <= n`) is enough and much faster, because any factor above √n pairs with one below it.' },

  { id: 'L4-24', lec: 4, topic: 'Statements', d: 1, type: 'mcq',
    t: 'Statement or expression?',
    q: 'Which of these is a **statement** that does not evaluate to a value?',
    optCode: true,
    opts: ['x = 5', 'x + 5', 'lambda x: x', 'max(3, 4)'],
    ans: 0,
    exp: 'An assignment changes program state and has no value. The others are expressions, and a `lambda` expression evaluates to a function object.' },

  { id: 'L4-25', lec: 4, topic: 'for loops', d: 2, type: 'out',
    t: 'Alternating signs',
    code: `
      res = 0
      for i in range(4):
          res += (-1) ** i * i
      print(res)`,
    ans: '-2',
    exp: 'The terms are `0, -1, +2, -3`, which add up to -2.' },

  { id: 'L4-26', lec: 4, topic: 'Nested loops', d: 3, type: 'out',
    t: 'Nested loops with a running total',
    code: `
      def sum_table(r, c):
          s = 0
          for i in range(1, r + 1):
              for j in range(1, c + 1):
                  s = s + i * j
          return s

      print(sum_table(3, 4))`,
    ans: '60',
    exp: 'The sum factorises as (1+2+3) × (1+2+3+4) = 6 × 10 = 60.' },

  { id: 'L4-27', lec: 4, topic: 'while loops', d: 3, type: 'out',
    t: 'Collatz steps',
    code: `
      n, steps = 6, 0
      while n != 1:
          n = n // 2 if n % 2 == 0 else 3 * n + 1
          steps += 1
      print(steps)`,
    ans: '8',
    exp: '6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 takes 8 steps.' },

  { id: 'L4-28', lec: 4, topic: 'Selection', d: 2, type: 'out',
    t: 'if, then a separate if/elif/else',
    code: `
      x, y = 15, 0
      if x > 10:
          y += 1
      if x > 12:
          y += 2
      elif x > 5:
          y += 4
      else:
          y += 8
      print(y)`,
    ans: '3',
    exp: 'The first `if` stands on its own and adds 1. The second statement is a fresh `if/elif/else`, where only the first true branch runs (`x > 12`), adding 2.' },

  { id: 'L4-29', lec: 4, topic: 'while loops', d: 1, type: 'out',
    t: 'Two counters meeting',
    code: `
      a, b = 0, 20
      while a < b:
          a += 3
          b -= 2
      print(a, b)`,
    ans: '12 12',
    exp: '(3, 18) → (6, 16) → (9, 14) → (12, 12). Now `a < b` is false.' },

  { id: 'L4-30', lec: 4, topic: 'for loops', d: 1, type: 'out',
    t: 'Comparing strings position by position',
    code: `
      s, t = 'CODING', 'CODERS'
      r = ''
      for i in range(len(s)):
          r += s[i] if s[i] == t[i] else '-'
      print(r)`,
    ans: 'COD---',
    exp: 'The first three characters match. I/E, N/R and G/S differ, so each gives a `-`.' },

  { id: 'L4-31', lec: 4, topic: 'for loops', d: 2, type: 'out',
    t: 'Toggling inside a stepped range',
    code: `
      x = 1
      for i in range(3, 50, 4):
          x = -x
      print(x)`,
    ans: '1',
    exp: 'The range is 3, 7, …, 47, which is (47 − 3) / 4 + 1 = 12 values. An even number of sign flips brings `x` back to 1.' },

  { id: 'L4-32', lec: 4, topic: 'Nested loops', d: 2, type: 'fib',
    t: 'Count pairs that sum to x',
    q: 'Complete `count_pairs(L, x)`, which counts the pairs of **different positions** i < j with `L[i] + L[j] == x`, e.g. `count_pairs([1, 2, 3, 4, 5], 6)` is `2`.',
    code: `
      def count_pairs(L, x):
          c = 0
          for i in range(len(L)):
              for j in range({{1}}, len(L)):
                  if L[i] + L[j] == x:
                      c += 1
          return c`,
    blanks: [['i + 1', '1 + i']],
    test: 'assert count_pairs([1, 2, 3, 4, 5], 6) == 2\nassert count_pairs([3, 3], 6) == 1\nassert count_pairs([3], 6) == 0',
    exp: 'Starting `j` at `i + 1` counts each pair exactly once and never pairs an element with itself. Starting at 0 would count (1, 5) and (5, 1) separately, and `3 + 3` for a single 3.' },

  { id: 'L4-33', lec: 4, topic: 'Return in loops', d: 2, type: 'out',
    t: 'Returning from a nested loop',
    code: `
      def find(M, v):
          for i in range(len(M)):
              for j in range(len(M[i])):
                  if M[i][j] == v:
                      return (i, j)
          return None

      print(find([[1, 2], [3, 2]], 2), find([[1]], 5))`,
    ans: '(0, 1) None',
    exp: '`return` leaves **both** loops at once, at the first match in row-by-row order. If nothing matches, both loops finish and `None` is returned.' },

  { id: 'L4-34', lec: 4, topic: 'while loops', d: 3, type: 'out',
    t: 'Halving and incrementing',
    code: `
      n, steps = 37, 0
      while n > 0:
          if n % 2:
              n -= 1
          else:
              n //= 2
          steps += 1
      print(steps)`,
    ans: '8',
    exp: '37 → 36 → 18 → 9 → 8 → 4 → 2 → 1 → 0 is 8 steps. Odd numbers lose 1 and even numbers are halved.' },

  { id: 'L4-35', lec: 4, topic: 'Nested loops', d: 1, type: 'fib',
    t: 'Right-aligned staircase',
    q: '`staircase(n)` prints a right-aligned staircase of `#`. For example, `staircase(3)` prints:',
    code: `
      def staircase(n):
          for i in range(1, n + 1):
              print({{1}})`,
    q2: 'Output of `staircase(3)` (dots stand for spaces): `..#`, `.##`, `###`.',
    blanks: [["' ' * (n - i) + '#' * i", "' ' * (n - i) + i * '#'", "(n - i) * ' ' + '#' * i"]],
    test: "staircase(3)\nassert OUT() == '  #\\n ##\\n###\\n', repr(OUT())",
    exp: 'Row `i` has `i` hashes, padded on the left by `n - i` spaces so that every row is `n` characters wide.' },

  { id: 'L4-36', lec: 4, topic: 'Selection', d: 1, type: 'fib',
    t: 'FizzBuzz order of tests',
    q: 'Complete `fizz(n)`: return `\'FizzBuzz\'` for multiples of both 3 and 5, `\'Fizz\'` for multiples of 3, `\'Buzz\'` for multiples of 5, and otherwise the number as a string.',
    code: `
      def fizz(n):
          if {{1}}:
              return 'FizzBuzz'
          elif n % 3 == 0:
              return 'Fizz'
          elif n % 5 == 0:
              return 'Buzz'
          return str(n)`,
    blanks: [['n % 15 == 0', 'n % 3 == 0 and n % 5 == 0', 'n % 5 == 0 and n % 3 == 0', 'not n % 15']],
    test: "assert [fizz(i) for i in (1, 3, 5, 15, 30, 7)] == ['1', 'Fizz', 'Buzz', 'FizzBuzz', 'FizzBuzz', '7']",
    exp: 'The combined case must be tested **first**. Otherwise 15 would stop at the `n % 3 == 0` branch and return `Fizz`.' },

  { id: 'L4-37', lec: 4, topic: 'for loops', d: 3, type: 'fib',
    t: 'Second largest distinct value',
    q: '`second_largest(t)` returns the second largest **distinct** value in `t`, or `None` if there is none, without sorting. E.g. `(3, 7, 7, 5)` gives `5`. Complete the update when a new maximum is found.',
    code: `
      def second_largest(t):
          first = second = None
          for x in t:
              if first is None or x > first:
                  {{1}}
              elif x != first and (second is None or x > second):
                  second = x
          return second`,
    blanks: [['first, second = x, first', 'second, first = first, x', 'second = first; first = x']],
    test: 'assert second_largest((3, 7, 7, 5)) == 5\nassert second_largest((4, 4)) is None\nassert second_largest((1, 2, 3)) == 2\nassert second_largest((5, 1)) == 1',
    exp: 'When a new maximum arrives, the old maximum is pushed down to second place. Tuple assignment does both at once. Doing `first = x` first would overwrite the value that `second` needs.' },

  { id: 'L4-38', lec: 4, topic: 'for loops', d: 3, type: 'fib',
    t: 'Maximum subarray sum (Kadane)',
    q: '`max_sub(t)` returns the largest sum of any non-empty run of **consecutive** elements, e.g. `(-2, 1, -3, 4, -1, 2, 1, -5, 4)` gives `6` (from `4, -1, 2, 1`). Complete the single pass.',
    code: `
      def max_sub(t):
          best = cur = t[0]
          for x in t[1:]:
              cur = {{1}}
              best = {{2}}
          return best`,
    blanks: [['max(x, cur + x)', 'max(cur + x, x)', 'x if x > cur + x else cur + x'], ['max(best, cur)', 'max(cur, best)']],
    test: 'assert max_sub((-2, 1, -3, 4, -1, 2, 1, -5, 4)) == 6\nassert max_sub((-3, -1, -2)) == -1\nassert max_sub((5,)) == 5',
    exp: '`cur` is the best sum of a run that **ends at x**: either extend the previous run or start fresh at `x`. `best` remembers the largest `cur` seen so far. This takes one pass instead of trying every pair of start and end.' },

  { id: 'L4-39', lec: 4, topic: 'for loops', d: 2, type: 'fib',
    t: 'Longest run of equal characters',
    q: 'Complete `longest_run(s)` for a non-empty string, e.g. `longest_run(\'aabbbc\')` is `3`.',
    code: `
      def longest_run(s):
          best = cur = 1
          for i in range(1, len(s)):
              if s[i] == s[i - 1]:
                  cur += 1
              else:
                  {{1}}
              best = max(best, cur)
          return best`,
    blanks: [['cur = 1']],
    test: "assert longest_run('aabbbc') == 3\nassert longest_run('a') == 1\nassert longest_run('abc') == 1\nassert longest_run('xxxxy') == 4",
    exp: 'A character that differs from its neighbour starts a new run of length 1.' },

  { id: 'L4-40', lec: 4, topic: 'while loops', d: 2, type: 'fib',
    t: 'Lowest common multiple',
    q: 'Complete `lcm(a, b)` for positive integers. It tries multiples of the larger number until one is divisible by both.',
    code: `
      def lcm(a, b):
          m = max(a, b)
          while {{1}}:
              m += max(a, b)
          return m`,
    blanks: [['m % a != 0 or m % b != 0', 'm % b != 0 or m % a != 0', 'not (m % a == 0 and m % b == 0)', 'm % a or m % b']],
    test: 'assert lcm(4, 6) == 12\nassert lcm(5, 5) == 5\nassert lcm(7, 3) == 21\nassert lcm(1, 9) == 9',
    exp: 'Keep going **while** `m` fails at least one of the two divisibility tests, i.e. `or`. Writing `and` would stop as soon as **either** one divides `m`.' },

  { id: 'L4-41', lec: 4, topic: 'while loops', d: 1, type: 'fib',
    t: 'Palindrome number without strings',
    q: 'Complete `is_pal_num(n)` for `n ≥ 0`, e.g. `12321` gives `True`, without converting to a string.',
    code: `
      def is_pal_num(n):
          orig, rev = n, 0
          while n > 0:
              rev = rev * 10 + n % 10
              n //= 10
          return {{1}}`,
    blanks: [['rev == orig', 'orig == rev']],
    test: 'assert is_pal_num(12321) and is_pal_num(7) and is_pal_num(0)\nassert not is_pal_num(123) and not is_pal_num(10)',
    exp: 'The loop builds the reversed number. Compare it with a **saved copy** of the input, because `n` itself has been reduced to 0 by then.' },

  { id: 'L4-42', lec: 4, topic: 'for loops', d: 2, type: 'fib',
    t: 'Balanced parentheses',
    q: 'Complete `balanced(s)`, which checks that the `(` and `)` in `s` are properly matched, e.g. `\'(()())\'` is `True` and `\')(\'` is `False`.',
    code: `
      def balanced(s):
          depth = 0
          for c in s:
              if c == '(':
                  depth += 1
              elif c == ')':
                  depth -= 1
                  if {{1}}:
                      return False
          return {{2}}`,
    blanks: [['depth < 0', 'depth == -1'], ['depth == 0', 'not depth']],
    test: "assert balanced('(()())') and balanced('') and balanced('a(b)c')\nassert not balanced(')(') and not balanced('(()') and not balanced('())(')",
    exp: 'A `)` with nothing open drops the depth below 0, which is an immediate failure. At the end, every `(` must have been closed, so the depth must be back to 0.' },

  { id: 'L4-43', lec: 4, topic: 'Nested loops', d: 1, type: 'fib',
    t: 'Number triangle',
    q: '`tri(3)` should print `1`, `12` and `123` on three lines. Complete it.',
    code: `
      def tri(n):
          for i in range(1, n + 1):
              row = ''
              for j in range(1, i + 1):
                  row += {{1}}
              print(row)`,
    blanks: [['str(j)', 'f"{j}"']],
    test: "tri(3)\nassert OUT() == '1\\n12\\n123\\n', repr(OUT())",
    exp: '`row` is a string, so the number `j` has to be converted with `str` before concatenating. `row += j` would raise `TypeError`.' },

  { id: 'L4-44', lec: 4, topic: 'Nested loops', d: 2, type: 'fib',
    t: 'Counting inversions',
    q: 'An inversion is a pair of positions i < j with `t[i] > t[j]`. Complete `inversions(t)`, e.g. `(4, 1, 3, 2)` has 4.',
    code: `
      def inversions(t):
          c = 0
          for i in range(len(t)):
              for j in range({{1}}, len(t)):
                  if {{2}}:
                      c += 1
          return c`,
    blanks: [['i + 1', '1 + i'], ['t[i] > t[j]', 't[j] < t[i]']],
    test: 'assert inversions((4, 1, 3, 2)) == 4\nassert inversions((1, 2, 3)) == 0\nassert inversions((3, 2, 1)) == 3',
    exp: 'Each pair is checked once with `j` after `i`. The count of inversions is exactly how many swaps bubble sort makes (Lecture 10).' },

  { id: 'L4-45', lec: 4, topic: 'while loops', d: 3, type: 'out',
    t: 'A while loop that skips ahead',
    code: `
      i, s = 0, ''
      while i < 10:
          if i % 3 == 0:
              s += 'a'
          elif i % 3 == 1:
              i += 1
          else:
              s += 'b'
          i += 1
      print(s)`,
    ans: 'aaaa',
    exp: 'Whenever `i % 3 == 1`, `i` goes up by 2 in that pass and skips the value with remainder 2. The loop visits 0, 1, 3, 4, 6, 7, 9 and never reaches the `b` branch.' },

  { id: 'L4-46', lec: 4, topic: 'Return in loops', d: 2, type: 'out',
    t: 'Returning from inside a nested loop',
    code: `
      def f(n):
          total = 0
          for i in range(n):
              for j in range(i, n):
                  if (i + j) % 4 == 3:
                      return total
                  total += j
          return total

      print(f(5))`,
    ans: '3',
    exp: 'With i = 0, j goes 0, 1, 2 (total becomes 0 + 1 + 2 = 3). At j = 3, `(0 + 3) % 4 == 3`, so the function returns at once and the outer loop never continues.' },

  { id: 'L4-47', lec: 4, topic: 'Selection', d: 2, type: 'out',
    t: 'Short-circuit inside if/elif',
    code: `
      x, y = 7, 0
      if x % 2 and x > 5:
          y += 1
      if x > 6 or x / 0:
          y += 10
      elif x > 2:
          y += 100
      else:
          y += 1000
      print(y)`,
    ans: '11',
    exp: '`x % 2` is 1 (truthy) and `7 > 5`, so `y` becomes 1. In the second `if`, `x > 6` is already true, so `or` never evaluates `x / 0` and there is no error. Only the `+10` branch runs.' },

  { id: 'L4-48', lec: 4, topic: 'for loops', d: 2, type: 'out',
    t: 'Swapping pairs into the front',
    code: `
      s = 'abcdef'
      r = ''
      for i in range(0, len(s), 2):
          r = s[i + 1] + s[i] + r
      print(r)`,
    ans: 'fedcba',
    exp: 'Each pair goes in swapped (`ba`, `dc`, `fe`) and is put **in front** of what was built before. Together that reverses the whole string.' }
]);
