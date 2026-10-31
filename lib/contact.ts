/**
 * The contact form's fields, options and rules, shared by the form (to show
 * errors as visitors type) and the server action (which re-checks everything,
 * since anything from the browser can be forged).
 */

/** What visitors can ask about, from SipLink's own product lines. */
export const enquiryServices = [
  "Business phone system",
  "SIP trunking",
  "Call center",
  "Numbers & porting",
  "AI Voice Assistant",
  "Voice, SMS & WhatsApp APIs",
  "Business internet",
  "Not sure yet",
] as const;

/** Team size, in lines; published plans start at 10. */
export const enquiryLineCounts = [
  "10–25 lines",
  "26–50 lines",
  "51–100 lines",
  "More than 100 lines",
  "Not sure yet",
] as const;

export const enquiryLimits = {
  name: 100,
  company: 120,
  phone: 30,
  messageMin: 10,
  message: 2000,
} as const;

export type EnquiryFields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  services: string[];
  lines: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{6,}$/;

/** Every problem with an enquiry, by field; empty when it is fine to send. */
export function validateEnquiry(fields: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const phone = fields.phone.trim();
  const message = fields.message.trim();

  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > enquiryLimits.name) errors.name = "That name is a little long.";

  if (!email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL.test(email)) errors.email = "That email address doesn't look right.";

  if (fields.company.trim().length > enquiryLimits.company)
    errors.company = "That company name is a little long.";

  if (phone && (!PHONE.test(phone) || phone.length > enquiryLimits.phone))
    errors.phone = "That phone number doesn't look right.";

  const services = fields.services.filter((s) =>
    (enquiryServices as readonly string[]).includes(s),
  );
  if (services.length === 0 || services.length !== fields.services.length)
    errors.services = "Pick at least one thing you need.";

  if (fields.lines && !(enquiryLineCounts as readonly string[]).includes(fields.lines))
    errors.lines = "Please pick one of the options.";

  if (!message) errors.message = "Tell us a little about what you need.";
  else if (message.length < enquiryLimits.messageMin)
    errors.message = "A few more words will help us reply properly.";
  else if (message.length > enquiryLimits.message)
    errors.message = `Please keep it under ${enquiryLimits.message} characters.`;

  return errors;
}

/** The enquiry as plain text, for an email body or a mailto: fallback. */
export function enquiryText(fields: EnquiryFields): string {
  const company = fields.company.trim();
  const phone = fields.phone.trim();
  return [
    `Name: ${fields.name.trim()}`,
    `Email: ${fields.email.trim()}`,
    company ? `Company: ${company}` : null,
    phone ? `Phone: ${phone}` : null,
    `Interested in: ${fields.services.join(", ")}`,
    fields.lines ? `Team size: ${fields.lines}` : null,
    "",
    fields.message.trim(),
  ]
    .filter((line) => line !== null)
    .join("\n");
}
