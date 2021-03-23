import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewHrComponent } from './view-hr/view-hr.component';
import { AuthGuardService } from '../core/auth/service/auth-guard.service';

const route: Routes = [
  {
    path: '',
    component: ViewHrComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'view-hr',
    component: ViewHrComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(route)
  ],
  exports: [
    RouterModule
  ]
})
export class HrRoutingModule { }
