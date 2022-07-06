import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './students/dashboard/dashboard.component';
import { LoginAuthGuard } from './_guard/login-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: window.localStorage.getItem('isAuthenticated') == 'true' ? '/students/dashboard' : '/login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'students', canActivate: [LoginAuthGuard], canActivateChild: [LoginAuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
