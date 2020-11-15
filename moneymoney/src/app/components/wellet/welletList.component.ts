import { Component, ViewChild} from '@angular/core';
import {WelletFormComponent} from './welletForm.component';
import {BaseListComponent} from '../../_common/components/base-list.component';
import {SearchModel} from '../../_common/models/SearchModel';
import {WelletService} from '../../services/wellet.service';

@Component({
  selector: 'app-wellet-list',
  templateUrl: './welletList.html',
  styleUrls: ['./wellet.scss']
})
export class WelletListComponent extends BaseListComponent{

  @ViewChild(WelletFormComponent)
  public rowForm: WelletFormComponent;

  constructor(
      public componentService: WelletService
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
