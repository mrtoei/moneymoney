import { Component } from '@angular/core';
import {LoginService} from "@services/auth/login.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'account';
  constructor(
      public loginService: LoginService
  ) {
  }
}
