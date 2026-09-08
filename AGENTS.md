# SipLink Web

Marketing/company website for SipLink. Next.js 16 (App Router) + React 19 + Tailwind v4 + shadcn/ui.

## UI: shadcn/ui only

All UI is built from shadcn/ui components. This is a hard rule.

- Add components with `pnpm dlx shadcn@latest add <name>` — never hand-write a
  component that already exists in the registry.
- Do not install other UI/component libraries (MUI, Chakra, Ant, Bootstrap,
  Mantine, DaisyUI, Flowbite, headless kits, etc.). If something seems to need
  one, ask first.
- Icons: `lucide-react` only (the configured `iconLibrary`).
- Compose pages from `@/components/ui/*`. Project-specific components live in
  `@/components/` and must be built *out of* shadcn primitives, not around them.
- Style with the theme tokens in `app/globals.css` (`bg-background`,
  `text-muted-foreground`, `border-border`, …). No raw hex colors and no
  arbitrary one-off values where a token exists — that is what keeps light and
  dark mode correct.
- Customize by editing the generated files in `components/ui/` and by using each
  component's own variants — not by wrapping them in override divs.

Config lives in `components.json`: style `radix-nova`, RSC on, base color
neutral, aliases `@/components`, `@/lib`, `@/hooks`.

## Git

- **Never add a `Co-Authored-By` trailer to commits.** Commit messages carry no
  AI attribution or generated-by footers of any kind.
- Commit and push only when asked.

## Next.js 16 notes

This Next.js differs from older versions — check `node_modules/next/dist/docs/`
before relying on remembered APIs. Already hit in this project:

- Route components use the global `LayoutProps<"/">` / `PageProps<"/route">`
  helper types; do not hand-annotate `{ children }: { children: ReactNode }`.
- `params` and `searchParams` are Promises and must be awaited.

## Conventions

- TypeScript everywhere. Server Components by default — add `"use client"` only
  when a component genuinely needs state, effects, or browser APIs.
- Fonts are wired as `--font-geist-sans` / `--font-geist-mono` in
  `app/layout.tsx` and mapped to `--font-sans` / `--font-mono` in
  `app/globals.css`. Keep those names in sync if fonts change.
- Verify with `pnpm build` (typecheck + lint included) before declaring done.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
