/* Lecture 8 — Dictionaries: lookup, get, del / pop, iteration,
   frequency counting, inverting, memoisation */
practice([
  { id: 'L8-01', lec: 8, topic: 'Creating dicts', d: 1, type: 'out',
    t: 'Duplicate keys',
    code: `
      d = {'a': 1, 'b': 2, 'a': 3}
      print(len(d), d['a'])`,
    ans: '2 3',
    exp: 'Keys are unique. A repeated key overwrites the earlier value, so `d` is `{\'a\': 3, \'b\': 2}`.' },

  { id: 'L8-03', lec: 8, topic: 'Lookup', d: 1, type: 'mcq', run: true,
    t: 'Indexing a missing key',
    q: 'What happens?',
    code: `
      prices = {'orange': 60, 'apple': 80}
      print(prices['banana'])`,
    opts: ['KeyError', 'None', '0', 'IndexError'],
    ans: 0,
    exp: 'Square-bracket lookup of a key that is not there raises `KeyError`. Use `in` or `.get()` to be safe.' },

  { id: 'L8-04', lec: 8, topic: 'Frequency counting', d: 1, type: 'out',
    t: 'Counting characters',
    code: `
      d = {}
      for c in 'banana':
          d[c] = d.get(c, 0) + 1
      print(d)`,
    ans: "{'b': 1, 'a': 3, 'n': 2}",
    exp: 'Keys appear in insertion order: b first, then a, then n. `get(c, 0)` starts a new count at 0.' },

  { id: 'L8-05', lec: 8, topic: 'Keys', d: 2, type: 'mcq', run: true,
    t: 'A list as a key',
    q: 'What happens?',
    code: `
      d = {(1, 2): 'tuple'}
      d[[1, 2]] = 'list'
      print(d)`,
    opts: ['TypeError', "{(1, 2): 'list'}", "{(1, 2): 'tuple', [1, 2]: 'list'}", 'KeyError'],
    ans: 0,
    exp: 'Keys must be immutable (hashable). A tuple is fine, but a list raises `TypeError: unhashable type: \'list\'`.' },

  { id: 'L8-06', lec: 8, topic: 'Iteration', d: 1, type: 'out',
    t: 'Looping over items()',
    code: `
      d = {'x': 3, 'y': 1, 'z': 2}
      s = ''
      for k, v in d.items():
          s += k * v
      print(s)`,
    ans: 'xxxyzz',
    exp: '`items()` gives (key, value) pairs in insertion order, and each key is repeated `v` times.' },

  { id: 'L8-08', lec: 8, topic: 'Modifying dicts', d: 1, type: 'out',
    t: 'pop, add and del',
    code: `
      d = {'a': 1, 'b': 2, 'c': 3}
      x = d.pop('b')
      d['d'] = x * 10
      del d['a']
      print(d)`,
    ans: "{'c': 3, 'd': 20}",
    exp: '`pop` removes `b` and returns 2. The new key `d` is added at the end with value 20, then `a` is deleted.' },

  { id: 'L8-09', lec: 8, topic: 'Inverting a dict', d: 2, type: 'fib',
    t: 'invert_dict',
    q: 'Complete `invert_dict`, e.g. `invert_dict({\'a\': 7, \'b\': 4, \'c\': 7})` is `{7: [\'a\', \'c\'], 4: [\'b\']}`.',
    code: `
      def invert_dict(dic):
          inv = {}
          for key, val in dic.items():
              if val not in inv:
                  {{1}}
              else:
                  {{2}}
          return inv`,
    blanks: [['inv[val] = [key]'], ['inv[val].append(key)', 'inv[val] += [key]', 'inv[val] = inv[val] + [key]']],
    test: "assert invert_dict({'a': 7, 'b': 4, 'c': 7}) == {7: ['a', 'c'], 4: ['b']}\nassert invert_dict({}) == {}",
    exp: 'Several keys can share a value, so each inverted entry is a **list** of keys. Start a new list the first time a value is seen, and append to it after that.' },

  { id: 'L8-10', lec: 8, topic: 'Reverse lookup', d: 1, type: 'out',
    t: 'Reverse lookup returns the first match',
    code: `
      def reverse_lookup(dic, val):
          for key in dic:
              if dic[key] == val:
                  return key
          return None

      D = {'a': 5, 'b': 3, 'd': 1, 'c': 3}
      print(reverse_lookup(D, 3), reverse_lookup(D, 9))`,
    ans: 'b None',
    exp: 'Keys are scanned in insertion order and `b` is the first key with value 3. With no match the loop ends and `None` is returned.' },

  { id: 'L8-11', lec: 8, topic: 'Memoisation', d: 3, type: 'out',
    t: 'Counting calls with a memo',
    code: `
      calls = [0]
      memo = {}

      def fib(n):
          calls[0] += 1
          if n <= 1:
              return n
          if n in memo:
              return memo[n]
          memo[n] = fib(n - 1) + fib(n - 2)
          return memo[n]

      fib(6)
      print(calls[0])`,
    ans: '11',
    exp: 'The first chain fib(6) → … → fib(0) makes 7 calls. After that, the second calls made on the way back up — fib(1) inside fib(3), then the memo hits for fib(2), fib(3) and fib(4) — add 4 more. Without the memo, fib(6) would make 25 calls.' },

  { id: 'L8-12', lec: 8, topic: 'Memoisation', d: 3, type: 'fib',
    t: 'Memoised n-choose-k',
    q: 'Complete `memo_choose`. Use the pair `(n, k)` as the dictionary key.',
    code: `
      def memo_choose(n, k):
          memo = {}
          def mc(n, k):
              if k > n:
                  return 0
              if k == 0 or k == n:
                  return 1
              if {{1}} in memo:
                  return memo[(n, k)]
              memo[(n, k)] = {{2}}
              return memo[(n, k)]
          return mc(n, k)`,
    blanks: [['(n, k)'], ['mc(n - 1, k) + mc(n - 1, k - 1)', 'mc(n - 1, k - 1) + mc(n - 1, k)']],
    test: 'assert memo_choose(5, 2) == 10\nassert memo_choose(30, 15) == 155117520\nassert memo_choose(3, 5) == 0',
    exp: 'A tuple is immutable, so it can be a key, and it captures both arguments. The recurrence is: leave the item out (n−1, k) or take it (n−1, k−1).' },

  { id: 'L8-13', lec: 8, topic: 'Memoisation', d: 2, type: 'mcq',
    t: 'When memoisation is unsafe',
    q: 'Which function is **not** a good candidate for memoisation?',
    opts: ['One whose result depends on a global counter that keeps changing',
           'A recursive Fibonacci function',
           'n-choose-k computed recursively',
           'Counting the parking arrangements of n lots'],
    ans: 0,
    exp: 'Memoisation needs a deterministic function with no side effects (the same input always gives the same output) and overlapping subproblems. Depending on changing external state breaks the first condition.' },

  { id: 'L8-15', lec: 8, topic: 'Lookup', d: 1, type: 'mcq', run: true,
    t: 'in checks keys only',
    q: 'What is printed?',
    code: `
      d = {1: 'one', 2: 'two'}
      print('one' in d, 2 in d)`,
    opts: ['False True', 'True True', 'True False', 'False False'],
    ans: 0,
    exp: '`in` on a dict checks the **keys**. To search the values, use `\'one\' in d.values()`.' },

  { id: 'L8-16', lec: 8, topic: 'Grouping', d: 2, type: 'fib',
    t: 'Group words by first letter',
    q: 'Complete `group` in one expression, e.g. `group([\'apple\', \'bee\', \'avo\'])` is `{\'a\': [\'apple\', \'avo\'], \'b\': [\'bee\']}`.',
    code: `
      def group(words):
          g = {}
          for w in words:
              k = w[0]
              g[k] = {{1}}
          return g`,
    blanks: [['g.get(k, []) + [w]', 'g[k] + [w] if k in g else [w]']],
    test: "assert group(['apple', 'bee', 'avo']) == {'a': ['apple', 'avo'], 'b': ['bee']}\nassert group([]) == {}",
    exp: '`g.get(k, [])` is the existing list, or an empty list for a new letter. Concatenating `[w]` builds the updated list.' },

  { id: 'L8-17', lec: 8, topic: 'Iteration', d: 2, type: 'mcq', run: true,
    t: 'max of a dict',
    q: 'What is printed?',
    code: `
      prices = {'apple': 80, 'pear': 70, 'kiwi': 50}
      print(sum(prices.values()), max(prices))`,
    opts: ['200 pear', '200 apple', '200 80', '200 kiwi'],
    ans: 0,
    exp: 'Iterating over a dict gives its **keys**, so `max(prices)` is the largest key in alphabetical order, `pear`, not the key with the highest price.' },

  { id: 'L8-18', lec: 8, topic: 'Copying', d: 2, type: 'out',
    t: 'Shallow copy of a dict',
    code: `
      a = {'x': [1]}
      b = a.copy()
      b['x'].append(2)
      b['y'] = 0
      print(a)`,
    ans: "{'x': [1, 2]}",
    exp: '`copy()` is shallow, so both dicts share the same list object as the value of `x`. Adding a new key to `b` does not affect `a`.' },

  { id: 'L8-20', lec: 8, topic: 'Frequency counting', d: 2, type: 'fib',
    t: 'Most common character',
    q: 'Complete `most_common(s)`. On a tie, the character seen **first** should win.',
    code: `
      def most_common(s):
          f = {}
          for c in s:
              f[c] = f.get(c, 0) + 1
          best = s[0]
          for c in f:
              if {{1}}:
                  best = c
          return best`,
    blanks: [['f[c] > f[best]', 'f[best] < f[c]']],
    test: "assert most_common('abbccc') == 'c'\nassert most_common('aab') == 'a'\nassert most_common('abab') == 'a'",
    exp: 'A strict `>` replaces `best` only on a strictly higher count. Since keys come in first-seen order, ties keep the earliest character.' },

  { id: 'L8-22', lec: 8, topic: 'Iteration', d: 2, type: 'out',
    t: 'Updating values while looping',
    code: `
      d = {'a': 1, 'b': 2}
      for k in d:
          d[k] = d[k] * 10
      print(d)`,
    ans: "{'a': 10, 'b': 20}",
    exp: 'Changing the values of keys that already exist while looping is fine. Only adding or removing keys during iteration causes an error.' },

  { id: 'L8-23', lec: 8, topic: 'Keys', d: 3, type: 'mcq', run: true,
    t: 'Tuple keys without brackets',
    q: 'What is printed?',
    code: `
      d = {(1, 2): 'p', 1: 'q'}
      print(d[1, 2])`,
    opts: ['p', 'q', 'KeyError', 'TypeError'],
    ans: 0,
    exp: 'Inside `[]`, `1, 2` is a tuple, so `d[1, 2]` is the same as `d[(1, 2)]`.' },

  { id: 'L8-24', lec: 8, topic: 'Memoisation', d: 2, type: 'mcq',
    t: 'Why memo_fib is fast',
    q: 'Why does `memo_fib(40)` run in microseconds when the plain recursive `fib(40)` takes many seconds?',
    opts: ['Each fib(k) is computed once and then fetched from the dictionary',
           'Dictionaries run recursion in parallel',
           'The memo version uses a loop instead of recursion',
           'Python caches every function automatically'],
    ans: 0,
    exp: 'The plain version recomputes the same subproblems an exponential number of times. With the memo, each value is computed once, so the work grows only linearly with n.' },

  { id: 'L8-25', lec: 8, topic: 'Nested data', d: 3, type: 'out',
    t: 'Dictionary of lists',
    code: `
      scores = {'ann': [70, 80], 'bob': [90]}
      scores['bob'].append(60)
      scores['cat'] = scores['ann']
      scores['cat'].append(100)
      print(len(scores['ann']), sum(scores['bob']))`,
    ans: '3 150',
    exp: '`scores[\'cat\'] = scores[\'ann\']` stores the same list object under two keys, so appending through `cat` also grows `ann` to 3 items. Bob\'s scores add up to 90 + 60 = 150.' }
]);
