import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {WelletFormComponent} from './welletForm.component';
import {BaseListComponent} from '@cComponents/base-list.component';
import {SearchModel} from '@cModel/SearchModel';
import {TransactionListComponent} from "../transation/transactionList.component";
import {WelletService} from "@services/bos/wellet.service";


@Component({
  selector: 'app-wellet-list',
  templateUrl: './welletList.html'
})
export class WelletListComponent extends BaseListComponent{

  currentPanel = 'welletList';

  @ViewChild(WelletFormComponent)
  public rowForm: WelletFormComponent;

  @ViewChild(TransactionListComponent)
  public transactionList: TransactionListComponent;

  constructor(
      public componentService: WelletService,
      private cdr : ChangeDetectorRef
  ) {
    super();
  }

  createSearchModel()
  {
    this.searchModel = new SearchModel();
    this.searchModel.filters = {
      name:''
    };
  }

  showPanel(panelCode: string, row?: any){
    this.currentPanel = panelCode;
    this.cdr.detectChanges();
    if (panelCode ==='transactionList'){
      this.transactionList.show(row);
    }
  }

  backToWelletList(){
    this.showPanel('welletList')
  }

}
