import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <h1>Sobre Nosotros</h1>
    <p>Somos una empresa dedicada a crear aplicaciones increíbles con las últimas tecnologías.</p>
    <section style="margin-top: 2rem;">
      <h2 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Nuestra Misión</h2>
      <p>Proporcionar las mejores herramientas digitales a nuestros usuarios, garantizando una experiencia fluida y rápida.</p>
    </section>
    <div style="margin-top: 2rem; color: #10b981; font-size: 0.875rem;">
      * Este componente se carga de forma perezosa (Lazy Loading).
    </div>
  `,
  styles: ``,
})
export class AboutComponent {}
