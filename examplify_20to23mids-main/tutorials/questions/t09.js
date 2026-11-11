/* Tutorial 9 — Dictionaries
   Converted from AY26/27S1 Week 9 Tutorial Worksheet, Q1–Q3. */
tutorial([
  {
    id: 'T9-01', src: 'T9', topic: 'Creating dicts', d: 1, type: 'mcq',
    t: 'dict() from a sequence of pairs',
    q: 'What is printed?',
    code: `
      a = (("A", 2), ("B", 3), (1, 4))
      dict_a = dict(a)
      print(dict_a)`,
    opts: ["{'A': 2, 'B': 3, 1: 4}", "{'A': 2, 'B': 3, 1: '4'}", "{(('A', 2)): 1, (('B', 3)): 1}", 'TypeError'],
    ans: 0,
    exp: '`dict()` accepts a sequence of pairs: the first item of each pair becomes the key and the second becomes the value, kept in insertion order.'
  },
  {
    id: 'T9-02', src: 'T9', topic: 'Lookup', d: 1, type: 'mcq',
    t: 'Looking up a value as a key',
    q: '`dict_a` is `{1: 2}` after the next three lines. What does the last line print?',
    code: `
      a = (("A", 2), ("B", 3), (1, 4))
      dict_a = dict(a)
      print(dict_a[2])`,
    opts: ['KeyError', '4', "'B'", 'None'],
    ans: 0,
    exp: 'The keys are `\'A\'`, `\'B\'` and `1`. The value `2` is not a key, so square-bracket lookup raises `KeyError` rather than searching the values.'
  },
  {
    id: 'T9-03', src: 'T9', topic: 'Copying', d: 2, type: 'mcq',
    t: 'Shallow copy of a nested dict',
    q: 'What does the final `print(dict_c)` output?',
    code: `
      dict_c = {1: {2: 3}, 4: 5}
      dict_d = dict_c.copy()
      dict_d[4] = 9
      dict_d[1][2] = 9
      print(dict_c)`,
    opts: ['{1: {2: 9}, 4: 5}', '{1: {2: 9}, 4: 9}', '{1: {2: 3}, 4: 9}', '{1: {2: 3}, 4: 5}'],
    ans: 0,
    exp: '`copy()` is shallow: both dictionaries share the same inner dictionary. Changing `dict_d[1][2]` is visible through `dict_c`, but replacing the top-level value `dict_d[4]` is not.'
  },
  {
    id: 'T9-04', src: 'T9', topic: 'Deleting', d: 1, type: 'mcq',
    t: 'Deleting with the wrong key',
    q: 'What is printed?',
    code: `
      b = [[1, "A"], [(2, 3), 4]]
      dict_b = dict(b)
      del dict_b[2]
      print(dict_b)`,
    opts: ['KeyError', "{1: 'A'}", "{1: 'A', (2, 3): 4}", "{(2, 3): 4}"],
    ans: 0,
    exp: 'The keys are `1` and the tuple `(2, 3)`. There is no key `2`, so `del` raises `KeyError` and the dictionary is left untouched.'
  },
  {
    id: 'T9-05', src: 'T9', topic: 'Anagram', d: 2, type: 'fib',
    t: 'is_anagram with dictionaries',
    q: 'Complete `is_anagram(word1, word2)`. Ignore spaces and assume lowercase letters. Two words are anagrams exactly when their letter counts match.',
    code: `
      def is_anagram(word1, word2):
          def char_counts(word):
              dic = {}
              for char in word:
                  if char != " ":
                      if char in dic:
                          {{1}}
                      else:
                          {{2}}
              return dic

          return {{3}}`,
    blanks: [['dic[char] += 1', 'dic[char] = dic[char] + 1'], ['dic[char] = 1'], ['char_counts(word1) == char_counts(word2)']],
    test: `
      assert is_anagram("nag a ram", "anagram") is True
      assert is_anagram("nag ram", "anagram") is False
      assert is_anagram("toyota", "atoyot") is True
      assert is_anagram("toyota", "yototo") is False
      assert is_anagram("", "") is True`,
    exp: 'Build a frequency dictionary for each word, skipping spaces, then compare the dictionaries. Equal dictionaries mean every letter occurs the same number of times.'
  },
  {
    id: 'T9-06', src: 'T9', topic: 'T9 keypad', d: 2, type: 'fib',
    t: 'to_dict: keypad list to dictionary',
    q: 'Complete `to_dict(keyL)`. `keyL` is a list where index `i` holds the characters on key `i`, e.g. `[" ", "", "abc", ..., "wxyz"]`.',
    code: `
      def to_dict(keyL):
          keyD = {}
          for i in range(len(keyL)):
              for char in {{1}}:
                  {{2}}
          return keyD`,
    blanks: [['keyL[i]'], ['keyD[char] = i']],
    test: `
      keyL = [" ", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
      keyD = to_dict(keyL)
      assert keyD[" "] == 0
      assert keyD["a"] == 2 and keyD["c"] == 2
      assert keyD["s"] == 7 and keyD["z"] == 9
      assert len(keyD) == 27`,
    exp: 'The list index is the digit. Walking each key string and storing `char → i` inverts the representation; the empty string on key 1 simply adds nothing.'
  },
  {
    id: 'T9-07', src: 'T9', topic: 'T9 keypad', d: 3, type: 'fib',
    t: 'to_list: keypad dictionary to list',
    q: 'Complete `to_list(keyD)`. The result must be the list representation, built by appending each character to the entry for its digit.',
    code: `
      def to_list(keyD):
          keyL = [""] * ({{1}})
          for k, v in keyD.items():
              {{2}}
          return keyL`,
    blanks: [['max(keyD.values()) + 1'], ['keyL[v] += k', 'keyL[v] = keyL[v] + k']],
    test: `
      keyD = {" ": 0, "a": 2, "b": 2, "c": 2, "d": 3, "e": 3, "f": 3,
              "g": 4, "h": 4, "i": 4, "j": 5, "k": 5, "l": 5,
              "m": 6, "n": 6, "o": 6, "p": 7, "q": 7, "r": 7, "s": 7,
              "t": 8, "u": 8, "v": 8, "w": 9, "x": 9, "y": 9, "z": 9}
      keyL = to_list(keyD)
      assert keyL == [" ", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]`,
    exp: 'The largest digit tells you how many slots are needed, so make `max(values) + 1` empty strings. Each character is then appended to the slot named by its digit; the dictionary order in the example adds the letters alphabetically.'
  },
  {
    id: 'T9-08', src: 'T9', topic: 'T9 keypad', d: 2, type: 'fib',
    t: 'to_nums: typing a word',
    q: 'Complete `to_nums(word)`, which turns a string into the integer formed by the digits of its letters. `keyD` is already defined.',
    code: `
      def to_nums(word):
          num = 0
          for char in word:
              num = {{1}}
          return num`,
    blanks: [['num * 10 + keyD[char]']],
    test: `
      keyD = {" ": 0, "a": 2, "b": 2, "c": 2, "d": 3, "e": 3, "f": 3,
              "g": 4, "h": 4, "i": 4, "j": 5, "k": 5, "l": 5,
              "m": 6, "n": 6, "o": 6, "p": 7, "q": 7, "r": 7, "s": 7,
              "t": 8, "u": 8, "v": 8, "w": 9, "x": 9, "y": 9, "z": 9}
      assert to_nums("i luv u") == 4058808
      assert to_nums("toyota beats anagram") == 86968202328702624726`,
    exp: 'Shift the digits already collected one place left with `num * 10`, then add the digit of the current character. That is the same left-to-right build used to turn digits into an integer by hand.'
  },
  {
    id: 'T9-09', src: 'T9', topic: 'Iteration', d: 2, type: 'mcq',
    t: 'Items in insertion order',
    q: 'What is printed?',
    code: `
      b = [[1, "A"], [(2, 3), 4]]
      dict_b = dict(b)
      for k, v in dict_b.items():
          print(k, v)`,
    opts: ['1 A then (2, 3) 4', '(2, 3) 4 then 1 A', 'A 1 then 4 (2, 3)', 'TypeError'],
    ans: 0,
    exp: '`items()` yields `(key, value)` pairs in insertion order. Unpacking each pair into `k, v` prints `1 A` first, then `(2, 3) 4`.'
  },
  {
    id: 'T9-10', src: 'T9', topic: 'Keys', d: 1, type: 'mcq',
    t: 'A list as a dictionary key',
    q: 'What happens?',
    code: `
      d = {[1, 2]: 'a'}`,
    opts: ['TypeError', "d becomes {[1, 2]: 'a'}", 'KeyError', "d becomes {(1, 2): 'a'}"],
    ans: 0,
    exp: 'Dictionary keys must be immutable (hashable). A list is mutable, so building the dictionary raises `TypeError: unhashable type: \'list\'`. A tuple key would be fine.'
  },
  {
    id: 'T9-11', src: 'T9', topic: 'Nested data', d: 1, type: 'mcq',
    t: 'Mutating a list stored in a dict',
    q: 'What is printed?',
    code: `
      d = {1: [2, 3]}
      d[1][0] = 9
      print(d)`,
    opts: ['{1: [9, 3]}', "{1: [2, 3]}", 'TypeError', "{9: [2, 3]}"],
    ans: 0,
    exp: 'The **key** must be immutable, but the value does not have to be. `d[1]` fetches the list and `[0] = 9` changes its first element.'
  }
]);
