/* Lecture 8 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L8-01': {
    trap: 'dict-dup',
    ans: '2 3',
    wrong: [
      { a: '3 3', trap: 'dict-dup', why: 'A repeated key keeps **one** entry, so there are only two keys.' },
      { a: '2 1', trap: 'dict-dup', why: 'The later value overwrites the earlier one: d[\'a\'] is 3.' }],
    exp: 'Keys are unique. A repeated key overwrites the earlier value, so `d` is `{\'a\': 3, \'b\': 2}`.' },

  'L8-03': {
    trap: 'key-error',
    run: true,
    ans: 'KeyError',
    wrong: [
      { a: 'None', trap: 'key-error', why: 'Indexing with `[]` raises `KeyError` for a missing key; only `.get()` gives None.' },
      { a: '0', trap: 'key-error', why: 'No default is used with `[]`; that is what `.get(key, default)` is for.' },
      { a: 'IndexError', trap: 'key-error', why: 'Dictionaries raise `KeyError`, not `IndexError`.' }],
    exp: 'Square-bracket lookup of a key that is not there raises `KeyError`. Use `in` or `.get()` to be safe.' },

  'L8-04': {
    trap: 'acc-reset',
    ans: '{\'b\': 1, \'a\': 3, \'n\': 2}',
    wrong: [
      { a: '{\'a\': 1}', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: '{\'b\': 2, \'a\': 6, \'n\': 4}', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Keys appear in insertion order: b first, then a, then n. `get(c, 0)` starts a new count at 0.' },

  'L8-05': {
    trap: 'unhashable',
    run: true,
    ans: 'TypeError',
    wrong: [
      { a: '{(1, 2): \'list\'}', trap: 'unhashable', why: 'A list is not the same key as the tuple (1, 2); and lists cannot be keys at all.' },
      { a: '{(1, 2): \'tuple\', [1, 2]: \'list\'}', trap: 'unhashable', why: 'Lists are mutable, so they cannot be dictionary keys: `TypeError`.' },
      { a: 'KeyError', trap: 'unhashable', why: 'Assigning never raises `KeyError`; the problem is that a list is unhashable.' }],
    exp: 'Keys must be immutable (hashable). A tuple is fine, but a list raises `TypeError: unhashable type: \'list\'`.' },

  'L8-06': {
    trap: 'seq-repeat',
    ans: 'xxxyzz',
    wrong: [
      { a: 'x3y1z2', trap: 'seq-repeat', why: '`k * v` repeats the key string v times; it does not join k and v.' },
      { a: 'zz', trap: 'acc-reset', mut: 'acc-reset:0' }],
    exp: '`items()` gives (key, value) pairs in insertion order, and each key is repeated `v` times.' },

  'L8-08': {
    trap: 'state-trace',
    ans: '{\'c\': 3, \'d\': 20}',
    wrong: [
      { a: '{\'b\': 2, \'c\': 3, \'d\': 20}', trap: 'concept', why: '`pop(\'b\')` removes b from the dictionary as well as returning 2.' },
      { a: '{\'c\': 3, \'d\': 2}', trap: 'state-trace', why: 'x is 2, so `d[\'d\']` is x * 10 = 20.' }],
    exp: '`pop` removes `b` and returns 2. The new key `d` is added at the end with value 20, then `a` is deleted.' },

  'L8-09': {
    trap: 'append-extend',
    blanks: [['inv[val] = [key]'], ['inv[val].append(key)', 'inv[val] += [key]', 'inv[val] = inv[val] + [key]']],
    wrong: [
      { b: 2, a: 'inv[val] = [key]', trap: 'state-trace', why: 'That throws away the keys already collected for val.' },
      { b: 2, a: 'inv[val].extend(key)', trap: 'append-extend', why: 'extend adds each **character** of a string key; append adds the key itself.' }],
    test: `
      assert invert_dict({'a': 7, 'b': 4, 'c': 7}) == {7: ['a', 'c'], 4: ['b']}
      assert invert_dict({}) == {}
      assert invert_dict({'ab': 1, 'cd': 1}) == {1: ['ab', 'cd']}`,
    exp: 'Several keys can share a value, so each inverted entry is a **list** of keys. Start a new list the first time a value is seen, and append to it after that.' },

  'L8-10': {
    trap: 'return-in-loop',
    ans: 'b None',
    wrong: [
      { a: 'c None', trap: 'return-in-loop', why: 'Keys are checked in insertion order, and the first match, b, is returned at once.' },
      { a: 'None None', trap: 'return-in-loop', mut: 'return-in-loop:0' }],
    exp: 'Keys are scanned in insertion order and `b` is the first key with value 3. With no match the loop ends and `None` is returned.' },

  'L8-11': {
    trap: 'boundary',
    ans: '11',
    wrong: [
      { a: '13', trap: 'boundary', mut: 'boundary:0' },
      { a: '9', trap: 'off-by-one', mut: 'index-off:2' }],
    exp: 'The first chain fib(6) → … → fib(0) makes 7 calls. After that, the second calls made on the way back up — fib(1) inside fib(3), then the memo hits for fib(2), fib(3) and fib(4) — add 4 more. Without the memo, fib(6) would make 25 calls.' },

  'L8-12': {
    trap: 'off-by-one',
    blanks: [['(n, k)'], ['mc(n - 1, k) + mc(n - 1, k - 1)', 'mc(n - 1, k - 1) + mc(n - 1, k)']],
    wrong: [
      { b: 2, a: 'mc(n, k) + mc(n - 1, k - 1)', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 2, a: 'mc(n - 1, k) + mc(n, k - 1)', trap: 'off-by-one', mut: 'index-off:3' }],
    test: `
      assert memo_choose(5, 2) == 10
      assert memo_choose(30, 15) == 155117520
      assert memo_choose(3, 5) == 0`,
    exp: 'A tuple is immutable, so it can be a key, and it captures both arguments. The recurrence is: leave the item out (n−1, k) or take it (n−1, k−1).' },

  'L8-13': {
    trap: 'memo-cond',
    ans: 'One whose result depends on a global counter that keeps changing',
    wrong: [
      { a: 'A recursive Fibonacci function', trap: 'memo-cond', why: 'Fibonacci always gives the same answer for the same n and repeats calls: the classic case for memoisation.' },
      { a: 'n-choose-k computed recursively', trap: 'memo-cond', why: 'The same (n, k) pairs come up again and again, and the answer never changes.' },
      { a: 'Counting the parking arrangements of n lots', trap: 'memo-cond', why: 'Like Fibonacci, park(n) reuses the same smaller counts many times.' }],
    exp: 'Memoisation needs a deterministic function with no side effects (the same input always gives the same output) and overlapping subproblems. Depending on changing external state breaks the first condition.' },

  'L8-15': {
    trap: 'dict-in',
    run: true,
    ans: 'False True',
    wrong: [
      { a: 'True True', trap: 'dict-in', mut: 'dict-in:0' },
      { a: 'True False', trap: 'dict-in', why: '`in` checks keys: \'one\' is a value, and 2 is a key.' },
      { a: 'False False', trap: 'dict-in', mut: 'dict-in:1' }],
    exp: '`in` on a dict checks the **keys**. To search the values, use `\'one\' in d.values()`.' },

  'L8-16': {
    trap: 'key-error',
    blanks: [['g.get(k, []) + [w]', 'g[k] + [w] if k in g else [w]']],
    wrong: [
      { b: 1, a: 'g[k] + [w]', trap: 'key-error', why: 'The first word for each letter has no list yet, so `g[k]` raises `KeyError`.' },
      { b: 1, a: 'g.get(k, []).append(w)', trap: 'none-return', why: 'append returns None, so g[k] would become None.' }],
    test: `
      assert group(['apple', 'bee', 'avo']) == {'a': ['apple', 'avo'], 'b': ['bee']}
      assert group([]) == {}`,
    exp: '`g.get(k, [])` is the existing list, or an empty list for a new letter. Concatenating `[w]` builds the updated list.' },

  'L8-17': {
    trap: 'dict-iter',
    run: true,
    ans: '200 pear',
    wrong: [
      { a: '200 apple', trap: 'dict-iter', why: 'max over a dict compares the **keys**: \'pear\' is the largest string. It is not the key of the largest value.' },
      { a: '200 80', trap: 'dict-iter', why: '`max(prices)` returns a key, not a value.' },
      { a: '200 kiwi', trap: 'str-compare', why: '\'pear\' > \'kiwi\' > \'apple\', so pear is the maximum.' }],
    exp: 'Iterating over a dict gives its **keys**, so `max(prices)` is the largest key in alphabetical order, `pear`, not the key with the highest price.' },

  'L8-18': {
    trap: 'shallow-copy',
    ans: '{\'x\': [1, 2]}',
    wrong: [
      { a: '{\'x\': [1]}', trap: 'shallow-copy', mut: 'shallow-copy:0' },
      { a: '{\'x\': [1, 2], \'y\': 0}', trap: 'slice-copy', mut: 'slice-copy:0' },
      { a: 'TypeError', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: '`copy()` is shallow, so both dicts share the same list object as the value of `x`. Adding a new key to `b` does not affect `a`.' },

  'L8-20': {
    trap: 'boundary',
    blanks: [['f[c] > f[best]', 'f[best] < f[c]']],
    wrong: [
      { b: 1, a: 'f[c] > best', trap: 'type-error', why: 'best is a character; compare the counts, `f[best]`.' },
      { b: 1, a: 'f[c] >= f[best]', trap: 'boundary', mut: 'boundary:0' }],
    test: `
      assert most_common('abbccc') == 'c'
      assert most_common('aab') == 'a'
      assert most_common('abab') == 'a'`,
    exp: 'A strict `>` replaces `best` only on a strictly higher count. Since keys come in first-seen order, ties keep the earliest character.' },

  'L8-22': {
    trap: 'state-trace',
    ans: '{\'a\': 10, \'b\': 20}',
    wrong: [
      { a: '{\'a\': 1, \'b\': 2}', trap: 'state-trace', why: '`d[k] = ...` assigns into the dictionary, so the values do change.' },
      { a: 'RuntimeError', trap: 'mutate-while-iter', why: 'Changing values (not adding or removing keys) while looping is allowed.' }],
    exp: 'Changing the values of keys that already exist while looping is fine. Only adding or removing keys during iteration causes an error.' },

  'L8-23': {
    trap: 'tuple-comma',
    run: true,
    ans: 'p',
    wrong: [
      { a: 'q', trap: 'tuple-comma', why: '`d[1, 2]` looks up the tuple (1, 2): the comma makes the tuple.' },
      { a: 'KeyError', trap: 'tuple-comma', why: '`1, 2` inside the brackets is the tuple (1, 2), which is a key.' },
      { a: 'TypeError', trap: 'tuple-comma', why: 'Tuple keys are fine, and the round brackets are optional.' }],
    exp: 'Inside `[]`, `1, 2` is a tuple, so `d[1, 2]` is the same as `d[(1, 2)]`.' },

  'L8-24': {
    trap: 'memo-cond',
    ans: 'Each fib(k) is computed once and then fetched from the dictionary',
    wrong: [
      { a: 'Dictionaries run recursion in parallel', trap: 'memo-cond', why: 'Nothing runs in parallel; the speed-up comes from never recomputing a value.' },
      { a: 'The memo version uses a loop instead of recursion', trap: 'memo-cond', why: 'memo_fib is still recursive; it just looks up results it already has.' },
      { a: 'Python caches every function automatically', trap: 'memo-cond', why: 'Plain functions are not cached; the memo dictionary does it explicitly.' }],
    exp: 'The plain version recomputes the same subproblems an exponential number of times. With the memo, each value is computed once, so the work grows only linearly with n.' },

  'L8-25': {
    trap: 'alias',
    ans: '3 150',
    wrong: [
      { a: '2 150', trap: 'alias', why: '`scores[\'cat\']` is the same list as `scores[\'ann\']`, so appending to it changes ann too.' },
      { a: '3 90', trap: 'state-trace', why: '`append(60)` adds to bob\'s list: 90 + 60 = 150.' },
      { a: 'TypeError', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: '`scores[\'cat\'] = scores[\'ann\']` stores the same list object under two keys, so appending through `cat` also grows `ann` to 3 items. Bob\'s scores add up to 90 + 60 = 150.' },

  'L8-26': {
    trap: 'off-by-one',
    blanks: [['d[w] = d.get(w, 0) + 1', 'd[w] = 1 + d.get(w, 0)']],
    wrong: [
      { b: 1, a: 'd[w] = d.get(w, 0)', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'd[w] = d.get(w, 0) + 2', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert count_words(['a', 'b', 'a']) == {'a': 2, 'b': 1}
      assert count_words([]) == {}`,
    exp: '`get(w, 0)` returns 0 for a word seen for the first time, so a single line handles both new and existing words.' },

  'L8-27': {
    trap: 'wrong-var',
    blanks: [['need in seen']],
    wrong: [
      { b: 1, a: 'need in t', trap: 'wrong-var', why: 'Searching t does not tell you whether the partner came **earlier**, and seen[need] may not exist yet.' },
      { b: 1, a: 't[i] in seen', trap: 'wrong-var', why: 'Checks whether the current number was seen, not whether its partner was.' }],
    test: `
      assert two_sum((2, 7, 11, 15), 9) == (0, 1)
      assert two_sum((3, 3), 6) == (0, 1)
      assert two_sum((1, 2), 5) is None
      assert two_sum((4, 1, 5), 6) == (1, 2)`,
    exp: 'The dictionary maps each value seen so far to its index, so "have I already seen the partner?" is a fast lookup. Checking **before** storing `t[i]` stops an element pairing with itself.' },

  'L8-28': {
    trap: 'off-by-one',
    blanks: [['p(r - 1, c) + p(r, c - 1)', 'p(r, c - 1) + p(r - 1, c)']],
    wrong: [
      { b: 1, a: 'p(r, c) + p(r, c - 1)', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'p(r - 2, c) + p(r, c - 1)', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert count_paths(10, 10) == 184756
      assert count_paths(2, 2) == 6
      assert count_paths(16, 16) == 601080390`,
    exp: 'The same (r, c) is reached by many different routes, which is overlapping subproblems. Storing each answer under the key `(r, c)`, a tuple and so hashable, means each is computed only once.' },

  'L8-29': {
    trap: 'unhashable',
    blanks: [['tuple(letters)']],
    wrong: [
      { b: 1, a: 'letters.sort()', trap: 'none-return', why: 'sort() returns None, so every word would get the key None.' },
      { b: 1, a: 'letters', trap: 'type-error', mut: 'drop-call:0' }],
    test: `
      g = group_anagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
      assert sorted(map(sorted, g.values())) == [['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']]`,
    exp: 'Anagrams have the same letters in sorted order. `letters` is a **list**, which cannot be a dictionary key (`TypeError: unhashable type`), so convert it to a tuple. `letters.sort()` returns `None`, so it cannot be the key either.' },

  'L8-30': {
    trap: 'wrong-var',
    blanks: [['out[v] = k']],
    wrong: [
      { b: 1, a: 'out[k] = v', trap: 'wrong-var', why: 'That copies the dictionary; the value must become the key.' },
      { b: 1, a: 'out = {v: k}', trap: 'acc-reset', why: 'Rebinding out each pass throws away the earlier pairs.' }],
    test: `
      assert swap_kv({'a': 1, 'b': 2}) == {1: 'a', 2: 'b'}
      assert swap_kv({}) == {}`,
    exp: 'Each value becomes a key. This only works because the values are unique; with repeated values you need lists, as in `invert_dict`.' },

  'L8-31': {
    trap: 'dict-order',
    ans: '[\'b\', \'c\', \'a\']',
    wrong: [
      { a: '[\'b\', \'a\', \'c\']', trap: 'dict-order', why: 'Deleting \'a\' and adding it again puts it at the **end**.' },
      { a: '[\'c\', \'b\', \'a\']', trap: 'dict-order', why: 'Updating `d[\'b\']` does not move it; it keeps its place.' }],
    exp: 'Updating an existing key (`b`) keeps its position. Deleting `a` and adding it back puts it at the **end**.' },

  'L8-32': {
    trap: 'state-trace',
    ans: '{\'z\': 1} 1',
    wrong: [
      { a: 'x 1', trap: 'state-trace', why: '`d[\'y\']` is \'x\', so `d[d[\'y\']]` is `d[\'x\']`, and its \'y\' entry is {\'z\': 1}.' },
      { a: '{\'z\': 1} 2', trap: 'dict-iter', why: 'len counts only the top-level keys of `d[\'x\']`: just \'y\'.' }],
    exp: '`d[\'y\']` is `\'x\'`, so `d[d[\'y\']]` is `d[\'x\']`, and its `\'y\'` entry is `{\'z\': 1}`. `d[\'x\']` has a single key.' }
});
