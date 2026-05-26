import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import {
  contactEmail,
  images,
  inquiryIntents,
  messageByIntent,
} from '../data/site.js';
import { buildInquiryMailto } from '../utils/mailto.js';

function isValidIntent(value) {
  return inquiryIntents.some((option) => option.value === value);
}

const defaultMessages = Object.values(messageByIntent);

export default function Contact() {
  const [searchParams] = useSearchParams();
  const requestedIntent = searchParams.get('intent') || 'general';
  const initialIntent = isValidIntent(requestedIntent) ? requestedIntent : 'general';
  const [draftOpened, setDraftOpened] = useState(false);
  const [form, setForm] = useState({
    email: '',
    intent: initialIntent,
    message: messageByIntent[initialIntent],
    name: '',
    phone: '',
  });

  useEffect(() => {
    setForm((current) => ({
      ...current,
      intent: initialIntent,
      message:
        !current.message || defaultMessages.includes(current.message)
          ? messageByIntent[initialIntent]
          : current.message,
    }));
  }, [initialIntent]);

  const mailtoPreview = useMemo(() => buildInquiryMailto(form), [form]);

  function handleChange(event) {
    const { name, value } = event.target;
    setDraftOpened(false);
    setForm((current) => {
      if (name === 'intent') {
        return {
          ...current,
          intent: value,
          message:
            !current.message || defaultMessages.includes(current.message)
              ? messageByIntent[value]
              : current.message,
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDraftOpened(true);
    window.location.href = mailtoPreview;
  }

  return (
    <div className="page-fade">
      <section className="editorial-grid mx-auto max-w-screen-2xl gap-6 px-6 pb-12 pt-12 md:pt-24">
        <div className="col-span-12 md:col-span-7">
          <h2 className="mb-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-primary md:text-sm">
            Reach Out
          </h2>
          <h1 className="mb-8 font-headline text-5xl font-black uppercase leading-[0.95] text-primary md:text-7xl lg:text-8xl">
            Mission Ends,
            <br />
            Recovery Begins.
          </h1>
          <p className="max-w-xl font-body text-xl italic text-on-surface-variant md:text-2xl">
            We are in the field, but never out of reach. Whether you are a veteran, first
            responder, healthcare professional, family member, partner, or volunteer, the line is
            open.
          </p>
        </div>
        <div className="relative col-span-5 hidden md:block">
          <div className="absolute inset-0 rotate-2 rounded-lg bg-surface-container-low" />
          <img
            alt="Tactical outdoor gear"
            className="relative z-10 h-full w-full rounded-lg object-cover grayscale transition-all duration-700 hover:grayscale-0"
            src={images.contactGear}
          />
        </div>
      </section>

      <section className="editorial-grid mx-auto max-w-screen-2xl gap-8 px-6 py-6 md:gap-12 md:py-12 lg:gap-24">
        <div className="col-span-12 space-y-8 lg:col-span-5">
          <article className="group relative overflow-hidden rounded-lg bg-surface-container-low p-6 md:p-8">
            <div className="grainy-overlay absolute inset-0" />
            <h3 className="mb-6 font-label text-[10px] font-bold uppercase tracking-widest text-primary/60 md:text-xs">
              Leadership
            </h3>
            <h4 className="truncate font-headline text-xl font-extrabold uppercase text-primary md:text-2xl">
              Riely Barber
            </h4>
            <p className="mb-4 font-label text-[10px] font-medium text-on-surface-variant md:text-xs">
              FOUNDER / PRESIDENT
            </p>
            <a
              className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm font-medium break-words transition-colors hover:text-primary-container"
              href={`mailto:${contactEmail}`}
            >
              <Icon className="text-base" name="mail" /> {contactEmail}
            </a>
          </article>

          <article className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-lg bg-primary p-6 text-on-primary md:p-8">
            <div>
              <h3 className="mb-2 font-label text-[10px] font-bold uppercase tracking-widest opacity-60 md:text-xs">
                Base of Operations
              </h3>
              <p className="font-headline text-2xl font-black uppercase md:text-3xl">
                Key West, Florida
              </p>
            </div>
            <div className="mt-8 flex h-40 items-center justify-center overflow-hidden rounded-sm bg-primary-container">
              <Icon className="text-4xl" name="location_on" />
            </div>
          </article>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-lg border-l-4 border-primary bg-surface-container-lowest p-6 shadow-sm md:p-12">
            <h3 className="mb-4 font-headline text-3xl font-black uppercase text-primary md:text-4xl">
              Field Inquiry
            </h3>
            <p className="mb-8 font-body text-lg italic leading-relaxed text-on-surface-variant">
              This site has no backend yet. Submitting the form opens an email draft with your
              details so the inquiry is not lost.
            </p>

            {draftOpened ? (
              <div className="mb-8 rounded-lg bg-surface-container-low p-5">
                <div className="flex items-start gap-3">
                  <Icon className="mt-1 text-primary" name="draft" />
                  <div>
                    <p className="font-headline font-bold uppercase text-primary">
                      Email draft opened.
                    </p>
                    <p className="font-body text-on-surface-variant">
                      Send the draft from your email client. If it did not open, email{' '}
                      <a className="font-bold text-primary underline" href={`mailto:${contactEmail}`}>
                        {contactEmail}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-1">
                  <label
                    className="font-label text-[10px] font-bold uppercase tracking-widest text-primary md:text-xs"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    required
                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-3 font-body text-lg outline-none transition-all placeholder:text-on-surface/30 focus:border-primary focus:ring-0"
                    id="name"
                    name="name"
                    placeholder="Enter name..."
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="font-label text-[10px] font-bold uppercase tracking-widest text-primary md:text-xs"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    required
                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-3 font-body text-lg outline-none transition-all placeholder:text-on-surface/30 focus:border-primary focus:ring-0"
                    id="email"
                    name="email"
                    placeholder="Enter email..."
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-1">
                  <label
                    className="font-label text-[10px] font-bold uppercase tracking-widest text-primary md:text-xs"
                    htmlFor="intent"
                  >
                    Inquiry Type
                  </label>
                  <select
                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-3 font-body text-lg outline-none transition-all focus:border-primary focus:ring-0"
                    id="intent"
                    name="intent"
                    value={form.intent}
                    onChange={handleChange}
                  >
                    {inquiryIntents.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label
                    className="font-label text-[10px] font-bold uppercase tracking-widest text-primary md:text-xs"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-3 font-body text-lg outline-none transition-all placeholder:text-on-surface/30 focus:border-primary focus:ring-0"
                    id="phone"
                    name="phone"
                    placeholder="Optional"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  className="font-label text-[10px] font-bold uppercase tracking-widest text-primary md:text-xs"
                  htmlFor="message"
                >
                  Your Message
                </label>
                <textarea
                  required
                  className="w-full resize-none border-0 border-b border-outline-variant bg-transparent px-0 py-3 font-body text-lg outline-none transition-all placeholder:text-on-surface/30 focus:border-primary focus:ring-0"
                  id="message"
                  name="message"
                  placeholder="Detail your mission requirements or questions..."
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button
                className="focus-ring flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 font-label text-sm font-bold uppercase tracking-widest text-on-primary transition-colors hover:bg-primary-container sm:w-auto md:px-10"
                type="submit"
              >
                Open Email Draft <Icon className="text-sm" name="send" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
