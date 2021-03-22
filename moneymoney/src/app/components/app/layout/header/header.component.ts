import { Component, OnInit } from '@angular/core';
import {LoginService} from '@services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
      private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  onClickSignOut(){
    this.loginService.logout();
  }
}
