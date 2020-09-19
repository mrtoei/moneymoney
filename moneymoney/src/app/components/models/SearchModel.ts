import {NgModel} from '@angular/forms';

export class SearchModel extends NgModel{
    rows: any = [];

    constructor() {
        super(null, null, null, null);
    }
}
