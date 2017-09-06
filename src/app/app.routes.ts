import { RouterModule, Routes } from '@angular/router';
// Components
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
