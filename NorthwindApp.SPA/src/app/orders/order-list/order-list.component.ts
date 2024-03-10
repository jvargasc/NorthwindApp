import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Order } from 'src/app/_models/order';
import { Pagination } from 'src/app/_models/pagination';

import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 10;

  constructor(private ordersService: OrdersService, private router: Router) { }

  ngOnInit() {
    this.loadOrders();
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
            case "new":
        this.router.navigate(['/orders/order-edit']);
        break;
      case "refresh":
        location.reload();
        break;
      case "search":
        console.log(buttonName);
        break;
    }
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadOrders();
    }
  }

  private loadOrders() {
    this.ordersService.getOrders(this.pageNumber, this.pageSize).subscribe({
    next: response => {
      if (response.result && response.pagination) {
        this.orders = response.result;
        this.pagination = response.pagination;
      }
    }
    });
  }

}
