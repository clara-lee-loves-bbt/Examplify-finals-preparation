/* Lecture 7 — List processing: mutation, del, list methods,
   nested lists, deep processing (deep_count / deep_map / flatten) */
practice([
  { id: 'L7-01', lec: 7, topic: 'del', d: 2, type: 'out',
    t: 'Deleting a stepped slice',
    code: `
      L = [0, 1, 2, 3, 4, 5, 6, 7]
      del L[1::3]
      print(L)` },

  { id: 'L7-02', lec: 7, topic: 'List methods', d: 1, type: 'out',
    t: 'remove, pop and append',
    code: `
      L = [5, 3, 5, 1]
      L.remove(5)
      x = L.pop()
      L.append(x * 2)
      print(L)` },

  { id: 'L7-03', lec: 7, topic: 'List methods', d: 2, type: 'mcq',
    t: 'Two pops in one expression',
    q: 'What is printed?',
    code: `
      L = ['a', 'b', 'c', 'd']
      print(L.pop(1) + L.pop(1))` },

  { id: 'L7-04', lec: 7, topic: 'List methods', d: 1, type: 'out',
    t: 'append versus extend',
    code: `
      A = [1, 2]
      B = [1, 2]
      A.append([3, 4])
      B.extend([3, 4])
      print(len(A), len(B))` },

  { id: 'L7-05', lec: 7, topic: 'List methods', d: 2, type: 'mcq', optCode: true,
    t: 'extend with a string',
    q: 'What is printed?',
    code: `
      L = ['x']
      L.extend('ab')
      print(L)` },

  { id: 'L7-06', lec: 7, topic: 'List methods', d: 2, type: 'out',
    t: 'insert with a negative index',
    code: `
      L = [1, 2, 3]
      L.insert(1, 9)
      L.insert(-1, 8)
      print(L)` },

  { id: 'L7-07', lec: 7, topic: 'List methods', d: 1, type: 'mcq',
    t: 'Removing a missing value',
    q: 'What happens?',
    code: `
      L = [1, 2, 3]
      L.remove(4)
      print(L)` },

  { id: 'L7-08', lec: 7, topic: 'Slice assignment', d: 2, type: 'out',
    t: 'L[1:2] = [] versus L[1] = []',
    code: `
      A = [1, 2, 3]
      B = [1, 2, 3]
      A[1:2] = []
      B[1] = []
      print(A, B)` },

  { id: 'L7-09', lec: 7, topic: 'Nested lists', d: 1, type: 'out',
    t: 'len of a nested list',
    code: `
      L = [1, [2, 3], [[4]], []]
      print(len(L), len(L[2]))` },

  { id: 'L7-10', lec: 7, topic: 'Nested lists', d: 1, type: 'out',
    t: 'Indexing deep inside',
    code: `
      L = [1, [2, [3, [4, 5]]]]
      print(L[1][1][1][0])` },

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

      print(deep_count([[1, [2]], [], 3, [[4, 5]]]))` },

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
              return {{2}}` },

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
              return {{2}} + flatten(lst[1:])` },

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
          return result` },

  { id: 'L7-15', lec: 7, topic: 'Deep processing', d: 2, type: 'out',
    t: 'Deep sum with a loop',
    code: `
      def deep_sum(lst):
          total = 0
          for e in lst:
              total += deep_sum(e) if type(e) == list else e
          return total

      print(deep_sum([1, [2, [3]], [], [[4]]]))` },

  { id: 'L7-16', lec: 7, topic: 'Deep processing', d: 3, type: 'out',
    t: 'Depth of a nested list',
    code: `
      def depth(x):
          if type(x) != list:
              return 0
          if not x:
              return 1
          return 1 + max(depth(e) for e in x)

      print(depth([1, [2, [3]], []]))` },

  { id: 'L7-17', lec: 7, topic: 'Shallow copy', d: 2, type: 'mcq', optCode: true,
    t: 'Shallow copy of a nested list',
    q: 'What is printed?',
    code: `
      L = [1, [2, 3]]
      M = L.copy()
      M[0] = 100
      M[1][0] = 200
      print(L)` },

  { id: 'L7-18', lec: 7, topic: 'List processing', d: 2, type: 'out',
    t: 'Running maximum',
    code: `
      def running_max(lst):
          out = []
          for x in lst:
              out.append(x if not out else max(out[-1], x))
          return out

      print(running_max([3, 1, 4, 1, 5]))` },

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
          return result` },

  { id: 'L7-20', lec: 7, topic: 'List mutation', d: 2, type: 'mcq', optCode: true,
    t: 'Which one creates a new list?',
    q: 'Which statement makes `L` refer to a **new** list object, so `id(L)` changes?' },

  { id: 'L7-21', lec: 7, topic: 'List mutation', d: 3, type: 'out',
    t: 'Removing while iterating',
    code: `
      L = [1, 1, 2, 3]
      for x in L:
          if x % 2 == 1:
              L.remove(x)
      print(L)` },

  { id: 'L7-22', lec: 7, topic: 'Nested lists', d: 2, type: 'out',
    t: 'Shared row, then re-binding',
    code: `
      row = [0, 0]
      grid = [row, row]
      grid[0][0] = 1
      row = [5, 5]
      print(grid)` },

  { id: 'L7-23', lec: 7, topic: 'del', d: 1, type: 'mcq',
    t: 'del with a negative slice',
    q: 'What is printed?',
    code: `
      L = [1, 2, 3, 4, 5]
      del L[-2:]
      print(L)` },

  { id: 'L7-24', lec: 7, topic: 'List methods', d: 1, type: 'out',
    t: 'count and index',
    code: `
      L = [3, 1, 3, 2, 3]
      print(L.count(3), L.index(2))` },

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
          return {{2}}` },

  { id: 'L7-26', lec: 7, topic: 'Deep processing', d: 3, type: 'out',
    t: 'Counting lists, not items',
    code: `
      def count_lists(x):
          if type(x) != list:
              return 0
          return 1 + sum(count_lists(e) for e in x)

      print(count_lists([1, [2, []], [[3]]]))` },

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
          return best` },

  { id: 'L7-28', lec: 7, topic: 'Nested lists', d: 3, type: 'out',
    t: 'Mutate one slot, re-bind the other',
    code: `
      A = [1, 2]
      B = [A, A]
      B[0].append(3)
      B[1] = B[1] + [4]
      print(A, B)` },

  { id: 'L7-29', lec: 7, topic: 'Deep processing', d: 3, type: 'fib',
    t: 'Depth-weighted sum',
    q: '`weighted(lst)` multiplies every number by its nesting depth (top level = 1) and sums them, e.g. `weighted([1, [2, [3]]])` is `1·1 + 2·2 + 3·3 = 14`. Complete the depth passed down.',
    code: `
      def weighted(lst):
          def w(x, d):
              if type(x) != list:
                  return x * d
              return sum(w(e, {{1}}) for e in x)
          return w(lst, 0)` },

  { id: 'L7-30', lec: 7, topic: 'List methods', d: 1, type: 'fib',
    t: 'Remove every copy in place',
    q: 'Complete `remove_all(L, x)`, which deletes every `x` from `L` **in place**.',
    code: `
      def remove_all(L, x):
          while {{1}}:
              L.remove(x)` },

  { id: 'L7-31', lec: 7, topic: 'List methods', d: 2, type: 'fib',
    t: 'Rotate right by one, in place',
    q: 'Complete `rotate_right(L)` with one statement that mutates `L`, e.g. `[1, 2, 3]` becomes `[3, 1, 2]`.',
    code: `
      def rotate_right(L):
          if L:
              {{1}}` },

  { id: 'L7-32', lec: 7, topic: 'Deep processing', d: 2, type: 'fib',
    t: 'Deep membership test',
    q: 'Complete `contains(lst, x)`, which looks for `x` at any depth of a nested list.',
    code: `
      def contains(lst, x):
          for e in lst:
              if e == x or (type(e) == list and {{1}}):
                  return True
          return False` },

  { id: 'L7-33', lec: 7, topic: 'Nested lists', d: 1, type: 'fib',
    t: 'Split a list into chunks',
    q: 'Complete `chunk(L, k)`, e.g. `chunk([1, 2, 3, 4, 5], 2)` is `[[1, 2], [3, 4], [5]]`.',
    code: `
      def chunk(L, k):
          return [{{1}} for i in range(0, len(L), k)]` },

  { id: 'L7-34', lec: 7, topic: 'List mutation', d: 3, type: 'out',
    t: 'Slice assignment, del and extend',
    code: `
      L = [1, 2, 3, 4, 5, 6]
      L[1::2] = [0] * 3
      del L[:2]
      L.extend(L[:1])
      print(L)` }
]);
