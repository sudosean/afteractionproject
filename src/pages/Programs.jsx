import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { images } from '../data/site.js';

const programs = [
  {
    icon: 'groups',
    label: 'High Support',
    title: 'Small Group Recovery',
    body: 'Intimate settings where shared experiences form the foundation of lasting resilience. Focused on psychological safety and peer-driven healing for those serving on our front lines.',
  },
  {
    icon: 'water_lux',
    label: 'Field Focus',
    title: 'Tactical Sustenance',
    body: "Hunting and fishing trips that demand focus, patience, and reconnection with the natural world's rhythm.",
  },
  {
    icon: 'hiking',
    label: 'Transition',
    title: 'Wilderness Reset',
    body: 'Guided outdoor movement, recovery routines, and structured decompression for participants who need space to recalibrate after service.',
  },
];

export default function Programs() {
  return (
    <div className="page-fade">
      <PageHero
        eyebrow="Field Operations"
        image={images.programsHero}
        imageAlt="Field program participants outdoors"
        minHeight="min-h-[530px]"
        title="Programs & Pathways"
      >
        <p className="max-w-lg font-body text-xl italic leading-relaxed text-on-primary/90">
          Reclaiming the calm. We facilitate tactical-grade outdoor experiences designed for the
          quiet moments of recovery for veterans, first responders, and healthcare professionals.
        </p>
      </PageHero>

      <section className="mx-auto max-w-screen-2xl px-6 py-20 md:py-24">
        <SectionHeader title="Outdoor Recovery Tracks">
          Each track is designed to create connection, focus, and post-mission decompression without
          pretending that one format fits every participant.
        </SectionHeader>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <article className="group relative overflow-hidden rounded-lg bg-surface-container-low transition-all duration-500 lg:col-span-8">
            <div className="flex h-full flex-col md:flex-row">
              <div className="flex flex-col justify-between p-8 md:w-1/2 md:p-12">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <Icon className="text-primary" name={programs[0].icon} />
                    <span className="font-label text-xs uppercase tracking-widest text-secondary">
                      {programs[0].label}
                    </span>
                  </div>
                  <h3 className="mb-4 font-headline text-3xl font-bold uppercase text-primary">
                    {programs[0].title}
                  </h3>
                  <p className="font-body text-lg italic leading-relaxed text-on-surface-variant">
                    {programs[0].body}
                  </p>
                </div>
                <Link
                  className="focus-ring mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-3 font-label text-xs font-bold uppercase tracking-widest text-on-primary"
                  to="/contact?intent=program"
                >
                  Request Details <Icon className="text-sm" name="arrow_forward" />
                </Link>
              </div>
              <div className="relative min-h-[300px] overflow-hidden md:w-1/2">
                <img
                  alt="Small group outdoor recovery session"
                  className="absolute inset-0 h-full w-full object-cover grayscale-[30%] transition-transform duration-700 group-hover:scale-105"
                  src={images.programGroup}
                />
              </div>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-8 lg:col-span-4">
            {programs.slice(1).map((program, index) => (
              <article
                className={[
                  'relative overflow-hidden rounded-lg p-8 md:p-10',
                  index === 0
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-highest text-on-surface',
                ].join(' ')}
                key={program.title}
              >
                <div className="relative z-10">
                  <Icon
                    className={index === 0 ? 'mb-6 text-4xl opacity-80' : 'mb-6 text-4xl text-primary'}
                    fill
                    name={program.icon}
                  />
                  <span
                    className={[
                      'mb-3 block font-label text-xs uppercase tracking-widest',
                      index === 0 ? 'text-on-primary/70' : 'text-secondary',
                    ].join(' ')}
                  >
                    {program.label}
                  </span>
                  <h3
                    className={[
                      'mb-4 font-headline text-3xl font-bold uppercase',
                      index === 0 ? 'text-on-primary' : 'text-primary',
                    ].join(' ')}
                  >
                    {program.title}
                  </h3>
                  <p
                    className={[
                      'font-body text-lg italic leading-relaxed',
                      index === 0 ? 'text-on-primary/80' : 'text-on-surface-variant',
                    ].join(' ')}
                  >
                    {program.body}
                  </p>
                </div>
                <div className="grainy-overlay absolute inset-0" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
