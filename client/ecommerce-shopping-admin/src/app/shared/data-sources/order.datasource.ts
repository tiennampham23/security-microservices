import {BaseDataSource} from './base.datasource';
import {OrderService} from '@drop-shipping/shared/https/public-api';
import {catchError, finalize, map} from 'rxjs/operators';
import {
  OrderModel,
  PaginationModel,
  ProductModel,
  ResponseHttp
} from '@drop-shipping/shared/data-transform-objects/public-api';
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
    status: string,
    fromDate: string,
    toDate: string,
    page: string,
    number: string
  }) {
    this.loading$.next(true);
    this.orderService.loadOrders(queryParams)
      .pipe(
        map((response: ResponseHttp<PaginationModel<ProductModel[]>>) => {
          this.paginatorTotalSubject.next(response.data.totalElements);
          this.entitiesSubject.next(response.data.content);
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
