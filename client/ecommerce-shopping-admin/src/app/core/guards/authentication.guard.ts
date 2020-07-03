import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthenticationService} from '@drop-shipping/shared/https/public-api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authenticationService.isAuthenticated;
    if (isAuthenticated) {
      return of(true);
    }
    this.router.navigate(['/auth'], {
      queryParams: {redirect: state.url},
      replaceUrl: true
    }).then();
    return of(true);
  }

}
