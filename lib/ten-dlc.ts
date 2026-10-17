import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  Bot,
  Briefcase,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileText,
  Fingerprint,
  Globe,
  HeartPulse,
  Headset,
  LifeBuoy,
  ListChecks,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  MessageSquareText,
  Receipt,
  ShieldCheck,
  Target,
  UserCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Content for /company/10dlc, taken from
 * docs/SIPLINK_A2P_10DLC_Compliance_Guide.docx. The wording is tightened for
 * the web but every requirement, list item, example and caveat in the guide
 * is here, in the guide's order. Nothing is added: where the guide hedges
 * ("generally", "where applicable", "may"), so does this.
 */

export const tenDlcHero = {
  eyebrow: "A2P 10DLC Compliance Guide",
  title: "Compliant business SMS, made clear",
  description:
    "A practical guide to compliant business SMS messaging in the United States — what A2P 10DLC is, who needs it, and how to register, collect consent, and message responsibly.",
};

/* ------------------------------------------------------------ overview */

export const tenDlcDefinition = {
  parts: [
    { short: "A2P", long: "Application-to-Person", note: "Messages sent from a business application to a person." },
    { short: "10DLC", long: "10-Digit Long Code", note: "Standard 10-digit phone numbers, sent to U.S. mobile numbers." },
  ],
  summary:
    "A2P 10DLC is business application-based messaging sent to U.S. mobile numbers using standard 10-digit phone numbers. Registration tells carriers and messaging providers about the business and the purpose of its messaging campaign.",
  useCases: [
    { label: "Appointment reminders", icon: CalendarCheck },
    { label: "Customer notifications", icon: Bell },
    { label: "Candidate communications", icon: Users },
    { label: "Sales follow-ups", icon: Target },
    { label: "Service updates", icon: Headset },
    { label: "Billing notifications", icon: Receipt },
  ] satisfies { label: string; icon: LucideIcon }[],
};

export const tenDlcWhoNeedsIt = {
  statement:
    "Businesses sending application-based SMS to U.S. recipients using local 10-digit long-code numbers generally need to consider A2P 10DLC registration.",
  industries: [
    "Staffing & recruitment",
    "Healthcare",
    "Medical billing",
    "Sales & marketing",
    "Customer service",
    "Professional services",
    "Real estate",
    "Financial services",
    "Insurance",
    "Hospitality",
    "Retail",
    "Logistics",
    "Technology",
    "Appointment-based businesses",
  ],
  varies: [
    "Messaging provider",
    "Campaign type",
    "Business structure",
    "Phone-number type",
    "Nature of the messages",
  ],
};

/* -------------------------------------------------------- registration */

export const tenDlcRegistration = {
  intro:
    "Registration generally involves establishing information about the business and its messaging campaign. Depending on the registration type, businesses may need to provide:",
  groups: [
    {
      title: "Your business",
      icon: Building2,
      items: [
        { label: "Legal business name and business details", icon: Fingerprint },
        { label: "Business address and registration information", icon: MapPin },
        { label: "Business website and contact information", icon: Globe },
      ],
    },
    {
      title: "Your campaign",
      icon: Megaphone,
      items: [
        { label: "Industry and messaging use case", icon: Briefcase },
        { label: "Campaign purpose and description", icon: FileText },
        { label: "Intended recipients", icon: Users },
        { label: "Sample messages", icon: MessageSquareText },
      ],
    },
    {
      title: "Consent & policies",
      icon: ShieldCheck,
      items: [
        { label: "How recipients provide consent", icon: UserCheck },
        { label: "Opt-out and help processes", icon: LifeBuoy },
        { label: "Privacy Policy and Terms & Conditions URLs", icon: Lock },
      ],
    },
  ],
  callout:
    "The registered campaign should accurately represent the messages the business intends to send.",
};

/* ----------------------------------------------------- message lifecycle */

export type LifecycleStep = {
  id: string;
  step: string;
  kicker: string;
  title: string;
  body: string[];
  list?: { heading: string; items: string[] };
  example?: { from: "recipient" | "business"; text: string }[];
  note?: string;
  icon: LucideIcon;
};

/** Consent → disclosure → messaging → STOP → HELP → records. */
export const tenDlcLifecycle: LifecycleStep[] = [
  {
    id: "consent",
    step: "01",
    kicker: "Consent & opt-in",
    title: "Obtain consent before sending messages",
    body: [
      "Establish an appropriate process for obtaining permission before sending applicable business SMS.",
      "The opt-in experience should clearly identify the business and explain what types of messages the recipient is agreeing to receive.",
    ],
    list: {
      heading: "Consent may be collected through",
      items: [
        "Website forms",
        "Online registration",
        "SMS keywords",
        "Customer or patient portals",
        "Appointment forms",
        "Paper or digital forms",
        "In-person registration",
        "Other documented mechanisms",
      ],
    },
    icon: UserCheck,
  },
  {
    id: "disclosures",
    step: "02",
    kicker: "Opt-in disclosures",
    title: "Make opt-in disclosures clear",
    body: ["Where appropriate, the opt-in experience should communicate:"],
    list: {
      heading: "Disclose",
      items: [
        "Who will send the messages",
        "The purpose and types of messages",
        "Expected messaging frequency, where applicable",
        "How to opt out",
        "How to get help",
        "Message and data-rate disclosures, where applicable",
        "Links to applicable Terms & Conditions",
        "Links to the Privacy Policy",
      ],
    },
    note: "The opt-in process should be consistent with the campaign that is actually registered and operated.",
    icon: ClipboardList,
  },
  {
    id: "opt-out",
    step: "03",
    kicker: "Opt-out & STOP",
    title: "Give recipients an easy way to unsubscribe",
    body: [
      "Recipients should have a simple way to stop receiving messages. STOP is a commonly supported SMS opt-out keyword.",
      "Process opt-out requests promptly and keep suppression records, so opted-out recipients are not accidentally re-added to future campaigns.",
    ],
    example: [
      { from: "recipient", text: "STOP" },
      { from: "business", text: "[Business Name]: You have been unsubscribed and will no longer receive messages from us." },
    ],
    icon: ShieldCheck,
  },
  {
    id: "help",
    step: "04",
    kicker: "Help & support",
    title: "Give recipients a way to ask for help",
    body: [
      "Messaging programs should provide a way to request assistance — a HELP keyword, a customer-service phone number, a support email, or a website.",
    ],
    example: [
      { from: "recipient", text: "HELP" },
      { from: "business", text: "[Business Name]: For assistance, contact us at [support number] or visit [website]." },
    ],
    icon: LifeBuoy,
  },
  {
    id: "records",
    step: "05",
    kicker: "Consent records",
    title: "Maintain accurate messaging records",
    body: [
      "Keep appropriate records showing how recipients entered a messaging program. Accurate records help prevent unwanted messages and support responsible messaging practices.",
    ],
    list: {
      heading: "Where applicable, records should establish",
      items: [
        "When consent was obtained",
        "How consent was obtained",
        "What the recipient agreed to receive",
        "Which campaign the consent relates to",
        "When an opt-out was received",
        "Whether the recipient was removed from future messaging",
      ],
    },
    icon: ClipboardCheck,
  },
];

/* ------------------------------------------------------ message guidelines */

export const tenDlcGuidelines = [
  {
    title: "Keep messages relevant and expected",
    body: "Business SMS should match the purpose communicated during opt-in and campaign registration — relevant, accurate, transparent, and appropriate for the intended audience. Avoid using consent collected for one purpose to send unrelated messages.",
    icon: Target,
  },
  {
    title: "Clearly identify your business",
    body: "Recipients should be able to understand which business or organization is contacting them.",
    icon: BadgeCheck,
  },
  {
    title: "Use representative sample messages",
    body: "Campaign sample messages should accurately represent the content that will be sent.",
    icon: MessageSquare,
  },
];

export const tenDlcSampleMessages = [
  {
    sender: "ABC Staffing",
    text: "ABC Staffing: Your interview for the Software Engineer position is confirmed for Tuesday at 10:00 AM. Reply STOP to opt out.",
    tag: "Identifies the business",
  },
  {
    sender: "ABC Medical",
    text: "ABC Medical: Your appointment is confirmed for June 12 at 2:00 PM. Reply STOP to opt out.",
    tag: "Appointment reminder",
  },
  {
    sender: "ABC Staffing",
    text: "ABC Staffing: A recruiter has an update regarding your application. Reply to this message to continue the conversation.",
    tag: "Candidate update",
  },
  {
    sender: "ABC Services",
    text: "ABC Services: Your payment reminder is due on June 15. Contact us at 800-000-0000 if you need assistance.",
    tag: "Payment reminder",
  },
];

/* ------------------------------------------------------------- privacy */

export const tenDlcPrivacy = {
  points: [
    "Maintain an appropriate Privacy Policy explaining how personal information is collected, used, stored, and shared.",
    "SMS programs should also follow the privacy and security obligations that apply to the business and its industry.",
  ],
  sensitive: [
    "Healthcare",
    "Medical billing",
    "Financial services",
    "Insurance",
    "Legal services",
    "Human resources",
  ],
  warning:
    "A2P 10DLC registration does not by itself make a business compliant with industry-specific privacy laws.",
};

/* ------------------------------------------------------------ prohibited */

export const tenDlcProhibited = {
  intro:
    "Businesses should not use A2P messaging for fraudulent, deceptive, misleading, or abusive communications. Problematic practices include:",
  items: [
    "Impersonating another organization",
    "Misrepresenting the sender",
    "Phishing or fraudulent messages",
    "Ignoring opt-out requests",
    "Sending unsolicited bulk messages",
    "Misrepresenting campaign purpose",
    "Circumventing carrier filtering or compliance controls",
    "Sending content that violates applicable provider or carrier policies",
  ],
  icon: AlertTriangle,
};

/* ------------------------------------------------------------ industries */

export const tenDlcIndustries = [
  {
    name: "Staffing & Recruitment",
    icon: Users,
    body: "Candidate outreach, interview scheduling, application updates, job alerts, placement communications, and onboarding may require appropriate candidate consent and messaging controls.",
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
    body: "Appointment reminders, scheduling, and patient communications may involve additional healthcare privacy and security requirements. Evaluate whether SMS is appropriate for the information being transmitted.",
  },
  {
    name: "Medical Billing",
    icon: CreditCard,
    body: "Payment reminders, billing notifications, account communications, and support messages may involve additional privacy, security, and financial-information requirements.",
  },
  {
    name: "Sales & Marketing",
    icon: Megaphone,
    body: "Lead follow-ups, promotions, product information, and customer engagement require careful attention to consent, disclosures, frequency, opt-out handling, and applicable marketing laws.",
  },
  {
    name: "Customer Service",
    icon: Headset,
    body: "Support updates, case notifications, scheduling, and service alerts should remain consistent with the purpose for which the customer provided consent.",
  },
];

/* -------------------------------------------------------------- solution */

export const tenDlcSolution = {
  title: "Business messaging built for modern communication",
  body: "SIPLINK brings business calling, SMS, communication tools, and workflow automation together to help organizations communicate with customers, candidates, patients, clients, and prospects.",
  supports: [
    { label: "A2P 10DLC registration", icon: ClipboardCheck },
    { label: "Business SMS", icon: MessageSquareText },
    { label: "Customer communication", icon: MessageSquare },
    { label: "Automated notifications", icon: Bot },
    { label: "Appointment reminders", icon: CalendarCheck },
    { label: "Candidate communication", icon: Users },
    { label: "Sales follow-ups", icon: Target },
    { label: "Customer support", icon: Headset },
    { label: "CRM-connected messaging", icon: Workflow },
  ],
  closing:
    "Whether you operate a staffing agency, healthcare organization, medical billing company, sales team, or another business, SIPLINK can help you build a more organized business messaging workflow.",
  tagline: "Connect with your customers. Communicate with confidence. Grow with SIPLINK.",
  icon: ListChecks,
  contactIcon: Mail,
};

/* ------------------------------------------------------------------ FAQ */

export const tenDlcFaqs = [
  {
    question: "What does A2P 10DLC mean?",
    answer:
      "A2P 10DLC stands for Application-to-Person 10-Digit Long Code. It is a framework for business application-based messaging sent to U.S. mobile numbers using standard 10-digit phone numbers.",
  },
  {
    question: "Does every business need A2P 10DLC?",
    answer:
      "Businesses sending application-based SMS to U.S. recipients using 10-digit long-code numbers generally need to consider A2P 10DLC registration. Requirements can vary depending on the provider, business type, number type, and campaign.",
  },
  {
    question: "What is an A2P 10DLC campaign?",
    answer:
      "A campaign represents a specific business messaging purpose or use case. It describes what messages are sent, who receives them, why they are sent, and how recipients can opt in and out.",
  },
  {
    question: "Do I need customer consent?",
    answer:
      "Businesses should establish an appropriate consent process before sending applicable business SMS. The required level and type of consent can depend on the message type and applicable laws and regulations.",
  },
  {
    question: "Can I send marketing messages through 10DLC?",
    answer:
      "Marketing messages may be sent through appropriate registered campaigns, but businesses need to pay particular attention to consent, disclosures, opt-out mechanisms, campaign registration, and applicable marketing laws.",
  },
  {
    question: "What is STOP?",
    answer:
      "STOP is a commonly supported SMS opt-out keyword. Recipients can use it to request that they no longer receive messages from a messaging campaign.",
  },
  {
    question: "Do I need a Privacy Policy?",
    answer:
      "Businesses should maintain an appropriate Privacy Policy. Current A2P registration processes may also require or request publicly accessible Privacy Policy and Terms & Conditions information, depending on the registration method and provider.",
  },
  {
    question: "Do I need Terms & Conditions?",
    answer:
      "Businesses should maintain appropriate Terms & Conditions for their services. Current registration processes may require Terms & Conditions information as part of campaign registration.",
  },
  {
    question: "Can I use the same campaign for every type of message?",
    answer:
      "Not necessarily. A campaign represents a particular messaging use case, so businesses should ensure that campaign registration accurately represents the messages being sent. Multiple campaigns may be appropriate when a business has different messaging purposes.",
  },
  {
    question: "Does A2P 10DLC guarantee message delivery?",
    answer:
      "No. Registration does not guarantee delivery. Carriers and messaging providers may apply filtering, throughput limits, content restrictions, and other controls.",
  },
  {
    question: "Does A2P 10DLC replace other compliance requirements?",
    answer:
      "No. A2P 10DLC is one part of a business messaging compliance strategy. Businesses must also consider applicable federal, state, local, industry-specific, privacy, marketing, and consumer-protection requirements.",
  },
  {
    question: "How long does A2P 10DLC registration take?",
    answer:
      "Registration and campaign review times can vary. Review timelines depend on the provider, campaign type, registration information, and any additional review requirements.",
  },
  {
    question: "What information is needed for registration?",
    answer:
      "Depending on the business and registration type, information may include business details, brand information, campaign purpose, message samples, opt-in process, opt-out and help information, and Privacy Policy and Terms & Conditions information.",
  },
];

export const tenDlcDisclaimer =
  "This guide is provided for general informational purposes and does not constitute legal advice. A2P 10DLC requirements, carrier policies, messaging-provider requirements, and applicable laws may change over time. Businesses are responsible for determining and maintaining compliance with the laws, regulations, carrier requirements, and industry-specific obligations applicable to their messaging programs.";

/** On-page navigation for the guide. */
export const tenDlcSections = [
  { id: "overview", label: "Overview" },
  { id: "registration", label: "Registration" },
  { id: "lifecycle", label: "Consent & opt-out" },
  { id: "guidelines", label: "Messaging" },
  { id: "privacy", label: "Privacy" },
  { id: "industries", label: "Industries" },
  { id: "faq", label: "FAQ" },
];
