import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '@drop-shipping/shared/https/public-api';
import {Subject} from 'rxjs';
import {NotificationDataSource} from '@drop-shipping/shared/data-sources/notification.datasource';
import {SelectionModel} from '@angular/cdk/collections';
import {NotificationModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {distinctUntilChanged, skip, take, takeUntil} from 'rxjs/operators';
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Logger} from "@drop-shipping/core/logger/public-api";
import {SnackbarService} from "@drop-shipping/shared/ui-common/snackbar/snackbar.service";
import {Router} from "@angular/router";

const logger = new Logger('NotificationListComponent');
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit, OnDestroy {
  dataSource: NotificationDataSource;

  notificationFormGroup: FormGroup;

  filterNotifications: {
    page: string,
    size: string,
    _keyword: string,
    active: number
  } = {
    page: '1',
    size: '20',
    _keyword: null,
    active: null
  };

  displayedColumns = [
    'select',
    'id',
    'title',
    'createdAt',
    'status',
    'actions'
  ];

  listStatus = [
    {
      name: 'Huỷ kích hoạt',
      value: 0
    },
    {
      name: 'Kích hoạt',
      value: 1
    },
  ];

  notifications: NotificationModel[];
  selection = new SelectionModel<NotificationModel>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private snackbarService: SnackbarService
  ) {
    this.initialForms();
  }

  ngOnInit(): void {
    this.dataSource = new NotificationDataSource(this.notificationService);
    this.loadMyNotifications(this.filterNotifications);
    this.subscribePaginator();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private loadMyNotifications(filter: {
    page: string,
    size: string,
    active: number,
    _keyword: string
  }) {
    logger.debug(filter);
    this.dataSource.loadMyNotifications(filter);
    const entitiesSubscription$ = this.dataSource.entitiesSubject.pipe(
      skip(1),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe)
    );
    entitiesSubscription$.subscribe(res => {
      this.notifications = res;
    });
    this.selection.clear();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.notifications.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.notifications.forEach(row => this.selection.select(row));
    }
  }

  onChangeStatus(notification: NotificationModel) {
    if (notification.active === 0) {
      const active$ = this.notificationService.activeNotification(notification.id)
        .pipe(takeUntil(this.unsubscribe));
      active$.subscribe(() => {
        this.resetFilterCondition();
        this.loadMyNotifications(this.filterNotifications);
        this.snackbarService.showSuccess(`Kích hoạt thông báo thành công`);
      }, () => {
        this.snackbarService.showError(`Kích hoạt thông báo thất bại`);
      });
    } else if (notification.active === 1) {
      const inactive$ = this.notificationService.inActiveNotification(notification.id)
        .pipe(takeUntil(this.unsubscribe));
      inactive$.subscribe(() => {
        this.resetFilterCondition();
        this.loadMyNotifications(this.filterNotifications);
        this.snackbarService.showSuccess(`Huỷ kích hoạt thông báo thành công`);
      }, () => {
        this.snackbarService.showError(`Huỷ ích hoạt thông báo thất bại`);
      });
    }
  }

  onSearchNotification() {
    this.filterNotifications.active = this.notificationFormGroup.controls.active.value;
    this.filterNotifications._keyword = this.notificationFormGroup.controls.keywords.value;
    this.filterNotifications.page = '1';
    this.filterNotifications.size = '20';
    this.loadMyNotifications(this.filterNotifications);
  }

  onUpdateNotification(notification: NotificationModel) {
    return this.router.navigateByUrl(`/notification/update/${notification.id}`);
  }

  private subscribePaginator() {
    this.paginator.page.pipe(takeUntil(this.unsubscribe)).subscribe(($event) => {
      this.filterNotifications.page = ($event.pageIndex + 1).toString();
      this.loadMyNotifications(this.filterNotifications);
    });
  }

  private initialForms() {
    this.notificationFormGroup = this.formBuilder.group({
      active: [],
      keywords: ['']
    });
  }

  private resetFilterCondition() {
    this.filterNotifications.page = '1';
    this.filterNotifications.size = '20';
    this.filterNotifications._keyword = null;
    this.filterNotifications.active = null;
  }
}
