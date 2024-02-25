import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { OrderDetailsComponent } from './order-edit/order-details/order-details.component';

@NgModule({
  declarations: [
    OrderEditComponent,
    OrderListComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
