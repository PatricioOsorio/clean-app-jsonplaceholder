# Convención de Importaciones y Alias

Esta referencia define las reglas de importaciones y mapeo de rutas para el frontend del proyecto.

## 1. Path Aliases del Proyecto

Usa siempre los alias configurados para evitar rutas relativas complejas como `../../../../`:

- `@presentation/` -> Apunta a `src/presentation/`
  - Ej: `import { Empty } from '@presentation/shared/components';`
- `@styles/` -> Apunta a `src/styles/`
  - Ej: `@reference "@styles/app.css";`

---

## 2. Convención de Imports del Styleguide

Toda utilidad de UI, estilos comunes, botones e interfaces del sistema de diseño compartido debe importarse desde `lib-styleguide-simba/*`:

```ts
// Utilidades de clases condicionales
import { cn } from 'lib-styleguide-simba/utils';

// Interfaces primitivas
import type {
  IWithRootProps,
  IWithChildren,
  IWithLoading,
  IWithError,
  IWithEmpty,
} from 'lib-styleguide-simba/interfaces';

// Componentes primitivos de Shadcn envueltos en la librería
import { Button } from 'lib-styleguide-simba/button';
import { Spinner } from 'lib-styleguide-simba/shadcn/spinner';

// Hooks de construcción de formularios
import { createFormConfig, useFormBuilder } from 'lib-styleguide-simba/form-builder';
```

---

## 3. Orden de Importaciones Estándar

Los archivos del frontend deben estructurar sus imports en grupos delimitados por una línea en blanco en el siguiente orden estricto:

1. **Librerías Externas y del Framework** (react, react-router, etc.)
2. **Librería de Styleguide local** (`lib-styleguide-simba/*`)
3. **Tipos e Interfaces del Dominio o Propias** (`type` imports con relative o alias)
4. **Componentes y Utilidades Internas** (`@presentation/*` u otros locales)
5. **Importación de Hojas de Estilo CSS** (siempre al final, con ruta relativa `./Component.css`)

### Ejemplo de Orden Correcto

```tsx
import { useMemo } from 'react';
import { NavLink } from 'react-router';

import { cn } from 'lib-styleguide-simba/utils';
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

import type { IPostProps } from './Post.interfaces';
import { Skeleton } from '@presentation/shared/components';
import { getInitials } from '@presentation/utils';

import './Post.css';
```

---

## 4. Relative vs Path Alias

- **Usa Relative (`./`, `../`)**: Para archivos que se encuentran dentro de la misma feature o carpeta (ej: interfaces del componente, skeletons, subcomponentes locales).
- **Usa Alias (`@presentation/`)**: Para cruzar límites de features (ej: importar un componente de comments desde posts) o para importar componentes compartidos desde `src/presentation/shared/components`.
