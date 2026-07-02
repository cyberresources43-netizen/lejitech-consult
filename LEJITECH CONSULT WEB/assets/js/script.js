const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const siteHeader = document.querySelector('.site-header');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function handleHeaderScroll() {
  if (!siteHeader) return;
  if (window.scrollY > 24) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll();

const storedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = storedTheme || (prefersLight ? 'light' : 'dark');

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    const icon = themeToggle.querySelector('.theme-toggle-icon');
    const label = themeToggle.querySelector('.theme-toggle-label');
    if (icon) icon.textContent = theme === 'light' ? '☀️' : '🌙';
    if (label) label.textContent = theme === 'light' ? 'Light' : 'Dark';
  }
}

applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const revealSelectors = [
  'section',
  '.hero-card',
  '.card',
  '.contact-card',
  '.info-card',
  '.gallery-hero',
  '.service-card',
  '.testimonial-card',
  '.faq-card',
  '.page-hero'
];

const motionItems = document.querySelectorAll('.motion-item');
const revealElements = document.querySelectorAll(revealSelectors.join(','));
revealElements.forEach((element) => {
  element.classList.add('reveal');
});
motionItems.forEach((item) => {
  item.classList.add('motion-item');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      if (entry.target.classList.contains('motion-item')) {
        entry.target.classList.add('motion-visible');
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18,
});

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
motionItems.forEach((item) => {
  revealObserver.observe(item);
});

const motionButtons = document.querySelectorAll('.btn');
motionButtons.forEach((button) => {
  button.addEventListener('pointerenter', () => {
    button.style.transform = 'translateY(-2px) scale(1.02)';
  });
  button.addEventListener('pointerleave', () => {
    button.style.transform = '';
  });
});

const hoverCards = document.querySelectorAll('.service-card, .testimonial-card, .faq-card, .card, .hero-card, .gallery-hero');
hoverCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

