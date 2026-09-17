import {
  Activity,
  ArrowLeftRight,
  Blocks,
  BookOpen,
  Boxes,
  Braces,
  Bug,
  Code,
  Code2,
  Container,
  Cpu,
  Download,
  FileCode,
  FileJson,
  FlaskConical,
  Gauge,
  GitBranch,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  MessageCircle,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Play,
  PhoneCall,
  RefreshCw,
  Repeat,
  ScrollText,
  Send,
  ServerCog,
  ShieldCheck,
  Terminal,
  TimerReset,
  Webhook,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Detail content for the individual developer-portal pages under
 * /developers/[slug].
 *
 * The source documentation carries almost no developer/API specifics, so this
 * copy is GENERATED to be substantive and professional, derived from each
 * page's title and SipLink's real API surface (Voice, SMS, WhatsApp, WebRTC,
 * SIP — all documented product areas). Guardrails observed throughout:
 *
 *  - Request/response shapes are framed as ILLUSTRATIVE EXAMPLES, never
 *    presented as canonical endpoints a reader can rely on.
 *  - No fabricated uptime/SLA numbers, no invented rate-limit figures stated
 *    as fact (limits are described as existing and documented per plan), and
 *    no fabricated certifications.
 */

/** A group heading for the /developers index. */
export type DeveloperGroupSlug = "documentation" | "resources" | "support";

export type CodeSample = {
  /** Short label for the tab or caption, e.g. "cURL", "Node.js". */
  language: string;
  /** The illustrative snippet. Framed as an example everywhere it renders. */
  code: string;
};

export type DeveloperSection = {
  heading: string;
  /** One or more paragraphs of explanatory prose. */
  body: string[];
  /** Optional illustrative code block for the section. */
  sample?: CodeSample;
  /** Optional bullet points rendered under the prose. */
  points?: string[];
};

export type DeveloperCapability = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type DeveloperResource = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type DeveloperDetail = {
  slug: string;
  title: string;
  group: string;
  groupSlug: DeveloperGroupSlug;
  /** Short line under the page title. */
  tagline: string;
  /** Opening paragraph. */
  intro: string;
  icon: LucideIcon;
  /** The overview / "what this is" explanatory sections. */
  sections: DeveloperSection[];
  /** The capability grid. */
  capabilities: DeveloperCapability[];
  /** Who or what this page is for. */
  audience: string[];
  /** Cross-links to sibling developer pages. */
  related?: DeveloperResource[];
};

/** The API products SipLink actually offers — reused across pages. */
const apiProducts = [
  "Voice",
  "SMS",
  "WhatsApp Business",
  "WebRTC",
  "SIP",
] as const;

export const developerGroups: {
  slug: DeveloperGroupSlug;
  heading: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    slug: "documentation",
    heading: "Documentation",
    description: "Reference material for every API and integration surface.",
    icon: ScrollText,
  },
  {
    slug: "resources",
    heading: "Resources",
    description: "Working code, collections and examples to move faster.",
    icon: GitBranch,
  },
  {
    slug: "support",
    heading: "Support",
    description: "Sandbox, status and the operational detail you build against.",
    icon: ShieldCheck,
  },
];

export const developerDetails: DeveloperDetail[] = [
  // ---------------------------------------------------------- Documentation
  {
    slug: "api-docs",
    title: "API Documentation",
    group: "Documentation",
    groupSlug: "documentation",
    tagline: "Everything you need to integrate SipLink into your product.",
    intro:
      "The SipLink API documentation is the starting point for building voice, messaging and real-time communication into your own applications. It explains how the platform is organised, how requests are authenticated, and how each API product fits together — so you can go from a first test call to a production integration without reverse-engineering anything.",
    icon: BookOpen,
    sections: [
      {
        heading: "How the platform is organised",
        body: [
          "SipLink exposes a set of HTTP APIs alongside real-time SIP and WebRTC interfaces. The HTTP APIs follow REST conventions: resources are addressed by URL, actions map to standard HTTP verbs, and both requests and responses use JSON. If you have integrated a REST API before, the shape will feel familiar.",
          `The API surface is grouped by product — ${apiProducts.join(
            ", ",
          )} — and each group shares the same authentication, error format and pagination conventions. Learning one API teaches you most of what you need for the others.`,
        ],
      },
      {
        heading: "Authentication",
        body: [
          "Requests are authenticated with an API credential issued to your account. You send it on every request, over TLS, and keep it out of client-side code and source control. Credentials are scoped to your account and can be rotated without downtime, so a leaked key can be revoked and replaced.",
          "The snippet below is illustrative — it shows the general shape of an authenticated request rather than a guaranteed endpoint. Consult the live reference for the exact base URL, paths and field names for your account.",
        ],
        sample: {
          language: "cURL",
          code: `# Illustrative example — confirm exact paths in the API Reference.
curl https://api.example.siplink.in/v1/calls \\
  -H "Authorization: Bearer $SIPLINK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "+15550000000",
    "to": "+15551234567",
    "answer_url": "https://your-app.example.com/voice/answer"
  }'`,
        },
      },
      {
        heading: "Requests, responses and errors",
        body: [
          "Successful responses return a JSON object describing the resource you created or fetched, along with an identifier you can use in later calls. Errors return a consistent structure — an HTTP status code plus a machine-readable code and a human-readable message — so your integration can branch on the error programmatically rather than parsing prose.",
          "List endpoints are paginated, and long-running operations report progress through their resource state. Where an action produces events over time, such as the lifecycle of a call, those are delivered through webhooks rather than by polling.",
        ],
        points: [
          "Predictable HTTP status codes for success, client error and server error",
          "Machine-readable error codes alongside human-readable messages",
          "Cursor-based pagination on list endpoints",
          "Idempotency support on create operations to make retries safe",
        ],
      },
      {
        heading: "From first call to production",
        body: [
          "The recommended path is to authenticate in the sandbox, make a single test request, subscribe to the relevant webhooks, then move to live credentials once the flow behaves as you expect. Every product page in this documentation follows the same structure — overview, authentication, core operations, events — so you can navigate any API the same way.",
        ],
      },
    ],
    capabilities: [
      {
        title: "REST over JSON",
        description:
          "Predictable resources, standard verbs and JSON payloads across every API product.",
        icon: FileJson,
      },
      {
        title: "One auth model",
        description:
          "A single credential model, rotatable without downtime, shared across all APIs.",
        icon: KeyRound,
      },
      {
        title: "Consistent errors",
        description:
          "The same structured error format everywhere, so you handle failures once.",
        icon: Bug,
      },
      {
        title: "Event-driven",
        description:
          "Call and message lifecycle delivered through webhooks instead of polling.",
        icon: Webhook,
      },
    ],
    audience: [
      "Engineers integrating voice or messaging for the first time",
      "Teams evaluating the SipLink platform",
      "Developers moving a prototype toward production",
    ],
    related: [
      {
        label: "API Reference",
        description: "Every method, parameter and error in detail.",
        href: "/developers/api-reference",
        icon: Braces,
      },
      {
        label: "Sample Code",
        description: "Copy-paste starting points in several languages.",
        href: "/developers/sample-code",
        icon: Code,
      },
      {
        label: "Sandbox",
        description: "Test safely before switching to live credentials.",
        href: "/developers/sandbox",
        icon: FlaskConical,
      },
    ],
  },
  {
    slug: "sip-docs",
    title: "SIP Documentation",
    group: "Documentation",
    groupSlug: "documentation",
    tagline: "Trunk configuration, registration and SIP signalling.",
    intro:
      "The SIP documentation covers connecting your own equipment — an IP-PBX, session border controller or SIP-capable application — directly to the SipLink voice network. It explains the two common connection models, how calls are authenticated and routed, and the media and security options available so you can plan a deployment before you configure a single device.",
    icon: FileCode,
    sections: [
      {
        heading: "What SIP connectivity gives you",
        body: [
          "SIP (Session Initiation Protocol) is the signalling protocol that sets up, manages and tears down voice calls. Connecting over SIP lets your existing telephony equipment place and receive calls across the SipLink network without replacing hardware, and without going through the HTTP APIs.",
          "This is the right integration surface when you already run a PBX or SBC and want carrier connectivity underneath it, or when you are building a platform that speaks SIP natively and needs a route to the public telephone network.",
        ],
      },
      {
        heading: "Connection models",
        body: [
          "Two models are common. In IP authentication, your equipment connects from a known public address that is allow-listed on the trunk, and calls are trusted based on that address. In registration-based connectivity, your device registers with credentials and maintains a session, which suits equipment behind dynamic addressing.",
          "The right choice depends on your network. Static, well-defined edges usually favour IP authentication; mobile or dynamically-addressed endpoints usually favour registration. Both are supported, and a deployment can combine them across different sites.",
        ],
        points: [
          "IP authentication for fixed, allow-listed edges",
          "Registration-based connectivity for dynamic endpoints",
          "Inbound routing of numbers to your trunk or endpoints",
          "Outbound routing with number presentation you control",
        ],
      },
      {
        heading: "Signalling and media",
        body: [
          "Signalling carries the call setup; media carries the audio itself. SipLink supports encrypted signalling over TLS and encrypted media over SRTP where the deployment supports it, and negotiates common audio codecs so quality can be balanced against available bandwidth.",
          "The example below shows the general shape of the parameters you would exchange when configuring a trunk. Treat the values as placeholders — your account's provisioning details come from the portal or your onboarding engineer, not from this page.",
        ],
        sample: {
          language: "Trunk parameters (illustrative)",
          code: `; Example values only — use the details issued for your account.
[siplink-trunk]
type        = peer
transport   = tls            ; encrypted signalling
media       = srtp           ; encrypted media where supported
codecs      = opus, g722, ulaw
auth        = ip | register  ; choose per site
outbound_proxy = sbc.example.siplink.in`,
        },
      },
      {
        heading: "Planning a deployment",
        body: [
          "Before configuring devices, map out your number ranges, expected concurrent call volume, redundancy requirements and which sites use which connection model. SipLink trunks are provisioned around those inputs, with failover and least-cost routing available where the deployment supports it. Your onboarding engineer confirms the exact addresses, ports and credentials for your account.",
        ],
      },
    ],
    capabilities: [
      {
        title: "IP and registration auth",
        description:
          "Connect fixed edges by allow-listed address or dynamic endpoints by registration.",
        icon: KeyRound,
      },
      {
        title: "Encrypted transport",
        description:
          "TLS signalling and SRTP media where the deployment supports it.",
        icon: Lock,
      },
      {
        title: "Codec negotiation",
        description:
          "Common audio codecs negotiated to balance quality against bandwidth.",
        icon: Cpu,
      },
      {
        title: "Inbound and outbound routing",
        description:
          "Route numbers to your trunk and control presentation on outbound calls.",
        icon: GitBranch,
      },
    ],
    audience: [
      "Teams connecting an existing IP-PBX or SBC",
      "Platforms that speak SIP natively",
      "Multi-site organisations planning trunk redundancy",
    ],
    related: [
      {
        label: "SIP API",
        description: "Provision and manage trunks programmatically.",
        href: "/products/sip-api",
        icon: Network,
      },
      {
        label: "SIP Trunking",
        description: "The managed trunking product this connects to.",
        href: "/products/sip-trunking",
        icon: Network,
      },
      {
        label: "Rate Limits",
        description: "Concurrency and throughput conventions to plan around.",
        href: "/developers/rate-limits",
        icon: Gauge,
      },
    ],
  },
  {
    slug: "sdks",
    title: "SDK Downloads",
    group: "Documentation",
    groupSlug: "documentation",
    tagline: "Client libraries that wrap the API for your stack.",
    intro:
      "The SipLink SDKs wrap the HTTP APIs and real-time interfaces in idiomatic client libraries, so you work with typed methods and objects in your own language instead of assembling HTTP requests by hand. They handle authentication, retries, pagination and webhook verification for you, which removes a large amount of boilerplate from an integration.",
    icon: Download,
    sections: [
      {
        heading: "What an SDK does for you",
        body: [
          "An SDK is a thin, well-tested layer over the same API you could call directly. It turns endpoints into methods, JSON into objects your editor can autocomplete, and error responses into exceptions or typed results you can catch. It also centralises the fiddly parts of a robust integration — signing requests, retrying safely, verifying webhook signatures — so every call site does not reimplement them.",
          "Because the SDKs are generated and maintained against the same specification as the reference, their surface stays aligned with the API. Anything you can do with a raw HTTP request, you can do through the SDK.",
        ],
      },
      {
        heading: "Server-side and client-side",
        body: [
          "Server-side SDKs are used from your backend, where your API credential lives. They are the right place for placing calls, sending messages, managing numbers and handling webhooks. Client-side SDKs — for the browser and for mobile — are used for real-time features such as WebRTC calling, and they authenticate with short-lived tokens your server issues rather than with your long-lived API credential.",
          "Keeping the two apart is the single most important security practice when integrating: your long-lived credential never reaches a browser or a mobile app.",
        ],
        points: [
          "Server SDKs for backend logic: calls, messaging, numbers, webhooks",
          "Browser and mobile SDKs for real-time WebRTC calling",
          "Short-lived tokens issued server-side for client use",
          "Built-in retries, pagination and webhook signature verification",
        ],
      },
      {
        heading: "Installing an SDK",
        body: [
          "SDKs are distributed through the standard package manager for each ecosystem, so installation is a single command. The snippet below is illustrative of the general approach; the developer portal lists the exact package names and supported versions for each library.",
        ],
        sample: {
          language: "Install (illustrative)",
          code: `# Node.js
npm install @siplink/sdk

# Python
pip install siplink

# Names and versions are listed in the developer portal.`,
        },
      },
    ],
    capabilities: [
      {
        title: "Idiomatic clients",
        description:
          "Typed methods and objects in your language, not hand-built HTTP calls.",
        icon: Code2,
      },
      {
        title: "Server and client",
        description:
          "Backend SDKs for logic, browser and mobile SDKs for real-time calling.",
        icon: MonitorSmartphone,
      },
      {
        title: "Robust by default",
        description:
          "Retries, pagination and webhook verification handled for you.",
        icon: RefreshCw,
      },
      {
        title: "Package-manager install",
        description:
          "Distributed through the standard registry for each ecosystem.",
        icon: Boxes,
      },
    ],
    audience: [
      "Backend teams who prefer a typed client over raw HTTP",
      "Front-end and mobile teams adding WebRTC calling",
      "Anyone wanting fewer moving parts in an integration",
    ],
    related: [
      {
        label: "Sample Code",
        description: "See the SDKs used in short, focused snippets.",
        href: "/developers/sample-code",
        icon: Code,
      },
      {
        label: "GitHub Examples",
        description: "Full demo apps built on the SDKs.",
        href: "/developers/github-examples",
        icon: GitBranch,
      },
      {
        label: "WebRTC SDK",
        description: "The product behind browser and mobile calling.",
        href: "/products/webrtc-sdk",
        icon: MonitorSmartphone,
      },
    ],
  },
  {
    slug: "webhooks",
    title: "Webhooks",
    group: "Documentation",
    groupSlug: "documentation",
    tagline: "Receive real-time events as they happen.",
    intro:
      "Webhooks let SipLink notify your application the moment something happens — a call is answered, a message is delivered, a recording is ready — by sending an HTTP request to a URL you control. Instead of repeatedly polling the API to ask whether anything changed, your systems react to events as they occur.",
    icon: Webhook,
    sections: [
      {
        heading: "How webhooks work",
        body: [
          "You register one or more endpoint URLs and choose which events you want delivered. When a matching event occurs, SipLink sends an HTTP POST to your URL with a JSON body describing what happened. Your endpoint does its work and returns a success status; if it cannot be reached or returns an error, delivery is retried according to a backoff schedule.",
          "This event-driven model is how the platform reports anything that unfolds over time. The lifecycle of a call — ringing, answered, completed — and the delivery status of a message are surfaced as events rather than as something you have to ask for.",
        ],
        sample: {
          language: "Webhook payload (illustrative)",
          code: `POST /siplink/events  (to your endpoint)
Content-Type: application/json

{
  "type": "call.completed",
  "id": "evt_example_123",
  "occurred_at": "2026-01-01T12:00:00Z",
  "data": {
    "call_id": "call_example_456",
    "from": "+15550000000",
    "to": "+15551234567",
    "duration_seconds": 42
  }
}
// Shape is illustrative — see the API Reference for exact fields.`,
        },
      },
      {
        heading: "Verifying that a request is genuine",
        body: [
          "Because a webhook endpoint is a public URL, you must confirm each request really came from SipLink. Deliveries are signed, and your endpoint verifies the signature before trusting the payload. The SDKs include a helper for this so you do not implement the cryptography yourself.",
          "Verify first, then act. An unverified request should be rejected without side effects.",
        ],
        points: [
          "Every delivery is signed so you can verify its origin",
          "SDK helpers verify signatures for you",
          "Reject unverified requests before doing any work",
        ],
      },
      {
        heading: "Building a reliable receiver",
        body: [
          "Two practices make a webhook receiver dependable. First, respond quickly: acknowledge the event, then do slower work asynchronously, so a slow job does not cause a timeout and a retry. Second, handle events idempotently: because retries mean the same event can arrive more than once, key your processing on the event identifier so a duplicate is a no-op.",
          "Following those two rules turns webhooks from a source of edge-case bugs into a dependable backbone for automation.",
        ],
      },
    ],
    capabilities: [
      {
        title: "Push, not poll",
        description:
          "React to events the moment they happen instead of polling the API.",
        icon: Send,
      },
      {
        title: "Signed deliveries",
        description:
          "Verify each request came from SipLink before you trust it.",
        icon: ShieldCheck,
      },
      {
        title: "Automatic retries",
        description:
          "Failed deliveries are retried on a backoff schedule until acknowledged.",
        icon: RefreshCw,
      },
      {
        title: "Full lifecycle",
        description:
          "Call and message state changes surfaced as discrete events.",
        icon: Activity,
      },
    ],
    audience: [
      "Teams automating workflows off call or message events",
      "Applications that update state in real time",
      "Anyone replacing polling with event-driven design",
    ],
    related: [
      {
        label: "API Reference",
        description: "The catalogue of event types and their payloads.",
        href: "/developers/api-reference",
        icon: Braces,
      },
      {
        label: "Sample Code",
        description: "Webhook receivers you can start from.",
        href: "/developers/sample-code",
        icon: Code,
      },
      {
        label: "Sandbox",
        description: "Trigger test events without live traffic.",
        href: "/developers/sandbox",
        icon: FlaskConical,
      },
    ],
  },

  // ------------------------------------------------------------- Resources
  {
    slug: "api-reference",
    title: "API Reference",
    group: "Resources",
    groupSlug: "resources",
    tagline: "Every endpoint, parameter, response and error.",
    intro:
      "Where the documentation explains concepts, the API Reference is the exhaustive catalogue: every operation across the Voice, SMS, WhatsApp, WebRTC and SIP APIs, with its parameters, its response shape, and the errors it can return. It is the page you keep open while you build.",
    icon: Braces,
    sections: [
      {
        heading: "How the reference is organised",
        body: [
          "The reference is grouped by product and then by resource. Under each resource you will find its operations — create, retrieve, list, update, delete where they apply — and for each operation the full set of parameters, the exact response fields, and the specific errors it can raise.",
          "Because every API shares the same authentication, pagination and error conventions, the reference reads consistently from one product to the next. Learn the layout once and every API is navigable.",
        ],
      },
      {
        heading: "Reading an operation",
        body: [
          "Each operation lists its parameters with their type, whether they are required, and what they mean. Responses are documented field by field. Error sections tell you which status codes and error codes a call can produce, so you can write handling for the cases that actually occur rather than guessing.",
          "The example below shows the general form of a documented operation — the real reference details the precise paths and fields for your account.",
        ],
        sample: {
          language: "Reference entry (illustrative)",
          code: `POST /v1/messages          Send a message

Parameters
  from   string  required   Sender number or ID
  to     string  required   Destination number
  body   string  required   Message text

Returns
  A message object with a server-assigned id and status.

Errors
  400 invalid_parameter   A required field is missing or malformed
  401 unauthorized        Credential missing or invalid
  429 rate_limited        Too many requests; retry after a delay`,
        },
      },
      {
        heading: "Errors and status codes",
        body: [
          "Every error carries an HTTP status code and a stable, machine-readable code. Build your integration to branch on the code, not on the message text, which may be refined over time. The reference documents which errors each operation can return so you are never surprised in production.",
        ],
        points: [
          "Stable, machine-readable error codes for every failure",
          "Documented per operation, not just globally",
          "Guidance on which errors are retryable",
        ],
      },
    ],
    capabilities: [
      {
        title: "Complete coverage",
        description:
          "Every operation across all five API products in one place.",
        icon: ListChecks,
      },
      {
        title: "Parameter detail",
        description:
          "Types, requiredness and meaning for every field you send.",
        icon: FileJson,
      },
      {
        title: "Documented errors",
        description:
          "The exact errors each operation can return, with retry guidance.",
        icon: Bug,
      },
      {
        title: "Consistent layout",
        description:
          "The same structure across products, so it stays navigable.",
        icon: Layers,
      },
    ],
    audience: [
      "Developers actively building against the API",
      "Anyone debugging an unexpected response",
      "Teams writing precise error handling",
    ],
    related: [
      {
        label: "API Documentation",
        description: "The conceptual companion to the reference.",
        href: "/developers/api-docs",
        icon: BookOpen,
      },
      {
        label: "Postman Collection",
        description: "Try the reference operations interactively.",
        href: "/developers/postman",
        icon: Send,
      },
      {
        label: "Rate Limits",
        description: "Understand the 429 responses you may see.",
        href: "/developers/rate-limits",
        icon: Gauge,
      },
    ],
  },
  {
    slug: "sample-code",
    title: "Sample Code",
    group: "Resources",
    groupSlug: "resources",
    tagline: "Short, focused snippets for common tasks.",
    intro:
      "Sample code takes you from reading about the API to running it. These are small, self-contained snippets for the tasks developers reach for most often — placing a call, sending a message, receiving a webhook — written to be copied into your own project and adapted, rather than studied as complete applications.",
    icon: Code,
    sections: [
      {
        heading: "What the samples cover",
        body: [
          "The samples map onto the things most integrations do first: authenticate, place an outbound call, send an SMS or WhatsApp message, and stand up a webhook receiver. Each is deliberately minimal, so the mechanics are visible and there is nothing to untangle before you can adapt it.",
          "They are available in more than one language, so you can start in the stack you already work in. All of them are illustrative — the exact endpoint paths and field names come from the API Reference for your account.",
        ],
      },
      {
        heading: "Placing a call",
        body: [
          "A minimal outbound-call example authenticates with your credential and asks the platform to connect two numbers. The response includes an identifier you can use to follow the call, and the call's progress arrives as webhook events.",
        ],
        sample: {
          language: "Node.js (illustrative)",
          code: `import { SipLink } from "@siplink/sdk";

const client = new SipLink({ apiKey: process.env.SIPLINK_API_KEY });

// Illustrative — confirm method and field names in the reference.
const call = await client.calls.create({
  from: "+15550000000",
  to: "+15551234567",
  answerUrl: "https://your-app.example.com/voice/answer",
});

console.log("Started call:", call.id);`,
        },
      },
      {
        heading: "Sending a message",
        body: [
          "Sending an SMS or WhatsApp message follows the same pattern: one authenticated call with a sender, a destination and a body. Delivery status arrives later as a webhook event, so you can update your own records when the message is confirmed.",
        ],
        sample: {
          language: "Python (illustrative)",
          code: `from siplink import SipLink

client = SipLink(api_key=os.environ["SIPLINK_API_KEY"])

# Illustrative — confirm method and field names in the reference.
message = client.messages.create(
    from_="+15550000000",
    to="+15551234567",
    body="Your appointment is confirmed.",
)

print("Sent message:", message.id)`,
        },
      },
      {
        heading: "Using the samples safely",
        body: [
          "Run samples against the sandbox first, keep your credential in an environment variable rather than in the code, and verify webhook signatures before acting on a received event. With those three habits, a snippet you copied is safe to build on.",
        ],
      },
    ],
    capabilities: [
      {
        title: "Task-focused",
        description:
          "Small snippets for the operations integrations reach for first.",
        icon: Terminal,
      },
      {
        title: "Multiple languages",
        description:
          "Start in the stack you already work in.",
        icon: Code2,
      },
      {
        title: "Copy and adapt",
        description:
          "Written to be pasted into your project, not just read.",
        icon: FileCode,
      },
      {
        title: "Sandbox-ready",
        description:
          "Designed to run against the sandbox before you go live.",
        icon: FlaskConical,
      },
    ],
    audience: [
      "Developers making their first request",
      "Teams prototyping a new communication feature",
      "Anyone who learns fastest from working code",
    ],
    related: [
      {
        label: "SDK Downloads",
        description: "The libraries the samples are built on.",
        href: "/developers/sdks",
        icon: Download,
      },
      {
        label: "GitHub Examples",
        description: "Full applications, not just snippets.",
        href: "/developers/github-examples",
        icon: GitBranch,
      },
      {
        label: "Postman Collection",
        description: "Run the same operations without writing code.",
        href: "/developers/postman",
        icon: Send,
      },
    ],
  },
  {
    slug: "postman",
    title: "Postman Collection",
    group: "Resources",
    groupSlug: "resources",
    tagline: "Explore the API without writing any code.",
    intro:
      "The Postman collection lets you exercise the SipLink API interactively. Import it, add your credential once, and every request is ready to send — so you can see real responses, confirm your account is set up correctly, and understand an operation before you write a single line of integration code.",
    icon: Send,
    sections: [
      {
        heading: "Why start in Postman",
        body: [
          "Postman is a widely-used tool for sending HTTP requests and inspecting the responses. A published collection is a curated set of those requests, pre-filled and organised by product, so exploring the API becomes a matter of clicking send rather than assembling requests by hand.",
          "It is the fastest way to answer two questions early: is my credential working, and what does this operation actually return? Answering both before you write code saves a great deal of guesswork.",
        ],
      },
      {
        heading: "Getting set up",
        body: [
          "Import the collection into Postman, then set your credential and base URL as environment variables so they apply to every request without being pasted into each one. From there, each request in the collection is ready to send and its example response is visible for reference.",
          "The variables below are illustrative of the general setup; the developer portal provides the collection and the exact variable names to use.",
        ],
        sample: {
          language: "Environment variables (illustrative)",
          code: `{
  "base_url": "https://api.example.siplink.in/v1",
  "api_key": "{{your account credential}}"
}
// Set once in the Postman environment; every request reuses them.`,
        },
      },
      {
        heading: "From Postman to code",
        body: [
          "Once a request works in Postman, Postman can generate the equivalent code in your language, which gives you a correct starting point for your integration. The natural path is: confirm the request in Postman, generate the snippet, then move it into an SDK-based implementation for production.",
        ],
        points: [
          "Pre-built requests grouped by API product",
          "Set your credential once as an environment variable",
          "Inspect real responses before writing code",
          "Generate starter code in your language from any request",
        ],
      },
    ],
    capabilities: [
      {
        title: "No code to start",
        description:
          "Send real requests and read real responses from a UI.",
        icon: Play,
      },
      {
        title: "Pre-built requests",
        description:
          "Every operation, organised by product and ready to send.",
        icon: ListChecks,
      },
      {
        title: "One-time setup",
        description:
          "Credential and base URL set once as environment variables.",
        icon: KeyRound,
      },
      {
        title: "Code generation",
        description:
          "Turn a working request into a starter snippet in your language.",
        icon: Code2,
      },
    ],
    audience: [
      "Developers evaluating the API before committing code",
      "QA and support engineers reproducing behaviour",
      "Anyone confirming an account is configured correctly",
    ],
    related: [
      {
        label: "API Reference",
        description: "The full detail behind each request.",
        href: "/developers/api-reference",
        icon: Braces,
      },
      {
        label: "Sample Code",
        description: "The next step once a request works.",
        href: "/developers/sample-code",
        icon: Code,
      },
      {
        label: "Sandbox",
        description: "Point the collection at a safe test environment.",
        href: "/developers/sandbox",
        icon: FlaskConical,
      },
    ],
  },
  {
    slug: "github-examples",
    title: "GitHub Examples",
    group: "Resources",
    groupSlug: "resources",
    tagline: "Full, working demo applications you can clone.",
    intro:
      "Where sample code shows a single operation, the GitHub examples are complete applications you can clone, run and read end to end — a working call flow, a messaging integration, a browser-based softphone. They are the reference for how the pieces fit together in a real project, not just how one call is made.",
    icon: GitBranch,
    sections: [
      {
        heading: "What a full example gives you",
        body: [
          "A snippet shows one operation in isolation; a full example shows the surrounding structure — how the server stores its credential, how it exposes a webhook endpoint, how a browser client obtains a short-lived token, how state moves through the system. That surrounding structure is usually where the real questions live.",
          "Each example is a runnable project with a README that explains what it does, what it needs, and how to run it, so you can have it working locally and then read the parts that matter to you.",
        ],
      },
      {
        heading: "Typical examples",
        body: [
          "The examples cover the patterns most integrations need: an outbound call flow with a webhook receiver, a two-way messaging integration, and a browser softphone built on the WebRTC SDK with a small server that issues client tokens. Each demonstrates the security practices the documentation recommends rather than cutting corners for brevity.",
        ],
        points: [
          "Outbound call flow with a webhook receiver",
          "Two-way SMS or WhatsApp messaging integration",
          "Browser softphone on the WebRTC SDK with server-issued tokens",
          "Correct credential handling and signature verification throughout",
        ],
      },
      {
        heading: "Running an example",
        body: [
          "Clone the repository, install its dependencies, provide your sandbox credential through the environment, and run it. The illustrative commands below show the general shape; each project's README gives the exact steps and the variables it expects.",
        ],
        sample: {
          language: "Getting started (illustrative)",
          code: `git clone https://github.com/siplink/examples
cd examples/voice-call-flow
cp .env.example .env      # add your sandbox credential
npm install
npm run dev
# Follow the project README for exact steps.`,
        },
      },
    ],
    capabilities: [
      {
        title: "End-to-end",
        description:
          "Complete projects that show how the pieces connect.",
        icon: Blocks,
      },
      {
        title: "Clone and run",
        description:
          "Each example runs locally with a README to guide you.",
        icon: Container,
      },
      {
        title: "Good practices built in",
        description:
          "Credential handling and signature verification done properly.",
        icon: ShieldCheck,
      },
      {
        title: "Real patterns",
        description:
          "Call flows, messaging and browser calling as you would build them.",
        icon: Workflow,
      },
    ],
    audience: [
      "Developers who want a working starting point",
      "Teams designing the shape of an integration",
      "Anyone learning how the APIs combine in practice",
    ],
    related: [
      {
        label: "SDK Downloads",
        description: "The libraries the examples depend on.",
        href: "/developers/sdks",
        icon: Download,
      },
      {
        label: "Sample Code",
        description: "The single-operation counterpart.",
        href: "/developers/sample-code",
        icon: Code,
      },
      {
        label: "Webhooks",
        description: "How the example receivers get their events.",
        href: "/developers/webhooks",
        icon: Webhook,
      },
    ],
  },

  // --------------------------------------------------------------- Support
  {
    slug: "sandbox",
    title: "Sandbox",
    group: "Support",
    groupSlug: "support",
    tagline: "Build and test safely before you go live.",
    intro:
      "The sandbox is an isolated environment for developing and testing your integration without touching live traffic, real numbers or production data. You build against it with separate credentials, exercise every path including the error paths, and switch to live credentials only when the flow behaves exactly as you expect.",
    icon: FlaskConical,
    sections: [
      {
        heading: "What the sandbox is for",
        body: [
          "A communications integration touches the real world — it can place calls and send messages to real people. The sandbox exists so you can develop confidently without that risk. It mirrors the shape of the live API, so code written against it works against production, but it does not connect your test runs to live traffic.",
          "This is where you make your first request, iterate on your webhook receiver, and confirm your error handling, all without consequences.",
        ],
      },
      {
        heading: "How it differs from live",
        body: [
          "The sandbox uses its own credentials, kept entirely separate from your live credentials, so there is no way to accidentally send production traffic while testing. It lets you simulate the events your integration must handle — including failures and edge cases that are hard to reproduce on demand in production — so you can prove your handling works before it matters.",
          "Because the request and response shapes match live, moving from sandbox to production is a matter of swapping credentials and pointing at the live base URL, not rewriting code.",
        ],
        points: [
          "Separate sandbox credentials, isolated from live",
          "No connection to live traffic or real billing",
          "Simulate success, failure and edge-case events",
          "Identical request and response shapes to production",
        ],
      },
      {
        heading: "A recommended workflow",
        body: [
          "Authenticate in the sandbox, make one test request, register your webhook endpoint and confirm you receive and verify events, then walk through the failure cases your integration needs to survive. When everything behaves, switch the credential and base URL to live. Keeping that discipline means going live is uneventful, which is exactly what you want.",
        ],
      },
    ],
    capabilities: [
      {
        title: "Isolated environment",
        description:
          "Develop and test with no effect on live traffic or billing.",
        icon: FlaskConical,
      },
      {
        title: "Separate credentials",
        description:
          "Sandbox keys are distinct from live, so mistakes stay contained.",
        icon: KeyRound,
      },
      {
        title: "Simulate events",
        description:
          "Reproduce successes, failures and edge cases on demand.",
        icon: Repeat,
      },
      {
        title: "Parity with live",
        description:
          "Matching shapes mean going live is a credential swap.",
        icon: ArrowLeftRight,
      },
    ],
    audience: [
      "Every developer building a new integration",
      "Teams validating error handling before launch",
      "QA reproducing scenarios without live impact",
    ],
    related: [
      {
        label: "API Documentation",
        description: "Start here, then test in the sandbox.",
        href: "/developers/api-docs",
        icon: BookOpen,
      },
      {
        label: "Webhooks",
        description: "Test event delivery against your endpoint.",
        href: "/developers/webhooks",
        icon: Webhook,
      },
      {
        label: "API Status",
        description: "Check platform health as you test.",
        href: "/developers/status",
        icon: Activity,
      },
    ],
  },
  {
    slug: "status",
    title: "API Status",
    group: "Support",
    groupSlug: "support",
    tagline: "Live visibility into platform availability.",
    intro:
      "The status page reports the current operational state of the SipLink platform — the APIs, voice, messaging and supporting services — so you can tell at a glance whether an issue you are seeing is on your side or ours. It is the first place to look when something behaves unexpectedly, and the place to watch during an incident.",
    icon: Activity,
    sections: [
      {
        heading: "What the status page shows",
        body: [
          "The page lists the platform's components and their current state, so a degradation or outage is visible rather than something you have to infer. When an incident is in progress, it is posted with updates as the situation develops and a note when it is resolved, giving you a single, authoritative source instead of guesswork.",
          "Checking status first saves time: if a component is reported as degraded, you know to wait or adjust rather than debugging your own code.",
        ],
      },
      {
        heading: "During an incident",
        body: [
          "If you hit unexpected errors, check the status page before anything else. An active incident there explains the behaviour and tells you what to expect; the absence of one points the investigation back toward your integration, your network or your configuration. Either way you have narrowed the problem quickly.",
        ],
        points: [
          "Current state of APIs, voice and messaging components",
          "Incidents posted with ongoing updates",
          "A clear signal of whether an issue is platform-side",
        ],
      },
      {
        heading: "Designing for resilience",
        body: [
          "Well-built integrations do not depend on a perfect platform at every instant. Retrying transient errors with sensible backoff, handling the documented error codes, and queuing work that can wait all mean a brief degradation is absorbed rather than passed on to your users. The status page then becomes context for what your own resilience is already handling.",
        ],
      },
    ],
    capabilities: [
      {
        title: "Component state",
        description:
          "Current health of each part of the platform, at a glance.",
        icon: Activity,
      },
      {
        title: "Incident updates",
        description:
          "Active issues posted and updated through to resolution.",
        icon: ScrollText,
      },
      {
        title: "Faster triage",
        description:
          "Tell platform-side issues from your own in seconds.",
        icon: Wrench,
      },
      {
        title: "Resilience context",
        description:
          "Pairs with retries and backoff to absorb transient issues.",
        icon: RefreshCw,
      },
    ],
    audience: [
      "On-call engineers triaging an unexpected error",
      "Teams monitoring a live integration",
      "Anyone confirming whether an issue is platform-side",
    ],
    related: [
      {
        label: "Rate Limits",
        description: "Distinguish throttling from an incident.",
        href: "/developers/rate-limits",
        icon: Gauge,
      },
      {
        label: "Webhooks",
        description: "How retries handle transient failures.",
        href: "/developers/webhooks",
        icon: Webhook,
      },
      {
        label: "Sandbox",
        description: "Reproduce behaviour away from live traffic.",
        href: "/developers/sandbox",
        icon: FlaskConical,
      },
    ],
  },
  {
    slug: "rate-limits",
    title: "Rate Limits",
    group: "Support",
    groupSlug: "support",
    tagline: "How quotas and throttling work, and how to build for them.",
    intro:
      "Rate limits protect the platform's stability and ensure fair use across all accounts. They cap how many requests you can make in a window, and how much concurrent activity you can run. This page explains how limits behave and — more usefully — how to design an integration that stays comfortably within them. Specific limits are documented per plan; your account's figures live in the developer portal, not on this page.",
    icon: Gauge,
    sections: [
      {
        heading: "Why limits exist",
        body: [
          "A shared platform has to prevent any single account, whether through a bug or a burst of legitimate demand, from degrading service for everyone else. Rate limits are how that fairness and stability are enforced. They are not an obstacle so much as a contract: stay within the envelope and the platform behaves predictably for you and for everyone else.",
          "The exact figures depend on your plan and the API in question, and are published in the developer portal for your account. This page deliberately does not state numbers, because the right ones for you are the ones tied to your plan.",
        ],
      },
      {
        heading: "How throttling behaves",
        body: [
          "When you exceed a limit, the API responds with a specific status code — HTTP 429, meaning too many requests — rather than failing silently or processing the request anyway. Responses also carry headers that describe your current usage against the limit, so a well-behaved client can see how close it is and slow down before it is throttled.",
          "The correct response to a 429 is to wait and retry, ideally guided by the retry information the response provides.",
        ],
        sample: {
          language: "Throttled response (illustrative)",
          code: `HTTP/1.1 429 Too Many Requests
Retry-After: 2

{
  "error": {
    "code": "rate_limited",
    "message": "Too many requests. Retry after the indicated delay."
  }
}
// Header names and exact behaviour are documented per plan.`,
        },
      },
      {
        heading: "Building to stay within limits",
        body: [
          "A few patterns keep you clear of the limits. Retry throttled requests with exponential backoff rather than immediately, so you do not compound the problem. Smooth out bursts by queuing work instead of firing it all at once. Watch the usage headers and back off proactively. And prefer webhooks over polling — reacting to events removes a whole category of repetitive requests that would otherwise count against your limit.",
        ],
        points: [
          "Retry 429s with exponential backoff, not immediately",
          "Queue and pace bursts instead of sending all at once",
          "Read usage headers and slow down before you are throttled",
          "Use webhooks instead of polling to cut request volume",
        ],
      },
    ],
    capabilities: [
      {
        title: "Fair and stable",
        description:
          "Limits keep the platform predictable for every account.",
        icon: ShieldCheck,
      },
      {
        title: "Clear signalling",
        description:
          "A 429 status and usage headers tell you exactly where you stand.",
        icon: Gauge,
      },
      {
        title: "Retry guidance",
        description:
          "Responses indicate when to try again, so retries are informed.",
        icon: TimerReset,
      },
      {
        title: "Documented per plan",
        description:
          "Your account's figures live in the developer portal.",
        icon: ScrollText,
      },
    ],
    audience: [
      "Developers designing for scale from the start",
      "Teams whose traffic is bursty or campaign-driven",
      "Anyone handling a 429 for the first time",
    ],
    related: [
      {
        label: "API Reference",
        description: "Where the 429 error is documented per operation.",
        href: "/developers/api-reference",
        icon: Braces,
      },
      {
        label: "Webhooks",
        description: "Cut request volume by reacting to events.",
        href: "/developers/webhooks",
        icon: Webhook,
      },
      {
        label: "API Status",
        description: "Rule out an incident when requests slow down.",
        href: "/developers/status",
        icon: Activity,
      },
    ],
  },
];

export function getDeveloperDetail(slug: string) {
  return developerDetails.find((detail) => detail.slug === slug);
}

/** The API products the developer portal is built around. */
export const developerApiProducts: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Voice API",
    description:
      "Place and receive calls, connect customers to agents and automate call flows from code.",
    href: "/products/voice-api",
    icon: PhoneCall,
  },
  {
    title: "SMS API",
    description:
      "Send notifications, alerts, reminders and verification messages from your systems.",
    href: "/products/sms-api",
    icon: MessagesSquare,
  },
  {
    title: "WhatsApp Business API",
    description:
      "Reach customers on a channel they already use, integrated with your workflows.",
    href: "/products/whatsapp-api",
    icon: MessageCircle,
  },
  {
    title: "WebRTC SDK",
    description:
      "Add browser and mobile calling with nothing for your customers to install.",
    href: "/products/webrtc-sdk",
    icon: MonitorSmartphone,
  },
  {
    title: "SIP API",
    description:
      "Provision trunks and integrate SIP-based voice with full architectural control.",
    href: "/products/sip-api",
    icon: Network,
  },
];

/** The three-step path the portal frames for a new integration. */
export const developerJourney: {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    step: "01",
    title: "Read and explore",
    description:
      "Start in the documentation, then exercise the API interactively in Postman to see real responses.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Build in the sandbox",
    description:
      "Use an SDK and sample code against the sandbox, wiring up webhooks and testing every path — including failures.",
    icon: FlaskConical,
  },
  {
    step: "03",
    title: "Go live",
    description:
      "Swap sandbox credentials for live ones, keep an eye on status, and design around the documented rate limits.",
    icon: ServerCog,
  },
];
