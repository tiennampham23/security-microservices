import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CartModel} from "../../shared/models/cart.model";
import {UserModel} from "../../shared/dtos/user.model";
import {CartService} from "../../shared/singleton-services/cart.service";
import {UserService} from "../../shared/https/user.service";
import {takeUntil} from "rxjs/operators";
import {ResponseHttp} from "../../shared/models/response-http.model";
import {ShareService} from "../../shared/singleton-services/share.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit, OnDestroy {
  public cartObs: Observable<any>;

  cart: CartModel;

  currentUser: string;

  private destroyed$ = new Subject();
  constructor(
    private cartService: CartService,
    private userService: UserService,
    private shareService: ShareService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cartObs = this.cartService.get();
    this.cartObs.subscribe((result) => {
      this.cart = result;
    });

    if (localStorage.getItem('access_token')) {
      this.getCurrentUser();
    }

    this.shareService.currentUserStream$.subscribe((user: string) => {
      if (this.currentUser === undefined) {
        this.currentUser = user;
      }
      if (user === undefined) {
        this.currentUser = undefined;
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getCurrentUser() {
    this.userService.loadCurrentUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: ResponseHttp<string>) => {
        if (res.code === 200) {
          this.shareService.broadcastCurrentUserChange(res.data);
          localStorage.setItem('current_user', JSON.stringify(res.data));
        }
      });
  }

  logout() {
    localStorage.removeItem('current_user');
    this.shareService.broadcastCurrentUserChange(undefined);
    return this.router.navigate(['/home']);
  }


}
