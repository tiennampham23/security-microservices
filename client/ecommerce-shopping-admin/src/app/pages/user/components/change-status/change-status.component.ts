import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '@drop-shipping/shared/https/public-api';
import {Subscription} from 'rxjs';
import {UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnDestroy {
  viewLoading = false;
  type: string;
  user: UserModel;

  subscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<ChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      description: string,
      status: string,
      user: UserModel
    },
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.type = data.status;
    this.user = data.user;
  }

  ngOnDestroy() {
    this.subscription.forEach(sb => sb.unsubscribe());
  }

  onYesClick() {
    this.viewLoading = true;
    if (this.type === 'OPEN') {
      const unBlockSubscription = this.userService.unBlockUserLv2(this.user.id).subscribe(
        (res) => {
          this.snackbarService.showSuccess(`Mở khóa tài khoản ${this.user.name} thành công`);
          this.viewLoading = false;
          this.dialogRef.close({
            status: true
          });
        },
        (err) => {
          this.snackbarService.showError(`Mở khóa tài khoản ${this.user.name} thất bại`);
          this.viewLoading = false;
          this.dialogRef.close({
            status: false
          });
        }
      );
      this.subscription.push(unBlockSubscription);
    } else if (this.type === 'BLOCK') {
      const blockSubscription = this.userService.blockUserLv2(this.user.id).subscribe(
        (res) => {
          this.snackbarService.showSuccess(`Khóa tài khoản ${this.user.name} thành công`);
          this.viewLoading = false;
          this.dialogRef.close({
            status: true
          });
        },
        (err) => {
          this.snackbarService.showError(`Khóa tài khoản ${this.user.name} thất bại`);
          this.viewLoading = false;
          this.dialogRef.close({
            status: false
          });
        }
      );
      this.subscription.push(blockSubscription);
    }
  }
}
