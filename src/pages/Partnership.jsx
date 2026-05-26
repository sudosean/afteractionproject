import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import { images } from '../data/site.js';

const supportOptions = [
  {
    icon: 'night_shelter',
    title: 'Lodging & Basecamp',
    body: 'Provide space for decompression. We seek rustic cabins, retreat centers, or backcountry lodges for After Action phases.',
  },
  {
    icon: 'local_shipping',
    title: 'Logistics',
    body: 'Help move people, gear, and supplies safely into the field and back home.',
  },
  {
    icon: 'volunteer_activism',
    title: 'Funding',
    body: 'Underwrite participant costs, guide fees, equipment, and scholarships for those who serve.',
  },
];

export default function Partnership() {
  return (
    <div className="page-fade">
      <PageHero
        eyebrow="Strategic Alliance"
        image={images.partnershipHero}
        imageAlt="Outdoor partnership expedition"
        minHeight="min-h-[618px]"
        title={
          <>
            Forge a Path <br />
            to Healing.
          </>
        }
      >
        <p className="max-w-xl font-body text-xl italic leading-relaxed text-primary-fixed opacity-90 md:text-2xl">
          We do not just guide trips; we build bridges back to civilian and service life for
          veterans, first responders, and healthcare professionals. Your resources provide the
          operational support needed for those who gave everything.
        </p>
      </PageHero>

      <section className="mx-auto max-w-screen-2xl px-6 py-20 md:py-24">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-headline text-4xl font-extrabold uppercase text-primary">
              Ways to Support
            </h2>
            <div className="mt-4 h-1 w-20 bg-primary" />
          </div>
          <p className="max-w-md font-body text-xl italic text-on-surface-variant">
            Logistical excellence requires tactical partnerships. Choose how your organization
            impacts the mission.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-lg bg-surface-container-low p-8 transition-colors duration-500 hover:bg-primary-container md:col-span-2 md:row-span-2 md:p-10">
            <div className="relative z-10">
              <Icon
                className="mb-6 text-4xl text-primary group-hover:text-primary-fixed"
                name="travel_explore"
              />
              <h3 className="mb-4 font-headline text-3xl font-bold uppercase text-primary group-hover:text-on-primary">
                Donate Trips
              </h3>
              <p className="mb-8 font-body text-lg leading-relaxed text-on-surface-variant opacity-90 group-hover:text-primary-fixed">
                Are you a guide service or expedition leader? Open up roster spots on existing
                adventures for veterans to join at no cost.
              </p>
            </div>
            <Link
              className="focus-ring relative z-10 inline-flex w-fit items-center gap-2 rounded-lg font-label font-bold uppercase tracking-widest text-primary transition-all group-hover:translate-x-2 group-hover:text-on-primary"
              to="/contact?intent=partnership"
            >
              Inquire Now <Icon name="arrow_forward" />
            </Link>
          </article>

          {supportOptions.map((option) => (
            <article
              className="flex items-start gap-6 rounded-lg bg-surface-container p-8 transition-all hover:bg-surface-container-highest md:col-span-2"
              key={option.title}
            >
              <div className="rounded-sm bg-primary p-3 text-on-primary">
                <Icon name={option.icon} />
              </div>
              <div>
                <h3 className="mb-2 font-headline text-xl font-bold uppercase text-primary">
                  {option.title}
                </h3>
                <p className="font-body text-on-surface-variant">{option.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
