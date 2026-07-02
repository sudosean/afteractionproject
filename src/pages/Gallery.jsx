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
