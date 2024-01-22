import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';

import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getOrders().subscribe(
      {
        next: ordersResult => { this.orders = ordersResult; }
      }
    );
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "refresh":
        location.reload();
        break;
      case "search":
        console.log(buttonName);
        break;
    }
  }

}
