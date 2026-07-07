# Patrones de Clean Architecture en Componentes UI

Esta referencia es mandatoria al implementar componentes React del proyecto.

## 1. CSS y BEM (Nesting & Tailwind v4)

- **Contenedor Principal**: Formato `kebab-case` + el sufijo `-container`. Ej: `.post-detail-container`.
- **Elementos Descendientes**: Iniciales abreviadas del contenedor principal + `__` + nombre del elemento. Ej: `PostDetail` -> contenedor `.post-detail-container` -> hijos `.pdc__title`, `.pdc__header`.
- **Regla de No Anidación**: BEM no se anida. Nunca escribas `.pdc__header__title`. Usa un nivel plano bajo el contenedor: `.pdc__title`.
- **Modificadores**: Se anexan con `--`. Ej: `nc__link--active`, `optimistic-working`.

### Estructura de CSS con Nesting Nativo

```css
@reference "@styles/app.css";

.post-detail-container {
  @apply flex w-full flex-col gap-6;

  .pdc__header {
    @apply border-border space-y-4 border-b pb-6;
  }

  .pdc__title {
    @apply text-foreground text-3xl leading-tight font-extrabold;
  }

  /* Modificador condicional */
  &.optimistic-deleting {
    @apply pointer-events-none opacity-60;
  }
}
```

### Tabla de Prefijos BEM Reales en el Proyecto

Usa las iniciales del componente base como prefijo para mantener consistencia:

- `Post` -> `.post-container` -> `pc__`
- `PostDetail` -> `.post-detail-container` -> `pdc__`
- `PostForm` -> `.post-form-container` -> `pfc__`
- `Comment` -> `.comment-container` -> `cc__`
- `CommentsList` -> `.comments-list-container` -> `clc__`
- `Empty` / `Error` -> `.empty-container` / `.error-container` -> `ec__` (Comparten ec__ pero se aíslan por su contenedor)

---

## 2. Tipado de Props y View Models (VM)

El proyecto separa el contrato de datos del dominio (View Model) del contrato de propiedades de React.

### Caso A: Componente de Entidad Unitaria (ej. `Post`, `Comment`)

No extienden el VM completo como propiedades directas; reciben el VM encapsulado en una prop dedicada.

```ts
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { IPostVM } from '../../models/post';

export interface IPostProps extends IWithRootProps<'article'> {
  post: IPostVM;
  isOptimistic?: boolean;
  onEdit?: (post: IPostVM, e: React.MouseEvent) => void;
  onDelete?: (id: number, e: React.MouseEvent) => void;
}
```

### Caso B: Componente Contenedor o Listas (ej. `Posts`, `CommentsList`)

Extienden una interfaz VM que declara la colección de datos.

```ts
import type {
  IWithRootProps,
  IWithLoading,
  IWithError,
  IWithEmpty,
} from 'lib-styleguide-simba/interfaces';
import type { IPostVM } from '../../models/post';

export interface IPostsVM {
  posts?: IPostVM[];
}

export interface IPostsProps extends IWithRootProps<'section'>, IPostsVM {
  status?: IWithLoading & IWithError & IWithEmpty;
  onPostClick?: (id: number) => void;
}
```

### Caso C: Componente Compartido Simple (ej. `Empty`, `Error`)

Definen las propiedades de datos directamente en el VM de manera opcional.

```ts
export interface IEmptyVM {
  title?: string;
  description?: string;
}
export interface IEmptyProps extends IWithRootProps<'div'>, IEmptyVM {}
```

---

## 3. rootProps Pattern y `cn()`

El contenedor raíz del componente React debe propagar el spread de `rootProps` y combinar su clase BEM nativa con la clase del consumidor usando `cn`:

```tsx
import { cn } from 'lib-styleguide-simba/utils';
import type { IPostProps } from './Post.interfaces';

export const Post = ({ rootProps, post, isOptimistic }: IPostProps) => (
  <article
    {...rootProps}
    className={cn('post-container', { 'optimistic-working': isOptimistic }, rootProps?.className)}
  >
    {/* Contenido */}
  </article>
);
```

---

## 4. StatusContent y Default Status

Cualquier componente que muestre datos provenientes de llamadas asíncronas debe encapsular su renderizado en `<StatusContent>`.

- Siempre defaultea `status = {}` para evitar errores de desestructuración.
- Calcula de manera segura el estado vacío: `isEmpty={status.isEmpty || data.length === 0}`.

```tsx
import { StatusContent, Empty, Error } from '@presentation/shared/components';

export const Posts = ({ posts, status = {} }: IPostsProps) => (
  <StatusContent
    {...status}
    isEmpty={status.isEmpty || !posts || posts.length === 0}
    emptyTemplate={status.emptyTemplate ?? <Empty title="Sin publicaciones" />}
    errorTemplate={status.errorTemplate ?? <Error description={status.errorDescription} />}
    loadingTemplate={status.loadingTemplate ?? <Post.Skeleton items={6} />}
  >
    {/* Renderizar lista */}
  </StatusContent>
);
```

---

## 5. Callbacks y Eventos

Cuando agregues manejadores de eventos como botones edit/delete sobre elementos interactivos contenedores (tarjetas clickeables), evita la propagación del evento para no disparar acciones del contenedor:

```tsx
<Button
  onClick={(e) => {
    e.stopPropagation(); // Detener burbujeo hacia el onClick de rootProps
    onEdit?.(post, e);
  }}
>
  Editar
</Button>
```
