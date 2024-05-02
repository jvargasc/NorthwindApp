import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Shipper } from '../_models/shipper';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {

  private baseUrl = environment.apiUrl + '/Shippers/';
  private shippersSource = new BehaviorSubject<Shipper[]>([]);
  shippers$ = this.shippersSource.asObservable();

  constructor(private http: HttpClient) { }

  getShippers() {
    return this.http.get<Shipper[]>(this.baseUrl + 'getshippers');
  }

  getShipper(shipperId: number) {
    return this.http.get<Shipper>(this.baseUrl + `getshipper/${shipperId}`);
  }

  createShipper(shipper: Shipper): Observable<Shipper> {
    return this.http.post<Shipper>(this.baseUrl, shipper)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  updateShipper(shipper: Shipper): Observable<Shipper> {
    return this.http.put<Shipper>(this.baseUrl, shipper)
      .pipe(
        tap(resData => { return resData; })
      );
  }

}
