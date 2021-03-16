import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { CustomizeCookieService } from './customize-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.baseUrl;
  private API_URL = environment.authApiUrl;
  private END_POINT = '/oauth/token';
  private USER_DETAILS = this.BASE_URL + this.API_URL + '/api/coreUser/user-details';
  private AUTH_URL = `${this.BASE_URL}${this.API_URL}${this.END_POINT}`;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public _isLoading: boolean = false;
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private errMsg: BehaviorSubject<string> = new BehaviorSubject(null);

  private CLIENT_ID = 'medClientIdPassword';
  private PASSWORD = 'secret';
  private GRANT_TYPE = 'password';

  userDetils: any = {};

  get isLoggedIn() {
    this.checkCredentials();
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private customCookieService: CustomizeCookieService,
    private httpClient: HttpClient
  ) { }

  obtainAccessToken(user: any) {

    this._isLoading = true;
    this.isLoading.next(this._isLoading);

    const params = new HttpParams()
      .set('username', user.userName)
      .set('password', user.password)
      .set('grant_type', this.GRANT_TYPE)
      .set('client_id', this.CLIENT_ID);

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.CLIENT_ID}:${this.PASSWORD}`),
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    this.httpClient.post<any>(this.AUTH_URL, params.toString(), { headers }).pipe(
      map((res: any) => res)).subscribe(
        data => {
          this.saveToken(data);
          this.isLoading.next(false);
          this.errMsg.next('');
        },
        err => {
          this.isLoading.next(false);
          console.error('Credentials error ', err);
          var errorMessage = navigator.onLine ? err.error.error_description : 'Please check your internet connection or try again later';
          if (errorMessage === undefined) {
            errorMessage = 'Service not available, please contact with Administrator';
          }
          this.errMsg.next(errorMessage);
        }
      );

  }

  saveToken(token) {
    this.customCookieService.setWithExpiryInSeconds("access_token", token.access_token, token.expires_in);
    this.setUserInformation();
  }

  setUserInformation(): void {
    this.httpClient.get<any>(`${this.USER_DETAILS}`, <any>{}).subscribe(
      res => {
        this.userDetils = res;
        console.log('userDetils', this.userDetils);
        const _userInfo = this.userDetils.obj;
        const companyList = _userInfo.companyList;
        if (companyList) {
          Object.keys(companyList).forEach((key, value, array) => {
            if (companyList[key].companyId == _userInfo.defaultCompanyId) {
              _userInfo.companyAddress1 = companyList[key].compnayAddress1
              _userInfo.companyAddress2 = companyList[key].compnayAddress2
            }
          });
        }
        if (this.userDetils.obj) {
          localStorage.setItem('userInfo', JSON.stringify(this.userDetils.obj));
          if (this.userDetils.obj.userDefaultPageLink) {
            this.router.navigate(['emp']);
            // this.router.navigate([this.userDetils.obj.userDefaultPageLink]);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          localStorage.setItem('userInfo', JSON.stringify(null));
          this.router.navigate(['/']);
        }
      },
      err => {
        localStorage.setItem('userInfo', JSON.stringify(null));
        this.router.navigate(['/']);
        console.log('Error : ', err)
      }
    )
  }

  getAccessToken(): any {
    return this.customCookieService.get('access_token');
  }

  logout() {
    this.deleteToken().subscribe(
      res => {
        console.log('Delete token response ', res);
        if (res.success) {
          this.customCookieService.delete('access_token');
          localStorage.clear();
          this.router.navigate(['/login']);
        } else {
          this.customCookieService.delete('access_token');
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      },
      err => {
        console.log('Error Occurred In Delete token ', err);
        this.customCookieService.delete('access_token');
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

  deleteToken(): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + this.cookieService.get('access_token'),
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    const DELETE_APIURL = `${this.BASE_URL}${this.API_URL}${this.END_POINT}/logout`;
    return this.httpClient.delete<any>(DELETE_APIURL, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  refreshAccessToken(): Observable<any> {
    return of(new Observable);
  }

  checkCredentials() {
    if (!this.customCookieService.get('access_token')) {
      this.loggedIn.next(false);
    } else {
      this.loggedIn.next(true);
    }
  }

}
