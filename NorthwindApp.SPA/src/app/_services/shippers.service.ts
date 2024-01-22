import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Shipper } from '../_models/shipper';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {

  private baseUrl = environment.apiUrl + '/api/Shippers/';
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
