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

  getAllInputs(): Observable<any[]> {

    return this.http.get<any[]>(this.api);

  }

  addInput(data:any){


  return this.http.post(
    this.api,
    data
  );

}

  updateInput(id:number,data:any): Observable<any>{

    return this.http.put(
      `${this.api}/${id}`,
      data
    );

  }

  deleteInput(id:number): Observable<any>{

    return this.http.delete(
      `${this.api}/${id}`
    );

  }

  distributeInput(

  inputId:number,

  farmerId:number,

  quantity:number

){

  return this.http.post(

    `${this.api}/${inputId}/distribute?farmerId=${farmerId}&quantity=${quantity}`,

    {}

  );

}

}