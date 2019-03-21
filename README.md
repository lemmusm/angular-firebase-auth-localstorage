# Angular firebase authentication with local storage

## Steps for create project

### 1.- Create Angular project

`ng new project-name --routing --style=scss`

### 2.- Connect Firebase to Angular

Create project firebase on 👉 [Firebase console](https://console.firebase.google.com), once you have created the firebase project you will be redirected to the following screen:

![Alt text](https://s3-us-west-2.amazonaws.com/angular-templates/tutorials/firebase-authentication-with-angular/firebase-console.png 'Firebase console')

### 3.- Configure environment

Add credentials in our Angular project configuration file `environment.ts` located in `src/environments/environment.ts`

```
export const environment = {
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID"
  }
};
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

`ng g i interfaces/User`

```
export interface User {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}
```

### 8.- Create user service

`ng g s providers/user --skipTests`

In the user service we create two methods `setUserLoggedIn()` to set the user data when it login, adding it to the localStorage of the browser, and `getUserLoggedIn()` to return the localStorage user.

```
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userLogged: User;

  constructor() {}

  setUserLoggedIn(user: User) {
    this.userLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}

```

### 9.- Create auth service

`ng g s providers/auth --skipTests`

In the auth.service.ts file, import AngularFireAuth, firebase and Observable. Create an observable user variable, inject FirebaseAuth, Router and UserService in the constructor and create sign in methods.

In `getDataFromFirebase()` method will get user data from firebase and saves on user variable. If user is logged into, the user data from firebase is saved on user variable. Once this, we call the `setUserLoggedIn()` method through the `userservice` injected on the contructor and we passed as a parameter the `user` variable.

Option: use `setCustomParameters` to filter login with host domain.

The `loginWithGoogle()` method will do all the logic to start session through firebase.

The `logout()` method will do close session.

```
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public userservice: UserService
  ) {
    this.getDataFromFirebase();
  }

  getDataFromFirebase() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth; // save data firebase on user
        console.log('You are authenticated');
        this.userservice.setUserLoggedIn(this.user); // set user data from firebase on local storage
      } else {
        console.log('You are not authenticated');
      }
    });
  }

  loginWithGoogle() {

    //setCustomParameters host domain (hd)
    /**

  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('email');
  provider.setCustomParameters({
    'hd':'domain.edu.mx'
  });
  this.afAuth.auth.signInWithPopup(provider)
  .then((data)=>{
    this.router.navigate(['/dashboard']);
  })
  .catch((error)=>{
    console.log(error)
  });

      **/

    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

```

### 10.- Create login component

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

`login.component.ts`

Import service and injects on constructor

```
import { AuthService } from '../../services/auth.service';

constructor(private _authservice: AuthService) {}
```

Create method `loginWithGoogle()` and through the injected service we call the method created on the service.

```
loginWithGoogle() {
    this.authservice.loginWithGoogle();
  }
```

### 11.- Create dashboard component

`ng g c components/dashboard --skipTests --inlineStyle`

dashboard.component.hml

With `userservice` injected on the contructor from `UserService`, we call properties from interface, in this case `displayName, email, uid and photoURL`, remember that this data was saved on the localstorage and we call it.

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
        src="{{ userservice.userLogged?.photoURL }}"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">
          <strong>{{ userservice.userLogged?.displayName }}</strong>
        </h5>
        <p class="card-text">{{ userservice.userLogged?.email }}</p>
        <p class="card-text"><strong>UID:</strong> {{ userservice.userLogged?.uid }}</p>
        <a href="#" class="btn btn-danger" (click)="logout()">
          <i class="fas fa-sign-out-alt"></i> Logout
        </a>
      </div>
    </div>
  </div>
</div>
```

`dashboard.component.ts`

In constructor we injects the `AuthService` for logout. `UserService` call it the `getUserLoggedIn()` method for display data from local storage.

```
constructor(
    private _authservice: AuthService,
    public userservice: UserService
  ) {
    this.userservice.getUserLoggedIn(); // Bring user data from local storage
  }
```

`logout()` to close session.

```
logout() {
    this._authservice.logout();
    console.log('Logged out');
}
```

### 12.- Create routes on `app.routing.module.ts`

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

![Alt text](https://i.imgur.com/mLOMuax.png 'Local Storage')
