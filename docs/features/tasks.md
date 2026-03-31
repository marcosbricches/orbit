# Feature: Tasks

## Metadata

| Field | Value |
|-------|-------|
| Phase | 3 |
| Routes | `/tasks` |
| Depends on | Auth, Projects |
| Shared hooks consumed | `shared/hooks/use-auth.ts`, `shared/hooks/use-projects.ts` |

## Overview

The Tasks feature is the core of Orbit. It provides a kanban board view with drag-and-drop, a sortable/filterable list view, a view toggle stored in zustand, and a create/edit form that references projects via the shared hook.

---

## Screens / UI

### Board View (default)

- 4 columns: `Todo | In Progress | Review | Done`
- Drag and drop cards between columns using `dnd-kit`
- `layout` prop on draggable cards for positional animation (required by RN-COMP-03)
- Cards animated with `motion.div` on mount and exit
- Column header shows task count badge

#### Task Card

| Element | Description |
|---------|-------------|
| Title | Task title |
| Priority badge | `low` / `medium` / `high` with distinct colors |
| Due date | Formatted date; highlighted red if overdue |
| Project | Project color dot + name |

### List View

- TanStack Table with columns: title, project, priority, due date, status
- Sortable columns: priority, due date
- Filterable: by status, by priority
- Row click opens the Edit Task drawer
- Animated rows using `motion.tr` (required by RN-COMP-02)

### View Toggle

- Board / List toggle button (icon-based)
- Selected view stored in zustand UI store (`useUIStore`)
- Animated transition between views using `motion`

### Create / Edit Task Form (drawer)

| Field | Type | Validation |
|-------|------|------------|
| Title | text input | required, min 2 characters |
| Description | textarea | optional |
| Priority | select (`low` \| `medium` \| `high`) | required |
| Project | dropdown (via `use-projects`) | optional |
| Due Date | date picker | optional |
| Status | select (`todo` \| `in_progress` \| `review` \| `done`) | required |

- Validation via zod
- Form powered by `@tanstack/react-form`
- On success: invalidate tasks query and close drawer

---

## Data Shape

Defined in `src/types/index.ts`:

```ts
Task {
  id: string
  title: string
  description: string
  priority: Priority      // 'low' | 'medium' | 'high'
  status: Status          // 'todo' | 'in_progress' | 'review' | 'done'
  projectId: string | null
  dueDate: string | null  // ISO 8601
  createdAt: string       // ISO 8601
  updatedAt: string       // ISO 8601
}
```

---

## Business Rules

| ID | Rule |
|----|------|
| RN-TASK-01 | Board view is the default view on first visit; selection persists via zustand |
| RN-TASK-02 | Dragging a card between columns updates that task's `status` field |
| RN-TASK-03 | Draggable cards must use the `layout` prop for positional animation (dnd-kit + motion integration) |
| RN-TASK-04 | Cards animate with `motion.div` on mount and exit |
| RN-TASK-05 | List view table rows use `motion.tr` for animations |
| RN-TASK-06 | Project dropdown in the form is populated from `shared/hooks/use-projects` — no direct import of projects feature |
| RN-TASK-07 | List view supports sorting by priority and due date |
| RN-TASK-08 | List view supports filtering by status and priority |
| RN-TASK-09 | Row click in list view opens the edit drawer for that task |

---

## State: zustand UI Store

Located at `src/features/tasks/` or `src/shared/` (wherever the UI store lives).

```ts
type TaskView = 'board' | 'list'

type UIStore = {
  taskView: TaskView
  setTaskView: (view: TaskView) => void
}
```

---

## Acceptance Criteria

| ID | Scenario |
|----|----------|
| AC-TASK-01 | Given an authenticated user visits `/tasks`, then the board view is shown by default with 4 columns |
| AC-TASK-02 | Given the user drags a card from "Todo" to "Done", then the task's status updates to `done` |
| AC-TASK-03 | Given the user clicks the List toggle, then the list view is shown with a TanStack Table |
| AC-TASK-04 | Given the user sorts by due date in list view, then tasks reorder accordingly |
| AC-TASK-05 | Given the user filters by status `in_progress`, then only in-progress tasks are shown |
| AC-TASK-06 | Given the user clicks a row in list view, then the edit drawer opens for that task |
| AC-TASK-07 | Given the user submits the create task form with valid data, then the task appears in the board |
| AC-TASK-08 | Given form validation fails (e.g., missing title), then field-level errors are shown |
| AC-TASK-09 | Given the user switches views, then the selected view is preserved on navigation back to `/tasks` |

---

## Test Coverage

- Unit (vitest): task status update (drag) — happy path, error path
- Unit (vitest): task create mutation — happy path, error path
- E2E (Playwright): Create task → drag task to Done (part of cross-feature flow)
- E2E (Playwright): List view — sort by due date, filter by status
