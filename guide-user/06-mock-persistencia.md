# 06 — Mock + Persistencia: L de SOLID en acción

## Objetivo

Crear implementaciones alternativas de `IPostRepository` (mock y/o localStorage) y swapearlas vía DI sin tocar una sola línea de presentation. Esto demuestra la L de SOLID (Liskov Substitution) y el poder real de la arquitectura que construiste.

---

## Por qué

Hasta ahora solo tienes una implementación: `AxiosPostRepository`. Pero `IPostRepository` es un contrato — cualquier clase que lo implemente es sustituible. Si presentation se rompe al cambiar de implementación, es una violación arquitectural.

Este módulo también es práctico: mock data es útil para desarrollar UI sin depender de red. localStorage permite simular persistencia real.

---

## Conceptos clave

### Liskov Substitution (L de SOLID)

Si tienes `T` y `S extends T`, entonces `S` debe poder usarse donde se usa `T` sin que el sistema se rompa.

En este caso: `MockPostRepository` y `LocalStoragePostRepository` implementan `IPostRepository`. Presentation usa `IPostRepository`. Cambiar la implementación en el container no debe requerir ningún cambio en presentation.

### Mock Repository

Implementación que devuelve datos estáticos hardcodeados. Útil para:

- Desarrollo sin red
- Testing de UI sin servidor
- Simular escenarios de error

### LocalStorage Repository

Implementación que persiste y lee de `localStorage`. Útil para:

- Simular persistencia en el cliente
- Aprender cómo DI permite swap transparente

### Swap por DI

En el container, cambias una línea:

```
// Antes:
container.register(POST_REPOSITORY_TOKEN, { useClass: AxiosPostRepository });

// Después:
container.register(POST_REPOSITORY_TOKEN, { useClass: MockPostRepository });
```

Presentation no sabe nada de este cambio.

---

## Tarea

**Parte A — Mock Repository:**

1. Crea `src/infrastructure/post/mock-post.repository.ts` que implementa `IPostRepository` con datos estáticos (5-10 posts hardcodeados).
2. Todos los métodos deben funcionar: `getAll()` devuelve la lista, `getById(id)` filtra, `create()` agrega al array, etc.
3. Swapea en el container. Verifica que la app sigue funcionando idéntico.

**Parte B — LocalStorage Repository (opcional pero recomendado):**

1. Crea `LocalStoragePostRepository` que persiste posts en `localStorage` como JSON.
2. Inicializa el storage con datos de seed si está vacío.
3. Implementa todos los métodos de `IPostRepository` leyendo/escribiendo de `localStorage`.
4. Swapea en el container. Verifica que los posts persisten entre recargas.

**Parte C — Store con Zustand (opcional):**

Si quieres explorar Zustand como capa de estado cliente:

1. Crea un store `usePostStore` para posts "favoritos" o posts "drafts" (algo que no existe en el API).
2. Este store NO reemplaza el repositorio — es estado UI local. ¿Dónde vive en el diagrama de capas?

---

## Pistas socráticas

Si te trabas:

- Si cambias la implementación en el container y presentation se rompe, ¿qué violación hay?
- `MockPostRepository.create()` debe simular el comportamiento del API real: ¿qué devuelve `POST /posts` en JSONPlaceholder?
- Si `LocalStoragePostRepository` guarda en JSON, ¿qué pasa si el schema del `Post` entity cambia?
- ¿Zustand para estado de servidor (reemplazar TanStack Query) o para estado cliente (UI local)? ¿Cuál tiene más sentido?
- ¿Podrías crear un `CachedPostRepository` que wrappea `AxiosPostRepository` y agrega cache en memoria? ¿Dónde viviría?

---

## Checkpoint

- Cambiar entre `AxiosPostRepository`, `MockPostRepository`, y `LocalStoragePostRepository` solo requiere cambiar una línea en el container
- Cero cambios en presentation al hacer el swap
- `MockPostRepository` implementa todos los métodos de `IPostRepository` correctamente tipados
- Si usas LocalStorage: los posts persisten entre recargas del browser
- `npm run build` pasa con cualquiera de las tres implementaciones

---

## Trampas comunes

- Importar la implementación específica en presentation para "facilitar" el swap (eso rompe el punto del ejercicio)
- `MockPostRepository` que retorna el tipo incorrecto en algún método (TypeScript lo atrapará si los tipos son correctos)
- Usar `localStorage` directamente en un componente para "guardar" posts → eso pertenece a infrastructure
- Confundir el repositorio de posts (acceso a datos) con un Zustand store (estado reactivo de UI)
