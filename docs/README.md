# docs/ — Orbit Pipeline Index

Structured output of `/format` from `PRD.md`. Each file is consumed by a specific pipeline step.

## File Index

| File | Pipeline Step | Purpose |
|------|--------------|---------|
| `overview.md` | `/setup`, `/scope` | Product vision, user profiles, stack, NFRs, exclusions |
| `global-rules.md` | `/build <feature>`, `/review` | Cross-cutting rules that apply to every feature |
| `shared-types.md` | `/setup` | TypeScript types for pre-populating `src/types/index.ts` |
| `routes.md` | `/scope` | Route map → navigation structure, protected route configuration |
| `build-phases.md` | `/scope`, `/build` | Dependency graph, phase order, build commands |
| `features/auth.md` | `/build auth` | Auth spec: login, register, protected routes, `use-auth` hook |
| `features/projects.md` | `/build projects` | Projects spec: list, detail, create/edit, `use-projects` hook |
| `features/tasks.md` | `/build tasks` | Tasks spec: board (dnd-kit), list (TanStack Table), toggle (zustand) |
| `features/dashboard.md` | `/build dashboard` | Dashboard spec: stats cards, activity feed |

## Build Order

```
/setup          ← reads: overview.md, shared-types.md
/scope          ← reads: routes.md, build-phases.md, overview.md
/build auth     ← reads: features/auth.md, shared-types.md, global-rules.md
/build projects ← reads: features/projects.md, shared-types.md, global-rules.md
/build tasks    ← reads: features/tasks.md, shared-types.md, global-rules.md
/build dashboard← reads: features/dashboard.md, shared-types.md, global-rules.md
/review         ← reads: global-rules.md
/graduate       ← reads: all
```

## Features Summary

| Feature | Phase | Route(s) | Shared Hook Produced |
|---------|-------|----------|---------------------|
| Auth | 1 | `/login`, `/register` | `use-auth` |
| Projects | 2 | `/projects`, `/projects/:projectId` | `use-projects` |
| Tasks | 3 | `/tasks` | — |
| Dashboard | 4 | `/dashboard` | — |
