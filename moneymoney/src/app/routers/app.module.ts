import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from '@components/app/app.component';
import { LoginComponent } from '@components/auth/login/login.component';
import { HeaderComponent } from '@components/app/layout/header/header.component';
import { MenuComponent } from '@components/app/layout/menu/menu.component';
import { FooterComponent } from '@components/app/layout/footer/footer.component';
import { DashboardComponent } from '@components/bos/dashboard/dashboard.component';
import {CustomPipes} from "@cPipe/pipes";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login' , component: LoginComponent },
  { path: 'dashboard' , component: DashboardComponent },
  { path: 'wellet' , loadChildren:()=>import('@routers/wellet').then(m => m.WelletModule) },
  { path: 'transaction' , loadChildren:()=>import('@routers/transation').then(m => m.TransactionModule) },
  { path: 'setting/categories' , loadChildren:()=>import('@routers/category').then(m => m.CategoryModule)},
  // { path: '**', redirectTo: 'login'}
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CustomPipes
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
