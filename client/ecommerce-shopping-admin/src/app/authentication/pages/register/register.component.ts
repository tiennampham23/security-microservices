import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AuthenticationApiService} from '@drop-shipping/shared/https/authentication-api.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {compareTwoFormControl} from '@drop-shipping/core/utils/helper.utils';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';

const logger = new Logger('RegisterComponent');
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading = false;
  errors: any = [];

  private unsubscribe: Subject<any>;

  constructor(
    private translate: TranslateService,
    private authenticationApiService: AuthenticationApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  submit() {
    const controls = this.registerForm.controls;

    // check form
    if (this.registerForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    if (!controls.agree.value) {
      return;
    }
    const { username, password, rePassword, description, email, phone, name } = this.registerForm.value;
    const user = {
      username,
      password,
      rePassword,
      description,
      email,
      phone: `0${phone}`,
      name
    };

    this.authenticationApiService.register(user).pipe(
      takeUntil(this.unsubscribe),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
    ).subscribe((res) => {
      if (res) {
        this.snackbarService.showSuccess(`Đăng ký tài khoản thành công, vui lòng đăng nhập!`);
        return this.router.navigateByUrl('/auth/login');
      } else {
        this.snackbarService.showError(`Đăng ký tài khoản thất bại, vui lòng đăng ký lại!`);
      }
    });
  }

  private initRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
      description: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      agree: [false, [Validators.required, Validators.pattern('true')]]
    }, {
      validators: compareTwoFormControl('password', 'rePassword')
    });
  }

}
