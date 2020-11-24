import { Component } from '@angular/core';
import {BaseFormModalComponent} from '@cComponents/base-form-modal.component';
import {WelletService} from '@services/wellet.service';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transactionForm.html',
  styleUrls: ['./transaction.scss'],
  exportAs: 'formModalEX'
})
export class TransactionFormComponent extends BaseFormModalComponent{


  constructor(public componentService: WelletService) {
    super(componentService );
  }

  initializeRow()
  {
    this.row = {
      id: 0,
      note: '',
      description: ''
    };
  }

  showDetail(){
    console.log('xxxxxx');
  }

  save() {
    console.log(this.row);
  }
}
