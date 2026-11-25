/* Lecture 9 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L9-01': {
    trap: 'off-by-one',
    ans: '10 3 4',
    wrong: [
      { a: '9 3 4', trap: 'off-by-one', mut: 'index-off:1' },
      { a: '6 3 4', trap: 'off-by-one', mut: 'index-off:3' }],
    exp: 'The first index is the row and the second is the column. There are 3 rows, each with 4 columns.' },

  'L9-02': {
    trap: 'list-repeat',
    run: true,
    ans: '[[0, 0, 7], [0, 0, 7]]',
    wrong: [
      { a: '[[0, 0, 0], [0, 0, 7]]', trap: 'list-repeat', mut: 'list-repeat:0' },
      { a: '[[0, 0, 7], [0, 0, 0]]', trap: 'list-repeat', why: 'Both rows are the **same** list, so the change appears in both.' },
      { a: '[[7, 7, 7], [0, 0, 0]]', trap: 'list-repeat', why: '`m[1][2] = 7` changes one position of the shared row.' }],
    exp: 'The outer `* 2` copies the **reference** to one row, so both rows are the same list. Build rows separately: `[[0] * 3 for r in range(2)]`.' },

  'L9-04': {
    trap: 'range-stop',
    ans: '[[0, 1, 2], [3, 4, 5]]',
    wrong: [
      { a: '[[0, 1, 2, 3], [3, 4, 5, 6]]', trap: 'range-stop', mut: 'range-stop:1' },
      { a: '[[0, 1, 2], [3, 4, 5], [6, 7, 8]]', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '[[3, 4, 5], [6, 7, 8]]', trap: 'range-zero', mut: 'range-zero:0' }],
    exp: 'Each entry is `r * cols + c`, which numbers the cells row by row from 0.' },

  'L9-06': {
    trap: 'wrong-var',
    blanks: [['M[r][c]']],
    wrong: [
      { b: 1, a: 'M[c][r]', trap: 'wrong-var', why: 'Output row c is built from column c of M, so read `M[r][c]` (row r, column c).' },
      { b: 1, a: 'M[r]', trap: 'wrong-var', why: 'That copies whole rows; each output cell needs a single element.' }],
    test: `
      assert transpose([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]]`,
    exp: 'Row `c` of the result is column `c` of `M`. The inner comprehension walks down the rows `r`, picking `M[r][c]`.' },

  'L9-07': {
    trap: 'append-extend',
    blanks: [['M.append([0] * cols)', 'M += [[0] * cols]', 'M.append([0 for c in range(cols)])', 'M = M + [[0] * cols]']],
    wrong: [
      { b: 1, a: 'M = [[0] * cols]', trap: 'acc-reset', why: 'Rebinds M each pass, so only one row survives.' },
      { b: 1, a: 'M.extend([0] * cols)', trap: 'append-extend', mut: 'append-extend:0' }],
    test: `
      M = zero_matrix(3, 4)
      assert M == [[0] * 4] * 3
      assert M[0] is not M[1]
      M[0][0] = 1
      assert M[1][0] == 0`,
    exp: '`[0] * cols` is evaluated again on every loop iteration, so each row is a new list object.' },

  'L9-08': {
    trap: 'wrong-var',
    blanks: [['A[r][c] + B[r][c]', 'B[r][c] + A[r][c]']],
    wrong: [
      { b: 1, a: 'A[r] + B[r]', trap: 'seq-repeat', why: '`+` on two rows joins them into a longer list; add element by element.' },
      { b: 1, a: 'A[c][r] + B[c][r]', trap: 'wrong-var', why: 'The row index comes first: `A[r][c]`.' }],
    test: `
      assert mat_add([[1, 2, 3], [4, 5, 6]], [[10, 20, 30], [40, 50, 60]]) == [[11, 22, 33], [44, 55, 66]]`,
    exp: 'Add the entries in the same position of both matrices.' },

  'L9-09': {
    trap: 'acc-reset',
    blanks: [['M[r][c] += A[r][k] * B[k][c]', 'M[r][c] = M[r][c] + A[r][k] * B[k][c]', 'M[r][c] += B[k][c] * A[r][k]']],
    wrong: [
      { b: 1, a: 'M[r][c] = A[r][k] * B[k][c]', trap: 'acc-reset', why: 'Overwrites the cell for each k instead of adding up the products.' },
      { b: 1, a: 'M[r][c] += A[r][k] * B[c][k]', trap: 'wrong-var', why: 'B is read at row k, column c: `B[k][c]`.' }],
    test: `
      assert mat_mult([[1, 2, 3], [4, 5, 6]], [[1, 4], [2, 5], [3, 6]]) == [[14, 32], [32, 77]]`,
    exp: 'Entry (r, c) is the dot product of row r of A and column c of B: the sum over k of `A[r][k] * B[k][c]`.' },

  'L9-10': {
    trap: 'slice-stop',
    ans: '[[5, 6], [9, 10]]',
    wrong: [
      { a: '[[5, 6, 7], [9, 10, 11]]', trap: 'slice-stop', mut: 'slice-stop:0' },
      { a: '[[9, 10]]', trap: 'off-by-one', mut: 'index-off:4' }],
    exp: '`M[1:]` keeps rows 1 and 2, and `row[1:3]` keeps columns 1 and 2 of each.' },

  'L9-11': {
    trap: 'off-by-one',
    ans: '16 13',
    wrong: [
      { a: '16 12', trap: 'off-by-one', mut: 'index-off:0' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:0' }],
    exp: 'The main diagonal is 2 + 5 + 9 = 16. The anti-diagonal (top-right to bottom-left) is 1 + 5 + 7 = 13.' },

  'L9-12': {
    trap: 'shallow-copy',
    run: true,
    ans: '9 1',
    wrong: [
      { a: '1 1', trap: 'shallow-copy', mut: 'shallow-copy:0' },
      { a: '9 9', trap: 'slice-copy', mut: 'slice-copy:1' },
      { a: '1 9', trap: 'shallow-copy', why: 'Reversed: B shares its rows with A (shows 9); C copied each row (keeps 1).' }],
    exp: '`A.copy()` copies only the outer list, so `B` shares A\'s rows. Copying each row (`copy2Darray`) gives a fully separate 2D array.' },

  'L9-13': {
    trap: 'array-cost',
    ans: 'A.insert(0, x)',
    wrong: [
      { a: 'A.append(x)', trap: 'array-cost', why: 'Appending at the end is constant time.' },
      { a: 'A[5] = x', trap: 'array-cost', why: 'Indexing is random access: constant time.' },
      { a: 'A.pop()', trap: 'array-cost', why: 'Removing the **last** element is constant time; `pop(0)` is not.' }],
    exp: 'Inserting at the front shifts every other element one place right, so its cost grows with the length. Indexing, appending and popping the **last** element are constant time.' },

  'L9-15': {
    trap: 'wrong-var',
    blanks: [['M[r][c]']],
    wrong: [
      { b: 1, a: 'M[c][r]', trap: 'wrong-var', why: 'r is the row index here: `M[r][c]`.' },
      { b: 1, a: 'M[r]', trap: 'type-error', why: 'Summing whole rows (lists) raises `TypeError`.' }],
    test: `
      assert col_sums([[1, 2], [3, 4], [5, 6]]) == [9, 12]`,
    exp: 'For each column `c`, add up `M[r][c]` over all the rows `r`.' },

  'L9-16': {
    trap: 'concept',
    ans: '3',
    wrong: [
      { a: '4', trap: 'concept', why: 'The centre (1, 1) itself is skipped by the `(dr, dc) != (0, 0)` test.' },
      { a: '1', trap: 'acc-reset', mut: 'acc-reset:0' }],
    exp: 'The 8 cells around (1, 1) include `#` at (0, 1), (1, 0) and (2, 2). The cell itself is skipped. A list of strings works as a 2D grid because strings can be indexed too.' },

  'L9-17': {
    trap: 'truthiness',
    ans: '[1, 3, 5]',
    wrong: [
      { a: '[2, 4, 6]', trap: 'truthiness', why: '`x % 2` is truthy for **odd** x, so the odd numbers are kept.' },
      { a: '[[1], [3], [5]]', trap: 'comp-order', why: 'Two for-clauses give one flat list, not a list per row.' }],
    exp: 'Outer `for row`, inner `for x in row`, then the filter keeps the odd values.' },

  'L9-18': {
    trap: 'off-by-one',
    blanks: [['R - 1 - r', 'R - r - 1', '-1 - r', '-r - 1', 'len(M) - 1 - r']],
    wrong: [
      { b: 1, a: 'R - r', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'R - 2 - r', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert rotate([[1, 2], [3, 4]]) == [[3, 1], [4, 2]]
      assert rotate([[1, 2, 3], [4, 5, 6]]) == [[4, 1], [5, 2], [6, 3]]`,
    exp: 'New row `c` is old column `c` read from the **bottom** up, so the row index runs `R-1, R-2, …, 0`.' },

  'L9-19': {
    trap: 'range-zero',
    ans: '5',
    wrong: [
      { a: '9', trap: 'range-zero', mut: 'range-zero:0' },
      { a: '7', trap: 'range-zero', mut: 'range-zero:1' },
      { a: '6', trap: 'range-zero', mut: 'range-zero:2' }],
    exp: 'Indices i = 1, j = 0, k = 1 give 1·4 + 0·2 + 1 = 5.' },

  'L9-20': {
    trap: 'slice-stop',
    blanks: [['M[i][:c] + M[i][c + 1:]', 'M[i][:c] + M[i][c+1:]']],
    wrong: [
      { b: 1, a: 'M[i][:c + 1] + M[i][c + 1:]', trap: 'slice-stop', mut: 'slice-stop:0' },
      { b: 1, a: 'M[i][:c] + M[i][c:]', trap: 'off-by-one', mut: 'index-off:1' }],
    test: `
      M = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
      assert minor(M, 1, 1) == [[0, 2], [6, 8]]
      assert minor(M, 0, 2) == [[3, 4], [6, 7]]
      assert M == [[0, 1, 2], [3, 4, 5], [6, 7, 8]]`,
    exp: 'For every row except `r`, join the part before column `c` to the part after it. Slicing makes new lists, so `M` is not changed.' },

  'L9-21': {
    trap: 'range-zero',
    ans: '[3, 5, 7]',
    wrong: [
      { a: '[5, 7]', trap: 'range-zero', mut: 'range-zero:0' },
      { a: '[3, 5]', trap: 'range-zero', mut: 'range-zero:1' },
      { a: '[6, 8]', trap: 'off-by-one', mut: 'index-off:4' }],
    exp: 'The cells where `i + j == 2` form the anti-diagonal: (0,2), (1,1) and (2,0).' },

  'L9-22': {
    trap: 'off-by-one',
    blanks: [['M[i][n - 1 - i]', 'M[i][n - i - 1]', 'M[i][-1 - i]', 'M[i][-i - 1]', 'M[n - 1 - i][i]']],
    wrong: [
      { b: 1, a: 'M[i][n - i]', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'M[i][n - 2 - i]', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert diag_diff([[11, 2, 4], [4, 5, 6], [10, 8, -12]]) == 15
      assert diag_diff([[1]]) == 0`,
    exp: 'On the anti-diagonal, the column runs backwards as the row goes forwards: column `n - 1 - i` in row `i`. Here (11 + 5 − 12) − (4 + 5 + 10) = 4 − 19, so the answer is 15.' },

  'L9-23': {
    trap: 'off-by-one',
    blanks: [['r == 0 or r == R - 1 or c == 0 or c == C - 1', 'r in (0, R - 1) or c in (0, C - 1)', 'c == 0 or c == C - 1 or r == 0 or r == R - 1', 'not (0 < r < R - 1 and 0 < c < C - 1)']],
    wrong: [
      { b: 1, a: 'r == 0 or r == R or c == 0 or (c == C - 1)', trap: 'off-by-one', mut: 'index-off:5' },
      { b: 1, a: 'r == 0 or r == R - 1 or c == 0 or (c == C)', trap: 'off-by-one', mut: 'index-off:7' }],
    test: `
      assert border([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [1, 2, 3, 4, 6, 7, 8, 9]
      assert border([[1, 2], [3, 4]]) == [1, 2, 3, 4]
      assert border([[5]]) == [5]`,
    exp: 'A cell is on the border if its row is the first or last row, **or** its column is the first or last column.' },

  'L9-24': {
    trap: 'slice-step',
    blanks: [['row[::-1]', 'row[len(row) - 1::-1]']],
    wrong: [
      { b: 1, a: 'row.reverse()', trap: 'none-return', why: '`reverse()` returns None, and it would mutate M.' },
      { b: 1, a: 'row[-1:]', trap: 'slice-step', why: 'That is only the last element; the step -1 is what reverses.' }],
    test: `
      M = [[1, 2, 3], [4, 5, 6]]
      assert mirror(M) == [[3, 2, 1], [6, 5, 4]]
      assert M == [[1, 2, 3], [4, 5, 6]]`,
    exp: 'Slicing makes a reversed **copy** of each row. `row.reverse()` would mutate `M` and return `None`.' },

  'L9-25': {
    trap: 'boundary',
    blanks: [['0 <= rr < len(M) and 0 <= cc < len(M[0])', '0 <= cc < len(M[0]) and 0 <= rr < len(M)', 'rr >= 0 and rr < len(M) and cc >= 0 and cc < len(M[0])']],
    wrong: [
      { b: 1, a: '(0 <= rr) < len(M) and 0 <= cc < len(M[0])', trap: 'chain-cmp', mut: 'chain-cmp:0' },
      { b: 1, a: '0 <= rr < len(M) and (0 <= cc) < len(M[0])', trap: 'chain-cmp', mut: 'chain-cmp:1' }],
    test: `
      M = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      assert neighbours(M, 1, 1) == 40
      assert neighbours(M, 0, 0) == 11
      assert neighbours(M, 2, 2) == 19
      assert neighbours([[1, 2, 3]], 0, 1) == 4`,
    exp: 'Both indices must be checked against **both** ends. A negative index would not crash in Python: `M[-1]` silently reads the last row, which is exactly the bug the `0 <=` checks prevent.' },

  'L9-26': {
    trap: 'wrong-var',
    blanks: [['c * R + r', 'r + c * R', 'R * c + r', 'r + R * c']],
    wrong: [
      { b: 1, a: 'r * C + c', trap: 'wrong-var', why: 'That fills row by row. Filling columns first needs `c * R + r`.' },
      { b: 1, a: 'c * C + r', trap: 'wrong-var', why: 'Each column holds R items, so the index jumps by R.' }],
    test: `
      assert to_cols([1, 2, 3, 4, 5, 6], 2, 3) == [[1, 3, 5], [2, 4, 6]]
      assert to_cols([1, 2, 3, 4, 5, 6], 3, 2) == [[1, 4], [2, 5], [3, 6]]`,
    exp: 'Column `c` starts at `A[c * R]`, because each earlier column used R elements. Row `r` within that column is `r` further on. Compare row-major order, where it is `r * C + c`.' },

  'L9-27': {
    trap: 'wrong-var',
    blanks: [['(1 if r == c else 0)', 'int(r == c)', '(r == c)']],
    wrong: [
      { b: 1, a: '1', trap: 'concept', why: 'Only the diagonal should be 1; every other cell should be 0.' },
      { b: 1, a: '(r != c)', trap: 'operator-choice', why: 'Reversed: it expects 1 off the diagonal and 0 on it.' }],
    test: `
      assert is_identity([[1, 0], [0, 1]]) and is_identity([[1]])
      assert not is_identity([[1, 0], [1, 1]]) and not is_identity([[0, 0], [0, 1]])`,
    exp: 'Diagonal cells must be 1 and all others 0. The parentheses matter: `M[r][c] != 1 if r == c else 0` parses as `(M[r][c] != 1) if r == c else 0`, which never fails off the diagonal.' },

  'L9-28': {
    trap: 'off-by-one',
    blanks: [['r', 'r + 1', 'n', 'len(M)']],
    wrong: [
      { b: 1, a: 'r - 1', trap: 'off-by-one', why: 'Skips the pair (r, r - 1), so a matrix that differs just below the diagonal passes.' },
      { b: 1, a: '1', trap: 'off-by-one', why: 'Only checks column 0, missing most pairs.' }],
    test: `
      assert is_symmetric([[1, 2], [2, 3]]) and is_symmetric([[4]])
      assert not is_symmetric([[1, 2], [3, 1]])
      assert not is_symmetric([[1, 2, 3], [2, 1, 5], [3, 4, 1]])
      assert is_symmetric([[1, 2, 3], [2, 1, 4], [3, 4, 1]])`,
    exp: '`range(r)` compares only the cells below the diagonal with their mirror images above it: each pair once, and the diagonal is skipped since it always matches itself. `range(n)` is also correct, just twice the work.' },

  'L9-29': {
    trap: 'operator-choice',
    blanks: [['up + left', 'left + up']],
    wrong: [
      { b: 1, a: 'up * left', trap: 'operator-choice', why: 'Paths add up: every path arrives either from above or from the left.' },
      { b: 1, a: 'up + left + 1', trap: 'off-by-one', why: 'No extra path starts at an inner cell; only the start cell counts 1.' }],
    test: `
      assert count_paths(['...', '.#.', '...']) == 2
      assert count_paths(['..', '..']) == 2
      assert count_paths(['.#', '#.']) == 0`,
    exp: 'Every path into a cell arrives from above or from the left, so its count is the sum of theirs. Filling the table row by row means those two cells are always computed first. This is the loop version of memoised grid-path recursion.' },

  'L9-30': {
    trap: 'off-by-one',
    ans: '[3, 6] 3',
    wrong: [
      { a: '[3] 3', trap: 'off-by-one', mut: 'index-off:5' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:0' }],
    exp: 'The outer loop runs over the 3 columns, so `T` has 3 rows. Row 2 of `T` is column 2 of `M`.' },

  'L9-31': {
    trap: 'range-stop',
    ans: '[[5, 0], [0, 0]] [[0, 7], [0, 7]]',
    wrong: [
      { a: '[[5, 0], [0, 0], [0, 0]] [[0, 7], [0, 7]]', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '[[5, 0], [0, 0]] [[0, 0], [0, 7]]', trap: 'list-repeat', mut: 'list-repeat:0' },
      { a: '[[5, 7], [5, 7]] [[5, 7], [5, 7]]', trap: 'slice-copy', mut: 'slice-copy:0' }],
    exp: '`row[:]` gives each row of `G` its own copy, so only `G[0]` changes. `[row] * 2` repeats the **same** list, so `H[1][1] = 7` changes `row` itself, which is both rows of `H`.' },

  'L9-32': {
    trap: 'off-by-one',
    ans: '2',
    wrong: [
      { a: '1', trap: 'off-by-one', mut: 'index-off:1' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:0' }],
    exp: 'There are five `#` cells. Three of them lie on the main diagonal (r == c), leaving (0, 2) and (2, 0).' },

  'L9-33': {
    trap: 'shallow-copy',
    run: true,
    ans: '[[1, 2], [8, 4]]',
    wrong: [
      { a: '[[9, 9], [8, 4]]', trap: 'slice-copy', mut: 'slice-copy:0' },
      { a: '[[1, 2], [3, 4]]', trap: 'shallow-copy', mut: 'shallow-copy:0' },
      { a: '[[9, 9], [3, 4]]', trap: 'shallow-copy', why: '`B[0] = [9, 9]` only rebinds B\'s slot, but B[1] is the same row as A[1], so the 8 shows in A.' }],
    exp: '`A[:]` copies only the outer list. Replacing `B[0]` affects `B` alone, but `B[1]` is still the same row object as `A[1]`, so changing one of its cells shows in `A`.' }
});
