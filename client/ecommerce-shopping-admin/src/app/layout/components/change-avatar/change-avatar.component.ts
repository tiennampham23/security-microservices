import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserModel} from '@drop-shipping/shared/data-transform-objects/user.model';
import {UserService} from '@drop-shipping/shared/https/public-api';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SnackbarService} from '@drop-shipping/shared/ui-common/snackbar/snackbar.service';
import {Logger} from '@drop-shipping/core/logger/public-api';

const logger = new Logger('ChangeAvatarComponent');
@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnDestroy {
  viewLoading: false;
  previewImage: string | ArrayBuffer;
  avatar: File;
  private readonly unsubscribe: Subject<any> = new Subject<any>();
  constructor(
    public dialogRef: MatDialogRef<ChangeAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      currentUser: UserModel,
    },
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.previewImage = data.currentUser.avatar;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onChangeAvatar(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => (this.previewImage = reader.result);
      this.avatar = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    if (this.previewImage === this.data.currentUser.avatar) {
      return;
    }

    const changeAvatar$ = this.userService.changeAvatar({
      avatar: this.avatar
    }).pipe(takeUntil(this.unsubscribe));
    changeAvatar$.subscribe(() => {
      this.snackbarService.showSuccess(`Cập nhập ảnh đại diện thành công`);
      this.dialogRef.close(true);
    }, error => {
      logger.debug(error);
      this.snackbarService.showError(`Cập nhập ảnh đại diên thất bại`);
      this.dialogRef.close(false);
    });

  }

  getAvatarUrl() {
    return {
      'background-image': 'url(' + this.previewImage + ')'
    };
  }
}
