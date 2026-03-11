import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div style="text-align: center; padding: 3rem 0;">
      <h1 style="font-size: 5rem; color: #ef4444; margin-bottom: 0;">404</h1>
      <p style="font-size: 1.5rem; color: #374151; font-weight: 600;">Página no encontrada</p>
      <p style="margin-top: 1rem;">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
      <a routerLink="/home" style="display: inline-block; margin-top: 2rem; padding: 0.75rem 1.5rem; background: var(--primary-color); color: #fff; border-radius: 0.5rem; font-weight: 600;">Volver al inicio</a>
    </div>
  `,
  styles: ``,
})
export class NotFoundComponent {}
