import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'countries',
    loadComponent: () => import('./countries/countries').then((m) => m.Countries),
  },
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
];
