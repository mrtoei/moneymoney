
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModel, FormsModule} from '@angular/forms';
import {ModalModule} from "ngx-bootstrap/modal";
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TransactionModule} from "./transation";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {WalletListComponent} from "../components/wellet/walletList.component";
import {WalletFormModalCom} from "../components/wellet/walletForm.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: WalletListComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class WalletRoutingModule
{
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        WalletRoutingModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TransactionModule,
        FontAwesomeModule
    ],
    declarations: [
        WalletListComponent,
        WalletFormModalCom,
    ],
    providers: [
        NgModel
    ]
})

export class WalletModule
{
}
