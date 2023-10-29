import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Customer } from '../_models/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl = "https://localhost:5002/api/Customers/";
  private customersSource = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSource.asObservable();

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(this.baseUrl + 'getcustomers');
  }

  getCustomer(customerId: string) {
    return this.http.get<Customer>(this.baseUrl + `getcustomer/${customerId}`);
  }

}
