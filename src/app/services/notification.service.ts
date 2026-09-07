import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private api =
    `${environment.apiUrl}/notifications`;


  constructor(
    private http: HttpClient
  ) {}


  // =========================================================
  // GET MY NOTIFICATIONS
  // =========================================================

  getMyNotifications(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-notifications`
    );

  }


  // =========================================================
  // GET MY UNREAD NOTIFICATION COUNT
  // =========================================================

  getUnreadCount(): Observable<number> {

    return this.http.get<number>(
      `${this.api}/my-unread-count`
    );

  }


  // =========================================================
  // MARK NOTIFICATION AS READ
  // =========================================================

  markAsRead(
    id: number
  ): Observable<any> {

    return this.http.patch(
      `${this.api}/${id}/read`,
      {}
    );

  }


  // =========================================================
  // DELETE MY NOTIFICATION
  // =========================================================

  deleteNotification(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.api}/${id}`
    );

  }

}