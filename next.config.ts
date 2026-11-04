import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Keep defaults for ordinary images, 90 for UI mocks, and 95 for the
    // large product artwork so glass edges and fine ridges retain detail.
    qualities: [75, 90, 95],
    // Some networks resolve cdn.sanity.io to a NAT64 address, which the
    // optimizer refuses as private ("resolved to private IP"). Local only.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      // YouTube thumbnail for the explainer video facade.
      { protocol: "https", hostname: "i.ytimg.com" },
      // Blog images uploaded in Sanity Studio.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // The old siplink.in .php pages hold the rankings in the SEO worksheet
  // (several #1 for "... in Chennai"). 301 each to its closest new page so
  // that ranking carries over instead of hitting a 404.
  async redirects() {
    return [
      ["/index.php", "/"],
      ["/voip-service-providers-in-chennai-india.php", "/"],
      ["/voip-services-in-chennai-india.php", "/products"],
      ["/siplink-services.php", "/products"],
      ["/how-voipvoice-over-internet-protocol-works.php", "/products"],
      ["/to-send-and-receive-fax-over-the-internet.php", "/products"],
      ["/sip-trunk-service-providers-in-chennai-india.php", "/products/sip-trunking"],
      ["/sip-trunk-service-providers-in-chennai-india.html", "/products/sip-trunking"],
      ["/integration-sip.php", "/products/crm-integration"],
      ["/call-centre-solution-providers-in-chennai-india.php", "/products/call-center"],
      ["/internet-service-providers-in-chennai-india.php", "/internet"],
      ["/high-speed-internet-leased-line-service-providers-in-chennai-india.php", "/internet/dedicated-internet"],
      ["/siplink-plan.php", "/pricing"],
      ["/about-us.php", "/about"],
      ["/why-siplink.php", "/why-siplink"],
      ["/gallery.php", "/about"],
      ["/video.php", "/about"],
      ["/faq.php", "/"],
      ["/contact-us.php", "/contact"],
      ["/support-siplink.php", "/contact"],
      ["/enquiry.php", "/contact"],
      ["/privacy-policy-siplink.php", "/privacy"],
      // Old posts keep their slugs in Sanity. Publish each one before the domain moves, or it 404s.
      ["/blog/what-is-voip-how-does-voip-work.php", "/blog/what-is-voip-how-does-voip-work"],
      ["/blog/voip-service-providers-in-chennai-india-voip-service-questions-and-answers.php", "/blog/voip-service-providers-in-chennai-india-voip-service-questions-and-answers"],
      ["/blog/how-to-send-and-receive-fax-over-the-internet-with-siplink.php", "/blog/how-to-send-and-receive-fax-over-the-internet-with-siplink"],
      ["/blog/the-complete-guide-to-voip-service-providers-in-chennai-india.php", "/blog/the-complete-guide-to-voip-service-providers-in-chennai-india"],
      ["/blog/the-feature-and-future-of-5g-internet-technology-in-call-center-services.php", "/blog/the-feature-and-future-of-5g-internet-technology-in-call-center-services"],
      ["/blog/how-to-connect-business-with-high-speed-internet-access-for-multiple-users.php", "/blog/how-to-connect-business-with-high-speed-internet-access-for-multiple-users"],
      ["/blog/what-is-an-isp-how-to-select-the-best-broadband-internet-service-providers-in-chennai.php", "/blog/what-is-an-isp-how-to-select-the-best-broadband-internet-service-providers-in-chennai"],
      // These old addresses were exact copies of the posts above.
      ["/blog/business-voip-services-in-india.php", "/blog/what-is-voip-how-does-voip-work"],
      ["/blog/internet-service-providers-in-india.php", "/blog/how-to-send-and-receive-fax-over-the-internet-with-siplink"],
      ["/blog/business-voip-service-providers-in-india.php", "/blog/voip-service-providers-in-chennai-india-voip-service-questions-and-answers"],
      ["/blog/5g-internet-technology-voip-service-providers-in-india.php", "/blog/the-feature-and-future-of-5g-internet-technology-in-call-center-services"],
      ["/blog/voip-service-providers-in-india.php", "/blog/the-complete-guide-to-voip-service-providers-in-chennai-india"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
