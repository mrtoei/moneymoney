import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
let LoginComponent = class LoginComponent {
    constructor(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.loginModel = new LoginModel();
        this.loading = false;
        this.isError = false;
        this.msgError = '';
    }
    ngOnInit() {
        if (!this.loginService.isLoggedIn()) {
            // this.router.navigate(['login'])
            // window.location.href= 'login'
        }
    }
    onSumbit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isError = false;
            this.loading = true;
            yield this.loginService.login(this.loginModel).subscribe(result => {
                if (result.status == 200) {
                    this.loading = false;
                    localStorage.setItem(environment.token, result.token);
                    localStorage.setItem(environment.user_id, result.user_id);
                    localStorage.setItem(environment.username, result.username);
                }
            }, error => {
                this.loading = false;
                if (error.status == 404) {
                    this.isError = true;
                    this.msgError = error.error.msg;
                }
            });
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
class LoginModel {
}
//# sourceMappingURL=login.component.js.map