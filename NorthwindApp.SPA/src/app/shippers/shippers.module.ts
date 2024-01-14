import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipperEditComponent } from './shipper-edit/shipper-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { ToolbarlistComponent } from '../_shared/toolbars/toolbarlist/toolbarlist.component';

@NgModule({
  declarations: [
    ShipperEditComponent,
    ShipperEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ShipperEditComponent,
    ShipperEditComponent
  ]
})
export class ShippersModule { }
