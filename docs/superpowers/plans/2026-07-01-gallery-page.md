# Gallery Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/gallery` page with a photo grid per country (Ireland, Argentina, New Zealand), with photos auto-discovered from folders and a keyboard-accessible lightbox for viewing full-size images.

**Architecture:** Photos live in `src/assets/gallery/<country-slug>/` and are discovered via a single static `import.meta.glob` call in `src/data/gallery.js`, grouped into an ordered `galleryCountries` array. `Gallery.jsx` renders one `PhotoGrid` per country and a single shared `Lightbox` for viewing/navigating photos.

**Tech Stack:** React 18, React Router v6, Vite (asset pipeline via `import.meta.glob`), Tailwind CSS v3.

## Global Constraints

- Never use raw hex colors in components — use the Tailwind token names defined in `tailwind.config.js` (e.g. `primary`, `on-surface`, `surface-container`).
- Every interactive element must have the `.focus-ring` utility class applied.
- Page-level root elements use the `.page-fade` class.
- `font-headline`/`font-label` = Work Sans (uppercase, tight tracking for headings/labels); `font-body` = Newsreader (italic serif for body text) — preserve this distinction.
- No test framework exists in this repo (confirmed: no test script in `package.json`, no test files). Verification for every task is via `npm run build` (catches syntax/import errors) and manual checks via `npm run dev`, matching this project's existing convention — do not introduce a test framework as part of this work.
- Images for the gallery must live under `src/assets/` (not `public/`) so Vite's asset pipeline (and `import.meta.glob`) processes them.

---

### Task 1: Gallery data module + photo folders

**Files:**
- Create: `src/assets/gallery/ireland/.gitkeep`
- Create: `src/assets/gallery/argentina/.gitkeep`
- Create: `src/assets/gallery/new-zealand/.gitkeep`
- Create: `src/data/gallery.js`

**Interfaces:**
- Consumes: nothing (leaf data module).
- Produces: `galleryCountries` — array of `{ slug: string, name: string, photos: Array<{ src: string, alt: string }> }`, ordered Ireland → Argentina → New Zealand, consumed by `Gallery.jsx` in Task 2.

- [ ] **Step 1: Create the empty gallery folders with `.gitkeep` placeholders**

```bash
mkdir -p src/assets/gallery/ireland src/assets/gallery/argentina src/assets/gallery/new-zealand
touch src/assets/gallery/ireland/.gitkeep src/assets/gallery/argentina/.gitkeep src/assets/gallery/new-zealand/.gitkeep
```

- [ ] **Step 2: Write the data module**

Create `src/data/gallery.js`:

```js
const photoModules = import.meta.glob('/src/assets/gallery/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const countryMeta = [
  { slug: 'ireland', name: 'Ireland' },
  { slug: 'argentina', name: 'Argentina' },
  { slug: 'new-zealand', name: 'New Zealand' },
];

export const galleryCountries = countryMeta.map(({ name, slug }) => {
  const photos = Object.entries(photoModules)
    .filter(([path]) => path.includes(`/gallery/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src], index) => ({ alt: `${name} program photo ${index + 1}`, src }));

  return { name, photos, slug };
});
```

- [ ] **Step 3: Verify the empty-folder case builds cleanly**

Run: `npm run build`
Expected: build succeeds with no errors (three empty folders produce `photos: []` for each country — this is the expected pre-population state).

- [ ] **Step 4: Verify the populated-folder case is picked up by the glob**

```bash
cp public/after-action-logo.png src/assets/gallery/ireland/test-photo.png
npm run build
find dist/assets -iname "test-photo*"
```

Expected: the `find` command prints a hashed filename like `dist/assets/test-photo-<hash>.png`, confirming `import.meta.glob` discovered the file and Vite's asset pipeline bundled it.

- [ ] **Step 5: Remove the temporary test image**

```bash
rm src/assets/gallery/ireland/test-photo.png
npm run build
```

Expected: build succeeds again with the folder back to empty.

- [ ] **Step 6: Commit**

```bash
git add src/assets/gallery src/data/gallery.js
git commit -m "Add gallery data module with auto-discovered photo folders"
```

---

### Task 2: PhotoGrid component + Gallery page + nav/route registration

**Files:**
- Create: `src/components/PhotoGrid.jsx`
- Create: `src/pages/Gallery.jsx`
- Modify: `src/data/site.js` (add nav link)
- Modify: `src/App.jsx` (add route)

**Interfaces:**
- Consumes: `galleryCountries` from `src/data/gallery.js` (Task 1); `images` from `src/data/site.js`; `PageHero`, `SectionHeader` from existing components.
- Produces: `PhotoGrid` component with props `{ photos: Array<{ src, alt }>, onOpen: (index: number) => void }`, consumed by `Gallery.jsx` here and still consumed (unchanged signature) after Task 3 wires real lightbox behavior in.

- [ ] **Step 1: Create the PhotoGrid component**

Create `src/components/PhotoGrid.jsx`:

```jsx
export default function PhotoGrid({ onOpen, photos }) {
  if (photos.length === 0) {
    return (
      <p className="font-body text-lg italic text-on-surface-variant">Photos coming soon.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo, index) => (
        <button
          className="focus-ring group relative aspect-[4/3] overflow-hidden rounded-lg"
          key={photo.src}
          onClick={() => onOpen(index)}
          type="button"
        >
          <img
            alt={photo.alt}
            className="absolute inset-0 h-full w-full object-cover grayscale-[10%] transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            src={photo.src}
          />
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create the Gallery page (interim — click does nothing yet, Task 3 wires the lightbox)**

Create `src/pages/Gallery.jsx`:

```jsx
import PageHero from '../components/PageHero.jsx';
import PhotoGrid from '../components/PhotoGrid.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { galleryCountries } from '../data/gallery.js';
import { images } from '../data/site.js';

export default function Gallery() {
  return (
    <div className="page-fade">
      <PageHero
        eyebrow="Photo Journal"
        image={images.programsHero}
        imageAlt="Program participants outdoors"
        title="Gallery"
      >
        <p className="max-w-lg font-body text-xl italic leading-relaxed text-on-primary/90">
          Moments from the field — a look back at the landscapes and communities behind every
          trip to Ireland, Argentina, and New Zealand.
        </p>
      </PageHero>

      <section className="mx-auto max-w-screen-2xl px-6 py-20 md:py-24">
        <SectionHeader title="Trips By Country">
          A running visual record of where we've been, updated as new trips wrap.
        </SectionHeader>

        {galleryCountries.map((country) => (
          <div className="mb-16 last:mb-0" key={country.slug}>
            <h3 className="mb-6 font-headline text-2xl font-bold uppercase tracking-wide text-primary">
              {country.name}
            </h3>
            <PhotoGrid onOpen={() => {}} photos={country.photos} />
          </div>
        ))}
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Register the route**

Modify `src/App.jsx` — add the import alongside the other page imports:

```jsx
import Gallery from './pages/Gallery.jsx';
```

And add the route inside `<Routes>`, after the Programs route:

```jsx
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/partnership" element={<Partnership />} />
```

- [ ] **Step 4: Add the nav link**

Modify `src/data/site.js` — update `navLinks` to:

```js
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Programs', to: '/programs' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Partnership', to: '/partnership' },
  { label: 'Contact', to: '/contact' },
];
```

- [ ] **Step 5: Verify in the browser**

Run: `npm run dev`
Open `http://localhost:5173/gallery`.
Expected: "Gallery" appears in the nav; the page loads with the hero, "Trips By Country" heading, and three empty-state sections each showing "Photos coming soon." (folders are still empty from Task 1).

- [ ] **Step 6: Commit**

```bash
git add src/components/PhotoGrid.jsx src/pages/Gallery.jsx src/data/site.js src/App.jsx
git commit -m "Add Gallery page with photo grid, nav link, and route"
```

---

### Task 3: Lightbox component + wire up interactivity + full verification

**Files:**
- Create: `src/components/Lightbox.jsx`
- Modify: `src/pages/Gallery.jsx` (replace the no-op `onOpen` with real lightbox state)

**Interfaces:**
- Consumes: `Icon` from `src/components/Icon.jsx`; `PhotoGrid`'s `onOpen(index)` callback contract from Task 2 (unchanged).
- Produces: `Lightbox` component with props `{ photos: Array<{ src, alt }>, activeIndex: number, onClose: () => void, onNavigate: (delta: number) => void }`. This is the final piece — nothing downstream depends on it.

- [ ] **Step 1: Create the Lightbox component**

Create `src/components/Lightbox.jsx`:

```jsx
import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

export default function Lightbox({ activeIndex, onClose, onNavigate, photos }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onNavigate(-1);
      } else if (event.key === 'ArrowRight') {
        onNavigate(1);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  const photo = photos[activeIndex];

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/90 p-4"
      role="dialog"
    >
      <button
        aria-label="Close gallery"
        className="focus-ring absolute right-6 top-6 text-on-primary"
        onClick={onClose}
        ref={closeButtonRef}
        type="button"
      >
        <Icon className="text-3xl" name="close" />
      </button>

      <button
        aria-label="Previous photo"
        className="focus-ring absolute left-4 text-on-primary sm:left-8"
        onClick={() => onNavigate(-1)}
        type="button"
      >
        <Icon className="text-4xl" name="chevron_left" />
      </button>

      <img
        alt={photo.alt}
        className="max-h-[85vh] max-w-full rounded-lg object-contain"
        src={photo.src}
      />

      <button
        aria-label="Next photo"
        className="focus-ring absolute right-4 text-on-primary sm:right-8"
        onClick={() => onNavigate(1)}
        type="button"
      >
        <Icon className="text-4xl" name="chevron_right" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Wire the lightbox into the Gallery page**

Replace the full contents of `src/pages/Gallery.jsx` with:

```jsx
import { useState } from 'react';
import Lightbox from '../components/Lightbox.jsx';
import PageHero from '../components/PageHero.jsx';
import PhotoGrid from '../components/PhotoGrid.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { galleryCountries } from '../data/gallery.js';
import { images } from '../data/site.js';

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState(null);

  function openPhoto(countrySlug, index) {
    setActivePhoto({ countrySlug, index });
  }

  function closePhoto() {
    setActivePhoto(null);
  }

  function navigatePhoto(delta) {
    setActivePhoto((current) => {
      if (!current) return current;
      const country = galleryCountries.find((entry) => entry.slug === current.countrySlug);
      const total = country.photos.length;
      const nextIndex = (current.index + delta + total) % total;
      return { ...current, index: nextIndex };
    });
  }

  const activeCountry = activePhoto
    ? galleryCountries.find((entry) => entry.slug === activePhoto.countrySlug)
    : null;

  return (
    <div className="page-fade">
      <PageHero
        eyebrow="Photo Journal"
        image={images.programsHero}
        imageAlt="Program participants outdoors"
        title="Gallery"
      >
        <p className="max-w-lg font-body text-xl italic leading-relaxed text-on-primary/90">
          Moments from the field — a look back at the landscapes and communities behind every
          trip to Ireland, Argentina, and New Zealand.
        </p>
      </PageHero>

      <section className="mx-auto max-w-screen-2xl px-6 py-20 md:py-24">
        <SectionHeader title="Trips By Country">
          A running visual record of where we've been, updated as new trips wrap.
        </SectionHeader>

        {galleryCountries.map((country) => (
          <div className="mb-16 last:mb-0" key={country.slug}>
            <h3 className="mb-6 font-headline text-2xl font-bold uppercase tracking-wide text-primary">
              {country.name}
            </h3>
            <PhotoGrid
              onOpen={(index) => openPhoto(country.slug, index)}
              photos={country.photos}
            />
          </div>
        ))}
      </section>

      {activeCountry ? (
        <Lightbox
          activeIndex={activePhoto.index}
          onClose={closePhoto}
          onNavigate={navigatePhoto}
          photos={activeCountry.photos}
        />
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Verify with real photos in the browser**

```bash
cp public/after-action-logo.png src/assets/gallery/ireland/test-1.png
cp public/after-action-logo.png src/assets/gallery/ireland/test-2.png
cp public/after-action-logo.png src/assets/gallery/ireland/test-3.png
npm run dev
```

Open `http://localhost:5173/gallery` and check, in order:
1. Ireland's grid shows 3 tiles; Argentina and New Zealand still show "Photos coming soon."
2. Click a tile → lightbox opens showing that photo, focus lands on the close button.
3. Click the right arrow twice → cycles through photos 2, 3, then wraps back to photo 1.
4. Click the left arrow → wraps backward to the last photo.
5. Press `Escape` → lightbox closes.
6. Tab to a tile with keyboard only, press `Enter` → lightbox opens; press `ArrowRight`/`ArrowLeft` → navigates; press `Escape` → closes, and focus returns to the tile that was activated (browser default behavior since the trigger element itself never lost focus in the DOM).
7. Resize the browser to a mobile width (~375px) → grid drops to 2 columns, lightbox image still fits within the viewport.

Expected: all of the above behave as described, no console errors.

- [ ] **Step 4: Remove the temporary test images**

```bash
rm src/assets/gallery/ireland/test-1.png src/assets/gallery/ireland/test-2.png src/assets/gallery/ireland/test-3.png
npm run build
```

Expected: build succeeds, folders back to empty (pre-population state, ready for real photos).

- [ ] **Step 5: Commit**

```bash
git add src/components/Lightbox.jsx src/pages/Gallery.jsx
git commit -m "Add lightbox with keyboard navigation to Gallery page"
```
