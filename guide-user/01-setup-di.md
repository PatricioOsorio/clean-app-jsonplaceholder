# 01 — Setup DI: tsyringe + Container + DependenciesProvider

## Objetivo

Configurar el sistema de inyección de dependencias que conectará `infrastructure` con `presentation` sin que se conozcan directamente. Al terminar, tendrás el puente listo para los módulos siguientes.

---

## Por qué

Sin DI, presentation tendría que importar concretamente `AxiosPostRepository` de infrastructure. Eso viola la regla de dependencias. Con tsyringe, presentation solo conoce una interfaz (`IDependencies`) y el container resuelve la implementación correcta en runtime.

Esto también activa la **D de SOLID**: Dependency Inversion — "depende de abstracciones, no de concretos".

---

## Conceptos clave

### Injection Token

Un símbolo (o string) que identifica una dependencia en el container. Permite registrar y resolver implementaciones sin importar la clase concreta.

```
token: DEPENDENCIES_TOKEN  →  container.register(token, { useValue: ... })
                           →  container.resolve(token)
```

### Container

El registro central de tsyringe. Mapea tokens a implementaciones. Lo configuras una vez en infrastructure y lo expones a presentation vía contexto de React.

### DependenciesProvider

Componente React que usa el container para resolver `IDependencies` y lo pone en contexto. Los hooks de presentation llaman `useDependencies()` para obtener los use cases sin saber nada de infrastructure.

---

## Tarea

1. Instala tsyringe (ya tienes `reflect-metadata`).
2. Importa `reflect-metadata` en el entry point de la app (debe ser la primera importación).
3. Habilita `experimentalDecorators` y `emitDecoratorMetadata` en `tsconfig.app.json`.
4. Crea el alias `@di` (en `vite.config.ts` + `tsconfig.app.json`) apuntando a una carpeta `src/di/`.
5. En `src/di/`, crea:
   - `container.ts` — instancia del container de tsyringe
   - `dependencies.ts` — define `IDependencies` (interfaz) y `DEPENDENCIES_TOKEN`
6. Arma `DependenciesProvider` en `src/presentation/context/dependencies.context.tsx` (está comentado, ya tiene la estructura).
7. Úsalo en `src/main.tsx` o `src/App.tsx` para wrappear la app.
8. Verifica que `useDependencies()` no lanza error cuando se llama dentro del provider.

---

## Pistas socráticas

Si te trabas:

- ¿Por qué `reflect-metadata` debe importarse antes que todo? ¿Qué hace ese import?
- ¿`IDependencies` debería vivir en `domain` o en `di/`? ¿Qué importa esa interfaz?
- El container es de infrastructure o de di — ¿importa eso? ¿Qué regla de dependencias aplica?
- ¿Qué pasa si `useDependencies()` se llama fuera del provider? ¿Cómo manejarías eso?

---

## Checkpoint

- `npm run build` pasa sin errores de TypeScript
- `DependenciesProvider` wrappea la app en `main.tsx`/`App.tsx`
- `useDependencies()` resuelve un objeto (aunque esté vacío por ahora) sin lanzar error
- El alias `@di` funciona en imports (`import { container } from '@di/container'`)
- `reflect-metadata` es el primer import en el entry point

---

## Trampas comunes

- Olvidar `reflect-metadata` como primer import → decoradores de tsyringe no funcionan
- No habilitar `emitDecoratorMetadata` → tsyringe no puede inferir tipos en runtime
- Poner el container en `domain` → domain dependería de tsyringe, violación de la regla
- Definir `IDependencies` con todos los use cases mezclados → viola ISP (mejor agrupar)
- Usar `container.resolve()` directamente en componentes → acopla presentation al container
