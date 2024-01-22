import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Region } from '../_models/region';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private baseUrl = environment.apiUrl + '/api/Regions/';
  private regionsSource = new BehaviorSubject<Region[]>([]);
  regions$ = this.regionsSource.asObservable();

  constructor(private http: HttpClient) { }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.baseUrl + 'getregions');
  }

  getRegion(regionId: number): Observable<Region> {
    return this.http.get<Region>(this.baseUrl + `getregion/${regionId}`);
  }

}
