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

  getUserNotifications(
      userId:number
  ):Observable<any[]>{

    return this.http.get<any[]>(
      `${this.api}/user/${userId}`
    );

  }

  getMyNotifications(){

  return this.http.get<any[]>(

    `${this.api}/my-notifications`

  );

}

getUnreadCount(){

  return this.http.get<number>(

    `${this.api}/my-unread-count`

  );

}

  markAsRead(id:number):Observable<any>{

    return this.http.patch(
      `${this.api}/${id}/read`,
      {}
    );

  }

}