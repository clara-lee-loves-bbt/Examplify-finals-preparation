/* Lecture 9 — Multi-dimensional arrays: lists as arrays, constant-time
   operations, 2D arrays, matrices, list-comprehension construction */
practice([
  { id: 'L9-01', lec: 9, topic: '2D arrays', d: 1, type: 'out',
    t: 'Rows, columns and an element',
    code: `
      table = [[1, 2, 3, 4],
               [5, 6, 7, 8],
               [9, 10, 11, 12]]
      print(table[2][1], len(table), len(table[0]))`,
    ans: '10 3 4',
    exp: 'The first index is the row and the second is the column. There are 3 rows, each with 4 columns.' },

  { id: 'L9-02', lec: 9, topic: 'Creating 2D arrays', d: 2, type: 'mcq', run: true, optCode: true,
    t: 'The [[0] * c] * r trap',
    q: 'What is printed?',
    code: `
      m = [[0] * 3] * 2
      m[1][2] = 7
      print(m)`,
    opts: ['[[0, 0, 7], [0, 0, 7]]', '[[0, 0, 0], [0, 0, 7]]', '[[0, 0, 7], [0, 0, 0]]', '[[7, 7, 7], [0, 0, 0]]'],
    ans: 0,
    exp: 'The outer `* 2` copies the **reference** to one row, so both rows are the same list. Build rows separately: `[[0] * 3 for r in range(2)]`.' },

  { id: 'L9-04', lec: 9, topic: 'Creating 2D arrays', d: 1, type: 'out',
    t: 'Row-major numbering',
    code: `
      M = [[r * 3 + c for c in range(3)]
           for r in range(2)]
      print(M)`,
    ans: '[[0, 1, 2], [3, 4, 5]]',
    exp: 'Each entry is `r * cols + c`, which numbers the cells row by row from 0.' },

  { id: 'L9-06', lec: 9, topic: 'Matrices', d: 2, type: 'fib',
    t: 'Transpose with comprehensions',
    q: 'Complete `transpose`, e.g. `transpose([[1, 2, 3], [4, 5, 6]])` is `[[1, 4], [2, 5], [3, 6]]`.',
    code: `
      def transpose(M):
          R, C = len(M), len(M[0])
          return [[{{1}} for r in range(R)]
                  for c in range(C)]`,
    blanks: [['M[r][c]']],
    test: 'assert transpose([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]]',
    exp: 'Row `c` of the result is column `c` of `M`. The inner comprehension walks down the rows `r`, picking `M[r][c]`.' },

  { id: 'L9-07', lec: 9, topic: 'Creating 2D arrays', d: 1, type: 'fib',
    t: 'zero_matrix with a loop',
    q: 'Complete `zero_matrix(rows, cols)` with one statement. Every row must be a **separate** list.',
    code: `
      def zero_matrix(rows, cols):
          M = []
          for r in range(rows):
              {{1}}
          return M`,
    blanks: [['M.append([0] * cols)', 'M += [[0] * cols]', 'M.append([0 for c in range(cols)])', 'M = M + [[0] * cols]']],
    test: 'M = zero_matrix(3, 4)\nassert M == [[0] * 4] * 3\nassert M[0] is not M[1]\nM[0][0] = 1\nassert M[1][0] == 0',
    exp: '`[0] * cols` is evaluated again on every loop iteration, so each row is a new list object.' },

  { id: 'L9-08', lec: 9, topic: 'Matrices', d: 1, type: 'fib',
    t: 'Matrix addition',
    q: 'Complete `mat_add`, which adds two matrices of the same size.',
    code: `
      def mat_add(A, B):
          return [[{{1}} for c in range(len(A[0]))]
                  for r in range(len(A))]`,
    blanks: [['A[r][c] + B[r][c]', 'B[r][c] + A[r][c]']],
    test: 'assert mat_add([[1, 2, 3], [4, 5, 6]], [[10, 20, 30], [40, 50, 60]]) == [[11, 22, 33], [44, 55, 66]]',
    exp: 'Add the entries in the same position of both matrices.' },

  { id: 'L9-09', lec: 9, topic: 'Matrices', d: 2, type: 'fib',
    t: 'Matrix multiplication',
    q: 'Complete the innermost statement of `mat_mult` (A is n×m and B is m×p).',
    code: `
      def mat_mult(A, B):
          n, m, p = len(A), len(B), len(B[0])
          M = [[0] * p for r in range(n)]
          for r in range(n):
              for c in range(p):
                  for k in range(m):
                      {{1}}
          return M`,
    blanks: [['M[r][c] += A[r][k] * B[k][c]', 'M[r][c] = M[r][c] + A[r][k] * B[k][c]', 'M[r][c] += B[k][c] * A[r][k]']],
    test: 'assert mat_mult([[1, 2, 3], [4, 5, 6]], [[1, 4], [2, 5], [3, 6]]) == [[14, 32], [32, 77]]',
    exp: 'Entry (r, c) is the dot product of row r of A and column c of B: the sum over k of `A[r][k] * B[k][c]`.' },

  { id: 'L9-10', lec: 9, topic: 'Submatrices', d: 2, type: 'out',
    t: 'Submatrix by slicing',
    code: `
      M = [[0, 1, 2, 3],
           [4, 5, 6, 7],
           [8, 9, 10, 11]]
      print([row[1:3] for row in M[1:]])`,
    ans: '[[5, 6], [9, 10]]',
    exp: '`M[1:]` keeps rows 1 and 2, and `row[1:3]` keeps columns 1 and 2 of each.' },

  { id: 'L9-11', lec: 9, topic: 'Matrices', d: 2, type: 'out',
    t: 'Diagonal and anti-diagonal',
    code: `
      M = [[2, 0, 1],
           [3, 5, 4],
           [7, 6, 9]]
      n = len(M)
      d1 = sum(M[i][i] for i in range(n))
      d2 = sum(M[i][n - 1 - i] for i in range(n))
      print(d1, d2)`,
    ans: '16 13',
    exp: 'The main diagonal is 2 + 5 + 9 = 16. The anti-diagonal (top-right to bottom-left) is 1 + 5 + 7 = 13.' },

  { id: 'L9-12', lec: 9, topic: 'Copying 2D arrays', d: 2, type: 'mcq', run: true,
    t: 'Shallow versus row-by-row copy',
    q: 'What is printed?',
    code: `
      A = [[1, 2], [3, 4]]
      B = A.copy()
      C = [row.copy() for row in A]
      A[0][0] = 9
      print(B[0][0], C[0][0])`,
    opts: ['9 1', '1 1', '9 9', '1 9'],
    ans: 0,
    exp: '`A.copy()` copies only the outer list, so `B` shares A\'s rows. Copying each row (`copy2Darray`) gives a fully separate 2D array.' },

  { id: 'L9-13', lec: 9, topic: 'Array efficiency', d: 1, type: 'mcq',
    t: 'Which operation is not constant-time?',
    q: 'For a Python list `A` used as an array, which operation does **not** run in constant time?',
    optCode: true,
    opts: ['A.insert(0, x)', 'A.append(x)', 'A[5] = x', 'A.pop()'],
    ans: 0,
    exp: 'Inserting at the front shifts every other element one place right, so its cost grows with the length. Indexing, appending and popping the **last** element are constant time.' },

  { id: 'L9-15', lec: 9, topic: '2D arrays', d: 2, type: 'fib',
    t: 'Column sums',
    q: 'Complete `col_sums`, e.g. `col_sums([[1, 2], [3, 4], [5, 6]])` is `[9, 12]`.',
    code: `
      def col_sums(M):
          return [sum({{1}} for r in range(len(M)))
                  for c in range(len(M[0]))]`,
    blanks: [['M[r][c]']],
    test: 'assert col_sums([[1, 2], [3, 4], [5, 6]]) == [9, 12]',
    exp: 'For each column `c`, add up `M[r][c]` over all the rows `r`.' },

  { id: 'L9-16', lec: 9, topic: 'Grids', d: 3, type: 'out',
    t: 'Counting neighbours on a grid',
    code: `
      G = ['.#.',
           '##.',
           '..#']
      r, c = 1, 1
      n = 0
      for dr in (-1, 0, 1):
          for dc in (-1, 0, 1):
              if (dr, dc) != (0, 0) and \\
                 G[r + dr][c + dc] == '#':
                  n += 1
      print(n)`,
    ans: '3',
    exp: 'The 8 cells around (1, 1) include `#` at (0, 1), (1, 0) and (2, 2). The cell itself is skipped. A list of strings works as a 2D grid because strings can be indexed too.' },

  { id: 'L9-17', lec: 9, topic: '2D arrays', d: 2, type: 'out',
    t: 'Flattening with a comprehension',
    code: `
      M = [[1, 2], [3], [4, 5, 6]]
      print([x for row in M for x in row if x % 2])`,
    ans: '[1, 3, 5]',
    exp: 'Outer `for row`, inner `for x in row`, then the filter keeps the odd values.' },

  { id: 'L9-18', lec: 9, topic: 'Matrices', d: 3, type: 'fib',
    t: 'Rotate 90° clockwise',
    q: 'Complete `rotate`, which rotates a matrix 90° clockwise, e.g. `rotate([[1, 2], [3, 4]])` is `[[3, 1], [4, 2]]`.',
    code: `
      def rotate(M):
          R, C = len(M), len(M[0])
          return [[M[{{1}}][c] for r in range(R)]
                  for c in range(C)]`,
    blanks: [['R - 1 - r', 'R - r - 1', '-1 - r', '-r - 1', 'len(M) - 1 - r']],
    test: 'assert rotate([[1, 2], [3, 4]]) == [[3, 1], [4, 2]]\nassert rotate([[1, 2, 3], [4, 5, 6]]) == [[4, 1], [5, 2], [6, 3]]',
    exp: 'New row `c` is old column `c` read from the **bottom** up, so the row index runs `R-1, R-2, …, 0`.' },

  { id: 'L9-19', lec: 9, topic: '3D arrays', d: 2, type: 'out',
    t: 'A 3D array',
    code: `
      cube = [[[i * 4 + j * 2 + k for k in range(2)]
               for j in range(2)]
              for i in range(2)]
      print(cube[1][0][1])`,
    ans: '5',
    exp: 'Indices i = 1, j = 0, k = 1 give 1·4 + 0·2 + 1 = 5.' },

  { id: 'L9-20', lec: 9, topic: 'Submatrices', d: 3, type: 'fib',
    t: 'Minor matrix',
    q: 'Complete `minor(M, r, c)`, which returns `M` without row `r` and column `c`.',
    code: `
      def minor(M, r, c):
          S = []
          for i in range(len(M)):
              if i != r:
                  S.append({{1}})
          return S`,
    blanks: [['M[i][:c] + M[i][c + 1:]', 'M[i][:c] + M[i][c+1:]']],
    test: 'M = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]\nassert minor(M, 1, 1) == [[0, 2], [6, 8]]\nassert minor(M, 0, 2) == [[3, 4], [6, 7]]\nassert M == [[0, 1, 2], [3, 4, 5], [6, 7, 8]]',
    exp: 'For every row except `r`, join the part before column `c` to the part after it. Slicing makes new lists, so `M` is not changed.' },

  { id: 'L9-21', lec: 9, topic: 'Grids', d: 3, type: 'out',
    t: 'Walking a grid diagonally',
    code: `
      M = [[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]]
      print([M[i][j] for i in range(3)
             for j in range(3) if i + j == 2])`,
    ans: '[3, 5, 7]',
    exp: 'The cells where `i + j == 2` form the anti-diagonal: (0,2), (1,1) and (2,0).' },

  { id: 'L9-22', lec: 9, topic: 'Matrices', d: 1, type: 'fib',
    t: 'Diagonal difference',
    q: 'Complete `diag_diff(M)` for a square matrix: the absolute difference between the sums of its two diagonals.',
    code: `
      def diag_diff(M):
          n = len(M)
          d1 = sum(M[i][i] for i in range(n))
          d2 = sum({{1}} for i in range(n))
          return abs(d1 - d2)`,
    blanks: [['M[i][n - 1 - i]', 'M[i][n - i - 1]', 'M[i][-1 - i]', 'M[i][-i - 1]', 'M[n - 1 - i][i]']],
    test: 'assert diag_diff([[11, 2, 4], [4, 5, 6], [10, 8, -12]]) == 15\nassert diag_diff([[1]]) == 0',
    exp: 'On the anti-diagonal, the column runs backwards as the row goes forwards: column `n - 1 - i` in row `i`. Here (11 + 5 − 12) − (4 + 5 + 10) = 4 − 19, so the answer is 15.' },

  { id: 'L9-23', lec: 9, topic: '2D arrays', d: 2, type: 'fib',
    t: 'Border of a matrix',
    q: 'Complete `border(M)`, which lists the elements on the outer edge of `M` row by row, e.g. a 3×3 matrix numbered 1–9 gives `[1, 2, 3, 4, 6, 7, 8, 9]`.',
    code: `
      def border(M):
          R, C = len(M), len(M[0])
          return [M[r][c] for r in range(R) for c in range(C)
                  if {{1}}]`,
    blanks: [['r == 0 or r == R - 1 or c == 0 or c == C - 1', 'r in (0, R - 1) or c in (0, C - 1)',
              'c == 0 or c == C - 1 or r == 0 or r == R - 1', 'not (0 < r < R - 1 and 0 < c < C - 1)']],
    test: 'assert border([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [1, 2, 3, 4, 6, 7, 8, 9]\nassert border([[1, 2], [3, 4]]) == [1, 2, 3, 4]\nassert border([[5]]) == [5]',
    exp: 'A cell is on the border if its row is the first or last row, **or** its column is the first or last column.' },

  { id: 'L9-24', lec: 9, topic: 'Matrices', d: 1, type: 'fib',
    t: 'Mirror a matrix left to right',
    q: 'Complete `mirror(M)`, which returns a new matrix with each row reversed and leaves `M` unchanged.',
    code: `
      def mirror(M):
          return [{{1}} for row in M]`,
    blanks: [['row[::-1]', 'list(reversed(row))']],
    test: 'M = [[1, 2, 3], [4, 5, 6]]\nassert mirror(M) == [[3, 2, 1], [6, 5, 4]]\nassert M == [[1, 2, 3], [4, 5, 6]]',
    exp: 'Slicing makes a reversed **copy** of each row. `row.reverse()` would mutate `M` and return `None`.' },

  { id: 'L9-25', lec: 9, topic: 'Grids', d: 3, type: 'fib',
    t: 'Sum of in-bounds neighbours',
    q: 'Complete `neighbours(M, r, c)`, which sums the up to 8 cells around `(r, c)` that lie inside the grid.',
    code: `
      def neighbours(M, r, c):
          total = 0
          for dr in (-1, 0, 1):
              for dc in (-1, 0, 1):
                  rr, cc = r + dr, c + dc
                  if (dr, dc) != (0, 0) and {{1}}:
                      total += M[rr][cc]
          return total`,
    blanks: [['0 <= rr < len(M) and 0 <= cc < len(M[0])', '0 <= cc < len(M[0]) and 0 <= rr < len(M)',
              'rr >= 0 and rr < len(M) and cc >= 0 and cc < len(M[0])']],
    test: 'M = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nassert neighbours(M, 1, 1) == 40\nassert neighbours(M, 0, 0) == 11\nassert neighbours(M, 2, 2) == 19',
    exp: 'Both indices must be checked against **both** ends. A negative index would not crash in Python: `M[-1]` silently reads the last row, which is exactly the bug the `0 <=` checks prevent.' },

  { id: 'L9-26', lec: 9, topic: 'Creating 2D arrays', d: 2, type: 'fib',
    t: 'Fill a matrix column by column',
    q: '`to_cols(A, R, C)` builds an R×C matrix by filling **columns** first, e.g. `to_cols([1, 2, 3, 4, 5, 6], 2, 3)` is `[[1, 3, 5], [2, 4, 6]]`. Complete the index.',
    code: `
      def to_cols(A, R, C):
          return [[A[{{1}}] for c in range(C)]
                  for r in range(R)]`,
    blanks: [['c * R + r', 'r + c * R', 'R * c + r', 'r + R * c']],
    test: 'assert to_cols([1, 2, 3, 4, 5, 6], 2, 3) == [[1, 3, 5], [2, 4, 6]]\nassert to_cols([1, 2, 3, 4, 5, 6], 3, 2) == [[1, 4], [2, 5], [3, 6]]',
    exp: 'Column `c` starts at `A[c * R]`, because each earlier column used R elements. Row `r` within that column is `r` further on. Compare row-major order, where it is `r * C + c`.' },

  { id: 'L9-27', lec: 9, topic: 'Matrices', d: 2, type: 'fib',
    t: 'Is it the identity matrix?',
    q: 'Complete `is_identity(M)` for a square matrix.',
    code: `
      def is_identity(M):
          n = len(M)
          for r in range(n):
              for c in range(n):
                  if M[r][c] != {{1}}:
                      return False
          return True`,
    blanks: [['(1 if r == c else 0)', 'int(r == c)', '(r == c)']],
    test: 'assert is_identity([[1, 0], [0, 1]]) and is_identity([[1]])\nassert not is_identity([[1, 0], [1, 1]]) and not is_identity([[0, 0], [0, 1]])',
    exp: 'Diagonal cells must be 1 and all others 0. The parentheses matter: `M[r][c] != 1 if r == c else 0` parses as `(M[r][c] != 1) if r == c else 0`, which never fails off the diagonal.' },

  { id: 'L9-28', lec: 9, topic: 'Matrices', d: 2, type: 'fib',
    t: 'Is it symmetric?',
    q: 'Complete the range of the inner loop of `is_symmetric(M)`. Several answers work; the most efficient checks each pair only once.',
    code: `
      def is_symmetric(M):
          n = len(M)
          for r in range(n):
              for c in range({{1}}):
                  if M[r][c] != M[c][r]:
                      return False
          return True`,
    blanks: [['r', 'r + 1', 'n', 'len(M)']],
    test: 'assert is_symmetric([[1, 2], [2, 3]]) and is_symmetric([[4]])\nassert not is_symmetric([[1, 2], [3, 1]])',
    exp: '`range(r)` compares only the cells below the diagonal with their mirror images above it: each pair once, and the diagonal is skipped since it always matches itself. `range(n)` is also correct, just twice the work.' },

  { id: 'L9-29', lec: 9, topic: 'Grids', d: 3, type: 'fib',
    t: 'Paths through a grid with walls',
    q: '`count_paths(G)` counts paths from the top-left to the bottom-right cell of a grid of strings, moving only right or down and never entering `#`. Complete the table update.',
    code: `
      def count_paths(G):
          R, C = len(G), len(G[0])
          W = [[0] * C for r in range(R)]
          for r in range(R):
              for c in range(C):
                  if G[r][c] == '#':
                      W[r][c] = 0
                  elif r == 0 and c == 0:
                      W[r][c] = 1
                  else:
                      up = W[r - 1][c] if r > 0 else 0
                      left = W[r][c - 1] if c > 0 else 0
                      W[r][c] = {{1}}
          return W[R - 1][C - 1]`,
    blanks: [['up + left', 'left + up']],
    test: "assert count_paths(['...', '.#.', '...']) == 2\nassert count_paths(['..', '..']) == 2\nassert count_paths(['.#', '#.']) == 0",
    exp: 'Every path into a cell arrives from above or from the left, so its count is the sum of theirs. Filling the table row by row means those two cells are always computed first. This is the loop version of memoised grid-path recursion.' },

  { id: 'L9-30', lec: 9, topic: 'Matrices', d: 1, type: 'out',
    t: 'Transpose by comprehension',
    code: `
      M = [[1, 2, 3], [4, 5, 6]]
      T = [[M[r][c] for r in range(2)]
           for c in range(3)]
      print(T[2], len(T))`,
    ans: '[3, 6] 3',
    exp: 'The outer loop runs over the 3 columns, so `T` has 3 rows. Row 2 of `T` is column 2 of `M`.' },

  { id: 'L9-31', lec: 9, topic: 'Creating 2D arrays', d: 3, type: 'out',
    t: 'Copied rows versus repeated rows',
    code: `
      row = [0, 0]
      G = [row[:] for _ in range(2)]
      G[0][0] = 5
      H = [row] * 2
      H[1][1] = 7
      print(G, H)`,
    ans: '[[5, 0], [0, 0]] [[0, 7], [0, 7]]',
    exp: '`row[:]` gives each row of `G` its own copy, so only `G[0]` changes. `[row] * 2` repeats the **same** list, so `H[1][1] = 7` changes `row` itself, which is both rows of `H`.' },

  { id: 'L9-32', lec: 9, topic: 'Grids', d: 2, type: 'out',
    t: 'Counting cells off the diagonal',
    code: `
      G = ['#.#',
           '.#.',
           '#.#']
      print(sum(1 for r in range(3) for c in range(3)
                if G[r][c] == '#' and r != c))`,
    ans: '2',
    exp: 'There are five `#` cells. Three of them lie on the main diagonal (r == c), leaving (0, 2) and (2, 0).' },

  { id: 'L9-33', lec: 9, topic: 'Copying 2D arrays', d: 2, type: 'mcq', run: true, optCode: true,
    t: 'Replacing a row versus changing a cell',
    q: 'What is printed?',
    code: `
      A = [[1, 2], [3, 4]]
      B = A[:]
      B[0] = [9, 9]
      B[1][0] = 8
      print(A)`,
    opts: ['[[1, 2], [8, 4]]', '[[9, 9], [8, 4]]', '[[1, 2], [3, 4]]', '[[9, 9], [3, 4]]'],
    ans: 0,
    exp: '`A[:]` copies only the outer list. Replacing `B[0]` affects `B` alone, but `B[1]` is still the same row object as `A[1]`, so changing one of its cells shows in `A`.' }
]);
