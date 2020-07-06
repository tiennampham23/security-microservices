import {BaseDataSource} from './base.datasource';
import {ProductService} from '@drop-shipping/shared/https/public-api';
import {catchError, finalize, map} from 'rxjs/operators';
import {PaginationModel, ProductModel, ResponseHttp} from '@drop-shipping/shared/data-transform-objects/public-api';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {of} from 'rxjs';

const logger = new Logger('ProductDataSource');

export class ProductDataSource extends BaseDataSource {
  constructor(
    private productService: ProductService
  ) {
    super();
  }

  loadProducts(queryParams: {
    page: number,
    number: number,
    keywords: string
  }) {
    this.loading$.next(true);
    this.productService.loadProducts(queryParams)
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
