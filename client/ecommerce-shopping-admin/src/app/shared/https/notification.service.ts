import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {fmt, mapToHttpParamsQuery} from '@drop-shipping/core/utils/helper.utils';
import {HttpParams} from "@angular/common/http";

const router = {
  getMyNotifications: `/notifications/my/`,
  getNotificationById: `/notifications/{notificationId}`,
  getNotificationsByBoss: `/notifications/`,
  createNotification: `/notifications/`,
  readNotifications: `/notifications/read`,
  getNumberOfUnread: `/notifications/unread`,
  activeNotification: `/notifications/active/{notificationId}`,
  updateContentNotification: `/notifications/content/{notificationId}`,
  inActiveNotification: `/notifications/inactive/{notificationId}`
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private httpClient: BaseService
  ) {
  }

  loadNotificationById(notificationId: string) {
    const uri = fmt(router.getNotificationById, { notificationId });
    return this.httpClient.get(uri);
  }

  loadMyNotifications(filter: {
    page: string,
    size: string,
    active: number,
    _keyword: string
  }) {
    let params = new HttpParams();
    if (filter.active !== null) {
      params = params.set(`filters[active]`, filter.active.toString());
    }
    if (filter.page) {
      params = params.set('page', filter.page);
    }
    if (filter.size) {
      params = params.set('size', filter.size);
    }
    if (filter._keyword !== null) {
      params = params.set('_keyword', filter._keyword);
    }
    return this.httpClient.get(router.getMyNotifications, params);
  }

  loadNotificationByBoss(filter: {
    page: string,
    size: string
  }) {
    const params = mapToHttpParamsQuery(filter);
    return this.httpClient.get(router.getNotificationsByBoss, params);
  }

  createNotification(body: {
    content: string,
    title: string
  }) {
    return this.httpClient.post(router.createNotification, body);
  }

  readNotifications(
    body: {
      notificationId: string[]
    }
  ) {
    return this.httpClient.post(router.readNotifications, body);
  }

  getUnreadNotifications() {
    return this.httpClient.get(router.getNumberOfUnread);
  }

  activeNotification(notificationId: string) {
    const uri = fmt(router.activeNotification, {notificationId});
    return this.httpClient.put(uri);
  }

  updateNotificationContent(notificationId: string, body: {
    content: string,
    title: string
  }) {
    const uri = fmt(router.updateContentNotification, {notificationId});
    return this.httpClient.put(uri, body);
  }

  inActiveNotification(notificationId: string) {
    const uri = fmt(router.inActiveNotification, {notificationId});
    return this.httpClient.put(uri);
  }
}
