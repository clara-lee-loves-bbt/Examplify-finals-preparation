/* Lecture 8 — Dictionaries: lookup, get, del / pop, iteration,
   frequency counting, inverting, memoisation */
practice([
  { id: 'L8-01', lec: 8, topic: 'Creating dicts', d: 1, type: 'out',
    t: 'Duplicate keys',
    code: `
      d = {'a': 1, 'b': 2, 'a': 3}
      print(len(d), d['a'])` },

  { id: 'L8-03', lec: 8, topic: 'Lookup', d: 1, type: 'mcq',
    t: 'Indexing a missing key',
    q: 'What happens?',
    code: `
      prices = {'orange': 60, 'apple': 80}
      print(prices['banana'])` },

  { id: 'L8-04', lec: 8, topic: 'Frequency counting', d: 1, type: 'out',
    t: 'Counting characters',
    code: `
      d = {}
      for c in 'banana':
          d[c] = d.get(c, 0) + 1
      print(d)` },

  { id: 'L8-05', lec: 8, topic: 'Keys', d: 2, type: 'mcq',
    t: 'A list as a key',
    q: 'What happens?',
    code: `
      d = {(1, 2): 'tuple'}
      d[[1, 2]] = 'list'
      print(d)` },

  { id: 'L8-06', lec: 8, topic: 'Iteration', d: 1, type: 'out',
    t: 'Looping over items()',
    code: `
      d = {'x': 3, 'y': 1, 'z': 2}
      s = ''
      for k, v in d.items():
          s += k * v
      print(s)` },

  { id: 'L8-08', lec: 8, topic: 'Modifying dicts', d: 1, type: 'out',
    t: 'pop, add and del',
    code: `
      d = {'a': 1, 'b': 2, 'c': 3}
      x = d.pop('b')
      d['d'] = x * 10
      del d['a']
      print(d)` },

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
          return inv` },

  { id: 'L8-10', lec: 8, topic: 'Reverse lookup', d: 1, type: 'out',
    t: 'Reverse lookup returns the first match',
    code: `
      def reverse_lookup(dic, val):
          for key in dic:
              if dic[key] == val:
                  return key
          return None

      D = {'a': 5, 'b': 3, 'd': 1, 'c': 3}
      print(reverse_lookup(D, 3), reverse_lookup(D, 9))` },

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
      print(calls[0])` },

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
          return mc(n, k)` },

  { id: 'L8-13', lec: 8, topic: 'Memoisation', d: 2, type: 'mcq',
    t: 'When memoisation is unsafe',
    q: 'Which function is **not** a good candidate for memoisation?' },

  { id: 'L8-15', lec: 8, topic: 'Lookup', d: 1, type: 'mcq',
    t: 'in checks keys only',
    q: 'What is printed?',
    code: `
      d = {1: 'one', 2: 'two'}
      print('one' in d, 2 in d)` },

  { id: 'L8-16', lec: 8, topic: 'Grouping', d: 2, type: 'fib',
    t: 'Group words by first letter',
    q: 'Complete `group` in one expression, e.g. `group([\'apple\', \'bee\', \'avo\'])` is `{\'a\': [\'apple\', \'avo\'], \'b\': [\'bee\']}`.',
    code: `
      def group(words):
          g = {}
          for w in words:
              k = w[0]
              g[k] = {{1}}
          return g` },

  { id: 'L8-17', lec: 8, topic: 'Iteration', d: 2, type: 'mcq',
    t: 'max of a dict',
    q: 'What is printed?',
    code: `
      prices = {'apple': 80, 'pear': 70, 'kiwi': 50}
      print(sum(prices.values()), max(prices))` },

  { id: 'L8-18', lec: 8, topic: 'Copying', d: 2, type: 'out',
    t: 'Shallow copy of a dict',
    code: `
      a = {'x': [1]}
      b = a.copy()
      b['x'].append(2)
      b['y'] = 0
      print(a)` },

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
          return best` },

  { id: 'L8-22', lec: 8, topic: 'Iteration', d: 2, type: 'out',
    t: 'Updating values while looping',
    code: `
      d = {'a': 1, 'b': 2}
      for k in d:
          d[k] = d[k] * 10
      print(d)` },

  { id: 'L8-23', lec: 8, topic: 'Keys', d: 3, type: 'mcq',
    t: 'Tuple keys without brackets',
    q: 'What is printed?',
    code: `
      d = {(1, 2): 'p', 1: 'q'}
      print(d[1, 2])` },

  { id: 'L8-24', lec: 8, topic: 'Memoisation', d: 2, type: 'mcq',
    t: 'Why memo_fib is fast',
    q: 'Why does `memo_fib(40)` run in microseconds when the plain recursive `fib(40)` takes many seconds?' },

  { id: 'L8-25', lec: 8, topic: 'Nested data', d: 3, type: 'out',
    t: 'Dictionary of lists',
    code: `
      scores = {'ann': [70, 80], 'bob': [90]}
      scores['bob'].append(60)
      scores['cat'] = scores['ann']
      scores['cat'].append(100)
      print(len(scores['ann']), sum(scores['bob']))` },

  { id: 'L8-26', lec: 8, topic: 'Frequency counting', d: 1, type: 'fib',
    t: 'Word counts',
    q: 'Complete `count_words` in one statement, e.g. `count_words([\'a\', \'b\', \'a\'])` is `{\'a\': 2, \'b\': 1}`.',
    code: `
      def count_words(words):
          d = {}
          for w in words:
              {{1}}
          return d` },

  { id: 'L8-27', lec: 8, topic: 'Lookup', d: 2, type: 'fib',
    t: 'Two-sum with a dictionary',
    q: '`two_sum(t, target)` returns the indices `(i, j)`, i < j, of two elements adding up to `target`, in one pass. Complete the check.',
    code: `
      def two_sum(t, target):
          seen = {}
          for i in range(len(t)):
              need = target - t[i]
              if {{1}}:
                  return (seen[need], i)
              seen[t[i]] = i
          return None` },

  { id: 'L8-28', lec: 8, topic: 'Memoisation', d: 2, type: 'fib',
    t: 'Memoised grid paths',
    q: 'Complete the memoised path counter, so that `count_paths(10, 10)` returns `184756` instantly.',
    code: `
      def count_paths(R, C):
          memo = {}
          def p(r, c):
              if r == 0 or c == 0:
                  return 1
              if (r, c) not in memo:
                  memo[(r, c)] = {{1}}
              return memo[(r, c)]
          return p(R, C)` },

  { id: 'L8-29', lec: 8, topic: 'Grouping', d: 3, type: 'fib',
    t: 'Group anagrams',
    q: 'Complete the key so that words with the same letters land in the same group, e.g. `eat`, `tea` and `ate` together.',
    code: `
      def group_anagrams(words):
          g = {}
          for w in words:
              letters = list(w)
              letters.sort()
              key = {{1}}
              g[key] = g.get(key, []) + [w]
          return g` },

  { id: 'L8-30', lec: 8, topic: 'Inverting a dict', d: 1, type: 'fib',
    t: 'Swap keys and values',
    q: 'Complete `swap_kv(d)` for a dictionary whose values are all different, e.g. `{\'a\': 1, \'b\': 2}` becomes `{1: \'a\', 2: \'b\'}`.',
    code: `
      def swap_kv(d):
          out = {}
          for k, v in d.items():
              {{1}}
          return out` },

  { id: 'L8-31', lec: 8, topic: 'Modifying dicts', d: 2, type: 'out',
    t: 'Insertion order after updates',
    code: `
      d = {'b': 1, 'a': 2}
      d['c'] = 3
      d['b'] = 4
      del d['a']
      d['a'] = 5
      print(list(d))` },

  { id: 'L8-32', lec: 8, topic: 'Nested data', d: 2, type: 'out',
    t: 'Looking up through a dict',
    code: `
      d = {'x': {'y': {'z': 1}}, 'y': 'x'}
      print(d[d['y']]['y'], len(d['x']))` }
]);
