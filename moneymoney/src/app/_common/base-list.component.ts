import {Directive, OnInit} from '@angular/core';
import {SearchModel} from '../components/models/SearchModel';

@Directive()
export abstract class BaseListComponent implements OnInit
{
    headerTitle = 'Sample Title';
    public  rowForm: any;

    searchModel: any = new SearchModel();

    constructor() {

    }

    // tslint:disable-next-line:typedef
    ngOnInit()
    {
        this.createSearchModel();
    }

    // tslint:disable-next-line:typedef
    openFormModal(row?: any){

        if (row && row.id){

        }else{
            this.rowForm.show();
        }
    }

    abstract createSearchModel();
    afterSearch(action?:string)
    {
        //TODO implement if needed
    }
}
