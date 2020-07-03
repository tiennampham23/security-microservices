import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from './authentication.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SnackbarModule} from '@drop-shipping/shared/ui-common/public-api';


@NgModule({
  declarations: [AuthenticationComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule.forChild(),
    MatCheckboxModule,
    SnackbarModule
  ]
})
export class AuthenticationModule {
}
