import { Injectable } from '@angular/core';
import {environment} from '@env';
import {Observable} from 'rxjs';
import {BaseService} from "@cService/base.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private baseService: BaseService) { }

  find(model: any): Observable<any>{
    return this.baseService.post(`/category/find`, model);
  }

  loadCategories(): Observable<any>{
    return this.baseService.get(`/category/loadCategories`);
  }

  read(id:any): Observable<any>{
    return this.baseService.get(`/category/read/${id}`);
  }

  create(model: any): Observable<any>{
    return this.baseService.post(`/category/create`, model);
  }

  update(model: any): Observable<any>{
    return this.baseService.post(`/category/update`, model);
  }

  remove(id: any): Observable<any>{
    return this.baseService.get(`/category/remove/${id}`);
  }


}
