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
}
