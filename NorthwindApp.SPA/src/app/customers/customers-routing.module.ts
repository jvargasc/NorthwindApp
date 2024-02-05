import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

const routes: Routes = [
  { path: 'customers', component: CustomerListComponent},
  { path: 'customers/customer-list', component: CustomerListComponent},
  { path: 'customers/customer-edit', component: CustomerEditComponent },
  { path: 'customers/customer-edit/:customerId', component: CustomerEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
