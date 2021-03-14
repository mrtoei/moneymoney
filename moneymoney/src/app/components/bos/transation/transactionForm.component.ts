import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {intVal, toUtcDate} from "@cxFunc";
import {TRANSACTION_TYPE_EXPENSE, TRANSACTION_TYPE_INCOME} from "@cUtil/xconstant";
import {TransactionService} from "@services/bos/transaction.service";
import {CategoryService} from "@services/bos/category.service";
@Component({
  selector: 'transactionForm',
  templateUrl: './transactionForm.html',
  exportAs: 'formModalEX'
})
export class TransactionFormComponent implements OnInit{

  loading: boolean = false;
  row: any = {};
  categories:any = [];

  bsValue = new Date();
  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    selectFromOtherMonth: true
  }

  TRANSACTION_TYPE_EXPENSE = TRANSACTION_TYPE_EXPENSE;
  TRANSACTION_TYPE_INCOME = TRANSACTION_TYPE_INCOME;

  @Output('afterSaved')
  afterSaved = new EventEmitter();

  @Output('back')
  backToListing = new EventEmitter();

  constructor(public componentService: TransactionService, private categoryService: CategoryService) {
    this.initializeRow()
  }

  ngOnInit()
  {
    this.loadCategories();
  }

  initializeRow()
  {
    this.row = {
      id: 0,
      type:'',
      date: toUtcDate(new Date()),
      note: '',
      wellet_id:'',
      cat_id:'',
      amount:'',
      description: ''
    };
  }

  loadCategories()
  {
    this.categoryService.loadCategories().subscribe(result=>{
      if(result.success){
        this.categories = result.data;
      }
    })
  }

  dateChange(){
    this.row.date = toUtcDate(this.row.date);
  }

  show(welletRow:any ,rowId?: any)
  {
    this.row.wellet_id = welletRow.id;
    if(rowId && intVal(rowId) > 0){
      this.loadRow(rowId);
    }
  }

  save(){
    let action = 'create';
    let request ;
    if (this.row.id === 0){
      request = this.componentService.create(this.row);
    }else{
      action = 'update';
      request = this.componentService.update(this.row);
    }
    request.subscribe(result=>{
      if(result.success){
        this.afterSaved.emit({
          action: action,
          row: result.data
        })
        this.initializeRow();
      }
    });
  }

  loadRow(rowId: any)
  {
    this.loading = true;
    this.componentService.read(rowId).subscribe(result => {
      if(result.success){
        this.row = result.data;
        this.loading = false;
      }
    });
  }

  backToTransactionList(){
    this.initializeRow();
    this.backToListing.emit();
  }
}
