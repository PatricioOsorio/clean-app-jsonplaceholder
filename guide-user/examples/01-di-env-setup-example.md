# Ejemplo: Setup de DI Basado en Variables de Entorno (Mock vs Real)

Este ejemplo muestra cómo estructurar el contenedor de inyección de dependencias (`tsyringe`) para alternar automáticamente entre una implementación simulada (Mock) y una real (API/Axios) usando variables de entorno de Vite.

---

## 1. Definición del Puerto y Entidad (Domain)

`domain/ports/IHeroRepository.ts`
```typescript
export interface Hero {
  id: string;
  name: string;
}

export interface IHeroRepository {
  getHero(id: string): Promise<Hero>;
}
```

---

## 2. Adaptadores (Infrastructure)

### Adaptador Real (Llamada API)
`infrastructure/repositories/ApiHeroRepository.ts`
```typescript
import axios from 'axios';
import { IHeroRepository, Hero } from '../../domain/ports/IHeroRepository';

export class ApiHeroRepository implements IHeroRepository {
  async getHero(id: string): Promise<Hero> {
    const response = await axios.get<Hero>(`/api/heroes/${id}`);
    return response.data;
  }
}
```

### Adaptador Mock (Simulado en Memoria)
`infrastructure/repositories/MockHeroRepository.ts`
```typescript
import { IHeroRepository, Hero } from '../../domain/ports/IHeroRepository';

export class MockHeroRepository implements IHeroRepository {
  async getHero(id: string): Promise<Hero> {
    return {
      id,
      name: `Héroe Simulado #${id} (Desde Mock)`
    };
  }
}
```

---

## 3. Configuración del Contenedor con Variables de Entorno (Infrastructure/DI)

`infrastructure/di/container.ts`
```typescript
import { container } from 'tsyringe';
import { ApiHeroRepository } from '../repositories/ApiHeroRepository';
import { MockHeroRepository } from '../repositories/MockHeroRepository';

// 1. Leer variable de entorno
const isLocal = import.meta.env.VITE_APP_ENV === 'local';

// 2. Registrar implementación según el entorno
if (isLocal) {
  console.log('[DI] Cargando repositorio MockHeroRepository para desarrollo local.');
  container.register('IHeroRepository', { useClass: MockHeroRepository });
} else {
  console.log('[DI] Cargando repositorio ApiHeroRepository para producción.');
  container.register('IHeroRepository', { useClass: ApiHeroRepository });
}

export { container };
```

---

## 4. Archivos de Configuración del Entorno (.env)

En la raíz del proyecto:

### `.env.local` (Desarrollo local con Mocks)
```env
VITE_APP_ENV=local
```

### `.env.production` (Despliegues reales)
```env
VITE_APP_ENV=production
```
