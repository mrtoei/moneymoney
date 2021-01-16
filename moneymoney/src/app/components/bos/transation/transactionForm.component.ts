import {Component, Output, EventEmitter} from '@angular/core';
import {BaseFormModalComponent} from "@cComponents/base-form-modal.component";
import {WelletService} from "@services/bos/wellet.service";
import {toUtcDate} from "@cxFunc";

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

  toUtcDate = toUtcDate;

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
      date: toUtcDate(new Date()),
      note: '',
      category:'',
      amount:'',
      description: ''
    };
  }

  dateChange(){
    this.row.date = toUtcDate(this.row.date);
  }

  save() {
    console.log(this.row);
  }

  backToTransactionList(){
      this.backToListing.emit();
  }
}
