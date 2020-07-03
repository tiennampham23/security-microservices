import {BaseDataSource} from './base.datasource';
import {OrderService} from '@drop-shipping/shared/https/public-api';
import {catchError, finalize, map} from 'rxjs/operators';
import {OrderModel, ResponseHttp} from '@drop-shipping/shared/data-transform-objects/public-api';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {of} from 'rxjs';

const logger = new Logger('OrderDataSource');

export class OrderDataSource extends BaseDataSource {
  constructor(
    private orderService: OrderService
  ) {
    super();
  }

  loadOrders(queryParams: {
    userId: string,
    statusId: string,
    fromDate: string,
    createdAt: string,
    toDate: string,
    _keyword: string,
    page: string,
    size: string
  }) {
    this.loading$.next(true);
    this.orderService.loadOrders(queryParams)
      .pipe(
        map((response: ResponseHttp<OrderModel[]>) => {
          this.paginatorTotalSubject.next(response.total || response.totalCount);
          this.entitiesSubject.next(response.data);
          this.hasItems = true;
          return response;
        }),
        catchError((err) => {
          logger.debug(err);
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
