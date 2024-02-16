import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = environment.apiUrl + '/api/Products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + `getproducts`);
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
