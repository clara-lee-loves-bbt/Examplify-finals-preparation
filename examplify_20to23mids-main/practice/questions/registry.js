/* On-the-go practice — question registry.

   Each questions file calls practice([...]) once with an array of questions.
   Code fields are written indented inside the data files; dedent() strips the
   common indentation so the stored code starts at column 0.

   Question shape
     id      'L5-07'             stable id, used to store progress
     lec     5                   lecture number (1-11)
     topic   'Recursion'         short topic label
     d       1 | 2 | 3           difficulty: easy / medium / hard (finals level)
     type    'mcq' | 'fib' | 'out'
     t       title shown in the problem list
     q       prompt text (`inline code`, **bold**, blank line = new paragraph)
     code    main code block; {{1}}, {{2}} mark the blanks of a 'fib'
     q2      optional text shown after the code
     exp     explanation shown after answering

   mcq   opts: [...], ans: index of the right option in opts
         optCode: true renders options as code; run: true means the verifier
         runs `code` and checks its output equals opts[ans]
   out   ans: exact expected output (an error is written as its name, e.g.
         'TypeError'); alts: other accepted spellings
   fib   blanks: [[accepted answers for blank 1], [for blank 2], ...]
         test: Python run after the filled-in code to prove each answer works
   any   verify: extra Python the verifier runs after `code` (asserts)        */
(function () {
  function dedent(s) {
    if (typeof s !== 'string') return s;
    s = s.replace(/^\n/, '').replace(/\s+$/, '');
    var lines = s.split('\n');
    var min = Infinity;
    lines.forEach(function (l) {
      if (!l.trim()) return;
      var m = l.match(/^ */)[0].length;
      if (m < min) min = m;
    });
    if (!isFinite(min) || min === 0) return s;
    return lines.map(function (l) { return l.slice(min); }).join('\n');
  }
  window.PRACTICE_QUESTIONS = window.PRACTICE_QUESTIONS || [];
  window.practice = function (list) {
    list.forEach(function (q) {
      q.code = dedent(q.code);
      if (q.verify) q.verify = dedent(q.verify);
      if (q.test) q.test = dedent(q.test);
      if (q.optCode && q.opts) q.opts = q.opts.map(dedent);
      window.PRACTICE_QUESTIONS.push(q);
    });
  };
})();
