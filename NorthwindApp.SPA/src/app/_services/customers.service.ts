import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Customer } from '../_models/customer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl = environment.apiUrl + "/api/Customers/";
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
