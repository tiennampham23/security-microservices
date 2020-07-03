import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {compareTwoFormControl} from '@drop-shipping/core/utils/helper.utils';
import {UserService} from '@drop-shipping/shared/https/public-api';
import {catchError, takeUntil} from 'rxjs/operators';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';
import {Logger} from '@drop-shipping/core/logger/public-api';
const logger = new Logger('ChangePasswordComponent');
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  changePasswordForm: FormGroup;

  private unsubscribe: Subject<any> = new Subject<any>();
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onChangePassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    const { oldPassword, newPassword, reNewPassword } = this.changePasswordForm.value;
    const changePassword$ = this.userService.changePassword({
      newPassword,
      oldPassword,
      reNewPassword
    }).pipe(takeUntil(this.unsubscribe));
    changePassword$.subscribe(() => {
      this.snackbarService.showSuccess(`Đổi mật khẩu thành công`);
    }, (error => {
      logger.debug(error);
      this.snackbarService.showError(`Đổi mật khẩu thất bại, vui lòng thao tác lại`);
    }));
  }

  private initialForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      reNewPassword: ['', [Validators.required]],
    }, {
      validators: compareTwoFormControl('newPassword', 'reNewPassword')
    });
  }
}
