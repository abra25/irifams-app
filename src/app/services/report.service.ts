import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private api =
    `${environment.apiUrl}/reports`;


  constructor(
    private http: HttpClient
  ) {}


  // =========================================================
  // GET SUMMARY REPORT
  // ADMIN / SUPERVISOR
  // =========================================================

  getSummary(): Observable<any> {

    return this.http.get<any>(
      `${this.api}/summary`
    );

  }


  // =========================================================
  // EXPORT PDF REPORT
  // ADMIN / SUPERVISOR
  // =========================================================

  exportPdf(): Observable<Blob> {

    return this.http.get(
      `${this.api}/export/pdf`,
      {
        responseType: 'blob'
      }
    );

  }

}