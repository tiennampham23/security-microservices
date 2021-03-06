import {BaseDataSource} from './base.datasource';
import {TransactionService} from '@drop-shipping/shared/https/transaction.service';
import {catchError, finalize, map} from 'rxjs/operators';
import {ResponseHttp} from '@drop-shipping/shared/data-transform-objects/response-http.model';
import {of} from 'rxjs';
import {TransactionModel} from '@drop-shipping/shared/data-transform-objects/transaction.model';
import {PaginationModel} from "@drop-shipping/shared/data-transform-objects/pagination.model";
import {ProductModel} from "@drop-shipping/shared/data-transform-objects/product.model";

export class TransactionDataSource extends BaseDataSource {
  constructor(
    private transactionService: TransactionService
  ) {
    super();
  }

  loadTransactions(queryParams: {
    page: number,
    size: number,
    userId: string,
    fromDate: string,
    toDate: string,
    createdAt: string,
    typeId: number
  }) {
    this.loading$.next(true);
    this.transactionService.loadTransactions(queryParams)
      .pipe(
        map((response: ResponseHttp<PaginationModel<ProductModel[]>>) => {
          this.paginatorTotalSubject.next(response.data.totalElements);
          this.entitiesSubject.next(response.data.content);
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
