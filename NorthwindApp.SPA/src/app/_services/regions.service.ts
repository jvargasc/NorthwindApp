import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Region } from '../_models/region';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  baseUrl = environment.apiUrl + "/api/Regions/";
  private regionsSource = new BehaviorSubject<Region[]>([]);
  regions$ = this.regionsSource.asObservable();

  constructor(private http: HttpClient) { }

  getRegions() {
    return this.http.get<Region[]>(this.baseUrl + 'getregions');
  }

  getRegion(customerId: string) {
    return this.http.get<Region>(this.baseUrl + `getregion/${customerId}`);
  }

}
