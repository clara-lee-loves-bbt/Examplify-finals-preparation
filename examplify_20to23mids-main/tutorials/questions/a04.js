/* Assignment 4 — List processing and dictionaries (FITB)
   Converted from Assignment 4 Tasks 1–3. Every item is fill-in-the-blank. */
tutorial([
  {
    id: 'A4-01', src: 'A4', topic: 'Higher-order functions', d: 3, type: 'fib',
    t: 'set_smooth — digital convolution',
    q: 'Complete `set_smooth(left, centre, right)`. Its returned smoother replaces every point with `left * previous + centre * current + right * next`, using 0 beyond the ends. It must change the wave in place, and if the three weights do not add to 1 it must return the wave untouched.',
    code: `
      def set_smooth(left, centre, right):
          def smoother(wave):
              if left + centre + right != 1:
                  return wave
              n = len(wave)
              original = {{1}}
              for i in range(n):
                  left_val = {{2}}
                  right_val = {{3}}
                  wave[i] = {{4}}
              return wave
          return smoother`,
    blanks: [['wave[:]'], ['original[i - 1] if i > 0 else 0'], ['original[i + 1] if i < n - 1 else 0'], ['int(left * left_val + centre * original[i] + right * right_val)']],
    test: `
      def ref(wave, left, centre, right):
          n = len(wave)
          o = wave[:]
          return [int(left * (o[i - 1] if i > 0 else 0) + centre * o[i] + right * (o[i + 1] if i < n - 1 else 0)) for i in range(n)]

      w = [0, 10, 20, 30, 40]
      out = set_smooth(0.25, 0.5, 0.25)(w)
      assert out is w
      assert out == ref([0, 10, 20, 30, 40], 0.25, 0.5, 0.25)

      flat = [5, 6, 7]
      assert set_smooth(0.5, 0.5, 0.5)(flat) is flat
      assert flat == [5, 6, 7]`,
    exp: 'Keep a copy of the original wave, because each output value needs its **old** neighbours. The edges read 0 instead of an out-of-range index, and `int()` truncates the weighted sum. When the weights are invalid, returning the input object unchanged satisfies the no-change requirement.'
  },
  {
    id: 'A4-02', src: 'A4', topic: 'Higher-order functions', d: 3, type: 'fib',
    t: 'smooth_transformer — chained smoothing',
    q: 'Complete `smooth_transformer(parameter_list, repetition_list)`. It returns a smoother that applies each triplet\'s smoother the matching number of times, in order.',
    code: `
      def smooth_transformer(parameter_list, repetition_list):
          def smoother(wave):
              for params, times in {{1}}:
                  s = {{2}}
                  for i in range({{3}}):
                      {{4}}
              return wave
          return smoother`,
    blanks: [['zip(parameter_list, repetition_list)'], ['set_smooth(params[0], params[1], params[2])'], ['times'], ['wave = s(wave)']],
    test: `
      def ref_smooth(left, centre, right):
          def smoother(wave):
              n = len(wave)
              o = wave[:]
              for i in range(n):
                  wave[i] = int(left * (o[i - 1] if i > 0 else 0) + centre * o[i] + right * (o[i + 1] if i < n - 1 else 0))
              return wave
          return smoother

      def set_smooth(left, centre, right):
          return ref_smooth(left, centre, right)

      base = [0, 10, 20, 30, 40]
      w = base[:]
      out = smooth_transformer([(0.25, 0.5, 0.25)], [2])(w)
      step1 = ref_smooth(0.25, 0.5, 0.25)(base[:])
      step2 = ref_smooth(0.25, 0.5, 0.25)(step1[:])
      assert out is w and out == step2

      chained = smooth_transformer([(0.0, 1.0, 0.0), (0.2, 0.6, 0.2)], [1, 1])(base[:])
      assert chained == ref_smooth(0.2, 0.6, 0.2)(base[:])`,
    exp: '`zip` pairs each triplet with its repetition count. Build one smoother per triplet, then call it `times` times on the wave. Each call mutates the wave and returns it, so reassigning `wave` lets the next stage start from the smoothed result.'
  },
  {
    id: 'A4-03', src: 'A4', topic: 'Nested lists', d: 3, type: 'fib',
    t: 'flatten_with_depth',
    q: 'Complete `flatten_with_depth(lst)`, which returns `(depth, value)` pairs. A top-level number has depth 0 and each list layer adds one.',
    code: `
      def flatten_with_depth(lst):
          def flatten(item, depth):
              if {{1}}:
                  return {{2}}
              out = []
              for x in item:
                  out += {{3}}
              return out

          result = []
          for x in lst:
              result += {{4}}
          return result`,
    blanks: [['type(item) != list'], ['[(depth, item)]'], ['flatten(x, depth + 1)'], ['flatten(x, 0)']],
    test: `
      data1 = [[10, [20, 30]], [[5], [5, [5]]], [100, [200, [300]]]]
      data2 = [9, [10, [[[20]], [30], 40], 50], [[60], [[[70]], 80], [90], [100]], 110]
      assert flatten_with_depth(data1) == [(1, 10), (2, 20), (2, 30), (2, 5), (2, 5), (3, 5), (1, 100), (2, 200), (3, 300)]
      assert flatten_with_depth(data2) == [(0, 9), (1, 10), (4, 20), (3, 30), (2, 40), (1, 50), (2, 60), (4, 70), (2, 80), (2, 90), (2, 100), (0, 110)]
      assert flatten_with_depth([]) == []`,
    exp: 'A number is a leaf, so it contributes one `(depth, value)` pair. A list contributes the concatenation of its elements flattened at `depth + 1`. Starting the top-level walk at depth 0 makes top-level numbers depth 0.'
  },
  {
    id: 'A4-04', src: 'A4', topic: 'Nested lists', d: 3, type: 'fib',
    t: 'nested_from_depth',
    q: 'Complete `nested_from_depth(ddata)`. Rebuild any nested list whose depth-encoding matches the input. `stack` holds the list open at each depth, with `stack[d]` the list for depth `d`.',
    code: `
      def nested_from_depth(ddata):
          result = []
          stack = [result]
          for depth, value in ddata:
              while len(stack) > depth + 1:
                  {{1}}
              while len(stack) < depth + 1:
                  new = []
                  {{2}}
                  {{3}}
              {{4}}
          return result`,
    blanks: [['stack.pop()'], ['stack[-1].append(new)'], ['stack.append(new)'], ['stack[depth].append(value)']],
    test: `
      def flat(item, depth):
          if type(item) != list:
              return [(depth, item)]
          out = []
          for y in item:
              out += flat(y, depth + 1)
          return out

      def flat_top(lst):
          out = []
          for y in lst:
              out += flat(y, 0)
          return out

      fd1 = [(1, 10), (2, 20), (2, 30), (2, 5), (2, 5), (3, 5), (1, 100), (2, 200), (3, 300)]
      fd2 = [(0, 9), (1, 10), (4, 20), (3, 30), (2, 40), (1, 50), (2, 60), (4, 70), (2, 80), (2, 90), (2, 100), (0, 110)]
      assert flat_top(nested_from_depth(fd1)) == fd1
      assert flat_top(nested_from_depth(fd2)) == fd2
      assert flat_top(nested_from_depth([])) == []`,
    exp: 'A deeper value needs new lists nested inside the current one; a shallower value closes the extra levels again. Closing means popping the stack, opening means appending a fresh list and pushing it. Appending the value to `stack[depth]` places it at exactly the requested depth.'
  },
  {
    id: 'A4-05', src: 'A4', topic: 'Dictionaries', d: 2, type: 'fib',
    t: 'is_ancestor',
    q: 'Complete `is_ancestor(name1, name2, pdict)`. A person is an ancestor if they are the parent, or an ancestor of the parent. Missing names return False.',
    code: `
      def is_ancestor(name1, name2, pdict):
          if name1 not in pdict and name1 not in pdict.values():
              return False
          if name2 not in pdict and name2 not in pdict.values():
              return False
          if name2 not in pdict:
              return False
          return {{1}} or {{2}}`,
    blanks: [['pdict[name2] == name1'], ['is_ancestor(name1, pdict[name2], pdict)']],
    test: `
      parent = {'Amy': 'Ben', 'May': 'Tom', 'Tom': 'Ben', 'Ben': 'Howard',
                'Howard': 'George', 'Frank': 'Amy', 'Joe': 'Bill', 'Bill': 'Mary',
                'Mary': 'Philip', 'Simon': 'Bill', 'Zoe': 'Mary'}
      assert is_ancestor('Howard', 'Amy', parent) is True
      assert is_ancestor('Amy', 'Tom', parent) is False
      assert is_ancestor('George', 'Frank', parent) is True
      assert is_ancestor('Ben', 'Amy', parent) is True
      assert is_ancestor('Luna', 'Amy', parent) is False
      assert is_ancestor('Amy', 'Luna', parent) is False`,
    exp: 'Two ways to succeed: the target person\'s parent is `name1`, or `name1` is an ancestor of that parent. Walking up the parent chain must stop when the chain leaves the dictionary.'
  },
  {
    id: 'A4-06', src: 'A4', topic: 'Dictionaries', d: 3, type: 'fib',
    t: 'is_related',
    q: 'Complete `is_related(name1, name2, pdict)`. Two people are related when their ancestor chains (including themselves) share a name. Missing names return False.',
    code: `
      def is_related(name1, name2, pdict):
          people = list(pdict.keys()) + list(pdict.values())
          if name1 not in people or name2 not in people:
              return False

          def lineage(name):
              chain = {{1}}
              while {{2}}:
                  name = {{3}}
                  chain.append(name)
              return chain

          line1 = lineage(name1)
          for person in lineage(name2):
              if {{4}}:
                  return True
          return False`,
    blanks: [['[name]'], ['name in pdict'], ['pdict[name]'], ['person in line1']],
    test: `
      parent = {'Amy': 'Ben', 'May': 'Tom', 'Tom': 'Ben', 'Ben': 'Howard',
                'Howard': 'George', 'Frank': 'Amy', 'Joe': 'Bill', 'Bill': 'Mary',
                'Mary': 'Philip', 'Simon': 'Bill', 'Zoe': 'Mary'}
      assert is_related('Joe', 'Philip', parent) is True
      assert is_related('Amy', 'Philip', parent) is False
      parent['Ben'] = 'Philip'
      assert is_related('Amy', 'Philip', parent) is True
      assert is_related('Luna', 'Amy', parent) is False
      assert is_related('Amy', 'Amy', parent) is True`,
    exp: 'Build each person\'s chain by following the parent links up to the top. Sharing any name in the two chains means a common ancestor. Including the person themselves in the chain is what makes someone related to themselves.'
  }
]);
