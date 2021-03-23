
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuardService } from '../core/auth/service/auth-guard.service';
import { NgModule } from '@angular/core';
import { ViewCoreComponent } from '../core/view-core/view-core.component';
import { ShareViewComponent } from '../share/share-view/share-view.component';
import { ViewHrComponent } from '../hr/view-hr/view-hr.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'view-emp',
    component: EmployeeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'view-core',
    component: ViewCoreComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'view-share',
    component: ShareViewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'view-hr',
    component: ViewHrComponent,
    canActivate: [AuthGuardService]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpRoutingModule { }
