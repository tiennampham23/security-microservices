import {Component, Inject, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@drop-shipping/shared/https/user.service';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';
import {compareTwoFormControl} from '@drop-shipping/core/utils/helper.utils';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {Logger} from '@drop-shipping/core/logger/public-api';

const logger = new Logger('ChangePasswordUserComponent');
@Component({
  selector: 'app-change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.scss']
})
export class ChangePasswordUserComponent implements OnDestroy {
  changeFormGroup: FormGroup;
  user: UserModel;
  viewLoading = false;


  unsubscribe: Subject<any> = new Subject<any>();
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: UserModel,
    },
    private fb: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.initialForm();
    this.user = data.user;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getTitle() {
    return `Cập nhập mật khẩu cho người dùng ${this.user.name}`;
  }

  onSubmit() {
    if (this.changeFormGroup.invalid) {
      return;
    }
    this.viewLoading = true;
    const changePasswordChildUser$ = this.userService.changePasswordChildUser(this.user.id, this.changeFormGroup.value)
      .pipe(takeUntil(this.unsubscribe), finalize(() => this.viewLoading = false));
    changePasswordChildUser$.subscribe(() => {
      this.snackbarService.showSuccess(`Đổi mật khẩu cho người dùng ${this.user.name} thành công`);
      this.dialogRef.close();
    }, (err) => {
      logger.debug(err);
      this.snackbarService.showError(`Đổi mật khẩu cho người dùng ${this.user.name} thất bại`);
      this.dialogRef.close();
    });
  }

  private initialForm() {
    this.changeFormGroup = this.fb.group({
        password: ['', [Validators.required]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: compareTwoFormControl('password', 'rePassword')
      });
  }
}
