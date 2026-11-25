/* On-the-go practice — answer key registry.

   The answers live apart from the questions (practice/questions/*.js), so
   reading a question file never gives the answer away. Each answers file
   calls answers({...}) once, keyed by question id.

   Answer shape
     trap    'slice-stop'      the trap this question is built to test
                               (an id from traps.js)
     ans     the right answer: printed output ('out'), or the right option
             text ('mcq'); an error is written as its name, e.g. 'TypeError'
     alts    other accepted spellings of an 'out' answer
     blanks  'fib': [[accepted answers for blank 1], [for blank 2], ...]
     wrong   every wrong option, each labelled with the trap it tests:
               { a: '(8, 9, 7)', trap: 'slice-stop', mut: 'slice-stop:0' }
               { b: 1, a: 'n - 2', trap: 'off-by-one', why: '...' }   (fib)
             a: the wrong answer (for fib, the wrong fill for blank b)
             mut: the checker rewrites the code the way this trap misreads
                  it (tools/trapkit.py) and confirms it prints exactly `a`
             why: a written reason, for wrong options a mutation can't make
     run     'mcq': the checker runs the code and checks the right option
     test    'fib': Python run after the filled-in code to prove each answer
     verify  extra Python asserts run by the checker
     verifyOnly  run verify alone (the shown code is only a fragment)
     exp     explanation shown after answering                              */
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
  window.PRACTICE_ANSWERS = window.PRACTICE_ANSWERS || {};
  window.answers = function (map) {
    Object.keys(map).forEach(function (id) {
      var a = map[id];
      if (a.test) a.test = dedent(a.test);
      if (a.verify) a.verify = dedent(a.verify);
      if (typeof a.ans === 'string' && a.ans.charAt(0) === '\n') a.ans = dedent(a.ans);
      (a.wrong || []).forEach(function (w) { if (w.a.charAt(0) === '\n') w.a = dedent(w.a); });
      window.PRACTICE_ANSWERS[id] = a;
    });
  };
})();
