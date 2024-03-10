import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShipperListComponent } from './shipper-list/shipper-list.component';
import { ShipperEditComponent } from './shipper-edit/shipper-edit.component';
import { preventUnsavedChangesOnShipperGuard } from '../_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
  { path: 'shippers', component: ShipperListComponent},
  { path: 'shippers/shipper-list', component: ShipperListComponent},
  { path: 'shippers/shipper-edit', component: ShipperEditComponent, canDeactivate: [preventUnsavedChangesOnShipperGuard] },
  { path: 'shippers/shipper-edit/:shipperId', component: ShipperEditComponent, canDeactivate: [preventUnsavedChangesOnShipperGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippersRoutingModule { }
