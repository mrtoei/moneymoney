import { Component } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'account';
  constructor(
      public loginService: LoginService
  ) {
  }
}
