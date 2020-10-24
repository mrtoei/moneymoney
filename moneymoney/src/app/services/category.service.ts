import { Injectable } from '@angular/core';
import {environment} from '@env';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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
    return this.httpClient.post(`${this.hostUrl}/category/listing`, searchModel, {headers: this.headers()});
  }

  create(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/category/create`, model, {headers: this.headers()});
  }

}
