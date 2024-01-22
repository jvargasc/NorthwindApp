import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

const routes: Routes = [
  { path: 'orders', component: OrderListComponent},
  { path: 'orders/order-list', component: OrderListComponent},
  { path: 'orders/order-edit/:orderId', component: OrderEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
