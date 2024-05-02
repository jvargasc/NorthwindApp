import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { UsersService } from '../_services/users.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private usersService: UsersService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.usersService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          console.log(`Authorization: Bearer ${user.token}`);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`
            }
          });
        }
      }
    });

    return next.handle(request);
  }
}
