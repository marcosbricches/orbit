# Orbit — Task & Project Manager

## Overview

Single-page application for task management organized by projects. Built to validate the full development pipeline end-to-end.

## Goals

- Exercise every layer of the stack in a realistic, coherent product
- Cover auth, protected routing, cross-feature data, table, kanban DnD, animations, forms, and tests
- Serve as the reference test case for the `/format → /setup → /scope → /build → /review → /graduate` pipeline

---

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

---

## Shared Types (`src/types/index.ts`)

```ts
User
Project
Task
Status       // "todo" | "in_progress" | "review" | "done"
Priority     // "low" | "medium" | "high"
Activity
```

## Shared Hooks (`src/shared/hooks/`)

- `use-projects` — consumed by Tasks (project selector in form) and Dashboard (project filter)
- `use-auth` — session state; dev auto-login when `import.meta.env.DEV`

---

## Routes

```
/login
/register
/                    → redirect to /dashboard
/dashboard
/projects
/projects/:projectId
/tasks               → board view by default
```

All routes except `/login` and `/register` are protected. Redirect to `/login` on unauthenticated access.

---

## Features

### 1. Auth

- Email + password login and registration
- Protected routes via TanStack Router `beforeLoad` + `useEffect` on auth state (handles logout redirect)
- Dev auto-login: if `import.meta.env.DEV`, set a default dev user in `use-auth.ts` to skip manual login

### 2. Projects

**List (`/projects`)**
- Grid of project cards with name, description, color badge, and status
- Filter by status: `active | archived`
- Button to create new project

**Detail (`/projects/:projectId`)**
- Project header with name, description, color, status
- List of tasks belonging to this project (same TanStack Table as Tasks list view)
- Edit and archive actions

**Create / Edit**
- Form fields: name, description, color (preset palette), status
- Validation via zod

**Data shape**
```ts
Project {
  id, name, description, color, status: "active" | "archived", createdAt, ownerId
}
```

### 3. Tasks

**Board View (default)**
- 4 columns: `Todo | In Progress | Review | Done`
- Drag and drop cards between columns using `dnd-kit`
- `layout` prop on draggables for positional animation
- Cards animated with `motion.div` on mount/exit
- Column header shows task count badge

**List View**
- TanStack Table with columns: title, project, priority, due date, status
- Sort by priority and due date
- Filter by status and priority
- Row click opens edit drawer

**Toggle**
- Board / List toggle stored in zustand UI store
- Animated transition between views with `motion`

**Create / Edit**
- Form fields: title, description, priority, project (dropdown via `use-projects`), due date, status
- Validation via zod

**Data shape**
```ts
Task {
  id, title, description, priority, status, projectId, dueDate, createdAt, updatedAt
}
```

### 4. Dashboard

**Stats cards**
- Total tasks
- Completed this week
- Overdue tasks
- Active projects

**Recent activity feed**
- Last 10 actions (task created, task moved, project created, etc.)
- Relative timestamps (e.g. "2 hours ago")

**Data shape**
```ts
Activity {
  id, type, entityId, entityType, description, createdAt, userId
}
```

---

## Build Phases

### Phase 1 — Auth
- `use-auth` hook with dev auto-login
- Login and register pages
- Protected route wrapper
- Redirect logic (beforeLoad + useEffect)

### Phase 2 — Projects
- `use-projects` shared hook
- Projects list page with filter
- Project detail page
- Create/edit form (TanStack Form + zod)

### Phase 3 — Tasks
- Tasks board view (dnd-kit + motion)
- Tasks list view (TanStack Table)
- Board/list toggle (zustand)
- Create/edit form with project selector

### Phase 4 — Dashboard
- Stats cards (TanStack Query aggregation)
- Activity feed

---

## Test Coverage Requirements

- Each API endpoint: 1 happy-path test + 1 error test (vitest)
- E2E flows (playwright):
  - Login → view dashboard
  - Create project → create task → drag task to Done
  - List view sort and filter

---

## Constraints & Notes

- Vite + React SPA + Tailwind v4 only
- `erasableSyntaxOnly: true` — use union types or `as const`, no `enum` keyword
- Token-First styling — `@theme` tokens and Tailwind utilities only, no hardcoded hex
- Named exports only — no `export * from`
- Cross-feature data exclusively via `shared/hooks/` — no direct cross-feature imports
- Shared types used by 2+ features must live in `src/types/index.ts` from day one
