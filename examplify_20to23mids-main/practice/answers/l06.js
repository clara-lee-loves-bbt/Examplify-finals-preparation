/* Lecture 6 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L6-01': {
    trap: 'alias',
    ans: '[1, 2, 3, 4]',
    wrong: [
      { a: '[1, 2, 3]', trap: 'alias', mut: 'alias:0' },
      { a: 'TypeError', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: '`b = a` does not copy the list. Both names refer to the same list object, so mutating it through `b` shows up through `a`.' },

  'L6-02': {
    trap: 'alias',
    ans: '[1, 2, 3] [1, 2, 3, 4]',
    wrong: [
      { a: '[1, 2, 3, 4] [1, 2, 3, 4]', trap: 'alias', why: '`b + [4]` builds a **new** list and only b is rebound to it; a still refers to the old list.' },
      { a: '[1, 2, 3] [1, 2, 3]', trap: 'state-trace', why: '`b = b + [4]` does change b: it now refers to the new list.' }],
    exp: '`b + [4]` builds a **new** list, and `b` is re-bound to it. The original list, still referred to by `a`, is untouched.' },

  'L6-03': {
    trap: 'iadd-inplace',
    ans: '[1, 2, 3]',
    wrong: [
      { a: '[1, 2, [3]]', trap: 'append-extend', why: '`b += [3]` adds the **items** of [3], like extend, not the list itself.' },
      { a: '[1, 2]', trap: 'alias', mut: 'alias:0' }],
    exp: 'For lists, `b += [3]` extends the **same** list object in place, unlike `b = b + [3]`. So `a` sees the change too.' },

  'L6-04': {
    trap: 'iadd-inplace',
    run: true,
    ans: '(1, 2) (1, 2, 3)',
    wrong: [
      { a: '(1, 2, 3) (1, 2, 3)', trap: 'iadd-inplace', why: 'Tuples are immutable, so `b += (3,)` builds a new tuple for b; a is unchanged.' },
      { a: 'TypeError', trap: 'tuple-comma', mut: 'tuple-comma:0' },
      { a: '(1, 2) (1, 2)', trap: 'state-trace', why: 'b does change: it is rebound to the new tuple (1, 2, 3).' }],
    exp: 'Tuples are immutable, so `b += (3,)` has to build a new tuple and re-bind `b` to it. `a` still refers to the old tuple.' },

  'L6-05': {
    trap: 'pass-by-ref',
    ans: '[99, 2, 3]',
    wrong: [
      { a: '[1, 2, 3]', trap: 'pass-by-ref', mut: 'pass-by-ref:0' },
      { a: '[1, 99, 3]', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'The parameter `lst` first refers to the caller\'s list, so `lst[0] = 99` changes `x`. After `lst = [7, 7]` the local name refers to a different list, and later changes do not reach `x`.' },

  'L6-06': {
    trap: 'is-identity',
    run: true,
    ans: 'True False True',
    wrong: [
      { a: 'True True True', trap: 'is-identity', mut: 'is-identity:0' },
      { a: 'False False True', trap: 'is-identity', why: '`==` compares values, and [1, 2] == [1, 2] is True.' },
      { a: 'True False False', trap: 'alias', mut: 'alias:0' }],
    exp: '`==` compares contents and `is` compares identity. `a` and `b` are two different lists with equal contents, while `c` is the same object as `a`.' },

  'L6-07': {
    trap: 'comp-order',
    ans: '[0, 9, 36, 81]',
    wrong: [
      { a: '[0, 3, 6, 9]', trap: 'comp-order', why: 'The if keeps 0, 3, 6, 9, and then each kept i is **squared**.' },
      { a: '[9, 36, 81]', trap: 'range-zero', mut: 'range-zero:0' }],
    exp: 'Only i = 0, 3, 6 and 9 pass the `if`, and each is squared.' },

  'L6-08': {
    trap: 'comp-order',
    ans: '[\'aa\', \'cc\']',
    wrong: [
      { a: '[\'aa\', \'bb\', \'cc\']', trap: 'comp-order', why: 'The `if c != \'b\'` drops b before the expression is applied.' },
      { a: '[\'a\', \'a\', \'c\', \'c\']', trap: 'seq-repeat', why: '`c * 2` makes one string \'aa\'; it does not add two items.' }],
    exp: 'Each character except `b` is repeated twice. The result is a list of strings.' },

  'L6-09': {
    trap: 'slice-copy',
    run: true,
    ans: '1 10 False',
    wrong: [
      { a: '10 10 True', trap: 'slice-copy', mut: 'slice-copy:0' },
      { a: '1 10 True', trap: 'slice-copy', why: 'After `b[0] = 10` the lists differ, so `a == b` is False.' },
      { a: '10 10 False', trap: 'slice-copy', why: '`a[:]` makes a new list, so changing b[0] does not touch a.' }],
    exp: '`a[:]` creates a new list with the same elements, so changing `b[0]` does not affect `a`.' },

  'L6-10': {
    trap: 'slice-stop',
    ans: '[1, 9, 9, 9, 4] 5',
    wrong: [
      { a: '[1, 9, 9, 9] 4', trap: 'slice-stop', mut: 'slice-stop:0' },
      { a: '[9, 9, 9, 4] 4', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: 'The two elements at indices 1 and 2 are replaced by three new ones, so the list grows by one.' },

  'L6-11': {
    trap: 'precedence',
    ans: '456 156',
    wrong: [
      { a: '4056 1056', trap: 'precedence', mut: 'precedence:0' },
      { a: 'TypeError', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '`*t` unpacks the tuple into separate arguments. In the second call, `*t[1:]` supplies `5, 6` after the explicit `1`.' },

  'L6-12': {
    trap: 'off-by-one',
    blanks: [['f(t[i]) * (t[i + 1] - t[i]) + y[i]', 'y[i] + f(t[i]) * (t[i + 1] - t[i])', 'y[i] + (t[i + 1] - t[i]) * f(t[i])', '(t[i + 1] - t[i]) * f(t[i]) + y[i]']],
    wrong: [
      { b: 1, a: 'f(t[i]) * (t[i] - t[i]) + y[i]', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'f(t[i]) * (t[i + 2] - t[i]) + y[i]', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert eulerf(lambda x: 2 * x, [1.0, 1.5, 2.0, 2.5, 3.0], 1.0) == [1.0, 2.0, 3.5, 5.5, 8.0]`,
    exp: 'Rearranging (yᵢ₊₁ − yᵢ) / (tᵢ₊₁ − tᵢ) = f(tᵢ) gives yᵢ₊₁ = f(tᵢ)·(tᵢ₊₁ − tᵢ) + yᵢ.' },

  'L6-13': {
    trap: 'none-return',
    ans: '[1, 2, 3] None',
    wrong: [
      { a: '[3, 1, 2] [1, 2, 3]', trap: 'none-return', why: '`a.sort()` sorts a **in place** and returns None.' },
      { a: '[1, 2, 3] [1, 2, 3]', trap: 'none-return', mut: 'none-return:0' }],
    exp: '`list.sort()` sorts the list **in place** and returns `None`. Use `sorted(a)` if you need a new sorted list.' },

  'L6-14': {
    trap: 'list-repeat',
    run: true,
    ans: '[[0, 5, 0], [0, 5, 0]]',
    wrong: [
      { a: '[[0, 5, 0], [0, 0, 0]]', trap: 'list-repeat', mut: 'list-repeat:0' },
      { a: '[[5, 5, 5], [0, 0, 0]]', trap: 'list-repeat', why: '`y[0][1] = 5` changes one position, and both rows are the same list x.' },
      { a: '[[0, 5, 0]]', trap: 'list-repeat', why: '`[x] * 2` has two items, both the same list x.' }],
    exp: '`[x] * 2` makes a list holding **two references to the same list** `x`. Mutating it through `y[0]` also shows up through `y[1]`.' },

  'L6-15': {
    trap: 'pass-by-ref',
    ans: '[2, 4, 6] None',
    wrong: [
      { a: '[1, 2, 3] None', trap: 'pass-by-ref', mut: 'pass-by-ref:0' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:0' }],
    exp: 'The function changes the caller\'s list through the shared reference, and it returns `None` because there is no `return` statement.' },

  'L6-16': {
    trap: 'loop-var',
    run: true,
    ans: '[1, 2, 3]',
    wrong: [
      { a: '[10, 20, 30]', trap: 'loop-var', why: 'x is just a name for each element; rebinding x does not change the list.' },
      { a: '[10, 2, 3]', trap: 'loop-var', why: 'No element of a is ever assigned; only the name x is rebound.' },
      { a: 'TypeError', trap: 'loop-var', why: 'Rebinding a loop variable is allowed; it just does not affect a.' }],
    exp: '`x = x * 10` only re-binds the local name `x` to a new int, and ints are immutable. The list itself is never mutated, which would need `a[i] = …`.' },

  'L6-17': {
    trap: 'range-stop',
    ans: '[0, 1, -2, 3, -4]',
    wrong: [
      { a: '[0, 1, -2, 3, -4, 5]', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '[1, -2, 3, -4, 5]', trap: 'range-zero', mut: 'range-zero:0' }],
    exp: 'Odd numbers (where `x % 2` is 1, which is truthy) stay as they are, and even numbers are negated. `-0` is just `0`.' },

  'L6-18': {
    trap: 'truthiness',
    blanks: [['x ** 2', 'x * x', 'x**2'], ['if x % 2 == 0', 'if not x % 2', 'if x % 2 != 1']],
    wrong: [
      { b: 2, a: 'if x % 2', trap: 'truthiness', why: '`x % 2` is truthy for **odd** x, so this keeps the odd numbers.' },
      { b: 1, a: 'x * 2', trap: 'operator-choice', why: 'Doubles instead of squaring.' }],
    test: `
      assert evens_squared([1, 2, 3, 4]) == [4, 16]
      assert evens_squared([]) == []`,
    exp: 'The expression comes first, then the `for`, then the optional `if` filter.' },

  'L6-19': {
    trap: 'mutability',
    ans: 'list',
    wrong: [
      { a: 'tuple', trap: 'mutability', why: 'Tuples are immutable: item assignment raises `TypeError`.' },
      { a: 'str', trap: 'mutability', why: 'Strings are immutable: every string operation makes a new string.' },
      { a: 'int', trap: 'mutability', why: 'Numbers are immutable objects; `x += 1` makes x refer to a new int.' }],
    exp: 'Lists can be changed in place. int, float, bool, str and tuple are immutable.' },

  'L6-20': {
    trap: 'alias',
    ans: '([1, 2, 3, 5], 4)',
    wrong: [
      { a: '([1, 2, 3], 4)', trap: 'alias', why: 'The tuple holds a reference to the **same** list, so appending to lst shows inside t.' },
      { a: 'TypeError', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: 'The tuple holds a **reference** to the list. The tuple cannot be changed, but the list it refers to can.' },

  'L6-21': {
    trap: 'mutability',
    run: true,
    ans: 'TypeError',
    wrong: [
      { a: '([1, 3], [4])', trap: 'mutability', why: 'Mutating the list inside works, but `t[1] = [4]` is item assignment on a tuple: `TypeError`.' },
      { a: '([1, 3], [2])', trap: 'mutability', why: 'The tuple assignment is not skipped; it raises `TypeError`, so nothing is printed.' },
      { a: '([1], [4])', trap: 'mutability', why: 'Both statements run in order, and the second raises `TypeError`.' }],
    exp: '`t[0].append(3)` is allowed because it mutates the list, not the tuple. `t[1] = [4]` tries to replace an element of the tuple, which raises `TypeError`, so `print` never runs.' },

  'L6-22': {
    trap: 'shallow-copy',
    ans: '[[9, 2], 3]',
    wrong: [
      { a: '[[1, 2], 3]', trap: 'shallow-copy', mut: 'shallow-copy:0' },
      { a: '[[9, 2], 8]', trap: 'slice-copy', mut: 'slice-copy:0' },
      { a: '[[1, 9], 3]', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '`copy()` makes a new outer list, but its elements are the same objects. `b[0][0] = 9` mutates the shared inner list, while `b[1] = 8` only changes `b`\'s own slot.' },

  'L6-23': {
    trap: 'shallow-copy',
    run: true,
    ans: 'False True True',
    wrong: [
      { a: 'False False True', trap: 'shallow-copy', mut: 'shallow-copy:0' },
      { a: 'True True True', trap: 'slice-copy', mut: 'slice-copy:0' },
      { a: 'False False False', trap: 'shallow-copy', why: 'The copy has the same contents, so `cp == lst` is True.' }],
    exp: 'A copy is a new list object (`is` gives `False`), but it holds the very same element objects (`cp[0] is lst[0]`), so the contents compare equal.' },

  'L6-24': {
    trap: 'range-stop',
    ans: '[[], [0], [0, 1], [0, 1, 2]]',
    wrong: [
      { a: '[[0], [0, 1], [0, 1, 2], [0, 1, 2, 3]]', trap: 'range-stop', mut: 'range-stop:1' },
      { a: '[[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]]', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '[[], [1], [1, 2], [1, 2, 3]]', trap: 'range-zero', mut: 'range-zero:1' }],
    exp: 'The outer comprehension builds one list per `i`. Row `i` has the numbers `0 … i-1`, and row 0 is empty.' },

  'L6-25': {
    trap: 'pass-by-ref',
    ans: '[2, 1] 1 2',
    wrong: [
      { a: '[1, 2] 1 2', trap: 'pass-by-ref', mut: 'pass-by-ref:0' },
      { a: '[1, 1] 1 2', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Swapping the list\'s elements mutates the caller\'s list. Swapping `x` and `y` only re-binds local names, so the caller\'s `a` and `b` are unchanged.' },

  'L6-26': {
    trap: 'pass-by-ref',
    ans: '1 2 [1, 2] [1, 2, 3]',
    wrong: [
      { a: '1 1 [2] [2, 3]', trap: 'pass-by-ref', mut: 'pass-by-ref:0' },
      { a: '1 2 [1] [1, 3]', trap: 'pass-by-ref', mut: 'pass-by-ref:1' },
      { a: 'TypeError', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: 'Both calls append to the same list `L`. `M = M + [3]` builds a new list, so `L` stays `[1, 2]`.' },

  'L6-27': {
    trap: 'range-stop',
    ans: '[(1, 0), (2, 1)]',
    wrong: [
      { a: '[(1, 0), (2, 1), (3, 0), (3, 2)]', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '[(2, 1)]', trap: 'range-zero', mut: 'range-zero:1' },
      { a: '[(1, 0)]', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: 'The pairs with j < i are (1,0), (2,0) and (2,1). Only those with an odd sum are kept.' }
});
