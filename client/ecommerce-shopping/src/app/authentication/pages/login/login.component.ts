import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthenticationApiService} from "../../../shared/https/authentication-api.service";
import {takeUntil} from "rxjs/operators";
import {SnackbarService} from "../../../shared/components/snackbar/snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup: FormGroup;

  private destroyed$ = new Subject();

  constructor(
    private authenticationService: AuthenticationApiService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.initialForms();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  login() {
    const {username, password} = this.loginFormGroup.value;

    const auth$ = this.authenticationService.login(username, password)
      .pipe(takeUntil(this.destroyed$));
    auth$.subscribe((res: {accessToken: string}) => {
      this.snackbarService.showSuccess('Đăng nhập thành công');
      localStorage.setItem('access_token', res.accessToken);
      this.router.navigateByUrl('/home').then();
    }, (err) => {
      this.snackbarService.showError('Tài khoản hoặc mật khẩu không chính xác');
    });
  }

  private initialForms() {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
