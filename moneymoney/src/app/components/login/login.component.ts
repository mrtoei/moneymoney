import { Component, OnInit } from '@angular/core';
import {environment} from '@env';
import {LoginModel} from "@cModel/mymodels";
import {AuthService} from "@cService/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = new LoginModel();
  loading = false;
  isError = false;
  msgError = '';
  constructor(
      private authService: AuthService
  ){}

  ngOnInit()
  {
      if(this.authService.isAuth()){
          window.location.href='dashboard';
      }
  }

  onSumbit()
  {
      this.isError = false;
      this.loading = true;
      this.authService.login(this.loginModel).subscribe(
           result => {
             if (result.status === 200){
                 this.loading = false;
                 localStorage.setItem(environment.token, result.token);
                 localStorage.setItem(environment.user, JSON.stringify(result.user));
                 window.location.href='dashboard';
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

