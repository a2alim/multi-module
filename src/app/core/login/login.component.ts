import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.authService.obtainAccessToken(this.user);
  }

}
