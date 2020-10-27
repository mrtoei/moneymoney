import { Component} from '@angular/core';
import { BaseFormModalComponent } from '@cComponents/base-form-modal.component';
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './categoryForm.component.html',
  styleUrls: ['./category.component.scss'],
  exportAs: 'formModalEX'
})
export class CategoryFormComponent extends BaseFormModalComponent{

  constructor(public componentService: CategoryService) {
    super(componentService);
  }

  initializeRow()
  {
    this.row = {
      id: 0,
      name:'',
      description:''
    }
  }

  show(rowId?: any){
    if (rowId){
      console.log('rowId');
    }else{
      this.row.parent_id = null;
      this.formModal.show();
    }
  }


}
