/* Lecture 6 — Objects and mutable sequences: identity, aliasing,
   side effects, pass-by-reference, lists, list comprehension */
practice([
  { id: 'L6-01', lec: 6, topic: 'Aliasing', d: 1, type: 'out',
    t: 'Two names, one list',
    code: `
      a = [1, 2, 3]
      b = a
      b.append(4)
      print(a)`,
    ans: '[1, 2, 3, 4]',
    exp: '`b = a` does not copy the list. Both names refer to the same list object, so mutating it through `b` shows up through `a`.' },

  { id: 'L6-02', lec: 6, topic: 'Aliasing', d: 2, type: 'out',
    t: 'Concatenation makes a new list',
    code: `
      a = [1, 2, 3]
      b = a
      b = b + [4]
      print(a, b)`,
    ans: '[1, 2, 3] [1, 2, 3, 4]',
    exp: '`b + [4]` builds a **new** list, and `b` is re-bound to it. The original list, still referred to by `a`, is untouched.' },

  { id: 'L6-03', lec: 6, topic: 'Aliasing', d: 3, type: 'out',
    t: '+= on a list mutates it',
    code: `
      a = [1, 2]
      b = a
      b += [3]
      print(a)`,
    ans: '[1, 2, 3]',
    exp: 'For lists, `b += [3]` extends the **same** list object in place, unlike `b = b + [3]`. So `a` sees the change too.' },

  { id: 'L6-04', lec: 6, topic: 'Immutability', d: 2, type: 'mcq', run: true,
    t: '+= on a tuple',
    q: 'What is printed?',
    code: `
      a = (1, 2)
      b = a
      b += (3,)
      print(a, b)`,
    opts: ['(1, 2) (1, 2, 3)', '(1, 2, 3) (1, 2, 3)', 'TypeError', '(1, 2) (1, 2)'],
    ans: 0,
    exp: 'Tuples are immutable, so `b += (3,)` has to build a new tuple and re-bind `b` to it. `a` still refers to the old tuple.' },

  { id: 'L6-05', lec: 6, topic: 'Pass-by-reference', d: 2, type: 'out',
    t: 'Mutating versus re-binding a parameter',
    code: `
      def f(lst):
          lst[0] = 99
          lst = [7, 7]
          lst[1] = 0

      x = [1, 2, 3]
      f(x)
      print(x)`,
    ans: '[99, 2, 3]',
    exp: 'The parameter `lst` first refers to the caller\'s list, so `lst[0] = 99` changes `x`. After `lst = [7, 7]` the local name refers to a different list, and later changes do not reach `x`.' },

  { id: 'L6-06', lec: 6, topic: 'Identity', d: 1, type: 'mcq', run: true,
    t: 'is versus ==',
    q: 'What is printed?',
    code: `
      a = [1, 2]
      b = [1, 2]
      c = a
      print(a == b, a is b, a is c)`,
    opts: ['True False True', 'True True True', 'False False True', 'True False False'],
    ans: 0,
    exp: '`==` compares contents and `is` compares identity. `a` and `b` are two different lists with equal contents, while `c` is the same object as `a`.' },

  { id: 'L6-07', lec: 6, topic: 'List comprehension', d: 1, type: 'out',
    t: 'Comprehension with a condition',
    code: `
      print([i ** 2 for i in range(10) if i % 3 == 0])`,
    ans: '[0, 9, 36, 81]',
    exp: 'Only i = 0, 3, 6 and 9 pass the `if`, and each is squared.' },

  { id: 'L6-08', lec: 6, topic: 'List comprehension', d: 1, type: 'out',
    t: 'Comprehension over a string',
    code: `
      print([c * 2 for c in 'abc' if c != 'b'])`,
    ans: "['aa', 'cc']",
    exp: 'Each character except `b` is repeated twice. The result is a list of strings.' },

  { id: 'L6-09', lec: 6, topic: 'Copying', d: 1, type: 'mcq', run: true,
    t: 'Copy with a full slice',
    q: 'What is printed?',
    code: `
      a = [1, 2, 3]
      b = a[:]
      b[0] = 10
      print(a[0], b[0], a == b)`,
    opts: ['1 10 False', '10 10 True', '1 10 True', '10 10 False'],
    ans: 0,
    exp: '`a[:]` creates a new list with the same elements, so changing `b[0]` does not affect `a`.' },

  { id: 'L6-10', lec: 6, topic: 'Slice assignment', d: 2, type: 'out',
    t: 'Slice assignment can grow a list',
    code: `
      lst = [1, 2, 3, 4]
      lst[1:3] = [9, 9, 9]
      print(lst, len(lst))`,
    ans: '[1, 9, 9, 9, 4] 5',
    exp: 'The two elements at indices 1 and 2 are replaced by three new ones, so the list grows by one.' },

  { id: 'L6-11', lec: 6, topic: 'Unpacking', d: 2, type: 'out',
    t: 'Starred arguments',
    code: `
      def f(a, b, c):
          return a * 100 + b * 10 + c

      t = (4, 5, 6)
      print(f(*t), f(1, *t[1:]))`,
    ans: '456 156',
    exp: '`*t` unpacks the tuple into separate arguments. In the second call, `*t[1:]` supplies `5, 6` after the explicit `1`.' },

  { id: 'L6-12', lec: 6, topic: 'Euler method', d: 2, type: 'fib',
    t: 'Forward Euler step',
    q: 'Complete the forward Euler method: walk from (tᵢ, yᵢ) to (tᵢ₊₁, yᵢ₊₁) along the slope `f(t[i])`.',
    code: `
      def eulerf(f, t, y0):
          y = [y0] + [0] * (len(t) - 1)
          for i in range(len(t) - 1):
              y[i + 1] = {{1}}
          return y`,
    blanks: [['f(t[i]) * (t[i + 1] - t[i]) + y[i]', 'y[i] + f(t[i]) * (t[i + 1] - t[i])',
              'y[i] + (t[i + 1] - t[i]) * f(t[i])', '(t[i + 1] - t[i]) * f(t[i]) + y[i]']],
    test: 'assert eulerf(lambda x: 2 * x, [1.0, 1.5, 2.0, 2.5, 3.0], 1.0) == [1.0, 2.0, 3.5, 5.5, 8.0]',
    exp: 'Rearranging (yᵢ₊₁ − yᵢ) / (tᵢ₊₁ − tᵢ) = f(tᵢ) gives yᵢ₊₁ = f(tᵢ)·(tᵢ₊₁ − tᵢ) + yᵢ.' },

  { id: 'L6-13', lec: 6, topic: 'List methods', d: 2, type: 'out',
    t: 'sort returns None',
    code: `
      a = [3, 1, 2]
      b = a.sort()
      print(a, b)`,
    ans: '[1, 2, 3] None',
    exp: '`list.sort()` sorts the list **in place** and returns `None`. Use `sorted(a)` if you need a new sorted list.' },

  { id: 'L6-14', lec: 6, topic: 'Aliasing', d: 3, type: 'mcq', run: true, optCode: true,
    t: 'Repeating a list of lists',
    q: 'What is printed?',
    code: `
      x = [0] * 3
      y = [x] * 2
      y[0][1] = 5
      print(y)`,
    opts: ['[[0, 5, 0], [0, 5, 0]]', '[[0, 5, 0], [0, 0, 0]]', '[[5, 5, 5], [0, 0, 0]]', '[[0, 5, 0]]'],
    ans: 0,
    exp: '`[x] * 2` makes a list holding **two references to the same list** `x`. Mutating it through `y[0]` also shows up through `y[1]`.' },

  { id: 'L6-15', lec: 6, topic: 'Side effects', d: 1, type: 'out',
    t: 'A function that mutates its argument',
    code: `
      def double_all(lst):
          for i in range(len(lst)):
              lst[i] *= 2

      a = [1, 2, 3]
      b = double_all(a)
      print(a, b)`,
    ans: '[2, 4, 6] None',
    exp: 'The function changes the caller\'s list through the shared reference, and it returns `None` because there is no `return` statement.' },

  { id: 'L6-16', lec: 6, topic: 'Side effects', d: 2, type: 'mcq', run: true,
    t: 'Re-binding the loop variable',
    q: 'What is printed?',
    code: `
      a = [1, 2, 3]
      for x in a:
          x = x * 10
      print(a)`,
    opts: ['[1, 2, 3]', '[10, 20, 30]', '[10, 2, 3]', 'TypeError'],
    ans: 0,
    exp: '`x = x * 10` only re-binds the local name `x` to a new int, and ints are immutable. The list itself is never mutated, which would need `a[i] = …`.' },

  { id: 'L6-17', lec: 6, topic: 'List comprehension', d: 2, type: 'out',
    t: 'Conditional expression inside a comprehension',
    code: `
      print([x if x % 2 else -x for x in range(5)])`,
    ans: '[0, 1, -2, 3, -4]',
    exp: 'Odd numbers (where `x % 2` is 1, which is truthy) stay as they are, and even numbers are negated. `-0` is just `0`.' },

  { id: 'L6-18', lec: 6, topic: 'List comprehension', d: 1, type: 'fib',
    t: 'Square the even numbers',
    q: 'Complete the comprehension so `evens_squared([1, 2, 3, 4])` returns `[4, 16]`.',
    code: `
      def evens_squared(lst):
          return [{{1}} for x in lst {{2}}]`,
    blanks: [['x ** 2', 'x * x', 'x**2'], ['if x % 2 == 0', 'if not x % 2', 'if x % 2 != 1']],
    test: 'assert evens_squared([1, 2, 3, 4]) == [4, 16]\nassert evens_squared([]) == []',
    exp: 'The expression comes first, then the `for`, then the optional `if` filter.' },

  { id: 'L6-19', lec: 6, topic: 'Immutability', d: 1, type: 'mcq',
    t: 'Which type is mutable?',
    q: 'Which of these types is **mutable**?',
    opts: ['list', 'tuple', 'str', 'int'],
    ans: 0,
    exp: 'Lists can be changed in place. int, float, bool, str and tuple are immutable.' },

  { id: 'L6-20', lec: 6, topic: 'Aliasing', d: 2, type: 'out',
    t: 'A list inside a tuple',
    code: `
      lst = [1, 2, 3]
      t = (lst, 4)
      lst.append(5)
      print(t)`,
    ans: '([1, 2, 3, 5], 4)',
    exp: 'The tuple holds a **reference** to the list. The tuple cannot be changed, but the list it refers to can.' },

  { id: 'L6-21', lec: 6, topic: 'Immutability', d: 3, type: 'mcq', run: true,
    t: 'Mutating inside a tuple',
    q: 'What happens?',
    code: `
      t = ([1], [2])
      t[0].append(3)
      t[1] = [4]
      print(t)`,
    opts: ['TypeError', '([1, 3], [4])', '([1, 3], [2])', '([1], [4])'],
    ans: 0,
    exp: '`t[0].append(3)` is allowed because it mutates the list, not the tuple. `t[1] = [4]` tries to replace an element of the tuple, which raises `TypeError`, so `print` never runs.' },

  { id: 'L6-22', lec: 6, topic: 'Copying', d: 2, type: 'out',
    t: 'copy() is shallow',
    code: `
      a = [[1, 2], 3]
      b = a.copy()
      b[0][0] = 9
      b[1] = 8
      print(a)`,
    ans: '[[9, 2], 3]',
    exp: '`copy()` makes a new outer list, but its elements are the same objects. `b[0][0] = 9` mutates the shared inner list, while `b[1] = 8` only changes `b`\'s own slot.' },

  { id: 'L6-23', lec: 6, topic: 'Identity', d: 2, type: 'mcq', run: true,
    t: 'Identity after a copy',
    q: 'What is printed?',
    code: `
      lst = [[1], [2]]
      cp = lst.copy()
      print(cp is lst, cp[0] is lst[0], cp == lst)`,
    opts: ['False True True', 'False False True', 'True True True', 'False False False'],
    ans: 0,
    exp: 'A copy is a new list object (`is` gives `False`), but it holds the very same element objects (`cp[0] is lst[0]`), so the contents compare equal.' },

  { id: 'L6-24', lec: 6, topic: 'List comprehension', d: 3, type: 'out',
    t: 'Nested comprehension',
    code: `
      print([[j for j in range(i)] for i in range(4)])`,
    ans: '[[], [0], [0, 1], [0, 1, 2]]',
    exp: 'The outer comprehension builds one list per `i`. Row `i` has the numbers `0 … i-1`, and row 0 is empty.' },

  { id: 'L6-25', lec: 6, topic: 'Pass-by-reference', d: 3, type: 'out',
    t: 'Swapping inside a function',
    code: `
      def swap(lst, x, y):
          lst[0], lst[1] = lst[1], lst[0]
          x, y = y, x

      a, b = 1, 2
      L = [a, b]
      swap(L, a, b)
      print(L, a, b)`,
    ans: '[2, 1] 1 2',
    exp: 'Swapping the list\'s elements mutates the caller\'s list. Swapping `x` and `y` only re-binds local names, so the caller\'s `a` and `b` are unchanged.' },

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
      print(a, b, L, M)`,
    ans: '1 2 [1, 2] [1, 2, 3]',
    exp: 'Both calls append to the same list `L`. `M = M + [3]` builds a new list, so `L` stays `[1, 2]`.' },

  { id: 'L6-27', lec: 6, topic: 'List comprehension', d: 3, type: 'out',
    t: 'Pairs from a filtered double loop',
    code: `
      print([(i, j) for i in range(3)
             for j in range(i) if (i + j) % 2])`,
    ans: '[(1, 0), (2, 1)]',
    exp: 'The pairs with j < i are (1,0), (2,0) and (2,1). Only those with an odd sum are kept.' }
]);
