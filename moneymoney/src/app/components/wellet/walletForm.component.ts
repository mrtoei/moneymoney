import {Component, Input} from '@angular/core';
import { BaseFormModalComponent } from '@cComponents/base-form-modal.component';
import {WalletService} from "@services/wallet.service";
import {WalletType} from "../../_common/util/xconstant";

@Component({
  selector: 'app-wallet-form',
  templateUrl: './walletForm.html',
  exportAs: 'walletFormModalEX'
})
export class WalletFormModalCom extends BaseFormModalComponent
{
  walletType = WalletType;

  @Input()
  ngClass: string;

  constructor(public componentService: WalletService)
  {
    super(componentService );
  }

  initializeRow()
  {
    this.row = {
      id: 0,
      type: 0,
      name: '',
      description: ''
    };
  }

}
