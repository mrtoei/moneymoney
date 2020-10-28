import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule  } from 'ngx-bootstrap/buttons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WelletHomeComponent } from './components/wellet/wellet-home/wellet-home.component';
import { WelletFormComponent } from './components/wellet/wellet-form/wellet-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryListComponent } from '@components/setting/category/categoryList.component';
import { CategoryFormComponent } from '@components/setting/category/categoryForm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    WelletHomeComponent,
    WelletFormComponent,
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
