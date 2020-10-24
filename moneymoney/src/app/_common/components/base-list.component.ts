import {Directive, OnInit, TemplateRef} from '@angular/core';
import {SearchModel} from '@cModel/SearchModel';

@Directive()
export abstract class BaseListComponent implements OnInit
{
    public componentService: any;
    public  rowForm: any;

    headerTitle = 'Sample Title';

    searchModel: any = new SearchModel();

    protected constructor() {

    }

    ngOnInit()
    {
        this.createSearchModel();
        this.find('search');
    }

    find(action?: any){
        this.componentService.find(this.searchModel.toParams()).subscribe(
            result => {
                if (result.success){
                    console.log(result.data);
                    this.searchModel.updateResult(result.data);
                }
            }
        );
    }

    openFormModal(row?: any){
        if (row && row.id){

        }else{
            this.rowForm.show(null);
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
