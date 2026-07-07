import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private api = `${environment.apiUrl}/requests`;

  constructor(
    private http: HttpClient
  ) {}

  //=====================
  // ADMIN / SUPERVISOR
  //=====================

  getAllRequests(): Observable<any[]>{

    return this.http.get<any[]>(this.api);

  }

  approveRequest(

id:number,

amount:number

){

return this.http.patch(

`${this.api}/${id}/approve`,

{

amount

}

);

}

  rejectRequest(id:number){

    return this.http.patch(
      `${this.api}/${id}/reject`,
      {}
    );

  }

  generateControlNumber(id:number){

    return this.http.patch(
      `${this.api}/${id}/generate-control`,
      {}
    );

  }

  getMyRequests(){

    return this.http.get<any[]>(

      `${this.api}/my-requests`

    );

  }

  //=====================
  // FARMER
  //=====================

  submitRequest(

    farmerId:number,

    plotId:number,

    data:any

  ){

    return this.http.post(

      `${this.api}?farmerId=${farmerId}&plotId=${plotId}`,

      data

    );

  }

  getMyFarmRequests(){

    return this.http.get<any[]>(

      `${this.api}/my-farm-requests`

    );

  }

}