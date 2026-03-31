# Feature: Auth

## Metadata

| Field | Value |
|-------|-------|
| Phase | 1 |
| Routes | `/login`, `/register` |
| Shared hook produced | `shared/hooks/use-auth.ts` |
| Depends on | — |

## Overview

Auth is the foundation feature. It provides session state, login/register pages, a protected route wrapper, and dev auto-login. Every other feature depends on auth being present.

---

## Screens / UI

### Login Page (`/login`)

| Field | Type | Validation |
|-------|------|------------|
| Email | text input | required, valid email format |
| Password | password input | required, min 8 characters |
| Submit button | button | triggers login mutation |

- On success: redirect to `/dashboard`
- On error: display inline error message below the form
- Link to `/register`

### Register Page (`/register`)

| Field | Type | Validation |
|-------|------|------------|
| Name | text input | required, min 2 characters |
| Email | text input | required, valid email format |
| Password | password input | required, min 8 characters |
| Confirm Password | password input | required, must match Password |
| Submit button | button | triggers register mutation |

- On success: auto-login and redirect to `/dashboard`
- On error: display inline error message below the form
- Link to `/login`

### Protected Route Wrapper

- Wraps all routes except `/login` and `/register`
- Checks auth state via `beforeLoad` (TanStack Router)
- Also checks via `useEffect` to handle mid-session logout
- Redirects to `/login` on unauthenticated access

---

## Business Rules

| ID | Rule |
|----|------|
| RN-AUTH-01 | All routes except `/login` and `/register` are protected; unauthenticated access redirects to `/login` |
| RN-AUTH-02 | Protected route guard uses both `beforeLoad` AND `useEffect` on auth state |
| RN-AUTH-03 | When `import.meta.env.DEV` is true, `use-auth.ts` sets a default dev user automatically — no manual login needed |
| RN-AUTH-04 | Zod schema validates all login and register form fields before submission |

---

## Shared Hook: `use-auth.ts`

Located at `src/shared/hooks/use-auth.ts`.

Responsibilities:
- Expose current `user: User | null`
- Expose `isAuthenticated: boolean`
- Expose `login(email, password)` mutation
- Expose `register(name, email, password)` mutation
- Expose `logout()` action
- In DEV mode: set default `DEV_USER` automatically on hook initialization

---

## Acceptance Criteria

| ID | Scenario |
|----|----------|
| AC-AUTH-01 | Given a guest visits `/dashboard`, when the page loads, then they are redirected to `/login` |
| AC-AUTH-02 | Given a guest submits valid credentials on `/login`, when the request succeeds, then they are redirected to `/dashboard` |
| AC-AUTH-03 | Given a guest submits invalid credentials on `/login`, when the request fails, then an error message is shown |
| AC-AUTH-04 | Given a user on `/dashboard` logs out, when logout is triggered, then they are redirected to `/login` |
| AC-AUTH-05 | Given `import.meta.env.DEV` is true, when the app starts, then the user is automatically logged in as DEV_USER |
| AC-AUTH-06 | Given a guest submits the register form with mismatched passwords, then a validation error is shown |

---

## Test Coverage

- Unit (vitest): `use-auth` — happy-path login, error on invalid credentials
- E2E (Playwright): Login → view dashboard
