import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { ShipperEditComponent } from './shipper-edit/shipper-edit.component';
import { ShipperListComponent } from './shipper-list/shipper-list.component';
import { ShippersRoutingModule } from './shippers-routing.module';

@NgModule({
  declarations: [
    ShipperEditComponent,
    ShipperListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ShippersRoutingModule
  ]
})
export class ShippersModule { }
