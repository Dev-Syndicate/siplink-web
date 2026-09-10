import { Bricolage_Grotesque } from "next/font/google";

/**
 * Products uses a display face with more character than the sitewide Geist
 * for headings. Scoped to this section via a local `--font-heading`
 * override so the rest of the site is unaffected.
 */
const display = Bricolage_Grotesque({
  variable: "--font-products-display",
  subsets: ["latin"],
  display: "swap",
});

export default function ProductsLayout({ children }: LayoutProps<"/products">) {
  return (
    <div
      className={display.variable}
      style={
        {
          "--font-heading": "var(--font-products-display)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
