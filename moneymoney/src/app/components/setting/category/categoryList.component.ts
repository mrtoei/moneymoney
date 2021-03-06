import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {BaseListComponent} from "@cComponents/base-list.component";
import {CategoryFormComponent} from "./categoryForm.component";
import {SearchModel} from "@cModel/SearchModel";
import {CategoryService} from "@services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './categoryList.component.html'
})
export class CategoryListComponent extends BaseListComponent{

  data:any =[];

  @ViewChild(CategoryFormComponent)
  public rowForm: CategoryFormComponent;

  constructor(
      public componentService: CategoryService,
      private cdr : ChangeDetectorRef
  ) {
    super()
  }

  createSearchModel() {
    this.searchModel = new SearchModel();
    this.searchModel.filters = {
      id: '',
      name:'',
      description:''
    }
  }

  openFormModal(row?: any,parentId?: any){
    if (row && row.id){
      this.rowForm.show(row.id);
    }else if (parentId){
      this.rowForm.show(null,parentId);
    }else{
      this.rowForm.show();
    }
  }

}
