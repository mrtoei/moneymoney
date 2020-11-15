import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LoginService} from '@services/login.service';
import {Router} from '@angular/router';
import {DashboardService} from '@services/dashboard.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
