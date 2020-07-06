import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {of, Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationApiService, AuthenticationService} from '@drop-shipping/shared/https/public-api';
import {catchError, finalize, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {Credentials, LoginResponse} from '@drop-shipping/shared/data-transform-objects/public-api';
import {SnackbarService} from '@drop-shipping/shared/ui-common/public-api';


const logger = new Logger('LoginComponent');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  errors: any = [];


  private readonly unsubscribe: Subject<any>;

  private returnUrl: any;

  constructor(
    private router: Router,
    private authenticationApiService: AuthenticationApiService,
    private authLogicService: AuthenticationService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.initLoginForm();

    // redirect back to the returnUrl before login
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl || '/';
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(320)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      rememberMe: [false, [Validators.required]]
    });
  }

  submit() {
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    const authData = {
      userName: controls.userName.value,
      password: controls.password.value,
      rememberMe: controls.rememberMe.value
    };
    const auth$ = this.authenticationApiService
      .login(authData.userName, authData.password)
      .pipe(
        tap((response) => logger.debug(response)),
        switchMap((response: LoginResponse) => {
          const credential = {
            userName: controls.userName.value,
            token: response.accessToken
          } as Credentials;
          return of(credential);
        }),
        catchError(err => {
          logger.debug(err);
          this.snackbarService.showError(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'));
          return of(null);
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      );
    auth$.subscribe((credentials: Credentials) => {
      if (credentials) {
        this.snackbarService.showSuccess(this.translate.instant('AUTH.VALIDATION.VALID_LOGIN'));
        this.authLogicService.login(credentials, controls.rememberMe.value);
        return this.router.navigateByUrl('/');
      }
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    return control.hasError(validationType) && (control.dirty || control.touched);
  }

}
