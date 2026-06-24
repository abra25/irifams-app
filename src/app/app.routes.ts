import { Routes } from '@angular/router';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { FLayout } from './farmer/f-layout/f-layout';
import { SLayout } from './supervisor/s-layout/s-layout';
import { AdminLayout } from './admin/admin-layout/admin-layout';

export const routes: Routes = [
  //PUBLIC & AUTH
  {
    path: '',
    loadComponent: () =>
      import('./public/home/home').then(m => m.Home),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.Login),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./auth/forgot-password/forgot-password').then(m => m.ForgotPassword),
  },

  // ADMIN PANEL
  {
    path: 'admin',
    component: AdminLayout,
    children: [
       {
        path: 'dashboard',
        loadComponent: () =>
        import('./admin/admin-dashboard/admin-dashboard')
          .then(m => m.AdminDashboard),
      }
      ,
      {
        path: 'users',
        loadComponent: () =>
        import('./admin/admin-users/admin-users')
          .then(m => m.AdminUsers),
      },
      {
        path: 'requests',
        loadComponent: () =>
        import('./admin/admin-requests/admin-requests')
          .then(m => m.AdminRequests),
      },
      {
        path: 'plots',
        loadComponent: () =>
        import('./admin/admin-plots/admin-plots')
          .then(m => m.AdminPlots),
      },
      {
        path: 'inputs',
        loadComponent: () =>
        import('./admin/admin-inputs/admin-inputs')
          .then(m => m.AdminInputs),
      },
      {
        path: 'payments',
        loadComponent: () =>
        import('./admin/admin-payments/admin-payments')
          .then(m => m.AdminPayments),
      },
      {
        path: 'notifications',
        loadComponent: () =>
        import('./admin/admin-notifications/admin-notifications')
          .then(m => m.AdminNotifications),
      },
      {
        path: 'logs',
        loadComponent: () =>
        import('./admin/admin-logs/admin-logs')
          .then(m => m.AdminLogs),
      },
      {
        path: 'reports',
        loadComponent: () =>
        import('./admin/admin-report/admin-report')
          .then(m => m.AdminReports),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // FARMER PANEL
  {
    path: 'farmer',
    component: FLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./farmer/dashboard/dashboard')
            .then(m => m.Dashboard),
      },
      {
        path: 'profile',
        loadComponent: () => 
          import('./farmer/my-profile/my-profile')
            .then(m => m.MyProfile),
      },
      {
        path: 'plots',
        loadComponent: () =>
          import('./farmer/my-plots/my-plots')
            .then(m => m.MyPlots),
      },
      {
        path: 'requests',
        loadComponent: () =>
          import('./farmer/my-requests/my-requests')
            .then(m => m.MyRequests),
      },
      {
        path: 'payments',
        loadComponent: () =>
          import('./farmer/payments/payments')
            .then(m => m.Payments),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./farmer/notifications/notifications')
            .then(m => m.Notifications),
      },
      { 
        path: 'request-service', 
        loadComponent: () => 
          import('./farmer/requests/requests').then(m => m.Requests) 
      },
      {
        path: 'water-schedules', 
        loadComponent: () => 
          import('./farmer/water-schedules/water-schedules').then(m => m.WaterSchedules) 
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ],
  },

  // SUPERVISOR PANEL
  {
    path: 'supervisor',
    component: SLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./supervisor/s-dshboard/s-dshboard')
            .then(m => m.SDshboard),
      },
      {
        path: 'farmers',
        loadComponent: () =>
          import('./supervisor/s-farmers/s-farmers')
            .then(m => m.SFarmers),
      },
      {
        path: 'farm-plots',
        loadComponent: () =>
          import('./supervisor/s-plots/s-plots')
            .then(m => m.SPlots),
      },
      {
        path: 'requests',
        loadComponent: () =>
          import('./supervisor/s-requests/s-requests')
            .then(m => m.SRequests),
      },
      {
        path: 'schedules',
        loadComponent: () =>
          import('./supervisor/wsm/wsm')
            .then(m => m.Wsm),
      },
      {
        path: 'inputs',
        loadComponent: () =>
          import('./supervisor/s-inputs/s-inputs')
            .then(m => m.SInputs),
      },
      {
        path: 'payments',
        loadComponent: () =>
          import('./supervisor/s-payments/s-payments')
            .then(m => m.SPayments),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./supervisor/s-report/s-report')
            .then(m => m.SReports),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./supervisor/s-notification/s-notification')
            .then(m => m.SNotification),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  // STAKEHOLDER
  {
    path: 'stakeholder',
      loadComponent: () =>
        import('./stakeholder/stakeholder')
          .then(m => m.Stakeholder),
  }
];
