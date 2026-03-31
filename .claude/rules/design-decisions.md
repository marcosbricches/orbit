---
description: Approved exceptions to guardrails — /review auto-loads to skip approved patterns
---

# Design Decisions

<!-- Approved exceptions added during /build and /review. Format: file + violation + reason -->

## projects feature (2026-03-31)

- **ProjectCard + ProjectDetail**: `style={{ backgroundColor: project.color }}` — approved Token-First exception; project colors are user-chosen hex values (data), not design tokens.
- **shared/hooks/use-projects.ts**: imports from `features/projects/api/` — violates `shared → features` direction; accepted to match existing `use-auth.ts` pattern.
- **features/projects/types.ts + api/projects.api.ts**: hex color literals are data constants for user-selectable palette, not hardcoded CSS — exempt from Token-First rule.

## dashboard feature (2026-03-31)

- **shared/hooks/use-tasks.ts**: imports from `features/tasks/api/` — same `shared → features` direction violation as `use-projects.ts`; accepted for consistency.
- **motion Variants type annotation required**: `const x: Variants = { ..., ease: 'easeOut' }` — without the Variants type, TypeScript infers `ease` as `string` which conflicts with the `Easing` union type, causing a build failure. Always type motion variant objects with `import type { Variants } from 'motion/react'`.

## review a11y pass (2026-03-31)

- **`--color-text-muted`**: Added `oklch(0.42 0.02 264)` token for xs/sm text on light backgrounds where `text-text-secondary` (~4.1:1) fails WCAG AA 4.5:1. Use `text-text-muted` for timestamps, secondary labels, and inactive tab text.
- **`--color-status-*-fg`**: Added dark foreground tokens (e.g. `--color-status-success-fg: oklch(0.38 0.15 162)`) for Badge text on `/10` opacity tinted backgrounds. Badge component uses `text-status-*-fg` in light mode, `text-status-*` in dark mode.
- **TanStack Router `activeProps` class cascade**: `activeProps.className` is APPENDED to base `className` — conflicting Tailwind color classes coexist and order in the generated CSS sheet determines the winner. Fix: move inactive-only text colors to `inactiveProps.className` to guarantee mutual exclusion.
- **ProjectCard nested-interactive pattern**: `<article role="button">` containing a `<button>` violates WCAG 4.1.2. Use invisible overlay button (`absolute inset-0 z-0`) for the card click target; content at `relative z-10`. Article has no interactive role.
- **Axe + stagger animation false positives**: axe-core scans elements mid-animation and computes composited opacity as contrast color. Add `waitForTimeout(800)` in a11y specs after `networkidle` to ensure all stagger animations complete before scanning.
