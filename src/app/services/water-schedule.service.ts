import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaterScheduleService {

  private api =
    `${environment.apiUrl}/water-schedules`;

  constructor(
    private http: HttpClient
  ) {}

  getAllSchedules(): Observable<any[]> {

    return this.http.get<any[]>(
      this.api
    );

  }

  addSchedule(
  plotId:number,
  data:any
){

  return this.http.post(

    `${this.api}?plotId=${plotId}`,

    data

  );

}

  updateSchedule(
    id:number,
    data:any
  ){

    return this.http.put(
      `${this.api}/${id}`,
      data
    );

  }

  deleteSchedule(id:number){

    return this.http.delete(
      `${this.api}/${id}`
    );

  }


getMyPlots() {

  return this.http.get<any[]>(
    `${this.api}/my-plots`
  );

}

getMyFarmSchedules(){

  return this.http.get<any[]>(

    `${this.api}/my-farm-schedules`

  );

}

getMySchedules(){

  return this.http.get<any[]>(

    `${this.api}/my-schedules`

  );

}

}