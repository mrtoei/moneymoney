import { Component, OnInit } from '@angular/core';
import {AuthService} from "@cService/auth.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onClickSignOut(){
    this.authService.logout();
  }
}
