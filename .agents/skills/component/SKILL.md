---
name: component
description: >
  Generate, refactor, or edit React components following the teslo-shop component pattern (4 files: tsx + interfaces + css + index barrel).
  Use whenever working with any component in this project — creating new ones, refactoring existing ones, or editing component structure.
  Trigger on: "create X component", "new component", "refactor Y", "edit component", "add component", or any task that results in producing or modifying a component folder.
  Do NOT skip this skill just because a component "looks simple" — the pattern is mandatory for all components in this project.
---

# React Component Pattern

Always generate all 4 files. Never skip any.

## File Structure

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.interfaces.ts
├── ComponentName.css
└── index.ts
```

---

## 1. ComponentName.interfaces.ts

```typescript
import type { IWithRootProps } from '@/shared/interfaces/component.interfaces';
// other import types as needed

export interface IComponentNameVM {
  // Minimum UI primitive contract: strings, numbers, arrays, plain objects
  // No React types, no library imports — pure data shape only
}

export interface IComponentNameProps extends IWithRootProps<'section'>, IComponentNameVM {
  // React-specific additions: ReactNode, event handlers, refs, library types
}
```

**Rules:**

- `IVM` = data contract only. If a type requires importing from React or a library, it does NOT belong here.
- `IProps` = `IWithRootProps<tag>` + `IVM` + any React/lib deps needed to render.
- Infer the correct semantic HTML tag for `IWithRootProps<tag>` from the component's purpose (`article`, `section`, `aside`, `nav`, `div`, `ul`, `li`, etc.).
- All imports must use `import type`.

---

## 2. ComponentName.tsx

```tsx
import { cn } from '@/shared/lib/utils';

import type { IComponentNameProps } from './ComponentName.interfaces';

import './ComponentName.css';

export const ComponentName = ({ rootProps, ...vmProps }: IComponentNameProps) => {
  return (
    <section {...rootProps} className={cn('component-name-container', rootProps?.className)}>
      {/* child elements use cn('prefix__child-name', ...) */}
    </section>
  );
};
```

**Rules:**

- Named export only (`export const`). No default export.
- Replace `section` with the tag that matches `IWithRootProps<tag>`.
- Always spread `rootProps` on the root element.
- Always merge classes with `cn()`: base class first, then `rootProps?.className`.
- Child elements use `cn('prefix__child-name', childProps?.className)` when they also accept external props.

---

## 3. ComponentName.css

```css
@reference "@styles/app.css";

.component-name-container {
  @apply /* root styles */;

  .prefix__child {
    @apply /* child styles */;
  }
}
```

**Rules:**

- First line is always `@reference "@styles/app.css";`.
- Root class always ends in `-container`.
- All child classes must be nested inside the root class — never flat at the top level.
- Child classes always use the abbreviation prefix (`prefix__child-name`).

---

## 4. index.ts

```typescript
export * from './ComponentName';
export * from './ComponentName.interfaces';
```

---

## CSS Naming System

### Root class

`component-name-container` — kebab-case of the component name + `-container`.

| Component       | Root class                 |
| --------------- | -------------------------- |
| `Loading`       | `loading-container`        |
| `ProductCard`   | `product-card-container`   |
| `CardDashboard` | `card-dashboard-container` |

### Child prefix

Take the first letter of each word in the root class, excluding the word `container`.

| Root class                 | Words (excl. `container`)      | Prefix                  |
| -------------------------- | ------------------------------ | ----------------------- |
| `loading-container`        | `loading` → `l`                | `lc__` — wait, see note |
| `product-card-container`   | `product`, `card` → `p`, `c`   | `pcc__`                 |
| `card-dashboard-container` | `card`, `dashboard` → `c`, `d` | `cdc__` — see note      |
| `breadcrumb-container`     | `breadcrumb` → `b`             | `bc__`                  |

> **Note:** The abbreviation appends `__` directly. For single-word roots, the container word initial is also included to disambiguate: `loading-container` → `lc__`. For multi-word roots, abbreviate only the non-`container` words.

**Derivation rule (canonical):**

1. Split root class by `-`.
2. Take the first letter of **every** segment, including `container`.
3. Append `__`.

Examples:

- `loading-container` → `[loading, container]` → `l` + `c` → `lc__`
- `breadcrumb-container` → `[breadcrumb, container]` → `b` + `c` → `bc__`
- `product-card-container` → `[product, card, container]` → `p` + `c` + `c` → `pcc__`
- `card-dashboard-container` → `[card, dashboard, container]` → `c` + `d` + `c` → `cdc__`

When in doubt, match the pattern the user uses in context. Prefer short, unambiguous abbreviations.

---

## Checklist Before Writing Files

- [ ] `IVM` contains only primitive/plain data types — no React, no library imports
- [ ] `IProps` extends `IWithRootProps<correctTag>` and `IVM`
- [ ] Root element tag in `.tsx` matches the tag in `IWithRootProps<tag>`
- [ ] Root CSS class ends in `-container`
- [ ] All child CSS classes are nested inside root class
- [ ] Child CSS classes use correct abbreviation prefix
- [ ] `cn()` used on root: base class first, then `rootProps?.className`
- [ ] Named export only (`export const`), no default
- [ ] All type-only imports use `import type`
- [ ] `index.ts` re-exports both files with `export *`
