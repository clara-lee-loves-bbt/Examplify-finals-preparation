/* Lecture 9 — Multi-dimensional arrays: lists as arrays, constant-time
   operations, 2D arrays, matrices, list-comprehension construction */
practice([
  { id: 'L9-01', lec: 9, topic: '2D arrays', d: 1, type: 'out',
    t: 'Rows, columns and an element',
    code: `
      table = [[1, 2, 3, 4],
               [5, 6, 7, 8],
               [9, 10, 11, 12]]
      print(table[2][1], len(table), len(table[0]))` },

  { id: 'L9-02', lec: 9, topic: 'Creating 2D arrays', d: 2, type: 'mcq', optCode: true,
    t: 'The [[0] * c] * r trap',
    q: 'What is printed?',
    code: `
      m = [[0] * 3] * 2
      m[1][2] = 7
      print(m)` },

  { id: 'L9-04', lec: 9, topic: 'Creating 2D arrays', d: 1, type: 'out',
    t: 'Row-major numbering',
    code: `
      M = [[r * 3 + c for c in range(3)]
           for r in range(2)]
      print(M)` },

  { id: 'L9-06', lec: 9, topic: 'Matrices', d: 2, type: 'fib',
    t: 'Transpose with comprehensions',
    q: 'Complete `transpose`, e.g. `transpose([[1, 2, 3], [4, 5, 6]])` is `[[1, 4], [2, 5], [3, 6]]`.',
    code: `
      def transpose(M):
          R, C = len(M), len(M[0])
          return [[{{1}} for r in range(R)]
                  for c in range(C)]` },

  { id: 'L9-07', lec: 9, topic: 'Creating 2D arrays', d: 1, type: 'fib',
    t: 'zero_matrix with a loop',
    q: 'Complete `zero_matrix(rows, cols)` with one statement. Every row must be a **separate** list.',
    code: `
      def zero_matrix(rows, cols):
          M = []
          for r in range(rows):
              {{1}}
          return M` },

  { id: 'L9-08', lec: 9, topic: 'Matrices', d: 1, type: 'fib',
    t: 'Matrix addition',
    q: 'Complete `mat_add`, which adds two matrices of the same size.',
    code: `
      def mat_add(A, B):
          return [[{{1}} for c in range(len(A[0]))]
                  for r in range(len(A))]` },

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
          return M` },

  { id: 'L9-10', lec: 9, topic: 'Submatrices', d: 2, type: 'out',
    t: 'Submatrix by slicing',
    code: `
      M = [[0, 1, 2, 3],
           [4, 5, 6, 7],
           [8, 9, 10, 11]]
      print([row[1:3] for row in M[1:]])` },

  { id: 'L9-11', lec: 9, topic: 'Matrices', d: 2, type: 'out',
    t: 'Diagonal and anti-diagonal',
    code: `
      M = [[2, 0, 1],
           [3, 5, 4],
           [7, 6, 9]]
      n = len(M)
      d1 = sum(M[i][i] for i in range(n))
      d2 = sum(M[i][n - 1 - i] for i in range(n))
      print(d1, d2)` },

  { id: 'L9-12', lec: 9, topic: 'Copying 2D arrays', d: 2, type: 'mcq',
    t: 'Shallow versus row-by-row copy',
    q: 'What is printed?',
    code: `
      A = [[1, 2], [3, 4]]
      B = A.copy()
      C = [row.copy() for row in A]
      A[0][0] = 9
      print(B[0][0], C[0][0])` },

  { id: 'L9-13', lec: 9, topic: 'Array efficiency', d: 1, type: 'mcq', optCode: true,
    t: 'Which operation is not constant-time?',
    q: 'For a Python list `A` used as an array, which operation does **not** run in constant time?' },

  { id: 'L9-15', lec: 9, topic: '2D arrays', d: 2, type: 'fib',
    t: 'Column sums',
    q: 'Complete `col_sums`, e.g. `col_sums([[1, 2], [3, 4], [5, 6]])` is `[9, 12]`.',
    code: `
      def col_sums(M):
          return [sum({{1}} for r in range(len(M)))
                  for c in range(len(M[0]))]` },

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
      print(n)` },

  { id: 'L9-17', lec: 9, topic: '2D arrays', d: 2, type: 'out',
    t: 'Flattening with a comprehension',
    code: `
      M = [[1, 2], [3], [4, 5, 6]]
      print([x for row in M for x in row if x % 2])` },

  { id: 'L9-18', lec: 9, topic: 'Matrices', d: 3, type: 'fib',
    t: 'Rotate 90° clockwise',
    q: 'Complete `rotate`, which rotates a matrix 90° clockwise, e.g. `rotate([[1, 2], [3, 4]])` is `[[3, 1], [4, 2]]`.',
    code: `
      def rotate(M):
          R, C = len(M), len(M[0])
          return [[M[{{1}}][c] for r in range(R)]
                  for c in range(C)]` },

  { id: 'L9-19', lec: 9, topic: '3D arrays', d: 2, type: 'out',
    t: 'A 3D array',
    code: `
      cube = [[[i * 4 + j * 2 + k for k in range(2)]
               for j in range(2)]
              for i in range(2)]
      print(cube[1][0][1])` },

  { id: 'L9-20', lec: 9, topic: 'Submatrices', d: 3, type: 'fib',
    t: 'Minor matrix',
    q: 'Complete `minor(M, r, c)`, which returns `M` without row `r` and column `c`.',
    code: `
      def minor(M, r, c):
          S = []
          for i in range(len(M)):
              if i != r:
                  S.append({{1}})
          return S` },

  { id: 'L9-21', lec: 9, topic: 'Grids', d: 3, type: 'out',
    t: 'Walking a grid diagonally',
    code: `
      M = [[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]]
      print([M[i][j] for i in range(3)
             for j in range(3) if i + j == 2])` },

  { id: 'L9-22', lec: 9, topic: 'Matrices', d: 1, type: 'fib',
    t: 'Diagonal difference',
    q: 'Complete `diag_diff(M)` for a square matrix: the absolute difference between the sums of its two diagonals.',
    code: `
      def diag_diff(M):
          n = len(M)
          d1 = sum(M[i][i] for i in range(n))
          d2 = sum({{1}} for i in range(n))
          return abs(d1 - d2)` },

  { id: 'L9-23', lec: 9, topic: '2D arrays', d: 2, type: 'fib',
    t: 'Border of a matrix',
    q: 'Complete `border(M)`, which lists the elements on the outer edge of `M` row by row, e.g. a 3×3 matrix numbered 1–9 gives `[1, 2, 3, 4, 6, 7, 8, 9]`.',
    code: `
      def border(M):
          R, C = len(M), len(M[0])
          return [M[r][c] for r in range(R) for c in range(C)
                  if {{1}}]` },

  { id: 'L9-24', lec: 9, topic: 'Matrices', d: 1, type: 'fib',
    t: 'Mirror a matrix left to right',
    q: 'Complete `mirror(M)`, which returns a new matrix with each row reversed and leaves `M` unchanged.',
    code: `
      def mirror(M):
          return [{{1}} for row in M]` },

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
          return total` },

  { id: 'L9-26', lec: 9, topic: 'Creating 2D arrays', d: 2, type: 'fib',
    t: 'Fill a matrix column by column',
    q: '`to_cols(A, R, C)` builds an R×C matrix by filling **columns** first, e.g. `to_cols([1, 2, 3, 4, 5, 6], 2, 3)` is `[[1, 3, 5], [2, 4, 6]]`. Complete the index.',
    code: `
      def to_cols(A, R, C):
          return [[A[{{1}}] for c in range(C)]
                  for r in range(R)]` },

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
          return True` },

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
          return True` },

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
          return W[R - 1][C - 1]` },

  { id: 'L9-30', lec: 9, topic: 'Matrices', d: 1, type: 'out',
    t: 'Transpose by comprehension',
    code: `
      M = [[1, 2, 3], [4, 5, 6]]
      T = [[M[r][c] for r in range(2)]
           for c in range(3)]
      print(T[2], len(T))` },

  { id: 'L9-31', lec: 9, topic: 'Creating 2D arrays', d: 3, type: 'out',
    t: 'Copied rows versus repeated rows',
    code: `
      row = [0, 0]
      G = [row[:] for _ in range(2)]
      G[0][0] = 5
      H = [row] * 2
      H[1][1] = 7
      print(G, H)` },

  { id: 'L9-32', lec: 9, topic: 'Grids', d: 2, type: 'out',
    t: 'Counting cells off the diagonal',
    code: `
      G = ['#.#',
           '.#.',
           '#.#']
      print(sum(1 for r in range(3) for c in range(3)
                if G[r][c] == '#' and r != c))` },

  { id: 'L9-33', lec: 9, topic: 'Copying 2D arrays', d: 2, type: 'mcq', optCode: true,
    t: 'Replacing a row versus changing a cell',
    q: 'What is printed?',
    code: `
      A = [[1, 2], [3, 4]]
      B = A[:]
      B[0] = [9, 9]
      B[1][0] = 8
      print(A)` }
]);
