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

  getAllPayments(): Observable<any[]> {

    return this.http.get<any[]>(this.api);

  }

  verifyPayment(id:number): Observable<any>{

    return this.http.patch(
      `${this.api}/${id}/verify`,
      {}
    );

  }

  getMyPayments(){

  return this.http.get<any[]>(
    `${this.api}/my-payments`
  );

}

rejectPayment(id:number){

  return this.http.patch(

    `${this.api}/${id}/reject`,
    {}

  );

}

confirmPayment(

requestId:number,

data:any

){

return this.http.post(

`${this.api}/confirm/${requestId}`,

data

);

}

}