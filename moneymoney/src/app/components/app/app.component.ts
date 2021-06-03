import {Component, OnInit} from '@angular/core';
import {AuthService} from "@cService/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'account';

  constructor(
      public authService: AuthService
  ) {
  }

  ngOnInit()
  {

  }

  logout()
  {
    this.authService.logout();
  }

}
