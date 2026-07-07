// services/report.service.ts

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

  getSummary(): Observable<any> {

    return this.http.get<any>(
      `${this.api}/summary`
    );

  }

  exportPdf() {

  return this.http.get(

    `${this.api}/export/pdf`,

    {
      responseType:'blob'
    }

  );

}

}