# Creative Tech Solution BD

The company website for Creative Tech Solution BD — a technology and digital
solutions initiative led by Md. Hasibul Hasan.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and
Drizzle ORM over MySQL/MariaDB.

---

## Quick start

```bash
npm install
cp .env.example .env.local    # fill in the values you have
npm run dev                   # http://localhost:3000
```

The public site runs without a database. Every data loader falls back to the
content committed in `src/lib/` if `DATABASE_URL` is missing or the database is
unreachable, so the site is never down because the database is. The admin panel,
bookings and contact form do need one.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run migrate` | Create/upgrade database tables (idempotent) |

## Environment variables

See `.env.example` for the full list with comments. The short version:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical base URL. Leave unset on Vercel — the deployment URL is detected. Set it when a custom domain is connected. |
| `DATABASE_URL` | For admin/forms | MySQL or MariaDB connection string |
| `JWT_SECRET` | For admin | Signs the admin session cookie |
| `SMTP_*`, `ADMIN_EMAIL` | No | Email notifications for bookings and contact messages |

`.env*` is gitignored. Never commit a filled-in copy.

## Connecting a custom domain later

No code change is needed. The site works on `localhost`, on the deployment URL,
and on a custom domain from the same build:

1. Point the domain's DNS at the hosting provider.
2. Add the domain in the hosting dashboard.
3. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` and redeploy.

Everything that needs an absolute URL — metadata, canonical tags, Open Graph,
`sitemap.xml`, `robots.txt`, JSON-LD and email links — derives from
`src/lib/site.ts`, which resolves that one variable.

## Content and portfolio

Two layers, in this order of precedence:

1. **Database rows**, managed from `/admin` (services, portfolio, site copy).
2. **Committed fallbacks** in `src/lib/projects.ts`, `src/lib/services.ts` and
   `src/lib/content-defaults.ts`.

### The accuracy rule

Everything published on this site has to be true. The portfolio lists real
repositories under github.com/hasib61714, described from what they actually
contain. There are no invented clients, no invented metrics and no invented team
members. A GitHub button only renders when the repository is public; private work
is listed honestly without a dead link.

When adding a project in `/admin/portfolio`, describe what the project does.
Do not add growth figures, client counts or satisfaction rates unless there is
evidence that would stand up if a client asked for it.

## Database

Schema lives in `src/db/schema.ts`; `src/db/migrate.ts` applies it with
`CREATE TABLE IF NOT EXISTS` and `ADD COLUMN IF NOT EXISTS`, so it is safe to
re-run against an existing database.

```bash
npm run migrate
```

The first account you register at `/auth` becomes the admin; registration closes
after that.

### Why not Supabase

Supabase was evaluated and deliberately not adopted. The application is built on
MySQL/MariaDB through `drizzle-orm/mysql2`, and moving to Supabase means
PostgreSQL — a rewrite of the schema, the migration script and the query layer,
with no live database available to verify the result against. That is a large
risk to take for a hosting change, so the existing architecture was kept.

The ৳0 goal is met without it. Free MySQL-compatible options that work with the
current code unchanged:

- **TiDB Cloud Serverless** — MySQL wire-compatible, free tier, no card required
- **Aiven for MySQL** — free tier
- Any MySQL 8 / MariaDB 10.5+ host

If a move to PostgreSQL is wanted later, the work is contained: `src/db/schema.ts`
(swap `mysql-core` for `pg-core`), `src/db/drizzle.ts` (swap the driver) and
`src/db/migrate.ts` (Postgres DDL). Application code above the ORM does not change.

## Deployment

The project builds to a standard Next.js server application and deploys to any
host that supports one. **Vercel** is the straightforward option: it detects the
framework, runs `npm run build`, and needs only the environment variables above.

A note worth reading before choosing a host: several free tiers restrict
commercial use. Vercel's Hobby plan is for non-commercial use — a business site
taking client enquiries should be on a paid plan or a host whose free tier permits
commercial use. Check the terms rather than assuming.

Deployment checklist:

- [ ] `DATABASE_URL` and `JWT_SECRET` set in the hosting dashboard
- [ ] `npm run migrate` run once against the production database
- [ ] First admin registered at `/auth`
- [ ] `NEXT_PUBLIC_SITE_URL` set once a custom domain is live
- [ ] `sitemap.xml` submitted to Google Search Console

## Project structure

```
src/
  app/              routes (App Router), sitemap, robots, manifest, OG image
  components/       SiteShell, Navbar, Footer, ProjectCard, ui primitives
  db/               Drizzle schema, connection, migration script
  lib/              site config, content, projects, services, structured data
  modules/          booking and auth forms
  proxy.ts          route protection (Next.js 16 renamed Middleware to Proxy)
```

Shared UI primitives live in `src/components/ui.tsx`. Use them rather than
repeating utility classes, so a change to the button or card treatment lands
site-wide.
