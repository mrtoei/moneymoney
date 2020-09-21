import {Directive, OnInit} from '@angular/core';
import {SearchModel} from '../components/models/SearchModel';

@Directive()
export abstract class BaseListComponent implements OnInit
{
    public componentService: any;

    headerTitle = 'Sample Title';
    public  rowForm: any;

    searchModel: any = new SearchModel();

    constructor() {

    }

    // tslint:disable-next-line:typedef
    ngOnInit()
    {
        this.createSearchModel();
        this.find('search');
    }
    // tslint:disable-next-line:typedef
    find(action?: any){
        console.log(this.searchModel.toParams());
        this.componentService.find(this.searchModel.toParams()).subscribe(
            result => {
                if (result.success){
                    console.log(result.data);
                    this.searchModel.updateResult(result.data);
                }
            }
        );
    }

    // tslint:disable-next-line:typedef
    openFormModal(row?: any){

        if (row && row.id){

        }else{
            this.rowForm.show();
        }
    }

    abstract createSearchModel();
    afterSearch(action?: string)
    {

    }

    afterModalSaved(data: any)
    {

    }
}
