# Build Phases

## Dependency Graph

```
[Auth] ──────────────────────────────────────────────────┐
   │                                                      │
   ▼                                                      ▼
[Projects] ──────────────────────────────────────────► [Dashboard]
   │                                                      ▲
   ▼                                                      │
[Tasks] ─────────────────────────────────────────────────┘
```

- **Auth** has no dependencies — built first, gates all other features
- **Projects** depends on Auth (protected routes, owner tracking)
- **Tasks** depends on Auth and Projects (project selector, task ownership)
- **Dashboard** depends on Auth, Projects, and Tasks (aggregation over both)

## Phase Table

| # | Feature | Description | Depends On |
|---|---------|-------------|------------|
| 1 | Auth | `use-auth` hook with dev auto-login, login/register pages, protected route wrapper, redirect logic | — |
| 2 | Projects | `use-projects` shared hook, projects list with filter, project detail, create/edit form | Auth |
| 3 | Tasks | Board view (dnd-kit + motion), list view (TanStack Table), board/list toggle (zustand), create/edit form with project selector | Auth, Projects |
| 4 | Dashboard | Stats cards (TanStack Query aggregation), activity feed with relative timestamps | Auth, Projects, Tasks |

## Shared Infrastructure (built before Phase 1)

The following must exist before any feature build begins (produced by `/setup` and `/scope`):

- `src/types/index.ts` — pre-populated from `shared-types.md`
- `shared/hooks/use-auth.ts` — session state with dev auto-login
- `shared/hooks/use-projects.ts` — project list; consumed by Tasks and Dashboard
- App shell with router, protected layout, and navigation

## Build Commands

```
/build auth
/build projects
/build tasks
/build dashboard
```

Each `/build` loads only its feature spec (`features/<name>.md`) + `shared-types.md` + `global-rules.md`.
