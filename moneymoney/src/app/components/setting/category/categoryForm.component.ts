import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '@cComponents/base-list.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './categoryForm.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryFormComponent extends BaseListComponent{

  constructor() {
    super();
  }

  ngOnInit(){
  }

  createSearchModel() {
  }

}
