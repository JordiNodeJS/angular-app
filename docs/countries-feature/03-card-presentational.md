# CountryCard — Componente presentacional con input()

**Archivo:** `src/app/countries/country-card.ts`

## Conceptos que enseña

- `input.required<T>()` para comunicación padre → hijo
- Componente presentacional (sin estado, sin servicios)
- Encapsulación de estilos con `:host`
- Template inline

## Código clave

```typescript
export class CountryCard {
  readonly country = input.required<Country>();

  protected onFlagError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const flags = this.country().flags;
    if (flags.svg && img.src !== flags.svg) {
      img.src = flags.svg;
    }
  }
}
```

## Desglose

### 1. `input.required<Country>()` — Input tipado y obligatorio

```typescript
readonly country = input.required<Country>();
```

Reemplazo moderno de `@Input() country!: Country`. Ventajas:

| Característica | `@Input()` decorador | `input()` función |
| :--- | :--- | :--- |
| Tipado | Requiere `!` (non-null assertion) | Inferido automáticamente |
| Obligatoriedad | No se valida en compilación | `input.required()` falla si no se provee |
| Lectura | `this.country` (propiedad) | `this.country()` (señal) |
| Reactividad | Necesita `ngOnChanges` o setters | Es una señal, compatible con `computed()` y `effect()` |

En el template se accede con `country()`:

```html
<h3>{{ country().name.common }}</h3>
```

### 2. Componente presentacional (Dumb Component)

Este componente **no inyecta servicios, no tiene estado propio y no modifica datos**. Solo recibe datos por `input()` y los renderiza. Esto lo hace:

- **Predecible:** Dado el mismo input, siempre produce el mismo output visual.
- **Testeable:** Se prueba pasándole datos directamente, sin mocks de servicios.
- **Reutilizable:** Puede usarse en cualquier contexto que tenga un objeto `Country`.

### 3. Encapsulación de estilos con `:host`

```scss
:host {
  position: relative;
  display: block;
  border-radius: 14px;
  overflow: hidden;
  /* ... */

  &:hover {
    transform: translateY(-3px);
  }
}
```

`:host` aplica estilos al elemento raíz del componente (`<app-country-card>`). Esto permite que el componente controle su propia apariencia sin depender de clases externas, mientras el padre controla el layout (posición en el grid).

### 4. Fallback de imagen con `(error)`

```html
<img [src]="country().flags.png" (error)="onFlagError($event)" />
```

Si la imagen PNG falla, `onFlagError` intenta cargar la versión SVG como fallback. Este es un patrón común para manejar recursos externos poco fiables.
