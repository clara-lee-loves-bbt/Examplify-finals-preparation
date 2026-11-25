/* Lecture 4 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L4-01': {
    trap: 'state-trace',
    ans: '5 3',
    wrong: [
      { a: '3 5', trap: 'state-trace', why: 'The three lines do swap them: x = 8, then y = 8 - 5 = 3, then x = 8 - 3 = 5.' },
      { a: '8 3', trap: 'state-trace', why: 'The last line still runs: x = 8 - 3 = 5.' }],
    exp: 'Step by step, (x, y) goes `(8, 5)` → `(8, 3)` → `(5, 3)`. The values are swapped.' },

  'L4-02': {
    trap: 'precedence',
    ans: '6',
    wrong: [
      { a: '8', trap: 'precedence', why: 'Reads `x *= x - 1` as `x = x * x - 1`. The whole right side is worked out first: x = 3 * (3 - 1).' },
      { a: '3', trap: 'off-by-one', mut: 'index-off:0' },
      { a: '9', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: '`x += x * 2` gives `1 + 2 = 3`. Then `x *= x - 1` means `x = x * (x - 1)`, because the whole right side is evaluated first: `3 * 2 = 6`.' },

  'L4-03': {
    trap: 'print-end',
    run: true,
    ans: '1 2!3',
    wrong: [
      { a: '1 2!\n3', trap: 'print-end', why: '`end` **replaces** the newline, so `3` continues on the same line.' },
      { a: '12!3', trap: 'print-end', why: '`print` puts a space between its arguments; `end` only changes what comes at the very end.' },
      { a: '1 2\n!3', trap: 'print-end', why: '`end` goes after all the arguments, in place of the newline.' }],
    exp: '`print` puts a space between its arguments, and `end` **replaces** the usual newline, so the next `print` continues on the same line.' },

  'L4-04': {
    trap: 'fstring',
    ans: '7 squared is 49',
    wrong: [
      { a: '{n} squared is {n * n}', trap: 'fstring', why: 'The `f` prefix makes Python evaluate what is inside each `{}`.' },
      { a: 'n squared is n * n', trap: 'fstring', why: 'Inside an f-string, `{n}` and `{n * n}` are replaced by their values, 7 and 49.' }],
    exp: 'Expressions inside `{}` in an f-string are evaluated and inserted into the text.' },

  'L4-05': {
    trap: 'missing-return',
    run: true,
    ans: '8\nNone',
    wrong: [
      { a: '8\n8', trap: 'missing-return', why: '`show` prints 8 but returns None, so `y` is None.' },
      { a: 'None', trap: 'missing-return', why: 'The call `show(4)` still prints 8 first.' },
      { a: '8', trap: 'missing-return', why: '`print(y)` also runs, and y is None.' }],
    exp: 'Printing is a side effect, not a return value. `show` has no `return` statement, so it returns `None`, which is stored in `y`.' },

  'L4-06': {
    trap: 'elif-chain',
    ans: 'CCF',
    wrong: [
      { a: 'ACF', trap: 'elif-chain', why: 'The first true test wins: `90 >= 50` returns C before the A test is ever reached.' },
      { a: 'ABF', trap: 'elif-chain', why: 'Order matters: every mark of 50 or more stops at the first branch.' }],
    exp: 'The first true branch wins. Every mark ≥ 50 is caught by `m >= 50` before the stricter tests are reached, so 90 also gets `C`.' },

  'L4-07': {
    trap: 'elif-chain',
    ans: '20',
    wrong: [
      { a: '2', trap: 'elif-chain', why: 'These are two separate ifs, so the second is tested too, with the new x = 2.' },
      { a: '3', trap: 'off-by-one', mut: 'index-off:3' }],
    exp: 'These are two **separate** `if` statements. The first changes x to 2, then the second sees `2 < 3` and multiplies by 10.' },

  'L4-08': {
    trap: 'range-stop',
    ans: '12 7',
    wrong: [
      { a: '22 10', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '7 7', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: '15 8', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '`i` takes 1, 4 and 7, so `s = 12`. After the loop, `i` keeps its last value, 7.' },

  'L4-09': {
    trap: 'boundary',
    ans: '1 4',
    wrong: [
      { a: '1 3', trap: 'boundary', why: 'The loop runs while n > 1: 100 → 33 → 11 → 3 → 1 is four divisions.' },
      { a: '0 5', trap: 'boundary', mut: 'boundary:0' }],
    exp: '100 → 33 → 11 → 3 → 1 takes four divisions, and the loop stops when `n` is 1.' },

  'L4-10': {
    trap: 'range-stop',
    ans: '###\n*##\n**#',
    wrong: [
      { a: '###\n*##\n**#\n***', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '###\n*#*#\n**#', trap: 'precedence', mut: 'precedence:0' },
      { a: '*##\n**#\n***', trap: 'range-zero', mut: 'range-zero:0' }],
    exp: 'Row `i` has `i` stars and `3 - i` hashes. Row 0 has no stars.' },

  'L4-11': {
    trap: 'range-stop',
    ans: '6',
    wrong: [
      { a: '9', trap: 'range-stop', mut: 'range-stop:1' },
      { a: '1', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: '3', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'The inner loop runs 3 times when i = 1, twice when i = 2 and once when i = 3: 3 + 2 + 1 = 6.' },

  'L4-12': {
    trap: 'loop-var',
    run: true,
    ans: '2 3 4 5 6',
    wrong: [
      { a: '2 4', trap: 'loop-var', why: 'Changing `i` does not skip values: the next pass takes the next value from range.' },
      { a: '2 4 6', trap: 'loop-var', why: 'range still gives 0, 1, 2, 3, 4; each is printed plus 2.' },
      { a: '0 2 4', trap: 'loop-var', why: '`i += 2` runs before the print, and the loop still visits every value of range(5).' }],
    exp: 'Each iteration takes the **next value from the range**, no matter what was done to `i` inside the body. Changing `i` does not skip any iterations.' },

  'L4-13': {
    trap: 'return-in-loop',
    ans: '-1 0',
    wrong: [
      { a: '-5 0', trap: 'return-in-loop', why: '`return` exits at the **first** negative, -1; the loop never reaches -5.' },
      { a: '0 0', trap: 'return-in-loop', mut: 'return-in-loop:0' }],
    exp: '`return` ends the function at the first negative number. If no element is negative, the loop finishes and `return 0` runs.' },

  'L4-14': {
    trap: 'return-in-loop',
    ans: 'True False',
    wrong: [
      { a: 'True True', trap: 'return-in-loop', why: 'The second call returns False at once because -1 is not positive; it never looks at 2.' },
      { a: 'False False', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Both branches return, so the loop never gets past the first element. The function only checks `t[0]`, which is a classic bug. A correct version returns `False` inside the loop and `True` after it.' },

  'L4-15': {
    trap: 'operator-choice',
    blanks: [['t[i] > m', 'm < t[i]', 't[i] >= m', 'm <= t[i]']],
    wrong: [
      { b: 1, a: 't[i] < m', trap: 'operator-choice', why: 'That keeps the smaller value, so it finds the minimum.' },
      { b: 1, a: 'm > t[i]', trap: 'operator-choice', why: 'Same as `t[i] < m`: this finds the minimum.' }],
    test: `
      assert max_n((4, 5, 3)) == 5
      assert max_n((-3, -7)) == -3
      assert max_n((2,)) == 2`,
    exp: 'Keep the largest value seen so far in `m`, and replace it whenever a bigger element turns up.' },

  'L4-16': {
    trap: 'wrong-var',
    blanks: [['b = p'], ['a = p']],
    wrong: [
      { b: 1, a: 'a = p', trap: 'wrong-var', why: 'If f(a) and f(p) have opposite signs, the root is between a and p, so the **right** end b moves to p.' },
      { b: 1, a: 'p = b', trap: 'state-trace', why: 'Assignment goes right to left: `b = p` moves b; `p = b` only changes p, which is recomputed anyway.' }],
    test: `
      assert abs(bisect(lambda x: x * x - 2, 1, 2) - 2 ** 0.5) < 1e-5
      assert abs(bisect(lambda x: x**3 + 4*x**2 - 10, 1, 2) - 1.36523) < 1e-4`,
    exp: 'If `f(a)` and `f(p)` have opposite signs, the root is in `[a, p]`, so move `b` to `p`. Otherwise the root is in `[p, b]`, so move `a` to `p`.' },

  'L4-17': {
    trap: 'true-div',
    blanks: [['n % 10'], ['n // 10']],
    wrong: [
      { b: 1, a: 'n // 10', trap: 'operator-choice', why: '`n // 10` drops the last digit; the last digit itself is `n % 10`.' },
      { b: 2, a: 'n / 10', trap: 'true-div', mut: 'true-div:0' }],
    test: `
      assert digit_sum(9045) == 18
      assert digit_sum(0) == 0
      assert digit_sum(7) == 7`,
    exp: '`n % 10` is the last digit, and `n // 10` drops it. Repeat until no digits are left.' },

  'L4-18': {
    trap: 'precedence',
    blanks: [['r * 10 + n % 10', 'n % 10 + r * 10', '10 * r + n % 10', 'n % 10 + 10 * r']],
    wrong: [
      { b: 1, a: 'r + n % 10', trap: 'operator-choice', why: 'Without `r * 10` the digits are just added up, not shifted into place.' },
      { b: 1, a: '(r * 10 + n) % 10', trap: 'precedence', mut: 'precedence:0' }],
    test: `
      assert reverse_num(1230) == 321
      assert reverse_num(7) == 7
      assert reverse_num(1000) == 1`,
    exp: 'Shift the digits built so far one place left (`r * 10`) and add the next digit taken from the end of `n`.' },

  'L4-19': {
    trap: 'range-stop',
    ans: '6',
    wrong: [
      { a: '10', trap: 'range-stop', mut: 'range-stop:1' },
      { a: '0', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: '3', trap: 'range-zero', mut: 'range-zero:0' }],
    exp: 'This counts pairs with i < j from 0..3: (0,1), (0,2), (0,3), (1,2), (1,3) and (2,3), which is 6.' },

  'L4-20': {
    trap: 'boundary',
    ans: '4 30',
    wrong: [
      { a: '3 14', trap: 'boundary', why: 'The test is checked before each pass: 14 < 20 is True, so one more pass runs.' },
      { a: '4 14', trap: 'state-trace', why: 'Both updates happen in the same pass: when i becomes 4, total gains 16.' }],
    exp: 'The totals are 1, 5, 14, 30. The condition is only checked at the top of the loop, so the total overshoots 20 before the loop stops.' },

  'L4-21': {
    trap: 'input-str',
    verifyOnly: true,
    ans: 'ValueError',
    wrong: [
      { a: 'n is 3', trap: 'input-str', why: '`int()` truncates a float, but here it gets the **string** `\'3.5\'`, which is not a whole number, so it raises `ValueError`.' },
      { a: 'n is 3.5', trap: 'input-str', why: '`int()` never gives a float, and `\'3.5\'` is not valid for `int()`.' },
      { a: 'n is \'3.5\'', trap: 'input-str', why: '`int()` does not return a string; it tries to convert `\'3.5\'` and fails.' }],
    verify: `
      try:
          int('3.5')
          raise AssertionError('expected ValueError')
      except ValueError:
          pass`,
    exp: '`input` returns the string `\'3.5\'`. `int()` cannot parse a string with a decimal point, so it raises `ValueError`. `int(float(\'3.5\'))` would give 3.' },

  'L4-22': {
    trap: 'state-trace',
    ans: 'ecabd',
    wrong: [
      { a: 'acebd', trap: 'state-trace', why: '`c + s` puts each vowel in **front** of what is already there, so later vowels come first.' },
      { a: 'e', trap: 'acc-reset', mut: 'acc-reset:0' }],
    exp: 'Vowels a, c, e go to the front and the others to the back: a → ab → cab → cabd → ecabd.' },

  'L4-23': {
    trap: 'boundary',
    blanks: [['d * d <= n', 'd ** 2 <= n', 'd < n', 'd <= n - 1', 'd <= n // 2', 'd <= n ** 0.5']],
    wrong: [
      { b: 1, a: 'd < n // 2', trap: 'boundary', why: 'For n = 4 the loop never runs (2 < 2 is False), so 4 would be called prime.' },
      { b: 1, a: 'd * d < n', trap: 'boundary', mut: 'boundary:0' }],
    test: `
      def brute(n):
          return n >= 2 and all(n % k for k in range(2, n))
      for n in range(60):
          assert is_prime(n) == brute(n), n`,
    exp: 'Trying every `d` below `n` works. Stopping at √n (`d * d <= n`) is enough and much faster, because any factor above √n pairs with one below it.' },

  'L4-24': {
    trap: 'decl-imp',
    ans: 'x = 5',
    wrong: [
      { a: 'x + 5', trap: 'decl-imp', why: 'An expression: it evaluates to a value.' },
      { a: 'lambda x: x', trap: 'decl-imp', why: 'A lambda is an expression that evaluates to a function.' },
      { a: 'max(3, 4)', trap: 'decl-imp', why: 'A function call is an expression; it evaluates to 4.' }],
    exp: 'An assignment changes program state and has no value. The others are expressions, and a `lambda` expression evaluates to a function object.' },

  'L4-25': {
    trap: 'range-stop',
    ans: '-2',
    wrong: [
      { a: '2', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '-3', trap: 'acc-reset', mut: 'acc-reset:0' }],
    exp: 'The terms are `0, -1, +2, -3`, which add up to -2.' },

  'L4-26': {
    trap: 'range-stop',
    ans: '60',
    wrong: [
      { a: '90', trap: 'range-stop', mut: 'range-stop:1' },
      { a: '100', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '40128', trap: 'precedence', mut: 'precedence:0' }],
    exp: 'The sum factorises as (1+2+3) × (1+2+3+4) = 6 × 10 = 60.' },

  'L4-27': {
    trap: 'boundary',
    ans: '8',
    wrong: [
      { a: '9', trap: 'boundary', why: 'The loop stops as soon as n is 1; reaching 1 is the last step counted.' },
      { a: '7', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 takes 8 steps.' },

  'L4-28': {
    trap: 'elif-chain',
    ans: '3',
    wrong: [
      { a: '1', trap: 'elif-chain', why: 'The second `if` is separate from the first, so it is tested too: 15 > 12 adds 2.' },
      { a: '7', trap: 'elif-chain', mut: 'elif-chain:0' }],
    exp: 'The first `if` stands on its own and adds 1. The second statement is a fresh `if/elif/else`, where only the first true branch runs (`x > 12`), adding 2.' },

  'L4-29': {
    trap: 'boundary',
    ans: '12 12',
    wrong: [
      { a: '9 14', trap: 'boundary', why: '9 < 14 is still True, so the loop runs once more.' },
      { a: '15 10', trap: 'boundary', mut: 'boundary:0' }],
    exp: '(3, 18) → (6, 16) → (9, 14) → (12, 12). Now `a < b` is false.' },

  'L4-30': {
    trap: 'acc-reset',
    ans: 'COD---',
    wrong: [
      { a: '-', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:0' }],
    exp: 'The first three characters match. I/E, N/R and G/S differ, so each gives a `-`.' },

  'L4-31': {
    trap: 'range-step',
    ans: '1',
    wrong: [
      { a: '-1 1 -1 1 -1 1 -1 1 -1 1 -1 1', trap: 'print-placement', why: '`print` is after the loop, so it runs once with the final value.' },
      { a: '-1', trap: 'acc-reset', mut: 'acc-reset:0' }],
    exp: 'The range is 3, 7, …, 47, which is (47 − 3) / 4 + 1 = 12 values. An even number of sign flips brings `x` back to 1.' },

  'L4-32': {
    trap: 'off-by-one',
    blanks: [['i + 1', '1 + i']],
    wrong: [
      { b: 1, a: 'i', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'i + 2', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert count_pairs([1, 2, 3, 4, 5], 6) == 2
      assert count_pairs([3, 3], 6) == 1
      assert count_pairs([3], 6) == 0`,
    exp: 'Starting `j` at `i + 1` counts each pair exactly once and never pairs an element with itself. Starting at 0 would count (1, 5) and (5, 1) separately, and `3 + 3` for a single 3.' },

  'L4-33': {
    trap: 'return-in-loop',
    ans: '(0, 1) None',
    wrong: [
      { a: '(1, 1) None', trap: 'return-in-loop', why: '`return` stops at the **first** match, M[0][1]; the search does not continue.' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:0' }],
    exp: '`return` leaves **both** loops at once, at the first match in row-by-row order. If nothing matches, both loops finish and `None` is returned.' },

  'L4-34': {
    trap: 'truthiness',
    ans: '8',
    wrong: [
      { a: '6', trap: 'truthiness', why: '`n % 2` is truthy when n is odd: 37 → 36 → 18 → 9 → 8 → 4 → 2 → 1 → 0 is 8 steps.' },
      { a: '7', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '37 → 36 → 18 → 9 → 8 → 4 → 2 → 1 → 0 is 8 steps. Odd numbers lose 1 and even numbers are halved.' },

  'L4-35': {
    trap: 'wrong-var',
    blanks: [['\' \' * (n - i) + \'#\' * i', '\' \' * (n - i) + i * \'#\'', '(n - i) * \' \' + \'#\' * i']],
    wrong: [
      { b: 1, a: '\' \' * i + \'#\' * (n - i)', trap: 'wrong-var', why: 'Swapped: row i needs n - i spaces and i hashes.' },
      { b: 1, a: '(\' \' * (n - i) + \'#\') * i', trap: 'precedence', mut: 'precedence:0' }],
    test: `
      staircase(3)
      assert OUT() == '  #\\n ##\\n###\\n', repr(OUT())`,
    exp: 'Row `i` has `i` hashes, padded on the left by `n - i` spaces so that every row is `n` characters wide.' },

  'L4-36': {
    trap: 'elif-chain',
    blanks: [['n % 15 == 0', 'n % 3 == 0 and n % 5 == 0', 'n % 5 == 0 and n % 3 == 0', 'not n % 15']],
    wrong: [
      { b: 1, a: 'n % 3 == 0 or n % 5 == 0', trap: 'and-or-logic', why: '`or` also catches multiples of 3 or 5 alone, so 3 would give FizzBuzz.' },
      { b: 1, a: 'n % 3 == 0', trap: 'elif-chain', why: 'The first true branch wins, so every multiple of 3 would return FizzBuzz.' }],
    test: `
      assert [fizz(i) for i in (1, 3, 5, 15, 30, 7)] == ['1', 'Fizz', 'Buzz', 'FizzBuzz', 'FizzBuzz', '7']`,
    exp: 'The combined case must be tested **first**. Otherwise 15 would stop at the `n % 3 == 0` branch and return `Fizz`.' },

  'L4-37': {
    trap: 'state-trace',
    blanks: [['first, second = x, first', 'second, first = first, x', 'second = first; first = x']],
    wrong: [
      { b: 1, a: 'first = x', trap: 'state-trace', why: 'The old maximum must move down to `second` before it is overwritten.' },
      { b: 1, a: 'first = x; second = first', trap: 'state-trace', why: 'After `first = x`, first is already x, so second becomes x too. Tuple assignment uses the old values.' }],
    test: `
      assert second_largest((3, 7, 7, 5)) == 5
      assert second_largest((4, 4)) is None
      assert second_largest((1, 2, 3)) == 2
      assert second_largest((5, 1)) == 1`,
    exp: 'When a new maximum arrives, the old maximum is pushed down to second place. Tuple assignment does both at once. Doing `first = x` first would overwrite the value that `second` needs.' },

  'L4-38': {
    trap: 'concept',
    blanks: [['max(x, cur + x)', 'max(cur + x, x)', 'x if x > cur + x else cur + x'], ['max(best, cur)', 'max(cur, best)']],
    wrong: [
      { b: 1, a: 'cur + x', trap: 'concept', why: 'Never restarts the run: when x alone beats cur + x, the earlier part must be dropped.' },
      { b: 2, a: 'cur', trap: 'wrong-var', why: '`best` must remember the largest `cur` seen so far, not just the latest.' }],
    test: `
      assert max_sub((-2, 1, -3, 4, -1, 2, 1, -5, 4)) == 6
      assert max_sub((-3, -1, -2)) == -1
      assert max_sub((5,)) == 5`,
    exp: '`cur` is the best sum of a run that **ends at x**: either extend the previous run or start fresh at `x`. `best` remembers the largest `cur` seen so far. This takes one pass instead of trying every pair of start and end.' },

  'L4-39': {
    trap: 'off-by-one',
    blanks: [['cur = 1']],
    wrong: [
      { b: 1, a: 'cur = 0', trap: 'off-by-one', why: 'A new run already contains the current character, so it starts at 1.' },
      { b: 1, a: 'best = cur', trap: 'wrong-var', why: 'The current run must restart; `best` is updated on the next line anyway.' }],
    test: `
      assert longest_run('aabbbc') == 3
      assert longest_run('a') == 1
      assert longest_run('abc') == 1
      assert longest_run('xxxxy') == 4`,
    exp: 'A character that differs from its neighbour starts a new run of length 1.' },

  'L4-40': {
    trap: 'and-or-logic',
    blanks: [['m % a != 0 or m % b != 0', 'm % b != 0 or m % a != 0', 'not (m % a == 0 and m % b == 0)', 'm % a or m % b']],
    wrong: [
      { b: 1, a: 'm % a != 0 and m % b != 0', trap: 'and-or-logic', why: 'Stops as soon as m divides by **either** number; it must keep going while either test fails.' },
      { b: 1, a: 'm % a == 0 or m % b == 0', trap: 'and-or-logic', why: 'That is (part of) the stopping condition, not the condition to keep looping.' }],
    test: `
      assert lcm(4, 6) == 12
      assert lcm(5, 5) == 5
      assert lcm(7, 3) == 21
      assert lcm(1, 9) == 9`,
    exp: 'Keep going **while** `m` fails at least one of the two divisibility tests, i.e. `or`. Writing `and` would stop as soon as **either** one divides `m`.' },

  'L4-41': {
    trap: 'wrong-var',
    blanks: [['rev == orig', 'orig == rev']],
    wrong: [
      { b: 1, a: 'rev == n', trap: 'wrong-var', why: 'The loop has divided n down to 0; compare with the saved `orig`.' },
      { b: 1, a: 'rev', trap: 'truthiness', why: '`rev` is a number, so this returns the number, not True/False.' }],
    test: `
      assert is_pal_num(12321) and is_pal_num(7) and is_pal_num(0)
      assert not is_pal_num(123) and not is_pal_num(10)`,
    exp: 'The loop builds the reversed number. Compare it with a **saved copy** of the input, because `n` itself has been reduced to 0 by then.' },

  'L4-42': {
    trap: 'boundary',
    blanks: [['depth < 0', 'depth == -1'], ['depth == 0', 'not depth']],
    wrong: [
      { b: 1, a: 'depth <= 0', trap: 'boundary', mut: 'boundary:0' },
      { b: 1, a: 'depth < 1', trap: 'off-by-one', mut: 'index-off:0' },
      { b: 2, a: 'depth == 1', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert balanced('(()())') and balanced('') and balanced('a(b)c')
      assert not balanced(')(') and not balanced('(()') and not balanced('())(')`,
    exp: 'A `)` with nothing open drops the depth below 0, which is an immediate failure. At the end, every `(` must have been closed, so the depth must be back to 0.' },

  'L4-43': {
    trap: 'type-error',
    blanks: [['str(j)', 'f"{j}"']],
    wrong: [
      { b: 1, a: '\'j\'', trap: 'wrong-var', why: 'Adds the letter j every time, not the number j.' },
      { b: 1, a: 'j', trap: 'type-error', mut: 'drop-call:0' }],
    test: `
      tri(3)
      assert OUT() == '1\\n12\\n123\\n', repr(OUT())`,
    exp: '`row` is a string, so the number `j` has to be converted with `str` before concatenating. `row += j` would raise `TypeError`.' },

  'L4-44': {
    trap: 'off-by-one',
    blanks: [['i + 1', '1 + i'], ['t[i] > t[j]', 't[j] < t[i]']],
    wrong: [
      { b: 2, a: 't[i] < t[j]', trap: 'operator-choice', why: 'Counts pairs already in increasing order, not inversions.' },
      { b: 1, a: 'i + 2', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert inversions((4, 1, 3, 2)) == 4
      assert inversions((1, 2, 3)) == 0
      assert inversions((3, 2, 1)) == 3
      assert inversions((2, 2, 1)) == 2`,
    exp: 'Each pair is checked once with `j` after `i`. The count of inversions is exactly how many swaps bubble sort makes (Lecture 10).' },

  'L4-45': {
    trap: 'state-trace',
    ans: 'aaaa',
    wrong: [
      { a: 'abababa', trap: 'state-trace', why: 'When i % 3 == 1, i goes up by 2 in that pass (to the next multiple of 3), so the b branch is never reached.' },
      { a: 'abababab', trap: 'elif-chain', mut: 'elif-chain:0' }],
    exp: 'Whenever `i % 3 == 1`, `i` goes up by 2 in that pass and skips the value with remainder 2. The loop visits 0, 1, 3, 4, 6, 7, 9 and never reaches the `b` branch.' },

  'L4-46': {
    trap: 'return-in-loop',
    ans: '3',
    wrong: [
      { a: '6', trap: 'return-in-loop', why: '`return` leaves **both** loops at once, the first time `(i + j) % 4` is 3 (i = 0, j = 3).' },
      { a: '1', trap: 'range-zero', mut: 'range-zero:0' }],
    exp: 'With i = 0, j goes 0, 1, 2 (total becomes 0 + 1 + 2 = 3). At j = 3, `(0 + 3) % 4 == 3`, so the function returns at once and the outer loop never continues.' },

  'L4-47': {
    trap: 'elif-chain',
    ans: '11',
    wrong: [
      { a: '111', trap: 'elif-chain', mut: 'elif-chain:0' },
      { a: 'ZeroDivisionError', trap: 'short-circuit', mut: 'short-circuit:1' }],
    exp: '`x % 2` is 1 (truthy) and `7 > 5`, so `y` becomes 1. In the second `if`, `x > 6` is already true, so `or` never evaluates `x / 0` and there is no error. Only the `+10` branch runs.' },

  'L4-48': {
    trap: 'acc-reset',
    ans: 'fedcba',
    wrong: [
      { a: 'fe', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: 'edba', trap: 'off-by-one', mut: 'index-off:2' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:0' }],
    exp: 'Each pair goes in swapped (`ba`, `dc`, `fe`) and is put **in front** of what was built before. Together that reverses the whole string.' }
});
