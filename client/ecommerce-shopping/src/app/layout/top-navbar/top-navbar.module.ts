import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [TopNavbarComponent],
  exports: [
    TopNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TopNavbarModule { }
