import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnackbarComponent} from './snackbar.component';
import {SnackbarService} from './snackbar.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [SnackbarComponent],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    SnackbarService
  ]
})
export class SnackbarModule {
}
