import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplashScreenComponent} from './splash-screen.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [SplashScreenComponent],
  exports: [
    SplashScreenComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class SplashScreenModule { }
