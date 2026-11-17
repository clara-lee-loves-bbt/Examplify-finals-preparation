/* Shared exam registry.
   Each data file calls registerExam({...}) once, at load time. */
(function () {
  window.EXAMPLIFY_EXAMS = window.EXAMPLIFY_EXAMS || [];
  window.registerExam = function (exam) {
    window.EXAMPLIFY_EXAMS.push(exam);
  };
  /* data/mistakes.js registers the personal mistakes log (notes only). */
  window.registerMistakes = function (log) {
    window.EXAMPLIFY_MISTAKES = log;
  };
})();
