import { Component, OnInit } from '@angular/core';
import {LoginService} from '@services//login.service';
import {Router} from '@angular/router';
import {environment} from '@env';
import { LoginModel } from '@cModel//mymodels';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = new LoginModel();
  loading = false;
  isError = false;
  msgError = '';
  constructor(
      private loginService: LoginService,
      private router: Router
  ){}

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()){
      this.router.navigate(['login']);
      this.router.navigate(['login']);
    }else{
        this.router.navigate(['dashboard']);
    }
  }

    // tslint:disable-next-line:typedef
  onSumbit(){
      this.isError = false;
      this.loading = true;
      this.loginService.login(this.loginModel).subscribe(
           result => {
             if (result.status === 200){
                 this.loading = false;
                 localStorage.setItem(environment.token, result.token);
                 localStorage.setItem(environment.user, JSON.stringify(result.user));
                 this.router.navigate(['dashboard']);
             }
           },
           error => {
               this.loading = false;
               if (error.status === 404){
                   this.isError = true;
                   this.msgError = error.error.msg;
               }
           }
       );
  }
}

