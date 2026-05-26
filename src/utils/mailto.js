import { contactEmail, inquiryIntents, subjectByIntent } from '../data/site.js';

export function buildInquiryMailto({ email, intent, message, name, phone }) {
  const selectedIntent = inquiryIntents.some((option) => option.value === intent)
    ? intent
    : 'general';
  const intentLabel = inquiryIntents.find((option) => option.value === selectedIntent).label;

  const lines = [
    `Inquiry type: ${intentLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    '',
    'Message:',
    message,
  ].filter((line) => line !== null);

  const subject = subjectByIntent[selectedIntent] || subjectByIntent.general;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join('\n'),
  )}`;
}
