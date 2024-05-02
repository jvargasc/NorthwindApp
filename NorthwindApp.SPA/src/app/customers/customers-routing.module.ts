import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { preventUnsavedChangesOnCustomerGuard } from '../_guards/prevent-unsaved-changes.guard';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'customers', component: CustomerListComponent},
      { path: 'customers/customer-list', component: CustomerListComponent},
      { path: 'customers/customer-edit', component: CustomerEditComponent, canDeactivate: [preventUnsavedChangesOnCustomerGuard] },
      { path: 'customers/customer-edit/:customerId', component: CustomerEditComponent, canDeactivate: [preventUnsavedChangesOnCustomerGuard] }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
