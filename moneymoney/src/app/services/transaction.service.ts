import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
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

  find(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/transaction/find`, model, {headers: this.headers()});
  }

  create(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/transaction/create`, model, {headers: this.headers()});
  }

  read(id:any): Observable<any>{
    return this.httpClient.get(`${this.hostUrl}/transaction/read/${id}`, {headers: this.headers()});
  }

  update(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/transaction/update`, model, {headers: this.headers()});
  }

  remove(id: any): Observable<any>{
    return this.httpClient.get(`${this.hostUrl}/transaction/remove/${id}`, {headers: this.headers()});
  }

}
