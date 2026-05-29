# React Router v6 Reference

Docs: https://reactrouter.com/en/6.30.1

## Setup

The app is wrapped in `<BrowserRouter>` in `src/main.jsx`. Routes are defined in `src/App.jsx`.

## Route structure

```jsx
// src/App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/programs" element={<Programs />} />
  <Route path="/partnership" element={<Partnership />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

## Key components

### `<Link>`
Use instead of `<a>` for internal navigation. Does not trigger a full page reload.

```jsx
import { Link } from 'react-router-dom';
<Link to="/programs">See Programs</Link>
<Link to="/contact?intent=donate">Donate</Link>
```

### `<NavLink>`
Like `<Link>` but receives an `isActive` boolean for styling the active route. Used in Navigation.

```jsx
import { NavLink } from 'react-router-dom';
<NavLink className={({ isActive }) => isActive ? 'font-bold' : ''} to="/programs">
  Programs
</NavLink>
```

### `<Navigate>`
Declarative redirect. Used as the catch-all `*` route to redirect unknown paths to `/`.

## Key hooks

### `useLocation()`
Returns the current location object — `pathname`, `search`, `hash`.

```jsx
const { pathname, search } = useLocation();
// Read query params:
const params = new URLSearchParams(search);
const intent = params.get('intent'); // e.g. "donate" from /contact?intent=donate
```

### `useNavigate()`
Programmatic navigation.

```jsx
const navigate = useNavigate();
navigate('/contact?intent=program');
```

## Query params pattern

The Contact page reads `?intent=` from the URL to pre-fill the form. Pass intents via:

```jsx
<Link to="/contact?intent=program">Request Details</Link>
<Link to="/contact?intent=donate">Donate</Link>
```

Valid intent values are defined in `src/data/site.js` under `inquiryIntents`.

## ScrollToTop

`App.jsx` includes a `<ScrollToTop>` component that calls `window.scrollTo(0,0)` on every route change. All page transitions start at the top.
