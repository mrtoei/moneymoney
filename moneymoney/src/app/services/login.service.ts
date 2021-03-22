import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from "@cService/base.service";


@Injectable({
  providedIn: 'root'
})
export class LoginService{
  constructor(private baseService: BaseService) {}

  login(model): Observable<any>{
    return this.baseService.post('/login', model);
  }

  logout(){
    this.baseService.logout();
  }
}
