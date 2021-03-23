import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from "@cService/base.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private baseService: BaseService) { }
  
  find(model: any): Observable<any>{
    return this.baseService.post(`/transaction/find`, model);
  }

  create(model: any): Observable<any>{
    return this.baseService.post(`/transaction/create`, model);
  }

  read(id:any): Observable<any>{
    return this.baseService.get(`/transaction/read/${id}`);
  }

  update(model: any): Observable<any>{
    return this.baseService.post(`/transaction/update`, model);
  }

  remove(id: any): Observable<any>{
    return this.baseService.get(`/transaction/remove/${id}`);
  }

}
