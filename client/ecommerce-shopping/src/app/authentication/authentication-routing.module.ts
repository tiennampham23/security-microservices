import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationComponent} from "./authentication.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          returnUrl: window.location.pathname
        }
      },
    ]

  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule { }
