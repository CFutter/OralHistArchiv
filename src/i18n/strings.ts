export type Locale = 'en' | 'de' | 'fr';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'de', 'fr'];
export const DEFAULT_LOCALE: Locale = 'en';

export const UI: Record<Locale, {
  nav: { home: string; info: string; contact: string };
  search: { placeholder: string; searchBtn: string; clearBtn: string };
  copy: { copy: string; copied: string; copying: string; failed: string };
  footer: { contact: string };
  counts: { showingOf: (shown: number, total: number) => string };
  langLabel: string;
  langShort: { en: string; de: string; fr: string };
}> = {
  en: {
    nav: { home: 'Home', info: 'Further Information', contact: 'Contact' },
    search: {
      placeholder: 'Filter by "studyVersionTitle" (type to search)',
      searchBtn: 'Search',
      clearBtn: 'Clear',
    },
    copy: { copy: 'Copy citation', copied: 'Copied!', copying: 'Copying…', failed: 'Copy failed' },
    footer: { contact: 'To contact us: test@test.com' },
    counts: { showingOf: (shown, total) => `Showing ${shown} of ${total} entries.` },
    langLabel: 'Language',
    langShort: { en: 'EN', de: 'DE', fr: 'FR' },
  },
  de: {
    nav: { home: 'Startseite', info: 'Weitere Informationen', contact: 'Kontakt' },
    search: {
      placeholder: 'Nach „studyVersionTitle“ filtern (zum Suchen tippen)',
      searchBtn: 'Suchen',
      clearBtn: 'Leeren',
    },
    copy: { copy: 'Zitation kopieren', copied: 'Kopiert!', copying: 'Kopieren…', failed: 'Kopieren fehlgeschlagen' },
    footer: { contact: 'Kontakt: test@test.com' },
    counts: { showingOf: (shown, total) => `Es werden ${shown} von ${total} Einträgen angezeigt.` },
    langLabel: 'Sprache',
    langShort: { en: 'EN', de: 'DE', fr: 'FR' },
  },
  fr: {
    nav: { home: 'Accueil', info: 'Informations complémentaires', contact: 'Contact' },
    search: {
      placeholder: 'Filtrer par « studyVersionTitle » (tapez pour rechercher)',
      searchBtn: 'Rechercher',
      clearBtn: 'Effacer',
    },
    copy: { copy: 'Copier la citation', copied: 'Copié !', copying: 'Copie…', failed: 'Échec de la copie' },
    footer: { contact: 'Pour nous contacter : test@test.com' },
    counts: { showingOf: (shown, total) => `Affichage de ${shown} sur ${total} entrées.` },
    langLabel: 'Langue',
    langShort: { en: 'EN', de: 'DE', fr: 'FR' },
  },
};
