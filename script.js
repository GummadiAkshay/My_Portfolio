const dot  = document.getElementById('cdot');
const ring = document.getElementById('cring');
window.addEventListener('mousemove', e => {
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

window.addEventListener('scroll', function() {
  const bar = document.getElementById('topbar');
  if (window.scrollY > 36) bar.classList.add('stuck');
  else bar.classList.remove('stuck');
}, { passive: true });

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('drawer').classList.add('show');
});
document.getElementById('drawerClose').addEventListener('click', () => {
  document.getElementById('drawer').classList.remove('show');
});
function closeDrawer() {
  document.getElementById('drawer').classList.remove('show');
}

const phrases = [
  'Building performant web interfaces.',
  'Solving DSA problems every day.',
  'Ready to ship at Juspay.',
];
let phraseIdx = 0, charIdx = 0, erasing = false;
const typedEl = document.getElementById('ttext');

function runTyper() {
  const phrase = phrases[phraseIdx];
  if (!erasing) {
    typedEl.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === phrase.length) {
      erasing = true;
      setTimeout(runTyper, 1700);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      erasing = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(runTyper, 380);
      return;
    }
  }
  setTimeout(runTyper, erasing ? 36 : 55);
}
setTimeout(runTyper, 1300);

const revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.appear, .appear-left, .appear-right').forEach(function(el) {
  revealObs.observe(el);
});

const barObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var fills = entry.target.querySelectorAll('.progress-fill');
      fills.forEach(function(f) { f.style.width = f.getAttribute('data-w') + '%'; });
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('tr').forEach(function(row) { barObs.observe(row); });

function countUp(el) {
  var target    = parseInt(el.getAttribute('data-to'));
  var isDecimal = el.hasAttribute('data-dec');
  var dur       = 1700;
  var startTime = null;

  function step(ts) {
    if (!startTime) startTime = ts;
    var prog    = Math.min((ts - startTime) / dur, 1);
    var eased   = 1 - Math.pow(1 - prog, 4);
    var current = Math.round(eased * target);
    el.textContent = isDecimal ? (current / 100).toFixed(2) : current + (target >= 350 ? '+' : '');
    if (prog < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

var countObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      countUp(entry.target);
      countObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-to]').forEach(function(el) { countObs.observe(el); });

function onSend(btn) {
  var original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'var(--blue-muted)';
  btn.style.color = 'var(--cream)';
  setTimeout(function() {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.style.color = '';
  }, 2800);
}
