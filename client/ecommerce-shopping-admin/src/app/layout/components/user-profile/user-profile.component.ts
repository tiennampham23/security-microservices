import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ELocalStorage} from '@drop-shipping/core/constants/public-api';
import {AuthenticationApiService, AuthenticationService} from '@drop-shipping/shared/https/public-api';
import {UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ChangeAvatarComponent} from '../change-avatar/change-avatar.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  currentUser: UserModel;

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;

  private readonly unsubscribe: Subject<any>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationApiService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
  ) {
    this.unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

  logout() {
    localStorage.removeItem(ELocalStorage.CURRENT_USER);
    return this.router.navigateByUrl('/auth/login');
  }


  private loadCurrentUser() {
    const currentUser$ = this.authenticationService.loadCurrentUser().pipe(takeUntil(this.unsubscribe));
    currentUser$.subscribe((res) => {
      this.currentUser = res;
      this.authService.changeCurrentUser(res);
    });
  }
}
