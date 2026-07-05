---
name: component
description: >
  Generate, refactor, or edit React components following this project's presentation-layer
  pattern (tsx + interfaces + css + index barrel, with Empty/Skeleton sub-components and an
  IMV model contract living in the feature's models/ folder).
  Use whenever working with any component under src/presentation — creating new ones, refactoring
  existing ones, or editing component structure.
  Trigger on: "create X component", "new component", "refactor Y", "edit component", "add component",
  or any task that produces or modifies a component folder.
  Do NOT skip this skill just because a component "looks simple" — the pattern is mandatory for all
  components in this project.
---

# React Component Pattern

Every component shares a **core**: `Component.tsx` + `Component.interfaces.ts` + `Component.css` +
`index.ts` (capital `I` barrel), each root element spreads `rootProps` and merges classes with
`cn('<name>-container', rootProps?.className)`, CSS nested under one `-container` root. Everything
else — model contracts, `Empty`/`Skeleton` sub-components, loading/empty handling — is **archetype-
specific**. Pick the archetype first, then apply only its rules. Don't bolt an `Empty/` folder or a
`.mv.ts` model onto a component that doesn't need one.

## Pick the archetype first

| Archetype                   | What it is                                         | Reference                                           | Model                                     | `Empty`/`Skeleton`                                                 | Loading/empty render                                                                                                         |
| --------------------------- | -------------------------------------------------- | --------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Leaf / card**             | One data item, owns its own loading + empty states | `features/posts/components/Post`                    | `data: IMV` prop (grouped, not flattened) | **own subdirs**, attached as `Component.Skeleton`/`.Empty` statics | `<StatusContent>` wrapper                                                                                                    |
| **Composite / list**        | Renders many leaves                                | `features/posts/components/Posts`                   | local `IVM { items?: IMV[] }`             | **none** — reuses the leaf's `Leaf.Skeleton`/`Leaf.Empty` statics  | `<StatusContent>` wrapper (list-level state — its own `isLoading/isError/isEmpty`, distinct from each leaf's per-item state) |
| **Detail**                  | One full record, bespoke layout                    | `features/posts/components/PostDetail`              | local `IVM { item?: IMV }`                | **none** — inlines its own skeleton/empty markup                   | `<StatusContent>` wrapper                                                                                                    |
| **Presentational / shared** | Static chrome, no data, no states                  | `shared/components/Footer`, `Navigation`, `Loading` | **none**                                  | **none**                                                           | none — just renders                                                                                                          |

The sections below cover every piece. **Apply only the rows your archetype needs.** A leaf uses §1–7.
A presentational component uses just the core (§2 minus the model/mixins, §3 minus `renderContent`,
§6, §7) — `IProps extends IWithRootProps<tag>` and nothing else (see `Footer.interfaces.ts`).

## File Structure (leaf / card — the maximal form)

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.interfaces.ts
├── ComponentName.css
├── index.ts                  ← capital I, this is the barrel
├── Empty/                     ← leaf only
│   ├── Empty.tsx
│   ├── Empty.interfaces.ts
│   └── Empty.css
└── Skeleton/                  ← leaf only
    ├── Skeleton.tsx
    ├── Skeleton.interfaces.ts
    └── Skeleton.css
```

Composite, detail, and presentational components drop the `Empty/` and `Skeleton/` subdirs — they
keep only the 4 core files.

Notes:

- Sub-components (`Empty`, `Skeleton`) belong to the **leaf** that owns those states. They live in
  their own subdirectories with their own 3 files (`.tsx` + `.interfaces.ts` + `.css`), get **no**
  `index.ts`, and the parent barrel re-exports their interfaces. Composite/list components reuse them
  via the leaf's statics (`Post.Skeleton`, `Post.Empty`) rather than redefining them.
- The **data contract (`IMV`)** lives with the feature's models, never in the component folder:
  `src/presentation/features/<feature>/models/<name>/<name>.mv.ts`. Presentational/shared components
  carry no data, so they have no `IMV` at all.

---

## 1. The model contract: `IMV` (lives in models/, not in the component)

The minimal UI data shape is defined once in the feature's models folder and imported by the
component's interfaces. Example — `models/post/post.mv.ts`:

```typescript
export interface IPostMV {
  id: number;
  title: string;
  content: string;
  idUser?: number;
}
```

**Rules:**

- `IMV` = data contract only: strings, numbers, arrays, plain objects. No React types, no library imports.
- Suffix is `.mv.ts` (model-view). The interface is `I<Name>MV`.
- The component imports it — it never redefines the shape locally.

---

## 2. ComponentName.interfaces.ts

The interfaces file is thin: it composes the root props, the model contract, and one grouped
`status` prop for the loading/error/empty mixins. It does not re-declare the data shape. The data
(`IMV`) travels as **one grouped prop**, not flattened into individual fields — this keeps the
signature short and lets `onEdit`/`onDelete` handlers pass the record straight through instead of
reassembling it field by field. Same idea for status: `IWithLoading`/`IWithError`/`IWithEmpty` are
never spread flat into `IProps` — they're intersected into a single optional `status` prop.

```typescript
import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';
import type { IPostVM } from '../../models/post';

export interface IPostProps extends IWithRootProps<'article'> {
  post: Pick<IPostVM, 'id' | 'title' | 'content' | 'idUser'>;
  status?: IWithLoading & IWithError & IWithEmpty;
}
```

**Rules:**

- `IProps` = `IWithRootProps<tag>` + a single grouped data prop (`post: IMV`, or `Pick<IMV, …>` for a
  subset) + `status?: IWithLoading & IWithError & IWithEmpty` (drop whichever mixin the component
  doesn't need, e.g. a form with no empty state uses `status?: IWithLoading & IWithError`) + any
  React/lib deps the render needs.
- `status` is always optional (`status?:`), never required — every `.tsx` gives it a `status = {}`
  default at the destructuring site (see §3). A required `status` silently breaks at runtime for any
  caller that spreads a `Partial<IProps>` (TS's JSX spread-prop checker doesn't flag the missing
  required field through a `Partial<T>` spread), so treat `status?:` as non-negotiable.
- Import the `IMV` from the feature's models barrel (e.g. `'../../models/post'`), not from a local file.
- Infer the correct semantic HTML tag for `IWithRootProps<tag>` from the component's purpose
  (`article`, `section`, `aside`, `nav`, `div`, `ul`, `li`, …).
- All imports use `import type`.

---

## 3. ComponentName.tsx

Conditional states (`isLoading`, `isError`, `isEmpty`) are handled by wrapping the real content in
the shared `<StatusContent>` (`shared/components/StatusContent`) instead of a local
`renderContent()` helper — it centralizes the same loading/error/empty switch that used to be
copy-pasted into every leaf/detail component. The root element with `rootProps` + `cn()` is always
rendered around it, unconditionally. Data comes in as the grouped `post` prop, destructured at the
point of use (`post.title`, not a flattened `title`). Status comes in as the grouped `status` prop,
defaulted to `{}` in the signature, and forwarded whole to `<StatusContent {...status} />`, only
overriding the `*Template` fields that need a component-specific default.

```tsx
import { cn } from 'lib-styleguide-simba/utils';

import type { IPostProps } from './Post.interfaces';

import { StatusContent } from '@presentation/shared/components';
import { PostEmpty } from './Empty/Empty';
import { PostSkeleton } from './Skeleton/Skeleton';
import './Post.css';

export const Post = ({ rootProps, post, status = {} }: IPostProps) => (
  <article {...rootProps} className={cn('post-container', rootProps?.className)}>
    <StatusContent
      {...status}
      emptyTemplate={status.emptyTemplate ?? <PostEmpty />}
      loadingTemplate={status.loadingTemplate ?? <PostSkeleton items={1} />}
    >
      <h2 className="pc__title">{post.title}</h2>
      <p className="pc__content">{post.content}</p>

      <div className="pc__footer">
        {post.idUser !== undefined && <span className="pc__user">User ID: {post.idUser}</span>}
        <span className="pc__id">Post #{post.id}</span>
      </div>
    </StatusContent>
  </article>
);

Post.Skeleton = PostSkeleton;
Post.Empty = PostEmpty;
```

**Rules:**

- Named export only (`export const`). No default export.
- Destructure `rootProps`, the grouped data prop (`post`), and `status = {}` (with the default) by
  name — never name `isLoading` / `isError` / `isEmpty` / `*Template` / `*Title` / `*Description`
  individually in the signature, they live inside `status`.
  Read data fields off `post.<field>` inside the render, no flattened per-field props.
- Wrap the real content in `<StatusContent {...status}>`, overriding only the `*Template` props that
  need this component's own default (its `Skeleton`/`Empty`/`Error`). If content depends on an
  optional record (e.g. a `post?: IPostVM` in a Detail), fold that into the override:
  `isEmpty={status.isEmpty || !post}`, and additionally guard the JSX with `{post && (...)}` so the
  children tree never dereferences an absent record even when unused.
- Replace `article` with the tag that matches `IWithRootProps<tag>`.
- Always spread `rootProps` on the root element.
- Merge classes with `cn()`: base class first, then `rootProps?.className`.
- Attach sub-components as static properties: `Component.Skeleton = …; Component.Empty = …;`.
- Import order: `cn` from styleguide → blank → `import type` props → blank → `StatusContent` +
  sub-component imports → the `./Component.css` side-effect import last.

---

## 4. Sub-component: Empty

Simple semantic block. Uses `cn()` like the main component.

```tsx
import { cn } from 'lib-styleguide-simba/utils';

import type { IPostEmptyProps } from './Empty.interfaces';
import './Empty.css';

export const PostEmpty = ({ rootProps }: IPostEmptyProps) => {
  return (
    <article {...rootProps} className={cn('post-empty-container', rootProps?.className)}>
      <h3 className="pec__title">No publications found</h3>
      <p className="pec__desc">Check back later or try fetching the posts again.</p>
    </article>
  );
};
```

Interfaces — usually just the root props:

```typescript
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IPostEmptyProps extends IWithRootProps<'article'> {}
```

- Export name is `<Parent>Empty` (e.g. `PostEmpty`).
- Root class is `<parent>-empty-container`; children use the derived prefix (`pec__`).

---

## 5. Sub-component: Skeleton

Renders `items` placeholder copies. Note: Skeleton uses a **raw `className` string**, not `cn()`, and
spreads `rootProps` per item with a `key`. Default `items` count differs by usage.

```tsx
import type { IPostSkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const PostSkeleton = ({ items = 6, rootProps }: IPostSkeletonProps) => {
  return (
    <>
      {Array.from({ length: items }).map((_, i) => (
        <article {...rootProps} key={`skeleton-${i}`} className="post-skeleton-container">
          <div className="psc__title" />
          <div className="psc__line psc__line--full" />
          <div className="psc__line psc__line--partial" />
          <div className="psc__footer">
            <div className="psc__badge psc__badge--sm" />
            <div className="psc__badge psc__badge--xs" />
          </div>
        </article>
      ))}
    </>
  );
};
```

Interfaces — root props plus `items`:

```typescript
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IPostSkeletonProps extends IWithRootProps<'article'> {
  items?: number;
}
```

- Export name is `<Parent>Skeleton`.
- Root class is `<parent>-skeleton-container`; children use the derived prefix (`psc__`).
- State modifiers use the BEM-style `&.prefix__el--modifier` nested in CSS (see below).

---

## 6. CSS files

Every `.css` (parent and each sub-component) starts with the `@reference` line and nests all children
inside the single `-container` root.

```css
@reference "@styles/app.css";

.post-container {
  @apply /* root styles */;

  .pc__title {
    @apply /* child styles */;
  }
}
```

Modifier states nest with `&`:

```css
.psc__line {
  @apply bg-muted h-4 animate-pulse rounded-md;

  &.psc__line--full {
    @apply w-full;
  }

  &.psc__line--partial {
    @apply w-5/6;
  }
}
```

**Rules:**

- First line is always `@reference "@styles/app.css";`.
- Root class always ends in `-container`.
- All child classes nested inside the root — never flat at the top level.
- Child classes use the abbreviation prefix + `__` (see naming system).
- Modifiers use `&.prefix__el--modifier` nested under the element.

---

## 7. index.ts (the barrel — capital I)

Re-export the main component + its interfaces, plus the sub-component interfaces.

```typescript
export * from './Post';
export * from './Post.interfaces';

export * from './Empty/Empty.interfaces';
export * from './Skeleton/Skeleton.interfaces';
```

---

## CSS Naming System

### Root class

`<component-name>-container` — kebab-case of the component name + `-container`.

| Component      | Root class                |
| -------------- | ------------------------- |
| `Post`         | `post-container`          |
| `PostEmpty`    | `post-empty-container`    |
| `PostSkeleton` | `post-skeleton-container` |
| `ProductCard`  | `product-card-container`  |

### Child prefix (canonical rule)

1. Split the root class by `-`.
2. Take the first letter of **every** segment, including `container`.
3. Append `__`.

Examples (all from the real Post component):

- `post-container` → `[post, container]` → `p` + `c` → `pc__`
- `post-empty-container` → `[post, empty, container]` → `p` + `e` + `c` → `pec__`
- `post-skeleton-container` → `[post, skeleton, container]` → `p` + `s` + `c` → `psc__`
- `product-card-container` → `[product, card, container]` → `p` + `c` + `c` → `pcc__`

---

## Checklist Before Writing Files

- [ ] `IMV` lives in `models/<name>/<name>.mv.ts` — primitives only, no React/lib imports
- [ ] `interfaces.ts` imports the `IMV` from the models barrel; does not redefine the data shape
- [ ] `IProps` extends `IWithRootProps<correctTag>`, plus a single grouped data prop (`post: IMV` or `Pick<IMV, …>`) and `status?: IWithLoading & IWithError & IWithEmpty` (mixins intersected, dropped if unneeded, always optional)
- [ ] Root element tag in `.tsx` matches the tag in `IWithRootProps<tag>`
- [ ] `.tsx` destructures `status = {}` and wraps content in `<StatusContent {...status}>` (no local `renderContent()` switch, no flat `isLoading`/`isError`/`isEmpty` in the signature)
- [ ] Data read off the grouped prop (`post.field`), not flattened per-field props
- [ ] `cn()` on parent + Empty roots (base class first, then `rootProps?.className`); Skeleton uses raw className
- [ ] `Component.Skeleton` and `Component.Empty` attached as static props
- [ ] Empty & Skeleton each have `.tsx` + `.interfaces.ts` + `.css` (no own barrel)
- [ ] Every CSS file opens with `@reference "@styles/app.css";`, all children nested in `-container`
- [ ] Child CSS classes use the correct first-letter-of-every-segment prefix
- [ ] Barrel file is `index.ts` (capital I), re-exporting main files + sub-component interfaces
- [ ] All type-only imports use `import type`; named export only, no default
