# Countries (Página) — Composición y estado derivado

**Archivos:** `src/app/countries/countries.ts`, `countries.html`, `countries.scss`

## Conceptos que enseña

- Composición de componentes (smart + presentational)
- `inject()` para inyección de dependencias
- `signal()` para estado local
- `computed()` encadenados para estado derivado
- Control flow nativo: `@if`, `@else if`, `@else`, `@for` con `track`, `@empty`
- Lazy loading en rutas

## Código clave

```typescript
export class Countries {
  private readonly countryService = inject(CountryService);

  protected readonly loading = this.countryService.resource.isLoading;
  protected readonly errorMessage = computed(() =>
    this.countryService.resource.error()
      ? 'No se pudieron cargar los países. Inténtalo de nuevo más tarde.'
      : '',
  );

  protected readonly searchTerm = signal('');

  private readonly countries = computed(() =>
    [...(this.countryService.resource.value() ?? [])].sort((a, b) =>
      a.name.common.localeCompare(b.name.common),
    ),
  );

  protected readonly filteredCountries = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const list = this.countries();
    if (!term) return list;
    return list.filter(/* ... */);
  });

  protected readonly totalPopulation = computed(() =>
    this.filteredCountries().reduce((sum, c) => sum + c.population, 0),
  );
}
```

## Desglose

### 1. Patrón Smart Component (Orquestador)

Esta página es un **smart component**: inyecta servicios, gestiona estado y coordina componentes hijos. Los hijos (`CountrySearch`, `CountryCard`) son presentacionales y no saben de dónde vienen los datos.

```
Countries (smart)
  ├── CountrySearch (presentational) → emite eventos
  └── CountryCard (presentational)  → recibe datos
```

### 2. Cadena de `computed()` — Estado derivado

Las señales derivadas forman una cadena donde cada nivel depende del anterior:

```
resource.value()                  ← datos crudos de la API
  └─→ countries                   ← ordenados alfabéticamente
        └─→ filteredCountries     ← filtrados por searchTerm
              └─→ totalPopulation ← suma de población
```

Angular solo recalcula un `computed()` cuando sus dependencias cambian. Si `searchTerm` cambia, se recalculan `filteredCountries` y `totalPopulation`, pero **no** `countries` (porque no depende de `searchTerm`).

### 3. `signal('')` como estado local

```typescript
protected readonly searchTerm = signal('');
```

El término de búsqueda es estado local del componente. Se actualiza desde el template cuando `CountrySearch` emite:

```html
<app-country-search (searchChange)="searchTerm.set($event)" />
```

### 4. Control flow nativo en el template

```html
@if (loading()) {
  <!-- estado de carga -->
} @else if (errorMessage()) {
  <!-- estado de error -->
} @else {
  <ul>
    @for (country of filteredCountries(); track country.name.common) {
      <li>
        <app-country-card [country]="country" />
      </li>
    } @empty {
      <!-- estado vacío -->
    }
  </ul>
}
```

| Sintaxis | Reemplaza a | Ventaja |
| :--- | :--- | :--- |
| `@if / @else if / @else` | `*ngIf` | Soporte nativo para `else if`, sin `ng-template` |
| `@for` con `track` | `*ngFor; trackBy` | `track` es obligatorio, fuerza buenas prácticas de rendimiento |
| `@empty` | Condicional manual | Bloque declarativo para listas vacías |

### 5. Lazy loading en rutas

```typescript
// app.routes.ts
{
  path: 'countries',
  loadComponent: () => import('./countries/countries').then((m) => m.Countries),
}
```

El componente `Countries` y todos sus hijos (`CountrySearch`, `CountryCard`) se cargan **solo cuando el usuario navega a `/countries`**. En el build se ve como un chunk separado:

```
Lazy chunk files    | Names         |  Raw size
chunk-VHBMWC6L.js  | countries     | 365.01 kB
```

### 6. Visibilidad `protected`

Todas las propiedades usadas solo en el template son `protected`. Esto comunica la intención:

- `private` → solo usado dentro de la clase TypeScript
- `protected` → usado en la clase y en el template
- `public` (sin modificador) → API pública del componente (inputs, outputs)
