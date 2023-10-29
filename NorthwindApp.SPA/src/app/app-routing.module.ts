import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipperListComponent } from './shippers/shipper-list/shipper-list.component';
import { ShipperEditComponent } from './shippers/shipper-edit/shipper-edit.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';

const routes: Routes = [
  { path: 'shippers/shipper-list', component: ShipperListComponent},
  { path: 'shippers/shipper-edit/:shipperId', component: ShipperEditComponent },
  { path: 'customers/customer-list', component: CustomerListComponent},
  { path: 'customers/customer-edit/:customerId', component: CustomerEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
