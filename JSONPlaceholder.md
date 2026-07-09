# JSONPlaceholder API — Referencia para Agentes

Base URL: `https://jsonplaceholder.typicode.com`
⚠️ API fake: GET es real y persistente. POST/PUT/PATCH/DELETE responden como si funcionaran pero **no persisten nada** (no crear lógica que dependa de guardar cambios).

## Recursos y counts

| Recurso  | Cantidad | Relación         |
| -------- | -------- | ---------------- |
| users    | 10       | raíz             |
| posts    | 100      | userId → users   |
| comments | 500      | postId → posts   |
| albums   | 100      | userId → users   |
| photos   | 5000     | albumId → albums |
| todos    | 200      | userId → users   |

## Endpoints (patrón uniforme por recurso: posts, comments, albums, photos, todos, users)

```
GET    /{recurso}              lista (filtros abajo)
GET    /{recurso}/{id}         uno solo
POST   /{recurso}              crear (simulado, 201)
PUT    /{recurso}/{id}         reemplazar (simulado, 200)
PATCH  /{recurso}/{id}         update parcial (simulado, 200)
DELETE /{recurso}/{id}         eliminar (simulado, 200, {})
```

## Rutas anidadas (atajos de filtro)

- `GET /posts/{id}/comments` ≡ `GET /comments?postId={id}`
- `GET /albums/{id}/photos` ≡ `GET /photos?albumId={id}`
- `GET /users/{id}/posts`
- `GET /users/{id}/albums`
- `GET /users/{id}/todos`

## Query params comunes

- `_page`, `_limit` → paginación
- `_sort`, `_order` (asc|desc) → solo en `/posts`
- `userId` → filtro en posts, albums, todos
- `postId` → filtro en comments
- `albumId` → filtro en photos
- `completed` (bool) → filtro en todos

## Schemas (campos clave)

- **Post**: id, userId, title, body
- **Comment**: id, postId, name, email, body
- **Album**: id, userId, title
- **Photo**: id, albumId, title, url, thumbnailUrl
- **Todo**: id, userId, title, completed(bool)
- **User**: id, name, username, email, phone, website, address{street,suite,city,zipcode,geo{lat,lng}}, company{name,catchPhrase,bs}

## Notas para el agente

- Sin auth, sin rate limit documentado.
- `POST /posts` siempre devuelve id=101 (no incrementa realmente).
- No hay endpoint de búsqueda por texto libre; solo filtros exactos por FK.
- Todos los `id` son integers en path.
