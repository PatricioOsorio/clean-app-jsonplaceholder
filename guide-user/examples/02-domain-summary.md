# Resumen de Aprendizaje: Capa Domain (Clean Architecture)

A lo largo de la construcción de la capa **Domain** para el módulo de `Posts`, hemos establecido los fundamentos de la aplicación. Esta capa representa las reglas de negocio puras, sin conocimiento de la infraestructura, librerías externas o frameworks de interfaz de usuario.

A continuación se resumen los conceptos y lecciones clave aprendidos:

## 1. Estados Válidos vs. Excepciones
- **Array Vacío NO es un Error:** Una consulta que no encuentra resultados (ej. `getAll`) y devuelve un array vacío `[]` es una operación exitosa. Representa la realidad de la base de datos en ese momento.
- **Cuándo Lanzar Errores:** Los errores (Exceptions) deben reservarse para situaciones anómalas (caída de red) o violaciones estrictas de reglas de negocio/estados imposibles (buscar un ID específico y que no exista).

## 2. Manejo de Errores: Domain Custom Errors
- Evitamos lanzar errores genéricos (`throw new Error('...')`) o acoplar la interfaz de usuario a strings literales.
- **Implementación:** Creamos una clase base `DomainError` de la cual heredan errores específicos como `PostNotFoundError` o `PostInvalidDataError`.
- **Ventaja:** La capa de Presentación puede usar `instanceof` para identificar el tipo exacto de error y traducirlo o manejarlo según corresponda, sin depender del texto del mensaje.

## 3. Validaciones de Reglas de Negocio en Casos de Uso
- La infraestructura falla por problemas técnicos; el dominio falla por **reglas de negocio**.
- Validaciones como "el título no puede estar vacío" pertenecen al Use Case, no a la UI ni a la Base de Datos.
- **UPDATE vs. PATCH:**
  - **Update (PUT):** Reemplazo total. Exige que todos los campos estén presentes y pasen las validaciones.
  - **Patch (PATCH):** Reemplazo parcial. Los campos son opcionales (`undefined` es válido), pero si se envían, deben cumplir con las reglas de negocio (no pueden ser strings vacíos).

## 4. Tipos y Contratos (Repositorios)
- Las interfaces (`abstract class` en TypeScript para soportar inyección) como `PostRepository` definen el **contrato** que la infraestructura debe cumplir.
- Los tipos de entrada (`ICreatePostInput`, `IUpdatePostInput`, `IPatchPostInput`) se definen en el dominio y se exportan para que los casos de uso los consuman.

## 5. Inyección de Dependencias (DI) y TypeScript
- **El Bug de `import type`:** Librerías de DI basadas en decoradores (como `tsyringe`) utilizan reflexión (`reflect-metadata`) en tiempo de ejecución.
- Si importamos el repositorio usando `import type { PostRepository }`, el compilador de TypeScript elimina la referencia en el código emitido. Tsyringe recibe `undefined` y la aplicación falla.
- **Solución:** Importar las clases de inyección como valores reales (`import { PostRepository }`), aunque los usemos solo como tipos en el constructor.

## 6. Independencia de la Infraestructura
- El dominio **asume** que el repositorio hará su trabajo. 
- En un caso de uso como `CreatePost`, el tipo de retorno es estrictamente `Promise<IPost>`. No verificamos si el resultado es `null` por fallas de conexión, ya que la infraestructura se encargará de lanzar sus propios errores técnicos si falla la inserción.
