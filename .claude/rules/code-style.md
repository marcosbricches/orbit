---
description: Preferred code patterns — soft guidelines for consistency
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Code Style — Preferred Patterns

## Component conventions
- Props as separate interface: interface MyComponentProps { ... }
- interface for component props and public contracts
- type for unions, intersections and utilities

## Feature structure
Each feature in src/features/<name>/ contains:
- types.ts — feature interfaces and types
- api/ — data access (API client, queries, localStorage)
- hooks/ — state, side effects, business logic
- components/ — React components for the feature

## Naming
- Hooks: use<Name> — describe what the hook manages
- Components: PascalCase, named after the UI element
- API files: <name>.api.ts for client calls, <name>.queries.ts for react-query defs
