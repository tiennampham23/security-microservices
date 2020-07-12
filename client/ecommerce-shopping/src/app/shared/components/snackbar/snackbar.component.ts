import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatSnackbarData} from './snackbar.model';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: MatSnackbarData
  ) {
    console.log(data);
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }

  onAfterDismiss() {
    this.snackBarRef.afterDismissed().subscribe();
  }

}
