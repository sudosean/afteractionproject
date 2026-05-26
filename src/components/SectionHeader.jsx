export default function SectionHeader({ children, eyebrow, title }) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      {eyebrow ? (
        <span className="mb-4 block font-label text-sm uppercase tracking-[0.3em] text-primary/60">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-headline text-4xl font-black uppercase leading-tight text-primary md:text-5xl">
        {title}
      </h2>
      <div className="mt-4 h-1 w-24 bg-primary" />
      {children ? (
        <p className="mt-6 font-body text-xl italic leading-relaxed text-on-surface-variant">
          {children}
        </p>
      ) : null}
    </div>
  );
}
