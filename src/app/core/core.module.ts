import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ShareModule } from "../share/share.module";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuardService } from "./auth/service/auth-guard.service";
import { AuthService } from "./auth/service/auth.service";
import { BrowserNavigationGuardService } from "./auth/service/browser-navigation-guard.service";
import { TokenInterceptorService } from "./auth/service/token-interceptor.service";
import { CoreRoutingModule } from "./core-routing.module";
import { HomeLayoutComponent } from "./home-layout/home-layout.component";
import { LoginComponent } from "./login/login.component";
import { ViewCoreComponent } from "./view-core/view-core.component";
import { MenuListComponent } from './menu-list/menu-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ViewCoreComponent, 
    HomeLayoutComponent, 
    AuthComponent, 
    LoginComponent, MenuListComponent, NavigationComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ShareModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BrowserNavigationGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  exports: []
})
export class CoreModule { }
