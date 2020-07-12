import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {OrderModel} from "../../../../shared/models/order.model";
import {OrderService} from "../../../../shared/https/order.service";
import {convertStrToYYMMdd} from "../../../../core/utils/helper.utils";
import {takeUntil} from "rxjs/operators";
import {ResponseHttp} from "../../../../shared/models/response-http.model";
import {PaginationModel} from "../../../../shared/models/pagination.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  filterOrders: {
    page: number,
    size: number,
    status: string,
    fromDate: string,
    toDate: string
  } = {
    status: null,
    fromDate: convertStrToYYMMdd(new Date(1, 0, 2018)),
    toDate: convertStrToYYMMdd(new Date()),
    page: 0,
    size: 20
  }
  orders: OrderModel[];
  private destroyed$ = new Subject();

  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.loadMyOrders(this.filterOrders);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private loadMyOrders(filterOrders: {page: number; size: number; status: string; fromDate: string; toDate: string}) {
    const orders$ = this.orderService.loadMyOrders(filterOrders)
      .pipe(takeUntil(this.destroyed$));
    orders$.subscribe((res: ResponseHttp<PaginationModel<OrderModel[]>>) => {
      console.log(res);
      this.orders = res.data.content;
    })
  }
}
