# Patterns

## 1. Compound component — `Parent.Child`

The parent is a plain arrow-function component. Children are standalone components
imported from their own kebab-case subfolder and attached as static properties **after**
the parent's declaration. Children are named with the full parent prefix so the
attachment reads unambiguously.

```tsx
// confirmation-section.tsx
import { ConfirmationSectionCostCenter } from './cost-center/cost-center';
import { ConfirmationSectionCosts } from './costs/costs';
import { ConfirmationSectionSummary } from './summary/summary';

export const ConfirmationSection = ({ children }: IConfirmationSectionProps) => {
  return <section className="confirmation-section-container">{children}</section>;
};

ConfirmationSection.Summary = ConfirmationSectionSummary;
ConfirmationSection.Costs = ConfirmationSectionCosts;
ConfirmationSection.CostCenter = ConfirmationSectionCostCenter;
```

Consumed as:

```tsx
<ConfirmationSection>
  <ConfirmationSection.Summary items={itemsSummary} />
  <ConfirmationSection.Costs items={itemsCosts} />
  <ConfirmationSection.CostCenter {...costCenterProps} />
</ConfirmationSection>
```

No `Object.assign`, no `forwardRef`, no `displayName` — just a plain static-property
assignment.

### 1.1 Attached Skeleton pattern (`Parent.Skeleton`)

When a component provides its own loading skeleton, place it in a `skeleton/` subfolder, name the component `<ParentName>Skeleton`, import `Skeleton` from `lib-styleguide-simba/shadcn/skeleton`, and attach it as `Parent.Skeleton`:

```tsx
// card-dashboard.tsx
import { CardDashboardSkeleton } from './skeleton';

export const CardDashboard = ({ children, rootProps }: ICardDashboardProps) => (
  <section {...rootProps} className={cn('card-dashboard-container', rootProps?.className)}>
    {children}
  </section>
);

CardDashboard.Skeleton = CardDashboardSkeleton;
```

```tsx
// skeleton/skeleton.tsx
import { Skeleton } from 'lib-styleguide-simba/shadcn/skeleton';
import { cn } from 'lib-styleguide-simba/utils';
import type { ICardDashboardSkeletonProps } from './skeleton.interfaces';

export const CardDashboardSkeleton = ({ rootProps }: ICardDashboardSkeletonProps) => (
  <div {...rootProps} className={cn('card-dashboard-skeleton-container', rootProps?.className)}>
    <Skeleton className="bg-muted h-6 w-32 rounded" />
    <Skeleton className="bg-muted h-20 w-full rounded" />
  </div>
);
```

## 2. Context variant — shared parent → children state

Use this only when children need data the parent computed/owns, not just for the sake
of it (no unrequested Context). `createContext` + a guard-throw consumer hook:

```tsx
const StepperPreticketContext = createContext<IStepperPreticketVM | null>(null);

export const useStepperPreticketContext = () => {
  const ctx = useContext(StepperPreticketContext);
  if (!ctx) throw new Error('useStepperPreticketContext must be used within StepperPreticket');
  return ctx;
};

export const StepperPreticket = ({
  steps,
  children,
  rootProps,
  ...props
}: IStepperPreticketProps) => (
  <StepperPreticketContext.Provider value={{ steps }}>
    <Stepper {...rootProps} {...props}>
      {children}
    </Stepper>
  </StepperPreticketContext.Provider>
);

StepperPreticket.Header = StepperPreticketHeader;
StepperPreticket.Content = StepperPreticketContent;
StepperPreticket.Footer = StepperPreticketFooter;
```

Children then take almost no props, reading shared data from context instead:

```tsx
export const StepperPreticketHeader = ({ className }: { className?: string }) => {
  const { steps } = useStepperPreticketContext();
  // ...
};
```

## 3. Logic separation — `use-<name>.config` hooks

Non-trivial logic (table columns, form fields, derived config) lives in a hook; the
`.tsx` stays presentational and just calls it.

```tsx
// table-recent-folios.tsx
export const TableRecentFolios = ({
  values,
  isLoading,
  rootProps,
  btnActionProps,
}: ITableRecentFoliosProps) => {
  const { columnsConfig, tableConfig } = useTableRecentFoliosConfig({ btnActionProps });
  return (
    <section {...rootProps} className={cn('table-recent-folios-container', rootProps?.className)}>
      <DataTable
        columnConfig={columnsConfig()}
        data={values}
        isLoading={isLoading}
        {...tableConfig}
      />
    </section>
  );
};
```

The hook is `.tsx` (not `.ts`) precisely because it returns JSX cell renderers:

```tsx
// use-table-recent-folios.config.tsx
export const useTableRecentFoliosConfig = ({
  btnActionProps,
}: IUseTableRecentFoliosConfigProps) => {
  const columnsConfig = (): IColumnConfig<IRecentFoliosItemVM>[] => [
    { key: 'col-id', header: 'Folio', body: (row) => <span>{row.folio}</span> },
    {
      key: 'col-actions',
      header: '',
      body: (row) => (
        <Button {...btnActionProps} onClick={(e) => btnActionProps?.onClick?.(row, e)}>
          <IconEye />
        </Button>
      ),
    },
  ];
  const tableConfig = { paginator: true, rows: 5 };
  return { columnsConfig, tableConfig };
};
```

For forms, the hook wraps `createFormConfig` + `useFormBuilder` and spreads the result —
see `pages-and-forms.md`.

## 4. Recurring React idioms

- **Props spread then override**, so the caller's props apply but the component's own
  container class always wins the merge:
  ```tsx
  <CardPreticket
    title="Costos"
    {...props}
    rootProps={{ className: 'costs-container', ...props.rootProps }}
  />
  ```
  and at the DOM level:
  ```tsx
  <section {...rootProps} className={cn('label-value-container', rootProps?.className)} />
  ```
  `cn(<own-class>, rootProps?.className)` — own class first, caller's merges in after —
  is universal across every component.
- **Button `onClick` composition** — spread the caller's button props, then wrap
  `onClick` to run internal logic _and_ call through to the caller's handler, with
  `children`/`disabled` fallbacks:
  ```tsx
  <Button
    variant="outline"
    {...btnNextProps}
    disabled={activeStep === stepsCount || btnNextProps?.disabled}
    onClick={(e) => {
      setActiveStep(activeStep + 1);
      btnNextProps?.onClick?.(e);
    }}
  >
    {btnNextProps?.children ||
      (activeStep === stepsCount ? 'Confirmar y generar folio' : 'Siguiente')}
  </Button>
  ```
- **Optional slots guarded inline**: `{headerEndSlot && <div>{headerEndSlot}</div>}`.
- **Empty-state fallbacks inline**: `value ? value : <span>Dato no proporcionado</span>`,
  `notes || <span className="italic">Sin observaciones</span>`.
- **Composite template-literal keys** when mapping: `key={\`${label}-${i}\`}`.
- **Function components only** — `export const Name = (props: IProps) => {...}`, never
  `React.FC`, class components, `memo`, `forwardRef`, or `displayName`.
- **Default values via destructuring**, not `defaultProps`: `variant = 'primary'`,
  `status = {}`, `items = 1`.

## 5. Conditional State Wrapper (`StatusContent`)

When a component needs to handle asynchronous state transitions (loading, error, empty data, no search match), use `StatusContent` from `lib-styleguide-simba/status-content`:

```tsx
import { StatusContent } from 'lib-styleguide-simba/status-content';
import type { ITableRecentFoliosProps } from './table-recent-folios.interfaces';

export const TableRecentFolios = ({
  isLoading,
  loadingTemplate,
  isError,
  errorTitle,
  errorDescription,
  errorTemplate,
  isEmpty,
  emptyTitle,
  emptyDescription,
  emptyTemplate,
  noMatch,
  noMatchTitle,
  noMatchDescription,
  noMatchTemplate,
  values,
  rootProps,
}: ITableRecentFoliosProps) => {
  return (
    <section {...rootProps} className={cn('table-recent-folios-container', rootProps?.className)}>
      <StatusContent
        isLoading={isLoading}
        loadingTemplate={loadingTemplate}
        isError={isError}
        errorTitle={errorTitle}
        errorDescription={errorDescription}
        errorTemplate={errorTemplate}
        isEmpty={isEmpty}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        emptyTemplate={emptyTemplate}
        noMatch={noMatch}
        noMatchTitle={noMatchTitle}
        noMatchDescription={noMatchDescription}
        noMatchTemplate={noMatchTemplate}
      >
        <DataTable columnConfig={columnsConfig()} data={values} />
      </StatusContent>
    </section>
  );
};
```

Priority order handled automatically by `<StatusContent>`:

1. `isLoading` ➔ renders `loadingTemplate` or `<Loading />`
2. `isError` ➔ renders `errorTemplate` or `<Error title description />`
3. `noMatch` ➔ renders `noMatchTemplate` or `<NoMatch title description />`
4. `isEmpty` ➔ renders `emptyTemplate` or `<Empty title description />`
5. None active ➔ renders `children`
