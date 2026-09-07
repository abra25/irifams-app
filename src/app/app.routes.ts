import { Routes } from '@angular/router';

import { FLayout } from './farmer/f-layout/f-layout';
import { SLayout } from './supervisor/s-layout/s-layout';
import { AdminLayout } from './admin/admin-layout/admin-layout';

import { loginGuard } from './guards/login-guard';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';


export const routes: Routes = [

  // =========================================================
  // PUBLIC & AUTH
  // =========================================================

  {
    path: '',

    loadComponent: () =>
      import('./public/home/home')
        .then(m => m.Home),
  },


  // =========================================================
  // LOGIN
  // =========================================================

  {
    path: 'login',

    canActivate: [
      loginGuard
    ],

    loadComponent: () =>
      import('./auth/login/login')
        .then(m => m.Login),
  },


  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  {
    path: 'forgot-password',

    loadComponent: () =>
      import('./auth/forgot-password/forgot-password')
        .then(m => m.ForgotPassword),
  },


  // =========================================================
  // VERIFY OTP
  // =========================================================

  {
    path: 'verify-otp',

    loadComponent: () =>
      import('./auth/verify-otp/verify-otp')
        .then(m => m.VerifyOtp),
  },


  // =========================================================
  // RESET PASSWORD
  // =========================================================
  /*
   * Used after successful OTP verification.
   *
   * Flow:
   *
   * forgot-password
   *        ↓
   * verify-otp
   *        ↓
   * reset-password
   */

  {
    path: 'reset-password',

    loadComponent: () =>
      import('./auth/change-password/change-password')
        .then(m => m.ChangePassword),
  },


  // =========================================================
  // CHANGE PASSWORD
  // =========================================================
  /*
   * Used by authenticated users who need to change
   * their current password, especially temporary password.
   */

  {
    path: 'change-password',

    loadComponent: () =>
      import('./auth/change-password/change-password')
        .then(m => m.ChangePassword),
  },


  // =========================================================
  // ADMIN
  // =========================================================

  {
    path: 'admin',

    component: AdminLayout,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'ADMIN'
      ]
    },

    children: [

      // -------------------------------------------------------
      // ADMIN DASHBOARD
      // -------------------------------------------------------

      {
        path: 'dashboard',

        loadComponent: () =>
          import('./admin/admin-dashboard/admin-dashboard')
            .then(m => m.AdminDashboard),
      },


      // -------------------------------------------------------
      // ADMIN USERS
      // -------------------------------------------------------

      {
        path: 'users',

        loadComponent: () =>
          import('./admin/admin-users/admin-users')
            .then(m => m.AdminUsers),
      },


      // -------------------------------------------------------
      // ADMIN REQUESTS
      // -------------------------------------------------------

      {
        path: 'requests',

        loadComponent: () =>
          import('./admin/admin-requests/admin-requests')
            .then(m => m.AdminRequests),
      },


      // -------------------------------------------------------
      // ADMIN PLOTS
      // -------------------------------------------------------

      {
        path: 'plots',

        loadComponent: () =>
          import('./admin/admin-plots/admin-plots')
            .then(m => m.AdminPlots),
      },


      // -------------------------------------------------------
      // ADMIN INPUTS
      // -------------------------------------------------------

      {
        path: 'inputs',

        loadComponent: () =>
          import('./admin/admin-inputs/admin-inputs')
            .then(m => m.AdminInputs),
      },


      // -------------------------------------------------------
      // ADMIN PAYMENTS
      // -------------------------------------------------------

      {
        path: 'payments',

        loadComponent: () =>
          import('./admin/admin-payments/admin-payments')
            .then(m => m.AdminPayments),
      },


      // -------------------------------------------------------
      // ADMIN NOTIFICATIONS
      // -------------------------------------------------------

      {
        path: 'notifications',

        loadComponent: () =>
          import('./admin/admin-notifications/admin-notifications')
            .then(m => m.AdminNotifications),
      },


      // -------------------------------------------------------
      // ADMIN LOGS
      // -------------------------------------------------------

      {
        path: 'logs',

        loadComponent: () =>
          import('./admin/admin-logs/admin-logs')
            .then(m => m.AdminLogs),
      },


      // -------------------------------------------------------
      // ADMIN REPORTS
      // -------------------------------------------------------

      {
        path: 'reports',

        loadComponent: () =>
          import('./admin/admin-report/admin-report')
            .then(m => m.AdminReports),
      },


      // -------------------------------------------------------
      // DEFAULT ADMIN ROUTE
      // -------------------------------------------------------

      {
        path: '',

        redirectTo: 'dashboard',

        pathMatch: 'full'
      }

    ]
  },


  // =========================================================
  // FARMER
  // =========================================================

  {
    path: 'farmer',

    component: FLayout,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'FARMER'
      ]
    },

    children: [

      // -------------------------------------------------------
      // FARMER DASHBOARD
      // -------------------------------------------------------

      {
        path: 'dashboard',

        loadComponent: () =>
          import('./farmer/dashboard/dashboard')
            .then(m => m.Dashboard),
      },


      // -------------------------------------------------------
      // FARMER PROFILE
      // -------------------------------------------------------

      {
        path: 'profile',

        loadComponent: () =>
          import('./farmer/my-profile/my-profile')
            .then(m => m.MyProfile),
      },


      // -------------------------------------------------------
      // FARMER PLOTS
      // -------------------------------------------------------

      {
        path: 'plots',

        loadComponent: () =>
          import('./farmer/my-plots/my-plots')
            .then(m => m.MyPlots),
      },


      // -------------------------------------------------------
      // FARMER PAYMENTS
      // -------------------------------------------------------

      {
        path: 'payments',

        loadComponent: () =>
          import('./farmer/payments/payments')
            .then(m => m.Payments),
      },


      // -------------------------------------------------------
      // FARMER NOTIFICATIONS
      // -------------------------------------------------------

      {
        path: 'notifications',

        loadComponent: () =>
          import('./farmer/notifications/notifications')
            .then(m => m.Notifications),
      },


      // -------------------------------------------------------
      // FARMER REQUESTS
      // -------------------------------------------------------

      {
        path: 'requests',

        loadComponent: () =>
          import('./farmer/requests/requests')
            .then(m => m.Requests)
      },


      // -------------------------------------------------------
      // FARMER WATER SCHEDULES
      // -------------------------------------------------------

      {
        path: 'water-schedules',

        loadComponent: () =>
          import('./farmer/water-schedules/water-schedules')
            .then(m => m.WaterSchedules)
      },


      // -------------------------------------------------------
      // DEFAULT FARMER ROUTE
      // -------------------------------------------------------

      {
        path: '',

        redirectTo: 'dashboard',

        pathMatch: 'full'
      }

    ]
  },


  // =========================================================
  // SUPERVISOR
  // =========================================================

  {
    path: 'supervisor',

    component: SLayout,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'SUPERVISOR'
      ]
    },

    children: [

      // -------------------------------------------------------
      // SUPERVISOR DASHBOARD
      // -------------------------------------------------------

      {
        path: 'dashboard',

        loadComponent: () =>
          import('./supervisor/s-dshboard/s-dshboard')
            .then(m => m.SDshboard),
      },


      // -------------------------------------------------------
      // SUPERVISOR FARMERS
      // -------------------------------------------------------

      {
        path: 'farmers',

        loadComponent: () =>
          import('./supervisor/s-farmers/s-farmers')
            .then(m => m.SFarmers),
      },


      // -------------------------------------------------------
      // SUPERVISOR FARM PLOTS
      // -------------------------------------------------------

      {
        path: 'farm-plots',

        loadComponent: () =>
          import('./supervisor/s-plots/s-plots')
            .then(m => m.SPlots),
      },


      // -------------------------------------------------------
      // SUPERVISOR REQUESTS
      // -------------------------------------------------------

      {
        path: 'requests',

        loadComponent: () =>
          import('./supervisor/s-requests/s-requests')
            .then(m => m.SRequests),
      },


      // -------------------------------------------------------
      // SUPERVISOR SCHEDULES
      // -------------------------------------------------------

      {
        path: 'schedules',

        loadComponent: () =>
          import('./supervisor/wsm/wsm')
            .then(m => m.Wsm),
      },


      // -------------------------------------------------------
      // SUPERVISOR INPUTS
      // -------------------------------------------------------

      {
        path: 'inputs',

        loadComponent: () =>
          import('./supervisor/s-inputs/s-inputs')
            .then(m => m.SInputs),
      },


      // -------------------------------------------------------
      // SUPERVISOR PAYMENTS
      // -------------------------------------------------------

      {
        path: 'payments',

        loadComponent: () =>
          import('./supervisor/s-payments/s-payments')
            .then(m => m.SPayments),
      },


      // -------------------------------------------------------
      // SUPERVISOR REPORTS
      // -------------------------------------------------------

      {
        path: 'reports',

        loadComponent: () =>
          import('./supervisor/s-report/s-report')
            .then(m => m.SReports),
      },


      // -------------------------------------------------------
      // SUPERVISOR NOTIFICATIONS
      // -------------------------------------------------------

      {
        path: 'notifications',

        loadComponent: () =>
          import('./supervisor/s-notification/s-notification')
            .then(m => m.SNotification),
      },


      // -------------------------------------------------------
      // SUPERVISOR PROFILE
      // -------------------------------------------------------

      {
        path: 'profile',

        loadComponent: () =>
          import('./supervisor/sup-profile/sup-profile')
            .then(m => m.SupProfile),
      },


      // -------------------------------------------------------
      // DEFAULT SUPERVISOR ROUTE
      // -------------------------------------------------------

      {
        path: '',

        redirectTo: 'dashboard',

        pathMatch: 'full'
      }

    ]
  },


  // =========================================================
  // UNKNOWN ROUTES
  // =========================================================

  {
    path: '**',

    redirectTo: ''
  }

];