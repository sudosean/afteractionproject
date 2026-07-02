const photoModules = import.meta.glob('/src/assets/gallery/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const countryMeta = [
  { slug: 'ireland', name: 'Ireland' },
  { slug: 'argentina', name: 'Argentina' },
  { slug: 'new-zealand', name: 'New Zealand' },
];

export const galleryCountries = countryMeta.map(({ name, slug }) => {
  const photos = Object.entries(photoModules)
    .filter(([path]) => path.includes(`/gallery/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src], index) => ({ alt: `${name} program photo ${index + 1}`, src }));

  return { name, photos, slug };
});
