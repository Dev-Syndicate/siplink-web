import {
  BarChart3,
  Building2,
  MessageSquareMore,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/** The Essential plans shown in the pricing widget and comparison table. */
export type FeatureGroup = {
  heading: string;
  icon: LucideIcon;
  items: string[];
};

export type Tier = {
  name: string;
  tagline: string;
  /** Monthly USD price per user; null for the free tier. */
  price: number | null;
  cta: string;
  popular?: boolean;
  inherits?: string;
  groups: FeatureGroup[];
  integrations?: string[];
};

export const tiers: Tier[] = [
  {
    name: "Basic",
    tagline: "Ideal for getting started",
    price: null,
    cta: "Sign up now",
    groups: [
      {
        heading: "Calling",
        icon: Phone,
        items: [
          "Pay only for numbers",
          "Voicemail",
          "Click to dial",
          "Business hours",
          "Smart failover system",
        ],
      },
      {
        heading: "Messaging",
        icon: MessageSquareMore,
        items: ["SMS (text messages) & MMS"],
      },
      {
        heading: "Platform",
        icon: ShieldCheck,
        items: ["2FA", "Desktop & mobile apps"],
      },
    ],
  },
  {
    name: "Starter",
    tagline: "Ideal for small businesses",
    price: 18.95,
    cta: "Book a demo",
    inherits: "Everything in Basic + Telephony",
    groups: [
      {
        heading: "Calling",
        icon: Phone,
        items: [
          "Unlimited minutes (includes both landline & mobile calling)",
          "Forward to device",
          "Ring all devices",
          "Country blocking",
        ],
      },
      {
        heading: "Messaging",
        icon: MessageSquareMore,
        items: ["100 SMS (text messages)", "SMS templates", "Omnichannel inbox"],
      },
      {
        heading: "Analytics",
        icon: BarChart3,
        items: ["Basic report analytics", "Call logs (1 month)", "Audit logs"],
      },
    ],
    integrations: ["Zapier", "Slack", "Webhook"],
  },
  {
    name: "Professional",
    tagline: "Ideal for growing businesses",
    price: 20.95,
    cta: "Book a demo",
    popular: true,
    inherits: "Everything in Starter +",
    groups: [
      {
        heading: "Calling",
        icon: Phone,
        items: [
          "Unlimited minutes (includes both landline & mobile calling)",
          "Call recordings",
          "Multilingual IVR",
          "Call distribution (cascading)",
          "Custom greetings",
        ],
      },
      {
        heading: "Messaging",
        icon: MessageSquareMore,
        items: ["500 SMS (text messages)"],
      },
      {
        heading: "Analytics",
        icon: BarChart3,
        items: [
          "Reports / analytics",
          "AI voicemail transcription",
          "Call logs (lifetime)",
          "Role based access control",
          "Call transcription",
        ],
      },
    ],
    integrations: ["HubSpot", "Salesforce", "Pipedrive", "Zoho"],
  },
  {
    name: "Ultimate",
    tagline: "Ideal for advanced operations",
    price: 24.95,
    cta: "Book a demo",
    inherits: "Everything in Professional +",
    groups: [
      {
        heading: "Calling",
        icon: Phone,
        items: [
          "Unlimited minutes (includes both landline & mobile calling)",
          "Smart DID routing",
          "Multilevel IVR",
          "Call blocking",
          "Holiday routing",
          "CRM-based VIP routing",
        ],
      },
      {
        heading: "Messaging",
        icon: MessageSquareMore,
        items: ["1000 SMS (text messages)"],
      },
      {
        heading: "Analytics",
        icon: BarChart3,
        items: ["Call summary"],
      },
      {
        heading: "Enterprise",
        icon: Building2,
        items: [
          "Single sign-on (SSO)",
          "Custom integrations",
          "Dedicated account manager",
          "Personalized onboarding",
          "24×7 & phone support",
        ],
      },
    ],
    integrations: ["HubSpot", "Salesforce", "Zoho", "Zendesk"],
  },
];

