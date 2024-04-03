import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { preventUnsavedChangesOnSupplierGuard } from '../_guards/prevent-unsaved-changes.guard';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'suppliers', component: SupplierListComponent},
      { path: 'suppliers/supplier-list', component: SupplierListComponent},
      { path: 'suppliers/supplier-edit', component: SupplierDetailComponent, canDeactivate: [preventUnsavedChangesOnSupplierGuard] },
      { path: 'suppliers/supplier-edit/:supplierId', component: SupplierDetailComponent, canDeactivate: [preventUnsavedChangesOnSupplierGuard] }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
