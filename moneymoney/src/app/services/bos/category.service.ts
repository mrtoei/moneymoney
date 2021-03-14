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

  find(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/bos/category/find`, model, {headers: this.headers()});
  }

  loadCategories(): Observable<any>{
    return this.httpClient.get(`${this.hostUrl}/bos/category/loadCategories`, {headers: this.headers()});
  }

  read(id:any): Observable<any>{
    return this.httpClient.get(`${this.hostUrl}/bos/category/read/${id}`, {headers: this.headers()});
  }

  create(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/bos/category/create`, model, {headers: this.headers()});
  }

  update(model: any): Observable<any>{
    return this.httpClient.post(`${this.hostUrl}/bos/category/update`, model, {headers: this.headers()});
  }

  remove(id: any): Observable<any>{
    return this.httpClient.get(`${this.hostUrl}/bos/category/remove/${id}`, {headers: this.headers()});
  }


}
