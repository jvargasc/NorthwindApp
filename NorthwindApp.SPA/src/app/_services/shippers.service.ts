import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Shipper } from '../_models/shipper';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {

  baseUrl = environment.apiUrl + "/api/Shippers/";
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
