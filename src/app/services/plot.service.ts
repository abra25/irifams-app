import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  private api = `${environment.apiUrl}/plots`;

  constructor(private http: HttpClient) {}

  getAllPlots(): Observable<any[]> {

    return this.http.get<any[]>(this.api);

  }

  addPlot(farmerId:number, data:any): Observable<any> {

    return this.http.post(
      `${this.api}?farmerId=${farmerId}`,
      data
    );

  }

  updatePlot(id:number,data:any): Observable<any>{

    return this.http.put(
      `${this.api}/${id}`,
      data
    );

  }

  getFarmerPlots(farmerId:number){

  return this.http.get<any[]>(

    `${this.api}/farmer/${farmerId}`

  );

}
getMyFarmPlots(){

  return this.http.get<any[]>(

    `${this.api}/my-farm-plots`

  );

}

  getMyPlots(){

  return this.http.get<any[]>(
    `${this.api}/my-plots`
  );

}


  deletePlot(id:number){

    return this.http.delete(
      `${this.api}/${id}`
    );

  }

}