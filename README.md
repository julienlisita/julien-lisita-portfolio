# Julien Lisita --- Portfolio

Personal portfolio built with **Next.js 15 (App Router)**,
**TypeScript**, **Tailwind CSS**, and **Prisma (PostgreSQL)**.

This project showcases my work as a full‑stack web developer,
including: - Modern brochure websites - Fullstack applications (React /
Next.js / Node.js / Prisma) - Admin back‑offices with authentication -
Server Actions and structured architecture

🌐 Live site: https://julienlisita.com\
💼 Location: Bordeaux, France

---

## 🚀 Tech Stack

- **Next.js 15** --- App Router, Server Components
- **TypeScript** --- Strict mode, clean architecture
- **Tailwind CSS** --- Layout & responsive
- **Custom CSS with Design Tokens** --- Visual system in `globals.css`
- **Prisma** --- PostgreSQL ORM
- **Zod** --- Validation (server actions)
- ESLint + Prettier --- Code quality

---

## 🧠 Architecture Overview

This project follows a strict layered architecture:

UI → Server Actions → Services → Repositories → Prisma

### Key conventions

- **App Router only** (`src/app/`)
- **Screens** in `src/screens/` using the `*Screen.tsx` naming
  convention
- **Server data fetching** handled by async Server Components
  (`*Server.tsx`) or `page.tsx`
- **Repositories** are the only layer allowed to access Prisma
- **Tailwind** for layout only
- **CSS files** for visual styles using design tokens

See: - `docs/ARCHITECTURE.md` - `docs/RULES.md`

---

## ⚙️ Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (if using DB mode)

### Install

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## 🗄 Data Mode

The portfolio supports two modes:

- `static` (default) → Data from `src/data/`
- `db` → Data from PostgreSQL via Prisma

To enable database mode:

```env
DATA_MODE=db
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
```

Apply migrations:

```bash
npx prisma migrate deploy
```

Seed (optional):

```bash
npm run db:seed
```

---

## 📦 Available Scripts

Script Description

---

`dev` Start development server
`build` Build for production
`start` Start production server
`lint` Run ESLint
`check-types` TypeScript check
`format` Run Prettier
`db:deploy` Apply Prisma migrations
`db:seed` Run seed script

---

## 🔐 Authentication

- JWT stored in HTTP‑only cookies
- Guards: `requireAuthApp`, `requireAdminApp`
- Admin routes protected via layout wrapper

---

## 🌍 Deployment

Designed for deployment on:

- **Vercel**
- Railway (PostgreSQL)
- Any Node.js hosting platform

Ensure environment variables are configured in production.

---

## 👨‍💻 About Me

I am a Bordeaux‑based full‑stack developer focused on:

- Clean architecture
- Strong typing (TypeScript)
- Maintainable UI systems
- Product‑oriented development
- Modern fullstack workflows

If you're looking for a developer for a website, internal tool, or
fullstack application --- feel free to reach out.

---

## 📄 License

This portfolio code is private and not intended for redistribution.
