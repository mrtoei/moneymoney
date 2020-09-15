import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private hostUrl = environment.webapi;
  constructor(
      private http: HttpClient
  ) {}

  isLoggedIn(){
    const loginResult = localStorage.getItem(environment.user);
    return loginResult != null;
  }

  login(values): Observable<any>{
    return this.http.post<any>(`${this.hostUrl}/login`, values);
  }

  logout(): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${localStorage.getItem(environment.token)}`
    });

    return this.http.post<any>(`${this.hostUrl}/logout`, null, {headers: httpHeaders});
  }
}
