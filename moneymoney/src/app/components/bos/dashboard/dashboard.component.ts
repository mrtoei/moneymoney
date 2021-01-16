import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from "@services/auth/login.service";
import {DashboardService} from "@services/bos/dashboard.service";

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
      private  router: Router,
      public componentService: DashboardService,
  ) { }

  ngOnInit(): void {
    if(!this.loginSerive.isLoggedIn()){
      this.router.navigate(['login']);
      // window.location.href= 'login'
    }
  }
}
