# Examples

Three ready-to-adapt templates. CSS is intentionally omitted — see `.agents/skills/css-formatter`
for `<name>.css`.

## 1. Leaf component

```ts
// thing.interfaces.ts
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IThingItemVM {
  label: string;
  value: string;
}

export interface IThingProps extends IWithRootProps<'section'> {
  items?: IThingItemVM[];
}
```

```tsx
// thing.tsx
import { cn } from 'lib-styleguide-simba/utils';
import type { IThingProps } from './thing.interfaces';
import './thing.css';

export const Thing = ({ items = [], rootProps }: IThingProps) => (
  <section {...rootProps} className={cn('thing-container', rootProps?.className)}>
    {items.map((item, i) => (
      <div key={`${item.label}-${i}`}>{item.label}: {item.value}</div>
    ))}
  </section>
);
```

```ts
// index.ts
export * from './thing';
export * from './thing.interfaces';
```

## 2. Compound component (parent + one child)

```ts
// card-widget.interfaces.ts
import type { IWithChildren, IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { Card } from 'lib-styleguide-simba/shadcn/card';

export interface ICardWidgetProps extends IWithRootProps<typeof Card>, IWithChildren {
  title: string;
}
```

```tsx
// card-widget.tsx
import { cn } from 'lib-styleguide-simba/utils';
import { CardWidgetSkeleton } from './skeleton/skeleton';
import type { ICardWidgetProps } from './card-widget.interfaces';
import './card-widget.css';

export const CardWidget = ({ title, children, rootProps }: ICardWidgetProps) => (
  <section {...rootProps} className={cn('card-widget-container', rootProps?.className)}>
    <h3>{title}</h3>
    {children}
  </section>
);

CardWidget.Skeleton = CardWidgetSkeleton;
```

```ts
// skeleton/skeleton.interfaces.ts
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface ICardWidgetSkeletonProps extends IWithRootProps<'div'> {
  items?: number;
}
```

```tsx
// skeleton/skeleton.tsx
import { cn } from 'lib-styleguide-simba/utils';
import type { ICardWidgetSkeletonProps } from './skeleton.interfaces';
import './skeleton.css';

export const CardWidgetSkeleton = ({ items = 1, rootProps }: ICardWidgetSkeletonProps) => (
  <div {...rootProps} className={cn('card-widget-skeleton-container', rootProps?.className)}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={`card-widget-skeleton-${i}`} />
    ))}
  </div>
);
```

```ts
// skeleton/index.ts
export * from './skeleton';
export * from './skeleton.interfaces';
```

```ts
// card-widget/index.ts
export * from './card-widget';
export * from './card-widget.interfaces';
export * from './skeleton/skeleton.interfaces';
```

## 3. Form

```ts
// contact-form.interfaces.ts
import type { ComponentProps } from 'react';
import type { CardPreticket } from '@presentation/components/card-preticket';
import type { useContactFormConfig } from './contact-form.config';

export interface IContactFormModel {
  fullName: string;
  email: string;
}

export interface IContactFormProps extends Partial<ComponentProps<typeof CardPreticket>> {
  Input: ReturnType<typeof useContactFormConfig>['Input'];
}
```

```ts
// contact-form.config.ts
import { useMemo } from 'react';
import { FB } from 'form-builder';
import { createFormConfig, useFormBuilder } from 'lib-styleguide-simba/form-builder';
import type { IContactFormModel } from './contact-form.interfaces';

export const useContactFormConfig = () => {
  const configForm = useMemo(() =>
    createFormConfig<IContactFormModel>()({
      fullName: {
        type: 'text',
        label: FB.LabelRequired.fn('Nombre completo'),
        rules: { required: { value: true, message: 'El nombre es requerido' } },
      },
      email: {
        type: 'text',
        label: FB.LabelRequired.fn('Correo'),
        rules: { required: { value: true, message: 'El correo es requerido' } },
      },
    }), []);
  const formBuilder = useFormBuilder(configForm);
  return { ...formBuilder };
};
```

```tsx
// contact-form.tsx
import { CardPreticket } from '@presentation/components/card-preticket';
import type { IContactFormProps } from './contact-form.interfaces';
import './contact-form.css';

export const ContactForm = ({ Input, ...rootProps }: IContactFormProps) => (
  <CardPreticket title="Contacto" {...rootProps}
    rootProps={{ className: 'contact-form-container' }}>
    <Input.FullName />
    <Input.Email />
  </CardPreticket>
);
```

```ts
// index.ts
export * from './contact-form';
export * from './contact-form.interfaces';
export * from './contact-form.config';
```
