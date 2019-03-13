import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  public isLoggedIn: Boolean;
  userdata: User;

  constructor(private _loginAuthService: AuthService, private router: Router) {
    this._loginAuthService.afAuth.authState.subscribe(auth => {
      if (auth == null) {
        console.log('Logged out');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    ***REMOVED*** else {
        this.isLoggedIn = true;
        this.userdata = auth;
        this.router.navigate(['/dashboard']);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  ngOnInit() {}

  logout() {
    this._loginAuthService.logout();
    this.router.navigate(['login']);
***REMOVED***
}
