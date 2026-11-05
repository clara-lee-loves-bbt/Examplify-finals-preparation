# Examplify clone — CS1010E practice

A self-contained clone of the Examplify exam interface for practising CS1010E
final and mid-term questions. It reproduces the window chrome, dark header with
the countdown, FILTER rail, FLAG QUESTION pill, rounded answer rows, the
`Answers: A - E` / `Answers 1 - 3` blocks, and the Previous / Next / Finish
footer from the reference screenshots.

The picker is split into two categories: **final exam practice** on top (the
priority set) and **mid-term practice** below it.

## Open it

Double-click **`examplify.html`**. That is the whole app — one file, no server,
no install, no network access.

If you would rather edit the source and reload, open `index.html` instead; it
loads `styles.css`, `app.js` and the `data/` files separately.

## Papers

Every source PDF has been split into its own exam. Nothing is combined, and
each paper is named exactly as it is titled inside its PDF, so a card always
matches the document it came from.

### Final exam practice (top of the picker)

Six full-syllabus past papers, uploaded as the *New papers* set. Each is a
complete 2-hour paper worth 100 marks.

| Exam in the picker | Where it comes from |
|---|---|
| `FINAL EXAMINATION (Semester 1 : AY 2019/20)` | `cs1010e_1920S1_final_exam_soln.pdf` — 24 questions (20 MCQ + 4 written) |
| `FINAL EXAMINATION (Semester 1 : AY 2020/21)` | `cs1010e_2021S1_final_exam_soln.pdf` — 31 questions (25 MCQ + 4 fill-in + 2 written) |
| `FINAL EXAMINATION (Semester 1 : AY 2021/22)` | `cs1010e_2122S1_final_exam_soln.pdf` — 44 questions (40 MCQ + 4 fill-in) |
| `FINAL EXAMINATION (Semester 1 : AY 2022/23)` | `cs1010e_2223S1_final_exam.pdf` — 48 questions (44 MCQ + 4 fill-in), question paper only |
| `FINAL ASSESSMENT (Semester 1 : AY 2024/25)` | `cs1010e_2425S1_final_exam_soln.pdf` — 35 questions (21 MCQ + 14 fill-in) |
| `FINAL ASSESSMENT (Semester 1 : AY 2025/26)` | `cs1010e_2526S1_final_exam.pdf` + `..._soln.pdf` — 29 questions (23 MCQ + 6 fill-in) |

### Mid-term practice (below the finals)

| Exam in the picker | Where it comes from |
|---|---|
| `MID-TERM PRACTICE EXAMINATION (AY 2026/2027)` | `CS1010E Mock Exam 1 (Google AI Studio).pdf` — 28 questions, 57 marks |
| `Paper A` | `CS1010E Mock Exam 2,3,4,5 (Claude Opus 5).pdf`, from the pack titled *CS1010E Programming Methodology — Midterm Practice Papers* |
| `Paper B` | same pack |
| `Paper C` | same pack |
| `Paper D` | same pack |
| `MID-TERM EXAM (Semester 1 : AY 2025/26)` | `cs1010e_2526S1_midterm.pdf` — the real past paper |
| `MID-TERM TEST (AY 2020/2021, SEM 1)` | `cs1010e_2021S1_midterm_soln.pdf` — 25 questions, all multiple choice |
| `MID-TERM TEST (AY 2021/2022, SEM 1)` | `cs1010e_2122S1_midterm_soln.pdf` — 25 questions (2 fill-in-the-blank) |
| `MID-TERM TEST (AY 2022/2023, SEM 1)` | `cs1010e_2223S1_midterm_soln.pdf` — 25 questions (2 fill-in-the-blank) |

The mid-term set holds 258 questions: each of the four pack papers has 31
questions worth 61 marks (22 multiple choice in Sections A and B, 9
fill-in-the-blank in Section C), plus the four past papers and Mock Exam 1.
Across both categories the app ships **469 questions in 15 papers**.

The PDFs themselves are **not committed** — they are matched by `*.pdf` in
`.gitignore` and stay on the machine that owns them. Everything the app needs
is already transcribed into `data/`, so a fresh clone runs fine without them.

## What the clone does

- **Two question types.** Multiple choice rows show the letter, the option
  text and a mark on the right; fill-in-the-blank questions render `{{n}}`
  markers in the code as circled numbers (the `( ① )` in the screenshots) and
  give you one numbered input per blank, exactly like the paper.
- **Eliminating options.** The mark on the right of a choice strikes it
  through so you can rule answers out; clicking it again undoes the mark. It
  never reveals the key. Eliminated options stay selectable, and your marks
  are kept per question, surviving a reload.
- **The `Answers:` header tracks your choice.** It reads `Answers: A - E`
  until you pick one, then names the letter you selected —
  `Answers: A - E   —   selected: C` — so the choice stays visible even if
  you have scrolled or struck the option out. Fill-in questions keep the plain
  `Answers 1 - 2` header, and their rows carry no elimination mark because
  there is nothing to rule out.
- **Grading.** MCQs are right or wrong. Fill-in questions follow the paper's
  own rule: **every** blank must be correct, there is no partial credit. Text
  answers ignore whitespace and quote style, so `acc + (x,)` and `acc+(x,)`
  both count.
- **Results screen.** Score ring, marks earned, correct / incorrect / skipped
  counts, then a card per question with your answer, the correct answer and a
  short explanation. "Open this question" jumps back into the interface with
  the key overlaid in green and red.
- **Nothing locks you out.** Submitting only shows the key — **Continue this
  paper** puts you straight back into the editable paper with every answer
  intact. **Retake paper** is the only thing that clears answers, and it is
  never automatic.
- **Timer.** Counts down from 90 minutes in `MM:SS` and turns red under five
  minutes. It is a prompt, not a gate: at zero the header switches to
  `TIME OVER +MM:SS` in amber and warns you once, while the paper stays fully
  editable so you can work at your own pace.
- **A stopwatch per question.** Each question shows its own clock in the
  question header and only ticks while that question is the one on screen —
  stepping to another question, submitting, reviewing the key, or hiding the
  tab pauses it. The seconds are stored with your answers (`session.times`), so
  a paper remembers how long every question took across reloads.
- **Time chart on the results screen.** Under the score summary, *Time per
  question* shows total time, the single longest question, the average time per
  multiple-choice and per fill-in question, and a verdict on which *kind* of
  question eats the most time — plus a bar per question, coloured by type, with
  the slowest bar highlighted. Filters narrow it to MCQ or fill-in, and sort it
  by question order or longest first.
- **Compare across papers.** *Time analysis — all papers* (from the picker, or
  *Compare all papers* on any results screen) pools every paper you have sat
  into the same chart. Toggle each paper on or off, filter by question type,
  and sort by longest first or paper order.
- **Export / import attempts.** Because attempts live in this browser only, the
  picker has an **Export attempts** button that downloads every saved paper as a
  single JSON file (`examplify-attempts-YYYY-MM-DD.json`, tagged with a backup
  version), and an **Import attempts** button that reads one back through a file
  picker — nothing has to be typed or pasted anywhere. Import warns first if the
  file is not a backup or has no papers this build knows about, then offers
  **Keep newest** (only overwrite when the backup is more recent) or **Replace
  all**. This is the way to move attempts to another browser, profile or origin
  (`file://` and a local server keep separate storage), or to back them up before
  clearing site data.
- **Answers are saved** to this browser's `localStorage` after every keystroke,
  so you can close the tab mid-paper and resume later, or reload by accident
  without losing anything. The picker shows "In progress — n of 31 answered" or
  your score for a finished paper (times included). Export the lot from the picker
  if you want a copy that git and a browser wipe cannot take away.
- **Mid-term scope labels.** The three past papers (`2021S1`, `2122S1`,
  `2223S1`) are tagged against the lectures 1–5 scope sheet. A question that
  touches anything off-syllabus (lists, dicts, sets, files, `turtle`, `math`,
  …) carries a small pill at the top right of its header — `OUT OF SCOPE`,
  the level, and a one-line reason — and the same pill on its results card.
  In-scope questions are left clean. Hovering the pill shows the full reason.
- **Filter**, **flag**, **jump-to-question**, and keyboard shortcuts
  (`←` / `→` to move, `F` to flag, `Esc` to close menus). The FILTER rail has a
  **MID-TERM SCOPE** group that narrows the paper to *in scope*, *out of scope*,
  or any single level: **totally** (the question is only about the off-syllabus
  item), **crucially** (you must understand that item to answer), or **slightly**
  (the item is incidental — the tested idea is in the lectures).

## Layout

```
examplify.html          built single-file app — open this
index.html              same app, multi-file version
styles.css
app.js
build.js                inlines index.html + css + js -> examplify.html
data/registry.js        registerExam() helper
data/exam-final-1920.js final papers (category: 'final') — top of the picker
data/exam-final-2021.js
data/exam-final-2122.js
data/exam-final-2223.js
data/exam-final-2425.js
data/exam-final-2526.js
data/exam-mock1.js      mid-term papers — one file per paper
data/exam-paper-a.js
data/exam-paper-b.js
data/exam-paper-c.js
data/exam-paper-d.js
data/exam-midterm.js
tools/extract-pdfs.py   re-extract the PDFs to text (needs pymupdf)
tools/validate-data.js  sanity-check the question data
```

## Rebuilding and checking

After editing `index.html`, `styles.css`, `app.js` or anything in `data/`:

```bash
node build.js              # rebuild examplify.html
node tools/validate-data.js   # verify every paper's data
```

`validate-data.js` checks that question numbers run 1..n without gaps, that
every MCQ's key is one of its own options, that the `{{n}}` markers in each
stem line up one-for-one with the declared blanks, and that the section ranges
cover every question.

To regenerate the extracted text from the PDFs:

```bash
pip install pymupdf
python tools/extract-pdfs.py    # writes tools/text/*.txt
```

## Adding a paper

Create `data/exam-mine.js`, then add a `<script src="data/exam-mine.js"></script>`
line to `index.html` before `app.js`, and rebuild. The shape is:

```js
registerExam({
  id: 'mine',
  category: 'final',                             // 'final' or 'midterm'
  title: 'MID-TERM PRACTICE EXAMINATION (AY 2027/2028)',  // name the card
  headerName: 'MID-TERM PRACTICE EXAMINATION (AY 2027/2028)',  // shown in the header
  source: 'my-paper.pdf',
  duration: 90,                                 // minutes
  sections: [{ name: 'Section A', from: 1, to: 12, marks: 1 }],
  questions: [
    {
      n: 1, marks: 1, type: 'mcq',
      stem: [ { p: 'What is returned?' }, { code: '>>> 2 ** 3 ** 2 % 5' } ],
      options: [ { l: 'A', t: '4' }, { l: 'B', t: '512' } ],
      answer: 'C',
      explanation: '** is right-associative, so 2 ** (3 ** 2) = 512 and 512 % 5 = 2.'
    },
    {
      n: 2, marks: 3, type: 'fib',
      stem: [
        { p: 'Complete `rev(t)`, which reverses a tuple.' },
        { code: 'def rev(t):\n    if not t:\n        return ()\n    return {{1}} + {{2}}' }
      ],
      blanks: [ { n: 1, answer: 'rev(t[1:])' }, { n: 2, answer: '(t[0],)' } ],
      explanation: 'The head must land at the end, so the recursive call goes first.'
    }
  ]
});
```

Text inside backticks in a `p` block renders as inline code. Use `{{1}}`,
`{{2}}` … inside a `code` block to place a numbered blank chip. A question with
a single blank and no marker gets one free-standing answer box, which is what
the "Answer: ____" items use. Add `freeform: true` to a blank when any
non-empty answer should be accepted.

## Notes on the keys

- The four pack papers and Mock Exam 1 ship with their own answer keys, which
  are used verbatim.
- `cs1010e_2526S1_midterm.pdf` is the question paper only, so every answer for
  that paper was worked out by hand. Two items are worth knowing about:
  - **Mid-Term Q8** asks which expression returns `(1, 3, 5, 7, 2, 4)`-style
    concatenation; the correct result is not listed, so the key is **E**.
    Likewise **Q12** returns 3, which is not listed, so the key is **E**.
  - **Mid-Term Q21** (`r = x % y % z`) is ambiguous: `r < y` and `r < z` are
    both always true, so the item has three valid options. **E** is recorded as
    the key and the explanation says why.
- **Mock Exam 1 Q6** relies on a slice that does not produce any listed
  option; the paper's stated key **A** is kept and flagged in the
  explanation.
- The three added past papers (`2021S1`, `2122S1`, `2223S1`) were transcribed
  from PDFs whose "Answer" column is a placeholder — it reads **A** for every
  single question in both the 2122 and 2223 files, and the 2021 file has no
  answer column at all. Every key for these three papers was therefore worked
  out from the question, and each explanation shows the reasoning. The
  fill-in-the-blank answers are the ones printed in the PDFs.
- **AY 2021/2022 Q23** is flawed in the source: the code actually tests for an
  ascending (non-decreasing) list, which none of the options states. **A** is
  recorded as the key and the explanation says so.
- **Scope tags** (the `scope: { level, reason }` field) exist only on the three
  added mid-term past papers, which is where the lectures 1–5 scope sheet
  applies. Every other paper — including all six final papers — is left
  untagged, so the scope filters naturally show every question of those as
  *in scope* (the finals are full-syllabus by design).

## Notes on the final-exam papers

- **Where the keys come from.** `2025/26`, `2024/25`, `2021/22`, `2020/21` and
  `2019/20` ship with official solutions, and those keys are used verbatim.
  `2022/23` is the question paper only, so every key for it was worked out and
  checked by running the code (the file says so in its header). Where the
  printed key and the code disagree, the explanation says which one is used:
  - **AY 2021/22 Q15** — the printed key reads A, but no branch can ever set
    `y = 2` when `10 <= x <= 20`, so **B** is recorded.
  - **AY 2021/22 Q35** — `foo((0,1,2,3,(4,(5,6))))` raises `TypeError` because
    the `if not x` guard returns the int `0` before the tuple wrap, so the key
    is **none of the rest**, exactly as printed.
  - **AY 2021/22 Q9** — a set of the three characters is the point; CPython
    actually iterates it as `a, b, c`, so the printed option B is close but
    not literally what the shell prints.
  - **AY 2024/25 Q22(c)** — the hands coincide 22 times a day, not 24, so the
    key is *none of the above*. **Q26(b)** delegates to `self.cannon.fire()`,
    not `super.cannon.fire()`.
  - **AY 2022/23 Q47** — the paper's sample output is off by one on its own
    map (row 1's centre is at column 8, and row 0 also has one); the question
    here states the positions the code really prints.
- **Marks the paper does not print.** `2019/20` prints its mark split (60 MCQ +
  4×10). `2020/21`, `2021/22` and `2022/23` do not, so each of those files
  assigns a split that totals 100 and spells it out in the file header.
- **Written programming questions.** The four written questions in `2019/20`
  and the two in `2020/21` are open-ended code writing. Here they are asked as
  fill-in-the-blank over the paper's own skeleton, so they can be marked; the
  full model answer is in each explanation.
- **Dropdown fill-in questions.** `2024/25` Q22-27 are "FITB with dropdown
  choices" in the paper. The choices are kept in the stem and answered by
  typing the value or expression, so they still grade exactly.
- **The finals are not scope-tagged.** Every topic can appear, so the
  MID-TERM SCOPE group in the FILTER rail shows every finals question as *in
  scope*.
