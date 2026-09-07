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


  // =========================================================
  // LOGIN
  // =========================================================

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


  // =========================================================
  // REGISTER
  // =========================================================

  register(data: any): Observable<any> {

    return this.http.post(
      `${this.api}/register`,
      data
    );

  }


  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  forgotPassword(
    data: { username: string }
  ): Observable<any> {

    return this.http.post<any>(
      `${this.api}/forgot-password`,
      data
    );

  }


  // =========================================================
  // VERIFY OTP
  // =========================================================

  verifyOtp(
    data: {
      username: string;
      otp: string;
    }
  ): Observable<any> {

    return this.http.post<any>(
      `${this.api}/verify-otp`,
      data
    );

  }


  // =========================================================
  // RESET PASSWORD
  // =========================================================

resetPassword(
  data: {
    username: string;
    recoveryToken: string;
    newPassword: string;
  }
): Observable<string> {

  return this.http.post(
    `${this.api}/reset-password`,
    data,
    {
      responseType: 'text'
    }
  );

}


  // =========================================================
  // LOGOUT
  // =========================================================

  logout(showMessage = true): void {

    if (this.logoutTimer) {

      clearTimeout(this.logoutTimer);

      this.logoutTimer = null;

    }

    sessionStorage.clear();

    if (showMessage) {

      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'Session ended successfully.',
        timer: 2000,
        showConfirmButton: false
      });

    }

    this.router.navigate(['/login']);

  }


  // =========================================================
  // GET TOKEN
  // =========================================================

  getToken(): string | null {

    return sessionStorage.getItem('token');

  }


  // =========================================================
  // GET LOGGED-IN USER
  // =========================================================

  getUser(): any | null {

    const user =
      sessionStorage.getItem('user');

    if (!user) {

      return null;

    }

    try {

      return JSON.parse(user);

    } catch {

      return null;

    }

  }


  // =========================================================
  // CHECK TOKEN EXPIRATION
  // =========================================================

  isTokenExpired(): boolean {

    const token = this.getToken();

    if (!token) {

      return true;

    }

    try {

      const decoded: any =
        jwtDecode(token);

      const currentTime =
        Date.now() / 1000;

      return decoded.exp < currentTime;

    } catch {

      return true;

    }

  }


  // =========================================================
  // CHECK LOGIN STATUS
  // =========================================================

  isLoggedIn(): boolean {

    const token =
      this.getToken();

    const user =
      this.getUser();


    if (!token || !user) {

      return false;

    }


    if (this.isTokenExpired()) {

      this.autoLogout();

      return false;

    }


    return true;

  }


  // =========================================================
  // AUTOMATIC LOGOUT
  // =========================================================

  autoLogout(): void {

    if (this.logoutTimer) {

      clearTimeout(this.logoutTimer);

      this.logoutTimer = null;

    }

    sessionStorage.clear();


    Swal.fire({
      icon: 'warning',
      title: 'Session Expired',
      text: 'Your session has expired. Please login again.'
    }).then(() => {

      this.router.navigate(['/login']);

    });

  }


  // =========================================================
  // START AUTOMATIC LOGOUT TIMER
  // =========================================================

  startAutoLogout(): void {

    const token =
      this.getToken();

    if (!token) {

      return;

    }


    try {

      const decoded: any =
        jwtDecode(token);

      const expiresAt =
        decoded.exp * 1000;

      const timeout =
        expiresAt - Date.now();


      if (timeout <= 0) {

        this.autoLogout();

        return;

      }


      if (this.logoutTimer) {

        clearTimeout(this.logoutTimer);

      }


      this.logoutTimer =
        setTimeout(() => {

          this.autoLogout();

        }, timeout);

    } catch {

      this.autoLogout();

    }

  }

}