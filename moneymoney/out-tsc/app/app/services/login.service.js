import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
let LoginService = class LoginService {
    constructor(http) {
        this.http = http;
        this.hostUrl = environment.webapi;
    }
    isLoggedIn() {
        const loginResult = localStorage.getItem(environment.username);
        return loginResult != null;
    }
    login(values) {
        return this.http.post(`${this.hostUrl}/login`, values);
    }
};
LoginService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map
