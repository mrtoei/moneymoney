import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@components/login/login.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { WelletListComponent } from '@components/wellet/welletList.component';
import { CategoryListComponent } from '@components/setting/category/categoryList.component';
import {TransactionListComponent} from '@components/wellet/transation/transactionList.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login' , component: LoginComponent },
  { path: 'dashboard' , component: DashboardComponent },
  { path: 'wellet' , component: WelletListComponent },
  { path: 'wellet/transaction/:id' , component: TransactionListComponent },
  { path: 'setting/categories' , component: CategoryListComponent },
  // { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
