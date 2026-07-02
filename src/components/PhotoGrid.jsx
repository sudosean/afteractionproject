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
