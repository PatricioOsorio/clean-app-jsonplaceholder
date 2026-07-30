# CSS Patterns — Full Ruleset

Derived from analysis of real components in `mfe-dashboard-uxui-simba`,
`mfe-folio-uxui-simba`, and `mfe-preticket-uxui-simba`. Every rule below is backed by
actual shipped code; see `examples.md` for verbatim excerpts.

## 1. File structure & the `@reference` header

Each component owns exactly one `.css` file, co-located with its `.tsx`/`.interfaces.ts`,
imported by side effect at the top of the component:

```ts
import './card-preticket.css';
```

The file's first line is always:

```css
@reference "@presentation/App.css";
```

(followed by a blank line). This is the Tailwind v4 mechanism that makes `@apply` and
theme tokens resolve inside a module without re-emitting `App.css`'s own output. Using
`@import '@presentation/App.css';` instead is a bug — it works but silently duplicates
the whole stylesheet into the bundle. Always `@reference`.

There is no `tailwind.config.js` / `postcss.config.js` in these MFEs — Tailwind v4 is
CSS-first, configured entirely through `@import`/`@theme`/`@custom-variant` in the
styleguide.

## 2. Parent container + initials-BEM children

**Root class**: the full kebab-case component (or section) name, typically suffixed
`-container` (`.card-dashboard-container`, `.label-value-container`,
`.stepper-preticket-header`). Applied to the root element via `cn()`:

```tsx
className={cn('card-dashboard-container', rootProps?.className)}
```

**Child classes**: nested _inside_ the parent selector (native CSS nesting — no `&` needed
for a plain descendant), named `{initials}__{role}`, where `{initials}` is formed by
taking the first letter of each hyphen-separated word in the parent class name:

| Parent class                    | Initials | Example children                   |
| ------------------------------- | -------- | ---------------------------------- |
| `card-dashboard-container`      | `cdc`    | `.cdc__content`, `.cdc__card-glow` |
| `label-value-container`         | `lvc`    | `.lvc__label`, `.lvc__value`       |
| `cost-center-container`         | `ccc`    | `.ccc__card`, `.ccc__card-title`   |
| `stepper-preticket-header`      | `sph`    | `.sph__indicator`, `.sph__title`   |
| `classification-form-container` | `cfc`    | `.cfc__countries`, `.cfc__options` |
| `description-form-container`    | `df`     | `.df__inputs-row`                  |

Note `description-form-container` → `df`, not `dfc` — the trailing `container` word is
sometimes dropped from the initials when the resulting prefix would otherwise collide or
just reads better short. When in doubt, check sibling files in the same MFE for the
established prefix before inventing a new one; consistency with neighbors beats a
mechanical derivation.

**Modifiers** use a BEM double-dash: `.cdc__card-glow--primary`,
`.cdc__card-glow--success`. The double dash must match exactly on both the CSS class and
the TSX template literal that builds it — a single-dash vs double-dash mismatch is a real
bug found in production (`card-dashboard`'s footer classes): the style silently never
applies because the selectors don't match.

**Cross-component theming**: a parent component may reach into a _child_ component's own
class namespace and re-nest it to override context-specific styling, instead of adding
props or CSS variables:

```css
.costs-container {
  .label-value-container {
    @apply flex flex-col gap-4;

    .lvc__item {
      @apply flex flex-row items-center justify-between border-b py-2;
      @apply border-secondary-200;
      @apply dark:border-white/10;
    }
  }
}
```

This is the idiom to reach for when a reused sub-component (like `label-value`) needs to
look different inside a specific parent — don't add a `variant` prop to the child for a
one-off consumer; override its classes from the parent's stylesheet instead.

## 3. `@apply` ordering — the core rule

Each themed selector is written as **separate consecutive `@apply` statements**, one
concern per line, in this order:

```css
.el {
  @apply <structure>; /* 1: layout, size, spacing, position, typography, shape */
  @apply <light colors>; /* 2: unprefixed color/bg/border-color utilities (light = default) */
  @apply <dark colors>; /* 3: same tokens, dark:-prefixed (dark = override) */

  /* States */
  @apply <light state colors>; /* 4a: data-[state=...]:, hover:, etc — light first */
  @apply <dark state colors>; /* 4b: dark:data-[state=...]: — dark second */
}
```

Rules:

- **Structure line always present** if the element has any layout/sizing/typography at
  all. Omit it only for a class that is purely a color/state override.
- **Light and dark lines are added only when the element has color.** A purely structural
  class (e.g. a flex wrapper with no text/bg/border color) has just one `@apply` line —
  don't add empty light/dark lines for nothing.
- **Never mix a `dark:` utility into the light-mode line, or vice versa.** Each line is
  single-purpose.
- **Never mix structure and color utilities on the same line.** If a shape utility
  (`rounded`, `border` with no color) is needed alongside a colored border, the shape
  goes on the structure line and the color (`border-secondary-200`) goes on the light
  line.
- **The optional 4th group** (interactive/data-attribute states like
  `data-[state=active]:`, `group-data-[state=completed]/step:`) goes after the base three
  lines, preceded by a `/* States */` comment, and itself follows light-before-dark
  ordering if both are present.
- **Single-line form**: an element with no color at all collapses to one `@apply` line
  with just structural utilities.

```css
/* fully themed */
.lvc__label {
  @apply text-sm font-semibold;
  @apply text-secondary-500;
  @apply dark:text-secondary-400;
}

/* structural only */
.steppper-preticket-container {
  @apply flex w-full max-w-4xl flex-col gap-8;
}

/* with states */
.sph__indicator {
  @apply size-11 border-2 text-base font-semibold;
  @apply border-secondary-300 text-muted-foreground bg-transparent;
  @apply dark:border-secondary-700 dark:text-muted-foreground dark:bg-transparent;

  /* States */
  @apply data-[state=active]:border-primary data-[state=active]:text-primary;
  @apply dark:data-[state=active]:border-primary-500 dark:data-[state=active]:text-primary-100;
}
```

## 4. Dark mode mechanics

Dark mode is **not** the Tailwind default `.dark &` class strategy or
`prefers-color-scheme`. The styleguide defines it as a custom attribute variant:

```css
@custom-variant light (&:is([data-theme="light"] *));
@custom-variant dark  (&:is([data-theme="dark"] *));
```

(plus `forest`, `cyberpunk-light`, `cyberpunk-dark` — additional named themes that
component authors never target directly.) Component CSS only ever consumes the `dark:`
prefix; light is the unprefixed default. Do not write `.dark &` or `[data-theme="dark"]`
by hand in a component file — always use the `dark:` utility variant.

Opacity modifiers are used heavily for dark-mode surfaces to keep them subtle:
`dark:bg-white/5`, `dark:bg-black/30`, `dark:border-white/10`, `dark:text-danger-500/50`.

## 5. Nesting, `@layer`, and shadcn slot styling

- Native CSS nesting (Tailwind v4 / Lightning CSS) is used throughout — no `&` needed for
  plain descendant selectors, but `&::before`/`&::after` pseudo-elements do need it.
- **No `@layer` blocks** are authored in component files. Layering comes from the
  imported `tailwindcss/theme` + `tailwindcss/utilities` in `App.css`.
- **Shadcn/ui primitives are styled by targeting their `data-slot` attribute**, nested
  inside the parent container — never by adding a className to the library component or
  editing the library:
  ```css
  .general-preticket-container {
    [data-slot='card-header'] {
      @apply flex items-center justify-between gap-4 px-6 py-4 font-semibold;
      @apply bg-secondary-50;
      @apply dark:text-primary-400 dark:bg-white/5;
    }
  }
  ```
  Use `> [data-slot='...']` when you need to scope to a _direct_ child slot rather than
  any descendant.
- Raw CSS declarations are acceptable inside a nested block when no Tailwind utility
  fits cleanly (`width: fit-content;`), and arbitrary values are fine for one-off needs
  (`shadow-[0_0_14px_2px_rgba(63,120,255,0.15)]`, `h-[70%]`, `var(--primary-500)` inside
  an arbitrary-value utility).

## 6. Responsive breakpoints

Only the default Tailwind breakpoints are used (most commonly `md:`), and **only at the
layout/page/section level** — e.g. a page or form-section grid:

```css
.df__inputs-row {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2;
}
```

Leaf/child components (badges, labels, indicators) are breakpoint-free; they inherit
layout from their responsive parent. Don't add `md:`/`lg:` prefixes inside a small
presentational sub-component — that logic belongs one level up.

## 7. Comments

No header banners, no author/date/description comments, no section dividers in component
CSS. The only comment convention is the literal `/* States */` label placed immediately
above a data-state `@apply` group (see §3). Token files (in `lib-styleguide-simba`) use a
different convention (`/* ! shadcn core */`, `/* ! extended */`) — that's library-internal
and not something component authors write.

## 8. Known deviations to catch when reviewing existing CSS

These are real inconsistencies found in the codebase — flag and fix them if you touch a
file that has one, don't propagate them into new code:

1. `@import '@presentation/App.css';` instead of `@reference` (found in
   `table-recent-folios.css`) — always fix to `@reference`.
2. Modifier dash mismatch between CSS and TSX (`card-dashboard`'s footer classes: CSS
   `.cdc__footer-primary` vs TSX `` `cdc__footer--${variant}` ``) — pick the double-dash
   BEM form and make both sides match.
3. `ComponentName.interface.ts` (singular) instead of the house `.interfaces.ts`
   (plural) — found in `card-preticket`. Rename toward plural when touching the file.
4. Any file documenting or using dark-as-default + `light:` override — that convention
   does not exist in the real codebase; always structure → light (default) → dark
   (`dark:` override).
