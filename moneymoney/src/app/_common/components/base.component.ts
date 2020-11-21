import {Directive, OnInit} from '@angular/core';
import {SearchModel} from '@cModel/SearchModel';

@Directive()
export abstract class BaseComponent implements OnInit
{
    searchModel: any = new SearchModel();

    loading:boolean = false;

    constructor()
    {
    }

    ngOnInit()
    {
    }

}
