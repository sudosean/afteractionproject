import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../data/site.js';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';

const desktopLinkClass = ({ isActive }) =>
  [
    'font-label text-sm uppercase tracking-wider transition-colors duration-300',
    isActive
      ? 'border-b-2 border-primary pb-1 font-bold text-primary'
      : 'font-medium text-primary/70 hover:text-primary',
  ].join(' ');

const mobileLinkClass = ({ isActive }) =>
  [
    'rounded-lg px-4 py-3 font-label text-sm uppercase tracking-wider transition-colors',
    isActive ? 'bg-primary text-on-primary' : 'text-primary hover:bg-surface-container-high',
  ].join(' ');

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-container-high bg-surface/95 backdrop-blur">
      <nav aria-label="Primary navigation">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary md:hidden"
              type="button"
              onClick={() => setIsOpen((current) => !current)}
            >
              <Icon name={isOpen ? 'close' : 'menu'} />
            </button>
            <Link className="focus-ring rounded-sm" to="/">
              <Logo size="nav" />
            </Link>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink className={desktopLinkClass} key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link
            className="focus-ring inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2 font-label text-xs font-bold uppercase tracking-widest text-on-primary transition-all active:scale-[0.98] active:opacity-80 sm:px-6"
            to="/contact?intent=donate"
          >
            Donate
          </Link>
        </div>

        {isOpen ? (
          <div className="border-t border-surface-container-high bg-surface md:hidden">
            <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <NavLink className={mobileLinkClass} key={link.to} to={link.to}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
