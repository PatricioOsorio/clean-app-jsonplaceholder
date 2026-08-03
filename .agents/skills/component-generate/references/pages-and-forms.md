# Pages & forms

Only read this when the request is a page (route-level, usually with steps/forms) or a
standalone form.

## Folder shape

```
new-preticket-page/
├── new-preticket-page.tsx
├── index.ts                              # default export (router lazy-load)
├── new-preticket-page.css
├── general-information-form/
│   ├── general-information-form.tsx
│   ├── general-information-form.config.ts
│   ├── general-information-form.interfaces.ts
│   └── index.ts
├── classification-form/
│   ├── classification-form.tsx
│   ├── classification-form.config.tsx    # .tsx because it returns JSX templates
│   ├── classification-form.interfaces.ts
│   └── index.ts
└── description-form/
    └── ... (same shape)
```

## Form config hook

Logic lives in `<name>.config.ts(x)` as a `use<Name>FormConfig` hook. It wraps
`createFormConfig<IModel>()({...})` in `useMemo`, feeds it to `useFormBuilder`, and
spreads the result out:

```ts
// general-information-form.config.ts
import { FB } from 'form-builder';
import { useMemo } from 'react';
import { createFormConfig, useFormBuilder } from 'lib-styleguide-simba/form-builder';
import type { IGeneralInformationFormModel } from './general-information-form.interfaces';

export const useGeneralInformationFormConfig = () => {
  const configForm = useMemo(
    () =>
      createFormConfig<IGeneralInformationFormModel>()({
        companyName: {
          type: 'combobox',
          label: FB.LabelRequired.fn('Empresa'),
          props: { defaultValue: 'Seleccionar empresa...', items: [] },
          rules: { required: { value: true, message: 'El nombre de la empresa es requerido' } },
        },
        // ... more fields
      }),
    [],
  );
  const formBuilder = useFormBuilder(configForm);
  return { ...formBuilder };
};
```

- Field `type` is a string literal (`'text'`, `'textarea'`, `'combobox'`,
  `'checkbox-group'`, ...) — no enum.
- Lookup data for a field is a module-scope `Record<string, string>`, `SCREAMING_SNAKE`-ish
  by convention but really just a plain const, not exported:
  ```ts
  const COUNTRIES: Record<string, string> = { mx: 'México', gt: 'Guatemala' };
  // consumed: Object.entries(COUNTRIES).map(([value, label]) => ({ value, label }))
  ```
- If a field needs custom JSX rendering, the config file becomes `.tsx` and defines a
  module-scope template helper:
  ```tsx
  const countriesTemplate = ({
    label,
    value,
    checkbox,
  }: {
    label: string;
    value: string;
    checkbox: React.ReactNode;
  }) => <section className="checkbox-country-container">{/* ... */}</section>;
  ```

## Form view

The `.tsx` is presentational: it receives `Input` (auto-derived compound accessors from
the config's field keys — `companyName` → `Input.CompanyName`) and renders them:

```tsx
export const GeneralInformationForm = ({ Input, rootProps }: IGeneralInformationFormProps) => (
  <CardPreticket
    title="Datos Generales"
    {...rootProps}
    rootProps={{ className: 'general-information-form-container', ...rootProps }}
  >
    <Input.CompanyName />
    <Input.RequirementType />
    <Input.BenefitType />
  </CardPreticket>
);
```

Its props interface derives `Input`'s type from the config hook via `ReturnType`, so
the shape never has to be hand-typed twice:

```ts
import type { ComponentProps } from 'react';
import type { CardPreticket } from '@presentation/components/card-preticket';
import type { useGeneralInformationFormConfig } from './general-information-form.config';

export interface IGeneralInformationFormProps extends Partial<
  ComponentProps<typeof CardPreticket>
> {
  Input: ReturnType<typeof useGeneralInformationFormConfig>['Input'];
}
```

## Page orchestration

The page calls each form's config hook, extracts `Input`, and builds a `steps` VM array
that feeds a stepper component:

```tsx
export const NewPreticketPage = () => {
  const { Input: InputStep1, hookForm: _hookFormStep1 } = useGeneralInformationFormConfig();
  const { Input: InputStep2, hookForm: _hookFormStep2 } = useClassificationFormConfig();
  const { Input: InputStep3, hookForm: _hookFormStep3 } = useDescriptionFormConfig();

  const steps = [
    { order: 1, title: 'Datos Generales', content: <GeneralInformationForm Input={InputStep1} /> },
    { order: 2, title: 'Clasificación', content: <ClassificationForm Input={InputStep2} /> },
    { order: 3, title: 'Descripción', content: <DescriptionForm Input={InputStep3} /> },
  ];

  return (
    <StepperPreticket steps={steps}>
      <StepperPreticket.Header />
      <StepperPreticket.Content />
      <StepperPreticket.Footer />
    </StepperPreticket>
  );
};
```

Note the `_hookFormStepN` naming for destructured-but-currently-unused values — prefix
with `_` rather than omitting the destructure, so the shape stays visible.

## Page barrel — default export

Unlike every other barrel in this repo, a page's `index.ts` is a **default export**
(needed for router lazy-loading):

```ts
import { NewPreticketPage } from './new-preticket-page';
export default NewPreticketPage;
```

## Listing / Table Pages Pattern

For pages that manage data tables with search filters (e.g. `folios-page`, `my-pretickets-page`), follow this modular subfolder pattern:

```
folios-page/
├── folios-page.tsx
├── use-folios-page.tsx                   # Page-level state, handlers & data fetching
├── folios-page.css
├── folios.mock.json                      # Local mock dataset (if needed)
├── index.ts                              # Default export barrel
├── filters-form/                         # Embedded search/filter controls
│   ├── filters-form.tsx
│   ├── filters-form.config.ts
│   ├── filters-form.interfaces.ts
│   └── index.ts
└── folios-table/                         # Encapsulated data table view
    ├── folios-table.tsx
    ├── use-folios-table.config.tsx       # Table columns definition & cell renders
    ├── folios-table.interfaces.ts
    └── index.ts
```

### Page Custom Hook (`use-<name>-page.tsx`)

Extract page state (filter parameters, active tab, data list, pagination) into `use<Name>Page`:

```tsx
export const useFoliosPage = () => {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState(MOCK_DATA);

  const handleApplyFilters = (newFilters: Record<string, unknown>) => {
    setFilters(newFilters);
  };

  return { data, filters, handleApplyFilters };
};
```
