import {ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {WelletService} from '@services/wellet.service';
import {TransactionService} from '@services/transaction.service';
import {BaseListComponent} from '@cComponents/base-list.component';
import {ActivatedRoute} from '@angular/router';
import {TransactionFormComponent} from '@components/wellet/transation/transactionForm.component';

@Component({
    selector: 'transactionList',
    templateUrl: './transactionList.html'
})
export class TransactionListComponent extends BaseListComponent{

    welletName: any;
    transactionList:any = [];
    row: any = {};

    currentPanel = 'transactionList';

    bsValue = new Date();
    bsConfig = {
        dateInputFormat: 'YYYY-MM-DD',
        selectFromOtherMonth: true
    }

    @ViewChild(TransactionFormComponent)
    public TransactionForm: TransactionFormComponent;

    @Output('back')
    backToListing = new EventEmitter();

    constructor(
        public componentService: WelletService,
        private TransactionService: TransactionService,
        private activatedRoute: ActivatedRoute,
        private cdr : ChangeDetectorRef
    ) {
        super();
    }

    createSearchModel() {

    }

    ngOnInit()
    {
        this.activatedRoute.params.subscribe(
            params=>{
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

    show(row?: any){
        this.loadWellet(row.id);
    }

    showPanel(panelCode: string, row?: any){
        this.currentPanel = panelCode;
        this.cdr.detectChanges();
        if (panelCode ==='transactionForm'){
            this.TransactionForm;
        }
    }

    dateChange(){
        // console.log(this.row.date);
    }

    backTotransactionList(){
        this.currentPanel= 'transactionList';
    }

    backToWelletList(){
        this.backToListing.emit();
    }
}
