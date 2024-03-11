import { Injectable } from '@angular/core';
import { Territory } from '../_models/territory';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, interval, map, tap } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesService {

  private baseUrl = environment.apiUrl + '/api/Territories/';
  private paginatedResult: PaginatedResult<Territory[]> = new PaginatedResult<Territory[]>;

  constructor(private http: HttpClient) { }

  getTerritories(page?: number, itemsPerPage?: number) : Observable<PaginatedResult<Territory[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Territory[]>(this.baseUrl + `getterritories`, {observe: 'response', params}).pipe(
      map(response => {
        if (response.body) {
          this.paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          this.paginatedResult.pagination = JSON.parse(pagination);
        }
        return this.paginatedResult;
      })
    );

    // return this.http.get<Territory[]>(this.baseUrl + `getterritories`);
  }

  getTerritory(territoryId: string) {
    return this.http.get<Territory>(this.baseUrl + `getterritory/${territoryId}`);
  }

  // private setTerritories() {
  //   this.getTerritories().subscribe({
  //     next: territoriesResult => {
  //       this.territoriesSource.next(territoriesResult);
  //     }
  //   });
  // }

  createTerritory(territory: Territory): Observable<Territory> {
    return this.http.post<Territory>(this.baseUrl, territory)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  updateTerritory(territory: Territory): Observable<Territory> {
    return this.http.put<Territory>(this.baseUrl, territory)
      .pipe(
        tap(resData => { return resData; })
      );
  }
}
