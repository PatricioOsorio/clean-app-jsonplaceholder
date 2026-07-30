# Interfaces & typing

## Shared types from `lib-styleguide-simba/interfaces`

These come from `lib-styleguide-simba/src/interfaces/component.interfaces.ts`, built by
`tsup` into `dist/interfaces.*` and reachable via the package's `"./*"` wildcard export
(`package.json` `exports` maps any bare subpath `lib-styleguide-simba/<x>` to
`dist/<x>.{d.ts,js,cjs}`) — that's why every MFE imports from the bare specifier
`lib-styleguide-simba/interfaces`, never a relative path.

```ts
export type IWithLoading = { isLoading?: boolean; loadingTemplate?: ReactNode };

export type IWithEmpty = {
  isEmpty?: boolean;
  emptyTemplate?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
};

export type IWithError = {
  isError?: boolean;
  errorTemplate?: ReactNode;
  errorTitle?: string;
  errorDescription?: string;
};

export type IWithChildren = PropsWithChildren;

export type IWithComponentProps<T extends ElementType> = ComponentProps<T>;

export type IWithTestId = { 'data-testid'?: string };

export type IWithRootProps<TRoot extends ElementType | object = 'section'> =
  TRoot extends ElementType
    ? { rootProps?: ComponentPropsWithoutRef<TRoot> }
    : { rootProps?: TRoot };

export type IButtonWithCustomOnClick<TData> = Omit<ComponentProps<typeof Button>, 'onClick'> & {
  onClick?: (data: TData, event: MouseEvent<HTMLButtonElement>) => void;
};
```

- `IWithRootProps<T>` is the one every component extends. Pass an HTML tag string
  (`'div'`, `'section'` — the default) for a plain element root, or `typeof Card` /
  `typeof Stepper` for a `lib-styleguide-simba` component root. It always produces a
  single optional `rootProps` typed to that target.
- `IButtonWithCustomOnClick<TData>` is for any button whose click handler should receive
  the row/item data first: `(data: TData, event) => void`. Used for action buttons in
  tables and lists.
- `IWithLoading` / `IWithEmpty` / `IWithError` are usually intersected together as a
  `status` prop bundle: `status?: IWithLoading & IWithError & IWithEmpty`.
- **Not exported from the barrel**: `ILabelValue` lives in the library's
  `label-value.interfaces.ts` but the library's own `interfaces/index.ts` does not
  re-export it — so it is *not* available via `lib-styleguide-simba/interfaces`. If you
  need a label/value pair type, define it locally in the consuming component.

Import style — both are equivalent, pick based on count:
```ts
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';               // single type
import { type IWithRootProps, type IWithLoading, type IWithEmpty } from 'lib-styleguide-simba/interfaces'; // multiple
```

## Local `.interfaces.ts` conventions

Always `import type` for every type-only import. Standard shape for a leaf component:

```ts
import type { IWithChildren, IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { Card } from 'lib-styleguide-simba/shadcn/card';
import type { ReactNode } from 'react';

export interface ICardPreticketProps
  extends IWithRootProps<typeof Card>, IWithChildren {
  title: string;
  headerEndSlot?: ReactNode;
}
```

Patterns, by situation:

- **Pure children wrapper** — alias, not interface:
  ```ts
  export type IConfirmationSectionProps = IWithChildren;
  ```
- **Root props typed to the underlying primitive**: `IWithRootProps<typeof Card>`,
  `IWithRootProps<typeof Stepper>`, or a bare tag `IWithRootProps<'section'>`.
- **Compound child forwarding parent props** — extend `Partial<ComponentProps<typeof Parent>>`
  so the child can forward title/rootProps/etc., then add its own item VM:
  ```ts
  import type { ComponentProps } from 'react';
  import type { CardPreticket } from '@presentation/components/card-preticket';

  export interface ISummaryItemVM { enterprise: string; detailedDescription?: string; }
  export interface IConfirmationSectionSummaryProps
    extends Partial<ComponentProps<typeof CardPreticket>> {
    items: ISummaryItemVM;
  }
  ```
- **Multiple `extends` vs intersection** — prefer multiple `extends` when composing root
  props with a VM:
  ```ts
  export interface ITableRecentFoliosProps extends IWithRootProps<'section'>, ITableRecentFoliosVM {
    btnActionProps?: IButtonWithCustomOnClick<IRecentFoliosItemVM>;
  }
  ```
  Reserve intersection (`&`) for composing root props with omitted-native-prop overrides:
  ```ts
  export type IStepperPreticketProps = IWithRootProps<typeof Stepper> &
    IStepperPreticketVM &
    Omit<ComponentProps<typeof Stepper>, 'children'> & { children?: React.ReactNode };
  ```
- **Indexed access types** to avoid re-declaring a prop's type in a hook's input:
  ```ts
  export interface IUseTableRecentFoliosConfigProps {
    btnActionProps?: ITableRecentFoliosProps['btnActionProps'];
  }
  ```
- **Form props deriving `Input` from the config hook's return type**:
  ```ts
  import type { useDescriptionFormConfig } from './description-form.config';
  export interface IDescriptionFormProps extends Partial<ComponentProps<typeof CardPreticket>> {
    Input: ReturnType<typeof useDescriptionFormConfig>['Input'];
  }
  ```

## Naming recap

- `I<Component>Props` — component props.
- `I<Component>VM` / `I<Item>VM` — view-model / data-shape types (`ICardDashboardVM`,
  `IRecentFoliosItemVM`).
- `I<Name>FormModel` — form field model (`IClassificationFormModel`).
- No `enum`s, ever. Variant/status values are inline string-literal unions
  (`variant?: 'success' | 'warning' | 'danger' | 'primary'`).
