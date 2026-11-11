/* Tutorial 8 — List processing
   Converted from AY26/27S1 Week 8 Tutorial Worksheet, Q1 and Q2. */
tutorial([
  {
    id: 'T8-01', src: 'T8', topic: 'list_filter', d: 1, type: 'fib',
    t: 'list_filter with a loop',
    q: 'Complete `list_filter(func, lst)` using a `for` loop and `.append()`. Do not use list slicing or concatenation.',
    code: `
      def list_filter(func, lst):
          result = []
          for elem in lst:
              if {{1}}:
                  {{2}}
          return result`,
    blanks: [['func(elem)'], ['result.append(elem)']],
    test: `
      assert list_filter(lambda x: x > 2, [2, 4, 3, 1, 2, 5]) == [4, 3, 5]
      assert list_filter(lambda x: x < 0, [2, 4, 3, 1, 2, 5]) == []
      assert list_filter(lambda x: True, []) == []`,
    exp: 'Test the predicate on the **element**, not on the list. Only a True result is appended, and appending to `result` builds the new list without touching `lst`.'
  },
  {
    id: 'T8-02', src: 'T8', topic: 'list_filter', d: 2, type: 'fib',
    t: 'list_filter by recursion',
    q: 'Complete the recursive `list_filter`. No loops and no list methods — use slicing and concatenation.',
    code: `
      def list_filter(func, lst):
          if {{1}}:
              return {{2}}
          elif {{3}}:
              return {{4}}
          else:
              return {{5}}`,
    blanks: [['not lst'], ['[]'], ['func(lst[0])'], ['[lst[0]] + list_filter(func, lst[1:])'], ['list_filter(func, lst[1:])']],
    test: `
      assert list_filter(lambda x: x > 2, [2, 4, 3, 1, 2, 5]) == [4, 3, 5]
      assert list_filter(lambda x: x < 0, [4]) == []
      assert list_filter(lambda x: True, []) == []`,
    exp: 'Base case: an empty list filters to `[]`. Otherwise look at the head: keep it (wrapping it in `[ ]` so it can be concatenated) and recurse on the tail, or drop it and recurse on the tail.'
  },
  {
    id: 'T8-03', src: 'T8', topic: 'Tracing recursion', d: 2, type: 'mcq',
    t: 'Trace list_filter',
    q: 'Using the recursive `list_filter`, what does this call return?',
    code: `
      fun = lambda x: x > 2
      print(list_filter(fun, [2, 4, 1, 5]))`,
    opts: ['[4, 5]', '[2, 4, 5]', '[4]', '[]'],
    ans: 0,
    exp: '`2` fails the test, `4` passes, `1` fails and `5` passes. The kept elements come back in their original order, so the result is `[4, 5]`.'
  },
  {
    id: 'T8-04', src: 'T8', topic: 'deep_filter', d: 3, type: 'fib',
    t: 'deep_filter by recursion',
    q: 'Complete the recursive `deep_filter(func, lst)`. It keeps the nesting of the input but keeps only numbers satisfying `func`. No loops and no list methods.',
    code: `
      def deep_filter(func, lst):
          if {{1}}:
              return {{2}}
          elif {{3}}:
              if {{4}}:
                  return {{5}}
              else:
                  return {{6}}
          else:
              return {{7}}`,
    blanks: [['not lst'], ['[]'], ['type(lst[0]) != list'], ['func(lst[0])'], ['[lst[0]] + deep_filter(func, lst[1:])'], ['deep_filter(func, lst[1:])'], ['[deep_filter(func, lst[0])] + deep_filter(func, lst[1:])']],
    test: `
      assert deep_filter(lambda x: x > 2, [2, [4, 3], [1, 2], 5]) == [[4, 3], [], 5]
      assert deep_filter(lambda x: x < 0, [[2, [4, 3, [1, 2]], 5]]) == [[[[]]]]
      assert deep_filter(lambda x: True, []) == []`,
    exp: 'Three cases: empty list, a number (test it and either keep or drop it), and a sublist (filter it recursively but **wrap the result in a list** so the structure survives). An empty sublist therefore stays as `[]`.'
  },
  {
    id: 'T8-05', src: 'T8', topic: 'Tracing recursion', d: 2, type: 'mcq',
    t: 'Trace deep_filter',
    q: 'What does this call return?',
    code: `
      fun = lambda x: x > 2
      print(deep_filter(fun, [2, [4, 1], 5]))`,
    opts: ['[[4], 5]', '[4, 5]', '[[4], [5]]', '[[4, 5]]'],
    ans: 0,
    exp: '`2` is dropped, the sublist becomes `[4]`, and `5` is kept at the top level. The result keeps the sublist as a list: `[[4], 5]`.'
  },
  {
    id: 'T8-06', src: 'T8', topic: 'deep_filter', d: 2, type: 'fib',
    t: 'deep_filter with a loop',
    q: 'Complete the iterative `deep_filter` using `.append()` only — no slicing and no concatenation.',
    code: `
      def deep_filter(func, lst):
          result = []
          for elem in lst:
              if {{1}}:
                  if {{2}}:
                      {{3}}
              else:
                  {{4}}
          return result`,
    blanks: [['type(elem) != list'], ['func(elem)'], ['result.append(elem)'], ['result.append(deep_filter(func, elem))']],
    test: `
      assert deep_filter(lambda x: x > 2, [2, [4, 3], [1, 2], 5]) == [[4, 3], [], 5]
      assert deep_filter(lambda x: x < 0, [[2, [4, 3, [1, 2]], 5]]) == [[[[]]]]`,
    exp: 'A number is appended only if it passes the test. A sublist is filtered by a recursive call and the **whole resulting list** is appended, which is what keeps the nesting.'
  },
  {
    id: 'T8-07', src: 'T8', topic: 'Nested lists', d: 2, type: 'mcq',
    t: 'Filtering a deeply nested list',
    q: 'What is the result of this call from the worksheet?',
    code: `
      print(deep_filter(lambda x: x < 0, [[2, [4, 3, [1, 2]], 5]]))`,
    opts: ['[[[[]]]]', '[[]]', '[[[]]]', '[]'],
    ans: 0,
    exp: 'No number passes, but every list layer still has to be rebuilt. The outer list holds one sublist, which holds one sublist, which holds the empty result: `[[[[]]]]`.'
  },
  {
    id: 'T8-08', src: 'T8', topic: 'Base cases', d: 2, type: 'mcq',
    t: 'A missing base case',
    q: 'The base case is removed from the recursive `list_filter`. What happens when this runs?',
    code: `
      def list_filter(func, lst):
          if func(lst[0]):
              return [lst[0]] + list_filter(func, lst[1:])
          else:
              return list_filter(func, lst[1:])

      print(list_filter(lambda x: x > 2, [4]))`,
    opts: ['IndexError', 'RecursionError', 'It prints [4]', 'It prints []'],
    ans: 0,
    exp: '`[4]` passes, so the call recurses on `[]`. There the test `func(lst[0])` reads index 0 of an empty list, which raises `IndexError` before any recursion limit is reached.'
  }
]);
