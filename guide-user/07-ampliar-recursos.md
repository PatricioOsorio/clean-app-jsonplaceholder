# 07 — Ampliar Recursos: Users, Comments, Todos

## Objetivo

Repetir el patrón completo de Clean Architecture para recursos adicionales de JSONPlaceholder. Este módulo tiene menos guía deliberadamente — la idea es que ya internalices el proceso y puedas aplicarlo autónomamente.

---

## Por qué

Dominar un patrón requiere repetición en contextos distintos. Users tiene relaciones (un user tiene posts, albums, todos). Comments depende de Posts. Estos casos ejercitan relaciones entre entidades y nested routes, que son escenarios más realistas.

---

## Recursos disponibles en JSONPlaceholder

| Recurso | Endpoint principal | Nested |
|---------|-------------------|--------|
| Users | `/users` `/users/:id` | `/users/:id/posts` `/users/:id/albums` `/users/:id/todos` |
| Comments | `/comments` `/comments/:id` | `/posts/:id/comments` |
| Todos | `/todos` `/todos/:id` | `/users/:id/todos` |
| Albums | `/albums` `/albums/:id` | `/users/:id/albums` |
| Photos | `/photos` `/photos/:id` | `/albums/:id/photos` |

---

## Conceptos clave (nuevos en este módulo)

### Relaciones entre entidades

`User` tiene `Post[]`, `Todo[]`, `Album[]`. En domain, decides si la entity `User` incluye esas listas o si son use cases separados.

Pregunta clave: ¿`GetUserWithPostsUseCase` o `GetPostsByUserUseCase`? ¿Cuál respeta mejor S de SOLID?

### Query params para filtrado

JSONPlaceholder soporta filtrado por query param:

```
GET /posts?userId=1    ← todos los posts del user 1
GET /comments?postId=1 ← todos los comentarios del post 1
```

¿Cómo modelas eso en `IPostRepository`? ¿Nuevo método o parámetro opcional en `getAll()`?

### Nested routes en el router

Para mostrar comentarios de un post:
```
/posts/:postId/comments
```

¿Cómo configuras esto en `app.router.tsx` con react-router-dom v7?

---

## Tarea

Elige al menos 2 recursos para implementar end-to-end (domain → infra → presentation):

**Opción A — Users + Posts por User (relación 1:N)**
1. Entity `User` en domain
2. `IUserRepository` con `getAll()`, `getById(id)`, `getPostsByUser(userId)`
3. Use cases correspondientes
4. `UserRepository` en infrastructure
5. Página de lista de usuarios
6. Página de detalle de usuario con sus posts

**Opción B — Comments como recurso nested de Posts**
1. Entity `Comment` en domain
2. `ICommentRepository` con `getByPost(postId)`, `create(comment)`
3. En `PostDetailPage`: muestra los comentarios del post
4. Formulario para agregar comentario

**Opción C — Todos (CRUD completo + filtrado por user)**
1. Entity `Todo` con `completed: boolean`
2. Use case para toggle (`PatchTodoUseCase` con `{ completed: !todo.completed }`)
3. Página de todos con filtro por estado (completado/pendiente) — ese filtro es de UI, ¿dónde vive?

---

## Pistas (mínimas — modo autónomo)

Si te trabas en algo específico, pide una pista. Pero intenta resolverlo primero:

- Relación entre entidades: ¿la entity incluye los datos relacionados o son queries separadas?
- Filtrado: ¿el filtro de UI (completado/pendiente) va en el use case o en el componente?
- Nested route en router: revisa la doc de react-router-dom v7 `createBrowserRouter` con children

---

## Checkpoint

Para cada recurso implementado:
- Domain: entity + interface + use cases, cero dependencias externas
- Infrastructure: DTO + mapper + repository + registro en container
- Presentation: hooks TanStack Query + páginas + rutas lazy
- Relaciones navegables en la UI (ej. click en user → ver sus posts)
- `npm run build` pasa sin errores

---

## Trampas comunes (ya las conoces)

- Romper la regla de dependencias al agregar un recurso nuevo "rápido"
- Mezclar DTOs de distintos recursos en el mismo mapper
- Usar `any` en los DTOs para evitar tipar la respuesta del API
- Query keys inconsistentes entre los nuevos recursos y los existentes (`['users']`, `['users', id]`, etc.)
- Poner el filtro de UI (completado/pendiente) en el use case — el use case no sabe de estados de UI

---

## Siguiente paso

Con este módulo completo, tienes una app real con Clean Architecture funcionando. Posibles extensiones:

- Agregar testing unitario a los use cases (fácil: el repositorio es un mock por inyección)
- Implementar error boundaries en React para capturar errores de TanStack Query
- Agregar paginación (`/posts?_page=1&_limit=10` — JSONPlaceholder lo soporta)
- Explorar TanStack Router como alternativa a react-router-dom
- Desplegar la app y swapear entre `AxiosPostRepository` (prod) y `MockPostRepository` (local) por variable de entorno
