@AGENTS.md

# soc-architects

Marketing site for an architecture firm, built with **Next.js 16 (App Router) + Sanity CMS**.
Design intent: clone the look-and-feel of https://www.here-office.com/.

## Stack
- **Next.js 16.2.4** (App Router, TypeScript 5, React 19)
- **Sanity CMS v5** — Studio mounted in-app at `/studio` (`app/studio/[[...tool]]/`)
- **Tailwind CSS v4** (`@tailwindcss/postcss`) + **styled-components** v6
- **ESLint 9** with `eslint-config-next`
- Node **22 LTS** (see `.devcontainer/devcontainer.json`)

## Project layout
- `app/` — App Router pages, layouts, API routes
- `app/studio/[[...tool]]/` — embedded Sanity Studio
- `components/` — React UI components
- `lib/` — utilities, Sanity client wrappers
- `sanity/` — Sanity schema, GROQ queries, helpers
- `content/` — locally-authored content (non-CMS)
- `public/` — static assets, processed images
- `scripts/` — one-off Node scripts (`*.mjs`) for content tasks (e.g., `add-zools-news.mjs`)
- `proejct/` — raw source images (gitignored; processed copies live in `public/projects`)

## Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Start Next dev server on `:3000` (Studio at `/studio`) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `node scripts/list-news.mjs` | Example content script (see `scripts/`) |

## Environment
Local secrets live in `.env.local` (gitignored). Template: `.env.local.example`.

Required keys:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (usually `production`)
- `SANITY_API_VERSION`
- `SANITY_API_WRITE_TOKEN` — needed for Studio writes and `scripts/*.mjs`

In Codespaces, register the same names as **Codespaces Secrets** (scoped to this repo).

## Conventions
- TypeScript strict; do not introduce `any` without justification.
- App Router: prefer Server Components; mark Client Components with `"use client"` only when needed (interactivity, hooks, styled-components runtime).
- Image domains: `cdn.sanity.io` (configured in `next.config.ts`).
- Tailwind v4 — no `tailwind.config.js`; theme tokens via CSS `@theme`.
- Read deprecation notices in `node_modules/next/dist/docs/` before using Next APIs.

## Related docs in repo
- `CMS_SETUP.md` — Sanity setup walkthrough
- `Instagram_피드_연결_안내.md` — Instagram feed integration notes
- `사이트_안내.md` — site overview (KR)
