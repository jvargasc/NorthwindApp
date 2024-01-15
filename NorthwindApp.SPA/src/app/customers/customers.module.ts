import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ToolbarsModule } from '../_shared/toolbars/toolbars.module';

@NgModule({
  declarations: [
    CustomerEditComponent,
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ToolbarsModule
  ],
  exports: [
    CustomerEditComponent,
    CustomerListComponent
  ]
})
export class CustomersModule { }
