import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { preventUnsavedChangesOnOrderGuard } from '../_guards/prevent-unsaved-changes.guard';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'orders', component: OrderListComponent},
      { path: 'orders/order-list', component: OrderListComponent},
      { path: 'orders/order-edit', component: OrderEditComponent, canDeactivate: [preventUnsavedChangesOnOrderGuard] },
      { path: 'orders/order-edit/:orderId', component: OrderEditComponent, canDeactivate: [preventUnsavedChangesOnOrderGuard] }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
