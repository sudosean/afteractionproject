# Tailwind CSS v3 Reference

Docs: https://v3.tailwindcss.com/docs

## Config location

`tailwind.config.js` — content glob covers `./index.html` and `./src/**/*.{js,jsx}`.

## Custom color tokens (Material Design 3 palette)

All colors are defined as Tailwind utilities. Use token names in components, never raw hex.

| Token | Role |
|---|---|
| `primary` | Deep forest green — primary brand color |
| `on-primary` | Text/icons on primary backgrounds |
| `primary-container` | Muted primary surface |
| `primary-fixed` | Light sage — used for CTA buttons on dark backgrounds |
| `on-primary-fixed` | Text on primary-fixed |
| `surface` | Off-white page background (`#faf9f4`) |
| `on-surface` | Default body text |
| `surface-container-low/high/highest` | Layered card/section backgrounds |
| `on-surface-variant` | Secondary/muted text |
| `secondary` | Warm tan — secondary brand color |
| `outline` / `outline-variant` | Borders and dividers |
| `error` / `error-container` | Form validation states |

## Custom border radius

Tailwind's default radii are overridden to be more subtle:

| Class | Value |
|---|---|
| `rounded` (default) | `0.125rem` — nearly square |
| `rounded-lg` | `0.25rem` |
| `rounded-xl` | `0.5rem` |
| `rounded-full` | `0.75rem` |

## Custom fonts

| Class | Font | Use for |
|---|---|---|
| `font-headline` | Work Sans | Page titles, section headings, nav labels |
| `font-label` | Work Sans | Small caps labels, buttons, tracking-widest text |
| `font-body` | Newsreader | Paragraph copy (italic serif) |

## Responsive breakpoints (Tailwind defaults)

| Prefix | Min-width |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

Max content width is `max-w-screen-2xl` with `px-6` horizontal padding.

## Plugins

- `@tailwindcss/forms` — normalizes native form element styles.

## Common patterns in this project

```jsx
// Section padding
<section className="py-20 md:py-24">

// Full-bleed content container
<div className="mx-auto max-w-screen-2xl px-6">

// 12-column editorial grid
<div className="grid grid-cols-1 gap-12 md:grid-cols-12">

// Primary CTA button
<button className="rounded-lg bg-primary px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-on-primary">

// Focus ring (apply to all interactive elements)
<a className="focus-ring ...">
```
