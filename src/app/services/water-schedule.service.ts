import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
from '../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class WaterScheduleService {

  private api =
    `${environment.apiUrl}/water-schedules`;


  constructor(
    private http: HttpClient
  ) {}


  // =========================================================
  // GET ALL SCHEDULES
  // ADMIN / SUPERVISOR
  // =========================================================

  getAllSchedules(): Observable<any[]> {

    return this.http.get<any[]>(
      this.api
    );

  }


  // =========================================================
  // GET SCHEDULES BY PLOT
  // =========================================================

  getPlotSchedules(
    plotId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/plot/${plotId}`
    );

  }


  // =========================================================
  // CREATE SCHEDULE
  // ADMIN / SUPERVISOR
  // =========================================================

  addSchedule(
    plotId: number,
    data: any
  ): Observable<any> {

    return this.http.post(
      `${this.api}?plotId=${plotId}`,
      data
    );

  }


  // =========================================================
  // UPDATE SCHEDULE
  // ADMIN / SUPERVISOR
  // =========================================================

  updateSchedule(
    id: number,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.api}/${id}`,
      data
    );

  }


  // =========================================================
  // DELETE SCHEDULE
  // ADMIN ONLY
  // =========================================================

  deleteSchedule(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.api}/${id}`
    );

  }


  // =========================================================
  // GET SUPERVISOR'S PLOTS
  // =========================================================

  getMyPlots(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-plots`
    );

  }


  // =========================================================
  // GET FARMER'S OWN SCHEDULES
  // =========================================================

  getMyFarmSchedules(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-farm-schedules`
    );

  }


  // =========================================================
  // GET SUPERVISOR'S OWN SCHEDULES
  // =========================================================

  getMySchedules(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-schedules`
    );

  }

}