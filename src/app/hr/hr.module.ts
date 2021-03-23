import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHrComponent } from './view-hr/view-hr.component';
import { Router, RouterModule } from '@angular/router';
import { HrRoutingModule } from './hr-routing.module';



@NgModule({
  declarations: [ViewHrComponent],
  imports: [
    HrRoutingModule
  ],
  exports: [
   
  ]
})
export class HrModule { }
