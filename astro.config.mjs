// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable server-side rendering
  i18n: {
    // The default language to use
    defaultLocale: 'en',
    // The supported languages
    locales: ['en', 'de', 'fr'],
    routing: {
      // The default locale will not have a prefix (e.g. /about)
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});