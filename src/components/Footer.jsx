import { Link } from 'react-router-dom';
import { contactEmail } from '../data/site.js';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-surface/10 bg-tertiary text-on-primary">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-start justify-between gap-12 px-8 py-12 md:flex-row">
        <div className="max-w-sm space-y-6">
          <Logo size="footer" />
          <p className="font-body italic leading-relaxed text-on-primary/60">
            A dedicated resource for veterans, first responders, and healthcare professionals
            navigating the transition back to civilian life through restorative outdoor
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:gap-24">
          <div className="flex flex-col gap-4">
            <h5 className="font-label text-xs font-bold uppercase tracking-[0.2em] text-on-primary">
              Resources
            </h5>
            <nav aria-label="Footer resources" className="flex flex-col gap-3 font-body">
              <Link className="text-on-primary/60 transition-all hover:text-on-primary" to="/programs">
                Programs
              </Link>
              <Link
                className="text-on-primary/60 transition-all hover:text-on-primary"
                to="/partnership"
              >
                Sponsor a Trip
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-label text-xs font-bold uppercase tracking-[0.2em] text-on-primary">
              Support
            </h5>
            <nav aria-label="Footer support" className="flex flex-col gap-3 font-body">
              <Link className="text-on-primary/60 transition-all hover:text-on-primary" to="/contact">
                Contact Us
              </Link>
              <Link className="text-on-primary/60 transition-all hover:text-on-primary" to="/privacy">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="w-full space-y-6 md:w-auto md:text-right">
          <div className="flex gap-4 text-on-primary/50 md:justify-end">
            <a
              aria-label="Email The After Action Project"
              className="focus-ring rounded-lg p-1 transition-colors hover:text-on-primary"
              href={`mailto:${contactEmail}`}
            >
              <Icon name="mail" />
            </a>
            <Link
              aria-label="Contact The After Action Project"
              className="focus-ring rounded-lg p-1 transition-colors hover:text-on-primary"
              to="/contact"
            >
              <Icon name="contact_support" />
            </Link>
          </div>
          <div className="font-label text-[10px] uppercase leading-relaxed tracking-[0.3em] text-on-primary/40">
            &copy; {new Date().getFullYear()} The After Action Project.
            <br />
            Honor the mission.
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-8 pb-8 md:flex-row">
        <div className="hidden h-px flex-grow bg-on-primary/10 md:block" />
        <div className="flex items-center gap-2 text-on-primary/40">
          <Icon className="text-sm" name="verified_user" />
          <span className="font-label text-[10px] uppercase tracking-widest">
            Tactical Grade Security
          </span>
        </div>
      </div>
    </footer>
  );
}
