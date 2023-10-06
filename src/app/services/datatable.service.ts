import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor(public http: HttpClient) { }

  getClientData(): Observable<any> {
    return this.http.get('../../assets/resources/datatable.json', {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }
  
  getClientData1(): Observable<any> {
    return this.http.get('../../assets/resources/reusable-table.json', {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }

  getEmployeeData(): Observable<any> {
    return this.http.get('../../assets/resources/employee-data.json', {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }

  getMarksObtained(): Observable<any> {
    return this.http.get('../../assets/resources/marks-obtained.json', {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }
}
