# Spoti Backend

Campus study spot finder API. Next.js (App Router) + PostgreSQL + Prisma 7 + Better Auth.

## Setup

1. Work **inside `spoti-backend/`** for every command. Running npm or prisma
   commands from the parent folder creates a stray second project.
2. `npm install` (also runs `prisma generate` via postinstall)
3. Copy `.env.example` to `.env` and fill it in. Create the local Postgres database first.
4. `npx prisma migrate dev`
5. `npx prisma generate`, then `npx prisma db seed` (generate **before** seed)
6. `npm run dev`

## Gotchas

- **Prisma is pinned to v7.** `npx prisma` can resolve to the v8 release candidate,
  which has a different CLI. Keep `prisma` and `@prisma/client` on `^7`.
- Prisma config lives in `prisma7.config.ts`. The seed command is set there, not in package.json.
- The generated client lives in `src/generated/prisma` and is gitignored. Rebuild it with `npx prisma generate`.
- After changing the schema or auth config: migrate, generate, delete `.next`, restart the dev server.
- If `prisma migrate dev` warns about dropping a table that has data, check what depends on it first.

## API

| Method | Route | Auth |
|---|---|---|
| GET | /api/spots (`?building`, `?lat&lng&radiusKm`, `?preset`) | none |
| POST | /api/spots | admin (`ADMIN_EMAILS`) |
| GET | /api/spots/[id] | none |
| POST | /api/spots/[id]/ratings | signed in, 1 per spot per 24h |
| POST | /api/spots/[id]/photos | signed in, multipart field `photo` |
| GET/POST/DELETE | /api/favorites | signed in |
| * | /api/auth/* | Better Auth |

Presets: `deepFocus`, `groupStudy`, `quickSession`, `videoCall`.

## Not done yet

- Photo storage is local disk (`public/uploads`), which only works in development.
  Move to S3/R2/Cloudinary before deploying.
- Check-ins (schema exists, no endpoints).
- Saved user preferences endpoint.