import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {compareTwoFormControl} from '@drop-shipping/core/utils/helper.utils';
import {UserService} from '@drop-shipping/shared/https/public-api';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';
import {Subscription} from 'rxjs';
const logger = new Logger('UserBusinessComponent');
@Component({
  selector: 'app-user-business',
  templateUrl: './user-business.component.html',
  styleUrls: ['./user-business.component.scss']
})
export class UserBusinessComponent implements OnInit, OnDestroy {
  viewLoading = false;
  hasFormErrors = false;
  userFormGroup: FormGroup;
  user: UserModel;
  type: string;
  private subscriptions: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<UserBusinessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: UserModel,
      type: string
    },
    private fb: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.user = data.user;
    this.type = data.type;
    this.initialForm();
  }

  ngOnInit(): void {
    this.setValuesForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.userFormGroup.controls;
    if (this.userFormGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }
    const { username, password, rePassword, email, phone, name } = this.userFormGroup.value;
    const user = {
      username,
      password,
      rePassword,
      email,
      phone: `0${phone}`,
      name
    };

    if (this.type === 'CREATE') {
      this.onCreateChildUser(user);
    } else if (this.type === 'UPDATE') {
      this.onUpdateChildUser(user);
    }
  }

  getTitle() {
    if (this.type === 'CREATE') {
      return `Tạo mới người dùng cấp 2`;
    }
    if (this.type === 'UPDATE') {
      return `Cập nhập thông tin của người dùng: ${this.user.name}`;
    }
  }

  onAlertClose($event: boolean) {

  }

  private initialForm() {
    this.userFormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required]],
    }, {
      validators: compareTwoFormControl('password', 'rePassword')
    });
  }

  private setValuesForm() {
    if (this.user) {
      this.userFormGroup.patchValue({
        username: this.user.username,
        password: this.user.password,
        rePassword: this.user.password,
        email: this.user.email,
        phone: this.user.phone,
        name: this.user.name
      });
    }
  }

  private onUpdateChildUser(user) {
    const userId = this.user.id;
    const updateUserSubscription = this.userService.updateChildUser(userId, user).subscribe((res) => {
      if (res) {
        this.snackbarService.showSuccess(`Cập nhập thông tin người dùng ${this.user.name} thành công`);
        this.dialogRef.close({
          status: true
        });
      }
    }, error => {
      this.snackbarService.showError(`Cập nhập thông tin người dùng ${this.user.name} thất bại`);
      this.dialogRef.close({
        status: true
      });
    });
    this.subscriptions.push(updateUserSubscription);
  }

  private onCreateChildUser(user) {
    const createUserSubscription = this.userService.createChildUser(user).subscribe((res) => {
      if (res) {
        this.snackbarService.showSuccess(`Thêm mới người dùng thành công`);
        this.dialogRef.close({
          status: true
        });
      }
    }, error => {
      this.snackbarService.showError(`Thêm mới người dùng thất bại`);
      this.dialogRef.close({
        status: true
      });
    });
    this.subscriptions.push(createUserSubscription);
  }
}
