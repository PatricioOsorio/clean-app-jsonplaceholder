---
name: css-formatter
description: >
  Formats and reviews CSS following the exact conventions used across the simba monorepo
  (mfe-*): Tailwind v4 with mandatory
  `@reference "@styles/app.css";` header, strict `@apply` ordering
  (structure → light-mode → dark-mode → data-state), and the "initials-BEM" naming
  scheme where a component's children are prefixed with the initials of its parent
  container (e.g. `card-preticket-container` → `cpc__title`). Use whenever the user asks
  to write, generate, format, fix, or review a `.css` file in any MFE of the simba
  monorepo, or asks about CSS/Tailwind standards, dark mode variants, or `@apply` order.
  Trigger on: "format css", "css standards", "escribir css", "formatear css",
  "generar css", "revisar css", "review css", "fix my css", "css conventions",
  even if the user doesn't name this skill directly — any time a `.css` file in this
  repo is being created or edited, consult this skill first.
---

# css-formatter

Documents and enforces the author's real, observed CSS conventions in the simba
monorepo. These rules were reverse-engineered from actual shipped code (dashboard, folio,
preticket, etc.; components) — not invented. Follow them exactly; don't improvise a different
structure even if it seems reasonable, because consistency with sibling files is the
entire point.

## Core rules (always read)

1. **Header**: every component `.css` file's first line is exactly
   `@reference "@styles/app.css";`, followed by a blank line. Never `@import` it —
   `@import` re-emits the whole stylesheet and duplicates output.
2. **One file per component**, kebab-case, co-located with its `.tsx`, imported as a
   side effect: `import './card-preticket.css';`.
3. **Parent container + initials-BEM children** — see `references/patterns.md` §2.
4. **`@apply` ordering is strict**: structure → light → dark → (optional) states — see
   `references/patterns.md` §3. This is the rule most likely to be gotten wrong; read it
   before writing any themed class.
5. **Tokens**: never hardcode colors or invent CSS variables. Use the semantic scale and
   shadcn tokens from `lib-styleguide-simba` — see `references/tokens-and-imports.md`.

## References (read when needed)

- **`references/patterns.md`** — the full ruleset: naming, `@apply` ordering, nesting,
  dark-mode mechanics, shadcn slot styling, cross-component theming, responsive rules.
  Read this before generating or reviewing any non-trivial `.css` file.
- **`references/tokens-and-imports.md`** — the design-token catalog (color ramps, shadcn
  semantic tokens, radius scale) and the `lib-styleguide-simba` import convention.
  Read this when picking a color/spacing/radius token or writing an import line.
- **`references/examples.md`** — verbatim real files to imitate, plus the known bugs to
  avoid repeating.

## Generation process

When asked to write or fix a component's CSS:

1. Identify the parent container class name (usually `{component-name}-container`, but
   check the actual folder — some use `{component-name}` or `{section-name}` without the
   suffix; match sibling files in the same folder if it's an existing component).
2. Derive the child-initials prefix from the parent name's words (see
   `references/patterns.md` §2 for the derivation rule and edge cases).
3. For each rule that needs color, split it into separate `@apply` lines in order:
   structure → light → dark. Omit whichever lines don't apply. Never combine `dark:` and
   unprefixed color utilities on one line.
4. Nest child selectors and any `[data-slot='...']` shadcn overrides inside the parent
   block — don't write flat, unnested selectors.
5. Pull colors/spacing/radius from `references/tokens-and-imports.md`, not by guessing
   hex values or arbitrary Tailwind numbers.
6. Run the audit checklist below before delivering.

## Audit checklist (run on every file you write or review)

- [ ] First line is `@reference "@styles/app.css";` (not `@import`).
- [ ] Parent class matches the folder's component name; children nested inside it.
- [ ] Every themed rule follows structure → light → dark line order; no mixed lines.
- [ ] `dark:` used for dark-mode overrides — never a `light:` prefix, never dark-as-default.
- [ ] Modifier classes match exactly between `.css` (`--modifier`) and `.tsx` template
      literals — a single-dash vs double-dash mismatch silently breaks the style
      (real bug found in `card-dashboard`: CSS had `.cdc__footer-primary`, TSX built
      `` `cdc__footer--${variant}` ``, so the color never applied).
- [ ] Colors/radius come from documented tokens, not hardcoded hex or ad hoc scales.
- [ ] Responsive prefixes (`md:`, etc.) only appear at the layout/page level, not on leaf
      component internals.
- [ ] No comments except an optional `/* States */` label above a data-state `@apply`
      group. No header banners, no author/date comments.
- [ ] Interfaces file is named `ComponentName.interfaces.ts` (plural) — not `.interface.ts`.
