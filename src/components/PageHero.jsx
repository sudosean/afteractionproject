export default function PageHero({
  children,
  eyebrow,
  image,
  imageAlt,
  minHeight = 'min-h-[520px]',
  title,
}) {
  return (
    <section className={`relative flex ${minHeight} items-center overflow-hidden bg-primary`}>
      <div className="absolute inset-0 z-0">
        <img
          alt={imageAlt}
          className="h-full w-full object-cover opacity-80 grayscale-[20%]"
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="grainy-overlay absolute inset-0" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 py-20 md:px-12">
        <div className="max-w-2xl">
          {eyebrow ? (
            <span className="mb-6 inline-block rounded-sm bg-primary-container px-3 py-1 font-label text-xs uppercase tracking-[0.2em] text-on-primary-container">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mb-6 font-headline text-5xl font-black uppercase leading-none text-on-primary sm:text-6xl md:text-7xl">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </section>
  );
}
