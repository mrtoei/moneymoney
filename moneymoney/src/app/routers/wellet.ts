
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModel, FormsModule} from '@angular/forms';
import {ModalModule} from "ngx-bootstrap/modal";
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {WelletListComponent} from '@components/wellet/welletList.component';
import {WelletFormComponent} from '@components//wellet/welletForm.component';
import {TransactionListComponent} from '@components/wellet/transation/transactionList.component';
import {TransactionFormComponent} from '@components/wellet/transation/transactionForm.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: WelletListComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class WelletRoutingModule
{
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        WelletRoutingModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    declarations: [
        WelletListComponent,
        WelletFormComponent,
        TransactionListComponent,
        TransactionFormComponent
    ],
    providers: [
        NgModel
    ]
})

export class WelletModule
{
}
