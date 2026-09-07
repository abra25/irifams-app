import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private api = `${environment.apiUrl}/inputs`;

  constructor(private http: HttpClient) {}

  // =========================================================
  // ALL FARM INPUTS
  // GET /inputs
  // =========================================================

  getAllInputs(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // =========================================================
  // ADD FARM INPUT
  // POST /inputs
  // ADMIN / SUPERVISOR
  // =========================================================

  addInput(data: any): Observable<any> {
    return this.http.post<any>(
      this.api,
      data
    );
  }

  // =========================================================
  // UPDATE FARM INPUT
  // PUT /inputs/{id}
  // ADMIN / SUPERVISOR
  // =========================================================

  updateInput(
    id: number,
    data: any
  ): Observable<any> {

    return this.http.put<any>(
      `${this.api}/${id}`,
      data
    );
  }

  // =========================================================
  // DELETE FARM INPUT
  // DELETE /inputs/{id}
  // ADMIN ONLY
  // =========================================================

  deleteInput(id: number): Observable<any> {

    return this.http.delete<any>(
      `${this.api}/${id}`
    );
  }

  // =========================================================
  // DISTRIBUTE FARM INPUT
  // POST /inputs/{inputId}/distribute
  // SUPERVISOR ONLY
  // =========================================================

  distributeInput(
    inputId: number,
    farmerId: number,
    quantity: number
  ): Observable<any> {

    return this.http.post<any>(
      `${this.api}/${inputId}/distribute?farmerId=${farmerId}&quantity=${quantity}`,
      {}
    );
  }

  // =========================================================
  // FARMER DISTRIBUTIONS
  // GET /inputs/farmer/{farmerId}
  // FARMER / ADMIN / SUPERVISOR
  // =========================================================

  getFarmerInputs(
    farmerId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/farmer/${farmerId}`
    );
  }
}