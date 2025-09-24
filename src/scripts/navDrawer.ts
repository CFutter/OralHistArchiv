// src/scripts/navDrawer.ts

const btn = document.querySelector<HTMLButtonElement>('.nav-toggle');
const nav = document.getElementById('site-nav') as HTMLElement | null;
const backdrop = document.getElementById('backdrop') as HTMLElement | null;
const body = document.body;

let lastFocused: HTMLElement | null = null;

function getFocusable(container: HTMLElement): HTMLElement[] {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[role="button"]',
  ];
  const nodes = Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')));
  return nodes.filter(el => el.offsetParent !== null || el === document.activeElement);
}

function openDrawer() {
  if (!nav) return;
  nav.classList.add('open');
  body.classList.add('drawer-open');
  btn?.setAttribute('aria-expanded', 'true');
  backdrop?.removeAttribute('hidden');
  lastFocused = (document.activeElement as HTMLElement) ?? null;

  // Focus first link
  const focusables = getFocusable(nav);
  (focusables[0] ?? nav).focus();
}

function closeDrawer() {
  if (!nav) return;
  nav.classList.remove('open');
  body.classList.remove('drawer-open');
  btn?.setAttribute('aria-expanded', 'false');
  backdrop?.setAttribute('hidden', '');
  // restore focus
  (lastFocused ?? btn ?? document.body).focus();
  lastFocused = null;
}

btn?.addEventListener('click', () => {
  const isOpen = nav?.classList.contains('open');
  isOpen ? closeDrawer() : openDrawer();
});

backdrop?.addEventListener('click', closeDrawer);

// Close on ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav?.classList.contains('open')) {
    e.preventDefault();
    closeDrawer();
  }
});

// Focus trap within nav when open
nav?.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab' || !nav.classList.contains('open')) return;
  const focusables = getFocusable(nav);
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (e.shiftKey) {
    if (active === first || !active) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (active === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Close when a nav link is clicked (except language switch links in the drawer)
nav?.addEventListener('click', (e) => {
  const t = e.target as Element | null;
  if (!t) return;

  // If the click is on a language switch link, do NOT close the drawer
  const isLangSwitch = !!t.closest('[data-lang-switch]');
  if (isLangSwitch) return;

  if (t.closest('a')) {
    closeDrawer();
  }
});


// Close drawer when resizing to desktop
const mql = window.matchMedia('(min-width: 721px)');
mql.addEventListener('change', (ev) => {
  if (ev.matches && nav?.classList.contains('open')) {
    closeDrawer();
  }
});
