import {Component, Output, EventEmitter} from '@angular/core';
import {BaseFormModalComponent} from '@cComponents/base-form-modal.component';
import {WelletService} from '@services/wellet.service';


@Component({
  selector: 'transactionForm',
  templateUrl: './transactionForm.html',
  exportAs: 'formModalEX'
})
export class TransactionFormComponent extends BaseFormModalComponent{

  bsValue = new Date();
  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    selectFromOtherMonth: true
  }

  @Output('back')
  backToListing = new EventEmitter();

  constructor(public componentService: WelletService) {
    super(componentService );
  }

  initializeRow()
  {
    this.row = {
      id: 0,
      type:'',
      date: '',
      note: '',
      category:'',
      amount:'',
      description: ''
    };
  }

  dateChange(){
    console.log(this.row.date);
  }

  save() {
    console.log(this.row);
  }

  backToTransactionList(){
      this.backToListing.emit();
  }
}
