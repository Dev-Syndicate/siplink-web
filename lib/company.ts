import {
  Activity,
  BadgeCheck,
  Bot,
  Brain,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  Cpu,
  FileText,
  GitBranch,
  Globe,
  GraduationCap,
  Headphones,
  Headset,
  HeartHandshake,
  HeartPulse,
  Layers,
  Lightbulb,
  Lock,
  MessagesSquare,
  Network,
  Newspaper,
  PhoneCall,
  Puzzle,
  Rocket,
  Scale,
  ServerCog,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * 1. Company Mission, Vision & Core Values (Section 1 of why_siplink.md)
 * ---------------------------------------------------------------------- */

export const companyMissionVision = {
  mission: {
    title: "Our Mission",
    statement:
      "To make business communication simpler, smarter, and more accessible through reliable cloud technologies and intelligent communication solutions.",
    icon: Rocket,
  },
  vision: {
    title: "Our Vision",
    statement:
      "To become a trusted global communications technology partner for businesses that want to connect faster, work smarter, and grow without communication limitations.",
    icon: Globe,
  },
  pillars: [
    {
      title: "Reliability",
      description:
        "Engineered with carrier-neutral POPs, redundant routes, and proactive 24/7 network monitoring to safeguard business continuity.",
      icon: Network,
    },
    {
      title: "Scalability",
      description:
        "Designed to scale smoothly from small growing teams to multi-branch enterprises without costly infrastructure overhauls.",
      icon: Layers,
    },
    {
      title: "Security",
      description:
        "A security-first architecture adhering to rigorous regulatory frameworks including DoT, ISO/IEC 27001, SOC 2, HIPAA, and GDPR.",
      icon: ShieldCheck,
    },
    {
      title: "Service",
      description:
        "Dedicated technical onboarding, responsive support, and real telecom engineers always available to assist your business.",
      icon: Headset,
    },
  ],
};

/* -------------------------------------------------------------------------
 * 2. Why SIPLINK Differentiators (Section 2 of why_siplink.md)
 * ---------------------------------------------------------------------- */

export type WhySipLinkFeature = {
  title: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  highlights: string[];
};

export const whySipLinkDifferentiators: WhySipLinkFeature[] = [
  {
    title: "One Platform. Multiple Ways to Connect.",
    summary:
      "Voice, SMS, cloud telephony, collaboration, CRM integrations, and contact center capabilities in one connected ecosystem.",
    description:
      "Eliminate fragmented vendors and isolated phone lines. SipLink unifies hosted PBX, SIP trunking, team messaging, business SMS, and contact center tools under a single, unified management dashboard.",
    icon: Layers,
    badge: "Unified Ecosystem",
    highlights: [
      "Hosted PBX and SIP Trunking on a single carrier IP network",
      "Unified team messaging, SMS, and peer-to-peer video calling",
      "Centralized web portal for extension and DID management",
    ],
  },
  {
    title: "Built to Scale With Your Growth",
    summary:
      "Flexible architectures that adapt as your headcount, locations, and call volumes expand.",
    description:
      "Whether you are supporting a 10-line regional office or a multi-location enterprise with distributed call centers, SipLink dynamically scales without demanding hardware upgrades or on-premise telecom racks.",
    icon: Rocket,
    badge: "Elastic Capacity",
    highlights: [
      "Instant provisioning of new lines and virtual extensions",
      "Multi-branch and remote workforce routing configuration",
      "Centralized administration with unified group billing",
    ],
  },
  {
    title: "Reliable Business Communication",
    summary:
      "Infrastructure and monitoring designed for consistent voice clarity and business continuity.",
    description:
      "Direct IP routes chosen for stability, rate, and voice quality. Our network features automated failover, redundant switches, and real-time QoS monitoring to guarantee clear, unbroken conversations.",
    icon: Network,
    badge: "Carrier Grade",
    highlights: [
      "Real-time IP voice quality monitoring and intelligent routing",
      "Direct fiber links and redundant provider connections",
      "Automated disaster recovery and call failover protocols",
    ],
  },
  {
    title: "Connect Your Existing Tools",
    summary:
      "Seamless integrations with CRM, productivity, and ATS platforms your teams already depend on.",
    description:
      "Communication becomes significantly more productive when linked with workflow software. SipLink seamlessly connects with Salesforce, Microsoft 365, Google Workspace, Ceipal, Zoho, and Zendesk.",
    icon: Puzzle,
    badge: "Deep Integration",
    highlights: [
      "Click-to-dial and automatic incoming caller screen pops",
      "Real-time call record logging into CRM activity timelines",
      "Full Microsoft Teams Calling direct routing integration",
    ],
  },
  {
    title: "Security at Every Layer",
    summary:
      "A security-first architecture protecting critical voice traffic, customer data, and system access.",
    description:
      "End-to-end operational governance conforming to international security and privacy benchmarks. Protected Health Information (PHI) safeguards, encrypted transport, and strict role-based access control.",
    icon: ShieldCheck,
    badge: "Compliance First",
    highlights: [
      "TLS/SRTP voice signaling and media stream encryption",
      "Granular role-based permissions and call recording controls",
      "Audited against ISO/IEC 27001, SOC 2, HIPAA, and GDPR standards",
    ],
  },
  {
    title: "Expert Support That Never Sleeps",
    summary:
      "Dedicated account managers and 24/7 technical engineers behind every deployment.",
    description:
      "Technology is only as good as the team backing it. Our in-house telecom specialists assist with planning, porting numbers, PBX configuration, and ongoing optimization with round-the-clock responsiveness.",
    icon: Headphones,
    badge: "24/7 Support",
    highlights: [
      "24/7 phone, email, and live ticket support from telecom engineers",
      "Dedicated project managers for design and cutover onboarding",
      "Zero-downtime number porting guidance and testing",
    ],
  },
  {
    title: "Global Reach. Local Support.",
    summary:
      "Combining worldwide cloud telephony capabilities with dedicated operating offices in India and the US.",
    description:
      "Serving domestic and international enterprises with certified telecom licenses in India (DoT) and a registered corporate entity in the US. Local presence in Chennai, Bangalore, and Hyderabad ensures responsive, hands-on service.",
    icon: Globe,
    badge: "Global & Local",
    highlights: [
      "DoT compliant telecom routing within India",
      "Operating tech centers in Chennai, Bangalore, and Hyderabad",
      "US corporate registration (SipLink Communications LLC)",
    ],
  },
];

/* -------------------------------------------------------------------------
 * 3. Verified Certifications & Compliance (Section 6 of why_siplink.md)
 * ---------------------------------------------------------------------- */

export type CertificationItem = {
  id: string;
  name: string;
  shortName: string;
  authority: string;
  jurisdiction: string;
  image: string;
  summary: string;
  description: string;
  keyControls: string[];
  icon: LucideIcon;
};

export const verifiedCertifications: CertificationItem[] = [
  {
    id: "dot",
    name: "Department of Telecommunications (DoT)",
    shortName: "DoT Certified",
    authority: "Government of India",
    jurisdiction: "India",
    image: "/images/certifications/dot.jpeg",
    summary:
      "Compliance with Indian Department of Telecommunications licensing, routing, and operational standards.",
    description:
      "SIPLINK is committed to maintaining compliance with the applicable Department of Telecommunications (DoT), Government of India, regulations and licensing requirements. Our telecom and communication services are designed and operated in accordance with relevant regulatory standards, covering areas such as service provisioning, numbering, voice routing, customer verification, record maintenance, and other applicable telecom obligations, ensuring secure, reliable, and compliant business communications for our customers.",
    keyControls: [
      "Authorized telecom service provisioning and numbering governance",
      "Strict voice routing compliance avoiding illegal bypass or toll bypass",
      "Comprehensive Call Detail Record (CDR) retention and verification",
      "Customer verification (KYC) aligned with telecom guidelines",
    ],
    icon: Building2,
  },
  {
    id: "iso27001",
    name: "ISO/IEC 27001:2022",
    shortName: "ISO/IEC 27001:2022",
    authority: "International Organization for Standardization",
    jurisdiction: "International",
    image: "/images/certifications/iso27001.jpeg",
    summary:
      "Information Security Management System (ISMS) framework for protecting critical corporate and communications data.",
    description:
      "SIPLINK follows a structured approach to information security and data protection, aligned with the principles of ISO/IEC 27001:2022, the internationally recognized standard for Information Security Management Systems (ISMS). Our security practices focus on protecting business information, managing information-security risks, controlling access, and maintaining the confidentiality, integrity, and availability of critical data across our communication infrastructure.",
    keyControls: [
      "Systematic information security risk assessment and mitigation",
      "Strict physical and network access control across cloud voice assets",
      "Continuous vulnerability assessment and patch management",
      "Formal incident management and operational disaster recovery plans",
    ],
    icon: ShieldCheck,
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    shortName: "SOC 2 Type 2",
    authority: "AICPA (American Institute of CPAs)",
    jurisdiction: "United States & Global",
    image: "/images/certifications/soc2.jpeg",
    summary:
      "Independent audit evaluating security, availability, and confidentiality controls over an extended observation period.",
    description:
      "SIPLINK prioritizes the security, availability, and confidentiality of business communication systems, helping organizations maintain trust in their communication infrastructure. SOC 2 Type II is an independent auditing framework developed by the American Institute of Certified Public Accountants (AICPA) to evaluate an organization's controls over a defined period. Our security-focused practices aim to support reliable service delivery, data protection, and operational transparency for businesses across global markets.",
    keyControls: [
      "Audited controls over system operational availability and uptime",
      "Rigorous logical access restrictions and multi-factor authentication",
      "Continuous data encryption across transport and storage environments",
      "Operational transparency and audit logging across administrative changes",
    ],
    icon: Lock,
  },
  {
    id: "hipaa",
    name: "HIPAA Compliance",
    shortName: "HIPAA Aligned",
    authority: "U.S. Department of Health and Human Services (HHS)",
    jurisdiction: "United States",
    image: "/images/certifications/hipaa.jpeg",
    summary:
      "Safeguards designed for healthcare providers, medical billing, and RCM companies handling Protected Health Information (PHI).",
    description:
      "SIPLINK is committed to supporting HIPAA-aligned communication, privacy, and data protection practices for healthcare organizations across the United States. Our communication solutions are designed to help healthcare providers, medical billing companies, RCM organizations, clinics, hospitals, and other healthcare businesses protect sensitive patient and business information while maintaining secure and reliable communication. Security-focused capabilities such as controlled access, user authentication, call recording management, secure communication, activity monitoring, data protection, and administrative controls help organizations establish appropriate safeguards for Protected Health Information (PHI).",
    keyControls: [
      "Configurable call recording retention with restricted replay permissions",
      "Administrative access controls and comprehensive audit trail logging",
      "Encrypted transmission of voice streams, voicemails, and virtual faxes",
      "Safe handling of patient coordination in medical billing and clinical workflows",
    ],
    icon: HeartPulse,
  },
  {
    id: "gdpr",
    name: "GDPR Compliance",
    shortName: "GDPR Aligned",
    authority: "European Union / EEA Data Protection Authorities",
    jurisdiction: "European Union & EEA",
    image: "/images/certifications/gdpr.jpeg",
    summary:
      "Data protection and privacy practices designed for businesses serving individuals across the EU and EEA.",
    description:
      "SIPLINK supports GDPR-aligned data protection and privacy practices for businesses operating in or serving customers across the European Union (EU) and European Economic Area (EEA). Our communication solutions are designed to help organizations protect personal data through secure data handling, access controls, privacy-focused processes, and appropriate security measures. SIPLINK's approach supports key GDPR principles such as data privacy, confidentiality, data minimization, controlled access, transparency, and responsible processing of personal information.",
    keyControls: [
      "Principles of data minimization and purpose limitation in communications",
      "Transparent call records, storage duration, and deletion options",
      "Robust measures to safeguard cross-border communication data",
      "Strict data processing protocols and role-based administrative visibility",
    ],
    icon: Globe,
  },
];

/* -------------------------------------------------------------------------
 * 4. Partners & Integrations (Section 3 of why_siplink.md)
 * ---------------------------------------------------------------------- */

export type PartnerCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  examples: string[];
};

export const partnerCategories: PartnerCategory[] = [
  {
    title: "CRM & Customer Data Platforms",
    description:
      "Connect telephony directly into sales and relationship workflows for automatic call logging, click-to-dial, and instant customer record lookup.",
    icon: Puzzle,
    examples: ["Salesforce", "Zoho CRM", "HubSpot", "Bitrix24"],
  },
  {
    title: "Productivity & Collaboration Suites",
    description:
      "Unify office suites and corporate calendars with business voice for seamless meetings, directory dialling, and document sharing.",
    icon: MessagesSquare,
    examples: ["Microsoft 365", "Microsoft Teams Calling", "Google Workspace"],
  },
  {
    title: "Recruiting & Staffing Platforms",
    description:
      "High-velocity outreach, recruiter tracking, and automated candidate conversation logging built directly into recruitment software.",
    icon: Users,
    examples: ["CEIPAL", "Staffing ATS integrations"],
  },
  {
    title: "Helpdesk & Customer Support Systems",
    description:
      "Route support calls smoothly into agent ticketing queues, display ticket context on inbound rings, and attach call recordings automatically.",
    icon: Headset,
    examples: ["Zendesk", "Customer Service Portals"],
  },
  {
    title: "Enterprise ERP & Business Systems",
    description:
      "Synchronize communication across billing, inventory, and enterprise resource planning systems for end-to-end visibility.",
    icon: Cpu,
    examples: ["Odoo", "Custom REST & Webhook APIs"],
  },
  {
    title: "Carrier & Network Infrastructure",
    description:
      "Direct carrier interconnections, Class-A ISP routing, and redundant Tier-1 IP peers delivering high-definition voice and guaranteed QoS.",
    icon: Network,
    examples: ["Carrier-Neutral POPs", "Tier-1 IP Interconnects"],
  },
];

export const partnerTracks = [
  {
    title: "Technology & Software Partners (ISVs)",
    description:
      "Embed SipLink's carrier-grade voice, business SMS, and SIP trunking into your SaaS product, CRM, or vertical application through our APIs and SDKs.",
    benefits: [
      "Developer-friendly REST APIs, WebRTC SDKs, and webhooks",
      "Technical sandbox environments and co-engineering guidance",
      "Joint solution showcase and marketplace listing opportunities",
    ],
    icon: Cpu,
  },
  {
    title: "Solution Providers, MSPs & Resellers",
    description:
      "Expand your technology portfolio with enterprise-ready cloud PBX, SIP trunking, and call center solutions backed by 24/7 specialist support.",
    benefits: [
      "Competitive wholesale margins and recurring revenue structures",
      "Full onboarding assistance and dedicated partner account manager",
      "White-glove number porting and technical cutover support for your clients",
    ],
    icon: HeartHandshake,
  },
  {
    title: "Consultants & Telecom Advisors",
    description:
      "Deliver trusted, compliant communication solutions to your corporate clients moving away from legacy copper or proprietary on-premise hardware.",
    benefits: [
      "Tailored solution engineering for complex multi-site deployments",
      "Transparent pricing models with zero hidden telecom surcharges",
      "Reliable SLA assurances and regulatory compliance verification",
    ],
    icon: Briefcase,
  },
];

/* -------------------------------------------------------------------------
 * 5. Careers & Life at SipLink (Section 4 of why_siplink.md)
 * ---------------------------------------------------------------------- */

export const careerPillars = [
  {
    title: "Make an Impact",
    description:
      "Work on technology that directly powers daily conversations for businesses, healthcare clinics, recruiting firms, and global teams.",
    icon: Rocket,
  },
  {
    title: "Keep Learning",
    description:
      "Explore real-world challenges across cloud communications, VoIP protocols, conversational AI, carrier networking, and enterprise APIs.",
    icon: GraduationCap,
  },
  {
    title: "Work With Great People",
    description:
      "Collaborate in a culture built on mutual respect, direct communication, teamwork, and cross-functional support.",
    icon: Users,
  },
  {
    title: "Grow With Us",
    description:
      "As SipLink expands its footprint across India and international markets, take ownership, master new disciplines, and accelerate your career.",
    icon: TrendingUp,
  },
];

export const careerDepartments = [
  {
    name: "Engineering & Cloud Infrastructure",
    description:
      "Architect and scale our cloud voice platform, SIP proxy clusters, WebRTC clients, and real-time communication APIs.",
    disciplines: [
      "SIP / VoIP Protocol Engineering",
      "Cloud PBX & WebRTC Development",
      "Backend API & Integrations Engineering",
      "DevOps & Telephony Reliability",
    ],
    icon: Cpu,
  },
  {
    name: "Voice Network & NOC Operations",
    description:
      "Monitor carrier routes, optimize traffic distribution, ensure QoS benchmarks, and maintain continuous telecom reliability.",
    disciplines: [
      "24/7 Global NOC Operations",
      "Telecom Interconnect & Route Engineering",
      "Network Security & Firewall Administration",
      "Quality of Service (QoS) Diagnostics",
    ],
    icon: Network,
  },
  {
    name: "Customer Success & Solution Engineering",
    description:
      "Guide enterprise clients through solution architecture, number porting, PBX workflow design, and day-to-day resolution.",
    disciplines: [
      "Implementation & Onboarding Engineering",
      "Technical Support & Incident Resolution",
      "PBX & Call Center Configuration",
      "Telecom Carrier Porting Coordination",
    ],
    icon: Headset,
  },
  {
    name: "Sales & Enterprise Partnerships",
    description:
      "Connect with forward-thinking businesses, demonstrate SipLink's platform value, and build enduring technology alliances.",
    disciplines: [
      "Enterprise Account Executive",
      "Channel & Partner Alliances",
      "Business Development",
      "Solutions Consultation",
    ],
    icon: Briefcase,
  },
];

/* -------------------------------------------------------------------------
 * 6. News & Communication Insights (Section 5 of why_siplink.md)
 * ---------------------------------------------------------------------- */

export type InsightArticle = {
  slug: string;
  category: "Cloud Communications" | "Business Voice & SIP" | "AI & Innovation" | "Contact Centers" | "Compliance & Security";
  title: string;
  summary: string;
  readTime: string;
  icon: LucideIcon;
  keyPoints: string[];
};

export const verifiedInsights: InsightArticle[] = [
  {
    slug: "how-modern-voip-works",
    category: "Business Voice & SIP",
    title: "How Voice Over IP (VoIP) and SIP Trunking Work for Modern Businesses",
    summary:
      "A clear examination of Session Initiation Protocol (SIP), packetized voice data, codec selection, and why modern IP routing outperforms legacy circuits.",
    readTime: "5 min read",
    icon: PhoneCall,
    keyPoints: [
      "How SIP establishes, manages, and terminates voice sessions over IP networks",
      "The role of jitter buffers, low-latency routing, and QoS in voice clarity",
      "Eliminating traditional physical copper lines while keeping on-premise PBX equipment",
    ],
  },
  {
    slug: "cloud-telephony-vs-on-premise",
    category: "Cloud Communications",
    title: "Why Growing Organizations Are Migrating from Legacy PRI to Cloud PBX",
    summary:
      "Analyzing the operational, resilience, and financial advantages of eliminating on-premise telecom closet hardware in favor of hosted cloud telephony.",
    readTime: "6 min read",
    icon: Cloud,
    keyPoints: [
      "Zero on-site hardware maintenance and instant automatic software updates",
      "Enabling true extension mobility across desktops, mobile apps, and remote offices",
      "Substantial cost savings with bundled US/Canada calling and scalable per-user pricing",
    ],
  },
  {
    slug: "hipaa-compliant-healthcare-communication",
    category: "Compliance & Security",
    title: "Safeguarding Patient Data: Best Practices for HIPAA-Aligned Communications",
    summary:
      "Understanding the essential administrative, physical, and technical safeguards necessary when transmitting and recording voice data in healthcare and medical billing.",
    readTime: "7 min read",
    icon: HeartPulse,
    keyPoints: [
      "Configuring restricted access and role-based permissions for call recordings",
      "Ensuring encryption in transit via TLS and SRTP protocols",
      "Establishing business operational policies alongside secure communication platforms",
    ],
  },
  {
    slug: "ai-voice-assistants-in-contact-centers",
    category: "AI & Innovation",
    title: "The Role of AI Voice Assistants and Automation in Customer Contact Centers",
    summary:
      "How intelligent IVR, automated conversational assistants, and real-time speech analytics help support teams respond faster without sacrificing human touch.",
    readTime: "5 min read",
    icon: Bot,
    keyPoints: [
      "Deflecting routine repetitive inquiries with natural language voice bots",
      "Intelligent queue prioritization and skills-based caller routing",
      "Automatic transcription and CRM activity logging for support representatives",
    ],
  },
  {
    slug: "crm-telephony-integration-impact",
    category: "Cloud Communications",
    title: "Connecting Cloud Voice with Business CRMs: Salesforce, Zoho, and CEIPAL",
    summary:
      "Why integrating your business phone system with your customer relationship tools unlocks agent productivity and accurate conversation analytics.",
    readTime: "6 min read",
    icon: Puzzle,
    keyPoints: [
      "Click-to-call directly within contact and candidate profile pages",
      "Instant caller identification and historical account timeline screen-pops",
      "Automatic synchronisation of call recordings, timestamps, and duration metrics",
    ],
  },
  {
    slug: "dot-compliance-telecom-india",
    category: "Compliance & Security",
    title: "Telecom Compliance in India: Navigating DoT Licensing and Routing Rules",
    summary:
      "A practical overview of Department of Telecommunications (DoT) requirements, compliant PSTN interconnection, and the importance of certified telecom providers.",
    readTime: "6 min read",
    icon: Building2,
    keyPoints: [
      "Understanding DoT regulations regarding enterprise voice routing and toll bypass prevention",
      "The role of Class-A ISP infrastructure and local carrier-neutral POPs",
      "Ensuring audit-ready Call Detail Records (CDR) and customer identification protocols",
    ],
  },
];
