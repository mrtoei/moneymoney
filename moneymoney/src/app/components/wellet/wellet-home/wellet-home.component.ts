import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {WelletFormComponent} from '../wellet-form/wellet-form.component';
import {BaseListComponent} from '../../../_common/base-list.component';
import {SearchModel} from '../../models/SearchModel';

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

  constructor() {
    super();
  }

  createSearchModel()
  {
    console.log('createSearchModal');
    console.log('find');
    this.searchModel = new SearchModel();
    this.searchModel.filters = {};
  }

  onClickAddWellet(){
    this.isAddWellet = true;
  }

}
