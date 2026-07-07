import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api =
    `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient
  ){}

  getAllUsers(): Observable<any[]> {

  return this.http.get<any[]>(this.api);

}

getMyFarmers(){

  return this.http.get<any[]>(
    `${this.api}/my-farmers`
  );

}

  addUser(data:any): Observable<any>{

    return this.http.post(
      this.api,
      data
    );

  }

  updateUser(
      id:number,
      data:any
  ): Observable<any>{

    return this.http.put(
      `${this.api}/${id}`,
      data
    );

  }

  getFarmers(): Observable<any[]> {

  return this.http.get<any[]>(
    `${this.api}/farmers`
  );

}

  toggleStatus(id:number){

  return this.http.patch(
    `${this.api}/${id}/status`,
    {}
  );

}

getFarmersByBlock(
  blockName:string
){

  return this.http.get<any[]>(

    `${this.api}/farmers/block/${blockName}`

  );

}

getUserById(id:number){

  return this.http.get<any>(
    `${this.api}/${id}`
  );

}

getMyProfile(){

  return this.http.get<any>(
    `${this.api}/my-profile`
  );

}

changePassword(data:any){

  return this.http.patch(

    `${this.api}/change-password`,

    data

  );

}

}