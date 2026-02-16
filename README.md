# Next.js + TypeScript + Tailwind + Prisma Template

Modern fullstack template: **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma** (PostgreSQL). Suited for brochure sites, admin back-offices, and forms with server actions.

---

## Stack

- [Next.js](https://nextjs.org/) 15 — App Router, Turbopack in dev
- [TypeScript](https://www.typescriptlang.org/) — Strict mode, path alias `@/*` → `src/*`
- [Tailwind CSS](https://tailwindcss.com/) — Layout and responsive; visual styles in component CSS files with design tokens
- [Prisma](https://www.prisma.io/) — PostgreSQL ORM
- [Zod](https://zod.dev/) — Schema validation (e.g. server actions)
- ESLint + Prettier — Lint and format

---

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (for database mode)

### Install and run

```bash
npm install
npm run dev
```

Or with pnpm:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database (optional)

The app can run in **static** mode (no DB) or **database** mode. Default is static unless configured.

1. Create a `.env` file:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/your_db"
   ```

2. Generate the Prisma client and apply migrations:

   ```bash
   npm run build
   # or
   npx prisma migrate deploy
   ```

3. To use the database for data (news, testimonials, etc.), set:

   ```env
   DATA_MODE=db
   # or
   NEXT_PUBLIC_DATA_MODE=db
   ```

4. Seed the database (optional):

   ```bash
   npm run db:seed
   ```

   To run seed automatically when building (e.g. CI), set `SEED_ON_BUILD=true` and use `npm run seed:if` in your build pipeline.

---

## Scripts

| Script         | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| `dev`          | Start dev server with Turbopack                                  |
| `build`        | Run `prisma generate` then `next build`                          |
| `start`        | Start production server                                          |
| `lint`         | Run ESLint on `.ts` / `.tsx`                                     |
| `lint:fix`     | ESLint with auto-fix                                             |
| `format`       | Prettier: format all files                                       |
| `check-format` | Prettier: check only (no write)                                  |
| `check-types`  | TypeScript check (`tsc --noEmit`)                                |
| `db:deploy`    | Apply Prisma migrations (`prisma migrate deploy`)                |
| `db:seed`      | Run Prisma seed (`prisma db seed`)                               |
| `seed:if`      | Run seed only if `SEED_ON_BUILD=true` (via `scripts/seed-if.js`) |

`postinstall` runs `prisma generate` so the client is available after install.

---

## Project overview

- **Routes**: App Router only under `src/app/`. Public site under `(site)/`, admin under `admin/` (protected by `requireAdminApp`).
- **Screens**: Page-level UI components live in `src/screens/` and are imported by `app/**/page.tsx`. Screens do not perform data fetching or routing.
- **Server Sections**: Data fetching is handled exclusively by async Server Components (e.g. `*SectionServer.tsx`, `*TeaserServer.tsx`) or directly in `app/**/page.tsx`. Screens never fetch data.
- **Components**: Reusable UI in `src/components/` (by feature/type). Styling rule: **Tailwind for layout and responsive**, **CSS files for visual styles** (colors, borders, states) using design tokens from `src/app/globals.css`.
- **Server**: Guards in `src/server/guards/`, repositories in `src/server/repositories/`, services in `src/server/services/`. Server adapters (`*.server.ts`) switch between static data (`src/data/`) and DB via `config/dataMode.ts`.
- **Forms**: Server actions in `actions.ts` next to the route; validation with Zod; actions call services (e.g. mail, reservations).
- The Pages Router is not used in this template.

For strict project rules and conventions, see **`docs/RULES.md`**. For architecture, folders, and data flows, see **`docs/ARCHITECTURE.md`**.

---

## Hydration warnings

Next.js may report hydration mismatches for attributes like `data-gramm` or `cz-shortcut-listen` injected by browser extensions. These are usually not bugs in the app. Test in a private window or with extensions disabled to confirm.

---

## Deploy

Build and run in production:

```bash
npm run build
npm run start
```

For hosted deployment (e.g. [Vercel](https://vercel.com/)), set `DATABASE_URL` and optionally `DATA_MODE=db` and `SEED_ON_BUILD` as needed.

---

## Licence

MIT.
