/* My mistakes — one compact card per mistake, built from the paper data
   (question, code, options/blanks, key) and data/mistakes.js (your answer and
   the three-line note), so nothing has to be looked up elsewhere.

   Quiz mode hides the answer and the note until tapped (retrieval first);
   Read mode shows everything; Print always shows everything.
   View settings are kept in localStorage under their own key — saved exam
   attempts (examplify:v1:*) are never read or written here. */
(function () {
  'use strict';

  var EXAMS = window.EXAMPLIFY_EXAMS || [];
  var LOG = window.EXAMPLIFY_MISTAKES || { items: [], patterns: [] };
  var LEC = {
    1: 'Problem solving', 2: 'Expressions & functions', 3: 'Sequences & iterables',
    4: 'Statements & loops', 5: 'Recursion', 6: 'Objects & mutability', 7: 'List processing',
    8: 'Dictionaries', 9: '2D arrays', 10: 'Searching & sorting', 11: 'OOP'
  };
  var TYPE = { concept: 'concept', trace: 'tracing slip', blank: 'not attempted' };
  var CIRCLED = ['', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];
  var VIEW_KEY = 'cs1010e-mistakes-view-v1';

  /* ---------------- helpers ---------------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function inline(s) {
    return String(s).split(/(`[^`]+`)/).map(function (p) {
      if (/^`[^`]+`$/.test(p)) return '<code>' + esc(p.slice(1, -1)) + '</code>';
      return esc(p).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\*([^*]+)\*/g, '<i>$1</i>');
    }).join('');
  }
  function norm(s) { return String(s == null ? '' : s).replace(/[‘’“”]/g, "'").replace(/"/g, "'").replace(/\s+/g, ''); }
  function paperOf(id) { for (var i = 0; i < EXAMS.length; i++) if (EXAMS[i].id === id) return EXAMS[i]; return null; }
  function short(e) { var m = /AY\s*\d{2}(\d{2})\/(\d{2})/.exec(e.title || ''); return m ? m[1] + '/' + m[2] : e.id; }
  function questionOf(m) {
    var e = paperOf(m.paper);
    if (!e) return null;
    for (var i = 0; i < e.questions.length; i++) if (e.questions[i].n === m.n) return e.questions[i];
    return null;
  }
  function loadView() {
    try { var v = JSON.parse(localStorage.getItem(VIEW_KEY)); if (v && v.mode) return v; } catch (e) { /* ignore */ }
    return { mode: 'quiz', lec: 0, paper: '', type: '' };
  }
  function saveView() { try { localStorage.setItem(VIEW_KEY, JSON.stringify(view)); } catch (e) { /* ignore */ } }
  var view = loadView();
  var shuffled = null;

  /* ---------------- Python highlighting (soft-wrapped, hanging indent) ---------------- */
  var KW = {}, BI = {};
  ('False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield').split(' ').forEach(function (w) { KW[w] = 1; });
  ('print len range tuple list dict map filter sum max min abs int str float type isinstance super ord chr input round sorted reversed enumerate zip id set bool reduce all any self').split(' ').forEach(function (w) { BI[w] = 1; });
  var TOK = /(#[^\n]*)|([rRbBfF]{0,2}'(?:\\.|[^'\\\n])*'|[rRbBfF]{0,2}"(?:\\.|[^"\\\n])*")|(\{\{\d+\}\})|(\d[\d_]*(?:\.\d+)?(?:[eE][-+]?\d+)?)|([A-Za-z_]\w*)|(\n)|([^\S\n]+)|([\s\S])/g;
  function highlight(code) {
    var lines = [''], prev = '', m;
    TOK.lastIndex = 0;
    while ((m = TOK.exec(code))) {
      var h;
      if (m[1]) h = '<span class="tk-com">' + esc(m[1]) + '</span>';
      else if (m[2]) h = '<span class="tk-str">' + esc(m[2]) + '</span>';
      else if (m[3]) h = '<span class="bk">' + (CIRCLED[+m[3].slice(2, -2)] || m[3]) + '</span>';
      else if (m[4]) h = '<span class="tk-num">' + esc(m[4]) + '</span>';
      else if (m[5]) {
        var w = m[5];
        h = (prev === 'def' || prev === 'class') ? '<span class="tk-fn">' + w + '</span>'
          : KW[w] ? '<span class="tk-kw">' + w + '</span>' : BI[w] ? '<span class="tk-bi">' + w + '</span>' : w;
        prev = w;
      } else if (m[6]) { lines.push(''); continue; }
      else if (m[7]) h = m[7];
      else { h = esc(m[8]); prev = ''; }
      lines[lines.length - 1] += h;
    }
    return lines;
  }
  function codeBlock(code) {
    var raw = String(code).split('\n');
    var multi = raw.length > 1;
    return '<div class="code">' + highlight(code).map(function (l, i) {
      var hang = (raw[i] || '').match(/^ */)[0].length + 4;
      return '<div class="cl">' + (multi ? '<span class="cn">' + (i + 1) + '</span>' : '<span class="cn"></span>') +
        '<span class="cc" style="padding-left:' + hang + 'ch;text-indent:-' + hang + 'ch">' + (l || ' ') + '</span></div>';
    }).join('') + '</div>';
  }

  /* ---------------- one card ---------------- */
  function card(m) {
    var e = paperOf(m.paper), q = questionOf(m);
    if (!e || !q) return '';
    var h = '<article class="card" data-id="' + m.paper + ':' + m.n + '">';
    h += '<div class="meta"><span class="lec">L' + m.lec + '</span><span>' + short(e) + ' Q' + m.n + '</span>' +
      '<span>' + (q.type === 'mcq' ? 'MCQ' : 'fill-in') + ' · ' + q.marks + 'm</span>' +
      '<span class="tag ' + (m.type === 'blank' ? 'blank' : '') + '">' + (TYPE[m.type] || m.type) + '</span></div>';
    h += '<div class="title">' + inline(m.title) + '</div>';

    // The question itself.
    h += '<div class="stem">';
    q.stem.forEach(function (s) {
      if (s.code) h += codeBlock(s.code);
      else if (s.p) h += '<p>' + inline(s.p) + '</p>';
    });
    h += '</div>';

    if (q.type === 'mcq') {
      h += '<ul class="opts">' + q.options.map(function (o) {
        var cls = (o.l === q.answer ? 'key' : '') + (m.given === o.l ? ' yours' : '');
        var mark = o.l === q.answer ? '✓' : (m.given === o.l ? '✗' : '');
        return '<li class="' + cls.trim() + '"><span class="opt-l">' + o.l + '</span><span class="opt-t">' + esc(o.t) +
          '</span><span class="opt-m ans">' + mark + '</span></li>';
      }).join('') + '</ul>';
    }

    h += '<button type="button" class="reveal-btn">Show answer &amp; note</button>';
    h += '<div class="ans">';
    if (q.type !== 'mcq') {
      h += '<div class="blanks">' + q.blanks.map(function (b, i) {
        var yours = Array.isArray(m.given) ? m.given[i] : null;
        var has = yours != null && String(yours).trim() !== '';
        var same = has && norm(yours) === norm(b.answer);
        var fine = has && !same && (m.fine || []).indexOf(b.n) >= 0;
        var val;
        if (fine) val = '<code class="same">' + esc(yours) + '</code><span class="alt">✓ yours works too · key: <code>' + esc(b.answer) + '</code></span>';
        else {
          val = '<code class="' + (same ? 'same' : 'k') + '">' + esc(b.answer) + '</code>';
          if (has && !same) val += '<code class="y">' + esc(yours) + '</code>';
        }
        return '<div class="brow"><span class="bno">' + (CIRCLED[b.n] || b.n) + '</span><span class="bval">' + val + '</span></div>';
      }).join('') + '</div>';
    } else if (m.kind === 'skipped') {
      h += '<div class="blanks"><div class="brow"><span class="bno">✓</span><span class="bval"><code class="k">' +
        esc(q.answer + '. ' + optText(q, q.answer)) + '</code></span></div></div>';
    }
    h += '<div class="note">' +
      '<div class="w"><span class="i">✗</span><span>' + inline(m.wrong) + '</span></div>' +
      '<div class="r"><span class="i">✓</span><span>' + inline(m.right) + '</span></div>' +
      '<div class="rule"><span class="i">→</span><span>' + inline(m.rule) + '</span></div>' +
      '</div></div></article>';
    return h;
  }
  function optText(q, l) { for (var i = 0; i < q.options.length; i++) if (q.options[i].l === l) return q.options[i].t; return ''; }

  /* ---------------- filters + list ---------------- */
  function items() {
    return LOG.items.filter(function (m) { return paperOf(m.paper) && questionOf(m); });
  }
  function matches(m) {
    if (view.lec && m.lec !== view.lec) return false;
    if (view.paper && m.paper !== view.paper) return false;
    if (view.type && m.type !== view.type) return false;
    return true;
  }
  function chip(label, count, on, attrs) {
    return '<button type="button" class="chip' + (on ? ' on' : '') + '" ' + attrs + '>' + label +
      (count != null ? '<small>' + count + '</small>' : '') + '</button>';
  }
  function renderFilters() {
    var all = items();
    var lecs = {}, papers = {}, types = {};
    all.forEach(function (m) {
      lecs[m.lec] = (lecs[m.lec] || 0) + 1;
      papers[m.paper] = (papers[m.paper] || 0) + 1;
      types[m.type] = (types[m.type] || 0) + 1;
    });
    var h = chip('All', all.length, !view.lec && !view.paper && !view.type, 'data-f="all"');
    h += '<span class="sep"></span>';
    Object.keys(lecs).map(Number).sort(function (a, b) { return a - b; }).forEach(function (l) {
      h += chip('L' + l, lecs[l], view.lec === l, 'data-f="lec" data-v="' + l + '" title="' + esc(LEC[l]) + '"');
    });
    h += '<span class="sep"></span>';
    EXAMS.filter(function (e) { return papers[e.id]; }).forEach(function (e) {
      h += chip(short(e), papers[e.id], view.paper === e.id, 'data-f="paper" data-v="' + e.id + '"');
    });
    h += '<span class="sep"></span>';
    ['concept', 'trace', 'blank'].forEach(function (t) {
      if (types[t]) h += chip(TYPE[t], types[t], view.type === t, 'data-f="type" data-v="' + t + '"');
    });
    $('filters').innerHTML = h;
  }

  function renderList() {
    var list = items().filter(matches);
    $('count').textContent = list.length + (list.length === items().length ? '' : ' of ' + items().length);
    if (!list.length) { $('list').innerHTML = '<p class="empty">Nothing matches these filters.</p>'; return; }
    var h = '';
    if (shuffled) {
      var order = shuffled.filter(function (k) { return list.some(function (m) { return m.paper + ':' + m.n === k; }); });
      h += '<div class="lec-head"><span>Shuffled — lectures mixed</span><span>' + order.length + '</span></div>';
      order.forEach(function (k) { h += card(list.filter(function (m) { return m.paper + ':' + m.n === k; })[0]); });
    } else {
      var by = {};
      list.forEach(function (m) { (by[m.lec] = by[m.lec] || []).push(m); });
      Object.keys(by).map(Number).sort(function (a, b) { return a - b; }).forEach(function (l) {
        h += '<div class="lec-head"><span>L' + l + ' · ' + esc(LEC[l]) + '</span><span>' + by[l].length + '</span></div>';
        by[l].forEach(function (m) { h += card(m); });
      });
    }
    $('list').innerHTML = h;
  }

  function renderPatterns() {
    var p = LOG.patterns || [];
    if (!p.length) { $('patterns').hidden = true; return; }
    var h = '<summary>' + p.length + ' patterns that repeat across papers</summary>';
    p.forEach(function (x) {
      var refs = (x.refs || []).map(function (r) {
        var b = r.split(':'), e = paperOf(b[0]);
        return e ? short(e) + ' Q' + b[1] : r;
      }).join(' · ');
      h += '<div class="pattern"><b>' + inline(x.title) + '</b><p>' + inline(x.text) + '</p><div class="refs">' + refs + '</div></div>';
    });
    $('patterns').innerHTML = h;
  }

  function renderMode() {
    document.body.classList.toggle('quiz', view.mode === 'quiz');
    document.querySelectorAll('.seg button').forEach(function (b) { b.classList.toggle('on', b.dataset.mode === view.mode); });
    document.querySelectorAll('.card').forEach(function (c) { c.classList.toggle('revealed', view.mode === 'read'); });
    $('shuffle').classList.toggle('on', !!shuffled);
  }

  function render() { renderFilters(); renderList(); renderMode(); }

  /* Theme: follow the device until the button picks light or dark. */
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function isDark() { return view.theme ? view.theme === 'dark' : !!(darkQuery && darkQuery.matches); }
  function applyTheme() {
    if (view.theme) document.documentElement.setAttribute('data-theme', view.theme);
    else document.documentElement.removeAttribute('data-theme');
    var b = $('theme');
    b.innerHTML = isDark() ? '&#9728;' : '&#9790;';
    b.title = isDark() ? 'Switch to light mode' : 'Switch to dark mode';
    b.setAttribute('aria-label', b.title);
  }
  if (darkQuery && darkQuery.addEventListener) darkQuery.addEventListener('change', applyTheme);

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('button');
    if (!t) return;
    if (t.classList.contains('reveal-btn')) { t.closest('.card').classList.add('revealed'); return; }
    if (t.dataset.mode) { view.mode = t.dataset.mode; saveView(); renderMode(); return; }
    if (t.id === 'shuffle') {
      if (shuffled) shuffled = null;
      else {
        shuffled = items().map(function (m) { return m.paper + ':' + m.n; });
        for (var i = shuffled.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = x; }
      }
      renderList(); renderMode(); window.scrollTo(0, 0); return;
    }
    if (t.id === 'print') { window.print(); return; }
    if (t.id === 'theme') { view.theme = isDark() ? 'light' : 'dark'; saveView(); applyTheme(); return; }
    if (t.dataset.f) {
      var f = t.dataset.f, v = t.dataset.v;
      if (f === 'all') { view.lec = 0; view.paper = ''; view.type = ''; }
      else if (f === 'lec') view.lec = view.lec === +v ? 0 : +v;
      else if (f === 'paper') view.paper = view.paper === v ? '' : v;
      else if (f === 'type') view.type = view.type === v ? '' : v;
      saveView(); render(); return;
    }
  });

  // Printing always shows the full list in lecture order with every answer.
  var before = null;
  window.addEventListener('beforeprint', function () {
    before = { view: JSON.stringify(view), shuffled: shuffled };
    if (!/[?&]keep\b/.test(location.search)) { view.lec = 0; view.paper = ''; view.type = ''; }
    shuffled = null; renderList(); renderMode();
    $('patterns').open = true;
  });
  window.addEventListener('afterprint', function () {
    if (!before) return;
    view = JSON.parse(before.view); shuffled = before.shuffled; before = null; render();
  });

  var papers = {};
  items().forEach(function (m) { papers[m.paper] = 1; });
  $('print-meta').textContent = items().length + ' questions from the ' +
    EXAMS.filter(function (e) { return papers[e.id]; }).map(short).join(', ') +
    ' finals · grouped by lecture · ✗ what I thought · ✓ what is true · → rule · updated ' + (LOG.compiled || '');

  // ?print opens straight in print layout (used to build mistakes.pdf).
  if (/[?&]print\b/.test(location.search)) { view = { mode: 'read', lec: 0, paper: '', type: '', theme: 'light' }; }
  applyTheme();
  renderPatterns();
  render();
  if (/[?&]print\b/.test(location.search)) $('patterns').open = true;
})();
