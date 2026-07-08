---
name: component-generate
description: Generar, crear, maquetar o editar componentes UI en React usando los estándares de Clean Architecture del proyecto. Se activa ante cualquier acción relacionada con componentes, vistas o elementos UI.
---

# Component Generator Skill

Esta skill dicta cómo los agentes de IA deben generar o editar componentes en el frontend, siguiendo rígidamente los estándares arquitectónicos y de estilo del proyecto.

## Reglas Irrompibles

- **Directiva CSS Obligatoria**: TODO archivo `.css` de componente DEBE comenzar con `@reference "@presentation/App.css";` en la primera línea.
- **Tailwind v4 y CSS Nesting**: No uses utilidades ad-hoc en el HTML (`className="flex flex-col p-4"`). Usa CSS nesting nativo junto con directivas `@apply` de Tailwind CSS v4 exclusivamente dentro del archivo `.css` del componente.
- **Named Exports**: Todos los componentes se exportan como constantes de flecha (`export const MyComponent = ...`). NUNCA uses `export default` ni la palabra clave `function`.
- **Tipado de Elementos Raíz**: Todos los componentes deben tipar sus props extendiendo `IWithRootProps<'tag'>` de `lib-styleguide-simba/interfaces`, y propagar `{...rootProps}` en el elemento contenedor raíz.
- **Estilos Encapsulados (BEM)**: El elemento contenedor raíz siempre lleva la clase `[kebab-case-componente]-container`. Los elementos descendientes usan la clase abreviada del contenedor más el doble guion bajo (BEM elements), ej. `mcc__title`, `mcc__wrapper`.

---

## Árbol de Decisión para Scaffold

Antes de escribir código o generar archivos, evalúa el requerimiento con este árbol:

```
                  ¿Es un componente en 'features/' o en 'shared/'?
                                     /             \
                                    /               \
                            (features)            (shared)
                                  /                   \
        ¿Es una Entidad Unitaria?                      [Shared Component Scaffold]
         (ej. Post, Comment, PostDetail)               - Sin Skeleton
                /               \                      - Sin StatusContent por defecto
             (Sí)               (No)
              /                   \
  [Feature Entity Scaffold]   [Feature List Scaffold]
  - Con --skeleton            - Sin Skeleton propio
  - Con StatusContent         - Delega skeleton al hijo
                              - Con StatusContent
```

Además, evalúa si es un Formulario:

- **¿Es Formulario?** → **STOP**. No generes estados de inputs ni validaciones manuales. Pídele al usuario que use la skill `/form-generate` para manejar la lógica de `use*.config.ts` y sus validadores.

---

## Flujo de Trabajo Mandatorio

1. **Clasificación**: Identifica el tipo de componente usando el árbol de decisión anterior.
2. **Andamiaje Inicial**: Ejecuta el script de scaffold en el directorio correspondiente:
   - Para entidades complejas en features:
     ```bash
     bash ./scripts/generate.sh <DirectorioPadre> <NombreComponente> --skeleton
     ```
   - Para listas o compartidos simples:
     ```bash
     bash ./scripts/generate.sh <DirectorioPadre> <NombreComponente>
     ```
3. **Lectura de Referencias Obligatoria**:
   - Lee `./references/patterns.md` para dominar BEM, interfaces VM, callbacks y control optimista.
   - Si creaste un Skeleton, lee `./references/skeleton-patterns.md` para implementar el compound component API correcto.
   - Lee `./references/import-map.md` para resolver los path aliases y estructurar los imports en el orden correcto.
4. **Implementación y Detalle**: Abre los archivos generados y añade la lógica visual requerida usando mappers y hooks de forma presentacional.

---

## Estructura de Archivos Esperada

### Componente Estándar (Sin Skeleton)

```
MyComponent/
├── MyComponent.css           # Estilos con nesting y @apply
├── MyComponent.interfaces.ts  # Interfaces extendiendo IWithRootProps
├── MyComponent.tsx           # Componente presentacional puro
└── index.ts                  # Re-exports (barrel file)
```

### Componente de Entidad Complejo (Con Skeleton)

```
MyComponent/
├── MyComponent.css
├── MyComponent.interfaces.ts
├── MyComponent.tsx
├── index.ts
└── Skeleton/
    ├── Skeleton.css
    ├── Skeleton.interfaces.ts
    └── Skeleton.tsx          # Exporta MyComponentSkeleton
```

## 3. `ComponentName.css`

- La primera línea siempre debe ser: `@reference "@presentation/App.css";`
- Priorizar el uso de tokens semánticos de shadcn definidos en [styles-and-tokens.md](file:///Users/1147839/Documents/dev/labs/clean-app-new/.agents/skills/component-generate/references/styles-and-tokens.md).
- Dark mode es el **default** — no usar el prefijo `dark:`.
- Light mode usa la variante `light:`.
- Tailwind v4: usar `@apply` para aplicar utilidades.
- CSS anidado: las clases hijas deben estar dentro del contenedor padre.
- Nombre del contenedor en kebab-case: `component-name-container`.
- Variantes semánticas: `variant-primary`, `variant-success`, etc.

### Orden del bloque `@apply` (obligatorio)

Cada clase CSS sigue **3 reglas de `@apply` en este orden estricto**:

```text
1. @apply <structure>   → sizes, spacing, layout, position, base typography
2. @apply <dark styles> → colors, shadows, borders — dark theme (default)
3. @apply <light styles> → mismos tokens con prefijo light: — light theme
```

Si un bloque no tiene estilos de color, omitir `@apply` 2 y 3. Si no tiene estructura, omitir 1. Nunca mezclar utilidades de estructura y color en el mismo `@apply`.

- **Sin Comentarios**: No incluir comentarios aclaratorios o etiquetas de bloque en el archivo CSS (ej. evitar `/* 1. Structure */` o `/* 2. Dark styles */`). Las directivas `@apply` deben estar limpias de anotaciones de este tipo.
