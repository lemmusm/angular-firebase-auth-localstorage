import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  private isLoggedIn: Boolean;
  private user_displayName: string;
  private user_email: string;
  private user_photo: string;

  constructor(private _loginAuthService:AuthService, private router:Router) {

    this._loginAuthService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Logged out");
          this.isLoggedIn = false;
          this.user_displayName = '';
          this.user_email = '';
          this.router.navigate(['/login']);
      ***REMOVED*** else {
          this.isLoggedIn = true;
          this.user_displayName = auth.displayName;
          this.user_email = auth.email;
          this.user_photo = auth.photoURL;
          console.log("Logged in");
          console.log(auth);
          this.router.navigate(['/dashboard']);
      ***REMOVED***
    ***REMOVED***
    );

 ***REMOVED***

  ngOnInit() {
***REMOVED***

  logout() {
    this._loginAuthService.logout();
    this.router.navigate(['login']);
***REMOVED***

}
