import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationApiService, UserService} from '@drop-shipping/shared/https/public-api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize, takeUntil} from 'rxjs/operators';
import {UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {Observable, of, Subject} from 'rxjs';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {Router} from '@angular/router';
const logger = new Logger('ChangeProfileComponent');
@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.scss']
})
export class ChangeProfileComponent implements OnInit, OnDestroy {
  userProfileFormGroup: FormGroup;
  currentUser: UserModel;
  loading$: Observable<boolean>;
  private readonly unsubscribe = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationApiService,
    private snackbarService: SnackbarService
  ) {
    this.initialForm();
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  changeProfile() {
    if (this.userProfileFormGroup.invalid) {
      return;
    }
    this.loading$ = of(true);
    const changeProfile$ = this.userService.changeProfile(this.userProfileFormGroup.value)
      .pipe(takeUntil(this.unsubscribe), finalize(() => this.loading$ = of(false)));
    changeProfile$.subscribe(() => {
      this.snackbarService.showSuccess(`Cập nhập thông tin thành công`);
      return this.router.navigateByUrl('/dashboard');
    }, error => {
      logger.debug(error);
      this.snackbarService.showError(`Cập nhập thông tin thất bại`);
    });
  }

  private initialForm() {
    this.userProfileFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required]],
    });
  }

  private loadCurrentUser() {
    const currentUser$ = this.authenticationService.loadCurrentUser().pipe(takeUntil(this.unsubscribe));
    currentUser$.subscribe((res) => {
      this.currentUser = res;
      if (this.currentUser) {
        this.setValuesForm(this.currentUser);
      }
    });
  }

  private setValuesForm(user: UserModel) {
    this.userProfileFormGroup.patchValue({
      email: user.email,
      phone: user.phone,
      name: user.name,
    });
  }
}
