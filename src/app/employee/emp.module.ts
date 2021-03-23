import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';
import { EmpRoutingModule } from './emp-routing.module';
import { ViewCoreComponent } from '../core/view-core/view-core.component';



@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    EmpRoutingModule
  ],
  exports:[]
})
export class EmpModule { }
