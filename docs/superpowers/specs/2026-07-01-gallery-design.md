# Gallery Page Design

## Purpose

Add a photo gallery to the site showcasing trips to the countries The After Action Project has operated in: Ireland, Argentina, and New Zealand. Photos will be dropped into the project directly by the user, of variable quality/size/aspect ratio.

## Scope

- New standalone page at `/gallery`, linked from the main nav.
- One section per country (Ireland, Argentina, New Zealand), each a grid of photo tiles.
- Clicking a tile opens a lightbox to view the full photo, with keyboard navigation between photos in that country.
- Auto-discovery of photos from folders — no code changes needed when new photos are added.

Out of scope (not needed for this pass, can follow up later if wanted):
- Per-photo captions (alt text is auto-generated).
- Automated image optimization/resizing at build time.
- Pagination/lazy-loading (photo volume per country is small: 5-15).

## Data Layer

Photos live under `src/assets/gallery/<country-slug>/`:

```
src/assets/gallery/
  ireland/
  argentina/
  new-zealand/
```

Each folder is empty (with a `.gitkeep`) until the user drops image files in.

`src/data/gallery.js` uses a single static `import.meta.glob('/src/assets/gallery/*/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })` call to discover all photos across all country folders in one pass (Vite requires a literal glob pattern, so this can't be a per-country dynamic call). The module then groups the discovered files by their folder name and maps them against a fixed, ordered config list so display order and names are guaranteed regardless of filesystem/alphabetical order:

```js
const countryMeta = [
  { slug: 'ireland', name: 'Ireland' },
  { slug: 'argentina', name: 'Argentina' },
  { slug: 'new-zealand', name: 'New Zealand' },
];
```

Exported shape:

```js
export const galleryCountries = [
  { slug: 'ireland', name: 'Ireland', photos: [{ src, alt }, ...] },
  { slug: 'argentina', name: 'Argentina', photos: [...] },
  { slug: 'new-zealand', name: 'New Zealand', photos: [...] },
];
```

`alt` text is auto-generated as `"<Country> program photo <n>"` since individual captions aren't part of this pass. Within a country, photos are sorted by filename.

If a country's folder is empty, its `photos` array is empty and the page renders that section with no tiles — not an error state, just the pre-population state before real photos are dropped in.

## Components

- **`src/pages/Gallery.jsx`** — new page. Uses the existing `PageHero` (reusing `images.programsHero` so the hero doesn't depend on gallery content existing) and `SectionHeader` for a page intro, then renders one section per entry in `galleryCountries`. Holds the single piece of lightbox state: `activePhoto: { countrySlug, index } | null`.
- **`src/components/PhotoGrid.jsx`** — presentational grid for one country's photos. Uniform tiles using `aspect-[4/3]` + `object-cover` (consistent with the crop treatment already used for `images.programGroup` on the Programs page), grayscale-on-hover to match existing site styling. Each tile is a `<button>` with the `.focus-ring` utility class (per project accessibility convention) that calls `onOpen(index)`.
- **`src/components/Lightbox.jsx`** — modal overlay. Renders the full photo, close button (`Icon` "close"), prev/next arrows (`Icon` "chevron_left"/"chevron_right") scoped to the current country's photo list, wraps at the ends. `role="dialog" aria-modal="true"`. `Escape` closes; `ArrowLeft`/`ArrowRight` navigate. Focus returns to the triggering tile on close.

## Routing & Nav

- `src/data/site.js`: add `{ label: 'Gallery', to: '/gallery' }` to `navLinks`, positioned after Programs and before Partnership.
- `src/App.jsx`: add `<Route path="/gallery" element={<Gallery />} />`.

## Verification

No test framework exists in this repo (visual/manual verification is the existing pattern for this project). Verification plan:
1. `npm run dev`, drop a few placeholder images into each country folder.
2. Confirm each country section renders its grid with correct photo count and cropping.
3. Confirm lightbox open/close, prev/next navigation (including wraparound), and `Escape`/arrow-key handling.
4. Confirm keyboard-only operation (tab to a tile, Enter opens lightbox, arrow keys navigate, Escape closes, focus returns to the originating tile).
5. Confirm mobile breakpoint layout (grid column count, lightbox fits viewport).
6. Confirm an empty country folder (no photos yet) renders without error.

Once real photos are dropped into the three folders, no code changes are needed — rebuild (`npm run build`) and redeploy to S3 as usual.
