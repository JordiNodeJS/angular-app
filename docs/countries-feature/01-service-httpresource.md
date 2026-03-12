# CountryService — httpResource

**Archivo:** `src/app/countries/country.service.ts`

## Conceptos que enseña

- `httpResource<T>()` como alternativa declarativa a `HttpClient.get()`
- Servicio singleton con `providedIn: 'root'`
- Inyección de dependencias con `inject()`

## Código

```typescript
import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Country } from '../models/country';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly apiUrl =
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags';

  readonly resource = httpResource<Country[]>(() => this.apiUrl);
}
```

## ¿Qué es `httpResource`?

Introducido en Angular v19, `httpResource` reemplaza el patrón clásico de:

```typescript
// Antes (imperativo)
this.http.get<Country[]>(url).subscribe({
  next: (data) => { this.data.set(data); this.loading.set(false); },
  error: () => { this.error.set('Fallo'); this.loading.set(false); },
});
```

Con `httpResource`, Angular gestiona automáticamente el ciclo de vida de la petición HTTP y expone el resultado como **señales reactivas**:

| Señal | Tipo | Descripción |
| :--- | :--- | :--- |
| `resource.value()` | `T \| undefined` | Los datos una vez resueltos |
| `resource.isLoading()` | `boolean` | `true` mientras la petición está en curso |
| `resource.error()` | `unknown` | El error si la petición falla |
| `resource.status()` | `ResourceStatus` | Estado detallado del recurso |

## ¿Por qué un callback `() => this.apiUrl`?

`httpResource` acepta una función reactiva. Si la URL dependiera de una señal (por ejemplo un filtro), Angular volvería a ejecutar la petición automáticamente al cambiar la señal:

```typescript
readonly region = signal('europe');

readonly resource = httpResource<Country[]>(
  () => `https://restcountries.com/v3.1/region/${this.region()}`
);
// Cambiar region() dispara una nueva petición automáticamente
```

En nuestro caso la URL es estática, pero el patrón queda preparado para evolucionar.

## Ventajas frente al patrón clásico

1. **Cero boilerplate:** No hay que crear señales manuales para `loading`, `error` y `data`.
2. **Declarativo:** El recurso se define, no se "ejecuta". Angular decide cuándo lanzar la petición.
3. **Cancelación automática:** Si la URL cambia antes de que la petición anterior termine, Angular la cancela.
4. **Compatible con SSR:** Funciona con Server-Side Rendering sin adaptaciones manuales.
