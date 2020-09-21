import {Directive, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

declare let $: any;

@Directive()
export abstract class BaseFormModalComponent implements OnInit
{
    public componentService: any;

    row: any = {};

    @ViewChild('popupForm', {static: false}) popupForm: NgForm;

    @ViewChild('formModal', {static: false}) formModal: ModalDirective;

    @Output('afterSaved')
    afterSaved = new EventEmitter();

    constructor(componentService: any) {
        this.componentService = componentService;
        this.initializeRow();
    }

    // tslint:disable-next-line:typedef
    initializeRow()
    {
    }

    ngOnInit()
    {

    }

    // tslint:disable-next-line:typedef
    show(rowId: any){
        if (rowId){
            console.log('rowId');
        }else{
            this.formModal.show();
        }
    }

    save(){
        console.log(this.row);
        const action = 'create';
        let request;
        if (this.row.id === 0){

        }else{
            request = this.componentService.create(this.row);
        }
        request.subscribe(
            result => {
                console.log(result);
            }
        );
    }

    cancel(){
        this.formModal.hide();
    }

}
