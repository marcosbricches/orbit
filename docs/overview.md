# Overview — Orbit Task & Project Manager

## Product Vision

Orbit is a single-page task management application organized by projects. It is built to validate the full development pipeline end-to-end, exercising every layer of the stack in a realistic, coherent product.

## Goals

- Exercise every layer of the stack in a realistic, coherent product
- Cover auth, protected routing, cross-feature data, table, kanban DnD, animations, forms, and tests
- Serve as the reference test case for the `/format → /setup → /scope → /build → /review → /graduate` pipeline

## User Profiles

| ID | Name | Description | Access Level |
|----|------|-------------|--------------|
| UP-01 | Authenticated User | Any user who has completed login or registration | Full access to all protected routes and their own data |
| UP-02 | Guest | Unauthenticated visitor | Access to `/login` and `/register` only; redirected to `/login` on protected route access |
| UP-03 | Dev User | Auto-logged-in user when `import.meta.env.DEV` is true | Same as Authenticated User; bypasses manual login for development |

## Stack

| Need | Library |
|------|---------|
| Routing | `@tanstack/react-router` |
| Fetch/cache | `@tanstack/react-query` |
| Forms | `@tanstack/react-form` + `zod` |
| Tables | `@tanstack/react-table` |
| State | `zustand` |
| DnD | `dnd-kit` |
| Animations | `motion` |
| Icons | `lucide-react` |
| Unit tests | `vitest` |
| E2E tests | `@playwright/test` |

## Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Framework | Vite + React SPA + Tailwind v4 only |
| NFR-02 | TypeScript | `erasableSyntaxOnly: true` — union types or `as const`, no `enum` keyword |
| NFR-03 | Styling | Token-First — `@theme` tokens and Tailwind utilities only, no hardcoded hex |
| NFR-04 | Exports | Named exports only — no `export * from` barrel re-exports |
| NFR-05 | Cross-feature data | Cross-feature data exclusively via `shared/hooks/` — no direct cross-feature imports |
| NFR-06 | Shared types | Types used by 2+ features must live in `src/types/index.ts` from day one |
| NFR-07 | Test coverage | Each API endpoint: 1 happy-path test + 1 error test (vitest) |
| NFR-08 | E2E coverage | Login → dashboard; create project → create task → drag to Done; list view sort/filter |

## Quality Process

- Unit tests via `vitest` for every API endpoint (happy path + error)
- E2E tests via `@playwright/test` for critical user flows
- Auth protection via TanStack Router `beforeLoad` + `useEffect` on auth state

## Exclusions

- No backend / server implementation — all data is client-side (mocked or in-memory)
- No multi-user collaboration or real-time features
- No notifications or email system
- No role-based access control beyond authenticated/guest distinction
