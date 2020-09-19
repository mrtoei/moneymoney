import { Component, OnInit } from '@angular/core';
import { BaseFormModalComponent } from '../../../_common/base-form-modal.component';
import { WelletService } from '../../../services/wellet.service';

@Component({
  selector: 'app-wellet-form',
  templateUrl: './wellet-form.component.html',
  styleUrls: ['./wellet-form.component.scss'],
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
}
