# Vite Reference

Docs: https://vite.dev/guide/

## Config

`vite.config.js` — minimal config using the official React plugin.

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

The `@vitejs/plugin-react` plugin handles JSX transform and React Fast Refresh in dev.

## Dev commands

```bash
npm run dev       # Start dev server (default: http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Serve the dist/ build locally for final check
```

## Key behaviors

- **Entry point**: `index.html` at the repo root — Vite treats this as the HTML entry.
- **JSX**: Files use `.jsx` extension. No `.tsx` — project is plain JavaScript (no TypeScript).
- **Module type**: `package.json` has `"type": "module"` — all JS files are ES modules.
- **Assets in `public/`**: Files in `public/` are served at `/` with no processing. The logo (`/after-action-logo.png`) and `llms.txt` live here.
- **Hot Module Replacement**: React Fast Refresh is enabled automatically in dev.
- **Build output**: `dist/` — not committed to git.

## Environment variables

Use `import.meta.env.VITE_*` prefix for variables to expose to the client. There are currently no env vars in use — the app has no backend or API keys.

## PostCSS

`postcss.config.js` is present with `autoprefixer` for CSS vendor prefixes. Tailwind uses PostCSS under the hood — no separate setup needed beyond what's in `tailwind.config.js`.
