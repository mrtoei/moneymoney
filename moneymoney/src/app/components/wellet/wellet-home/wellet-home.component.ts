import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {WelletFormComponent} from '../wellet-form/wellet-form.component';
import {BaseListComponent} from '../../../_common/base-list.component';
import {SearchModel} from '../../models/SearchModel';
import {WelletService} from '../../../services/wellet.service';

@Component({
  selector: 'app-wellet-home',
  templateUrl: './wellet-home.component.html',
  styleUrls: ['./wellet-home.component.scss']
})
export class WelletHomeComponent extends BaseListComponent{

  isWellet = false;
  isAddWellet = false;

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

  onClickAddWellet(){
    this.isAddWellet = true;
  }

}
