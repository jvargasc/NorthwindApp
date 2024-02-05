import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = environment.apiUrl + '/api/Orders/';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>(this.baseUrl + `getorders`);
  }

  getOrder(orderId: number) {
    return this.http.get<Order>(this.baseUrl + `getorder/${orderId}`);
  }

}
