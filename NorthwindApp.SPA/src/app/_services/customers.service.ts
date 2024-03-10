import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Customer } from '../_models/customer';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private baseUrl = environment.apiUrl + '/api/Customers/';
  private paginatedResult: PaginatedResult<Customer[]> = new PaginatedResult<Customer[]>;

  constructor(private http: HttpClient) { }

  getCustomers(page?: number, itemsPerPage?: number) : Observable<PaginatedResult<Customer[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Customer[]>(this.baseUrl + `getcustomers`, {observe: 'response', params}).pipe(
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

  getCustomer(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl + `getcustomer/${customerId}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl, customer)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  private generateCustomerId(customerName: string): string {
    let index = customerName.indexOf(' ');
    let custName = customerName.replace(' ', '');
    custName = custName.substr(0, 3) + custName.substr(index, 2);
    return custName.toLocaleUpperCase();
  }

}
