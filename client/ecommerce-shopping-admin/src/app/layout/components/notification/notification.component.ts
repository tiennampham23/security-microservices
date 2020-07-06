import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NotificationService} from "@drop-shipping/shared/https/public-api";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ResponseHttp} from "@drop-shipping/shared/data-transform-objects/response-http.model";
import {NotificationModel} from "@drop-shipping/shared/data-transform-objects/notification.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  // Show dot on top of the icon
  @Input() dot: string;

  // Show pulse on icon
  @Input() pulse: boolean;

  @Input() pulseLight: boolean;

  // Set icon class name
  @Input() icon = 'flaticon2-bell-alarm-symbol';
  @Input() iconType: '' | 'success';

  // Set true to icon as SVG or false as icon class
  @Input() useSVG: boolean;

  // Set bg image path
  @Input() bgImage: string;

  // Set skin color, default to light
  @Input() skin: 'light' | 'dark' = 'light';

  @Input() type: 'brand' | 'success' = 'success';

  filterNotification: {
    page: string,
    size: string
  } = {
    page: '1',
    size: '10'
  }

  notifications: NotificationModel[];
  unreadNotifications: number;

  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  backGroundStyle(): string {
    if (!this.bgImage) {
      return 'none';
    }

    return 'url(' + this.bgImage + ')';
  }

  onGotoNotificationDetail(notification: NotificationModel) {
    return this.router.navigateByUrl(`/notification/${notification.id}`);
  }
}
