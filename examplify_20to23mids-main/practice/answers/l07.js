/* Lecture 7 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L7-01': {
    trap: 'off-by-one',
    ans: '[0, 2, 3, 5, 6]',
    wrong: [
      { a: '[1, 2, 4, 5, 7]', trap: 'off-by-one', mut: 'index-off:1' },
      { a: '[0, 1, 3, 4, 6, 7]', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '`L[1::3]` selects indices 1, 4 and 7, and all three are removed at once.' },

  'L7-02': {
    trap: 'pop-end',
    ans: '[3, 5, 2]',
    wrong: [
      { a: '[5, 1, 6]', trap: 'pop-end', mut: 'pop-end:0' },
      { a: 'TypeError', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: '`remove(5)` deletes only the **first** 5, leaving `[3, 5, 1]`. `pop()` removes and returns the last element, 1. Then 2 is appended.' },

  'L7-03': {
    trap: 'state-trace',
    run: true,
    ans: 'bc',
    wrong: [
      { a: 'bb', trap: 'state-trace', why: 'After the first pop the list is shorter: index 1 now holds c.' },
      { a: 'bd', trap: 'state-trace', why: 'Everything after b shifts left by one, so the second `pop(1)` removes c.' },
      { a: 'ac', trap: 'off-by-one', why: '`pop(1)` removes index 1, which is b, not a.' }],
    exp: 'The left operand runs first: `pop(1)` removes `b`, leaving `[\'a\', \'c\', \'d\']`. The second `pop(1)` then removes `c`.' },

  'L7-04': {
    trap: 'append-extend',
    ans: '3 4',
    wrong: [
      { a: '4 4', trap: 'append-extend', mut: 'append-extend:0' },
      { a: '3 3', trap: 'append-extend', mut: 'append-extend:1' }],
    exp: '`append` adds its argument as **one** element (a nested list). `extend` adds each element of the iterable.' },

  'L7-05': {
    trap: 'append-extend',
    run: true,
    ans: '[\'x\', \'a\', \'b\']',
    wrong: [
      { a: '[\'x\', \'ab\']', trap: 'append-extend', mut: 'append-extend:0' },
      { a: '[\'xab\']', trap: 'append-extend', why: 'extend adds the **items** of the string, one character each; it does not join strings.' },
      { a: 'TypeError', trap: 'append-extend', why: 'A string is iterable, so extend accepts it.' }],
    exp: '`extend` takes any iterable and appends each item. A string is iterated character by character.' },

  'L7-06': {
    trap: 'insert-pos',
    ans: '[1, 9, 2, 8, 3]',
    wrong: [
      { a: '[1, 9, 2, 3, 8]', trap: 'insert-pos', why: '`insert(-1, x)` puts x **before** the last item, not at the end.' },
      { a: '[9, 1, 2, 8, 3]', trap: 'insert-pos', why: '`insert(1, 9)` puts 9 at index 1, after the first item.' }],
    exp: '`insert(i, x)` places `x` **before** index `i`. Index -1 is the last element, so 8 goes just before the 3.' },

  'L7-07': {
    trap: 'remove-value',
    run: true,
    ans: 'ValueError',
    wrong: [
      { a: 'IndexError', trap: 'remove-value', why: '`remove` takes a **value**. A value that is not there raises `ValueError`.' },
      { a: '[1, 2, 3]', trap: 'remove-value', why: '`remove` does not ignore a missing value; it raises `ValueError`.' },
      { a: 'KeyError', trap: 'remove-value', why: '`KeyError` is for dictionaries; lists raise `ValueError` here.' }],
    exp: '`remove` looks for a **value**. If the value is not in the list, it raises `ValueError: list.remove(x): x not in list`.' },

  'L7-08': {
    trap: 'slice-stop',
    ans: '[1, 3] [1, [], 3]',
    wrong: [
      { a: '[1] [1, [], 3]', trap: 'slice-stop', mut: 'slice-stop:0' },
      { a: '[3] [1, [], 3]', trap: 'off-by-one', mut: 'index-off:3' }],
    exp: 'Assigning to a slice **replaces** that slice with the elements of the new list, here none, so the element is removed. Assigning to an index puts the empty list in as one element.' },

  'L7-09': {
    trap: 'off-by-one',
    ans: '4 1',
    wrong: [
      { a: '4 0', trap: 'off-by-one', mut: 'index-off:0' },
      { a: '4 2', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: '`len` only counts top-level elements. `L[2]` is `[[4]]`, which has one element.' },

  'L7-10': {
    trap: 'off-by-one',
    ans: '4',
    wrong: [
      { a: '[4, 5]', trap: 'off-by-one', why: 'Three `[1]` steps reach [4, 5]; the final `[0]` then takes the 4.' },
      { a: '5', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '`L[1]` = `[2, [3, [4, 5]]]`, then `[1]` gives `[3, [4, 5]]`, then `[1]` gives `[4, 5]`, and `[0]` gives 4.' },

  'L7-11': {
    trap: 'rec-trace',
    ans: '5',
    wrong: [
      { a: '4', trap: 'rec-trace', why: 'The empty list adds 0, and every number at any depth counts: 1, 2, 3, 4 and 5.' },
      { a: '2', trap: 'off-by-one', mut: 'index-off:4' }],
    exp: 'deep_count counts the non-list items at any depth: 1, 2, 3, 4, 5. Empty lists contribute nothing.' },

  'L7-12': {
    trap: 'off-by-one',
    blanks: [['1 + deep_count(lst[1:])', 'deep_count(lst[1:]) + 1'], ['deep_count(lst[0]) + deep_count(lst[1:])', 'deep_count(lst[1:]) + deep_count(lst[0])']],
    wrong: [
      { b: 1, a: '1 + deep_count(lst[2:])', trap: 'off-by-one', mut: 'index-off:0' },
      { b: 1, a: '1 + deep_count(lst[0:])', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 2, a: 'deep_count(lst[0]) + deep_count(lst[2:])', trap: 'off-by-one', mut: 'index-off:2' }],
    test: `
      assert deep_count([1, [2, [3, 4]], [5, 6], [7], 8]) == 8
      assert deep_count([[], [[]], [[[]]]]) == 0`,
    exp: 'A non-list head counts as 1. A list head has to be counted **deeply**, so recurse into it as well as into the tail.' },

  'L7-13': {
    trap: 'off-by-one',
    blanks: [['[lst[0]]', 'lst[:1]', 'lst[0:1]'], ['flatten(lst[0])']],
    wrong: [
      { b: 1, a: '[lst[1]]', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert flatten([1, [2, [3, 4]], [5, 6], [7], 8]) == [1, 2, 3, 4, 5, 6, 7, 8]
      assert flatten([[[]]]) == []`,
    exp: 'Wrap a single item in a list so it can be concatenated. A nested list head is flattened first, so it is **not** wrapped, unlike in deep_map.' },

  'L7-14': {
    trap: 'rec-trace',
    blanks: [['func(elem)'], ['deep_map2(func, elem)']],
    wrong: [
      { b: 1, a: 'elem', trap: 'wrong-var', why: 'Copies the item unchanged; func has to be applied.' },
      { b: 2, a: 'func(elem)', trap: 'rec-trace', why: 'A sub-list must be processed recursively so its structure is kept.' }],
    test: `
      assert deep_map2(lambda x: x * x, [1, [2, [3]], [], 4]) == [1, [4, [9]], [], 16]`,
    exp: 'An item is transformed directly. A sub-list is mapped recursively, and the resulting list is appended as **one** element, which keeps the structure.' },

  'L7-15': {
    trap: 'return-in-loop',
    ans: '10',
    wrong: [
      { a: '1', trap: 'return-in-loop', mut: 'return-in-loop:0' },
      { a: 'UnboundLocalError', trap: 'acc-reset', mut: 'acc-reset:0' }],
    exp: 'Every number at any depth is added: 1 + 2 + 3 + 4. The empty list adds 0.' },

  'L7-16': {
    trap: 'rec-trace',
    ans: '3',
    wrong: [
      { a: '2', trap: 'rec-trace', why: 'Each level of list adds 1: [3] has depth 1, [2, [3]] depth 2, so the whole list has depth 3.' },
      { a: '4', trap: 'base-case', why: 'A non-list counts as depth 0, so the innermost [3] has depth 1, not 2.' }],
    exp: 'depth([3]) = 1, depth([2, [3]]) = 2, and depth([]) = 1. The outer list adds one more level to the largest of these: 1 + 2 = 3.' },

  'L7-17': {
    trap: 'shallow-copy',
    run: true,
    ans: '[1, [200, 3]]',
    wrong: [
      { a: '[1, [2, 3]]', trap: 'shallow-copy', mut: 'shallow-copy:0' },
      { a: '[100, [200, 3]]', trap: 'slice-copy', mut: 'slice-copy:0' },
      { a: '[100, [2, 3]]', trap: 'shallow-copy', why: '`M[0] = 100` changes only M (a different outer list), but M[1] is the same inner list as L[1].' }],
    exp: '`M[0] = 100` replaces a slot in M only. `M[1]` is the **same** inner list as `L[1]`, so changing its element affects both.' },

  'L7-18': {
    trap: 'return-in-loop',
    ans: '[3, 3, 4, 4, 5]',
    wrong: [
      { a: '[3]', trap: 'return-in-loop', mut: 'return-in-loop:0' },
      { a: '[5]', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: 'TypeError', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: 'Each position holds the largest value seen so far. The first element is used as it is because `out` is still empty.' },

  'L7-19': {
    trap: 'state-trace',
    blanks: [['total += elem', 'total = total + elem', 'total = elem + total']],
    wrong: [
      { b: 1, a: 'total = elem', trap: 'state-trace', why: 'Replaces the running total instead of adding to it.' },
      { b: 1, a: 'total + elem', trap: 'state-trace', why: 'An expression on its own changes nothing; total must be assigned.' }],
    test: `
      assert cumulative_sum([1, 2, 3, 4]) == [1, 3, 6, 10]
      assert cumulative_sum([]) == []`,
    exp: 'Update the running total **before** appending it.' },

  'L7-20': {
    trap: 'mutate-vs-new',
    ans: 'L = L + [x]',
    wrong: [
      { a: 'L.append(x)', trap: 'mutate-vs-new', why: 'append mutates the same list in place; the id does not change.' },
      { a: 'L += [x]', trap: 'iadd-inplace', why: '`+=` on a list extends it in place, so the id stays the same.' },
      { a: 'L[len(L):] = [x]', trap: 'mutate-vs-new', why: 'Slice assignment mutates the existing list; the id stays the same.' }],
    verify: `
      L = [1]
      i = id(L)
      L.append(2); assert id(L) == i
      L += [3]; assert id(L) == i
      L[len(L):] = [4]; assert id(L) == i
      L = L + [5]; assert id(L) != i`,
    exp: '`L + [x]` builds a new list and then re-binds `L` to it. The other three mutate the existing list in place, so its id stays the same.' },

  'L7-21': {
    trap: 'mutate-while-iter',
    ans: '[1, 2]',
    wrong: [
      { a: '[2]', trap: 'mutate-while-iter', why: 'After the first 1 is removed, the second 1 slides into its slot and the loop moves past it.' },
      { a: '[1, 2, 3]', trap: 'mutate-while-iter', why: 'The 3 is still reached and removed; only the second 1 is skipped.' }],
    exp: 'The loop walks by index. Removing at index 0 shifts the second 1 into index 0, which has already been visited, so it is skipped. Never change the length of a list you are iterating over.' },

  'L7-22': {
    trap: 'alias',
    ans: '[[1, 0], [1, 0]]',
    wrong: [
      { a: '[[5, 5], [5, 5]]', trap: 'alias', why: '`row = [5, 5]` rebinds the **name** row to a new list; grid still holds the old one.' },
      { a: '[[1, 0], [0, 0]]', trap: 'alias', why: 'Both slots of grid are the same list, so the change shows twice.' },
      { a: '[[0, 1], [0, 1]]', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'Both slots of `grid` refer to the same row object, so the mutation shows twice. `row = [5, 5]` re-binds the name to a new list and does not change `grid`.' },

  'L7-23': {
    trap: 'slice-stop',
    run: true,
    ans: '[1, 2, 3]',
    wrong: [
      { a: '[1, 2, 3, 4]', trap: 'slice-stop', why: '`-2:` takes the last **two** items, 4 and 5.' },
      { a: '[4, 5]', trap: 'concept', why: 'del removes the slice; the rest of the list stays.' },
      { a: '[1, 2, 3, 5]', trap: 'slice-stop', why: '`L[-2:]` runs to the end, so 5 goes as well.' }],
    exp: '`L[-2:]` is the last two elements, and `del` removes both.' },

  'L7-24': {
    trap: 'off-by-one',
    ans: '3 3',
    wrong: [
      { a: '3 2', trap: 'off-by-one', why: '`index(2)` gives the position of the first 2, counting from 0: position 3.' },
      { a: '2 3', trap: 'concept', why: '`count(3)` counts every 3 in the list: there are three.' }],
    exp: '3 appears three times, and the first 2 is at index 3.' },

  'L7-25': {
    trap: 'off-by-one',
    blanks: [['deep_reverse(head)'], ['deep_reverse(lst[1:]) + [head]']],
    wrong: [
      { b: 2, a: 'deep_reverse(lst[2:]) + [head]', trap: 'off-by-one', mut: 'index-off:0' },
      { b: 2, a: 'deep_reverse(lst[0:]) + [head]', trap: 'off-by-one', mut: 'index-off:1' }],
    test: `
      assert deep_reverse([1, [2, 3], 4]) == [4, [3, 2], 1]
      assert deep_reverse([[1, [2, 3]], 4]) == [4, [[3, 2], 1]]`,
    exp: 'Reverse a list head deeply, then put the head **after** the reversed tail. It must be wrapped as `[head]` so it stays one element.' },

  'L7-26': {
    trap: 'rec-trace',
    ans: '5',
    wrong: [
      { a: '3', trap: 'rec-trace', why: 'Count every list, including the empty one and the inner [3]: 1 + 2 + 2 = 5.' },
      { a: '6', trap: 'rec-trace', why: 'Numbers count 0, so 1, 2 and 3 add nothing.' }],
    exp: 'Each list counts as 1, plus the lists inside it: the outer list, `[2, []]`, `[]`, `[[3]]` and `[3]` make 5.' },

  'L7-27': {
    trap: 'rec-trace',
    blanks: [['deep_max(e) if type(e) == list else e', 'e if type(e) != list else deep_max(e)']],
    wrong: [
      { b: 1, a: 'deep_max(e)', trap: 'type-error', why: 'deep_max needs a list; for a number, use the number itself.' },
      { b: 1, a: 'e', trap: 'rec-trace', why: 'A sub-list must be searched recursively; comparing a list with a number raises `TypeError`.' }],
    test: `
      assert deep_max([1, [7, [3]], [], 2]) == 7
      assert deep_max([[], [[]]]) is None
      assert deep_max([-5, [-2]]) == -2`,
    exp: 'A sub-list is searched recursively, and a number is used as it is. `None` stands for "no number found", which is why it has to be checked before comparing.' },

  'L7-28': {
    trap: 'off-by-one',
    ans: '[1, 2, 3] [[1, 2, 3], [1, 2, 3, 4]]',
    wrong: [
      { a: '[1, 2, 3] [[1, 2, 3, 4], [1, 2, 3]]', trap: 'off-by-one', mut: 'index-off:1' },
      { a: 'TypeError', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: '`B[0].append(3)` mutates `A` itself. `B[1] + [4]` builds a **new** list, and that goes into slot 1 only, so `A` does not get the 4.' },

  'L7-29': {
    trap: 'off-by-one',
    blanks: [['d + 1', '1 + d']],
    wrong: [
      { b: 1, a: 'd', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'd + 2', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert weighted([1, [2, [3]]]) == 14
      assert weighted([]) == 0
      assert weighted([[5]]) == 10`,
    exp: 'Entering a list one level deeper means its elements sit at depth `d + 1`. The outer list starts at 0, so its own elements are at depth 1.' },

  'L7-30': {
    trap: 'remove-value',
    blanks: [['x in L']],
    wrong: [
      { b: 1, a: 'x not in L', trap: 'concept', why: 'The loop must continue **while** x is still in L.' },
      { b: 1, a: 'L', trap: 'truthiness', why: 'A non-empty list is truthy, so this tries to remove x after it is gone: `ValueError`.' }],
    test: `
      L = [1, 2, 1, 3, 1]
      M = L
      remove_all(L, 1)
      assert L == [2, 3] and M is L
      remove_all(L, 9)
      assert L == [2, 3]`,
    exp: '`remove` deletes only the first copy and raises `ValueError` if there is none, so loop while another copy remains. Unlike a for loop over `L`, this never skips elements.' },

  'L7-31': {
    trap: 'pop-end',
    blanks: [['L.insert(0, L.pop())', 'L[:] = L[-1:] + L[:-1]', 'L[:] = [L[-1]] + L[:-1]']],
    wrong: [
      { b: 1, a: 'L.append(L.pop(0))', trap: 'wrong-var', why: 'That rotates left: [1, 2, 3] becomes [2, 3, 1].' },
      { b: 1, a: 'L.insert(0, L.pop(0))', trap: 'pop-end', mut: 'pop-end:0' }],
    test: `
      L = [1, 2, 3]
      M = L
      rotate_right(L)
      assert L == [3, 1, 2] and M is L
      E = []
      rotate_right(E)
      assert E == []`,
    exp: '`pop()` removes and returns the last element, and `insert(0, …)` puts it at the front. Slice assignment `L[:] = …` also mutates in place, whereas `L = …` would only re-bind the local name.' },

  'L7-32': {
    trap: 'rec-trace',
    blanks: [['contains(e, x)']],
    wrong: [
      { b: 1, a: 'e == x', trap: 'rec-trace', why: 'That repeats the first test; the sub-list must be searched with contains(e, x).' },
      { b: 1, a: 'x in e', trap: 'rec-trace', why: '`in` only checks the top level of e; x may be deeper.' }],
    test: `
      assert contains([1, [2, [3, 4]]], 4)
      assert not contains([1, [2, [3]]], 5)
      assert contains([[], [[7]]], 7)`,
    exp: 'A sub-list is searched recursively. Short-circuit `and` makes sure only lists are passed to `contains`.' },

  'L7-33': {
    trap: 'slice-stop',
    blanks: [['L[i:i + k]', 'L[i:k + i]', 'L[i:i+k]']],
    wrong: [
      { b: 1, a: 'L[i:k]', trap: 'wrong-var', why: 'The stop has to move with i: `L[i:i + k]`.' },
      { b: 1, a: 'L[i:i + k + 1]', trap: 'slice-stop', mut: 'slice-stop:0' }],
    test: `
      assert chunk([1, 2, 3, 4, 5], 2) == [[1, 2], [3, 4], [5]]
      assert chunk([], 3) == []
      assert chunk([1, 2], 5) == [[1, 2]]`,
    exp: '`i` steps through the start of each chunk, and a slice past the end simply stops early, so the last chunk can be shorter without any error.' },

  'L7-34': {
    trap: 'slice-stop',
    ans: '[3, 0, 5, 0, 3]',
    wrong: [
      { a: '[0, 5, 0, 0]', trap: 'slice-stop', mut: 'slice-stop:0' },
      { a: '[3, 0, 5, 0, 3, 0]', trap: 'slice-stop', mut: 'slice-stop:1' },
      { a: '[3, 0, 5, 0, [3]]', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: 'The stepped slice replaces indices 1, 3, 5: `[1, 0, 3, 0, 5, 0]`. A stepped slice needs exactly the same number of new values. `del L[:2]` leaves `[3, 0, 5, 0]`, and `extend` appends a copy of the first element.' }
});
