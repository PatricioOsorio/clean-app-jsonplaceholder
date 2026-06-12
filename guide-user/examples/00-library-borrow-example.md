# Ejemplo Completo: Préstamo de Libros (Arquitectura Limpia)

Ejemplo práctico para entender el flujo completo de datos y responsabilidades entre capas en un dominio de biblioteca (E-commerce/Juegos).

---

## 1. Capa de Dominio (Domain)

Lógica y reglas de negocio puras. Sin frameworks ni dependencias externas.

### Entidad
`domain/entities/Book.ts`
```typescript
export interface Book {
  id: string;
  title: string;
  isAvailable: boolean;
}
```

### Puerto / Port (Interfaz)
`domain/ports/IBookRepository.ts`
```typescript
import { Book } from '../entities/Book';

export interface IBookRepository {
  findById(id: string): Promise<Book | null>;
  getUserActiveLoansCount(userId: string): Promise<number>;
  updateAvailability(id: string, isAvailable: boolean): Promise<void>;
}
```

### Caso de Uso / Use Case (Reglas de Negocio)
`domain/use-cases/BorrowBookUseCase.ts`
```typescript
import { IBookRepository } from '../ports/IBookRepository';

export class BorrowBookUseCase {
  constructor(private bookRepo: IBookRepository) {}

  async execute(bookId: string, userId: string): Promise<boolean> {
    // 1. Regla de negocio: Verificar límite de préstamos
    const activeLoans = await this.bookRepo.getUserActiveLoansCount(userId);
    if (activeLoans >= 3) {
      throw new Error("Límite de préstamos excedido (máximo 3)");
    }

    // 2. Regla de negocio: Verificar disponibilidad
    const book = await this.bookRepo.findById(bookId);
    if (!book || !book.isAvailable) {
      throw new Error("Libro no disponible");
    }

    // 3. Ejecutar acción
    await this.bookRepo.updateAvailability(bookId, false);
    return true;
  }
}
```

---

## 2. Capa de Infraestructura (Infrastructure)

Detalles técnicos, adaptadores, llamadas de red y contenedores de dependencias.

### DTO (Data Transfer Object)
`infrastructure/dtos/ApiBookDTO.ts`
```typescript
export interface ApiBookDTO {
  book_id: string;      // Formato externo (snake_case)
  book_title: string;
  status: 'free' | 'borrowed';
}
```

### Mapper (Adaptador de Estructura de Datos)
`infrastructure/mappers/BookMapper.ts`
```typescript
import { Book } from '../../domain/entities/Book';
import { ApiBookDTO } from '../dtos/ApiBookDTO';

export class BookMapper {
  static toDomain(dto: ApiBookDTO): Book {
    return {
      id: dto.book_id,
      title: dto.book_title,
      isAvailable: dto.status === 'free'
    };
  }
}
```

### Adaptador / Adapter (Repositorio Concreto)
`infrastructure/repositories/ApiBookRepository.ts`
```typescript
import axios from 'axios';
import { IBookRepository } from '../../domain/ports/IBookRepository';
import { Book } from '../../domain/entities/Book';
import { ApiBookDTO } from '../dtos/ApiBookDTO';
import { BookMapper } from '../mappers/BookMapper';

export class ApiBookRepository implements IBookRepository {
  async findById(id: string): Promise<Book | null> {
    const response = await axios.get<ApiBookDTO>(`/api/books/${id}`);
    if (!response.data) return null;
    
    // Mapea DTO técnico de API a Entidad limpia de dominio
    return BookMapper.toDomain(response.data);
  }

  async getUserActiveLoansCount(userId: string): Promise<number> {
    const response = await axios.get<{ count: number }>(`/api/users/${userId}/loans/count`);
    return response.data.count;
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<void> {
    const status = isAvailable ? 'free' : 'borrowed';
    await axios.patch(`/api/books/${id}`, { status });
  }
}
```

### Inyección de Dependencias
`infrastructure/di/container.ts`
```typescript
import { container } from 'tsyringe';
import { ApiBookRepository } from '../repositories/ApiBookRepository';

// Registra la clase concreta para resolver el puerto
container.register('IBookRepository', { useClass: ApiBookRepository });
```

---

## 3. Capa de Presentación (Presentation)

React, Hooks, UI, manejo del estado de UI.

### Custom Hook (TanStack Query)
`presentation/hooks/useBorrowBook.ts`
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from 'tsyringe';
import { BorrowBookUseCase } from '../../domain/use-cases/BorrowBookUseCase';

export function useBorrowBook() {
  const queryClient = useQueryClient();
  // Resolvemos el caso de uso del contenedor. El repo se inyecta solo.
  const borrowUseCase = container.resolve(BorrowBookUseCase);

  return useMutation({
    mutationFn: ({ bookId, userId }: { bookId: string; userId: string }) => 
      borrowUseCase.execute(bookId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });
}
```

### Componente React
`presentation/components/BookDetail.tsx`
```typescript
import React from 'react';
import { useBorrowBook } from '../hooks/useBorrowBook';

export const BookDetail = ({ bookId, userId }: { bookId: string; userId: string }) => {
  const borrowMutation = useBorrowBook();

  const handleBorrow = () => {
    borrowMutation.mutate(
      { bookId, userId },
      {
        onError: (err) => alert(err.message), // Muestra errores de reglas de negocio
        onSuccess: () => alert("¡Libro prestado con éxito!")
      }
    );
  };

  return (
    <button 
      onClick={handleBorrow} 
      disabled={borrowMutation.isPending}
    >
      {borrowMutation.isPending ? 'Procesando...' : 'Pedir Prestado'}
    </button>
  );
};
```
