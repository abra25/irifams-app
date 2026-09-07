import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class RequestService {


  // =========================================================
  // API BASE URL
  // =========================================================

  private api =
    `${environment.apiUrl}/requests`;


  constructor(
    private http: HttpClient
  ) {}


  // =========================================================
  // ADMIN / SUPERVISOR
  // GET ALL REQUESTS
  // =========================================================

  getAllRequests(): Observable<any[]> {

    return this.http.get<any[]>(
      this.api
    );

  }


  // =========================================================
  // ADMIN / SUPERVISOR
  // APPROVE REQUEST
  // =========================================================
  /*
   * Backend automatically:
   *
   * 1. Checks request
   * 2. Checks supervisor block
   * 3. Checks request status
   * 4. Calculates quantity / amount
   * 5. Generates control number
   * 6. Changes status to WAITING_PAYMENT
   *
   * Frontend only sends request ID.
   *
   * Frontend does NOT calculate or send amount.
   */

  approveRequest(
  id: number,
  quantity?: number
): Observable<any> {

  const payload: any = {};

  if (
    quantity !== undefined &&
    quantity !== null
  ) {

    payload.quantity = quantity;

  }

  return this.http.patch<any>(
    `${this.api}/${id}/approve`,
    payload
  );

}


  // =========================================================
  // ADMIN / SUPERVISOR
  // REJECT REQUEST
  // =========================================================

  rejectRequest(
    id: number
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.api}/${id}/reject`,
      {}
    );

  }


  // =========================================================
  // SUPERVISOR
  // GET REQUESTS IN MY BLOCK
  // =========================================================

  getMyRequests(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-requests`
    );

  }


  // =========================================================
  // GET FARMER REQUESTS BY FARMER ID
  // ADMIN / SUPERVISOR / FARMER
  // =========================================================

  getFarmerRequests(
    farmerId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/farmer/${farmerId}`
    );

  }


  // =========================================================
  // FARMER
  // SUBMIT SERVICE REQUEST
  // =========================================================

  submitRequest(
    farmerId: number,
    plotId: number,
    data: any
  ): Observable<any> {

    return this.http.post<any>(
      `${this.api}?farmerId=${farmerId}&plotId=${plotId}`,
      data
    );

  }


  // =========================================================
  // FARMER
  // GET MY OWN REQUESTS
  // =========================================================

  getMyFarmRequests(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-farm-requests`
    );

  }


  // =========================================================
  // GET SINGLE REQUEST
  // =========================================================

  getRequestById(
    id: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.api}/${id}`
    );

  }

}