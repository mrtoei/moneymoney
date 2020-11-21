import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {WelletFormComponent} from './welletForm.component';
import {BaseListComponent} from '@cComponents/base-list.component';
import {SearchModel} from '@cModel/SearchModel';
import {WelletService} from '@services/wellet.service';

@Component({
  selector: 'app-wellet-list',
  templateUrl: './welletList.html',
  styleUrls: ['./wellet.scss']
})
export class WelletListComponent extends BaseListComponent{

  currentPanel = 'listing';

  @ViewChild(WelletFormComponent)
  public rowForm: WelletFormComponent;

  constructor(
      public componentService: WelletService,
  ) {
    super();
  }

  createSearchModel()
  {
    this.searchModel = new SearchModel();
    this.searchModel.filters = {
      name:''
    };
  }

}
