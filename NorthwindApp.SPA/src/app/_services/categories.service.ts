import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = environment.apiUrl + '/api/Categories/';
  private categoriesSource = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSource.asObservable();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + `getcategories`);
  }

  getCategory(categoryId: number): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + `getcategory/${categoryId}`);
  }

}
