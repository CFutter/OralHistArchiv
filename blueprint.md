
# Astro Website Blueprint

## Overview

This project is a multi-language Astro website. It's designed to be a simple, content-focused site with internationalization support.

## Features

*   **Internationalization (i18n):** The site supports three languages: English (en), German (de), and French (fr).
*   **File-based Routing:** Astro's file-based routing is used for all pages.
*   **Markdown Content:** Page content is stored in markdown files in the `src/content/pages` directory.
*   **Simple Language Switching:** A simple language switcher is implemented in the header, using a URL parameter (`?lang=...`) to set the current language.

## Project Structure

*   `src/components`: Contains the `Header.astro` and `Footer.astro` components.
*   `src/content/pages`: Contains the markdown files for each page in each language.
*   `src/i18n`: Contains the internationalization logic, including `strings.ts` for UI text and `utils.ts` for language detection.
*   `src/layouts`: Contains the `BaseLayout.astro` file, which is the main template for all pages.
*   `src/pages`: Contains the Astro pages that correspond to the site's routes.
*   `src/scripts`: Contains the `nav.ts` file for mobile navigation.
*   `src/styles`: Contains the global CSS file.

## Current Task: Rollback and Bug Fixes

**Objective:** To restore the application to a working state after a series of failed attempts to implement a more complex internationalization system.

**Plan:**

1.  **Revert i18n logic:**
    *   ~~Remove the `src/middleware.ts` file.~~ (Done)
    *   ~~Reinstate the simple `getLocaleFromUrl` function in `src/i18n/utils.ts`.~~ (Done)
    *   ~~Delete the `src/content/config.ts` file.~~ (Done)
2.  **Restore page and layout components:**
    *   ~~Revert `src/layouts/BaseLayout.astro` to use the simple i18n logic.~~ (Done)
    *   ~~Restore the `src/components/Header.astro` component.~~ (Done)
    *   ~~Restore the `src/components/Footer.astro` component.~~ (Done)
3.  **Restore page content loading:**
    *   ~~Create `src/i18n/content.ts` with the `getContent` function to load and parse markdown files.~~ (Done)
    *   ~~Update `src/pages/index.astro`, `src/pages/contact.astro`, and `src/pages/further-information.astro` to use `getContent` and the new i18n logic.~~ (Done)
4.  **Install missing dependencies:**
    *   ~~Install `marked` and `gray-matter` and their types.~~ (Done)
5.  **Create `src/env.d.ts`:**
    *   ~~Add a type declaration for the `astro:content` module to resolve compilation errors.~~ (Done)
