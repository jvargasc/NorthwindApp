import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService  {

  private baseUrl = environment.apiUrl + '/api/Categories/';
  private categoriesSource = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSource.asObservable();

  constructor(private http: HttpClient) {
    this.setCategories();
    const timeLapse = (1 * 60 * 1000); // minutes * seconds * miliseconds
    interval(timeLapse).subscribe(
      t => (this.setCategories())
      );
   }

  private setCategories() {
    this.getCategories().subscribe({
      next: categoriesResult => {
        this.categoriesSource.next(categoriesResult);
      }
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + `getcategories`);
  }

  getCategory(categoryId: number): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + `getcategory/${categoryId}`);
  }

}
