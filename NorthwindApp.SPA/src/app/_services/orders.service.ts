import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = environment.apiUrl + '/api/Orders/';
  private paginatedResult: PaginatedResult<Order[]> = new PaginatedResult<Order[]>;
  constructor(private http: HttpClient) { }

  getOrders(page?: number, itemsPerPage?: number) : Observable<PaginatedResult<Order[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Order[]>(this.baseUrl + `getorders`, {observe: 'response', params}).pipe(
      map(response => {
        if (response.body) {
          this.paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          this.paginatedResult.pagination = JSON.parse(pagination);
        }
        return this.paginatedResult;
      })
    );
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
