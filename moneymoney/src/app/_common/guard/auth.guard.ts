import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "@cService/auth.service";

@Injectable()
export class AuthGuard implements CanActivate
{
  constructor(private router: Router, private authService: AuthService)
  {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isAuth()){
      return  true;
    }else{
      this.authService.logout();
      return false;
    }
  }
}
