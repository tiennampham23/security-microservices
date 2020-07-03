import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "@drop-shipping/shared/https/authentication.service";
import {Logger} from "@drop-shipping/core/logger/public-api";
import {filter} from "rxjs/operators";

const logger = new Logger('AuthorizationGuard');

@Injectable({
  providedIn: 'root',

})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.authService.currentUser.pipe(filter(user => !!user)).subscribe((user) => {
      const canActive = !(user.active === 0 || new Date(user.expiredDate) < new Date());
      if (!canActive) {
        this.router.navigate(['dashboard']).then();
      }
      return canActive;
    });
    return true;
  }

}
