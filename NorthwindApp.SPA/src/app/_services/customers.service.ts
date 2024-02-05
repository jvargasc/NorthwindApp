import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

    // return this.http.get<Customer>(this.baseUrl + `getcustomer/${customerId}`)
    // .pipe(
    //   map(result => {
    //     return { customerId: result.customerId, companyName: '', contactName: '', contactTitle: '', address: result.address, city: '', regionId: 1, postalCode: '', country: '', phone: '', fax: ''}
    //   })
    // );
    // let resultData = this.http.get<Customer>(this.baseUrl + `getcustomer/${customerId}`)
    //   .pipe(map(res => { return res[Customer] }));

    // this.displayData(resultData);
    // return resultData;
  }

  private displayData(dataResult: any) {
    console.log(dataResult);
  }

}
