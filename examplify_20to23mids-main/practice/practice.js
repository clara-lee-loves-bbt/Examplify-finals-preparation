/* CS1010E on-the-go practice.
   A phone-first question runner, separate from the Examplify exam clone.
   Routes:  #/            problem list + filters
            #/q/<id>      one question
   Progress lives in localStorage (this browser only).                     */
(function () {
  'use strict';

  /* A page can override any of this with window.PRACTICE_CONFIG before this
     script runs. Without it the page behaves exactly as the lecture bank. */
  var CFG = window.PRACTICE_CONFIG || {};
  var GROUPS = CFG.groups || null;          // [{id, name, hint}] — tutorial/assignment mode
  var GROUP_KEY = CFG.groupKey || 'lec';
  var TYPES = CFG.types || ['mcq', 'fib', 'out'];
  var TYPE = CFG.typeLabels || { mcq: 'Multiple choice', fib: 'Fill in the blank', out: 'Predict the output' };
  var TYPE_SHORT = CFG.typeShort || { mcq: 'MCQ', fib: 'Fill-in', out: 'Output' };

  /* The answer key lives apart from the questions (practice/answers/*.js), so
     a question file never shows its answer. Merge each key into its question:
     an MCQ's options are the right answer followed by the wrong ones (shown
     shuffled), so q.ans is 0 and q.wrong[i] labels option i + 1 with its trap. */
  var ANSWERS = window.PRACTICE_ANSWERS || {};
  var TRAPS = window.PRACTICE_TRAPS || {};
  (window.PRACTICE_QUESTIONS || []).forEach(function (q) {
    var a = ANSWERS[q.id];
    if (!a) {
      // Banks without a separate key (tutorials) keep opts + ans inline: put the right option first too.
      if (q.type === 'mcq' && q.ans) {
        var right = q.opts[q.ans];
        q.opts = [right].concat(q.opts.filter(function (_, i) { return i !== q.ans; }));
        q.ans = 0;
      }
      return;
    }
    q.trap = a.trap;
    q.exp = a.exp;
    q.wrong = a.wrong || [];
    if (q.type === 'mcq') {
      q.opts = [a.ans].concat(q.wrong.map(function (w) { return w.a; }));
      q.ans = 0;
    } else if (q.type === 'out') {
      q.ans = a.ans;
      q.alts = a.alts;
    } else {
      q.blanks = a.blanks;
    }
  });
  var QS = (window.PRACTICE_QUESTIONS || []).slice();
  var BY_ID = {};
  QS.forEach(function (q) { BY_ID[q.id] = q; });
  QS.sort(function (a, b) {
    if (GROUPS) {
      var ga = groupIndex(a[GROUP_KEY]), gb = groupIndex(b[GROUP_KEY]);
      if (ga !== gb) return ga - gb;
      return (+a.id.split('-')[1]) - (+b.id.split('-')[1]);
    }
    return a.lec - b.lec || (+a.id.split('-')[1]) - (+b.id.split('-')[1]);
  });
  function groupIndex(id) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === id) return i;
    return GROUPS.length;
  }
  function groupName(q) {
    if (!GROUPS) return 'L' + q.lec;
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === q[GROUP_KEY]) return GROUPS[i].name;
    return String(q[GROUP_KEY]);
  }

  var LECS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  var NOT_REVISED_FROM = 9;
  var LEC_NAMES = {
    1: 'Problem solving', 2: 'Expressions & functions', 3: 'Sequences & iterables',
    4: 'Statements & loops', 5: 'Recursion', 6: 'Objects & lists', 7: 'List processing',
    8: 'Dictionaries', 9: '2D arrays', 10: 'Searching & sorting', 11: 'OOP'
  };
  var DIFF = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
  var CIRCLED = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];
  var PAGE = 60;

  /* ---------------- storage ---------------- */
  var KEY = CFG.storageKey || 'cs1010e-practice-v1';
  var SKEY = CFG.sessionKey || 'cs1010e-practice-session';
  function defaults() {
    var ids = GROUPS ? GROUPS.map(function (g) { return g.id; }) : LECS.slice();
    return { p: {}, f: { lecs: ids, type: 'all', diff: 0, status: 'all', outMode: 'type' }, days: {}, log: [], theme: null };
  }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.p && s.f) { s.days = s.days || {}; s.log = s.log || []; s.f.outMode = s.f.outMode || 'type'; return s; }
    } catch (e) { /* storage unavailable */ }
    return defaults();
  }
  var store = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignore */ } }

  function loadSession() {
    try {
      var s = JSON.parse(sessionStorage.getItem(SKEY));
      if (s && s.mode) return s;
    } catch (e) { /* ignore */ }
    return { mode: 'list', done: 0, right: 0, recent: [] };
  }
  var session = loadSession();
  function saveSession() { try { sessionStorage.setItem(SKEY, JSON.stringify(session)); } catch (e) { /* ignore */ } }

  /* ---------------- theme ---------------- */
  function applyTheme() {
    if (store.theme) document.documentElement.setAttribute('data-theme', store.theme);
    else document.documentElement.removeAttribute('data-theme');
  }
  function isDark() {
    if (store.theme) return store.theme === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();

  /* ---------------- helpers ---------------- */
  var app = document.getElementById('app');
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function inline(s) {
    return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  }
  function md(s) {
    if (!s) return '';
    return s.split(/\n\n+/).map(function (p) { return '<p>' + inline(p).replace(/\n/g, '<br>') + '</p>'; }).join('');
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  /* ---------------- spaced review ----------------
     Each question sits in a box 0-5 (Leitner system). A right answer moves it
     up a box and pushes the next review further out; a wrong answer (or a
     revealed one) drops it to box 0, due again straight away, and it is also
     re-asked a few questions later in the same session. A right answer you
     only guessed counts as box 1. Box 3 or higher counts as "retained".   */
  var DAY = 864e5;
  var INTERVAL = [0, 1, 3, 7, 16, 35]; // days until the next review, by box
  var RETAINED = 3;
  function dueOf(p) {
    if (!p || !p.n) return null;
    if (p.due != null) return p.due;
    return (p.t || 0) + (p.last === 'ok' ? DAY : 0); // progress saved before boxes existed
  }
  function isDue(id) { var d = dueOf(prog(id)); return d != null && d <= Date.now(); }
  function boxOf(id) { var p = prog(id); return p && p.box != null ? p.box : (p && p.c && p.last === 'ok' ? 1 : 0); }
  // Call before p.last is updated, so older progress (no box yet) starts from its last result.
  function schedule(p, result) {
    var box = p.box != null ? p.box : (p.last === 'ok' ? 1 : 0);
    if (result === 'ok') box = Math.min(box + 1, INTERVAL.length - 1);
    else if (result === 'guess') box = 1;
    else box = 0;
    p.box = box;
    p.due = Date.now() + INTERVAL[box] * DAY;
  }
  function whenText(p) {
    if (!p || p.box == null) return '';
    if (!p.box) return 'Back in a few questions, and due again now';
    var d = INTERVAL[p.box];
    return 'Next review in ' + d + ' day' + (d === 1 ? '' : 's') + ' (box ' + p.box + ' of ' + (INTERVAL.length - 1) + ')';
  }

  /* ---------------- traps ---------------- */
  function trapInfo(id) { return TRAPS[id] || { name: id === 'slip' ? 'careless slip' : id === 'unsure' ? "didn't know it yet" : id, rule: '' }; }
  // Which labelled wrong options does this answer match? Returns wrong entries.
  function matchTraps(q, given) {
    var wrong = q.wrong || [];
    if (q.type === 'mcq' || given.choice != null) {
      var w = given.choice > 0 ? wrong[given.choice - 1] : null;
      return w ? [w] : [];
    }
    if (q.type === 'out') {
      return wrong.filter(function (w) { return checkOut({ ans: w.a }, given.text); }).slice(0, 1);
    }
    var hits = [];
    given.values.forEach(function (v, i) {
      var nv = normCode(v);
      if (!nv) return;
      wrong.forEach(function (w) { if (w.b === i + 1 && normCode(w.a) === nv) hits.push(w); });
    });
    return hits;
  }
  function questionTraps(q) {
    var ids = [];
    if (q.trap) ids.push(q.trap);
    (q.wrong || []).forEach(function (w) { if (ids.indexOf(w.trap) < 0) ids.push(w.trap); });
    return ids;
  }
  function testsTrap(q, id) { return questionTraps(q).indexOf(id) >= 0; }

  function prog(id) { return store.p[id]; }
  function isSolved(id) { var p = prog(id); return !!(p && p.c); }
  function isWrong(id) { var p = prog(id); return !!(p && (p.last === 'bad' || p.last === 'shown')); }
  function isFlagged(id) { var p = prog(id); return !!(p && p.flag); }
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { t.hidden = true; }, 2200);
  }

  var ICON = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>',
    flagOn: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4" fill="none"/><path d="M5 4h11l-2 4 2 4H5z"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
  };

  /* ---------------- Python syntax highlighting ---------------- */
  var KW = {};
  ('False None True and as assert break class continue def del elif else except finally for from global ' +
   'if import in is lambda nonlocal not or pass raise return try while with yield').split(' ')
    .forEach(function (w) { KW[w] = 1; });
  var BI = {};
  ('print len range tuple list dict map filter sum max min abs int str float type isinstance issubclass ' +
   'super ord chr input round sorted reversed enumerate zip id set bool reduce all any self')
    .split(' ').forEach(function (w) { BI[w] = 1; });
  var TOK = /(#[^\n]*)|([rRbBfF]{0,2}'(?:\\.|[^'\\\n])*'|[rRbBfF]{0,2}"(?:\\.|[^"\\\n])*")|(\{\{\d+\}\})|(\d[\d_]*(?:\.\d+)?(?:[eE][-+]?\d+)?)|([A-Za-z_]\w*)|(\n)|([^\S\n]+)|([\s\S])/g;

  // Returns an array of HTML strings, one per line. blankFn(n) renders a {{n}} marker.
  function highlight(code, blankFn) {
    var lines = [''];
    var prevWord = '';
    var m;
    TOK.lastIndex = 0;
    while ((m = TOK.exec(code))) {
      var html;
      if (m[1]) html = '<span class="tk-com">' + esc(m[1]) + '</span>';
      else if (m[2]) html = '<span class="tk-str">' + esc(m[2]) + '</span>';
      else if (m[3]) html = blankFn ? blankFn(+m[3].slice(2, -2)) : esc(m[3]);
      else if (m[4]) html = '<span class="tk-num">' + esc(m[4]) + '</span>';
      else if (m[5]) {
        var w = m[5];
        if (prevWord === 'def' || prevWord === 'class') html = '<span class="tk-fn">' + w + '</span>';
        else if (KW[w]) html = '<span class="tk-kw">' + w + '</span>';
        else if (BI[w]) html = '<span class="tk-bi">' + w + '</span>';
        else html = w;
        prevWord = w;
      } else if (m[6]) { lines.push(''); continue; }
      else if (m[7]) html = m[7];
      else { html = esc(m[8]); prevWord = ''; }
      if (!m[7] && !m[5]) prevWord = m[5] || (m[8] ? '' : prevWord);
      lines[lines.length - 1] += html;
    }
    return lines;
  }
  // Long lines soft-wrap; continuation lines hang 4 columns past the line's own indentation.
  function codeBlock(code, blankFn, small) {
    var lines = highlight(code, blankFn);
    var raw = String(code).split('\n');
    return '<div class="code' + (small ? ' small' : '') + '"><div class="code-in">' +
      lines.map(function (l, i) {
        var hang = (raw[i] || '').match(/^ */)[0].length + 4;
        return '<div class="cl"><span class="cn">' + (i + 1) + '</span><span class="cc" style="padding-left:' + hang +
          'ch;text-indent:-' + hang + 'ch">' + (l || ' ') + '</span></div>';
      }).join('') + '</div></div>';
  }

  /* ---------------- answer checking ---------------- */
  function unifyQuotes(s) {
    return String(s).replace(/[‘’‛′]/g, "'").replace(/[“”″]/g, '"').replace(/"/g, "'");
  }
  // Code: drop whitespace except a single space between two word characters.
  function normCode(s) {
    s = unifyQuotes(s).replace(/ /g, ' ').trim().replace(/\s+/g, ' ');
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c === ' ') {
        if (/\w/.test(out.slice(-1)) && /\w/.test(s[i + 1] || '')) out += ' ';
      } else out += c;
    }
    return out.replace(/;$/, '');
  }
  // Output: whitespace (including newlines) collapses; spacing next to brackets and commas is ignored.
  function normOut(s) {
    return unifyQuotes(s).replace(/ /g, ' ').trim().replace(/\s+/g, ' ')
      .replace(/\s*([,()[\]{}:])\s*/g, '$1');
  }
  function checkOut(q, given) {
    var want = [q.ans].concat(q.alts || []);
    var g = normOut(given);
    return want.some(function (w) {
      var n = normOut(w);
      if (/^[A-Z]\w*Error$/.test(w.trim())) return n.toLowerCase() === g.toLowerCase();
      return n === g;
    });
  }
  function checkBlank(alts, given) {
    var g = normCode(given);
    if (!g) return false;
    return alts.some(function (a) { return normCode(a) === g; });
  }

  /* ---------------- filtering & picking ---------------- */
  function matches(q, f, ignoreStatus) {
    if (f.lecs.indexOf(q[GROUP_KEY]) < 0) return false;
    if (f.type !== 'all' && q.type !== f.type) return false;
    if (f.diff && q.d !== f.diff) return false;
    if (!ignoreStatus) {
      var p = prog(q.id);
      if (f.status === 'new' && p && p.n) return false;
      if (f.status === 'wrong' && !isWrong(q.id)) return false;
      if (f.status === 'solved' && !isSolved(q.id)) return false;
      if (f.status === 'flagged' && !isFlagged(q.id)) return false;
    }
    if (f.search) {
      var s = f.search.toLowerCase();
      var hay = (q.t + ' ' + q.topic + ' ' + q.id + ' ' + (GROUPS ? groupName(q) : LEC_NAMES[q.lec])).toLowerCase();
      if (hay.indexOf(s) < 0) return false;
    }
    return true;
  }
  function filtered() { return QS.filter(function (q) { return matches(q, store.f); }); }
  function inLecs(q) { return store.f.lecs.indexOf(q[GROUP_KEY]) >= 0; }
  function poolFor(mode) {
    if (mode === 'mistakes') return QS.filter(function (q) { return inLecs(q) && isWrong(q.id); });
    if (mode === 'flagged') return QS.filter(function (q) { return isFlagged(q.id); });
    if (mode === 'review') return QS.filter(function (q) { return inLecs(q) && isDue(q.id); });
    if (mode === 'new') return QS.filter(function (q) { var p = prog(q.id); return inLecs(q) && !(p && p.n); });
    if (mode === 'trap') return QS.filter(function (q) { return testsTrap(q, session.trap); });
    return filtered();
  }
  function weight(q) {
    var p = prog(q.id);
    if (!p || !p.n) return 3;
    if (p.last === 'bad' || p.last === 'shown') return 4;
    return p.flag ? 2 : 1;
  }
  function pickNext(mode, currentId) {
    // A question missed earlier in this session comes back after a few others:
    // retrieving it again soon after the correction is what makes it stick.
    if (mode !== 'list') {
      var qi = (session.queue || []).findIndex(function (r) { return r.at <= session.done && r.id !== currentId && BY_ID[r.id]; });
      if (qi >= 0) return BY_ID[session.queue.splice(qi, 1)[0].id];
    }
    var pool = poolFor(mode);
    if (!pool.length) return null;
    if (mode === 'list') {
      var i = pool.findIndex(function (q) { return q.id === currentId; });
      return pool[(i + 1) % pool.length];
    }
    var avoid = Math.min(15, pool.length - 1);
    var recent = session.recent.slice(-avoid);
    var cands = pool.filter(function (q) { return recent.indexOf(q.id) < 0 && q.id !== currentId; });
    if (!cands.length) cands = pool.filter(function (q) { return q.id !== currentId; });
    if (!cands.length) return null;
    if (mode === 'review') {
      // Most overdue first, but pick among the five most overdue so lectures interleave.
      cands.sort(function (a, b) { return dueOf(prog(a.id)) - dueOf(prog(b.id)); });
      return cands[Math.floor(Math.random() * Math.min(5, cands.length))];
    }
    var total = cands.reduce(function (s, q) { return s + weight(q); }, 0);
    var r = Math.random() * total;
    for (var k = 0; k < cands.length; k++) {
      r -= weight(cands[k]);
      if (r <= 0) return cands[k];
    }
    return cands[cands.length - 1];
  }

  /* ---------------- stats ---------------- */
  function stats() {
    var solved = 0, tried = 0, attempts = 0, correct = 0;
    QS.forEach(function (q) {
      var p = prog(q.id);
      if (!p) return;
      if (p.n) tried++;
      if (p.c) solved++;
      attempts += p.n || 0;
      correct += p.c || 0;
    });
    var streak = 0;
    var d = new Date();
    if (!store.days[today()]) d.setDate(d.getDate() - 1);
    for (;;) {
      var k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      if (!store.days[k]) break;
      streak++;
      d.setDate(d.getDate() - 1);
    }
    var due = 0, kept = 0;
    QS.forEach(function (q) {
      if (isDue(q.id)) due++;
      if (boxOf(q.id) >= RETAINED) kept++;
    });
    return {
      solved: solved, tried: tried,
      acc: attempts ? Math.round(100 * correct / attempts) : null,
      today: store.days[today()] || 0, streak: streak, due: due, kept: kept
    };
  }

  /* ---------------- mistake log ----------------
     Every wrong or revealed answer adds an entry:
       { id, t: time, g: your answer, tr: trap id ('' until tagged),
         auto: trap matched from your answer, n: your note, how: 'bad'|'shown',
         fx: marked understood }                                            */
  var LOG_MAX = 2000;
  function addLog(q, given, how, traps) {
    var e = { id: q.id, t: Date.now(), g: String(given || '').slice(0, 400), tr: traps.length ? traps[0].trap : '', auto: !!traps.length, n: '', how: how };
    if (how === 'shown' && !e.tr && q.trap) e.tr = q.trap;
    store.log.push(e);
    if (store.log.length > LOG_MAX) store.log.splice(0, store.log.length - LOG_MAX);
    return e;
  }
  function openLog() { return store.log.filter(function (e) { return !e.fx && BY_ID[e.id]; }); }
  function trapCounts(entries) {
    var c = {};
    entries.forEach(function (e) { var k = e.tr || 'untagged'; c[k] = (c[k] || 0) + 1; });
    return Object.keys(c).map(function (k) { return { id: k, n: c[k] }; }).sort(function (a, b) { return b.n - a.n; });
  }

  /* =====================================================================
     HOME
     ===================================================================== */
  var shown = PAGE;
  function topbarHome() {
    return '<header class="topbar"><div class="topbar-in">' +
      '<div class="brand"><span class="brand-mark">' + (CFG.mark || 'PY') + '</span>' + (CFG.title || 'CS1010E Practice') + '</div>' +
      '<button class="icon-btn" data-act="theme" aria-label="Toggle dark mode">' + (isDark() ? ICON.sun : ICON.moon) + '</button>' +
      '</div></header>';
  }
  function renderHome() {
    var s = stats();
    var f = store.f;
    var list = filtered();
    var mistakes = poolFor('mistakes').length;
    var flagged = poolFor('flagged').length;
    var pct = Math.round(100 * s.solved / QS.length);

    var lecChips = GROUPS ? GROUPS.map(function (g) {
      var total = 0, done = 0;
      QS.forEach(function (q) { if (q[GROUP_KEY] === g.id) { total++; if (isSolved(q.id)) done++; } });
      return '<button class="chip' + (f.lecs.indexOf(g.id) >= 0 ? ' on' : '') + '" data-act="group" data-v="' + g.id + '" title="' + esc(g.hint || '') + '" aria-pressed="' + (f.lecs.indexOf(g.id) >= 0) + '">' +
        esc(g.name) + ' <small>' + done + '/' + total + '</small></button>';
    }).join('') : LECS.map(function (l) {
      var total = 0, done = 0;
      QS.forEach(function (q) { if (q.lec === l) { total++; if (isSolved(q.id)) done++; } });
      return '<button class="chip' + (f.lecs.indexOf(l) >= 0 ? ' on' : '') + '" data-act="lec" data-v="' + l + '" aria-pressed="' + (f.lecs.indexOf(l) >= 0) + '">' +
        'L' + l + ' <small>' + done + '/' + total + '</small>' +
        (l >= NOT_REVISED_FROM ? '<span class="dot" title="Not revised yet"></span>' : '') + '</button>';
    }).join('');

    function seg(key, opts) {
      return '<div class="seg" role="group">' + opts.map(function (o) {
        return '<button data-act="seg" data-k="' + key + '" data-v="' + o[0] + '" class="' + (String(f[key]) === String(o[0]) ? 'on' : '') + '">' + o[1] + '</button>';
      }).join('') + '</div>';
    }

    var rows = list.slice(0, shown).map(rowHtml).join('');
    var review = poolFor('review').length;
    var unseen = poolFor('new').length;
    var open = openLog();
    var top = trapCounts(open).filter(function (t) { return t.id !== 'untagged'; }).slice(0, 5);

    app.innerHTML = topbarHome() +
      '<main class="wrap home">' +
      (CFG.intro ? '<section class="card intro"><p class="sync-note">' + CFG.intro + '</p></section>' : '') +
      '<div class="stats">' +
        '<div class="stat"><b>' + s.solved + '<small>/' + QS.length + '</small></b><span>solved</span></div>' +
        '<div class="stat"><b>' + s.due + '</b><span>due now</span></div>' +
        '<div class="stat"><b>' + (s.acc === null ? '–' : s.acc + '%') + '</b><span>accuracy</span></div>' +
        '<div class="stat"><b>' + s.streak + '</b><span>day streak</span></div>' +
      '</div>' +
      '<div class="ring-bar" aria-hidden="true"><i style="width:' + pct + '%"></i></div>' +
      '<p class="retain-note">' + s.kept + ' retained (answered right on spaced reviews) · ' + s.tried + ' tried · ' + s.today + ' today</p>' +
      '<div class="cta">' +
        (review
          ? '<button class="btn primary big" data-act="start" data-mode="review">↻ Review due <small>(' + review + ')</small></button>' +
            '<button class="btn" data-act="start" data-mode="shuffle"' + (list.length ? '' : ' disabled') + '>▶ Shuffle <small>' + list.length + '</small></button>'
          : '<button class="btn primary big" data-act="start" data-mode="shuffle"' + (list.length ? '' : ' disabled') + '>▶ Shuffle practice <small>(' + list.length + ')</small></button>') +
        '<button class="btn" data-act="start" data-mode="new"' + (unseen ? '' : ' disabled') + '>✦ Unseen <small>' + unseen + '</small></button>' +
        '<button class="btn" data-act="start" data-mode="mistakes"' + (mistakes ? '' : ' disabled') + '>✗ Redo mistakes <small>' + mistakes + '</small></button>' +
        '<button class="btn" data-act="start" data-mode="flagged"' + (flagged ? '' : ' disabled') + '>⚑ Flagged <small>' + flagged + '</small></button>' +
        '<a class="btn' + (review ? ' wide' : '') + '" href="#/log">📓 Mistake log <small>' + open.length + '</small></a>' +
      '</div>' +
      (top.length ? '<section class="card traps-card"><h2>Your top traps</h2>' +
        '<p class="sync-note">From your mistake log. Tap one to drill every question built on it.</p>' +
        top.map(function (t) {
          var info = trapInfo(t.id);
          var n = QS.filter(function (q) { return testsTrap(q, t.id); }).length;
          return '<button class="trap-row" data-act="drill" data-trap="' + esc(t.id) + '"' + (n ? '' : ' disabled') + '>' +
            '<span class="trap-n">' + t.n + '×</span><span class="trap-main"><b>' + esc(info.name) + '</b>' +
            (info.rule ? '<small>' + esc(info.rule) + '</small>' : '') + '</span>' +
            '<span class="trap-go">' + (n ? 'Drill ' + n + ' →' : '') + '</span></button>';
        }).join('') + '</section>' : '') +
      '<section class="card">' +
        '<h2>Filter</h2>' +
        '<div class="frow"><div class="flabel">' + (GROUPS ? 'Source' : 'Lectures') +
          '<span>' + (CFG.presets
            ? CFG.presets.map(function (p, i) { return '<button data-act="preset" data-i="' + i + '">' + p.label + '</button>'; }).join('')
            : '<button data-act="lecs" data-v="all">All</button><button data-act="lecs" data-v="revised">L1–8</button><button data-act="lecs" data-v="new">L9–11</button>') +
          '</span></div>' +
          '<div class="chips">' + lecChips + '</div>' +
          (GROUPS ? '' : '<div class="legend"><span class="dot"></span> Lecture 9 onwards — not revised yet</div>') + '</div>' +
        '<div class="frow"><div class="flabel">Type</div>' + seg('type', [['all', 'All']].concat(TYPES.map(function (t) { return [t, TYPE_SHORT[t] || TYPE[t]]; }))) + '</div>' +
        '<div class="frow"><div class="flabel">Difficulty</div>' + seg('diff', [[0, 'All'], [1, 'Easy'], [2, 'Medium'], [3, 'Hard']]) + '</div>' +
        '<div class="frow"><div class="flabel">Status</div>' + seg('status', [['all', 'All'], ['new', 'New'], ['wrong', 'Wrong'], ['solved', 'Solved'], ['flagged', '⚑']]) + '</div>' +
        (TYPES.indexOf('out') >= 0 ? '<div class="frow"><div class="flabel">Output questions<span class="flabel-hint">typing recalls harder, so it sticks better</span></div>' +
          seg('outMode', [['type', 'Type the output'], ['choose', 'Choose from options']]) + '</div>' : '') +
      '</section>' +
      '<input class="search" type="search" placeholder="Search titles and topics" value="' + esc(f.search || '') + '" data-act="search" autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<div class="list-head"><h2>Problems</h2><span>' + list.length + ' shown</span></div>' +
      (list.length ? '<div class="plist">' + rows + '</div>' : '<div class="plist"><div class="empty">No questions match these filters.</div></div>') +
      (list.length > shown ? '<button class="btn more" data-act="more">Show more (' + (list.length - shown) + ' left)</button>' : '') +
      '<section class="card sync">' +
        '<h2>Sync across devices</h2>' +
        '<p class="sync-note">Copy a code here, then paste it on your other device. Codes <b>merge</b>, so nothing on either device is lost. Do it both ways to bring phone and laptop fully in step.</p>' +
        '<div class="sync-btns">' +
          '<button class="btn" data-act="sync-copy">Copy sync code</button>' +
          (navigator.share ? '<button class="btn" data-act="sync-share">Share code…</button>' : '') +
          '<button class="btn primary" data-act="sync-paste">Paste sync code</button>' +
        '</div>' +
        (store.lastSync ? '<p class="sync-note">Last merged ' + esc(new Date(store.lastSync).toLocaleString()) + '.</p>' : '') +
      '</section>' +
      '<div class="foot">' +
        (CFG.backHref ? '<a href="' + CFG.backHref + '">' + (CFG.backLabel || 'Back') + '</a>' : '<a href="examplify.html">Full past papers in exam mode (laptop) →</a>') +
        (CFG.examHref ? '<a href="' + CFG.examHref + '">' + (CFG.examLabel || 'Full past papers →') + '</a>' : '') +
        '<span>Progress is saved in this browser; use the sync code to move it.</span>' +
        '<button data-act="reset">Reset all progress</button>' +
      '</div>' +
      '</main>';
  }
  function rowHtml(q) {
    var p = prog(q.id);
    var st = !p || !p.n ? '<span class="st none">○</span>'
      : p.c && p.last === 'ok' ? '<span class="st ok" title="Solved">✓</span>'
      : p.c ? '<span class="st ok" title="Solved before">✓</span>'
      : '<span class="st bad" title="Not solved yet">✗</span>';
    if (p && p.c && p.last !== 'ok') st = '<span class="st bad" title="Wrong last time">↻</span>';
    return '<a class="prow" href="#/q/' + encodeURIComponent(q.id) + '" data-act="open" data-id="' + q.id + '">' + st +
      '<span class="prow-main"><span class="prow-title">' + esc(q.t) + '</span>' +
      '<span class="prow-sub"><span>' + esc(groupName(q)) + ' · ' + esc(q.topic) + '</span><span>· ' + (TYPE_SHORT[q.type] || TYPE[q.type]) + '</span>' +
      (!GROUPS && q.lec >= NOT_REVISED_FROM ? '<span class="new">· not revised</span>' : '') +
      (isDue(q.id) ? '<span class="due">· due</span>' : '') +
      (isFlagged(q.id) ? '<span class="flag">⚑</span>' : '') + '</span></span>' +
      '<span class="diff d' + q.d + '">' + DIFF[q.d] + '</span></a>';
  }

  /* =====================================================================
     SYNC CODE — progress as a pasteable text code that merges on import
     ===================================================================== */
  var SYNC_PREFIX = 'CS1010E-SYNC1:';
  var LAST = { ok: 'o', bad: 'b', shown: 's' };
  var LAST_BACK = { o: 'ok', b: 'bad', s: 'shown' };

  // v2 adds the review box and due time to each question, and the mistake log.
  function makeSyncCode() {
    var p = {};
    Object.keys(store.p).forEach(function (id) {
      var e = store.p[id];
      if (!e || (!e.n && !e.flag)) return;
      p[id] = [e.n || 0, e.c || 0, LAST[e.last] || '', e.flag ? 1 : 0, Math.round((e.t || 0) / 1000),
        e.box == null ? -1 : e.box, e.due == null ? 0 : Math.round(e.due / 1000)];
    });
    var log = store.log.map(function (e) {
      return [e.id, Math.round(e.t / 1000), e.g, e.tr || '', e.n || '', e.how === 'shown' ? 's' : 'b', e.fx ? 1 : 0, e.auto ? 1 : 0];
    });
    var json = JSON.stringify({ v: 2, p: p, d: store.days, l: log });
    return SYNC_PREFIX + btoa(unescape(encodeURIComponent(json)));
  }

  function readSyncCode(text) {
    var s = String(text || '').replace(/\s+/g, '');
    var i = s.indexOf(SYNC_PREFIX);
    if (i < 0) throw new Error('That doesn\'t look like a sync code. It should start with ' + SYNC_PREFIX);
    var data;
    try { data = JSON.parse(decodeURIComponent(escape(atob(s.slice(i + SYNC_PREFIX.length))))); }
    catch (e) { throw new Error('The code is incomplete or damaged. Copy the whole code and try again.'); }
    if (!data || (data.v !== 1 && data.v !== 2) || typeof data.p !== 'object') throw new Error('This sync code is from an unknown version.');
    return data;
  }

  // Merge never loses work: attempt and correct counts take the larger value,
  // the most recent result wins, flags are kept from either side.
  function mergeSync(data) {
    var changed = 0;
    Object.keys(data.p).forEach(function (id) {
      if (!BY_ID[id]) return;
      var r = data.p[id];
      var inc = { n: r[0] || 0, c: r[1] || 0, last: LAST_BACK[r[2]], flag: !!r[3], t: (r[4] || 0) * 1000,
        box: r[5] == null || r[5] < 0 ? null : r[5], due: r[6] ? r[6] * 1000 : null };
      var cur = store.p[id];
      if (!cur) {
        var fresh = { n: inc.n, c: inc.c, t: inc.t };
        if (inc.last) fresh.last = inc.last;
        if (inc.flag) fresh.flag = true;
        if (inc.box != null) { fresh.box = inc.box; fresh.due = inc.due; }
        store.p[id] = fresh;
        changed++;
        return;
      }
      var before = JSON.stringify(cur);
      cur.n = Math.max(cur.n || 0, inc.n);
      cur.c = Math.max(cur.c || 0, inc.c);
      // The most recent attempt decides the result and the review schedule.
      if (inc.t > (cur.t || 0)) {
        if (inc.last) cur.last = inc.last;
        cur.t = inc.t;
        if (inc.box != null) { cur.box = inc.box; cur.due = inc.due; }
      }
      if (inc.flag) cur.flag = true;
      if (JSON.stringify(cur) !== before) changed++;
    });
    Object.keys(data.d || {}).forEach(function (day) {
      store.days[day] = Math.max(store.days[day] || 0, data.d[day] || 0);
    });
    // Mistake log: entries are matched by question and time; tags, notes and
    // "understood" marks are kept from whichever side has them.
    var byKey = {};
    store.log.forEach(function (e) { byKey[e.id + '@' + Math.round(e.t / 1000)] = e; });
    (data.l || []).forEach(function (r) {
      if (!BY_ID[r[0]]) return;
      var k = r[0] + '@' + r[1];
      var e = byKey[k];
      if (!e) {
        e = { id: r[0], t: r[1] * 1000, g: r[2] || '', tr: r[3] || '', n: r[4] || '', how: r[5] === 's' ? 'shown' : 'bad', auto: !!r[7] };
        if (r[6]) e.fx = true;
        store.log.push(e);
        byKey[k] = e;
        changed++;
        return;
      }
      var was = JSON.stringify(e);
      if (!e.tr && r[3]) e.tr = r[3];
      if ((r[4] || '').length > (e.n || '').length) e.n = r[4];
      if (r[6]) e.fx = true;
      if (JSON.stringify(e) !== was) changed++;
    });
    store.log.sort(function (a, b) { return a.t - b.t; });
    store.lastSync = Date.now();
    save();
    return changed;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return Promise.reject(new Error('no clipboard'));
  }

  function openModal(html) {
    closeModal();
    var m = document.createElement('div');
    m.className = 'modal-back';
    m.id = 'modal';
    m.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + html + '</div>';
    document.body.appendChild(m);
    m.addEventListener('click', function (e) {
      if (e.target === m || e.target.closest('[data-m="close"]')) closeModal();
      if (e.target.closest('[data-m="merge"]')) doMerge();
      if (e.target.closest('[data-m="copy"]')) {
        var t = m.querySelector('textarea');
        t.focus(); t.select();
        copyText(t.value).then(function () { toast('Sync code copied'); closeModal(); },
          function () { toast('Select the code and copy it'); });
      }
    });
    var ta = m.querySelector('textarea');
    if (ta) setTimeout(function () { ta.focus(); if (ta.readOnly) ta.select(); }, 50);
  }
  function closeModal() { var m = document.getElementById('modal'); if (m) m.remove(); }

  function showCodeModal(code) {
    openModal('<h3>Your sync code</h3>' +
      '<p class="sync-note">Copy this whole code and paste it into <b>Paste sync code</b> on your other device.</p>' +
      '<textarea class="sync-text" readonly>' + esc(code) + '</textarea>' +
      '<div class="modal-btns"><button class="btn" data-m="close">Close</button><button class="btn primary" data-m="copy">Copy</button></div>');
  }

  function showPasteModal() {
    openModal('<h3>Paste sync code</h3>' +
      '<p class="sync-note">Paste the code copied on your other device. It is merged into the progress here.</p>' +
      '<textarea class="sync-text" placeholder="' + SYNC_PREFIX + '…" autocomplete="off" autocapitalize="off" spellcheck="false"></textarea>' +
      '<p class="sync-err" id="sync-err" hidden></p>' +
      '<div class="modal-btns"><button class="btn" data-m="close">Cancel</button><button class="btn primary" data-m="merge">Merge progress</button></div>');
  }

  function doMerge() {
    var m = document.getElementById('modal');
    var err = document.getElementById('sync-err');
    try {
      var data = readSyncCode(m.querySelector('textarea').value);
      var n = mergeSync(data);
      closeModal();
      if (!cur) renderHome();
      toast(n ? 'Merged — ' + n + ' question' + (n === 1 ? '' : 's') + ' updated' : 'Already up to date');
    } catch (e) {
      err.textContent = e.message;
      err.hidden = false;
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('modal')) { e.stopImmediatePropagation(); closeModal(); }
  }, true);

  /* =====================================================================
     QUESTION
     ===================================================================== */
  var cur = null; // { q, order, done, result, values }

  function modeLabel() {
    if (session.mode === 'trap') return 'Trap: ' + esc(trapInfo(session.trap).name);
    return { shuffle: 'Shuffle', list: 'Problem list', mistakes: 'Mistakes', flagged: 'Flagged', review: 'Review', 'new': 'Unseen' }[session.mode] || 'Practice';
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  // Choose mode: an output question shown as options (the answer and its labelled wrong outputs).
  function choosing(q) { return q.type === 'out' && store.f.outMode === 'choose' && (q.wrong || []).length >= 2; }
  function optsOf(q) { return q.type === 'out' ? [q.ans].concat(q.wrong.map(function (w) { return w.a; })) : q.opts; }
  function openQuestion(q) {
    var asOpts = q.type === 'mcq' || choosing(q);
    cur = {
      q: q, choose: q.type === 'out' && asOpts,
      order: asOpts ? shuffle(optsOf(q).map(function (_, i) { return i; })) : null,
      done: false, result: null, traps: [], entry: null, guessed: false,
      values: q.type === 'fib' ? q.blanks.map(function () { return ''; }) : ['']
    };
    renderQuestion();
  }
  function renderQuestion() {
    var q = cur.q;
    var flagged = isFlagged(q.id);
    var score = session.done ? ' · <b>' + session.right + '/' + session.done + '</b>' : '';
    var html = '<header class="topbar"><div class="topbar-in">' +
      '<button class="icon-btn" data-act="home" aria-label="Back to problem list">' + ICON.back + '</button>' +
      '<div class="qbar-title">' + modeLabel() + score + '</div>' +
      '<button class="icon-btn' + (flagged ? ' on' : '') + '" data-act="flag" aria-label="' + (flagged ? 'Unflag' : 'Flag') + ' question" aria-pressed="' + flagged + '">' + (flagged ? ICON.flagOn : ICON.flag) + '</button>' +
      '<button class="icon-btn" data-act="theme" aria-label="Toggle dark mode">' + (isDark() ? ICON.sun : ICON.moon) + '</button>' +
      '</div></header>';

    var box = prog(q.id) && prog(q.id).n ? boxOf(q.id) : null;
    html += '<main class="wrap qview">';
    html += '<div class="meta">' +
      '<span class="pill">' + esc(groupName(q)) + ' · ' + esc(q.topic) + '</span>' +
      '<span class="pill d' + q.d + '">' + DIFF[q.d] + '</span>' +
      '<span class="pill">' + TYPE[q.type] + (cur.choose ? ' · choose' : '') + '</span>' +
      (box !== null ? '<span class="pill" title="Review box: right answers move it up, mistakes reset it">Box ' + box + '</span>' : '') +
      (!GROUPS && q.lec >= NOT_REVISED_FROM ? '<span class="pill warn">Lecture ' + q.lec + ' — not revised yet</span>' : '') +
      '</div>';
    html += '<h1 class="qtitle">' + esc(q.t) + '</h1>';

    var prompt = q.q || (q.type === 'out' ? 'What is printed?' : '');
    html += '<div class="prose">' + md(prompt) + '</div>';

    if (q.code) {
      html += codeBlock(q.code, q.type === 'fib' ? function (n) {
        var v = cur.values[n - 1];
        var cls = 'chip-blank' + (v ? ' filled' : '') + (cur.done ? (cur.blankOk && cur.blankOk[n - 1] ? ' ok' : ' bad') : '');
        return '<span class="' + cls + '" data-act="focus-blank" data-b="' + n + '" role="button" tabindex="-1">' + (v ? esc(v) : CIRCLED[n] || n) + '</span>';
      } : null);
    }
    if (q.q2) html += '<div class="prose">' + md(q.q2) + '</div>';

    if (cur.order) html += renderOptions();
    else html += renderTyped();

    if (cur.done) html += renderFeedback();
    html += '</main>';

    html += '<div class="actionbar"><div class="actionbar-in">' + actionButtons() + '</div></div>';
    app.innerHTML = html;
  }

  function renderOptions() {
    var q = cur.q;
    var opts = optsOf(q);
    var asCode = q.optCode || cur.choose;
    var letters = 'ABCDEFGH';
    return '<div class="opts' + (cur.done ? ' locked' : '') + '" role="list">' + cur.order.map(function (oi, pos) {
      var cls = 'opt';
      var mark = '';
      if (cur.done) {
        if (oi === 0) { cls += ' right'; mark = '✓'; }
        else if (oi === cur.picked) { cls += ' wrong'; mark = '✗'; }
      }
      var text = asCode ? codeBlock(opts[oi], null, true) : inline(opts[oi]);
      // After answering, every wrong option names the trap it was built to catch.
      var w = cur.done && oi > 0 && q.wrong ? q.wrong[oi - 1] : null;
      var tag = w ? '<span class="opt-trap">trap: ' + esc(trapInfo(w.trap).name) + '</span>' : '';
      return '<button class="' + cls + '" data-act="pick" data-i="' + oi + '"><span class="opt-letter">' + letters[pos] + '</span>' +
        '<span class="opt-text">' + text + tag + '</span><span class="opt-mark">' + mark + '</span></button>';
    }).join('') + '</div>';
  }

  var KEYS = ['(', ')', '[', ']', ':', ',', "'", '_', '=', '+', '-', '*', '/', '%', '<', '>', '.'];
  function renderTyped() {
    var q = cur.q;
    var dis = cur.done ? ' readonly' : '';
    var attrs = ' autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="done"';
    var html = '<div class="ans-block">';
    if (q.type === 'fib') {
      html += '<p class="ans-hint">Type the code for each blank. Spacing doesn\'t matter.</p>';
      q.blanks.forEach(function (_, i) {
        var cls = cur.done ? (cur.blankOk[i] ? ' ok' : ' bad') : '';
        html += '<label class="blank-row"><span class="blank-no">' + (CIRCLED[i + 1] || i + 1) + '</span>' +
          '<input class="ans-blank' + cls + '" data-b="' + (i + 1) + '" value="' + esc(cur.values[i]) + '" placeholder="blank ' + (i + 1) + '"' + attrs + dis + '></label>';
      });
    } else {
      html += '<p class="ans-hint">Type exactly what is printed (one line per printed line). If it raises an error, type the error name, e.g. <code>TypeError</code>.</p>';
      html += '<textarea class="ans-out' + (cur.done ? (cur.result === 'ok' ? ' ok' : ' bad') : '') + '" rows="3" placeholder="output…"' + attrs + dis + '>' + esc(cur.values[0]) + '</textarea>';
    }
    if (!cur.done) {
      html += '<div class="keys" aria-label="Symbols">' + KEYS.map(function (k) {
        return '<button type="button" data-act="key" data-k="' + esc(k) + '" aria-label="Insert ' + esc(k) + '">' + esc(k) + '</button>';
      }).join('') + '</div>';
    }
    return html + '</div>';
  }

  // The trap panel: which wrong belief this answer came from, and the if-then rule to fix it.
  function renderTrapPanel() {
    var q = cur.q;
    var r = cur.result;
    if (r === 'ok') {
      if (!q.trap) return '';
      var t = trapInfo(q.trap);
      return '<div class="trapbox ok"><div class="trap-lbl">This question tests</div><b>' + esc(t.name) + '</b>' +
        (t.rule ? '<p>' + esc(t.rule) + '</p>' : '') +
        (cur.guessed ? '<p class="trap-meta">Marked as a guess: it comes back tomorrow.</p>'
          : '<button class="link-btn" data-act="guess">I guessed — show it again sooner</button>') + '</div>';
    }
    var html = '<div class="trapbox bad">';
    if (cur.traps.length) {
      html += '<div class="trap-lbl">⚠ You fell into this trap</div>';
      cur.traps.forEach(function (w) {
        var t = trapInfo(w.trap);
        html += '<b>' + esc(t.name) + '</b>' + (w.why ? '<p>' + md(w.why).replace(/^<p>|<\/p>$/g, '') + '</p>' : '') +
          (t.rule ? '<p class="trap-rule">→ ' + esc(t.rule) + '</p>' : '');
      });
    } else {
      var ids = questionTraps(q);
      var picked = cur.entry && cur.entry.tr;
      html += '<div class="trap-lbl">' + (r === 'shown' ? 'Log it: what was missing?' : 'Which trap caught you?') + '</div>' +
        '<div class="chips trap-chips">' + ids.concat(['slip', 'unsure']).map(function (id) {
          return '<button class="chip' + (picked === id ? ' on' : '') + '" data-act="tag" data-trap="' + esc(id) + '">' + esc(trapInfo(id).name) + '</button>';
        }).join('') + '</div>';
      if (picked && TRAPS[picked] && TRAPS[picked].rule) html += '<p class="trap-rule">→ ' + esc(TRAPS[picked].rule) + '</p>';
    }
    html += '<label class="note-lbl">Why I got it wrong (one line, optional)' +
      '<input class="note-in" data-act="note" maxlength="200" placeholder="e.g. forgot range stops before 5" value="' + esc(cur.entry ? cur.entry.n : '') + '" autocomplete="off"></label>' +
      '<p class="trap-meta">Saved to your <a href="#/log">mistake log</a>.</p></div>';
    return html;
  }

  function renderFeedback() {
    var q = cur.q;
    var r = cur.result;
    var head = r === 'ok' ? '✓ Correct' : r === 'shown' ? 'Answer revealed' : '✗ Not quite';
    var body = '';
    if (q.type === 'fib') {
      body += q.blanks.map(function (alts, i) {
        var mine = cur.values[i];
        return '<div class="lbl">Blank ' + (CIRCLED[i + 1] || i + 1) + (r !== 'shown' ? (cur.blankOk[i] ? ' ✓' : ' ✗') : '') + '</div>' +
          codeBlock(alts[0], null, true) +
          (r === 'bad' && !cur.blankOk[i] && mine ? '<div class="also">You wrote: <code>' + esc(mine) + '</code></div>' : '') +
          (alts.length > 1 ? '<div class="also">Also accepted: ' + alts.slice(1).map(function (a) { return '<code>' + esc(a) + '</code>'; }).join(', ') + '</div>' : '');
      }).join('');
    } else if (q.type === 'out' && !cur.choose) {
      body += '<div class="lbl">Expected output</div>' + codeBlock(q.ans, null, true);
      if (r === 'bad' && cur.values[0].trim()) body += '<div class="lbl">Your answer</div>' + codeBlock(cur.values[0], null, true);
    } else if (r === 'bad') {
      var opts = optsOf(q);
      body += '<div class="lbl">Answer</div><div>' + (q.optCode || cur.choose ? codeBlock(opts[0], null, true) : inline(opts[0])) + '</div>';
    }
    var override = (r === 'bad' && q.type !== 'mcq' && !cur.choose)
      ? '<button class="override" data-act="override">My answer is equivalent — count it as correct</button>' : '';
    var when = whenText(prog(q.id));
    return '<div class="fb ' + r + '" role="status"><div class="fb-head">' + head + '</div>' +
      (body ? '<div class="fb-body">' + body + '</div>' : '') + override +
      (when ? '<div class="fb-when">' + esc(when) + '</div>' : '') + '</div>' +
      renderTrapPanel() +
      '<div class="explain"><h3>Explanation</h3><div class="prose">' + md(q.exp) + '</div></div>';
  }

  function actionButtons() {
    if (!cur.done) {
      if (cur.order) {
        return '<button class="btn" data-act="reveal">Show answer</button><button class="btn" data-act="skip">Skip →</button>';
      }
      return '<button class="btn" data-act="reveal">Show answer</button><button class="btn primary grow" data-act="check">Check</button>';
    }
    return '<button class="btn" data-act="retry">Try again</button><button class="btn primary grow" data-act="next">Next →</button>';
  }

  function givenText() {
    var q = cur.q;
    if (cur.order) return cur.picked != null ? optsOf(q)[cur.picked] : '';
    if (q.type === 'fib') return cur.values.map(function (v, i) { return (CIRCLED[i + 1] || i + 1) + ' ' + v; }).join('   ');
    return cur.values[0];
  }

  function record(ok, how) {
    var q = cur.q;
    var p = store.p[q.id] || (store.p[q.id] = { n: 0, c: 0 });
    cur.before = { box: p.box, due: p.due };
    schedule(p, ok ? 'ok' : 'bad');
    p.n++;
    if (ok) p.c++;
    p.last = ok ? 'ok' : (how || 'bad');
    p.t = Date.now();
    var d = today();
    store.days[d] = (store.days[d] || 0) + 1;
    if (!ok) {
      cur.traps = how === 'shown' ? [] : matchTraps(q, { choice: cur.order ? cur.picked : null, text: cur.values[0], values: cur.values });
      cur.entry = addLog(q, how === 'shown' ? '' : givenText(), how || 'bad', cur.traps);
      // Ask it again after three more questions, while the correction is fresh.
      session.queue = (session.queue || []).filter(function (r) { return r.id !== q.id; });
      session.queue.push({ id: q.id, at: session.done + 4 });
    }
    save();
    session.done++;
    if (ok) session.right++;
    session.recent.push(q.id);
    if (session.recent.length > 40) session.recent.shift();
    saveSession();
  }

  function finish(result) {
    cur.done = true;
    cur.result = result;
    record(result === 'ok', result);
    renderQuestion();
    var fb = document.querySelector('.fb');
    if (fb && fb.getBoundingClientRect().top > window.innerHeight * 0.55) {
      fb.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function check() {
    var q = cur.q;
    readInputs();
    if (q.type === 'fib') {
      if (cur.values.every(function (v) { return !v.trim(); })) { toast('Fill in the blanks first'); return; }
      cur.blankOk = q.blanks.map(function (alts, i) { return checkBlank(alts, cur.values[i]); });
      finish(cur.blankOk.every(Boolean) ? 'ok' : 'bad');
    } else {
      if (!cur.values[0].trim()) { toast('Type the output first'); return; }
      finish(checkOut(q, cur.values[0]) ? 'ok' : 'bad');
    }
  }
  function readInputs() {
    var q = cur.q;
    if (q.type === 'fib') {
      document.querySelectorAll('input.ans-blank').forEach(function (el) { cur.values[+el.dataset.b - 1] = el.value; });
    } else if (q.type === 'out' && !cur.choose) {
      var t = document.querySelector('textarea.ans-out');
      if (t) cur.values[0] = t.value;
    }
  }
  function goNext() {
    var next = pickNext(session.mode, cur && cur.q.id);
    if (!next) {
      toast(session.mode === 'mistakes' ? 'No mistakes left — nice!' : session.mode === 'review' ? 'All reviews done for now' : 'Nothing left in this set');
      go('#/');
      return;
    }
    history.replaceState(null, '', '#/q/' + encodeURIComponent(next.id));
    route();
  }

  /* =====================================================================
     MISTAKE LOG — every wrong or revealed answer, grouped by trap
     ===================================================================== */
  var logView = { show: 'open', limit: 60 };
  function answerText(q) {
    if (q.type === 'fib') return q.blanks.map(function (b, i) { return (CIRCLED[i + 1] || i + 1) + ' ' + b[0]; }).join('   ');
    return q.type === 'mcq' ? q.opts[0] : q.ans;
  }
  function fmtDate(t) {
    var d = new Date(t);
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) + ' ' +
      String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  function logEntries() {
    return store.log.map(function (e, i) { return { e: e, i: i }; }).filter(function (x) {
      if (!BY_ID[x.e.id]) return false;
      return logView.show === 'all' || (logView.show === 'open' ? !x.e.fx : !!x.e.fx);
    }).reverse();
  }
  function trapRow(t) {
    var info = t.id === 'untagged' ? { name: 'not tagged yet', rule: 'Open the entry below and pick the trap that caught you.' } : trapInfo(t.id);
    var n = t.id === 'untagged' ? 0 : QS.filter(function (q) { return testsTrap(q, t.id); }).length;
    return '<button class="trap-row" data-act="drill" data-trap="' + esc(t.id) + '"' + (n ? '' : ' disabled') + '>' +
      '<span class="trap-n">' + t.n + '×</span><span class="trap-main"><b>' + esc(info.name) + '</b>' +
      (info.rule ? '<small>' + esc(info.rule) + '</small>' : '') + '</span>' +
      '<span class="trap-go">' + (n ? 'Drill ' + n + ' →' : '') + '</span></button>';
  }
  function renderLog() {
    var all = logEntries();
    var counts = trapCounts(all.map(function (x) { return x.e; }));
    var qn = Object.keys(all.reduce(function (m, x) { m[x.e.id] = 1; return m; }, {})).length;
    var html = '<header class="topbar"><div class="topbar-in">' +
      '<button class="icon-btn" data-act="home" aria-label="Back">' + ICON.back + '</button>' +
      '<div class="qbar-title">Mistake log</div>' +
      '<button class="icon-btn" data-act="theme" aria-label="Toggle dark mode">' + (isDark() ? ICON.sun : ICON.moon) + '</button>' +
      '</div></header><main class="wrap home log">';
    html += '<p class="sync-note log-intro">Every wrong or revealed answer is logged here with the trap behind it. ' +
      'Read the rule, retry the question, then mark it <b>understood</b>. The questions also come back on their own through <b>Review due</b>.</p>';
    html += '<div class="seg log-seg" role="group">' + [['open', 'Open'], ['fixed', 'Understood'], ['all', 'All']].map(function (o) {
      return '<button data-act="log-show" data-v="' + o[0] + '" class="' + (logView.show === o[0] ? 'on' : '') + '">' + o[1] + '</button>';
    }).join('') + '</div>';
    if (!all.length) {
      html += '<div class="plist"><div class="empty">' + (logView.show === 'open' ? 'No open mistakes. Wrong answers are logged here automatically.' : 'Nothing here yet.') + '</div></div>';
    } else {
      html += '<section class="card traps-card"><h2>By trap · ' + all.length + ' mistake' + (all.length === 1 ? '' : 's') +
        ' on ' + qn + ' question' + (qn === 1 ? '' : 's') + '</h2>' + counts.map(trapRow).join('') + '</section>';
      html += all.slice(0, logView.limit).map(function (x) {
        var e = x.e, q = BY_ID[e.id];
        var t = e.tr ? trapInfo(e.tr) : null;
        var p = prog(e.id);
        var now = p && p.last === 'ok' ? '<span class="log-now ok">✓ right last time · box ' + boxOf(e.id) + '</span>' : '<span class="log-now bad">✗ not fixed yet</span>';
        return '<article class="card log-entry' + (e.fx ? ' fixed' : '') + '">' +
          '<div class="log-head"><a href="#/q/' + encodeURIComponent(e.id) + '" data-act="open" data-id="' + e.id + '">' + esc(q.t) + '</a>' +
          '<span>' + esc(groupName(q)) + ' · ' + esc(q.topic) + ' · ' + fmtDate(e.t) + '</span></div>' +
          '<div class="log-ans"><div><span class="lbl">You</span><code>' + esc(e.how === 'shown' ? '(revealed the answer)' : e.g || '(blank)') + '</code></div>' +
          '<div><span class="lbl">Answer</span><code>' + esc(answerText(q)) + '</code></div></div>' +
          (t ? '<div class="log-trap"><b>Trap: ' + esc(t.name) + '</b>' + (e.auto ? ' <small>(matched from your answer)</small>' : '') +
            (t.rule ? '<p>→ ' + esc(t.rule) + '</p>' : '') + '</div>'
            : '<div class="log-trap untagged">No trap tagged yet. Retry it and pick the one that caught you.</div>') +
          '<textarea class="log-note" data-i="' + x.i + '" rows="1" placeholder="Why I got it wrong…">' + esc(e.n || '') + '</textarea>' +
          '<div class="log-foot">' + now + '<span class="log-btns">' +
            '<a class="link-btn" href="#/q/' + encodeURIComponent(e.id) + '" data-act="open" data-id="' + e.id + '">Retry</a>' +
            '<button class="link-btn" data-act="log-fix" data-i="' + x.i + '">' + (e.fx ? 'Reopen' : 'Mark understood') + '</button>' +
            '<button class="link-btn muted" data-act="log-del" data-i="' + x.i + '">Delete</button>' +
          '</span></div></article>';
      }).join('');
      if (all.length > logView.limit) html += '<button class="btn more" data-act="log-more">Show more (' + (all.length - logView.limit) + ' left)</button>';
    }
    html += '<div class="sync-btns log-export"><button class="btn" data-act="log-copy"' + (store.log.length ? '' : ' disabled') + '>Copy log as text</button></div>' +
      '<p class="sync-note">The log is saved in this browser and travels with the sync code.</p></main>';
    app.innerHTML = html;
  }
  function logAsText() {
    var rows = store.log.filter(function (e) { return BY_ID[e.id]; }).map(function (e) {
      var q = BY_ID[e.id];
      return '- [' + (e.fx ? 'x' : ' ') + '] ' + e.id + ' ' + q.t + ' (' + fmtDate(e.t) + ')\n' +
        '    you: ' + (e.how === 'shown' ? '(revealed)' : (e.g || '(blank)').replace(/\n/g, ' / ')) + '\n' +
        '    answer: ' + String(answerText(q)).replace(/\n/g, ' / ') + '\n' +
        (e.tr ? '    trap: ' + trapInfo(e.tr).name + (TRAPS[e.tr] ? ' -> ' + TRAPS[e.tr].rule : '') + '\n' : '') +
        (e.n ? '    note: ' + e.n + '\n' : '');
    });
    return 'CS1010E practice mistake log\n\n' + rows.join('');
  }


  /* =====================================================================
     ROUTING & EVENTS
     ===================================================================== */
  function go(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  }
  function route() {
    var m = location.hash.match(/^#\/q\/(.+)$/);
    var q = m && BY_ID[decodeURIComponent(m[1])];
    if (q) {
      if (!cur || cur.q !== q || cur.stale) openQuestion(q);
      else renderQuestion();
    } else if (location.hash === '#/log') {
      cur = null;
      renderLog();
    } else {
      cur = null;
      renderHome();
    }
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', function () { if (cur) cur.stale = true; route(); });

  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.dataset.act;
    switch (act) {
      case 'theme':
        store.theme = isDark() ? 'light' : 'dark';
        save(); applyTheme();
        if (cur) { readInputs(); renderQuestion(); } else if (location.hash === '#/log') renderLog(); else renderHome();
        break;
      case 'lec': {
        var l = +el.dataset.v;
        var i = store.f.lecs.indexOf(l);
        if (i >= 0) store.f.lecs.splice(i, 1); else store.f.lecs.push(l);
        store.f.lecs.sort(function (a, b) { return a - b; });
        shown = PAGE; save(); renderHome();
        break;
      }
      case 'group': {
        var gid = el.dataset.v;
        var gi = store.f.lecs.indexOf(gid);
        if (gi >= 0) store.f.lecs.splice(gi, 1); else store.f.lecs.push(gid);
        shown = PAGE; save(); renderHome();
        break;
      }
      case 'preset': {
        store.f.lecs = CFG.presets[+el.dataset.i].ids.slice();
        shown = PAGE; save(); renderHome();
        break;
      }
      case 'lecs':
        store.f.lecs = el.dataset.v === 'all' ? LECS.slice()
          : el.dataset.v === 'revised' ? LECS.filter(function (l) { return l < NOT_REVISED_FROM; })
          : LECS.filter(function (l) { return l >= NOT_REVISED_FROM; });
        shown = PAGE; save(); renderHome();
        break;
      case 'seg': {
        var k = el.dataset.k, v = el.dataset.v;
        store.f[k] = k === 'diff' ? +v : v;
        shown = PAGE; save(); renderHome();
        break;
      }
      case 'more':
        shown += PAGE; renderHome();
        break;
      case 'start':
      case 'drill': {
        session = { mode: act === 'drill' ? 'trap' : el.dataset.mode, done: 0, right: 0, recent: [], queue: [] };
        if (act === 'drill') session.trap = el.dataset.trap;
        saveSession();
        var first = pickNext(session.mode, null);
        if (first) go('#/q/' + encodeURIComponent(first.id));
        else toast('No questions in this set');
        break;
      }
      case 'open':
        if (session.mode !== 'list') { session = { mode: 'list', done: 0, right: 0, recent: [] }; saveSession(); }
        if (cur) cur.stale = true;
        break; // the link's own navigation does the rest
      case 'sync-copy': {
        var code = makeSyncCode();
        copyText(code).then(function () { toast('Sync code copied — paste it on your other device'); },
          function () { showCodeModal(code); });
        break;
      }
      case 'sync-share':
        navigator.share({ title: 'CS1010E practice progress', text: makeSyncCode() }).catch(function () { /* cancelled */ });
        break;
      case 'sync-paste':
        showPasteModal();
        break;
      case 'reset':
        if (window.confirm('Clear all your practice progress on this device?')) {
          var keepTheme = store.theme;
          store = defaults(); store.theme = keepTheme; save();
          session = { mode: 'list', done: 0, right: 0, recent: [] }; saveSession();
          renderHome(); toast('Progress cleared');
        }
        break;
      case 'home':
        if (history.length > 1 && document.referrer === '' && location.hash.indexOf('#/q/') === 0) go('#/');
        else go('#/');
        break;
      case 'flag': {
        readInputs();
        var p = store.p[cur.q.id] || (store.p[cur.q.id] = { n: 0, c: 0 });
        p.flag = !p.flag; save();
        renderQuestion();
        toast(p.flag ? 'Flagged for later' : 'Flag removed');
        break;
      }
      case 'pick':
        if (cur.done) return;
        cur.picked = +el.dataset.i;
        finish(cur.picked === 0 ? 'ok' : 'bad');
        break;
      case 'check':
        check();
        break;
      case 'reveal':
        readInputs();
        if (cur.q.type === 'fib') cur.blankOk = cur.q.blanks.map(function (alts, i) { return checkBlank(alts, cur.values[i]); });
        finish('shown');
        break;
      case 'skip':
        goNext();
        break;
      case 'retry':
        openQuestion(cur.q);
        window.scrollTo(0, 0);
        break;
      case 'next':
        goNext();
        break;
      case 'override': {
        var pp = store.p[cur.q.id];
        if (pp) {
          pp.c++;
          // Undo the wrong-answer scheduling and the log entry: it was right after all.
          pp.box = cur.before.box; pp.due = cur.before.due;
          schedule(pp, 'ok');
          pp.last = 'ok';
          if (cur.entry) { store.log.splice(store.log.indexOf(cur.entry), 1); cur.entry = null; }
          cur.traps = [];
          save();
        }
        session.queue = (session.queue || []).filter(function (r) { return r.id !== cur.q.id; });
        session.right++; saveSession();
        cur.result = 'ok';
        if (cur.blankOk) cur.blankOk = cur.blankOk.map(function () { return true; });
        renderQuestion();
        toast('Counted as correct');
        break;
      }
      case 'log-show':
        logView.show = el.dataset.v; logView.limit = 60; renderLog();
        break;
      case 'log-more':
        logView.limit += 60; renderLog();
        break;
      case 'log-fix': {
        var lf = store.log[+el.dataset.i];
        if (lf) { lf.fx = !lf.fx; save(); renderLog(); toast(lf.fx ? 'Marked understood' : 'Reopened'); }
        break;
      }
      case 'log-del':
        if (window.confirm('Delete this entry from your mistake log?')) { store.log.splice(+el.dataset.i, 1); save(); renderLog(); }
        break;
      case 'log-copy': {
        var txt = logAsText();
        copyText(txt).then(function () { toast('Mistake log copied'); }, function () {
          openModal('<h3>Mistake log</h3><textarea class="sync-text" readonly>' + esc(txt) + '</textarea>' +
            '<div class="modal-btns"><button class="btn" data-m="close">Close</button><button class="btn primary" data-m="copy">Copy</button></div>');
        });
        break;
      }
      case 'guess': {
        var pg = store.p[cur.q.id];
        if (pg) { pg.box = cur.before.box; pg.due = cur.before.due; schedule(pg, 'guess'); save(); }
        cur.guessed = true;
        renderQuestion();
        toast('It will come back tomorrow');
        break;
      }
      case 'tag': {
        if (!cur.entry) return;
        cur.entry.tr = cur.entry.tr === el.dataset.trap ? '' : el.dataset.trap;
        save();
        var keep = document.querySelector('input.note-in');
        if (keep) cur.entry.n = keep.value;
        renderQuestion();
        var box = document.querySelector('.trapbox');
        if (box) box.scrollIntoView({ block: 'nearest' });
        break;
      }
      case 'focus-blank': {
        var inp = document.querySelector('input.ans-blank[data-b="' + el.dataset.b + '"]');
        if (inp && !cur.done) { inp.focus(); inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        break;
      }
      case 'key': {
        var target = lastField && document.body.contains(lastField) ? lastField
          : document.querySelector('input.ans-blank, textarea.ans-out');
        if (!target) return;
        insertAt(target, el.dataset.k);
        break;
      }
    }
  });

  // Keep focus in the text field when a symbol key is tapped.
  app.addEventListener('pointerdown', function (e) {
    if (e.target.closest('[data-act="key"]')) e.preventDefault();
  });
  var lastField = null;
  app.addEventListener('focusin', function (e) {
    if (e.target.matches('input.ans-blank, textarea.ans-out')) lastField = e.target;
  });
  function insertAt(el, text) {
    var s = el.selectionStart == null ? el.value.length : el.selectionStart;
    var t = el.selectionEnd == null ? el.value.length : el.selectionEnd;
    el.value = el.value.slice(0, s) + text + el.value.slice(t);
    el.selectionStart = el.selectionEnd = s + text.length;
    el.focus();
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  app.addEventListener('input', function (e) {
    var el = e.target;
    if (el.matches('input.ans-blank')) {
      var n = +el.dataset.b;
      cur.values[n - 1] = el.value;
      var chip = document.querySelector('.chip-blank[data-b="' + n + '"]');
      if (chip) {
        chip.textContent = el.value || CIRCLED[n] || n;
        chip.classList.toggle('filled', !!el.value);
      }
    } else if (el.matches('textarea.ans-out')) {
      cur.values[0] = el.value;
    } else if (el.matches('input.note-in')) {
      if (cur && cur.entry) { cur.entry.n = el.value; clearTimeout(save.t); save.t = setTimeout(save, 300); }
    } else if (el.matches('textarea.log-note')) {
      var le = store.log[+el.dataset.i];
      if (le) { le.n = el.value; clearTimeout(save.t); save.t = setTimeout(save, 300); }
    } else if (el.matches('input.search')) {
      store.f.search = el.value;
      save();
      clearTimeout(renderHome.t);
      renderHome.t = setTimeout(function () {
        var pos = el.selectionStart;
        renderHome();
        var s = document.querySelector('input.search');
        if (s) { s.focus(); s.setSelectionRange(pos, pos); }
      }, 180);
    }
  });

  app.addEventListener('keydown', function (e) {
    if (!cur || cur.done) return;
    if (e.key === 'Enter' && e.target.matches('input.ans-blank')) {
      e.preventDefault();
      var next = document.querySelector('input.ans-blank[data-b="' + (+e.target.dataset.b + 1) + '"]');
      if (next && !next.value) next.focus(); else check();
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && e.target.matches('textarea.ans-out')) {
      e.preventDefault();
      check();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!cur || e.target.matches('input, textarea')) return;
    if (!cur.done && cur.order && /^[a-hA-H1-8]$/.test(e.key)) {
      var pos = /\d/.test(e.key) ? +e.key - 1 : e.key.toUpperCase().charCodeAt(0) - 65;
      if (pos < cur.order.length) {
        cur.picked = cur.order[pos];
        finish(cur.picked === 0 ? 'ok' : 'bad');
      }
    } else if (cur.done && (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'n')) {
      goNext();
    } else if (e.key === 'Escape') {
      go('#/');
    }
  });

  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onScheme = function () { if (!store.theme) { if (cur) { readInputs(); renderQuestion(); } else renderHome(); } };
    if (mq.addEventListener) mq.addEventListener('change', onScheme);
  }

  // Expose the graders for the self-test in tools/ (harmless in the page).
  window.__practice = { normCode: normCode, normOut: normOut, checkOut: checkOut, checkBlank: checkBlank, highlight: highlight };

  route();
})();
