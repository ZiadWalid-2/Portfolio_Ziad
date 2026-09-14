/**
 * @file navigation.js
 * Sticky header, accessible mobile menu, smooth navigation, and scroll reveals
 */

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const reveals = document.querySelectorAll('.reveal');

  // Sticky header shadow on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu open / close logic
  function setMenuState(isOpen) {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      nav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Focus first link for keyboard users
      const firstLink = nav.querySelector('a');
      firstLink?.focus();
    } else {
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
      menuToggle.focus();
    }
  }

  menuToggle?.addEventListener('click', () => {
    const isCurrentlyOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isCurrentlyOpen);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
    }
  });

  // Close menu when a navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (menuToggle?.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
      }
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (
      menuToggle?.getAttribute('aria-expanded') === 'true' &&
      !nav?.contains(e.target) &&
      !menuToggle?.contains(e.target)
    ) {
      setMenuState(false);
    }
  });

  // Active section indicator via IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  // Scroll reveal animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // If reduced motion is preferred or observer unsupported, make everything visible
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
}
