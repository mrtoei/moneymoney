import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {environment} from "@env";

@Injectable()
export class AuthService
{
  constructor(private baseService: BaseService)
  {
  }

  login(model): Observable<any>
  {
    return this.baseService.post('/login', model);
  }

  logout()
  {
    this.baseService.logout();
  }

  isAuth()
  {
    let token = localStorage.getItem(environment.token);
    let currentUser = localStorage.getItem(environment.user);
    if(token && token.length > 0 && currentUser && currentUser.length > 0){
      return  true;
    }
    return false;
  }
}
