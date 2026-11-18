import type { PolicyBlock } from "@/lib/privacy-policy";

/** The Terms and Conditions as supplied by the client, sections 1–29. Section 30 (contact) is rendered by the page. */
export const termsSections: { title: string; blocks: PolicyBlock[] }[] = [
  {
    title: "1. Introduction and Acceptance",
    blocks: [
      "Welcome to Siplink Communications Private Limited (“Siplink”, “Company”, “we”, “our” or “us”).",
      "These Terms and Conditions (“Terms”) govern access to and use of our website, mobile applications, software, communication platforms, cloud telephony products and related services.",
      "Our services include, without limitation:",
      {
        ul: [
          "SIPLINK-UC mobile applications for Android and iOS;",
          "Voice over Internet Protocol (VoIP) calling;",
          "Hosted PBX and cloud-based telephone systems;",
          "SIP trunking and enterprise telephony;",
          "Business communication and messaging services;",
          "Video conferencing and collaboration features;",
          "Call recording, voicemail and call management;",
          "AI voice, automated calling and AI-enabled communication services; and",
          "Related software, integrations, APIs, technical support and professional services.",
        ],
      },
      "By accessing our website, registering for an account, downloading or using our applications, purchasing a service or otherwise using Siplink services, you agree to these Terms and our Privacy Policy.",
      "If you do not agree to these Terms, you must not access or use the relevant services.",
      "If you are using Siplink services on behalf of a company, organisation or other legal entity, you represent that you are authorised to accept these Terms on its behalf.",
    ],
  },
  {
    title: "2. Definitions",
    blocks: [
      "For the purposes of these Terms:",
      {
        terms: [
          ["“Application”", "means SIPLINK-UC and any other mobile, desktop or web application provided by Siplink."],
          ["“Customer”", "means a company, organisation, business or individual that purchases, subscribes to or enters into an agreement for Siplink services."],
          ["“Customer Administrator”", "means a person authorised by a Customer to manage accounts, extensions, users, configurations and services."],
          ["“End User”", "means an employee, representative, individual or other authorised person who accesses Siplink services through a Customer account or individual account."],
          ["“Services”", "means all products, applications, software, communication services, hosting, support and related offerings provided by Siplink."],
          ["“Customer Data”", "means information, content, communication records, contact information, files, recordings, messages and other data submitted to or processed through Siplink services by or on behalf of a Customer or End User."],
          ["“Subscription”", "means a paid or otherwise agreed arrangement under which a Customer receives access to specific Siplink services."],
          ["“Third-Party Services”", "means services, networks, platforms, APIs, software, carriers, hosting providers or technology supplied by parties other than Siplink."],
        ],
      },
    ],
  },
  {
    title: "3. Eligibility and Account Registration",
    blocks: [
      "3.1 You must provide accurate, complete and current information when creating an account or subscribing to our services.",
      "3.2 You must be legally capable of entering into a binding agreement under applicable law.",
      "3.3 Customers must ensure that their authorised administrators and End Users are permitted to access the services.",
      "3.4 You are responsible for maintaining the confidentiality of your login credentials, passwords, authentication codes and account access details.",
      "3.5 You must notify Siplink promptly if you suspect unauthorised access, credential compromise or misuse of your account.",
      "3.6 Siplink may suspend or restrict accounts where information is inaccurate, fraudulent, incomplete or reasonably suspected to involve unauthorised activity.",
      "3.7 Where an account is created by a business administrator, the Customer is responsible for ensuring that the End User is authorised to use the account.",
    ],
  },
  {
    title: "4. Description of Services",
    blocks: [
      "Siplink provides business communication and telecom-related software and services, which may include:",
      { h3: "4.1 SIPLINK-UC Applications" },
      "SIPLINK-UC enables authorised users to access supported business communication functionality, including:",
      {
        ul: [
          "Making and receiving VoIP calls;",
          "Accessing business extensions and PBX services;",
          "Contact matching and caller identification;",
          "Call history and call management;",
          "Instant messaging and group communication;",
          "Sharing supported files and media;",
          "Video conferencing and collaboration;",
          "Push notifications and incoming-call alerts; and",
          "Other features made available in the relevant application version.",
        ],
      },
      "Application features may depend on the Customer's PBX configuration, subscription, device, network and supported software version.",
      { h3: "4.2 Hosted PBX and Cloud Telephony" },
      "Siplink may provide hosted PBX, virtual extensions, call routing, IVR, call queues, voicemail, call recording, reporting, number management and related communication features.",
      { h3: "4.3 SIP Trunking" },
      "Siplink may provide SIP connectivity and related services to enable Customers to connect their communication infrastructure to supported telecom networks.",
      { h3: "4.4 AI Voice Services" },
      "Siplink may provide AI-enabled voice agents, automated calling, speech recognition, transcription, voice interaction, automated responses and related services.",
      "The availability and functionality of each service depend on the applicable service plan, technical configuration and commercial agreement.",
    ],
  },
  {
    title: "5. Customer Responsibilities",
    blocks: [
      "Customers and End Users agree to:",
      {
        ol: [
          "Use Siplink services only for lawful and authorised purposes;",
          "Provide accurate account and registration information;",
          "Protect account credentials and access permissions;",
          "Maintain appropriate internet connectivity, devices and compatible systems;",
          "Ensure that their employees and End Users comply with these Terms;",
          "Obtain all necessary permissions and authorisations for contact uploads, communications, call recording and other processing;",
          "Comply with applicable telecom, privacy, cybersecurity, consumer-protection and other laws;",
          "Maintain appropriate security over their devices, networks and administrator accounts;",
          "Avoid sharing confidential credentials or access information; and",
          "Notify Siplink of suspected security incidents affecting the services.",
        ],
      },
      "Customers are responsible for their own devices, internal networks, local PBX equipment, third-party applications and configurations unless expressly included in a Siplink service agreement.",
    ],
  },
  {
    title: "6. Acceptable Use Policy",
    blocks: [
      "You must not use Siplink services to:",
      {
        ul: [
          "Conduct fraudulent, deceptive or unlawful activities;",
          "Make unlawful, unsolicited or unauthorised communications;",
          "Engage in spam, phishing, impersonation or caller-ID spoofing;",
          "Harass, threaten, intimidate or abuse another person;",
          "Transmit malicious software, viruses or harmful code;",
          "Interfere with or disrupt Siplink infrastructure or third-party networks;",
          "Attempt unauthorised access to systems, accounts or communication services;",
          "Circumvent security, usage restrictions or service limitations;",
          "Conduct unlawful surveillance or interception of communications;",
          "Distribute content that violates applicable laws or third-party rights;",
          "Use automated calling or messaging in violation of applicable consent or regulatory requirements;",
          "Reverse engineer, decompile or attempt to extract source code except where permitted by law; or",
          "Resell, sublicense or commercially exploit services without Siplink's written authorisation.",
        ],
      },
      "Siplink may investigate suspected violations and may restrict, suspend or terminate access where reasonably necessary to protect users, networks, systems or legal compliance.",
    ],
  },
  {
    title: "7. Telecom and Regulatory Compliance",
    blocks: [
      "7.1 Customers must use Siplink services in accordance with applicable Indian telecommunications laws, regulations, licence conditions, directions and other applicable requirements.",
      "7.2 Customers must not use Siplink services to bypass telecom regulations, applicable licensing requirements, lawful restrictions or network controls.",
      "7.3 Customers are responsible for ensuring that their use of telephone numbers, calling routes, messaging facilities, automated calling and other communication functionality is authorised.",
      "7.4 Where applicable, Customers must comply with requirements relating to caller identification, consent, commercial communications, telemarketing, Do Not Disturb preferences, customer verification and other relevant telecom obligations.",
      "7.5 Siplink may implement restrictions, monitoring, verification or technical controls where required by law, regulatory direction, network requirements or security considerations.",
      "7.6 Siplink may disclose relevant information to competent government, law-enforcement or regulatory authorities where legally required or otherwise lawfully authorised.",
      "7.7 Nothing in these Terms authorises a Customer to use Siplink services in a manner inconsistent with Siplink's applicable telecom authorisations or licence conditions.",
    ],
  },
  {
    title: "8. Subscriptions, Pricing and Payments",
    blocks: [
      "8.1 Siplink services may be offered under subscription plans, usage-based charges, one-time fees, implementation charges or customised commercial arrangements.",
      "8.2 Applicable pricing, billing frequency, service limits, taxes and payment terms will be communicated through the relevant quotation, proposal, order form, invoice or service agreement.",
      "8.3 Unless otherwise agreed in writing, invoices must be paid within the payment period specified in the applicable invoice or commercial agreement.",
      "8.4 Prices may be subject to applicable GST and other statutory taxes, duties or levies.",
      "8.5 Customers are responsible for applicable usage charges, including call charges, number rental, messaging charges, additional extensions, usage beyond plan limits and third-party charges, as specified in their commercial agreement.",
      "8.6 Siplink may revise prices or introduce new charges by providing reasonable advance notice. Any changes to an existing Subscription will be subject to the applicable commercial agreement and mandatory law.",
      "8.7 Delayed payments may result in applicable late-payment charges, suspension or restriction of services, subject to the relevant agreement and applicable law.",
      "8.8 Customers must raise billing disputes within a reasonable period after receiving the relevant invoice, providing sufficient details for investigation.",
      "8.9 Payments are non-refundable except where expressly agreed, required by law or provided under an applicable refund policy or service agreement.",
    ],
  },
  {
    title: "9. Subscription Renewal, Upgrade and Downgrade",
    blocks: [
      "9.1 Subscriptions may be provided on monthly, annual or other agreed billing cycles.",
      "9.2 Automatic renewal will apply only where expressly disclosed and agreed through the applicable subscription arrangement.",
      "9.3 Customers may request plan upgrades, downgrades or changes subject to availability, pricing and applicable commercial terms.",
      "9.4 Changes in subscription plans may affect features, extension limits, usage allowances, storage, call capacity and other service parameters.",
      "9.5 Any unused balance, prepaid amount or remaining subscription period will be handled according to the applicable commercial agreement or refund policy.",
    ],
  },
  {
    title: "10. Service Availability and Maintenance",
    blocks: [
      "10.1 Siplink endeavours to provide reliable and continuous services but does not guarantee uninterrupted or error-free availability unless expressly agreed in a separate Service Level Agreement (“SLA”).",
      "10.2 Services may be temporarily unavailable because of:",
      {
        ul: [
          "Scheduled maintenance;",
          "Emergency maintenance;",
          "Internet or network interruptions;",
          "Telecom carrier or upstream provider failures;",
          "Power outages or infrastructure failures;",
          "Cybersecurity incidents;",
          "Software updates or technical issues;",
          "Force majeure events; or",
          "Other circumstances beyond Siplink's reasonable control.",
        ],
      },
      "10.3 Siplink may carry out maintenance, upgrades, patches and configuration changes to maintain or improve service quality and security.",
      "10.4 Where reasonably practicable, Siplink will provide advance notice of planned maintenance that materially affects services.",
      "10.5 Any service uptime commitments, service credits or availability guarantees will be governed by a separate SLA or written commercial agreement.",
    ],
  },
  {
    title: "11. Third-Party Networks and Integrations",
    blocks: [
      "11.1 Siplink services may rely on third-party telecom networks, internet service providers, cloud platforms, operating systems, application stores, push-notification services, AI providers and other external infrastructure.",
      "11.2 Siplink is not responsible for interruptions or failures caused by third-party services outside its reasonable control, except to the extent otherwise required by law or an applicable agreement.",
      "11.3 Customers are responsible for reviewing the terms and policies applicable to third-party applications and services they choose to integrate.",
      "11.4 Third-party services may be subject to separate fees, restrictions, technical limitations and privacy terms.",
    ],
  },
  {
    title: "12. Mobile Applications and Device Permissions",
    blocks: [
      "12.1 SIPLINK-UC may request permissions necessary to provide its communication functionality.",
      "These may include:",
      {
        ul: [
          "Microphone access for VoIP calls;",
          "Contacts access for contact matching and caller identification;",
          "Notifications for incoming calls, messages and account updates;",
          "Bluetooth access for compatible headsets and audio routing; and",
          "Background audio functionality to maintain ongoing calls.",
        ],
      },
      "12.2 Users may manage or withdraw permissions through their device settings.",
      "12.3 Refusing or withdrawing a permission may limit the availability of the feature that depends on it.",
      "12.4 Users are responsible for maintaining compatible devices, supported operating systems, sufficient storage and appropriate network connectivity.",
      "12.5 Siplink may release updates, patches, security improvements and new versions of its applications. Certain features may require installation of the latest supported version.",
      "12.6 Users must download Siplink applications only from official or otherwise authorised distribution channels.",
    ],
  },
  {
    title: "13. Call Recording and Communication Content",
    blocks: [
      "13.1 Siplink services may support call recording, voicemail, transcription, call monitoring and storage of communication content.",
      "13.2 Customers are responsible for determining whether recording or monitoring is lawful and for providing all required notices and obtaining any required consent or authorisation.",
      "13.3 Customers must comply with applicable telecom, privacy, employment, consumer-protection and sector-specific requirements when recording or monitoring communications.",
      "13.4 Customers are responsible for configuring access permissions and retention settings for their recordings and communication content.",
      "13.5 Siplink may process communication content to provide the contracted services, troubleshoot issues, maintain security, comply with legal obligations and follow authorised Customer instructions.",
      "13.6 Customers must not use call recording or monitoring features for unlawful surveillance, harassment or other prohibited purposes.",
    ],
  },
  {
    title: "14. AI Voice and Automated Communication Features",
    blocks: [
      "14.1 Siplink may provide AI-powered voice agents, automated calling, speech recognition, transcription, automated responses and related services.",
      "14.2 AI features may process voice inputs, recordings, transcripts, prompts, communication context and generated outputs.",
      "14.3 Customers are responsible for configuring AI features appropriately and ensuring that their use complies with applicable law.",
      "14.4 Customers must provide any required notice to callers or other affected individuals and obtain any required consent or other lawful authorisation before using AI-enabled communication features.",
      "14.5 AI-generated responses may be inaccurate, incomplete or unsuitable for certain situations. Customers must review and validate AI outputs before relying on them for important business, legal, financial, medical or other consequential decisions.",
      "14.6 AI features may depend on third-party AI and technology providers and may be subject to their technical limitations and service availability.",
      "14.7 Unless separately agreed or otherwise lawfully authorised and disclosed, Customer Data is not intended to be used to train general-purpose AI models.",
      "14.8 Siplink does not guarantee that AI-generated outputs will always be accurate, uninterrupted, suitable or error-free.",
    ],
  },
  {
    title: "15. Data Protection and Privacy",
    blocks: [
      "15.1 Siplink processes personal information in accordance with its Privacy Policy, available on the Siplink website.",
      "15.2 Customers and End Users must review the Privacy Policy before using the relevant services.",
      "15.3 Customers are responsible for ensuring that they have a lawful basis and appropriate authorisation to submit, upload, transmit or otherwise process personal information through Siplink services.",
      "15.4 Where Siplink processes personal information on behalf of a Customer, the parties' respective responsibilities will be governed by the applicable service agreement, data-processing agreement or other contractual arrangement.",
      "15.5 Customers must not upload or transmit personal information that they are not legally authorised to process.",
      "15.6 Siplink will implement reasonable technical and organisational safeguards designed to protect information processed through its services.",
      "15.7 Data retention and deletion will be subject to Siplink's Privacy Policy, applicable legal requirements and telecom retention obligations.",
      "15.8 Where a Customer requires a separate Data Processing Agreement, Business Associate Agreement or other privacy-related contractual document, the parties may enter into such agreement separately.",
    ],
  },
  {
    title: "16. Information Security and Account Protection",
    blocks: [
      "16.1 Siplink maintains security measures designed to protect its systems, applications and services.",
      "16.2 Customers are responsible for protecting their account credentials, administrator access and devices.",
      "16.3 Customers must notify Siplink promptly of suspected account compromise, unauthorised access or security incidents affecting their use of the services.",
      "16.4 Siplink may temporarily restrict access or implement security measures where it reasonably believes that an account, system or service is compromised or at risk.",
      "16.5 No internet-based service can guarantee absolute security, and Customers acknowledge the inherent risks associated with electronic communications and internet connectivity.",
    ],
  },
  {
    title: "17. Intellectual Property Rights",
    blocks: [
      "17.1 All intellectual property rights in Siplink's website, applications, software, source code, platform architecture, branding, logos, designs, documentation and related materials belong to Siplink or its licensors.",
      "17.2 Subject to these Terms and the applicable Subscription, Siplink grants the Customer a limited, non-exclusive, non-transferable and revocable right to access and use the Services for the Customer's authorised business purposes.",
      "17.3 No ownership rights in Siplink software, technology or intellectual property are transferred to Customers or End Users.",
      "17.4 Customers must not copy, modify, distribute, reverse engineer, decompile, create derivative works from or commercially exploit Siplink intellectual property except as expressly permitted by Siplink or applicable law.",
      "17.5 Customers retain ownership of their Customer Data, subject to the rights necessary for Siplink to provide the Services.",
      "17.6 Customers grant Siplink a limited right to host, transmit, process and otherwise use Customer Data only as necessary to provide, secure, support and improve the Services, comply with legal obligations and perform the applicable agreement.",
    ],
  },
  {
    title: "18. Confidentiality",
    blocks: [
      "18.1 Each party may receive confidential business, technical, financial or operational information from the other party.",
      "18.2 The receiving party must use reasonable care to protect confidential information and must not disclose it to unauthorised persons except where necessary to perform its obligations or as required by law.",
      "18.3 Confidentiality obligations do not apply to information that is publicly available without breach, independently developed, lawfully obtained from another source or required to be disclosed by a competent authority.",
      "18.4 Where appropriate, the parties may enter into a separate Non-Disclosure Agreement.",
    ],
  },
  {
    title: "19. Suspension and Restriction of Services",
    blocks: [
      "Siplink may suspend, restrict or limit access to all or part of the Services where reasonably necessary:",
      {
        ul: [
          "The Customer fails to pay amounts due;",
          "The Customer violates these Terms or an applicable agreement;",
          "The Services are used for fraud, spam, unlawful communications or prohibited activities;",
          "There is suspected unauthorised access or security compromise;",
          "Continued service may violate applicable law, telecom regulations or licence conditions;",
          "A competent authority or network provider requires restriction;",
          "The Customer's use threatens the stability, integrity or security of Siplink systems or third-party networks; or",
          "The relevant service has been discontinued or is no longer technically available.",
        ],
      },
      "Where reasonably practicable, Siplink will provide notice and an opportunity to resolve the issue before suspension, except where immediate action is necessary for legal, regulatory, security or operational reasons.",
    ],
  },
  {
    title: "20. Termination",
    blocks: [
      "20.1 Customers may terminate a Subscription in accordance with the applicable commercial agreement, order form or cancellation policy.",
      "20.2 Siplink may terminate an agreement or Subscription for material breach, persistent non-payment, unlawful use, regulatory requirements or other grounds provided in the applicable agreement.",
      "20.3 Either party may terminate a separate commercial agreement in accordance with its termination provisions.",
      "20.4 Upon termination, the Customer's right to access the relevant Services will end, subject to any agreed transition or migration period.",
      "20.5 Customers should export or retrieve any Customer Data they are entitled to retain before the end of the applicable service period.",
      "20.6 Siplink may delete or de-identify Customer Data after termination in accordance with the Privacy Policy, applicable retention schedules and legal obligations.",
      "20.7 Termination of an individual End User's application account does not automatically terminate the organisation's master business account or Subscription.",
      "20.8 Provisions relating to payment obligations, intellectual property, confidentiality, data protection, liability, indemnity and dispute resolution will survive termination to the extent applicable.",
    ],
  },
  {
    title: "21. Warranties and Disclaimers",
    blocks: [
      "21.1 Siplink will provide the Services with reasonable care and skill, subject to the applicable agreement and service description.",
      "21.2 Except as expressly stated in a written agreement or required by law, the Services are provided on an “as available” basis.",
      "21.3 Siplink does not guarantee uninterrupted service, uninterrupted internet connectivity, error-free software, uninterrupted third-party carrier availability or compatibility with every device or network.",
      "21.4 Siplink does not control public internet infrastructure, mobile network operators, external telecom carriers, third-party application stores or independent service providers.",
      "21.5 Siplink does not warrant that every communication will be successfully delivered or that call quality will be unaffected by external network conditions.",
      "21.6 Nothing in these Terms excludes any warranty or right that cannot legally be excluded under applicable law.",
    ],
  },
  {
    title: "22. Limitation of Liability",
    blocks: [
      "22.1 To the maximum extent permitted by applicable law, Siplink will not be liable for indirect, incidental, special, exemplary or consequential losses, including loss of profits, loss of business opportunities, loss of anticipated savings or loss of goodwill.",
      "22.2 Siplink will not be responsible for losses resulting from:",
      {
        ul: [
          "Customer misuse or unauthorised use of the Services;",
          "Customer devices, internal networks or internet connectivity;",
          "Third-party carrier or infrastructure failures outside Siplink's reasonable control;",
          "Incorrect information or configurations provided by Customers;",
          "Customer failure to maintain account security;",
          "Customer failure to obtain required consents or authorisations;",
          "Customer use of AI-generated outputs without appropriate review; or",
          "Events beyond Siplink's reasonable control.",
        ],
      },
      "22.3 Subject to applicable law and any separate commercial agreement, Siplink's aggregate liability arising from a claim relating to a paid service will not exceed the fees paid or payable by the affected Customer to Siplink for the relevant Services during the twelve (12) months immediately preceding the event giving rise to the claim.",
      "22.4 This limitation does not apply to liability that cannot be limited or excluded under applicable law, including any liability for which limitation is prohibited by law.",
      "22.5 Where a separate signed agreement or SLA provides different liability terms, that agreement will prevail to the extent of any inconsistency.",
    ],
  },
  {
    title: "23. Indemnification",
    blocks: [
      "To the extent permitted by law, Customers agree to indemnify and hold harmless Siplink, its directors, officers, employees and representatives against third-party claims, losses, liabilities and reasonable expenses arising from:",
      {
        ul: [
          "The Customer's unlawful use of the Services;",
          "Violation of these Terms or applicable law;",
          "Unauthorised or unlawful communications;",
          "Failure to obtain required consent or notice for call recording, contact processing or AI services;",
          "Infringement of third-party intellectual property or privacy rights by Customer Data;",
          "Customer-provided content, configurations or instructions; or",
          "Misuse of the Services by the Customer's End Users.",
        ],
      },
      "This indemnity will not apply to the extent a claim is caused by Siplink's own breach, negligence or wilful misconduct, where such exclusion is prohibited by applicable law.",
    ],
  },
  {
    title: "24. Force Majeure",
    blocks: [
      "Siplink will not be liable for delay or failure to perform obligations caused by events beyond its reasonable control, including natural disasters, floods, fire, war, terrorism, civil unrest, government actions, regulatory restrictions, internet outages, telecom network failures, power failures, cyberattacks, epidemics, strikes or failures of third-party infrastructure.",
      "The affected party will use reasonable efforts to minimise the impact and resume performance when reasonably practicable.",
    ],
  },
  {
    title: "25. Changes to Services and Terms",
    blocks: [
      "25.1 Siplink may modify, update, enhance or discontinue features of its Services where reasonably necessary for technical, commercial, security, operational or regulatory reasons.",
      "25.2 Siplink may revise these Terms from time to time.",
      "25.3 Updated Terms will be published on the Siplink website with a revised “Last Updated” date.",
      "25.4 Where required by law or an applicable agreement, Siplink will provide additional notice or obtain the required consent before a material change takes effect.",
      "25.5 Continued use of the Services after the effective date of updated Terms will constitute acceptance where such acceptance is legally valid.",
    ],
  },
  {
    title: "26. Notices and Communications",
    blocks: [
      "26.1 Siplink may communicate with Customers through registered email addresses, account dashboards, application notifications, invoices, website notices or other agreed communication channels.",
      "26.2 Customers are responsible for keeping their contact and billing details accurate and updated.",
      "26.3 Formal legal notices must be sent using the contact details provided in the applicable commercial agreement or the Contact section below.",
    ],
  },
  {
    title: "27. Governing Law and Jurisdiction",
    blocks: [
      "These Terms are governed by the laws of India.",
      "Subject to applicable law and any mandatory dispute-resolution provisions, the courts of competent jurisdiction in Chennai, Tamil Nadu, India shall have jurisdiction over disputes arising from or relating to these Terms.",
      "Where the parties have entered into a separate written agreement containing an arbitration or alternative dispute-resolution clause, the dispute-resolution provisions of that agreement will apply to the extent of any inconsistency.",
    ],
  },
  {
    title: "28. Severability and Waiver",
    blocks: [
      "If any provision of these Terms is found to be invalid, unlawful or unenforceable, the remaining provisions will continue in full force and effect.",
      "Failure or delay by Siplink to enforce any provision will not constitute a waiver of its rights.",
    ],
  },
  {
    title: "29. Entire Agreement and Order of Precedence",
    blocks: [
      "These Terms, together with the Privacy Policy and any applicable order form, quotation, SLA, Data Processing Agreement, Business Associate Agreement or other signed commercial agreement, form the contractual framework governing the relevant Services.",
      "Where there is a conflict:",
      {
        ol: [
          "A separately signed commercial agreement or order form will prevail for the specific commercial terms it expressly addresses;",
          "A signed SLA will prevail for the specific service-level commitments it addresses;",
          "A signed Data Processing Agreement or Business Associate Agreement will prevail for the specific data-protection or healthcare obligations it addresses; and",
          "These Terms will govern other matters unless otherwise agreed in writing.",
        ],
      },
    ],
  },
];
