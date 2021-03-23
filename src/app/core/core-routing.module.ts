import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCoreComponent } from './view-core/view-core.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/service/auth-guard.service';
import { EmployeeComponent } from '../employee/employee/employee.component';

const routes : Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'view-core',
    component: ViewCoreComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'view-emp',
    component: EmployeeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'emp',
    component: HomeLayoutComponent,
    canActivate: [AuthGuardService],
    loadChildren:'../employee/emp.module#EmpModule'
  },
  {
    path: 'hr',
    component: HomeLayoutComponent,
    canActivate: [AuthGuardService],
    loadChildren:'../hr/hr.module#HrModule'
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', })
  ],
  exports: [
    RouterModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class CoreRoutingModule { }
