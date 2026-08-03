# Structure & naming

## The canonical 4 files

Every component — leaf or compound parent — starts from these, all kebab-case and
co-located in a kebab-case folder matching the component name:

```
card-preticket/
├── card-preticket.tsx            # view (presentational)
├── card-preticket.interfaces.ts  # props / VM types
├── card-preticket.css            # styling — author via css-formatter, not this skill
└── index.ts                      # barrel
```

Two variants extend this set:

- **Hook/config file**, when the component has non-trivial logic (table config, form
  config, derived state): `use-<name>.config.ts`, or `.tsx` if it returns JSX (e.g. a
  cell renderer template). Not barrel-exported unless it's a form (see
  `pages-and-forms.md`).
- **Páginas de Listado / Tabla**, compuestas por sub-carpetas de filtros (`filters-form/`), tablas (`<domain>-table/`), hook de estado de página (`use-<name>-page.tsx`), y opcionalmente mocks (`<name>.mock.json`):

```
folios-page/
├── folios-page.tsx
├── use-folios-page.tsx
├── folios-page.css
├── folios.mock.json
├── index.ts                              # default export
├── filters-form/
└── folios-table/
```

- **Kebab-case child subfolders**, one per compound sub-part, each with its own 3 files
  (`.tsx`, `.interfaces.ts`, `.css`) + its own `index.ts`:

```
confirmation-section/
├── confirmation-section.tsx
├── confirmation-section.interfaces.ts
├── confirmation-section.css
├── index.ts
├── summary/
│   ├── summary.tsx
│   ├── summary.interfaces.ts
│   ├── summary.css
│   └── index.ts
├── costs/
│   └── ...
└── cost-center/
    └── ...
```

> The shipped `card-dashboard/Skeleton/` folder uses PascalCase — that's a historical
> inconsistency, not the standard. New child folders are always kebab-case, e.g.
> `card-dashboard/skeleton/`.

## Naming conventions

| What                      | Convention                                                 | Example                                                                         |
| ------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Component folder          | kebab-case                                                 | `card-preticket`, `table-recent-folios`                                         |
| Files                     | kebab-case, matching folder                                | `card-preticket.tsx`                                                            |
| Interface file suffix     | `.interfaces.ts` (plural) — always, even for a single type | `card-preticket.interfaces.ts`                                                  |
| Child folder              | kebab-case                                                 | `summary/`, `cost-center/`                                                      |
| Hook/config file          | `use-<name>.config.ts(x)`                                  | `use-table-recent-folios.config.tsx`                                            |
| Exported component        | PascalCase, named export                                   | `export const CardPreticket = (...)`                                            |
| Compound child export     | PascalCase, **full parent-name prefix**                    | `CardDashboardSkeleton`, `ConfirmationSectionSummary`, `StepperPreticketHeader` |
| Props interface           | `I<Component>Props`                                        | `ICardPreticketProps`                                                           |
| View-model interface      | `I<Component>VM` or `I<Item>VM`                            | `ICardDashboardVM`, `ISummaryItemVM`                                            |
| Form model interface      | `I<Name>FormModel`                                         | `IClassificationFormModel`                                                      |
| Config hook               | `use<Name>Config` / `use<Name>FormConfig`                  | `useTableRecentFoliosConfig`, `useGeneralInformationFormConfig`                 |
| Slot props                | `<name>Slot`                                               | `headerEndSlot`                                                                 |
| Button prop bundles       | `btn<Name>Props`                                           | `btnNextProps`, `btnActionProps`                                                |
| Passthrough element props | `props<Name>`                                              | `propsLabel`, `propsValue`                                                      |

Never use PascalCase folders, singular `.interface.ts`, or dot-separated filenames
(`name.section.tsx`) — these appear once or twice in the codebase but are not the
standard to replicate.

## Import path discipline

- **Cross-component, same MFE**: `@presentation/components/<name>` (path alias).
- **Shared library**: bare subpath imports from `lib-styleguide-simba`, never a relative
  path and never an `@simba/...` scope (the package name itself is the bare specifier,
  see `interfaces-and-typing.md` for why). Common subpaths: `/interfaces`, `/utils`
  (`cn`), `/button`, `/icons`, `/icons-svg`, `/data-table`, `/empty`, `/error`,
  `/status-content`, `/loading`, `/hooks`, `/shadcn/card`, `/shadcn/stepper`,
  `/shadcn/badge`, `/shadcn/skeleton`, etc.
- **Forms**: the `form-builder` package, imported as `FB` for label/validation helpers
  plus `createFormConfig` / `useFormBuilder` (re-exported via `lib-styleguide-simba/form-builder`).
- Import ordering (loose but consistent): external/library imports → internal
  `@presentation` imports → `import type` for local interfaces → `.css` side-effect
  import last.

## `index.ts` barrel rules

**Leaf component** — view + interfaces:

```ts
export * from './label-value';
export * from './label-value.interfaces';
```

**Compound parent** — view + own interfaces + every child's interfaces (children
themselves are reached via `Parent.Child`, so only their _types_ need re-exporting):

```ts
export * from './confirmation-section';
export * from './confirmation-section.interfaces';
export * from './summary/summary.interfaces';
export * from './costs/costs.interfaces';
export * from './cost-center/cost-center.interfaces';
```

**Form folder** — view + interfaces + config (so a page can import both the component
and its `use<Name>FormConfig` from one path):

```ts
export * from './classification-form';
export * from './classification-form.interfaces';
export * from './classification-form.config';
```

**Page** — default export only (router lazy-loading):

```ts
import { NewPreticketPage } from './new-preticket-page';
export default NewPreticketPage;
```

Internal `use-<name>.config` hooks for plain components (not forms) are **not**
barrel-exported — they're implementation detail of the `.tsx` that calls them.
