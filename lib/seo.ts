import type { Metadata } from "next";

import { site } from "@/lib/site";

export const openGraphDefaults = {
  siteName: site.name,
  locale: "en_IN",
  type: "website" as const,
  // A page's `openGraph` replaces the root file's image, so name it here too.
  images: ["/opengraph-image"],
};

/**
 * Per-page copy, keyed by path: title, description, breadcrumb name. The core
 * service pages target the agency's Chennai keywords. Titles stay within ~60
 * characters and descriptions within ~160, the lengths search results show.
 */
export const seo = {
  "/": ["VoIP Business Solutions in Chennai | SipLink", "SipLink delivers VoIP business solutions and business communication solutions in Chennai: cloud phone systems, SIP trunking and hosted PBX.", "Home"],

  "/products": ["Cloud Phone Systems in Chennai | SipLink", "Cloud phone systems, unified communications and business-grade VoIP for Chennai offices, from one provider and one network.", "Products"],
  "/products/sip-trunking": ["VoIP SIP Trunking Services in Chennai | SipLink", "VoIP SIP trunking services in Chennai: connect your existing PBX to SipLink's IP network for lower call costs and guaranteed call quality.", "SIP Trunking"],
  "/products/cloud-pbx": ["Cloud-Based PBX Systems in Chennai | SipLink", "Cloud-based PBX systems in Chennai: route, queue and manage every customer conversation without on-site hardware.", "Cloud PBX"],
  "/products/hosted-pbx": ["Hosted VoIP & Virtual PBX Provider in Chennai | SipLink", "Virtual PBX provider in Chennai: hosted VoIP and business phone services, managed end to end by SipLink, with no box to maintain.", "Hosted PBX"],
  "/products/ip-pbx": ["IP PBX for Enterprises in Chennai | SipLink", "IP PBX for enterprises in Chennai: a SIP-enabled on-premise PBX you control, connected to SipLink's voice network over SIP.", "IP PBX"],
  "/products/call-center": ["VoIP for Call Centers in Chennai | SipLink", "VoIP for call centers in Chennai: smart routing, queues, recording, whisper and barge, and AI call analytics.", "Call Center"],
  "/products/ai-voice-assistant": ["AI Voice Assistant for Business Calls | SipLink", "SipLink AI Voice Assistant handles routine calls in natural conversation, collects details and routes callers, with transcripts and summaries for your team.", "AI Voice Assistant"],
  "/products/call-analytics": ["Business Call Analytics & Reporting | SipLink", "See call volumes, trends, missed calls and agent performance. SipLink Call Analytics turns everyday calling activity into useful business insight.", "Call Analytics"],
  "/products/call-queue": ["Call Queue System for Business Teams | SipLink", "Hold callers in organised queues per department, with announcements, callback, skill-based routing and live supervisor monitoring from SipLink.", "Call Queue"],
  "/products/call-recording": ["Business Call Recording Software | SipLink", "Record inbound and outbound calls automatically or on demand, with role-based access, search, playback and transfer to FTP/SFTP from SipLink.", "Call Recording"],
  "/products/crm-integration": ["CRM Phone Integration: Click-to-Dial | SipLink", "Connect your CRM to your business phones: screen pop on incoming calls, click-to-dial and automatic call activity logging from SipLink.", "CRM Integration"],
  "/products/did-numbers": ["DID Numbers: Direct Inward Dialing | SipLink", "Give employees, departments and applications their own direct numbers. SipLink DID numbers reach the right person without a main switchboard.", "DID Numbers"],
  "/products/ivr": ["IVR System for Business Phone Lines | SipLink", "Build multi-level, multilingual voice menus with custom greetings, so every caller reaches the right department or service with SipLink IVR.", "IVR System"],
  "/products/number-porting": ["Business Number Porting Service | SipLink", "Move your business phone numbers to SipLink and keep the numbers customers know, with validation, planning and a port coordinated with your provider.", "Number Porting"],
  "/products/predictive-dialer": ["Predictive Dialer for Outbound Teams | SipLink", "Automate dialling so sales and outbound agents spend their time talking, with campaign management and call outcome tracking from SipLink.", "Predictive Dialer"],
  "/products/sbc": ["Session Border Controller (SBC) | SipLink", "Put a controlled boundary around your voice network. SipLink's SBC manages SIP connections between trunks, PBX systems, cloud platforms and carriers.", "Session Border Controller"],
  "/products/sip-api": ["SIP API for Voice Applications | SipLink", "Integrate SIP voice into your applications and telephony environment. SipLink SIP API gives you programmatic control of trunks and voice workflows.", "SIP API"],
  "/products/sms-api": ["Business SMS API: OTP & Alerts | SipLink", "Send OTPs, verification codes, notifications and transactional messages from your own systems with the SipLink SMS API for business applications.", "SMS API"],
  "/products/teams-calling": ["Microsoft Teams Calling: Direct Routing | SipLink", "Make and take business calls inside Microsoft Teams. SipLink connects Teams to the phone network through Direct Routing and keeps eligible numbers.", "Microsoft Teams Calling"],
  "/products/toll-free-numbers": ["Toll-Free Numbers for Business | SipLink", "Let customers call your business free of charge, with calls routed to the right team through IVR and queues. Port a toll-free number or take a new one.", "Toll-Free Numbers"],
  "/products/virtual-numbers": ["Virtual Phone Numbers for Business | SipLink", "Build a professional phone presence with no physical line. SipLink virtual numbers route calls by time or team to desk, mobile or softphone.", "Virtual Phone Numbers"],
  "/products/voice-api": ["Voice API for Programmable Calling | SipLink", "Add voice calling to websites, apps, CRMs and workflows without building telephony infrastructure. SipLink Voice API offers programmatic call control.", "Voice API"],
  "/products/webrtc-sdk": ["WebRTC SDK for In-App Browser Calling | SipLink", "Add real-time voice to web and application environments with nothing for customers to install. SipLink WebRTC SDK offers browser calling and a softphone.", "WebRTC SDK"],
  "/products/whatsapp-api": ["WhatsApp Business API Integration | SipLink", "Connect WhatsApp to your applications and support workflows. Send notifications and updates and hold customer conversations with SipLink.", "WhatsApp Business API"],

  "/solutions": ["Business Communication Solutions | SipLink", "Find the right SipLink setup by business size, use case or migration: from startups and multi-branch firms to PRI, PBX and cloud moves.", "Solutions"],
  "/solutions/startups": ["Business Phone System for Startups | SipLink", "A cloud business phone system for startups: no hardware to buy, a professional presence from day one, and room to add users as your team grows.", "Startups"],
  "/solutions/small-business": ["Small Business Phone System | SipLink", "A complete cloud phone system for small business: shared virtual PBX, recording, voicemail, SMS and a mobile app, with no IT staff needed to run it.", "Small Business"],
  "/solutions/mid-market": ["Phone System for Mid-Sized Companies | SipLink", "Advanced routing, queues, multi-site management, reporting and CRM integration on one communication platform for growing mid-sized businesses.", "Mid-Market"],
  "/solutions/enterprise": ["Enterprise Voice & Communications | SipLink", "Connect Microsoft Teams, PBX platforms, SIP trunks, CRM and contact centers across every site into one environment, with nothing switched off.", "Enterprise"],
  "/solutions/customer-support": ["Phone System for Customer Support | SipLink", "Get each caller to the right agent with IVR, queues and intelligent routing, and give support managers analytics, recording and monitoring.", "Customer Support"],
  "/solutions/sales-teams": ["Calling Software for Sales Teams | SipLink", "Help sales reps spend less time dialling and more time selling, with streamlined outbound calling, business numbers and CRM integration.", "Sales Teams"],
  "/solutions/remote-workforce": ["Phone System for Remote Teams | SipLink", "Give remote and hybrid teams one business identity on desktop, mobile and browser, with extension mobility, presence and centralised control.", "Remote Workforce"],
  "/solutions/multi-branch": ["Multi-Branch Business Phone System | SipLink", "Connect every branch with cross-branch calling and central management, while each location keeps its own identity and business hours.", "Multi-Branch"],
  "/solutions/global-offices": ["Global Office Phone System | SipLink", "Connect offices across countries on one communication environment, with local numbers and routing in each market and centralised administration.", "Global Offices"],
  "/solutions/unified-communications": ["Unified Communications for Business | SipLink", "Bring voice, video, messaging and business apps into one connected environment, instead of managing a separate system for every channel.", "Unified Communications"],
  "/solutions/cloud-migration": ["Cloud Phone System Migration | SipLink", "Move your phones from hardware to the cloud in a planned migration: assess, design, test, port numbers, cut over with continuity, then monitor and tune.", "Cloud Migration"],
  "/solutions/pbx-migration": ["Legacy PBX Migration to SIP & Cloud | SipLink", "Replace a legacy on-premise PBX with modern SIP and cloud communication while preserving the calling requirements your business depends on.", "PBX Migration"],
  "/solutions/pri-migration": ["PRI to SIP Migration Services | SipLink", "Move from PRI lines to SIP-based voice in a planned transition, with numbers ported and setup tested before cutover, on infrastructure that scales.", "PRI Migration"],
  "/solutions/number-porting": ["Keep Your Number When Switching | SipLink", "Switching phone provider? Plan a coordinated, low-disruption port with SipLink so customers keep calling the business numbers they already know.", "Number Porting"],

  "/industries": ["Communication Solutions by Industry | SipLink", "Cloud communication tuned to how each sector works: call centers, healthcare, banking, retail, logistics, education, government and more.", "Industries"],
  "/industries/banking-finance": ["Banking & Finance Call Solutions | SipLink", "Handle sales, service and collections calls with the structure and visibility financial teams need, and turn conversations into usable information.", "Banking & Finance"],
  "/industries/call-centers": ["Call Center Software & Solutions | SipLink", "Run inbound and outbound on one platform built for high call volume, giving agents better tools and managers visibility across every interaction.", "Call Centers"],
  "/industries/education": ["Communication System for Education | SipLink", "Connect students, parents, faculty and administration across departments and campuses, with organised lines for admissions, support and fees.", "Education"],
  "/industries/government": ["Government Communication Systems | SipLink", "Organise communication across citizens, employees, departments and service centers with structured calling, routing and management-level visibility.", "Government"],
  "/industries/healthcare": ["Healthcare Phone & Fax Solutions | SipLink", "Bring voice, fax and messaging between patients, providers, insurers and care teams together on a HIPAA-compliant communication platform.", "Healthcare"],
  "/industries/hospitality": ["Hotel & Hospitality Phone Systems | SipLink", "Route guests to reservations, front desk or service teams quickly, with fast, professional communication for hotels, resorts and restaurants.", "Hospitality"],
  "/industries/it-saas": ["Voice & SMS APIs for IT and SaaS | SipLink", "Embed calling and messaging in your own software with programmable voice, SMS, WhatsApp, WebRTC and SIP, then add communication intelligence on top.", "IT & SaaS"],
  "/industries/logistics": ["Logistics Communication Platform | SipLink", "Keep customers, drivers, dispatchers, warehouses and branches connected on one platform, with routed calls, message updates and captured details.", "Logistics"],
  "/industries/manufacturing": ["Manufacturing Communication Systems | SipLink", "Connect corporate offices, factories, warehouses, suppliers and service teams across every site through centralised communication management.", "Manufacturing"],
  "/industries/retail": ["Retail Communication Solutions | SipLink", "Connect customers, stores, sales teams and support departments from one centralised environment, so retail communication keeps moving quickly.", "Retail"],
  "/industries/staffing-recruitment": ["Phone & SMS Tools for Recruiters | SipLink", "Business voice, candidate SMS, cloud PBX and CRM integration for staffing teams, with caller ID and spam monitoring support from first call to placement.", "Staffing & Recruitment"],
  "/industries/telecom-operators": ["Voice Infrastructure for Telecoms | SipLink", "Flexible voice infrastructure for operators and communication service providers: SIP connectivity, SBC, number management and programmable services.", "Telecom Operators"],

  "/internet": ["Business Internet Leased Line in Chennai | SipLink", "Business communication infrastructure in Chennai: internet leased lines, static IP and managed networks from a Class A ISP, monitored 24/7.", "Internet"],
  "/internet/dedicated-internet": ["Dedicated Internet Leased Line in Chennai | SipLink", "Dedicated internet leased line in Chennai with dependable bandwidth and SLA-backed service for business-critical operations.", "Dedicated Internet"],
  "/internet/dedicated-internet/dedicated-bandwidth": ["Dedicated Bandwidth, 50 Mbps to 100 Gbps | SipLink", "Bandwidth provisioned for your business, not shared: no contention ratio, a committed rate and predictable performance, sized from 50 Mbps to 100 Gbps.", "Dedicated Bandwidth"],
  "/internet/dedicated-internet/symmetrical-speeds": ["Symmetrical Internet Speeds for Business | SipLink", "Equal upload and download performance for the traffic businesses send out: video calls, VoIP, cloud backup, file sharing and remote access.", "Symmetrical Speeds"],
  "/internet/dedicated-internet/sla": ["Dedicated Internet SLA & Commitments | SipLink", "What an internet SLA should cover: written commitments across the whole path, active monitoring, a defined escalation path and clear restoration steps.", "SLA"],
  "/internet/dedicated-internet/enterprise-connectivity": ["Enterprise Internet Connectivity Design | SipLink", "Enterprise connectivity designed around your business: architecture for cloud-first firms, contact centres, multi-location groups and manufacturers.", "Enterprise Connectivity"],
  "/internet/business-broadband": ["Business Internet Leased Line Service | SipLink", "Dependable internet leased line for everyday business operations, without the complexity or cost of an enterprise dedicated circuit, from SipLink.", "Business Internet Leased Line"],
  "/internet/business-broadband/plans": ["Business Internet Plans, Sized for You | SipLink", "No standard plan: SipLink sizes your business internet from concurrency, uploads and voice traffic, checks your address, then quotes per site.", "Plans"],
  "/internet/business-broadband/features": ["Business Internet Leased Line Features | SipLink", "Scalable connectivity, business support, static IP availability and voice that holds up: what a business line does that a consumer one will not.", "Features"],
  "/internet/business-broadband/business-benefits": ["Benefits of a Business Internet Line | SipLink", "Reliable connectivity, better cloud access, VoIP support, remote work, easy scaling and business-focused support: what changes in an ordinary week.", "Business Benefits"],
  "/internet/static-ip": ["Static IP Address for Business | SipLink", "A fixed public internet address for your business, for predictable inbound access and IP-based security controls. Add one to an eligible SipLink line.", "Static IP"],
  "/internet/static-ip/what-is-static-ip": ["What Is a Static IP Address? | SipLink", "A static IP is a public address that stays fixed instead of changing. Learn how it differs from a dynamic IP, and whether your business needs one.", "What Is a Static IP?"],
  "/internet/static-ip/business-uses": ["Static IP Uses for Business Networks | SipLink", "Eight common business uses for a static IP: remote access, VPN, IP allowlisting, VoIP and SIP, CCTV, server hosting and API integrations.", "Business Uses"],
  "/internet/static-ip/add-static-ip": ["Add a Static IP to Your Connection | SipLink", "How to add a static IP to an eligible SipLink internet service: confirm requirements and eligibility, then assign, configure and test the address.", "Add a Static IP"],
  "/internet/network-solutions": ["Managed Network Solutions | SipLink", "Managed business networks beyond the internet line: router and firewall, Wi-Fi, LAN and switching, VPN, SD-WAN and multi-location networking.", "Network Solutions"],
  "/internet/network-solutions/managed-router-firewall": ["Managed Router & Firewall Service | SipLink", "Secure your business network with centralised policy, change management, configuration backup and monitoring, managed by the SipLink team.", "Managed Router & Firewall"],
  "/internet/network-solutions/business-wifi": ["Business Wi-Fi Design & Deployment | SipLink", "Reliable workplace wireless planned from a site survey: coverage planning, employee and guest separation, roaming support and device density.", "Business Wi-Fi"],
  "/internet/network-solutions/lan-switching": ["LAN & Network Switching for Offices | SipLink", "A designed office LAN with segmentation, room to expand and IP telephony readiness, so your internet line performs as it should at every desk.", "LAN & Switching"],
  "/internet/network-solutions/vpn": ["Business VPN: Site-to-Site & Remote | SipLink", "Connect locations and people securely with site-to-site VPN, remote access VPN, cloud connectivity and secure application access from SipLink.", "VPN"],
  "/internet/network-solutions/sd-wan": ["SD-WAN for Multi-Branch Business | SipLink", "Application-aware routing across multiple links, with higher resilience, centralised management and simplified branch deployment from SipLink.", "SD-WAN"],
  "/internet/network-solutions/multi-location-networking": ["Multi-Location Business Networking | SipLink", "One connected network across head office, branches, cloud, data centre and remote users, designed as a single structure from 5 sites to 100.", "Multi-Location Networking"],

  "/pricing": ["Business VoIP Plans in Chennai | SipLink Pricing", "Affordable, scalable business VoIP plans in Chennai: Core, Business Pro and Enterprise Plus, priced per line per month.", "Pricing"],
  "/why-siplink": ["Why Choose SipLink for Business Voice | SipLink", "Why growing businesses and enterprises choose SipLink for business voice, cloud PBX, SIP trunking and unified communications they can rely on.", "Why SipLink"],
  "/about": ["About SipLink: Business VoIP Provider | SipLink", "SipLink Communications builds business voice from Chennai: cloud telephony, SIP trunking and unified communications for growing organizations.", "About"],
  "/company": ["SipLink Communications: Company Overview | SipLink", "SipLink Communications at a glance: our story, differentiators, verified certifications, partner integrations, careers and operating facilities.", "Company"],
  "/company/10dlc": ["A2P 10DLC Compliance Guide for U.S. SMS | SipLink", "What A2P 10DLC is, who needs it and how to register: a practical U.S. business SMS guide covering consent, opt-in, STOP and HELP, and consent records.", "A2P 10DLC"],
  "/company/careers": ["Careers in Cloud Communications | SipLink", "Join SipLink. Explore careers in cloud communications, VoIP engineering, network operations, customer success and enterprise sales.", "Careers"],
  "/company/certifications": ["Certifications & Compliance | SipLink", "SipLink's verified regulatory certifications and compliance standards, including DoT, ISO/IEC 27001:2022, SOC 2 Type 2, HIPAA and GDPR.", "Certifications"],
  "/company/news": ["News & Insights on Business Voice | SipLink", "Business communication insights, cloud telephony trends, VoIP best practices, regulatory compliance updates and company news from SipLink.", "News"],
  "/company/partners": ["Partner Program & Integrations | SipLink", "Join the SipLink partner ecosystem and integrate business voice and cloud telephony with CRM, productivity and contact center platforms.", "Partners"],
  "/contact": ["Contact SipLink: Chennai VoIP Provider | SipLink", "Talk to SipLink about cloud telephony, SIP trunking and call centre solutions. Offices in Chennai, Bangalore and Hyderabad. Call +91 82172 02075.", "Contact"],
  "/blog": ["Business VoIP and Internet Blog | SipLink", "Practical guides to business VoIP, cloud telephony, SIP trunking and business internet from the SipLink team in Chennai.", "Blog"],
  "/privacy": ["Privacy Policy | SipLink Communications", "How SipLink Communications collects, protects and handles customer data, in line with telecom regulations and international data protection standards.", "Privacy Policy"],
} as const satisfies Record<string, readonly [string, string, string]>;

export type SeoPath = keyof typeof seo;

/**
 * Title, description, canonical and Open Graph for one page. Next merges
 * `openGraph` shallowly, so a page that sets it must repeat the defaults.
 * The title is absolute so the layout template cannot push it past ~60 chars.
 */
export function seoFor(path: SeoPath): Metadata {
  const [title, description] = seo[path];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphDefaults, url: path, title, description },
  };
}
