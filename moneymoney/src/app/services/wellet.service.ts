import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from "@cService/base.service";

@Injectable({
  providedIn: 'root'
})
export class WelletService {
  constructor(private baseService: BaseService) { }

  find(searchModel: any): Observable<any>{
    return this.baseService.post(`/wellet/find`, searchModel);
  }

  create(model: any): Observable<any>{
    return this.baseService.post(`/wellet/create`, model);
  }

  read(id:any): Observable<any>{
    return this.baseService.get(`/wellet/read/${id}`);
  }

}
