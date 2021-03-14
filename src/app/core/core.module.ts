import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { ViewCoreComponent } from './view-core/view-core.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { ShareModule } from '../share/share.module';
import { AuthService } from './auth/service/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './auth/service/token-interceptor.service'



@NgModule({
  declarations: [ViewCoreComponent, HomeLayoutComponent, AuthComponent, LoginComponent],
  imports: [
    CoreRoutingModule,
    ShareModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  exports: []
})
export class CoreModule { }
