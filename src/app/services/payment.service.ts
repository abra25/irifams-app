import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private api =
    `${environment.apiUrl}/payments`;


  constructor(
    private http: HttpClient
  ) {}


  // =========================================================
  // GET ALL PAYMENTS
  // ADMIN / SUPERVISOR
  // =========================================================

  getAllPayments(): Observable<any[]> {

    return this.http.get<any[]>(
      this.api
    );

  }


  // =========================================================
  // GET MY PAYMENTS
  // SUPERVISOR / FARMER
  // =========================================================

  getMyPayments(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-payments`
    );

  }


  // =========================================================
  // GET PAYMENTS FOR A FARMER
  // =========================================================

  getFarmerPayments(
    farmerId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/farmer/${farmerId}`
    );

  }


  // =========================================================
  // CONFIRM / SUBMIT PAYMENT
  // FARMER
  // =========================================================
  /*
   * Backend gets:
   *
   * - Farmer from logged-in account
   * - Amount from ServiceRequest
   * - Official control number from ServiceRequest
   *
   * Frontend only needs to send the control number.
   */

  confirmPayment(
    requestId: number,
    data: {
      controlNumber: string;
    }
  ): Observable<any> {

    return this.http.post(
      `${this.api}/confirm/${requestId}`,
      data
    );

  }


  // =========================================================
  // VERIFY PAYMENT
  // ADMIN / SUPERVISOR
  // =========================================================

  verifyPayment(
    id: number
  ): Observable<any> {

    return this.http.patch(
      `${this.api}/${id}/verify`,
      {}
    );

  }


  // =========================================================
  // REJECT PAYMENT
  // ADMIN / SUPERVISOR
  // =========================================================

  rejectPayment(
    id: number
  ): Observable<any> {

    return this.http.patch(
      `${this.api}/${id}/reject`,
      {}
    );

  }

}