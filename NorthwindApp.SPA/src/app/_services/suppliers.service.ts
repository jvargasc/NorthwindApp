import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../_models/supplier';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  getSupplier(supplierId: number): Observable<Supplier> {
    return this.http.get<Supplier>(this.baseUrl + `getsupplier/${supplierId}`);
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl, supplier)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(this.baseUrl, supplier)
      .pipe(
        tap(resData => { return resData; })
      );
  }
}
