# Ejemplo de Referencia: Componente Compartido (Shared)

Este es el código de referencia completo del componente `Empty` del proyecto. Muestra un componente simple sin skeleton y con VM inline.

---

## 1. Archivo Barrel: `index.ts`

```ts
export * from './Empty';
export * from './Empty.interfaces';
```

---

## 2. Interfaces: `Empty.interfaces.ts`

```ts
import type { IWithChildren, IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { ReactNode } from 'react';

export interface IEmptyVM {
  title?: string;
  description?: string;
}

export interface IEmptyProps extends IWithRootProps<'div'>, IWithChildren, IEmptyVM {
  icon?: ReactNode;
}
```

---

## 3. Hoja de Estilos: `Empty.css`

```css
@reference "@styles/app.css";

.empty-container {
  @apply bg-muted/30 border-border flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-16 text-center;

  .ec__icon {
    @apply text-muted-foreground mb-2 text-3xl;
  }

  .ec__title {
    @apply text-foreground text-lg font-medium;
  }

  .ec__desc {
    @apply text-muted-foreground max-w-sm text-sm;
  }

  .ec__actions {
    @apply mt-4 flex items-center gap-2;
  }
}
```

---

## 4. Componente React: `Empty.tsx`

```tsx
import { cn } from 'lib-styleguide-simba/utils';
import type { IEmptyProps } from './Empty.interfaces';
import './Empty.css';

export const Empty = ({
  rootProps,
  icon,
  title = 'Nothing here yet',
  description = "There's no content to display right now.",
  children,
}: IEmptyProps) => {
  return (
    <div {...rootProps} className={cn('empty-container', rootProps?.className)}>
      {icon && <div className="ec__icon">{icon}</div>}
      <h3 className="ec__title">{title}</h3>
      <p className="ec__desc">{description}</p>
      {children && <div className="ec__actions">{children}</div>}
    </div>
  );
};
```
