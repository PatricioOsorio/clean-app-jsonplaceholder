# Temario — Clean Architecture con React/TS + JSONPlaceholder

## Objetivo

Aprender las 3 capas de Clean Architecture construyendo una app real que consume JSONPlaceholder. Cada módulo es un paso concreto: lees el concepto, ejecutas la tarea, validas el checkpoint.

## Regla de dependencias (memorizar esto)

```
presentation
     |
     ↓ depende de
   domain       ← infrastructure depende de esto también
     ↑
     |
infrastructure
```

- `domain` no conoce a nadie. Es puro TypeScript.
- `infrastructure` conoce `domain` (implementa sus interfaces).
- `presentation` conoce `domain` (consume sus contratos/use cases).
- `presentation` **nunca** importa `infrastructure` directamente.
- El puente entre presentation e infrastructure es el **contenedor de DI** (tsyringe).

## Cómo usar el agente

El agente es copiloto, no solucionador. Si te atoras:
- Pide una pista, no la solución.
- El agente escala gradual: pregunta → hint específico → referencia de docs.
- Si necesitas que el agente escriba código, pídelo explícitamente.

## Mapa de módulos

| # | Módulo | Qué dominas |
|---|--------|-------------|
| 00 | [Fundamentos](./00-fundamentos.md) | Clean Arch + SOLID aplicados al proyecto |
| 01 | [Setup DI](./01-setup-di.md) | tsyringe, container, tokens, DependenciesProvider |
| 02 | [Domain](./02-domain.md) | Entities, interfaces (ports), use cases |
| 03 | [Infrastructure](./03-infrastructure.md) | Axios, repositorios, DTOs, mappers |
| 04 | [Presentation — queries](./04-presentation.md) | TanStack Query, hooks, páginas, loading/error |
| 05 | [Mutaciones](./05-mutaciones.md) | POST/PUT/PATCH/DELETE, useMutation, cache |
| 06 | [Mock + Persistencia](./06-mock-persistencia.md) | Mock repo, localStorage, Zustand, swap por DI |
| 07 | [Ampliar recursos](./07-ampliar-recursos.md) | Users, Comments, Todos, nested routes |

Orden recomendado: lineal (00 → 07). Cada módulo depende del anterior.

## API de referencia — JSONPlaceholder

Base URL: `https://jsonplaceholder.typicode.com`

| Recurso | Endpoint | Métodos |
|---------|----------|---------|
| Posts | `/posts` `/posts/:id` | GET POST PUT PATCH DELETE |
| Comments | `/comments` `/posts/:id/comments` | GET POST |
| Users | `/users` `/users/:id` | GET |
| Todos | `/todos` `/users/:id/todos` | GET POST PUT PATCH DELETE |
| Albums | `/albums` `/users/:id/albums` | GET |
| Photos | `/photos` `/albums/:id/photos` | GET |

> Las mutaciones son simuladas — JSONPlaceholder las acepta pero no persiste datos.

## Stack del proyecto

- React 19 + TypeScript ~6
- react-router-dom v7 (lazy routes)
- TanStack Query v5
- Axios
- Tailwind CSS v4
- Vite 8
- tsyringe (DI) + reflect-metadata
- React Compiler
- Styleguide lib (linked local): provee `ThemeProvider`, `cn`
