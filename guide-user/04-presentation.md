# 04 — Presentation: TanStack Query, Hooks, Páginas

## Objetivo

Conectar las 3 capas: presentation consume use cases vía DI, TanStack Query maneja el estado del servidor, y la UI renderiza posts reales. Al terminar verás posts de JSONPlaceholder en el browser.

---

## Por qué

Presentation no hace fetch directamente. Su responsabilidad es: obtener el use case del contexto de DI, pasárselo a TanStack Query como `queryFn`, y renderizar los estados (loading, error, data). Cada responsabilidad separada.

---

## Conceptos clave

### TanStack Query en esta arquitectura

`useQuery` necesita una función que retorne una Promise. Tu use case tiene `execute()` que retorna `Promise<Post[]>`. Eso es exactamente la `queryFn`.

Presentation **no importa Axios**. No sabe si los datos vienen de HTTP, localStorage o un mock. Solo sabe que el use case cumple el contrato.

### Query Key

Identificador único de la query en el cache. Convención en este proyecto:

```
['posts']           ← lista de todos los posts
['posts', id]       ← post individual
['posts', 'user', userId]  ← posts por usuario
```

Importante para la invalidación en el módulo de mutaciones.

### Custom Hook

Encapsula `useDependencies()` + `useQuery`. El componente no llama directamente a ninguno de los dos — llama al hook y recibe `{ data, isLoading, isError }`.

Ejemplo de responsabilidad del hook: `usePosts()` → lista de posts. No filtrado, no paginación (eso sería un hook diferente).

### Estado Loading/Error

El proyecto ya tiene un componente `Loading` en `src/presentation/components/Loading/`. Úsalo.

Para errores, decide: ¿un componente `ErrorMessage`? ¿inline en la página? Eso es decisión de presentación.

---

## Tarea

Estructura sugerida en `src/presentation/`:

```
presentation/
  hooks/
    post/
      use-posts.hook.ts      ← useQuery para GET /posts
      use-post.hook.ts       ← useQuery para GET /posts/:id
  pages/
    PostsPage/
      PostsPage.tsx
      index.ts
    PostDetailPage/
      PostDetailPage.tsx
      index.ts
```

1. Crea `usePosts()`: obtiene `GetPostsUseCase` de `useDependencies()`, pásalo a `useQuery`.
2. Crea `usePost(id)`: ídem para un post individual.
3. Crea `PostsPage`: lista de posts con título y excerpt. Maneja loading y error.
4. Crea `PostDetailPage`: detalle de un post por ID (obtenido del param de la ruta).
5. Agrega las rutas en `app.router.tsx` (lazy, bajo el AppLayout existente).
6. Navega desde lista → detalle.

---

## Pistas socráticas

Si te trabas:
- ¿El hook debe importar `GetPostsUseCase` directamente? ¿O lo obtiene de otra forma?
- Si `useDependencies()` lanza error fuera del provider, ¿dónde está el bug?
- ¿`usePost(id)` debe habilitarse si `id` es undefined? TanStack Query tiene una opción para eso.
- ¿La página de lista necesita saber el ID del post? ¿O solo pasar el link?
- ¿Dónde va la lógica de "si no hay posts, mostrar mensaje vacío"? ¿En el hook o en el componente?

---

## Checkpoint

- Lista de posts renderiza en pantalla con datos reales de JSONPlaceholder
- Navegar a un post individual muestra el título y body del post correcto
- Estado loading muestra el componente `Loading` durante el fetch
- Estado error muestra feedback al usuario (no pantalla en blanco ni error no capturado)
- Network tab del browser: requests van a `https://jsonplaceholder.typicode.com/posts`
- Cero imports de Axios o de `@infrastructure/*` en cualquier archivo de presentation

---

## Trampas comunes

- Llamar `container.resolve()` directamente en el componente (usa `useDependencies()`)
- Poner la `queryFn` inline como lambda con fetch directo (eso saltea la capa de use cases)
- Un componente que hace dos cosas: fetching + transformación de datos para mostrar (separa en hook + componente)
- `queryKey` inconsistente (si usas `['post', id]` en unos lugares y `['posts', id]` en otros, la invalidación no funciona)
- No manejar el estado de `id` undefined al navegar directamente a `/posts/:id` sin parámetro
