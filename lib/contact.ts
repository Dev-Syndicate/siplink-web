/**
 * The contact form's fields, options and rules. These checks run in the
 * browser, so they help real visitors but cannot stop forged submissions.
 */

/** What visitors can ask about, from SipLink's own product lines. */
export const enquiryServices = [
  "Business CloudPBX",
  "USA Unlimited Calling",
  "SIP Trunking",
  "International Numbers & Porting",
  "Contact Center Solutions",
  "AI Voice Assistant",
  "Voice, SMS & WhatsApp APIs",
  "Microsoft Teams Integration",
  "Business Internet",
  "Other",
] as const;

/** Team size. Published plans start at 10 lines, but smaller teams still ask. */
export const enquiryUserCounts = [
  "Under 10 users",
  "10–25 users",
  "26–50 users",
  "51–100 users",
  "More than 100 users",
  "Not sure yet",
] as const;

/** Where SipLink's customers mostly are, then a way out for everyone else. */
export const enquiryCountries = [
  "India",
  "United States",
  "Canada",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Singapore",
  "Malaysia",
  "Australia",
  "Germany",
  "South Africa",
  "Other",
] as const;

export const enquiryLimits = {
  name: 100,
  company: 120,
  phone: 30,
  message: 2000,
} as const;

export type EnquiryFields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  users: string;
  services: string[];
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{6,}$/;

const oneOf = (options: readonly string[], value: string) => options.includes(value);

/** Every problem with an enquiry, by field; empty when it is fine to send. */
export function validateEnquiry(fields: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const company = fields.company.trim();
  const phone = fields.phone.trim();

  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > enquiryLimits.name) errors.name = "That name is a little long.";

  if (email && !EMAIL.test(email)) errors.email = "That email address doesn't look right.";

  if (company.length > enquiryLimits.company) errors.company = "That company name is a little long.";

  if (!phone) errors.phone = "Please add a number we can reach you on.";
  else if (!PHONE.test(phone) || phone.length > enquiryLimits.phone)
    errors.phone = "That phone number doesn't look right.";

  if (!oneOf(enquiryCountries, fields.country)) errors.country = "Please choose your country.";

  if (fields.users && !oneOf(enquiryUserCounts, fields.users)) errors.users = "Please choose a team size.";

  if (fields.services.length === 0 || !fields.services.every((service) => oneOf(enquiryServices, service)))
    errors.services = "Pick at least one thing you're looking for.";

  if (fields.message.trim().length > enquiryLimits.message)
    errors.message = `Please keep it under ${enquiryLimits.message} characters.`;

  if (!fields.consent) errors.consent = "Please agree so we can reply to you.";

  return errors;
}

/** The enquiry as plain text, for an email body or a mailto: fallback. */
export function enquiryText(fields: EnquiryFields): string {
  const message = fields.message.trim();
  const email = fields.email.trim();
  const company = fields.company.trim();
  return [
    `Name: ${fields.name.trim()}`,
    ...(email ? [`Email: ${email}`] : []),
    ...(company ? [`Company: ${company}`] : []),
    `Phone: ${fields.phone.trim()}`,
    `Country: ${fields.country}`,
    ...(fields.users ? [`Team size: ${fields.users}`] : []),
    `Looking for: ${fields.services.join(", ")}`,
    ...(message ? ["", message] : []),
  ].join("\n");
}
