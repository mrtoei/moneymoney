import { Component, OnInit } from '@angular/core';
import { BaseFormModalComponent } from '@cComponents/base-form-modal.component';
import { WelletService } from '@services/wellet.service';


@Component({
  selector: 'app-wellet-form',
  templateUrl: './wellet-form.component.html',
  styleUrls: ['./wellet-form.component.scss'],
  exportAs: 'formModalEX'
})
export class WelletFormComponent extends BaseFormModalComponent{

  constructor(public componentService: WelletService) {
    super(componentService );
  }

  ngOnInit(): void {
  }

  initializeRow()
  {
    this.row = {
      name: '',
      description: ''
    };
  }

  show(rowId: any){
    if(rowId){

    }else {
      this.initializeRow();
      this.formModal.show();
    }
  }
}
