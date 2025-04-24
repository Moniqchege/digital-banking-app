import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'customer',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/customer/customer-dashboard/customer-dashboard.component').then(
            (m) => m.CustomerDashboardComponent
          ),
      },
      {
        path: 'accounts',
        loadComponent: () =>
          import('./pages/customer/accounts/accounts.component').then(
            (m) => m.AccountsComponent
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/customer/notifications/notifications.component').then(
            (m) => m.NotificationsComponent
          ),
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./pages/customer/transactions/transactions.component').then(
            (m) => m.TransactionsComponent
          ),
      },
      {
        path: 'transfer',
        loadComponent: () =>
          import('./pages/customer/transfer/transfer.component').then(
            (m) => m.TransferComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/customer/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
    ],
  },

  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./pages/admin/customers/customers.component').then(
            (m) => m.CustomersComponent
          ),
      },
      {
        path: 'accounts',
        loadComponent: () =>
          import('./pages/admin/accounts/accounts.component').then(
            (m) => m.AccountsComponent
          ),
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./pages/admin/transactions/transactions.component').then(
            (m) => m.TransactionsComponent
          ),
      },
      {
        path: 'audit-logs',
        loadComponent: () =>
          import('./pages/admin/audit-logs/audit-logs.component').then(
            (m) => m.AuditLogsComponent
          ),
      },
      {
        path: 'pending-transactions',
        loadComponent: () =>
          import('./pages/admin/pending-transactions/pending-transactions.component').then(
            (m) => m.PendingTransactionsComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
