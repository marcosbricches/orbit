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

features/auth/: types, api/auth.api, hooks/use-login-form, hooks/use-register-form, components/AuthLayout+LoginPage+RegisterPage

features/projects/: types, api/projects.api (localStorage mock), hooks/use-project-form, components/ProjectList+ProjectCard+ProjectDetail+ProjectForm

features/dashboard/: api/activity.api (localStorage mock + 10 seed entries), hooks/use-dashboard-stats+use-activity-feed, components/DashboardPage+StatCard+ActivityFeed

## Routing

Router: TanStack Router (code-based, no file-gen)

- / → redirect to /dashboard
- /login, /register → public (no layout)
- /dashboard, /projects, /projects/$projectId, /tasks → protected (AppLayout)
- /design-system → dev-only showcase route

## Stores

- useAuth (zustand) — user session, login/register/logout, dev auto-login
- useProjects (TanStack Query) — shared hook in shared/hooks/, wraps localStorage mock API
- useTasks (TanStack Query) — shared hook in shared/hooks/, wraps features/tasks/api/tasks.api

## Testing

- Unit/integration: Vitest (vitest.config.ts)
- E2E: Playwright (playwright.config.ts)

## Features

- auth — Login/register pages with Zod validation, zustand auth store, dev auto-login (built 2026-03-31)
- projects — Project list, detail, create/edit form, archive flow; localStorage mock; 11 tests (built 2026-03-31)
- dashboard — Stats cards (total/completed/overdue/active), activity feed; client-side aggregation; 13 tests (built 2026-03-31)

## Gotchas

- DEV auto-login (RN-AUTH-03) prevents testing auth pages in dev mode — use production build + `serve -s` for E2E auth testing
- shared/hooks/use-projects.ts imports from features/projects/api/ — violates shared→features direction but matches existing use-auth.ts pattern; accepted for consistency
- Project color hex values in types.ts and projects.api.ts are data constants (user-chosen colors), not CSS — exempt from Token-First rule
- motion Variants type must be explicitly imported and applied to variant objects — TypeScript infers `ease` as `string` instead of `Easing` without it (`erasableSyntaxOnly: true` makes this a build error)
- TanStack Router `activeProps.className` appends to base `className` — conflicting Tailwind color classes coexist; move inactive-only colors to `inactiveProps.className` to guarantee mutual exclusion
- `text-text-secondary` (oklch 0.55) fails WCAG AA 4.5:1 for xs/sm text on light backgrounds — use `text-text-muted` (token added, oklch 0.42) for timestamps and inactive labels
- Status badge light-mode contrast: `text-status-*` on `/10` opacity bg fails WCAG AA — use `text-status-*-fg` tokens (added to index.css); dark mode continues using `text-status-*`
- Nested interactive: `<article role="button">` + inner `<button>` violates WCAG 4.1.2 — use invisible overlay button (`absolute inset-0`) for card click; content at `relative z-10`; article has no role
- axe-core catches stagger-animated items at partial opacity and reports false contrast failures — add `waitForTimeout(800)` after `networkidle` in a11y specs
