import {Directive, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ModalDirective} from 'ngx-bootstrap/modal';
import Swal from "sweetalert2";

@Directive()
export abstract class BaseFormModalComponent implements OnInit
{
    public componentService: any;

    loading: boolean = false;
    submitting: boolean = false;
    row: any = {};

    @ViewChild('popupForm', {static: false})
    popupForm: NgForm;

    @ViewChild('formModal', {static: false})
    formModal: ModalDirective;

    @Output('afterSaved')
    afterSaved = new EventEmitter();

    protected constructor(
        componentService: any,
    ) {
        this.componentService = componentService;
        this.initializeRow();
    }

    initializeRow()
    {
    }

    ngOnInit()
    {
    }

    show(rowId?: any){
        if (rowId){
            this.loadRow(rowId)
        }else{
            this.initializeRow();
            this.formModal.show();
        }
    }

    save(){
        let action = 'create';
        let request ;
        if (this.row.id === 0){
           request = this.componentService.create(this.row);
        }else{
            action = 'update';
            request = this.componentService.update(this.row);
        }
        request.subscribe(result=>{
           if(result.success){
               this.afterSaved.emit({
                   action: action,
                   row: result.data
               })
               this.formModal.hide();
               Swal.fire({
                   position: 'top-end',
                   icon: 'success',
                   title: 'Record is saved!',
                   showConfirmButton: false,
                   timer: 2000
               })
           }
        });
    }

    loadRow(rowId: any)
    {
        if(this.loading || this.submitting){
            return;
        }

        this.loading = true;
        this.componentService.read(rowId).subscribe(result => {
            this.loading = false;
            if(result.success){
                this.row = result.data;
                this.afterLoadRow();
                this.formModal.show();
            }
            else{
                this.formModal.hide();
            }
        });
    }

    afterLoadRow()
    {
        //developer anc override if required.
    }

    cancel(){
        this.formModal.hide();
    }

}
