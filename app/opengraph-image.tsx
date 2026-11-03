import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default share image. Rendered outside the page, so theme tokens cannot apply. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 88,
        background: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div style={{ fontSize: 112, fontWeight: 700 }}>{site.name}</div>
      <div style={{ fontSize: 44, marginTop: 28, color: "#d4d4d4" }}>
        Cloud telephony, SIP trunking and business internet
      </div>
      <div style={{ fontSize: 30, marginTop: 44, color: "#a3a3a3" }}>
        {site.url.replace("https://", "")}
      </div>
    </div>,
    size,
  );
}
