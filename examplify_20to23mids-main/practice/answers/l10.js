/* Lecture 10 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L10-01': {
    trap: 'bsearch-trace',
    ans: '13, 20, 26',
    wrong: [
      { a: '13, 19, 26', trap: 'bsearch-trace', why: 'After 13, low = 6 and high = 10, so mid = 8, which holds 20.' },
      { a: '10, 20, 26', trap: 'bsearch-trace', why: 'The first mid is (0 + 10) // 2 = 5, which holds 13.' },
      { a: '13, 26', trap: 'bsearch-trace', why: 'Binary search only looks at the middle each step; it cannot jump straight to 26.' }],
    verify: `
      seen = []
      def bs(L, val):
          low, high = 0, len(L) - 1
          while low <= high:
              mid = (low + high) // 2
              seen.append(L[mid])
              if L[mid] == val:
                  return True
              elif val < L[mid]:
                  high = mid - 1
              else:
                  low = mid + 1
          return False
      assert bs(L, 26)
      assert seen == [13, 20, 26], seen`,
    exp: 'low=0, high=10 → mid=5 (13), so go right. low=6 → mid=8 (20), go right. low=9 → mid=9 (26), found.' },

  'L10-02': {
    trap: 'bsearch-trace',
    verifyOnly: true,
    ans: '3',
    wrong: [
      { a: '4', trap: 'bsearch-trace', why: 'mid is 5, then 2, then 0; then high = -1 < low and the loop stops: three passes.' },
      { a: '11', trap: 'complexity', why: 'That is linear search. Binary search halves the range every pass.' }],
    verify: `
      L = [2, 5, 6, 8, 10, 13, 14, 19, 20, 26, 29]
      it = [0]
      def binary_search(L, val):
          low, high = 0, len(L) - 1
          while low <= high:
              it[0] += 1
              mid = (low + high) // 2
              if L[mid] == val:
                  return True
              elif val < L[mid]:
                  high = mid - 1
              else:
                  low = mid + 1
          return False
      assert not binary_search(L, 1)
      assert it[0] == 3, it[0]`,
    exp: 'mid=5 (13), then high=4 → mid=2 (6), then high=1 → mid=0 (2), then high=-1. Now low > high, so the loop stops after 3 iterations and the function returns False.' },

  'L10-03': {
    trap: 'bsearch-sorted',
    ans: 'It must be sorted',
    wrong: [
      { a: 'It must have an odd length', trap: 'bsearch-sorted', why: 'Any length works; `//` picks a middle either way. What matters is the order.' },
      { a: 'It must contain distinct integers only', trap: 'bsearch-sorted', why: 'Duplicates and non-integers are fine as long as the list is sorted.' },
      { a: 'It must be shorter than 1000 elements', trap: 'bsearch-sorted', why: 'Binary search is fastest on big lists; size is no limit.' }],
    exp: 'Discarding half of the list relies on everything to the left of `mid` being smaller and everything to the right being larger, which is only true when the list is sorted.' },

  'L10-04': {
    trap: 'complexity',
    ans: '10',
    wrong: [
      { a: '20', trap: 'complexity', why: 'Each guess halves the range, and 2¹⁰ = 1024 ≥ 1000, so 10 guesses suffice.' },
      { a: '100', trap: 'complexity', why: 'Halving 1000 reaches 1 after about log₂ 1000 ≈ 10 steps.' },
      { a: '500', trap: 'complexity', why: 'That is half of N. Binary search needs about log₂ N guesses.' }],
    verify: `
      def probes(n, secret):
          low, high, k = 1, n, 0
          while low <= high:
              mid = (low + high) // 2
              k += 1
              if mid == secret:
                  return k
              elif secret < mid:
                  high = mid - 1
              else:
                  low = mid + 1
      assert max(probes(1000, s) for s in range(1, 1001)) == 10`,
    exp: 'Each guess halves the range, and 2¹⁰ = 1024 ≥ 1000, so about log₂ N = 10 guesses are enough.' },

  'L10-05': {
    trap: 'range-stop',
    ans: '[7, 9, 5] [1, 3]',
    wrong: [
      { a: '[7, 9] [1, 3, 5]', trap: 'range-stop', mut: 'range-stop:0' },
      { a: '[7, 9, 5] [3]', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: '[7, 3, 9, 5] [1]', trap: 'off-by-one', mut: 'index-off:1' }],
    exp: 'Pass 1 moves 1 into the result, and pass 2 moves 3. `remove` deletes those values but keeps the order of the rest.' },

  'L10-06': {
    trap: 'range-zero',
    ans: '[10, 13, 14, 37, 29]',
    wrong: [
      { a: '[29, 10, 13, 37, 14]', trap: 'range-zero', mut: 'range-zero:0' },
      { a: '[10, 29, 14, 37, 13]', trap: 'off-by-one', mut: 'index-off:1' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:1' }],
    exp: 'i=0: the smallest is 10 at index 1, so swap: `[10, 29, 14, 37, 13]`. i=1: the smallest of the rest is 13 at index 4, so swap with 29: `[10, 13, 14, 37, 29]`.' },

  'L10-07': {
    trap: 'off-by-one',
    blanks: [['i + 1', 'i'], ['L[i], L[m] = L[m], L[i]', 'L[m], L[i] = L[i], L[m]']],
    wrong: [
      { b: 1, a: 'i + 2', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      for L in ([5, 2, 9, 1, 5, 6], [], [1], [3, 2, 1]):
          want = sorted(L)
          selection_sort(L)
          assert L == want`,
    exp: 'Look for the smallest element in the unsorted part, `i+1 … end` (starting at `i` also works), then swap it into position `i`.' },

  'L10-08': {
    trap: 'wrong-var',
    blanks: [['A[i:] + B[j:]', 'B[j:] + A[i:]']],
    wrong: [
      { b: 1, a: 'A[i:]', trap: 'wrong-var', why: 'Only one list has items left, but either could be the one: add both leftovers.' },
      { b: 1, a: 'A[i] + B[j]', trap: 'index-error', why: 'One of the two indexes is past the end, so indexing raises `IndexError`.' }],
    test: `
      assert merge([2, 4, 5], [3, 7, 8]) == [2, 3, 4, 5, 7, 8]
      assert merge([], [1]) == [1]
      assert merge([1, 9], []) == [1, 9]`,
    exp: 'When the loop ends, one list is used up and the other still has its largest values, already sorted. Adding both leftovers works because one of them is empty.' },

  'L10-09': {
    trap: 'rec-trace',
    blanks: [['merge_sort(L[:mid])', 'merge_sort(L[0:mid])'], ['merge_sort(L[mid:])', 'merge_sort(L[mid:len(L)])']],
    wrong: [
      { b: 1, a: 'L[:mid]', trap: 'rec-trace', why: 'The halves must be **sorted** before merging: `merge_sort(L[:mid])`.' },
      { b: 1, a: 'merge_sort(L[:mid + 1])', trap: 'slice-stop', mut: 'slice-stop:0' }],
    test: `
      def merge(A, B):
          res, i, j = [], 0, 0
          while i < len(A) and j < len(B):
              if A[i] < B[j]:
                  res.append(A[i]); i += 1
              else:
                  res.append(B[j]); j += 1
          return res + A[i:] + B[j:]
      assert merge_sort([38, 16, 27, 39, 12, 27]) == [12, 16, 27, 27, 38, 39]
      assert merge_sort([]) == []`,
    exp: 'Divide and conquer: sort each half recursively, then merge the two sorted halves.' },

  'L10-10': {
    trap: 'complexity',
    ans: 'Merge sort — O(N log N)',
    wrong: [
      { a: 'Binary search — O(N)', trap: 'complexity', why: 'Binary search halves the range each step: O(log N).' },
      { a: 'Selection sort — O(N log N)', trap: 'complexity', why: 'Selection sort scans the rest of the list for every position: O(N²).' },
      { a: 'Linear search — O(log N)', trap: 'complexity', why: 'Linear search may check every element: O(N).' }],
    exp: 'Linear search is O(N), binary search O(log N), selection sort O(N²) and merge sort O(N log N).' },

  'L10-11': {
    trap: 'complexity',
    ans: 'Each slice copies up to half the list, which costs time proportional to its length',
    wrong: [
      { a: 'Slicing makes the list unsorted', trap: 'complexity', why: 'A slice of a sorted list is still sorted; the cost is the copying.' },
      { a: 'Recursion is always slower than O(log N)', trap: 'complexity', why: 'The recursive version with index bounds is O(log N); recursion is not the problem.' },
      { a: 'It compares every element with val', trap: 'complexity', why: 'It still compares one element per level; the copying is what costs time.' }],
    exp: 'The number of halving steps is still log N, but each slice copies N/2, N/4, … elements, which adds up to O(N). Passing `low` and `high` indices avoids the copying.' },

  'L10-12': {
    trap: 'rec-trace',
    ans: '5',
    wrong: [
      { a: '6', trap: 'rec-trace', why: 'Every merge joins two pieces into one: going from 6 pieces to 1 takes 5 merges.' },
      { a: '3', trap: 'rec-trace', why: 'Merges happen inside every recursive call, not once per level: 6 pieces → 1 needs 5.' }],
    verify: `
      n = [0]
      def merge(A, B):
          n[0] += 1
          return sorted(A + B)
      merge_sort([38, 16, 27, 39, 12, 27])
      assert n[0] == 5, n[0]`,
    exp: 'Every merge joins two pieces into one. Going from 6 single-element pieces down to 1 list therefore takes 6 − 1 = 5 merges.' },

  'L10-13': {
    trap: 'return-in-loop',
    ans: '5 3',
    wrong: [
      { a: '5 0', trap: 'state-trace', why: 'count is returned even when val is missing; then it equals len(L).' },
      { a: '1 1', trap: 'return-in-loop', mut: 'return-in-loop:0' }],
    exp: '7 is the 5th element. A value that is not there needs a comparison with every element.' },

  'L10-14': {
    trap: 'boundary',
    ans: '2 1',
    wrong: [
      { a: '1 1', trap: 'boundary', mut: 'boundary:0' },
      { a: '1 0', trap: 'off-by-one', mut: 'index-off:2' },
      { a: 'TypeError', trap: 'true-div', mut: 'true-div:0' }],
    exp: 'mid=2 (5): go left, high=1. mid=0 (1): go right, low=1. mid=1 (3): go right, low=2. Now low > high. `low` ends at the position where 4 would be inserted.' },

  'L10-15': {
    trap: 'complexity',
    ans: 'About N²/2, the same as for any input',
    wrong: [
      { a: 'About N, because it notices the list is sorted', trap: 'complexity', why: 'Selection sort never checks whether the list is sorted; it still scans the whole unsorted part each pass.' },
      { a: 'About log N', trap: 'complexity', why: 'Every pass scans the rest of the list: (N - 1) + (N - 2) + ... ≈ N²/2.' },
      { a: 'None', trap: 'complexity', why: 'The comparison `L[j] < L[m]` runs for every j, sorted input or not.' }],
    verify: `
      c = [0]
      def ss(L):
          for i in range(len(L) - 1):
              m = i
              for j in range(i + 1, len(L)):
                  c[0] += 1
                  if L[j] < L[m]:
                      m = j
              L[i], L[m] = L[m], L[i]
      ss(list(range(100)))
      assert c[0] == 100 * 99 // 2`,
    exp: 'The two loops always run in full: (N−1) + (N−2) + … + 1 = N(N−1)/2 comparisons. Selection sort cannot finish early, so it is O(N²) for every input.' },

  'L10-16': {
    trap: 'pop-end',
    ans: '[] [7, 8]',
    wrong: [
      { a: '[4, 6] []', trap: 'pop-end', mut: 'pop-end:1' },
      { a: '[] [2, 3, 7, 8]', trap: 'pop-end', mut: 'pop-end:0' },
      { a: '[1, 4, 6] [7, 8]', trap: 'pass-by-ref', mut: 'pass-by-ref:0' }],
    exp: 'This version **mutates** its arguments. `pop(0)` empties A completely and takes 2 and 3 from B. `extend` copies the leftovers into the result but does not remove them from B.' },

  'L10-17': {
    trap: 'off-by-one',
    blanks: [['search(low, mid - 1)'], ['search(mid + 1, high)']],
    wrong: [
      { b: 1, a: 'search(low, mid)', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'search(low, mid - 2)', trap: 'off-by-one', mut: 'index-off:0' },
      { b: 2, a: 'search(mid + 2, high)', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      L = [2, 5, 6, 8, 10, 13, 14, 19, 20, 26, 29]
      assert all(binary_search(L, v) for v in L)
      assert not any(binary_search(L, v) for v in (0, 7, 30))
      assert not binary_search([], 1)`,
    exp: 'If `val` is smaller, it can only be to the left of `mid`, otherwise to the right. `mid` itself has already been checked, so leave it out.' },

  'L10-18': {
    trap: 'bsearch-trace',
    ans: 'Replace `low = mid + 1` with `low = mid`',
    wrong: [
      { a: 'Replace `while low <= high` with `while low < high`', trap: 'bsearch-trace', why: 'With `<` the loop can stop one step early and miss a value, but it always ends.' },
      { a: 'Compute `mid = (low + high + 1) // 2` instead', trap: 'bsearch-trace', why: 'Rounding mid up still moves low or high past mid, so the range keeps shrinking.' },
      { a: 'Test `val > L[mid]` before `val < L[mid]`', trap: 'bsearch-trace', why: 'The order of the tests does not change which half is thrown away.' }],
    exp: 'With `low = mid`, once `low == mid` (e.g. L = [1, 2], val = 2: mid = 0, low stays 0) the range never shrinks. The other changes can give wrong answers but always make progress, so they terminate.' },

  'L10-19': {
    trap: 'rec-trace',
    ans: 'merge([16], [27])',
    wrong: [
      { a: 'merge([38], [16])', trap: 'rec-trace', why: '[38, 16, 27] splits into [38] and [16, 27]; the part [16, 27] must be merged first.' },
      { a: 'merge([38, 16, 27], [39, 12, 27])', trap: 'rec-trace', why: 'The top-level merge is the **last** one, after both halves are sorted (and its arguments are sorted halves).' },
      { a: 'merge([39], [12])', trap: 'rec-trace', why: 'The whole left half is sorted before the right half is touched.' }],
    verify: `
      calls = []
      def merge(A, B):
          calls.append((A, B))
          return sorted(A + B)
      def merge_sort(L):
          if len(L) < 2:
              return L.copy()
          mid = len(L) // 2
          return merge(merge_sort(L[:mid]), merge_sort(L[mid:]))
      merge_sort([38, 16, 27, 39, 12, 27])
      assert calls[0] == ([16], [27]), calls`,
    exp: 'The left half `[38, 16, 27]` is sorted first. Its `mid` is 3 // 2 = 1, so it splits into `[38]` and `[16, 27]`. `[38]` is returned straight away, and `[16, 27]` splits into `[16]` and `[27]`, the first pair to be merged. Watch out: `[38]` and `[16]` are never siblings.' },

  'L10-20': {
    trap: 'return-in-loop',
    ans: '3 1 2 -1',
    wrong: [
      { a: '3 -1', trap: 'return-in-loop', mut: 'return-in-loop:0' },
      { a: '3 1 -1', trap: 'boundary', mut: 'boundary:0' },
      { a: '2 4 3 -1', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'mid = 3 (15): 13 is smaller, so high = 2. mid = 1 (8): larger, so low = 2. mid = 2 (12): larger, so low = 3 > high. The search fails and returns −1.' },

  'L10-21': {
    trap: 'pass-by-ref',
    ans: '[2, 4, 5, 9, 1]',
    wrong: [
      { a: '[2, 5, 9, 4, 1]', trap: 'pass-by-ref', mut: 'pass-by-ref:0' },
      { a: '[2, 4, 5, 4, 1]', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '`x = 4`. The 9 and the 5 are larger, so each shifts one place right. The 2 is not, so 4 drops into index 1. Elements after index 3 are untouched.' },

  'L10-22': {
    trap: 'boundary',
    blanks: [['j >= 0 and L[j] > x', 'j > -1 and L[j] > x', 'j >= 0 and x < L[j]'], ['L[j + 1] = x']],
    wrong: [
      { b: 1, a: 'j > 0 and L[j] > x', trap: 'boundary', mut: 'boundary:0' },
      { b: 2, a: 'L[j] = x', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 2, a: 'L[j + 2] = x', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      for L in ([5, 2, 9, 1, 5, 6], [], [1], [3, 2, 1], [1, 2, 3]):
          want = sorted(L)
          insertion_sort(L)
          assert L == want, L`,
    exp: 'Shift larger elements right until you reach the front (`j >= 0`) or find one that is not larger than `x`, then drop `x` into the gap. The bounds check must come **first**, so short-circuiting stops `L[-1]` from being read.' },

  'L10-23': {
    trap: 'off-by-one',
    ans: '[1, 4, 2, 5, 8]',
    wrong: [
      { a: '[5, 1, 4, 2, 8]', trap: 'off-by-one', mut: 'index-off:3' },
      { a: 'IndexError', trap: 'range-stop', mut: 'range-stop:0' }],
    exp: 'Each neighbouring pair is swapped if it is out of order: (5, 1) swap, (5, 4) swap, (5, 2) swap, (5, 8) stay. After one pass the largest value is guaranteed to be at the end.' },

  'L10-24': {
    trap: 'acc-reset',
    ans: '4',
    wrong: [
      { a: '0', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: '2', trap: 'range-zero', mut: 'range-zero:0' },
      { a: '3', trap: 'off-by-one', mut: 'index-off:9' }],
    exp: 'Each swap fixes exactly one out-of-order pair. The out-of-order pairs (inversions) are (4,1), (4,3), (4,2) and (3,2), so 4 swaps.' },

  'L10-25': {
    trap: 'off-by-one',
    blanks: [['[A[0]] + merge(A[1:], B)', 'A[:1] + merge(A[1:], B)'], ['[B[0]] + merge(A, B[1:])', 'B[:1] + merge(A, B[1:])']],
    wrong: [
      { b: 1, a: '[A[1]] + merge(A[1:], B)', trap: 'off-by-one', mut: 'index-off:0' },
      { b: 1, a: '[A[0]] + merge(A[2:], B)', trap: 'off-by-one', mut: 'index-off:2' },
      { b: 2, a: '[B[1]] + merge(A, B[1:])', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert merge([2, 4, 5], [3, 7, 8]) == [2, 3, 4, 5, 7, 8]
      assert merge([], [1, 2]) == [1, 2]
      assert merge([1, 1], [1]) == [1, 1, 1]`,
    exp: 'The smaller of the two front elements comes first. Remove it from its list and merge what is left. When either list is empty, the other is the answer.' },

  'L10-26': {
    trap: 'append-extend',
    blanks: [['out.append(A[i])', 'out += [A[i]]', 'out = out + [A[i]]']],
    wrong: [
      { b: 1, a: 'out.extend(A[i])', trap: 'append-extend', mut: 'append-extend:0' }],
    test: `
      assert diff([1, 3, 5, 7], [3, 4, 7]) == [1, 5]
      assert diff([1, 2], []) == [1, 2]
      assert diff([], [1]) == []`,
    exp: 'Skip past the smaller elements of `B`. If `B[j]` equals `A[i]`, drop `A[i]`. Otherwise `A[i]` cannot be in `B`, so keep it. Each list is scanned only once: O(N + M).' },

  'L10-27': {
    trap: 'complexity',
    ans: 'O(N log N)',
    wrong: [
      { a: 'O(N²)', trap: 'complexity', why: 'The inner loop doubles j, so it runs about log N times, not N.' },
      { a: 'O(N)', trap: 'complexity', why: 'Each of the N outer passes runs the log N inner loop.' },
      { a: 'O(log N)', trap: 'complexity', why: 'The outer loop runs N times around the log N inner loop.' }],
    verify: `
      assert f(list(range(1024))) == 1024 * 10
      assert f(list(range(2048))) == 2048 * 11`,
    exp: 'The outer loop runs N times. The inner loop doubles `j` each time, so it runs about log₂ N times. N × log N.' },

  'L10-28': {
    trap: 'str-compare',
    run: true,
    ans: '[\'Fig\', \'apple\', \'kiwi\', \'pear\'] Fig',
    wrong: [
      { a: '[\'apple\', \'Fig\', \'kiwi\', \'pear\'] apple', trap: 'str-compare', why: 'Uppercase letters come before lowercase, so \'Fig\' < \'apple\'.' },
      { a: '[\'apple\', \'Fig\', \'kiwi\', \'pear\'] Fig', trap: 'str-compare', why: '`.sort()` uses the same order as `min`, so \'Fig\' comes first.' },
      { a: '[\'Fig\', \'apple\', \'kiwi\', \'pear\'] apple', trap: 'str-compare', why: '`min` uses the same order as `.sort()`: \'Fig\' is the smallest.' }],
    exp: 'Strings sort by character codes, and every uppercase letter comes before every lowercase one, so `.sort()` puts `Fig` first and `min` also picks `Fig`.' },

  'L10-29': {
    trap: 'boundary',
    ans: '1 4 5',
    wrong: [
      { a: '1 4 4', trap: 'boundary', mut: 'boundary:0' },
      { a: '3 4 5', trap: 'boundary', mut: 'boundary:1' },
      { a: '2 4 6', trap: 'off-by-one', mut: 'index-off:2' }],
    exp: 'This returns the first index whose value is ≥ v, i.e. where v would be inserted to keep L sorted. That is index 1 for 3 (the first 3), index 4 for 6 (before the 8), and index 5 for 9 (past the end).' },

  'L10-30': {
    trap: 'off-by-one',
    blanks: [['hi = mid - 1', 'hi = mid-1']],
    wrong: [
      { b: 1, a: 'hi = mid', trap: 'off-by-one', mut: 'index-off:1' },
      { b: 1, a: 'hi = mid - 2', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert first_index([1, 2, 2, 2, 3], 2) == 1
      assert first_index([1, 3], 2) == -1
      assert first_index([5, 5, 5, 5], 5) == 0
      assert first_index([], 1) == -1`,
    exp: 'Record the match, but keep searching **left**, since an earlier copy may exist. Returning straight away would give whichever copy `mid` happened to land on.' },

  'L10-31': {
    trap: 'state-trace',
    blanks: [['swapped = True']],
    wrong: [
      { b: 1, a: 'swapped = False', trap: 'state-trace', why: 'The flag must record that a swap happened, so the while loop runs again.' },
      { b: 1, a: 'return', trap: 'return-in-loop', why: 'Returning after the first swap leaves the list unsorted.' }],
    test: `
      for L in ([5, 1, 4, 2, 8], [], [1], [2, 1], [1, 2, 3]):
          want = sorted(L)
          bubble(L)
          assert L == want`,
    exp: 'A pass with no swaps proves the list is sorted. On already-sorted input this makes bubble sort O(N), unlike selection sort, which is always O(N²).' },

  'L10-32': {
    trap: 'wrong-var',
    blanks: [['i += 1', 'i = i + 1'], ['j -= 1', 'j = j - 1']],
    wrong: [
      { b: 1, a: 'j -= 1', trap: 'wrong-var', why: 'The sum is too small, so move the **left** pointer right to a bigger number.' },
      { b: 1, a: 'i -= 1', trap: 'wrong-var', why: 'Moving i left makes the sum smaller still.' }],
    test: `
      assert has_pair([1, 2, 4, 7, 11], 9)
      assert not has_pair([1, 2, 4, 7, 11], 10)
      assert not has_pair([5], 10)
      assert has_pair([3, 3], 6)`,
    exp: 'If the sum is too small, the only way to increase it is to move the left pointer to a bigger value. If it is too big, move the right pointer down. Each step discards one element for good.' },

  'L10-33': {
    trap: 'rec-trace',
    blanks: [['[m] + ssort(rest)']],
    wrong: [
      { b: 1, a: 'ssort(rest)', trap: 'rec-trace', why: 'Drops m: the smallest element must go in front.' },
      { b: 1, a: 'ssort(rest) + [m]', trap: 'rec-trace', why: 'Each smallest element ends up at the back, so the result comes out in descending order.' }],
    test: `
      L = [4, 5, 1, 3, 1]
      assert ssort(L) == [1, 1, 3, 4, 5]
      assert L == [4, 5, 1, 3, 1]
      assert ssort([]) == []`,
    exp: 'The smallest element comes first, followed by the sorted rest. Working on a copy keeps the caller\'s list unchanged.' },

  'L10-34': {
    trap: 'off-by-one',
    blanks: [['not out or out[-1] != x', 'out == [] or out[-1] != x', 'len(out) == 0 or out[-1] != x', 'x not in out']],
    wrong: [
      { b: 1, a: 'not out or out[-2] != x', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert union([1, 3, 3, 5], [2, 3, 6]) == [1, 2, 3, 5, 6]
      assert union([], [1, 1]) == [1]
      assert union([], []) == []`,
    exp: 'The values arrive in sorted order, so a duplicate can only be equal to the **last** value appended. Checking `out[-1]` is O(1), while `x not in out` also works but scans the whole list each time. The `not out` part guards against indexing an empty list.' },

  'L10-35': {
    trap: 'off-by-one',
    blanks: [['data[j][1] > data[m][1]', 'data[m][1] < data[j][1]']],
    wrong: [
      { b: 1, a: 'data[j][2] > data[m][1]', trap: 'off-by-one', mut: 'index-off:0' }],
    test: `
      assert sort_by_mark((('A', 70), ('B', 90), ('C', 80))) == [('B', 90), ('C', 80), ('A', 70)]
      assert sort_by_mark(()) == []`,
    exp: 'Compare the marks (index 1 of each pair), and select the **largest** remaining one each round to get descending order.' },

  'L10-36': {
    trap: 'last-index',
    ans: '4 2',
    wrong: [
      { a: '4 3', trap: 'last-index', mut: 'last-index:0' },
      { a: 'TypeError', trap: 'true-div', mut: 'true-div:0' }],
    exp: 'Strings compare alphabetically, so binary search works on a sorted list of words too. mid = 2 (`cat` < `eel`), so go right: lo = 3, mid = 4 is `eel`, found in 2 steps.' },

  'L10-37': {
    trap: 'acc-reset',
    ans: '[1, 2, 3] 2',
    wrong: [
      { a: '[1, 2, 3] 1', trap: 'acc-reset', mut: 'acc-reset:0' },
      { a: '[3, 1, 2] 0', trap: 'range-zero', mut: 'range-zero:0' },
      { a: '[1, 3, 2] 1', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: 'i = 0: the smallest is 1, so swap to get `[1, 3, 2]`. i = 1: the smallest of the rest is 2, so swap to get `[1, 2, 3]`. Two swaps, each with `m != i`.' },

  'L10-38': {
    trap: 'complexity',
    ans: 'O(len(A) × len(B))',
    wrong: [
      { a: 'O(len(A) + len(B))', trap: 'complexity', why: '`x in B` scans B for **each** x in A, so the costs multiply.' },
      { a: 'O(len(A) × log len(B))', trap: 'complexity', why: '`in` on a list is a linear search; it does not use binary search.' },
      { a: 'O(len(A))', trap: 'complexity', why: '`in B` is not constant time for a list: it may check every element of B.' }],
    exp: '`x in B` on a list is a linear search, O(len(B)), and it runs once for every element of A. Turning B into a dictionary (or set) makes each lookup about constant time.' },

  'L10-39': {
    trap: 'boundary',
    ans: '2 2 3 5',
    wrong: [
      { a: '3 5', trap: 'boundary', mut: 'boundary:0' },
      { a: 'TypeError', trap: 'true-div', mut: 'true-div:0' }],
    exp: '[5, 1] merges first (size 2). Then the right half [4, 2, 3] splits into [4] and [2, 3]; [2, 3] merges (2), then [4] joins it (3). Finally the two halves merge (5).' }
});
