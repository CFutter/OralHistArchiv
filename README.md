# Oral History Archive Test – Astro Project Documentation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Setup & Installation](#setup--installation)
4. [Content Editing Guide (for Editors)](#content-editing-guide-for-editors)
5. [Localization & Multilingual Workflow](#localization--multilingual-workflow)
6. [Developer Guide](#developer-guide)
    - [Astro Components & Layouts](#astro-components--layouts)
    - [Scripts & Interactivity](#scripts--interactivity)
    - [Data Fetching & Caching](#data-fetching--caching)
    - [Styling & Assets](#styling--assets)
7. [Extending & Customizing](#extending--customizing)
8. [Deployment](#deployment)
9. [Appendix: File Reference](#appendix-file-reference)

---

## Project Overview

This project is a multilingual, content-driven website built with the [Astro](https://astro.build/) framework.  
It features:

- **Multilingual content** (English, German, French) managed via Markdown files.
- **Dynamic catalogue search** powered by the Swissubase API.
- **Accessible, responsive design** with a focus on editors and developers.
- **Client-side interactivity** for language switching, navigation, and search.

---

## Folder Structure

```
src/
├── assets/           # SVG logos and backgrounds
│   ├── astro.svg
│   └── background.svg
├── content/          # Markdown content (multi-language)
│   ├── config.ts
│   └── pages/
│       ├── contact.de.md
│       ├── contact.en.md
│       ├── contact.fr.md
│       ├── further-information.de.md
│       ├── further-information.en.md
│       ├── further-information.fr.md
│       ├── home.de.md
│       ├── home.en.md
│       └── home.fr.md
├── i18n/
│   └── strings.ts    # UI translations and locale config
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── contact.astro
│   ├── further-information.astro
│   └── index.astro
├── scripts/
│   ├── langSwitch.ts
│   ├── navDrawer.ts
│   └── searchPage.ts
└── styles/
    └── global.css
```

Other project files:
- `astro.config.mjs`, `package.json`, `tsconfig.json`, etc. (Astro and TypeScript config)
- `data/cache/swissubase.json` (API cache)

---

## Setup & Installation

1. **Clone the repository**  
   ```bash
   git clone <your-repo-url>
   cd oral-hist-arch-test
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the development server**  
   ```bash
   npm run dev
   ```

4. **Build for production**  
   ```bash
   npm run build
   ```

5. **Preview the production build**  
   ```bash
   npm run preview
   ```

---

## Content Editing Guide (for Editors)

### Editing Page Content

- All editable content is in Markdown files under `src/content/pages/`.
- Each page (e.g., Home, Contact, Further Information) has one file per language:
  - `home.en.md`, `home.de.md`, `home.fr.md`
  - `contact.en.md`, etc.

#### Example: Editing the Home Page

```markdown
---
title: "Working Title"
subtitle: "A very short description goes here."
---
Welcome to our project. Use the search below to explore the catalogue.
```

- **`title`** and **`subtitle`** are set in the YAML frontmatter.
- The main content goes below the frontmatter.
- To update content, simply edit the relevant `.md` file in your language.

### Adding or Updating Translations

- To add a new translation, copy an existing file and translate the content.
- File naming convention:  
  - `home.en.md` (English), `home.de.md` (German), `home.fr.md` (French)
- If a translation is missing, the site will fall back to English.

---

## Localization & Multilingual Workflow

- The site supports **English (`en`)**, **German (`de`)**, and **French (`fr`)**.
- Language is detected in this order:
  1. `?lang=` URL parameter
  2. `lang` cookie
  3. Browser `Accept-Language` header
  4. Defaults to English

- Editors can update content in any language by editing the corresponding Markdown file.
- UI labels (navigation, search, buttons) are translated via `src/i18n/strings.ts`.

---

## Developer Guide

### Astro Components & Layouts

- **BaseLayout.astro**  
  - Main layout for all pages.
  - Handles navigation, language switcher, header/footer, and accessibility.
  - Receives `title` and `locale` as props.

- **Page Components**  
  - `index.astro`: Homepage with search, catalogue, and pagination.
  - `contact.astro`, `further-information.astro`: Load and render localized Markdown content.

- **Dynamic Content Loading**  
  - Uses Astro’s `getEntry` to fetch the correct Markdown file for the current locale.

### Scripts & Interactivity

- **langSwitch.ts**  
  - Handles language switching (desktop and mobile).
  - Sets a cookie, updates UI labels live, and reloads for SSR content.

- **navDrawer.ts**  
  - Manages the mobile navigation drawer.
  - Handles open/close, focus trap, ESC key, and accessibility.

- **searchPage.ts**  
  - Handles search input, clear button, keyboard shortcuts (`/` to focus, `Esc` to clear).
  - Robust citation copy (clipboard API or fallback).
  - Client-side pagination for catalogue cards.

### Data Fetching & Caching

- **Swissubase API Integration**  
  - The homepage fetches data from the Swissubase API (`/api/v2/catalogue/search`).
  - Results are cached in `data/cache/swissubase.json` for offline fallback.
  - If the API is unavailable, cached data is shown with a warning.

- **Filtering & Display**  
  - Users can filter catalogue entries by title.
  - Results are paginated and displayed as cards, with citation copy and raw JSON details.

### Styling & Assets

- **global.css**  
  - Defines theme variables, layout, navigation, forms, cards, and responsive design.
  - Ensures accessibility (skip links, high contrast, focus styles).

- **SVG Assets**  
  - `astro.svg`: Project logo.
  - `background.svg`: Decorative background.

---

## Extending & Customizing

- **Adding New Pages:**  
  - Create a new Markdown file in `src/content/pages/` for each language.
  - Add a new `.astro` page in `src/pages/` to render the content.

- **Adding a New Language:**  
  1. Update `SUPPORTED_LOCALES` in `strings.ts`.
  2. Add translations to `UI` in `strings.ts`.
  3. Add new Markdown files for each page (e.g., `home.it.md` for Italian).
  4. Update navigation and language switcher if needed.

- **Customizing Styles:**  
  - Edit `src/styles/global.css` for theme, layout, or component changes.

- **Modifying API Integration:**  
  - Update the API URL or payload in `index.astro`.
  - Adjust mapping/filtering logic as needed.

---

## Deployment

1. **Build the site:**  
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your preferred static hosting (e.g., Vercel, Netlify, GitHub Pages).

3. **Environment Variables:**  
   - If you need to secure API keys or endpoints, use Astro’s environment variable support.

---

## Appendix: File Reference

### Content Files (for Editors)
- `src/content/pages/home.en.md`, `.de.md`, `.fr.md`
- `src/content/pages/contact.en.md`, `.de.md`, `.fr.md`
- `src/content/pages/further-information.en.md`, `.de.md`, `.fr.md`

### Layouts & Components
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/pages/contact.astro`
- `src/pages/further-information.astro`

### Scripts
- `src/scripts/langSwitch.ts`
- `src/scripts/navDrawer.ts`
- `src/scripts/searchPage.ts`

### Localization
- `src/i18n/strings.ts`

### Styles & Assets
- `src/styles/global.css`
- `src/assets/astro.svg`
- `src/assets/background.svg`

### Config & Data
- `astro.config.mjs`, `package.json`, `tsconfig.json`
- `data/cache/swissubase.json`

---

## Credits & Contact

- **Project:** Oral History Archive Test (Astro Framework)
- **Maintainer:** Christian Futter
- **Contact:** test@test.com

---

**For questions or contributions, please contact the maintainer or open an issue in the repository.**
