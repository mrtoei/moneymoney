import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {WelletService} from '@services/wellet.service';
import {TransactionService} from '@services/transaction.service';
import {BaseListComponent} from '@cComponents/base-list.component';
import {ActivatedRoute} from '@angular/router';
import {TransactionFormComponent} from '@components/wellet/transation/transactionForm.component';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transactionList.html',
    styleUrls: ['./transaction.scss']
})
export class TransactionListComponent extends BaseListComponent{

    welletName: any;
    transactionList:any = [];

    @ViewChild(TransactionFormComponent)
    public rowForm: TransactionFormComponent;

    constructor(
        public componentService: WelletService,
        private TransactionService: TransactionService,
        private activatedRoute: ActivatedRoute,
    ) {
        super();
    }

    createSearchModel() {

    }

    ngOnInit()
    {
        this.activatedRoute.params.subscribe(
            params=>{
                this.loadWellet(params.id);
                this.loadTransaction(params.id);
            }
        )
    }

    loadWellet(id: any)
    {
        this.componentService.read(id).subscribe(
            result=>{
                this.welletName = result.data.name;
            }
        )
    }

    loadTransaction(id: any)
    {
        const data = {
            id: id
        }
        this.loading = true;
        this.TransactionService.lising(data).subscribe(
            result=>{
                this.transactionList = result.data;
                this.loading = false;
            }
        )
    }

}
