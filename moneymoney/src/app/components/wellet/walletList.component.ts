import {Component, ViewChild, ChangeDetectorRef, OnInit} from '@angular/core';
import {WalletFormModalCom} from './walletForm.component';
import {TransactionListComponent} from "../transation/transactionList.component";
import {WalletService} from "@services/wallet.service";
import {intVal, nEmpty} from "../../_common/util/xfunction";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-wallet-list',
  templateUrl: './walletList.html'
})
export class WalletListComponent implements OnInit
{
  intVal = intVal;

  loading:boolean = false;
  submitting: boolean = false;

  filters:any = {};
  walletList:Array<any> = [];

  faPlusCircle = faPlusCircle;

  currentPanel:string = '';
  currentMenu:string = '';

  @ViewChild(WalletFormModalCom)
  public walletFormModalCom: WalletFormModalCom;

  @ViewChild(TransactionListComponent)
  public transactionList: TransactionListComponent;

  constructor(
      public componentService: WalletService,
      private cdr : ChangeDetectorRef
  ) {
  }

  ngOnInit(): void
  {
    this.filters = {};
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
      } else {
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
