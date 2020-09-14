import { __decorate } from "tslib";
import { Component } from '@angular/core';
let DashboardComponent = class DashboardComponent {
    constructor(loginSerive, router) {
        this.loginSerive = loginSerive;
        this.router = router;
    }
    ngOnInit() {
        if (!this.loginSerive.isLoggedIn()) {
            this.router.navigate(['login']);
            // window.location.href= 'login'
        }
    }
};
DashboardComponent = __decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.scss']
    })
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map