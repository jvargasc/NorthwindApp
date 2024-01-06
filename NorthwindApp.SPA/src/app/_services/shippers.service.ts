import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Shipper } from '../_models/shipper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {

  baseUrl = "http://localhost:5001/api/Shippers/";
  private shippersSource = new BehaviorSubject<Shipper[]>([]);
  shippers$ = this.shippersSource.asObservable();

  constructor(private http: HttpClient) { }

  getShippers() {
    return this.http.get<Shipper[]>(this.baseUrl + 'getshippers');
  }

  getShipper(shipperId: number) {
    return this.http.get<Shipper>(this.baseUrl + `getshipper/${shipperId}`);
  }

}
