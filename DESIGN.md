# Orbit Clarity — Design System

Source of truth for the visual identity of Orbit Task Manager.
Generated from Stitch project `2647547957648873866`, refined through implementation.

## Identity

**Name:** Orbit Clarity
**Domain:** Personal task management for solo users
**Mood:** Clean, spacious, calming — inspired by Todoist, MonoDesk, and Linear
**Stitch Project:** https://stitch.withgoogle.com/project/2647547957648873866/

## Color Palette

### Primary (Indigo)

| Token         | Value                | Usage                                        |
| ------------- | -------------------- | -------------------------------------------- |
| `primary-50`  | oklch(0.96 0.02 277) | Active nav background, selected option bg    |
| `primary-100` | oklch(0.93 0.04 277) | Avatar fallback bg, active nav hover         |
| `primary-500` | oklch(0.55 0.22 277) | Brand accent — buttons, toggles, focus rings |
| `primary-600` | oklch(0.49 0.22 277) | Primary button hover, active states          |

### Surfaces

| Token         | Value                 | Usage                              |
| ------------- | --------------------- | ---------------------------------- |
| `background`  | oklch(0.98 0.005 264) | Page background (cool gray)        |
| `surface`     | oklch(1 0 0)          | Cards, inputs, sidebar, topbar     |
| `surface-alt` | oklch(0.97 0.005 264) | Hover backgrounds, disabled inputs |
| `border`      | oklch(0.92 0.005 264) | Borders, separators, dividers      |

### Text

| Token            | Value                 | Usage                             |
| ---------------- | --------------------- | --------------------------------- |
| `text-primary`   | oklch(0.15 0.02 264)  | Headings, body text, input values |
| `text-secondary` | oklch(0.55 0.02 264)  | Labels, placeholders, metadata    |
| `text-inverse`   | oklch(0.98 0.005 264) | Text on dark/primary backgrounds  |

### Status

| Token            | Value                | Usage                                        |
| ---------------- | -------------------- | -------------------------------------------- |
| `status-success` | oklch(0.65 0.17 162) | Success badges, toasts, icons                |
| `status-error`   | oklch(0.58 0.22 27)  | Error borders, messages, destructive buttons |
| `status-warning` | oklch(0.75 0.15 75)  | Warning badges, toasts                       |
| `status-info`    | oklch(0.65 0.15 200) | Info badges, toasts                          |

### Dark Mode Surfaces

| Token          | Value                | Usage                                   |
| -------------- | -------------------- | --------------------------------------- |
| `dark-bg`      | oklch(0.15 0.02 264) | Page background in dark mode            |
| `dark-surface` | oklch(0.21 0.02 264) | Cards, sidebar, inputs in dark mode     |
| `dark-border`  | oklch(0.30 0.02 264) | Borders, hover backgrounds in dark mode |

## Typography

**Font:** Inter (Google Fonts) — 400, 500, 600, 700 weights

| Role       | Weight         | Size     | Usage                                 |
| ---------- | -------------- | -------- | ------------------------------------- |
| Display    | 700 (bold)     | text-4xl | Page titles, hero headings            |
| Heading    | 600 (semibold) | text-2xl | Section headings                      |
| Subheading | 600 (semibold) | text-lg  | Sub-section headings                  |
| Label      | 500 (medium)   | text-sm  | Form labels, nav items, badge text    |
| Body       | 400 (regular)  | text-sm  | Body text, input values, descriptions |
| Caption    | 400 (regular)  | text-xs  | Metadata, timestamps, helper text     |

**Line height:** 1.5 globally. Negative letter-spacing (-0.02em) on display headings.

## Shape & Elevation

### Border Radius

| Token  | Value  | Usage                             |
| ------ | ------ | --------------------------------- |
| `sm`   | 4px    | Checkboxes, small badges          |
| `md`   | 8px    | Cards, inputs, buttons, dropdowns |
| `lg`   | 12px   | Large cards, modals               |
| `full` | 9999px | Avatars, toggles, pill badges     |

### Shadows

| Token | Value                        | Usage                       |
| ----- | ---------------------------- | --------------------------- |
| `sm`  | 0 1px 2px rgb(0 0 0 / 0.05)  | Cards (default variant)     |
| `md`  | 0 4px 6px rgb(0 0 0 / 0.07)  | Dropdowns, tooltips, toasts |
| `lg`  | 0 10px 15px rgb(0 0 0 / 0.1) | Modals, dialogs             |

## Layout

### App Shell

- **Sidebar:** 240px expanded, 64px collapsed. Fixed left, full height, z-50
- **TopBar:** Sticky, h-14, z-40, backdrop-blur with 80% opacity surface
- **Content area:** ml-60 (or ml-16 collapsed), p-6, min-h-screen
- **Mobile:** Sidebar hidden, hamburger in topbar, slide-in overlay nav

### Spacing Philosophy

4px/8px grid. Generous whitespace. Content breathes.

| Context                    | Spacing              |
| -------------------------- | -------------------- |
| Compact (badge, tooltip)   | 4-8px (p-1 to p-2)   |
| Standard (inputs, buttons) | 12-16px (p-3 to p-4) |
| Spacious (cards, sections) | 24-32px (p-6 to p-8) |
| Sections gap               | 64px (space-y-16)    |

### Z-Index Map

| Layer        | Z-Index |
| ------------ | ------- |
| Base content | z-0     |
| Sidebar      | z-50    |
| TopBar       | z-40    |
| Dropdowns    | z-[60]  |
| Modal/Dialog | z-[70]  |
| Toast        | z-[80]  |

## Interaction Patterns

### Hover

- **Buttons/nav:** Neutral background shift (surface-alt in light, dark-border in dark)
- **Primary buttons:** Darken brand (primary-500 → primary-600)
- **Form inputs:** Border darkens (border → text-secondary)
- **Cards:** Not hovered by default (add hover:shadow-md when interactive)
- **Rule:** Brand color in ONE channel per element. Hover uses neutral tokens only (except primary variant).

### Focus

- **Form inputs:** `-outline-offset-1` overlay on border, `border-transparent` to hide original
- **Buttons/nav:** `outline-offset-2` ring outside element
- **Color:** `outline-primary-500` (2px width)

### Active/Pressed

- `active:scale-[0.98]` on all button variants

### Disabled

- `opacity-50 cursor-not-allowed` on all interactive elements

### Transitions

- 150-200ms ease-out for color/background changes
- 200ms for sidebar collapse/expand
- motion/react AnimatePresence for modals and mobile nav

## Dark Mode

Full dark mode via `dark:` Tailwind prefix (class strategy on `<html>`).

**Every light-mode token must have a dark counterpart:**

- `bg-surface` → `dark:bg-dark-surface`
- `border-border` → `dark:border-dark-border`
- `text-text-primary` → `dark:text-text-inverse`
- `hover:bg-surface-alt` → `dark:hover:bg-dark-border`
- `bg-primary-100` → `dark:bg-primary-500/20`

## Component Patterns

### Cards

White surface, rounded-md, shadow-sm (default) or border (outlined). Dark mode: dark-surface bg.

### Buttons

4 variants: primary (indigo fill), secondary (surface + border), ghost (transparent), destructive (error fill). 3 sizes: sm/md/lg. All support loading spinner.

### Form Inputs

Consistent h-10 height, px-3 padding, border-border, rounded-md. Error state: border-status-error. Custom Select dropdown (no native chrome). Hidden native checkbox with styled visual.

### Badges

Pill-shaped (rounded-full). Status variants use 10% opacity background of the status color.

### Overlays

Modals: createPortal to body, z-[70], backdrop blur. Tooltips: z-[60], positioned relative. Toasts: z-[80], fixed bottom-right, auto-dismiss.
