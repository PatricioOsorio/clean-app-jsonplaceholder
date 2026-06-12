# 03 — Infrastructure: Axios, Repositorios, DTOs, Mappers

## Objetivo

Implementar los contratos del domain usando tecnología concreta. Al terminar, tendrás un `PostRepository` real que habla con JSONPlaceholder vía Axios, y el container de DI sabrá cómo resolverlo.

---

## Por qué

Infrastructure es el único lugar donde vive la "suciedad" tecnológica: HTTP, formatos de API, serialización. Si lo aíslas aquí, el resto del sistema es intercambiable. Cambiar de Axios a fetch, o de REST a GraphQL, solo toca esta capa.

---

## Conceptos clave

### HTTP Client

Una instancia de Axios configurada con `baseURL`, headers comunes, interceptores. No es el repositorio — es la herramienta que el repositorio usa.

### DTO (Data Transfer Object)

La forma exacta de los datos tal como JSONPlaceholder los devuelve. Define tipos TypeScript que reflejan el JSON del API:

```
GET /posts → { userId: number, id: number, title: string, body: string }
```

Esto es un `PostDTO`. El domain no lo conoce.

### Mapper

Función pura que convierte `PostDTO → Post` (entity). Vive en el borde: infrastructure recibe DTO, lo mapea, entrega entity al use case.

Por qué separar: si el API cambia un nombre de campo, solo cambia el mapper.

### PostRepository implements IPostRepository

La implementación concreta. Recibe el HTTP client (o Axios directamente), llama al endpoint, obtiene DTO, mapea, retorna entity.

### Registro en el Container

Antes de que `DependenciesProvider` pueda resolver las dependencias, el container debe saber: "cuando alguien pida `IPostRepository`, dale `PostRepository`".

---

## Tarea

Estructura sugerida en `src/infrastructure/`:

```
infrastructure/
  http/
    axios.instance.ts      ← instancia Axios con baseURL de ENV
  post/
    post.dto.ts            ← tipos PostDTO, CreatePostDTO, etc.
    post.mapper.ts         ← funciones DTO → entity
    post.repository.ts     ← PostRepository implements IPostRepository
  di/
    post.module.ts         ← registra PostRepository en el container
  utils/
    constants.ts           ← ya existe
```

1. Crea la instancia Axios usando `ENV.VITE_API_BASE_URL` (ya definida en `constants.ts`).
2. Define `PostDTO` que refleje la respuesta real de `GET /posts`.
3. Crea el mapper `postDTOToEntity(dto: PostDTO): Post`.
4. Implementa `PostRepository` con `@injectable()` y todos los métodos de `IPostRepository`.
5. Registra `PostRepository` en el container contra el token correcto.
6. Wires el use case `GetPostsUseCase` en `IDependencies` para probar el flujo completo.

---

## Pistas socráticas

Si te trabas:

- ¿La instancia de Axios debería ser un singleton o crearse en cada repositorio? ¿Por qué?
- ¿`PostRepository` debería recibir la instancia de Axios por constructor o importarla directo? ¿Cuál viola D de SOLID?
- ¿El mapper debería ser un método del repositorio o una función aparte? ¿Cuál es más fácil de testear?
- ¿En qué momento conviertes el DTO a entity: antes o después de devolver del repositorio?
- Si JSONPlaceholder devuelve `body` pero tu entity usa `content`, ¿dónde haces ese cambio?

---

## Checkpoint

- `PostRepository` importa CERO cosas de `domain` directamente excepto los tipos/interfaces
- El mapper transforma correctamente un objeto JSON crudo en una entity `Post`
- El container puede resolver `GetPostsUseCase` (o `IPostRepository`) sin error
- Llamar `execute()` del use case en la consola del browser devuelve un array de posts reales de JSONPlaceholder
- `npm run build` pasa sin errores

---

## Trampas comunes

- Devolver el DTO directamente desde el repositorio (presentation vería la forma cruda del API)
- Importar `PostRepository` en presentation (rompe la regla de dependencias)
- No registrar las dependencias en el container antes de que el provider arranque
- Olvidar `@injectable()` en `PostRepository` → tsyringe no puede instanciarlo
- Poner el mapper dentro del componente React → lógica de transformación no pertenece a presentation
