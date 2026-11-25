/* Lecture 6 — Objects and mutable sequences: identity, aliasing,
   side effects, pass-by-reference, lists, list comprehension */
practice([
  { id: 'L6-01', lec: 6, topic: 'Aliasing', d: 1, type: 'out',
    t: 'Two names, one list',
    code: `
      a = [1, 2, 3]
      b = a
      b.append(4)
      print(a)` },

  { id: 'L6-02', lec: 6, topic: 'Aliasing', d: 2, type: 'out',
    t: 'Concatenation makes a new list',
    code: `
      a = [1, 2, 3]
      b = a
      b = b + [4]
      print(a, b)` },

  { id: 'L6-03', lec: 6, topic: 'Aliasing', d: 3, type: 'out',
    t: '+= on a list mutates it',
    code: `
      a = [1, 2]
      b = a
      b += [3]
      print(a)` },

  { id: 'L6-04', lec: 6, topic: 'Immutability', d: 2, type: 'mcq',
    t: '+= on a tuple',
    q: 'What is printed?',
    code: `
      a = (1, 2)
      b = a
      b += (3,)
      print(a, b)` },

  { id: 'L6-05', lec: 6, topic: 'Pass-by-reference', d: 2, type: 'out',
    t: 'Mutating versus re-binding a parameter',
    code: `
      def f(lst):
          lst[0] = 99
          lst = [7, 7]
          lst[1] = 0

      x = [1, 2, 3]
      f(x)
      print(x)` },

  { id: 'L6-06', lec: 6, topic: 'Identity', d: 1, type: 'mcq',
    t: 'is versus ==',
    q: 'What is printed?',
    code: `
      a = [1, 2]
      b = [1, 2]
      c = a
      print(a == b, a is b, a is c)` },

  { id: 'L6-07', lec: 6, topic: 'List comprehension', d: 1, type: 'out',
    t: 'Comprehension with a condition',
    code: `
      print([i ** 2 for i in range(10) if i % 3 == 0])` },

  { id: 'L6-08', lec: 6, topic: 'List comprehension', d: 1, type: 'out',
    t: 'Comprehension over a string',
    code: `
      print([c * 2 for c in 'abc' if c != 'b'])` },

  { id: 'L6-09', lec: 6, topic: 'Copying', d: 1, type: 'mcq',
    t: 'Copy with a full slice',
    q: 'What is printed?',
    code: `
      a = [1, 2, 3]
      b = a[:]
      b[0] = 10
      print(a[0], b[0], a == b)` },

  { id: 'L6-10', lec: 6, topic: 'Slice assignment', d: 2, type: 'out',
    t: 'Slice assignment can grow a list',
    code: `
      lst = [1, 2, 3, 4]
      lst[1:3] = [9, 9, 9]
      print(lst, len(lst))` },

  { id: 'L6-11', lec: 6, topic: 'Unpacking', d: 2, type: 'out',
    t: 'Starred arguments',
    code: `
      def f(a, b, c):
          return a * 100 + b * 10 + c

      t = (4, 5, 6)
      print(f(*t), f(1, *t[1:]))` },

  { id: 'L6-12', lec: 6, topic: 'Euler method', d: 2, type: 'fib',
    t: 'Forward Euler step',
    q: 'Complete the forward Euler method: walk from (tᵢ, yᵢ) to (tᵢ₊₁, yᵢ₊₁) along the slope `f(t[i])`.',
    code: `
      def eulerf(f, t, y0):
          y = [y0] + [0] * (len(t) - 1)
          for i in range(len(t) - 1):
              y[i + 1] = {{1}}
          return y` },

  { id: 'L6-13', lec: 6, topic: 'List methods', d: 2, type: 'out',
    t: 'sort returns None',
    code: `
      a = [3, 1, 2]
      b = a.sort()
      print(a, b)` },

  { id: 'L6-14', lec: 6, topic: 'Aliasing', d: 3, type: 'mcq', optCode: true,
    t: 'Repeating a list of lists',
    q: 'What is printed?',
    code: `
      x = [0] * 3
      y = [x] * 2
      y[0][1] = 5
      print(y)` },

  { id: 'L6-15', lec: 6, topic: 'Side effects', d: 1, type: 'out',
    t: 'A function that mutates its argument',
    code: `
      def double_all(lst):
          for i in range(len(lst)):
              lst[i] *= 2

      a = [1, 2, 3]
      b = double_all(a)
      print(a, b)` },

  { id: 'L6-16', lec: 6, topic: 'Side effects', d: 2, type: 'mcq',
    t: 'Re-binding the loop variable',
    q: 'What is printed?',
    code: `
      a = [1, 2, 3]
      for x in a:
          x = x * 10
      print(a)` },

  { id: 'L6-17', lec: 6, topic: 'List comprehension', d: 2, type: 'out',
    t: 'Conditional expression inside a comprehension',
    code: `
      print([x if x % 2 else -x for x in range(5)])` },

  { id: 'L6-18', lec: 6, topic: 'List comprehension', d: 1, type: 'fib',
    t: 'Square the even numbers',
    q: 'Complete the comprehension so `evens_squared([1, 2, 3, 4])` returns `[4, 16]`.',
    code: `
      def evens_squared(lst):
          return [{{1}} for x in lst {{2}}]` },

  { id: 'L6-19', lec: 6, topic: 'Immutability', d: 1, type: 'mcq',
    t: 'Which type is mutable?',
    q: 'Which of these types is **mutable**?' },

  { id: 'L6-20', lec: 6, topic: 'Aliasing', d: 2, type: 'out',
    t: 'A list inside a tuple',
    code: `
      lst = [1, 2, 3]
      t = (lst, 4)
      lst.append(5)
      print(t)` },

  { id: 'L6-21', lec: 6, topic: 'Immutability', d: 3, type: 'mcq',
    t: 'Mutating inside a tuple',
    q: 'What happens?',
    code: `
      t = ([1], [2])
      t[0].append(3)
      t[1] = [4]
      print(t)` },

  { id: 'L6-22', lec: 6, topic: 'Copying', d: 2, type: 'out',
    t: 'copy() is shallow',
    code: `
      a = [[1, 2], 3]
      b = a.copy()
      b[0][0] = 9
      b[1] = 8
      print(a)` },

  { id: 'L6-23', lec: 6, topic: 'Identity', d: 2, type: 'mcq',
    t: 'Identity after a copy',
    q: 'What is printed?',
    code: `
      lst = [[1], [2]]
      cp = lst.copy()
      print(cp is lst, cp[0] is lst[0], cp == lst)` },

  { id: 'L6-24', lec: 6, topic: 'List comprehension', d: 3, type: 'out',
    t: 'Nested comprehension',
    code: `
      print([[j for j in range(i)] for i in range(4)])` },

  { id: 'L6-25', lec: 6, topic: 'Pass-by-reference', d: 3, type: 'out',
    t: 'Swapping inside a function',
    code: `
      def swap(lst, x, y):
          lst[0], lst[1] = lst[1], lst[0]
          x, y = y, x

      a, b = 1, 2
      L = [a, b]
      swap(L, a, b)
      print(L, a, b)` },

  { id: 'L6-26', lec: 6, topic: 'Side effects', d: 2, type: 'out',
    t: 'A function that grows the caller\'s list',
    code: `
      def add_to(x, acc):
          acc.append(x)
          return len(acc)

      L = []
      a = add_to(1, L)
      b = add_to(2, L)
      M = L
      M = M + [3]
      print(a, b, L, M)` },

  { id: 'L6-27', lec: 6, topic: 'List comprehension', d: 3, type: 'out',
    t: 'Pairs from a filtered double loop',
    code: `
      print([(i, j) for i in range(3)
             for j in range(i) if (i + j) % 2])` }
]);
