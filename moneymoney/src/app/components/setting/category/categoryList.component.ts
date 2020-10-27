import {Component, ViewChild} from '@angular/core';
import { BaseListComponent } from '@cComponents/base-list.component';
import { SearchModel } from '@cModel/SearchModel';
import { CategoryFormComponent } from '@components/setting/category/categoryForm.component';
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './categoryList.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryListComponent extends BaseListComponent{

  @ViewChild(CategoryFormComponent)
  public rowForm: CategoryFormComponent;

  constructor(
      public componentService: CategoryService
  ) {
    super()
  }

  createSearchModel() {
    this.searchModel = new SearchModel();
    this.searchModel.filters = {

    }
  }

}
