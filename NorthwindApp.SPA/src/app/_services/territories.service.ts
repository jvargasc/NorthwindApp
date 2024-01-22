import { Injectable } from '@angular/core';
import { Territory } from '../_models/territory';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesService {

  private baseUrl = environment.apiUrl + '/api/Territories/';
  private territoriesSource = new BehaviorSubject<Territory[]>([]);
  territories$ = this.territoriesSource.asObservable();

  constructor(private http: HttpClient) { }

  getTerritories() {
    return this.http.get<Territory[]>(this.baseUrl + `getterritories`);
  }

  getTerritory(territoryId: string) {
    return this.http.get<Territory>(this.baseUrl + `getterritory/${territoryId}`);
  }

}
