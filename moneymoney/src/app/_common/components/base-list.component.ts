import {Directive, OnInit, TemplateRef} from '@angular/core';
import {SearchModel} from '@cModel/SearchModel';
import Swal from 'sweetalert2';

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
                    this.searchModel.updateResult(result.data);
                    if(action === 'search') {
                        this.afterSearch(action);
                    }
                }
            }
        );
    }

    remove(row)
    {
        Swal.fire(
            'The Internet?',
            'That thing is still around?',
            'question'
        )
        console.log(row);
        // let confirm = window.confirm('Confirm to delete record?');
        // if(confirm){
        //     console.log(row);
        //     this.componentService.remove(row.id).subscribe(result=>{
        //         if(result.success){
        //             this.find();
        //             // this.toastr.success('Record is removed!');
        //         }
        //     });
        // }

        Swal.fire({
            title: 'Confirm to delete record?',
            text: `Category name : ${row.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(row);
                this.componentService.remove(row.id).subscribe(result=>{
                    if(result.success){
                        this.find();
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
        if (data.action === 'create'){
            this.searchModel.rows.unshift(data.row);
        }

    }
}
