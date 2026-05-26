import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Logo from '../components/Logo.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { images } from '../data/site.js';

export default function Home() {
  return (
    <div className="page-fade">
      <section className="relative flex min-h-[680px] items-center overflow-hidden md:min-h-[795px]">
        <div className="absolute inset-0 z-0">
          <img
            alt="Outdoor recovery expedition"
            className="h-full w-full object-cover"
            src={images.homeHero}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container/80 mix-blend-multiply" />
          <div className="grainy-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-12">
          <div className="md:col-span-8 lg:col-span-7">
            <Logo className="mb-8" decorative size="hero" />
            <h1 className="mb-6 font-headline text-4xl font-black uppercase leading-[0.95] text-on-primary sm:text-5xl md:text-7xl lg:text-8xl">
              Recovery is a <br />
              <span className="text-primary-fixed">field mission.</span>
            </h1>
            <p className="mb-10 max-w-xl font-body text-xl italic leading-relaxed text-on-primary/85 md:text-2xl">
              Forging paths of resilience for veterans, first responders, and healthcare
              professionals through the uncompromising power of the outdoors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="focus-ring rounded-lg bg-primary-fixed px-8 py-4 text-center font-headline text-sm font-bold uppercase tracking-widest text-on-primary-fixed transition-all hover:brightness-110"
                to="/programs"
              >
                See Our Programs
              </Link>
              <Link
                className="focus-ring rounded-lg border border-on-primary/30 px-8 py-4 text-center font-headline text-sm font-bold uppercase tracking-widest text-on-primary transition-all hover:bg-on-primary/10"
                to="/partnership"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface py-20 md:py-24">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
          <div className="md:col-span-4 md:col-start-2">
            <span className="mb-4 block font-label text-sm uppercase tracking-[0.3em] text-primary/60">
              The Charter
            </span>
            <h2 className="font-headline text-4xl font-bold uppercase leading-tight text-primary md:text-5xl">
              Our Mission <br />
              Statement.
            </h2>
          </div>
          <div className="flex flex-col justify-center md:col-span-6">
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-4 top-0 font-headline text-7xl font-black text-primary-container/10 md:-left-8"
              >
                "
              </span>
              <p className="mb-6 font-body text-2xl italic leading-snug text-on-surface-variant md:text-3xl">
                The After Action Project provides veterans, first responders, healthcare
                professionals, and their families with outdoor experiences that foster recovery,
                resilience, and connection for those impacted by physical and mental injuries,
                stress, trauma, and post-traumatic stress.
              </p>
              <p className="max-w-lg font-body text-lg leading-relaxed text-on-surface/70">
                We believe the discipline of the field should not end at discharge. We translate
                tactical excellence into personal recovery through trekking, survival training, and
                community for all who serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-20 md:py-24">
        <div className="mx-auto max-w-screen-2xl px-6">
          <SectionHeader title="Why This Matters" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <article className="group relative min-h-[420px] overflow-hidden rounded-sm lg:col-span-2 lg:min-h-[500px]">
              <img
                alt="Participants walking together outdoors"
                className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                src={images.fieldTeam}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary via-primary/40 to-transparent p-6 md:p-12">
                <h3 className="mb-4 font-headline text-3xl font-bold uppercase text-on-primary md:text-4xl">
                  No Man Left Behind
                </h3>
                <p className="max-w-md font-body text-xl leading-relaxed text-on-primary/85">
                  Isolation is a significant threat to those transitioning from high-stress service.
                  We bridge the gap between service and civilian life by restoring the brotherhood
                  found in the field.
                </p>
              </div>
            </article>
            <article className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-sm bg-surface-container-highest p-8 md:p-10">
              <div className="grainy-overlay absolute inset-0" />
              <div className="relative z-10">
                <Icon className="mb-6 text-4xl text-primary" fill name="landscape" />
                <h3 className="mb-4 font-headline text-2xl font-bold uppercase text-primary">
                  Nature's Therapy
                </h3>
                <p className="font-body text-lg leading-relaxed text-on-surface-variant">
                  Traditional clinical settings often fall short for those who serve others. The
                  outdoors offers a raw, honest environment where healing happens through movement
                  and shared hardship.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative bg-primary py-20 text-on-primary md:py-24">
        <div className="absolute inset-0 opacity-10">
          <img alt="" className="h-full w-full object-cover" src={images.homeCta} />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 font-headline text-4xl font-black uppercase italic md:text-6xl">
            Ready for the Next Operation?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl font-body text-xl italic text-on-primary/80 md:text-2xl">
            "The mission is never over. It only changes environment." - Join us in honoring the
            transition.
          </p>
          <div className="flex flex-col justify-center gap-6 md:flex-row">
            <Link
              className="focus-ring rounded-lg bg-surface px-10 py-5 text-center font-headline font-black uppercase tracking-widest text-primary shadow-xl shadow-black/20 transition-all hover:bg-surface-container-highest"
              to="/partnership"
            >
              Become a Partner
            </Link>
            <Link
              className="focus-ring rounded-lg border border-primary-fixed/30 bg-primary-container px-10 py-5 text-center font-headline font-black uppercase tracking-widest text-primary-fixed transition-all hover:bg-primary/50"
              to="/contact?intent=program"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
