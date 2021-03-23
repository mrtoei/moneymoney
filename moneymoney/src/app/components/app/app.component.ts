import { Component } from '@angular/core';
import {AuthService} from "@cService/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'account';

  constructor(
      public authService: AuthService
  ) {}

}
