import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { ToolbarsModule } from '../_shared/toolbars/toolbars.module';
import { AppRoutingModule } from '../app-routing.module';
import { ShipperEditComponent } from './shipper-edit/shipper-edit.component';
import { ShipperListComponent } from './shipper-list/shipper-list.component';

@NgModule({
  declarations: [
    ShipperEditComponent,
    ShipperListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ToolbarsModule
  ],
  exports: [
    ShipperEditComponent,
    ShipperListComponent
  ]
})
export class ShippersModule { }
