import {NgModel} from '@angular/forms';

export class SearchModel extends NgModel{
    filters: any = {};
    sorting: any = {field: '', direction: 'asc'};
    rows: any = [];

    constructor() {
        super(null, null, null, null);
    }

    updateResult(model: SearchModel){
        this.filters = model.filters;
        this.sorting = model.sorting;
        this.rows = model.rows;
    }

    toParams(){
        return {
            filters: this.filters,
            sorting: this.sorting,
            rows: this.rows
        };
    }
}
