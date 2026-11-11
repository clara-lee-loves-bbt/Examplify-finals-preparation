/* Tutorial 10 — Multi-dimensional arrays
   Converted from AY26/27S1 Week 10 Tutorial Worksheet, Q1–Q4. */
tutorial([
  {
    id: 'T10-01', src: 'T10', topic: 'Transpose', d: 2, type: 'fib',
    t: 'transpose with nested loops',
    q: 'Complete `transpose(M)` using nested loops. Do not use a list comprehension inside the loop body.',
    code: `
      def transpose(M):
          Mrows = len(M)
          Mcols = len(M[0])
          T = [[0] * Mrows for r in range(Mcols)]
          for mrow in range(Mrows):
              for mcol in range(Mcols):
                  {{1}}
          return T`,
    blanks: [['T[mcol][mrow] = M[mrow][mcol]']],
    test: `
      assert transpose([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]]
      assert transpose([[1]]) == [[1]]
      assert transpose([[1, 2], [3, 4], [5, 6]]) == [[1, 3, 5], [2, 4, 6]]`,
    exp: 'Row `mrow` of `M` becomes column `mrow` of `T`. The destination row is the old column and the destination column is the old row, hence `T[mcol][mrow] = M[mrow][mcol]`.'
  },
  {
    id: 'T10-02', src: 'T10', topic: 'Transpose', d: 3, type: 'fib',
    t: 'transpose as a comprehension',
    q: 'Complete `transpose(M)` so that `T` is built in one nested list comprehension.',
    code: `
      def transpose(M):
          Mrows = len(M)
          Mcols = len(M[0])
          T = {{1}}
          return T`,
    blanks: [['[[M[tcol][trow] for tcol in range(Mrows)] for trow in range(Mcols)]']],
    test: `
      assert transpose([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]]
      assert transpose([[1]]) == [[1]]`,
    exp: 'The outer loop runs over the **columns** of `M`, because each of them becomes a row of `T`. The inner loop walks down that column of `M`.'
  },
  {
    id: 'T10-03', src: 'T10', topic: 'Matrix multiplication', d: 3, type: 'fib',
    t: 'mat_mult with comprehensions',
    q: 'Complete `M = A × B` using list comprehensions and `sum`. Assume the shapes are compatible.',
    code: `
      def mat_mult(A, B):
          Arows = len(A)
          Acols = len(A[0])
          Bcols = len(B[0])
          M = {{1}}
          return M`,
    blanks: [['[[sum([A[mrow][k] * B[k][mcol] for k in range(Acols)]) for mcol in range(Bcols)] for mrow in range(Arows)]']],
    test: `
      A = [[1, 2, 3], [4, 5, 6]]
      B = [[1, 4], [2, 5], [3, 6]]
      assert mat_mult(A, B) == [[14, 32], [32, 77]]`,
    exp: 'Entry `(mrow, mcol)` is the dot product of row `mrow` of `A` with column `mcol` of `B`. The inner comprehension builds that sum, the middle one fills a row, and the outer one fills the matrix.'
  },
  {
    id: 'T10-04', src: 'T10', topic: 'Slicing matrices', d: 2, type: 'fib',
    t: 'minor_mat',
    q: 'Complete `minor_mat(M, r, c)`, which removes row `r` and column `c`. Use list slicing, concatenation and `.append()`.',
    code: `
      def minor_mat(M, r, c):
          S = []
          for row in {{1}}:
              S.append({{2}})
          return S`,
    blanks: [['M[:r] + M[r + 1:]'], ['row[:c] + row[c + 1:]']],
    test: `
      M = [[0, 1, 2, 3, 4, 5],
           [6, 7, 8, 9, 10, 11],
           [12, 13, 14, 15, 16, 17],
           [18, 19, 20, 21, 22, 23]]
      assert minor_mat(M, 2, 1) == [[0, 2, 3, 4, 5], [6, 8, 9, 10, 11], [18, 20, 21, 22, 23]]
      assert minor_mat([[1, 2], [3, 4]], 0, 1) == [[3]]`,
    exp: 'Skip row `r` by concatenating the rows above it with the rows below it. Inside every surviving row, skip column `c` the same way with slices.'
  },
  {
    id: 'T10-05', src: 'T10', topic: 'Submatrices', d: 3, type: 'fib',
    t: 'submat_sums',
    q: 'Complete `submat_sums(M, srows, scols)`. Each result cell is the sum of one non-overlapping `srows × scols` block.',
    code: `
      def submat_sums(M, srows, scols):
          Mrows = len(M)
          Mcols = len(M[0])
          Trows = Mrows // srows
          Tcols = Mcols // scols
          T = [[0] * Tcols for r in range(Trows)]
          for mrow in range(Mrows):
              for mcol in range(Mcols):
                  {{1}}
          return T`,
    blanks: [['T[mrow // srows][mcol // scols] += M[mrow][mcol]']],
    test: `
      M = [[0, 1, 2, 3, 4, 5],
           [6, 7, 8, 9, 10, 11],
           [12, 13, 14, 15, 16, 17],
           [18, 19, 20, 21, 22, 23]]
      assert submat_sums(M, 2, 3) == [[24, 42], [96, 114]]`,
    exp: 'Integer division maps a source cell to its block: rows `0–1` go to result row 0 and rows `2–3` to row 1, with columns behaving the same way. Every source cell is added to exactly one result cell.'
  },
  {
    id: 'T10-06', src: 'T10', topic: 'Aliasing', d: 2, type: 'mcq',
    t: 'Repeating a row with *',
    q: 'What is printed?',
    code: `
      T = [[0] * 2] * 2
      T[0][0] = 1
      print(T)`,
    opts: ['[[1, 0], [1, 0]]', '[[1, 0], [0, 0]]', '[[0, 0], [1, 0]]', 'TypeError'],
    ans: 0,
    exp: '`[[0] * 2] * 2` repeats the **same** inner list twice, so both rows are one object. Changing `T[0][0]` is visible through `T[1]` too. Build rows with a comprehension to get independent lists.'
  },
  {
    id: 'T10-07', src: 'T10', topic: 'Dimensions', d: 1, type: 'mcq',
    t: 'Rows and columns',
    q: 'What is printed?',
    code: `
      M = [[1, 2], [3, 4], [5, 6]]
      print(len(M), len(M[0]))`,
    opts: ['3 2', '2 3', '3 3', '6 2'],
    ans: 0,
    exp: '`len(M)` counts the rows (3) and `len(M[0])` counts the columns in the first row (2). The matrix is 3 × 2.'
  },
  {
    id: 'T10-08', src: 'T10', topic: 'Slicing matrices', d: 1, type: 'mcq',
    t: 'A small minor matrix',
    q: 'What is returned?',
    code: `
      print(minor_mat([[1, 2], [3, 4]], 0, 1))`,
    opts: ['[[3]]', '[[4]]', '[[1]]', '[[2]]'],
    ans: 0,
    exp: 'Removing row 0 (the `[1, 2]` row) leaves `[3, 4]`, and removing column 1 from it leaves `[3]`. The result is a 1 × 1 matrix, `[[3]]`.'
  },
  {
    id: 'T10-09', src: 'T10', topic: 'Transpose', d: 1, type: 'mcq',
    t: 'Shape after transposing',
    q: 'A matrix `M` has 2 rows and 3 columns. What shape is `transpose(M)`?',
    opts: ['3 rows and 2 columns', '2 rows and 3 columns', '3 rows and 3 columns', '2 rows and 2 columns'],
    ans: 0,
    exp: 'Transposing swaps rows and columns, so an `R × C` matrix becomes `C × R`. Here 2 × 3 becomes 3 × 2.'
  }
]);
