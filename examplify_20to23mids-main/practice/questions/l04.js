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
      print(x, y)` },

  { id: 'L4-02', lec: 4, topic: 'Assignment', d: 2, type: 'out',
    t: 'Compound assignment',
    code: `
      x = 1
      x += x * 2
      x *= x - 1
      print(x)` },

  { id: 'L4-03', lec: 4, topic: 'Output', d: 1, type: 'mcq', optCode: true,
    t: 'print with end',
    q: 'What is printed?',
    code: `
      print(1, 2, end='!')
      print(3)` },

  { id: 'L4-04', lec: 4, topic: 'Output', d: 1, type: 'out',
    t: 'f-strings',
    code: `
      n = 7
      print(f'{n} squared is {n * n}')` },

  { id: 'L4-05', lec: 4, topic: 'Return values', d: 1, type: 'mcq', optCode: true,
    t: 'A function that only prints',
    q: 'What is printed?',
    code: `
      def show(x):
          print(x * 2)

      y = show(4)
      print(y)` },

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

      print(grade(90) + grade(60) + grade(10))` },

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
      print(x)` },

  { id: 'L4-08', lec: 4, topic: 'for loops', d: 1, type: 'out',
    t: 'Loop variable after the loop',
    code: `
      s = 0
      for i in range(1, 10, 3):
          s += i
      print(s, i)` },

  { id: 'L4-09', lec: 4, topic: 'while loops', d: 1, type: 'out',
    t: 'Repeated integer division',
    code: `
      n = 100
      count = 0
      while n > 1:
          n //= 3
          count += 1
      print(n, count)` },

  { id: 'L4-10', lec: 4, topic: 'for loops', d: 1, type: 'out',
    t: 'Printing a pattern',
    q: 'What is printed? (Type each line on its own line.)',
    code: `
      for i in range(3):
          print('*' * i + '#' * (3 - i))` },

  { id: 'L4-11', lec: 4, topic: 'Nested loops', d: 2, type: 'out',
    t: 'Triangular nested loop',
    code: `
      s = 0
      for i in range(1, 4):
          for j in range(i, 4):
              s += 1
      print(s)` },

  { id: 'L4-12', lec: 4, topic: 'for loops', d: 2, type: 'mcq',
    t: 'Changing the loop variable',
    q: 'What is printed?',
    code: `
      for i in range(5):
          i += 2
          print(i, end=' ')` },

  { id: 'L4-13', lec: 4, topic: 'Return in loops', d: 1, type: 'out',
    t: 'Return from inside a loop',
    code: `
      def first_neg(t):
          for x in t:
              if x < 0:
                  return x
          return 0

      print(first_neg((3, -1, -5)), first_neg((2, 4)))` },

  { id: 'L4-14', lec: 4, topic: 'Return in loops', d: 2, type: 'out',
    t: 'Returning too early',
    code: `
      def all_pos(t):
          for x in t:
              if x > 0:
                  return True
              else:
                  return False

      print(all_pos((1, -2, 3)), all_pos((-1, 2)))` },

  { id: 'L4-15', lec: 4, topic: 'for loops', d: 1, type: 'fib',
    t: 'Maximum of a tuple',
    q: 'Complete `max_n(t)`, which returns the largest element of a non-empty tuple.',
    code: `
      def max_n(t):
          m = t[0]
          for i in range(1, len(t)):
              if {{1}}:
                  m = t[i]
          return m` },

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
          return p` },

  { id: 'L4-17', lec: 4, topic: 'while loops', d: 1, type: 'fib',
    t: 'Sum of digits',
    q: 'Complete `digit_sum(n)` for a non-negative integer `n`, e.g. `digit_sum(9045)` is `18`.',
    code: `
      def digit_sum(n):
          s = 0
          while n > 0:
              s += {{1}}
              n = {{2}}
          return s` },

  { id: 'L4-18', lec: 4, topic: 'while loops', d: 2, type: 'fib',
    t: 'Reverse an integer',
    q: 'Complete `reverse_num(n)`, e.g. `reverse_num(1230)` is `321`.',
    code: `
      def reverse_num(n):
          r = 0
          while n > 0:
              r = {{1}}
              n //= 10
          return r` },

  { id: 'L4-19', lec: 4, topic: 'Nested loops', d: 1, type: 'out',
    t: 'Counting pairs',
    code: `
      c = 0
      for i in range(4):
          for j in range(4):
              if i < j:
                  c += 1
      print(c)` },

  { id: 'L4-20', lec: 4, topic: 'while loops', d: 2, type: 'out',
    t: 'Sum of squares until 20',
    code: `
      i, total = 0, 0
      while total < 20:
          i += 1
          total += i * i
      print(i, total)` },

  { id: 'L4-21', lec: 4, topic: 'Input', d: 1, type: 'mcq',
    t: 'Converting input',
    q: 'The user types `3.5` at the prompt. What happens?',
    code: `
      n = int(input('Enter: '))` },

  { id: 'L4-22', lec: 4, topic: 'for loops', d: 2, type: 'out',
    t: 'Building a string',
    code: `
      s = ''
      for c in 'abcde':
          s = c + s if c in 'ace' else s + c
      print(s)` },

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
          return True` },

  { id: 'L4-24', lec: 4, topic: 'Statements', d: 1, type: 'mcq', optCode: true,
    t: 'Statement or expression?',
    q: 'Which of these is a **statement** that does not evaluate to a value?' },

  { id: 'L4-25', lec: 4, topic: 'for loops', d: 2, type: 'out',
    t: 'Alternating signs',
    code: `
      res = 0
      for i in range(4):
          res += (-1) ** i * i
      print(res)` },

  { id: 'L4-26', lec: 4, topic: 'Nested loops', d: 3, type: 'out',
    t: 'Nested loops with a running total',
    code: `
      def sum_table(r, c):
          s = 0
          for i in range(1, r + 1):
              for j in range(1, c + 1):
                  s = s + i * j
          return s

      print(sum_table(3, 4))` },

  { id: 'L4-27', lec: 4, topic: 'while loops', d: 3, type: 'out',
    t: 'Collatz steps',
    code: `
      n, steps = 6, 0
      while n != 1:
          n = n // 2 if n % 2 == 0 else 3 * n + 1
          steps += 1
      print(steps)` },

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
      print(y)` },

  { id: 'L4-29', lec: 4, topic: 'while loops', d: 1, type: 'out',
    t: 'Two counters meeting',
    code: `
      a, b = 0, 20
      while a < b:
          a += 3
          b -= 2
      print(a, b)` },

  { id: 'L4-30', lec: 4, topic: 'for loops', d: 1, type: 'out',
    t: 'Comparing strings position by position',
    code: `
      s, t = 'CODING', 'CODERS'
      r = ''
      for i in range(len(s)):
          r += s[i] if s[i] == t[i] else '-'
      print(r)` },

  { id: 'L4-31', lec: 4, topic: 'for loops', d: 2, type: 'out',
    t: 'Toggling inside a stepped range',
    code: `
      x = 1
      for i in range(3, 50, 4):
          x = -x
      print(x)` },

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
          return c` },

  { id: 'L4-33', lec: 4, topic: 'Return in loops', d: 2, type: 'out',
    t: 'Returning from a nested loop',
    code: `
      def find(M, v):
          for i in range(len(M)):
              for j in range(len(M[i])):
                  if M[i][j] == v:
                      return (i, j)
          return None

      print(find([[1, 2], [3, 2]], 2), find([[1]], 5))` },

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
      print(steps)` },

  { id: 'L4-35', lec: 4, topic: 'Nested loops', d: 1, type: 'fib',
    t: 'Right-aligned staircase',
    q: '`staircase(n)` prints a right-aligned staircase of `#`. For example, `staircase(3)` prints:',
    code: `
      def staircase(n):
          for i in range(1, n + 1):
              print({{1}})`,
    q2: 'Output of `staircase(3)` (dots stand for spaces): `..#`, `.##`, `###`.' },

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
          return str(n)` },

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
          return second` },

  { id: 'L4-38', lec: 4, topic: 'for loops', d: 3, type: 'fib',
    t: 'Maximum subarray sum (Kadane)',
    q: '`max_sub(t)` returns the largest sum of any non-empty run of **consecutive** elements, e.g. `(-2, 1, -3, 4, -1, 2, 1, -5, 4)` gives `6` (from `4, -1, 2, 1`). Complete the single pass.',
    code: `
      def max_sub(t):
          best = cur = t[0]
          for x in t[1:]:
              cur = {{1}}
              best = {{2}}
          return best` },

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
          return best` },

  { id: 'L4-40', lec: 4, topic: 'while loops', d: 2, type: 'fib',
    t: 'Lowest common multiple',
    q: 'Complete `lcm(a, b)` for positive integers. It tries multiples of the larger number until one is divisible by both.',
    code: `
      def lcm(a, b):
          m = max(a, b)
          while {{1}}:
              m += max(a, b)
          return m` },

  { id: 'L4-41', lec: 4, topic: 'while loops', d: 1, type: 'fib',
    t: 'Palindrome number without strings',
    q: 'Complete `is_pal_num(n)` for `n ≥ 0`, e.g. `12321` gives `True`, without converting to a string.',
    code: `
      def is_pal_num(n):
          orig, rev = n, 0
          while n > 0:
              rev = rev * 10 + n % 10
              n //= 10
          return {{1}}` },

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
          return {{2}}` },

  { id: 'L4-43', lec: 4, topic: 'Nested loops', d: 1, type: 'fib',
    t: 'Number triangle',
    q: '`tri(3)` should print `1`, `12` and `123` on three lines. Complete it.',
    code: `
      def tri(n):
          for i in range(1, n + 1):
              row = ''
              for j in range(1, i + 1):
                  row += {{1}}
              print(row)` },

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
          return c` },

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
      print(s)` },

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

      print(f(5))` },

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
      print(y)` },

  { id: 'L4-48', lec: 4, topic: 'for loops', d: 2, type: 'out',
    t: 'Swapping pairs into the front',
    code: `
      s = 'abcdef'
      r = ''
      for i in range(0, len(s), 2):
          r = s[i + 1] + s[i] + r
      print(r)` }
]);
