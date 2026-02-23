# Architecture (current state)

This document describes the existing architecture, folder roles, and main data/UI flows. No new architecture or renames are proposed.

---

## Architecture summary

- App Router handles routing; `src/screens/` contains screen components only.
- UI → server actions → services → repositories → Prisma.
- Data can come from static files or DB depending on `IS_DB`.
- Tailwind = layout/responsive; CSS files = visual styling.

## 1. High-level stack

- **Next.js 15** — App Router only for routing (`src/app/`).
- **TypeScript** — Strict; path alias `@/*` → `src/*`.
- **Tailwind CSS** — Layout and responsive; visual styles in component CSS files using design tokens from `globals.css`.
- **Prisma** — PostgreSQL ORM; schema and migrations in `prisma/`.
- **Zod** — Validation in server actions.
- **Auth** — JWT in HTTP-only cookie; guards in `src/server/guards/`.

---

## 2. Folder structure and roles

```
nextjs-ts-tailwind-template/
├── prisma/                 # Schema, migrations, seed
├── public/                 # Static assets (images, favicons, manifest)
├── scripts/                # Build/CI scripts (e.g. seed-if.js)
├── src/
│   ├── app/                # App Router: routes, layouts, global styles
│   ├── components/        # Reusable UI components (by feature/type)
│   ├── config/            # App config (e.g. dataMode)
│   ├── data/              # Static data when DB is disabled
│   ├── lib/               # Shared utilities (prisma, jwt, auth-cookies)
│   ├── screens/           # Screen-level UI components (no routing, no data fetching)
│   ├── server/            # Guards, repositories, services
│   ├── types/             # Shared TypeScript types
│   └── utils/             # Pure helpers (align, icons)
```

### 2.1 `src/app/` (App Router)

- **Root**: `layout.tsx` (html/body, globals.css), `metadata.ts`, `viewport.ts`.
- **`(site)/`**: Public site layout (Header, Footer, main with header offset). Contains:
  - **`(auth)/`**: login, signup (route groups; no layout segment in URL).
  - **Other segments**: about, contact, events, faq, gallery, legal/\*, news, portfolio, recruitment, reservations, services, testimonials, thank-you, thank-you-application.
- **`admin/`**: Admin area; layout in `admin/layout.tsx` uses `requireAdminApp()` to protect all `/admin/*` routes.
- **Convention**: Each route segment that has a screen has a `page.tsx` that usually exports `metadata` and renders a component from `src/screens/`. Forms use co-located `actions.ts` (server actions).

### 2.2 `src/screens/`

- **Role**: Page-level (screen) UI composition.
- They are imported by `src/app/**/page.tsx`.
- Screens:
  - Do not fetch data.
  - Do not define routes.
  - Do not use `getServerSideProps`.
- They compose:
  - UI components,
  - and server components (e.g. `*SectionServer.tsx`).
- **Naming**: Screen components use the `*Screen.tsx` suffix (e.g. `HomeScreen.tsx`, `ContactScreen.tsx`, `NewsScreen.tsx`).
  Admin screens follow the same convention under `src/screens/admin/` (e.g. `OffersAdminScreen.tsx`, `ReservationsAdminScreen.tsx`, `SettingsAdminScreen.tsx`).
- Screens compose UI components and server components (e.g. `NewsSectionServer.tsx`, `TestimonialsTeaserServer.tsx`) but do not fetch data directly.

### 2.3 `src/components/`

- **Organization**: By feature or type: `about/`, `admin/`, `auth/`, `contact/`, `data-display/`, `form/`, `home/`, `layout/`, `navigation/`, `news/`, `patterns/`, `portfolio/`, `recruitment/`, `reservations/`, `services/`, `testimonials/`, `ui/`.
- **Pattern**: Components that need custom styles have a co-located `.css` file (e.g. `Button.tsx` + `Button.css`). Layout/responsive via Tailwind (in JSX or `@apply` in CSS); colors, borders, states in CSS using `globals.css` tokens.
- **`ui/`**: Low-level primitives (Button, Eyebrow, Lead, Media, Modal, PageTitle, Paragraph, Prose, SectionTitle, Subtitle, SubmitButton).
- **`layout/`**: Header, Footer, Section, SectionWrapper, Split, HeaderOffsetSync.
- **`patterns/`**: Reusable sections (Cta, FeaturesGrid, HeaderBlock, PageHero, SplitSection, ActionsStack).

### 2.4 `src/server/`

- **`guards/`**:
  - `requireAuth.app.ts` — App Router: reads cookie, verifies JWT, redirects to `/login` if missing/invalid; returns user payload.
  - `requireAdmin.app.ts` — App Router: ensures the authenticated user has role `ADMIN`; used in `app/admin/layout.tsx` to protect all `/admin/*` routes.
- **`repositories/`**: One file per entity (e.g. `news.repo.ts`, `job-offer.repo.ts`). Thin wrappers around Prisma (findMany, findUnique, create, update, delete). No business logic.
- **`services/`**:
  - **`*.service.ts`**: Business logic; call repos, no direct Prisma.
  - **`*.server.ts`**: Adapters for server-side data fetching. They check `IS_DB` from `@/config/dataMode`: if false, return static data from `src/data/`; if true, call the corresponding `*.service.ts` (with dynamic import where needed to avoid bundling Prisma in edge/static). Used by Server Components rendered from `app/**/page.tsx`.

### 2.5 `src/config/`, `src/data/`, `src/lib/`, `src/types/`, `src/utils/`

- **`config/dataMode.ts`**: `DATA_MODE` = `'static' | 'db'` from env (`NEXT_PUBLIC_DATA_MODE` or `DATA_MODE`). `IS_DB` drives whether server adapters use DB or static data.
- **`data/`**: Static arrays/objects (e.g. `news.ts`, `testimonials.ts`, `jobOffers.ts`) used when `IS_DB` is false. Types in `src/types/` align with these and with Prisma-backed responses.
- **`lib/`**: `prisma.ts` (singleton client), `jwt.ts`, `auth-cookies.ts`, `resolveColor.ts`.
- **`types/`**: Shared types (e.g. `news.ts`, `testimonial.ts`, `job.ts`, `project.ts`, `feature.ts`); `next.d.ts` for Next-specific types.
- **`utils/`**: Pure helpers (e.g. `align.ts`, `icons.ts`).

---

## 3. Routing and layouts

- **Public site**: All public URLs live under the `(site)` group: `/(site)/page.tsx` → `/`, `/(site)/contact/page.tsx` → `/contact`, etc. Shared layout: Header, main (with `paddingTop: var(--header-offset)`), Footer.
- **Auth routes**: `/(site)/(auth)/login`, `/(site)/(auth)/signup` — same site layout, no `/auth` in path.
- **Admin**: `/admin`, `/admin/news`, `/admin/offers`, `/admin/reservations`, `/admin/settings`, `/admin/testimonials`, `/admin/slots`. All wrapped by `admin/layout.tsx` which runs `requireAdminApp()` (force-dynamic).
- **Dynamic segments**: e.g. `portfolio/[slug]/page.tsx`, `recruitment/[slug]/page.tsx`; route `page.tsx` fetches data (directly or via `*.server.ts`) and renders a Screen component (e.g. `src/screens/ProjectScreen.tsx`, `src/screens/JobOfferScreen.tsx`).

---

## 4. Data flow

### 4.1 Server-side data (DB or static)

1. **Entry point**: a Server Component (e.g. `*SectionServer.tsx`) rendered from `app/**/page.tsx` or composed inside a Screen.
2. **Adapter** (`*.server.ts`): Reads `IS_DB`; if `!IS_DB`, returns data from `src/data/*`; if `IS_DB`, dynamically imports the corresponding `*.service.ts` and calls it.
3. **Service** (`*.service.ts`): Uses repositories only.
4. **Repository** (`*.repo.ts`): Uses Prisma for CRUD.

### 4.2 Mutations (forms)

1. Form submits to a **server action** in `actions.ts` next to the route.
2. Action parses `FormData`, validates with **Zod**, then calls a **service** (e.g. `sendContactAdminEmail`, reservation create, testimonial create).
3. Service may use repos and/or external APIs (e.g. Resend for email). Action then `redirect()` to success or error URL.

- **Rule**: Server actions never call Prisma or repositories directly; they always go through services.

---

## 5. Styling flow

- **Global**: `src/app/globals.css` — Tailwind directives + design tokens (CSS custom properties). Tokens are organized as: sources (raw palette) → brand → UI (e.g. `--color-bg`, `--btn-primary-bg`, `--color-header-bg`). Light/dark via `html.dark`.
- **Components**: Each component that needs custom visuals imports its `.css` file. In the CSS file:
  - **Layout / responsive**: Tailwind utilities via `@apply` (e.g. `@apply flex gap-4 lg:grid lg:grid-cols-2`).
  - **Visual**: Raw CSS with tokens (e.g. `background-color: var(--color-hero-bg);`, `color: var(--btn-primary-text);`, hover/focus states).
- **Tailwind config**: `content` includes `app`, `components`, `screens`, `utils` (and `server` only if needed for class scanning).

---

## 6. Auth flow

- **Login**: Form in `(auth)/login` submits to a server action; action validates credentials, creates JWT, sets HTTP-only cookie (name from `auth-cookies.ts`), then redirects.
- **Protected routes (App Router)**: Layout or page calls `requireAuthApp()` or `requireAdminApp()`.
  - `requireAuthApp` reads cookie, verifies JWT, redirects to `/login` on failure.
  - `requireAdminApp` enforces role `ADMIN` and can load user info via repository if needed.
- **Admin layout**: `app/admin/layout.tsx` runs `requireAdminApp()` once; all `/admin/*` routes are protected.

---

## 7. Prisma and env

- **Schema**: `prisma/schema.prisma` — PostgreSQL; models include User, JobOffer, Testimonial, NewsItem, ReservationSlot, Reservation. Enums: Role, SlotStatus.
- **Single source of truth**: The Prisma schema is the single source of truth for all DB-backed types and shapes. TypeScript types must align with it and should not redefine DB entities independently.
- **Migrations**: Stored in `prisma/migrations/`; applied with `db:deploy` or `prisma migrate dev`.
- **Seed**: `prisma/seed.ts` (run via `db:seed`). Optional: `scripts/seed-if.js` runs seed when `SEED_ON_BUILD=true`.
- **Env**: `DATABASE_URL` for Prisma. `NEXT_PUBLIC_DATA_MODE` or `DATA_MODE` for static vs DB. Other env for Resend, etc., as used by services.

## Non-responsibilities

- UI components do not access Prisma or repositories.
- Repositories do not contain business logic.
- Services do not perform routing, redirects, or auth guards.
- `src/screens/` components do not define routes.
