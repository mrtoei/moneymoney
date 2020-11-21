import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env';

@Injectable({
  providedIn: 'root'
})
export class WelletService {
  private hostUrl = environment.webapi;

  constructor(
      private httpClient: HttpClient
  ) { }

  headers(){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${localStorage.getItem(environment.token)}`
    });
    return httpHeaders;
  }

  find(searchModel: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/wellet/listing`, searchModel, {headers: this.headers()});
  }

  create(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/wellet/create`, model, {headers: this.headers()});
  }

  read(id:any): Observable<any>{
    return this.httpClient.get(`${this.hostUrl}/wellet/read/${id}`, {headers: this.headers()});
  }

}
