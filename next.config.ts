import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Keep defaults for ordinary images, 90 for UI mocks, and 95 for the
    // large product artwork so glass edges and fine ridges retain detail.
    qualities: [75, 90, 95],
    remotePatterns: [
      // YouTube thumbnail for the explainer video facade.
      { protocol: "https", hostname: "i.ytimg.com" },
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
      // shortcut: blog posts have no new home yet; point them at News until the blog is rebuilt.
      ["/blog", "/company/news"],
      ["/blog/:path*", "/company/news"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
