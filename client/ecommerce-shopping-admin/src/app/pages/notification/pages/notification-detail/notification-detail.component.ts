import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "@drop-shipping/shared/https/public-api";
import {NotificationModel} from "@drop-shipping/shared/data-transform-objects/public-api";
import {BehaviorSubject, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Logger} from "@drop-shipping/core/logger/public-api";

const logger = new Logger('NotificationDetailComponent');
@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit, OnDestroy {
  notificationId: string;
  notification: NotificationModel;

  loading$ = new BehaviorSubject(false);

  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (this.notificationId !== params.id) {
        this.notificationId = params.id;
        this.loadNotificationById(this.notificationId);
      }
    });
  }

  ngOnInit(): void {
    this.readNotification();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadNotificationById(notificationId: string) {
    const notification$ = this.notificationService.loadNotificationById(notificationId)
      .pipe(takeUntil(this.unsubscribe));

    notification$.subscribe((res: NotificationModel) => {
      this.notification = res;
      setTimeout(() => {
        this.loading$.next(false);
      }, 2000);
    });
  }

  getComponentTitle() {
    return `Chi tiết thông báo`;
  }

  private readNotification() {
    const read$ = this.notificationService.readNotifications({ notificationId: [this.notificationId]})
      .pipe(takeUntil(this.unsubscribe));
    read$.subscribe(() => {
      logger.debug(`Read notification ${this.notificationId} successfully`);
    });

  }
}
