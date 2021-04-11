import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService{

  private END_POINT = `api/coreUser`;
  private MENU_LIST_AUTH = `${environment.baseUrl}${environment.authApiUrl}/${this.END_POINT}/find-user-menu`;
 
  constructor(private http: HttpClient) { }

  findAuthMenuList(): Observable<any> {
    return this.http.get<any>(this.MENU_LIST_AUTH).pipe(map((data: any) => data ));
  }

}
