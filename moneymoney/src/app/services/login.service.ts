import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';



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

  login(values){
    return this.http.post<any>(`${this.hostUrl}/login`, values);
  }

  logout(){
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization:  `Bearer ${localStorage.getItem(environment.token)}`
    });
    return this.http.post<any>(`${this.hostUrl}/logout`, null, {headers});
  }
}
