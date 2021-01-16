
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModel, FormsModule} from '@angular/forms';
import {ModalModule} from "ngx-bootstrap/modal";
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TransactionListComponent} from "../components/bos/transation/transactionList.component";
import {TransactionFormComponent} from "../components/bos/transation/transactionForm.component";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: TransactionListComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class TransactionRoutingModule
{
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        TransactionRoutingModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        TransactionListComponent,
        TransactionFormComponent
    ],
    exports: [
        TransactionListComponent
    ],
    providers: [
        NgModel
    ]
})

export class TransactionModule
{
}
