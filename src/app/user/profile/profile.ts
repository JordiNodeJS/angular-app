import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe],
  template: `
    <h1>Perfil del Usuario</h1>
    <p>Visualizando el perfil del usuario con ID: <strong>{{ userId$ | async }}</strong></p>
    <div style="margin-top: 1.5rem; padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 0.5rem; background: #fafafa;">
      <h3 style="margin-bottom: 0.5rem;">Detalles del Usuario</h3>
      <p>Nombre: Usuario Ejemplo</p>
      <p>Email: usuario@ejemplo.com</p>
    </div>
    <div style="margin-top: 1rem; color: #6b7280; font-size: 0.875rem;">
      Usa la URL /user/XXX para ver perfiles de diferentes usuarios.
    </div>
  `,
  styles: ``,
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  userId$ = this.route.paramMap.pipe(map(params => params.get('id')));
}
