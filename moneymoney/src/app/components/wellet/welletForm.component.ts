import { Component } from '@angular/core';
import { BaseFormModalComponent } from '../../_common/components/base-form-modal.component';
import { WelletService } from '../../services/wellet.service';

@Component({
  selector: 'app-wellet-form',
  templateUrl: './welletForm.html',
  styleUrls: ['./wellet.scss'],
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
