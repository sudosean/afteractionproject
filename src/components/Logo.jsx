import { images } from '../data/site.js';

const sizes = {
  nav: 'h-14 w-14 md:h-16 md:w-16',
  hero: 'h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36',
  footer: 'h-24 w-24',
};

export default function Logo({ className = '', decorative = false, size = 'nav' }) {
  const alt = decorative ? '' : 'The After Action Project logo';

  return (
    <span
      className={[
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-black/10',
        sizes[size] || sizes.nav,
        className,
      ].join(' ')}
    >
      <img
        alt={alt}
        aria-hidden={decorative ? 'true' : undefined}
        className="h-full w-full scale-[1.58] object-cover"
        src={images.logo}
      />
    </span>
  );
}
