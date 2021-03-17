import {ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {TransactionService} from "@services/bos/transaction.service";
import {dateText, empty, intVal, nEmpty, numberVal, numF, toUtcDate} from "@cxFunc";
import {TRANSACTION_TYPE_EXPENSE, TRANSACTION_TYPE_INCOME} from "@cUtil//xconstant";
import Swal from "sweetalert2";
import {TransactionFormComponent} from "./transactionForm.component";


@Component({
    selector: 'transactionList',
    templateUrl: './transactionList.html'
})
export class TransactionListComponent{
    loading = false;
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
    inFlow: number = 0;
    outFlow: number = 0;
    summaryTransaction: number = 0;
    focusInput: any = null;

    currentPanel = 'transactionList';

    @Output('back')
    backToListing = new EventEmitter();

    @ViewChild(TransactionFormComponent)
    public rowForm: TransactionFormComponent;

    constructor(
        public componentService: TransactionService,
        private cdr : ChangeDetectorRef
    ) { }

    loadTransaction(welletRow?: any)
    {
        this.welletRow  = welletRow;
        this.filters = {
            wellet_id: this.welletRow.id,
            month_year: toUtcDate(new Date())
        };

        this.transactionList = [];

        this.loading = true;
        this.componentService.find(this.filters).subscribe(result=>{
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
                            sumDaliy += numberVal(tr.amount);
                            this.inFlow += numberVal(tr.amount);
                        }else{
                            sumDaliy -= numberVal(tr.amount);
                            this.outFlow += numberVal(tr.amount);
                        }
                    }
                    tran.sumDaliy = sumDaliy;
                }
            }
            this.summaryTransaction = this.inFlow - this.outFlow;
        }
    }

    show(row?: any)
    {
        this.currentPanel = 'transactionForm';
        if (row && intVal(row.id) > 0){
            this.rowForm.show(this.welletRow, row.id);
        }else{
            this.rowForm.show(this.welletRow)
        }
        this.cdr.detectChanges();
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
               if(this.removeTransactionList(row)){
                   this.componentService.remove(row.id).subscribe(result=>{
                       if(result.success){
                           this.sumTransaction();
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
            }
        });
    }

    removeTransactionList(row)
    {
        this.transactionList = JSON.parse(JSON.stringify(this.transactionList));
        for (let rowTran of this.transactionList){
            if(nEmpty(rowTran.transections)){
                for(let tr of rowTran.transections){
                    if(intVal(tr.id) === intVal(row.id) && tr.date === row.date){
                        rowTran.transections.splice(tr,1);
                        return true;
                        break;
                    }
                }
            }
        }
    }

    unShiftTransactionList(row)
    {
        this.transactionList = JSON.parse(JSON.stringify(this.transactionList));
        for (let tran of this.transactionList){
            if(tran.date === row.date){
                tran.transections.unshift(row);
                break;
            }
        }
    }

    afterSaved(data?: any)
    {
        this.transactionList = JSON.parse(JSON.stringify(this.transactionList));
        if (data.action ===  'create'){
           this.unShiftTransactionList(data.row);
        }else if (data.action === 'update'){
            for (let rowTran of this.transactionList){
                for(let tr of rowTran.transections){
                    if(intVal(tr.id) === intVal(data.row.id)){
                        if(tr.date === data.row.date){
                            const index = rowTran.transections.indexOf(tr);
                            rowTran.transections[index] = JSON.parse(JSON.stringify(data.row));
                        }else{
                            if(this.removeTransactionList(tr)){
                                this.unShiftTransactionList(data.row);
                            }
                        }
                        break;
                    }
                }
            }
        }
        this.sumTransaction();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Record is saved!',
            showConfirmButton: false,
            timer: 2000
        })

        this.cdr.detectChanges();
        this.currentPanel='transactionList';
    }

    backToWelletList()
    {
        this.backToListing.emit();
    }

    backToTransactionListing()
    {
        this.currentPanel='transactionList';
    }

}
