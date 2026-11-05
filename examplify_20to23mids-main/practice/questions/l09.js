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
    exp: 'The cells where `i + j == 2` form the anti-diagonal: (0,2), (1,1) and (2,0).' }
]);
