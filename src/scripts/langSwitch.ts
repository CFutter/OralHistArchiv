// src/scripts/langSwitch.ts
import { SUPPORTED_LOCALES } from '../i18n/strings.ts';
import { UI } from '../i18n/strings.ts';

type Locale = 'en' | 'de' | 'fr';

function setLangCookie(lang: string) {
  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `lang=${lang}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function getParamLang(): string | null {
  const p = new URLSearchParams(window.location.search);
  const lang = p.get('lang');
  if (lang && SUPPORTED_LOCALES.includes(lang as any)) return lang;
  return null;
}

function stripLangParam() {
  const url = new URL(window.location.href);
  url.searchParams.delete('lang');
  window.history.replaceState({}, '', url.toString());
}

// Live-update header/nav UI texts without reloading (for drawer clicks)
function applyLocaleUI(lang: Locale) {
  const ui = UI[lang];

  // Update main nav labels
  const home = document.getElementById('nav-home') as HTMLAnchorElement | null;
  const info = document.getElementById('nav-info') as HTMLAnchorElement | null;
  const contact = document.getElementById('nav-contact') as HTMLAnchorElement | null;
  if (home) home.textContent = ui.nav.home;
  if (info) info.textContent = ui.nav.info;
  if (contact) contact.textContent = ui.nav.contact;

  // Update language pills active styling (both desktop & drawer)
  document.querySelectorAll<HTMLAnchorElement>('.lang-switch a').forEach((a) => {
    const code = a.getAttribute('data-lang-switch');
    if (code === lang) a.classList.add('active');
    else a.classList.remove('active');
  });

  // Optional: Update search UI bits if present on the page
  const q = document.getElementById('q') as HTMLInputElement | null;
  if (q) q.placeholder = ui.search.placeholder;

  const searchBtn = document.querySelector<HTMLButtonElement>('#searchForm button[type="submit"]');
  if (searchBtn) searchBtn.textContent = ui.search.searchBtn;

  const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement | null;
  if (clearBtn) clearBtn.textContent = ui.search.clearBtn;

  const footerP = document.querySelector('.site-footer .container p');
  if (footerP) footerP.textContent = ui.footer.contact;
}

function wireButtons() {
  document.querySelectorAll<HTMLElement>('[data-lang-switch]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang-switch') as Locale | null;
      if (!lang || !SUPPORTED_LOCALES.includes(lang)) return;
      setLangCookie(lang);

      const isInDrawer = !!btn.closest('.lang-switch--drawer');

      if (isInDrawer) {
        // Stay in place (keep drawer open) and update labels immediately
        applyLocaleUI(lang);
        // Do NOT reload now
      } else {
        // Desktop click: reload so full page content (Markdown etc.) changes SSR
        const url = new URL(window.location.href);
        url.searchParams.delete('lang');
        window.location.href = url.pathname + url.search + url.hash;
      }
    });
  });
}

(function init() {
  // If coming in with ?lang=... in URL, set the cookie and clean the URL
  const paramLang = getParamLang();
  if (paramLang) {
    setLangCookie(paramLang);
    stripLangParam();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireButtons);
  } else {
    wireButtons();
  }
})();
