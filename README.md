<div align="center">

# TPAY — Incentivize responsibly

Modern referral, payout, and compliance infrastructure built with Next.js 14, Prisma, NextAuth v5, TailwindCSS, shadcn/ui, and PostgreSQL.

</div>

## Features

- App Router architecture with enterprise-grade folder structure (`app`, `components`, `hooks`, `lib`, `prisma`, `styles`, `utils`, `pages/api`)
- NextAuth v5 with Google, GitHub, Facebook, credentials, password reset, and protected routes
- Prisma ORM models for users, referrals, payouts, and password reset tokens
- Framer Motion animations, shadcn/ui components, responsive layouts, and dark/light theme via `next-themes`
- Zod validation on every API route plus reusable UI forms (sign up, sign in, referral submission, settings)
- Admin dashboard with wallet insights, referral queue, payout tracking, and settings forms

## Getting Started

```bash
# install dependencies
npm install

# generate Prisma client
npm run prisma:generate

# run database migrations
npm run prisma:migrate

# start dev server
npm run dev
```

Visit `http://localhost:3000` to explore the UI, and `http://localhost:3000/dashboard` after signing in.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the required values:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- OAuth credentials for Google, GitHub, Facebook
- SMTP/Magic link sender (`EMAIL_FROM`, `SMTP_*`)

## Prisma

```
npx prisma migrate dev --name init
npm run prisma:seed
```

The seed script provisions an admin account (`admin@tpay.app` / `ChangeMe123!`).

## Testing OAuth locally

- Use [Google Cloud Console](https://console.cloud.google.com/apis/credentials) to create OAuth credentials with `http://localhost:3000/api/auth/callback/google`.
- Repeat for GitHub and Facebook.

## Deployment

- **Vercel**: add all environment variables in the dashboard, connect PostgreSQL (Neon/Supabase), and set `NEXTAUTH_URL`.
- **Railway**: deploy PostgreSQL, run Prisma migrations (`npm run prisma:deploy`), then deploy the Next.js app with the same env vars.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | Lint the project |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run development migrations |
| `npm run prisma:deploy` | Apply migrations in production |
| `npm run prisma:seed` | Seed database with sample data |

---

Crafted with ❤️ for compliance-heavy referral teams.
