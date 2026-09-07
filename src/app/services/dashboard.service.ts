import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
from '../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api =
    `${environment.apiUrl}/dashboard`;


  constructor(
    private http: HttpClient
  ) {}


  // =========================================================
  // GENERAL DASHBOARD STATISTICS
  // ADMIN / SUPERVISOR
  // =========================================================

  getStats(): Observable<any> {

    return this.http.get<any>(
      `${this.api}/stats`
    );

  }


  // =========================================================
  // DASHBOARD CHARTS
  // ADMIN / SUPERVISOR
  // =========================================================

  getCharts(): Observable<any> {

    return this.http.get<any>(
      `${this.api}/charts`
    );

  }


  // =========================================================
  // RECENT USERS
  // ADMIN / SUPERVISOR
  // =========================================================

  getRecentUsers(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/recent-users`
    );

  }


  // =========================================================
  // RECENT ACTIVITIES
  // ADMIN / SUPERVISOR
  // =========================================================

  getActivities(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/activities`
    );

  }


  // =========================================================
  // RECENT NOTIFICATIONS
  // ADMIN / SUPERVISOR
  // =========================================================

  getNotifications(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/notifications`
    );

  }


  // =========================================================
  // SUPERVISOR DASHBOARD STATISTICS
  // =========================================================

  getSupervisorStats(): Observable<any> {

    return this.http.get<any>(
      `${this.api}/supervisor/stats`
    );

  }


  // =========================================================
  // SUPERVISOR RECENT REQUESTS
  // =========================================================

  getSupervisorRequests(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/supervisor/recent-requests`
    );

  }


  // =========================================================
  // SUPERVISOR PENDING PAYMENTS
  // =========================================================

  getSupervisorPayments(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/supervisor/payments`
    );

  }


  // =========================================================
  // SUPERVISOR NOTIFICATIONS
  // =========================================================

  getSupervisorNotifications(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/supervisor/notifications`
    );

  }


  // =========================================================
  // FARMER DASHBOARD STATISTICS
  // =========================================================

  getFarmerStats(): Observable<any> {

    return this.http.get<any>(
      `${this.api}/farmer/stats`
    );

  }


  // =========================================================
  // FARMER RECENT REQUESTS
  // =========================================================

  getFarmerRequests(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/farmer/requests`
    );

  }


  // =========================================================
  // FARMER WATER SCHEDULES
  // =========================================================

  getFarmerSchedules(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/farmer/schedules`
    );

  }


  // =========================================================
  // FARMER NOTIFICATIONS
  // =========================================================

  getFarmerNotifications(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/farmer/notifications`
    );

  }

}