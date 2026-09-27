import { VoiceProductScene } from "@/components/site/product-scenes-voice";
import { CallingProductScene } from "@/components/site/product-scenes-calling";
import { PlatformProductScene } from "@/components/site/product-scenes-platform";
import { SipProductScene } from "@/components/site/product-scenes-sip";
import type { ProductDetail } from "@/lib/products";

const stories: Record<string, { title: string; body: string; family: "voice" | "calling" | "platform" | "sip" }> = {
  "sip-trunking": { title: "The same PBX. A different way out.", body: "Follow a call from your existing phone system, through the SIP connection, to the people your business needs to reach.", family: "sip" },
  "cloud-pbx": { title: "Your workspace travels with your team.", body: "A shared phone system connects desk, browser and mobile conversations without tying the team to one office.", family: "voice" },
  "hosted-pbx": { title: "Your calls, with the platform looked after.", body: "See the managed service behind your office phones and branch connections.", family: "voice" },
  "ip-pbx": { title: "Inside your office phone network.", body: "Local extensions meet an on-site system, with a separate path for calls outside your premises.", family: "voice" },
  "did-numbers": { title: "Every direct number has a destination.", body: "A number directory makes the relationship between a published line and the person or department behind it clear.", family: "voice" },
  "toll-free-numbers": { title: "One front door for your customers.", body: "An incoming business number leads into the call handling and teams you choose.", family: "voice" },
  "virtual-numbers": { title: "A presence here. A team anywhere.", body: "Your published number and the place your calls are answered do not have to share an address.", family: "voice" },
  "number-porting": { title: "A service move your callers do not have to learn.", body: "Number details, a coordinated transfer and cutover checks keep the familiar number at the centre of the move.", family: "voice" },
  "call-center": { title: "A whole operation around each conversation.", body: "Agent handling, waiting callers and supervisor visibility come together in one contact-centre story.", family: "calling" },
  "predictive-dialer": { title: "Dialling that works around agent availability.", body: "A campaign coordinates call attempts and available people so answered conversations can move to the team.", family: "calling" },
  "auto-dialer": { title: "From a contact list to a calling workflow.", body: "Prepare the campaign, work through the list and review outcomes without dialling each number by hand.", family: "calling" },
  ivr: { title: "A caller's choice becomes a clear route.", body: "A greeting, a menu and your routing rules take the caller to the destination that matches their request.", family: "calling" },
  "call-recording": { title: "Return to the details of a conversation.", body: "The recording library, audio review and access policy show how call records support quality and training.", family: "calling" },
  "call-analytics": { title: "See the shape of your calling activity.", body: "Traffic, team performance and call outcomes give operations a clearer view of what is happening.", family: "calling" },
  "call-queue": { title: "Give waiting callers a way forward.", body: "The waiting experience and agent availability work together to organise how the next call is handled.", family: "calling" },
  "ai-voice-assistant": { title: "A conversation with a workflow behind it.", body: "A spoken request leads to a response, a defined business action or a handoff to a person.", family: "calling" },
  "voice-api": { title: "A voice conversation starts in your code.", body: "Your application initiates the calling workflow and receives the events it needs to keep the experience connected.", family: "platform" },
  "sms-api": { title: "Application events become useful messages.", body: "Message content and recipients flow from your software to the customer's handset, with delivery feedback alongside.", family: "platform" },
  "whatsapp-api": { title: "Business messaging meets customer conversation.", body: "Connect approved message workflows and customer replies to the applications your team works in.", family: "platform" },
  "webrtc-sdk": { title: "The conversation stays inside your application.", body: "A browser calling experience brings the customer, call controls and your interface together.", family: "platform" },
  "sip-api": { title: "SIP connections under application control.", body: "A configuration workflow links your software, SIP sessions and voice infrastructure.", family: "platform" },
  "teams-calling": { title: "Business calls beside the work in Teams.", body: "Calling sits alongside your collaboration workspace, with a route out to customers and external contacts.", family: "platform" },
  sbc: { title: "A controlled boundary for your voice network.", body: "The session border controller sits between the internal voice environment and provider connectivity.", family: "platform" },
  "crm-integration": { title: "The caller and the customer record, together.", body: "Contact context, a business call and the activity timeline give the team a joined-up view of the relationship.", family: "platform" },
};

export function ProductConnectionDiagram({ product, embedded = false }: { product: ProductDetail; embedded?: boolean }) {
  const story = stories[product.slug];
  if (!story) throw new Error(`Missing product scene for ${product.slug}`);
  const scene = story.family === "sip" ? <SipProductScene /> : story.family === "voice" ? <VoiceProductScene slug={product.slug} /> : story.family === "calling" ? <CallingProductScene slug={product.slug} /> : <PlatformProductScene slug={product.slug} />;
  const illustration = <figure className="mx-auto max-w-6xl"><div className="overflow-hidden">{scene}</div><figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">Illustrative product experience, not a live account or an exact software screenshot. Sample contacts, activity and interface details are for demonstration.</figcaption></figure>;
  if (embedded) return illustration;
  return <section aria-labelledby={`${product.slug}-connection-heading`} className="border-b border-border"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20"><div className="mb-8 max-w-2xl"><h2 id={`${product.slug}-connection-heading`} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{story.title}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{story.body}</p></div>{illustration}</div></section>;
}
