import { Injectable } from '@angular/core';
import {MatSnackbarData, MatSnackbarType} from './snackbar.model';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';

@Injectable()
export class SnackbarService {
  readonly type: MatSnackbarType = {
    information: 'information',
    success: 'success',
    warning: 'warning',
    error: 'error'
  };

  constructor(private snackBarService: MatSnackBar) {
  }

  showInfo(message?: string) {
    return this.open(message, this.type.information);
  }

  showSuccess(message?: string) {
    return this.open(message, this.type.success);
  }

  showError(message?: string) {
    return this.open(message, this.type.error);
  }

  showWarning(message?: string) {
    return this.open(message, this.type.warning);
  }

  private open(message: string, messageType = '') {
    const matSnackData: MatSnackbarData = {
      content: message,
      type: messageType
    };
    const configSuccess: MatSnackBarConfig = {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snack-bar-message', this.type.information]
    };

    if (messageType) {
      configSuccess.panelClass = ['snack-bar-message', messageType];
    }

    return this.snackBarService
      .openFromComponent(SnackbarComponent, {
        data: matSnackData,
        ...configSuccess
      })
      .afterDismissed();
  }
}
