// src/scripts/searchPage.ts

// Elements
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement | null;
const qInputEl = document.getElementById('q') as HTMLInputElement | null;
const form = document.getElementById('searchForm') as HTMLFormElement | null;

const cardsWrap = document.getElementById('cards') as HTMLElement | null;
const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement | null;
const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement | null;
const pageInfo = document.getElementById('pageInfo') as HTMLElement | null;
const pageSizeSel = document.getElementById('pageSize') as HTMLSelectElement | null;

// Localized copy labels (with fallbacks)
const L = {
  copy: cardsWrap?.getAttribute('data-copy-copy') || 'Copy citation',
  copied: cardsWrap?.getAttribute('data-copy-copied') || 'Copied!',
  copying: cardsWrap?.getAttribute('data-copy-copying') || 'Copying…',
  failed: cardsWrap?.getAttribute('data-copy-failed') || 'Copy failed',
};

// --- Clear search ---
clearBtn?.addEventListener('click', () => {
  if (qInputEl) qInputEl.value = '';
  // Remove ?q= and reload
  window.location.href = window.location.pathname;
});

form?.addEventListener('submit', () => {
  if (qInputEl) {
    qInputEl.value = qInputEl.value.trim();
  }
});

// --- Keyboard shortcuts: '/' focuses, 'Esc' clears ---
window.addEventListener('keydown', (e) => {
  const target = e.target as Element | null;
  const typingContext =
    (target instanceof HTMLInputElement) ||
    (target instanceof HTMLTextAreaElement) ||
    (target instanceof HTMLElement && target.isContentEditable);

  if (e.key === '/' && !typingContext) {
    e.preventDefault();
    qInputEl?.focus();
    qInputEl?.select();
  } else if (e.key === 'Escape') {
    if (qInputEl && qInputEl.value) {
      e.preventDefault();
      qInputEl.value = '';
      window.location.href = window.location.pathname;
    }
  }
});

// --- Copy citation (robust) ---
function canUseAsyncClipboard() {
  return Boolean(window.isSecureContext && navigator.clipboard && typeof navigator.clipboard.writeText === 'function');
}
async function copyWithAsyncClipboard(text: string) {
  await navigator.clipboard!.writeText(text);
}
function copyWithTextareaFallback(text: string) {
  return new Promise<void>((resolve, reject) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '0';
      document.body.appendChild(ta);

      ta.select();
      ta.setSelectionRange(0, ta.value.length);

      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('execCommand("copy") returned false'));
    } catch (err) {
      reject(err);
    }
  });
}
async function copyCitationFromButton(btn: HTMLElement) {
  const citation = btn.getAttribute('data-citation') || '';
  if (!citation) throw new Error('No citation available');

  if (canUseAsyncClipboard()) {
    await copyWithAsyncClipboard(citation);
  } else {
    await copyWithTextareaFallback(citation);
  }
}

function wireCopyButtons() {
  const buttons = document.querySelectorAll<HTMLElement>('.btn-copy');
  buttons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const el = e.currentTarget as HTMLElement;
      const original = el.textContent || L.copy;
      el.textContent = L.copying;
      try {
        await copyCitationFromButton(el);
        el.textContent = L.copied;
      } catch {
        el.textContent = L.failed;
      } finally {
        setTimeout(() => (el.textContent = original), 1500);
      }
    });
  });
}

// --- Client-side pagination (show/hide already-rendered cards) ---
function wirePagination() {
  if (!cardsWrap) return;

  const cards = Array.from(cardsWrap.querySelectorAll<HTMLElement>('.card'));
  let page = 1;
  let pageSize = 10;

  function readPageSize() {
    if (pageSizeSel) {
      const v = parseInt(pageSizeSel.value, 10);
      pageSize = Number.isFinite(v) && v > 0 ? v : 10;
    }
  }

  function renderPage() {
    readPageSize();
    const total = cards.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;

    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, total);

    cards.forEach((card, idx) => {
      card.style.display = (idx >= start && idx < end) ? '' : 'none';
    });

    if (pageInfo) pageInfo.textContent = `Page ${page} of ${totalPages} · Showing ${end - start} item(s)`;
    if (prevBtn) prevBtn.disabled = page <= 1;
    if (nextBtn) nextBtn.disabled = page >= totalPages;
  }

  prevBtn?.addEventListener('click', () => { page -= 1; renderPage(); });
  nextBtn?.addEventListener('click', () => { page += 1; renderPage(); });
  pageSizeSel?.addEventListener('change', () => { page = 1; renderPage(); });

  renderPage();
}

// Init after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    wireCopyButtons();
    wirePagination();
  });
} else {
  wireCopyButtons();
  wirePagination();
}
