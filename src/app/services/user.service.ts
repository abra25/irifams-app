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
  ) {}


  // =========================================================
  // GET ALL USERS
  // ADMIN ONLY
  // =========================================================

  getAllUsers(): Observable<any[]> {

    return this.http.get<any[]>(
      this.api
    );

  }


  // =========================================================
  // GET USER BY ID
  // ADMIN / SUPERVISOR
  // =========================================================

  getUserById(
    id: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.api}/${id}`
    );

  }


  // =========================================================
  // CREATE USER
  // ADMIN / SUPERVISOR
  // =========================================================

  addUser(
    data: any
  ): Observable<any> {

    return this.http.post(
      this.api,
      data
    );

  }


  // =========================================================
  // UPDATE USER
  // ADMIN / SUPERVISOR
  // =========================================================

  updateUser(
    id: number,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.api}/${id}`,
      data
    );

  }


  // =========================================================
  // DELETE USER
  // ADMIN ONLY
  // =========================================================

  deleteUser(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.api}/${id}`
    );

  }


  // =========================================================
  // ACTIVATE / DEACTIVATE USER
  // ADMIN ONLY
  // =========================================================

  toggleStatus(
    id: number
  ): Observable<any> {

    return this.http.patch(
      `${this.api}/${id}/status`,
      {}
    );

  }


  // =========================================================
  // GET ALL FARMERS
  // ADMIN / SUPERVISOR
  // =========================================================

  getFarmers(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/farmers`
    );

  }


  // =========================================================
  // GET FARMERS BY BLOCK
  // ADMIN / SUPERVISOR
  // =========================================================

  getFarmersByBlock(
    blockName: string
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/farmers/block/${blockName}`
    );

  }


  // =========================================================
  // GET SUPERVISOR'S FARMERS
  // SUPERVISOR ONLY
  // =========================================================

  getMyFarmers(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/my-farmers`
    );

  }


  // =========================================================
  // GET MY PROFILE
  // AUTHENTICATED USERS
  // =========================================================

  getMyProfile(): Observable<any> {

    return this.http.get<any>(
      `${this.api}/my-profile`
    );

  }


  // =========================================================
  // CHANGE PASSWORD
  // AUTHENTICATED USERS
  // =========================================================

  changePassword(
    data: {
      currentPassword: string;
      newPassword: string;
    }
  ): Observable<any> {

    return this.http.patch(
      `${this.api}/change-password`,
      data
    );

  }

}