# Routes

## Route Map

| Route | Feature | Allowed Profiles | Notes |
|-------|---------|-----------------|-------|
| `/login` | Auth | Guest, Authenticated User | Public; redirect to `/dashboard` if already authenticated |
| `/register` | Auth | Guest, Authenticated User | Public; redirect to `/dashboard` if already authenticated |
| `/` | — | Authenticated User | Immediate redirect to `/dashboard` |
| `/dashboard` | Dashboard | Authenticated User | Protected; redirect to `/login` if unauthenticated |
| `/projects` | Projects | Authenticated User | Protected |
| `/projects/:projectId` | Projects | Authenticated User | Protected; 404 if project not found |
| `/tasks` | Tasks | Authenticated User | Protected; defaults to board view |

## Protection Mechanism

- **`beforeLoad`** on TanStack Router: checks auth state before any route renders
- **`useEffect` on auth state**: handles redirect when user logs out while a protected route is mounted
- Both mechanisms are required — `beforeLoad` alone does not handle in-session logouts

## Shared Hooks Used by Routes

| Hook | Consumed By |
|------|-------------|
| `shared/hooks/use-auth` | All protected routes (session state) |
| `shared/hooks/use-projects` | Tasks (project selector), Dashboard (project filter) |
