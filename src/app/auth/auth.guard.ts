import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
/**
 * This will guard users from accessing certain pages without authentication. If not authenticated then
 * you get redirected to the '/auth/login'.
 */
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth(); // Checks if user is authenticated
    if (!isAuth) {
      this.router.navigate(['/auth/login']); // if not authenticated then user gets navigated to login page
    }
    return isAuth;
  }
}
