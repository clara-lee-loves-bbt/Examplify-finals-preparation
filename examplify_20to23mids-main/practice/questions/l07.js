/* Lecture 7 — List processing: mutation, del, list methods,
   nested lists, deep processing (deep_count / deep_map / flatten) */
practice([
  { id: 'L7-01', lec: 7, topic: 'del', d: 2, type: 'out',
    t: 'Deleting a stepped slice',
    code: `
      L = [0, 1, 2, 3, 4, 5, 6, 7]
      del L[1::3]
      print(L)`,
    ans: '[0, 2, 3, 5, 6]',
    exp: '`L[1::3]` selects indices 1, 4 and 7, and all three are removed at once.' },

  { id: 'L7-02', lec: 7, topic: 'List methods', d: 1, type: 'out',
    t: 'remove, pop and append',
    code: `
      L = [5, 3, 5, 1]
      L.remove(5)
      x = L.pop()
      L.append(x * 2)
      print(L)`,
    ans: '[3, 5, 2]',
    exp: '`remove(5)` deletes only the **first** 5, leaving `[3, 5, 1]`. `pop()` removes and returns the last element, 1. Then 2 is appended.' },

  { id: 'L7-03', lec: 7, topic: 'List methods', d: 2, type: 'mcq', run: true,
    t: 'Two pops in one expression',
    q: 'What is printed?',
    code: `
      L = ['a', 'b', 'c', 'd']
      print(L.pop(1) + L.pop(1))`,
    opts: ['bc', 'bb', 'bd', 'ac'],
    ans: 0,
    exp: 'The left operand runs first: `pop(1)` removes `b`, leaving `[\'a\', \'c\', \'d\']`. The second `pop(1)` then removes `c`.' },

  { id: 'L7-04', lec: 7, topic: 'List methods', d: 1, type: 'out',
    t: 'append versus extend',
    code: `
      A = [1, 2]
      B = [1, 2]
      A.append([3, 4])
      B.extend([3, 4])
      print(len(A), len(B))`,
    ans: '3 4',
    exp: '`append` adds its argument as **one** element (a nested list). `extend` adds each element of the iterable.' },

  { id: 'L7-05', lec: 7, topic: 'List methods', d: 2, type: 'mcq', run: true, optCode: true,
    t: 'extend with a string',
    q: 'What is printed?',
    code: `
      L = ['x']
      L.extend('ab')
      print(L)`,
    opts: ["['x', 'a', 'b']", "['x', 'ab']", "['xab']", 'TypeError'],
    ans: 0,
    exp: '`extend` takes any iterable and appends each item. A string is iterated character by character.' },

  { id: 'L7-06', lec: 7, topic: 'List methods', d: 2, type: 'out',
    t: 'insert with a negative index',
    code: `
      L = [1, 2, 3]
      L.insert(1, 9)
      L.insert(-1, 8)
      print(L)`,
    ans: '[1, 9, 2, 8, 3]',
    exp: '`insert(i, x)` places `x` **before** index `i`. Index -1 is the last element, so 8 goes just before the 3.' },

  { id: 'L7-07', lec: 7, topic: 'List methods', d: 1, type: 'mcq', run: true,
    t: 'Removing a missing value',
    q: 'What happens?',
    code: `
      L = [1, 2, 3]
      L.remove(4)
      print(L)`,
    opts: ['ValueError', 'IndexError', '[1, 2, 3]', 'KeyError'],
    ans: 0,
    exp: '`remove` looks for a **value**. If the value is not in the list, it raises `ValueError: list.remove(x): x not in list`.' },

  { id: 'L7-08', lec: 7, topic: 'Slice assignment', d: 2, type: 'out',
    t: 'L[1:2] = [] versus L[1] = []',
    code: `
      A = [1, 2, 3]
      B = [1, 2, 3]
      A[1:2] = []
      B[1] = []
      print(A, B)`,
    ans: '[1, 3] [1, [], 3]',
    exp: 'Assigning to a slice **replaces** that slice with the elements of the new list, here none, so the element is removed. Assigning to an index puts the empty list in as one element.' },

  { id: 'L7-09', lec: 7, topic: 'Nested lists', d: 1, type: 'out',
    t: 'len of a nested list',
    code: `
      L = [1, [2, 3], [[4]], []]
      print(len(L), len(L[2]))`,
    ans: '4 1',
    exp: '`len` only counts top-level elements. `L[2]` is `[[4]]`, which has one element.' },

  { id: 'L7-10', lec: 7, topic: 'Nested lists', d: 1, type: 'out',
    t: 'Indexing deep inside',
    code: `
      L = [1, [2, [3, [4, 5]]]]
      print(L[1][1][1][0])`,
    ans: '4',
    exp: '`L[1]` = `[2, [3, [4, 5]]]`, then `[1]` gives `[3, [4, 5]]`, then `[1]` gives `[4, 5]`, and `[0]` gives 4.' },

  { id: 'L7-11', lec: 7, topic: 'Deep processing', d: 2, type: 'out',
    t: 'Tracing deep_count',
    code: `
      def deep_count(lst):
          if not lst:
              return 0
          elif type(lst[0]) != list:
              return 1 + deep_count(lst[1:])
          else:
              return deep_count(lst[0]) + deep_count(lst[1:])

      print(deep_count([[1, [2]], [], 3, [[4, 5]]]))`,
    ans: '5',
    exp: 'deep_count counts the non-list items at any depth: 1, 2, 3, 4, 5. Empty lists contribute nothing.' },

  { id: 'L7-12', lec: 7, topic: 'Deep processing', d: 2, type: 'fib',
    t: 'deep_count',
    q: 'Complete `deep_count`, which counts the data items in a nested list, e.g. `deep_count([1, [2, [3, 4]], [5, 6], [7], 8])` is 8.',
    code: `
      def deep_count(lst):
          if not lst:
              return 0
          elif type(lst[0]) != list:
              return {{1}}
          else:
              return {{2}}`,
    blanks: [['1 + deep_count(lst[1:])', 'deep_count(lst[1:]) + 1'],
             ['deep_count(lst[0]) + deep_count(lst[1:])', 'deep_count(lst[1:]) + deep_count(lst[0])']],
    test: 'assert deep_count([1, [2, [3, 4]], [5, 6], [7], 8]) == 8\nassert deep_count([[], [[]], [[[]]]]) == 0',
    exp: 'A non-list head counts as 1. A list head has to be counted **deeply**, so recurse into it as well as into the tail.' },

  { id: 'L7-13', lec: 7, topic: 'Deep processing', d: 2, type: 'fib',
    t: 'flatten',
    q: 'Complete `flatten`, e.g. `flatten([1, [2, [3, 4]], [5, 6], [7], 8])` is `[1, 2, 3, 4, 5, 6, 7, 8]`.',
    code: `
      def flatten(lst):
          if not lst:
              return []
          elif type(lst[0]) != list:
              return {{1}} + flatten(lst[1:])
          else:
              return {{2}} + flatten(lst[1:])`,
    blanks: [['[lst[0]]', 'lst[:1]', 'lst[0:1]'], ['flatten(lst[0])']],
    test: 'assert flatten([1, [2, [3, 4]], [5, 6], [7], 8]) == [1, 2, 3, 4, 5, 6, 7, 8]\nassert flatten([[[]]]) == []',
    exp: 'Wrap a single item in a list so it can be concatenated. A nested list head is flattened first, so it is **not** wrapped, unlike in deep_map.' },

  { id: 'L7-14', lec: 7, topic: 'Deep processing', d: 2, type: 'fib',
    t: 'Efficient deep_map2',
    q: 'Complete the loop-based `deep_map2`, which applies `func` to every item and keeps the nesting structure.',
    code: `
      def deep_map2(func, lst):
          result = []
          for elem in lst:
              if type(elem) != list:
                  result.append({{1}})
              else:
                  result.append({{2}})
          return result`,
    blanks: [['func(elem)'], ['deep_map2(func, elem)']],
    test: 'assert deep_map2(lambda x: x * x, [1, [2, [3]], [], 4]) == [1, [4, [9]], [], 16]',
    exp: 'An item is transformed directly. A sub-list is mapped recursively, and the resulting list is appended as **one** element, which keeps the structure.' },

  { id: 'L7-15', lec: 7, topic: 'Deep processing', d: 2, type: 'out',
    t: 'Deep sum with a loop',
    code: `
      def deep_sum(lst):
          total = 0
          for e in lst:
              total += deep_sum(e) if type(e) == list else e
          return total

      print(deep_sum([1, [2, [3]], [], [[4]]]))`,
    ans: '10',
    exp: 'Every number at any depth is added: 1 + 2 + 3 + 4. The empty list adds 0.' },

  { id: 'L7-16', lec: 7, topic: 'Deep processing', d: 3, type: 'out',
    t: 'Depth of a nested list',
    code: `
      def depth(x):
          if type(x) != list:
              return 0
          if not x:
              return 1
          return 1 + max(depth(e) for e in x)

      print(depth([1, [2, [3]], []]))`,
    ans: '3',
    exp: 'depth([3]) = 1, depth([2, [3]]) = 2, and depth([]) = 1. The outer list adds one more level to the largest of these: 1 + 2 = 3.' },

  { id: 'L7-17', lec: 7, topic: 'Shallow copy', d: 2, type: 'mcq', run: true, optCode: true,
    t: 'Shallow copy of a nested list',
    q: 'What is printed?',
    code: `
      L = [1, [2, 3]]
      M = L.copy()
      M[0] = 100
      M[1][0] = 200
      print(L)`,
    opts: ['[1, [200, 3]]', '[1, [2, 3]]', '[100, [200, 3]]', '[100, [2, 3]]'],
    ans: 0,
    exp: '`M[0] = 100` replaces a slot in M only. `M[1]` is the **same** inner list as `L[1]`, so changing its element affects both.' },

  { id: 'L7-18', lec: 7, topic: 'List processing', d: 2, type: 'out',
    t: 'Running maximum',
    code: `
      def running_max(lst):
          out = []
          for x in lst:
              out.append(x if not out else max(out[-1], x))
          return out

      print(running_max([3, 1, 4, 1, 5]))`,
    ans: '[3, 3, 4, 4, 5]',
    exp: 'Each position holds the largest value seen so far. The first element is used as it is because `out` is still empty.' },

  { id: 'L7-19', lec: 7, topic: 'List processing', d: 1, type: 'fib',
    t: 'cumulative_sum',
    q: 'Complete `cumulative_sum`, e.g. `cumulative_sum([1, 2, 3, 4])` is `[1, 3, 6, 10]`.',
    code: `
      def cumulative_sum(lst):
          result = []
          total = 0
          for elem in lst:
              {{1}}
              result.append(total)
          return result`,
    blanks: [['total += elem', 'total = total + elem', 'total = elem + total']],
    test: 'assert cumulative_sum([1, 2, 3, 4]) == [1, 3, 6, 10]\nassert cumulative_sum([]) == []',
    exp: 'Update the running total **before** appending it.' },

  { id: 'L7-20', lec: 7, topic: 'List mutation', d: 2, type: 'mcq',
    t: 'Which one creates a new list?',
    q: 'Which statement makes `L` refer to a **new** list object, so `id(L)` changes?',
    optCode: true,
    opts: ['L = L + [x]', 'L.append(x)', 'L += [x]', 'L[len(L):] = [x]'],
    ans: 0,
    verify: 'L = [1]\ni = id(L)\nL.append(2); assert id(L) == i\nL += [3]; assert id(L) == i\nL[len(L):] = [4]; assert id(L) == i\nL = L + [5]; assert id(L) != i',
    exp: '`L + [x]` builds a new list and then re-binds `L` to it. The other three mutate the existing list in place, so its id stays the same.' },

  { id: 'L7-21', lec: 7, topic: 'List mutation', d: 3, type: 'out',
    t: 'Removing while iterating',
    code: `
      L = [1, 1, 2, 3]
      for x in L:
          if x % 2 == 1:
              L.remove(x)
      print(L)`,
    ans: '[1, 2]',
    exp: 'The loop walks by index. Removing at index 0 shifts the second 1 into index 0, which has already been visited, so it is skipped. Never change the length of a list you are iterating over.' },

  { id: 'L7-22', lec: 7, topic: 'Nested lists', d: 2, type: 'out',
    t: 'Shared row, then re-binding',
    code: `
      row = [0, 0]
      grid = [row, row]
      grid[0][0] = 1
      row = [5, 5]
      print(grid)`,
    ans: '[[1, 0], [1, 0]]',
    exp: 'Both slots of `grid` refer to the same row object, so the mutation shows twice. `row = [5, 5]` re-binds the name to a new list and does not change `grid`.' },

  { id: 'L7-23', lec: 7, topic: 'del', d: 1, type: 'mcq', run: true,
    t: 'del with a negative slice',
    q: 'What is printed?',
    code: `
      L = [1, 2, 3, 4, 5]
      del L[-2:]
      print(L)`,
    opts: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4, 5]', '[1, 2, 3, 5]'],
    ans: 0,
    exp: '`L[-2:]` is the last two elements, and `del` removes both.' },

  { id: 'L7-24', lec: 7, topic: 'List methods', d: 1, type: 'out',
    t: 'count and index',
    code: `
      L = [3, 1, 3, 2, 3]
      print(L.count(3), L.index(2))`,
    ans: '3 3',
    exp: '3 appears three times, and the first 2 is at index 3.' },

  { id: 'L7-25', lec: 7, topic: 'Deep processing', d: 3, type: 'fib',
    t: 'deep_reverse',
    q: 'Complete `deep_reverse`, which reverses a list and every sub-list, e.g. `deep_reverse([1, [2, 3], 4])` is `[4, [3, 2], 1]`.',
    code: `
      def deep_reverse(lst):
          if not lst:
              return []
          head = lst[0]
          if type(head) == list:
              head = {{1}}
          return {{2}}`,
    blanks: [['deep_reverse(head)'], ['deep_reverse(lst[1:]) + [head]']],
    test: 'assert deep_reverse([1, [2, 3], 4]) == [4, [3, 2], 1]\nassert deep_reverse([[1, [2, 3]], 4]) == [4, [[3, 2], 1]]',
    exp: 'Reverse a list head deeply, then put the head **after** the reversed tail. It must be wrapped as `[head]` so it stays one element.' },

  { id: 'L7-26', lec: 7, topic: 'Deep processing', d: 3, type: 'out',
    t: 'Counting lists, not items',
    code: `
      def count_lists(x):
          if type(x) != list:
              return 0
          return 1 + sum(count_lists(e) for e in x)

      print(count_lists([1, [2, []], [[3]]]))`,
    ans: '5',
    exp: 'Each list counts as 1, plus the lists inside it: the outer list, `[2, []]`, `[]`, `[[3]]` and `[3]` make 5.' },

  { id: 'L7-27', lec: 7, topic: 'Deep processing', d: 3, type: 'fib',
    t: 'deep_max',
    q: 'Complete `deep_max`, which returns the largest number anywhere in a nested list, or `None` if there are no numbers, e.g. `deep_max([1, [7, [3]], [], 2])` is `7`.',
    code: `
      def deep_max(lst):
          best = None
          for e in lst:
              v = {{1}}
              if v is not None and (best is None or v > best):
                  best = v
          return best`,
    blanks: [['deep_max(e) if type(e) == list else e', 'e if type(e) != list else deep_max(e)']],
    test: 'assert deep_max([1, [7, [3]], [], 2]) == 7\nassert deep_max([[], [[]]]) is None\nassert deep_max([-5, [-2]]) == -2',
    exp: 'A sub-list is searched recursively, and a number is used as it is. `None` stands for "no number found", which is why it has to be checked before comparing.' },

  { id: 'L7-28', lec: 7, topic: 'Nested lists', d: 3, type: 'out',
    t: 'Mutate one slot, re-bind the other',
    code: `
      A = [1, 2]
      B = [A, A]
      B[0].append(3)
      B[1] = B[1] + [4]
      print(A, B)`,
    ans: '[1, 2, 3] [[1, 2, 3], [1, 2, 3, 4]]',
    exp: '`B[0].append(3)` mutates `A` itself. `B[1] + [4]` builds a **new** list, and that goes into slot 1 only, so `A` does not get the 4.' },

  { id: 'L7-29', lec: 7, topic: 'Deep processing', d: 3, type: 'fib',
    t: 'Depth-weighted sum',
    q: '`weighted(lst)` multiplies every number by its nesting depth (top level = 1) and sums them, e.g. `weighted([1, [2, [3]]])` is `1·1 + 2·2 + 3·3 = 14`. Complete the depth passed down.',
    code: `
      def weighted(lst):
          def w(x, d):
              if type(x) != list:
                  return x * d
              return sum(w(e, {{1}}) for e in x)
          return w(lst, 0)`,
    blanks: [['d + 1', '1 + d']],
    test: 'assert weighted([1, [2, [3]]]) == 14\nassert weighted([]) == 0\nassert weighted([[5]]) == 10',
    exp: 'Entering a list one level deeper means its elements sit at depth `d + 1`. The outer list starts at 0, so its own elements are at depth 1.' },

  { id: 'L7-30', lec: 7, topic: 'List methods', d: 1, type: 'fib',
    t: 'Remove every copy in place',
    q: 'Complete `remove_all(L, x)`, which deletes every `x` from `L` **in place**.',
    code: `
      def remove_all(L, x):
          while {{1}}:
              L.remove(x)`,
    blanks: [['x in L']],
    test: 'L = [1, 2, 1, 3, 1]\nM = L\nremove_all(L, 1)\nassert L == [2, 3] and M is L\nremove_all(L, 9)\nassert L == [2, 3]',
    exp: '`remove` deletes only the first copy and raises `ValueError` if there is none, so loop while another copy remains. Unlike a for loop over `L`, this never skips elements.' },

  { id: 'L7-31', lec: 7, topic: 'List methods', d: 2, type: 'fib',
    t: 'Rotate right by one, in place',
    q: 'Complete `rotate_right(L)` with one statement that mutates `L`, e.g. `[1, 2, 3]` becomes `[3, 1, 2]`.',
    code: `
      def rotate_right(L):
          if L:
              {{1}}`,
    blanks: [['L.insert(0, L.pop())', 'L[:] = L[-1:] + L[:-1]', 'L[:] = [L[-1]] + L[:-1]']],
    test: 'L = [1, 2, 3]\nM = L\nrotate_right(L)\nassert L == [3, 1, 2] and M is L\nE = []\nrotate_right(E)\nassert E == []',
    exp: '`pop()` removes and returns the last element, and `insert(0, …)` puts it at the front. Slice assignment `L[:] = …` also mutates in place, whereas `L = …` would only re-bind the local name.' },

  { id: 'L7-32', lec: 7, topic: 'Deep processing', d: 2, type: 'fib',
    t: 'Deep membership test',
    q: 'Complete `contains(lst, x)`, which looks for `x` at any depth of a nested list.',
    code: `
      def contains(lst, x):
          for e in lst:
              if e == x or (type(e) == list and {{1}}):
                  return True
          return False`,
    blanks: [['contains(e, x)']],
    test: 'assert contains([1, [2, [3, 4]]], 4)\nassert not contains([1, [2, [3]]], 5)\nassert contains([[], [[7]]], 7)',
    exp: 'A sub-list is searched recursively. Short-circuit `and` makes sure only lists are passed to `contains`.' },

  { id: 'L7-33', lec: 7, topic: 'Nested lists', d: 1, type: 'fib',
    t: 'Split a list into chunks',
    q: 'Complete `chunk(L, k)`, e.g. `chunk([1, 2, 3, 4, 5], 2)` is `[[1, 2], [3, 4], [5]]`.',
    code: `
      def chunk(L, k):
          return [{{1}} for i in range(0, len(L), k)]`,
    blanks: [['L[i:i + k]', 'L[i:k + i]', 'L[i:i+k]']],
    test: 'assert chunk([1, 2, 3, 4, 5], 2) == [[1, 2], [3, 4], [5]]\nassert chunk([], 3) == []\nassert chunk([1, 2], 5) == [[1, 2]]',
    exp: '`i` steps through the start of each chunk, and a slice past the end simply stops early, so the last chunk can be shorter without any error.' },

  { id: 'L7-34', lec: 7, topic: 'List mutation', d: 3, type: 'out',
    t: 'Slice assignment, del and extend',
    code: `
      L = [1, 2, 3, 4, 5, 6]
      L[1::2] = [0] * 3
      del L[:2]
      L.extend(L[:1])
      print(L)`,
    ans: '[3, 0, 5, 0, 3]',
    exp: 'The stepped slice replaces indices 1, 3, 5: `[1, 0, 3, 0, 5, 0]`. A stepped slice needs exactly the same number of new values. `del L[:2]` leaves `[3, 0, 5, 0]`, and `extend` appends a copy of the first element.' }
]);
