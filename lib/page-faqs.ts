import type { SeoPath } from "@/lib/seo";

export type Faq = { question: string; answer: string };

/**
 * Answers for the pages that have no FAQ of their own, shown on the page and
 * emitted as FAQPage data. Written only from what each page already states.
 * As in lib/products.ts, capacity, coverage, pricing and timelines are left to
 * a conversation rather than given as numbers.
 */
export const pageFaqs: Partial<Record<SeoPath, Faq[]>> = {
  "/industries/banking-finance": [
    { question: "How does SipLink help banks and financial teams manage calls?", answer: "SipLink puts sales, support, service and collections calls on one communication platform, with the structure, accountability and visibility financial teams need." },
    { question: "Can financial conversations be recorded and reviewed?", answer: "Yes. Calls can be recorded and transcribed, so a team has a record of what was said and can turn conversations into information it can act on." },
    { question: "Can we keep our existing numbers?", answer: "Yes. We recommend a configuration from how your teams communicate today, and that includes porting the numbers you already use." },
  ],
  "/industries/call-centers": [
    { question: "What does a call center need beyond reliable calling?", answer: "Routing that gets each caller to the right agent, monitoring while calls are live, and reporting afterwards. SipLink provides these on one platform built for high call volume." },
    { question: "Does SipLink handle both inbound and outbound calls?", answer: "Yes. Inbound and outbound interactions run on the same platform, so managers have visibility across all of them." },
    { question: "Can call center managers see what agents are doing?", answer: "Yes. Managers get visibility across every interaction, and agents get tools designed to help them perform at their best." },
  ],
  "/industries/education": [
    { question: "How can a school or college organise its phone communication?", answer: "SipLink gives an institution one communication environment across departments and campuses, so calls from students and parents reach teams such as admissions, student support or the fees office." },
    { question: "Does it work across more than one campus?", answer: "Yes. Departments, campuses, faculty and administrative teams can all work in the same organised environment." },
    { question: "Can call details be captured for follow-up?", answer: "Yes. Calls are routed to the right team and their details are captured, so enquiries are less likely to be lost between departments." },
  ],
  "/industries/government": [
    { question: "How does SipLink support public-service communication?", answer: "It organises communication across citizens, employees, departments and service centers using structured calling and routing, with management-level visibility." },
    { question: "Can citizen helplines be routed to the right department?", answer: "Yes. A helpline can route each caller to the relevant department or support team, and interactions can be logged." },
    { question: "Can managers see where public demand is highest?", answer: "Yes. Structuring interactions on one platform surfaces where demand is coming from, which helps leaders plan services." },
  ],
  "/industries/healthcare": [
    { question: "Is SipLink suitable for healthcare communication?", answer: "Yes. SipLink brings voice, fax, messaging and high-volume communication together on a HIPAA-compliant platform built for how care organisations work." },
    { question: "Does SipLink support fax for healthcare teams?", answer: "Yes. Fax sits alongside voice on the platform, for communication between patients, providers, insurers and internal teams." },
    { question: "Can we send patients SMS reminders?", answer: "Yes. Messaging is part of the platform, so teams can send patients reminders alongside handling their calls." },
  ],
  "/industries/hospitality": [
    { question: "How does a hospitality phone system help guests?", answer: "It routes each guest to the right team, such as reservations, front desk or service staff, so requests are handled quickly and professionally." },
    { question: "Is SipLink suitable for hotels, resorts and restaurants?", answer: "Yes. It supports communication between guests, reservations, front desks, service teams and management across these businesses." },
    { question: "Can guest requests be captured?", answer: "Yes. Calls are sent to the right team and the request is captured, so the detail is not lost in a handover." },
  ],
  "/industries/it-saas": [
    { question: "Can we build calling and messaging into our own software?", answer: "Yes. SipLink offers programmable voice, SMS, WhatsApp, WebRTC and SIP, so communication can sit inside your application instead of beside it." },
    { question: "What can be added on top of programmable communication?", answer: "Communication intelligence can be layered on top, so your product and teams can learn from conversations as well as carry them." },
    { question: "Which SipLink products do developers use?", answer: "Usually the Voice API, SMS API, WhatsApp Business API, WebRTC SDK and SIP API, chosen according to what the application needs to do." },
  ],
  "/industries/logistics": [
    { question: "How does SipLink help logistics companies?", answer: "It organises continuous communication between customers, drivers, dispatchers, warehouses, branches and operations teams on one platform." },
    { question: "Can customers get delivery updates by message?", answer: "Yes. A delivery event can trigger a text to the customer, and calls can connect the customer and the driver." },
    { question: "Does it work across depots and branches?", answer: "Yes. Warehouses, branches and operations teams share the same platform, which keeps details from being dropped between sites." },
  ],
  "/industries/manufacturing": [
    { question: "How can a manufacturer connect communication across sites?", answer: "SipLink connects corporate offices, factories, warehouses, production teams, suppliers and service departments through centralised communication management." },
    { question: "Can head office manage every location from one place?", answer: "Yes. Sites join one connected communication environment, so management does not have to run each location separately." },
    { question: "Is SipLink suitable for supplier and service calls?", answer: "Yes. Suppliers and service departments are part of the same environment, and call details can be captured for the teams who follow up." },
  ],
  "/industries/retail": [
    { question: "How does SipLink support retail businesses?", answer: "It moves communication quickly between customers, stores, sales teams and support departments from one centralised environment." },
    { question: "Can we manage many stores in one system?", answer: "Yes. Stores can each be reached on their own number while running in one environment, with replies routed to staff." },
    { question: "Can customers receive order updates?", answer: "Yes. A store or order event can send the customer an SMS, such as an order confirmation or a delivery update." },
  ],
  "/industries/staffing-recruitment": [
    { question: "What communication tools do recruitment teams need?", answer: "Recruiters need business voice, candidate SMS, a cloud PBX and CRM integration working together. SipLink brings these onto one platform, from first contact through placement." },
    { question: "Can SipLink help with caller ID and spam labels?", answer: "SipLink offers CNAM and caller ID, spam-free number support and spam monitoring, which help recruiters present a recognisable number to candidates." },
    { question: "Does it integrate with our recruitment CRM?", answer: "SipLink offers CRM integrations, so candidate and client conversations can sit with the rest of your records. Tell us which system you use and we will confirm the fit." },
  ],
  "/industries/telecom-operators": [
    { question: "What does SipLink offer telecom operators?", answer: "Flexible voice infrastructure for operators and communication service providers, including SIP connectivity, SBC, number management and programmable services." },
    { question: "Does it integrate with an operator's own environment?", answer: "Yes. The infrastructure is designed to integrate into an operator's existing environment rather than replace it." },
    { question: "Can operators offer more than basic connectivity?", answer: "Yes. Beyond connectivity, operators can add programmable services and communication intelligence for their customers." },
  ],

  "/solutions/customer-support": [
    { question: "What makes a phone system good for customer support?", answer: "It gets each caller to the right person quickly and keeps managers informed. SipLink does this with IVR menus, intelligent routing and queues, plus analytics, recording and monitoring." },
    { question: "How does a caller reach an agent?", answer: "The IVR menu asks once what the caller needs, the queue holds their place, and the first free agent picks up." },
    { question: "Which SipLink products power customer support?", answer: "Typically call queues, IVR, call recording and call analytics, configured around how your support team works." },
  ],
  "/solutions/sales-teams": [
    { question: "How can sales reps spend less time dialling?", answer: "An outbound dialler works through the contact list so reps do not dial by hand. Dead dials never reach a person, and the conversation arrives with its context." },
    { question: "Does it connect to our CRM?", answer: "Yes. CRM integration keeps calling and customer context together, with less manual work between calls." },
    { question: "Can managers see sales conversations?", answer: "Yes. Conversation visibility is included, so managers can see what is happening across outbound calling." },
  ],
  "/solutions/remote-workforce": [
    { question: "How do remote employees use the business phone system?", answer: "They call from desktop, mobile or browser using the same business identity, so they answer as the business wherever they are." },
    { question: "What happens when someone calls an employee who is away from a desk?", answer: "The business number rings and the extension follows the person, who answers as the business." },
    { question: "Does the company keep control of communications?", answer: "Yes. Control stays centralised, so flexible working does not mean losing control of your business communications." },
  ],
  "/solutions/multi-branch": [
    { question: "How can a business with many branches share one phone system?", answer: "SipLink gives branches one connected communication environment, with cross-branch calling and central management." },
    { question: "Can each branch keep its own identity and hours?", answer: "Yes. Each location can keep its own identity and business hours while staff reach other branches directly." },
    { question: "Can head office see every branch?", answer: "Yes. Head office manages all branches centrally and can apply consistent standards across them." },
  ],
  "/solutions/global-offices": [
    { question: "Do we need a separate phone system in each country?", answer: "No. SipLink connects employees, customers and offices across countries and regions through a single, consistent communication environment." },
    { question: "How does opening a new market work?", answer: "You take a number local to that market, it joins the platform you already run, and policy stays set in one place. Number availability varies by market, so we confirm it with you first." },
    { question: "Can offices be administered centrally?", answer: "Yes. Administration is centralised across sites, while local numbers and routing stay flexible." },
  ],
  "/solutions/unified-communications": [
    { question: "What is unified communications?", answer: "Unified communications brings calling, messaging, applications and team communication into one connected environment, instead of a separate system for each." },
    { question: "What does SipLink unified communications include?", answer: "Voice, video and messaging, collaboration in one place, and business app integrations, all managed as one environment." },
    { question: "Does it replace the collaboration tools we use?", answer: "Not necessarily. Collaboration keeps its home, and customer channels and your applications join it in the same environment." },
  ],
  "/solutions/cloud-migration": [
    { question: "What is cloud phone migration?", answer: "It is moving business communication out of hardware-dependent environments into a flexible cloud model that supports remote work, new locations and change." },
    { question: "What are the steps in a cloud migration?", answer: "Understand what you run today, design the migration, configure and test, port your numbers, cut over with continuity, then monitor and tune." },
    { question: "Will we lose our phone numbers?", answer: "Your numbers are ported as part of the plan, so customers can keep calling the numbers they know." },
  ],
  "/solutions/pbx-migration": [
    { question: "Do we have to start from scratch to replace an old PBX?", answer: "No. We map what matters in your current system and modernise the rest, preserving the calling requirements your business depends on." },
    { question: "Why move away from an on-premise PBX?", answer: "An on-premise PBX is a standing cost. Modern SIP and cloud communication gives you a more flexible system while keeping familiar workflows." },
    { question: "How does a PBX migration run?", answer: "We review what you run today, design the migration, configure and test it, port your numbers, cut over with continuity, then monitor and tune." },
  ],
  "/solutions/pri-migration": [
    { question: "Why move from PRI to SIP?", answer: "PRI is hard to scale and slow to change. SIP moves your voice onto more flexible, scalable infrastructure." },
    { question: "Can we keep our numbers when leaving PRI?", answer: "Yes. Porting your numbers is a planned step in the transition, before the cutover." },
    { question: "How is the move from PRI managed?", answer: "It is a planned transition: understand what you run, design the migration, configure and test, port numbers, cut over with continuity, then monitor and tune." },
  ],
  "/solutions/number-porting": [
    { question: "Can I keep my business number when I switch provider?", answer: "Yes, for eligible numbers. Number porting transfers your existing business numbers to SipLink, so customers do not have to learn a new number." },
    { question: "Why does keeping the number matter?", answer: "Your number is on your website, advertising and customers' phones. Changing it can cost you customers, while porting lets you modernise without that disruption." },
    { question: "How long does a port take?", answer: "It depends on the numbers and your current provider. We plan a coordinated, low-disruption port and confirm the details with you after validating the numbers." },
  ],

  "/internet/dedicated-internet": [
    { question: "What is dedicated internet?", answer: "Dedicated internet is a connection with bandwidth provisioned specifically for your business rather than drawn from a pool shared with others." },
    { question: "When does a business need dedicated internet?", answer: "When the business depends heavily on its connection and a shared line may not give it the performance, consistency or assurance it needs." },
    { question: "What speeds are available?", answer: "Dedicated bandwidth is sized from 50 Mbps to 100 Gbps, subject to your requirement and a check of your site." },
  ],
  "/internet/business-broadband": [
    { question: "Who is the Business Internet Leased Line for?", answer: "Businesses that need dependable internet for everyday operations without the complexity or the cost of an enterprise dedicated circuit." },
    { question: "How is a plan sized?", answer: "From what the business actually runs: how many people use the line at once, which applications, and how much traffic travels upward. We check the address, then quote." },
    { question: "Can I add a static IP?", answer: "Static IP is available on eligible plans, and managed router and firewall, business Wi-Fi and LAN services can layer onto the same line." },
  ],
  "/internet/static-ip": [
    { question: "What is a static IP address?", answer: "A public internet address that stays the same instead of changing periodically, so other systems can be configured to trust it." },
    { question: "Does my business need a static IP?", answer: "Not every business does. It is useful when something outside your network has to recognise you, such as an allowlist, a VPN, a SIP trunk or remote access." },
    { question: "Does a static IP make my connection faster or more secure?", answer: "No. It does not increase speed and is not a security control on its own. It gives you one consistent address that other systems and rules can use." },
  ],
  "/internet/network-solutions/managed-router-firewall": [
    { question: "What does a managed router and firewall service cover?", answer: "Centralised policy, change management, configuration backup and monitoring, so the rules do not live in one person's memory." },
    { question: "Why have the router and firewall managed?", answer: "Rules and firmware age quietly, and the person who set them up may have left. Management keeps them documented, current and watched." },
    { question: "Is monitoring included?", answer: "Yes. Monitoring is part of the managed service rather than a separate purchase." },
  ],
  "/internet/network-solutions/business-wifi": [
    { question: "Why is one access point not enough for an office?", answer: "Coverage depends on walls, glass, racking and how many devices are in a room at once. A workplace network has to be planned around those, however fast the line behind it is." },
    { question: "What does a business Wi-Fi deployment include?", answer: "It can include coverage planning, employee and guest separation, roaming support and design for device density." },
    { question: "How is a Wi-Fi network designed?", answer: "We walk the floor, count the devices, place the access points, separate the networks, then tune the network in use. The price follows the survey and the design." },
  ],
  "/internet/network-solutions/lan-switching": [
    { question: "Why does the LAN matter if the internet line is fast?", answer: "An internet connection is only as effective as the network supporting it. A fast line behind unmanaged switches and improvised cabling will still disappoint users." },
    { question: "What does a designed LAN provide?", answer: "Segmentation, readiness for IP telephony, room to expand and simpler troubleshooting." },
    { question: "When should a business redo its LAN?", answer: "Good moments include moving to a new office or putting in IP phones, when voice, data, Wi-Fi and devices have to share the same cabling." },
  ],
  "/internet/network-solutions/vpn": [
    { question: "What does a business VPN do?", answer: "It securely connects business locations and authorised users across IP networks, giving you a single network with a small number of controlled ways in." },
    { question: "What types of VPN are available?", answer: "Site-to-site VPN, remote access VPN, cloud connectivity and secure application access." },
    { question: "Does a VPN replace a firewall?", answer: "No. A VPN is not a firewall and does not create bandwidth, and it is only as current as its access list. It works alongside those other layers." },
  ],
  "/internet/network-solutions/sd-wan": [
    { question: "What is SD-WAN?", answer: "SD-WAN decides which connection to use, for what traffic, and when to stop using it. Having more than one link only helps if something makes that decision." },
    { question: "What are the benefits of SD-WAN?", answer: "Better application performance, higher resilience, centralised management, simpler branch deployment and an architecture that scales." },
    { question: "Who should consider SD-WAN?", answer: "Organisations expanding across branches, offices, cloud environments and remote locations, where managing each connection one at a time has become the bottleneck." },
  ],
  "/internet/network-solutions/multi-location-networking": [
    { question: "How is connecting many offices different from connecting one?", answer: "One site is straightforward. Connecting 5, 20 or 100 is a structural problem that is not solved by ordering more of the same circuit." },
    { question: "What does a multi-location network connect?", answer: "Head office, branches, cloud, data centres and remote users, designed as one connected network." },
    { question: "Which sectors use multi-location networking?", answer: "Common examples are retail, education, healthcare, manufacturing, financial services and IT and ITES." },
  ],
};
