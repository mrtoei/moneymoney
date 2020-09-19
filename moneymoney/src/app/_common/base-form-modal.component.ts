import {Directive, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
declare let $: any;

class EventEmitter {
}

@Directive()
export abstract class BaseFormModalComponent implements OnInit
{
    public componentService: any;

    row: any = {};

    @ViewChild('popupForm') popupForm: NgForm;

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
        $('#modal').modal('show');
        if (rowId){
            console.log('rowId');
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

}
