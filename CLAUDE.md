# After Action Project

A nonprofit marketing/informational website for The After Action Project — an organization that provides veterans, first responders, and healthcare professionals with outdoor recovery experiences (hunting, fishing, wilderness programs).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (SPA) |
| Routing | React Router v6 |
| Bundler | Vite |
| Styling | Tailwind CSS v3 + `@tailwindcss/forms` |
| Fonts | Work Sans (headlines/labels), Newsreader (body) via Google Fonts |
| Icons | Material Symbols Outlined (via CDN in index.html) |

## Project Structure

```
src/
  App.jsx              # Root layout — Navigation + Routes + Footer
  main.jsx             # React DOM entry point
  styles.css           # Global Tailwind base + custom component classes
  components/
    Footer.jsx
    Icon.jsx           # Wraps Material Symbols Outlined
    Logo.jsx
    Navigation.jsx     # Sticky header with mobile hamburger menu
    PageHero.jsx       # Reusable full-bleed hero with image + overlay
    SectionHeader.jsx
  data/
    site.js            # Central config — nav links, contact email, images, inquiry intents
  pages/
    Home.jsx
    Programs.jsx
    Partnership.jsx
    Contact.jsx        # mailto: contact form
    Privacy.jsx
public/
  llms.txt             # LLM-readable site summary
  llms-full.txt        # Extended LLM-readable content
docs/                  # External reference documentation (see below)
```

## Key Conventions

- All site-wide data (nav links, images, contact email, form intents) lives in `src/data/site.js` — edit there first before touching components.
- Colors follow a Material Design 3-style token system defined in `tailwind.config.js` (e.g. `primary`, `on-primary`, `surface`, `surface-container`). Never use raw hex values in components; use the token names.
- Fonts: `font-headline` / `font-label` = Work Sans; `font-body` = Newsreader. Keep this distinction — headlines are uppercase and tight, body is italic serif.
- The `.focus-ring` utility class must be applied to all interactive elements for accessibility.
- Page-level components use the `.page-fade` class on their root element for enter animation.
- The `.grainy-overlay` class adds a subtle SVG noise texture over backgrounds.
- Contact form uses `mailto:` via `src/utils/mailto.js` — there is no backend.

## Dev Commands

```bash
npm run dev      # Start local dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## External Reference Docs

Detailed documentation for the main libraries used in this project:

- [Tailwind CSS](docs/tailwind.md) — utility classes, responsive variants, config
- [React Router](docs/react-router.md) — routing, links, hooks
- [Vite](docs/vite.md) — build config, dev server, plugins
- [Material Symbols](docs/material-symbols.md) — icon font usage and variants
