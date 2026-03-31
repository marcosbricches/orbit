# Orbit Task & Project Manager

A single-page task management application organized by projects, built to validate the full development pipeline end-to-end.

## Commands

- pnpm dev — start dev server
- pnpm build — production build
- pnpm test — run Vitest
- pnpm lint — ESLint
- pnpm run e2e — Playwright E2E

## Stack

| Need            | Lib                                 |
| --------------- | ----------------------------------- |
| Router          | @tanstack/react-router v1.168       |
| Fetch/cache     | @tanstack/react-query v5            |
| State           | zustand v5                          |
| Animations      | motion v12                          |
| Icons           | lucide-react                        |
| Styling         | Tailwind v4                         |
| Design identity | Orbit Clarity (indigo/slate, Inter) |

## Architecture

src/app/
├── App.tsx (<50 lines)
├── providers/AppProviders.tsx (QueryClientProvider)
├── routes/AppRoutes.tsx (TanStack Router code-based routes)
└── layout/ (Sidebar, TopBar, MobileNav, AppLayout)

shared/ui/: Button, Input, Select, Textarea, Checkbox, Toggle, Card, Badge, Avatar, Skeleton, Dialog, Tooltip, Toast, Separator, EmptyState, ErrorState, LoadingState (17 components)

## Routing

Router: TanStack Router (code-based, no file-gen)

- / → redirect to /dashboard
- /login, /register → public (no layout)
- /dashboard, /projects, /projects/$projectId, /tasks → protected (AppLayout)
- /design-system → dev-only showcase route

## Stores

> Populated by /build as global stores are created.

## Testing

- Unit/integration: Vitest (vitest.config.ts)
- E2E: Playwright (playwright.config.ts)

## Features

> Populated as features are built via /build.

## Gotchas

> Populated by /build and /review as discovered.
