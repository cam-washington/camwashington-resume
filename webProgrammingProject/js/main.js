// main.js — site behavior (ES6 module)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
const backToTop = document.getElementById('back-to-top');
const yearEl = document.getElementById('year');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.querySelector('.modal__close');

yearEl.textContent = new Date().getFullYear();

// Theme handling with localStorage
const savedTheme = localStorage.getItem('site-theme') || 'light';
body.classList.toggle('theme--dark', savedTheme === 'dark');
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
themeToggle.setAttribute('aria-pressed', savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('theme--dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-pressed', isDark);
  localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
});

// nav toggle (mobile)
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.style.display = expanded ? 'none' : 'flex';
});

// smooth scroll for in-page links (prefers-reduced-motion respected)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        target.scrollIntoView();
      } else {
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
      // close mobile nav
      if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
        navToggle.click();
      }
    }
  });
});

// typing animation (simple)
const typingText = document.getElementById('typing-text');
const phrases = ['React • JavaScript • Accessibility', 'Small, fast and accessible sites', 'Student at St. Ambrose University'];
let pIndex = 0;
let cIndex = 0;
let deleting = false;
const speed = 70;

function tick() {
  const current = phrases[pIndex];
  typingText.textContent = current.slice(0, cIndex);
  if (!deleting) {
    if (cIndex++ === current.length) {
      deleting = true;
      setTimeout(tick, 800);
      return;
    }
  } else {
    if (cIndex-- === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
    }
  }
  setTimeout(tick, speed + (deleting ? 30 : 0));
}
tick();

// progress bars animate on scroll
const observeProgress = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress').forEach(el => {
        const val = el.getAttribute('data-value') || 0;
        el.querySelector('.progress__bar').style.width = val + '%';
      });
    }
  });
}, {threshold: .25});
document.querySelectorAll('.skills').forEach(el => observeProgress.observe(el));

// back-to-top visibility
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) backToTop.classList.add('show'); else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// Modal (delegate)
document.addEventListener('click', (e) => {
  if (e.target.matches('.js-open-modal')) {
    const title = e.target.dataset.title || 'Project';
    const desc = e.target.dataset.desc || '';
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden','false');
  }
});
modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.setAttribute('aria-hidden','true');
});
