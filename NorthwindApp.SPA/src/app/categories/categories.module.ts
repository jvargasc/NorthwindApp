import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { ToolbarsModule } from '../_shared/toolbars/toolbars.module';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ToolbarsModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
