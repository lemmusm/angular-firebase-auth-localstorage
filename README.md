# Angular firebase authentication

## Steps for create project

### 1.- Create Angular project

`ng new project-name --routing --style=scss`

### 2.- Connect Firebase to Angular

Create project firebase on 👉 [Firebase console](https://console.firebase.google.com), once you have created the firebase project you will be redirected to the following screen:

![Alt text](https://s3-us-west-2.amazonaws.com/angular-templates/tutorials/firebase-authentication-with-angular/firebase-console.png 'Firebase console')

### 3.- Configure environment

Add credentials in our Angular project configuration file `environment.ts` located in `src/environments/environment.ts`

```
***REMOVED***
***REMOVED***
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID"
***REMOVED***
***REMOVED***
```

### 4.- Install dependencies

Install bootstrap, jquery and popper.js

`npm install bootstrap jquery popper.js --save`

Configure angular.json, add styles and scripts

```
"styles": [
"./node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
"./node_modules/jquery/dist/jquery.min.js",
"./node_modules/popper.js/dist/umd/popper.js",
"./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

### 5.- Install AngularFire and Firebase

`npm install firebase @angular/fire --save`

### 6.- Imports on app.module.ts

```
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ]
})
```

### 7.- Create interface called User

`ng g i User`

```
export interface User {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}
```

### 8.- Create service

`ng g s providers/auth --skipTests`

In the auth.service.ts file, import AngularFireAuth, firebase and Observable. Create an observable user variable, inject FirebaseAuth in the constructor and create sign in methods.

```
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
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

      //setCustomParameters host domain (hd)

      /**

        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.setCustomParameters({
          'hd':'domain.edu.mx'
      ***REMOVED***);
        this.afAuth.auth.signInWithPopup(provider)
        .then((data)=>{
          this.router.navigate(['/dashboard']);
      ***REMOVED***)
        .catch((error)=>{
          console.log(error)
      ***REMOVED***);

      **/

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
```

### 9.- Create login component

`ng g c components/login --skipTests --inlineStyle`

In the button we add `ngClick` directive with the method `loginWithGoogle()`

login.component.html

```
<div class="container mt-5">
  <div class="row mt-5">
    <div class="col-md-12 text-center">
      Firebase Authentication with Angular
    </div>
  </div>
  <div class="row mt-5">
    <div class="col-md-12 text-center">
      <button type="button" class="btn btn-primary" (click)="loginWithGoogle()">
        <i class="fab fa-google"></i>
      </button>
    </div>
  </div>
</div>
```

login.component.ts

Import service and injects on constructor

```
import { AuthService } from '../../services/auth.service';

constructor(private _authservice: AuthService) {}
```

Create method `loginWithGoogle()` and through the injected service we call the method created on the service.

```
loginWithGoogle() {
    this.authservice.loginWithGoogle();
***REMOVED***
```

### 10.- Create dashboard component

`ng g c components/dashboard --skipTests --inlineStyle`

dashboard.component.hml

With `userdata` variable call properties from interface, in this case `displayName, email, uid and photoURL`, remember that the `userdata` of type UserData stores the data that is brought from the firebase service.

The button call method `logout()` with the `ngClick` directive for close session.

```
<div class="container mt-5">
  <div class="row mt-5">
    <div class="col-md-12 text-center">
      <h2>Data from service authentication</h2>
    </div>
  </div>
  <div class="row mt-5 justify-content-center">
    <div class="card" style="width: 20rem;">
      <img
        class="card-img-top"
        src="{{ userdata.photoURL }}"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">
          <strong>{{ userdata.displayName }}</strong>
        </h5>
        <p class="card-text">{{ userdata.email }}</p>
        <p class="card-text"><strong>UID:</strong> {{ userdata.uid }}</p>
        <a href="#" class="btn btn-danger" (click)="logout()">
          <i class="fas fa-sign-out-alt"></i> Logout
        </a>
      </div>
    </div>
  </div>
</div>
```

dashboard.component.ts

Create variable of User type and assigns empty value to the properties

```
userdata: User = {
    displayName: '',
    email: '',
    uid: '',
    photoURL: ''
***REMOVED***;
```

In constructor injects the service and router and subscribe to the authentication state, userdara variable saves the data from firebase authentication. This verify if user is logged.

```
constructor(private _authservice: AuthService, private router: Router){
    this._authservice.afAuth.authState.subscribe(auth => {
      if (auth === null) {
        this.router.navigate(['/login']);
    ***REMOVED*** else {
        this.userdata = auth;
        this.router.navigate(['/dashboard']);
    ***REMOVED***
  ***REMOVED***);
}
```

Now, create method `logout()` to close session.

```
logout() {
    this._authservice.logout();
    console.log('Logged out');
}
```

### 11.- Create routes on `app.routing.module.ts`

```
const APP_ROUTES: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];
```

Enable `HashLocationStrategy` with `{useHash: true}`

```
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
```

### Finish!!! Run the project

`ng serve --o`

### Preview screenshots

![Alt text](https://i.imgur.com/7YUZtfa.png 'Login Component')

![Alt text](https://pbs.twimg.com/media/DJDyjYeUMAAAZdC.jpg 'Credentials')

![Alt text](https://i.imgur.com/juEbNfP.png 'Dashboard Component')
