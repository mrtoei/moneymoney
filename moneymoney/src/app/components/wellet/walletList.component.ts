import {Component, ViewChild, ChangeDetectorRef, OnInit} from '@angular/core';
import {WalletFormModalCom} from './walletForm.component';
import {TransactionListComponent} from "../transation/transactionList.component";
import {WalletService} from "@services/wallet.service";
import {intVal, nEmpty} from "../../_common/util/xfunction";

@Component({
  selector: 'app-wallet-list',
  templateUrl: './walletList.html'
})
export class WalletListComponent implements OnInit
{
  intVal = intVal;

  loading:boolean = false;

  filters:any = {};
  walletList:Array<any> = [];

  currentPanel:string = '';
  currentMenu:string = '';

  @ViewChild(WalletFormModalCom)
  public walletFormModalCom: WalletFormModalCom;

  @ViewChild(TransactionListComponent)
  public transactionList: TransactionListComponent;

  constructor(private walletService: WalletService)
  {
  }

  ngOnInit()
  {
    this.filters = {};
    this.loadWalletList()
  }

  loadWalletList(action?: any)
  {
    this.loading = true;
    this.walletService.listing(this.filters).subscribe(result => {
          this.loading = false;
          if (result.success){
            this.walletList = result.data;
          }
        }
    );
  }

  showPanel(panelCode: string, row?: any){
    this.currentPanel = panelCode;
    this.currentMenu = intVal(row.id)
    if (panelCode ==='transactionList'){
      this.transactionList.loadTransaction(row);
    }
  }

  openFormModal(row?: any)
  {
    if (nEmpty(row) && intVal(row.id)){
      this.walletFormModalCom.show(row.id);
    }
    else{
      this.walletFormModalCom.show(null);
    }
  }

  afterWalletModalSaved(data: any)
  {
    if(nEmpty(data)) {
      if (data.action === 'create') {
        this.walletList.push(data.row);
      }
      else {
        let found = false;
        for (let i = 0; i < this.walletList.length; i++) {
          if (data.row.id === this.walletList[i].id) {
            this.walletList[i] = data.row;
            found = true;
            break;
          }
        }
        if (!found) {
          this.walletList.push(data.row);
        }
      }
    }
  }

}
