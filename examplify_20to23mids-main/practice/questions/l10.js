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
          return False` },

  { id: 'L10-02', lec: 10, topic: 'Binary search', d: 2, type: 'out',
    t: 'Counting binary search steps',
    q: 'Using the lecture\'s loop version of `binary_search`, how many times does the `while` loop body run when searching for `1` (which is not in the list)? Type a number.',
    code: `
      def binary_search(L, val):  # L is sorted in ascending order
          low = 0
          high = len(L) - 1
          while low <= high:
              mid = (low + high) // 2
              if L[mid] == val:
                  return True
              elif val < L[mid]:
                  high = mid - 1  # go left half
              else:
                  low = mid + 1  # go right half
          return False

      L = [2, 5, 6, 8, 10, 13, 14, 19, 20, 26, 29]
      binary_search(L, 1)` },

  { id: 'L10-03', lec: 10, topic: 'Binary search', d: 1, type: 'mcq',
    t: 'Requirement for binary search',
    q: 'What must be true about the list for binary search to work correctly?' },

  { id: 'L10-04', lec: 10, topic: 'Binary search', d: 2, type: 'mcq',
    t: 'Guessing a number from 1 to 1000',
    q: 'Using the halving strategy, what is the **maximum** number of guesses needed to find a secret integer in [1, 1000]?' },

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
      print(Lcopy, result)` },

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
      print(L)` },

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
              {{2}}` },

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
          return res + {{1}}` },

  { id: 'L10-09', lec: 10, topic: 'Merge sort', d: 2, type: 'fib',
    t: 'Merge sort',
    q: 'Complete `merge_sort`. Assume `merge(L1, L2)` combines two sorted lists.',
    code: `
      def merge_sort(L):
          if len(L) < 2:
              return L.copy()
          mid = len(L) // 2
          return merge({{1}}, {{2}})` },

  { id: 'L10-10', lec: 10, topic: 'Complexity', d: 1, type: 'mcq',
    t: 'Matching time complexities',
    q: 'Which pairing of algorithm and worst-case time is correct?' },

  { id: 'L10-11', lec: 10, topic: 'Binary search', d: 2, type: 'mcq',
    t: 'Why slicing slows binary search down',
    q: 'The first binary search in the lecture recursed on `L[:mid]` or `L[mid+1:]`. Why is it slower than O(log N)?' },

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
          return merge(left, right)` },

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
            linear_search([56, 23, 89], 4))` },

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
      print(low, high)` },

  { id: 'L10-15', lec: 10, topic: 'Selection sort', d: 2, type: 'mcq',
    t: 'Selection sort on sorted input',
    q: 'In-place selection sort is given a list of N elements that is **already sorted**. Roughly how many comparisons `L[j] < L[m]` does it make?' },

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
      print(A, B)` },

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
          return search(0, len(L) - 1)` },

  { id: 'L10-18', lec: 10, topic: 'Binary search', d: 3, type: 'mcq',
    t: 'A bug that loops forever',
    q: 'Which single change to the loop version of `binary_search` can make it loop **forever** for some inputs?' },

  { id: 'L10-19', lec: 10, topic: 'Merge sort', d: 2, type: 'mcq',
    t: 'Merge sort split order',
    q: 'Merge sort is called on `[38, 16, 27, 39, 12, 27]`. What is the **first** call to `merge`?' },

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

      print(bsearch([3, 8, 12, 15, 21, 30, 42], 13))` },

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
      print(L)` },

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
              {{2}}` },

  { id: 'L10-23', lec: 10, topic: 'Bubble sort', d: 2, type: 'out',
    t: 'One bubble-sort pass',
    code: `
      L = [5, 1, 4, 2, 8]
      for j in range(len(L) - 1):
          if L[j] > L[j + 1]:
              L[j], L[j + 1] = L[j + 1], L[j]
      print(L)` },

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
      print(swaps)` },

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
          return {{2}}` },

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
          return out` },

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
          return c` },

  { id: 'L10-28', lec: 10, topic: 'Sorting', d: 2, type: 'mcq', optCode: true,
    t: 'Sorting mixed-case strings',
    q: 'What is printed?',
    code: `
      words = ['pear', 'Fig', 'apple', 'kiwi']
      words.sort()
      print(words, min(words))` },

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
      print(lower(L, 3, 0, 4), lower(L, 6, 0, 4), lower(L, 9, 0, 4))` },

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
          return ans` },

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
                      {{1}}` },

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
          return False` },

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
          return {{1}}` },

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
          return out` },

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
          return data` },

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
      print(mid, steps)` },

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
      print(L, swaps)` },

  { id: 'L10-38', lec: 10, topic: 'Complexity', d: 2, type: 'mcq',
    t: 'Cost of in inside a comprehension',
    q: 'What is the worst-case running time of `common`, with A and B as lists?',
    code: `
      def common(A, B):
          return [x for x in A if x in B]` },

  { id: 'L10-39', lec: 10, topic: 'Merge sort', d: 3, type: 'out',
    t: 'Order of merges in merge sort',
    code: `
      def ms(L):
          if len(L) < 2:
              return L
          mid = len(L) // 2
          a, b = ms(L[:mid]), ms(L[mid:])
          print(len(a) + len(b), end=' ')
          c = a + b
          c.sort()
          return c

      ms([5, 1, 4, 2, 3])` }
]);
