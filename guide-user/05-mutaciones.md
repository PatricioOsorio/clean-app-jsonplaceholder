# 05 — Mutaciones: POST, PUT, PATCH, DELETE

## Objetivo

Implementar las operaciones de escritura end-to-end usando `useMutation` de TanStack Query, manteniendo la misma separación de capas del módulo anterior. Al terminar podrás crear, actualizar y eliminar posts (de forma simulada — JSONPlaceholder no persiste).

---

## Por qué

Las mutaciones tienen consideraciones adicionales al fetch simple: ¿qué pasa con el cache cuando un post cambia? ¿Cómo muestras feedback al usuario durante la operación? ¿Cómo manejas errores? Separar la lógica de mutación en use cases te permite responder estas preguntas en el lugar correcto.

---

## Conceptos clave

### useMutation

Equivalente a `useQuery` pero para operaciones de escritura. No se ejecuta automáticamente — se llama con `.mutate(payload)` o `.mutateAsync(payload)`.

Estados: `isPending`, `isError`, `isSuccess`.

### Invalidación de Cache

Después de una mutación exitosa, las queries relacionadas deben refrescarse para mostrar datos actualizados. En TanStack Query:

```
queryClient.invalidateQueries({ queryKey: ['posts'] })
```

Esto marca el cache de `['posts']` como stale y lo refetcha si hay suscriptores activos.

### Optimistic Update (opcional)

Actualizar el UI inmediatamente antes de que el servidor responda, revertiendo si falla. TanStack Query lo soporta con `onMutate`, `onError`, `onSettled`. Es avanzado — opcional en este módulo.

### Diferencia PUT vs PATCH

- `PUT`: reemplaza el recurso completo. Requiere todos los campos.
- `PATCH`: actualización parcial. Solo los campos que cambian.

Tu domain ya debe tener tipos distintos para cada uno (`UpdatePostInput` vs `Partial<Post>`).

---

## Tarea

1. Crea hooks de mutación en `src/presentation/hooks/post/`:
   - `use-create-post.hook.ts` → `CreatePostUseCase` + `useMutation`
   - `use-update-post.hook.ts` → `UpdatePostUseCase` + `useMutation`
   - `use-patch-post.hook.ts` → `PatchPostUseCase` + `useMutation`
   - `use-delete-post.hook.ts` → `DeletePostUseCase` + `useMutation`

2. Cada hook debe:
   - Obtener el use case vía `useDependencies()`
   - Configurar `onSuccess` para invalidar las queries afectadas
   - Retornar `{ mutate, isPending, isError, isSuccess }`

3. Crea un formulario simple para crear un post (puede ser en `PostsPage` o en una página separada).

4. En `PostDetailPage`, agrega botones para eliminar y editar el post.

5. Muestra feedback visual durante `isPending` (deshabilita el botón, muestra spinner, etc.).

---

## Pistas socráticas

Si te trabas:
- ¿El hook de mutación debe recibir el ID del post como argumento del hook o de `.mutate()`?
- Cuando eliminas un post y navegas de vuelta a la lista, ¿cómo sabe TanStack Query que debe refrescar?
- ¿`invalidateQueries({ queryKey: ['posts'] })` invalida también `['posts', id]`? Pruébalo.
- ¿Dónde vive el `queryClient` para llamar `invalidateQueries`? ¿El hook lo obtiene cómo?
- Si `useMutation` falla, ¿el error llega al componente? ¿Cómo lo muestras?

---

## Checkpoint

- Crear un post vía formulario devuelve `201` en el Network tab y actualiza la lista (o la invalida)
- Eliminar un post desde el detalle navega de vuelta a la lista y el post no aparece (comportamiento esperado: JSONPlaceholder simula la delete pero no la persiste — la lista vuelve a mostrar todos)
- El botón de submit se deshabilita mientras `isPending` es true
- Ningún archivo de presentation importa `@infrastructure/*`
- Los use cases de mutación están registrados en `IDependencies` y el container los resuelve

---

## Trampas comunes

- Llamar Axios directamente en `useMutation` sin pasar por el use case
- Olvidar invalidar el cache → UI muestra datos desactualizados post-mutación
- Usar la misma `queryKey` con distintos formatos en hooks distintos → invalidación no funciona
- No deshabilitar el botón durante `isPending` → el usuario puede hacer doble submit
- Mezclar lógica de mutación y de query en el mismo hook (un hook, una responsabilidad)
