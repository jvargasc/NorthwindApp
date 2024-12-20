import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = environment.apiUrl + '/Users/';
  private currentUserSource = new BehaviorSubject<User | null> (null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'register', model).pipe(
      map((response: User) => {
        console.log(response);
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      }
      )
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

}
