import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "@services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit
{

  constructor(
      public componentService: DashboardService,
  ) { }

  ngOnInit()
  {

  }
}
