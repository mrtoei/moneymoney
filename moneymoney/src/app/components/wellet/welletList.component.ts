import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {WelletFormComponent} from './welletForm.component';
import {BaseListComponent} from '@cComponents/base-list.component';
import {SearchModel} from '@cModel/SearchModel';
import {TransactionListComponent} from "../transation/transactionList.component";
import {WelletService} from "@services/wellet.service";
import {intVal} from "../../_common/util/xfunction";

@Component({
  selector: 'app-wellet-list',
  templateUrl: './welletList.html'
})
export class WelletListComponent extends BaseListComponent
{
  intVal = intVal;

  currentPanel:string = '';
  currentMenu:string = '';

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
    this.searchModel.filters = {};
  }

  showPanel(panelCode: string, row?: any){
    this.currentPanel = panelCode;
    this.currentMenu = intVal(row.id)
    if (panelCode ==='transactionList'){
      this.transactionList.loadTransaction(row);
    }
  }

}
