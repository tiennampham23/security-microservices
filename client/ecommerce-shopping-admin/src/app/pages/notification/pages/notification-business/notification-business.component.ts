import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Logger} from "@drop-shipping/core/logger/public-api";
import {NotificationService, UploadImageService} from "@drop-shipping/shared/https/public-api";
import {takeUntil} from "rxjs/operators";
import {SnackbarService} from "@drop-shipping/shared/ui-common/snackbar/snackbar.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationModel} from "@drop-shipping/shared/data-transform-objects/public-api";

const logger = new Logger('NotificationBusinessComponent');

@Component({
  selector: 'app-notification-business',
  templateUrl: './notification-business.component.html',
  styleUrls: ['./notification-business.component.scss']
})
export class NotificationBusinessComponent implements OnInit, OnDestroy {
  notificationId: string;
  notification: NotificationModel;
  notificationFormGroup: FormGroup;
  quillEditorRef: any;

  loading$ = new BehaviorSubject(false);
  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private uploadImageService: UploadImageService,
    private notificationService: NotificationService,
    private snackbarService: SnackbarService
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (this.notificationId !== params.id) {
        this.notificationId = params.id;
        this.loadNotificationById(this.notificationId);
      }
    });
    this.initialForms();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getComponentTitle() {
    if (this.notificationId) {
      return 'Cập nhập thông báo';
    } else {
      return 'Tạo mới thông báo';
    }
  }

  onSaveNotification() {
    const {content, title, id} = this.notificationFormGroup.value;
    if (this.notificationId) {
      const editNotification$ = this.notificationService.updateNotificationContent(id, {
        content,
        title
      })
        .pipe(takeUntil(this.unsubscribe));
      editNotification$.subscribe(() => {
        this.snackbarService.showSuccess(`Cập nhập thông báo thành công`);
      }, () => {
        this.snackbarService.showError(`Cập nhập thông báo thất bại`);
      });
    } else {
      const saveNotification$ = this.notificationService.createNotification({content, title})
        .pipe(takeUntil(this.unsubscribe));
      saveNotification$.subscribe(() => {
        this.snackbarService.showSuccess(`Tạo thông báo thành công`);
      }, () => {
        this.snackbarService.showError(`Tạo thông báo thất bại`);
      });
    }
  }

  uploadImageToServer($event) {
    if ($event.target.files && $event.target.files[0]) {
      const image = $event.target.files[0];
      this.uploadImageService.uploadImage({image}).pipe(takeUntil(this.unsubscribe))
        .subscribe((res: { path: string }) => {
          const path = res.path;
          const image = `<img class="img-within" src="${path}" alt="image"/>`
          const range = this.quillEditorRef.getSelection();
          // this.quillEditorRef.clipboard.dangerouslyPasteHTML(range.index, image);
          this.quillEditorRef.insertEmbed(range.index, 'image', path, 'user');
        });
    }
  }

  onHandlerUploadImage(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    let toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.customUploadImage);
  }

  customUploadImage() {
    const inputRef = document.getElementById('upload-file');
    inputRef.click();
  }

  private loadNotificationById(notificationId: string) {
    const notification$ = this.notificationService.loadNotificationById(notificationId)
      .pipe(takeUntil(this.unsubscribe));

    notification$.subscribe((res: NotificationModel) => {
      this.notification = res;

      if (this.notification) {
        this.setValueForms(this.notification);
      }
      setTimeout(() => {
        this.loading$.next(false);
      }, 2000);
    });
  }

  private setValueForms(notification: NotificationModel) {
    this.notificationFormGroup.patchValue({
      title: notification.title,
      content: notification.content,
      id: notification.id
    });
  }

  private initialForms() {
    this.notificationFormGroup = this.formBuilder.group({
      title: '',
      content: '',
      id: ''
    });
  }
}
