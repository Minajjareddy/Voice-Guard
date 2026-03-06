// ─── CURSOR ───────────────────────────────────────────────────────────────────
const cur = document.getElementById('cur');
const ring = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});

setInterval(() => {
  rx += (mx - rx) * .18;
  ry += (my - ry) * .18;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
}, 16);

document.querySelectorAll('a,button,[onclick]').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hover'); ring.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); ring.classList.remove('hover'); });
});

// ─── NAV SCROLL ───────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── MODALS ───────────────────────────────────────────────────────────────────
function openModal(type) {
  document.getElementById(type + 'Modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(type) {
  document.getElementById(type + 'Modal').classList.remove('open');
  document.body.style.overflow = '';
}

function switchModal(from, to) {
  closeModal(from);
  setTimeout(() => openModal(to), 220);
}

document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => {
    if (e.target === o) {
      o.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ─── FORM VALIDATION ──────────────────────────────────────────────────────────
function validate(val, type) {
  if (type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  if (type === 'pass') return val.length >= 8;
  return val.trim().length > 0;
}

function setErr(grpId, hasErr) {
  const g = document.getElementById(grpId);
  g.classList.toggle('has-error', hasErr);
  g.querySelector('input').classList.toggle('input-error', hasErr);
}

function handleLogin() {
  const email = document.getElementById('lEmail').value;
  const pass = document.getElementById('lPass').value;
  let ok = true;
  if (!validate(email, 'email')) { setErr('lEmailGrp', true); ok = false; } else { setErr('lEmailGrp', false); }
  if (!validate(pass, 'pass')) { setErr('lPassGrp', true); ok = false; } else { setErr('lPassGrp', false); }
  if (!ok) return;
  document.getElementById('loginFormWrap').style.display = 'none';
  document.getElementById('loginSuccess').style.display = 'block';
  setTimeout(() => {
    closeModal('login');
    setTimeout(() => {
      document.getElementById('loginFormWrap').style.display = 'block';
      document.getElementById('loginSuccess').style.display = 'none';
    }, 500);
  }, 2200);
}

function handleSignup() {
  const first = document.getElementById('sFirst').value;
  const last = document.getElementById('sLast').value;
  const email = document.getElementById('sEmail').value;
  const pass = document.getElementById('sPass').value;
  let ok = true;
  if (!validate(first, 'text')) { setErr('sFirstGrp', true); ok = false; } else { setErr('sFirstGrp', false); }
  if (!validate(last, 'text')) { setErr('sLastGrp', true); ok = false; } else { setErr('sLastGrp', false); }
  if (!validate(email, 'email')) { setErr('sEmailGrp', true); ok = false; } else { setErr('sEmailGrp', false); }
  if (!validate(pass, 'pass')) { setErr('sPassGrp', true); ok = false; } else { setErr('sPassGrp', false); }
  if (!ok) return;
  document.getElementById('signupFormWrap').style.display = 'none';
  document.getElementById('signupSuccess').style.display = 'block';
  setTimeout(() => {
    closeModal('signup');
    setTimeout(() => {
      document.getElementById('signupFormWrap').style.display = 'block';
      document.getElementById('signupSuccess').style.display = 'none';
    }, 500);
  }, 2500);
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ─── DEMO ─────────────────────────────────────────────────────────────────────
let currentSample = 'forged';

function selectSample(btn, type) {
  document.querySelectorAll('.sample-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentSample = type;
}

function runAnalysis() {
  const data = {
    forged:  { score: 70, m1: 84, m2: 71, m3: 62, m4: 18, verdict: 'AI-Generated',  safe: false },
    safe:    { score: 12, m1:  9, m2: 15, m3:  8, m4: 91, verdict: 'Authentic Voice', safe: true  },
    forged2: { score: 88, m1: 92, m2: 85, m3: 78, m4: 11, verdict: 'AI-Generated',  safe: false }
  };
  const d = data[currentSample];

  document.getElementById('scoreNum').textContent = d.score + '%';
  const offset = 314 - (314 * d.score / 100);
  document.getElementById('scoreArc').style.strokeDashoffset = offset;
  document.getElementById('scoreArc').style.stroke = d.safe ? '#7ab870' : '#c47a3a';
  document.getElementById('verdictBig').textContent = d.verdict;
  document.getElementById('verdictBig').className = 'verdict-big' + (d.safe ? ' safe' : '');

  ['m1', 'm2', 'm3', 'm4'].forEach((m, i) => {
    const v = d['m' + (i + 1)];
    document.getElementById(m).style.width = v + '%';
    document.getElementById(m + 'v').textContent = v + '%';
  });

  showToast('Analysis complete — ' + d.verdict);
}

// ─── WAVEFORM ANIMATION ───────────────────────────────────────────────────────
const wave = document.getElementById('heroWave');
let t = 0;

function animWave() {
  t += 0.04;
  const pts = [];
  for (let i = 0; i <= 500; i += 12) {
    const y = 50
      + Math.sin(i * 0.04 + t) * 18
      + Math.sin(i * 0.08 - t * 1.3) * 10
      + Math.sin(i * 0.02 + t * 0.7) * 6;
    pts.push(i + ',' + y.toFixed(1));
  }
  if (wave) wave.setAttribute('points', pts.join(' '));
  requestAnimationFrame(animWave);
}

animWave();
