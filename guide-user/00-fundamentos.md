# 00 — Fundamentos: Clean Architecture + SOLID

## Objetivo

Internalizar las reglas de arquitectura y principios SOLID antes de escribir una sola línea de código. Todo lo que construyas en los módulos siguientes debe poder justificarse con algo de aquí.

---

## Por qué

Sin un marco conceptual claro, las capas se mezclan: Axios termina en el dominio, los componentes hacen fetch directo, las interfaces desaparecen. Esto hace el código frágil, difícil de testear y atado a un framework para siempre.

Clean Architecture resuelve esto con una regla simple: **las dependencias solo apuntan hacia adentro**.

---

## Conceptos clave

### Las 3 capas

**Domain** — el corazón. Modela el negocio en términos del problema, no de la solución técnica.

- Qué vive aquí: entidades, interfaces de repositorios (ports), use cases
- Qué NO vive aquí: Axios, React, tsyringe, localStorage, fetch, cualquier framework
- Regla de oro: si el archivo importa algo que no es TypeScript puro, hay un problema

**Infrastructure** — los adaptadores. Implementa los contratos del domain usando tecnología concreta.

- Qué vive aquí: `PostRepository` (implementa `IPostRepository`), Axios instances, DTOs, mappers, container de DI
- Conoce a `domain`. Nadie más lo conoce a él directamente.

**Presentation** — la UI. Consume los contratos del domain y renderiza.

- Qué vive aquí: componentes React, hooks (TanStack Query), páginas, router
- Conoce a `domain`. Obtiene implementaciones vía DI. Nunca importa `infrastructure`.

### La regla de dependencias

```
presentation  →  domain  ←  infrastructure
```

Si en cualquier momento trazas una flecha desde `domain` hacia afuera, hay una violación.

### Port vs Adapter

- **Port**: la interfaz en `domain` (ej. `IPostRepository`). Define el contrato.
- **Adapter**: la implementación en `infrastructure` (ej. `PostRepository`). Satisface el contrato.

Este patrón es la base del **Dependency Inversion Principle** y permite intercambiar implementaciones (real API, mock, localStorage) sin tocar domain ni presentation.

---

## SOLID aplicado al proyecto

### S — Single Responsibility

Cada clase tiene una razón para cambiar.

- Aplicado: `GetPostsUseCase` solo obtiene la lista de posts. No formatea, no filtra por UI, no hace fetch directamente.

### O — Open/Closed

Extender sin modificar.

- Aplicado: para agregar filtrado por userId, creas `GetPostsByUserUseCase` — no modificas `GetPostsUseCase`.

### L — Liskov Substitution

Las implementaciones deben ser intercambiables.

- Aplicado: `MockPostRepository` y `AxiosPostRepository` implementan la misma `IPostRepository`. Presentation no nota la diferencia.

### I — Interface Segregation

Interfaces pequeñas y enfocadas.

- Aplicado: `IPostRepository` solo tiene métodos de posts. No mezcla comentarios ni usuarios.

### D — Dependency Inversion

Depende de abstracciones, no de concretos.

- Aplicado: `GetPostsUseCase` recibe `IPostRepository`, no `AxiosPostRepository`. tsyringe inyecta la implementación.

---

## Tarea

No hay código en este módulo. La tarea es conceptual:

1. Dibuja en papel (o en un md tuyo) el diagrama de capas de este proyecto.
2. Para cada capa, escribe 3 ejemplos de qué viviría ahí en términos de esta app (posts, users, etc.).
3. Responde: ¿dónde vive TanStack Query y por qué? ¿Dónde vive Axios?

---

## Pistas socráticas

Si te trabas en la tarea:

- ¿Qué pasaría si cambias Axios por `fetch` nativo? ¿Cuántos archivos tendrías que tocar?
- ¿TanStack Query puede funcionar sin React? ¿Eso te dice algo sobre en qué capa vive?
- ¿Un use case debería saber que hay una pantalla que lo consume?

---

## Checkpoint

- Puedes explicar la dirección de dependencias sin mirar el diagrama
- Puedes ubicar cualquier concepto (Axios, TanStack Query, `IPostRepository`, un componente React) en su capa correcta y justificarlo
- Tienes claro qué es un "port" y qué es un "adapter" en el contexto de este proyecto

---

## Trampas comunes

- Poner la lógica de fetch directamente en un componente (presentation hace demasiado)
- Importar Axios en domain porque "es conveniente" (rompe la regla de dependencias)
- Confundir el use case con el repositorio (el use case orquesta, el repo accede a datos)
- Crear una sola interfaz gigante `IRepository` con métodos de todos los recursos (viola ISP)
