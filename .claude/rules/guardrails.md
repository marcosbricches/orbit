---
description: Bulletproof-React hard rules — violations block commit
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Guardrails — Bulletproof-React

## Architecture
- Dependency direction: shared/ → features/ → app/ (never reversed)
- Features are self-contained: types.ts, api/, hooks/, components/
- Business logic in hooks, not in components
- src/app/App.tsx must have < 50 lines (only AppProviders + AppRoutes)
- shared/ → imports only external libs and src/types/
- features/<name>/ → imports shared/ and src/types/ ONLY (never other features)
- app/routes/ → only layer that can import multiple features

## Imports
- NO barrel exports: index.ts does NOT re-export multiple modules
- NO cross-feature imports: features/A never imports from features/B
- Direct imports: import { Button } from '@/shared/ui/Button'

## TypeScript
- No any — use unknown + type guards
- No enum keyword — use union types or as const

## Components
- Named arrow functions: export const MyComponent = () => { ... }
- One component per file

## Token-First — Tailwind v4 (CRITICAL)
- FORBIDDEN: #hex, rgba(), style={{literals}}, bg-[#...]
- CORRECT: @theme tokens in index.css → generated classes; standard Tailwind scale
- New value → define token in @theme BEFORE using

## Cross-feature actions
- Feature A NEVER imports from Feature B
- Lift state to AppRoutes → callbacks via props
