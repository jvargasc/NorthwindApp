import { Injectable } from '@angular/core';
import { Territory } from '../_models/territory';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, interval, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesService {

  private baseUrl = environment.apiUrl + '/api/Territories/';
  private territoriesSource = new BehaviorSubject<Territory[]>([]);
  territories$ = this.territoriesSource.asObservable();

  constructor(private http: HttpClient) {
    this.setTerritories();
    const timeLapse = (1 * 60 * 1000); // minutes * seconds * miliseconds
    interval(timeLapse).subscribe(
      t => (this.setTerritories())
      );
  }

  getTerritories() {
    return this.http.get<Territory[]>(this.baseUrl + `getterritories`);
  }

  getTerritory(territoryId: string) {
    return this.http.get<Territory>(this.baseUrl + `getterritory/${territoryId}`);
  }

  private setTerritories() {
    this.getTerritories().subscribe({
      next: territoriesResult => {
        this.territoriesSource.next(territoriesResult);
      }
    });
  }

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
