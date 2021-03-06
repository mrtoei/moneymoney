import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@components/app/app.component';
import {CustomPipes} from "@cPipe/pipes";
import {DashboardComponent} from "@components/dashboard/dashboard.component";
import {LoginComponent} from "@components/login/login.component";
import {BaseService} from "@cService/base.service";
import {AuthGuard} from "@cGuard/auth.guard";
import {AuthService} from "@cService/auth.service";
import {MenuActiveDirective} from "../_common/directives/mactive.directive";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login' , component: LoginComponent },
  { canActivate: [AuthGuard], path: 'dashboard' , component: DashboardComponent },
  { canActivate: [AuthGuard], path: 'wallet' , loadChildren:()=>import('@routers/wallet').then(m => m.WalletModule) },
  { canActivate: [AuthGuard], path: 'transaction' , loadChildren:()=>import('@routers/transation').then(m => m.TransactionModule) },
  { canActivate: [AuthGuard], path: 'setting/categories' , loadChildren:()=>import('@routers/category').then(m => m.CategoryModule)},
  // { path: '**', redirectTo: 'login'}
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuActiveDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CustomPipes
  ],
  providers: [
    BaseService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
