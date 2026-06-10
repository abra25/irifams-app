import { Routes } from '@angular/router';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('./public/home/home').then(m => m.Home),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./public/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./public/register/register').then(m => m.Register),
  },
  {
    path: 'admin',
    component: AdminDashboard,
    children: [
      {
        path: 'users',
        loadComponent: () =>
        import('./admin/admin-users/admin-users')
          .then(m => m.AdminUsers),
      }
    ]
  },
  // OFFICER PANEL
// {
//   path: 'officer',
//   component: OfficerLayout,
//   children: [
//     {
//       path: 'dashboard',
//       loadComponent: () =>
//         import('./pannel/officer/officer-dashboard/officer-dashboard')
//           .then(m => m.OfficerDashboard),
//     },
//     {
//       path: 'farms-plots',
//       loadComponent: () =>
//         import('./pannel/officer/farms-plots/farms-plots')
//           .then(m => m.FarmsPlots),
//     },
//     {
//       path: 'settings',
//       loadComponent: () =>
//         import('./pannel/officer/settings/settings')
//           .then(m => m.Settings),
//     },
//     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   ]
// },

  // FARMER PANEL
  // {
  //   path: 'farmer',
  //   component: FamerLayout,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadComponent: () =>
  //         import('./pannel/famer/famer-dashboard/famer-dashboard')
  //           .then(m => m.FamerDashboard),
  //     },
  //     {
  //       path: 'profile',
  //       loadComponent: () => 
  //         import('./pannel/famer/farmer-profile/farmer-profile')
  //           .then(m => m.FarmerProfile),
  //     },
  //     {
  //       path: 'farms-plots',
  //       loadComponent: () =>
  //         import('./pannel/famer/farms-plots/farms-plots')
  //           .then(m => m.FarmsPlots),
  //     },
  //     {
  //       path: 'requests',
  //       loadComponent: () =>
  //         import('./pannel/famer/requests/requests')
  //           .then(m => m.Requests),
  //     },
  //     {
  //       path: 'payments',
  //       loadComponent: () =>
  //         import('./pannel/famer/payments/payments')
  //           .then(m => m.Payments),
  //     },
  //     {
  //       path: 'notifications',
  //       loadComponent: () =>
  //         import('./pannel/famer/notifications/notifications')
  //           .then(m => m.Notifications),
  //     },
  //     { 
  //       path: 'help', 
  //       loadComponent: () => 
  //         import('./pannel/famer/help/help').then(m => m.Help) 
  //     },{
  //     path: 'setting',
  //       loadComponent: () => import('./pannel/famer/settings/settings').then(m => m.Settings),
  //   },


  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //   ],
  // },
];
