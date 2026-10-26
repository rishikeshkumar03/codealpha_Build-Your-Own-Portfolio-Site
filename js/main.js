/**
 * RISHIKESH KUMAR PORTFOLIO — MAIN INTERACTION CONTROLLER
 * Dynamic particle background, cursor tracking, terminal tabs, scroll spies, and contact form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initCursorGlow();
  initTerminalTabs();
  initMobileMenu();
  initScrollSpy();
  initContactForm();
  initScrollReveals();
});

/**
 * 1. Ambient Dynamic Particle Canvas
 */
function initParticleCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 25 : 50;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update();
      p.draw();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  // Check prefers-reduced-motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animate();
  }
}

/**
 * 2. Subtle Cursor Glow Tracking
 */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/**
 * 3. Hero Terminal Code Tabs
 */
function initTerminalTabs() {
  const tabs = document.querySelectorAll('.terminal-tab');
  const title = document.getElementById('terminal-tab-title');
  const snippets = {
    kotlin: document.getElementById('code-content-kotlin'),
    java: document.getElementById('code-content-java'),
    cpp: document.getElementById('code-content-cpp')
  };

  const fileNames = {
    kotlin: 'Developer.kt',
    java: 'RishikeshKumar.java',
    cpp: 'Main.cpp'
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const lang = tab.getAttribute('data-lang');

      tabs.forEach(t => {
        t.classList.remove('active', 'bg-[#0b0b12]', 'text-purple-300', 'border-t', 'border-x', 'border-purple-500/30');
        t.classList.add('text-zinc-400');
      });

      tab.classList.add('active', 'bg-[#0b0b12]', 'text-purple-300', 'border-t', 'border-x', 'border-purple-500/30');
      tab.classList.remove('text-zinc-400');

      if (title && fileNames[lang]) {
        title.innerText = fileNames[lang];
      }

      Object.keys(snippets).forEach(k => {
        if (snippets[k]) {
          if (k === lang) {
            snippets[k].classList.remove('hidden');
          } else {
            snippets[k].classList.add('hidden');
          }
        }
      });
    });
  });
}

/**
 * 4. Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.querySelector('.menu-open-icon');
  const closeIcon = document.querySelector('.menu-close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
}

/**
 * 5. Active Section Scroll Spy
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * 6. Contact Form Submission Handling
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = document.getElementById('btn-submit-text');
  const banner = document.getElementById('form-success-banner');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) return;

    // Loading state
    submitBtn.disabled = true;
    if (btnText) btnText.innerText = 'TRANSMITTING...';

    // =========================================================================
    // TODO: Integrate Resend API or another email service here.
    // Example:
    // await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, message })
    // });
    // =========================================================================

    setTimeout(() => {
      submitBtn.disabled = false;
      if (btnText) btnText.innerText = 'SEND MESSAGE';
      if (banner) {
        banner.classList.remove('hidden');
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    }, 800);
  });
}

/**
 * 7. Scroll Reveal Observer
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.project-card, .skill-category-card, .focus-pill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}
