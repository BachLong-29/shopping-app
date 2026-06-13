# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint via Next.js
npm run type-check   # TypeScript check (no emit)
npm run translate    # Run translation script
```

## Architecture Overview

Full-stack e-commerce platform built with **Next.js App Router** (v16), **MongoDB/Mongoose**, **Redux + Redux-Saga**, and **next-intl** for i18n.

### Auth Flow

- JWT-based: access tokens (15 min) + refresh tokens (7 days), stored as `access_token` / `refresh_token` cookies
- `middleware.ts` guards `/my-task/:path*`, `/cart`, `/login` routes
- `core/context/AuthContext.tsx` holds client-side user state
- Token refresh is handled transparently in `core/services/httpService.ts` (Axios interceptor)
- Auth API routes live under `app/api/auth/`

### Data Layer

- **MongoDB** via Mongoose (`lib/mongodb.ts` uses a cached connection pattern)
- Schemas in `core/schema/`: `User`, `Product`, `Cart`, `Category`, `SalesOrder`, `PurchaseOrder`, `Settings`
- `Product.ownerId` references `User` — products are seller-scoped
- All API routes are in `app/api/` following Next.js Route Handler conventions

### State Management

Redux store (`redux/store/store.ts`) with six slices + sagas:
- `profile` — current user info
- `auth` — authentication state
- `product` — product listing/detail
- `cart` — shopping cart
- `SalesOrder` / `PurchaseOrder` — order management

Redux-Saga handles async side effects; sagas and reducers are co-located in `redux/`.

### Key Directory Map

| Path | Purpose |
|---|---|
| `app/(auth)/login/` | Login page (unauthenticated route group) |
| `app/my-task/[user_id]/` | Seller dashboard (products, orders, categories, settings) |
| `app/cart/` | Cart page with `CartContext` |
| `app/prod/[prod_id]/` | Product detail page |
| `app/api/[id]/` | User-scoped API routes (cart, products, orders, etc.) |
| `components/design-system/` | Custom design system components (Button, Modal, ProductCard…) |
| `components/ui/` | Radix UI wrappers (shadcn/ui style) |
| `components/layout/` | Page layout sections (navigation, sidebar, home, etc.) |
| `core/services/` | Axios HTTP service, auth, payment, settings services |
| `core/context/` | React contexts: Auth, Theme, Language, Breadcrumb, Home |
| `core/schema/` | Mongoose schemas |
| `hooks/` | `useFetch`, `useBreakpoint`, `useGetInfoFromPath` |
| `lib/` | `auth.ts` (JWT helpers), `mongodb.ts` (DB connection) |
| `locales/` | i18n JSON files consumed by next-intl |
| `redux/` | Store, reducers, sagas |
| `rules/` | Project-specific dev guidelines (read before making architectural decisions) |

### Image Uploads

Cloudinary via `next-cloudinary`. Config in `next.config.ts` exposes `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`. API key/secret are server-only.

### Styling

- Tailwind CSS with dark mode via `.dark` class (toggled by `ThemeContext`)
- Custom CSS variables for theming; extended with Poppins/Instrument Serif/JetBrains Mono fonts
- `components.json` configures shadcn/ui

### CSV Import/Export

`papaparse` (import) and `json2csv` (export) are used in product management routes under `app/api/[id]/products/`.

## Environment Variables

Required in `.env`:

```
MONGODB_URI
JWT_SECRET
JWT_REFRESH_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
NEXT_PUBLIC_API_BASE_URL
API_BASE_URL
```

## Code Conventions

- TypeScript everywhere — avoid `any`
- Absolute imports via `@/*` (maps to repo root)
- Import order: external → internal → types → styles
- Business logic lives in `core/` and `redux/`; UI in `components/` and `app/`
- See `rules/` directory for detailed frontend guidelines (naming, forms, data fetching, accessibility, etc.)
