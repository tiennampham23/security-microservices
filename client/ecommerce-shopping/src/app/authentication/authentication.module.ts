import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './pages/login/login.component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {SnackbarModule} from "../shared/components/snackbar/snackbar.module";



@NgModule({
  declarations: [AuthenticationComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    SnackbarModule,
  ]
})
export class AuthenticationModule { }
