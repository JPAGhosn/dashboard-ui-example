import { Routes } from '@angular/router';
import { formSubmittedGuard } from './shared/guards/form-submitted.guard';
import { authGuard } from './shared/guards/auth.guard';
import { guestGuard } from './shared/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    canMatch: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login-screen/login-screen.component').then(
            (m) => m.LoginScreenComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: '',
    canMatch: [authGuard],
    loadComponent: () =>
      import('./app-layout/app-layout.component').then(
        (m) => m.AppLayoutComponent
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard-component/dashboard-component.component').then(
            (m) => m.DashboardComponentComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile-screen/profile-screen.component').then(
            (m) => m.ProfileScreenComponent
          ),
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./users/users-list/users-list.component').then(
                (m) => m.UsersListComponent
              ),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./users/users-form/users-form.component').then(
                (m) => m.UsersFormComponent
              ),
          },
          {
            path: ':userId',
            loadComponent: () =>
              import('./users/users-form/users-form.component').then(
                (m) => m.UsersFormComponent
              ),
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
