import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Actualites } from './pages/actualites/actualites';
import { Apropos } from './pages/apropos/apropos';
import { Monespacejust } from './pages/monespacejust/monespacejust';
import { Notreprocessus } from './pages/notreprocessus/notreprocessus';
import { Realisations } from './pages/realisations/realisations';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'contact', component: Contact },
  { path: 'actualites', component: Actualites },
  { path: 'apropos', component: Apropos },
  { path: 'mon-espace-just', component: Monespacejust },
  { path: 'notre-processus', component: Notreprocessus },
  { path: 'realisations', component: Realisations },

  // Redirection par défaut
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Redirection 404
  { path: '**', redirectTo: '/home' }
];