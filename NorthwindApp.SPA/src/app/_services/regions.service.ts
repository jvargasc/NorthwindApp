import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Region } from '../_models/region';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private baseUrl = environment.apiUrl + '/Regions/';
  private regionsSource = new BehaviorSubject<Region[]>([]);
  regions$ = this.regionsSource.asObservable();

  constructor(private http: HttpClient) {
    this.getRegions().subscribe(
      {
        next: regionsResult => {
          this.regionsSource.next(regionsResult);
        }
      }
    );
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.baseUrl + 'getregions');
  }

  getRegion(regionId: number): Observable<Region> {
    return this.http.get<Region>(this.baseUrl + `getregion/${regionId}`);
  }

  createProduct(region: Region): Observable<Region> {
    return this.http.post<Region>(this.baseUrl, region)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  updateProduct(region: Region): Observable<Region> {
    return this.http.put<Region>(this.baseUrl, region)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  // getRegionDescription(regionId: number) : string | undefined {
  //   let regions: Region[] = [];

  //   this.regions$.subscribe(
  //     {
  //       next: regionsResult => {
  //         regions = regionsResult;
  //         const region = regions.find(r => r.regionId === regionId);
  //         return region ? region.regionDescription : undefined;
  //       }
  //     }
  //     );
  //     return undefined;


  // }

}
