/* Assignment 5 — 2D arrays: Game of Life (FITB)
   Converted from Assignment 5 Tasks 1A–1G. Every item is fill-in-the-blank. */
tutorial([
  {
    id: 'A5-01', src: 'A5', topic: '2D arrays', d: 1, type: 'fib',
    t: 'build_society',
    q: 'Complete `build_society(m, n)` so it returns `m` rows of `n` random cells, each either `"-"` or `"*"`.',
    code: `
      import random

      def build_society(m, n):
          society = []
          for r in range(m):
              row = []
              for c in range(n):
                  row.append({{1}})
              {{2}}
          return society`,
    blanks: [["random.choice(['-', '*'])", "random.choice(['*', '-'])"], ['society.append(row)']],
    test: `
      random.seed(7)
      s = build_society(3, 4)
      assert len(s) == 3
      assert all(len(row) == 4 for row in s)
      assert all(ch in '-*' for row in s for ch in row)
      assert build_society(1, 1) in [[['-']], [['*']]]`,
    exp: 'Build one row at a time, choosing a random character for every cell. Append each finished row to the society, otherwise the inner loop\'s work is thrown away.'
  },
  {
    id: 'A5-02', src: 'A5', topic: 'Strings to 2D arrays', d: 2, type: 'fib',
    t: 'model_society',
    q: 'Complete `model_society(txt)`, which turns a pasted multi-line drawing into a list of lists of `"-"` and `"*"`. Blank lines and spaces are ignored.',
    code: `
      def model_society(txt):
          society = []
          for line in txt.split('\\n'):
              if {{1}}:
                  row = []
                  for ch in line:
                      if {{2}}:
                          row.append(ch)
                  {{3}}
          return society`,
    blanks: [["line.strip() != ''"], ["ch in '-*'"], ['society.append(row)']],
    test: `
      txt = "\\n-***-\\n----*\\n****-\\n"
      result = model_society(txt)
      assert result == [['-', '*', '*', '*', '-'], ['-', '-', '-', '-', '*'], ['*', '*', '*', '*', '-']]
      assert model_society("") == []`,
    exp: 'Split the drawing into lines, skip blank ones, keep only the cell characters in each line, and append the finished row. That reproduces the society that was printed.'
  },
  {
    id: 'A5-03', src: 'A5', topic: 'Rules as functions', d: 2, type: 'fib',
    t: 'gol — Conway\'s rules',
    q: 'Complete `gol(cell_value, live_neigh)`. A live cell survives with 2 or 3 live neighbours; a dead cell becomes alive with exactly 3.',
    code: `
      def gol(cell_value, live_neigh):
          if cell_value:
              return {{1}}
          else:
              return {{2}}`,
    blanks: [['live_neigh == 2 or live_neigh == 3'], ['live_neigh == 3']],
    test: `
      live = [gol(True, n) for n in range(9)]
      dead = [gol(False, n) for n in range(9)]
      assert live == [False, False, True, True, False, False, False, False, False]
      assert dead == [False, False, False, True, False, False, False, False, False]`,
    exp: 'Two neighbours is the minimum for a live cell to survive, and more than three is overcrowding. A dead cell is born only with exactly three live neighbours.'
  },
  {
    id: 'A5-04', src: 'A5', topic: 'Rules as functions', d: 2, type: 'fib',
    t: 'tabulate — the rule table',
    q: 'Complete `tabulate(rules)`. It returns `[("live", [...9 results...]), ("dead", [...9 results...])]` for neighbour counts 0–8.',
    code: `
      def tabulate(rules):
          live = []
          dead = []
          for n in range(9):
              live.append({{1}})
              dead.append({{2}})
          return [{{3}}, {{4}}]`,
    blanks: [["'live' if rules(True, n) else 'dead'"], ["'live' if rules(False, n) else 'dead'"], ["('live', live)"], ["('dead', dead)"]],
    test: `
      def gol(cv, n):
          return (n == 2 or n == 3) if cv else n == 3
      assert tabulate(gol) == [
          ('live', ['dead', 'dead', 'live', 'live', 'dead', 'dead', 'dead', 'dead', 'dead']),
          ('dead', ['dead', 'dead', 'dead', 'live', 'dead', 'dead', 'dead', 'dead', 'dead'])
      ]
      inverse = tabulate(lambda cv, n: not gol(cv, n))
      assert inverse[0][0] == 'live' and inverse[1][0] == 'dead'
      assert inverse[0][1][0] == 'live' and inverse[0][1][2] == 'dead'`,
    exp: 'Call the rule function once per neighbour count for a live current cell and once for a dead one. The list for each row keeps the nine results in neighbour-count order, and the pairs are returned live-cell row first.'
  },
  {
    id: 'A5-05', src: 'A5', topic: 'Stable sorting', d: 2, type: 'fib',
    t: 'migrate — sort rows by census',
    q: 'Complete `migrate(society)`. Count the live cells in each row, sort the rows by that count descending, and keep equal-count rows in their original order. Do not change the input.',
    code: `
      def migrate(society):
          census = []
          for row in society:
              census.append(({{1}}, row))
          census.sort(key={{2}}, reverse=True)
          result = []
          for _, row in census:
              {{3}}
          return result`,
    blanks: [["row.count('*')"], ['lambda pair: pair[0]'], ['result.append(row)']],
    test: `
      soc = [['-', '*', '-', '*', '-'],
             ['*', '-', '-', '*', '*'],
             ['-', '*', '*', '*', '*'],
             ['*', '-', '-', '-', '-'],
             ['-', '*', '*', '-', '-'],
             ['-', '-', '*', '-', '*']]
      res = migrate(soc)
      assert [row.count('*') for row in res] == [4, 3, 2, 2, 2, 1]
      assert res[0] == ['-', '*', '*', '*', '*']
      assert res[2] == ['-', '*', '-', '*', '-']
      assert res[3] == ['-', '*', '*', '-', '-']
      assert res[4] == ['-', '-', '*', '-', '*']
      assert soc[0] == ['-', '*', '-', '*', '-']`,
    exp: 'Pair each row with its census, then sort by the census only. Python\'s sort is stable, so rows with equal counts stay in their original relative order. Building a new list leaves the input untouched.'
  },
  {
    id: 'A5-06', src: 'A5', topic: 'Neighbourhoods', d: 3, type: 'fib',
    t: 'destiny — one cell\'s next state',
    q: 'Complete `destiny(society, coordinates, gol)`. Count the live cells in the eight neighbouring positions (ignoring the cell itself and anything off the grid), then apply `gol`.',
    code: `
      def destiny(society, coordinates, gol):
          r, c = coordinates
          live = 0
          for dr in (-1, 0, 1):
              for dc in (-1, 0, 1):
                  if {{1}}:
                      nr, nc = r + dr, c + dc
                      if 0 <= nr < len(society) and 0 <= nc < len(society[0]):
                          if {{2}}:
                              live += 1
          return {{3}}`,
    blanks: [['not (dr == 0 and dc == 0)'], ["society[nr][nc] == '*'"], ["'*' if gol(society[r][c] == '*', live) else '-'"]],
    test: `
      def gol(cv, n):
          return (n == 2 or n == 3) if cv else n == 3
      soc = [['*', '*', '-'],
             ['*', '-', '-'],
             ['-', '-', '-']]
      assert destiny(soc, (0, 0), gol) == '*'
      assert destiny(soc, (2, 2), gol) == '-'
      assert destiny(soc, (1, 1), gol) == '*'`,
    exp: 'The offsets `dr, dc` in {-1, 0, 1} visit all nine positions; skip the (0, 0) offset so the cell does not count itself. Bounds checks ignore neighbours outside the society. Convert the cell to a Boolean for `gol` and back to a character for the result.'
  },
  {
    id: 'A5-07', src: 'A5', topic: 'Evolution', d: 3, type: 'fib',
    t: 'evolve — stop at stability',
    q: 'Complete `evolve(society, n, gol)`. It returns the resulting society and the number of evolutions needed to reach it, stopping early when a generation is identical to the one before.',
    code: `
      def evolve(society, n, gol):
          count = 0
          for i in range(n):
              new = []
              for r in range(len(society)):
                  row = []
                  for c in range(len(society[0])):
                      row.append(destiny(society, (r, c), gol))
                  new.append(row)
              if {{1}}:
                  return society, count
              society = new
              count += 1
          return society, count`,
    blanks: [['new == society']],
    test: `
      def gol(cv, n):
          return (n == 2 or n == 3) if cv else n == 3

      def destiny(society, coordinates, gol):
          r, c = coordinates
          live = 0
          for dr in (-1, 0, 1):
              for dc in (-1, 0, 1):
                  if not (dr == 0 and dc == 0):
                      nr, nc = r + dr, c + dc
                      if 0 <= nr < len(society) and 0 <= nc < len(society[0]):
                          if society[nr][nc] == '*':
                              live += 1
          return '*' if gol(society[r][c] == '*', live) else '-'

      assert evolve([['-']], 1000, gol) == ([['-']], 0)
      soc = [['-', '-', '*'], ['*', '*', '-']]
      result, count = evolve(soc, 5, gol)
      assert result == [['-', '-', '-'], ['-', '-', '-']]
      assert count == 2
      assert soc == [['-', '-', '*'], ['*', '*', '-']]`,
    exp: 'Build the whole next generation from the current one before comparing, so every cell sees the same old society. If the new generation equals the current one, stability has been reached and no further evolutions count. Returning `society` here is the stable generation itself.'
  }
]);
