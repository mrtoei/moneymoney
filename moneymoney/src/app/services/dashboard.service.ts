import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private hostUrl = environment.webapi;

  constructor(
      private httpClient: HttpClient
  ) { }

  headers(){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzIwNDYzNDcyOTU5MDAxMzQ0ZGFkMiIsInVzZXJuYW1lIjoiUHJheXV0IiwiaWF0IjoxNjA0Njg0MzA2LCJleHAiOjE2MDQ2ODc5MDZ9.1kbVH0PmAc0MB6Y0Ez4oDj979wDyO2OKRDg4mVZXIBQ';
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      // Authorization: `Bearer ${localStorage.getItem(environment.token)}`
      Authorization: `Bearer ${token}`
    });
    return httpHeaders;
  }

  find(searchModel: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/wellet/listing`, searchModel, {headers: this.headers()});
  }

  create(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/wellet/create`, model, {headers: this.headers()});
  }
}
