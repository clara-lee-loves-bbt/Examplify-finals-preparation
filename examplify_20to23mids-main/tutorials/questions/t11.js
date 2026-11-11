/* Tutorial 11 — Searching and sorting
   Converted from AY26/27S1 Week 11 Tutorial Worksheet, Q1–Q3. */
tutorial([
  {
    id: 'T11-01', src: 'T11', topic: 'Bubble sort', d: 2, type: 'fib',
    t: 'bubble: one pass',
    q: 'Complete `bubble(L)`: one left-to-right pass that swaps adjacent out-of-order pairs. It must return a new list and leave `L` alone.',
    code: `
      def bubble(L):
          n = len(L)
          T = L.copy()
          for i in range(1, n):
              if {{1}}:
                  {{2}}
          return T`,
    blanks: [['T[i - 1] > T[i]'], ['T[i - 1], T[i] = T[i], T[i - 1]']],
    test: `
      L0 = [9, 8, 7, 6, 5, 4, 3, 2, 1]
      assert bubble(L0) == [8, 7, 6, 5, 4, 3, 2, 1, 9]
      assert L0 == [9, 8, 7, 6, 5, 4, 3, 2, 1]
      assert bubble([4, 5, 6, 7, 1, 2, 3, 9, 8]) == [4, 5, 6, 1, 2, 3, 7, 8, 9]`,
    exp: 'Compare each pair and swap when the left one is larger. Working on the copy `T` leaves the input unchanged, and the largest element ends up at the back after one pass.'
  },
  {
    id: 'T11-02', src: 'T11', topic: 'Bubble sort', d: 2, type: 'fib',
    t: 'bubble_sort: repeat the pass',
    q: 'Complete `bubble_sort(L)`, which calls `bubble` repeatedly. Assume `bubble` is already defined.',
    code: `
      def bubble_sort(L):
          n = len(L)
          S = L.copy()
          for i in range(n):
              {{1}}
          return S`,
    blanks: [['S = bubble(S)']],
    test: `
      def bubble(L):
          n = len(L)
          T = L.copy()
          for i in range(1, n):
              if T[i - 1] > T[i]:
                  T[i - 1], T[i] = T[i], T[i - 1]
          return T
      L = [9, 8, 7, 6, 5, 4, 3, 2, 1]
      assert bubble_sort(L) == [1, 2, 3, 4, 5, 6, 7, 8, 9]
      assert L == [9, 8, 7, 6, 5, 4, 3, 2, 1]
      assert bubble_sort([4, 5, 6, 7, 1, 2, 3, 9, 8]) == [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
    exp: 'One call to `bubble` fixes only the largest remaining element, so at most `n` passes are needed. The result of each pass becomes the input of the next.'
  },
  {
    id: 'T11-03', src: 'T11', topic: 'Bubble sort', d: 2, type: 'mcq',
    t: 'One pass over a mixed list',
    q: 'What does `bubble` return for this list?',
    code: `
      print(bubble([4, 5, 6, 7, 1, 2, 3, 9, 8]))`,
    opts: ['[4, 5, 6, 1, 2, 3, 7, 8, 9]', '[1, 2, 3, 4, 5, 6, 7, 8, 9]', '[4, 5, 1, 2, 3, 6, 7, 8, 9]', '[4, 5, 6, 7, 1, 2, 3, 8, 9]'],
    ans: 0,
    exp: 'Each pass only moves an element one place left, so 1, 2 and 3 shift one step towards the front and 9 bubbles to the end: `[4, 5, 6, 1, 2, 3, 7, 8, 9]`.'
  },
  {
    id: 'T11-04', src: 'T11', topic: 'Sorting with a key', d: 3, type: 'fib',
    t: 'second_largest arrangement',
    q: 'Complete `second_largest(digits_str)`. Sort the digits descending, then swap the rightmost pair that can be swapped to make a smaller number. Return the digits as a string, or `"no answer"` if no smaller arrangement exists.',
    code: `
      def second_largest(digits_str):
          L = list(digits_str)
          L.sort(reverse=True)
          i = len(L) - 1
          found = False
          while i > 0 and not found:
              if {{1}}:
                  {{2}}
                  found = True
              i = i - 1
          if found:
              return {{3}}
          else:
              return {{4}}`,
    blanks: [['L[i - 1] > L[i]'], ['L[i - 1], L[i] = L[i], L[i - 1]'], ["''.join(L)"], ["'no answer'"]],
    test: `
      assert second_largest("123") == '312'
      assert second_largest("111222333") == '333221211'
      assert second_largest("254170017642136") == '776654432211010'
      assert second_largest("50000") == '05000'
      assert second_largest("5") == 'no answer'
      assert second_largest("222222222222") == 'no answer'`,
    exp: 'The descending sort gives the largest arrangement. To get the next one down, find the least significant digit that has a larger digit to its left and swap that adjacent pair. If every digit is already in order, no second arrangement exists.'
  },
  {
    id: 'T11-05', src: 'T11', topic: 'Binary search', d: 3, type: 'fib',
    t: 'count_even in O(log n)',
    q: 'The list has all even numbers before all odd numbers. Complete the binary search in `count_even(L)`; there is at least one of each parity.',
    code: `
      def count_even(L):
          low = 0
          high = len(L) - 2
          while low <= high:
              mid = (low + high) // 2
              if {{1}}:
                  return {{2}}
              elif {{3}}:
                  high = mid - 1
              else:
                  low = mid + 1
          return 0`,
    blanks: [['L[mid] % 2 == 0 and L[mid + 1] % 2 == 1'], ['mid + 1'], ['L[mid] % 2 == 1']],
    test: `
      assert count_even([8, 6, 2, 8, 16, 4, 4, 3, 7, 7, 1, 13]) == 7
      assert count_even([8, 3]) == 1
      assert count_even([2, 4, 6, 1]) == 3
      assert count_even([0, 1]) == 1`,
    exp: 'Look for the boundary where an even element is immediately followed by an odd one. If `L[mid]` is odd the boundary is to the left; if it is even the boundary is to the right. The index of the first odd element is exactly the number of evens.'
  },
  {
    id: 'T11-06', src: 'T11', topic: 'Built-in sorting', d: 1, type: 'mcq',
    t: 'sort() versus sorted()',
    q: 'Which statement is correct?',
    opts: ['`sorted(L)` returns a new list and leaves `L` unchanged; `L.sort()` sorts `L` in place',
           'Both leave `L` unchanged',
           '`L.sort()` returns a new list; `sorted(L)` sorts in place',
           'Both sort in place and return the same list'],
    ans: 0,
    exp: '`L.sort()` mutates the list and returns `None`. `sorted(L)` builds a new sorted list and leaves the original alone. Both accept `reverse=True`.'
  },
  {
    id: 'T11-07', src: 'T11', topic: 'Sorting with a key', d: 2, type: 'mcq',
    t: 'Second largest of "50000"',
    q: 'What does `second_largest("50000")` return?',
    opts: ["'05000'", "'00005'", "'50000'", "'no answer'"],
    ans: 0,
    exp: 'The largest arrangement is `50000`. The only smaller arrangement swaps the 5 with a 0, giving `05000`. Leading zeros are allowed, so this is the answer.'
  },
  {
    id: 'T11-08', src: 'T11', topic: 'Complexity', d: 2, type: 'mcq',
    t: 'Why count_even is fast',
    q: '`count_even` halves the search range each time. For a list of n numbers, how many comparisons does it need in the worst case?',
    opts: ['About log₂ n', 'About n', 'About n²', 'About n log n'],
    ans: 0,
    exp: 'Each step discards half of the remaining positions, so the number of steps grows like log₂ n. A linear scan would need up to n checks.'
  }
]);
