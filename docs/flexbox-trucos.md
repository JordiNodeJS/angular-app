# Trucos y Buenas Prácticas con CSS Flexbox

Flexbox es una de las herramientas más poderosas en CSS moderno para crear layouts (diseños) adaptables y eficientes. A continuación, se detallan los trucos y patrones de uso más prácticos y recomendados a día de hoy, especialmente útiles en aplicaciones Angular y componentes web.

## 1. El Patrón "Spacer" (El Resorte Invisible)

Este es el patrón clásico para empujar elementos hacia los extremos en una barra de navegación (como `<mat-toolbar>`).

```css
.spacer {
  flex: 1 1 auto; /* Crece (1), puede encogerse (1), tamaño base automático (auto) */
}
```

```html
<mat-toolbar>
  <button>Izquierda</button>
  <span class="spacer"></span>
  <button>Derecha</button>
</mat-toolbar>
```

**Alternativa moderna sin elemento vacío (`margin: auto`)**:
Si no quieres ensuciar el HTML con un `<span>` vacío, puedes usar márgenes automáticos en Flexbox. Un margen `auto` en un contenedor flex absorbe todo el espacio libre en esa dirección.

```css
.push-right {
  margin-left: auto; /* o margin-inline-start: auto; para soporte RTL */
}
```

```html
<mat-toolbar>
  <button>Izquierda</button>
  <button class="push-right">Derecha</button>
</mat-toolbar>
```

## 2. El Layout "App Shell" (Footer Pegajoso)

Para lograr que el contenido principal ocupe todo el espacio disponible y empuje el pie de página (footer) hacia abajo, incluso si hay poco contenido.

```css
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ocupa al menos toda la altura de la pantalla */
}

.main-content {
  flex: 1; /* Atajo para flex: 1 1 0%. Toma todo el espacio vertical sobrante */
}
```

## 3. Separación Limpia con `gap`

Antes usábamos márgenes (`margin-right`, `margin-bottom`) para separar elementos flex, lo que requería hacks como `:last-child { margin-right: 0; }`. Hoy en día, **siempre debes usar `gap`**.

```css
.button-group {
  display: flex;
  gap: 16px; /* Separa los hijos por 16px en todas direcciones */
}
```

## 4. El Problema del Texto Desbordado (`min-width: 0`)

A veces, un texto muy largo dentro de un ítem flex hace que el contenedor crezca más allá de su límite, rompiendo el diseño en lugar de truncarse con puntos suspensivos (`...`).

**La solución:** Forzar al ítem flex a tener un ancho mínimo de 0.

```css
.flex-item {
  flex: 1;
  min-width: 0; /* ¡Crucial! Permite que el elemento se encoja por debajo del tamaño de su contenido */
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## 5. Columnas Exactamente Iguales (`flex: 1 1 0`)

Si quieres que varios elementos ocupen **exactamente el mismo ancho**, sin importar cuánto texto o contenido tengan dentro, usa `flex-basis: 0`.

```css
.row {
  display: flex;
  gap: 1rem;
}

.col {
  flex: 1 1 0; /* El '0' ignora el tamaño del contenido al repartir el espacio */
}
```

## 6. Centrado Absoluto Perfecto

El truco más famoso de Flexbox. Centrar un elemento horizontal y verticalmente en su contenedor.

```css
.center-container {
  display: flex;
  justify-content: center; /* Centrado en el eje principal (horizontal por defecto) */
  align-items: center;     /* Centrado en el eje cruzado (vertical por defecto) */
  min-height: 200px;
}
```

## 7. Reordenamiento Visual sin tocar el HTML (`order`)

Muy útil para diseño responsivo (Responsive Design). Puedes cambiar el orden en el que aparecen los elementos en pantalla sin modificar el DOM.

```css
.item-1 { order: 2; }
.item-2 { order: 1; } /* Aparecerá primero visualmente */
.item-3 { order: 3; }
```

## 8. Evitar que un elemento se encoja (`flex-shrink: 0`)

Cuando tienes un contenedor flex que se queda sin espacio, por defecto todos los hijos intentan encogerse (`flex-shrink: 1`). Si tienes un icono, un avatar o un botón que **nunca** debe deformarse o hacerse más pequeño, usa `flex-shrink: 0`.

```css
.avatar {
  width: 48px;
  height: 48px;
  flex-shrink: 0; /* Nunca se encogerá, pase lo que pase */
}
```

## Resumen de la Propiedad Shorthand `flex`

La propiedad `flex` es un atajo para `flex-grow`, `flex-shrink` y `flex-basis`.

| Valor | Equivalente | Uso común |
| :--- | :--- | :--- |
| `flex: 1` | `flex: 1 1 0%` | Ocupa todo el espacio disponible equitativamente. |
| `flex: auto` | `flex: 1 1 auto` | Ocupa el espacio disponible, pero basándose en el tamaño de su contenido. |
| `flex: none` | `flex: 0 0 auto` | Tamaño fijo basado en su contenido. Ni crece ni se encoge. |
| `flex: 0 1 auto` | (Valor por defecto) | No crece, pero sí se encoge si falta espacio. |
