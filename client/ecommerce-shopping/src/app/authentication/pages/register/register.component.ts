import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {UserService} from "../../../shared/https/user.service";
import {takeUntil} from "rxjs/operators";
import {SnackbarService} from "../../../shared/components/snackbar/snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;

  private destroyed$ = new Subject();
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  register() {
    console.log(this.registerFormGroup.value)
    const body = this.registerFormGroup.value;
    const register$ = this.userService.register(body).pipe(takeUntil(this.destroyed$));
    register$.subscribe((res) => {
      if (res) {
        this.snackbarService.showSuccess('Đăng ký tài khoản thành công');
        this.router.navigateByUrl('/auth/login').then()
      }
    }, () => {
      this.snackbarService.showError('Đăng ký tài khoản thất bại')
    })
  }

  private initialForm() {
    this.registerFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      fullName: ['', Validators.required],
    })
  }
}
