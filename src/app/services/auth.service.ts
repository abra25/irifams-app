import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../enviroments/environment';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/auth`;
  private logoutTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(data: any): Observable<any> {

  return this.http.post<any>(
    `${this.api}/login`,
    data
  ).pipe(

    tap(response => {

      sessionStorage.setItem(
        'token',
        response.token
      );

      sessionStorage.setItem(
        'user',
        JSON.stringify(response)
      );

      this.startAutoLogout();

    })

  );

}

  register(data: any) {

    return this.http.post(
      `${this.api}/register`,
      data
    );

  }
logout(showMessage = true) {

  if (this.logoutTimer) {

    clearTimeout(this.logoutTimer);

  }

  sessionStorage.clear();
  sessionStorage.clear();

  if(showMessage){

    Swal.fire({
      icon:'success',
      title:'Logged Out',
      text:'Session ended successfully.',
      timer:2000,
      showConfirmButton:false
    });

  }

  this.router.navigate(['/login']);

}

  getToken(): string | null {

    return sessionStorage.getItem('token');

  }

  getUser() {

    const user =
      sessionStorage.getItem('user');

    return user
      ? JSON.parse(user)
      : null;

  }

  isTokenExpired(): boolean {

    const token = this.getToken();

    if(!token){

      return true;

    }

    try{

      const decoded:any =
        jwtDecode(token);

      const currentTime =
        Date.now() / 1000;

      return decoded.exp < currentTime;

    }catch(error){

      return true;

    }

  }

  isLoggedIn(): boolean {

    const token = this.getToken();

    const user = this.getUser();

    if(!token || !user){

      return false;

    }

    if(this.isTokenExpired()){

      this.autoLogout();

      return false;

    }

    return true;

  }

  autoLogout(){

  if (this.logoutTimer) {

    clearTimeout(this.logoutTimer);

  }

  sessionStorage.clear();

  Swal.fire({
    icon:'warning',
    title:'Session Expired',
    text:'Your session has expired. Please login again.'
  }).then(()=>{

    this.router.navigate(['/login']);

  });

}

  startAutoLogout() {

  const token = this.getToken();

  if (!token) return;

  const decoded: any = jwtDecode(token);

  const expiresAt = decoded.exp * 1000;

  const timeout =
    expiresAt - Date.now();

  if (timeout <= 0) {

    this.autoLogout();
    return;

  }

  this.logoutTimer = setTimeout(() => {

    this.autoLogout();

  }, timeout);

}

}