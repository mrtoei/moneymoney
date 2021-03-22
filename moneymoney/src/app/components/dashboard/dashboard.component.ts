import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "@services/login.service";
import {DashboardService} from "@services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  filter: any =  {};
  count: number = 1;

  @ViewChild('divChart') divChart:ElementRef;
  constructor(
      private loginSerive: LoginService,
      public componentService: DashboardService,
  ) { }

  ngOnInit(): void {

  }
}
