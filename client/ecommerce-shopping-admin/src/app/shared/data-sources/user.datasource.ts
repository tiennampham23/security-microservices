import {BaseDataSource} from './base.datasource';
import {catchError, finalize, map} from 'rxjs/operators';
import {ResponseHttp, UserModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {of} from 'rxjs';
import {UserService} from '@drop-shipping/shared/https/user.service';

const logger = new Logger('ProductDataSource');

export class UserDataSource extends BaseDataSource {
  constructor(
    private userService: UserService
  ) {
    super();
  }

  loadChildUsers(queryParams: {
    page: number,
    size: number,
    _keyword: string,
    sort: number,
    propertySort: string
  }) {
    this.loading$.next(true);
    this.userService.loadChildUsers(queryParams)
      .pipe(
        map((response: ResponseHttp<UserModel[]>) => {
          this.paginatorTotalSubject.next(response.total);
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
