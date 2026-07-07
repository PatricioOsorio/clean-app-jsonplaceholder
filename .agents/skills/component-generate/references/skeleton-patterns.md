# Patrón de Skeletons (Compound Components)

Esta referencia dicta las reglas para crear e integrar Skeletons en componentes del proyecto.

## 1. Cuándo crear un Skeleton

- **SÍ**: Componentes de entidad unitaria en la capa `features/` (ej. `Post`, `Comment`, `PostDetail`, `PostForm`).
- **NO**: Componentes de tipo contenedor/lista (ej. `Posts`, `CommentsList`). Estos componentes delegan su estado de carga llamando al Skeleton estático del hijo (ej. `<Post.Skeleton items={6} />`).
- **NO**: Componentes compartidos en `shared/components/`. Usan el esqueleto primitivo base directamente.

---

## 2. Estructura y Archivos del Skeleton

El Skeleton no debe mezclarse en el archivo principal del componente. Debe residir en un subdirectorio `Skeleton/`:

```
MyComponent/
└── Skeleton/
    ├── Skeleton.css
    ├── Skeleton.interfaces.ts
    └── Skeleton.tsx
```

---

## 3. Interfaces del Skeleton

La interfaz del Skeleton siempre extiende de `IWithRootProps<'div'>` y acepta opcionalmente la cantidad de elementos a repetir (`items`):

```ts
// MyComponent/Skeleton/Skeleton.interfaces.ts
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IMyComponentSkeletonProps extends IWithRootProps<'div'> {
  items?: number;
}
```

---

## 4. API de Compound Component con Skeleton Primitivo

Usa la API estática expuesta por el `<Skeleton>` base de `@presentation/shared/components`. NUNCA crees elementos div sin estilo o uses Tailwind ad-hoc directamente. Usa:

- `Skeleton.Text`
- `Skeleton.Circle`
- `Skeleton.Rect`
- `Skeleton.Button`

### Implementación del Skeleton (`Skeleton.tsx`)

```tsx
// MyComponent/Skeleton/Skeleton.tsx
import { Skeleton } from '@presentation/shared/components';
import type { IMyComponentSkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const MyComponentSkeleton = ({ items = 3, rootProps }: IMyComponentSkeletonProps) => {
  return (
    <div {...rootProps} className="my-component-skeleton-container">
      {Array.from({ length: items }).map((_, i) => (
        <div key={`my-comp-skeleton-${i}`} className="mcsc__item">
          <div className="mcsc__header">
            <Skeleton.Circle className="mcsc__avatar h-10 w-10" />
            <Skeleton.Text className="h-4 w-32" />
          </div>
          <Skeleton.Text className="mt-2 w-full" />
        </div>
      ))}
    </div>
  );
};
```

---

## 5. CSS del Skeleton (Nesting & Prefijo BEM)

El contenedor del esqueleto usa el nombre `[nombre-componente]-skeleton-container`. Los hijos usan un acrónimo basado en este nuevo nombre (ej: `mcsc` para `my-component-skeleton-container`).

```css
/* MyComponent/Skeleton/Skeleton.css */
@reference "@styles/app.css";

.my-component-skeleton-container {
  @apply flex flex-col gap-4;

  .mcsc__item {
    @apply border-border bg-card flex flex-col rounded-xl border p-4;
  }

  .mcsc__header {
    @apply flex items-center gap-3;
  }
}
```

---

## 6. Registro Estático y Exportación en Barrel

En el componente principal, importa y asigna el Skeleton como propiedad estática:

```tsx
// MyComponent/MyComponent.tsx
import { MyComponentSkeleton } from './Skeleton/Skeleton';

export const MyComponent = (props: IMyComponentProps) => { ... };

MyComponent.Skeleton = MyComponentSkeleton;
```

Y en el barrel file `index.ts` del componente, expón tanto el componente principal como la interfaz del skeleton:

```ts
// MyComponent/index.ts
export * from './MyComponent';
export * from './MyComponent.interfaces';
export * from './Skeleton/Skeleton.interfaces';
```
