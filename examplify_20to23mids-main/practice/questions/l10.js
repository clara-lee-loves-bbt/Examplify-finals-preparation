/* Lecture 10 — Searching and sorting: linear search, binary search,
   selection sort, merge / merge sort, time complexity */
practice([
  { id: 'L10-01', lec: 10, topic: 'Binary search', d: 2, type: 'mcq',
    t: 'Tracing binary search',
    q: 'The loop version of `binary_search` searches for `26`. Which values of `L[mid]` does it compare against, in order?',
    code: `
      L = [2, 5, 6, 8, 10, 13, 14, 19, 20, 26, 29]

      def binary_search(L, val):
          low, high = 0, len(L) - 1
          while low <= high:
              mid = (low + high) // 2
              if L[mid] == val:
                  return True
              elif val < L[mid]:
                  high = mid - 1
              else:
                  low = mid + 1
          return False`,
    opts: ['13, 20, 26', '13, 19, 26', '10, 20, 26', '13, 26'],
    ans: 0,
    verify: 'seen = []\ndef bs(L, val):\n    low, high = 0, len(L) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        seen.append(L[mid])\n        if L[mid] == val:\n            return True\n        elif val < L[mid]:\n            high = mid - 1\n        else:\n            low = mid + 1\n    return False\nassert bs(L, 26)\nassert seen == [13, 20, 26], seen',
    exp: 'low=0, high=10 → mid=5 (13), so go right. low=6 → mid=8 (20), go right. low=9 → mid=9 (26), found.' },

  { id: 'L10-02', lec: 10, topic: 'Binary search', d: 2, type: 'out',
    t: 'Counting binary search steps',
    q: 'Using the same `binary_search` as before, how many times does the `while` loop body run when searching for `1` (which is not in the list)? Type a number.',
    code: `
      L = [2, 5, 6, 8, 10, 13, 14, 19, 20, 26, 29]
      binary_search(L, 1)`,
    ans: '3',
    verifyOnly: true,
    verify: 'L = [2, 5, 6, 8, 10, 13, 14, 19, 20, 26, 29]\nit = [0]\ndef binary_search(L, val):\n    low, high = 0, len(L) - 1\n    while low <= high:\n        it[0] += 1\n        mid = (low + high) // 2\n        if L[mid] == val:\n            return True\n        elif val < L[mid]:\n            high = mid - 1\n        else:\n            low = mid + 1\n    return False\nassert not binary_search(L, 1)\nassert it[0] == 3, it[0]',
    exp: 'mid=5 (13), then high=4 → mid=2 (6), then high=1 → mid=0 (2), then high=-1. Now low > high, so the loop stops after 3 iterations and the function returns False.' },

  { id: 'L10-03', lec: 10, topic: 'Binary search', d: 1, type: 'mcq',
    t: 'Requirement for binary search',
    q: 'What must be true about the list for binary search to work correctly?',
    opts: ['It must be sorted', 'It must have an odd length', 'It must contain distinct integers only', 'It must be shorter than 1000 elements'],
    ans: 0,
    exp: 'Discarding half of the list relies on everything to the left of `mid` being smaller and everything to the right being larger, which is only true when the list is sorted.' },

  { id: 'L10-04', lec: 10, topic: 'Binary search', d: 2, type: 'mcq',
    t: 'Guessing a number from 1 to 1000',
    q: 'Using the halving strategy, what is the **maximum** number of guesses needed to find a secret integer in [1, 1000]?',
    opts: ['10', '20', '100', '500'],
    ans: 0,
    verify: 'def probes(n, secret):\n    low, high, k = 1, n, 0\n    while low <= high:\n        mid = (low + high) // 2\n        k += 1\n        if mid == secret:\n            return k\n        elif secret < mid:\n            high = mid - 1\n        else:\n            low = mid + 1\nassert max(probes(1000, s) for s in range(1, 1001)) == 10',
    exp: 'Each guess halves the range, and 2¹⁰ = 1024 ≥ 1000, so about log₂ N = 10 guesses are enough.' },

  { id: 'L10-05', lec: 10, topic: 'Selection sort', d: 2, type: 'out',
    t: 'Selection sort (not in place), after 2 passes',
    code: `
      L = [7, 3, 9, 1, 5]
      Lcopy = L.copy()
      result = []
      for _ in range(2):
          smallest = min(Lcopy)
          Lcopy.remove(smallest)
          result.append(smallest)
      print(Lcopy, result)`,
    ans: '[7, 9, 5] [1, 3]',
    exp: 'Pass 1 moves 1 into the result, and pass 2 moves 3. `remove` deletes those values but keeps the order of the rest.' },

  { id: 'L10-06', lec: 10, topic: 'Selection sort', d: 2, type: 'out',
    t: 'In-place selection sort, after 2 passes',
    code: `
      L = [29, 10, 14, 37, 13]
      for i in range(2):
          m = i
          for j in range(i + 1, len(L)):
              if L[j] < L[m]:
                  m = j
          L[i], L[m] = L[m], L[i]
      print(L)`,
    ans: '[10, 13, 14, 37, 29]',
    exp: 'i=0: the smallest is 10 at index 1, so swap: `[10, 29, 14, 37, 13]`. i=1: the smallest of the rest is 13 at index 4, so swap with 29: `[10, 13, 14, 37, 29]`.' },

  { id: 'L10-07', lec: 10, topic: 'Selection sort', d: 2, type: 'fib',
    t: 'In-place selection sort',
    q: 'Complete the in-place selection sort.',
    code: `
      def selection_sort(L):
          for i in range(len(L) - 1):
              m = i
              for j in range({{1}}, len(L)):
                  if L[j] < L[m]:
                      m = j
              {{2}}`,
    blanks: [['i + 1', 'i'], ['L[i], L[m] = L[m], L[i]', 'L[m], L[i] = L[i], L[m]']],
    test: 'for L in ([5, 2, 9, 1, 5, 6], [], [1], [3, 2, 1]):\n    want = sorted(L)\n    selection_sort(L)\n    assert L == want',
    exp: 'Look for the smallest element in the unsorted part, `i+1 … end` (starting at `i` also works), then swap it into position `i`.' },

  { id: 'L10-08', lec: 10, topic: 'Merge', d: 2, type: 'fib',
    t: 'Efficient merge',
    q: 'Complete the O(N + M) `merge` of two sorted lists.',
    code: `
      def merge(A, B):
          res, i, j = [], 0, 0
          while i < len(A) and j < len(B):
              if A[i] < B[j]:
                  res.append(A[i])
                  i += 1
              else:
                  res.append(B[j])
                  j += 1
          return res + {{1}}`,
    blanks: [['A[i:] + B[j:]', 'B[j:] + A[i:]']],
    test: 'assert merge([2, 4, 5], [3, 7, 8]) == [2, 3, 4, 5, 7, 8]\nassert merge([], [1]) == [1]\nassert merge([1, 9], []) == [1, 9]',
    exp: 'When the loop ends, one list is used up and the other still has its largest values, already sorted. Adding both leftovers works because one of them is empty.' },

  { id: 'L10-09', lec: 10, topic: 'Merge sort', d: 2, type: 'fib',
    t: 'Merge sort',
    q: 'Complete `merge_sort`. Assume `merge(L1, L2)` combines two sorted lists.',
    code: `
      def merge_sort(L):
          if len(L) < 2:
              return L.copy()
          mid = len(L) // 2
          return merge({{1}}, {{2}})`,
    blanks: [['merge_sort(L[:mid])', 'merge_sort(L[0:mid])'], ['merge_sort(L[mid:])', 'merge_sort(L[mid:len(L)])']],
    test: 'def merge(A, B):\n    res, i, j = [], 0, 0\n    while i < len(A) and j < len(B):\n        if A[i] < B[j]:\n            res.append(A[i]); i += 1\n        else:\n            res.append(B[j]); j += 1\n    return res + A[i:] + B[j:]\nassert merge_sort([38, 16, 27, 39, 12, 27]) == [12, 16, 27, 27, 38, 39]\nassert merge_sort([]) == []',
    exp: 'Divide and conquer: sort each half recursively, then merge the two sorted halves.' },

  { id: 'L10-10', lec: 10, topic: 'Complexity', d: 1, type: 'mcq',
    t: 'Matching time complexities',
    q: 'Which pairing of algorithm and worst-case time is correct?',
    opts: ['Merge sort — O(N log N)', 'Binary search — O(N)', 'Selection sort — O(N log N)', 'Linear search — O(log N)'],
    ans: 0,
    exp: 'Linear search is O(N), binary search O(log N), selection sort O(N²) and merge sort O(N log N).' },

  { id: 'L10-11', lec: 10, topic: 'Binary search', d: 2, type: 'mcq',
    t: 'Why slicing slows binary search down',
    q: 'The first binary search in the lecture recursed on `L[:mid]` or `L[mid+1:]`. Why is it slower than O(log N)?',
    opts: ['Each slice copies up to half the list, which costs time proportional to its length',
           'Slicing makes the list unsorted',
           'Recursion is always slower than O(log N)',
           'It compares every element with val'],
    ans: 0,
    exp: 'The number of halving steps is still log N, but each slice copies N/2, N/4, … elements, which adds up to O(N). Passing `low` and `high` indices avoids the copying.' },

  { id: 'L10-12', lec: 10, topic: 'Merge sort', d: 3, type: 'out',
    t: 'How many merges?',
    q: 'How many times is `merge` called by `merge_sort` on a list of **6** elements? Type a number.',
    code: `
      def merge_sort(L):
          if len(L) < 2:
              return L.copy()
          mid = len(L) // 2
          left = merge_sort(L[:mid])
          right = merge_sort(L[mid:])
          return merge(left, right)`,
    ans: '5',
    verify: 'n = [0]\ndef merge(A, B):\n    n[0] += 1\n    return sorted(A + B)\nmerge_sort([38, 16, 27, 39, 12, 27])\nassert n[0] == 5, n[0]',
    exp: 'Every merge joins two pieces into one. Going from 6 single-element pieces down to 1 list therefore takes 6 − 1 = 5 merges.' },

  { id: 'L10-13', lec: 10, topic: 'Linear search', d: 1, type: 'out',
    t: 'Linear search comparisons',
    code: `
      def linear_search(L, val):
          count = 0
          for x in L:
              count += 1
              if x == val:
                  return count
          return count

      print(linear_search([56, 23, 89, 51, 7, 29], 7),
            linear_search([56, 23, 89], 4))`,
    ans: '5 3',
    exp: '7 is the 5th element. A value that is not there needs a comparison with every element.' },

  { id: 'L10-14', lec: 10, topic: 'Binary search', d: 3, type: 'out',
    t: 'Where low and high end up',
    code: `
      L = [1, 3, 5, 7, 9]
      val = 4
      low, high = 0, len(L) - 1
      found = False
      while low <= high and not found:
          mid = (low + high) // 2
          if L[mid] == val:
              found = True
          elif val < L[mid]:
              high = mid - 1
          else:
              low = mid + 1
      print(low, high)`,
    ans: '2 1',
    exp: 'mid=2 (5): go left, high=1. mid=0 (1): go right, low=1. mid=1 (3): go right, low=2. Now low > high. `low` ends at the position where 4 would be inserted.' },

  { id: 'L10-15', lec: 10, topic: 'Selection sort', d: 2, type: 'mcq',
    t: 'Selection sort on sorted input',
    q: 'In-place selection sort is given a list of N elements that is **already sorted**. Roughly how many comparisons `L[j] < L[m]` does it make?',
    opts: ['About N²/2, the same as for any input', 'About N, because it notices the list is sorted', 'About log N', 'None'],
    ans: 0,
    verify: 'c = [0]\ndef ss(L):\n    for i in range(len(L) - 1):\n        m = i\n        for j in range(i + 1, len(L)):\n            c[0] += 1\n            if L[j] < L[m]:\n                m = j\n        L[i], L[m] = L[m], L[i]\nss(list(range(100)))\nassert c[0] == 100 * 99 // 2',
    exp: 'The two loops always run in full: (N−1) + (N−2) + … + 1 = N(N−1)/2 comparisons. Selection sort cannot finish early, so it is O(N²) for every input.' },

  { id: 'L10-16', lec: 10, topic: 'Merge', d: 3, type: 'out',
    t: 'Side effects of the pop(0) merge',
    code: `
      def merge(L1, L2):
          result = []
          while L1 and L2:
              if L1[0] < L2[0]:
                  result.append(L1.pop(0))
              else:
                  result.append(L2.pop(0))
          result.extend(L1)
          result.extend(L2)
          return result

      A, B = [1, 4, 6], [2, 3, 7, 8]
      R = merge(A, B)
      print(A, B)`,
    ans: '[] [7, 8]',
    exp: 'This version **mutates** its arguments. `pop(0)` empties A completely and takes 2 and 3 from B. `extend` copies the leftovers into the result but does not remove them from B.' },

  { id: 'L10-17', lec: 10, topic: 'Binary search', d: 2, type: 'fib',
    t: 'Recursive binary search',
    q: 'Complete the recursive binary search that passes index bounds instead of slices.',
    code: `
      def binary_search(L, val):
          def search(low, high):
              if low > high:
                  return False
              mid = (low + high) // 2
              if L[mid] == val:
                  return True
              elif val < L[mid]:
                  return {{1}}
              else:
                  return {{2}}
          return search(0, len(L) - 1)`,
    blanks: [['search(low, mid - 1)'], ['search(mid + 1, high)']],
    test: 'L = [2, 5, 6, 8, 10, 13, 14, 19, 20, 26, 29]\nassert all(binary_search(L, v) for v in L)\nassert not any(binary_search(L, v) for v in (0, 7, 30))\nassert not binary_search([], 1)',
    exp: 'If `val` is smaller, it can only be to the left of `mid`, otherwise to the right. `mid` itself has already been checked, so leave it out.' },

  { id: 'L10-18', lec: 10, topic: 'Binary search', d: 3, type: 'mcq',
    t: 'A bug that loops forever',
    q: 'Which single change to the loop version of `binary_search` can make it loop **forever** for some inputs?',
    opts: ['Replace `low = mid + 1` with `low = mid`',
           'Replace `while low <= high` with `while low < high`',
           'Compute `mid = (low + high + 1) // 2` instead',
           'Test `val > L[mid]` before `val < L[mid]`'],
    ans: 0,
    exp: 'With `low = mid`, once `low == mid` (e.g. L = [1, 2], val = 2: mid = 0, low stays 0) the range never shrinks. The other changes can give wrong answers but always make progress, so they terminate.' },

  { id: 'L10-19', lec: 10, topic: 'Merge sort', d: 2, type: 'mcq',
    t: 'Merge sort split order',
    q: 'Merge sort is called on `[38, 16, 27, 39, 12, 27]`. What is the **first** call to `merge`?',
    opts: ['merge([16], [27])', 'merge([38], [16])', 'merge([38, 16, 27], [39, 12, 27])', 'merge([39], [12])'],
    ans: 0,
    verify: 'calls = []\ndef merge(A, B):\n    calls.append((A, B))\n    return sorted(A + B)\ndef merge_sort(L):\n    if len(L) < 2:\n        return L.copy()\n    mid = len(L) // 2\n    return merge(merge_sort(L[:mid]), merge_sort(L[mid:]))\nmerge_sort([38, 16, 27, 39, 12, 27])\nassert calls[0] == ([16], [27]), calls',
    exp: 'The left half `[38, 16, 27]` is sorted first. Its `mid` is 3 // 2 = 1, so it splits into `[38]` and `[16, 27]`. `[38]` is returned straight away, and `[16, 27]` splits into `[16]` and `[27]`, the first pair to be merged. Watch out: `[38]` and `[16]` are never siblings.' },

  { id: 'L10-20', lec: 10, topic: 'Binary search', d: 2, type: 'out',
    t: 'Printing mid during a failed search',
    code: `
      def bsearch(L, val):
          low, high = 0, len(L) - 1
          while low <= high:
              mid = (low + high) // 2
              print(mid, end=' ')
              if L[mid] == val:
                  return mid
              elif val < L[mid]:
                  high = mid - 1
              else:
                  low = mid + 1
          return -1

      print(bsearch([3, 8, 12, 15, 21, 30, 42], 13))`,
    ans: '3 1 2 -1',
    exp: 'mid = 3 (15): 13 is smaller, so high = 2. mid = 1 (8): larger, so low = 2. mid = 2 (12): larger, so low = 3 > high. The search fails and returns −1.' },

  { id: 'L10-21', lec: 10, topic: 'Insertion sort', d: 2, type: 'out',
    t: 'One insertion step',
    code: `
      def insert(L, i):
          x = L[i]
          j = i - 1
          while j >= 0 and L[j] > x:
              L[j + 1] = L[j]
              j -= 1
          L[j + 1] = x

      L = [2, 5, 9, 4, 1]
      insert(L, 3)
      print(L)`,
    ans: '[2, 4, 5, 9, 1]',
    exp: '`x = 4`. The 9 and the 5 are larger, so each shifts one place right. The 2 is not, so 4 drops into index 1. Elements after index 3 are untouched.' },

  { id: 'L10-22', lec: 10, topic: 'Insertion sort', d: 2, type: 'fib',
    t: 'In-place insertion sort',
    q: 'Complete the in-place insertion sort.',
    code: `
      def insertion_sort(L):
          for i in range(1, len(L)):
              x = L[i]
              j = i - 1
              while {{1}}:
                  L[j + 1] = L[j]
                  j -= 1
              {{2}}`,
    blanks: [['j >= 0 and L[j] > x', 'j > -1 and L[j] > x', 'j >= 0 and x < L[j]'], ['L[j + 1] = x']],
    test: 'for L in ([5, 2, 9, 1, 5, 6], [], [1], [3, 2, 1], [1, 2, 3]):\n    want = sorted(L)\n    insertion_sort(L)\n    assert L == want, L',
    exp: 'Shift larger elements right until you reach the front (`j >= 0`) or find one that is not larger than `x`, then drop `x` into the gap. The bounds check must come **first**, so short-circuiting stops `L[-1]` from being read.' },

  { id: 'L10-23', lec: 10, topic: 'Bubble sort', d: 2, type: 'out',
    t: 'One bubble-sort pass',
    code: `
      L = [5, 1, 4, 2, 8]
      for j in range(len(L) - 1):
          if L[j] > L[j + 1]:
              L[j], L[j + 1] = L[j + 1], L[j]
      print(L)`,
    ans: '[1, 4, 2, 5, 8]',
    exp: 'Each neighbouring pair is swapped if it is out of order: (5, 1) swap, (5, 4) swap, (5, 2) swap, (5, 8) stay. After one pass the largest value is guaranteed to be at the end.' },

  { id: 'L10-24', lec: 10, topic: 'Bubble sort', d: 3, type: 'out',
    t: 'Counting bubble-sort swaps',
    code: `
      L = [4, 1, 3, 2]
      swaps = 0
      for i in range(len(L) - 1):
          for j in range(len(L) - 1 - i):
              if L[j] > L[j + 1]:
                  L[j], L[j + 1] = L[j + 1], L[j]
                  swaps += 1
      print(swaps)`,
    ans: '4',
    exp: 'Each swap fixes exactly one out-of-order pair. The out-of-order pairs (inversions) are (4,1), (4,3), (4,2) and (3,2), so 4 swaps.' },

  { id: 'L10-25', lec: 10, topic: 'Merge', d: 2, type: 'fib',
    t: 'Recursive merge',
    q: 'Complete the recursive `merge` of two ascending lists.',
    code: `
      def merge(A, B):
          if not A:
              return B
          if not B:
              return A
          if A[0] <= B[0]:
              return {{1}}
          return {{2}}`,
    blanks: [['[A[0]] + merge(A[1:], B)', 'A[:1] + merge(A[1:], B)'], ['[B[0]] + merge(A, B[1:])', 'B[:1] + merge(A, B[1:])']],
    test: 'assert merge([2, 4, 5], [3, 7, 8]) == [2, 3, 4, 5, 7, 8]\nassert merge([], [1, 2]) == [1, 2]\nassert merge([1, 1], [1]) == [1, 1, 1]',
    exp: 'The smaller of the two front elements comes first. Remove it from its list and merge what is left. When either list is empty, the other is the answer.' },

  { id: 'L10-26', lec: 10, topic: 'Two pointers', d: 3, type: 'fib',
    t: 'Sorted list difference',
    q: '`diff(A, B)` takes two ascending lists and returns the elements of `A` that are not in `B`, in order, e.g. `diff([1, 3, 5, 7], [3, 4, 7])` is `[1, 5]`. Complete it.',
    code: `
      def diff(A, B):
          i, j, out = 0, 0, []
          while i < len(A):
              if j < len(B) and B[j] < A[i]:
                  j += 1
              elif j < len(B) and B[j] == A[i]:
                  i += 1
              else:
                  {{1}}
                  i += 1
          return out`,
    blanks: [['out.append(A[i])', 'out += [A[i]]', 'out = out + [A[i]]']],
    test: 'assert diff([1, 3, 5, 7], [3, 4, 7]) == [1, 5]\nassert diff([1, 2], []) == [1, 2]\nassert diff([], [1]) == []',
    exp: 'Skip past the smaller elements of `B`. If `B[j]` equals `A[i]`, drop `A[i]`. Otherwise `A[i]` cannot be in `B`, so keep it. Each list is scanned only once: O(N + M).' },

  { id: 'L10-27', lec: 10, topic: 'Complexity', d: 3, type: 'mcq',
    t: 'Complexity of a loop that doubles',
    q: 'What is the time complexity of `f` in terms of N = `len(L)`?',
    code: `
      def f(L):
          c = 0
          for i in range(len(L)):
              j = 1
              while j < len(L):
                  c += 1
                  j *= 2
          return c`,
    opts: ['O(N log N)', 'O(N²)', 'O(N)', 'O(log N)'],
    ans: 0,
    verify: 'assert f(list(range(1024))) == 1024 * 10\nassert f(list(range(2048))) == 2048 * 11',
    exp: 'The outer loop runs N times. The inner loop doubles `j` each time, so it runs about log₂ N times. N × log N.' },

  { id: 'L10-28', lec: 10, topic: 'Sorting', d: 2, type: 'mcq', run: true, optCode: true,
    t: 'Sorting mixed-case strings',
    q: 'What is printed?',
    code: `
      words = ['pear', 'Fig', 'apple', 'kiwi']
      print(sorted(words), min(words))`,
    opts: ["['Fig', 'apple', 'kiwi', 'pear'] Fig", "['apple', 'Fig', 'kiwi', 'pear'] apple",
           "['apple', 'Fig', 'kiwi', 'pear'] Fig", "['Fig', 'apple', 'kiwi', 'pear'] apple"],
    ans: 0,
    exp: 'Strings sort by character codes, and every uppercase letter comes before every lowercase one, so `Fig` sorts first and is also the minimum.' },

  { id: 'L10-29', lec: 10, topic: 'Binary search', d: 3, type: 'out',
    t: 'Binary search for an insertion point',
    code: `
      def lower(L, v, lo, hi):
          if lo > hi:
              return lo
          mid = (lo + hi) // 2
          if L[mid] < v:
              return lower(L, v, mid + 1, hi)
          return lower(L, v, lo, mid - 1)

      L = [1, 3, 3, 5, 8]
      print(lower(L, 3, 0, 4), lower(L, 6, 0, 4), lower(L, 9, 0, 4))`,
    ans: '1 4 5',
    exp: 'This returns the first index whose value is ≥ v, i.e. where v would be inserted to keep L sorted. That is index 1 for 3 (the first 3), index 4 for 6 (before the 8), and index 5 for 9 (past the end).' },

  { id: 'L10-30', lec: 10, topic: 'Binary search', d: 3, type: 'fib',
    t: 'First occurrence by binary search',
    q: '`first_index(L, v)` returns the index of the **first** occurrence of `v` in the ascending list `L`, or −1, in O(log N). Complete what happens on a match.',
    code: `
      def first_index(L, v):
          lo, hi, ans = 0, len(L) - 1, -1
          while lo <= hi:
              mid = (lo + hi) // 2
              if L[mid] == v:
                  ans = mid
                  {{1}}
              elif L[mid] < v:
                  lo = mid + 1
              else:
                  hi = mid - 1
          return ans`,
    blanks: [['hi = mid - 1', 'hi = mid-1']],
    test: 'assert first_index([1, 2, 2, 2, 3], 2) == 1\nassert first_index([1, 3], 2) == -1\nassert first_index([5, 5, 5, 5], 5) == 0\nassert first_index([], 1) == -1',
    exp: 'Record the match, but keep searching **left**, since an earlier copy may exist. Returning straight away would give whichever copy `mid` happened to land on.' },

  { id: 'L10-31', lec: 10, topic: 'Bubble sort', d: 2, type: 'fib',
    t: 'Bubble sort that stops early',
    q: 'Complete this bubble sort so it stops as soon as a whole pass makes no swaps.',
    code: `
      def bubble(L):
          swapped = True
          while swapped:
              swapped = False
              for i in range(len(L) - 1):
                  if L[i] > L[i + 1]:
                      L[i], L[i + 1] = L[i + 1], L[i]
                      {{1}}`,
    blanks: [['swapped = True']],
    test: 'for L in ([5, 1, 4, 2, 8], [], [1], [2, 1], [1, 2, 3]):\n    want = sorted(L)\n    bubble(L)\n    assert L == want',
    exp: 'A pass with no swaps proves the list is sorted. On already-sorted input this makes bubble sort O(N), unlike selection sort, which is always O(N²).' },

  { id: 'L10-32', lec: 10, topic: 'Two pointers', d: 2, type: 'fib',
    t: 'Pair with a given sum in a sorted list',
    q: '`has_pair(L, x)` checks whether two different elements of the ascending list `L` add up to `x`, in O(N). Complete the pointer moves.',
    code: `
      def has_pair(L, x):
          i, j = 0, len(L) - 1
          while i < j:
              s = L[i] + L[j]
              if s == x:
                  return True
              elif s < x:
                  {{1}}
              else:
                  {{2}}
          return False`,
    blanks: [['i += 1', 'i = i + 1'], ['j -= 1', 'j = j - 1']],
    test: 'assert has_pair([1, 2, 4, 7, 11], 9)\nassert not has_pair([1, 2, 4, 7, 11], 10)\nassert not has_pair([5], 10)\nassert has_pair([3, 3], 6)',
    exp: 'If the sum is too small, the only way to increase it is to move the left pointer to a bigger value. If it is too big, move the right pointer down. Each step discards one element for good.' },

  { id: 'L10-33', lec: 10, topic: 'Selection sort', d: 2, type: 'fib',
    t: 'Recursive selection sort',
    q: 'Complete this recursive version of the lecture\'s (not in-place) selection sort.',
    code: `
      def ssort(L):
          if not L:
              return []
          m = min(L)
          rest = L.copy()
          rest.remove(m)
          return {{1}}`,
    blanks: [['[m] + ssort(rest)']],
    test: 'L = [4, 5, 1, 3, 1]\nassert ssort(L) == [1, 1, 3, 4, 5]\nassert L == [4, 5, 1, 3, 1]\nassert ssort([]) == []',
    exp: 'The smallest element comes first, followed by the sorted rest. Working on a copy keeps the caller\'s list unchanged.' },

  { id: 'L10-34', lec: 10, topic: 'Merge', d: 3, type: 'fib',
    t: 'Union of sorted lists without duplicates',
    q: '`union(A, B)` merges two ascending lists into one ascending list with **no repeated values**. Complete the test before appending.',
    code: `
      def union(A, B):
          i, j, out = 0, 0, []
          while i < len(A) or j < len(B):
              if j == len(B) or (i < len(A) and A[i] < B[j]):
                  x = A[i]
                  i += 1
              else:
                  x = B[j]
                  j += 1
              if {{1}}:
                  out.append(x)
          return out`,
    blanks: [['not out or out[-1] != x', 'out == [] or out[-1] != x', 'len(out) == 0 or out[-1] != x', 'x not in out']],
    test: 'assert union([1, 3, 3, 5], [2, 3, 6]) == [1, 2, 3, 5, 6]\nassert union([], [1, 1]) == [1]\nassert union([], []) == []',
    exp: 'The values arrive in sorted order, so a duplicate can only be equal to the **last** value appended. Checking `out[-1]` is O(1), while `x not in out` also works but scans the whole list each time. The `not out` part guards against indexing an empty list.' },

  { id: 'L10-35', lec: 10, topic: 'Selection sort', d: 2, type: 'fib',
    t: 'Sort records by mark, highest first',
    q: 'Complete this selection sort, which orders `(name, mark)` pairs by mark, **highest first**.',
    code: `
      def sort_by_mark(data):
          data = list(data)
          for i in range(len(data) - 1):
              m = i
              for j in range(i + 1, len(data)):
                  if {{1}}:
                      m = j
              data[i], data[m] = data[m], data[i]
          return data`,
    blanks: [['data[j][1] > data[m][1]', 'data[m][1] < data[j][1]']],
    test: "assert sort_by_mark((('A', 70), ('B', 90), ('C', 80))) == [('B', 90), ('C', 80), ('A', 70)]\nassert sort_by_mark(()) == []",
    exp: 'Compare the marks (index 1 of each pair), and select the **largest** remaining one each round to get descending order.' },

  { id: 'L10-36', lec: 10, topic: 'Binary search', d: 2, type: 'out',
    t: 'Binary search over strings',
    code: `
      L = ['ant', 'bee', 'cat', 'dog', 'eel', 'fox']
      lo, hi, steps, found = 0, len(L) - 1, 0, False
      while lo <= hi and not found:
          mid = (lo + hi) // 2
          steps += 1
          if L[mid] == 'eel':
              found = True
          elif L[mid] < 'eel':
              lo = mid + 1
          else:
              hi = mid - 1
      print(mid, steps)`,
    ans: '4 2',
    exp: 'Strings compare alphabetically, so binary search works on a sorted list of words too. mid = 2 (`cat` < `eel`), so go right: lo = 3, mid = 4 is `eel`, found in 2 steps.' },

  { id: 'L10-37', lec: 10, topic: 'Selection sort', d: 2, type: 'out',
    t: 'Counting real swaps',
    code: `
      L = [3, 1, 2]
      swaps = 0
      for i in range(len(L) - 1):
          m = i
          for j in range(i + 1, len(L)):
              if L[j] < L[m]:
                  m = j
          if m != i:
              L[i], L[m] = L[m], L[i]
              swaps += 1
      print(L, swaps)`,
    ans: '[1, 2, 3] 2',
    exp: 'i = 0: the smallest is 1, so swap to get `[1, 3, 2]`. i = 1: the smallest of the rest is 2, so swap to get `[1, 2, 3]`. Two swaps, each with `m != i`.' },

  { id: 'L10-38', lec: 10, topic: 'Complexity', d: 2, type: 'mcq',
    t: 'Cost of in inside a comprehension',
    q: 'What is the worst-case running time of `common`, with A and B as lists?',
    code: `
      def common(A, B):
          return [x for x in A if x in B]`,
    opts: ['O(len(A) × len(B))', 'O(len(A) + len(B))', 'O(len(A) × log len(B))', 'O(len(A))'],
    ans: 0,
    exp: '`x in B` on a list is a linear search, O(len(B)), and it runs once for every element of A. Turning B into a dictionary (or set) makes each lookup about constant time.' },

  { id: 'L10-39', lec: 10, topic: 'Merge sort', d: 3, type: 'out',
    t: 'Order of merges in merge sort',
    code: `
      def ms(L):
          if len(L) < 2:
              return L
          mid = len(L) // 2
          a, b = ms(L[:mid]), ms(L[mid:])
          print(len(a) + len(b), end=' ')
          return sorted(a + b)

      ms([5, 1, 4, 2, 3])`,
    ans: '2 2 3 5',
    exp: '[5, 1] merges first (size 2). Then the right half [4, 2, 3] splits into [4] and [2, 3]; [2, 3] merges (2), then [4] joins it (3). Finally the two halves merge (5).' }
]);
