import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    title: 'Inicio - Mi App',
    component: HomeComponent
  },
  {
    path: 'about',
    title: 'Sobre nosotros',
    loadComponent: () => import('./about/about').then(m => m.AboutComponent)
  },
  {
    path: 'products',
    title: 'Catálogo de Productos',
    loadChildren: () => import('./products/products.routes').then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'user/:id',
    title: 'Perfil de Usuario',
    loadComponent: () => import('./user/profile/profile').then(m => m.ProfileComponent)
  },
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () => import('./not-found/not-found').then(m => m.NotFoundComponent)
  }
];
