# fab-israel

A full-stack marketplace and community platform for Israeli Flesh and Blood TCG players — [fab-israel.com](https://fab-israel.com)
Live and actively used by the Israeli FaB community.

## About

fab-israel is the home for the Israeli Flesh and Blood community: a marketplace for buying and selling cards, plus community and learning resources for local players. Built with a strong emphasis on clean architecture, type safety, and maintainability.

## Features

- **Auth & onboarding** — Google OAuth via Supabase and onboarding to complete registration (contact methods and display name)
- **Marketplace** — Browse, search, and filter card listings with independent sort field/order controls, foiling and condition badges (WCAG AA contrast-compliant), and price comparison links to TCGPlayer and CardMarket, seller contact button to Whatsapp and Discord.
- **Listing Creation flow** — Multi-step listing creation with card/printing picker, persistent form state across submissions, and toast-based feedback
- **My Listings** — Manage your own listings with option to edit the listing details, mark them as fulfilled or completely remove them.
- **Community & Learn pages** — Resources and hub pages for the local community.
- **Events** — Admin-managed events with status tracking to display upcoming events or hide completed ones.
- **Admin tooling** — Role-based access via custom JWT claims.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router) + TypeScript
- **Backend:** [Supabase](https://supabase.com/) (Postgres, Auth, Row-Level Security)
- **Storage:** Cloudflare R2 (card images)
- **Styling:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/) (Base UI variant)
- **Hosting:** Vercel

## Architecture

The codebase follows a layered architecture to maintain Separation of Concerns and business logic decoupled from the UI:

```
repository → validator → mapper → service → server actions → UI
```

- **Repository** — Database access layer
- **Validator** — Zod schemas, including cross-field validation via `superRefine`
- **Mapper** — Transforms between DB shapes and domain/UI models
- **Service** — Business logic and orchestration
- **Server actions** — The boundary between server logic and client components, built around `useActionState`

Other notable patterns:
- Auth primitives with distinct throw-based, redirect-based, and optional variants (`requireAuth`, `getAuthClaims`, `getOptionalClaims`)
- Middleware treated strictly as a UX layer and not as security handler. Real enforcement is handled by Supabase RLS plus explicit service-layer ownership checks
- Custom Access Token Hook injecting `is_admin` into JWT claims
