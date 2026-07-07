// dashboard.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api =
    `${environment.apiUrl}/dashboard`;

  constructor(
    private http: HttpClient
  ) {}

  getStats(): Observable<any> {

    return this.http.get<any>(
      `${this.api}/stats`
    );

  }

  getCharts(): Observable<any> {

    return this.http.get<any>(
      `${this.api}/charts`
    );

  }

  getSupervisorStats(){

  return this.http.get<any>(
    `${this.api}/supervisor/stats`
  );

}

getSupervisorRequests(){

  return this.http.get<any[]>(
    `${this.api}/supervisor/recent-requests`
  );

}

getSupervisorPayments(){

  return this.http.get<any[]>(
    `${this.api}/supervisor/payments`
  );

}

getSupervisorNotifications(){

  return this.http.get<any[]>(
    `${this.api}/supervisor/notifications`
  );

}

getActivities(){

  return this.http.get<any[]>(

    `${this.api}/activities`

  );

}

getNotifications(){

  return this.http.get<any[]>(

    `${this.api}/notifications`

  );

}


getFarmerStats(){

  return this.http.get<any>(
    `${this.api}/farmer/stats`
  );

}

getFarmerRequests(){

  return this.http.get<any[]>(
    `${this.api}/farmer/requests`
  );

}

getFarmerSchedules(){

  return this.http.get<any[]>(
    `${this.api}/farmer/schedules`
  );

}

getFarmerNotifications(){

  return this.http.get<any[]>(
    `${this.api}/farmer/notifications`
  );

}
}