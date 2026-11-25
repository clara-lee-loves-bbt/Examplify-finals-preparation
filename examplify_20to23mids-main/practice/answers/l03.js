/* Lecture 3 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L3-01': {
    trap: 'slice-stop',
    ans: '(8, 9)',
    wrong: [
      { a: '(8, 9, 7)', trap: 'slice-stop', mut: 'slice-stop:0' },
      { a: '(1, 4)', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Start at index 1, stop before index 5, step 2: indices 1 and 3, so `(8, 9)`.' },

  'L3-02': {
    trap: 'slice-step',
    ans: '(7, 9, 8)',
    wrong: [
      { a: '(3, 1, 4)', trap: 'slice-step', why: 'A negative step starts from the **end**: indices 5, 3, 1.' },
      { a: '(8, 9, 7)', trap: 'slice-step', why: 'That is `t[1::2]`, going left to right. With `-2` you start at the last item and move left.' }],
    exp: 'A negative step starts from the end: indices 5, 3, 1, which hold 7, 9 and 8.' },

  'L3-03': {
    trap: 'slice-step',
    ans: '(4, 9, 1)',
    wrong: [
      { a: '()', trap: 'slice-step', mut: 'slice-step:0' },
      { a: '(4, 9)', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Go from index 4 down to just before index 1: indices 4, 3, 2, which hold 4, 9 and 1.' },

  'L3-04': {
    trap: 'slice-step',
    run: true,
    ans: '()',
    wrong: [
      { a: '(8, 1, 9)', trap: 'slice-step', why: 'That is `t[1:4]`. With step -1 the slice walks left, and index 1 is already left of 4, so nothing is picked.' },
      { a: '(9, 1, 8)', trap: 'slice-step', mut: 'slice-step:0' },
      { a: 'IndexError', trap: 'index-error', why: 'Slicing never raises `IndexError`; an impossible slice is just empty.' }],
    exp: 'With a negative step the slice moves right to left, but `start = 1` is already left of `stop = 4`, so nothing is selected. Slicing never raises `IndexError`.' },

  'L3-05': {
    trap: 'slice-stop',
    ans: 'ingpr',
    wrong: [
      { a: 'ingpro', trap: 'slice-stop', mut: 'slice-stop:0' },
      { a: 'ingp', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: '`s[-3:]` is the last three characters `ing`, and `s[:2]` is `pr`.' },

  'L3-06': {
    trap: 'type-error',
    run: true,
    ans: 'TypeError',
    wrong: [
      { a: '(9, 2, 3)', trap: 'type-error', why: 'Tuples are immutable: assigning to `t[0]` raises `TypeError`.' },
      { a: 'IndexError', trap: 'type-error', why: 'Index 0 exists. The problem is assigning into a tuple at all.' },
      { a: '(1, 2, 3)', trap: 'type-error', why: 'The assignment is not silently ignored; it raises before `print` runs.' }],
    exp: 'Tuples are immutable: item assignment raises `TypeError: \'tuple\' object does not support item assignment`.' },

  'L3-07': {
    trap: 'seq-repeat',
    ans: '(1, 2, 1, 2, 3)',
    wrong: [
      { a: '(1, 2, 3, 1, 2, 3)', trap: 'precedence', why: '`*` binds tighter than `+`, so only `(1, 2)` is repeated, then `(3,)` is added.' },
      { a: '(2, 4, 3)', trap: 'seq-repeat', why: '`* 2` repeats the tuple; it does not double each element.' },
      { a: 'TypeError', trap: 'tuple-comma', mut: 'tuple-comma:0' }],
    exp: '`*` binds tighter than `+`: `(1, 2) * 2 = (1, 2, 1, 2)`, then `(3,)` is appended.' },

  'L3-08': {
    trap: 'tuple-comma',
    run: true,
    ans: '10 (5, 5)',
    wrong: [
      { a: '(5, 5) (5, 5)', trap: 'tuple-comma', why: '`(5)` is just the int 5; brackets only group. The trailing comma is what makes `(5,)` a tuple.' },
      { a: '10 10', trap: 'tuple-comma', mut: 'tuple-comma:0' },
      { a: '(10,) (5, 5)', trap: 'tuple-comma', why: '`(5)` is not a tuple, so `x * 2` is the int `10`.' }],
    exp: 'Parentheses alone only group: `(5)` is the int `5`. The trailing comma is what makes `(5,)` a one-element tuple, and `* 2` repeats it.' },

  'L3-09': {
    trap: 'off-by-one',
    ans: 'dY',
    wrong: [
      { a: 'eY', trap: 'off-by-one', mut: 'index-off:0' },
      { a: 'cY', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: 'Three letters after `a` is `d`, and one letter before `Z` is `Y`.' },

  'L3-10': {
    trap: 'char-code',
    ans: '14',
    wrong: [
      { a: '62', trap: 'char-code', why: 'Takes `ord(\'0\')` as 0. Digit characters start at code 48, so `ord(\'7\') - ord(\'0\')` is 7.' },
      { a: '77', trap: 'char-code', why: '`int(\'7\')` is the number 7 and the left part is also the number 7, so `+` adds them: 14.' }],
    exp: 'The digit characters are consecutive in ASCII, so `ord(\'7\') - ord(\'0\') = 7`. Adding `int(\'7\') = 7` gives `14`.' },

  'L3-11': {
    trap: 'str-compare',
    run: true,
    ans: 'True True False',
    wrong: [
      { a: 'False True False', trap: 'str-compare', why: 'Uppercase comes before lowercase: `\'A\'` (65) < `\'a\'` (97).' },
      { a: 'True False False', trap: 'str-compare', why: 'Strings compare character by character: `\'1\' < \'9\'`, so `\'10\' < \'9\'` is True.' },
      { a: 'False False False', trap: 'str-compare', why: 'Both string comparisons are True: uppercase sorts first, and strings are compared character by character, not as numbers.' }],
    exp: 'Uppercase letters come before lowercase in ASCII, so `\'A\' < \'a\'`. Strings are compared character by character, so `\'1\' < \'9\'` makes `\'10\' < \'9\'` true even though 10 > 9 as numbers.' },

  'L3-12': {
    trap: 'range-stop',
    ans: '(1, 4, 9, 16)',
    wrong: [
      { a: '(1, 4, 9, 16, 25)', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '(4, 9, 16)', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '`range(1, 5)` gives 1, 2, 3, 4 and each is squared.' },

  'L3-13': {
    trap: 'filter-keeps',
    run: true,
    ans: '(\'e\', \'u\', \'a\', \'i\', \'o\')',
    wrong: [
      { a: '(\'a\', \'e\', \'i\', \'o\', \'u\')', trap: 'filter-keeps', why: 'filter keeps the vowels **in the order they appear** in the word; it does not sort them.' },
      { a: '\'euaio\'', trap: 'filter-keeps', why: '`tuple(...)` gives a tuple of one-character strings, not a joined string.' },
      { a: '(\'d\', \'c\', \'t\', \'n\')', trap: 'filter-keeps', why: 'filter keeps the items for which the lambda is True (the vowels); it does not drop them.' }],
    exp: 'A string is iterable character by character. `filter` keeps the vowels **in their original order**: e, u, a, i, o. The result is a tuple of one-character strings.' },

  'L3-14': {
    trap: 'reduce-order',
    ans: '307',
    wrong: [
      { a: '703', trap: 'reduce-order', why: 'reduce goes left to right: 0 → 3 → 30 → 307.' },
      { a: '10', trap: 'reduce-order', why: 'The accumulator is multiplied by 10 at every step; this is not the sum 3 + 0 + 7.' }],
    exp: 'Start with `0`: `0*10 + 3 = 3`, then `3*10 + 0 = 30`, then `30*10 + 7 = 307`.' },

  'L3-15': {
    trap: 'reduce-order',
    ans: '4',
    wrong: [
      { a: '8', trap: 'reduce-order', why: 'That groups from the right, 10 - (3 - (2 - 1)). reduce groups from the left: ((10 - 3) - 2) - 1.' },
      { a: '-16', trap: 'reduce-init', why: 'There is no initializer, so the first call is f(10, 3), not f(0, 10).' }],
    exp: 'With no initializer the first element is the start: `((10 - 3) - 2) - 1 = 4`.' },

  'L3-16': {
    trap: 'reduce-order',
    run: true,
    ans: 'cba',
    wrong: [
      { a: 'abc', trap: 'reduce-order', why: 'Each step puts the new letter **in front** (`b + a`), so the string comes out reversed.' },
      { a: 'bca', trap: 'reduce-order', why: 'Trace it: \'\' → \'a\' → \'ba\' → \'cba\'.' },
      { a: 'cab', trap: 'reduce-order', why: 'Trace it: \'\' → \'a\' → \'ba\' → \'cba\'. Every new letter goes to the front.' }],
    exp: 'Each new character goes **in front** of the accumulator: `\'\'` → `a` → `ba` → `cba`.' },

  'L3-17': {
    trap: 'reduce-init',
    run: true,
    ans: 'TypeError',
    wrong: [
      { a: '0', trap: 'reduce-init', why: 'With no initializer and nothing to reduce, reduce has no starting value, so it raises `TypeError`.' },
      { a: '()', trap: 'reduce-init', why: 'reduce does not return the empty input; with no initializer it raises `TypeError`.' },
      { a: 'None', trap: 'reduce-init', why: 'reduce never gives None here; with no items and no initializer it raises `TypeError`.' }],
    exp: 'With no initializer `reduce` needs at least one element to start from, so an empty sequence raises `TypeError`. Passing an initializer, e.g. `reduce(f, (), 0)`, returns `0`.' },

  'L3-18': {
    trap: 'off-by-one',
    ans: '(10, 7, 4, 1)',
    wrong: [
      { a: '(10, 7, 4)', trap: 'off-by-one', mut: 'index-off:0' },
      { a: '(10, 6, 2)', trap: 'off-by-one', mut: 'index-off:2' }],
    exp: 'Start at 10 and step by -3 while staying above 0 (the stop is excluded): 10, 7, 4, 1.' },

  'L3-19': {
    trap: 'range-step',
    ans: '5',
    wrong: [
      { a: '17', trap: 'range-step', why: 'len counts the values produced (3, 7, 11, 15, 19), not the distance 20 - 3.' },
      { a: '4', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'The values are 3, 7, 11, 15, 19, so there are 5.' },

  'L3-20': {
    trap: 'hof-trace',
    run: true,
    ans: '13',
    wrong: [
      { a: '7', trap: 'hof-trace', why: '`twice(inc)` adds 6, and twice of **that** adds 12: 1 + 12 = 13.' },
      { a: '10', trap: 'hof-trace', why: 'That applies inc 3 times. `twice(twice(inc))` applies it 2 × 2 = 4 times.' },
      { a: '25', trap: 'hof-trace', why: 'twice composes the function with itself; it does not square the number.' }],
    exp: '`twice(inc)` adds 3 twice, i.e. adds 6. `twice` of **that** adds 6 twice, i.e. 12. So `1 + 12 = 13`.' },

  'L3-21': {
    trap: 'hof-trace',
    ans: '12 6',
    wrong: [
      { a: '11 3', trap: 'hof-trace', why: '`compose(f, g)` runs **g first**: h(5) = (5 + 1) * 2 = 12, not 5 * 2 + 1.' },
      { a: '12 2', trap: 'hof-trace', why: '`compose(h, h)(0)` is h(h(0)) = h(2) = 6; applying h once gives only 2.' },
      { a: '10 0', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: '`h(x) = (x + 1) * 2`, so `h(5) = 12`. `compose(h, h)(0) = h(h(0)) = h(2) = 6`.' },

  'L3-22': {
    trap: 'operator-choice',
    blanks: [['p[i] * x ** i', 'x ** i * p[i]', 'p[i] * (x ** i)', 'p[i] * x**i']],
    wrong: [
      { b: 1, a: 'p[i] * x * i', trap: 'operator-choice', why: 'Multiplies by i instead of raising x to the power i: use `**`.' },
      { b: 1, a: 'x ** p[i]', trap: 'wrong-var', why: 'Swaps the roles: the coefficient `p[i]` multiplies `x ** i`.' }],
    test: `
      assert poly((3, -8, -2, 4))(-2) == -21
      assert poly((5,))(9) == 5`,
    exp: 'Coefficient `p[i]` belongs to `x ** i`, so each term is `p[i] * x ** i` and the generator sums them.' },

  'L3-23': {
    trap: 'boundary',
    blanks: [['lambda c: \'A\' <= c <= \'Z\'', 'lambda c: c >= \'A\' and c <= \'Z\'', 'lambda x: \'A\' <= x <= \'Z\'', 'lambda x: x >= \'A\' and x <= \'Z\'', 'lambda c: \'Z\' >= c >= \'A\'', 'lambda x: \'Z\' >= x >= \'A\'']],
    wrong: [
      { b: 1, a: 'lambda c: \'A\' < c < \'Z\'', trap: 'boundary', why: 'Strict `<` leaves out `\'A\'` and `\'Z\'` themselves.' },
      { b: 1, a: 'lambda c: \'a\' <= c <= \'z\'', trap: 'str-compare', why: 'That counts lowercase letters.' },
      { b: 1, a: 'lambda c: (\'A\' <= c) <= \'Z\'', trap: 'chain-cmp', mut: 'chain-cmp:0' }],
    test: `
      assert count_upper('Hello NUS') == 4
      assert count_upper('AZ@[az') == 2
      assert count_upper('') == 0
      assert count_upper('abc') == 0`,
    exp: '`filter` needs a function that returns `True` for the characters to keep. A chained comparison against `\'A\'` and `\'Z\'` keeps exactly the uppercase letters.' },

  'L3-24': {
    trap: 'int-div',
    blanks: [['lambda i: 4 * (-1) ** (i - 1) / (2 * i - 1)', 'lambda i: 4*(-1)**(i-1)/(2*i-1)', 'lambda x: 4 * (-1) ** (x - 1) / (2 * x - 1)']],
    wrong: [
      { b: 1, a: 'lambda i: 4 * (-1) ** (i - 1) // (2 * i - 1)', trap: 'int-div', mut: 'int-div:0' },
      { b: 1, a: 'lambda i: 4 * (-1) ** i / (2 * i - 1)', trap: 'off-by-one', mut: 'index-off:3' }],
    test: `
      assert p(1) == 4
      assert abs(p(2) - 2.666666666666667) < 1e-12`,
    exp: '`map` needs a one-argument function that turns the term number `i` into the term value. The `(-1) ** (i - 1)` factor makes the signs alternate.' },

  'L3-25': {
    trap: 'range-stop',
    ans: 'tuple(range(0, 7, 2))',
    wrong: [
      { a: 'tuple(range(0, 6, 2))', trap: 'range-stop', why: 'range stops **before** 6, giving (0, 2, 4).' },
      { a: 'tuple(i * 2 for i in range(3))', trap: 'range-stop', why: 'range(3) is 0, 1, 2, so this gives (0, 2, 4).' },
      { a: 'tuple(filter(lambda x: x % 2, range(7)))', trap: 'truthiness', why: '`x % 2` is 1 (truthy) for odd x, so this keeps the odd numbers (1, 3, 5).' }],
    verify: `
      assert tuple(range(0, 7, 2)) == (0, 2, 4, 6)
      assert tuple(range(0, 6, 2)) != (0, 2, 4, 6)
      assert tuple(i * 2 for i in range(3)) != (0, 2, 4, 6)
      assert tuple(filter(lambda x: x % 2, range(7))) != (0, 2, 4, 6)`,
    exp: 'The stop value is excluded, so it must be past 6. `range(0, 6, 2)` and `i * 2 for i in range(3)` both stop at 4, and `x % 2` is truthy for **odd** numbers.' },

  'L3-26': {
    trap: 'off-by-one',
    ans: '(3, -5, 7)',
    wrong: [
      { a: '(-5, 7)', trap: 'off-by-one', mut: 'index-off:0' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:0' }],
    exp: 'For i = 1, 2, 3 this computes 7−4, 2−7 and 9−2.' },

  'L3-27': {
    trap: 'in-sequence',
    run: true,
    ans: 'True False',
    wrong: [
      { a: 'True True', trap: 'in-sequence', why: 'On a tuple, `in` checks single elements. `(1, 0)` is not an element of `(1, 0, 1)`.' },
      { a: 'False False', trap: 'in-sequence', why: 'On strings, `in` checks substrings, so `\'101\' in \'cs1010e\'` is True.' },
      { a: 'False True', trap: 'in-sequence', why: 'Both are reversed: strings match substrings, tuples only match whole elements.' }],
    exp: 'For strings, `in` checks for a **substring**. For tuples, `in` checks whether one **element** equals the value. No element of `(1, 0, 1)` is the tuple `(1, 0)`.' },

  'L3-28': {
    trap: 'hof-trace',
    run: true,
    ans: '13',
    wrong: [
      { a: '11', trap: 'off-by-one', why: '`fs[2]` is the **third** function, `adder(3)`, not `adder(1)`.' },
      { a: '12', trap: 'off-by-one', mut: 'index-off:1', why: '`fs[2]` is `adder(3)`; index 2 is the third item.' },
      { a: '16', trap: 'hof-trace', why: '`adder(3)` adds 3 once; the functions are not chained together.' }],
    exp: '`fs` holds `adder(1)`, `adder(2)` and `adder(3)`. `fs[2]` is `adder(3)`, which adds 3 to its argument: `10 + 3 = 13`.' },

  'L3-29': {
    trap: 'seq-repeat',
    ans: 'NUSNUSSUN',
    wrong: [
      { a: 'NUSNUSNUS', trap: 'slice-step', why: '`s[::-1]` is the string reversed, SUN.' },
      { a: 'NUSSUN', trap: 'seq-repeat', why: '`s * 2` repeats the whole string: NUSNUS.' }],
    exp: '`s * 2` is `NUSNUS`, and `s[::-1]` reverses it to `SUN`.' },

  'L3-30': {
    trap: 'iter-once',
    run: true,
    ans: '(2, 3, 4) ()',
    wrong: [
      { a: '(2, 3, 4) (2, 3, 4)', trap: 'iter-once', mut: 'iter-once:0' },
      { a: '(2, 3, 4) (3, 4, 5)', trap: 'iter-once', why: 'map does not run again on its own output; the second `tuple(m)` finds the map used up.' },
      { a: '() ()', trap: 'iter-once', why: 'The first pass collects all three values; only the second pass is empty.' }],
    exp: '`map` returns an **iterator**, which can be consumed only once. The first `tuple(m)` uses up every value, so the second one is empty.' },

  'L3-31': {
    trap: 'range-stop',
    ans: '(0, 0, 2, 0, 3, 6)',
    wrong: [
      { a: '(0, 1, 0, 2, 4, 0, 3, 6, 9)', trap: 'range-stop', mut: 'range-stop:1' },
      { a: '(0, 0, 2, 0, 3, 6, 0, 4, 8, 12)', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '(1, 2, 4, 3, 6, 9)', trap: 'range-zero', mut: 'range-zero:0' }],
    exp: 'The first `for` is the outer loop. i=1: j=0 gives 0. i=2: j=0,1 gives 0, 2. i=3: j=0,1,2 gives 0, 3, 6.' },

  'L3-32': {
    trap: 'off-by-one',
    blanks: [['lambda acc, x: acc + 1', 'lambda x, y: x + 1', 'lambda a, b: a + 1']],
    wrong: [
      { b: 1, a: 'lambda acc, x: acc', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'lambda acc, x: acc + 2', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert length((5, 6, 7)) == 3
      assert length(()) == 0
      assert length("hello") == 5`,
    exp: 'The accumulator starts at `0` and goes up by one per element, ignoring the element itself. Just like the lecture\'s `reduce(lambda x, y: x + 1, …, 0)`.' },

  'L3-33': {
    trap: 'missing-return',
    ans: 'def f(a, b):\n    return a * b + 1',
    wrong: [
      { a: 'def f(x, y):\n    print(x * y + 1)', trap: 'missing-return', why: 'It prints the value but returns None, unlike the lambda.' },
      { a: 'def f(x, y):\n    x * y + 1', trap: 'missing-return', why: 'Without `return` the value is thrown away and the call gives None.' },
      { a: 'def f(x):\n    return x * x + 1', trap: 'wrong-var', why: 'Takes one parameter, not two, and squares it.' }],
    exp: 'Parameter names do not matter, only their positions. A lambda **returns** its expression. Printing it, or writing the expression without `return`, makes the function return `None`.' },

  'L3-34': {
    trap: 'slice-step',
    ans: 'EGI',
    wrong: [
      { a: '', trap: 'slice-step', mut: 'slice-step:0' },
      { a: 'CEGI', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: '`s[8:2:-2]` takes indices 8, 6, 4, which hold `I`, `G` and `E`. Reversing gives `EGI`.' },

  'L3-35': {
    trap: 'concept',
    ans: '(4, 10)',
    wrong: [
      { a: '(4, 10, 3)', trap: 'concept', why: 'map stops at the shorter iterable, so 3 has no partner and is dropped.' },
      { a: '(4, 5, 8, 10, 12, 15)', trap: 'concept', why: 'map pairs items by position; it does not combine every item with every other.' }],
    exp: 'The pairs are `(1, 4)` and `(2, 5)`. The third element of the first tuple has no partner, so `map` stops there.' },

  'L3-36': {
    trap: 'slice-step',
    ans: 'eded',
    wrong: [
      { a: 'dede', trap: 'slice-step', why: '`[::-1]` reverses \'de\' to \'ed\' before it is repeated.' },
      { a: 'cbacba', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: '`(\'abc\', \'de\')[1]` is `\'de\'`. Reversed it is `\'ed\'`, and `* 2` repeats it.' },

  'L3-37': {
    trap: 'late-binding',
    run: true,
    ans: '12 12',
    wrong: [
      { a: '10 12', trap: 'late-binding', why: 'Each lambda looks up `i` when it is **called**, after the comprehension has finished with i = 2.' },
      { a: '10 10', trap: 'late-binding', why: 'All three lambdas share the same `i`, which is 2 by the time they run.' },
      { a: '11 13', trap: 'late-binding', why: 'The lambdas see i = 2 when called, so both add 2.' }],
    exp: 'Each lambda looks up `i` **when it is called**, not when it is created. By then the comprehension has finished and `i` is 2 for every one of them, so all three add 2.' },

  'L3-38': {
    trap: 'hof-trace',
    ans: '18',
    wrong: [
      { a: '6', trap: 'hof-trace', why: 'f is applied **twice**: 2 → 6 → 18.' },
      { a: '12', trap: 'hof-trace', why: '`f(f(x))` is 3 * (3 * 2), not 2 * 3 * 2.' }],
    exp: 'The outer lambda applies `f` twice: `f(2) = 6`, then `f(6) = 18`.' },

  'L3-39': {
    trap: 'reduce-order',
    ans: '9',
    wrong: [
      { a: '7', trap: 'reduce-order', why: 'The lambda keeps the larger of the two each step, so the result is the overall maximum, not the last item.' },
      { a: '3', trap: 'reduce-order', why: 'The accumulator starts as 3 but is replaced by 9 as soon as a larger item appears.' }],
    exp: 'The accumulator keeps the larger of itself and each new element: 3 → 9 → 9 → 9.' },

  'L3-40': {
    trap: 'tuple-comma',
    ans: '(2, 4, 6)',
    wrong: [
      { a: '12', trap: 'tuple-comma', why: '`(x * 2,)` is a one-element tuple, so tuples are joined; the numbers are not added.' },
      { a: 'TypeError', trap: 'reduce-init', mut: 'reduce-init:0' }],
    exp: 'Starting from the empty tuple, each step concatenates a one-element tuple `(x * 2,)`. The comma matters: `(x * 2)` would just be an int, and `tuple + int` is an error.' },

  'L3-41': {
    trap: 'truthiness',
    run: true,
    ans: '(1, 0, 2, 1, 0)',
    wrong: [
      { a: '(0, 2, 1, 0, 2)', trap: 'truthiness', why: '`x % 2` is truthy for odd x, so filter keeps 1, 3, 5, 7, 9. This answer comes from the even numbers.' },
      { a: '(1, 2, 0, 1, 2)', trap: 'hof-trace', why: 'filter runs first; map then takes `% 3` of 1, 3, 5, 7, 9.' },
      { a: '(0, 1, 2, 0, 1)', trap: 'hof-trace', why: 'map works on what filter kept (1, 3, 5, 7, 9), not on 0 to 4.' }],
    exp: 'The filter keeps the odd numbers 1, 3, 5, 7, 9 (where `x % 2` is 1, which is truthy). Taking each mod 3 gives 1, 0, 2, 1, 0.' },

  'L3-42': {
    trap: 'slice-step',
    ans: 'Hlod dlr',
    wrong: [
      { a: 'Hlod', trap: 'slice-step', mut: 'slice-step:0' },
      { a: 'Hlod lr', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '`s[::3]` takes indices 0, 3, 6, 9: H, l, o, d. `s[-1:-4:-1]` takes the last three characters backwards: d, l, r.' },

  'L3-43': {
    trap: 'wraparound',
    blanks: [['chr((ord(c) - ord(\'a\') + k) % 26 + ord(\'a\'))', 'chr(ord(\'a\') + (ord(c) - ord(\'a\') + k) % 26)', 'chr((ord(c) - 97 + k) % 26 + 97)']],
    wrong: [
      { b: 1, a: 'chr(ord(c) + k)', trap: 'wraparound', why: 'Never wraps: `\'z\'` shifted by 2 becomes `\'|\'`. Shift to 0-25, take `% 26`, then add `ord(\'a\')` back.' },
      { b: 1, a: 'chr((ord(c) + k) % 26)', trap: 'wraparound', why: 'Takes `% 26` of the raw character code. Subtract `ord(\'a\')` first, then add it back.' }],
    test: `
      assert shift('xyz', 2) == 'zab'
      assert shift('abc', 0) == 'abc'
      assert shift('hello', 13) == 'uryyb'`,
    exp: 'Convert the letter to a position 0–25 (`ord(c) - ord(\'a\')`), add `k`, wrap with `% 26`, then convert back with `chr(... + ord(\'a\'))`.' },

  'L3-44': {
    trap: 'hof-trace',
    ans: '7 -7',
    wrong: [
      { a: '7 7', trap: 'hof-trace', why: 'The argument order is kept: `sub(3)(10)` is 3 - 10.' },
      { a: '-7 7', trap: 'hof-trace', why: '`x` is the first argument: `sub(10)(3)` is 10 - 3.' }],
    exp: '`sub(10)` fixes `a = 10` and returns a function waiting for `b`. Calling it with 3 gives 10 − 3.' },

  'L3-45': {
    trap: 'str-compare',
    run: true,
    ans: 'cherry 10',
    wrong: [
      { a: 'Banana 9', trap: 'str-compare', why: 'Uppercase `\'B\'` (66) is smaller than any lowercase letter, so Banana is the minimum, not the maximum. And `\'9\' > \'1\'`.' },
      { a: 'cherry 9', trap: 'str-compare', why: '`\'9\' > \'1\'`, so `\'9\'` is the **largest** of the three strings, not the smallest.' },
      { a: 'Banana 10', trap: 'str-compare', why: '`\'B\'` sorts before every lowercase letter, so `\'Banana\'` is the smallest.' }],
    exp: 'Strings are compared character by character in ASCII order. Lowercase letters come after uppercase, so `cherry` is the largest. For the min, `\'10\'` is a prefix of `\'100\'`, so it is smaller, and `\'1\' < \'9\'`.' },

  'L3-46': {
    trap: 'hof-trace',
    blanks: [['f(repeat(f, n - 1)(x))', 'repeat(f, n - 1)(f(x))']],
    wrong: [
      { b: 1, a: 'f(f(x))', trap: 'hof-trace', why: 'Applies f exactly twice, whatever n is.' },
      { b: 1, a: 'f(repeat(f, n)(x))', trap: 'off-by-one', mut: 'index-off:1' }],
    test: `
      assert repeat(lambda x: x * 2, 3)(1) == 8
      assert repeat(lambda x: x + 1, 0)(5) == 5
      assert repeat(lambda s: s + "a", 2)("") == "aa"`,
    exp: 'Applying `f` n times is applying it once to the result of applying it n − 1 times. With n = 0 you get the identity function.' },

  'L3-47': {
    trap: 'truthiness',
    blanks: [['lambda x: x * x', 'lambda x: x ** 2', 'lambda x: x**2'], ['lambda x: x % 2 == 1', 'lambda x: x % 2', 'lambda x: x % 2 != 0']],
    wrong: [
      { b: 2, a: 'lambda x: x % 2 == 0', trap: 'truthiness', why: 'That keeps the **even** numbers.' },
      { b: 1, a: 'lambda x: x * 2', trap: 'operator-choice', why: 'Doubles instead of squaring.' }],
    test: `
      assert odd_squares((1, 2, 3, 4, 5)) == (1, 9, 25)
      assert odd_squares((2, 4)) == ()`,
    exp: '`filter` runs first (it is the inner call) and keeps the odd numbers. Then `map` squares them. `x % 2` alone works as a filter because 1 is truthy and 0 is falsy.' },

  'L3-48': {
    trap: 'reduce-init',
    blanks: [['lambda a, b: a * b', 'lambda x, y: x * y', 'lambda acc, x: acc * x'], ['1']],
    wrong: [
      { b: 2, a: '0', trap: 'reduce-init', why: 'An initializer of 0 makes every product 0. The starting value for a product is 1.' },
      { b: 1, a: 'lambda a, b: a + b', trap: 'operator-choice', why: 'That is the sum.' }],
    test: `
      assert product((2, 3, 4)) == 24
      assert product(()) == 1
      assert product((5,)) == 5`,
    exp: 'The initializer must be the identity for multiplication, which is 1, not 0. It also makes the empty tuple safe instead of raising `TypeError`.' },

  'L3-49': {
    trap: 'slice-stop',
    blanks: [['t[k:] + t[:k]']],
    wrong: [
      { b: 1, a: 't[k:] + t[:k + 1]', trap: 'slice-stop', mut: 'slice-stop:0' }],
    test: `
      assert rotate((1, 2, 3, 4, 5), 2) == (3, 4, 5, 1, 2)
      assert rotate((1, 2, 3), 4) == (2, 3, 1)
      assert rotate((7,), 9) == (7,)`,
    exp: 'Everything from position `k` onwards moves to the front, followed by the first `k` elements. `k % len(t)` handles rotating by more than the length.' },

  'L3-50': {
    trap: 'slice-step',
    blanks: [['s == s[::-1]', 's[::-1] == s']],
    wrong: [
      { b: 1, a: 's[0] == s[-1]', trap: 'concept', why: 'Only compares the first and last characters: `\'lever\'` would wrongly pass if it ended in l.' },
      { b: 1, a: 's[::-1]', trap: 'truthiness', why: 'That returns the reversed string, which is truthy, not a True/False test.' }],
    test: `
      assert is_pal('level') and is_pal('') and is_pal('a')
      assert not is_pal('lever')`,
    exp: 'A palindrome equals its own reverse, and `[::-1]` reverses any sequence.' },

  'L3-51': {
    trap: 'wrong-var',
    blanks: [['f(acc)']],
    wrong: [
      { b: 1, a: 'acc(f)', trap: 'wrong-var', why: '`acc` is the running value and `f` is the function: call f on acc.' },
      { b: 1, a: 'f(x)', trap: 'wrong-var', why: 'Uses the original x every time, so only the last function counts.' }],
    test: `
      assert pipeline((lambda x: x + 1, lambda x: x * 2))(3) == 8
      assert pipeline((lambda x: x * 2, lambda x: x + 1))(3) == 7
      assert pipeline(())(5) == 5`,
    exp: 'Here `reduce` walks over **functions**, and the accumulator is the value so far. Each step feeds that value into the next function, so `acc(f)` would be backwards. The empty pipeline returns `x` unchanged.' },

  'L3-52': {
    trap: 'off-by-one',
    blanks: [['ord(c) - ord(\'a\') + 1', 'ord(c) - 96', '1 + ord(c) - ord(\'a\')']],
    wrong: [
      { b: 1, a: 'ord(c) - ord(\'a\')', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'ord(c) - ord(\'a\') + 2', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert positions('cab') == (3, 1, 2)
      assert positions('z') == (26,)`,
    exp: '`ord(c) - ord(\'a\')` counts from 0 for `a`, so add 1 to number the letters from 1.' },

  'L3-53': {
    trap: 'type-error',
    blanks: [['(a[i], b[i])', '[a[i], b[i]]', 'a[i:i + 1] + b[i:i + 1]']],
    wrong: [
      { b: 1, a: 'a[i] + b[i]', trap: 'type-error', why: '`a[i] + b[i]` is a number; the inner `for` needs something to iterate over.' },
      { b: 1, a: '(a, b)', trap: 'wrong-var', why: 'Iterates over the two whole tuples, not their i-th elements.' }],
    test: `
      assert interleave((1, 2), (3, 4)) == (1, 3, 2, 4)
      assert interleave((), ()) == ()`,
    exp: 'For each index, the inner `for` walks a little pair holding `a[i]` then `b[i]`, so they come out alternately.' },

  'L3-54': {
    trap: 'off-by-one',
    ans: 'yhn nhy',
    wrong: [
      { a: 'to nhy', trap: 'off-by-one', mut: 'index-off:0' },
      { a: 'pto nhy', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: '`s[1::2]` takes indices 1, 3, 5: y, h, n. `s[::-2]` starts from the end and takes indices 5, 3, 1: n, h, y.' },

  'L3-55': {
    trap: 'range-stop',
    ans: '(10, 20, 30)',
    wrong: [
      { a: '(10, 20, 30, 40)', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '(20, 30)', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Each call to `make` has its own parameter `n`, so every lambda keeps a different value (1, 2, 3). This contrasts with lambdas built in a loop, which all share one loop variable.' },

  'L3-56': {
    trap: 'index-error',
    run: true,
    ans: '() (1, 2)',
    wrong: [
      { a: 'IndexError', trap: 'index-error', why: 'Slices never raise; out-of-range bounds are clipped to the ends.' },
      { a: '() (1, 2, 3)', trap: 'slice-stop', mut: 'slice-stop:0' },
      { a: '(3,) (1, 2)', trap: 'index-error', why: '`t[5:]` starts past the end, so it is empty.' }],
    exp: 'Slices clip their bounds to the sequence and never raise errors. A start past the end gives an empty tuple, and `-10` is treated as the beginning. Only **indexing** past the end, as in `t[5]`, raises `IndexError`.' },

  'L3-57': {
    trap: 'int-div',
    ans: '6.0',
    wrong: [
      { a: '6', trap: 'int-div', mut: 'int-div:0' },
      { a: '3.0', trap: 'off-by-one', mut: 'index-off:0' },
      { a: 'TypeError', trap: 'reduce-init', mut: 'reduce-init:0' }],
    exp: 'The accumulator is a (sum, count) pair: (4, 1) → (12, 2) → (18, 3). Then 18 / 3 = 6.0, a float because `/` was used.' },

  'L3-58': {
    trap: 'chain-cmp',
    run: true,
    ans: 'False True',
    wrong: [
      { a: 'True True', trap: 'chain-cmp', why: 'A chain means `a < b and b < c`; `\'abd\' < \'ab\'` is False because a prefix is smaller.' },
      { a: 'True False', trap: 'str-compare', why: '`\'Z\'` (90) < `\'a\'` (97) < `\'z\'` (122) is True.' },
      { a: 'False False', trap: 'str-compare', why: 'Uppercase letters come before lowercase, so `\'Z\' < \'a\'` is True.' }],
    exp: 'A chain means **both** comparisons must hold. `\'abd\' < \'ab\'` is false because a prefix is smaller than the longer string. In ASCII every uppercase letter comes before every lowercase one, so `\'Z\' < \'a\'`.' }
});
