# Feature: Countries

Guía educativa del módulo `countries/`. Cada archivo del feature enseña un conjunto de conceptos de Angular moderno (v19+). El objetivo es que sirva como referencia práctica para entender la arquitectura de componentes, señales y comunicación entre piezas.

## Estructura de archivos

```
src/app/countries/
  ├── country.service.ts      → Servicio (httpResource)
  ├── country-search.ts       → Componente hijo: buscador
  ├── country-card.ts         → Componente hijo: tarjeta presentacional
  ├── country-card.scss
  ├── countries.ts            → Página orquestadora
  ├── countries.html
  └── countries.scss
src/app/models/
  └── country.ts              → Interfaces del dominio
```

## Flujo de datos

```
CountryService (httpResource)
  └─→ Countries (página)
        ├─→ computed: countries (ordenados)
        ├─→ computed: filteredCountries (depende de searchTerm)
        ├─→ computed: totalPopulation
        │
        ├── CountrySearch ──output()──→ searchTerm.set()
        └── CountryCard ←──input()─── country
```

El flujo es **unidireccional**: los datos bajan por `input()` y los eventos suben por `output()`.

## Documentación por componente

| Archivo | Documento |
| :--- | :--- |
| `country.service.ts` | [01-service-httpresource.md](./01-service-httpresource.md) |
| `country-search.ts` | [02-search-reactive-forms.md](./02-search-reactive-forms.md) |
| `country-card.ts` | [03-card-presentational.md](./03-card-presentational.md) |
| `countries.ts` / `.html` | [04-page-composition.md](./04-page-composition.md) |
