import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { preventUnsavedChangesOnProductGuard } from '../_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: 'products', component: ProductListComponent},
  { path: 'products/product-list', component: ProductListComponent},
  { path: 'products/product-edit', component: ProductEditComponent, canDeactivate: [preventUnsavedChangesOnProductGuard] },
  { path: 'products/product-edit/:productId', component: ProductEditComponent, canDeactivate: [preventUnsavedChangesOnProductGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
