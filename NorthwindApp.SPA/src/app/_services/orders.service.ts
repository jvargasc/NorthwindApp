import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(this.baseUrl, order)
      .pipe(
        tap(resData => { return resData; })
      );
  }

}
