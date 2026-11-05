/* CS1010E on-the-go practice.
   A phone-first question runner, separate from the Examplify exam clone.
   Routes:  #/            problem list + filters
            #/q/<id>      one question
   Progress lives in localStorage (this browser only).                     */
(function () {
  'use strict';

  var QS = (window.PRACTICE_QUESTIONS || []).slice();
  var BY_ID = {};
  QS.forEach(function (q) { BY_ID[q.id] = q; });
  QS.sort(function (a, b) {
    return a.lec - b.lec || (+a.id.split('-')[1]) - (+b.id.split('-')[1]);
  });

  var LECS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  var NOT_REVISED_FROM = 9;
  var LEC_NAMES = {
    1: 'Problem solving', 2: 'Expressions & functions', 3: 'Sequences & iterables',
    4: 'Statements & loops', 5: 'Recursion', 6: 'Objects & lists', 7: 'List processing',
    8: 'Dictionaries', 9: '2D arrays', 10: 'Searching & sorting', 11: 'OOP'
  };
  var DIFF = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
  var TYPE = { mcq: 'Multiple choice', fib: 'Fill in the blank', out: 'Predict the output' };
  var CIRCLED = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];
  var PAGE = 60;

  /* ---------------- storage ---------------- */
  var KEY = 'cs1010e-practice-v1';
  var SKEY = 'cs1010e-practice-session';
  function defaults() {
    return { p: {}, f: { lecs: LECS.slice(), type: 'all', diff: 0, status: 'all' }, days: {}, theme: null };
  }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.p && s.f) { s.days = s.days || {}; return s; }
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
    if (f.lecs.indexOf(q.lec) < 0) return false;
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
      var hay = (q.t + ' ' + q.topic + ' ' + q.id + ' ' + LEC_NAMES[q.lec]).toLowerCase();
      if (hay.indexOf(s) < 0) return false;
    }
    return true;
  }
  function filtered() { return QS.filter(function (q) { return matches(q, store.f); }); }
  function poolFor(mode) {
    var f = store.f;
    if (mode === 'mistakes') return QS.filter(function (q) { return f.lecs.indexOf(q.lec) >= 0 && isWrong(q.id); });
    if (mode === 'flagged') return QS.filter(function (q) { return isFlagged(q.id); });
    return filtered();
  }
  function weight(q) {
    var p = prog(q.id);
    if (!p || !p.n) return 3;
    if (p.last === 'bad' || p.last === 'shown') return 4;
    return p.flag ? 2 : 1;
  }
  function pickNext(mode, currentId) {
    var pool = poolFor(mode);
    if (!pool.length) return null;
    if (mode === 'list') {
      var i = pool.findIndex(function (q) { return q.id === currentId; });
      return pool[(i + 1) % pool.length];
    }
    var avoid = Math.min(15, pool.length - 1);
    var recent = session.recent.slice(-avoid);
    var cands = pool.filter(function (q) { return recent.indexOf(q.id) < 0 && q.id !== currentId; });
    if (!cands.length) cands = pool;
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
    return {
      solved: solved, tried: tried,
      acc: attempts ? Math.round(100 * correct / attempts) : null,
      today: store.days[today()] || 0, streak: streak
    };
  }

  /* =====================================================================
     HOME
     ===================================================================== */
  var shown = PAGE;
  function topbarHome() {
    return '<header class="topbar"><div class="topbar-in">' +
      '<div class="brand"><span class="brand-mark">PY</span>CS1010E Practice</div>' +
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

    var lecChips = LECS.map(function (l) {
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

    app.innerHTML = topbarHome() +
      '<main class="wrap home">' +
      '<div class="stats">' +
        '<div class="stat"><b>' + s.solved + '<small>/' + QS.length + '</small></b><span>solved</span></div>' +
        '<div class="stat"><b>' + (s.acc === null ? '–' : s.acc + '%') + '</b><span>accuracy</span></div>' +
        '<div class="stat"><b>' + s.today + '</b><span>today</span></div>' +
        '<div class="stat"><b>' + s.streak + '</b><span>day streak</span></div>' +
      '</div>' +
      '<div class="ring-bar" aria-hidden="true"><i style="width:' + pct + '%"></i></div>' +
      '<div class="cta">' +
        '<button class="btn primary big" data-act="start" data-mode="shuffle"' + (list.length ? '' : ' disabled') + '>▶ Shuffle practice <small>(' + list.length + ')</small></button>' +
        '<button class="btn" data-act="start" data-mode="mistakes"' + (mistakes ? '' : ' disabled') + '>↻ Redo mistakes <small>' + mistakes + '</small></button>' +
        '<button class="btn" data-act="start" data-mode="flagged"' + (flagged ? '' : ' disabled') + '>⚑ Flagged <small>' + flagged + '</small></button>' +
      '</div>' +
      '<section class="card">' +
        '<h2>Filter</h2>' +
        '<div class="frow"><div class="flabel">Lectures' +
          '<span><button data-act="lecs" data-v="all">All</button><button data-act="lecs" data-v="revised">L1–8</button><button data-act="lecs" data-v="new">L9–11</button></span></div>' +
          '<div class="chips">' + lecChips + '</div>' +
          '<div class="legend"><span class="dot"></span> Lecture 9 onwards — not revised yet</div></div>' +
        '<div class="frow"><div class="flabel">Type</div>' + seg('type', [['all', 'All'], ['mcq', 'MCQ'], ['fib', 'Fill-in'], ['out', 'Output']]) + '</div>' +
        '<div class="frow"><div class="flabel">Difficulty</div>' + seg('diff', [[0, 'All'], [1, 'Easy'], [2, 'Medium'], [3, 'Hard']]) + '</div>' +
        '<div class="frow"><div class="flabel">Status</div>' + seg('status', [['all', 'All'], ['new', 'New'], ['wrong', 'Wrong'], ['solved', 'Solved'], ['flagged', '⚑']]) + '</div>' +
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
        '<a href="examplify.html">Full past papers in exam mode (laptop) →</a>' +
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
      '<span class="prow-sub"><span>L' + q.lec + ' · ' + esc(q.topic) + '</span><span>· ' + TYPE[q.type].split(' ')[0] + (q.type === 'fib' ? '-in' : q.type === 'out' ? ' output' : '') + '</span>' +
      (q.lec >= NOT_REVISED_FROM ? '<span class="new">· not revised</span>' : '') +
      (isFlagged(q.id) ? '<span class="flag">⚑</span>' : '') + '</span></span>' +
      '<span class="diff d' + q.d + '">' + DIFF[q.d] + '</span></a>';
  }

  /* =====================================================================
     SYNC CODE — progress as a pasteable text code that merges on import
     ===================================================================== */
  var SYNC_PREFIX = 'CS1010E-SYNC1:';
  var LAST = { ok: 'o', bad: 'b', shown: 's' };
  var LAST_BACK = { o: 'ok', b: 'bad', s: 'shown' };

  function makeSyncCode() {
    var p = {};
    Object.keys(store.p).forEach(function (id) {
      var e = store.p[id];
      if (!e || (!e.n && !e.flag)) return;
      p[id] = [e.n || 0, e.c || 0, LAST[e.last] || '', e.flag ? 1 : 0, Math.round((e.t || 0) / 1000)];
    });
    var json = JSON.stringify({ v: 1, p: p, d: store.days });
    return SYNC_PREFIX + btoa(unescape(encodeURIComponent(json)));
  }

  function readSyncCode(text) {
    var s = String(text || '').replace(/\s+/g, '');
    var i = s.indexOf(SYNC_PREFIX);
    if (i < 0) throw new Error('That doesn\'t look like a sync code. It should start with ' + SYNC_PREFIX);
    var data;
    try { data = JSON.parse(decodeURIComponent(escape(atob(s.slice(i + SYNC_PREFIX.length))))); }
    catch (e) { throw new Error('The code is incomplete or damaged. Copy the whole code and try again.'); }
    if (!data || data.v !== 1 || typeof data.p !== 'object') throw new Error('This sync code is from an unknown version.');
    return data;
  }

  // Merge never loses work: attempt and correct counts take the larger value,
  // the most recent result wins, flags are kept from either side.
  function mergeSync(data) {
    var changed = 0;
    Object.keys(data.p).forEach(function (id) {
      if (!BY_ID[id]) return;
      var r = data.p[id];
      var inc = { n: r[0] || 0, c: r[1] || 0, last: LAST_BACK[r[2]], flag: !!r[3], t: (r[4] || 0) * 1000 };
      var cur = store.p[id];
      if (!cur) {
        var fresh = { n: inc.n, c: inc.c, t: inc.t };
        if (inc.last) fresh.last = inc.last;
        if (inc.flag) fresh.flag = true;
        store.p[id] = fresh;
        changed++;
        return;
      }
      var before = JSON.stringify(cur);
      cur.n = Math.max(cur.n || 0, inc.n);
      cur.c = Math.max(cur.c || 0, inc.c);
      if (inc.t > (cur.t || 0)) { if (inc.last) cur.last = inc.last; cur.t = inc.t; }
      if (inc.flag) cur.flag = true;
      if (JSON.stringify(cur) !== before) changed++;
    });
    Object.keys(data.d || {}).forEach(function (day) {
      store.days[day] = Math.max(store.days[day] || 0, data.d[day] || 0);
    });
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
    return { shuffle: 'Shuffle', list: 'Problem list', mistakes: 'Mistakes', flagged: 'Flagged' }[session.mode] || 'Practice';
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function openQuestion(q) {
    cur = {
      q: q,
      order: q.type === 'mcq' ? shuffle(q.opts.map(function (_, i) { return i; })) : null,
      done: false, result: null,
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

    html += '<main class="wrap qview">';
    html += '<div class="meta">' +
      '<span class="pill">L' + q.lec + ' · ' + esc(q.topic) + '</span>' +
      '<span class="pill d' + q.d + '">' + DIFF[q.d] + '</span>' +
      '<span class="pill">' + TYPE[q.type] + '</span>' +
      (q.lec >= NOT_REVISED_FROM ? '<span class="pill warn">Lecture ' + q.lec + ' — not revised yet</span>' : '') +
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

    if (q.type === 'mcq') html += renderOptions();
    else html += renderTyped();

    if (cur.done) html += renderFeedback();
    html += '</main>';

    html += '<div class="actionbar"><div class="actionbar-in">' + actionButtons() + '</div></div>';
    app.innerHTML = html;
  }

  function renderOptions() {
    var q = cur.q;
    var letters = 'ABCDEFGH';
    return '<div class="opts' + (cur.done ? ' locked' : '') + '" role="list">' + cur.order.map(function (oi, pos) {
      var cls = 'opt';
      var mark = '';
      if (cur.done) {
        if (oi === q.ans) { cls += ' right'; mark = '✓'; }
        else if (oi === cur.picked) { cls += ' wrong'; mark = '✗'; }
      }
      var text = q.optCode ? codeBlock(q.opts[oi], null, true) : inline(q.opts[oi]);
      return '<button class="' + cls + '" data-act="pick" data-i="' + oi + '"><span class="opt-letter">' + letters[pos] + '</span>' +
        '<span class="opt-text">' + text + '</span><span class="opt-mark">' + mark + '</span></button>';
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
    } else if (q.type === 'out') {
      body += '<div class="lbl">Expected output</div>' + codeBlock(q.ans, null, true);
      if (r === 'bad' && cur.values[0].trim()) body += '<div class="lbl">Your answer</div>' + codeBlock(cur.values[0], null, true);
    } else if (r === 'bad') {
      body += '<div class="lbl">Answer</div><div>' + (q.optCode ? codeBlock(q.opts[q.ans], null, true) : inline(q.opts[q.ans])) + '</div>';
    }
    var override = (r === 'bad' && q.type !== 'mcq')
      ? '<button class="override" data-act="override">My answer is equivalent — count it as correct</button>' : '';
    return '<div class="fb ' + r + '" role="status"><div class="fb-head">' + head + '</div>' +
      (body ? '<div class="fb-body">' + body + '</div>' : '') + override + '</div>' +
      '<div class="explain"><h3>Explanation</h3><div class="prose">' + md(q.exp) + '</div></div>';
  }

  function actionButtons() {
    if (!cur.done) {
      if (cur.q.type === 'mcq') {
        return '<button class="btn" data-act="reveal">Show answer</button><button class="btn" data-act="skip">Skip →</button>';
      }
      return '<button class="btn" data-act="reveal">Show answer</button><button class="btn primary grow" data-act="check">Check</button>';
    }
    return '<button class="btn" data-act="retry">Try again</button><button class="btn primary grow" data-act="next">Next →</button>';
  }

  function record(ok, how) {
    var q = cur.q;
    var p = store.p[q.id] || (store.p[q.id] = { n: 0, c: 0 });
    p.n++;
    if (ok) p.c++;
    p.last = ok ? 'ok' : (how || 'bad');
    p.t = Date.now();
    var d = today();
    store.days[d] = (store.days[d] || 0) + 1;
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
    } else if (q.type === 'out') {
      var t = document.querySelector('textarea.ans-out');
      if (t) cur.values[0] = t.value;
    }
  }
  function goNext() {
    var next = pickNext(session.mode, cur && cur.q.id);
    if (!next) {
      toast(session.mode === 'mistakes' ? 'No mistakes left — nice!' : 'Nothing left in this set');
      go('#/');
      return;
    }
    history.replaceState(null, '', '#/q/' + encodeURIComponent(next.id));
    route();
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
        if (cur) { readInputs(); renderQuestion(); } else renderHome();
        break;
      case 'lec': {
        var l = +el.dataset.v;
        var i = store.f.lecs.indexOf(l);
        if (i >= 0) store.f.lecs.splice(i, 1); else store.f.lecs.push(l);
        store.f.lecs.sort(function (a, b) { return a - b; });
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
      case 'start': {
        session = { mode: el.dataset.mode, done: 0, right: 0, recent: [] };
        saveSession();
        var first = pickNext(session.mode, null);
        if (first) go('#/q/' + encodeURIComponent(first.id));
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
        finish(cur.picked === cur.q.ans ? 'ok' : 'bad');
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
        if (pp) { pp.c++; pp.last = 'ok'; save(); }
        session.right++; saveSession();
        cur.result = 'ok';
        if (cur.blankOk) cur.blankOk = cur.blankOk.map(function () { return true; });
        renderQuestion();
        toast('Counted as correct');
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
    if (!cur.done && cur.q.type === 'mcq' && /^[a-hA-H1-8]$/.test(e.key)) {
      var pos = /\d/.test(e.key) ? +e.key - 1 : e.key.toUpperCase().charCodeAt(0) - 65;
      if (pos < cur.order.length) {
        cur.picked = cur.order[pos];
        finish(cur.picked === cur.q.ans ? 'ok' : 'bad');
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
