# CountrySearch — Reactive Forms + output + effect

**Archivo:** `src/app/countries/country-search.ts`

## Conceptos que enseña

- `output<T>()` para comunicación hijo → padre
- `FormControl` con `nonNullable: true` (Reactive Forms tipado)
- `toSignal()` para convertir un Observable en señal
- `effect()` para puentear señales a efectos secundarios
- Template inline para componentes pequeños

## Código clave

```typescript
export class CountrySearch {
  readonly searchChange = output<string>();

  protected readonly searchControl = new FormControl('', { nonNullable: true });
  protected readonly searchTerm = toSignal(this.searchControl.valueChanges, { initialValue: '' });

  constructor() {
    effect(() => this.searchChange.emit(this.searchTerm()));
  }

  protected clearSearch(): void {
    this.searchControl.setValue('');
  }
}
```

## Desglose paso a paso

### 1. `FormControl` con `nonNullable`

```typescript
protected readonly searchControl = new FormControl('', { nonNullable: true });
```

Desde Angular 14, los Reactive Forms son estrictamente tipados. `nonNullable: true` garantiza que el tipo inferido es `FormControl<string>` (nunca `string | null`). Esto elimina comprobaciones de nulidad innecesarias.

### 2. `toSignal()` — De Observable a señal

```typescript
protected readonly searchTerm = toSignal(this.searchControl.valueChanges, { initialValue: '' });
```

`FormControl.valueChanges` es un `Observable<string>`. `toSignal()` (de `@angular/core/rxjs-interop`) lo convierte en un `Signal<string>` que Angular puede leer en templates y `computed()`.

- `initialValue: ''` es necesario porque el Observable no emite hasta que el usuario escribe. Sin él, el tipo sería `Signal<string | undefined>`.

### 3. `output<string>()` — Evento tipado

```typescript
readonly searchChange = output<string>();
```

Reemplazo moderno de `@Output() searchChange = new EventEmitter<string>()`. Es más ligero, tipado y funciona como función en lugar de decorador.

En el padre se consume así:

```html
<app-country-search (searchChange)="searchTerm.set($event)" />
```

### 4. `effect()` — Puente señal → output

```typescript
constructor() {
  effect(() => this.searchChange.emit(this.searchTerm()));
}
```

`effect()` se ejecuta cada vez que una señal leída dentro cambia. Aquí lee `searchTerm()` y emite el nuevo valor al padre. Esto reemplaza el patrón manual de llamar a un método `onSearch()` desde el template.

**¿Por qué no usar `(ngModelChange)` directamente?**
Porque las reglas del proyecto exigen Reactive Forms. Con este patrón, la fuente de verdad vive en el componente (`FormControl`), no en el template.

## Patrón alternativo: `outputFromObservable`

Una alternativa más concisa (pero menos educativa) sería:

```typescript
import { outputFromObservable } from '@angular/core/rxjs-interop';

readonly searchChange = outputFromObservable(this.searchControl.valueChanges);
```

Esto conecta directamente el Observable al output sin pasar por señales ni `effect()`. Es válido cuando no necesitas la señal intermedia en el template.
