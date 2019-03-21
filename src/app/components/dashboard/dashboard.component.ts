import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(
    private _authservice: AuthService,
    public userservice: UserService
  ) {
    this.userservice.getUserLoggedIn(); // Bring user data from local storage
  }

  ngOnInit() {}

  logout() {
    this._authservice.logout();
    console.log('Logged out');
  }
}
