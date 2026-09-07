import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  private api =
    `${environment.apiUrl}/plots`;


  constructor(
    private http: HttpClient
  ) {}


  // =========================================================
  // GET ALL PLOTS
  // ADMIN / SUPERVISOR
  // =========================================================

  getAllPlots(): Observable<any[]> {

    return this.http.get<any[]>(
      this.api
    );

  }


  // =========================================================
  // GET PLOT BY ID
  // =========================================================

  getPlotById(
    id: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.api}/${id}`
    );

  }


  // =========================================================
  // CREATE PLOT
  // ADMIN / SUPERVISOR
  // =========================================================

  addPlot(
    farmerId: number,
    data: any
  ): Observable<any> {

    return this.http.post(
      `${this.api}?farmerId=${farmerId}`,
      data
    );

  }


  // =========================================================
  // UPDATE PLOT
  // ADMIN / SUPERVISOR
  // =========================================================

  updatePlot(
    id: number,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.api}/${id}`,
      data
    );

  }


  // =========================================================
  // GET FARMER PLOTS
  // =========================================================

  getFarmerPlots(
    farmerId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/farmer/${farmerId}`
    );

  }


  // =========================================================
  // GET LOGGED-IN FARMER PLOTS
  // =========================================================

  getMyFarmPlots(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-farm-plots`
    );

  }


  // =========================================================
  // GET SUPERVISOR PLOTS
  // =========================================================

  getMyPlots(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-plots`
    );

  }


  // =========================================================
  // DELETE PLOT
  // ADMIN ONLY
  // =========================================================

  deletePlot(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.api}/${id}`
    );

  }

}