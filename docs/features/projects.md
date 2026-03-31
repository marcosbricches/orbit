# Feature: Projects

## Metadata

| Field | Value |
|-------|-------|
| Phase | 2 |
| Routes | `/projects`, `/projects/:projectId` |
| Shared hook produced | `shared/hooks/use-projects.ts` |
| Depends on | Auth |

## Overview

The Projects feature lets authenticated users create, view, edit, and archive projects. Projects are the organizational unit that tasks belong to. The shared `use-projects` hook is consumed by the Tasks feature (project selector) and the Dashboard feature (project filter).

---

## Screens / UI

### Project List (`/projects`)

- Grid of project cards
- Each card displays: name, description, color badge, status
- Filter by status: `active | archived` (default: `active`)
- "New Project" button opens the Create Project form/drawer

### Project Card

| Element | Description |
|---------|-------------|
| Color badge | Colored dot or strip using the project's color token |
| Name | Project name as heading |
| Description | Truncated description text |
| Status | Badge showing `active` or `archived` |

### Project Detail (`/projects/:projectId`)

- Project header: name, description, color, status
- Edit button → opens Edit Project form/drawer
- Archive button → sets status to `archived` (with confirmation)
- List of tasks belonging to this project — uses the same TanStack Table as Tasks list view

### Create / Edit Project Form

| Field | Type | Validation |
|-------|------|------------|
| Name | text input | required, min 2 characters |
| Description | textarea | optional |
| Color | color picker (preset palette) | required; preset palette of tokens |
| Status | select (`active` \| `archived`) | required |

- Validation via zod
- Form powered by `@tanstack/react-form`
- On success: invalidate `use-projects` query and navigate to project detail

---

## Data Shape

Defined in `src/types/index.ts`:

```ts
Project {
  id: string
  name: string
  description: string
  color: string          // preset palette token key
  status: ProjectStatus  // 'active' | 'archived'
  createdAt: string      // ISO 8601
  ownerId: string        // references User.id
}
```

---

## Business Rules

| ID | Rule |
|----|------|
| RN-PROJ-01 | Project list defaults to showing `active` projects; user can filter to `archived` |
| RN-PROJ-02 | Color must be selected from a preset palette of design token color keys |
| RN-PROJ-03 | Archiving a project sets its status to `archived` and removes it from the default active filter |
| RN-PROJ-04 | The `use-projects` shared hook is the only source of project data for other features |
| RN-PROJ-05 | The task list on `/projects/:projectId` uses the same TanStack Table component as the Tasks list view |

---

## Shared Hook: `use-projects.ts`

Located at `src/shared/hooks/use-projects.ts`.

Responsibilities:
- Expose `projects: Project[]`
- Expose `isLoading: boolean` and `error` state
- Expose `createProject(data)` mutation
- Expose `updateProject(id, data)` mutation
- Expose `archiveProject(id)` mutation
- Used by: Tasks (project selector dropdown), Dashboard (project count stat), Projects feature itself

---

## Acceptance Criteria

| ID | Scenario |
|----|----------|
| AC-PROJ-01 | Given an authenticated user visits `/projects`, when the page loads, then they see a grid of their active projects |
| AC-PROJ-02 | Given the user selects the "archived" filter, then only archived projects are displayed |
| AC-PROJ-03 | Given the user fills the create project form and submits, when successful, then the new project appears in the list |
| AC-PROJ-04 | Given the user visits `/projects/:projectId`, then they see the project header and a list of its tasks |
| AC-PROJ-05 | Given the user clicks Archive on a project detail page, then the project status changes to `archived` |
| AC-PROJ-06 | Given form validation fails (e.g., missing name), then field-level error messages are displayed |

---

## Test Coverage

- Unit (vitest): `use-projects` — happy-path fetch, error on fetch failure
- Unit (vitest): create project mutation — happy path, error path
- E2E (Playwright): Create project → create task (part of cross-feature flow)
