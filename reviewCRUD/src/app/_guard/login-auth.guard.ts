import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from '../_services/login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate, CanActivateChild {
  isAuthenticated: boolean = true;

  constructor(private router: Router, private authService: LoginAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isAuthenticated = this.authService.getAuthStatus() == 'true' ? true : false;
      if(!this.isAuthenticated) {
        this.router.navigateByUrl('/login');
      }
      return this.isAuthenticated;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.isAuthenticated = this.authService.getAuthStatus() == 'true' ? true : false;
    if(!this.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    return this.isAuthenticated;
  }
}
