# Material Symbols Outlined Reference

Docs: https://fonts.google.com/icons
Icon search: https://fonts.google.com/icons?icon.set=Material+Symbols

## How it's loaded

The font is loaded via Google Fonts CDN in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
```

## Usage in this project

Icons are used via the `<Icon>` component (`src/components/Icon.jsx`):

```jsx
import Icon from '../components/Icon.jsx';

<Icon name="landscape" />
<Icon name="arrow_forward" className="text-sm" />
<Icon name="menu" />
<Icon name="close" />
<Icon fill name="water_lux" className="mb-6 text-4xl text-primary" />
```

Props:
- `name` (required) — the icon identifier (snake_case, matches Google Fonts icon names)
- `fill` (boolean) — renders the filled variant (default is outlined)
- `className` — passed through for sizing and color

## Font variation settings

The `.material-symbols-outlined` CSS class in `styles.css` sets defaults:

```css
font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
```

When `fill` prop is passed, `FILL` is set to `1`.

## Icon sizing

Icons inherit font size from their container. Use Tailwind text utilities:

| Class | Size |
|---|---|
| `text-sm` | ~14px |
| `text-base` | 16px |
| `text-xl` | 20px |
| `text-2xl` | 24px |
| `text-4xl` | 36px |

## Icons currently used in this project

| Name | Where used |
|---|---|
| `menu` | Mobile nav open |
| `close` | Mobile nav close |
| `arrow_forward` | CTA button arrow |
| `landscape` | Programs page — Nature's Therapy card |
| `groups` | Programs page — Small Group Recovery |
| `water_lux` | Programs page — Tactical Sustenance |
| `hiking` | Programs page — Wilderness Reset |

## Finding new icons

Go to https://fonts.google.com/icons?icon.set=Material+Symbols, search for the concept, and copy the icon name shown (use the snake_case version). Only use icons from the **Outlined** style to match the loaded font variant.
