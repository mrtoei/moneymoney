import { Component } from '@angular/core';
import { BaseFormModalComponent } from '@cComponents/base-form-modal.component';
import {WelletService} from "@services/bos/wellet.service";


@Component({
  selector: 'app-wellet-form',
  templateUrl: './welletForm.html',
  exportAs: 'formModalEX'
})
export class WelletFormComponent extends BaseFormModalComponent{

  constructor(public componentService: WelletService) {
    super(componentService );
  }

  initializeRow()
  {
    this.row = {
      id: 0,
      name: '',
      description: ''
    };
  }

}
