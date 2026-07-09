---
name: Nebula
description: Dark-first workspace console for a team directory, post feed, and task/photo browser — teal on deep navy-slate, glass surfaces, generous rounded corners. Built on shadcn + Tailwind v4 tokens.
colors:
  background: '#0e1320'
  foreground: '#ffffff'
  card: '#141a28'
  card-foreground: '#ffffff'
  popover: '#141a28'
  popover-foreground: '#ffffff'
  primary: '#14b8a6'
  primary-foreground: '#04231f'
  secondary: '#141a28'
  secondary-foreground: '#c7ced9'
  muted: '#0e1320'
  muted-foreground: '#909eb3'
  accent: '#1e2636'
  accent-foreground: '#5eead4'
  destructive: '#ef4444'
  destructive-foreground: '#ffffff'
  danger: '#ef4444'
  danger-foreground: '#ffffff'
  warning: '#f59e0b'
  warning-foreground: '#04231f'
  success: '#22c55e'
  success-foreground: '#04231f'
  info: '#06b6d4'
  info-foreground: '#04231f'
  help: '#a855f7'
  help-foreground: '#ffffff'
  border: '#232b3d'
  input: '#141a28'
  ring: '#2dd4bf'
  chart-1: '#14b8a6'
  chart-2: '#5eead4'
  chart-3: '#5b7fff'
  chart-4: '#f59e0b'
  chart-5: '#a855f7'
  sidebar: '#0b0f18'
  sidebar-foreground: '#909eb3'
  sidebar-primary: '#14b8a6'
  sidebar-primary-foreground: '#04231f'
  sidebar-accent: '#141a28'
  sidebar-accent-foreground: '#e2e8f0'
  sidebar-border: '#232b3d'
  sidebar-ring: '#2dd4bf'
  primary-50: '#ecfdf5'
  primary-100: '#ccfbf1'
  primary-200: '#99f6e4'
  primary-300: '#5eead4'
  primary-400: '#2dd4bf'
  primary-500: '#14b8a6'
  primary-600: '#0f8c8c'
  primary-700: '#0f766e'
  primary-800: '#115e59'
  primary-900: '#134e4a'
  primary-950: '#042f2e'
  secondary-50: '#f1f5f9'
  secondary-100: '#e2e8f0'
  secondary-200: '#cbd5e1'
  secondary-300: '#94a3b8'
  secondary-400: '#64748b'
  secondary-500: '#475569'
  secondary-600: '#334155'
  secondary-700: '#1e293b'
  secondary-800: '#141a28'
  secondary-900: '#0e1320'
  secondary-950: '#070b14'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: '-0.02em'
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.02em'
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: '-0.01em'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.3
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: '0.01em'
rounded:
  sm: 0.6rem
  md: 0.8rem
  lg: 1rem
  xl: 1.4rem
  2xl: 1.8rem
  3xl: 2.2rem
  4xl: 2.6rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    rounded: '{rounded.xl}'
    padding: 12px 20px
  button-primary-hover:
    backgroundColor: '{colors.primary-400}'
  button-ghost:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.full}'
    padding: 10px 18px
  chip:
    backgroundColor: '{colors.card}'
    textColor: '{colors.muted-foreground}'
    rounded: '{rounded.full}'
    padding: 6px 14px
  chip-active:
    backgroundColor: '{colors.foreground}'
    textColor: '{colors.background}'
    rounded: '{rounded.full}'
  card:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-foreground}'
    rounded: '{rounded.3xl}'
    padding: 24px
  card-hero:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-foreground}'
    rounded: '{rounded.4xl}'
    padding: 32px
  input:
    backgroundColor: '{colors.input}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.full}'
    padding: 12px 20px
---

## Overview

**Nebula** is a dark-first workspace console for browsing a small organization's
activity: people, posts, tasks, and photo albums. The mood is a focused night
shift — deep navy-slate space lit only by content and a single electric teal
marking what's active or actionable. Surfaces feel like frosted glass floating
over a dark backdrop; corners are generously rounded so the UI reads soft and
modern, never boxy. Restraint on color, drama on depth and glow — the interface
gets out of the way of the directory, the feed, and the task list it's showing.

## Colors

Dark-first. Navy-slate neutrals carry the UI; **teal (`primary`) is the only
accent** — reserve it for interaction: primary buttons, active states, focus
rings, key metrics/highlights.

- **background (#0e1320):** Deep navy-slate. The night sky everything sits on.
- **card / popover (#141a28):** Lifted panel, one step above background.
- **primary (#14b8a6):** Electric teal — the brand + sole interaction driver.
  Full ramp `primary-50…950` (teal) for hover/subtle/emphasis.
- **primary-foreground (#04231f):** Dark teal-ink for text on teal fills (AA-safe).
- **secondary (#141a28):** Neutral surface for ghost buttons / secondary chrome.
- **muted-foreground (#909eb3):** Captions, metadata, inactive icons.
- **accent (#1e2636) / accent-foreground (#5eead4):** shadcn hover-surface role —
  subtle raised background with a teal-tinted foreground (menu/hover states).
- **border (#232b3d):** Hairline separation. Low contrast by design.
- **ring (#2dd4bf):** Focus outline; also the glow color.
- **Semantic** (`destructive`/`danger` red, `warning` amber, `success` green,
  `info` cyan, `help` violet): status only, never decoration.

Teal glow: `box-shadow: 0 0 24px rgba(45,212,191,0.35)` on primary CTAs and the
active media card. Sparingly — glow marks the one thing that matters on a view.

## Typography

Plus Jakarta Sans (`--font-sans`) throughout — one family, weight + size carry
hierarchy.

- **Display / H1:** Bold (700), tight tracking (-0.02em). Hero titles, page headers.
- **H2:** Semibold (600). Section headers ("Recent activity", "Team directory").
- **Body:** Regular (400), 1.6 line-height for readability on dark.
- **Label:** Medium (500), 0.8125rem. Buttons, chips, nav items.
- **Caption:** 0.75rem, `muted-foreground`. Metadata, ratings, timestamps.

## Layout

- **Spacing scale:** 4 / 8 / 16 / 24 / 40 / 64px. Default gutter 24px; section gap 40px.
- **App shell:** persistent left sidebar (`sidebar` tokens) + scrollable content
  for directory/feed/task views. Generous outer padding (24–40px).
- **Grids:** people and photo cards in responsive grids, 16–24px gaps. Horizontal
  scroll rows for carousels (recent posts, recent albums).
- **Density:** comfortable, not compact. Whitespace is part of the focused feel.

## Elevation & Depth

Depth comes from blur, glow, and subtle shadow — not heavy drop shadows.

- **Surface lift:** `card`/`secondary` over `background` + `border` hairline.
- **Glass:** translucent `card` + `backdrop-filter: blur(20px)` for profile/album overlays.
- **Glow:** teal `box-shadow` on the single focal element (selected user, primary CTA).
- **Card shadow (optional):** `0 8px 32px rgba(0,0,0,0.4)` for floating cards.

## Shapes

Everything rounds. Base radius is 1rem (`rounded-lg`); scale up for larger surfaces.

- **sm (0.6rem) / md (0.8rem):** nested elements, small tiles, inline controls.
- **lg (1rem):** buttons, default controls — the base.
- **xl (1.4rem):** prominent buttons, small cards.
- **2xl (1.8rem):** photo/album and person cards.
- **3xl (2.2rem):** main content cards, panels (post feed, task lists).
- **4xl (2.6rem):** hero surfaces, profile headers.
- **full (9999px):** chips, filter tabs, search inputs, avatar/icon buttons, pills.

Pills everywhere for controls (search bar, status filters, ghost buttons) — the
signature move. Big rounded rectangles for content.

## Components

- **button-primary:** `bg-primary text-primary-foreground rounded-xl` + teal glow. The one CTA.
- **button-ghost:** `bg-secondary text-foreground rounded-full`. Secondary actions.
- **chip / chip-active:** glass pill (`bg-card text-muted-foreground`) → active
  `bg-foreground text-background`. Status/filter tabs (e.g. todo completed/pending).
- **card:** `bg-card rounded-3xl` 24px padding. Standard content container (post, todo row, album tile).
- **card-hero:** translucent `card`, `rounded-4xl`, blur, optional teal glow. Selected user's profile panel.
- **input:** `bg-input rounded-full`, 20px horizontal padding. Search-first.

## Do's and Don'ts

- **Do** consume tokens (utilities / CSS vars) — never inline hex in components.
- **Do** keep teal rare — one accent moment per view. Its power is scarcity.
- **Do** use glass + blur for overlays on avatars and photo tiles.
- **Do** let avatar/photo imagery provide the color; chrome stays neutral navy.
- **Do** round generously — pills for controls, big radii for cards.
- **Don't** introduce a second accent hue. Semantic colors are for status only.
- **Don't** use pure black backgrounds — base is navy-slate (`background`), not #000.
- **Don't** stack heavy drop shadows; depth is blur + glow + subtle lift.
- **Don't** tighten spacing to cram content — the focused feel needs room.
