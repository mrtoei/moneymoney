import {ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {BaseListComponent} from "@cComponents/base-list.component";
import {WelletService} from "@services/bos/wellet.service";
import {TransactionService} from "@services/bos/transaction.service";
import {dateText, empty, intVal, nEmpty, numF, toUtcDate} from "@cxFunc";
import {CategoryService} from "@services/bos/category.service";
import {TRANSACTION_TYPE_EXPENSE, TRANSACTION_TYPE_INCOME} from "@cUtil//xconstant";
import Swal from "sweetalert2";


@Component({
    selector: 'transactionList',
    templateUrl: './transactionList.html'
})
export class TransactionListComponent extends BaseListComponent{

    intVal = intVal;
    numF = numF;
    nEmpty = nEmpty;
    empty = empty;
    dateText = dateText;

    TRANSACTION_TYPE_EXPENSE = TRANSACTION_TYPE_EXPENSE;
    TRANSACTION_TYPE_INCOME = TRANSACTION_TYPE_INCOME;

    filters: any = {};
    welletRow: any;
    transactionList: any = [];
    categories:any = [];
    row: any = {};
    inFlow: number = 0;
    outFlow: number = 0;
    summaryTransaction: number = 0;

    currentPanel = 'transactionList';

    bsValue = new Date();
    bsConfig = {
        dateInputFormat: 'YYYY-MM-DD',
        selectFromOtherMonth: true
    }
    focusInput: any = null;

    @Output('back')
    backToListing = new EventEmitter();

    constructor(
        public componentService: WelletService,
        private transactionService: TransactionService,
        private categoryService: CategoryService,
        private cdr : ChangeDetectorRef
    ) {
        super();
    }

    createSearchModel() {

        this.row = {
            id: 0,
            type:'',
            date: toUtcDate(new Date()),
            note: '',
            wellet_id:'',
            cat_id:'',
            amount:'',
            description: ''
        };
        this.loadCategories();
    }

    loadCategories()
    {
        this.categoryService.listing().subscribe(result=>{
            if(result.success){
                this.categories = result.data;
            }
        })
    }

    showPanel(panelCode: string, row?: any)
    {
        if(row && row.id > 0){
            this.row = row;
        }
        this.currentPanel = panelCode;
        this.cdr.detectChanges();
    }

    show(row?: any)
    {
        this.welletRow  = row;
        this.row.wellet_id = row.id;

        this.filters = {
            wellet_id: row.id,
            month_year: this.currentMonth()
        };

        this.loadTransaction();
    }

    loadTransaction()
    {
        this.transactionList = [];

        this.loading = true;
        this.transactionService.listing(this.filters).subscribe(result=>{
            this.loading = false;
            if (result.success){
                this.transactionList = result.data;
                this.sumTransaction();
            }
        })
    }

    sumTransaction()
    {
        this.inFlow = 0;
        this.outFlow = 0;
        this.summaryTransaction = 0;

        if(nEmpty(this.transactionList)){
            for(let tran of this.transactionList){
                let sumDaliy = 0;
                if(nEmpty(tran.transections)){
                    for(let tr of tran.transections){
                        if(intVal(tr.type) === TRANSACTION_TYPE_INCOME){
                            sumDaliy += intVal(tr.amount);
                            this.inFlow += intVal(tr.amount);
                        }else{
                            sumDaliy -= intVal(tr.amount);
                            this.outFlow += intVal(tr.amount);
                        }
                    }
                    tran.sumDaliy = sumDaliy;
                }
            }

            this.summaryTransaction = this.inFlow - this.outFlow;
        }
    }

    dateChange()
    {
        this.row.date = toUtcDate(this.row.date);
    }

    save()
    {
        if (this.row.id === 0){
            this.saveRecord();
        }else{
            this.updateRecord();
        }
    }

    saveRecord()
    {
        this.transactionService.create(this.row).subscribe(result=>{
            if(result.success){
                this.loadTransaction();

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Record is saved!',
                    showConfirmButton: false,
                    timer: 2000
                })

                this.cdr.detectChanges();
                this.currentPanel= 'transactionList';
            }
        })
    }

    updateRecord()
    {
        this.transactionService.update(this.row).subscribe(result=>{
            if(result.success){
                this.loadTransaction();

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Record is saved!',
                    showConfirmButton: false,
                    timer: 2000
                })

                this.cdr.detectChanges();
                this.currentPanel= 'transactionList';
            }
        })
    }

    cancel()
    {
        this.currentPanel= 'transactionList';
        this.createSearchModel();
    }

    removeTransaction(row)
    {
        Swal.fire({
            title: 'Confirm to delete record?',
            text: ``,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.transactionService.remove(row.id).subscribe(result=>{
                    this.loadTransaction();
                    if(result.success){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Record is removed!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                });
            }
        })
    }

    backToWelletList()
    {
        this.backToListing.emit();
    }

    currentMonth()
    {
        const curMonthYear = toUtcDate(new Date())
        return curMonthYear;
    }

}
