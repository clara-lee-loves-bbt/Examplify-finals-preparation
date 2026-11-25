/* Lecture 3 — Sequences & iterables: lambda, tuples, slicing, strings,
   map / filter / reduce, range, higher-order functions */
practice([
  { id: 'L3-01', lec: 3, topic: 'Slicing', d: 1, type: 'out',
    t: 'Slice with a step',
    code: `
      t = (3, 8, 1, 9, 4, 7)
      print(t[1:5:2])` },

  { id: 'L3-02', lec: 3, topic: 'Slicing', d: 1, type: 'out',
    t: 'Reverse slice with step -2',
    code: `
      t = (3, 8, 1, 9, 4, 7)
      print(t[::-2])` },

  { id: 'L3-03', lec: 3, topic: 'Slicing', d: 2, type: 'out',
    t: 'Right-to-left slice',
    code: `
      t = (3, 8, 1, 9, 4, 7)
      print(t[4:1:-1])` },

  { id: 'L3-04', lec: 3, topic: 'Slicing', d: 2, type: 'mcq',
    t: 'Empty slice',
    q: 'What is printed?',
    code: `
      t = (3, 8, 1, 9, 4, 7)
      print(t[1:4:-1])` },

  { id: 'L3-05', lec: 3, topic: 'Strings', d: 1, type: 'out',
    t: 'String slices',
    code: `
      s = 'programming'
      print(s[-3:] + s[:2])` },

  { id: 'L3-06', lec: 3, topic: 'Tuples', d: 1, type: 'mcq',
    t: 'Tuple immutability',
    q: 'What happens?',
    code: `
      t = (1, 2, 3)
      t[0] = 9
      print(t)` },

  { id: 'L3-07', lec: 3, topic: 'Tuples', d: 1, type: 'out',
    t: 'Joining tuples',
    code: `
      print((1, 2) * 2 + (3,))` },

  { id: 'L3-08', lec: 3, topic: 'Tuples', d: 2, type: 'mcq',
    t: '(5) versus (5,)',
    q: 'What is printed?',
    code: `
      x = (5)
      y = (5,)
      print(x * 2, y * 2)` },

  { id: 'L3-09', lec: 3, topic: 'Characters', d: 1, type: 'out',
    t: 'ord and chr',
    code: `
      print(chr(ord('a') + 3) + chr(ord('Z') - 1))` },

  { id: 'L3-10', lec: 3, topic: 'Characters', d: 1, type: 'out',
    t: 'Digit characters',
    code: `
      print(ord('7') - ord('0') + int('7'))` },

  { id: 'L3-11', lec: 3, topic: 'Strings', d: 2, type: 'mcq',
    t: 'Lexicographic ordering',
    q: 'What is printed?',
    code: `
      print('Apple' < 'apple', '10' < '9', 10 < 9)` },

  { id: 'L3-12', lec: 3, topic: 'map', d: 1, type: 'out',
    t: 'map with a lambda',
    code: `
      print(tuple(map(lambda x: x * x, range(1, 5))))` },

  { id: 'L3-13', lec: 3, topic: 'filter', d: 1, type: 'mcq', optCode: true,
    t: 'filter over a string',
    q: 'What is printed?',
    code: `
      print(tuple(filter(lambda c: c in 'aeiou', 'education')))` },

  { id: 'L3-14', lec: 3, topic: 'reduce', d: 2, type: 'out',
    t: 'reduce building a number',
    code: `
      from functools import reduce
      print(reduce(lambda acc, x: acc * 10 + x, (3, 0, 7), 0))` },

  { id: 'L3-15', lec: 3, topic: 'reduce', d: 2, type: 'out',
    t: 'reduce is left to right',
    code: `
      from functools import reduce
      print(reduce(lambda x, y: x - y, (10, 3, 2, 1)))` },

  { id: 'L3-16', lec: 3, topic: 'reduce', d: 2, type: 'mcq',
    t: 'reduce that reverses',
    q: 'What is printed?',
    code: `
      from functools import reduce
      print(reduce(lambda a, b: b + a, 'abc', ''))` },

  { id: 'L3-17', lec: 3, topic: 'reduce', d: 3, type: 'mcq',
    t: 'reduce on an empty tuple',
    q: 'What happens?',
    code: `
      from functools import reduce
      print(reduce(lambda x, y: x + y, ()))` },

  { id: 'L3-18', lec: 3, topic: 'range', d: 1, type: 'out',
    t: 'Counting down with range',
    code: `
      print(tuple(range(10, 0, -3)))` },

  { id: 'L3-19', lec: 3, topic: 'range', d: 1, type: 'out',
    t: 'Length of a range',
    code: `
      print(len(range(3, 20, 4)))` },

  { id: 'L3-20', lec: 3, topic: 'Higher-order functions', d: 2, type: 'mcq',
    t: 'twice of twice',
    q: 'What is printed?',
    code: `
      def twice(f):
          return lambda x: f(f(x))

      inc = lambda x: x + 3
      print(twice(twice(inc))(1))` },

  { id: 'L3-21', lec: 3, topic: 'Higher-order functions', d: 2, type: 'out',
    t: 'Function composition',
    code: `
      def compose(f, g):
          return lambda x: f(g(x))

      h = compose(lambda x: x * 2, lambda x: x + 1)
      print(h(5), compose(h, h)(0))` },

  { id: 'L3-22', lec: 3, topic: 'Higher-order functions', d: 2, type: 'fib',
    t: 'Polynomial as a function',
    q: '`poly(p)` takes coefficients from the lowest power upwards and returns the polynomial as a function, e.g. `poly((3, -8, -2, 4))(-2)` gives `-21`. Complete it.',
    code: `
      def poly(p):
          return lambda x: sum({{1}} for i in range(len(p)))` },

  { id: 'L3-23', lec: 3, topic: 'filter', d: 2, type: 'fib',
    t: 'Count uppercase with filter',
    q: 'Complete `count_upper(s)`, which returns how many uppercase letters `s` has, e.g. `count_upper(\'Hello NUS\')` is `4`.',
    code: `
      def count_upper(s):
          return len(tuple(filter({{1}}, s)))` },

  { id: 'L3-24', lec: 3, topic: 'map', d: 2, type: 'fib',
    t: 'π series with map',
    q: 'Complete `p(n)`, the sum of the first `n` terms of 4/1 − 4/3 + 4/5 − …, i.e. term `i` is 4·(−1)^(i−1) / (2i − 1).',
    code: `
      def p(n):
          return sum(map({{1}}, range(1, n + 1)))` },

  { id: 'L3-25', lec: 3, topic: 'range', d: 2, type: 'mcq', optCode: true,
    t: 'Which gives (0, 2, 4, 6)?',
    q: 'Which expression evaluates to `(0, 2, 4, 6)`?' },

  { id: 'L3-26', lec: 3, topic: 'Generator expressions', d: 2, type: 'out',
    t: 'Differences of neighbours',
    code: `
      t = (4, 7, 2, 9)
      print(tuple(t[i] - t[i - 1] for i in range(1, len(t))))` },

  { id: 'L3-27', lec: 3, topic: 'Membership', d: 2, type: 'mcq',
    t: 'in for strings and tuples',
    q: 'What is printed?',
    code: `
      print('101' in 'cs1010e', (1, 0) in (1, 0, 1))` },

  { id: 'L3-28', lec: 3, topic: 'Higher-order functions', d: 2, type: 'mcq',
    t: 'Functions that build functions',
    q: 'What is printed?',
    code: `
      def adder(n):
          return lambda x: x + n

      fs = tuple(map(adder, (1, 2, 3)))
      print(fs[2](10))` },

  { id: 'L3-29', lec: 3, topic: 'Strings', d: 1, type: 'out',
    t: 'String repetition and reversal',
    code: `
      s = 'NUS'
      print(s * 2 + s[::-1])` },

  { id: 'L3-30', lec: 3, topic: 'Iterators', d: 3, type: 'mcq',
    t: 'An exhausted map',
    q: 'What is printed?',
    code: `
      m = map(lambda x: x + 1, (1, 2, 3))
      print(tuple(m), tuple(m))` },

  { id: 'L3-31', lec: 3, topic: 'Generator expressions', d: 3, type: 'out',
    t: 'Two for-clauses',
    code: `
      print(tuple(i * j for i in range(1, 4) for j in range(i)))` },

  { id: 'L3-32', lec: 3, topic: 'reduce', d: 2, type: 'fib',
    t: 'Length with reduce',
    q: 'Complete `length(t)` so it returns the number of elements in `t` using only `reduce`.',
    code: `
      from functools import reduce

      def length(t):
          return reduce({{1}}, t, 0)` },

  { id: 'L3-33', lec: 3, topic: 'Lambda', d: 1, type: 'mcq', optCode: true,
    t: 'Equivalent lambda',
    q: 'Which definition behaves exactly like `f = lambda x, y: x * y + 1`?' },

  { id: 'L3-34', lec: 3, topic: 'Slicing', d: 3, type: 'out',
    t: 'Slices of slices',
    code: `
      s = 'ABCDEFGHIJ'
      print(s[8:2:-2][::-1])` },

  { id: 'L3-35', lec: 3, topic: 'map', d: 3, type: 'out',
    t: 'map over two sequences',
    q: 'Hint: when `map` is given two iterables, it calls the function with one element from each and stops at the shorter one.',
    code: `
      print(tuple(map(lambda a, b: a * b, (1, 2, 3), (4, 5))))` },

  { id: 'L3-36', lec: 3, topic: 'Strings', d: 1, type: 'out',
    t: 'Indexing into a tuple of strings',
    code: `
      print(('abc', 'de')[1][::-1] * 2)` },

  { id: 'L3-37', lec: 3, topic: 'Lambda', d: 3, type: 'mcq',
    t: 'Lambdas built in a loop',
    q: 'What is printed?',
    code: `
      fs = [lambda x: x + i for i in range(3)]
      print(fs[0](10), fs[2](10))` },

  { id: 'L3-38', lec: 3, topic: 'Higher-order functions', d: 2, type: 'out',
    t: 'Passing a function to a lambda',
    code: `
      print((lambda f, x: f(f(x)))(lambda y: y * 3, 2))` },

  { id: 'L3-39', lec: 3, topic: 'reduce', d: 2, type: 'out',
    t: 'reduce as max',
    code: `
      from functools import reduce
      print(reduce(lambda a, b: a if a > b else b, (3, 9, 2, 7)))` },

  { id: 'L3-40', lec: 3, topic: 'reduce', d: 2, type: 'out',
    t: 'reduce building a tuple',
    code: `
      from functools import reduce
      print(reduce(lambda acc, x: acc + (x * 2,), (1, 2, 3), ()))` },

  { id: 'L3-41', lec: 3, topic: 'map / filter', d: 2, type: 'mcq',
    t: 'map over a filter',
    q: 'What is printed?',
    code: `
      print(tuple(map(lambda x: x % 3,
                      filter(lambda x: x % 2, range(10)))))` },

  { id: 'L3-42', lec: 3, topic: 'Slicing', d: 2, type: 'out',
    t: 'Two string slices',
    code: `
      s = 'HelloWorld'
      print(s[::3], s[-1:-4:-1])` },

  { id: 'L3-43', lec: 3, topic: 'Characters', d: 3, type: 'fib',
    t: 'Caesar shift with reduce',
    q: 'Complete `shift(s, k)`, which moves every lowercase letter of `s` forward by `k` places and wraps around after `z`. For example, `shift(\'xyz\', 2)` is `\'zab\'`.',
    code: `
      from functools import reduce

      def shift(s, k):
          return reduce(lambda acc, c: acc + {{1}}, s, '')` },

  { id: 'L3-44', lec: 3, topic: 'Higher-order functions', d: 2, type: 'out',
    t: 'Currying',
    code: `
      def curry(f):
          return lambda x: lambda y: f(x, y)

      sub = curry(lambda a, b: a - b)
      print(sub(10)(3), sub(3)(10))` },

  { id: 'L3-45', lec: 3, topic: 'Strings', d: 2, type: 'mcq',
    t: 'max and min of strings',
    q: 'What is printed?',
    code: `
      print(max('apple', 'Banana', 'cherry'),
            min('10', '9', '100'))` },

  { id: 'L3-46', lec: 3, topic: 'Higher-order functions', d: 3, type: 'fib',
    t: 'Repeat a function n times',
    q: 'Complete `repeat(f, n)`, which returns a function that applies `f` exactly `n` times, e.g. `repeat(lambda x: x * 2, 3)(1)` is `8`.',
    code: `
      def repeat(f, n):
          if n == 0:
              return lambda x: x
          return lambda x: {{1}}` },

  { id: 'L3-47', lec: 3, topic: 'map / filter', d: 2, type: 'fib',
    t: 'Squares of the odd numbers',
    q: 'Complete the one-liner so that `odd_squares((1, 2, 3, 4, 5))` is `(1, 9, 25)`. Use only `map`, `filter` and lambdas.',
    code: `
      def odd_squares(t):
          return tuple(map({{1}}, filter({{2}}, t)))` },

  { id: 'L3-48', lec: 3, topic: 'reduce', d: 1, type: 'fib',
    t: 'Product with reduce',
    q: 'Complete `product(t)` so that `product((2, 3, 4))` is `24` and `product(())` is `1`.',
    code: `
      from functools import reduce

      def product(t):
          return reduce({{1}}, t, {{2}})` },

  { id: 'L3-49', lec: 3, topic: 'Slicing', d: 2, type: 'fib',
    t: 'Rotate a tuple left',
    q: 'Complete `rotate(t, k)` for a non-empty tuple, e.g. `rotate((1, 2, 3, 4, 5), 2)` is `(3, 4, 5, 1, 2)`. `k` may be larger than `len(t)`.',
    code: `
      def rotate(t, k):
          k = k % len(t)
          return {{1}}` },

  { id: 'L3-50', lec: 3, topic: 'Lambda', d: 1, type: 'fib',
    t: 'Palindrome as a lambda',
    q: 'Complete the lambda so that `is_pal(\'level\')` is `True` and `is_pal(\'lever\')` is `False`.',
    code: `
      is_pal = lambda s: {{1}}` },

  { id: 'L3-51', lec: 3, topic: 'Higher-order functions', d: 3, type: 'fib',
    t: 'A pipeline of functions',
    q: '`pipeline(fs)` returns a function that applies the functions in `fs` **in order**, e.g. `pipeline((lambda x: x + 1, lambda x: x * 2))(3)` is `8`. Complete it.',
    code: `
      from functools import reduce

      def pipeline(fs):
          return lambda x: reduce(lambda acc, f: {{1}}, fs, x)` },

  { id: 'L3-52', lec: 3, topic: 'Characters', d: 2, type: 'fib',
    t: 'Letters to alphabet positions',
    q: 'Complete `positions` so that `positions(\'cab\')` is `(3, 1, 2)`. All letters are lowercase.',
    code: `
      positions = lambda s: tuple(map(lambda c: {{1}}, s))` },

  { id: 'L3-53', lec: 3, topic: 'Generator expressions', d: 3, type: 'fib',
    t: 'Interleave two tuples',
    q: 'Complete `interleave(a, b)` for equal-length tuples, e.g. `interleave((1, 2), (3, 4))` is `(1, 3, 2, 4)`.',
    code: `
      def interleave(a, b):
          return tuple(x for i in range(len(a))
                         for x in {{1}})` },

  { id: 'L3-54', lec: 3, topic: 'Slicing', d: 2, type: 'out',
    t: 'Forward and backward steps',
    code: `
      s = 'python'
      print(s[1::2], s[::-2])` },

  { id: 'L3-55', lec: 3, topic: 'Higher-order functions', d: 2, type: 'out',
    t: 'Functions made by map',
    code: `
      def make(n):
          return lambda x: x * n

      fs = tuple(map(make, range(1, 4)))
      print(tuple(f(10) for f in fs))` },

  { id: 'L3-56', lec: 3, topic: 'Slicing', d: 2, type: 'mcq',
    t: 'Out-of-range slices',
    q: 'What is printed?',
    code: `
      t = (1, 2, 3)
      print(t[5:], t[-10:2])` },

  { id: 'L3-57', lec: 3, topic: 'reduce', d: 3, type: 'out',
    t: 'reduce with a pair accumulator',
    code: `
      from functools import reduce
      s, n = reduce(lambda acc, x: (acc[0] + x, acc[1] + 1),
                    (4, 8, 6), (0, 0))
      print(s / n)` },

  { id: 'L3-58', lec: 3, topic: 'Strings', d: 2, type: 'mcq',
    t: 'Chained string comparisons',
    q: 'What is printed?',
    code: `
      print('abc' < 'abd' < 'ab', 'Z' < 'a' < 'z')` }
]);
