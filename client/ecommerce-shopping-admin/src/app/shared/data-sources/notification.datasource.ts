import {BaseDataSource} from '@drop-shipping/shared/data-sources/base.datasource';
import {catchError, finalize, map} from 'rxjs/operators';
import {ResponseHttp} from '@drop-shipping/shared/data-transform-objects/response-http.model';
import {OrderModel} from '@drop-shipping/shared/data-transform-objects/order.model';
import {of} from 'rxjs';
import {NotificationService} from '@drop-shipping/shared/https/public-api';

export class NotificationDataSource extends BaseDataSource {
  constructor(
    private notificationService: NotificationService
  ) {
    super();
  }

  loadMyNotifications(queryParams: {
    page: string,
    size: string,
    _keyword: string,
    active: number
  }) {
    this.loading$.next(true);
    this.notificationService.loadMyNotifications(queryParams)
      .pipe(
        map((response: ResponseHttp<OrderModel[]>) => {
          this.paginatorTotalSubject.next(response.total || response.totalCount);
          this.entitiesSubject.next(response.data);
          this.hasItems = true;
          return response;
        }),
        catchError((err) => {
          return of(null);
        }),
        finalize(() => {
          setTimeout(() => {
            this.loading$.next(false);
          }, 1000);
        })
      ).subscribe();
  }
}
