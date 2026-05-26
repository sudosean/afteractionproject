import { contactEmail } from '../data/site.js';

export default function Privacy() {
  return (
    <div className="page-fade mx-auto max-w-4xl px-6 py-20 md:py-24">
      <p className="mb-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Privacy
      </p>
      <h1 className="mb-8 font-headline text-4xl font-black uppercase leading-tight text-primary md:text-6xl">
        Privacy Policy
      </h1>
      <div className="space-y-6 font-body text-xl leading-relaxed text-on-surface-variant">
        <p>
          The After Action Project does not collect inquiry data on this static site. Contact form
          details are used to open an email draft on your device.
        </p>
        <p>
          Because there is no backend service connected yet, any information you choose to send is
          handled by your email provider after you send the draft.
        </p>
        <p>
          For privacy questions, contact{' '}
          <a className="font-bold text-primary underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
