# Ejemplo de Referencia: Componente de Feature (Entidad)

Este es el código de referencia completo del componente `Post` del proyecto. Muestra la implementación real de BEM, CSS nesting, @apply, Skeletons estructurados y interfaces del VM.

---

## 1. Archivo Barrel: `index.ts`

```ts
export * from './Post';
export * from './Post.interfaces';

export * from './Skeleton/Skeleton.interfaces';
```

---

## 2. Interfaces: `Post.interfaces.ts`

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

---

## 3. Hoja de Estilos: `Post.css`

```css
@reference "@styles/app.css";

.post-container {
  @apply border-border bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-6 shadow-xs transition-shadow duration-200 hover:shadow-md;

  &.optimistic-working {
    @apply pointer-events-none opacity-60;
  }

  .pc__title {
    @apply text-foreground self-start text-start text-xl leading-snug font-semibold;
  }

  .pc__content {
    @apply text-muted-foreground line-clamp-3 self-start text-start text-sm leading-relaxed;
  }

  .pc__footer {
    @apply border-border text-muted-foreground mt-auto flex items-center justify-between border-t pt-3 text-xs;
  }

  .pc__meta {
    @apply flex items-center gap-3;
  }

  .pc__actions {
    @apply flex items-center gap-2;
  }

  .pc__user {
    @apply text-foreground font-medium;
  }

  .pc__id {
    @apply bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-[10px];
  }
}
```

---

## 4. Componente React: `Post.tsx`

```tsx
import { Button } from 'lib-styleguide-simba/button';
import { cn } from 'lib-styleguide-simba/utils';

import type { IPostProps } from './Post.interfaces';

import { PostSkeleton } from './Skeleton/Skeleton';
import './Post.css';

export const Post = ({ rootProps, post, isOptimistic, onEdit, onDelete }: IPostProps) => (
  <article
    {...rootProps}
    className={cn('post-container', { 'optimistic-working': isOptimistic }, rootProps?.className)}
  >
    <h2 className="pc__title">{post.title}</h2>
    <p className="pc__content">{post.content}</p>

    <div className="pc__footer">
      <div className="pc__meta">
        {post.idUser !== undefined && <span className="pc__user">User ID: {post.idUser}</span>}
        <span className="pc__id">Post #{post.id}</span>
      </div>

      <div className="pc__actions">
        {onEdit && (
          <Button
            aria-label="Editar publicación"
            size="sm"
            type="button"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(post, e);
            }}
          >
            Editar
          </Button>
        )}
        {onDelete && (
          <Button
            aria-label="Borrar publicación"
            size="sm"
            type="button"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(post.id, e);
            }}
          >
            Borrar
          </Button>
        )}
      </div>
    </div>
  </article>
);

Post.Skeleton = PostSkeleton;
```

---

## 5. Interfaces del Skeleton: `Skeleton/Skeleton.interfaces.ts`

```ts
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IPostSkeletonProps extends IWithRootProps<'div'> {
  items?: number;
}
```

---

## 6. Hoja de Estilos del Skeleton: `Skeleton/Skeleton.css`

```css
@reference "@styles/app.css";

.post-skeleton-container {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3;

  .psc__item {
    @apply border-border bg-card text-card-foreground pointer-events-none flex flex-col gap-4 rounded-xl border p-6 shadow-xs;
  }

  .psc__footer {
    @apply border-border flex items-center justify-between border-t pt-3;
  }
}
```

---

## 7. Componente Skeleton: `Skeleton/Skeleton.tsx`

```tsx
import { Skeleton } from '@presentation/shared/components';

import type { IPostSkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const PostSkeleton = ({ items = 6, rootProps }: IPostSkeletonProps) => {
  return (
    <div {...rootProps} className="post-skeleton-container">
      {Array.from({ length: items }).map((_, i) => (
        <article key={`skeleton-${i}`} className="psc__item">
          <Skeleton.Text className="h-6 w-3/4" />
          <Skeleton.Text className="w-full" />
          <Skeleton.Text className="w-5/6" />

          <div className="psc__footer">
            <Skeleton.Text className="w-16" />
            <Skeleton.Text className="w-10" />
          </div>
        </article>
      ))}
    </div>
  );
};
```
