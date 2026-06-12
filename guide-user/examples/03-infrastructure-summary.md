# Resumen de Aprendizaje: Capa de Infraestructura

En esta sección hemos implementado el "cuerpo y los músculos" de nuestra aplicación. La infraestructura es la capa más "sucia", ya que lidia con el mundo real (APIs, red, librerías externas), pero hemos aprendido a encapsular esta suciedad para que nuestro Dominio se mantenga puro.

## 1. Abstracción del Cliente HTTP (La prueba de fuego de SOLID)
- **Problema:** Si toda la app usa `axios.get()`, estamos acoplados a una librería de terceros. Si Axios cambia o se vuelve obsoleto, la app entera se rompe.
- **Solución:** Creamos una interfaz `HttpClient` genérica.
- **Victoria:** Implementamos `AxiosHttpClient` y `FetchHttpClient`. Demostramos el principio **Abierto/Cerrado (Open-Closed Principle)** cambiando de motor HTTP modificando únicamente *una línea de código* en nuestro contenedor de inyección, sin tocar ni un solo caso de uso.

## 2. DTOs y Mappers (La Aduana del País)
- **Problema:** Las APIs externas envían datos en formatos que no siempre coinciden con nuestras reglas de negocio (ej. `userId` vs `idUser`, o basura extra en el JSON).
- **Solución:** Creamos los **DTOs** (Data Transfer Objects) que reflejan fielmente lo que manda la API, y los **Mappers**.
- **Victoria:** El `PostMapper` actúa como agente de aduanas. Limpia y traduce los pasaportes de entrada (DTO -> Entity) y de salida (Entity -> DTO). Gracias a esto, el Dominio jamás se entera de la estructura del JSON de la API.

## 3. Implementación del Repositorio
- El `PostRepositoryImpl` orquesta las dos piezas anteriores.
- Inyecta la interfaz `HttpClient` (nunca Axios directo).
- Hace las peticiones y pasa las respuestas crudas por el `PostMapper` antes de entregarlas al Dominio.

## 4. Inyección de Dependencias Avanzada (Tsyringe)
Aprendimos que el inyector tiene tres armas principales, y usar la incorrecta es letal:
- **`useValue`**: Inyecta objetos estáticos literales. (Malo para clases, ya que inyecta la función constructora en lugar de la instancia).
- **`useClass`**: Le da el plano a Tsyringe para que él haga el `new` e inyecte todo el árbol de dependencias automáticamente.
- **`useFactory`**: Nos permite tomar el control manual para armar objetos complejos (como agrupar 6 Use Cases en una sola caja de `IDependencies`), obligando a Tsyringe a construir las piezas internas con `c.resolve(Clase)`.
- **`satisfies` vs `as`**: Aprendimos a usar `satisfies` para validar estrictamente que un objeto cumpla una interfaz en TypeScript, sin forzar (y potencialmente mentir) al compilador como lo hace `as`.

## 5. Separación de Errores Técnicos vs Negocio
- Comprendimos que un error "404 Not Found" o "500 Internal Server Error" no significa nada para el Dominio.
- Encapsulamos estos fallos en un `HttpError` que vive exclusivamente en la carpeta de infraestructura.
- Esto permitirá a la capa de Presentación distinguir entre *"el usuario no llenó bien un dato"* (DomainError) y *"el servidor de Amazon se cayó"* (HttpError) para mostrar alertas distintas.

---
**Estado actual:** Tenemos el cerebro (Dominio) y los músculos (Infraestructura) perfectamente cableados. ¡Todo está listo para recibir la piel (React/UI)!
