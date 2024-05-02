import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = environment.apiUrl + '/Products/';
  private paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>;

  constructor(private http: HttpClient) { }

  getProducts(page?: number, itemsPerPage?: number) : Observable<PaginatedResult<Product[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Product[]>(this.baseUrl + `getproducts`, {observe: 'response', params}).pipe(
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
    // return this.http.get<Product[]>(this.baseUrl + `getproducts`);
  }

  getProduct(productId: number): Observable<Product>  {
    return this.http.get<Product>(this.baseUrl + `getproduct/${productId}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl, product)
      .pipe(
        tap(resData => { return resData; })
      );
  }
}
