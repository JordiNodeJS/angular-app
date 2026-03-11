import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <h1>Bienvenido a la App</h1>
    <p>Esta es la página de inicio. Aquí puedes ver las últimas novedades y navegar a través de las diferentes secciones usando el menú superior.</p>
    <div style="margin-top: 2rem; padding: 1rem; background: #eff6ff; border-radius: 0.5rem; color: #1e40af;">
      <strong>Tip:</strong> Prueba a navegar a las diferentes secciones para ver cómo cambia la URL y el contenido sin recargar la página.
    </div>
  `,
  styles: ``,
})
export class HomeComponent {}
