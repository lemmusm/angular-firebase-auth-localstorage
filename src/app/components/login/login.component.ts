import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  constructor(private _loginAuthService: AuthService) {}

  ngOnInit() {}

  loginWithGoogle() {
    this._loginAuthService.loginWithGoogle();
  }
}
