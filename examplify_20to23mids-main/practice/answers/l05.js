/* Lecture 5 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L5-01': {
    trap: 'rec-trace',
    ans: '19',
    wrong: [
      { a: '6', trap: 'rec-trace', why: 'f keeps calling itself on 409, 40, 4 and 0, adding every last digit: 6 + 9 + 0 + 4.' },
      { a: '4', trap: 'rec-trace', why: 'The first digit is only the last call; the result adds all the digits.' }],
    exp: '4 + 0 + 9 + 6 = 19. Each call peels off the last digit.' },

  'L5-02': {
    trap: 'boundary',
    ans: '9',
    wrong: [
      { a: '15', trap: 'boundary', mut: 'boundary:0' },
      { a: '5', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Build up from the bottom: g(0) = g(1) = 1, g(2) = 3, g(3) = 5, g(4) = 5 + 3 + 1 = 9.' },

  'L5-03': {
    trap: 'rec-order',
    ans: '3 2 1 1 2 3',
    wrong: [
      { a: '1 1 2 2 3 3', trap: 'rec-order', mut: 'rec-order:0' },
      { a: '3 3 2 2 1 1', trap: 'rec-order', mut: 'rec-order:1' },
      { a: '3 2 1 0 0 1 2 3', trap: 'boundary', mut: 'boundary:0' }],
    exp: 'The first `print` runs while winding (3, 2, 1). The second runs while unwinding, after each recursive call returns (1, 2, 3).' },

  'L5-04': {
    trap: 'base-case',
    run: true,
    ans: 'RecursionError',
    wrong: [
      { a: '6', trap: 'base-case', why: 'With no base case the calls never stop: fact(0), fact(-1), ... until `RecursionError`.' },
      { a: '0', trap: 'base-case', why: 'Nothing stops at 0: there is no base case, so it recurses until `RecursionError`.' },
      { a: 'None', trap: 'base-case', why: 'The function never returns at all; Python stops it with `RecursionError`.' }],
    exp: 'With no base case, the recursion never stops (3, 2, 1, 0, -1, …) until Python\'s call-stack limit is hit, which raises `RecursionError`.' },

  'L5-05': {
    trap: 'off-by-one',
    ans: 'kcats',
    wrong: [
      { a: 'kas', trap: 'off-by-one', mut: 'index-off:4' },
      { a: 'ckats', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Reverse the tail and put the first character at the end.' },

  'L5-06': {
    trap: 'rec-trace',
    ans: '243',
    wrong: [
      { a: '81', trap: 'rec-trace', why: 'e = 5 is odd, so the last step is `h * h * b` = 9 * 9 * 3 = 243, not 9 * 9.' },
      { a: '3', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '3^5 = 243. The exponent is halved at each step: pw(3,0) = 1, pw(3,1) = 3, pw(3,2) = 9, and pw(3,5) = 9·9·3.' },

  'L5-07': {
    trap: 'rec-trace',
    ans: '4',
    wrong: [
      { a: '5', trap: 'rec-trace', why: 'e is halved each call: 5 → 2 → 1 → 0, which is 4 calls in total.' },
      { a: '6', trap: 'rec-trace', why: 'Only one recursive call is made per call: 5 → 2 → 1 → 0.' },
      { a: '3', trap: 'rec-trace', why: 'The call with e = 0 counts too: 5, 2, 1, 0.' }],
    verify: `
      calls = [0]
      def pw(b, e):
          calls[0] += 1
          if e == 0:
              return 1
          h = pw(b, e // 2)
          return h * h if e % 2 == 0 else h * h * b
      assert pw(3, 5) == 243
      assert calls[0] == 4, calls[0]`,
    exp: 'The calls are pw(3,5) → pw(3,2) → pw(3,1) → pw(3,0), so 4 in total. Each call makes **one** recursive call, which is why this is so much faster than multiplying 5 times.' },

  'L5-08': {
    trap: 'rec-trace',
    ans: '15',
    wrong: [
      { a: '9', trap: 'rec-trace', why: 'That is the count for fib(4). fib(5) makes 1 + 9 + 5 = 15 calls.' },
      { a: '5', trap: 'rec-trace', why: 'That is the value of fib(5), not the number of calls.' }],
    verify: `
      calls = [0]
      def fib(k):
          calls[0] += 1
          if k <= 1:
              return k
          return fib(k - 1) + fib(k - 2)
      fib(5)
      assert calls[0] == 15, calls[0]`,
    exp: 'calls(k) = 1 + calls(k−1) + calls(k−2) with calls(0) = calls(1) = 1, giving 1, 1, 3, 5, 9, 15. This exponential blow-up is what memoisation fixes (Lecture 8).' },

  'L5-09': {
    trap: 'off-by-one',
    ans: '13',
    wrong: [
      { a: '8', trap: 'off-by-one', why: 'That is the count for 5 lots. The counts go 1, 2, 3, 5, 8, 13 for 1 to 6 lots.' },
      { a: '21', trap: 'off-by-one', why: 'That is the count for 7 lots.' }],
    verify: `
      def ways(n):
          if n <= 1:
              return 1
          return ways(n - 1) + ways(n - 2)
      assert ways(4) == 5
      assert ways(6) == 13`,
    exp: 'The last vehicle is either a car (leaving n−1 lots) or a bus (leaving n−2), so ways(n) = ways(n−1) + ways(n−2): 1, 2, 3, 5, 8, 13 for n = 1..6.' },

  'L5-10': {
    trap: 'wrong-var',
    blanks: [['s + \'C\'', 's + "C"'], ['s + \'B\'', 's + "B"']],
    wrong: [
      { b: 1, a: 's + \'B\'', trap: 'wrong-var', why: 'park(n - 1) leaves **one** lot, which a car fills; a bus needs park(n - 2).' },
      { b: 1, a: '\'C\' + s', trap: 'concept', why: 'The order matters: in the expected order the newest vehicle goes at the end, e.g. \'BC\' is \'B\' + \'C\'.' }],
    test: `
      assert park(3) == ('CCC', 'BC', 'CB')
      assert park(4) == ('CCCC', 'BCC', 'CBC', 'CCB', 'BB')`,
    exp: 'Look at the **last** vehicle: put a car after every arrangement of n−1 lots, then a bus after every arrangement of n−2 lots. Appending (not prepending) is what gives the order shown.' },

  'L5-11': {
    trap: 'rec-trace',
    ans: '31',
    wrong: [
      { a: '32', trap: 'off-by-one', why: 'n disks take 2ⁿ - 1 moves: 1, 3, 7, 15, 31.' },
      { a: '16', trap: 'rec-trace', why: 'Each extra disk doubles the moves **and adds one**: T(n) = 2·T(n - 1) + 1.' }],
    verify: `
      import io, contextlib
      buf = io.StringIO()
      with contextlib.redirect_stdout(buf):
          towers(5, "A", "B", "C")
      assert len(buf.getvalue().strip().splitlines()) == 31`,
    exp: 'moves(n) = 2·moves(n−1) + 1 with moves(1) = 1, which gives 2ⁿ − 1 = 31.' },

  'L5-12': {
    trap: 'wrong-var',
    blanks: [['src, dst, via'], ['via, src, dst']],
    wrong: [
      { b: 1, a: 'src, via, dst', trap: 'wrong-var', why: 'The top n - 1 disks first go to the spare pole: from src to **via**, using dst.' },
      { b: 2, a: 'via, dst, src', trap: 'wrong-var', why: 'Afterwards the n - 1 disks move from via onto **dst**, using src.' }],
    test: `
      towers(3, "A", "B", "C")
      assert OUT().strip().splitlines() == ["Move disk 1 from A to C", "Move disk 2 from A to B", "Move disk 1 from C to B", "Move disk 3 from A to C", "Move disk 1 from B to A", "Move disk 2 from B to C", "Move disk 1 from A to C"]`,
    exp: 'Move the top n−1 disks out of the way onto `via` (using `dst` as the spare), move disk n to `dst`, then move the n−1 disks from `via` onto `dst` (using `src` as the spare).' },

  'L5-13': {
    trap: 'off-by-one',
    ans: '9',
    wrong: [
      { a: '5', trap: 'off-by-one', mut: 'index-off:2' },
      { a: '15', trap: 'off-by-one', mut: 'index-off:3' }],
    exp: '`t[2:]` skips one element each time, so this adds the elements at even indices: 1 + 3 + 5.' },

  'L5-14': {
    trap: 'rec-trace',
    ans: '3',
    wrong: [
      { a: '4', trap: 'rec-trace', why: 'Only the elements equal to 2 add 1; the 1 adds 0.' },
      { a: '2', trap: 'off-by-one', mut: 'index-off:2' }],
    exp: 'Add 1 for every element that equals `x`, then recurse on the rest of the tuple.' },

  'L5-15': {
    trap: 'rec-trace',
    ans: '12 1',
    wrong: [
      { a: '12 5', trap: 'rec-trace', why: 'Keep going until b is 0: gcd(17, 5) → gcd(5, 2) → gcd(2, 1) → gcd(1, 0) = 1.' },
      { a: 'ZeroDivisionError', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'gcd(84,36) → gcd(36,12) → gcd(12,0) = 12. gcd(17,5) → gcd(5,2) → gcd(2,1) → gcd(1,0) = 1.' },

  'L5-16': {
    trap: 'off-by-one',
    blanks: [['s[0] == s[-1]', 's[-1] == s[0]', 's[0] == s[len(s) - 1]'], ['s[1:-1]', 's[1:len(s) - 1]']],
    wrong: [
      { b: 2, a: 's[2:-1]', trap: 'off-by-one', mut: 'index-off:0' },
      { b: 2, a: 's[0:-1]', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 's[1] == s[-1]', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert is_pal('racecar') and is_pal('abba') and is_pal('') and is_pal('x')
      assert not is_pal('abca') and not is_pal('ab')`,
    exp: 'The outer characters must match, and the inside (`s[1:-1]`, both ends removed) must also be a palindrome. `and` short-circuits, so the recursion stops at the first mismatch.' },

  'L5-17': {
    trap: 'true-div',
    blanks: [['to_bin(n // 2) + str(n % 2)']],
    wrong: [
      { b: 1, a: 'to_bin(n / 2) + str(n % 2)', trap: 'true-div', mut: 'true-div:0' },
      { b: 1, a: 'to_bin(n // 2) + n % 2', trap: 'type-error', mut: 'drop-call:0' }],
    test: `
      assert to_bin(10) == '1010'
      assert to_bin(0) == '0'
      assert to_bin(1) == '1'
      assert to_bin(255) == '11111111'`,
    exp: 'The last binary digit is `n % 2`, and the digits before it are the binary form of `n // 2`. Those come first, so the recursive result goes on the left.' },

  'L5-18': {
    trap: 'boundary',
    ans: '7',
    wrong: [
      { a: '9', trap: 'boundary', mut: 'boundary:0' },
      { a: '1', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: 'f(0) = 0, f(1) = 1, f(2) = 2, f(3) = 2 + 0 = 2, f(4) = 2 + 1 = 3, f(5) = 3 + 2 = 5, f(6) = 5 + 2 = 7.' },

  'L5-19': {
    trap: 'call-stack',
    ans: 'There are 4 frames for fact, with n = 3, 2, 1 and 0',
    wrong: [
      { a: 'There is 1 frame for fact, because frames are reused', trap: 'call-stack', why: 'Each call gets its own frame with its own n; none is reused while it is still waiting.' },
      { a: 'There are 3 frames for fact, with n = 3, 2 and 1', trap: 'call-stack', why: 'The call fact(0) is a frame too; it is the deepest one, where the base case returns 1.' },
      { a: 'The frames hold the values 6, 2, 1 and 1 already computed', trap: 'call-stack', why: 'At the deepest point nothing has been multiplied yet; the products are worked out while unwinding.' }],
    exp: 'Each call pushes its own activation record with its own `n`. None of them can finish until fact(0) returns 1, which starts the unwinding.' },

  'L5-20': {
    trap: 'base-case',
    blanks: [['1 + num_digits(n // 10)', 'num_digits(n // 10) + 1']],
    wrong: [
      { b: 1, a: '1 + num_digits(n % 10)', trap: 'operator-choice', why: '`n % 10` is the last digit; dropping it needs `n // 10`.' },
      { b: 1, a: 'num_digits(n // 10)', trap: 'base-case', why: 'Forgets to count the current digit: each call must add 1.' }],
    test: `
      assert num_digits(0) == 1
      assert num_digits(9) == 1
      assert num_digits(12345) == 5`,
    exp: 'Dropping the last digit (`n // 10`) leaves a number with one digit fewer.' },

  'L5-21': {
    trap: 'rec-trace',
    ans: 'a1b2c345',
    wrong: [
      { a: 'abc12345', trap: 'rec-trace', why: 'Each call swaps the two arguments, so letters and digits alternate until one string runs out.' },
      { a: 'a1c35', trap: 'off-by-one', mut: 'index-off:2' }],
    exp: 'The arguments swap places on every call, so characters alternate between the two strings. When the first argument runs out, whatever is left of the other is appended.' },

  'L5-22': {
    trap: 'off-by-one',
    ans: '(4, 8, 10)',
    wrong: [
      { a: '(10,)', trap: 'off-by-one', mut: 'index-off:0' },
      { a: 'TypeError', trap: 'tuple-comma', mut: 'tuple-comma:0' }],
    exp: 'Even heads are kept, written as the one-element tuple `(t[0],)`, and odd heads are dropped.' },

  'L5-23': {
    trap: 'off-by-one',
    ans: 'fedcba',
    wrong: [
      { a: 'efdbca', trap: 'off-by-one', mut: 'index-off:0' },
      { a: 'TypeError', trap: 'true-div', mut: 'true-div:0' }],
    exp: 'Splitting the string in half and swapping the two halves at every level reverses it. Halves: `abc|def` → `f(def) + f(abc)`, and recursively `def` → `fed`.' },

  'L5-24': {
    trap: 'tuple-comma',
    blanks: [['(t[0],) + s']],
    wrong: [
      { b: 1, a: 's + (t[0],)', trap: 'concept', why: 'Order inside each subset matters for the expected answer: t[0] goes first.' },
      { b: 1, a: 's', trap: 'concept', why: 'That repeats `rest` unchanged; every subset in the second half must also contain t[0].' },
      { b: 1, a: 't[0] + s', trap: 'tuple-comma', mut: 'tuple-comma:0' }],
    test: `
      assert subsets((1, 2)) == ((), (2,), (1,), (1, 2))
      assert len(subsets((1, 2, 3, 4))) == 16`,
    exp: 'Every subset either leaves out `t[0]` (that is `rest`) or contains it (`t[0]` added in front of each subset in `rest`). So the count doubles with each element: 2ⁿ.' },

  'L5-25': {
    trap: 'off-by-one',
    ans: 'False True',
    wrong: [
      { a: 'True True', trap: 'off-by-one', mut: 'index-off:5' },
      { a: 'False False', trap: 'off-by-one', mut: 'index-off:7' }],
    exp: 'The two functions take turns knocking 1 off `n`. Starting from `is_even(7)`, after 7 calls we are in `is_odd(0)`, which returns `False`. Starting from `is_odd(7)`, we end in `is_even(0)`, which returns `True`.' },

  'L5-26': {
    trap: 'base-case',
    run: true,
    ans: 'RecursionError',
    wrong: [
      { a: '16', trap: 'base-case', why: 'n goes 7, 5, 3, 1, -1, ...; it jumps over 0, so the base case is never reached.' },
      { a: '15', trap: 'base-case', why: 'The base case needs n to hit exactly 0, but odd n skips it and the recursion never ends.' },
      { a: '0', trap: 'base-case', why: 'n never equals 0 here, so the function never returns.' }],
    exp: 'From 7 the argument goes 5, 3, 1, −1, −3, … and never equals 0, so the base case is skipped and the recursion only ends when it hits the call-stack limit. `if n <= 0` would fix it.' },

  'L5-27': {
    trap: 'print-placement',
    ans: '0 1 3 6',
    wrong: [
      { a: '0 1 3', trap: 'print-placement', why: 'The returned acc, 6, is printed by the outer `print(...)` at the end.' },
      { a: '0 1 4', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Each call prints the running total so far and passes the updated total on. The base case returns the final total, 6, which the outer `print` shows.' },

  'L5-28': {
    trap: 'off-by-one',
    blanks: [['climb(n - 1) + climb(n - 2) + climb(n - 3)', 'climb(n - 3) + climb(n - 2) + climb(n - 1)']],
    wrong: [
      { b: 1, a: 'climb(n) + climb(n - 2) + climb(n - 3)', trap: 'off-by-one', mut: 'index-off:3' },
      { b: 1, a: 'climb(n - 1) + climb(n - 2) + climb(n - 4)', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert climb(4) == 7
      assert climb(1) == 1
      assert climb(3) == 4`,
    exp: 'The first move is 1, 2 or 3 steps, and after it you have a smaller staircase. `n < 0` means you overshot (0 ways) and `n == 0` means you arrived exactly (1 way).' },

  'L5-29': {
    trap: 'off-by-one',
    blanks: [['rest if s[0] == c else s[0] + rest', 's[0] + rest if s[0] != c else rest']],
    wrong: [
      { b: 1, a: 'rest if s[1] == c else s[0] + rest', trap: 'off-by-one', mut: 'index-off:0' },
      { b: 1, a: 'rest if s[0] == c else s[1] + rest', trap: 'off-by-one', mut: 'index-off:2' }],
    test: `
      assert remove_all('banana', 'a') == 'bnn'
      assert remove_all('', 'a') == ''
      assert remove_all('aaa', 'a') == ''`,
    exp: 'The rest of the string is cleaned recursively. The first character is kept only if it is not `c`.' },

  'L5-30': {
    trap: 'rec-trace',
    ans: '15',
    wrong: [
      { a: '6', trap: 'rec-trace', why: 'total recurses into every nested tuple, so 2, 3 and 4 are added too.' },
      { a: '5', trap: 'off-by-one', mut: 'index-off:2' }],
    exp: 'A number is returned as it is. A tuple is split into its head, which may itself be nested, and its tail, and both are summed recursively: 1 + 2 + 3 + 4 + 5.' },

  'L5-31': {
    trap: 'rec-trace',
    ans: '8 [\'00\', \'01\', \'10\']',
    wrong: [
      { a: '16 [\'00\', \'01\', \'10\', \'11\']', trap: 'rec-trace', why: 'The if stops a 1 being added after a string that ends in 1, so \'11\' is never built.' },
      { a: '5 [\'00\', \'01\', \'10\']', trap: 'rec-trace', why: 'The counts grow like Fibonacci: 2, 3, 5, 8 for n = 1 to 4.' },
      { a: '34 [\'00\', \'0\', \'1\', \'10\']', trap: 'append-extend', mut: 'append-extend:1' }],
    exp: 'You can always append a 0, and you can append a 1 only when the string does not already end in 1. The counts go 2, 3, 5, 8, a Fibonacci pattern again. `s[-1:]` is safe even for the empty string.' },

  'L5-32': {
    trap: 'boundary',
    ans: 'nohtyp',
    wrong: [
      { a: 'nothyp', trap: 'boundary', mut: 'boundary:0' },
      { a: 'notp', trap: 'off-by-one', mut: 'index-off:6' }],
    exp: 'At every level the first and last characters change places around the recursively processed middle, which reverses the string.' },

  'L5-33': {
    trap: 'slice-stop',
    blanks: [['s[:i] + s[i + 1:]', 's[0:i] + s[i + 1:]', 's[:i] + s[i+1:len(s)]'], ['s[i] + p']],
    wrong: [
      { b: 1, a: 's[:i + 1] + s[i + 1:]', trap: 'slice-stop', mut: 'slice-stop:0' },
      { b: 1, a: 's[:i] + s[i + 2:]', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert perms('abc') == ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
      assert perms('a') == ['a']
      assert len(perms('abcd')) == 24`,
    exp: 'Pick each character in turn to go first, then put it in front of every permutation of the **remaining** characters (the string with position `i` cut out).' },

  'L5-34': {
    trap: 'off-by-one',
    blanks: [['ways(n - coins[0], coins)'], ['ways(n, coins[1:])']],
    wrong: [
      { b: 2, a: 'ways(n, coins[2:])', trap: 'off-by-one', mut: 'index-off:0' },
      { b: 2, a: 'ways(n, coins[0:])', trap: 'off-by-one', mut: 'index-off:1' }],
    test: `
      assert ways(5, (1, 2, 5)) == 4
      assert ways(3, (2,)) == 0
      assert ways(0, ()) == 1
      assert ways(10, (2, 5, 3, 6)) == 5`,
    exp: 'Either use at least one of the first coin (pay it and keep all the coins available) or never use it (drop it from the tuple). These two cases never overlap, so their counts add up.' },

  'L5-35': {
    trap: 'slice-stop',
    blanks: [['s[:len(t)] == t', 's[0:len(t)] == t', 't == s[:len(t)]']],
    wrong: [
      { b: 1, a: 's[:len(t) + 1] == t', trap: 'slice-stop', mut: 'slice-stop:0' },
      { b: 1, a: 's[:t] == t', trap: 'type-error', mut: 'drop-call:0' }],
    test: `
      assert count_sub('aaaa', 'aa') == 3
      assert count_sub('banana', 'ana') == 2
      assert count_sub('abc', 'd') == 0`,
    exp: 'Check whether `s` **starts with** `t`, then slide the window along by one character. Moving by one rather than by `len(t)` is what counts overlapping matches.' },

  'L5-36': {
    trap: 'boundary',
    blanks: [['t[0] <= t[1] and is_sorted(t[1:])', 'is_sorted(t[1:]) and t[0] <= t[1]', 't[1] >= t[0] and is_sorted(t[1:])']],
    wrong: [
      { b: 1, a: 't[0] < t[1] and is_sorted(t[1:])', trap: 'boundary', mut: 'boundary:0' },
      { b: 1, a: 't[1] <= t[1] and is_sorted(t[1:])', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert is_sorted((1, 2, 2, 5)) and is_sorted(()) and is_sorted((4,))
      assert not is_sorted((1, 3, 2))`,
    exp: 'The first pair must be in order **and** the rest must be sorted. Putting the cheap comparison first lets `and` stop early.' },

  'L5-37': {
    trap: 'off-by-one',
    blanks: [['prev[i] + prev[i + 1]', 'prev[i + 1] + prev[i]']],
    wrong: [
      { b: 1, a: 'prev[i] + prev[i]', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'prev[i] + prev[i + 2]', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert pascal(4) == [1, 4, 6, 4, 1]
      assert pascal(1) == [1, 1]
      assert pascal(0) == [1]`,
    exp: 'Every inner entry is the sum of the two entries above it in the previous row. The ends are always 1.' },

  'L5-38': {
    trap: 'off-by-one',
    blanks: [['paths(r - 1, c) + paths(r, c - 1)', 'paths(r, c - 1) + paths(r - 1, c)']],
    wrong: [
      { b: 1, a: 'paths(r, c) + paths(r, c - 1)', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'paths(r - 2, c) + paths(r, c - 1)', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert paths(2, 2) == 6
      assert paths(3, 3) == 20
      assert paths(0, 5) == 1`,
    exp: 'The last step is either down (from (r−1, c)) or right (from (r, c−1)). Along an edge only one straight path is possible. The answer is the binomial coefficient C(r+c, r).' },

  'L5-39': {
    trap: 'wrong-var',
    blanks: [['t[0] if t[0] > m else m', 'm if m >= t[0] else t[0]', 'max(t[0], m)', 'max(m, t[0])']],
    wrong: [
      { b: 1, a: 't[0] if t[1] > m else m', trap: 'off-by-one', mut: 'index-off:2' }],
    test: `
      assert rmax((3, 9, 2)) == 9
      assert rmax((-5,)) == -5
      assert rmax((4, 4, 1)) == 4
      assert rmax((5, 1, 2)) == 5`,
    exp: 'Trust the recursion to find the maximum of the tail, then compare it with the head.' },

  'L5-40': {
    trap: 'type-error',
    blanks: [['s[0] + str(i)', 'f"{s[0]}{i}"']],
    wrong: [
      { b: 1, a: 's[0] + i', trap: 'type-error', mut: 'drop-call:0' },
      { b: 1, a: 's[1] + str(i)', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert rle('aaabcc') == 'a3b1c2'
      assert rle('') == ''
      assert rle('zzzz') == 'z4'`,
    exp: 'The loop measures how long the first run is (`i` characters). Encode that run, then recurse on everything after it.' },

  'L5-41': {
    trap: 'concept',
    blanks: [['s + b']],
    wrong: [
      { b: 1, a: 'b + s', trap: 'concept', why: 'Puts the new bit in front, which changes the order; increasing order adds it at the end.' },
      { b: 1, a: 's', trap: 'concept', why: 'Each string must grow by one bit.' }],
    test: `
      assert bins(2) == ['00', '01', '10', '11']
      assert bins(0) == ['']
      assert len(bins(5)) == 32`,
    exp: 'For each shorter string (outer loop), append each bit (inner loop). Writing `b + s` gives the same strings in a different order: `00, 10, 01, 11`.' },

  'L5-42': {
    trap: 'precedence',
    ans: '21',
    wrong: [
      { a: '115', trap: 'precedence', mut: 'precedence:0' },
      { a: '43', trap: 'boundary', mut: 'boundary:0' },
      { a: '9', trap: 'off-by-one', mut: 'index-off:2' }],
    exp: 'Build up from the base: f(0) = f(1) = 1, f(2) = 3, f(3) = 5, f(4) = 11, f(5) = 11 + 2·5 = 21.' },

  'L5-43': {
    trap: 'print-end',
    ans: '1213121',
    wrong: [
      { a: '1\n2\n1\n3\n1\n2\n1', trap: 'print-end', mut: 'print-end:0' },
      { a: '3211211', trap: 'rec-order', mut: 'rec-order:0' },
      { a: '1121123', trap: 'rec-order', mut: 'rec-order:1' }],
    exp: 'p(1) prints `1`. p(2) prints p(1), then 2, then p(1): `121`. p(3) prints `121`, then 3, then `121`.' },

  'L5-44': {
    trap: 'missing-return',
    run: true,
    ans: 'TypeError',
    wrong: [
      { a: '4', trap: 'missing-return', why: '4 would need `return g(t[1:])` in the negative branch. Without `return` it gives None.' },
      { a: '1', trap: 'missing-return', why: 'The negative branch calls g but does not return its value, so it gives None, and 1 + None raises `TypeError`.' },
      { a: 'None', trap: 'missing-return', why: 'The outer call adds t[0] to None, which raises `TypeError` before anything is printed.' }],
    exp: 'The negative branch makes the recursive call but never **returns** its value, so `g((-2, 3))` returns `None`. Then `1 + None` raises `TypeError`. It should read `return g(t[1:])`.' },

  'L5-45': {
    trap: 'off-by-one',
    ans: 'acegfdb',
    wrong: [
      { a: 'adgeb', trap: 'off-by-one', mut: 'index-off:6' },
      { a: 'acefgdb', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'z(\'efg\') = e + z(\'g\') + f = `egf`. z(\'cdefg\') = c + `egf` + d = `cegfd`. z(\'abcdefg\') = a + `cegfd` + b.' },

  'L5-46': {
    trap: 'rec-trace',
    ans: '15',
    wrong: [
      { a: '8', trap: 'rec-trace', why: 'Each call with n > 1 makes two calls: 1 + 2 + 4 + 8 = 15.' },
      { a: '16', trap: 'off-by-one', why: 'There are 8 calls of h(1) at the bottom, plus 4 + 2 + 1 above them.' }],
    verify: `
      c = [0]
      def h(n):
          c[0] += 1
          if n <= 1:
              return 1
          return h(n - 1) + h(n - 1)
      h(4)
      assert c[0] == 15, c[0]`,
    exp: 'Each call above the base makes two calls with n − 1: 1 + 2 + 4 + 8 = 15 calls (2ⁿ − 1). Writing `2 * h(n - 1)` would compute the same value with only 4 calls.' }
});
