import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/service/auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('hello emp!');
    
  }

  onLogout(){
    this.authService.logout();
  }

}
