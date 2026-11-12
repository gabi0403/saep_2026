import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Clientes } from './pages/clientes/clientes';
import { Agendamentos } from './pages/agendamentos/agendamentos';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'clientes',
    component: Clientes,
    canActivate: [authGuard]
  },
  {
    path: 'agendamentos',
    component: Agendamentos,
    canActivate: [authGuard]
  }
];
