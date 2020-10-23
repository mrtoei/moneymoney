import {NgModel} from '@angular/forms';

export class SearchModel extends NgModel{
    filters: any = {};
    rows: any = [];

    constructor() {
        super(null, null, null, null);
    }

    updateResult(model: SearchModel){
        this.rows = model.rows;
    }

    toParams(){
        return {
            filters: this.filters
        };
    }
}
