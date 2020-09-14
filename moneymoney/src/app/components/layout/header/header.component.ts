import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {LoginService} from '../../../services/login.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
      private loginService: LoginService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClickSignOut(){
    this.loginService.logout().subscribe(
        result => {
          if (result.status === 200){
            localStorage.removeItem(environment.token);
            localStorage.removeItem(environment.user);
            this.router.navigate(['login']);
          }
        }
    );
  }
}
