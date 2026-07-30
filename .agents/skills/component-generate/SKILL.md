---
name: component-generate
description: >
  Scaffolds React components, compound components, hooks, and pages/forms following
  the exact conventions used across the simba monorepo (mfe-dashboard-uxui-simba,
  mfe-folio-uxui-simba, mfe-preticket-uxui-simba, mfe-host-uxui-simba,
  mfe-auth-uxui-simba): kebab-case folders, the canonical 4-file structure
  (`.tsx` / `.interfaces.ts` / `.css` / `index.ts`), the `IWithRootProps<T>` /
  `IButtonWithCustomOnClick<TData>` shared typing from `lib-styleguide-simba/interfaces`,
  the `Parent.Child` compound-component pattern (with initials-prefixed children,
  e.g. `CardDashboard.Skeleton`), logic-in-hooks (`use-<name>.config`), and the
  form-builder pattern for pages (`createFormConfig` + `useFormBuilder`). Use whenever
  the user asks to create, scaffold, add, or generate a new React component, compound
  component, sub-component, form, or page in any MFE of the simba monorepo — or in
  Spanish: "crear componente", "generar componente", "agregar componente", "nuevo
  componente", "scaffolding de componente", "crear formulario", "crear pagina". This
  skill does NOT cover CSS/styling — for that, always defer to `.agents/skills/css-formatter`.
---

# component-generate

Documents and enforces the author's real, observed React component conventions in the
simba monorepo. Reverse-engineered from actual shipped code (`card-dashboard`,
`table-recent-folios`, `card-preticket`, `confirmation-section`, `label-value`,
`steppper-preticket`, `new-preticket-page` and its forms) — not invented. Follow these
exactly, even where a shortcut looks reasonable, because consistency with sibling files
is the entire point: another developer (or Claude) will read this component next to ten
others and expects the same shape.

**Styling is explicitly out of scope for this skill.** Never describe CSS classes,
tokens, `@apply` order, or dark-mode variants here — that is `.agents/skills/css-formatter`'s
job. Whenever a `.css` file needs to be written for a component generated with this
skill, invoke `css-formatter` for it.

## Core principles (always read)

1. **Everything is built from `lib-styleguide-simba` primitives.** shadcn-based
   primitives (`Card`, `Sidebar`, etc.) use **flat named exports**, never dot-notation —
   `import { Card, CardHeader, CardTitle, CardContent } from 'lib-styleguide-simba/shadcn/card'`,
   `import { Sidebar, SidebarContent, SidebarGroup } from 'lib-styleguide-simba/shadcn/sidebar'`.
   There is no `Card.Header` or `Sidebar.Content` — that pattern does not exist in this
   codebase. The `Parent.Child` **dot-notation compound pattern is reserved for
   components authored in this repo** (`StepperPreticket.Header`, `CardDashboard.Skeleton`,
   `ConfirmationSection.Summary`) — see principle 5 and `references/patterns.md`.
2. **Shared typing comes from `lib-styleguide-simba/interfaces`** — `IWithRootProps<T>`,
   `IWithChildren`, `IButtonWithCustomOnClick<TData>`, `IWithLoading`/`IWithEmpty`/
   `IWithError`, `IWithTestId`. Read `references/interfaces-and-typing.md` before
   writing any `.interfaces.ts` file — guessing the shape of `IWithRootProps` instead
   of reading it is the single most common mistake.
3. **`rootProps` spreads first, then `className` merges via `cn()`**: import `cn` from
   `lib-styleguide-simba/utils` and always write
   `className={cn('<name>-container', rootProps?.className)}` so the caller's override
   composes instead of clobbering.
4. **Logic lives in `use-<name>.config` hooks, not in the `.tsx`.** If a component needs
   table columns, form fields, or any non-trivial derived state, that goes in a hook
   file the view calls into. See `references/patterns.md` §3.
5. **Compound children attach as static properties** (`Parent.Child = Child`), live in
   kebab-case subfolders, and are named with the full parent prefix
   (`CardDashboardSkeleton`, `ConfirmationSectionSummary`). See `references/patterns.md` §1.
6. **No `memo`, `forwardRef`, `displayName`, or `enum`.** Variants are string-literal
   unions; defaults are expressed via destructuring defaults, not `defaultProps`.

## References (read when needed)

- **`references/structure.md`** — file/folder layout, naming rules, import path
  conventions, and `index.ts` barrel patterns. Read this first for any new component.
- **`references/interfaces-and-typing.md`** — the full shared-type catalogue from
  `lib-styleguide-simba/interfaces` plus local `.interfaces.ts` conventions (VM,
  FormModel, indexed access types). Read before writing any interface.
- **`references/patterns.md`** — the `Parent.Child` compound pattern, the Context
  variant for shared parent→children state, hook/logic separation, and the recurring
  React idioms (prop-spread precedence, button `onClick` composition, optional slots).
- **`references/pages-and-forms.md`** — only when the request is a page or a form: the
  `form-builder` pattern (`createFormConfig` + `useFormBuilder`), the page-level `steps`
  orchestration, and default-export page barrels.
- **`references/examples.md`** — three ready-to-adapt full templates (leaf, compound,
  form) to copy from instead of writing from scratch.

## Generation process

1. **Ask if unclear**: component name, what it does, root element or underlying
   `lib-styleguide-simba` primitive, whether it owns data (needs a `VM` interface), and
   which shape it is — leaf, compound (has variants/sub-parts), or form/page.
2. **Read `references/structure.md`** to confirm the file set for that shape, then
   **`references/interfaces-and-typing.md`** for the exact types to extend.
3. If compound or stateful-across-children, read **`references/patterns.md`**. If a
   page or form, read **`references/pages-and-forms.md`**.
4. **Generate files in order**: `.interfaces.ts` → `.tsx` → `index.ts`. For the `.css`,
   hand off to `css-formatter` rather than writing it yourself.
5. **Do not create test files** unless explicitly requested.
6. **No extra abstractions** — no wrappers, no HOCs, no Context — unless the shape
   genuinely calls for one (see `references/patterns.md` §2) or the user asks.
7. Show the complete generated files, ready to be written to disk.

## Pre-delivery checklist

- [ ] Folder and every filename kebab-case, matching the component name.
- [ ] Exactly `<name>.tsx`, `<name>.interfaces.ts`, `<name>.css`, `index.ts` (+ optional
      `use-<name>.config.ts(x)`, + optional kebab-case child subfolders).
- [ ] Props interface extends `IWithRootProps<T>` (or the right `IWith*` mixin) from
      `lib-styleguide-simba/interfaces` — not reinvented locally.
- [ ] Named export in `.tsx`, no `React.FC`, no `memo`/`forwardRef`/`displayName`.
- [ ] `rootProps` spread first, `className` merged with `cn('<name>-container', rootProps?.className)`.
- [ ] Compound children (if any) attached as `Parent.Child = Child`, full-name-prefixed,
      each in its own kebab-case subfolder with its own 3 files + barrel.
- [ ] Non-trivial logic extracted into a `use-<name>.config` hook, not inline in the view.
- [ ] `index.ts` barrel: `export * from './<name>'` + `export * from './<name>.interfaces'`
      (+ child interfaces for compounds, + `.config` for forms, default export for pages).
- [ ] `.css` handed off to `css-formatter` — this skill did not author styling.
