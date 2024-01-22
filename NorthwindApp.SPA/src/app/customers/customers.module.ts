import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [
    CustomerEditComponent,
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
