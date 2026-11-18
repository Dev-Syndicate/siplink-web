/** The privacy policy as supplied by the client. Section 20 (contact) is rendered by the page. */

export const privacyLegalName = "Siplink Communications Private Limited";

export type PolicyBlock =
  | string
  | { h3: string }
  | { ul: string[] }
  | { ol: string[] }
  | { terms: [string, string][] };

export const privacySections: { title: string; blocks: PolicyBlock[] }[] = [
  {
    title: "1. Introduction",
    blocks: [
      "Siplink Communications Private Limited (“Siplink”, “we”, “us” or “our”) is committed to protecting the privacy and security of personal information.",
      "This Privacy Policy explains how we collect, use, store, disclose and protect information when you access or use:",
      {
        ul: [
          "Our website and online services;",
          "SIPLINK-UC mobile applications available through Google Play and the Apple App Store;",
          "Our VoIP calling and business communication applications;",
          "SIPLINK PBX, hosted PBX, SIP trunking and cloud telephony services;",
          "Voice calls, video calls, instant messaging, group chats, voicemail and related communication features;",
          "AI voice and other AI-enabled communication services, where enabled; and",
          "Our customer support, sales, account administration and related services.",
        ],
      },
      "This Policy applies to users, customers, business administrators, employees, callers, contacts and website visitors whose information we process in connection with these services.",
      "Where Siplink provides services to a business customer, that customer may determine how information relating to its employees, users, callers and contacts is used. In such cases, the customer may act as the data fiduciary, controller or equivalent responsible party, while Siplink processes information on the customer's behalf under the applicable agreement and instructions.",
      "By using our services, you acknowledge that you have been provided access to this Privacy Policy. Where consent is required by applicable law, we will seek it separately.",
    ],
  },
  {
    title: "2. Information We Collect",
    blocks: [
      "The information we collect depends on the services and features you use, your account configuration, the permissions you grant and applicable legal requirements.",
      { h3: "2.1 Account and registration information" },
      "When you register, log in or use a Siplink account, we may collect:",
      {
        ul: [
          "Full name and username;",
          "Mobile number and email address;",
          "Company or organisation name;",
          "Account ID, extension number and user ID;",
          "Login credentials and authentication information;",
          "Profile details and account preferences;",
          "Business administrator and user-role information;",
          "Account activation and verification details; and",
          "Other information submitted during registration or account administration.",
        ],
      },
      "We use this information to create and manage accounts, authenticate users, provide services and maintain account security.",
      { h3: "2.2 Contacts and address-book information" },
      "SIPLINK-UC may request permission to access your device contacts to support contact matching, caller identification and communication features.",
      "Depending on the app version and your settings, contact information may include:",
      {
        ul: [
          "Contact names;",
          "Telephone numbers; and",
          "Other contact details made available by your device and used by the relevant feature.",
        ],
      },
      "Where contact synchronisation is enabled, contact names and telephone numbers may be transmitted to and stored on Siplink's servers to:",
      {
        ul: [
          "Identify contacts who are also Siplink users;",
          "Display matching contact names within the application;",
          "Display contact names for incoming calls; and",
          "Support contact matching and communication functionality.",
        ],
      },
      "We do not use access to your address book as permission for unrelated marketing or advertising.",
      "You can manage or revoke Contacts permission through your device settings. If contact synchronisation is disabled or permission is withdrawn, some contact-related features may not function.",
      "You should only upload or synchronise contact information that you are authorised to use and should provide any notices or obtain any permissions required by applicable law.",
      { h3: "2.3 Call and communication information" },
      "When you use Siplink's telephony and communication services, we may process:",
      {
        ul: [
          "Calling and called telephone numbers;",
          "SIP addresses, extension numbers and account identifiers;",
          "Call date, time, duration and status;",
          "Call routing, connection and termination information;",
          "Call history and missed-call information;",
          "Call-detail records and related telecom records;",
          "SIP signalling and session information;",
          "Network and connection diagnostics;",
          "Voicemail and voicemail metadata;",
          "Instant messages and group-chat content;",
          "Images, documents, videos and files shared through supported features; and",
          "Video-conferencing information and related technical data.",
        ],
      },
      "This information is used to establish, route, deliver, maintain, secure, troubleshoot and administer communications.",
      { h3: "2.4 Microphone and audio information" },
      "SIPLINK-UC requires microphone access to enable voice calls and other supported audio communication features.",
      "When you make or receive a call, audio is processed and transmitted through the relevant communication infrastructure to provide the calling service.",
      "Depending on the service configuration, audio may also be processed for voicemail, call recording, transcription, speech recognition, AI voice services or other features enabled by you or your business administrator.",
      "Microphone access is not intended to permit unrelated or continuous recording of ambient audio. Audio processing takes place for the relevant communication or feature and in accordance with applicable permissions, notices and legal requirements.",
      "You can manage microphone permission through your device settings. Without microphone permission, voice-calling functionality may not be available.",
      { h3: "2.5 Push notifications" },
      "SIPLINK-UC supports push notifications to alert users about incoming calls, messages and other communication events, including when the app is not open in the foreground.",
      "For this purpose, we may process:",
      {
        ul: [
          "Device push-notification tokens;",
          "Application identifiers;",
          "Notification delivery information; and",
          "Relevant call or message event information.",
        ],
      },
      "Push notifications may be delivered through Apple Push Notification service (APNs), Firebase Cloud Messaging (FCM) or other applicable platform services, depending on the device and app implementation.",
      "Notification content and visibility may depend on your device settings and application configuration.",
      { h3: "2.6 Bluetooth and background audio" },
      "Where supported, Bluetooth functionality may be used to connect compatible headsets and audio accessories or route call audio.",
      "Background audio functionality may allow an active call to continue when the application is in the background or the device screen is locked.",
      "These capabilities are used to provide communication functionality. They do not mean that Siplink continuously records audio or accesses unrelated device information.",
      { h3: "2.7 Device, network and technical information" },
      "We may automatically process technical information such as:",
      {
        ul: [
          "Device model and operating system;",
          "Application version and application identifiers;",
          "IP address and network connection details;",
          "Internet connectivity and call-quality information;",
          "Device and push-notification identifiers;",
          "Crash reports, diagnostic information and performance data;",
          "Login timestamps and session information; and",
          "Security, access and application event logs.",
        ],
      },
      "We use this information to maintain service availability, diagnose technical issues, improve call quality, protect accounts and prevent misuse.",
      { h3: "2.8 Website and customer support information" },
      "When you visit our website or contact our support team, we may collect:",
      {
        ul: [
          "Name, email address and telephone number;",
          "Company and business details;",
          "Enquiry and support-ticket information;",
          "Chat conversations and attachments;",
          "IP address, browser and device information;",
          "Website usage and cookie information; and",
          "Information you voluntarily provide to us.",
        ],
      },
      "Our website may use third-party customer-support services, including tawk.to, to provide online chat and support. Information submitted through those services may be processed by the relevant provider under applicable contractual and privacy arrangements.",
    ],
  },
  {
    title: "3. How We Use Information",
    blocks: [
      "We may use information for the following purposes:",
      {
        ol: [
          "Creating, verifying and administering user accounts;",
          "Providing SIPLINK-UC and other Siplink applications;",
          "Providing VoIP calls, video calls, instant messaging and group communication;",
          "Connecting, routing and maintaining telephone calls and communication sessions;",
          "Matching contacts and displaying caller information where enabled;",
          "Delivering push notifications and incoming-call alerts;",
          "Providing hosted PBX, SIP trunking and cloud telephony services;",
          "Providing voicemail, call recording, transcription and other configured features;",
          "Providing AI voice and AI-enabled communication services where enabled;",
          "Maintaining call-detail records and other required telecom records;",
          "Processing billing, account administration and customer support;",
          "Monitoring call quality, application performance and service availability;",
          "Detecting fraud, abuse, security incidents and unauthorised access;",
          "Maintaining and improving our products and services;",
          "Complying with applicable laws, regulatory obligations and DoT licence conditions; and",
          "Enforcing our agreements and acceptable-use requirements.",
        ],
      },
      "We do not use personal information for purposes unrelated to the services described in this Policy unless we have a lawful basis and provide any additional notice or obtain any consent required by law.",
    ],
  },
  {
    title: "4. AI Voice and Automated Communication Services",
    blocks: [
      "Certain Siplink services may provide AI voice, speech recognition, transcription, automated communication, conversation analysis or other AI-enabled features.",
      "Where these features are enabled, information processed may include:",
      {
        ul: [
          "Voice input and audio output;",
          "Call recordings, where enabled;",
          "Speech-to-text transcriptions;",
          "Text prompts and instructions;",
          "Conversation context and metadata; and",
          "AI-generated responses, summaries or other outputs.",
        ],
      },
      "AI processing may involve Siplink infrastructure and selected third-party AI, speech-processing, hosting or technology providers.",
      "We use such providers only as necessary to provide the relevant feature, subject to applicable legal requirements, customer instructions and contractual safeguards.",
      "Customer communication content is not intended to be used by Siplink or its AI providers to train general-purpose AI models unless separately agreed with the customer or otherwise lawfully authorised and appropriately disclosed.",
      "AI-generated responses may be inaccurate or incomplete. Customers and users should review AI-generated information before relying on it for important decisions.",
      "Business customers are responsible for configuring AI features appropriately and providing required notices or obtaining required permissions from callers and other affected individuals.",
    ],
  },
  {
    title: "5. Call Recording, Voicemail and Communication Monitoring",
    blocks: [
      "Certain Siplink services may support call recording, voicemail, transcription and communication monitoring.",
      "These features may be enabled by a customer administrator, selected by a user or configured under the relevant service agreement.",
      "Where a business customer enables call recording, monitoring, transcription or similar features, that customer is responsible for:",
      {
        ul: [
          "Determining whether the activity is lawful;",
          "Providing appropriate notices to callers and users;",
          "Obtaining consent or other required legal authorisation;",
          "Configuring access permissions and retention periods; and",
          "Complying with applicable telecom, privacy, employment and sector-specific requirements.",
        ],
      },
      "Siplink may process the resulting information to provide the service, follow customer instructions, troubleshoot issues, protect the platform and meet applicable legal obligations.",
    ],
  },
  {
    title: "6. Sharing and Disclosure of Information",
    blocks: [
      "We may share information with the following categories of recipients where necessary to provide our services or comply with legal requirements:",
      {
        terms: [
          ["Telecom and connectivity providers", "To connect, route and deliver calls, messages and other communications."],
          ["Hosting and infrastructure providers", "To host, store, maintain and secure our websites, applications, databases and communication platforms."],
          ["Push-notification providers", "Such as Apple Push Notification service and Firebase Cloud Messaging, where used, to deliver application notifications."],
          ["AI and speech technology providers", "To provide AI voice, speech recognition, transcription and related features enabled by customers."],
          ["Customer-support providers", "Including tawk.to or other providers used to manage support requests and customer communications."],
          ["Security, monitoring and analytics providers", "To protect systems, monitor performance and diagnose technical issues."],
          ["Payment, billing and professional service providers", "To administer payments, accounts, audits and business operations."],
          ["Business customers and administrators", "To provide account management, communication records and other contracted service functionality."],
          ["Government and regulatory authorities", "Where required by applicable law, DoT licence conditions, lawful directions, court orders or other valid legal process."],
          ["Professional advisers and transaction parties", "Where reasonably necessary for legal, audit, financing, restructuring or business-transfer purposes, subject to appropriate confidentiality safeguards."],
        ],
      },
      "We do not sell personal information as a commercial data-broker activity. We do not share personal information for third-party targeted advertising unless separately disclosed and lawfully authorised.",
    ],
  },
  {
    title: "7. International Data Processing",
    blocks: [
      "Siplink uses hosting, telecommunications and technology infrastructure in India and other countries.",
      "Depending on the service, customer configuration and service provider, information may be stored or processed in India, the United Kingdom, the European Economic Area, the United States or other locations where our service providers operate.",
      "Where information is transferred internationally, we seek to implement appropriate contractual, technical and organisational safeguards and comply with applicable data-protection, telecom and cross-border transfer requirements.",
      "Customers with specific data residency or sectoral requirements should discuss those requirements with Siplink before enabling the relevant services.",
    ],
  },
  {
    title: "8. Data Retention",
    blocks: [
      "We retain information for as long as reasonably necessary to provide our services, administer accounts, maintain security, resolve disputes, comply with legal requirements and enforce contractual rights.",
      "Retention periods depend on the type of information and applicable legal obligations.",
      "Examples include:",
      {
        ul: [
          "Account and profile information may be retained while an account or customer relationship remains active and for a reasonable period thereafter;",
          "Contact information may be retained while contact synchronisation or the relevant account feature remains active, subject to applicable deletion requests and legal requirements;",
          "Call-detail, exchange-detail, IP-detail and other telecom records may be retained for periods required under applicable DoT authorisation or licence conditions and other laws;",
          "Call recordings, voicemail, messages and transcripts may be retained according to customer settings, service configuration and applicable legal requirements;",
          "Push-notification and device information may be retained as necessary to provide and secure application functionality;",
          "Security, access and diagnostic logs may be retained for operational, security and legal purposes; and",
          "Billing, tax, contractual and dispute records may be retained for periods required by applicable law.",
        ],
      },
      "Where telecom laws, DoT licence conditions or lawful directions require Siplink to retain specified records, those records may not be deleted immediately upon an account-deletion request.",
      "When information is no longer required and no legal or legitimate retention ground applies, we will securely delete, anonymise or otherwise dispose of it in accordance with our retention procedures.",
    ],
  },
  {
    title: "9. Account Deletion and Data Deletion Requests",
    blocks: [
      "Users who create accounts through SIPLINK-UC may request deletion of their application account.",
      // shortcut: the supplied text also links a public account-deletion webpage that is not live yet; add it here once it is published.
      "Users can initiate account deletion through the in-app account settings, where available.",
      "Users who cannot access the application may submit a deletion request through our support email.",
      "We may request reasonable information to verify the identity of the requester and confirm the account to which the request relates.",
      "When a valid deletion request is processed, we will delete or de-identify the account information and associated personal information that we are not legally required or otherwise permitted to retain.",
      "Certain telecom records, call-detail records, billing information, security logs, dispute records or information subject to legal retention requirements may be retained for the applicable period. Where appropriate, access to retained information will be restricted and it will not be used for unrelated purposes.",
      "Deleting an individual SIPLINK-UC user account does not automatically terminate the organisation's master PBX, hosted telephony or business account. A business administrator or authorised account representative may need to manage the organisation's services separately.",
    ],
  },
  {
    title: "10. Information Security",
    blocks: [
      "Siplink maintains technical and organisational measures designed to protect personal information against unauthorised access, disclosure, alteration, loss or destruction.",
      "Depending on the system and service, these measures may include:",
      {
        ul: [
          "TLS encryption for supported data in transit;",
          "SRTP or other appropriate protections for supported real-time voice traffic;",
          "Encryption and access controls for stored information, where supported;",
          "Role-based access controls and least-privilege access;",
          "Multi-factor authentication for supported administrative and internal systems;",
          "Network security, monitoring and vulnerability management;",
          "Logging and review of relevant access and administrative activity;",
          "Backup, recovery and business-continuity measures; and",
          "Personnel confidentiality and security practices.",
        ],
      },
      "Siplink maintains ISO/IEC 27001 certification and has undergone a SOC 2 Type II audit. The scope, period and systems covered by these assessments are defined by the applicable certificates and audit reports. These assessments should not be interpreted as a guarantee that every product, third-party provider or customer environment is independently certified.",
      "No method of electronic transmission or storage is completely secure. We continually review and improve our security safeguards in light of our services and applicable risks.",
    ],
  },
  {
    title: "11. Healthcare and HIPAA-Related Services",
    blocks: [
      "Certain Siplink customer arrangements may include contractual safeguards intended to support customers subject to the United States Health Insurance Portability and Accountability Act (HIPAA), including Business Associate Agreements where applicable.",
      "HIPAA-related obligations apply only where the relevant parties, services, information and contractual arrangements fall within the scope of HIPAA.",
      "Not every Siplink product, integration, vendor or deployment is automatically HIPAA compliant merely because Siplink may enter into a Business Associate Agreement for a particular service.",
      "Customers must confirm the relevant service scope and safeguards with Siplink before transmitting protected health information.",
    ],
  },
  {
    title: "12. Indian Privacy and Telecom Compliance",
    blocks: [
      "Siplink is based in India and operates under applicable telecom authorisations and regulatory obligations.",
      "We process personal information in accordance with applicable Indian laws, including the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025, to the extent and from the dates their provisions apply, together with applicable telecommunications, cybersecurity and other legal requirements.",
      "Depending on the service and applicable authorisation or licence conditions, Siplink may be required to maintain subscriber, commercial, call-detail, exchange-detail, IP-detail, security or other records and provide information to competent authorities in response to lawful requirements.",
      "We will provide notices, facilitate applicable rights and maintain safeguards as required by the provisions in force and applicable law.",
    ],
  },
  {
    title: "13. Privacy Rights and Requests",
    blocks: [
      "Subject to applicable law and the role Siplink performs in the relevant processing, individuals may be able to request:",
      {
        ul: [
          "Information about personal data being processed;",
          "Correction or updating of inaccurate information;",
          "Deletion of personal information where legally permitted;",
          "Withdrawal of consent where processing is based on consent;",
          "Information about relevant grievance or complaint procedures; and",
          "Other rights available under applicable data-protection laws.",
        ],
      },
      "Where Siplink processes information on behalf of a business customer, requests may need to be directed to that customer, which may be the responsible data fiduciary or controller.",
      "We may request reasonable identity verification before acting on a request.",
    ],
  },
  {
    title: "14. European Economic Area, United Kingdom and Other Regions",
    blocks: [
      "Where laws such as the GDPR or UK GDPR apply to our processing, individuals may have rights including access, correction, erasure, restriction, portability, objection and withdrawal of consent, subject to applicable legal conditions and exceptions.",
      "Individuals may also have the right to lodge a complaint with a competent supervisory authority.",
      "The availability of these rights depends on applicable law and the role Siplink performs in the relevant processing.",
    ],
  },
  {
    title: "15. Children's Privacy",
    blocks: [
      "Siplink's business communication and telephony services are not designed for children to create independent accounts or use as a child-directed service.",
      "Business customers must not knowingly provision accounts for children or provide children's personal information through the services unless legally permitted and appropriate safeguards and authorisations are in place.",
      "If we become aware that personal information has been collected in violation of applicable children's privacy requirements, we will take appropriate steps in accordance with applicable law.",
    ],
  },
  {
    title: "16. Customer and Administrator Responsibilities",
    blocks: [
      "Business customers and administrators are responsible for:",
      {
        ul: [
          "Providing appropriate privacy notices to employees, users, callers and contacts;",
          "Obtaining consent or other required legal authority for call recording, monitoring, transcription, contact synchronisation and AI processing;",
          "Configuring user permissions, access controls and retention settings appropriately;",
          "Ensuring uploaded contact lists and communication data are lawfully obtained and used;",
          "Responding to privacy requests where they act as the responsible data controller or equivalent; and",
          "Using Siplink services in compliance with applicable telecom, privacy, employment, consumer-protection and sector-specific requirements.",
        ],
      },
      "Customers must not use Siplink services for unlawful surveillance, unsolicited or unlawful communications, harassment, fraud or other prohibited activities.",
    ],
  },
  {
    title: "17. Cookies and Similar Technologies",
    blocks: [
      "Our website may use session cookies, persistent cookies and similar technologies for:",
      {
        ul: [
          "Essential website functionality;",
          "Session management and account registration;",
          "Security and fraud prevention;",
          "User preferences;",
          "Website analytics and performance; and",
          "Customer-support functionality.",
        ],
      },
      "You can manage cookies through your browser settings. Disabling certain cookies may affect website functionality.",
      "Our mobile applications may use application identifiers, local storage, SDKs and similar technologies for authentication, notifications, diagnostics and service functionality.",
    ],
  },
  {
    title: "18. Third-Party Websites and Services",
    blocks: [
      "Our website, applications or services may contain links to third-party websites, applications or integrations.",
      "Their privacy practices are governed by their own policies. Siplink is not responsible for the privacy or security practices of independent third parties except to the extent required by applicable law or contract.",
      "We encourage users to review the relevant third-party privacy notices before using those services.",
    ],
  },
  {
    title: "19. Changes to This Privacy Policy",
    blocks: [
      "We may update this Privacy Policy to reflect changes in our services, applications, data practices, legal requirements or security measures.",
      "The updated version will be published on our website with a revised “Last updated” date.",
      "Where required by law, we will provide additional notice or obtain consent before implementing a material change.",
    ],
  },
];
