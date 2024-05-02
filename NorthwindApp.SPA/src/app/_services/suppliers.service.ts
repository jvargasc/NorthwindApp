import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../_models/supplier';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private baseUrl = environment.apiUrl + '/Suppliers/';
  private paginatedResult: PaginatedResult<Supplier[]> = new PaginatedResult<Supplier[]>;

  constructor(private http: HttpClient) { }

  getSuppliers(page?: number, itemsPerPage?: number) : Observable<PaginatedResult<Supplier[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Supplier[]>(this.baseUrl + `getsuppliers`, {observe: 'response', params}).pipe(
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
