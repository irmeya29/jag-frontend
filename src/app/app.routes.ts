import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
  { path: 'actualites', loadComponent: () => import('./pages/actualites/actualites').then(m => m.Actualites) },
  { path: 'apropos', loadComponent: () => import('./pages/apropos/apropos').then(m => m.Apropos) },
  { path: 'mon-espace-just', loadComponent: () => import('./pages/monespacejust/monespacejust').then(m => m.Monespacejust) },
  { path: 'notre-processus', loadComponent: () => import('./pages/notreprocessus/notreprocessus').then(m => m.Notreprocessus) },
  { path: 'realisations', loadComponent: () => import('./pages/realisations/realisations').then(m => m.Realisations) },
  { path: 'nospoles/pole1', loadComponent: () => import('./nospoles/pole1/pole1').then(m => m.Pole1) },
  { path: 'nospoles/pole2', loadComponent: () => import('./nospoles/pole2/pole2').then(m => m.Pole2) },

  // Redirection par défaut
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Redirection 404
  { path: '**', redirectTo: '/home' }
];
