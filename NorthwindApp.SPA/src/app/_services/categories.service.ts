import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, interval, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
    // const timeLapse = (1 * 60 * 1000); // minutes * seconds * miliseconds
    // interval(timeLapse).subscribe(
    //   t => (this.setCategories())
    //   );
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

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl, category)
      .pipe(
        tap(resData => { return resData; })
      );
  }

  private handleError(error: HttpErrorResponse) {

    // return throwError(`Backend returned code ${error.status}, body was: `, error.error);
    // console.log(error.error);
    // return error.error;
    // return throwError(() => new Error(error.error));

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
