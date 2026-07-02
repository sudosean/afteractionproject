import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';

export default function Lightbox({ activeIndex, onClose, onNavigate, photos }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
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
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [onClose, onNavigate]);

  const photo = photos[activeIndex];

  return createPortal(
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
    </div>,
    document.body,
  );
}
