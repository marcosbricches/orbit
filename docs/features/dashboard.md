# Feature: Dashboard

## Metadata

| Field | Value |
|-------|-------|
| Phase | 4 |
| Routes | `/dashboard` |
| Depends on | Auth, Projects, Tasks |
| Shared hooks consumed | `shared/hooks/use-auth.ts`, `shared/hooks/use-projects.ts` |

## Overview

The Dashboard is the landing page for authenticated users. It provides an at-a-glance view of task metrics via stats cards and a chronological activity feed showing the last 10 actions across the workspace.

---

## Screens / UI

### Stats Cards

Four cards displayed in a responsive grid:

| Card | Metric | Source |
|------|--------|--------|
| Total Tasks | Count of all tasks | TanStack Query aggregation over tasks |
| Completed This Week | Count of tasks with `status: 'done'` and `updatedAt` within current week | Tasks data |
| Overdue Tasks | Count of tasks where `dueDate < today` and `status !== 'done'` | Tasks data |
| Active Projects | Count of projects with `status: 'active'` | `use-projects` shared hook |

- Each card uses `isPending` + `Skeleton` while data loads
- Each card shows an error state if the query fails

### Activity Feed

- Displays the last 10 activity records
- Each entry shows: description, entity type icon, relative timestamp (e.g. "2 hours ago")
- Relative timestamps computed via `date-fns` (`formatDistanceToNow`)
- Sorted newest-first
- Shows `isPending` + `Skeleton` while loading

---

## Data Shape

Defined in `src/types/index.ts`:

```ts
Activity {
  id: string
  type: ActivityType       // 'task_created' | 'task_moved' | 'task_updated' | 'project_created' | 'project_updated' | 'project_archived'
  entityId: string
  entityType: 'task' | 'project'
  description: string
  createdAt: string        // ISO 8601
  userId: string           // references User.id
}
```

---

## Business Rules

| ID | Rule |
|----|------|
| RN-DASH-01 | Stats are computed client-side via TanStack Query aggregation — no dedicated stats endpoint |
| RN-DASH-02 | "Completed this week" counts tasks with `status === 'done'` and `updatedAt` falling in the current calendar week |
| RN-DASH-03 | "Overdue" counts tasks where `dueDate` is before today's date and `status !== 'done'` |
| RN-DASH-04 | Activity feed shows at most the 10 most recent activity records, sorted by `createdAt` descending |
| RN-DASH-05 | Relative timestamps use `date-fns` `formatDistanceToNow` — no custom implementation |
| RN-DASH-06 | Active projects count comes from `shared/hooks/use-projects` — no direct import from projects feature |
| RN-DASH-07 | All stats cards and the activity feed must have loading (Skeleton) and error states |

---

## Acceptance Criteria

| ID | Scenario |
|----|----------|
| AC-DASH-01 | Given an authenticated user visits `/dashboard`, then 4 stats cards and the activity feed are rendered |
| AC-DASH-02 | Given tasks data is loading, then stats cards show skeleton placeholders |
| AC-DASH-03 | Given a task has `dueDate` before today and `status !== 'done'`, then it is counted in Overdue Tasks |
| AC-DASH-04 | Given a task was moved to `done` this week, then it is counted in Completed This Week |
| AC-DASH-05 | Given the activity feed loads, then the 10 most recent entries are shown with relative timestamps |
| AC-DASH-06 | Given a query fails, then the affected card or feed shows an error state |

---

## Test Coverage

- Unit (vitest): activity feed query — happy path, error path
- Unit (vitest): stats aggregation — overdue calculation, completed-this-week calculation
- E2E (Playwright): Login → view dashboard (confirms routing and data load)
