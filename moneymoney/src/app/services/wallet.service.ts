import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from "@cService/base.service";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor(private baseService: BaseService) { }

  listing(searchModel: any): Observable<any>
  {
    return this.baseService.post(`/wallet/listing`, searchModel);
  }

  create(model: any): Observable<any>
  {
    return this.baseService.post(`/wallet/create`, model);
  }

  read(id:any): Observable<any>
  {
    return this.baseService.get(`/wallet/read/${id}`);
  }

}
