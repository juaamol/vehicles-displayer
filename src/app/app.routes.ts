import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'information/:id',
    loadComponent: () =>
      import('./pages/makes-information/makes-information').then((m) => m.MakesInformation),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
