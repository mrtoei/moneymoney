import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

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

  // @ts-ignore
  create(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/wellet/create`, model, {headers: this.headers()});
  }
}
