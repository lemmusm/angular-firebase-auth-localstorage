import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
// Services
import {AuthService} from './services/auth.service';
//Routes
import {APP_ROUTING} from './app.routes';
// AngularMaterial
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    APP_ROUTING,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
