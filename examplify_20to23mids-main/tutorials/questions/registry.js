/* Tutorial & assignment practice — question registry.

   Each question file calls tutorial([...]) once. The shape is the same as the
   lecture bank in practice/questions/: id, src, topic, d, type, t, q, code,
   q2, exp, plus opts/ans for MCQ or blanks/test for fill-in. `src` names the
   worksheet the question was converted from (T8 … T12, A4 … A6).

   dedent() strips the common indentation from code and test strings so the
   stored Python starts at column 0. */
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
  window.tutorial = function (list) {
    list.forEach(function (q) {
      q.code = dedent(q.code);
      if (q.verify) q.verify = dedent(q.verify);
      if (q.test) q.test = dedent(q.test);
      if (q.optCode && q.opts) q.opts = q.opts.map(dedent);
      window.PRACTICE_QUESTIONS.push(q);
    });
  };
})();
