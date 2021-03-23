import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { switchMap, filter, take, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(this.addAuthenticationToken(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("Login request error", error.status);
        if (
          request.url.includes("refreshtoken") ||
          request.url.includes("oauth/token")
        ) {
          if (request.url.includes("refreshtoken")) {
            this.authService.logout();
          }
          return throwError(error);
        }
        if (error.status !== 401) {
          return throwError(error);
        }
        if (this.refreshTokenInProgress) {
          return this.refreshTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(request)))
          );
        } else {
          this.refreshTokenInProgress = true;
          this.refreshTokenSubject.next(null);
          return this.authService.refreshAccessToken().pipe(
            switchMap((token: any) => {
              this.refreshTokenInProgress = false;
              this.refreshTokenSubject.next(token);
              return next.handle(this.addAuthenticationToken(request));
            }),
            catchError((err: any) => {
              this.refreshTokenInProgress = false;
              this.authService.logout();
              return Observable.throw(error);
            })
          )
        }
      })
    );
  }

  addAuthenticationToken(request) {
    const accessToken = this.authService.getAccessToken();

    if (!accessToken) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      }
    });
  }



}
