import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';

const routes: Routes = [
  { path: 'suppliers', component: SupplierListComponent},
  { path: 'suppliers/supplier-list', component: SupplierListComponent},
  { path: 'suppliers/supplier-edit', component: SupplierDetailComponent },
  { path: 'suppliers/supplier-edit/:supplierId', component: SupplierDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
