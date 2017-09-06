import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    user: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth, private router:Router) {
      this.user = afAuth.authState;
      this.afAuth.authState.subscribe(auth => {
          if(auth) {
            this.router.navigate(['/dashboard']);
              console.log('You are authenticated', auth)
        ***REMOVED*** else {
              console.log('You are not authenticated')
        ***REMOVED***

    ***REMOVED***);
  ***REMOVED***

    loginWithGoogle() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data)=>{
        this.router.navigate(['/dashboard']);
    ***REMOVED***)
      .catch((error)=>{
        console.log(error)
    ***REMOVED***);
  ***REMOVED***

    logout() {
      this.afAuth.auth.signOut()
      .then(()=>{
        this.router.navigate(['/login']);
    ***REMOVED***);
  ***REMOVED***
}
