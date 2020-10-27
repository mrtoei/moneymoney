import {Directive, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ModalDirective} from 'ngx-bootstrap/modal';

@Directive()
export abstract class BaseFormModalComponent implements OnInit
{
    public componentService: any;

    row: any = {};

    @ViewChild('popupForm', {static: false}) popupForm: NgForm;

    @ViewChild('formModal', {static: false}) formModal: ModalDirective;

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
            console.log('rowId');
        }else{
            this.formModal.show();
        }
    }

    save(){
        console.log(this.row);
        let action = 'create';
        let request ;
        if (this.row.id === 0){
           request = this.componentService.create(this.row);
        }else{
            // action = 'update';
        }

        request.subscribe(result=>{
           if(result.success){
               this.afterSaved.emit({
                   action: action,
                   row: result.data
               })
               this.formModal.hide();
           }
        });

    }

    cancel(){
        this.formModal.hide();
    }

}
