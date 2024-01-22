import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../_models/supplier';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private baseUrl = environment.apiUrl + '/api/Suppliers/';
  private suppliersSource = new BehaviorSubject<Supplier[]>([]);
  suppliers$ = this.suppliersSource.asObservable();

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.baseUrl + `getsuppliers`);
  }

  getSupplier(supplierId: string): Observable<Supplier> {
    return this.http.get<Supplier>(this.baseUrl + `getsupplier/${supplierId}`);
  }

}
