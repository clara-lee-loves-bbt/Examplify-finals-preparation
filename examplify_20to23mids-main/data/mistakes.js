/* Personal mistakes log for the final-exam papers.

   Compiled 2026-11-17 from examplify-attempts-2026-11-17.json (AY 2019/20,
   2020/21 and 2021/22 finals). Every in-scope question that was answered
   wrongly or left blank is listed; questions tagged totally or crucially out
   of the lecture 1-11 scope are left out. Each key in the three papers was
   re-checked by running the code before anything was counted as a mistake.

   given  — the answer submitted in that attempt (MCQ letter, or one string per
            blank), kept here so the notes make sense even on a device that has
            not imported the attempt. Absent for skipped questions.
   kind   — 'wrong' or 'skipped'.
   This file only adds notes; it never reads or writes saved attempts. */
registerMistakes({
  compiled: '2026-11-17',
  source: 'examplify-attempts-2026-11-17.json',

  patterns: [
    { title: 'self.method() runs the object\'s own class version — even inside the parent',
      refs: ['final-1920:17', 'final-2122:29', 'final-2122:28', 'final-1920:12', 'final-2021:21'],
      text: 'Five of the OOP misses come down to method lookup. A call through `self` (or `super()`) is resolved starting from the class of the actual object, and statements inside each method still run in written order. Trace these with a call stack and an attribute table, not with the class diagram.' },
    { title: 'Mutable objects are shared, not copied',
      refs: ['final-1920:11', 'final-1920:14', 'final-2122:8'],
      text: '`append`, `[x] * n`, `[:]` and `[::-1]` copy only references to inner lists. Draw boxes and arrows: when every arrow points at one list, one write shows up everywhere.' },
    { title: 'Fill-in blanks must fit the code around them',
      refs: ['final-2021:27', 'final-2021:31', 'final-2122:41', 'final-2122:42', 'final-2122:43'],
      text: 'Most fill-in marks were lost to answers that ignore the fixed code: a different variable name from the one used later, indices treated as values, attributes written without `self.`, a condition that tests only half of the requirement. Read the whole skeleton and the example output before writing any blank, then trace the example through your filled-in code.' },
    { title: 'Recursion on nested data: head, tail, and what the call returns',
      refs: ['final-1920:21', 'final-2021:29', 'final-2122:44', 'final-2122:35', 'final-2021:22'],
      text: 'Decide what the recursive call returns (a list? a tuple? a count?) before combining it. Do not wrap a list result in another `[...]`, check that a base case is actually reachable, and remember `not x` is also true for 0.' },
    { title: 'Time management',
      refs: ['final-2122:36', 'final-2122:44'],
      text: '21/22 Q36 (2 marks) took 20 minutes and Q44 (5 marks) took 10. Give an MCQ at most about 3 minutes, flag it and move on, and come back at the end.' }
  ],

  items: [
    /* ---------------------------------------------------------- AY 2019/20 */
    { paper: 'final-1920', n: 2, lec: 4, kind: 'wrong', given: 'C',
      title: 'Compound assignment x *= x + 2',
      mistake: 'Read `x *= x + 2` as `x = x * x + 2`, which made the two statements look identical for every x.',
      misconception: '`x op= expr` evaluates the **whole** right-hand side first: `x *= x + 2` is `x = x * (x + 2)`, not `x * x + 2`.',
      tip: 'Rewrite every compound assignment as `x = x op (expr)` with brackets before comparing. Here x² + 2x = x² + 2 gives x = 1.' },

    { paper: 'final-1920', n: 8, lec: 9, kind: 'wrong', given: 'B',
      title: 'Where does oldmat[0][0] end up?',
      mistake: 'Only applied the row reversal `[::-1]` and missed that rows are also taken from the bottom up.',
      misconception: '`mat[len(mat)-i-1][::-1]` reverses the row order **and** each row, which is a 180° rotation, so (0, 0) goes to (n−1, n−1).',
      tip: 'Track one corner: which source row becomes new row 0 (i = 0 gives the last row), then where the element sits inside the reversed row.' },

    { paper: 'final-1920', n: 11, lec: 7, kind: 'wrong', given: 'B',
      title: 'Popping lists that were already appended',
      mistake: 'Assumed `nlst.append(lst[i])` saved a snapshot, so `lst2` would keep the original inner lists after they were popped empty.',
      misconception: '`append` stores a **reference** to the same inner list object. Emptying it afterwards empties it everywhere it is referenced, in both `lst1` and `lst2`.',
      tip: 'Draw box-and-arrow diagrams for nested lists. A list only becomes independent if it is copied, e.g. `lst[i][:]`.' },

    { paper: 'final-1920', n: 12, lec: 11, kind: 'wrong', given: 'B',
      title: 'Order of prints with super()',
      mistake: 'Chose R, Q, P by following the class hierarchy instead of the statement order inside `Q.function1`.',
      misconception: '`Q.function1` calls `super().function1()` **before** its own print, so P\'s print happens first and Q\'s after: R, P, Q.',
      tip: 'Trace method bodies line by line on a call stack: output order is when each `print` executes, not the order of the classes.' },

    { paper: 'final-1920', n: 13, lec: 5, kind: 'wrong', given: 'C',
      title: 'Hamming distance with a recursive zip',
      mistake: 'Picked "anagrames", treating the extra trailing letters as mismatches.',
      misconception: '`myzip1` stops when **either** string runs out (`i == m or i == n`), so extra characters are never compared. "anagrames" gives 0 and "anagarmmes" gives 2.',
      tip: 'Read the base case first: it decides exactly which positions get compared. Then count option by option on paper.' },

    { paper: 'final-1920', n: 14, lec: 6, kind: 'wrong', given: 'B',
      title: '[[]] * n rows',
      mistake: 'Expected each "row" to be its own list, so `mat[1]` would be `[2, 3]`.',
      misconception: '`[[]] * n` repeats the **same** empty list n times, so all four appends land in one list: `[0, 1, 2, 3]`.',
      tip: 'Treat `[mutable] * n` as a red flag. Independent rows need `[[] for _ in range(n)]`.' },

    { paper: 'final-1920', n: 16, lec: 5, kind: 'wrong', given: 'A',
      title: 'Completing scan with an accumulator',
      mistake: 'Chose `[item].extend(scan1(...))`.',
      misconception: '`list.extend` mutates in place and returns **None**, so it cannot be the returned value. The correct `[item] + scan1(f, item, i+1, n)` is not among A–D, so the answer is E.',
      tip: 'In a `return` expression use `+` to join lists. Also check that the new running total (`item`) is what gets passed on as the accumulator.' },

    { paper: 'final-1920', n: 17, lec: 11, kind: 'wrong', given: 'C',
      title: 'Parent constructor calling an overridden method',
      mistake: 'Assumed `Par.__init__` runs `Par.calc` and that `Chi.calc` also runs, setting both attributes.',
      misconception: '`self.calc(30)` is looked up on the actual object, a `Chi`, so only `Chi.calc` runs. Overriding **replaces** a method, it does not add to it, so `aa` is never set.',
      tip: 'Whenever parent code calls `self.something()`, start the lookup from the object\'s own class.' },

    { paper: 'final-1920', n: 20, lec: 3, kind: 'wrong', given: 'C',
      title: 'Nested lambdas that ignore their argument',
      mistake: 'Computed 11 × 12 = 132 as if both arguments were used.',
      misconception: '`lambda x: y` ignores `x` and returns the captured `y`, which is the function passed in. So `(11)` just returns `lambda x: x*10`, and `(12)` gives 120.',
      tip: 'Rename shadowed variables (`y` in `combinator` versus `lambda y`) and substitute one application at a time.' },

    { paper: 'final-1920', n: 21, lec: 7, kind: 'wrong',
      given: ['(seq[i] + deepReverse(seq[:i:])) for i in range(0,len(seq),-1)'],
      title: 'deepReverse',
      mistake: 'Wrote a generator expression over a range with a negative step, which is empty, instead of a recursive head/tail step.',
      misconception: 'Deep processing is recursive: reverse the **tail** deeply, then append the deeply reversed **head** as a single element. The base cases already cover non-lists and the empty list.',
      tip: 'Use the template `deepReverse(seq[1:]) + [deepReverse(seq[0])]`. Wrap the head in `[ ]` so it stays one element.' },

    { paper: 'final-1920', n: 23, lec: 4, kind: 'skipped',
      title: 'sinh series: loop and loop-free versions',
      mistake: 'Left blank.',
      misconception: 'Term n is `x**(2*n+1) / factorial(2*n+1)`. A "no explicit loop" version can hide the loop in a comprehension passed to `sum`.',
      tip: 'Write the general term first, then put it in the `for` body and inside `sum([... for n in range(50)])`. `factorial` is given in the question.' },

    { paper: 'final-1920', n: 24, lec: 11, kind: 'skipped',
      title: 'ClumsyFighter and Cleric subclasses',
      mistake: 'Left blank.',
      misconception: 'Subclasses reuse the parent through `super()`: keep the inherited attack with `super().act(myTeam, enemy)`, and override only what changes.',
      tip: 'For capped healing use `min(hp + 300, maxhp)`. RPG subclasses come up in almost every paper, so practise them.' },

    /* ---------------------------------------------------------- AY 2020/21 */
    { paper: 'final-2021', n: 4, lec: 2, kind: 'wrong', given: 'C',
      title: '[a,b,c][int(\'1\')]',
      mistake: 'Read `a`, `b`, `c` as the strings \'a\', \'b\', \'c\'.',
      misconception: 'Without quotes they are **variable names**. None of them is defined, so building the list raises `NameError` before any indexing happens.',
      tip: 'Check that every name in an expression is defined. Only quoted text is a string.' },

    { paper: 'final-2021', n: 18, lec: 3, kind: 'wrong', given: 'B',
      title: 'Indexing a map object',
      mistake: 'Treated `map(...)` as a list and evaluated `m[2]`.',
      misconception: '`map` (like `filter` and generators) returns a lazy **iterator**, which cannot be indexed, so `m[2]` raises `TypeError`.',
      tip: 'Use `list(m)[2]` or `tuple(m)[2]`. Remember an iterator can also be consumed only once.' },

    { paper: 'final-2021', n: 20, lec: 3, kind: 'skipped',
      title: 'Alphabet positions with ord',
      mistake: 'Left blank.',
      misconception: '`1 + ord(x.lower()) - ord(\'a\')` turns each letter into its position 1–26, so "Cab" is 3 + 1 + 2.',
      tip: '`ord(c) - ord(\'a\')` counts from 0. Map each character, then sum.' },

    { paper: 'final-2021', n: 21, lec: 11, kind: 'wrong', given: 'E',
      title: 'Calling an inherited method on a class',
      mistake: 'Expected nothing to be printed.',
      misconception: '`E` has no `foo`, so Python finds `B.foo` one level up. Calling through the **class** (`E.foo()`) passes no `self`, so a method without `self` works and prints `B`.',
      tip: 'Walk up the parent chain from the named class. Ignore distractor classes (`D`) that are not in that chain.' },

    { paper: 'final-2021', n: 22, lec: 5, kind: 'wrong', given: 'A',
      title: 'Recursion with no base case',
      mistake: 'Thought only the empty list crashes.',
      misconception: 'There is no base case. `lst[1:]` shrinks to `[]` and then stays `[]`, and the recursive call happens **before** `l2[-1]` is reached, so every length ends in `RecursionError`.',
      tip: 'Before tracing, ask "where does this recursion stop?" If nothing stops it, every input crashes.' },

    { paper: 'final-2021', n: 23, lec: 5, kind: 'skipped',
      title: 'Which reverse(...) call works?',
      mistake: 'Left blank.',
      misconception: '`reverse(a[1:]) + a[0]` adds an **element** to a sequence. That only type-checks for strings, where an element is itself a string.',
      tip: 'Check the types on both sides of every `+` in the recursive case: tuple + int and list + int both fail.' },

    { paper: 'final-2021', n: 24, lec: 7, kind: 'skipped',
      title: 'compareTwoList',
      mistake: 'Left blank.',
      misconception: 'Elements of `l1` that are not in `l2` are silently skipped, so `([1,2,3], [1,2])` wrongly returns True, while a longer `l2` is caught. It is right only some of the time, and it does not crash on empty lists.',
      tip: 'Test edge cases quickly: empty lists, the same elements in another order, and each list in turn being the longer one.' },

    { paper: 'final-2021', n: 25, lec: 6, kind: 'wrong', given: ['D', 'B'],
      title: 'What does foo(l) return?',
      mistake: 'Chose D ("non-descending") instead of E.',
      misconception: 'The filter keeps pairs where an element is **smaller** than its successor, and `not` turns "none found" into True. So True means no ascending step, i.e. non-ascending order.',
      tip: 'Plug in tiny inputs such as [1, 2, 3] and [3, 2, 1] before picking a direction. `not` flips the meaning.' },

    { paper: 'final-2021', n: 27, lec: 4, kind: 'wrong', given: ['elem', 'lst', 'f(elem)'],
      title: 'Your own filter',
      mistake: 'Named the loop variable `elem`, but the fixed line uses `output.append(item)`.',
      misconception: 'Blanks must match names the skeleton already uses. With `elem`, the line `append(item)` raises `NameError`.',
      tip: 'Read the whole skeleton before filling anything: the fixed code tells you the variable names.' },

    { paper: 'final-2021', n: 28, lec: 4, kind: 'wrong', given: ['first', 'largest', 'second', 'largest', 'first'],
      title: 'Largest and second largest',
      mistake: 'Compared against the wrong variables and updated them in the wrong order.',
      misconception: 'A new value only matters if it beats **second**. If it also beats **first**, the old first moves down to second before first is overwritten. `largest` and `smallest` are distractors.',
      tip: 'Trace (2, 1, 3, 5, 6, 5) by hand with a two-column table for first and second.' },

    { paper: 'final-2021', n: 29, lec: 5, kind: 'wrong', given: ['[]', '1', 'L', 'L[0]', '[deepen(L[1:])]'],
      title: 'deepen',
      mistake: 'Wrapped the recursive result in another list: `[deepen(L[1:])]`. Blanks 1 and 3 (`[]` and `L`) were actually equivalent to the key, but blank 5 adds an extra layer.',
      misconception: '`deepen` already **returns a list**, so wrapping it again nests one level too deep: `[1, [[2, ...]]]`.',
      tip: 'Before combining, ask what type the recursive call returns, and check with the smallest case, deepen([1, 2]) → [1, [2]].' },

    { paper: 'final-2021', n: 30, lec: 11, kind: 'wrong', given: ['50', 'damage * 0.5'],
      title: 'TankFighter halves damage',
      mistake: 'Used `damage * 0.5`.',
      misconception: '"Halved, rounded down" means integer floor division `damage // 2`. `* 0.5` gives a float and never rounds.',
      tip: 'Map wording to operators: "rounded down / whole number" → `//`.' },

    { paper: 'final-2021', n: 31, lec: 4, kind: 'wrong', given: ['i+1,len(rl)', 'i[0] + j[0] == o'],
      title: 'Two resistors that sum to o',
      mistake: 'Blank 1 was right. Blank 2 indexed into `i` and `j` as if they were sequences.',
      misconception: '`i` and `j` come from `range(...)`, so they are **indices** (ints), not values. The values are `rl[i]` and `rl[j]`.',
      tip: 'If the loop is `for i in range(len(x))`, every use of the value needs `x[i]`.' },

    /* ---------------------------------------------------------- AY 2021/22 */
    { paper: 'final-2122', n: 3, lec: 2, kind: 'wrong', given: 'B',
      title: 'print(3==2!=1!=0)',
      mistake: 'Evaluated left to right as booleans (False != 1 …) and got True.',
      misconception: 'Chained comparisons mean `3==2 and 2!=1 and 1!=0`. The first link is False, so the whole chain is False.',
      tip: 'Expand any chain into pairwise comparisons joined by `and`.' },

    { paper: 'final-2122', n: 5, lec: 3, kind: 'wrong', given: 'D',
      title: 'len of a doubly parenthesised tuple',
      mistake: 'Treated the extra outer parentheses as a one-element tuple and answered 1.',
      misconception: 'Parentheses alone only group: `((...))` is the same tuple. Only a trailing comma makes a 1-tuple. Its top-level elements are 1, 2, (3,4) and (5,(6,7)), so the length is 4.',
      tip: 'Count the top-level commas, not the brackets.' },

    { paper: 'final-2122', n: 7, lec: 7, kind: 'wrong', given: 'E',
      title: '[\'abc\',[\'def\'],\'qrs\'][2][1][0]',
      mistake: 'Chose "none of the rest".',
      misconception: 'Index one level at a time: `[2]` is \'qrs\', `[1]` is \'r\', and `[0]` of a one-character string is that same character.',
      tip: 'Write the intermediate value after each `[ ]`. Strings can be indexed at every level.' },

    { paper: 'final-2122', n: 8, lec: 6, kind: 'wrong', given: 'B',
      title: 'Copies of a list of the same list',
      mistake: 'Assumed `[:]` and `[::-1]` made separate inner lists, so the 9 would only be visible in one place.',
      misconception: 'Every slot of every outer list points to the **single** list `La`. Slicing copies only the outer list, so writing through any path changes `La`: `[9, 1]`.',
      tip: 'Count the distinct objects first. Here there is exactly one inner list.' },

    { paper: 'final-2122', n: 19, lec: 4, kind: 'skipped',
      title: 'while loop with continue',
      mistake: 'Left blank.',
      misconception: 'Once `i` is a multiple of 3, `continue` skips the increment, so `i` stops changing and the loop never ends, which is "none of the rest".',
      tip: 'For every `continue`, check whether the loop variable is still updated on that path.' },

    { paper: 'final-2122', n: 27, lec: 11, kind: 'wrong', given: 'C',
      title: 'Local variable inside __init__',
      mistake: 'Expected `member` to be remembered and printed as 25.',
      misconception: '`member = n*n` without `self.` is a **local** variable of `__init__` and disappears when it returns, so `cout` raises `NameError`.',
      tip: 'Only `self.name = ...` survives between methods. Look for the missing `self.`.' },

    { paper: 'final-2122', n: 28, lec: 11, kind: 'wrong', given: 'D',
      title: 'Constructor chain C3 → C2 → C1',
      mistake: 'Lost track of which `x` survives and what `super().f()` returns.',
      misconception: '`C3(2)`: x = 2, then `C2.__init__(4)` sets y = 4, then `C1.__init__(8)` sets x = 8 (the last write wins). `C2.f` is `C1.f() + self.x` = y + x = 4 + 8 = 12.',
      tip: 'Keep an attribute table and update it after every line of every `__init__`, in the order they run.' },

    { paper: 'final-2122', n: 29, lec: 11, kind: 'wrong', given: 'A',
      title: 'self.g() resolves to the subclass',
      mistake: 'Used `C1.g` (2) and got 6.',
      misconception: 'Inside `C1.f`, `self` is a `C3`, so `self.g()` runs **`C3.g`** and returns 4: 3 + 1 + 4 = 8. This is the same idea as 19/20 Q17.',
      tip: 'Every `self.method()` is looked up from the object\'s real class, wherever the call is written.' },

    { paper: 'final-2122', n: 32, lec: 10, kind: 'skipped',
      title: 'Which unique-extractors are fastest?',
      mistake: 'Left blank.',
      misconception: '`L.count(i)` inside a loop is O(N²). Sorting is O(N log N), and a dictionary count is O(N). Both 2 and 3 are much faster than 1.',
      tip: 'Spot hidden loops: `count`, `in` on a list, `remove` and `index` are each O(N).' },

    { paper: 'final-2122', n: 33, lec: 10, kind: 'skipped',
      title: 'The single fastest version',
      mistake: 'Left blank.',
      misconception: 'One pass with a dictionary (O(N)) beats a sort (O(N log N)).',
      tip: 'Rank by complexity class: O(N) < O(N log N) < O(N²).' },

    { paper: 'final-2122', n: 34, lec: 7, kind: 'wrong', given: 'B',
      title: 'In-place reversal that undoes itself',
      mistake: 'Thought the fix was to assign the result of `swap`.',
      misconception: '`swap` mutates the list in place, so its return value does not matter. Looping over the **whole** list swaps every pair twice and undoes the work; stop halfway with `range(n//2)`.',
      tip: 'In-place pairwise swaps only need half the length. Check the middle element on an odd-length list.' },

    { paper: 'final-2122', n: 35, lec: 5, kind: 'wrong', given: 'E',
      title: 'not x also catches 0',
      mistake: 'Picked a tuple result, missing the error.',
      misconception: '`if not x` is True for the int **0**, so `foo(0)` returns `0` instead of `(0,)`, and `tuple + int` raises `TypeError`.',
      tip: '0, \'\', [], () and None are all falsy. When elements can be 0, test the type, not truthiness.' },

    { paper: 'final-2122', n: 36, lec: 5, kind: 'wrong', given: 'E',
      title: 'foo on a string that looks like a list',
      mistake: 'Spent 20 minutes and chose "none".',
      misconception: 'Option A is a **string**: `x[m]` is a single character (so the recursion returns True), but `x[0]` is \'[\' and `x[-1]` is \']\', which differ, so the result is False.',
      tip: 'Check the argument type first: quotes mean characters. And move on after about 3 minutes on a 2-mark question.' },

    { paper: 'final-2122', n: 41, lec: 9, kind: 'wrong', given: ['n_row', 'n_col', "m[i][j] == '('"],
      title: 'Find the centre of every (+)',
      mistake: 'Scanned every column and tested only for `(`, which prints the bracket\'s position, not the centre.',
      misconception: 'The centre is the `+`. It needs `(` on its left **and** `)` on its right, so `j` must run from 1 to n_col − 2 to keep both neighbours in range.',
      tip: 'Match the thing whose coordinates are printed, check every neighbour, and set the loop bounds so `j-1` and `j+1` exist.' },

    { paper: 'final-2122', n: 42, lec: 11, kind: 'wrong',
      given: ['super.__init__(maxhp)', 'self.hp = maxhp // 2', 'if self.hp == 1:', 'self.hp = 1', 'self.hp -= 1'],
      title: 'SickFighter',
      mistake: '`super` without `()`, `maxhp` without `self.`, an inverted guard, and the parent\'s `act` was never called.',
      misconception: 'Use `super().__init__()` with the parent\'s own parameters (none here). Attributes are always `self.maxhp`. "Loses 1 hp unless at 1" is `if self.hp > 1: self.hp -= 1`, then `super().act(myTeam, enemy)` keeps the normal behaviour.',
      tip: 'Every RPG subclass follows one template: call `super().__init__()`, adjust attributes through `self.`, and do any extra work before or after `super().act(...)`.' },

    { paper: 'final-2122', n: 43, lec: 4, kind: 'wrong', given: ['range(1,n+1)', 'm % i == 0', 'res = i'],
      title: 'Iterative gcd',
      mistake: 'Only checked that `i` divides `m`.',
      misconception: 'A **common** divisor must divide both: `n % i == 0 and m % i == 0`, and it can be at most `min(n, m)`. Your version gives gcd(4, 6) = 3.',
      tip: 'Test with a pair whose answer is not one of the inputs (e.g. 4 and 6) before committing.' },

    { paper: 'final-2122', n: 44, lec: 5, kind: 'wrong',
      given: ['n%2 != 0', 'len((2, helper(n//2,2))), (2, helper(n//2,2)))', '1'],
      title: 'Counting prime factors recursively',
      mistake: 'Hard-coded 2 and built tuples instead of counting.',
      misconception: 'The helper returns a **count**. Base: `div == n` means n is the last prime factor (1). If `div` divides, count it and recurse on `n // div` with the same `div`. Otherwise try `div + 1`.',
      tip: 'For counting recursion the cases are "1 + recurse(smaller)" or "recurse(next candidate)". Trace 12 → 2, 2, 3.' }
  ]
});
