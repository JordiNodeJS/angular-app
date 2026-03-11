import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [],
  template: `
    <h1>Catálogo de Productos</h1>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
      @for (item of [1, 2, 3, 4]; track item) {
        <div style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 0.5rem; text-align: center;">
          <h3 style="margin-bottom: 0.5rem;">Producto #{{ item }}</h3>
          <p style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color);">{{ (item * 25.50).toFixed(2) }}€</p>
          <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: #fff; border: none; border-radius: 0.25rem; cursor: pointer;">Añadir</button>
        </div>
      }
    </div>
    <div style="margin-top: 1.5rem; padding: 1rem; border-left: 4px solid var(--primary-color); background: #f0f9ff;">
      * Este componente pertenece a un conjunto de rutas hijas (sub-rutas).
    </div>
  `,
  styles: ``,
})
export class ProductListComponent {}
