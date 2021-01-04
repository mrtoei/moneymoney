import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from '@components/app/app.component';
import { LoginComponent } from '@components/login/login.component';
import { HeaderComponent } from '@components/layout/header/header.component';
import { MenuComponent } from '@components/layout/menu/menu.component';
import { FooterComponent } from '@components/layout/footer/footer.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login' , component: LoginComponent },
  { path: 'dashboard' , component: DashboardComponent },
  { path: 'wellet' , loadChildren:()=>import('@routers/wellet').then(m => m.WelletModule) },
  { path: 'setting/categories' , loadChildren:()=>import('@routers/category').then(m => m.CategoryModule)},
  // { path: '**', redirectTo: 'login'}
];

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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
