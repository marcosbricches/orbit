# Global Rules

Cross-cutting rules that apply to every feature in Orbit. Violations block commit.

## Architecture

| ID | Description |
|----|-------------|
| RN-ARCH-01 | Import direction: `shared → features → app`. Only `app/routes/` may import multiple features. |
| RN-ARCH-02 | Cross-feature data must flow exclusively through `shared/hooks/` — no direct cross-feature imports. |
| RN-ARCH-03 | Types used by 2+ features must live in `src/types/index.ts` from day one. |
| RN-ARCH-04 | Named exports only — no barrel `export * from` re-exports. One symbol per import path in index files. |

## TypeScript

| ID | Description |
|----|-------------|
| RN-TS-01 | `erasableSyntaxOnly: true` is enforced — use union types (`type X = 'a' \| 'b'`) or `as const`. The `enum` keyword is forbidden. |
| RN-TS-02 | All shared types for 2+ features must be defined in `src/types/index.ts` before being referenced anywhere. |

## Styling

| ID | Description |
|----|-------------|
| RN-STYLE-01 | Token-First — use `@theme` tokens and Tailwind utilities exclusively. Zero hardcoded hex, rgba, or inline style values. |
| RN-STYLE-02 | Canvas/WebGL is the only approved exception to Token-First — hardcoded hex is allowed only where CSS custom properties cannot be evaluated (e.g., `html2canvas`, Canvas API). |

## Auth / Security

| ID | Description |
|----|-------------|
| RN-AUTH-01 | All routes except `/login` and `/register` are protected. Unauthenticated access redirects to `/login`. |
| RN-AUTH-02 | Protected route guard is implemented via TanStack Router `beforeLoad` AND a `useEffect` on auth state to handle logout redirect from within a mounted component. |
| RN-AUTH-03 | In development (`import.meta.env.DEV`), `use-auth.ts` sets a default dev user automatically to skip manual login. |

## Components

| ID | Description |
|----|-------------|
| RN-COMP-01 | Components must not exceed 200 lines. Extract hooks when logic exceeds 50 lines. |
| RN-COMP-02 | Use `motion.tbody` / `motion.tr` for animated table rows. |
| RN-COMP-03 | Use the `layout` prop on dnd-kit draggables for positional animation. |
| RN-COMP-04 | Use `createElement(getComp(name), props)` for dynamic component selection. |
| RN-COMP-05 | Every `useQuery` / `useMutation` must have an error state. Use `isPending` + `Skeleton` for loading states. |

## Testing

| ID | Description |
|----|-------------|
| RN-TEST-01 | Each API endpoint requires at minimum 1 happy-path test and 1 error test (vitest). |
| RN-TEST-02 | E2E flows (Playwright): Login → view dashboard; Create project → create task → drag task to Done; List view sort and filter. |
