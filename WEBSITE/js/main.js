/* ==========================================================================
   THRIVING PRODUCTIONS — JAVASCRIPT INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initMobileMenu();
  initTabs();
  initFaqAccordion();
  initModals();
  initBriefForm();
  initCounters();
  initSmoothScroll();
  initNavScroll();
});

/* Nav scroll state */
function initNavScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const check = () => header.classList.toggle('scrolled', window.scrollY > 40);
  check();
  window.addEventListener('scroll', check, { passive: true });
}

/* 0. Theme Switcher (Alternating / Dark / Light) */
function initThemeSwitcher() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const themes = [
    { mode: 'alternating', label: '🌓 Alternating' },
    { mode: 'dark', label: '🌙 Dark Mode' },
    { mode: 'light', label: '☀️ Light Mode' }
  ];
  let currentThemeIndex = 0;

  function applyTheme(index) {
    const theme = themes[index];
    themeBtn.querySelector('span').textContent = theme.label;
    document.documentElement.setAttribute('data-theme', theme.mode);

    const lightSections = document.querySelectorAll('.section-light-theme');
    const darkSections = document.querySelectorAll('.section-dark-theme');

    if (theme.mode === 'dark') {
      document.body.style.backgroundColor = 'var(--bg-dark-base)';
      document.body.style.color = '#FFFFFF';
      lightSections.forEach(el => {
        el.dataset.prevTheme = 'light';
        el.classList.remove('section-light-theme');
        el.classList.add('section-dark-theme');
      });
    } else if (theme.mode === 'light') {
      document.body.style.backgroundColor = 'var(--bg-light-base)';
      document.body.style.color = '#0F1713';
      darkSections.forEach(el => {
        if (!el.classList.contains('site-footer')) {
          el.dataset.prevTheme = 'dark';
          el.classList.remove('section-dark-theme');
          el.classList.add('section-light-theme');
        }
      });
    } else {
      // Restore alternating default
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.querySelectorAll('[data-prev-theme]').forEach(el => {
        if (el.dataset.prevTheme === 'light') {
          el.classList.remove('section-dark-theme');
          el.classList.add('section-light-theme');
        } else if (el.dataset.prevTheme === 'dark') {
          el.classList.remove('section-light-theme');
          el.classList.add('section-dark-theme');
        }
        delete el.dataset.prevTheme;
      });
    }
  }

  themeBtn.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    applyTheme(currentThemeIndex);
  });
}

/* 1. Mobile Menu Drawer */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      menuBtn.innerHTML = mobileDrawer.classList.contains('active') ? '✕' : '☰';
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        if (menuBtn) menuBtn.innerHTML = '☰';
      });
    });
  }
}

/* 2. Tabs Switcher (Calendly vs Interactive Brief) */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* 3. FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('open');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          item.classList.remove('open');
          answer.style.maxHeight = null;
        }
      });
    }
  });
}

/* 4. Modals (Calendly & Showreel) */
function initModals() {
  const calendlyModal = document.getElementById('calendlyModal');
  const showreelModal = document.getElementById('showreelModal');
  const calendlyTriggers = document.querySelectorAll('.trigger-calendly-modal');
  const showreelTriggers = document.querySelectorAll('.trigger-showreel-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay');

  calendlyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (calendlyModal) calendlyModal.classList.add('active');
    });
  });

  showreelTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (showreelModal) showreelModal.classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close-btn')) {
        if (calendlyModal) calendlyModal.classList.remove('active');
        if (showreelModal) {
          showreelModal.classList.remove('active');
          const video = showreelModal.querySelector('video');
          if (video) video.pause();
        }
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (calendlyModal) calendlyModal.classList.remove('active');
      if (showreelModal) {
        showreelModal.classList.remove('active');
        const video = showreelModal.querySelector('video');
        if (video) video.pause();
      }
    }
  });
}

/* 5. Interactive Brief Form Submission */
function initBriefForm() {
  const briefForm = document.getElementById('creatorBriefForm');
  const toast = document.getElementById('toastNotice');

  if (briefForm) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = briefForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Sending Brief...';
      submitBtn.disabled = true;

      // Simulate API submission
      setTimeout(() => {
        submitBtn.innerHTML = '✓ Brief Received!';
        submitBtn.style.background = '#C8F51D';
        submitBtn.style.color = '#000';

        showToast('🚀 Brief received! Check your inbox or schedule your call with Harshit.');
        briefForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 4000);
      }, 1000);
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.style.display = 'flex';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 4500);
}

/* 6. Counters Animation */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-count');
  let animated = false;

  function runCounterAnimation() {
    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.ceil(target / 40);

      const updateCount = () => {
        count += step;
        if (count < target) {
          counter.innerText = `${prefix}${count}${suffix}`;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = `${prefix}${target}${suffix}`;
        }
      };
      updateCount();
    });
  }

  function checkCounter() {
    if (!animated && statNumbers.length > 0) {
      const firstCounter = statNumbers[0];
      const rect = firstCounter.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        runCounterAnimation();
        animated = true;
      }
    }
  }

  // Check on load
  checkCounter();
  // Check on scroll
  window.addEventListener('scroll', checkCounter, { passive: true });
}

/* 7. Smooth Scroll Anchors */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}
