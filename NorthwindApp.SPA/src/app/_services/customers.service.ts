import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Customer } from '../_models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private baseUrl = environment.apiUrl + '/api/Customers/';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'getcustomers');
  }

  getCustomer(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl + `getcustomer/${customerId}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    customer.customerId = this.generateCustomerId(customer.contactName);
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
    console.log(custName);
    return custName.toLocaleUpperCase();
  }

}
