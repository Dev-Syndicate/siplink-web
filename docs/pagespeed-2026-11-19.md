# PageSpeed Insights: home page, 19 Nov 2026

Source: https://pagespeed.web.dev/analysis/https-siplink-web-vercel-app/ulrixlwnqe
(Lighthouse 13.6.0, https://siplink-web.vercel.app)

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile | 99 | **86** | 96 | 100 |
| Desktop | 95 | **86** | 96 | 100 |

Metrics, mobile / desktop: FCP 1.4 s / 0.4 s, LCP 1.4 s / 0.8 s, TBT 70 ms / 160 ms,
CLS 0 / 0, Speed Index 3.1 s / 1.2 s.

Performance is fine. Accessibility is the weak score, and the one functional bug is
the chat widget failing to load.

---

## 1. Bug: the tawk.to chat script is blocked (Best Practices, console error)

Console: the script at `embed.tawk.to/...` "has been blocked by CORS policy: No
'Access-Control-Allow-Origin' header", then `net::ERR_FAILED`.

- Cause: `crossOrigin="anonymous"` on the `<Script>` in
  `components/site/chat-launcher.tsx:78`. tawk.to does not send CORS headers, so a
  CORS-mode request fails.
- Impact: the live chat widget probably never loads in production. The chat button
  stays hidden and the support-card link falls back to tawk.to's own page.
- Fix: remove the `crossOrigin` attribute.

## 2. Accessibility (score 86)

### 2a. AI stages tabs: bad ARIA structure (`aria-required-children`, agent a11y tree)
`components/site/ai-console.tsx:176-232`. `role="tablist"` wraps plain `<div>`s that
hold both the `role="tab"` button and its `role="tabpanel"`. A tablist may contain
only tabs, and the panels can't sit inside it.
Fix: the rail works as an accordion, so use disclosure buttons (`aria-expanded` +
`aria-controls`, no tab roles). The other option is to move the panels out of the
tablist.

### 2b. Integration list: invalid `<dl>` (`definition-list`, `dlitem`)
`components/site/integration-orbit.tsx:73-103`. Each `<dl>` group is a `<div>` holding
an icon `<span>` and a nested `<div>` that wraps the `<dt>`/`<dd>`. Inside a `<dl>`, a
`<div>` may contain only `<dt>`/`<dd>` directly.
Fix: put the `<dt>`/`<dd>` straight inside the group `<div>`, and move the decorative
icon into the `<dt>` (absolutely positioned) or out of the `<dl>`.

### 2c. Colour contrast (`color-contrast`)
All failures are tiny text inside product illustrations:
- "Toll free" / "Ported in" badges, `text-[9px]` on the animated `feature-glide`
  overlay: `components/site/feature-cards.tsx:465-479`.
- "LIVE CALLS", "across 6 sites", "MOS" labels (`text-[10px] text-muted-foreground`)
  in the cards on the dark `bg-foreground` migration section:
  `components/site/switching-device.tsx:~185-193` (section in `switching-story.tsx`).
- "Available", `text-[7px] text-success`: `components/site/apps-showcase.tsx:243`.

Fix: use stronger tokens for these labels (e.g. `text-foreground` / a darker
success shade), or mark the whole illustration `aria-hidden` if it is purely
decorative and its content is given elsewhere. Text at 7–10px is also below a
readable size.

## 3. Performance opportunities (score already 95–99)

| Insight | Est. savings | Where |
|---|---|---|
| Render-blocking CSS | 730 ms mobile / 170 ms desktop | Two Next CSS chunks. Mostly framework default; expect small gains only. |
| Image delivery | 301 KiB mobile / 410 KiB desktop | Trust badges (`components/site/trust-strip.tsx`: gdpr, iso-mark, hipaa, soc2, dot webp) are bigger than their 48px display size. Pillar images (`/images/pillar-*.webp`, `ai-voice-robot.webp`) get a 640–750w request for a ~20rem slot. YouTube `maxresdefault.jpg` (`components/site/autoplay-video.tsx:165`, `video-embed.tsx:49`) is 1280×720 and bypasses `next/image`. |
| Cache lifetimes | 44 KiB | YouTube thumbnail from `i.ytimg.com`; we don't control its headers. |
| Unused JavaScript | 101 KiB | Chunks `25e26lhfk646f.js`, `18ipv5l2qhj-w.js`. Needs a bundle analyser run to name them. |
| Legacy JavaScript | 14 KiB | Polyfills in `18ipv5l2qhj-w.js`. Check the `browserslist` target. |
| Non-composited animations | 25 elements | Animated illustrations. Animate `transform`/`opacity` only. |
| Forced reflow / long tasks | 7 long tasks, 3.1 s main-thread (mobile) | Layout reads in client components' JS. Profile to attribute. |
| LCP | — | Hero `hero-agent-headset.webp` is already discovered early. No action. |

## 4. Best Practices: informational only

CSP, COOP, XFO/clickjacking and Trusted Types are flagged as missing. These are
security headers (e.g. in `next.config` `headers()`). They don't affect the score much
but are worth adding.

## Status

Fixed on 19 Nov 2026 (not yet re-measured on PageSpeed):
- 1: `crossOrigin` removed. Confirmed in dev: tawk.to loads and the chat button shows.
- 2a: the rail is now disclosure buttons (`role="group"`, `aria-expanded`), with no tab roles.
- 2b: the icon moved into the `<dt>`. The group is `relative pl-13` and the icon is absolute.
- 2c: migration widgets use a solid `bg-card`. Number badges use `text-foreground` on
  the tinted background. "Available" uses `text-muted-foreground`.

Open: section 3 performance items and section 4 security headers.

## Priority

1. Remove `crossOrigin` from the tawk.to script (live chat is broken).
2. Fix the AI stages ARIA and the integration `<dl>` (quick, raises accessibility).
3. Fix contrast in the illustration labels.
4. Optionally resize trust badges and YouTube thumbnails.
