
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModel, FormsModule} from '@angular/forms';
import {ModalModule} from "ngx-bootstrap/modal";
import {CategoryListComponent} from '@components/setting/category/categoryList.component';
import {CategoryFormComponent} from '@components/setting/category/categoryForm.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CategoryListComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class CategoryRoutingModule
{
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CategoryRoutingModule,
        ModalModule.forRoot(),
    ],
    declarations: [
        CategoryListComponent,
        CategoryFormComponent
    ],
    providers: [
        NgModel
    ]
})

export class CategoryModule
{
}
