# Project rules (non-negotiable)

These rules describe the conventions used in this codebase. Follow them strictly for consistency and maintainability.

---

## Hard constraints (must be followed)

- Do not change existing architecture or folder structure.
- Do not introduce new libraries, styling systems, or data access patterns.
- App Router only — the Pages Router is not used.
- Tailwind is for layout/responsive only; visual styles live in component CSS files.
- Prisma access is restricted to repositories.

---

## 1. Styling

### 1.1 Tailwind for layout and responsive only

Use **Tailwind CSS** (or `@apply` in CSS files) for:

- Layout: flexbox, grid, alignment, spacing
- Responsive behavior: breakpoints (`sm:`, `md:`, `lg:`), visibility (`hidden`, `lg:block`)
- Structural sizing and positioning (e.g. `w-full`, `max-w-6xl`, `px-4`)

Prefer Tailwind utility classes directly in JSX for layout/responsive.  
Use `@apply` in component CSS files when grouping layout rules into a named class.

### 1.2 CSS files for visual styles

Use **component-level CSS files** (e.g. `Button.css`, `Header.css`) for:

- Colors (via design tokens: `var(--color-*)`, `var(--btn-primary-bg)`, etc.)
- Borders, shadows
- Transitions, focus/hover/active states
- Thematic typography (font-weight, text-decoration, etc.)

Design tokens are defined in **`src/app/globals.css`** (sources → brand → UI tokens).

Rules:

- Do not hardcode hex, rgb, or hsl values for brand/UI colors in components.
- Always use existing tokens when possible.
- If a new visual variable is required, add a token in `globals.css` following the existing structure.
- Each component that needs custom visuals must have a co-located `.css` file imported in the component (e.g. `import './Button.css'`).

### 1.3 Summary

| Concern                   | Use                    |
| ------------------------- | ---------------------- |
| Layout, flex, grid        | Tailwind (or `@apply`) |
| Responsive, breakpoints   | Tailwind               |
| Colors, borders, shadows  | CSS + design tokens    |
| Hover, focus, transitions | CSS files              |

---

## 2. File and folder structure

- **Do not rename or move** the existing top-level folders:
  `src/app`, `src/components`, `src/screens`, `src/server`, `src/data`, `src/lib`, `src/config`, `src/types`, `src/utils`, `prisma`, `scripts`, `public`.
- App Router routes live under `src/app/` only.
- Screen components live in `src/screens/` and are imported by `app/**/page.tsx` files.
- `src/screens/` contains UI composition only (no data fetching, no routing logic, no Prisma access).
- Data fetching must happen:
  - either in `app/**/page.tsx` (async Server Component),
  - or inside dedicated Server Components (e.g. `*SectionServer.tsx`, `*TeaserServer.tsx`).

Server-side code must remain in:

- `src/server/guards/`
- `src/server/repositories/`
- `src/server/services/`

Keep the existing naming conventions:

- `*.repo.ts`
- `*.service.ts`
- `*.server.ts`

---

## 3. Naming conventions

### Components

- PascalCase (e.g. `Button.tsx`, `ContactFormSection.tsx`).
- Co-located CSS must use the same base name (e.g. `Button.css`).

### Screens

- Must use the `*Screen.tsx` suffix  
  (e.g. `HomeScreen.tsx`, `TestimonialsScreen.tsx`, `RecruitmentScreen.tsx`).
- Screens live in `src/screens/`.

### Server modules

- kebab-case for multi-word names  
  (e.g. `job-offer.repo.ts`, `requireAuth.app.ts`, `requireAdmin.app.ts`).

### Route segments

- Lowercase folder names.
- Dynamic segments use brackets (e.g. `[slug]`, `[id]`).

### Server actions

- Defined in `actions.ts` next to the route that uses them.
- Must be async functions (e.g. `sendContact`, `logoutAction`).

### Server Components for data fetching

- Must follow the `*Server.tsx` naming convention  
  (e.g. `TestimonialsSectionServer.tsx`, `JobOffersSectionServer.tsx`, `NewsTeaserServer.tsx`).

---

## 4. Data and server rules

### Repositories

- Located in `src/server/repositories/*.repo.ts`.
- Single source of Prisma access for an entity.
- Must not contain business logic.

### Services

- Located in `src/server/services/*.service.ts`.
- Contain business logic.
- Must call repositories, never Prisma directly.

### Server adapters

- Located in `src/server/services/*.server.ts`.
- Used by Server Components or async `page.tsx` files.
- Must respect `IS_DB` from `src/config/dataMode.ts`:
  - If `IS_DB` is false → return static data from `src/data/`.
  - If `IS_DB` is true → call the corresponding service.
- Do not introduce new data-fetching patterns.

### Static data

- Lives in `src/data/` (e.g. `news.ts`, `testimonials.ts`).
- Types in `src/types/` must match the shape returned by server adapters.

### Server actions

- Must never call Prisma or repositories directly.
- Must call services only.
- Act as orchestration layers: validation → service call → redirect.

---

## 5. Auth and guards

App Router only.

- Use `requireAuthApp` from `@/server/guards/requireAuth.app` for authenticated routes.
- Use `requireAdminApp` from `@/server/guards/requireAdmin.app` for admin-only routes (e.g. `src/app/admin/layout.tsx`).

JWT handling is centralized in:

- `src/lib/jwt.ts`
- `src/lib/auth-cookies.ts`

No Pages Router guards or `getServerSideProps` usage in this template.

---

## 6. Forms and validation

- Server actions receive `FormData`.
- Validate with **Zod**.
- Use `redirect()` on success or validation failure.
- Do not introduce another validation library.
- Keep actions in `actions.ts` next to the route.
- Actions must call server services (e.g. `contact.service`, `reservations.service`), not repositories directly.

---

## 7. Code quality

- ESLint and Prettier are enforced.
- Run `lint`, `check-types`, and `format` before committing.
- TypeScript strict mode is enabled.
- Use the existing `@/*` path alias for `src/`.
- Do not introduce new architectural patterns.

---

## 8. Commits

- Use conventional commits: `type(scope): message`
- Examples:
  - `fix(auth): handle missing token cookie`
  - `refactor(job-offer): extract zod schema`
  - `docs(architecture): align with app router`
- One logical change per commit.
