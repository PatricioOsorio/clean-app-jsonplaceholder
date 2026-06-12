# 02 — Domain: Entities, Interfaces, Use Cases

## Objetivo

Construir el corazón de la aplicación: el modelo de negocio puro para Posts. Cuando termines, habrás definido qué ES un Post, cómo se accede a Posts (contrato), y qué operaciones existen sobre Posts (use cases) — todo sin tocar ningún framework.

---

## Por qué

El domain es lo más estable del sistema. Si está bien definido, puedes cambiar Axios por fetch, React por Vue, o REST por GraphQL — y el domain no se mueve. Esa estabilidad solo es posible si no tiene dependencias hacia afuera.

---

## Conceptos clave

### Entity

Representa un concepto de negocio. Sus propiedades reflejan lo que el negocio necesita saber, NO lo que el API devuelve.

Un Post del API tiene `userId`, `id`, `title`, `body`. ¿Tu app necesita todos esos campos? ¿Con esos nombres? Eso es una decisión de dominio.

### DTO (Data Transfer Object)

La forma cruda de los datos tal como llegan del API. Vive en **infrastructure**, no en domain. El mapper convierte DTO → entity en el borde.

### Port (IPostRepository)

Interfaz que define el contrato de acceso a datos. Domain lo declara. Infrastructure lo implementa.

Métodos típicos para posts:

- `getAll(): Promise<Post[]>`
- `getById(id: number): Promise<Post>`
- `create(post: CreatePostInput): Promise<Post>`
- `update(id: number, post: UpdatePostInput): Promise<Post>`
- `patch(id: number, fields: Partial<Post>): Promise<Post>`
- `delete(id: number): Promise<void>`

### Use Case

Una acción de negocio. Clase con un único método `execute()` (S de SOLID). Recibe el repositorio por constructor (D de SOLID). No sabe de dónde vienen los datos ni quién los va a mostrar.

---

## Tarea

Estructura sugerida en `src/domain/`:

```
domain/
  post/
    post.entity.ts       ← interfaz/type Post
    post.repository.ts   ← interfaz IPostRepository
    use-cases/
      get-posts.use-case.ts
      get-post.use-case.ts
      create-post.use-case.ts
      update-post.use-case.ts
      patch-post.use-case.ts
      delete-post.use-case.ts
```

1. Define la entity `Post` con los campos que consideres necesarios.
2. Crea tipos de input para creación (`CreatePostInput`) y actualización (`UpdatePostInput`).
3. Define `IPostRepository` con los métodos de la lista de arriba.
4. Implementa cada use case como clase con `constructor(private repo: IPostRepository)` y método `execute(...)`.
5. Decora con `@injectable()` donde tsyringe lo requiera.

---

## Pistas socráticas

Si te trabas:

- ¿La entity `Post` debería tener el campo `userId` o `user`? ¿Cuál es más útil para el negocio?
- Un use case recibe `IPostRepository` en su constructor — ¿quién se lo pasa? ¿El use case debería saberlo?
- ¿`GetPostsUseCase` y `GetPostUseCase` son dos clases o un método de la misma clase? Piensa en S de SOLID.
- Si mañana cambia el API y `body` se llama `content`, ¿qué cambia en tu domain?

---

## Checkpoint

- Todos los archivos en `src/domain/` son TypeScript puro — cero imports de Axios, React, tsyringe (salvo `@injectable` si lo usas)
- `IPostRepository` cubre los 6 métodos del API (GET, POST, PUT, PATCH, DELETE + listado)
- Cada use case tiene exactamente un método `execute`
- `tsc --noEmit` pasa para los archivos de domain aislados

---

## Trampas comunes

- Importar Axios en domain → violación directa de la regla de dependencias
- Usar el tipo del DTO como entity (la entity NO debe ser la forma cruda del API)
- Poner lógica de presentación en el use case (formatear fechas, calcular strings de UI)
- Crear un `PostUseCase` con 6 métodos → viola S de SOLID
- No definir tipos de input separados → UpdatePostInput y Post no son lo mismo (PUT requiere todos los campos, PATCH no)
