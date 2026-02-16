# Project rules (non-negotiable)

These rules describe the conventions already used in this codebase. Follow them for consistency and maintainability.

---

## Hard constraints (must be followed)

- Do not change existing architecture or folder structure.
- Do not introduce new libraries, styling systems, or data access patterns.
- Tailwind is for layout/responsive only; visual styles live in component CSS files.
- Prisma access is restricted to repositories.

## 1. Styling

### 1.1 Tailwind for layout and responsive only

- Use **Tailwind CSS** (or `@apply` in CSS files) for:
  - Layout: flexbox, grid, alignment, spacing
  - Responsive behavior: breakpoints (`sm:`, `md:`, `lg:`), visibility (`hidden`, `lg:block`)
  - Sizing and positioning that are structural (e.g. `w-full`, `max-w-6xl`, `px-4`)
- Prefer Tailwind utility classes in JSX for layout/responsive; use `@apply` in component CSS when grouping layout rules for a class.

### 1.2 CSS files for visual styles

- Use **component-level CSS files** (e.g. `Button.css`, `Header.css`) for:
  - Colors (via design tokens: `var(--color-*)`, `var(--btn-primary-bg)`, etc.)
  - Borders, shadows, transitions, focus/hover/active states
  - Typography that is thematic (not structural), e.g. font-weight, text-decoration
- Design tokens are defined in **`src/app/globals.css`** (sources → brand → UI tokens). Use these variables; do not hardcode hex/rgba for brand/UI colors in components.
- Each component that needs custom visuals has a co-located `.css` file imported in the component (e.g. `import './Button.css'`).

### 1.3 Summary

| Concern                   | Use                    |
| ------------------------- | ---------------------- |
| Layout, flex, grid        | Tailwind (or `@apply`) |
| Responsive, breakpoints   | Tailwind               |
| Colors, borders, shadows  | CSS + design tokens    |
| Hover, focus, transitions | CSS files              |

---

## 2. File and folder structure

- **Do not rename or move** the existing top-level folders: `src/app`, `src/components`, `src/screens`, `src/server`, `src/data`, `src/lib`, `src/config`, `src/types`, `src/utils`, `prisma`, `scripts`, `public`.
- **App Router** protection: use `requireAuthApp` from `@/server/guards/requireAuth.app`; use `requireAdminApp` from `@/server/guards/requireAdmin.app` for admin-only routes (e.g. `src/app/admin/layout.tsx`).
- **Screen components** live in `src/screens/` and are imported by App Router `page.tsx` files.
- `src/screens/` contains UI composition only (no data fetching, no routing logic).
- Data fetching must happen:
  - either in `app/**/page.tsx` (async Server Component),
  - or inside dedicated Server Components (e.g. `*SectionServer.tsx`).
- **Server-side** code: guards in `src/server/guards/`, repositories in `src/server/repositories/`, services in `src/server/services/`. Keep the existing naming (`*.repo.ts`, `*.service.ts`, `*.server.ts`).

---

## 3. Naming conventions

- **Components**: PascalCase (e.g. `Button.tsx`, `ContactFormSection.tsx`). Co-located CSS: same base name (e.g. `Button.css`).
- **Screens**: must use the `*Screen.tsx` suffix (e.g. `HomeScreen.tsx`, `TestimonialsScreen.tsx`, `RecruitmentScreen.tsx`). Screens live in `src/screens/`.
- **Server modules**: kebab-case for multi-word names (e.g. `job-offer.repo.ts`, `requireAuth.app.ts`, `requireAuth.pages.ts`).
- **Route segments**: lowercase, dynamic segments in brackets (e.g. `[slug]`, `[id]`).
- **Server actions**: defined in `actions.ts` next to the route that uses them; actions are async functions (e.g. `sendContact`, `logoutAction`).
- **Server Components for data fetching**: must follow the `*Server.tsx` naming convention (e.g. `TestimonialsSectionServer.tsx`, `JobOffersSectionServer.tsx`, `NewsTeaserServer.tsx`).

---

## 4. Data and server

- **Repositories** (`src/server/repositories/*.repo.ts`): single source of Prisma access for an entity; no business logic.
- **Services** (`src/server/services/*.service.ts`): business logic; call repositories, not Prisma directly.
- **Server adapters** (`src/server/services/*.server.ts`): used by pages or RSC; respect `IS_DB` from `src/config/dataMode.ts` — when `IS_DB` is false, return static data from `src/data/`; when true, call the corresponding service. Do not add new data-fetching patterns; keep using this adapter pattern.
- **Static data** for non-DB mode lives in `src/data/` (e.g. `news.ts`, `testimonials.ts`); types in `src/types/` must match the shape used by the server adapters.
- Server actions never call Prisma or repositories directly; they always go through services.
- Server actions act as orchestration layers only (validation, calling services, redirecting).

---

## 5. Auth and guards

- **App Router** protection: use `requireAuthApp` from `@/server/guards/requireAuth.app` for authenticated routes; use `requireAdmin` from `@/server/guards/requireAdmin` for admin-only routes (e.g. `src/app/admin/layout.tsx`).
- **Pages Router** (if used): use `requireAuthPages` from `@/server/guards/requireAuth.pages` inside `getServerSideProps` context.
- Auth cookie name and options are centralized in `src/lib/auth-cookies.ts`; JWT handling in `src/lib/jwt.ts`.

---

## 6. Forms and validation

- Server actions receive `FormData`; validate with **Zod** and use `redirect()` on success or validation failure. Do not introduce another validation library.
- Keep actions in `actions.ts` next to the route; call server services (e.g. `contact.mail`, `reservations.service`) from actions, not repositories directly.

---

## 7. Code quality

- **ESLint** and **Prettier** are used; Prettier is enforced as an ESLint rule. Run `lint` and `format` (or `check-format`) before committing.
- **TypeScript**: strict mode; use the existing `@/*` path alias for `src/`.
- Do not introduce new libraries or new architecture patterns; extend the existing conventions only.

## 8. Commits

- Use conventional commits: `type(scope): message`
- Examples:
  - `fix(auth): handle missing token cookie`
  - `refactor(job-offer): extract zod schema`
- One logical change per commit.
